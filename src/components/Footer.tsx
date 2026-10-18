'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowUp,
  Code2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="mt-auto border-t border-[var(--border-color)] bg-[#0f1d30] text-slate-300 transition-colors"
      dir="rtl"
      role="contentinfo"
    >
      {/* 1. Top Slogan & Engineering Workflow Ribbon */}
      <div className="border-b border-slate-800/80 bg-[#16273e]/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white font-mono">
              Don&apos;t Just Prompt. Engineer.
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-300 font-medium">
            <span className="text-[#10b981] font-bold">منهجية التطوير:</span>{' '}
            فهم <span className="text-slate-500">←</span> توثيق{' '}
            <span className="text-slate-500">←</span> تحليل{' '}
            <span className="text-slate-500">←</span> تصميم{' '}
            <span className="text-slate-500">←</span> تنفيذ تدريجي{' '}
            <span className="text-slate-500">←</span> تحقق
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid (4 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center font-black text-sm ring-1 ring-[#10b981]/50 shadow-xs">
                MET
              </div>
              <div>
                <span className="text-base font-extrabold text-white block leading-tight">
                  سلاح العصر
                </span>
                <span className="text-[11px] text-slate-400 font-medium block">
                  MET Academy
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              دورة تطبيقية متخصصة لنقل طلاب وهواة البرمجة من مجرد توجيه الأسئلة للذكاء الاصطناعي إلى قيادة عمليات هندسة البرمجيات وتحليل النظم وبناء واجهات احترافية قابلة للإنتاج.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 text-[#10b981] border border-slate-700">
                <Code2 className="w-3.5 h-3.5" />
                <span>Next.js 15 App Router</span>
              </span>
            </div>
          </div>

          {/* Column 2: المسار التعليمي */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-r-2 border-[#10b981] pr-2">
              المسار التعليمي
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/start"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> ابدأ هنا (Start Here)
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/git-github-user-flow"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> Git وGitHub وUser Flow
                </Link>
              </li>
              <li>
                <Link
                  href="/borrowhub"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> ورشة مشروع BorrowHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: المختبرات والمكتبات */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-r-2 border-[#10b981] pr-2">
              المختبرات والمكتبات
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/prompts"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> مكتبة الـ31 برومبت
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> خارطة 20 محاضرة للمشروع
                </Link>
              </li>
              <li>
                <Link
                  href="/cheatsheet"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> Cheatsheet البرومبتات
                </Link>
              </li>
              <li>
                <Link
                  href="/diagrams"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> مختبر الـ8 مخططات (Mermaid)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> وكلاء البرمجة (13 وكيلا)
                </Link>
              </li>
              <li>
                <Link
                  href="/models"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> مؤشر الموديلات (الأفضل الآن)
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> القوالب والملفات الهندسية
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: المراجع والمعلومات */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-r-2 border-[#10b981] pr-2">
              المراجع والمعلومات
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/glossary"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> القاموس التقني (35 مصطلح)
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> الأسئلة الشائعة (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-600">›</span> عن الدورة والأكاديمية
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="العودة إلى أعلى الصفحة"
                className="w-full py-2 px-3 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:text-white text-xs font-bold text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#10b981]" />
                <span>العودة للأعلى</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Security & Educational Advisory Callout */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3.5 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 ml-1">تنبيه تعليمي وأمني:</span>
              جميع المواد المعروضة مخصصة للأغراض التعليمية في دورة سلاح العصر. الروابط والأدوات الخارجية (مثل Google Stitch, Mermaid, GitHub, Antigravity) مملوكة لأصحابها. يُحظر تمامًا تخزين أو نشر مفاتيح API الخاصة أو كلمات المرور أو أسرار الأنظمة داخل مستودعات Git العامة.
            </div>
          </div>
        </div>

        {/* 4. Bottom Copyright Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right text-[11px] text-slate-400 font-medium">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} MET Academy — دورة سلاح العصر (Weapon of the Era)
          </div>
          <div className="flex items-center gap-3">
            <span>نسخة التطوير المعتمدة 1.0</span>
            <span className="text-slate-700">•</span>
            <span className="text-[#10b981] font-mono">dir=&quot;rtl&quot;</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
