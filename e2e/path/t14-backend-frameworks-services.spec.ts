import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 14: Backend Frameworks, Auth & Permissions, Services & Selectors', () => {

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  // -------------------------------------------------------------------------
  // TOPIC 41: DJANGO BACKEND & MIGRATIONS (Alternative 1)
  // -------------------------------------------------------------------------
  test('Topic 41 (Django): Framework alternative banner, models & native migrations, and copy button', async ({ page }) => {
    await page.goto('/learn/django-backend');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('Django: بناء الخادم والنماذج والتهجيرات (بديل مستقل 1)');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('مسار موحد مكتمل ✓');
    await expect(header).toContainText('معمارية وتطوير الخادم · موضوع 41');
    await expect(header).toContainText('backend/config/settings.py');
    await expect(header).toContainText('backend/apps/*/models.py');
    await expect(header).toContainText('backend/apps/*/migrations/*.py');
    await expect(header).toContainText('docs/DJANGO_BACKEND_SETUP.md');

    // RTL verification
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    const content = page.locator('article');

    // Acceptance criteria 1: Alternative banner & decision clarity (no building twice)
    await expect(content).toContainText('قرار المعمارية: بديلان مستقلان لخادم المشروع (Django أو FastAPI)');
    await expect(content).toContainText('يختار الطالب إطار عمل واحد فقط لبناء خادم مشروعه، ولا يلزم إطلاقاً بإعادة بناء الخادم مرتين');
    const fastapiLink = content.getByRole('link', { name: /الانتقال مباشرة لموضوع FastAPI/ });
    await expect(fastapiLink).toBeVisible();
    await expect(fastapiLink).toHaveAttribute('href', '/learn/fastapi-backend');

    // Acceptance criteria 2: Batteries-included philosophy and Native Migrations
    await expect(content).toContainText('فلسفة Django المتكاملة (Batteries-Included)');
    await expect(content).toContainText('نظام التهجيرات الأصيل (Native Migrations)');
    await expect(content).toContainText('django_migrations');
    await expect(content).toContainText('makemigrations');
    await expect(content).toContainText('migrate');
    await expect(content).toContainText('Django Admin');

    // Modular apps structure
    await expect(content).toContainText('معمارية المشروع وتقسيم التطبيقات (Modular Django Apps)');

    // SVG Architecture Diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container with LTR and functional copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة الإنجاز والتحقق')).toBeVisible();

    // Navigation bounds:
    // Prev -> Topic 40 (backend-architecture-api-contracts)
    // Next -> Topic 42 (fastapi-backend)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/backend-architecture-api-contracts');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/fastapi-backend');
  });

  // -------------------------------------------------------------------------
  // TOPIC 42: FASTAPI BACKEND & ALEMBIC (Alternative 2)
  // -------------------------------------------------------------------------
  test('Topic 42 (FastAPI): Framework alternative banner, Pydantic vs SQLAlchemy, Alembic migrations, and copy button', async ({ page }) => {
    await page.goto('/learn/fastapi-backend');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('FastAPI: بناء الخادم ونماذج البيانات والتهجيرات مع Alembic (بديل مستقل 2)');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('مسار موحد مكتمل ✓');
    await expect(header).toContainText('معمارية وتطوير الخادم · موضوع 42');
    await expect(header).toContainText('backend/app/main.py');
    await expect(header).toContainText('backend/app/schemas/');
    await expect(header).toContainText('backend/app/models/');
    await expect(header).toContainText('alembic/');
    await expect(header).toContainText('docs/FASTAPI_BACKEND_SETUP.md');

    const content = page.locator('article');

    // Acceptance criteria 1: Alternative banner & decision clarity (no building twice)
    await expect(content).toContainText('قرار المعمارية: بديلان مستقلان لخادم المشروع (FastAPI أو Django)');
    await expect(content).toContainText('إذا اخترت FastAPI، فهذا هو مسارك البرمجي؛ لست بحاجة لبناء الخادم بـ Django');
    const authLink = content.getByRole('link', { name: /الانتقال مباشرة إلى موضوع المصادقة/ });
    await expect(authLink).toBeVisible();
    await expect(authLink).toHaveAttribute('href', '/learn/auth-permissions');

    // Acceptance criteria 2: Appropriate migrations engine (Alembic)
    await expect(content).toContainText('آلية التهجيرات المناسبة للبديل: Alembic وإدارة تغييرات المخطط');
    await expect(content).toContainText('alembic init alembic');
    await expect(content).toContainText('alembic revision --autogenerate');
    await expect(content).toContainText('alembic upgrade head');
    await expect(content).toContainText('alembic_version');

    // Architectural separation: Pydantic schemas vs SQLAlchemy models
    await expect(content).toContainText('الفصل المعماري الحاسم: مخططات Pydantic مقابل نماذج SQLAlchemy');
    await expect(content).toContainText('مخططات التحقق (Pydantic Schemas)');
    await expect(content).toContainText('نماذج قاعدة البيانات (SQLAlchemy ORM)');
    await expect(content).toContainText('AsyncSession');

    // Acceptance criteria 4: BorrowHub boundary callout
    await expect(content).toContainText('تنبيه منهجي: أمثلة BorrowHub إرشادية وليست إلزامية لمشروع الطالب');
    await expect(content).toContainText('قواعد BorrowHub وحقولها ليست متطلبات مفروضة على مشروعك الخاص');

    // SVG Diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container and functional copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');

    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Navigation bounds:
    // Prev -> Topic 41 (django-backend)
    // Next -> Topic 43 (auth-permissions)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/django-backend');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/auth-permissions');
  });

  // -------------------------------------------------------------------------
  // TOPIC 43: AUTHENTICATION & PERMISSIONS
  // -------------------------------------------------------------------------
  test('Topic 43 (Auth & Permissions): JWT tokens, RBAC roles, requirements grounding, and dual-framework code', async ({ page }) => {
    await page.goto('/learn/auth-permissions');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('المصادقة والصلاحيات: تأمين الخادم والتحكم بالوصول (RBAC)');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('مسار موحد مكتمل ✓');
    await expect(header).toContainText('معمارية وتطوير الخادم · موضوع 43');
    await expect(header).toContainText('docs/AUTH_PERMISSIONS_SPEC.md');
    await expect(header).toContainText('tests/test_auth_permissions.py');

    const content = page.locator('article');

    // Acceptance criteria 3: Auth vs Permissions distinction
    await expect(content).toContainText('المصادقة (Authentication)');
    await expect(content).toContainText('الصلاحيات والتحكم بالوصول (Authorization / RBAC)');
    await expect(content).toContainText('Argon2');
    await expect(content).toContainText('Bcrypt');

    // JWT Dual Tokens architecture
    await expect(content).toContainText('معمارية رموز JWT: رمز الوصول السريع (Access) ورمز التجديد (Refresh)');
    await expect(content).toContainText('Access Token');
    await expect(content).toContainText('Refresh Token');

    // Acceptance criteria 3: Implementation for both framework tracks
    await expect(content).toContainText('التطبيق العملي للمصادقة والصلاحيات وفق الإطار الذي اخترته');
    await expect(content).toContainText('IsStaffOrAdmin');
    await expect(content).toContainText('IsOwnerOrAdminOnly');
    await expect(content).toContainText('require_roles');
    await expect(content).toContainText('OAuth2PasswordBearer');

    // Acceptance criteria 3: Grounded in requirements matrix (PRD & SRS)
    await expect(content).toContainText('ربط الصلاحيات بمصفوفة متطلبات المشروع (PRD & SRS)');
    const table = content.locator('table');
    await expect(table).toBeVisible();
    await expect(table).toContainText('/api/catalog');
    await expect(table).toContainText('/api/requests');
    await expect(table).toContainText('PATCH /api/requests/{id}/approve');

    // Acceptance criteria 4: BorrowHub boundary callout
    await expect(content).toContainText('تنبيه منهجي: أدوار وصلاحيات BorrowHub دراسة حالة إرشادية وليست قيوداً لمشروعك');
    await expect(content).toContainText('لا تفرض هذه الأدوار على مشروعك ما لم تكن جزءاً من فكرتك');

    // SVG Diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container and copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Navigation bounds:
    // Prev -> Topic 42 (fastapi-backend)
    // Next -> Topic 44 (services-selectors)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/fastapi-backend');

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/services-selectors');
  });

  // -------------------------------------------------------------------------
  // TOPIC 44: SERVICES & SELECTORS
  // -------------------------------------------------------------------------
  test('Topic 44 (Services & Selectors): Clean architecture separation, atomic transactions, select_for_update, and boundary guard', async ({ page }) => {
    await page.goto('/learn/services-selectors');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('Services وSelectors: فصل منطق العمل والمعاملات واستعلامات القراءة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('مسار موحد مكتمل ✓');
    await expect(header).toContainText('معمارية وتطوير الخادم · موضوع 44');
    await expect(header).toContainText('docs/SERVICES_SELECTORS_ARCHITECTURE.md');
    await expect(header).toContainText('tests/test_services_business_rules.py');

    const content = page.locator('article');

    // Acceptance criteria 3: Services vs Selectors separation
    await expect(content).toContainText('المعضلة المعمارية: لماذا تفشل بنية CRUD السطحية في المشروعات الحقيقية؟');
    await expect(content).toContainText('Fat Views');
    await expect(content).toContainText('Fat Models');
    await expect(content).toContainText('طبقة الخدمات (Services)');
    await expect(content).toContainText('طبقة المحددات (Selectors)');

    // Acceptance criteria 3: Atomic Transactions & Race condition guards
    await expect(content).toContainText('المعاملات الذرية (Atomic Transactions) وحماية قواعد العمل');
    await expect(content).toContainText('select_for_update()');
    await expect(content).toContainText('منع التضارب وحالات السباق (Race Conditions & select_for_update)');
    await expect(content).toContainText('N+1');

    // Dual-framework implementation code
    await expect(content).toContainText('transaction.atomic()');
    await expect(content).toContainText('session.begin()');
    await expect(content).toContainText('with_for_update()');

    // Acceptance criteria 4: Strict BorrowHub boundary guard
    await expect(content).toContainText('تحذير منهجي صارم: لا تجعل قواعد BorrowHub قواعد إلزامية لمشروعك');
    await expect(content).toContainText('قواعد خاصة بدراسة حالة نظام BorrowHub حصراً');
    await expect(content).toContainText('يُحظر نسخ هذه القواعد حرفياً لمشروع الطالب الشخصي');

    // SVG Diagram
    const diagramSvg = content.locator('.diagram-box svg');
    await expect(diagramSvg).toBeVisible();

    // Code container and copy button
    const codeBlock = content.locator('.code-container').first();
    await expect(codeBlock).toBeVisible();
    const copyBtn = codeBlock.locator('.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    // Navigation bounds:
    // Prev -> Topic 43 (auth-permissions)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/auth-permissions');
  });

  // -------------------------------------------------------------------------
  // RESPONSIVENESS AND NO HORIZONTAL OVERFLOW (390px, 768px, 1024px, 1440px)
  // -------------------------------------------------------------------------
  test('Responsive viewport test across all 4 topics with no horizontal overflow', async ({ page }) => {
    const slugs = [
      'django-backend',
      'fastapi-backend',
      'auth-permissions',
      'services-selectors',
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
