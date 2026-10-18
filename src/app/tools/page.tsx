import Link from 'next/link';
export const metadata = { title: 'الأدوات والتثبيت | سلاح العصر', description: 'الأدوات الرسمية: الوظيفة والرابط وأمر التثبيت.' };
export default function ToolsPage() {
  const tools: string[][] = [['Antigravity','Coding Agent يقرأ المشروع','https://antigravity.google/'],['Grill Me','مقابلة متطلبات تدريجية','https://github.com/mattpocock/skills'],['Git / GitHub','تاريخ تغييرات وتوثيق','https://github.com/'],['Mermaid Live','مخططات نصية','https://mermaid.live'],['PlantUML','رسم Use Case قياسي','https://www.planttext.com/'],['dbdiagram.io','تحويل DBML إلى ERD','https://dbdiagram.io'],['Google Stitch','توليد واجهات من وصف','https://stitch.withgoogle.com/'],['Next.js','تطوير Frontend','https://nextjs.org/docs'],['UI/UX Pro Max','مراجعة UI/UX','https://github.com/nextlevelbuilder/ui-ux-pro-max-skill'],['DESIGN.md','عقد النظام البصري','https://github.com/google-labs-code/design.md']];
  return (<main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10"><h1 className="text-3xl font-black sm:text-5xl">الأدوات — ماذا تستخدم؟ ومتى؟</h1><p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">تحقق من الصفحة الرسمية قبل التشغيل، ولا تضع مفاتيح API في GitHub.</p></header>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{tools.map((t) => (<article key={t[0]} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><h2 className="font-black">{t[0]}</h2><p className="mt-1 text-xs text-[var(--text-muted)]">{t[1]}</p><a href={t[2]} target="_blank" rel="noreferrer" className="mt-2 block text-xs font-bold text-emerald-600" dir="ltr">{t[2]}</a></article>))}</div>
  </div></main>);
}
