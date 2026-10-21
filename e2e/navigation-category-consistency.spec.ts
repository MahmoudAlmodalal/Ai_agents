import { test, expect } from '@playwright/test';

test.describe('Navigation and Category Consistency (#29/#30/#31)', () => {
  test('Navbar tagline displays Full-Stack scope and does not end at frontend', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');

    const header = page.locator('header.site-header-main');
    const brandLink = header.getByRole('link', { name: 'Ai_agents — الصفحة الرئيسية' });
    await expect(brandLink).toBeVisible();
    await expect(header).toContainText('من الفكرة إلى النشر والعرض');
    await expect(header).toContainText('Full-Stack');
    await expect(header).not.toContainText('من الفكرة إلى الواجهات');
  });

  test('Navbar topic links lead directly to canonical topics without redirecting to index', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');

    const moreButton = page.getByRole('banner').getByRole('button', { name: /عرض المزيد من أقسام Ai_agents/ });
    await moreButton.click();
    const reqLink = page.getByRole('banner').getByRole('link', { name: 'المتطلبات' });
    await expect(reqLink).toHaveAttribute('href', '/learn/discovery-grill-me');
    await reqLink.click();
    await expect(page).toHaveURL(/\/learn\/discovery-grill-me\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('استجواب الفكرة واستكشاف المتطلبات');

    await page.goto('/');
    await page.getByRole('banner').getByRole('button', { name: /عرض المزيد من أقسام Ai_agents/ }).click();
    const stitchLink = page.getByRole('banner').getByRole('link', { name: /Stitch MCP/ });
    await expect(stitchLink).toHaveAttribute('href', '/learn/stitch-mcp-integration');
    await stitchLink.click();
    await expect(page).toHaveURL(/\/learn\/stitch-mcp-integration\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Stitch MCP');
  });

  test('Filter chips derive counts dynamically from current registry and filtering semantics', async ({ page }) => {
    await page.goto('/');

    const topicCards = page.locator('article.topic-card');
    await expect(topicCards.first()).toBeVisible();
    const initialCardCount = await topicCards.count();

    // Verify chips do not show the old hardcoded 12/3 counts and match rendered cards
    expect(initialCardCount).toBeGreaterThan(12);
    const allChip = page.getByRole('button', { name: new RegExp(`^كافة الأقسام\\s*${initialCardCount}$`) });
    await expect(allChip).toBeVisible();

    const foundationsChip = page.getByRole('button', { name: /^المرحلة التأسيسية\s*\d+/ });
    await expect(foundationsChip).toBeVisible();
    const foundationsText = await foundationsChip.innerText();
    const foundationsCount = parseInt(foundationsText.replace(/\D+/g, ''), 10);
    expect(foundationsCount).toBeGreaterThan(3);

    // Verify category filter aligns chip count with rendered cards
    await foundationsChip.click();
    await expect(topicCards).toHaveCount(foundationsCount);

    // Reset to all topics
    await allChip.click();
    await expect(topicCards).toHaveCount(initialCardCount);

    // Apply content type filter and verify counts adjust according to filtering semantics
    const codeTypeButton = page.getByRole('button', { name: 'أكواد' });
    await codeTypeButton.click();

    const codeCardsCount = await topicCards.count();
    expect(codeCardsCount).toBeGreaterThan(0);
    expect(codeCardsCount).toBeLessThan(initialCardCount);

    const filteredAllChip = page.getByRole('button', { name: new RegExp(`^كافة الأقسام\\s*${codeCardsCount}$`) });
    await expect(filteredAllChip).toBeVisible();

    // Verify category chip count under code filter aligns with rendered cards
    const foundationsCodeChip = page.getByRole('button', { name: /^المرحلة التأسيسية\s*\d+/ });
    await expect(foundationsCodeChip).toBeVisible();
    const foundationsCodeText = await foundationsCodeChip.innerText();
    const foundationsCodeCount = parseInt(foundationsCodeText.replace(/\D+/g, ''), 10);
    await foundationsCodeChip.click();
    await expect(topicCards).toHaveCount(foundationsCodeCount);
  });

  test('Preserves legacy route destinations for historical links and bookmarks', async ({ page }) => {
    await page.goto('/learn/requirements-grill-me');
    await expect(page).toHaveURL(/\/#topics$/);

    await page.goto('/learn/stitch-mcp-design-md');
    await expect(page).toHaveURL(/\/#topics$/);
  });

  test('Footer contains canonical learning path and updated Full-Stack description', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer[role="contentinfo"]');
    await expect(footer).toContainText('منتجات Full-Stack قابلة للإنتاج والتسليم');
    await expect(footer).not.toContainText('وبناء واجهات احترافية قابلة للإنتاج');

    const learningPathLink = footer.getByRole('link', { name: 'مسار مواضيع التعلم' });
    await expect(learningPathLink).toHaveAttribute('href', '/learn/project-idea-mvp');
  });

  test('Searching body-only term displays matching cards and aligns category filter chip counts', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');

    // Search for a term that exists in topic HTML body but not in metadata
    const searchInput = page.locator('input[placeholder*="ابحث"]').first();
    await searchInput.fill('uuid');

    // Wait for matching topic cards to render
    const topicCards = page.locator('article.topic-card');
    await expect(topicCards.first()).toBeVisible();
    const matchedCardCount = await topicCards.count();
    expect(matchedCardCount).toBeGreaterThan(0);

    // Verify 'كافة الأقسام' chip matches the actual card count rather than claiming 0
    const allChip = page.getByRole('button', { name: new RegExp(`^كافة الأقسام\\s*${matchedCardCount}$`) });
    await expect(allChip).toBeVisible();
    expect(await topicCards.count()).toBe(matchedCardCount);
  });

  test('Favorites candidate filter derives counts exclusively from saved favorites', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');

    const topicCards = page.locator('article.topic-card');
    await expect(topicCards.first()).toBeVisible();

    // Bookmark the first two visible cards
    const firstBookmarkBtn = topicCards.nth(0).getByRole('button', { name: 'حفظ في المفضلة' });
    await firstBookmarkBtn.click();
    const secondBookmarkBtn = topicCards.nth(1).getByRole('button', { name: 'حفظ في المفضلة' });
    await secondBookmarkBtn.click();

    // Activate favorites filter via dedicated chip
    const favoritesChip = page.getByRole('button', { name: /^المفضلة\s*2/ });
    await expect(favoritesChip).toBeVisible();
    await favoritesChip.click();

    // Assert only 2 cards are shown and category chips derive from favorite candidates
    await expect(topicCards).toHaveCount(2);

    const allChipFav = page.getByRole('button', { name: /^كافة الأقسام\s*2$/ });
    await expect(allChipFav).toBeVisible();

    // Verify un-favoriting updates candidate counts dynamically
    const removeFavBtn = topicCards.first().getByRole('button', { name: 'إزالة من المفضلة' });
    await removeFavBtn.click();

    await expect(topicCards).toHaveCount(1);
    const updatedAllChipFav = page.getByRole('button', { name: /^كافة الأقسام\s*1$/ });
    await expect(updatedAllChipFav).toBeVisible();
  });
});
