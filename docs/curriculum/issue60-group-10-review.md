# Issue #60 — Release the complete Stitch MCP and design documentation group

**State:** Draft authoring and evidence packet. Group 10 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [Stitch MCP and design documentation fictional project outputs](samples/group-10-stitch-mcp-design-md.md).
**Proposed boundary:** 2 Topics in Stitch MCP and design documentation. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `stitch-mcp-integration`

- **Suggested input / handoff:** A Stitch reference and MCP-capable client configuration; use documented manual export if connection is unavailable.
- **Objectives:** التحقق من اتصال Stitch MCP قراءةً فقط بعد وجود مشروع وشاشة معتمدة. / توفير مسار يدوي عند غياب الاتصال وعدم كشف المفتاح.
- **Authored learning path:** المدخل: أصول تصميم موجودة → ربط القراءة بأمان → بديل يدوي كامل. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `stitch-reference` — `docs/STITCH_SCREEN_REFERENCES.md` بيانات شاشة مع مصدر وحالة التحقق.; `stitch-connection` — `docs/mcp/stitch-connection.md` نتيجة الاتصال وخطوات البديل اليدوي.
- **Assessment draft:** questions `stitchmcp-q-scope`, `stitchmcp-q-fallback` (two four-option questions with keyed rationales); criteria `stitchmcp-r-readonly` → `stitch-connection`, `stitchmcp-r-fallback` → `stitch-reference`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يستخدم المتعلم تصدير الشاشة وفحصها يدوياً؛ يسجل الألوان التي يستطيع إثباتها، ويكتب UNKNOWN للباقي، ولا يزعم أن التكامل نجح. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Google Stitch MCP Tutorial: Watch Me Convert a UI Design to Code in VS Code](https://zolotube.com/watch?v=8uz1EMPMm0M). Independent tutorial candidate for connecting a Stitch design to an IDE through MCP and inspecting the resulting code. The official Google Codelab is the authoritative setup reference. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `design-md-spec`

- **Suggested input / handoff:** A screen or inspected design artifact with source evidence for every value; unobserved values stay `UNKNOWN`.
- **Objectives:** كتابة DESIGN.md من هوية وقيم تصميم يمكن تأكيدها في مصادر معتمدة. / ربط كل token بالشاشة والمصدر والثقة وترك غير المتاح مجهولاً.
- **Authored learning path:** المدخل: دليل مصمم أو شاشة → العقد لا التخمين → يفصل الرمز عن المتطلب. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `design-md` — `DESIGN.md` قواعد تصميم مستندة إلى مصادر فعلية.; `design-tokens` — `docs/DESIGN_TOKENS.md` اسم وقيمة ومصدر شاشة وثقة أو UNKNOWN.
- **Assessment draft:** questions `designmd-q-unknown`, `designmd-q-role` (two four-option questions with keyed rationales); criteria `designmd-r-token` → `design-tokens`, `designmd-r-scope` → `design-md`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يكتب DESIGN.md قيمة اللون مع رابط الشاشة واسم token. إذا لم يظهر مصدر القيمة، يحتفظ الجدول بـUNKNOWN ولا يخترع hex. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [Stitch DESIGN.md: portable design system format (Google Labs video)](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/). Google Labs: an embedded video candidate explaining the DESIGN.md format and its use as a portable written design system. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Release decision for issue #60

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
