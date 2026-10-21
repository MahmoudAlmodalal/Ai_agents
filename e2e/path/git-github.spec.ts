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
    const openModalBtn = gitCard.getByRole('button', { name: 'معاينة سريعة' });
    await openModalBtn.click();

    // Modal verification
    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Git: حفظ وثائق المشروع وتتبع النسخ محلياً');
    await expect(modal).toContainText('حماية الأسرار مبكراً');
    await expect(modal).toContainText('.gitignore');
    await expect(modal).toContainText('المخرجات المطلوبة:');
    await expect(modal).toContainText('قائمة تحقق التطبيق');

    // Link to full learning page from modal
    const fullPageLink = modal.locator('a[href*="/learn/git-project-docs"]').first();
    await expect(fullPageLink).toBeVisible();
  });

  test('learning page /learn/git-project-docs displays unified complete status, steps, and correct prev/next navigation', async ({ page }) => {
    await page.goto('/learn/git-project-docs');

    // Header and status
    await expect(page.locator('h1')).toContainText('Git: حفظ وثائق المشروع وتتبع النسخ محلياً');
    await expect(page.getByText('حالة التوفر: محتوى متاح (منشور)')).toBeVisible();

    // Practical steps on student project
    await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
    await expect(page.locator('article').first()).toContainText('git init');
    await expect(page.locator('article').first()).toContainText('.gitignore');
    await expect(page.locator('article').first()).toContainText('PROJECT_CONTEXT.md');

    // Outputs and Checklist
    await expect(page.getByText('المخرجات المطلوبة:')).toBeVisible();
    await expect(page.getByText('قائمة تحقق التطبيق')).toBeVisible();

    // Navigation bounds:
    // Prev points to published Topic 4 (srs).
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/srs');

    // Next points to Topic 6 (github-docs-collaboration)
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/github-docs-collaboration');
  });

  test('learning page /learn/github-docs-collaboration displays PR review, secrets protection, and navigation', async ({ page }) => {
    await page.goto('/learn/github-docs-collaboration');

    // Header and status
    await expect(page.locator('h1')).toContainText('GitHub: المستودع البعيد والمراجعة والتعاون وحماية الأسرار');
    await expect(page.getByText('حالة التوفر: محتوى متاح (منشور)')).toBeVisible();

    // Content: PR review, secrets protection, README template
    await expect(page.locator('article').first()).toContainText('Pull Request');
    await expect(page.locator('article').first()).toContainText('Secret Scanning');
    await expect(page.locator('article').first()).toContainText('README.md');

    // Official reference badge/notice
    await expect(page.locator('article').first()).toContainText('docs.github.com');

    // Navigation bounds:
    // Prev points to Topic 5 (git-project-docs)
    const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/git-project-docs');

    // Next points to the following topic
    const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextLink).toBeVisible();
  });

  test('Topic 05 (/learn/git-project-docs): renders learning sections, practical steps with expected outputs, and copyable bash code', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/learn/git-project-docs');

    // Authored learning sections
    await expect(page.locator('h3').filter({ hasText: 'المدخل: ملفات المشروع قبل أول حفظ' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'من مساحة العمل إلى commit' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'نطاق السر' })).toBeVisible();

    // Worked example inside learning activities
    const workedExample = page.locator('.learning-activities article').filter({ hasText: 'حفظ وثائق MVP' });
    await expect(workedExample).toBeVisible();
    await expect(workedExample).toContainText('docs/PROJECT_CONTEXT.md');
    await expect(workedExample).toContainText('.env.local');

    // Practical steps and expected outputs
    const stepsSection = page.getByRole('region', { name: 'خطوات التطبيق ومخرجاتها' });
    await expect(stepsSection).toBeVisible();
    await expect(stepsSection).toContainText('هيئ المستودع وأضف قواعد تجاهل ملفات البيئة');
    await expect(stepsSection).toContainText('دون إظهار ملفات الأسرار');
    await expect(stepsSection).toContainText('افحص الفرق والمرحلة، ثم احفظ الوثائق في commit');
    await expect(stepsSection).toContainText('commit أولي يضم الملفات المقصودة فقط');

    // Copy bash code block from topic content
    const codeContainer = page.locator('.code-container').filter({ hasText: 'git config --local user.name' }).first();
    await expect(codeContainer).toBeVisible();
    const copyBtn = codeContainer.locator('button.copy-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toContainText('✓ تم النسخ!');

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('git config --local user.name');
    expect(clipboardText).toContain('git config --local --get user.email');
  });

  test('Topic 05 (/learn/git-project-docs): quiz grades answers, provides explanations, supports unlimited retries and retains attempts', async ({ page }) => {
    await page.goto('/learn/git-project-docs');
    const activity = page.locator('.learning-activities');
    const quiz = activity.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
    await expect(quiz).toBeVisible();

    const qIgnore = quiz.getByRole('group', { name: /اكتشفت أن مفتاحاً حقيقياً/ });
    const qCommit = quiz.getByRole('group', { name: /أين تتحقق من الملفات التي ستدخل في commit/ });

    // Attempt 1: 1 correct (qIgnore), 1 wrong (qCommit)
    await qIgnore.getByRole('radio', { name: /يجب اعتبار السر مسرباً وتدويره/ }).check();
    await qCommit.getByRole('radio', { name: '`git remote -v`' }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    await expect(quiz.getByText(/صحيح: 1 · غير صحيح: 1 · بلا إجابة: 0/)).toBeVisible();
    await expect(qIgnore.getByRole('status')).toContainText('إجابة صحيحة');
    await expect(qIgnore.getByRole('status')).toContainText('قواعد التجاهل لا تعيد كتابة التاريخ');
    await expect(qCommit.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(qCommit.getByRole('status')).toContainText('مراجعة المرحلة والحالة تكشف بالضبط ما سيحفظ محلياً');

    // Attempt 2: retry and answer both correctly (re-check both after reset)
    await quiz.getByRole('button', { name: 'إعادة المحاولة', exact: true }).click();
    await qIgnore.getByRole('radio', { name: /يجب اعتبار السر مسرباً وتدويره/ }).check();
    await qCommit.getByRole('radio', { name: /git diff --cached/ }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
    await expect(qIgnore.getByRole('status')).toContainText('إجابة صحيحة');
    await expect(qCommit.getByRole('status')).toContainText('إجابة صحيحة');
    await expect(quiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();
  });

  test('Topic 05 (/learn/git-project-docs): practical rubric can be edited, reversed, and persists across reload', async ({ page }) => {
    await page.goto('/learn/git-project-docs');
    const activity = page.locator('.learning-activities');
    const practical = activity.getByRole('heading', { name: 'مراجعة ذاتية لمخرجات التمرين' }).locator('xpath=ancestor::section[1]');
    await expect(practical).toBeVisible();

    // Check declared outputs listed in outputs overview
    const outputsCard = practical.locator('div').filter({ hasText: 'مخرجات المشروع لمراجعتها' });
    await expect(outputsCard.locator('li').first()).toContainText('مستودع Git محلي');
    await expect(outputsCard.locator('li').nth(1)).toContainText('وثائق');

    const criterionIgnore = activity.getByRole('group', { name: 'فحص الأسرار قبل الحفظ' });
    const criterionHistory = activity.getByRole('group', { name: 'تاريخ قابل للمراجعة' });

    // Select initial rubric ratings
    await criterionIgnore.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await criterionHistory.getByLabel('اختيارك للتقييم الذاتي').selectOption('in-progress');

    // Wait for storage write
    await expect.poll(() => page.evaluate(() => {
      const raw = localStorage.getItem('ai-agents-practical-assessments-v1');
      const data = JSON.parse(raw ?? '{}');
      return data.byTopic?.['git-project-docs']?.ratings?.length ?? 0;
    })).toBe(2);

    // Verify persistence across reload
    await page.reload();
    const restoredIgnore = page.locator('.learning-activities').getByRole('group', { name: 'فحص الأسرار قبل الحفظ' });
    const restoredHistory = page.locator('.learning-activities').getByRole('group', { name: 'تاريخ قابل للمراجعة' });
    await expect(restoredIgnore.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(restoredHistory.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    // Reverse/clear one and change another
    await restoredIgnore.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await restoredHistory.getByLabel('اختيارك للتقييم الذاتي').selectOption('not-yet');

    await expect.poll(() => page.evaluate(() => {
      const raw = localStorage.getItem('ai-agents-practical-assessments-v1');
      const data = JSON.parse(raw ?? '{}');
      return data.byTopic?.['git-project-docs']?.ratings?.length ?? 0;
    })).toBe(1);

    await page.reload();
    await expect(page.locator('.learning-activities').getByRole('group', { name: 'فحص الأسرار قبل الحفظ' }).getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
    await expect(page.locator('.learning-activities').getByRole('group', { name: 'تاريخ قابل للمراجعة' }).getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('not-yet');
  });

  test('Topic 06 (/learn/github-docs-collaboration): renders sections, candidate video status, quiz grading, and rubric persistence', async ({ page }) => {
    await page.goto('/learn/github-docs-collaboration');
    const activity = page.locator('.learning-activities');

    // Authored learning sections
    await expect(page.locator('h3').filter({ hasText: 'المدخل: تاريخ محلي نظيف' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'المستودع البعيد وPull Request' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: 'النشر مسؤولية منفصلة' })).toBeVisible();

    // Worked example
    const workedExample = page.locator('.learning-activities article').filter({ hasText: 'مراجعة PRD قبل الدمج' });
    await expect(workedExample).toBeVisible();
    await expect(workedExample).toContainText('docs/prd');

    // External video candidate card
    const videoSection = page.locator('section[data-video-state="candidate"]');
    await expect(videoSection).toBeVisible();
    await expect(videoSection.getByText('مرشح — بانتظار المراجعة')).toBeVisible();
    await expect(videoSection.getByTestId('external-video-source')).toContainText('YouTube');
    await expect(videoSection).toContainText('GitHub Pull Requests Explained for Beginners');

    // Quiz grading
    const quiz = activity.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
    const qPr = quiz.getByRole('group', { name: /ما وظيفة Pull Request في رحلة توثيق مشروعك/ });
    const qRemote = quiz.getByRole('group', { name: /قبل أول push، ما الفحص الذي يساعدك/ });

    await qPr.getByRole('radio', { name: /يطلب مراجعة فرق فرع قبل دمجه في هدف محدد/ }).check();
    await qRemote.getByRole('radio', { name: /مراجعة `git remote -v` والفرع الحالي والمرحلة/ }).check();
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();

    await expect(quiz.getByText(/صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0/)).toBeVisible();
    await expect(qPr.getByRole('status')).toContainText('إجابة صحيحة');
    await expect(qRemote.getByRole('status')).toContainText('إجابة صحيحة');

    // Rubric persistence
    const criterionRemote = activity.getByRole('group', { name: 'وجهة معلومة' });
    const criterionReview = activity.getByRole('group', { name: 'مراجعة قبل الدمج' });

    await criterionRemote.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');
    await criterionReview.getByLabel('اختيارك للتقييم الذاتي').selectOption('ready-for-review');

    await expect.poll(() => page.evaluate(() => {
      const raw = localStorage.getItem('ai-agents-practical-assessments-v1');
      const data = JSON.parse(raw ?? '{}');
      return data.byTopic?.['github-docs-collaboration']?.ratings?.length ?? 0;
    })).toBe(2);

    await page.reload();
    await expect(page.locator('.learning-activities').getByRole('group', { name: 'وجهة معلومة' }).getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    await expect(page.locator('.learning-activities').getByRole('group', { name: 'مراجعة قبل الدمج' }).getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
  });

  test('RTL prose and LTR code styling integrity across Git and GitHub topic pages', async ({ page }) => {
    // Check Topic 05
    await page.goto('/learn/git-project-docs');
    const mainContainer05 = page.locator('div.max-w-6xl[dir="rtl"]');
    await expect(mainContainer05).toBeVisible();

    const codeContainers05 = page.locator('.code-container');
    const count05 = await codeContainers05.count();
    expect(count05).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < count05; i++) {
      await expect(codeContainers05.nth(i)).toHaveAttribute('dir', 'ltr');
    }

    // Check Topic 06
    await page.goto('/learn/github-docs-collaboration');
    const mainContainer06 = page.locator('div.max-w-6xl[dir="rtl"]');
    await expect(mainContainer06).toBeVisible();

    const codeContainers06 = page.locator('.code-container');
    const count06 = await codeContainers06.count();
    expect(count06).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < count06; i++) {
      await expect(codeContainers06.nth(i)).toHaveAttribute('dir', 'ltr');
    }
  });

  test('Mobile layout viewport (390px) renders without horizontal overflow for Git and GitHub topics', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Topic 05 mobile check
    await page.goto('/learn/git-project-docs');
    await page.waitForLoadState('domcontentloaded');
    const overflow05 = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow05).toBe(false);

    // Topic 06 mobile check
    await page.goto('/learn/github-docs-collaboration');
    await page.waitForLoadState('domcontentloaded');
    const overflow06 = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow06).toBe(false);
  });

  test('copies PROMPT 04 documentation setup prompt with feedback and verified payload', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/prompts/prompt-04-github-documentation-setup');

    // Title and metadata
    const header = page.locator('header.rounded-3xl');
    await expect(header.locator('h1')).toContainText('GitHub Documentation Setup');
    await expect(header.getByText('04', { exact: true })).toBeVisible();
    await expect(header.getByText(/المصدر:.*PROMPT 04/)).toBeVisible();

    // Click copy button
    const copyBtn = page.getByRole('button', { name: 'نسخ النسخة المحددة', exact: true });
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
