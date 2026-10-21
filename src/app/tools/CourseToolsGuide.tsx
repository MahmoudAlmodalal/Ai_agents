'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  COURSE_TOOL_GUIDE,
  ToolVerificationStatus,
} from '@/src/data/course-tool-guide';

function getStatusBadge(status: ToolVerificationStatus) {
  switch (status) {
    case 'موثّق من مصدر رسمي':
      return {
        icon: '✓',
        badgeClass:
          'border-solid border-emerald-600/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/40',
      };
    case 'اختياري':
      return {
        icon: '◇',
        badgeClass:
          'border-dashed border-sky-600/40 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-500/40',
      };
    case 'لم يُختبر التثبيت':
      return {
        icon: '⚠',
        badgeClass:
          'border-dotted border-amber-600/40 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/40',
      };
  }
}

export default function CourseToolsGuide() {
  const [status, setStatus] = useState('');

  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('تم نسخ الأمر؛ راجع المصدر الرسمي قبل تشغيله.');
    } catch {
      setStatus('تعذر النسخ؛ حدد الأمر وانسخه يدويًا.');
    }
  }

  return (
    <section aria-label="دليل أدوات المسار" className="mb-10">
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
        <h1 className="text-3xl font-black sm:text-5xl">الأدوات — ماذا تستخدم؟ ومتى؟ وكيف تبدأ؟</h1>
        <p className="mt-4 leading-8 text-[var(--text-muted)]">
          ابدأ بفكرة ومتطلبات ووثائق. استخدم أداة عندما تحتاج مخرجها، ولا تجعل تجهيز بيئة البرمجة شرطًا للتحليل.
        </p>
        <p className="mt-3 font-bold">إعداد أدوات التنفيذ يبدأ عند بدء كود الفرونت</p>
        <p className="mt-3 text-sm leading-7">
          يمكن إكمال المقابلة والتوثيق والمخططات دون وكيل برمجي. إعداد الوكيل والمهارات وMCP يأتي بعد اعتماد النموذج التفاعلي؛ لا يلزم اشتراك مدفوع أو تبديل أداتك.
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          مراجعة المصادر: 21 أكتوبر 2026. «مراجعة المصدر» تؤكد النص الموثق، ولا تعني تجربة التثبيت أو الحساب أو الاتصال. راجع تعليمات نظامك وإصدارك قبل تشغيل الأوامر.
        </p>
        <Link href="/templates" className="mt-4 inline-block font-bold text-[var(--primary)]">
          القوالب المرجعية وحالة توفرها ←
        </Link>
      </header>
      <p role="status" aria-live="polite" className="my-4 min-h-7 text-sm text-[var(--primary)]">
        {status}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {COURSE_TOOL_GUIDE.map((tool) => {
          const badge = getStatusBadge(tool.verificationStatus);
          return (
            <article
              key={tool.name}
              className="min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded-md bg-[var(--bg-card-subtle)] px-2 py-0.5 text-xs font-bold text-[var(--text-muted)]">
                    {tool.stage}
                  </span>
                  <h2 className="mt-1 text-xl font-black text-[var(--text-main)]" dir="auto">
                    {tool.name}
                  </h2>
                </div>
                <span
                  data-verification-status={tool.verificationStatus}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${badge.badgeClass}`}
                >
                  <span aria-hidden="true" className="font-mono">
                    {badge.icon}
                  </span>
                  <span>{tool.verificationStatus}</span>
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-[var(--text-main)]">{tool.purpose}</p>

              <dl className="mt-3 space-y-2 text-sm leading-7">
                <div>
                  <dt className="inline font-bold">مرحلة الاستخدام: </dt>
                  <dd className="inline">{tool.stage}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">تاريخ مراجعة المصدر: </dt>
                  <dd className="inline" dir="ltr">
                    {tool.reviewDate}
                  </dd>
                </div>
                <div>
                  <dt className="inline font-bold">متى تستخدمها: </dt>
                  <dd className="inline">{tool.timing}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">المدخلات: </dt>
                  <dd className="inline">{tool.input}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">المخرجات: </dt>
                  <dd className="inline">{tool.output}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">دورة الحياة: </dt>
                  <dd className="inline">{tool.lifecycle}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">أشهر عقبة عملية: </dt>
                  <dd className="inline text-amber-900 dark:text-amber-200">
                    {tool.commonPitfall}
                  </dd>
                </div>
                <div>
                  <dt className="inline font-bold">مثال تطبيقي: </dt>
                  <dd className="inline">{tool.workedExample}</dd>
                </div>
              </dl>

              {tool.command && (
                <div className="mt-4">
                  <pre
                    dir="ltr"
                    className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-left text-xs leading-6 text-emerald-300"
                  >
                    {tool.command}
                  </pre>
                  <button
                    type="button"
                    className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
                    onClick={() => copyCommand(tool.command!)}
                  >
                    نسخ الأمر
                  </button>
                </div>
              )}

              <p className="mt-3 break-words text-xs leading-6 text-[var(--text-muted)]">
                {tool.verification}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[var(--primary)]">
                <a href={tool.source} target="_blank" rel="noreferrer">
                  المصدر الرسمي
                </a>
                <Link href={`/learn/${tool.topic}`}>موضوع الاستخدام</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
