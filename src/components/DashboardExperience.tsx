'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpLeft,
  BookOpen,
  CheckSquare,
  Clock3,
  Download,
  Heart,
  HelpCircle,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { getAllTopics, getTopicBySlug, readSavedBookmarks, readSavedRecentlyViewed, getSavedBookmarksStatus, getSavedRecentlyViewedStatus, subscribeTopicStorage } from '@/src/lib/topicRegistry';
import { getAllTopicLearningContent } from '@/src/lib/learningContent';
import { listLearningRecords, subscribeLearningRecords } from '@/src/lib/learningRecords';
import { getBrowserPromptCustomizationStore, type PromptCustomizationSnapshot } from '@/src/lib/promptCustomization';
import { readDashboardChecklistSnapshot, type DashboardChecklistSnapshot } from '@/src/lib/dashboardRecords';
import { BADGE_AWARD_POLICY_PROPOSAL, BADGE_RULE_PROPOSALS, previewBadgeRules } from '@/src/lib/dashboardModel';
import { getBrowserBadgeAwardStore, type BadgeAwardSnapshot } from '@/src/lib/badgeAwards';
import { createLearningExportArchive, type LearningExportSnapshot } from '@/src/lib/learningExport';
import type { PromptLibraryRecord } from '@/src/lib/promptLibrary';
import { REFERENCE_TEMPLATES } from '@/src/data/reference-templates';
import type { TopicItem } from '@/src/types/topic';
import type { LearningRecordStorageStatus, PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';
import type { TopicStorageStatus } from '@/src/lib/topicStorage';

type DashboardSnapshot = {
  loaded: boolean;
  bookmarks: string[];
  recentlyViewed: string[];
  bookmarkStatus: TopicStorageStatus;
  recentStatus: TopicStorageStatus;
  checklist: DashboardChecklistSnapshot;
  quizAttempts: QuizAttemptRecord[];
  practicalAssessments: PracticalAssessmentRecord[];
  quizStatus: LearningRecordStorageStatus;
  practicalStatus: LearningRecordStorageStatus;
  learningStatus: LearningRecordStorageStatus;
  badgeAwards: BadgeAwardSnapshot;
  customizations: PromptCustomizationSnapshot;
};

const EMPTY_CHECKLIST: DashboardChecklistSnapshot = { entries: [], storageStatus: 'loading', unresolvedHistoricalKeys: [] };
const EMPTY_CUSTOMIZATIONS: PromptCustomizationSnapshot = { records: {}, status: 'loading' };
const EMPTY_BADGE_AWARDS: BadgeAwardSnapshot = { evaluationStatus: 'awaiting-approval', storageStatus: 'loading', rules: [], events: [] };
const EMPTY_DASHBOARD: DashboardSnapshot = {
  loaded: false,
  bookmarks: [],
  recentlyViewed: [],
  bookmarkStatus: 'loading',
  recentStatus: 'loading',
  checklist: EMPTY_CHECKLIST,
  quizAttempts: [],
  practicalAssessments: [],
  quizStatus: 'loading',
  practicalStatus: 'loading',
  learningStatus: 'loading',
  badgeAwards: EMPTY_BADGE_AWARDS,
  customizations: EMPTY_CUSTOMIZATIONS,
};

function storageStatusLabel(status: string) {
  switch (status) {
    case 'available': return 'متاح على هذا الجهاز';
    case 'loading': return 'جارٍ فحص التخزين';
    case 'invalid': return 'بيانات غير صالحة؛ تُركت دون تغيير';
    case 'write-error': return 'توجد تغييرات في الجلسة لم يتأكد حفظها';
    case 'read-error': return 'تعذرت القراءة؛ قد تكون البيانات المعروضة غير كاملة';
    default: return 'حالة التخزين غير معروفة';
  }
}

function badgeRuleTitle(id: string) {
  return BADGE_RULE_PROPOSALS.find((rule) => rule.id === id)?.title ?? 'شارة سابقة';
}

function badgeEventStatusLabel(status: string) {
  switch (status) {
    case 'awarded': return 'ممنوحة';
    case 'revoked': return 'أُلغيت بعد تغير الأدلة';
    case 'retired': return 'أُحيلت إلى سجل الإصدارات السابقة';
    default: return 'حالة غير معروفة';
  }
}

function formatDate(value: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return value;
  return new Intl.DateTimeFormat('ar', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function TopicLink({ topic, prefix = '' }: { topic?: TopicItem; prefix?: string }) {
  if (!topic) return <span className="font-mono text-xs text-[var(--text-muted)]" dir="ltr">{prefix || 'موضوع غير محسوم'}</span>;
  return <Link href={`/learn/${topic.slug}`} className="font-bold text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" dir="auto">{prefix}{topic.title}</Link>;
}

function ActivitySection({ title, icon: Icon, children, description, testId }: { title: string; icon: LucideIcon; children: React.ReactNode; description: string; testId?: string }) {
  return <section data-testid={testId} className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-6">
    <div className="flex items-start gap-3">
      <span className="rounded-xl bg-[var(--bg-card-subtle)] p-2 text-[var(--primary)]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1"><h2 className="text-lg font-black text-[var(--text-main)]">{title}</h2><p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{description}</p></div>
    </div>
    <div className="mt-5">{children}</div>
  </section>;
}

export function DashboardExperience({ prompts }: { prompts: PromptLibraryRecord[] }) {
  const topics = useMemo(() => getAllTopics(), []);
  const topicBySlug = useMemo(() => new Map(topics.map((topic) => [topic.slug, topic])), [topics]);
  const learningContents = useMemo(() => getAllTopicLearningContent(), []);
  const learningContentBySlug = useMemo(() => new Map(learningContents.map((content) => [content.topicSlug, content])), [learningContents]);
  const [snapshot, setSnapshot] = useState(EMPTY_DASHBOARD);
  const [exportState, setExportState] = useState<'idle' | 'working' | 'success' | 'error'>('idle');
  const [exportMessage, setExportMessage] = useState('');

  const collect = useCallback((customizationSnapshot?: PromptCustomizationSnapshot) => {
    const learning = listLearningRecords();
    const recentlyViewed = readSavedRecentlyViewed();
    const badgeAwards = getBrowserBadgeAwardStore().refresh(BADGE_AWARD_POLICY_PROPOSAL, {
      recentlyViewedTopicSlugs: recentlyViewed,
      recentlyViewedStatus: getSavedRecentlyViewedStatus(),
      quizAttempts: learning.quizAttempts,
      practicalAssessments: learning.practicalAssessments,
      quizAttemptsStatus: learning.quizStorageStatus,
      practicalAssessmentsStatus: learning.practicalAssessmentStorageStatus,
      learningRecordsStatus: learning.storageStatus,
    });
    let checklist = EMPTY_CHECKLIST;
    try { checklist = readDashboardChecklistSnapshot(topics); } catch { /* Keep the rest of the dashboard available. */ }
    setSnapshot({
      loaded: true,
      bookmarks: readSavedBookmarks(),
      recentlyViewed,
      bookmarkStatus: getSavedBookmarksStatus(),
      recentStatus: getSavedRecentlyViewedStatus(),
      checklist,
      quizAttempts: learning.quizAttempts,
      practicalAssessments: learning.practicalAssessments,
      quizStatus: learning.quizStorageStatus,
      practicalStatus: learning.practicalAssessmentStorageStatus,
      learningStatus: learning.storageStatus,
      badgeAwards,
      customizations: customizationSnapshot ?? EMPTY_CUSTOMIZATIONS,
    });
  }, [topics]);

  useEffect(() => {
    const customizationStore = getBrowserPromptCustomizationStore();
    customizationStore.refresh();
    const refreshAll = () => collect(customizationStore.getSnapshot());
    refreshAll();
    const unsubscribeTopics = subscribeTopicStorage(refreshAll);
    const unsubscribeLearning = subscribeLearningRecords(refreshAll);
    const unsubscribeCustomizations = customizationStore.subscribe(refreshAll);
    window.addEventListener('storage', refreshAll);
    window.addEventListener('focus', refreshAll);
    window.addEventListener('pageshow', refreshAll);
    window.addEventListener('popstate', refreshAll);
    document.addEventListener('visibilitychange', refreshAll);
    return () => {
      unsubscribeTopics();
      unsubscribeLearning();
      unsubscribeCustomizations();
      window.removeEventListener('storage', refreshAll);
      window.removeEventListener('focus', refreshAll);
      window.removeEventListener('pageshow', refreshAll);
      window.removeEventListener('popstate', refreshAll);
      document.removeEventListener('visibilitychange', refreshAll);
    };
  }, [collect]);

  const validRecent = snapshot.recentlyViewed.map((slug) => topicBySlug.get(slug)).filter((topic): topic is TopicItem => Boolean(topic));
  const unresolvedRecent = snapshot.recentlyViewed.filter((slug) => !topicBySlug.has(slug));
  const validBookmarks = snapshot.bookmarks.map((slug) => topicBySlug.get(slug)).filter((topic): topic is TopicItem => Boolean(topic));
  const unresolvedBookmarks = snapshot.bookmarks.filter((slug) => !topicBySlug.has(slug));
  const sortedAttempts = [...snapshot.quizAttempts].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  const sortedAssessments = [...snapshot.practicalAssessments].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const draftBadges = previewBadgeRules({
    recentlyViewedTopicSlugs: validRecent.map((topic) => topic.slug),
    quizAttempts: snapshot.quizAttempts.filter((attempt) => attempt.selfCheck),
    practicalAssessments: snapshot.practicalAssessments.filter((record) => record.selfAssessment),
    recentlyViewedStatus: snapshot.recentStatus,
    quizAttemptsStatus: snapshot.quizStatus,
    practicalAssessmentsStatus: snapshot.practicalStatus,
  });

  const persistSnapshot = useCallback((generatedAt: string): LearningExportSnapshot => ({
    schemaVersion: 1,
    generatedAt,
    scope: 'this-browser-and-device',
    storageStatus: {
      bookmarks: snapshot.bookmarkStatus,
      recentlyViewed: snapshot.recentStatus,
      checklists: snapshot.checklist.storageStatus,
      learningRecords: snapshot.learningStatus,
      quizAttempts: snapshot.quizStatus,
      practicalAssessments: snapshot.practicalStatus,
      badgeAwards: snapshot.badgeAwards.storageStatus,
      promptCustomizations: snapshot.customizations.status,
    },
    bookmarks: snapshot.bookmarks,
    recentlyViewed: snapshot.recentlyViewed,
    unresolvedBookmarks,
    unresolvedRecentlyViewed: unresolvedRecent,
    checklistActivity: snapshot.checklist,
    quizAttempts: snapshot.quizAttempts,
    practicalAssessments: snapshot.practicalAssessments,
    badgeAwardEvents: snapshot.badgeAwards.events,
    promptCustomizations: snapshot.customizations.records,
  }), [snapshot, unresolvedBookmarks, unresolvedRecent]);

  const downloadExport = () => {
    setExportState('working');
    setExportMessage('');
    try {
      const generatedAt = new Date().toISOString();
      const customizationStore = getBrowserPromptCustomizationStore();
      const latestCustomizations = customizationStore.refresh();
      const learning = listLearningRecords();
      const recentlyViewed = readSavedRecentlyViewed();
      const latestBookmarks = readSavedBookmarks();
      let latestChecklist = EMPTY_CHECKLIST;
      try { latestChecklist = readDashboardChecklistSnapshot(topics); } catch { /* Keep export available */ }
      const latestBadgeAwards = getBrowserBadgeAwardStore().refresh(BADGE_AWARD_POLICY_PROPOSAL, {
        recentlyViewedTopicSlugs: recentlyViewed,
        recentlyViewedStatus: getSavedRecentlyViewedStatus(),
        quizAttempts: learning.quizAttempts,
        practicalAssessments: learning.practicalAssessments,
        quizAttemptsStatus: learning.quizStorageStatus,
        practicalAssessmentsStatus: learning.practicalAssessmentStorageStatus,
        learningRecordsStatus: learning.storageStatus,
      });

      const currentExportSnapshot: LearningExportSnapshot = {
        schemaVersion: 1,
        generatedAt,
        scope: 'this-browser-and-device',
        storageStatus: {
          bookmarks: getSavedBookmarksStatus(),
          recentlyViewed: getSavedRecentlyViewedStatus(),
          checklists: latestChecklist.storageStatus,
          learningRecords: learning.storageStatus,
          quizAttempts: learning.quizStorageStatus,
          practicalAssessments: learning.practicalAssessmentStorageStatus,
          badgeAwards: latestBadgeAwards.storageStatus,
          promptCustomizations: latestCustomizations.status,
        },
        bookmarks: latestBookmarks,
        recentlyViewed,
        unresolvedBookmarks: latestBookmarks.filter((slug) => !topicBySlug.has(slug)),
        unresolvedRecentlyViewed: recentlyViewed.filter((slug) => !topicBySlug.has(slug)),
        checklistActivity: latestChecklist,
        quizAttempts: learning.quizAttempts,
        practicalAssessments: learning.practicalAssessments,
        badgeAwardEvents: latestBadgeAwards.events,
        promptCustomizations: latestCustomizations.records,
      };

      const archive = createLearningExportArchive(
        currentExportSnapshot,
        topics,
        learningContents,
        prompts,
        REFERENCE_TEMPLATES,
      );
      const blob = new Blob([archive.buffer as ArrayBuffer], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const datePart = generatedAt.slice(0, 10).replace(/-/g, '');
      link.href = url;
      link.download = `ai-agents-learning-${datePart}.zip`;
      link.style.display = 'none';
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 3000);
      setExportState('success');
      setExportMessage(Object.values(currentExportSnapshot.storageStatus).some((status) => status !== 'available')
        ? 'بدأ تنزيل الحزمة. تتضمن ملف السجلات حالة التخزين، وقد تكون بعض البيانات غير متاحة.'
        : 'بدأ تنزيل ملف ZIP؛ افتح README.md وقائمة توفر الموارد داخل الحزمة.');
    } catch {
      setExportState('error');
      setExportMessage('تعذر إنشاء الحزمة أو بدء تنزيلها. لم يتم تأكيد نجاح التصدير.');
    }
  };

  const savedActivityExists = validRecent.length > 0 || validBookmarks.length > 0 || snapshot.checklist.entries.length > 0
    || snapshot.quizAttempts.length > 0 || snapshot.practicalAssessments.length > 0 || Object.keys(snapshot.customizations.records).length > 0;
  const statusEntries = [
    ['المفضلة', snapshot.bookmarkStatus],
    ['المواضيع التي زرتها مؤخرًا', snapshot.recentStatus],
    ['قوائم التحقق', snapshot.checklist.storageStatus],
    ['نتائج الاختبارات', snapshot.quizStatus],
    ['التقييمات العملية', snapshot.practicalStatus],
    ['سجلات الشارات', snapshot.badgeAwards.storageStatus],
    ['تخصيصات البرومبتات', snapshot.customizations.status],
  ] as const;
  const anyStorageIssue = statusEntries.some(([, status]) => status !== 'available');

  return <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
    <header className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-card-subtle)] px-3 py-1 text-xs font-bold text-[var(--primary)]"><BookOpen className="h-4 w-4" aria-hidden="true" /> سجلات هذا المتصفح فقط</p>
          <h1 className="mt-4 text-3xl font-black text-[var(--text-main)] sm:text-5xl">لوحة تعلّمي</h1>
          <p className="mt-4 text-sm leading-8 text-[var(--text-muted)] sm:text-base">تعرض هذه الصفحة زيارات المواضيع ونتائج الاختبارات والتقييمات الذاتية والمفضلة كأنواع مستقلة من النشاط وفق قرار صاحب المقرر المعتمد (2026-10-20). لا تقيس إتقانًا ولا تقييمًا مستقلًا للمشروع، ولا تنتقل سجلاتها إلى جهاز آخر.</p>
        </div>
        <button data-testid="learning-export" type="button" onClick={downloadExport} disabled={!snapshot.loaded || exportState === 'working'} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--action-bg)] px-5 py-3 text-sm font-black text-[var(--action-text)] hover:bg-[var(--action-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] disabled:cursor-wait disabled:opacity-60"><Download className="h-4 w-4" aria-hidden="true" />{exportState === 'working' ? 'جارٍ تجهيز التنزيل…' : 'تنزيل حزمة التعلّم'}</button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 min-h-6 text-sm leading-6 ${exportState === 'error' ? 'text-red-700 dark:text-red-300' : 'text-[var(--text-muted)]'}`}>{exportMessage}</p>
      {snapshot.loaded && anyStorageIssue && <div role="status" className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"><p className="font-bold">قد لا تعرض هذه اللوحة كل السجلات المحلية.</p><p>حالة التخزين موضحة لكل نوع أدناه. عند تعذر القراءة أو الحفظ، لا يعني الفراغ أن السجلات السابقة غير موجودة.</p></div>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6" aria-label="ملخص محلي للأنشطة المسجلة">
        {[
          ['زيارات حديثة', snapshot.recentlyViewed.length, snapshot.recentStatus, 'metric-recent-views'],
          ['مفضلة', snapshot.bookmarks.length, snapshot.bookmarkStatus, 'metric-bookmarks'],
          ['محاولات اختبار', snapshot.quizAttempts.length, snapshot.quizStatus, 'metric-quizzes'],
          ['تقييمات عملية', snapshot.practicalAssessments.length, snapshot.practicalStatus, 'metric-assessments'],
          ['قوائم تحقق', snapshot.checklist.entries.length, snapshot.checklist.storageStatus, 'metric-checklists'],
          ['تخصيصات برومبت', Object.keys(snapshot.customizations.records).length, snapshot.customizations.status, 'metric-prompts'],
        ].map(([label, value, status, testId]) => <div key={label} data-testid={testId} className="rounded-2xl bg-[var(--bg-card-subtle)] p-4"><span className="block text-xs text-[var(--text-muted)]">{label}</span><strong className="mt-1 block text-2xl font-black text-[var(--text-main)]">{snapshot.loaded && status === 'available' ? value : '—'}</strong><span className="mt-1 block text-[10px] text-[var(--text-faint)]">{status === 'available' ? 'محلي فقط' : 'العدد غير مؤكد'}</span></div>)}
      </div>
    </header>

    {snapshot.loaded && !savedActivityExists && !anyStorageIssue && <div data-testid="empty-dashboard-notice" className="mt-6 rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] p-7 text-center">
      <BookOpen className="mx-auto h-8 w-8 text-[var(--primary)]" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-black">لا توجد أنشطة مسجلة بعد</h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">افتح موضوعًا لتسجيل زيارة، واحفظ المفضلة أو أجب عن اختبار أو استخدم قائمة التحقق. ستظهر هنا السجلات التي تسجلها فقط؛ لا تُنشأ سجلات للموضوعات التي لم تفتحها.</p>
      <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--action-bg)] px-4 py-2.5 text-sm font-bold text-[var(--action-text)] hover:bg-[var(--action-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">استعراض الموضوعات <ArrowUpLeft className="h-4 w-4" aria-hidden="true" /></Link>
    </div>}

    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      <ActivitySection testId="section-recent-views" title="زيارات المواضيع الأخيرة" icon={Clock3} description="وفق قرار صاحب المقرر، فتح الموضوع يسجل زيارة حديثة فقط ولا يسجل إكماله. يعرض هذا السجل آخر خمسة موضوعات فقط دون تاريخ أو مدة قراءة أو مؤشر إنجاز.">
        {validRecent.length ? <ol className="space-y-2">{validRecent.map((topic, index) => <li key={`${topic.slug}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-[var(--bg-card-subtle)] p-3"><span className="text-xs text-[var(--text-muted)]">{index + 1}</span><TopicLink topic={topic} /><span className="text-xs text-[var(--text-faint)]">زيارة محفوظة</span></li>)}</ol> : <p className="rounded-xl bg-[var(--bg-card-subtle)] p-4 text-sm leading-6 text-[var(--text-muted)]">{snapshot.recentStatus === 'available' ? 'لا توجد زيارات حديثة محفوظة.' : 'تعذرت قراءة قائمة الزيارات كاملة؛ لا يمكن تأكيد عدم وجود سجل.'}</p>}
        <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">حالة السجل: {storageStatusLabel(snapshot.recentStatus)}.</p>
        {unresolvedRecent.length > 0 && <div className="mt-3 rounded-xl border border-amber-300 p-3 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:text-amber-200"><strong>معرّفات تاريخية لم تُحل:</strong> {unresolvedRecent.join('، ')}. حُفظت كما هي ولم تُنسب إلى موضوع مختلف.</div>}
      </ActivitySection>

      <ActivitySection testId="section-bookmarks" title="المفضلة" icon={Heart} description="الموضوعات التي وضعتها في المفضلة، مستقلة عن الزيارات والاختبارات والتقييم العملي.">
        {validBookmarks.length ? <ul className="space-y-2">{validBookmarks.map((topic) => <li key={topic.slug} className="flex items-center gap-2 rounded-xl bg-[var(--bg-card-subtle)] p-3"><Heart className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" /><TopicLink topic={topic} /></li>)}</ul> : <p className="rounded-xl bg-[var(--bg-card-subtle)] p-4 text-sm leading-6 text-[var(--text-muted)]">{snapshot.bookmarkStatus === 'available' ? 'لا توجد موضوعات مفضلة محفوظة.' : 'تعذرت قراءة قائمة المفضلة كاملة؛ لا يمكن تأكيد عدم وجود سجل.'}</p>}
        <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">حالة السجل: {storageStatusLabel(snapshot.bookmarkStatus)}.</p>
        {unresolvedBookmarks.length > 0 && <div className="mt-3 rounded-xl border border-amber-300 p-3 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:text-amber-200"><strong>معرّفات تاريخية لم تُحل:</strong> {unresolvedBookmarks.join('، ')}.</div>}
      </ActivitySection>

      <ActivitySection testId="section-quizzes" title="نتائج الاختبارات" icon={HelpCircle} description="محاولات منفصلة بإصدارات الأسئلة والنتائج المسجلة. الدرجة وصف لسياسة التصحيح المعتمدة، وليست إثباتًا للإتقان أو التحقق المستقل.">
        {sortedAttempts.length ? <ol className="space-y-3">{sortedAttempts.map((attempt) => {
          const topic = topicBySlug.get(attempt.topicSlug);
          const currentQuiz = learningContentBySlug.get(attempt.topicSlug)?.quiz;
          const currentQuestionVersions = currentQuiz
            ? new Map(currentQuiz.questions.map((question) => [question.id, question.version]))
            : null;
          const quizMatchesCurrent = Boolean(currentQuiz && currentQuestionVersions
            && currentQuiz.id === attempt.quizId
            && currentQuiz.version === attempt.quizVersion
            && currentQuiz.scoringPolicy.id === attempt.policyId
            && currentQuiz.scoringPolicy.version === attempt.policyVersion
            && attempt.answers.length === currentQuiz.questions.length
            && attempt.answers.every((answer) => currentQuestionVersions.get(answer.questionId) === answer.questionVersion));
          const quizTitle = quizMatchesCurrent ? currentQuiz!.title : `اختبار محفوظ لإصدار سابق (${attempt.quizId})`;
          return <li key={`${attempt.topicSlug}-${attempt.quizId}-${attempt.attemptId}`} data-testid="quiz-attempt-row" className="rounded-2xl bg-[var(--bg-card-subtle)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-2"><div><TopicLink topic={topic} prefix={topic ? '' : attempt.topicSlug} /><p className="mt-1 text-xs text-[var(--text-muted)]">{quizTitle} · نسخة الاختبار {attempt.quizVersion}</p></div><strong className="text-lg font-black" dir="ltr">{attempt.score} / {attempt.maxScore}</strong></div>
            <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">صحيح: {attempt.correctCount} · غير صحيح: {attempt.incorrectCount} · بلا إجابة: {attempt.unansweredCount} · {formatDate(attempt.submittedAt)}</p>
            <p className="mt-2 rounded-lg border border-[var(--border-color)] px-3 py-2 text-xs leading-6">{attempt.previewOnly ? 'نتيجة معاينة لفحصك الذاتي وفق سياسة التصحيح المعتمدة، وبانتظار المراجعة التعليمية للموضوع.' : 'نتيجة فحص ذاتي معتمدة ومحفوظة.'} لا تعني هذه النتيجة إكمال العمل العملي أو إتقانه، والتقييم الذاتي هو تقدير المتعلم الخاص وليس تحققًا مستقلًا؛ لا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق.</p>
          </li>;
        })}</ol> : <p className="rounded-xl bg-[var(--bg-card-subtle)] p-4 text-sm leading-6 text-[var(--text-muted)]">{snapshot.quizStatus === 'available' ? 'لا توجد محاولات اختبار مسجلة.' : 'تعذرت قراءة نتائج الاختبارات كاملة؛ لا يمكن تأكيد عدم وجود سجل.'}</p>}
        <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">حالة التخزين: {storageStatusLabel(snapshot.quizStatus)}.</p>
      </ActivitySection>

      <ActivitySection testId="section-checklists" title="قوائم التحقق العملية" icon={CheckSquare} description="هذه اختيارات ذاتية محفوظة. عرض الاختيار لا يعني أن المخرج تحقق أو أنه مكتمل.">
        {snapshot.checklist.entries.length ? <ul className="space-y-3">{snapshot.checklist.entries.map((entry, index) => <li key={`${entry.kind}-${entry.topicSlug}-${index}`} className="rounded-2xl bg-[var(--bg-card-subtle)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2"><TopicLink topic={topicBySlug.get(entry.topicSlug)} prefix={topicBySlug.has(entry.topicSlug) ? '' : entry.topicSlug} /><span className="rounded-full border border-[var(--border-color)] px-2 py-1 text-[10px] text-[var(--text-muted)]">{entry.kind === 'application-checklist' ? 'قائمة الموضوع الحالية' : 'قائمة محفوظة قديمة'}</span></div>
          {entry.kind === 'application-checklist' ? <ul className="mt-3 space-y-1 text-sm leading-6">{entry.selectedItems.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true">✓</span><span>{item}</span></li>)}</ul> : <ul className="mt-3 space-y-1 text-sm leading-6">{entry.historicalStates?.map((item) => <li key={item.item} className="flex gap-2"><span aria-hidden="true">{item.selected ? '✓' : '○'}</span><span>{item.item}</span></li>)}</ul>}
          {entry.sessionOnlyChanges?.length ? <p className="mt-2 rounded-lg border border-amber-300 bg-amber-50 p-2 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">تغييرات جلسة غير مؤكدة الحفظ: {entry.sessionOnlyChanges.map(({ item, checked }) => `${checked ? 'تحديد' : 'إلغاء التحديد'} — ${item}`).join('؛ ')}</p> : null}
          <p className="mt-2 text-xs text-[var(--text-muted)]">{entry.kind === 'application-checklist' ? `${entry.selectedItems.length} اختيار ذاتي ظاهر` : 'حالة العناصر القديمة كما خُزنت؛ لا يوجد تاريخ زمني.'} · {storageStatusLabel(entry.storageStatus)}{entry.sessionOnly ? ' · توجد تغييرات في الذاكرة فقط' : ''}</p>
        </li>)}</ul> : <p className="rounded-xl bg-[var(--bg-card-subtle)] p-4 text-sm leading-6 text-[var(--text-muted)]">{snapshot.checklist.storageStatus === 'available' ? 'لا توجد اختيارات قائمة تحقق مسجلة.' : 'تعذرت قراءة بيانات القوائم كاملة؛ لا يمكن تأكيد عدم وجود سجل.'}</p>}
        {snapshot.checklist.unresolvedHistoricalKeys.length > 0 && <div className="mt-3 rounded-xl border border-amber-300 p-3 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:text-amber-200"><strong>مفاتيح قديمة غير محسومة:</strong> {snapshot.checklist.unresolvedHistoricalKeys.length} عنصرًا. حُفظت دون إسنادها إلى موضوع.</div>}
        <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">حالة التخزين: {storageStatusLabel(snapshot.checklist.storageStatus)}.</p>
      </ActivitySection>

      <ActivitySection testId="section-assessments" title="التقييم العملي الذاتي" icon={ShieldCheck} description="يعرض أحكامك الحالية على المعايير وفق سلم التقييم المعتمد مع تواريخها وإصداراتها. التقييم الذاتي هو تقدير المتعلم الخاص وليس تقييمًا مستقلاً؛ لا يقيّم التطبيق مشروعك بصورة مستقلة، ولا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق.">
        {sortedAssessments.length ? <ol className="space-y-3">{sortedAssessments.map((record) => {
          const topic = topicBySlug.get(record.topicSlug);
          const content = learningContentBySlug.get(record.topicSlug);
          const currentAssessment = content?.practicalAssessment;
          const assessmentMatchesCurrent = Boolean(currentAssessment && record.assessmentId === currentAssessment.id
            && record.assessmentVersion === currentAssessment.version && record.scaleId === currentAssessment.scale.id
            && record.scaleVersion === currentAssessment.scale.version);
          const criteriaMatchCurrent = new Map(assessmentMatchesCurrent
            ? currentAssessment!.criteria.map((criterion) => [`${criterion.id}:${criterion.version}`, criterion.name])
            : []);
          const assessmentTitle = assessmentMatchesCurrent ? currentAssessment!.title : 'تقييم محفوظ لإصدار سابق';
          const ratingLabel = (rating: PracticalAssessmentRecord['ratings'][number]) => assessmentMatchesCurrent && currentAssessment
            && rating.scaleId === currentAssessment.scale.id && rating.scaleVersion === currentAssessment.scale.version
            ? currentAssessment.scale.levels.find((level) => level.id === rating.ratingId)?.label ?? 'حكم محفوظ'
            : 'حكم محفوظ لإصدار سابق';
          return <li key={`${record.topicSlug}-${record.assessmentId}`} data-testid="practical-assessment-row" className="rounded-2xl bg-[var(--bg-card-subtle)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-2"><div><TopicLink topic={topic} prefix={topic ? '' : record.topicSlug} /><p className="mt-1 text-xs text-[var(--text-muted)]">{assessmentTitle}{assessmentMatchesCurrent ? null : <> · <span dir="ltr">{record.assessmentId}</span></>} · نسخة التقييم {record.assessmentVersion} · نسخة سلم التقدير {record.scaleVersion}</p></div><span className="text-xs text-[var(--text-muted)]">{formatDate(record.updatedAt)}</span></div>
            {record.ratings.length ? <ul className="mt-3 space-y-2">{record.ratings.map((rating) => <li key={`${rating.criterionId}-${rating.criterionVersion}-${rating.scaleId}-${rating.scaleVersion}`} className="rounded-lg border border-[var(--border-color)] p-3"><strong className="text-sm">{criteriaMatchCurrent.get(`${rating.criterionId}:${rating.criterionVersion}`) ?? 'معيار محفوظ لإصدار سابق'}</strong><span className="ms-2 text-xs text-[var(--text-muted)]">{ratingLabel(rating)}</span><p className="mt-1 text-[10px] text-[var(--text-faint)]">إصدار المعيار {rating.criterionVersion} · إصدار سلم التقدير {rating.scaleVersion} · {formatDate(rating.ratedAt)}</p></li>)}</ul> : <p className="mt-3 text-sm text-[var(--text-muted)]">لا توجد أحكام حالية على المعايير.</p>}
            {record.history.length > 0 && <details className="mt-3 rounded-lg border border-[var(--border-color)] p-3"><summary className="cursor-pointer text-xs font-bold">أحكام محفوظة لإصدارات أقدم ({record.history.length})</summary><ul className="mt-2 space-y-1 text-xs">{record.history.map((rating, index) => {
              const sourceAssessmentId = 'assessmentId' in rating && typeof rating.assessmentId === 'string' ? rating.assessmentId : null;
              const sourceAssessmentVersion = 'assessmentVersion' in rating && typeof rating.assessmentVersion === 'number' ? rating.assessmentVersion : null;
              return <li key={`${rating.criterionId}-${rating.criterionVersion}-${rating.scaleId}-${rating.scaleVersion}-${index}`}>معيار محفوظ · <span dir="ltr">{rating.criterionId}</span> · حكم <span dir="ltr">{rating.ratingId}</span> · سلم <span dir="ltr">{rating.scaleId}</span> v{rating.scaleVersion} · إصدار المعيار {rating.criterionVersion}{sourceAssessmentId ? <> · تقييم <span dir="ltr">{sourceAssessmentId}</span>{sourceAssessmentVersion !== null ? ` v${sourceAssessmentVersion}` : ''}</> : null} · {formatDate(rating.ratedAt)}</li>;
            })}</ul></details>}
            <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">{record.previewOnly ? 'تقييم ذاتي محفوظ كمعاينة وفق سلم التقييم المعتمد؛ التقييم الذاتي هو تقدير المتعلم الخاص وليس تحققًا مستقلًا، ولا يثبت إتقانًا أو إكمالاً.' : 'تقييم ذاتي كما سُجل، وهو تقدير المتعلم الخاص وليس تحققًا مستقلًا؛ لا يثبت صحة العمل أو إتقانه.'}</p>
          </li>;
        })}</ol> : <p className="rounded-xl bg-[var(--bg-card-subtle)] p-4 text-sm leading-6 text-[var(--text-muted)]">{snapshot.practicalStatus === 'available' ? 'لا توجد تقييمات ذاتية مسجلة.' : 'تعذرت قراءة التقييمات العملية كاملة؛ لا يمكن تأكيد عدم وجود سجل.'}</p>}
        <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">حالة التخزين: {storageStatusLabel(snapshot.practicalStatus)}.</p>
      </ActivitySection>

      <ActivitySection testId="section-badges" title={snapshot.badgeAwards.evaluationStatus === 'enabled' ? 'حالة الشارات المعتمدة' : 'معاينة قواعد الشارات المقترحة'} icon={Sparkles} description={snapshot.badgeAwards.evaluationStatus === 'enabled' ? 'تُحسب الحالة من دليل محلي مؤهل، ويُحفظ سجل إصدار الشارة وإبطالها على هذا الجهاز.' : 'هذه قواعد مرشحة للمراجعة فقط. حالة المعاينة تُعاد حسابها من السجلات الحالية؛ لا توجد شارات ممنوحة قبل موافقة صاحب المقرر.'}>
        {snapshot.badgeAwards.evaluationStatus === 'enabled' ? <>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-3 text-xs leading-6 text-[var(--text-muted)]">التقييم مفعّل بقرار موثق؛ لا تدخل نتائج المعاينة ضمن أدلة الشارات.</div>
          <ul className="mt-3 space-y-3">{snapshot.badgeAwards.rules.map((result) => <li key={result.rule.id} className="rounded-2xl bg-[var(--bg-card-subtle)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><strong>{result.rule.title}</strong><span className="rounded-full border border-[var(--border-color)] px-2 py-1 text-[10px]">{result.state === 'awarded' ? 'ممنوحة' : result.state === 'unconfirmed' ? 'غير مؤكدة حاليًا' : 'لم تُمنح'} · v{result.rule.version}</span></div>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{result.explanation}</p>
            {result.activeAward && <p className="mt-1 text-xs text-[var(--text-muted)]">تاريخ التسجيل: {formatDate(result.activeAward.awardedAt)} · {result.activeAward.evidenceKeys.length} أدلة.</p>}
          </li>)}</ul>
          {snapshot.badgeAwards.events.some((event) => event.status !== 'awarded') && <details className="mt-3 rounded-xl border border-[var(--border-color)] p-3"><summary className="cursor-pointer text-xs font-bold">سجل تغييرات الشارات السابقة</summary><ul className="mt-2 space-y-1 text-xs">{snapshot.badgeAwards.events.filter((event) => event.status !== 'awarded').map((event) => <li key={event.awardId}>{badgeRuleTitle(event.badgeId)} · {badgeEventStatusLabel(event.status)} · إصدار القاعدة {event.ruleVersion} · {event.endedAt ? formatDate(event.endedAt) : ''}</li>)}</ul></details>}
        </> : <>
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">لا تثبت معاينة قواعد الشارات إتقانًا أو اعتمادًا. نتائج الفحص الذاتي التجريبية ليست دليلًا مؤهلًا لأي شارة مستقبلية، ولم تُعتمد سياسة ترحيلها.</div>
          <ul className="mt-3 space-y-3">{draftBadges.map((preview) => <li key={preview.rule.id} className="rounded-2xl bg-[var(--bg-card-subtle)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><strong>{preview.rule.title}</strong><span className="rounded-full border border-[var(--border-color)] px-2 py-1 text-[10px]">مسودة {preview.rule.version}</span></div>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{preview.rule.explanation}</p>
            <p className="mt-2 text-xs leading-6"><strong>المعاينة الحالية:</strong> {preview.evidenceConfirmed ? `${preview.observedCount} / ${preview.rule.threshold}` : 'غير مؤكدة'} · {preview.resultLabel}</p>
            {preview.evidenceConfirmed && <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">سجلات فحص ذاتي محفوظة خارج المعاينة: {preview.nonPreviewEvidenceCount}. لا تمنح هذه الصفحة شارات اعتمادًا على أي من العدّين.</p>}
          </li>)}</ul>
          <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">تغيير الأدلة يغيّر نتيجة المعاينة مباشرة. لا يجري حفظ حالة شارة ثابتة أو إصدار جوائز. قواعد الإصدار والتغييرات تحتاج قرارًا موثقًا.</p>
        </>}
        {snapshot.badgeAwards.storageStatus !== 'available' && <p className="mt-3 rounded-xl border border-amber-300 p-3 text-xs leading-6 text-amber-900 dark:border-amber-800 dark:text-amber-200">حالة سجل الشارات: {storageStatusLabel(snapshot.badgeAwards.storageStatus)}.</p>}
      </ActivitySection>
    </div>

    <section data-testid="section-storage-status" className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6">
      <h2 className="text-lg font-black">حالة السجلات المحلية</h2>
      <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">المصدر هو التخزين المحلي في المتصفح الحالي. عند تعذر القراءة، تُعرض لقطة الجلسة المتاحة مع توضيح أنها قد تكون ناقصة.</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{statusEntries.map(([label, status]) => <li key={label} className="rounded-xl bg-[var(--bg-card-subtle)] p-3"><span className="block text-xs text-[var(--text-muted)]">{label}</span><strong className="mt-1 block text-xs">{storageStatusLabel(status)}</strong></li>)}</ul>
      <p className="mt-4 rounded-xl border border-[var(--border-color)] p-3 text-sm leading-6">مؤشر الإكمال العام غير معروض؛ بقرار صاحب المقرر المعتمد (2026-10-20)، لا يتضمن التطبيق مؤشر إكمال عام أو إشارة إكمال قراءة: فتح الموضوع يسجل زيارة حديثة فقط ولا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق. تُحسب وتُعرض كل فئة نشاط كسجل محلي مستقل دون دمجها في مقياس موحد.</p>
      <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">لا تعرض اللوحة إحصاءات منصة أو نتائج متعلمين آخرين أو مزامنة بين الأجهزة. <Link href="/prompts" className="font-bold text-[var(--primary)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">انتقل إلى مكتبة البرومبتات لتعديل نص واستخدامه</Link>.</p>
    </section>

    <div className="sr-only" aria-live="polite">{snapshot.loaded ? `تم تحميل سجلات محلية: ${snapshot.quizAttempts.length} محاولة اختبار و${snapshot.practicalAssessments.length} تقييم ذاتي.` : 'جارٍ تحميل السجلات المحلية.'}</div>
  </div>;
}
