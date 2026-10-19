import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { PromptCopyPanel } from '@/src/components/PromptCopyPanel';
import { getPromptLibraryRecord, PROMPT_LIBRARY } from '@/src/lib/promptLibrary';

export function generateStaticParams() {
  return PROMPT_LIBRARY.map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPromptLibraryRecord(slug);
  return prompt ? { title: `${prompt.title} — ${prompt.number}` } : {};
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <h2 className="font-black text-[var(--text-main)]">{title}</h2>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
          {items.map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-1 text-emerald-600" aria-hidden="true">•</span><span dir="auto">{item}</span></li>)}
        </ul>
      ) : <p className="mt-2 text-sm text-[var(--text-muted)]">لا يحدد المصدر عنصرًا هنا.</p>}
    </section>
  );
}

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPromptLibraryRecord(slug);
  if (!prompt) notFound();
  const index = PROMPT_LIBRARY.findIndex((item) => item.slug === prompt.slug);
  const next = PROMPT_LIBRARY[index + 1];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <Link href="/prompts" className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[var(--primary)] hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
        <ArrowRight className="h-4 w-4" aria-hidden="true" /> العودة إلى مكتبة البرومبتات
      </Link>
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-9">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-emerald-600 px-3 py-1 font-mono font-bold text-white" dir="ltr">{prompt.number}</span>
          <span className="text-sm text-[var(--text-muted)]">{prompt.category}</span>
          <span className="text-sm text-[var(--text-muted)]">{prompt.difficulty}</span>
          <span className="text-sm text-[var(--text-muted)]">{prompt.operation}</span>
        </div>
        <h1 className="mt-5 text-3xl font-black text-[var(--text-main)] sm:text-5xl">{prompt.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--text-muted)]">{prompt.purpose}</p>
        <div className="mt-6 rounded-2xl bg-[var(--bg-card-subtle)] p-4">
          <span className="block text-xs text-[var(--text-muted)]">الأداة المقترحة أو المذكورة</span>
          <strong className="mt-1 block text-sm leading-7 text-[var(--text-main)]">{prompt.recommendedTool}</strong>
        </div>
        <p className="mt-4 text-xs leading-6 text-[var(--text-muted)]">المصدر: {prompt.sourceLabel}</p>
      </header>

      <PromptCopyPanel body={prompt.body} />

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <DetailList title="المدخلات" items={prompt.inputFiles} />
        <DetailList title="المخرجات" items={prompt.outputFiles} />
        <DetailList title="تنبيهات الاستخدام" items={prompt.warnings} />
        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
          <h2 className="font-black text-[var(--text-main)]">الموضوعات المرتبطة</h2>
          {prompt.topicRefs.length ? (
            <ul className="mt-3 space-y-3">
              {prompt.topicRefs.map((topic) => (
                <li key={topic.slug} className="text-sm leading-6">
                  {topic.href ? (
                    <Link href={topic.href} className="font-bold text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">{topic.title}</Link>
                  ) : <span className="font-bold text-[var(--text-main)]">{topic.title}</span>}
                  <span className="ms-2 rounded-full bg-[var(--bg-card-subtle)] px-2 py-1 text-xs text-[var(--text-muted)]">
                    {topic.availability === 'available' ? 'منشور' : topic.availability === 'partial' ? 'المحتوى متاح؛ التفاصيل قيد الاستكمال' : 'لم يُنشر بعد'}
                  </span>
                </li>
              ))}
            </ul>
          ) : <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">لم يُسند هذا النص إلى موضوع محدد بعد.</p>}
        </section>
      </section>

      {next && <Link href={`/prompts/${next.slug}`} className="mt-6 block rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
        <span className="text-xs text-[var(--text-muted)]">النص التالي في المكتبة</span>
        <strong className="mt-1 block text-[var(--text-main)]">{next.title}</strong>
      </Link>}
    </div>
  );
}
