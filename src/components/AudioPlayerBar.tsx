import React from 'react';
import { TopicItem } from '@/src/types/topic.ts';
import { stripHtml } from '@/src/utils/searchUtils.ts';

interface AudioPlayerBarProps {
  currentTopic: TopicItem | null;
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  rate: number;
  onRateChange: (rate: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTopic,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrev,
  onClose,
  rate,
  onRateChange,
}) => {
  if (!currentTopic && !isPlaying) return null;

  return (
    <aside
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-3 sm:px-5 sm:py-3.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
      aria-label="مشغل القراءة الصوتية الذكية"
    >
      {/* Left: Indicator & Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Animated Sound Wave */}
        <div className="flex items-end gap-0.5 h-5 w-6 shrink-0" aria-hidden="true">
          <span
            className={`w-1 rounded-full bg-[var(--brand-primary)] ${
              isPlaying && !isPaused ? 'animate-bounce h-5' : 'h-2'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-emerald-500 ${
              isPlaying && !isPaused ? 'animate-bounce delay-75 h-4' : 'h-1.5'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-[var(--brand-primary)] ${
              isPlaying && !isPaused ? 'animate-bounce delay-150 h-5' : 'h-3'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-emerald-500 ${
              isPlaying && !isPaused ? 'animate-bounce delay-200 h-3' : 'h-2'
            }`}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Web Speech API (مجاني)
            </span>
            {currentTopic && (
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                موضوع {currentTopic.number}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate max-w-xs sm:max-w-md">
            {currentTopic ? currentTopic.title : 'جاهز للقراءة الصوتية'}
          </p>
        </div>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onPrev}
          className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="الموضوع السابق"
        >
          ⏭️
        </button>

        {isPlaying && !isPaused ? (
          <button
            onClick={onPause}
            className="w-10 h-10 rounded-full bg-[var(--brand-primary)] hover:bg-blue-700 text-white flex items-center justify-center text-sm font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
            title="إيقاف مؤقت"
          >
            ⏸️
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="w-10 h-10 rounded-full bg-[var(--brand-primary)] hover:bg-blue-700 text-white flex items-center justify-center text-sm font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
            title="تشغيل القراءة"
          >
            ▶️
          </button>
        )}

        <button
          onClick={onStop}
          className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="إيقاف كامل"
        >
          ⏹️
        </button>

        <button
          onClick={onNext}
          className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="الموضوع التالي"
        >
          ⏮️
        </button>
      </div>

      {/* Right: Speed & Close */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <label htmlFor="tts-rate-select" className="text-[11px] text-[var(--text-muted)] font-medium">
            السرعة:
          </label>
          <select
            id="tts-rate-select"
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            className="text-xs bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-md px-1.5 py-1 text-[var(--text-main)] font-mono cursor-pointer focus:outline-none"
          >
            <option value="0.8">0.8x</option>
            <option value="1.0">1.0x</option>
            <option value="1.2">1.2x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[var(--text-muted)] hover:text-red-600 transition-colors cursor-pointer text-xs"
          title="إغلاق المشغل"
        >
          ✕
        </button>
      </div>
    </aside>
  );
};
