'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Layout,
  Code2,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Laptop,
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'urgent' | 'important' | 'normal';
  priorityLabel: string;
  done: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'إعداد هيكل المشروع مع Next.js 15 و Tailwind', priority: 'urgent', priorityLabel: 'عاجل', done: true },
  { id: '2', title: 'بناء نموذج المهام وربطه بالتخزين المحلي (LocalStorage)', priority: 'important', priorityLabel: 'مهم', done: true },
  { id: '3', title: 'إضافة تصفية المهام وتأثيرات الإنجاز الحركية', priority: 'normal', priorityLabel: 'عادي', done: false },
];

const CODE_SNIPPET = `// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('devfocus_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('devfocus_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.warn('Failed to save tasks', e);
    }
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return { tasks, toggleTask };
}`;

export interface InteractiveWorkflowExampleProps {
  className?: string;
}

export function InteractiveWorkflowExample({ className = '' }: InteractiveWorkflowExampleProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [copied, setCopied] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in non-HTTPS or test environments
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <section
      aria-label="مثال تفاعلي مصغر"
      className={`w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-6 lg:p-7 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[var(--border-color)]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>تجربة تفاعلية حية</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
            شاهد كيف تتحول فكرة بسيطة إلى مشروع حقيقي في 3 خطوات
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            من فكرة تطبيق مهام سريعة إلى مواصفات واضحة وتصميم واجهة وكود نهائي نظيف يعمل فعلياً.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-card-subtle)] p-1.5 rounded-xl border border-[var(--border-color)] self-start sm:self-auto">
          <span className="text-xs font-semibold px-2 text-[var(--text-muted)]">
            {`خطوة ${activeStep} من 3`}
          </span>
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div
        role="tablist"
        aria-label="خطوات تحويل الفكرة إلى مشروع"
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5"
      >
        <button
          type="button"
          role="tab"
          id="step-tab-1"
          aria-selected={activeStep === 1}
          aria-controls="step-panel-1"
          onClick={() => setActiveStep(1)}
          className={`cursor-pointer flex items-center gap-3 p-3.5 rounded-xl border text-right transition-all ${
            activeStep === 1
              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 text-blue-950 dark:text-blue-100 shadow-xs'
              : 'bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${
              activeStep === 1
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            1
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-sm truncate flex items-center gap-1.5">
              <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>1. الفكرة ووثيقة الـ PRD</span>
            </div>
            <div className="text-xs opacity-80 truncate">المواصفات ونطاق MVP</div>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          id="step-tab-2"
          aria-selected={activeStep === 2}
          aria-controls="step-panel-2"
          onClick={() => setActiveStep(2)}
          className={`cursor-pointer flex items-center gap-3 p-3.5 rounded-xl border text-right transition-all ${
            activeStep === 2
              ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-400 dark:border-purple-700 text-purple-950 dark:text-purple-100 shadow-xs'
              : 'bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${
              activeStep === 2
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            2
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-sm truncate flex items-center gap-1.5">
              <Layout className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>2. شاشة التصميم (UI)</span>
            </div>
            <div className="text-xs opacity-80 truncate">تجربة تطبيق حية وتفاعلية</div>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          id="step-tab-3"
          aria-selected={activeStep === 3}
          aria-controls="step-panel-3"
          onClick={() => setActiveStep(3)}
          className={`cursor-pointer flex items-center gap-3 p-3.5 rounded-xl border text-right transition-all ${
            activeStep === 3
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 shadow-xs'
              : 'bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${
              activeStep === 3
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            3
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-sm truncate flex items-center gap-1.5">
              <Code2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>3. الكود النهائي النظيف</span>
            </div>
            <div className="text-xs opacity-80 truncate">React + Hook محلي حقيقي</div>
          </div>
        </button>
      </div>

      {/* Step Panels Content */}
      <div className="mt-5">
        {/* Step 1: PRD */}
        {activeStep === 1 && (
          <div
            role="tabpanel"
            id="step-panel-1"
            aria-labelledby="step-tab-1"
            className="space-y-4"
          >
            <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs sm:text-sm">
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <span>💬 أمر البرومبت الموجَّه للذكاء الاصطناعي (Prompt):</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed select-all">
                &quot;أريد بناء تطبيق إدارة مهام يومية للمطورين (<bdi dir="ltr" className="font-mono">DevFocus</bdi>): مهام سريعة، تحديد الأولوية بنقرة واحدة، وحفظ البيانات محلياً على الجهاز دون الحاجة لخادم أو تسجيل دخول.&quot;
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-blue-200 dark:border-blue-900 bg-[var(--bg-card)] space-y-3.5">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
                <div className="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>مخرج وثيقة المواصفات (<bdi dir="ltr">PRD</bdi>)</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-[11px] font-bold">
                  جاهز للتنفيذ
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)]">
                  <div className="text-xs font-bold text-[var(--text-main)] mb-1">1. المشكلة والجمهور المستهدف</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    المطورون يتشتتون من أدوات إدارة المهام المعقدة. الحل: أداة مركزة وسريعة تفتح فوراً وتحفظ محلياً.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)]">
                  <div className="text-xs font-bold text-[var(--text-main)] mb-1">2. نطاق الإصدار الأول (<bdi dir="ltr">MVP</bdi>)</div>
                  <ul className="text-xs text-[var(--text-muted)] space-y-1 list-disc list-inside">
                    <li>إدخال سريع للمهمة</li>
                    <li>3 أولويات (عاجل، مهم، عادي)</li>
                    <li>تخزين محلي عبر <code dir="ltr" className="font-mono">localStorage</code></li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)]">
                  <div className="text-xs font-bold text-[var(--text-main)] mb-1">3. معايير القبول</div>
                  <ul className="text-xs text-[var(--text-muted)] space-y-1 list-disc list-inside">
                    <li>فتح فوري دون انتظار خادم</li>
                    <li>لا يتطلب أي مصادقة أو حساب</li>
                    <li>حفظ الحالة تلقائياً عند أي تعديل</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs border-t border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">
                  تعلّم كيفية صياغة وتوليد هذه الوثيقة عملياً:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/learn/discovery-grill-me"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <span>موضوع 02: استجواب الفكرة (Grill Me)</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </Link>
                  <span className="text-[var(--text-muted)]">•</span>
                  <Link
                    href="/learn/prd-specification"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <span>موضوع 03: وثيقة متطلبات المنتج (PRD)</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Interactive UI */}
        {activeStep === 2 && (
          <div
            role="tabpanel"
            id="step-panel-2"
            aria-labelledby="step-tab-2"
            className="space-y-4"
          >
            <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs sm:text-sm">
              <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1">
                <span>💬 أمر توليد الواجهة (<bdi dir="ltr">UI System Prompt</bdi>):</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed select-all">
                &quot;صمّم شاشة واجهة تفاعلية بسيطة لتطبيق <bdi dir="ltr" className="font-mono">DevFocus</bdi>: بطاقات مهام واضحة، ألوان أولويات دلالية، وعداد إنجاز حي يتفاعل فورياً مع نقرات المستخدم.&quot;
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-purple-200 dark:border-purple-900 bg-[var(--bg-card)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-main)]">
                  <Laptop className="w-4 h-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <span>محاكاة تفاعلية حية لشاشة التطبيق (جرّب النقر على المهام):</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-bold">
                  <span>{`تم إنجاز ${completedCount} من أصل ${tasks.length} مهام`}</span>
                </div>
              </div>

              <div className="space-y-2">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    aria-pressed={task.done}
                    className={`w-full text-right cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all ${
                      task.done
                        ? 'bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-muted)] line-through'
                        : 'bg-[var(--bg-surface)] hover:border-purple-300 dark:hover:border-purple-700 border-[var(--border-color)] text-[var(--text-main)] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {task.done ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-xs sm:text-sm font-medium">{task.title}</span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold shrink-0 ${
                        task.priority === 'urgent'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                          : task.priority === 'important'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {task.priorityLabel}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs border-t border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">
                  تعلّم أسرار تصميم وتوليد هذه الواجهات الذكية:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/learn/stitch-reference-screen"
                    className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                  >
                    <span>موضوع 21: الشاشة المرجعية في Stitch</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </Link>
                  <span className="text-[var(--text-muted)]">•</span>
                  <Link
                    href="/learn/design-system-rules"
                    className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                  >
                    <span>موضوع 22: قواعد نظام التصميم</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Clean Code */}
        {activeStep === 3 && (
          <div
            role="tabpanel"
            id="step-panel-3"
            aria-labelledby="step-tab-3"
            className="space-y-4"
          >
            <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs sm:text-sm">
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <span>💬 أمر توليد الكود النظيف (<bdi dir="ltr">Clean Code Prompt</bdi>):</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed select-all">
                &quot;اكتب كود <bdi dir="ltr" className="font-mono">React 19 + TypeScript</bdi> نظيف مع خطاف مخصص (<bdi dir="ltr" className="font-mono">Custom Hook</bdi>) لحفظ المهام في <bdi dir="ltr" className="font-mono">localStorage</bdi> بدون تعقيدات زائدة.&quot;
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-gray-950 text-gray-100 overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800 text-xs">
                <div className="flex items-center gap-2 font-mono text-gray-300" dir="ltr">
                  <Code2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>src/hooks/useTasks.ts</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>نسخ الكود</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-emerald-300/90" dir="ltr">
                <code>{CODE_SNIPPET}</code>
              </pre>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-gray-900/80 border-t border-gray-800 text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>مبدأ <bdi dir="ltr">YAGNI</bdi>: كود بسيط بدون مكتبات إضافية</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>أنواع <bdi dir="ltr">TypeScript</bdi> دقيقة وقوية</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>معالجة آمنة لبيئة <bdi dir="ltr">SSR</bdi> والتخزين المحلي</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs">
              <span className="text-[var(--text-muted)]">
                تعلّم هندسة الأكواد النظيفة وبناء المكونات:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/learn/react-components-state"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  <span>موضوع 31: React المكونات والحالة</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </Link>
                <span className="text-[var(--text-muted)]">•</span>
                <Link
                  href="/learn/nextjs-app-router"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  <span>موضوع 33: Next.js App Router</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-5 mt-5 border-t border-[var(--border-color)]">
        <button
          type="button"
          disabled={activeStep === 1}
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1) as 1 | 2 | 3)}
          className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            activeStep === 1
              ? 'opacity-40 cursor-not-allowed border-[var(--border-color)] text-[var(--text-muted)]'
              : 'border-[var(--border-color)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-main)]'
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span>الخطوة السابقة</span>
        </button>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setActiveStep(step as 1 | 2 | 3)}
              aria-label={`الانتقال إلى خطوة ${step}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeStep === step
                  ? 'bg-blue-600 w-6'
                  : 'w-2.5 bg-[var(--border-color)] hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          disabled={activeStep === 3}
          onClick={() => setActiveStep((prev) => Math.min(3, prev + 1) as 1 | 2 | 3)}
          className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            activeStep === 3
              ? 'opacity-40 cursor-not-allowed border-[var(--border-color)] text-[var(--text-muted)]'
              : 'bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-2xs'
          }`}
        >
          <span>الخطوة التالية</span>
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
