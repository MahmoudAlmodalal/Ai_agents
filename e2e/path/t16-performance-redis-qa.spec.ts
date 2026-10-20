import { test, expect } from '@playwright/test';

const officialLinks = {
  performance: [
    'https://www.postgresql.org/docs/current/using-explain.html',
    'https://www.postgresql.org/docs/current/indexes.html',
    'https://www.postgresql.org/docs/current/pgstatstatements.html',
    'https://docs.djangoproject.com/en/stable/topics/db/optimization/',
  ],
  redis: [
    'https://redis.io/docs/latest/develop/use-cases/cache-aside/',
    'https://redis.io/docs/latest/develop/data-types/strings/',
    'https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/',
    'https://docs.celeryq.dev/en/stable/getting-started/introduction.html',
  ],
  qa: [
    'https://www.w3.org/TR/WCAG22/',
    'https://www.w3.org/WAI/test-evaluate/',
    'https://playwright.dev/docs/intro',
  ],
};

test.describe('Sequential Project Path - Ticket 16: Performance, Redis, and QA', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Topic 47: measured database performance, copyable diagnostic, and official references', async ({ page }) => {
    await page.goto('/learn/database-performance-engineering');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('هندسة أداء قاعدة البيانات');
    await expect(page.locator('header.rounded-3xl')).toContainText('موضوع 47');

    const article = page.locator('article').first();
    await expect(article).toContainText('لا تبدأ بقائمة تحسينات جاهزة');
    await expect(article).toContainText('عالج N+1 حين يثبتها عدّ الاستعلامات');
    await expect(article).toContainText('أضف فهرسًا لاستعلام مرصود');
    await expect(article).toContainText('افحص التزامن فقط عندما يظهر الاختناق تحت حمل ممثل');
    await expect(article).toContainText('docs/DATABASE_PERFORMANCE_REPORT.md');

    const codeBlock = article.locator('#topic-47-database-performance .code-container');
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');
    const copyButton = codeBlock.getByRole('button', { name: 'نسخ مثال EXPLAIN لخطة استعلام' });
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('EXPLAIN (ANALYZE, BUFFERS)');
    expect(copied).toContain('FROM loan_requests');

    for (const href of officialLinks.performance) {
      const link = article.locator(`a[href="${href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noreferrer/);
    }
  });

  test('Topic 48: explicit Redis skip path, safe adoption criteria, and references', async ({ page }) => {
    await page.goto('/learn/redis-optional-infrastructure');
    await expect(page.locator('h1')).toContainText('Redis: قرار مشروط');
    await expect(page.locator('header.rounded-3xl')).toContainText('موضوع 48');

    const article = page.locator('article').first();
    await expect(article).toContainText('اختر مسار التجاوز');
    await expect(article).toContainText('إذا لم تثبت الحاجة');
    await expect(article).toContainText('مصدر الحقيقة');
    await expect(article).toContainText('TTL والإبطال');
    await expect(article).toContainText('docs/REDIS_DECISION.md');

    const codeBlock = article.locator('#topic-48-redis .code-container');
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');
    const copyButton = codeBlock.getByRole('button', { name: 'نسخ قالب قرار Redis' });
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('Status: Not needed | Trial | Adopted');
    expect(copied).toContain('Evidence and baseline:');

    for (const href of officialLinks.redis) {
      const link = article.locator(`a[href="${href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noreferrer/);
    }
  });

  test('Topic 49: QA dimensions, honest statuses, copyable report, and references', async ({ page }) => {
    await page.goto('/learn/integrated-project-qa');
    await expect(page.locator('h1')).toContainText('QA: مراجعة متكاملة');
    await expect(page.locator('header.rounded-3xl')).toContainText('موضوع 49');

    const article = page.locator('article').first();
    await expect(article).toContainText('Passed');
    await expect(article).toContainText('Failed');
    await expect(article).toContainText('Not Run');
    await expect(article).toContainText('اربط الفحص بمتطلب ومعيار قبول');
    await expect(article).toContainText('قارن بالتصميم المعتمد');
    await expect(article).toContainText('اختبر التجاوب عبر أحجام محددة');
    await expect(article).toContainText('راجع الوصول يدويًا');
    await expect(article).toContainText('أعد اختبار التكامل');
    await expect(article).toContainText('docs/FINAL_QA_REPORT.md');

    const codeBlock = article.locator('#topic-49-qa .code-container');
    await expect(codeBlock).toHaveAttribute('dir', 'ltr');
    const copyButton = codeBlock.getByRole('button', { name: 'نسخ قالب سجل QA' });
    await copyButton.click();
    await expect(copyButton).toContainText('✓ تم النسخ!');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain('| Status | Follow-up |');
    expect(copied).toContain('Not Run: 1');

    for (const href of officialLinks.qa) {
      const link = article.locator(`a[href="${href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noreferrer/);
    }
  });

  test('All three lessons fit the supported viewport widths without horizontal page overflow', async ({ page }) => {
    const lessons = [
      '/learn/database-performance-engineering',
      '/learn/redis-optional-infrastructure',
      '/learn/integrated-project-qa',
    ];
    const widths = [390, 768, 1024, 1366, 1440];

    for (const path of lessons) {
      await page.goto(path);
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await expect(page.locator('article').first()).toBeVisible();
        const noPageOverflow = await page.evaluate(() =>
          document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
        );
        expect(noPageOverflow, `${path} overflows at ${width}px`).toBeTruthy();
      }
    }
  });
});
