# Issue #47 review: Open reviewed external video resources from a Topic

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 09] Open reviewed external video resources from a Topic  
**Date:** 2026-10-20  
**Status:** Verified / Complete (with course-owner deferred disposition on per-video approval)

---

## 1. Summary of implementation and owner decision alignment

Per the course-owner decisions recorded on 2026-10-20 in [`docs/edu-review/owner-decision-package-70.md`](owner-decision-package-70.md) (v2, Decision 44), the external-video policy and representation were accepted as final policy:
- **Acceptance checklist accepted:** The video acceptance checklist in [`docs/curriculum/video-review-checklist.md`](../curriculum/video-review-checklist.md) was formally accepted by course owner MahmoudAlmodalal. It governs Topic alignment, educational suitability, player accessibility (captions, transcript, visual-only information), review evidence, and unavailable-link handling.
- **Per-video approval deferred:** Decision 44 explicitly establishes that each individual video stays a **candidate** until a human reviews playback, captions, accessibility, and lesson fit. No video is falsely published as approved without this completed human verification.
- **58-Topic disposition ledger:** All 58 canonical topics in [`docs/edu-review/video-owner-disposition-70.md`](video-owner-disposition-70.md) are recorded with status `Deferred (DEC-70 Decision 44)` and honest candidate / online-only disclosures.
- **Truthful resource representation for every Topic:** Handled via `src/types/externalVideo.ts` and `src/components/ExternalVideoResource.tsx`:
  - `approved`: Renders an actionable external link (`<a ...>`) with `target="_blank"`, `rel="noreferrer noopener"`, accessible `aria-label`, visible source platform tag (`YouTube`, `Atlassian`, etc.), min-h-11 touch target, focus visible outline, and explicit online-only requirement notice.
  - `candidate`: Renders a status badge `مرشح — بانتظار المراجعة`, visible source platform tag, candidate disclaimer (`هذا رابط مرشح لم تتم الموافقة عليه كمورد تعليمي. يتطلب المصدر الخارجي اتصالاً بالإنترنت، ولا يتوفر دون اتصال.`), and NO outbound link.
  - `unavailable`: Renders status badge `غير متاح`, source platform tag, unavailable explanation (`تم تسجيل هذا المورد على أنه غير متاح. تحقق من مصادر أخرى أو تابع الدرس النصي.`), reassurance that the written lesson and exercises are complete and self-contained, and NO outbound link.
  - `missing`: Renders honest fallback (`لا يوجد مورد فيديو تمت مراجعته لهذا الموضوع حتى الآن.`) and NO outbound link.
- **No hosted video infrastructure & no offline video promises:**
  - No `<video>` or iframe embeds caching or streaming video from the application server.
  - Video resources are strictly online-only. Offline bundle generation (`src/lib/offlineStorage.ts`) excludes external video binaries and records `onlineOnlyVideoCount`.
  - The `/saved` offline shell honestly reports `{count} فيديو خارجي يتطلب اتصالاً`.
- **Educational fit review for representative Topic 01 (`project-idea-mvp`):**
  - Candidate: *How to Build An MVP | Startup School* by Michael Seibel (Y Combinator), `https://www.youtube.com/watch?v=QRZ_l7cVzzU`.
  - Timestamps inspected: 00:08–02:24 (building quickly and learning from users), 07:17–10:00 (limited functionality for focused users), 14:12–15:49 (feature specification and trimming).
  - Assessment: Directly supports MVP scoping and deferring non-essential features, but is supplemental entrepreneurial context; the written lesson, observable artifact (`docs/PROJECT_CONTEXT.md`), and Grill Me handoff remain independent and authoritative. Live player playback reachability, official captions, and WCAG accessibility remain pending human check.

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Result |
|---|---|---|
| **1. Prepare a concrete video acceptance checklist covering Topic alignment, educational suitability, accessibility information, review evidence, and unavailable-link handling for course-owner approval.** | Completed and documented in [`docs/curriculum/video-review-checklist.md`](../curriculum/video-review-checklist.md). Covers 7-point candidate record (slug, URL, playback check date/method, timestamped transcript evidence, player captions/transcript/accessibility, reviewer topic-fit rationale, owner decision reference), 6 educational suitability questions, and honest display rules. Formally accepted on 2026-10-20 by course owner MahmoudAlmodalal in `docs/edu-review/owner-decision-package-70.md` Decision 44. | **Passed** |
| **2. Publish a real approved external video link for a representative existing Topic with the review information required by the approved checklist.** | **Honest deferral / gap per owner Decision 44:** In `owner-decision-package-70.md` Decision 44, course owner MahmoudAlmodalal explicitly deferred individual video approval: *"each individual video stays a candidate until a human reviews playback, captions, accessibility, and lesson fit. No video is announced as approved by this decision."* In strict adherence to this binding policy and the prompt instructions (*"Treat them as final behavior - do NOT implement a 'pending approval' variant... Never mark a missing or unreviewed link as approved"*), Topic 01 stays an honest `candidate` in product data. The approved resource representation is fully implemented and verified in tests (`ExternalVideoResource.test.tsx`), ready to activate when the course owner executes human playback/caption sign-off. | **Deferred per owner policy** |
| **3. Support the approved resource representation for every Topic without marking missing or unreviewed links as approved.** | Implemented in `src/types/externalVideo.ts` and `src/components/ExternalVideoResource.tsx`. All 58 topics evaluate their video through `getExternalVideoDisplayState`. Only records with `availability === 'available'` AND valid owner approval in `approval.state === 'approved'` are rendered as approved. All 58 topics in Group A and Group B evaluate truthfully to `candidate` (with proposed approval and unverified reachability), displaying `مرشح — بانتظار المراجعة` without outbound action links. Verified across all 58 topics in unit tests and Playwright. | **Passed** |
| **4. Show external-source and internet requirements clearly; provide the agreed unavailable state for a resource known to be unavailable.** | Verified in `ExternalVideoResource.tsx` and tested in `ExternalVideoResource.test.tsx` and `e2e/external-video.spec.ts`: every video card displays an external source badge (`data-testid="external-video-source"`) extracted via `getExternalSourceLabel` (e.g. `YouTube`, `Atlassian`, `Figma`). The requirement for internet connectivity is explicitly shown in the section header and within every card. When `state === 'unavailable'`, the card displays status `غير متاح`, states that the resource is recorded as unavailable, reassures the learner that the text lesson and exercises remain complete without it, and hides outbound actions. | **Passed** |
| **5. Do not introduce hosted video infrastructure or promise offline video playback; do not claim live reachability without evidence.** | No hosted video storage, streaming server, or video files exist in the codebase. External links use `target="_blank"` and `rel="noreferrer noopener"`. Offline bundle generation (`src/lib/offlineStorage.ts`) never downloads external video streams. The `/saved` page discloses `1 فيديو خارجي يتطلب اتصالاً`. Candidate records state that reachability is unverified. Verified in `e2e/external-video.spec.ts`, `e2e/offline-bundles.spec.ts`, and `release-e2e/release-production-journey.spec.ts`. | **Passed** |
| **6. Verify a Topic-to-external-link journey, missing/unapproved resources, keyboard/mobile access, and offline messaging; manually check the selected video's educational fit.** | Verified in Playwright (`e2e/external-video.spec.ts` — 8 tests passed in production Chromium): reader displays honest candidate card, source platform, and online notice; quick preview modal renders identical honest representation; responsive widths (390px, 768px, 1024px, 1366px, 1440px) show no horizontal overflow and preserve RTL prose; `/saved` shows online-only video count and retains online warning offline; component unit tests (`ExternalVideoResource.test.tsx`) verify approved external link journey (`<a>` attributes, min-h-11 touch target, focus visible outline, `target="_blank"`), missing fallback, and unavailable messaging; manual check of Topic 01 educational fit documented in `docs/curriculum/issue47-video-candidate-evidence.md`. | **Passed** |

---

## 3. Verification commands and exact results

### Gate 1: Typecheck and lint
```sh
npm run lint
```
**Outcome:** Passed (exit code 0).
```
> ai-agents@1.0.0 lint
> tsc --noEmit
```

### Gate 2: Unit tests in `src/lib/*.test.ts`
```sh
npx tsx --test src/lib/*.test.ts
```
**Outcome:** Passed 64/64 tests (exit code 0, duration: ~505ms).
```
✔ owner approval requires the full audit evidence before enabling policy or video links (1.211762ms)
✔ bundle readiness requires the real HTML, payload, and every recorded asset (17.263868ms)
✔ export availability lists all expected topic outputs and labels unavailable record counts (3.5693ms)
✔ group split preserves exact byte-for-byte topic records across all 58 canonical topics (9.967178ms)
ℹ tests 64
ℹ suites 0
ℹ pass 64
ℹ fail 0
```

### Gate 3: Component unit tests in `src/components/ExternalVideoResource.test.tsx`
```sh
npx tsx --test src/components/ExternalVideoResource.test.tsx
```
**Outcome:** Passed 4/4 tests (exit code 0, duration: ~285ms).
```
✔ candidate and incomplete approval stay non-actionable (10.475717ms)
✔ complete approval enables an accessible external link and keeps the online-only message (0.94287ms)
✔ unavailable and missing resources have clear states and no outbound action (1.249111ms)
✔ source label resolves major known platforms and generic domains (0.290358ms)
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
```

### Gate 4: Group A data tests in `src/data/learning/group-a.test.ts`
```sh
npx tsx --test src/data/learning/group-a.test.ts
```
**Outcome:** Passed 3/3 tests (exit code 0).
```
✔ Groups 01–10 receive draft supplements for the exact canonical 29-topic boundary (1.628153ms)
✔ Topic 01 retains the reviewed narrow sample evidence and the real learner-project handoff (0.163533ms)
✔ Every Topic has one real video candidate with honest availability and no approval bypass (0.671656ms)
ℹ tests 3
ℹ suites 0
ℹ pass 3
ℹ fail 0
```

### Gate 5: Production build
```sh
npm run build
```
**Outcome:** Passed (exit code 0).
```
   ▲ Next.js 15.5.28
   Creating an optimized production build ...
 ✓ Compiled successfully in 6.6s
   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (182/182)
   Finalizing page optimization     ✓ Finalizing page optimization 
```

### Gate 6: Browser E2E suite on production server
```sh
E2E_SERVER=production E2E_PORT=3255 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/external-video.spec.ts
```
**Outcome:** Passed 8/8 tests in production Chromium (exit code 0, duration: 12.1s).
```
Running 8 tests using 1 worker
[1/8] …didate state, external source, and online-only notice without action link
[2/8] …al renders identical honest video candidate and connectivity requirements
[3/8] …ideo resource respects responsive layout, touch targets, and RTL at 390px
[4/8] …ideo resource respects responsive layout, touch targets, and RTL at 768px
[5/8] …deo resource respects responsive layout, touch targets, and RTL at 1024px
[6/8] …deo resource respects responsive layout, touch targets, and RTL at 1366px
[7/8] …deo resource respects responsive layout, touch targets, and RTL at 1440px
[8/8] … page shows online-only video count and does not promise offline playback
  8 passed (12.1s)
```

```sh
E2E_SERVER=production E2E_PORT=3255 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/reference-content.spec.ts e2e/site-journey.spec.ts
```
**Outcome:** Passed 21/21 tests in production Chromium (exit code 0, duration: 49.9s).
```
Running 21 tests using 1 worker
  21 passed (49.9s)
```

### Gate 7: Release production journey
```sh
npx playwright test --config playwright.release.config.ts
```
**Outcome:** Passed 1/1 full production journey test (exit code 0, duration: 11.0s).
```
Running 1 test using 1 worker
Automated journey step passed: landing → roadmap → Topic 38; 58 distinct Topic links are available.
Automated journey step passed: quiz and rubric were entered, retained, and reloaded from this browser profile.
Automated journey step passed: dashboard separates activity and explains that badge awards await course-owner approval.
Automated journey step passed: a prompt was edited, stored, reloaded, and copied from the real clipboard.
Automated journey step passed: inspected 382 ZIP members, 58 lesson files, learner records, and both prompt copies; SHA-256 545baa1f54cb0037846c90438d589d6c8948882276c12e992c367aa38e41fb28.
Automated journey step passed: fresh-tab /saved and the saved lesson, quiz, rubric, and candidate-video warning work offline; 87 cached assets verified.
Reconnect journey step passed: network restored, the production route answered successfully, and offline-created activity remained saved.
  1 passed (11.0s)
```
