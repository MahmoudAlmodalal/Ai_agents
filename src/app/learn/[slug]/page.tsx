import Link from 'next/link';
import { ApplicationChecklist } from '@/src/components/ApplicationChecklist';
import { TopicHtmlContent } from '@/src/components/TopicHtmlContent';
import { TopicReaderTools } from '@/src/components/TopicReaderTools';
import { MermaidViewer } from '@/src/components/MermaidViewer';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Wrench, CheckSquare, ListOrdered, BarChart3 } from 'lucide-react';
import {
  getTopicBySlug,
  getAllTopics,
  getAllTopicSlugs,
  LEGACY_ROUTE_DESTINATIONS,
} from '@/src/lib/topicRegistry';

export function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (Object.hasOwn(LEGACY_ROUTE_DESTINATIONS, slug)) redirect(LEGACY_ROUTE_DESTINATIONS[slug]);
  const topic = getTopicBySlug(slug);
  return topic ? { title: `${topic.title} — ${topic.categoryName}`, description: topic.summary } : {};
}

export default async function LearningTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (Object.hasOwn(LEGACY_ROUTE_DESTINATIONS, slug)) redirect(LEGACY_ROUTE_DESTINATIONS[slug]);
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const allTopics = getAllTopics();
  const position = allTopics.findIndex((item) => item.slug === topic.slug || item.id === topic.id);
  const previous = position > 0 ? allTopics[position - 1] : undefined;
  const next = position >= 0 && position < allTopics.length - 1 ? allTopics[position + 1] : undefined;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm text-[var(--text-muted)] flex items-center flex-wrap gap-2" aria-label="مسار الصفحة">
        <Link href="/" className="hover:text-[var(--accent)] font-medium">الرئيسية</Link>
        <span className="opacity-40">/</span>
        <span>{topic.categoryName}</span>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text-main)] font-semibold">{topic.title}</span>
      </nav>

      {/* Main Topic Header */}
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            {topic.categoryName} · موضوع {topic.number}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {topic.stageTag}
          </span>
          {topic.publicationStatus === 'unified-complete' ? (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              محتوى منشور
            </span>
          ) : (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
              المحتوى متاح؛ خطوات التطبيق والمخرجات قيد الاستكمال
            </span>
          )}
        </div>

        <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl">{topic.title}</h1>
        <p className="mt-2 text-base font-semibold text-[var(--brand-primary)] sm:text-lg">{topic.subtitle}</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-muted)]">{topic.summary}</p>

        {topic.goal && (
          <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 text-sm leading-7 text-emerald-950 dark:border-emerald-900/80 dark:bg-emerald-950/20 dark:text-emerald-200">
            <strong className="font-black">الهدف من الموضوع: </strong>
            <span>{topic.goal}</span>
          </div>
        )}

        {topic.outputs && topic.outputs.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[var(--text-muted)]">المخرجات المطلوبة:</span>
            {topic.outputs.map((output) => (
              <code key={output} dir="ltr" className="rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-color)] px-3 py-1.5 text-xs font-mono font-bold text-[var(--text-main)]">
                {output}
              </code>
            ))}
          </div>
        )}
        <TopicReaderTools key={topic.slug} topic={topic} />
      </header>

      {/* Main Layout Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="content-area rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-8 space-y-6">
          {/* Practical Steps for the Student's Project */}
          {topic.steps && topic.steps.length > 0 && (
            <section className="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 p-5 sm:p-7">
              <h2 className="mb-4 text-lg sm:text-xl font-black text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-emerald-600" />
                <span>خطوات التطبيق على مشروعك</span>
              </h2>
              <ol className="space-y-3 text-sm sm:text-base leading-7 text-slate-800 dark:text-slate-200">
                {topic.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-mono text-xs font-bold text-white mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{step.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Prerequisites */}
          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4 sm:p-5">
              <h3 className="text-sm font-bold text-[var(--text-main)] mb-2">المتطلبات السابقة</h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[var(--text-muted)]">
                {topic.prerequisites.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interactive Mermaid Diagram Section */}
          {topic.diagramCount > 0 && (
            <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-6 shadow-xs space-y-3" aria-label="المخطط الهندسي التفاعلي">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--brand-primary)]" />
                  <h2 className="text-base sm:text-lg font-black text-[var(--text-main)]">
                    المخطط الهندسي التفاعلي (Mermaid.js)
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  تصيير محلي
                </span>
              </div>
              <MermaidViewer topic={topic} />
            </section>
          )}

          {/* Preserved HTML Content */}
          <TopicHtmlContent key={topic.slug} html={topic.htmlContent} topic={topic} />
        </article>

        {/* Aside Sidebar */}
        <aside className="space-y-4">
          {topic.checklist.length > 0 && <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 text-base font-black text-[var(--text-main)] flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>قائمة تحقق التطبيق</span>
            </h2>
            <ApplicationChecklist topic={topic} items={topic.checklist} />
          </section>}

          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 text-base font-black text-[var(--text-main)]">روابط عملية</h2>
            <Link href="/prompts" className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">
              <FileText className="h-4 w-4" /> مكتبة البرومبتات
            </Link>
            <Link href="/tools" className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">
              <Wrench className="h-4 w-4" /> دليل الأدوات
            </Link>
          </section>

          <p className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-sm leading-7 text-[var(--text-muted)]">
            راجع مخرجاتك للتقييم الذاتي، ويمكنك تصفح الموضوع التالي في أي وقت.
          </p>
        </aside>
      </div>

      {/* Navigation Bounds: Prev and Next from Single Canonical Order */}
      <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="التنقل بين المواضيع">
        {previous ? (
          <Link
            href={`/learn/${previous.slug}`}
            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 hover:border-emerald-400 transition-all shadow-xs"
          >
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
              <span>الموضوع السابق</span>
            </span>
            <strong className="mt-1 block text-[var(--text-main)] group-hover:text-emerald-600 transition-colors">
              {previous.title}
            </strong>
          </Link>
        ) : (
          <p className="p-4 text-sm text-[var(--text-muted)]">هذا أول موضوع في المسار.</p>
        )}

        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-left hover:border-emerald-400 transition-all shadow-xs"
          >
            <span className="text-xs text-[var(--text-muted)] flex items-center justify-end gap-1">
              <span>الموضوع التالي</span>
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-600" />
            </span>
            <strong className="mt-1 block text-[var(--text-main)] group-hover:text-emerald-600 transition-colors">
              {next.title}
            </strong>
            {next.publicationStatus === 'legacy-pending-migration' && <span className="mt-2 block text-xs leading-6 text-amber-700 dark:text-amber-300">القراءة متاحة؛ خطوات التطبيق والمخرجات قيد الاستكمال</span>}
          </Link>
        ) : <p className="p-4 text-sm text-[var(--text-muted)]">وصلت إلى آخر موضوع متاح. <Link href="/" className="font-bold text-[var(--brand-primary)] hover:underline">العودة إلى الفهرس</Link></p>}
      </nav>
    </div>
  );
}
