import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PROMPT_BUILD_STEPS,
  PROMPT_BUILD_STEP_COUNT,
  PROMPT_LIBRARY,
  PROMPT_SUPPORTING,
} from './promptLibrary';

test('the prompt library keeps all 41 copyable prompts', () => {
  assert.equal(PROMPT_LIBRARY.length, 41);
  assert.equal(new Set(PROMPT_LIBRARY.map((prompt) => prompt.slug)).size, 41);
});

test('build order is a contiguous 1..N sequence with no duplicates', () => {
  assert.deepEqual(
    PROMPT_BUILD_STEPS.map((prompt) => prompt.buildOrder),
    Array.from({ length: PROMPT_BUILD_STEP_COUNT }, (_, index) => index + 1),
  );
  assert.equal(new Set(PROMPT_BUILD_STEPS.map((prompt) => prompt.slug)).size, PROMPT_BUILD_STEP_COUNT);
});

test('the path starts at discovery and ends at handoff', () => {
  assert.equal(PROMPT_BUILD_STEPS[0].slug, 'prompt-01-grill-me-product-discovery');
  assert.equal(PROMPT_BUILD_STEPS.at(-1)?.slug, 'prompt-30-github-handoff');
});

test('supporting prompts are the three reusable templates and four supplementary examples', () => {
  assert.deepEqual(
    PROMPT_SUPPORTING.map((prompt) => prompt.slug).sort(),
    [
      'cheatsheet-a-prepare-and-execute',
      'cheatsheet-b-review',
      'cheatsheet-c-handoff',
      'stage-example-database',
      'stage-example-nextjs-frontend',
      'stage-example-prd-planning',
      'stage-example-uiux',
    ],
  );
  for (const prompt of PROMPT_SUPPORTING) {
    assert.equal(prompt.buildOrder, null);
  }
});

test('every prompt carries a short Arabic title and a one-line benefit', () => {
  for (const prompt of PROMPT_LIBRARY) {
    assert.ok(prompt.titleAr.trim().length > 0, `${prompt.slug} is missing titleAr`);
    assert.ok(prompt.benefit.trim().length > 0, `${prompt.slug} is missing benefit`);
    assert.ok(prompt.benefit.length <= 110, `${prompt.slug} benefit is not a single short line (${prompt.benefit.length})`);
    if (prompt.sourceGroup === 'catalog' || prompt.sourceGroup === 'supplementary') {
      assert.ok(prompt.titleAr !== prompt.title, `${prompt.slug} titleAr must be a real Arabic subtitle`);
    }
  }
});

test('every catalog prompt number 01..31 appears exactly once in the library', () => {
  const catalogNumbers = PROMPT_LIBRARY
    .filter((prompt) => prompt.sourceGroup === 'catalog' || prompt.sourceGroup === 'supplementary')
    .map((prompt) => prompt.number)
    .sort();
  assert.deepEqual(catalogNumbers, Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0')));
});

test('only the Stitch MCP step is marked optional', () => {
  assert.deepEqual(
    PROMPT_LIBRARY.filter((prompt) => prompt.optional).map((prompt) => prompt.slug),
    ['prompt-22-stitch-mcp-connection-verification'],
  );
});
