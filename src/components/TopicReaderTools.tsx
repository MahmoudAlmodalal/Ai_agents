'use client';

import React from 'react';
import {
  Headphones,
  Heart,
  Pause,
  Play,
  Printer,
  Square,
  Download,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { TopicItem } from '@/src/types/topic';
import {
  getTopicOfflineStatus,
  getSavedTopicOfflinePayload,
  saveTopicOffline,
  removeTopicOffline,
  TopicOfflineStatus,
  OFFLINE_STORAGE_CHANGE_EVENT,
} from '@/src/lib/offlineStorage';
import { getTopicLearningContent } from '@/src/lib/learningContent';
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
  const [offlineStatus, setOfflineStatus] = React.useState<TopicOfflineStatus>('unsaved');
  const [offlineContentVersion, setOfflineContentVersion] = React.useState<number | null>(null);
  const [offlineQuizSaved, setOfflineQuizSaved] = React.useState(false);
  const [storageStatus, setStorageStatus] = React.useState<TopicStorageStatus>('loading');
  const [audioState, setAudioState] = React.useState<'stopped' | 'playing' | 'paused'>('stopped');
  const [audioSupported, setAudioSupported] = React.useState(false);
  const { showToast } = useToast();

  React.useEffect(() => {
    let active = true;
    let statusRevision = 0;
    const checkOffline = async () => {
      const revision = statusRevision;
      const status = await getTopicOfflineStatus(topic.slug);
      const payload = status === 'saved' ? await getSavedTopicOfflinePayload(topic.slug) : null;
      if (active && revision === statusRevision) {
        setOfflineStatus(status);
        setOfflineContentVersion(payload?.contentVersion ?? null);
        setOfflineQuizSaved(!!payload?.learningContent?.quiz);
      }
    };
    checkOffline();

    const handleOfflineEvent = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail && custom.detail.slug !== topic.slug) return;
      statusRevision += 1;
      const operationStatus = custom.detail?.status as TopicOfflineStatus | undefined;
      if (operationStatus === 'saving' || operationStatus === 'updating' || operationStatus === 'failed') {
        // These events describe the operation in progress/result. Reading the
        // prior active bundle here would hide a failed replacement as "saved".
        setOfflineStatus(operationStatus);
        return;
      }
      checkOffline();
    };
    window.addEventListener(OFFLINE_STORAGE_CHANGE_EVENT, handleOfflineEvent);

    return () => {
      active = false;
      window.removeEventListener(OFFLINE_STORAGE_CHANGE_EVENT, handleOfflineEvent);
    };
  }, [topic.slug]);

  const currentLearningContent = getTopicLearningContent(topic.slug);

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

  const handleSaveOffline = async () => {
    setOfflineStatus('saving');
    const res = await saveTopicOffline(topic);
    if (res.success) {
      setOfflineStatus('saved');
      showToast('تم حفظ الموضوع بنجاح للمطالعة بدون إنترنت');
    } else {
      setOfflineStatus('failed');
      showToast(res.error || 'تعذر إتمام حفظ الموضوع محلياً', 'error');
    }
  };

  const handleRemoveOffline = async () => {
    const res = await removeTopicOffline(topic.slug);
    if (res.success) {
      setOfflineStatus('unsaved');
      showToast('تمت إزالة النسخة المحفوظة من المتصفح (سجلاتك محفوظة)');
    } else {
      showToast('تعذرت إزالة الموضوع', 'error');
    }
  };

  const handleUpdateOffline = async () => {
    setOfflineStatus('updating');
    const res = await saveTopicOffline(topic, { isUpdate: true });
    if (res.success) {
      setOfflineStatus('saved');
      showToast('تم تحديث محتوى الموضوع والمخططات بنجاح');
    } else {
      setOfflineStatus('failed');
      showToast(res.error || 'تعذر تحديث النسخة المحفوظة؛ تم الإبقاء على النسخة السابقة', 'error');
    }
  };

  const buttonClass = 'inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 text-xs font-bold text-[var(--text-main)] hover:border-[var(--brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] transition-colors cursor-pointer';

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 no-print" aria-label="أدوات قراءة الموضوع">
      {/* Offline Reading Controls */}
      {offlineStatus === 'unsaved' && (
        <button
          type="button"
          onClick={handleSaveOffline}
          className={buttonClass}
          aria-label="حفظ للمطالعة بدون إنترنت"
        >
          <Download className="h-4 w-4 text-[var(--brand-primary)]" aria-hidden="true" />
          <span>حفظ للمطالعة بدون إنترنت</span>
        </button>
      )}

      {offlineStatus === 'saving' && (
        <button
          type="button"
          disabled
          className={`${buttonClass} opacity-80 cursor-wait`}
          aria-label="جاري الحفظ بدون إنترنت"
        >
          <Loader2 className="h-4 w-4 animate-spin text-[var(--brand-primary)]" aria-hidden="true" />
          <span>جاري الحفظ محلياً...</span>
        </button>
      )}

      {offlineStatus === 'saved' && (
        <>
          <button
            type="button"
            onClick={handleRemoveOffline}
            className={`${buttonClass} border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40`}
            aria-label="إزالة النسخة المحفوظة بدون إنترنت"
            title="إزالة من التخزين غير المتصل دون حذف المفضلة أو سجل القراءة"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>محفوظ بدون إنترنت (إزالة)</span>
          </button>
          <button
            type="button"
            onClick={handleUpdateOffline}
            className={buttonClass}
            aria-label="تحديث النسخة المحفوظة"
            title="تحديث نص ومخططات الموضوع مع الحفاظ على النسخة السابقة في حال فشل التحديث"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>تحديث</span>
          </button>
        </>
      )}

      {offlineStatus === 'updating' && (
        <button
          type="button"
          disabled
          className={`${buttonClass} opacity-80 cursor-wait`}
          aria-label="جاري تحديث النسخة المحفوظة"
        >
          <Loader2 className="h-4 w-4 animate-spin text-[var(--brand-primary)]" aria-hidden="true" />
          <span>جاري التحديث...</span>
        </button>
      )}

      {offlineStatus === 'failed' && (
        <button
          type="button"
          onClick={handleSaveOffline}
          className={`${buttonClass} border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 bg-rose-50/80 dark:bg-rose-950/30`}
          aria-label="فشل الحفظ - انقر لإعادة المحاولة"
        >
          <AlertCircle className="h-4 w-4 text-rose-600" aria-hidden="true" />
          <span>فشل الحفظ (إعادة المحاولة)</span>
        </button>
      )}

      {offlineStatus === 'unverified' && (
        <button
          type="button"
          onClick={handleSaveOffline}
          className={`${buttonClass} border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/30`}
          aria-label="حالة الحفظ غير مؤكدة - انقر لإعادة المحاولة"
          title="تعذر التحقق من اكتمال النسخة المحفوظة بسبب خطأ مؤقت في التخزين. انقر لإعادة التأكيد أو الحفظ."
        >
          <AlertCircle className="h-4 w-4 text-amber-600" aria-hidden="true" />
          <span>حالة الحفظ غير مؤكدة</span>
        </button>
      )}

      {offlineStatus === 'unsupported' && (
        <span
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 text-xs font-medium text-[var(--text-muted)]"
          title="المتصفح الحالي لا يوفر دعم Service Worker أو Storage API"
        >
          الحفظ غير متاح في هذا المتصفح
        </span>
      )}

      {offlineStatus === 'unsaved' && currentLearningContent?.quiz && (
        <span className="basis-full text-xs text-[var(--text-muted)]" role="status">
          الاختبار متاح في هذه الصفحة لكنه غير محفوظ للعمل دون اتصال. الفيديوهات الخارجية تتطلب اتصالاً.
        </span>
      )}
      {offlineStatus === 'saved' && (
        <span className="basis-full text-xs text-[var(--text-muted)]" role="status">
          {offlineQuizSaved
            ? 'الاختبار محفوظ ضمن إصدار المحتوى ' + offlineContentVersion + '؛ أي نتيجة محفوظة ذاتياً وليست اعتماداً مستقلاً.'
            : 'لا يتضمن الإصدار المحفوظ اختباراً. الفيديوهات الخارجية تتطلب اتصالاً بالإنترنت.'}
          {currentLearningContent && offlineContentVersion !== currentLearningContent.contentVersion
            ? ' يوجد إصدار أحدث من الدرس أو الاختبار؛ حدّث النسخة عند الاتصال.'
            : ''}
        </span>
      )}

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
