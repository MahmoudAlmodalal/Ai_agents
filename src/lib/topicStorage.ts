import { resolveCanonicalSlug, getTopicBySlug } from './topicRegistry';

export const BOOKMARKS_KEY = 'engineering_guide_bookmarks';
export const RECENTLY_VIEWED_KEY = 'engineering_guide_recently_viewed';

export type TopicStorageStatus = 'loading' | 'available' | 'read-error' | 'write-error' | 'invalid';

export interface StorageResult {
  list: string[];
  status: TopicStorageStatus;
}

export type StorageAdapter = Pick<Storage, 'getItem' | 'setItem'>;

function parseStoredList(raw: string | null): { list: string[] } | { error: 'invalid' } {
  if (raw === null) return { list: [] };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === 'string')) {
      return { error: 'invalid' };
    }
    const list = Array.from(new Set(parsed.map((id) => resolveCanonicalSlug(id)).filter(Boolean)));
    return { list };
  } catch {
    return { error: 'invalid' };
  }
}

export function createTopicStorage(getStorage: () => StorageAdapter) {
  let bookmarksSnapshot: string[] = [];
  let bookmarksStatus: TopicStorageStatus = 'loading';
  let bookmarksInitialRead = false;
  let bookmarksBaseline: Set<string> | null = null;
  const addedBookmarks = new Set<string>();
  const removedBookmarks = new Set<string>();
  let hasPendingBookmarks = false;

  let recentlyViewedSnapshot: string[] = [];
  let recentlyViewedStatus: TopicStorageStatus = 'loading';
  let recentlyViewedInitialRead = false;
  let sessionViewedOrder: string[] = [];
  let historyCleared = false;
  let hasPendingRecentlyViewed = false;

  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function readRaw(key: string): { storage: StorageAdapter; raw: string | null } | { error: 'read-error' } {
    try {
      const storage = getStorage();
      const raw = storage.getItem(key);
      return { storage, raw };
    } catch {
      return { error: 'read-error' };
    }
  }

  function ensureBookmarksRead() {
    if (bookmarksInitialRead) return;
    bookmarksInitialRead = true;
    const result = readRaw(BOOKMARKS_KEY);
    if ('error' in result) {
      bookmarksStatus = result.error;
      return;
    }
    const parsed = parseStoredList(result.raw);
    if ('error' in parsed) {
      bookmarksStatus = parsed.error;
      return;
    }
    bookmarksSnapshot = parsed.list;
    bookmarksBaseline = new Set(parsed.list);
    bookmarksStatus = 'available';
  }

  function ensureRecentlyViewedRead() {
    if (recentlyViewedInitialRead) return;
    recentlyViewedInitialRead = true;
    const result = readRaw(RECENTLY_VIEWED_KEY);
    if ('error' in result) {
      recentlyViewedStatus = result.error;
      return;
    }
    const parsed = parseStoredList(result.raw);
    if ('error' in parsed) {
      recentlyViewedStatus = parsed.error;
      return;
    }
    recentlyViewedSnapshot = parsed.list;
    recentlyViewedStatus = 'available';
  }

  function recordBookmarkIntent(canonicalSlugs: string[]) {
    bookmarksSnapshot = canonicalSlugs;
    hasPendingBookmarks = true;

    if (bookmarksBaseline !== null) {
      // Recompute added and removed relative to the last known baseline
      addedBookmarks.clear();
      removedBookmarks.clear();
      for (const id of canonicalSlugs) {
        if (!bookmarksBaseline.has(id)) addedBookmarks.add(id);
      }
      for (const id of bookmarksBaseline) {
        if (!canonicalSlugs.includes(id)) removedBookmarks.add(id);
      }
    } else {
      // No baseline yet (e.g. read error)
      for (const id of canonicalSlugs) {
        addedBookmarks.add(id);
        removedBookmarks.delete(id);
      }
    }
  }

  function recordRecentlyViewedIntent(canonicalSlugs: string[]) {
    recentlyViewedSnapshot = canonicalSlugs;
    hasPendingRecentlyViewed = true;

    if (canonicalSlugs.length === 0) {
      historyCleared = true;
      sessionViewedOrder = [];
    } else {
      historyCleared = false;
      // Prepend newest items
      const newItems = canonicalSlugs.filter((id) => !sessionViewedOrder.includes(id));
      sessionViewedOrder = [...newItems, ...sessionViewedOrder];
    }
  }

  function attemptBookmarksPersist(storage: StorageAdapter, currentPersistedList: string[]): boolean {
    let toPersist: string[];
    if (hasPendingBookmarks) {
      const set = new Set(currentPersistedList);
      removedBookmarks.forEach((id) => set.delete(id));
      addedBookmarks.forEach((id) => set.add(id));
      toPersist = Array.from(set);
    } else {
      toPersist = currentPersistedList;
    }

    try {
      storage.setItem(BOOKMARKS_KEY, JSON.stringify(toPersist));
      bookmarksSnapshot = toPersist;
      bookmarksBaseline = new Set(toPersist);
      bookmarksStatus = 'available';
      addedBookmarks.clear();
      removedBookmarks.clear();
      hasPendingBookmarks = false;
      return true;
    } catch {
      bookmarksStatus = 'write-error';
      return false;
    }
  }

  function attemptRecentlyViewedPersist(storage: StorageAdapter, currentPersistedList: string[]): boolean {
    let toPersist: string[];
    if (hasPendingRecentlyViewed) {
      if (historyCleared) {
        toPersist = [];
      } else {
        // Session viewed items have top recency, followed by other items
        const combined = Array.from(new Set([...sessionViewedOrder, ...recentlyViewedSnapshot, ...currentPersistedList]));
        toPersist = [
          ...combined.filter((slug) => getTopicBySlug(slug)).slice(0, 5),
          ...combined.filter((slug) => !getTopicBySlug(slug)),
        ];
      }
    } else {
      toPersist = currentPersistedList;
    }

    try {
      storage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(toPersist));
      recentlyViewedSnapshot = toPersist;
      recentlyViewedStatus = 'available';
      sessionViewedOrder = [];
      historyCleared = false;
      hasPendingRecentlyViewed = false;
      return true;
    } catch {
      recentlyViewedStatus = 'write-error';
      return false;
    }
  }

  function writeBookmarksInternal(canonicalSlugs: string[]) {
    recordBookmarkIntent(canonicalSlugs);

    const rawResult = readRaw(BOOKMARKS_KEY);
    if ('error' in rawResult) {
      bookmarksStatus = rawResult.error;
      notify();
      return canonicalSlugs;
    }

    const parsed = parseStoredList(rawResult.raw);
    if ('error' in parsed) {
      bookmarksStatus = parsed.error;
      notify();
      return canonicalSlugs;
    }

    attemptBookmarksPersist(rawResult.storage, parsed.list);
    notify();
    return bookmarksSnapshot;
  }

  function writeRecentlyViewedInternal(canonicalSlugs: string[]) {
    recordRecentlyViewedIntent(canonicalSlugs);

    const rawResult = readRaw(RECENTLY_VIEWED_KEY);
    if ('error' in rawResult) {
      recentlyViewedStatus = rawResult.error;
      notify();
      return canonicalSlugs;
    }

    const parsed = parseStoredList(rawResult.raw);
    if ('error' in parsed) {
      recentlyViewedStatus = parsed.error;
      notify();
      return canonicalSlugs;
    }

    attemptRecentlyViewedPersist(rawResult.storage, parsed.list);
    notify();
    return recentlyViewedSnapshot;
  }

  function refreshBookmarks() {
    const rawResult = readRaw(BOOKMARKS_KEY);
    if ('error' in rawResult) {
      bookmarksStatus = rawResult.error;
      return;
    }
    const parsed = parseStoredList(rawResult.raw);
    if ('error' in parsed) {
      bookmarksStatus = parsed.error;
      return;
    }

    attemptBookmarksPersist(rawResult.storage, parsed.list);
  }

  function refreshRecentlyViewed() {
    const rawResult = readRaw(RECENTLY_VIEWED_KEY);
    if ('error' in rawResult) {
      recentlyViewedStatus = rawResult.error;
      return;
    }
    const parsed = parseStoredList(rawResult.raw);
    if ('error' in parsed) {
      recentlyViewedStatus = parsed.error;
      return;
    }

    attemptRecentlyViewedPersist(rawResult.storage, parsed.list);
  }

  return {
    getBookmarksStatus(): TopicStorageStatus {
      ensureBookmarksRead();
      return bookmarksStatus;
    },
    getRecentlyViewedStatus(): TopicStorageStatus {
      ensureRecentlyViewedRead();
      return recentlyViewedStatus;
    },
    readBookmarks(): string[] {
      ensureBookmarksRead();
      return bookmarksSnapshot;
    },
    readRecentlyViewed(): string[] {
      ensureRecentlyViewedRead();
      return recentlyViewedSnapshot;
    },
    writeBookmarks(slugs: string[]): string[] {
      ensureBookmarksRead();
      const canonicalSlugs = Array.from(new Set(slugs.map((s) => resolveCanonicalSlug(s)).filter(Boolean)));
      return writeBookmarksInternal(canonicalSlugs);
    },
    writeRecentlyViewed(slugs: string[]): string[] {
      ensureRecentlyViewedRead();
      const saved = Array.from(new Set(slugs.map(resolveCanonicalSlug).filter(Boolean)));
      const canonicalSlugs = [
        ...saved.filter((slug) => getTopicBySlug(slug)).slice(0, 5),
        ...saved.filter((slug) => !getTopicBySlug(slug)),
      ];
      return writeRecentlyViewedInternal(canonicalSlugs);
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    refresh() {
      refreshBookmarks();
      refreshRecentlyViewed();
      notify();
    },
  };
}

let browserTopicStorage: ReturnType<typeof createTopicStorage> | null = null;

export function getBrowserTopicStorage() {
  if (!browserTopicStorage) {
    browserTopicStorage = createTopicStorage(() => window.localStorage);
    if (typeof window !== 'undefined') {
      const onStorage = (e: StorageEvent) => {
        if (e.key === null || e.key === BOOKMARKS_KEY || e.key === RECENTLY_VIEWED_KEY) {
          browserTopicStorage?.refresh();
        }
      };
      window.addEventListener('storage', onStorage);
      window.addEventListener('focus', () => browserTopicStorage?.refresh());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') browserTopicStorage?.refresh();
      });
    }
  }
  return browserTopicStorage;
}
