import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 13: Python, PostgreSQL, and API Architecture', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  // -------------------------------------------------------------------------
  // TOPIC 38: PYTHON BACKEND FOUNDATION
  // -------------------------------------------------------------------------
  test('Topic 38 (Python): Environment isolation, secrets management (.env), and boundary callout', async ({ page }) => {
    await page.goto('/learn/python-backend-foundation');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('Python: أساسيات الخادم وتهيئة البيئة لمشروع الطالب');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('محتوى منشور');
    await expect(header).toContainText('.env.example');
    await expect(header).toContainText('docs/BACKEND_SETUP.md');

    // RTL verification
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Content: Purpose and project level (no bloated academic course)
    const content = page.locator('article');
    await expect(content).toContainText('المستوى اللازم للمشروع: لماذا Python وما الذي نحتاجه فعلاً؟');
    await expect(content).toContainText('البيئة الافتراضية المعزولة وإدارة الاعتماديات');
    await expect(content).toContainText('إدارة الأسرار والمتغيرات البيئية');

    // Acceptance criteria & boundary check: Ticket does NOT build a backend for the educational site itself
    await expect(content).toContainText('تنبيه هندسي للحدود التعليمية');
    await expect(content).toContainText('لا ينشئ ولا يتطلب أي Backend للموقع التعليمي نفسه');

    // Secrets & Environment variables check
    await expect(content).toContainText('.env مقابل .env.example');
    await expect(content).toContainText('SECRET_KEY');
    await expect(content).toContainText('Zero Hardcoded Secrets');

    // SVG Architecture Diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with LTR direction and functional copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Navigation bounds:
    // Prev -> Topic 37 (frontend-incremental-implementation)
    // Next -> Topic 39 (postgresql-database-setup)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/frontend-incremental-implementation');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/postgresql-database-setup');
  });

  // -------------------------------------------------------------------------
  // TOPIC 39: POSTGRESQL DATABASE SETUP
  // -------------------------------------------------------------------------
  test('Topic 39 (PostgreSQL): Connection URI, connection pooling, and schema planning vs migrations separation', async ({ page }) => {
    await page.goto('/learn/postgresql-database-setup');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('PostgreSQL: إعداد قاعدة البيانات والاتصال والأسرار');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('محتوى منشور');
    await expect(header).toContainText('docs/DATABASE_CONNECTION_SPEC.md');
    await expect(header).toContainText('docs/MIGRATION_STRATEGY.md');

    const content = page.locator('article');

    // Content: Why PostgreSQL & 5 BorrowHub tables
    await expect(content).toContainText('لماذا PostgreSQL؟ ومطابقة نموذج بيانات المشروع (ERD)');
    await expect(content).toContainText('users');
    await expect(content).toContainText('equipment_categories');
    await expect(content).toContainText('equipment');
    await expect(content).toContainText('loan_requests');
    await expect(content).toContainText('loan_action_logs');

    // Content: Connection setup, URI, and connection pooling
    await expect(content).toContainText('إعداد الاتصال وسلسلة URI وحوض الاتصالات (Connection Pooling)');
    await expect(content).toContainText('postgresql://');
    await expect(content).toContainText('Connection Pool');

    // Acceptance criteria: DB schema planning separated from applying schema via framework migrations
    await expect(content).toContainText('الفصل الجذري بين تخطيط قاعدة البيانات وتطبيق مخططها (Planning vs. Applying Schema)');
    await expect(content).toContainText('بديل الإطار الذي تختاره');
    await expect(content).toContainText('makemigrations');
    await expect(content).toContainText('alembic');

    // Educational boundary check: Ticket does NOT build a backend for the educational site itself
    await expect(content).toContainText('تنبيه هندسي للحدود التعليمية');
    await expect(content).toContainText('لا ينشئ قاعدة بيانات ولا يربط أي Backend بالموقع التعليمي نفسه');

    // SVG Diagram: Schema lifecycle
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with LTR and copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Navigation bounds:
    // Prev -> Topic 38 (python-backend-foundation)
    // Next -> Topic 40 (backend-architecture-api-contracts)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/python-backend-foundation');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/backend-architecture-api-contracts');
  });

  // -------------------------------------------------------------------------
  // TOPIC 40: BACKEND ARCHITECTURE & API CONTRACTS
  // -------------------------------------------------------------------------
  test('Topic 40 (API Architecture): Grounded in PRD/ERD/TS contracts, standardized envelopes, and RBAC matrix', async ({ page }) => {
    await page.goto('/learn/backend-architecture-api-contracts');

    // Title and headers
    await expect(page.locator('h1')).toContainText('معمارية Backend وعقود API لمشروع الطالب');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('محتوى منشور');
    await expect(header).toContainText('docs/API_CONTRACTS.md');
    await expect(header).toContainText('docs/PERMISSIONS_MATRIX.md');

    const content = page.locator('article');

    // Content: Grounded in requirements, ERD, and frontend contracts
    await expect(content).toContainText('ارتكاز معمارية API على المتطلبات وERD وعقود الفرونت إند');
    await expect(content).toContainText('/api/v1/equipment');
    await expect(content).toContainText('/api/v1/loans');
    await expect(content).toContainText('Equipment');
    await expect(content).toContainText('LoanRequest');

    // Content: Standardized Request & Response Envelopes
    await expect(content).toContainText('معايير الطلبات والاستجابات الموحدة (Standardized Envelopes)');
    await expect(content).toContainText('Success Envelope');
    await expect(content).toContainText('Standardized Error Envelope');
    await expect(content).toContainText('ACTIVE_LOAN_LIMIT_EXCEEDED');

    // Content: Permissions and RBAC matrix
    await expect(content).toContainText('مصفوفة الصلاحيات والتحكم بالوصول (RBAC Matrix)');
    await expect(content).toContainText('الطالب (Student)');
    await expect(content).toContainText('المشرف/الموظف (Staff)');
    await expect(content).toContainText('المسؤول (Admin)');

    // Content: HTTP Status Codes
    await expect(content).toContainText('دلالات رموز حالات HTTP المعتمدة في العقود');
    await expect(content).toContainText('200 OK / 201 Created');
    await expect(content).toContainText('401 Unauthorized');
    await expect(content).toContainText('403 Forbidden');
    await expect(content).toContainText('409 Conflict');
    await expect(content).toContainText('422 Unprocessable');

    // Educational boundary check: Ticket does NOT build a backend for the educational site itself
    await expect(content).toContainText('تنبيه هندسي للحدود التعليمية');
    await expect(content).toContainText('لا ينشئ أي Backend للموقع التعليمي نفسه');

    // SVG Diagram: Request-Response Lifecycle
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Navigation bounds:
    // Prev -> Topic 39 (postgresql-database-setup)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/postgresql-database-setup');
  });

  // -------------------------------------------------------------------------
  // RESPONSIVENESS AND NO HORIZONTAL SCROLL (390px, 768px, 1024px, 1440px)
  // -------------------------------------------------------------------------
  test('Responsive viewport test across all 3 topics with no horizontal overflow', async ({ page }) => {
    const slugs = [
      'python-backend-foundation',
      'postgresql-database-setup',
      'backend-architecture-api-contracts',
    ];

    const viewports = [
      { width: 390, height: 844 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1024, height: 768 },  // Desktop
      { width: 1440, height: 900 },  // Wide
    ];

    for (const slug of slugs) {
      for (const vp of viewports) {
        await page.setViewportSize(vp);
        await page.goto(`/learn/${slug}`);

        // Check horizontal overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // allow 1px rounding margin
      }
    }
  });

});
