import React from 'react';
import { TopicItem } from '@/src/types/topic.ts';

declare global {
  interface Window {
    mermaid?: {
      run: (options?: { nodes?: NodeListOf<Element> | Element[] }) => Promise<void>;
      initialize: (config: Record<string, unknown>) => void;
    };
  }
}

interface TopicDetailModalProps {
  topic: TopicItem;
  onClose: () => void;
  onNavigateTopic: (direction: 'next' | 'prev') => void;
  hasNext: boolean;
  hasPrev: boolean;
  onListen: (topic: TopicItem) => void;
  isCurrentlySpeaking: boolean;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onNavigateTopic,
  hasNext,
  hasPrev,
  onListen,
  isCurrentlySpeaking,
}) => {
  const contentContainerRef = React.useRef<HTMLDivElement>(null);
  const [copyToast, setCopyToast] = React.useState<string | null>(null);

  // Close on Escape, Navigate on Arrows
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasNext) {
        onNavigateTopic('next');
      } else if (e.key === 'ArrowRight' && hasPrev) {
        onNavigateTopic('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateTopic, hasNext, hasPrev]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Initialize Mermaid diagrams and copy buttons inside the rendered HTML
  React.useEffect(() => {
    const container = contentContainerRef.current;
    if (!container) return;

    // 1. Re-run Mermaid rendering
    if (window.mermaid) {
      const mermaidNodes = container.querySelectorAll('.mermaid:not([data-processed="true"])');
      if (mermaidNodes.length > 0) {
        try {
          window.mermaid.run({ nodes: Array.from(mermaidNodes) }).catch((err) => {
            console.warn('Mermaid rendering error:', err);
          });
        } catch (err) {
          console.warn('Failed to run mermaid:', err);
        }
      }
    }

    // 2. Wire copy buttons
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transition-colors">
        {/* Sticky Modal Header */}
        <header className="px-6 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-700 to-blue-500 text-white font-mono font-extrabold text-base flex items-center justify-center shadow-xs shrink-0">
              {topic.number}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--brand-primary)]">
                <span>{topic.stageTag}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--text-muted)]">{topic.categoryName}</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[var(--text-main)] truncate">
                {topic.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onListen(topic)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                isCurrentlySpeaking
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-main)] border-[var(--border-color)] hover:border-[var(--brand-primary)]'
              }`}
              title="الاستماع الصوتي لهذا الموضوع"
            >
              <span>{isCurrentlySpeaking ? '🔊' : '🎧'}</span>
              <span className="hidden sm:inline">
                {isCurrentlySpeaking ? 'جاري القراءة' : 'استماع صوتي'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-[var(--text-muted)] border border-[var(--border-color)] flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
              title="إغلاق النافذة (Esc)"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div
          ref={contentContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[var(--bg-body)] content-area"
        >
          <div
            dangerouslySetInnerHTML={{ __html: topic.htmlContent }}
            className="prose dark:prose-invert max-w-none"
          />
        </div>

        {/* Sticky Modal Footer with Next / Prev */}
        <footer className="px-6 py-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={() => onNavigateTopic('prev')}
            disabled={!hasPrev}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--border-color)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>→</span>
            <span>الموضوع السابق</span>
          </button>

          <span className="text-xs font-mono text-[var(--text-muted)]">
            موضوع {topic.number} من 12
          </span>

          <button
            onClick={() => onNavigateTopic('next')}
            disabled={!hasNext}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--border-color)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>الموضوع التالي</span>
            <span>←</span>
          </button>
        </footer>
      </div>

      {/* Copy Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span>✓</span>
          <span>{copyToast}</span>
        </div>
      )}
    </div>
  );
};
