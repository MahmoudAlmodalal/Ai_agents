import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 09: Frontend Execution Tools (AI Coding Agent, Google AI Studio, Skills, MCP)', () => {

  test('Topic 24 (AI Coding Agent): Positioned after Prototype with permissions, secrets, and context management', async ({ page }) => {
    await page.goto('/learn/ai-coding-agent');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/CODING_AGENT_SETUP.md');
    await expect(header).toContainText('.env.example');
    await expect(header).toContainText('.gitignore');

    // Verifies RTL directionality
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Content: Positioned at start of frontend coding, earlier topics ran without agents
    const content = page.locator('article');
    await expect(content).toContainText('وضع وكيل البرمجة في مكانه الهندسي الصحيح');
    await expect(content).toContainText('دون اشتراط وجود أو تثبيت وكيل برمجي');
    await expect(content).toContainText('تنفيذ كود الفرونت إند');

    // Content: No vendor lock-in & No subscription assumption
    await expect(content).toContainText('حرية اختيار الأداة وعدم فرض أي اشتراكات مدفوعة');
    await expect(content).toContainText('لا يُفرض تبديل وكيل البرمجة');
    await expect(content).toContainText('لا افتراض لاشتراكات مدفوعة');
    await expect(content).toContainText('غياب ضمانات حدود الاستخدام');

    // Content: Permissions governance (Read, Write, Execute guardrails)
    await expect(content).toContainText('حوكمة الصلاحيات وحماية نظام المطور');
    await expect(content).toContainText('صلاحيات القراءة (Read)');
    await expect(content).toContainText('صلاحيات الكتابة (Write)');
    await expect(content).toContainText('صلاحيات الطرفية (Execute)');
    await expect(content).toContainText('قائمة الأوامر التدميرية المحظورة دون موافقة بشرية');

    // Content: Secrets & .env security
    await expect(content).toContainText('إدارة الأسرار والمتغيرات البيئية وتأمين .gitignore');
    await expect(content).toContainText('.env.local');

    // Content: Context Window management
    await expect(content).toContainText('إدارة نافذة السياق (Context Window) ومنع التخمة');
    await expect(content).toContainText('Lost in the Middle');

    // SVG architecture diagram
    const agentSvg = page.locator('.diagram-box svg');
    await expect(agentSvg).toBeVisible();

    // Code container with copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    // Zero broken anchor links in article
    const brokenLinks = await page.locator('article a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Navigation bounds: Prev -> Topic 23 (interactive-prototype), Next -> Topic 25 (google-ai-studio)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/interactive-prototype');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/google-ai-studio');
  });

  test('Topic 25 (Google AI Studio): Prototyping alongside frontend tools, JSON mock data, and rate limits', async ({ page }) => {
    await page.goto('/learn/google-ai-studio');

    // Title and headers
    await expect(page.locator('h1')).toContainText('استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/AI_STUDIO_WORKFLOW.md');
    await expect(header).toContainText('src/data/mock-data.json');

    const content = page.locator('article');

    // Content: Positioned alongside frontend execution tools, avoiding early requirements distraction
    await expect(content).toContainText('موضع Google AI Studio في مرحلة التنفيذ');
    await expect(content).toContainText('بجانب أدوات الواجهة والتنفيذ');

    // Content: Official platform link and rate limits
    const studioLink = page.locator('a[href="https://aistudio.google.com/"]');
    await expect(studioLink).toBeVisible();
    await expect(content).toContainText('حدود الاستخدام المجاني (Rate Limits) وغياب الضمانات المطلقة');

    // Content: System Instructions and structured JSON mock data matching ERD
    await expect(content).toContainText('ضبط تعليمات النظام وتوليد Mock Data بنمط JSON');
    await expect(content).toContainText('Structured Outputs (JSON Mode)');

    // Content: API key security and isolation
    await expect(content).toContainText('تأمين مفتاح Gemini API وعزله عن المتصفح');
    await expect(content).toContainText('NEXT_PUBLIC_');

    // SVG workflow diagram
    const studioSvg = page.locator('.diagram-box svg');
    await expect(studioSvg).toBeVisible();

    // Navigation bounds: Prev -> Topic 24 (ai-coding-agent), Next -> Topic 26 (agent-skills)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/ai-coding-agent');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/agent-skills');
  });

  test('Topic 26 (Skills): Golden Rule, skill bloat avoidance, and project frontend standards', async ({ page }) => {
    await page.goto('/learn/agent-skills');

    // Title and headers
    await expect(page.locator('h1')).toContainText('المهارات المخصصة (Skills) وتوجيه وكيل البرمجة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/PROJECT_AGENT_SKILLS.md');

    const content = page.locator('article');

    // Content: Golden Rule
    await expect(content).toContainText('القاعدة الذهبية لمسار سلاح العصر');
    await expect(content).toContainText('Agent ينفّذ، Skill يرشده، MCP يوصله بالأدوات، وPRD يحدد المطلوب');

    // Content: Difference between Prompt and Skill
    await expect(content).toContainText('الفرق الجوهري بين البرومبت (Prompt) والمهارة (Skill)');

    // Content: Clarification that earlier stages (Grill Me) were not technical installation blockers
    await expect(content).toContainText('توضيح مرحلي: مهارات المراحل المبكرة');

    // Content: Skill bloat & context efficiency
    await expect(content).toContainText('مشكلة «تخمة المهارات» (Skill Bloat) وإدارة السياق');

    // Content: Frontend standards skill snippet
    await expect(content).toContainText('مهارة معايير الفرونت إند لمشروع الطالب');
    await expect(content).toContainText('docs/skills/frontend-standards.md');

    // SVG Golden Rule Quadrant diagram
    const skillSvg = page.locator('.diagram-box svg');
    await expect(skillSvg).toBeVisible();

    // Navigation bounds: Prev -> Topic 25 (google-ai-studio), Next -> Topic 27 (mcp-protocol)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/google-ai-studio');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/mcp-protocol');
  });

  test('Topic 27 (MCP): Architecture, primitives, and security before Stitch MCP', async ({ page }) => {
    await page.goto('/learn/mcp-protocol');

    // Title and headers
    await expect(page.locator('h1')).toContainText('بروتوكول سياق النموذج (MCP - Model Context Protocol)');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/MCP_FOUNDATIONS.md');

    const content = page.locator('article');

    // Content: Architecture and foundation before Stitch MCP
    await expect(content).toContainText('ما هو بروتوكول سياق النموذج (MCP) ولماذا ندرسه الآن؟');
    await expect(content).toContainText('التمهيد الهندسي قبل الموضوع 28 (Stitch MCP)');
    await expect(content).toContainText('تأكيد استقلالية المراحل السابقة');

    // Content: Three-tier architecture (Host, Client, Server)
    await expect(content).toContainText('معمارية MCP الثلاثية: Host و Client و Server');
    await expect(content).toContainText('المضيف (MCP Host)');
    await expect(content).toContainText('العميل (MCP Client)');
    await expect(content).toContainText('الخادم (MCP Server)');

    // Content: MCP Primitives (Tools, Resources, Prompts)
    await expect(content).toContainText('قدرات MCP الأساسية الثلاث (MCP Primitives)');
    await expect(content).toContainText('1. الأدوات (Tools)');
    await expect(content).toContainText('2. الموارد (Resources)');
    await expect(content).toContainText('3. البرومبتات (Prompts)');

    // Content: Security & local configuration
    await expect(content).toContainText('أمان التكوين وحماية الأسرار في MCP');
    await expect(content).toContainText('عزل ملفات تكوين MCP');
    await expect(content).toContainText('المسار البديل اليدوي');

    // SVG MCP Architecture diagram
    const mcpSvg = page.locator('.diagram-box svg');
    await expect(mcpSvg).toBeVisible();

    // Navigation bounds: Prev -> Topic 26 (agent-skills)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/agent-skills');
  });

  test('Homepage displays topics 24, 25, 26, 27 with detail modal and Escape close', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('article.topic-card');
    const topic24Card = cards.filter({ hasText: 'وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)' });
    const topic25Card = cards.filter({ hasText: 'استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول' });
    const topic26Card = cards.filter({ hasText: 'المهارات المخصصة (Skills) وتوجيه وكيل البرمجة' });
    const topic27Card = cards.filter({ hasText: 'بروتوكول سياق النموذج (MCP - Model Context Protocol)' });

    await expect(topic24Card).toBeVisible();
    await expect(topic25Card).toBeVisible();
    await expect(topic26Card).toBeVisible();
    await expect(topic27Card).toBeVisible();

    // Open detail modal for Topic 24
    await topic24Card.getByRole('button', { name: 'معاينة سريعة' }).click();
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)');
    await expect(modal).toContainText('docs/CODING_AGENT_SETUP.md');

    // Close modal with Escape key
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('Copy button interaction copies text and provides user feedback', async ({ page }) => {
    await page.goto('/learn/ai-coding-agent');

    const copyBtn = page.locator('.code-container button.copy-btn').first();
    await expect(copyBtn).toBeVisible();
    await expect(copyBtn).toContainText('نسخ الكود');

    // Grant clipboard permissions and click copy
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await copyBtn.click();

    // Button label should show confirmation
    await expect(copyBtn).toContainText('تم النسخ');
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
      await page.goto('/learn/ai-coding-agent');

      // Check RTL root
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

      // Check main headings visible
      await expect(page.locator('h1')).toBeVisible();

      // Check no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allow sub-pixel rounding
    }
  });

});
