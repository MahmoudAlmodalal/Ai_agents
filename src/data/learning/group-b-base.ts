import type {
  TopicLearningContent,
  LearningReviewState,
  ReviewEvidence,
  PolicyApproval,
} from '@/src/types/learning.ts';
import {
  APPROVED_QUIZ_INSTRUCTIONS,
  APPROVED_QUIZ_SCORING_POLICY_SUMMARY,
  APPROVED_RUBRIC_SCALE_SUMMARY,
  approvedPolicy,
} from '@/src/data/learning/group-a-common.ts';

export type QuestionDraft = {
  objective: 1 | 2;
  prompt: string;
  options: [string, string, string];
  correct: 0 | 1 | 2;
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
  slug: string;
  objectives: [string, string];
  sections: TopicLearningContent['sections'];
  practicalSteps: TopicLearningContent['practicalSteps'];
  workedExample: TopicLearningContent['workedExamples'][number];
  questions: [QuestionDraft, QuestionDraft];
  outputs: TopicLearningContent['practicalAssessment']['outputs'];
  criteria: [CriterionDraft, CriterionDraft];
  videos?: TopicLearningContent['candidateVideos'];
  reviewNote: string;

  /** Per-Topic review state override; defaults to 'review-ready' in Group B. */
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

export const REVIEWED_AT = '2026-10-20';

export const DRAFT_QUIZ_INSTRUCTIONS_GROUP_B =
  'أجب بعد القراءة. النتيجة تقيس المفاهيم فقط ولا تثبت تنفيذ المشروع.';

export const DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_B =
  'اقتراح قيد قرار مالك المقرر: نقطة للإجابة الصحيحة، وإعادة المحاولة متاحة، مع حفظ المحاولات منفصلة.';

export const DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_B =
  'مقياس وصفي ذاتي بلا حد إتقان أو تحقق مستقل.';

export {
  APPROVED_QUIZ_INSTRUCTIONS,
  APPROVED_QUIZ_SCORING_POLICY_SUMMARY,
  APPROVED_RUBRIC_SCALE_SUMMARY,
  approvedPolicy,
};

export function proposedApproval(): PolicyApproval {
  return {
    state: 'proposed',
    approvedBy: null,
    approvedAt: null,
    decisionReference: null,
  };
}

export function buildTopicB(
  d: TopicDraft,
  questionIds: [string, string],
  videoCandidate?: TopicLearningContent['candidateVideos'][number],
): TopicLearningContent {
  const questions: TopicLearningContent['quiz']['questions'] = d.questions.map((q) => {
    const id = `${d.slug}-${questionIds[q.objective - 1]}`;
    const defaultEvidence = [{
      area: 'question' as const, outcome: 'passed' as const,
      reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
      evidence: 'راجِع المؤلف ارتباط السؤال بهدفه، ومفتاح الإجابة، والتعليل والمشتتات الخاصة بالمجال. مراجعة مالك المقرر المستقلة ما زالت مطلوبة.',
    }];
    return {
      id, version: 1, objectiveId: `${d.slug}-objective-${q.objective}`, prompt: q.prompt,
      options: q.options.map((text, i) => ({ id: `${id}-${String.fromCharCode(97 + i)}`, text })),
      correctOptionId: `${id}-${String.fromCharCode(97 + q.correct)}`,
      explanation: q.explanation, reviewEvidence: q.reviewEvidence ?? defaultEvidence,
    };
  });
  const criteria: TopicLearningContent['practicalAssessment']['criteria'] = d.criteria.map((c) => ({
    ...c, id: `${d.slug}-${c.id}`, version: 1,
    reviewEvidence: c.reviewEvidence ?? [{
      area: 'rubric' as const, outcome: 'passed', reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
      evidence: 'تحقق المؤلف من ارتباط المعيار بمخرج محدد ومن أن سؤال الدليل يطلب فحصاً ذاتياً وصفياً لا حكماً مستقلاً على الإتقان.',
    }],
  }));

  const defaultLessonEvidence: ReviewEvidence = {
    area: 'lesson' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT, evidence: d.reviewNote,
  };
  const defaultQuestionEvidence: ReviewEvidence = {
    area: 'question' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
    evidence: 'راجَع المؤلف مفتاحي الإجابة وتعليل كل سؤال ومطابقتهما للهدف. اعتماد السياسة وقبول المالك لم يُسجلا.',
  };
  const defaultRubricEvidence: ReviewEvidence = {
    area: 'rubric' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
    evidence: 'راجَع المؤلف صلة المعيارين بمخرجات قابلة للفحص؛ التقييم وصفي ذاتي وليس إثباتاً مستقلاً للصحة.',
  };

  const lessonEvidence = d.lessonReviewEvidence ?? [defaultLessonEvidence];
  const quizEvidence = d.quizReviewEvidence ?? [defaultQuestionEvidence];
  const rubricEvidence = d.rubricReviewEvidence ?? [defaultRubricEvidence];

  const video = d.videos?.[0] ?? videoCandidate;
  const videoEvidence: ReviewEvidence = {
    area: 'video', outcome: 'not-run',
    evidence: video
      ? `بحث المؤلف في مصدر الناشر ورشّح “${video.title}” لموضوع الدرس؛ مصدر المطابقة مذكور في دليل المورد. لم يُختبر playback أو captions أو الوصولية أو ملاءمة إصدار الفيديو، ولم يسجل قبول المالك.`
      : 'لم يُعثر على مورد فيديو ملائم بمصدر ناشر مستقل حتى الآن؛ يظل اختيار candidate وفحص المصدر والمقطع ومراجعته المستقلة بوابة مفتوحة.',
    ...(video?.reviewEvidence[0]?.sourceUrl ? { sourceUrl: video.reviewEvidence[0].sourceUrl } : {}),
  };

  const quizScoringPolicyApproval = d.quizScoringPolicyApproval ?? proposedApproval();
  const rubricScaleApproval = d.rubricScaleApproval ?? proposedApproval();

  const isQuizApproved = quizScoringPolicyApproval.state === 'approved';
  const isRubricApproved = rubricScaleApproval.state === 'approved';

  const quizInstructions = d.quizInstructions ?? (
    isQuizApproved ? APPROVED_QUIZ_INSTRUCTIONS : DRAFT_QUIZ_INSTRUCTIONS_GROUP_B
  );

  const quizScoringPolicySummary = d.quizScoringPolicySummary ?? (
    isQuizApproved ? APPROVED_QUIZ_SCORING_POLICY_SUMMARY : DRAFT_QUIZ_SCORING_POLICY_SUMMARY_GROUP_B
  );

  const rubricScaleSummary = d.rubricScaleSummary ?? (
    isRubricApproved ? APPROVED_RUBRIC_SCALE_SUMMARY : DRAFT_RUBRIC_SCALE_SUMMARY_GROUP_B
  );

  const rootEvidence = [
    ...lessonEvidence,
    ...quizEvidence,
    ...rubricEvidence,
    videoEvidence,
  ];

  return {
    topicSlug: d.slug, contentVersion: 1, reviewState: d.reviewState ?? 'review-ready',
    objectives: d.objectives.map((text, i) => ({ id: `${d.slug}-objective-${i + 1}`, text })),
    sections: d.sections, practicalSteps: d.practicalSteps, workedExamples: [d.workedExample],
    candidateVideos: d.videos ?? (video ? [video] : []),
    quiz: {
      id: `${d.slug}-objective-quiz`, version: 1, title: 'فحص أهداف الدرس',
      instructions: quizInstructions,
      questions,
      scoringPolicy: {
        id: `${d.slug}-quiz-scoring`, version: 1,
        correctAnswerPoints: 1, incorrectAnswerPoints: 0, unansweredAnswerPoints: 0,
        retryPolicy: 'unlimited', feedbackTiming: 'after-submit', retainedAttempts: 'all',
        summary: quizScoringPolicySummary,
        approval: { ...quizScoringPolicyApproval },
      },
      reviewEvidence: quizEvidence,
    },
    practicalAssessment: {
      id: `${d.slug}-practical-assessment`, version: 1, title: 'راجع مخرجات مشروعك',
      outputs: d.outputs,
      scale: {
        id: `${d.slug}-descriptive-scale`, version: 1,
        levels: [
          { id: 'not-yet', label: 'لم أبدأ بعد', description: 'لم أبدأ هذا المخرج أو لم أرفق دليلاً بعد.' },
          { id: 'in-progress', label: 'قيد العمل', description: 'بدأت المخرج وما زالت أجزاء محددة تحتاج إكمالاً.' },
          { id: 'ready-for-review', label: 'جاهز للمراجعة', description: 'أرفقت المخرج ودليلاً وحددت أسئلة أو قيوداً للمراجع؛ لا يعني اجتيازاً أو إتقاناً.' },
        ],
        completionRule: 'no-mastery-threshold',
        summary: rubricScaleSummary,
        approval: { ...rubricScaleApproval },
      },
      criteria, reviewEvidence: rubricEvidence,
    },
    reviewEvidence: rootEvidence,
  };
}

export function buildGroupB(
  drafts: Record<string, TopicDraft>,
  questionIdsMap: Record<string, [string, string]>,
  videoCandidatesMap: Record<string, TopicLearningContent['candidateVideos'][number]>,
): Record<string, TopicLearningContent> {
  const result: Record<string, TopicLearningContent> = {};
  for (const [slug, draft] of Object.entries(drafts)) {
    result[slug] = buildTopicB(draft, questionIdsMap[slug], videoCandidatesMap[slug]);
  }
  return result;
}
