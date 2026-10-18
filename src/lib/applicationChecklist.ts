export const APPLICATION_CHECKLIST_STORAGE_KEY = 'application-checklists-v1';

type SavedState = Record<string, string[]>;
type ChecklistStorage = Pick<Storage, 'getItem' | 'setItem'>;
export type ChecklistStorageStatus = 'loading' | 'available' | 'read-error' | 'write-error' | 'invalid';

export interface ApplicationChecklistSnapshot {
  readonly selected: ReadonlySet<string>;
  readonly storageStatus: ChecklistStorageStatus;
}

export const EMPTY_APPLICATION_CHECKLIST: ApplicationChecklistSnapshot = {
  selected: new Set<string>(),
  storageStatus: 'loading',
};

// Full normalized text is the semantic identity. Reordering never transfers a check
// to another item; edited text requires a fresh assessment. Do not infer identities
// from array positions or the old HTML checklist's numeric indices.
export function applicationChecklistItemKey(item: string) {
  return item.trim().replace(/\s+/gu, ' ').normalize('NFC');
}

function parseSavedState(raw: string | null): SavedState {
  if (raw === null) return Object.create(null);
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid checklist data');

  const saved: SavedState = Object.create(null);
  for (const [slug, items] of Object.entries(parsed)) {
    if (!Array.isArray(items) || !items.every((item) => typeof item === 'string' && item.trim().length > 0)) {
      throw new Error('Invalid checklist items');
    }
    saved[slug] = [...new Set(items.map(applicationChecklistItemKey))];
  }
  return saved;
}

interface Entry {
  snapshot: ApplicationChecklistSnapshot;
  pending: Map<string, boolean>;
  listeners: Set<() => void>;
}

/** Shared memory retains every local choice when persistence is unavailable. */
export function createApplicationChecklistStore(getStorage: () => ChecklistStorage) {
  const entries = new Map<string, Entry>();

  function getEntry(slug: string) {
    let entry = entries.get(slug);
    if (!entry) {
      entry = { snapshot: EMPTY_APPLICATION_CHECKLIST, pending: new Map(), listeners: new Set() };
      entries.set(slug, entry);
    }
    return entry;
  }

  function publish(entry: Entry, selected: ReadonlySet<string>, storageStatus: ChecklistStorageStatus) {
    const previous = entry.snapshot;
    if (previous.storageStatus === storageStatus && previous.selected.size === selected.size
      && [...selected].every((key) => previous.selected.has(key))) return;
    entry.snapshot = { selected, storageStatus };
    entry.listeners.forEach((listener) => listener());
  }

  function read(): { storage: ChecklistStorage; saved: SavedState } | { error: 'read-error' | 'invalid' } {
    let storage: ChecklistStorage;
    let raw: string | null;
    try {
      storage = getStorage();
      raw = storage.getItem(APPLICATION_CHECKLIST_STORAGE_KEY);
    } catch {
      return { error: 'read-error' };
    }
    try {
      return { storage, saved: parseSavedState(raw) };
    } catch {
      return { error: 'invalid' };
    }
  }

  function reconcile(saved: SavedState) {
    for (const [slug, entry] of entries) {
      const selected = new Set(saved[slug] ?? []);
      entry.pending.forEach((checked, key) => checked ? selected.add(key) : selected.delete(key));
      publish(entry, selected, entry.pending.size ? entry.snapshot.storageStatus : 'available');
    }
  }

  function refresh() {
    const result = read();
    if ('error' in result) {
      entries.forEach((entry) => publish(entry, entry.snapshot.selected, result.error));
      return;
    }

    const pendingEntries = [...entries].filter(([, entry]) => entry.pending.size > 0);
    if (pendingEntries.length === 0) {
      reconcile(result.saved);
      return;
    }

    // Merge with the latest stored document, retaining other topics and retired
    // item text. Nothing is overwritten if reading or schema validation fails.
    for (const [slug, entry] of pendingEntries) {
      const selected = new Set(result.saved[slug] ?? []);
      entry.pending.forEach((checked, key) => checked ? selected.add(key) : selected.delete(key));
      result.saved[slug] = [...selected];
    }
    try {
      result.storage.setItem(APPLICATION_CHECKLIST_STORAGE_KEY, JSON.stringify(result.saved));
    } catch {
      for (const [, entry] of pendingEntries) publish(entry, entry.snapshot.selected, 'write-error');
      // Topics with no local changes can still receive external updates.
      reconcile(result.saved);
      return;
    }
    pendingEntries.forEach(([, entry]) => entry.pending.clear());
    reconcile(result.saved);
  }

  return {
    getSnapshot(slug: string) { return getEntry(slug).snapshot; },
    subscribe(slug: string, listener: () => void) {
      const entry = getEntry(slug);
      entry.listeners.add(listener);
      refresh();
      return () => { entry.listeners.delete(listener); };
    },
    toggle(slug: string, item: string, checked: boolean) {
      const entry = getEntry(slug);
      const key = applicationChecklistItemKey(item);
      if (!key) return;
      const selected = new Set(entry.snapshot.selected);
      if (checked) selected.add(key);
      else selected.delete(key);
      entry.pending.set(key, checked);
      publish(entry, selected, entry.snapshot.storageStatus);
      refresh();
    },
    refresh,
  };
}

const store = createApplicationChecklistStore(() => window.localStorage);
let subscriptions = 0;

function onStorage(event: StorageEvent) {
  if (event.key === null || event.key === APPLICATION_CHECKLIST_STORAGE_KEY) store.refresh();
}

function onVisible() {
  if (document.visibilityState === 'visible') store.refresh();
}

export function subscribeApplicationChecklist(slug: string, listener: () => void) {
  const unsubscribe = store.subscribe(slug, listener);
  if (subscriptions++ === 0) {
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', store.refresh);
    document.addEventListener('visibilitychange', onVisible);
  }
  return () => {
    unsubscribe();
    if (--subscriptions === 0) {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', store.refresh);
      document.removeEventListener('visibilitychange', onVisible);
    }
  };
}

export const getApplicationChecklistSnapshot = store.getSnapshot;
export const toggleApplicationChecklistItem = store.toggle;
