import { test, expect } from '@playwright/test';

test.describe('Ticket 04: Mermaid, User Flow & Domain Model E2E Journey', () => {
  test('Home page displays topics 7, 8, 9 in correct sequence positions with metadata', async ({ page }) => {
    await page.goto('/');

    // Verify all 3 topics appear on the home page cards
    const t07Card = page.locator('article.topic-card').filter({ hasText: 'صيغة Mermaid ومحرك التصيير' }).first();
    const t08Card = page.locator('article.topic-card').filter({ hasText: 'نمذجة مسارات تدفق المستخدم' }).first();
    const t09Card = page.locator('article.topic-card').filter({ hasText: 'النموذج المفاهيمي لمجال العمل' }).first();

    await expect(t07Card).toBeVisible();
    await expect(t08Card).toBeVisible();
    await expect(t09Card).toBeVisible();

    // Verify topic numbers and stage tags
    await expect(t07Card).toContainText('07');
    await expect(t07Card).toContainText('أدوات الرسم والنمذجة');

    await expect(t08Card).toContainText('08');
    await expect(t08Card).toContainText('رحلة المستخدم وهندسة السلوك');

    await expect(t09Card).toContainText('09');
    await expect(t09Card).toContainText('نمذجة مفاهيم الأعمال');
  });

  test('TopicDetailModal renders interactive MermaidViewer with perspectives and copy controls', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    // Open Topic 07 in modal
    const t07Card = page.locator('article.topic-card').filter({ hasText: 'صيغة Mermaid ومحرك التصيير' }).first();
    await t07Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('صيغة Mermaid ومحرك التصيير');

    // MermaidViewer container should be rendered
    const viewer = modal.locator('div.rounded-2xl.border').filter({ hasText: 'المنظور:' }).first();
    await expect(viewer).toBeVisible();

    // Canvas viewport should contain an rendered SVG element
    const svg = viewer.locator('svg').first();
    await expect(svg).toBeVisible();

    // Toggle raw syntax code
    const toggleCodeBtn = viewer.getByRole('button', { name: /الكود/ });
    await expect(toggleCodeBtn).toBeVisible();
    await toggleCodeBtn.click();

    // Verify code block is displayed with LTR direction
    const codeBlock = viewer.locator('pre').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('flowchart');

    // Copy Mermaid code
    const copyCodeBtn = viewer.getByRole('button', { name: /نسخ/ }).first();
    await expect(copyCodeBtn).toBeVisible();
    await copyCodeBtn.click();

    // Switch perspective to "مسار العمليات" (Flow)
    const flowPerspectiveBtn = viewer.getByRole('button', { name: /مسار العمليات/ });
    await flowPerspectiveBtn.click();
    await expect(flowPerspectiveBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(viewer.locator('svg').first()).toBeVisible();

    // Switch perspective to "تسلسل التفاعلات" (Sequence)
    const seqPerspectiveBtn = viewer.getByRole('button', { name: /تسلسل التفاعلات/ });
    await seqPerspectiveBtn.click();
    await expect(seqPerspectiveBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(viewer.locator('svg').first()).toBeVisible();

    // Close modal
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('User Flow topic (08) renders BorrowHub decisions, happy path, and failure paths', async ({ page }) => {
    await page.goto('/learn/user-flow-modeling');

    // Verify Page Header
    await expect(page.locator('h1')).toContainText('نمذجة مسارات تدفق المستخدم (User Flow)');
    const topicHeader = page.locator('header.rounded-3xl').first();
    await expect(topicHeader).toContainText('موضوع 08');
    await expect(topicHeader).toContainText('محتوى منشور');

    // Verify Contract fields: Goal, Outputs, Steps, Checklist
    await expect(page.locator('text=الهدف من الموضوع:')).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/user-flow.md' }).first()).toBeVisible();
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Verify User Flow code block exists and contains decision gates & failure paths
    const flowCodeBlock = page.locator('pre.code-content').filter({ hasText: 'CheckActiveLoans' }).first();
    await expect(flowCodeBlock).toBeVisible();
    await expect(flowCodeBlock).toContainText('CheckAuth');
    await expect(flowCodeBlock).toContainText('CheckStock');
    await expect(flowCodeBlock).toContainText('ShowLimitError');
    await expect(flowCodeBlock).toContainText('ActiveLoan');

    // Verify PROMPT 05 is present and copyable
    const prompt05Block = page.locator('pre.code-content').filter({ hasText: 'PROMPT 05' }).or(page.locator('pre.code-content').filter({ hasText: 'Senior UX Designer' })).first();
    await expect(prompt05Block).toBeVisible();

    // Verify Navigation pointers: Prev points to topic 7, Next points to topic 9
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/mermaid-syntax');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/conceptual-domain-model');
  });

  test('Domain Model topic (09) remains strictly conceptual without SQL types or DB keys', async ({ page }) => {
    await page.goto('/learn/conceptual-domain-model');

    // Verify Page Header
    await expect(page.locator('h1')).toContainText('النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)');
    const topicHeader = page.locator('header.rounded-3xl').first();
    await expect(topicHeader).toContainText('موضوع 09');
    await expect(topicHeader).toContainText('محتوى منشور');

    // Verify Strict Boundaries Callout (The 3 Negatives)
    const warningsCallout = page.locator('.rounded-2xl.border-2.border-amber-400');
    await expect(warningsCallout).toBeVisible();
    await expect(warningsCallout).toContainText('مفاتيح قواعد البيانات');
    await expect(warningsCallout).toContainText('أنواع بيانات SQL');
    await expect(warningsCallout).toContainText('الدوال والعمليات البرمجية');

    // Verify Domain Model code block (flowchart LR) with business concepts
    const domainModelCode = page.locator('pre.code-content').filter({ hasText: 'Users_Domain' }).or(page.locator('pre.code-content').filter({ hasText: 'LoanRequest' })).first();
    await expect(domainModelCode).toBeVisible();
    await expect(domainModelCode).toContainText('Student');
    await expect(domainModelCode).toContainText('Equipment');
    await expect(domainModelCode).toContainText('Handover');
    await expect(domainModelCode).toContainText('Inspection');

    // Ensure NO SQL types or database PK/FK in the model
    const codeText = await domainModelCode.textContent();
    expect(codeText).not.toContain('VARCHAR');
    expect(codeText).not.toContain('AUTO_INCREMENT');
    expect(codeText).not.toContain('PRIMARY KEY');
    expect(codeText).not.toContain('FOREIGN KEY');

    // Verify Navigation pointers: Prev points to topic 8
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/user-flow-modeling');
  });

  test('Mermaid syntax topic (07) verifies RTL prose, LTR code blocks, and copy actions', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/mermaid-syntax');

    // Verify RTL page container
    const mainContainer = page.locator('div.mx-auto[dir="rtl"]').first();
    await expect(mainContainer).toBeVisible();

    // Verify LTR code container
    const codeContainer = page.locator('div.code-container[dir="ltr"]').first();
    await expect(codeContainer).toBeVisible();

    // Verify code block contains valid flowchart
    const code = codeContainer.locator('code');
    await expect(code).toContainText('flowchart TD');

    // Click copy button inside code container
    const copyBtn = codeContainer.locator('button.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Verify copy feedback
    await expect(copyBtn).toContainText('تم النسخ');

    // Verify Error Handling section explains inline non-blocking alerts
    const errorSection = page.locator('text=محرك التصيير المحلي ومعالجة أخطاء الصياغة');
    await expect(errorSection).toBeVisible();
    await expect(page.locator('text=تعذر تصيير المخطط:')).toBeVisible();
  });
});
