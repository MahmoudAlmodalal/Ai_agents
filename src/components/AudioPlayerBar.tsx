import React from 'react';
import { motion } from 'motion/react';
import { SkipBack, SkipForward, Play, Pause, Square, X } from 'lucide-react';
import { TopicItem } from '@/src/types/topic.ts';

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
    <motion.aside
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-2xl bg-[var(--bg-surface)]/95 border border-[var(--border-color)] rounded-2xl shadow-2xl p-2.5 sm:px-4 sm:py-3 backdrop-blur-md flex items-center justify-between gap-2 transition-all no-print audio-player-bar"
      aria-label="مشغل القراءة الصوتية الذكية"
    >
      {/* Left: Indicator & Title */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
        {/* Animated Sound Wave */}
        <div className="flex items-end gap-0.5 h-4 sm:h-5 w-5 shrink-0" aria-hidden="true">
          <span
            className={`w-0.5 sm:w-1 rounded-full bg-[var(--brand-primary)] ${
              isPlaying && !isPaused ? 'equalizer-bar-1 h-4 sm:h-5' : 'h-1.5'
            }`}
          />
          <span
            className={`w-0.5 sm:w-1 rounded-full bg-emerald-500 ${
              isPlaying && !isPaused ? 'equalizer-bar-2 h-3 sm:h-4' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 sm:w-1 rounded-full bg-[var(--brand-primary)] ${
              isPlaying && !isPaused ? 'equalizer-bar-3 h-4 sm:h-5' : 'h-2'
            }`}
          />
        </div>

        <div className="min-w-0">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block truncate">
            {currentTopic ? `موضوع ${currentTopic.number}` : 'القارئ الصوتي'}
          </span>
          <p className="text-xs font-bold text-[var(--text-main)] truncate max-w-[120px] xs:max-w-[170px] sm:max-w-xs">
            {currentTopic ? currentTopic.title : 'جاهز للقراءة'}
          </p>
        </div>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onPrev}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] flex items-center justify-center text-[10px] sm:text-xs transition-colors cursor-pointer"
          title="الموضوع السابق"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        {isPlaying && !isPaused ? (
          <button
            onClick={onPause}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--brand-primary)] hover:bg-blue-700 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
            title="إيقاف مؤقت"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--brand-primary)] hover:bg-blue-700 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
            title="تشغيل القراءة"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </button>
        )}

        <button
          onClick={onStop}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] flex items-center justify-center text-[10px] sm:text-xs transition-colors cursor-pointer"
          title="إيقاف كامل"
        >
          <Square className="w-3 h-3 fill-current" />
        </button>

        <button
          onClick={onNext}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] flex items-center justify-center text-[10px] sm:text-xs transition-colors cursor-pointer"
          title="الموضوع التالي"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Speed & Close */}
      <div className="flex items-center gap-1 shrink-0">
        <select
          value={rate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
          className="text-[11px] sm:text-xs bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-lg px-1 py-0.5 text-[var(--text-main)] font-mono cursor-pointer focus:outline-none"
        >
          <option value="0.8">0.8x</option>
          <option value="1.0">1.0x</option>
          <option value="1.2">1.2x</option>
          <option value="1.5">1.5x</option>
        </select>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg text-[var(--text-muted)] hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer text-xs"
          title="إغلاق المشغل"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.aside>
  );
};
