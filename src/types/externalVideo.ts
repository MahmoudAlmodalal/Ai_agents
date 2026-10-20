import { CandidateExternalVideo } from '@/src/types/learning.ts';
import { isExternalVideoApproved } from '@/src/lib/learningPolicy.ts';

/** A resource is actionable only after both link availability and owner approval. */
export type ExternalVideoDisplayState = 'missing' | 'candidate' | 'approved' | 'unavailable';

export function isApprovedExternalVideo(video: CandidateExternalVideo): boolean {
  return isExternalVideoApproved(video);
}

export function getExternalVideoDisplayState(
  video: CandidateExternalVideo | undefined,
): ExternalVideoDisplayState {
  if (!video) return 'missing';
  if (video.availability === 'unavailable') return 'unavailable';
  return isApprovedExternalVideo(video) ? 'approved' : 'candidate';
}
