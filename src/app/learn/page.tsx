import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  Workflow, 
  Sparkles,
  Clock,
  GraduationCap
} from 'lucide-react';
import { LEARNING_STAGES } from '@/src/data/learningStages';

export const metadata = {
  title: 'مسار التعلم الشامل | Ai_agents',
  description: 'خارطة طريق تعليمية توضح المراحل الـ 6 لبناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي من الفكرة إلى الإنتاج.',
};

export default function LearnOverviewPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-body)] px-3 sm:px-6 lg:px-8 py-8 sm:py-12" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <nav aria-label="مسار التنقل" className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">
            الرئيسية
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--text-main)]" aria-current="page">
            مسار التعلم
          </span>
        </nav>

        {/* Hero Section */}
        <header className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 mb-8 sm:mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-4">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>البرنامج التدريبي المتكامل (40 ساعة معتمدة كمنهج دراسي)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--text-main)] tracking-tight leading-tight">
                مسار التعلم الشامل: رحلة المهندس من الفكرة إلى الإنتاج
              </h1>
              <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-[var(--text-muted)]">
                خارطة طريق تعليمية عملية منظمة عبر <strong className="text-[var(--text-main)]">6 مراحل هندسية متسلسلة</strong> تغطي <strong className="text-[var(--text-main)]">58 موضوعاً</strong>. تبدأ معك من صياغة المشكلة وتحديد نطاق النسخة الأولى (MVP)، مروراً بالنمذجة المعمارية وتصميم قواعد البيانات وبناء واجهات المستخدم والخادم، وانتهاءً بضمان الجودة والنشر السحابي وملف الإنجاز.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link 
                href="/learn/project-idea-mvp" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-sm font-black shadow-sm hover:bg-[var(--action-bg-hover)] transition-all cursor-pointer text-center"
              >
                <BookOpen className="w-4 h-4" />
                <span>ابدأ بالموضوع الأول</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link 
                href="/start#project-path" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-sm font-bold hover:bg-[var(--border-color)] transition-colors cursor-pointer text-center"
              >
                <Workflow className="w-4 h-4 text-[var(--primary)]" />
                <span>خارطة اعتماديات المشروع</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-[var(--bg-body)] border border-[var(--border-color)]">
              <span className="block text-2xl font-black text-[var(--text-main)]">6</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">مراحل هندسية</span>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--bg-body)] border border-[var(--border-color)]">
              <span className="block text-2xl font-black text-[var(--text-main)]">58</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">موضوعاً تطبيقياً</span>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--bg-body)] border border-[var(--border-color)]">
              <span className="block text-2xl font-black text-[var(--text-main)]">40</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">ساعة تدريبية</span>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--bg-body)] border border-[var(--border-color)]">
              <span className="block text-2xl font-black text-[var(--text-main)]">100%</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">تطبيق عملي وتوثيق</span>
            </div>
          </div>
        </header>

        {/* The 6 Stages Grid */}
        <section aria-label="المراحل الست للمسار">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
                المراحل التعليمية الست بالترتيب
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                تدرج هندسي منطقي من الفكرة حتى إطلاق المنتج وتسليمه.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {LEARNING_STAGES.map((stage) => {
              return (
                <article 
                  key={stage.stageNumber}
                  className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 hover:border-[var(--primary-border)] transition-colors shadow-xs"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Header: Number, Icon, Title, Duration */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--primary)] text-white font-mono text-sm font-black">
                          {stage.stageNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--bg-card-subtle)] text-[var(--primary)] border border-[var(--border-color)]">
                          {stage.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>المدة التقديرية: {stage.duration}</span>
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] mb-3">
                        {stage.title}
                      </h3>

                      <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-[var(--text-muted)] mb-5">
                        {stage.goal}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]/70">
                        {/* What You Learn */}
                        <div className="rounded-2xl bg-[var(--bg-body)]/60 border border-[var(--border-color)] p-4 sm:p-5">
                          <h4 className="text-xs sm:text-sm font-black text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                            <span>ما ستتعلمه في هذه المرحلة:</span>
                          </h4>
                          <ul className="space-y-2 text-xs leading-6 text-[var(--text-muted)]">
                            {stage.whatYouLearn.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[var(--primary)] font-bold mt-0.5 shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tangible Deliverables */}
                        <div className="rounded-2xl bg-[var(--bg-body)]/60 border border-[var(--border-color)] p-4 sm:p-5 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-[var(--text-main)] mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span>المخرجات العملية المسلّمة:</span>
                            </h4>
                            <ul className="space-y-2 text-xs leading-6 text-[var(--text-muted)]">
                              {stage.deliverables.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 shrink-0">✓</span>
                                  <code dir="ltr" className="font-mono text-[11px] text-[var(--text-main)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">
                                    {item}
                                  </code>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-5 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between">
                            <span className="text-[11px] text-[var(--text-muted)]">
                              تبدأ بموضوع: <strong className="text-[var(--text-main)]">{stage.startTopicTitle}</strong>
                            </span>
                            <Link
                              href={`/learn/${stage.startSlug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] hover:underline"
                            >
                              <span>افتح الموضوع</span>
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Footer Navigation CTA */}
        <div className="mt-12 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] mb-2">
            جاهز لبدء رحلتك الهندسية؟
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto mb-6 leading-relaxed">
            لا تحتاج لخبرة سابقة في وكلاء الذكاء الاصطناعي. ابدأ بالموضوع الأول وطبّق خطوة بخطوة مع نموذج مشروعك الخاص.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn/project-idea-mvp"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--action-bg)] text-[var(--action-text)] text-xs sm:text-sm font-black shadow-sm hover:bg-[var(--action-bg-hover)] transition-all cursor-pointer"
            >
              <span>ابدأ الآن بالموضوع الأول (Topic 01)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/#topics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] text-[var(--text-main)] text-xs sm:text-sm font-bold hover:bg-[var(--border-color)] transition-colors cursor-pointer"
            >
              <span>استعرض كافة المواضيع الـ 58</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
