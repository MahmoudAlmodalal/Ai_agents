import { test, expect } from '@playwright/test';

test('reference templates expose fourteen honest availability states and copyable fields', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/templates');
  await expect(page.getByRole('heading', { name: 'القوالب المرجعية الأربعة عشر' })).toBeVisible();
  await expect(page.locator('article')).toHaveCount(14);
  await expect(page.getByText('غير متاح للتنزيل', { exact: true })).toHaveCount(14);
  await expect(page.locator('a[download]')).toHaveCount(0);
  const sequence = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Sequence Template', exact: true }) });
  await sequence.getByRole('button', { name: 'نسخ الحقول المرجعية' }).click();
  await expect(page.getByRole('status')).toContainText('تم نسخ');
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('Participants + Messages + Alternatives');
  await sequence.getByRole('link', { name: 'موضوع الاستخدام' }).click();
  await expect(page).toHaveURL(/\/learn\/sequence-diagram-modeling$/, { timeout: 15000 });
});

test('tools guide delays coding setup and supports verified command copy and directory filtering', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/tools');
  await expect(page.getByRole('heading', { name: 'الأدوات — ماذا تستخدم؟ ومتى؟' })).toBeVisible();
  await expect(page.getByText('إعداد أدوات التنفيذ يبدأ عند بدء كود الفرونت')).toBeVisible();
  const next = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Next.js', exact: true }) });
  await expect(next).toContainText('المدخلات');
  await expect(next).toContainText('دورة الحياة');
  await next.getByRole('button', { name: 'نسخ الأمر' }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('npx create-next-app@latest');
  await expect(next.getByRole('link', { name: 'المصدر الرسمي' })).toHaveAttribute('href', 'https://nextjs.org/docs/app/api-reference/cli/create-next-app');
  await page.getByRole('button', { name: /إضافة VS Code/ }).click();
  const directory = page.getByRole('region', { name: 'دليل وكلاء البرمجة التكميلي' });
  await expect(directory.getByRole('heading', { name: /كلاين/ })).toBeVisible();
  await expect(directory.getByRole('heading', { name: /كلود كود/ })).toHaveCount(0);
});

test('tools guide presents sixteen tools with usage stages, review dates, pitfalls, examples, and non-color-reliant verification badges', async ({ page }) => {
  await page.goto('/tools');
  const toolsSection = page.getByRole('region', { name: 'دليل أدوات المسار' });
  const articles = toolsSection.locator('article');
  await expect(articles).toHaveCount(16);

  const expectedTools = [
    'Grill Me',
    'Google AI Studio',
    'Git',
    'GitHub',
    'Mermaid Live',
    'PlantUML / PlantText',
    'dbdiagram.io',
    'Google Stitch',
    'Stitch MCP',
    'DESIGN.md',
    'Node.js + npm',
    'Next.js',
    'UI/UX Pro Max',
    'GitHub Spec Kit',
    'Python 3.11 + uv',
    'Antigravity CLI / IDE',
  ];

  for (let i = 0; i < expectedTools.length; i++) {
    const card = articles.nth(i);
    await expect(card.getByRole('heading', { level: 2 })).toHaveText(expectedTools[i]);
    await expect(card).toContainText('مرحلة الاستخدام');
    await expect(card).toContainText('تاريخ مراجعة المصدر');
    await expect(card).toContainText('أشهر عقبة عملية');
    await expect(card).toContainText('مثال تطبيقي');
    await expect(card).toContainText('متى تستخدمها');
    await expect(card).toContainText('المدخلات');
    await expect(card).toContainText('المخرجات');
    await expect(card).toContainText('دورة الحياة');
    await expect(card.getByRole('link', { name: 'المصدر الرسمي' })).toBeVisible();
    await expect(card.getByRole('link', { name: 'موضوع الاستخدام' })).toBeVisible();

    const badge = card.locator('[data-verification-status]');
    await expect(badge).toBeVisible();
    const statusText = await badge.innerText();
    const validStatuses = ['موثّق من مصدر رسمي', 'اختياري', 'لم يُختبر التثبيت'];
    expect(validStatuses.some((s) => statusText.includes(s))).toBe(true);
    expect(/^[✓◇⚠]/.test(statusText.trim())).toBe(true);
  }
});

test('tools guide displays seven-stage decision table, filters cards by row or chip, and restores full count', async ({ page }) => {
  await page.goto('/tools');

  // Verify decision table is visible before the cards
  const tableSection = page.getByRole('region', { name: 'جدول قرار الأداة — أي أداة في أي مرحلة' });
  await expect(tableSection).toBeVisible();

  const table = tableSection.getByRole('table');
  await expect(table).toBeVisible();

  // Verify headers with scope="col"
  await expect(table.locator('th[scope="col"]')).toHaveText([
    'مرحلة الاستخدام',
    'متى تحتاجها',
    'الأدوات',
    'شرط تخطيها',
  ]);

  // Verify 7 rows with scope="row" in the required order
  const stageRows = table.locator('tbody tr');
  await expect(stageRows).toHaveCount(7);

  const expectedStages = [
    'اكتشاف المتطلبات',
    'التوثيق وإدارة الإصدارات',
    'النمذجة والمخططات',
    'التصميم',
    'نقل التصميم إلى الكود',
    'تنفيذ الفرونت إند',
    'وكيل التنفيذ',
  ];

  for (let i = 0; i < expectedStages.length; i++) {
    const row = stageRows.nth(i);
    await expect(row.locator('th[scope="row"]')).toContainText(expectedStages[i]);
    const cells = row.locator('td');
    await expect(cells).toHaveCount(3);
    await expect(cells.nth(0)).not.toBeEmpty();
    await expect(cells.nth(1)).not.toBeEmpty();
    await expect(cells.nth(2)).not.toBeEmpty();
  }

  const toolsSection = page.getByRole('region', { name: 'دليل أدوات المسار' });
  const articles = toolsSection.locator('article');
  await expect(articles).toHaveCount(16);

  // Filter by clicking a table row (النمذجة والمخططات -> 3 tools)
  const modelingRow = stageRows.filter({ hasText: 'النمذجة والمخططات' });
  await modelingRow.click();
  await expect(articles).toHaveCount(3);
  await expect(page.getByText('عدّاد الأدوات المعروضة: 3 من 16 أداة')).toBeVisible();

  // Return to all stages via «كل المراحل» button
  await page.getByRole('button', { name: /كل المراحل/ }).first().click();
  await expect(articles).toHaveCount(16);
  await expect(page.getByText('عدّاد الأدوات المعروضة: 16 من 16 أداة')).toBeVisible();

  // Filter by stage chip (التصميم -> 1 tool: Google Stitch)
  await page.getByRole('button', { name: /التصميم \(\d+\)/ }).click();
  await expect(articles).toHaveCount(1);
  await expect(articles.first().getByRole('heading', { level: 2 })).toHaveText('Google Stitch');
  await expect(page.getByText('عدّاد الأدوات المعروضة: 1 من 16 أداة')).toBeVisible();

  // Filter by another chip (وكيل التنفيذ -> 1 tool: Antigravity CLI / IDE)
  await page.getByRole('button', { name: /وكيل التنفيذ \(\d+\)/ }).click();
  await expect(articles).toHaveCount(1);
  await expect(articles.first().getByRole('heading', { level: 2 })).toHaveText('Antigravity CLI / IDE');

  // Filter by row button for اكتشاف المتطلبات -> 2 tools
  const discoveryRow = stageRows.filter({ hasText: 'اكتشاف المتطلبات' });
  await discoveryRow.getByRole('button', { name: 'اكتشاف المتطلبات' }).click();
  await expect(articles).toHaveCount(2);

  // Return to all stages via reset control
  await page.getByRole('button', { name: /عرض كل المراحل/ }).click();
  await expect(articles).toHaveCount(16);

  // Responsive check for 390px viewport width: table stays in horizontally scrollable container without page overflow
  await page.setViewportSize({ width: 390, height: 844 });
  const container = tableSection.locator('.table-container');
  await expect(container).toBeVisible();
  const isContainerScrollable = await container.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(isContainerScrollable).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('diagrams guide displays eight diagrams with core questions, decision rules, inputs, and editor links', async ({ page }) => {
  await page.goto('/diagrams');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('مختبر المخططات الثمانية');
  const articles = page.locator('article');
  await expect(articles).toHaveCount(8);
  for (const card of await articles.all()) {
    await expect(card.getByText('السؤال المحوري:', { exact: true })).toBeVisible();
    await expect(card.locator('ul li')).toHaveCount(3);
    await expect(card.getByText('المدخلات المطلوبة قبل الرسم:', { exact: true })).toBeVisible();
    await expect(card.getByText('المحرر المناسب:', { exact: true })).toBeVisible();
    await expect(card.getByRole('link', { name: 'موضوع الاستخدام' })).toBeVisible();
    await expect(card.getByRole('link', { name: 'المختبر التفاعلي' })).toBeVisible();
  }
});

test('reference topic destinations resolve and reference pages fit phone and desktop widths', async ({ page, request }) => {
  for (const route of ['/templates', '/tools', '/diagrams']) {
    await page.goto(route);
    const destinations = await page.getByRole('link', { name: 'موضوع الاستخدام', exact: true }).evaluateAll((links) => links.map((link) => link.getAttribute('href')!));
    for (const destination of new Set(destinations)) {
      const response = await request.get(destination);
      expect(response.status(), destination).toBe(200);
    }
    for (const width of [390, 768, 1024, 1366, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
});

test('Tailwind lesson prepares versioned token mapping before Next project bootstrap', async ({ page }) => {
  await page.goto('/learn/tailwind-css-responsive');
  await expect(page.locator('article').first()).toContainText('Tailwind v4');
  await expect(page.locator('article').first()).toContainText('@theme');
  await expect(page.locator('article').first()).toContainText('الموضوع 33');
  await expect(page.locator('article').first()).toContainText('قيم توضيحية');
  await expect(page.locator('header.rounded-3xl')).toContainText('src/app/globals.css');
  await page.goto('/learn/typescript-types');
  await expect(page.locator('article').first()).toContainText("'student' | 'staff' | 'admin'");
  await expect(page.locator('article').first()).not.toContainText("'faculty'");
});

test('ticket 84: unified search filters both tools and agents, normalizes Arabic, shows counters and empty states, and exposes agent details under editorial caveat', async ({ page }) => {
  await page.goto('/tools');

  // Verify exactly one search input on the page
  const searchInputs = page.locator('input[type="search"]');
  await expect(searchInputs).toHaveCount(1);
  const searchInput = searchInputs.first();

  const toolsSection = page.getByRole('region', { name: 'دليل أدوات المسار' });
  const directorySection = page.getByRole('region', { name: 'دليل وكلاء البرمجة التكميلي' });

  // Baseline counts before search
  await expect(toolsSection.locator('article')).toHaveCount(16);
  await expect(toolsSection.getByText('عدّاد الأدوات المعروضة: 16 من 16 أداة')).toBeVisible();
  await expect(directorySection.locator('article')).toHaveCount(13);
  await expect(directorySection.getByText(/عدّاد وكلاء البرمجة المعروضين: 13 من 13 وكيل/)).toBeVisible();

  // 1. Unified search: Search "Stitch" - matches tools and agents mentioning Stitch
  await searchInput.fill('Stitch');
  await expect(toolsSection.locator('article')).toHaveCount(2); // Google Stitch, Stitch MCP
  await expect(toolsSection.getByText('عدّاد الأدوات المعروضة: 2 من 16 أداة')).toBeVisible();
  await expect(directorySection.locator('article')).toHaveCount(1); // Antigravity + Gemini CLI
  await expect(directorySection.getByText(/عدّاد وكلاء البرمجة المعروضين: 1 من 13 وكيل/)).toBeVisible();
  await expect(directorySection.getByRole('heading', { name: /أنتي جرافيتي/ })).toBeVisible();

  // 2. Arabic normalization: tatweel, tashkeel, hamza
  // Search with tatweel "كـلايـن" -> matches Cline
  await searchInput.fill('كـلايـن');
  await expect(toolsSection.locator('article')).toHaveCount(0);
  const toolsEmptyState = toolsSection.getByRole('status').filter({ hasText: 'لا توجد أدوات تطابق البحث الحالي' });
  await expect(toolsEmptyState).toContainText('لا توجد أدوات تطابق البحث الحالي');
  await expect(toolsEmptyState).toContainText('اقتراح الخطوة التالية');
  await expect(directorySection.locator('article')).toHaveCount(1);
  await expect(directorySection.getByRole('heading', { name: /كلاين/ })).toBeVisible();

  // Search with hamza variation "ادارة" -> matches every tool whose text normalises to it:
  // the documentation stage pair (Git, GitHub) plus the two tools that mention package management.
  await searchInput.fill('ادارة');
  await expect(toolsSection.locator('article')).toHaveCount(4);
  await expect(toolsSection.getByRole('heading', { name: 'Git', exact: true })).toBeVisible();
  await expect(toolsSection.getByRole('heading', { name: 'GitHub', exact: true })).toBeVisible();
  await expect(toolsSection.getByText('عدّاد الأدوات المعروضة: 4 من 16 أداة')).toBeVisible();

  // Search with tashkeel "مُخَطَّط" -> matches diagram tools
  await searchInput.fill('مُخَطَّط');
  await expect(toolsSection.locator('article')).toHaveCount(3); // Mermaid, PlantUML, dbdiagram

  // 3. Complete mismatch -> both sections show explicit empty state with suggested next step
  await searchInput.fill('كلمةغيرموجودة123');
  await expect(toolsSection.locator('article')).toHaveCount(0);
  await expect(toolsSection.getByText('عدّاد الأدوات المعروضة: 0 من 16 أداة')).toBeVisible();
  const toolsEmpty = toolsSection.getByRole('status').filter({ hasText: 'لا توجد أدوات تطابق البحث الحالي' });
  await expect(toolsEmpty).toContainText('لا توجد أدوات تطابق البحث الحالي');
  await expect(toolsEmpty).toContainText('اقتراح الخطوة التالية');
  await expect(toolsEmpty.getByRole('button', { name: 'مسح كلمة البحث' })).toBeVisible();

  await expect(directorySection.locator('article')).toHaveCount(0);
  await expect(directorySection.getByText(/عدّاد وكلاء البرمجة المعروضين: 0 من 13 وكيل/)).toBeVisible();
  const agentsEmpty = directorySection.getByRole('status').filter({ hasText: 'لا يوجد وكلاء يطابقون' });
  await expect(agentsEmpty).toContainText('لا يوجد وكلاء يطابقون خيارات البحث والتصفية الحالية');
  await expect(agentsEmpty).toContainText('اقتراح الخطوة التالية');
  await expect(agentsEmpty.getByRole('button', { name: 'مسح كلمة البحث' })).toBeVisible();

  // Clear search using the empty state button
  await toolsEmpty.getByRole('button', { name: 'مسح كلمة البحث' }).click();
  await expect(toolsSection.locator('article')).toHaveCount(16);
  await expect(directorySection.locator('article')).toHaveCount(13);

  // 4. Agent directory details, pricing, freeOffer, install, and review date
  const clineCard = directorySection.getByRole('article').filter({ has: page.getByRole('heading', { name: /كلاين/ }) });
  await expect(clineCard).toBeVisible();
  const details = clineCard.locator('details');
  await expect(details).toBeVisible();
  await details.locator('summary').click();
  await expect(details).toContainText('حذر تحريري');
  await expect(details).toContainText('2026-10-18');
  await expect(details).toContainText('السعر:');
  await expect(details).toContainText('الإضافة مجانية — تدفع لمزود الـ API الذي تختاره');
  await expect(details).toContainText('العرض المجاني:');
  await expect(details).toContainText('مجانية كإضافة؛ اربطها بمزود له طبقة مجانية');
  await expect(details).toContainText('التثبيت:');
  await expect(details).toContainText('ext install saoudrizwan.claude-dev');

  // Verify review date is displayed beside the agent counter
  await expect(directorySection).toContainText('تاريخ آخر مراجعة تحريرية: 18 أكتوبر 2026 (2026-10-18)');

  // 5. Category filtering combined with search
  await directorySection.getByRole('button', { name: /إضافة VS Code/ }).click();
  await searchInput.fill('كود');
  const vscodeShown = directorySection.locator('article');
  const count = await vscodeShown.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(vscodeShown.nth(i)).toContainText('إضافة VS Code');
  }
  await expect(directorySection.getByRole('heading', { name: /كلود كود/ })).toHaveCount(0);
  await expect(directorySection.getByRole('heading', { name: /أوبن كود/ })).toHaveCount(0);
});
