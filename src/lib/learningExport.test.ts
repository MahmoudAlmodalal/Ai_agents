import assert from 'node:assert/strict';
import test from 'node:test';
import { getAllTopics } from '@/src/lib/topicRegistry';
import { buildLearningExportFiles, summarizeTopicLearning, type LearningExportSnapshot } from './learningExport';
import type { TopicLearningContent } from '@/src/types/learning';
import { PROMPT_LIBRARY } from './promptLibrary';

const topic = getAllTopics().find((item) => item.slug === 'user-flow-modeling')!;

function snapshot(): LearningExportSnapshot {
  return {
    schemaVersion: 1,
    generatedAt: '2026-10-20T10:00:00.000Z',
    scope: 'this-browser-and-device',
    storageStatus: {
      bookmarks: 'available', recentlyViewed: 'available', checklists: 'available', learningRecords: 'available',
      quizAttempts: 'available', practicalAssessments: 'available',
      badgeAwards: 'available', promptCustomizations: 'available',
    },
    bookmarks: [], recentlyViewed: [], unresolvedBookmarks: [], unresolvedRecentlyViewed: [],
    checklistActivity: { entries: [], storageStatus: 'available', unresolvedHistoricalKeys: [] },
    quizAttempts: [], practicalAssessments: [], badgeAwardEvents: [], promptCustomizations: {},
  };
}

function learningContent(): TopicLearningContent {
  const approval = { state: 'proposed' as const, approvedBy: null, approvedAt: null, decisionReference: null };
  return {
    topicSlug: topic.slug,
    contentVersion: 4,
    reviewState: 'review-ready',
    objectives: [{ id: 'flow-objective', text: 'Write a documented success and failure flow.' }],
    sections: [{ id: 'flow-section', heading: 'Decision paths', body: 'Mark each confirmed decision and unresolved rule.' }],
    practicalSteps: [{ id: 'flow-step', instruction: 'Draft the diagram.', expectedOutput: 'A Mermaid flowchart.' }],
    workedExamples: [],
    candidateVideos: [],
    reviewEvidence: [],
    quiz: {
      id: 'flow-quiz', version: 3, title: 'Flow review', instructions: 'Choose the supported response.',
      questions: [{
        id: 'decision-question', version: 2, objectiveId: 'flow-objective', prompt: 'What should an unresolved rule become?',
        options: [{ id: 'open-question', text: 'An explicit open question' }, { id: 'invented-rule', text: 'An assumed rule' }],
        correctOptionId: 'open-question', explanation: 'Unresolved requirements stay open until confirmed.', reviewEvidence: [],
      }],
      scoringPolicy: {
        id: 'flow-score', version: 2, correctAnswerPoints: 1, incorrectAnswerPoints: 0, unansweredAnswerPoints: 0,
        retryPolicy: 'unlimited', feedbackTiming: 'after-submit', retainedAttempts: 'all',
        summary: 'Descriptive self-check, with no mastery threshold.', approval,
      },
      reviewEvidence: [],
    },
    practicalAssessment: {
      id: 'flow-rubric', version: 5, title: 'Flow quality review',
      outputs: [{ id: 'diagram-output', description: 'A Mermaid diagram grounded in confirmed requirements.' }],
      scale: {
        id: 'three-level', version: 2,
        levels: [{ id: 'clear', label: 'Clear', description: 'Every confirmed path is described.' }],
        completionRule: 'no-mastery-threshold', summary: 'Descriptive levels only.', approval,
      },
      criteria: [{
        id: 'failure-paths', version: 3, outputId: 'diagram-output', name: 'Failure paths',
        description: 'Failure behavior has an explicit response and recovery path.',
        evidencePrompt: 'Point to the failure branch and recovery step.', reviewEvidence: [],
      }],
      reviewEvidence: [],
    },
  };
}

function readTextFile(files: ReturnType<typeof buildLearningExportFiles>, path: string) {
  const contents = files.find((file) => file.path === path)!.contents;
  return typeof contents === 'string' ? contents : new TextDecoder().decode(contents);
}

test('export includes every application Mermaid perspective and a readable course summary', () => {
  const files = buildLearningExportFiles(snapshot(), [topic], [], [], []);
  const paths = new Set(files.map((file) => file.path));
  for (const perspective of ['architecture', 'flow', 'sequence']) {
    assert.ok(paths.has(`course/topics/${topic.slug}/diagrams/${perspective}.mmd`));
  }
  assert.match(readTextFile(files, `course/topics/${topic.slug}/diagrams/flow.mmd`), /flowchart TD/);
  const summary = readTextFile(files, `course/topics/${topic.slug}/learning-summary.md`);
  assert.match(summary, /نمذجة مسارات تدفق المستخدم/);
  assert.match(summary, /المتطلبات السابقة/);
  assert.match(summary, /قائمة|مسار|مخرج/);
  const availability = JSON.parse(readTextFile(files, 'resources/availability-manifest.json'));
  assert.equal(availability.renderedDiagramFilesIncluded, false);
  assert.equal(availability.includedDiagramSources.length, 3);
  assert.ok(availability.includedDiagramSources.every((entry: { path: string }) => paths.has(entry.path)));
});

test('readable learning summary includes versioned questions, scoring policy and self-assessment rubric', () => {
  const summary = summarizeTopicLearning(topic, learningContent());
  assert.match(summary, /إصدار محتوى التعلم: 4/);
  assert.match(summary, /Flow review · version 3/);
  assert.match(summary, /مقترح التصحيح: flow-score · الإصدار 2/);
  assert.match(summary, /What should an unresolved rule become\?/);
  assert.match(summary, /An explicit open question \(الإجابة الصحيحة\)/);
  assert.match(summary, /Flow quality review · version 5/);
  assert.match(summary, /سلم التقدير: three-level · الإصدار 2/);
  assert.match(summary, /Failure paths/);
  assert.match(summary, /لا يمثل مراجعة مستقلة/);
});

test('export availability lists all expected topic outputs and labels unavailable record counts', () => {
  const files = buildLearningExportFiles({
    ...snapshot(),
    storageStatus: { ...snapshot().storageStatus, recentlyViewed: 'read-error', quizAttempts: 'invalid' },
  }, [topic], [], PROMPT_LIBRARY, []);
  const availability = JSON.parse(readTextFile(files, 'resources/availability-manifest.json'));
  assert.ok(availability.learnerProjectOutputsNotIncluded.some((entry: { name: string; sourceTopicSlugs: string[] }) =>
    entry.name === topic.outputs[0] && entry.sourceTopicSlugs.includes(topic.slug)));
  const activity = readTextFile(files, 'learner-data/activity-summary.md');
  assert.match(activity, /غير مؤكدة \(read-error\)/);
  assert.match(activity, /غير مؤكدة \(invalid\)/);
});
