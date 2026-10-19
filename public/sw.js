/* eslint-disable no-restricted-globals */
// Service Worker for Ai_agents offline reading (MVP Issue #48)
const SHELL_CACHE = 'ai-agents-shell-v1';
const TOPICS_CACHE = 'ai-agents-topics-v1';

const SHELL_URLS = [
  '/',
  '/saved',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      for (const url of SHELL_URLS) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            await cache.put(url, res);
          }
        } catch {
          // Best effort during install
        }
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean only older versions of OUR OWN caches; never touch unrelated caches
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith('ai-agents-') && k !== SHELL_CACHE && k !== TOPICS_CACHE)
            .map((k) => caches.delete(k))
        )
      ),
    ])
  );
});

// Arabic offline unavailable response for unsaved topics
function buildOfflineUnavailableResponse(pathname) {
  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>المحتوى غير متاح بدون إنترنت — سلاح العصر</title>
  <style>
    :root {
      --bg: #090d16;
      --surface: #121826;
      --border: #232d42;
      --text: #f8fafc;
      --muted: #94a3b8;
      --brand: #2563eb;
      --amber: #f59e0b;
    }
    body {
      margin: 0;
      padding: 2rem 1rem;
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
    }
    .card {
      max-width: 540px;
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.15);
      color: var(--amber);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      margin: 0 0 1rem 0;
      line-height: 1.3;
    }
    p {
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.7;
      margin: 0 0 1.5rem 0;
    }
    .actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    a.btn {
      display: inline-flex;
      align-items: center;
      padding: 0.6rem 1.25rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      font-weight: bold;
      text-decoration: none;
      transition: all 0.15s;
    }
    a.btn-primary {
      background: var(--brand);
      color: #fff;
    }
    a.btn-secondary {
      background: #1e293b;
      color: var(--text);
      border: 1px solid var(--border);
    }
  </style>
</head>
<body>
  <div class="card" role="alert" aria-live="assertive">
    <span class="badge">وضع عدم الاتصال بالإنترنت</span>
    <h1>هذا الموضوع غير محفوظ للمطالعة بدون إنترنت</h1>
    <p>
      لم يتم حفظ هذا الموضوع مسبقاً أثناء اتصالك بالإنترنت. عند عودة الاتصال يمكنك حفظه بضغطة زر لمطالعته لاحقاً دون شبكة.
    </p>
    <div class="actions">
      <a href="/saved" class="btn btn-primary">استعراض المواضيع المحفوظة محلياً</a>
      <a href="/" class="btn btn-secondary">العودة للرئيسية</a>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Ai-Agents-Offline': 'unavailable',
    },
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // 1. Navigation requests (Page reloads, links)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        // Network failed (offline)
        const pathname = url.pathname;

        // Check if this is a topic page
        if (pathname.startsWith('/learn/')) {
          const topicsCache = await caches.open(TOPICS_CACHE);
          let matched = await topicsCache.match(request);
          if (!matched) {
            const cleanUrl = url.origin + pathname.replace(/\/$/, '');
            matched = await topicsCache.match(cleanUrl);
          }
          if (matched) {
            return matched;
          }
          // Not saved offline
          return buildOfflineUnavailableResponse(pathname);
        }

        // Check if shell or saved page is cached
        const shellCache = await caches.open(SHELL_CACHE);
        const cachedShell = await shellCache.match(request);
        if (cachedShell) {
          return cachedShell;
        }

        if (pathname === '/saved') {
          const savedMatch = await shellCache.match('/saved');
          if (savedMatch) return savedMatch;
        }

        return buildOfflineUnavailableResponse(pathname);
      })
    );
    return;
  }

  // 2. Static asset requests: Check caches for existing saved assets
  // Do NOT blanket-cache everything! Serve from cache if present; fallback to network.
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).catch(() => {
          return new Response('Asset not available offline', { status: 503 });
        });
      })
    );
    return;
  }
});

// 3. Message handling for controlled atomic cache addition and removal
self.addEventListener('message', async (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;

  if (data.type === 'CACHE_TOPIC_UNIT') {
    const { slug } = data;
    const stagingCacheName = `ai-agents-topic-staging-${slug}-${Date.now()}`;
    const topicUrl = `/learn/${slug}`;

    try {
      const stagingCache = await caches.open(stagingCacheName);

      // 1. Fetch HTML
      const htmlRes = await fetch(topicUrl, { cache: 'reload' });
      if (!htmlRes.ok) {
        throw new Error(`Failed to fetch topic HTML (${htmlRes.status})`);
      }
      const htmlText = await htmlRes.clone().text();

      // Extract required script and stylesheet assets
      const assetMatches = Array.from(
        new Set(htmlText.match(/\/(_next\/static\/[^"'\s>]+)/g) || [])
      );

      // Store HTML in staging
      await stagingCache.put(topicUrl, htmlRes);

      // 2. Fetch all dependent assets into staging; fail if any required asset fails
      for (const assetUrl of assetMatches) {
        const assetRes = await fetch(assetUrl, { cache: 'reload' });
        if (!assetRes.ok) {
          throw new Error(`Failed to fetch dependent asset: ${assetUrl} (${assetRes.status})`);
        }
        await stagingCache.put(assetUrl, assetRes);
      }

      // 3. Atomic commit: Move all entries from staging into TOPICS_CACHE
      const topicsCache = await caches.open(TOPICS_CACHE);
      const stagedRequests = await stagingCache.keys();
      for (const req of stagedRequests) {
        const res = await stagingCache.match(req);
        if (res) {
          await topicsCache.put(req, res);
        }
      }

      // 4. Clean up staging cache
      await caches.delete(stagingCacheName);

      event.ports?.[0]?.postMessage({ type: 'CACHE_TOPIC_UNIT_RESULT', slug, success: true });
      event.source?.postMessage({ type: 'CACHE_TOPIC_UNIT_RESULT', slug, success: true });
    } catch (err) {
      // Abort and delete staging cache; keep existing TOPICS_CACHE untouched
      try {
        await caches.delete(stagingCacheName);
      } catch {
        // ignore
      }
      const errorMsg = err instanceof Error ? err.message : String(err);
      event.ports?.[0]?.postMessage({ type: 'CACHE_TOPIC_UNIT_RESULT', slug, success: false, error: errorMsg });
      event.source?.postMessage({ type: 'CACHE_TOPIC_UNIT_RESULT', slug, success: false, error: errorMsg });
    }
  }

  if (data.type === 'PURGE_TOPIC_CACHE') {
    const { slug } = data;
    try {
      const topicsCache = await caches.open(TOPICS_CACHE);
      await topicsCache.delete(`/learn/${slug}`);
      await topicsCache.delete(`/learn/${slug}/`);
      event.source?.postMessage({ type: 'PURGE_TOPIC_SUCCESS', slug });
    } catch (err) {
      console.error('Service Worker PURGE_TOPIC_CACHE error:', err);
    }
  }

  if (data.type === 'PURGE_ALL_TOPICS') {
    try {
      await caches.delete(TOPICS_CACHE);
      event.source?.postMessage({ type: 'PURGE_ALL_SUCCESS' });
    } catch (err) {
      console.error('Service Worker PURGE_ALL_TOPICS error:', err);
    }
  }
});
