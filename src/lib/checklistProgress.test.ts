import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateChecklistProgress,
  createApplicationChecklistStore,
} from './applicationChecklist.ts';
import type { TopicItem } from '@/src/types/topic.ts';

function createMockTopic(partial: Partial<TopicItem>): TopicItem {
  return {
    id: 'mock-1',
    number: '01',
    title: 'تحديد فكرة المشروع',
    subtitle: 'وصف فرعي',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'التأسيس',
    summary: 'ملخص تجريبي',
    tags: ['idea', 'mvp'],
    contentTypes: ['checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 0,
    checklistCount: 3,
    readingTimeMinutes: 5,
    htmlContent: '<p>محتوى</p>',
    slug: 'topic-1',
    goal: 'الهدف',
    prerequisites: [],
    steps: ['خطوة 1'],
    promptRefs: [],
    outputs: ['مخرج 1'],
    checklist: ['بند 1', 'بند 2', 'بند 3'],
    publicationStatus: 'unified-complete',
    ...partial,
  };
}

test('calculateChecklistProgress calculates zero completion on empty checklists', () => {
  const topics = [
    createMockTopic({ slug: 'topic-a', category: 'foundations', checklist: ['بند 1', 'بند 2'] }),
    createMockTopic({ slug: 'topic-b', category: 'foundations', checklist: ['بند 3', 'بند 4'] }),
  ];

  const result = calculateChecklistProgress(topics, 'foundations');
  assert.equal(result.totalTopics, 2);
  assert.equal(result.completedTopics, 0);
  assert.equal(result.totalChecklistItems, 4);
  assert.equal(result.completedChecklistItems, 0);
  assert.equal(result.percentage, 0);
});

test('calculateChecklistProgress respects category filter', () => {
  const topics = [
    createMockTopic({ slug: 'topic-f1', category: 'foundations', checklist: ['بند 1'] }),
    createMockTopic({ slug: 'topic-a1', category: 'architecture', checklist: ['بند 2', 'بند 3'] }),
  ];

  const foundationsResult = calculateChecklistProgress(topics, 'foundations');
  assert.equal(foundationsResult.totalTopics, 1);
  assert.equal(foundationsResult.totalChecklistItems, 1);

  const allResult = calculateChecklistProgress(topics, 'all');
  assert.equal(allResult.totalTopics, 2);
  assert.equal(allResult.totalChecklistItems, 3);
});

test('store.subscribeAll notifies on toggle across any topic', () => {
  const memoryStore = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => memoryStore.get(key) ?? null,
    setItem: (key: string, value: string) => { memoryStore.set(key, value); },
  };

  const testStore = createApplicationChecklistStore(() => mockStorage);
  let notifyCount = 0;

  const unsubscribe = testStore.subscribeAll(() => {
    notifyCount++;
  });

  testStore.toggle('topic-x', 'بند أول', true);
  assert.ok(notifyCount > 0, 'Should notify listeners on toggle');

  const beforeCount = notifyCount;
  unsubscribe();
  testStore.toggle('topic-y', 'بند ثان', true);
  assert.equal(notifyCount, beforeCount, 'Should not notify after unsubscribe');
});
