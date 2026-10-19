import type { TopicItem } from '@/src/types/topic';
import { resolveCanonicalSlug } from '@/src/lib/topicRegistry';

export type TopicOfflineStatus = 'unsaved' | 'saving' | 'saved' | 'updating' | 'failed' | 'unsupported';

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
  diagramCount: number;
  sizeBytes?: number;
}

export interface OfflineTopicPayload {
  metadata: SavedTopicMetadata;
  topic: TopicItem;
  diagramSnapshots?: Record<string, string>;
  savedAt: number;
}

export const OFFLINE_STORAGE_KEYS = {
  MANIFEST: 'ai_agents_offline_manifest_v1',
  TOPIC_PREFIX: 'ai_agents_offline_topic_v1:',
  STATUS_PREFIX: 'ai_agents_offline_status_v1:',
} as const;

export const OFFLINE_CACHE_NAMES = {
  SHELL: 'ai-agents-shell-v1',
  TOPICS: 'ai-agents-topics-v1',
} as const;

export const OFFLINE_STORAGE_CHANGE_EVENT = 'ai-agents-offline-storage-change';

// Transient flags expire after 45 seconds to prevent permanent stuck states across crashes
const TRANSIENT_FLAG_TTL_MS = 45000;

function getTransientStatus(slug: string): TopicOfflineStatus | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(`${OFFLINE_STORAGE_KEYS.STATUS_PREFIX}${slug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (Date.now() - (parsed.timestamp ?? 0) > TRANSIENT_FLAG_TTL_MS) {
      sessionStorage.removeItem(`${OFFLINE_STORAGE_KEYS.STATUS_PREFIX}${slug}`);
      return null;
    }
    return parsed.status as TopicOfflineStatus;
  } catch {
    return null;
  }
}

function setTransientStatus(slug: string, status: TopicOfflineStatus): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(
      `${OFFLINE_STORAGE_KEYS.STATUS_PREFIX}${slug}`,
      JSON.stringify({ status, timestamp: Date.now() })
    );
  } catch {
    // ignore
  }
}

function clearTransientStatus(slug: string): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(`${OFFLINE_STORAGE_KEYS.STATUS_PREFIX}${slug}`);
  } catch {
    // ignore
  }
}

/** Broadcast an offline storage status change to all tabs/components */
export function broadcastOfflineStorageChange(slug: string, status: TopicOfflineStatus) {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent(OFFLINE_STORAGE_CHANGE_EVENT, { detail: { slug: resolveCanonicalSlug(slug), status } })
      );
    } catch {
      // safe fallback if CustomEvent is restricted
    }
  }
}

/** Check if the current browser environment supports real offline persistence capabilities */
export function isOfflineStorageSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return (
      'serviceWorker' in navigator &&
      'caches' in window &&
      'localStorage' in window
    );
  } catch {
    return false;
  }
}

/** Register the offline service worker */
export async function registerOfflineServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    return reg;
  } catch (err) {
    console.warn('Service Worker registration failed:', err);
    return null;
  }
}

/** Read the offline topics manifest */
export function readOfflineManifest(): Record<string, SavedTopicMetadata> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(OFFLINE_STORAGE_KEYS.MANIFEST);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    return parsed;
  } catch (err) {
    console.warn('Failed reading offline topics manifest:', err);
    return {};
  }
}

/** Write the offline topics manifest atomically */
function writeOfflineManifest(manifest: Record<string, SavedTopicMetadata>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(OFFLINE_STORAGE_KEYS.MANIFEST, JSON.stringify(manifest));
}

/** Read a stored offline topic payload if available */
export function getSavedTopicOfflinePayload(slugOrId: string): OfflineTopicPayload | null {
  if (typeof window === 'undefined') return null;
  const canonical = resolveCanonicalSlug(slugOrId);
  if (!canonical) return null;
  try {
    const raw = localStorage.getItem(`${OFFLINE_STORAGE_KEYS.TOPIC_PREFIX}${canonical}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Get the current offline status of a topic, validating actual payload existence */
export async function getTopicOfflineStatus(slugOrId: string): Promise<TopicOfflineStatus> {
  if (typeof window === 'undefined') return 'unsaved';
  if (!isOfflineStorageSupported()) return 'unsupported';

  const canonical = resolveCanonicalSlug(slugOrId);
  if (!canonical) return 'unsaved';

  try {
    // 1. Check transient in-progress state first
    const transient = getTransientStatus(canonical);
    if (transient === 'saving' || transient === 'updating') return transient;

    // 2. Validate manifest and actual payload existence
    const manifest = readOfflineManifest();
    if (manifest[canonical]) {
      const payload = getSavedTopicOfflinePayload(canonical);
      if (payload && payload.metadata && payload.metadata.slug === canonical) {
        return 'saved';
      }
    }
    return 'unsaved';
  } catch (err) {
    console.warn(`Error getting offline status for ${slugOrId}:`, err);
    return 'unsaved';
  }
}

/** Render SVG snapshots for all perspectives of a topic */
export async function generateDiagramSnapshots(topic: TopicItem): Promise<Record<string, string>> {
  const snapshots: Record<string, string> = {};
  if (!topic || !topic.diagramCount || topic.diagramCount < 1 || typeof window === 'undefined') {
    return snapshots;
  }
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

    for (const p of DIAGRAM_PERSPECTIVES) {
      const code = getTopicMermaidDiagram(topic, p.id);
      if (code) {
        try {
          const id = `snapshot-${topic.id}-${p.id}-${Date.now()}`;
          const res = await mermaid.render(id, code);
          snapshots[p.id] = res.svg;
        } catch (renderErr) {
          console.warn(`Snapshot render failed for perspective ${p.id}:`, renderErr);
        }
      }
    }
  } catch (err) {
    console.warn('Could not generate diagram snapshots:', err);
  }
  return snapshots;
}

/** Request Service Worker to fetch and cache the topic bundle atomically */
async function syncTopicToServiceWorkerCache(slug: string): Promise<{ success: boolean; error?: string }> {
  if (typeof window === 'undefined') return { success: false, error: 'No window' };

  // If Service Worker is active with a controller, use the message channel
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => {
        resolve({ success: false, error: 'Service worker cache request timed out' });
      }, 15000);

      channel.port1.onmessage = (event) => {
        clearTimeout(timer);
        const data = event.data;
        if (data && data.type === 'CACHE_TOPIC_UNIT_RESULT') {
          if (data.success) {
            resolve({ success: true });
          } else {
            resolve({ success: false, error: data.error || 'Failed downloading topic assets' });
          }
        }
      };

      navigator.serviceWorker.controller.postMessage(
        { type: 'CACHE_TOPIC_UNIT', slug },
        [channel.port2]
      );
    });
  }

  // If Service Worker is not active yet (e.g. before claim or during tests), use direct Cache API
  if ('caches' in window) {
    try {
      const topicsCache = await caches.open(OFFLINE_CACHE_NAMES.TOPICS);
      const topicUrl = `/learn/${slug}`;
      const res = await fetch(topicUrl, { cache: 'reload' });
      if (!res.ok) {
        return { success: false, error: `Failed to fetch topic page (${res.status})` };
      }
      await topicsCache.put(topicUrl, res);
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }

  return { success: true };
}

/** Save a topic and its assets for offline reading */
export async function saveTopicOffline(
  topic: TopicItem,
  options?: { diagramSnapshots?: Record<string, string>; isUpdate?: boolean }
): Promise<{ success: boolean; error?: string }> {
  if (typeof window === 'undefined') return { success: false, error: 'Environment is not a browser window' };
  if (!isOfflineStorageSupported()) return { success: false, error: 'المتصفح لا يوفر دعم الحفظ بدون إنترنت (PWA/Service Worker)' };

  const canonical = resolveCanonicalSlug(topic.slug);
  const transientState: TopicOfflineStatus = options?.isUpdate ? 'updating' : 'saving';
  const topicKey = `${OFFLINE_STORAGE_KEYS.TOPIC_PREFIX}${canonical}`;
  const previousPayloadRaw = localStorage.getItem(topicKey);

  try {
    // 1. Mark transient in-progress state
    setTransientStatus(canonical, transientState);
    broadcastOfflineStorageChange(canonical, transientState);

    // 2. Render and verify required diagram snapshots
    let diagramSnapshots = options?.diagramSnapshots;
    if (!diagramSnapshots && topic.diagramCount > 0) {
      diagramSnapshots = await generateDiagramSnapshots(topic);
    }
    if (topic.diagramCount > 0 && (!diagramSnapshots || Object.keys(diagramSnapshots).length === 0)) {
      throw new Error('تعذر تصيير المخططات الهندسية لحفظها. لا يمكن حفظ الموضوع بدون مخططاته.');
    }

    // 3. Download and cache the HTML page and assets via Service Worker / Cache API
    const swResult = await syncTopicToServiceWorkerCache(canonical);
    if (!swResult.success) {
      throw new Error(swResult.error || 'تعذر تنزيل ملفات الموضوع للعمل بدون إنترنت');
    }

    // 4. Construct metadata and payload
    const payloadContent = JSON.stringify({
      topic,
      diagramSnapshots,
    });
    const sizeBytes = new Blob([payloadContent]).size;

    const metadata: SavedTopicMetadata = {
      slug: canonical,
      id: topic.id,
      number: topic.number,
      title: topic.title,
      subtitle: topic.subtitle,
      summary: topic.summary,
      categoryName: topic.categoryName,
      stageTag: topic.stageTag,
      savedAt: Date.now(),
      version: '1.0.0',
      diagramCount: topic.diagramCount ?? 0,
      sizeBytes,
    };

    const payload: OfflineTopicPayload = {
      metadata,
      topic,
      diagramSnapshots, // Correctly persisted!
      savedAt: metadata.savedAt,
    };

    // 5. Atomic LocalStorage commit: write payload first, then manifest
    localStorage.setItem(topicKey, JSON.stringify(payload));
    const manifest = readOfflineManifest();
    manifest[canonical] = metadata;
    writeOfflineManifest(manifest);

    // 6. Finalize: clear transient state and broadcast success
    clearTransientStatus(canonical);
    broadcastOfflineStorageChange(canonical, 'saved');

    return { success: true };
  } catch (err: any) {
    // Rollback: if update failed, restore previous payload
    try {
      if (previousPayloadRaw) {
        localStorage.setItem(topicKey, previousPayloadRaw);
      } else {
        localStorage.removeItem(topicKey);
      }
    } catch {
      // safe fallback if storage remains constrained during rollback
    }

    clearTransientStatus(canonical);
    broadcastOfflineStorageChange(canonical, 'failed');
    console.error(`Failed saving topic offline [${canonical}]:`, err);
    return {
      success: false,
      error: err?.name === 'QuotaExceededError'
        ? 'تم تجاوز سعة التخزين المتاحة في المتصفح. يرجى حذف بعض المواضيع المحفوظة قديماً.'
        : err?.message || 'تعذر إتمام الحفظ بدون إنترنت',
    };
  }
}

/** Remove a topic from offline storage without touching learner records */
export async function removeTopicOffline(slugOrId: string): Promise<{ success: boolean }> {
  if (typeof window === 'undefined') return { success: false };
  const canonical = resolveCanonicalSlug(slugOrId);
  if (!canonical) return { success: false };

  try {
    // 1. Remove topic bundle
    const topicKey = `${OFFLINE_STORAGE_KEYS.TOPIC_PREFIX}${canonical}`;
    localStorage.removeItem(topicKey);

    // 2. Remove from manifest
    const manifest = readOfflineManifest();
    delete manifest[canonical];
    writeOfflineManifest(manifest);

    // 3. Clear transient state
    clearTransientStatus(canonical);
    broadcastOfflineStorageChange(canonical, 'unsaved');

    // 4. Notify Service Worker to purge cache entry
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        navigator.serviceWorker.controller.postMessage({
          type: 'PURGE_TOPIC_CACHE',
          slug: canonical,
        });
      } catch {
        // Non-blocking
      }
    }

    // Also purge from Cache Storage directly if accessible
    if ('caches' in window) {
      try {
        const topicsCache = await caches.open(OFFLINE_CACHE_NAMES.TOPICS);
        await topicsCache.delete(`/learn/${canonical}`);
      } catch {
        // Non-blocking
      }
    }

    return { success: true };
  } catch (err) {
    console.error(`Failed removing topic offline [${canonical}]:`, err);
    return { success: false };
  }
}

/** List all topics saved for offline reading, validating each against actual bundle availability */
export async function listSavedTopicsOffline(): Promise<SavedTopicMetadata[]> {
  if (typeof window === 'undefined') return [];
  const manifest = readOfflineManifest();
  const validList: SavedTopicMetadata[] = [];
  let manifestNeedsClean = false;

  for (const [slug, meta] of Object.entries(manifest)) {
    const payload = getSavedTopicOfflinePayload(slug);
    if (payload && payload.metadata) {
      validList.push(meta);
    } else {
      // Manifest entry exists but payload was evicted or removed
      manifestNeedsClean = true;
      delete manifest[slug];
    }
  }

  if (manifestNeedsClean) {
    writeOfflineManifest(manifest);
  }

  return validList.sort((a, b) => b.savedAt - a.savedAt);
}

/** Clear all offline saved topics without touching learner bookmarks, history, or checklists */
export async function clearAllOfflineSavedTopics(): Promise<{ success: boolean; clearedCount: number }> {
  if (typeof window === 'undefined') return { success: false, clearedCount: 0 };
  try {
    const manifest = readOfflineManifest();
    const slugs = Object.keys(manifest);

    for (const slug of slugs) {
      localStorage.removeItem(`${OFFLINE_STORAGE_KEYS.TOPIC_PREFIX}${slug}`);
      clearTransientStatus(slug);
    }

    localStorage.removeItem(OFFLINE_STORAGE_KEYS.MANIFEST);

    for (const slug of slugs) {
      broadcastOfflineStorageChange(slug, 'unsaved');
    }

    // Inform SW to purge topic caches
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        navigator.serviceWorker.controller.postMessage({ type: 'PURGE_ALL_TOPICS' });
      } catch {
        // Non-blocking
      }
    }

    if ('caches' in window) {
      try {
        await caches.delete(OFFLINE_CACHE_NAMES.TOPICS);
      } catch {
        // Non-blocking
      }
    }

    return { success: true, clearedCount: slugs.length };
  } catch (err) {
    console.error('Failed clearing offline topics:', err);
    return { success: false, clearedCount: 0 };
  }
}
