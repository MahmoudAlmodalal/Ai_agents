import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EXTERNAL_VIDEO_CANDIDATES } from '@/src/data/externalVideoRegistry.ts';
import { LEARNING_CONTENT_GROUP_A } from '@/src/data/learning/group-a.ts';
import { PROPOSED_EDUCATIONAL_GROUPS } from '@/src/lib/educationalRoadmap.ts';
import { isExternalVideoApproved } from '@/src/lib/learningPolicy.ts';
import { getTopicBySlug } from '@/src/lib/topicRegistry.ts';

const groups = PROPOSED_EDUCATIONAL_GROUPS.slice(0, 10);
const expectedSlugs = groups.flatMap((group) => group.topicSlugs);

function assertDraftIsCoherent(slug: string) {
  const content = LEARNING_CONTENT_GROUP_A[slug];
  const topic = getTopicBySlug(slug);
  assert.ok(topic, `${slug} remains in the canonical catalog`);
  assert.ok(content, `${slug} has a supplemental learning draft`);
  assert.equal(content.topicSlug, topic.slug);
  assert.equal(content.reviewState, 'draft');
  assert.equal(content.contentVersion, 1);
  assert.equal(content.objectives.length, 2);
  assert.equal(content.sections.length, 3);
  assert.equal(content.practicalSteps.length, 2);
  assert.ok(content.sections.every((section) => section.heading && section.body.length > 40));
  assert.ok(content.practicalSteps.every((step) => step.instruction.length > 20 && step.expectedOutput.length > 20));
  assert.ok(content.workedExamples.length >= 1);
  assert.ok(content.workedExamples.every((example) =>
    example.caseStudy !== 'borrowhub-optional' || /اختياري/.test(example.title)));

  const outputIds = content.practicalAssessment.outputs.map((output) => output.id);
  assert.equal(new Set(outputIds).size, outputIds.length, `${slug} output IDs are stable and unique`);
  assert.ok(outputIds.every((id) => !/-output-[12]$/.test(id)), `${slug} preserves semantic output IDs`);
  assert.ok(content.practicalAssessment.criteria.length >= 2);
  assert.ok(content.practicalAssessment.criteria.every((criterion) => outputIds.includes(criterion.outputId)));
  assert.ok(content.practicalAssessment.criteria.every((criterion) => criterion.reviewEvidence.some((evidence) =>
    evidence.area === 'rubric' && evidence.outcome === 'passed' && evidence.reviewer === 'root' &&
    evidence.reviewedAt === '2026-10-20')));

  const objectiveIds = new Set(content.objectives.map((objective) => objective.id));
  const questions = content.quiz.questions;
  assert.equal(questions.length, 2);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
  assert.ok(questions.every((question) => objectiveIds.has(question.objectiveId)));
  assert.ok(questions.every((question) => question.version === 1 && question.options.length === 4));
  assert.ok(questions.every((question) => question.options.some((option) => option.id === question.correctOptionId)));
  assert.ok(questions.every((question) => question.explanation.length > 30));
  assert.ok(questions.every((question) => question.reviewEvidence.some((evidence) =>
    evidence.area === 'question' && evidence.outcome === 'passed' && evidence.reviewer === 'root' &&
    evidence.reviewedAt === '2026-10-20')));
  assert.equal(content.quiz.scoringPolicy.approval.state, 'approved');
  assert.equal(content.quiz.scoringPolicy.approval.approvedBy, 'MahmoudAlmodalal (course owner)');
  assert.equal(content.quiz.scoringPolicy.approval.approvedAt, '2026-10-20');
  assert.equal(content.quiz.scoringPolicy.approval.decisionReference, 'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #42)');
  assert.equal(content.practicalAssessment.scale.approval.state, 'proposed');
  assert.equal(content.practicalAssessment.scale.completionRule, 'no-mastery-threshold');
  assert.deepEqual(content.practicalAssessment.scale.levels.map((level) => level.id), [
    'not-yet', 'in-progress', 'ready-for-review',
  ]);
  assert.equal(content.reviewEvidence[0]?.outcome, 'not-run');
  assert.equal(content.quiz.reviewEvidence[0]?.outcome, 'not-run');
  assert.equal(content.practicalAssessment.reviewEvidence[0]?.outcome, 'not-run');
  assert.ok(topic.steps.length > 0, `${slug} retains its existing lesson`);
}

test('Groups 01–10 receive draft supplements for the exact canonical 29-topic boundary', () => {
  assert.equal(groups.length, 10);
  assert.equal(expectedSlugs.length, 29);
  assert.equal(new Set(expectedSlugs).size, expectedSlugs.length);
  assert.deepEqual(Object.keys(LEARNING_CONTENT_GROUP_A).sort(), [...expectedSlugs].sort());
  for (const slug of expectedSlugs) assertDraftIsCoherent(slug);
});

test('Topic 01 retains the reviewed narrow sample evidence and the real learner-project handoff', () => {
  const topic01 = LEARNING_CONTENT_GROUP_A['project-idea-mvp'];
  const topic = getTopicBySlug('project-idea-mvp');
  assert.ok(topic01 && topic);
  assert.equal(topic.sequencePosition, 1);
  assert.ok(topic.steps.some((step) => step.includes('docs/PROJECT_CONTEXT.md')));
  assert.ok(topic01.practicalSteps.some((step) => step.expectedOutput.includes('docs/PROJECT_CONTEXT.md')));
  assert.ok(topic01.practicalSteps.some((step) => step.expectedOutput.includes('Topic 02')));
  assert.deepEqual(topic01.practicalAssessment.outputs.map((output) => output.id), [
    'project-context', 'next-topic-input',
  ]);
  assert.ok(topic01.quiz.questions.every((question) =>
    question.reviewEvidence.some((evidence) => evidence.reviewer === 'root' && evidence.outcome === 'passed')));
  assert.ok(topic01.practicalAssessment.criteria.every((criterion) =>
    criterion.reviewEvidence.some((evidence) => evidence.reviewer === 'root' && evidence.outcome === 'passed')));
});

test('Every Topic has one real video candidate with honest availability and no approval bypass', () => {
  assert.deepEqual(Object.keys(EXTERNAL_VIDEO_CANDIDATES).sort(), [...expectedSlugs].sort());
  const videos = expectedSlugs.flatMap((slug) => LEARNING_CONTENT_GROUP_A[slug].candidateVideos);
  assert.equal(videos.length, 29);
  assert.equal(new Set(videos.map((video) => video.id)).size, videos.length);
  for (const slug of expectedSlugs) {
    const video = LEARNING_CONTENT_GROUP_A[slug].candidateVideos[0];
    assert.ok(video, `${slug} has one candidate`);
    assert.equal(video.availability, 'candidate');
    assert.deepEqual(video.approval, {
      state: 'proposed', approvedBy: null, approvedAt: null, decisionReference: null,
    });
    assert.ok(video.url.startsWith('https://'));
    assert.equal(video.reviewEvidence[0]?.outcome, 'not-run');
    assert.ok(video.reviewEvidence[0]?.sourceUrl?.startsWith('https://'));
    assert.match(video.reviewEvidence[0]?.evidence ?? '', /playback.*not verified/i);
    assert.match(video.reviewEvidence[0]?.evidence ?? '', /accessibility.*not verified/i);
    assert.equal(isExternalVideoApproved(video), false);
  }
});
