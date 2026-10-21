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
    await expect(content).toContainText('معيار WCAG المناسب');
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

  test('renders all lesson and activity sections for stitch-mcp-integration and design-md-spec', async ({ page }) => {
    // Topic 28: stitch-mcp-integration
    await page.goto('/learn/stitch-mcp-integration');

    const content28 = page.locator('article').first();
    await expect(content28.getByRole('heading', { name: '1. التموضع الهندسي الصحيح: لماذا يأتي ربط Stitch MCP هنا تحديداً؟' })).toBeVisible();
    await expect(content28.getByRole('heading', { name: '2. إدارة أسرار الاتصال بأمان وحظر تسريب المفاتيح' })).toBeVisible();
    await expect(content28.getByRole('heading', { name: '3. برومبت التحقق من الاتصال وقراءة الشاشات (PROMPT 22)' })).toBeVisible();
    await expect(content28.getByRole('heading', { name: '4. المسار البديل اليدوي الكامل: عندما يتعذر الاتصال بـ Stitch MCP' })).toBeVisible();
    await expect(content28.getByRole('heading', { name: '5. المخطط المعماري لسير عمل Stitch MCP وعزل الأسرار' })).toBeVisible();
    await expect(content28.getByRole('heading', { name: '6. مراجع الأدوات الرسمية وحالة التوفر الفعلية' })).toBeVisible();
    await expect(content28.getByRole('heading', { name: '7. المخرج العملي: ملف وثيقة مراجع الشاشات (STITCH_SCREEN_REFERENCES.md)' })).toBeVisible();

    const activities28 = page.locator('.learning-activities[data-topic-slug="stitch-mcp-integration"]');
    await expect(activities28).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'محتوى تعلّمي وتقييم ذاتي' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'أهداف التعلّم' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'المدخل: أصول تصميم موجودة' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'ربط القراءة بأمان' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'بديل يدوي كامل' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(activities28.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
    await expect(activities28.locator('section[aria-labelledby*="-quiz"]')).toBeVisible();
    await expect(activities28.locator('section[aria-labelledby*="-rubric"]')).toBeVisible();

    // Topic 29: design-md-spec
    await page.goto('/learn/design-md-spec');

    const content29 = page.locator('article').first();
    await expect(content29.getByRole('heading', { name: '1. المبدأ الهندسي الصارم: توثيق القيم المعتمدة فعلياً لا هوية متخيلة' })).toBeVisible();
    await expect(content29.getByRole('heading', { name: '2. بنية تمرين DESIGN.md (توكنز YAML + شرح Markdown)' })).toBeVisible();
    await expect(content29.getByRole('heading', { name: '3. برومبت استخراج DESIGN.md من Stitch (PROMPT 23)' })).toBeVisible();
    await expect(content29.getByRole('heading', { name: '4. المخطط الهندسي لدورة استخراج وثيقة DESIGN.md ومطابقتها' })).toBeVisible();
    await expect(content29.getByRole('heading', { name: '5. نموذج تعليمي لملف DESIGN.md — يحتاج قيم مشروعك ومراجعتها' })).toBeVisible();
    await expect(content29.getByRole('heading', { name: '6. مراجعة المطابقة البصرية وتوثيق الجودة قبل بدء الكود' })).toBeVisible();

    const activities29 = page.locator('.learning-activities[data-topic-slug="design-md-spec"]');
    await expect(activities29).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'محتوى تعلّمي وتقييم ذاتي' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'أهداف التعلّم' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'المدخل: دليل مصمم أو شاشة' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'العقد لا التخمين' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'يفصل الرمز عن المتطلب' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(activities29.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
    await expect(activities29.locator('section[aria-labelledby*="-quiz"]')).toBeVisible();
    await expect(activities29.locator('section[aria-labelledby*="-rubric"]')).toBeVisible();
  });

  test('practical steps and expected outputs are present and copyable', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Topic 28: stitch-mcp-integration
    await page.goto('/learn/stitch-mcp-integration');

    const activities28 = page.locator('.learning-activities[data-topic-slug="stitch-mcp-integration"]');
    const stepsList28 = activities28.locator('section[aria-labelledby*="-steps"] ol > li');
    await expect(stepsList28).toHaveCount(2);

    await expect(stepsList28.nth(0)).toContainText('تحقق من إعداد MCP ومشروع Stitch');
    await expect(stepsList28.nth(0)).toContainText('المخرج المتوقع:');
    await expect(stepsList28.nth(0)).toContainText('docs/mcp/stitch-connection.md');

    await expect(stepsList28.nth(1)).toContainText('إذا تعذر الاتصال، وثق خطوات الفحص اليدوي');
    await expect(stepsList28.nth(1)).toContainText('المخرج المتوقع:');
    await expect(stepsList28.nth(1)).toContainText('docs/STITCH_SCREEN_REFERENCES.md');

    // Copy prompt 22
    const copyPrompt22Btn = page.getByRole('button', { name: /PROMPT 22/ });
    await expect(copyPrompt22Btn).toBeVisible();
    const prompt22Code = await copyPrompt22Btn.locator('xpath=ancestor::div[contains(@class,"code-container")]').locator('code').textContent();
    await copyPrompt22Btn.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(prompt22Code);

    // Copy STITCH_SCREEN_REFERENCES template
    const copyRefBtn = page.getByRole('button', { name: /STITCH_SCREEN_REFERENCES/ });
    await expect(copyRefBtn).toBeVisible();
    const refCode = await copyRefBtn.locator('xpath=ancestor::div[contains(@class,"code-container")]').locator('code').textContent();
    await copyRefBtn.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(refCode);

    // Topic 29: design-md-spec
    await page.goto('/learn/design-md-spec');

    const activities29 = page.locator('.learning-activities[data-topic-slug="design-md-spec"]');
    const stepsList29 = activities29.locator('section[aria-labelledby*="-steps"] ol > li');
    await expect(stepsList29).toHaveCount(2);

    await expect(stepsList29.nth(0)).toContainText('اجمع القيم المؤكدة من مراجع Stitch');
    await expect(stepsList29.nth(0)).toContainText('المخرج المتوقع:');
    await expect(stepsList29.nth(0)).toContainText('docs/DESIGN_TOKENS.md');

    await expect(stepsList29.nth(1)).toContainText('اكتب قواعد التصميم ومكونات الواجهة');
    await expect(stepsList29.nth(1)).toContainText('المخرج المتوقع:');
    await expect(stepsList29.nth(1)).toContainText('DESIGN.md');

    // Copy prompt 23
    const copyPrompt23Btn = page.getByRole('button', { name: /PROMPT 23/ });
    await expect(copyPrompt23Btn).toBeVisible();
    const prompt23Code = await copyPrompt23Btn.locator('xpath=ancestor::div[contains(@class,"code-container")]').locator('code').textContent();
    await copyPrompt23Btn.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(prompt23Code);

    // Copy DESIGN.md template
    const copyDesignMdBtn = page.getByRole('button', { name: /DESIGN\.md/ });
    await expect(copyDesignMdBtn).toBeVisible();
    const designMdCode = await copyDesignMdBtn.locator('xpath=ancestor::div[contains(@class,"code-container")]').locator('code').textContent();
    await copyDesignMdBtn.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(designMdCode);
  });

  test('quiz grades responses and provides explanatory feedback for both Topics', async ({ page }) => {
    // Topic 28: stitch-mcp-integration
    await page.goto('/learn/stitch-mcp-integration');
    const quiz28 = page.locator('.learning-activities[data-topic-slug="stitch-mcp-integration"] section[aria-labelledby*="-quiz"]');
    await expect(quiz28).toBeVisible();

    const q1_28 = quiz28.getByRole('group', { name: /ما الطلب الآمن الأول للتحقق من الخادم؟/ });
    const q2_28 = quiz28.getByRole('group', { name: /ما الذي تسجله عندما لا تستطيع فحص لون في المرجع؟/ });

    // Answer Q1 correctly, Q2 incorrectly
    await q1_28.getByRole('radio', { name: 'قراءة المشاريع ومعرفات الشاشات المقصودة دون تعديل أو كشف أسرار', exact: true }).check();
    await q2_28.getByRole('radio', { name: 'قيمة متوقعة من صورة مشابهة', exact: true }).check();

    await quiz28.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Verify score banner
    await expect(quiz28.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Verify feedback and explanation
    await expect(q1_28.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1_28.getByRole('status')).toContainText('فحص القراءة يؤكد الاتصال والهدف');
    await expect(q2_28.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2_28.getByRole('status')).toContainText('المجهول يجب أن يبقى واضحاً');

    // Test retry button
    const retryBtn28 = quiz28.getByRole('button', { name: 'إعادة المحاولة', exact: true });
    await expect(retryBtn28).toBeVisible();
    await retryBtn28.click();

    // Topic 29: design-md-spec
    await page.goto('/learn/design-md-spec');
    const quiz29 = page.locator('.learning-activities[data-topic-slug="design-md-spec"] section[aria-labelledby*="-quiz"]');
    await expect(quiz29).toBeVisible();

    const q1_29 = quiz29.getByRole('group', { name: /ما الاستجابة الصحيحة إذا لم يمكن التأكد من مسافة بين مكونين؟/ });
    const q2_29 = quiz29.getByRole('group', { name: /ما الذي لا ينبغي أن يقرره DESIGN.md؟/ });

    // Answer Q1 correctly, Q2 incorrectly
    await q1_29.getByRole('radio', { name: 'تسجيل UNKNOWN وسبب نقص الدليل', exact: true }).check();
    await q2_29.getByRole('radio', { name: 'توكن لون له مصدر', exact: true }).check();

    await quiz29.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Verify score banner
    await expect(quiz29.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Verify feedback and explanation
    await expect(q1_29.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1_29.getByRole('status')).toContainText('القيمة غير المدعومة لا يجب أن تظهر كحقيقة');
    await expect(q2_29.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2_29.getByRole('status')).toContainText('وثيقة التصميم تصف المظهر وقواعد الواجهة');
  });

  test('checklist and rubric can be edited, reversed, and survive reload', async ({ page }) => {
    // Topic 28: stitch-mcp-integration
    await page.goto('/learn/stitch-mcp-integration');

    const activities28 = page.locator('.learning-activities[data-topic-slug="stitch-mcp-integration"]');
    const readonlyCriterion28 = activities28.getByRole('group', { name: 'فحص اتصال قراءة فقط' });
    const fallbackCriterion28 = activities28.getByRole('group', { name: 'بديل يدوي قابل للمتابعة' });

    await readonlyCriterion28.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await fallbackCriterion28.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    const checklist28 = page.getByRole('complementary').getByRole('checkbox').first();
    await checklist28.check();
    await expect(checklist28).toBeChecked();

    // Reload and verify persistence
    await page.reload();
    await expect(readonlyCriterion28.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(fallbackCriterion28.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();

    // Reverse rubric choices and checklist
    await readonlyCriterion28.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await fallbackCriterion28.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await page.getByRole('complementary').getByRole('checkbox').first().uncheck();
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();

    // Reload and verify reversed state
    await page.reload();
    await expect(readonlyCriterion28.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(fallbackCriterion28.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();

    // Topic 29: design-md-spec
    await page.goto('/learn/design-md-spec');

    const activities29 = page.locator('.learning-activities[data-topic-slug="design-md-spec"]');
    const tokenCriterion29 = activities29.getByRole('group', { name: 'قيم مسندة' });
    const scopeCriterion29 = activities29.getByRole('group', { name: 'نطاق وثيقة التصميم' });

    await tokenCriterion29.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await scopeCriterion29.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    const checklist29 = page.getByRole('complementary').getByRole('checkbox').first();
    await checklist29.check();
    await expect(checklist29).toBeChecked();

    // Reload and verify persistence
    await page.reload();
    await expect(tokenCriterion29.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(scopeCriterion29.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();

    // Reverse rubric choices and checklist
    await tokenCriterion29.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await scopeCriterion29.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await page.getByRole('complementary').getByRole('checkbox').first().uncheck();
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();

    // Reload and verify reversed state
    await page.reload();
    await expect(tokenCriterion29.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(scopeCriterion29.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
  });

  test('RTL prose and LTR technical text render correctly in both Topics', async ({ page }) => {
    // Topic 28: stitch-mcp-integration
    await page.goto('/learn/stitch-mcp-integration');
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');

    const codeContainer28 = page.locator('article .code-container[dir="ltr"]').first();
    await expect(codeContainer28).toBeVisible();
    expect(await codeContainer28.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');

    const arabicH2_28 = page.locator('h1').first();
    expect(await arabicH2_28.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');

    // Topic 29: design-md-spec
    await page.goto('/learn/design-md-spec');
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');

    const codeContainer29 = page.locator('article .code-container[dir="ltr"]').first();
    await expect(codeContainer29).toBeVisible();
    expect(await codeContainer29.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');

    const arabicH1_29 = page.locator('h1').first();
    expect(await arabicH1_29.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');
  });

  test('mobile viewport at 390px has no horizontal overflow in full reader pages', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Topic 28: stitch-mcp-integration
    await page.goto('/learn/stitch-mcp-integration');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('ربط Stitch MCP واسترجاع مراجع التصميم البصري');
    const scrollWidth28 = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth28 = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth28).toBeLessThanOrEqual(clientWidth28 + 2);

    // Topic 29: design-md-spec
    await page.goto('/learn/design-md-spec');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة');
    const scrollWidth29 = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth29 = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth29).toBeLessThanOrEqual(clientWidth29 + 2);
  });

});
