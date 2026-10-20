import { execFileSync } from 'node:child_process';
import { getAllTopics } from '@/src/lib/topicRegistry.ts';
import { getTopicLearningContent } from '@/src/lib/learningContent.ts';
import { getAllProposedGroups, getTopicImprovementStatus, validateGroupMembershipIntegrity } from '@/src/lib/educationalRoadmap.ts';
import { getExternalVideoDisplayState } from '@/src/types/externalVideo.ts';
import { hashTopicRecord } from './learning_content_hashes.ts';

// Reproducible, learner-data-free inventory for a release review.
const integrity = validateGroupMembershipIntegrity();
if (!integrity.isValid) throw new Error('The canonical Topic/group inventory is incomplete.');

const topics = getAllTopics().map((topic) => {
  const content = getTopicLearningContent(topic.slug);
  if (!content) throw new Error(`Missing learning content: ${topic.slug}`);
  return {
    slug: topic.slug,
    route: `/learn/${topic.slug}`,
    groupId: getTopicImprovementStatus(topic.slug).group?.id,
    improvementStatus: getTopicImprovementStatus(topic.slug).improvementStatus,
    contentVersion: content.contentVersion,
    contentSha256: hashTopicRecord(content),
    reviewState: content.reviewState,
    quiz: {
      id: content.quiz.id, version: content.quiz.version,
      policyVersion: content.quiz.scoringPolicy.version,
      policyApproval: content.quiz.scoringPolicy.approval.state,
      questions: content.quiz.questions.map(({ id, version }) => ({ id, version })),
    },
    selfAssessment: {
      id: content.practicalAssessment.id, version: content.practicalAssessment.version,
      scaleVersion: content.practicalAssessment.scale.version,
      scaleApproval: content.practicalAssessment.scale.approval.state,
      criteria: content.practicalAssessment.criteria.map(({ id, version, outputId }) => ({ id, version, outputId })),
    },
    videos: content.candidateVideos.map((video) => ({
      id: video.id,
      state: getExternalVideoDisplayState(video, topic.slug, content.contentVersion),
      approval: video.approval.state,
    })),
  };
});

console.log(JSON.stringify({
  schemaVersion: 1,
  sourceRevision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  integrity,
  groups: getAllProposedGroups().map(({ id, topicSlugs, groupBoundariesApproved, templateApproved, releaseApproval }) => ({
    id, topicSlugs, groupBoundariesApproved, templateApproved,
    releaseApproval: releaseApproval ?? null,
  })),
  topics,
}, null, 2));
