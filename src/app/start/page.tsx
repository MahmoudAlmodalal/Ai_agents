import Link from 'next/link';
import { EntryQuestion } from '@/src/components/EntryQuestion';
import { getTopicBySlug } from '@/src/lib/topicRegistry';
import {
  getAllProposedGroups,
  getGroupStatusPresentation,
  getTopicImprovementStatus,
} from '@/src/lib/educationalRoadmap';

export const metadata = {
  title: 'ابدأ هنا | سلاح العصر',
  description: 'ابدأ سياق مشروعك ثم اتبع رحلة Full-Stack من المتطلبات إلى الواجهات والخادم والاختبار والنشر.',
};

const steps = [
  'ابدأ بالمشكلة والمستخدم والقيمة ونطاق MVP واكتب سياق مشروعك.',
  'استخدم Grill Me لحسم الأسئلة ثم اكتب PRD وراجع المتطلبات.',
  'وثّق العمل في Git وGitHub وارسم مسارات المستخدم والمخططات عند الحاجة.',
  'حلّل UX وصمّم شاشة مرجعية ونظام تصميم وPrototype.',
  'عند بدء كود الفرونت جهّز وكيل البرمجة وSkills وMCP ثم خطط ونفذ تدريجيًا.',
  'ابنِ الخادم وقاعدة البيانات وفق عقد API والصلاحيات واربط الواجهة بهما.',
  'اختبر رحلة Full-Stack والبيانات والأخطاء ثم جهّز النشر والتشغيل.',
  'سلّم المشروع ووثائقه واعرض النتيجة وما تحقق فعليًا.',
];

const prereqs = [
  'معرفة أساسيات البرمجة؛ لا تحتاج خبرة سابقة في AI Agents.',
  'فكرة أو مشكلة تريد فهمها، ومحرر نصوص أو ورقة لكتابة سياقها.',
  'يمكن استخدام محادثة في الاستكشاف؛ لا يلزم تثبيت وكيل أو Skills أو MCP للبدء.',
  'جهّز Git وGitHub عند حفظ الوثائق، وأدوات الرسم وStitch عند الوصول إلى موضوعها.',
  'يأتي Node.js وnpm وأدوات كود الفرونت عند بدء التنفيذ بعد اعتماد التصميم.',
];

const concepts = [
  ['Agent', 'مساعد يعمل على أهداف ويغير ملفات حسب الصلاحيات.'],
  ['Skill', 'تعليمات متخصصة مثل Grill Me.'],
  ['MCP', 'ربط قياسي بين Agent وأداة خارجية مثل Stitch.'],
  ['PRD', 'وثيقة ما نبنيه ولماذا ولمن.'],
  ['Spec Kit', 'مواصفات ثم تخطيط ومهام وتنفيذ وتحقق.'],
];

export default function StartPage() {
  const groups = getAllProposedGroups();

  return (
    <div className="min-h-screen bg-[var(--bg-body)] px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
          → العودة إلى الرئيسية
        </Link>
        <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
          <h1 className="text-3xl font-black text-[var(--text-main)] sm:text-5xl">
            ابدأ مشروعك من الصفر — بدون تخطي المراحل
          </h1>
          <p className="mt-4 max-w-4xl leading-8 text-[var(--text-muted)]">
            برنامج MET Academy — سلاح العصر، مدته الرسمية 40 ساعة. ابنِ مشروعًا تختاره ضمن مسار Full-Stack من الفكرة إلى واجهات وخادم وقاعدة بيانات واختبار ونشر وعرض. ابدأ بمشروع واحد وسر معه على مراحل. احتفظ بكل مخرجاتك داخل مجلد docs/ ولا تعتمد قرار AI قبل فهمه.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/learn/project-idea-mvp" className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-black text-white">
              ابدأ بالموضوع الأول
            </Link>
            <Link href="/roadmap" className="rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-black">
              خارطة المشروع
            </Link>
          </div>
          <EntryQuestion />
        </header>

        <section className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
          <h2 className="text-xl font-black">خطوات الطالب الأولى</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] font-mono text-sm font-black text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-7">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h2 className="font-black">ما الذي تحتاجه الآن، وما الذي يأتي لاحقًا؟</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              {prereqs.map((p) => (
                <li key={p}>✓ {p}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h2 className="font-black">Agent وSkill وMCP وPRD</h2>
            <div className="mt-3 space-y-2">
              {concepts.map((c) => (
                <div key={c[0]} className="rounded-xl bg-[var(--bg-card-subtle)] p-3">
                  <strong className="font-mono text-sm text-[var(--primary)]" dir="ltr">
                    {c[0]}
                  </strong>
                  <p className="text-xs text-[var(--text-muted)]">{c[1]}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs dark:bg-emerald-950/20">
              <strong>القاعدة الذهبية:</strong> Agent ينفذ، Skill يرشده، MCP يوصله، وPRD يحدد المطلوب.
            </p>
          </section>
        </div>

        {/* Project Path Section */}
        <section
          className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6"
          id="project-path"
          aria-label="مسار مشروعك"
        >
          <div className="border-b border-[var(--border-color)] pb-4 mb-6">
            <h2 className="text-xl font-black text-[var(--text-main)]">
              مسار مشروعك — حسب ترتيب الاعتماديات
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
              خارطة الطريق التعليمية مقسمة إلى 19 مجموعة مقترحة تغطي جميع المواضيع الـ 58 دون تكرار أو حذف.
              حدود المجموعات وقالب الدروس تُعرض هنا كمقترحات صريحة بانتظار الاعتماد الرسمي من مالك المسار.
              مجموعة &quot;الفكرة ونطاق النسخة الأولى (Idea and MVP)&quot; هي المجموعة الأولى المقترحة وليست خيارًا معتمدًا بعد.
            </p>
            <div className="mt-3 p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-950 dark:text-blue-200 space-y-1">
              <p className="font-bold">💡 إرشادات استرشادية لرحلة التعلم:</p>
              <p>
                المتطلبات السابقة ومخرجات خطوات التطبيق العملية المذكورة أدناه هي إرشادات توجيهية استرشادية؛ جميع روابط المواضيع تظل مفعّلة ومتاحة للدخول المباشر فورًا دون اشتراط إكمال قراءة أو قوائم تحقق سابقة.
              </p>
              <p>
                حالة توفر المحتوى الحالي (جميع المواضيع متاحة ومنشورة) منفصلة تمامًا عن حالة التحسين؛ فجميع المجموعات تخضع حاليًا للمراجعة التعليمية الجديدة وتنتظر اعتمادها.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {groups.map((group) => {
              const groupStatus = getGroupStatusPresentation(group);
              return (
                <article
                  key={group.id}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)]/50 p-4 sm:p-5"
                >
                  <header className="mb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-[var(--primary)] text-white">
                          المجموعة {group.number}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-[var(--text-main)]">
                          {group.titleAr}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold border ${
                            groupStatus.isFirstGroupProposal
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                              : group.groupBoundariesApproved
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {groupStatus.boundaryStatusLabel}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-medium border ${
                            groupStatus.improvementStatus === 'improved'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {groupStatus.improvementStatusLabel}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {group.descriptionAr}
                    </p>
                  </header>

                  <ol className="grid gap-3 sm:grid-cols-2">
                    {group.topicSlugs.map((slug) => {
                      const topic = getTopicBySlug(slug);
                      if (!topic) return null;
                      const status = getTopicImprovementStatus(slug);
                      return (
                        <li
                          key={topic.slug}
                          className="rounded-xl border border-[var(--border-color)] p-3.5 bg-[var(--bg-surface)] hover:border-[var(--primary)] transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <Link
                                href={`/learn/${topic.slug}`}
                                className="font-bold text-sm sm:text-base text-[var(--primary)] hover:underline"
                              >
                                {topic.number}. {topic.title}
                              </Link>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                حالة التوفر: {status.availabilityLabel}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                حالة التحسين: {status.improvementLabel}
                              </span>
                            </div>
                            {topic.prerequisites.length > 0 && (
                              <p className="text-xs text-[var(--text-muted)] mb-1 leading-relaxed">
                                <strong>إرشاد تمهيدي: </strong>
                                <span>{topic.prerequisites[0]}</span>
                              </p>
                            )}
                            {topic.outputs.length > 0 && (
                              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>المخرج العملي: </strong>
                                <code
                                  dir="ltr"
                                  className="px-1.5 py-0.5 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded font-mono text-[11px] font-bold"
                                >
                                  {topic.outputs[0]}
                                </code>
                              </p>
                            )}
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs">
                            <Link
                              href={`/learn/${topic.slug}`}
                              className="font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                            >
                              <span>فتح الموضوع مباشرة</span>
                              <span aria-hidden="true">←</span>
                            </Link>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">
                              {topic.stageTag}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </article>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--primary)]">
            <Link href="/borrowhub">مثال BorrowHub الاختياري</Link>
            <Link href="/templates">القوالب المتاحة</Link>
            <Link href="/tools">دليل الأدوات</Link>
            <Link href="/faq">الأسئلة الشائعة</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
