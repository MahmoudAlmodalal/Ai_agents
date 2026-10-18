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
