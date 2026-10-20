import { test, expect } from '@playwright/test';

test.describe('Ticket 05: PlantUML, Use Case, Activity & State Diagrams E2E', () => {
  test('Home page displays topics 10, 11, 12, 13 with correct numbers, titles, and stage tags', async ({ page }) => {
    await page.goto('/');

    const t10Card = page.locator('article.topic-card').filter({ hasText: 'أداة ومحرر PlantUML' }).first();
    const t11Card = page.locator('article.topic-card').filter({ hasText: 'مخطط حالات الاستخدام' }).first();
    const t12Card = page.locator('article.topic-card').filter({ hasText: 'مخطط النشاط وسير العمليات' }).first();
    const t13Card = page.locator('article.topic-card').filter({ hasText: 'مخطط الحالات ودورة حياة الكيانات' }).first();

    await expect(t10Card).toBeVisible();
    await expect(t11Card).toBeVisible();
    await expect(t12Card).toBeVisible();
    await expect(t13Card).toBeVisible();

    // Verify topic numbers
    await expect(t10Card).toContainText('10');
    await expect(t10Card).toContainText('أدوات النمذجة السلوكية');

    await expect(t11Card).toContainText('11');
    await expect(t11Card).toContainText('صلاحيات الأدوار والحدود');

    await expect(t12Card).toContainText('12');
    await expect(t12Card).toContainText('مسارات وقرارات العمليات');

    await expect(t13Card).toContainText('13');
    await expect(t13Card).toContainText('حالات الكائنات والانتقالات');
  });

  test('Topic 10 (PlantUML) explains tool before use, distinguishes from Mermaid, links editors, and has copyable source', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/plantuml');

    // Header & metadata
    await expect(page.locator('h1')).toContainText('أداة ومحرر PlantUML للنمذجة الهندسية ككود');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 10');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract fields
    await expect(page.locator('text=الهدف من الموضوع:')).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/README-plantuml.md' }).first()).toBeVisible();
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Distinction from Mermaid
    await expect(page.locator('text=لا يعمل إطلاقاً داخل Mermaid Live')).toBeVisible();
    await expect(page.locator('text=فلسفة أداة PlantUML')).toBeVisible();

    // Editor links
    const plantTextLink = page.locator('a[href="https://www.planttext.com/"]').first();
    const plantUmlServerLink = page.locator('a[href="https://www.plantuml.com/plantuml/uml/"]').first();
    await expect(plantTextLink).toBeVisible();
    await expect(plantUmlServerLink).toBeVisible();

    // Copyable code block
    const codeContainer = page.locator('.code-container').filter({ hasText: '@startuml' }).first();
    await expect(codeContainer).toBeVisible();
    await expect(codeContainer).toContainText('@enduml');
    await expect(codeContainer).toContainText('left to right direction');

    // Test copy button
    const copyBtn = codeContainer.locator('button.copy-btn').first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('تم النسخ');

    // Navigation links
    const prevLink = page.locator('a[href="/learn/conceptual-domain-model"]').first();
    const nextLink = page.locator('a[href="/learn/use-case-diagram"]').first();
    await expect(prevLink).toBeVisible();
    await expect(nextLink).toBeVisible();
  });

  test('Topic 11 (Use Case Diagram) details role permissions, include/extend rules, and BorrowHub code', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/use-case-diagram');

    // Header
    await expect(page.locator('h1')).toContainText('مخطط حالات الاستخدام (Use Case Diagram)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 11');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract outputs
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/use-case.puml' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/use-case.md' }).first()).toBeVisible();

    // Role permissions table
    await expect(page.locator('text=الطالب الجامعي (Student)')).toBeVisible();
    await expect(page.locator('text=مسؤول المعمل (Staff / Lab Supervisor)')).toBeVisible();
    await expect(page.locator('text=مجدول النظام الآلي (System Scheduler)')).toBeVisible();

    // include vs extend rules
    await expect(page.getByText(/علاقة التضمين الإلزامي/)).toBeVisible();
    await expect(page.getByText(/علاقة التمديد الشرطي/)).toBeVisible();

    // Code block with BorrowHub PlantUML
    const codeBlock = page.locator('pre.code-content').filter({ hasText: 'حدود نظام BorrowHub' }).first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('UC_Apply ..> UC_Eligibility : <<include>>');
    await expect(codeBlock).toContainText('UC_DamageReport ..> UC_Return : <<extend>>');

    // PROMPT 07 section
    const promptContainer = page.locator('.code-container').filter({ hasText: 'PROMPT 07' }).first();
    await expect(promptContainer).toBeVisible();
    await expect(promptContainer).toContainText('Act as a Senior UML Use Case Analyst.');

    const promptCopyBtn = promptContainer.locator('button.copy-btn').first();
    await promptCopyBtn.click();
    await expect(promptCopyBtn).toContainText('تم النسخ');

    // Navigation links
    const prevLink = page.locator('a[href="/learn/plantuml"]').first();
    const nextLink = page.locator('a[href="/learn/activity-diagram"]').first();
    await expect(prevLink).toBeVisible();
    await expect(nextLink).toBeVisible();
  });

  test('Topic 12 (Activity Diagram) reflects operational decisions, Mermaid flowchart TD, and PROMPT 08', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/activity-diagram');

    // Header
    await expect(page.locator('h1')).toContainText('مخطط النشاط وسير العمليات (Activity Diagram)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 12');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract outputs
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/activity-diagram.md' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/activity-diagram.mmd' }).first()).toBeVisible();

    // Decision gates explanation
    await expect(page.locator('text=بوابات اتخاذ القرار المنطقية')).toBeVisible();
    await expect(page.locator('text=بوابة سقف الإعارة النشطة (Active Loans Limit - Rule 3)')).toBeVisible();
    await expect(page.locator('text=بوابة مهلة الاستلام (48-Hour Deadline - Rule 6)')).toBeVisible();
    await expect(page.locator('text=بوابة فحص السلامة عند الإرجاع (Return Inspection - Rule 8)')).toBeVisible();

    // Code block with Mermaid flowchart TD
    const codeBlock = page.locator('pre.code-content').filter({ hasText: 'flowchart TD' }).first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('CheckAuth{"هل حساب الطالب معتمد؟"}');
    await expect(codeBlock).toContainText('CheckLimit{"هل الإعارات النشطة < 2؟ (Rule 3)"}');
    await expect(codeBlock).toContainText('StaffReview{"قرار مسؤول المعمل"}');
    await expect(codeBlock).toContainText('InspectItem{"فحص المعدة: هل بها تلف أو كسر؟ (Rule 8)"}');

    // PROMPT 08
    const promptContainer = page.locator('.code-container').filter({ hasText: 'PROMPT 08' }).first();
    await expect(promptContainer).toBeVisible();
    await expect(promptContainer).toContainText('Act as a Senior Business Process Analyst.');

    // Navigation links
    const prevLink = page.locator('a[href="/learn/use-case-diagram"]').first();
    const nextLink = page.locator('a[href="/learn/state-diagram"]').first();
    await expect(prevLink).toBeVisible();
    await expect(nextLink).toBeVisible();
  });

  test('Topic 12 Activity diagram damage branch adheres to Rule 8 (no restock on damage, explicit staff confirmation and finish)', async ({ page }) => {
    await page.goto('/learn/activity-diagram');
    const codeBlock = page.locator('pre.code-content').filter({ hasText: 'flowchart TD' }).first();
    await expect(codeBlock).toBeVisible();
    const diagram = await codeBlock.innerText();

    // Pickup deadline must cite Rule 6, not Rule 7
    await expect(page.locator('text=بوابة مهلة الاستلام (48-Hour Deadline - Rule 6)')).toBeVisible();
    // Invented notify-when-available suggestion removed
    await expect(page.locator('text=ويُقترح إشعاره عند التوفر')).toHaveCount(0);

    // Rule 8: Damaged branch must NOT flow into Restock or unconditional CloseReturn that restocks
    expect(diagram).not.toMatch(/RecordDamage[^\n]*-->\s*CloseReturn\b/);
    expect(diagram).not.toMatch(/RecordDamage[^\n]*-->\s*Restock\b/);

    // Damaged branch must have explicit staff confirmation and explicit finish without restock
    expect(diagram).toMatch(/RecordDamage.*-->.*CloseDamaged.*-->.*EndDamaged|RecordDamage.*-->.*EndDamaged/);
    expect(diagram).toContain('تأكيد المسؤول');

    // Only undamaged path restores available stock
    expect(diagram).toMatch(/InspectItem -- لا -->.*Restock/);
  });

  test('Topic 13 (State Diagram) reflects documented lifecycle states without invented states, transition table, and PROMPT 10', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/state-diagram');

    // Header
    await expect(page.locator('h1')).toContainText('مخطط الحالات ودورة حياة الكيانات (State Diagram)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 13');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract outputs
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/state-diagrams.md' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/state-diagrams.mmd' }).first()).toBeVisible();

    // No invented states rule
    await expect(page.locator('text=القاعدة المعمارية الصارمة: عدم اختراع حالات وهمية')).toBeVisible();

    // Documented states in table
    await expect(page.locator('td > code').filter({ hasText: 'Draft' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Submitted' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Approved' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Rejected' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Cancelled' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Active' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Overdue' }).first()).toBeVisible();
    await expect(page.locator('td > code').filter({ hasText: 'Returned' }).first()).toBeVisible();

    // Transition table exists
    await expect(page.locator('text=جدول الانتقالات وشروط الحراسة')).toBeVisible();

    // Mermaid stateDiagram-v2 code block
    const codeBlock = page.locator('pre.code-content').filter({ hasText: 'stateDiagram-v2' }).first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('Draft --> Submitted : إرسال الطلب');
    await expect(codeBlock).toContainText('Submitted --> Approved : موافقة مسؤول المعمل');
    await expect(codeBlock).toContainText('Approved --> Active : تأكيد المسؤول التسليم المادي');
    await expect(codeBlock).toContainText('Active --> Overdue : تجاوز تاريخ الاستحقاق دون إرجاع');

    // PROMPT 10
    const promptContainer = page.locator('.code-container').filter({ hasText: 'PROMPT 10' }).first();
    await expect(promptContainer).toBeVisible();
    await expect(promptContainer).toContainText('Act as a Senior State Machine Analyst.');

    // Navigation links
    const prevLink = page.locator('a[href="/learn/activity-diagram"]').first();
    await expect(prevLink).toBeVisible();
  });

  test('TopicDetailModal opens for topics 10 to 13 and navigates sequentially with contract agreement', async ({ page }) => {
    await page.goto('/');

    // Open Topic 10 in modal
    const t10Card = page.locator('article.topic-card').filter({ hasText: 'أداة ومحرر PlantUML' }).first();
    await t10Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('أداة ومحرر PlantUML للنمذجة الهندسية ككود');
    await expect(modal).toContainText('docs/diagrams/README-plantuml.md');

    // Navigate to next topic (11) via modal next button
    const nextBtn = modal.locator('footer button').filter({ hasText: 'التالي' }).first();
    await nextBtn.click();
    await expect(modal).toContainText('مخطط حالات الاستخدام (Use Case Diagram)');
    await expect(modal).toContainText('docs/diagrams/use-case.puml');

    // Navigate to next topic (12)
    await nextBtn.click();
    await expect(modal).toContainText('مخطط النشاط وسير العمليات (Activity Diagram)');
    await expect(modal).toContainText('docs/diagrams/activity-diagram.md');

    // Navigate to next topic (13)
    await nextBtn.click();
    await expect(modal).toContainText('مخطط الحالات ودورة حياة الكيانات (State Diagram)');
    await expect(modal).toContainText('docs/diagrams/state-diagrams.md');

    // Close modal via Escape
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Group 05 topics render learning activities: objectives, sections, worked examples, and video candidates', async ({ page }) => {
    const topics = [
      { slug: 'plantuml', title: 'أداة ومحرر PlantUML', firstSection: 'المدخل: رسم هندسي يحتاج إلى ترميز' },
      { slug: 'use-case-diagram', title: 'مخطط حالات الاستخدام', firstSection: 'المدخل: أدوار وأهداف من PRD' },
      { slug: 'activity-diagram', title: 'مخطط النشاط وسير العمليات', firstSection: 'المدخل: عملية لها قرار' },
      { slug: 'state-diagram', title: 'مخطط الحالات ودورة حياة الكيانات', firstSection: 'المدخل: كيان تتغير حالته' },
    ];

    for (const t of topics) {
      await page.goto(`/learn/${t.slug}`);
      const activity = page.locator('.learning-activities');
      await expect(activity).toBeVisible();

      // Objectives section
      await expect(activity.getByRole('heading', { name: 'أهداف التعلّم' })).toBeVisible();

      // Authored sections
      await expect(activity.getByRole('heading', { name: t.firstSection })).toBeVisible();

      // Practical steps and expected outputs
      await expect(activity.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
      await expect(activity.getByText('المخرج المتوقع:').first()).toBeVisible();

      // Worked examples
      await expect(activity.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();

      // External video candidate section
      await expect(activity.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
    }
  });

  test('Practical steps and expected outputs are present and copyable across Group 05', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Topic 10: PlantUML
    await page.goto('/learn/plantuml');
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/README-plantuml.md' }).first()).toBeVisible();
    const t10CodeContainer = page.locator('.code-container').first();
    const t10ExpectedCode = await t10CodeContainer.locator('code').textContent();
    const t10CopyBtn = t10CodeContainer.locator('button.copy-btn');
    await t10CopyBtn.click();
    await expect(t10CopyBtn).toContainText('تم النسخ');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(t10ExpectedCode);

    // Topic 11: Use Case
    await page.goto('/learn/use-case-diagram');
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/use-case.puml' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/use-case.md' }).first()).toBeVisible();
    const t11CodeContainer = page.locator('.code-container').first();
    const t11ExpectedCode = await t11CodeContainer.locator('code').textContent();
    const t11CopyBtn = t11CodeContainer.locator('button.copy-btn');
    await t11CopyBtn.click();
    await expect(t11CopyBtn).toContainText('تم النسخ');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(t11ExpectedCode);

    // Topic 12: Activity
    await page.goto('/learn/activity-diagram');
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/activity-diagram.md' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/activity-diagram.mmd' }).first()).toBeVisible();

    // Topic 13: State
    await page.goto('/learn/state-diagram');
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/state-diagrams.md' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/state-diagrams.mmd' }).first()).toBeVisible();
  });

  test('Interactive quiz grades answers, provides explanations, and supports retries', async ({ page }) => {
    await page.goto('/learn/plantuml');
    const activity = page.locator('.learning-activities');
    const quiz = activity.locator('section').filter({ hasText: 'فحص ذاتي للمفاهيم' }).first();
    await expect(quiz).toBeVisible();

    // Answer Q1 correctly: option 2 (@startuml و@enduml)
    const q1Group = quiz.locator('fieldset').filter({ hasText: 'ما الغلاف الأساسي لعينة PlantUML؟' });
    await q1Group.getByRole('radio', { name: /@startuml.*@enduml/ }).check();

    // Answer Q2 incorrectly: option 3 (أن كل العلاقات صحيحة تلقائياً)
    const q2Group = quiz.locator('fieldset').filter({ hasText: 'المحرر يعرض الرسم بلا خطأ. ماذا تفحص بعد ذلك؟' });
    await q2Group.getByRole('radio', { name: 'أن كل العلاقات صحيحة تلقائياً' }).check();

    // Submit
    await quiz.getByRole('button', { name: 'إرسال الإجابات' }).click();

    // Verification of scoring: 1 correct, 1 incorrect
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();
    await expect(q1Group.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1Group.getByRole('status')).toContainText('هاتان علامتا بداية ونهاية مخطط PlantUML');
    await expect(q2Group.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2Group.getByRole('status')).toContainText('المصيّر يتحقق من الصياغة');

    // Retry
    const retryBtn = quiz.getByRole('button', { name: 'إعادة المحاولة' });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();

    // Fix Q2: answer correctly (أن المعنى والأدوار يستندان إلى المتطلبات)
    await q1Group.getByRole('radio', { name: /@startuml.*@enduml/ }).check();
    await q2Group.getByRole('radio', { name: 'أن المعنى والأدوار يستندان إلى المتطلبات' }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات' }).click();

    // Verification: 2 correct
    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
    await expect(q2Group.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
  });

  test('Practical rubric and checklist can be edited, reversed, and survive reload', async ({ page }) => {
    await page.goto('/learn/plantuml');
    const activity = page.locator('.learning-activities');
    const rubric = activity.locator('section').filter({ hasText: 'مراجعة ذاتية لمخرجات التمرين' }).first();
    await expect(rubric).toBeVisible();

    // Edit rubric ratings
    const criterion1 = rubric.locator('fieldset').filter({ hasText: 'العينة قابلة للمعاينة' });
    const criterion2 = rubric.locator('fieldset').filter({ hasText: 'توثيق الاستخدام' });

    await criterion1.locator('select').selectOption('ready-for-review');
    await criterion2.locator('select').selectOption('in-progress');

    // Edit application checklist
    const checklistSection = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' }).first();
    const firstCheckItem = checklistSection.locator('input[type="checkbox"]').first();
    await firstCheckItem.check();
    await expect(firstCheckItem).toBeChecked();

    // Reload page
    await page.reload();

    // Verify persistence after reload
    const reloadedRubric = page.locator('.learning-activities').locator('section').filter({ hasText: 'مراجعة ذاتية لمخرجات التمرين' }).first();
    const reloadedCrit1 = reloadedRubric.locator('fieldset').filter({ hasText: 'العينة قابلة للمعاينة' });
    const reloadedCrit2 = reloadedRubric.locator('fieldset').filter({ hasText: 'توثيق الاستخدام' });
    await expect(reloadedCrit1.locator('select')).toHaveValue('ready-for-review');
    await expect(reloadedCrit2.locator('select')).toHaveValue('in-progress');

    const reloadedChecklist = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' }).first();
    const reloadedFirstItem = reloadedChecklist.locator('input[type="checkbox"]').first();
    await expect(reloadedFirstItem).toBeChecked();

    // Reverse changes
    await reloadedCrit1.locator('select').selectOption('');
    await reloadedCrit2.locator('select').selectOption('');
    await reloadedFirstItem.uncheck();
    await expect(reloadedFirstItem).not.toBeChecked();

    // Reload again to verify reversal survived
    await page.reload();
    const finalRubric = page.locator('.learning-activities').locator('section').filter({ hasText: 'مراجعة ذاتية لمخرجات التمرين' }).first();
    await expect(finalRubric.locator('fieldset').filter({ hasText: 'العينة قابلة للمعاينة' }).locator('select')).toHaveValue('');
    await expect(finalRubric.locator('fieldset').filter({ hasText: 'توثيق الاستخدام' }).locator('select')).toHaveValue('');
    const finalChecklist = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' }).first();
    await expect(finalChecklist.locator('input[type="checkbox"]').first()).not.toBeChecked();
  });

  test('RTL prose and LTR code blocks render with correct directions across Group 05', async ({ page }) => {
    const slugs = ['plantuml', 'use-case-diagram', 'activity-diagram', 'state-diagram'];

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);

      // Check root direction is RTL
      const pageDir = await page.locator('div[dir="rtl"]').first().getAttribute('dir');
      expect(pageDir).toBe('rtl');

      // Check main heading direction is RTL
      const h1 = page.locator('h1').first();
      const h1Dir = await h1.evaluate((el) => window.getComputedStyle(el).direction);
      expect(h1Dir).toBe('rtl');

      // Check code containers have dir="ltr"
      const codeContainers = page.locator('.code-container');
      const count = await codeContainers.count();
      for (let i = 0; i < count; i++) {
        const dir = await codeContainers.nth(i).getAttribute('dir');
        expect(dir).toBe('ltr');
        const computedDir = await codeContainers.nth(i).evaluate((el) => window.getComputedStyle(el).direction);
        expect(computedDir).toBe('ltr');
      }
    }
  });

  test('Mobile viewport (390px) renders without horizontal scroll overflow across all Group 05 topics', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const slugs = ['plantuml', 'use-case-diagram', 'activity-diagram', 'state-diagram'];

    for (const slug of slugs) {
      await page.goto(`/learn/${slug}`);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });
});
