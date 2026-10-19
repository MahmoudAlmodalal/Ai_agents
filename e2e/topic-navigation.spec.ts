import { test, expect } from '@playwright/test';

test.describe('Topic Navigation Journey', () => {
  test('opens the full reader directly and follows the real first and second topics', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('article.topic-card').first();
    await expect(firstCard).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(firstCard).toContainText('docs/PROJECT_CONTEXT.md');
    await expect(firstCard.getByRole('button', { name: /عرض المخطط البياني/ })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'ابدأ بالموضوع الأول' })).toHaveAttribute('href', '/learn/project-idea-mvp');
    await firstCard.getByRole('link', { name: 'قراءة الموضوع كاملاً' }).click();

    await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('اختيار فكرة المشروع وتحديد MVP');
    await expect(page.getByText('خطوات التطبيق على مشروعك', { exact: true })).toBeVisible();
    await expect(page.getByRole('complementary')).toContainText('قائمة تحقق التطبيق');

    // Check bounds on the full reader before leaving it.
    const navigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(navigation.getByRole('link', { name: /الموضوع السابق/ })).toHaveCount(0);
    const nextLink = navigation.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/discovery-grill-me');
    // Navigation remains available with every self-assessment box unchecked.
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
    await nextLink.click();
    await expect(page).toHaveURL(/\/learn\/discovery-grill-me\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('استجواب الفكرة واستكشاف المتطلبات (Grill Me)');
    await expect(page.getByRole('navigation', { name: 'التنقل بين المواضيع' }).getByRole('link', { name: /الموضوع السابق/ }))
      .toHaveAttribute('href', '/learn/project-idea-mvp');
  });

  test('last available topic has a previous link and no invented next topic', async ({ page }) => {
    await page.goto('/learn/project-portfolio-entry');
    const navigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(navigation.getByRole('link', { name: /الموضوع السابق/ })).toHaveAttribute('href', '/learn/project-demo-day');
    await expect(navigation.getByRole('link', { name: /الموضوع التالي/ })).toHaveCount(0);
    await expect(navigation).toContainText('آخر موضوع متاح');
  });

  test('optional preview traps keyboard focus and restores its opener', async ({ page }) => {
    await page.goto('/');
    const previewButton = page.locator('article.topic-card').first().getByRole('button', { name: 'معاينة سريعة' });
    await previewButton.click();
    const dialog = page.getByRole('dialog', { name: 'اختيار فكرة المشروع وتحديد MVP' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'إغلاق', exact: true })).toBeFocused();
    await expect(dialog.getByRole('region', { name: 'المخطط الهندسي التفاعلي' })).toHaveCount(0);
    await expect(dialog.getByRole('link', { name: 'قراءة الموضوع كاملاً', exact: true })).toHaveAttribute('href', '/learn/project-idea-mvp');

    const firstButton = dialog.getByRole('button').first();
    const lastButton = dialog.getByRole('button').last();
    await firstButton.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(lastButton).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(firstButton).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(previewButton).toBeFocused();
  });

  test('copy buttons work in the full reader and optional preview', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (text: string) => { (window as any).__copiedTopicText = text; } },
      });
    });
    await page.goto('/learn/project-idea-mvp');
    const fullCopyButton = page.locator('article .copy-btn').first();
    const fullText = await fullCopyButton.locator('xpath=ancestor::*[contains(@class,"code-container")]').locator('code').textContent();
    await fullCopyButton.click();
    await expect.poll(() => page.evaluate(() => (window as any).__copiedTopicText)).toBe(fullText);

    await page.goto('/');
    await page.locator('article.topic-card').first().getByRole('button', { name: 'معاينة سريعة' }).click();
    const previewCopyButton = page.getByRole('dialog').locator('.copy-btn').first();
    const previewText = await previewCopyButton.locator('xpath=ancestor::*[contains(@class,"code-container")]').locator('code').textContent();
    await previewCopyButton.click();
    await expect.poll(() => page.evaluate(() => (window as any).__copiedTopicText)).toBe(previewText);
  });

  test('retired composite routes reach the active index without a conflicting reader', async ({ page }) => {
    await page.goto('/learn/requirements-grill-me');
    await expect(page).toHaveURL(/\/#topics$/);
    await expect(page.locator('article.topic-card')).toHaveCount(58);
    await expect(page.getByText('المحتوى متاح؛ خطوات التطبيق والمخرجات قيد الاستكمال', { exact: true })).toHaveCount(0);
  });

  test('copy feedback keeps authored DOM and application checklist state after toast updates', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      (window as any).__copyWrites = [];
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (text: string) => { (window as any).__copyWrites.push(text); } },
      });
    });

    await page.goto('/learn/ai-coding-agent');
    const inlineCopy = page.locator('article .copy-btn').first();
    const expectedText = await inlineCopy.locator('xpath=ancestor::*[contains(@class,"code-container")]').locator('code').textContent();
    await inlineCopy.click();
    await expect(page.getByRole('status').filter({ hasText: 'تم نسخ المحتوى إلى الحافظة بنجاح' })).toBeVisible();
    await expect(inlineCopy).toContainText('تم النسخ');
    expect(await page.evaluate(() => (window as any).__copyWrites)).toEqual([expectedText]);

    await page.goto('/learn/project-idea-mvp');
    const inlineCheckbox = page.getByRole('complementary').getByRole('checkbox').first();
    await inlineCheckbox.check();
    const legacyCopy = page.locator('article .copy-btn').first();
    await legacyCopy.click();
    await expect(page.getByRole('status').filter({ hasText: 'تم نسخ المحتوى إلى الحافظة بنجاح' })).toBeVisible();
    await expect(legacyCopy).toContainText('تم النسخ');
    await expect(inlineCheckbox).toBeChecked();
    await inlineCheckbox.uncheck();
    await page.reload();
    // Wait for a real reader interaction after hydration before checking restore.
    await legacyCopy.click();
    await expect(page.getByRole('status').filter({ hasText: 'تم نسخ المحتوى إلى الحافظة بنجاح' })).toBeVisible();
    await expect(inlineCheckbox).not.toBeChecked();
    expect(errors).toEqual([]);
  });
});
