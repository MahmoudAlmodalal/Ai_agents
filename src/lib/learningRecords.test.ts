import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createLearningRecordsStore,
  PRACTICAL_ASSESSMENTS_STORAGE_KEY,
  QUIZ_ATTEMPTS_STORAGE_KEY,
} from './learningRecords';
import type { PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';

function mockStorage(initial?: Record<string, string>) {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    map,
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) { map.set(key, value); },
  };
}

function attempt(overrides: Partial<QuizAttemptRecord> = {}): QuizAttemptRecord {
  return {
    attemptId: 'attempt-1',
    topicSlug: 'project-idea-mvp',
    quizId: 'quiz-project-scope',
    quizVersion: 1,
    policyId: 'proposal-v1',
    policyVersion: 1,
    answers: [
      { questionId: 'q-problem', questionVersion: 1, selectedOptionId: 'problem', correctness: 'correct' },
      { questionId: 'q-scope', questionVersion: 2, selectedOptionId: 'scope', correctness: 'incorrect' },
      { questionId: 'q-evidence', questionVersion: 1, selectedOptionId: null, correctness: 'unanswered' },
    ],
    correctCount: 1,
    incorrectCount: 1,
    unansweredCount: 1,
    score: 1,
    maxScore: 3,
    submittedAt: '2026-10-19T12:00:00.000Z',
    selfCheck: true,
    previewOnly: true,
    ...overrides,
  };
}

function practical(overrides: Partial<PracticalAssessmentRecord> = {}): PracticalAssessmentRecord {
  return {
    topicSlug: 'project-idea-mvp',
    assessmentId: 'rubric-project-context',
    assessmentVersion: 1,
    scaleId: 'descriptive-three-level',
    scaleVersion: 1,
    criteria: [{ criterionId: 'problem-evidence', criterionVersion: 1 }],
    ratings: [{ criterionId: 'problem-evidence', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'in-progress', ratedAt: '2026-10-19T12:00:00.000Z' }],
    history: [],
    updatedAt: '2026-10-19T12:00:00.000Z',
    selfAssessment: true,
    previewOnly: true,
    ...overrides,
  };
}

test('quiz attempts retain scoring detail, question versions, retries, and Topic isolation across reloads', () => {
  const storage = mockStorage();
  const firstStore = createLearningRecordsStore(() => storage);
  const first = firstStore.saveQuizAttempt(attempt());
  assert.equal(first.storageStatus, 'available');
  assert.deepEqual(first.attempts[0].answers.map((answer) => answer.correctness), ['correct', 'incorrect', 'unanswered']);

  firstStore.saveQuizAttempt(attempt({ attemptId: 'attempt-2', submittedAt: '2026-10-19T12:10:00.000Z' }));
  firstStore.saveQuizAttempt(attempt({ attemptId: 'other-topic-attempt', topicSlug: 'git-project-docs' }));

  const reloadedStore = createLearningRecordsStore(() => storage);
  const restored = reloadedStore.getQuizAttempts('project-idea-mvp');
  assert.equal(restored.storageStatus, 'available');
  assert.equal(restored.attempts.length, 2);
  assert.equal(restored.attempts[0].answers[1].questionVersion, 2);
  assert.equal(reloadedStore.getQuizAttempts('git-project-docs').attempts.length, 1);
  assert.equal(JSON.parse(storage.map.get(QUIZ_ATTEMPTS_STORAGE_KEY)!).schemaVersion, 1);
});

test('a revised rubric keeps retired ratings recoverable without applying them to a new criterion version', () => {
  const storage = mockStorage();
  const store = createLearningRecordsStore(() => storage);
  store.savePracticalAssessment(practical());

  const revised = store.savePracticalAssessment(practical({
    assessmentVersion: 2,
    criteria: [{ criterionId: 'problem-evidence', criterionVersion: 2 }],
    ratings: [{ criterionId: 'problem-evidence', criterionVersion: 2, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'not-yet', ratedAt: '2026-10-19T12:10:00.000Z' }],
    updatedAt: '2026-10-19T12:10:00.000Z',
  }));
  assert.equal(revised.storageStatus, 'available');
  assert.equal(revised.record?.ratings[0].criterionVersion, 2);
  assert.equal(revised.record?.history.length, 1);
  assert.equal(revised.record?.history[0].ratingId, 'in-progress');

  const reloaded = createLearningRecordsStore(() => storage).getPracticalAssessment('project-idea-mvp');
  assert.equal(reloaded.record?.history[0].criterionVersion, 1);
});

test('a revised rubric scale archives old-scale judgments instead of interpreting them as current', () => {
  const storage = mockStorage();
  const store = createLearningRecordsStore(() => storage);
  store.savePracticalAssessment(practical());

  const revised = store.savePracticalAssessment(practical({
    assessmentVersion: 2,
    scaleId: 'descriptive-four-level',
    scaleVersion: 2,
    criteria: [{ criterionId: 'problem-evidence', criterionVersion: 1 }],
    ratings: [],
    updatedAt: '2026-10-19T12:10:00.000Z',
  }));
  assert.equal(revised.record?.ratings.length, 0);
  assert.equal(revised.record?.history.length, 1);
  assert.equal(revised.record?.history[0].scaleId, 'descriptive-three-level');
  assert.equal(revised.record?.history[0].scaleVersion, 1);
});

test('blocked writes keep session records and honestly restore them when persistence recovers', () => {
  const map = new Map<string, string>();
  let blockWrites = true;
  const storage = {
    getItem(key: string) { return map.get(key) ?? null; },
    setItem(key: string, value: string) {
      if (blockWrites) throw new Error('QuotaExceededError');
      map.set(key, value);
    },
  };
  const store = createLearningRecordsStore(() => storage);
  const saved = store.saveQuizAttempt(attempt());
  assert.equal(saved.storageStatus, 'write-error');
  assert.equal(store.getQuizAttempts('project-idea-mvp').attempts.length, 1);
  const savedRubric = store.savePracticalAssessment(practical());
  assert.equal(savedRubric.storageStatus, 'write-error');
  assert.equal(store.getPracticalAssessment('project-idea-mvp').record?.ratings.length, 1);
  assert.equal(map.has(QUIZ_ATTEMPTS_STORAGE_KEY), false);
  assert.equal(map.has(PRACTICAL_ASSESSMENTS_STORAGE_KEY), false);

  blockWrites = false;
  store.saveQuizAttempt(attempt({ attemptId: 'attempt-2', submittedAt: '2026-10-19T12:10:00.000Z' }));
  assert.equal(store.getQuizAttempts('project-idea-mvp').storageStatus, 'available');
  assert.equal(JSON.parse(map.get(QUIZ_ATTEMPTS_STORAGE_KEY)!).byTopic['project-idea-mvp'].length, 2);
  store.savePracticalAssessment(practical({ updatedAt: '2026-10-19T12:10:00.000Z' }));
  assert.equal(store.getPracticalAssessment('project-idea-mvp').storageStatus, 'available');
  assert.equal(JSON.parse(map.get(PRACTICAL_ASSESSMENTS_STORAGE_KEY)!).byTopic['project-idea-mvp'].ratings.length, 1);
});

test('practical judgments stay isolated by stable Topic slug across reloads', () => {
  const storage = mockStorage();
  const store = createLearningRecordsStore(() => storage);
  store.savePracticalAssessment(practical());
  store.savePracticalAssessment(practical({
    topicSlug: 'discovery-grill-me',
    assessmentId: 'rubric-discovery-interview',
    criteria: [{ criterionId: 'decision-trace', criterionVersion: 1 }],
    ratings: [{ criterionId: 'decision-trace', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'ready-for-review', ratedAt: '2026-10-19T12:10:00.000Z' }],
  }));

  const reloaded = createLearningRecordsStore(() => storage);
  assert.equal(reloaded.getPracticalAssessment('project-idea-mvp').record?.ratings[0].criterionId, 'problem-evidence');
  assert.equal(reloaded.getPracticalAssessment('discovery-grill-me').record?.ratings[0].criterionId, 'decision-trace');
});

test('malformed nested records remain untouched and are reported as invalid', () => {
  const malformed = JSON.stringify({ schemaVersion: 1, byTopic: { 'project-idea-mvp': [{ ...attempt(), answers: [{ questionId: 'q', questionVersion: 'old', selectedOptionId: 'a', correctness: 'correct' }] }] } });
  const storage = mockStorage({ [QUIZ_ATTEMPTS_STORAGE_KEY]: malformed, [PRACTICAL_ASSESSMENTS_STORAGE_KEY]: '{broken' });
  const store = createLearningRecordsStore(() => storage);
  assert.equal(store.getQuizAttempts('project-idea-mvp').storageStatus, 'invalid');
  assert.equal(store.getPracticalAssessment('project-idea-mvp').storageStatus, 'invalid');
  store.saveQuizAttempt(attempt());
  store.savePracticalAssessment(practical());
  assert.equal(storage.map.get(QUIZ_ATTEMPTS_STORAGE_KEY), malformed);
  assert.equal(storage.map.get(PRACTICAL_ASSESSMENTS_STORAGE_KEY), '{broken');
});

test('list snapshots keep quiz and practical storage failures distinct', () => {
  const storage = mockStorage({ [QUIZ_ATTEMPTS_STORAGE_KEY]: '{broken' });
  const snapshot = createLearningRecordsStore(() => storage).listLearningRecords();
  assert.equal(snapshot.quizStorageStatus, 'invalid');
  assert.equal(snapshot.practicalAssessmentStorageStatus, 'available');
  assert.equal(snapshot.storageStatus, 'invalid');
  assert.deepEqual(snapshot.quizAttempts, []);
  assert.deepEqual(snapshot.practicalAssessments, []);
});

test('shape-valid but impossible quiz records are rejected instead of restoring inaccurate scores', () => {
  const malformedRecords = [
    attempt({ correctCount: 2, score: 2 }),
    attempt({ answers: [
      { questionId: 'same-question', questionVersion: 1, selectedOptionId: 'a', correctness: 'correct' },
      { questionId: 'same-question', questionVersion: 1, selectedOptionId: 'b', correctness: 'incorrect' },
      { questionId: 'q-evidence', questionVersion: 1, selectedOptionId: null, correctness: 'unanswered' },
    ] }),
  ];
  for (const impossible of malformedRecords) {
    const raw = JSON.stringify({ schemaVersion: 1, byTopic: { 'project-idea-mvp': [impossible] } });
    const storage = mockStorage({ [QUIZ_ATTEMPTS_STORAGE_KEY]: raw });
    const store = createLearningRecordsStore(() => storage);
    assert.equal(store.getQuizAttempts('project-idea-mvp').storageStatus, 'invalid');
    store.saveQuizAttempt(attempt());
    assert.equal(storage.map.get(QUIZ_ATTEMPTS_STORAGE_KEY), raw);
  }
});
