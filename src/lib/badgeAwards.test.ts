import assert from 'node:assert/strict';
import test from 'node:test';
import { BADGE_AWARDS_STORAGE_KEY, createBadgeAwardStore, reconcileBadgeAwards, type BadgeEvidence, type BadgePolicy } from './badgeAwards';
import type { QuizAttemptRecord } from '@/src/types/learning';

const stamp = '2026-10-20T10:00:00.000Z';

function policy(overrides: Partial<BadgePolicy> = {}): BadgePolicy {
  return {
    policyId: 'local-activity-badges',
    version: 1,
    reviewState: 'approved',
    approval: { state: 'approved', approvedBy: 'Course owner', approvedAt: stamp, decisionReference: 'decision-44' },
    rules: [{ id: 'try-quizzes', version: 1, title: 'Try quizzes', threshold: 2, evidence: 'quiz-attempts' }],
    ...overrides,
  };
}

function attempt(id: string, previewOnly: boolean): QuizAttemptRecord {
  return {
    attemptId: id,
    topicSlug: 'project-idea-mvp',
    quizId: 'scope-check',
    quizVersion: 1,
    policyId: 'scoring-proposal',
    policyVersion: 1,
    answers: [{ questionId: 'q1', questionVersion: 1, selectedOptionId: 'a', correctness: 'correct' }],
    correctCount: 1,
    incorrectCount: 0,
    unansweredCount: 0,
    score: 1,
    maxScore: 1,
    submittedAt: stamp,
    selfCheck: true,
    previewOnly,
  };
}

function evidence(quizAttempts: QuizAttemptRecord[]): BadgeEvidence {
  return { recentlyViewedTopicSlugs: [], quizAttempts, practicalAssessments: [] };
}

function memoryStorage(initial?: string) {
  const values = new Map<string, string>();
  if (initial !== undefined) values.set(BADGE_AWARDS_STORAGE_KEY, initial);
  return {
    values,
    getItem(key: string) { return values.get(key) ?? null; },
    setItem(key: string, value: string) { values.set(key, value); },
  };
}

test('draft or incomplete owner approval never creates awarded or unearned badge states', () => {
  const proposal = policy({
    reviewState: 'draft',
    approval: { state: 'proposed', approvedBy: null, approvedAt: null, decisionReference: null },
  });
  const result = reconcileBadgeAwards(proposal, evidence([attempt('a', false), attempt('b', false)]), [], new Date(stamp));
  assert.equal(result.evaluationStatus, 'awaiting-approval');
  assert.deepEqual(result.rules, []);
  assert.deepEqual(result.events, []);

  const invalidAudit = policy({ approval: { state: 'approved', approvedBy: ' ', approvedAt: stamp, decisionReference: '' } as never });
  assert.equal(reconcileBadgeAwards(invalidAudit, evidence([])).evaluationStatus, 'awaiting-approval');
});

test('previewOnly attempts are excluded from approved award eligibility', () => {
  const result = reconcileBadgeAwards(policy(), evidence([attempt('preview-a', true), attempt('approved-a', false)]), [], new Date(stamp));
  assert.equal(result.evaluationStatus, 'enabled');
  assert.equal(result.rules[0].observedCount, 1);
  assert.equal(result.rules[0].state, 'unearned');
  assert.deepEqual(result.events, []);
});

test('approved versioned awards persist across reload, revoke after evidence reversal, and can be earned again', () => {
  const backing = memoryStorage();
  const firstStore = createBadgeAwardStore(() => backing);
  const twoAttempts = evidence([attempt('a', false), attempt('b', false)]);
  const awarded = firstStore.refresh(policy(), twoAttempts);
  assert.equal(awarded.rules[0].state, 'awarded');
  assert.equal(awarded.events.length, 1);
  assert.equal(awarded.events[0].ruleVersion, 1);
  assert.deepEqual(awarded.events[0].evidenceKeys, [
    'project-idea-mvp:scope-check:1:a',
    'project-idea-mvp:scope-check:1:b',
  ]);

  const reloadedStore = createBadgeAwardStore(() => backing);
  const reloaded = reloadedStore.refresh(policy(), twoAttempts);
  assert.equal(reloaded.rules[0].state, 'awarded');
  assert.equal(reloaded.events.length, 1);
  assert.equal(reloaded.events[0].awardedAt, awarded.events[0].awardedAt);

  const reversed = reloadedStore.refresh(policy(), evidence([]));
  assert.equal(reversed.rules[0].state, 'unearned');
  assert.equal(reversed.events[0].status, 'revoked');
  assert.equal(reversed.events[0].endReason, 'evidence-below-threshold');
  const afterReversalReload = createBadgeAwardStore(() => backing).refresh(policy(), evidence([]));
  assert.equal(afterReversalReload.events[0].status, 'revoked');

  const earnedAgain = createBadgeAwardStore(() => backing).refresh(policy(), twoAttempts);
  assert.equal(earnedAgain.rules[0].state, 'awarded');
  assert.equal(earnedAgain.events.length, 2);
  assert.equal(earnedAgain.events[0].status, 'revoked');
  assert.equal(earnedAgain.events[1].status, 'awarded');
});

test('policy or rule version changes retire old awards and evaluate the newly approved version', () => {
  const backing = memoryStorage();
  const previous = createBadgeAwardStore(() => backing).refresh(policy(), evidence([attempt('a', false), attempt('b', false)]));
  const nextPolicy = policy({ version: 2, rules: [{ id: 'try-quizzes', version: 2, title: 'Try quizzes', threshold: 2, evidence: 'quiz-attempts' }] });
  const next = createBadgeAwardStore(() => backing).refresh(nextPolicy, evidence([attempt('a', false), attempt('b', false)]));
  assert.equal(previous.events[0].status, 'awarded');
  assert.equal(next.events[0].status, 'retired');
  assert.equal(next.events[0].endReason, 'policy-or-rule-version-changed');
  assert.equal(next.rules[0].state, 'awarded');
  assert.equal(next.events.at(-1)?.policyVersion, 2);
  assert.equal(next.events.at(-1)?.ruleVersion, 2);
});

test('unavailable evidence suspends award reconciliation until the source recovers', () => {
  const backing = memoryStorage();
  const store = createBadgeAwardStore(() => backing);
  const twoAttempts = evidence([attempt('a', false), attempt('b', false)]);
  const earned = store.refresh(policy(), twoAttempts);
  assert.equal(earned.events[0].status, 'awarded');
  const persistedBefore = backing.values.get(BADGE_AWARDS_STORAGE_KEY);

  const unreadable = store.refresh(policy(), { ...twoAttempts, learningRecordsStatus: 'read-error' });
  assert.equal(unreadable.rules[0].state, 'unconfirmed');
  assert.equal(unreadable.events[0].status, 'awarded');
  assert.equal(backing.values.get(BADGE_AWARDS_STORAGE_KEY), persistedBefore);

  const recovered = store.refresh(policy(), twoAttempts);
  assert.equal(recovered.rules[0].state, 'awarded');
  assert.equal(recovered.events.length, 1);
  assert.equal(recovered.events[0].status, 'awarded');
});

test('malformed award history is not overwritten and storage failures keep session events visible', () => {
  const malformed = '{broken-award-history';
  const invalid = memoryStorage(malformed);
  const blockedStore = createBadgeAwardStore(() => invalid);
  const status = blockedStore.refresh(policy(), evidence([attempt('a', false), attempt('b', false)]));
  assert.equal(status.storageStatus, 'invalid');
  assert.equal(invalid.values.get(BADGE_AWARDS_STORAGE_KEY), malformed);

  let failWrites = true;
  const writable = memoryStorage();
  const store = createBadgeAwardStore(() => ({
    getItem: writable.getItem,
    setItem(key: string, value: string) { if (failWrites) throw new Error('quota'); writable.setItem(key, value); },
  }));
  const session = store.refresh(policy(), evidence([attempt('a', false), attempt('b', false)]));
  assert.equal(session.storageStatus, 'write-error');
  assert.equal(session.events[0].status, 'awarded');
  failWrites = false;
  const recovered = store.refresh(policy(), evidence([attempt('a', false), attempt('b', false)]));
  assert.equal(recovered.storageStatus, 'available');
  assert.equal(recovered.events.length, 1);
  assert.equal(JSON.parse(writable.values.get(BADGE_AWARDS_STORAGE_KEY)!).events.length, 1);
});
