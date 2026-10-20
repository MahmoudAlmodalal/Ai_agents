# Issue #70: release-readiness evidence matrix (draft)

**Record version:** v2, 2026-10-20
**Current release candidate:** Final integrated source revision and production build identity are pending. Current integrated candidate verification is **Not Run**; the forthcoming [remaining-issues verification report](remaining-issues-verification-2026-10-20.md) will record the exact identity and current results.
**Release readiness:** Not Ready. The earlier candidate and baseline results below are historical and do not establish readiness for the final integrated candidate. This is an evidence record, not a release approval. No production deployment is authorized by this document.

## Decision boundary

The final integrated product revision and production build have not yet been identified. Record every result against that exact candidate in the current verification report; do not transfer results from a prior commit, a development server, mocked storage tests, or earlier browser runs. For each check, record `Passed`, `Failed`, or `Not Run`, the exact evidence, build identifier, browser/device, and reviewer. While a run is in progress but has no final result, keep its result `Not Run` and label the attempt separately.

The existing issue scope is 58 canonical Topics in 19 groups. The existing lessons remain available while drafts are reviewed. A group may be announced as improved only after its complete evidence packet is independently verified and its explicit course-owner acceptance is recorded in the end-of-queue sign-off list. Curriculum B's author-review packets for #61–#69 do not represent group-level course-owner sign-off. The course owner accepted the per-video review checklist and deferred individual approvals until human review of playback, captions, accessibility, and lesson fit; each item remains a candidate until then.

Issues #38 and #33 must remain unchanged during this work. #38 is the product specification; #33 is the closed pilot and does not constitute approval of new assessment or video policy. This matrix covers the 31 open issues supplied in `/workspace/scratch/review/open-issues-start.json`; #75 is omitted because it was closed through PR #76 before this snapshot. This record does not change issue state.

## Open-issue coverage

| Issue | Scope / release evidence to collect | Current evidence status |
|---|---|---|
| #38 | Parent scope, local-data rules, 58-topic availability, open policy decisions; verify parent stays unchanged. | Open specification; unchanged. Release checks not run. |
| #40 | Approved identity applied to landing, navigation and reader; responsive, keyboard, RTL/LTR entry-to-reading journey. | Course owner accepted the Ai_agents identity on 2026-10-20. Exact-candidate implementation and responsive/keyboard/RTL/LTR evidence remain to be recorded. |
| #42 | Reviewed representative quiz: correct/incorrect/unanswered, feedback, retry, stable IDs/version, reload, profile isolation and failed storage. | Course owner accepted 1 point for correct, 0 for incorrect or unanswered, unlimited retries, feedback after submit, and retained versioned attempts on 2026-10-20. Exact-candidate behavior evidence remains a separate technical check. |
| #43 | Practical outputs, editable/reversible checklist and rubric, stable criteria/version, reload and storage failure; no implied mastery. | Course owner accepted the self-reported `not-yet`, `in-progress`, and `ready-for-review` scale, with no mastery threshold or independent correctness claim, on 2026-10-20. Exact-candidate behavior evidence remains a separate technical check. |
| #44 | Distinct reading, quiz, self-assessment and favorites on dashboard; empty/partial profile, reload and return navigation. | Course owner accepted recent-open-only reading activity, with no completion inferred from visits, scrolling, quiz answers, or checklist selections. Exact-candidate dashboard evidence remains a separate technical check. |
| #45 | Published badge rules, boundary cases, explanations, changed evidence/rule behavior and empty profile. | Course owner accepted the rules published in the learner UI, with rule text/version shown, no accreditation meaning, and re-evaluation on each read. Exact-candidate badge behavior evidence remains a separate technical check. |
| #46 | Search → edit → original/customized copy → reset → reload; clipboard/storage failures; source revision and Arabic/LTR behavior. | Course owner accepted one browser-local copy per prompt, explicit save/reset, source revision and stale-source handling, copy behavior, and storage-error messaging. Exact-candidate journey evidence remains a separate technical check. |
| #47 | Approved topic-aligned video, evidence, unavailable/connectivity messaging, keyboard/mobile and offline messaging. | Course owner accepted the review checklist but deferred every individual approval until a human checks playback, captions, accessibility, and lesson fit. Videos remain candidates; exact-candidate labeling/connectivity checks remain technical work. |
| #49 | Saved quiz available offline; retained result remains accurate after reload; distinguish offline learning from online video. | Course owner accepted deliberate per-Topic saving and the MVP offline contract for production Chromium. Exact-candidate service-worker and offline-browser evidence remains a separate technical check. |
| #50 | Download and inspect the real export: organization, content, assessments, readable diagrams and honest external-resource handling. | Course owner accepted the ZIP snapshot contract, partial/unavailable-source flags, and no import/restore or cross-device migration. Historical archive integrity/content inventory passed for the previous candidate using synthetic fixture records; final-candidate archive verification and human M06 review remain pending. See [export verification](export-verification-2026-10-20.md). |
| #51 | Complete Idea/MVP group, template/scoring/rubric/video decisions and course-owner acceptance. | Course owner accepted the established template and 19-group membership, preserving all 58 canonical Topics. Group-specific “improved” acceptance remains gated on the complete evidence packet and the owner sign-off list at the end of the MVP queue; no group is approved improved by this packet alone. |
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
| #70 | Full production journey, 58-topic availability, compatibility, storage/offline/accessibility checks, and staged rollout. | Final integrated candidate verification is Not Run pending source integration; results will be recorded in [the remaining-issues verification report](remaining-issues-verification-2026-10-20.md). Course-owner policy decisions are recorded in [the owner package](owner-decision-package-70.md); release-owner approval remains separate and pending. |
| #74 | Fresh-tab `/saved` offline bootstrap; complete cache-bundle commit/rollback; validate actual cached HTML/assets; production SW failure tests. | A corrective source change is integrated after the historical baseline; final-candidate browser verification remains Not Run. See [remaining-issues verification](remaining-issues-verification-2026-10-20.md). |

## Current integrated candidate verification

**Status: Not Run.** Final source integration and candidate/build identity are pending. Record every result only against the exact integrated source and production artifact in [remaining-issues verification](remaining-issues-verification-2026-10-20.md). The earlier candidate and pre-final baseline below are historical; do not transfer their results to the final candidate.

Pre-final baseline checks at revision `55934c9` passed lint, 92/92 focused unit tests, and the production build. The corrected release-browser journey passed 1/1 on build `xeBTqjveP3XltzTmvCWCj`. Root integration changed source after this baseline; these checks are not final-candidate evidence.

## Historical candidate identity and journey ledger

This ledger retains evidence for the superseded production candidate `22a4df321bc9272364a58b42c31e15ee9cc3b561` / `Yf_5yOWLs7xiCAYlOu3no`. It is historical only. Do not transfer these results to the current integrated candidate or treat them as current release evidence.

| Historical candidate field | Value |
|---|---|
| Integrated source revision | `22a4df321bc9272364a58b42c31e15ee9cc3b561` (product source; later docs/test-only commits do not alter this built product). |
| Production build/artifact ID and digest | Build ID `Yf_5yOWLs7xiCAYlOu3no`; SHA-256 of build ID `878e7dc9e752c962c5dfab0378010dd5b237a388344bd846d1ef92bed2133f67`; full artifact-tree digest not recorded. |
| Lockfile digest | SHA-256 `6f7ee6cf368e294debb4471ab6b5a50cb758eda2b6f072e35cb7f2c57e215324`. |
| TypeScript lint and production build | Passed at `22a4df321bc9272364a58b42c31e15ee9cc3b561`; `npm run lint` and `npm run build`; logs `/workspace/scratch/review/verified-lint.log` and `/workspace/scratch/review/verified-build.log`. |
| Service-worker version and cache inventory | Service-worker SHA-256 `81409b7d0936aa576afb10b027e51442534c85529e2ec39b2c4922123560068f`; source inventory is v2 in [rollout/rollback](rollout-rollback-70.md). Final-candidate runtime inventory: Not Run. |
| Test URL/environment | Root full-suite production server: `http://127.0.0.1:3200` (`next start`; stopped after the partial run). Release journey is configured for `http://127.0.0.1:3102`; that journey has Not Run. |
| Browser/device and viewport | Playwright bundled Chromium, headless, default 1280×720; responsive cases may override viewport. Human/manual browser review is Not Run. |
| Manual reviewer / date | Not assigned. |
| Automated suite owner / log reference | Root; stopped at the publish directive before the 204-test suite completed. Partial result: 129 Passed, 7 Failed, 1 Interrupted, 67 Not Run. Log and JSON: `/workspace/scratch/review/verified-playwright.log` and `/workspace/scratch/review/verified-playwright.json`. |

### Superseded partial browser run

This earlier run is retained for traceability and is not evidence for the current candidate. The run on revision `da194948dd95197e399ddc2f668d44484b185877`, build `FargzQp2ZRNj-QshkyY8H`, was intentionally stopped before completion while fixes were made. It recorded 74 Passed, 28 Failed, 1 Interrupted, and 101 Not Run of 204 tests in `/workspace/scratch/review/da19494-partial-playwright.log` and `.json`. Treat that partial result as Failed for its superseded candidate only; do not transfer any result to `22a4df321bc9272364a58b42c31e15ee9cc3b561`.

### Historical partial browser run on candidate `22a4df321bc9272364a58b42c31e15ee9cc3b561`

The run against production build `Yf_5yOWLs7xiCAYlOu3no` began at `2026-10-20T06:36:42Z` and was stopped at the user's publish directive before all 204 tests completed. Its exact result is **Failed / incomplete**: 129 Passed, 7 Failed, 1 Interrupted, and 67 Not Run. Five failures were responsive full-reader checks using an ambiguous article locator; two failures were outdated Topic 22/29 content assertions. Test-only corrections are present in integration revisions `c16b039`, `c2aaf80`, `c46de07`, and `dfc2a4f4c6258dd844aea6242bd24d37211f1e9f`; they were merged after the run stopped and have **not** been rerun. The interrupted test was Topic 48; 67 tests were never reached. These fixes do not change product revision `22a4df321bc9272364a58b42c31e15ee9cc3b561` or build `Yf_5yOWLs7xiCAYlOu3no`. Do not report the suite as passed or release-ready until the corrected suite completes on the identified build.

Evidence types remain separate:

- The scripted production journey is one Playwright run against the exact production build. It exercises a specific browser path and real local browser facilities, but a script step passing does not mark any M01–M10 manual row Passed.
- An agent exploratory visual review records its own candidate-bound screenshots, observations, viewports, and reviewer. It can identify technical visual issues; it does not establish a complete manual accessibility review or course-owner approval.
- M01–M10 are a human-run production journey in isolated browser profiles. Record `Passed`, `Failed`, or `Not Run`, reproduction steps, evidence path or download digest, browser/device, reviewer, date, and candidate identity. Educational acceptance and owner decisions remain separately recorded in the owner package.

The M01–M10 statuses below are for the historical `Yf_5yOWLs7xiCAYlOu3no` build. Final-candidate M01–M10 status is Not Run until a human review records evidence against that candidate.

| ID | Manual production journey and evidence to capture | Status | Evidence / reviewer / environment |
|---|---|---|---|
| M01 | Clean profile: landing → roadmap → arbitrary Topic without completing prerequisites → full reader. Confirm all 58 canonical Topics are available and the Topic status is accurately described. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M02 | On that Topic, submit correct, incorrect, and unanswered quiz states; inspect feedback, retry, stable question/version references, then reload and confirm the retained result. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M03 | Edit practical self-assessment ratings and notes, reload, and confirm criterion/scale references remain intact. Confirm the UI does not imply mastery or award a badge. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M04 | Open dashboard and verify reading, quiz, practical work, and favorites appear as distinct activity; inspect badge explanations without enabling awards. Repeat with an empty profile. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M05 | Search prompts, customize one, preserve the original and customized copy, copy the complete version, reset, reload, and check Arabic plus technical LTR text. Record clipboard and storage failure behavior if available. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M06 | Download the actual export; inspect the archive, file organization, 58-topic scope, assessments, readable diagrams, and honest treatment of external links. Record artifact digest and any missing or unreadable item. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M07 | Save a Topic and its quiz while online, then disconnect and open `/saved` in a fresh tab. Confirm the actual cached HTML and dependent assets load, offline quiz answers persist, diagrams still render/grade, and external video is reported unavailable/offline rather than approved or playable. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M08 | Upgrade a dedicated profile with prior local records and verify reading history, favorites, prompt copies, quiz attempts, practical assessments, and saved Topics remain meaningful. In a second clean profile, confirm none of the first profile's activity appears. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M09 | Repeat representative entry, reading, quiz, self-assessment, dashboard, prompt, export, and saved-content paths at desktop and mobile widths. Check keyboard order/focus, Arabic RTL, technical LTR, and horizontal overflow. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |
| M10 | Check candidate-video labeling and user-facing online/offline/unavailable states from the actual Topic reader. Do not record playback, captions, accessibility, or owner acceptance unless each was directly reviewed and evidenced. | Not Run | Not run on build `Yf_5yOWLs7xiCAYlOu3no`; reviewer not assigned. |

Historical automated evidence for the previous candidate is recorded separately below; it does not replace M01–M10 or establish final-candidate status:

| Check | Status | Exact revision/artifact and evidence reference |
|---|---|---|
| Existing full Playwright suite | Failed | Partial exact-build run: 129 Passed, 7 Failed, 1 Interrupted, 67 Not Run of 204. Five viewport tests failed on the broad reader article locator; Topic 22 and 29 failed stale content assertions. Fixes are committed in the current test tree but unrerun. Evidence: `/workspace/scratch/review/verified-playwright.log` and `.json`. |
| Combined production-build learner journey (separate release config) | Not Run | `npx playwright test --config=playwright.release.config.ts`; see [release-production-journey.spec.ts](../../release-e2e/release-production-journey.spec.ts). Must run against build `Yf_5yOWLs7xiCAYlOu3no` and actual local browser storage, service-worker caches, clipboard, and generated ZIP. It supplements rather than replaces the fixture/API-focused suite and human M01–M10. |
| Agent exploratory visual inspection | Not Run | Not run on this candidate; record screenshots, viewports, and reviewer separately. This is not the M01–M10 human journey or a course-owner visual-identity/accessibility approval. |
| Focused unit suite | Passed | 65 tests at `22a4df321bc9272364a58b42c31e15ee9cc3b561`; `/workspace/scratch/review/verified-unit.log`. Unit coverage is not production-browser evidence. |
| Storage, malformed/unavailable storage, quota/interrupted cache update and rollback checks in the production browser | Not Run | Not run in the production browser on this candidate. |
| TypeScript and production build checks | Passed | Exact product revision/build above; `/workspace/scratch/review/verified-lint.log` and `/workspace/scratch/review/verified-build.log`. Follow-up lint/unit checks on the later docs/test tree are Not Run here. |
| Offline `/saved` cache bootstrap, cached HTML/assets, and diagram rendering/grading checks | Not Run | Not run on this candidate; await the scripted production journey and required exploratory/manual checks. |
| Representative Mermaid browser rendering/sample review | Not Run | No exact-build sample browser render or visual review was completed. |
| Automated export archive integrity/content inventory | Passed | Exact candidate/build; Python `zipfile.testzip()` reported no CRC errors; 382 unique entries match `manifest.json`, all 382 text files decode as strict UTF-8, and the archive includes 58 lessons, 58 summaries, 58 content JSON files, and 105 Mermaid sources. The seeded fixture records are synthetic; this does not complete human M06 or owner review. Archive SHA-256 `4ec3426309b7e06a185f95437c8c575e88273cc3eca83369a57c733d4e4460fe`; see [export verification](export-verification-2026-10-20.md) and `/workspace/scratch/review/verified-export.zip`. |
| Manual visual, keyboard, RTL/LTR, responsive, and accessibility review | Not Run | Not yet reviewed for this candidate; see M09 and M10. |

The [Issue #70 owner decision package](owner-decision-package-70.md) records accepted course-owner policy decisions, per-video deferral, the pending group sign-off register, and a separate pending release-owner decision. No deployment or group-improvement claim is made here.

## Release gate

Release is blocked until every required check is `Passed` or has an explicitly accepted, documented deferral; there are no unresolved release-blocking failures; all 58 canonical Topics remain available; every group announced as improved has complete educational evidence plus recorded course-owner acceptance; and the release owner approves the staged rollout. A candidate video is not an approved resource. A curriculum author's review is not course-owner approval. A technical pass does not approve educational content or visual identity.

The integration owner must record the final candidate commit/build ID and current test ledger in [remaining-issues verification](remaining-issues-verification-2026-10-20.md) before the release owner records a decision. This matrix makes no deployment, publication, or issue-closure claim.
