# Issue #57 — Release the complete UI/UX planning group

**State:** Draft authoring and evidence packet. Group 07 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [UI/UX planning fictional project outputs](samples/group-07-ui-ux.md).
**Proposed boundary:** 3 Topics in UI/UX planning. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `ui-ux-roles-navigation`

- **Suggested input / handoff:** Confirmed roles, tasks, permissions, and requirements; mark role assumptions for review.
- **Objectives:** تحويل أدوار PRD وصلاحياتهم إلى احتياجات وواجهات وتنقل واضح. / صياغة متطلبات تجربة المستخدم دون إضافة أدوار أو ميزات خارج النطاق.
- **Authored learning path:** المدخل: دور ومهمة وصلاحية → المعلومات والتنقل → مصفوفة قبل رسم الواجهة. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `uiux-requirements` — `docs/UI_UX_REQUIREMENTS.md` أدوار ومهام وتنقل بمصادر.; `role-ui-matrix` — مصفوفة الأدوار توضح الرؤية والإجراء والصلاحية.
- **Assessment draft:** questions `uiux-q-role`, `uiux-q-navigation` (two four-option questions with keyed rationales); criteria `uiux-r-permission` → `role-ui-matrix`, `uiux-r-navigation` → `uiux-requirements`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** BorrowHub is optional. الطالب يتابع طلبه، والمسؤول يراجعه ويسجل التسليم والإرجاع. لا يظهر إجراء مسؤول المعمل للطالب لمجرد أنه يستطيع فتح الصفحة. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Information Architecture: 3 Key Models](https://www.nngroup.com/videos/information-architecture-models/?lm=apples-flatland-aesthetic-part-1&pt=article). Nielsen Norman Group: a compact comparison of navigation, taxonomy, and overall information architecture to support role-aware navigation planning. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `ux-blueprint`

- **Suggested input / handoff:** A user journey and service touchpoints from the learner’s project; BorrowHub remains an optional example.
- **Objectives:** توثيق الرحلات وخريطة الموقع وحالات الواجهة الأربع الأساسية. / مراجعة الاستجابة وإمكانية الوصول كفحصين عابرين للحالات.
- **Authored learning path:** المدخل: مهمة ونقاط تلامس → أربع حالات واجهة وفحصان عابران → التحقق. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `ux-blueprint` — `docs/UX_BLUEPRINT.md` يشرح الرحلة وخريطة الموقع.; `states-matrix` — مصفوفة لأربع حالات واجهة وفحصي الاستجابة وإمكانية الوصول.
- **Assessment draft:** questions `uxbp-q-empty`, `uxbp-q-a11y` (two four-option questions with keyed rationales); criteria `uxbp-r-states` → `states-matrix`, `uxbp-r-journey` → `ux-blueprint`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** حالة الفراغ تشرح ما الذي يظهر الآن وتتيح العودة للمهمة أو تعديل البحث؛ لا تعرض خطأ تقنياً ولا تدعي أن النظام تعطل. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Service Blueprinting FAQ](https://www.nngroup.com/videos/service-blueprinting-faq/). Nielsen Norman Group: a service-blueprint explanation candidate for separating visible touchpoints from backstage people and systems. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `screen-inventory`

- **Suggested input / handoff:** A selected user journey, role permissions, blueprint, and required states; unknown fields remain open.
- **Objectives:** جرد شاشات النطاق بربط كل شاشة بهدف ودور وبيانات وأفعال وحالات. / التحقق من تغطية المتطلبات دون إضافة شاشة لا تسندها الرحلة.
- **Authored learning path:** المدخل: رحلة ومتطلبات → حقول الجرد → تغطية من وإلى المتطلب. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `screen-inventory` — `docs/SCREEN_INVENTORY.md` يضم جدول الشاشات بالحقول المطلوبة.; `screen-traceability` — مصفوفة تربط الشاشات بمتطلبات PRD وتظهر أي نقص.
- **Assessment draft:** questions `inventory-q-coverage`, `inventory-q-fields` (two four-option questions with keyed rationales); criteria `inventory-r-detail` → `screen-inventory`, `inventory-r-trace` → `screen-traceability`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يصف الجرد الهدف والدور والبيانات المطلوبة وإجراء قبول/رفض والنتيجة، مع ربطها بالمتطلب. لا يضيف لوحة إحصاءات ما لم يطلبها النطاق. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Wireflows 101](https://www.nngroup.com/videos/wireflows-101/?lm=tips-for-new-prototypers&pt=youtubevideo). Nielsen Norman Group: a wireflow candidate for connecting screen layouts, actions, and transitions. Adjacent to, but not a complete screen-inventory method. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Sample correction review — 2026-10-20

- **Topic 19 (`ux-blueprint`): Passed, static artifact coverage only.** `samples/group-07-ui-ux.md` supplies `docs/UX_STATES_MATRIX.md` with loading, empty, error, and success UI-state rows plus separate responsive and accessibility cross-cutting checks. Responsive, keyboard, contrast, screen-reader, and direction checks are **Not Run**; no interface exists.
- **Topic 20 (`screen-inventory`): Passed, static handoff/trace inspection only.** The inventory now includes path, role/permission, goal, components, data, actions/validation, error/state coverage, and requirement source. A bidirectional placeholder trace identifies unresolved privacy/authentication/notification gaps instead of inventing screens. IDs and routes are exercise placeholders, not approved PRD requirements or implemented routes.

These narrow results do not establish lesson acceptance, template approval, complete student handoff, or group release.

## Release decision for issue #57

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
