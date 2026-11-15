import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDENT_BACKEND_PROMPTS,
  BORROWHUB_PRESET,
  CANDYLOZ_PRESET,
  renderPrompt,
  renderAllPrompts,
  VARIABLE_PLACEHOLDERS,
} from './promptCustomizer.ts';

test('STUDENT_BACKEND_PROMPTS contains exactly 9 ordered templates with valid metadata', () => {
  assert.equal(STUDENT_BACKEND_PROMPTS.length, 9);
  STUDENT_BACKEND_PROMPTS.forEach((template, index) => {
    assert.equal(template.number, index + 1);
    assert.ok(template.id.startsWith('backend-'));
    assert.ok(template.titleAr.length > 5);
    assert.ok(template.stageAr.length > 3);
    assert.ok(template.goalAr.length > 10);
    assert.ok(template.rawTemplate.length > 50);
    assert.ok(Array.isArray(template.requiredVariables));
  });
});

test('renderPrompt with BORROWHUB_PRESET replaces all tokens across all 9 prompts', () => {
  const all = renderAllPrompts(BORROWHUB_PRESET);
  assert.equal(all.length, 9);

  for (const { template, result } of all) {
    assert.equal(
      result.missingVariables.length,
      0,
      `Prompt ${template.number} reported missing variables: ${result.missingVariables.join(', ')}`
    );
    assert.equal(
      result.unreplacedTokens.length,
      0,
      `Prompt ${template.number} had unreplaced tokens: ${result.unreplacedTokens.join(', ')}`
    );
    assert.ok(
      result.rendered.includes(BORROWHUB_PRESET.projectName),
      `Prompt ${template.number} did not contain project name`
    );
  }
});

test('renderPrompt with CANDYLOZ_PRESET replaces all tokens across all 9 prompts', () => {
  const all = renderAllPrompts(CANDYLOZ_PRESET);
  assert.equal(all.length, 9);

  for (const { template, result } of all) {
    assert.equal(result.missingVariables.length, 0);
    assert.equal(result.unreplacedTokens.length, 0);
    assert.ok(result.rendered.includes(CANDYLOZ_PRESET.projectName));
  }
});

test('renderPrompt detects missing required variables and unreplaced tokens when variables are omitted', () => {
  const template = STUDENT_BACKEND_PROMPTS[0]; // requires projectName, domainSummary, targetUsers
  const result = renderPrompt(template, {});

  assert.deepEqual(result.missingVariables, ['projectName', 'domainSummary', 'targetUsers']);
  assert.ok(result.unreplacedTokens.includes('[PROJECT_NAME]'));
  assert.ok(result.unreplacedTokens.includes('[DOMAIN_SUMMARY]'));
  assert.ok(result.unreplacedTokens.includes('[TARGET_USERS]'));
});

test('renderPrompt replaces Arabic alias tokens alongside English tokens', () => {
  const customTemplate = {
    id: 'test-arabic',
    number: 99,
    slug: 'test-arabic',
    titleAr: 'اختبار',
    stageAr: 'اختبار',
    goalAr: 'اختبار استبدال الوسوم العربية',
    requiredVariables: ['projectName', 'appName'] as (keyof typeof VARIABLE_PLACEHOLDERS)[],
    rawTemplate: 'مشروع [اسم_مشروعك] في تطبيق [اسم_التطبيق] و [PROJECT_NAME]',
  };

  const result = renderPrompt(customTemplate, {
    projectName: 'مشروعي_الرائع',
    appName: 'core_app',
  });

  assert.equal(result.missingVariables.length, 0);
  assert.equal(result.unreplacedTokens.length, 0);
  assert.equal(result.rendered, 'مشروع مشروعي_الرائع في تطبيق core_app و مشروعي_الرائع');
});
