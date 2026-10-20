# Issue #56 — Release the complete ERD, DBML, Sequence, and Class diagrams group

**State:** Draft authoring and evidence packet. Group 06 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [ERD, DBML, Sequence, and Class diagrams fictional project outputs](samples/group-06-data-sequence-class.md).
**Proposed boundary:** 4 Topics in ERD, DBML, Sequence, and Class diagrams. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `relational-erd-design`

- **Suggested input / handoff:** A domain model and confirmed data requirements; do not infer cardinality or database constraints.
- **Objectives:** تصميم جداول ومفاتيح وقيود تدعم حقائق المجال المعتمدة. / مراجعة العلاقات والتكامل المرجعي والتزامن مقابل سيناريوهات المنتج.
- **Authored learning path:** المدخل: نموذج مجال وSRS → المفاتيح والعلاقات → راجع الاتساق والتزامن. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `erd-doc` — `docs/ERD.md` يوضح الجداول والمفاتيح والعلاقات والقيود.; `database-review` — `docs/database-review.md` يسجل مراجعة التزامن والقيود والقرارات المفتوحة.
- **Assessment draft:** questions `erd-q-fk`, `erd-q-concurrency` (two four-option questions with keyed rationales); criteria `erd-r-integrity` → `erd-doc`, `erd-r-concurrency` → `database-review`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يمكن أن يحمل جدول Request مفتاحاً أجنبياً إلى User وإلى Equipment إذا ثبتت العلاقة. قيد “معدة واحدة” لا يترجم تلقائياً إلى فهرس أو unique دون تحليل العملية المطلوبة. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Create an Entity Relationship Diagram in Lucidchart](https://help.lucid.co/hc/en-us/articles/16471565238292-Create-an-Entity-Relationship-Diagram-in-Lucidchart). Lucid: an embedded ERD tutorial candidate covering entities, attributes, relationships, and cardinalities. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `dbml-dbdiagram-io`

- **Suggested input / handoff:** An accepted relational model from ERD; if no database choice exists, record it as open.
- **Objectives:** كتابة مخطط DBML يعكس ERD المعتمد مع أنواع الحقول والمراجع. / تصيير ومراجعة المخطط وتصدير SQL مع فهم اختلافه عن DBML.
- **Authored learning path:** المدخل: ERD قبل الصياغة → تعريف الجداول والمراجع → مراجعة التصدير. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `dbml-source` — `docs/database.dbml` نموذج DBML محلي للمخطط.; `sql-export` — `docs/database.sql` نسخة DDL مولدة ومراجعة مقابل DBML.
- **Assessment draft:** questions `dbml-q-language`, `dbml-q-export` (two four-option questions with keyed rationales); criteria `dbml-r-fidelity` → `dbml-source`, `dbml-r-export` → `sql-export`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يصف DBML الجدولين ثم `Ref` من حقل صاحب الطلب إلى مفتاح الطالب؛ لا يضيف حقولاً غير موجودة لمجرد تسهيل العرض. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [dbdiagram.io - Database Diagrams with Code (DBML)](https://www.youtube.com/watch?v=yN1RnjZEosY). Fazt: a DBML and dbdiagram.io introduction that can supplement translating the accepted ERD into declarative database markup. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `sequence-diagram-modeling`

- **Suggested input / handoff:** One SRS/use-case scenario with ordered participants and messages.
- **Objectives:** تمثيل رسائل متتابعة زمنياً بين الأطراف والخدمات في حالة استخدام محددة. / إظهار التحقق والنجاح وفروع الخطأ على أساس SRS.
- **Authored learning path:** المدخل: سيناريو سلوكي → الترتيب والرسالة → بدائل الخطأ. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `sequence-code` — `docs/diagrams/sequence-diagrams.mmd` تسلسل تفاعل النجاح والفشل المعتمد.; `sequence-doc` — `docs/diagrams/sequence-diagrams.md` وصف المشاركين والرسائل والمصادر.
- **Assessment draft:** questions `sequence-q-order`, `sequence-q-alt` (two four-option questions with keyed rationales); criteria `sequence-r-order` → `sequence-code`, `sequence-r-branches` → `sequence-doc`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يظهر طلب الطالب ثم تحقق النظام ورداً بالقبول أو الرفض. لا يضيف الرسم خدمة بريد أو دفع إذا لم يشملها النطاق. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [5.6 UML-Sequenzdiagramm (UML Sequence Diagram)](https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/42264). University of Hamburg, Software Engineering lecture: a sequence-diagram candidate for ordered messages between participants. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `class-diagram-design`

- **Suggested input / handoff:** Requirements and domain concepts; include methods only when an explicit design purpose supports them.
- **Objectives:** اشتقاق أصناف وخصائص ومسؤوليات من بنية المجال والسلوك. / مطابقة العلاقات مع ERD والعمليات مع مخطط التسلسل.
- **Authored learning path:** المدخل: ERD وSequence → المسؤولية قبل الصنف → افحص الاتساق. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `class-code` — `docs/diagrams/class-diagram.mmd` صفوف وعلاقات متسقة مع المصادر.; `class-doc` — `docs/diagrams/class-diagram.md` يشرح المسؤوليات والتتبع.
- **Assessment draft:** questions `class-q-source`, `class-q-responsibility` (two four-option questions with keyed rationales); criteria `class-r-structure` → `class-code`, `class-r-alignment` → `class-doc`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** قد تظهر عملية مراجعة في مكوّن يملك هذه المسؤولية، مع علاقة الطلب بمفاهيم المصدر. الاسم والمكان يظلان اختياراً معمارياً يبرره الطالب، لا حقيقة من ERD. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [UML Class Diagram Tutorial, Examples, and Guide](https://lucid.co/diagram/uml/class-diagram-tutorial). Lucid: an embedded class-diagram walkthrough candidate for classes, attributes, operations, multiplicities, and relationships. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Group 06's ERD/DBML sample uses a composite `(session_id, option_id)` foreign key to prevent a preference from pairing one session with another session's option. Root ran a narrow in-memory SQLite probe against manually translated DDL on 2026-10-20: same-session choice passed; cross-session choice failed on the FK; duplicate participant/session failed on uniqueness. DBML parsing, generated-DDL equivalence, PostgreSQL execution, and repository tests remain **Not Run**. Class cardinality allows zero options while a session is being drafted; no minimum is implied.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Sample correction review — 2026-10-20

- **Topic 14 (`erd-diagram`): Passed, static artifact presence/semantics only.** `samples/group-06-data-sequence-class.md` now includes a Mermaid `erDiagram` with entities, attributes, and the zero-or-more draft cardinality. Its note points to the separate DBML composite foreign key because the picture does not encode same-session option ownership. Mermaid rendering and DBML generation remain **Not Run**.
- **Topic 16 (`sequence-diagram`): Passed, static path coverage only.** The sequence excerpt now places accepted and rejected results in alternative branches and shows the same-session validation before either outcome. API design, transaction behavior, and actual execution remain unspecified/ **Not Run**.
- **Topic 17 (`class-diagram`): Passed, static typed/member trace only.** The class excerpt now names types and operations and maps each shown operation to a sequence message. This is an exercise contract, not implemented code; diagram rendering and method ownership review remain **Not Run**.
- The previously recorded root SQLite probe still applies only to manually translated DDL semantics (same-session accepted; cross-session and duplicate preference rejected). It does not verify DBML parsing or generated-DDL equivalence.

These narrow results do not establish lesson acceptance, template approval, complete student handoff, or group release.

## Release decision for issue #56

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
