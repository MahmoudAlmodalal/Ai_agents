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
    await expect(header).toContainText('مسار موحد مكتمل ✓');

    // Contract fields
    await expect(page.locator('text=الهدف من الموضوع:')).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/README-plantuml.md' }).first()).toBeVisible();
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة الإنجاز والتحقق')).toBeVisible();

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
    await expect(header).toContainText('مسار موحد مكتمل ✓');

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
    await expect(header).toContainText('مسار موحد مكتمل ✓');

    // Contract outputs
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/activity-diagram.md' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/activity-diagram.mmd' }).first()).toBeVisible();

    // Decision gates explanation
    await expect(page.locator('text=بوابات اتخاذ القرار المنطقية')).toBeVisible();
    await expect(page.locator('text=بوابة سقف الإعارة النشطة (Active Loans Limit - Rule 3)')).toBeVisible();
    await expect(page.locator('text=بوابة مهلة الاستلام (48-Hour Deadline - Rule 7)')).toBeVisible();
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

  test('Topic 13 (State Diagram) reflects documented lifecycle states without invented states, transition table, and PROMPT 10', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/state-diagram');

    // Header
    await expect(page.locator('h1')).toContainText('مخطط الحالات ودورة حياة الكيانات (State Diagram)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 13');
    await expect(header).toContainText('مسار موحد مكتمل ✓');

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
    await expect(codeBlock).toContainText('Approved --> Active : حضور الطالب وتسليم المعدة');
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
    await t10Card.getByRole('button', { name: 'تصفح الموضوع بالتفصيل' }).click();

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
});
