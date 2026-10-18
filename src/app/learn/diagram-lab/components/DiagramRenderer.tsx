'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import {
  DiagramLabItem,
  DiagramAlternativeSource,
} from '@/src/data/diagram-lab.ts';
import {
  ExternalLink,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Copy,
  Eye,
  Code2,
  Terminal,
} from 'lucide-react';
import { useToast } from '@/src/components/Toast.tsx';

interface DiagramRendererProps {
  item: DiagramLabItem;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ item }) => {
  const { showToast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'alternative'>('primary');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'boundary'>('preview');
  const [svgContent, setSvgContent] = useState<string>('');
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showSimulatedError, setShowSimulatedError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Active code depending on whether primary or alternative variant is selected
  const activeCode =
    selectedVariant === 'alternative' && item.alternativeSource
      ? item.alternativeSource.sourceCode
      : item.sourceCode;

  const activeFamily =
    selectedVariant === 'alternative' && item.alternativeSource
      ? item.alternativeSource.family
      : item.family;

  const isCurrentMermaid = activeFamily === 'Mermaid';

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Initialize mermaid
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: isDark ? 'dark' : 'neutral',
        fontFamily: 'inherit, system-ui, -apple-system, sans-serif',
        fontSize: 13,
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          curve: 'basis',
        },
        sequence: {
          useMaxWidth: false,
          showSequenceNumbers: true,
        },
        er: {
          useMaxWidth: false,
        },
      });
    } catch (e) {
      console.error('Mermaid initialization failed:', e);
    }
  }, [isDark]);

  // Render diagram when code, variant, or dark mode changes
  useEffect(() => {
    if (!isCurrentMermaid) {
      setSvgContent('');
      setIsRendering(false);
      setRenderError(null);
      return;
    }

    let isCancelled = false;
    setIsRendering(true);
    setRenderError(null);

    const render = async () => {
      try {
        const uniqueId = `mermaid-lab-${item.id}-${selectedVariant}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, activeCode);
        if (!isCancelled) {
          setSvgContent(svg);
          setIsRendering(false);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          console.error('Mermaid render error for', item.id, err);
          setRenderError(err instanceof Error ? err.message : 'تعذر تصيير المخطط');
          setIsRendering(false);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [item.id, activeCode, isCurrentMermaid, selectedVariant, isDark]);

  // Copy code handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      showToast('تم النسخ ✓ — تم نسخ كود المخطط إلى الحافظة', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = activeCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      showToast('تم النسخ ✓', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-xs flex flex-col">
      {/* Renderer Header Toolbar */}
      <div className="p-3 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
        {/* View Mode Toggle: Preview / Code / Boundary (if non-mermaid) */}
        <div className="flex items-center gap-1.5 flex-wrap" role="tablist" aria-label="أوضاع عرض المخطط">
          <button
            onClick={() => setActiveTab('preview')}
            role="tab"
            aria-selected={activeTab === 'preview'}
            className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === 'preview'
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-2xs'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isCurrentMermaid ? 'المعاينة البصرية (Live)' : 'المحرر المعتمد'}</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            role="tab"
            aria-selected={activeTab === 'code'}
            className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === 'code'
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-2xs'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>كود المصدر (Source)</span>
          </button>

          {item.engineBoundaryNotice && (
            <button
              onClick={() => setActiveTab('boundary')}
              role="tab"
              aria-selected={activeTab === 'boundary'}
              className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'boundary'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                  : 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>حدود المحرك (Engine Boundary)</span>
            </button>
          )}
        </div>

        {/* Action Controls: Copy & Editor Link */}
        <div className="flex items-center gap-2 mr-auto">
          {/* Variant Selector (e.g. for ERD: DBML vs Mermaid) */}
          {item.alternativeSource && (
            <div className="flex items-center gap-1 bg-[var(--bg-card-subtle)] p-1 rounded-xl border border-[var(--border-color)] text-xs font-bold">
              <button
                onClick={() => setSelectedVariant('primary')}
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  selectedVariant === 'primary'
                    ? 'bg-emerald-600 text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
                title="عرض بصيغة DBML"
              >
                DBML
              </button>
              <button
                onClick={() => setSelectedVariant('alternative')}
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  selectedVariant === 'alternative'
                    ? 'bg-blue-600 text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
                title="عرض بصيغة Mermaid erDiagram"
              >
                Mermaid
              </button>
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)]'
            }`}
            aria-label={`نسخ كود ${item.name}`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ ✓' : 'نسخ الكود'}</span>
          </button>

          {/* Direct Editor Link */}
          <a
            href={item.editor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[34px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 hover:border-blue-400"
            title={`فتح في ${item.editor.name}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">فتح المحرر</span>
          </a>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative min-h-[320px] bg-[var(--bg-body)] flex flex-col justify-center">
        {/* 1. PREVIEW TAB */}
        {activeTab === 'preview' && (
          <>
            {isCurrentMermaid ? (
              <div className="relative w-full h-full flex flex-col">
                {/* Zoom Controls Overlay for Mermaid */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[var(--bg-surface)]/90 backdrop-blur-xs p-1 rounded-xl border border-[var(--border-color)] shadow-2xs">
                  <button
                    onClick={handleZoomIn}
                    className="w-7 h-7 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center font-bold text-xs cursor-pointer"
                    title="تكبير"
                    aria-label="تكبير المخطط"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="h-7 px-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center font-mono text-[11px] cursor-pointer"
                    title="إعادة ضبط 100%"
                    aria-label="إعادة ضبط المقياس"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="w-7 h-7 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center font-bold text-xs cursor-pointer"
                    title="تصغير"
                    aria-label="تصغير المخطط"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Canvas Area */}
                <div
                  ref={containerRef}
                  className="w-full min-h-[320px] max-h-[500px] overflow-auto p-6 flex items-center justify-center select-none"
                  dir="ltr"
                >
                  {isRendering ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                      <div className="w-8 h-8 border-3 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-bold text-[var(--text-muted)]">
                        جاري تصيير المخطط عبر محرك Mermaid المحلي...
                      </span>
                    </div>
                  ) : renderError ? (
                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs max-w-md text-center">
                      <p className="font-bold mb-1">تعذر تصيير مخطط Mermaid:</p>
                      <p className="font-mono text-[11px] opacity-80">{renderError}</p>
                    </div>
                  ) : (
                    <div
                      className="transition-transform duration-150 ease-out origin-center flex items-center justify-center w-full"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                      }}
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                  )}
                </div>
              </div>
            ) : (
              /* NON-MERMAID DEDICATED PREVIEW: PlantUML or DBML */
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300 text-2xl shadow-xs">
                  {item.family === 'PlantUML' ? '📐' : '🗄️'}
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 mb-2">
                    عائلة {item.family} — محرك خارجي متخصص
                  </span>
                  <h4 className="text-lg font-black text-[var(--text-main)]">
                    {item.family === 'PlantUML'
                      ? 'مخطط PlantUML الرسمي (معيار OMG UML)'
                      : 'مخطط DBML لقواعد البيانات العلائقية'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-6 mt-1">
                    {item.engineBoundaryNotice?.unsupportedReason}
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-right space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)]">
                    <span>بيئة العمل المعتمدة:</span>
                    <span className="font-mono text-[var(--text-main)]">{item.editor.name}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-5">
                    {item.editor.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-[var(--border-color)]">
                    <button
                      onClick={() => setActiveTab('code')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-color)] cursor-pointer"
                    >
                      معاينة كود المصدر
                    </button>
                    <a
                      href={item.editor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>فتح في {item.editor.name} ↗</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-900">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    محرك Mermaid المدمج يتعامل بصرامة ولا يشغّل هذا الكود لتفادي حدوث خطأ صياغة.
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* 2. SOURCE CODE TAB */}
        {activeTab === 'code' && (
          <div className="p-4 sm:p-6 w-full" dir="ltr">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{item.syntaxLabel}</span>
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans transition-colors cursor-pointer flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950 p-4 rounded-xl overflow-x-auto max-h-[380px] border border-slate-800 leading-6 selection:bg-emerald-800 selection:text-white">
              <code>{activeCode}</code>
            </pre>
            {item.alternativeSource && selectedVariant === 'alternative' && (
              <p className="mt-2 text-xs text-[var(--text-muted)] text-right" dir="rtl">
                💡 {item.alternativeSource.notes}
              </p>
            )}
          </div>
        )}

        {/* 3. ENGINE BOUNDARY TAB (Grounded Error State) */}
        {activeTab === 'boundary' && item.engineBoundaryNotice && (
          <div className="p-5 sm:p-7 max-w-3xl mx-auto space-y-4" dir="rtl">
            <div className="rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>الحد الهندسي الفاصل: لماذا لا يدعم محرك Mermaid هذه الصيغة؟</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-6">
                {item.engineBoundaryNotice.unsupportedReason}
              </p>
              <div className="p-3 bg-rose-100/70 dark:bg-rose-900/30 rounded-xl text-xs font-semibold text-rose-950 dark:text-rose-100">
                <strong>نوع الخطأ المتوقع:</strong> {item.engineBoundaryNotice.expectedErrorType}
              </div>
            </div>

            {/* Interactive Simulation of Error State */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs sm:text-sm font-black text-[var(--text-main)] flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span>محاكاة خطأ المحرك عند محاولة تشغيل {item.family} داخل Mermaid:</span>
                </h5>
                <button
                  onClick={() => setShowSimulatedError((prev) => !prev)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-700 bg-[var(--bg-card-subtle)] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {showSimulatedError ? 'إخفاء رسالة الخطأ' : 'عرض الخطأ الصياغي'}
                </button>
              </div>

              {showSimulatedError ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-800 text-left font-mono text-xs space-y-2" dir="ltr">
                  <div className="text-rose-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Uncaught Error: Mermaid SyntaxError</span>
                  </div>
                  <pre className="text-rose-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-5">
                    {item.engineBoundaryNotice.simulatedMermaidError}
                  </pre>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    Engine State: Parse aborted gracefully to prevent host DOM crash.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[var(--text-muted)] leading-5">
                  انقر على الزر أعلاه لمعاينة رسالة الخطأ الصياغي (Syntax Parse Error) التي يطلقها محرك Mermaid إذا تم تزويده بهذا الكود.
                </p>
              )}

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 leading-6">
                <strong>التصرف الهندسي السليم: </strong>
                {item.engineBoundaryNotice.guidance}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between text-xs text-[var(--text-muted)] font-medium gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isCurrentMermaid ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span>
            {isCurrentMermaid
              ? 'تصيير شعاعي محلي 100% داخل المتصفح (Mermaid.js SVG)'
              : `محرك خارجي معتمد (${item.family}) — محرر ${item.editor.name}`}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span>الصيغة: <code className="font-mono font-bold" dir="ltr">{item.syntaxLabel}</code></span>
        </div>
      </div>
    </div>
  );
};
