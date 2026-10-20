# Issue #70 course and release owner decision package

**Packet version:** draft v1, 2026-10-20
**Status:** Not Ready for owner decision: exact-build browser evidence is partial and follow-up test corrections remain unrerun. No course-owner or release-owner decision is recorded here.
**Release candidate:** product revision `22a4df321bc9272364a58b42c31e15ee9cc3b561`, build ID `Yf_5yOWLs7xiCAYlOu3no`. Technical evidence must reference that exact source and artifact in [release-readiness-70.md](release-readiness-70.md). Owner decisions remain pending.

This is one consolidated decision packet for the course owner and release owner. Fill it after technical checks; attach the completed same-candidate evidence ledger before asking for the decisions below. Keep the scripted production journey, any agent exploratory visual review, the separate human M01–M10 manual journey, and educational/owner decisions as distinct evidence. A technical pass does not approve curriculum policy, visual identity, or a candidate video. No group is marked improved by preparing or signing this packet.

## Candidate and evidence references

| Field | Value |
|---|---|
| Integrated source revision | `22a4df321bc9272364a58b42c31e15ee9cc3b561` (product source). |
| Production build/artifact ID and digest | Build ID `Yf_5yOWLs7xiCAYlOu3no`; build-ID SHA-256 `878e7dc9e752c962c5dfab0378010dd5b237a388344bd846d1ef92bed2133f67`; full artifact-tree digest not recorded. |
| Production lint/unit/build and full browser-suite evidence | Lint, 65 focused unit tests, and build Passed for product revision `22a4df321bc9272364a58b42c31e15ee9cc3b561`; logs `/workspace/scratch/review/verified-lint.log`, `verified-unit.log`, and `verified-build.log`. The 204-test Playwright run on build `Yf_5yOWLs7xiCAYlOu3no` was stopped partial: 129 Passed, 7 Failed, 1 Interrupted, 67 Not Run. Evidence: `/workspace/scratch/review/verified-playwright.log` and `.json`. |
| Follow-up test/docs tree | Current integrated revision `dfc2a4f4c6258dd844aea6242bd24d37211f1e9f`; test-only fixes for ambiguous reader articles and outdated Topic 22/29 assertions landed after the partial run. They have not been rerun; no product source change or replacement production build is claimed. |
| Scripted production journey | Not Run; record its exact build, browser, run log, archive attachment/digest, and limitations separately from manual evidence. |
| Agent exploratory visual review | Pending; link screenshots and notes for the exact candidate; this is technical review, not course-owner or accessibility approval. |
| Exact-candidate automated archive evidence | Passed; ZIP SHA-256 `4ec3426309b7e06a185f95437c8c575e88273cc3eca83369a57c733d4e4460fe`; integrity/content inventory and synthetic-fixture limits are in [export verification](export-verification-2026-10-20.md). This does not replace the human export review. |
| Human manual journey ledger and export review | Pending; complete M01–M10, including an independent human inspection of the actual export, through a separate human-run review. |
| Storage/offline/compatibility evidence | Pending; identify browser/device/profile and exact artifact. |
| Educational review and owner decisions | Pending; link the completed course-owner decisions below. |
| Known failed checks or accepted deferrals | Seven stale test assertions in the partial suite remain unverified after fixes: five responsive reader article locator failures and outdated Topic 22/29 assertions. Test corrections are present in `c16b039`, `c2aaf80`, `c46de07`, and `dfc2a4f4c6258dd844aea6242bd24d37211f1e9f`; full suite rerun is required. No deferral has been accepted. |
| Course owner / decision date | Pending. |
| Release owner / decision date | Pending. |

An earlier full-suite attempt on superseded revision `da194948dd95197e399ddc2f668d44484b185877` / build `FargzQp2ZRNj-QshkyY8H` was intentionally stopped during fixes. Its partial result (74 Passed, 28 Failed, 1 Interrupted, 101 Not Run of 204) is retained at `/workspace/scratch/review/da19494-partial-playwright.log` and `.json`; it is not evidence for this candidate.

## Course-owner decisions

Record one disposition for each item. `Accept`, `Revise`, and `Defer` are decision options, not defaults. If an item is deferred or revised, identify the owner and the evidence needed to resolve it. Keep affected Topics available with their accurate status; do not announce a group as improved until the full group has complete educational evidence and explicit acceptance.

| Decision | Evidence for review | Disposition and owner record |
|---|---|---|
| Confirm or revise the established Topic template and group membership while preserving all 58 canonical Topics in 19 groups. | [Learning/content review](learning-and-content-review-2026-10-20.md), the relevant issue packets #51–#69, and the 58-topic manifest from the exact candidate. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Confirm what a Topic open means in the dashboard and decide whether any reading-completion signal should exist. Current behavior records recent opens only; it does not infer completion from visits, scrolling, quiz answers, or checklist selections. If completion is desired, decide on an explicit learner-reported action and separate record. | [Issues #44/#45/#46/#50 review](../ISSUES_44_45_46_50_REVIEW.md), candidate dashboard evidence, and M04/M08. | Pending: ☐ Accept current recent-open behavior ☐ Revise ☐ Defer. Notes / owner / date: |
| Confirm or revise the proposed quiz policy. Current proposal: 1 point correct, 0 incorrect or unanswered, unlimited retries, feedback after submit, and all attempts retained with question/policy versions. | [Assessment policy proposal](../ASSESSMENT_POLICY_PROPOSAL.md), the exact-candidate issue #42 journey, and per-topic quiz evidence. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Confirm or revise the proposed practical self-assessment policy. Current proposal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`; `no-mastery-threshold`; no independent correctness claim. | [Assessment policy proposal](../ASSESSMENT_POLICY_PROPOSAL.md), the exact-candidate issue #43 journey, and per-topic criterion/output evidence. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Decide the proposed badge thresholds and lifecycle, including whether historical preview-only quiz/rubric records can ever qualify, how policy/rule version changes affect active awards, and revocation/re-award behavior. Badge awards remain disabled pending this decision. | [Issues #44/#45/#46/#50 review](../ISSUES_44_45_46_50_REVIEW.md), [assessment policy proposal](../ASSESSMENT_POLICY_PROPOSAL.md), and exact-candidate badge explanations in M04. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Confirm or revise prompt customization behavior: one browser-local saved copy per prompt, explicit save/reset, source-text revision tracking, stale-source handling, copy behavior, and storage-error messaging. | [Issues #44/#45/#46/#50 review](../ISSUES_44_45_46_50_REVIEW.md), exact-candidate prompt journey M05, and the source revision shown for a customized prompt. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Confirm the learning-export contract and limitations: ZIP snapshot contents, partial/unavailable-source flags, no import/restore or cross-device migration, and files/templates that are not shipped. | [Issues #44/#45/#46/#50 review](../ISSUES_44_45_46_50_REVIEW.md), [automated exact-build archive verification](export-verification-2026-10-20.md), the human M06 journey (still Not Run), and the exact-candidate availability manifest. The captured records are synthetic fixture data. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Confirm the offline contract and supported-browser scope: deliberate per-Topic save, `/saved` shell availability, complete versioned content/assets, local-only learner records, quota/eviction limitations, online-only external video, and behavior when browser APIs are missing. Decide whether tested Chromium evidence is sufficient or require additional browser coverage before enabling offline claims. | [Offline storage policy proposal](../OFFLINE_STORAGE_POLICY_PROPOSAL.md), source-inspected cache inventory in [rollout/rollback](rollout-rollback-70.md), exact-candidate M07/M08 results, and the browser support matrix. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Decide the visual identity for landing, navigation, and Topic reading, including any required corrections. | [Identity proposal](../AI_AGENTS_IDENTITY_PROPOSAL.md), issue #40, and M01/M09 screenshots from the exact candidate. | Pending: ☐ Accept ☐ Revise ☐ Defer. Notes / owner / date: |
| Review and disposition each external-video candidate. For an approval, verify fit with the actual lesson/version, playback, captions, accessibility, and user-facing unavailable/offline state; record a decision reference and date. | [58-topic video disposition ledger](video-owner-disposition-70.md), Group A candidate evidence in [group-a-video-candidates.md](../curriculum/group-a-video-candidates.md), Group B per-topic candidate evidence in [issue #61](issue-61-review.md) through [issue #69](issue-69-review.md), and exact-candidate M07/M10 results. | Pending. Every item remains a candidate until individually approved. |
| Decide whether an evidence-complete group may be announced as improved. | All relevant issue packets, educational review, video dispositions, and explicit acceptance for the complete group. | Pending. Group(s) and decision reference / owner / date: |

Until the relevant quiz and practical policies are accepted, badge awards stay disabled and self-assessment remains descriptive. Candidate videos remain candidates until individually reviewed and approved. An owner decision on one group does not approve another.

## Release-owner decisions

Record a separate release decision after the course-owner decisions and the same-candidate technical ledger are complete. Use the proposed [staged rollout and rollback procedure](rollout-rollback-70.md) as a plan; this packet does not authorize deployment.

| Decision | Required value |
|---|---|
| Release go/no-go/defer | Pending. |
| Target environment and deployment mechanism | Pending. |
| Initial audience/cohort and rollout window | Pending; defined by release owner, not inferred from this document. |
| Observation period and promotion threshold | Pending. |
| Release operator and rollback operator | Pending. |
| Previous known-good artifact and verified rollback route | Pending. |
| Data/cache compatibility and stop-trigger review | Pending; reference exact-candidate evidence. |
| Decision reference, owner, and date | Pending. |

## Decision record

| Decision record | Status |
|---|---|
| Course-owner outcome | Pending. |
| Release-owner outcome | Pending. |
| Approved deferrals and owners | Pending. |
| Conditions and follow-up evidence | Pending. |
| Next review date | Pending. |
