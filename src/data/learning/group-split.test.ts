import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { TOPIC_LEARNING_CONTENT } from '@/src/lib/learningContent.ts';
import { getAllTopics } from '@/src/lib/topicRegistry.ts';
import { hashTopicRecord, generateReviewSummaries, TopicReviewAuditSummary } from '@/scripts/learning_content_hashes.ts';
import {
  buildTopic,
  approvedPolicy,
  APPROVED_QUIZ_INSTRUCTIONS,
  APPROVED_QUIZ_SCORING_POLICY_SUMMARY,
  APPROVED_RUBRIC_SCALE_SUMMARY,
  DRAFT_QUIZ_INSTRUCTIONS_GROUP_A,
  DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_A,
  DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_A,
  TopicDraft as GroupATopicDraft,
} from '@/src/data/learning/group-a-common.ts';
import {
  buildTopicB,
  DRAFT_QUIZ_INSTRUCTIONS_GROUP_B,
  DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_B,
  DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_B,
  TopicDraft as GroupBTopicDraft,
} from '@/src/data/learning/group-b-base.ts';
import type { ReviewEvidence } from '@/src/types/learning.ts';

test('group split preserves exact byte-for-byte topic records across all 58 canonical topics', () => {
  const hashManifestPath = path.resolve(process.cwd(), 'src/data/learning/learning-content-hashes.json');
  assert.ok(fs.existsSync(hashManifestPath), 'learning-content-hashes.json must exist');

  const baselineHashes: Record<string, string> = JSON.parse(
    fs.readFileSync(hashManifestPath, 'utf-8')
  );

  const canonicalTopics = getAllTopics();
  assert.equal(canonicalTopics.length, 58, 'Expected 58 canonical topics');

  const canonicalSlugs = new Set(canonicalTopics.map((t) => t.slug));
  const exportedSlugs = new Set(Object.keys(TOPIC_LEARNING_CONTENT));

  assert.equal(canonicalSlugs.size, 58);
  assert.equal(exportedSlugs.size, 58, 'Exported topic set must have exactly 58 slugs');

  // Assert identical slug set (no more, no fewer)
  const missingSlugs = [...canonicalSlugs].filter((s) => !exportedSlugs.has(s));
  const unexpectedSlugs = [...exportedSlugs].filter((s) => !canonicalSlugs.has(s));
  assert.deepEqual(missingSlugs, [], `Missing slugs in exported content: ${missingSlugs.join(', ')}`);
  assert.deepEqual(unexpectedSlugs, [], `Unexpected slugs in exported content: ${unexpectedSlugs.join(', ')}`);

  // Assert exact SHA-256 hash match for all 58 topics
  const mismatched: Array<{ slug: string; baseline: string; current: string }> = [];

  for (const topic of canonicalTopics) {
    const slug = topic.slug;
    const content = TOPIC_LEARNING_CONTENT[slug];
    assert.ok(content, `Missing content for topic: ${slug}`);

    const currentHash = hashTopicRecord(content);
    const expectedHash = baselineHashes[slug];

    assert.ok(expectedHash, `Baseline hash missing for topic: ${slug}`);
    if (currentHash !== expectedHash) {
      mismatched.push({ slug, baseline: expectedHash, current: currentHash });
    }
  }

  assert.deepEqual(
    mismatched,
    [],
    `The following topic records differ from baseline hashes:\n${mismatched.map((m) => `  - ${m.slug}: expected ${m.baseline}, got ${m.current}`).join('\n')}`
  );
});

test('review state, approvals, and review evidence summaries match baseline across all 58 canonical topics', () => {
  const summaryManifestPath = path.resolve(process.cwd(), 'src/data/learning/learning-content-review-summary.json');
  assert.ok(fs.existsSync(summaryManifestPath), 'learning-content-review-summary.json must exist');

  const baselineSummaries: Record<string, TopicReviewAuditSummary> = JSON.parse(
    fs.readFileSync(summaryManifestPath, 'utf-8')
  );

  const currentSummaries = generateReviewSummaries();

  const baselineSlugs = Object.keys(baselineSummaries).sort();
  const currentSlugs = Object.keys(currentSummaries).sort();

  assert.equal(currentSlugs.length, 58, 'Expected 58 canonical topic summaries');
  assert.deepEqual(currentSlugs, baselineSlugs, 'Topic slugs in summary must match baseline');

  const mismatched: string[] = [];

  for (const slug of currentSlugs) {
    const current = currentSummaries[slug];
    const baseline = baselineSummaries[slug];

    assert.ok(baseline, `Missing baseline summary for topic: ${slug}`);

    // Check reviewState
    if (current.reviewState !== baseline.reviewState) {
      mismatched.push(`${slug}: reviewState expected ${baseline.reviewState}, got ${current.reviewState}`);
    }

    // Check quizScoringPolicyApproval
    if (current.quizScoringPolicyApproval.state !== baseline.quizScoringPolicyApproval.state) {
      mismatched.push(`${slug}: quiz policy approval expected ${baseline.quizScoringPolicyApproval.state}, got ${current.quizScoringPolicyApproval.state}`);
    }

    // Check rubricScaleApproval
    if (current.rubricScaleApproval.state !== baseline.rubricScaleApproval.state) {
      mismatched.push(`${slug}: rubric scale approval expected ${baseline.rubricScaleApproval.state}, got ${current.rubricScaleApproval.state}`);
    }

    // Check evidenceSummary
    const currentEvidence = JSON.stringify(current.evidenceSummary);
    const baselineEvidence = JSON.stringify(baseline.evidenceSummary);
    if (currentEvidence !== baselineEvidence) {
      mismatched.push(`${slug}: evidenceSummary differs from baseline`);
    }
  }

  assert.deepEqual(mismatched, [], `The following topic summaries differ from baseline:\n${mismatched.join('\n')}`);
  assert.deepEqual(currentSummaries, baselineSummaries, 'Current review summaries must match baseline exactly');
});

test('buildTopic (Group A) supports per-Topic reviewState, approvals, evidence, and wording overrides', () => {
  const dummyDraft: GroupATopicDraft = {
    topicSlug: 'test-topic-a',
    objectives: [
      { id: 'obj-1', text: 'Objective 1' },
      { id: 'obj-2', text: 'Objective 2' },
    ],
    sections: [
      { heading: 'Sec 1', body: 'Body 1' },
      { heading: 'Sec 2', body: 'Body 2' },
      { heading: 'Sec 3', body: 'Body 3' },
    ],
    practicalSteps: [
      { instruction: 'Step 1', expectedOutput: 'Output 1' },
      { instruction: 'Step 2', expectedOutput: 'Output 2' },
    ],
    workedExample: { title: 'Example', context: 'Context', result: 'Result' },
    outputs: [
      { id: 'out-1', description: 'Output 1' },
      { id: 'out-2', description: 'Output 2' },
    ],
    questions: [
      { id: 'q-1', objectiveId: 'obj-1', prompt: 'P1', options: ['A', 'B', 'C', 'D'], correct: 0, explanation: 'Exp1' },
      { id: 'q-2', objectiveId: 'obj-2', prompt: 'P2', options: ['A', 'B', 'C', 'D'], correct: 1, explanation: 'Exp2' },
    ],
    criteria: [
      { id: 'c-1', outputId: 'out-1', name: 'Crit 1', description: 'Desc 1', evidencePrompt: 'Prompt 1' },
      { id: 'c-2', outputId: 'out-2', name: 'Crit 2', description: 'Desc 2', evidencePrompt: 'Prompt 2' },
    ],
  };

  // 1. Default output with no overrides
  const defaultTopic = buildTopic(dummyDraft);
  assert.equal(defaultTopic.reviewState, 'draft');
  assert.equal(defaultTopic.quiz.scoringPolicy.approval.state, 'proposed');
  assert.equal(defaultTopic.practicalAssessment.scale.approval.state, 'proposed');
  assert.equal(defaultTopic.quiz.instructions, DRAFT_QUIZ_INSTRUCTIONS_GROUP_A);
  assert.equal(defaultTopic.quiz.scoringPolicy.summary, DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_A);
  assert.equal(defaultTopic.practicalAssessment.scale.summary, DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_A);
  assert.equal(defaultTopic.reviewEvidence[0]?.outcome, 'not-run');
  assert.equal(defaultTopic.quiz.reviewEvidence[0]?.outcome, 'not-run');
  assert.equal(defaultTopic.practicalAssessment.reviewEvidence[0]?.outcome, 'not-run');

  // 2. Overrides with approved policies and custom evidence
  const approval = approvedPolicy(
    'Course Owner',
    '2026-10-21',
    'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #52)'
  );
  const customLessonEvidence: ReviewEvidence[] = [
    { area: 'lesson', outcome: 'passed', reviewer: 'pedagogy-expert', reviewedAt: '2026-10-21', evidence: 'Audited.' },
  ];
  const customQuizEvidence: ReviewEvidence[] = [
    { area: 'question', outcome: 'passed', reviewer: 'pedagogy-expert', reviewedAt: '2026-10-21', evidence: 'Audited questions.' },
  ];
  const customRubricEvidence: ReviewEvidence[] = [
    { area: 'rubric', outcome: 'passed', reviewer: 'pedagogy-expert', reviewedAt: '2026-10-21', evidence: 'Audited rubric.' },
  ];

  const approvedTopic = buildTopic({
    ...dummyDraft,
    reviewState: 'approved',
    lessonReviewEvidence: customLessonEvidence,
    quizReviewEvidence: customQuizEvidence,
    rubricReviewEvidence: customRubricEvidence,
    quizScoringPolicyApproval: approval,
    rubricScaleApproval: approval,
  });

  assert.equal(approvedTopic.reviewState, 'approved');
  assert.deepEqual(approvedTopic.reviewEvidence, customLessonEvidence);
  assert.deepEqual(approvedTopic.quiz.reviewEvidence, customQuizEvidence);
  assert.deepEqual(approvedTopic.practicalAssessment.reviewEvidence, customRubricEvidence);
  assert.deepEqual(approvedTopic.quiz.scoringPolicy.approval, approval);
  assert.deepEqual(approvedTopic.practicalAssessment.scale.approval, approval);
  assert.equal(approvedTopic.quiz.instructions, APPROVED_QUIZ_INSTRUCTIONS);
  assert.equal(approvedTopic.quiz.scoringPolicy.summary, APPROVED_QUIZ_SCORING_POLICY_SUMMARY);
  assert.equal(approvedTopic.practicalAssessment.scale.summary, APPROVED_RUBRIC_SCALE_SUMMARY);

  // 3. Custom wording overrides take precedence
  const customWordingTopic = buildTopic({
    ...dummyDraft,
    quizScoringPolicyApproval: approval,
    rubricScaleApproval: approval,
    quizInstructions: 'تعليمات اختبار مخصصة',
    quizScoringPolicySummary: 'ملخص سياسة تقييم مخصص',
    rubricScaleSummary: 'ملخص مقياس مخصص',
  });
  assert.equal(customWordingTopic.quiz.instructions, 'تعليمات اختبار مخصصة');
  assert.equal(customWordingTopic.quiz.scoringPolicy.summary, 'ملخص سياسة تقييم مخصص');
  assert.equal(customWordingTopic.practicalAssessment.scale.summary, 'ملخص مقياس مخصص');
});

test('buildTopicB (Group B) supports per-Topic reviewState, approvals, evidence, and wording overrides', () => {
  const dummyDraft: GroupBTopicDraft = {
    slug: 'test-topic-b',
    objectives: ['Objective 1', 'Objective 2'],
    sections: [
      { id: 's1', heading: 'Sec 1', body: 'Body 1' },
      { id: 's2', heading: 'Sec 2', body: 'Body 2' },
      { id: 's3', heading: 'Sec 3', body: 'Body 3' },
    ],
    practicalSteps: [
      { id: 'p1', instruction: 'Step 1', expectedOutput: 'Output 1' },
      { id: 'p2', instruction: 'Step 2', expectedOutput: 'Output 2' },
    ],
    workedExample: { id: 'w1', title: 'Example', context: 'Context', result: 'Result' },
    outputs: [
      { id: 'out-1', description: 'Output 1' },
      { id: 'out-2', description: 'Output 2' },
    ],
    questions: [
      { objective: 1, prompt: 'P1', options: ['A', 'B', 'C'], correct: 0, explanation: 'Exp1' },
      { objective: 2, prompt: 'P2', options: ['A', 'B', 'C'], correct: 1, explanation: 'Exp2' },
    ],
    criteria: [
      { id: 'c1', outputId: 'out-1', name: 'Crit 1', description: 'Desc 1', evidencePrompt: 'Prompt 1' },
      { id: 'c2', outputId: 'out-2', name: 'Crit 2', description: 'Desc 2', evidencePrompt: 'Prompt 2' },
    ],
    reviewNote: 'Author note for Group B',
  };

  // 1. Default output with no overrides
  const defaultTopic = buildTopicB(dummyDraft, ['q1', 'q2']);
  assert.equal(defaultTopic.reviewState, 'review-ready');
  assert.equal(defaultTopic.quiz.scoringPolicy.approval.state, 'proposed');
  assert.equal(defaultTopic.practicalAssessment.scale.approval.state, 'proposed');
  assert.equal(defaultTopic.quiz.instructions, DRAFT_QUIZ_INSTRUCTIONS_GROUP_B);
  assert.equal(defaultTopic.quiz.scoringPolicy.summary, DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_B);
  assert.equal(defaultTopic.practicalAssessment.scale.summary, DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_B);
  assert.equal(defaultTopic.reviewEvidence.length, 4);

  // 2. Overrides with approved policies and custom evidence
  const approval = approvedPolicy(
    'Course Owner',
    '2026-10-21',
    'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #61)'
  );
  const customLessonEvidence: ReviewEvidence[] = [
    { area: 'lesson', outcome: 'passed', reviewer: 'reviewer-b', reviewedAt: '2026-10-21', evidence: 'Lesson verified.' },
  ];
  const customQuizEvidence: ReviewEvidence[] = [
    { area: 'question', outcome: 'passed', reviewer: 'reviewer-b', reviewedAt: '2026-10-21', evidence: 'Quiz verified.' },
  ];
  const customRubricEvidence: ReviewEvidence[] = [
    { area: 'rubric', outcome: 'passed', reviewer: 'reviewer-b', reviewedAt: '2026-10-21', evidence: 'Rubric verified.' },
  ];

  const approvedTopic = buildTopicB(
    {
      ...dummyDraft,
      reviewState: 'approved',
      lessonReviewEvidence: customLessonEvidence,
      quizReviewEvidence: customQuizEvidence,
      rubricReviewEvidence: customRubricEvidence,
      quizScoringPolicyApproval: approval,
      rubricScaleApproval: approval,
    },
    ['q1', 'q2']
  );

  assert.equal(approvedTopic.reviewState, 'approved');
  assert.deepEqual(approvedTopic.quiz.reviewEvidence, customQuizEvidence);
  assert.deepEqual(approvedTopic.practicalAssessment.reviewEvidence, customRubricEvidence);
  assert.deepEqual(approvedTopic.quiz.scoringPolicy.approval, approval);
  assert.deepEqual(approvedTopic.practicalAssessment.scale.approval, approval);
  assert.equal(approvedTopic.quiz.instructions, APPROVED_QUIZ_INSTRUCTIONS);
  assert.equal(approvedTopic.quiz.scoringPolicy.summary, APPROVED_QUIZ_SCORING_POLICY_SUMMARY);
  assert.equal(approvedTopic.practicalAssessment.scale.summary, APPROVED_RUBRIC_SCALE_SUMMARY);

  // Root review evidence includes custom lesson, quiz, and rubric evidence
  assert.ok(approvedTopic.reviewEvidence.some((e) => e.evidence === 'Lesson verified.'));
  assert.ok(approvedTopic.reviewEvidence.some((e) => e.evidence === 'Quiz verified.'));
  assert.ok(approvedTopic.reviewEvidence.some((e) => e.evidence === 'Rubric verified.'));

  // 3. Custom wording overrides take precedence
  const customWordingTopic = buildTopicB(
    {
      ...dummyDraft,
      quizScoringPolicyApproval: approval,
      rubricScaleApproval: approval,
      quizInstructions: 'تعليمات اختبار ب مخصصة',
      quizScoringPolicySummary: 'ملخص سياسة ب مخصص',
      rubricScaleSummary: 'ملخص مقياس ب مخصص',
    },
    ['q1', 'q2']
  );
  assert.equal(customWordingTopic.quiz.instructions, 'تعليمات اختبار ب مخصصة');
  assert.equal(customWordingTopic.quiz.scoringPolicy.summary, 'ملخص سياسة ب مخصص');
  assert.equal(customWordingTopic.practicalAssessment.scale.summary, 'ملخص مقياس ب مخصص');
});

test('approved policy wording satisfies all domain requirements and makes no mastery claims', () => {
  // 1 point for correct answer
  assert.ok(APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('نقطة للإجابة الصحيحة'));
  assert.ok(APPROVED_QUIZ_INSTRUCTIONS.includes('نقطة للإجابة الصحيحة'));

  // 0 for incorrect or unanswered
  assert.ok(APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('صفر للإجابة الخاطئة أو غير المجابة'));
  assert.ok(APPROVED_QUIZ_INSTRUCTIONS.includes('صفر للإجابة الخاطئة أو غير المجابة'));

  // unlimited retries
  assert.ok(APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('محاولة غير المحدودة') || APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('محاولات غير محدودة'));

  // feedback after submit
  assert.ok(APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('إظهار التفسير بعد الإرسال'));

  // all attempts retained with versions
  assert.ok(APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('الاحتفاظ') && APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('المحاولات') && APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('الإصدارات'));

  // descriptive three-level self-assessment scale with no mastery threshold
  assert.ok(APPROVED_RUBRIC_SCALE_SUMMARY.includes('مقياس وصفي'));
  assert.ok(APPROVED_RUBRIC_SCALE_SUMMARY.includes('مستوياته الثلاثة'));
  assert.ok(APPROVED_RUBRIC_SCALE_SUMMARY.includes('بلا حد إتقان'));

  // must NOT claim mastery, accreditation, or an independently verified result
  assert.ok(APPROVED_QUIZ_SCORING_POLICY_SUMMARY.includes('لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل'));
  assert.ok(APPROVED_QUIZ_INSTRUCTIONS.includes('لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل'));
  assert.ok(APPROVED_RUBRIC_SCALE_SUMMARY.includes('لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل'));
});
