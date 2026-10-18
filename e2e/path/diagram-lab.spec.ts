import { test, expect } from '@playwright/test';

test.describe('Ticket 21 / 25: Diagram Lab (مختبر المخططات الثمانية) E2E Journey', () => {
  test.beforeEach(async ({ context }) => {
    // Grant clipboard permissions for copy tests
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Diagram Lab page loads with hero, title, breadcrumbs and metrics', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // Title and Breadcrumb
    await expect(page.locator('h1')).toContainText('مختبر المخططات الثمانية');
    const breadcrumb = page.locator('nav[aria-label="مسار الصفحة"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('مسار التعلم');
    await expect(breadcrumb).toContainText('مختبر المخططات الثمانية');

    // Metrics strip in header
    const hero = page.getByTestId('diagram-lab-hero');
    await expect(hero).toBeVisible();
    await expect(hero.locator('text=مخططات معمارية').first()).toBeVisible();
    await expect(hero.locator('text=عائلات رسم').first()).toBeVisible();
    await expect(hero.locator('text=محررات حية معتمدة').first()).toBeVisible();
    await expect(hero.locator('text=مواضيع منشورة بالمسار').first()).toBeVisible();
  });

  test('All 8 diagram types are present with core questions, purposes and families', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // Expected 8 diagrams
    const expectedDiagrams = [
      { id: 'user-flow', title: 'User Flow', question: 'ماذا يفعل المستخدم وبأي ترتيب؟', family: 'Mermaid' },
      { id: 'domain-model', title: 'Domain Model', question: 'ما مفاهيم العمل وعلاقاتها؟', family: 'Mermaid' },
      { id: 'use-case', title: 'Use Case', question: 'من المستخدم وما الذي يحق له فعله؟', family: 'PlantUML' },
      { id: 'activity', title: 'Activity', question: 'ما سير العملية وقراراتها؟', family: 'Mermaid' },
      { id: 'sequence', title: 'Sequence', question: 'من يرسل ماذا ولمن وبأي ترتيب؟', family: 'Mermaid' },
      { id: 'state', title: 'State', question: 'ما حالات الكائن ومتى تتغير؟', family: 'Mermaid' },
      { id: 'class', title: 'Class', question: 'ما الكلاسات وعلاقاتها التصميمية؟', family: 'Mermaid' },
      { id: 'erd', title: 'ERD', question: 'كيف تنظم بيانات النظام وجداولها؟', family: 'DBML' },
    ];

    for (const d of expectedDiagrams) {
      const card = page.locator(`article#diagram-${d.id}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(d.title);
      await expect(card).toContainText(d.question);
      await expect(card).toContainText(`عائلة ${d.family}`);
      await expect(card.locator('text=الغرض الهندسي الأساسي:')).toBeVisible();
      await expect(card.locator('text=متى تختار هذا المخطط؟')).toBeVisible();
    }
  });

  test('Mermaid supported diagrams render live SVG in the viewport', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // User Flow card (Mermaid flowchart)
    const userFlowCard = page.locator('article#diagram-user-flow');
    await expect(userFlowCard).toBeVisible();
    const svg = userFlowCard.locator('svg[id^="mermaid-"]').first();
    await expect(svg).toBeVisible();

    // Sequence Diagram card (Mermaid sequenceDiagram)
    const seqCard = page.locator('article#diagram-sequence');
    await expect(seqCard).toBeVisible();
    const seqSvg = seqCard.locator('svg[id^="mermaid-"]').first();
    await expect(seqSvg).toBeVisible();

    // State Diagram card (Mermaid stateDiagram-v2)
    const stateCard = page.locator('article#diagram-state');
    await expect(stateCard).toBeVisible();
    const stateSvg = stateCard.locator('svg[id^="mermaid-"]').first();
    await expect(stateSvg).toBeVisible();
  });

  test('Non-Mermaid diagrams (PlantUML & DBML) show source and dedicated editor without executing in Mermaid', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // 1. PlantUML (Use Case)
    const useCaseCard = page.locator('article#diagram-use-case');
    await expect(useCaseCard).toBeVisible();

    // Must NOT execute or render in Mermaid (zero mermaid-rendered SVGs)
    await expect(useCaseCard.locator('svg[id^="mermaid-"]')).toHaveCount(0);

    // Displays external editor notice
    await expect(useCaseCard).toContainText('عائلة PlantUML — محرك خارجي متخصص');
    await expect(useCaseCard).toContainText('PlantText');

    // Has editor link to PlantText
    const plantTextLink = useCaseCard.locator('a[href*="planttext.com"]').first();
    await expect(plantTextLink).toBeVisible();

    // Switch to Engine Boundary tab and verify grounded error state
    const boundaryTab = useCaseCard.getByRole('tab', { name: /حدود المحرك/ });
    await boundaryTab.click();
    await expect(useCaseCard).toContainText('الحد الهندسي الفاصل');
    await expect(useCaseCard).toContainText('محاكاة خطأ المحرك');

    const toggleErrorBtn = useCaseCard.getByRole('button', { name: 'عرض الخطأ الصياغي' });
    await toggleErrorBtn.click();
    await expect(useCaseCard.locator('pre').filter({ hasText: '@startuml' }).first()).toBeVisible();

    // 2. DBML (ERD)
    const erdCard = page.locator('article#diagram-erd');
    await expect(erdCard).toBeVisible();
    await expect(erdCard.locator('svg[id^="mermaid-"]')).toHaveCount(0);
    await expect(erdCard).toContainText('عائلة DBML — محرك خارجي متخصص');
    await expect(erdCard).toContainText('dbdiagram.io');

    const dbdiagramLink = erdCard.locator('a[href*="dbdiagram.io"]').first();
    await expect(dbdiagramLink).toBeVisible();
  });

  test('Copy code button triggers copy feedback and clipboard update', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    const userFlowCard = page.locator('article#diagram-user-flow');
    const copyBtn = userFlowCard.getByRole('button', { name: /نسخ كود/ }).first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Feedback confirmation
    await expect(userFlowCard.locator('text=تم النسخ ✓').first()).toBeVisible();
  });

  test('Diagram cards link directly to published topics in the path', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // Check all 8 topic links exist and point to valid /learn/[slug] routes
    const expectedLinks = [
      { id: 'user-flow', expectedUrl: '/learn/user-flow-modeling' },
      { id: 'domain-model', expectedUrl: '/learn/conceptual-domain-model' },
      { id: 'use-case', expectedUrl: '/learn/use-case-diagram' },
      { id: 'activity', expectedUrl: '/learn/activity-diagram' },
      { id: 'sequence', expectedUrl: '/learn/sequence-diagram-modeling' },
      { id: 'state', expectedUrl: '/learn/state-diagram' },
      { id: 'class', expectedUrl: '/learn/class-diagram-design' },
      { id: 'erd', expectedUrl: '/learn/relational-erd-design' },
    ];

    for (const linkInfo of expectedLinks) {
      const card = page.locator(`article#diagram-${linkInfo.id}`);
      const topicLink = card.locator(`a[href="${linkInfo.expectedUrl}"]`).first();
      await expect(topicLink).toBeVisible();
    }

    // Click User Flow topic link and verify navigation
    const userFlowTopicLink = page.locator('article#diagram-user-flow a[href="/learn/user-flow-modeling"]').first();
    await userFlowTopicLink.click();
    await expect(page).toHaveURL(/.*\/learn\/user-flow-modeling/);
    await expect(page.locator('h1')).toContainText('User Flow');
  });

  test('Family filters filter cards count correctly', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // Filter Mermaid (6)
    const mermaidFilter = page.getByRole('button', { name: 'Mermaid (6)' });
    await mermaidFilter.click();
    await expect(page.locator('article[id^="diagram-"]')).toHaveCount(6);

    // Filter PlantUML (1)
    const plantFilter = page.getByRole('button', { name: 'PlantUML (1)' });
    await plantFilter.click();
    await expect(page.locator('article[id^="diagram-"]')).toHaveCount(1);
    await expect(page.locator('article#diagram-use-case')).toBeVisible();

    // Filter DBML (1)
    const dbmlFilter = page.getByRole('button', { name: 'DBML (1)' });
    await dbmlFilter.click();
    await expect(page.locator('article[id^="diagram-"]')).toHaveCount(1);
    await expect(page.locator('article#diagram-erd')).toBeVisible();

    // Reset to ALL (8)
    const allFilter = page.getByRole('button', { name: 'الكل (8)' });
    await allFilter.click();
    await expect(page.locator('article[id^="diagram-"]')).toHaveCount(8);
  });

  test('Comparison matrix table displays all 8 diagrams side-by-side', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // Switch to Matrix tab
    const matrixTab = page.getByRole('tab', { name: /جدول المقارنة الشاملة/ });
    await matrixTab.click();

    const table = page.locator('table');
    await expect(table).toBeVisible();
    // 8 data rows
    await expect(table.locator('tbody tr')).toHaveCount(8);

    // Table contains headers
    await expect(table).toContainText('نوع المخطط');
    await expect(table).toContainText('السؤال المحوري الذي يجيب عنه');
    await expect(table).toContainText('عائلة الصيغة');
    await expect(table).toContainText('التصيير في العارض');
    await expect(table).toContainText('المحرر المعتمد');
  });

  test('Side-by-side comparator enables direct comparison of two diagrams', async ({ page }) => {
    await page.goto('/learn/diagram-lab');

    // Switch to Side-by-Side tab
    const sideBySideTab = page.getByRole('tab', { name: /المقارنة المزدوجة/ });
    await sideBySideTab.click();

    // Presets exist
    await expect(page.locator('text=مقارنات منهجية شائعة')).toBeVisible();
    const presetBtn = page.getByRole('button', { name: /Domain Model مقابل ERD/ });
    await expect(presetBtn).toBeVisible();
    await presetBtn.click();

    // Right card: Domain Model, Left card: ERD
    await expect(page.locator('h4').filter({ hasText: 'Domain Model' }).first()).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: 'ERD' }).first()).toBeVisible();

    // Both questions visible
    await expect(page.locator('text=ما مفاهيم العمل وعلاقاتها؟').first()).toBeVisible();
    await expect(page.locator('text=كيف تنظم بيانات النظام وجداولها؟').first()).toBeVisible();
  });
});
