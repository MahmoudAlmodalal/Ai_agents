import { test, expect } from '@playwright/test';

test.describe('Ticket 06: ERD, DBML, Sequence & Class Diagrams E2E Journey', () => {
  test('Home page displays topics 14, 15, 16, 17 in strict sequence order with metadata', async ({ page }) => {
    await page.goto('/');

    const t14Card = page.locator('article.topic-card').filter({ hasText: 'مخطط العلاقات بين الكيانات (ERD)' }).first();
    const t15Card = page.locator('article.topic-card').filter({ hasText: 'لغة DBML ومحرر dbdiagram.io' }).first();
    const t16Card = page.locator('article.topic-card').filter({ hasText: 'مخطط تسلسل التفاعلات (Sequence Diagram)' }).first();
    const t17Card = page.locator('article.topic-card').filter({ hasText: 'مخطط الكلاسات البرمجية (Class Diagram)' }).first();

    await expect(t14Card).toBeVisible();
    await expect(t15Card).toBeVisible();
    await expect(t16Card).toBeVisible();
    await expect(t17Card).toBeVisible();

    // Verify topic sequence numbers and stage tags
    await expect(t14Card).toContainText('14');
    await expect(t14Card).toContainText('نمذجة قواعد البيانات');

    await expect(t15Card).toContainText('15');
    await expect(t15Card).toContainText('أدوات نمذجة البيانات');

    await expect(t16Card).toContainText('16');
    await expect(t16Card).toContainText('النمذجة السلوكية والديناميكية');

    await expect(t17Card).toContainText('17');
    await expect(t17Card).toContainText('التصميم الكائني والمعماري');
  });

  test('Topic 14 (ERD): Renders entities, keys, constraints, race conditions & prompts', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/relational-erd-design');

    // Header & Unified Contract Badges
    await expect(page.locator('h1')).toContainText('مخطط العلاقات بين الكيانات (ERD)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 14');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract fields: Goal, Outputs, Steps, Checklist
    await expect(page.locator('text=الهدف من الموضوع:')).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/ERD.md' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/database-review.md' }).first()).toBeVisible();
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Core content: Difference between Domain Model and ERD
    await expect(page.locator('table.data-table')).toBeVisible();
    await expect(page.locator('text=النموذج المفاهيمي (Domain Model)').first()).toBeVisible();
    await expect(page.locator('text=مخطط قاعدة البيانات (ERD)').first()).toBeVisible();

    // Concurrency & Stock atomic equation
    await expect(page.locator('text=معادلة المخزون الذرية')).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'total_count = available_count + reserved_count' })).toBeVisible();

    // Mermaid ERD code block
    const erdCode = page.locator('pre.code-content').filter({ hasText: 'erDiagram' }).first();
    await expect(erdCode).toBeVisible();
    await expect(erdCode).toContainText('users ||--o{ loan_requests');
    await expect(erdCode).toContainText('equipment_categories ||--o{ equipment');
    await expect(erdCode).toContainText('loan_action_logs');

    // Copy ERD code button
    const copyErdBtn = erdCode.locator('..').locator('button.copy-btn').first();
    await expect(copyErdBtn).toBeVisible();
    await copyErdBtn.click();
    await expect(copyErdBtn).toContainText('✓ تم النسخ!');

    // Prompts 12 and 13 presence
    await expect(page.locator('text=PROMPT 12').first()).toBeVisible();
    await expect(page.locator('text=PROMPT 13').first()).toBeVisible();
  });

  test('Topic 15 (DBML): Renders dbdiagram.io distinction, syntax, and DDL export guide', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/dbml-dbdiagram-io');

    // Header & Unified Contract Badges
    await expect(page.locator('h1')).toContainText('لغة DBML ومحرر dbdiagram.io');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 15');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract outputs
    await expect(page.locator('code').filter({ hasText: 'docs/database.dbml' }).first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: 'docs/database.sql' }).first()).toBeVisible();

    // Crucial distinction: DBML is NOT Mermaid
    const dangerCallout = page.locator('.callout.danger');
    await expect(dangerCallout).toBeVisible();
    await expect(dangerCallout).toContainText('DBML ليست صيغة رسم عامة ولا تتبع Mermaid.js');

    // Link to dbdiagram.io exists and has target="_blank"
    const dbdiagramLink = page.locator('a[href="https://dbdiagram.io"]').first();
    await expect(dbdiagramLink).toBeVisible();
    await expect(dbdiagramLink).toHaveAttribute('target', '_blank');

    // DBML code container and syntax
    const dbmlCode = page.locator('pre.code-content').filter({ hasText: 'Table users' }).first();
    await expect(dbmlCode).toBeVisible();
    await expect(dbmlCode).toContainText('Table equipment');
    await expect(dbmlCode).toContainText('Table loan_requests');
    await expect(dbmlCode).toContainText('Ref: loan_requests.user_id > users.id');

    // Copy DBML code button
    const copyDbmlBtn = dbmlCode.locator('..').locator('button.copy-btn').first();
    await copyDbmlBtn.click();
    await expect(copyDbmlBtn).toContainText('✓ تم النسخ!');
  });

  test('Topic 16 (Sequence): Renders dynamic interactions, participants, alt/else branches, and PROMPT 09', async ({ page }) => {
    await page.goto('/learn/sequence-diagram-modeling');

    // Header & Unified Contract Badges
    await expect(page.locator('h1')).toContainText('مخطط تسلسل التفاعلات (Sequence Diagram)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 16');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Contract outputs
    await expect(page.locator('code').filter({ hasText: 'docs/diagrams/sequence-diagrams.md' }).first()).toBeVisible();

    // Architectural Rule: Logical participants vs speculative backend
    await expect(page.locator('text=قاعدة ذهبية من البرومبت المعتمد PROMPT 09')).toBeVisible();
    await expect(page.locator('text=المشاركون المنطقيون وتجنب التخمين')).toBeVisible();

    // Sequence Diagram code block
    const seqCode = page.locator('pre.code-content').filter({ hasText: 'sequenceDiagram' }).first();
    await expect(seqCode).toBeVisible();
    await expect(seqCode).toContainText('actor Student as طالب');
    await expect(seqCode).toContainText('submitLoanRequest');
    await expect(seqCode).toContainText('alt activeCount >= 2');
    await expect(seqCode).toContainText('rowsUpdated == 0');
    await expect(seqCode).toContainText('rowsUpdated == 1');

    // PROMPT 09 section
    await expect(page.locator('text=PROMPT 09').first()).toBeVisible();
    await expect(page.locator('pre.code-content').filter({ hasText: 'Act as a Senior Software Architect and UML Expert.' })).toBeVisible();
  });

  test('Topic 17 (Class Diagram): Follows ERD & Sequence in order, models classes and cross-diagram consistency', async ({ page }) => {
    await page.goto('/learn/class-diagram-design');

    // Header & Unified Contract Badges
    await expect(page.locator('h1')).toContainText('مخطط الكلاسات البرمجية (Class Diagram)');
    const header = page.locator('header.rounded-3xl').first();
    await expect(header).toContainText('موضوع 17');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');

    // Prerequisite verification: ERD and Sequence come BEFORE Class Diagram
    const prereqSection = page.locator('section').filter({ hasText: 'المتطلبات السابقة' }).first();
    await expect(prereqSection).toContainText('مخطط ERD');
    await expect(prereqSection).toContainText('مخططات تسلسل التفاعلات');

    // Architectural order rationale callout
    await expect(page.locator('text=سر الترتيب الهندسي: لماذا يأتي Class Diagram بعد ERD وSequence؟')).toBeVisible();

    // Class Diagram code block
    const classCode = page.locator('pre.code-content').filter({ hasText: 'classDiagram' }).first();
    await expect(classCode).toBeVisible();
    await expect(classCode).toContainText('class User');
    await expect(classCode).toContainText('class Equipment');
    await expect(classCode).toContainText('class LoanRequest');
    await expect(classCode).toContainText('class LoanActionLog');
    await expect(classCode).toContainText('+canBorrow() bool');
    await expect(classCode).toContainText('+reserveStock() bool');

    // Cross-Diagram Naming Consistency Table
    const consistencyTable = page.locator('table.data-table').filter({ hasText: 'users (جدول)' }).first();
    await expect(consistencyTable).toBeVisible();
    await expect(consistencyTable).toContainText('Table users');
    await expect(consistencyTable).toContainText('actor Student');
    await expect(consistencyTable).toContainText('class User');
    await expect(consistencyTable).toContainText('class Equipment');
    await expect(consistencyTable).toContainText('class LoanRequest');

    // PROMPT 11 section
    await expect(page.locator('text=PROMPT 11').first()).toBeVisible();
    await expect(page.locator('pre.code-content').filter({ hasText: 'Act as a Senior Object-Oriented Design Expert.' })).toBeVisible();
  });

  test('Sequential navigation connects topics 14, 15, 16, and 17 in proper chain', async ({ page }) => {
    // Start at Topic 14
    await page.goto('/learn/relational-erd-design');
    const nextTo15 = page.locator('nav[aria-label="التنقل بين المواضيع"]').getByRole('link', { name: /التالي/ });
    await expect(nextTo15).toBeVisible();
    await expect(nextTo15).toHaveAttribute('href', '/learn/dbml-dbdiagram-io');

    // Navigate to Topic 15
    await nextTo15.click();
    await expect(page).toHaveURL(/.*\/learn\/dbml-dbdiagram-io/);

    // Topic 15: Check prev link points to Topic 14 and next to Topic 16
    const prevTo14 = page.locator('nav[aria-label="التنقل بين المواضيع"]').getByRole('link', { name: /السابق/ });
    const nextTo16 = page.locator('nav[aria-label="التنقل بين المواضيع"]').getByRole('link', { name: /التالي/ });
    await expect(prevTo14).toHaveAttribute('href', '/learn/relational-erd-design');
    await expect(nextTo16).toHaveAttribute('href', '/learn/sequence-diagram-modeling');

    // Navigate to Topic 16
    await nextTo16.click();
    await expect(page).toHaveURL(/.*\/learn\/sequence-diagram-modeling/);

    // Topic 16: Check next link points to Topic 17
    const nextTo17 = page.locator('nav[aria-label="التنقل بين المواضيع"]').getByRole('link', { name: /التالي/ });
    await expect(nextTo17).toHaveAttribute('href', '/learn/class-diagram-design');

    // Navigate to Topic 17
    await nextTo17.click();
    await expect(page).toHaveURL(/.*\/learn\/class-diagram-design/);

    // Topic 17: Prev link points back to Topic 16
    const prevTo16 = page.locator('nav[aria-label="التنقل بين المواضيع"]').getByRole('link', { name: /السابق/ });
    await expect(prevTo16).toHaveAttribute('href', '/learn/sequence-diagram-modeling');
  });

  test('TopicDetailModal opens and renders for Topic 14 with contract and MermaidViewer', async ({ page }) => {
    await page.goto('/');

    const t14Card = page.locator('article.topic-card').filter({ hasText: 'مخطط العلاقات بين الكيانات (ERD)' }).first();
    await t14Card.scrollIntoViewIfNeeded();
    await t14Card.getByRole('button', { name: 'معاينة سريعة' }).click({ force: true });

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('الموضوع #14');
    await expect(modal).toContainText('مخطط العلاقات بين الكيانات (ERD)');

    // Verify unified contract section inside modal
    await expect(modal.getByText('التطبيق على مشروعك', { exact: true })).toBeVisible();
    await expect(modal.locator('text=خطوات التطبيق على مشروعك:')).toBeVisible();

    // Verify MermaidViewer section
    const viewer = modal.locator('section[aria-label="المخطط الهندسي التفاعلي"]');
    await expect(viewer).toBeVisible();
    await expect(viewer.locator('svg').first()).toBeVisible();

    // Close modal via Escape key
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Topic learning activities and sections render correctly across Group 06', async ({ page }) => {
    await page.goto('/learn/relational-erd-design');

    const activities = page.locator('.learning-activities');
    await expect(activities).toBeVisible();

    // Learning objectives
    const objectivesSection = activities.locator('section').filter({ hasText: 'أهداف التعلّم' });
    await expect(objectivesSection).toBeVisible();
    await expect(objectivesSection).toContainText('تصميم جداول ومفاتيح وقيود');
    await expect(objectivesSection).toContainText('مراجعة العلاقات والتكامل المرجعي');

    // Authored sections
    await expect(activities.getByRole('heading', { name: 'المدخل: نموذج مجال وSRS' })).toBeVisible();
    await expect(activities.getByRole('heading', { name: 'المفاتيح والعلاقات' })).toBeVisible();
    await expect(activities.getByRole('heading', { name: 'راجع الاتساق والتزامن' })).toBeVisible();

    // Practical steps
    const practicalSection = activities.locator('section').filter({ hasText: 'خطوات التطبيق ومخرجاتها' });
    await expect(practicalSection).toBeVisible();
    await expect(practicalSection).toContainText('docs/ERD.md');
    await expect(practicalSection).toContainText('docs/database-review.md');

    // Worked example
    const workedExampleSection = activities.locator('section').filter({ hasText: 'أمثلة محلولة' });
    await expect(workedExampleSection).toBeVisible();
    await expect(workedExampleSection).toContainText('رابط طلب بمعدة');

    // Candidate external video
    const videoSection = activities.locator('section').filter({ hasText: 'موارد فيديو خارجية' });
    await expect(videoSection).toBeVisible();
    await expect(videoSection).toContainText('Create an Entity Relationship Diagram in Lucidchart');
    await expect(videoSection).toContainText('مصادر الفيديو الخارجية تتطلب اتصالاً بالإنترنت ولا تتوفر دون اتصال');
    await expect(videoSection).toContainText('مرشح — بانتظار المراجعة');

    // Check remaining topics render their activities
    for (const slug of ['dbml-dbdiagram-io', 'sequence-diagram-modeling', 'class-diagram-design']) {
      await page.goto(`/learn/${slug}`);
      await expect(page.locator('.learning-activities')).toBeVisible();
      await expect(page.locator('.learning-activities').locator('section').filter({ hasText: 'أهداف التعلّم' })).toBeVisible();
    }
  });

  test('Practical steps and expected outputs are present and copyable', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Topic 14: Practical steps and copy
    await page.goto('/learn/relational-erd-design');
    const t14Activities = page.locator('.learning-activities');
    const t14Steps = t14Activities.locator('section').filter({ hasText: 'خطوات التطبيق ومخرجاتها' });
    await expect(t14Steps).toContainText('docs/ERD.md');
    await expect(t14Steps).toContainText('docs/database-review.md');

    // Copy PROMPT 12
    const p12Container = page.locator('.code-container').filter({ hasText: 'PROMPT 12' }).first();
    const p12CopyBtn = p12Container.locator('button.copy-btn').first();
    await p12CopyBtn.click();
    await expect(p12CopyBtn).toContainText('✓ تم النسخ!');
    const p12Text = await p12Container.locator('code').textContent();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(p12Text);

    // Topic 15: DBML practical steps and copy
    await page.goto('/learn/dbml-dbdiagram-io');
    const t15Activities = page.locator('.learning-activities');
    const t15Steps = t15Activities.locator('section').filter({ hasText: 'خطوات التطبيق ومخرجاتها' });
    await expect(t15Steps).toContainText('docs/database.dbml');
    await expect(t15Steps).toContainText('docs/database.sql');

    const dbmlContainer = page.locator('.code-container').filter({ hasText: 'Table users' }).first();
    const dbmlCopyBtn = dbmlContainer.locator('button.copy-btn').first();
    await dbmlCopyBtn.click();
    await expect(dbmlCopyBtn).toContainText('✓ تم النسخ!');
    const dbmlText = await dbmlContainer.locator('code').textContent();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(dbmlText);

    // Topic 16: Sequence practical steps and copy
    await page.goto('/learn/sequence-diagram-modeling');
    const t16Activities = page.locator('.learning-activities');
    const t16Steps = t16Activities.locator('section').filter({ hasText: 'خطوات التطبيق ومخرجاتها' });
    await expect(t16Steps).toContainText('docs/diagrams/sequence-diagrams.mmd');
    await expect(t16Steps).toContainText('docs/diagrams/sequence-diagrams.md');

    const p09Container = page.locator('.code-container').filter({ hasText: 'PROMPT 09' }).first();
    const p09CopyBtn = p09Container.locator('button.copy-btn').first();
    await p09CopyBtn.click();
    await expect(p09CopyBtn).toContainText('✓ تم النسخ!');
    const p09Text = await p09Container.locator('code').textContent();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(p09Text);

    // Topic 17: Class practical steps and copy
    await page.goto('/learn/class-diagram-design');
    const t17Activities = page.locator('.learning-activities');
    const t17Steps = t17Activities.locator('section').filter({ hasText: 'خطوات التطبيق ومخرجاتها' });
    await expect(t17Steps).toContainText('docs/diagrams/class-diagram.mmd');
    await expect(t17Steps).toContainText('docs/diagrams/class-diagram.md');

    const p11Container = page.locator('.code-container').filter({ hasText: 'PROMPT 11' }).first();
    const p11CopyBtn = p11Container.locator('button.copy-btn').first();
    await p11CopyBtn.click();
    await expect(p11CopyBtn).toContainText('✓ تم النسخ!');
    const p11Text = await p11Container.locator('code').textContent();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(p11Text);
  });

  test('Objective quiz grades responses and provides explanatory feedback across attempts', async ({ page }) => {
    await page.goto('/learn/relational-erd-design');

    const activities = page.locator('.learning-activities');
    const quiz = activities.locator('section').filter({ hasText: 'فحص ذاتي للمفاهيم' });
    await expect(quiz).toBeVisible();

    const q1 = quiz.locator('fieldset').filter({ hasText: 'ما دور المفتاح الأجنبي في نموذج علائقي؟' });
    const q2 = quiz.locator('fieldset').filter({ hasText: 'لا يمكن حجز الوحدة نفسها مرتين بالتزامن' });

    // Answer Q1 correctly, Q2 incorrectly
    await q1.getByLabel('تمثيل مرجع علاقة وضمان اتساقه وفق القاعدة').check();
    await q2.getByLabel('كيف تغير اسم الرسم؟').check();

    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Verify score banner: 1 / 2
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Explanatory feedback
    await expect(q1.locator('div[role="status"]')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1.locator('div[role="status"]')).toContainText('المفتاح الأجنبي يفرض سلامة مرجعية');

    await expect(q2.locator('div[role="status"]')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2.locator('div[role="status"]')).toContainText('مراجعة التزامن تسأل كيف تتصرف معاملات متنافسة');

    // Retry quiz
    await quiz.getByRole('button', { name: 'إعادة المحاولة', exact: true }).click();

    // Answer both questions correctly
    await q1.getByLabel('تمثيل مرجع علاقة وضمان اتساقه وفق القاعدة').check();
    await q2.getByLabel('كيف يمنع التصميم معاملة متنافسة من تجاوز التوفر؟').check();

    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Verify updated score banner: 2 / 2
    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
    await expect(q1.locator('div[role="status"]')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q2.locator('div[role="status"]')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');

    // Retained attempts history
    await expect(quiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();
  });

  test('Checklist and rubric can be edited, reversed, and survive reload', async ({ page }) => {
    await page.goto('/learn/relational-erd-design');

    const activities = page.locator('.learning-activities');
    const rubric = activities.locator('section').filter({ hasText: 'مراجعة ذاتية لمخرجات التمرين' });

    const integrityFieldset = rubric.locator('fieldset').filter({ hasText: 'تكامل البيانات' });
    const concurrencyFieldset = rubric.locator('fieldset').filter({ hasText: 'مراجعة حالات التنافس' });

    // Select ratings
    await integrityFieldset.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await concurrencyFieldset.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    // Check one checklist item in the sidebar
    const checklistGroup = page.getByRole('group', { name: 'قائمة تحقق التطبيق' });
    const firstCheckItem = checklistGroup.getByRole('checkbox').first();
    await firstCheckItem.check();
    await expect(firstCheckItem).toBeChecked();

    // Reload page and verify persistence
    await page.reload();

    const reloadedActivities = page.locator('.learning-activities');
    const reloadedRubric = reloadedActivities.locator('section').filter({ hasText: 'مراجعة ذاتية لمخرجات التمرين' });
    const reloadedIntegrity = reloadedRubric.locator('fieldset').filter({ hasText: 'تكامل البيانات' });
    const reloadedConcurrency = reloadedRubric.locator('fieldset').filter({ hasText: 'مراجعة حالات التنافس' });

    await expect(reloadedIntegrity.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(reloadedConcurrency.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    const reloadedChecklist = page.getByRole('group', { name: 'قائمة تحقق التطبيق' });
    await expect(reloadedChecklist.getByRole('checkbox').first()).toBeChecked();

    // Reverse edits
    await reloadedIntegrity.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await reloadedConcurrency.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await reloadedChecklist.getByRole('checkbox').first().uncheck();
    await expect(reloadedChecklist.getByRole('checkbox').first()).not.toBeChecked();

    // Reload and verify reversed state persists
    await page.reload();

    const reversedActivities = page.locator('.learning-activities');
    const reversedRubric = reversedActivities.locator('section').filter({ hasText: 'مراجعة ذاتية لمخرجات التمرين' });
    const reversedIntegrity = reversedRubric.locator('fieldset').filter({ hasText: 'تكامل البيانات' });
    const reversedConcurrency = reversedRubric.locator('fieldset').filter({ hasText: 'مراجعة حالات التنافس' });

    await expect(reversedIntegrity.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(reversedConcurrency.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');

    const reversedChecklist = page.getByRole('group', { name: 'قائمة تحقق التطبيق' });
    await expect(reversedChecklist.getByRole('checkbox').first()).not.toBeChecked();
  });

  test('RTL prose and LTR technical text and code blocks render with correct directions', async ({ page }) => {
    await page.goto('/learn/relational-erd-design');

    // Document root has dir="rtl"
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');

    // Reader main section has computed direction rtl
    const mainArticle = page.locator('article.topic-article, main article').first();
    await expect(mainArticle).toBeVisible();
    expect(await mainArticle.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');

    // Pre code blocks and code containers have dir="ltr"
    const ltrCodeContainer = page.locator('div.code-container[dir="ltr"]').first();
    await expect(ltrCodeContainer).toBeVisible();
    expect(await ltrCodeContainer.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');

    // DBML lesson also maintains RTL/LTR separation
    await page.goto('/learn/dbml-dbdiagram-io');
    const dbmlLtrContainer = page.locator('div.code-container[dir="ltr"]').first();
    await expect(dbmlLtrContainer).toBeVisible();
    expect(await dbmlLtrContainer.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');
  });

  test('Mobile viewport at 390px has no horizontal overflow across all four Group 06 topics and preview modal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const topics = [
      '/learn/relational-erd-design',
      '/learn/dbml-dbdiagram-io',
      '/learn/sequence-diagram-modeling',
      '/learn/class-diagram-design',
    ];

    for (const url of topics) {
      await page.goto(url);
      await expect(page.locator('h1')).toBeVisible();
      const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(noOverflow, `Page ${url} had horizontal overflow at 390px`).toBe(true);
    }

    // Modal preview check on mobile
    await page.goto('/');
    const t14Card = page.locator('article.topic-card').filter({ hasText: 'مخطط العلاقات بين الكيانات (ERD)' }).first();
    await t14Card.scrollIntoViewIfNeeded();
    await t14Card.getByRole('button', { name: 'معاينة سريعة' }).click({ force: true });

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    const modalNoOverflow = await modal.evaluate((el) => el.scrollWidth <= el.clientWidth);
    expect(modalNoOverflow, 'Modal box had horizontal overflow on 390px viewport').toBe(true);
  });
});
