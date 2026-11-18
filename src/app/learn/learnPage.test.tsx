import { test } from 'node:test';
import assert from 'node:assert/strict';
import { metadata } from '@/src/app/learn/page';
import { LEARNING_STAGES } from '@/src/data/learningStages';
import { getTopicBySlug } from '@/src/lib/topicRegistry';
import { NAV_ITEMS } from '@/src/components/Navbar';

test('/learn page metadata describes the 6-stage curriculum overview', () => {
  assert.match(metadata.title, /مسار التعلم الشامل/);
  assert.match(metadata.description, /المراحل الـ 6|6 مراحل/);
});

test('LEARNING_STAGES contains exactly 6 sequential stages covering the engineering path', () => {
  assert.equal(LEARNING_STAGES.length, 6);

  const stageNumbers = LEARNING_STAGES.map((s) => s.stageNumber);
  assert.deepEqual(stageNumbers, ['01', '02', '03', '04', '05', '06']);

  for (const stage of LEARNING_STAGES) {
    assert.ok(stage.title.length > 5, `Stage ${stage.stageNumber} must have descriptive title`);
    assert.ok(stage.badge.length > 0, `Stage ${stage.stageNumber} must have badge`);
    assert.ok(stage.goal.length > 20, `Stage ${stage.stageNumber} must have comprehensive goal`);
    assert.ok(stage.whatYouLearn.length >= 3, `Stage ${stage.stageNumber} must list what you learn`);
    assert.ok(stage.deliverables.length >= 2, `Stage ${stage.stageNumber} must list tangible deliverables`);

    // Verify start topic slug resolves to a canonical topic
    const topic = getTopicBySlug(stage.startSlug);
    assert.ok(topic, `Start slug "${stage.startSlug}" in stage ${stage.stageNumber} must resolve to a valid topic`);
  }
});

test('Navbar NAV_ITEMS points مسار التعلم to /learn with 6 مراحل badge', () => {
  const learnItem = NAV_ITEMS.find((item) => item.title === 'مسار التعلم');
  assert.ok(learnItem, 'Navbar must contain "مسار التعلم"');
  assert.equal(learnItem.href, '/learn');
  assert.equal(learnItem.badge, '6 مراحل');
  assert.equal(learnItem.isPrimary, true);
});
