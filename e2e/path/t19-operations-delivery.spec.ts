import { test, expect } from '@playwright/test';

const lessons = [
  {
    slug: 'project-operations-runbook',
    title: 'CI/CD والمراقبة والنسخ الاحتياطي والتراجع',
    output: 'docs/OPERATIONS_RUNBOOK.md',
    expected: ['قدرات الاستضافة الفعلية', 'docs/RESTORE_DRILL.md', 'غير متاح', 'استعادة البيانات'],
  },
  {
    slug: 'project-handoff-package',
    title: 'توثيق وتسليم المشروع',
    output: 'docs/HANDOFF.md',
    expected: ['التسليم دليل', 'Passed', 'Failed', 'Not Run', 'لا تضع ملف'],
  },
  {
    slug: 'project-demo-day',
    title: 'Demo Day: عرض الفكرة والقرارات والقيود',
    output: 'docs/DEMO_DAY_SCRIPT.md',
    expected: ['خطة احتياطية', 'بيانات تجريبية غير حساسة', 'تفاعلًا مباشرًا', 'قرارًا تقنيًا مهمًا'],
  },
  {
    slug: 'project-portfolio-entry',
    title: 'Portfolio: عرض المساهمة والنتائج بصدق',
    output: 'docs/PORTFOLIO_ENTRY.md',
    expected: ['خط الأساس', 'لم أقس أثرها بعد', 'أداة', 'قيود'],
  },
];

test.describe('Sequential Project Path — Ticket 19: Operations and delivery', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__copiedLessonText = '';
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (text: string) => { (window as any).__copiedLessonText = text; } },
      });
    });
  });

  for (const lesson of lessons) {
    test(`${lesson.title}: readable RTL page, output, and copy action`, async ({ page }) => {
      await page.goto(`/learn/${lesson.slug}`);
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);

      const header = page.locator('header.rounded-3xl');
      await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
      await expect(header).toContainText(lesson.output);

      const content = page.locator('article').first();
      for (const phrase of lesson.expected) await expect(content).toContainText(phrase);
      await expect(content.locator('.code-container')).toBeVisible();
      const copyButton = content.locator('.copy-btn').first();
      const sourceText = await copyButton.locator('xpath=ancestor::*[contains(@class,"code-container")]').locator('code').textContent();
      await copyButton.click();
      await expect.poll(() => page.evaluate(() => (window as any).__copiedLessonText)).toBe(sourceText);
      await expect(copyButton).toContainText('تم النسخ');
      await expect(page.getByRole('navigation', { name: 'التنقل بين المواضيع' })).toBeVisible();
    });
  }

  test('follows the handoff, Demo Day, and Portfolio sequence', async ({ page }) => {
    await page.goto('/learn/project-operations-runbook');
    const operationsNavigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    const nextHandoff = operationsNavigation.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextHandoff).toHaveAttribute('href', '/learn/project-handoff-package');
    await nextHandoff.click();

    const handoffNavigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(handoffNavigation.getByRole('link', { name: /الموضوع السابق/ })).toHaveAttribute('href', '/learn/project-operations-runbook');
    const nextDemo = handoffNavigation.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextDemo).toHaveAttribute('href', '/learn/project-demo-day');
    await nextDemo.click();

    const demoNavigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(demoNavigation.getByRole('link', { name: /الموضوع السابق/ })).toHaveAttribute('href', '/learn/project-handoff-package');
    const nextPortfolio = demoNavigation.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextPortfolio).toHaveAttribute('href', '/learn/project-portfolio-entry');
    await nextPortfolio.click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Portfolio: عرض المساهمة والنتائج بصدق');
    await expect(page.getByRole('navigation', { name: 'التنقل بين المواضيع' }).getByRole('link', { name: /الموضوع السابق/ }))
      .toHaveAttribute('href', '/learn/project-demo-day');
  });

  test('references resolve to the existing prompt library and templates pages', async ({ page }) => {
    await page.goto('/learn/project-handoff-package');
    const article = page.locator('article').first();
    await expect(article.getByRole('link', { name: 'الملفات والقوالب' })).toHaveAttribute('href', '/templates');
    const promptLibrary = article.getByRole('link', { name: 'مكتبة البرومبتات' });
    await expect(promptLibrary).toHaveAttribute('href', '/prompts');
    await promptLibrary.click();
    await expect(page).toHaveURL(/\/prompts\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('مكتبة البرومبتات');

    await page.goBack();
    await page.locator('article').first().getByRole('link', { name: 'الملفات والقوالب' }).click();
    await expect(page).toHaveURL(/\/templates\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('القوالب المرجعية الأربعة عشر');

    await page.goto('/learn/project-portfolio-entry');
    await expect(page.locator('article').first().getByRole('link', { name: 'مكتبة البرومبتات' })).toHaveAttribute('href', '/prompts');
    await expect(page.locator('article').first().getByRole('link', { name: 'الملفات والقوالب' })).toHaveAttribute('href', '/templates');
  });
});
