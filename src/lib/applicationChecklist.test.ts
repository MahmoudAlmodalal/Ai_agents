import assert from 'node:assert/strict';
import test from 'node:test';
import {
  APPLICATION_CHECKLIST_STORAGE_KEY,
  applicationChecklistItemKey,
  createApplicationChecklistStore,
} from './applicationChecklist';

function storage(initial?: string) {
  const values = new Map<string, string>();
  if (initial !== undefined) values.set(APPLICATION_CHECKLIST_STORAGE_KEY, initial);
  return {
    values,
    getItem(key: string) { return values.get(key) ?? null; },
    setItem(key: string, value: string) { values.set(key, value); },
  };
}

test('semantic identity survives reorder and whitespace/NFC edits; changed text has no inherited check', () => {
  const saved = storage();
  const first = createApplicationChecklistStore(() => saved);
  const original = ['حددت المستخدم', 'صغت المشكلة', 'راجع café'];
  first.toggle('topic-a', original[0], true);
  first.toggle('topic-a', original[2], true);

  const restored = createApplicationChecklistStore(() => saved);
  restored.subscribe('topic-a', () => {});
  const reordered = ['راجع cafe\u0301', '  حددت\n   المستخدم  ', 'صغت المشكلة بتفصيل جديد'];
  assert.deepEqual(reordered.map((item) => restored.getSnapshot('topic-a').selected.has(applicationChecklistItemKey(item))), [true, true, false]);
  assert.equal(restored.getSnapshot('topic-a').selected.has(applicationChecklistItemKey('حددت المستخدم الجديد')), false);
  restored.toggle('topic-a', 'بند جديد', true);
  assert.ok(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!)['topic-a'].includes('راجع café'));
});

test('topic identity isolates identical labels; readers share snapshots and unsubscribe cleanly', () => {
  const saved = storage();
  const store = createApplicationChecklistStore(() => saved);
  let firstUpdates = 0;
  let secondUpdates = 0;
  const stopFirst = store.subscribe('topic-a', () => { firstUpdates++; });
  store.subscribe('topic-a', () => { secondUpdates++; });
  store.subscribe('topic-b', () => {});
  store.toggle('topic-a', 'معيار مشترك', true);
  assert.equal(store.getSnapshot('topic-a').selected.has('معيار مشترك'), true);
  assert.equal(store.getSnapshot('topic-b').selected.size, 0);
  assert.ok(firstUpdates > 0 && secondUpdates > 0);
  stopFirst();
  const updates = firstUpdates;
  store.toggle('topic-a', 'معيار مشترك', false);
  assert.equal(firstUpdates, updates);
  assert.equal(store.getSnapshot('topic-a').selected.size, 0);
});

test('read failures retain every local change and merge with previously saved choices after recovery', () => {
  const saved = storage(JSON.stringify({ 'topic-a': ['saved-before'], 'topic-b': ['untouched'] }));
  let blocked = true;
  const store = createApplicationChecklistStore(() => ({
    getItem(key: string) { if (blocked) throw new Error('blocked'); return saved.getItem(key); },
    setItem: saved.setItem,
  }));
  store.subscribe('topic-a', () => {});
  assert.equal(store.getSnapshot('topic-a').storageStatus, 'read-error');
  store.toggle('topic-a', 'one', true);
  store.toggle('topic-a', 'two', true);
  store.toggle('topic-a', 'one', false);
  assert.deepEqual([...store.getSnapshot('topic-a').selected], ['two']);
  assert.deepEqual(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!), { 'topic-a': ['saved-before'], 'topic-b': ['untouched'] });
  blocked = false;
  store.refresh();
  assert.deepEqual([...store.getSnapshot('topic-a').selected].sort(), ['saved-before', 'two']);
  assert.equal(store.getSnapshot('topic-a').storageStatus, 'available');
  assert.deepEqual(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!)['topic-b'], ['untouched']);
});

test('write failures preserve multiple checks and clearing; errors do not leak into another topic', () => {
  const saved = storage();
  let blocked = true;
  const store = createApplicationChecklistStore(() => ({
    getItem: saved.getItem,
    setItem(key: string, value: string) { if (blocked) throw new Error('quota'); saved.setItem(key, value); },
  }));
  store.subscribe('topic-a', () => {});
  store.toggle('topic-a', 'one', true);
  store.toggle('topic-a', 'two', true);
  store.toggle('topic-a', 'one', false);
  assert.deepEqual([...store.getSnapshot('topic-a').selected], ['two']);
  assert.equal(store.getSnapshot('topic-a').storageStatus, 'write-error');
  assert.deepEqual(store.getSnapshot('topic-a').sessionOnlyChanges, [
    { itemKey: 'one', checked: false },
    { itemKey: 'two', checked: true },
  ]);
  store.subscribe('topic-b', () => {});
  assert.equal(store.getSnapshot('topic-b').storageStatus, 'available');
  assert.equal(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY), null);
  blocked = false;
  store.refresh();
  assert.equal(store.getSnapshot('topic-a').storageStatus, 'available');
  assert.deepEqual(store.getSnapshot('topic-a').sessionOnlyChanges, []);
  assert.deepEqual(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!)['topic-a'], ['two']);
});

test('malformed documents and malformed item arrays remain byte-for-byte intact', () => {
  for (const malformed of ['{broken', 'null', '[]', '"text"', '{"topic-a":null}', '{"topic-a":[1]}', '{"topic-a":"one"}', '{"topic-a":[""]}']) {
    const saved = storage(malformed);
    saved.values.set('checklist_topic-01_0', 'true');
    const store = createApplicationChecklistStore(() => saved);
    store.subscribe('topic-a', () => {});
    store.toggle('topic-a', 'one', true);
    store.toggle('topic-a', 'two', true);
    assert.equal(store.getSnapshot('topic-a').storageStatus, 'invalid');
    assert.deepEqual([...store.getSnapshot('topic-a').selected], ['one', 'two']);
    assert.equal(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY), malformed);
    assert.equal(saved.getItem('checklist_topic-01_0'), 'true');
  }
});

test('existing exact semantic saves restore without writing; positional saves never imply a match', () => {
  const raw = JSON.stringify({ 'topic-a': ['معيار محفوظ', 'معيار محذوف لاحقًا'], 'topic-b': ['معيار آخر'] });
  const saved = storage(raw);
  saved.values.set('checklist_topic-01_0', 'true');
  const store = createApplicationChecklistStore(() => saved);
  store.subscribe('topic-a', () => {});
  assert.equal(store.getSnapshot('topic-a').selected.has('معيار محفوظ'), true);
  assert.equal(store.getSnapshot('topic-a').selected.has('بند أول مختلف'), false);
  assert.equal(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY), raw);
  store.toggle('topic-a', 'معيار جديد', true);
  assert.ok(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!)['topic-a'].includes('معيار محذوف لاحقًا'));
  assert.equal(saved.getItem('checklist_topic-01_0'), 'true');
});

test('refresh merges external topic updates and local pending choices without discarding either', () => {
  const saved = storage();
  let blocked = true;
  const store = createApplicationChecklistStore(() => ({
    getItem: saved.getItem,
    setItem(key: string, value: string) { if (blocked) throw new Error('quota'); saved.setItem(key, value); },
  }));
  store.subscribe('topic-a', () => {});
  store.toggle('topic-a', 'local', true);
  saved.setItem(APPLICATION_CHECKLIST_STORAGE_KEY, JSON.stringify({ 'topic-a': ['external'], 'topic-b': ['other'] }));
  blocked = false;
  store.refresh();
  assert.deepEqual([...store.getSnapshot('topic-a').selected].sort(), ['external', 'local']);
  assert.deepEqual(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!)['topic-b'], ['other']);
});

test('storage getter failures and prototype-like topic keys cannot crash or mutate another topic', () => {
  const unavailable = createApplicationChecklistStore(() => { throw new Error('SecurityError'); });
  unavailable.toggle('topic-a', 'one', true);
  assert.equal(unavailable.getSnapshot('topic-a').storageStatus, 'read-error');
  assert.deepEqual([...unavailable.getSnapshot('topic-a').selected], ['one']);
  const saved = storage();
  const store = createApplicationChecklistStore(() => saved);
  store.toggle('__proto__', 'safe', true);
  assert.deepEqual(JSON.parse(saved.getItem(APPLICATION_CHECKLIST_STORAGE_KEY)!)['__proto__'], ['safe']);
});
