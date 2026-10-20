# Issue #52 — Release the complete Discovery, PRD, and SRS group

**State:** Draft authoring and evidence packet. Group 02 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [Discovery, PRD, and SRS fictional project outputs](samples/group-02-discovery-prd-srs.md).
**Proposed boundary:** 3 Topics in Discovery, PRD, and SRS. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `discovery-grill-me`

- **Suggested input / handoff:** Suggested handoff from Topic 01: `docs/PROJECT_CONTEXT.md`; the Topic remains open without it and can use another project context.
- **Objectives:** إدارة مقابلة استكشاف متطلبات بسؤال واحد في كل مرة دون أن يخترع الوكيل قواعد. / تسجيل القرارات والافتراضات والأسئلة المفتوحة وربطها بسياق المشروع.
- **Authored learning path:** المدخل: سياق مشروع مؤقت → مقابلة متدرجة → مخرج قابل للتتبع. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `decisions-log` — `docs/DECISIONS_LOG.md` مع مصدر القرار وصاحبه وتاريخه أو حالته.; `open-questions` — قائمة الأسئلة المفتوحة والافتراضات التي تحتاج جواباً أو تحققاً.
- **Assessment draft:** questions `discovery-q-one-at-time`, `discovery-q-decision-log` (two four-option questions with keyed rationales); criteria `discovery-r-trace` → `decisions-log`, `discovery-r-scope` → `open-questions`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** BorrowHub is optional. سؤال المقابلة: “أي حالات للطلب ينبغي أن تدخل ضمن الحد؟” يسجل الجواب كقرار فقط بعد أن يختار صاحب المشروع؛ وإلا يبقى السؤال مفتوحاً. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Introduction to Jira Product Discovery: video](https://community.atlassian.com/forums/discussion/2867261/introduction-to-jira-product-discovery-video). Atlassian: a product-discovery example showing ideas, insights, and prioritization. It is adjacent context, not a demonstration of Grill Me interviewing one question at a time or recording source-backed decisions. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `prd-specification`

- **Suggested input / handoff:** Suggested handoff from Discovery: source-labeled decisions and open questions in `docs/DECISIONS_LOG.md`.
- **Objectives:** تحويل القرارات المعتمدة في سجل الاستكشاف إلى متطلبات دون رفع الافتراض إلى حقيقة. / ترقيم المتطلبات ومراجعة التناقض والنطاق باستخدام شروط يمكن فحصها.
- **Authored learning path:** المدخل: سجل قرار لا ملخص حر → المتطلب القابل للمراجعة → مراجعة النطاق والاتساق. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `prd` — `docs/PRD.md` بالأقسام المرجعية ومعرفات المتطلبات والأولويات والمصادر وحالة الأسئلة.; `prd-review` — `docs/PRD_REVIEW.md` يربط كل ملاحظة أو تصحيح بالمتطلب المعني.
- **Assessment draft:** questions `prd-q-open-rule`, `prd-q-traceable` (two four-option questions with keyed rationales); criteria `prd-r-source` → `prd`, `prd-r-review` → `prd-review`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** BorrowHub is optional. يمكن تسجيل FR لاستعراض عدد الطلبات الحالية إذا أكدها المالك؛ ويبقى تعريف الحالات سؤالاً مفتوحاً بدلاً من وضع شرط “معلّق ومقبول” من عند الكاتب. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Using the Product Requirements blueprint in Confluence](https://www.youtube.com/watch?v=bUL1D7pCfLI). Atlassian: a product-requirements document and template walkthrough that can supplement the Topic’s source, status, and acceptance-criteria work. The learner should still keep uncertain decisions open. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `srs`

- **Suggested input / handoff:** Suggested handoff from PRD: `docs/PRD.md` and its requirement IDs, assumptions, and unresolved questions.
- **Objectives:** تحويل متطلب PRD معتمد إلى شروط سلوك ومدخلات ومخرجات وحالات فشل قابلة للاختبار. / ربط كل بند سلوكي بمتطلب مصدر وتغطية المسارات المتوقعة دون اختراع سياسة.
- **Authored learning path:** المدخل: معرف متطلب ومصدر حاسم → تفصيل السلوك → معيار قبول قابل للتنفيذ. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `srs` — `docs/SRS.md` يحدد السلوك والتحقق والاستجابة والحالات المقبولة والمرفوضة.; `requirements-traceability` — مصفوفة تربط كل سيناريو ومعيار قبول بمعرف متطلب المصدر.
- **Assessment draft:** questions `srs-q-trace-source`, `srs-q-gwt` (two four-option questions with keyed rationales); criteria `srs-r-scenario` → `srs`, `srs-r-trace` → `requirements-traceability`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** BorrowHub is optional. Given حساب معتمد ووحدة متاحة، When يرسل الطالب مدة وسبباً غير فارغين، Then ينشأ طلب للمراجعة. إذا رفض المدخل، يبين SRS أي شرط فشل فقط إذا كان PRD قد حسم هذا السلوك؛ وإلا يسجل سؤالاً. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [SRS: CS445/ECE451 video](https://student.cs.uwaterloo.ca/~cs445/Winter2026/project/srs/index.html). University of Waterloo CS445/ECE451: the page links an SRS video explaining its purpose, content, and format, matching this Topic’s coherent requirements handoff. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Release decision for issue #52

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
