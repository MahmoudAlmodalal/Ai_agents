'use client';

import React from 'react';
import Link from 'next/link';
import { AGENTS, COURSE_TOOLS, LAST_VERIFIED_AGENTS, AGENT_CATEGORY_LABELS, AgentCategory } from '@/src/data/agents';

export default function ToolsPage() {
  const [filter, setFilter] = React.useState<'all' | AgentCategory>('all');
  const cats: ('all' | AgentCategory)[] = ['all', 'cli-agent', 'ide-agent', 'vscode-extension', 'autonomous-agent', 'free-tier'];
  const shown = filter === 'all' ? AGENTS : AGENTS.filter((a) => a.category === filter);
  return (<main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10"><h1 className="text-3xl font-black sm:text-5xl">وكلاء البرمجة — ماذا تستخدم؟ ومتى؟</h1><p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">دليل تكميلي (ليس جزءا من المنهج المعتمد): قارن 13 وكيلا — Claude Code وOpenCode وKimi وCline وRoo وAider وManus وغيرها — ثم اختر واحدا فقط لمشروعك. تحقق من الصفحة الرسمية قبل التشغيل، ولا تضع مفاتيح API في GitHub.</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><Link href="/models" className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white">مؤشر الموديلات: ما أفضل موديل؟ ←</Link><span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-2 text-[var(--text-muted)]">آخر تحقق: <span dir="ltr">{LAST_VERIFIED_AGENTS}</span></span><span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-2 text-[var(--text-muted)]">{AGENTS.length} وكيلا</span></div></header>
    <div className="mt-6 flex flex-wrap gap-2">{cats.map((c) => (<button key={c} onClick={() => setFilter(c)} className={`rounded-full px-4 py-2 text-xs font-bold ${filter === c ? 'bg-[var(--primary)] text-white' : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)]'}`}>{c === 'all' ? `الكل (${AGENTS.length})` : `${AGENT_CATEGORY_LABELS[c]} (${AGENTS.filter((a) => a.category === c).length})`}</button>))}</div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{shown.map((a) => (<article key={a.slug} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center justify-between gap-2"><h2 className="font-black text-[var(--text-main)]">{a.nameAr} <span className="font-mono text-xs font-normal text-[var(--text-muted)]" dir="ltr">{a.nameEn}</span></h2><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">{a.categoryAr}</span></div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{a.vendor} · {a.platform}</p>
      <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]"><strong className="text-[var(--text-main)]">السعر:</strong> {a.pricingAr}</p>
      <p className="text-xs leading-6 text-[var(--text-muted)]"><strong className="text-[var(--text-main)]">المجاني:</strong> {a.freeOfferAr}</p>
      <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-3 text-left text-xs leading-6 text-emerald-300" dir="ltr">{a.install}</pre>
      <details className="mt-3 rounded-xl bg-[var(--bg-card-subtle)] p-3 text-xs leading-6 text-[var(--text-muted)]"><summary className="cursor-pointer font-bold text-[var(--text-main)]">المميزات والحدود والأنسب</summary><p className="mt-2"><strong>المميزات:</strong></p><ul className="list-disc pr-4">{a.strengths.map((s) => (<li key={s}>{s}</li>))}</ul><p className="mt-2"><strong>الحدود:</strong></p><ul className="list-disc pr-4">{a.limits.map((s) => (<li key={s}>{s}</li>))}</ul><p className="mt-2"><strong className="text-emerald-700 dark:text-emerald-300">الأنسب لـ:</strong> {a.bestForAr}</p></details>
      <a href={a.officialUrl} target="_blank" rel="noreferrer" className="mt-3 block text-xs font-bold text-emerald-600" dir="ltr">{a.officialUrl} ← الموقع الرسمي</a>
    </article>))}</div>
    <section className="mt-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8"><h2 className="text-xl font-black text-[var(--text-main)]">أدوات الدورة الرسمية (من المنهج المعتمد)</h2><p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">هذه الأدوات جزء من المسار التعليمي، منفصلة عن الوكلاء أعلاه.</p><div className="mt-4 grid gap-3 md:grid-cols-2">{COURSE_TOOLS.map((t) => (<article key={t.name} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4"><h3 className="font-black text-[var(--text-main)]">{t.name}</h3><p className="mt-1 text-xs text-[var(--text-muted)]">{t.desc}</p><a href={t.url} target="_blank" rel="noreferrer" className="mt-2 block text-xs font-bold text-emerald-600" dir="ltr">{t.url}</a></article>))}</div></section>
  </div></main>);
}
