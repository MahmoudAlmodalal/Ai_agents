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
    const content = page.locator('article').first();
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
    const brokenLinks = await page.locator('article').first().locator('a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Learning activities: sections, objectives, practical steps, worked examples, video candidate
    const activities = page.locator('.learning-activities');
    await expect(activities).toBeVisible();
    await expect(activities).toContainText('أهداف التعلّم');
    await expect(activities).toContainText('تهيئة وكيل البرمجة بسياق ملفات وقواعد المشروع وحدود المهام');
    await expect(activities).toContainText('المدخل: مستودع وقواعد مكتوبة');
    await expect(activities).toContainText('حدود التفويض');
    await expect(activities).toContainText('الأسرار ليست سياقاً عاماً');
    await expect(activities).toContainText('خطوات التطبيق ومخرجاتها');
    await expect(activities).toContainText('docs/CODING_AGENT_SETUP.md');
    await expect(activities).toContainText('.env.example');
    await expect(activities).toContainText('أمثلة محلولة');
    await expect(activities).toContainText('مهمة مراجعة وثائق');
    await expect(activities).toContainText('موارد فيديو خارجية');
    await expect(activities).toContainText('Codex for Beginners');

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

    const content = page.locator('article').first();

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

    // Learning activities: sections, objectives, practical steps, worked examples, video candidate
    const activities = page.locator('.learning-activities');
    await expect(activities).toBeVisible();
    await expect(activities).toContainText('أهداف التعلّم');
    await expect(activities).toContainText('إجراء تجربة نموذج موثقة مع تعليمات ومدخلات ومخرجات قابلة للمراجعة');
    await expect(activities).toContainText('المدخل: مخطط وهدف تجربة');
    await expect(activities).toContainText('Mock data لا بيانات حقيقية');
    await expect(activities).toContainText('مفتاح API منفصل');
    await expect(activities).toContainText('خطوات التطبيق ومخرجاتها');
    await expect(activities).toContainText('docs/AI_STUDIO_WORKFLOW.md');
    await expect(activities).toContainText('src/data/mock-data.json');
    await expect(activities).toContainText('أمثلة محلولة');
    await expect(activities).toContainText('بيانات استعارة اصطناعية');
    await expect(activities).toContainText('موارد فيديو خارجية');
    await expect(activities).toContainText('Google AI Studio for developers');

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

    const content = page.locator('article').first();

    // Content: Golden Rule
    await expect(content).toContainText('القاعدة الذهبية لمسار Ai_agents');
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

    // Learning activities: sections, objectives, practical steps, worked examples, video candidate
    const activities = page.locator('.learning-activities');
    await expect(activities).toBeVisible();
    await expect(activities).toContainText('أهداف التعلّم');
    await expect(activities).toContainText('كتابة Skill صغيرة توجه الوكيل إلى معايير المشروع');
    await expect(activities).toContainText('المدخل: قاعدة متكررة قابلة لإعادة الاستخدام');
    await expect(activities).toContainText('تعليمات وإشارة استخدام');
    await expect(activities).toContainText('فعّل عند الحاجة');
    await expect(activities).toContainText('خطوات التطبيق ومخرجاتها');
    await expect(activities).toContainText('docs/PROJECT_AGENT_SKILLS.md');
    await expect(activities).toContainText('docs/skills/frontend-standards.md');
    await expect(activities).toContainText('أمثلة محلولة');
    await expect(activities).toContainText('معايير واجهة RTL');
    await expect(activities).toContainText('موارد فيديو خارجية');
    await expect(activities).toContainText('Agent Skills: Transform Claude from Assistant to Specialized Agent');

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

    const content = page.locator('article').first();

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

    // Learning activities: sections, objectives, practical steps, worked examples, video candidate
    const activities = page.locator('.learning-activities');
    await expect(activities).toBeVisible();
    await expect(activities).toContainText('أهداف التعلّم');
    await expect(activities).toContainText('شرح أدوار host وclient وserver');
    await expect(activities).toContainText('المدخل: حاجة لتكامل محدد');
    await expect(activities).toContainText('الأدوار والرسائل');
    await expect(activities).toContainText('الأمان محلي أولاً');
    await expect(activities).toContainText('خطوات التطبيق ومخرجاتها');
    await expect(activities).toContainText('docs/MCP_FOUNDATIONS.md');
    await expect(activities).toContainText('نموذج config محلي بعناصر placeholder');
    await expect(activities).toContainText('أمثلة محلولة');
    await expect(activities).toContainText('قراءة شاشة تصميم');
    await expect(activities).toContainText('موارد فيديو خارجية');
    await expect(activities).toContainText('Why we built—and donated—the Model Context Protocol (MCP)');

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

  test('Copy buttons across all group topics copy instructions/configs and give feedback', async ({ page }) => {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    const topics = [
      { slug: 'ai-coding-agent', btnLabel: 'نسخ الكود' },
      { slug: 'google-ai-studio', btnLabel: 'نسخ البرومبت' },
      { slug: 'agent-skills', btnLabel: 'نسخ المهارة' },
      { slug: 'mcp-protocol', btnLabel: 'نسخ التكوين' }
    ];

    for (const t of topics) {
      await page.goto(`/learn/${t.slug}`);
      const copyBtn = page.locator('.code-container button.copy-btn').first();
      await expect(copyBtn).toBeVisible();
      await expect(copyBtn).toContainText(t.btnLabel);

      await copyBtn.click();
      await expect(copyBtn).toContainText('تم النسخ');
    }
  });

  test('Quiz grades answers, provides feedback and explanation, supports retry, and persists across reload', async ({ page }) => {
    await page.goto('/learn/ai-coding-agent');

    const activity = page.locator('.learning-activities');
    await expect(activity).toBeVisible();

    const quiz = activity.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
    await expect(quiz).toBeVisible();

    // Question 1: agent-q-secret
    const q1 = quiz.getByRole('group', { name: /ما القيمة الصحيحة/ });
    // Select incorrect option: "مفتاح API الحقيقي"
    await q1.getByRole('radio', { name: 'مفتاح API الحقيقي' }).check();

    // Question 2: agent-q-scope
    const q2 = quiz.getByRole('group', { name: /أي طلب يعطي الوكيل/ });
    // Select correct option: "راجع ملفين محددين واعرض فرقاً مقترحاً دون نشر"
    await q2.getByRole('radio', { name: /راجع ملفين محددين/ }).check();

    // Submit quiz
    await quiz.getByRole('button', { name: 'إرسال الإجابات' }).click();

    // Score banner: 1 / 2
    await expect(quiz.getByText(/1 \/ 2/).first()).toBeVisible();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Feedback status and explanation
    await expect(q1.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q1.getByRole('status')).toContainText('ملف المثال يوضح أسماء الإعدادات دون كشف اعتماد فعلي');

    await expect(q2.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q2.getByRole('status')).toContainText('النطاق المحدد والمخرج القابل للمراجعة');

    // Retry quiz
    const retryBtn = quiz.getByRole('button', { name: 'إعادة المحاولة' });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();

    // Now select correct answer for q1
    await q1.getByRole('radio', { name: /اسم المتغير مع placeholder/ }).check();
    // And correct answer for q2
    await q2.getByRole('radio', { name: /راجع ملفين محددين/ }).check();

    await quiz.getByRole('button', { name: 'إرسال الإجابات' }).click();

    // Score banner: 2 / 2
    await expect(quiz.getByText(/2 \/ 2/).first()).toBeVisible();
    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();

    // Verify persistence across reload
    await page.reload();
    const reloadedQuiz = page.locator('.learning-activities').getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
    await expect(reloadedQuiz.getByText(/آخر نتيجة محفوظة في هذا المتصفح/)).toBeVisible();
    await expect(reloadedQuiz.getByText(/2 \/ 2/).first()).toBeVisible();
  });

  test('Practical checklist and rubric can be edited, reversed, and survive reload', async ({ page }) => {
    await page.goto('/learn/ai-coding-agent');

    const activity = page.locator('.learning-activities');
    await expect(activity).toBeVisible();

    // Locate the practical assessment section
    const rubric = activity.locator('section').filter({ hasText: 'تقييم ذاتي لمشروعك' }).first();
    await expect(rubric).toBeVisible();

    // Criteria fieldsets
    const boundaryCriterion = rubric.getByRole('group').filter({ hasText: 'حدود المهمة' });
    const secretCriterion = rubric.getByRole('group').filter({ hasText: 'عزل الأسرار' });

    await expect(boundaryCriterion).toBeVisible();
    await expect(secretCriterion).toBeVisible();

    // Select ratings
    await boundaryCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await secretCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    // Verify values before reload
    await expect(boundaryCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(secretCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    // Reload and check persistence
    await page.reload();
    const reloadedBoundary = page.locator('.learning-activities').getByRole('group').filter({ hasText: 'حدود المهمة' });
    const reloadedSecret = page.locator('.learning-activities').getByRole('group').filter({ hasText: 'عزل الأسرار' });

    await expect(reloadedBoundary.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(reloadedSecret.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    // Reverse the boundary criterion back to unrated
    await reloadedBoundary.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await expect(reloadedBoundary.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');

    // Reload again and verify reversal survived
    await page.reload();
    const finalBoundary = page.locator('.learning-activities').getByRole('group').filter({ hasText: 'حدود المهمة' });
    const finalSecret = page.locator('.learning-activities').getByRole('group').filter({ hasText: 'عزل الأسرار' });

    await expect(finalBoundary.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(finalSecret.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');
  });

  test('RTL prose with LTR code blocks renders properly across group topics', async ({ page }) => {
    const slugs = ['ai-coding-agent', 'google-ai-studio', 'agent-skills', 'mcp-protocol'];

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);

      // Root html dir is RTL
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

      // Main article content area
      const article = page.locator('article').first();
      await expect(article).toBeVisible();

      // All code containers must explicitly be LTR
      const codeContainers = article.locator('.code-container');
      const count = await codeContainers.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const container = codeContainers.nth(i);
        await expect(container).toHaveAttribute('dir', 'ltr');
        await expect(container.locator('code')).toBeVisible();
      }
    }
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

  test('Responsive 390px mobile viewport renders all group topics without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const slugs = ['ai-coding-agent', 'google-ai-studio', 'agent-skills', 'mcp-protocol'];

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);

      // Check RTL root
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

      // Check main headings visible
      await expect(page.locator('h1')).toBeVisible();

      // Check no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    }
  });

});
