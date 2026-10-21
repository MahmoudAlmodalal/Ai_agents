import assert from 'node:assert/strict';
import test from 'node:test';
import { BADGE_AWARDS_STORAGE_KEY, createBadgeAwardStore, reconcileBadgeAwards, type BadgeEvidence, type BadgePolicy } from './badgeAwards';
import type { PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';
import { BADGE_AWARD_POLICY } from './dashboardModel';

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

function practicalRecord(topicSlug: string, hasRatings = true, previewOnly = false): PracticalAssessmentRecord {
  return {
    topicSlug,
    assessmentId: 'practical-1',
    assessmentVersion: 1,
    scaleId: 'three-level',
    scaleVersion: 1,
    criteria: [{ criterionId: 'crit-1', criterionVersion: 1 }],
    ratings: hasRatings ? [{ criterionId: 'crit-1', criterionVersion: 1, scaleId: 'three-level', scaleVersion: 1, ratingId: 'ready-for-review', ratedAt: stamp }] : [],
    history: [],
    updatedAt: stamp,
    selfAssessment: true,
    previewOnly,
  };
}

test('BADGE_AWARD_POLICY evaluates empty profile with all rules unearned and zero events', () => {
  const result = reconcileBadgeAwards(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [],
  });
  assert.equal(result.evaluationStatus, 'enabled');
  assert.equal(result.rules.length, 3);
  for (const ruleEval of result.rules) {
    assert.equal(ruleEval.state, 'unearned');
    assert.equal(ruleEval.observedCount, 0);
    assert.equal(ruleEval.threshold, 3);
    assert.equal(ruleEval.activeAward, undefined);
  }
  assert.deepEqual(result.events, []);
});

test('boundary conditions for explore-topics: just below, at, and above threshold, with revocation on drop', () => {
  const backing = memoryStorage();
  const store = createBadgeAwardStore(() => backing);

  // Just below: 2 topics
  const below = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: ['topic-1', 'topic-2'],
    quizAttempts: [],
    practicalAssessments: [],
  });
  const exploreBelow = below.rules.find((r) => r.rule.id === 'explore-topics')!;
  assert.equal(exploreBelow.observedCount, 2);
  assert.equal(exploreBelow.state, 'unearned');
  assert.deepEqual(below.events, []);

  // Exactly at: 3 topics
  const at = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: ['topic-1', 'topic-2', 'topic-3'],
    quizAttempts: [],
    practicalAssessments: [],
  });
  const exploreAt = at.rules.find((r) => r.rule.id === 'explore-topics')!;
  assert.equal(exploreAt.observedCount, 3);
  assert.equal(exploreAt.state, 'awarded');
  assert.equal(at.events.length, 1);
  assert.equal(at.events[0].badgeId, 'explore-topics');
  assert.equal(at.events[0].status, 'awarded');

  // Just above: 4 topics
  const above = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: ['topic-1', 'topic-2', 'topic-3', 'topic-4'],
    quizAttempts: [],
    practicalAssessments: [],
  });
  const exploreAbove = above.rules.find((r) => r.rule.id === 'explore-topics')!;
  assert.equal(exploreAbove.observedCount, 4);
  assert.equal(exploreAbove.state, 'awarded');
  assert.equal(above.events.length, 1); // No duplicate award event

  // Dropped below threshold: 1 topic
  const dropped = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: ['topic-1'],
    quizAttempts: [],
    practicalAssessments: [],
  });
  const exploreDropped = dropped.rules.find((r) => r.rule.id === 'explore-topics')!;
  assert.equal(exploreDropped.observedCount, 1);
  assert.equal(exploreDropped.state, 'unearned');
  assert.equal(dropped.events[0].status, 'revoked');
  assert.equal(dropped.events[0].endReason, 'evidence-below-threshold');

  // Restored: 3 topics
  const restored = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: ['topic-1', 'topic-2', 'topic-3'],
    quizAttempts: [],
    practicalAssessments: [],
  });
  const exploreRestored = restored.rules.find((r) => r.rule.id === 'explore-topics')!;
  assert.equal(exploreRestored.state, 'awarded');
  assert.equal(restored.events.length, 2);
  assert.equal(restored.events[1].status, 'awarded');
});

test('boundary conditions for practice-quizzes: just below, at, and above threshold with preview exclusion and duplicate deduplication', () => {
  const backing = memoryStorage();
  const store = createBadgeAwardStore(() => backing);

  // 3 attempts but all previewOnly -> excluded, observed count 0
  const previewOnlyResult = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [attempt('q1', true), attempt('q2', true), attempt('q3', true)],
    practicalAssessments: [],
  });
  const quizPreview = previewOnlyResult.rules.find((r) => r.rule.id === 'practice-quizzes')!;
  assert.equal(quizPreview.observedCount, 0);
  assert.equal(quizPreview.state, 'unearned');

  // Just below: 2 non-preview attempts
  const below = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [attempt('q1', false), attempt('q2', false)],
    practicalAssessments: [],
  });
  const quizBelow = below.rules.find((r) => r.rule.id === 'practice-quizzes')!;
  assert.equal(quizBelow.observedCount, 2);
  assert.equal(quizBelow.state, 'unearned');

  // Duplicate attemptId does not inflate count
  const duplicate = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [attempt('q1', false), attempt('q1', false), attempt('q2', false)],
    practicalAssessments: [],
  });
  assert.equal(duplicate.rules.find((r) => r.rule.id === 'practice-quizzes')!.observedCount, 2);

  // Exactly at: 3 distinct non-preview attempts
  const at = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [attempt('q1', false), attempt('q2', false), attempt('q3', false)],
    practicalAssessments: [],
  });
  const quizAt = at.rules.find((r) => r.rule.id === 'practice-quizzes')!;
  assert.equal(quizAt.observedCount, 3);
  assert.equal(quizAt.state, 'awarded');

  // Just above: 4 distinct non-preview attempts
  const above = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [attempt('q1', false), attempt('q2', false), attempt('q3', false), attempt('q4', false)],
    practicalAssessments: [],
  });
  const quizAbove = above.rules.find((r) => r.rule.id === 'practice-quizzes')!;
  assert.equal(quizAbove.observedCount, 4);
  assert.equal(quizAbove.state, 'awarded');
});

test('boundary conditions for reflect-on-practice: just below, at, and above threshold with empty ratings exclusion and revocation on drop', () => {
  const backing = memoryStorage();
  const store = createBadgeAwardStore(() => backing);

  // 3 records but with empty ratings -> 0
  const emptyRatingsResult = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [practicalRecord('t1', false), practicalRecord('t2', false), practicalRecord('t3', false)],
  });
  assert.equal(emptyRatingsResult.rules.find((r) => r.rule.id === 'reflect-on-practice')!.observedCount, 0);

  // Just below: 2 topics with ratings
  const below = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [practicalRecord('t1', true), practicalRecord('t2', true)],
  });
  const reflectBelow = below.rules.find((r) => r.rule.id === 'reflect-on-practice')!;
  assert.equal(reflectBelow.observedCount, 2);
  assert.equal(reflectBelow.state, 'unearned');

  // Exactly at: 3 topics with ratings
  const at = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [practicalRecord('t1', true), practicalRecord('t2', true), practicalRecord('t3', true)],
  });
  const reflectAt = at.rules.find((r) => r.rule.id === 'reflect-on-practice')!;
  assert.equal(reflectAt.observedCount, 3);
  assert.equal(reflectAt.state, 'awarded');

  // Just above: 4 topics with ratings
  const above = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [practicalRecord('t1', true), practicalRecord('t2', true), practicalRecord('t3', true), practicalRecord('t4', true)],
  });
  const reflectAbove = above.rules.find((r) => r.rule.id === 'reflect-on-practice')!;
  assert.equal(reflectAbove.observedCount, 4);
  assert.equal(reflectAbove.state, 'awarded');

  // Revocation when one topic cleared
  const cleared = store.refresh(BADGE_AWARD_POLICY, {
    recentlyViewedTopicSlugs: [],
    quizAttempts: [],
    practicalAssessments: [practicalRecord('t1', true), practicalRecord('t2', true), practicalRecord('t3', false)],
  });
  const reflectCleared = cleared.rules.find((r) => r.rule.id === 'reflect-on-practice')!;
  assert.equal(reflectCleared.observedCount, 2);
  assert.equal(reflectCleared.state, 'unearned');
  assert.equal(cleared.events.find((e) => e.badgeId === 'reflect-on-practice')!.status, 'revoked');
});

test('repeated reloads do not duplicate or contradict awards', () => {
  const backing = memoryStorage();
  const store1 = createBadgeAwardStore(() => backing);
  const evidenceData = {
    recentlyViewedTopicSlugs: ['t1', 't2', 't3'],
    quizAttempts: [attempt('q1', false), attempt('q2', false), attempt('q3', false)],
    practicalAssessments: [practicalRecord('t1', true), practicalRecord('t2', true), practicalRecord('t3', true)],
  };

  const firstPass = store1.refresh(BADGE_AWARD_POLICY, evidenceData);
  assert.equal(firstPass.events.length, 3);
  assert.ok(firstPass.rules.every((r) => r.state === 'awarded'));

  // Reload 1
  const store2 = createBadgeAwardStore(() => backing);
  const reload1 = store2.refresh(BADGE_AWARD_POLICY, evidenceData);
  assert.equal(reload1.events.length, 3);
  assert.deepEqual(reload1.events.map((e) => e.awardId), firstPass.events.map((e) => e.awardId));
  assert.ok(reload1.rules.every((r) => r.state === 'awarded'));

  // Reload 2
  const store3 = createBadgeAwardStore(() => backing);
  const reload2 = store3.refresh(BADGE_AWARD_POLICY, evidenceData);
  assert.equal(reload2.events.length, 3);
  assert.deepEqual(reload2.events.map((e) => e.awardId), firstPass.events.map((e) => e.awardId));
  assert.ok(reload2.rules.every((r) => r.state === 'awarded'));
});
