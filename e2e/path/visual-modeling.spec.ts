import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Topic 04: Visual Modeling (Mermaid, User Flow, Domain Model)', () => {
  test('Topic 07 (Mermaid Syntax): Displays LTR code, RTL explanations, copy button, and valid renderer', async ({ page }) => {
    await page.goto('/learn/mermaid-syntax');

    // Header & metadata
    await expect(page.locator('h1')).toContainText('Mermaid');
    await expect(page.locator('header').getByText('أدوات وصيغ المخططات النصية')).toBeVisible();

    // Directionality checks: Page is RTL, Code blocks are LTR
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    const codeContainer = page.locator('.code-container[dir="ltr"]').first();
    await expect(codeContainer).toBeVisible();
    await expect(codeContainer).toContainText('flowchart TD');

    // Copy button exists
    const copyBtn = codeContainer.locator('button.copy-btn');
    await expect(copyBtn).toBeVisible();

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Mermaid Live external reference
    const liveLink = page.locator('a[href*="mermaid.live"]').first();
    await expect(liveLink).toBeVisible();
  });

  test('Topic 08 (User Flow): Models success and failure paths with decision points tied to PRD', async ({ page }) => {
    await page.goto('/learn/user-flow-modeling');

    // Title and header
    await expect(page.locator('h1')).toContainText('User Flow');

    // Verifies Prompt 05 is embedded
    const promptHeader = page.locator('text=PROMPT 05 — User Flow');
    await expect(promptHeader).toBeVisible();

    // Verifies User Flow source contains Decision Points, Happy Path, and Failure Paths
    const flowCode = page.locator('.code-container').filter({ hasText: 'MERMAID SOURCE — User Flow' });
    await expect(flowCode).toBeVisible();
    const flowText = await flowCode.innerText();

    // Decision points
    expect(flowText).toContain('CheckAuth');
    expect(flowText).toContain('CheckActiveLoans');
    expect(flowText).toContain('CheckStock');
    expect(flowText).toContain('Inspection');

    // Tied to PRD requirements (Rule 3)
    expect(flowText).toContain('قاعدة PRD رقم 3');

    // Success path
    expect(flowText).toContain('ExitSuccess');
    expect(flowText).toContain('إتمام الدورة بنجاح');

    // Failure / exception paths
    expect(flowText).toContain('ExitFail');
    expect(flowText).toContain('ExitReject');
    expect(flowText).toContain('LogDamage');

    // Output deliverable
    await expect(page.locator('article')).toContainText('docs/user-flow.md');
  });

  test('Topic 09 (Domain Model): Strictly conceptual without DB keys, SQL types, or functions', async ({ page }) => {
    await page.goto('/learn/conceptual-domain-model');

    // Title
    await expect(page.locator('h1')).toContainText('Domain Model');

    // Verifies Prompt 06 is embedded
    const promptHeader = page.locator('text=PROMPT 06 — Conceptual Domain Model');
    await expect(promptHeader).toBeVisible();

    // Inspect the Domain Model Mermaid source code
    const domainCodeContainer = page.locator('.code-container').filter({ hasText: 'MERMAID SOURCE — Conceptual Domain Model' });
    await expect(domainCodeContainer).toBeVisible();
    const domainText = await domainCodeContainer.innerText();

    // Must use flowchart LR
    expect(domainText).toContain('flowchart LR');

    // Must NOT contain DB keys, SQL data types, or functions
    expect(domainText).not.toMatch(/\b(PK|FK|Primary Key|Foreign Key)\b/i);
    expect(domainText).not.toMatch(/\b(VARCHAR|INTEGER|BOOLEAN|TIMESTAMP|BIGINT)\b/i);
    expect(domainText).not.toMatch(/\b(function|def|void|return)\b/i);
    expect(domainText).not.toMatch(/\w+\s*\([^)]*\)\s*;/); // method calls / function signatures

    // Must contain business concepts and labeled relationships
    expect(domainText).toContain('Student');
    expect(domainText).toContain('Equipment');
    expect(domainText).toContain('LoanRequest');
    expect(domainText).toContain('يقدّم ويتابع');
    expect(domainText).toContain('يراجع ويعتمد');

    // Deliverables
    await expect(page.locator('article')).toContainText('docs/diagrams/domain-model.md');
  });

  test('Modal Reader and MermaidViewer: Renders diagrams smoothly and switches perspectives', async ({ page }) => {
    await page.goto('/');

    // Locate Topic 07 card and open modal
    const topic7Card = page.locator('article.topic-card').filter({ hasText: 'صيغة المخططات النصية' });
    await expect(topic7Card).toBeVisible();
    await topic7Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    // Modal is opened
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();

    // MermaidViewer container is present
    const viewer = modal.locator('.relative.min-h-\\[300px\\]');
    await expect(viewer).toBeVisible();

    // SVG rendered successfully (no error)
    await expect(viewer.locator('svg')).toBeVisible({ timeout: 15000 });
    await expect(viewer).not.toContainText('تعذر تصيير المخطط');

    // Test perspective buttons
    const flowPerspectiveBtn = modal.getByRole('button', { name: /مسار العمليات/ });
    if (await flowPerspectiveBtn.isVisible()) {
      await flowPerspectiveBtn.click();
      await expect(viewer.locator('svg')).toBeVisible({ timeout: 10000 });
    }

    // Toggle Raw Syntax Code
    const codeToggleBtn = modal.getByRole('button', { name: /عرض \/ إخفاء كود Mermaid/ });
    if (await codeToggleBtn.isVisible()) {
      await codeToggleBtn.click();
      const rawSyntax = modal.locator('pre.text-emerald-400');
      await expect(rawSyntax).toBeVisible();
    }
  });

  test('Sequential Navigation Bounds: Topics 07, 08, 09 connect smoothly in sequence', async ({ page }) => {
    // Start at Topic 07
    await page.goto('/learn/mermaid-syntax');

    // Next should lead to Topic 08 (User Flow)
    const nextFrom7 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextFrom7).toBeVisible();
    await expect(nextFrom7).toContainText('User Flow');
    await nextFrom7.click();

    // Now on Topic 08
    await expect(page).toHaveURL(/\/learn\/user-flow-modeling/);

    // Prev should lead back to Topic 07
    const prevFrom8 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevFrom8).toBeVisible();
    await expect(prevFrom8).toContainText('Mermaid');

    // Next should lead to Topic 09 (Domain Model)
    const nextFrom8 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextFrom8).toBeVisible();
    await expect(nextFrom8).toContainText('Domain Model');
    await nextFrom8.click();

    // Now on Topic 09
    await expect(page).toHaveURL(/\/learn\/conceptual-domain-model/);

    // Prev should lead back to Topic 08
    const prevFrom9 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevFrom9).toBeVisible();
    await expect(prevFrom9).toContainText('User Flow');
  });
});
