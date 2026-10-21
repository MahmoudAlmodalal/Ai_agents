import { expect, test } from '@playwright/test';

const deploymentTopics = [
  {
    slug: 'vercel-frontend-deployment',
    title: 'نشر واجهة Next.js على Vercel',
    publicCheck: 'NEXT_PUBLIC_API_BASE_URL',
    referenceHost: 'vercel.com',
    referencesMinimum: 5,
    skipSlugs: ['netlify-frontend-deployment', 'backend-database-deployment'],
  },
  {
    slug: 'netlify-frontend-deployment',
    title: 'نشر واجهة Next.js على Netlify',
    publicCheck: 'NEXT_PUBLIC_API_BASE_URL',
    referenceHost: 'docs.netlify.com',
    referencesMinimum: 5,
    skipSlugs: ['vercel-frontend-deployment', 'backend-database-deployment'],
  },
  {
    slug: 'backend-database-deployment',
    title: 'نشر Backend وربطه بقاعدة البيانات',
    publicCheck: 'DATABASE_URL',
    referenceHost: 'render.com',
    referencesMinimum: 7,
    skipSlugs: [],
  },
] as const;

test.describe('Sequential Project Path - Ticket 18: Cloud Deployment', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  for (const topic of deploymentTopics) {
    test(`${topic.slug}: renders deployment guidance, references, skip links, and copyable snippets`, async ({ page }) => {
      await page.goto(`/learn/${topic.slug}`);

      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('h1')).toContainText(topic.title);

      const content = page.locator('article').first();
      await expect(content).toContainText(topic.publicCheck);

      for (const slug of topic.skipSlugs) {
        await expect(content.locator(`a[href="/learn/${slug}"]`).first()).toBeVisible();
      }

      const references = content.locator('.references-block a[target="_blank"]');
      expect(await references.count()).toBeGreaterThanOrEqual(topic.referencesMinimum);
      const hrefs = await references.evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
      expect(hrefs.every((href) => new URL(href).hostname.endsWith(topic.referenceHost))).toBeTruthy();
      await expect(references.first()).toHaveAttribute('rel', 'noopener noreferrer');

      const codeBlocks = content.locator('.code-container');
      const codeBlockCount = await codeBlocks.count();
      expect(codeBlockCount).toBeGreaterThan(0);

      for (let index = 0; index < codeBlockCount; index += 1) {
        const codeBlock = codeBlocks.nth(index);
        await expect(codeBlock).toHaveAttribute('dir', 'ltr');
        const code = codeBlock.locator('code');
        const expectedClipboardText = await code.innerText();
        const copyButton = codeBlock.locator('.copy-btn');
        await expect(copyButton).toBeVisible();
        await copyButton.click();
        await expect(copyButton).toContainText('✓ تم النسخ!');
        await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedClipboardText);
      }
    });
  }
});
