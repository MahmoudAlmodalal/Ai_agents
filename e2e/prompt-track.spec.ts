import { test, expect } from '@playwright/test';

test.describe('Prompt Track (Build from Scratch) Journey', () => {
  test('renders 34 numbered steps in default list view, separates supporting sections, and allows grid toggle', async ({ page }) => {
    await page.goto('/prompts');
    await expect(page.getByRole('heading', { level: 1, name: 'مكتبة البرومبتات' })).toBeVisible();

    // Verify view toggle is present and list view is selected by default
    const listViewBtn = page.getByRole('button', { name: 'قائمة مرقّمة' });
    const gridViewBtn = page.getByRole('button', { name: 'شبكة' });
    await expect(listViewBtn).toBeVisible();
    await expect(gridViewBtn).toBeVisible();
    await expect(listViewBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(gridViewBtn).toHaveAttribute('aria-pressed', 'false');

    // Verify ordered list contains the 34 build steps
    const listSection = page.locator('ol[aria-label="مسار البرومبتات لبناء المشروع خطوة بخطوة"]');
    await expect(listSection).toBeVisible();
    const stepLinks = listSection.locator('a[href^="/prompts/"]');
    await expect(stepLinks).toHaveCount(34);

    // Verify first step is Grill Me (Step 1)
    const firstStep = stepLinks.first();
    await expect(firstStep).toContainText('1');
    await expect(firstStep).toContainText('Grill Me: استكشاف المنتج');
    await expect(firstStep).toContainText('تحسم فكرة مشروعك بسؤال واحد في كل مرة قبل أن تكتب سطر كود.');

    // Verify step 22 is marked optional (Stitch MCP)
    const optionalStep = listSection.locator('a[href="/prompts/prompt-22-stitch-mcp-connection-verification"]');
    await expect(optionalStep).toBeVisible();
    await expect(optionalStep).toContainText('اختياري');

    // Verify step 34 is handoff (Step 34)
    const lastStep = stepLinks.last();
    await expect(lastStep).toContainText('34');
    await expect(lastStep).toContainText('تسليم GitHub');

    // Verify supporting templates section (A/B/C cheatsheet core)
    await expect(page.getByRole('heading', { level: 2, name: 'قوالب مساعدة تتكرر مع كل خطوة' })).toBeVisible();
    const templateCards = page.locator('section[aria-labelledby="prompt-templates"] a[href^="/prompts/"]');
    await expect(templateCards).toHaveCount(3);

    // Verify supplementary examples section
    await expect(page.getByRole('heading', { level: 2, name: 'أمثلة مكمّلة — غير مرقّمة' })).toBeVisible();
    const exampleCards = page.locator('section[aria-labelledby="prompt-examples"] a[href^="/prompts/"]');
    await expect(exampleCards).toHaveCount(4);

    // Toggle to Grid View
    await gridViewBtn.click();
    await expect(gridViewBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(listViewBtn).toHaveAttribute('aria-pressed', 'false');
    await expect(listSection).not.toBeVisible();

    // Verify grid cards exist
    const gridCards = page.locator('section[aria-label="خطوات المسار التسلسلية"] a[href^="/prompts/"]');
    await expect(gridCards).toHaveCount(34);

    // Toggle back to List View
    await listViewBtn.click();
    await expect(listViewBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(listSection).toBeVisible();
  });

  test('searches and filters by Arabic benefit and title smoothly', async ({ page }) => {
    await page.goto('/prompts');
    const search = page.getByRole('searchbox', { name: 'ابحث في البرومبتات' });

    // Search by Arabic title/benefit term
    await search.fill('استكشاف المنتج');
    const stepLinks = page.locator('ol[aria-label="مسار البرومبتات لبناء المشروع خطوة بخطوة"] a[href^="/prompts/"]');
    await expect(stepLinks).toHaveCount(1);
    await expect(stepLinks.first()).toContainText('Grill Me: استكشاف المنتج');

    // Clear search
    await search.fill('');
    await expect(stepLinks).toHaveCount(34);
  });

  test('navigates from step details to the next sequential step in the track', async ({ page }) => {
    // Open step 1
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');

    // Verify step badge in header
    await expect(page.getByText('الخطوة 1 من 34')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Grill Me: استكشاف المنتج' })).toBeVisible();
    await expect(page.getByText('تحسم فكرة مشروعك بسؤال واحد في كل مرة قبل أن تكتب سطر كود.')).toBeVisible();

    // Click next step navigation link
    const nextStepLink = page.getByRole('link', { name: /الخطوة التالية في المسار/ });
    await expect(nextStepLink).toBeVisible();
    await expect(nextStepLink).toContainText('توليد PRD بعد Grill Me');
    await nextStepLink.click();

    // Assert navigated to step 2
    await expect(page).toHaveURL(/\/prompts\/prompt-02-generate-prd-after-grill-me$/);
    await expect(page.getByText('الخطوة 2 من 34')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'توليد PRD بعد Grill Me' })).toBeVisible();
  });

  test('displays supporting badge for non-numbered supporting prompts', async ({ page }) => {
    await page.goto('/prompts/cheatsheet-a-prepare-and-execute');
    await expect(page.getByText('برومبت مساند')).toBeVisible();
    await expect(page.getByText(/الخطوة \d+ من 34/)).not.toBeVisible();
  });
});
