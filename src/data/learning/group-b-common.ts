import type { TopicLearningContent } from '@/src/types/learning.ts';
import { QUESTION_IDS_GROUP_B_11, VIDEO_CANDIDATES_GROUP_B_11 } from '@/src/data/learning/group-b-11-tech-stack.ts';
import { QUESTION_IDS_GROUP_B_12, VIDEO_CANDIDATES_GROUP_B_12 } from '@/src/data/learning/group-b-12-frontend-planning-spec-kit.ts';
import { QUESTION_IDS_GROUP_B_13, VIDEO_CANDIDATES_GROUP_B_13 } from '@/src/data/learning/group-b-13-python-postgres-api.ts';
import { QUESTION_IDS_GROUP_B_14, VIDEO_CANDIDATES_GROUP_B_14 } from '@/src/data/learning/group-b-14-backend-frameworks-services.ts';
import { QUESTION_IDS_GROUP_B_15, VIDEO_CANDIDATES_GROUP_B_15 } from '@/src/data/learning/group-b-15-frontend-api-testing.ts';
import { QUESTION_IDS_GROUP_B_16, VIDEO_CANDIDATES_GROUP_B_16 } from '@/src/data/learning/group-b-16-performance-redis-qa.ts';
import { QUESTION_IDS_GROUP_B_17, VIDEO_CANDIDATES_GROUP_B_17 } from '@/src/data/learning/group-b-17-docker-linux.ts';
import { QUESTION_IDS_GROUP_B_18, VIDEO_CANDIDATES_GROUP_B_18 } from '@/src/data/learning/group-b-18-cloud-deployment.ts';
import { QUESTION_IDS_GROUP_B_19, VIDEO_CANDIDATES_GROUP_B_19 } from '@/src/data/learning/group-b-19-operations-delivery.ts';

export * from '@/src/data/learning/group-b-base.ts';

/** Stable, topic-specific IDs keep saved quiz attempts meaningful across copy edits. */
export const QUESTION_IDS: Record<string, [string, string]> = {
  ...QUESTION_IDS_GROUP_B_11,
  ...QUESTION_IDS_GROUP_B_12,
  ...QUESTION_IDS_GROUP_B_13,
  ...QUESTION_IDS_GROUP_B_14,
  ...QUESTION_IDS_GROUP_B_15,
  ...QUESTION_IDS_GROUP_B_16,
  ...QUESTION_IDS_GROUP_B_17,
  ...QUESTION_IDS_GROUP_B_18,
  ...QUESTION_IDS_GROUP_B_19,
};

/**
 * Researched external video candidates for review. Evidence records describe
 * publisher metadata and topic fit only; playback, captions, accessibility, and
 * owner acceptance have not been verified.
 */
export const VIDEO_CANDIDATES: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  ...VIDEO_CANDIDATES_GROUP_B_11,
  ...VIDEO_CANDIDATES_GROUP_B_12,
  ...VIDEO_CANDIDATES_GROUP_B_13,
  ...VIDEO_CANDIDATES_GROUP_B_14,
  ...VIDEO_CANDIDATES_GROUP_B_15,
  ...VIDEO_CANDIDATES_GROUP_B_16,
  ...VIDEO_CANDIDATES_GROUP_B_17,
  ...VIDEO_CANDIDATES_GROUP_B_18,
  ...VIDEO_CANDIDATES_GROUP_B_19,
};
