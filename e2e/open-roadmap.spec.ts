import { test, expect } from '@playwright/test';

test.describe('Open Educational Roadmap Journey (Issue #41)', () => {
  test('clean profile opens an arbitrary late topic directly without progress locks or prerequisite blocking', async ({ page }) => {
    // This late topic belongs to Group 15 with accepted boundaries and remains directly readable.
    await page.goto('/learn/full-stack-journey-testing');

    await expect(page).toHaveURL(/\/learn\/full-stack-journey-testing\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج');

    // These are static labels, so assert their visible copy instead of treating them as live regions.
    const availabilityBadge = page.getByText('حالة التوفر: محتوى متاح (منشور)', { exact: true });
    await expect(availabilityBadge).toBeVisible();

    const improvementBadge = page.getByText('حالة التحسين: بانتظار المراجعة التعليمية الجديدة', { exact: true });
    await expect(improvementBadge).toBeVisible();

    // The reader identifies this topic's actual group and approval state.
    await expect(page.getByText(/المجموعة 15: Frontend\/API integration and journey testing/)).toBeVisible();

    // Prerequisites remain guidance and every topic link stays open.
    await expect(page.getByText(/جميع المواضيع متاحة ويمكنك دراسة أي موضوع مباشرة/)).toBeVisible();

    // Navigation controls are active
    const navigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(navigation.getByRole('link', { name: /الموضوع السابق/ })).toBeVisible();
    await expect(navigation.getByRole('link', { name: /الموضوع التالي/ })).toBeVisible();
  });

  test('Project Path on /start presents 19 approved group boundaries covering all 58 topics without locks', async ({ page }) => {
    await page.goto('/start#project-path');

    const projectPath = page.getByRole('region', { name: 'مسار مشروعك' });
    await expect(projectPath).toBeVisible();

    // 19 group articles
    const groupArticles = projectPath.getByRole('article');
    await expect(groupArticles).toHaveCount(19);

    // Group 01 and its accepted boundaries are identified in the public article content.
    const firstGroup = groupArticles.first();
    await expect(firstGroup).toContainText('المجموعة 01');
    await expect(firstGroup.getByRole('heading', { level: 3 })).toHaveText('الفكرة ونطاق النسخة الأولى (Idea and MVP)');
    await expect(firstGroup).toContainText('المجموعة الأولى — حدود معتمدة');
    await expect(firstGroup).not.toContainText('مقترح بانتظار الاعتماد');

    // Exactly 58 topic listitems within the path
    const topicItems = projectPath.getByRole('listitem');
    await expect(topicItems).toHaveCount(58);

    // Each list item has a direct topic link; none is disabled or gated.
    for (let i = 0; i < 58; i++) {
      const topicLink = topicItems.nth(i).getByRole('link').first();
      await expect(topicLink).toBeEnabled();
      await expect(topicLink).toHaveAttribute('href', /^\/learn\/[a-z0-9-]+$/);
    }

    // Every group has accepted boundaries; educational improvement remains pending.
    await expect(projectPath.getByText(/حدود معتمدة|حدود مجموعة معتمدة/, { exact: false })).toHaveCount(19);

    // Honest improvement status displayed across groups
    const pendingStatuses = projectPath.getByText('بانتظار المراجعة التعليمية الجديدة');
    expect(await pendingStatuses.count()).toBeGreaterThan(0);
  });

  test('honest statuses match across catalog card, preview modal, full reader, and roadmap', async ({ page }) => {
    await page.goto('/');

    // Catalog card for topic 1
    const firstCard = page.locator('article.topic-card').first();
    await expect(firstCard.getByText('محتوى متاح (منشور)', { exact: true })).toBeVisible();
    await expect(firstCard.getByText('بانتظار المراجعة التعليمية الجديدة', { exact: true })).toBeVisible();
    await expect(firstCard.getByText('المجموعة الأولى (حدود معتمدة)', { exact: true })).toBeVisible();

    // Preview modal
    await firstCard.getByRole('button', { name: 'معاينة سريعة' }).click();
    const dialog = page.getByRole('dialog', { name: 'اختيار فكرة المشروع وتحديد MVP' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('حالة التوفر: محتوى متاح (منشور)', { exact: true })).toBeVisible();
    await expect(dialog.getByText('حالة التحسين: بانتظار المراجعة التعليمية الجديدة', { exact: true })).toBeVisible();
    await expect(dialog.getByText(/المجموعة الأولى: Idea and MVP/)).toBeVisible();

    // Close preview via Escape
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);

    // Full reader
    await page.goto('/learn/project-idea-mvp');
    await expect(page.getByText('حالة التوفر: محتوى متاح (منشور)', { exact: true })).toBeVisible();
    await expect(page.getByText('حالة التحسين: بانتظار المراجعة التعليمية الجديدة', { exact: true })).toBeVisible();

    // Roadmap /start#project-path
    await page.goto('/start#project-path');
    const projectPath = page.getByRole('region', { name: 'مسار مشروعك' });
    const firstPathItem = projectPath.getByRole('listitem').first();
    await expect(firstPathItem.getByRole('link').first()).toHaveAttribute('href', '/learn/project-idea-mvp');
    await expect(firstPathItem).toBeVisible();
    await expect(firstPathItem.getByText('حالة التوفر: محتوى متاح (منشور)', { exact: true })).toBeVisible();
    await expect(firstPathItem.getByText('حالة التحسين: بانتظار المراجعة التعليمية الجديدة', { exact: true })).toBeVisible();
  });

  test('keyboard navigation and focus handling work across catalog and preview', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('article.topic-card').first();
    const previewBtn = firstCard.getByRole('button', { name: 'معاينة سريعة' });
    await previewBtn.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const closeBtn = dialog.getByRole('button', { name: 'إغلاق', exact: true });
    await expect(closeBtn).toBeFocused();

    // Escape closes modal and returns focus to trigger
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(previewBtn).toBeFocused();
  });

  test('historical and roadmap routes redirect cleanly', async ({ page }) => {
    await page.goto('/roadmap');
    await expect(page).toHaveURL(/\/start#project-path$/);

    await page.goto('/roadmap/20');
    await expect(page).toHaveURL(/\/learn\/project-demo-day\/?$/);

    await page.goto('/roadmap/2');
    await expect(page).toHaveURL(/\/start#project-path$/);
  });

  test('mobile viewport (390px) renders without horizontal scroll overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Test on /start#project-path
    await page.goto('/start#project-path');
    const noOverflowStart = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(noOverflowStart).toBe(true);

    // Test on homepage
    await page.goto('/');
    const noOverflowHome = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(noOverflowHome).toBe(true);

    // Test on full reader
    await page.goto('/learn/project-idea-mvp');
    const noOverflowReader = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(noOverflowReader).toBe(true);
  });
});
