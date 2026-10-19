'use client';

import Link from 'next/link';
import { useState } from 'react';
import { COURSE_TOOL_GUIDE } from '@/src/data/course-tool-guide';

export default function CourseToolsGuide() {
  const [status, setStatus] = useState('');
  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('تم نسخ الأمر؛ راجع المصدر الرسمي قبل تشغيله.');
    } catch {
      setStatus('تعذر النسخ؛ حدد الأمر وانسخه يدويًا.');
    }
  }
  return <section aria-label="دليل أدوات المسار" className="mb-10">
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
      <h1 className="text-3xl font-black sm:text-5xl">الأدوات — ماذا تستخدم؟ ومتى؟</h1>
      <p className="mt-4 leading-8 text-[var(--text-muted)]">ابدأ بفكرة ومتطلبات ووثائق. استخدم أداة عندما تحتاج مخرجها، ولا تجعل تجهيز بيئة البرمجة شرطًا للتحليل.</p>
      <p className="mt-3 font-bold">إعداد أدوات التنفيذ يبدأ عند بدء كود الفرونت</p>
      <p className="mt-3 text-sm leading-7">يمكن إكمال المقابلة والتوثيق والمخططات دون وكيل برمجي. إعداد الوكيل والمهارات وMCP يأتي بعد اعتماد النموذج التفاعلي؛ لا يلزم اشتراك مدفوع أو تبديل أداتك.</p>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">مراجعة المصادر: 19 أكتوبر 2026. «مراجعة المصدر» تؤكد النص الموثق، ولا تعني تجربة التثبيت أو الحساب أو الاتصال. راجع تعليمات نظامك وإصدارك قبل تشغيل الأوامر.</p>
      <Link href="/templates" className="mt-4 inline-block font-bold text-[var(--primary)]">القوالب المرجعية وحالة توفرها ←</Link>
    </header>
    <p role="status" aria-live="polite" className="my-4 min-h-7 text-sm text-[var(--primary)]">{status}</p>
    <div className="grid gap-4 md:grid-cols-2">{COURSE_TOOL_GUIDE.map((tool) => <article key={tool.name} className="min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <h2 className="text-xl font-black" dir="auto">{tool.name}</h2>
      <p className="mt-3 text-sm leading-7">{tool.purpose}</p>
      <dl className="mt-3 space-y-2 text-sm leading-7">
        <div><dt className="inline font-bold">متى تستخدمها: </dt><dd className="inline">{tool.timing}</dd></div>
        <div><dt className="inline font-bold">المدخلات: </dt><dd className="inline">{tool.input}</dd></div>
        <div><dt className="inline font-bold">المخرجات: </dt><dd className="inline">{tool.output}</dd></div>
        <div><dt className="inline font-bold">دورة الحياة: </dt><dd className="inline">{tool.lifecycle}</dd></div>
      </dl>
      {tool.command && <div className="mt-4"><pre dir="ltr" className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-left text-xs leading-6 text-emerald-300">{tool.command}</pre><button type="button" className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white" onClick={() => copyCommand(tool.command!)}>نسخ الأمر</button></div>}
      <p className="mt-3 break-words text-xs leading-6 text-[var(--text-muted)]">{tool.verification}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[var(--primary)]"><a href={tool.source} target="_blank" rel="noreferrer">المصدر الرسمي</a><Link href={`/learn/${tool.topic}`}>موضوع الاستخدام</Link></div>
    </article>)}</div>
  </section>;
}
