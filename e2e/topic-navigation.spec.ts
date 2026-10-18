import { test, expect } from '@playwright/test';

test.describe('Topic Navigation Journey', () => {
  test('navigates from home card to modal reader to /learn page and validates bounds', async ({ page }) => {
    // 1. Visit Home page
    await page.goto('/');

    // 2. Locate first topic card (must have canonical title)
    const firstCard = page.locator('article.topic-card').first();
    await expect(firstCard).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // 3. Open modal detail reader
    const openDetailBtn = firstCard.getByRole('button', { name: 'تصفح الموضوع بالتفصيل' });
    await openDetailBtn.click();

    // 4. Modal is visible and contains consistent topic details
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // 5. Navigate to full /learn page from modal
    const fullPageLink = modal.locator('a[href*="/learn/"]').first();
    await expect(fullPageLink).toBeVisible();
    await fullPageLink.click();

    // 6. Arrive on /learn/[slug] for the first topic
    await expect(page).toHaveURL(/\/learn\/(project-idea-mvp|topic-01)/);
    await expect(page.locator('h1')).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // 7. Verify unified contract fields are present on the learning page
    await expect(page.locator('article')).toContainText('PROJECT_CONTEXT.md');
    // Check that numbered practical steps exist
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();

    // 8. Verify navigation bounds for topic 1 (no previous, next points to topic 2)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toHaveCount(0);

    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', /\/learn\//);
  });
});
