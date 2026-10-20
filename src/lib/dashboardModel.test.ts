import assert from 'node:assert/strict';
import test from 'node:test';
import { getNonPreviewBadgeEvidence, previewBadgeRules, type BadgeDraftEvidence } from './dashboardModel';
import type { PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';

function attempt(id: string, previewOnly = true): QuizAttemptRecord {
  return {
    attemptId: id,
    topicSlug: 'project-idea-mvp',
    quizId: 'quiz-project-scope',
    quizVersion: 1,
    policyId: 'proposal-v1',
    policyVersion: 1,
    answers: [],
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    score: 0,
    maxScore: 0,
    submittedAt: '2026-10-19T12:00:00.000Z',
    selfCheck: true,
    previewOnly,
  };
}

function practical(topicSlug: string, rating = true, previewOnly = true): PracticalAssessmentRecord {
  return {
    topicSlug,
    assessmentId: 'rubric-v1',
    assessmentVersion: 1,
    scaleId: 'descriptive-three-level',
    scaleVersion: 1,
    criteria: [{ criterionId: 'criterion-one', criterionVersion: 1 }],
    ratings: rating ? [{ criterionId: 'criterion-one', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'in-progress', ratedAt: '2026-10-19T12:00:00.000Z' }] : [],
    history: rating ? [] : [{ criterionId: 'criterion-one', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'in-progress', ratedAt: '2026-10-19T12:00:00.000Z' }],
    updatedAt: '2026-10-19T12:00:00.000Z',
    selfAssessment: true,
    previewOnly,
  };
}

function findPreview(evidence: BadgeDraftEvidence, id: string) {
  return previewBadgeRules(evidence).find((preview) => preview.rule.id === id)!;
}

test('empty profile shows no matched draft conditions', () => {
  const evidence: BadgeDraftEvidence = { recentlyViewedTopicSlugs: [], quizAttempts: [], practicalAssessments: [] };
  assert.ok(previewBadgeRules(evidence).every((preview) => !preview.draftConditionMet));
});

test('reading proposal counts only the visible recent list and makes no completion claim', () => {
  const evidence: BadgeDraftEvidence = { recentlyViewedTopicSlugs: ['a', 'b', 'c', 'd', 'e'], quizAttempts: [], practicalAssessments: [] };
  const result = findPreview(evidence, 'explore-topics');
  assert.equal(result.draftConditionMet, true);
  assert.equal(result.observedCount, 5);
  assert.equal(result.nonPreviewEvidenceCount, 0);
});

test('previewOnly quiz attempts can match a clearly labeled draft preview but are excluded from award-eligible evidence', () => {
  const evidence: BadgeDraftEvidence = { recentlyViewedTopicSlugs: [], quizAttempts: [attempt('a'), attempt('b'), attempt('c')], practicalAssessments: [] };
  assert.equal(findPreview(evidence, 'practice-quizzes').draftConditionMet, true);
  assert.deepEqual(getNonPreviewBadgeEvidence(evidence).quizAttempts, []);

  evidence.quizAttempts.push(attempt('d', false));
  assert.deepEqual(getNonPreviewBadgeEvidence(evidence).quizAttempts.map((record) => record.attemptId), ['d']);
});

test('rubric preview uses current ratings and does not resurrect cleared ratings from history', () => {
  const evidence: BadgeDraftEvidence = {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [practical('a'), practical('b'), practical('c')],
  };
  assert.equal(findPreview(evidence, 'reflect-on-practice').draftConditionMet, true);
  assert.deepEqual(getNonPreviewBadgeEvidence(evidence).practicalAssessments, []);

  evidence.practicalAssessments[0] = practical('a', false);
  assert.equal(findPreview(evidence, 'reflect-on-practice').observedCount, 2);
  assert.equal(findPreview(evidence, 'reflect-on-practice').draftConditionMet, false);
});

test('unavailable evidence is reported as unconfirmed instead of as an empty draft condition', () => {
  const evidence: BadgeDraftEvidence = {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [],
    recentlyViewedStatus: 'read-error',
    quizAttemptsStatus: 'invalid',
    practicalAssessmentsStatus: 'available',
  };
  const previews = previewBadgeRules(evidence);
  assert.equal(previews[0].evidenceConfirmed, false);
  assert.equal(previews[0].evidenceStatus, 'read-error');
  assert.match(previews[0].resultLabel, /غير مؤكدة/);
  assert.equal(previews[1].evidenceConfirmed, false);
  assert.equal(previews[1].resultLabel, 'تعذر تأكيد الأدلة المحلية؛ نتيجة الشروط غير مؤكدة');
  assert.equal(previews[2].evidenceConfirmed, true);
  assert.equal(previews[2].resultLabel, 'لم تتحقق شروط المسودة؛ لا توجد شارة ممنوحة');
});
