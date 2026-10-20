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
            history: [], updatedAt: submittedAt, selfAssessment: true, previewOnly: true,
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
    await expect(quizCard.getByRole('link', { name: 'اختيار فكرة المشروع وتحديد MVP' })).toBeVisible();
    await expect(page.getByText('previewOnly', { exact: false })).toHaveCount(0);
    await expect(page.getByText('e2e-attempt-1', { exact: false })).toHaveCount(0);
    await expect(page.getByText('scope-check', { exact: false })).toHaveCount(0);
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
    expect(manifest.recordStorageStatus.checklists).toBe('invalid');
    expect(manifest.recordStorageStatus.promptCustomizations).toBe('invalid');
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
    const checklistCard = page.getByRole('heading', { level: 2, name: 'قوائم التحقق العملية' }).locator('xpath=..').locator('xpath=..');
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
});
