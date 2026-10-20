import { test, expect, type BrowserContext, type Page } from '@playwright/test';

const TOPIC = '/learn/user-flow-modeling';
const TOPIC_SLUG = 'user-flow-modeling';
const TEST_ORIGIN = new URL(process.env.E2E_BASE_URL ?? `http://127.0.0.1:${process.env.E2E_PORT ?? '3000'}`).origin;
type WorkerDiagnostics = {
  console: string[];
  pageErrors: string[];
  failures: string[];
  badResponses: string[];
  serviceWorkerResponses: Array<{ status: number; url: string }>;
};
const workerDiagnostics = new WeakMap<BrowserContext, WorkerDiagnostics>();
const observedPages = new WeakMap<BrowserContext, WeakSet<Page>>();

function observeWorker(context: BrowserContext, page?: Page): WorkerDiagnostics {
  const existing = workerDiagnostics.get(context);
  const diagnostics = existing ?? { console: [], pageErrors: [], failures: [], badResponses: [], serviceWorkerResponses: [] };
  if (!existing) {
    workerDiagnostics.set(context, diagnostics);
    context.on('serviceworker', (worker) => {
      diagnostics.console.push(`worker started: ${worker.url()}`);
      worker.on('console', (message) => diagnostics.console.push(message.text()));
      worker.on('close', () => diagnostics.console.push(`worker closed: ${worker.url()}`));
    });
    context.on('requestfailed', (request) => {
      if (request.url().startsWith(`${TEST_ORIGIN}/`)) {
        diagnostics.failures.push(`${request.url()} ${request.failure()?.errorText ?? ''}`);
      }
    });
    context.on('response', (response) => {
      if (response.fromServiceWorker()) {
        diagnostics.serviceWorkerResponses.push({ status: response.status(), url: response.url() });
      }
      if (response.url().startsWith(`${TEST_ORIGIN}/`) && response.status() >= 400) {
        diagnostics.badResponses.push(`${response.status()} ${response.url()}`);
      }
    });
  }
  if (page) {
    let pages = observedPages.get(context);
    if (!pages) {
      pages = new WeakSet<Page>();
      observedPages.set(context, pages);
    }
    if (!pages.has(page)) {
      pages.add(page);
      page.on('pageerror', (error) => diagnostics.pageErrors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') diagnostics.console.push(`page console: ${message.text()}`);
      });
    }
  }
  return diagnostics;
}

async function openTopic(page: Page, search = '') {
  observeWorker(page.context(), page);
  await page.goto(TOPIC + search);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

async function waitForController(page: Page) {
  const diagnostics = observeWorker(page.context(), page);
  try {
    await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker?.controller)), {
      timeout: 20000,
    }).toBe(true);
  } catch (error) {
    const registration = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker?.getRegistration('/');
      return {
        controlled: Boolean(navigator.serviceWorker?.controller),
        active: reg?.active?.state ?? null,
        installing: reg?.installing?.state ?? null,
        waiting: reg?.waiting?.state ?? null,
        caches: await caches.keys(),
      };
    }).catch((inspectionError) => ({ inspectionError: String(inspectionError) }));
    throw new Error(`${String(error)}\nService worker diagnostics: ${JSON.stringify({ registration, ...diagnostics })}`);
  }
}

async function saveCurrentTopic(page: Page) {
  const saveButton = page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true });
  if (await saveButton.isVisible().catch(() => false)) await saveButton.click();
  try {
    await expect(page.getByRole('button', { name: 'إزالة النسخة المحفوظة بدون إنترنت', exact: true })).toBeVisible({ timeout: 90000 });
  } catch (error) {
    const ui = await page.evaluate(() => ({
      buttons: Array.from(document.querySelectorAll('button')).map((button) => ({
        label: button.getAttribute('aria-label'), text: button.innerText,
      })).filter((button) => button.label || /حفظ|تحديث|فشل/.test(button.text)),
      alerts: Array.from(document.querySelectorAll('[role="alert"], [role="status"]')).map((node) => node.textContent),
    })).catch((inspectionError) => ({ inspectionError: String(inspectionError) }));
    throw new Error(`${String(error)}\nSave UI: ${JSON.stringify(ui)}\nWorker diagnostics: ${JSON.stringify(workerDiagnostics.get(page.context()))}`);
  }
}

async function activeBundle(page: Page) {
  return page.evaluate(async (slug) => {
    const index = await caches.open('ai-agents-topic-index-v2');
    const pointerResponse = await index.match(new URL('/__ai_agents_offline_v2__/topics/' + encodeURIComponent(slug), location.origin).href);
    if (!pointerResponse) return null;
    const pointer = await pointerResponse.json();
    const bundleCache = await caches.open(pointer.cacheName);
    const manifestResponse = await bundleCache.match(new URL('/__ai_agents_offline_v2__/bundle/' + encodeURIComponent(pointer.bundleId) + '/manifest.json', location.origin).href);
    const manifest = manifestResponse ? await manifestResponse.json() : null;
    const missingAssets: string[] = [];
    for (const asset of manifest?.assets ?? []) {
      if (!(await bundleCache.match(asset))) missingAssets.push(asset);
    }
    const html = await bundleCache.match(new URL('/learn/' + slug, location.origin).href);
    const payloadResponse = await bundleCache.match(new URL('/__ai_agents_offline_v2__/bundle/' + encodeURIComponent(pointer.bundleId) + '/payload.json', location.origin).href);
    return {
      pointer,
      manifest,
      hasHtml: Boolean(html),
      payload: payloadResponse ? await payloadResponse.json() : null,
      missingAssets,
    };
  }, TOPIC_SLUG);
}

async function expectFailedSaveStatus(page: Page, timeout: number) {
  try {
    await expect(page.getByRole('button', { name: 'فشل الحفظ - انقر لإعادة المحاولة', exact: true })).toBeVisible({ timeout });
  } catch (error) {
    const state = await page.evaluate(() => ({
      url: location.href,
      buttons: Array.from(document.querySelectorAll('button')).map((button) => ({
        label: button.getAttribute('aria-label'), text: button.innerText,
      })).filter((button) => button.label || /حفظ|تحديث|فشل/.test(button.text)),
      statuses: Array.from(document.querySelectorAll('[role="alert"], [role="status"]')).map((node) => node.textContent),
    })).catch((inspectionError) => ({ inspectionError: String(inspectionError) }));
    const bundle = await activeBundle(page).catch((inspectionError) => ({ inspectionError: String(inspectionError) }));
    throw new Error(`${String(error)}\nUpdate state: ${JSON.stringify({ state, bundle, diagnostics: workerDiagnostics.get(page.context()) })}`);
  }
}

async function disableHttpCache(context: BrowserContext, page: Page) {
  const session = await context.newCDPSession(page);
  await session.send('Network.enable');
  await session.send('Network.setCacheDisabled', { cacheDisabled: true });
  return session;
}

test.describe('production offline bundles', () => {
  test.describe.configure({ timeout: 120_000 });

  test.afterEach(async ({ context }, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) return;
    const diagnostics = workerDiagnostics.get(context);
    if (!diagnostics) return;
    await testInfo.attach('offline-worker-and-network-diagnostics', {
      body: Buffer.from(JSON.stringify(diagnostics, null, 2)),
      contentType: 'application/json',
    });
    console.error(`[offline-worker-diagnostics] ${testInfo.title}: ${JSON.stringify(diagnostics)}`);
  });

  test('keeps online lesson and quiz readable when Service Worker storage is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      const originalNavigator = window.navigator;
      const navigatorWithoutServiceWorker = new Proxy(originalNavigator, {
        has(target, property) {
          return property === 'serviceWorker' ? false : Reflect.has(target, property);
        },
        get(target, property) {
          return property === 'serviceWorker' ? undefined : Reflect.get(target, property, target);
        },
      });
      Object.defineProperty(window, 'navigator', {
        configurable: true,
        get: () => navigatorWithoutServiceWorker,
      });
      if ('serviceWorker' in navigator) throw new Error('Service Worker capability was not hidden for the unsupported-browser case');
    });
    await openTopic(page);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.learning-activities').getByRole('heading', { name: 'فحص ذاتي للمفاهيم' })).toBeVisible();
    await expect(page.getByText('الحفظ غير متاح في هذا المتصفح')).toBeVisible();
    await expect(page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true })).toHaveCount(0);
  });

  test('reopens /saved and its diagram with HTTP cache disabled, rejects unsaved content, and removes only the bundle', async ({ page, context }) => {
    await openTopic(page);
    await waitForController(page);
    await expect(page.locator('[aria-label="المخطط الهندسي التفاعلي"] .mermaid-zoombox svg')).toBeVisible();
    await page.evaluate(() => {
      localStorage.setItem('engineering_guide_bookmarks', JSON.stringify(['user-flow-modeling']));
      localStorage.setItem('engineering_guide_recently_viewed', JSON.stringify(['user-flow-modeling']));
      localStorage.setItem('application-checklists-v1', JSON.stringify({ 'user-flow-modeling': ['saved-checklist-record'] }));
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() { throw new DOMException('Storage denied after bundle preparation', 'SecurityError'); },
      });
    });

    await saveCurrentTopic(page);
    const saved = await activeBundle(page);
    expect(saved).not.toBeNull();
    expect(saved!.manifest.complete).toBe(true);
    expect(saved!.hasHtml).toBe(true);
    expect(saved!.manifest.assets.length).toBeGreaterThan(0);
    expect(saved!.missingAssets).toEqual([]);
    expect(saved!.payload.topic.slug).toBe(TOPIC_SLUG);
    const assetPaths = saved!.manifest.assets.map((asset: string) => new URL(asset).pathname);
    const appScriptChunks = assetPaths.filter((asset: string) => asset.startsWith('/_next/static/chunks/') && /\.js$/i.test(asset));
    expect(assetPaths.filter((asset: string) => asset.includes('/chunks/static/chunks/'))).toEqual([]);
    console.log(`[offline] cached ${appScriptChunks.length} production JavaScript chunks; examples: ${appScriptChunks.slice(0, 8).join(', ')}`);
    expect(appScriptChunks.length).toBeGreaterThan(0);
    await page.evaluate(() => Reflect.deleteProperty(window, 'localStorage'));

    await page.close();
    await context.setOffline(true);
    const fresh = await context.newPage();
    const diagnostics = observeWorker(context, fresh);
    const failedStaticRequests: string[] = [];
    fresh.on('requestfailed', (request) => {
      if (request.url().includes('/_next/static/')) failedStaticRequests.push(request.url());
    });
    await disableHttpCache(context, fresh);
    const offlineOpenStarted = Date.now();
    await fresh.goto('/saved');
    await expect(fresh.getByRole('heading', { name: 'المواضيع المحفوظة بدون إنترنت' })).toBeVisible();
    const savedLesson = fresh.locator(`a[href="${TOPIC}"]`).filter({ hasText: 'قراءة الدرس' });
    await expect(savedLesson).toBeVisible();
    console.log(`Fresh offline /saved hydrated in ${Date.now() - offlineOpenStarted} ms with ${saved!.manifest.assets.length} verified topic assets.`);
    await savedLesson.click();
    await expect(fresh).toHaveURL(new RegExp(`${TOPIC}$`));
    const renderedDiagram = fresh.locator('[aria-label="المخطط الهندسي التفاعلي"] .mermaid-zoombox svg');
    await expect(renderedDiagram).toBeVisible();
    const diagramText = () => renderedDiagram.evaluate((svg) => (svg.textContent ?? '').replace(/\s+/g, ' ').trim());
    let previousDiagramText = '';
    const perspectiveContents = new Set<string>();
    for (const label of [
      '🏗️ بنية النظام',
      '🔄 مسار العمليات',
      '⚡ تسلسل التفاعلات',
    ]) {
      const perspectiveButton = fresh.getByRole('button', { name: label, exact: true });
      await perspectiveButton.click();
      await expect(perspectiveButton).toHaveAttribute('aria-pressed', 'true');
      await expect.poll(diagramText).not.toBe('');
      if (previousDiagramText) await expect.poll(diagramText).not.toBe(previousDiagramText);
      previousDiagramText = await diagramText();
      perspectiveContents.add(previousDiagramText);
    }
    expect(perspectiveContents.size).toBe(3);
    await expect(fresh.getByRole('button', { name: 'إزالة النسخة المحفوظة بدون إنترنت', exact: true })).toBeVisible();
    expect(diagnostics.pageErrors).toEqual([]);
    const serviceWorkerStaticResponses = new Set(diagnostics.serviceWorkerResponses
      .filter((response) => response.url.includes('/_next/static/'))
      .map((response) => response.url));
    const unsatisfiedStaticRequests = Array.from(new Set(failedStaticRequests))
      .filter((url) => !serviceWorkerStaticResponses.has(url));
    expect(unsatisfiedStaticRequests).toEqual([]);

    await fresh.goto('/learn/discovery-grill-me');
    await expect(fresh.getByRole('heading', { name: 'هذا الموضوع غير محفوظ للمطالعة بدون إنترنت' })).toBeVisible();

    await fresh.goto('/saved');
    await fresh.locator('article').getByRole('button', { name: /إزالة موضوع/ }).click();
    await expect(fresh.getByText('لا توجد مواضيع محفوظة حالياً')).toBeVisible();
    const learnerRecords = await fresh.evaluate(() => ({
      bookmarks: localStorage.getItem('engineering_guide_bookmarks'),
      recent: localStorage.getItem('engineering_guide_recently_viewed'),
      checklist: localStorage.getItem('application-checklists-v1'),
    }));
    expect(learnerRecords).toEqual({
      bookmarks: JSON.stringify([TOPIC_SLUG]),
      recent: JSON.stringify([TOPIC_SLUG]),
      checklist: JSON.stringify({ [TOPIC_SLUG]: ['saved-checklist-record'] }),
    });
  });

  test('quota, source mismatch, and interrupted updates preserve the previous complete bundle', async ({ page }) => {
    await openTopic(page);
    await waitForController(page);
    await saveCurrentTopic(page);
    const original = await activeBundle(page);
    expect(original).not.toBeNull();

    const failingUpdates = [
      '?offline-test-failure=prepare-quota',
      '?offline-test-failure=commit-quota',
      '?offline-test-failure=activate-quota',
      '?offline-test-loaded-asset=%2F_next%2Fstatic%2Fchunks%2Fold-build.js',
      '?offline-test-source-version=999',
    ];
    for (const search of failingUpdates) {
      await openTopic(page, search);
      await page.getByRole('button', { name: 'تحديث النسخة المحفوظة', exact: true }).click();
      await expectFailedSaveStatus(page, 30000);
      const current = await activeBundle(page);
      expect(current?.pointer.bundleId).toBe(original!.pointer.bundleId);
      expect(current?.manifest.complete).toBe(true);
      expect(current?.missingAssets).toEqual([]);
    }

    // The active-pointer write is the transaction boundary. If the browser
    // acknowledges a completed put as a quota failure, verification adopts the
    // complete new pointer rather than reporting failure with stale UI state.
    await openTopic(page, '?offline-test-failure=activate-committed-then-quota');
    await page.getByRole('button', { name: 'تحديث النسخة المحفوظة', exact: true }).click();
    await expect(page.getByRole('button', { name: 'إزالة النسخة المحفوظة بدون إنترنت', exact: true })).toBeVisible({ timeout: 30000 });
    const afterCommittedError = await activeBundle(page);
    expect(afterCommittedError?.pointer.bundleId).not.toBe(original!.pointer.bundleId);
    expect(afterCommittedError?.missingAssets).toEqual([]);

    // The client timeout can land during graph preparation or near activation.
    // The safe outcome is either the previous complete bundle plus retry state,
    // or a fully committed new bundle plus saved state.
    await openTopic(page, '?offline-test-commit-delay=1500&offline-test-timeout=500');
    await page.getByRole('button', { name: 'تحديث النسخة المحفوظة', exact: true }).click();
    const savedStatus = page.getByRole('button', { name: 'إزالة النسخة المحفوظة بدون إنترنت', exact: true });
    const failedStatus = page.getByRole('button', { name: 'فشل الحفظ - انقر لإعادة المحاولة', exact: true });
    await expect.poll(
      async () => await savedStatus.isVisible().catch(() => false) || await failedStatus.isVisible().catch(() => false),
      { timeout: 15000 }
    ).toBe(true);
    const savedVisible = await savedStatus.isVisible().catch(() => false);
    const failedVisible = await failedStatus.isVisible().catch(() => false);
    expect(savedVisible).not.toBe(failedVisible);

    const afterDelayedTimeout = await activeBundle(page);
    expect(afterDelayedTimeout?.manifest.complete).toBe(true);
    expect(afterDelayedTimeout?.missingAssets).toEqual([]);
    if (failedVisible) {
      expect(afterDelayedTimeout?.pointer.bundleId).toBe(afterCommittedError?.pointer.bundleId);
      console.log('[offline] delayed timeout retained the previous complete bundle and showed retry state');
    } else {
      expect(afterDelayedTimeout?.pointer.bundleId).not.toBe(afterCommittedError?.pointer.bundleId);
      console.log('[offline] delayed timeout completed the atomic pointer update and showed saved state');
    }
  });

  test('evicted Cache Storage dependencies make the saved status and /saved entry disappear', async ({ page }) => {
    await openTopic(page);
    await waitForController(page);
    await saveCurrentTopic(page);
    const before = await activeBundle(page);
    expect(before?.manifest.assets.length).toBeGreaterThan(0);
    await page.evaluate(async ({ cacheName, asset }: { cacheName: string; asset: string }) => {
      const cache = await caches.open(cacheName);
      await cache.delete(asset);
    }, { cacheName: before!.pointer.cacheName, asset: before!.manifest.assets[0] });

    await page.goto('/saved');
    await expect(page.getByText('لا توجد مواضيع محفوظة حالياً')).toBeVisible();
    await page.goto(TOPIC);
    await expect(page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true })).toBeVisible();
  });

  test('a hanging service worker activation returns a failed status instead of leaving the save spinner running', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(ServiceWorkerContainer.prototype, 'controller', {
        configurable: true,
        get() { return null; },
      });
      Object.defineProperty(ServiceWorkerContainer.prototype, 'ready', {
        configurable: true,
        get() { return new Promise<ServiceWorkerRegistration>(() => {}); },
      });
    });
    await openTopic(page, '?offline-test-ready-timeout=300');
    await page.getByRole('button', { name: 'حفظ للمطالعة بدون إنترنت', exact: true }).click();
    await expect(page.getByRole('button', { name: 'فشل الحفظ - انقر لإعادة المحاولة', exact: true })).toBeVisible({ timeout: 5000 });
  });

  test('saves a quiz with its lesson, grades offline attempts, retries, and restores them after reload and reconnect', async ({ page, context }) => {
    observeWorker(context);
    await openTopic(page);
    await expect(page.locator('.learning-activities')).toHaveAttribute('data-offline-content-version', '1');
    await waitForController(page);
    await expect(page.locator('.learning-activities').getByText('معاينة مقترحة — لا تمثل إتقانًا')).toBeVisible();
    await saveCurrentTopic(page);

    const saved = await activeBundle(page);
    expect(saved?.payload.learningContent.quiz.questions.length).toBeGreaterThan(0);
    expect(saved?.payload.metadata.quiz?.approvalState).toBe('proposed');
    expect(saved?.payload.learningContent.quiz.scoringPolicy.approval.state).toBe('proposed');

    await page.close();
    await context.setOffline(true);
    const fresh = await context.newPage();
    observeWorker(context, fresh);
    await disableHttpCache(context, fresh);
    await fresh.goto('/saved');
    await expect(fresh.getByRole('heading', { name: 'المواضيع المحفوظة بدون إنترنت' })).toBeVisible();
    await fresh.locator(`a[href="${TOPIC}"]`).filter({ hasText: 'قراءة الدرس' }).click();
    await expect(fresh).toHaveURL(new RegExp(`${TOPIC}$`));
    const activity = fresh.locator('.learning-activities');
    await expect(activity).toHaveAttribute('data-offline-content-version', '1');
    await expect(activity.getByText('معاينة مقترحة — لا تمثل إتقانًا')).toBeVisible();
    const quizSection = activity.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
    const actorQuestion = quizSection.getByRole('group', { name: /في رحلة طلب يوافق عليه مسؤول/ });
    await actorQuestion.getByRole('radio', { name: 'الطالب يغير الحالة بنفسه دائماً', exact: true }).check();
    await quizSection.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quizSection.getByText(/صحيح: 0 · غير صحيح: 1 · بلا إجابة: 1/)).toBeVisible();
    await expect(quizSection.getByText('نتيجة معاينة مقترحة')).toBeVisible();

    await quizSection.getByRole('button', { name: 'إعادة المحاولة', exact: true }).click();
    await actorQuestion.getByRole('radio', { name: 'المسؤول يسجل التسليم؛ وتظهر النتيجة للطالب', exact: true }).check();
    await quizSection.getByRole('button', { name: 'إرسال الإجابات', exact: true }).click();
    await expect(quizSection.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await expect(quizSection.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();

    await fresh.reload();
    const restored = fresh.locator('.learning-activities');
    const restoredQuiz = restored.getByRole('heading', { name: 'فحص ذاتي للمفاهيم' }).locator('xpath=ancestor::section[1]');
    await expect(restoredQuiz.getByText(/صحيح: 1 · غير صحيح: 0 · بلا إجابة: 1/)).toBeVisible();
    await expect(restoredQuiz.getByText(/آخر نتيجة محفوظة في هذا المتصفح/)).toBeVisible();
    await expect(restoredQuiz.getByText(/عرض سجل المحاولات \(2\)/)).toBeVisible();

    await context.setOffline(false);
    await fresh.reload();
    await expect(fresh.locator('.learning-activities')).toHaveAttribute('data-offline-content-version', '1');
    await expect(fresh.locator('.learning-activities').getByText(/آخر نتيجة محفوظة في هذا المتصفح/)).toBeVisible();
  });
});
