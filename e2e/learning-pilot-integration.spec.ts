import { test, expect } from '@playwright/test';

test.describe('Learning pilot integration', () => {
  test('search and filters still find the first topic and theme survives direct reading', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');
    const search = page.getByPlaceholder('ابحث (Sequence, PRD, N+1, B-Tree, UML)...');
    await search.fill('اختيار فكرة المشروع');
    await expect(page.locator('article.topic-card')).toHaveCount(1);
    await page.getByRole('button', { name: /^المرحلة التأسيسية/ }).click();
    await expect(page.locator('article.topic-card')).toHaveCount(1);
    await page.getByRole('button', { name: /^قواعد البيانات والأداء/ }).click();
    await expect(page.locator('article.topic-card')).toHaveCount(0);
    await page.getByRole('button', { name: 'إعادة ضبط الفلاتر', exact: true }).click();
    await expect(page.locator('article.topic-card').first()).toContainText('اختيار فكرة المشروع');

    await page.getByRole('button', { name: 'تبديل النمط', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: 'التحويل إلى النمط النهاري', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true }).click();
    await expect(page).toHaveURL(/\/learn\/project-idea-mvp$/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'التحويل إلى النمط النهاري', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('full reader copies authored content and invokes print and speech controls', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => {
      const calls: string[] = [];
      (window as typeof window & { pilotCalls: string[] }).pilotCalls = calls;
      window.print = () => { calls.push('print'); };
      Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
        speak: (utterance: SpeechSynthesisUtterance) => { calls.push(`speak:${utterance.lang}:${utterance.text.slice(0, 60)}`); },
        pause: () => { calls.push('pause'); },
        resume: () => { calls.push('resume'); },
        cancel: () => { calls.push('cancel'); },
      } });
    });
    await page.goto('/learn/project-idea-mvp');
    const authoredCode = page.locator('article .code-container').first();
    const expectedText = await authoredCode.locator('code').textContent();
    await authoredCode.getByRole('button').click();
    await expect(page.getByRole('status')).toContainText('تم نسخ المحتوى');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expectedText);
    await page.getByRole('button', { name: 'طباعة كملف PDF', exact: true }).click();
    await page.getByRole('button', { name: 'الاستماع للمقدمة', exact: true }).click();
    await page.getByRole('button', { name: 'إيقاف مؤقت', exact: true }).click();
    await page.getByRole('button', { name: 'استئناف الاستماع', exact: true }).click();
    await page.getByRole('button', { name: 'إيقاف القراءة', exact: true }).click();
    const calls = await page.evaluate(() => (window as typeof window & { pilotCalls: string[] }).pilotCalls);
    expect(calls).toContain('print');
    expect(calls).toContain('pause');
    expect(calls).toContain('resume');
    expect(calls.some((call) => call.startsWith('speak:ar-SA:اختيار فكرة المشروع'))).toBe(true);
    await page.emulateMedia({ media: 'print' });
    await expect(page.getByRole('button', { name: 'طباعة كملف PDF', exact: true })).toBeHidden();
    await expect(page.locator('article')).toContainText('PROJECT_CONTEXT.md');
  });

  for (const width of [390, 768, 1024, 1366, 1440]) {
    test(`reading and preview remain usable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      const start = page.getByRole('link', { name: 'ابدأ بالموضوع الأول', exact: true });
      await expect(start).toBeVisible();
      await start.focus();
      await expect(start).toBeFocused();
      expect(await start.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await start.press('Enter');
      await expect(page).toHaveURL(/\/learn\/project-idea-mvp$/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع');
      expect(await page.locator('html').getAttribute('dir')).toBe('rtl');
      const arabicSample = page.locator('article pre').first();
      await expect(arabicSample).toBeVisible();
      expect(await arabicSample.evaluate((element) => getComputedStyle(element).direction)).toBe('rtl');
      const technicalFilename = page.locator('article code[dir="ltr"]').first();
      expect(await technicalFilename.evaluate((element) => getComputedStyle(element).direction)).toBe('ltr');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.getByRole('link', { name: /الموضوع التالي/ })).toHaveAttribute('href', '/learn/discovery-grill-me');
      const checklist = page.getByRole('complementary').getByRole('checkbox').first();
      await checklist.focus();
      await checklist.press('Space');
      await expect(checklist).toBeChecked();
      await page.reload();
      await expect(page.getByRole('complementary').getByRole('checkbox').first()).toBeChecked();
      await page.screenshot({ path: `test-results/pilot-full-${width}.png`, fullPage: true });

      await page.goto('/');
      const preview = page.locator('article.topic-card').first().getByRole('button', { name: 'معاينة سريعة', exact: true });
      await preview.focus();
      await preview.press('Enter');
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('checkbox').first()).toBeChecked();
      expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      const bounds = await dialog.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(-1);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(preview).toBeFocused();
    });
  }
});
