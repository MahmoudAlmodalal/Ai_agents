import { test, expect } from '@playwright/test';

test.describe('Saved Data Compatibility', () => {
  test('legacy bookmarks map to the same topic and newly saved favorites persist', async ({ page }) => {
    await page.goto('/');

    // 1. Preload localStorage with legacy bookmark id "topic-05" (Database Analysis & ERD)
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['topic-05']));
    });
    await page.reload();

    // 2. Find topic card 05 and verify it is bookmarked
    const card05 = page.locator('article.topic-card').filter({ hasText: '05' }).first();
    const bookmarkBtn05 = card05.getByRole('button', { name: /إزالة من المفضلة|حفظ في المفضلة/ });
    await expect(bookmarkBtn05).toHaveAttribute('aria-label', 'إزالة من المفضلة');

    // 3. Bookmark topic 01 (Project idea / MVP)
    const card01 = page.locator('article.topic-card').first();
    const bookmarkBtn01 = card01.getByRole('button', { name: /حفظ في المفضلة/ });
    await bookmarkBtn01.click();
    await expect(card01.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();

    // 4. Verify localStorage has written canonical slug
    const savedBookmarksRaw = await page.evaluate(() => localStorage.getItem('engineering_guide_bookmarks'));
    expect(savedBookmarksRaw).toBeTruthy();
    const savedBookmarks = JSON.parse(savedBookmarksRaw!);
    // Must contain canonical slug
    expect(savedBookmarks).toContain('project-idea-mvp');
    // Must translate legacy topic-05 to database-erd
    expect(savedBookmarks).toContain('database-erd');

    // 5. Reload page and confirm favorites persist
    await page.reload();
    await expect(card01.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();
    await expect(card05.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();
  });

  test('legacy recently-viewed entries still identify the same topic and persist newly as canonical slugs', async ({ page }) => {
    await page.goto('/');

    // 1. Preload legacy recently-viewed with "topic-05"
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['topic-05']));
    });
    await page.reload();

    // 2. Recently viewed section should display topic 05
    const recentlyViewedSection = page.locator('section').filter({ hasText: /شوهدت مؤخراً|شاهدتها مؤخراً/ });
    await expect(recentlyViewedSection).toBeVisible();
    await expect(recentlyViewedSection).toContainText('Database Analysis');

    // 3. Open topic 01 from card
    const card01 = page.locator('article.topic-card').first();
    await card01.getByRole('button', { name: 'تصفح الموضوع بالتفصيل' }).click();

    // 4. Verify localStorage recently viewed wrote canonical slug
    const savedRecentRaw = await page.evaluate(() => localStorage.getItem('engineering_guide_recently_viewed'));
    expect(savedRecentRaw).toBeTruthy();
    const savedRecent = JSON.parse(savedRecentRaw!);
    expect(savedRecent[0]).toBe('project-idea-mvp');
  });
});
