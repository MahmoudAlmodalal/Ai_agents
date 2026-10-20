import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 12: Frontend Planning, UI/UX Pro Max, Spec Kit & Incremental Implementation (Slots 34-37)', () => {

  test('Topic 34 (Frontend Planning): Routes, components hierarchy, data contracts, and small verifiable tasks', async ({ page }) => {
    await page.goto('/learn/frontend-architecture-planning');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/FRONTEND_PLAN.md');
    await expect(header).toContainText('docs/FRONTEND_TASKS.md');
    await expect(header).toContainText('docs/ROUTES_MAP.md');
    await expect(header).toContainText('docs/COMPONENT_ARCHITECTURE.md');
    await expect(header).toContainText('docs/FRONTEND_DATA_CONTRACTS.md');

    // RTL directionality
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Content: Architecture before code & avoiding monolithic vibe coding
    const content = page.locator('article').first();
    await expect(content).toContainText('لماذا يسبق التخطيط المعماري أي كتابة للكود البرمجي؟');
    await expect(content).toContainText('البرمجة الاندفاعية');
    await expect(content).toContainText('docs/PRD.md');
    await expect(content).toContainText('docs/SCREEN_INVENTORY.md');
    const prereqSection = content.locator('section').filter({ hasText: 'المتطلبات السابقة' });
    await expect(prereqSection).toContainText('نظام التصميم DESIGN.md ومراجع شاشات Stitch');
    await expect(content.locator('code').filter({ hasText: /^DESIGN\.md$/ }).first()).toBeVisible();
    await expect(content).toContainText('نظام التصميم (DESIGN.md ومراجع Stitch)');
    await expect(content).not.toContainText('docs/DESIGN.md');

    // Content: Frontend-Only boundary
    await expect(content).toContainText('حدود النطاق الصارمة: الواجهة الأمامية فقط');
    await expect(content).toContainText('Frontend Only');

    // Content: Routes Map & Next.js App Router
    await expect(content).toContainText('شجرة المسارات وهيكلية Next.js App Router');
    await expect(content).toContainText('layout.tsx');
    await expect(content).toContainText('loading.tsx');
    await expect(content).toContainText('error.tsx');
    await expect(content).toContainText('not-found.tsx');
    await expect(content).toContainText('/equipment');
    await expect(content).toContainText('/requests');
    await expect(content).toContainText('/admin/inventory');

    // Content: Component Architecture (Primitives, Layout, Features)
    await expect(content).toContainText('هرمية المكونات وفصل المسؤوليات');
    await expect(content).toContainText('المكونات القاعدية (UI Primitives)');
    await expect(content).toContainText('مكونات الهيكل (Layout Components)');
    await expect(content).toContainText('مكونات الميزات (Feature Modules)');

    // Content: TypeScript Data contracts
    await expect(content).toContainText('عقود بيانات الفرونت إند والأنواع الصارمة');
    await expect(content).toContainText('EquipmentStatus');
    await expect(content).toContainText('interface Equipment');
    await expect(content).toContainText('interface LoanRequest');

    // Content: Small Verifiable Tasks
    await expect(content).toContainText('استراتيجية التفكيك إلى مهام ذرية صغيرة قابلة للتحقق');
    await expect(content).toContainText('TASK-FE-03');
    await expect(content).toContainText('npx tsc --noEmit && npm run build');

    // SVG architecture diagram
    const svg = page.locator('.diagram-box svg');
    await expect(svg).toBeVisible();

    // Zero broken anchor links in article
    const brokenLinks = await page.locator('article').first().locator('a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Navigation bounds
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/nextjs-app-router');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/ui-ux-pro-max-review');
  });

  test('Topic 35 (UI/UX Pro Max): Verified official CLI, 5 audit dimensions, WCAG AA & touch targets', async ({ page }) => {
    await page.goto('/learn/ui-ux-pro-max-review');

    // Title and headers
    await expect(page.locator('h1')).toContainText('مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/UI_UX_PRO_MAX_AUDIT.md');

    const content = page.locator('article').first();

    // Content: Proper placement in workflow
    await expect(content).toContainText('التموضع الهندسي لأداة UI/UX Pro Max في مسار التطوير');
    await expect(content).toContainText('UI/UX Pro Max لا تستبدل الهوية البصرية المعتمدة في DESIGN.md');

    // Content: Verified vs official source
    await expect(content).toContainText('مراجعة الأوامر والاعتماد مقابل المصادر الرسمية');
    await expect(content).toContainText('مُراجع ومطابق للمستودع الرسمي (Verified against official repo)');
    const officialRepoLink = page.locator('a[href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"]');
    await expect(officialRepoLink).toBeVisible();
    await expect(content).toContainText('npm install -g ui-ux-pro-max-cli');
    await expect(content).toContainText('uipro init --ai antigravity');
    await expect(content).toContainText('npx ui-ux-pro-max-cli init --ai antigravity');

    // Content: 5 Core Audit dimensions
    await expect(content).toContainText('أبعاد المراجعة الخمسة الأساسية في تدقيق الواجهات');
    await expect(content).toContainText('الدقة البصرية وتوكنز التصميم');
    await expect(content).toContainText('تكامل الحالات التفاعلية');
    await expect(content).toContainText('إمكانية الوصول وتباين الألوان (WCAG AA)');
    await expect(content).toContainText('أهداف اللمس على الهواتف (Touch Targets)');
    await expect(content).toContainText('44×44 بكسل');
    await expect(content).toContainText('مرونة التجاوب وانعدام التمرير الأفقي');

    // Content: BorrowHub practical audit example
    await expect(content).toContainText('نموذج تقرير مراجعة مكون بطاقة المعدة');
    await expect(content).toContainText('PASS');
    await expect(content).toContainText('FIXED');

    // SVG Diagram
    const svg = page.locator('.diagram-box svg');
    await expect(svg).toBeVisible();

    // Navigation bounds
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/frontend-architecture-planning');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/spec-kit-workflow');
  });

  test('Topic 36 (Spec Kit): Official specify-cli, pre-init commit warning, constitution & slash commands', async ({ page }) => {
    await page.goto('/learn/spec-kit-workflow');

    // Title and headers
    await expect(page.locator('h1')).toContainText('تنظيم المواصفات وتطوير الميزات بـ Spec Kit');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/rules/frontend.md');
    await expect(header).toContainText('specs/001-equipment-browsing/spec.md');

    const content = page.locator('article').first();

    // Content: Specification-Driven Development philosophy
    await expect(content).toContainText('فلسفة التطوير القائم على المواصفات');
    await expect(content).toContainText('الغموض الصامت');
    await expect(content).toContainText('ما هو دستور المشروع (Constitution)؟');

    // Content: Verified against official GitHub repository
    await expect(content).toContainText('مراجعة الأداة ومتطلباتها مقابل المصادر الرسمية');
    await expect(content).toContainText('مُراجع ومطابق للمستودع الرسمي (Verified against official repo)');
    const specRepoLink = page.locator('a[href="https://github.com/github/spec-kit"]');
    await expect(specRepoLink).toBeVisible();
    await expect(content).toContainText('uv tool install specify-cli');
    await expect(content).toContainText('specify version');
    await expect(content).toContainText('specify init --here --integration agy');

    // Content: Pre-init commit warning
    await expect(content).toContainText('تحذير إلزامي: احفظ عملك بنسخة Git Commit قبل التهيئة!');

    // Content: Slash commands lifecycle
    await expect(content).toContainText('دورة حياة تطوير الميزات بـ Slash Commands');
    await expect(content).toContainText('/speckit-constitution');
    await expect(content).toContainText('/speckit-specify');
    await expect(content).toContainText('/speckit-clarify');
    await expect(content).toContainText('/speckit-plan');
    await expect(content).toContainText('/speckit-tasks');
    await expect(content).toContainText('/speckit-analyze');
    await expect(content).toContainText('/speckit-implement');
    await expect(content).toContainText('/speckit-converge');

    // SVG Diagram
    const svg = page.locator('.diagram-box svg');
    await expect(svg).toBeVisible();

    // Navigation bounds
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/ui-ux-pro-max-review');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/frontend-incremental-implementation');
  });

  test('Topic 37 (Frontend Implementation): Incremental loop, explicit mock data, 4 UI states & stop-and-verify', async ({ page }) => {
    await page.goto('/learn/frontend-incremental-implementation');

    // Title and headers
    await expect(page.locator('h1')).toContainText('التنفيذ التدريجي للفرونت إند وحالات الواجهة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/FRONTEND_EXECUTION_LOG.md');

    const content = page.locator('article').first();

    // Content: Stop & Verify
    await expect(content).toContainText('مبدأ التنفيذ التدريجي والتوقف الذكي (Stop & Verify)');
    await expect(content).toContainText('أمر التوقف الإلزامي (The STOP Directive)');

    // Content: Explicit typed mock data placeholder & no false integration
    await expect(content).toContainText('البيانات التمثيلية الصريحة وحدود الفرونت إند');
    await expect(content).toContainText('MOCK_EQUIPMENT');
    await expect(content).toContainText('SN-FX3-9941');
    await expect(content).toContainText('بيانات تمثيلية صريحة (Mock Data Placeholder)');

    // Content: 4 Mandatory UI States
    await expect(content).toContainText('حالات الواجهة الأربع الإلزامية');
    await expect(content).toContainText('حالة التحميل (Loading / Skeleton State)');
    await expect(content).toContainText('حالة النجاح وتوفر البيانات (Success / Populated)');
    await expect(content).toContainText('حالة الفراغ (Empty State)');
    await expect(content).toContainText('حالة الخطأ (Error Boundary State)');

    // Content: The Strict Execution Loop (Check Change -> Return to Specs -> Save Work)
    await expect(content).toContainText('حلقة التنفيذ الهندسية الصارمة');
    await expect(content).toContainText('1. فحص التغيير (Check Change)');
    await expect(content).toContainText('2. الرجوع للمتطلبات والتصميم (Return to Specs)');
    await expect(content).toContainText('3. حفظ العمل في Git (Save Work)');

    // Prompts
    await expect(content).toContainText('PROMPT 28 — speckit-implement');
    await expect(content).toContainText('PROMPT 29 — Final Frontend QA');
    await expect(content).toContainText('PROMPT 30 — GitHub Handoff');

    // SVG Diagram
    const svg = page.locator('.diagram-box svg');
    await expect(svg).toBeVisible();

    // Navigation bounds: Prev -> Topic 36, Next -> published Topic 38.
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/spec-kit-workflow');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/python-backend-foundation');
  });

  test('Homepage displays topics 34, 35, 36, 37 with detail modal and Escape close', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('article.topic-card');
    const topic34Card = cards.filter({ hasText: 'تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)' });
    const topic35Card = cards.filter({ hasText: 'مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max' });
    const topic36Card = cards.filter({ hasText: 'تنظيم المواصفات وتطوير الميزات بـ Spec Kit' });
    const topic37Card = cards.filter({ hasText: 'التنفيذ التدريجي للفرونت إند وحالات الواجهة' });

    await expect(topic34Card).toBeVisible();
    await expect(topic35Card).toBeVisible();
    await expect(topic36Card).toBeVisible();
    await expect(topic37Card).toBeVisible();

    // Open detail modal for Topic 34
    await topic34Card.getByRole('button', { name: 'معاينة سريعة' }).click();
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('تخطيط واجهة المستخدم وهندسة الفرونت إند');
    await expect(modal).toContainText('docs/FRONTEND_PLAN.md');

    // Close modal with Escape key
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('Copy button interaction copies text and provides user feedback', async ({ page }) => {
    await page.goto('/learn/frontend-architecture-planning');

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
      await page.goto('/learn/frontend-architecture-planning');

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
