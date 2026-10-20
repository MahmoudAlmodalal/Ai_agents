import assert from 'node:assert/strict';
import test from 'node:test';
import { APPLICATION_CHECKLIST_STORAGE_KEY } from './applicationChecklist';
import { readChecklistStorageStatus, readDashboardChecklistSnapshot } from './dashboardRecords';
import type { TopicItem } from '@/src/types/topic';

test('dashboard checklist status distinguishes invalid documents from blocked reads', () => {
  assert.equal(readChecklistStorageStatus({ getItem: () => '{broken' }), 'invalid');
  assert.equal(readChecklistStorageStatus({ getItem: () => '{"topic-a":["valid"]}' }), 'available');
  assert.equal(readChecklistStorageStatus({ getItem: (key) => { assert.equal(key, APPLICATION_CHECKLIST_STORAGE_KEY); throw new Error('blocked'); } }), 'read-error');
});

test('readDashboardChecklistSnapshot returns no entries for untouched topics and preserves unresolved keys', () => {
  const store = new Map<string, string>();
  store.set('checklist_123', 'true');
  store.set('application-html-checklist-v1:["nonexistent-topic","step-1"]', 'true');

  const mockStorage = {
    get length() { return store.size; },
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v); },
    removeItem: (k: string) => { store.delete(k); },
    clear: () => { store.clear(); },
  };

  const originalWindow = globalThis.window;
  (globalThis as unknown as { window: unknown }).window = { localStorage: mockStorage };

  try {
    const mockTopics: TopicItem[] = [
      {
        id: 'topic-1',
        slug: 'topic-1',
        number: '01',
        title: 'الموضوع الأول',
        subtitle: 'المقدمة',
        category: 'foundations',
        categoryName: 'الأساسيات',
        stageTag: 'بداية',
        summary: 'ملخص',
        tags: [],
        contentTypes: [],
        diagramCount: 0,
        promptCount: 0,
        codeSnippetCount: 0,
        checklistCount: 1,
        readingTimeMinutes: 5,
        htmlContent: '<p>محتوى</p>',
        goal: 'هدف',
        prerequisites: [],
        steps: [],
        promptRefs: [],
        outputs: [],
        checklist: ['خطوة 1'],
        publicationStatus: 'unified-complete',
      },
    ];

    const snapshot = readDashboardChecklistSnapshot(mockTopics);
    // No entries invented for untouched topic-1
    assert.equal(snapshot.entries.length, 0);
    // Unresolved historical keys preserved
    assert.equal(snapshot.unresolvedHistoricalKeys.length, 2);
    assert.ok(snapshot.unresolvedHistoricalKeys.includes('checklist_123'));
    assert.ok(snapshot.unresolvedHistoricalKeys.includes('application-html-checklist-v1:["nonexistent-topic","step-1"]'));
  } finally {
    (globalThis as unknown as { window: unknown }).window = originalWindow;
  }
});
