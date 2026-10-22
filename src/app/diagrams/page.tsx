import Link from 'next/link';
import { getAllDiagramLabItems, resolveDiagramTopicLink } from '@/src/data/diagram-lab';

export const metadata = {
  title: 'مختبر المخططات الهندسية الثمانية | Ai_agents',
  description: 'المخططات الهندسية الثمانية: السؤال المحوري، أسئلة القرار، المدخلات المطلوبة، والمحررات المعتمدة لكل مرحلة.',
};

export default function DiagramsPage() {
  const diagrams = getAllDiagramLabItems();

  return (
    <main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline">
          → الرئيسية
        </Link>
        <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
          <h1 className="text-3xl font-black text-[var(--text-main)] sm:text-5xl">مختبر المخططات الثمانية</h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--text-muted)]">
            لا تولد كل المخططات معاً. ابدأ من وثيقة المتطلبات PRD، واختر المخطط المناسب للسؤال الهندسي، وتحقق من مدخلاته، ثم ارسمه في محرره المعتمد قبل الانتقال للمرحلة التالية.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/learn/diagram-lab"
              className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-black text-white hover:opacity-90 transition-opacity"
            >
              افتح المختبر التفاعلي الشامل ←
            </Link>
          </div>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {diagrams.map((item) => {
            const topicInfo = resolveDiagramTopicLink(item);
            return (
              <article
                key={item.id}
                className="flex min-w-0 flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-xs"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {item.categoryLabel}
                    </span>
                    <span className="rounded-md bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs font-mono font-bold text-[var(--text-muted)]">
                      {item.syntaxLabel}
                    </span>
                  </div>

                  <h2 className="mt-3 break-words text-xl font-black text-[var(--text-main)]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs font-bold text-[var(--primary)]">{item.stageName}</p>
                  <p className="mt-2 break-words text-sm leading-6 text-[var(--text-muted)]">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3.5">
                    <span className="mb-1 block text-xs font-bold text-[var(--text-muted)]">
                      السؤال المحوري:
                    </span>
                    <p className="text-base font-black text-[var(--primary)]">
                      {item.coreQuestion}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 text-sm font-bold text-[var(--text-main)]">
                      متى تختار هذا المخطط؟ (أسئلة القرار)
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm leading-6 text-[var(--text-muted)]">
                      {item.whenToChoose.map((question, idx) => (
                        <li key={idx} className="break-words">
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 text-sm font-bold text-[var(--text-main)]">
                      المدخلات المطلوبة قبل الرسم:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.inputDependencies.map((dep, idx) => (
                        <span
                          key={idx}
                          className="break-words rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs font-mono font-bold text-[var(--text-main)]"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-xs font-bold text-[var(--text-main)]">
                        المحرر المناسب:
                      </span>
                      <span className="rounded-md border border-[var(--border-color)] bg-[var(--bg-surface)] px-2 py-0.5 text-xs font-bold text-[var(--primary)]">
                        {item.editor.badge}
                      </span>
                    </div>
                    <a
                      href={item.editor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block break-words text-sm font-bold text-[var(--primary)] hover:underline"
                    >
                      {item.editor.name} ↗
                    </a>
                    <p className="mt-1 break-words text-xs leading-5 text-[var(--text-muted)]">
                      {item.editor.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-color)] pt-4">
                  {topicInfo.isAvailable ? (
                    <Link
                      href={topicInfo.url}
                      className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-bold text-[var(--text-main)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                    >
                      موضوع الاستخدام
                    </Link>
                  ) : (
                    <span className="rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-3 py-2 text-xs font-bold text-[var(--text-muted)]">
                      {topicInfo.statusText}
                    </span>
                  )}

                  <Link
                    href={`/learn/diagram-lab#diagram-${item.id}`}
                    className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  >
                    المختبر التفاعلي
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
