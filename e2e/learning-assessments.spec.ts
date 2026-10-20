import { expect, test } from '@playwright/test';

const topicSlug = 'project-idea-mvp';
const quizStorageKey = 'ai-agents-quiz-attempts-v1';
const practicalStorageKey = 'ai-agents-practical-assessments-v1';
const activitySelector = '.learning-activities';

function quizSection(page: import('@playwright/test').Page) {
  return page.locator(activitySelector).getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
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
});
