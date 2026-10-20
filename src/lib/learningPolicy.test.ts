import assert from 'node:assert/strict';
import test from 'node:test';
import { isExternalVideoApproved, isLearningPolicyEnabled, isPolicyApproved } from './learningPolicy';

const validApproval = {
  state: 'approved',
  approvedBy: 'Course owner',
  approvedAt: '2026-10-19T12:00:00.000Z',
  decisionReference: 'assessment-policy-review-1',
};
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
  assert.equal(isExternalVideoApproved({ availability: 'candidate', approval: validApproval }), false);
  assert.equal(isExternalVideoApproved({ availability: 'available', approval: validApproval }), true);
});
