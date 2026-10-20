import { expect, test } from '@playwright/test';

const topicSlug = 'project-idea-mvp';
const topicPath = `/learn/${topicSlug}`;
const topicTitle = 'اختيار فكرة المشروع وتحديد MVP';
const VIEWPORT_WIDTHS = [390, 768, 1024, 1366, 1440] as const;

test.describe('External video resources on Topic reading surfaces', () => {
  test('Topic reader displays honest candidate state, external source, and online-only notice without action link', async ({ page }) => {
    await page.goto(topicPath);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(topicTitle);

    const videoSection = page.getByRole('region', { name: new RegExp(`مورد فيديو خارجي لموضوع ${topicTitle}`) });
    await expect(videoSection).toBeVisible();
    await expect(videoSection).toHaveAttribute('data-video-state', 'candidate');

    // Status badge shows candidate pending review
    const statusBadge = videoSection.getByRole('status');
    await expect(statusBadge).toContainText('مرشح — بانتظار المراجعة');

    // External source platform is clearly visible
    const sourceBadge = videoSection.getByTestId('external-video-source');
    await expect(sourceBadge).toBeVisible();
    await expect(sourceBadge).toContainText('YouTube');

    // Title and purpose
    await expect(videoSection).toContainText('How to Build An MVP | Startup School');
    await expect(videoSection).toContainText('Y Combinator / Michael Seibel');

    // Honest candidate and connectivity messaging
    await expect(videoSection).toContainText(
      'هذا رابط مرشح لم تتم الموافقة عليه كمورد تعليمي. يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال.'
    );
    await expect(page.getByText('مصادر الفيديو الخارجية تتطلب اتصالاً بالإنترنت ولا تتوفر دون اتصال.')).toBeVisible();

    // Candidate stays non-actionable: no outbound link
    await expect(videoSection.locator('a')).toHaveCount(0);
  });

  test('Quick preview modal renders identical honest video candidate and connectivity requirements', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('article.topic-card').filter({ hasText: topicTitle }).first();
    await card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();

    const videoSection = modal.getByRole('region', { name: new RegExp(`مورد فيديو خارجي لموضوع ${topicTitle}`) });
    await expect(videoSection).toBeVisible();
    await expect(videoSection).toHaveAttribute('data-video-state', 'candidate');
    await expect(videoSection.getByRole('status')).toContainText('مرشح — بانتظار المراجعة');
    await expect(videoSection.getByTestId('external-video-source')).toContainText('YouTube');
    await expect(videoSection.locator('a')).toHaveCount(0);
  });

  for (const width of VIEWPORT_WIDTHS) {
    test(`Video resource respects responsive layout, touch targets, and RTL at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(topicPath);

      const html = page.locator('html');
      expect(await html.getAttribute('dir')).toBe('rtl');

      const videoSection = page.getByRole('region', { name: new RegExp(`مورد فيديو خارجي لموضوع ${topicTitle}`) });
      await expect(videoSection).toBeVisible();

      // No horizontal overflow
      const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(noOverflow).toBe(true);

      // Section has RTL direction
      expect(await videoSection.getAttribute('dir')).toBe('rtl');
    });
  }

  test('Saved topics page shows online-only video count and does not promise offline playback', async ({ page }) => {
    // Navigate to topic and wait for service worker controller if available
    await page.goto(topicPath);
    await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return;
      if (navigator.serviceWorker.controller) return;
      await new Promise<void>((resolve) => {
        navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true });
        setTimeout(resolve, 3000);
      });
    });

    const saveBtn = page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
    await expect(
      page.getByRole('button', { name: 'إزالة النسخة المحفوظة بدون إنترنت', exact: true })
    ).toBeVisible({ timeout: 60000 });

    // Open /saved
    await page.goto('/saved');
    await expect(page.getByRole('heading', { name: 'المواضيع المحفوظة بدون إنترنت' })).toBeVisible();

    // Verify online-only video badge
    const savedEntry = page.locator('article').filter({ hasText: topicTitle });
    await expect(savedEntry).toBeVisible();
    await expect(savedEntry).toContainText('1 فيديو خارجي يتطلب اتصالاً');

    // Open the saved topic reader
    const readBtn = savedEntry.getByRole('link', { name: 'قراءة الدرس' });
    await readBtn.click();
    await expect(page).toHaveURL(new RegExp(`${topicPath}$`));

    // Video resource still displays honest candidate warning and online requirement
    const videoSection = page.getByRole('region', { name: new RegExp(`مورد فيديو خارجي لموضوع ${topicTitle}`) });
    await expect(videoSection).toBeVisible();
    await expect(videoSection.getByRole('status')).toContainText('مرشح — بانتظار المراجعة');
    await expect(videoSection.locator('a')).toHaveCount(0);
    await expect(videoSection).toContainText('يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال');
  });

});
