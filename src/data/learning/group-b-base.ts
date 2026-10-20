import type { TopicLearningContent } from '@/src/types/learning.ts';

export type QuestionDraft = {
  objective: 1 | 2;
  prompt: string;
  options: [string, string, string];
  correct: 0 | 1 | 2;
  explanation: string;
};

export type CriterionDraft = {
  id: string;
  outputId: string;
  name: string;
  description: string;
  evidencePrompt: string;
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
};

export const REVIEWED_AT = '2026-10-20';

export function proposedApproval(): TopicLearningContent['quiz']['scoringPolicy']['approval'] {
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
    const evidence = [{
      area: 'question' as const, outcome: 'passed' as const,
      reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
      evidence: 'راجِع المؤلف ارتباط السؤال بهدفه، ومفتاح الإجابة، والتعليل والمشتتات الخاصة بالمجال. مراجعة مالك المقرر المستقلة ما زالت مطلوبة.',
    }];
    return {
      id, version: 1, objectiveId: `${d.slug}-objective-${q.objective}`, prompt: q.prompt,
      options: q.options.map((text, i) => ({ id: `${id}-${String.fromCharCode(97 + i)}`, text })),
      correctOptionId: `${id}-${String.fromCharCode(97 + q.correct)}`,
      explanation: q.explanation, reviewEvidence: evidence,
    };
  });
  const criteria: TopicLearningContent['practicalAssessment']['criteria'] = d.criteria.map((c) => ({
    ...c, id: `${d.slug}-${c.id}`, version: 1,
    reviewEvidence: [{
      area: 'rubric' as const, outcome: 'passed', reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
      evidence: 'تحقق المؤلف من ارتباط المعيار بمخرج محدد ومن أن سؤال الدليل يطلب فحصاً ذاتياً وصفياً لا حكماً مستقلاً على الإتقان.',
    }],
  }));
  const lessonEvidence = {
    area: 'lesson' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT, evidence: d.reviewNote,
  };
  const questionEvidence = {
    area: 'question' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
    evidence: 'راجَع المؤلف مفتاحي الإجابة وتعليل كل سؤال ومطابقتهما للهدف. اعتماد السياسة وقبول المالك لم يُسجلا.',
  };
  const rubricEvidence = {
    area: 'rubric' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
    evidence: 'راجَع المؤلف صلة المعيارين بمخرجات قابلة للفحص؛ التقييم وصفي ذاتي وليس إثباتاً مستقلاً للصحة.',
  };
  const video = d.videos?.[0] ?? videoCandidate;
  return {
    topicSlug: d.slug, contentVersion: 1, reviewState: 'review-ready',
    objectives: d.objectives.map((text, i) => ({ id: `${d.slug}-objective-${i + 1}`, text })),
    sections: d.sections, practicalSteps: d.practicalSteps, workedExamples: [d.workedExample],
    candidateVideos: d.videos ?? (video ? [video] : []),
    quiz: {
      id: `${d.slug}-objective-quiz`, version: 1, title: 'فحص أهداف الدرس',
      instructions: 'أجب بعد القراءة. النتيجة تقيس المفاهيم فقط ولا تثبت تنفيذ المشروع.',
      questions,
      scoringPolicy: {
        id: `${d.slug}-quiz-scoring`, version: 1,
        correctAnswerPoints: 1, incorrectAnswerPoints: 0, unansweredAnswerPoints: 0,
        retryPolicy: 'unlimited', feedbackTiming: 'after-submit', retainedAttempts: 'all',
        summary: 'اقتراح قيد قرار مالك المقرر: نقطة للإجابة الصحيحة، وإعادة المحاولة متاحة، مع حفظ المحاولات منفصلة.',
        approval: proposedApproval(),
      },
      reviewEvidence: [questionEvidence],
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
        summary: 'مقياس وصفي ذاتي بلا حد إتقان أو تحقق مستقل.',
        approval: proposedApproval(),
      },
      criteria, reviewEvidence: [rubricEvidence],
    },
    reviewEvidence: [lessonEvidence, questionEvidence, rubricEvidence, {
      area: 'video', outcome: 'not-run',
      evidence: video
        ? `بحث المؤلف في مصدر الناشر ورشّح “${video.title}” لموضوع الدرس؛ مصدر المطابقة مذكور في دليل المورد. لم يُختبر playback أو captions أو الوصولية أو ملاءمة إصدار الفيديو، ولم يسجل قبول المالك.`
        : 'لم يُعثر على مورد فيديو ملائم بمصدر ناشر مستقل حتى الآن؛ يظل اختيار candidate وفحص المصدر والمقطع ومراجعته المستقلة بوابة مفتوحة.',
      ...(video?.reviewEvidence[0]?.sourceUrl ? { sourceUrl: video.reviewEvidence[0].sourceUrl } : {}),
    }],
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
