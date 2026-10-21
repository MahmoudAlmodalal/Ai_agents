import type { CandidateExternalVideo, PolicyApproval } from '@/src/types/learning';

/** All owner-approved behavior uses the same audit-evidence gate. */
export function isPolicyApproved(value: unknown): value is Extract<PolicyApproval, { state: 'approved' }> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const approval = value as Record<string, unknown>;
  return approval.state === 'approved'
    && typeof approval.approvedBy === 'string'
    && approval.approvedBy.trim().length > 0
    && typeof approval.approvedAt === 'string'
    && Number.isFinite(Date.parse(approval.approvedAt))
    && typeof approval.decisionReference === 'string'
    && approval.decisionReference.trim().length > 0;
}

type AssessmentEvidenceArea = 'lesson' | 'question' | 'rubric';

interface ReviewEvidenceGroup {
  area: AssessmentEvidenceArea;
  evidence: readonly unknown[];
}

function hasPassedReviewEvidence(value: unknown, expectedArea: AssessmentEvidenceArea): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const evidence = value as Record<string, unknown>;
  return evidence.area === expectedArea
    && evidence.outcome === 'passed'
    && typeof evidence.evidence === 'string'
    && evidence.evidence.trim().length > 0
    && typeof evidence.reviewer === 'string'
    && evidence.reviewer.trim().length > 0
    && typeof evidence.reviewedAt === 'string'
    && Number.isFinite(Date.parse(evidence.reviewedAt));
}

/** Every lesson/question/criterion group needs its own dated, area-matched passing review. */
export function isLearningPolicyEnabled(
  reviewState: string,
  approval: unknown,
  evidenceGroups: readonly ReviewEvidenceGroup[] = [],
): boolean {
  return reviewState === 'approved'
    && isPolicyApproved(approval)
    && Array.isArray(evidenceGroups)
    && evidenceGroups.length >= 3
    && evidenceGroups.every((group) => !!group
      && typeof group === 'object'
      && (group.area === 'lesson' || group.area === 'question' || group.area === 'rubric')
      && Array.isArray(group.evidence)
      && group.evidence.length > 0
      && group.evidence.every((item) => hasPassedReviewEvidence(item, group.area)));
}

export type LearningPolicyWordingState = 'approved' | 'pending' | 'draft';

export function resolvePolicyWordingState(
  reviewState: string,
  approval: unknown,
  evidenceGroups: readonly ReviewEvidenceGroup[] = [],
): LearningPolicyWordingState {
  if (!isPolicyApproved(approval)) {
    return 'draft';
  }
  if (isLearningPolicyEnabled(reviewState, approval, evidenceGroups)) {
    return 'approved';
  }
  return 'pending';
}

export function isExternalVideoApproved(
  video: Pick<CandidateExternalVideo, 'availability' | 'approval' | 'url' | 'acceptanceReview'>,
  topicSlug?: string,
  contentVersion?: number,
): boolean {
  const review = video.acceptanceReview;
  if (video.availability !== 'available' || !isPolicyApproved(video.approval) || !review ||
      !topicSlug || !Number.isInteger(contentVersion)) return false;
  const checklist = review.checklist;
  return review.topicSlug === topicSlug
    && review.contentVersion === contentVersion
    && typeof review.reviewer === 'string' && review.reviewer.trim().length > 0
    && typeof review.reviewedAt === 'string' && Number.isFinite(Date.parse(review.reviewedAt))
    && review.sourceUrl === video.url
    && typeof review.evidence === 'string' && review.evidence.trim().length > 0
    && !!checklist
    && checklist.topicAlignment === 'passed'
    && checklist.educationalSuitability === 'passed'
    && checklist.playback === 'passed'
    && checklist.captions === 'passed'
    && checklist.accessibility === 'passed'
    && checklist.unavailableHandling === 'passed';
}
