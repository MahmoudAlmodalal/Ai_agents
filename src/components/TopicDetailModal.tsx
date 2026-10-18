import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Volume2, X, Printer, Heart, BarChart3, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { TopicItem } from '@/src/types/topic.ts';
import { formatReadingTime } from '@/src/utils/searchUtils.ts';
import { MermaidViewer } from '@/src/components/MermaidViewer.tsx';


interface TopicDetailModalProps {
  topic: TopicItem;
  onClose: () => void;
  onNavigateTopic: (direction: 'next' | 'prev') => void;
  hasNext: boolean;
  hasPrev: boolean;
  onListen: (topic: TopicItem) => void;
  isCurrentlySpeaking: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (topicId: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onNavigateTopic,
  hasNext,
  hasPrev,
  onListen,
  isCurrentlySpeaking,
  isBookmarked,
  onToggleBookmark,
}) => {
  const contentContainerRef = React.useRef<HTMLDivElement>(null);
  const diagramSectionRef = React.useRef<HTMLDivElement>(null);
  const [copyToast, setCopyToast] = React.useState<string | null>(null);
  const [readingProgress, setReadingProgress] = React.useState<number>(0);
  const [showDiagram, setShowDiagram] = React.useState<boolean>(true);

  // Keep latest callbacks in ref to avoid stale closures during rapid key presses
  const keyActionRef = React.useRef({ onClose, onNavigateTopic, hasNext, hasPrev });
  React.useEffect(() => {
    keyActionRef.current = { onClose, onNavigateTopic, hasNext, hasPrev };
  });

  // Keyboard shortcut listener: Escape to close, ArrowLeft for Next topic, ArrowRight for Prev topic
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if user is typing in an input/textarea
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        keyActionRef.current.onClose();
      } else if (e.key === 'ArrowLeft') {
        if (keyActionRef.current.hasNext) {
          e.preventDefault();
          keyActionRef.current.onNavigateTopic('next');
        }
      } else if (e.key === 'ArrowRight') {
        if (keyActionRef.current.hasPrev) {
          e.preventDefault();
          keyActionRef.current.onNavigateTopic('prev');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Calculate Reading Progress on scroll
  React.useEffect(() => {
    const container = contentContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
        setReadingProgress(percent);
      } else {
        setReadingProgress(0);
      }
    };

    // Reset progress when topic changes
    setReadingProgress(0);
    container.scrollTop = 0;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [topic]);

  // Initialize Mermaid diagrams and copy buttons inside the rendered HTML
  React.useEffect(() => {
    const container = contentContainerRef.current;
    if (!container) return;

    // 1. Wire copy buttons
    const copyBtns = container.querySelectorAll('.copy-btn');
    const handlers: { btn: Element; handler: () => void }[] = [];

    copyBtns.forEach((btn) => {
      const handler = () => {
        const codeContainer = btn.closest('.code-container');
        const codeElement = codeContainer?.querySelector('code');
        const textToCopy = codeElement?.textContent || '';

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            btn.classList.add('copied');
            const originalText = btn.textContent;
            btn.textContent = '✓ تم النسخ!';
            setCopyToast('تم نسخ المحتوى إلى الحافظة بنجاح');

            setTimeout(() => {
              btn.classList.remove('copied');
              btn.textContent = originalText;
            }, 2000);

            setTimeout(() => setCopyToast(null), 3000);
          });
        }
      };

      btn.addEventListener('click', handler);
      handlers.push({ btn, handler });
    });

    // 3. Wire checklists with localStorage
    const checkboxes = container.querySelectorAll<HTMLInputElement>('.checklist-item input[type="checkbox"]');
    checkboxes.forEach((cb, idx) => {
      const storageKey = `checklist_${topic.id}_${idx}`;
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        cb.checked = saved === 'true';
      }

      cb.addEventListener('change', () => {
        localStorage.setItem(storageKey, cb.checked ? 'true' : 'false');
      });
    });

    return () => {
      handlers.forEach(({ btn, handler }) => {
        btn.removeEventListener('click', handler);
      });
    };
  }, [topic]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm modal-backdrop-root"
    >
      {/* Click outside backdrop for desktop */}
      <div className="absolute inset-0 hidden sm:block modal-backdrop-clickable" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Container: Fullscreen on mobile, rounded card on tablet/desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        role="dialog"
        aria-modal="true"
        aria-label={topic.title}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] max-w-5xl bg-[var(--bg-surface)] sm:border sm:border-[var(--border-color)] sm:rounded-2xl flex flex-col overflow-hidden z-10 transition-colors modal-container-box"
        style={{ boxShadow: 'var(--shadow-modal, 0 25px 50px -12px rgba(0,0,0,0.25))' }}
      >
        {/* Sticky Modal Header (hidden during print) */}
        <header className="px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[var(--bg-surface)] flex items-center justify-between gap-2.5 shrink-0 no-print">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-blue-700 to-blue-500 text-white font-mono font-black text-xs sm:text-base flex items-center justify-center shadow-xs shrink-0">
              {topic.number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[var(--brand-primary)]">
                <span className="truncate">{topic.stageTag}</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className="text-[var(--text-muted)] truncate hidden xs:inline">{topic.categoryName}</span>
                <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-card-subtle)] px-1.5 py-0.2 rounded">
                  <span>⏱️</span>
                  <span>{formatReadingTime(topic.readingTimeMinutes)}</span>
                </span>
                <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded font-bold">
                  {Math.round(readingProgress)}% مقروء
                </span>
              </div>
              <h2 className="text-xs sm:text-base font-black text-[var(--text-main)] truncate leading-tight">
                {topic.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Visual Mermaid Diagram Toggle Button */}
            <button
              onClick={() => {
                setShowDiagram((prev) => {
                  const nextVal = !prev;
                  if (nextVal && diagramSectionRef.current) {
                    setTimeout(() => {
                      diagramSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }
                  return nextVal;
                });
              }}
              className={`min-h-[36px] px-2 sm:px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                showDiagram
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-[var(--brand-primary)] border-blue-300 dark:border-blue-700 shadow-2xs'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
              }`}
              title="عرض أو إخفاء المخطط البياني التفاعلي (Mermaid)"
              aria-label="عرض المخطط البياني"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">المخطط البياني</span>
              <span className="hidden md:inline text-[9px] font-mono bg-[var(--brand-primary)] text-white px-1.5 py-0.2 rounded-full">
                Mermaid
              </span>
            </button>

            {/* Print as PDF Button */}
            <button
              onClick={() => window.print()}
              className="min-h-[36px] px-2 sm:px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
              title="طباعة أو حفظ هذا الموضوع كملف PDF (Ctrl+P)"
              aria-label="طباعة كملف PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span className="hidden sm:inline">طباعة PDF</span>
            </button>

            {/* Heart Bookmark in Modal */}
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`min-h-[36px] min-w-[36px] px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center justify-center ${
                isBookmarked
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-rose-600 hover:border-rose-300'
              }`}
              title={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
              aria-label={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-current text-rose-500' : 'fill-none stroke-current stroke-2'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            {/* Audio Listen Button */}
            <button
              onClick={() => onListen(topic)}
              className={`min-h-[36px] px-2 sm:px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                isCurrentlySpeaking
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:border-[var(--brand-primary)]'
              }`}
              title="الاستماع الصوتي لهذا الموضوع"
            >
              {isCurrentlySpeaking ? <Volume2 className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isCurrentlySpeaking ? 'جاري القراءة' : 'استماع'}
              </span>
            </button>

            {/* Link to Full Learning Page */}
            <Link
              href={`/learn/${topic.slug}`}
              className="min-h-[36px] px-2.5 sm:px-3 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors flex items-center gap-1.5"
              title="الانتقال إلى صفحة التعلم الكاملة"
            >
              <span className="hidden sm:inline">صفحة التعلم</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Close Button with Esc Hint */}
            <button
              onClick={onClose}
              className="min-h-[36px] px-2.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-[var(--text-muted)] border border-[var(--border-color)] flex items-center justify-center gap-1 text-xs font-bold transition-colors cursor-pointer"
              title="إغلاق النافذة (Escape)"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
              <kbd className="hidden sm:inline text-[10px] font-mono text-[var(--text-faint)] bg-[var(--border-color)]/60 px-1 py-0.2 rounded">
                Esc
              </kbd>
            </button>
          </div>
        </header>

        {/* Formal Publication Header for PDF Print Only */}
        <div className="hidden print:block p-6 mb-2 border-b-2 border-slate-800 text-right bg-white text-slate-900">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300 text-[10pt] font-mono text-slate-600">
            <span>الدليل الهندسي الشامل: بناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي</span>
            <span>تاريخ الطباعة: {new Date().toLocaleDateString('ar-EG')}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-700 text-white font-mono font-bold text-xs rounded">
              الموضوع #{topic.number}
            </span>
            <span className="text-xs font-bold text-blue-800">{topic.stageTag} · {topic.categoryName}</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 mb-1">{topic.title}</h1>
          <p className="text-xs text-blue-900 font-bold mb-2">{topic.subtitle}</p>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">{topic.summary}</p>
          <div className="flex items-center gap-3 text-[9pt] text-slate-500 font-mono">
            <span>⏱️ وقت القراءة التقديري: {formatReadingTime(topic.readingTimeMinutes)}</span>
            <span>·</span>
            <span>الوسوم: {topic.tags.join('، ')}</span>
          </div>
        </div>

        {/* Visual Reading Progress Bar Track */}
        <div
          className="w-full h-1 sm:h-1.5 bg-[var(--border-color)]/60 shrink-0 relative overflow-hidden no-print"
          role="progressbar"
          aria-valuenow={Math.round(readingProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="نسبة التقدم في القراءة"
        >
          <div
            className="h-full reading-progress-bar transition-[width] duration-75 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Scrollable Content Area */}
        <div
          ref={contentContainerRef}
          className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 bg-[var(--bg-body)] content-area modal-content-area space-y-6"
        >
          {/* Unified Project Contract Section (Wave 1) */}
          {(topic.publicationStatus === 'unified-complete' || (topic.steps && topic.steps.length > 0)) && (
            <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-emerald-900/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    مسار المشروع المتسلسل
                  </span>
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                    {topic.stageTag}
                  </span>
                </div>
                <Link
                  href={`/learn/${topic.slug}`}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>عرض في صفحة التعلم الكاملة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>

              {topic.goal && (
                <div>
                  <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200 mb-1">
                    الهدف من الموضوع:
                  </h4>
                  <p className="text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {topic.goal}
                  </p>
                </div>
              )}

              {topic.outputs && topic.outputs.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200 mb-1.5">
                    المخرجات المطلوبة:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {topic.outputs.map((out) => (
                      <span
                        key={out}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300"
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {topic.steps && topic.steps.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200 mb-2">
                    خطوات التطبيق على مشروعك:
                  </h4>
                  <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pr-2">
                    {topic.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step.replace(/^\d+\.\s*/, '')}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {topic.checklist && topic.checklist.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-200 mb-2">
                    قائمة التحقق والإنجاز:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {topic.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Interactive Mermaid Diagram Viewer Section */}
          <section
            ref={diagramSectionRef}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3.5 sm:p-5 shadow-xs transition-all"
            aria-label="المخطط الهندسي التفاعلي"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <BarChart3 className="w-5 h-5 text-[var(--brand-primary)]" />
                <h3 className="text-xs sm:text-sm font-black text-[var(--text-main)]">
                  المخطط الهندسي التفاعلي (Mermaid.js)
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>100% محلي · بدون أي API</span>
                </span>
              </div>

              <button
                onClick={() => setShowDiagram((prev) => !prev)}
                className="text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
                title={showDiagram ? 'طي المخطط' : 'إظهار المخطط'}
              >
                <span>{showDiagram ? 'طي المخطط' : 'إظهار المخطط'}</span>
                <span className="text-[10px]">{showDiagram ? '▲' : '▼'}</span>
              </button>
            </div>

            {showDiagram ? (
              <MermaidViewer topic={topic} />
            ) : (
              <div
                onClick={() => setShowDiagram(true)}
                className="p-3 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-center text-xs text-[var(--text-muted)] cursor-pointer hover:border-[var(--brand-primary)] hover:text-[var(--text-main)] transition-colors"
              >
                المخطط مطوي حالياً. انقر هنا أو على زر «المخطط البياني» بالأعلى لفتحه فورياً.
              </div>
            )}
          </section>

          {/* Rendered HTML Content */}
          <div
            dangerouslySetInnerHTML={{ __html: topic.htmlContent }}
            className="prose dark:prose-invert max-w-none text-right"
          />
        </div>

        {/* Sticky Modal Footer with Next / Prev and Keyboard Hints */}
        <footer className="px-3 sm:px-6 py-2.5 sm:py-3 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex items-center justify-between gap-2 shrink-0 no-print">
          <button
            onClick={() => onNavigateTopic('prev')}
            disabled={!hasPrev}
            className="min-h-[38px] px-3 sm:px-4 rounded-xl text-xs font-bold border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--border-color)] transition-colors cursor-pointer flex items-center gap-1.5"
            title="الانتقال إلى الموضوع السابق (السهم الأيمن →)"
          >
            <span>→</span>
            <span className="hidden xs:inline">الموضوع</span>
            <span>السابق</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-[var(--border-color)] text-[var(--text-muted)] px-1 py-0.2 rounded">
              →
            </kbd>
          </button>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[var(--text-muted)]">
            <span>موضوع {topic.number} / 12</span>
            <span className="opacity-40">·</span>
            <span className="font-bold text-[var(--brand-primary)]">
              {Math.round(readingProgress)}%
            </span>
            <span className="hidden md:inline opacity-40">·</span>
            <span className="hidden md:inline text-[10px] text-[var(--text-faint)] font-sans">
              (استخدم <kbd className="font-mono bg-[var(--border-color)] px-1 rounded">←</kbd> <kbd className="font-mono bg-[var(--border-color)] px-1 rounded">→</kbd> للتنقل)
            </span>
          </div>

          <button
            onClick={() => onNavigateTopic('next')}
            disabled={!hasNext}
            className="min-h-[38px] px-3 sm:px-4 rounded-xl text-xs font-bold border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--border-color)] transition-colors cursor-pointer flex items-center gap-1.5"
            title="الانتقال إلى الموضوع التالي (السهم الأيسر ←)"
          >
            <kbd className="hidden sm:inline font-mono text-[10px] bg-[var(--border-color)] text-[var(--text-muted)] px-1 py-0.2 rounded">
              ←
            </kbd>
            <span className="hidden xs:inline">الموضوع</span>
            <span>التالي</span>
            <span>←</span>
          </button>
        </footer>
      </motion.div>

      {/* Copy Toast Notification */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{copyToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
