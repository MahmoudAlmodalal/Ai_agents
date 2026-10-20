# Learning assessment and curriculum review — 2026-10-20

## Assessment implementation (#42 and #43)

The full reader and home preview use the same Topic learning-content source and browser-local records. Quiz attempts retain question, quiz, and scoring-policy versions. Rubric ratings retain criterion and scale identity/version; edits retire prior meanings instead of applying them to the current scale. Malformed or inconsistent saved records are rejected without erasing valid unrelated records. Storage failures keep the current interaction session-only and say so in the UI.

No course-owner policy approval was supplied. Scoring and the descriptive rubric therefore remain proposed, preview-only behavior; the UI does not claim mastery or issue awards. Records remain local to the learner's browser. The policy gates require complete approval metadata and evidence for the lesson, each question, and each rubric criterion before final assessment behavior can be enabled.

### Verification

| Check | Command | Result |
|---|---|---|
| TypeScript lint | `npm run lint` | Passed. |
| Storage, policy, video, and Group A data tests | `node --import tsx --test src/lib/learningRecords.test.ts src/lib/learningPolicy.test.ts src/components/ExternalVideoResource.test.tsx src/data/learning/group-a.test.ts` | 14 tests passed. |
| Assessment browser journeys | `E2E_PORT=3102 npm run test:e2e -- e2e/learning-assessments.spec.ts` | 6 tests passed, one worker, under `/tmp/ai-agents-browser.lock`. The owned server exited after the run. |

The six browser journeys verify grading/retries/reload, full-reader and preview consistency with a clean browser profile, Topic isolation, retained prior-version history without current grading, failed quiz write followed by reload, and failed rubric write followed by reload. The focused storage tests exercise malformed-record preservation and write recovery beyond the browser scenarios. No production build was repeated for this review; final combined production validation is coordinated by the integration owner.

## Curriculum data coverage

The validated source contains 58 canonical Topic supplements: 29 Group A Topics (1–29; commits `8198a72` plus its Topic 01 foundation) and 29 Group B Topics (30–58; `5c937fd` plus Python validation alignment `54fbd8b`). A runtime count found 58 Topics, 116 objective questions, 116 artifact-bound criteria, and 58 candidate video records. Question and rubric policies remain proposed across both groups. Video records are candidates; playback, captions, accessibility, and course-owner release approval remain unverified.

The count command was `node --import tsx --input-type=module -` importing `LEARNING_CONTENT_GROUP_A` from `src/data/learning/group-a.ts` and `LEARNING_CONTENT_GROUP_B` from `src/data/learning/group-b.ts`, then reducing each `Object.values()` collection for topic count, `quiz.questions.length`, `practicalAssessment.criteria.length`, and `candidateVideos.length`. Result: A `{topics:29, questions:58, criteria:58, proposedQuiz:true, candidateVideos:29}`; B `{topics:29, questions:58, criteria:58, proposedQuiz:true, candidateVideos:29}`.

Root's independent narrow B review at `cb08eee` passed question prompts, keys, rationales, and criterion-to-output references only. It explicitly did not certify lesson bodies, worked examples, videos, or owner acceptance. My subsequent static walkthrough compared issue packets #61–64 with their existing lesson sources, typed supplements, and each output's next Topic handoff. The findings below were sent to Curriculum B, which acknowledged the corrections and is preparing a follow-up. They are **pending correction and re-review**, not passed content.

| Issue / Topics | Static review result and evidence |
|---|---|
| #61 — 30 TypeScript | `group-b.ts` says the invalid `status: "waiting"` can fail by type checking or runtime validation, although the same lesson correctly explains that TypeScript does not validate raw JSON. Separate the compile-time annotated-object example from a runtime-schema test. Explicitly label the four-state `RequestStatus` example as illustrative or reconcile it with the canonical BorrowHub five-state loan sample. |
| #61 — 32 Tailwind | The existing HTML lesson still recommends `overflow-x-hidden` to achieve zero overflow (`t11-tech-stack.ts`, lines 553–571 and 1123), while the typed supplement teaches diagnosing the overflowing element before hiding it. Reconcile the old lesson table/step with the supplement. |
| #61 — 33 Next.js | The existing lesson's BorrowHub routes are `/equipment` and `/equipment/[id]`; the typed worked example uses `/items` without identifying that tree as generic. Align it with the lesson or label the replacement clearly. |
| #62 — 34–37 frontend planning | The broad handoff sequence is coherent, but two edges are implicit: Topic 34 does not list Topic 33's route specification as input, and Topic 36 does not list Topic 35's UX decision record as input. Add the artifacts where they are used or mark those inputs optional. |
| #63 — 38–40 Python/PostgreSQL/API | Topic 38's `config.py`, `main.py`, `services/` example reads like a framework-specific scaffold although Django/FastAPI selection is later; label it conceptual or defer the scaffold. Topic 39 omits Topic 38's environment/config output from its input list. More substantially, Topic 39 asks learners to apply a migration and shows `migration=applied` before a selected framework's ORM/migration exists (those are Topics 41/42); defer migration execution to that framework lesson and mark any unrun `SELECT 1` as `Not Run`, not an executed sample result. |
| #64 — 41–44 backend | Topic 43 does not list the chosen framework's user model/migration output from Topic 41 or 42. Topic 44 omits Topic 43's permission/auth output, despite Topic 43 handing off to service boundaries. Add both inputs. In the Topic 44 sample, authorization/ownership should precede reading or revealing availability; then perform the concurrency-sensitive lock/check/mutation inside the transaction. |

Curriculum B's correction acknowledgment is recorded in the agent conversation; no revised commit has yet been re-reviewed as of this note. Static source review did not execute the learner-project tools, run course-owner review, or validate the corresponding lessons through a browser. Those checks remain Not Run or pending as stated.
