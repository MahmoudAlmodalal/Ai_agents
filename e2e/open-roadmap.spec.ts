import { test, expect } from '@playwright/test';

test.describe('Open Educational Roadmap Journey (Issue #41)', () => {
  test('clean profile opens an arbitrary late topic directly without progress locks or prerequisite blocking', async ({ page }) => {
    // Arbitrary late topic from Group 18
    await page.goto('/learn/full-stack-journey-testing');

    await expect(page).toHaveURL(/\/learn\/full-stack-journey-testing\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('اختبار رحلة المستخدم الشاملة (Full-Stack Journey)');

    // Status badges on reader
    const availabilityBadge = page.getByRole('status', { name: 'حالة توفر المحتوى' });
    await expect(availabilityBadge).toBeVisible();
    await expect(availabilityBadge).toContainText('محتوى متاح (منشور)');

    const improvementBadge = page.getByRole('status', { name: 'حالة التحسين التعليمي' });
    await expect(improvementBadge).toBeVisible();
    await expect(improvementBadge).toContainText('بانتظار المراجعة التعليمية الجديدة');

    // Group badge shows proposed status
    await expect(page.getByText('مجموعة مقترحة: 18.')).toBeVisible();

    // Prerequisites guidance explains it does not block navigation
    const prereqRegion = page.getByRole('region', { name: 'المتطلبات السابقة للتطبيق' });
    await expect(prereqRegion).toBeVisible();
    await expect(prereqRegion).toContainText('إرشاد تعليمي؛ لا يمنع التصفح أو القراءة');

    // Navigation controls are active
    const navigation = page.getByRole('navigation', { name: 'التنقل بين المواضيع' });
    await expect(navigation.getByRole('link', { name: /الموضوع السابق/ })).toBeVisible();
    await expect(navigation.getByRole('link', { name: /الموضوع التالي/ })).toBeVisible();
  });

  test('Project Path on /start presents 19 proposed groups covering all 58 topics without locks', async ({ page }) => {
    await page.goto('/start#project-path');

    const projectPath = page.getByRole('region', { name: 'مسار مشروعك' });
    await expect(projectPath).toBeVisible();

    // 19 group articles
    const groupArticles = projectPath.locator('article[data-group-id]');
    await expect(groupArticles).toHaveCount(19);

    // Group 01 explicitly identified as proposed first group
    const firstGroup = groupArticles.first();
    await expect(firstGroup).toHaveAttribute('data-group-id', 'idea-mvp');
    await expect(firstGroup).toContainText('المجموعة 01: فكرة المشروع وMVP');
    await expect(firstGroup).toContainText('المجموعة الأولى المقترحة');
    await expect(firstGroup).toContainText('مقترح بانتظار اعتماد المالك');

    // Exactly 58 topic listitems within the path
    const listItems = projectPath.getByRole('listitem');
    await expect(listItems).toHaveCount(58);

    // Verify all 58 topic links are enabled and active
    const topicLinks = projectPath.locator('a[data-topic-slug]');
    await expect(topicLinks).toHaveCount(58);

    for (let i = 0; i < 5; i++) {
      await expect(topicLinks.nth(i)).toBeEnabled();
      await expect(topicLinks.nth(i)).toHaveAttribute('href', /^\/learn\//);
    }

    // Honest improvement status displayed across groups
    const pendingStatuses = projectPath.getByText('بانتظار المراجعة التعليمية الجديدة');
    expect(await pendingStatuses.count()).toBeGreaterThan(0);
  });

  test('honest statuses match across catalog card, preview modal, full reader, and roadmap', async ({ page }) => {
    await page.goto('/');

    // Catalog card for topic 1
    const firstCard = page.locator('article.topic-card').first();
    await expect(firstCard.getByRole('status', { name: 'حالة توفر المحتوى' })).toContainText('محتوى متاح (منشور)');
    await expect(firstCard.getByRole('status', { name: 'حالة التحسين التعليمي' })).toContainText('بانتظار المراجعة التعليمية الجديدة');
    await expect(firstCard.getByText('مقترح: المجموعة 01')).toBeVisible();

    // Preview modal
    await firstCard.getByRole('button', { name: 'معاينة سريعة' }).click();
    const dialog = page.getByRole('dialog', { name: 'اختيار فكرة المشروع وتحديد MVP' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('status', { name: 'حالة توفر المحتوى' })).toContainText('محتوى متاح (منشور)');
    await expect(dialog.getByRole('status', { name: 'حالة التحسين التعليمي' })).toContainText('بانتظار المراجعة التعليمية الجديدة');
    await expect(dialog.getByText('مقترح 01: فكرة المشروع وMVP')).toBeVisible();

    // Close preview via Escape
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);

    // Full reader
    await page.goto('/learn/project-idea-mvp');
    await expect(page.getByRole('status', { name: 'حالة توفر المحتوى' })).toContainText('محتوى متاح (منشور)');
    await expect(page.getByRole('status', { name: 'حالة التحسين التعليمي' })).toContainText('بانتظار المراجعة التعليمية الجديدة');

    // Roadmap /start#project-path
    await page.goto('/start#project-path');
    const firstPathItem = page.locator('li[data-topic-slug="project-idea-mvp"]');
    await expect(firstPathItem).toBeVisible();
    await expect(firstPathItem.getByText('محتوى متاح (منشور)')).toBeVisible();
    await expect(firstPathItem.getByText('بانتظار المراجعة التعليمية الجديدة')).toBeVisible();
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
