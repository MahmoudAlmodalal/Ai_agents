import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { LearnerProgressBar } from './LearnerProgressBar.tsx';
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
    tags: ['idea'],
    contentTypes: ['checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 0,
    checklistCount: 2,
    readingTimeMinutes: 5,
    htmlContent: '<p>محتوى</p>',
    slug: 'topic-1',
    goal: 'الهدف',
    prerequisites: [],
    steps: ['خطوة 1'],
    promptRefs: [],
    outputs: ['مخرج 1'],
    checklist: ['بند 1', 'بند 2'],
    publicationStatus: 'unified-complete',
    ...partial,
  };
}

test('LearnerProgressBar renders headline and privacy reassurance notice', () => {
  const topics = [
    createMockTopic({ slug: 'topic-f1', category: 'foundations' }),
    createMockTopic({ slug: 'topic-f2', category: 'foundations' }),
  ];

  const html = renderToString(React.createElement(LearnerProgressBar, { topics, selectedCategory: 'all' }));

  assert.ok(html.includes('أنجزت 0 من 2 في المرحلة التأسيسية'), 'Contains progress headline');
  assert.ok(html.includes('تقدمك وقوائم التحقق تُحفظ تلقائياً في متصفحك على هذا الجهاز فقط، دون الحاجة لإنشاء حساب أو تسجيل دخول'), 'Contains calm reassurance notice');
  assert.ok(html.includes('role="progressbar"'), 'Contains progressbar role');
});
