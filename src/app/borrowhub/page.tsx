import Link from 'next/link';
import CaseStudyTools from './CaseStudyTools';
import { caseFiles, rules } from './caseStudy';
export const metadata = { title: 'ورشة BorrowHub | سلاح العصر', description: 'دراسة حالة استعارة المعدات: القصة والأدوار والقواعد التسع ومسار الطالب.' };
const panel = 'mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6';
const tables = [
  ['users', 'الطلاب والمسؤولون وحالة اعتماد الحساب.'],
  ['equipment_categories', 'الفئات التي تصنّف المعدات.'],
  ['equipment', 'المعدات وكميات المخزون التجميعي.'],
  ['loan_requests', 'الطلبات والقرارات والتسليم والإرجاع.'],
  ['loan_action_logs', 'من نفّذ الإجراء ومتى.'],
];
const stages = [
  ['الفكرة والمتطلبات', 'اكتب الهدف وحدود MVP ثم راجع أهلية الطالب وصلاحيات المسؤول في PRD.', '/learn/prd-specification', 'صياغة PRD'],
  ['المسار والمفاهيم', 'قارن رحلة تقديم الطلب ومراجعة المسؤول، ثم افصل مفاهيم العمل عن تفاصيل الجداول.', '/learn/user-flow-modeling', 'نمذجة User Flow'],
  ['البيانات', 'راجع العلاقات والقيود وتزامن تحديث المخزون بدل الاكتفاء برسم جداول.', '/learn/relational-erd-design', 'تصميم الجداول وERD'],
  ['الشاشات', 'استخرج شاشات الطالب والمسؤول وحالات الانتظار والرفض والتلف من الصلاحيات.', '/learn/screen-inventory', 'جرد الشاشات'],
  ['التنفيذ والتحقق', 'نفّذ مهمة Frontend محددة ببيانات تمثيلية قبل مرحلة ربط Backend، ثم اختبر الرحلة كاملة.', '/learn/full-stack-journey-testing', 'اختبار الرحلة المتكاملة'],
];
export default function BorrowHubPage() {
  return <div className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl"><div className="mx-auto max-w-6xl">
    <Link href="/" className="mb-6 inline-flex text-sm font-bold text-[var(--primary)]">→ الرئيسية</Link>
    <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">مثال تعليمي — ليس مشروعًا إلزاميًا</span>
      <h1 className="mt-4 text-3xl font-black sm:text-5xl">BorrowHub — من الفكرة إلى تصميم قابل للتنفيذ</h1>
      <p className="mt-4 leading-8 text-[var(--text-muted)]">نظام استعارة معدات جامعية. يبحث الطالب عن المعدات ويقدم طلبًا عند تحقق شروط الأهلية؛ يراجع مسؤول المعمل أو المستودع الطلبات ويسجل التسليم والإرجاع المادي ويتابع المخزون والتلف. استخدمه لمقارنة المنهج مع مشروعك الخاص.</p>
    </header>
    <aside role="note" className="mt-6 rounded-2xl border border-amber-400 bg-amber-50 p-5 leading-8 text-amber-950">
      <strong>تنبيه مراجعة PRD:</strong> قواعد المصدر الأحدث أدناه خاصة بالمثال. إذا ظهر تعارض مع PRD المعتمد، وثّق النصين وسؤال القرار واطلب مراجعة المالك؛ لا تحسمه بصمت ولا تغيّر PRD تلقائيًا. نسخة PRD للحالة غير مرفوعة هنا، لذلك لا ندّعي مطابقة مكتملة. الغرامات والحظر التلقائي والتوقيع الإلزامي ليست قرارات في هذه القواعد التسع.
    </aside>
    <section aria-label="الأدوار والصلاحيات" className={panel}><h2 className="text-xl font-black">الأدوار والصلاحيات</h2><dl className="mt-4 grid gap-4 md:grid-cols-2"><div><dt className="font-bold" dir="ltr">Student</dt><dd className="mt-2 leading-8 text-[var(--text-muted)]">التسجيل ومتابعة حالة الحساب والتصفح وتقديم الطلب ومتابعة طلباته وإلغاء الطلب المعلّق ضمن الشروط.</dd></div><div><dt className="font-bold" dir="ltr">Administrator / Staff</dt><dd className="mt-2 leading-8 text-[var(--text-muted)]">مراجعة الحسابات وإدارة الكتالوج والموافقة أو الرفض وتأكيد التسليم والإرجاع ورصد التلف ومتابعة التأخر.</dd></div></dl></section>
    <section aria-label="قواعد العمل الموثقة" className={panel}><h2 className="text-xl font-black">قواعد العمل الموثقة (9)</h2><ol className="mt-4 list-decimal space-y-3 pr-6 text-sm leading-7 text-[var(--text-muted)]">{rules.map(rule => <li key={rule}>{rule}</li>)}</ol><p className="mt-4 leading-7 text-[var(--text-muted)]">هذه قواعد BorrowHub وليست قالبًا عامًا؛ حدد حدود مشروعك أنت بناءً على متطلباته.</p></section>
    <CaseStudyTools />
    <section aria-label="جداول المثال الخمسة" className={panel}><h2 className="text-xl font-black">جداول المثال الخمسة</h2><ul className="mt-4 space-y-3">{tables.map(([name, purpose]) => <li key={name}><code dir="ltr" className="font-bold text-[var(--primary)]">{name}</code><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">{purpose}</p></li>)}</ul><p className="mt-4 leading-8 text-[var(--text-muted)]">العلاقات: الطالب يقدم طلبات، والمعدة ترتبط بطلبات وتنتمي لفئة، وكل طلب له سجل إجراءات ينفذها مسؤول. تحدي المراجعة: كيف تضمن اتساق available/reserved/borrowed/damaged مع الإجمالي عند طلبين متزامنين؟ دوّن القيود والتحديثات الذرية وأسئلتك في docs/database-review.md؛ لا تفترض أن الرسم وحده يضمن سلامة المخزون.</p></section>
    <section className={panel}><h2 className="text-xl font-black">اربط المثال بمرحلة مشروعك</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{stages.map(([title, text, href, label]) => <article key={title} className="rounded-xl border border-[var(--border-color)] p-4"><h3 className="font-bold">{title}</h3><p className="my-3 text-sm leading-7 text-[var(--text-muted)]">{text}</p><Link href={href} className="font-bold text-[var(--primary)]">{label}</Link></article>)}</div></section>
    <section aria-label="ملفات دراسة الحالة" className={panel}><h2 className="text-xl font-black">ملفات دراسة الحالة</h2><p className="mt-3 leading-8 text-[var(--text-muted)]">هذه أسماء المخرجات المرجعية في المصدر، وليست ملفات تنزيل مرفوعة. تظهر حالة التوفر صراحة؛ استعن بالدروس المنشورة أعلاه وبالقوالب العامة، مع إبقاء قواعد المثال منفصلة عن مشروعك.</p><ul className="mt-4 space-y-3">{caseFiles.map(([name, purpose]) => <li key={name} className="rounded-xl border border-[var(--border-color)] p-3"><code dir="ltr" className="block break-all text-sm font-bold">{name}</code><p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">{purpose} — <strong>غير متاح: ملف الحالة غير مرفوع</strong></p></li>)}</ul><Link href="/templates" className="mt-4 inline-block font-bold text-[var(--primary)]">القوالب العامة وحالة توفرها ←</Link></section>
  </div></div>;
}
