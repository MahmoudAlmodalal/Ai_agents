import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ClipboardCheck, GitBranch, Sparkles } from 'lucide-react';
import { COURSE_LECTURES } from '@/src/lib/courseRoadmap';

type LessonPageProps = { params: Promise<{ number: string }> };

export function generateStaticParams() {
  return COURSE_LECTURES.map((lecture) => ({ number: String(lecture.number) }));
}

export function generateMetadata({ params }: LessonPageProps) {
  return params.then(({ number }) => {
    const lecture = COURSE_LECTURES.find((item) => String(item.number) === number);
    return { title: lecture ? `المحاضرة ${number}: ${lecture.title} | MET Academy` : 'درس المشروع | MET Academy' };
  });
}

export default async function RoadmapLessonPage({ params }: LessonPageProps) {
  const { number } = await params;
  const lecture = COURSE_LECTURES.find((item) => String(item.number) === number);
  if (!lecture) notFound();

  const previous = COURSE_LECTURES.find((item) => item.number === lecture.number - 1);
  const next = COURSE_LECTURES.find((item) => item.number === lecture.number + 1);

  return (
    <main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/roadmap" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]"><ArrowRight className="h-4 w-4" /> العودة إلى خارطة الدروس</Link>
          <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-bold text-[var(--primary)]">المحاضرة {String(lecture.number).padStart(2, '0')} من 20</span>
        </div>

        <header className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold text-[var(--accent)]">{lecture.axis}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl">{lecture.title}</h1>
          <p className="mt-5 text-lg leading-9 text-[var(--text-muted)]"><strong className="text-[var(--text-main)]">هدف الدرس:</strong> {lecture.outcome}</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">مشروعك أنت</span><span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-1 text-xs text-[var(--text-muted)]">تطبيق عملي</span><span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-1 text-xs text-[var(--text-muted)]">مخرج قابل للمراجعة</span></div>
        </header>

        <section className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-black text-[var(--text-main)]"><ClipboardCheck className="h-5 w-5 text-[var(--primary)]" /> كيف تتابع الدرس؟</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[var(--bg-card-subtle)] p-4"><span className="font-mono text-xs font-bold text-[var(--accent)]">01</span><h3 className="mt-2 font-bold text-[var(--text-main)]">اقرأ المصدر</h3><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">استخدم وثائق مشروعك الحالية، ولا تستبدلها بمثال عام.</p></div>
            <div className="rounded-2xl bg-[var(--bg-card-subtle)] p-4"><span className="font-mono text-xs font-bold text-[var(--accent)]">02</span><h3 className="mt-2 font-bold text-[var(--text-main)]">نفّذ مخرجًا</h3><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">حوّل الخطوات إلى ملف أو قرار أو تغيير صغير قابل للمراجعة.</p></div>
            <div className="rounded-2xl bg-[var(--bg-card-subtle)] p-4"><span className="font-mono text-xs font-bold text-[var(--accent)]">03</span><h3 className="mt-2 font-bold text-[var(--text-main)]">تحقق وسلّم</h3><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">راجع النتيجة، شغّل الفحص المناسب، ثم احفظها في GitHub.</p></div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-black text-[var(--text-main)]">شرح الدرس وسلسلة التنفيذ</h2>
          <p className="mt-3 leading-8 text-[var(--text-muted)]">في هذه المحاضرة تعمل على مشروعك الخاص، لذلك لا تنسخ أسماء الكيانات أو الشاشات من مشروع آخر. ابدأ بالمخرج المطلوب، اربطه بوثائقك، ثم نفّذ الخطوات بالترتيب. إذا ظهرت معلومة غير مؤكدة، سجّلها كسؤال مفتوح بدل أن تجعلها سلوكًا دائمًا في المنتج.</p>
          <ol className="mt-6 space-y-4">
            {lecture.steps.map((step, index) => <li key={step} className="flex gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black text-white">{index + 1}</span><div><h3 className="font-bold text-[var(--text-main)]">الخطوة {index + 1}</h3><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">{step}</p></div></li>)}
          </ol>
        </section>

        <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-900 dark:bg-emerald-950/20 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-black text-emerald-900 dark:text-emerald-200"><Sparkles className="h-5 w-5" /> البرومبت العملي للدرس</h2>
          <p className="mt-2 text-sm leading-7 text-emerald-900/75 dark:text-emerald-100/75">استبدل الحقول بين الأقواس بمعلومات مشروعك. لا ترسل أسرارًا أو مفاتيح API داخل المحادثة.</p>
          <pre className="mt-5 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-left text-xs leading-7 text-emerald-300" dir="auto">{lecture.prompt}</pre>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6"><h2 className="flex items-center gap-2 text-lg font-black text-[var(--text-main)]"><CheckCircle2 className="h-5 w-5 text-emerald-600" /> مخرجات الدرس</h2><ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-muted)]">{lecture.deliverables.map((item) => <li key={item} className="flex gap-2"><span className="text-emerald-600">✓</span>{item}</li>)}</ul></div>
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6"><h2 className="flex items-center gap-2 text-lg font-black text-[var(--text-main)]"><GitBranch className="h-5 w-5 text-violet-600" /> نقطة التحقق والتسليم</h2><p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">لا تنتقل قبل أن تراجع المخرج مع صاحب المشروع، تتأكد أنه يطابق المتطلبات المعتمدة، وتكتب ملاحظة قصيرة عن القرار أو القيد. بعدها احفظ التغيير في فرع واضح وأنشئ Commit قابلًا للرجوع.</p><code className="mt-4 block rounded-xl bg-[var(--bg-card-subtle)] p-3 text-left text-xs text-[var(--text-main)]" dir="ltr">git status && git add . && git commit -m &quot;docs: complete lecture {String(lecture.number).padStart(2, '0')}&quot;</code></div>
        </section>

        <nav className="mt-8 flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 text-sm">
          {previous ? <Link href={`/roadmap/${previous.number}`} className="font-bold text-[var(--primary)] hover:text-[var(--accent)]">← {previous.title}</Link> : <span />}
          {next ? <Link href={`/roadmap/${next.number}`} className="font-bold text-[var(--primary)] hover:text-[var(--accent)]">{next.title} →</Link> : <Link href="/" className="font-bold text-[var(--primary)]">إنهاء المسار والعودة للرئيسية</Link>}
        </nav>
      </div>
    </main>
  );
}
