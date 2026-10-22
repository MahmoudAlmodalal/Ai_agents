import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  ListChecks,
  Sparkles,
  Target,
} from 'lucide-react';
import { TopicHtmlContent } from '@/src/components/TopicHtmlContent';
import { getLearningSession } from '@/src/lib/learningSessions';
import { getTopicBySlug } from '@/src/lib/topicRegistry';

const SESSION_SLUG = 'stitch-to-frontend';

export async function generateMetadata() {
  const session = getLearningSession(SESSION_SLUG);
  return session
    ? {
        title: `${session.title} — جلسة تطبيقية`,
        description: session.summary,
      }
    : {};
}

export default function StitchToFrontendSessionPage() {
  const session = getLearningSession(SESSION_SLUG);
  if (!session) notFound();

  const previous = getTopicBySlug(session.previousTopicSlug);
  const next = getTopicBySlug(session.nextTopicSlug);
  const relatedGroups = session.relatedGroups
    .map((group) => ({
      title: group.title,
      topics: group.topicSlugs
        .map((slug) => getTopicBySlug(slug))
        .filter((topic): topic is NonNullable<ReturnType<typeof getTopicBySlug>> => Boolean(topic)),
    }))
    .filter((group) => group.topics.length > 0);

  const libraryPrompts = session.prompts.filter((prompt) => prompt.librarySlug);
  const inlinePrompts = session.prompts.filter((prompt) => prompt.inline);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]" aria-label="مسار الصفحة">
        <Link href="/" className="font-medium hover:text-[var(--accent)]">الرئيسية</Link>
        <span className="opacity-40">/</span>
        <Link href="/learn/project-idea-mvp" className="font-medium hover:text-[var(--accent)]">مسار التعلم</Link>
        <span className="opacity-40">/</span>
        <span className="font-semibold text-[var(--text-main)]">جلسة Stitch → Frontend</span>
      </nav>

      <header className="learning-reader-header rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            جلسة تطبيقية
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {session.durationLabel}
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
            {session.levelLabel}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Frontend فقط
          </span>
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
            تجمع المواضيع 18–37
          </span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl">{session.title}</h1>
        <p className="mt-2 text-base font-semibold text-[var(--brand-primary)] sm:text-lg">{session.subtitle}</p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-muted)]">{session.summary}</p>

        <p className="mt-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4 text-xs leading-6 text-[var(--text-muted)]">
          <strong className="font-black text-[var(--text-main)]">المصدر: </strong>
          {session.sourceNote}
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 text-sm leading-7 text-emerald-950 dark:border-emerald-900/80 dark:bg-emerald-950/20 dark:text-emerald-200">
          <strong className="font-black">هدف الجلسة: </strong>
          <span>{session.goal}</span>
        </div>

        <section className="mt-6" aria-labelledby="session-outcomes">
          <h2 id="session-outcomes" className="mb-3 flex items-center gap-2 text-sm font-black text-[var(--text-main)]">
            <Target className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            ماذا ستكون قادرًا عليه؟
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {session.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2 rounded-xl bg-[var(--bg-card-subtle)] p-3 text-xs leading-6 text-[var(--text-muted)]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
            <h2 className="mb-2 text-sm font-black text-[var(--text-main)]">المتطلبات السابقة</h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs leading-6 text-[var(--text-muted)]">
              {session.prerequisites.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-black text-[var(--text-main)]">
              <FileText className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              المخرجات المتوقعة
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {session.deliverables.map((item) => (
                <code
                  key={item}
                  dir="ltr"
                  className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-[11px] font-bold text-[var(--text-main)]"
                >
                  {item}
                </code>
              ))}
            </div>
          </section>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="content-area space-y-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-8">
          <TopicHtmlContent
            key={session.slug}
            html={session.htmlContent}
            topic={{ id: 'session-stitch-to-frontend', slug: session.slug }}
          />
        </article>

        <aside className="space-y-4">
          <nav
            aria-label="محتويات الجلسة"
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"
          >
            <h2 className="mb-3 flex items-center gap-2 text-base font-black text-[var(--text-main)]">
              <ListChecks className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              محتويات الجلسة
            </h2>
            <ol className="space-y-1.5 text-xs leading-6">
              {session.tableOfContents.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-start gap-2 rounded-lg px-2 py-1 text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--primary)]"
                  >
                    <span className="font-mono font-bold text-[var(--text-faint)]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-black text-[var(--text-main)]">
              <BookOpen className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              المواضيع المرتبطة
            </h2>
            <p className="mb-3 text-xs leading-6 text-[var(--text-muted)]">
              الجلسة تجمع هذه المواضيع في قراءة واحدة؛ وكل موضوع يبقى المرجع التفصيلي له.
            </p>
            <div className="space-y-2">
              {relatedGroups.map((group, index) => (
                <details key={group.title} className="rounded-xl border border-[var(--border-color)]" open={index === 0}>
                  <summary className="cursor-pointer px-3 py-2 text-xs font-black text-[var(--text-main)]">
                    {group.title}
                  </summary>
                  <ul className="space-y-1 px-3 pb-3">
                    {group.topics.map((topic) => (
                      <li key={topic.slug}>
                        <Link
                          href={`/learn/${topic.slug}`}
                          className="flex items-start gap-1.5 text-[11px] leading-5 text-[var(--text-muted)] hover:text-[var(--primary)]"
                        >
                          <span className="font-mono text-[var(--text-faint)]">{topic.number}</span>
                          <span>{topic.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-black text-[var(--text-main)]">
              <Sparkles className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              فهرس البرومبتات
            </h2>
            <div className="space-y-1.5">
              {libraryPrompts.map((prompt) => (
                <Link
                  key={`${prompt.id}-${prompt.librarySlug}`}
                  href={`/prompts/${prompt.librarySlug}`}
                  className="flex items-start gap-2 rounded-lg px-2 py-1 text-[11px] leading-5 text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--primary)]"
                >
                  <span className="font-mono font-bold text-[var(--text-faint)]">{prompt.number}</span>
                  <span className="flex-1">{prompt.title}</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-3 border-t border-[var(--border-color)] pt-2 text-[11px] font-bold text-[var(--text-main)]">
              برومبتات مضمّنة كاملة في الصفحة
            </p>
            <div className="space-y-1.5">
              {inlinePrompts.map((prompt) => (
                <a
                  key={prompt.id}
                  href={`#${prompt.id}`}
                  className="flex items-start gap-2 rounded-lg px-2 py-1 text-[11px] leading-5 text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--primary)]"
                >
                  <span className="font-mono font-bold text-[var(--text-faint)]">{prompt.number}</span>
                  <span>{prompt.title}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-black text-[var(--text-main)]">
              <Layers className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              روابط عملية
            </h2>
            <div className="space-y-2">
              <Link href="/prompts" className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">
                <FileText className="h-4 w-4" aria-hidden="true" /> مكتبة البرومبتات
              </Link>
              <Link href="/templates" className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">
                <CheckSquare className="h-4 w-4" aria-hidden="true" /> الملفات والقوالب
              </Link>
              <Link href="/tools" className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">
                <Layers className="h-4 w-4" aria-hidden="true" /> دليل الأدوات
              </Link>
            </div>
          </section>

          <p className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-xs leading-6 text-[var(--text-muted)]">
            هذه جلسة تطبيقية مستقلة عن ترتيب المواضيع الـ58. يمكنك فتح أي موضوع مرتبط مباشرة،
            وستجد في نهاية الجلسة قائمة تحقق وتكليفًا عمليًا.
          </p>
        </aside>
      </div>

      <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="التنقل بعد الجلسة">
        {previous && (
          <Link
            href={`/learn/${previous.slug}`}
            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 shadow-xs transition-all hover:border-emerald-400"
          >
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <ArrowRight className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              <span>الموضوع السابق</span>
            </span>
            <strong className="mt-1 block text-[var(--text-main)] transition-colors group-hover:text-emerald-600">
              {previous.title}
            </strong>
          </Link>
        )}

        {next && (
          <Link
            href={`/learn/${next.slug}`}
            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-left shadow-xs transition-all hover:border-emerald-400"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-[var(--text-muted)]">
              <span>الموضوع التالي</span>
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            </span>
            <strong className="mt-1 block text-[var(--text-main)] transition-colors group-hover:text-emerald-600">
              {next.title}
            </strong>
          </Link>
        )}
      </nav>
    </div>
  );
}
