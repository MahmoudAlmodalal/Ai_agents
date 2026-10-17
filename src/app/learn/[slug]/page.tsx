import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, FileText, Wrench } from 'lucide-react';
import { COURSE_TOPICS, getTopic, getTopicContent, markdownToHtml } from '@/src/lib/courseContent';

export function generateStaticParams() {
  return COURSE_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  return topic ? { title: `${topic.titleAr} — ${topic.titleEn}`, description: topic.summary } : {};
}

export default async function LearningTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const content = getTopicContent(topic);
  const position = COURSE_TOPICS.findIndex((item) => item.slug === topic.slug);
  const previous = COURSE_TOPICS[position - 1];
  const next = COURSE_TOPICS[position + 1];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <nav className="mb-6 text-sm text-[var(--text-muted)]" aria-label="مسار الصفحة">
        <Link href="/" className="hover:text-[var(--accent)]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span>{topic.phase}</span>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-main)]">{topic.titleAr}</span>
      </nav>

      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span>{topic.phase}</span><span aria-hidden="true">·</span><span dir="ltr">{topic.titleEn}</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl">{topic.titleAr}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-muted)]">{topic.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {topic.outputs.map((output) => <code key={output} dir="ltr" className="rounded-lg bg-[var(--bg-card-subtle)] px-3 py-1.5 text-xs text-[var(--text-main)]">{output}</code>)}
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="content-area rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-8">
          <div dangerouslySetInnerHTML={{ __html: `<p>${markdownToHtml(content)}</p>` }} />
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>مراجعة المصدر:</strong> هذا القسم مستخرج من المادة المرجعية. أي شرح إضافي يجب أن يُوسم كتفسير مساعد، ولا يُستبدل به المحتوى المعتمد.
          </div>
        </article>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 text-base font-black text-[var(--text-main)]">قائمة الإنجاز</h2>
            {['اقرأ المفاهيم قبل التنفيذ', 'راجع الملفات المطلوبة', 'نفّذ خطوة صغيرة', 'تحقق من المخرج يدويًا'].map((item) => <label key={item} className="mb-3 flex items-start gap-2 text-sm text-[var(--text-muted)]"><input type="checkbox" className="mt-1 accent-emerald-600" />{item}</label>)}
          </section>
          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 text-base font-black text-[var(--text-main)]">روابط عملية</h2>
            <Link href="/prompts" className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]"><FileText className="h-4 w-4" /> مكتبة البرومبتات</Link>
            <Link href="/tools" className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]"><Wrench className="h-4 w-4" /> دليل الأدوات</Link>
          </section>
          <div className="flex items-center gap-2 rounded-2xl bg-[var(--primary)] p-4 text-sm leading-6 text-white"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" /> لا تنتقل للخطوة التالية قبل اعتماد المخرج.</div>
        </aside>
      </div>

      <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="التنقل بين المواضيع">
        {previous ? <Link href={`/learn/${previous.slug}`} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 hover:border-emerald-400"><span className="text-xs text-[var(--text-muted)]">الموضوع السابق</span><strong className="mt-1 block text-[var(--text-main)]">{previous.titleAr}</strong></Link> : <span />}
        {next && <Link href={`/learn/${next.slug}`} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-left hover:border-emerald-400"><span className="text-xs text-[var(--text-muted)]">الموضوع التالي</span><strong className="mt-1 block text-[var(--text-main)]">{next.titleAr}</strong><ArrowLeft className="mt-2 h-4 w-4 text-emerald-600" /></Link>}
      </nav>
    </div>
  );
}
