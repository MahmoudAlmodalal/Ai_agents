# Issue #70: release-readiness evidence matrix (draft)

**Record version:** draft v1, 2026-10-20
**Release candidate:** not assigned; integrated commit/build identifier is pending.
**Release decision:** Not Ready / Not Run. This is a verification plan and evidence index, not a release approval. No production deployment is authorized by this document.

## Decision boundary

The release candidate has not yet been supplied by the integration owner. The checks below must run against that exact production build after the parallel branches are integrated. Do not transfer results from another commit, a development server, mocked storage tests, or earlier browser runs to this release record. For each check, record `Passed`, `Failed`, or `Not Run`, the exact evidence, build identifier, browser/device, and reviewer. If a check was not attempted, keep it `Not Run`.

The existing issue scope is 58 canonical Topics in 19 groups. The existing lessons remain available while drafts are reviewed. A group may be announced as improved only after its complete evidence packet and explicit course-owner acceptance are recorded. Curriculum B's author-review packets for #61–#69 are linked below; they do not represent course-owner acceptance. Every video remains a researched candidate with playback, captions, accessibility and owner approval not run/pending.

Issues #38 and #33 must remain unchanged during this work. #38 is the open product specification; #33 is the already-closed pilot and does not constitute approval of new assessment or video policy. This matrix covers every open issue supplied in the working issue snapshot (32 issues); it does not change issue state.

## Open-issue coverage

| Issue | Scope / release evidence to collect | Current evidence status |
|---|---|---|
| #38 | Parent scope, local-data rules, 58-topic availability, open policy decisions; verify parent stays unchanged. | Open specification; unchanged. Release checks not run. |
| #40 | Approved identity applied to landing, navigation and reader; responsive, keyboard, RTL/LTR entry-to-reading journey. | Final visual-owner decision and RC journey not recorded. |
| #42 | Reviewed representative quiz: correct/incorrect/unanswered, feedback, retry, stable IDs/version, reload, profile isolation and failed storage. | Scoring remains proposed; RC browser evidence not run. |
| #43 | Practical outputs, editable/reversible checklist and rubric, stable criteria/version, reload and storage failure; no implied mastery. | Scale/completion semantics remain proposed; RC browser evidence not run. |
| #44 | Distinct reading, quiz, self-assessment and favorites on dashboard; empty/partial profile, reload and return navigation. | RC browser evidence not run. |
| #45 | Published badge rules, boundary cases, explanations, changed evidence/rule behavior and empty profile. | Rule/owner decision and RC evidence not recorded. |
| #46 | Search → edit → original/customized copy → reset → reload; clipboard/storage failures; source revision and Arabic/LTR behavior. | Owner decision and RC browser evidence not recorded. |
| #47 | Approved topic-aligned video, evidence, unavailable/connectivity messaging, keyboard/mobile and offline messaging. | Candidate research exists; no selected-resource approval or playback/caption/accessibility check. |
| #49 | Saved quiz available offline; retained result remains accurate after reload; distinguish offline learning from online video. | Production service-worker browser evidence not run. |
| #50 | Download and inspect the real export: organization, content, assessments, readable diagrams and honest external-resource handling. | Actual package inspection not run. |
| #51 | Complete Idea/MVP group, template/scoring/rubric/video decisions and course-owner acceptance. | Owner decision not recorded in this release evidence; release status must remain pending. |
| #52 | Complete Discovery/PRD/SRS group and its per-topic review packet and explicit owner decision. | RC integration and owner acceptance not evidenced here. |
| #53 | Complete Git/GitHub group, per-topic review packet and explicit owner decision. | RC integration and owner acceptance not evidenced here. |
| #54 | Complete Mermaid/User Flow/Domain Model group; validate diagram text/rendering/grading and owner decision. | RC integration, diagram journey and owner acceptance not evidenced here. |
| #55 | Complete PlantUML/behavior-diagram group; validate source/rendering/grading and owner decision. | RC integration, diagram journey and owner acceptance not evidenced here. |
| #56 | Complete ERD/DBML/Sequence/Class group; validate readable source/rendering/grading and owner decision. | RC integration, diagram journey and owner acceptance not evidenced here. |
| #57 | Complete UI/UX planning group and explicit owner decision. | RC integration and owner acceptance not evidenced here. |
| #58 | Complete Stitch/design-system/prototype group and explicit owner decision. | RC integration and owner acceptance not evidenced here. |
| #59 | Complete AI implementation tools/Skills/MCP group; keep tool-version and security limits clear; owner decision. | RC integration and owner acceptance not evidenced here. |
| #60 | Complete Stitch MCP/design documentation group and explicit owner decision. | RC integration and owner acceptance not evidenced here. |
| #61 | TypeScript/React/Tailwind/Next.js: four full topic packets, stable questions, concrete outputs and candidate resource evidence. | Curriculum B packet: [issue 61](issue-61-review.md). Author review recorded; owner approval and RC journey pending. |
| #62 | Frontend planning/Spec Kit: four full topic packets, stable questions, concrete outputs and candidate resource evidence. | Curriculum B packet: [issue 62](issue-62-review.md). Author review recorded; owner approval and RC journey pending. |
| #63 | Python/PostgreSQL/API contracts: three full topic packets, stable questions, concrete outputs and candidate resource evidence. | Curriculum B packet: [issue 63](issue-63-review.md). Author review recorded; owner approval and RC journey pending. |
| #64 | Django/FastAPI/permissions/services: four full topic packets, stable questions, concrete outputs and candidate resource evidence. | Curriculum B packet: [issue 64](issue-64-review.md). Author review recorded; owner approval and RC journey pending. |
| #65 | Frontend/API integration and journey testing: both topic packets, honest fixture/API distinction, candidate resource evidence. | Curriculum B packet: [issue 65](issue-65-review.md). Author review recorded; owner approval and RC journey pending. |
| #66 | Database performance/optional Redis/QA: three topic packets; caching is optional and its role is scoped; candidate resource evidence. | Curriculum B packet: [issue 66](issue-66-review.md). Author review recorded; owner approval and RC journey pending. |
| #67 | Docker/Linux operations: both topic packets, safe command scope and candidate resource evidence. | Curriculum B packet: [issue 67](issue-67-review.md). Author review recorded; owner approval and RC journey pending. |
| #68 | Vercel/Netlify/backend-database deployment: three topic packets, external prerequisites and rollback outputs. | Curriculum B packet: [issue 68](issue-68-review.md). Author review recorded; owner approval and RC journey pending. |
| #69 | Runbook/handoff/demo/portfolio: four topic packets, evidence-preserving handoff and candidate resource evidence. | Curriculum B packet: [issue 69](issue-69-review.md). Author review recorded; owner approval and RC journey pending. |
| #70 | Full production journey, 58-topic availability, compatibility, storage/offline/accessibility checks, and staged rollout. | This evidence matrix and [draft rollout/rollback procedure](rollout-rollback-70.md) are prepared. RC verification and launch decision are Not Run. |
| #74 | Fresh-tab `/saved` offline bootstrap; complete cache-bundle commit/rollback; validate actual cached HTML/assets; production SW failure tests. | Known unresolved baseline report in issue #74; retest and fix verification on RC are required. Not Run here. |
| #75 | Repair accessible status semantics/selectors/membership and retain roadmap coverage; run six production roadmap checks. | Known three-failure baseline report in issue #75; RC suite not run here. Not Run. |

## Required production-candidate journey

Use a clean browser profile, then a separate profile with prior learner data. Start at the landing page, enter the roadmap, choose an arbitrary Topic without completing prerequisites, read it, submit a quiz, revise a practical self-assessment, reload, and inspect the dashboard and badge explanations. Search and customize a prompt, preserve and copy the full version, and download then inspect the actual export. Save a Topic and quiz online, disconnect, reopen the saved reading and quiz from a fresh tab, and record real external-video connectivity/unavailable states. Confirm existing saved local records survive the build upgrade and that the separate profile shows none of the first profile's activity.

Run the existing full browser suite and appropriate storage, type and production-build checks on that same integrated commit. Include exported and offline diagram rendering/grading, malformed/unavailable storage, cache eviction, interrupted/quota update failures, and actual HTML/asset validation. Cover desktop/mobile, keyboard focus/order, Arabic RTL, technical LTR, and overflow. Keep a per-check result ledger with reproduction steps and evidence; a suite pass alone does not replace manual visual, accessibility, resource or course-owner review.

## Release gate

Release is blocked until every required check is `Passed` or has an explicitly accepted, documented deferral; there are no unresolved release-blocking failures; all 58 canonical Topics remain available; every group announced as improved has complete educational evidence plus recorded course-owner acceptance; and the release owner approves the staged rollout. A candidate video is not an approved resource. A curriculum author's review is not course-owner approval. A technical pass does not approve educational content or visual identity.

The integration owner should attach the exact RC commit/build ID and completed test ledger here before asking for a release decision. The release owner records the decision and date separately; this draft makes no deployment, publication, or issue-closure claim.
