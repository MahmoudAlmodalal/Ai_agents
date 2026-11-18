'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { BookOpen, ExternalLink, X } from 'lucide-react';
import { getGlossaryTerm, GlossaryDefinition } from '@/src/data/glossaryTerms.ts';
import { BidiText, formatBidiString } from '@/src/components/BidiText.tsx';
import { normalizeArabic } from '@/src/utils/searchUtils.ts';

interface TechTermTooltipProps {
  term: string;
  definition?: GlossaryDefinition;
  children: ReactNode;
  className?: string;
}

export const TechTermTooltip: React.FC<TechTermTooltipProps> = ({
  term,
  definition: customDef,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const def = customDef || getGlossaryTerm(term);

  // Close on outside click or escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!def) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }
        }}
        onFocus={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={`${def.term}: ${def.label}`}
        className="inline-flex items-center gap-0.5 border-b border-dashed border-emerald-500/70 dark:border-emerald-400/70 hover:border-solid hover:border-emerald-600 dark:hover:border-emerald-300 text-inherit font-inherit cursor-help transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <span>{children}</span>
      </span>

      {isOpen && (
        <div
          ref={tooltipRef}
          role="dialog"
          aria-label={def.label}
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 bottom-full mb-2 start-1/2 -translate-x-1/2 w-72 sm:w-80 p-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-right animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5 pb-1.5 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="inline-flex p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50 truncate">
                {def.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق التلميح"
              className="p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-sm transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 mb-2.5">
            {def.description}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              شرح مبسط للمبتدئين
            </span>
            <Link
              href={def.href}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors font-semibold"
            >
              <span>القاموس الكامل</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </span>
  );
};

const TERM_PATTERN = /\b(Spec Kit|User Flow|Domain Model|Mock Data|MVP|PRD|SRS|MCP|DBML|ERD|API|UI|UX)\b/gi;

function highlightQueryText(text: string, query: string): ReactNode {
  if (!query || !query.trim()) {
    return text;
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

/**
 * Splits text and wraps recognized technical acronyms in a TechTermTooltip.
 */
export function renderWithTechTerms(
  text: string,
  searchQuery: string = ''
): ReactNode {
  if (!text) return text;

  const parts = text.split(TERM_PATTERN);
  if (parts.length === 1) {
    return searchQuery ? highlightQueryText(text, searchQuery) : text;
  }

  return parts.map((part, index) => {
    const termDef = getGlossaryTerm(part);
    if (termDef) {
      return (
        <TechTermTooltip key={`${part}-${index}`} term={part} definition={termDef}>
          {searchQuery ? highlightQueryText(part, searchQuery) : part}
        </TechTermTooltip>
      );
    }
    return (
      <React.Fragment key={index}>
        {searchQuery ? highlightQueryText(part, searchQuery) : part}
      </React.Fragment>
    );
  });
}

/**
 * Like renderWithTechTerms, but normalizes Arabic waw spacing and isolates all Latin segments in `<bdi dir="ltr">`.
 */
export function renderBidiWithTechTerms(
  text: string,
  searchQuery: string = ''
): ReactNode {
  if (!text) return text;
  const normalized = formatBidiString(text);
  const parts = normalized.split(TERM_PATTERN);

  return parts.map((part, index) => {
    if (!part) return null;
    const termDef = getGlossaryTerm(part);
    if (termDef) {
      return (
        <TechTermTooltip key={`${part}-${index}`} term={part} definition={termDef}>
          <bdi dir="ltr" className="[word-break:normal]">
            {searchQuery ? highlightQueryText(part, searchQuery) : part}
          </bdi>
        </TechTermTooltip>
      );
    }
    if (searchQuery && searchQuery.trim()) {
      return (
        <React.Fragment key={index}>
          {highlightQueryText(part, searchQuery)}
        </React.Fragment>
      );
    }
    return <BidiText key={index} text={part} />;
  });
}
