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

export interface TopicReviewAuditSummary {
  reviewState: string;
  quizScoringPolicyApproval: {
    state: string;
    approvedBy: string | null;
    approvedAt: string | null;
    decisionReference: string | null;
  };
  rubricScaleApproval: {
    state: string;
    approvedBy: string | null;
    approvedAt: string | null;
    decisionReference: string | null;
  };
  evidenceSummary: {
    topicReviewEvidence: Array<{ area: string; outcome: string }>;
    quizReviewEvidence: Array<{ area: string; outcome: string }>;
    questionReviewEvidence: Array<{ id: string; evidence: Array<{ area: string; outcome: string }> }>;
    rubricReviewEvidence: Array<{ area: string; outcome: string }>;
    criterionReviewEvidence: Array<{ id: string; evidence: Array<{ area: string; outcome: string }> }>;
    videoReviewEvidence: Array<{ id: string; evidence: Array<{ area: string; outcome: string }> }>;
  };
}

export function generateReviewSummaries(): Record<string, TopicReviewAuditSummary> {
  const canonicalTopics = getAllTopics();
  if (canonicalTopics.length !== 58) {
    throw new Error(`Expected 58 canonical topics, got ${canonicalTopics.length}`);
  }

  const summaries: Record<string, TopicReviewAuditSummary> = {};
  for (const topic of canonicalTopics) {
    const slug = topic.slug;
    const content = TOPIC_LEARNING_CONTENT[slug];
    if (!content) {
      throw new Error(`Missing learning content for topic: ${slug}`);
    }
    summaries[slug] = {
      reviewState: content.reviewState,
      quizScoringPolicyApproval: {
        state: content.quiz.scoringPolicy.approval.state,
        approvedBy: content.quiz.scoringPolicy.approval.approvedBy,
        approvedAt: content.quiz.scoringPolicy.approval.approvedAt,
        decisionReference: content.quiz.scoringPolicy.approval.decisionReference,
      },
      rubricScaleApproval: {
        state: content.practicalAssessment.scale.approval.state,
        approvedBy: content.practicalAssessment.scale.approval.approvedBy,
        approvedAt: content.practicalAssessment.scale.approval.approvedAt,
        decisionReference: content.practicalAssessment.scale.approval.decisionReference,
      },
      evidenceSummary: {
        topicReviewEvidence: content.reviewEvidence.map((e) => ({ area: e.area, outcome: e.outcome })),
        quizReviewEvidence: content.quiz.reviewEvidence.map((e) => ({ area: e.area, outcome: e.outcome })),
        questionReviewEvidence: content.quiz.questions.map((q) => ({
          id: q.id,
          evidence: q.reviewEvidence.map((e) => ({ area: e.area, outcome: e.outcome })),
        })),
        rubricReviewEvidence: content.practicalAssessment.reviewEvidence.map((e) => ({ area: e.area, outcome: e.outcome })),
        criterionReviewEvidence: content.practicalAssessment.criteria.map((c) => ({
          id: c.id,
          evidence: c.reviewEvidence.map((e) => ({ area: e.area, outcome: e.outcome })),
        })),
        videoReviewEvidence: (content.candidateVideos ?? []).map((v) => ({
          id: v.id,
          evidence: v.reviewEvidence.map((e) => ({ area: e.area, outcome: e.outcome })),
        })),
      },
    };
  }

  // Ensure output is sorted by topic slug
  const sortedSummaries: Record<string, TopicReviewAuditSummary> = {};
  for (const slug of Object.keys(summaries).sort()) {
    sortedSummaries[slug] = summaries[slug];
  }
  return sortedSummaries;
}

if (process.argv[1] && process.argv[1].endsWith('learning_content_hashes.ts')) {
  const args = process.argv.slice(2);
  const writeSummary = args.includes('--summary') || args.includes('--review-summary') || args.includes('summary');
  const writeHashes = args.includes('--hashes') || args.includes('hashes');
  const writeBoth = !writeSummary && !writeHashes;

  if (writeBoth || writeHashes) {
    const targetPath = path.resolve(process.cwd(), 'src/data/learning/learning-content-hashes.json');
    const hashes = generateHashes();
    fs.writeFileSync(targetPath, JSON.stringify(hashes, null, 2) + '\n', 'utf-8');
    console.log(`Generated hashes for ${Object.keys(hashes).length} topics at ${targetPath}`);
  }

  if (writeBoth || writeSummary) {
    const targetPath = path.resolve(process.cwd(), 'src/data/learning/learning-content-review-summary.json');
    const summaries = generateReviewSummaries();
    fs.writeFileSync(targetPath, JSON.stringify(summaries, null, 2) + '\n', 'utf-8');
    console.log(`Generated review summaries for ${Object.keys(summaries).length} topics at ${targetPath}`);
  }
}
