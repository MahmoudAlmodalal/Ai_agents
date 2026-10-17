'use client';

import { useState } from 'react';
import { Check, Copy, FileText } from 'lucide-react';

export function PromptCopyPanel({ body }: { body: string }) {
  const [copied, setCopied] = useState(false);
  const copyPrompt = async () => {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <section className="mt-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950"><div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 text-sm text-slate-300"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-emerald-400" /> النص الكامل المعتمد من المصدر</span><button onClick={copyPrompt} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500" type="button">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? 'تم النسخ' : 'نسخ البرومبت'}</button></div><pre dir="ltr" className="max-h-[65vh] overflow-auto whitespace-pre-wrap p-5 text-sm leading-7 text-slate-100 sm:p-8">{body}</pre></section>;
}
