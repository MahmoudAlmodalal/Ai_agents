# Issues #44, #45, #46 and #50: implementation and owner decisions

This document records implementation evidence and proposals for the product details left open by [#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38). The proposals below have not been approved by the course owner. The interface therefore labels policy-dependent results as previews and does not issue badges or a completion measure.

## Existing evidence and proposed reading behavior

The current saved-reading key is `engineering_guide_recently_viewed`. The reader writes a stable Topic slug when it opens; the home modal records an open as well. The saved array contains the latest five resolved topics and unresolved historical IDs, with no timestamp or duration. The dashboard displays that existing list as recent visits only. It does not infer time spent, reading completion, or lifetime distinct-topic count.

Proposed owner decision: retain Topic-open as the trigger for this recent list. If a reading-completion indicator is desired later, require an explicit learner action such as “Mark reading reviewed,” store it separately by stable Topic slug, and call it learner-reported. Do not infer it from visits, scrolling, quiz answers, or checklist selection. No completion button, completion percentage, or global completion count is enabled in this change.

## Assessment and badge proposals

The shared learning policy proposal is documented in `ASSESSMENT_POLICY_PROPOSAL.md`. Its current draft uses one point per correct objective answer, zero for incorrect or unanswered answers, unlimited retries, feedback after submission, and retention of every attempt. Rubric levels remain descriptive with no mastery threshold. Owner approval and review evidence are still missing. The application labels current submissions as preview results and identifies rubric judgments as self-assessment.

Badge rules are versioned `proposal-1` previews, recalculated from current local records:

| Candidate rule | Draft condition | What it describes |
| --- | --- | --- |
| Explore topics | Three distinct Topics in the existing most-recent list | Recent navigation activity; the five-item list is not a lifetime history. |
| Try quizzes | Three saved objective-quiz attempts | Practice activity regardless of score; it does not demonstrate mastery. |
| Review practical work | Current self-assessments on three Topics | Learner judgments only; it is not an independent review of project files. |

Changed quiz and rubric records remain versioned. The quiz policy retains historical attempts. Rubric scale changes keep retired ratings in history and do not apply them to the current scale. The shipping policy is `draft` with proposed approval metadata, so this release can show draft counts only and produces no awards. The approval-gated evaluator is implemented for a future reviewed policy: it requires an approved policy state and full audit fields, filters out every `previewOnly` quiz/rubric record, saves award events with policy and rule versions, reloads and re-evaluates them, revokes an active event when confirmed evidence falls below its rule, retires events when the policy/rule version or approval decision changes, and appends a new event if evidence later qualifies again. If a relevant evidence source cannot be read or has invalid/session-only data, evaluation is suspended for that rule and the prior award remains unconfirmed rather than being revoked. The award ledger is local to this browser. Approval, the treatment of prior preview submissions, revocation and re-award behavior, and version transitions still require course-owner review.

## Prompt customization proposal

The original prompt remains available as source text. A learner may edit one local customization per stable prompt slug, explicitly save it in the current browser, copy either the selected source or the full current custom draft, and reset the saved customization. Each saved copy records a source-text revision. A changed source leaves the saved customization intact and shows a stale-source notice; the learner decides whether to edit, copy, or reset it. The browser reports blocked reads, malformed storage, and failed writes. These details are a proposal pending course-owner approval.

## Export package proposal and behavior

The downloadable artifact is a real dependency-free ZIP using stored entries (no compression). Its top-level folders are `learner-data/`, `course/`, `resources/`, and `prompts/`, with a root `README.md` and `manifest.json`. It contains local records in JSON and a readable activity summary, current Topic lesson HTML, a readable summary for every Topic, all three Mermaid source perspectives for every Topic whose page exposes the diagram viewer, original prompts with stable metadata and Topic references, saved custom prompt text with source-revision status, and any versioned local badge award events. The per-Topic summaries include available objectives, question text and answer key, scoring policy/version and approval status, and practical rubric criteria, scale/version and approval status. The availability manifest inventories included source files, states that rendered SVGs are not generated by this exporter, and lists topics whose page does not expose a diagram viewer.

The application’s 14 reference templates expose field outlines rather than full template files. The package includes those outlines and lists complete template files as unavailable in `resources/availability-manifest.json`. Expected learner-project outputs and external video bodies are also identified as not included. The package includes each local storage status and flags data as partial or unconfirmed when a source could not be read or saved; it does not turn an unavailable record into a confirmed empty profile. It is a readable snapshot and has no import, restore, cross-device migration, portable application, or offline grading flow.

## Verification evidence

**Passed**

- `npm run lint` — exit 0 (`tsc --noEmit`).
- `node --import tsx --test src/lib/*.test.ts` — 52 tests passed, 0 failed.
- The focused ZIP download E2E produced `/workspace/scratch/ai-agents-review/export-sample.zip` from a synthetic browser profile. An independent Python `zipfile` check ran `testzip()` successfully, verified the `manifest.json` file count and the seeded quiz/rubric records, original and custom prompt text, Mermaid source, and readable Topic summary. Result: 324 entries, 58 Topic summaries, and 105 diagram-source files; no private learner data was used.

**Browser checks requiring a final rerun**

- Command: `flock /tmp/ai-agents-browser.lock sh -c 'E2E_PORT=3103 EXPERIENCE_REVIEW_ARCHIVE_PATH=/workspace/scratch/ai-agents-review/export-sample.zip npm run test:e2e -- e2e/dashboard-prompt-export.spec.ts e2e/prompt-copy.spec.ts --grep "seeded learner|frozen legacy|clipboard failure"'` — latest run: 2 passed, 1 failed. The seeded records/profile-isolation/download test and clipboard-failure test passed. The frozen legacy checklist fixture reached the dashboard through the Navbar, but its locator matched both the Navbar item and footer link. The test is now scoped to the Navbar banner; this exact rerun has **Not Run** after that locator fix.
- The full feature E2E suite after the new diagram/summary export contents is **Not Run**. In particular, empty-profile, malformed-storage, customization/reset, and frozen-legacy checklist/export journeys need the integration-branch rerun.
- `flock /tmp/ai-agents-build.lock npm run build` — **Not Run** on this feature worktree; the parent requested the final build against the integrated release candidate.

**Course-owner review: Not Run.** Owner decisions remain outstanding for reading-completion triggers, scoring and rubric policy, badge thresholds/award lifecycle and prior preview treatment, customization behavior, and the export package contract. The shipped badge policy remains proposed, so it issues no awards or completion measure.
