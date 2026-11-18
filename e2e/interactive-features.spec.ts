import { test, expect } from '@playwright/test';

test.describe('Interactive Mini-Example & Learner Progress Bar', () => {
  test('HomePage displays interactive mini-example and allows step navigation', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { name: 'شاهد كيف تتحول فكرة بسيطة إلى مشروع حقيقي في 3 خطوات' });
    await expect(heading).toBeVisible();

    const tablist = page.getByRole('tablist', { name: 'خطوات تحويل الفكرة إلى مشروع' });
    await expect(tablist).toBeVisible();

    const prdPanel = page.locator('#step-panel-1');
    await expect(prdPanel).toBeVisible();
    await expect(prdPanel).toContainText('مخرج وثيقة المواصفات');

    const step2Tab = page.getByRole('tab', { name: /2\. شاشة التصميم/ });
    await step2Tab.click();

    const uiPanel = page.locator('#step-panel-2');
    await expect(uiPanel).toBeVisible();
    await expect(uiPanel).toContainText('محاكاة تفاعلية حية لشاشة التطبيق');

    await expect(uiPanel).toContainText('تم إنجاز 2 من أصل 3 مهام');
    const thirdTask = uiPanel.getByText('إضافة تصفية المهام وتأثيرات الإنجاز الحركية');
    await thirdTask.click();
    await expect(uiPanel).toContainText('تم إنجاز 3 من أصل 3 مهام');

    const step3Tab = page.getByRole('tab', { name: /3\. الكود النهائي النظيف/ });
    await step3Tab.click();

    const codePanel = page.locator('#step-panel-3');
    await expect(codePanel).toBeVisible();
    await expect(codePanel).toContainText('useTasks.ts');
  });

  test('HomePage displays learner progress bar and updates after completing a foundation checklist', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/أنجزت 0 من 6 في المرحلة التأسيسية/)).toBeVisible();

    const progressbar = page.getByRole('progressbar');
    await expect(progressbar).toBeVisible();
    await expect(progressbar).toHaveAttribute('aria-valuenow', '0');

    const privacyNotice = page.getByText(/تقدمك وقوائم التحقق تُحفظ تلقائياً في متصفحك على هذا الجهاز فقط، دون الحاجة لإنشاء حساب أو تسجيل دخول/);
    await expect(privacyNotice).toBeVisible();

    // Complete all checklist items for Topic 01 via the quick preview modal and verify live update
    await page.locator('article.topic-card').first().getByRole('button', { name: 'معاينة سريعة' }).click();
    const modal = page.getByRole('dialog');
    const checkboxes = modal.getByRole('group', { name: 'قائمة تحقق التطبيق', exact: true }).getByRole('checkbox');
    const count = await checkboxes.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
    await page.keyboard.press('Escape');

    await expect(page.getByText(/أنجزت 1 من 6 في المرحلة التأسيسية/)).toBeVisible();
  });

  test('StartPage (/start) displays the interactive mini-example under header', async ({ page }) => {
    await page.goto('/start');

    const heading = page.getByRole('heading', { name: 'شاهد كيف تتحول فكرة بسيطة إلى مشروع حقيقي في 3 خطوات' });
    await expect(heading).toBeVisible();

    const step1Tab = page.getByRole('tab', { name: /1\. الفكرة ووثيقة الـ PRD/ });
    await expect(step1Tab).toBeVisible();
  });
});
