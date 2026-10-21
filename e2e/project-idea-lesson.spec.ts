import { expect, test, type Locator, type Page } from '@playwright/test';

async function openPreview(page: Page) {
  await page.goto('/');
  const card = page.locator('article.topic-card').filter({ hasText: 'اختيار فكرة المشروع وتحديد MVP' }).first();
  await card.getByRole('button', { name: 'معاينة سريعة' }).click();
  const modal = page.locator('.modal-container-box');
  await expect(modal).toBeVisible();
  return modal.locator('#topic-01');
}

async function expectUsableLesson(lesson: Locator) {
  await expect(lesson.getByRole('heading', { name: 'قبل أن تبدأ: الهدف والمتطلبات والمخرج' })).toBeVisible();
  await expect(lesson).toContainText('docs/PROJECT_CONTEXT.md');
  await expect(lesson).toContainText('نطاق MVP قسم داخل الملف نفسه');
  await expect(lesson).toContainText('لا تحتاج خبرة في AI Agents');
  await expect(lesson).toContainText('BorrowHub مثال اختياري');

  const worked = lesson.locator('#borrowhub-worked-example');
  await expect(worked.getByRole('heading', { level: 4 })).toHaveCount(5);
  await expect(worked).toContainText('10 أيام تقويمية');
  await expect(worked).toContainText('دون حظر تلقائي');
  await expect(worked).toContainText('تسجيل التسليم والإرجاع الواقعيين بواسطة المسؤول');
  const completedContext = worked.locator('pre code');
  await expect(completedContext).toContainText('## افتراضات تحتاج تحققًا');
  await expect(completedContext).toContainText('## أسئلة مفتوحة ومصدر الإجابة');
  await expect(completedContext).toContainText('## معيار نجاح أولي وخطوة تالية');
  expect(await completedContext.innerText()).not.toMatch(/\[[^\]]+\]/);

  const exercise = lesson.locator('#own-project-exercise');
  await expect(exercise.locator('ol > li')).toHaveCount(6);
  await expect(exercise).toContainText('ميزتين على الأقل');
  await expect(exercise).toContainText('سؤالين محددين');
  await expect(lesson.locator('#idea-common-mistakes li')).toHaveCount(6);
  await expect(lesson.locator('#idea-review-criteria ol > li')).toHaveCount(5);
  await expect(lesson.getByRole('link', { name: 'Grill Me: استجواب الفكرة واستكشاف المتطلبات' })).toHaveAttribute('href', '/learn/discovery-grill-me');
}

test('first-topic full reader and preview expose the same worked lesson and own-project exercise', async ({ page }) => {
  await page.goto('/learn/project-idea-mvp');
  const fullLesson = page.locator('article #topic-01');
  await expectUsableLesson(fullLesson);
  const fullText = (await fullLesson.innerText()).replace(/\s+/g, ' ').trim();

  const previewLesson = await openPreview(page);
  await expectUsableLesson(previewLesson);
  expect((await previewLesson.innerText()).replace(/\s+/g, ' ').trim()).toEqual(fullText);
});

for (const reader of ['full reader', 'preview'] as const) {
  test(`copies the completed context, own-project template and review prompt in ${reader}`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    let lesson: Locator;
    if (reader === 'preview') {
      lesson = await openPreview(page);
    } else {
      await page.goto('/learn/project-idea-mvp');
      lesson = page.locator('article #topic-01');
    }

    const labels = [
      'نسخ مثال BorrowHub المحلول',
      'نسخ قالب سياق مشروعي',
      'نسخ برومبت مراجعة سياق المشروع',
    ];
    for (const label of labels) {
      const button = lesson.getByRole('button', { name: label, exact: true });
      const expected = await button.locator('xpath=ancestor::div[contains(@class,"code-container")]').locator('code').textContent();
      await button.click();
      await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
    }
  });
}

test('renders all lesson and activity sections for the project-idea-mvp Topic', async ({ page }) => {
  await page.goto('/learn/project-idea-mvp');

  // Authored lesson sections
  const lesson = page.locator('article #topic-01');
  await expect(lesson.getByRole('heading', { name: 'قبل أن تبدأ: الهدف والمتطلبات والمخرج' })).toBeVisible();
  await expect(lesson.getByRole('heading', { name: '1. افهم المشكلة قبل قائمة الميزات' })).toBeVisible();
  await expect(lesson.getByRole('heading', { name: '2. مثال محلول: من قصة BorrowHub إلى سياق المشروع' })).toBeVisible();
  await expect(lesson.getByRole('heading', { name: '3. دورك: تمرين موجّه على مشروعك' })).toBeVisible();
  await expect(lesson.getByRole('heading', { name: '4. أخطاء شائعة وكيف تصححها' })).toBeVisible();
  await expect(lesson.getByRole('heading', { name: '5. راجع المخرج قبل Grill Me' })).toBeVisible();

  // Structured activities sections
  const activities = page.locator('.learning-activities');
  await expect(activities).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'المدخل: موقف ومستخدم ومصدر معرفة' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'قرار النطاق: رحلة ذات قيمة من البداية إلى النتيجة' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'التسليم إلى Grill Me' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' })).toBeVisible();
  await expect(activities.getByRole('heading', { name: 'مراجعة ذاتية لمخرجات التمرين' })).toBeVisible();
});

test('practical steps and expected outputs are present and copyable', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/learn/project-idea-mvp');

  const activities = page.locator('.learning-activities');
  const stepsList = activities.locator('section[aria-labelledby*="-steps"] ol > li');
  await expect(stepsList).toHaveCount(2);

  // Step 1
  await expect(stepsList.nth(0)).toContainText('اختر مشروعك أنت، واكتب المشكلة والمستخدمين ومصدر كل معلومة');
  await expect(stepsList.nth(0)).toContainText('المخرج المتوقع:');
  await expect(stepsList.nth(0)).toContainText('docs/PROJECT_CONTEXT.md');

  // Step 2
  await expect(stepsList.nth(1)).toContainText('ارسم رحلة MVP مرقمة من بداية المهمة إلى ظهور النتيجة');
  await expect(stepsList.nth(1)).toContainText('المخرج المتوقع:');
  await expect(stepsList.nth(1)).toContainText('Topic 02');

  // Copy template from own-project exercise
  const copyTemplateBtn = page.getByRole('button', { name: 'نسخ قالب سياق مشروعي', exact: true });
  await expect(copyTemplateBtn).toBeVisible();
  const templateCode = await copyTemplateBtn.locator('xpath=ancestor::div[contains(@class,"code-container")]').locator('code').textContent();
  await copyTemplateBtn.click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(templateCode);
});

test('quiz grades responses and provides explanatory feedback', async ({ page }) => {
  await page.goto('/learn/project-idea-mvp');
  const quiz = page.locator('.learning-activities section[aria-labelledby*="-quiz"]');
  await expect(quiz).toBeVisible();

  const q1 = quiz.getByRole('group', { name: /لم تتحدث بعد/ });
  const q2 = quiz.getByRole('group', { name: /أي اقتراح يصف MVP/ });

  // Answer Q1 correctly, Q2 incorrectly
  await q1.getByRole('radio', { name: 'افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله', exact: true }).check();
  await q2.getByRole('radio', { name: 'ثلاث شاشات جميلة بلا حجز مكتمل', exact: true }).check();

  await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

  // Score banner
  await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

  // Status and explanation
  await expect(q1.getByRole('status')).toContainText('إجابة صحيحة');
  await expect(q1.getByRole('status')).toContainText('التوقع الذي لم يختبر بعد يظل افتراضاً');
  await expect(q2.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
  await expect(q2.getByRole('status')).toContainText('الرحلة ذات قيمة عندما تصل إلى نتيجة مفهومة للمستخدم');
});

test('checklist and rubric can be edited, reversed, and survive reload', async ({ page }) => {
  await page.goto('/learn/project-idea-mvp');

  // Rubric
  const activities = page.locator('.learning-activities');
  const problemCriterion = activities.getByRole('group', { name: 'صياغة المشكلة ودليلها' });
  const scopeCriterion = activities.getByRole('group', { name: 'اكتمال رحلة MVP وحدودها' });

  await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
  await scopeCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

  // Checklist
  const checklist = page.getByRole('complementary').getByRole('checkbox').first();
  await checklist.check();
  await expect(checklist).toBeChecked();

  // Reload and verify persistence
  await page.reload();
  await expect(problemCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
  await expect(scopeCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');
  await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();

  // Reverse rubric choices
  await problemCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
  await scopeCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('');

  // Reverse checklist
  await page.getByRole('complementary').getByRole('checkbox').first().uncheck();
  await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();

  // Reload and verify reversed state
  await page.reload();
  await expect(problemCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
  await expect(scopeCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
  await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
});

test('RTL prose and LTR technical text render correctly', async ({ page }) => {
  await page.goto('/learn/project-idea-mvp');

  // Document root has dir="rtl"
  expect(await page.locator('html').getAttribute('dir')).toBe('rtl');

  // Topic section has dir="rtl" and lang="ar"
  const topicSection = page.locator('#topic-01');
  expect(await topicSection.getAttribute('dir')).toBe('rtl');
  expect(await topicSection.getAttribute('lang')).toBe('ar');

  // Pre blocks have computed direction rtl
  const arabicPre = page.locator('article pre.code-content').first();
  await expect(arabicPre).toBeVisible();
  expect(await arabicPre.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');

  // Technical filenames / code have dir="ltr"
  const ltrCode = page.locator('article code[dir="ltr"]').first();
  await expect(ltrCode).toBeVisible();
  expect(await ltrCode.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');
});

test('mobile viewport at 390px has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  // Full reader page
  await page.goto('/learn/project-idea-mvp');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  // Quick preview modal
  await page.goto('/');
  const topicCard = page.locator('article.topic-card').filter({ hasText: 'اختيار فكرة المشروع وتحديد MVP' }).first();
  await topicCard.getByRole('button', { name: 'معاينة سريعة' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
});
