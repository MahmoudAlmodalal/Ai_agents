'use client';

import { useState } from 'react';
import { Check, Copy, FileText } from 'lucide-react';

export function PromptCopyPanel({ body }: { body: string }) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');

  const copyPrompt = async () => {
    setStatus('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(body);
      setStatus('success');
      window.setTimeout(() => setStatus('idle'), 2200);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-sm text-slate-300">
        <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-400" aria-hidden="true" /> النص الكامل كما ورد في المصدر</span>
        <button
          onClick={copyPrompt}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-70"
          type="button"
          disabled={status === 'copying'}
          aria-describedby="prompt-copy-status"
        >
          {status === 'success' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {status === 'copying' ? 'جارٍ النسخ…' : status === 'success' ? 'تم النسخ' : status === 'error' ? 'حاول النسخ مجددًا' : 'نسخ البرومبت'}
        </button>
      </div>
      <p id="prompt-copy-status" role="status" aria-live="polite" aria-atomic="true" className={`min-h-6 px-4 pt-2 text-xs ${status === 'error' ? 'text-amber-300' : 'text-emerald-300'}`}>
        {status === 'success' ? 'تم نسخ النص الكامل إلى الحافظة.' : status === 'error' ? 'تعذر الوصول إلى الحافظة؛ يمكنك تحديد النص ونسخه يدويًا.' : ''}
      </p>
      <pre dir="ltr" className="max-h-[65vh] overflow-auto whitespace-pre-wrap p-5 text-sm leading-7 text-slate-100 sm:p-8">{body}</pre>
    </section>
  );
}
