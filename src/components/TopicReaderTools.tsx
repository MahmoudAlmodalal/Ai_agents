'use client';

import React from 'react';
import { Headphones, Heart, Pause, Play, Printer, Square } from 'lucide-react';
import type { TopicItem } from '@/src/types/topic';
import {
  readSavedBookmarks,
  writeSavedBookmarks,
  readSavedRecentlyViewed,
  writeSavedRecentlyViewed,
  getSavedBookmarksStatus,
  subscribeTopicStorage,
  type TopicStorageStatus,
} from '@/src/lib/topicRegistry';
import { stripHtml } from '@/src/utils/searchUtils';
import { useToast } from '@/src/components/Toast';
import { LearnerPersistenceNotice } from '@/src/components/LearnerPersistenceNotice';

export function TopicReaderTools({ topic }: { topic: TopicItem }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [storageStatus, setStorageStatus] = React.useState<TopicStorageStatus>('loading');
  const [audioState, setAudioState] = React.useState<'stopped' | 'playing' | 'paused'>('stopped');
  const [audioSupported, setAudioSupported] = React.useState(false);
  const { showToast } = useToast();

  React.useEffect(() => {
    const update = () => {
      setIsBookmarked(readSavedBookmarks().includes(topic.slug));
      setStorageStatus(getSavedBookmarksStatus());
    };
    update();
    writeSavedRecentlyViewed([topic.slug, ...readSavedRecentlyViewed().filter((slug) => slug !== topic.slug)]);
    setAudioSupported('speechSynthesis' in window);
    setAudioState('stopped');
    const unsub = subscribeTopicStorage(update);
    window.addEventListener('storage', update);
    return () => {
      unsub();
      window.removeEventListener('storage', update);
      window.speechSynthesis?.cancel();
    };
  }, [topic.slug]);

  const toggleBookmark = () => {
    const saved = readSavedBookmarks();
    const updated = saved.includes(topic.slug) ? saved.filter((slug) => slug !== topic.slug) : [...saved, topic.slug];
    writeSavedBookmarks(updated);
    setStorageStatus(getSavedBookmarksStatus());
    setIsBookmarked(updated.includes(topic.slug));
  };

  const toggleAudio = () => {
    if (audioState === 'playing') {
      window.speechSynthesis.pause();
      setAudioState('paused');
      return;
    }
    if (audioState === 'paused') {
      window.speechSynthesis.resume();
      setAudioState('playing');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${topic.title}. ${topic.subtitle}. ${topic.summary}. ${stripHtml(topic.htmlContent).slice(0, 1500)}`);
    utterance.lang = 'ar-SA';
    utterance.onend = () => setAudioState('stopped');
    utterance.onerror = (event) => {
      setAudioState('stopped');
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        showToast('تعذّر تشغيل القراءة الصوتية في هذا المتصفح.', 'error');
      }
    };
    window.speechSynthesis.speak(utterance);
    setAudioState('playing');
  };

  const buttonClass = 'inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 text-xs font-bold text-[var(--text-main)] hover:border-[var(--brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]';

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 no-print" aria-label="أدوات قراءة الموضوع">
      <button type="button" onClick={toggleBookmark} aria-pressed={isBookmarked} className={buttonClass}>
        <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} aria-hidden="true" />
        {isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
      </button>
      <button type="button" onClick={() => window.print()} className={buttonClass}>
        <Printer className="h-4 w-4" aria-hidden="true" /> طباعة كملف PDF
      </button>
      {audioSupported && (
        <>
          <button type="button" onClick={toggleAudio} className={buttonClass}>
            {audioState === 'playing' ? <Pause className="h-4 w-4" aria-hidden="true" /> : audioState === 'paused' ? <Play className="h-4 w-4" aria-hidden="true" /> : <Headphones className="h-4 w-4" aria-hidden="true" />}
            {audioState === 'playing' ? 'إيقاف مؤقت' : audioState === 'paused' ? 'استئناف الاستماع' : 'الاستماع للمقدمة'}
          </button>
          {audioState !== 'stopped' && (
            <button type="button" onClick={() => { window.speechSynthesis.cancel(); setAudioState('stopped'); }} className={buttonClass}>
              <Square className="h-4 w-4" aria-hidden="true" /> إيقاف القراءة
            </button>
          )}
        </>
      )}
      <LearnerPersistenceNotice status={storageStatus} showExplanation={false} className="mt-2 w-full" />
    </div>
  );
}
