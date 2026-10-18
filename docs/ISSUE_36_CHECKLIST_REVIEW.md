# Issue #36: saved application checklist

The full reader and quick preview use the same client checklist and browser-local store. Both show authored `TopicItem.checklist` criteria and label the list «قائمة تحقق التطبيق». The explanation identifies these choices as self-assessment, distinguishes them from scrolling progress, and keeps navigation available.

## Identity and existing data

- Structured criteria retain the existing `application-checklists-v1` document. Canonical topic slug and exact criterion text identify each choice. Text is normalized with Unicode NFC, trimmed, and collapsed whitespace; wording and meaningful Arabic characters remain significant.
- Reordering leaves selections attached to the same text. A changed criterion starts unchecked. Retired text remains in storage so editing the current list does not erase older reliable saves.
- Numeric `checklist_<topic.id>_<index>` values never map to structured criteria. The first topic's old inline source had no inline checklist, so an old `checklist_topic-01_0` value cannot prove a match.
- Original Topic 03 has four verified inline checkbox labels in `scripts/topics/topic03.ts`. Only the exact original topic ID, canonical slug, and one of those frozen labels allow a read from its original positional key. Reordering the current HTML does not alter that lookup.
- Inline HTML uses separate stable per-item boolean keys, encoded as a JSON tuple of canonical slug and normalized label. A newly saved `false` overrides an old positional `true`; raw legacy keys remain untouched. Other labels and topics receive no inferred legacy assignment.

## Storage failures and synchronization

Reads validate the complete stored document before any write. Missing storage begins with an empty valid document; malformed JSON, invalid shapes, storage access exceptions, and quota failures have distinct error states. Malformed data remains untouched. The component never reports that a failed write saved successfully.

Selections remain in a shared memory store when reads or writes fail. Each pending change records the intended checked state, so checking several criteria and clearing one cannot discard the others. When storage recovers, pending changes merge with the latest saved data. Subscribers in the same document update together; storage, focus, and visibility events refresh available data and retry pending changes. Each topic has its own snapshot, so another topic does not inherit its write error.

Authored inline HTML also receives guarded persistence, a self-assessment counter, an accessible failure notice, and listener cleanup through the shared HTML interaction wrapper. The helper removes references to the unavailable exported `updateChecklist` global.

## Verification prepared

`src/lib/applicationChecklist.test.ts` contains eight public store tests for semantic identity, reorder and text changes, topic isolation, shared subscribers, storage getter/read/write failures, malformed document shapes, existing semantic saves, untouched positional data, external update merging, and collision-safe topic keys.

`src/lib/legacyHtmlChecklist.test.ts` contains four tests for frozen baseline matching, stable key encoding, raw legacy preservation, read/write recovery, and corrupted stable data.

`e2e/application-checklist.spec.ts` contains five browser tests covering both readers, selection and clearing, reload, browser back, a real second topic with authored criteria, read/write failure and recovery, malformed data, and a real legacy inline checkbox. The second-topic assertion is required and cannot pass by skipping an absent checkbox.

Commands for the integration coordinator:

```sh
npx tsx --test src/lib/applicationChecklist.test.ts src/lib/legacyHtmlChecklist.test.ts
npm run lint
CI=1 E2E_PORT=3133 npm run test:e2e -- e2e/application-checklist.spec.ts
```

The checklist implementer did not start browser, build, or test processes; the integration coordinator runs the combined checks after all parallel edits settle. Final outcomes belong in the combined integration report. No changes were staged, committed, pushed, or sent to GitHub by this implementer.

## Limits

Saving belongs to this browser and origin. Choices made while storage remains unavailable survive client navigation in the current page session, and the notice explains that a full reload can lose them. Edited text intentionally requires a fresh assessment. No checklist choice assesses correctness, grants mastery, or unlocks another topic.

Final combined results and baseline limitations are recorded in [LEARNING_PILOT_QA.md](LEARNING_PILOT_QA.md).
