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
  await index.put(indexUrl, new Response(JSON.stringify({ slug, bundleId, cacheName, savedAt: 123 })));
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
