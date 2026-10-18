import assert from 'node:assert/strict';
import test from 'node:test';
import { createLegacyHtmlChecklistStore, legacyHtmlChecklistIdentity } from './legacyHtmlChecklist';

const originalLabel = 'وضوح المخرج لكل قرار: يوجد مسار واضح ومعنون بالكامل لكل خيار نعم/لا في جميع المعينات.';

test('only frozen topic and exact label recover positional saves, including after reorder', () => {
  const original = legacyHtmlChecklistIdentity({ id: 'topic-03', slug: 'requirements-prd' }, originalLabel);
  const changed = legacyHtmlChecklistIdentity({ id: 'topic-03', slug: 'requirements-prd' }, `${originalLabel} تغير.`);
  const otherTopic = legacyHtmlChecklistIdentity({ id: 'topic-01', slug: 'project-idea-mvp' }, originalLabel);
  assert.equal(original.legacyKey, 'checklist_topic-03_0');
  assert.equal(changed.legacyKey, undefined);
  assert.equal(otherTopic.legacyKey, undefined);
  const values = new Map<string, string>([['checklist_topic-03_0', 'true'], ['checklist_topic-01_0', 'true']]);
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
  const store = createLegacyHtmlChecklistStore(() => storage);
  store.subscribe(changed, () => {});
  store.subscribe(otherTopic, () => {});
  store.subscribe(original, () => {});
  assert.equal(store.getSnapshot(original).checked, true);
  assert.equal(store.getSnapshot(changed).checked, false);
  assert.equal(store.getSnapshot(otherTopic).checked, false);
  assert.equal(values.size, 2); // Mounting performs no migration writes.
  store.toggle(original, false);
  assert.equal(values.get(original.key), 'false');
  assert.equal(values.get('checklist_topic-03_0'), 'true');
  const restored = createLegacyHtmlChecklistStore(() => storage);
  restored.subscribe(original, () => {});
  assert.equal(restored.getSnapshot(original).checked, false);
});

test('stable HTML identity is collision safe and independent of structured criteria', () => {
  const a = legacyHtmlChecklistIdentity({ id: 'a', slug: 'a,b' }, 'c');
  const b = legacyHtmlChecklistIdentity({ id: 'b', slug: 'a' }, 'b,c');
  assert.notEqual(a.key, b.key);
  assert.equal(a.key.startsWith('application-html-checklist-v1:'), true);
});

test('legacy blocked reads/writes keep multiple local choices; recovery saves them without changing old keys', () => {
  const one = legacyHtmlChecklistIdentity({ id: 'topic-03', slug: 'requirements-prd' }, originalLabel);
  const two = legacyHtmlChecklistIdentity({ id: 'topic-03', slug: 'requirements-prd' }, 'criterion two');
  const values = new Map<string, string>([['checklist_topic-03_0', 'true']]);
  let blockRead = true;
  let blockWrite = true;
  const store = createLegacyHtmlChecklistStore(() => ({
    getItem(key: string) { if (blockRead) throw new Error('blocked'); return values.get(key) ?? null; },
    setItem(key: string, value: string) { if (blockWrite) throw new Error('quota'); values.set(key, value); },
  }));
  store.toggle(one, true);
  store.toggle(two, true);
  assert.equal(store.getSnapshot(one).checked, true);
  assert.equal(store.getSnapshot(two).checked, true);
  assert.equal(store.getSnapshot(one).storageStatus, 'read-error');
  blockRead = false;
  store.refresh();
  assert.equal(store.getSnapshot(one).storageStatus, 'write-error');
  store.toggle(one, false);
  assert.equal(store.getSnapshot(two).checked, true);
  blockWrite = false;
  store.refresh();
  assert.equal(values.get(one.key), 'false');
  assert.equal(values.get(two.key), 'true');
  assert.equal(values.get('checklist_topic-03_0'), 'true');
});

test('corrupt stable HTML data is preserved and does not fall back to a positional save', () => {
  const identity = legacyHtmlChecklistIdentity({ id: 'topic-03', slug: 'requirements-prd' }, originalLabel);
  const values = new Map<string, string>([[identity.key, 'invalid'], ['checklist_topic-03_0', 'true']]);
  const store = createLegacyHtmlChecklistStore(() => ({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } }));
  store.subscribe(identity, () => {});
  assert.equal(store.getSnapshot(identity).checked, false);
  store.toggle(identity, true);
  assert.equal(store.getSnapshot(identity).checked, true);
  assert.equal(store.getSnapshot(identity).storageStatus, 'invalid');
  assert.equal(values.get(identity.key), 'invalid');
});
