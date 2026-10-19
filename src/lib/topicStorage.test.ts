import assert from 'node:assert/strict';
import test from 'node:test';
import { createTopicStorage } from './topicStorage';

function mockStorage(initial?: Record<string, string>) {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    map,
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) { map.set(key, value); },
  };
}

test('malformed bookmarks and recently viewed stay byte-for-byte intact when user saves new items', () => {
  const malformedInputs = [
    '{broken json',
    '{"key": "value"}',
    '12345',
    'true',
    '"string-not-array"',
    '[1, 2, 3]',
    '["valid", 123]',
    '["valid", null]',
  ];

  for (const malformed of malformedInputs) {
    const storage = mockStorage({
      engineering_guide_bookmarks: malformed,
      engineering_guide_recently_viewed: malformed,
    });

    const store = createTopicStorage(() => storage);
    assert.equal(store.getBookmarksStatus(), 'invalid');
    assert.equal(store.getRecentlyViewedStatus(), 'invalid');

    // User interacts during session
    const bookmarks = store.writeBookmarks(['project-idea-mvp']);
    assert.deepEqual(bookmarks, ['project-idea-mvp']);
    assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);

    // Persisted storage MUST NOT be overwritten with the new item
    assert.equal(storage.getItem('engineering_guide_bookmarks'), malformed);

    // Recently viewed user interaction during session
    const recent = store.writeRecentlyViewed(['discovery-grill-me']);
    assert.deepEqual(recent, ['discovery-grill-me']);
    assert.deepEqual(store.readRecentlyViewed(), ['discovery-grill-me']);

    // Persisted storage MUST NOT be overwritten with the new item
    assert.equal(storage.getItem('engineering_guide_recently_viewed'), malformed);

    // Storage status remains invalid
    assert.equal(store.getBookmarksStatus(), 'invalid');
    assert.equal(store.getRecentlyViewedStatus(), 'invalid');
  }
});

test('read failure keeps session choices and merges safely when storage recovers', () => {
  const initial = {
    engineering_guide_bookmarks: JSON.stringify(['topic-05']),
    engineering_guide_recently_viewed: JSON.stringify(['topic-05']),
  };
  const map = new Map<string, string>(Object.entries(initial));
  let blockRead = true;

  const storage = {
    getItem(key: string) {
      if (blockRead) throw new Error('SecurityError: blocked');
      return map.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };

  const store = createTopicStorage(() => storage);
  assert.equal(store.getBookmarksStatus(), 'read-error');
  assert.equal(store.getRecentlyViewedStatus(), 'read-error');

  // Session interaction while storage read is blocked
  store.writeBookmarks(['project-idea-mvp']);
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);
  // Storage remains unmodified
  assert.equal(map.get('engineering_guide_bookmarks'), JSON.stringify(['topic-05']));

  // Storage recovers
  blockRead = false;
  store.refresh();

  assert.equal(store.getBookmarksStatus(), 'available');
  const restoredBookmarks = store.readBookmarks();
  assert.ok(restoredBookmarks.includes('topic-05'));
  assert.ok(restoredBookmarks.includes('project-idea-mvp'));
  assert.equal(JSON.parse(map.get('engineering_guide_bookmarks')!).includes('topic-05'), true);
  assert.equal(JSON.parse(map.get('engineering_guide_bookmarks')!).includes('project-idea-mvp'), true);
});

test('write failure preserves session choices and persists when storage recovers', () => {
  const map = new Map<string, string>();
  let blockWrite = true;

  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) {
      if (blockWrite) throw new Error('QuotaExceededError');
      map.set(key, value);
    },
  };

  const store = createTopicStorage(() => storage);
  assert.equal(store.getBookmarksStatus(), 'available');

  store.writeBookmarks(['project-idea-mvp']);
  assert.equal(store.getBookmarksStatus(), 'write-error');
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);
  assert.equal(map.get('engineering_guide_bookmarks'), undefined);

  // Storage unblocks
  blockWrite = false;
  store.refresh();

  assert.equal(store.getBookmarksStatus(), 'available');
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);
  assert.deepEqual(JSON.parse(map.get('engineering_guide_bookmarks')!), ['project-idea-mvp']);
});

test('ambiguous historical records remain preserved and unresolved, never assigned to unrelated topics', () => {
  const map = new Map<string, string>([
    ['engineering_guide_bookmarks', JSON.stringify(['topic-02', 'topic-05', 'requirements-grill-me', 'topic-01', 'unknown-legacy-id'])],
    ['engineering_guide_recently_viewed', JSON.stringify(['topic-04', 'topic-06', 'git-project-docs', 'discovery-grill-me', 'prd-specification', 'srs', 'user-flow-modeling'])],
  ]);

  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) { map.set(key, value); },
  };

  const store = createTopicStorage(() => storage);

  // Read bookmarks:
  // - topic-01 maps to canonical project-idea-mvp
  // - topic-02 remains topic-02 (ambiguous)
  // - topic-05 remains topic-05 (ambiguous)
  // - requirements-grill-me maps to topic-02 (ambiguous composite identity)
  // - unknown-legacy-id remains unknown-legacy-id
  const bookmarks = store.readBookmarks();
  assert.ok(bookmarks.includes('project-idea-mvp'));
  assert.ok(bookmarks.includes('topic-02'));
  assert.ok(bookmarks.includes('topic-05'));
  assert.ok(bookmarks.includes('unknown-legacy-id'));
  // Must NOT assign topic-02 to discovery-grill-me or prd-specification
  assert.equal(bookmarks.includes('discovery-grill-me'), false);
  assert.equal(bookmarks.includes('prd-specification'), false);

  // Saving a new bookmark preserves all ambiguous historical IDs
  store.writeBookmarks([...bookmarks, 'relational-erd-design']);
  const savedBookmarksRaw = JSON.parse(map.get('engineering_guide_bookmarks')!);
  assert.ok(savedBookmarksRaw.includes('topic-02'));
  assert.ok(savedBookmarksRaw.includes('topic-05'));
  assert.ok(savedBookmarksRaw.includes('unknown-legacy-id'));
  assert.ok(savedBookmarksRaw.includes('project-idea-mvp'));
  assert.ok(savedBookmarksRaw.includes('relational-erd-design'));

  // Recently viewed: 5 resolved topics + all ambiguous topics
  const recent = store.readRecentlyViewed();
  assert.ok(recent.includes('topic-04')); // Ambiguous composite preserved
  assert.ok(recent.includes('topic-06')); // Ambiguous composite preserved

  // Adding a new topic to recently viewed preserves ambiguous items beyond the 5-item limit
  store.writeRecentlyViewed(['nextjs-app-router', ...recent]);
  const savedRecentRaw = JSON.parse(map.get('engineering_guide_recently_viewed')!);
  assert.ok(savedRecentRaw.includes('topic-04'));
  assert.ok(savedRecentRaw.includes('topic-06'));
  assert.ok(savedRecentRaw.includes('nextjs-app-router'));
});

test('reading activity and checklist selections remain strictly independent in storage', () => {
  const map = new Map<string, string>();
  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) { map.set(key, value); },
  };

  const topicStore = createTopicStorage(() => storage);

  // Reading activity: writing recently viewed and bookmarks
  topicStore.writeRecentlyViewed(['project-idea-mvp']);
  topicStore.writeBookmarks(['project-idea-mvp']);

  // Checklist storage key must NOT have been touched
  assert.equal(map.get('application-checklists-v1'), undefined);

  // Simulating checklist store activity
  storage.setItem('application-checklists-v1', JSON.stringify({ 'project-idea-mvp': ['some-item'] }));

  // Topic store refresh and operations do not mutate checklist storage
  topicStore.refresh();
  topicStore.writeBookmarks(['discovery-grill-me']);

  assert.equal(
    map.get('application-checklists-v1'),
    JSON.stringify({ 'project-idea-mvp': ['some-item'] }),
  );
  // Checklist choices do not leak into bookmarks or history
  assert.equal(topicStore.readBookmarks().includes('some-item'), false);
  assert.equal(topicStore.readRecentlyViewed().includes('some-item'), false);
});

test('remove during write failure does not resurrect on recovery', () => {
  const map = new Map<string, string>([
    ['engineering_guide_bookmarks', JSON.stringify(['project-idea-mvp', 'topic-05'])],
  ]);
  let blockWrite = false;

  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) {
      if (blockWrite) throw new Error('QuotaExceededError');
      map.set(key, value);
    },
  };

  const store = createTopicStorage(() => storage);
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp', 'topic-05']);

  // Simulate quota failure while removing topic-05
  blockWrite = true;
  store.writeBookmarks(['project-idea-mvp']);
  assert.equal(store.getBookmarksStatus(), 'write-error');
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);

  // Storage unblocks and refreshes
  blockWrite = false;
  store.refresh();

  assert.equal(store.getBookmarksStatus(), 'available');
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);
  assert.equal(store.readBookmarks().includes('topic-05'), false);
  assert.equal(JSON.parse(map.get('engineering_guide_bookmarks')!).includes('topic-05'), false);
});

test('read recovery on next write merges unread earlier records safely', () => {
  const map = new Map<string, string>([
    ['engineering_guide_bookmarks', JSON.stringify(['topic-05'])],
  ]);
  let blockRead = true;

  const storage = {
    getItem(key: string) {
      if (blockRead) throw new Error('SecurityError');
      return map.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };

  const store = createTopicStorage(() => storage);
  assert.equal(store.getBookmarksStatus(), 'read-error');

  // User adds project-idea-mvp in session while read is blocked
  store.writeBookmarks(['project-idea-mvp']);
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);
  assert.equal(map.get('engineering_guide_bookmarks'), JSON.stringify(['topic-05']));

  // Storage unblocks. User now adds discovery-grill-me via writeBookmarks (WITHOUT manual refresh)
  blockRead = false;
  store.writeBookmarks(['project-idea-mvp', 'discovery-grill-me']);

  assert.equal(store.getBookmarksStatus(), 'available');
  const bookmarks = store.readBookmarks();
  assert.ok(bookmarks.includes('topic-05'));
  assert.ok(bookmarks.includes('project-idea-mvp'));
  assert.ok(bookmarks.includes('discovery-grill-me'));
  const persisted = JSON.parse(map.get('engineering_guide_bookmarks')!);
  assert.ok(persisted.includes('topic-05'));
  assert.ok(persisted.includes('project-idea-mvp'));
  assert.ok(persisted.includes('discovery-grill-me'));
});

test('history recency puts new views first and explicit clear intent persists on recovery', () => {
  const initial = ['discovery-grill-me', 'prd-specification', 'srs', 'git-project-docs', 'user-flow-modeling'];
  const map = new Map<string, string>([
    ['engineering_guide_recently_viewed', JSON.stringify(initial)],
  ]);
  let blockWrite = true;

  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) {
      if (blockWrite) throw new Error('QuotaExceededError');
      map.set(key, value);
    },
  };

  const store = createTopicStorage(() => storage);
  assert.deepEqual(store.readRecentlyViewed(), initial);

  // New topic viewed while write is blocked: project-idea-mvp
  store.writeRecentlyViewed(['project-idea-mvp', ...initial]);
  assert.equal(store.getRecentlyViewedStatus(), 'write-error');
  assert.equal(store.readRecentlyViewed()[0], 'project-idea-mvp');

  // Unblock and refresh: project-idea-mvp MUST remain at index 0 (recency wins!)
  blockWrite = false;
  store.refresh();

  assert.equal(store.getRecentlyViewedStatus(), 'available');
  const recent = store.readRecentlyViewed();
  assert.equal(recent[0], 'project-idea-mvp');
  assert.equal(recent.length, 5); // 5 resolved topics limit

  // Now test explicit clear intent during write failure
  blockWrite = true;
  store.writeRecentlyViewed([]);
  assert.equal(store.getRecentlyViewedStatus(), 'write-error');
  assert.deepEqual(store.readRecentlyViewed(), []);

  // Unblock and refresh: history must NOT resurrect the cleared items!
  blockWrite = false;
  store.refresh();

  assert.equal(store.getRecentlyViewedStatus(), 'available');
  assert.deepEqual(store.readRecentlyViewed(), []);
  assert.deepEqual(JSON.parse(map.get('engineering_guide_recently_viewed')!), []);
});

test('externally repaired malformed storage safely recovers and merges session changes', () => {
  const map = new Map<string, string>([
    ['engineering_guide_bookmarks', '{corrupt json'],
  ]);

  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) { map.set(key, value); },
  };

  const store = createTopicStorage(() => storage);
  assert.equal(store.getBookmarksStatus(), 'invalid');

  // User adds bookmark in session
  store.writeBookmarks(['project-idea-mvp']);
  assert.deepEqual(store.readBookmarks(), ['project-idea-mvp']);
  assert.equal(map.get('engineering_guide_bookmarks'), '{corrupt json');

  // External repair: storage now holds valid JSON with discovery-grill-me
  map.set('engineering_guide_bookmarks', JSON.stringify(['discovery-grill-me']));

  store.refresh();
  assert.equal(store.getBookmarksStatus(), 'available');
  const bookmarks = store.readBookmarks();
  assert.ok(bookmarks.includes('discovery-grill-me'));
  assert.ok(bookmarks.includes('project-idea-mvp'));
  assert.ok(JSON.parse(map.get('engineering_guide_bookmarks')!).includes('discovery-grill-me'));
  assert.ok(JSON.parse(map.get('engineering_guide_bookmarks')!).includes('project-idea-mvp'));
});




