import { test, expect, type Page } from '@playwright/test';

const checklist = (page: Page) => page.getByRole('group', { name: 'قائمة تحقق التطبيق', exact: true });
const storageKey = 'application-checklists-v1';

test('checks and clearing persist across both readers, reload, browser back and an actual other topic', async ({ page }) => {
  await page.goto('/learn/project-idea-mvp');
  await expect(checklist(page).getByRole('checkbox').first()).toBeVisible();
  await checklist(page).getByRole('checkbox').first().check();
  await checklist(page).getByRole('checkbox').nth(2).check();
  await page.reload();
  await expect(checklist(page).getByRole('checkbox').first()).toBeChecked();
  await expect(checklist(page).getByRole('checkbox').nth(2)).toBeChecked();
  await expect(checklist(page).getByRole('checkbox').nth(1)).not.toBeChecked();

  // This canonical topic has authored criteria; failure to find one must fail.
  await page.goto('/learn/discovery-grill-me');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(checklist(page).getByRole('checkbox').first()).toBeVisible();
  await expect(checklist(page).getByRole('checkbox').first()).not.toBeChecked();
  await checklist(page).getByRole('checkbox').nth(1).check();
  await page.goBack();
  await expect(checklist(page).getByRole('checkbox').first()).toBeChecked();
  await expect(checklist(page).getByRole('checkbox').nth(2)).toBeChecked();

  await page.goto('/');
  await page.locator('article.topic-card').first().getByRole('button', { name: 'معاينة سريعة' }).click();
  const modal = page.getByRole('dialog');
  const previewChecklist = modal.getByRole('group', { name: 'قائمة تحقق التطبيق', exact: true });
  await expect(previewChecklist.getByRole('checkbox').first()).toBeChecked();
  await expect(previewChecklist.getByRole('checkbox').nth(2)).toBeChecked();
  await previewChecklist.getByRole('checkbox').first().uncheck();
  await modal.getByRole('button', { name: /إغلاق/ }).click();

  await page.goto('/learn/project-idea-mvp');
  await expect(checklist(page).getByRole('checkbox').first()).not.toBeChecked();
  await expect(checklist(page).getByRole('checkbox').nth(2)).toBeChecked();
  await page.goto('/learn/discovery-grill-me');
  await expect(checklist(page).getByRole('checkbox').first()).not.toBeChecked();
  await expect(checklist(page).getByRole('checkbox').nth(1)).toBeChecked();
});

for (const method of ['getItem', 'setItem'] as const) {
  test(`${method} failure keeps multiple choices usable and retries safely when storage recovers`, async ({ page }) => {
    await page.addInitScript(({ method, storageKey }) => {
      const originalGetItem = Storage.prototype.getItem;
      const originalSetItem = Storage.prototype.setItem;
      (window as Window & { checklistStorageBlocked?: boolean }).checklistStorageBlocked = true;
      if (method === 'getItem') {
        Storage.prototype.getItem = function (key: string) {
          if (key === storageKey && (window as Window & { checklistStorageBlocked?: boolean }).checklistStorageBlocked) throw new Error('Storage read blocked');
          return originalGetItem.call(this, key);
        };
      } else {
        Storage.prototype.setItem = function (key: string, value: string) {
          if (key === storageKey && (window as Window & { checklistStorageBlocked?: boolean }).checklistStorageBlocked) throw new Error('Storage quota');
          return originalSetItem.call(this, key, value);
        };
      }
    }, { method, storageKey });
    await page.goto('/learn/project-idea-mvp');
    await checklist(page).getByRole('checkbox').first().check();
    await checklist(page).getByRole('checkbox').nth(1).check();
    await expect(checklist(page).getByRole('checkbox').first()).toBeChecked();
    await expect(checklist(page).getByRole('checkbox').nth(1)).toBeChecked();
    await checklist(page).getByRole('checkbox').first().uncheck();
    await expect(checklist(page).getByRole('checkbox').nth(1)).toBeChecked();
    await expect(checklist(page).getByRole('status')).toContainText('قد تفقدها عند إعادة تحميل الصفحة');
    await page.evaluate(() => {
      (window as Window & { checklistStorageBlocked?: boolean }).checklistStorageBlocked = false;
      window.dispatchEvent(new Event('focus'));
    });
    await expect(checklist(page).getByRole('status')).toHaveCount(0);
    await expect(checklist(page).getByRole('checkbox').first()).not.toBeChecked();
    await expect(checklist(page).getByRole('checkbox').nth(1)).toBeChecked();
    await expect.poll(() => page.evaluate((key) => JSON.parse(localStorage.getItem(key)!)['project-idea-mvp'].length, storageKey)).toBe(1);
  });
}

test('malformed storage stays intact while selections and navigation remain available', async ({ page }) => {
  const malformed = '{"project-idea-mvp":[true]}';
  await page.addInitScript(({ storageKey, malformed }) => {
    localStorage.setItem(storageKey, malformed);
    localStorage.setItem('checklist_topic-01_0', 'true');
  }, { storageKey, malformed });
  await page.goto('/learn/project-idea-mvp');
  await expect(checklist(page).getByRole('checkbox').first()).not.toBeChecked();
  await checklist(page).getByRole('checkbox').first().check();
  await checklist(page).getByRole('checkbox').nth(1).check();
  await expect(checklist(page).getByRole('checkbox').first()).toBeChecked();
  await expect(checklist(page).getByRole('checkbox').nth(1)).toBeChecked();
  await expect(checklist(page).getByRole('status')).toContainText('تُركت دون تغيير');
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBe(malformed);
  expect(await page.evaluate(() => localStorage.getItem('checklist_topic-01_0'))).toBe('true');
  await expect(page.getByRole('navigation', { name: 'التنقل بين المواضيع' }).getByRole('link', { name: /الموضوع التالي/ })).toBeEnabled();
});

test('mislabeled old route reaches User Flow and leaves unrelated historical checklist untouched', async ({ page }) => {
  await page.addInitScript(() => { localStorage.setItem('checklist_topic-03_0', 'true'); });
  await page.goto('/learn/requirements-prd');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('User Flow');
  await expect(page.getByRole('complementary').getByRole('checkbox').first()).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('checklist_topic-03_0'))).toBe('true');
});
