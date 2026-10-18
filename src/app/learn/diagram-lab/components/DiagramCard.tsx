'use client';

import React from 'react';
import Link from 'next/link';
import { DiagramLabItem, resolveDiagramTopicLink } from '@/src/data/diagram-lab.ts';
import { DiagramRenderer } from './DiagramRenderer.tsx';
import {
  HelpCircle,
  Target,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Layers,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface DiagramCardProps {
  item: DiagramLabItem;
}

export const DiagramCard: React.FC<DiagramCardProps> = ({ item }) => {
  const topicInfo = resolveDiagramTopicLink(item);

  // Badge styles based on diagram family
  const familyBadgeStyle =
    item.family === 'Mermaid'
      ? 'border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
      : item.family === 'PlantUML'
      ? 'border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
      : 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300';

  return (
    <article
      id={`diagram-${item.id}`}
      className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-7 shadow-xs space-y-6 transition-all hover:border-[var(--brand-primary)]/40"
      dir="rtl"
    >
      {/* 1. Header Bar: Order, Title, Family Badge, Category */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-color)] pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--brand-primary)] font-mono text-xs font-bold text-white shadow-2xs">
              {String(item.orderInLab).padStart(2, '0')}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${familyBadgeStyle}`}
            >
              عائلة {item.family}
            </span>
            <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-[var(--text-muted)]">
              {item.categoryLabel}
            </span>
            <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)]">
              {item.syntaxLabel}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] pt-1">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-5">
            {item.subtitle}
          </p>
        </div>

        {/* Link to Published Topic in Path */}
        <div className="shrink-0">
          {topicInfo.isAvailable ? (
            <Link
              href={topicInfo.url}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>موضوع {topicInfo.sequencePosition} في المسار</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>{topicInfo.statusText}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Core Question Answered (Distinct Callout) */}
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 sm:p-5 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-black text-emerald-800 dark:text-emerald-300">
            السؤال المحوري الذي يجيب عنه المخطط:
          </span>
          <p className="text-base sm:text-lg font-black text-emerald-950 dark:text-emerald-100">
            «{item.coreQuestion}»
          </p>
        </div>
      </div>

      {/* 3. Purpose & When to Choose Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Purpose */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4 sm:p-5 space-y-2">
          <h4 className="text-xs sm:text-sm font-black text-[var(--text-main)] flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[var(--brand-primary)]" />
            <span>الغرض الهندسي الأساسي:</span>
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-6">
            {item.purpose}
          </p>
        </div>

        {/* When to Choose */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4 sm:p-5 space-y-2">
          <h4 className="text-xs sm:text-sm font-black text-[var(--text-main)] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>متى تختار هذا المخطط؟ (أسئلة القرار):</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
            {item.whenToChoose.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">▪</span>
                <span className="leading-5">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Dependencies strip */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] bg-[var(--bg-surface)] p-3 rounded-xl border border-[var(--border-color)]">
        <span className="font-bold flex items-center gap-1 text-[var(--text-main)]">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          <span>المدخلات والتبعيات السابقة:</span>
        </span>
        {item.inputDependencies.map((dep, idx) => (
          <span
            key={idx}
            className="rounded-lg bg-[var(--bg-card-subtle)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-main)] border border-[var(--border-color)]"
            dir="ltr"
          >
            {dep}
          </span>
        ))}
      </div>

      {/* 5. Live Interactive Renderer & Code Component */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)]">
          <span>معاينة وتجربة المخطط ومصدره:</span>
          <span className="font-mono text-[11px] text-[var(--text-faint)]">
            {item.supportsMermaidRender ? 'Mermaid Live Rendered' : `${item.family} Dedicated Editor`}
          </span>
        </div>
        <DiagramRenderer item={item} />
      </div>

      {/* 6. Footer Navigation CTA */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-color)] text-xs">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <span>المحرر المعتمد:</span>
          <a
            href={item.editor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <span>{item.editor.name}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {topicInfo.isAvailable && (
          <Link
            href={topicInfo.url}
            className="font-bold text-[var(--brand-primary)] hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
          >
            <span>انتقل للموضوع التفصيلي: {topicInfo.title}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        )}
      </div>
    </article>
  );
};
