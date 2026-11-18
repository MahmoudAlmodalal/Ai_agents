import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { InteractiveWorkflowExample } from './InteractiveWorkflowExample.tsx';

test('InteractiveWorkflowExample renders title, subtitle, and tabs', () => {
  const html = renderToString(React.createElement(InteractiveWorkflowExample));

  assert.ok(html.includes('شاهد كيف تتحول فكرة بسيطة إلى مشروع حقيقي في 3 خطوات'), 'Contains main title');
  assert.ok(html.includes('role="tablist"'), 'Contains tablist role');
  assert.ok(html.includes('1. الفكرة ووثيقة الـ PRD'), 'Contains Step 1 tab');
  assert.ok(html.includes('2. شاشة التصميم (UI)'), 'Contains Step 2 tab');
  assert.ok(html.includes('3. الكود النهائي النظيف'), 'Contains Step 3 tab');
});

test('InteractiveWorkflowExample renders Step 1 content with valid canonical links initially in SSR', () => {
  const html = renderToString(React.createElement(InteractiveWorkflowExample));

  assert.ok(html.includes('مخرج وثيقة المواصفات'), 'Step 1 PRD output is rendered initially');
  assert.ok(html.includes('/learn/discovery-grill-me'), 'Contains canonical link to topic 02');
  assert.ok(html.includes('/learn/prd-specification'), 'Contains canonical link to topic 03');
});
