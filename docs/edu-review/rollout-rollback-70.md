# Issue #70: staged rollout and rollback procedure (draft)

**Procedure version:** draft v1, 2026-10-20
**Application version / release commit:** pending the integrated release candidate.
**Release owner / target environment / rollout window:** to be recorded by the authorized release owner.
**Status:** proposed procedure only. No stage has been deployed or smoke-tested; this document does not authorize deployment.

## Preparation and compatibility record

Before any authorized rollout, identify the exact release commit, production build artifact and digest, lockfile, runtime configuration, service-worker version, previous known-good artifact, deployment target, release owner and rollback operator. Record the supported browser/device matrix and the test evidence for the same candidate. Define the stage duration and audience with the release owner; do not infer a cohort size or launch window from this draft.

Capture a release manifest containing all 58 canonical Topic slugs and 19 groups, route availability, public educational status, quiz/question versions, practical criterion/scale versions, and the external-video candidate/approval state. Verify the existing local record contract against the previous release. The current implementation uses `ai-agents-quiz-attempts-v1` and `ai-agents-practical-assessments-v1` with schema version 1; attempts retain their question/criterion and scale version references. Confirm current names and migration behavior against the integrated candidate before rollout. Learner records are local to a browser/device and must not be described as synchronized or centrally backed up.

For offline storage, record the actual manifest/cache names and behavior from the candidate. The current implementation identifies `ai_agents_offline_manifest_v1`, `ai_agents_offline_topic_v1:<topic>`, `ai-agents-shell-v1`, and `ai-agents-topics-v1`; confirm the integrated code before relying on this inventory. An offline save is available only when the candidate has verified the complete cached HTML and dependent assets, not merely a localStorage flag. Demonstrate that an interrupted download or quota failure preserves the last complete bundle and does not leave cached HTML pointing at missing assets. Do not delete old caches as a rollback shortcut.

Before promotion, retain the previous complete deployment artifact and verify an authorized route back to it. Record which artifacts/service-worker assets remain available during the rollout. Check that a rollback does not clear learner `localStorage`, IndexedDB, bookmarks, reading history, checklists, quiz attempts, rubric assessments, prompt customizations, or offline topic content. If a schema or cache transition cannot safely read old and new state, stop rollout until a compatible migration/rollback strategy is implemented and tested.

## Stages and promotion checks

1. **Release review:** attach the completed [#70 evidence matrix](release-readiness-70.md), exact candidate/build identity, owner decisions, support matrix and known limitations. Confirm all required checks passed and all announced improved groups have explicit course-owner acceptance. Record approval before deployment.
2. **Authorized preview/staging:** install the exact candidate in the authorized pre-production target. Run landing → arbitrary Topic → reading → quiz → self-assessment → reload → dashboard → badge explanation → prompt edit/copy → export → save → offline fresh-tab reading/quiz. Check the 58-topic manifest, profile isolation, video connectivity state, actual export contents, diagrams, storage errors, cached bundle completeness, keyboard, mobile, RTL and LTR. Record each result; stop on any release blocker.
3. **Initial production stage:** only the release owner may authorize it. Use the release-owner-defined limited stage/window, preserving the prior artifact and compatible caches. Run read-only smoke checks first, then a controlled learner journey using an isolated test profile. Do not use a learner's real profile for destructive validation. Record start time, artifact identity, checks, observed errors and stop/continue decision.
4. **Promotion:** expand only after the initial-stage checks remain clean for the release-owner-defined observation window. Recheck the landing/read/save/export and offline saved-content paths after promotion. Preserve the prior artifact and rollback route until the owner closes the observation period.

If no genuine staged deployment mechanism exists for the target, record that limitation and use only a release-owner-approved equivalent. Do not claim staged rollout based on a local or preview build.

## Stop and rollback triggers

Stop promotion and ask the release owner to decide rollback when a required journey fails; any canonical Topic disappears or is mislabeled; any prior local record is lost, cross-profile data appears, or a record is misattributed; a cache update marks incomplete content as saved or strands HTML without assets; the fresh offline `/saved` entry fails; a production build/browser error blocks a required task; external video state falsely claims offline availability or approval; keyboard focus/RTL/LTR/mobile defects prevent a core journey; or monitoring shows an unexplained increase in user-visible failures. Record each trigger with exact build, browser, steps, time and evidence.

## Rollback steps

1. The release owner records the decision, trigger and affected artifact; halt further promotion.
2. Restore the previous known-good application artifact through the authorized deployment mechanism. Verify landing, roadmap, a saved Topic, dashboard and prompt library using a new test profile and a profile with prior records.
3. Preserve all learner storage and offline content. Do not clear localStorage, IndexedDB, browser caches, service-worker registrations, bookmarks, history, quiz/rubric records, prompt customizations or saved-topic manifests as part of rollback. Do not ask learners to clear browser data.
4. Keep both the failed and previous release evidence and service-worker/cache inventories. If the service worker is involved, use only a previously tested compatible update/rollback path; do not force-activate unverified assets or claim recovery until the cached HTML and all dependencies are checked.
5. Confirm that the restored app can read historical quiz and rubric versions and that offline saves still match complete cached bundles. If compatibility is uncertain, stop changes and preserve the current browser state while investigating; do not run a destructive migration.
6. Record the final rollback artifact, checks, data-compatibility result, remaining defects and owner decision. Resume rollout only after the defect is fixed, the affected checks are rerun on a new identified candidate, and the release owner reauthorizes the next stage.

## Evidence to retain

For each stage, retain the release/build identifiers and artifact digests, test-ledger link, browser/device and profile type, rollout and rollback timestamps, storage/cache schema inventory, observed errors, changes made and the release-owner decision. Keep educational author review, course-owner acceptance, technical test results and deployment authorization as separate evidence. A rollback must never be represented as erasing learner data or as proof that the prior candidate passed the new release checks.
