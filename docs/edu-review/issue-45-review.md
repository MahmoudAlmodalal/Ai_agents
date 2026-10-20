# Issue #45 review: Award explainable local achievement badges

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 07] Award explainable local achievement badges  
**Date:** 2026-10-20  
**Status:** Verified / Complete  

---

## 1. Summary of implementation and owner decision alignment

Per the course-owner decisions recorded on 2026-10-20 in [`docs/edu-review/owner-decision-package-70.md`](owner-decision-package-70.md) (v2, Badges section), the badge award criteria and evaluation system were accepted as final policy:
- **Decision reference:** Approved by `MahmoudAlmodalal (course owner)` on 2026-10-20 (`docs/edu-review/owner-decision-package-70.md`).
- **Single rule source:** Exactly one list of rules (`BADGE_RULES` in [`src/lib/dashboardModel.ts`](../../src/lib/dashboardModel.ts#L6-L37)), guaranteeing that rule thresholds, evidence types, condition descriptions, evidence descriptions, and distinction notices never drift between evaluation and preview.
- **Local deterministic evaluation:** Evaluated from local browser records on every dashboard load and record change via `evaluateBadgeAwards` in [`src/lib/badgeAwards.ts`](../../src/lib/badgeAwards.ts#L104-L210). Repeated reloads never duplicate or contradict an award.
- **Clear distinction from accreditation:** Every badge card explicitly communicates that awards reflect local self-study activity and learner self-assessments only. No badge implies formal certification, accreditation, or externally verified project quality.
- **Strict exclusion of preview records:** Quiz attempts or assessments marked with `previewOnly: true` never contribute to award-eligible evidence.
- **Audit trail & rule version changes:** Changes in evidence below threshold transition an award to `revoked` (reason `evidence-below-threshold`). A rule or policy version upgrade retires obsolete awards (reason `policy-or-rule-version-changed`) and evaluates the newly approved rule version afresh, preserving an auditable event history in the expandable log.

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Code location | Browser test | Result |
|---|---|---|---|---|
| **1. Prepare and obtain course-owner approval for badge criteria, rule versions, and behavior when evidence or rules change before awards are enabled.** | Course-owner approval formally recorded on 2026-10-20 in `docs/edu-review/owner-decision-package-70.md`. `BADGE_AWARD_POLICY` in `src/lib/dashboardModel.ts` sets `reviewState: 'approved'` with full approval metadata. The dashboard badge section displays `التقييم مفعّل بقرار موثق: docs/edu-review/owner-decision-package-70.md`. | [`src/lib/dashboardModel.ts#L40-L51`](../../src/lib/dashboardModel.ts#L40-L51), [`src/components/DashboardExperience.tsx#L427-L432`](../../src/components/DashboardExperience.tsx#L427-L432) | `e2e/dashboard-prompt-export.spec.ts` (test 11) | **Passed** |
| **2. Publish each badge's conditions in language that distinguishes activity and self-assessment from verified ability.** | Each badge publishes: 1) exact condition text (`الشرط المنشور`), 2) exact evidence source (`مصدر الأدلة`), 3) explicit distinction notice (`طبيعة الشارة`), and 4) rule version. The banner states `لا تدل على اعتماد رسمي أو شهادة أو تحقق خارجي من جودة المشروع`. Individual distinction notices explain that visits do not measure reading completion or time, quizzes do not verify subject mastery, and practical assessments are self-reported ratings that do not represent an independent audit. | [`src/lib/dashboardModel.ts#L13-L36`](../../src/lib/dashboardModel.ts#L13-L36), [`src/components/DashboardExperience.tsx#L446-L466`](../../src/components/DashboardExperience.tsx#L446-L466) | `e2e/dashboard-prompt-export.spec.ts` (test 11) | **Passed** |
| **3. Evaluate the approved rules using existing local records and display awarded/unearned states on the dashboard.** | `evaluateBadgeAwards` evaluates local records on every load. In the UI, each badge displays a distinct state pill (`ممنوحة · v1` with green styling or `لم تُمنح · v1` with gray styling), progress fraction (`X / 3`), and contextual explanation (e.g., `اكتملت قاعدة ...` or `X من 3 أدلة مؤهلة`). | [`src/lib/badgeAwards.ts#L104-L210`](../../src/lib/badgeAwards.ts#L104-L210), [`src/components/DashboardExperience.tsx#L435-L445`](../../src/components/DashboardExperience.tsx#L435-L445) | `e2e/dashboard-prompt-export.spec.ts` (tests 11, 12, 13) | **Passed** |
| **4. Ensure repeated reloads do not produce contradictory or duplicate awards and that changed self-assessment follows the approved policy.** | Repeated dashboard reloads derive state identically from current records and existing award history without duplicating award entries. When evidence drops below threshold (e.g., clearing practical assessment ratings), the badge transitions to unearned and records a `revoked` event with reason `evidence-below-threshold`. Restoring ratings re-awards the badge cleanly. | [`src/lib/badgeAwards.ts#L180-L208`](../../src/lib/badgeAwards.ts#L180-L208), [`src/lib/badgeAwards.test.ts#L143-L167`](../../src/lib/badgeAwards.test.ts#L143-L167) | `e2e/dashboard-prompt-export.spec.ts` (tests 12, 13) | **Passed** |
| **5. Keep badge meaning separate from accreditation, certificates, and collective project-quality measures.** | Badge section headline disclaimer and individual card distinction notices explicitly state that badges reflect local self-assessment and activity, conferring no certificate, no accreditation, and no external verification of project quality. Untouched topics remain zero and no overall completion percentage or aggregate score is computed. | [`src/components/DashboardExperience.tsx#L429-L431`](../../src/components/DashboardExperience.tsx#L429-L431), [`src/lib/dashboardModel.ts#L15,L25,L35`](../../src/lib/dashboardModel.ts#L15) | `e2e/dashboard-prompt-export.spec.ts` (tests 10, 11) | **Passed** |
| **6. Verify boundary examples for each approved rule, revising evidence, reloading, rule changes, and an empty profile through user-visible results.** | E2E browser tests verify: 1) empty profile displays unearned states with zero counts and empty award history; 2) just below threshold (2 items), exactly at threshold (3 items), and just above threshold (4 items); 3) evidence revision below threshold triggering revocation; 4) restoration of evidence; 5) exclusion of previewOnly records; 6) rule version transition retiring older awards under an audit fold. | [`src/lib/badgeAwards.test.ts#L80-L167`](../../src/lib/badgeAwards.test.ts#L80-L167), [`e2e/dashboard-prompt-export.spec.ts#L490-L762`](../../e2e/dashboard-prompt-export.spec.ts#L490-L762) | `e2e/dashboard-prompt-export.spec.ts` (tests 11, 12, 13, 14) | **Passed** |

---

## 3. Published badge rules specification

All rules are defined in the canonical single source `BADGE_RULES` in [`src/lib/dashboardModel.ts`](../../src/lib/dashboardModel.ts#L6-L37):

| Badge ID | Title | Threshold & Evidence | Published condition | Evidence source | Distinction notice |
|---|---|---|---|---|---|
| `explore-topics` (v1) | استكشاف موضوعات | 3 موضوعات مختلفة (`recent-topic-list`) | زيارة 3 موضوعات مختلفة على الأقل في هذا المتصفح. | سجل الزيارات الأخيرة المحفوظ محليًا (يحفظ آخر 5 موضوعات زرتها دون توقيت أو مدة قراءة). | نشاط استكشاف وتصفح أخير؛ لا يقيس إتمام القراءة ولا يعتمد مدة زمنية ولا يمنح اعتمادًا أو شهادة. |
| `practice-quizzes` (v1) | تجربة الاختبارات | 3 محاولات فحص ذاتي (`quiz-attempts`) | تسجيل 3 محاولات فحص ذاتي موضوعية محفوظة على الأقل. | سجلات محاولات الفحص الذاتي المحفوظة محليًا على هذا الجهاز (المحاولات المكتملة بصرف النظر عن درجتها). | نشاط ممارسة وتدريب ذاتي بصرف النظر عن النتيجة؛ لا يثبت إتقان المادة ولا يمنح اعتمادًا رسميًا. |
| `reflect-on-practice` (v1) | مراجعة عملية ذاتية | 3 تقييمات بموضوعات مختلفة (`current-self-assessments`) | تسجيل تقييم ذاتي حالي مكتمل بواقع حكم واحد على الأقل لثلاثة موضوعات مختلفة. | سجلات التقييم العملي الذاتي الحالية المحفوظة محليًا في هذا المتصفح. | أحكام ذاتية يصف بها المتعلم مخرجات مشروعه بنفسه؛ لا تمثل تدقيقًا مستقلًا أو اعتمادًا لصحة المخرج. |

---

## 4. Boundary and policy behaviors verified

1. **Empty profile behavior:**
   - On an empty profile, all three badges render in the `لم تُمنح · v1` unearned state with progress `0 / 3 (غير مكتملة)`.
   - The underlying badge event storage (`ai-agents-badge-awards-v1`) remains empty (`events: []`), writing no phantom award entries.
2. **Boundary thresholds (below, at, above):**
   - **Just below (2 of 3):** Displays `لم تُمنح · v1`, progress `2 / 3 (غير مكتملة)`, and explanatory text `2 من 3 أدلة مؤهلة وفق قاعدة ...`.
   - **Exactly at (3 of 3):** Evaluates as earned, displays `ممنوحة · v1`, progress `3 / 3 (مكتملة وممنوحة)`, creates exactly 1 `awarded` event with timestamp and decision reference, and displays `تاريخ التسجيل`.
   - **Just above (4 of 3):** Remains `ممنوحة · v1`, progress `4 / 3 (مكتملة وممنوحة)`. Reload idempotency is maintained: the existing award ID and timestamp are preserved without creating duplicate award events.
3. **Evidence revision and revocation:**
   - When evidence is revised below the threshold (e.g. from 4 to 1 recent topic, or removing practical assessment ratings), the badge reverts to `لم تُمنح · v1`.
   - An event with status `revoked` and end reason `evidence-below-threshold` is recorded.
   - The UI reveals the historical change log fold (`سجل تغييرات الشارات السابقة`), detailing the revocation reason and timestamp.
   - When evidence is restored back to the threshold, the badge is cleanly re-awarded.
4. **Preview-only exclusion:**
   - Records flagged `previewOnly: true` (e.g., mock quiz attempts or draft assessments) are strictly filtered out by `getEligibleEvidenceCounts`. They never count toward award eligibility.
5. **Rule or policy version transition:**
   - When stored awards have a differing `ruleVersion` (e.g. version 99) or the policy changes, `evaluateBadgeAwards` marks the prior award as `retired` (reason `policy-or-rule-version-changed`).
   - The retired award is listed in the previous change history fold, and the current active rule (v1) is evaluated cleanly against current records.

---

## 5. Verification commands and exact results

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
**Outcome:** Passed 75/75 tests (exit code 0, duration: 638ms).
```
✔ draft or incomplete owner approval never creates awarded or unearned badge states (3.044405ms)
✔ previewOnly attempts are excluded from approved award eligibility (1.128796ms)
✔ approved versioned awards persist across reload, revoke after evidence reversal, and can be earned again (1.999605ms)
✔ policy or rule version changes retire old awards and evaluate the newly approved version (0.566674ms)
✔ unavailable evidence suspends award reconciliation until the source recovers (0.938368ms)
✔ malformed award history is not overwritten and storage failures keep session events visible (0.59244ms)
✔ BADGE_AWARD_POLICY evaluates empty profile with all rules unearned and zero events (0.453887ms)
✔ boundary conditions for explore-topics: just below, at, and above threshold, with revocation on drop (0.870449ms)
✔ boundary conditions for practice-quizzes: just below, at, and above threshold with preview exclusion and duplicate deduplication (1.040585ms)
✔ boundary conditions for reflect-on-practice: just below, at, and above threshold with empty ratings exclusion and revocation on drop (1.455484ms)
✔ repeated reloads do not duplicate or contradict awards (0.790915ms)
ℹ tests 75
ℹ suites 0
ℹ pass 75
ℹ fail 0
```

### Gate 3: Production build
```sh
npm run build
```
**Outcome:** Passed (exit code 0).
```
✓ Compiled successfully in 6.7s
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (182/182)
✓ Finalizing page optimization
```

### Gate 4: Playwright browser verification
```sh
E2E_SERVER=production E2E_PORT=3253 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/dashboard-prompt-export.spec.ts
```
**Outcome:** Passed 14/14 browser tests (exit code 0, duration: 59.8s).
```
Running 14 tests using 1 worker

[1/14] …le downloads a ZIP with real content and honest missing-resource entries
[2/14] …rner records survive reload and remain isolated to their browser profile
[3/14] …empts prior when their saved policy or question versions no longer match
[4/14] …rowser data is marked unconfirmed in the dashboard and exported manifest
[5/14] …re stays visible after a blocked write and same-tab dashboard transition
[6/14] …, copies the full custom text, resets, and flags a stale source revision
[7/14] …and back preserves distinct records without inventing untouched activity
[8/14] …ys zero activity, labels local scope, and navigates to topic exploration
[9/14] … provides visible keyboard focus and interactive navigation via keyboard
[10/14] … responsive mobile layout with RTL direction and no horizontal overflow
[11/14] … approved badge rules with unearned states and no accreditation meaning
[12/14] …at threshold, above threshold, revision on drop, and reload idempotency
[13/14] …es and reflect-on-practice rules, preview exclusion, and rating changes
[14/14] …on retires previous award and evaluates fresh version under audit trail
  14 passed (59.8s)
```
