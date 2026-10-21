import React from 'react';
import { LayoutGrid, BarChart3, MessageSquare, Code2, CheckSquare, BookOpen, Heart } from 'lucide-react';
import { TopicCategory, ContentType } from '@/src/types/topic.ts';
import { CATEGORY_METADATA } from '@/src/data/topicsData.ts';

interface FilterToolbarProps {
  selectedCategory: TopicCategory;
  onSelectCategory: (category: TopicCategory) => void;
  selectedContentType: ContentType;
  onSelectContentType: (contentType: ContentType) => void;
  totalTopicsCount: number;
  filteredCount: number;
  searchQuery: string;
  onResetFilters: () => void;
  bookmarksCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  categoryCounts?: Record<TopicCategory, number>;
}

const CONTENT_TYPE_ICONS: Record<ContentType, React.ReactNode> = {
  all: <LayoutGrid className="w-3.5 h-3.5" />,
  diagram: <BarChart3 className="w-3.5 h-3.5" />,
  prompt: <MessageSquare className="w-3.5 h-3.5" />,
  code: <Code2 className="w-3.5 h-3.5" />,
  checklist: <CheckSquare className="w-3.5 h-3.5" />,
  glossary: <BookOpen className="w-3.5 h-3.5" />,
};

const CONTENT_TYPES: { id: ContentType; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'diagram', label: 'مخططات' },
  { id: 'prompt', label: 'برومبتات' },
  { id: 'code', label: 'أكواد' },
  { id: 'checklist', label: 'قوائم فحص' },
  { id: 'glossary', label: 'مصطلحات' },
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
  bookmarksCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  categoryCounts,
}) => {
  const isFiltered =
    selectedCategory !== 'all' ||
    selectedContentType !== 'all' ||
    searchQuery.trim().length > 0 ||
    showFavoritesOnly;

  return (
    <div className="filter-toolbar bg-[var(--bg-surface)] border-b border-[var(--border-color)] py-2.5 px-3 sm:px-6 lg:px-8 transition-colors no-print">
      <div className="max-w-7xl mx-auto space-y-2">
        {/* Row 1: Categories & Favorites Swipeable Chips */}
        <div className="category-row flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
          {/* Favorites Dedicated Chip */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`h-8 sm:h-9 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              showFavoritesOnly
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/40'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>المفضلة</span>
            <span
              className={`text-[10px] px-1 rounded-md font-mono ${
                showFavoritesOnly ? 'bg-white/20 text-white' : 'bg-rose-200/50 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
              }`}
            >
              {bookmarksCount}
            </span>
          </button>

          <span className="h-4 w-px bg-[var(--border-color)] mx-0.5 shrink-0" aria-hidden="true" />

          {CATEGORY_METADATA.map((cat) => {
            const active = !showFavoritesOnly && selectedCategory === cat.id;
            const count = categoryCounts?.[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (showFavoritesOnly) onToggleFavoritesOnly();
                  onSelectCategory(cat.id);
                }}
                className={`h-8 sm:h-9 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  active
                    ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white shadow-2xs'
                    : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-color)]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1 rounded-md font-mono ${
                    active ? 'bg-white/20 text-white' : 'text-[var(--text-faint)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Content Types & Results Status */}
        <div className="type-row flex items-center justify-between gap-2 pt-1 border-t border-[var(--border-color)]/60 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {CONTENT_TYPES.map((type) => {
              const active = selectedContentType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => onSelectContentType(type.id)}
                  className={`h-7 px-2.5 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                    active
                      ? 'bg-[var(--brand-light)] text-[var(--brand-primary)] border-[var(--brand-border)] font-bold'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
                  }`}
                >
                  {CONTENT_TYPE_ICONS[type.id]}
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Badge */}
          <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-[var(--text-muted)] font-medium">
            <span>
              {showFavoritesOnly ? (
                <span className="text-rose-600 dark:text-rose-400 font-bold">المفضلة: </span>
              ) : null}
              <strong className="text-[var(--text-main)] font-mono">{filteredCount}</strong>/{totalTopicsCount}
            </span>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer"
              >
                مسح
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
