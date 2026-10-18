import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Topic 02: Discovery, PRD, and SRS', () => {
  test('Home cards display Topics 02, 03, and 04 in sequence with full detail modal', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');

    // 2. Locate Topic 02, 03, 04 cards
    const cards = page.locator('article.topic-card');
    await expect(cards.filter({ hasText: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' })).toBeVisible();
    await expect(cards.filter({ hasText: 'وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها' })).toBeVisible();
    await expect(cards.filter({ hasText: 'مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول' })).toBeVisible();

    // 3. Open detail modal for Topic 02 (Grill Me)
    const topic02Card = cards.filter({ hasText: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' });
    await topic02Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('استجواب الفكرة واستكشاف المتطلبات (Grill Me)');
    await expect(modal).toContainText('docs/DECISIONS_LOG.md');
    await expect(modal).toContainText('خطوات التطبيق على مشروعك:');

    // Close modal
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('Sequential navigation across Topic 01 -> Topic 02 -> Topic 03 -> Topic 04', async ({ page }) => {
    // 1. Start from Topic 01 (/learn/project-idea-mvp)
    await page.goto('/learn/project-idea-mvp');
    await expect(page.locator('h1')).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // Next link should lead to Topic 02 (discovery-grill-me)
    const nextTo02 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextTo02).toBeVisible();
    await expect(nextTo02).toHaveAttribute('href', '/learn/discovery-grill-me');
    await nextTo02.click();

    // 2. Arrive at Topic 02 (Grill Me)
    await expect(page).toHaveURL(/\/learn\/discovery-grill-me/);
    await expect(page.locator('h1')).toContainText('استجواب الفكرة واستكشاف المتطلبات (Grill Me)');
    const topic02Header = page.locator('header.rounded-3xl');
    await expect(topic02Header).toContainText('محتوى منشور');
    await expect(topic02Header).toContainText('docs/DECISIONS_LOG.md');

    // Check prerequisites note that no coding agent, skills or MCP are needed
    await expect(page.locator('article')).toContainText('لا يشترط تثبيت أي أدوات برمجية للواجهة أو مهارات Skills أو خوادم MCP');

    // Prev link points to Topic 01, Next link points to Topic 03
    const prevTo01 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevTo01).toBeVisible();
    await expect(prevTo01).toHaveAttribute('href', '/learn/project-idea-mvp');

    const nextTo03 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextTo03).toBeVisible();
    await expect(nextTo03).toHaveAttribute('href', '/learn/prd-specification');
    await nextTo03.click();

    // 3. Arrive at Topic 03 (PRD with 27 sections)
    await expect(page).toHaveURL(/\/learn\/prd-specification/);
    await expect(page.locator('h1')).toContainText('وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها');
    const topic03Header = page.locator('header.rounded-3xl');
    await expect(topic03Header).toContainText('docs/PRD.md');
    await expect(topic03Header).toContainText('docs/PRD_REVIEW.md');

    // Verify 27 sections table presence
    await expect(page.locator('table')).toContainText('Product Overview');
    await expect(page.locator('table')).toContainText('Recommended Development Phases');

    // Prev link points to Topic 02, Next link points to Topic 04
    const prevTo02 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevTo02).toBeVisible();
    await expect(prevTo02).toHaveAttribute('href', '/learn/discovery-grill-me');

    const nextTo04 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextTo04).toBeVisible();
    await expect(nextTo04).toHaveAttribute('href', '/learn/srs');
    await nextTo04.click();

    // 4. Arrive at Topic 04 (SRS)
    await expect(page).toHaveURL(/\/learn\/srs/);
    await expect(page.locator('h1')).toContainText('مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول');
    const topic04Header = page.locator('header.rounded-3xl');
    await expect(topic04Header).toContainText('docs/SRS.md');

    // Verify PRD vs SRS comparison & Given / When / Then criteria
    await expect(page.locator('article')).toContainText('Given');
    await expect(page.locator('article')).toContainText('When');
    await expect(page.locator('article')).toContainText('Then');

    // Prev link points back to Topic 03
    const prevTo03 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevTo03).toBeVisible();
    await expect(prevTo03).toHaveAttribute('href', '/learn/prd-specification');
  });

  test('Prompts library copy action and topic modal assumptions vs open questions', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // 1. Visit Topic 02 in modal to verify distinctions
    await page.goto('/');
    const topic02Card = page.locator('article.topic-card').filter({ hasText: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' });
    await topic02Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();

    // Verify distinction between confirmed decisions, assumptions, and open questions
    await expect(modal).toContainText('قرارات معتمدة');
    await expect(modal).toContainText('افتراضات مقترحة');
    await expect(modal).toContainText('أسئلة مفتوحة');

    // Check code content is rendered
    const codeBlock = modal.locator('pre.code-content').first();
    await expect(codeBlock).toContainText('/grill-me');

    // Close modal
    await page.keyboard.press('Escape');

    // 2. Open Prompt 01 in prompts library and test copying
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    await expect(page.locator('h1')).toContainText('Grill Me: Product Discovery');

    const copyBtn = page.getByRole('button', { name: /نسخ البرومبت/ });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(page.getByText('تم النسخ')).toBeVisible();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('/grill-me');
    expect(clipboardText).toContain('ONE question at a time');
  });

  test('PRD topic grounds 27 sections and review prompt', async ({ page }) => {
    await page.goto('/learn/prd-specification');

    // Check for Prompt 02 and Prompt 03 in the content
    await expect(page.locator('article')).toContainText('PROMPT 02');
    await expect(page.locator('article')).toContainText('27 sections');
    await expect(page.locator('article')).toContainText('PROMPT 03');
    await expect(page.locator('article')).toContainText('PRD Review');

    // Verify that decisions precede generated documents
    await expect(page.locator('article')).toContainText('docs/DECISIONS_LOG.md');
    await expect(page.locator('article')).toContainText('Single Source of Truth');
  });

  test('SRS topic grounds system behavior, error states, and Given/When/Then acceptance criteria', async ({ page }) => {
    await page.goto('/learn/srs');

    // Check behavior components
    await expect(page.locator('article')).toContainText('Preconditions');
    await expect(page.locator('article')).toContainText('Input Validation');
    await expect(page.locator('article')).toContainText('State Transitions');

    // Check error handling & idempotency
    await expect(page.locator('article')).toContainText('Idempotency');
    await expect(page.locator('article')).toContainText('Race Conditions');

    // Check Given/When/Then scenarios
    await expect(page.locator('article')).toContainText('Happy Path Scenario');
    await expect(page.locator('article')).toContainText('Validation Rejection');
  });
});
