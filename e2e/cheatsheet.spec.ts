import { test, expect } from '@playwright/test';

test.describe('Cheatsheet Page E2E', () => {
  test('Cheatsheet presents source-approved 58 topics, canonical links, and faithful prompt copy availability', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/cheatsheet');

    // Page has exactly ONE main landmark and its existing #main-content target remains the skip-link destination
    const main = page.getByRole('main');
    await expect(main).toHaveCount(1);
    await expect(main).toHaveId('main-content');
    await expect(page.locator('a[href="#main-content"]')).toHaveAttribute('href', '#main-content');

    // Header & metadata
    await expect(page.locator('h1')).toContainText('Practical Prompts Cheatsheet');

    // Topic count badge must independently reflect source-approved 58 topics, not retired 20 lessons
    const mainHeader = page.locator('main header');
    await expect(mainHeader).toContainText('58 موضوعًا');
    await expect(mainHeader).not.toContainText('20 درسًا');

    // Navigation back link should lead to canonical project path, not retired roadmap reader.
    // Scoped to the page content so the global navigation item (its own label) cannot shadow it.
    const backLink = page.locator('main a[href="/start#project-path"]').first();
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('مسار المشروع');

    // Zero links to retired roadmap reader /roadmap/[number]
    const retiredRoadmapLinks = page.locator('a[href^="/roadmap/"]');
    await expect(retiredRoadmapLinks).toHaveCount(0);

    // Generic copy prompts (Prompt A, B, C) are available
    await expect(page.locator('text=Prompt A — التحضير والتنفيذ')).toBeVisible();
    await expect(page.locator('text=Prompt B — المراجعة')).toBeVisible();
    await expect(page.locator('text=Prompt C — التسليم والتوثيق')).toBeVisible();

    // Section title uses canonical project/topic terminology, not retired lectures
    await expect(page.locator('text=السلسلة الأساسية لكل محاضرة')).toHaveCount(0);

    // Source-approved 58 topic details independently asserted
    const topicDetails = page.locator('details');
    await expect(topicDetails).toHaveCount(58);

    // Canonical first topic (01 - project-idea-mvp): open details before testing enclosed link
    const firstTopicDetails = topicDetails.first();
    await expect(firstTopicDetails).toContainText('01');
    await expect(firstTopicDetails).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await firstTopicDetails.locator('summary').click();
    const firstTopicLink = firstTopicDetails.locator('a[href="/learn/project-idea-mvp"]');
    await expect(firstTopicLink).toBeVisible();

    // Canonical Activity Diagram topic (12 - activity-diagram):
    // open details before testing enclosed link, verify real accessible copy button and clipboard match to pre
    const activityDetails = page.locator('details').filter({ hasText: 'مخطط النشاط وسير العمليات' });
    await expect(activityDetails).toBeVisible();
    await activityDetails.locator('summary').click();
    const activityLink = activityDetails.locator('a[href="/learn/activity-diagram"]');
    await expect(activityLink).toBeVisible();

    const activityPre = activityDetails.locator('pre');
    await expect(activityPre).toBeVisible();
    await expect(activityPre).toContainText('Act as a Senior Business Process Analyst');
    const expectedActivityPrompt = await activityPre.textContent();

    const copyButton = activityDetails.getByRole('button', { name: 'نسخ البرومبت' });
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(activityDetails.getByRole('button')).toHaveText('تم النسخ ✓');
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedActivityPrompt);

    // Canonical Redis topic (48 - redis-optional-infrastructure):
    // open details before testing enclosed link, verify no-prompt message and no actual button
    const redisTopicDetails = page.locator('details').filter({ hasText: 'Redis: قرار مشروط' });
    await expect(redisTopicDetails).toBeVisible();
    await redisTopicDetails.locator('summary').click();
    const redisLink = redisTopicDetails.locator('a[href="/learn/redis-optional-infrastructure"]');
    await expect(redisLink).toBeVisible();

    await expect(redisTopicDetails).toContainText('لا يوجد برومبت مخصص');
    await expect(redisTopicDetails.locator('button')).toHaveCount(0);
    await expect(redisTopicDetails.getByRole('button', { name: 'نسخ البرومبت' })).toHaveCount(0);
    await expect(redisTopicDetails.locator('pre')).toHaveCount(0);
  });
});
