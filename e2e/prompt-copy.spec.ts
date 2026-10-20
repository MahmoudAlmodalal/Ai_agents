import { test, expect } from '@playwright/test';

test.describe('Prompt Library Journey', () => {
  test('searches, filters, opens a prompt by keyboard, and copies the complete text', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/prompts');
    await expect(page.getByRole('heading', { level: 1, name: 'مكتبة البرومبتات' })).toBeVisible();

    const cards = page.locator('a[href^="/prompts/"]');
    const fullLibraryCount = await cards.count();
    await expect(page.getByTestId('prompt-library-count')).toContainText(`${fullLibraryCount} نصًا قابلًا للنسخ`);
    expect(fullLibraryCount).toBeGreaterThan(30);

    const search = page.getByRole('searchbox', { name: 'ابحث في البرومبتات' });
    await search.fill('User Flow');
    await expect(cards.filter({ hasText: 'User Flow' }).first()).toBeVisible();
    await expect(page.getByText(/يعرض \d+ من/)).toBeVisible();

    await search.fill('');
    await page.getByLabel('صفِّ حسب نوع العملية').selectOption('توليد مخطط');
    const filteredCards = page.locator('a[href^="/prompts/"]');
    await expect(filteredCards.first()).toBeVisible();
    await expect(filteredCards.first()).toContainText('توليد مخطط');

    await page.getByLabel('صفِّ حسب نوع العملية').selectOption('all');
    const firstPromptCard = page.locator('a[href="/prompts/prompt-01-grill-me-product-discovery"]');
    await firstPromptCard.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/prompts\/prompt-01-grill-me-product-discovery$/);

    const promptBody = page.locator('pre').last();
    const fullPromptText = await promptBody.textContent();
    const copyButton = page.getByRole('button', { name: 'نسخ النسخة المحددة' });
    await expect(copyButton).toBeVisible();
    await copyButton.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(fullPromptText);

    await expect(page.getByRole('link', { name: 'اختيار فكرة المشروع وتحديد MVP' })).toHaveAttribute('href', '/learn/project-idea-mvp');
  });

  test('reports a clipboard failure instead of claiming the prompt was copied', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => { throw new Error('permission denied'); } },
      });
      document.execCommand = () => false;
    });
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('النص الكامل ظاهر؛ حدده وانسخه يدويًا');
    await expect(page.getByRole('status')).not.toContainText('تم نسخ النص الكامل للنسخة المحددة.');
  });

  test('copies the complete selected prompt through the legacy clipboard fallback when the Clipboard API is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
      document.execCommand = (command: string) => {
        (window as typeof window & { legacyCopiedText?: string }).legacyCopiedText = document.querySelector('textarea')?.value;
        return command === 'copy';
      };
    });
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    const fullText = await page.locator('pre').last().textContent();
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => (window as typeof window & { legacyCopiedText?: string }).legacyCopiedText)).toBe(fullText);
  });

  test('links the deployment example to the canonical backend and database topic', async ({ page }) => {
    await page.goto('/prompts/stage-example-deployment');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('مثال مرحلي: النشر');
    const relatedTopics = page.getByRole('heading', { name: 'الموضوعات المرتبطة' }).locator('xpath=..');
    const deploymentTopic = relatedTopics.getByRole('link', { name: 'نشر Backend وربطه بقاعدة البيانات' });
    await expect(deploymentTopic).toHaveAttribute('href', '/learn/backend-database-deployment');
    await deploymentTopic.click();
    await expect(page).toHaveURL(/\/learn\/backend-database-deployment$/);
  });
});
