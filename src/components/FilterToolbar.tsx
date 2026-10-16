import React from 'react';
import { TopicCategory, ContentType } from '@/src/types/topic.ts';

interface FilterToolbarProps {
  selectedCategory: TopicCategory;
  onSelectCategory: (category: TopicCategory) => void;
  selectedContentType: ContentType;
  onSelectContentType: (contentType: ContentType) => void;
  totalTopicsCount: number;
  filteredCount: number;
  searchQuery: string;
  onResetFilters: () => void;
}

const CATEGORIES: { id: TopicCategory; label: string; count: number }[] = [
  { id: 'all', label: 'كافة الأقسام', count: 12 },
  { id: 'foundations', label: 'المرحلة التأسيسية', count: 3 },
  { id: 'architecture', label: 'المعمارية والنمذجة', count: 3 },
  { id: 'database', label: 'قواعد البيانات والأداء', count: 1 },
  { id: 'frontend', label: 'الواجهات والفرونت إند', count: 3 },
  { id: 'qa', label: 'الجودة والتحقق', count: 1 },
  { id: 'reference', label: 'المراجع والقاموس', count: 1 },
];

const CONTENT_TYPES: { id: ContentType; label: string; icon: string }[] = [
  { id: 'all', label: 'كل الأنواع', icon: '📑' },
  { id: 'diagram', label: 'مخططات هندسية', icon: '📊' },
  { id: 'prompt', label: 'برومبتات مهندسة', icon: '💬' },
  { id: 'code', label: 'أكواد وDBML', icon: '💻' },
  { id: 'checklist', label: 'قوائم فحص', icon: '✅' },
  { id: 'glossary', label: 'مصطلحات ومفاهيم', icon: '📖' },
];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedContentType,
  onSelectContentType,
  totalTopicsCount,
  filteredCount,
  searchQuery,
  onResetFilters,
}) => {
  const isFiltered = selectedCategory !== 'all' || selectedContentType !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="bg-[var(--bg-surface)] border-b border-[var(--border-color)] py-4 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-3.5">
        {/* Row 1: Categories Segmented Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[var(--text-muted)] shrink-0 ml-1 select-none">
            الأقسام:
          </span>
          <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-xl shrink-0">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    active
                      ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? 'bg-white/20 text-white' : 'bg-[var(--border-color)] text-[var(--text-muted)]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Content Types & Results Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[var(--border-color)]/60">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[var(--text-muted)] shrink-0 ml-1 select-none">
              نوع المحتوى:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {CONTENT_TYPES.map((type) => {
                const active = selectedContentType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => onSelectContentType(type.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      active
                        ? 'bg-[var(--brand-light)] text-[var(--brand-primary)] border-[var(--brand-border)] font-bold shadow-xs'
                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Counter & Reset */}
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] shrink-0 mr-auto sm:mr-0">
            <span>
              عرض <strong className="text-[var(--text-main)] font-mono">{filteredCount}</strong> من{' '}
              <span className="font-mono">{totalTopicsCount}</span> موضوعاً
            </span>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="px-2 py-0.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors font-semibold cursor-pointer"
              >
                ✕ إعادة ضبط
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
