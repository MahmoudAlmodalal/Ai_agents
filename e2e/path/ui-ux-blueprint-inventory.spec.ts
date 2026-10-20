import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 07: UI/UX, UX Blueprint & Screen Inventory (Topics 18, 19, 20)', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Topic 18 (UI/UX Roles & Navigation): Renders metadata, role matrix, RTL layout, and PROMPT 14 copyable', async ({ page }) => {
    await page.goto('/learn/ui-ux-roles-navigation', { timeout: 40000 });

    // Header & metadata
    const topicHeader = page.locator('header.rounded-3xl');
    await expect(page.locator('h1')).toContainText('الأدوار وهيكلية التنقل');
    await expect(topicHeader).toContainText('موضوع 18');
    await expect(topicHeader).toContainText('تجربة المستخدم وهندسة المعلومات');
    await expect(topicHeader).toContainText('docs/UI_UX_REQUIREMENTS.md');

    // Directionality checks: Page is RTL, Code blocks are LTR
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    const codeContainers = page.locator('.code-container[dir="ltr"]');
    await expect(codeContainers.first()).toBeVisible();

    // Goal and practical steps
    await expect(page.locator('text=الهدف من الموضوع:')).toBeVisible();
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Content: Role-based matrix table
    const rolesTable = page.locator('table').filter({ hasText: 'الدور (User Role)' });
    await expect(rolesTable).toBeVisible();
    await expect(page.locator('text=الزائر العام (Guest)')).toBeVisible();
    await expect(page.locator('text=الطالب المستعير (Student)')).toBeVisible();
    await expect(page.locator('text=مشرف المستودع (Staff)')).toBeVisible();

    // Navigation flowchart in Mermaid
    const navMermaid = page.locator('.code-container').filter({ hasText: 'MERMAID (flowchart TD)' });
    await expect(navMermaid).toBeVisible();
    expect(await navMermaid.innerText()).toContain('flowchart TD');
    expect(await navMermaid.innerText()).toContain('BorrowHub');

    // PROMPT 14 section and copy button
    const prompt14Block = page.locator('.code-container').filter({ hasText: 'PROMPT 14 — UI/UX Grill Me' });
    await expect(prompt14Block).toBeVisible();
    expect(await prompt14Block.innerText()).toContain('/grill-me');
    expect(await prompt14Block.innerText()).toContain('Act as a Senior UX Researcher');

    // Test copy button functionality and immediate visual feedback
    const copyBtn = prompt14Block.locator('button.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toHaveText(/تم النسخ/);
  });

  test('Topic 19 (UX Blueprint): Renders Sitemap, four UI states and cross-cutting checks, and PROMPT 15', async ({ page }) => {
    await page.goto('/learn/ux-blueprint');

    // Header & metadata
    const topicHeader = page.locator('header.rounded-3xl');
    await expect(page.locator('h1')).toContainText('UX Blueprint');
    await expect(topicHeader).toContainText('موضوع 19');
    await expect(topicHeader).toContainText('docs/UX_BLUEPRINT.md');

    // Sitemap Mermaid diagram
    const sitemapBlock = page.locator('.code-container').filter({ hasText: 'MERMAID (flowchart TD) — خريطة موقع BorrowHub' });
    await expect(sitemapBlock).toBeVisible();
    const sitemapText = await sitemapBlock.innerText();
    expect(sitemapText).toContain('flowchart TD');
    expect(sitemapText).toContain('/equipment');
    expect(sitemapText).toContain('/dashboard/loans');
    expect(sitemapText).toContain('/staff/requests');

    // Four UI states; responsive and accessibility are cross-cutting checks.
    await expect(page.locator('text=1. التحميل (Loading)')).toBeVisible();
    await expect(page.locator('text=2. الفراغ (Empty)')).toBeVisible();
    await expect(page.locator('text=3. الخطأ والتعافي (Error)')).toBeVisible();
    await expect(page.locator('text=4. النجاح (Success)')).toBeVisible();
    await expect(page.locator('text=فحص عابر: الاستجابة (Responsive)')).toBeVisible();
    await expect(page.locator('text=فحص عابر: إمكانية الوصول (Accessibility)')).toBeVisible();

    // Skeletons, WCAG AA and target-size guidance
    const article = page.locator('article').first();
    await expect(article).toContainText('Skeleton Screens');
    await expect(article).toContainText('WCAG AA');
    await expect(article).toContainText('44 CSS px قيمة راحة اختيارية وليست شرطاً عاماً لكل عنصر');

    // PROMPT 15 section
    const prompt15Block = page.locator('.code-container').filter({ hasText: 'PROMPT 15 — UX Blueprint + Screen Inventory' });
    await expect(prompt15Block).toBeVisible();
    const promptText = await prompt15Block.innerText();
    expect(promptText).toContain('Act as a Senior UX Architect');
    expect(promptText).toContain('docs/UX_BLUEPRINT.md and docs/SCREEN_INVENTORY.md');

    // Copy button test
    const copyBtn = prompt15Block.locator('button.copy-btn');
    await copyBtn.click();
    await expect(copyBtn).toHaveText(/تم النسخ/);
  });

  test('Topic 20 (Screen Inventory): Verifies strict MVP scope, SCR-01 to SCR-06, traceability matrix, and no invented screens', async ({ page }) => {
    await page.goto('/learn/screen-inventory');

    // Header & metadata
    const topicHeader = page.locator('header.rounded-3xl');
    await expect(page.locator('h1')).toContainText('Screen Inventory');
    await expect(topicHeader).toContainText('موضوع 20');
    await expect(topicHeader).toContainText('docs/SCREEN_INVENTORY.md');

    // Golden rule: No invented screens callout
    await expect(page.locator('text=حظر اختراع شاشات وهمية')).toBeVisible();
    await expect(page.locator('text=قاعدة المنع الصارم (No Invented Screens)')).toBeVisible();

    // Screen prioritization (Core vs Supporting vs Future)
    await expect(page.locator('text=الجوهرية (Core)')).toBeVisible();
    await expect(page.locator('text=المساندة (Supporting)')).toBeVisible();
    await expect(page.locator('text=المستقبلية (Future / Out of Scope)')).toBeVisible();

    // Verify all 6 MVP screens in the reference table using specific strong elements
    await expect(page.locator('strong:has-text("SCR-01")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-02")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-03")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-04")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-05")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-06")')).toBeVisible();

    // Verify traceability matrix for PRD Rules 3, 6, 8
    await expect(page.locator('h3:has-text("مصفوفة تدقيق التغطية الهندسية")')).toBeVisible();
    await expect(page.locator('text=القاعدة 3:')).toBeVisible();
    const pickupRow = page.locator('tr').filter({ hasText: 'القاعدة 6:' });
    await expect(pickupRow).toBeVisible();
    await expect(pickupRow).toContainText('48 ساعة');
    await expect(page.locator('text=القاعدة 6:')).toBeVisible();
    await expect(page.locator('text=القاعدة 8:')).toBeVisible();

    // Deliverable code template
    const templateBlock = page.locator('.code-container').filter({ hasText: 'MARKDOWN — نموذج هيكل docs/SCREEN_INVENTORY.md' });
    await expect(templateBlock).toBeVisible();

    // Copy button test
    const copyBtn = templateBlock.locator('button.copy-btn');
    await copyBtn.click();
    await expect(copyBtn).toHaveText(/تم النسخ/);
  });

  test('Sequential Navigation Bounds: Seamless bi-directional transition between Topics 18, 19, and 20', async ({ page }) => {
    // 1. Start at Topic 18
    await page.goto('/learn/ui-ux-roles-navigation');

    // Next should link to Topic 19 (UX Blueprint)
    const nextFrom18 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextFrom18).toBeVisible();
    await expect(nextFrom18).toContainText('UX Blueprint');
    await nextFrom18.click();

    // 2. Now on Topic 19
    await expect(page).toHaveURL(/\/learn\/ux-blueprint/);

    // Prev should lead back to Topic 18
    const prevFrom19 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevFrom19).toBeVisible();
    await expect(prevFrom19).toContainText('الأدوار وهيكلية التنقل');

    // Next should link to Topic 20 (Screen Inventory)
    const nextFrom19 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextFrom19).toBeVisible();
    await expect(nextFrom19).toContainText('Screen Inventory');
    await nextFrom19.click();

    // 3. Now on Topic 20
    await expect(page).toHaveURL(/\/learn\/screen-inventory/);

    // Prev should lead back to Topic 19
    const prevFrom20 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevFrom20).toBeVisible();
    await expect(prevFrom20).toContainText('UX Blueprint');
    await prevFrom20.click();

    // Back on Topic 19
    await expect(page).toHaveURL(/\/learn\/ux-blueprint/);
  });
});
