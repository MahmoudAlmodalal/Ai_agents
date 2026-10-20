import type { PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';
import type { BadgePolicy } from '@/src/lib/badgeAwards';
import type { LearningRecordStorageStatus } from '@/src/types/learning';
import type { TopicStorageStatus } from '@/src/lib/topicStorage';

export interface DraftBadgeRule {
  id: string;
  version: 'proposal-1';
  title: string;
  explanation: string;
  threshold: number;
  evidence: 'recent-topic-list' | 'quiz-attempts' | 'current-self-assessments';
}

/** Candidate rules are deliberately activity based. They are previews only until approved. */
export const BADGE_RULE_PROPOSALS: DraftBadgeRule[] = [
  {
    id: 'explore-topics',
    version: 'proposal-1',
    title: 'استكشاف موضوعات',
    explanation: 'ثلاثة موضوعات مختلفة على الأقل ضمن قائمة الموضوعات التي زرتها مؤخرًا. القائمة الحالية تحفظ آخر خمسة فقط ولا تمثل سجلًا كاملًا.',
    threshold: 3,
    evidence: 'recent-topic-list',
  },
  {
    id: 'practice-quizzes',
    version: 'proposal-1',
    title: 'تجربة الاختبارات',
    explanation: 'ثلاث محاولات اختبار محفوظة على الأقل، بصرف النظر عن الدرجة. هذا يقيس الممارسة المسجلة ولا يثبت الإتقان.',
    threshold: 3,
    evidence: 'quiz-attempts',
  },
  {
    id: 'reflect-on-practice',
    version: 'proposal-1',
    title: 'مراجعة عملية ذاتية',
    explanation: 'تقييم ذاتي حالي محفوظ لثلاثة موضوعات مختلفة على الأقل. هذه أحكام المتعلم على عمله وليست تحققًا مستقلًا.',
    threshold: 3,
    evidence: 'current-self-assessments',
  },
];

/** The shipping policy remains closed until the course owner records an audited approval. */
export const BADGE_AWARD_POLICY_PROPOSAL: BadgePolicy = {
  policyId: 'learner-activity-badges',
  version: 1,
  reviewState: 'draft',
  approval: { state: 'proposed', approvedBy: null, approvedAt: null, decisionReference: null },
  rules: BADGE_RULE_PROPOSALS.map((rule) => ({
    id: rule.id,
    version: 1,
    title: rule.title,
    threshold: rule.threshold,
    evidence: rule.evidence,
  })),
};

export interface BadgeDraftEvidence {
  recentlyViewedTopicSlugs: string[];
  quizAttempts: QuizAttemptRecord[];
  practicalAssessments: PracticalAssessmentRecord[];
  recentlyViewedStatus?: TopicStorageStatus;
  quizAttemptsStatus?: LearningRecordStorageStatus;
  practicalAssessmentsStatus?: LearningRecordStorageStatus;
}

export interface BadgeDraftPreview {
  rule: DraftBadgeRule;
  observedCount: number;
  draftConditionMet: boolean;
  evidenceConfirmed: boolean;
  evidenceStatus: TopicStorageStatus | LearningRecordStorageStatus;
  nonPreviewEvidenceCount: number;
  resultLabel: string;
}

export function previewBadgeRules(evidence: BadgeDraftEvidence): BadgeDraftPreview[] {
  const distinctQuizAttempts = new Map<string, QuizAttemptRecord>();
  for (const attempt of evidence.quizAttempts) {
    if (!attempt.selfCheck) continue;
    distinctQuizAttempts.set(`${attempt.topicSlug}:${attempt.quizId}:${attempt.quizVersion}:${attempt.attemptId}`, attempt);
  }
  const distinctCurrentAssessmentTopics = new Set(
    evidence.practicalAssessments
      .filter((record) => record.selfAssessment && record.ratings.length > 0)
      .map((record) => record.topicSlug),
  );
  const counts: Record<DraftBadgeRule['evidence'], { draft: number; nonPreview: number }> = {
    'recent-topic-list': {
      draft: new Set(evidence.recentlyViewedTopicSlugs).size,
      // Reading records have no owner-approved completion policy; none is an award record.
      nonPreview: 0,
    },
    'quiz-attempts': {
      draft: distinctQuizAttempts.size,
      nonPreview: [...distinctQuizAttempts.values()].filter((record) => !record.previewOnly).length,
    },
    'current-self-assessments': {
      draft: distinctCurrentAssessmentTopics.size,
      nonPreview: new Set(evidence.practicalAssessments
        .filter((record) => record.selfAssessment && !record.previewOnly && record.ratings.length > 0)
        .map((record) => record.topicSlug)).size,
    },
  };

  const statuses: Record<DraftBadgeRule['evidence'], TopicStorageStatus | LearningRecordStorageStatus> = {
    'recent-topic-list': evidence.recentlyViewedStatus ?? 'available',
    'quiz-attempts': evidence.quizAttemptsStatus ?? 'available',
    'current-self-assessments': evidence.practicalAssessmentsStatus ?? 'available',
  };

  return BADGE_RULE_PROPOSALS.map((rule) => {
    const { draft, nonPreview } = counts[rule.evidence];
    const draftConditionMet = draft >= rule.threshold;
    const evidenceStatus = statuses[rule.evidence];
    const evidenceConfirmed = evidenceStatus === 'available';
    return {
      rule,
      observedCount: draft,
      draftConditionMet,
      evidenceConfirmed,
      evidenceStatus,
      nonPreviewEvidenceCount: nonPreview,
      resultLabel: !evidenceConfirmed
        ? 'تعذر تأكيد الأدلة المحلية؛ نتيجة الشروط غير مؤكدة'
        : draftConditionMet ? 'تتحقق شروط المسودة؛ لا توجد شارة ممنوحة' : 'لم تتحقق شروط المسودة؛ لا توجد شارة ممنوحة',
    };
  });
}

/** Only future, explicitly approved evaluation may consume records returned here. */
export function getNonPreviewBadgeEvidence(evidence: BadgeDraftEvidence) {
  return {
    quizAttempts: evidence.quizAttempts.filter((record) => !record.previewOnly),
    practicalAssessments: evidence.practicalAssessments.filter((record) => !record.previewOnly),
    readingTopicSlugs: [] as string[],
  };
}
