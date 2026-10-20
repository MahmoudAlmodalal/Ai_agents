import { expect, test } from '@playwright/test';

test('reading remains usable when speech synthesis is unavailable', async ({ page }) => {
  await page.addInitScript(() => { Reflect.deleteProperty(window, 'speechSynthesis'); });
  await page.goto('/learn/project-idea-mvp');
  expect(await page.evaluate(() => 'speechSynthesis' in window)).toBe(false);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع');
  await expect(page.getByRole('button', { name: 'الاستماع للمقدمة', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /الموضوع التالي/ })).toHaveAttribute('href', '/learn/discovery-grill-me');
  await page.getByRole('complementary').getByRole('checkbox').first().check();
  await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();
});

for (const width of [390, 768, 1024, 1366, 1440]) {
  test(`landing-to-reader journey applies approved Ai_agents identity at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // 1. Landing page under Ai_agents identity
    await page.goto('/');
    await expect(page).toHaveTitle(/Ai_agents/);
    expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `landing overflow at ${width}`).toBe(true);

    // Navigation branding & logo
    const brandLink = page.getByRole('banner').getByRole('link', { name: 'Ai_agents — الصفحة الرئيسية' });
    await expect(brandLink).toBeVisible();
    const logoImg = brandLink.locator('img');
    await expect(logoImg).toHaveAttribute('src', /\/ai-agents-mark\.svg/);

    // Hero outcomes and hierarchy
    const heroTitle = page.locator('#home-hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('من فكرة أولية إلى منتج برمجي');
    await expect(page.locator('.home-hero-description')).toBeVisible();

    // Start action and optional preview buttons
    const startLink = page.getByRole('link', { name: 'ابدأ بالموضوع الأول' });
    await expect(startLink).toHaveAttribute('href', '/learn/project-idea-mvp');
    const previewBtn = page.locator('.home-hero-actions').getByRole('button', { name: 'معاينة سريعة' });
    await expect(previewBtn).toBeVisible();

    // On mobile (390px), ensure touch targets meet minimum 44px
    if (width === 390) {
      const startBox = await startLink.boundingBox();
      expect(startBox).not.toBeNull();
      expect(startBox!.height).toBeGreaterThanOrEqual(44);
    }

    // Hero lesson card real Topic 01 content & LTR code output
    const lessonCard = page.locator('.home-lesson-card');
    await expect(lessonCard).toContainText('اختيار فكرة المشروع وتحديد MVP');
    const outputCode = lessonCard.locator('code[dir="ltr"]');
    await expect(outputCode).toContainText('docs/PROJECT_CONTEXT.md');

    // Footer approved identity slogan and name
    const footer = page.locator('footer[role="contentinfo"]');
    await expect(footer).toContainText('فكّر بوضوح. ابنِ بثقة.');
    await expect(footer).toContainText('Ai_agents');

    // 2. Direct full reading transition
    await startLink.click();
    await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(page.locator('.learning-reader-header')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `reader overflow at ${width}`).toBe(true);

    // Preserved reader tools
    const toolsRegion = page.locator('[aria-label="أدوات قراءة الموضوع"]');
    await expect(toolsRegion).toBeVisible();
    await expect(toolsRegion.getByRole('button', { name: /حفظ في المفضلة|إزالة من المفضلة/ })).toBeVisible();
    await expect(toolsRegion.getByRole('button', { name: 'طباعة كملف PDF' })).toBeVisible();
    await expect(toolsRegion.getByRole('button', { name: /حفظ للمطالعة بدون إنترنت|محفوظ بدون إنترنت/ })).toBeVisible();

    // Preserved navigation & checklist
    const topicNav = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(topicNav.getByRole('link', { name: /الموضوع التالي/ })).toHaveAttribute('href', '/learn/discovery-grill-me');
    await expect(page.getByRole('complementary')).toContainText('قائمة تحقق التطبيق');

    // Keyboard focus on reader tool
    const bookmarkBtn = toolsRegion.getByRole('button', { name: /حفظ في المفضلة|إزالة من المفضلة/ });
    await bookmarkBtn.focus();
    await expect(bookmarkBtn).toBeFocused();

    if (width === 390) {
      await page.screenshot({ path: 'test-results/landing-reader-journey-390.png', fullPage: true });
    }
  });

  test(`entry and reference pages support reading and keyboard links at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['/start', '/about', '/borrowhub', '/tools', '/templates', '/glossary', '/faq']) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflow at ${width}`).toBe(true);
      const link = page.getByRole('main').getByRole('link').first();
      await link.focus();
      await expect(link).toBeFocused();
      expect(await link.getAttribute('href')).not.toBe('#');
      if (width === 390) await page.screenshot({ path: `test-results/reference-${route.slice(1)}-390.png`, fullPage: true });
    }
  });
}

test('theme toggle switches cleanly between warm porcelain light theme and deep ink dark theme', async ({ page }) => {
  await page.goto('/');
  const themeBtn = page.getByRole('button', { name: 'تبديل النمط' }).first();
  await expect(themeBtn).toBeVisible();

  // Switch to dark theme
  await themeBtn.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(16, 22, 19)'); // #101613

  // Switch back to light theme
  await themeBtn.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(245, 245, 240)'); // #f5f5f0
});
