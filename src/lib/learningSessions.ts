import { STITCH_TO_FRONTEND_SESSION } from '@/src/data/sessions/stitch-to-frontend';
import type { LearningSession } from '@/src/types/session';

/** Guided sessions compose existing topics; they are not part of the
 * 58-topic sequence and must not be added to roadmap groups. */
export const LEARNING_SESSIONS: readonly LearningSession[] = [STITCH_TO_FRONTEND_SESSION];

export function getLearningSession(slug: string): LearningSession | undefined {
  return LEARNING_SESSIONS.find((session) => session.slug === slug);
}

export function getSessionForTopic(topicSlug: string): LearningSession | undefined {
  return LEARNING_SESSIONS.find((session) =>
    session.relatedGroups.some((group) => group.topicSlugs.includes(topicSlug))
  );
}
