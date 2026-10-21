'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, FileText, RotateCcw, Save } from 'lucide-react';
import {
  announcePromptCustomizationChange,
  getBrowserPromptCustomizationStore,
  promptSourceRevision,
  type PromptCustomizationSnapshot,
} from '@/src/lib/promptCustomization';

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

export function PromptCopyPanel({ promptSlug, body }: { promptSlug: string; body: string }) {
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT);
  const [mode, setMode] = useState<'original' | 'custom'>('original');
  const [draft, setDraft] = useState(body);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const storeRef = useRef<ReturnType<typeof getBrowserPromptCustomizationStore> | null>(null);
  const initializedKey = useRef('');
  const sourceRevision = promptSourceRevision(body);
  const customization = snapshot.records[promptSlug];
  const staleCustomization = Boolean(customization && customization.sourceRevision !== sourceRevision);
  const selectedText = mode === 'original' ? body : draft;

  useEffect(() => {
    const store = getBrowserPromptCustomizationStore();
    storeRef.current = store;
    const update = () => {
      const next = store.getSnapshot();
      setSnapshot(next);
      if (next.status === 'loading') return;
      const key = `${promptSlug}:${sourceRevision}`;
      if (initializedKey.current !== key) {
        initializedKey.current = key;
        const saved = next.records[promptSlug];
        setDraft(saved?.text ?? body);
        setMode(saved ? 'custom' : 'original');
        setCopyStatus('idle');
      }
    };
    const unsubscribe = store.subscribe(update);
    update();
    store.refresh();
    update();
    return () => { unsubscribe(); };
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
      setMessage('تم نسخ النص الكامل للنسخة المحددة.');
    } catch {
      setCopyStatus('error');
      setMessage('تعذر النسخ من هذا المتصفح. النص الكامل ظاهر؛ حدده وانسخه يدويًا.');
    }
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
    setMessage(result.status === 'available'
      ? 'حُفظ هذا التخصيص محليًا في المتصفح على هذا الجهاز.'
      : result.status === 'write-error'
        ? 'التخصيص متاح في هذه الجلسة، لكن تعذر حفظه محليًا.'
        : result.status === 'invalid'
          ? 'بيانات التخصيص المحفوظة غير صالحة؛ تُركت دون تغيير.'
          : 'تعذرت قراءة التخزين المحلي؛ بقي التخصيص في هذه الجلسة فقط.');
  };

  const resetCustomization = () => {
    if (!storeRef.current) return;
    const result = storeRef.current.remove(promptSlug);
    announcePromptCustomizationChange();
    setSnapshot(result);
    setDraft(body);
    setMode('original');
    setCopyStatus('idle');
    setMessage(result.status === 'available'
      ? 'عادت النسخة المحددة إلى النص الأصلي وحُذف تخصيص هذا البرومبت.'
      : result.status === 'write-error'
        ? 'عادت النسخة إلى الأصل في هذه الجلسة، لكن تعذر حفظ إعادة الضبط.'
        : result.status === 'invalid'
          ? 'تم اختيار النص الأصلي لهذه الجلسة؛ تعذر تغيير بيانات التخزين غير الصالحة.'
          : 'تم اختيار النص الأصلي لهذه الجلسة؛ تعذر قراءة التخزين المحلي.');
  };

  const storageStatusText = snapshot.status === 'invalid'
    ? 'بيانات التخصيص المحلية غير صالحة؛ لم تُستبدل.'
    : snapshot.status === 'read-error'
      ? 'تعذرت قراءة التخزين المحلي؛ لا يمكن تأكيد حفظ التخصيصات السابقة.'
      : snapshot.status === 'write-error'
        ? 'هناك تخصيصات في الجلسة لم يتم حفظها على هذا الجهاز.'
        : '';

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-sm text-slate-300">
        <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-400" aria-hidden="true" /> النص الأصلي محفوظ كما ورد في المصدر</span>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => { setMode('original'); setCopyStatus('idle'); }} aria-pressed={mode === 'original'} className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 px-3 py-2 text-xs font-bold aria-pressed:border-emerald-400 aria-pressed:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">الأصل</button>
          <button type="button" onClick={() => { setMode('custom'); setCopyStatus('idle'); }} aria-pressed={mode === 'custom'} className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 px-3 py-2 text-xs font-bold aria-pressed:border-emerald-400 aria-pressed:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">تخصيصي</button>
          <button
            onClick={copyPrompt}
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-70"
            type="button"
            disabled={copyStatus === 'copying' || !selectedText.length}
          >
            {copyStatus === 'success' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copyStatus === 'copying' ? 'جارٍ النسخ…' : copyStatus === 'success' ? 'تم النسخ' : 'نسخ النسخة المحددة'}
          </button>
        </div>
      </div>

      {mode === 'custom' ? (
        <div className="p-4 sm:p-6">
          <label htmlFor={`prompt-customization-${promptSlug}`} className="mb-2 block text-sm font-bold text-slate-200">تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت</label>
          <textarea
            id={`prompt-customization-${promptSlug}`}
            value={draft}
            onChange={(event) => { setDraft(event.target.value); setCopyStatus('idle'); }}
            dir="auto"
            spellCheck={false}
            className="min-h-72 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-7 text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-describedby={`prompt-customization-help-${promptSlug}`}
          />
          <p id={`prompt-customization-help-${promptSlug}`} className="mt-2 text-xs leading-6 text-slate-400">يُحفظ هذا النص لهذا البرومبت فقط في المتصفح على هذا الجهاز عند الضغط على حفظ.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={saveCustomization} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><Save className="h-4 w-4" aria-hidden="true" />حفظ التخصيص</button>
            {customization && <button type="button" onClick={resetCustomization} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><RotateCcw className="h-4 w-4" aria-hidden="true" />إعادة إلى الأصل وحذف التخصيص</button>}
          </div>
          {staleCustomization && <p role="status" className="mt-3 rounded-lg border border-amber-600/60 bg-amber-950/50 p-3 text-sm leading-6 text-amber-200">تغير النص الأصلي منذ حفظ هذا التخصيص. بقي نصك محفوظًا كما هو؛ راجع النسخة الأصلية الحالية ثم عدّل تخصيصك أو أعد ضبطه يدويًا.</p>}
        </div>
      ) : (
        <pre dir="auto" className="max-h-[65vh] overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-slate-100 sm:p-8">{body}</pre>
      )}

      <p role="status" aria-live="polite" aria-atomic="true" className={`min-h-7 px-4 pb-3 text-xs leading-6 ${copyStatus === 'error' || snapshot.status === 'write-error' || snapshot.status === 'invalid' ? 'text-amber-300' : 'text-emerald-300'}`}>
        {message || (copyStatus === 'success' ? 'تم نسخ النص الكامل إلى الحافظة.' : '')}
      </p>
      {storageStatusText && <p role="status" className="border-t border-slate-800 px-4 py-3 text-xs leading-6 text-amber-300">{storageStatusText}</p>}
    </section>
  );
}
