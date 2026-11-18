import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getGlossaryTerm } from '@/src/data/glossaryTerms.ts';
import { TechTermTooltip, renderWithTechTerms } from './TechTermTooltip.tsx';

test('getGlossaryTerm correctly resolves terms case-insensitively', () => {
  const mvp = getGlossaryTerm('MVP');
  assert.ok(mvp);
  assert.strictEqual(mvp.term, 'MVP');
  assert.ok(mvp.description.includes('أبسط إصدار'));

  const prdLower = getGlossaryTerm('prd');
  assert.ok(prdLower);
  assert.strictEqual(prdLower.term, 'PRD');

  const specKit = getGlossaryTerm('Spec Kit');
  assert.ok(specKit);

  const unknown = getGlossaryTerm('NON_EXISTENT_XYZ');
  assert.strictEqual(unknown, undefined);
});

test('TechTermTooltip renders button with aria attributes for defined term', () => {
  const html = renderToStaticMarkup(
    <TechTermTooltip term="MVP">MVP</TechTermTooltip>
  );
  assert.ok(html.includes('aria-haspopup="dialog"'));
  assert.ok(html.includes('MVP'));
});

test('renderWithTechTerms wraps acronyms in interactive tooltips', () => {
  const text = 'بناء MVP وتحديد نطاق المشروع مع وثيقة PRD';
  const element = renderWithTechTerms(text);
  const html = renderToStaticMarkup(<div>{element}</div>);

  assert.ok(html.includes('MVP'));
  assert.ok(html.includes('PRD'));
  assert.ok(html.includes('aria-haspopup="dialog"'));
});

test('renderWithTechTerms returns original text if no term is present', () => {
  const plainText = 'هندسة البرمجيات بالذكاء الاصطناعي';
  const element = renderWithTechTerms(plainText);
  assert.strictEqual(element, plainText);
});
