# Issue #53 — Release the complete Git and GitHub documentation group

**State:** Draft authoring and evidence packet. Group 03 and template approval remain pending; no improved release is claimed.
**Sample artifact packet:** [Git and GitHub documentation fictional project outputs](samples/group-03-git-github.md).
**Proposed boundary:** 2 Topics in Git and GitHub documentation. Membership is read from the proposed roadmap; it has not been owner-approved.

The existing reader content remains available for every canonical Topic. This supplement adds learning records keyed by those stable slugs. It does not change the roadmap’s proposed state or impose prerequisites as access locks. BorrowHub examples are explicitly optional.

## Member-by-member draft and handoff evidence

### `git-project-docs`

- **Suggested input / handoff:** A project of the learner’s choice and its existing context/requirements documents; the lesson creates a local docs repository.
- **Objectives:** تهيئة Git لحفظ وثائق المشروع في تغييرات صغيرة ذات رسائل قابلة للفهم. / فحص ما سيدخل إلى commit وحماية الملفات المحلية والسرية قبل نشر المستودع.
- **Authored learning path:** المدخل: ملفات المشروع قبل أول حفظ → من مساحة العمل إلى commit → نطاق السر. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `local-repository` — مستودع Git محلي مع `.gitignore` وتاريخ commit مفهوم.; `tracked-docs` — وثائق `docs/` و`README.md` محفوظة من دون ملفات أسرار.
- **Assessment draft:** questions `gitdocs-q-ignore`, `gitdocs-q-commit` (two four-option questions with keyed rationales); criteria `gitdocs-r-ignore` → `local-repository`, `gitdocs-r-history` → `tracked-docs`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** تضاف قاعدة تجاهل `.env.local` قبل stage؛ يفحص المتعلم `git status` و`git diff --cached` ثم يحفظ ملف السياق. لا يرفع المفتاح إلى commit ولا يظن أن تجاهله لاحقاً يمحو تاريخاً سابقاً. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [A brief introduction to Git for beginners](https://www.youtube.com/watch?v=r8jQ9hVA2qs). GitHub: a fundamentals refresher for staging, commits, branches, and the difference between Git and GitHub before organizing project documentation. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

### `github-docs-collaboration`

- **Suggested input / handoff:** Suggested handoff from the local Git documentation repository, README, and commits; no GitHub account or completion gate is imposed.
- **Objectives:** ربط المستودع المحلي بمستودع GitHub بعيد مع التحقق من الفرع والوجهة. / استخدام Pull Request لمراجعة وثائق واضحة وفحص الأسرار قبل النشر.
- **Authored learning path:** المدخل: تاريخ محلي نظيف → المستودع البعيد وPull Request → النشر مسؤولية منفصلة. The section bodies, two Practical Steps, example, quiz and rubric are stored in `src/data/learning/group-a-rest.ts`.
- **Learner outputs:** `remote-repository` — مستودع GitHub بعيد مضبوط وREADME تعريفي يشرح المشروع والوثائق.; `review-pull-request` — Pull Request للوثائق يمكن فيه مراجعة diff والأسئلة قبل الدمج.
- **Assessment draft:** questions `githubdocs-q-pr`, `githubdocs-q-remote` (two four-option questions with keyed rationales); criteria `githubdocs-r-remote` → `remote-repository`, `githubdocs-r-review` → `review-pull-request`. Root independently reviewed the two keyed answers/rationales and two artifact-bound criteria named above on 2026-10-20; those narrow items passed. The scoring and self-assessment policy approvals remain proposed.
- **Worked-example excerpt:** يفتح PR من `docs/prd` إلى الفرع المتفق عليه، ويلخص مصدر المتطلبات والأسئلة المفتوحة. يراجع الزميل diff ولا يطلب نشر `.env.local`. (fictional/example reasoning; not an executed learner artifact or independent verification).
- **External-video candidate:** [GitHub Pull Requests Explained for Beginners - GitHub Foundations](https://www.youtube.com/watch?v=gBIPCZ0abQY). ExamPro: a third-party GitHub Foundations lesson on proposing, comparing, reviewing, discussing, and merging changes. This is not published by GitHub; it is a candidate for the PR review handoff only. Current availability, playback, captions/transcript language, accessibility and owner approval remain unverified.

## Template, sample-output, and review record

- Objective, input/prerequisite, explanation, example, two Practical Steps with expected outputs, exercise, assessment and optional-resource mapping is present in the source lesson and the per-topic draft supplement. The complete lesson template and boundary are still proposals; the owner has not accepted them.
- Paths such as `docs/PRD.md` and `docs/diagrams/*.mmd` above are learner output targets, not downloadable templates shipped by this packet. Source lessons contain their existing prompts/checklists/examples; a full reader walkthrough must confirm each embedded resource is findable and sufficient. Any missing mandatory template or external document remains a release gap.
- Worked-example excerpts above are the authored sample outputs for review. They are clearly fictional or illustrative. Tool-based artifacts (Stitch/MCP/AI Studio/GitHub) have not been executed; no connection, hosted repository, player, or generated design is claimed.
- Question and criterion IDs are stable within their Topic and versioned at 1. Each criterion keeps its semantic `outputId`, so output reordering cannot silently change its evidence target. All question/rubric approvals remain `proposed`; self-assessment has no mastery threshold.
- The data coverage/assessment consistency unit tests pass. Full reader/preview browser journeys, assessment persistence, copying, RTL/LTR, keyboard, mobile, and representative diagrams for this group have **Not Run** in this worktree.
- Video discovery records identify title, candidate URL, source page, and narrow topic fit. They are not direct playback/caption/accessibility checks. Every item remains `availability: candidate` and proposed approval.
- **Narrow independent review — root, 2026-10-20: Passed** for the exact question answer keys/rationales and artifact-bound criteria listed above. These outcomes are recorded on each question and criterion. Full-lesson walkthrough, sample-output verification beyond the cited examples, template acceptance, quiz/rubric policy approval, video playback/captions/accessibility, browser journey, and course-owner acceptance remain **Not Run/Pending**; lesson-, quiz-, and assessment-level review evidence remains `not-run`.

## Release decision for issue #53

**Not complete / not improved.** Required owner approval of group membership/template and assessment/video policies, independent educational walkthrough, direct video checks, sample-output and artifact handoff review, and browser journey verification are outstanding. No roadmap gate has been changed.
