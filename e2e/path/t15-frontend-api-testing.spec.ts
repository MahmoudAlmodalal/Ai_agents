import { test, expect } from '@playwright/test';

const TARGET_VIEWPORTS = [390, 768, 1024, 1366, 1440];

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const hasOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
}

async function checkResponsiveWidths(page: import('@playwright/test').Page) {
  for (const width of TARGET_VIEWPORTS) {
    await page.setViewportSize({ width, height: 900 });
    await expectNoHorizontalOverflow(page);
  }
}

test.describe('Sequential Project Path - Ticket 15: Frontend/API Integration and Testing', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Topic 45: reads the API contract guidance, handles sessions/errors, copies the example, and links to Testing', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/learn/frontend-backend-integration');

    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('ربط Frontend مع Backend');
    const article = page.locator('article').first();
    await expect(article).toContainText('docs/API_CONTRACTS.md');
    await expect(article).toContainText('docs/PERMISSIONS_MATRIX.md');
    await expect(article).toContainText('جلسة Cookie');
    await expect(article).toContainText('Bearer token');
    await expect(article).toContainText('HttpOnly');
    await expect(article).toContainText('SameSite');
    await expect(article).toContainText('401');
    await expect(article).toContainText('403');
    await expect(article).toContainText('network error');
    await expect(article).toContainText('الخادم يقرر');
    await expect(article).toContainText('POST /api/v1/loans');
    await expect(article).toContainText('هذه المادة لا تضيف API أو Backend إلى الموقع التعليمي');

    const copyButton = page.getByRole('button', { name: 'نسخ نمط طلب الواجهة' });
    await expect(copyButton).toBeVisible();
    await copyButton.focus();
    await expect(copyButton).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(copyButton).toContainText('✓ تم النسخ!');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('apiUrl');
    expect(copied).toContain('mapResponseUsingContract');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/full-stack-journey-testing');
    const previousLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(previousLink).toBeVisible();
    await expect(previousLink).toHaveAttribute('href', '/learn/services-selectors');

    await checkResponsiveWidths(page);
  });

  test('Topic 46: separates mocked Frontend from Full-Stack proof, labels Not Run, copies test sample, and returns to integration', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/learn/full-stack-journey-testing');

    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('Testing');
    const article = page.locator('article').first();
    await expect(article).toContainText('Frontend integration');
    await expect(article).toContainText('API / backend integration');
    await expect(article).toContainText('Full-Stack browser journey');
    await expect(article).toContainText('page.route');
    await expect(article).toContainText('Not Run');
    await expect(article).toContainText('Passed');
    await expect(article).toContainText('Failed');
    await expect(article).toContainText('POST /api/v1/loans');
    await expect(article).toContainText('201 Created');
    await expect(article).toContainText('409 Conflict');
    await expect(article).toContainText('قاعدة اختبار معزولة');
    await expect(article).toContainText('لا تعترض الطلب المستهدف');
    await expect(article).toContainText('نجاح اختبار Frontend لا يثبت أن Backend أو قاعدة البيانات يعملان');
    await expect(article).toContainText('لا تجمعها في علامة نجاح واحدة');

    const copyButton = page.getByRole('button', { name: 'نسخ مثال اختبار Frontend مع Mock' });
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('page.route');
    expect(copied).toContain('Frontend behavior only');

    const previousLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(previousLink).toBeVisible();
    await expect(previousLink).toHaveAttribute('href', '/learn/frontend-backend-integration');

    await checkResponsiveWidths(page);
  });
});
