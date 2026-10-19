import { test, expect } from '@playwright/test';

test('reference templates expose fourteen honest availability states and copyable fields', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/templates');
  await expect(page.getByRole('heading', { name: 'القوالب المرجعية الأربعة عشر' })).toBeVisible();
  await expect(page.locator('article')).toHaveCount(14);
  await expect(page.getByText('غير متاح للتنزيل', { exact: true })).toHaveCount(14);
  await expect(page.locator('a[download]')).toHaveCount(0);
  const sequence = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Sequence Template', exact: true }) });
  await sequence.getByRole('button', { name: 'نسخ الحقول المرجعية' }).click();
  await expect(page.getByRole('status')).toContainText('تم نسخ');
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('Participants + Messages + Alternatives');
  await sequence.getByRole('link', { name: 'موضوع الاستخدام' }).click();
  await expect(page).toHaveURL(/\/learn\/sequence-diagram-modeling$/);
});

test('tools guide delays coding setup and supports verified command copy and directory filtering', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/tools');
  await expect(page.getByRole('heading', { name: 'الأدوات — ماذا تستخدم؟ ومتى؟' })).toBeVisible();
  await expect(page.getByText('إعداد أدوات التنفيذ يبدأ عند بدء كود الفرونت')).toBeVisible();
  const next = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Next.js', exact: true }) });
  await expect(next).toContainText('المدخلات');
  await expect(next).toContainText('دورة الحياة');
  await next.getByRole('button', { name: 'نسخ الأمر' }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('npx create-next-app@latest');
  await expect(next.getByRole('link', { name: 'المصدر الرسمي' })).toHaveAttribute('href', 'https://nextjs.org/docs/app/api-reference/cli/create-next-app');
  await page.getByRole('button', { name: /إضافة VS Code/ }).click();
  const directory = page.getByRole('region', { name: 'دليل وكلاء البرمجة التكميلي' });
  await expect(directory.getByRole('heading', { name: /كلاين/ })).toBeVisible();
  await expect(directory.getByRole('heading', { name: /كلود كود/ })).toHaveCount(0);
});

test('reference topic destinations resolve and reference pages fit phone and desktop widths', async ({ page, request }) => {
  for (const route of ['/templates', '/tools']) {
    await page.goto(route);
    const destinations = await page.getByRole('link', { name: 'موضوع الاستخدام', exact: true }).evaluateAll((links) => links.map((link) => link.getAttribute('href')!));
    for (const destination of new Set(destinations)) {
      const response = await request.get(destination);
      expect(response.status(), destination).toBe(200);
    }
    for (const width of [390, 768, 1024, 1366, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
});

test('Tailwind lesson prepares versioned token mapping before Next project bootstrap', async ({ page }) => {
  await page.goto('/learn/tailwind-css-responsive');
  await expect(page.locator('article')).toContainText('Tailwind v4');
  await expect(page.locator('article')).toContainText('@theme');
  await expect(page.locator('article')).toContainText('الموضوع 33');
  await expect(page.locator('article')).toContainText('قيم توضيحية');
  await expect(page.locator('header.rounded-3xl')).toContainText('src/app/globals.css');
  await page.goto('/learn/typescript-types');
  await expect(page.locator('article')).toContainText("'student' | 'staff' | 'admin'");
  await expect(page.locator('article')).not.toContainText("'faculty'");
});
