# Issue #43 review: Apply the course owner's accepted practical self-assessment policy in the product

**Parent issue:** [MahmoudAlmodalal/Ai_agents#43](https://github.com/MahmoudAlmodalal/Ai_agents/issues/43)  
**Task reference:** [MVP #43] Apply accepted practical self-assessment policy in product  
**Date:** 2026-10-20  
**Status:** Accepted / Verified  

---

## 1. Summary of changes

In accordance with Course Owner Decision Package 70 (v2, 2026-10-20, Course-owner decisions section) and `docs/ASSESSMENT_POLICY_PROPOSAL.md`, the course owner's accepted practical self-assessment policy was formally applied in the product across all 58 canonical Topics. The practical self-assessment rubric scale is no longer presented as a candidate or proposed in the product. The learner-visible wording reflects honest truth across three distinct states, and product text describing the policy as proposed or candidate was updated.

### Key implementations and policy limits:

- **Accepted practical self-assessment policy applied in product (`src/data/learning/group-a-common.ts`, `src/data/learning/group-b-base.ts`):**
  - Course owner MahmoudAlmodalal formally accepted the practical self-assessment policy on 2026-10-20:
    - Learner-reported levels: `not-yet` (لم يبدأ / لم أبدأ بعد), `in-progress` (قيد العمل), `ready-for-review` (جاهز للمراجعة).
    - `no-mastery-threshold` completion rule (no mastery threshold).
    - No independent-correctness claim: a self-assessment is the learner's own judgment and not an independent verification.
    - Every criterion refers to a concrete output of the learner's own project with BorrowHub explicitly optional.
    - Judgments are stored against stable criterion identities and versions and can be revised or cleared at any time.
  - Decision reference string:
    `'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #43)'`
  - Applied as default `rubricScaleApproval` across all 58 Topics in both shared builders using the existing `approvedPolicy` helper:
    `approvedPolicy('MahmoudAlmodalal (course owner)', '2026-10-20', 'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #43)')`
  - Per-topic override support is preserved: if any Topic provides its own `rubricScaleApproval`, that approval takes precedence.
  - Replaced the rubric-level `reviewEvidence` default text in both shared builders: updated from stating that rubric policy has not been approved to stating that the rubric policy is accepted while per-topic criterion educational review is tracked separately and remains pending.
  - Quiz policy is untouched (owned by issue #42). `reviewState` for every real Topic remains unchanged (`draft` in Group A, `review-ready` in Group B; 0 real Topics are marked approved). Educational review of every curriculum group remains pending.

- **Unified policy wording mechanism with three honest states (`src/lib/learningPolicy.ts`, `src/data/learning/group-a-common.ts`, `src/data/learning/group-b-base.ts`):**
  - Uses the single `resolvePolicyWordingState(reviewState, approval, evidenceGroups)` mechanism returning `'approved' | 'pending' | 'draft'`.
  - Stored records in both builders dynamically resolve `rubricScaleSummary` using this single mechanism:
    1. **State 1 (`approved`):** Policy accepted AND this Topic's educational review complete (`reviewState === 'approved'` and passing dated evidence for lesson, questions, and rubric criteria):
       - **Rubric scale summary:**
         `مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
    2. **State 2 (`pending`):** Policy accepted AND Topic educational review still pending:
       - **Rubric scale summary:**
         `مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك يُعد التقييم معاينة فحص ذاتي وليس نتيجة نهائية. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.`
    3. **State 3 (`draft`):** Policy not accepted:
       - Group A: `مقياس وصفي مقترح للتأمل الذاتي فقط؛ لا يحسب إتقاناً ولا يفرض حداً للإكمال.`
       - Group B: `مقياس وصفي ذاتي بلا حد إتقان أو تحقق مستقل.`
  - Limits kept in every state: the self-assessment is the learner's own judgment, not an independent verification; there is no mastery threshold; and reading, scrolling, or quiz results never select a practical criterion or change a practical judgment.

- **Checklist and practical rubric independence:**
  - The application checklist continues working as before and was extended rather than replaced.
  - Selections and judgments are stored under stable criterion identities in separate storage namespaces (`ai-agents-practical-assessments-v1` vs checklist stores vs quiz attempt stores).
  - Selecting a checklist item or answering a quiz never selects a rubric criterion, and selecting a rubric criterion never checks a checklist item.
  - The dashboard (`/dashboard`) and the export archive keep checklist, quiz, and practical assessment records strictly apart in dedicated sections and JSON properties.

- **Revisability, history retention, and unselected new criteria:**
  - Learner ratings can be revised (e.g. from `ready-for-review` to `in-progress`) or cleared at any time.
  - A criterion version change retains earlier judgments in the local history and presents the new criterion version unselected without carrying forward outdated judgments.

---

## 2. The three rubric wording states (Arabic text)

| State | Condition | Exact Arabic text |
|---|---|---|
| **State 1: Approved** | Rubric policy accepted AND Topic educational review complete (`reviewState === 'approved'` with passing dated lesson, question, and rubric evidence). | `مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.` |
| **State 2: Pending** | Rubric policy accepted AND Topic educational review remains pending (all 58 real Topics). | `مقياس وصفي معتمد للتأمل الذاتي بمستوياته الثلاثة بلا حد إتقان؛ المراجعة التعليمية لهذا الموضوع ما زالت معلقة، لذلك يُعد التقييم معاينة فحص ذاتي وليس نتيجة نهائية. لا يمثل إتقاناً أو اعتماداً أو نتيجة موثقة بشكل مستقل.` |
| **State 3: Draft** | Rubric policy not accepted (`state: 'proposed'`). | Group A: `مقياس وصفي مقترح للتأمل الذاتي فقط؛ لا يحسب إتقاناً ولا يفرض حداً للإكمال.`<br>Group B: `مقياس وصفي ذاتي بلا حد إتقان أو تحقق مستقل.` |

---

## 3. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Where it lives | Browser test |
|---|---|---|---|
| **1. Apply accepted rubric policy to every Topic** | Both shared builders default `rubricScaleApproval` to `ACCEPTED_RUBRIC_SCALE_APPROVAL` with owner `MahmoudAlmodalal (course owner)`, date `2026-10-20`, and decision reference `'docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #43)'`. Default `rubricReviewEvidence` states policy is accepted while per-Topic educational review of criteria is pending. Per-topic override preserved. | `src/data/learning/group-a-common.ts`<br>`src/data/learning/group-b-base.ts` | `e2e/learning-assessments.spec.ts` (`Topic whose rubric policy is accepted but educational review is pending...`) |
| **2. One wording mechanism in three states** | Single `resolvePolicyWordingState` resolves `approved`, `pending`, or `draft` for rubric scale summary. Honest limits maintained in all states: learner-reported, no mastery threshold, no independent verification, no selection from reading/scroll/quiz. | `src/lib/learningPolicy.ts`<br>`src/data/learning/group-a-common.ts`<br>`src/data/learning/group-b-base.ts` | `e2e/learning-assessments.spec.ts` (`Topic with accepted policy, approved reviewState...` & `Topic whose rubric policy is accepted but educational review is pending...`) |
| **3. Accurate product text without candidate/proposed description** | `TopicLearningActivities.tsx` and `DashboardExperience.tsx` describe the accepted rubric scale accurately without candidate or proposed labels. Activity header and dashboard affirm that self-assessment is the learner's own judgment, not independent verification, and no completion or mastery is inferred from visits, scrolling, quiz answers, or checklist selections. | `src/components/TopicLearningActivities.tsx`<br>`src/components/DashboardExperience.tsx` | `e2e/learning-assessments.spec.ts` (`Dashboard describes accepted quiz and rubric policies...`)<br>`e2e/dashboard-prompt-export.spec.ts` |
| **4. Cover three states at browser boundary** | Playwright browser tests verify: 1) Pending-review topic shows accepted wording + pending review sentence, judgments saved with `previewOnly: true`; 2) Approved fixture topic shows final wording, no pending sentence, no preview badge, judgments saved with `previewOnly: false`; 3) Checklist and rubric are independent: toggling checklist or quiz never selects a rubric criterion, dashboard and export keep them distinct. | `e2e/learning-assessments.spec.ts`<br>`e2e/fixtures/testTopicFixture.ts`<br>`e2e/dashboard-prompt-export.spec.ts` | All 3 tests in `e2e/learning-assessments.spec.ts` |
| **5. Update committed baselines deliberately** | Regenerated `learning-content-hashes.json` and `learning-content-review-summary.json`. Verified that ONLY `rubricScaleApproval`, `practicalAssessment.scale.summary`, and default `rubricReviewEvidence` moved. Zero lesson text, questions, options, answer keys, explanations, criteria, outputs, or topic identities changed. Quiz policy approval did not change again. All real Topics remain `draft` / `review-ready`. | `src/data/learning/learning-content-hashes.json`<br>`src/data/learning/learning-content-review-summary.json` | `src/data/learning/group-split.test.ts`<br>`src/data/learning/group-a.test.ts` |
| **6. Evidence file updated with real counts** | `docs/edu-review/issue-43-review.md` records all criteria, behaviors, locations, tests, verification command outputs, baseline diff analyses, and explicit policy limits. | `docs/edu-review/issue-43-review.md` | Audit verification |

---

## 4. Baseline diff analysis and verification of moved fields

Comparing the exported 58 canonical Topic records before and after this change confirms:

### Fields that moved in `src/data/learning/learning-content-review-summary.json`:
- Exactly 58/58 Topics moved `rubricScaleApproval` (232 additions / 232 deletions):
  - `state`: `"proposed"` -> `"approved"`
  - `approvedBy`: `null` -> `"MahmoudAlmodalal (course owner)"`
  - `approvedAt`: `null` -> `"2026-10-20"`
  - `decisionReference`: `null` -> `"docs/edu-review/owner-decision-package-70.md#course-owner-decisions (issue #43)"`

### Fields that moved in Topic content & `learning-content-hashes.json`:
- `practicalAssessment.scale.approval`: updated to accepted policy object across all 58 Topics.
- `practicalAssessment.scale.summary`: updated to State 2 wording (`PENDING_RUBRIC_SCALE_SUMMARY`) across all 58 Topics.
- `practicalAssessment.reviewEvidence`: updated default text in Group A to state that rubric policy is accepted and criteria educational review is pending; updated Group B `defaultRubricEvidence` to state that practical assessment policy is accepted and criteria review is pending.

### Fields verified completely unchanged (Proof of zero unintended drift):
- `reviewState`: **0 moved** (29 remain `"draft"`, 29 remain `"review-ready"`, 0 approved).
- `quizScoringPolicyApproval`: **0 moved** (all 58 remain approved under issue #42 decision reference).
- `quiz.instructions`: **0 moved**.
- `quiz.scoringPolicy.summary`: **0 moved**.
- `lessonReviewEvidence` & `quizReviewEvidence`: **0 moved**.
- Lesson text, headings, sections, practical steps, worked examples: **0 moved**.
- Quiz questions, prompts, options, answer keys, explanations: **0 moved**.
- Practical criteria (names, descriptions, evidence prompts), outputs, and topic slugs: **0 moved**.

---

## 5. Explicit policy affirmations and honest limits

1. **Accepted policy and its limits:** The course owner MahmoudAlmodalal accepted the practical self-assessment policy on 2026-10-20: descriptive levels `not-yet`, `in-progress`, `ready-for-review`; no mastery threshold; no independent-correctness claim. The self-assessment is the learner's own reported judgment.
2. **Checklist continuity:** The application checklist keeps working as before and was extended rather than replaced. Checklist items and rubric criteria are separate concepts.
3. **Concrete project outputs with BorrowHub optional:** Every criterion references a concrete, verifiable project output file or artifact. BorrowHub is an optional case study example only; the learner's own project is the primary basis for self-assessment.
4. **Revisable judgments and stable criterion identities:** Judgments are recorded against stable criterion identities and versions. A learner can revise or clear any judgment at any time.
5. **Criterion lifecycle:** If a criterion changes version or is deleted, prior judgments remain preserved in the local history and the new criterion version starts unselected.
6. **No inferred completion:** Reading, scrolling, visiting pages, or achieving quiz results never selects a practical criterion or alters a practical judgment.
7. **Educational review status:** The per-Topic educational review of every curriculum group remains pending. No real Topic's review state was changed to approved.
