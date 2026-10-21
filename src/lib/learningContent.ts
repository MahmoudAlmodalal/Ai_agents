import { resolveCanonicalSlug } from '@/src/lib/topicRegistry';
import { LEARNING_CONTENT_GROUP_A } from '@/src/data/learning/group-a';
import { LEARNING_CONTENT_GROUP_B } from '@/src/data/learning/group-b';
import type { TopicLearningContent } from '@/src/types/learning';

/** Combined catalog is keyed only by canonical Topic.slug values. */
export const TOPIC_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  ...LEARNING_CONTENT_GROUP_A,
  ...LEARNING_CONTENT_GROUP_B,
};

export function getTopicLearningContent(slugOrId: string): TopicLearningContent | undefined {
  const slug = resolveCanonicalSlug(slugOrId);
  return TOPIC_LEARNING_CONTENT[slug];
}

export function getAllTopicLearningContent(): TopicLearningContent[] {
  return Object.values(TOPIC_LEARNING_CONTENT);
}
