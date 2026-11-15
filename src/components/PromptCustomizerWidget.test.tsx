import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PromptCustomizerWidget } from './PromptCustomizerWidget.tsx';
import { STUDENT_BACKEND_PROMPTS, VARIABLE_PLACEHOLDERS } from '@/src/lib/promptCustomizer.ts';

test('PromptCustomizerWidget renders the 6 variable input fields with their Arabic labels', () => {
  const markup = renderToStaticMarkup(createElement(PromptCustomizerWidget));

  assert.match(markup, /مولّد برومبتات الباك إند المخصصة لمشروعك/);
  assert.match(markup, /السقالات التفاعلية للذكاء الاصطناعي/);

  // Check all 6 variable labels
  for (const meta of Object.values(VARIABLE_PLACEHOLDERS)) {
    assert.ok(markup.includes(meta.labelAr), `Missing label: ${meta.labelAr}`);
  }
});

test('PromptCustomizerWidget renders all 9 backend prompt titles and stages', () => {
  const markup = renderToStaticMarkup(createElement(PromptCustomizerWidget));

  STUDENT_BACKEND_PROMPTS.forEach((template) => {
    assert.ok(markup.includes(template.titleAr), `Missing prompt title: ${template.titleAr}`);
    assert.ok(markup.includes(template.stageAr), `Missing prompt stage: ${template.stageAr}`);
  });
});

test('PromptCustomizerWidget contains preset actions and reset button', () => {
  const markup = renderToStaticMarkup(createElement(PromptCustomizerWidget));

  assert.match(markup, /مثال منصة BorrowHub/);
  assert.match(markup, /مثال متجر Candy Loz/);
  assert.match(markup, /إعادة تعيين/);
  assert.match(markup, /نسخ البرومبت/);
});
