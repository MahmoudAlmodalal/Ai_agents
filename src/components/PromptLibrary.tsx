'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import type { PromptLibraryRecord, PromptSourceGroup } from '@/src/lib/promptLibrary';

type TopicFilter = 'all' | 'available' | 'pending';

const SOURCE_LABELS: Record<PromptSourceGroup, string> = {
  catalog: 'الكتالوج الأساسي',
  supplementary: 'برومبت إضافي',
  'cheatsheet-core': 'قالب عام',
  'cheatsheet-stage': 'مثال مرحلي',
};

function matchesQuery(prompt: PromptLibraryRecord, query: string): boolean {
  const searchableText = [
    prompt.number, prompt.title, prompt.category, prompt.difficulty, prompt.operation,
    prompt.purpose, prompt.recommendedTool, prompt.sourceLabel, prompt.body,
    ...prompt.inputFiles, ...prompt.outputFiles, ...prompt.warnings,
    ...prompt.topicRefs.map((topic) => topic.title),
  ].join(' ').toLocaleLowerCase();
  return searchableText.includes(query.trim().toLocaleLowerCase());
}

function topicStatus(availability: PromptLibraryRecord['topicRefs'][number]['availability']): string {
  if (availability === 'available') return 'منشور';
  if (availability === 'partial') return 'قيد الاستكمال';
  return 'لم يُنشر بعد';
}

export function PromptLibrary({ prompts }: { prompts: PromptLibraryRecord[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [operation, setOperation] = useState('all');
  const [sourceGroup, setSourceGroup] = useState<PromptSourceGroup | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');

  const categories = useMemo(() => Array.from(new Set(prompts.map((prompt) => prompt.category))).sort(), [prompts]);
  const operations = useMemo(() => Array.from(new Set(prompts.map((prompt) => prompt.operation))).sort(), [prompts]);
  const sourceGroups = useMemo(() => Array.from(new Set(prompts.map((prompt) => prompt.sourceGroup))), [prompts]);
  const counts = useMemo(() => prompts.reduce<Record<PromptSourceGroup, number>>((result, prompt) => {
    result[prompt.sourceGroup] += 1;
    return result;
  }, { catalog: 0, supplementary: 0, 'cheatsheet-core': 0, 'cheatsheet-stage': 0 }), [prompts]);

  const filteredPrompts = useMemo(() => prompts.filter((prompt) => {
    if (query.trim() && !matchesQuery(prompt, query)) return false;
    if (category !== 'all' && prompt.category !== category) return false;
    if (operation !== 'all' && prompt.operation !== operation) return false;
    if (sourceGroup !== 'all' && prompt.sourceGroup !== sourceGroup) return false;
    const hasTopicPage = prompt.topicRefs.some((topic) => topic.availability !== 'pending');
    const hasPendingTopic = prompt.topicRefs.some((topic) => topic.availability === 'pending');
    if (topicFilter === 'available' && !hasTopicPage) return false;
    if (topicFilter === 'pending' && !hasPendingTopic) return false;
    return true;
  }), [prompts, query, category, operation, sourceGroup, topicFilter]);

  function resetFilters() {
    setQuery('');
    setCategory('all');
    setOperation('all');
    setSourceGroup('all');
    setTopicFilter('all');
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <header className="mb-8 rounded-3xl bg-[var(--action-bg)] p-7 text-[var(--action-text)] sm:p-10">
        <div className="mb-3 flex flex-wrap items-center gap-2 opacity-80">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-bold" data-testid="prompt-library-count">
            {prompts.length} نصًا قابلًا للنسخ · {counts.catalog} أساسية · {counts.supplementary + counts['cheatsheet-core']} إضافية · {counts['cheatsheet-stage']} أمثلة مرحلية
          </span>
        </div>
        <h1 className="text-3xl font-black sm:text-5xl">مكتبة البرومبتات</h1>
        <p className="mt-4 max-w-3xl leading-8 opacity-90">ابحث في النصوص الكاملة، صفِّها حسب المهمة والمصدر، وافتح أي بطاقة لمراجعة المدخلات والمخرجات والأداة والموضوعات المرتبطة. النصوص تبقى كما وردت في مصادرها؛ راجع قواعد مشروعك قبل اعتماد أي نتيجة.</p>
        <p className="mt-2 max-w-3xl text-sm leading-7 opacity-80">
          العدد مشتق من السجلات: {counts.catalog} برومبتًا مرقمًا، و{counts.supplementary} برومبت إضافي، و{counts['cheatsheet-core']} قوالب عامة، و{counts['cheatsheet-stage']} أمثلة مرحلية.
        </p>
      </header>

      <section className="mb-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-5" aria-label="البحث والتصفية">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="relative sm:col-span-2 lg:col-span-2">
            <span className="sr-only">ابحث في البرومبتات</span>
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث بالعنوان أو رقم البرومبت أو الملف أو الموضوع…"
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] py-3 pe-10 ps-3 text-sm text-[var(--text-main)] outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="ابحث في البرومبتات"
            />
          </label>
          <label className="text-xs font-bold text-[var(--text-muted)]">
            <span className="mb-1.5 block">التصنيف</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-3 text-sm text-[var(--text-main)] outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="صفِّ حسب التصنيف">
              <option value="all">كل التصنيفات</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-xs font-bold text-[var(--text-muted)]">
            <span className="mb-1.5 block">نوع العملية</span>
            <select value={operation} onChange={(event) => setOperation(event.target.value)} className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-3 text-sm text-[var(--text-main)] outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="صفِّ حسب نوع العملية">
              <option value="all">كل العمليات</option>
              {operations.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-xs font-bold text-[var(--text-muted)]">
            <span className="mb-1.5 block">نوع المصدر</span>
            <select value={sourceGroup} onChange={(event) => setSourceGroup(event.target.value as PromptSourceGroup | 'all')} className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-3 text-sm text-[var(--text-main)] outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="صفِّ حسب نوع المصدر">
              <option value="all">كل المصادر</option>
              {sourceGroups.map((item) => <option key={item} value={item}>{SOURCE_LABELS[item]}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
            <span>الموضوع المرتبط</span>
            <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value as TopicFilter)} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="صفِّ حسب توفر الموضوع المرتبط">
              <option value="all">كل الحالات</option>
              <option value="available">له صفحة موضوع متاحة</option>
              <option value="pending">له موضوع لم ينشر بعد</option>
            </select>
          </label>
          <p className="text-sm text-[var(--text-muted)]" aria-live="polite" aria-atomic="true">يعرض {filteredPrompts.length} من {prompts.length} برومبتًا</p>
        </div>
      </section>

      {filteredPrompts.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <Link key={prompt.slug} href={`/prompts/${prompt.slug}`} className="group flex min-h-60 flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-emerald-600 px-2 py-1 font-mono text-xs font-bold text-white" dir="ltr">{prompt.number}</span>
                <span className="rounded-full bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs text-[var(--text-muted)]">{prompt.difficulty}</span>
              </div>
              <h2 className="mt-4 text-lg font-black text-[var(--text-main)] group-hover:text-emerald-600">{prompt.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-muted)]">{prompt.purpose}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-[var(--bg-card-subtle)] px-2.5 py-1 text-[var(--text-muted)]">{prompt.category}</span>
                <span className="rounded-full bg-[var(--bg-card-subtle)] px-2.5 py-1 font-mono text-[var(--text-muted)]">{prompt.operation}</span>
                <span className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-[var(--text-muted)]">{SOURCE_LABELS[prompt.sourceGroup]}</span>
              </div>
              <div className="mt-auto pt-4">
                <span className="block text-xs font-bold text-[var(--text-muted)]">الموضوعات المرتبطة</span>
                {prompt.topicRefs.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {prompt.topicRefs.slice(0, 2).map((topic) => (
                      <li key={topic.slug} className="rounded-lg bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs text-[var(--text-main)]">{topic.title} <span className="text-[var(--text-muted)]">· {topicStatus(topic.availability)}</span></li>
                    ))}
                    {prompt.topicRefs.length > 2 && <li className="px-1 py-1 text-xs text-[var(--text-muted)]">+{prompt.topicRefs.length - 2} موضوعات</li>}
                  </ul>
                ) : <span className="mt-2 block text-xs text-[var(--text-muted)]">لم يُسند إلى موضوع محدد بعد</span>}
                <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-700 group-hover:underline dark:text-emerald-400">افتح التفاصيل والنص الكامل ←</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-12 text-center" role="status">
          <h2 className="text-lg font-black text-[var(--text-main)]">لا توجد نتائج مطابقة</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">غيّر كلمات البحث أو أعد ضبط خيارات التصفية.</p>
          <button type="button" onClick={resetFilters} className="mt-4 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm font-bold text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">إعادة ضبط البحث والتصفية</button>
        </div>
      )}
    </div>
  );
}
