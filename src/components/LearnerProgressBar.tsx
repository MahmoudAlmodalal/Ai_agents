'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  BarChart3,
} from 'lucide-react';
import type { TopicCategory, TopicItem } from '@/src/types/topic.ts';
import {
  calculateChecklistProgress,
  subscribeAllApplicationChecklists,
  type ChecklistProgressSummary,
} from '@/src/lib/applicationChecklist.ts';

const CATEGORY_NAMES: Record<TopicCategory, string> = {
  all: 'كافة الموضوعات',
  foundations: 'المرحلة التأسيسية',
  architecture: 'المعمارية والنمذجة',
  database: 'قواعد البيانات والتخزين',
  frontend: 'الواجهات والفرونت إند',
  qa: 'الجودة والاختبارات',
  reference: 'المراجع والأدوات المتقدمة',
};

export interface LearnerProgressBarProps {
  topics: TopicItem[];
  selectedCategory?: TopicCategory;
  className?: string;
}

export function LearnerProgressBar({
  topics,
  selectedCategory = 'all',
  className = '',
}: LearnerProgressBarProps) {
  const [scope, setScope] = useState<'foundations' | 'current' | 'all'>('foundations');

  const effectiveCategory: TopicCategory =
    scope === 'all'
      ? 'all'
      : scope === 'foundations'
      ? 'foundations'
      : selectedCategory;

  const [summary, setSummary] = useState<ChecklistProgressSummary>(() =>
    calculateChecklistProgress(topics, effectiveCategory)
  );

  useEffect(() => {
    setSummary(calculateChecklistProgress(topics, effectiveCategory));

    const unsubscribe = subscribeAllApplicationChecklists(() => {
      setSummary(calculateChecklistProgress(topics, effectiveCategory));
    });

    return () => {
      unsubscribe();
    };
  }, [topics, effectiveCategory]);

  const targetCategoryLabel = CATEGORY_NAMES[effectiveCategory] ?? effectiveCategory;

  return (
    <div
      aria-label="شريط تقدم المتعلم المحلي"
      className={`w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-xs transition-all ${className}`}
    >
      {/* Top row: Headline & Scope Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>مسار التقدّم العملي</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
            <span>
              {`أنجزت ${summary.completedTopics} من ${summary.totalTopics} في ${targetCategoryLabel}`}
            </span>
            {summary.percentage > 0 && (
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {`${summary.percentage}%`}
              </span>
            )}
          </h3>
        </div>

        {/* View Scope Switcher */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-card-subtle)] p-1 rounded-xl border border-[var(--border-color)] text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setScope('foundations')}
            className={`cursor-pointer px-2.5 py-1 rounded-lg font-semibold transition-all ${
              scope === 'foundations'
                ? 'bg-[var(--bg-surface)] text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            المرحلة التأسيسية
          </button>
          {selectedCategory !== 'all' && selectedCategory !== 'foundations' && (
            <button
              type="button"
              onClick={() => setScope('current')}
              className={`cursor-pointer px-2.5 py-1 rounded-lg font-semibold transition-all ${
                scope === 'current'
                  ? 'bg-[var(--bg-surface)] text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              القسم الحالي
            </button>
          )}
          <button
            type="button"
            onClick={() => setScope('all')}
            className={`cursor-pointer px-2.5 py-1 rounded-lg font-semibold transition-all ${
              scope === 'all'
                ? 'bg-[var(--bg-surface)] text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            كافة الموضوعات
          </button>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="mt-3.5 space-y-1.5">
        <div
          role="progressbar"
          aria-label={`نسبة إنجاز ${targetCategoryLabel}`}
          aria-valuenow={summary.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-3 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] overflow-hidden p-0.5"
        >
          <div
            className="h-full rounded-full bg-gradient-to-l from-emerald-500 to-teal-600 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(summary.percentage, summary.percentage > 0 ? 3 : 0)}%` }}
          />
        </div>

        {/* Sub-stats row */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[var(--text-muted)] pt-0.5 gap-2">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>
              {`${summary.completedChecklistItems} من ${summary.totalChecklistItems} بنود فحص عملية مؤكدة`}
            </span>
          </span>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>لوحة تعلّمي التفصيلية</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Calm reassurance notice */}
      <div className="mt-3.5 pt-3 border-t border-[var(--border-color)] flex items-start gap-2 text-xs text-[var(--text-muted)] leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <span className="font-semibold text-[var(--text-main)]">🔒 خصوصيتك أولاً:</span> تقدمك وقوائم التحقق تُحفظ تلقائياً في متصفحك على هذا الجهاز فقط، دون الحاجة لإنشاء حساب أو تسجيل دخول.
        </p>
      </div>
    </div>
  );
}
