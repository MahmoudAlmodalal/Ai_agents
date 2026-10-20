# Issue #74 Review & Verification Ledger: Offline Library Bootstrap, Cache Rollback, and Saved-State Validation

**Date:** 2026-10-20  
**Repository:** Ai_agents MVP (Next.js 15 / React 19 / TypeScript / Tailwind 4 / Arabic RTL)  
**Issue Scope:** Follow-up to #48 and PR #73; resolve offline `/saved` library bootstrap, cache update rollback, saved-state validation, and real production Service Worker browser test coverage.

---

## 1. Summary of Changes and Baseline Attribution

### (a) Cache JavaScript/CSS dependencies for the offline `/saved` entry point

#### Prior Baseline (`cd18ab0`)
- **Pre-existing implementation:** Commits `444d56a` (feat(issue-48)) and `aa50ccd` (checkpoint parallel MVP issue implementation) had already introduced dependency graph crawling in `public/sw.js`:
  - `cacheShellRoutes()` already crawled the full same-origin dependency graph of `/saved` and `/` HTML into a staging cache, parsed Webpack runtime chunk-maps (`.u = e => ...`), verified completeness, and published the shell pointer `SHELL_POINTER_URL` in `ai-agents-shell-index-v2`.
  - The baseline already included the fresh-tab `/saved` test with HTTP cache disabled (`reopens /saved and its diagram with HTTP cache disabled, rejects unsaved content, and removes only the bundle`).
- **Pre-existing criteria satisfaction:** Acceptance criterion (a) was largely addressed at the crawler level by commits `444d56a` and `aa50ccd`, but shell commit rollback protection, fast-path asset resolution, and worker-ready shell healing were still missing.

#### Additions Introduced by Our Change
- **Shell pointer rollback on failed shell commit:** In `public/sw.js`, `cacheShellRoutes()` now records `previousShellPointer`. If writing `SHELL_POINTER_URL` or copying staged shell entries fails (e.g. quota or interrupted write), the previous valid shell pointer and bundle are restored rather than leaving a half-written or corrupt shell pointer.
- **Fast-path shell matching in `matchActiveAsset`:** In `public/sw.js`, `matchActiveAsset()` checks the active shell bundle cache first for immediate offline resolution before scanning candidate caches.
- **Background shell recovery on worker `activate` and topic save:** In `public/sw.js`, if `readShellPointer()` is absent during worker `activate` or during `CACHE_TOPIC_UNIT`, `cacheShellRoutes()` runs in the background. Added `ENSURE_SHELL` message handling in the service worker.
- **Client-side shell health check:** In `src/components/ServiceWorkerRegister.tsx`, once `navigator.serviceWorker.ready` resolves, the client posts `ENSURE_SHELL` to ensure the shell bundle is active and verified.

---

### (b) Make updates preserve the previous complete bundle on any commit failure

#### Prior Baseline (`cd18ab0`)
- **Pre-existing implementation:** Commits `444d56a` and `aa50ccd` had already refactored `cacheTopicUnit()` in `public/sw.js` to stage downloads:
  - It crawled and downloaded topic HTML, quiz payload, manifest, and asset graph into staging cache `ai-agents-topic-stage-v2-<id>` before copying entries into live bundle cache `ai-agents-topic-v2-<slug>-<bundleId>`.
  - It already restored `previousPointer` and deleted failed staging/bundle caches on error.
- **Pre-existing criteria satisfaction:** Acceptance criterion (b) was satisfied at the background service-worker staging/download level, but there was no mechanism to restore a previously saved complete version from the user interface or client API.

#### Additions Introduced by Our Change
- **Service Worker rollback support (`ROLLBACK_TOPIC_UNIT`):** In `public/sw.js`, added message handler `ROLLBACK_TOPIC_UNIT` which validates the historical bundle before updating the topic index pointer.
- **Client rollback engine (`rollbackTopicOffline` and `getTopicRollbackCandidate`):** In `src/lib/offlineStorage.ts`, implemented `getTopicRollbackCandidate(slug)` to discover and verify historical bundle caches (`ai-agents-topic-v2-<slug>-<bundleId>`), and `rollbackTopicOffline(slug, targetBundleId)` to atomically restore historical pointers and broadcast change events.
- **Learner UI control in `/saved` (`src/app/saved/page.tsx`):**
  - Added an accessible "استعادة النسخة السابقة" button with `RotateCcw` icon.
  - **Shown ONLY when a previous verified complete bundle actually exists** for that topic.
  - Honest Arabic success and failure toasts (`تمت استعادة النسخة السابقة لموضوع "..."` / `تعذرت استعادة النسخة السابقة لهذا الموضوع`).
  - Full keyboard accessibility and focus styles.

---

### (c) Validate actual cached HTML/assets before displaying saved status or listing a topic as available offline

#### Prior Baseline (`cd18ab0`)
- **Pre-existing state:** Acceptance criterion (c) was **unresolved**. `getTopicOfflineStatus` and `listSavedTopicsOffline` in `src/lib/offlineStorage.ts` only inspected `localStorage` keys (`ai_agents_offline_manifest_v1` and `ai_agents_offline_topic_v1:<slug>`), leaving saved/update/remove controls visible even when underlying Cache Storage had been deleted or evicted.

#### Additions Introduced by Our Change
- **Authoritative Cache Storage validation:**
  - `verifyBundleSafe(cacheName, slug, bundleId)` in `src/lib/offlineStorage.ts` validates that the manifest, HTML, payload, all Mermaid perspective SVGs, quiz question arrays, content version marker, and all referenced JavaScript/CSS assets actually exist in Cache Storage.
  - `readActiveBundleSafe(slug)` and `legacyTopicBundleCheck(slug)` verify real Cache Storage before any topic is reported as saved.
- **Honest cleanup of orphaned `localStorage` records:**
  - When Cache Storage is positively confirmed absent (`caches.has === false`) or corrupt after a successful read, `getTopicOfflineStatus` and `listSavedTopicsOffline` return `unsaved`, omit the topic from `/saved`, and purge the orphaned legacy `localStorage` entries.
- **Transient-error safety (No destructive cleanup on transient errors):**
  - If cache verification throws an unexpected or blocked error (e.g. `SecurityError` or transient I/O exception), the code path **does NOT treat content as gone** and **does NOT delete index pointers or `localStorage` mirrors**.
  - Returns `{ status: 'error' }`, preserves pointers and local mirrors, reports offline state honestly as `'unverified'` via `TopicOfflineStatus`, and displays an informative non-blocking status in `TopicReaderTools.tsx` so lessons and checklists remain completely usable.

---

### (d) Real production Service Worker browser coverage in `e2e/offline-bundles.spec.ts`

#### Prior Baseline (`cd18ab0`)
- Commits `444d56a` and `aa50ccd` provided initial tests 1 through 6 in `e2e/offline-bundles.spec.ts`.

#### Additions Introduced by Our Change
- Added 3 new production browser tests against real Chromium (`E2E_SERVER=production`, no mocks of `caches` or `navigator.serviceWorker`):
  1. `validates actual cached HTML/assets for project-idea-mvp, rejecting orphaned localStorage records when cache is deleted`: tests orphaned legacy `localStorage` invalidation and cleanup when cache is purged.
  2. `safe update commits atomically, retains previous bundle in cache, and rollback restores previous version`: tests that multi-version bundles coexist, confirms the rollback button does not appear when only 1 version exists, appears after an update, restores the previous version via the `/saved` UI button, and validates that the restored lesson and diagram load offline with HTTP cache disabled.
  3. `clearing all offline topics from /saved frees bundle storage while leaving learner records intact`: tests that `إفراغ المحفوظات` frees topic caches while keeping bookmarks (`engineering_guide_bookmarks`), reading history (`engineering_guide_recently_viewed`), and checklists (`application-checklists-v1`) strictly preserved.

---

## 2. Observable Behavior Proving Acceptance Criteria

| Acceptance Criterion | Baseline Status | Our Addition | Observable Verification Behavior |
|---|---|---|---|
| **(a) Offline `/saved` entry point works in fresh tab with HTTP cache cleared** | Crawling & staging implemented in `444d56a` & `aa50ccd` | Added shell commit rollback protection, fast-path matching, background recovery, and `ENSURE_SHELL` | Fresh tab with CDP `Network.setCacheDisabled: true` navigates offline to `/saved` in ~182–299 ms; hydrates all 85+ chunks, renders heading and topics, and opens lesson with 3 Mermaid SVG diagrams. |
| **(b) Commit failure preserves previous complete bundle** | Download staging in `444d56a` & `aa50ccd` | Added SW `ROLLBACK_TOPIC_UNIT`, client `rollbackTopicOffline` & `getTopicRollbackCandidate`, and `/saved` UI rollback button | Injections for `prepare-quota`, `commit-quota`, `activate-quota`, and interrupted updates leave previous bundle intact. UI rollback in `/saved` restores previous bundle version and renders offline. |
| **(c) Validate real cache before UI claims saved status** | Unresolved (checked only `localStorage`) | Implemented `verifyBundleSafe`, `readActiveBundleSafe`, transient-error resilience (`unverified`), and orphaned `localStorage` purge | Deleting bundle cache immediately reverts `/learn/project-idea-mvp` and `/saved` to unsaved. Transient cache errors report `unverified` without deleting pointers or local mirrors. |
| **(d) Real production SW browser coverage with independent learner records** | Tests 1–6 in baseline | Added tests 7, 8, and 9 covering orphaned cache invalidation, UI rollback, and eviction with learner record independence | 9 tests pass on production Chromium. Bookmarks, recently viewed history, and checklists remain strictly local and preserved across saves, updates, rollbacks, and storage clears. |

---

## 3. Verification Commands and Exact Outcomes

### 1. Lint check (`npm run lint` -> `tsc --noEmit`)
```sh
$ npm run lint
> ai-agents@1.0.0 lint
> tsc --noEmit
# Exit code: 0 (No type errors)
```

### 2. Unit test suite (`npx tsx --test src/lib/*.test.ts`)
```sh
$ npx tsx --test src/lib/*.test.ts
✔ semantic identity survives reorder and whitespace/NFC edits (3.3ms)
...
✔ bundle readiness requires the real HTML, payload, and every recorded asset (27.7ms)
✔ bundle readiness requires a snapshot for every Mermaid perspective (5.5ms)
✔ offline capability detection and legacy manifest reads survive blocked localStorage (0.5ms)
✔ removing an offline bundle leaves learner records untouched (2.2ms)
✔ legacy manifest data remains readable without making localStorage authoritative (0.4ms)
✔ orphaned legacy localStorage entries without Cache Storage return unsaved and are cleaned up (0.6ms)
✔ rollback restores a previously complete bundle pointer safely (46.8ms)
✔ transient storage error does not purge index pointer or localStorage mirror and reports unverified (2.2ms)
✔ getTopicRollbackCandidate identifies complete historical bundles and excludes active bundle (3.2ms)
...
ℹ tests 63
ℹ suites 0
ℹ pass 63
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 794.55ms
# Exit code: 0 (All 63 passed)
```

### 3. Production build (`npm run build`)
```sh
$ npm run build
   ▲ Next.js 15.5.28

   Creating an optimized production build ...
 ✓ Compiled successfully in 8.0s
   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (182/182)
   Collecting build traces     ✓ Collecting build traces 
   Finalizing page optimization     ✓ Finalizing page optimization 
# Exit code: 0
```

### 4. Playwright production browser suite (`e2e/offline-bundles.spec.ts`)
```sh
$ E2E_SERVER=production E2E_PORT=3220 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/offline-bundles.spec.ts

Running 9 tests using 1 worker

[1/9] keeps online lesson and quiz readable when Service Worker storage is unavailable
[2/9] reopens /saved and its diagram with HTTP cache disabled, rejects unsaved content, and removes only the bundle
[offline] cached 85 production JavaScript chunks; examples: /_next/static/chunks/webpack-c44dae136ba11dfe.js, /_next/static/chunks/585efe6b-d9b13d44f5c6754f.js, /_next/static/chunks/2389-8d9920816457889d.js, /_next/static/chunks/main-app-ead15bae16b3e11f.js, /_next/static/chunks/7837-5cff1aa76889d2f0.js, /_next/static/chunks/2172-80fa03786d3b0de6.js, /_next/static/chunks/6481-e84ea0b60f1b6fe2.js, /_next/static/chunks/7192-6929077ce880a8cb.js
Fresh offline /saved hydrated in 263 ms with 87 verified topic assets.
[3/9] quota, source mismatch, and interrupted updates preserve the previous complete bundle
[offline] delayed timeout retained the previous complete bundle and showed retry state
[4/9] evicted Cache Storage dependencies make the saved status and /saved entry disappear
[5/9] a hanging service worker activation returns a failed status instead of leaving the save spinner running
[6/9] saves a quiz with its lesson, grades offline attempts, retries, and restores them after reload and reconnect
[7/9] validates actual cached HTML/assets for project-idea-mvp, rejecting orphaned localStorage records when cache is deleted
[8/9] safe update commits atomically, retains previous bundle in cache, and rollback restores previous version
[9/9] clearing all offline topics from /saved frees bundle storage while leaving learner records intact

  9 passed (57.1s)
# Exit code: 0
```

---

## 4. Gaps and Scope Adherence

- **Baseline attribution:** Correctly distinguishes between staging mechanics introduced in commits `444d56a` / `aa50ccd` and our additions (shell rollback protection, UI rollback control, transient-error resilience, real Cache Storage validation, and browser coverage).
- **Scope adherence:** All changes strictly conform to owner decisions (DEC-70 / v2). RTL/LTR conventions, local learner record independence, and accessibility of all 58 canonical topics are fully preserved.
