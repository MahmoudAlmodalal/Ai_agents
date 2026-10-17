import React from 'react';
import { motion } from 'motion/react';
import { Clock, BarChart3, MessageSquare, Code2, CheckSquare, Headphones, Volume2, Printer } from 'lucide-react';
import { TopicItem } from '@/src/types/topic.ts';
import { normalizeArabic, formatReadingTime } from '@/src/utils/searchUtils.ts';

interface TopicCardProps {
  topic: TopicItem;
  searchQuery: string;
  onOpenTopic: (topicId: string) => void;
  onListenTopic: (topic: TopicItem) => void;
  isCurrentlySpeaking: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (topicId: string) => void;
}

/**
 * Highlights matches of query within a text string safely
 */
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query || !query.trim()) {
    return <>{text}</>;
  }

  const normQuery = normalizeArabic(query.trim());
  const words = text.split(/(\s+)/);

  return (
    <>
      {words.map((word, idx) => {
        const normWord = normalizeArabic(word);
        const matches = normWord.includes(normQuery);

        return matches ? (
          <mark
            key={idx}
            className="bg-yellow-200 dark:bg-yellow-900/60 text-slate-900 dark:text-yellow-100 rounded-xs px-0.5 font-bold"
          >
            {word}
          </mark>
        ) : (
          <React.Fragment key={idx}>{word}</React.Fragment>
        );
      })}
    </>
  );
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  searchQuery,
  onOpenTopic,
  onListenTopic,
  isCurrentlySpeaking,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article className="topic-card group flex flex-col justify-between bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--brand-primary)] rounded-2xl p-4 sm:p-5 transition-all duration-200 ease-out shadow-xs hover:shadow-lg hover:scale-[1.015] hover:-translate-y-0.5 relative will-change-transform">
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Badge & Stage Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs select-none">
              {topic.number}
            </span>
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs font-bold text-[var(--brand-primary)] block truncate">
                {topic.stageTag}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-muted)] truncate">
                <span className="truncate">{topic.categoryName}</span>
                <span aria-hidden="true" className="opacity-40 shrink-0">·</span>
                <span className="inline-flex items-center gap-0.5 text-slate-700 dark:text-slate-300 font-medium shrink-0" title={`وقت القراءة التقديري: ${formatReadingTime(topic.readingTimeMinutes)}`}>
                  <Clock className="w-3 h-3" />
                  <span>{formatReadingTime(topic.readingTimeMinutes)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions: Bookmark Heart & Listen Button */}
          <div className="topic-card-actions flex items-center gap-1.5 shrink-0">
            {/* Bookmark Heart Button */}
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`w-8 h-8 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                isBookmarked
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 shadow-2xs scale-105'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50'
              }`}
              title={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
              aria-label={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                animate={isBookmarked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-current text-rose-500' : 'fill-none stroke-current stroke-2'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </motion.svg>
            </button>

            {/* Quick listen button */}
            <button
              onClick={() => onListenTopic(topic)}
              className={`h-8 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                isCurrentlySpeaking
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]'
              }`}
              title="الاستماع الصوتي لهذا الموضوع"
              aria-label={`الاستماع الصوتي للموضوع ${topic.number}`}
            >
              {isCurrentlySpeaking ? <Volume2 className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-medium hidden xs:inline">
                {isCurrentlySpeaking ? 'يقرأ' : 'استماع'}
              </span>
            </button>

            {/* Quick Diagram Button */}
            <button
              onClick={() => onOpenTopic(topic.id)}
              className="h-8 px-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all cursor-pointer flex items-center gap-1 no-print"
              title="عرض المخطط البياني التفاعلي (Mermaid.js)"
              aria-label={`عرض المخطط البياني للموضوع ${topic.number}`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium hidden xs:inline">مخطط</span>
            </button>

            {/* Quick Print PDF Button */}
            <button
              onClick={() => {
                onOpenTopic(topic.id);
                setTimeout(() => window.print(), 350);
              }}
              className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all cursor-pointer flex items-center justify-center no-print"
              title="طباعة أو تصدير كملف PDF"
              aria-label={`طباعة الموضوع ${topic.number} كملف PDF`}
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug mb-1">
          <HighlightedText text={topic.title} query={searchQuery} />
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[var(--brand-primary)] font-medium mb-2 truncate">
          <HighlightedText text={topic.subtitle} query={searchQuery} />
        </p>

        {/* Summary */}
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">
          <HighlightedText text={topic.summary} query={searchQuery} />
        </p>
      </div>

      {/* Bottom Zone: Content Stats, Tags & Primary Action */}
      <div className="pt-2.5 border-t border-[var(--border-color)]/70 mt-auto space-y-2.5">
        {/* Content Indicators */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-muted)] font-medium">
          <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold" title={`وقت القراءة التقديري: ${formatReadingTime(topic.readingTimeMinutes)}`}>
            <Clock className="w-3 h-3" />
            <span>{formatReadingTime(topic.readingTimeMinutes)}</span>
          </span>
          <span
            className="inline-flex items-center gap-1 text-sky-700 dark:text-sky-400 font-medium"
            title="مخططات Mermaid تفاعلية متوفرة بـ 3 زوايا هندسية (بنية النظام، مسار العمليات، تسلسل التفاعلات)"
          >
            <BarChart3 className="w-3 h-3" />
            <span>مخطط Mermaid</span>
          </span>
          {topic.promptCount > 0 && (
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <MessageSquare className="w-3 h-3" />
              <span>{topic.promptCount} برومبتات</span>
            </span>
          )}
          {topic.codeSnippetCount > 0 && (
            <span className="inline-flex items-center gap-1 text-indigo-700 dark:text-indigo-400">
              <Code2 className="w-3 h-3" />
              <span>{topic.codeSnippetCount} أكواد</span>
            </span>
          )}
          {topic.checklistCount > 0 && (
            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
              <CheckSquare className="w-3 h-3" />
              <span>{topic.checklistCount} بنود</span>
            </span>
          )}
        </div>

        {/* Tags Rail */}
        <div className="flex flex-wrap items-center gap-1">
          {topic.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              dir="auto"
              className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card-subtle)] border border-[var(--border-color)]"
            >
              {tag}
            </span>
          ))}
          {topic.tags.length > 3 && (
            <span className="text-[10px] text-[var(--text-faint)] font-mono px-1">
              +{topic.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Button: Touch Target >= 40px */}
        <button
          onClick={() => onOpenTopic(topic.id)}
          className="w-full h-10 px-3 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--brand-primary)] text-[var(--text-main)] hover:text-white border border-[var(--border-color)] hover:border-[var(--brand-primary)] text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>تصفح الموضوع بالتفصيل</span>
          <span className="text-xs transition-transform group-hover:-translate-x-1">←</span>
        </button>
      </div>
    </article>
  );
};
