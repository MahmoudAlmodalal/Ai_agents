import assert from 'node:assert/strict';
import test from 'node:test';
import { isExternalVideoApproved, isLearningPolicyEnabled, isPolicyApproved, resolvePolicyWordingState } from './learningPolicy';

const validApproval = {
  state: 'approved',
  approvedBy: 'Course owner',
  approvedAt: '2026-10-19T12:00:00.000Z',
  decisionReference: 'assessment-policy-review-1',
} as const;
const passingReview = [{
  area: 'question',
  outcome: 'passed',
  evidence: 'Reviewed against objective and answer rationale.',
  reviewer: 'Educational reviewer',
  reviewedAt: '2026-10-19T12:00:00.000Z',
}];
const passingLessonReview = [{ ...passingReview[0], area: 'lesson' }];
const passingRubricReview = [{ ...passingReview[0], area: 'rubric' }];

test('owner approval requires the full audit evidence before enabling policy or video links', () => {
  assert.equal(isPolicyApproved({ state: 'proposed', approvedBy: null, approvedAt: null, decisionReference: null }), false);
  assert.equal(isPolicyApproved({ ...validApproval, approvedBy: ' ' }), false);
  assert.equal(isPolicyApproved({ ...validApproval, approvedAt: 'not a date' }), false);
  assert.equal(isPolicyApproved({ ...validApproval, decisionReference: '' }), false);
  assert.equal(isPolicyApproved(validApproval), true);
  assert.equal(isLearningPolicyEnabled('review-ready', validApproval, [
    { area: 'lesson', evidence: passingLessonReview },
    { area: 'question', evidence: passingReview },
    { area: 'question', evidence: passingReview },
  ]), false);
  assert.equal(isLearningPolicyEnabled('approved', validApproval), false);
  assert.equal(isLearningPolicyEnabled('approved', validApproval, [
    { area: 'lesson', evidence: passingLessonReview },
    { area: 'question', evidence: passingReview },
    { area: 'question', evidence: passingReview },
  ]), true);
  assert.equal(isLearningPolicyEnabled('approved', validApproval, [
    { area: 'lesson', evidence: passingLessonReview },
    { area: 'question', evidence: passingReview },
    { area: 'question', evidence: [{ ...passingReview[0], outcome: 'not-run' }] },
  ]), false);
  assert.equal(isLearningPolicyEnabled('approved', validApproval, [
    { area: 'lesson', evidence: passingLessonReview },
    { area: 'rubric', evidence: passingRubricReview },
    { area: 'rubric', evidence: passingReview },
  ]), false);
  const videoReview = {
    topicSlug: 'topic-test',
    contentVersion: 2,
    reviewer: 'Synthetic test fixture',
    reviewedAt: '2026-10-19T12:00:00.000Z',
    sourceUrl: 'https://example.org/video',
    evidence: 'Synthetic test fixture only; not evidence of an actual video review.',
    checklist: {
      topicAlignment: 'passed',
      educationalSuitability: 'passed',
      playback: 'passed',
      captions: 'passed',
      accessibility: 'passed',
      unavailableHandling: 'passed',
    },
  } as const;
  const video = {
    availability: 'available',
    approval: validApproval,
    url: 'https://example.org/video',
    acceptanceReview: videoReview,
  } as const;
  assert.equal(isExternalVideoApproved({ ...video, availability: 'candidate' }, 'topic-test', 2), false);
  assert.equal(isExternalVideoApproved({ ...video, acceptanceReview: undefined }, 'topic-test', 2), false);
  assert.equal(isExternalVideoApproved(video, 'topic-test', 2), true);
  assert.equal(isExternalVideoApproved(video, 'topic-test', 3), false);
});

test('resolvePolicyWordingState resolves to approved, pending, or draft accurately', () => {
  const passingGroups = [
    { area: 'lesson' as const, evidence: passingLessonReview },
    { area: 'question' as const, evidence: passingReview },
    { area: 'question' as const, evidence: passingReview },
  ];

  // 1. Policy not approved -> 'draft'
  assert.equal(resolvePolicyWordingState('draft', { state: 'proposed' }), 'draft');
  assert.equal(resolvePolicyWordingState('approved', { state: 'proposed' }, passingGroups), 'draft');

  // 2. Policy approved but reviewState not approved -> 'pending'
  assert.equal(resolvePolicyWordingState('draft', validApproval), 'pending');
  assert.equal(resolvePolicyWordingState('review-ready', validApproval, passingGroups), 'pending');

  // 3. Policy approved, reviewState approved, but missing/not-run evidence -> 'pending'
  assert.equal(resolvePolicyWordingState('approved', validApproval, []), 'pending');
  assert.equal(resolvePolicyWordingState('approved', validApproval, [
    { area: 'lesson' as const, evidence: passingLessonReview },
    { area: 'question' as const, evidence: [{ ...passingReview[0], outcome: 'not-run' }] },
    { area: 'question' as const, evidence: passingReview },
  ]), 'pending');

  // 4. Policy approved, reviewState approved, and all evidence passed -> 'approved'
  assert.equal(resolvePolicyWordingState('approved', validApproval, passingGroups), 'approved');
});
