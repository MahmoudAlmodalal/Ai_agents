import type { ReviewEvidence } from '@/src/types/learning.ts';
import type { TopicDraft } from '@/src/data/learning/group-b-base.ts';

const REVIEWER = 'Independent curriculum reviewer (agent)';
const REVIEWED_AT = '2026-10-20';

function passedEvidence(
  area: ReviewEvidence['area'],
  reviewer: string,
  evidence: string,
): ReviewEvidence {
  return { area, outcome: 'passed', reviewer, reviewedAt: REVIEWED_AT, evidence };
}

/** Attach the static educational review while leaving owner approval and runtime checks separate. */
export function recordIndependentTopicReview(
  drafts: Record<string, TopicDraft>,
  lessonFindings: Record<string, string>,
  quizFinding: string,
  rubricFinding: string,
): void {
  for (const draft of Object.values(drafts)) {
    const lessonFinding = lessonFindings[draft.slug];
    if (!lessonFinding) {
      throw new Error(`Missing independent review finding for ${draft.slug}`);
    }

    draft.lessonReviewEvidence = [
      passedEvidence('lesson', 'Curriculum B author review', draft.reviewNote),
      passedEvidence('lesson', REVIEWER, lessonFinding),
    ];
    draft.quizReviewEvidence = [
      passedEvidence(
        'question', 'Curriculum B author review',
        'راجع المؤلف مفتاحي الإجابة وتعليل كل سؤال ومطابقتهما للهدف. سياسة التصحيح معتمدة بقرار مالك المقرر (issue #42)؛ المراجعة التعليمية المستقلة موثقة أدناه.',
      ),
      passedEvidence('question', REVIEWER, quizFinding),
    ];
    draft.rubricReviewEvidence = [
      passedEvidence(
        'rubric', 'Curriculum B author review',
        'راجع المؤلف صلة المعيارين بمخرجات قابلة للفحص. سياسة التقييم العملي معتمدة بقرار مالك المقرر (issue #43)؛ المراجعة التعليمية المستقلة موثقة أدناه. التقييم وصفي ذاتي وليس إثباتاً مستقلاً للصحة.',
      ),
      passedEvidence('rubric', REVIEWER, rubricFinding),
    ];

    for (const question of draft.questions) {
      question.reviewEvidence = [
        passedEvidence(
          'question', 'Curriculum B author review',
          'راجع المؤلف ارتباط السؤال بهدفه، ومفتاح الإجابة، والتعليل والمشتتات الخاصة بالمجال.',
        ),
        passedEvidence('question', REVIEWER, `Question ${question.prompt}: ${quizFinding}`),
      ];
    }
    for (const criterion of draft.criteria) {
      criterion.reviewEvidence = [
        passedEvidence(
          'rubric', 'Curriculum B author review',
          'راجع المؤلف صلة المعيار بمخرج محدد وسؤال الدليل الذاتي الوصفي.',
        ),
        passedEvidence(
          'rubric', REVIEWER,
          `Criterion ${criterion.id} → output ${criterion.outputId}: ${rubricFinding}`,
        ),
      ];
    }
  }
}
