import type { TopicLearningContent } from '@/src/types/learning.ts';
import { LEARNING_CONTENT_GROUP_B_11 } from '@/src/data/learning/group-b-11-tech-stack.ts';
import { LEARNING_CONTENT_GROUP_B_12 } from '@/src/data/learning/group-b-12-frontend-planning-spec-kit.ts';
import { LEARNING_CONTENT_GROUP_B_13 } from '@/src/data/learning/group-b-13-python-postgres-api.ts';
import { LEARNING_CONTENT_GROUP_B_14 } from '@/src/data/learning/group-b-14-backend-frameworks-services.ts';
import { LEARNING_CONTENT_GROUP_B_15 } from '@/src/data/learning/group-b-15-frontend-api-testing.ts';
import { LEARNING_CONTENT_GROUP_B_16 } from '@/src/data/learning/group-b-16-performance-redis-qa.ts';
import { LEARNING_CONTENT_GROUP_B_17 } from '@/src/data/learning/group-b-17-docker-linux.ts';
import { LEARNING_CONTENT_GROUP_B_18 } from '@/src/data/learning/group-b-18-cloud-deployment.ts';
import { LEARNING_CONTENT_GROUP_B_19 } from '@/src/data/learning/group-b-19-operations-delivery.ts';

export * from '@/src/data/learning/group-b-common.ts';

/**
 * Barrel module re-exporting learning content for groups 11-19 (Topics 30-58).
 * Preserves the exact LEARNING_CONTENT_GROUP_B export.
 */
export const LEARNING_CONTENT_GROUP_B: Record<string, TopicLearningContent> = {
  ...LEARNING_CONTENT_GROUP_B_11,
  ...LEARNING_CONTENT_GROUP_B_12,
  ...LEARNING_CONTENT_GROUP_B_13,
  ...LEARNING_CONTENT_GROUP_B_14,
  ...LEARNING_CONTENT_GROUP_B_15,
  ...LEARNING_CONTENT_GROUP_B_16,
  ...LEARNING_CONTENT_GROUP_B_17,
  ...LEARNING_CONTENT_GROUP_B_18,
  ...LEARNING_CONTENT_GROUP_B_19,
};
