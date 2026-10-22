import Link from 'next/link';
export const metadata = { title: 'الصفحة غير موجودة | Ai_agents', description: 'الرابط غير صحيح — عُد إلى مسار التعلم.' };
export default function NotFound() {
  return (<main className="flex min-h-[70vh] items-center justify-center px-4 py-16" dir="rtl"><div className="mx-auto max-w-xl text-center">
    <div className="font-mono text-7xl font-black text-[var(--primary)]" dir="ltr">404</div>
    <h1 className="mt-4 text-2xl font-black text-[var(--text-main)]">الصفحة غير موجودة</h1>
    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">الرابط الذي فتحته غير صحيح أو نُقلت الصفحة. عُد إلى مسار التعلم أو ابدأ من جديد.</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/" className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-black text-white">الرئيسية</Link><Link href="/start" className="rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-black">ابدأ هنا</Link><Link href="/start#project-path" className="rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-black">خارطة المشروع</Link></div>
  </div></main>);
}
