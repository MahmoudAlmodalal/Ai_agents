/* eslint-disable no-restricted-globals */
// Versioned offline bundles for Ai_agents. A bundle is never visible until its
// HTML, quiz payload, and complete same-origin asset graph have been verified.
const TOPIC_INDEX_CACHE = 'ai-agents-topic-index-v2';
const SHELL_INDEX_CACHE = 'ai-agents-shell-index-v2';
const LEGACY_TOPICS_CACHE = 'ai-agents-topics-v1';
const TOPIC_BUNDLE_PREFIX = 'ai-agents-topic-v2-';
const TOPIC_STAGE_PREFIX = 'ai-agents-topic-stage-v2-';
const SHELL_BUNDLE_PREFIX = 'ai-agents-shell-bundle-v2-';
const SHELL_STAGE_PREFIX = 'ai-agents-shell-stage-v2-';
const META_PATH = '/__ai_agents_offline_v2__/';
const REQUIRED_DIAGRAM_PERSPECTIVES = ['architecture', 'flow', 'sequence'];
const SHELL_POINTER_URL = new URL(META_PATH + 'shell-active', self.location.origin).href;
const cancelledBundleIds = new Set();
const inFlightBundleIds = new Set();
const inFlightTopicOperations = new Map();

function absoluteUrl(path) {
  return new URL(path, self.location.origin).href;
}

function topicIndexUrl(slug) {
  return absoluteUrl(META_PATH + 'topics/' + encodeURIComponent(slug));
}

function jsonResponse(value) {
  return new Response(JSON.stringify(value), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function readJson(cache, request) {
  const response = await cache.match(request);
  if (!response) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function isLoopbackHost() {
  const host = self.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}

function quotaError() {
  try {
    return new DOMException('The quota has been exceeded (offline transaction test)', 'QuotaExceededError');
  } catch {
    const error = new Error('The quota has been exceeded (offline transaction test)');
    error.name = 'QuotaExceededError';
    return error;
  }
}

function injectAt(data, point) {
  return isLoopbackHost() && data && data.testFailureAt === point;
}

function contentVersionFromHtml(html) {
  const match = html.match(/data-offline-content-version\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function assertCoherentSource(html, data) {
  const learning = data.payload && data.payload.learningContent;
  if (learning) {
    const pageVersion = contentVersionFromHtml(html);
    if (learning.topicSlug !== data.slug || String(learning.contentVersion) !== String(data.contentVersion) ||
        pageVersion !== String(data.contentVersion)) {
      throw new Error('The loaded lesson and fetched page use different content versions. Reload before saving.');
    }
  }

}

function assertLoadedAssetsPresent(data, assets) {
  const expected = new Set((data.loadedAssets || []).map((value) => {
    try {
      const url = new URL(value, self.location.origin);
      return url.pathname + url.search;
    } catch {
      return value;
    }
  }));
  // Every app asset loaded by the open page must still belong to the complete
  // graph of the freshly fetched HTML. This detects a deployment during save.
  const currentPageAssets = Array.from(assets).map((url) => {
    const parsed = new URL(url);
    return parsed.pathname + parsed.search;
  });
  const missing = Array.from(expected).filter((path) => !currentPageAssets.includes(path));
  if (missing.length) {
    throw new Error('The app was updated after this lesson was opened. Reload before saving offline.');
  }
}

function isAssetPath(pathname) {
  return pathname.startsWith('/_next/static/') ||
    /\.(?:js|mjs|css|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|otf|json)$/i.test(pathname);
}

function addAssetCandidate(candidate, baseUrl, into) {
  if (!candidate || /^(?:data:|blob:|#|javascript:)/i.test(candidate)) return;
  try {
    const url = new URL(candidate, baseUrl);
    if (url.origin === self.location.origin && isAssetPath(url.pathname) &&
        !/(?:\/\.\.\.|%24|%7b|\$\{)/i.test(url.pathname)) into.add(url.href);
  } catch {
    // Ignore malformed or unsupported references in generated HTML/CSS/JS.
  }
}

function assetsFromHtml(html, pageUrl) {
  const urls = new Set();
  const pattern = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = pattern.exec(html))) addAssetCandidate(match[1], pageUrl, urls);
  return urls;
}

function assetsFromCss(css, stylesheetUrl) {
  const urls = new Set();
  const urlPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let match;
  while ((match = urlPattern.exec(css))) addAssetCandidate(match[1].trim(), stylesheetUrl, urls);
  const importPattern = /@import\s+(?:url\()?\s*["']?([^"')\s;]+)["']?\s*\)?/gi;
  while ((match = importPattern.exec(css))) addAssetCandidate(match[1].trim(), stylesheetUrl, urls);
  return urls;
}

function assetsFromJavaScript(js, scriptUrl) {
  const urls = assetsFromHtml(js, scriptUrl);
  // Next's webpack runtime stores lazy chunks as paths relative to /_next/.
  const pattern = /(\/_next\/|_next\/|static\/)(?:static\/)?(?:chunks|css|media)\/[A-Za-z0-9_./@-]+\.(?:js|mjs|css|svg|png|webp|woff2?|ttf|otf)(?:\?[A-Za-z0-9_%=&-]+)?/gi;
  let match;
  while ((match = pattern.exec(js))) {
    let candidate = match[0];
    if (candidate.includes('/...')) continue;
    if (candidate.startsWith('static/')) candidate = '/_next/' + candidate;
    else if (candidate.startsWith('_next/')) candidate = '/' + candidate;
    addAssetCandidate(candidate, scriptUrl, urls);
  }
  // Next's Webpack runtime can hide lazy chunk filenames behind a numeric
  // chunk-id -> filename-hash map. Capture that map without evaluating app
  // code so a fresh offline page can still load components that weren't
  // exercised before the learner disconnected.
  const runtimeStart = js.match(/\.u\s*=\s*[A-Za-z_$][\w$]*\s*=>/);
  if (runtimeStart && runtimeStart.index !== undefined) {
    const expressionStart = runtimeStart.index + runtimeStart[0].length;
    const remaining = js.slice(expressionStart);
    const runtimeEnd = /\.miniCssF\s*=/.exec(remaining);
    const runtime = runtimeEnd ? remaining.slice(0, runtimeEnd.index) : '';
    const maps = [];
    const objectPattern = /\(\{([^{}]+)\}\)/g;
    let objectMatch;
    while ((objectMatch = objectPattern.exec(runtime))) {
      const entries = new Map();
      const pairPattern = /(?:"(\d+)"|(\d+))\s*:\s*["']([A-Za-z0-9_-]+)["']/g;
      let pair;
      while ((pair = pairPattern.exec(objectMatch[1]))) entries.set(pair[1] || pair[2], pair[3]);
      if (entries.size > 1) maps.push(entries);
    }
    const hashMap = maps.find((entries) => Array.from(entries.values()).some((value) => /^[a-f0-9]{16}$/i.test(value)));
    const fileStemMap = maps.find((entries) => entries !== hashMap &&
      Array.from(entries.values()).some((value) => /^[a-f0-9]{8}$/i.test(value)));
    const extensionMatch = runtime.match(/\+\s*["']\.(js|mjs)["']/i);
    const extension = extensionMatch ? extensionMatch[1] : 'js';
    if (hashMap && extensionMatch) {
      for (const [chunkId, hash] of hashMap) {
        if (!/^[a-f0-9]{16}$/i.test(hash)) continue;
        const stem = fileStemMap && fileStemMap.get(chunkId) || chunkId;
        addAssetCandidate('/_next/static/chunks/' + stem + '.' + hash + '.' + extension, scriptUrl, urls);
      }
    }
  }
  return urls;
}

async function fetchRequiredAsset(cache, url, data, firstStoredAsset) {
  if (data.bundleId && cancelledBundleIds.has(data.bundleId)) throw new Error('Offline save was cancelled');
  const response = await fetch(url, { cache: 'reload', credentials: 'same-origin' });
  if (!response.ok) throw new Error('Failed to fetch dependent asset: ' + url + ' (' + response.status + ')');
  await cache.put(url, response.clone());
  if (firstStoredAsset && injectAt(data, 'prepare-quota')) throw quotaError();

  const type = response.headers.get('content-type') || '';
  const pathname = new URL(url).pathname;
  if (type.includes('text/css') || pathname.endsWith('.css')) {
    return assetsFromCss(await response.clone().text(), url);
  }
  if (type.includes('javascript') || /\.(?:mjs|js)$/i.test(pathname)) {
    return assetsFromJavaScript(await response.clone().text(), url);
  }
  return new Set();
}

async function cacheDependencyGraph(cache, initialUrls, data) {
  const queue = Array.from(initialUrls);
  const visited = new Set();
  while (queue.length) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    const dependencies = await fetchRequiredAsset(cache, url, data, visited.size === 1);
    for (const dependency of dependencies) {
      if (!visited.has(dependency)) queue.push(dependency);
    }
  }
  return Array.from(visited);
}

async function verifyBundleCache(cacheName, slug, bundleId) {
  let cache;
  try {
    cache = await caches.open(cacheName);
  } catch {
    return null;
  }
  const manifestUrl = absoluteUrl(META_PATH + 'bundle/' + encodeURIComponent(bundleId) + '/manifest.json');
  const manifest = await readJson(cache, manifestUrl);
  if (!manifest || manifest.complete !== true || manifest.slug !== slug || manifest.bundleId !== bundleId) return null;
  if (!manifest.htmlPath || !manifest.payloadPath || !Array.isArray(manifest.assets)) return null;
  const htmlResponse = await cache.match(absoluteUrl(manifest.htmlPath));
  if (!htmlResponse) return null;
  const html = await htmlResponse.clone().text();
  const payload = await readJson(cache, absoluteUrl(manifest.payloadPath));
  if (!payload || !payload.metadata || payload.metadata.slug !== slug || !payload.topic || payload.topic.slug !== slug ||
      payload.bundleId !== bundleId || payload.metadata.bundleId !== bundleId ||
      String(payload.contentVersion) !== String(payload.metadata.contentVersion)) return null;
  if (Number(payload.metadata.diagramCount) > 0) {
    const snapshots = payload.diagramSnapshots;
    if (!snapshots || REQUIRED_DIAGRAM_PERSPECTIVES.some((perspective) =>
      typeof snapshots[perspective] !== 'string' || !snapshots[perspective].toLowerCase().includes('<svg')
    )) return null;
  }
  if (payload.learningContent &&
      (payload.learningContent.topicSlug !== slug ||
       String(payload.learningContent.contentVersion) !== String(payload.contentVersion) ||
       !payload.learningContent.quiz || !Array.isArray(payload.learningContent.quiz.questions) ||
       contentVersionFromHtml(html) !== String(payload.contentVersion))) return null;
  for (const url of manifest.assets) {
    if (!(await cache.match(url))) return null;
  }
  return { cache, manifest, payload };
}

async function readTopicPointer(slug) {
  try {
    const index = await caches.open(TOPIC_INDEX_CACHE);
    const url = topicIndexUrl(slug);
    const pointer = await readJson(index, url);
    if (!pointer || pointer.slug !== slug || !pointer.bundleId || !pointer.cacheName) return null;
    let exists = false;
    try {
      exists = await caches.has(pointer.cacheName);
    } catch {
      // Inconclusive or transient storage error: retain pointer
      return null;
    }
    if (!exists) {
      await index.delete(url);
      return null;
    }
    const verified = await verifyBundleCache(pointer.cacheName, slug, pointer.bundleId);
    if (!verified) {
      await index.delete(url);
      return null;
    }
    return { pointer, ...verified };
  } catch {
    return null;
  }
}

async function verifyTopic(slug, expectedBundleId) {
  const active = await readTopicPointer(slug);
  if (!active || (expectedBundleId && active.pointer.bundleId !== expectedBundleId)) return null;
  return active;
}

async function listTopicUnits() {
  const index = await caches.open(TOPIC_INDEX_CACHE);
  const keys = await index.keys();
  const items = [];
  for (const key of keys) {
    const pointer = await readJson(index, key);
    if (!pointer || !pointer.slug) continue;
    const active = await verifyTopic(pointer.slug, pointer.bundleId);
    if (!active) {
      await index.delete(key);
      continue;
    }
    const learning = active.payload.learningContent;
    items.push({
      ...active.payload.metadata,
      bundleId: active.pointer.bundleId,
      quiz: learning && learning.quiz ? {
        id: learning.quiz.id,
        version: learning.quiz.version,
        title: learning.quiz.title,
        questionCount: learning.quiz.questions.length,
        approvalState: learning.quiz.scoringPolicy.approval.state,
      } : null,
      onlineOnlyVideoCount: learning ? (learning.candidateVideos || []).length : 0,
    });
  }
  return items.sort((a, b) => b.savedAt - a.savedAt);
}

function unavailableResponse() {
  const html = '<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>المحتوى غير متاح بدون إنترنت — Ai_agents</title><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:2rem;max-width:44rem;margin:auto"><main role="alert"><p>وضع عدم الاتصال بالإنترنت</p><h1>هذا الموضوع غير محفوظ للمطالعة بدون إنترنت</h1><p>احفظ الموضوع أثناء الاتصال لتتمكن من قراءة الدرس والاختبار المحفوظ لاحقاً دون شبكة. الفيديوهات الخارجية تتطلب اتصالاً بالإنترنت.</p><p><a href="/saved" style="color:#93c5fd">استعراض المواضيع المحفوظة محلياً</a></p><p><a href="/" style="color:#93c5fd">العودة للرئيسية</a></p></main></body></html>';
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Ai-Agents-Offline': 'unavailable' },
  });
}

async function readShellPointer() {
  const index = await caches.open(SHELL_INDEX_CACHE);
  const pointer = await readJson(index, SHELL_POINTER_URL);
  if (!pointer || !pointer.bundleId || !pointer.cacheName) return null;
  const cache = await caches.open(pointer.cacheName);
  const manifest = await readJson(cache, absoluteUrl(META_PATH + 'shell/' + pointer.bundleId + '/manifest.json'));
  if (!manifest || manifest.complete !== true || !Array.isArray(manifest.assets)) return null;
  for (const url of manifest.assets) {
    if (!(await cache.match(url))) return null;
  }
  return { pointer, cache, manifest };
}

async function matchActiveAsset(request) {
  // Fast path: inspect the active shell bundle first if registered
  try {
    const index = await caches.open(SHELL_INDEX_CACHE);
    const pointer = await readJson(index, SHELL_POINTER_URL);
    if (pointer && pointer.cacheName) {
      const shellCache = await caches.open(pointer.cacheName);
      const shellResponse = await shellCache.match(request);
      if (shellResponse) return shellResponse;
    }
  } catch {
    // Fall back to scanning all candidate caches
  }

  // This path handles one immutable static URL after its network request has
  // failed. Verify the full bundle once at navigation/readiness time; doing
  // that asset-graph scan for every script request turns an offline page load
  // into an O(assets²) operation.
  const names = (await caches.keys()).filter((name) =>
    name.startsWith(TOPIC_BUNDLE_PREFIX) || name.startsWith(SHELL_BUNDLE_PREFIX) || name === LEGACY_TOPICS_CACHE
  );
  for (const name of names) {
    const response = await (await caches.open(name)).match(request);
    if (response) return response;
  }
  return null;
}

async function verifyLegacyTopicPage(cache, html, pageUrl) {
  const queue = Array.from(assetsFromHtml(html, pageUrl));
  const visited = new Set();
  while (queue.length) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    const response = await cache.match(url);
    if (!response) return false;
    const type = response.headers.get('content-type') || '';
    const pathname = new URL(url).pathname;
    let dependencies = new Set();
    if (type.includes('text/css') || pathname.endsWith('.css')) {
      dependencies = assetsFromCss(await response.clone().text(), url);
    } else if (type.includes('javascript') || /\.(?:mjs|js)$/i.test(pathname)) {
      dependencies = assetsFromJavaScript(await response.clone().text(), url);
    }
    for (const dependency of dependencies) {
      if (!visited.has(dependency)) queue.push(dependency);
    }
  }
  return true;
}

async function readCompleteLegacyTopic(slug) {
  const legacy = await caches.open(LEGACY_TOPICS_CACHE);
  const pageUrl = absoluteUrl('/learn/' + slug);
  const response = await legacy.match(pageUrl) || await legacy.match(absoluteUrl('/learn/' + slug + '/'));
  if (!response) return null;
  const html = await response.clone().text();
  return await verifyLegacyTopicPage(legacy, html, pageUrl) ? response : null;
}

async function cacheShellRoutes() {
  const bundleId = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  const stageName = SHELL_STAGE_PREFIX + bundleId;
  const finalName = SHELL_BUNDLE_PREFIX + bundleId;
  let previousShellPointer = null;

  try {
    const stage = await caches.open(stageName);
    const assets = new Set();
    const routes = {};

    const savedUrl = absoluteUrl('/saved');
    const savedResponse = await fetch(savedUrl, { cache: 'reload', credentials: 'same-origin' });
    if (!savedResponse.ok) throw new Error('Unable to cache the offline saved-content entry point (' + savedResponse.status + ')');
    const savedHtml = await savedResponse.clone().text();
    for (const url of await cacheDependencyGraph(stage, assetsFromHtml(savedHtml, savedUrl), { bundleId })) assets.add(url);
    routes['/saved'] = savedHtml;

    // Home is useful offline too, but /saved is the required entry point.
    try {
      const homeUrl = absoluteUrl('/');
      const homeResponse = await fetch(homeUrl, { cache: 'reload', credentials: 'same-origin' });
      if (homeResponse.ok) {
        const homeHtml = await homeResponse.clone().text();
        for (const url of await cacheDependencyGraph(stage, assetsFromHtml(homeHtml, homeUrl), { bundleId })) assets.add(url);
        routes['/'] = homeHtml;
      }
    } catch {
      // Keep the saved-content entry point if home cannot be cached.
    }

    for (const [path, html] of Object.entries(routes)) {
      await stage.put(absoluteUrl(path), new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
    }
    const shellManifest = { complete: true, bundleId, routes: Object.keys(routes), assets: Array.from(assets) };
    await stage.put(absoluteUrl(META_PATH + 'shell/' + bundleId + '/manifest.json'), jsonResponse(shellManifest));
    const finalCache = await caches.open(finalName);
    for (const request of await stage.keys()) {
      const response = await stage.match(request);
      if (!response) throw new Error('A staged offline shell asset disappeared');
      await finalCache.put(request, response);
    }
    const checked = await readJson(finalCache, absoluteUrl(META_PATH + 'shell/' + bundleId + '/manifest.json'));
    if (!checked || checked.complete !== true || !(await finalCache.match(absoluteUrl('/saved')))) {
      throw new Error('The saved-content offline entry point is incomplete');
    }
    for (const url of checked.assets) {
      if (!(await finalCache.match(url))) throw new Error('A saved-page dependency is missing: ' + url);
    }
    const index = await caches.open(SHELL_INDEX_CACHE);
    previousShellPointer = await readJson(index, SHELL_POINTER_URL);
    await index.put(SHELL_POINTER_URL, jsonResponse({ bundleId, cacheName: finalName }));
    await caches.delete(stageName);
  } catch (error) {
    await caches.delete(stageName);
    try {
      const index = await caches.open(SHELL_INDEX_CACHE);
      const currentPointer = await readJson(index, SHELL_POINTER_URL);
      if (currentPointer && currentPointer.bundleId === bundleId) {
        if (previousShellPointer) await index.put(SHELL_POINTER_URL, jsonResponse(previousShellPointer));
        else await index.delete(SHELL_POINTER_URL);
      }
    } catch {
      // Retain prior shell pointer if possible
    }
    await caches.delete(finalName);
    throw error;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      await cacheShellRoutes();
      await self.skipWaiting();
    } catch (error) {
      console.error('[offline] service worker install failed:', error);
      throw error;
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    // Complete prior versions remain for rollback and retained quiz attempts.
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(TOPIC_STAGE_PREFIX) || key.startsWith(SHELL_STAGE_PREFIX))
      .map((key) => caches.delete(key)));
    try {
      const shell = await readShellPointer();
      if (!shell) {
        await cacheShellRoutes();
      }
    } catch {
      // Shell recovery on activation is best-effort
    }
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        const pathname = url.pathname.replace(/\/$/, '') || '/';
        if (pathname.startsWith('/learn/')) {
          const slug = decodeURIComponent(pathname.slice('/learn/'.length));
          const active = await readTopicPointer(slug);
          if (active) {
            const html = await active.cache.match(absoluteUrl('/learn/' + slug));
            if (html) return html;
          }
          const oldPage = await readCompleteLegacyTopic(slug);
          if (oldPage) return oldPage;
          return unavailableResponse();
        }
        const shell = await readShellPointer();
        if (shell) {
          const response = await shell.cache.match(absoluteUrl(pathname));
          if (response) return response;
        }
        return unavailableResponse();
      }
    })());
    return;
  }

  const staticRequest = url.pathname.startsWith('/_next/static/') ||
    ['script', 'style', 'font', 'image', 'manifest'].includes(request.destination) ||
    isAssetPath(url.pathname);
  if (staticRequest) {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        return (await matchActiveAsset(request)) ||
          new Response('Asset not available offline', { status: 503 });
      }
    })());
  }
});

async function cacheTopicUnit(data) {
  const slug = data.slug;
  const bundleId = data.bundleId;
  if (!slug || !bundleId || !data.payload || !data.payload.topic || !data.payload.metadata ||
      data.payload.metadata.slug !== slug) throw new Error('Topic bundle data is incomplete');

  try {
    const activeShell = await readShellPointer();
    if (!activeShell) {
      await cacheShellRoutes();
    }
  } catch {
    // Shell caching is best effort during topic save
  }

  const stageName = TOPIC_STAGE_PREFIX + bundleId;
  const finalName = TOPIC_BUNDLE_PREFIX + slug + '-' + bundleId;
  let previousPointer = null;
  inFlightBundleIds.add(bundleId);

  try {
    const stage = await caches.open(stageName);
    const topicUrl = absoluteUrl('/learn/' + slug);
    const htmlResponse = await fetch(topicUrl, { cache: 'reload', credentials: 'same-origin' });
    if (!htmlResponse.ok) throw new Error('Failed to fetch topic HTML (' + htmlResponse.status + ')');
    let htmlText = await htmlResponse.clone().text();
    if (isLoopbackHost() && data.testSourceVersion && /data-offline-content-version\s*=\s*["'][^"']+["']/i.test(htmlText)) {
      htmlText = htmlText.replace(
        /data-offline-content-version\s*=\s*["'][^"']+["']/i,
        'data-offline-content-version="' + String(data.testSourceVersion).replace(/["'<>]/g, '') + '"'
      );
    }
    const entryAssets = assetsFromHtml(htmlText, topicUrl);
    assertCoherentSource(htmlText, data);
    const assets = await cacheDependencyGraph(stage, entryAssets, data);
    assertLoadedAssetsPresent(data, assets);
    await stage.put(topicUrl, htmlResponse.clone());

    const payloadPath = META_PATH + 'bundle/' + encodeURIComponent(bundleId) + '/payload.json';
    const manifestPath = META_PATH + 'bundle/' + encodeURIComponent(bundleId) + '/manifest.json';
    await stage.put(absoluteUrl(payloadPath), jsonResponse(data.payload));
    const manifest = {
      complete: true,
      slug,
      bundleId,
      htmlPath: '/learn/' + slug,
      payloadPath,
      assets,
      savedAt: data.payload.savedAt || Date.now(),
      metadata: data.payload.metadata,
    };
    await stage.put(absoluteUrl(manifestPath), jsonResponse(manifest));

    const finalCache = await caches.open(finalName);
    let copied = 0;
    for (const request of await stage.keys()) {
      if (cancelledBundleIds.has(bundleId)) throw new Error('Offline save was cancelled');
      const response = await stage.match(request);
      if (!response) throw new Error('A staged topic asset disappeared');
      await finalCache.put(request, response);
      copied += 1;
      if (copied === 1 && injectAt(data, 'commit-quota')) throw quotaError();
    }

    if (!(await verifyBundleCache(finalName, slug, bundleId))) {
      throw new Error('The saved lesson, quiz, or a required rendering asset is incomplete');
    }
    if (cancelledBundleIds.has(bundleId)) throw new Error('Offline save was cancelled');

    const index = await caches.open(TOPIC_INDEX_CACHE);
    const pointerUrl = topicIndexUrl(slug);
    previousPointer = await readJson(index, pointerUrl);
    const pointer = {
      slug,
      bundleId,
      cacheName: finalName,
      savedAt: manifest.savedAt,
      metadata: manifest.metadata,
    };
    if (injectAt(data, 'activate-quota')) throw quotaError();
    if (isLoopbackHost() && Number(data.testCommitDelayMs) > 0) {
      await new Promise((resolve) => setTimeout(resolve, Number(data.testCommitDelayMs)));
    }
    await index.put(pointerUrl, jsonResponse(pointer));
    if (injectAt(data, 'activate-committed-then-quota')) throw quotaError();

    const active = await readTopicPointer(slug);
    if (!active || active.pointer.bundleId !== bundleId) throw new Error('The complete topic bundle could not be activated');
    return { success: true, slug, bundleId, metadata: manifest.metadata };
  } catch (error) {
    const active = await readTopicPointer(slug);
    if (active && active.pointer.bundleId === bundleId) {
      // Cache.put can commit even if its acknowledgment is lost; a verified
      // active pointer means the complete operation succeeded.
      return { success: true, slug, bundleId, metadata: active.payload.metadata };
    }
    await caches.delete(stageName);
    const index = await caches.open(TOPIC_INDEX_CACHE);
    const url = topicIndexUrl(slug);
    const pointer = await readJson(index, url);
    if (pointer && pointer.bundleId === bundleId) {
      if (previousPointer) await index.put(url, jsonResponse(previousPointer));
      else await index.delete(url);
    }
    await caches.delete(finalName);
    throw error;
  } finally {
    inFlightBundleIds.delete(bundleId);
    cancelledBundleIds.delete(bundleId);
    try {
      await caches.delete(stageName);
    } catch {
      // An abandoned staging cache is never referenced by an active pointer.
    }
  }
}

async function handleMessage(event) {
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  const port = event.ports && event.ports[0];
  const reply = (value) => {
    if (port) {
      port.postMessage({ ...value, requestId: data.requestId });
      port.close();
    }
    if (event.source && event.source.postMessage) {
      try { event.source.postMessage({ ...value, requestId: data.requestId }); } catch { /* source may have closed */ }
    }
  };

  if (data.type === 'CACHE_TOPIC_UNIT') {
    try {
      const operation = cacheTopicUnit(data);
      if (data.bundleId) inFlightTopicOperations.set(data.bundleId, operation);
      let value;
      try {
        value = await operation;
      } finally {
        if (inFlightTopicOperations.get(data.bundleId) === operation) inFlightTopicOperations.delete(data.bundleId);
      }
      if (isLoopbackHost() && Number(data.testResponseDelayMs) > 0) {
        await new Promise((resolve) => setTimeout(resolve, Number(data.testResponseDelayMs)));
      }
      reply({ type: 'CACHE_TOPIC_UNIT_RESULT', ...value });
    } catch (error) {
      reply({
        type: 'CACHE_TOPIC_UNIT_RESULT',
        slug: data.slug,
        bundleId: data.bundleId,
        success: false,
        error: error && error.name === 'QuotaExceededError'
          ? 'The browser storage quota was exceeded'
          : (error instanceof Error ? error.message : String(error)),
        errorName: error && error.name,
      });
    }
    return;
  }

  if (data.type === 'CANCEL_TOPIC_UNIT') {
    if (data.bundleId && inFlightBundleIds.has(data.bundleId)) cancelledBundleIds.add(data.bundleId);
    const operation = data.bundleId && inFlightTopicOperations.get(data.bundleId);
    if (operation) {
      try { await operation; } catch { /* A canceled or failed save keeps its prior pointer. */ }
    }
    const active = data.slug && data.bundleId ? await verifyTopic(data.slug, data.bundleId) : null;
    reply({
      type: 'CANCEL_TOPIC_UNIT_RESULT',
      success: true,
      committed: !!active,
      slug: data.slug,
      bundleId: data.bundleId,
    });
    return;
  }

  if (data.type === 'VERIFY_TOPIC_UNIT') {
    const active = await verifyTopic(data.slug, data.bundleId);
    reply({
      type: 'VERIFY_TOPIC_UNIT_RESULT',
      slug: data.slug,
      bundleId: active ? active.pointer.bundleId : data.bundleId,
      success: !!active,
      metadata: active ? active.payload.metadata : null,
    });
    return;
  }

  if (data.type === 'GET_TOPIC_UNIT') {
    let active;
    if (data.bundleId) {
      const cacheName = TOPIC_BUNDLE_PREFIX + data.slug + '-' + data.bundleId;
      const verified = await verifyBundleCache(cacheName, data.slug, data.bundleId);
      if (verified) active = { ...verified, pointer: { bundleId: data.bundleId } };
    } else {
      active = await readTopicPointer(data.slug);
    }
    reply({
      type: 'GET_TOPIC_UNIT_RESULT',
      slug: data.slug,
      bundleId: active && active.pointer.bundleId,
      success: !!active,
      payload: active ? active.payload : null,
    });
    return;
  }

  if (data.type === 'LIST_TOPIC_UNITS') {
    reply({ type: 'LIST_TOPIC_UNITS_RESULT', success: true, topics: await listTopicUnits() });
    return;
  }

  if (data.type === 'PURGE_TOPIC_CACHE') {
    const index = await caches.open(TOPIC_INDEX_CACHE);
    await index.delete(topicIndexUrl(data.slug));
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(TOPIC_BUNDLE_PREFIX + data.slug + '-'))
      .map((name) => caches.delete(name)));
    const legacy = await caches.open(LEGACY_TOPICS_CACHE);
    await legacy.delete(absoluteUrl('/learn/' + data.slug));
    await legacy.delete(absoluteUrl('/learn/' + data.slug + '/'));
    reply({ type: 'PURGE_TOPIC_SUCCESS', slug: data.slug, success: true });
    return;
  }

  if (data.type === 'ENSURE_SHELL') {
    let shell = await readShellPointer();
    if (!shell || data.force) {
      try {
        await cacheShellRoutes();
        shell = await readShellPointer();
      } catch (error) {
        reply({
          type: 'ENSURE_SHELL_RESULT',
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
        return;
      }
    }
    reply({
      type: 'ENSURE_SHELL_RESULT',
      success: !!shell,
      bundleId: shell && shell.pointer.bundleId,
    });
    return;
  }

  if (data.type === 'ROLLBACK_TOPIC_UNIT') {
    const slug = data.slug;
    const bundleId = data.bundleId;
    if (!slug || !bundleId) {
      reply({ type: 'ROLLBACK_TOPIC_UNIT_RESULT', success: false, error: 'Slug and target bundle ID are required' });
      return;
    }
    const cacheName = TOPIC_BUNDLE_PREFIX + slug + '-' + bundleId;
    const verified = await verifyBundleCache(cacheName, slug, bundleId);
    if (!verified) {
      reply({ type: 'ROLLBACK_TOPIC_UNIT_RESULT', success: false, error: 'The requested historical bundle is incomplete or unavailable' });
      return;
    }
    const index = await caches.open(TOPIC_INDEX_CACHE);
    const pointerUrl = topicIndexUrl(slug);
    const pointer = {
      slug,
      bundleId,
      cacheName,
      savedAt: verified.manifest.savedAt || Date.now(),
      metadata: verified.manifest.metadata,
    };
    await index.put(pointerUrl, jsonResponse(pointer));
    reply({ type: 'ROLLBACK_TOPIC_UNIT_RESULT', success: true, slug, bundleId, metadata: verified.manifest.metadata });
    return;
  }

  if (data.type === 'PURGE_ALL_TOPICS') {
    await caches.delete(TOPIC_INDEX_CACHE);
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(TOPIC_BUNDLE_PREFIX) ||
        name.startsWith(TOPIC_STAGE_PREFIX) ||
        name === LEGACY_TOPICS_CACHE)
      .map((name) => caches.delete(name)));
    reply({ type: 'PURGE_ALL_TOPICS_RESULT', success: true });
  }
}

self.addEventListener('message', (event) => {
  event.waitUntil(handleMessage(event).catch((error) => {
    const port = event.ports && event.ports[0];
    if (port) {
      port.postMessage({
        type: 'OFFLINE_OPERATION_RESULT',
        requestId: event.data && event.data.requestId,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
      port.close();
    }
  }));
});
