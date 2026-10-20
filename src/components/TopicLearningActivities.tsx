'use client';

import React from 'react';
import { ExternalVideoResource } from '@/src/components/ExternalVideoResource';
import {
  getPracticalAssessment,
  getQuizAttempts,
  savePracticalAssessment,
  saveQuizAttempt,
  subscribeLearningRecords,
} from '@/src/lib/learningRecords';
import { isLearningPolicyEnabled } from '@/src/lib/learningPolicy';
import type { PracticalAssessmentRecord, QuizAttemptRecord, TopicLearningContent } from '@/src/types/learning';
import type { TopicItem } from '@/src/types/topic';

const statusMessages = {
  'read-error': 'تعذرت قراءة السجل المحفوظ. ما زالت اختياراتك الحالية متاحة خلال هذه الجلسة، وقد تفقدها عند إعادة تحميل الصفحة.',
  'write-error': 'تعذر حفظ السجل على هذا الجهاز. ما زالت اختياراتك الحالية متاحة خلال هذه الجلسة، وقد تفقدها عند إعادة تحميل الصفحة.',
  invalid: 'بيانات التقييم المحفوظة غير صالحة؛ تُركت دون تغيير. يمكنك متابعة التجربة، لكن قد لا تُحفظ اختياراتك.',
};

function newAttemptId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatTimestamp(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
}

function currentRubricRatings(record: PracticalAssessmentRecord | null, content: TopicLearningContent) {
  if (!record || record.assessmentId !== content.practicalAssessment.id
    || record.scaleId !== content.practicalAssessment.scale.id
    || record.scaleVersion !== content.practicalAssessment.scale.version) return {};
  const criteria = new Map(content.practicalAssessment.criteria.map((criterion) => [criterion.id, criterion.version]));
  return Object.fromEntries(record.ratings
    .filter((rating) => criteria.get(rating.criterionId) === rating.criterionVersion)
    .map((rating) => [rating.criterionId, rating.ratingId]));
}

function oldRubricRatings(record: PracticalAssessmentRecord | null, content: TopicLearningContent) {
  if (!record) return [];
  const criteria = new Map(content.practicalAssessment.criteria.map((criterion) => [criterion.id, criterion.version]));
  return [
    ...record.history,
    ...record.ratings.filter((rating) => record.assessmentId !== content.practicalAssessment.id
      || record.scaleId !== content.practicalAssessment.scale.id
      || record.scaleVersion !== content.practicalAssessment.scale.version
      || criteria.get(rating.criterionId) !== rating.criterionVersion),
  ];
}

export function TopicLearningActivities({ topic, content: authoredContent }: { topic: TopicItem; content: TopicLearningContent }) {
  // E2E-only injection point that affects only what this browser renders
  // (it never changes the server-rendered content, a saved record, or an award).
  const content = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const e2eOverride = (window as unknown as { __AI_AGENTS_E2E_TOPIC_CONTENT__?: unknown }).__AI_AGENTS_E2E_TOPIC_CONTENT__;
      if (e2eOverride && typeof e2eOverride === 'object' && !Array.isArray(e2eOverride) && Object.prototype.toString.call(e2eOverride) === '[object Object]') {
        const topicOverride = (e2eOverride as Record<string, TopicLearningContent>)[topic.slug];
        if (topicOverride && typeof topicOverride === 'object') {
          return topicOverride;
        }
      }
    }
    return authoredContent;
  }, [topic.slug, authoredContent]);

  const [ready, setReady] = React.useState(false);
  const [quizAttempts, setQuizAttempts] = React.useState<QuizAttemptRecord[]>([]);
  const [quizStorageStatus, setQuizStorageStatus] = React.useState<'loading' | 'available' | 'read-error' | 'write-error' | 'invalid'>('loading');
  const [practicalRecord, setPracticalRecord] = React.useState<PracticalAssessmentRecord | null>(null);
  const [practicalStorageStatus, setPracticalStorageStatus] = React.useState<'loading' | 'available' | 'read-error' | 'write-error' | 'invalid'>('loading');
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submittedAttemptId, setSubmittedAttemptId] = React.useState<string | null>(null);
  const [showSavedFeedback, setShowSavedFeedback] = React.useState(true);
  const [ratings, setRatings] = React.useState<Record<string, string>>({});
  const instanceId = React.useId().replace(/:/gu, '');

  const refreshQuiz = React.useCallback(() => {
    const snapshot = getQuizAttempts(topic.slug);
    setQuizAttempts(snapshot.attempts);
    setQuizStorageStatus(snapshot.storageStatus);
  }, [topic.slug, content.quiz.id]);

  const refreshPractical = React.useCallback(() => {
    const snapshot = getPracticalAssessment(topic.slug);
    setPracticalRecord(snapshot.record);
    setRatings(currentRubricRatings(snapshot.record, content));
    setPracticalStorageStatus(snapshot.storageStatus);
  }, [topic.slug, content]);

  React.useEffect(() => {
    setReady(true);
    refreshQuiz();
    refreshPractical();
    return subscribeLearningRecords(() => {
      refreshQuiz();
      refreshPractical();
    });
  }, [refreshQuiz, refreshPractical]);

  React.useEffect(() => {
    setAnswers({});
    setSubmittedAttemptId(null);
    setShowSavedFeedback(true);
  }, [topic.slug, content.quiz.id, content.quiz.version]);

  const quizPolicyEnabled = isLearningPolicyEnabled(content.reviewState, content.quiz.scoringPolicy.approval, [
    { area: 'lesson', evidence: content.reviewEvidence },
    { area: 'question', evidence: content.quiz.reviewEvidence },
    ...content.quiz.questions.map((question) => ({ area: 'question' as const, evidence: question.reviewEvidence })),
  ]);
  const rubricPolicyEnabled = isLearningPolicyEnabled(content.reviewState, content.practicalAssessment.scale.approval, [
    { area: 'lesson', evidence: content.reviewEvidence },
    { area: 'rubric', evidence: content.practicalAssessment.reviewEvidence },
    ...content.practicalAssessment.criteria.map((criterion) => ({ area: 'rubric' as const, evidence: criterion.reviewEvidence })),
  ]);

  function submitQuiz(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || content.quiz.questions.length === 0) return;
    const attemptAnswers = content.quiz.questions.map((question) => {
      const selectedOptionId = answers[question.id] ?? null;
      const correctness = selectedOptionId === null
        ? 'unanswered'
        : selectedOptionId === question.correctOptionId ? 'correct' : 'incorrect';
      return { questionId: question.id, questionVersion: question.version, selectedOptionId, correctness } as const;
    });
    const correctCount = attemptAnswers.filter((answer) => answer.correctness === 'correct').length;
    const incorrectCount = attemptAnswers.filter((answer) => answer.correctness === 'incorrect').length;
    const unansweredCount = attemptAnswers.filter((answer) => answer.correctness === 'unanswered').length;
    const attempt: QuizAttemptRecord = {
      attemptId: newAttemptId(),
      topicSlug: topic.slug,
      quizId: content.quiz.id,
      quizVersion: content.quiz.version,
      policyId: content.quiz.scoringPolicy.id,
      policyVersion: content.quiz.scoringPolicy.version,
      answers: attemptAnswers,
      correctCount,
      incorrectCount,
      unansweredCount,
      score: correctCount,
      maxScore: content.quiz.questions.length,
      submittedAt: new Date().toISOString(),
      selfCheck: true,
      previewOnly: !quizPolicyEnabled,
    };
    const snapshot = saveQuizAttempt(attempt);
    setQuizAttempts(snapshot.attempts);
    setQuizStorageStatus(snapshot.storageStatus);
    setSubmittedAttemptId(attempt.attemptId);
  }

  function updateRating(criterionId: string, ratingId: string | null) {
    if (!ready) return;
    const nextRatings = { ...ratings };
    if (ratingId) nextRatings[criterionId] = ratingId;
    else delete nextRatings[criterionId];
    const assessment = content.practicalAssessment;
    const criteria = assessment.criteria.map((criterion) => ({ criterionId: criterion.id, criterionVersion: criterion.version }));
    const versionById = new Map(criteria.map((criterion) => [criterion.criterionId, criterion.criterionVersion]));
    const previousRatings = currentRubricRatings(practicalRecord, content);
    const now = new Date().toISOString();
    const versionedRatings = Object.entries(nextRatings).flatMap(([id, selected]) => {
      const criterionVersion = versionById.get(id);
      if (criterionVersion === undefined) return [];
      const previous = practicalRecord?.ratings.find((item) => item.criterionId === id
        && item.criterionVersion === criterionVersion && item.scaleId === assessment.scale.id
        && item.scaleVersion === assessment.scale.version && previousRatings[id] === selected);
      return [{
        criterionId: id,
        criterionVersion,
        scaleId: assessment.scale.id,
        scaleVersion: assessment.scale.version,
        ratingId: selected,
        ratedAt: previous?.ratedAt ?? now,
      }];
    });
    const record: PracticalAssessmentRecord = {
      topicSlug: topic.slug,
      assessmentId: assessment.id,
      assessmentVersion: assessment.version,
      scaleId: assessment.scale.id,
      scaleVersion: assessment.scale.version,
      criteria,
      ratings: versionedRatings,
      history: practicalRecord?.history ?? [],
      updatedAt: now,
      selfAssessment: true,
      previewOnly: !rubricPolicyEnabled,
    };
    const snapshot = savePracticalAssessment(record);
    setRatings(nextRatings);
    setPracticalRecord(snapshot.record);
    setPracticalStorageStatus(snapshot.storageStatus);
  }

  const currentQuestionVersions = new Map(content.quiz.questions.map((question) => [question.id, question.version]));
  const isCurrentAttempt = (attempt: QuizAttemptRecord) => attempt.quizId === content.quiz.id
    && attempt.quizVersion === content.quiz.version
    && attempt.policyId === content.quiz.scoringPolicy.id
    && attempt.policyVersion === content.quiz.scoringPolicy.version
    && attempt.answers.length === content.quiz.questions.length
    && attempt.answers.every((answer) => currentQuestionVersions.get(answer.questionId) === answer.questionVersion);
  const currentAttempts = quizAttempts.filter(isCurrentAttempt);
  const olderAttempts = quizAttempts.filter((attempt) => !isCurrentAttempt(attempt));
  const latestAttempt = currentAttempts[currentAttempts.length - 1];
  const displayedAttempt = currentAttempts.find((attempt) => attempt.attemptId === submittedAttemptId)
    ?? (showSavedFeedback && Object.keys(answers).length === 0 ? latestAttempt : undefined);
  const retiredRatings = oldRubricRatings(practicalRecord, content);

  return (
    <section
      className="learning-activities space-y-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-7"
      data-topic-slug={content.topicSlug}
      data-offline-content-version={content.contentVersion}
      aria-labelledby={`${instanceId}-learning-title`}
    >
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {content.reviewState === 'approved' ? 'محتوى تمت مراجعته' : content.reviewState === 'review-ready' ? 'محتوى بانتظار المراجعة' : 'مسودة تعليمية'}
          </span>
          {!quizPolicyEnabled && (
            <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              {content.quiz.scoringPolicy.approval.state === 'approved' ? 'معاينة فحص ذاتي — لا تمثل إتقانًا' : 'معاينة مقترحة — لا تمثل إتقانًا'}
            </span>
          )}
        </div>
        <h2 id={`${instanceId}-learning-title`} className="text-xl font-black text-[var(--text-main)]">محتوى تعلّمي وتقييم ذاتي</h2>
        <p className="text-sm leading-7 text-[var(--text-muted)]" dir="auto">
          نتائج هذا الفحص مراجعة ذاتية لإجاباتك وفق سياسة التصحيح المعتمدة، والتقييم الذاتي هو تقدير المتعلم الخاص وليس تحققاً مستقلاً. لا تتحقق الواجهة من صحة مشروعك أو من إتقانه، ولا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق.
        </p>
      </header>

      {content.objectives.length > 0 && <section aria-labelledby={`${instanceId}-objectives`} className="space-y-2">
        <h3 id={`${instanceId}-objectives`} className="font-black text-[var(--text-main)]">أهداف التعلّم</h3>
        <ul className="list-disc space-y-1.5 pe-6 text-sm leading-7 text-[var(--text-muted)]">
          {content.objectives.map((objective) => <li key={objective.id} dir="auto">{objective.text}</li>)}
        </ul>
      </section>}

      {content.sections.length > 0 && <div className="space-y-4">
        {content.sections.map((section) => <section key={section.id} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-5">
          <h3 className="font-black text-[var(--text-main)]" dir="auto">{section.heading}</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]" dir="auto">{section.body}</p>
        </section>)}
      </div>}

      {content.practicalSteps.length > 0 && <section aria-labelledby={`${instanceId}-steps`} className="space-y-3">
        <h3 id={`${instanceId}-steps`} className="font-black text-[var(--text-main)]">خطوات التطبيق ومخرجاتها</h3>
        <ol className="space-y-3">
          {content.practicalSteps.map((step, index) => <li key={step.id} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
            <p className="text-sm font-semibold leading-7 text-[var(--text-main)]" dir="auto">{index + 1}. {step.instruction}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]" dir="auto"><strong className="text-[var(--text-main)]">المخرج المتوقع: </strong>{step.expectedOutput}</p>
          </li>)}
        </ol>
      </section>}

      {content.workedExamples.length > 0 && <section aria-labelledby={`${instanceId}-examples`} className="space-y-3">
        <h3 id={`${instanceId}-examples`} className="font-black text-[var(--text-main)]">أمثلة محلولة</h3>
        {content.workedExamples.map((example) => <article key={example.id} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
          <h4 className="font-bold text-[var(--text-main)]" dir="auto">{example.title}{example.caseStudy === 'borrowhub-optional' ? ' — مثال اختياري' : ''}</h4>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]" dir="auto">{example.context}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]" dir="auto">{example.result}</p>
        </article>)}
      </section>}

      <section aria-labelledby={`${instanceId}-videos`} className="space-y-3">
        <h3 id={`${instanceId}-videos`} className="font-black text-[var(--text-main)]">موارد فيديو خارجية</h3>
        {content.candidateVideos.length > 0 ? <>
          <p className="text-xs leading-6 text-[var(--text-muted)]">مصادر الفيديو الخارجية تتطلب اتصالاً بالإنترنت ولا تتوفر دون اتصال.</p>
          {content.candidateVideos.map((video) => <ExternalVideoResource key={video.id} resource={video} topicTitle={topic.title} />)}
        </> : <ExternalVideoResource topicTitle={topic.title} />}
      </section>

      <section aria-labelledby={`${instanceId}-quiz`} className="space-y-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 id={`${instanceId}-quiz`} className="text-lg font-black text-[var(--text-main)]">{content.quiz.title}</h3>
            <span className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">فحص ذاتي</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]" dir="auto">{content.quiz.instructions}</p>
          <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]" dir="auto">{content.quiz.scoringPolicy.summary}</p>
        </div>
        {content.quiz.questions.length === 0 ? <p className="text-sm text-[var(--text-muted)]">لا توجد أسئلة متاحة لهذا الموضوع حاليًا.</p> : <form onSubmit={submitQuiz} className="space-y-4">
          {content.quiz.questions.map((question, questionIndex) => {
            const feedback = displayedAttempt?.answers.find((answer) => answer.questionId === question.id && answer.questionVersion === question.version);
            return <fieldset key={`${question.id}-${question.version}`} className="space-y-3 rounded-xl border border-[var(--border-color)] p-4" disabled={!ready}>
              <legend className="max-w-full px-1 text-sm font-bold leading-7 text-[var(--text-main)]" dir="auto">{questionIndex + 1}. {question.prompt}</legend>
              <div className="space-y-2">
                {question.options.map((option) => {
                  const inputId = `${instanceId}-${question.id}-${option.id}`;
                  return <label key={option.id} htmlFor={inputId} className="flex min-h-11 items-start gap-3 rounded-lg px-2 py-2 text-sm leading-6 text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)]" dir="auto">
                    <input
                      id={inputId}
                      type="radio"
                      name={`${instanceId}-${question.id}`}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => {
                        setAnswers((current) => ({ ...current, [question.id]: option.id }));
                        setSubmittedAttemptId(null);
                        setShowSavedFeedback(false);
                      }}
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                    <span>{option.text}</span>
                  </label>;
                })}
              </div>
              {feedback && <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-sm leading-7" role="status" aria-live="polite">
                <p className="font-bold text-[var(--text-main)]">{feedback.correctness === 'correct' ? 'إجابة صحيحة في هذا الفحص الذاتي' : feedback.correctness === 'incorrect' ? 'الإجابة تحتاج إلى مراجعة' : 'لم تُجب عن هذا السؤال'}</p>
                <p className="mt-1 text-[var(--text-muted)]" dir="auto">{question.explanation}</p>
              </div>}
            </fieldset>;
          })}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={!ready} className="min-h-11 rounded-xl bg-[var(--action-bg)] px-5 py-2 font-bold text-[var(--action-text)] transition-colors hover:bg-[var(--action-bg-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50">
              إرسال الإجابات
            </button>
            {displayedAttempt && <button type="button" onClick={() => { setAnswers({}); setSubmittedAttemptId(null); setShowSavedFeedback(false); }} className="min-h-11 rounded-xl border border-[var(--border-color)] px-4 py-2 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
              إعادة المحاولة
            </button>}
          </div>
        </form>}

        {displayedAttempt && <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40" role="status" aria-live="polite">
          <p className="font-black text-amber-950 dark:text-amber-100">{displayedAttempt.previewOnly ? (content.quiz.scoringPolicy.approval.state === 'approved' ? 'نتيجة معاينة فحص ذاتي' : 'نتيجة معاينة مقترحة') : 'نتيجة الفحص الذاتي'}: {displayedAttempt.score} / {displayedAttempt.maxScore}</p>
          <p className="mt-1 text-sm leading-6 text-amber-900 dark:text-amber-200">صحيح: {displayedAttempt.correctCount} · غير صحيح: {displayedAttempt.incorrectCount} · بلا إجابة: {displayedAttempt.unansweredCount}. هذه النتيجة لا تثبت صحة التطبيق أو إتقان المشروع.</p>
        </div>}

        {latestAttempt && <div className="border-t border-[var(--border-color)] pt-3">
          <p className="text-sm font-bold text-[var(--text-main)]">
            {quizStorageStatus === 'available' ? 'آخر نتيجة محفوظة في هذا المتصفح:' : 'آخر نتيجة في هذه الجلسة، وقد لا تبقى بعد إعادة التحميل:'}
            {' '}{latestAttempt.score} / {latestAttempt.maxScore}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">نسخة الاختبار {latestAttempt.quizVersion} · {formatTimestamp(latestAttempt.submittedAt)}{latestAttempt.previewOnly ? ' · معاينة' : ''}</p>
        </div>}
        {quizAttempts.length > 0 && <div className="border-t border-[var(--border-color)] pt-2">
          {olderAttempts.length > 0 && <p className="mb-1 text-xs leading-6 text-[var(--text-muted)]">توجد محاولات من اختبارات أو نسخ سابقة؛ تبقى محفوظة بهويتها وإصداراتها ولا تُحتسب كإجابات للنسخة الحالية.</p>}
          <details className="text-sm text-[var(--text-muted)]">
            <summary className="min-h-11 cursor-pointer py-2 font-semibold">عرض سجل المحاولات ({quizAttempts.length})</summary>
            <ul className="space-y-1 ps-5">
              {[...quizAttempts].reverse().map((attempt) => <li key={attempt.attemptId}>
                {attempt.score}/{attempt.maxScore} · {attempt.quizId === content.quiz.id ? 'نسخة الاختبار' : `اختبار سابق: ${attempt.quizId}`} {attempt.quizVersion} · {isCurrentAttempt(attempt) ? 'النسخة الحالية' : 'نسخة سابقة'} · {formatTimestamp(attempt.submittedAt)}{attempt.previewOnly ? ' · معاينة' : ''}
              </li>)}
            </ul>
          </details>
        </div>}
        {quizStorageStatus in statusMessages && <p className="text-xs leading-6 text-amber-800 dark:text-amber-200" role="status" aria-live="polite">{statusMessages[quizStorageStatus as keyof typeof statusMessages]}</p>}
      </section>

      <section aria-labelledby={`${instanceId}-rubric`} className="space-y-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 id={`${instanceId}-rubric`} className="text-lg font-black text-[var(--text-main)]">{content.practicalAssessment.title}</h3>
            <span className="rounded-full border border-[var(--border-color)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">تقييم ذاتي لمشروعك</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]" dir="auto">{content.practicalAssessment.scale.summary} التقييم الذاتي هو تقدير المتعلم الخاص وليس تحققًا مستقلًا؛ لا توجد عتبة إتقان أو شارة نتيجة هذا التقييم، ولا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق.</p>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
          <h4 className="font-bold text-[var(--text-main)]">مخرجات المشروع لمراجعتها</h4>
          <ul className="mt-2 list-disc space-y-1 pe-6 text-sm leading-7 text-[var(--text-muted)]">
            {content.practicalAssessment.outputs.map((output) => <li key={output.id} dir="auto">{output.description}</li>)}
          </ul>
          <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">BorrowHub مثال اختياري؛ استخدم مشروعك أنت في هذا التقييم.</p>
        </div>

        <div className="grid gap-3">
          {content.practicalAssessment.criteria.map((criterion) => {
            const output = content.practicalAssessment.outputs.find((item) => item.id === criterion.outputId);
            return <fieldset key={`${criterion.id}-${criterion.version}`} className="space-y-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4" disabled={!ready}>
              <legend className="max-w-full px-1 font-bold text-[var(--text-main)]" dir="auto">{criterion.name}</legend>
              {output && <p className="text-xs font-semibold text-[var(--text-muted)]" dir="auto">المخرج: {output.description}</p>}
              <p className="text-sm leading-6 text-[var(--text-muted)]" dir="auto">{criterion.description}</p>
              <p className="text-sm leading-6 text-[var(--text-muted)]" dir="auto"><strong className="text-[var(--text-main)]">اسأل نفسك: </strong>{criterion.evidencePrompt}</p>
              <label htmlFor={`${instanceId}-rating-${criterion.id}`} className="block text-sm font-semibold text-[var(--text-main)]">اختيارك للتقييم الذاتي</label>
              <select
                id={`${instanceId}-rating-${criterion.id}`}
                value={ratings[criterion.id] ?? ''}
                onChange={(event) => updateRating(criterion.id, event.target.value || null)}
                className="min-h-11 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-main)] focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <option value="">لم أحدد تقييماً</option>
                {content.practicalAssessment.scale.levels.map((level) => <option key={level.id} value={level.id}>{level.label}</option>)}
              </select>
              <ul className="space-y-1 text-xs leading-6 text-[var(--text-muted)]">
                {content.practicalAssessment.scale.levels.map((level) => <li key={level.id}><strong className="text-[var(--text-main)]">{level.label}: </strong>{level.description}</li>)}
              </ul>
            </fieldset>;
          })}
        </div>

        {retiredRatings.length > 0 && <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-sm leading-6 text-[var(--text-muted)]">
          توجد أحكام من نسخة rubric سابقة. تبقى في سجلها التاريخي ولا تُنقل تلقائيًا إلى المعايير أو المقياس الحالي.
        </div>}
        <p className="text-xs leading-6 text-[var(--text-muted)]" role="status" aria-live="polite">
          {practicalStorageStatus === 'available'
            ? 'تُحفظ اختيارات التقييم الذاتي في هذا المتصفح على هذا الجهاز فقط.'
            : practicalStorageStatus === 'loading' ? 'جارٍ تحميل التقييم المحفوظ…' : statusMessages[practicalStorageStatus]}
        </p>
      </section>
    </section>
  );
}
