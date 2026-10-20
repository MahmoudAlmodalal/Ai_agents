import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { TOPIC_LEARNING_CONTENT } from '@/src/lib/learningContent.ts';
import { getAllTopics } from '@/src/lib/topicRegistry.ts';

export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return '[' + value.map((item) => (item === undefined ? 'null' : stableStringify(item))).join(',') + ']';
  }
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).filter((k) => obj[k] !== undefined).sort();
  return '{' + keys.map((key) => `${JSON.stringify(key)}:${stableStringify(obj[key])}`).join(',') + '}';
}

export function hashTopicRecord(record: unknown): string {
  const serialized = stableStringify(record);
  return createHash('sha256').update(serialized).digest('hex');
}

export function generateHashes(): Record<string, string> {
  const canonicalTopics = getAllTopics();
  if (canonicalTopics.length !== 58) {
    throw new Error(`Expected 58 canonical topics, got ${canonicalTopics.length}`);
  }

  const hashes: Record<string, string> = {};
  for (const topic of canonicalTopics) {
    const slug = topic.slug;
    const content = TOPIC_LEARNING_CONTENT[slug];
    if (!content) {
      throw new Error(`Missing learning content for topic: ${slug}`);
    }
    hashes[slug] = hashTopicRecord(content);
  }

  // Ensure output is sorted by topic slug
  const sortedHashes: Record<string, string> = {};
  for (const slug of Object.keys(hashes).sort()) {
    sortedHashes[slug] = hashes[slug];
  }
  return sortedHashes;
}

if (process.argv[1] && process.argv[1].endsWith('learning_content_hashes.ts')) {
  const targetPath = path.resolve(process.cwd(), 'src/data/learning/learning-content-hashes.json');
  const hashes = generateHashes();
  fs.writeFileSync(targetPath, JSON.stringify(hashes, null, 2) + '\n', 'utf-8');
  console.log(`Generated hashes for ${Object.keys(hashes).length} topics at ${targetPath}`);
}
