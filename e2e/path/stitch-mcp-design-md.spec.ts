import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 10: Stitch MCP & DESIGN.md (Topics 28 & 29)', () => {

  test('Topic 28 (Stitch MCP): Positioned after approved design, secrets isolation, PROMPT 22, and manual fallback', async ({ page }) => {
    await page.goto('/learn/stitch-mcp-integration');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('ربط Stitch MCP واسترجاع مراجع التصميم البصري');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/STITCH_SCREEN_REFERENCES.md');
    await expect(header).toContainText('docs/mcp/stitch-connection.md');
    await expect(header).toContainText('الواجهات وتطوير الفرونت إند');
    await expect(header).toContainText('موضوع 28');

    // Verifies RTL directionality
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    const content = page.locator('article').first();

    // Content: Positioned after approved design and basic MCP setup
    await expect(content).toContainText('التموضع الهندسي الصحيح: لماذا يأتي ربط Stitch MCP هنا تحديداً؟');
    await expect(content).toContainText('التصميم المعتمد في Google Stitch (المواضيع 21 و22 و23)');
    await expect(content).toContainText('أسس بروتوكول MCP وبيئة وكيل البرمجة (المواضيع 24 و27)');

    // Content: Secrets management without leaking keys
    await expect(content).toContainText('إدارة أسرار الاتصال بأمان وحظر تسريب المفاتيح');
    await expect(content).toContainText('خط أحمر أمني: لا تضع المفاتيح الحقيقية مطلقاً');
    await expect(content).toContainText('<YOUR_STITCH_API_KEY>');
    await expect(content).toContainText('.env.local');

    // Content: Verbatim PROMPT 22 with safety rules
    await expect(content).toContainText('برومبت التحقق من الاتصال وقراءة الشاشات (PROMPT 22)');
    await expect(content).toContainText('Use the connected Stitch MCP server.');
    await expect(content).toContainText('List my Stitch projects and screen identifiers.');
    await expect(content).toContainText('Do not create, update or delete anything.');
    await expect(content).toContainText('Never output or expose API keys.');

    // Content: Complete manual fallback path
    await expect(content).toContainText('المسار البديل اليدوي الكامل: عندما يتعذر الاتصال بـ Stitch MCP');
    await expect(content).toContainText('لا شيء يوقف تقدم الطالب');
    await expect(content).toContainText('تصدير لقطات الشاشات');
    await expect(content).toContainText('استخراج أكواد الألوان');

    // Content: Tools & Resources availability table
    const table = content.locator('.data-table').first();
    await expect(table).toBeVisible();
    await expect(content).toContainText('Google Stitch');
    await expect(content).toContainText('Google Codelab: Design to Code');
    await expect(content).toContainText('متاح رسميًا من Google');
    await expect(content).toContainText('مسار بديل متاح دائمًا');

    // Deliverable output template
    await expect(content).toContainText('STITCH_SCREEN_REFERENCES.md');

    // SVG architecture diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with LTR directionality
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    // Copy button interaction test
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    const copyButton = content.locator('.copy-btn').first();
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(copyButton).toContainText('تم النسخ');

    // Zero broken anchor links in article
    const brokenLinks = await page.locator('article').first().locator('a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Navigation bounds: Prev -> Topic 27 (mcp-protocol), Next -> Topic 29 (design-md-spec)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/mcp-protocol');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/design-md-spec');
  });

  test('Topic 29 (DESIGN.md): Grounds token guidance in evidence and presents YAML as an exercise format', async ({ page }) => {
    await page.goto('/learn/design-md-spec');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('DESIGN.md');
    await expect(header).toContainText('docs/DESIGN_TOKENS.md');
    await expect(header).toContainText('أنظمة وقواعد التصميم');
    await expect(header).toContainText('موضوع 29');

    // Verifies RTL directionality
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    const content = page.locator('article').first();

    // Content: Core principle - Real confirmed values, no invented identity, no replaced requirements
    await expect(content).toContainText('المبدأ الهندسي الصارم: توثيق القيم المعتمدة فعلياً لا هوية متخيلة');
    await expect(content).toContainText('تعكس وثيقة التصميم القيم البصرية المعتمدة فعلياً');
    await expect(content).toContainText('ولا تخترع هوية بصرية جديدة من العدم أو تستبدل متطلبات PRD المعتمدة');

    // Content: Optional exercise structure, not a universal Google/tool format
    await expect(content).toContainText('بنية تمرين DESIGN.md (توكنز YAML + شرح Markdown)');
    await expect(content).toContainText('صيغة تسليم تعليمية مقترحة');
    await expect(content).toContainText('تحقق من صيغة الأداة المستهدفة');
    await expect(content).toContainText('لا تصف هذا المثال بأنه معيار عام');
    await expect(content).toContainText('رموز التصميم (Tokens)');
    await expect(content).toContainText('فلسفة التصميم (Rationale)');
    await expect(content).toContainText('حالات الواجهة المناسبة للمهمة (UI States)');

    // Content: Verbatim PROMPT 23
    await expect(content).toContainText('برومبت استخراج DESIGN.md من Stitch (PROMPT 23)');
    await expect(content).toContainText('Act as a Design System Engineer.');
    await expect(content).toContainText('Use the connected Stitch MCP, or explicitly provided exports if MCP is unavailable.');
    await expect(content).toContainText('Extract REAL confirmed hex values');
    await expect(content).toContainText('Do not invent values.');
    await expect(content).toContainText('Do not modify Stitch screens.');

    // Content: Concrete DESIGN.md template with YAML tokens
    await expect(content).toContainText('نموذج تعليمي لملف DESIGN.md');
    await expect(content).toContainText('#059669');
    await expect(content).toContainText('WCAG AA');
    await expect(content).toContainText('Tajawal');
    await expect(content).toContainText('RTL First');

    // Content: Human Educational Review
    await expect(content).toContainText('مراجعة المطابقة البصرية وتوثيق الجودة قبل بدء الكود');
    await expect(content).toContainText('المرجع البصري');
    await expect(content).toContainText('الوثيقة الهندسية');

    // SVG workflow diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with LTR directionality
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    // Copy button interaction test
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    const copyButton = content.locator('.copy-btn').first();
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(copyButton).toContainText('تم النسخ');

    // Zero broken anchor links in article
    const brokenLinks = await page.locator('article').first().locator('a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Navigation bounds: Prev -> Topic 28 (stitch-mcp-integration)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/stitch-mcp-integration');
  });

  test('Sequential Student Journey: Navigates from Topic 28 to Topic 29 and verifies Prompt library records', async ({ page }) => {
    // 1. Student lands on Topic 28
    await page.goto('/learn/stitch-mcp-integration');
    await expect(page.locator('h1')).toContainText('ربط Stitch MCP واسترجاع مراجع التصميم البصري');

    // 2. Student verifies sidebar links
    const promptsLibraryLink = page.locator('aside a[href="/prompts"]');
    await expect(promptsLibraryLink).toBeVisible();

    // 3. Student clicks "الموضوع التالي" and lands on Topic 29
    const nextButton = page.getByRole('link', { name: /الموضوع التالي/ });
    await nextButton.click();
    await page.waitForURL('**/learn/design-md-spec');
    await expect(page.locator('h1')).toContainText('وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة');

    // 4. Student clicks "الموضوع السابق" and returns to Topic 28
    const prevButton = page.getByRole('link', { name: /الموضوع السابق/ });
    await prevButton.click();
    await page.waitForURL('**/learn/stitch-mcp-integration');
    await expect(page.locator('h1')).toContainText('ربط Stitch MCP واسترجاع مراجع التصميم البصري');

    // 5. Student opens Prompt 22 directly in prompt library
    await page.goto('/prompts/prompt-22-stitch-mcp-connection-verification');
    await expect(page.locator('h1')).toContainText('Stitch MCP Connection Verification');

    // 6. Student opens Prompt 23 directly in prompt library
    await page.goto('/prompts/prompt-23-extract-design-md-from-stitch');
    await expect(page.locator('h1')).toContainText('Extract DESIGN.md from Stitch');
  });

  test('Responsive viewport accessibility (390px, 768px, 1024px, 1440px)', async ({ page }) => {
    const viewports = [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/learn/stitch-mcp-integration');

      // Check RTL root
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

      // Check main heading visible
      await expect(page.locator('h1')).toBeVisible();

      // Check no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // Also check topic 29
      await page.goto('/learn/design-md-spec');
      await expect(page.locator('h1')).toBeVisible();
      const scrollWidth29 = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth29 = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth29).toBeLessThanOrEqual(clientWidth29 + 2);
    }
  });

});
