import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardList, GitBranch, Sparkles } from 'lucide-react';
import { COURSE_LECTURES } from '@/src/lib/courseRoadmap';

export const metadata = {
  title: 'خارطة تنفيذ المشروع | MET Academy',
  description: 'خطة 20 محاضرة مع خطوات تنفيذ وبرومبتات قابلة للتخصيص لكل مشروع طالب.',
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">
          <ArrowRight className="h-4 w-4" /> العودة إلى الرئيسية
        </Link>

        <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--primary)]">
            <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1">40 ساعة</span>
            <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1">20 محاضرة</span>
            <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1">مشروع مختلف لكل طالب</span>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl">خارطة تنفيذ مشروعك من الفكرة إلى Demo Day</h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            لا يفترض هذا المسار أن الطلاب يبنون نفس التطبيق. كل طالب يضع اسم مشروعه ومستخدميه وقواعده داخل البرومبتات، ثم يمر بالمراحل نفسها مع مخرجات مختلفة وقرارات موثقة. اقرأ المحاضرة، أنجز مخرجها، احفظه في GitHub، ثم استخدمه كمدخل للمحاضرة التالية.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4"><ClipboardList className="mb-3 h-5 w-5 text-[var(--primary)]" /><strong className="block text-sm text-[var(--text-main)]">خطة متسلسلة</strong><span className="mt-1 block text-xs leading-6 text-[var(--text-muted)]">كل محاضرة لها مدخلات ومخرجات وخطوات تحقق.</span></div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4"><Sparkles className="mb-3 h-5 w-5 text-emerald-600" /><strong className="block text-sm text-[var(--text-main)]">Prompt قابل للتخصيص</strong><span className="mt-1 block text-xs leading-6 text-[var(--text-muted)]">بدّل PROJECT_NAME وDOMAIN وTARGET_USERS فقط.</span></div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4"><GitBranch className="mb-3 h-5 w-5 text-violet-600" /><strong className="block text-sm text-[var(--text-main)]">تسليم موثق</strong><span className="mt-1 block text-xs leading-6 text-[var(--text-muted)]">Commit وReview وPush بعد كل مخرج قابل للمراجعة.</span></div>
          </div>
        </header>

        <div className="mt-8 space-y-5">
          {COURSE_LECTURES.map((lecture) => (
            <article key={lecture.number} id={`lecture-${lecture.number}`} className="scroll-mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="flex shrink-0 items-center gap-3 lg:w-64 lg:flex-col lg:items-start">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-lg font-black text-white">{String(lecture.number).padStart(2, '0')}</span>
                  <div><p className="text-xs font-bold text-[var(--accent)]">{lecture.axis}</p><Link href={`/roadmap/${lecture.number}`} className="group/title"><h2 className="mt-1 text-xl font-black text-[var(--text-main)] group-hover/title:text-[var(--primary)]">{lecture.title}</h2><span className="mt-1 block text-xs font-bold text-[var(--primary)]">فتح الدرس ←</span></Link></div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="leading-8 text-[var(--text-muted)]"><strong className="text-[var(--text-main)]">المخرج:</strong> {lecture.outcome}</p>
                  <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.1fr]">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-[var(--text-main)]"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> سلسلة التنفيذ</h3>
                      <ol className="space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                        {lecture.steps.map((step, index) => <li key={step} className="flex gap-2"><span className="font-mono text-xs font-bold text-[var(--accent)]">{index + 1}.</span><span>{step}</span></li>)}
                      </ol>
                      <div className="mt-4 flex flex-wrap gap-2">{lecture.deliverables.map((item) => <span key={item} className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs text-[var(--text-muted)]">{item}</span>)}</div>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-emerald-800 dark:text-emerald-300"><Sparkles className="h-4 w-4" /> البرومبت العملي</h3>
                      <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-left text-xs leading-6 text-emerald-950 dark:text-emerald-100" dir="auto">{lecture.prompt}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
          <strong>قاعدة العمل:</strong> لا تنفذ المحاضرات كقائمة أوامر عمياء. اقرأ وثائق مشروعك، عدّل البرومبت بما يناسب مجالك، نفّذ مخرجًا واحدًا، راجعه مع الطالب، ثم احفظه في GitHub قبل الانتقال إلى الخطوة التالية. إذا كانت تقنية مشروع الطالب مختلفة، تبقى المنهجية والمخرجات ثابتة وتتغير الأدوات فقط.
        </footer>
      </div>
    </main>
  );
}
