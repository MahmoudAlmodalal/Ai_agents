import React from 'react';
import { motion } from 'motion/react';
import { History, Clock } from 'lucide-react';
import { TopicItem } from '@/src/types/topic.ts';
import { formatReadingTime } from '@/src/utils/searchUtils.ts';

interface RecentlyViewedSectionProps {
  topics: TopicItem[];
  onOpenTopic: (topicId: string) => void;
  onClear: () => void;
  bookmarks: string[];
  onToggleBookmark: (topicId: string) => void;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  topics,
  onOpenTopic,
  onClear,
  bookmarks,
  onToggleBookmark,
}) => {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="المواضيع التي شاهدتها مؤخراً"
      className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xs no-print transition-all"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-[var(--brand-primary)] flex items-center justify-center text-sm shadow-2xs">
            <History className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
                شوهدت مؤخراً
              </h3>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border border-[var(--border-color)]">
                {topics.length} من 5
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] hidden sm:block">
              آخر 5 مواضيع قمت بالاطلاع عليها في نافذة القراءة للعودة السريعة
            </p>
          </div>
        </div>

        <button
          onClick={onClear}
          title="مسح سجل المشاهدات الأخيرة"
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[var(--text-muted)] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer shrink-0 font-medium border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="text-xs">مسح السجل</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {topics.map((topic, index) => {
          const isBookmarked = bookmarks.includes(topic.slug) || bookmarks.includes(topic.id);

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              className="group flex flex-col justify-between p-3 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--brand-primary)] transition-colors duration-200 shadow-2xs hover:shadow-md relative"
            >
              <div>
                {/* Header row: Number, stage tag & heart */}
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-blue-600 dark:bg-blue-800 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      {topic.number}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--brand-primary)] truncate">
                      {topic.stageTag}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(topic.slug || topic.id)}
                    type="button"
                    title={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                    aria-label={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                    className={`min-w-9 min-h-9 w-9 h-9 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0 relative z-10 ${
                      isBookmarked
                        ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                        : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill={isBookmarked ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={isBookmarked ? '0' : '2'}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Title */}
                <button
                  onClick={() => onOpenTopic(topic.slug || topic.id)}
                  type="button"
                  className="w-full text-right cursor-pointer"
                >
                  <h4 className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2 leading-snug mb-2">
                    {topic.title}
                  </h4>
                </button>
              </div>

              {/* Footer info: Reading time & Open prompt */}
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{formatReadingTime(topic.readingTimeMinutes)}</span>
                </span>
                <button
                  onClick={() => onOpenTopic(topic.slug || topic.id)}
                  type="button"
                  className="font-semibold text-[var(--brand-primary)] flex items-center gap-0.5 cursor-pointer min-h-9 px-2"
                >
                  <span>فتح</span>
                  <span>←</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
