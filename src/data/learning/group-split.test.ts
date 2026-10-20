import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { TOPIC_LEARNING_CONTENT } from '@/src/lib/learningContent.ts';
import { getAllTopics } from '@/src/lib/topicRegistry.ts';
import { hashTopicRecord } from '@/scripts/learning_content_hashes.ts';

test('group split preserves exact byte-for-byte topic records across all 58 canonical topics', () => {
  const hashManifestPath = path.resolve(process.cwd(), 'src/data/learning/learning-content-hashes.json');
  assert.ok(fs.existsSync(hashManifestPath), 'learning-content-hashes.json must exist');

  const baselineHashes: Record<string, string> = JSON.parse(
    fs.readFileSync(hashManifestPath, 'utf-8')
  );

  const canonicalTopics = getAllTopics();
  assert.equal(canonicalTopics.length, 58, 'Expected 58 canonical topics');

  const canonicalSlugs = new Set(canonicalTopics.map((t) => t.slug));
  const exportedSlugs = new Set(Object.keys(TOPIC_LEARNING_CONTENT));

  assert.equal(canonicalSlugs.size, 58);
  assert.equal(exportedSlugs.size, 58, 'Exported topic set must have exactly 58 slugs');

  // Assert identical slug set (no more, no fewer)
  const missingSlugs = [...canonicalSlugs].filter((s) => !exportedSlugs.has(s));
  const unexpectedSlugs = [...exportedSlugs].filter((s) => !canonicalSlugs.has(s));
  assert.deepEqual(missingSlugs, [], `Missing slugs in exported content: ${missingSlugs.join(', ')}`);
  assert.deepEqual(unexpectedSlugs, [], `Unexpected slugs in exported content: ${unexpectedSlugs.join(', ')}`);

  // Assert exact SHA-256 hash match for all 58 topics
  const mismatched: Array<{ slug: string; baseline: string; current: string }> = [];

  for (const topic of canonicalTopics) {
    const slug = topic.slug;
    const content = TOPIC_LEARNING_CONTENT[slug];
    assert.ok(content, `Missing content for topic: ${slug}`);

    const currentHash = hashTopicRecord(content);
    const expectedHash = baselineHashes[slug];

    assert.ok(expectedHash, `Baseline hash missing for topic: ${slug}`);
    if (currentHash !== expectedHash) {
      mismatched.push({ slug, baseline: expectedHash, current: currentHash });
    }
  }

  assert.deepEqual(
    mismatched,
    [],
    `The following topic records differ from baseline hashes:\n${mismatched.map((m) => `  - ${m.slug}: expected ${m.baseline}, got ${m.current}`).join('\n')}`
  );
});
