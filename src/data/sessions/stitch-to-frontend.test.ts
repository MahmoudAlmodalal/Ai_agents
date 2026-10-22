import test from 'node:test';
import assert from 'node:assert/strict';
import { STITCH_TO_FRONTEND_SESSION } from './stitch-to-frontend.ts';
import { getAllProposedGroups } from '@/src/lib/educationalRoadmap.ts';
import { getTopicBySlug } from '@/src/lib/topicRegistry.ts';
import { getPromptLibraryRecord } from '@/src/lib/promptLibrary.ts';
import { PROMPTS } from '@/src/lib/courseContent.ts';

const session = STITCH_TO_FRONTEND_SESSION;

test('session is a companion page, not a 59th roadmap topic', () => {
  const roadmapSlugs = getAllProposedGroups().flatMap((group) => group.topicSlugs);
  assert.equal(roadmapSlugs.length, 58);
  assert.equal(roadmapSlugs.includes(session.slug), false);
  assert.equal(session.route, '/learn/stitch-to-frontend');
  assert.equal(session.previousTopicSlug, 'design-md-spec');
});

test('every related topic slug resolves to an existing topic', () => {
  const slugs = session.relatedGroups.flatMap((group) => group.topicSlugs);
  assert.ok(slugs.length >= 20);
  for (const slug of slugs) {
    assert.ok(getTopicBySlug(slug), `missing related topic: ${slug}`);
  }
});

test('every prompt library reference resolves', () => {
  const referenced = session.prompts.filter((prompt) => prompt.librarySlug);
  assert.ok(referenced.length > 0);
  for (const prompt of referenced) {
    assert.ok(
      getPromptLibraryRecord(prompt.librarySlug as string),
      `missing library prompt: ${prompt.librarySlug}`
    );
  }
});

test('prompt metadata is unique and every prompt has a usable target', () => {
  const ids = session.prompts.map((prompt) => prompt.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const prompt of session.prompts) {
    assert.ok(prompt.librarySlug || prompt.inline, `prompt ${prompt.id} has no target`);
    if (prompt.inline) {
      assert.ok(session.htmlContent.includes(`id="${prompt.id}"`), `missing inline anchor: ${prompt.id}`);
    }
  }
});

test('table of contents anchors exist in the authored HTML', () => {
  assert.ok(session.tableOfContents.length >= 10);
  for (const item of session.tableOfContents) {
    assert.ok(session.htmlContent.includes(`id="${item.id}"`), `missing section anchor: ${item.id}`);
  }
});

test('checklist metadata and rendered checklist stay in sync', () => {
  const renderedItems = session.htmlContent.match(/class="checklist-item"/g) ?? [];
  assert.equal(renderedItems.length, session.checklist.length);
  assert.ok(session.htmlContent.includes('class="checklist-card"'));
});

test('lecture six adds no duplicate prompt headings to the library parser', () => {
  assert.equal(PROMPTS.length, 31);
  const numbers = PROMPTS.map((prompt) => prompt.number);
  assert.equal(new Set(numbers).size, numbers.length);
});

test('session keeps frontend-only boundaries explicit', () => {
  assert.match(session.htmlContent, /Backend/);
  assert.match(session.htmlContent, /Mock Data/);
  assert.doesNotMatch(session.htmlContent, /تسجيل دخول حقيقي/);
});
