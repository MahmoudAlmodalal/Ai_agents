import {
  CandidateExternalVideo,
  PolicyApproval,
  QuizQuestion,
  ReviewEvidence,
  TopicLearningContent,
} from '@/src/types/learning.ts';
import { getExternalVideoCandidates } from '@/src/data/externalVideoRegistry.ts';

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
};

const proposedApproval: PolicyApproval = {
  state: 'proposed',
  approvedBy: null,
  approvedAt: null,
  decisionReference: null,
};

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

  return {
    topicSlug,
    contentVersion: 1,
    reviewState: 'draft',
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
      instructions: 'اختر الإجابة الأدق ثم اقرأ التفسير. هذه مسودة تدريبية وسياسة التقييم المقترحة لم تعتمد بعد.',
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
        summary: 'مقترح للمراجعة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إظهار التفسير بعد الإرسال والاحتفاظ بالمحاولات. لا يمثل إتقاناً أو نجاحاً رسمياً.',
        approval: { ...proposedApproval },
      },
      reviewEvidence: [
        notRunEvidence('question', 'Draft questions are specific to this Topic; independent review and scoring-policy approval have not run.'),
      ],
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
        summary: 'مقياس وصفي مقترح للتأمل الذاتي فقط؛ لا يحسب إتقاناً ولا يفرض حداً للإكمال.',
        approval: { ...proposedApproval },
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
      reviewEvidence: [
        notRunEvidence('rubric', 'Proposed descriptive self-assessment only; rubric policy has not been approved.'),
      ],
    },
    reviewEvidence: [
      notRunEvidence('lesson', 'Supplemental learning content is a draft. Independent educational review, template approval, and course-owner acceptance are pending.'),
    ],
  };
}

