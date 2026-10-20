# Learning export verification — 2026-10-20

## Captured archive

- Candidate commit: `22a4df321bc9272364a58b42c31e15ee9cc3b561`
- Production build ID: `Yf_5yOWLs7xiCAYlOu3no`
- Build ID SHA-256: `878e7dc9e752c962c5dfab0378010dd5b237a388344bd846d1ef92bed2133f67`
- Archive generated: `2026-10-20T06:37:00.029Z`
- Archive size: 2,609,298 bytes
- Archive SHA-256: `4ec3426309b7e06a185f95437c8c575e88273cc3eca83369a57c733d4e4460fe`
- Local archive: `/workspace/scratch/review/verified-export.zip`
- Raw inspection: `/workspace/scratch/review/verified-export-22a4df3-inspection.json`
- Inspector: `/workspace/scratch/review/inspect-learning-zip.py` (Python standard library `zipfile`)

`zipfile.testzip()` reported no CRC error. The archive has 382 unique entries, and `manifest.json` reports the same file count. All 382 textual files decoded as strict UTF-8. This is an artifact check for the exact build above; the separately running full browser suite is not reported as passed here.

## Fixture provenance and local records

The downloadable archive was captured by the seeded browser fixture in [the dashboard/export E2E test](../../e2e/dashboard-prompt-export.spec.ts#L61). That fixture writes synthetic localStorage records for `project-idea-mvp`, including a quiz attempt marked `selfCheck` and `previewOnly`, a practical self-assessment marked the same way, an archived rubric history entry, and a deliberately stale prompt source revision. The empty-profile fixture and its ZIP assertions are in the [same test](../../e2e/dashboard-prompt-export.spec.ts#L33). The archive must therefore be treated as synthetic test data, not a real learner's records.

The captured `learner-data/records.json` contains one recent-topic ID and bookmark (`project-idea-mvp`), one quiz attempt (`scope-check` v2, `scoring-proposal` v1, score 1/1), and one practical assessment (`scope-rubric` v1, `descriptive-three-level` v1). Both assessment records are self-check previews, not independent evidence of mastery. The practical entry retains history for `scope-rubric-v0` v0 and `archived-scale-v0` v0. There are no checklist selections and no badge award events. One customized prompt is preserved exactly; its original prompt is present, but `sourceRevisionMatches` is false and the export marks it stale.

`manifest.json` reports `readable-from-current-browser`; each of the eight record sources is `available`. This describes successful reads from the browser profile used by the fixture, not synchronization or recovery from another device.

## Included content and availability

The ZIP contains 58 lessons, 58 readable learning summaries, and 58 learning-content JSON files. It contains 105 Mermaid source files, with every source path listed in `resources/availability-manifest.json` present in the ZIP. Rendered diagrams are not included, and 23 topics do not expose an application diagram. It also contains 41 original prompt text files and the one customized prompt; the latter's stale source revision is surfaced in `prompts/customizations.json`.

The availability manifest lists 190 learner-project outputs that are not included, each with a reason. All 14 reference entries provide an outline and label the complete template file `not-available`. The 58 external video candidates are listed but not downloaded. Learner project files stored outside the application are inaccessible to the exporter. The README describes the package as a readable local snapshot, not an import, restore, or sync mechanism.

These contents follow the [export builder contract](../../src/lib/learningExport.ts#L286), which writes the records, readable summaries, Mermaid sources, prompt copies, and availability manifest. The [unit tests](../../src/lib/learningExport.test.ts#L75) cover diagram-source and summary inclusion as well as unavailable-record labeling.
