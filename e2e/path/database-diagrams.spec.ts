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
    await expect(header).toContainText('محتوى منشور');

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
    await expect(header).toContainText('محتوى منشور');

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
    await expect(header).toContainText('محتوى منشور');

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
    await expect(header).toContainText('محتوى منشور');

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
});
