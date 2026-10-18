import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clipboard, GitBranch, ShieldCheck, Sparkles } from 'lucide-react';
import { CheatsheetCopyButton } from '@/src/components/CheatsheetCopyButton';
import { COURSE_LECTURES } from '@/src/lib/courseRoadmap';

export const metadata = {
  title: 'Practical Prompts Cheatsheet | MET Academy',
  description: 'مرجع سريع للبرومبتات العملية وخارطة مخرجات مشروع الطالب.',
};


const fields = '[PROJECT_NAME]، المجال: [DOMAIN]، المستخدمون: [TARGET_USERS]';
const preparePrompt = `أعمل على مشروع ${fields}.
هذه محاضرة: [LESSON_TITLE].
اقرأ وثائق المشروع المتاحة وحدد ما هو مؤكد وما هو ناقص قبل التنفيذ.
نفّذ المخرج التالي فقط: [NEXT_DELIVERABLE].
اربط كل قرار بمصدره، ولا تخترع سلوكًا أو تقنية أو بيانات غير موثقة.
قبل التعديل اذكر الملفات التي ستتغير ومعايير القبول.
بعد التعديل شغّل الفحص المناسب، ثم لخّص النتيجة وتوقف.`;
const reviewPrompt = `أنت Reviewer مستقل لمشروع [PROJECT_NAME].
راجع مخرج [LESSON_NUMBER]: [LESSON_TITLE] مقابل PRD وSRS وأي تصميم أو عقد متاح.
اكتب جدولًا من PASS وFAIL وOPEN QUESTION.
افحص الاتساق، الحالات الحدية، قابلية التحقق، وعدم إضافة نطاق غير معتمد.
اقترح أعلى عيب تأثيرًا فقط، ثم توقف وانتظر الاعتماد.`;
const handoffPrompt = `لخّص إنجاز محاضرة [LESSON_NUMBER] لمشروع [PROJECT_NAME].
اذكر الملفات والمخرجات والقرارات والأسئلة المفتوحة والفحوصات والمخاطر.
اكتب Handoff Note قصيرة ليكمل طالب آخر دون تخمين.
اقترح رسالة Commit، ولا تقل إن العمل مكتمل إذا بقيت فجوة أو فشل فحص.`;

function PromptCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/20"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-emerald-900 dark:text-emerald-200">{title}</h3><CheatsheetCopyButton text={text} /></div><pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap text-left text-xs leading-7 text-emerald-950 dark:text-emerald-100" dir="auto">{text}</pre></div>;
}

export default function CheatsheetPage() {
  return <main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/roadmap" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]"><ArrowRight className="h-4 w-4" /> العودة إلى خارطة المشروع</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10"><div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">جاهز للنسخ</span><span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[var(--primary)]">20 درسًا</span><span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[var(--primary)]">مشروع مختلف لكل طالب</span></div><h1 className="mt-5 text-3xl font-black text-[var(--text-main)] sm:text-5xl">Practical Prompts Cheatsheet</h1><p className="mt-4 max-w-4xl text-base leading-8 text-[var(--text-muted)]">مرجع سريع يستخدمه الطالب أثناء التطبيق. بدّل الحقول بين الأقواس، أرسل Prompt واحدًا، راجع النتيجة، ثم انتقل إلى Prompt المراجعة والتسليم.</p></header>

    <section className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><Clipboard className="h-5 w-5 text-[var(--primary)]" /><h2 className="mt-3 font-black text-[var(--text-main)]">1. انسخ</h2><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">استبدل اسم المشروع والمجال والمستخدمين.</p></div><div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><Sparkles className="h-5 w-5 text-emerald-600" /><h2 className="mt-3 font-black text-[var(--text-main)]">2. نفّذ</h2><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">نفّذ مخرجًا واحدًا فقط من الدرس.</p></div><div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><GitBranch className="h-5 w-5 text-violet-600" /><h2 className="mt-3 font-black text-[var(--text-main)]">3. سلّم</h2><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">راجع، افحص، ثم اعمل Commit وPush.</p></div></section>

    <section className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8"><h2 className="text-2xl font-black text-[var(--text-main)]">السلسلة الأساسية لكل محاضرة</h2><p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">هذه الثلاثة Prompts تعمل مع أي مشروع: متجر، منصة تعليم، تطبيق حجوزات، نظام داخلي أو منتج مختلف تمامًا.</p><div className="mt-5 space-y-4"><PromptCard title="Prompt A — التحضير والتنفيذ" text={preparePrompt} /><PromptCard title="Prompt B — المراجعة" text={reviewPrompt} /><PromptCard title="Prompt C — التسليم والتوثيق" text={handoffPrompt} /></div></section>

    <section className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8"><div className="flex items-center justify-between gap-3"><h2 className="text-2xl font-black text-[var(--text-main)]">Prompt المحاضرة ومخرجها</h2><span className="text-xs text-[var(--text-muted)]">اضغط لفتح الدرس الكامل</span></div><div className="mt-5 space-y-3">{COURSE_LECTURES.map((lecture) => <details key={lecture.number} className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4"><summary className="flex cursor-pointer list-none items-center gap-3 font-bold text-[var(--text-main)]"><span className="font-mono text-xs text-[var(--accent)]">{String(lecture.number).padStart(2, '0')}</span><span className="flex-1">{lecture.title}</span><span className="text-xs text-[var(--primary)]">{lecture.deliverables[0]}</span></summary><div className="mt-4 border-t border-[var(--border-color)] pt-4"><p className="text-sm leading-7 text-[var(--text-muted)]"><strong className="text-[var(--text-main)]">المخرج:</strong> {lecture.outcome}</p><div className="mt-3 flex items-center justify-between gap-3"><Link href={`/roadmap/${lecture.number}`} className="text-sm font-bold text-[var(--primary)] hover:text-[var(--accent)]">فتح الدرس الكامل ←</Link><CheatsheetCopyButton text={lecture.prompt} /></div><pre className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-left text-xs leading-7 text-emerald-300" dir="auto">{lecture.prompt}</pre></div></details>)}</div></section>

    <section className="mt-6 grid gap-6 lg:grid-cols-2"><div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6"><h2 className="flex items-center gap-2 text-lg font-black text-[var(--text-main)]"><CheckCircle2 className="h-5 w-5 text-emerald-600" /> أوامر التحقق</h2><pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-left text-xs leading-7 text-emerald-300" dir="ltr">npx tsc --noEmit
npm run build
git status
git diff
git add .
git commit -m &quot;feat: complete lesson output&quot;
git push origin feature/lesson-output</pre></div><div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20"><h2 className="flex items-center gap-2 text-lg font-black text-amber-950 dark:text-amber-100"><ShieldCheck className="h-5 w-5" /> قواعد الأمان</h2><ul className="mt-4 space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100"><li>لا ترسل ملفات `.env` أو API keys.</li><li>لا تضع الأسرار في Client Components أو GitHub.</li><li>لا تدّعِ أن Feature مكتملة إذا فشل الفحص.</li><li>لا تنتقل قبل وجود مخرج ومراجعة وCommit.</li></ul></div></section>

    <div className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 text-sm leading-7 text-[var(--text-muted)]"><strong className="text-[var(--text-main)]">نسخة Markdown:</strong> يمكن فتح الملف المرجعي <code>docs/PRACTICAL_PROMPTS_CHEATSHEET.md</code> من المستودع أو استخدام هذه الصفحة للنسخ المباشر.</div>
  </div></main>;
}
