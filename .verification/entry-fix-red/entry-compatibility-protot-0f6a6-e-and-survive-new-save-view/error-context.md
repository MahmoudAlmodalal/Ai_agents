# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: entry-compatibility.spec.ts >> prototype-like unknown persisted strings in bookmarks and history do not crash homepage and survive new save/view
- Location: e2e/entry-compatibility.spec.ts:83:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })
Expected: visible
Timeout: 7000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('region', { name: 'محفوظات تحتاج اختيارًا' }) with timeout 7000ms
  - waiting for getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })

```

```yaml
- 'heading "Application error: a client-side exception has occurred while loading 127.0.0.1 (see the browser console for more information)." [level=2]'
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('historical User Flow save keeps its content meaning, not its mislabeled PRD title', async ({ page }) => {
  4   |   await page.goto('/');
  5   |   await page.evaluate(() => localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['topic-03', 'topic-05', 'unknown-historical-topic'])));
  6   |   await page.reload();
  7   |   const flow = page.locator('article.topic-card').filter({ has: page.locator('a[href="/learn/user-flow-modeling"]') });
  8   |   await expect(flow.getByRole('button', { name: 'إزالة من المفضلة', exact: true })).toBeVisible();
  9   |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('topic-05');
  10  |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('unknown-historical-topic');
  11  |   await page.locator('article.topic-card').first().getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
  12  |   expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]')))
  13  |     .toEqual(['user-flow-modeling', 'topic-05', 'unknown-historical-topic', 'project-idea-mvp']);
  14  |   await expect(page.locator('article.topic-card')).toHaveCount(58);
  15  |   await expect(page.getByText('المحاضرة الرابعة — بانتظار اعتماد المحتوى', { exact: true })).toHaveCount(0);
  16  | });
  17  | 
  18  | test('ambiguous recent history survives subsequent reading and the five-item display limit', async ({ page }) => {
  19  |   await page.goto('/');
  20  |   await page.evaluate(() => localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify([
  21  |     'topic-06', 'unknown-historical-recent', 'project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'srs', 'git-project-docs',
  22  |   ])));
  23  |   await page.goto('/learn/user-flow-modeling');
  24  |   await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
  25  |   await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
  26  |     .toEqual(['user-flow-modeling', 'project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'srs', 'topic-06', 'unknown-historical-recent']);
  27  |   await page.goto('/');
  28  |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('طبقات النظام');
  29  | });
  30  | 
  31  | for (const width of [390, 768, 1024, 1366, 1440]) {
  32  |   test(`entry question explains both answers and opens the first topic with a keyboard at ${width}px`, async ({ page }) => {
  33  |     await page.setViewportSize({ width, height: 900 });
  34  |     await page.goto('/');
  35  |     const setup = page.getByRole('button', { name: 'أثبت وكيل البرمجة وSkills وMCP أولًا', exact: true });
  36  |     await expect(setup).toBeEnabled();
  37  |     await setup.focus();
  38  |     await page.keyboard.press('Enter');
  39  |     await expect(page.getByRole('status').filter({ hasText: 'تأتي أدوات التنفيذ عند بدء كود الفرونت' })).toBeVisible();
  40  |     await expect(setup).toHaveAttribute('aria-pressed', 'true');
  41  |     await page.getByRole('button', { name: 'أفهم المشكلة والمستخدم وأحدد نطاق النسخة الأولى', exact: true }).click();
  42  |     await expect(page.getByRole('status').filter({ hasText: 'صحيح. ابدأ بسياق مشروعك' })).toBeVisible();
  43  |     await expect(page.getByText('المدة الرسمية للبرنامج: 40 ساعة.', { exact: false })).toBeVisible();
  44  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  45  |     const first = page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true });
  46  |     await first.focus();
  47  |     await page.keyboard.press('Enter');
  48  |     await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
  49  |   });
  50  | }
  51  | 
  52  | test('Start and About describe the same Full-Stack program and postpone execution setup', async ({ page }) => {
  53  |   await page.goto('/start');
  54  |   await expect(page.getByRole('main')).toContainText('40 ساعة');
  55  |   await expect(page.getByRole('main')).toContainText('Full-Stack');
  56  |   await expect(page.getByRole('main')).toContainText('لا يلزم تثبيت وكيل أو Skills أو MCP للبدء');
  57  |   await expect(page.getByRole('region', { name: 'مسار مشروعك' }).getByRole('listitem')).toHaveCount(58);
  58  |   await page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true }).click();
  59  |   await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
  60  |   await page.goto('/about');
  61  |   await expect(page.getByRole('main')).toContainText('40 ساعة');
  62  |   await expect(page.getByRole('main')).toContainText('Full-Stack');
  63  |   await expect(page.getByRole('main')).toContainText('BorrowHub مثال اختياري');
  64  | });
  65  | 
  66  | test('old lecture and reference URLs reach available topics and references', async ({ page }) => {
  67  |   await page.goto('/lectures/04-pending');
  68  |   await expect(page).toHaveURL(/\/learn\/git-project-docs\/?$/);
  69  |   await expect(page.getByRole('heading', { level: 1 })).toContainText('Git');
  70  |   await page.goto('/learn/borrowhub-reference');
  71  |   await expect(page).toHaveURL(/\/faq\/?$/);
  72  |   await page.goto('/learn/prompt-library');
  73  |   await expect(page).toHaveURL(/\/prompts\/?$/);
  74  |   await page.goto('/roadmap');
  75  |   await expect(page).toHaveURL(/\/start#project-path$/);
  76  |   await page.goto('/roadmap/20');
  77  |   await expect(page).toHaveURL(/\/learn\/project-demo-day\/?$/);
  78  |   await page.goto('/roadmap/2');
  79  |   await expect(page).toHaveURL(/\/start#project-path$/);
  80  |   await expect(page.getByRole('region', { name: 'مسار مشروعك' }).getByRole('listitem')).toHaveCount(58);
  81  | });
  82  | 
  83  | test('prototype-like unknown persisted strings in bookmarks and history do not crash homepage and survive new save/view', async ({ page }) => {
  84  |   await page.goto('/');
  85  |   await page.evaluate(() => {
  86  |     localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['__proto__', 'constructor']));
  87  |     localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['toString', 'topic-06']));
  88  |   });
  89  |   await page.reload();
  90  | 
  91  |   // Homepage remains usable
  92  |   await expect(page.locator('article.topic-card').first()).toBeVisible();
  93  |   await expect(page.locator('article.topic-card')).toHaveCount(58);
  94  | 
  95  |   // Explicit unresolved state for prototype-like unknown IDs
  96  |   const unresolvedSection = page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' });
> 97  |   await expect(unresolvedSection).toBeVisible();
      |                                   ^ Error: expect(locator).toBeVisible() failed
  98  |   await expect(unresolvedSection).toContainText('__proto__');
  99  |   await expect(unresolvedSection).toContainText('constructor');
  100 |   await expect(unresolvedSection).toContainText('toString');
  101 |   await expect(unresolvedSection).toContainText('عنصر قديم غير معروف');
  102 |   await expect(unresolvedSection).toContainText('تعذرت المطابقة؛ ما زال المعرّف محفوظًا على هذا الجهاز.');
  103 | 
  104 |   // Original identifiers survive a new bookmark save
  105 |   const firstCard = page.locator('article.topic-card').first();
  106 |   await firstCard.getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
  107 |   const savedBookmarks = await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]'));
  108 |   expect(savedBookmarks).toContain('__proto__');
  109 |   expect(savedBookmarks).toContain('constructor');
  110 |   expect(savedBookmarks).toContain('project-idea-mvp');
  111 | 
  112 |   // Original identifiers survive a new topic view
  113 |   await page.goto('/learn/user-flow-modeling');
  114 |   await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
  115 |   await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
  116 |     .toEqual(expect.arrayContaining(['user-flow-modeling', 'topic-06', 'toString']));
  117 | 
  118 |   // Navigating back preserves unresolved state and usable homepage
  119 |   await page.goto('/');
  120 |   await expect(page.locator('article.topic-card').first()).toBeVisible();
  121 |   await expect(page.getByRole('region', { name: 'محفوظات تحتاج اختيارًا' })).toContainText('toString');
  122 | });
  123 | 
```