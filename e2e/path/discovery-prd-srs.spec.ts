import { test, expect } from '@playwright/test';

test.describe('Sequential Project Path - Topic 02: Discovery, PRD, and SRS', () => {
  test('Home cards display Topics 02, 03, and 04 in sequence with full detail modal', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');

    // 2. Locate Topic 02, 03, 04 cards
    const cards = page.locator('article.topic-card');
    await expect(cards.filter({ hasText: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' })).toBeVisible();
    await expect(cards.filter({ hasText: 'وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها' })).toBeVisible();
    await expect(cards.filter({ hasText: 'مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول' })).toBeVisible();

    // 3. Open detail modal for Topic 02 (Grill Me)
    const topic02Card = cards.filter({ hasText: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' });
    await topic02Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('استجواب الفكرة واستكشاف المتطلبات (Grill Me)');
    await expect(modal).toContainText('docs/DECISIONS_LOG.md');
    await expect(modal).toContainText('خطوات التطبيق على مشروعك:');

    // Close modal
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('Sequential navigation across Topic 01 -> Topic 02 -> Topic 03 -> Topic 04', async ({ page }) => {
    // 1. Start from Topic 01 (/learn/project-idea-mvp)
    await page.goto('/learn/project-idea-mvp');
    await expect(page.locator('h1')).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // Next link should lead to Topic 02 (discovery-grill-me)
    const nextTo02 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextTo02).toBeVisible();
    await expect(nextTo02).toHaveAttribute('href', '/learn/discovery-grill-me');
    await nextTo02.click();

    // 2. Arrive at Topic 02 (Grill Me)
    await expect(page).toHaveURL(/\/learn\/discovery-grill-me/);
    await expect(page.locator('h1')).toContainText('استجواب الفكرة واستكشاف المتطلبات (Grill Me)');
    const topic02Header = page.locator('header.rounded-3xl');
    await expect(topic02Header).toContainText('حالة التوفر: محتوى متاح (منشور)');
    await expect(topic02Header).toContainText('docs/DECISIONS_LOG.md');

    // Check prerequisites note that no coding agent, skills or MCP are needed
    await expect(page.locator('article').first()).toContainText('لا يشترط تثبيت أي أدوات برمجية للواجهة أو مهارات Skills أو خوادم MCP');

    // Prev link points to Topic 01, Next link points to Topic 03
    const prevTo01 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevTo01).toBeVisible();
    await expect(prevTo01).toHaveAttribute('href', '/learn/project-idea-mvp');

    const nextTo03 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextTo03).toBeVisible();
    await expect(nextTo03).toHaveAttribute('href', '/learn/prd-specification');
    await nextTo03.click();

    // 3. Arrive at Topic 03 (PRD with 27 sections)
    await expect(page).toHaveURL(/\/learn\/prd-specification/);
    await expect(page.locator('h1')).toContainText('وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها');
    const topic03Header = page.locator('header.rounded-3xl');
    await expect(topic03Header).toContainText('docs/PRD.md');
    await expect(topic03Header).toContainText('docs/PRD_REVIEW.md');

    // Verify 27 sections table presence
    await expect(page.locator('table')).toContainText('Product Overview');
    await expect(page.locator('table')).toContainText('Recommended Development Phases');

    // Prev link points to Topic 02, Next link points to Topic 04
    const prevTo02 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevTo02).toBeVisible();
    await expect(prevTo02).toHaveAttribute('href', '/learn/discovery-grill-me');

    const nextTo04 = page.getByRole('link', { name: /الموضوع التالي/ });
    await expect(nextTo04).toBeVisible();
    await expect(nextTo04).toHaveAttribute('href', '/learn/srs');
    await nextTo04.click();

    // 4. Arrive at Topic 04 (SRS)
    await expect(page).toHaveURL(/\/learn\/srs/);
    await expect(page.locator('h1')).toContainText('مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول');
    const topic04Header = page.locator('header.rounded-3xl');
    await expect(topic04Header).toContainText('docs/SRS.md');

    // Verify PRD vs SRS comparison & Given / When / Then criteria
    await expect(page.locator('article').first()).toContainText('Given');
    await expect(page.locator('article').first()).toContainText('When');
    await expect(page.locator('article').first()).toContainText('Then');

    // Prev link points back to Topic 03
    const prevTo03 = page.getByRole('link', { name: /الموضوع السابق/ });
    await expect(prevTo03).toBeVisible();
    await expect(prevTo03).toHaveAttribute('href', '/learn/prd-specification');
  });

  test('Prompts library copy action and topic modal assumptions vs open questions', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // 1. Visit Topic 02 in modal to verify distinctions
    await page.goto('/');
    const topic02Card = page.locator('article.topic-card').filter({ hasText: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)' });
    await topic02Card.getByRole('button', { name: 'معاينة سريعة' }).click();

    const modal = page.locator('.modal-container-box');
    await expect(modal).toBeVisible();

    // Verify distinction between confirmed decisions, assumptions, and open questions
    await expect(modal).toContainText('قرارات معتمدة');
    await expect(modal).toContainText('افتراضات مقترحة');
    await expect(modal).toContainText('أسئلة مفتوحة');

    // Check code content is rendered
    const codeBlock = modal.locator('pre.code-content').first();
    await expect(codeBlock).toContainText('/grill-me');

    // Close modal
    await page.keyboard.press('Escape');

    // 2. Open Prompt 01 in prompts library and test copying
    await page.goto('/prompts/prompt-01-grill-me-product-discovery');
    await expect(page.locator('h1')).toContainText('Grill Me: Product Discovery');

    const copyBtn = page.getByRole('button', { name: 'نسخ النسخة المحددة', exact: true });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(page.getByText('تم النسخ')).toBeVisible();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('/grill-me');
    expect(clipboardText).toContain('ONE question at a time');
  });

  test('PRD topic grounds 27 sections and review prompt', async ({ page }) => {
    await page.goto('/learn/prd-specification');

    // Check for Prompt 02 and Prompt 03 in the content
    await expect(page.locator('article').first()).toContainText('PROMPT 02');
    await expect(page.locator('article').first()).toContainText('27 sections');
    await expect(page.locator('article').first()).toContainText('PROMPT 03');
    await expect(page.locator('article').first()).toContainText('PRD Review');

    // Verify that decisions precede generated documents
    await expect(page.locator('article').first()).toContainText('docs/DECISIONS_LOG.md');
    await expect(page.locator('article').first()).toContainText('Single Source of Truth');
  });

  test('SRS topic grounds system behavior, error states, and Given/When/Then acceptance criteria', async ({ page }) => {
    await page.goto('/learn/srs');

    // Check behavior components
    await expect(page.locator('article').first()).toContainText('Preconditions');
    await expect(page.locator('article').first()).toContainText('Input Validation');
    await expect(page.locator('article').first()).toContainText('State Transitions');

    // Check error handling & idempotency
    await expect(page.locator('article').first()).toContainText('Idempotency');
    await expect(page.locator('article').first()).toContainText('Race Conditions');

    // Check Given/When/Then scenarios
    await expect(page.locator('article').first()).toContainText('Happy Path Scenario');
    await expect(page.locator('article').first()).toContainText('Validation Rejection');
  });

  test('Topics render sections, learning objectives, practical steps, and optional BorrowHub example across the group', async ({ page }) => {
    const topics = [
      {
        slug: 'discovery-grill-me',
        expectedTitle: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)',
        expectedHeading: '1. فلسفة المقابلة الاستجوابية (Grill Me) — إغلاق باب البرمجة التخمينية',
        expectedOutput: 'docs/DECISIONS_LOG.md',
        exampleKeyword: 'تحديد معنى الطلب النشط',
      },
      {
        slug: 'prd-specification',
        expectedTitle: 'وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها',
        expectedHeading: '1. ما هي وثيقة PRD وما وظيفتها الهندسية؟',
        expectedOutput: 'docs/PRD.md',
        exampleKeyword: 'تحويل قاعدة استعارة إلى PRD',
      },
      {
        slug: 'srs',
        expectedTitle: 'مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول',
        expectedHeading: '1. الفرق الجوهري بين وثيقة PRD ومواصفات SRS',
        expectedOutput: 'docs/SRS.md',
        exampleKeyword: 'تتبع طلب استعارة',
      },
    ];

    for (const t of topics) {
      await page.goto(`/learn/${t.slug}`);
      await expect(page.locator('h1')).toContainText(t.expectedTitle);
      await expect(page.locator('article').first()).toContainText(t.expectedHeading);

      // Verify learning activities section, objectives, and practical steps
      const activity = page.locator('.learning-activities');
      await expect(activity.getByRole('heading', { name: 'أهداف التعلّم' })).toBeVisible();
      await expect(activity.getByRole('heading', { name: 'خطوات التطبيق ومخرجاتها' })).toBeVisible();
      await expect(activity).toContainText(t.expectedOutput);

      // Verify BorrowHub worked example is explicitly marked optional
      await expect(activity.getByRole('heading', { name: 'أمثلة محلولة' })).toBeVisible();
      await expect(activity).toContainText('مثال اختياري');
      await expect(activity).toContainText(t.exampleKeyword);

      // Verify external video candidate section presence
      await expect(activity.getByRole('heading', { name: 'موارد فيديو خارجية' })).toBeVisible();
      await expect(activity).toContainText('مرشح — بانتظار المراجعة');
    }
  });

  test('Practical step code blocks and prompt copy buttons provide feedback and clipboard payload', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // 1. Check copy on Topic 02 (discovery-grill-me)
    await page.goto('/learn/discovery-grill-me');
    const copyBtns02 = page.locator('.code-container button.copy-btn');
    const promptCopyBtn = copyBtns02.first();
    await expect(promptCopyBtn).toBeVisible();
    await promptCopyBtn.click();
    await expect(promptCopyBtn).toContainText('تم النسخ');
    let clipText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipText).toContain('/grill-me');

    // 2. Check copy on Topic 03 (prd-specification)
    await page.goto('/learn/prd-specification');
    const copyBtns03 = page.locator('.code-container button.copy-btn');
    const prdPromptCopy = copyBtns03.first();
    await expect(prdPromptCopy).toBeVisible();
    await prdPromptCopy.click();
    await expect(prdPromptCopy).toContainText('تم النسخ');
    clipText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipText).toContain('docs/PRD.md');

    // 3. Check copy on Topic 04 (srs)
    await page.goto('/learn/srs');
    const copyBtns04 = page.locator('.code-container button.copy-btn');
    const srsPromptCopy = copyBtns04.first();
    await expect(srsPromptCopy).toBeVisible();
    await srsPromptCopy.click();
    await expect(srsPromptCopy).toContainText('تم النسخ');
    clipText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipText).toContain('docs/SRS.md');
  });

  test('Interactive objective quiz grades responses, explains outcomes, and supports retries on discovery-grill-me', async ({ page }) => {
    await page.goto('/learn/discovery-grill-me');
    const activity = page.locator('.learning-activities');
    const quizHeading = activity.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' });
    await expect(quizHeading).toBeVisible();
    const quizSection = quizHeading.locator('xpath=ancestor::section[1]');

    // Find the two questions by their fieldsets
    const q1Fieldset = quizSection.getByRole('group', { name: /ما السلوك الصحيح عندما لا يعرف صاحب المشروع/ });
    const q2Fieldset = quizSection.getByRole('group', { name: /ماذا يجب أن يميز سجل القرار بينه وبين الافتراض/ });

    // Select correct answers for both questions:
    // Q1 correct: 'طرح سؤال محدد وتسجيله مفتوحاً حتى يجيب صاحب القرار'
    await q1Fieldset.getByRole('radio', { name: 'طرح سؤال محدد وتسجيله مفتوحاً حتى يجيب صاحب القرار' }).check();
    // Q2 correct: 'القرار مؤكد من صاحبه أو مصدر موثق؛ الافتراض ينتظر التحقق'
    await q2Fieldset.getByRole('radio', { name: 'القرار مؤكد من صاحبه أو مصدر موثق؛ الافتراض ينتظر التحقق' }).check();

    // Submit quiz
    const submitBtn = quizSection.getByRole('button', { name: 'إرسال الإجابات', exact: true });
    await submitBtn.click();

    // Verify grading banner: 2 / 2
    await expect(quizSection.getByText(/نتيجة (معاينة )?فحص ذاتي: 2 \/ 2/)).toBeVisible();
    await expect(q1Fieldset.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q1Fieldset.getByRole('status')).toContainText('Grill Me يكشف الغموض ولا يملك سلطة اختراع سياسة المنتج');
    await expect(q2Fieldset.getByRole('status')).toContainText('إجابة صحيحة في هذا الفحص الذاتي');
    await expect(q2Fieldset.getByRole('status')).toContainText('التوثيق يبين درجة اليقين ومصدره');

    // Click retry to test reset functionality
    const retryBtn = quizSection.getByRole('button', { name: 'إعادة المحاولة', exact: true });
    await expect(retryBtn).toBeVisible();
    await retryBtn.click();

    // Select an incorrect answer for Q1 and leave Q2 unanswered
    await q1Fieldset.getByRole('radio', { name: 'اختيار قاعدة افتراضية ومتابعة PRD' }).check();
    await submitBtn.click();

    // Verify incorrect feedback is displayed with review prompt and unanswered count
    await expect(quizSection.getByText(/نتيجة (معاينة )?فحص ذاتي: 0 \/ 2/)).toBeVisible();
    await expect(quizSection.getByText(/صحيح: 0 · غير صحيح: 1 · بلا إجابة: 1/)).toBeVisible();
    await expect(q1Fieldset.getByRole('status')).toContainText('الإجابة تحتاج إلى مراجعة');
    await expect(q1Fieldset.getByRole('status')).toContainText('Grill Me يكشف الغموض ولا يملك سلطة اختراع سياسة المنتج');
    await expect(q2Fieldset.getByRole('status')).toContainText('لم تُجب عن هذا السؤال');
  });

  test('Practical self-assessment rubric can be edited, reversed, and survives page reload', async ({ page }) => {
    await page.goto('/learn/discovery-grill-me');
    const activity = page.locator('.learning-activities');
    const rubricHeading = activity.getByRole('heading', { name: 'مراجعة ذاتية لمخرجات التمرين' });
    await expect(rubricHeading).toBeVisible();

    // Select rating for 'مصدر القرار' criterion
    const traceCriterion = activity.getByRole('group', { name: 'مصدر القرار' });
    const selectTrace = traceCriterion.getByLabel('اختيارك للتقييم الذاتي');
    await selectTrace.selectOption('ready-for-review');
    await expect(selectTrace).toHaveValue('ready-for-review');

    // Select rating for 'انضباط المقابلة' criterion
    const scopeCriterion = activity.getByRole('group', { name: 'انضباط المقابلة' });
    const selectScope = scopeCriterion.getByLabel('اختيارك للتقييم الذاتي');
    await selectScope.selectOption('in-progress');
    await expect(selectScope).toHaveValue('in-progress');

    // Verify localStorage persistence by waiting for write
    await expect.poll(async () => {
      return await page.evaluate(() => {
        const doc = JSON.parse(localStorage.getItem('ai-agents-practical-assessments-v1') ?? '{}');
        return doc.byTopic?.['discovery-grill-me']?.ratings?.length ?? 0;
      });
    }).toBe(2);

    // Reload page and verify selections survive
    await page.reload();
    const restoredTrace = page.locator('.learning-activities').getByRole('group', { name: 'مصدر القرار' });
    await expect(restoredTrace.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('ready-for-review');
    const restoredScope = page.locator('.learning-activities').getByRole('group', { name: 'انضباط المقابلة' });
    await expect(restoredScope.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('in-progress');

    // Reverse/change the rating to unselected ("")
    await restoredTrace.getByLabel('اختيارك للتقييم الذاتي').selectOption('');
    await expect(restoredTrace.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');

    // Reload again and verify reversal survived
    await page.reload();
    const afterReversal = page.locator('.learning-activities').getByRole('group', { name: 'مصدر القرار' });
    await expect(afterReversal.getByLabel('اختيارك للتقييم الذاتي')).toHaveValue('');
  });

  test('Application checklist in aside can be toggled, persists across reload, and reversed', async ({ page }) => {
    await page.goto('/learn/discovery-grill-me');
    const checklistAside = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' });
    await expect(checklistAside).toBeVisible();

    const firstCheckbox = checklistAside.getByRole('checkbox').first();
    await expect(firstCheckbox).not.toBeChecked();

    // Check item
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Reload page
    await page.reload();
    const restoredCheckbox = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' }).getByRole('checkbox').first();
    await expect(restoredCheckbox).toBeChecked();

    // Reverse toggle
    await restoredCheckbox.uncheck();
    await expect(restoredCheckbox).not.toBeChecked();

    // Reload again to verify reversal survived
    await page.reload();
    const reversedCheckbox = page.locator('aside').filter({ hasText: 'قائمة تحقق التطبيق' }).getByRole('checkbox').first();
    await expect(reversedCheckbox).not.toBeChecked();
  });

  test('RTL layout direction and LTR technical code blocks render properly', async ({ page }) => {
    await page.goto('/learn/discovery-grill-me');

    // Document root has RTL direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Main article layout is RTL
    const article = page.locator('article.content-area');
    await expect(article).toBeVisible();

    // Code container and pre formatted content has LTR direction for code readability
    const codeContainers = page.locator('.code-container');
    const count = await codeContainers.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const container = codeContainers.nth(i);
      const dirAttr = await container.getAttribute('dir');
      const textDir = await container.evaluate((el) => window.getComputedStyle(el).direction);
      // Either container dir is ltr or computed style direction is ltr
      expect(dirAttr === 'ltr' || textDir === 'ltr').toBe(true);
    }
  });

  test('Responsive mobile viewport (390px) has no horizontal scroll overflow across all topics in group', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const groupSlugs = ['discovery-grill-me', 'prd-specification', 'srs'];

    for (const slug of groupSlugs) {
      await page.goto(`/learn/${slug}`);

      // Verify page loaded and main heading is visible
      await expect(page.locator('h1')).toBeVisible();

      // Check no horizontal scroll overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, `Horizontal overflow detected on /learn/${slug}`).toBeLessThanOrEqual(clientWidth + 2);
    }
  });
});
