# Issue #58 — Release the complete Stitch, design systems, and prototypes group

**State:** Draft authoring and evidence packet. Group 08 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [Stitch, design systems, and prototypes fictional project outputs](samples/group-08-stitch-design-prototype.md).
**Proposed boundary:** 3 Topics in Stitch, design systems, and prototypes. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `stitch-reference-screen`

- **Suggested input / handoff:** A screen brief linked to the screen inventory; use Stitch if available or record the manual fallback.
- **Objectives:** صياغة برومبت لشاشة مرجعية واحدة تمثل المهمة والهوية والاتجاه. / توثيق ما اعتمد وما بقي غير معروف دون اختلاق مواصفات التصميم.
- **Authored learning path:** المدخل: شاشة ممثلة لا كل التطبيق → برومبت يحافظ على الدليل → توثيق الحالة. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `stitch-prompt` — `docs/STITCH_MASTER_PROMPT.md` برومبت مصدره متطلبات شاشة محددة.; `reference-screen` — شاشة في Stitch عند إنشائها، ورابط وحالة مراجعتها الفعلية.
- **Assessment draft:** questions `stitchref-q-unknown`, `stitchref-q-reference` (two four-option questions with keyed rationales); criteria `stitchref-r-scope` → `stitch-prompt`, `stitchref-r-evidence` → `reference-screen`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يطلب البرومبت ترتيباً من اليمين لليسار وحقولاً مسماة وملاحظات استجابة، ويترك قيمة اللون UNKNOWN حتى تأتي من دليل هوية معتمد. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [From idea to app: Introducing Stitch, a new way to design UIs](https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/). Google Developers: an introduction to Stitch’s prompt/image-to-UI workflow, suitable as a dated tool-orientation candidate for the reference-screen exercise. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `design-system-rules`

- **Suggested input / handoff:** A real inspected reference screen or design artifact; mark unsupported values `UNKNOWN`.
- **Objectives:** استخراج قواعد ورموز تصميم من الشاشة المرجعية المعتمدة. / إنشاء برومبتات مستقلة للشاشات تستخدم النظام نفسه ولا تخترع قيماً.
- **Authored learning path:** المدخل: دليل معتمد قابل للفحص → نظام تصميم مصدره واضح → برومبتات الشاشات. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `screen-prompts` — `docs/STITCH_SCREEN_PROMPTS.md` برومبت لكل شاشة مرتبط بمهمتها.; `design-system-evidence` — شاشات أو قيود مرئية في Stitch مع توكنز ومصادرها.
- **Assessment draft:** questions `designrules-q-token`, `designrules-q-prompts` (two four-option questions with keyed rationales); criteria `designrules-r-source` → `screen-prompts`, `designrules-r-consistency` → `design-system-evidence`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يسجل التوثيق القيمة إذا ظهرت في Stitch/inspect مع المصدر؛ وإذا لم يمكن فحصها يسجل UNKNOWN، ثم يطلب البرومبت إعادة استعمال الرمز المؤكد لا اختراع قيمة أخرى. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Lesson 1: Welcome to design systems](https://help.figma.com/hc/en-us/articles/14552802134807-Lesson-1-Welcome-to-design-systems). Figma Learn: a video lesson candidate introducing design-system parts and the rationale for reusable patterns. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `interactive-prototype`

- **Suggested input / handoff:** Reference screens, supported transitions, and named states; a static collection does not count as a prototype.
- **Objectives:** ربط شاشات النموذج بتفاعلات حقيقية تمثل الرحلات المعتمدة. / تدقيق المسارات السعيدة والفاشلة والعودة والصلاحيات في النموذج.
- **Authored learning path:** المدخل: شاشات وقرار تفاعل → الروابط والأزرار → تدقيق يحدد حدوده. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `prototype` — Prototype في Stitch يربط الشاشات بخطوات وتفاعلات.; `prototype-audit` — `docs/PROTOTYPE_JOURNEYS_AUDIT.md` نتائج فحص الرحلات والحالات.
- **Assessment draft:** questions `prototype-q-functional`, `prototype-q-audit` (two four-option questions with keyed rationales); criteria `prototype-r-interaction` → `prototype`, `prototype-r-audit` → `prototype-audit`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يتحرك النموذج من النموذج إلى ملخص الطلب ثم شاشة الرفض مع سبب ظاهر إذا كانت هذه الشاشات جزءاً من المرجع. لا يوحي النموذج بأن الاتصال أو الحفظ الفعلي قد نُفذ. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [FD4B: Prototyping fundamentals](https://help.figma.com/hc/en-us/articles/31010011820311-FD4B-Prototyping-fundamentals). Figma Learn: a prototyping video candidate covering screen flows, interactions, and ways to present/test prototypes. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Sample correction review — 2026-10-20

- **Topic 22 (`design-system-rules`): Passed, static prompt coverage only.** `samples/group-08-stitch-design-prototype.md` now contains `docs/STITCH_SCREEN_PROMPTS.md` with one prompt for each of the two exercise-inventory screens. Both prompts use only evidence-backed tokens; primary color, font, and spacing remain `UNKNOWN` because there is no inspected reference screen. No Stitch screen was generated or inspected, no token is approved, and visual consistency is **Not Run**.

This narrow result does not establish lesson acceptance, template approval, complete student handoff, or group release.

## Release decision for issue #58

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
