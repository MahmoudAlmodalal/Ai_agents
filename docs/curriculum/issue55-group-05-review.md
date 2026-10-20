# Issue #55 — Release the complete PlantUML and behavior diagrams group

**State:** Draft authoring and evidence packet. Group 05 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [PlantUML and behavior diagrams fictional project outputs](samples/group-05-plantuml-behavior.md).
**Proposed boundary:** 4 Topics in PlantUML and behavior diagrams. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `plantuml`

- **Suggested input / handoff:** A question requiring a UML view; no PlantUML install is implied and the existing lesson’s editor options remain.
- **Objectives:** إنشاء ملف PlantUML يبدأ وينتهي بعلامات صحيحة واختيار الرسم المناسب. / استخدام معاينة للتحقق من الصياغة والتمييز بين صلاحية الرسم وصحة النموذج.
- **Authored learning path:** المدخل: رسم هندسي يحتاج إلى ترميز → حدود الملف → مقارنة واعية. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `plantuml-guide` — `docs/diagrams/README-plantuml.md` يشرح المحرر والتصيير واختيار اللغة.; `plantuml-sample` — كود PlantUML صالح مع بداية ونهاية واضحتين.
- **Assessment draft:** questions `plantuml-q-boundary`, `plantuml-q-render` (two four-option questions with keyed rationales); criteria `plantuml-r-render` → `plantuml-sample`, `plantuml-r-guide` → `plantuml-guide`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** عينة `@startuml` و`@enduml` تضيف actor ونظاماً وتسمي الغرض؛ لا تسبق هذه العينة اعتماد صلاحيات use cases. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [PlantUML in Action 001 - Quick Started](https://www.youtube.com/watch?v=znl8VyLi3jA). Yasenstar’s PlantUML in Action: a syntax and editor walkthrough candidate for the first @startuml/@enduml render. It is an independent tutorial, not a PlantUML endorsement. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `use-case-diagram`

- **Suggested input / handoff:** A bounded system and its goals/actors from PRD and domain language.
- **Objectives:** تحديد حدود النظام والأدوار الخارجية وأهداف المستخدمين ضمن MVP. / استخدام include وextend عند وجود مسوغ سلوكي من المتطلبات.
- **Authored learning path:** المدخل: أدوار وأهداف من PRD → حدود النظام → العلاقات ليست زخرفة. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `usecase-puml` — `docs/diagrams/use-case.puml` يوضح actors وحالات الاستخدام وحدود النظام.; `usecase-notes` — `docs/diagrams/use-case.md` يشرح include/extend وأساس الصلاحيات.
- **Assessment draft:** questions `usecase-q-actor`, `usecase-q-extend` (two four-option questions with keyed rationales); criteria `usecase-r-boundary` → `usecase-puml`, `usecase-r-relations` → `usecase-notes`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يمكن تمثيل “تقديم طلب” و“مراجعة طلب” كهدفين لدورين. لا تستخدم include لمراجعة المسؤول في كل حالة إلا إذا أثبت PRD أن هذه خطوة إلزامية. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [UML Use Case Diagram Tutorial](https://lucid.co/diagram/uml/use-case-diagram-tutorial). Lucid: an embedded tutorial for actors, system scope, goals, and associations in use-case diagrams. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `activity-diagram`

- **Suggested input / handoff:** A supported behavior scenario or use-case description, with outcomes and exceptions taken from its source.
- **Objectives:** تمثيل تدفق النشاط وبوابات التحقق والتفرعات ومسارات التعافي. / إظهار كل قرار على أساس شرط مصدره المتطلبات.
- **Authored learning path:** المدخل: عملية لها قرار → المسارات والبوابات → حافظ على المصدر. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `activity-doc` — `docs/diagrams/activity-diagram.md` يوضح السلوك والقرارات.; `activity-code` — `docs/diagrams/activity-diagram.mmd` مخطط Mermaid يضم الفروع المدعومة.
- **Assessment draft:** questions `activity-q-guard`, `activity-q-source` (two four-option questions with keyed rationales); criteria `activity-r-paths` → `activity-code`, `activity-r-source` → `activity-doc`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يفحص النظام الحقول أولاً؛ المدخل غير المقبول يعرض سبب الرفض، والمقبول يذهب إلى مراجعة المسؤول. لا يرسم مسار انتهاء تلقائي ما لم يرد في SRS. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [UML Activity Diagram Tutorial](https://lucid.co/diagram/uml/activity-diagram-tutorial). Lucid: an activity-diagram walkthrough candidate on actions, decisions, forks, and swimlanes for process behavior. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `state-diagram`

- **Suggested input / handoff:** A lifecycle-bearing domain entity and its documented state-changing events; leave unspecified transitions open.
- **Objectives:** تحديد حالات كيان ودورة حياته وانتقالاته وفق قرارات المشروع. / كتابة انتقالات ذات حدث أو حارس ومصدر دون إضافة حالات افتراضية.
- **Authored learning path:** المدخل: كيان تتغير حالته → الحالات والانتقالات → المصدر يضبط دورة الحياة. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `state-doc` — `docs/diagrams/state-diagrams.md` تعريف الحالات والأحداث ومصادرها.; `state-code` — `docs/diagrams/state-diagrams.mmd` رسم `stateDiagram-v2` للكيان المحدد.
- **Assessment draft:** questions `state-q-event`, `state-q-unknown` (two four-option questions with keyed rationales); criteria `state-r-lifecycle` → `state-code`, `state-r-unknown` → `state-doc`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يرسم انتقالاً من قيد المراجعة إلى إحدى النتيجتين عند قرار المسؤول. لا يضيف حالة “منتهي” أو مؤقتاً آلياً إلا إذا ورد في المصدر. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [1.6 UML-Zustandsdiagramm (UML State Diagram)](https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/50973). University of Hamburg, Software Engineering lecture: a state-diagram candidate for states, transitions, and lifecycle behavior. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Sample correction review — 2026-10-20

- **Topic 12 (`activity-diagram`): Passed, static format/branch coverage only.** `samples/group-05-plantuml-behavior.md` now supplies the expected Mermaid `flowchart TD` in `activity-diagram.mmd`, with success and proposed invalid-choice recovery paths. The proposed behavior needs a project source before implementation; browser rendering and independent source-trace validation are **Not Run**.
- **Topic 13 (`state-diagram`): Passed, static format/state scope only.** The sample now supplies `stateDiagram-v2` in `state-diagrams.mmd`; unresolved tie handling is a note rather than an invented self-transition. State-source validation and rendering remain **Not Run**.
- **Topic 11 (`use-case-diagram`): Partial, static source alignment only.** The sample leaves FR-004's selected-result use case without an actor association while Q-05 leaves the viewer role unresolved; the Organizer-to-result association was removed. PlantUML rendering and independent role/permission validation are **Not Run**.

These narrow results do not establish lesson acceptance, template approval, complete student handoff, or group release.

## Release decision for issue #55

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
