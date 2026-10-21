# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: path/t19-operations-delivery.spec.ts >> Sequential Project Path — Ticket 19: Operations and delivery >> references resolve to the existing prompt library and templates pages
- Location: e2e/path/t19-operations-delivery.spec.ts:86:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('heading', { level: 1 })
Expected substring: "الملفات والقوالب"
Received string:    "القوالب المرجعية الأربعة عشر"
Timeout: 7000ms

Call log:
  - Expect "toContainText" getByRole('heading', { level: 1 }) with timeout 7000ms
  - waiting for getByRole('heading', { level: 1 })
    18 × locator resolved to <h1 class="text-3xl font-black sm:text-5xl">القوالب المرجعية الأربعة عشر</h1>
       - unexpected value "القوالب المرجعية الأربعة عشر"

```

```yaml
- heading "القوالب المرجعية الأربعة عشر" [level=1]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const lessons = [
  4   |   {
  5   |     slug: 'project-operations-runbook',
  6   |     title: 'CI/CD والمراقبة والنسخ الاحتياطي والتراجع',
  7   |     output: 'docs/OPERATIONS_RUNBOOK.md',
  8   |     expected: ['قدرات الاستضافة الفعلية', 'docs/RESTORE_DRILL.md', 'غير متاح', 'استعادة البيانات'],
  9   |   },
  10  |   {
  11  |     slug: 'project-handoff-package',
  12  |     title: 'توثيق وتسليم المشروع',
  13  |     output: 'docs/HANDOFF.md',
  14  |     expected: ['التسليم دليل', 'Passed', 'Failed', 'Not Run', 'لا تضع ملف'],
  15  |   },
  16  |   {
  17  |     slug: 'project-demo-day',
  18  |     title: 'Demo Day: عرض الفكرة والقرارات والقيود',
  19  |     output: 'docs/DEMO_DAY_SCRIPT.md',
  20  |     expected: ['خطة احتياطية', 'بيانات تجريبية غير حساسة', 'تفاعلًا مباشرًا', 'قرارًا تقنيًا مهمًا'],
  21  |   },
  22  |   {
  23  |     slug: 'project-portfolio-entry',
  24  |     title: 'Portfolio: عرض المساهمة والنتائج بصدق',
  25  |     output: 'docs/PORTFOLIO_ENTRY.md',
  26  |     expected: ['خط الأساس', 'لم أقس أثرها بعد', 'أداة', 'قيود'],
  27  |   },
  28  | ];
  29  | 
  30  | test.describe('Sequential Project Path — Ticket 19: Operations and delivery', () => {
  31  |   test.beforeEach(async ({ page }) => {
  32  |     await page.addInitScript(() => {
  33  |       (window as any).__copiedLessonText = '';
  34  |       Object.defineProperty(navigator, 'clipboard', {
  35  |         configurable: true,
  36  |         value: { writeText: async (text: string) => { (window as any).__copiedLessonText = text; } },
  37  |       });
  38  |     });
  39  |   });
  40  | 
  41  |   for (const lesson of lessons) {
  42  |     test(`${lesson.title}: readable RTL page, output, and copy action`, async ({ page }) => {
  43  |       await page.goto(`/learn/${lesson.slug}`);
  44  |       await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  45  |       await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);
  46  | 
  47  |       const header = page.locator('header.rounded-3xl');
  48  |       await expect(header).toContainText('محتوى منشور');
  49  |       await expect(header).toContainText(lesson.output);
  50  | 
  51  |       const content = page.locator('article');
  52  |       for (const phrase of lesson.expected) await expect(content).toContainText(phrase);
  53  |       await expect(content.locator('.code-container')).toBeVisible();
  54  |       const copyButton = content.locator('.copy-btn').first();
  55  |       const sourceText = await copyButton.locator('xpath=ancestor::*[contains(@class,"code-container")]').locator('code').textContent();
  56  |       await copyButton.click();
  57  |       await expect.poll(() => page.evaluate(() => (window as any).__copiedLessonText)).toBe(sourceText);
  58  |       await expect(copyButton).toContainText('تم النسخ');
  59  |       await expect(page.getByRole('navigation', { name: 'التنقل بين المواضيع' })).toBeVisible();
  60  |     });
  61  |   }
  62  | 
  63  |   test('follows the handoff, Demo Day, and Portfolio sequence', async ({ page }) => {
  64  |     await page.goto('/learn/project-operations-runbook');
  65  |     const operationsNavigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
  66  |     const nextHandoff = operationsNavigation.getByRole('link', { name: /الموضوع التالي/ });
  67  |     await expect(nextHandoff).toHaveAttribute('href', '/learn/project-handoff-package');
  68  |     await nextHandoff.click();
  69  | 
  70  |     const handoffNavigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
  71  |     await expect(handoffNavigation.getByRole('link', { name: /الموضوع السابق/ })).toHaveAttribute('href', '/learn/project-operations-runbook');
  72  |     const nextDemo = handoffNavigation.getByRole('link', { name: /الموضوع التالي/ });
  73  |     await expect(nextDemo).toHaveAttribute('href', '/learn/project-demo-day');
  74  |     await nextDemo.click();
  75  | 
  76  |     const demoNavigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
  77  |     await expect(demoNavigation.getByRole('link', { name: /الموضوع السابق/ })).toHaveAttribute('href', '/learn/project-handoff-package');
  78  |     const nextPortfolio = demoNavigation.getByRole('link', { name: /الموضوع التالي/ });
  79  |     await expect(nextPortfolio).toHaveAttribute('href', '/learn/project-portfolio-entry');
  80  |     await nextPortfolio.click();
  81  |     await expect(page.getByRole('heading', { level: 1 })).toHaveText('Portfolio: عرض المساهمة والنتائج بصدق');
  82  |     await expect(page.getByRole('navigation', { name: 'التنقل بين المواضيع' }).getByRole('link', { name: /الموضوع السابق/ }))
  83  |       .toHaveAttribute('href', '/learn/project-demo-day');
  84  |   });
  85  | 
  86  |   test('references resolve to the existing prompt library and templates pages', async ({ page }) => {
  87  |     await page.goto('/learn/project-handoff-package');
  88  |     const article = page.locator('article');
  89  |     await expect(article.getByRole('link', { name: 'الملفات والقوالب' })).toHaveAttribute('href', '/templates');
  90  |     const promptLibrary = article.getByRole('link', { name: 'مكتبة البرومبتات' });
  91  |     await expect(promptLibrary).toHaveAttribute('href', '/prompts');
  92  |     await promptLibrary.click();
  93  |     await expect(page).toHaveURL(/\/prompts\/?$/);
  94  |     await expect(page.getByRole('heading', { level: 1 })).toContainText('مكتبة البرومبتات');
  95  | 
  96  |     await page.goBack();
  97  |     await page.locator('article').getByRole('link', { name: 'الملفات والقوالب' }).click();
  98  |     await expect(page).toHaveURL(/\/templates\/?$/);
> 99  |     await expect(page.getByRole('heading', { level: 1 })).toContainText('الملفات والقوالب');
      |                                                           ^ Error: expect(locator).toContainText(expected) failed
  100 | 
  101 |     await page.goto('/learn/project-portfolio-entry');
  102 |     await expect(page.locator('article').getByRole('link', { name: 'مكتبة البرومبتات' })).toHaveAttribute('href', '/prompts');
  103 |     await expect(page.locator('article').getByRole('link', { name: 'الملفات والقوالب' })).toHaveAttribute('href', '/templates');
  104 |   });
  105 | });
  106 | 
```