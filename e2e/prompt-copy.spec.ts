import { test, expect } from '@playwright/test';

test.describe('Prompt Copy Journey', () => {
  test('opens prompt from prompts library and copies prompt body with feedback', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // 1. Visit prompts library
    await page.goto('/prompts');
    await expect(page.locator('h1')).toContainText('مكتبة البرومبتات');

    // 2. Open first prompt detail page
    const firstPromptCard = page.locator('a[href*="/prompts/prompt-01"]').first();
    await expect(firstPromptCard).toBeVisible();
    await firstPromptCard.click();

    // 3. Arrive on prompt page
    await expect(page).toHaveURL(/\/prompts\/prompt-01/);

    // 4. Click copy prompt button
    const copyButton = page.getByRole('button', { name: /نسخ البرومبت/ });
    await expect(copyButton).toBeVisible();
    await copyButton.click();

    // 5. Verify feedback
    await expect(page.getByText('تم النسخ')).toBeVisible();

    // 6. Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText.length).toBeGreaterThan(10);
    expect(clipboardText.toLowerCase()).toContain('grill-me');
  });
});
