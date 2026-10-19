import { test, expect } from '@playwright/test';

test('historical User Flow save keeps its content meaning, not its mislabeled PRD title', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['topic-03', 'topic-05', 'unknown-historical-topic'])));
  await page.reload();
  const flow = page.locator('article.topic-card').filter({ has: page.locator('a[href="/learn/user-flow-modeling"]') });
  await expect(flow.getByRole('button', { name: 'إزالة من المفضلة', exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('topic-05');
  await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('unknown-historical-topic');
  await page.locator('article.topic-card').first().getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]')))
    .toEqual(['user-flow-modeling', 'topic-05', 'unknown-historical-topic', 'project-idea-mvp']);
  await expect(page.locator('article.topic-card')).toHaveCount(58);
  await expect(page.getByText('المحاضرة الرابعة — بانتظار اعتماد المحتوى', { exact: true })).toHaveCount(0);
});

test('ambiguous recent history survives subsequent reading and the five-item display limit', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify([
    'topic-06', 'unknown-historical-recent', 'project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'srs', 'git-project-docs',
  ])));
  await page.goto('/learn/user-flow-modeling');
  await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
    .toEqual(['user-flow-modeling', 'project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'srs', 'topic-06', 'unknown-historical-recent']);
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('طبقات النظام');
});

for (const width of [390, 768, 1024, 1366, 1440]) {
  test(`entry question explains both answers and opens the first topic with a keyboard at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const setup = page.getByRole('button', { name: 'أثبت وكيل البرمجة وSkills وMCP أولًا', exact: true });
    await expect(setup).toBeEnabled({ timeout: 15000 });
    await setup.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status').filter({ hasText: 'تأتي أدوات التنفيذ عند بدء كود الفرونت' })).toBeVisible();
    await expect(setup).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'أفهم المشكلة والمستخدم وأحدد نطاق النسخة الأولى', exact: true }).click();
    await expect(page.getByRole('status').filter({ hasText: 'صحيح. ابدأ بسياق مشروعك' })).toBeVisible();
    await expect(page.getByText('المدة الرسمية للبرنامج: 40 ساعة.', { exact: false })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const first = page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true });
    await first.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
  });
}

test('Start and About describe the same Full-Stack program and postpone execution setup', async ({ page }) => {
  await page.goto('/start');
  await expect(page.getByRole('main')).toContainText('40 ساعة');
  await expect(page.getByRole('main')).toContainText('Full-Stack');
  await expect(page.getByRole('main')).toContainText('لا يلزم تثبيت وكيل أو Skills أو MCP للبدء');
  await expect(page.getByRole('region', { name: 'مسار مشروعك' }).getByRole('listitem')).toHaveCount(58);
  await page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true }).click();
  await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
  await page.goto('/about');
  await expect(page.getByRole('main')).toContainText('40 ساعة');
  await expect(page.getByRole('main')).toContainText('Full-Stack');
  await expect(page.getByRole('main')).toContainText('BorrowHub مثال اختياري');
});

test('old lecture and reference URLs reach available topics and references', async ({ page }) => {
  await page.goto('/lectures/04-pending');
  await expect(page).toHaveURL(/\/learn\/git-project-docs\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Git');
  await page.goto('/learn/borrowhub-reference');
  await expect(page).toHaveURL(/\/faq\/?$/);
  await page.goto('/learn/prompt-library');
  await expect(page).toHaveURL(/\/prompts\/?$/);
  await page.goto('/roadmap');
  await expect(page).toHaveURL(/\/start#project-path$/);
  await page.goto('/roadmap/20');
  await expect(page).toHaveURL(/\/learn\/project-demo-day\/?$/);
  await page.goto('/roadmap/2');
  await expect(page).toHaveURL(/\/start#project-path$/);
  await expect(page.getByRole('region', { name: 'مسار مشروعك' }).getByRole('listitem')).toHaveCount(58);
});

test('prototype-like unknown persisted strings in bookmarks and history do not crash homepage and survive new save/view', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['__proto__', 'constructor']));
    localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['toString', 'topic-06']));
  });
  await page.reload();

  // Homepage remains usable
  await expect(page.locator('article.topic-card').first()).toBeVisible();
  await expect(page.locator('article.topic-card')).toHaveCount(58);

  // Explicit unresolved state for prototype-like unknown IDs
  const unresolvedSection = page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' });
  await expect(unresolvedSection).toBeVisible();
  await expect(unresolvedSection).toContainText('__proto__');
  await expect(unresolvedSection).toContainText('constructor');
  await expect(unresolvedSection).toContainText('toString');
  await expect(unresolvedSection).toContainText('عنصر قديم غير معروف');
  await expect(unresolvedSection).toContainText('تعذرت المطابقة؛ ما زال المعرّف محفوظًا على هذا الجهاز.');

  // Original identifiers survive a new bookmark save
  const firstCard = page.locator('article.topic-card').first();
  await firstCard.getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
  const savedBookmarks = await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]'));
  expect(savedBookmarks).toContain('__proto__');
  expect(savedBookmarks).toContain('constructor');
  expect(savedBookmarks).toContain('project-idea-mvp');

  // Original identifiers survive a new topic view
  await page.goto('/learn/user-flow-modeling');
  await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
    .toEqual(expect.arrayContaining(['user-flow-modeling', 'topic-06', 'toString']));

  // Navigating back preserves unresolved state and usable homepage
  await page.goto('/');
  await expect(page.locator('article.topic-card').first()).toBeVisible();
  await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('toString');
});
