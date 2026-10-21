'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAllDiagramLabItems, DiagramFamily } from '@/src/data/diagram-lab.ts';
import { DiagramCard } from './components/DiagramCard.tsx';
import { DiagramComparisonTable } from './components/DiagramComparisonTable.tsx';
import { DiagramSideBySide } from './components/DiagramSideBySide.tsx';
import {
  Workflow,
  Layers,
  Sparkles,
  ExternalLink,
  BookOpen,
  Filter,
  CheckCircle2,
  FileCode,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export default function DiagramLabPage() {
  const allItems = getAllDiagramLabItems();
  const [activeTab, setActiveTab] = useState<'cards' | 'matrix' | 'side-by-side'>('cards');
  const [familyFilter, setFamilyFilter] = useState<'ALL' | DiagramFamily>('ALL');

  const filteredItems = allItems.filter((item) => {
    if (familyFilter === 'ALL') return true;
    return item.family === familyFilter;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8" dir="rtl">
      {/* Breadcrumb Navigation */}
      <nav
        className="text-xs sm:text-sm text-[var(--text-muted)] flex items-center flex-wrap gap-2"
        aria-label="مسار الصفحة"
      >
        <Link href="/" className="hover:text-[var(--brand-primary)] font-medium">
          الرئيسية
        </Link>
        <span className="opacity-40">/</span>
        <Link href="/learn/fundamentals-ai-agents" className="hover:text-[var(--brand-primary)] font-medium">
          مسار التعلم
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text-main)] font-semibold">مختبر المخططات الثمانية</span>
      </nav>

      {/* Main Header Hero */}
      <header
        data-testid="diagram-lab-hero"
        className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-xs relative overflow-hidden min-w-0 max-w-full"
      >
        <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 max-w-full bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5" />
              <span>مختبر هندسي تفاعلي</span>
            </span>
            <span className="rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>8 مخططات معمارية متكاملة</span>
            </span>
            <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              Ai_agents · الموضوعات 11–20
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl break-words [overflow-wrap:anywhere] text-balance leading-tight">
            مختبر المخططات الثمانية <span dir="ltr" className="inline-block">(The 8 Engineering Diagrams Lab)</span>
          </h1>
          <p className="max-w-4xl text-sm sm:text-base leading-8 text-[var(--text-muted)]">
            يقارن الطالب هنا أنواع المخططات الهندسية الثمانية المعتمدة في مسار بناء مشروعه: يتعرف على السؤال المحوري لكل مخطط، وغرضه المعماري، وأسئلة القرار ومتى يختاره، ويعاين ويستنسخ مصادره الصافية، ويفتح المحرر المتخصص الصحيح، وينتقل للموضوع المنشور بالمسار.
          </p>

          {/* Core Philosophy Notice */}
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 dark:border-emerald-900/80 dark:bg-emerald-950/20 p-4 sm:p-5 text-xs sm:text-sm leading-7 text-emerald-950 dark:text-emerald-200 space-y-1">
            <div className="flex items-center gap-2 font-black">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>قاعدة ذهبية: المخططات ككود نصي (Diagrams as Code) وحدود المحركات</span>
            </div>
            <p>
              نعتمد كود <strong>Mermaid.js</strong> للتصيير المباشر داخل المتصفح للمخططات المدعومة؛ بينما تُعرض صيغ <strong>PlantUML</strong> و<strong>DBML</strong> بمصدرها الصافي ومحرراتها المخصصة (PlantText و dbdiagram.io) دون محاولة تشغيلها داخل Mermaid تجنباً لتعطيل العارض.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3 text-center">
              <span className="block text-2xl font-black text-[var(--text-main)]">8</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">مخططات معمارية</span>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3 text-center">
              <span className="block text-2xl font-black text-[var(--text-main)]">3</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">عائلات رسم (Mermaid / PlantUML / DBML)</span>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3 text-center">
              <span className="block text-2xl font-black text-[var(--text-main)]">3</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">محررات حية معتمدة</span>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3 text-center">
              <span className="block text-2xl font-black text-emerald-600">8 / 8</span>
              <span className="text-xs font-bold text-[var(--text-muted)]">مواضيع منشورة بالمسار</span>
            </div>
          </div>
        </div>
      </header>

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="أقسام مختبر المخططات">
          <button
            onClick={() => setActiveTab('cards')}
            role="tab"
            aria-selected={activeTab === 'cards'}
            className={`min-h-[40px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'cards'
                ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white border-[var(--brand-primary)] dark:border-[#162c46] shadow-xs'
                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>بطاقات المخططات التفصيلية ({filteredItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            role="tab"
            aria-selected={activeTab === 'matrix'}
            className={`min-h-[40px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'matrix'
                ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white border-[var(--brand-primary)] dark:border-[#162c46] shadow-xs'
                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>جدول المقارنة الشاملة (Matrix)</span>
          </button>

          <button
            onClick={() => setActiveTab('side-by-side')}
            role="tab"
            aria-selected={activeTab === 'side-by-side'}
            className={`min-h-[40px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'side-by-side'
                ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white border-[var(--brand-primary)] dark:border-[#162c46] shadow-xs'
                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>المقارنة المزدوجة المباشرة (Side-by-Side)</span>
          </button>
        </div>

        {/* Filter Chips when in cards view */}
        {activeTab === 'cards' && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-[var(--text-muted)] ml-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>تصفية:</span>
            </span>
            <button
              onClick={() => setFamilyFilter('ALL')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                familyFilter === 'ALL'
                  ? 'bg-[var(--brand-primary)] dark:bg-[#162c46] text-white border-[var(--brand-primary)] dark:border-[#162c46]'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
              }`}
            >
              الكل (8)
            </button>
            <button
              onClick={() => setFamilyFilter('Mermaid')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                familyFilter === 'Mermaid'
                  ? 'bg-blue-600 dark:bg-blue-800 text-white border-blue-600 dark:border-blue-800'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
              }`}
            >
              Mermaid (6)
            </button>
            <button
              onClick={() => setFamilyFilter('PlantUML')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                familyFilter === 'PlantUML'
                  ? 'bg-purple-600 dark:bg-purple-800 text-white border-purple-600 dark:border-purple-800'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
              }`}
            >
              PlantUML (1)
            </button>
            <button
              onClick={() => setFamilyFilter('DBML')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                familyFilter === 'DBML'
                  ? 'bg-emerald-600 dark:bg-emerald-800 text-white border-emerald-600 dark:border-emerald-800'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
              }`}
            >
              DBML (1)
            </button>
          </div>
        )}
      </div>

      {/* TAB CONTENT 1: CARDS VIEW */}
      {activeTab === 'cards' && (
        <section aria-label="بطاقات المخططات الثمانية" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredItems.map((item) => (
              <DiagramCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* TAB CONTENT 2: COMPARISON MATRIX TABLE */}
      {activeTab === 'matrix' && (
        <section aria-label="جدول المقارنة الشاملة للمخططات">
          <DiagramComparisonTable items={allItems} />
        </section>
      )}

      {/* TAB CONTENT 3: SIDE-BY-SIDE COMPARATOR */}
      {activeTab === 'side-by-side' && (
        <section aria-label="المقارنة الثنائية المباشرة بين مخططين">
          <DiagramSideBySide items={allItems} />
        </section>
      )}

      {/* Bottom Educational Guidance Card */}
      <footer className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-lg font-black text-[var(--text-main)] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>توصيات مسار التعلم التسلسلي (Sequential Project Path)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-[var(--text-muted)] leading-6">
          <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1.5">
            <strong className="text-[var(--text-main)] block font-black">1. لا تخلط بين المفاهيم والجداول</strong>
            <p>
              يسبق النموذج المفاهيمي (Domain Model) تصميم قاعدة البيانات (ERD)؛ حافظ على خلو النموذج المفاهيمي من الحقول الأجنبية (FK).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1.5">
            <strong className="text-[var(--text-main)] block font-black">2. مدخلات كلاسات البرمجة</strong>
            <p>
              يسبق مخطط ERD ومخطط Sequence مخطط الكلاسات (Class Diagram)، لضمان توفر هيكل البيانات واستدعاءات العمليات قبل كتابة الدوال.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1.5">
            <strong className="text-[var(--text-main)] block font-black">3. المخطط الصحيح في المحرر الصحيح</strong>
            <p>
              استخدم Mermaid Live لـ flowchart و sequence و state؛ واستخدم PlantText لـ Use Case؛ واستخدم dbdiagram.io لـ DBML.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
