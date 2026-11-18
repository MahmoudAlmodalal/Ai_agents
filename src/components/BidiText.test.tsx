import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { formatBidiString, splitBidi, BidiText } from './BidiText.tsx';

test('formatBidiString separates waw from attached Latin words', () => {
  assert.equal(formatBidiString('GitHubو Git'), 'GitHub و Git');
  assert.equal(formatBidiString('Git وGitHub'), 'Git و GitHub');
  assert.equal(formatBidiString('مثل Google Stitch وMermaid وGitHub'), 'مثل Google Stitch و Mermaid و GitHub');
  assert.equal(formatBidiString('Failed وNot Run'), 'Failed و Not Run');
  assert.equal(formatBidiString('Agent وSkill وMCP وPRD'), 'Agent و Skill و MCP و PRD');
});

test('formatBidiString preserves purely Arabic text without alteration', () => {
  const arabic = 'مسار عملي متدرج من الفكرة إلى الواجهات والخادم';
  assert.equal(formatBidiString(arabic), arabic);
});

test('splitBidi isolates Latin segments correctly', () => {
  const parts = splitBidi('مثل Google Stitch وMermaid وGitHub');
  assert.deepEqual(parts, [
    { type: 'ar', text: 'مثل ' },
    { type: 'en', text: 'Google Stitch' },
    { type: 'ar', text: ' و ' },
    { type: 'en', text: 'Mermaid' },
    { type: 'ar', text: ' و ' },
    { type: 'en', text: 'GitHub' },
  ]);
});

test('splitBidi isolates terms with hyphens, dots, and slashes', () => {
  const parts = splitBidi('تكامل CI/CD وبناء Full-Stack في Node.js 18');
  assert.deepEqual(parts, [
    { type: 'ar', text: 'تكامل ' },
    { type: 'en', text: 'CI/CD' },
    { type: 'ar', text: ' وبناء ' },
    { type: 'en', text: 'Full-Stack' },
    { type: 'ar', text: ' في ' },
    { type: 'en', text: 'Node.js 18' },
  ]);
});

test('BidiText renders isolated <bdi dir="ltr"> tags for English terms', () => {
  const html = renderToStaticMarkup(<BidiText text="GitHubو Git وMCP" />);
  assert.ok(html.includes('<bdi dir="ltr"'));
  assert.ok(html.includes('GitHub'));
  assert.ok(html.includes(' و '));
  assert.ok(html.includes('MCP'));
});
