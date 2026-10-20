import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { test, expect, type Page } from '@playwright/test';

function inspectWithPythonZipfile(path: string) {
  const script = [
    'import json, sys, zipfile',
    'archive = zipfile.ZipFile(sys.argv[1])',
    'bad = archive.testzip()',
    'assert bad is None, f"CRC failure: {bad}"',
    'print(json.dumps({name: archive.read(name).decode("utf-8") for name in archive.namelist()}))',
  ].join('\n');
  const result = spawnSync('python3', ['-c', script, path], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  expect(result.status, result.stderr).toBe(0);
  return new Map<string, string>(Object.entries(JSON.parse(result.stdout)));
}

async function downloadDashboardArchive(page: Page, keepCopyAt?: string) {
  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('learning-export').click();
  const download = await downloadPromise;
  const path = await download.path();
  if (!path) throw new Error('The browser did not provide the downloaded archive path.');
  if (keepCopyAt) {
    mkdirSync(dirname(keepCopyAt), { recursive: true });
    copyFileSync(path, keepCopyAt);
  }
  return inspectWithPythonZipfile(path);
}

test.describe('Learner dashboard and export', () => {
  test('empty profile downloads a ZIP with real content and honest missing-resource entries', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'لا توجد أنشطة مسجلة بعد' })).toBeVisible();

    const files = await downloadDashboardArchive(page);
    const manifest = JSON.parse(files.get('manifest.json')!);
    const records = JSON.parse(files.get('learner-data/records.json')!);
    const availability = JSON.parse(files.get('resources/availability-manifest.json')!);
    expect(manifest.fileCount).toBe(files.size);
    expect(manifest.recordsStatus).toBe('readable-from-current-browser');
    expect(Object.values(manifest.recordStorageStatus).every((status) => status === 'available')).toBe(true);
    expect(records.quizAttempts).toEqual([]);
    expect(records.practicalAssessments).toEqual([]);
    expect(files.get('course/topics/project-idea-mvp/lesson.html')).toContain('اختيار فكرة المشروع وتحديد MVP');
    expect(files.get('prompts/original/prompt-01-grill-me-product-discovery.txt')).toContain('Act as a Senior Product Manager');
    expect(files.get('course/topics/user-flow-modeling/diagrams/flow.mmd')).toContain('flowchart TD');
    expect(files.get('course/topics/user-flow-modeling/learning-summary.md')).toContain('نمذجة مسارات تدفق المستخدم');
    expect(files.get('course/topics/user-flow-modeling/learning-summary.md')).toContain('صياغة مسار تدفق مستخدم كامل');
    expect(availability.referenceTemplates.length).toBeGreaterThan(0);
    expect(availability.includedDiagramSources.length).toBeGreaterThan(0);
    expect(availability.includedDiagramSources.every((entry: { path: string }) => files.has(entry.path))).toBe(true);
    expect(availability.renderedDiagramFilesIncluded).toBe(false);
    expect(availability.referenceTemplates.every((item: { completeTemplateFile: string }) => item.completeTemplateFile === 'not-available')).toBe(true);
    expect(availability.learnerProjectFilesNotAccessible).toBe(true);
    expect(files.get('README.md')).toContain('ليست أداة استيراد أو استعادة');
  });

  test('seeded learner records survive reload and remain isolated to their browser profile', async ({ page }) => {
    const submittedAt = '2026-10-20T10:00:00.000Z';
    await page.addInitScript(({ submittedAt }) => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp']));
      localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['project-idea-mvp']));
      localStorage.setItem('ai-agents-quiz-attempts-v1', JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          'project-idea-mvp': [{
            attemptId: 'e2e-attempt-1', topicSlug: 'project-idea-mvp', quizId: 'scope-check', quizVersion: 2,
            policyId: 'scoring-proposal', policyVersion: 1,
            answers: [{ questionId: 'scope-question', questionVersion: 2, selectedOptionId: 'mvp', correctness: 'correct' }],
            correctCount: 1, incorrectCount: 0, unansweredCount: 0, score: 1, maxScore: 1,
            submittedAt, selfCheck: true, previewOnly: true,
          }],
        },
      }));
      localStorage.setItem('ai-agents-practical-assessments-v1', JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          'project-idea-mvp': {
            topicSlug: 'project-idea-mvp', assessmentId: 'scope-rubric', assessmentVersion: 1,
            scaleId: 'descriptive-three-level', scaleVersion: 1,
            criteria: [{ criterionId: 'problem-statement', criterionVersion: 1 }],
            ratings: [{ criterionId: 'problem-statement', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'in-progress', ratedAt: submittedAt }],
            history: [{
              criterionId: 'problem-statement-v0', criterionVersion: 0,
              scaleId: 'archived-scale-v0', scaleVersion: 0, ratingId: 'legacy-ready',
              assessmentId: 'scope-rubric-v0', assessmentVersion: 0, ratedAt: submittedAt,
            }], updatedAt: submittedAt, selfAssessment: true, previewOnly: true,
          },
        },
      }));
      localStorage.setItem('ai-agents-prompt-customizations-v1', JSON.stringify({
        schemaVersion: 1,
        records: {
          'prompt-01-grill-me-product-discovery': {
            promptSlug: 'prompt-01-grill-me-product-discovery',
            text: 'CUSTOM EXPORT TEXT — preserve this learner copy exactly.',
            sourceRevision: 'fnv1a-obsolete',
            updatedAt: submittedAt,
          },
        },
      }));
    }, { submittedAt });

    await page.goto('/dashboard');
    const seededQuizRecord = await page.evaluate(() => localStorage.getItem('ai-agents-quiz-attempts-v1'));
    expect(seededQuizRecord).toContain('e2e-attempt-1');
    const quizCard = page.getByTestId('quiz-attempt-row');
    await expect(quizCard).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(quizCard).toContainText('نسخة الاختبار 2');
    await expect(quizCard).toContainText('1 / 1');
    await expect(quizCard).toContainText('نتيجة معاينة');
    const assessmentCard = page.getByTestId('practical-assessment-row');
    await expect(assessmentCard).toContainText('نسخة التقييم 1');
    await expect(assessmentCard).toContainText('نسخة سلم التقدير 1');
    await expect(assessmentCard).toContainText('حكم محفوظ');
    await expect(assessmentCard).toContainText('تقييم ذاتي محفوظ كمعاينة');
    await assessmentCard.getByText(/أحكام محفوظة لإصدارات أقدم/).click();
    await expect(assessmentCard.locator('details')).toContainText('scope-rubric-v0');
    await expect(assessmentCard.locator('details')).toContainText('archived-scale-v0');
    await expect(quizCard.getByRole('link', { name: 'اختيار فكرة المشروع وتحديد MVP' })).toBeVisible();
    await expect(page.getByText('previewOnly', { exact: false })).toHaveCount(0);
    await expect(page.getByText('e2e-attempt-1', { exact: false })).toHaveCount(0);
    await expect(quizCard).toContainText('scope-check');
    await expect(page.getByText('in-progress', { exact: false })).toHaveCount(0);
    await page.reload();
    await expect(page.getByTestId('quiz-attempt-row')).toContainText('نسخة الاختبار 2');
    await expect(page.getByTestId('practical-assessment-row')).toContainText('نسخة التقييم 1');
    const files = await downloadDashboardArchive(page, process.env.EXPERIENCE_REVIEW_ARCHIVE_PATH);
    const exportedRecords = JSON.parse(files.get('learner-data/records.json')!);
    expect(exportedRecords.quizAttempts[0].attemptId).toBe('e2e-attempt-1');
    expect(exportedRecords.practicalAssessments[0].assessmentId).toBe('scope-rubric');
    expect(files.get('prompts/customized/prompt-01-grill-me-product-discovery.txt')).toContain('CUSTOM EXPORT TEXT — preserve this learner copy exactly.');
    expect(files.get('prompts/original/prompt-01-grill-me-product-discovery.txt')).toContain('Act as a Senior Product Manager');
    const exportedAvailability = JSON.parse(files.get('resources/availability-manifest.json')!);
    expect(exportedAvailability.learnerProjectFilesNotAccessible).toBe(true);

    const isolatedPage = await page.context().browser()!.newPage();
    await isolatedPage.goto(new URL('/dashboard', page.url()).toString());
    await expect(isolatedPage.getByRole('heading', { level: 2, name: 'لا توجد أنشطة مسجلة بعد' })).toBeVisible();
    await expect(isolatedPage.getByTestId('quiz-attempt-row')).toHaveCount(0);
    await isolatedPage.close();
  });

  test('dashboard marks attempts prior when their saved policy or question versions no longer match', async ({ page }) => {
    type FixtureAnswer = { questionId: string; questionVersion: number; selectedOptionId: string | null; correctness: 'correct' | 'incorrect' | 'unanswered' };
    const currentAnswers = [
      { questionId: 'idea-mvp-q-evidence', questionVersion: 1, selectedOptionId: 'answer-a', correctness: 'correct' as const },
      { questionId: 'idea-mvp-q-journey', questionVersion: 1, selectedOptionId: 'answer-b', correctness: 'incorrect' as const },
    ] satisfies FixtureAnswer[];
    const makeAttempt = (attemptId: string, overrides: Record<string, unknown> = {}) => {
      const answers = (overrides.answers as FixtureAnswer[] | undefined) ?? currentAnswers;
      const correctCount = answers.filter((answer) => answer.correctness === 'correct').length;
      const incorrectCount = answers.filter((answer) => answer.correctness === 'incorrect').length;
      const unansweredCount = answers.filter((answer) => answer.correctness === 'unanswered').length;
      return {
        attemptId,
        topicSlug: 'project-idea-mvp',
        quizId: 'project-idea-mvp-objective-quiz',
        quizVersion: 1,
        policyId: 'project-idea-mvp-quiz-scoring-policy',
        policyVersion: 1,
        answers,
        correctCount,
        incorrectCount,
        unansweredCount,
        score: correctCount,
        maxScore: answers.length,
        submittedAt: '2026-10-20T10:00:00.000Z',
        selfCheck: true,
        previewOnly: true,
        ...overrides,
      };
    };
    const current = makeAttempt('current-attempt');
    const policyIdChanged = makeAttempt('policy-id-changed', { policyId: 'retired-policy' });
    const policyVersionChanged = makeAttempt('policy-version-changed', { policyVersion: 0 });
    const questionIdChanged = makeAttempt('question-id-changed', {
      answers: [{ ...currentAnswers[0], questionId: 'retired-question' }, currentAnswers[1]],
    });
    const questionVersionChanged = makeAttempt('question-version-changed', {
      answers: [currentAnswers[0], { ...currentAnswers[1], questionVersion: 0 }],
    });
    const questionCountChanged = makeAttempt('question-count-changed', { answers: [currentAnswers[0]] });
    await page.addInitScript(({ attempts }) => {
      localStorage.setItem('ai-agents-quiz-attempts-v1', JSON.stringify({
        schemaVersion: 1,
        byTopic: { 'project-idea-mvp': attempts },
      }));
    }, { attempts: [current, policyIdChanged, policyVersionChanged, questionIdChanged, questionVersionChanged, questionCountChanged] });

    await page.goto('/dashboard');
    const quizRows = page.getByTestId('quiz-attempt-row');
    await expect(quizRows).toHaveCount(6);
    await expect(quizRows.filter({ hasText: 'فحص ذاتي للمفاهيم' })).toHaveCount(1);
    await expect(quizRows.filter({ hasText: 'اختبار محفوظ لإصدار سابق' })).toHaveCount(5);
  });

  test('malformed browser data is marked unconfirmed in the dashboard and exported manifest', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('engineering_guide_recently_viewed', '{ broken history');
      localStorage.setItem('ai-agents-quiz-attempts-v1', '{ broken attempts');
      localStorage.setItem('application-checklists-v1', '{ broken checklists');
      localStorage.setItem('ai-agents-prompt-customizations-v1', '{ broken customizations');
    });
    await page.goto('/dashboard');
    await expect(page.getByText('قد لا تعرض هذه اللوحة كل السجلات المحلية.')).toBeVisible();
    const files = await downloadDashboardArchive(page);
    const manifest = JSON.parse(files.get('manifest.json')!);
    expect(manifest.recordsStatus).toBe('partial-or-unconfirmed');
    expect(manifest.recordStorageStatus.recentlyViewed).toBe('invalid');
    expect(manifest.recordStorageStatus.learningRecords).toBe('invalid');
    expect(manifest.recordStorageStatus.quizAttempts).toBe('invalid');
    expect(manifest.recordStorageStatus.practicalAssessments).toBe('available');
    expect(manifest.recordStorageStatus.checklists).toBe('invalid');
    expect(manifest.recordStorageStatus.promptCustomizations).toBe('invalid');
    await expect(page.locator('[aria-label="ملخص محلي للأنشطة المسجلة"]').getByText('العدد غير مؤكد')).toHaveCount(4);
    await expect(page.getByText('لا توجد تقييمات ذاتية مسجلة.')).toBeVisible();
    await expect(page.getByText(/نتيجة الشروط غير مؤكدة/)).toHaveCount(2);
  });

  test('frozen legacy HTML checklist fixture stays visible after a blocked write and same-tab dashboard transition', async ({ page }) => {
    test.setTimeout(120000);
    await page.addInitScript(() => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        if (key.startsWith('application-html-checklist-v1:')) throw new DOMException('blocked write', 'QuotaExceededError');
        return originalSetItem.call(this, key, value);
      };
      const insertLegacyFixture = () => {
        const prose = document.querySelector('main .prose');
        if (!prose || prose.querySelector('[data-e2e-legacy-checklist]')) return Boolean(prose);
        prose.insertAdjacentHTML('beforeend', `<div class="checklist-card" data-step="topic-03-flow" data-e2e-legacy-checklist>
          <ul class="checklist-items"><li class="checklist-item"><input type="checkbox" id="e2e-legacy-check-1"><label for="e2e-legacy-check-1">وضوح المخرج لكل قرار: يوجد مسار واضح ومعنون بالكامل لكل خيار نعم/لا في جميع المعينات.</label></li></ul>
        </div>`);
        return true;
      };
      const observer = new MutationObserver(() => {
        if (insertLegacyFixture()) observer.disconnect();
      });
      observer.observe(document, { childList: true, subtree: true });
      document.addEventListener('DOMContentLoaded', () => {
        if (insertLegacyFixture()) observer.disconnect();
      }, { once: true });
      insertLegacyFixture();
    });
    await page.goto('/learn/user-flow-modeling', { waitUntil: 'domcontentloaded', timeout: 120000 });
    const checkbox = page.locator('[data-e2e-legacy-checklist] input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
    const itemText = await checkbox.locator('xpath=following-sibling::label').innerText();
    await checkbox.check();
    await expect(page.locator('.checklist-card [role="status"]')).toContainText('تعذر حفظ');

    await page.getByRole('button', { name: /عرض المزيد من أقسام Ai_agents/ }).click();
    await page.getByRole('banner').getByRole('link', { name: /لوحة التقدم/ }).click();
    const checklistCard = page.locator('section').filter({
      has: page.getByRole('heading', { level: 2, name: 'قوائم التحقق العملية' }),
    });
    await expect(checklistCard).toContainText('تغييرات جلسة غير مؤكدة الحفظ');
    await expect(checklistCard).toContainText(itemText);
    await expect(checklistCard).toContainText('الذاكرة فقط');
    const files = await downloadDashboardArchive(page);
    const manifest = JSON.parse(files.get('manifest.json')!);
    const records = JSON.parse(files.get('learner-data/records.json')!);
    expect(manifest.recordsStatus).toBe('partial-or-unconfirmed');
    expect(manifest.recordStorageStatus.checklists).toBe('write-error');
    expect(records.checklistActivity.entries.some((entry: { sessionOnly: boolean; sessionOnlyChanges?: Array<{ item: string; checked: boolean }> }) => entry.sessionOnly
      && entry.sessionOnlyChanges?.some((change) => change.item === itemText && change.checked))).toBe(true);
  });

  test('prompt customization survives reload, copies the full custom text, resets, and flags a stale source revision', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const promptUrl = '/prompts/prompt-01-grill-me-product-discovery';
    await page.goto(promptUrl);
    const original = await page.locator('pre').last().textContent();
    const custom = `${original}\n\nCUSTOM FULL TEXT — Keep project scope explicit.`;
    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    const editor = page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت');
    await editor.fill(custom);
    await page.getByRole('button', { name: 'حفظ التخصيص' }).click();
    await expect(page.getByRole('status')).toContainText('حُفظ هذا التخصيص محليًا');
    await page.reload();
    await expect(page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت')).toHaveValue(custom);
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(page.getByRole('status')).toContainText('تم نسخ النص الكامل للنسخة المحددة.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(custom);
    await page.getByRole('button', { name: 'إعادة إلى الأصل وحذف التخصيص' }).click();
    await expect(page.getByRole('status')).toContainText('حُذف تخصيص هذا البرومبت');
    await page.reload();
    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    await expect(page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت')).toHaveValue(original);

    const stalePage = await page.context().browser()!.newPage();
    await stalePage.addInitScript(() => {
      localStorage.setItem('ai-agents-prompt-customizations-v1', JSON.stringify({
        schemaVersion: 1,
        records: {
          'prompt-01-grill-me-product-discovery': {
            promptSlug: 'prompt-01-grill-me-product-discovery', text: 'Saved prompt revision',
            sourceRevision: 'fnv1a-obsolete', updatedAt: '2026-10-20T10:00:00.000Z',
          },
        },
      }));
    });
    await stalePage.goto(new URL(promptUrl, page.url()).toString());
    await expect(stalePage.getByText('تغير النص الأصلي منذ حفظ هذا التخصيص.')).toBeVisible();
    await stalePage.close();
  });

  test('browser journey from Topic activity through reload to dashboard and back preserves distinct records without inventing untouched activity', async ({ page }) => {
    test.setTimeout(90000);
    // 1. Visit Topic 01
    await page.goto('/learn/project-idea-mvp');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // 2. Bookmark Topic
    const bookmarkBtn = page.getByRole('button', { name: 'حفظ في المفضلة' });
    await expect(bookmarkBtn).toBeVisible();
    await bookmarkBtn.click();
    await expect(page.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();

    // 3. Check an item in Application Checklist
    const checklistGroup = page.getByRole('group', { name: 'قائمة تحقق التطبيق' });
    const firstCheckbox = checklistGroup.getByRole('checkbox').first();
    await expect(firstCheckbox).toBeVisible();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // 4. Complete Quiz
    await page.getByLabel('افتراض يحتاج تحققاً مع ذكر من يمكن سؤاله').check();
    await page.getByLabel('رحلة حجز واحدة من اختيار وقت إلى تأكيد واضح، مع تأجيل التوصيات').check();
    await page.getByRole('button', { name: 'إرسال الإجابات' }).click();
    await expect(page.getByText('آخر نتيجة محفوظة في هذا المتصفح: 2 / 2')).toBeVisible();

    // 5. Select practical assessment rating
    const ratingSelect = page.getByLabel('اختيارك للتقييم الذاتي').first();
    await ratingSelect.selectOption('in-progress');
    await expect(page.getByText('تُحفظ اختيارات التقييم الذاتي في هذا المتصفح على هذا الجهاز فقط.')).toBeVisible();

    // 6. Reload topic page to verify persistence on topic side
    await page.reload();
    await expect(page.getByRole('button', { name: 'إزالة من المفضلة' })).toBeVisible();
    await expect(page.getByText('آخر نتيجة محفوظة في هذا المتصفح: 2 / 2')).toBeVisible();
    await expect(page.getByLabel('اختيارك للتقييم الذاتي').first()).toHaveValue('in-progress');

    // 7. Navigate to dashboard
    await page.getByRole('banner').getByRole('button', { name: /عرض المزيد من أقسام Ai_agents/ }).click();
    await page.getByRole('banner').getByRole('link', { name: /لوحة التقدم/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();

    // 8. Verify dashboard labels, local scope pill, and owner decision
    await expect(page.getByText('سجلات هذا المتصفح فقط')).toBeVisible();
    await expect(page.getByText('مؤشر الإكمال العام غير معروض')).toBeVisible();
    await expect(page.getByTestId('section-storage-status').getByText(/قرار صاحب المقرر المعتمد/)).toBeVisible();
    await expect(page.getByText(/لا يتضمن التطبيق مؤشر إكمال عام/)).toBeVisible();

    // 9. Verify each record category is distinguishable
    // Recent views
    const recentSection = page.getByTestId('section-recent-views');
    await expect(recentSection).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(recentSection).toContainText('زيارة محفوظة');
    await expect(recentSection).toContainText('وفق قرار صاحب المقرر، فتح الموضوع يسجل زيارة حديثة فقط ولا يسجل إكماله.');

    // Bookmarks
    const bookmarkSection = page.getByTestId('section-bookmarks');
    await expect(bookmarkSection).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // Quiz attempts
    const quizSection = page.getByTestId('section-quizzes');
    const quizRow = quizSection.getByTestId('quiz-attempt-row');
    await expect(quizRow).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(quizRow).toContainText('2 / 2');
    await expect(quizRow).toContainText('صحيح: 2 · غير صحيح: 0 · بلا إجابة: 0');

    // Checklists
    const checklistCard = page.getByTestId('section-checklists');
    await expect(checklistCard).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(checklistCard).toContainText('قائمة الموضوع الحالية');

    // Practical self-assessment
    const practicalSection = page.getByTestId('section-assessments');
    const practicalRow = practicalSection.getByTestId('practical-assessment-row');
    await expect(practicalRow).toContainText('اختيار فكرة المشروع وتحديد MVP');
    await expect(practicalRow).toContainText('قيد العمل');

    // Metric counters: exactly 1 recorded per category, labeled local
    await expect(page.getByTestId('metric-recent-views').locator('strong')).toHaveText('1');
    await expect(page.getByTestId('metric-bookmarks').locator('strong')).toHaveText('1');
    await expect(page.getByTestId('metric-quizzes').locator('strong')).toHaveText('1');
    await expect(page.getByTestId('metric-assessments').locator('strong')).toHaveText('1');
    await expect(page.getByTestId('metric-checklists').locator('strong')).toHaveText('1');

    // Untouched topics: no activity invented for untouched topics
    await expect(page.locator('main').getByRole('link', { name: 'مقابلة استكشاف المنتج Grill Me' })).toHaveCount(0);

    // 10. Reload dashboard and verify all records survive
    await page.reload();
    await expect(page.getByTestId('metric-quizzes').locator('strong')).toHaveText('1');
    await expect(quizRow).toContainText('2 / 2');
    await expect(bookmarkSection).toContainText('اختيار فكرة المشروع وتحديد MVP');

    // 11. Support navigation back to the relevant Topic
    await quizRow.getByRole('link', { name: 'اختيار فكرة المشروع وتحديد MVP' }).click();
    await expect(page).toHaveURL(/\/learn\/project-idea-mvp$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('اختيار فكرة المشروع وتحديد MVP');
  });

  test('empty profile accurately displays zero activity, labels local scope, and navigates to topic exploration', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();
    await expect(page.getByTestId('empty-dashboard-notice')).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'لا توجد أنشطة مسجلة بعد' })).toBeVisible();
    await expect(page.getByText('ستظهر هنا السجلات التي تسجلها فقط؛ لا تُنشأ سجلات للموضوعات التي لم تفتحها.')).toBeVisible();

    // Verify all 6 metric counters show 0 and label local scope
    for (const testId of ['metric-recent-views', 'metric-bookmarks', 'metric-quizzes', 'metric-assessments', 'metric-checklists', 'metric-prompts']) {
      const card = page.getByTestId(testId);
      await expect(card.locator('strong')).toHaveText('0');
      await expect(card).toContainText('محلي فقط');
    }

    // Verify empty messages across all sections
    await expect(page.getByText('لا توجد زيارات حديثة محفوظة.')).toBeVisible();
    await expect(page.getByText('لا توجد موضوعات مفضلة محفوظة.')).toBeVisible();
    await expect(page.getByText('لا توجد محاولات اختبار مسجلة.')).toBeVisible();
    await expect(page.getByText('لا توجد اختيارات قائمة تحقق مسجلة.')).toBeVisible();
    await expect(page.getByText('لا توجد تقييمات ذاتية مسجلة.')).toBeVisible();

    // Verify local storage scope disclaimer
    await expect(page.getByText('لا تعرض اللوحة إحصاءات منصة أو نتائج متعلمين آخرين أو مزامنة بين الأجهزة.')).toBeVisible();

    // Navigate to topic exploration
    await page.getByRole('link', { name: 'استعراض الموضوعات' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('dashboard provides visible keyboard focus and interactive navigation via keyboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();

    // Press Tab to reach first focusable element
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focusedTag);

    // Verify that the prompt library link can be focused and activated via keyboard
    const promptsLink = page.getByRole('link', { name: /انتقل إلى مكتبة البرومبتات/ });
    await promptsLink.focus();
    await expect(promptsLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/prompts$/);
    await expect(page.getByRole('heading', { level: 1, name: 'مكتبة البرومبتات' })).toBeVisible();
  });

  test('dashboard renders responsive mobile layout with RTL direction and no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();

    // Verify RTL direction
    const containerDir = await page.locator('[dir="rtl"]').first().getAttribute('dir');
    expect(containerDir).toBe('rtl');

    // Verify no horizontal overflow at 390px
    const hasHorizontalOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      return doc.scrollWidth > doc.clientWidth || body.scrollWidth > body.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify touch target dimensions for interactive action buttons (min-height >= 44px)
    const exportBtn = page.getByTestId('learning-export');
    const box = await exportBtn.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);

    // Verify all key sections remain visible
    await expect(page.getByTestId('section-recent-views')).toBeVisible();
    await expect(page.getByTestId('section-bookmarks')).toBeVisible();
    await expect(page.getByTestId('section-quizzes')).toBeVisible();
    await expect(page.getByTestId('section-checklists')).toBeVisible();
    await expect(page.getByTestId('section-assessments')).toBeVisible();
    await expect(page.getByTestId('section-badges')).toBeVisible();
    await expect(page.getByTestId('section-storage-status')).toBeVisible();
  });

  test('empty profile displays explainable approved badge rules with unearned states and no accreditation meaning', async ({ page }) => {
    await page.goto('/dashboard');
    const badgeSection = page.getByTestId('section-badges');
    await expect(badgeSection).toBeVisible();
    await expect(badgeSection.getByRole('heading', { level: 2, name: 'شارات الإنجاز المحلية المعتمدة' })).toBeVisible();
    await expect(badgeSection).toContainText('التقييم مفعّل بقرار موثق');
    await expect(badgeSection).toContainText('لا تدل على اعتماد رسمي أو شهادة أو تحقق خارجي من جودة المشروع');

    // Rule 1: explore-topics
    const cardExplore = page.getByTestId('badge-card-explore-topics');
    await expect(cardExplore).toBeVisible();
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-explore-topics')).toContainText('0 / 3 (غير مكتملة)');
    await expect(cardExplore).toContainText('زيارة 3 موضوعات مختلفة على الأقل في هذا المتصفح.');
    await expect(cardExplore).toContainText('سجل الزيارات الأخيرة المحفوظ محليًا');
    await expect(cardExplore).toContainText('لا يقيس إتمام القراءة ولا يعتمد مدة زمنية ولا يمنح اعتمادًا أو شهادة');

    // Rule 2: practice-quizzes
    const cardQuiz = page.getByTestId('badge-card-practice-quizzes');
    await expect(cardQuiz).toBeVisible();
    await expect(page.getByTestId('badge-state-practice-quizzes')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-practice-quizzes')).toContainText('0 / 3 (غير مكتملة)');
    await expect(cardQuiz).toContainText('تسجيل 3 محاولات فحص ذاتي موضوعية محفوظة على الأقل.');
    await expect(cardQuiz).toContainText('سجلات محاولات الفحص الذاتي المحفوظة محليًا');
    await expect(cardQuiz).toContainText('لا يثبت إتقان المادة ولا يمنح اعتمادًا رسميًا');

    // Rule 3: reflect-on-practice
    const cardReflect = page.getByTestId('badge-card-reflect-on-practice');
    await expect(cardReflect).toBeVisible();
    await expect(page.getByTestId('badge-state-reflect-on-practice')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-reflect-on-practice')).toContainText('0 / 3 (غير مكتملة)');
    await expect(cardReflect).toContainText('تسجيل تقييم ذاتي حالي مكتمل بواقع حكم واحد على الأقل لثلاثة موضوعات مختلفة.');
    await expect(cardReflect).toContainText('سجلات التقييم العملي الذاتي الحالية المحفوظة محليًا');
    await expect(cardReflect).toContainText('لا تمثل تدقيقًا مستقلًا أو اعتمادًا لصحة المخرج');

    // Verify storage has not written dummy award events on empty profile
    const badgeEventsRaw = await page.evaluate(() => localStorage.getItem('ai-agents-badge-awards-v1'));
    if (badgeEventsRaw) {
      const doc = JSON.parse(badgeEventsRaw);
      expect(doc.events).toEqual([]);
    }
  });

  test('boundary verification for explore-topics rule: just below, at threshold, above threshold, revision on drop, and reload idempotency', async ({ page }) => {
    // 1. Boundary: Just below threshold (2 topics)
    await page.goto('/dashboard');
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp', 'discovery-grill-me']));
    });
    await page.reload();
    const cardExplore = page.getByTestId('badge-card-explore-topics');
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-explore-topics')).toContainText('2 / 3 (غير مكتملة)');
    await expect(cardExplore).toContainText('2 من 3 أدلة مؤهلة وفق قاعدة استكشاف موضوعات الإصدار 1.');

    // 2. Boundary: Exactly at threshold (3 topics)
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp', 'discovery-grill-me', 'prd-specification']));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('ممنوحة · v1');
    await expect(page.getByTestId('badge-progress-explore-topics')).toContainText('3 / 3 (مكتملة وممنوحة)');
    await expect(cardExplore).toContainText('اكتملت قاعدة استكشاف موضوعات وفق الإصدار 1 وقرار docs/edu-review/owner-decision-package-70.md.');
    await expect(cardExplore).toContainText('تاريخ التسجيل:');
    await expect(cardExplore).toContainText('3 أدلة مؤهلة مسجلة');

    const firstAwardsDoc = await page.evaluate(() => JSON.parse(localStorage.getItem('ai-agents-badge-awards-v1')!));
    expect(firstAwardsDoc.events.length).toBe(1);
    expect(firstAwardsDoc.events[0].badgeId).toBe('explore-topics');
    expect(firstAwardsDoc.events[0].status).toBe('awarded');
    const originalAwardId = firstAwardsDoc.events[0].awardId;
    const originalAwardedAt = firstAwardsDoc.events[0].awardedAt;

    // 3. Boundary: Just above threshold (4 topics)
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp', 'discovery-grill-me', 'prd-specification', 'user-stories-mvp']));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('ممنوحة · v1');
    await expect(page.getByTestId('badge-progress-explore-topics')).toContainText('4 / 3 (مكتملة وممنوحة)');

    // Verify reload idempotency: no duplicate award event is created
    const aboveDoc = await page.evaluate(() => JSON.parse(localStorage.getItem('ai-agents-badge-awards-v1')!));
    expect(aboveDoc.events.length).toBe(1);
    expect(aboveDoc.events[0].awardId).toBe(originalAwardId);
    expect(aboveDoc.events[0].awardedAt).toBe(originalAwardedAt);

    // 4. Evidence revision: drop evidence below threshold (from 4 down to 1 topic)
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp']));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-explore-topics')).toContainText('1 / 3 (غير مكتملة)');

    // Verify historical audit log fold appears with revoked event details
    const historyFold = page.getByTestId('section-badges').locator('details');
    await expect(historyFold).toBeVisible();
    await expect(historyFold.locator('summary')).toContainText('سجل تغييرات الشارات السابقة (1)');
    await historyFold.locator('summary').click();
    await expect(historyFold).toContainText('استكشاف موضوعات · أُلغيت بعد تغير الأدلة (انخفاض الأدلة دون الحد المطلوب) · إصدار القاعدة 1');

    const revokedDoc = await page.evaluate(() => JSON.parse(localStorage.getItem('ai-agents-badge-awards-v1')!));
    expect(revokedDoc.events.length).toBe(1);
    expect(revokedDoc.events[0].status).toBe('revoked');
    expect(revokedDoc.events[0].endReason).toBe('evidence-below-threshold');

    // 5. Re-earning: restore evidence back to threshold (3 topics)
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp', 'discovery-grill-me', 'prd-specification']));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('ممنوحة · v1');
    await expect(page.getByTestId('badge-progress-explore-topics')).toContainText('3 / 3 (مكتملة وممنوحة)');
    const restoredDoc = await page.evaluate(() => JSON.parse(localStorage.getItem('ai-agents-badge-awards-v1')!));
    expect(restoredDoc.events.length).toBe(2);
    expect(restoredDoc.events[0].status).toBe('revoked');
    expect(restoredDoc.events[1].status).toBe('awarded');
  });

  test('boundary verification for practice-quizzes and reflect-on-practice rules, preview exclusion, and rating changes', async ({ page }) => {
    await page.goto('/dashboard');
    // Seed 3 preview-only quiz attempts -> must be excluded from award eligibility
    await page.evaluate(() => {
      function mkPreview(id: string, slug: string) {
        return {
          attemptId: id, topicSlug: slug, quizId: 'q-check', quizVersion: 1,
          policyId: 'p1', policyVersion: 1,
          answers: [{ questionId: 'q1', questionVersion: 1, selectedOptionId: 'a', correctness: 'correct' as const }],
          correctCount: 1, incorrectCount: 0, unansweredCount: 0,
          score: 1, maxScore: 1, submittedAt: '2026-10-20T10:00:00.000Z', selfCheck: true, previewOnly: true,
        };
      }
      localStorage.setItem('ai-agents-quiz-attempts-v1', JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          'project-idea-mvp': [mkPreview('prev-1', 'project-idea-mvp')],
          'discovery-grill-me': [mkPreview('prev-2', 'discovery-grill-me')],
          'prd-specification': [mkPreview('prev-3', 'prd-specification')],
        },
      }));
    });

    await page.reload();
    // Preview-only records must not earn the practice-quizzes badge
    await expect(page.getByTestId('badge-state-practice-quizzes')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-practice-quizzes')).toContainText('0 / 3 (غير مكتملة)');

    // Seed 2 non-preview quiz attempts (just below threshold)
    await page.evaluate(() => {
      function mkAppr(id: string, slug: string) {
        return {
          attemptId: id, topicSlug: slug, quizId: 'q-check', quizVersion: 1,
          policyId: 'p1', policyVersion: 1,
          answers: [{ questionId: 'q1', questionVersion: 1, selectedOptionId: 'a', correctness: 'correct' as const }],
          correctCount: 1, incorrectCount: 0, unansweredCount: 0,
          score: 1, maxScore: 1, submittedAt: '2026-10-20T10:00:00.000Z', selfCheck: true, previewOnly: false,
        };
      }
      localStorage.setItem('ai-agents-quiz-attempts-v1', JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          'project-idea-mvp': [mkAppr('appr-1', 'project-idea-mvp')],
          'discovery-grill-me': [mkAppr('appr-2', 'discovery-grill-me')],
        },
      }));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-practice-quizzes')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-practice-quizzes')).toContainText('2 / 3 (غير مكتملة)');

    // Seed 3rd non-preview quiz attempt (exactly at threshold)
    await page.evaluate(() => {
      const doc = JSON.parse(localStorage.getItem('ai-agents-quiz-attempts-v1')!);
      doc.byTopic['prd-specification'] = [{
        attemptId: 'appr-3', topicSlug: 'prd-specification', quizId: 'q-check', quizVersion: 1,
        policyId: 'p1', policyVersion: 1,
        answers: [{ questionId: 'q1', questionVersion: 1, selectedOptionId: 'a', correctness: 'correct' as const }],
        correctCount: 1, incorrectCount: 0, unansweredCount: 0,
        score: 1, maxScore: 1, submittedAt: '2026-10-20T10:00:00.000Z', selfCheck: true, previewOnly: false,
      }];
      localStorage.setItem('ai-agents-quiz-attempts-v1', JSON.stringify(doc));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-practice-quizzes')).toHaveText('ممنوحة · v1');
    await expect(page.getByTestId('badge-progress-practice-quizzes')).toContainText('3 / 3 (مكتملة وممنوحة)');

    // Test reflect-on-practice:
    // Seed 2 topics with practical assessment ratings (below threshold)
    await page.evaluate(() => {
      function mkPractical(slug: string, id: string, hasRatings: boolean) {
        return {
          topicSlug: slug, assessmentId: id, assessmentVersion: 1,
          scaleId: 'descriptive-three-level', scaleVersion: 1,
          criteria: [{ criterionId: 'c1', criterionVersion: 1 }],
          ratings: hasRatings ? [{ criterionId: 'c1', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'ready-for-review', ratedAt: '2026-10-20T10:00:00.000Z' }] : [],
          history: [], updatedAt: '2026-10-20T10:00:00.000Z', selfAssessment: true, previewOnly: false,
        };
      }
      localStorage.setItem('ai-agents-practical-assessments-v1', JSON.stringify({
        schemaVersion: 1,
        byTopic: {
          'project-idea-mvp': mkPractical('project-idea-mvp', 'a1', true),
          'discovery-grill-me': mkPractical('discovery-grill-me', 'a2', true),
        },
      }));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-reflect-on-practice')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-reflect-on-practice')).toContainText('2 / 3 (غير مكتملة)');

    // Add 3rd topic with ratings (exactly at threshold)
    await page.evaluate(() => {
      const doc = JSON.parse(localStorage.getItem('ai-agents-practical-assessments-v1')!);
      doc.byTopic['prd-specification'] = {
        topicSlug: 'prd-specification', assessmentId: 'a3', assessmentVersion: 1,
        scaleId: 'descriptive-three-level', scaleVersion: 1,
        criteria: [{ criterionId: 'c1', criterionVersion: 1 }],
        ratings: [{ criterionId: 'c1', criterionVersion: 1, scaleId: 'descriptive-three-level', scaleVersion: 1, ratingId: 'ready-for-review', ratedAt: '2026-10-20T10:00:00.000Z' }],
        history: [], updatedAt: '2026-10-20T10:00:00.000Z', selfAssessment: true, previewOnly: false,
      };
      localStorage.setItem('ai-agents-practical-assessments-v1', JSON.stringify(doc));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-reflect-on-practice')).toHaveText('ممنوحة · v1');
    await expect(page.getByTestId('badge-progress-reflect-on-practice')).toContainText('3 / 3 (مكتملة وممنوحة)');

    // Revise self-assessment: clear ratings on 1 topic (drop below threshold)
    await page.evaluate(() => {
      const doc = JSON.parse(localStorage.getItem('ai-agents-practical-assessments-v1')!);
      doc.byTopic['prd-specification'].ratings = [];
      localStorage.setItem('ai-agents-practical-assessments-v1', JSON.stringify(doc));
    });
    await page.reload();
    await expect(page.getByTestId('badge-state-reflect-on-practice')).toHaveText('لم تُمنح · v1');
    await expect(page.getByTestId('badge-progress-reflect-on-practice')).toContainText('2 / 3 (غير مكتملة)');

    // Confirm that repeatedly reloading the page preserves deterministic states
    await page.reload();
    await expect(page.getByTestId('badge-state-practice-quizzes')).toHaveText('ممنوحة · v1');
    await expect(page.getByTestId('badge-state-reflect-on-practice')).toHaveText('لم تُمنح · v1');
  });

  test('rule version transition retires previous award and evaluates fresh version under audit trail', async ({ page }) => {
    await page.goto('/dashboard');
    await page.evaluate(() => {
      // Seed a retired award event from version 99
      localStorage.setItem('ai-agents-badge-awards-v1', JSON.stringify({
        schemaVersion: 1,
        events: [{
          awardId: 'learner-activity-badges:1:explore-topics:99:1',
          policyId: 'learner-activity-badges',
          policyVersion: 1,
          approvalDecisionReference: 'docs/edu-review/owner-decision-package-70.md',
          badgeId: 'explore-topics',
          ruleVersion: 99,
          status: 'awarded',
          evidenceKeys: ['project-idea-mvp'],
          awardedAt: '2026-10-19T10:00:00.000Z',
        }],
      }));
      // Only 1 topic in recent views (below threshold for current v1)
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['project-idea-mvp']));
    });

    await page.reload();
    // The previous rule version 99 award must be retired because ruleVersion does not match current v1
    await expect(page.getByTestId('badge-state-explore-topics')).toHaveText('لم تُمنح · v1');
    const historyFold = page.getByTestId('section-badges').locator('details');
    await expect(historyFold).toBeVisible();
    await historyFold.locator('summary').click();
    await expect(historyFold).toContainText('استكشاف موضوعات · أُحيلت إلى سجل الإصدارات السابقة (تغير إصدار السياسة أو القاعدة) · إصدار القاعدة 99');
  });
});
