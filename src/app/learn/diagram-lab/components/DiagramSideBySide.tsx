'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DiagramLabItem,
  resolveDiagramTopicLink,
} from '@/src/data/diagram-lab.ts';
import {
  ArrowLeftRight,
  HelpCircle,
  Target,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
} from 'lucide-react';

interface DiagramSideBySideProps {
  items: DiagramLabItem[];
}

interface PresetComparison {
  id: string;
  title: string;
  diagramAId: string;
  diagramBId: string;
  keyTakeaway: string;
}

const PRESET_COMPARISONS: PresetComparison[] = [
  {
    id: 'userflow-vs-sequence',
    title: 'User Flow مقابل Sequence Diagram',
    diagramAId: 'user-flow',
    diagramBId: 'sequence',
    keyTakeaway:
      'User Flow يركز على رحلة المستخدم البشرية وقراراته البديلة قبل الواجهات؛ بينما Sequence Diagram يركز على التبادل التقني الزمني للرسائل بين الخدمات والـ API ومخزن البيانات.',
  },
  {
    id: 'domain-vs-erd',
    title: 'Domain Model مقابل ERD',
    diagramAId: 'domain-model',
    diagramBId: 'erd',
    keyTakeaway:
      'Domain Model مفاهيمي خالص بمصطلحات الأعمال دون حقول أجنبية أو أنواع بيانات؛ بينما ERD تصميم تقني لجداول قواعد البيانات يحدد PK وFK والتطبيع 3NF وسلامة المراجع.',
  },
  {
    id: 'erd-seq-vs-class',
    title: 'ERD وSequence كمدخلات لـ Class Diagram',
    diagramAId: 'erd',
    diagramBId: 'class',
    keyTakeaway:
      'يسبق ERD وSequence مخطط الكلاسات (Class Diagram)؛ حيث يوفر ERD هيكلية البيانات ويوفر Sequence استدعاءات العمليات التي تصبح دوالاً ومناهج برمجية داخل الكلاسات.',
  },
  {
    id: 'usecase-vs-activity',
    title: 'Use Case مقابل Activity Diagram',
    diagramAId: 'use-case',
    diagramBId: 'activity',
    keyTakeaway:
      'Use Case يحدد الفواعل وما يحق لهم فعله وحدود النظام بصيغة PlantUML؛ بينما Activity Diagram يوضح الخوارزمية الإجرائية التفصيلية وتفرعات القرارات أثناء تنفيذ العملية.',
  },
];

export const DiagramSideBySide: React.FC<DiagramSideBySideProps> = ({ items }) => {
  const [diagramAId, setDiagramAId] = useState<string>('user-flow');
  const [diagramBId, setDiagramBId] = useState<string>('sequence');

  const diagramA = items.find((i) => i.id === diagramAId) || items[0];
  const diagramB = items.find((i) => i.id === diagramBId) || items[4];

  const topicA = resolveDiagramTopicLink(diagramA);
  const topicB = resolveDiagramTopicLink(diagramB);

  const applyPreset = (preset: PresetComparison) => {
    setDiagramAId(preset.diagramAId);
    setDiagramBId(preset.diagramBId);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Presets Header */}
      <div className="p-5 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-black text-[var(--text-main)]">
            مقارنات منهجية شائعة (اختر مقارنة جاهزة):
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_COMPARISONS.map((preset) => {
            const isActive =
              diagramAId === preset.diagramAId && diagramBId === preset.diagramBId;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-3 rounded-2xl text-right transition-all border cursor-pointer ${
                  isActive
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-black shadow-2xs'
                    : 'border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)]/40 font-medium'
                }`}
              >
                <div className="text-xs font-bold leading-5">{preset.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selector A */}
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
          <label
            htmlFor="select-diagram-a"
            className="text-xs font-bold text-[var(--text-muted)] block"
          >
            المخطط الأول (الطرف الأيمن):
          </label>
          <select
            id="select-diagram-a"
            value={diagramAId}
            onChange={(e) => setDiagramAId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-xs font-bold text-[var(--text-main)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.orderInLab}. {item.title} ({item.family})
              </option>
            ))}
          </select>
        </div>

        {/* Selector B */}
        <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
          <label
            htmlFor="select-diagram-b"
            className="text-xs font-bold text-[var(--text-muted)] block"
          >
            المخطط الثاني (الطرف الأيسر):
          </label>
          <select
            id="select-diagram-b"
            value={diagramBId}
            onChange={(e) => setDiagramBId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-xs font-bold text-[var(--text-main)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.orderInLab}. {item.title} ({item.family})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Cards Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Column A */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-7 space-y-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-bold text-[var(--text-muted)]">
                المخطط #{diagramA.orderInLab}
              </span>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-bold border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                {diagramA.family}
              </span>
            </div>

            <h4 className="text-xl font-black text-[var(--text-main)]">
              {diagramA.title}
            </h4>

            {/* Core Question */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
              <div className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>السؤال الذي يجيب عنه:</span>
              </div>
              <p className="text-sm font-black text-emerald-950 dark:text-emerald-100">
                «{diagramA.coreQuestion}»
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                <span>الغرض الهندسي:</span>
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-6">
                {diagramA.purpose}
              </p>
            </div>

            {/* When to choose */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-[var(--text-main)]">
                متى تختاره؟
              </span>
              <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                {diagramA.whenToChoose.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">▪</span>
                    <span className="leading-5">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input dependencies */}
            <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text-main)] block mb-1">
                المدخلات والتبعيات:
              </span>
              <div className="flex flex-wrap gap-1">
                {diagramA.inputDependencies.map((dep, idx) => (
                  <span
                    key={idx}
                    className="bg-[var(--bg-surface)] px-2 py-0.5 rounded text-xs border border-[var(--border-color)] font-mono"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="space-y-1 pt-2" dir="ltr">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>{diagramA.syntaxLabel}</span>
                <span className="text-[10px] text-slate-500">
                  {diagramA.supportsMermaidRender ? 'Mermaid Compatible' : 'External Editor'}
                </span>
              </div>
              <pre className="font-mono text-xs text-emerald-300 bg-slate-950 p-3.5 rounded-xl overflow-x-auto max-h-48 border border-slate-800 leading-5">
                <code>{diagramA.sourceCode}</code>
              </pre>
            </div>
          </div>

          {/* Links Footer */}
          <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <a
              href={diagramA.editor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              <span>{diagramA.editor.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {topicA.isAvailable && (
              <Link
                href={topicA.url}
                className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                <BookOpen className="w-3 h-3" />
                <span>موضوع {topicA.sequencePosition} في المسار</span>
              </Link>
            )}
          </div>
        </div>

        {/* Column B */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-7 space-y-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-bold text-[var(--text-muted)]">
                المخطط #{diagramB.orderInLab}
              </span>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-bold border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                {diagramB.family}
              </span>
            </div>

            <h4 className="text-xl font-black text-[var(--text-main)]">
              {diagramB.title}
            </h4>

            {/* Core Question */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
              <div className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>السؤال الذي يجيب عنه:</span>
              </div>
              <p className="text-sm font-black text-emerald-950 dark:text-emerald-100">
                «{diagramB.coreQuestion}»
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                <span>الغرض الهندسي:</span>
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-6">
                {diagramB.purpose}
              </p>
            </div>

            {/* When to choose */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-[var(--text-main)]">
                متى تختاره؟
              </span>
              <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                {diagramB.whenToChoose.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">▪</span>
                    <span className="leading-5">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input dependencies */}
            <div className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text-main)] block mb-1">
                المدخلات والتبعيات:
              </span>
              <div className="flex flex-wrap gap-1">
                {diagramB.inputDependencies.map((dep, idx) => (
                  <span
                    key={idx}
                    className="bg-[var(--bg-surface)] px-2 py-0.5 rounded text-xs border border-[var(--border-color)] font-mono"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="space-y-1 pt-2" dir="ltr">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>{diagramB.syntaxLabel}</span>
                <span className="text-[10px] text-slate-500">
                  {diagramB.supportsMermaidRender ? 'Mermaid Compatible' : 'External Editor'}
                </span>
              </div>
              <pre className="font-mono text-xs text-emerald-300 bg-slate-950 p-3.5 rounded-xl overflow-x-auto max-h-48 border border-slate-800 leading-5">
                <code>{diagramB.sourceCode}</code>
              </pre>
            </div>
          </div>

          {/* Links Footer */}
          <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <a
              href={diagramB.editor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              <span>{diagramB.editor.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {topicB.isAvailable && (
              <Link
                href={topicB.url}
                className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                <BookOpen className="w-3 h-3" />
                <span>موضوع {topicB.sequencePosition} في المسار</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
