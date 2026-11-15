'use client';

import React, { useState, useEffect } from 'react';
import {
  STUDENT_BACKEND_PROMPTS,
  BORROWHUB_PRESET,
  CANDYLOZ_PRESET,
  renderPrompt,
  VARIABLE_PLACEHOLDERS,
  type ProjectVariables,
  type ProjectVariableKey,
} from '@/src/lib/promptCustomizer';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const STORAGE_KEY = 'ai-agents-student-backend-customizer-v1';

export function PromptCustomizerWidget() {
  const [variables, setVariables] = useState<ProjectVariables>(BORROWHUB_PRESET);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [expandedPrompts, setExpandedPrompts] = useState<Record<string, boolean>>({
    'backend-01-phased-plan': true,
  });
  const [storageError, setStorageError] = useState<string | null>(null);

  // Safe load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setVariables((prev) => ({
            projectName: typeof parsed.projectName === 'string' && parsed.projectName ? parsed.projectName : prev.projectName,
            domainSummary: typeof parsed.domainSummary === 'string' && parsed.domainSummary ? parsed.domainSummary : prev.domainSummary,
            targetUsers: typeof parsed.targetUsers === 'string' && parsed.targetUsers ? parsed.targetUsers : prev.targetUsers,
            coreEntities: typeof parsed.coreEntities === 'string' && parsed.coreEntities ? parsed.coreEntities : prev.coreEntities,
            stateEntity: typeof parsed.stateEntity === 'string' && parsed.stateEntity ? parsed.stateEntity : prev.stateEntity,
            appName: typeof parsed.appName === 'string' && parsed.appName ? parsed.appName : prev.appName,
          }));
        }
      }
    } catch {
      setStorageError('تعذر القراءة من التخزين المحلي؛ يتم استخدام القيم الافتراضية.');
    }
  }, []);

  // Safe save to localStorage
  const handleVariableChange = (key: ProjectVariableKey, value: string) => {
    setVariables((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setStorageError(null);
      } catch {
        setStorageError('تعذر الحفظ في التخزين المحلي (ربما بسبب وضع التصفح الخاص أو امتلاء الذاكرة).');
      }
      return updated;
    });
  };

  const applyPreset = (preset: ProjectVariables) => {
    setVariables(preset);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preset));
      setStorageError(null);
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setVariables(BORROWHUB_PRESET);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setStorageError(null);
    } catch {
      // ignore
    }
  };

  const copyToClipboard = async (promptId: string, text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedPromptId(promptId);
      setTimeout(() => {
        setCopiedPromptId((curr) => (curr === promptId ? null : curr));
      }, 2000);
    } catch {
      setStorageError('تعذر النسخ التلقائي، يمكنك تحديد النص ونسخه يدوياً.');
    }
  };

  const togglePromptExpand = (id: string) => {
    setExpandedPrompts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-8 text-[var(--text-main)] shadow-xl" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm mb-1">
            <Sparkles className="h-5 w-5" />
            <span>السقالات التفاعلية للذكاء الاصطناعي (Interactive AI Scaffolding)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            مولّد برومبتات الباك إند المخصصة لمشروعك
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            أدخل تفاصيل مشروعك مرة واحدة هنا؛ لتُحقن ديناميكياً داخل السلسلة الذهبية (الـ 9 برومبتات) وتكون جاهزة للنسخ بنقرة واحدة دون تعديل يدوي.
          </p>
        </div>

        {/* Action Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset(BORROWHUB_PRESET)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition"
          >
            مثال منصة BorrowHub
          </button>
          <button
            type="button"
            onClick={() => applyPreset(CANDYLOZ_PRESET)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 transition"
          >
            مثال متجر Candy Loz
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-red-400 hover:border-red-500/30 transition"
            title="إعادة التعيين للوضع الافتراضي"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة تعيين</span>
          </button>
        </div>
      </div>

      {storageError && (
        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{storageError}</span>
        </div>
      )}

      {/* Variables Input Grid */}
      <div className="mb-8 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-5">
        <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-[var(--accent)]">
          <Sliders className="h-4 w-4" />
          <span>بيانات مشروعك الخاصة (تُحقن تلقائياً في البرومبتات):</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Project Name */}
          <div>
            <label className="block text-xs font-bold mb-1 text-[var(--text-main)]">
              {VARIABLE_PLACEHOLDERS.projectName.labelAr}
            </label>
            <input
              type="text"
              value={variables.projectName}
              onChange={(e) => handleVariableChange('projectName', e.target.value)}
              placeholder="مثال: BorrowHub أو متجر السعادة"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              {VARIABLE_PLACEHOLDERS.projectName.questionAr}
            </span>
          </div>

          {/* Domain Summary */}
          <div>
            <label className="block text-xs font-bold mb-1 text-[var(--text-main)]">
              {VARIABLE_PLACEHOLDERS.domainSummary.labelAr}
            </label>
            <input
              type="text"
              value={variables.domainSummary}
              onChange={(e) => handleVariableChange('domainSummary', e.target.value)}
              placeholder="مثال: منصة استعارة أجهزة أو متجر إلكتروني"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              {VARIABLE_PLACEHOLDERS.domainSummary.questionAr}
            </span>
          </div>

          {/* Target Users */}
          <div>
            <label className="block text-xs font-bold mb-1 text-[var(--text-main)]">
              {VARIABLE_PLACEHOLDERS.targetUsers.labelAr}
            </label>
            <input
              type="text"
              value={variables.targetUsers}
              onChange={(e) => handleVariableChange('targetUsers', e.target.value)}
              placeholder="مثال: طالب، مشرف، مدير"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              {VARIABLE_PLACEHOLDERS.targetUsers.questionAr}
            </span>
          </div>

          {/* Core Entities */}
          <div>
            <label className="block text-xs font-bold mb-1 text-[var(--text-main)]">
              {VARIABLE_PLACEHOLDERS.coreEntities.labelAr}
            </label>
            <input
              type="text"
              value={variables.coreEntities}
              onChange={(e) => handleVariableChange('coreEntities', e.target.value)}
              placeholder="مثال: مستخدمين، منتجات، طلبات، فواتير"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              {VARIABLE_PLACEHOLDERS.coreEntities.questionAr}
            </span>
          </div>

          {/* State Entity */}
          <div>
            <label className="block text-xs font-bold mb-1 text-[var(--text-main)]">
              {VARIABLE_PLACEHOLDERS.stateEntity.labelAr}
            </label>
            <input
              type="text"
              value={variables.stateEntity}
              onChange={(e) => handleVariableChange('stateEntity', e.target.value)}
              placeholder="مثال: الطلب (Order) أو الإعارة (Loan)"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              {VARIABLE_PLACEHOLDERS.stateEntity.questionAr}
            </span>
          </div>

          {/* Django App Name */}
          <div>
            <label className="block text-xs font-bold mb-1 text-[var(--text-main)]">
              {VARIABLE_PLACEHOLDERS.appName.labelAr}
            </label>
            <input
              type="text"
              value={variables.appName}
              onChange={(e) => handleVariableChange('appName', e.target.value)}
              placeholder="مثال: loans أو orders أو catalog"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-emerald-500 transition"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              {VARIABLE_PLACEHOLDERS.appName.questionAr}
            </span>
          </div>
        </div>
      </div>

      {/* Prompts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            <span>البرومبتات الـ 9 المولّدة (جاهزة للنسخ الفوري لمشروعك):</span>
          </h3>
          <span className="text-xs text-[var(--text-muted)]">
            مكتمل التجهيز: 9 / 9
          </span>
        </div>

        <div className="space-y-4">
          {STUDENT_BACKEND_PROMPTS.map((template, idx) => {
            const { rendered, missingVariables, unreplacedTokens } = renderPrompt(template, variables);
            const isCopied = copiedPromptId === template.id;
            const isExpanded = expandedPrompts[template.id] ?? false;

            return (
              <div
                key={template.id}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] overflow-hidden transition"
              >
                {/* Accordion / Prompt Header */}
                <div
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-[var(--bg-card)] transition"
                  onClick={() => togglePromptExpand(template.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                      {template.number}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[var(--text-main)]">
                        {template.titleAr}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        المرحلة: <span className="font-semibold text-emerald-500">{template.stageAr}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                    {missingVariables.length === 0 ? (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>جاهز ومخصص</span>
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <AlertCircle className="h-3 w-3" />
                        <span>حقول متبقية: {missingVariables.length}</span>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => copyToClipboard(template.id, rendered)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                      }`}
                      aria-label={`نسخ البرومبت ${template.number}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>✓ تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>نسخ البرومبت</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePromptExpand(template.id)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] transition"
                      aria-label={isExpanded ? 'إخفاء النص' : 'عرض النص'}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="border-t border-[var(--border-color)] p-4 sm:p-5 bg-[var(--bg-card)]">
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-6 mb-3">
                      🎯 <strong>الهدف:</strong> {template.goalAr}
                    </p>

                    {/* Pre-formatted Prompt Box */}
                    <div className="relative rounded-xl border border-[var(--border-color)] bg-[#0d1117] p-4" dir="ltr">
                      <pre className="font-mono text-xs sm:text-sm leading-6 text-slate-100 whitespace-pre-wrap overflow-x-auto max-h-[350px]">
                        <code>{rendered}</code>
                      </pre>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span>
                        المتغيرات المستبدلة: {template.requiredVariables.map((v) => VARIABLE_PLACEHOLDERS[v].labelAr).join('، ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(template.id, rendered)}
                        className="text-emerald-400 hover:underline font-bold"
                      >
                        نسخ هذا البرومبت
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
