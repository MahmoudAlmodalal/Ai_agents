import { expect, test } from '@playwright/test';

test('glossary restores source terms and supports normalized Arabic and English search', async ({ page }) => {
  await page.goto('/glossary');
  const entries = page.locator('main article');
  await expect(entries).toHaveCount(35);
  const search = page.getByRole('searchbox', { name: 'ابحث في المصطلحات' });
  await search.fill('أَجْنَبِيَّة');
  await expect(entries).toHaveCount(1);
  await expect(entries).toContainText('PK / FK');
  await search.fill('sequence');
  await expect(entries).toContainText('Sequence Diagram');
  await search.fill('غير موجود 123');
  await expect(entries).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('لا توجد نتائج');
  await search.fill('');
  await expect(entries).toHaveCount(35);
});

test('BorrowHub explains source rules, staff handover, diagrams and honest case file availability', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/borrowhub');
  const rules = page.getByRole('region', { name: 'قواعد العمل الموثقة' });
  await expect(rules.locator('li')).toHaveCount(9);
  await expect(rules).toContainText('48 ساعة');
  await expect(rules).toContainText('10 أيام');
  await expect(rules).toContainText('دون حظر تلقائي');
  await expect(page.getByRole('region', { name: 'الأدوار والصلاحيات' })).toContainText('تأكيد التسليم والإرجاع');
  await expect(page.getByRole('region', { name: 'جداول المثال الخمسة' }).locator('li')).toHaveCount(5);
  await expect(page.getByRole('note')).toContainText('تعارض');
  const diagram = page.getByRole('region', { name: 'مسار الطالب الأساسي' });
  await expect(diagram.locator('svg')).toBeVisible();
  await page.getByRole('button', { name: 'نسخ برومبت مراجعة BorrowHub' }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('مسؤول المعمل');
  await expect(page.locator('[download]')).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'ملفات دراسة الحالة' })).toContainText('غير متاح');
  await page.getByRole('link', { name: 'تصميم الجداول وERD' }).click();
  await expect(page).toHaveURL('/learn/relational-erd-design');
  await expect(page.locator('h1')).toContainText('ERD');
});

test('FAQ distinguishes the full journey from Frontend stage and exposes published topic links', async ({ page }) => {
  await page.goto('/faq');
  const question = page.getByText('هل Stitch ينفذ Backend؟ وهل المسار Frontend فقط؟', { exact: true });
  await question.focus();
  await page.keyboard.press('Enter');
  const answer = page.locator('details').filter({ has: question });
  await expect(answer).toContainText('المسار Full-Stack');
  await expect(answer).toContainText('بيانات تمثيلية');
  await answer.getByRole('link').click();
  await expect(page).toHaveURL('/learn/frontend-backend-integration');
  await expect(page.locator('h1')).toContainText('Frontend');
});

test('BorrowHub modeling lessons preserve documented pickup origin and manual damage follow-up', async ({ page }) => {
  await page.goto('/learn/activity-diagram');
  await expect(page.locator('main')).toContainText('من تاريخ بداية الطلب');
  await expect(page.locator('main')).not.toContainText('تُفرض غرامة صيانة');
  await page.goto('/learn/state-diagram');
  await expect(page.locator('main')).not.toContainText('تسوية الغرامة');
  await expect(page.locator('main')).toContainText('تأكيد المسؤول');
});

for (const width of [390, 768, 1024, 1366, 1440]) {
  test(`reference pages support reading, keyboard, RTL, diagrams, copy and search at ${width}px`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.setViewportSize({ width, height: 900 });

    // 1. Glossary at width
    await page.goto('/glossary');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const search = page.getByRole('searchbox', { name: 'ابحث في المصطلحات' });
    await search.focus();
    await expect(search).toBeFocused();
    await search.fill('ERD');
    await expect(page.locator('main article')).toHaveCount(1);
    await expect(page.locator('main article')).toContainText('ERD');

    // 2. BorrowHub at width
    await page.goto('/borrowhub');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const diagram = page.getByRole('region', { name: 'مسار الطالب الأساسي' });
    await expect(diagram.locator('svg')).toBeVisible();
    const copyBtn = page.getByRole('button', { name: 'نسخ برومبت مراجعة BorrowHub' });
    await copyBtn.focus();
    await expect(copyBtn).toBeFocused();
    await copyBtn.click();
    await expect(page.getByRole('status')).toContainText('تم النسخ');

    // 3. FAQ at width
    await page.goto('/faq');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const summary = page.locator('summary').first();
    await summary.focus();
    await expect(summary).toBeFocused();
  });
}
