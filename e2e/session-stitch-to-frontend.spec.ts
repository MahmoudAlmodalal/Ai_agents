import { test, expect, type Page } from '@playwright/test';

const sessionHeading = /من تصميم Stitch إلى Frontend احترافي/;
const checklistBoxes = (page: Page) => page.locator('.checklist-card input[type="checkbox"]');

test('session page renders the consolidated lecture, contents and authored checklist', async ({ page, context }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  await page.goto('/learn/stitch-to-frontend');

  await expect(page.getByRole('heading', { level: 1, name: sessionHeading })).toBeVisible();
  await expect(page.getByText('جلسة تطبيقية', { exact: true }).first()).toBeVisible();

  const toc = page.getByRole('navigation', { name: 'محتويات الجلسة' });
  await expect(toc.getByRole('link')).toHaveCount(14);

  await toc.getByRole('link', { name: /Spec Kit/ }).click();
  await expect(page.locator('#spec-kit')).toBeInViewport();
  await expect(page.locator('#prompt-repo-audit')).toBeVisible();
  await expect(page.locator('#prompt-design-brief')).toBeVisible();
  await expect(page.locator('#prompt-diff-review')).toBeVisible();

  const auditPrompt = page.locator('#prompt-repo-audit');
  await auditPrompt.getByRole('button', { name: 'نسخ' }).click();
  await expect(auditPrompt.getByRole('button')).toContainText('تم النسخ');
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('Senior Next.js Architect');

  await expect(page.getByRole('heading', { name: /قائمة فحص قبل اعتماد المشروع/ })).toBeVisible();
  await expect(checklistBoxes(page)).toHaveCount(10);
  await expect(page.getByRole('heading', { name: 'التكليف العملي للمتدربين' })).toBeVisible();

  expect(pageErrors).toEqual([]);
});

test('session checklist persists across reloads without touching topic checklists', async ({ page }) => {
  await page.goto('/learn/stitch-to-frontend');
  await expect(checklistBoxes(page)).toHaveCount(10);

  await checklistBoxes(page).first().check();
  await checklistBoxes(page).nth(4).check();
  await expect(checklistBoxes(page).first()).toBeChecked();

  await page.reload();
  await expect(checklistBoxes(page).first()).toBeChecked();
  await expect(checklistBoxes(page).nth(4)).toBeChecked();
  await expect(checklistBoxes(page).nth(1)).not.toBeChecked();

  await page.goto('/learn/project-idea-mvp');
  const topicChecklist = page.getByRole('group', { name: 'قائمة تحقق التطبيق', exact: true });
  await expect(topicChecklist.getByRole('checkbox').first()).not.toBeChecked();
  await page.goBack();
  await expect(checklistBoxes(page).first()).toBeChecked();
});

test('session links to the prompt library and related topic pages link back', async ({ page }) => {
  await page.goto('/learn/stitch-to-frontend');

  const promptLink = page.getByRole('link', { name: /افتح البرومبت 15 كاملًا/ }).first();
  await expect(promptLink).toHaveAttribute('href', '/prompts/prompt-15-ux-blueprint-screen-inventory');
  await promptLink.click();
  await expect(page).toHaveURL(/\/prompts\/prompt-15-ux-blueprint-screen-inventory$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/UX Blueprint/);

  await page.goto('/learn/nextjs-app-router');
  await expect(page.getByText('هذا الموضوع جزء من جلسة تطبيقية')).toBeVisible();
  await page.getByRole('link', { name: /افتح الجلسة الكاملة/ }).click();
  await expect(page).toHaveURL(/\/learn\/stitch-to-frontend$/);
  await expect(page.getByRole('heading', { level: 1, name: sessionHeading })).toBeVisible();
});

test('session is discoverable from the home page', async ({ page }) => {
  await page.goto('/');
  const banner = page.getByRole('link', { name: /من تصميم Stitch إلى Frontend احترافي/ });
  await expect(banner).toBeVisible();
  await expect(banner).toHaveAttribute('href', '/learn/stitch-to-frontend');
});

test('session page has no horizontal page overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/learn/stitch-to-frontend');
  await expect(page.getByRole('heading', { level: 1, name: sessionHeading })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
