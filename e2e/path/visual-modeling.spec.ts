import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Topic 04: Visual Modeling (Mermaid, User Flow, Domain Model)', () => {
  test('Topic 07 (Mermaid Syntax): Displays LTR code, RTL explanations, copy button, and valid renderer', async ({ page }) => {
    await page.goto('/learn/mermaid-syntax');

    // Header & metadata
    await expect(page.locator('h1')).toContainText('Mermaid');
    await expect(page.locator('header').getByText('أدوات الرسم والنمذجة', { exact: true })).toBeVisible();

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
    const flowCode = page.locator('.code-container').filter({ has: page.getByRole('button', { name: 'نسخ كود مسار الاستعارة', exact: true }) });
    await expect(flowCode).toBeVisible();
    const flowText = await flowCode.innerText();

    // Decision points
    expect(flowText).toContain('CheckAuth');
    expect(flowText).toContain('CheckActiveLoans');
    expect(flowText).toContain('CheckStock');
    expect(flowText).toContain('AdminDecision');

    // Tied to PRD requirements (Rule 3)
    await expect(page.locator('article').first()).toContainText('الحد الأقصى 2 استعارة نشطة - القاعدة 3');

    // Success path
    expect(flowText).toContain('Handover');
    expect(flowText).toContain('تأكيد التسليم');
    expect(flowText).toContain('ActiveLoan');

    // Failure / exception paths
    expect(flowText).toContain('ExitAuth');
    expect(flowText).toContain('ExitStock');
    expect(flowText).toContain('ExitLimit');
    expect(flowText).toContain('ExitReject');

    // Output deliverable
    await expect(page.locator('article').first()).toContainText('docs/user-flow.md');
  });

  test('Topic 09 (Domain Model): Strictly conceptual without DB keys, SQL types, or functions', async ({ page }) => {
    await page.goto('/learn/conceptual-domain-model');

    // Title
    await expect(page.locator('h1')).toContainText('Domain Model');

    // Verifies Prompt 06 is embedded
    const promptHeader = page.locator('text=PROMPT 06 — Conceptual Domain Model');
    await expect(promptHeader).toBeVisible();

    // Inspect the Domain Model Mermaid source code
    const domainCodeContainer = page.locator('.code-container').filter({ has: page.getByRole('button', { name: 'نسخ كود النموذج المفاهيمي', exact: true }) });
    await expect(domainCodeContainer).toBeVisible();
    const domainText = await domainCodeContainer.innerText();

    // Must use flowchart LR
    expect(domainText).toContain('flowchart LR');

    // Must NOT contain DB keys, SQL data types, or functions
    expect(domainText).not.toMatch(/\b(PK|FK|Primary Key|Foreign Key)\b/i);
    expect(domainText).not.toMatch(/\b(VARCHAR|INTEGER|BOOLEAN|TIMESTAMP|BIGINT)\b/i);
    // Business labels such as "Inspection & Return" are concepts, not code.
    expect(domainText).not.toMatch(/^\s*(?:(?:function|def|void)\s+\w+\s*\(|return\s+\w+)/im);
    expect(domainText).not.toMatch(/\w+\s*\([^)]*\)\s*;/); // method calls / function signatures

    // Must contain business concepts and labeled relationships
    expect(domainText).toContain('Student');
    expect(domainText).toContain('Equipment');
    expect(domainText).toContain('LoanRequest');
    expect(domainText).toContain('يطلب استعارة');
    expect(domainText).toContain('يعتمد أو يرفض');

    // Deliverables
    await expect(page.locator('article').first()).toContainText('docs/diagrams/domain-model.md');
  });

  test('Modal Reader and MermaidViewer: Renders diagrams smoothly and switches perspectives', async ({ page }) => {
    await page.goto('/');

    // Locate Topic 07 card and open modal
    const topic7Card = page.locator('article.topic-card').filter({ has: page.getByRole('heading', { name: 'صيغة Mermaid ومحرك التصيير في المتصفح', exact: true }) });
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
    await flowPerspectiveBtn.click();
    await expect(flowPerspectiveBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(viewer.locator('svg')).toBeVisible({ timeout: 10000 });

    // Toggle Raw Syntax Code
    const codeToggleBtn = modal.getByTitle('عرض / إخفاء كود Mermaid');
    await codeToggleBtn.click();
    await expect(codeToggleBtn).toHaveAttribute('aria-pressed', 'true');
    const rawSyntax = modal.locator('pre.text-emerald-400');
    await expect(rawSyntax).toBeVisible();
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

  test('All Group 04 Topics render learning objectives, core sections, practical steps with expected outputs, and candidate videos', async ({ page }) => {
    // 1. Topic 07: mermaid-syntax
    await page.goto('/learn/mermaid-syntax');
    const activities07 = page.locator('section.learning-activities');
    await expect(activities07).toBeVisible();
    await expect(activities07.getByRole('heading', { name: 'أهداف التعلّم' })).toBeVisible();
    await expect(activities07).toContainText('كتابة Mermaid صحيحة واختيار نوع الرسم واتجاهه بحسب السؤال.');
    await expect(activities07).toContainText('عرض الرسم مع عنوان وشرح واتجاه نص مناسبين في ملفات المشروع.');

    // Sections
    await expect(activities07.getByRole('heading', { name: 'المدخل: سؤال الرسم' })).toBeVisible();
    await expect(activities07.getByRole('heading', { name: 'صيغة قابلة للتصيير' })).toBeVisible();
    await expect(activities07.getByRole('heading', { name: 'عرض عربي وتقني' })).toBeVisible();

    // Practical Steps and Expected Outputs
    await expect(activities07.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(activities07).toContainText('المخرج المتوقع: كتلة Mermaid صالحة للتصيير ومذكور نوع المخطط والهدف منها.');
    await expect(activities07).toContainText('المخرج المتوقع: `docs/diagrams/README.md` يشرح أكواد Mermaid التي ستستخدمها Topics اللاحقة.');

    // Worked Example
    await expect(activities07.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(activities07).toContainText('تمثيل قرار توفر موعد');

    // Candidate Video
    await expect(activities07.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
    await expect(activities07).toContainText('How to Create Mermaid Diagrams');
    await expect(activities07).toContainText('GitLab Unfiltered');
    await expect(activities07).toContainText('مرشح — بانتظار المراجعة');

    // 2. Topic 08: user-flow-modeling
    await page.goto('/learn/user-flow-modeling');
    const activities08 = page.locator('section.learning-activities');
    await expect(activities08).toBeVisible();
    await expect(activities08).toContainText('نمذجة رحلة مستخدم من بدايتها إلى نتيجتها مع نقاط قرار ومساري النجاح والرفض.');
    await expect(activities08).toContainText('ربط كل خطوة وسلوك بدور ومصدر PRD دون توسيع النطاق.');

    // Sections
    await expect(activities08.getByRole('heading', { name: 'المدخل: هدف ودور من PRD' })).toBeVisible();
    await expect(activities08.getByRole('heading', { name: 'الخطوات والتفرعات' })).toBeVisible();
    await expect(activities08.getByRole('heading', { name: 'مراجعة التغطية' })).toBeVisible();

    // Practical Steps and Outputs
    await expect(activities08).toContainText('المخرج المتوقع: `docs/user-flow.md` يحتوي flowchart يوضح الأدوار والقرارات والنتائج.');
    await expect(activities08).toContainText('المخرج المتوقع: مخطط Mermaid لمسارات MVP يمكن تتبعه إلى المتطلبات المعتمدة.');

    // Worked Example (BorrowHub optional)
    await expect(activities08).toContainText('BorrowHub اختياري: طلب يحتاج مراجعة');

    // Candidate Video
    await expect(activities08).toContainText('User Journeys vs. User Flows (And When to Use Each)');
    await expect(activities08).toContainText('Nielsen Norman Group');
    await expect(activities08).toContainText('مرشح — بانتظار المراجعة');

    // 3. Topic 09: conceptual-domain-model
    await page.goto('/learn/conceptual-domain-model');
    const activities09 = page.locator('section.learning-activities');
    await expect(activities09).toBeVisible();
    await expect(activities09).toContainText('استخراج مفاهيم العمل وحدودها وعلاقاتها من متطلبات المشروع.');
    await expect(activities09).toContainText('شرح النموذج بلغة المجال دون خلط المفهوم بجدول قاعدة بيانات أو كلاس.');

    // Sections
    await expect(activities09.getByRole('heading', { name: 'المدخل: أسماء ومعانٍ من مجال العمل' })).toBeVisible();
    await expect(activities09.getByRole('heading', { name: 'العلاقة وحدود المعنى' })).toBeVisible();
    await expect(activities09.getByRole('heading', { name: 'ابق في المستوى المفاهيمي' })).toBeVisible();

    // Practical Steps and Outputs
    await expect(activities09).toContainText('المخرج المتوقع: `docs/diagrams/domain-model.md` يشرح كل مفهوم وعلاقته ومصدره.');
    await expect(activities09).toContainText('المخرج المتوقع: `docs/diagrams/domain-model.mmd` نموذج مفاهيمي لا يحتوي تفاصيل تنفيذ قاعدة البيانات.');

    // Worked Example (BorrowHub optional)
    await expect(activities09).toContainText('BorrowHub اختياري: مفاهيم العمل');

    // Candidate Video
    await expect(activities09).toContainText('Week 2: Lecture 10 — How to start creating a software conceptual design');
    await expect(activities09).toContainText('NPTEL / IIT Bombay');
    await expect(activities09).toContainText('مرشح — بانتظار المراجعة');
  });

  test('Practical steps and code snippets are copyable with visual confirmation across all Group 04 topics', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // 1. Topic 07: Copy Mermaid code snippet
    await page.goto('/learn/mermaid-syntax');
    const codeContainer07 = page.locator('.code-container[dir="ltr"]').first();
    const copyBtn07 = codeContainer07.locator('button.copy-btn');
    await expect(copyBtn07).toBeVisible();
    await copyBtn07.click();
    await expect(copyBtn07).toContainText('✓ تم النسخ!');
    const clip07 = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip07).toContain('flowchart TD');

    // 2. Topic 08: Copy PROMPT 05
    await page.goto('/learn/user-flow-modeling');
    const promptContainer08 = page.locator('.code-container').filter({ has: page.getByRole('button', { name: 'نسخ PROMPT 05', exact: true }) });
    const copyBtn08 = promptContainer08.locator('button.copy-btn');
    await expect(copyBtn08).toBeVisible();
    await copyBtn08.click();
    await expect(copyBtn08).toContainText('✓ تم النسخ!');
    const clip08 = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip08).toContain('Act as a Senior UX Designer');
    expect(clip08).toContain('docs/user-flow.md');

    // 3. Topic 09: Copy PROMPT 06
    await page.goto('/learn/conceptual-domain-model');
    const promptContainer09 = page.locator('.code-container').filter({ has: page.getByRole('button', { name: 'نسخ PROMPT 06', exact: true }) });
    const copyBtn09 = promptContainer09.locator('button.copy-btn');
    await expect(copyBtn09).toBeVisible();
    await copyBtn09.click();
    await expect(copyBtn09).toContainText('✓ تم النسخ!');
    const clip09 = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip09).toContain('Act as a Senior Domain Analyst');
    expect(clip09).toContain('docs/diagrams/domain-model.md');
  });

  test('Objective quiz grades answers, provides explanations, supports retries, and persists score across reload', async ({ page }) => {
    await page.goto('/learn/mermaid-syntax');
    const activities = page.locator('section.learning-activities');

    // Locate Quiz Section
    const q1Group = activities.getByRole('group', { name: /تريد إظهار خطوات وقرار/ });
    const q2Group = activities.getByRole('group', { name: /بعد أن نجح تصيير/ });
    await expect(q1Group).toBeVisible();
    await expect(q2Group).toBeVisible();

    // 1. Submit partial/mixed attempt (Q1 correct, Q2 incorrect)
    await q1Group.getByRole('radio', { name: /مع عقدة قرار ومسارين/ }).check();
    await q2Group.getByRole('radio', { name: /أن المصيّر عرض العقد والأسهم/ }).check();

    const submitBtn = activities.getByRole('button', { name: 'إرسال الإجابات', exact: true });
    await submitBtn.click();

    // Verify Score Banner: 1 / 2
    await expect(activities.getByText(/نتيجة معاينة فحص ذاتي: 1 \/ 2/)).toBeVisible();
    await expect(activities.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Verify Q1 Feedback and Explanation
    await expect(q1Group.getByText('إجابة صحيحة في هذا الفحص الذاتي')).toBeVisible();
    await expect(q1Group.getByText(/Flowchart مناسب لتمثيل الترتيب والتفرع/)).toBeVisible();

    // Verify Q2 Feedback and Explanation
    await expect(q2Group.getByText('الإجابة تحتاج إلى مراجعة')).toBeVisible();
    await expect(q2Group.getByText(/نجاح المعاينة يؤكد إمكان التصيير فقط/)).toBeVisible();

    // 2. Retry quiz to improve score
    const retryBtn = activities.getByRole('button', { name: 'إعادة المحاولة', exact: true });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();

    // Answer Q2 correctly this time
    await q1Group.getByRole('radio', { name: /مع عقدة قرار ومسارين/ }).check();
    await q2Group.getByRole('radio', { name: /أن كل قرار ومسار يطابق متطلباً أو يبقى سؤالاً مفتوحاً/ }).check();
    await submitBtn.click();

    // Verify Perfect Score: 2 / 2
    await expect(activities.getByText(/نتيجة معاينة فحص ذاتي: 2 \/ 2/)).toBeVisible();
    await expect(activities.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
    await expect(q1Group.getByText('إجابة صحيحة في هذا الفحص الذاتي')).toBeVisible();
    await expect(q2Group.getByText('إجابة صحيحة في هذا الفحص الذاتي')).toBeVisible();

    // Attempt history reflects retries
    await expect(activities.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();

    // 3. Verify Persistence Across Reload
    await page.reload();
    const reloadedActivities = page.locator('section.learning-activities');
    await expect(reloadedActivities.getByText(/آخر نتيجة محفوظة في هذا المتصفح: 2 \/ 2/)).toBeVisible();
    await expect(reloadedActivities.getByText(/نسخة الاختبار 1/).first()).toBeVisible();
  });

  test('Application checklist and practical rubric criteria support editing, reversal, and survive page reload', async ({ page }) => {
    await page.goto('/learn/mermaid-syntax');

    // 1. Application Checklist interaction & persistence
    const checklist = page.locator('div[role="group"][aria-label="قائمة تحقق التطبيق"]');
    await expect(checklist).toBeVisible();
    const firstCheckbox = checklist.locator('input[type="checkbox"]').first();
    await expect(firstCheckbox).not.toBeChecked();

    // Check item
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Reload and verify persistence
    await page.reload();
    const reloadedFirstCheckbox = page.locator('div[role="group"][aria-label="قائمة تحقق التطبيق"] input[type="checkbox"]').first();
    await expect(reloadedFirstCheckbox).toBeChecked();

    // Reverse (uncheck)
    await reloadedFirstCheckbox.uncheck();
    await expect(reloadedFirstCheckbox).not.toBeChecked();

    // Reload and verify reversal persisted
    await page.reload();
    const reversedCheckbox = page.locator('div[role="group"][aria-label="قائمة تحقق التطبيق"] input[type="checkbox"]').first();
    await expect(reversedCheckbox).not.toBeChecked();

    // 2. Practical Assessment Rubric interaction & persistence
    const activities = page.locator('section.learning-activities');
    const rubricSection = activities.locator('section').filter({ has: page.getByRole('heading', { name: /مراجعة ذاتية لمخرجات التمرين/ }) });
    await expect(rubricSection).toBeVisible();

    // Verify declared outputs are displayed
    await expect(rubricSection).toContainText('`docs/diagrams/README.md` مع أمثلة وتعليمات التصيير.');
    await expect(rubricSection).toContainText('أكواد Mermaid صالحة للتصيير ومعها شرح نصي.');

    // Find the criteria groups
    const criterionValid = activities.getByRole('group', { name: 'صياغة ومعنى الرسم' });
    const criterionDoc = activities.getByRole('group', { name: 'شرح واتجاه واضحان' });
    await expect(criterionValid).toBeVisible();
    await expect(criterionDoc).toBeVisible();

    // Select ratings
    await criterionValid.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await criterionDoc.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    // Verify selection before reload
    await expect(criterionValid.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(criterionDoc.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    // Reload page and verify persistence
    await page.reload();
    const reloadedValid = page.locator('section.learning-activities').getByRole('group', { name: 'صياغة ومعنى الرسم' });
    const reloadedDoc = page.locator('section.learning-activities').getByRole('group', { name: 'شرح واتجاه واضحان' });
    await expect(reloadedValid.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(reloadedDoc.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    // Reverse selections
    await reloadedValid.getByLabel('اختيارك للتقييم الذاتي').selectOption('not-yet');
    await reloadedDoc.getByLabel('اختيارك للتقييم الذاتي').selectOption('');

    // Reload and verify reversed values
    await page.reload();
    const reversedValid = page.locator('section.learning-activities').getByRole('group', { name: 'صياغة ومعنى الرسم' });
    const reversedDoc = page.locator('section.learning-activities').getByRole('group', { name: 'شرح واتجاه واضحان' });
    await expect(reversedValid.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('not-yet');
    await expect(reversedDoc.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
  });

  test('Bidirectional layout integrity: RTL prose with LTR code containers across the group', async ({ page }) => {
    const slugs = ['mermaid-syntax', 'user-flow-modeling', 'conceptual-domain-model'];

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);

      // Root HTML is RTL
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

      // Main article has RTL text direction
      const article = page.locator('article').first();
      await expect(article).toBeVisible();

      // All code containers are explicitly LTR
      const codeContainers = page.locator('.code-container');
      const count = await codeContainers.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const container = codeContainers.nth(i);
        await expect(container).toHaveAttribute('dir', 'ltr');
      }
    }
  });

  test('Mobile viewport (390px) responsiveness without horizontal overflow across all Group 04 topics', async ({ page }) => {
    const slugs = ['mermaid-syntax', 'user-flow-modeling', 'conceptual-domain-model'];
    await page.setViewportSize({ width: 390, height: 844 });

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);

      // Wait for network and activities to render
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('section.learning-activities')).toBeVisible();

      // Check no horizontal overflow on mobile 390px width
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, `Page ${slug} has horizontal overflow at 390px width`).toBeLessThanOrEqual(clientWidth + 2);
    }
  });
});
