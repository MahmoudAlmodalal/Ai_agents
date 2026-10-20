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

export function getExternalSourceLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('atlassian.com')) return 'Atlassian';
    if (host.includes('figma.com')) return 'Figma';
    if (host.includes('nngroup.com')) return 'Nielsen Norman Group';
    if (host.includes('uni-hamburg.de')) return 'Universität Hamburg';
    if (host.includes('uwaterloo.ca')) return 'University of Waterloo';
    if (host.includes('lucid.co')) return 'Lucidchart';
    if (host.includes('google')) return 'Google';
    if (host.includes('anthropic.com') || host.includes('claude.com')) return 'Anthropic';
    if (host.includes('openai.com')) return 'OpenAI';
    if (host.includes('realpython.com')) return 'Real Python';
    if (host.includes('microsoft.com')) return 'Microsoft Learn';
    if (host.includes('vercel.com')) return 'Vercel';
    return host;
  } catch {
    return 'مصدر خارجي';
  }
}

