import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllProposedGroups, getTopicImprovementStatus, isGroupImproved } from './educationalRoadmap.ts';
import type { EducationalReviewRecord, LessonTemplateCompliance } from '@/src/types/roadmap.ts';

test('accepted group boundaries and template do not announce educational release', () => {
  const groups = getAllProposedGroups();
  assert.equal(groups.length, 19);
  assert.equal(groups.flatMap((group) => group.topicSlugs).length, 58);
  for (const group of groups) {
    assert.equal(group.groupBoundariesApproved, true);
    assert.equal(group.templateApproved, true);
    for (const slug of group.topicSlugs) {
      const status = getTopicImprovementStatus(slug);
      assert.equal(status.contentAvailability, 'available');
      assert.equal(status.improvementStatus, 'pending-review');
      assert.doesNotMatch(status.groupProposalLabel, /بانتظار الاعتماد/);
    }
  }
  assert.equal(getTopicImprovementStatus('unknown-topic').templateApproved, false);
});

test('complete static review requires individual video evidence and explicit group release acceptance', () => {
  const group = getAllProposedGroups()[0];
  const slug = group.topicSlugs[0];
  const reviews: Record<string, EducationalReviewRecord> = {
    [slug]: { verdict: 'passed', reviewer: 'Fixture reviewer', reviewedAt: '2026-10-20', evidenceNotes: 'Fixture complete educational packet.' },
  };
  const compliance: Record<string, LessonTemplateCompliance> = {
    [slug]: {
      complete: true, hasApprovedTemplate: true, hasRequiredSections: true,
      hasPracticalSteps: true, hasExpectedOutputs: true, hasChecklist: true,
      hasApprovedVideo: true, evidenceNotes: 'Fixture lesson and media evidence.',
    },
  };
  assert.equal(isGroupImproved(group, reviews, compliance), false);
  const acceptedGroup = {
    ...group,
    releaseApproval: { state: 'approved' as const, approvedBy: 'Fixture owner', approvedAt: '2026-10-20', decisionReference: 'fixture:group-01' },
  };
  assert.equal(isGroupImproved(acceptedGroup, reviews, compliance), true);
  assert.equal(isGroupImproved(acceptedGroup, reviews, { [slug]: { ...compliance[slug], hasApprovedVideo: false } }), false);
  assert.equal(isGroupImproved(acceptedGroup, reviews, { [slug]: { ...compliance[slug], hasApprovedVideo: undefined } }), false);
  assert.equal(isGroupImproved(acceptedGroup, { [slug]: { ...reviews[slug], verdict: 'pending' } }, compliance), false);
});
