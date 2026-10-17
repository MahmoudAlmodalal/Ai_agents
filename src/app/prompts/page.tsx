import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';
import { PROMPTS } from '@/src/lib/courseContent';

export const metadata = { title: 'مكتبة البرومبتات', description: 'برومبتات سلاح العصر الكاملة والقابلة للنسخ.' };

export default function PromptsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <header className="mb-8 rounded-3xl bg-[var(--primary)] p-7 text-white sm:p-10">
        <div className="mb-3 flex items-center gap-2 text-emerald-300"><Sparkles className="h-5 w-5" /><span className="text-sm font-bold">30 prompt records · full source text</span></div>
        <h1 className="text-3xl font-black sm:text-5xl">مكتبة البرومبتات</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-200">لا تكتفِ بملخص البرومبت. افتح البطاقة لرؤية النص الكامل، المدخلات، نوع العملية، المخرجات، وخطوات الاستخدام. البرومبتات العامة مستقلة عن BorrowHub ما لم يُذكر خلاف ذلك.</p>
      </header>
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-muted)]"><Search className="h-4 w-4" /><span>استخدم بحث المتصفح للعثور على مفهوم أو رقم prompt، أو افتح أي بطاقة للتفاصيل.</span></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROMPTS.map((prompt) => <Link key={prompt.slug} href={`/prompts/${prompt.slug}`} className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"><div className="flex items-center justify-between gap-3"><span className="rounded-lg bg-emerald-600 px-2 py-1 font-mono text-xs font-bold text-white">{prompt.number}</span><span className="text-xs text-[var(--text-muted)]">{prompt.difficulty}</span></div><h2 className="mt-4 text-lg font-black text-[var(--text-main)] group-hover:text-emerald-600">{prompt.title}</h2><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-[var(--bg-card-subtle)] px-2 py-1 text-[var(--text-muted)]">{prompt.category}</span><span className="rounded-full bg-[var(--bg-card-subtle)] px-2 py-1 font-mono text-[var(--text-muted)]">{prompt.operation}</span></div></Link>)}
      </div>
    </div>
  );
}
