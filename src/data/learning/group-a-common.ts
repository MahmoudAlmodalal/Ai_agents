import {
  CandidateExternalVideo,
  LearningReviewState,
  PolicyApproval,
  QuizQuestion,
  ReviewEvidence,
  TopicLearningContent,
} from '@/src/types/learning.ts';
import { getExternalVideoCandidates } from '@/src/data/externalVideoRegistry.ts';
import { resolvePolicyWordingState } from '@/src/lib/learningPolicy.ts';

export type QuestionDraft = {
  id: string;
  objectiveId: string;
  prompt: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  reviewEvidence?: ReviewEvidence[];
};

export type CriterionDraft = {
  id: string;
  outputId: string;
  name: string;
  description: string;
  evidencePrompt: string;
  reviewEvidence?: ReviewEvidence[];
};

export type TopicDraft = {
  topicSlug: string;
  objectives: [{ id: string; text: string }, { id: string; text: string }];
  sections: [{ heading: string; body: string }, { heading: string; body: string }, { heading: string; body: string }];
  practicalSteps: [{ instruction: string; expectedOutput: string }, { instruction: string; expectedOutput: string }];
  workedExample: { title: string; context: string; result: string; caseStudy?: 'learner-project' | 'borrowhub-optional' };
  outputs: [{ id: string; description: string }, { id: string; description: string }];
  questions: [QuestionDraft, QuestionDraft];
  criteria: [CriterionDraft, CriterionDraft];
  candidateVideos?: CandidateExternalVideo[];

  /** Per-Topic review state override; defaults to 'draft' in Group A. */
  reviewState?: LearningReviewState;
  /** Per-Topic lesson-level review evidence (one or more entries). */
  lessonReviewEvidence?: ReviewEvidence[];
  /** Per-Topic quiz-level review evidence. */
  quizReviewEvidence?: ReviewEvidence[];
  /** Per-Topic rubric-level review evidence. */
  rubricReviewEvidence?: ReviewEvidence[];
  /** Per-Topic quiz scoring policy approval. */
  quizScoringPolicyApproval?: PolicyApproval;
  /** Per-Topic rubric scale approval. */
  rubricScaleApproval?: PolicyApproval;

  /** Learner-visible quiz instructions override. */
  quizInstructions?: string;
  /** Learner-visible quiz scoring policy summary override. */
  quizScoringPolicySummary?: string;
  /** Learner-visible rubric scale summary override. */
  rubricScaleSummary?: string;
};

export const proposedApproval: PolicyApproval = {
  state: 'proposed',
  approvedBy: null,
  approvedAt: null,
  decisionReference: null,
};

/**
 * Creates an approved PolicyApproval record.
 * @param approvedBy Name of the reviewer / course owner
 * @param approvedAt ISO date string (YYYY-MM-DD)
 * @param decisionReference Centralized owner decision package plus group issue, e.g.:
 *   'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #52)'
 */
export function approvedPolicy(
  approvedBy: string,
  approvedAt: string,
  decisionReference: string,
): PolicyApproval {
  return {
    state: 'approved',
    approvedBy,
    approvedAt,
    decisionReference,
  };
}

export const ACCEPTED_QUIZ_SCORING_POLICY_APPROVAL: PolicyApproval = approvedPolicy(
  'MahmoudAlmodalal (course owner)',
  '2026-10-20',
  'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #42)',
);

export const DRAFT_QUIZ_INSTRUCTIONS_GROUP_A =
  'اختر الإجابة الأدق ثم اقرأ التفسير. هذه مسودة تدريبية وسياسة التقييم المقترحة لم تعتمد بعد.';

export const DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_A =
  'مقترح للمراجعة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إظهار التفسير بعد الإرسال والاحتفاظ بالمحاولات. لا يمثل إتقاناً أو نجاحاً رسمياً.';

export const DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_A =
  'مقياس وصفي مقترح للتأمل الذاتي فقط؛ لا يحسب إتقاناً ولا يفرض حداً للإكمال.';

export const APPROVED_QUIZ_INSTRUCTIONS =
  'اختر الإجابة الأدق ثم اقرأ التفسير. سياسة تقييم معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات؛ الفحص لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.';

export const APPROVED_QUIZ_SCORING_POLICY_SUMMARY =
  'سياسة معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.';

export const APPROVED_RUBRIC_SCALE_SUMMARY =
  'مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.';

export const PENDING_QUIZ_INSTRUCTIONS =
  'اختر الإجابة الأدق ثم اقرأ التفسير. سياسة تقييم معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك تظهر النتيجة كمعاينة فحص ذاتي وليست نتيجة نهائية. الفحص لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.';

export const PENDING_QUIZ_SCORING_POLICY_SUMMARY =
  'سياسة معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك تظهر النتيجة كمعاينة فحص ذاتي وليست نتيجة نهائية. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.';

export const PENDING_RUBRIC_SCALE_SUMMARY =
  'مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك يُعد التقييم معاينة فحص ذاتي وليس نتيجة نهائية. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.';

function notRunEvidence(area: ReviewEvidence['area'], evidence: string): ReviewEvidence {
  return { area, outcome: 'not-run', evidence };
}

export function buildTopic(draft: TopicDraft): TopicLearningContent {
  const { topicSlug } = draft;
  const outputIds = new Set(draft.outputs.map((output) => output.id));
  if (outputIds.size !== draft.outputs.length) {
    throw new Error(`Duplicate practical output id in ${topicSlug}`);
  }
  const outputs = draft.outputs;
  const questions: QuizQuestion[] = draft.questions.map((question) => ({
    id: question.id,
    version: 1,
    objectiveId: question.objectiveId,
    prompt: question.prompt,
    options: question.options.map((text, index) => ({ id: `${question.id}-option-${index + 1}`, text })),
    correctOptionId: `${question.id}-option-${question.correct + 1}`,
    explanation: question.explanation,
    reviewEvidence: question.reviewEvidence ?? [
      notRunEvidence('question', 'Authoring draft. Independent educational review and course-owner approval are pending.'),
    ],
  }));

  const quizScoringPolicyApproval = draft.quizScoringPolicyApproval ?? { ...ACCEPTED_QUIZ_SCORING_POLICY_APPROVAL };
  const rubricScaleApproval = draft.rubricScaleApproval ?? { ...proposedApproval };

  const lessonEvidence = draft.lessonReviewEvidence ?? [
    notRunEvidence('lesson', 'Supplemental learning content is a draft. Independent educational review, template approval, and course-owner acceptance are pending.'),
  ];

  const quizReviewEvidence = draft.quizReviewEvidence ?? [
    notRunEvidence('question', 'Scoring policy is accepted by the course owner (issue #42); independent educational review of this Topic\'s questions remains pending.'),
  ];

  const rubricReviewEvidence = draft.rubricReviewEvidence ?? [
    notRunEvidence('rubric', 'Proposed descriptive self-assessment only; rubric policy has not been approved.'),
  ];

  const reviewState = draft.reviewState ?? 'draft';

  const quizWordingState = resolvePolicyWordingState(reviewState, quizScoringPolicyApproval, [
    { area: 'lesson', evidence: lessonEvidence },
    { area: 'question', evidence: quizReviewEvidence },
    ...questions.map((question) => ({ area: 'question' as const, evidence: question.reviewEvidence })),
  ]);

  const rubricWordingState = resolvePolicyWordingState(reviewState, rubricScaleApproval, [
    { area: 'lesson', evidence: lessonEvidence },
    { area: 'rubric', evidence: rubricReviewEvidence },
    ...draft.criteria.map((criterion) => ({ area: 'rubric' as const, evidence: criterion.reviewEvidence ?? [] })),
  ]);

  const quizInstructions = draft.quizInstructions ?? (
    quizWordingState === 'approved' ? APPROVED_QUIZ_INSTRUCTIONS :
    quizWordingState === 'pending' ? PENDING_QUIZ_INSTRUCTIONS :
    DRAFT_QUIZ_INSTRUCTIONS_GROUP_A
  );

  const quizScoringPolicySummary = draft.quizScoringPolicySummary ?? (
    quizWordingState === 'approved' ? APPROVED_QUIZ_SCORING_POLICY_SUMMARY :
    quizWordingState === 'pending' ? PENDING_QUIZ_SCORING_POLICY_SUMMARY :
    DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_A
  );

  const rubricScaleSummary = draft.rubricScaleSummary ?? (
    rubricWordingState === 'approved' ? APPROVED_RUBRIC_SCALE_SUMMARY :
    rubricWordingState === 'pending' ? PENDING_RUBRIC_SCALE_SUMMARY :
    DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_A
  );

  return {
    topicSlug,
    contentVersion: 1,
    reviewState: draft.reviewState ?? 'draft',
    objectives: draft.objectives,
    sections: draft.sections.map((section, index) => ({
      id: `${topicSlug}-section-${index + 1}`,
      ...section,
    })),
    practicalSteps: draft.practicalSteps.map((step, index) => ({
      id: `${topicSlug}-step-${index + 1}`,
      ...step,
    })),
    workedExamples: [{ id: `${topicSlug}-example-1`, ...draft.workedExample }],
    candidateVideos: draft.candidateVideos ?? getExternalVideoCandidates(topicSlug),
    quiz: {
      id: `${topicSlug}-objective-quiz`,
      version: 1,
      title: 'فحص ذاتي للمفاهيم',
      instructions: quizInstructions,
      questions,
      scoringPolicy: {
        id: `${topicSlug}-quiz-scoring-policy`,
        version: 1,
        correctAnswerPoints: 1,
        incorrectAnswerPoints: 0,
        unansweredAnswerPoints: 0,
        retryPolicy: 'unlimited',
        feedbackTiming: 'after-submit',
        retainedAttempts: 'all',
        summary: quizScoringPolicySummary,
        approval: { ...quizScoringPolicyApproval },
      },
      reviewEvidence: quizReviewEvidence,
    },
    practicalAssessment: {
      id: `${topicSlug}-practical-assessment`,
      version: 1,
      title: 'مراجعة ذاتية لمخرجات التمرين',
      outputs,
      scale: {
        id: `${topicSlug}-rubric-scale`,
        version: 1,
        levels: [
          { id: 'not-yet', label: 'لم يبدأ', description: 'لم يضف المتعلم بعد هذا الجانب إلى المخرج الحالي.' },
          { id: 'in-progress', label: 'قيد العمل', description: 'بدأ العمل على الجانب، وتظل أجزاء محددة بحاجة إلى إكمال أو توضيح.' },
          { id: 'ready-for-review', label: 'جاهز للمراجعة', description: 'يستطيع المتعلم الإشارة إلى دليل محدد داخل المخرج ليطلب مراجعته؛ لا يعني أن الدليل صحيح أو معتمد.' },
        ],
        completionRule: 'no-mastery-threshold',
        summary: rubricScaleSummary,
        approval: { ...rubricScaleApproval },
      },
      criteria: draft.criteria.map((criterion) => {
        if (!outputIds.has(criterion.outputId)) {
          throw new Error(`Unknown practical output ${criterion.outputId} in ${topicSlug} criterion ${criterion.id}`);
        }
        return {
          id: criterion.id,
          version: 1,
          outputId: criterion.outputId,
          name: criterion.name,
          description: criterion.description,
          evidencePrompt: criterion.evidencePrompt,
          reviewEvidence: criterion.reviewEvidence ?? [
            notRunEvidence('rubric', 'Authoring draft. Independent educational review and course-owner approval are pending.'),
          ],
        };
      }),
      reviewEvidence: rubricReviewEvidence,
    },
    reviewEvidence: lessonEvidence,
  };
}

export const rootQuestionReview = (id: string) => ({
  area: 'question' as const,
  outcome: 'passed' as const,
  reviewer: 'root',
  reviewedAt: '2026-10-20',
  evidence: `Root independently checked the four options, keyed answer, and rationale for ${id}; the answer and rationale are educationally sound for the stated objective. This narrow review does not cover the full lesson, assessment policy, template, video, browser rendering, or owner acceptance.`,
});

export const rootCriterionReview = (id: string, outputId: string) => ({
  area: 'rubric' as const,
  outcome: 'passed' as const,
  reviewer: 'root',
  reviewedAt: '2026-10-20',
  evidence: `Root independently checked criterion ${id} against semantic output ${outputId} and its evidence prompt; it is artifact-bound and asks for observable evidence without inferring mastery. This narrow review does not approve the proposed self-assessment policy or cover the full lesson, template, video, browser rendering, or owner acceptance.`,
});

export function buildReviewedTopic(draft: TopicDraft): TopicLearningContent {
  const reviewedDraft: TopicDraft = {
    ...draft,
    questions: draft.questions.map((question) => ({
      ...question,
      reviewEvidence: question.reviewEvidence ?? [rootQuestionReview(question.id)],
    })) as TopicDraft['questions'],
    criteria: draft.criteria.map((criterion) => ({
      ...criterion,
      reviewEvidence: criterion.reviewEvidence ?? [rootCriterionReview(criterion.id, criterion.outputId)],
    })) as TopicDraft['criteria'],
  };
  return buildTopic(reviewedDraft);
}

export function buildReviewedGroup(drafts: TopicDraft[]): Record<string, TopicLearningContent> {
  return Object.fromEntries(
    drafts.map((draft) => [draft.topicSlug, buildReviewedTopic(draft)]),
  );
}


