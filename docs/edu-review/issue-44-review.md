# Issue #44 review: Review distinct learning activity on a local dashboard

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 06] Review distinct learning activity on a local dashboard  
**Date:** 2026-10-20  
**Status:** Verified / Complete

---

## 1. Summary of implementation and owner decision alignment

Per the course-owner decisions recorded on 2026-10-20 in [`docs/edu-review/owner-decision-package-70.md`](owner-decision-package-70.md) (v2, Course-owner decisions section, MahmoudAlmodalal):
- **Reading triggers and completion indicator:** Opening a topic records a recent visit only (up to latest 5 topics in `engineering_guide_recently_viewed`). No reading-completion indicator exists; reading completion is never inferred from visits, scrolling, quiz answers, or checklist selections.
- **Distinct local records:** The local dashboard at `/dashboard` presents reading activity (recent visits), favorites (bookmarks), quiz attempts, practical self-assessments, application checklists, and prompt customizations as clearly distinguishable records with separate counts, cards, and storage statuses. They are never merged into a single progress percentage or unified mastery score.
- **Local scope and no external claims:** All measures are calculated strictly from local storage in the current browser on this device. The interface explicitly disclaims platform-wide statistics, independent project evaluation, and cross-device synchronization.
- **Robust edge-case handling:** Empty profiles show an honest zero-activity banner with direct navigation to explore topics; partially recorded activity displays only recorded items while labeling empty sections; historical unresolved keys remain preserved without being attributed to unrelated topics; unavailable or corrupt storage displays clear warnings and non-misleading indicators.
- **Accessibility and direction:** The dashboard maintains Arabic RTL prose with LTR technical symbols and links, visible keyboard focus rings (`:focus-visible`), responsive card stacking, touch-friendly interactive targets (>= 44px), and zero horizontal overflow at mobile widths (390px).

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Result |
|---|---|---|
| **1. Record course-owner decisions on reading triggers and any completion indicator before presenting final progress calculations.** | Verified in `src/components/DashboardExperience.tsx`: The header, reading activity card, and local storage section explicitly present course-owner decision DEC-70 (2026-10-20, MahmoudAlmodalal). The UI confirms that opening a topic records a recent visit only, no reading-completion indicator exists, and no completion or mastery is inferred from visits, scrolling, quiz answers, or checklist selections. Final progress calculations are presented as distinct local counts rather than a combined completion percentage. | **Passed** |
| **2. Display reading activity, quiz results, checklist/rubric assessment, and any approved completion indicator as distinguishable records.** | Verified in `DashboardExperience.tsx` and tested in `e2e/dashboard-prompt-export.spec.ts`: Six distinguishable cards and six summary metrics (`metric-recent-views`, `metric-bookmarks`, `metric-quizzes`, `metric-assessments`, `metric-checklists`, `metric-prompts`) render separately. Quizzes show score/maxScore, question versions, and preview disclaimers; rubrics show criteria, descriptive levels (`قيد العمل`), and scale versions; checklists show selected application checklist items; recent visits show visit number and topic link; bookmarks show heart icon and topic link. | **Passed** |
| **3. Support navigation back to the relevant Topic and existing favorites/history without inventing activity for untouched Topics.** | Verified in `e2e/dashboard-prompt-export.spec.ts`: Clicking a topic link from any record (quiz attempt, recent visit, bookmark, rubric, checklist) navigates directly to `/learn/[slug]`. For untouched topics (the other 57 canonical topics), zero activity is invented; untouched topics are never displayed in recent visits, bookmarks, quizzes, checklists, or rubrics. | **Passed** |
| **4. Calculate every displayed measure from records in the current browser and label its local scope.** | Verified in `DashboardExperience.tsx` and Playwright tests: Every count and list is computed on the client from `window.localStorage` (`engineering_guide_recently_viewed`, `engineering_guide_bookmarks`, `ai-agents-quiz-attempts-v1`, `ai-agents-practical-assessments-v1`, `application-checklists-v1`, `ai-agents-prompt-customizations-v1`). The header pill states `سجلات هذا المتصفح فقط`, summary cards are labeled `محلي فقط`, and disclaimers explain that records are isolated to this browser. | **Passed** |
| **5. Handle an empty profile, partially recorded activity, unresolved historical saves, and unavailable storage accurately.** | Verified in unit tests (`src/lib/dashboardRecords.test.ts`) and Playwright tests: In an empty profile, empty state notice `لا توجد أنشطة مسجلة بعد` is shown and all counters read `0`. Partially recorded profiles display only present records and honest empty messages for missing ones. Unresolved historical slugs and numeric checklist keys are listed separately under unresolved keys and never misattributed. Corrupted or blocked storage displays `قد لا تعرض هذه اللوحة كل السجلات المحلية` and marks counters as `العدد غير مؤكد`. | **Passed** |
| **6. Do not claim platform-wide statistics, independent project evaluation, or cross-device synchronization.** | Verified in copy across `DashboardExperience.tsx`: The UI explicitly states: `تعرض هذه الصفحة زيارات المواضيع ونتائج الاختبارات والتقييمات الذاتية والمفضلة كأنواع مستقلة من النشاط... لا تقيس إتقانًا ولا تقييمًا مستقلًا للمشروع، ولا تنتقل سجلاتها إلى جهاز آخر.` and `لا تعرض اللوحة إحصاءات منصة أو نتائج متعلمين آخرين أو مزامنة بين الأجهزة.`. | **Passed** |
| **7. Verify a browser journey from Topic activity through reload to dashboard and back, including a separate empty profile, keyboard access, and mobile layout.** | Verified in `e2e/dashboard-prompt-export.spec.ts` against the production Next.js build: (a) Full journey: visit `/learn/project-idea-mvp` -> bookmark -> check checklist -> complete quiz (2/2) -> rate rubric (`in-progress` / `قيد العمل`) -> reload topic -> navigate to `/dashboard` -> verify distinct records and metric counts -> reload dashboard -> click topic link -> navigate back to `/learn/project-idea-mvp`. (b) Empty profile test in fresh context. (c) Keyboard accessibility test verifying visible focus and navigation via keyboard. (d) Responsive mobile layout test at 390x844 verifying RTL direction, no horizontal overflow, and >=44px touch targets. | **Passed** |

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

### Gate 2: Unit tests
```sh
npx tsx --test src/lib/*.test.ts
```
**Outcome:** Passed 66/66 tests (exit code 0, duration: ~587ms).
```
✔ semantic identity survives reorder and whitespace/NFC edits; changed text has no inherited check (5.96301ms)
✔ topic identity isolates identical labels; readers share snapshots and unsubscribe cleanly (1.581377ms)
✔ read failures retain every local change and merge with previously saved choices after recovery (1.923814ms)
✔ write failures preserve multiple checks and clearing; errors do not leak into another topic (6.342042ms)
✔ malformed documents and malformed item arrays remain byte-for-byte intact (3.747228ms)
✔ existing exact semantic saves restore without writing; positional saves never imply a match (1.063609ms)
✔ refresh merges external topic updates and local pending choices without discarding either (1.260107ms)
✔ storage getter failures and prototype-like topic keys cannot crash or mutate another topic (1.122716ms)
✔ draft or incomplete owner approval never creates awarded or unearned badge states (4.057808ms)
✔ previewOnly attempts are excluded from approved award eligibility (2.081385ms)
✔ approved versioned awards persist across reload, revoke after evidence reversal, and can be earned again (2.93102ms)
✔ policy or rule version changes retire old awards and evaluate the newly approved version (0.834596ms)
✔ unavailable evidence suspends award reconciliation until the source recovers (1.709414ms)
✔ malformed award history is not overwritten and storage failures keep session events visible (1.24025ms)
✔ empty profile shows no matched draft conditions (2.541453ms)
✔ reading proposal counts only the visible recent list and makes no completion claim (0.67786ms)
✔ previewOnly quiz attempts can match a clearly labeled draft preview but are excluded from award-eligible evidence (1.978028ms)
✔ rubric preview uses current ratings and does not resurrect cleared ratings from history (1.115614ms)
✔ unavailable evidence is reported as unconfirmed instead of as an empty draft condition (0.942705ms)
✔ dashboard checklist status distinguishes invalid documents from blocked reads (2.112132ms)
✔ readDashboardChecklistSnapshot returns no entries for untouched topics and preserves unresolved keys (4.00866ms)
✔ group split preserves exact byte-for-byte topic records across all 58 canonical topics (14.524496ms)
✔ export includes every application Mermaid perspective and a readable course summary (2.081864ms)
✔ readable learning summary includes versioned questions, scoring policy and self-assessment rubric (0.514108ms)
✔ export availability lists all expected topic outputs and labels unavailable record counts (2.866566ms)
✔ owner approval requires the full audit evidence before enabling policy or video links (3.389745ms)
✔ quiz attempts retain scoring detail, question versions, retries, and Topic isolation across reloads (16.700313ms)
✔ a revised rubric keeps retired ratings recoverable without applying them to a new criterion version (1.465369ms)
✔ a revised rubric scale archives old-scale judgments instead of interpreting them as current (0.519154ms)
✔ a replaced practical assessment archives its ratings even when criterion IDs overlap (0.692305ms)
✔ legacy rubric history without parent assessment identity remains readable (0.556052ms)
✔ blocked writes keep session records and honestly restore them when persistence recovers (1.288746ms)
✔ practical judgments stay isolated by stable Topic slug across reloads (0.750455ms)
✔ malformed nested records remain untouched and are reported as invalid (0.569746ms)
✔ list snapshots keep quiz and practical storage failures distinct (0.794388ms)
✔ shape-valid but impossible quiz records are rejected instead of restoring inaccurate scores (1.14303ms)
✔ grades and retains an all-unanswered quiz attempt with score zero according to policy (1.681942ms)
✔ only frozen topic and exact label recover positional saves, including after reorder (2.970845ms)
✔ stable HTML identity is collision safe and independent of structured criteria (1.029547ms)
✔ legacy blocked reads/writes keep multiple local choices; recovery saves them without changing old keys (2.921421ms)
✔ corrupt stable HTML data is preserved and does not fall back to a positional save (0.822422ms)
✔ bundle readiness requires the real HTML, payload, and every recorded asset (17.981872ms)
✔ bundle readiness requires a snapshot for every Mermaid perspective (1.901443ms)
✔ offline capability detection and legacy manifest reads survive blocked localStorage (0.216598ms)
✔ removing an offline bundle leaves learner records untouched (0.862653ms)
✔ legacy manifest data remains readable without making localStorage authoritative (0.216476ms)
✔ orphaned legacy localStorage entries without Cache Storage return unsaved and are cleaned up (0.257264ms)
✔ rollback restores a previously complete bundle pointer safely (13.462591ms)
✔ transient storage error does not purge index pointer or localStorage mirror and reports unverified (1.20758ms)
✔ getTopicRollbackCandidate identifies complete historical bundles and excludes active bundle (1.867553ms)
✔ several failed saves remain in the session snapshot and merge safely when storage recovers (4.465067ms)
✔ a failed removal remains visible and is applied after a later refresh (0.787521ms)
✔ blocked reads keep requested session edits until a later focus-style refresh succeeds (0.616243ms)
✔ malformed saved data stays byte-for-byte intact and is reported as invalid (0.363217ms)
✔ source revisions change when the original prompt text changes (0.322702ms)
✔ malformed bookmarks and recently viewed stay byte-for-byte intact when user saves new items (2.31516ms)
✔ read failure keeps session choices and merges safely when storage recovers (0.531645ms)
✔ write failure preserves session choices and persists when storage recovers (0.233335ms)
✔ ambiguous historical records remain preserved and unresolved, never assigned to unrelated topics (0.482937ms)
✔ reading activity and checklist selections remain strictly independent in storage (0.349484ms)
✔ remove during write failure does not resurrect on recovery (0.303223ms)
✔ read recovery on next write merges unread earlier records safely (0.225227ms)
✔ history recency puts new views first and explicit clear intent persists on recovery (0.508143ms)
✔ externally repaired malformed storage safely recovers and merges session changes (0.411007ms)
✔ creates a valid UTF-8 ZIP whose stored files can be opened and inspected (3.556121ms)
✔ rejects duplicate and traversal paths instead of producing an unsafe package (1.328012ms)
ℹ tests 66
ℹ suites 0
ℹ pass 66
ℹ fail 0
```

### Gate 3: Production build
```sh
npm run build
```
**Outcome:** Passed (exit code 0).
```
   ▲ Next.js 15.5.28
   Creating an optimized production build ...
 ✓ Compiled successfully in 4.1s
   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (182/182)
   Collecting build traces     ✓ Collecting build traces 
   Finalizing page optimization     ✓ Finalizing page optimization 
```

### Gate 4: Playwright browser verification
```sh
E2E_SERVER=production E2E_PORT=3252 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/dashboard-prompt-export.spec.ts
```
**Outcome:** Passed 10/10 tests (exit code 0, duration: ~24.8s).
```
Running 10 tests using 1 worker

[1/10] …le downloads a ZIP with real content and honest missing-resource entries
[2/10] …rner records survive reload and remain isolated to their browser profile
[3/10] …empts prior when their saved policy or question versions no longer match
[4/10] …rowser data is marked unconfirmed in the dashboard and exported manifest
[5/10] …re stays visible after a blocked write and same-tab dashboard transition
[6/10] …, copies the full custom text, resets, and flags a stale source revision
[7/10] …and back preserves distinct records without inventing untouched activity
[8/10] …ys zero activity, labels local scope, and navigates to topic exploration
[9/10] … provides visible keyboard focus and interactive navigation via keyboard
[10/10] … responsive mobile layout with RTL direction and no horizontal overflow
  10 passed (24.8s)
```

---

## 4. Open items and deviations

None. All 7 acceptance criteria are fully satisfied and backed by observable unit and browser-level tests. In accordance with course-owner decision DEC-70:
1. No reading-completion indicator was introduced (Topic open records recent visit only; completion is never inferred).
2. Badge rules remain descriptive previews recalculated on every read without granting accreditation claims or merging records.
3. Learner records remain strictly client-side on the current browser/device with zero external accounts or server grading.
