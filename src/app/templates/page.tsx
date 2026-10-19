'use client';

import Link from 'next/link';
import { useState } from 'react';
import { REFERENCE_TEMPLATES } from '@/src/data/reference-templates';

export default function TemplatesPage() {
  const [status, setStatus] = useState('');
  async function copyFields(name: string, fields: string) {
    try {
      await navigator.clipboard.writeText(`${name}\n${fields}`);
      setStatus(`تم نسخ الحقول المرجعية: ${name}`);
    } catch {
      setStatus('تعذر النسخ؛ حدد نص الحقول وانسخه يدويًا.');
    }
  }
  return <div className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
    <div className="mx-auto max-w-6xl">
      <Link href="/" className="mb-6 inline-flex text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
        <h1 className="text-3xl font-black sm:text-5xl">القوالب المرجعية الأربعة عشر</h1>
        <p className="mt-4 leading-8 text-[var(--text-muted)]">اختر المرجع الذي يخدم مخرج موضوعك. الحقول أدناه وصف مرجعي من مادة الدورة، وليست ملفات قوالب كاملة أو مخرجات مكتملة لمشروعك.</p>
        <p className="mt-3 leading-8">الملفات الأربعة عشر غير مرفوعة حاليًا؛ لا يوجد تنزيل متاح. يمكنك نسخ الحقول وفتح موضوع الاستخدام لبناء ملفك ومراجعته.</p>
        <Link href="/tools" className="mt-4 inline-block font-bold text-[var(--primary)]">دليل الأدوات ووقت استخدامها ←</Link>
      </header>
      <p role="status" aria-live="polite" className="my-4 min-h-7 break-words text-sm text-[var(--primary)]">{status}</p>
      <div className="grid gap-4 md:grid-cols-2">{REFERENCE_TEMPLATES.map((template) => <article key={template.name} className="min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
        <h2 className="break-words font-black" dir="auto">{template.name}</h2>
        <p className="mt-2 text-sm font-bold text-[var(--text-muted)]">غير متاح للتنزيل</p>
        <p className="mt-3 rounded-xl bg-[var(--bg-card-subtle)] p-3 text-sm leading-7" dir="auto">{template.fields}</p>
        <dl className="mt-3 space-y-2 text-sm leading-7">
          <div><dt className="inline font-bold">المدخلات: </dt><dd className="inline">{template.input}</dd></div>
          <div><dt className="inline font-bold">المخرجات: </dt><dd className="inline">{template.output}</dd></div>
          <div><dt className="inline font-bold">دورة الحياة: </dt><dd className="inline">{template.lifecycle}</dd></div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => copyFields(template.name, template.fields)} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white">نسخ الحقول المرجعية</button>
          <Link href={`/learn/${template.topic}`} className="rounded-xl border border-[var(--border-color)] px-4 py-2 text-sm font-bold">موضوع الاستخدام</Link>
        </div>
      </article>)}</div>
    </div>
  </div>;
}
