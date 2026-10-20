import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 11: TypeScript, React, Tailwind CSS, Next.js', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  // -------------------------------------------------------------------------
  // TOPIC 30: TYPESCRIPT (Types & Data Contracts)
  // -------------------------------------------------------------------------
  test('Topic 30 (TypeScript): Data contracts derived from ERD, union types, and frontend-only boundary', async ({ page }) => {
    await page.goto('/learn/typescript-types');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('TypeScript: الأنواع وعقود البيانات لمشروع الطالب');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('src/types/project.ts');
    await expect(header).toContainText('docs/TYPESCRIPT_GUIDELINES.md');

    // RTL verification
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Content: Purpose and project level (no bloated academic course)
    const content = page.locator('article').first();
    await expect(content).toContainText('المستوى اللازم للمشروع: لماذا TypeScript وما الذي نحتاجه فعلاً؟');
    await expect(content).toContainText('عقود بيانات صلبة (Data Contracts)');
    await expect(content).toContainText('noImplicitAny');

    // Content: Derived from ERD and Domain Model
    await expect(content).toContainText('تحويل مخطط ERD وجرد الشاشات إلى واجهات TypeScript');
    await expect(content).toContainText('BorrowHub');
    await expect(content).toContainText('UserRole');
    await expect(content).toContainText('LoanStatus');

    // Content: Testing examples vs production code, and Frontend-Only boundary
    await expect(content).toContainText('حدود كود التجريب مقابل كود المشروع المعتمد وتوضيح غياب Backend');
    await expect(content).toContainText('لا يدّعي هذا المشروع وجود Backend أو قاعدة بيانات حقيقية في هذه المحطة');

    // SVG Flow Diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with LTR direction and copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    // Steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Navigation bounds: Next -> Topic 31 (react-components-state)
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/react-components-state');
  });

  // -------------------------------------------------------------------------
  // TOPIC 31: REACT (Components, State & Data Flow)
  // -------------------------------------------------------------------------
  test('Topic 31 (React): Component hierarchy, UI=f(state), React 19 use client, and StatusBadge', async ({ page }) => {
    await page.goto('/learn/react-components-state');

    // Title and headers
    await expect(page.locator('h1')).toContainText('React: المكونات والحالة وتدفق البيانات في الواجهة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('src/components/common/StatusBadge.tsx');
    await expect(header).toContainText('docs/REACT_ARCHITECTURE.md');

    const content = page.locator('article').first();

    // Content: Mental model UI = f(state)
    await expect(content).toContainText('UI = f(state)');
    await expect(content).toContainText('المكونات الذرية (UI Atoms)');
    await expect(content).toContainText('المكونات المركبة (Molecules)');

    // Content: One-way data flow & four UI states
    await expect(content).toContainText('تدفق البيانات أحادي الاتجاه (One-Way Data Flow)');
    await expect(content).toContainText('حالات الواجهة الأربع الإلزامية');

    // Content: React 19 use client directive
    await expect(content).toContainText('مكونات الخادم والعميل في React 19');
    await expect(content).toContainText('use client');

    // Concrete component code and isolation
    await expect(content).toContainText('StatusBadge.tsx');
    await expect(content).toContainText('اختبار المكونات في عزلة تامة دون خادم خلفي');

    // SVG hierarchy diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Navigation: Prev -> Topic 30 (typescript-types), Next -> Topic 32 (tailwind-css-responsive)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/typescript-types');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/tailwind-css-responsive');
  });

  // -------------------------------------------------------------------------
  // TOPIC 32: TAILWIND CSS (Styling, Breakpoints & RTL)
  // -------------------------------------------------------------------------
  test('Topic 32 (Tailwind CSS): DESIGN.md tokens, RTL logical properties, and 5 responsive breakpoints', async ({ page }) => {
    await page.goto('/learn/tailwind-css-responsive');

    // Title and headers
    await expect(page.locator('h1')).toContainText('Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('src/app/globals.css');
    await expect(header).toContainText('docs/TAILWIND_DESIGN_MAPPING.md');

    const content = page.locator('article').first();

    // Content: Mapped to approved DESIGN.md values (not invented)
    await expect(content).toContainText('التنسيق المستند إلى نظام التصميم المعتمد لا إلى قيم عشوائية');
    await expect(content).toContainText('DESIGN.md');
    await expect(content).toContainText('emerald-600');
    await expect(content).toContainText('slate-900');

    // Content: RTL First with logical properties
    await expect(content).toContainText('دعم العربية والاتجاه (RTL) باستخدام الخصائص المنطقية');
    await expect(content).toContainText('ms-');
    await expect(content).toContainText('me-');
    await expect(content).toContainText('text-start');

    // Content: 5 Official breakpoints
    await expect(content).toContainText('نقاط كسر التجاوب الرسمية للمسار (390، 768، 1024، 1366، 1440 بكسل)');
    await expect(content).toContainText('390px (الهاتف الذكي)');
    await expect(content).toContainText('768px (الأجهزة اللوحية)');
    await expect(content).toContainText('1024px (الشاشات المحمولة)');
    await expect(content).toContainText('1366px (الحواسيب العادية)');
    await expect(content).toContainText('1440px (الشاشات العريضة)');

    // SVG responsive diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Navigation: Prev -> Topic 31 (react-components-state), Next -> Topic 33 (nextjs-app-router)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/react-components-state');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/nextjs-app-router');
  });

  // -------------------------------------------------------------------------
  // TOPIC 33: NEXT.JS (App Router, Routes & Frontend-Only Boundary)
  // -------------------------------------------------------------------------
  test('Topic 33 (Next.js): App Router tree, layout.tsx, next/link, and Frontend-Only boundary', async ({ page }) => {
    await page.goto('/learn/nextjs-app-router');

    // Title and headers
    await expect(page.locator('h1')).toContainText('Next.js: بنية App Router والمسارات والصفحات');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('src/app/layout.tsx');
    await expect(header).toContainText('docs/NEXTJS_ROUTING_SPEC.md');

    const content = page.locator('article').first();

    // Content: App Router structure
    await expect(content).toContainText('Next.js 15 App Router');
    await expect(content).toContainText('layout.tsx');
    await expect(content).toContainText('page.tsx');
    await expect(content).toContainText('loading.tsx');
    await expect(content).toContainText('not-found.tsx');

    // Content: Mapped to SCREEN_INVENTORY.md
    await expect(content).toContainText('تحويل وثيقة جرد الشاشات (SCREEN_INVENTORY.md) إلى شجرة مسارات');
    await expect(content).toContainText('equipment/page.tsx');
    await expect(content).toContainText('[id]/page.tsx');

    // Content: Explicit Frontend-Only boundary (no real backend)
    await expect(content).toContainText('حدود التنفيذ الحاسمة: موقع Frontend-Only ولا وجود لـ Backend فعلي هنا!');
    await expect(content).toContainText('لا يتصل بأي خادم Backend حقيقي ولا بقاعدة بيانات PostgreSQL');

    // Content: Client navigation
    await expect(content).toContainText('التنقل الفوري من جانب العميل باستخدام next/link');

    // SVG routing tree diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Navigation: Prev -> Topic 32 (tailwind-css-responsive)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/tailwind-css-responsive');
  });

  // -------------------------------------------------------------------------
  // REQUIRED EDUCATIONAL SECTIONS RENDERING ACROSS ALL 4 TOPICS
  // -------------------------------------------------------------------------
  test('All 4 topics in group-11 render their required educational sections', async ({ page }) => {
    const slugs = [
      'typescript-types',
      'react-components-state',
      'tailwind-css-responsive',
      'nextjs-app-router',
    ];

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);

      // Main article and learning activities container
      const activities = page.locator('.learning-activities');
      await expect(activities).toBeVisible();

      // Objectives section
      await expect(activities.getByRole('heading', { name: 'أهداف التعلّم' })).toBeVisible();

      // Practical steps section
      await expect(activities.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();

      // Worked examples section
      await expect(activities.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();

      // Candidate videos section
      await expect(activities.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();

      // Quiz section
      await expect(activities.getByRole('button', { name: 'إرسال الإجابات' })).toBeVisible();

      // Practical assessment rubric section
      await expect(activities.getByRole('heading', { name: 'مخرجات المشروع لمراجعتها' })).toBeVisible();
      await expect(activities.getByLabel('اختيارك للتقييم الذاتي').first()).toBeVisible();
    }
  });

  // -------------------------------------------------------------------------
  // PRACTICAL STEPS AND EXPECTED OUTPUT COPYABILITY
  // -------------------------------------------------------------------------
  test('Practical steps and expected outputs are present and copyable on Topic 30 (typescript-types)', async ({ page }) => {
    await page.goto('/learn/typescript-types');

    const activities = page.locator('.learning-activities');
    const stepsSection = activities.locator('ol').first();
    await expect(stepsSection).toBeVisible();

    // Verify concrete expected outputs are present in the list
    await expect(stepsSection).toContainText('المخرج المتوقع');
    await expect(stepsSection).toContainText('Equipment له id/name وRequestStatus محصور بالقيم الموثقة');
    await expect(stepsSection).toContainText('docs/TYPESCRIPT_GUIDELINES.md');

    // Code container copy button
    const copyBtn = page.locator('article').first().locator('.code-container').first().locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('LoanStatus');
    expect(clipboardText).toContain('Equipment');
  });

  // -------------------------------------------------------------------------
  // OBJECTIVE QUIZ GRADING AND EXPLANATION
  // -------------------------------------------------------------------------
  test('Quiz grades answers, provides explanations, and allows retry on Topic 30 (typescript-types)', async ({ page }) => {
    await page.goto('/learn/typescript-types');

    const activities = page.locator('.learning-activities');
    const q1 = activities.getByRole('group', { name: /ERD يحدد أربع حالات/ });
    const q2 = activities.getByRole('group', { name: /وصل JSON بحالة غير موجودة/ });

    // Answer Q1 correctly, Q2 incorrectly
    await q1.getByRole('radio', { name: "status: 'draft' | 'submitted' | 'accepted' | 'cancelled'" }).check();
    await q2.getByRole('radio', { name: 'TypeScript يضمن JSON وقت التشغيل.' }).check();

    await activities.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Verify score banner
    await expect(activities.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Verify explanations
    await expect(q1.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1.getByRole('status')).toContainText('الاتحاد الحرفي يقيد القيم المعتمدة');
    await expect(q2.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2.getByRole('status')).toContainText('الأنواع لا تتحقق آلياً من بيانات خارجية أثناء التشغيل');

    // Click retry
    const retryBtn = activities.getByRole('button', { name: 'إعادة المحاولة', exact: true });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();

    // Answer both correctly
    await q1.getByRole('radio', { name: "status: 'draft' | 'submitted' | 'accepted' | 'cancelled'" }).check();
    await q2.getByRole('radio', { name: 'تحقق عند حد البيانات؛ النوع الساكن لا يفحص JSON وحده.' }).check();
    await activities.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Verify full score
    await expect(activities.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // CHECKLIST AND RUBRIC PERSISTENCE AND REVERSAL
  // -------------------------------------------------------------------------
  test('Checklist and rubric can be edited, reversed, and survive reload on Topic 30 (typescript-types)', async ({ page }) => {
    await page.goto('/learn/typescript-types');

    const activities = page.locator('.learning-activities');
    const criterionSource = activities.getByRole('group', { name: 'مصدر العقد' });
    const criterionBoundary = activities.getByRole('group', { name: 'فحص الحد' });

    // Select self-assessment levels
    await criterionSource.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await criterionBoundary.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    // Check first checklist item in sidebar
    const checklist = page.getByRole('complementary').getByRole('checkbox').first();
    await checklist.check();
    await expect(checklist).toBeChecked();

    // Reload page and verify persistence
    await page.reload();
    await expect(criterionSource.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(criterionBoundary.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();

    // Reverse choices
    await criterionSource.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await criterionBoundary.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await page.getByRole('complementary').getByRole('checkbox').first().uncheck();

    // Reload page and verify reversed state
    await page.reload();
    await expect(criterionSource.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(criterionBoundary.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
  });

  // -------------------------------------------------------------------------
  // RTL PROSE AND LTR CODE RENDERING
  // -------------------------------------------------------------------------
  test('RTL prose with LTR technical code renders correctly across Group 11', async ({ page }) => {
    await page.goto('/learn/typescript-types');

    // Document root has dir="rtl"
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Code container has dir="ltr"
    const codeContainers = page.locator('.code-container');
    const count = await codeContainers.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(codeContainers.nth(i)).toHaveAttribute('dir', 'ltr');
    }

    // Technical identifiers have LTR monospace styling
    const headerCode = page.locator('header.rounded-3xl code').first();
    await expect(headerCode).toHaveAttribute('dir', 'ltr');
  });

  // -------------------------------------------------------------------------
  // RESPONSIVE VIEWPORT TESTS (No Horizontal Overflow)
  // -------------------------------------------------------------------------
  const viewports = [
    { width: 390, height: 844, name: 'Mobile 390px' },
    { width: 768, height: 1024, name: 'Tablet 768px' },
    { width: 1024, height: 768, name: 'Laptop 1024px' },
    { width: 1366, height: 768, name: 'Desktop 1366px' },
    { width: 1440, height: 900, name: 'Widescreen 1440px' },
  ];

  for (const vp of viewports) {
    test(`Responsive check at ${vp.name} on all 4 topics with zero horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const slugs = [
        'typescript-types',
        'react-components-state',
        'tailwind-css-responsive',
        'nextjs-app-router',
      ];

      for (const slug of slugs) {
        await page.goto(`/learn/${slug}`);
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(isOverflowing).toBe(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // INTERACTIVE COPY BUTTON FEEDBACK
  // -------------------------------------------------------------------------
  test('Code copy button provides visual feedback on click', async ({ page }) => {
    await page.goto('/learn/typescript-types');
    const copyButton = page.locator('article').first().locator('.copy-btn').first();
    await expect(copyButton).toBeVisible();

    // Click copy button
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
  });
});
