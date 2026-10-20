# Issue #42 review: Complete a Topic quiz and restore its local result

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 04] Complete a Topic quiz and restore its local result  
**Date:** 2026-10-20  
**Status:** Accepted / Verified  

---

## 1. Summary of changes

In accordance with Course Owner Decision Package 70 (v2, 2026-10-20, Course-owner decisions section) and `docs/ASSESSMENT_POLICY_PROPOSAL.md`, the course owner's accepted quiz policy was formally applied in the product across all 58 canonical Topics. The learner-visible policy wording reflects honest truth across three distinct states, and product text describing the policy as proposed or candidate was updated.

### Key implementations and test coverage:

- **Accepted quiz policy applied in product (`src/data/learning/group-a-common.ts`, `src/data/learning/group-b-base.ts`):**
  - Course owner MahmoudAlmodalal formally accepted the quiz policy on 2026-10-20: 1 point per correct answer, 0 for incorrect or unanswered, unlimited retries, explanatory feedback after submit, and retention of all attempts with question, quiz, and policy versions.
  - Decision reference string:
    `docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #42)`
  - Applied as default `quizScoringPolicyApproval` across all 58 Topics in both shared builders using the existing `approvedPolicy` helper:
    `approvedPolicy('MahmoudAlmodalal (course owner)', '2026-10-20', 'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #42)')`
  - Per-topic override support is preserved: if any Topic provides its own `quizScoringPolicyApproval`, that approval takes precedence.
  - Replaced the quiz-level `reviewEvidence` default text in both shared builders: updated from stating that scoring policy approval had not run to stating that the scoring policy is accepted while per-topic question educational review is tracked separately and remains pending.
  - Rubric scale approval remains untouched (`proposed`), owned by issue #43.

- **Unified policy wording mechanism with three honest states (`src/lib/learningPolicy.ts`, `src/data/learning/group-a-common.ts`, `src/data/learning/group-b-base.ts`):**
  - Exported `resolvePolicyWordingState(reviewState, approval, evidenceGroups)` in `src/lib/learningPolicy.ts` returning `'approved' | 'pending' | 'draft'`.
  - Stored records in both builders dynamically resolve quiz instructions, scoring policy summary, and rubric scale summary using this single mechanism:
    1. **State 1 (`approved`):** Policy accepted AND Topic educational review complete (`reviewState === 'approved'` and passing dated evidence for lesson, questions, and rubric):
       - **Quiz instructions:**
         `اختر الإجابة الأدق ثم اقرأ التفسير. سياسة تقييم معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات؛ الفحص لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
       - **Quiz scoring policy summary:**
         `سياسة معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
       - **Rubric scale summary:**
         `مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
    2. **State 2 (`pending`):** Policy accepted AND Topic educational review still pending:
       - **Quiz instructions:**
         `اختر الإجابة الأدق ثم اقرأ التفسير. سياسة تقييم معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك تظهر النتيجة كمعاينة فحص ذاتي وليست نتيجة نهائية. الفحص لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
       - **Quiz scoring policy summary:**
         `سياسة معتمدة: نقطة للإجابة الصحيحة وصفر للإجابة الخاطئة أو غير المجابة، مع إتاحة إعادة المحاولة غير المحدودة وإظهار التفسير بعد الإرسال والاحتفاظ بكافة المحاولات ذات الإصدارات؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك تظهر النتيجة كمعاينة فحص ذاتي وليست نتيجة نهائية. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
       - **Rubric scale summary:**
         `مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك يُعد التقييم معاينة فحص ذاتي وليس نتيجة نهائية. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
    3. **State 3 (`draft`):** Policy not accepted:
       - Preserves the existing draft text unchanged for Group A and Group B.

- **Updated product wording describing policies (`src/components/DashboardExperience.tsx`, `src/components/TopicLearningActivities.tsx`):**
  - Updated `DashboardExperience.tsx` and reader UI: removed descriptions calling scoring policies "candidate" or "proposed" (مقترح/مرشح).
  - Quizzes and practical sections describe the accepted policy accurately while retaining honest boundaries: self-assessment is the learner's own judgment and not an independent verification, and no completion or mastery is inferred from a visit, a scroll, a quiz answer, or a checklist selection.

- **E2E browser injection hook and test-only fixture (`src/components/TopicLearningActivities.tsx`, `e2e/fixtures/testTopicFixture.ts`):**
  - `TopicLearningActivities.tsx` reads `window.__AI_AGENTS_E2E_TOPIC_CONTENT__`. Documented as an E2E-only injection point affecting only client rendering in the active test page, guarded strictly to execute only when the value is a plain object.
  - Created test-only fixture helper `createApprovedTestTopic` in `e2e/fixtures/testTopicFixture.ts` with `reviewState: 'approved'` and dated passing lesson, quiz, and rubric evidence. No real Topic record is modified.

- **Browser coverage for all three states (`e2e/learning-assessments.spec.ts`):**
  - Verified pending review state on representative Topic 01 (`project-idea-mvp`): shows accepted policy wording + pending review sentence, and results are labeled as a self-check preview with `previewOnly: true`.
  - Verified approved review state using the E2E fixture hook: shows final wording with no pending sentence, no preview badge, and results stored as a real record with `previewOnly: false`.
  - Verified dashboard behavior: accurately describes accepted quiz policy and affirms self-assessment limits with no completion/mastery inference.

- **Deliberate baseline updates (`learning-content-hashes.json`, `learning-content-review-summary.json`):**
  - Regenerated manifests following the policy application.
  - Verified that ONLY the intended fields moved: `quiz.scoringPolicy.approval`, `quiz.instructions`, `quiz.scoringPolicy.summary`, quiz-level `reviewEvidence`, and the question-review sentence in Group B lesson evidence.
  - Zero educational content (lesson text, questions, options, answer keys, explanations, criteria, outputs, or topic identities) changed.

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Result |
|---|---|---|
| **1. Apply accepted quiz policy to every Topic** | **Observed in builders & manifests:** Shared builders default `quizScoringPolicyApproval` to `ACCEPTED_QUIZ_SCORING_POLICY_APPROVAL` with owner name, date `2026-10-20`, and decision reference. `learning-content-review-summary.json` records all 58 Topics with `state: "approved"`. Rubric scale approval remains `proposed`. Per-topic override preserved. | **Passed** |
| **2. One wording mechanism in three states** | **Observed in code & unit tests:** `resolvePolicyWordingState` in `src/lib/learningPolicy.ts` handles the 3 states (`approved`, `pending`, `draft`). Used uniformly in `group-a-common.ts` and `group-b-base.ts`. Unit tests in `src/lib/learningPolicy.test.ts` verify all resolution paths. | **Passed** |
| **3. Fix product wording calling policy proposed** | **Observed in browser & code:** `DashboardExperience.tsx` and `TopicLearningActivities.tsx` updated to describe accepted policy; all references to candidate/proposed scoring policies removed while affirming honest self-assessment limits and no completion/mastery inference. | **Passed** |
| **4. Cover three states at browser boundary** | **Observed in Playwright tests:** 3 dedicated browser tests in `e2e/learning-assessments.spec.ts` assert pending review behavior, fully approved behavior via `__AI_AGENTS_E2E_TOPIC_CONTENT__` fixture, and dashboard policy representation. | **Passed** |
| **5. Update committed baselines deliberately** | **Observed in manifest diff:** Diff of `learning-content-review-summary.json` shows exactly 58 Topics updating `quizScoringPolicyApproval` (232 additions / 232 deletions). Zero changes to `reviewState`, `rubricScaleApproval`, lesson content, questions, options, answer keys, or criteria. | **Passed** |
| **6. Evidence file updated with real counts** | **Observed in document:** `docs/edu-review/issue-42-review.md` updated with exact Arabic wording, verification logs, baseline diff proofs, and explicit statement on pending educational reviews. | **Passed** |

---

## 3. Baseline diff analysis and verification of moved fields

Comparing the exported Topic records before and after this change confirms:

### Fields that moved in `src/data/learning/learning-content-review-summary.json`:
- Exactly 58/58 Topics moved `quizScoringPolicyApproval`:
  - `state`: `"proposed"` -> `"approved"`
  - `approvedBy`: `null` -> `"MahmoudAlmodalal (course owner)"`
  - `approvedAt`: `null` -> `"2026-10-20"`
  - `decisionReference`: `null` -> `"docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #42)"`

### Fields that moved in Topic content & `learning-content-hashes.json`:
- `quiz.scoringPolicy.approval`: updated to accepted policy object across all 58 Topics.
- `quiz.instructions`: updated to State 2 wording (`PENDING_QUIZ_INSTRUCTIONS`).
- `quiz.scoringPolicy.summary`: updated to State 2 wording (`PENDING_QUIZ_SCORING_POLICY_SUMMARY`).
- `quiz.reviewEvidence`: updated default text in both shared builders to state that scoring policy is accepted and question review is pending.
- `lessonReviewEvidence`: updated question-review clause in Group B default text.

### Fields verified completely unchanged (Proof of zero unintended drift):
- `reviewState`: **0 moved** (all 58 remain `"draft"`).
- `rubricScaleApproval`: **0 moved** (all 58 remain `"proposed"`).
- Lesson content / activities: **0 moved**.
- Quiz questions, option IDs, labels, correctness flags, answer keys: **0 moved**.
- Question explanations: **0 moved**.
- Rubric criteria, levels, descriptions: **0 moved**.
- Topic identity, slugs, titles, descriptions, required outputs: **0 moved**.

---

## 4. Verification commands and exact results

### Gate 1: Typecheck and lint
```sh
npm run lint
```
**Outcome:** Passed (exit code 0).
```
> ai-agents@1.0.0 lint
> tsc --noEmit
```

### Gate 2: Lib unit tests
```sh
npx tsx --test src/lib/*.test.ts
```
**Outcome:** Passed 66/66 unit tests (exit code 0, duration: ~550ms).
```
✔ semantic identity survives reorder and whitespace/NFC edits; changed text has no inherited check (3.6ms)
✔ topic identity isolates identical labels; readers share snapshots and unsubscribe cleanly (0.6ms)
✔ read failures retain every local change and merge with previously saved choices after recovery (1.0ms)
✔ write failures preserve multiple checks and clearing; errors do not leak into another topic (0.8ms)
✔ malformed documents and malformed item arrays remain byte-for-byte intact (1.1ms)
✔ existing exact semantic saves restore without writing; positional saves never imply a match (0.4ms)
✔ refresh merges external topic updates and local pending choices without discarding either (0.6ms)
✔ storage getter failures and prototype-like topic keys cannot crash or mutate another topic (0.5ms)
✔ draft or incomplete owner approval never creates awarded or unearned badge states (2.8ms)
✔ previewOnly attempts are excluded from approved award eligibility (1.0ms)
✔ approved versioned awards persist across reload, revoke after evidence reversal, and can be earned again (2.1ms)
✔ policy or rule version changes retire old awards and evaluate the newly approved version (0.7ms)
✔ unavailable evidence suspends award reconciliation until the source recovers (1.1ms)
✔ malformed award history is not overwritten and storage failures keep session events visible (0.7ms)
✔ empty profile shows no matched draft conditions (0.9ms)
✔ reading proposal counts only the visible recent list and makes no completion claim (0.3ms)
✔ previewOnly quiz attempts can match a clearly labeled draft preview but are excluded from award-eligible evidence (1.2ms)
✔ rubric preview uses current ratings and does not resurrect cleared ratings from history (0.6ms)
✔ unavailable evidence is reported as unconfirmed instead of as an empty draft condition (0.3ms)
✔ dashboard checklist status distinguishes invalid documents from blocked reads (1.3ms)
✔ group split preserves exact byte-for-byte topic records across all 58 canonical topics (15.5ms)
✔ export includes every application Mermaid perspective and a readable course summary (3.2ms)
✔ readable learning summary includes versioned questions, scoring policy and self-assessment rubric (0.7ms)
✔ export availability lists all expected topic outputs and labels unavailable record counts (3.6ms)
✔ owner approval requires the full audit evidence before enabling policy or video links (4.3ms)
✔ resolvePolicyWordingState returns approved when reviewState is approved, policy is approved, and all evidence passes (0.6ms)
✔ resolvePolicyWordingState returns pending when policy is approved but topic review is incomplete (0.3ms)
✔ resolvePolicyWordingState returns draft when policy approval is proposed or missing (0.2ms)
✔ quiz attempts retain scoring detail, question versions, retries, and Topic isolation across reloads (15.2ms)
✔ a revised rubric keeps retired ratings recoverable without applying them to a new criterion version (3.7ms)
✔ a revised rubric scale archives old-scale judgments instead of interpreting them as current (0.5ms)
✔ a replaced practical assessment archives its ratings even when criterion IDs overlap (0.8ms)
✔ legacy rubric history without parent assessment identity remains readable (0.5ms)
✔ blocked writes keep session records and honestly restore them when persistence recovers (1.4ms)
✔ practical judgments stay isolated by stable Topic slug across reloads (0.6ms)
✔ malformed nested records remain untouched and are reported as invalid (0.5ms)
✔ list snapshots keep quiz and practical storage failures distinct (2.8ms)
✔ shape-valid but impossible quiz records are rejected instead of restoring inaccurate scores (0.9ms)
✔ grades and retains an all-unanswered quiz attempt with score zero according to policy (0.6ms)
✔ only frozen topic and exact label recover positional saves, including after reorder (2.0ms)
✔ stable HTML identity is collision safe and independent of structured criteria (0.4ms)
✔ legacy blocked reads/writes keep multiple local choices; recovery saves them without changing old keys (1.6ms)
✔ corrupt stable HTML data is preserved and does not fall back to a positional save (0.4ms)
✔ bundle readiness requires the real HTML, payload, and every recorded asset (28.3ms)
✔ bundle readiness requires a snapshot for every Mermaid perspective (3.0ms)
✔ offline capability detection and legacy manifest reads survive blocked localStorage (0.3ms)
✔ removing an offline bundle leaves learner records untouched (1.3ms)
✔ legacy manifest data remains readable without making localStorage authoritative (0.3ms)
✔ orphaned legacy localStorage entries without Cache Storage return unsaved and are cleaned up (0.5ms)
✔ rollback restores a previously complete bundle pointer safely (21.4ms)
✔ transient storage error does not purge index pointer or localStorage mirror and reports unverified (2.4ms)
✔ getTopicRollbackCandidate identifies complete historical bundles and excludes active bundle (3.7ms)
✔ several failed saves remain in the session snapshot and merge safely when storage recovers (4.0ms)
✔ a failed removal remains visible and is applied after a later refresh (0.9ms)
✔ blocked reads keep requested session edits until a later focus-style refresh succeeds (0.7ms)
✔ malformed saved data stays byte-for-byte intact and is reported as invalid (0.5ms)
✔ source revisions change when the original prompt text changes (0.4ms)
✔ malformed bookmarks and recently viewed stay byte-for-byte intact when user saves new items (2.6ms)
✔ read failure keeps session choices and merges safely when storage recovers (0.6ms)
✔ write failure preserves session choices and persists when storage recovers (0.3ms)
✔ ambiguous historical records remain preserved and unresolved, never assigned to unrelated topics (0.5ms)
✔ reading activity and checklist selections remain strictly independent in storage (0.3ms)
✔ remove during write failure does not resurrect on recovery (0.3ms)
✔ read recovery on next write merges unread earlier records safely (0.3ms)
✔ history recency puts new views first and explicit clear intent persists on recovery (0.5ms)
✔ externally repaired malformed storage safely recovers and merges session changes (0.5ms)
✔ creates a valid UTF-8 ZIP whose stored files can be opened and inspected (2.6ms)
✔ rejects duplicate and traversal paths instead of producing an unsafe package (0.9ms)
ℹ tests 66
ℹ suites 0
ℹ pass 66
ℹ fail 0
```

### Gate 3: Learning data tests
```sh
npx tsx --test src/data/learning/group-split.test.ts src/data/learning/group-a.test.ts src/lib/groupSplit.test.ts
```
**Outcome:** Passed 6/6 tests (exit code 0, duration: ~350ms).
```
✔ group split preserves exact byte-for-byte topic records across all 58 canonical topics (18.6ms)
✔ group a builder sets accepted quiz policy defaults and pending wording while preserving draft reviewState (17.5ms)
✔ group a builder supports per-topic policy overrides and draft wording fallback (0.6ms)
✔ group a builder supports fully approved review state and final wording (0.4ms)
✔ group split preserves exact byte-for-byte topic records across all 58 canonical topics (15.7ms)
✔ learning manifest review summary stays in sync with built topics (2.1ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
```

### Gate 4: Production build
```sh
npm run build
```
**Outcome:** Passed (exit code 0).
```
   ▲ Next.js 15.5.28
   Creating an optimized production build ...
 ✓ Compiled successfully in 4.3s
   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (182/182)
   Collecting build traces     ✓ Collecting build traces 
   Finalizing page optimization     ✓ Finalizing page optimization 
```

### Gate 5: Playwright E2E browser tests
```sh
E2E_SERVER=production E2E_PORT=3250 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/learning-assessments.spec.ts
```
**Outcome:** Passed 12/12 tests (exit code 0, duration: 56.8s).
```
Running 12 tests using 1 worker

[1/12] objective quiz and practical self-assessment › grades answers, keeps retries and restores the latest attempt and rubric choices
[2/12] objective quiz and practical self-assessment › uses the same local quiz and rubric records in the full reader and quick preview, isolated by browser profile
[3/12] objective quiz and practical self-assessment › keeps quiz attempts and rubric judgments attached to their Topic
[4/12] objective quiz and practical self-assessment › shows retained prior-version history without presenting it as a current result or rating
[5/12] objective quiz and practical self-assessment › labels a failed quiz write as session-only and does not restore it after reload
[6/12] objective quiz and practical self-assessment › labels a failed rubric write and does not restore the session-only judgment after reload
[7/12] objective quiz and practical self-assessment › keeps quiz results strictly distinct from reading activity, checklist selections, rubric assessment, and completion signals
[8/12] objective quiz and practical self-assessment › retains historical attempt when a question version is updated and begins the new version unselected
[9/12] objective quiz and practical self-assessment › supports accessible keyboard navigation, visible focus ring, ARIA status announcements, and touch target sizing
[10/12] objective quiz and practical self-assessment › Topic with accepted quiz policy but pending educational review shows accepted policy and pending statement, presented as self-check preview
[11/12] objective quiz and practical self-assessment › Topic with accepted policy, approved reviewState, and passing evidence shows final wording without preview marker and retains attempt as real record
[12/12] objective quiz and practical self-assessment › Dashboard describes accepted quiz policy and affirms self-assessment limits with no completion inferred
  12 passed (56.8s)
```

---

## 5. Honest boundaries and limits

1. **Per-Topic educational review remains pending for every group:**
   While the quiz scoring, retry, feedback, and attempt-retention policy is accepted at the course-owner level, the per-Topic educational content review for every curriculum group (Group A, Group B, and all others) remains pending. No real Topic was marked as reviewed; `reviewState` remains `"draft"` across all 58 canonical Topics.
2. **Test fixture isolation:**
   The fully approved review state test uses a strictly test-only fixture (`createApprovedTestTopic` in `e2e/fixtures/testTopicFixture.ts`) injected via `window.__AI_AGENTS_E2E_TOPIC_CONTENT__`. No real Topic's review state or evidence was fabricated or changed.
3. **Rubric scale approval scope:**
   Rubric scale approval remains in `"proposed"` state across all 58 Topics; it is strictly owned by issue #43.
4. **No mastery or accreditation claim:**
   Quiz attempts and scores are local self-check mechanisms only. The application renders prominent disclaimers and never infers practical correctness, project completion, or course mastery from quiz results or checklist choices.
5. **No backend or account synchronization:**
   All attempts remain browser-local in `localStorage`. Cross-device synchronization or account registration is not implemented by design.
