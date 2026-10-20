# Issue #54 — Release the complete Mermaid, User Flow, and Domain Model group

**State:** Draft authoring and evidence packet. Group 04 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [Mermaid, User Flow, and Domain Model fictional project outputs](samples/group-04-mermaid-flow-domain.md).
**Proposed boundary:** 3 Topics in Mermaid, User Flow, and Domain Model. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `mermaid-syntax`

- **Suggested input / handoff:** A question or small scenario from the project requirements; Mermaid is one optional representation.
- **Objectives:** كتابة Mermaid صحيحة واختيار نوع الرسم واتجاهه بحسب السؤال. / عرض الرسم مع عنوان وشرح واتجاه نص مناسبين في ملفات المشروع.
- **Authored learning path:** المدخل: سؤال الرسم → صيغة قابلة للتصيير → عرض عربي وتقني. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `mermaid-guide` — `docs/diagrams/README.md` مع أمثلة وتعليمات التصيير.; `mermaid-samples` — أكواد Mermaid صالحة للتصيير ومعها شرح نصي.
- **Assessment draft:** questions `mermaid-q-type`, `mermaid-q-meaning` (two four-option questions with keyed rationales); criteria `mermaid-r-valid` → `mermaid-samples`, `mermaid-r-doc` → `mermaid-guide`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يظهر الرسم عقدة قرار بتفرع “متاح / غير متاح” يلتقي كل منها بنتيجة مفسرة. لا يضيف قاعدة قبول حجز لم تعتمد في PRD. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [How to Create Mermaid Diagrams](https://www.youtube.com/watch?v=SQ9QmuTHuSI). GitLab Unfiltered: a Mermaid Live Editor tutorial candidate for writing and rendering text-based diagrams. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `user-flow-modeling`

- **Suggested input / handoff:** A source-backed user goal and behavior from PRD/SRS plus Mermaid basics; earlier topics are recommendations only.
- **Objectives:** نمذجة رحلة مستخدم من بدايتها إلى نتيجتها مع نقاط قرار ومساري النجاح والرفض. / ربط كل خطوة وسلوك بدور ومصدر PRD دون توسيع النطاق.
- **Authored learning path:** المدخل: هدف ودور من PRD → الخطوات والتفرعات → مراجعة التغطية. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `user-flow-doc` — `docs/user-flow.md` يوثق المستخدم والخطوات والقرارات ومصادرها.; `user-flow-diagram` — مخطط `flowchart TD` بمسارات MVP المسمّاة للنجاح والرفض.
- **Assessment draft:** questions `userflow-q-actor`, `userflow-q-source` (two four-option questions with keyed rationales); criteria `userflow-r-coverage` → `user-flow-diagram`, `userflow-r-source` → `user-flow-doc`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** BorrowHub is optional. مسار الطلب المقبول يمر بمراجعة المسؤول ثم إشعار الطالب؛ ومسار الرفض يعرض الرد. لا يقرر الرسم متى ينتهي الطلب ما لم يحسم PRD ذلك. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [User Journeys vs. User Flows (And When to Use Each)](https://www.nngroup.com/videos/user-journeys-vs-user-flows/?lm=journey-mapping-ux-practitioners&pt=article). Nielsen Norman Group: a concise distinction between user journeys and task-level user flows to support the Topic’s choice of one role-based scenario. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `conceptual-domain-model`

- **Suggested input / handoff:** Project terms and relationships from requirements; validate meanings with the project owner when possible.
- **Objectives:** استخراج مفاهيم العمل وحدودها وعلاقاتها من متطلبات المشروع. / شرح النموذج بلغة المجال دون خلط المفهوم بجدول قاعدة بيانات أو كلاس.
- **Authored learning path:** المدخل: أسماء ومعانٍ من مجال العمل → العلاقة وحدود المعنى → ابق في المستوى المفاهيمي. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `domain-model-doc` — `docs/diagrams/domain-model.md` بتعريفات بلغة مجال العمل ومصادرها.; `domain-model-diagram` — `docs/diagrams/domain-model.mmd` مع رسم مفاهيمي قابل للمراجعة.
- **Assessment draft:** questions `domain-q-level`, `domain-q-relationship` (two four-option questions with keyed rationales); criteria `domain-r-definitions` → `domain-model-doc`, `domain-r-boundary` → `domain-model-diagram`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** BorrowHub is optional. يرتبط الطلب بطالب ومعدة، ويراجعه مسؤول. قد تكون “حالة الطلب” صفة للطلب لا كياناً مستقلاً؛ يحتاج هذا التفريق إلى مراجعة مالك المجال قبل تحويله إلى جداول. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Week 2: Lecture 10 — How to start creating a software conceptual design](https://www.youtube.com/watch?v=UMUxxW7MzkE). NPTEL / IIT Bombay: a software conceptual-design lecture candidate for separating domain concepts and design reasoning from implementation detail. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Sample correction review — 2026-10-20

- **Topic 07 (`mermaid-syntax`): Passed, static artifact contract only.** `samples/group-04-mermaid-flow-domain.md` now includes a real `flowchart TD` snippet in the README sample rather than prose alone. Mermaid rendering and RTL/LTR browser presentation remain **Not Run**.
- **Topic 08 (`user-flow-modeling`): Passed, static handoff only.** The sample flow now includes a success path and a clearly labeled proposed validation/recovery path; tie behavior remains an open question. The proposed branch must be replaced by a PRD-backed rule before implementation. No runtime behavior was executed.
- **Topic 09 (`conceptual-domain-model`): Passed, static level/format only.** The sample now uses a `flowchart LR` with business concepts and labeled relationships, without class-diagram syntax, implementation attributes, or multiplicities. Relationship meanings still require domain-owner confirmation; no renderer or owner review was run.

These narrow results do not establish lesson acceptance, template approval, complete student handoff, or group release.

## Release decision for issue #54

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
