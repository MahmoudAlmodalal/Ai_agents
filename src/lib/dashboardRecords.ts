import {
  APPLICATION_CHECKLIST_STORAGE_KEY,
  applicationChecklistItemKey,
  listApplicationChecklistSnapshots,
  type ChecklistStorageStatus,
} from '@/src/lib/applicationChecklist';
import { listLegacyHtmlChecklistSnapshots } from '@/src/lib/legacyHtmlChecklist';
import type { TopicItem } from '@/src/types/topic';

export type DashboardChecklistEntry = {
  topicSlug: string;
  topicTitle: string;
  kind: 'application-checklist' | 'saved-html-checklist';
  selectedItems: string[];
  historicalStates?: Array<{ item: string; selected: boolean }>;
  sessionOnly: boolean;
  sessionOnlyChanges?: Array<{ item: string; checked: boolean }>;
  storageStatus: ChecklistStorageStatus;
};

export interface DashboardChecklistSnapshot {
  entries: DashboardChecklistEntry[];
  storageStatus: ChecklistStorageStatus;
  unresolvedHistoricalKeys: string[];
}

const HTML_CHECKLIST_PREFIX = 'application-html-checklist-v1:';

function combinedStatus(statuses: ChecklistStorageStatus[]): ChecklistStorageStatus {
  return statuses.find((status) => status !== 'available') ?? 'available';
}

/** Reads the existing application checklist adapter, including its session-only snapshots. */
export function readDashboardChecklistSnapshot(topics: TopicItem[]): DashboardChecklistSnapshot {
  const snapshots = listApplicationChecklistSnapshots(topics.map((topic) => topic.slug));
  const entries: DashboardChecklistEntry[] = [];
  const statuses = Object.values(snapshots).map((snapshot) => snapshot.storageStatus);

  for (const topic of topics) {
    const snapshot = snapshots[topic.slug];
    const selectedItems = topic.checklist.filter((item) => snapshot.selected.has(applicationChecklistItemKey(item)));
    const itemByKey = new Map(topic.checklist.map((item) => [applicationChecklistItemKey(item), item]));
    const sessionOnlyChanges = snapshot.sessionOnlyChanges.map((change) => ({
      item: itemByKey.get(change.itemKey) ?? change.itemKey,
      checked: change.checked,
    }));
    if (selectedItems.length || sessionOnlyChanges.length) {
      entries.push({
        topicSlug: topic.slug,
        topicTitle: topic.title,
        kind: 'application-checklist',
        selectedItems,
        sessionOnly: sessionOnlyChanges.length > 0,
        sessionOnlyChanges,
        storageStatus: snapshot.storageStatus,
      });
    }
  }

  const topicsBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const historicalByTopic = new Map<string, Array<{ item: string; selected: boolean }>>();
  const unresolvedHistoricalKeys: string[] = [];
  let historicalStatus: ChecklistStorageStatus = 'available';
  try {
    const storage = window.localStorage;
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (!key) continue;
      if (key.startsWith(HTML_CHECKLIST_PREFIX)) {
        let identity: unknown;
        try { identity = JSON.parse(key.slice(HTML_CHECKLIST_PREFIX.length)); } catch { identity = null; }
        const [topicSlug, item] = Array.isArray(identity) ? identity : [];
        const topic = typeof topicSlug === 'string' ? topicsBySlug.get(topicSlug) : undefined;
        const value = storage.getItem(key);
        if (topic && typeof item === 'string' && (value === 'true' || value === 'false')) {
          const saved = historicalByTopic.get(topic.slug) ?? [];
          saved.push({ item, selected: value === 'true' });
          historicalByTopic.set(topic.slug, saved);
        } else if (key.startsWith(HTML_CHECKLIST_PREFIX)) {
          unresolvedHistoricalKeys.push(key);
          if (value !== 'true' && value !== 'false') historicalStatus = 'invalid';
        }
      } else if (key.startsWith('checklist_')) {
        // Old numeric keys do not identify a stable Topic and item; leave them unmapped.
        unresolvedHistoricalKeys.push(key);
      }
    }
  } catch {
    historicalStatus = 'read-error';
  }

  for (const [topicSlug, historicalStates] of historicalByTopic) {
    const topic = topicsBySlug.get(topicSlug);
    if (!topic) continue;
    entries.push({
      topicSlug,
      topicTitle: topic.title,
      kind: 'saved-html-checklist',
      selectedItems: historicalStates.filter((entry) => entry.selected).map((entry) => entry.item),
      historicalStates,
      sessionOnly: false,
      storageStatus: historicalStatus,
    });
  }

  // The mounted reader's store knows about current-session checkbox changes even
  // when localStorage.setItem failed, which a key scan alone cannot observe.
  const sessionEntriesByTopic = new Map<string, Array<{ item: string; checked: boolean }>>();
  const htmlSnapshots = listLegacyHtmlChecklistSnapshots();
  for (const record of htmlSnapshots) {
    if (record.storageStatus !== 'available') historicalStatus = record.storageStatus;
    const topic = topicsBySlug.get(record.topicSlug);
    if (!topic) continue;
    const states = historicalByTopic.get(record.topicSlug) ?? [];
    const existing = states.find((state) => state.item === record.item);
    if (existing) existing.selected = record.checked;
    else states.push({ item: record.item, selected: record.checked });
    historicalByTopic.set(record.topicSlug, states);
    if (record.sessionOnly) {
      const changes = sessionEntriesByTopic.get(record.topicSlug) ?? [];
      changes.push({ item: record.item, checked: record.checked });
      sessionEntriesByTopic.set(record.topicSlug, changes);
    }
  }

  for (const [topicSlug, historicalStates] of historicalByTopic) {
    const topic = topicsBySlug.get(topicSlug);
    if (!topic) continue;
    const sessionOnlyChanges = sessionEntriesByTopic.get(topicSlug) ?? [];
    const existingEntry = entries.find((entry) => entry.kind === 'saved-html-checklist' && entry.topicSlug === topicSlug);
    if (existingEntry) {
      existingEntry.selectedItems = historicalStates.filter((entry) => entry.selected).map((entry) => entry.item);
      existingEntry.historicalStates = historicalStates;
      existingEntry.sessionOnly = sessionOnlyChanges.length > 0;
      existingEntry.sessionOnlyChanges = sessionOnlyChanges;
      existingEntry.storageStatus = historicalStatus;
    } else {
      entries.push({
        topicSlug,
        topicTitle: topic.title,
        kind: 'saved-html-checklist',
        selectedItems: historicalStates.filter((entry) => entry.selected).map((entry) => entry.item),
        historicalStates,
        sessionOnly: sessionOnlyChanges.length > 0,
        sessionOnlyChanges,
        storageStatus: historicalStatus,
      });
    }
  }

  return {
    entries,
    storageStatus: combinedStatus([...statuses, historicalStatus]),
    unresolvedHistoricalKeys,
  };
}

export function readChecklistStorageStatus(storage: Pick<Storage, 'getItem'>): ChecklistStorageStatus {
  let raw: string | null;
  try { raw = storage.getItem(APPLICATION_CHECKLIST_STORAGE_KEY); }
  catch { return 'read-error'; }
  if (raw === null) return 'available';
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return 'invalid';
    for (const value of Object.values(parsed)) {
      if (!Array.isArray(value) || !value.every((item) => typeof item === 'string' && item.trim())) return 'invalid';
    }
    return 'available';
  } catch {
    return 'invalid';
  }
}
