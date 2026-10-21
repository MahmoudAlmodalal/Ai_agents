import type { PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';
import type { BadgeAwardRule, BadgeEvidenceType, BadgePolicy } from '@/src/lib/badgeAwards';
import type { LearningRecordStorageStatus } from '@/src/types/learning';
import type { TopicStorageStatus } from '@/src/lib/topicStorage';

export const BADGE_RULES: BadgeAwardRule[] = [
  {
    id: 'explore-topics',
    version: 1,
    title: 'استكشاف موضوعات',
    threshold: 3,
    evidence: 'recent-topic-list',
    conditionDescription: 'زيارة 3 موضوعات مختلفة على الأقل في هذا المتصفح.',
    evidenceDescription: 'سجل الزيارات الأخيرة المحفوظ محليًا (يحفظ آخر 5 موضوعات زرتها دون توقيت أو مدة قراءة).',
    distinctionNotice: 'نشاط استكشاف وتصفح أخير؛ لا يقيس إتمام القراءة ولا يعتمد مدة زمنية ولا يمنح اعتمادًا أو شهادة.',
  },
  {
    id: 'practice-quizzes',
    version: 1,
    title: 'تجربة الاختبارات',
    threshold: 3,
    evidence: 'quiz-attempts',
    conditionDescription: 'تسجيل 3 محاولات فحص ذاتي موضوعية محفوظة على الأقل.',
    evidenceDescription: 'سجلات محاولات الفحص الذاتي المحفوظة محليًا على هذا الجهاز (المحاولات المكتملة بصرف النظر عن درجتها).',
    distinctionNotice: 'نشاط ممارسة وتدريب ذاتي بصرف النظر عن النتيجة؛ لا يثبت إتقان المادة ولا يمنح اعتمادًا رسميًا.',
  },
  {
    id: 'reflect-on-practice',
    version: 1,
    title: 'مراجعة عملية ذاتية',
    threshold: 3,
    evidence: 'current-self-assessments',
    conditionDescription: 'تسجيل تقييم ذاتي حالي مكتمل بواقع حكم واحد على الأقل لثلاثة موضوعات مختلفة.',
    evidenceDescription: 'سجلات التقييم العملي الذاتي الحالية المحفوظة محليًا في هذا المتصفح.',
    distinctionNotice: 'أحكام ذاتية يصف بها المتعلم مخرجات مشروعه بنفسه؛ لا تمثل تدقيقًا مستقلًا أو اعتمادًا لصحة المخرج.',
  },
];

/** Owner-approved badge award policy accepted 2026-10-20 (docs/edu-review/owner-decision-package-70.md). */
export const BADGE_AWARD_POLICY: BadgePolicy = {
  policyId: 'learner-activity-badges',
  version: 1,
  reviewState: 'approved',
  approval: {
    state: 'approved',
    approvedBy: 'MahmoudAlmodalal (course owner)',
    approvedAt: '2026-10-20T00:00:00.000Z',
    decisionReference: 'docs/edu-review/owner-decision-package-70.md',
  },
  rules: BADGE_RULES,
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
  rule: BadgeAwardRule;
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
  const counts: Record<BadgeEvidenceType, { draft: number; nonPreview: number }> = {
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

  const statuses: Record<BadgeEvidenceType, TopicStorageStatus | LearningRecordStorageStatus> = {
    'recent-topic-list': evidence.recentlyViewedStatus ?? 'available',
    'quiz-attempts': evidence.quizAttemptsStatus ?? 'available',
    'current-self-assessments': evidence.practicalAssessmentsStatus ?? 'available',
  };

  return BADGE_RULES.map((rule) => {
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
