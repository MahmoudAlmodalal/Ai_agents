'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  COURSE_TOOL_GUIDE,
  STAGE_DECISION_TABLE,
  ToolUsageStage,
  ToolVerificationStatus,
} from '@/src/data/course-tool-guide';
import { normalizeArabic } from '@/src/utils/searchUtils';

function getStatusBadge(status: ToolVerificationStatus) {
  switch (status) {
    case 'موثّق من مصدر رسمي':
      return {
        icon: '✓',
        badgeClass:
          'border-solid border-emerald-600/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/40',
      };
    case 'اختياري':
      return {
        icon: '◇',
        badgeClass:
          'border-dashed border-sky-600/40 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-500/40',
      };
    case 'لم يُختبر التثبيت':
      return {
        icon: '⚠',
        badgeClass:
          'border-dotted border-amber-600/40 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/40',
      };
  }
}

interface CourseToolsGuideProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function CourseToolsGuide({
  searchQuery = '',
  onSearchChange = () => {},
}: CourseToolsGuideProps) {
  const [status, setStatus] = useState('');
  const [selectedStage, setSelectedStage] = useState<'all' | ToolUsageStage>('all');

  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('تم نسخ الأمر؛ راجع المصدر الرسمي قبل تشغيله.');
    } catch {
      setStatus('تعذر النسخ؛ حدد الأمر وانسخه يدويًا.');
    }
  }

  const normQuery = normalizeArabic(searchQuery.trim());
  const queryWords = normQuery ? normQuery.split(' ').filter(Boolean) : [];

  const filteredTools = COURSE_TOOL_GUIDE.filter((tool) => {
    const matchesStage = selectedStage === 'all' || tool.stage === selectedStage;
    if (!matchesStage) return false;
    if (queryWords.length === 0) return true;

    const haystack = [
      tool.name,
      tool.stage,
      tool.purpose,
      tool.timing,
      tool.input,
      tool.output,
      tool.lifecycle,
      tool.commonPitfall,
      tool.workedExample,
      tool.topic,
      tool.command ?? '',
      tool.verification,
      tool.verificationStatus,
    ]
      .map(normalizeArabic)
      .join(' ');

    return queryWords.every((word) => haystack.includes(word));
  });

  return (
    <section aria-label="دليل أدوات المسار" className="mb-10">
      <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10">
        <h1 className="text-3xl font-black sm:text-5xl">الأدوات — ماذا تستخدم؟ ومتى؟ وكيف تبدأ؟</h1>
        <p className="mt-4 leading-8 text-[var(--text-muted)]">
          ابدأ بفكرة ومتطلبات ووثائق. استخدم أداة عندما تحتاج مخرجها، ولا تجعل تجهيز بيئة البرمجة شرطًا للتحليل.
        </p>
        <p className="mt-3 font-bold">إعداد أدوات التنفيذ يبدأ عند بدء كود الفرونت</p>
        <p className="mt-3 text-sm leading-7">
          يمكن إكمال المقابلة والتوثيق والمخططات دون وكيل برمجي. إعداد الوكيل والمهارات وMCP يأتي بعد اعتماد النموذج التفاعلي؛ لا يلزم اشتراك مدفوع أو تبديل أداتك.
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          مراجعة المصادر: 21 أكتوبر 2026. «مراجعة المصدر» تؤكد النص الموثق، ولا تعني تجربة التثبيت أو الحساب أو الاتصال. راجع تعليمات نظامك وإصدارك قبل تشغيل الأوامر.
        </p>
        <Link href="/templates" className="mt-4 inline-block font-bold text-[var(--primary)]">
          القوالب المرجعية وحالة توفرها ←
        </Link>
      </header>

      {/* حقل البحث الموحد للدليل */}
      <div className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-sm">
        <label htmlFor="unified-tools-search" className="block text-base font-black text-[var(--text-main)]">
          ابحث في الأدوات ودليل الوكلاء
        </label>
        <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">
          حقل بحث موحد يصفّي أدوات المسار ودليل الوكلاء التكميلي معًا بحسب الاسم، مرحلة الاستخدام، الغرض، أو أوامر التثبيت.
        </p>
        <div className="mt-3 relative flex items-center">
          <input
            id="unified-tools-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث في الأدوات والوكلاء (مثال: Git، طرفية، Next، كود، كلاين)..."
            className="w-full min-h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-body)] px-4 py-3 pe-12 text-sm text-[var(--text-main)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
            aria-label="ابحث في الأدوات ودليل الوكلاء"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute left-3 rounded-lg bg-[var(--bg-card-subtle)] px-2.5 py-1 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)]"
              aria-label="مسح كلمة البحث"
            >
              مسح
            </button>
          )}
        </div>
      </div>

      {/* جدول قرار الأداة — أي أداة في أي مرحلة */}
      <section aria-label="جدول قرار الأداة — أي أداة في أي مرحلة" className="mt-8">
        <div className="mb-3">
          <h2 className="text-xl font-black text-[var(--text-main)] sm:text-2xl">
            جدول قرار الأداة — أي أداة في أي مرحلة
          </h2>
          <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">
            حدد مرحلتك الحالية من الجدول أدناه لمعرفة الأدوات المطلوبة وشرط تخطيها، أو انقر على أي صف لتصفية البطاقات.
          </p>
        </div>

        <div className="table-container w-full max-w-full overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
          <table
            className="data-table w-full min-w-[640px] border-collapse text-right text-xs leading-6 sm:text-sm"
            dir="rtl"
          >
            <caption className="sr-only">جدول قرار الأداة — أي أداة في أي مرحلة</caption>
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-xs font-bold text-[var(--text-main)]">
                <th scope="col" className="p-3 text-right font-black">
                  مرحلة الاستخدام
                </th>
                <th scope="col" className="p-3 text-right font-black">
                  متى تحتاجها
                </th>
                <th scope="col" className="p-3 text-right font-black">
                  الأدوات
                </th>
                <th scope="col" className="p-3 text-right font-black">
                  شرط تخطيها
                </th>
              </tr>
            </thead>
            <tbody>
              {STAGE_DECISION_TABLE.map((row) => {
                const isSelected = selectedStage === row.stage;
                return (
                  <tr
                    key={row.stage}
                    onClick={() => setSelectedStage(row.stage)}
                    className={`cursor-pointer border-b border-[var(--border-color)] transition-colors last:border-b-0 ${
                      isSelected
                        ? 'bg-[var(--primary-light)] font-semibold text-[var(--text-main)]'
                        : 'hover:bg-[var(--bg-card-subtle)]'
                    }`}
                  >
                    <th
                      scope="row"
                      className="p-3 text-right font-bold whitespace-nowrap text-[var(--primary)]"
                    >
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStage(row.stage);
                        }}
                        className="font-bold text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--primary)] text-right"
                      >
                        {row.stage}
                      </button>
                    </th>
                    <td className="p-3 text-[var(--text-main)]">{row.whenNeeded}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {row.tools.map((t) => (
                          <span
                            key={t}
                            className="inline-block rounded-md bg-[var(--bg-card-subtle)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--text-muted)]"
                            dir="auto"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">{row.skipCondition}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* شرائح المراحل والعدّاد */}
      <div className="mt-8 flex flex-col gap-3">
        <div
          role="group"
          aria-label="تصفية الأدوات بحسب مرحلة الاستخدام"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setSelectedStage('all')}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              selectedStage === 'all'
                ? 'bg-[var(--primary)] text-white'
                : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)]'
            }`}
          >
            كل المراحل ({COURSE_TOOL_GUIDE.length})
          </button>
          {STAGE_DECISION_TABLE.map((row) => {
            const isSelected = selectedStage === row.stage;
            const stageCount = COURSE_TOOL_GUIDE.filter((t) => t.stage === row.stage).length;
            return (
              <button
                key={row.stage}
                type="button"
                onClick={() => setSelectedStage(row.stage)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-[var(--primary)] text-white'
                    : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)]'
                }`}
              >
                {row.stage} ({stageCount})
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[var(--text-muted)]">
          <span aria-live="polite">
            عدّاد الأدوات المعروضة: {filteredTools.length} من {COURSE_TOOL_GUIDE.length} أداة
            {selectedStage !== 'all' && (
              <span className="mr-2 font-normal text-[var(--primary)]">
                (المرحلة المحددة: {selectedStage})
              </span>
            )}
            {queryWords.length > 0 && (
              <span className="mr-2 font-normal text-[var(--primary)]">
                (المطابقة للبحث: «{searchQuery.trim()}»)
              </span>
            )}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {queryWords.length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-xs font-bold text-[var(--primary)] hover:underline"
              >
                مسح كلمة البحث
              </button>
            )}
            {selectedStage !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedStage('all')}
                className="text-xs font-bold text-[var(--primary)] hover:underline"
              >
                عرض كل المراحل ({COURSE_TOOL_GUIDE.length})
              </button>
            )}
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="my-4 min-h-7 text-sm text-[var(--primary)]">
        {status}
      </p>

      {/* قائمة بطاقات الأدوات أو رسالة الفراغ */}
      {filteredTools.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] p-8 text-center"
        >
          <p className="text-base font-bold text-[var(--text-main)]">
            لا توجد أدوات تطابق البحث الحالي{queryWords.length > 0 ? ` («${searchQuery.trim()}»)` : ''}.
          </p>
          <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
            اقتراح الخطوة التالية: جرب كلمة بحث بديلة مثل «Git» أو «Stitch» أو «طرفية»، أو امسح البحث لمشاهدة جميع أدوات المسار.
            {selectedStage !== 'all' && ' أو اضغط على «عرض كل المراحل» لإلغاء تصفية المرحلة الحالية.'}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {queryWords.length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                مسح كلمة البحث
              </button>
            )}
            {selectedStage !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedStage('all')}
                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card-subtle)] px-4 py-2 text-xs font-bold text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
              >
                عرض كل المراحل ({COURSE_TOOL_GUIDE.length})
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTools.map((tool) => {
            const badge = getStatusBadge(tool.verificationStatus);
            return (
              <article
                key={tool.name}
                className="min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-md bg-[var(--bg-card-subtle)] px-2 py-0.5 text-xs font-bold text-[var(--text-muted)]">
                      {tool.stage}
                    </span>
                    <h2 className="mt-1 text-xl font-black text-[var(--text-main)]" dir="auto">
                      {tool.name}
                    </h2>
                  </div>
                  <span
                    data-verification-status={tool.verificationStatus}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${badge.badgeClass}`}
                  >
                    <span aria-hidden="true" className="font-mono">
                      {badge.icon}
                    </span>
                    <span>{tool.verificationStatus}</span>
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-[var(--text-main)]">{tool.purpose}</p>

                <dl className="mt-3 space-y-2 text-sm leading-7">
                  <div>
                    <dt className="inline font-bold">مرحلة الاستخدام: </dt>
                    <dd className="inline">{tool.stage}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">تاريخ مراجعة المصدر: </dt>
                    <dd className="inline" dir="ltr">
                      {tool.reviewDate}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">متى تستخدمها: </dt>
                    <dd className="inline">{tool.timing}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">المدخلات: </dt>
                    <dd className="inline">{tool.input}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">المخرجات: </dt>
                    <dd className="inline">{tool.output}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">دورة الحياة: </dt>
                    <dd className="inline">{tool.lifecycle}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">أشهر عقبة عملية: </dt>
                    <dd className="inline text-amber-900 dark:text-amber-200">
                      {tool.commonPitfall}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-bold">مثال تطبيقي: </dt>
                    <dd className="inline">{tool.workedExample}</dd>
                  </div>
                </dl>

                {tool.command && (
                  <div className="mt-4">
                    <pre
                      dir="ltr"
                      className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-left text-xs leading-6 text-emerald-300"
                    >
                      {tool.command}
                    </pre>
                    <button
                      type="button"
                      className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
                      onClick={() => copyCommand(tool.command!)}
                    >
                      نسخ الأمر
                    </button>
                  </div>
                )}

                <p className="mt-3 break-words text-xs leading-6 text-[var(--text-muted)]">
                  {tool.verification}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[var(--primary)]">
                  <a href={tool.source} target="_blank" rel="noreferrer">
                    المصدر الرسمي
                  </a>
                  <Link href={`/learn/${tool.topic}`}>موضوع الاستخدام</Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
