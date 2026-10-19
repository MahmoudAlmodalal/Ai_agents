import assert from 'node:assert';
import {
  PROPOSED_EDUCATIONAL_GROUPS,
  TOPIC_EDUCATIONAL_REVIEWS,
  TOPIC_TEMPLATE_COMPLIANCE,
  isGroupImproved,
  getGroupForTopic,
  getAllProposedGroups,
  getGroupStatusPresentation,
  getTopicImprovementStatus,
  validateGroupMembershipIntegrity,
} from '../src/lib/educationalRoadmap.ts';
import { getAllTopics } from '../src/lib/topicRegistry.ts';
import { ProposedGroupRecord, EducationalReviewRecord, LessonTemplateCompliance } from '../src/types/roadmap.ts';

console.log('--- Running Educational Roadmap Integrity Tests ---');

// 1. Group membership integrity and coverage
const integrity = validateGroupMembershipIntegrity();
assert.strictEqual(integrity.isValid, true, 'Integrity validation should be valid');
assert.strictEqual(integrity.totalGroups, 19, 'Must have exactly 19 proposed groups');
assert.strictEqual(integrity.totalTopics, 58, 'Must cover exactly 58 canonical topics');
assert.strictEqual(integrity.missingSlugs.length, 0, 'No canonical topics should be missing');
assert.strictEqual(integrity.duplicateSlugs.length, 0, 'No canonical topics should be duplicated');

const canonicalTopics = getAllTopics();
assert.strictEqual(canonicalTopics.length, 58, 'Topic registry must contain 58 topics');

// Check that every topic maps to a group
for (const topic of canonicalTopics) {
  const group = getGroupForTopic(topic.slug);
  assert.ok(group, `Topic ${topic.slug} must map to an educational group`);
  assert.ok(group.topicSlugs.includes(topic.slug), `Group ${group.id} must list ${topic.slug}`);
}
console.log('✔ Test 1 passed: 58 canonical topics map to 19 groups with 0 missing and 0 duplicates');

// 2. Proposal status: boundaries and templates must remain unapproved proposals
for (const group of PROPOSED_EDUCATIONAL_GROUPS) {
  assert.strictEqual(group.groupBoundariesApproved, false, `Group ${group.id} boundaries must not be approved`);
  assert.strictEqual(group.templateApproved, false, `Group ${group.id} template must not be approved`);
}

// Group 01 is the proposed first group
const group01 = PROPOSED_EDUCATIONAL_GROUPS[0];
assert.strictEqual(group01.id, 'group-01');
assert.strictEqual(group01.isProposedFirstGroup, true, 'Group 01 must be marked as proposed first group');
assert.deepStrictEqual(group01.topicSlugs, ['project-idea-mvp'], 'Group 01 must contain project-idea-mvp');
console.log('✔ Test 2 passed: All 19 groups have unapproved boundaries/template; Group 01 is proposed first group');

// 3. Baseline reviews and compliance: honest pending records, no fabricated pass
for (const slug of group01.topicSlugs) {
  const review = TOPIC_EDUCATIONAL_REVIEWS[slug];
  assert.ok(review, `Review record must exist for ${slug}`);
  assert.strictEqual(review.verdict, 'pending', `Review verdict for ${slug} must be pending`);
  assert.strictEqual(review.reviewedAt, undefined, `No fabricated review date for ${slug}`);
  assert.strictEqual(review.reviewer, undefined, `No fabricated reviewer for ${slug}`);

  const compliance = TOPIC_TEMPLATE_COMPLIANCE[slug];
  assert.ok(compliance, `Compliance record must exist for ${slug}`);
  assert.strictEqual(compliance.complete, false, `Compliance complete must be false for ${slug}`);
  assert.strictEqual(compliance.hasApprovedTemplate, false, `Approved template must be false for ${slug}`);
}
console.log('✔ Test 3 passed: Baseline review and compliance are pending without fabricated evidence');

// 4. Gate logic: isGroupImproved rejects incomplete, unapproved, or unreviewed scenarios
const testGroup: ProposedGroupRecord = {
  id: 'group-test',
  number: '99',
  titleAr: 'مجموعة تجريبية',
  titleEn: 'Test Group',
  descriptionAr: 'اختبار بوابة التحسين',
  topicSlugs: ['test-topic-1', 'test-topic-2'],
  groupBoundariesApproved: false,
  templateApproved: false,
};

const fullPassedReview = (slug: string): EducationalReviewRecord => ({
  verdict: 'passed',
  reviewedAt: '2026-10-19T20:00:00Z',
  reviewer: 'Audited Content Reviewer',
  evidenceNotes: 'Full educational rubric passed with observable evidence',
});

const fullPassedCompliance = (): LessonTemplateCompliance => ({
  complete: true,
  hasApprovedTemplate: true,
  hasRequiredSections: true,
  hasPracticalSteps: true,
  hasExpectedOutputs: true,
  hasChecklist: true,
  evidenceNotes: 'All template elements verified against approved standard',
});

// Case 4a: Boundaries not approved -> rejected
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: false, templateApproved: true },
    { 'test-topic-1': fullPassedReview('1'), 'test-topic-2': fullPassedReview('2') },
    { 'test-topic-1': fullPassedCompliance(), 'test-topic-2': fullPassedCompliance() }
  ),
  false,
  'Gate must reject when group boundaries are not approved'
);

// Case 4b: Template not approved -> rejected
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: true, templateApproved: false },
    { 'test-topic-1': fullPassedReview('1'), 'test-topic-2': fullPassedReview('2') },
    { 'test-topic-1': fullPassedCompliance(), 'test-topic-2': fullPassedCompliance() }
  ),
  false,
  'Gate must reject when template is not approved'
);

// Case 4c: One member pending review -> rejected
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: true, templateApproved: true },
    {
      'test-topic-1': fullPassedReview('1'),
      'test-topic-2': { verdict: 'pending' },
    },
    { 'test-topic-1': fullPassedCompliance(), 'test-topic-2': fullPassedCompliance() }
  ),
  false,
  'Gate must reject when any member review is pending'
);

// Case 4d: One member failed review -> rejected
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: true, templateApproved: true },
    {
      'test-topic-1': fullPassedReview('1'),
      'test-topic-2': { verdict: 'failed', evidenceNotes: 'Gaps in outputs', reviewedAt: '2026-10-19', reviewer: 'Rev' },
    },
    { 'test-topic-1': fullPassedCompliance(), 'test-topic-2': fullPassedCompliance() }
  ),
  false,
  'Gate must reject when any member review failed'
);

// Case 4e: Missing reviewer or timestamp -> rejected
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: true, templateApproved: true },
    {
      'test-topic-1': fullPassedReview('1'),
      'test-topic-2': { verdict: 'passed', evidenceNotes: 'Notes only', reviewedAt: '', reviewer: '' },
    },
    { 'test-topic-1': fullPassedCompliance(), 'test-topic-2': fullPassedCompliance() }
  ),
  false,
  'Gate must reject when reviewer or timestamp is missing'
);

// Case 4f: Incomplete template compliance -> rejected
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: true, templateApproved: true },
    { 'test-topic-1': fullPassedReview('1'), 'test-topic-2': fullPassedReview('2') },
    {
      'test-topic-1': fullPassedCompliance(),
      'test-topic-2': { ...fullPassedCompliance(), hasChecklist: false, complete: false },
    }
  ),
  false,
  'Gate must reject when any member template compliance is incomplete'
);

// Case 4g: Fully approved fixture with all members passed and verified -> ACCEPTED
assert.strictEqual(
  isGroupImproved(
    { ...testGroup, groupBoundariesApproved: true, templateApproved: true },
    { 'test-topic-1': fullPassedReview('1'), 'test-topic-2': fullPassedReview('2') },
    { 'test-topic-1': fullPassedCompliance(), 'test-topic-2': fullPassedCompliance() }
  ),
  true,
  'Gate must accept when boundaries, template, all reviews and all compliances are complete'
);
console.log('✔ Test 4 passed: Gate rejects each incomplete/unapproved condition and accepts complete approved fixture');

// 5. Unknown topic behavior
const unknownStatus = getTopicImprovementStatus('completely-unknown-topic-slug');
assert.strictEqual(unknownStatus.isKnownTopic, false, 'Unknown slug must have isKnownTopic: false');
assert.strictEqual(unknownStatus.contentAvailability, 'unknown', 'Unknown slug must not claim content is available');
assert.strictEqual(unknownStatus.improvementStatus, 'not-applicable', 'Unknown slug must be not-applicable');
assert.strictEqual(unknownStatus.group, undefined, 'Unknown slug has no group');
console.log('✔ Test 5 passed: Unknown slug handled safely without fabricating available content');

// 6. Real baseline groups evaluation: ALL 19 evaluate to pending-review
for (const group of PROPOSED_EDUCATIONAL_GROUPS) {
  assert.strictEqual(isGroupImproved(group), false, `Group ${group.id} must evaluate to false in baseline`);
  const pres = getGroupStatusPresentation(group);
  assert.strictEqual(pres.improvementStatus, 'pending-review', `Group ${group.id} presentation must be pending-review`);
  assert.strictEqual(pres.improvementStatusLabel, 'بانتظار المراجعة التعليمية الجديدة');
}
console.log('✔ Test 6 passed: All 19 current groups evaluate to pending-review in baseline');

console.log('--- All Educational Roadmap Integrity Tests Passed Successfully ---');
