import { expect, test } from '@playwright/test';
import { createApprovedTestTopic } from './fixtures/testTopicFixture';

const topicSlug = 'project-idea-mvp';
const quizStorageKey = 'ai-agents-quiz-attempts-v1';
const practicalStorageKey = 'ai-agents-practical-assessments-v1';
const activitySelector = '.learning-activities';

function quizSection(page: import('@playwright/test').Page) {
  return page.locator(activitySelector).getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
}

function practicalSection(page: import('@playwright/test').Page) {
  return page.locator(activitySelector).getByRole('heading', { name: 'مراجعة ذاتية لمخرجات التمرين' }).locator('xpath=ancestor::section[1]');
}

test.describe('objective quiz and practical self-assessment', () => {
  test.describe.configure({ timeout: 90_000 });

  test('grades answers, keeps retries and restores the latest attempt and rubric choices', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const activity = page.locator(activitySelector);
    await expect(activity).toHaveAttribute('data-offline-content-version', '1');

    const quiz = quizSection(page);
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    const journeyQuestion = quiz.getByRole('group', { name: /أي اقتراح يصف MVP/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await journeyQuestion.getByRole('radio', { name: 'ثلاث شاشات جميلة بلا حجز مكتمل', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();
    await expect(evidenceQuestion.getByRole('status')).toContainText('إجابة صحيحة');
    await expect(journeyQuestion.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');

    await quiz.getByRole('button', { name: 'إعادة المحاولة', exact: true }).click();
    await journeyQuestion.getByRole('radio', { name: /رحلة حجز واحدة من اختيار وقت إلى تأكيد واضح/ }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await expect(evidenceQuestion.getByRole('status')).toContainText('لم تُجب عن هذا السؤال');
    await expect(evidenceQuestion.getByRole('status')).toContainText('التوقع الذي لم يختبر بعد يظل افتراضاً');
    await expect(journeyQuestion.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(quiz.getByText(/هذه النتيجة لا تثبت صحة التطبيق أو إتقان المشروع/)).toBeVisible();
    await expect(quiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();

    const problemCriterion = activity.getByRole('group', { name: 'صياغة المشكلة ودليلها' });
    const scopeCriterion = activity.getByRole('group', { name: 'اكتمال رحلة MVP وحدودها' });
    await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await scopeCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');
    await expect.poll(() => page.evaluate(({ key, slug }) => {
      const document = JSON.parse(localStorage.getItem(key) ?? '{}');
      return document.byTopic?.[slug]?.ratings?.length ?? 0;
    }, { key: practicalStorageKey, slug: topicSlug })).toBe(2);

    await page.reload();
    const restoredQuiz = quizSection(page);
    await expect(restoredQuiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await expect(restoredQuiz.getByText(/آخر نتيجة محفوظة في هذا المتصفح/)).toBeVisible();
    const restoredProblem = page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' });
    const restoredScope = page.locator(activitySelector).getByRole('group', { name: 'اكتمال رحلة MVP وحدودها' });
    await expect(restoredProblem.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(restoredScope.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    await restoredProblem.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await expect.poll(() => page.evaluate(({ key, slug }) => {
      const document = JSON.parse(localStorage.getItem(key) ?? '{}');
      return document.byTopic?.[slug]?.ratings?.length ?? 0;
    }, { key: practicalStorageKey, slug: topicSlug })).toBe(1);
    await page.reload();
    await expect(page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' }).getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
  });

  test('uses the same local quiz and rubric records in the full reader and quick preview, isolated by browser profile', async ({ page, browser }) => {
    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');

    await page.goto('/');
    const topicCard = page.locator('article.topic-card').filter({ hasText: 'اختيار فكرة المشروع' }).first();
    await topicCard.getByRole('button', { name: 'معاينة سريعة', exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator(activitySelector)).toHaveAttribute('data-offline-content-version', '1');
    const previewQuiz = quizSection(page);
    await expect(previewQuiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await expect(previewQuiz.getByText(/آخر نتيجة محفوظة في هذا المتصفح/)).toBeVisible();
    await expect(dialog.getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');

    await previewQuiz.getByRole('button', { name: 'إعادة المحاولة', exact: true }).click();
    const previewEvidence = previewQuiz.getByRole('group', { name: /لم تتحدث بعد/ });
    await previewEvidence.getByRole('radio', { name: 'حقيقة مثبتة لأن المشكلة شائعة', exact: true }).check();
    await previewQuiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(previewQuiz.getByText(/صحيح: 0 · غير صحيح: 1 · بلا إجابة: 1/)).toBeVisible();
    const previewProblem = dialog.getByRole('group', { name: 'صياغة المشكلة ودليلها' }).getByLabel('اختيارك للتقييم الذاتي');
    await previewProblem.selectOption('in-progress');
    await previewProblem.selectOption('ready-for-review');

    await page.goto(`/learn/${topicSlug}`);
    const fullReaderQuiz = quizSection(page);
    await expect(fullReaderQuiz.getByText(/صحيح: 0 · غير صحيح: 1 · بلا إجابة: 1/)).toBeVisible();
    await expect(fullReaderQuiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();
    await expect(page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');

    const isolatedContext = await browser.newContext();
    try {
      const isolatedPage = await isolatedContext.newPage();
      await isolatedPage.goto(`/learn/${topicSlug}`);
      const isolatedQuiz = quizSection(isolatedPage);
      await expect(isolatedQuiz.getByText(/آخر نتيجة محفوظة|آخر نتيجة في هذه الجلسة/)).toHaveCount(0);
      await expect(isolatedPage.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
        .getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
      expect(await isolatedPage.evaluate((keys) => keys.map((key) => localStorage.getItem(key)), [quizStorageKey, practicalStorageKey]))
        .toEqual([null, null]);
    } finally {
      await isolatedContext.close();
    }
  });

  test('keeps quiz attempts and rubric judgments attached to their Topic', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const firstQuiz = quizSection(page);
    const evidenceQuestion = firstQuiz.getByRole('group', { name: /لم تتحدث بعد/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await firstQuiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(firstQuiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');

    await page.goto('/learn/discovery-grill-me');
    const otherQuiz = quizSection(page);
    await expect(otherQuiz.getByText(/آخر نتيجة محفوظة|آخر نتيجة في هذه الجلسة/)).toHaveCount(0);
    const otherRating = page.locator(activitySelector).getByLabel('اختيارك للتقييم الذاتي').first();
    await expect(otherRating).toHaveValue('');
    await otherRating.selectOption('in-progress');

    await page.goto(`/learn/${topicSlug}`);
    await expect(quizSection(page).getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await expect(page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await page.goto('/learn/discovery-grill-me');
    await expect(page.locator(activitySelector).getByLabel('اختيارك للتقييم الذاتي').first()).toHaveValue('in-progress');
  });

  test('shows retained prior-version history without presenting it as a current result or rating', async ({ page }) => {
    const priorAttempt = {
      attemptId: 'prior-version-attempt',
      topicSlug,
      quizId: `${topicSlug}-previous-objective-quiz`,
      quizVersion: 1,
      policyId: `${topicSlug}-previous-quiz-scoring-policy`,
      policyVersion: 1,
      answers: [{ questionId: 'idea-mvp-q-evidence', questionVersion: 1, selectedOptionId: 'old-option', correctness: 'correct' }],
      correctCount: 1,
      incorrectCount: 0,
      unansweredCount: 0,
      score: 1,
      maxScore: 1,
      submittedAt: '2026-10-19T12:00:00.000Z',
      selfCheck: true,
      previewOnly: true,
    };
    const oldCriterionRating = {
      criterionId: 'idea-mvp-r-problem',
      criterionVersion: 1,
      scaleId: `${topicSlug}-rubric-scale`,
      scaleVersion: 1,
      ratingId: 'ready-for-review',
      ratedAt: '2026-10-19T12:00:00.000Z',
    };
    const oldScaleRating = {
      criterionId: 'idea-mvp-r-problem',
      criterionVersion: 1,
      scaleId: 'project-idea-mvp-rubric-scale-old',
      scaleVersion: 0,
      ratingId: 'legacy-level',
      ratedAt: '2026-10-19T12:05:00.000Z',
    };
    await page.addInitScript(({ quizKey, practicalKey, slug, attempt, rating, historyRating }) => {
      localStorage.setItem(quizKey, JSON.stringify({ schemaVersion: 1, byTopic: { [slug]: [attempt] } }));
      localStorage.setItem(practicalKey, JSON.stringify({ schemaVersion: 1, byTopic: {
        [slug]: {
          topicSlug: slug,
          assessmentId: `${slug}-previous-practical-assessment`,
          assessmentVersion: 0,
          scaleId: `${slug}-rubric-scale`,
          scaleVersion: 1,
          criteria: [{ criterionId: rating.criterionId, criterionVersion: rating.criterionVersion }],
          ratings: [rating],
          history: [historyRating],
          updatedAt: rating.ratedAt,
          selfAssessment: true,
          previewOnly: true,
        },
      } }));
    }, { quizKey: quizStorageKey, practicalKey: practicalStorageKey, slug: topicSlug, attempt: priorAttempt, rating: oldCriterionRating, historyRating: oldScaleRating });

    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);
    await expect(quiz.getByText(/محاولات من اختبارات أو نسخ سابقة/)).toBeVisible();
    await expect(quiz.getByText(/آخر نتيجة محفوظة|آخر نتيجة في هذه الجلسة/)).toHaveCount(0);
    await quiz.getByText(/عرض سجل المحاولات \(1\)/).click();
    await expect(quiz.getByText(new RegExp(`اختبار سابق: ${topicSlug}-previous-objective-quiz`))).toBeVisible();
    await expect(quiz.getByText(/نسخة سابقة/)).toBeVisible();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/صحيح: 0 · غير صحيح: 0 · بلا إجابة: 2/)).toBeVisible();
    await expect(quiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();
    await expect(quiz.getByText(new RegExp(`اختبار سابق: ${topicSlug}-previous-objective-quiz`))).toBeVisible();
    await expect(page.locator(activitySelector).getByText(/أحكام من نسخة rubric سابقة/)).toBeVisible();
    await expect(page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' }).getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    expect(await page.evaluate(({ key, slug }) => {
      const record = JSON.parse(localStorage.getItem(key) ?? '{}').byTopic?.[slug];
      return { currentRatingCount: record?.ratings?.length, archivedRatingCount: record?.history?.length };
    }, { key: practicalStorageKey, slug: topicSlug })).toEqual({ currentRatingCount: 1, archivedRatingCount: 1 });
  });

  test('labels a failed quiz write as session-only and does not restore it after reload', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);
    await page.evaluate((key) => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (storageKey: string, value: string) {
        if (storageKey === key) throw new Error('Storage quota');
        return originalSetItem.call(this, storageKey, value);
      };
    }, quizStorageKey);
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/آخر نتيجة في هذه الجلسة، وقد لا تبقى بعد إعادة التحميل/)).toBeVisible();
    await expect(quiz.getByText(/تعذر حفظ السجل على هذا الجهاز/)).toBeVisible();

    await page.reload();
    const reloadedQuiz = quizSection(page);
    await expect(reloadedQuiz.getByText(/آخر نتيجة محفوظة|آخر نتيجة في هذه الجلسة/)).toHaveCount(0);
    expect(await page.evaluate((key) => localStorage.getItem(key), quizStorageKey)).toBeNull();
  });

  test('labels a failed rubric write and does not restore the session-only judgment after reload', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const rating = page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي');
    await page.evaluate((key) => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (storageKey: string, value: string) {
        if (storageKey === key) throw new Error('Storage quota');
        return originalSetItem.call(this, storageKey, value);
      };
    }, practicalStorageKey);
    await rating.selectOption('ready-for-review');
    await expect(rating).toHaveValue('ready-for-review');
    await expect(page.locator(activitySelector).getByText(/تعذر حفظ السجل على هذا الجهاز/)).toBeVisible();

    await page.reload();
    await expect(page.locator(activitySelector).getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    expect(await page.evaluate((key) => localStorage.getItem(key), practicalStorageKey)).toBeNull();
  });

  test('keeps quiz results strictly distinct from reading activity, checklist selections, rubric assessment, and completion signals', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const activity = page.locator(activitySelector);
    const quiz = quizSection(page);

    // Initial check: check a checklist item in the sidebar
    const checklistSection = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' });
    const firstCheckbox = checklistSection.getByRole('checkbox').first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Verify rubric starts with no selections
    const rubricSelects = activity.locator('select');
    await expect(rubricSelects.first()).toHaveValue('');

    // Submit quiz
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();

    // Verify checklist selection is completely unchanged
    await expect(firstCheckbox).toBeChecked();
    const checklistStorage = await page.evaluate((slug) => {
      const doc = JSON.parse(localStorage.getItem('application-checklists-v1') ?? '{}');
      return doc[slug]?.length ?? 0;
    }, topicSlug);
    expect(checklistStorage).toBe(1);

    // Verify rubric selection is completely unchanged in UI and storage
    await expect(rubricSelects.first()).toHaveValue('');
    const rubricStorage = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug]?.ratings?.length ?? 0;
    }, { key: practicalStorageKey, slug: topicSlug });
    expect(rubricStorage).toBe(0);

    // Verify no completion signal or badge is created or awarded
    await expect(page.getByText('مكتمل', { exact: true })).toHaveCount(0);
    await expect(page.getByText('تم إكمال المسار', { exact: false })).toHaveCount(0);
    const badgeStorage = await page.evaluate(() => localStorage.getItem('ai-agents-badge-awards-v1'));
    expect(badgeStorage).toBeNull();

    // Verify reading storage recency is only tracking visited topic slugs, not completion or quiz score
    const readingStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') ?? '[]'));
    expect(readingStorage).toEqual([topicSlug]);

    // Now select a rubric rating and verify quiz attempt is completely unaffected
    await activity.getByRole('group', { name: 'صياغة المشكلة ودليلها' })
      .getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');
    const quizAttemptsAfterRubric = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug]?.length ?? 0;
    }, { key: quizStorageKey, slug: topicSlug });
    expect(quizAttemptsAfterRubric).toBe(1);
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
  });

  test('retains historical attempt when a question version is updated and begins the new version unselected', async ({ page }) => {
    // Seed an attempt with the same quizId and quizVersion, but where a question version is 0 instead of 1
    const priorVersionAttempt = {
      attemptId: 'prior-question-version-attempt',
      topicSlug,
      quizId: `${topicSlug}-objective-quiz`,
      quizVersion: 1,
      policyId: `${topicSlug}-quiz-scoring-policy`,
      policyVersion: 1,
      answers: [
        { questionId: 'idea-mvp-q-evidence', questionVersion: 0, selectedOptionId: 'old-opt-1', correctness: 'correct' },
        { questionId: 'idea-mvp-q-journey', questionVersion: 1, selectedOptionId: 'old-opt-2', correctness: 'incorrect' },
      ],
      correctCount: 1,
      incorrectCount: 1,
      unansweredCount: 0,
      score: 1,
      maxScore: 2,
      submittedAt: '2026-10-19T10:00:00.000Z',
      selfCheck: true,
      previewOnly: true,
    };
    await page.addInitScript(({ key, slug, attempt }) => {
      localStorage.setItem(key, JSON.stringify({ schemaVersion: 1, byTopic: { [slug]: [attempt] } }));
    }, { key: quizStorageKey, slug: topicSlug, attempt: priorVersionAttempt });

    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);

    // Prior version attempt should be recognized as older, not current
    await expect(quiz.getByText(/محاولات من اختبارات أو نسخ سابقة/)).toBeVisible();
    await expect(quiz.getByText(/آخر نتيجة محفوظة في هذا المتصفح/)).toHaveCount(0);
    // Radio buttons must be unselected for the new version
    await expect(quiz.locator('input[type="radio"]:checked')).toHaveCount(0);

    // Expand history to see the prior attempt preserved
    await quiz.getByText(/عرض سجل المحاولات \(1\)/).click();
    await expect(quiz.getByText(/نسخة سابقة/)).toBeVisible();
    await expect(quiz.getByText('1/2')).toBeVisible();

    // Now answer the current question version and submit
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    const journeyQuestion = quiz.getByRole('group', { name: /أي اقتراح يصف MVP/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await journeyQuestion.getByRole('radio', { name: /رحلة حجز واحدة من اختيار وقت إلى تأكيد واضح/ }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Current version result is now displayed
    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
    // History now contains both attempts
    await expect(quiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();
    // Storage has both attempts preserved
    const attemptsCount = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug]?.length ?? 0;
    }, { key: quizStorageKey, slug: topicSlug });
    expect(attemptsCount).toBe(2);
  });

  test('supports accessible keyboard navigation, visible focus ring, ARIA status announcements, and touch target sizing', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);

    // Verify touch target sizing (minimum 44px height for interactive targets)
    const radioLabels = quiz.locator('label:has(input[type="radio"])');
    const count = await radioLabels.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const box = await radioLabels.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    const submitBtn = quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true });
    const submitBox = await submitBtn.boundingBox();
    expect(submitBox!.height).toBeGreaterThanOrEqual(44);

    // Check keyboard navigation: focus the first radio and select with space
    const firstRadio = quiz.locator('input[type="radio"]').first();
    await firstRadio.focus();
    await expect(firstRadio).toBeFocused();
    await page.keyboard.press('Space');
    await expect(firstRadio).toBeChecked();

    // Focus submit button with Tab and press Enter
    await submitBtn.focus();
    await expect(submitBtn).toBeFocused();
    await page.keyboard.press('Enter');

    // ARIA live / role="status" should announce feedback
    const feedbackStatus = quiz.locator('[role="status"]').first();
    await expect(feedbackStatus).toBeVisible();
    await expect(feedbackStatus).toHaveAttribute('aria-live', 'polite');

    // Retry button appears with >= 44px height and keyboard accessible
    const retryBtn = quiz.getByRole('button', { name: 'إعادة المحاولة', exact: true });
    const retryBox = await retryBtn.boundingBox();
    expect(retryBox!.height).toBeGreaterThanOrEqual(44);
    await retryBtn.focus();
    await expect(retryBtn).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(firstRadio).not.toBeChecked();
  });

  test('Topic with accepted quiz policy but pending educational review shows accepted policy and pending statement, presented as self-check preview', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);

    // 1. Instructions show accepted policy wording AND honest limits
    await expect(quiz.getByText(/اختر الإجابة الأدق ثم اقرأ التفسير. سياسة تقييم معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة/)).toBeVisible();
    await expect(quiz.getByText(/الفحص لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل/)).toBeVisible();

    // 2. Both quiz instructions and scoring policy summary show the pending review statement
    const pendingStatements = quiz.getByText(/المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك تظهر النتيجة كمعاينة فحص ذاتي وليست نتيجة نهائية/);
    await expect(pendingStatements).toHaveCount(2);
    await expect(pendingStatements.first()).toBeVisible();

    // 3. Scoring policy summary shows accepted policy
    await expect(quiz.getByText(/سياسة معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة/)).toBeVisible();

    // 3. Header badge presents the preview marker
    await expect(page.locator(activitySelector).getByText('معاينة فحص ذاتي — لا تمثل إتقانًا')).toBeVisible();

    // 4. Submit an answer and verify result is presented as a self-check preview
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    await expect(quiz.getByText(/نتيجة معاينة فحص ذاتي: 1 \/ 2/)).toBeVisible();
    await expect(quiz.getByText('هذه النتيجة لا تثبت صحة التطبيق أو إتقان المشروع.')).toBeVisible();

    // 5. Stored attempt retains previewOnly flag
    const stored = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug]?.[0];
    }, { key: quizStorageKey, slug: topicSlug });
    expect(stored.previewOnly).toBe(true);
    expect(stored.selfCheck).toBe(true);
  });

  test('Topic with accepted policy, approved reviewState, and passing evidence shows final wording without preview marker and retains attempt and rubric as real records', async ({ page }) => {
    const approvedTopic = createApprovedTestTopic(topicSlug);

    // Inject via the e2e hook: window.__AI_AGENTS_E2E_TOPIC_CONTENT__
    await page.addInitScript(({ slug, content }) => {
      (window as unknown as { __AI_AGENTS_E2E_TOPIC_CONTENT__: Record<string, unknown> }).__AI_AGENTS_E2E_TOPIC_CONTENT__ = {
        [slug]: content,
      };
    }, { slug: topicSlug, content: approvedTopic });

    await page.goto(`/learn/${topicSlug}`);
    const quiz = quizSection(page);
    const activity = page.locator(activitySelector);

    // 1. Quiz instructions show final accepted policy wording with honest limits, but NO pending review sentence
    await expect(quiz.getByText(/سياسة تقييم معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة/)).toBeVisible();
    await expect(quiz.getByText(/الفحص لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل/)).toBeVisible();
    await expect(quiz.getByText(/المراجعة التعليمية لهذا الموضوع ما زالت معلقة/)).toHaveCount(0);
    await expect(quiz.getByText(/معاينة فحص ذاتي وليست نتيجة نهائية/)).toHaveCount(0);

    // 2. Rubric summary shows final accepted policy wording with honest limits, but NO pending review sentence
    const practical = practicalSection(page);
    await expect(practical.getByText(/مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان/)).toBeVisible();
    await expect(practical.getByText(/لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل/)).toBeVisible();
    await expect(practical.getByText(/المراجعة التعليمية لهذا الموضوع ما زالت معلقة/)).toHaveCount(0);
    await expect(practical.getByText(/معاينة فحص ذاتي/)).toHaveCount(0);

    // 3. No preview marker badge in the activity header
    await expect(activity.getByText(/معاينة فحص ذاتي|معاينة مقترحة/)).toHaveCount(0);

    // 4. Submit quiz and verify score is presented with no preview marker
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    const journeyQuestion = quiz.getByRole('group', { name: /أي اقتراح يصف MVP/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await journeyQuestion.getByRole('radio', { name: 'ثلاث شاشات جميلة بلا حجز مكتمل', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Result banner shows final title "نتيجة الفحص الذاتي" (not "نتيجة معاينة فحص ذاتي")
    await expect(quiz.getByText(/نتيجة الفحص الذاتي: 1 \/ 2/)).toBeVisible();
    await expect(quiz.getByText('نتيجة معاينة فحص ذاتي')).toHaveCount(0);
    await expect(quiz.getByText('نتيجة معاينة مقترحة')).toHaveCount(0);

    // 5. Stored quiz attempt has previewOnly: false (retained as real record)
    const stored = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug]?.[0];
    }, { key: quizStorageKey, slug: topicSlug });
    expect(stored.previewOnly).toBe(false);
    expect(stored.selfCheck).toBe(true);
    expect(stored.score).toBe(1);
    expect(stored.maxScore).toBe(2);

    // 6. Select a rubric criterion and verify stored record has previewOnly: false
    const problemCriterion = activity.getByRole('group', { name: 'صياغة المشكلة ودليلها' });
    await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    const storedRubric = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug];
    }, { key: practicalStorageKey, slug: topicSlug });
    expect(storedRubric.selfAssessment).toBe(true);
    expect(storedRubric.previewOnly).toBe(false);
    expect(storedRubric.ratings[0].ratingId).toBe('ready-for-review');
  });

  test('Topic whose rubric policy is accepted but educational review is pending shows accepted wording and pending sentence, with judgments stored as self-assessment', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const activity = page.locator(activitySelector);
    const practical = practicalSection(page);

    // 1. Practical assessment shows accepted-policy wording AND explicit pending-review sentence
    await expect(practical.getByText(/مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان/)).toBeVisible();
    await expect(practical.getByText(/المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك يُعد التقييم معاينة فحص ذاتي وليس نتيجة نهائية/)).toBeVisible();
    await expect(practical.getByText(/لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل/)).toBeVisible();

    // 2. Clear statement that self-assessment is the learner's own judgment and not an independent verification
    await expect(activity.getByText(/التقييم الذاتي هو تقدير المتعلم الخاص وفق سلم التقييم المعتمد وليس تحققاً مستقلاً/)).toBeVisible();
    await expect(practical.getByText(/لا توجد عتبة إتقان أو شارة نتيجة هذا التقييم/)).toBeVisible();
    await expect(practical.getByText(/BorrowHub مثال اختياري؛ استخدم مشروعك أنت في هذا التقييم/)).toBeVisible();
    await expect(practical.getByText(/لا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق/)).toBeVisible();

    // 3. Select a judgment and verify stored under stable criterion identity as learner's own self-assessment
    const problemCriterion = activity.getByRole('group', { name: 'صياغة المشكلة ودليلها' });
    await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');

    const storedPending = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug];
    }, { key: practicalStorageKey, slug: topicSlug });

    expect(storedPending.selfAssessment).toBe(true);
    expect(storedPending.previewOnly).toBe(true);
    expect(storedPending.ratings).toHaveLength(1);
    expect(storedPending.ratings[0].criterionId).toBe('idea-mvp-r-problem');
    expect(storedPending.ratings[0].criterionVersion).toBe(1);
    expect(storedPending.ratings[0].ratingId).toBe('ready-for-review');

    // 4. Judgments can be revised or cleared at any time
    await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');
    const revisedDoc = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug];
    }, { key: practicalStorageKey, slug: topicSlug });
    expect(revisedDoc.ratings[0].ratingId).toBe('in-progress');

    await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    const clearedDoc = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug];
    }, { key: practicalStorageKey, slug: topicSlug });
    expect(clearedDoc.ratings).toHaveLength(0);
  });

  test('checklist and rubric are strictly independent: checklist item selection or quiz answers never select a criterion, and dashboard keeps them apart', async ({ page }) => {
    await page.goto(`/learn/${topicSlug}`);
    const activity = page.locator(activitySelector);

    // 1. Select a checklist item
    const checklist = page.locator('div[role="group"][aria-label="قائمة تحقق التطبيق"]');
    const firstCheckbox = checklist.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Verify all rubric criteria remain unselected
    const rubricSelects = activity.getByLabel('اختيارك للتقييم الذاتي');
    const rubricCount = await rubricSelects.count();
    expect(rubricCount).toBeGreaterThan(0);
    for (let i = 0; i < rubricCount; i++) {
      await expect(rubricSelects.nth(i)).toHaveValue('');
    }

    // Practical assessment storage does not have ratings
    const practicalBefore = await page.evaluate(({ key, slug }) => {
      const doc = JSON.parse(localStorage.getItem(key) ?? '{}');
      return doc.byTopic?.[slug]?.ratings?.length ?? 0;
    }, { key: practicalStorageKey, slug: topicSlug });
    expect(practicalBefore).toBe(0);

    // 2. Answer a quiz question and submit
    const quiz = quizSection(page);
    const evidenceQuestion = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
    await evidenceQuestion.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();

    // Verify rubric criteria STILL remain unselected
    for (let i = 0; i < rubricCount; i++) {
      await expect(rubricSelects.nth(i)).toHaveValue('');
    }

    // 3. Now select a rubric criterion
    await rubricSelects.first().selectOption('ready-for-review');
    await expect(rubricSelects.first()).toHaveValue('ready-for-review');

    // Checklist item remains checked and quiz attempt remains intact
    await expect(firstCheckbox).toBeChecked();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();

    // 4. Navigate to dashboard and verify checklist and rubric are kept apart
    await page.goto('/dashboard');
    await expect(page.getByTestId('metric-checklists')).toContainText('1');
    await expect(page.getByTestId('metric-quizzes')).toContainText('1');
    await expect(page.getByTestId('metric-assessments')).toContainText('1');

    const checklistSection = page.getByTestId('section-checklists');
    await expect(checklistSection.getByText('قائمة الموضوع الحالية')).toBeVisible();

    const quizSectionLocator = page.getByTestId('section-quizzes');
    await expect(quizSectionLocator.getByTestId('quiz-attempt-row')).toBeVisible();

    const assessmentSection = page.getByTestId('section-assessments');
    await expect(assessmentSection.getByTestId('practical-assessment-row')).toBeVisible();
    await expect(assessmentSection).toContainText('صياغة المشكلة ودليلها');
    await expect(assessmentSection).toContainText('جاهز للمراجعة');
  });

  test('Dashboard describes accepted quiz and rubric policies and affirms self-assessment limits with no completion inferred', async ({ page }) => {
    // Seed an attempt and practical assessment to inspect display on dashboard
    const submittedAt = '2026-10-20T10:00:00.000Z';
    await page.addInitScript(({ quizKey, rubricKey, slug, stamp }) => {
      localStorage.setItem(quizKey, JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          [slug]: [{
            attemptId: 'dashboard-verify-attempt',
            topicSlug: slug,
            quizId: `${slug}-objective-quiz`,
            quizVersion: 1,
            policyId: `${slug}-quiz-scoring-policy`,
            policyVersion: 1,
            answers: [
              { questionId: 'idea-mvp-q-evidence', questionVersion: 1, selectedOptionId: 'idea-mvp-q-evidence-option-2', correctness: 'correct' },
              { questionId: 'idea-mvp-q-journey', questionVersion: 1, selectedOptionId: 'idea-mvp-q-journey-option-1', correctness: 'incorrect' },
            ],
            correctCount: 1,
            incorrectCount: 1,
            unansweredCount: 0,
            score: 1,
            maxScore: 2,
            submittedAt: stamp,
            selfCheck: true,
            previewOnly: true,
          }],
        },
      }));
      localStorage.setItem(rubricKey, JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          [slug]: {
            topicSlug: slug,
            assessmentId: `${slug}-practical-assessment`,
            assessmentVersion: 1,
            scaleId: `${slug}-rubric-scale`,
            scaleVersion: 1,
            criteria: [
              { criterionId: 'idea-mvp-r-problem', criterionVersion: 1 },
              { criterionId: 'idea-mvp-r-scope', criterionVersion: 1 },
            ],
            ratings: [
              { criterionId: 'idea-mvp-r-problem', criterionVersion: 1, scaleId: `${slug}-rubric-scale`, scaleVersion: 1, ratingId: 'ready-for-review', ratedAt: stamp },
            ],
            history: [],
            updatedAt: stamp,
            selfAssessment: true,
            previewOnly: true,
          },
        },
      }));
    }, { quizKey: quizStorageKey, rubricKey: practicalStorageKey, slug: topicSlug, stamp: submittedAt });

    await page.goto('/dashboard');

    // 1. Quizzes section describes accepted scoring policy accurately
    const quizSectionLocator = page.getByTestId('section-quizzes');
    await expect(quizSectionLocator).toBeVisible();
    await expect(quizSectionLocator.getByText(/الدرجة وصف لسياسة التصحيح المعتمدة/)).toBeVisible();

    // 2. Quiz attempt card describes accepted policy and disclaims completion/mastery inference
    const attemptRow = page.getByTestId('quiz-attempt-row').first();
    await expect(attemptRow.getByText(/وفق سياسة التصحيح المعتمدة/)).toBeVisible();
    await expect(attemptRow.getByText(/لا تعني هذه النتيجة إكمال العمل العملي أو إتقانه/)).toBeVisible();
    await expect(attemptRow.getByText(/لا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق/)).toBeVisible();

    // 3. Practical assessment section describes self-assessment as learner's own judgment and not independent verification
    const assessmentSection = page.getByTestId('section-assessments');
    await expect(assessmentSection.getByText(/سلم التقييم المعتمد/).first()).toBeVisible();
    await expect(assessmentSection.getByText(/التقييم الذاتي هو تقدير المتعلم الخاص وليس تقييمًا مستقلاً/)).toBeVisible();
    await expect(assessmentSection.getByText(/لا يقيّم التطبيق مشروعك بصورة مستقلة/)).toBeVisible();
    await expect(assessmentSection.getByText(/لا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق/)).toBeVisible();

    // 4. Practical assessment row does not present scale as proposed or candidate
    const assessmentRow = page.getByTestId('practical-assessment-row').first();
    await expect(assessmentRow.getByText(/وفق سلم التقييم المعتمد/)).toBeVisible();
    await expect(assessmentRow.getByText(/التقييم الذاتي هو تقدير المتعلم الخاص وليس تحققًا مستقلًا/)).toBeVisible();
    await expect(assessmentRow.getByText(/مقترح/)).toHaveCount(0);
    await expect(assessmentRow.getByText(/مرشح/)).toHaveCount(0);

    // 5. Storage section affirms that no completion or mastery is inferred
    const storageSection = page.getByTestId('section-storage-status');
    await expect(storageSection.getByText(/لا يُستنتج الإكمال أو الإتقان من الزيارات أو التمرير أو إجابات الاختبارات أو اختيارات قوائم التحقق/)).toBeVisible();
  });
});
