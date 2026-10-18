import Link from 'next/link';
export const metadata = { title: 'الملفات والقوالب | سلاح العصر', description: 'قوالب PRD وSRS والمخططات وDESIGN.md وخطة Frontend.' };
export default function TemplatesPage() {
  const groups: string[][] = [['التحليل والتوثيق','PROJECT_CONTEXT.md','PRD.md (27 قسما)','SRS.md','PRD_REVIEW.md'],['النمذجة','user-flow.md','domain-model.md','use-case.puml','database.dbml','ERD.md'],['التصميم','UX_BLUEPRINT.md','SCREEN_INVENTORY.md','STITCH_MASTER_PROMPT.md','DESIGN.md'],['التنفيذ','FRONTEND_PLAN.md','FRONTEND_TASKS.md','ROUTES_MAP.md','COMPONENT_ARCHITECTURE.md']];
  return (<main className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10"><h1 className="text-3xl font-black sm:text-5xl">الملفات والقوالب</h1><p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">كل مرحلة تنتج ملفا موثقا داخل docs/. انسخ البنية واملأها من مشروعك.</p></header>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{groups.map((g) => (<section key={g[0]} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"><h2 className="font-black">{g[0]}</h2><ul className="mt-3 space-y-2 text-xs text-[var(--text-muted)]">{g.slice(1).map((f) => (<li key={f} className="rounded-lg bg-[var(--bg-card-subtle)] px-3 py-2 font-mono" dir="auto">{f}</li>))}</ul></section>))}</div>
  </div></main>);
}
