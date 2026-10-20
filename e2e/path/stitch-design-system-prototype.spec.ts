import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 08: Google Stitch, Design System, and Interactive Prototype', () => {

  test('Topic 21 (Google Stitch): Starts with one reference screen before generating other screens', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('تصميم الشاشة المرجعية في Google Stitch');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/STITCH_MASTER_PROMPT.md');
    await expect(header).toContainText('الشاشة المرجعية المعتمدة في Google Stitch');

    // Verifies directionality: RTL root layout
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Core rule: Starts with ONE reference screen first, no bulk generation
    const content = page.locator('article');
    await expect(content).toContainText('قاعدة الشاشة المرجعية الواحدة');
    await expect(content).toContainText('ابدأ بشاشة مرجعية تمثيلية واحدة فقط');
    await expect(content).toContainText('منع الانجراف البصري');

    // Embedded PROMPT 16 (Master Prompt Generator)
    const prompt16Block = content.locator('.code-container').filter({ hasText: 'PROMPT 16' });
    await expect(prompt16Block).toBeVisible();
    await expect(prompt16Block).toHaveAttribute('dir', 'ltr');
    const prompt16Text = await prompt16Block.locator('code').innerText();
    expect(prompt16Text).toContain('Act as a Google Stitch Prompt Engineer');
    expect(prompt16Text).toContain('produce ONE representative MVP screen first');
    expect(prompt16Text).toContain('Do not generate all screens at once');
    expect(prompt16Text).toContain('Save docs/STITCH_MASTER_PROMPT.md');

    // Copy button on PROMPT 16
    const copyBtn16 = prompt16Block.locator('button.copy-btn');
    await expect(copyBtn16).toBeVisible();

    // Embedded PROMPT 19 (Single Screen Refinement)
    const prompt19Block = content.locator('.code-container').filter({ hasText: 'PROMPT 19' });
    await expect(prompt19Block).toBeVisible();
    const prompt19Text = await prompt19Block.locator('code').innerText();
    expect(prompt19Text).toContain('Improve ONLY the selected screen');
    expect(prompt19Text).toContain('Specific problems to correct');
    expect(prompt19Text).toContain('Do not redesign unrelated screens or add features');

    // Visual structural diagram (BorrowHub wireframe SVG)
    const wireframeSvg = page.locator('.diagram-box svg');
    await expect(wireframeSvg).toBeVisible();

    // External tool links and availability status (no fake href="#")
    const stitchLink = page.locator('a[href="https://stitch.withgoogle.com/"]');
    await expect(stitchLink).toBeVisible();
    const codelabLink = page.locator('a[href*="codelabs.developers.google.com"]');
    await expect(codelabLink).toBeVisible();

    // Zero broken anchor links in article
    const brokenLinks = await page.locator('article a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Next navigation leads to Topic 22 (design-system-rules)
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/design-system-rules');
  });

  test('Topic 22 (Design System): Explains design system rules and applies to separate screen prompts without code', async ({ page }) => {
    await page.goto('/learn/design-system-rules');

    // Title and headers
    await expect(page.locator('h1')).toContainText('قواعد نظام التصميم وبرومبتات الشاشات المنفصلة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/STITCH_SCREEN_PROMPTS.md');

    // Design system rules: 60-30-10, Typography, 8px grid, UI states, WCAG 2.1 AA
    const content = page.locator('article');
    await expect(content).toContainText('قاعدة الألوان 60-30-10');
    await expect(content).toContainText('مقياس التايبوجرافي المتزن');
    await expect(content).toContainText('شبكة المسافات القياسية (8px Grid)');
    await expect(content).toContainText('الحالات التفاعلية الست الإلزامية');
    await expect(content).toContainText('WCAG 2.1 AA');
    await expect(content).toContainText('RTL First');

    // Embedded PROMPT 17 (Stitch Design System)
    const prompt17Block = content.locator('.code-container').filter({ hasText: 'PROMPT 17' });
    await expect(prompt17Block).toBeVisible();
    const prompt17Text = await prompt17Block.locator('code').innerText();
    expect(prompt17Text).toContain('Act as a Senior Design System Architect');
    expect(prompt17Text).toContain('Using my approved brand and the representative Stitch screen');
    expect(prompt17Text).toContain('define colors, type scale, spacing, radii, shadows');
    expect(prompt17Text).toContain('Do not invent a different brand');

    // One prompt per screen rule & PROMPT 18
    await expect(content).toContainText('برومبت منفصل لكل شاشة');
    const prompt18Block = content.locator('.code-container').filter({ hasText: 'PROMPT 18' });
    await expect(prompt18Block).toBeVisible();
    const prompt18Text = await prompt18Block.locator('code').innerText();
    expect(prompt18Text).toContain('Act as a Senior Google Stitch Prompt Engineer');
    expect(prompt18Text).toContain('Create a COMPLETE, individually copyable Stitch prompt for EVERY MVP screen');
    expect(prompt18Text).toContain('Sort screens in user-flow order');
    expect(prompt18Text).toContain('Save docs/STITCH_SCREEN_PROMPTS.md');
    expect(prompt18Text).toContain('Do not generate frontend code');

    // Explicit warning against generating frontend code at this stage
    await expect(content).toContainText('منع كتابة أو توليد الكود في هذه المرحلة');

    // Navigation links (Prev -> 21, Next -> 23)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/stitch-reference-screen');
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/interactive-prototype');
  });

  test('Topic 23 (Prototype): Validates journeys and states instead of showing a fake demo button', async ({ page }) => {
    await page.goto('/learn/interactive-prototype');

    // Title and headers
    await expect(page.locator('h1')).toContainText('النموذج التفاعلي (Prototype) والتحقق من الرحلات');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/PROTOTYPE_JOURNEYS_AUDIT.md');

    // Rejection of fake demo button antipattern
    const content = page.locator('article');
    await expect(content).toContainText('فحص سلوكي صارم بدل «زر التجربة الوهمي»');
    await expect(content).not.toHaveText('زر تجربة وهمي يعمل كرابط');

    // Journey verification matrix (Happy path, borrow limit, out of stock, empty search, role permission)
    await expect(content).toContainText('مسار النجاح الكامل (Happy Path)');
    await expect(content).toContainText('حظر تجاوز الحد الأقصى (Limit Exceeded)');
    await expect(content).toContainText('المعدة غير متوفرة (Out of Stock)');
    await expect(content).toContainText('الحالة الفارغة للبحث (Empty Search)');
    await expect(content).toContainText('صلاحيات الأدوار (Role Permission)');
    await expect(content).toContainText('سلوك التراجع (Back / Cancel)');

    // Embedded PROMPT 20 (Stitch Prototype)
    const prompt20Block = content.locator('.code-container').filter({ hasText: 'PROMPT 20' });
    await expect(prompt20Block).toBeVisible();
    const prompt20Text = await prompt20Block.locator('code').innerText();
    expect(prompt20Text).toContain('Create or refine the interactive prototype by connecting existing screens');
    expect(prompt20Text).toContain('For each transition define origin, trigger, destination, back/cancel behavior');
    expect(prompt20Text).toContain('Test main user journeys. Report missing or disconnected screens');

    // Embedded PROMPT 21 (Visual UX Audit)
    const prompt21Block = content.locator('.code-container').filter({ hasText: 'PROMPT 21' });
    await expect(prompt21Block).toBeVisible();
    const prompt21Text = await prompt21Block.locator('code').innerText();
    expect(prompt21Text).toContain('Act as a Senior UX Auditor');
    expect(prompt21Text).toContain('Rank issues Critical/Major/Minor');

    // Output deliverable
    await expect(content).toContainText('docs/PROTOTYPE_JOURNEYS_AUDIT.md');

    // Prev navigation leads to Topic 22
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/design-system-rules');
  });

  test('Homepage displays topics 21, 22, 23 with working detail modal and keyboard escape', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('article.topic-card');
    const topic21Card = cards.filter({ hasText: 'تصميم الشاشة المرجعية في Google Stitch' });
    const topic22Card = cards.filter({ hasText: 'قواعد نظام التصميم وبرومبتات الشاشات المنفصلة' });
    const topic23Card = cards.filter({ hasText: 'النموذج التفاعلي (Prototype) والتحقق من الرحلات' });

    await expect(topic21Card).toBeVisible();
    await expect(topic22Card).toBeVisible();
    await expect(topic23Card).toBeVisible();

    // Open detail modal for Topic 21
    await topic21Card.getByRole('button', { name: 'معاينة سريعة' }).click();
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('تصميم الشاشة المرجعية في Google Stitch');
    await expect(modal).toContainText('docs/STITCH_MASTER_PROMPT.md');

    // Close modal with Escape key
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('Copy button interaction copies prompt code and updates button label', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');

    const copyBtn = page.locator('.code-container button.copy-btn').first();
    await expect(copyBtn).toBeVisible();
    await expect(copyBtn).toContainText('نسخ البرومبت');

    // Grant clipboard permissions and click copy
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await copyBtn.click();

    // Button label should show confirmation
    await expect(copyBtn).toContainText('تم النسخ');
  });
});
