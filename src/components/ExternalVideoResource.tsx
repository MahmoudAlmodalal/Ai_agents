'use client';

import { CandidateExternalVideo } from '@/src/types/learning.ts';
import { getExternalVideoDisplayState } from '@/src/types/externalVideo.ts';
import React from 'react';

interface ExternalVideoResourceProps {
  video?: CandidateExternalVideo;
  resource?: CandidateExternalVideo;
  topicTitle?: string;
}

const shellClass =
  'rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-[var(--text-main)]';
const linkClass =
  'mt-3 inline-flex min-h-11 items-center rounded-lg border border-[var(--border-color)] px-4 py-2 font-semibold text-[var(--brand-primary)] underline underline-offset-4 transition-colors hover:bg-[var(--bg-card-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

/** Renders honest external video states without promising offline playback. */
export function ExternalVideoResource({ video, resource, topicTitle = 'الموضوع' }: ExternalVideoResourceProps) {
  const candidate = video ?? resource;
  const state = getExternalVideoDisplayState(candidate);

  if (!candidate || state === 'missing') {
    return (
      <section className={shellClass} dir="rtl" aria-label={`فيديو خارجي لموضوع ${topicTitle}`}>
        <h3 className="font-bold">فيديو خارجي</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          لا يوجد مورد فيديو تمت مراجعته لهذا الموضوع حتى الآن.
        </p>
      </section>
    );
  }

  const approved = state === 'approved';
  const unavailable = state === 'unavailable';

  return (
    <section
      className={shellClass}
      dir="rtl"
      aria-label={`مورد فيديو خارجي لموضوع ${topicTitle}`}
      data-video-state={state}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-bold">مورد فيديو خارجي</h3>
        <span
          className="rounded-full border border-[var(--border-color)] px-2 py-1 text-xs font-semibold"
          role="status"
        >
          {approved ? 'مورد معتمد' : unavailable ? 'غير متاح' : 'مرشح — بانتظار المراجعة'}
        </span>
      </div>
      <p className="mt-2 font-semibold" dir="auto">
        {candidate.title}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{candidate.purpose}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
        {approved
          ? 'المصدر خارجي ويتطلب اتصالاً بالإنترنت. لا يعمل هذا الفيديو دون اتصال.'
          : unavailable
            ? 'تم تسجيل هذا المورد على أنه غير متاح. تحقق من مصادر أخرى أو تابع الدرس النصي.'
            : 'هذا رابط مرشح لم تتم الموافقة عليه كمورد تعليمي. يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال.'}
      </p>
      {state === 'approved' && (
        <a
          className={linkClass}
          href={candidate.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`فتح الفيديو المعتمد: ${candidate.title} (مصدر خارجي)`}
        >
          فتح الفيديو
          <span className="ms-2" aria-hidden="true">↗</span>
        </a>
      )}
    </section>
  );
}
