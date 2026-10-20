'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Trash2,
  BookOpen,
  HardDrive,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import {
  listSavedTopicsOffline,
  removeTopicOffline,
  clearAllOfflineSavedTopics,
  getTopicRollbackCandidate,
  rollbackTopicOffline,
  SavedTopicMetadata,
  OFFLINE_STORAGE_CHANGE_EVENT,
} from '@/src/lib/offlineStorage';
import { useToast } from '@/src/components/Toast';

export default function SavedTopicsPage() {
  const [savedTopics, setSavedTopics] = useState<SavedTopicMetadata[]>([]);
  const [rollbackCandidates, setRollbackCandidates] = useState<Record<string, SavedTopicMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [storageEstimate, setStorageEstimate] = useState<{ usedMb: string; quotaMb: string } | null>(null);
  const { showToast } = useToast();

  const loadTopics = async () => {
    setLoading(true);
    const list = await listSavedTopicsOffline();
    setSavedTopics(list);
    setLoading(false);

    const candidates: Record<string, SavedTopicMetadata> = {};
    await Promise.all(
      list.map(async (item) => {
        try {
          const candidate = await getTopicRollbackCandidate(item.slug);
          if (candidate) {
            candidates[item.slug] = candidate;
          }
        } catch {
          // ignore candidate error
        }
      })
    );
    setRollbackCandidates(candidates);

    if (typeof navigator !== 'undefined' && 'storage' in navigator && navigator.storage.estimate) {
      try {
        const est = await navigator.storage.estimate();
        const usedMb = ((est.usage ?? 0) / (1024 * 1024)).toFixed(1);
        const quotaMb = ((est.quota ?? 0) / (1024 * 1024)).toFixed(0);
        setStorageEstimate({ usedMb, quotaMb });
      } catch {
        // storage estimation optional
      }
    }
  };

  useEffect(() => {
    loadTopics();
    const handleStorageChange = () => {
      loadTopics();
    };
    window.addEventListener(OFFLINE_STORAGE_CHANGE_EVENT, handleStorageChange);
    return () => {
      window.removeEventListener(OFFLINE_STORAGE_CHANGE_EVENT, handleStorageChange);
    };
  }, []);

  const handleRemove = async (slug: string, title: string) => {
    const res = await removeTopicOffline(slug);
    if (res.success) {
      showToast(`تمت إزالة "${title}" من التخزين بدون إنترنت`);
      await loadTopics();
    } else {
      showToast('تعذرت إزالة الموضوع من التخزين المحلي', 'error');
    }
  };

  const handleRollback = async (slug: string, targetBundleId: string, title: string) => {
    const res = await rollbackTopicOffline(slug, targetBundleId);
    if (res.success) {
      showToast(`تمت استعادة النسخة السابقة لموضوع "${title}"`);
      await loadTopics();
    } else {
      showToast(res.error || 'تعذرت استعادة النسخة السابقة لهذا الموضوع', 'error');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('هل أنت متأكد من رغبتك في إفراغ جميع المواضيع المحفوظة محلياً؟ لن تتأثر مفضلتك أو تقدمك.')) {
      return;
    }
    const res = await clearAllOfflineSavedTopics();
    if (res.success) {
      showToast(`تم إفراغ ${res.clearedCount} موضوعاً من التخزين المحلي`);
      await loadTopics();
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[var(--text-muted)] flex items-center gap-2" aria-label="مسار الصفحة">
        <Link href="/" className="hover:text-[var(--accent)] font-medium">الرئيسية</Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text-main)] font-semibold">المحتوى المحفوظ بدون إنترنت</span>
      </nav>

      {/* Header */}
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>مطالعة أوفلاين (PWA)</span>
              </span>
              {storageEstimate && (
                <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 font-mono">
                  المستخدم: ~{storageEstimate.usedMb} ميغابايت
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-main)]">
              المواضيع المحفوظة بدون إنترنت
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] max-w-2xl">
              تصفح الدروس والمخططات والاختبارات الموجودة في النسخة التي حفظتها. أما الفيديوهات الخارجية فتتطلب اتصالاً بالإنترنت؛ وتظهر حالة سياسة تقييم الاختبار كما هي في المحتوى المحفوظ.
            </p>
          </div>

          {savedTopics.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 px-3.5 py-2 text-xs font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>إفراغ المحفوظات</span>
            </button>
          )}
        </div>

        {/* Learner record protection guarantee callout */}
        <div className="mt-6 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-4 text-xs sm:text-sm leading-6 text-blue-950 dark:text-blue-200">
          <strong className="font-bold">حماية سجلاتك التعليمية: </strong>
          <span>
            حذف أي موضوع من التخزين غير المتصل يحرر مساحة المتصفح فقط، ولا يؤثر إطلاقاً على إشاراتك المرجعية (المفضلة)، أو سجل زياراتك، أو تقييمك الذاتي في قوائم التحقق.
          </span>
        </div>
      </header>

      {/* Main List */}
      <main className="mt-8">
        {loading ? (
          <div className="py-16 text-center text-sm font-bold text-[var(--text-muted)] flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-[var(--brand-primary)]" />
            <span>جاري التحقق من التخزين المحلي...</span>
          </div>
        ) : savedTopics.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] p-8 sm:p-12 text-center">
            <HardDrive className="mx-auto h-12 w-12 text-[var(--text-muted)] opacity-50" />
            <h2 className="mt-4 text-lg font-bold text-[var(--text-main)]">لا توجد مواضيع محفوظة حالياً</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)] max-w-md mx-auto">
              يمكنك حفظ أي موضوع لمطالعته بدون شبكة من خلال النقر على زر <strong>"حفظ للمطالعة بدون إنترنت"</strong> في أعلى صفحة أي درس.
            </p>
            <div className="mt-6">
              <Link
                href="/learn/project-idea-mvp"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all"
              >
                <span>ابدأ بالموضوع الأول</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedTopics.map((item) => (
              <article
                key={item.slug}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all shadow-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 text-[11px] font-bold">
                      موضوع {item.number}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium">
                      {item.categoryName}
                    </span>
                    {item.diagramCount > 0 && (
                      <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 text-[11px] font-bold">
                        مخطط تفاعلي
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] truncate">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <p className="text-xs text-[var(--text-muted)] mt-1 truncate">
                      {item.subtitle}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-mono">
                    <span>حُفظ بتاريخ: {new Date(item.savedAt).toLocaleDateString('ar-EG')}</span>
                    {item.sizeBytes && <span>بيانات الدرس التقريبية: ~{Math.round(item.sizeBytes / 1024)} ك.ب</span>}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                    {item.quiz ? (
                      <>
                        <span className="rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 font-bold text-emerald-800 dark:text-emerald-300">
                          اختبار هذه النسخة محفوظ · {item.quiz.questionCount} أسئلة
                        </span>
                        {item.quiz.approvalState === 'proposed' && (
                          <span className="rounded-full border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 font-medium text-amber-800 dark:text-amber-300">
                            معاينة تعليمية · سياسة التقييم مقترحة
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-2.5 py-1 text-[var(--text-muted)]">
                        لا يتضمن هذا الحفظ اختباراً
                      </span>
                    )}
                    {!!item.onlineOnlyVideoCount && (
                      <span className="text-[var(--text-muted)]">
                        {item.onlineOnlyVideoCount} فيديو خارجي يتطلب اتصالاً
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {rollbackCandidates[item.slug] && (
                    <button
                      type="button"
                      onClick={() => handleRollback(item.slug, rollbackCandidates[item.slug].bundleId!, item.title)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-3 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-colors shadow-2xs"
                      title="استعادة النسخة السابقة المحفوظة لهذا الموضوع"
                      aria-label={`استعادة النسخة السابقة لموضوع ${item.title}`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>استعادة النسخة السابقة</span>
                    </button>
                  )}

                  <Link
                    href={`/learn/${item.slug}`}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-[var(--action-bg)] px-3.5 text-xs font-bold text-[var(--action-text)] hover:bg-[var(--action-bg-hover)] transition-colors shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>قراءة الدرس</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.slug, item.title)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-300 transition-colors"
                    title="إزالة من المحفوظات المحلية"
                    aria-label={`إزالة موضوع ${item.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">إزالة</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
