import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { expect, test, type BrowserContext, type Page, type TestInfo } from '@playwright/test';

const topicSlug = 'python-backend-foundation';
const topicPath = `/learn/${topicSlug}`;
const quizStorageKey = 'ai-agents-quiz-attempts-v1';
const practicalStorageKey = 'ai-agents-practical-assessments-v1';

function inspectZip(path: string) {
  const script = [
    'import json, sys, zipfile',
    'archive = zipfile.ZipFile(sys.argv[1])',
    'bad = archive.testzip()',
    'assert bad is None, f"CRC failure: {bad}"',
    'print(json.dumps({name: archive.read(name).decode("utf-8") for name in archive.namelist()}))',
  ].join('\n');
  const result = spawnSync('python3', ['-c', script, path], { encoding: 'utf8', maxBuffer: 30 * 1024 * 1024 });
  expect(result.status, result.stderr).toBe(0);
  return new Map<string, string>(Object.entries(JSON.parse(result.stdout)));
}

async function waitForServiceWorkerController(page: Page) {
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker?.controller)), { timeout: 30000 }).toBe(true);
}

async function disableHttpCache(context: BrowserContext, page: Page) {
  const session = await context.newCDPSession(page);
  await session.send('Network.enable');
  await session.send('Network.setCacheDisabled', { cacheDisabled: true });
  return session;
}

async function inspectActiveTopicBundle(page: Page) {
  return page.evaluate(async ({ slug, path }) => {
    const index = await caches.open('ai-agents-topic-index-v2');
    const pointerUrl = new URL('/__ai_agents_offline_v2__/topics/' + encodeURIComponent(slug), location.origin).href;
    const pointerResponse = await index.match(pointerUrl);
    if (!pointerResponse) return null;
    const pointer = await pointerResponse.json();
    const bundleCache = await caches.open(pointer.cacheName);
    const manifestUrl = new URL('/__ai_agents_offline_v2__/bundle/' + encodeURIComponent(pointer.bundleId) + '/manifest.json', location.origin).href;
    const payloadUrl = new URL('/__ai_agents_offline_v2__/bundle/' + encodeURIComponent(pointer.bundleId) + '/payload.json', location.origin).href;
    const manifestResponse = await bundleCache.match(manifestUrl);
    const payloadResponse = await bundleCache.match(payloadUrl);
    const manifest = manifestResponse ? await manifestResponse.json() : null;
    const missingAssets: string[] = [];
    for (const asset of manifest?.assets ?? []) {
      if (!(await bundleCache.match(asset))) missingAssets.push(asset);
    }
    return {
      pointer,
      manifest,
      hasHtml: Boolean(await bundleCache.match(new URL(path, location.origin).href)),
      payload: payloadResponse ? await payloadResponse.json() : null,
      missingAssets,
    };
  }, { slug: topicSlug, path: topicPath });
}

test.describe('Issue #70 production-build learner journey', () => {
  test.describe.configure({ timeout: 300000 });

  test('landing → roadmap Topic → assessment → dashboard → prompt → export → offline fresh tab → reconnect', async ({ page, context }, testInfo: TestInfo) => {
    // This scripted journey contributes automated evidence only; it never fills the human M01–M10 checklist or owner decisions.
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Begin from the public landing page and choose a non-first Topic in the proposed roadmap.
    const landing = await page.goto('/');
    expect(landing?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('banner').getByRole('button', { name: /عرض المزيد من أقسام Ai_agents/ }).click();
    await page.getByRole('banner').getByRole('link', { name: 'خارطة تنفيذ المشروع', exact: true }).click();
    await expect(page).toHaveURL(/\/start#project-path$/);
    const roadmapTopicHrefs = await page.locator('a[href^="/learn/"]').evaluateAll((links) => Array.from(new Set(
      links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href && /^\/learn\/[^/]+$/.test(href))),
    )));
    expect(roadmapTopicHrefs).toHaveLength(58);
    const chosenTopicLink = page.locator(`a[href="${topicPath}"]`).filter({ hasText: /^38\./ }).first();
    await expect(chosenTopicLink).toBeVisible();
    await chosenTopicLink.click();
    await expect(page).toHaveURL(new RegExp(`${topicPath}$`));
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Python: أساسيات الخادم');
    await expect(page.locator('header.learning-reader-header')).toContainText('حالة التوفر: محتوى متاح');
    await expect(page.locator('header.learning-reader-header')).toContainText('حالة التحسين:');
    await expect(page.getByText(/جميع المواضيع متاحة ويمكنك دراسة أي موضوع مباشرة/)).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible();
    console.log('Automated journey step passed: landing → roadmap → Topic 38; 58 distinct Topic links are available.');

    const activities = page.locator('.learning-activities');
    await expect(activities).toHaveAttribute('data-topic-slug', topicSlug);
    const quiz = activities.locator('form').locator('xpath=ancestor::section[1]');
    const questions = quiz.locator('fieldset');
    expect(await questions.count()).toBeGreaterThan(0);
    for (let index = 0; index < await questions.count(); index += 1) {
      await questions.nth(index).locator('input[type="radio"]').first().check();
    }
    await quiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quiz).toContainText('نتيجة معاينة فحص ذاتي');
    await expect(quiz).toContainText('لا تثبت صحة التطبيق أو إتقان المشروع');

    const rubricRatings = activities.getByLabel('اختيارك للتقييم الذاتي');
    expect(await rubricRatings.count()).toBeGreaterThan(0);
    await rubricRatings.first().selectOption('in-progress');
    await expect(rubricRatings.first()).toHaveValue('in-progress');
    await expect(activities).toContainText('لا توجد عتبة إتقان أو شارة نتيجة هذا التقييم');
    await page.reload();
    const restoredActivities = page.locator('.learning-activities');
    const restoredQuiz = restoredActivities.locator('form').locator('xpath=ancestor::section[1]');
    await expect(restoredQuiz).toContainText('آخر نتيجة محفوظة في هذا المتصفح');
    await expect(restoredActivities.getByLabel('اختيارك للتقييم الذاتي').first()).toHaveValue('in-progress');
    console.log('Automated journey step passed: quiz and rubric were entered, retained, and reloaded from this browser profile.');

    await page.getByRole('banner').getByRole('button', { name: /عرض المزيد من أقسام Ai_agents/ }).click();
    await page.getByRole('banner').getByRole('link', { name: /لوحة التقدم/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();
    const quizRecord = page.getByTestId('quiz-attempt-row').filter({ hasText: 'Python: أساسيات الخادم' }).first();
    const rubricRecord = page.getByTestId('practical-assessment-row').filter({ hasText: 'Python: أساسيات الخادم' }).first();
    await expect(quizRecord).toContainText('نتيجة معاينة');
    await expect(rubricRecord).toContainText('تقييم ذاتي محفوظ كمعاينة');
    const badgeSection = page.getByRole('heading', { name: 'شارات الإنجاز المحلية المعتمدة' }).locator('xpath=ancestor::section[1]');
    await expect(badgeSection).toContainText('لا تدخل نتائج المعاينة ضمن أدلة الشارات');
    await expect(badgeSection).toContainText('لا تدل على اعتماد رسمي أو شهادة أو تحقق خارجي');
    await expect(page.getByText('مؤشر الإكمال العام غير معروض')).toBeVisible();
    console.log('Automated journey step passed: dashboard separates activity and explains the approved local badge rules and ineligible preview records.');

    await page.getByRole('link', { name: /انتقل إلى مكتبة البرومبتات لتعديل نص واستخدامه/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'مكتبة البرومبتات' })).toBeVisible();
    await page.locator('main a[href^="/prompts/"]').first().click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const promptUrl = new URL(page.url());
    const promptSlug = promptUrl.pathname.split('/').at(-1)!;
    const promptOriginal = await page.locator('pre').last().textContent();
    expect(promptOriginal?.trim().length).toBeGreaterThan(0);
    const promptCustom = `${promptOriginal}\n\nRELEASE JOURNEY COPY — Keep scope and evidence explicit.`;
    await page.getByRole('button', { name: 'تخصيصي', exact: true }).click();
    const promptEditor = page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت');
    const promptPanel = promptEditor.locator('xpath=../..');
    await promptEditor.fill(promptCustom);
    await page.getByRole('button', { name: 'حفظ التخصيص' }).click();
    await expect(promptPanel.getByRole('status').filter({ hasText: 'حُفظ هذا التخصيص محليًا' })).toBeVisible();
    await page.reload();
    await expect(page.getByLabel('تخصيص منفصل؛ يمكنك الرجوع إلى النص الأصلي في أي وقت')).toHaveValue(promptCustom);
    await page.getByRole('button', { name: 'نسخ النسخة المحددة' }).click();
    await expect(promptPanel.getByRole('status').filter({ hasText: 'تم نسخ النص الكامل للنسخة المحددة' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(promptCustom);
    console.log('Automated journey step passed: a prompt was edited, stored, reloaded, and copied from the real clipboard.');

    await page.goBack();
    await expect(page.getByRole('heading', { level: 1, name: 'مكتبة البرومبتات' })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة تعلّمي' })).toBeVisible();
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('learning-export').click();
    const download = await downloadPromise;
    const archivePath = testInfo.outputPath('release-journey-learning-export.zip');
    mkdirSync(dirname(archivePath), { recursive: true });
    await download.saveAs(archivePath);
    await testInfo.attach('learning-export.zip', { path: archivePath, contentType: 'application/zip' });
    const archiveDigest = createHash('sha256').update(readFileSync(archivePath)).digest('hex');
    const exportFiles = inspectZip(archivePath);
    const exportManifest = JSON.parse(exportFiles.get('manifest.json')!);
    const exportedRecords = JSON.parse(exportFiles.get('learner-data/records.json')!);
    const exportedTopicSlugs = Array.from(exportFiles.keys())
      .map((path) => path.match(/^course\/topics\/([^/]+)\/lesson\.html$/)?.[1])
      .filter((slug): slug is string => Boolean(slug));
    expect(exportManifest.fileCount).toBe(exportFiles.size);
    expect(new Set(exportedTopicSlugs).size).toBe(58);
    expect(exportedRecords.quizAttempts.some((attempt: { topicSlug: string; previewOnly: boolean }) => attempt.topicSlug === topicSlug && attempt.previewOnly)).toBe(true);
    expect(exportedRecords.practicalAssessments.some((record: { topicSlug: string; previewOnly: boolean }) => record.topicSlug === topicSlug && record.previewOnly)).toBe(true);
    expect(exportFiles.get(`prompts/customized/${promptSlug}.txt`)).toBe(promptCustom);
    expect(exportFiles.has(`prompts/original/${promptSlug}.txt`)).toBe(true);
    expect(JSON.parse(exportFiles.get('resources/availability-manifest.json')!).learnerProjectFilesNotAccessible).toBe(true);
    console.log(`Automated journey step passed: inspected ${exportFiles.size} ZIP members, 58 lesson files, learner records, and both prompt copies; SHA-256 ${archiveDigest}.`);

    // Return through the reader and commit a complete offline bundle in the production build.
    await page.goto(topicPath);
    await waitForServiceWorkerController(page);
    await expect(page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true }).click();
    await expect(page.getByRole('button', { name: 'إزالة النسخة المحفوظة بدون إنترنت', exact: true })).toBeVisible({ timeout: 120000 });
    const savedBundle = await inspectActiveTopicBundle(page);
    expect(savedBundle).not.toBeNull();
    expect(savedBundle!.manifest.complete).toBe(true);
    expect(savedBundle!.hasHtml).toBe(true);
    expect(savedBundle!.manifest.assets.length).toBeGreaterThan(0);
    expect(savedBundle!.missingAssets).toEqual([]);
    expect(savedBundle!.payload.topic.slug).toBe(topicSlug);

    await page.close();
    await context.setOffline(true);
    const offlineTab = await context.newPage();
    const pageErrors: string[] = [];
    const failedStaticRequests: string[] = [];
    offlineTab.on('pageerror', (error) => pageErrors.push(error.message));
    offlineTab.on('requestfailed', (request) => {
      if (request.url().includes('/_next/static/')) failedStaticRequests.push(request.url());
    });
    await disableHttpCache(context, offlineTab);
    await offlineTab.goto('/saved');
    await expect(offlineTab.getByRole('heading', { name: 'المواضيع المحفوظة بدون إنترنت' })).toBeVisible();
    const savedLesson = offlineTab.locator(`a[href="${topicPath}"]`).filter({ hasText: 'قراءة الدرس' });
    await expect(savedLesson).toBeVisible();
    await savedLesson.click();
    await expect(offlineTab).toHaveURL(new RegExp(`${topicPath}$`));
    await expect(offlineTab.getByRole('heading', { level: 1 })).toContainText('Python: أساسيات الخادم');
    const offlineActivities = offlineTab.locator('.learning-activities');
    await expect(offlineActivities).toHaveAttribute('data-offline-content-version', '1');
    await expect(offlineTab.getByRole('region', { name: /مورد فيديو خارجي لموضوع/ })).toContainText('مرشح — بانتظار المراجعة');
    await expect(offlineTab.getByText('هذا رابط مرشح لم تتم الموافقة عليه كمورد تعليمي. يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال.')).toBeVisible();
    const offlineQuiz = offlineActivities.locator('form').locator('xpath=ancestor::section[1]');
    await expect(offlineQuiz).toContainText('آخر نتيجة محفوظة في هذا المتصفح');
    await offlineQuiz.getByRole('button', { name: 'إعادة المحاولة', exact: true }).click();
    const offlineQuestions = offlineQuiz.locator('fieldset');
    for (let index = 0; index < await offlineQuestions.count(); index += 1) {
      await offlineQuestions.nth(index).locator('input[type="radio"]').last().check();
    }
    await offlineQuiz.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(offlineQuiz).toContainText('نتيجة معاينة فحص ذاتي');
    await offlineActivities.getByLabel('اختيارك للتقييم الذاتي').last().selectOption('ready-for-review');
    await offlineTab.reload();
    const reloadedOfflineActivities = offlineTab.locator('.learning-activities');
    await expect(reloadedOfflineActivities.locator('form').locator('xpath=ancestor::section[1]')).toContainText('آخر نتيجة محفوظة في هذا المتصفح');
    await expect(reloadedOfflineActivities.getByLabel('اختيارك للتقييم الذاتي').last()).toHaveValue('ready-for-review');
    expect(pageErrors).toEqual([]);
    expect(failedStaticRequests).toEqual([]);
    console.log(`Automated journey step passed: fresh-tab /saved and the saved lesson, quiz, rubric, and candidate-video warning work offline; ${savedBundle!.manifest.assets.length} cached assets verified.`);

    await context.setOffline(false);
    await expect.poll(() => offlineTab.evaluate(() => navigator.onLine)).toBe(true);
    const reconnect = await offlineTab.reload({ waitUntil: 'domcontentloaded' });
    expect(reconnect?.status()).toBe(200);
    await expect(offlineTab.getByRole('heading', { level: 1 })).toContainText('Python: أساسيات الخادم');
    await expect(offlineTab.locator('.learning-activities').locator('form').locator('xpath=ancestor::section[1]'))
      .toContainText('آخر نتيجة محفوظة في هذا المتصفح');
    const sameOriginCheck = await offlineTab.evaluate(async (path) => {
      const response = await fetch(path, { cache: 'no-store' });
      return response.status;
    }, topicPath);
    expect(sameOriginCheck).toBe(200);
    console.log('Reconnect journey step passed: network restored, the production route answered successfully, and offline-created activity remained saved.');
  });
});
