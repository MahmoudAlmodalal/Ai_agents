import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CandidateExternalVideo } from '@/src/types/learning.ts';
import { getExternalVideoDisplayState } from '@/src/types/externalVideo.ts';
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

function html(video?: CandidateExternalVideo): string {
  return renderToStaticMarkup(createElement(ExternalVideoResource, { video, topicTitle: 'Topic test' }));
}

test('candidate and incomplete approval stay non-actionable', () => {
  const invalidApprovals: Array<Record<string, unknown>> = [
    { state: 'approved', approvedBy: '', approvedAt: '2026-10-20T00:00:00.000Z', decisionReference: 'DEC-1' },
    { state: 'approved', approvedBy: 'Course owner', approvedAt: 'not-a-date', decisionReference: 'DEC-1' },
    { state: 'approved', approvedBy: 'Course owner', approvedAt: '2026-10-20T00:00:00.000Z', decisionReference: ' ' },
  ];

  for (const approval of invalidApprovals) {
    const record = { ...candidate, approval } as unknown as CandidateExternalVideo;
    assert.equal(getExternalVideoDisplayState(record), 'candidate');
    const markup = html(record);
    assert.match(markup, /مرشح — بانتظار المراجعة/);
    assert.match(markup, /يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال/);
    assert.doesNotMatch(markup, /<a\b/);
  }
});

test('complete approval enables an accessible external link and keeps the online-only message', () => {
  const approved: CandidateExternalVideo = {
    ...candidate,
    availability: 'available',
    approval: {
      state: 'approved',
      approvedBy: 'Course owner',
      approvedAt: '2026-10-20T12:00:00.000Z',
      decisionReference: 'issue-47-review',
    },
  };

  assert.equal(getExternalVideoDisplayState(approved), 'approved');
  const markup = html(approved);
  assert.match(markup, /مورد معتمد/);
  assert.match(markup, /href="https:\/\/example.org\/lesson"/);
  assert.match(markup, /target="_blank"/);
  assert.match(markup, /aria-label="فتح الفيديو المعتمد/);
  assert.match(markup, /المصدر خارجي ويتطلب اتصالاً بالإنترنت\. لا يعمل هذا الفيديو دون اتصال/);
  assert.doesNotMatch(markup, /data-offline-content-version/);
});

test('unavailable and missing resources have clear states and no outbound action', () => {
  const unavailable = { ...candidate, availability: 'unavailable' as const };
  assert.equal(getExternalVideoDisplayState(unavailable), 'unavailable');
  assert.match(html(unavailable), /غير متاح/);
  assert.doesNotMatch(html(unavailable), /<a\b/);

  assert.equal(getExternalVideoDisplayState(undefined), 'missing');
  assert.match(html(), /لا يوجد مورد فيديو تمت مراجعته لهذا الموضوع حتى الآن/);
  assert.doesNotMatch(html(), /<a\b/);
  assert.doesNotMatch(html(), /data-offline-content-version/);
});
