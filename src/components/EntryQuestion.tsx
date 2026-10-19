'use client';

import { useEffect, useState } from 'react';

const answers = [
  ['context', 'أفهم المشكلة والمستخدم وأحدد نطاق النسخة الأولى', 'صحيح. ابدأ بسياق مشروعك: المشكلة والمستخدم والقيمة ونطاق MVP، ثم استخدم Grill Me لكشف الأسئلة قبل صياغة PRD.'],
  ['setup', 'أثبت وكيل البرمجة وSkills وMCP أولًا', 'تأتي أدوات التنفيذ عند بدء كود الفرونت بعد اعتماد التصميم. يمكنك الآن كتابة سياق المشروع في محرر نصوص أو محادثة دون تثبيتها.'],
  ['code', 'أطلب من AI بناء التطبيق كاملًا', 'ابدأ بالفهم والتوثيق قبل الكود. طلب تطبيق كامل قبل حسم المتطلبات يجعل AI يخمّن القرارات؛ حدّد المشكلة والمستخدم وMVP أولًا.'],
];

export function EntryQuestion() {
  const [selected, setSelected] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <section aria-labelledby="entry-question" className="mt-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
    <h2 id="entry-question" className="font-bold">سؤال الانطلاق: ما أول خطوة لبناء مشروعك؟</h2>
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {answers.map(([id, label]) => <button key={id} type="button" disabled={!ready} aria-pressed={selected === id} onClick={() => setSelected(id)} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-start text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">{label}</button>)}
    </div>
    <p role="status" className="mt-3 text-sm leading-7">{selected ? answers.find(([id]) => id === selected)?.[2] : 'اختر إجابة لقراءة تفسيرها؛ يمكنك المحاولة مجددًا.'}</p>
  </section>;
}
