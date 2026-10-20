import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Topic 17: Docker and Linux', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Topic 50 (Docker): conditional framework-specific examples, copy and official references', async ({ page }) => {
    await page.goto('/learn/docker-container-workflow');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('Docker');
    await expect(page.locator('header.rounded-3xl')).toContainText('موضوع 50');
    await expect(page.locator('header.rounded-3xl')).toContainText('docs/DOCKER_DECISION.md');

    const article = page.locator('article').first();
    await expect(article).toContainText('هل يحتاج مشروعك Docker؟');
    await expect(article).toContainText('FastAPI أو Django');
    await expect(article).toContainText('Next.js');
    await expect(article).toContainText('build context');
    await expect(article).toContainText('.dockerignore');
    await expect(article).toContainText('BuildKit secret mount');
    await expect(article).toContainText('USER app');
    await expect(article).toContainText('127.0.0.1:8000:8000');
    await expect(article).toContainText('الموقع لا يثبت Docker ولا يبني صورة ولا يشغّل حاوية');
    await expect(page.getByRole('link', { name: /الموضوع التالي/ })).toHaveAttribute('href', '/learn/linux-server-operations');

    const dockerfileBlock = article.locator('.code-container').first();
    await expect(dockerfileBlock).toHaveAttribute('dir', 'ltr');
    const expectedText = await dockerfileBlock.locator('code').textContent();
    const copyButton = dockerfileBlock.getByRole('button', { name: 'نسخ مثال Dockerfile' });
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedText);

    const references = [
      { name: /Dockerfile reference/, href: 'https://docs.docker.com/reference/dockerfile/' },
      { name: /Docker build best practices/, href: 'https://docs.docker.com/build/building/best-practices/' },
      { name: /Build secrets/, href: 'https://docs.docker.com/build/building/secrets/' },
      { name: /docker run reference/, href: 'https://docs.docker.com/reference/cli/docker/container/run/' },
      { name: /Compose environment variables/, href: 'https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/' },
      { name: /Docker rootless mode/, href: 'https://docs.docker.com/engine/security/rootless/' },
      { name: /Next.js standalone output/, href: 'https://nextjs.org/docs/app/api-reference/config/next-config-js/output' },
    ];
    for (const reference of references) {
      const link = article.getByRole('link', { name: reference.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', reference.href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('Topic 51 (Linux): conditional host operations, permission safety, copy and Linux references', async ({ page }) => {
    await page.goto('/learn/linux-server-operations');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('Linux');
    await expect(page.locator('header.rounded-3xl')).toContainText('موضوع 51');
    await expect(page.locator('header.rounded-3xl')).toContainText('docs/LINUX_RUNTIME_NOTES.md');

    const article = page.locator('article').first();
    await expect(article).toContainText('متى تتعلم تشغيل Linux؟');
    await expect(article).toContainText('إذا كانت الاستضافة مُدارة');
    await expect(article).toContainText('ما يمكن للمالك والمجموعة والآخرين فعله');
    await expect(article).toContainText('chmod -R 777');
    await expect(article).toContainText('حساب خدمة مخصص غير root');
    await expect(article).toContainText('مدير أسرار المنصة');
    await expect(page.getByRole('link', { name: /الموضوع السابق/ })).toHaveAttribute('href', '/learn/docker-container-workflow');

    const readOnlyBlock = article.locator('.code-container').first();
    await expect(readOnlyBlock).toHaveAttribute('dir', 'ltr');
    await expect(readOnlyBlock.locator('code')).toContainText('id');
    await expect(readOnlyBlock.locator('code')).toContainText('stat -c');
    const expectedText = await readOnlyBlock.locator('code').textContent();
    const copyButton = readOnlyBlock.getByRole('button', { name: 'نسخ أوامر فحص Linux للقراءة' });
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expectedText);

    const references = [
      { name: /Linux man-pages: ls\(1\)/, href: 'https://man7.org/linux/man-pages/man1/ls.1.html' },
      { name: /Linux man-pages: chmod\(1\)/, href: 'https://man7.org/linux/man-pages/man1/chmod.1.html' },
      { name: /Linux man-pages: chown\(1\)/, href: 'https://man7.org/linux/man-pages/man1/chown.1.html' },
      { name: /Linux man-pages: umask\(2\)/, href: 'https://man7.org/linux/man-pages/man2/umask.2.html' },
    ];
    for (const reference of references) {
      const link = article.getByRole('link', { name: reference.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', reference.href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
