import type { TopicItem } from '@/src/types/topic';
import type { TopicLearningContent } from '@/src/types/learning';
import { getTopicLearningContent } from '@/src/lib/learningContent';
import { resolveCanonicalSlug } from '@/src/lib/topicRegistry';

export type TopicOfflineStatus = 'unsaved' | 'saving' | 'saved' | 'updating' | 'failed' | 'unsupported';

export interface SavedTopicQuizMetadata {
  id: string;
  version: number;
  title: string;
  questionCount: number;
  approvalState: 'proposed' | 'approved';
}

export interface SavedTopicMetadata {
  slug: string;
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  summary?: string;
  categoryName?: string;
  stageTag?: string;
  savedAt: number;
  version: string;
  contentVersion: number;
  bundleId?: string;
  diagramCount: number;
  sizeBytes?: number;
  quiz?: SavedTopicQuizMetadata | null;
  onlineOnlyVideoCount?: number;
}

export interface OfflineTopicPayload {
  metadata: SavedTopicMetadata;
  topic: TopicItem;
  diagramSnapshots?: Record<string, string>;
  learningContent?: TopicLearningContent;
  contentVersion: number;
  bundleId?: string;
  savedAt: number;
}

export const OFFLINE_STORAGE_KEYS = {
  // Read only for compatibility with bundles written before the versioned worker.
  MANIFEST: 'ai_agents_offline_manifest_v1',
  TOPIC_PREFIX: 'ai_agents_offline_topic_v1:',
  STATUS_PREFIX: 'ai_agents_offline_status_v1:',
} as const;

export const OFFLINE_CACHE_NAMES = {
  SHELL: 'ai-agents-shell-v2',
  SHELL_INDEX: 'ai-agents-shell-index-v2',
  TOPICS: 'ai-agents-topic-index-v2',
  LEGACY_TOPICS: 'ai-agents-topics-v1',
  TOPIC_BUNDLE_PREFIX: 'ai-agents-topic-v2-',
} as const;

export const OFFLINE_STORAGE_CHANGE_EVENT = 'ai-agents-offline-storage-change';

const META_PATH = '/__ai_agents_offline_v2__/';
const TRANSIENT_FLAG_TTL_MS = 45000;
const SERVICE_WORKER_TIMEOUT_MS = 90000;
const SERVICE_WORKER_READY_TIMEOUT_MS = 20000;
const REQUIRED_DIAGRAM_PERSPECTIVES = ['architecture', 'flow', 'sequence'] as const;

interface OfflineBundlePointer {
  slug: string;
  bundleId: string;
  cacheName: string;
  savedAt: number;
}

interface VerifiedBundle {
  pointer: OfflineBundlePointer;
  payload: OfflineTopicPayload;
  cache: Cache;
}

function safelyGetTransientStatus(slug: string): TopicOfflineStatus | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.sessionStorage.getItem(OFFLINE_STORAGE_KEYS.STATUS_PREFIX + slug);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (Date.now() - Number(parsed.timestamp || 0) > TRANSIENT_FLAG_TTL_MS) {
      window.sessionStorage.removeItem(OFFLINE_STORAGE_KEYS.STATUS_PREFIX + slug);
      return null;
    }
    return parsed.status as TopicOfflineStatus;
  } catch {
    return null;
  }
}

function setTransientStatus(slug: string, status: TopicOfflineStatus): void {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(
        OFFLINE_STORAGE_KEYS.STATUS_PREFIX + slug,
        JSON.stringify({ status, timestamp: Date.now() })
      );
    }
  } catch {
    // Transient UI state is optional and never gates reading.
  }
}

function clearTransientStatus(slug: string): void {
  try {
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(OFFLINE_STORAGE_KEYS.STATUS_PREFIX + slug);
  } catch {
    // Transient UI state is optional and never gates reading.
  }
}

export function broadcastOfflineStorageChange(slug: string, status: TopicOfflineStatus): void {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent(OFFLINE_STORAGE_CHANGE_EVENT, {
      detail: { slug: resolveCanonicalSlug(slug), status },
    }));
  } catch {
    // Events are only a best-effort UI refresh signal.
  }
}

/** Cache Storage and a service worker are the authoritative offline bundle store. */
export function isOfflineStorageSupported(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  try {
    return 'serviceWorker' in navigator && 'caches' in window;
  } catch {
    return false;
  }
}

export async function registerOfflineServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return null;
  try {
    if (!('serviceWorker' in navigator)) return null;
    return await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  } catch (error) {
    console.warn('Service Worker registration failed:', error);
    return null;
  }
}

/** Read the old manifest so previously saved topics can be checked and migrated. */
export function readOfflineManifest(): Record<string, SavedTopicMetadata> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(OFFLINE_STORAGE_KEYS.MANIFEST);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as Record<string, SavedTopicMetadata>;
  } catch {
    return {};
  }
}

function topicIndexUrl(slug: string): string {
  return new URL(META_PATH + 'topics/' + encodeURIComponent(slug), window.location.origin).href;
}

function bundleManifestUrl(bundleId: string): string {
  return new URL(META_PATH + 'bundle/' + encodeURIComponent(bundleId) + '/manifest.json', window.location.origin).href;
}

function bundlePayloadUrl(bundleId: string): string {
  return new URL(META_PATH + 'bundle/' + encodeURIComponent(bundleId) + '/payload.json', window.location.origin).href;
}

async function parseJson<T>(cache: Cache, url: string): Promise<T | null> {
  try {
    const response = await cache.match(url);
    return response ? await response.json() as T : null;
  } catch {
    return null;
  }
}

function contentVersionFromHtml(html: string): string | null {
  const match = html.match(/data-offline-content-version\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : null;
}

async function verifyBundle(cacheName: string, slug: string, bundleId: string): Promise<VerifiedBundle | null> {
  try {
    const cache = await window.caches.open(cacheName);
    const manifest = await parseJson<{
      complete: boolean;
      slug: string;
      bundleId: string;
      htmlPath: string;
      payloadPath: string;
      assets: string[];
    }>(cache, bundleManifestUrl(bundleId));
    if (!manifest || manifest.complete !== true || manifest.slug !== slug || manifest.bundleId !== bundleId ||
      !manifest.htmlPath || !manifest.payloadPath || !Array.isArray(manifest.assets)) return null;

    const htmlUrl = new URL(manifest.htmlPath, window.location.origin).href;
    const htmlResponse = await cache.match(htmlUrl);
    if (!htmlResponse) return null;
    const html = await htmlResponse.clone().text();
    const payload = await parseJson<OfflineTopicPayload>(cache, bundlePayloadUrl(bundleId));
    if (!payload || !payload.topic || !payload.metadata || payload.metadata.slug !== slug ||
      payload.topic.slug !== slug || payload.bundleId !== bundleId || payload.metadata.bundleId !== bundleId ||
      payload.contentVersion !== payload.metadata.contentVersion) return null;
    if (payload.metadata.diagramCount > 0) {
      const snapshots = payload.diagramSnapshots;
      if (!snapshots || REQUIRED_DIAGRAM_PERSPECTIVES.some((perspective) =>
        typeof snapshots[perspective] !== 'string' || !snapshots[perspective].toLowerCase().includes('<svg')
      )) return null;
    }
    if (payload.learningContent && (payload.learningContent.topicSlug !== slug ||
      payload.learningContent.contentVersion !== payload.contentVersion ||
      !payload.learningContent.quiz || !Array.isArray(payload.learningContent.quiz.questions) ||
      contentVersionFromHtml(html) !== String(payload.contentVersion))) return null;
    for (const assetUrl of manifest.assets) {
      if (!(await cache.match(assetUrl))) return null;
    }
    return { cache, payload, pointer: { slug, bundleId, cacheName, savedAt: payload.savedAt } };
  } catch {
    return null;
  }
}

async function readActiveBundle(slug: string): Promise<VerifiedBundle | null> {
  try {
    const index = await window.caches.open(OFFLINE_CACHE_NAMES.TOPICS);
    const pointer = await parseJson<OfflineBundlePointer>(index, topicIndexUrl(slug));
    if (!pointer || pointer.slug !== slug || !pointer.bundleId || !pointer.cacheName) return null;
    return verifyBundle(pointer.cacheName, slug, pointer.bundleId);
  } catch {
    return null;
  }
}

async function readHistoricalBundle(slug: string, bundleId: string): Promise<VerifiedBundle | null> {
  return verifyBundle(OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX + slug + '-' + bundleId, slug, bundleId);
}

function readLegacyPayload(slug: string): OfflineTopicPayload | null {
  try {
    const raw = window.localStorage.getItem(OFFLINE_STORAGE_KEYS.TOPIC_PREFIX + slug);
    if (!raw) return null;
    const payload = JSON.parse(raw) as OfflineTopicPayload;
    return payload && payload.metadata && payload.metadata.slug === slug && payload.topic ? payload : null;
  } catch {
    return null;
  }
}

/** Retrieve the Cache Storage snapshot or a readable snapshot from the prior format. */
export async function getSavedTopicOfflinePayload(
  slugOrId: string,
  bundleId?: string
): Promise<OfflineTopicPayload | null> {
  if (typeof window === 'undefined') return null;
  const slug = resolveCanonicalSlug(slugOrId);
  if (!slug) return null;
  const bundle = bundleId ? await readHistoricalBundle(slug, bundleId) : await readActiveBundle(slug);
  return bundle ? bundle.payload : readLegacyPayload(slug);
}

function makeBundleId(contentVersion: number): string {
  const random = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  return String(contentVersion) + '-' + random;
}

async function getActiveWorker(readyTimeoutMs = SERVICE_WORKER_READY_TIMEOUT_MS): Promise<ServiceWorker | null> {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return null;
  try {
    if (navigator.serviceWorker.controller) return navigator.serviceWorker.controller;
    let registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    let timeoutId: number | undefined;
    try {
      registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<never>((_, reject) => {
          timeoutId = window.setTimeout(() => reject(new Error('Service worker activation timed out')), readyTimeoutMs);
        }),
      ]);
    } finally {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    }
    return registration.active || null;
  } catch (error) {
    if (error instanceof Error && error.message.includes('activation timed out')) throw error;
    return null;
  }
}

function testOptionsFromLocalUrl(): {
  testFailureAt?: string;
  testResponseDelayMs?: number;
  testTimeoutMs?: number;
  testWorkerReadyTimeoutMs?: number;
  testSourceVersion?: number;
  testLoadedAsset?: string;
  testCommitDelayMs?: number;
} {
  if (typeof window === 'undefined' || !['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) return {};
  const params = new URLSearchParams(window.location.search);
  const failure = params.get('offline-test-failure');
  const allowed = new Set(['prepare-quota', 'commit-quota', 'activate-quota', 'activate-committed-then-quota']);
  const testFailureAt = failure && allowed.has(failure) ? failure : undefined;
  const delay = Number(params.get('offline-test-response-delay') || 0);
  const timeout = Number(params.get('offline-test-timeout') || 0);
  const readyTimeout = Number(params.get('offline-test-ready-timeout') || 0);
  const sourceVersion = Number(params.get('offline-test-source-version') || 0);
  const loadedAsset = params.get('offline-test-loaded-asset');
  const commitDelay = Number(params.get('offline-test-commit-delay') || 0);
  return {
    ...(testFailureAt ? { testFailureAt } : {}),
    ...(Number.isFinite(delay) && delay > 0 ? { testResponseDelayMs: Math.min(delay, 5000) } : {}),
    ...(Number.isFinite(timeout) && timeout > 0 ? { testTimeoutMs: Math.min(timeout, 10000) } : {}),
    ...(Number.isFinite(readyTimeout) && readyTimeout > 0 ? { testWorkerReadyTimeoutMs: Math.min(readyTimeout, 10000) } : {}),
    ...(Number.isFinite(sourceVersion) && sourceVersion > 0 ? { testSourceVersion: sourceVersion } : {}),
    ...(loadedAsset && loadedAsset.length < 300 ? { testLoadedAsset: loadedAsset } : {}),
    ...(Number.isFinite(commitDelay) && commitDelay > 0 ? { testCommitDelayMs: Math.min(commitDelay, 5000) } : {}),
  };
}

async function postWorkerMessage<T extends { success?: boolean; error?: string }>(
  worker: ServiceWorker,
  message: Record<string, unknown>,
  timeoutMs = SERVICE_WORKER_TIMEOUT_MS
): Promise<T> {
  const requestId = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  return new Promise<T>((resolve, reject) => {
    const channel = new MessageChannel();
    const timer = window.setTimeout(() => {
      channel.port1.close();
      reject(new Error('Service worker cache request timed out'));
    }, timeoutMs);
    channel.port1.onmessage = (event) => {
      if (event.data && event.data.requestId && event.data.requestId !== requestId) return;
      window.clearTimeout(timer);
      channel.port1.close();
      const result = event.data as T;
      if (result && result.success === false) {
        const error = new Error(result.error || 'Offline storage operation failed') as Error & { name?: string };
        const errorName = (result as T & { errorName?: string }).errorName;
        if (errorName) error.name = errorName;
        reject(error);
      } else {
        resolve(result);
      }
    };
    try {
      worker.postMessage({ ...message, requestId }, [channel.port2]);
    } catch (error) {
      window.clearTimeout(timer);
      channel.port1.close();
      reject(error);
    }
  });
}

function isCachedAssetPath(pathname: string): boolean {
  return pathname.startsWith('/_next/static/') ||
    /\.(?:js|mjs|css|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|otf|json)$/i.test(pathname);
}

function addCachedAsset(candidate: string, baseUrl: string, assets: Set<string>): void {
  if (!candidate || /^(?:data:|blob:|#|javascript:)/i.test(candidate)) return;
  try {
    const url = new URL(candidate, baseUrl);
    if (url.origin === window.location.origin && isCachedAssetPath(url.pathname) &&
        !/(?:\/\.\.\.|%24|%7b|\$\{)/i.test(url.pathname)) assets.add(url.href);
  } catch {
    // Ignore malformed generated references.
  }
}

function assetsFromHtml(html: string, pageUrl: string): Set<string> {
  const assets = new Set<string>();
  const pattern = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = pattern.exec(html))) addCachedAsset(match[1], pageUrl, assets);
  return assets;
}

function assetsFromCss(css: string, stylesheetUrl: string): Set<string> {
  const urls = new Set<string>();
  const urlPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let match;
  while ((match = urlPattern.exec(css))) addCachedAsset(match[1].trim(), stylesheetUrl, urls);
  const importPattern = /@import\s+(?:url\()?\s*["']?([^"')\s;]+)["']?\s*\)?/gi;
  while ((match = importPattern.exec(css))) addCachedAsset(match[1].trim(), stylesheetUrl, urls);
  return urls;
}

function assetsFromJavaScript(js: string, scriptUrl: string): Set<string> {
  const urls = assetsFromHtml(js, scriptUrl);
  const pattern = /(\/_next\/|_next\/|static\/)(?:static\/)?(?:chunks|css|media)\/[A-Za-z0-9_./@-]+\.(?:js|mjs|css|svg|png|webp|woff2?|ttf|otf)(?:\?[A-Za-z0-9_%=&-]+)?/gi;
  let match;
  while ((match = pattern.exec(js))) {
    let candidate = match[0];
    if (candidate.includes('/...')) continue;
    if (candidate.startsWith('static/')) candidate = '/_next/' + candidate;
    else if (candidate.startsWith('_next/')) candidate = '/' + candidate;
    addCachedAsset(candidate, scriptUrl, urls);
  }
  // Next's Webpack runtime may encode lazy chunk URLs as numeric ids and
  // hashes instead of literal paths. Parse that mapping without executing JS
  // so readiness checks cover lazy dependencies as well as initial scripts.
  const runtimeStart = js.match(/\.u\s*=\s*[A-Za-z_$][\w$]*\s*=>/);
  if (runtimeStart && runtimeStart.index !== undefined) {
    const expressionStart = runtimeStart.index + runtimeStart[0].length;
    const remaining = js.slice(expressionStart);
    const runtimeEnd = /\.miniCssF\s*=/.exec(remaining);
    const runtime = runtimeEnd ? remaining.slice(0, runtimeEnd.index) : '';
    const maps: Array<Map<string, string>> = [];
    const objectPattern = /\(\{([^{}]+)\}\)/g;
    let objectMatch;
    while ((objectMatch = objectPattern.exec(runtime))) {
      const entries = new Map<string, string>();
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
        addCachedAsset('/_next/static/chunks/' + stem + '.' + hash + '.' + extension, scriptUrl, urls);
      }
    }
  }
  return urls;
}

function loadedPageAssets(): string[] {
  if (typeof document === 'undefined') return [];
  const assets = new Set<string>();
  const elements = document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>('script[src],link[href]');
  for (const element of Array.from(elements)) {
    try {
      const value = element instanceof HTMLScriptElement ? element.src : element.href;
      const url = new URL(value, window.location.origin);
      if (url.origin === window.location.origin && url.pathname.startsWith('/_next/static/')) {
        assets.add(url.pathname + url.search);
      }
    } catch {
      // Ignore malformed DOM URLs.
    }
  }
  return Array.from(assets).sort();
}

async function legacyTopicBundleIsComplete(slug: string): Promise<boolean> {
  try {
    const manifest = readOfflineManifest();
    const payload = readLegacyPayload(slug);
    if (!manifest[slug] || !payload) return false;
    const cache = await window.caches.open(OFFLINE_CACHE_NAMES.LEGACY_TOPICS);
    const pageUrl = new URL('/learn/' + slug, window.location.origin).href;
    const htmlResponse = await cache.match(pageUrl) || await cache.match(pageUrl + '/');
    if (!htmlResponse) return false;
    const html = await htmlResponse.clone().text();
    const queue = Array.from(assetsFromHtml(html, pageUrl));
    const visited = new Set<string>();
    while (queue.length) {
      const assetUrl = queue.shift()!;
      if (visited.has(assetUrl)) continue;
      visited.add(assetUrl);
      const response = await cache.match(assetUrl);
      if (!response) return false;
      const type = response.headers.get('content-type') || '';
      const pathname = new URL(assetUrl).pathname;
      let dependencies = new Set<string>();
      if (type.includes('text/css') || pathname.endsWith('.css')) {
        dependencies = assetsFromCss(await response.clone().text(), assetUrl);
      } else if (type.includes('javascript') || /\.(?:mjs|js)$/i.test(pathname)) {
        dependencies = assetsFromJavaScript(await response.clone().text(), assetUrl);
      }
      for (const dependency of dependencies) {
        if (!visited.has(dependency)) queue.push(dependency);
      }
    }
    return true;
  } catch {
    return false;
  }
}

/** Render SVG snapshots for each Mermaid perspective before saving the unit. */
export async function generateDiagramSnapshots(topic: TopicItem): Promise<Record<string, string>> {
  const snapshots: Record<string, string> = {};
  if (!topic || !topic.diagramCount || topic.diagramCount < 1 || typeof window === 'undefined') return snapshots;
  try {
    const { getTopicMermaidDiagram, DIAGRAM_PERSPECTIVES } = await import('@/src/utils/diagramEngine');
    const mermaidModule = await import('mermaid');
    const mermaid: any = mermaidModule.default || mermaidModule;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'neutral',
      fontFamily: 'inherit, system-ui, -apple-system, sans-serif',
      fontSize: 13,
    });
    for (const perspective of DIAGRAM_PERSPECTIVES) {
      const code = getTopicMermaidDiagram(topic, perspective.id);
      if (!code) continue;
      try {
        const result = await mermaid.render(
          'snapshot-' + topic.id + '-' + perspective.id + '-' + Date.now(),
          code
        );
        snapshots[perspective.id] = result.svg;
      } catch (error) {
        console.warn('Snapshot render failed for perspective ' + perspective.id + ':', error);
      }
    }
    const missing = DIAGRAM_PERSPECTIVES.filter((perspective) => !snapshots[perspective.id]);
    if (missing.length) {
      throw new Error('تعذر تصيير جميع مخططات الموضوع: ' + missing.map((item) => item.label).join('، '));
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('تعذر تصيير جميع مخططات')) throw error;
    console.warn('Could not generate diagram snapshots:', error);
  }
  return snapshots;
}

async function verifyActiveBundle(slug: string, expectedBundleId?: string): Promise<VerifiedBundle | null> {
  const active = await readActiveBundle(slug);
  return active && (!expectedBundleId || active.pointer.bundleId === expectedBundleId) ? active : null;
}

function quotaMessage(error: unknown): string {
  if (error instanceof Error && error.name === 'QuotaExceededError') {
    return 'تم تجاوز سعة التخزين المتاحة في المتصفح. يرجى حذف بعض المواضيع المحفوظة قديماً.';
  }
  return error instanceof Error ? error.message : 'تعذر إتمام الحفظ بدون إنترنت';
}

/** Save a complete, version-matched lesson, diagram, quiz, and app-asset bundle. */
export async function saveTopicOffline(
  topic: TopicItem,
  options?: { diagramSnapshots?: Record<string, string>; isUpdate?: boolean }
): Promise<{ success: boolean; error?: string }> {
  if (typeof window === 'undefined') return { success: false, error: 'Environment is not a browser window' };
  if (!isOfflineStorageSupported()) {
    return { success: false, error: 'المتصفح لا يوفر دعم الحفظ بدون إنترنت (PWA/Service Worker)' };
  }
  const canonical = resolveCanonicalSlug(topic && topic.slug);
  if (!canonical) return { success: false, error: 'تعذر تحديد الموضوع المطلوب حفظه' };

  setTransientStatus(canonical, options && options.isUpdate ? 'updating' : 'saving');
  broadcastOfflineStorageChange(canonical, options && options.isUpdate ? 'updating' : 'saving');
  let bundleId = '';
  let worker: ServiceWorker | null = null;

  try {
    let diagramSnapshots = options && options.diagramSnapshots;
    if (!diagramSnapshots && topic.diagramCount > 0) diagramSnapshots = await generateDiagramSnapshots(topic);
    if (topic.diagramCount > 0) {
      const { DIAGRAM_PERSPECTIVES } = await import('@/src/utils/diagramEngine');
      const missing = DIAGRAM_PERSPECTIVES.filter((perspective) => !diagramSnapshots?.[perspective.id]);
      if (missing.length) {
        throw new Error('تعذر تصيير جميع مخططات الموضوع. لا يمكن حفظ الموضوع بدونها.');
      }
    }

    const learningContent = getTopicLearningContent(canonical);
    const contentVersion = learningContent ? learningContent.contentVersion : 1;
    bundleId = makeBundleId(contentVersion);
    const payloadText = JSON.stringify({ topic, diagramSnapshots, learningContent });
    const savedAt = Date.now();
    const quiz = learningContent && learningContent.quiz ? {
      id: learningContent.quiz.id,
      version: learningContent.quiz.version,
      title: learningContent.quiz.title,
      questionCount: learningContent.quiz.questions.length,
      approvalState: learningContent.quiz.scoringPolicy.approval.state,
    } : null;
    const metadata: SavedTopicMetadata = {
      slug: canonical,
      id: topic.id,
      number: topic.number,
      title: topic.title,
      subtitle: topic.subtitle,
      summary: topic.summary,
      categoryName: topic.categoryName,
      stageTag: topic.stageTag,
      savedAt,
      version: String(contentVersion),
      contentVersion,
      bundleId,
      diagramCount: topic.diagramCount || 0,
      sizeBytes: new Blob([payloadText]).size,
      quiz,
      onlineOnlyVideoCount: learningContent ? learningContent.candidateVideos.length : 0,
    };
    const payload: OfflineTopicPayload = {
      metadata,
      topic,
      diagramSnapshots,
      learningContent,
      contentVersion,
      bundleId,
      savedAt,
    };

    const versionMarker = document.querySelector('[data-offline-content-version]');
    const loadedContentVersion = versionMarker && versionMarker.getAttribute('data-offline-content-version');
    if (learningContent && loadedContentVersion !== String(contentVersion)) {
      throw new Error('تغير إصدار الدرس بعد فتحه. أعد تحميل الصفحة ثم حاول الحفظ مرة أخرى.');
    }
    const optionsForTest = testOptionsFromLocalUrl();
    worker = await getActiveWorker(optionsForTest.testWorkerReadyTimeoutMs);
    if (!worker) throw new Error('تعذر تشغيل خدمة الحفظ بدون إنترنت');

    const request = {
      type: 'CACHE_TOPIC_UNIT',
      slug: canonical,
      bundleId,
      payload,
      contentVersion,
      loadedAssets: [
        ...loadedPageAssets(),
        ...(optionsForTest.testLoadedAsset ? [optionsForTest.testLoadedAsset] : []),
      ],
      ...optionsForTest,
    };
    try {
      const response = await postWorkerMessage<{
        type: string;
        success?: boolean;
        error?: string;
        errorName?: string;
      }>(worker, request, optionsForTest.testTimeoutMs || SERVICE_WORKER_TIMEOUT_MS);
      if (!response.success) throw new Error(response.error || 'تعذر تنزيل ملفات الموضوع للعمل بدون إنترنت');
    } catch (error) {
      if (error instanceof Error && error.message.includes('timed out')) {
        // The write acknowledgment can lag behind its single pointer commit.
        if (await verifyActiveBundle(canonical, bundleId)) {
          clearTransientStatus(canonical);
          broadcastOfflineStorageChange(canonical, 'saved');
          return { success: true };
        }
        try {
          await postWorkerMessage(worker, {
            type: 'CANCEL_TOPIC_UNIT',
            slug: canonical,
            bundleId,
          }, 5000);
        } catch {
          // The worker checks this token before publishing the bundle pointer.
        }
        if (await verifyActiveBundle(canonical, bundleId)) {
          clearTransientStatus(canonical);
          broadcastOfflineStorageChange(canonical, 'saved');
          return { success: true };
        }
      }
      throw error;
    }

    if (!(await verifyActiveBundle(canonical, bundleId))) {
      throw new Error('تعذر التحقق من اكتمال الحزمة المحفوظة');
    }
    clearTransientStatus(canonical);
    broadcastOfflineStorageChange(canonical, 'saved');
    return { success: true };
  } catch (error) {
    clearTransientStatus(canonical);
    // The active bundle remains unchanged after failure. Subscribers consume
    // this operation state directly instead of asynchronously rereading the
    // old bundle and replacing the retry state with "saved".
    broadcastOfflineStorageChange(canonical, 'failed');
    console.error('Failed saving topic offline [' + canonical + ']:', error);
    return { success: false, error: quotaMessage(error) };
  }
}

/** Remove downloaded material without touching local learner records. */
export async function removeTopicOffline(slugOrId: string): Promise<{ success: boolean }> {
  if (typeof window === 'undefined' || !('caches' in window)) return { success: false };
  const slug = resolveCanonicalSlug(slugOrId);
  if (!slug) return { success: false };
  try {
    const worker = await getActiveWorker();
    if (worker) {
      try {
        await postWorkerMessage(worker, { type: 'PURGE_TOPIC_CACHE', slug });
      } catch {
        // Complete cleanup through Cache Storage if the worker stopped.
      }
    }
    const index = await window.caches.open(OFFLINE_CACHE_NAMES.TOPICS);
    await index.delete(topicIndexUrl(slug));
    const names = await window.caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX + slug + '-'))
      .map((name) => window.caches.delete(name)));
    const legacy = await window.caches.open(OFFLINE_CACHE_NAMES.LEGACY_TOPICS);
    await legacy.delete(new URL('/learn/' + slug, window.location.origin).href);
    await legacy.delete(new URL('/learn/' + slug + '/', window.location.origin).href);
    try {
      window.localStorage.removeItem(OFFLINE_STORAGE_KEYS.TOPIC_PREFIX + slug);
      const oldManifest = readOfflineManifest();
      delete oldManifest[slug];
      window.localStorage.setItem(OFFLINE_STORAGE_KEYS.MANIFEST, JSON.stringify(oldManifest));
    } catch {
      // New bundles do not rely on localStorage; learner records remain separate.
    }
    clearTransientStatus(slug);
    broadcastOfflineStorageChange(slug, 'unsaved');
    return { success: true };
  } catch (error) {
    console.error('Failed removing topic offline [' + slug + ']:', error);
    return { success: false };
  }
}

/** List only bundles whose actual cached HTML, payload, and all assets still exist. */
export async function listSavedTopicsOffline(): Promise<SavedTopicMetadata[]> {
  if (typeof window === 'undefined' || !('caches' in window)) return [];
  const saved = new Map<string, SavedTopicMetadata>();
  try {
    const index = await window.caches.open(OFFLINE_CACHE_NAMES.TOPICS);
    for (const request of await index.keys()) {
      const pointer = await parseJson<OfflineBundlePointer>(index, request.url);
      if (!pointer || !pointer.slug) continue;
      const bundle = await verifyActiveBundle(pointer.slug, pointer.bundleId);
      if (!bundle) {
        await index.delete(request);
        continue;
      }
      saved.set(pointer.slug, bundle.payload.metadata);
    }
    const oldManifest = readOfflineManifest();
    for (const [slug, metadata] of Object.entries(oldManifest)) {
      if (!saved.has(slug) && await legacyTopicBundleIsComplete(slug)) saved.set(slug, metadata);
    }
  } catch {
    return [];
  }
  return Array.from(saved.values()).sort((a, b) => b.savedAt - a.savedAt);
}

/** A topic is saved only when its active pointer and entire referenced bundle validate. */
export async function getTopicOfflineStatus(slugOrId: string): Promise<TopicOfflineStatus> {
  if (typeof window === 'undefined') return 'unsaved';
  if (!isOfflineStorageSupported()) return 'unsupported';
  const slug = resolveCanonicalSlug(slugOrId);
  if (!slug) return 'unsaved';
  const transient = safelyGetTransientStatus(slug);
  if (transient === 'saving' || transient === 'updating') return transient;
  if (await readActiveBundle(slug)) return 'saved';
  return await legacyTopicBundleIsComplete(slug) ? 'saved' : 'unsaved';
}

export async function clearAllOfflineSavedTopics(): Promise<{ success: boolean; clearedCount: number }> {
  if (typeof window === 'undefined' || !('caches' in window)) return { success: false, clearedCount: 0 };
  try {
    const topics = await listSavedTopicsOffline();
    const worker = await getActiveWorker();
    if (worker) {
      try {
        await postWorkerMessage(worker, { type: 'PURGE_ALL_TOPICS' });
      } catch {
        // Cache Storage cleanup below handles a stopped worker.
      }
    }
    const names = await window.caches.keys();
    await Promise.all(names
      .filter((name) => name === OFFLINE_CACHE_NAMES.TOPICS ||
        name === OFFLINE_CACHE_NAMES.LEGACY_TOPICS ||
        name.startsWith(OFFLINE_CACHE_NAMES.TOPIC_BUNDLE_PREFIX) ||
        name.startsWith('ai-agents-topic-stage-v2-'))
      .map((name) => window.caches.delete(name)));
    try {
      window.localStorage.removeItem(OFFLINE_STORAGE_KEYS.MANIFEST);
      for (const topic of topics) window.localStorage.removeItem(OFFLINE_STORAGE_KEYS.TOPIC_PREFIX + topic.slug);
    } catch {
      // Learner records use separate keys and are never cleared here.
    }
    for (const topic of topics) {
      clearTransientStatus(topic.slug);
      broadcastOfflineStorageChange(topic.slug, 'unsaved');
    }
    return { success: true, clearedCount: topics.length };
  } catch (error) {
    console.error('Failed clearing offline topics:', error);
    return { success: false, clearedCount: 0 };
  }
}
