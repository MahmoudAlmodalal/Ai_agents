'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, FileText, Globe, RotateCcw, Save, Sparkles } from 'lucide-react';
import {
  announcePromptCustomizationChange,
  getBrowserPromptCustomizationStore,
  promptSourceRevision,
  type PromptCustomizationSnapshot,
} from '@/src/lib/promptCustomization';
import {
  getBrowserPromptVariablesStore,
  getPromptVariableSchema,
  hasDedicatedVariableSchema,
  PROMPT_VARIABLES_CHANGE_EVENT,
} from '@/src/lib/promptVariables';

const EMPTY_SNAPSHOT: PromptCustomizationSnapshot = { records: {}, status: 'loading' };

function tryLegacyClipboardCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.append(textarea);
  try {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    return typeof document.execCommand === 'function' && document.execCommand('copy');
  } finally {
    textarea.remove();
  }
}

export function PromptCopyPanel({
  promptSlug,
  body,
  titleAr = 'برومبت',
}: {
  promptSlug: string;
  body: string;
  titleAr?: string;
}) {
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT);
  const [mode, setMode] = useState<'original' | 'variables' | 'custom'>('original');
  const [draft, setDraft] = useState(body);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const storeRef = useRef<ReturnType<typeof getBrowserPromptCustomizationStore> | null>(null);
  const varsStoreRef = useRef<ReturnType<typeof getBrowserPromptVariablesStore> | null>(null);
  const initializedKey = useRef('');

  const sourceRevision = promptSourceRevision(body);
  const customization = snapshot.records[promptSlug];
  const staleCustomization = Boolean(customization && customization.sourceRevision !== sourceRevision);
  const hasDedicated = hasDedicatedVariableSchema(promptSlug);

  const schema = getPromptVariableSchema(promptSlug, titleAr);
  const generatedPrompt = schema.interpolate(body, variableValues);
  const selectedText = mode === 'original' ? body : mode === 'variables' ? generatedPrompt : draft;

  useEffect(() => {
    const varsStore = getBrowserPromptVariablesStore();
    varsStoreRef.current = varsStore;
    const { values } = varsStore.getEffectiveVariables(promptSlug, titleAr);
    setVariableValues(values);

    const onVarsChange = () => {
      const next = varsStore.getEffectiveVariables(promptSlug, titleAr);
      setVariableValues(next.values);
    };

    window.addEventListener(PROMPT_VARIABLES_CHANGE_EVENT, onVarsChange);
    return () => {
      window.removeEventListener(PROMPT_VARIABLES_CHANGE_EVENT, onVarsChange);
    };
  }, [promptSlug, titleAr]);

  useEffect(() => {
    const store = getBrowserPromptCustomizationStore();
    storeRef.current = store;
    let initialized = false;
    const update = () => {
      const next = store.getSnapshot();
      setSnapshot(next);
      if (next.status === 'loading') return;
      const key = `${promptSlug}:${sourceRevision}`;
      if (initializedKey.current !== key && !initialized) {
        initializedKey.current = key;
        initialized = true;
        const saved = next.records[promptSlug];
        setDraft(saved?.text ?? body);
        setMode(saved ? 'custom' : 'original');
        setCopyStatus('idle');
      }
    };
    const unsubscribe = store.subscribe(update);
    update();
    store.refresh();
    return () => {
      unsubscribe();
    };
  }, [body, promptSlug, sourceRevision]);

  const copyPrompt = async () => {
    setCopyStatus('copying');
    setMessage('');
    try {
      if (!selectedText.length) throw new Error('The selected prompt is empty.');
      if (!navigator.clipboard?.writeText) {
        if (!tryLegacyClipboardCopy(selectedText)) throw new Error('Clipboard API unavailable');
      } else {
        try {
          await navigator.clipboard.writeText(selectedText);
        } catch {
          if (!tryLegacyClipboardCopy(selectedText)) throw new Error('Clipboard write failed');
        }
      }
      setCopyStatus('success');
      setMessage(
        mode === 'variables'
          ? 'تم نسخ البرومبت المخصص لمشروعك بنجاح.'
          : 'تم نسخ النص الكامل للنسخة المحددة.',
      );
    } catch {
      setCopyStatus('error');
      setMessage('تعذر النسخ من هذا المتصفح. النص الكامل ظاهر؛ حدده وانسخه يدويًا.');
    }
  };

  const handleVariableChange = (key: string, value: string) => {
    if (!varsStoreRef.current) return;
    varsStoreRef.current.setVariable(promptSlug, titleAr, key, value);
    setVariableValues((prev) => ({ ...prev, [key]: value }));
    setCopyStatus('idle');
  };

  const resetVariables = () => {
    if (!varsStoreRef.current) return;
    varsStoreRef.current.resetPromptOverrides(promptSlug);
    const { values } = varsStoreRef.current.getEffectiveVariables(promptSlug, titleAr);
    setVariableValues(values);
    setCopyStatus('idle');
    setMessage('أُعيدت مدخلات هذا البرومبت إلى القيم المعتمدة لمشروعك.');
  };

  const transferToManualDraft = () => {
    setDraft(generatedPrompt);
    setMode('custom');
    setCopyStatus('idle');
    setMessage('تم نقل النص المخصص إلى محرر التخصيص الحر. يمكنك تعديله وحفظه محليًا.');
  };

  const saveCustomization = () => {
    if (!storeRef.current) return;
    if (!draft.trim()) {
      setMessage('أضف نصًا إلى التخصيص قبل حفظه.');
      return;
    }
    const result = storeRef.current.save(promptSlug, draft, sourceRevision);
    announcePromptCustomizationChange();
    setSnapshot(result);
    setMessage(
      result.status === 'available'
        ? 'حُفظ هذا التخصيص محليًا في المتصفح على هذا الجهاز.'
        : result.status === 'write-error'
          ? 'التخصيص متاح في هذه الجلسة، لكن تعذر حفظه محليًا.'
          : result.status === 'invalid'
            ? 'بيانات التخصيص المحفوظة غير صالحة؛ تُركت دون تغيير.'
            : 'تعذرت قراءة التخزين المحلي؛ بقي التخصيص في هذه الجلسة فقط.',
    );
  };

  const resetCustomization = () => {
    if (!storeRef.current) return;
    const result = storeRef.current.remove(promptSlug);
    announcePromptCustomizationChange();
    setSnapshot(result);
    setDraft(body);
    setMode('original');
    setCopyStatus('idle');
    setMessage(
      result.status === 'available'
        ? 'عادت النسخة المحددة إلى النص الأصلي وحُذف تخصيص هذا البرومبت.'
        : result.status === 'write-error'
          ? 'عادت النسخة إلى الأصل في هذه الجلسة، لكن تعذر حفظ إعادة الضبط.'
          : result.status === 'invalid'
            ? 'تم اختيار النص الأصلي لهذه الجلسة؛ تعذر تغيير بيانات التخزين غير الصالحة.'
            : 'تم اختيار النص الأصلي لهذه الجلسة؛ تعذر قراءة التخزين المحلي.',
    );
  };

  const storageStatusText =
    snapshot.status === 'invalid'
      ? 'بيانات التخصيص المحلية غير صالحة؛ لم تُستبدل.'
      : snapshot.status === 'read-error'
        ? 'تعذرت قراءة التخزين المحلي؛ لا يمكن تأكيد حفظ التخصيصات السابقة.'
        : snapshot.status === 'write-error'
          ? 'هناك تخصيصات في الجلسة لم يتم حفظها على هذا الجهاز.'
          : '';

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-sm text-slate-300">
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          {mode === 'variables'
            ? 'برومبت مخصص لمشروعك عبر المتغيرات'
            : mode === 'custom'
              ? 'محرر تخصيص يدوي حر'
              : 'النص الأصلي محفوظ كما ورد في المصدر'}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMode('original');
              setCopyStatus('idle');
            }}
            aria-pressed={mode === 'original'}
            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 px-3 py-2 text-xs font-bold aria-pressed:border-emerald-400 aria-pressed:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            الأصل
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('variables');
              setCopyStatus('idle');
            }}
            aria-pressed={mode === 'variables'}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-600 px-3 py-2 text-xs font-bold aria-pressed:border-emerald-400 aria-pressed:bg-emerald-950/40 aria-pressed:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            تخصيص بالمتغيرات
            {hasDedicated && (
              <span className="mr-1 rounded bg-emerald-500/20 px-1 py-0.2 text-[10px] text-emerald-300">
                مخصص
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('custom');
              setCopyStatus('idle');
            }}
            aria-pressed={mode === 'custom'}
            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 px-3 py-2 text-xs font-bold aria-pressed:border-emerald-400 aria-pressed:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            تخصيصي
          </button>
          <button
            onClick={copyPrompt}
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-70"
            type="button"
            disabled={copyStatus === 'copying' || !selectedText.length}
          >
            {copyStatus === 'success' ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copyStatus === 'copying'
              ? 'جارٍ النسخ…'
              : copyStatus === 'success'
                ? 'تم النسخ'
                : 'نسخ النسخة المحددة'}
          </button>
        </div>
      </div>

      {mode === 'variables' ? (
        <div className="p-4 sm:p-6">
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-slate-100">
                <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                تخصيص البرومبت لمشروعك بالمتغيرات
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-300">
                  <Globe className="h-3 w-3" aria-hidden="true" />
                  حفظ تلقائي لملف المشروع
                </span>
              </div>
            </div>
            <p className="mt-1 text-xs leading-6 text-slate-300">
              أجب عن الأسئلة أدناه لضبط مدخلات مشروعك؛ يتحدث البرومبت في المعاينة فوريًا ليصبح جاهزًا للنسخ والاستخدام.
            </p>

            <div className="mt-5 space-y-4">
              {schema.variables.map((variable) => {
                const inputId = `prompt-var-${promptSlug}-${variable.key}`;
                const currentValue = variableValues[variable.key] ?? variable.defaultValue;
                return (
                  <div
                    key={variable.key}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 transition-colors focus-within:border-emerald-500/50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor={inputId} className="text-xs font-bold text-slate-200">
                        {variable.label}
                      </label>
                      {variable.isGlobal && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/40 bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          <Globe className="h-2.5 w-2.5" aria-hidden="true" />
                          مشروع عام (يُزامن تلقائيًا)
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-400">{variable.question}</p>
                    {variable.multiline ? (
                      <textarea
                        id={inputId}
                        value={currentValue}
                        onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        placeholder={variable.placeholder}
                        rows={2}
                        dir="auto"
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs leading-6 text-slate-100 placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      />
                    ) : (
                      <input
                        id={inputId}
                        type="text"
                        value={currentValue}
                        onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                        placeholder={variable.placeholder}
                        dir="auto"
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs leading-6 text-slate-100 placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
              <button
                type="button"
                onClick={resetVariables}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                إعادة ضبط مدخلات هذا البرومبت
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={transferToManualDraft}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  نقل إلى التخصيص الحر للتعديل اليدوي
                </button>
                <button
                  type="button"
                  onClick={copyPrompt}
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  نسخ البرومبت المخصص
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">المعاينة الفورية للنص المولد (جاهز للنسخ):</span>
              <span className="text-slate-400">تحديث تلقائي مع كل حرف</span>
            </div>
            <pre
              dir="auto"
              className="max-h-[50vh] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-900 p-5 font-mono text-sm leading-7 text-slate-100 sm:p-6"
            >
              {generatedPrompt}
            </pre>
          </div>
        </div>
      ) : mode === 'custom' ? (
        <div className="p-4 sm:p-6">
          <label
            htmlFor={`prompt-customization-${promptSlug}`}
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت
          </label>
          <textarea
            id={`prompt-customization-${promptSlug}`}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setCopyStatus('idle');
            }}
            dir="auto"
            spellCheck={false}
            className="min-h-72 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-7 text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-describedby={`prompt-customization-help-${promptSlug}`}
          />
          <p
            id={`prompt-customization-help-${promptSlug}`}
            className="mt-2 text-xs leading-6 text-slate-400"
          >
            يُحفظ هذا النص لهذا البرومبت فقط في المتصفح على هذا الجهاز عند الضغط على حفظ.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={saveCustomization}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              حفظ التخصيص
            </button>
            {customization && (
              <button
                type="button"
                onClick={resetCustomization}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                إعادة إلى الأصل وحذف التخصيص
              </button>
            )}
          </div>
          {staleCustomization && (
            <p
              role="status"
              className="mt-3 rounded-lg border border-amber-600/60 bg-amber-950/50 p-3 text-sm leading-6 text-amber-200"
            >
              تغير النص الأصلي منذ حفظ هذا التخصيص. بقي نصك محفوظًا كما هو؛ راجع النسخة الأصلية
              الحالية ثم عدّل تخصيصك أو أعد ضبطه يدويًا.
            </p>
          )}
        </div>
      ) : (
        <pre
          dir="auto"
          className="max-h-[65vh] overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-slate-100 sm:p-8"
        >
          {body}
        </pre>
      )}

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`min-h-7 px-4 pb-3 text-xs leading-6 ${
          copyStatus === 'error' ||
          snapshot.status === 'write-error' ||
          snapshot.status === 'invalid'
            ? 'text-amber-300'
            : 'text-emerald-300'
        }`}
      >
        {message ||
          (copyStatus === 'success' ? 'تم نسخ النص الكامل إلى الحافظة.' : '')}
      </p>
      {storageStatusText && (
        <p
          role="status"
          className="border-t border-slate-800 px-4 py-3 text-xs leading-6 text-amber-300"
        >
          {storageStatusText}
        </p>
      )}
    </section>
  );
}
