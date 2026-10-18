import Link from 'next/link';
import { MODELS, BEST_PICKS, LAST_VERIFIED_MODELS } from '@/src/data/models';

export const metadata = { title: 'مؤشر الموديلات | سلاح العصر', description: 'مقارنة الموديلات الحالية: البرمجة والعربية والاستدلال والتكلفة — دليل تكميلي محدث.' };

const scoreColor: Record<string, string> = {
  'ممتاز': 'bg-emerald-600 dark:bg-emerald-800 text-white',
  'جيد جدا': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  'جيد': 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  'مقبول': 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default function ModelsPage() {
  return (<main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
      <h1 className="text-3xl font-black sm:text-5xl">مؤشر الموديلات — ما أفضل موديل الآن؟</h1>
      <p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">دليل تكميلي (ليس جزءا من المنهج المعتمد). لا يوجد موديل واحد يفوز في كل شيء — الفائز يعتمد على مهمتك: البرمجة الوكيلية، العربية، الاستدلال، أو الميزانية. التقييمات نوعية (ممتاز/جيد/مقبول) وليست أرقام بنشمارك مختلقة.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <Link href="/tools" className="rounded-full bg-[var(--primary)] px-4 py-2 font-bold text-white">قارن الوكلاء في /tools ←</Link>
        <span className="rounded-full bg-[var(--bg-card-subtle)] px-3 py-2 text-[var(--text-muted)]">آخر تحقق: <span dir="ltr">{LAST_VERIFIED_MODELS}</span></span>
        <span className="rounded-full bg-amber-100 px-3 py-2 font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">راجع الأسعار الرسمية — تتغير بسرعة</span>
      </div>
    </header>
    <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {BEST_PICKS.map((p) => (<article key={p.title} className="rounded-2xl border-2 border-emerald-500 bg-[var(--bg-surface)] p-5"><p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">الأفضل — {p.title}</p><h2 className="mt-2 text-lg font-black text-[var(--text-main)]" dir="auto">{p.model}</h2><p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">{p.reason}</p></article>))}
      <article className="rounded-2xl border border-[var(--border-color)] bg-[var(--primary)] p-5 text-white"><p className="text-xs font-bold text-emerald-300">توصية الدورة</p><h2 className="mt-2 text-lg font-black">ابدأ بـ Gemini 2.5 Pro مجانا</h2><p className="mt-2 text-xs leading-6 text-slate-200">يكفي مسار الدورة كاملا لمعظم الطلاب. انتقل لمدفوع فقط عند حاجة مثبتة.</p></article>
    </section>
    <section className="mt-6 overflow-x-auto rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 sm:p-6">
      <h2 className="mb-4 text-xl font-black text-[var(--text-main)]">جدول المقارنة الكامل ({MODELS.length} موديلات)</h2>
      <table className="w-full min-w-[760px] text-xs leading-6">
        <thead><tr className="border-b border-[var(--border-color)] text-[var(--text-muted)]">
          <th className="p-2 text-right">الموديل</th><th className="p-2 text-right">الشركة</th><th className="p-2 text-right">السياق</th><th className="p-2 text-right">البرمجة</th><th className="p-2 text-right">العربية</th><th className="p-2 text-right">الاستدلال</th><th className="p-2 text-right">التكلفة</th><th className="p-2 text-right">المجاني</th>
        </tr></thead>
        <tbody>{MODELS.map((m) => (<tr key={m.slug} className="border-b border-[var(--border-color)] last:border-0">
          <td className="p-2 font-black text-[var(--text-main)]"><a href={m.officialUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-600" dir="auto">{m.modelAr}</a><span className="block font-mono text-[10px] font-normal text-[var(--text-muted)]" dir="ltr">{m.model}</span></td>
          <td className="p-2 text-[var(--text-muted)]" dir="ltr">{m.vendor}</td>
          <td className="p-2 text-[var(--text-muted)]">{m.contextAr}</td>
          <td className="p-2"><span className={`rounded-full px-2 py-1 font-bold ${scoreColor[m.coding]}`}>{m.coding}</span></td>
          <td className="p-2"><span className={`rounded-full px-2 py-1 font-bold ${scoreColor[m.arabic]}`}>{m.arabic}</span></td>
          <td className="p-2"><span className={`rounded-full px-2 py-1 font-bold ${scoreColor[m.reasoning]}`}>{m.reasoning}</span></td>
          <td className="p-2 text-[var(--text-muted)]">{m.costAr}</td>
          <td className="p-2 text-[var(--text-muted)]">{m.freeAccessAr}</td>
        </tr>))}</tbody>
      </table>
    </section>
    <section className="mt-6 grid gap-4 md:grid-cols-2">
      {MODELS.map((m) => (<article key={m.slug} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><h3 className="font-black text-[var(--text-main)]">{m.modelAr} <span className="font-mono text-xs font-normal text-[var(--text-muted)]" dir="ltr">{m.model}</span></h3><p className="mt-2 text-xs leading-6 text-[var(--text-muted)]"><strong className="text-emerald-700 dark:text-emerald-300">الأنسب لـ:</strong> {m.bestForAr}</p><a href={m.officialUrl} target="_blank" rel="noreferrer" className="mt-2 block text-xs font-bold text-emerald-600" dir="ltr">{m.officialUrl} ← الرسمي</a></article>))}
    </section>
    <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-100"><strong>منهجية وحدود:</strong> التقييمات تقديرية من الاستخدام العام والتوثيق الرسمي بتاريخ {LAST_VERIFIED_MODELS}، وليست نتائج بنشمارك مستقلة. الأسعار والحصص المجانية تتغير — تحقق من الرابط الرسمي لكل موديل قبل أي قرار شراء. لا ترفع أسرارا أو مفاتيح API لأي خدمة.</section>
  </div></main>);
}
