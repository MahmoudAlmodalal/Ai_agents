import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getPrompt, PROMPTS } from '@/src/lib/courseContent';
import { PromptCopyPanel } from '@/src/components/PromptCopyPanel';

export function generateStaticParams() {
  return PROMPTS.map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  return prompt ? { title: `${prompt.title} — Prompt ${prompt.number}` } : {};
}

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) notFound();
  const index = PROMPTS.findIndex((item) => item.slug === prompt.slug);
  const next = PROMPTS[index + 1];
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <Link href="/prompts" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-emerald-600"><ArrowRight className="h-4 w-4" /> العودة إلى مكتبة البرومبتات</Link>
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-9"><div className="flex flex-wrap items-center gap-3"><span className="rounded-lg bg-emerald-600 px-3 py-1 font-mono font-bold text-white">PROMPT {prompt.number}</span><span className="text-sm text-[var(--text-muted)]">{prompt.category}</span><span className="text-sm text-[var(--text-muted)]">{prompt.difficulty}</span></div><h1 className="mt-5 text-3xl font-black text-[var(--text-main)] sm:text-5xl">{prompt.title}</h1><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-[var(--bg-card-subtle)] p-3"><span className="block text-xs text-[var(--text-muted)]">نوع العملية</span><strong className="mt-1 block text-sm text-[var(--text-main)]">{prompt.operation}</strong></div><div className="rounded-xl bg-[var(--bg-card-subtle)] p-3"><span className="block text-xs text-[var(--text-muted)]">الأداة المقترحة</span><strong className="mt-1 block text-sm text-[var(--text-main)]">{prompt.recommendedTool}</strong></div><div className="rounded-xl bg-[var(--bg-card-subtle)] p-3"><span className="block text-xs text-[var(--text-muted)]">المدخلات</span><strong className="mt-1 block text-sm text-[var(--text-main)]" dir="ltr">{prompt.inputFiles.join(', ')}</strong></div></div></header>
      <PromptCopyPanel body={prompt.body} />
      <section className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><h2 className="font-black text-[var(--text-main)]">قبل التشغيل</h2><p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">اقرأ PRD وPROJECT_CONTEXT، حدّد ما هو موثق وما هو افتراض، واطلب من الوكيل التوقف عند وجود غموض. لا تمنح صلاحية تعديل الكود لبرومبت تحليلي.</p></div><div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><h2 className="font-black text-[var(--text-main)]">المخرجات</h2><p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{prompt.outputFiles.join(' · ')}</p></div></section>
      {next && <Link href={`/prompts/${next.slug}`} className="mt-6 block rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 hover:border-emerald-400"><span className="text-xs text-[var(--text-muted)]">البرومبت التالي</span><strong className="mt-1 block text-[var(--text-main)]">{next.title}</strong></Link>}
    </div>
  );
}
