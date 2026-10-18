import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Ticket 03 (Git & GitHub)', () => {
  test('home cards display genuine Git and GitHub metadata without UML/lecture leftovers', async ({ page }) => {
    await page.goto('/');

    // 1. Locate Git topic card
    const gitCard = page.locator('article.topic-card').filter({ hasText: 'Git: حفظ وثائق المشروع وتتبع النسخ محلياً' }).first();
    await expect(gitCard).toBeVisible();

    // Verify Git card metadata: real Git summary, tags, and not UML
    await expect(gitCard).toContainText('المرحلة التأسيسية');
    await expect(gitCard).toContainText('.gitignore');
    await expect(gitCard).toContainText('PROJECT_CONTEXT.md');
    await expect(gitCard).not.toContainText('PlantUML');
    await expect(gitCard).not.toContainText('بانتظار اعتماد المحتوى');

    // 2. Locate GitHub topic card
    const githubCard = page.locator('article.topic-card').filter({ hasText: 'GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار' }).first();
    await expect(githubCard).toBeVisible();

    // Verify GitHub card metadata: remote repo, PR, README
    await expect(githubCard).toContainText('Pull Request');
    await expect(githubCard).toContainText('README.md');
    await expect(githubCard).toContainText('المستودع البعيد');
    await expect(githubCard).not.toContainText('PlantUML');
  });

  test('modal reader displays Git topic details, checklist, outputs, and navigation link', async ({ page }) => {
    await page.goto('/');

    const gitCard = page.locator('article.topic-card').filter({ hasText: 'Git: حفظ وثائق المشروع وتتبع النسخ محلياً' }).first();
    const openModalBtn = gitCard.getByRole('button', { name: 'تصفح الموضوع بالتفصيل' });
    await openModalBtn.click();

    // Modal verification
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Git: حفظ وثائق المشروع وتتبع النسخ محلياً');
    await expect(modal).toContainText('حماية الأسرار مبكراً');
    await expect(modal).toContainText('.gitignore');
    await expect(modal).toContainText('المخرجات المطلوبة:');
    await expect(modal).toContainText('قائمة التحقق والإنجاز:');

    // Link to full learning page from modal
    const fullPageLink = modal.locator('a[href*="/learn/git-project-docs"]').first();
    await expect(fullPageLink).toBeVisible();
  });

  test('learning page /learn/git-project-docs displays unified complete status, steps, and correct prev/next navigation', async ({ page }) => {
    await page.goto('/learn/git-project-docs');

    // Header and status
    await expect(page.locator('h1')).toContainText('Git: حفظ وثائق المشروع وتتبع النسخ محلياً');
    await expect(page.getByText('مسار موحد مكتمل ✓')).toBeVisible();

    // Practical steps on student project
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('article')).toContainText('git init');
    await expect(page.locator('article')).toContainText('.gitignore');
    await expect(page.locator('article')).toContainText('PROJECT_CONTEXT.md');

    // Outputs and Checklist
    await expect(page.getByText('المخرجات المطلوبة:')).toBeVisible();
    await expect(page.getByText('قائمة الإنجاز والتحقق')).toBeVisible();

    // Navigation bounds:
    // Prev points to Topic 1 (project-idea-mvp)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/project-idea-mvp');

    // Next points to Topic 6 (github-docs-collaboration)
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/github-docs-collaboration');
  });

  test('learning page /learn/github-docs-collaboration displays PR review, secrets protection, and navigation', async ({ page }) => {
    await page.goto('/learn/github-docs-collaboration');

    // Header and status
    await expect(page.locator('h1')).toContainText('GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار');
    await expect(page.getByText('مسار موحد مكتمل ✓')).toBeVisible();

    // Content: PR review, secrets protection, README template
    await expect(page.locator('article')).toContainText('Pull Request');
    await expect(page.locator('article')).toContainText('Secret Scanning');
    await expect(page.locator('article')).toContainText('README.md');

    // Official reference badge/notice
    await expect(page.locator('article')).toContainText('docs.github.com');

    // Navigation bounds:
    // Prev points to Topic 5 (git-project-docs)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/git-project-docs');

    // Next points to the following topic
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
  });

  test('copies PROMPT 04 documentation setup prompt with feedback and verified payload', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/prompts/prompt-04-github-documentation-setup');

    // Title and metadata
    await expect(page.locator('h1')).toContainText('GitHub Documentation Setup');
    await expect(page.getByText('PROMPT 04', { exact: true })).toBeVisible();

    // Click copy button
    const copyBtn = page.getByRole('button', { name: /نسخ البرومبت/ });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Feedback confirmation
    await expect(page.getByText('تم النسخ')).toBeVisible();

    // Clipboard verification
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('Git and GitHub documentation mentor');
    expect(clipboardText).toContain('Do not run destructive commands or publish secrets');
  });
});
