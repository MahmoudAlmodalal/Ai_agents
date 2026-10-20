import { test, expect } from '@playwright/test';

test.describe('Prompt Library Journey', () => {
  test('searches, filters, opens a prompt by keyboard, and copies the complete text', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/prompts');
    await expect(page.getByRole('heading', { level: 1, name: 'مكتبة البرومبتات' })).toBeVisible();

    const cards = page.locator('a[href^="/prompts/"]');
    const fullLibraryCount = await cards.count();
    await expect(page.getByTestId('prompt-library-count')).toContainText(`${fullLibraryCount} نصًا قابلًا للنسخ`);
    expect(fullLibraryCount).toBeGreaterThan(30);

    const search = page.getByRole('searchbox', { name: 'ابحث في البرومبتات' });
    await search.fill('User Flow');
    await expect(cards.filter({ hasText: 'User Flow' }).first()).toBeVisible();
    await expect(page.getByText(/يعرض \d+ من/)).toBeVisible();

    await search.fill('');
    await page.getByLabel('صفِّ حسب نوع العملية').selectOption('توليد مخطط');
    const filteredCards = page.locator('a[href^="/prompts/"]');
    await expect(filteredCards.first()).toBeVisible();
    await expect(filteredCards.first()).toContainText('توليد مخطط');

    await page.getByLabel('صفِّ حسب نوع العملية').selectOption('all');
    const firstPromptCard = page.locator('a[href="/prompts/prompt-01-grill-me-product-discovery"]');
    await firstPromptCard.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/prompts\/prompt-01-grill-me-product-discovery$/);

    const promptBody = page.locator('pre').last();
    const fullPromptText = await promptBody.textContent();
    const copyButton = page.getByRole('button', { name: 'نسخ النسخة المحددة' });
    await expect(copyButton).toBeVisible();
    await copyButton.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(fullPromptText);

    await expect(page.getByRole('link', { name: 'اختيار فكرة المشروع وتحديد MVP' })).toHaveAttribute('href', '/learn/project-idea-mvp');
  });

  test('reports a clipboard failure instead of claiming the prompt was copied', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async () => { throw new Error('permission denied'); } },
      });
      document.execCommand = () => false;
    });
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('النص الكامل ظاهر؛ حدده وانسخه يدويًا');
    await expect(page.getByRole('status')).not.toContainText('تم نسخ النص الكامل للنسخة المحددة.');
  });

  test('copies the complete selected prompt through the legacy clipboard fallback when the Clipboard API is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
      document.execCommand = (command: string) => {
        (window as typeof window & { legacyCopiedText?: string }).legacyCopiedText = document.querySelector('textarea')?.value;
        return command === 'copy';
      };
    });
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    const fullText = await page.locator('pre').last().textContent();
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => (window as typeof window & { legacyCopiedText?: string }).legacyCopiedText)).toBe(fullText);
  });

  test('links the deployment example to the canonical backend and database topic', async ({ page }) => {
    await page.goto('/prompts/stage-example-deployment');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('مثال مرحلي: النشر');
    const relatedTopics = page.getByRole('heading', { name: 'الموضوعات المرتبطة' }).locator('xpath=..');
    const deploymentTopic = relatedTopics.getByRole('link', { name: 'نشر Backend وربطه بقاعدة البيانات' });
    await expect(deploymentTopic).toHaveAttribute('href', '/learn/backend-database-deployment');
    await deploymentTopic.click();
    await expect(page).toHaveURL(/\/learn\/backend-database-deployment$/);
  });

  test('search-to-edit-to-copy: switches original/custom, saves, survives reload, and resets cleanly', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/prompts');

    const search = page.getByRole('searchbox', { name: 'ابحث في البرومبتات' });
    await search.fill('Grill Me');
    const targetCard = page.locator('a[href="/prompts/prompt-01-grill-me-product-discovery"]');
    await expect(targetCard).toBeVisible();
    await targetCard.click();
    await expect(page).toHaveURL(/\/prompts\/prompt-01-grill-me-product-discovery$/);

    const originalPre = page.locator('pre').last();
    const originalText = await originalPre.textContent();
    expect(originalText).toBeTruthy();

    // Copy original version
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(originalText);

    // Switch to custom mode
    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    const editor = page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت');
    await expect(editor).toBeVisible();
    await expect(editor).toHaveValue(originalText!);

    // Edit custom text for learner project
    const customText = `${originalText}\n\n# Learner Project Customization\nFocus on BorrowHub equipment inventory.`;
    await editor.fill(customText);

    // Switch back to original mode to verify original source text is preserved
    await page.getByRole('button', { name: 'الأصل', exact: true }).click();
    await expect(page.locator('pre').last()).toHaveText(originalText!);
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(originalText);

    // Switch back to custom mode, verify draft is preserved
    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    await expect(editor).toHaveValue(customText);

    // Save customization explicitly
    await page.getByRole('button', { name: 'حفظ التخصيص' }).click();
    await expect(page.getByRole('status')).toContainText('حُفظ هذا التخصيص محليًا');

    // Copy selected custom version
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(customText);

    // Reload page and verify custom text is retained
    await page.reload();
    await expect(page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت')).toHaveValue(customText);

    // Reset customization
    await page.getByRole('button', { name: 'إعادة إلى الأصل وحذف التخصيص' }).click();
    await expect(page.getByRole('status')).toContainText('عادت النسخة المحددة إلى النص الأصلي وحُذف تخصيص هذا البرومبت.');
    await expect(page.locator('pre').last()).toHaveText(originalText!);

    // Reload and verify clean return to original
    await page.reload();
    await expect(page.locator('pre').last()).toHaveText(originalText!);
  });

  test('flags a stale source revision coherently while preserving the learner customization', async ({ page }) => {
    const promptSlug = 'prompt-01-grill-me-product-discovery';
    const staleCustomText = 'Custom text saved against older prompt revision';
    await page.addInitScript(({ slug, text }) => {
      localStorage.setItem('ai-agents-prompt-customizations-v1', JSON.stringify({
        schemaVersion: 1,
        records: {
          [slug]: {
            promptSlug: slug,
            text,
            sourceRevision: 'fnv1a-outdated-hash',
            updatedAt: '2026-10-19T12:00:00.000Z',
          },
        },
      }));
    }, { slug: promptSlug, text: staleCustomText });

    await page.goto(`/prompts/${promptSlug}`);
    const editor = page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت');
    await expect(editor).toBeVisible();
    await expect(editor).toHaveValue(staleCustomText);

    const staleNotice = page.getByRole('status').filter({ hasText: 'تغير النص الأصلي منذ حفظ هذا التخصيص' });
    await expect(staleNotice).toBeVisible();

    await page.getByRole('button', { name: 'الأصل', exact: true }).click();
    const originalText = await page.locator('pre').last().textContent();
    expect(originalText).not.toBe(staleCustomText);
  });

  test('reports storage failure honestly when saving customization fails due to quota or storage error', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        if (key === 'ai-agents-prompt-customizations-v1') {
          throw new DOMException('QuotaExceededError', 'QuotaExceededError');
        }
        return originalSetItem.call(this, key, value);
      };
    });

    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    const editor = page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت');
    await editor.fill('In-session draft that fails to save to localStorage');

    await page.getByRole('button', { name: 'حفظ التخصيص' }).click();

    await expect(page.getByRole('status').filter({ hasText: 'التخصيص متاح في هذه الجلسة، لكن تعذر حفظه محليًا.' })).toBeVisible();
    await expect(page.getByRole('status').filter({ hasText: 'هناك تخصيصات في الجلسة لم يتم حفظها على هذا الجهاز.' })).toBeVisible();

    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('In-session draft that fails to save to localStorage');
  });

  test('reports malformed customization storage honestly without overwriting or crashing', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('ai-agents-prompt-customizations-v1', '{ broken json content');
    });

    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    await expect(page.getByRole('status').filter({ hasText: 'بيانات التخصيص المحلية غير صالحة؛ لم تُستبدل.' })).toBeVisible();

    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    await page.getByRole('button', { name: 'حفظ التخصيص' }).click();
    await expect(page.getByRole('status').filter({ hasText: 'بيانات التخصيص المحفوظة غير صالحة؛ تُركت دون تغيير.' })).toBeVisible();

    const raw = await page.evaluate(() => localStorage.getItem('ai-agents-prompt-customizations-v1'));
    expect(raw).toBe('{ broken json content');
  });
});
