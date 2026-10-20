import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 08: Google Stitch, Design System, and Interactive Prototype', () => {

  test('Topic 21 (Google Stitch): Starts with one reference screen before generating other screens', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');

    // Page metadata and headers
    await expect(page.locator('h1')).toContainText('تصميم الشاشة المرجعية في Google Stitch');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/STITCH_MASTER_PROMPT.md');
    await expect(header).toContainText('الشاشة المرجعية المعتمدة في Google Stitch');

    // Verifies directionality: RTL root layout
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Core rule: Starts with ONE reference screen first, no bulk generation
    const content = page.locator('article').first();
    await expect(content).toContainText('قاعدة الشاشة المرجعية الواحدة');
    await expect(content).toContainText('ابدأ بشاشة مرجعية تمثيلية واحدة فقط');
    await expect(content).toContainText('منع الانجراف البصري');

    // Embedded PROMPT 16 (Master Prompt Generator)
    const prompt16Block = content.locator('.code-container').filter({ hasText: 'PROMPT 16' });
    await expect(prompt16Block).toBeVisible();
    await expect(prompt16Block).toHaveAttribute('dir', 'ltr');
    const prompt16Text = await prompt16Block.locator('code').innerText();
    expect(prompt16Text).toContain('Act as a Google Stitch Prompt Engineer');
    expect(prompt16Text).toContain('produce ONE representative MVP screen first');
    expect(prompt16Text).toContain('Do not generate all screens at once');
    expect(prompt16Text).toContain('Save docs/STITCH_MASTER_PROMPT.md');

    // Copy button on PROMPT 16
    const copyBtn16 = prompt16Block.locator('button.copy-btn');
    await expect(copyBtn16).toBeVisible();

    // Embedded PROMPT 19 (Single Screen Refinement)
    const prompt19Block = content.locator('.code-container').filter({ hasText: 'PROMPT 19' });
    await expect(prompt19Block).toBeVisible();
    const prompt19Text = await prompt19Block.locator('code').innerText();
    expect(prompt19Text).toContain('Improve ONLY the selected screen');
    expect(prompt19Text).toContain('Specific problems to correct');
    expect(prompt19Text).toContain('Do not redesign unrelated screens or add features');

    // Visual structural diagram (BorrowHub wireframe SVG)
    const wireframeSvg = page.locator('.diagram-box svg');
    await expect(wireframeSvg).toBeVisible();

    // External tool links and availability status (no fake href="#")
    const stitchLink = page.locator('a[href="https://stitch.withgoogle.com/"]');
    await expect(stitchLink).toBeVisible();
    const codelabLink = page.locator('a[href*="codelabs.developers.google.com"]');
    await expect(codelabLink).toBeVisible();

    // Zero broken anchor links in article
    const brokenLinks = await page.locator('article').first().locator('a[href="#"]').count();
    expect(brokenLinks).toBe(0);

    // Practical steps and checklist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();

    // Next navigation leads to Topic 22 (design-system-rules)
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/design-system-rules');
  });

  test('Topic 22 (Design System): Explains design system rules and applies to separate screen prompts without code', async ({ page }) => {
    await page.goto('/learn/design-system-rules');

    // Title and headers
    await expect(page.locator('h1')).toContainText('قواعد نظام التصميم وبرومبتات الشاشات المنفصلة');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/STITCH_SCREEN_PROMPTS.md');

    // Optional design examples, applicable UI states, and target-appropriate accessibility checks
    const content = page.locator('article').first();
    await expect(content).toContainText('قاعدة الألوان 60-30-10');
    await expect(content).toContainText('الأمثلة التالية وسائل اختيارية للنقاش، وليست قواعد إلزامية لكل واجهة');
    await expect(content).toContainText('قاعدة 60-30-10 اقتراح بصري اختياري');
    await expect(content).toContainText('مقياس التايبوجرافي المتزن');
    await expect(content).toContainText('شبكة المسافات القياسية (8px Grid)');
    await expect(content).toContainText('يمكن تجربة شبكة 8px أو مقياس آخر');
    await expect(content).toContainText('حالات واجهة شائعة تُراجع عند انطباقها (UI States to Consider)');
    await expect(content).toContainText('أظهر رسالة أو مساراً مناسباً فقط إذا حددت المتطلبات قاعدة الصلاحية والسلوك');
    await expect(content).toContainText('44×44 CSS px قيمة إرشادية شائعة للراحة وليست شرطاً عاماً من WCAG AA لكل عنصر');
    await expect(content).toContainText('4.5:1 للنص العادي');
    await expect(content).toContainText('RTL First');

    // Embedded PROMPT 17 (Stitch Design System)
    const prompt17Block = content.locator('.code-container').filter({ hasText: 'PROMPT 17' });
    await expect(prompt17Block).toBeVisible();
    const prompt17Text = await prompt17Block.locator('code').innerText();
    expect(prompt17Text).toContain('Act as a Senior Design System Architect');
    expect(prompt17Text).toContain('Using my approved brand and the representative Stitch screen');
    expect(prompt17Text).toContain('define colors, type scale, spacing, radii, shadows');
    expect(prompt17Text).toContain('Do not invent a different brand');

    // One prompt per screen rule & PROMPT 18
    await expect(content).toContainText('برومبت منفصل لكل شاشة');
    const prompt18Block = content.locator('.code-container').filter({ hasText: 'PROMPT 18' });
    await expect(prompt18Block).toBeVisible();
    const prompt18Text = await prompt18Block.locator('code').innerText();
    expect(prompt18Text).toContain('Act as a Senior Google Stitch Prompt Engineer');
    expect(prompt18Text).toContain('Create a COMPLETE, individually copyable Stitch prompt for EVERY MVP screen');
    expect(prompt18Text).toContain('Sort screens in user-flow order');
    expect(prompt18Text).toContain('Save docs/STITCH_SCREEN_PROMPTS.md');
    expect(prompt18Text).toContain('Do not generate frontend code');

    // Explicit warning against generating frontend code at this stage
    await expect(content).toContainText('منع كتابة أو توليد الكود في هذه المرحلة');

    // Navigation links (Prev -> 21, Next -> 23)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/stitch-reference-screen');
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toHaveAttribute('href', '/learn/interactive-prototype');
  });

  test('Topic 23 (Prototype): Validates journeys and states instead of showing a fake demo button', async ({ page }) => {
    await page.goto('/learn/interactive-prototype');

    // Title and headers
    await expect(page.locator('h1')).toContainText('النموذج التفاعلي (Prototype) والتحقق من الرحلات');
    const header = page.locator('header.rounded-3xl');
    await expect(header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(header).toContainText('docs/PROTOTYPE_JOURNEYS_AUDIT.md');

    // Rejection of fake demo button antipattern
    const content = page.locator('article').first();
    await expect(content).toContainText('فحص سلوكي صارم بدل «زر التجربة الوهمي»');
    await expect(content).not.toHaveText('زر تجربة وهمي يعمل كرابط');

    // Journey verification matrix (Happy path, borrow limit, out of stock, empty search, role permission)
    await expect(content).toContainText('مسار النجاح الكامل (Happy Path)');
    await expect(content).toContainText('حظر تجاوز الحد الأقصى (Limit Exceeded)');
    await expect(content).toContainText('المعدة غير متوفرة (Out of Stock)');
    await expect(content).toContainText('الحالة الفارغة للبحث (Empty Search)');
    await expect(content).toContainText('صلاحيات الأدوار (Role Permission)');
    await expect(content).toContainText('سلوك التراجع (Back / Cancel)');

    // Embedded PROMPT 20 (Stitch Prototype)
    const prompt20Block = content.locator('.code-container').filter({ hasText: 'PROMPT 20' });
    await expect(prompt20Block).toBeVisible();
    const prompt20Text = await prompt20Block.locator('code').innerText();
    expect(prompt20Text).toContain('Create or refine the interactive prototype by connecting existing screens');
    expect(prompt20Text).toContain('For each transition define origin, trigger, destination, back/cancel behavior');
    expect(prompt20Text).toContain('Test main user journeys. Report missing or disconnected screens');

    // Embedded PROMPT 21 (Visual UX Audit)
    const prompt21Block = content.locator('.code-container').filter({ hasText: 'PROMPT 21' });
    await expect(prompt21Block).toBeVisible();
    const prompt21Text = await prompt21Block.locator('code').innerText();
    expect(prompt21Text).toContain('Act as a Senior UX Auditor');
    expect(prompt21Text).toContain('Rank issues Critical/Major/Minor');

    // Output deliverable
    await expect(content).toContainText('docs/PROTOTYPE_JOURNEYS_AUDIT.md');

    // Prev navigation leads to Topic 22
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveAttribute('href', '/learn/design-system-rules');
  });

  test('Homepage displays topics 21, 22, 23 with working detail modal and keyboard escape', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('article.topic-card');
    const topic21Card = cards.filter({ hasText: 'تصميم الشاشة المرجعية في Google Stitch' });
    const topic22Card = cards.filter({ hasText: 'قواعد نظام التصميم وبرومبتات الشاشات المنفصلة' });
    const topic23Card = cards.filter({ hasText: 'النموذج التفاعلي (Prototype) والتحقق من الرحلات' });

    await expect(topic21Card).toBeVisible();
    await expect(topic22Card).toBeVisible();
    await expect(topic23Card).toBeVisible();

    // Open detail modal for Topic 21
    await topic21Card.getByRole('button', { name: 'معاينة سريعة' }).click();
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('تصميم الشاشة المرجعية في Google Stitch');
    await expect(modal).toContainText('docs/STITCH_MASTER_PROMPT.md');

    // Close modal with Escape key
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('Copy button interaction copies prompt code and updates button label', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');

    const copyBtn = page.locator('.code-container button.copy-btn').first();
    await expect(copyBtn).toBeVisible();
    await expect(copyBtn).toContainText('نسخ البرومبت');

    // Grant clipboard permissions and click copy
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await copyBtn.click();

    // Button label should show confirmation
    await expect(copyBtn).toContainText('تم النسخ');
  });

  test('Topics 21, 22, 23 render structured learning activity sections', async ({ page }) => {
    // Topic 21: stitch-reference-screen
    await page.goto('/learn/stitch-reference-screen');
    const act21 = page.locator('.learning-activities');
    await expect(act21).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'المدخل: شاشة ممثلة لا كل التطبيق' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'برومبت يحافظ على الدليل' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'توثيق الحالة' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' })).toBeVisible();
    await expect(act21.getByRole('heading', { name: 'مراجعة ذاتية لمخرجات التمرين' })).toBeVisible();

    // Topic 22: design-system-rules
    await page.goto('/learn/design-system-rules');
    const act22 = page.locator('.learning-activities');
    await expect(act22).toBeVisible();
    await expect(act22.getByRole('heading', { name: 'المدخل: دليل معتمد قابل للفحص' })).toBeVisible();
    await expect(act22.getByRole('heading', { name: 'نظام تصميم مصدره واضح' })).toBeVisible();
    await expect(act22.getByRole('heading', { name: 'برومبتات الشاشات' })).toBeVisible();
    await expect(act22.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(act22.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(act22.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();

    // Topic 23: interactive-prototype
    await page.goto('/learn/interactive-prototype');
    const act23 = page.locator('.learning-activities');
    await expect(act23).toBeVisible();
    await expect(act23.getByRole('heading', { name: 'المدخل: شاشات وقرار تفاعل' })).toBeVisible();
    await expect(act23.getByRole('heading', { name: 'الروابط والأزرار' })).toBeVisible();
    await expect(act23.getByRole('heading', { name: 'تدقيق يحدد حدوده' })).toBeVisible();
    await expect(act23.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
    await expect(act23.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
    await expect(act23.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
  });

  test('Practical steps and expected outputs are present and copyable across Group 08', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Topic 21 steps
    await page.goto('/learn/stitch-reference-screen');
    const steps21 = page.locator('.learning-activities section[aria-labelledby*="-steps"] ol > li');
    await expect(steps21).toHaveCount(2);
    await expect(steps21.nth(0)).toContainText('اختر شاشة من Screen Inventory');
    await expect(steps21.nth(0)).toContainText('docs/STITCH_MASTER_PROMPT.md');
    await expect(steps21.nth(1)).toContainText('سجل نتيجة التصميم أو تعذر إنشائها');

    // Copy PROMPT 16
    const prompt16Container = page.locator('.code-container').filter({ hasText: 'PROMPT 16' });
    const copy16Btn = prompt16Container.locator('button.copy-btn');
    const code16Text = await prompt16Container.locator('code').innerText();
    await copy16Btn.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(code16Text);

    // Topic 22 steps
    await page.goto('/learn/design-system-rules');
    const steps22 = page.locator('.learning-activities section[aria-labelledby*="-steps"] ol > li');
    await expect(steps22).toHaveCount(2);
    await expect(steps22.nth(0)).toContainText('استخرج قيماً قابلة للتأكيد');
    await expect(steps22.nth(1)).toContainText('docs/STITCH_SCREEN_PROMPTS.md');

    // Copy PROMPT 18
    const prompt18Container = page.locator('.code-container').filter({ hasText: 'PROMPT 18' });
    const copy18Btn = prompt18Container.locator('button.copy-btn');
    const code18Text = await prompt18Container.locator('code').innerText();
    await copy18Btn.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(code18Text);

    // Topic 23 steps
    await page.goto('/learn/interactive-prototype');
    const steps23 = page.locator('.learning-activities section[aria-labelledby*="-steps"] ol > li');
    await expect(steps23).toHaveCount(2);
    await expect(steps23.nth(0)).toContainText('اربط شاشات المسار المعتمد في Stitch');
    await expect(steps23.nth(1)).toContainText('docs/PROTOTYPE_JOURNEYS_AUDIT.md');
  });

  test('Quiz grades responses, provides explanatory feedback, and supports retries', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');
    const quiz = page.locator('.learning-activities section[aria-labelledby*="-quiz"]');
    await expect(quiz).toBeVisible();

    const q1 = quiz.getByRole('group', { name: /لم توفر الشاشة المرجعية/ });
    const q2 = quiz.getByRole('group', { name: /لماذا تبدأ بشاشة مرجعية واحدة/ });

    // Answer Q1 correctly, Q2 incorrectly
    await q1.getByRole('radio', { name: '`UNKNOWN` مع بيان الدليل الناقص', exact: true }).check();
    await q2.getByRole('radio', { name: 'لإلغاء PRD', exact: true }).check();

    // Submit
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    // Score banner check
    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();

    // Explanations & statuses
    await expect(q1.getByRole('status')).toContainText('إجابة صحيحة');
    await expect(q1.getByRole('status')).toContainText('توثيق المجهول يمنع تحويل قرار بصري غير مسند إلى رمز تصميم رسمي');
    await expect(q2.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q2.getByRole('status')).toContainText('الشاشة المرجعية تساعد في توحيد القرارات المرئية قبل توسيعها إلى بقية النطاق');

    // Retry functionality
    const retryBtn = quiz.getByRole('button', { name: 'إعادة المحاولة', exact: true });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();

    // Submit with both correct
    await q1.getByRole('radio', { name: '`UNKNOWN` مع بيان الدليل الناقص', exact: true }).check();
    await q2.getByRole('radio', { name: 'لتثبيت قرار بصري ممثل قبل توليد بقية الشاشات', exact: true }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
  });

  test('Checklist and rubric can be edited, reversed, and survive reload', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');

    // Select rubric criteria options
    const activities = page.locator('.learning-activities');
    const scopeCriterion = activities.getByRole('group', { name: 'ارتباط البرومبت بمهمة' });
    const evidenceCriterion = activities.getByRole('group', { name: 'توثيق الدليل والحالة' });

    await scopeCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await evidenceCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    // Check sidebar checklist item
    const checklistItem = page.getByRole('complementary').getByRole('checkbox').first();
    await checklistItem.check();
    await expect(checklistItem).toBeChecked();

    // Reload and verify persistence
    await page.reload();
    await expect(scopeCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(evidenceCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();

    // Reverse selections
    await scopeCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await evidenceCriterion.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await page.getByRole('complementary').getByRole('checkbox').first().uncheck();
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();

    // Reload and verify reversal persisted
    await page.reload();
    await expect(scopeCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(evidenceCriterion.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
  });

  test('RTL prose and LTR technical text render with proper directional attributes and computed styles', async ({ page }) => {
    await page.goto('/learn/stitch-reference-screen');

    // Document root has dir="rtl"
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');

    // Article section has RTL text direction
    const section = page.locator('#topic-21-stitch');
    await expect(section).toBeVisible();

    // Arabic paragraphs computed direction is rtl
    const p = section.locator('p').first();
    expect(await p.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');

    // LTR code container
    const ltrContainer = section.locator('.code-container[dir="ltr"]').first();
    await expect(ltrContainer).toBeVisible();
    expect(await ltrContainer.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');
  });

  test('Mobile viewport at 390px has no horizontal overflow in full reader and modal preview', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Full reader checks for all 3 topics
    for (const slug of ['stitch-reference-screen', 'design-system-rules', 'interactive-prototype']) {
      await page.goto(`/learn/${slug}`);
      await expect(page.locator('h1')).toBeVisible();
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      expect(hasOverflow).toBe(false);
    }

    // Modal quick previews on homepage
    await page.goto('/');
    const cards = page.locator('article.topic-card');

    const topicsToTest = [
      'تصميم الشاشة المرجعية في Google Stitch',
      'قواعد نظام التصميم وبرومبتات الشاشات المنفصلة',
      'النموذج التفاعلي (Prototype) والتحقق من الرحلات',
    ];

    for (const title of topicsToTest) {
      const card = cards.filter({ hasText: title }).first();
      await card.getByRole('button', { name: 'معاينة سريعة' }).click();
      const modal = page.locator('.modal-container-box');
      await expect(modal).toBeVisible();

      const modalOverflows = await modal.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
      expect(modalOverflows).toBe(false);

      await page.keyboard.press('Escape');
      await expect(modal).toBeHidden();
    }
  });
});
