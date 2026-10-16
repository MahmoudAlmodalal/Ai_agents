import React from 'react';
import { TopicItem } from '@/src/types/topic.ts';
import { normalizeArabic } from '@/src/utils/searchUtils.ts';

interface TopicCardProps {
  topic: TopicItem;
  searchQuery: string;
  onOpenTopic: (topicId: string) => void;
  onListenTopic: (topic: TopicItem) => void;
  isCurrentlySpeaking: boolean;
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
}) => {
  return (
    <article className="group flex flex-col justify-between bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--brand-primary)] rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-md relative overflow-hidden">
      {/* Top Header Zone: Number & Stage */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-700 to-blue-500 text-white font-mono font-extrabold text-lg flex items-center justify-center shadow-xs">
              {topic.number}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
              <span className="text-[var(--brand-primary)] font-bold">{topic.stageTag}</span>
              <span aria-hidden="true">·</span>
              <span>{topic.categoryName}</span>
            </div>
          </div>

          {/* Quick listen button */}
          <button
            onClick={() => onListenTopic(topic)}
            className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isCurrentlySpeaking
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]'
            }`}
            title="الاستماع الصوتي لهذا الموضوع"
            aria-label={`الاستماع الصوتي للموضوع ${topic.number}`}
          >
            {isCurrentlySpeaking ? '🔊 جاري القراءة' : '🎧 استماع'}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug mb-1.5">
          <HighlightedText text={topic.title} query={searchQuery} />
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[var(--brand-primary)] font-semibold mb-3">
          <HighlightedText text={topic.subtitle} query={searchQuery} />
        </p>

        {/* Summary */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
          <HighlightedText text={topic.summary} query={searchQuery} />
        </p>
      </div>

      {/* Bottom Zone: Content Stats, Tags & Primary Action */}
      <div className="pt-4 border-t border-[var(--border-color)]/70 mt-auto space-y-3.5">
        {/* Content Indicators */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
          {topic.diagramCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-400">
              <span>📊</span>
              <span>{topic.diagramCount} مخططات</span>
            </span>
          )}
          {topic.promptCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
              <span>💬</span>
              <span>{topic.promptCount} برومبتات</span>
            </span>
          )}
          {topic.codeSnippetCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-indigo-700 dark:text-indigo-400">
              <span>💻</span>
              <span>{topic.codeSnippetCount} أكواد</span>
            </span>
          )}
          {topic.checklistCount > 0 && (
            <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
              <span>✅</span>
              <span>{topic.checklistCount} بنود فحص</span>
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {topic.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-card-subtle)] border border-[var(--border-color)]/80"
            >
              #{tag}
            </span>
          ))}
          {topic.tags.length > 4 && (
            <span className="text-[11px] text-[var(--text-faint)] font-mono">
              +{topic.tags.length - 4}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOpenTopic(topic.id)}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--brand-primary)] text-[var(--text-main)] hover:text-white border border-[var(--border-color)] hover:border-[var(--brand-primary)] text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-2xs group-hover:shadow-xs"
        >
          <span>تصفح محتويات الموضوع كاملاً</span>
          <span className="text-xs transition-transform group-hover:-translate-x-1">←</span>
        </button>
      </div>
    </article>
  );
};
