'use client';

import React from 'react';
import Link from 'next/link';
import { AGENTS, AGENT_CATEGORY_LABELS, AgentCategory, LAST_VERIFIED_AGENTS } from '@/src/data/agents';
import { normalizeArabic } from '@/src/utils/searchUtils';
import CourseToolsGuide from './CourseToolsGuide';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | AgentCategory>('all');
  const cats: ('all' | AgentCategory)[] = ['all', 'cli-agent', 'ide-agent', 'vscode-extension', 'autonomous-agent', 'free-tier'];

  const normQuery = normalizeArabic(searchQuery.trim());
  const queryWords = normQuery ? normQuery.split(' ').filter(Boolean) : [];

  const shown = AGENTS.filter((a) => {
    const matchesCategory = filter === 'all' || a.category === filter;
    if (!matchesCategory) return false;
    if (queryWords.length === 0) return true;

    const haystack = [
      a.slug,
      a.nameEn,
      a.nameAr,
      a.vendor,
      a.category,
      a.categoryAr,
      a.platform,
      a.pricingAr,
      a.freeOfferAr,
      a.install,
      ...a.strengths,
      ...a.limits,
      a.bestForAr,
    ]
      .map(normalizeArabic)
      .join(' ');

    return queryWords.every((word) => haystack.includes(word));
  });

  return (
    <div className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
          → الرئيسية
        </Link>
        <CourseToolsGuide searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <section aria-label="دليل وكلاء البرمجة التكميلي">
          <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
            <h2 className="text-2xl font-black">دليل وكلاء البرمجة التكميلي</h2>
            <p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">
              قارن الخيارات عند بدء كود الفرونت واختر أداة واحدة. أوصاف المقارنة التالية معلومات تحريرية سابقة لم تُعد مراجعتها في هذه النسخة؛ راجع المصدر الرسمي للميزات والتوافق والسعر وحدود المجاني والتثبيت. لا تتطلب الدورة كل هذه الأدوات.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <Link href="/models" className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white">
                دليل الموديلات التكميلي ←
              </Link>
              <span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-2 text-[var(--text-muted)]">
                {AGENTS.length} وكيلا
              </span>
              <span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-2 text-[var(--text-muted)]">
                تاريخ آخر مراجعة تحريرية: 18 أكتوبر 2026 ({LAST_VERIFIED_AGENTS})
              </span>
            </div>
          </header>

          <div className="mt-6 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  filter === c
                    ? 'bg-[var(--primary)] text-white'
                    : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)]'
                }`}
              >
                {c === 'all'
                  ? `الكل (${AGENTS.length})`
                  : `${AGENT_CATEGORY_LABELS[c]} (${AGENTS.filter((a) => a.category === c).length})`}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[var(--text-muted)]">
            <span aria-live="polite">
              عدّاد وكلاء البرمجة المعروضين: {shown.length} من {AGENTS.length} وكيل
              {filter !== 'all' && (
                <span className="mr-2 font-normal text-[var(--primary)]">
                  (الفئة المحددة: {AGENT_CATEGORY_LABELS[filter]})
                </span>
              )}
              {queryWords.length > 0 && (
                <span className="mr-2 font-normal text-[var(--primary)]">
                  (المطابقة للبحث: «{searchQuery.trim()}»)
                </span>
              )}
            </span>
            <span className="text-xs font-normal text-[var(--text-muted)]">
              تاريخ آخر مراجعة تحريرية: 18 أكتوبر 2026 ({LAST_VERIFIED_AGENTS})
            </span>
          </div>

          {shown.length === 0 ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] p-8 text-center"
            >
              <p className="text-base font-bold text-[var(--text-main)]">
                لا يوجد وكلاء يطابقون خيارات البحث والتصفية الحالية{queryWords.length > 0 ? ` («${searchQuery.trim()}»)` : ''}.
              </p>
              <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                اقتراح الخطوة التالية: جرب مسح كلمة البحث، أو تغيير فئة الوكيل المحددة إلى «الكل» لمشاهدة جميع الخيارات المتاحة.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {queryWords.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
                  >
                    مسح كلمة البحث
                  </button>
                )}
                {filter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs font-bold text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
                  >
                    عرض كل الفئات ({AGENTS.length})
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {shown.map((a) => (
                <article key={a.slug} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-black text-[var(--text-main)]">
                      {a.nameAr} <span className="font-mono text-xs font-normal text-[var(--text-muted)]" dir="ltr">{a.nameEn}</span>
                    </h2>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {a.categoryAr}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{a.vendor} · {a.platform}</p>

                  <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                    السعر والعرض المجاني والتثبيت معروضة داخل التفاصيل أدناه مع الحذر التحريري وتاريخ المراجعة.
                  </p>

                  <details className="mt-3 rounded-xl bg-[var(--bg-card-subtle)] p-3 text-xs leading-6 text-[var(--text-muted)]">
                    <summary className="cursor-pointer font-bold text-[var(--text-main)]">
                      المميزات والحدود والسعر والتثبيت والأنسب
                    </summary>

                    <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-50/50 p-2.5 text-[11px] leading-5 text-amber-900 dark:bg-amber-950/20 dark:text-amber-200">
                      <strong>حذر تحريري:</strong> بيانات السعر والعرض المجاني وأمر التثبيت استنادًا إلى مراجعة سابقة ({LAST_VERIFIED_AGENTS} — 18 أكتوبر 2026) ولم تُختبر في هذه النسخة؛ راجع المصدر الرسمي للميزات والتوافق والسعر الحالي.
                    </div>

                    <dl className="mt-3 space-y-2">
                      <div>
                        <dt className="inline font-bold text-[var(--text-main)]">السعر: </dt>
                        <dd className="inline">{a.pricingAr}</dd>
                      </div>
                      <div>
                        <dt className="inline font-bold text-[var(--text-main)]">العرض المجاني: </dt>
                        <dd className="inline">{a.freeOfferAr}</dd>
                      </div>
                      <div>
                        <dt className="block font-bold text-[var(--text-main)]">التثبيت: </dt>
                        <dd className="mt-1">
                          <code className="block overflow-x-auto rounded-lg bg-slate-950 p-2 font-mono text-[11px] text-emerald-300" dir="ltr">
                            {a.install}
                          </code>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[var(--text-main)]">المميزات:</dt>
                        <dd>
                          <ul className="list-disc pr-4">
                            {a.strengths.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[var(--text-main)]">الحدود:</dt>
                        <dd>
                          <ul className="list-disc pr-4">
                            {a.limits.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="inline font-bold text-emerald-700 dark:text-emerald-300">الأنسب لـ: </dt>
                        <dd className="inline">{a.bestForAr}</dd>
                      </div>
                    </dl>
                  </details>

                  <a href={a.officialUrl} target="_blank" rel="noreferrer" className="mt-3 block text-xs font-bold text-emerald-600" dir="ltr">
                    {a.officialUrl} ← الموقع الرسمي
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
