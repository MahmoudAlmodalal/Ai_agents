import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFLINE_CACHE_NAMES,
  OFFLINE_STORAGE_KEYS,
  getTopicOfflineStatus,
  listSavedTopicsOffline,
  readOfflineManifest,
  isOfflineStorageSupported,
  removeTopicOffline,
} from './offlineStorage';

function requestKey(request: RequestInfo): string {
  return typeof request === 'string' ? new URL(request, 'http://localhost').href : new URL(request.url).href;
}

class MemoryCache {
  entries = new Map<string, Response>();

  async put(request: RequestInfo, response: Response) {
    this.entries.set(requestKey(request), response.clone());
  }

  async match(request: RequestInfo) {
    return this.entries.get(requestKey(request))?.clone() ?? undefined;
  }

  async delete(request: RequestInfo) {
    return this.entries.delete(requestKey(request));
  }

  async keys() {
    return Array.from(this.entries.keys()).map((url) => new Request(url));
  }
}

class MemoryCacheStorage {
  caches = new Map<string, MemoryCache>();

  async open(name: string) {
    let cache = this.caches.get(name);
    if (!cache) {
      cache = new MemoryCache();
      this.caches.set(name, cache);
    }
    return cache;
  }

  async keys() {
    return Array.from(this.caches.keys());
  }

  async has(name: string) {
    return this.caches.has(name);
  }

  async delete(name: string) {
    return this.caches.delete(name);
  }
}

function setupBrowser() {
  const storage = new MemoryCacheStorage();
  const localValues = new Map<string, string>();
  const localStorageMock = {
    getItem: (key: string) => localValues.get(key) ?? null,
    setItem: (key: string, value: string) => { localValues.set(key, String(value)); },
    removeItem: (key: string) => { localValues.delete(key); },
  };
  const descriptors = {
    navigator: Object.getOwnPropertyDescriptor(globalThis, 'navigator'),
    caches: Object.getOwnPropertyDescriptor(globalThis, 'caches'),
    window: Object.getOwnPropertyDescriptor(globalThis, 'window'),
    location: Object.getOwnPropertyDescriptor(globalThis, 'location'),
    localStorage: Object.getOwnPropertyDescriptor(globalThis, 'localStorage'),
  };
  Object.defineProperty(globalThis, 'window', { value: globalThis, configurable: true });
  Object.defineProperty(globalThis, 'location', {
    value: { origin: 'http://localhost', hostname: 'localhost', search: '' },
    configurable: true,
  });
  Object.defineProperty(globalThis, 'caches', { value: storage, configurable: true });
  Object.defineProperty(globalThis, 'navigator', {
    value: { serviceWorker: { controller: null } },
    configurable: true,
  });
  Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, configurable: true });

  const restore = (name: string) => {
    const descriptor = descriptors[name as keyof typeof descriptors];
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete (globalThis as Record<string, unknown>)[name];
  };
  return {
    storage,
    localValues,
    setBlockedLocalStorage() {
      Object.defineProperty(globalThis, 'localStorage', {
        get() { throw new Error('Storage is blocked'); },
        configurable: true,
      });
    },
    cleanup() {
      restore('navigator');
      restore('caches');
      restore('window');
      restore('location');
      restore('localStorage');
    },
  };
}

async function seedCompleteBundle(storage: MemoryCacheStorage) {
  const slug = 'user-flow-modeling';
  const bundleId = '3-test-bundle';
  const cacheName = OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX + slug + '-' + bundleId;
  const indexName = OFFLINE_CACHE_NAMES.TOPICS;
  const metaPath = '/__ai_agents_offline_v2__/';
  const assetUrl = 'http://localhost/_next/static/chunks/lesson.js';
  const htmlUrl = 'http://localhost/learn/' + slug;
  const payloadUrl = 'http://localhost' + metaPath + 'bundle/' + encodeURIComponent(bundleId) + '/payload.json';
  const manifestUrl = 'http://localhost' + metaPath + 'bundle/' + encodeURIComponent(bundleId) + '/manifest.json';
  const indexUrl = 'http://localhost' + metaPath + 'topics/' + encodeURIComponent(slug);
  const cache = await storage.open(cacheName);
  const payload = {
    metadata: {
      slug,
      id: 'topic-08',
      number: '08',
      title: 'User Flow',
      savedAt: 123,
      version: '3',
      contentVersion: 3,
      bundleId,
      diagramCount: 1,
      quiz: {
        id: 'quiz-08',
        version: 2,
        title: 'Check your understanding',
        questionCount: 2,
        approvalState: 'proposed',
      },
      onlineOnlyVideoCount: 1,
    },
    topic: { slug },
    diagramSnapshots: { architecture: '<svg></svg>', flow: '<svg></svg>', sequence: '<svg></svg>' },
    contentVersion: 3,
    bundleId,
    savedAt: 123,
  };
  await cache.put(htmlUrl, new Response('<html></html>', { headers: { 'content-type': 'text/html' } }));
  await cache.put(assetUrl, new Response('lesson code'));
  await cache.put(payloadUrl, new Response(JSON.stringify(payload)));
  await cache.put(manifestUrl, new Response(JSON.stringify({
    complete: true,
    slug,
    bundleId,
    htmlPath: '/learn/' + slug,
    payloadPath: metaPath + 'bundle/' + encodeURIComponent(bundleId) + '/payload.json',
    assets: [assetUrl],
  })));
  const index = await storage.open(indexName);
  await index.put(indexUrl, new Response(JSON.stringify({ slug, bundleId, cacheName, savedAt: 123, metadata: payload.metadata })));
  return { slug, bundleId, cacheName, assetUrl, payloadUrl };
}

test('bundle readiness requires the real HTML, payload, and every recorded asset', async () => {
  const browser = setupBrowser();
  try {
    const fixture = await seedCompleteBundle(browser.storage);
    assert.equal(await getTopicOfflineStatus(fixture.slug), 'saved');
    const topics = await listSavedTopicsOffline();
    assert.equal(topics.length, 1);
    assert.equal(topics[0].quiz?.approvalState, 'proposed');
    assert.equal(topics[0].onlineOnlyVideoCount, 1);

    const bundle = await browser.storage.open(fixture.cacheName);
    await bundle.delete(fixture.assetUrl);
    assert.equal(await getTopicOfflineStatus(fixture.slug), 'unsaved');
    assert.deepEqual(await listSavedTopicsOffline(), []);
  } finally {
    browser.cleanup();
  }
});

test('bundle readiness requires a snapshot for every Mermaid perspective', async () => {
  const browser = setupBrowser();
  try {
    const fixture = await seedCompleteBundle(browser.storage);
    assert.equal(await getTopicOfflineStatus(fixture.slug), 'saved');
    const cache = await browser.storage.open(fixture.cacheName);
    const payloadResponse = await cache.match(fixture.payloadUrl);
    const payload = await payloadResponse!.json() as { diagramSnapshots: Record<string, string> };
    delete payload.diagramSnapshots.sequence;
    await cache.put(fixture.payloadUrl, new Response(JSON.stringify(payload)));
    assert.equal(await getTopicOfflineStatus(fixture.slug), 'unsaved');
    assert.deepEqual(await listSavedTopicsOffline(), []);
  } finally {
    browser.cleanup();
  }
});

test('offline capability detection and legacy manifest reads survive blocked localStorage', () => {
  const browser = setupBrowser();
  try {
    browser.setBlockedLocalStorage();
    assert.equal(isOfflineStorageSupported(), true);
    assert.deepEqual(readOfflineManifest(), {});
  } finally {
    browser.cleanup();
  }
});

test('removing an offline bundle leaves learner records untouched', async () => {
  const browser = setupBrowser();
  try {
    const fixture = await seedCompleteBundle(browser.storage);
    browser.localValues.set('engineering_guide_bookmarks', JSON.stringify([fixture.slug]));
    browser.localValues.set('engineering_guide_recently_viewed', JSON.stringify([fixture.slug]));
    browser.localValues.set('ai_agents_checklist_v1', JSON.stringify({ 'topic-08': [true] }));
    const result = await removeTopicOffline(fixture.slug);
    assert.deepEqual(result, { success: true });
    assert.equal(await getTopicOfflineStatus(fixture.slug), 'unsaved');
    assert.equal(browser.localValues.get('engineering_guide_bookmarks'), JSON.stringify([fixture.slug]));
    assert.equal(browser.localValues.get('engineering_guide_recently_viewed'), JSON.stringify([fixture.slug]));
    assert.equal(browser.localValues.get('ai_agents_checklist_v1'), JSON.stringify({ 'topic-08': [true] }));
  } finally {
    browser.cleanup();
  }
});

test('legacy manifest data remains readable without making localStorage authoritative', () => {
  const browser = setupBrowser();
  try {
    browser.localValues.set(OFFLINE_STORAGE_KEYS.MANIFEST, '{broken');
    assert.deepEqual(readOfflineManifest(), {});
    browser.localValues.set(OFFLINE_STORAGE_KEYS.MANIFEST, JSON.stringify({
      'user-flow-modeling': { slug: 'user-flow-modeling', title: 'Old saved lesson' },
    }));
    assert.equal(readOfflineManifest()['user-flow-modeling'].title, 'Old saved lesson');
  } finally {
    browser.cleanup();
  }
});

test('orphaned legacy localStorage entries without Cache Storage return unsaved and are cleaned up', async () => {
  const browser = setupBrowser();
  try {
    browser.localValues.set(OFFLINE_STORAGE_KEYS.MANIFEST, JSON.stringify({
      'project-idea-mvp': {
        slug: 'project-idea-mvp',
        id: 'topic-01',
        number: '01',
        title: 'Project Idea MVP',
        savedAt: Date.now(),
        version: '1',
        contentVersion: 1,
        diagramCount: 0,
      },
    }));
    browser.localValues.set(OFFLINE_STORAGE_KEYS.TOPIC_PREFIX + 'project-idea-mvp', JSON.stringify({
      metadata: { slug: 'project-idea-mvp' },
      topic: { slug: 'project-idea-mvp' },
    }));

    // Without cached HTML/assets in ai-agents-topics-v1, status must validate real cache and be unsaved
    assert.equal(await getTopicOfflineStatus('project-idea-mvp'), 'unsaved');
    assert.deepEqual(await listSavedTopicsOffline(), []);
    // Stale orphaned manifest is purged
    assert.deepEqual(readOfflineManifest(), {});
  } finally {
    browser.cleanup();
  }
});

test('rollback restores a previously complete bundle pointer safely', async () => {
  const browser = setupBrowser();
  try {
    const fixture1 = await seedCompleteBundle(browser.storage);
    const bundleId2 = '4-updated-bundle';
    const cacheName2 = OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX + fixture1.slug + '-' + bundleId2;
    const metaPath = '/__ai_agents_offline_v2__/';
    const cache2 = await browser.storage.open(cacheName2);
    const payload2 = {
      metadata: {
        slug: fixture1.slug,
        id: 'topic-08',
        number: '08',
        title: 'User Flow Updated',
        savedAt: 456,
        version: '4',
        contentVersion: 4,
        bundleId: bundleId2,
        diagramCount: 1,
      },
      topic: { slug: fixture1.slug },
      diagramSnapshots: { architecture: '<svg></svg>', flow: '<svg></svg>', sequence: '<svg></svg>' },
      contentVersion: 4,
      bundleId: bundleId2,
      savedAt: 456,
    };
    await cache2.put('http://localhost/learn/' + fixture1.slug, new Response('<html>updated</html>', { headers: { 'content-type': 'text/html' } }));
    await cache2.put(fixture1.assetUrl, new Response('updated code'));
    await cache2.put('http://localhost' + metaPath + 'bundle/' + bundleId2 + '/payload.json', new Response(JSON.stringify(payload2)));
    await cache2.put('http://localhost' + metaPath + 'bundle/' + bundleId2 + '/manifest.json', new Response(JSON.stringify({
      complete: true,
      slug: fixture1.slug,
      bundleId: bundleId2,
      htmlPath: '/learn/' + fixture1.slug,
      payloadPath: metaPath + 'bundle/' + bundleId2 + '/payload.json',
      assets: [fixture1.assetUrl],
    })));

    // Point active to bundle 2
    const index = await browser.storage.open(OFFLINE_CACHE_NAMES.TOPICS);
    const indexUrl = 'http://localhost' + metaPath + 'topics/' + encodeURIComponent(fixture1.slug);
    await index.put(indexUrl, new Response(JSON.stringify({
      slug: fixture1.slug,
      bundleId: bundleId2,
      cacheName: cacheName2,
      savedAt: 456,
    })));

    const activeBeforeRollback = await listSavedTopicsOffline();
    assert.equal(activeBeforeRollback[0].bundleId, bundleId2);

    // Roll back to bundle 1
    const { rollbackTopicOffline } = await import('./offlineStorage');
    const rollbackResult = await rollbackTopicOffline(fixture1.slug, fixture1.bundleId);
    assert.deepEqual(rollbackResult, { success: true });

    const activeAfterRollback = await listSavedTopicsOffline();
    assert.equal(activeAfterRollback[0].bundleId, fixture1.bundleId);
    assert.equal(await getTopicOfflineStatus(fixture1.slug), 'saved');
  } finally {
    browser.cleanup();
  }
});

test('transient storage error does not purge index pointer or localStorage mirror and reports unverified', async () => {
  const browser = setupBrowser();
  try {
    const fixture = await seedCompleteBundle(browser.storage);
    browser.localValues.set(OFFLINE_STORAGE_KEYS.MANIFEST, JSON.stringify({
      [fixture.slug]: {
        slug: fixture.slug,
        id: 'topic-08',
        number: '08',
        title: 'User Flow Modeling',
        savedAt: Date.now(),
        version: '1',
        contentVersion: 1,
        diagramCount: 1,
      },
    }));
    browser.localValues.set(OFFLINE_STORAGE_KEYS.TOPIC_PREFIX + fixture.slug, JSON.stringify({
      metadata: { slug: fixture.slug },
      topic: { slug: fixture.slug },
    }));

    // Simulate transient error when opening the topic bundle cache
    const originalOpen = browser.storage.open.bind(browser.storage);
    browser.storage.open = async (name: string) => {
      if (name.startsWith(OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX)) {
        const error = new Error('Transient I/O failure');
        error.name = 'SecurityError';
        throw error;
      }
      return originalOpen(name);
    };

    // getTopicOfflineStatus must return 'unverified' rather than 'unsaved'
    const status = await getTopicOfflineStatus(fixture.slug);
    assert.equal(status, 'unverified');

    // Index pointer must NOT be purged
    const index = await originalOpen(OFFLINE_CACHE_NAMES.TOPICS);
    const pointerUrl = 'http://localhost/__ai_agents_offline_v2__/topics/' + encodeURIComponent(fixture.slug);
    const pointer = await index.match(pointerUrl);
    assert.ok(pointer, 'Index pointer must remain intact during transient error');

    // localStorage manifest must NOT be purged
    const manifest = readOfflineManifest();
    assert.ok(manifest[fixture.slug], 'localStorage manifest mirror must remain intact during transient error');

    // listSavedTopicsOffline must retain the topic via pointer metadata rather than deleting it
    const list = await listSavedTopicsOffline();
    assert.equal(list.length, 1);
    assert.equal(list[0].slug, fixture.slug);

    // Pointer is still there
    assert.ok(await index.match(pointerUrl), 'Index pointer still intact after listSavedTopicsOffline');
  } finally {
    browser.cleanup();
  }
});

test('getTopicRollbackCandidate identifies complete historical bundles and excludes active bundle', async () => {
  const browser = setupBrowser();
  try {
    const fixture1 = await seedCompleteBundle(browser.storage);
    const bundleId2 = '4-updated-bundle';
    const cacheName2 = OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX + fixture1.slug + '-' + bundleId2;
    const metaPath = '/__ai_agents_offline_v2__/';
    const cache2 = await browser.storage.open(cacheName2);
    const payload2 = {
      metadata: {
        slug: fixture1.slug,
        id: 'topic-08',
        number: '08',
        title: 'User Flow Updated',
        savedAt: 456,
        version: '4',
        contentVersion: 4,
        bundleId: bundleId2,
        diagramCount: 1,
      },
      topic: { slug: fixture1.slug },
      diagramSnapshots: { architecture: '<svg></svg>', flow: '<svg></svg>', sequence: '<svg></svg>' },
      contentVersion: 4,
      bundleId: bundleId2,
      savedAt: 456,
    };
    await cache2.put('http://localhost/learn/' + fixture1.slug, new Response('<html>updated</html>', { headers: { 'content-type': 'text/html' } }));
    await cache2.put(fixture1.assetUrl, new Response('updated code'));
    await cache2.put('http://localhost' + metaPath + 'bundle/' + bundleId2 + '/payload.json', new Response(JSON.stringify(payload2)));
    await cache2.put('http://localhost' + metaPath + 'bundle/' + bundleId2 + '/manifest.json', new Response(JSON.stringify({
      complete: true,
      slug: fixture1.slug,
      bundleId: bundleId2,
      htmlPath: '/learn/' + fixture1.slug,
      payloadPath: metaPath + 'bundle/' + bundleId2 + '/payload.json',
      assets: [fixture1.assetUrl],
    })));

    // Point active to bundle 2
    const index = await browser.storage.open(OFFLINE_CACHE_NAMES.TOPICS);
    const indexUrl = 'http://localhost' + metaPath + 'topics/' + encodeURIComponent(fixture1.slug);
    await index.put(indexUrl, new Response(JSON.stringify({
      slug: fixture1.slug,
      bundleId: bundleId2,
      cacheName: cacheName2,
      savedAt: 456,
      metadata: payload2.metadata,
    })));

    const { getTopicRollbackCandidate } = await import('./offlineStorage');
    const candidate = await getTopicRollbackCandidate(fixture1.slug);
    assert.ok(candidate);
    assert.equal(candidate.bundleId, fixture1.bundleId);
  } finally {
    browser.cleanup();
  }
});
