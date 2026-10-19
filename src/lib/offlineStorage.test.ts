import test from 'node:test';
import assert from 'node:assert/strict';
import type { TopicItem } from '@/src/types/topic';
import {
  getTopicOfflineStatus,
  saveTopicOffline,
  removeTopicOffline,
  listSavedTopicsOffline,
  clearAllOfflineSavedTopics,
  readOfflineManifest,
  getSavedTopicOfflinePayload,
  isOfflineStorageSupported,
  OFFLINE_STORAGE_KEYS,
} from './offlineStorage';

function setupMockBrowserStorage() {
  const store = new Map<string, string>();
  const localStorageMock = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => { store.set(key, String(value)); },
    removeItem: (key: string) => { store.delete(key); },
    clear: () => { store.clear(); },
  };

  const sessionStore = new Map<string, string>();
  const sessionStorageMock = {
    getItem: (key: string) => sessionStore.get(key) ?? null,
    setItem: (key: string, value: string) => { sessionStore.set(key, String(value)); },
    removeItem: (key: string) => { sessionStore.delete(key); },
    clear: () => { sessionStore.clear(); },
  };

  const cachesMock = {
    open: async (cacheName: string) => ({
      put: async (req: any, res: any) => {},
      match: async (req: any) => null,
      delete: async (req: any) => true,
    }),
    match: async (req: any) => null,
    delete: async (cacheName: string) => true,
  };

  (globalThis as any).window = globalThis;
  (globalThis as any).localStorage = localStorageMock;
  (globalThis as any).sessionStorage = sessionStorageMock;
  (globalThis as any).caches = cachesMock;

  const originalNavigatorDesc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      serviceWorker: {
        controller: null,
        register: async () => ({ scope: '/' }),
      },
      onLine: true,
    },
    configurable: true,
    writable: true,
  });

  const originalFetch = globalThis.fetch;
  (globalThis as any).fetch = async (url: any) => ({
    ok: true,
    status: 200,
    clone: () => ({}),
  });

  return {
    store,
    sessionStore,
    cleanup: () => {
      delete (globalThis as any).window;
      delete (globalThis as any).localStorage;
      delete (globalThis as any).sessionStorage;
      delete (globalThis as any).caches;
      if (originalNavigatorDesc) {
        Object.defineProperty(globalThis, 'navigator', originalNavigatorDesc);
      }
      globalThis.fetch = originalFetch;
    },
  };
}

const mockSampleTopic: TopicItem = {
  id: 'topic-08',
  number: '08',
  title: 'نمذجة مسارات تدفق المستخدم',
  subtitle: 'هندسة السلوك والقرارات',
  slug: 'user-flow-modeling',
  category: 'architecture',
  categoryName: 'النمذجة',
  stageTag: 'النمذجة والمسارات',
  summary: 'ملخص مسارات المستخدم',
  htmlContent: '<p>محتوى مسارات المستخدم</p>',
  readingTimeMinutes: 8,
  tags: ['ux', 'user-flow', 'mermaid'],
  goal: 'هدف نمذجة المسارات',
  checklist: ['رسم مسار المستخدم'],
  checklistCount: 1,
  steps: ['1. حدد البداية'],
  prerequisites: [],
  promptRefs: [],
  outputs: [],
  diagramCount: 1,
  publicationStatus: 'unified-complete',
  contentTypes: ['diagram', 'prompt'],
  promptCount: 1,
  codeSnippetCount: 1,
};

test('TDD Cycle 1: Capability detection and status transitions for complete save', async () => {
  const { cleanup } = setupMockBrowserStorage();
  try {
    assert.equal(isOfflineStorageSupported(), true, 'All capabilities present should be supported');

    const slug = 'user-flow-modeling';
    const statusBefore = await getTopicOfflineStatus(slug);
    assert.equal(statusBefore, 'unsaved', 'Initial state must be unsaved');

    const result = await saveTopicOffline(mockSampleTopic, {
      diagramSnapshots: { flow: '<svg viewBox="0 0 100 100"><rect/></svg>' },
    });
    assert.equal(result.success, true, 'Save operation must succeed');

    const statusAfter = await getTopicOfflineStatus(slug);
    assert.equal(statusAfter, 'saved', 'Status after complete save must be saved');

    const payload = getSavedTopicOfflinePayload(slug);
    assert.ok(payload, 'Payload must exist');
    assert.ok(payload.diagramSnapshots?.flow, 'Diagram snapshot must be persisted in payload');

    const savedList = await listSavedTopicsOffline();
    assert.equal(savedList.length, 1);
    assert.equal(savedList[0].slug, slug);
  } finally {
    cleanup();
  }
});

test('TDD Cycle 2: Diagram topic without snapshots fails save and does not advertise false success', async () => {
  const { cleanup } = setupMockBrowserStorage();
  try {
    const slug = 'diagram-fail-topic';
    const diagramTopic: TopicItem = {
      ...mockSampleTopic,
      slug,
      diagramCount: 2,
    };

    // If diagram snapshots fail to generate, save must fail
    const result = await saveTopicOffline(diagramTopic, { diagramSnapshots: {} });
    assert.equal(result.success, false, 'Must fail when diagrams are missing');
    assert.match(result.error ?? '', /المخططات الهندسية/);

    const status = await getTopicOfflineStatus(slug);
    assert.notEqual(status, 'saved', 'Must never report saved if diagrams failed');

    const manifest = readOfflineManifest();
    assert.equal(manifest[slug], undefined, 'Manifest must not contain partial topic');
  } finally {
    cleanup();
  }
});

test('TDD Cycle 3: Removal purges downloaded content without deleting learner records', async () => {
  const { store, cleanup } = setupMockBrowserStorage();
  try {
    const slug = 'user-flow-modeling';

    // Populate learner records in localStorage
    store.set('engineering_guide_bookmarks', JSON.stringify([slug, 'project-idea-mvp']));
    store.set('engineering_guide_recently_viewed', JSON.stringify([slug]));
    store.set('ai_agents_checklist_v1', JSON.stringify({ 'topic-08': [true] }));

    await saveTopicOffline(mockSampleTopic, {
      diagramSnapshots: { flow: '<svg><circle/></svg>' },
    });
    assert.equal(await getTopicOfflineStatus(slug), 'saved');

    const removeResult = await removeTopicOffline(slug);
    assert.equal(removeResult.success, true);
    assert.equal(await getTopicOfflineStatus(slug), 'unsaved');

    // VERIFY LEARNER PROGRESS IS UNTOUCHED
    assert.equal(store.has('engineering_guide_bookmarks'), true, 'Bookmarks preserved');
    assert.deepEqual(JSON.parse(store.get('engineering_guide_bookmarks')!), [slug, 'project-idea-mvp']);
    assert.equal(store.has('engineering_guide_recently_viewed'), true, 'Recently viewed preserved');
    assert.equal(store.has('ai_agents_checklist_v1'), true, 'Checklist progress preserved');

    // Test clear all offline topics
    await saveTopicOffline(mockSampleTopic, {
      diagramSnapshots: { flow: '<svg><circle/></svg>' },
    });
    const clearResult = await clearAllOfflineSavedTopics();
    assert.equal(clearResult.success, true);
    assert.equal(await getTopicOfflineStatus(slug), 'unsaved');

    // Learner records STILL intact after clear all
    assert.equal(store.has('engineering_guide_bookmarks'), true);
    assert.equal(store.has('ai_agents_checklist_v1'), true);
  } finally {
    cleanup();
  }
});

test('TDD Cycle 4: QuotaExceededError and update failure rolls back to previous valid state', async () => {
  const { store, cleanup } = setupMockBrowserStorage();
  try {
    const slug = 'user-flow-modeling';

    // 1. Initial valid save
    const initialResult = await saveTopicOffline(mockSampleTopic, {
      diagramSnapshots: { flow: '<svg id="v1"/>' },
    });
    assert.equal(initialResult.success, true);
    assert.equal(await getTopicOfflineStatus(slug), 'saved');
    const initialPayload = getSavedTopicOfflinePayload(slug);

    // 2. Attempt update that throws QuotaExceededError
    const originalSetItem = (globalThis as any).localStorage.setItem;
    let failWrites = false;
    (globalThis as any).localStorage.setItem = (key: string, value: string) => {
      if (failWrites && key.startsWith(OFFLINE_STORAGE_KEYS.TOPIC_PREFIX)) {
        const quotaError = new Error('The quota has been exceeded');
        quotaError.name = 'QuotaExceededError';
        throw quotaError;
      }
      originalSetItem(key, value);
    };

    failWrites = true;
    const updateResult = await saveTopicOffline(
      { ...mockSampleTopic, title: 'عنوان محدث يفشل' },
      { diagramSnapshots: { flow: '<svg id="v2"/>' }, isUpdate: true }
    );
    assert.equal(updateResult.success, false, 'Update should fail cleanly');
    assert.match(updateResult.error ?? '', /تجاوز سعة التخزين/);

    // Rollback must preserve the previous valid payload!
    failWrites = false;
    const currentPayload = getSavedTopicOfflinePayload(slug);
    assert.ok(currentPayload, 'Previous payload must still be preserved');
    assert.equal(currentPayload.topic.title, mockSampleTopic.title, 'Previous title must be retained intact');
    assert.equal(currentPayload.diagramSnapshots?.flow, '<svg id="v1"/>', 'Previous diagram must be retained');
  } finally {
    cleanup();
  }
});
