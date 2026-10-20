# Issue #53 — Educational Review & Release Evidence: Git and GitHub Documentation Group (Group 03)

**State:** Evidence complete and awaiting course-owner sign-off.
**Scope:** Group 03 — Git and GitHub documentation (2 Topics: `git-project-docs`, `github-docs-collaboration`).
**Sample Artifact Packet:** [Git and GitHub documentation sample project outputs](samples/group-03-git-github.md).
**Reviewer:** Educational Curriculum Author & Reviewer
**Date:** 2026-10-20

---

## 1. Group Boundary & Scope Reconciliation

- **Group Canonical Slugs:** `git-project-docs` (Topic 05), `github-docs-collaboration` (Topic 06).
- **Scope Integrity:** The complete 58-Topic curriculum boundary is strictly preserved. No Topics were added or removed.
- **Prerequisites Policy:** Prerequisites are educational guidance only; no Topic is locked behind access gates or completion prerequisites.
- **Case Study Policy:** BorrowHub is treated as an explicitly optional case study; the learner's own project is the primary vehicle for practice and self-assessment.
- **Product Name Consistency (DEC-50):** The approved product name is **Ai_agents**. Verified zero occurrences of deprecated brand names (`سلاح العصر`, `MET Academy`) in Group 03 owned files.

---

## 2. Topic-by-Topic Walkthrough & Evidence

### Topic 01 / 05: `git-project-docs`

#### Walkthrough Elements & Verdicts

| Element | Authored Source / Description | Verdict | Walkthrough Details |
| :--- | :--- | :--- | :--- |
| **Lesson Inputs** | Project directory with existing context/requirements (`docs/PROJECT_CONTEXT.md` / `docs/PRD.md`), terminal environment with Git 2.23+. | **Passed** | Verified input requirements in lesson header and prerequisites section. Does not require front-end toolchain or AI agents. |
| **Explanation** | Multi-section Arabic text (RTL) explaining Git rationale for docs, developer identity setup (`git config`), `.git` initialization, `.gitignore` secret protection, staging/commit lifecycle, and non-destructive branching (`git switch -c`). | **Passed** | Explanations are conceptually rigorous, distinguished from code development, and explain *why* Git is vital for architectural docs. |
| **Worked Example** | Title: `حفظ وثائق MVP` (Case study: `learner-project`). Context: `docs/PROJECT_CONTEXT.md` ready with local `.env.local`. Result: ignores secret file before staging, verifies with `git status` and `git diff --cached`, commits docs cleanly. | **Passed** | Follows learner project context. Demonstrates correct handling of secrets before staging. BorrowHub remains explicitly optional. |
| **Practical Steps (Exercise)** | Step 1: Initialize repository and configure `.gitignore` for secrets and build artifacts.<br>Step 2: Inspect diff and staging, commit documentation, create feature branch for docs. | **Passed** | Step 1 output directly supplies the clean local workspace required for Step 2. Commands are modern and verified (`git switch -c`, `git diff --staged`). |
| **Prompt** | PROMPT 04: "GitHub Documentation Setup" (`/prompts/prompt-04-github-documentation-setup`). Mentor prompt instructing AI to structure `README.md` and `docs/` safely without destructive operations. | **Passed** | Available in prompt library; copyable with verified clipboard payload and feedback banner. |
| **Expected Outputs** | `local-repository`: مستودع Git محلي مع `.gitignore` وتاريخ commit مفهوم.<br>`tracked-docs`: وثائق `docs/` و`README.md` محفوظة من دون ملفات أسرار. | **Passed** | Concrete, verifiable artifacts. Concrete targets referenced by rubric criteria. |
| **Objective Questions** | `gitdocs-q-ignore`: Accidental commit of secret then added to `.gitignore` -> Leaked, must rotate secret; `.gitignore` does not rewrite Git history (Option 1).<br>`gitdocs-q-commit`: Where to inspect files prior to commit -> `git diff --cached` with `git status` (Option 0). | **Passed** | Answers, options, and explanations reviewed. Pedagogically sound, single correct answer per question, full rationales provided. |
| **Practical Rubric Criteria** | `gitdocs-r-ignore` (bound to `local-repository`): Secrets check prior to commit.<br>`gitdocs-r-history` (bound to `tracked-docs`): Reviewable commit history. | **Passed** | Criteria bind strictly to declared `outputId`s. Evaluation scale uses approved descriptive levels (`ready-for-review`, `in-progress`, `not-yet`) with no mastery threshold. |

#### Real Sample Output Produced

```gitignore
# .gitignore
.env
.env.local
.env.*.local
*.env
*.key
*.pem
*.token
.DS_Store
Thumbs.db
node_modules/
dist/
build/
```

```bash
$ git status --short
A  .gitignore
A  README.md
A  docs/PROJECT_CONTEXT.md
A  docs/PRD.md

$ git diff --cached --stat
 .gitignore              | 12 ++++++++++++
 README.md               | 35 +++++++++++++++++++++++++++++++++++
 docs/PROJECT_CONTEXT.md | 28 ++++++++++++++++++++++++++++
 docs/PRD.md             | 45 +++++++++++++++++++++++++++++++++++++++++++++
 4 files changed, 120 insertions(+)

$ git log --oneline -1
7f3a91b (HEAD -> main) docs: initialize repository with project context and PRD requirements
```

#### External Video Candidate

- **Candidate Title:** *A brief introduction to Git for beginners*
- **Publisher:** GitHub (Official)
- **URL:** `https://www.youtube.com/watch?v=r8jQ9hVA2qs`
- **Candidate Research Notes:** Search metadata identifies official GitHub publisher; covers Git fundamentals, staging, commits, branches, and Git vs GitHub difference.
- **Review Verdict:** Candidate recorded. Online-only external resource. Playback, captions, accessibility, and course-owner approval remain deferred (DEC-70 Decision 44).

#### Gaps & Corrections

- **Gaps Found:** Playwright test coverage needed end-to-end verification of the interactive learning activities (quiz retries, rubric selection persistence across page reloads in localStorage).
- **Corrections Made:** Expanded `e2e/path/git-github.spec.ts` with comprehensive interactive checks for section rendering, copy buttons, quiz scoring/retries, rubric persistence, RTL/LTR styling integrity, and 390px mobile responsiveness.

---

### Topic 02 / 06: `github-docs-collaboration`

#### Walkthrough Elements & Verdicts

| Element | Authored Source / Description | Verdict | Walkthrough Details |
| :--- | :--- | :--- | :--- |
| **Lesson Inputs** | Clean local Git repository from Topic 05, active GitHub account, SSH key or Personal Access Token (PAT) authentication setup, existing `README.md` and `docs/`. | **Passed** | Prepares learner for cloud collaboration without imposing access locks or paid tools. |
| **Explanation** | Remote repository setup (`git remote add origin`, `git remote -v`), pushing main (`git push -u origin main`), professional `README.md` architecture, GitHub Secret Scanning & Push Protection, and collaborative PR review lifecycle. | **Passed** | Accurate technical distinction between Git (local VCS) and GitHub (cloud collaboration platform). Security practices emphasized. |
| **Worked Example** | Title: `مراجعة PRD قبل الدمج` (Case study: `learner-project`). Context: colleague reviews PRD on feature branch `docs/prd`. Result: peer inspects diff, checks open questions, confirms `.env.local` is excluded, reviews before merge. | **Passed** | Models real engineering pull request workflow for product documentation. |
| **Practical Steps (Exercise)** | Step 1: Create remote repository on GitHub, configure remote, verify branch and push.<br>Step 2: Push documentation branch, open Pull Request with descriptive summary and secret check. | **Passed** | Step 1 output directly enables Step 2. Explicit caution against generating conflicting default files (README/license) on GitHub. |
| **Prompt** | Supplemental Review Prompt: "Documentation Pull Request Review". Instructs senior architect to inspect PRD/SRS in a PR for contradictions, edge cases, leaked tokens, and feasibility. | **Passed** | Included in authored lesson content; copyable with verified clipboard handling. |
| **Expected Outputs** | `remote-repository`: مستودع GitHub بعيد مضبوط وREADME تعريفي يشرح المشروع والوثائق.<br>`review-pull-request`: Pull Request للوثائق يمكن فيه مراجعة diff والأسئلة قبل الدمج. | **Passed** | Defined with clear criteria and direct linkage to practical assessment. |
| **Objective Questions** | `githubdocs-q-pr`: Purpose of PR in documentation -> Requests peer review of branch diff prior to merge into target branch (Option 1).<br>`githubdocs-q-remote`: Check before first push to prevent publishing to wrong destination -> Review `git remote -v`, current branch, and staging (Option 0). | **Passed** | Answers, options, and explanations reviewed. Pedagogically sound, single correct answer per question, full rationales provided. |
| **Practical Rubric Criteria** | `githubdocs-r-remote` (bound to `remote-repository`): Remote destination verified.<br>`githubdocs-r-review` (bound to `review-pull-request`): Collaborative PR review before merge. | **Passed** | Strict outputId binding maintained. Self-assessment scale applies approved 3-level rubric. |

#### Real Sample Output Produced

```markdown
<!-- README.md excerpt -->
# Study-Group Scheduler (Ai_agents Student Project)

> نظام ذكي لتنسيق مواعيد المجموعات الدراسية وحجز القاعات.

## 📌 نبذة عن المشروع
- **المشكلة:** صعوبة تنسيق أوقات الفراغ المشتركة بين طلاب المجموعة الدراسية.
- **المستخدم المستهدف:** طلاب الجامعات ومنسقو الأنشطة الأكاديمية.
- **نطاق النسخة الأولى (MVP):** تسجيل الطلاب، إدخال الأوقات المتاحة، واقتراح أفضل نافذة زمنية.

## 📂 وثائق المشروع المعتمدة
- [سياق المشروع والفكرة](docs/PROJECT_CONTEXT.md)
- [وثيقة متطلبات المنتج (PRD)](docs/PRD.md)
- [مواصفات النظام (SRS)](docs/SRS.md)

## 🛡️ سياسة الأمان والأسرار
- هذا المستودع لا يحتوي على أي مفاتيح أو أسرار حقيقية.
- المتغيرات المطلوبة موضحة في القالب التوضيحي `.env.example`.
```

```markdown
<!-- Pull Request Description excerpt -->
## Purpose
Add initial project documentation: PROJECT_CONTEXT.md, PRD.md, and system requirements.

## Review Checklist for Peer Reviewer
- [x] Does the MVP scope avoid unvalidated assumptions?
- [x] Are all secret files (.env, .env.local) ignored and absent from diff?
- [x] Are links in README.md pointing to valid paths in docs/?
```

#### External Video Candidate

- **Candidate Title:** *GitHub Pull Requests Explained for Beginners - GitHub Foundations*
- **Publisher:** ExamPro
- **URL:** `https://www.youtube.com/watch?v=gBIPCZ0abQY`
- **Candidate Research Notes:** Third-party GitHub Foundations guide covering branch comparison, proposing changes, PR review discussion, and merge policies.
- **Review Verdict:** Candidate recorded. Online-only external resource. Playback, captions, accessibility, and course-owner approval remain deferred (DEC-70 Decision 44).

#### Gaps & Corrections

- **Gaps Found:** Video status in browser reader needed verification that candidate state is honestly disclosed without claiming playback approval or offline availability.
- **Corrections Made:** Browser spec verified that candidate badge (`مرشح — بانتظار المراجعة`), source label (`YouTube`), and online-only notice render accurately.

---

## 3. Verification Gate Outcomes

### Gate 1: Typecheck & Linter (`npm run lint`)
```
> ai-agents@1.0.0 lint
> tsc --noEmit
Result: Exited with code 0.
```

### Gate 2: Content Baseline & Unit Tests (`npx tsx --test src/lib/*.test.ts`)
```
ℹ tests 80
ℹ suites 0
ℹ pass 80
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
Result: Exited with code 0 (all 80 tests passing, baseline hashes intact).
```

### Gate 3: Next.js Production Build (`npm run build`)
```
✓ Compiled successfully
✓ Generating static pages (182/182)
✓ Finalizing page optimization
Result: Exited with code 0.
```

### Gate 4: Playwright Browser Suite (`E2E_SERVER=production E2E_PORT=3203 npx playwright test e2e/path/git-github.spec.ts`)
```
Running 11 tests using 1 worker

[1/11] Sequential Project Path - Ticket 03 (Git & GitHub) › home cards display genuine Git and GitHub metadata without UML/lecture leftovers
[2/11] Sequential Project Path - Ticket 03 (Git & GitHub) › modal reader displays Git topic details, checklist, outputs, and navigation link
[3/11] Sequential Project Path - Ticket 03 (Git & GitHub) › learning page /learn/git-project-docs displays unified complete status, steps, and correct prev/next navigation
[4/11] Sequential Project Path - Ticket 03 (Git & GitHub) › learning page /learn/github-docs-collaboration displays PR review, secrets protection, and navigation
[5/11] Sequential Project Path - Ticket 03 (Git & GitHub) › Topic 05 (/learn/git-project-docs): renders learning sections, practical steps with expected outputs, and copyable bash code
[6/11] Sequential Project Path - Ticket 03 (Git & GitHub) › Topic 05 (/learn/git-project-docs): quiz grades answers, provides explanations, supports unlimited retries and retains attempts
[7/11] Sequential Project Path - Ticket 03 (Git & GitHub) › Topic 05 (/learn/git-project-docs): practical rubric can be edited, reversed, and persists across reload
[8/11] Sequential Project Path - Ticket 03 (Git & GitHub) › Topic 06 (/learn/github-docs-collaboration): renders sections, candidate video status, quiz grading, and rubric persistence
[9/11] Sequential Project Path - Ticket 03 (Git & GitHub) › RTL prose and LTR code styling integrity across Git and GitHub topic pages
[10/11] Sequential Project Path - Ticket 03 (Git & GitHub) › Mobile layout viewport (390px) renders without horizontal overflow for Git and GitHub topics
[11/11] Sequential Project Path - Ticket 03 (Git & GitHub) › copies PROMPT 04 documentation setup prompt with feedback and verified payload

11 passed (44.6s)
Result: Exited with code 0.
```

---

## 4. Unclosed Gaps & External/Shared Observations

1. **Content Model Review State Policy:**
   - As directed by Scope Rule 4a, `reviewState` remains `draft` in the content model (`group-a-03-git-github.ts`).
   - The state transition to `improved` / `approved` will be executed centrally by the orchestrator after independent course-owner review.
2. **Video Approval Status:**
   - Both external video resources remain candidate status (`candidateVideos`), reflecting owner deferral DEC-70 Decision 44. No playback or offline capability is claimed.
3. **Old Product Name Occurrences in Unowned Files:**
   - Scanned repository for legacy brand names (`سلاح العصر`, `MET Academy`).
   - All owned files (`group-a-03-git-github.ts`, `t03-git-github.ts`, `issue53-group-03-review.md`, `git-github.spec.ts`) are 100% clean.
   - For orchestrator awareness, legacy names remain in files owned by other tickets:
     - `src/data/topics/wave2/t05-plantuml-behavior.ts` (lines 414, 559, 821)
     - `src/data/topics/wave2/t09-execution-tools.ts` (line 432)
     - `src/data/topics/wave2/t12-frontend-planning-spec-kit.ts` (line 245)
     - Various documentation files under `docs/` (`WEBSITE_CONTENT_AUDIT.md`, `SEQUENTIAL_PROJECT_LEARNING_SPEC.md`, `WEBSITE_IMPLEMENTATION_PLAN.md`, `CONTENT_RESTRUCTURING_INTERVIEW.md`, `docs/edu-review/ticket-09.md`, `docs/edu-review/ticket-25.md`).

---

## 5. Release Status

**Status:** Evidence complete and awaiting course-owner sign-off.
The educational review and end-to-end verification have been successfully conducted. The group remains in draft/candidate state in the codebase pending central sign-off and state synchronization by the course orchestrator.
