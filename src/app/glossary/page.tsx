import Link from 'next/link';
import GlossarySearch from './GlossarySearch';
export const metadata = { title: 'القاموس التقني | Ai_agents', description: 'مصطلحات المسار بالعربية والإنجليزية مع البحث.' };
export default function GlossaryPage() {
  return <div className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10"><h1 className="text-3xl font-black sm:text-5xl">القاموس التقني</h1><p className="mt-4 leading-8 text-[var(--text-muted)]">مصطلحات المصدر الخمسة والثلاثون؛ ابحث بالعربية أو بالمصطلح الإنجليزي أثناء تطبيق مشروعك.</p><Link href="/faq" className="mt-3 inline-block font-bold text-[var(--primary)]">افتح الأسئلة الشائعة</Link></header>
    <GlossarySearch />
  </div></div>;
}
