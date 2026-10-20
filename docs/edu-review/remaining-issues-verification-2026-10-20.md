# Remaining-issue verification — 2026-10-20

Technical review of the remaining MVP queue: issues #47, #49, #51–#70. The parent specification #38 and closed pilot #33 remain unchanged. Six parallel `gpt-6-luna` agents used `max` reasoning in separate worktrees; root reviewed the changes, requested corrections, integrated the commits, and ran the checks below.

**Technical outcome:** Passed with the full initial result and targeted rerun preserved separately below. Human/owner release acceptance remains pending.

## Candidate

- Product source: `d1e136ce7a0bbeb14c9ee13567af970db6c8188e`.
- Production build ID: `FvbL4S3b3evkSU2VIIDoP`.
- [Build identity and digests](remaining-issues-build-2026-10-20.json): 850 build-output files, SHA-256 `a81177a397432017fba724e542afe48c80679311472cf2bfbabb80bf7545d721`. The digest excludes `.next/cache/**`, `.next/trace`, and runtime `.next/server/route-cache/**`; its algorithm is recorded in the identity file.
- [Canonical release manifest](remaining-issues-manifest-2026-10-20.json): 58 Topics in 19 groups; 58 candidate videos, zero approved videos, zero improved groups. Regenerate with `npx tsx scripts/release_manifest.ts` at the product revision.
- Browser: Playwright bundled Chromium, headless, one worker; main suite port 3260. Production artifacts were built before browser testing. Documentation/test-only follow-up commits do not change this product source/build. After all browser runs, the original 850-file digest was reproduced exactly while excluding newly created runtime route-cache files.

## Changes reviewed

- Reject incomplete saved quiz bundles in both the client and service worker. Validation covers the grading policy, unique question/option identities, answer keys, feedback, metadata consistency, saved HTML version, diagrams, and referenced assets. An offline corruption regression removes an answer key without changing the question count.
- Require a dated video acceptance checklist tied to the exact Topic, content version, and source URL before exposing an approved outbound video action. Current unreviewed candidates remain non-actionable.
- Show the recorded acceptance of group boundaries and the lesson template consistently on the roadmap, catalog, preview, and full reader. Complete-group release requires a separate recorded owner acceptance and approved-video compliance for every member.
- Correct curriculum guidance: repository-local Git identity, review of all outgoing commits, realistic secret-protection limits, SRS prompt linkage, PlantUML/state-model claims, explicit design/tool artifacts and host-version requirements, conditional backend framework branches, connection-only PostgreSQL checks, and contract-defined journey examples.
- Preserve required practical outcomes. Missing service execution or artifacts are incomplete/Not Run; preparation or a fictional sample does not satisfy a practical criterion. Review packets distinguish static educational review, illustrative output, actual execution, human video review, and owner acceptance.
- Version all 32 changed catalog/lesson snapshots from 1 to 2 and regenerate their hashes/review summaries. Independent runtime comparison against `55934c987afc7fa24229b29964e3a1ea9ac7e60b` preserved all 58 canonical IDs, quiz answer keys/versions, assessment identities/versions, output IDs, criterion identities/versions, and video candidates. Quiz and rubric history keeps its original meaning.

## Verification ledger

| Check | Result | Evidence / boundary |
|---|---|---|
| `npm run lint` | Passed | Final integrated source; TypeScript has no errors. |
| `npx tsx --test src/lib/*.test.ts src/data/learning/*.test.ts src/components/*.test.tsx` | Passed | 98 tests, zero failures/skips. |
| `npm run build` | Passed | Build ID above; 182 static/generated pages. |
| Full existing production browser suite | Failed initially; resolved by targeted rerun | Full run: **301 Passed, 6 Failed**, zero skipped/flaky, 555.9 seconds. All six failures were stale wording expectations. After test-only corrections, `E2E_SERVER=production E2E_PORT=3260 npx playwright test --last-failed --reporter=line,json` **Passed 6/6** in 20.0 seconds. Exact failed/rerun case identities match; all 307 cases are covered with no unresolved failure. The product/build did not change. |
| Complete release production journey | Passed | `npx playwright test --config playwright.release.config.ts --reporter=line,json`: **1/1** in 18.2 seconds. Real clipboard, prompt persistence, 382-member ZIP/58 lessons, fresh offline `/saved`, offline quiz submission/retry/reload, rubric persistence, 87 cached assets, and reconnect were verified on this build. |
| Canonical identity and content-update audit | Passed | 58 identities preserved; every changed snapshot has a higher content version. |
| Agent exploratory visual inspection | Passed within sampled scope | Root inspected the [390px landing](remaining-issues-landing-390.png) and [1280px reader](remaining-issues-reader-1280.png) screenshots from the release journey for visible fit, Arabic prose, mixed technical text, and distinct availability/boundary/review labels. Mobile horizontal overflow was also asserted. This is a limited agent inspection, separate from human accessibility and course-owner acceptance. |
| Human manual M01–M10 / educational execution | Not Run | Automated assertions and static source review do not fill a human-run ledger or prove learner-tool execution. |
| Deployment / production smoke / rollback operation | Not Run | The staged procedure is prepared; release target, operators, audience, window, and go/no-go remain owner decisions. |

[Portable test summary](remaining-issues-tests-2026-10-20.json) retains the original run, resolved case identities, rerun, and release journey statistics. The actual ZIP passed CRC/unique-member inspection; SHA-256 `8bfad298b1cacf511874f5f089c10af9f3083a76af4715e12ac7c9c0bd882027`. Export learner records are synthetic test data; human export review remains Not Run.

Local run logs are in `/workspace/scratch/ai-agents-final-*.log`; the main browser JSON is `/workspace/scratch/ai-agents-final-playwright.json`. Earlier baseline runs and historical 204-test counts are separate evidence and are not results for this candidate.

## Remaining issue disposition

| Issue | Disposition |
|---|---|
| #49 | Technical implementation and verification complete: full-suite offline failure/update/rollback coverage, the corrected offline quiz corruption journey, and the full release journey passed. Ready to close when the implementation PR is merged. |
| #47 | Representation and exact-version acceptance gate implemented; each actual video still needs the human playback, caption, accessibility, suitability, and lesson-fit review explicitly deferred by the course owner. No representative video is falsely approved. |
| #51–#69 | All 19 group packets have static review/follow-up evidence. Group-specific practical execution and media gaps remain explicit; no group has complete release acceptance or improved status. See the [group sign-off register](owner-decision-package-70.md). |
| #70 | Technical release candidate evidence is complete for the scope above, with original failures and passing reruns retained. Human manual checks, complete-group acceptance, individual video approvals, and a release-owner decision remain distinct. No deployment is claimed. |
| #38 / #33 | Parent/pilot issues are unchanged. |

The recorded [owner decision](owner-decision-package-70.md#course-owner-decisions) explicitly says each individual video stays a candidate until a human reviews playback, captions, accessibility, and lesson fit. Completing technical checks cannot supply that decision. The [rollout/rollback procedure](rollout-rollback-70.md) also requires a separate release decision. These conditions are preserved; this review does not bulk-approve media, groups, or a launch.
