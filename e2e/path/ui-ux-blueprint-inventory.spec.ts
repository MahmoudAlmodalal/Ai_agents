import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 07: UI/UX, UX Blueprint & Screen Inventory (Topics 18, 19, 20)', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Topic 18 (UI/UX Roles & Navigation): Renders metadata, role matrix, RTL layout, and PROMPT 14 copyable', async ({ page }) => {
    await page.goto('/learn/ui-ux-roles-navigation', { timeout: 40000 });

    // Header & metadata
    const topicHeader = page.locator('header.rounded-3xl');
    await expect(page.locator('h1')).toContainText('الأدوار وهيكلية التنقل');
    await expect(topicHeader).toContainText('موضوع 18');
    await expect(topicHeader).toContainText('تجربة المستخدم وهندسة المعلومات');
    await expect(topicHeader).toContainText('docs/UI_UX_REQUIREMENTS.md');

    // Directionality checks: Page is RTL, Code blocks are LTR
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    const codeContainers = page.locator('.code-container[dir="ltr"]');
    await expect(codeContainers.first()).toBeVisible();

    // Goal and practical steps
    await expect(page.locator('text=الهدف من الموضوع:')).toBeVisible();
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Content: Role-based matrix table
    const rolesTable = page.locator('table').filter({ hasText: 'الدور (User Role)' });
    await expect(rolesTable).toBeVisible();
    await expect(page.locator('text=الزائر العام (Guest)')).toBeVisible();
    await expect(page.locator('text=الطالب المستعير (Student)')).toBeVisible();
    await expect(page.locator('text=مشرف المستودع (Staff)')).toBeVisible();

    // Navigation flowchart in Mermaid
    const navMermaid = page.locator('.code-container').filter({ hasText: 'MERMAID (flowchart TD)' });
    await expect(navMermaid).toBeVisible();
    expect(await navMermaid.innerText()).toContain('flowchart TD');
    expect(await navMermaid.innerText()).toContain('BorrowHub');

    // PROMPT 14 section and copy button
    const prompt14Block = page.locator('.code-container').filter({ hasText: 'PROMPT 14 — UI/UX Grill Me' });
    await expect(prompt14Block).toBeVisible();
    expect(await prompt14Block.innerText()).toContain('/grill-me');
    expect(await prompt14Block.innerText()).toContain('Act as a Senior UX Researcher');

    // Test copy button functionality and immediate visual feedback
    const copyBtn = prompt14Block.locator('button.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toHaveText(/تم النسخ/);
  });

  test('Topic 19 (UX Blueprint): Renders Sitemap, four UI states and cross-cutting checks, and PROMPT 15', async ({ page }) => {
    await page.goto('/learn/ux-blueprint');

    // Header & metadata
    const topicHeader = page.locator('header.rounded-3xl');
    await expect(page.locator('h1')).toContainText('UX Blueprint');
    await expect(topicHeader).toContainText('موضوع 19');
    await expect(topicHeader).toContainText('docs/UX_BLUEPRINT.md');

    // Sitemap Mermaid diagram
    const sitemapBlock = page.locator('.code-container').filter({ hasText: 'MERMAID (flowchart TD) — خريطة موقع BorrowHub' });
    await expect(sitemapBlock).toBeVisible();
    const sitemapText = await sitemapBlock.innerText();
    expect(sitemapText).toContain('flowchart TD');
    expect(sitemapText).toContain('/equipment');
    expect(sitemapText).toContain('/dashboard/loans');
    expect(sitemapText).toContain('/staff/requests');

    // Four UI states; responsive and accessibility are cross-cutting checks.
    await expect(page.locator('text=1. التحميل (Loading)')).toBeVisible();
    await expect(page.locator('text=2. الفراغ (Empty)')).toBeVisible();
    await expect(page.locator('text=3. الخطأ والتعافي (Error)')).toBeVisible();
    await expect(page.locator('text=4. النجاح (Success)')).toBeVisible();
    await expect(page.locator('text=فحص عابر: الاستجابة (Responsive)')).toBeVisible();
    await expect(page.locator('text=فحص عابر: إمكانية الوصول (Accessibility)')).toBeVisible();

    // Skeletons, WCAG AA and target-size guidance
    const article = page.locator('article').first();
    await expect(article).toContainText('Skeleton Screens');
    await expect(article).toContainText('معيار WCAG المناسب');
    await expect(article).toContainText('44 CSS px قيمة راحة اختيارية وليست شرطاً عاماً لكل عنصر');

    // PROMPT 15 section
    const prompt15Block = page.locator('.code-container').filter({ hasText: 'PROMPT 15 — UX Blueprint + Screen Inventory' });
    await expect(prompt15Block).toBeVisible();
    const promptText = await prompt15Block.innerText();
    expect(promptText).toContain('Act as a Senior UX Architect');
    expect(promptText).toContain('docs/UX_BLUEPRINT.md and docs/SCREEN_INVENTORY.md');

    // Copy button test
    const copyBtn = prompt15Block.locator('button.copy-btn');
    await copyBtn.click();
    await expect(copyBtn).toHaveText(/تم النسخ/);
  });

  test('Topic 20 (Screen Inventory): Verifies strict MVP scope, SCR-01 to SCR-06, traceability matrix, and no invented screens', async ({ page }) => {
    await page.goto('/learn/screen-inventory');

    // Header & metadata
    const topicHeader = page.locator('header.rounded-3xl');
    await expect(page.locator('h1')).toContainText('Screen Inventory');
    await expect(topicHeader).toContainText('موضوع 20');
    await expect(topicHeader).toContainText('docs/SCREEN_INVENTORY.md');

    // Golden rule: No invented screens callout
    await expect(page.locator('text=حظر اختراع شاشات وهمية')).toBeVisible();
    await expect(page.locator('text=قاعدة المنع الصارم (No Invented Screens)')).toBeVisible();

    // Screen prioritization (Core vs Supporting vs Future)
    await expect(page.locator('text=الجوهرية (Core)')).toBeVisible();
    await expect(page.locator('text=المساندة (Supporting)')).toBeVisible();
    await expect(page.locator('text=المستقبلية (Future / Out of Scope)')).toBeVisible();

    // Verify all 6 MVP screens in the reference table using specific strong elements
    await expect(page.locator('strong:has-text("SCR-01")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-02")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-03")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-04")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-05")')).toBeVisible();
    await expect(page.locator('strong:has-text("SCR-06")')).toBeVisible();

    // Verify traceability matrix for PRD Rules 3, 6, 8
    await expect(page.locator('h3:has-text("مصفوفة تدقيق التغطية الهندسية")')).toBeVisible();
    await expect(page.locator('text=القاعدة 3:')).toBeVisible();
    const pickupRow = page.locator('tr').filter({ hasText: 'القاعدة 6:' });
    await expect(pickupRow).toBeVisible();
    await expect(pickupRow).toContainText('48 ساعة');
    await expect(page.locator('text=القاعدة 6:')).toBeVisible();
    await expect(page.locator('text=القاعدة 8:')).toBeVisible();

    // Deliverable code template
    const templateBlock = page.locator('.code-container').filter({ hasText: 'MARKDOWN — نموذج هيكل docs/SCREEN_INVENTORY.md' });
    await expect(templateBlock).toBeVisible();

    // Copy button test
    const copyBtn = templateBlock.locator('button.copy-btn');
    await copyBtn.click();
    await expect(copyBtn).toHaveText(/تم النسخ/);
  });

  test('Sequential Navigation Bounds: Seamless bi-directional transition between Topics 18, 19, and 20', async ({ page }) => {
    // 1. Start at Topic 18
    await page.goto('/learn/ui-ux-roles-navigation');

    // Next should link to Topic 19 (UX Blueprint)
    const nextFrom18 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextFrom18).toBeVisible();
    await expect(nextFrom18).toContainText('UX Blueprint');
    await nextFrom18.click();

    // 2. Now on Topic 19
    await expect(page).toHaveURL(/\/learn\/ux-blueprint/);

    // Prev should lead back to Topic 18
    const prevFrom19 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevFrom19).toBeVisible();
    await expect(prevFrom19).toContainText('الأدوار وهيكلية التنقل');

    // Next should link to Topic 20 (Screen Inventory)
    const nextFrom19 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextFrom19).toBeVisible();
    await expect(nextFrom19).toContainText('Screen Inventory');
    await nextFrom19.click();

    // 3. Now on Topic 20
    await expect(page).toHaveURL(/\/learn\/screen-inventory/);

    // Prev should lead back to Topic 19
    const prevFrom20 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevFrom20).toBeVisible();
    await expect(prevFrom20).toContainText('UX Blueprint');
    await prevFrom20.click();

    // Back on Topic 19
    await expect(page).toHaveURL(/\/learn\/ux-blueprint/);
  });

  test('Group 07: Renders all lesson and structured activity sections for UI/UX planning topics', async ({ page }) => {
    // 1. Topic 18 (ui-ux-roles-navigation)
    await page.goto('/learn/ui-ux-roles-navigation');
    const topic18Activities = page.locator('.learning-activities');
    await expect(topic18Activities).toBeVisible();

    // Objectives
    await expect(topic18Activities.getByRole('heading', { name: /أهداف التعل/ })).toBeVisible();
    await expect(topic18Activities).toContainText('تحويل أدوار PRD وصلاحياتهم');
    await expect(topic18Activities).toContainText('صياغة متطلبات تجربة المستخدم');

    // Sections
    await expect(topic18Activities.getByRole('heading', { name: 'المدخل: دور ومهمة وصلاحية' })).toBeVisible();
    await expect(topic18Activities.getByRole('heading', { name: 'المعلومات والتنقل' })).toBeVisible();
    await expect(topic18Activities.getByRole('heading', { name: 'مصفوفة قبل رسم الواجهة' })).toBeVisible();

    // Practical steps, worked examples, video candidate, quiz and rubric
    await expect(topic18Activities.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(topic18Activities.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(topic18Activities).toContainText('BorrowHub اختياري: طالب ومسؤول معمل');
    await expect(topic18Activities.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
    await expect(topic18Activities).toContainText('Information Architecture: 3 Key Models');
    await expect(topic18Activities.locator('section[aria-labelledby*="-videos"]')).toContainText('مرشح');
    await expect(topic18Activities.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' })).toBeVisible();
    await expect(topic18Activities.getByRole('heading', { name: 'مراجعة ذاتية لمخرجات التمرين' })).toBeVisible();

    // 2. Topic 19 (ux-blueprint)
    await page.goto('/learn/ux-blueprint');
    const topic19Activities = page.locator('.learning-activities');
    await expect(topic19Activities).toBeVisible();
    await expect(topic19Activities.getByRole('heading', { name: /أهداف التعل/ })).toBeVisible();
    await expect(topic19Activities).toContainText('توثيق الرحلات وخريطة الموقع');
    await expect(topic19Activities.getByRole('heading', { name: 'المدخل: مهمة ونقاط تلامس' })).toBeVisible();
    await expect(topic19Activities.getByRole('heading', { name: 'حالات الواجهة والفحوص العابرة' })).toBeVisible();
    await expect(topic19Activities.getByRole('heading', { name: 'التحقق' })).toBeVisible();
    await expect(topic19Activities).toContainText('Service Blueprinting FAQ');

    // 3. Topic 20 (screen-inventory)
    await page.goto('/learn/screen-inventory');
    const topic20Activities = page.locator('.learning-activities');
    await expect(topic20Activities).toBeVisible();
    await expect(topic20Activities.getByRole('heading', { name: /أهداف التعل/ })).toBeVisible();
    await expect(topic20Activities).toContainText('جرد شاشات النطاق');
    await expect(topic20Activities.getByRole('heading', { name: 'المدخل: رحلة ومتطلبات' })).toBeVisible();
    await expect(topic20Activities.getByRole('heading', { name: 'حقول الجرد' })).toBeVisible();
    await expect(topic20Activities.getByRole('heading', { name: 'تغطية من وإلى المتطلب' })).toBeVisible();
    await expect(topic20Activities).toContainText('Wireflows 101');
  });

  test('Group 07: Practical steps and expected outputs are present and copyable across all topics', async ({ page }) => {
    // 1. Topic 18
    await page.goto('/learn/ui-ux-roles-navigation');
    const steps18 = page.locator('.learning-activities section[aria-labelledby*="-steps"] ol > li');
    await expect(steps18).toHaveCount(2);
    await expect(steps18.nth(0)).toContainText('حوّل الأدوار والمهام المعتمدة إلى مصفوفة');
    await expect(steps18.nth(0)).toContainText('docs/UI_UX_REQUIREMENTS.md');
    await expect(steps18.nth(1)).toContainText('رتب الوجهات في نموذج تنقل');
    await expect(steps18.nth(1)).toContainText('نموذج تنقل واضح');

    // Copy PROMPT 14
    const prompt14Box = page.locator('.code-container').filter({ hasText: 'PROMPT 14 — UI/UX Grill Me' });
    const copy14Btn = prompt14Box.locator('button.copy-btn');
    await copy14Btn.click();
    await expect(copy14Btn).toHaveText(/تم النسخ/);
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('/grill-me');

    // 2. Topic 19
    await page.goto('/learn/ux-blueprint');
    const steps19 = page.locator('.learning-activities section[aria-labelledby*="-steps"] ol > li');
    await expect(steps19).toHaveCount(2);
    await expect(steps19.nth(0)).toContainText('ارسم Sitemap ورحلة MVP');
    await expect(steps19.nth(0)).toContainText('docs/UX_BLUEPRINT.md');
    await expect(steps19.nth(1)).toContainText('املأ حالات التحميل والفراغ والخطأ والنجاح');
    await expect(steps19.nth(1)).toContainText('مصفوفة بأربع حالات واجهة');

    // Copy PROMPT 15
    const prompt15Box = page.locator('.code-container').filter({ hasText: 'PROMPT 15 — UX Blueprint + Screen Inventory' });
    const copy15Btn = prompt15Box.locator('button.copy-btn');
    await copy15Btn.click();
    await expect(copy15Btn).toHaveText(/تم النسخ/);
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('docs/UX_BLUEPRINT.md');

    // 3. Topic 20
    await page.goto('/learn/screen-inventory');
    const steps20 = page.locator('.learning-activities section[aria-labelledby*="-steps"] ol > li');
    await expect(steps20).toHaveCount(2);
    await expect(steps20.nth(0)).toContainText('احصر الشاشات اللازمة لرحلة MVP');
    await expect(steps20.nth(0)).toContainText('docs/SCREEN_INVENTORY.md');
    await expect(steps20.nth(1)).toContainText('اربط معرفات المتطلبات بالشاشات');
    await expect(steps20.nth(1)).toContainText('مصفوفة تتبع متطلبات إلى شاشات');

    // Copy Screen Inventory template
    const templateBox = page.locator('.code-container').filter({ hasText: 'MARKDOWN — نموذج هيكل docs/SCREEN_INVENTORY.md' });
    const copyTemplateBtn = templateBox.locator('button.copy-btn');
    await copyTemplateBtn.click();
    await expect(copyTemplateBtn).toHaveText(/تم النسخ/);
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('# وثيقة جرد الشاشات (Screen Inventory)');
  });

  test('Group 07: Objective quiz grades responses and provides explanatory feedback with retry', async ({ page }) => {
    await page.goto('/learn/ui-ux-roles-navigation');
    const quiz = page.locator('.learning-activities section[aria-labelledby*="-quiz"]');
    await expect(quiz).toBeVisible();

    const q1 = quiz.locator('fieldset').filter({ hasText: 'كيف تحدد من يرى إجراء مراجعة الطلب' });
    const q2 = quiz.locator('fieldset').filter({ hasText: 'اقترح فريق شاشة جديدة للتوصيات' });

    // Answer Q1 correctly (matches PRD permissions)
    await q1.locator('label').filter({ hasText: 'تطابقه مع صلاحيات الدور المعتمدة في PRD' }).locator('input[type="radio"]').check();

    // Answer Q2 incorrectly (add automatically)
    await q2.locator('label').filter({ hasText: 'إضافتها تلقائياً لأنها تحسن التجربة' }).locator('input[type="radio"]').check();

    await quiz.getByRole('button', { name: 'إرسال الإجابات' }).click();

    // Score banner
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Feedback for Q1 (correct)
    await expect(q1.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1.getByRole('status')).toContainText('الواجهة تعرض الصلاحية المقررة');

    // Feedback for Q2 (incorrect)
    await expect(q2.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2.getByRole('status')).toContainText('التصميم يلتزم بالنطاق المعتمد');

    // Retry resets the form
    const retryBtn = quiz.getByRole('button', { name: 'إعادة المحاولة' });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).not.toBeVisible();
  });

  test('Group 07: Application checklist and practical rubric can be edited, reversed, and persist across reload', async ({ page }) => {
    await page.goto('/learn/ui-ux-roles-navigation');

    const rubric = page.locator('.learning-activities section[aria-labelledby*="-rubric"]');
    await expect(rubric).toBeVisible();

    const permCriterion = rubric.locator('fieldset').filter({ hasText: 'صلاحيات قابلة للتتبع' });
    const navCriterion = rubric.locator('fieldset').filter({ hasText: 'تنقل يطابق المهام' });

    // Select rubric ratings
    await permCriterion.locator('select').selectOption('ready-for-review');
    await navCriterion.locator('select').selectOption('in-progress');

    // Check sidebar checklist item
    const checklistItem = page.getByRole('complementary').getByRole('checkbox').first();
    await checklistItem.check();
    await expect(checklistItem).toBeChecked();

    // Reload page to verify persistence
    await page.reload();

    const permReloaded = page.locator('.learning-activities section[aria-labelledby*="-rubric"]').locator('fieldset').filter({ hasText: 'صلاحيات قابلة للتتبع' });
    const navReloaded = page.locator('.learning-activities section[aria-labelledby*="-rubric"]').locator('fieldset').filter({ hasText: 'تنقل يطابق المهام' });
    await expect(permReloaded.locator('select')).toHaveValue('ready-for-review');
    await expect(navReloaded.locator('select')).toHaveValue('in-progress');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();

    // Reverse selections
    await permReloaded.locator('select').selectOption('');
    await navReloaded.locator('select').selectOption('');
    await page.getByRole('complementary').getByRole('checkbox').first().uncheck();
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();

    // Reload again to verify reversed state persists
    await page.reload();
    const permAfterReverse = page.locator('.learning-activities section[aria-labelledby*="-rubric"]').locator('fieldset').filter({ hasText: 'صلاحيات قابلة للتتبع' });
    const navAfterReverse = page.locator('.learning-activities section[aria-labelledby*="-rubric"]').locator('fieldset').filter({ hasText: 'تنقل يطابق المهام' });
    await expect(permAfterReverse.locator('select')).toHaveValue('');
    await expect(navAfterReverse.locator('select')).toHaveValue('');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
  });

  test('Group 07: RTL prose and LTR technical content render with proper directionality and styling', async ({ page }) => {
    for (const slug of ['ui-ux-roles-navigation', 'ux-blueprint', 'screen-inventory']) {
      await page.goto(`/learn/${slug}`);

      // Document root has dir="rtl"
      expect(await page.locator('html').getAttribute('dir')).toBe('rtl');

      // Main content area has dir="rtl" or inherits RTL
      const article = page.locator('article.content-area').first();
      await expect(article).toBeVisible();
      expect(await article.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');

      // Code containers have dir="ltr"
      const ltrContainers = page.locator('.code-container[dir="ltr"]');
      if (await ltrContainers.count() > 0) {
        expect(await ltrContainers.first().evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');
      }

      // Output badges with technical filenames have dir="ltr"
      const outputBadges = page.locator('header code[dir="ltr"]');
      if (await outputBadges.count() > 0) {
        expect(await outputBadges.first().evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');
      }
    }
  });

  test('Group 07: Mobile viewport at 390px has no horizontal overflow in reader and modal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // 1. Verify full reader pages have no horizontal overflow
    for (const slug of ['ui-ux-roles-navigation', 'ux-blueprint', 'screen-inventory']) {
      await page.goto(`/learn/${slug}`);
      await expect(page.locator('h1')).toBeVisible();
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(hasOverflow).toBe(false);
    }

    // 2. Verify quick preview modals on homepage have no horizontal overflow
    await page.goto('/');
    const topics = [
      'تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل',
      'مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة',
      'جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات',
    ];

    for (const title of topics) {
      const card = page.locator('article.topic-card').filter({ hasText: title }).first();
      await card.getByRole('button', { name: 'معاينة سريعة' }).click();

      const modal = page.locator('.modal-container-box');
      await expect(modal).toBeVisible();

      const modalOverflow = await modal.evaluate((el) => el.scrollWidth > el.clientWidth);
      expect(modalOverflow).toBe(false);

      await page.keyboard.press('Escape');
      await expect(modal).toBeHidden();
    }
  });
});
