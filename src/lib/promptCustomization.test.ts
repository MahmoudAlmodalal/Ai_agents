import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createPromptCustomizationStore,
  PROMPT_CUSTOMIZATIONS_STORAGE_KEY,
  promptSourceRevision,
} from './promptCustomization';

function makeStorage(initial?: Record<string, string>) {
  const map = new Map(Object.entries(initial ?? {}));
  let failReads = false;
  let failWrites = false;
  return {
    map,
    storage: {
      getItem(key: string) {
        if (failReads) throw new Error('SecurityError');
        return map.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        if (failWrites) throw new Error('QuotaExceededError');
        map.set(key, value);
      },
      removeItem(key: string) { map.delete(key); },
      failReads(value: boolean) { failReads = value; },
      failWrites(value: boolean) { failWrites = value; },
    },
  };
}

function save(store: ReturnType<typeof createPromptCustomizationStore>, slug: string, text = `custom ${slug}`) {
  return store.save(slug, text, promptSourceRevision(`source ${slug}`));
}

test('several failed saves remain in the session snapshot and merge safely when storage recovers', () => {
  const backing = makeStorage();
  backing.storage.failWrites(true);
  const store = createPromptCustomizationStore(() => backing.storage);

  assert.equal(save(store, 'prompt-a').status, 'write-error');
  const afterB = save(store, 'prompt-b');
  assert.deepEqual(Object.keys(afterB.records).sort(), ['prompt-a', 'prompt-b']);
  assert.equal(backing.map.has(PROMPT_CUSTOMIZATIONS_STORAGE_KEY), false);

  backing.storage.failWrites(false);
  const recovered = store.refresh();
  assert.equal(recovered.status, 'available');
  assert.deepEqual(Object.keys(recovered.records).sort(), ['prompt-a', 'prompt-b']);
  assert.deepEqual(Object.keys(JSON.parse(backing.map.get(PROMPT_CUSTOMIZATIONS_STORAGE_KEY)!).records).sort(), ['prompt-a', 'prompt-b']);
});

test('a failed removal remains visible and is applied after a later refresh', () => {
  const backing = makeStorage();
  const store = createPromptCustomizationStore(() => backing.storage);
  save(store, 'prompt-a');
  save(store, 'prompt-b');
  backing.storage.failWrites(true);

  const removed = store.remove('prompt-a');
  assert.equal(removed.status, 'write-error');
  assert.equal(removed.records['prompt-a'], undefined);
  assert.ok(removed.records['prompt-b']);
  assert.ok(JSON.parse(backing.map.get(PROMPT_CUSTOMIZATIONS_STORAGE_KEY)!).records['prompt-a']);

  backing.storage.failWrites(false);
  const recovered = store.refresh();
  assert.equal(recovered.status, 'available');
  assert.equal(recovered.records['prompt-a'], undefined);
  assert.ok(recovered.records['prompt-b']);
  assert.equal(JSON.parse(backing.map.get(PROMPT_CUSTOMIZATIONS_STORAGE_KEY)!).records['prompt-a'], undefined);
});

test('blocked reads keep requested session edits until a later focus-style refresh succeeds', () => {
  const backing = makeStorage();
  backing.storage.failReads(true);
  const store = createPromptCustomizationStore(() => backing.storage);

  const first = save(store, 'prompt-a');
  assert.equal(first.status, 'read-error');
  assert.equal(first.records['prompt-a']?.text, 'custom prompt-a');
  const second = save(store, 'prompt-b');
  assert.deepEqual(Object.keys(second.records).sort(), ['prompt-a', 'prompt-b']);

  backing.storage.failReads(false);
  const afterFocus = store.refresh();
  assert.equal(afterFocus.status, 'available');
  assert.deepEqual(Object.keys(afterFocus.records).sort(), ['prompt-a', 'prompt-b']);
});

test('malformed saved data stays byte-for-byte intact and is reported as invalid', () => {
  const malformed = '{ broken prompt customizations';
  const backing = makeStorage({ [PROMPT_CUSTOMIZATIONS_STORAGE_KEY]: malformed });
  const store = createPromptCustomizationStore(() => backing.storage);

  assert.equal(store.refresh().status, 'invalid');
  const attempted = save(store, 'prompt-a');
  assert.equal(attempted.status, 'invalid');
  assert.equal(backing.map.get(PROMPT_CUSTOMIZATIONS_STORAGE_KEY), malformed);
});

test('source revisions change when the original prompt text changes', () => {
  assert.notEqual(promptSourceRevision('original prompt'), promptSourceRevision('revised prompt'));
  assert.equal(promptSourceRevision('original prompt'), promptSourceRevision('original prompt'));
});
