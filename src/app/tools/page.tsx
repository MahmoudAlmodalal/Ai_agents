'use client';

import React from 'react';
import Link from 'next/link';
import { AGENTS, AGENT_CATEGORY_LABELS, AgentCategory } from '@/src/data/agents';
import CourseToolsGuide from './CourseToolsGuide';

export default function ToolsPage() {
  const [filter, setFilter] = React.useState<'all' | AgentCategory>('all');
  const cats: ('all' | AgentCategory)[] = ['all', 'cli-agent', 'ide-agent', 'vscode-extension', 'autonomous-agent', 'free-tier'];
  const shown = filter === 'all' ? AGENTS : AGENTS.filter((a) => a.category === filter);
  return (<div className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <CourseToolsGuide />
    <section aria-label="دليل وكلاء البرمجة التكميلي">
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10"><h2 className="text-2xl font-black">دليل وكلاء البرمجة التكميلي</h2><p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">قارن الخيارات عند بدء كود الفرونت واختر أداة واحدة. أوصاف المقارنة التالية معلومات تحريرية سابقة لم تُعد مراجعتها في هذه النسخة؛ راجع المصدر الرسمي للميزات والتوافق والسعر وحدود المجاني والتثبيت. لا تتطلب الدورة كل هذه الأدوات.</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><Link href="/models" className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white">دليل الموديلات التكميلي ←</Link><span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-2 text-[var(--text-muted)]">{AGENTS.length} وكيلا</span></div></header>
    <div className="mt-6 flex flex-wrap gap-2">{cats.map((c) => (<button key={c} onClick={() => setFilter(c)} className={`rounded-full px-4 py-2 text-xs font-bold ${filter === c ? 'bg-[var(--primary)] text-white' : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)]'}`}>{c === 'all' ? `الكل (${AGENTS.length})` : `${AGENT_CATEGORY_LABELS[c]} (${AGENTS.filter((a) => a.category === c).length})`}</button>))}</div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{shown.map((a) => (<article key={a.slug} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center justify-between gap-2"><h2 className="font-black text-[var(--text-main)]">{a.nameAr} <span className="font-mono text-xs font-normal text-[var(--text-muted)]" dir="ltr">{a.nameEn}</span></h2><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">{a.categoryAr}</span></div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{a.vendor} · {a.platform}</p>
      <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">السعر وحدود المجاني والتثبيت: راجع الموقع الرسمي حسب حسابك ونظامك.</p>
      <details className="mt-3 rounded-xl bg-[var(--bg-card-subtle)] p-3 text-xs leading-6 text-[var(--text-muted)]"><summary className="cursor-pointer font-bold text-[var(--text-main)]">المميزات والحدود والأنسب</summary><p className="mt-2"><strong>المميزات:</strong></p><ul className="list-disc pr-4">{a.strengths.map((s) => (<li key={s}>{s}</li>))}</ul><p className="mt-2"><strong>الحدود:</strong></p><ul className="list-disc pr-4">{a.limits.map((s) => (<li key={s}>{s}</li>))}</ul><p className="mt-2"><strong className="text-emerald-700 dark:text-emerald-300">الأنسب لـ:</strong> {a.bestForAr}</p></details>
      <a href={a.officialUrl} target="_blank" rel="noreferrer" className="mt-3 block text-xs font-bold text-emerald-600" dir="ltr">{a.officialUrl} ← الموقع الرسمي</a>
    </article>))}</div>
    </section>
  </div></div>);
}
