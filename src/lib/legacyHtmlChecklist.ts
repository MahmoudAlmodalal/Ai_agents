import { applicationChecklistItemKey, type ChecklistStorageStatus } from './applicationChecklist';

const STABLE_KEY_PREFIX = 'application-html-checklist-v1:';

// Frozen labels verified against scripts/topics/topic03.ts in the original
// numeric-save implementation. An index alone never establishes a match.
const TOPIC_03_BASELINE = [
  'وضوح المخرج لكل قرار: يوجد مسار واضح ومعنون بالكامل لكل خيار نعم/لا في جميع المعينات.',
  'معالجة مسارات الرفض والفشل: يشرح المخطط بدقة ما يحدث للمستخدم وللمخزون عند رفض الطلب أو انتهاء المهلة.',
  'صلاحيات التنفيذ: كل خطوة مسندة لدور محدد يمتلك الصلاحية الهندسية لتنفيذها وفق وثيقة PRD.',
  'عدم اختراع قرارات غير محسومة: أي شرط غير موثق في PRD وُضع كسؤال مفتوح ولم يُرسم من الخيال.',
];

export function legacyHtmlChecklistIdentity(topic: { id: string; slug: string }, label: string) {
  const normalized = applicationChecklistItemKey(label);
  const index = topic.id === 'topic-03' && topic.slug === 'requirements-prd'
    ? TOPIC_03_BASELINE.indexOf(normalized) : -1;
  return {
    key: `${STABLE_KEY_PREFIX}${JSON.stringify([topic.slug, normalized])}`,
    legacyKey: index >= 0 ? `checklist_topic-03_${index}` : undefined,
    topicSlug: topic.slug,
    item: normalized,
  };
}

type Identity = ReturnType<typeof legacyHtmlChecklistIdentity>;
type Snapshot = { checked: boolean; storageStatus: ChecklistStorageStatus; sessionOnly: boolean };

export interface LegacyHtmlChecklistRecordSnapshot {
  key: string;
  topicSlug: string;
  item: string;
  checked: boolean;
  storageStatus: ChecklistStorageStatus;
  sessionOnly: boolean;
}

export function createLegacyHtmlChecklistStore(getStorage: () => Pick<Storage, 'getItem' | 'setItem'>) {
  const entries = new Map<string, { identity: Identity; snapshot: Snapshot; pending: boolean | null; hasStoredValue: boolean; listeners: Set<() => void> }>();

  function getEntry(identity: Identity) {
    let entry = entries.get(identity.key);
    if (!entry) {
      entry = { identity, snapshot: { checked: false, storageStatus: 'loading', sessionOnly: false }, pending: null, hasStoredValue: false, listeners: new Set() };
      entries.set(identity.key, entry);
    }
    return entry;
  }

  function publish(entry: ReturnType<typeof getEntry>, checked: boolean, storageStatus: ChecklistStorageStatus) {
    const sessionOnly = entry.pending !== null;
    if (entry.snapshot.checked === checked && entry.snapshot.storageStatus === storageStatus && entry.snapshot.sessionOnly === sessionOnly) return;
    entry.snapshot = { checked, storageStatus, sessionOnly };
    entry.listeners.forEach((listener) => listener());
  }

  function refresh() {
    for (const entry of entries.values()) {
      let storage: Pick<Storage, 'getItem' | 'setItem'>;
      let raw: string | null;
      try {
        storage = getStorage();
        raw = storage.getItem(entry.identity.key);
        if (raw === null && entry.identity.legacyKey) raw = storage.getItem(entry.identity.legacyKey);
      } catch {
        publish(entry, entry.snapshot.checked, 'read-error');
        continue;
      }
      if (raw !== null && raw !== 'true' && raw !== 'false') {
        publish(entry, entry.snapshot.checked, 'invalid');
        continue;
      }
      entry.hasStoredValue = raw !== null;
      if (entry.pending !== null) {
        const pending = entry.pending;
        try {
          storage.setItem(entry.identity.key, String(pending));
        } catch {
          publish(entry, pending, 'write-error');
          continue;
        }
        raw = String(pending);
        entry.pending = null;
        entry.hasStoredValue = true;
      }
      publish(entry, raw === 'true', 'available');
    }
  }

  return {
    getSnapshot(identity: Identity) { return getEntry(identity).snapshot; },
    subscribe(identity: Identity, listener: () => void) {
      const entry = getEntry(identity);
      entry.listeners.add(listener);
      refresh();
      return () => { entry.listeners.delete(listener); };
    },
    toggle(identity: Identity, checked: boolean) {
      const entry = getEntry(identity);
      entry.pending = checked;
      publish(entry, checked, entry.snapshot.storageStatus);
      refresh();
    },
    listSnapshots(): LegacyHtmlChecklistRecordSnapshot[] {
      refresh();
      return [...entries.values()]
        .filter((entry) => entry.hasStoredValue || entry.pending !== null)
        .map(({ identity, snapshot }) => ({
          key: identity.key,
          topicSlug: identity.topicSlug,
          item: identity.item,
          checked: snapshot.checked,
          storageStatus: snapshot.storageStatus,
          sessionOnly: snapshot.sessionOnly,
        }));
    },
    refresh,
  };
}

const store = createLegacyHtmlChecklistStore(() => window.localStorage);

/** Includes checked or unchecked HTML choices still pending after a blocked write. */
export const listLegacyHtmlChecklistSnapshots = store.listSnapshots;

/** Retain authored HTML interactions in both readers, independently of React's checklist. */
export function attachLegacyHtmlChecklist(container: HTMLElement, topic: { id: string; slug: string }) {
  const cleanups: (() => void)[] = [];
  const cards = [...container.querySelectorAll<HTMLElement>('.checklist-card')];
  if (!cards.some((card) => card.querySelector('.checklist-item input[type="checkbox"]'))) return () => {};
  for (const card of cards) {
    const checkboxes = [...card.querySelectorAll<HTMLInputElement>('.checklist-item input[type="checkbox"]')];
    if (!checkboxes.length) continue;
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.className = 'text-xs leading-6 text-amber-700 dark:text-amber-300';
    card.append(status);
    const identities = new Map<HTMLInputElement, Identity>();
    const render = () => {
      let unavailable = false;
      for (const [checkbox, identity] of identities) {
        const snapshot = store.getSnapshot(identity);
        checkbox.checked = snapshot.checked;
        unavailable ||= snapshot.storageStatus !== 'loading' && snapshot.storageStatus !== 'available';
      }
      const counter = card.querySelector('.checklist-counter');
      if (counter) counter.textContent = `${checkboxes.filter((checkbox) => checkbox.checked).length} / ${checkboxes.length} محدد ذاتيًا`;
      status.textContent = unavailable
        ? 'تعذر حفظ هذه القائمة أو قراءة بياناتها. اختياراتك الحالية متاحة خلال هذه الجلسة؛ قد تفقدها عند إعادة تحميل الصفحة.'
        : '';
    };
    for (const checkbox of checkboxes) {
      const label = checkbox.labels?.[0]?.textContent ?? checkbox.closest('.checklist-item')?.textContent;
      if (!label?.trim()) continue;
      const identity = legacyHtmlChecklistIdentity(topic, label);
      identities.set(checkbox, identity);
      // The exported HTML references an unavailable global updateChecklist().
      // The shared listener below now owns its counter and persistence behavior.
      checkbox.removeAttribute('onchange');
      const onChange = () => store.toggle(identity, checkbox.checked);
      checkbox.addEventListener('change', onChange);
      const unsubscribe = store.subscribe(identity, render);
      cleanups.push(() => { checkbox.removeEventListener('change', onChange); unsubscribe(); });
    }
    render();
    cleanups.push(() => status.remove());
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key.startsWith(STABLE_KEY_PREFIX) || event.key.startsWith('checklist_')) store.refresh();
  };
  const onVisible = () => { if (document.visibilityState === 'visible') store.refresh(); };
  window.addEventListener('storage', onStorage);
  window.addEventListener('focus', store.refresh);
  document.addEventListener('visibilitychange', onVisible);
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('focus', store.refresh);
    document.removeEventListener('visibilitychange', onVisible);
  };
}
