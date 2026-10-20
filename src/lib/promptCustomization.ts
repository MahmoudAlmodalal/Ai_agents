export const PROMPT_CUSTOMIZATIONS_STORAGE_KEY = 'ai-agents-prompt-customizations-v1';
export const PROMPT_CUSTOMIZATIONS_CHANGE_EVENT = 'ai-agents-prompt-customizations-change';

export type PromptCustomizationStorageStatus = 'loading' | 'available' | 'invalid' | 'read-error' | 'write-error';

export interface PromptCustomizationRecord {
  promptSlug: string;
  text: string;
  sourceRevision: string;
  updatedAt: string;
}

export interface PromptCustomizationSnapshot {
  records: Record<string, PromptCustomizationRecord>;
  status: PromptCustomizationStorageStatus;
}

type CustomizationStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
type SavedDocument = { schemaVersion: 1; records: Record<string, PromptCustomizationRecord> };

export function promptSourceRevision(text: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function parseDocument(raw: string | null): SavedDocument {
  if (raw === null) return { schemaVersion: 1, records: Object.create(null) };
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid customization document');
  const document = parsed as Partial<SavedDocument>;
  if (document.schemaVersion !== 1 || !document.records || typeof document.records !== 'object' || Array.isArray(document.records)) {
    throw new Error('Unsupported customization document');
  }
  const records: Record<string, PromptCustomizationRecord> = Object.create(null);
  for (const [slug, value] of Object.entries(document.records)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid customization record');
    const record = value as Partial<PromptCustomizationRecord>;
    if (record.promptSlug !== slug || typeof record.text !== 'string' || typeof record.sourceRevision !== 'string'
      || typeof record.updatedAt !== 'string' || !Number.isFinite(Date.parse(record.updatedAt))) {
      throw new Error('Invalid customization record');
    }
    records[slug] = {
      promptSlug: slug,
      text: record.text,
      sourceRevision: record.sourceRevision,
      updatedAt: record.updatedAt,
    };
  }
  return { schemaVersion: 1, records };
}

export function createPromptCustomizationStore(getStorage: () => CustomizationStorage, now: () => Date = () => new Date()) {
  let snapshot: PromptCustomizationSnapshot = { records: Object.create(null), status: 'loading' };
  const pending = new Map<string, PromptCustomizationRecord | null>();
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function refresh() {
    let storage: CustomizationStorage;
    let raw: string | null;
    try {
      storage = getStorage();
      raw = storage.getItem(PROMPT_CUSTOMIZATIONS_STORAGE_KEY);
    } catch {
      snapshot = { ...snapshot, status: 'read-error' };
      notify();
      return snapshot;
    }
    let document: SavedDocument;
    try {
      document = parseDocument(raw);
    } catch {
      snapshot = { ...snapshot, status: 'invalid' };
      notify();
      return snapshot;
    }

    const records = { ...document.records };
    pending.forEach((record, slug) => {
      if (record) records[slug] = record;
      else delete records[slug];
    });
    if (!pending.size) {
      snapshot = { records, status: 'available' };
      notify();
      return snapshot;
    }
    try {
      storage.setItem(PROMPT_CUSTOMIZATIONS_STORAGE_KEY, JSON.stringify({ schemaVersion: 1, records }));
      pending.clear();
      snapshot = { records, status: 'available' };
    } catch {
      snapshot = { records, status: 'write-error' };
    }
    notify();
    return snapshot;
  }

  function setPending(promptSlug: string, record: PromptCustomizationRecord | null) {
    pending.set(promptSlug, record);
    const records = { ...snapshot.records };
    if (record) records[promptSlug] = record;
    else delete records[promptSlug];
    snapshot = { records, status: snapshot.status };
    return refresh();
  }

  return {
    getSnapshot() { return snapshot; },
    refresh,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    save(promptSlug: string, text: string, sourceRevision: string) {
      if (!promptSlug.trim() || !sourceRevision || !text.trim()) return { ...snapshot, status: 'invalid' as const };
      const record: PromptCustomizationRecord = {
        promptSlug,
        text,
        sourceRevision,
        updatedAt: now().toISOString(),
      };
      return setPending(promptSlug, record);
    },
    remove(promptSlug: string) {
      return setPending(promptSlug, null);
    },
  };
}

let browserStore: ReturnType<typeof createPromptCustomizationStore> | null = null;

export function getBrowserPromptCustomizationStore() {
  if (!browserStore) {
    browserStore = createPromptCustomizationStore(() => window.localStorage);
    const refresh = () => browserStore?.refresh();
    window.addEventListener('storage', (event) => {
      if (event.key === null || event.key === PROMPT_CUSTOMIZATIONS_STORAGE_KEY) refresh();
    });
    window.addEventListener(PROMPT_CUSTOMIZATIONS_CHANGE_EVENT, refresh);
    window.addEventListener('focus', refresh);
  }
  return browserStore;
}

export function announcePromptCustomizationChange() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(PROMPT_CUSTOMIZATIONS_CHANGE_EVENT));
}
