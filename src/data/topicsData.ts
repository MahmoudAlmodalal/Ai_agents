import { TOPICS, UNIFIED_TOPICS } from '@/src/lib/topicRegistry.ts';
import { TopicCategory, TopicItem } from '@/src/types/topic.ts';

export interface CategoryMetadata {
  id: TopicCategory;
  label: string;
}

export const CATEGORY_METADATA: readonly CategoryMetadata[] = [
  { id: 'all', label: 'كافة الأقسام' },
  { id: 'foundations', label: 'المرحلة التأسيسية' },
  { id: 'architecture', label: 'المعمارية والنمذجة' },
  { id: 'database', label: 'قواعد البيانات والأداء' },
  { id: 'frontend', label: 'الواجهات والفرونت إند' },
  { id: 'qa', label: 'الجودة والتحقق' },
  { id: 'reference', label: 'المراجع والقاموس' },
] as const;

export function deriveCategoryCounts(
  topics: TopicItem[] = TOPICS,
  predicate?: (topic: TopicItem) => boolean
): Record<TopicCategory, number> {
  const counts: Record<TopicCategory, number> = {
    all: 0,
    foundations: 0,
    architecture: 0,
    database: 0,
    frontend: 0,
    qa: 0,
    reference: 0,
  };

  for (const topic of topics) {
    if (predicate && !predicate(topic)) continue;
    counts.all++;
    if (topic.category in counts) {
      counts[topic.category]++;
    }
  }

  return counts;
}

export { TOPICS, UNIFIED_TOPICS };
