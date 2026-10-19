export type EducationalReviewVerdict = 'passed' | 'failed' | 'not-run' | 'pending';

export interface EducationalReviewRecord {
  verdict: EducationalReviewVerdict;
  reviewedAt?: string;
  reviewer?: string;
  evidenceNotes?: string;
}

export interface LessonTemplateCompliance {
  complete: boolean;
  hasApprovedTemplate: boolean;
  hasRequiredSections: boolean;
  hasPracticalSteps: boolean;
  hasExpectedOutputs: boolean;
  hasChecklist: boolean;
  evidenceNotes?: string;
}

export interface ProposedGroupRecord {
  id: string; // e.g. 'group-01'
  number: string; // '01'
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  topicSlugs: string[];
  isProposedFirstGroup?: boolean;
  groupBoundariesApproved: boolean; // Course-owner approval of group boundaries
  templateApproved: boolean; // Course-owner approval of lesson template
}

export type ContentAvailabilityStatus = 'available' | 'in-progress' | 'unknown';
export type GroupImprovementStatus = 'improved' | 'pending-review' | 'not-applicable';

export interface GroupStatusPresentation {
  groupId: string;
  groupNumber: string;
  isFirstGroupProposal: boolean;
  boundaryStatusLabel: string;
  improvementStatus: GroupImprovementStatus;
  improvementStatusLabel: string;
}

export interface TopicImprovementStatus {
  slug: string;
  isKnownTopic: boolean;
  contentAvailability: ContentAvailabilityStatus;
  availabilityLabel: string;
  improvementStatus: GroupImprovementStatus;
  improvementLabel: string;
  group?: ProposedGroupRecord;
  isFirstGroupProposal: boolean;
  groupProposalLabel: string;
  boundariesApproved: boolean;
  templateApproved: boolean;
  reviewVerdict: EducationalReviewVerdict;
}
