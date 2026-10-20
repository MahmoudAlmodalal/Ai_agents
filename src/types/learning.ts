/** Shared curriculum and assessment contract for the 58 stable Topics. */

export type LearningReviewState = 'draft' | 'review-ready' | 'approved';
export type ReviewOutcome = 'not-run' | 'passed' | 'failed';

export interface ReviewEvidence {
  area: 'lesson' | 'question' | 'rubric' | 'video';
  outcome: ReviewOutcome;
  evidence: string;
  reviewer?: string;
  reviewedAt?: string;
  sourceUrl?: string;
}

/** Owner policy approval is intentionally explicit and false in authored content. */
export type PolicyApproval =
  | { state: 'proposed'; approvedBy: null; approvedAt: null; decisionReference: null }
  | { state: 'approved'; approvedBy: string; approvedAt: string; decisionReference: string };

export interface LessonSection {
  id: string;
  heading: string;
  body: string;
}

export interface PracticalStep {
  id: string;
  instruction: string;
  expectedOutput: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  context: string;
  result: string;
  /** BorrowHub is always optional; project examples are preferred. */
  caseStudy?: 'learner-project' | 'borrowhub-optional';
}

export interface CandidateExternalVideo {
  id: string;
  title: string;
  url: string;
  purpose: string;
  availability: 'candidate' | 'available' | 'unavailable';
  approval: PolicyApproval;
  reviewEvidence: ReviewEvidence[];
}

export interface QuizAnswerOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  /** Stable within the stable Topic slug, even when the wording is revised. */
  id: string;
  version: number;
  objectiveId: string;
  prompt: string;
  options: QuizAnswerOption[];
  correctOptionId: string;
  explanation: string;
  reviewEvidence: ReviewEvidence[];
}

export interface QuizScoringPolicyProposal {
  id: string;
  version: number;
  correctAnswerPoints: 1;
  incorrectAnswerPoints: 0;
  unansweredAnswerPoints: 0;
  retryPolicy: 'unlimited';
  feedbackTiming: 'after-submit';
  retainedAttempts: 'all';
  summary: string;
  approval: PolicyApproval;
}

export interface ObjectiveQuiz {
  id: string;
  version: number;
  title: string;
  instructions: string;
  questions: QuizQuestion[];
  scoringPolicy: QuizScoringPolicyProposal;
  reviewEvidence: ReviewEvidence[];
}

export interface RubricLevel {
  id: string;
  label: string;
  description: string;
}

export interface RubricCriterion {
  /** Stable within the stable Topic slug, even when the criterion is revised. */
  id: string;
  version: number;
  outputId: string;
  name: string;
  description: string;
  evidencePrompt: string;
  reviewEvidence: ReviewEvidence[];
}

export interface RubricScaleProposal {
  id: string;
  version: number;
  levels: RubricLevel[];
  /** Self-assessment is descriptive; the scale has no mastery threshold. */
  completionRule: 'no-mastery-threshold';
  summary: string;
  approval: PolicyApproval;
}

export interface PracticalAssessment {
  id: string;
  version: number;
  title: string;
  outputs: Array<{ id: string; description: string }>;
  scale: RubricScaleProposal;
  criteria: RubricCriterion[];
  reviewEvidence: ReviewEvidence[];
}

export interface TopicLearningContent {
  topicSlug: string;
  contentVersion: number;
  reviewState: LearningReviewState;
  objectives: Array<{ id: string; text: string }>;
  sections: LessonSection[];
  practicalSteps: PracticalStep[];
  workedExamples: WorkedExample[];
  candidateVideos: CandidateExternalVideo[];
  quiz: ObjectiveQuiz;
  practicalAssessment: PracticalAssessment;
  reviewEvidence: ReviewEvidence[];
}

export type LearningRecordStorageStatus = 'loading' | 'available' | 'read-error' | 'write-error' | 'invalid';

export interface VersionedAnswer {
  questionId: string;
  questionVersion: number;
  selectedOptionId: string | null;
  correctness: 'correct' | 'incorrect' | 'unanswered';
}

/** Quiz attempts written before owner approval are explicitly review previews. */
export interface QuizAttemptRecord {
  attemptId: string;
  topicSlug: string;
  quizId: string;
  quizVersion: number;
  policyId: string;
  policyVersion: number;
  answers: VersionedAnswer[];
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  maxScore: number;
  submittedAt: string;
  selfCheck: true;
  previewOnly: boolean;
}

export interface VersionedRubricRating {
  criterionId: string;
  criterionVersion: number;
  scaleId: string;
  scaleVersion: number;
  ratingId: string;
  ratedAt: string;
}

export interface PracticalAssessmentRecord {
  topicSlug: string;
  assessmentId: string;
  assessmentVersion: number;
  scaleId: string;
  scaleVersion: number;
  criteria: Array<{ criterionId: string; criterionVersion: number }>;
  ratings: VersionedRubricRating[];
  /** Retired criterion judgments stay inspectable and are never applied to new versions. */
  history: VersionedRubricRating[];
  updatedAt: string;
  selfAssessment: true;
  previewOnly: boolean;
}
