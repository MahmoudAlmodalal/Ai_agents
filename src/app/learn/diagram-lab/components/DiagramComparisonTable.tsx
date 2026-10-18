'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DiagramLabItem,
  DiagramFamily,
  resolveDiagramTopicLink,
} from '@/src/data/diagram-lab.ts';
import { ExternalLink, BookOpen, Check, X, Filter } from 'lucide-react';

interface DiagramComparisonTableProps {
  items: DiagramLabItem[];
}

export const DiagramComparisonTable: React.FC<DiagramComparisonTableProps> = ({ items }) => {
  const [familyFilter, setFamilyFilter] = useState<'ALL' | DiagramFamily>('ALL');

  const filteredItems = items.filter((item) => {
    if (familyFilter === 'ALL') return true;
    return item.family === familyFilter;
  });

  return (
    <div className="space-y-4" dir="rtl">
      {/* Table Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-xs font-bold text-[var(--text-main)]">تصفية حسب عائلة الصيغة:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFamilyFilter('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              familyFilter === 'ALL'
                ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white border-[var(--brand-primary)] dark:border-[#162c46]'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            الكل ({items.length})
          </button>
          <button
            onClick={() => setFamilyFilter('Mermaid')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              familyFilter === 'Mermaid'
                ? 'bg-blue-600 dark:bg-blue-800 text-white border-blue-600 dark:border-blue-800'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            Mermaid ({items.filter((i) => i.family === 'Mermaid').length})
          </button>
          <button
            onClick={() => setFamilyFilter('PlantUML')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              familyFilter === 'PlantUML'
                ? 'bg-purple-600 dark:bg-purple-800 text-white border-purple-600 dark:border-purple-800'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            PlantUML ({items.filter((i) => i.family === 'PlantUML').length})
          </button>
          <button
            onClick={() => setFamilyFilter('DBML')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              familyFilter === 'DBML'
                ? 'bg-emerald-600 dark:bg-emerald-800 text-white border-emerald-600 dark:border-emerald-800'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            DBML ({items.filter((i) => i.family === 'DBML').length})
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[var(--bg-card-subtle)] border-b border-[var(--border-color)] text-xs font-bold text-[var(--text-muted)]">
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4 min-w-[160px]">نوع المخطط</th>
                <th className="p-4 min-w-[220px]">السؤال المحوري الذي يجيب عنه</th>
                <th className="p-4 min-w-[140px]">عائلة الصيغة</th>
                <th className="p-4 min-w-[130px] text-center">التصيير في العارض</th>
                <th className="p-4 min-w-[160px]">المحرر المعتمد</th>
                <th className="p-4 min-w-[160px]">المدخلات والتبعيات</th>
                <th className="p-4 min-w-[140px] text-center">الموضوع بالمسار</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-xs">
              {filteredItems.map((item) => {
                const topicInfo = resolveDiagramTopicLink(item);
                const familyStyle =
                  item.family === 'Mermaid'
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900'
                    : item.family === 'PlantUML'
                    ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[var(--bg-card-subtle)]/60 transition-colors"
                  >
                    {/* Index */}
                    <td className="p-4 text-center font-mono font-bold text-[var(--text-muted)]">
                      {String(item.orderInLab).padStart(2, '0')}
                    </td>

                    {/* Name */}
                    <td className="p-4">
                      <div className="font-black text-[var(--text-main)] text-sm">{item.name}</div>
                      <div className="text-xs text-[var(--text-muted)] leading-4">{item.title}</div>
                    </td>

                    {/* Core Question */}
                    <td className="p-4">
                      <div className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 p-2 rounded-xl border border-emerald-200 dark:border-emerald-900 leading-5">
                        {item.coreQuestion}
                      </div>
                    </td>

                    {/* Family */}
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg font-bold border text-xs ${familyStyle}`}>
                        {item.family}
                      </span>
                      <div className="font-mono text-[10px] text-[var(--text-muted)] mt-1" dir="ltr">
                        {item.syntaxLabel}
                      </div>
                    </td>

                    {/* Rendered in Browser? */}
                    <td className="p-4 text-center">
                      {item.supportsMermaidRender ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full text-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>نعم (Mermaid)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full text-xs">
                          <X className="w-3.5 h-3.5" />
                          <span>محرر خارجي</span>
                        </span>
                      )}
                    </td>

                    {/* Dedicated Editor */}
                    <td className="p-4">
                      <a
                        href={item.editor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      >
                        <span>{item.editor.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        {item.editor.description}
                      </p>
                    </td>

                    {/* Dependencies */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.inputDependencies.map((dep, idx) => (
                          <span
                            key={idx}
                            className="bg-[var(--bg-card-subtle)] text-[var(--text-muted)] px-1.5 py-0.5 rounded text-[10px] border border-[var(--border-color)]"
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Topic Link */}
                    <td className="p-4 text-center">
                      {topicInfo.isAvailable ? (
                        <Link
                          href={topicInfo.url}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-emerald-500 hover:text-emerald-600 font-bold text-xs transition-colors"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>موضوع {topicInfo.sequencePosition}</span>
                        </Link>
                      ) : (
                        <span className="text-[10px] text-amber-600">قيد الإعداد</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
