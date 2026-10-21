# Remaining Pilot (#31 & #37) Verification & Acceptance Ledger

Date: 2026-10-19. Scope: Focused audit and automated verification record for remaining pilot acceptance criteria under #31 (site journey & educational review desk check) and #37 (integrated learning experience pilot for Topic 01 & homepage).

## Scope and Acceptance Summary

This ledger records verification results for the focused pilot phase evaluated against live browser execution on the shared development server (port 3199). These results verify defined automated journeys only; the production build and full 178-case browser suite were completed independently by [root final production verification](ISSUES_26_31_37_REVIEW.md#remaining-ticket-re-audit-19-october-2026). Content-owner sign-off (#33) remains NotRun. Interrupted pilot run `remaining-pilot-20261019-a` produced no terminal outcome or successful evidence. All 58 topics in the current repository are published; incomplete-next-topic behavior is an authored fallback/boundary condition, not a freshly exercised unreleased topic state.

| Criterion / Domain | Status | Evidence / Reference | Boundaries & Limitations |
| --- | --- | --- | --- |
| Integrated journey: Home → direct reading → preview → worked example → exercise → checklist → reload → return | Passed | `e2e/application-checklist.spec.ts` (5), `e2e/project-idea-lesson.spec.ts` (3) | Verified defined automated sequence for Topic 01. Topic identity & checklist state match across readers. Local to browser. |
| Application checklist persistence & recovery | Passed | `e2e/application-checklist.spec.ts` (5 cases); root baseline unit tests 12/12 passed | Saved by topic ID + criterion key; in-memory fallback on storage failure; no false mastery claims. |
| Responsive layouts across 5 viewports (390, 768, 1024, 1366, 1440 px) | Passed | `e2e/learning-pilot-integration.spec.ts` (15 cases across 5 viewports) | Automated document scrollWidth assertions; does not prove every manual scroll position, absence of overlap everywhere, or visual design approval. |
| Reference routes & keyboard reading across 5 viewports | Passed | `e2e/site-journey.spec.ts` (5 viewport cases + 1 speech fallback case = 6 cases) | Verified 7 static routes load with RTL dir, main heading, and no page scroll overflow at 5 widths (automated screenshot only captured at 390px; no manual visual inspection claimed). |
| Surrounding features: search, filter, theme, copy, speech boundary, print boundary | Passed | `e2e/learning-pilot-integration.spec.ts` (15 cases), `e2e/site-journey.spec.ts` (1 case) | Search/filter, theme reload persistence, clipboard read/write, mock speech synthesis calls, and CSS print media emulation. |
| Educational review: Topic 01 context & MVP exercise evidence | Passed | [ISSUE_35_LEARNING_REVIEW.md](ISSUE_35_LEARNING_REVIEW.md) | Bounded desk review of "تسليم الفريق" worked artifact for Grill Me. Desktop review only; not a live learner study. |
| Educational review: Course topics 01–58 audit | Existing bounded evidence | [final-topics-01-20.md](edu-review/final-topics-01-20.md), [final-topics-21-40.md](edu-review/final-topics-21-40.md), [final-topics-41-58.md](edu-review/final-topics-41-58.md) | Bounded desk-review evidence. Complete-file source inspection for Topics 38–40 was withheld by prior policy and remains NotRun; no new full-file source review or sample code execution performed. |
| Free next navigation | Passed | `e2e/application-checklist.spec.ts` (malformed-storage test) | Verifies next topic link remains enabled. All 58 topics in the current catalog are published. |
| Unpublished/incomplete-next-topic fallback | Not Run | Authored boundary logic | No unpublished topic state available in current catalog; `e2e/topic-navigation.spec.ts` was historical/not in focused 29 gate. Fallback behavior not exercised. |
| Audible Arabic speech playback | Not Run | `e2e/site-journey.spec.ts`, `e2e/learning-pilot-integration.spec.ts` | Web Speech API call interception and missing-API fallback verified; audible sound synthesis not tested. |
| Native print dialog / paper output | Not Run | `e2e/learning-pilot-integration.spec.ts` | Verified `window.print` trigger & `@media print` CSS rules; native OS print dialog and paper output not tested. |
| Real student runtime / cloud deployment | Not Run | Desktop educational inspection only | External learner execution and cloud infrastructure provisioning were not performed. |
| Content-owner approval (#33) | Not Run | Pending content-owner review | Topic 01 pilot pattern not rolled out course-wide. |
| Production build & full suite verification | Verified | [root final production verification](ISSUES_26_31_37_REVIEW.md#remaining-ticket-re-audit-19-october-2026) | Completed independently by root in fresh gate (178/178 passed on port 3199), not pilot execution. |

## Verification Execution Details

- **Baseline & Commit State:**
  - Original product commit baseline: `3242248`.
  - Current HEAD commit: `dab3745` (added docs and verification artifacts only; no product or test code changes).
  - Production build & full-suite regression: independently verified by root in fresh gate ([root final production verification](ISSUES_26_31_37_REVIEW.md#remaining-ticket-re-audit-19-october-2026)). No deployment was authorized.
- **Focused Browser Suite Execution (Pilot run `remaining-pilot-20261019-b`):**
  - Command: `E2E_PORT=3199 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/application-checklist.spec.ts e2e/learning-pilot-integration.spec.ts e2e/project-idea-lesson.spec.ts e2e/site-journey.spec.ts --output=.verification/remaining-pilot-results --reporter=line`
  - Total: 29 passed out of 29 tests (duration: 2.8m, exit code 0).
  - Breakdown:
    - `e2e/application-checklist.spec.ts`: 5 passed
    - `e2e/learning-pilot-integration.spec.ts`: 15 passed (3 journeys across 5 viewports: 390, 768, 1024, 1366, 1440 px)
    - `e2e/project-idea-lesson.spec.ts`: 3 passed (parity and clipboard operations)
    - `e2e/site-journey.spec.ts`: 6 passed (1 speech synthesis unavailable fallback + 5 viewport checks across 7 reference routes)
- **Root Baseline Evidence (supplied by root orchestrator, not executed by pilot):**
  - Typecheck: `npm run lint -- --incremental false` (exit code 0).
  - Unit tests: `npx tsx --test src/lib/applicationChecklist.test.ts src/lib/legacyHtmlChecklist.test.ts` (12/12 passed).
- **Historical / Out-of-Scope Test Suites:**
  - `e2e/topic-navigation.spec.ts` was not part of the focused 29 suite; the later root full-suite result is linked in [root final production verification](ISSUES_26_31_37_REVIEW.md#remaining-ticket-re-audit-19-october-2026); it was not part of pilot execution.

## Detailed Findings & Boundaries

### 1. Automated Pilot Implementation Findings
- Component implementations ([ApplicationChecklist.tsx](../src/components/ApplicationChecklist.tsx), [TopicDetailModal.tsx](../src/components/TopicDetailModal.tsx), [TopicHtmlContent.tsx](../src/components/TopicHtmlContent.tsx), [applicationChecklist.ts](../src/lib/applicationChecklist.ts)) satisfy the automated journeys specified in the focused pilot gate.
- Reader parity between quick preview modal and full reading page is verified for Topic 01.
- Application checklist state survives reloads and modal dismissals with in-memory fallback on storage failure.
- Automated viewport assertions confirmed `scrollWidth <= innerWidth` across tested viewports; this confirms absence of gross page overflow on tested routes but does not substitute for full manual visual review or accessibility certification.
- No regressions detected in focused journeys; no product or test code changes were introduced.

### 2. Educational Review Boundaries
- Educational review documents ([final-topics-01-20.md](edu-review/final-topics-01-20.md), [final-topics-21-40.md](edu-review/final-topics-21-40.md), [final-topics-41-58.md](edu-review/final-topics-41-58.md)) represent existing bounded desk reviews. Complete source inspection for Topics 38–40 remains NotRun per prior policy; this pilot established no new source review, learner study, or sample execution.
- Topic 01 context & MVP exercise review ([ISSUE_35_LEARNING_REVIEW.md](ISSUE_35_LEARNING_REVIEW.md)) stands as bounded desk evidence.

### 3. Non-Goals & Root Responsibilities
- Interrupted pilot `remaining-pilot-20261019-a` produced no terminal outcome.
- Production build and full test suite verification: independently verified by root in fresh gate ([root final production verification](ISSUES_26_31_37_REVIEW.md#remaining-ticket-re-audit-19-october-2026)). No deployment was authorized.
- Content-owner review (#33) remains NotRun prior to wider pattern rollout.
