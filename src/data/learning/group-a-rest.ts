import type { TopicLearningContent } from '@/src/types/learning.ts';
import { LEARNING_CONTENT_GROUP_A_02 } from '@/src/data/learning/group-a-02-discovery-prd-srs.ts';
import { LEARNING_CONTENT_GROUP_A_03 } from '@/src/data/learning/group-a-03-git-github.ts';
import { LEARNING_CONTENT_GROUP_A_04 } from '@/src/data/learning/group-a-04-visual-modeling.ts';
import { LEARNING_CONTENT_GROUP_A_05 } from '@/src/data/learning/group-a-05-plantuml-behavior.ts';
import { LEARNING_CONTENT_GROUP_A_06 } from '@/src/data/learning/group-a-06-database-diagrams.ts';
import { LEARNING_CONTENT_GROUP_A_07 } from '@/src/data/learning/group-a-07-ui-ux.ts';
import { LEARNING_CONTENT_GROUP_A_08 } from '@/src/data/learning/group-a-08-stitch-design-prototype.ts';
import { LEARNING_CONTENT_GROUP_A_09 } from '@/src/data/learning/group-a-09-agent-tools-skills-mcp.ts';
import { LEARNING_CONTENT_GROUP_A_10 } from '@/src/data/learning/group-a-10-stitch-mcp-design-md.ts';

/**
 * Barrel module re-exporting learning content for groups 02-10 (Topics 02-29).
 * Preserves the exact LEARNING_CONTENT_GROUP_A_REST export.
 */
export const LEARNING_CONTENT_GROUP_A_REST: Record<string, TopicLearningContent> = {
  ...LEARNING_CONTENT_GROUP_A_02,
  ...LEARNING_CONTENT_GROUP_A_03,
  ...LEARNING_CONTENT_GROUP_A_04,
  ...LEARNING_CONTENT_GROUP_A_05,
  ...LEARNING_CONTENT_GROUP_A_06,
  ...LEARNING_CONTENT_GROUP_A_07,
  ...LEARNING_CONTENT_GROUP_A_08,
  ...LEARNING_CONTENT_GROUP_A_09,
  ...LEARNING_CONTENT_GROUP_A_10,
};
