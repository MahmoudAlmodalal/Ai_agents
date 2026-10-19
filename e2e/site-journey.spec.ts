import { expect, test } from '@playwright/test';

test('reading remains usable when speech synthesis is unavailable', async ({ page }) => {
  await page.addInitScript(() => { Reflect.deleteProperty(window, 'speechSynthesis'); });
  await page.goto('/learn/project-idea-mvp');
  expect(await page.evaluate(() => 'speechSynthesis' in window)).toBe(false);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع');
  await expect(page.getByRole('button', { name: 'الاستماع للمقدمة', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /الموضوع التالي/ })).toHaveAttribute('href', '/learn/discovery-grill-me');
  await page.getByRole('complementary').getByRole('checkbox').first().check();
  await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();
});

for (const width of [390, 768, 1024, 1366, 1440]) {
  test(`entry and reference pages support reading and keyboard links at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['/start', '/about', '/borrowhub', '/tools', '/templates', '/glossary', '/faq']) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflow at ${width}`).toBe(true);
      const link = page.getByRole('main').getByRole('link').first();
      await link.focus();
      await expect(link).toBeFocused();
      expect(await link.getAttribute('href')).not.toBe('#');
      if (width === 390) await page.screenshot({ path: `test-results/reference-${route.slice(1)}-390.png`, fullPage: true });
    }
  });
}
