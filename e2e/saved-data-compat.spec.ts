import { test, expect } from '@playwright/test';

test.describe('Saved Data Compatibility', () => {
  test('legacy bookmarks map to the same topic and newly saved favorites persist', async ({ page }) => {
    await page.goto('/');

    // 1. Preload localStorage with legacy bookmark id "topic-03" (User Flow)
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['topic-03']));
    });
    await page.reload();

    // 2. Find topic card 05 and verify it is bookmarked
    const card05 = page.locator('article.topic-card').filter({ has: page.getByRole('link', { name: /User Flow/ }) });
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
    // Must translate legacy topic-03 to user-flow-modeling
    expect(savedBookmarks).toContain('user-flow-modeling');

    // 5. Reload page and confirm favorites persist
    await page.reload();
    await expect(card01.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();
    await expect(card05.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();
  });

  test('legacy recently-viewed entries still identify the same topic and persist newly as canonical slugs', async ({ page }) => {
    await page.goto('/');

    // 1. Preload legacy recently-viewed with "topic-03"
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['topic-03']));
    });
    await page.reload();

    // 2. Recently viewed section should display topic 05
    const recentlyViewedSection = page.locator('section').filter({ hasText: /شوهدت مؤخراً|شاهدتها مؤخراً/ });
    await expect(recentlyViewedSection).toBeVisible();
    await expect(recentlyViewedSection).toContainText('User Flow');

    // 3. Open topic 01 from card
    const card01 = page.locator('article.topic-card').first();
    await card01.getByRole('link', { name: 'قراءة الموضوع كاملاً' }).click();
    await expect(page).toHaveURL(/\/learn\/project-idea-mvp\/?$/);

    // 4. Verify localStorage recently viewed wrote canonical slug
    await expect.poll(() => page.evaluate(() => {
      return JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')[0];
    })).toBe('project-idea-mvp');
    await page.goto('/');
    const updatedRecentlyViewed = page.getByRole('region', { name: 'المواضيع التي شاهدتها مؤخراً' });
    await expect(updatedRecentlyViewed).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(updatedRecentlyViewed.getByRole('link', { name: 'اختيار فكرة المشروع وتحديد MVP', exact: true }))
      .toHaveAttribute('href', '/learn/project-idea-mvp');
  });

  test('current topic IDs keep favorites and preview history canonical across both readers', async ({ page }) => {
    await page.goto('/');
    const secondCard = page.locator('article.topic-card').filter({
      has: page.getByRole('link', { name: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)', exact: true }),
    });
    await secondCard.getByRole('button', { name: 'حفظ في المفضلة', exact: true }).click();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]')))
      .toEqual(['discovery-grill-me']);

    await secondCard.getByRole('button', { name: 'معاينة سريعة', exact: true }).click();
    const preview = page.getByRole('dialog', { name: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' });
    await expect(preview.getByRole('button', { name: 'إزالة من المفضلة', exact: true })).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
      .toEqual(['discovery-grill-me']);
    await preview.getByRole('link', { name: 'قراءة الموضوع كاملاً', exact: true }).click();
    await expect(page).toHaveURL(/\/learn\/discovery-grill-me\/?$/);
    const removeFavorite = page.getByRole('button', { name: 'إزالة من المفضلة', exact: true });
    await expect(removeFavorite).toHaveAttribute('aria-pressed', 'true');
    await removeFavorite.click();
    await expect(page.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toHaveAttribute('aria-pressed', 'false');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_bookmarks') || '[]'))).toEqual([]);

    await page.goto('/');
    await expect(secondCard.getByRole('button', { name: 'حفظ في المفضلة', exact: true })).toBeVisible();
    await expect(secondCard.getByRole('button', { name: 'إزالة من المفضلة', exact: true })).toHaveCount(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('engineering_guide_recently_viewed') || '[]')))
      .toEqual(['discovery-grill-me']);
  });
});
