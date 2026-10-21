import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CandidateExternalVideo } from '@/src/types/learning.ts';
import { getExternalVideoDisplayState, getExternalSourceLabel } from '@/src/types/externalVideo.ts';
import { ExternalVideoResource } from '@/src/components/ExternalVideoResource.tsx';

const candidate: CandidateExternalVideo = {
  id: 'topic-video',
  title: 'A reviewed learning resource',
  url: 'https://example.org/lesson',
  purpose: 'Shows a topic-aligned worked example.',
  availability: 'candidate',
  approval: { state: 'proposed', approvedBy: null, approvedAt: null, decisionReference: null },
  reviewEvidence: [],
};

const topicSlug = 'topic-test';
const contentVersion = 4;

function html(video?: CandidateExternalVideo): string {
  return renderToStaticMarkup(createElement(ExternalVideoResource, {
    video,
    topicTitle: 'Topic test',
    topicSlug,
    contentVersion,
  }));
}

test('candidate and incomplete approval stay non-actionable', () => {
  const invalidApprovals: Array<Record<string, unknown>> = [
    { state: 'approved', approvedBy: '', approvedAt: '2026-10-20T00:00:00.000Z', decisionReference: 'DEC-1' },
    { state: 'approved', approvedBy: 'Course owner', approvedAt: 'not-a-date', decisionReference: 'DEC-1' },
    { state: 'approved', approvedBy: 'Course owner', approvedAt: '2026-10-20T00:00:00.000Z', decisionReference: ' ' },
  ];

  for (const approval of invalidApprovals) {
    const record = { ...candidate, availability: 'available', approval } as unknown as CandidateExternalVideo;
    assert.equal(getExternalVideoDisplayState(record, topicSlug, contentVersion), 'candidate');
    const markup = html(record);
    assert.match(markup, /مرشح — بانتظار المراجعة/);
    assert.match(markup, /يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال/);
    assert.match(markup, /example\.org/);
    assert.doesNotMatch(markup, /<a\b/);
  }

  const approvalOnly: CandidateExternalVideo = {
    ...candidate,
    availability: 'available',
    approval: {
      state: 'approved',
      approvedBy: 'Course owner',
      approvedAt: '2026-10-20T12:00:00.000Z',
      decisionReference: 'issue-47-review',
    },
  };
  assert.equal(getExternalVideoDisplayState(approvalOnly, topicSlug, contentVersion), 'candidate');
  assert.doesNotMatch(html(approvalOnly), /<a\b/);
});

test('complete approval enables an accessible external link and keeps the online-only message', () => {
  const approved: CandidateExternalVideo = {
    ...candidate,
    url: 'https://www.youtube.com/watch?v=QRZ_l7cVzzU',
    availability: 'available',
    approval: {
      state: 'approved',
      approvedBy: 'Course owner',
      approvedAt: '2026-10-20T12:00:00.000Z',
      decisionReference: 'issue-47-review',
    },
    acceptanceReview: {
      topicSlug,
      contentVersion,
      reviewer: 'Synthetic test fixture',
      reviewedAt: '2026-10-20T12:00:00.000Z',
      sourceUrl: 'https://www.youtube.com/watch?v=QRZ_l7cVzzU',
      evidence: 'Synthetic test fixture only; this is not evidence of an actual video review.',
      checklist: {
        topicAlignment: 'passed',
        educationalSuitability: 'passed',
        playback: 'passed',
        captions: 'passed',
        accessibility: 'passed',
        unavailableHandling: 'passed',
      },
    },
  };

  assert.equal(getExternalVideoDisplayState(approved, topicSlug, contentVersion), 'approved');
  assert.equal(getExternalSourceLabel(approved.url), 'YouTube');
  const markup = html(approved);
  assert.match(markup, /مورد معتمد/);
  assert.match(markup, /YouTube/);
  assert.match(markup, /href="https:\/\/www\.youtube\.com\/watch\?v=QRZ_l7cVzzU"/);
  assert.match(markup, /target="_blank"/);
  assert.match(markup, /rel="noreferrer noopener"/);
  assert.match(markup, /min-h-11/);
  assert.match(markup, /focus-visible:outline/);
  assert.match(markup, /aria-label="فتح الفيديو المعتمد/);
  assert.match(markup, /المصدر خارجي ويتطلب اتصالاً بالإنترنت\. لا يعمل هذا الفيديو دون اتصال/);
  assert.doesNotMatch(markup, /data-offline-content-version/);
});

test('video review from another Topic version or an incomplete checklist stays non-actionable', () => {
  const approvedShape: CandidateExternalVideo = {
    ...candidate,
    availability: 'available',
    approval: {
      state: 'approved',
      approvedBy: 'Course owner',
      approvedAt: '2026-10-20T12:00:00.000Z',
      decisionReference: 'issue-47-review',
    },
    acceptanceReview: {
      topicSlug,
      contentVersion,
      reviewer: 'Synthetic test fixture',
      reviewedAt: '2026-10-20T12:00:00.000Z',
      sourceUrl: candidate.url,
      evidence: 'Synthetic test fixture only; this is not evidence of an actual video review.',
      checklist: {
        topicAlignment: 'passed',
        educationalSuitability: 'passed',
        playback: 'passed',
        captions: 'passed',
        accessibility: 'passed',
        unavailableHandling: 'passed',
      },
    },
  };
  const stale = {
    ...approvedShape,
    acceptanceReview: { ...approvedShape.acceptanceReview!, contentVersion: contentVersion - 1 },
  };
  const incomplete = {
    ...approvedShape,
    acceptanceReview: {
      ...approvedShape.acceptanceReview!,
      checklist: { ...approvedShape.acceptanceReview!.checklist, captions: 'not-run' as const },
    },
  };

  for (const record of [stale, incomplete]) {
    assert.equal(getExternalVideoDisplayState(record, topicSlug, contentVersion), 'candidate');
    assert.doesNotMatch(html(record), /<a\b/);
  }
});

test('unavailable and missing resources have clear states and no outbound action', () => {
  const unavailable = { ...candidate, availability: 'unavailable' as const };
  assert.equal(getExternalVideoDisplayState(unavailable), 'unavailable');
  const unavailableMarkup = html(unavailable);
  assert.match(unavailableMarkup, /غير متاح/);
  assert.match(unavailableMarkup, /تم تسجيل هذا المورد على أنه غير متاح/);
  assert.match(unavailableMarkup, /الدرس النصي والتمارين مكتملة ومتاحة دون الحاجة إلى هذا المورد/);
  assert.doesNotMatch(unavailableMarkup, /<a\b/);

  assert.equal(getExternalVideoDisplayState(undefined), 'missing');
  assert.match(html(), /لا يوجد مورد فيديو تمت مراجعته لهذا الموضوع حتى الآن/);
  assert.doesNotMatch(html(), /<a\b/);
  assert.doesNotMatch(html(), /data-offline-content-version/);
});

test('source label resolves major known platforms and generic domains', () => {
  assert.equal(getExternalSourceLabel('https://www.youtube.com/watch?v=123'), 'YouTube');
  assert.equal(getExternalSourceLabel('https://youtu.be/123'), 'YouTube');
  assert.equal(getExternalSourceLabel('https://community.atlassian.com/test'), 'Atlassian');
  assert.equal(getExternalSourceLabel('https://help.figma.com/test'), 'Figma');
  assert.equal(getExternalSourceLabel('https://www.nngroup.com/videos/test'), 'Nielsen Norman Group');
  assert.equal(getExternalSourceLabel('https://lecture2go.uni-hamburg.de/video'), 'Universität Hamburg');
  assert.equal(getExternalSourceLabel('https://student.cs.uwaterloo.ca/video'), 'University of Waterloo');
  assert.equal(getExternalSourceLabel('https://lucid.co/diagram'), 'Lucidchart');
  assert.equal(getExternalSourceLabel('https://developers.googleblog.com/test'), 'Google');
  assert.equal(getExternalSourceLabel('https://academy.openai.com/test'), 'OpenAI');
  assert.equal(getExternalSourceLabel('https://realpython.com/test'), 'Real Python');
  assert.equal(getExternalSourceLabel('https://learn.microsoft.com/test'), 'Microsoft Learn');
  assert.equal(getExternalSourceLabel('https://vercel.com/test'), 'Vercel');
  assert.equal(getExternalSourceLabel('https://custom-domain.org/path'), 'custom-domain.org');
  assert.equal(getExternalSourceLabel('invalid-url'), 'مصدر خارجي');
});

