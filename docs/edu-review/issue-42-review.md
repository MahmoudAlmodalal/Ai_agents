# Issue #42 review: Complete a Topic quiz and restore its local result

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 04] Complete a Topic quiz and restore its local result  
**Date:** 2026-10-20  
**Status:** Accepted / Verified  

---

## 1. Summary of changes

In accordance with Course Owner Decision Package 70 (v2, 2026-10-20, Course-owner decisions section) and `docs/ASSESSMENT_POLICY_PROPOSAL.md`, the Topic objective quiz functionality was verified, hardened, and proven through observable browser behavior on representative existing Topic 01 (`project-idea-mvp`).

### Key implementations and test coverage:
- **Policy specification and owner acceptance (`docs/ASSESSMENT_POLICY_PROPOSAL.md`, `docs/edu-review/owner-decision-package-70.md`):**
  - Confirmed and applied the approved quiz policy: 1 point per correct answer, 0 for incorrect or unanswered, unlimited retries, explanatory feedback after submit, and retention of all attempts with question, quiz, and policy versions.
- **Representative Topic educationally reviewed questions (`src/data/learning/group-a.ts`):**
  - Topic 01 (`project-idea-mvp`) includes two educationally reviewed objective questions (`idea-mvp-q-evidence` and `idea-mvp-q-journey`) with stable semantic IDs, answer keys, explanations, and narrow passing review evidence by reviewer `root` dated 2026-10-20.
  - Existing content of all 58 canonical Topics is kept intact; content hashes remain byte-for-byte identical.
- **Accessible controls and explanatory feedback (`src/components/TopicLearningActivities.tsx`):**
  - Radio options use semantic `<fieldset>` and `<legend>`, `<label>` wrapping with minimum 44px touch targets (`min-h-11`), visible focus rings, and full keyboard navigation.
  - Submission renders per-question explanatory feedback for correct, incorrect, and unanswered responses with `role="status"` and `aria-live="polite"`.
  - Explanatory feedback and score banners explicitly include disclaimers stating that results represent self-check conceptual reviews and never imply practical correctness or project mastery.
- **Result retention and question version lifecycle (`src/lib/learningRecords.ts`, `src/components/TopicLearningActivities.tsx`):**
  - Quiz attempts are stored under `ai-agents-quiz-attempts-v1` with `attemptId`, `topicSlug`, `quizId`, `quizVersion`, `policyId`, `policyVersion`, and versioned `answers`.
  - Defined and verified behavior when question content changes: older attempts remain in the browser's attempt history labeled as `نسخة سابقة` (previous version); new versions start with a fresh unselected form and do not inherit outdated scores.
- **Multi-entry point restoration and storage failure handling:**
  - Verified attempt restoration in both the full reader (`/learn/project-idea-mvp`) and the quick preview modal (`TopicDetailModal`).
  - Verified honest status reporting on quota/storage failure: session-only result labeling ("آخر نتيجة في هذه الجلسة، وقد لا تبقى بعد إعادة التحميل") and storage warning ("تعذر حفظ السجل على هذا الجهاز"), with zero false restoration after page reload.
- **Strict decoupling of quiz records (`e2e/learning-assessments.spec.ts`):**
  - Quiz results are verified to be strictly distinct from reading recency (`engineering_guide_recently_viewed`), application checklist selections (`application-checklists-v1`), practical rubric ratings (`ai-agents-practical-assessments-v1`), and any course completion signal or badge.
- **Comprehensive unit and Playwright browser test coverage (`src/lib/learningRecords.test.ts`, `e2e/learning-assessments.spec.ts`):**
  - Added unit test coverage for grading and storing all-unanswered attempts according to policy.
  - Expanded `e2e/learning-assessments.spec.ts` to 9 browser tests covering submission, scoring, unanswered grading, unlimited retry, reload restoration, reader vs preview entry points, profile isolation, question version changes, failed persistence, checklist/reading decoupling, and accessible keyboard/touch navigation.

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Result |
|---|---|---|
| **1. Prepare a concrete scoring, retry, answer-feedback, and retained-result policy for course-owner approval before enabling the final quiz behavior.** | **Observed in documentation & decision record:** Concrete quiz policy is authored in `docs/ASSESSMENT_POLICY_PROPOSAL.md`. Formally accepted by course owner MahmoudAlmodalal on 2026-10-20 in `docs/edu-review/owner-decision-package-70.md` (v2, Course-owner decisions section): 1 point correct, 0 incorrect or unanswered, unlimited retries, feedback after submit, and all attempts retained with question and policy versions. | **Passed** |
| **2. Provide educationally reviewed objective questions in a representative existing Topic; grade correct, incorrect, and unanswered responses according to the approved policy.** | **Observed in browser & code:** In representative Topic 01 (`project-idea-mvp`), two objective questions (`idea-mvp-q-evidence` and `idea-mvp-q-journey`) provide clear prompts, options, explanations, and passing narrow review evidence. Submitting 1 correct + 1 incorrect scores 1/2; submitting 1 correct + 1 unanswered scores 1/2; submitting 2 unanswered scores 0/2. Verified in `e2e/learning-assessments.spec.ts` and `src/lib/learningRecords.test.ts`. | **Passed** |
| **3. Make quiz controls accessible and render explanatory feedback without implying practical correctness or mastery.** | **Observed in browser:** Keyboard Tab navigation reaches radio options, Space selects an option, Enter submits the form, and Tab reaches "إعادة المحاولة" (retry). Touch targets for labels and buttons measure >= 44px height. Explanatory feedback is rendered for correct ("إجابة صحيحة في هذا الفحص الذاتي"), incorrect ("الإجابة تحتاج إلى مراجعة"), and unanswered ("لم تُجب عن هذا السؤال") questions with `role="status"` and `aria-live="polite"`. Prominent disclaimer is rendered: "هذه النتيجة لا تثبت صحة التطبيق أو إتقان المشروع." Verified in `e2e/learning-assessments.spec.ts`. | **Passed** |
| **4. Retain the approved result/attempt information against stable Topic and question identities; define behavior when question content changes.** | **Observed in browser & storage:** Stored records in `ai-agents-quiz-attempts-v1` record `attemptId`, `topicSlug`, `quizId`, `quizVersion`, `policyId`, `policyVersion`, and versioned question answers. When question content changes (`questionVersion` bumped), prior attempts remain preserved in collapsible history (`عرض سجل المحاولات`) labeled as `نسخة سابقة`; the updated question form starts clean without inheriting outdated selections, and notice explains: "توجد محاولات من اختبارات أو نسخ سابقة؛ تبقى محفوظة بهويتها وإصداراتها ولا تُحتسب كإجابات للنسخة الحالية." Verified in `e2e/learning-assessments.spec.ts`. | **Passed** |
| **5. Restore results after reload and across supported reader entry points; show honest saving status on storage failure.** | **Observed in browser:** Latest quiz attempt is restored after full page reload at `/learn/project-idea-mvp` and inside the modal preview (`TopicDetailModal`). When `localStorage.setItem` fails, the UI displays "آخر نتيجة في هذه الجلسة، وقد لا تبقى بعد إعادة التحميل" and "تعذر حفظ السجل على هذا الجهاز"; after reload, no false result is restored. Verified in `e2e/learning-assessments.spec.ts`. | **Passed** |
| **6. Keep quiz results distinct from reading, checklist selections, rubric assessment, and any completion signal.** | **Observed in browser & storage:** Submitting or retrying a quiz does not alter application checklist selections (`application-checklists-v1`), practical rubric ratings (`ai-agents-practical-assessments-v1`), reading recency (`engineering_guide_recently_viewed`), or badge award state (`ai-agents-badge-awards-v1`). Selecting checklist items or rubric ratings does not modify quiz records. No completion banner or mastery status is emitted. Verified in `e2e/learning-assessments.spec.ts`. | **Passed** |
| **7. Verify submission, scoring, retry behavior, reload, profile isolation, version changes, and failed persistence through observable browser behavior.** | **Observed in browser:** The 9 end-to-end tests in `e2e/learning-assessments.spec.ts` pass cleanly against production Chrome, proving submission, scoring, retry, reload, cross-entry-point synchronization, browser profile isolation (`browser.newContext()` receives empty records), question version transitions, storage failure signaling, and decoupled checklist/rubric state. | **Passed** |

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
**Outcome:** Passed 65/65 unit tests (exit code 0, duration: ~590ms).
```
✔ semantic identity survives reorder and whitespace/NFC edits; changed text has no inherited check (3.8ms)
✔ topic identity isolates identical labels; readers share snapshots and unsubscribe cleanly (0.7ms)
✔ read failures retain every local change and merge with previously saved choices after recovery (1.2ms)
✔ write failures preserve multiple checks and clearing; errors do not leak into another topic (1.0ms)
✔ malformed documents and malformed item arrays remain byte-for-byte intact (1.4ms)
✔ existing exact semantic saves restore without writing; positional saves never imply a match (0.5ms)
✔ refresh merges external topic updates and local pending choices without discarding either (0.8ms)
✔ storage getter failures and prototype-like topic keys cannot crash or mutate another topic (0.6ms)
✔ draft or incomplete owner approval never creates awarded or unearned badge states (3.5ms)
✔ previewOnly attempts are excluded from approved award eligibility (1.3ms)
✔ approved versioned awards persist across reload, revoke after evidence reversal, and can be earned again (2.5ms)
✔ policy or rule version changes retire old awards and evaluate the newly approved version (0.9ms)
✔ unavailable evidence suspends award reconciliation until the source recovers (1.3ms)
✔ malformed award history is not overwritten and storage failures keep session events visible (0.9ms)
✔ empty profile shows no matched draft conditions (1.1ms)
✔ reading proposal counts only the visible recent list and makes no completion claim (0.3ms)
✔ previewOnly quiz attempts can match a clearly labeled draft preview but are excluded from award-eligible evidence (1.5ms)
✔ rubric preview uses current ratings and does not resurrect cleared ratings from history (0.7ms)
✔ unavailable evidence is reported as unconfirmed instead of as an empty draft condition (0.3ms)
✔ dashboard checklist status distinguishes invalid documents from blocked reads (1.6ms)
✔ group split preserves exact byte-for-byte topic records across all 58 canonical topics (18.3ms)
✔ export includes every application Mermaid perspective and a readable course summary (3.7ms)
✔ readable learning summary includes versioned questions, scoring policy and self-assessment rubric (0.8ms)
✔ export availability lists all expected topic outputs and labels unavailable record counts (4.1ms)
✔ owner approval requires the full audit evidence before enabling policy or video links (5.2ms)
✔ quiz attempts retain scoring detail, question versions, retries, and Topic isolation across reloads (18.5ms)
✔ a revised rubric keeps retired ratings recoverable without applying them to a new criterion version (4.4ms)
✔ a revised rubric scale archives old-scale judgments instead of interpreting them as current (0.6ms)
✔ a replaced practical assessment archives its ratings even when criterion IDs overlap (0.9ms)
✔ legacy rubric history without parent assessment identity remains readable (0.6ms)
✔ blocked writes keep session records and honestly restore them when persistence recovers (1.7ms)
✔ practical judgments stay isolated by stable Topic slug across reloads (0.7ms)
✔ malformed nested records remain untouched and are reported as invalid (0.6ms)
✔ list snapshots keep quiz and practical storage failures distinct (3.3ms)
✔ shape-valid but impossible quiz records are rejected instead of restoring inaccurate scores (1.1ms)
✔ grades and retains an all-unanswered quiz attempt with score zero according to policy (0.7ms)
✔ only frozen topic and exact label recover positional saves, including after reorder (2.4ms)
✔ stable HTML identity is collision safe and independent of structured criteria (0.5ms)
✔ legacy blocked reads/writes keep multiple local choices; recovery saves them without changing old keys (1.9ms)
✔ corrupt stable HTML data is preserved and does not fall back to a positional save (0.5ms)
✔ bundle readiness requires the real HTML, payload, and every recorded asset (33.1ms)
✔ bundle readiness requires a snapshot for every Mermaid perspective (3.6ms)
✔ offline capability detection and legacy manifest reads survive blocked localStorage (0.4ms)
✔ removing an offline bundle leaves learner records untouched (1.6ms)
✔ legacy manifest data remains readable without making localStorage authoritative (0.4ms)
✔ orphaned legacy localStorage entries without Cache Storage return unsaved and are cleaned up (0.6ms)
✔ rollback restores a previously complete bundle pointer safely (25.7ms)
✔ transient storage error does not purge index pointer or localStorage mirror and reports unverified (2.9ms)
✔ getTopicRollbackCandidate identifies complete historical bundles and excludes active bundle (4.5ms)
✔ several failed saves remain in the session snapshot and merge safely when storage recovers (4.8ms)
✔ a failed removal remains visible and is applied after a later refresh (1.1ms)
✔ blocked reads keep requested session edits until a later focus-style refresh succeeds (0.9ms)
✔ malformed saved data stays byte-for-byte intact and is reported as invalid (0.7ms)
✔ source revisions change when the original prompt text changes (0.5ms)
✔ malformed bookmarks and recently viewed stay byte-for-byte intact when user saves new items (3.1ms)
✔ read failure keeps session choices and merges safely when storage recovers (0.7ms)
✔ write failure preserves session choices and persists when storage recovers (0.4ms)
✔ ambiguous historical records remain preserved and unresolved, never assigned to unrelated topics (0.6ms)
✔ reading activity and checklist selections remain strictly independent in storage (0.4ms)
✔ remove during write failure does not resurrect on recovery (0.4ms)
✔ read recovery on next write merges unread earlier records safely (0.3ms)
✔ history recency puts new views first and explicit clear intent persists on recovery (0.7ms)
✔ externally repaired malformed storage safely recovers and merges session changes (0.6ms)
✔ creates a valid UTF-8 ZIP whose stored files can be opened and inspected (3.2ms)
✔ rejects duplicate and traversal paths instead of producing an unsafe package (1.1ms)
ℹ tests 65
ℹ suites 0
ℹ pass 65
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

### Gate 3: Production build
```sh
npm run build
```
**Outcome:** Passed (exit code 0).
```
   ▲ Next.js 15.5.28
   Creating an optimized production build ...
 ✓ Compiled successfully in 4.4s
   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (182/182)
   Collecting build traces     ✓ Collecting build traces 
   Finalizing page optimization     ✓ Finalizing page optimization 
```

### Gate 4: Playwright E2E browser tests
```sh
E2E_SERVER=production E2E_PORT=3250 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/learning-assessments.spec.ts e2e/learning-pilot-integration.spec.ts
```
**Outcome:** Passed 25/25 tests (exit code 0, duration: 54.5s).
```
Running 25 tests using 1 worker

[1/25] objective quiz and practical self-assessment › grades answers, keeps retries and restores the latest attempt and rubric choices
[2/25] objective quiz and practical self-assessment › uses the same local quiz and rubric records in the full reader and quick preview, isolated by browser profile
[3/25] objective quiz and practical self-assessment › keeps quiz attempts and rubric judgments attached to their Topic
[4/25] objective quiz and practical self-assessment › shows retained prior-version history without presenting it as a current result or rating
[5/25] objective quiz and practical self-assessment › labels a failed quiz write as session-only and does not restore it after reload
[6/25] objective quiz and practical self-assessment › labels a failed rubric write and does not restore the session-only judgment after reload
[7/25] objective quiz and practical self-assessment › keeps quiz results strictly distinct from reading activity, checklist selections, rubric assessment, and completion signals
[8/25] objective quiz and practical self-assessment › retains historical attempt when a question version is updated and begins the new version unselected
[9/25] objective quiz and practical self-assessment › supports accessible keyboard navigation, visible focus ring, ARIA status announcements, and touch target sizing
[10/25] Learning pilot integration › search and filters still find the first topic and theme survives direct reading at 390px
[11/25] Learning pilot integration › search and filters still find the first topic and theme survives direct reading at 768px
[12/25] Learning pilot integration › search and filters still find the first topic and theme survives direct reading at 1024px
[13/25] Learning pilot integration › search and filters still find the first topic and theme survives direct reading at 1366px
[14/25] Learning pilot integration › search and filters still find the first topic and theme survives direct reading at 1440px
[15/25] Learning pilot integration › dark utility colors follow the saved theme when OS preference differs
[16/25] Learning pilot integration › full reader copies authored content and invokes print and speech controls at 390px
[17/25] Learning pilot integration › full reader copies authored content and invokes print and speech controls at 768px
[18/25] Learning pilot integration › full reader copies authored content and invokes print and speech controls at 1024px
[19/25] Learning pilot integration › full reader copies authored content and invokes print and speech controls at 1366px
[20/25] Learning pilot integration › full reader copies authored content and invokes print and speech controls at 1440px
[21/25] Learning pilot integration › reading and preview remain usable at 390px
[22/25] Learning pilot integration › reading and preview remain usable at 768px
[23/25] Learning pilot integration › reading and preview remain usable at 1024px
[24/25] Learning pilot integration › reading and preview remain usable at 1366px
[25/25] Learning pilot integration › reading and preview remain usable at 1440px
  25 passed (54.5s)
```

---

## 4. Honest boundaries and limits

1. **Course-owner policy vs individual topic review packages:**
   The general quiz scoring, retry, retention, and feedback policy was accepted by the course owner on 2026-10-20 (decision package 70 v2). However, individual educational content reviews for other curriculum groups remain scoped to their respective review packages; this issue demonstrates the approved quiz behavior on the representative existing Topic 01 (`project-idea-mvp`).
2. **Browser scope:**
   In line with owner decisions, production Chromium is the accepted browser scope for MVP claims. Testing was conducted with Google Chrome (`E2E_BROWSER_CHANNEL=chrome`).
3. **No mastery or accreditation claim:**
   Quiz attempts and scores are local self-check mechanisms only. The application renders prominent disclaimers and never infers practical correctness, project completion, or course mastery from quiz results.
4. **No backend or account synchronization:**
   All attempts remain browser-local in `localStorage`. Cross-device synchronization or account registration is not implemented by design.
