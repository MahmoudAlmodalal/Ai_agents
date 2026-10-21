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
  await expect(page).toHaveURL(/\/learn\/sequence-diagram-modeling$/, { timeout: 15000 });
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

test('tools guide presents sixteen tools with usage stages, review dates, pitfalls, examples, and non-color-reliant verification badges', async ({ page }) => {
  await page.goto('/tools');
  const toolsSection = page.getByRole('region', { name: 'دليل أدوات المسار' });
  const articles = toolsSection.locator('article');
  await expect(articles).toHaveCount(16);

  const expectedTools = [
    'Grill Me',
    'Google AI Studio',
    'Git',
    'GitHub',
    'Mermaid Live',
    'PlantUML / PlantText',
    'dbdiagram.io',
    'Google Stitch',
    'Stitch MCP',
    'DESIGN.md',
    'Node.js + npm',
    'Next.js',
    'UI/UX Pro Max',
    'GitHub Spec Kit',
    'Python 3.11 + uv',
    'Antigravity CLI / IDE',
  ];

  for (let i = 0; i < expectedTools.length; i++) {
    const card = articles.nth(i);
    await expect(card.getByRole('heading', { level: 2 })).toHaveText(expectedTools[i]);
    await expect(card).toContainText('مرحلة الاستخدام');
    await expect(card).toContainText('تاريخ مراجعة المصدر');
    await expect(card).toContainText('أشهر عقبة عملية');
    await expect(card).toContainText('مثال تطبيقي');
    await expect(card).toContainText('متى تستخدمها');
    await expect(card).toContainText('المدخلات');
    await expect(card).toContainText('المخرجات');
    await expect(card).toContainText('دورة الحياة');
    await expect(card.getByRole('link', { name: 'المصدر الرسمي' })).toBeVisible();
    await expect(card.getByRole('link', { name: 'موضوع الاستخدام' })).toBeVisible();

    const badge = card.locator('[data-verification-status]');
    await expect(badge).toBeVisible();
    const statusText = await badge.innerText();
    const validStatuses = ['موثّق من مصدر رسمي', 'اختياري', 'لم يُختبر التثبيت'];
    expect(validStatuses.some((s) => statusText.includes(s))).toBe(true);
    expect(/^[✓◇⚠]/.test(statusText.trim())).toBe(true);
  }
});

test('diagrams guide displays eight diagrams with core questions, decision rules, inputs, and editor links', async ({ page }) => {
  await page.goto('/diagrams');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('مختبر المخططات الثمانية');
  const articles = page.locator('article');
  await expect(articles).toHaveCount(8);
  for (const card of await articles.all()) {
    await expect(card.getByText('السؤال المحوري:', { exact: true })).toBeVisible();
    await expect(card.locator('ul li')).toHaveCount(3);
    await expect(card.getByText('المدخلات المطلوبة قبل الرسم:', { exact: true })).toBeVisible();
    await expect(card.getByText('المحرر المناسب:', { exact: true })).toBeVisible();
    await expect(card.getByRole('link', { name: 'موضوع الاستخدام' })).toBeVisible();
    await expect(card.getByRole('link', { name: 'المختبر التفاعلي' })).toBeVisible();
  }
});

test('reference topic destinations resolve and reference pages fit phone and desktop widths', async ({ page, request }) => {
  for (const route of ['/templates', '/tools', '/diagrams']) {
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
  await expect(page.locator('article').first()).toContainText('Tailwind v4');
  await expect(page.locator('article').first()).toContainText('@theme');
  await expect(page.locator('article').first()).toContainText('الموضوع 33');
  await expect(page.locator('article').first()).toContainText('قيم توضيحية');
  await expect(page.locator('header.rounded-3xl')).toContainText('src/app/globals.css');
  await page.goto('/learn/typescript-types');
  await expect(page.locator('article').first()).toContainText("'student' | 'staff' | 'admin'");
  await expect(page.locator('article').first()).not.toContainText("'faculty'");
});
