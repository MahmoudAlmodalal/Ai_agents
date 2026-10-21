'use client';

import { useEffect, useId, useState } from 'react';
import { flow, reviewPrompt } from './caseStudy';

export default function CaseStudyTools() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  useEffect(() => {
    let active = true;
    async function render() {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
        const result = await mermaid.render(`borrowhub-${id}`, flow);
        if (active) setSvg(result.svg);
      } catch {
        if (active) setError(true);
      }
    }
    void render();
    return () => { active = false; };
  }, [id]);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('تم النسخ إلى الحافظة.');
    } catch {
      setCopyStatus('تعذر النسخ؛ حدّد النص الظاهر وانسخه يدويًا.');
    }
  }

  return <>
    <section aria-label="مسار الطالب الأساسي" className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
      <h2 className="text-xl font-black">مسار الطالب الأساسي</h2>
      <p className="mt-3 leading-8 text-[var(--text-muted)]">تسجيل واعتماد الحساب ← تسجيل الدخول ← تصفح المعدات واختيارها ← تقديم الطلب ← مراجعة المسؤول وقبول أو رفض ← تسليم بواسطة المسؤول ← متابعة الإعارة ← تأكيد الإرجاع بواسطة المسؤول.</p>
      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">مثال محلول: طالبة معتمدة بلا طلبات نشطة تطلب كاميرا واحدة لخمسة أيام وتذكر سبب التصوير. يراجع المسؤول الطلب ثم يسلم الكاميرا فعليًا ويسجل التسليم؛ عند الإرجاع يفحصها ويسجل النتيجة. إذا كانت تالفة يسجل التلف ولا يعيدها إلى المتاح. المخرج المتوقع: طلب موثق وإجراءات المسؤول، لا تأكيد ذاتي من الطالبة.</p>
      <div className="mt-4 max-h-[38rem] overflow-auto rounded-xl bg-white p-4 text-slate-900" aria-label="مخطط مسار الاستعارة" role="img">
        {svg ? <div dir="ltr" dangerouslySetInnerHTML={{ __html: svg }} /> : <p>{error ? 'تعذر عرض الرسم؛ المسار النصي وكود Mermaid متاحان أدناه.' : 'جارٍ عرض المخطط…'}</p>}
      </div>
      <details className="mt-4"><summary className="cursor-pointer font-bold">كود Mermaid القابل للمراجعة</summary><pre dir="ltr" className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">{flow}</pre></details>
      <button type="button" onClick={() => copy(flow)} className="mt-3 min-h-11 rounded-xl border border-[var(--border-color)] px-4 py-2 font-bold">نسخ كود مسار الطالب</button>
      <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="mx-3 inline-block py-3 font-bold text-[var(--primary)]">فتح Mermaid Live ↗</a>
    </section>
    <section className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
      <h2 className="text-xl font-black">برومبت مراجعة الحالة</h2><p className="mt-3 leading-7 text-[var(--text-muted)]">المدخل: PRD الذي اعتمدته ومخططات المثال. المخرج: جدول تعارضات وأسئلة قرار؛ لا تستخدم البرومبت كبديل عن المتطلبات المعتمدة.</p>
      <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-sm leading-7 text-slate-100">{reviewPrompt}</pre>
      <button type="button" onClick={() => copy(reviewPrompt)} className="mt-4 min-h-11 rounded-xl bg-[var(--primary)] px-4 py-2 font-bold text-white">نسخ برومبت مراجعة BorrowHub</button>
    </section>
    <p role="status" aria-live="polite" className="mt-3 min-h-7 text-sm text-[var(--text-main)]">{copyStatus}</p>
  </>;
}
