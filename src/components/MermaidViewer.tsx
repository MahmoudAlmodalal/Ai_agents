'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TopicItem } from '@/src/types/topic.ts';
import {
  DiagramPerspective,
  DIAGRAM_PERSPECTIVES,
  getTopicMermaidDiagram,
} from '@/src/utils/diagramEngine.ts';
import { getSavedTopicOfflinePayload } from '@/src/lib/offlineStorage';

interface MermaidViewerProps {
  topic: TopicItem;
  initialPerspective?: DiagramPerspective;
  className?: string;
}

export const MermaidViewer: React.FC<MermaidViewerProps> = ({
  topic,
  initialPerspective = 'architecture',
  className = '',
}) => {
  const [perspective, setPerspective] = useState<DiagramPerspective>(initialPerspective);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showRawSyntax, setShowRawSyntax] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Detect dark mode from document.documentElement
  useEffect(() => {
    const checkDark = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Initialize Mermaid configuration
  useEffect(() => {
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
    });
  }, [isDark]);

  // Current Mermaid diagram markup
  const currentDiagramCode = getTopicMermaidDiagram(topic, perspective);

  // Render diagram whenever topic, perspective, or dark mode changes
  useEffect(() => {
    let isCancelled = false;
    setIsRendering(true);
    setRenderError(null);

    const renderDiagram = async () => {
      // 1. If an offline snapshot is available, load it immediately
      const offline = getSavedTopicOfflinePayload(topic.slug);
      if (offline?.diagramSnapshots?.[perspective]) {
        if (!isCancelled) {
          setSvgContent(offline.diagramSnapshots[perspective]);
          setIsRendering(false);
        }
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          return;
        }
      }

      try {
        const renderId = `mermaid-${topic.id}-${perspective}-${Date.now()}`;
        const { svg } = await mermaid.render(renderId, currentDiagramCode);
        if (!isCancelled) {
          setSvgContent(svg);
          setIsRendering(false);
        }
      } catch (err: unknown) {
        if (offline?.diagramSnapshots?.[perspective] && !isCancelled) {
          setSvgContent(offline.diagramSnapshots[perspective]);
          setIsRendering(false);
          return;
        }
        console.error('Mermaid render error:', err);
        if (!isCancelled) {
          setRenderError(err instanceof Error ? err.message : 'فشل في تصيير المخطط');
          setIsRendering(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [topic, perspective, currentDiagramCode, isDark]);

  // Reset zoom on topic change
  useEffect(() => {
    setZoomLevel(1);
  }, [topic.id, perspective]);

  // Copy Mermaid syntax to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentDiagramCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = currentDiagramCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Download SVG file
  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${topic.id}-${perspective}-diagram.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      className={`rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-xs ${className}`}
    >
      {/* Header Toolbar */}
      <div className="p-3 sm:p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
        {/* Perspectives Navigation */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[var(--text-muted)] ml-1 hidden xs:inline">
            المنظور:
          </span>
          {DIAGRAM_PERSPECTIVES.map((item) => {
            const isActive = perspective === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPerspective(item.id)}
                className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white border-[var(--brand-primary)] shadow-xs'
                    : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)]/50'
                }`}
                title={item.description}
                aria-pressed={isActive}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Zoom, Syntax, Copy, Download */}
        <div className="flex items-center gap-1.5 shrink-0 mr-auto sm:mr-0">
          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)] transition-all cursor-pointer flex items-center justify-center font-bold text-sm"
            title="تكبير (Zoom In)"
            aria-label="تكبير المخطط"
          >
            +
          </button>

          {/* Zoom Reset */}
          <button
            onClick={handleResetZoom}
            className="h-8 px-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all cursor-pointer flex items-center justify-center font-mono text-xs"
            title="إعادة ضبط المقياس 100%"
            aria-label="إعادة ضبط المقياس"
          >
            {Math.round(zoomLevel * 100)}%
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)] transition-all cursor-pointer flex items-center justify-center font-bold text-sm"
            title="تصغير (Zoom Out)"
            aria-label="تصغير المخطط"
          >
            -
          </button>

          <div className="w-px h-5 bg-[var(--border-color)] mx-1" aria-hidden="true" />

          {/* Toggle Syntax Code */}
          <button
            onClick={() => setShowRawSyntax((prev) => !prev)}
            className={`h-8 px-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              showRawSyntax
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
            title="عرض / إخفاء كود Mermaid"
            aria-pressed={showRawSyntax}
          >
            <span>{'{ }'}</span>
            <span className="hidden md:inline">الكود</span>
          </button>

          {/* Copy Mermaid Code */}
          <button
            onClick={handleCopyCode}
            className={`h-8 px-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              copied
                ? 'bg-emerald-600 dark:bg-emerald-800 text-white border-emerald-600 dark:border-emerald-800'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)]'
            }`}
            title="نسخ كود Mermaid إلى الحافظة"
            aria-label="نسخ كود Mermaid"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span className="hidden md:inline">{copied ? 'تم النسخ!' : 'نسخ'}</span>
          </button>

          {/* Download SVG */}
          <button
            onClick={handleDownloadSvg}
            className="h-8 px-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="تنزيل المخطط كملف SVG عالي الدقة"
            aria-label="تنزيل كصورة SVG"
          >
            <span>📥</span>
            <span className="hidden md:inline">تنزيل SVG</span>
          </button>
        </div>
      </div>

      {/* Raw Syntax Panel (When toggled) */}
      {showRawSyntax && (
        <div className="p-3 bg-slate-900 border-b border-slate-800 text-left" dir="ltr">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400 font-mono">
            <span>Mermaid.js Definition</span>
            <button
              onClick={handleCopyCode}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] transition-colors cursor-pointer"
            >
              {copied ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
          <pre className="text-xs text-emerald-400 font-mono overflow-x-auto p-2 bg-slate-950 rounded-lg max-h-48 selection:bg-emerald-800 selection:text-white">
            {currentDiagramCode}
          </pre>
        </div>
      )}

      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        className="mermaid-viewport relative min-h-[300px] max-h-[550px] overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[var(--bg-body)] select-none"
        dir="ltr"
      >
        {isRendering ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="w-8 h-8 border-3 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-[var(--text-muted)]">
              جاري تجهيز المخطط الهندسي محلياً...
            </span>
          </div>
        ) : renderError ? (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs max-w-md text-center">
            <p className="font-bold mb-1">تعذر تصيير المخطط:</p>
            <p className="font-mono text-[11px] opacity-80">{renderError}</p>
          </div>
        ) : (
          <div
            className="mermaid-zoombox transition-transform duration-150 ease-out origin-center flex items-center justify-center w-full max-w-full overflow-hidden pointer-events-none"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="px-3 sm:px-4 py-2 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>محرك تصيير محلي 100% داخل المتصفح (Zero API)</span>
        </div>
        <div className="flex items-center gap-3">
          <span>النوع: {DIAGRAM_PERSPECTIVES.find((p) => p.id === perspective)?.label}</span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span className="hidden sm:inline font-mono">Mermaid.js</span>
        </div>
      </div>
    </div>
  );
};
