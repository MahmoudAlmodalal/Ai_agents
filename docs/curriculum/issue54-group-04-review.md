# Issue #54 — Release the complete Mermaid, User Flow, and Domain Model group

**Group:** Group 04: Visual Modeling (`group-04-visual-modeling`)  
**Canonical Topics:** `mermaid-syntax` (Topic 07), `user-flow-modeling` (Topic 08), `conceptual-domain-model` (Topic 09)  
**Status:** Static educational review recorded; Group 04 remains draft and is not announced as improved. DEC-70 accepted the common template, boundaries, and assessment policies; this packet does not record a complete-group release sign-off. Individual video approval remains deferred.
**Sample artifact packet:** [Mermaid, User Flow, and Domain Model fictional project outputs](samples/group-04-mermaid-flow-domain.md).  
**Reviewer:** Educational review conducted by Antigravity Pair Programmer / Curriculum Reviewer.  
**Review Date:** 2026-10-20.  
**Course-Owner Acceptance:** Common curriculum policies are accepted in DEC-70; complete-group release acceptance is not recorded here.

---

## 1. Group Boundary and Policy Conformance

- **Canonical scope:** 3 Topics within Group 04: `mermaid-syntax`, `user-flow-modeling`, `conceptual-domain-model`. All 58 canonical curriculum Topics and sequence ordering are strictly preserved.
- **Open access / no prerequisite locks:** Topic 07, Topic 08, and Topic 09 list prerequisites as guidance for learner preparation only (`docs/` structure, PRD, glossary); no prerequisite is enforced as an access gate or modal block.
- **Case study role:** BorrowHub is treated throughout as an **optional case study**; learner exercises and practical evaluations are designed for each learner's own project.
- **Review state policy (Central Orchestrator Contract):** The `reviewState` field in `src/data/learning/group-a-04-visual-modeling.ts` remains untouched as `draft`. Shared builders and hash manifests are not edited.
- **Accepted assessment policies:**
  - Quiz scoring policy: 1 point per correct answer, 0 for incorrect or unanswered, unlimited retries, explanatory feedback after submission, all attempts retained with question and policy versioning.
  - Practical self-assessment policy: 3 descriptive levels (`not-yet`, `in-progress`, `ready-for-review`) with no mastery threshold and no completion claims.
- **Candidate video status:** Videos remain **candidates**. Neither offline availability, player accessibility, caption language, nor course-owner approval is claimed.
- **Product naming (DEC-50):** The product is consistently named **Ai_agents**. Owned files contain zero references to legacy names ("سلاح العصر", "Weapon of the Era", "MET Academy").

---

## 2. Topic-by-Topic Educational Walkthrough and Review Ledger

### Topic 07: `mermaid-syntax` (صيغة Mermaid ومحرك التصيير في المتصفح)

| Element | Authored Content & Walkthrough Scope | Review Verdict | Findings & Notes |
|---|---|---|---|
| **Objectives** | `mermaid-objective-syntax`: كتابة Mermaid صحيحة واختيار نوع الرسم واتجاهه بحسب السؤال.<br/>`mermaid-objective-readable`: عرض الرسم مع عنوان وشرح واتجاه نص مناسبين في ملفات المشروع. | **Passed** | Clear, stable IDs, observable behavioral targets for syntax correctness and documentation clarity. |
| **Inputs / Prerequisites** | Suggested handoff: basic Markdown knowledge and `docs/` folder structure. Stated explicitly that no coding agent, Skill, or MCP setup is needed. | **Passed** | Unfamiliar concepts (Diagrams as Code, local browser SVG rendering) explained in lesson; no access locks. |
| **Explanation** | 5 structured sections: (1) Diagrams as Code philosophy vs. static images; (2) Core syntax and node shapes (box, decision diamond, rounded, stadium, cylinder); (3) Directionality rules: RTL Arabic prose vs. LTR Mermaid code; (4) Local in-browser rendering engine & non-blocking syntax error handling; (5) Mermaid Live Editor preview. | **Passed** | Thorough, accurate, explains the engineering rationale of Git diffable diagrams and local client-side rendering. |
| **Worked Example** | Fictional appointment availability decision (`flowchart TD`) with decision diamond `CheckAuth` and labeled branches. BorrowHub callout explicitly marks BorrowHub as optional. | **Passed** | Fictional example is self-contained and demonstrates branching without introducing unverified business rules. |
| **Practical Steps** | Step 1: Select a small MVP scenario, choose diagram type/direction, author and preview Mermaid.<br/>Step 2: Save in `docs/diagrams/README.md` with Arabic explanation, fixing syntax errors. | **Passed** | Actionable for the learner's own project. Directly prepares diagramming knowledge for Topic 08. |
| **Exercise & Prompts** | Prompts reference `prompt-05-user-flow` and `prompt-06-conceptual-domain-model-not-uml` for downstream diagram creation. Copyable code blocks in lesson. | **Passed** | Copy button functions with `✓ تم النسخ!` visual feedback and verified clipboard contents. |
| **Expected Outputs** | `mermaid-guide` (`docs/diagrams/README.md`) and `mermaid-samples` (Mermaid snippets with explanatory text). | **Passed — static** | Fictional sample deliverables are documented in `samples/group-04-mermaid-flow-domain.md`; diagram rendering is not established by this packet. |
| **Quiz Assessment** | Q1 (`mermaid-q-type`): Start with `flowchart TD` for steps & decisions. Correct option: 0. Explanation verified.<br/>Q2 (`mermaid-q-meaning`): Rendering success does not prove semantic business accuracy against PRD. Correct option: 0. Explanation verified. | **Passed** | 4 options per question, correct single keys, precise educational rationales, unlimited retry support verified. |
| **Rubric & Checklist** | Criteria: `mermaid-r-valid` bound to `mermaid-samples`; `mermaid-r-doc` bound to `mermaid-guide`. 5-item application checklist. | **Passed** | Criteria bind to declared output IDs. Self-assessment ratings and checklist selections persist across reload and support reversal. |
| **Candidate Video** | Title: *How to Create Mermaid Diagrams* (GitLab Unfiltered)<br/>URL: `https://www.youtube.com/watch?v=SQ9QmuTHuSI`<br/>Source: GitLab Unfiltered via Mermaid official tutorials. | **Candidate record only** | The reader displays the candidate badge and online-only notice. The lesson fit, live playback, captions, and accessibility have not been checked; no endorsement or approval is claimed. |

- **Sample Output Walkthrough (`mermaid-syntax`):**
  ```markdown
  # Diagram samples
  Each diagram identifies its question, source requirements, and unresolved rules.
  ```mermaid
  flowchart TD
    Start([Start]) --> Listed{Is the option listed?}
    Listed -->|Yes| Continue[Continue the exercise]
    Listed -->|No| Explain[Explain the mismatch and return to options]
  ```
  ```
- **Gaps & Corrections:** Test assertion for video candidate badge initially looked for `"مرشح للمراجعة"` instead of `"مرشح — بانتظار المراجعة"`. Corrected in `e2e/path/visual-modeling.spec.ts`.

---

### Topic 08: `user-flow-modeling` (نمذجة مسارات تدفق المستخدم)

| Element | Authored Content & Walkthrough Scope | Review Verdict | Findings & Notes |
|---|---|---|---|
| **Objectives** | `userflow-objective-journey`: نمذجة رحلة مستخدم من بدايتها إلى نتيجتها مع نقاط قرار ومساري النجاح والرفض.<br/>`userflow-objective-source`: ربط كل خطوة وسلوك بدور ومصدر PRD دون توسيع النطاق. | **Passed** | Addresses both behavioral flow mapping and strict traceability to requirements without scope creep. |
| **Inputs / Prerequisites** | PRD document (`docs/PRD.md`) and basic Mermaid flowchart knowledge from Topic 07. Prerequisites are educational recommendations, not access blockers. | **Passed** | Clear distinction between PRD (what/why), User Flow (steps/decisions), and UI Wireframes (visual appearance). |
| **Explanation** | Anatomy of complete User Flow: Entry state, user actions, system responses, decision points, happy path, failure/exception paths. Detailed analysis of rule enforcement. | **Passed** | Solid emphasis on preventing unverified business rules from being invented during diagramming. |
| **Worked Example** | BorrowHub equipment loan flow: Browse -> SelectItem -> CheckAuth -> CheckStock -> CheckActiveLoans -> SubmitRequest -> PendingReview -> AdminDecision -> ApprovedReady / Rejection. Callout explicitly notes BorrowHub is optional. | **Passed** | Full branch coverage: Happy Path to Handover/ActiveLoan; 4 documented failure exits (`ExitAuth`, `ExitStock`, `ExitLimit`, `ExitReject`). |
| **Practical Steps** | Step 1: Select one scoped MVP scenario, model entry to observable exit including failure paths in `docs/user-flow.md`.<br/>Step 2: Cross-check every node and edge against PRD; log unsupported behaviors as open questions. | **Passed** | Concrete expected outputs supply the basis for subsequent conceptual domain modeling and UX blueprinting. |
| **Exercise & Prompts** | `PROMPT 05 — User Flow`: Senior UX Designer persona, reading `docs/PRD.md`, generating `flowchart TD` with decision points, no invented rules. | **Passed** | Embedded copyable prompt box with copy button; verified in browser test suite. |
| **Expected Outputs** | `user-flow-doc` (`docs/user-flow.md`) and `user-flow-diagram` (`flowchart TD` diagram covering MVP happy and failure paths). | **Passed — static** | A fictional sample with a requirements trace table is documented in `samples/group-04-mermaid-flow-domain.md`; rendering and owner validation are not established. |
| **Quiz Assessment** | Q1 (`userflow-q-actor`): Admin confirms handover in the real world when PRD assigns that role. Correct option: 1. Explanation verified.<br/>Q2 (`userflow-q-source`): Unverified rules found in diagrams must be removed or logged as open questions. Correct option: 1. Explanation verified. | **Passed** | Questions reinforce core engineering discipline. Clear educational explanations. |
| **Rubric & Checklist** | Criteria: `userflow-r-coverage` bound to `user-flow-diagram`; `userflow-r-source` bound to `user-flow-doc`. 5-item application checklist. | **Passed** | Output bindings verified. Descriptive 3-level rating scale functions without completion/mastery inference. |
| **Candidate Video** | Title: *User Journeys vs. User Flows (And When to Use Each)*<br/>URL: `https://www.nngroup.com/videos/user-journeys-vs-user-flows/?lm=journey-mapping-ux-practitioners&pt=article`<br/>Source: Nielsen Norman Group (NN/g). | **Candidate record only** | The title suggests a topic match; duration and instructional fit are unverified because the video was not played. Captions, accessibility, and approval are also pending human review. |

- **Sample Output Walkthrough (`user-flow-modeling`):**
  ```mermaid
  flowchart TD
    Start([Start]) --> Setup[Organizer sets up three options FR-001]
    Setup --> Open{Can the participant open the session?}
    Open -->|No: FR-006| NoSession[Explain session cannot be opened]
    Open -->|Yes| Options[Participant views listed options FR-002]
    Options --> Submit[Participant submits one option]
    Submit --> Listed{Option belongs to this session?}
    Listed -->|No: FR-005| Invalid[Explain mismatch]
    Invalid --> Options
    Listed -->|Yes| Save[Save preference BR-001]
    Save --> Review[Organizer reviews responses FR-003]
    Review --> Tie{Do response counts tie?}
    Tie -->|Yes: Q-02| TieOpen[Owner decision required]
    Tie -->|No| Select[Organizer selects one listed option FR-003]
    Select --> Result[Result identifies selected option FR-004]
  ```
- **Gaps & Corrections:** Tie resolution intentionally modeled as an open decision node (`TieOpen: Q-02`) rather than inventing an unverified tie-breaker rule.

---

### Topic 09: `conceptual-domain-model` (النموذج المفاهيمي لمجال العمل)

| Element | Authored Content & Walkthrough Scope | Review Verdict | Findings & Notes |
|---|---|---|---|
| **Objectives** | `domain-objective-concepts`: استخراج مفاهيم العمل وحدودها وعلاقاتها من متطلبات المشروع.<br/>`domain-objective-language`: شرح النموذج بلغة المجال دون خلط المفهوم بجدول قاعدة بيانات أو كلاس. | **Passed** | Clear separation between business problem domain and technical solution/storage details. |
| **Inputs / Prerequisites** | PRD (`docs/PRD.md`), User Flows (`docs/user-flow.md`), and project glossary. No access locks. | **Passed** | Prerequisites guide learners to extract concepts from previous outputs without gatekeeping. |
| **Explanation** | Focuses on the Problem Space vs. Solution Space. Outlines the "Three Strict Boundaries" (المحظورات الثلاثة الإلزامية): No DB keys (PK/FK), No SQL data types, No programming methods/functions. Includes comparative matrix: Domain Model vs. ERD vs. Class Diagram. | **Passed** | Educationally critical distinction that prevents junior developers from jumping prematurely to database tables or OOP classes. |
| **Worked Example** | BorrowHub domain model using `flowchart LR` with subgraphs (`Users_Domain`, `Inventory_Domain`, `Loan_Domain`) and business-labeled edges. Callout marks BorrowHub as optional. | **Passed** | Purely conceptual; verified zero PK/FK, zero SQL types, zero programming methods. |
| **Practical Steps** | Step 1: Extract concepts and define business responsibilities in `docs/diagrams/domain-model.md`.<br/>Step 2: Draw concepts in `docs/diagrams/domain-model.mmd` using `flowchart LR` and review boundaries with domain owner. | **Passed** | Practical outputs provide clean input for downstream DB modeling (Topic 14 ERD & DBML). |
| **Exercise & Prompts** | `PROMPT 06 — Conceptual Domain Model (not UML)`: Senior Domain Analyst persona, reads PRD and User Flow, outputs `flowchart LR` with business boundaries and Arabic explanation. | **Passed** | Copyable prompt container verified; clipboard test passed. |
| **Expected Outputs** | `domain-model-doc` (`docs/diagrams/domain-model.md`) and `domain-model-diagram` (`docs/diagrams/domain-model.mmd`). | **Passed — static** | A fictional sample is documented in `samples/group-04-mermaid-flow-domain.md`; it is not a learner artifact or owner-approved model. |
| **Quiz Assessment** | Q1 (`domain-q-level`): Conceptual question asks business meaning and relationships before database schema design. Correct option: 0. Explanation verified.<br/>Q2 (`domain-q-relationship`): Unspecified cardinality must remain an open decision, not assumed as many-to-many. Correct option: 1. Explanation verified. | **Passed** | Sound questions testing conceptual level boundaries and requirements integrity. |
| **Rubric & Checklist** | Criteria: `domain-r-definitions` bound to `domain-model-doc`; `domain-r-boundary` bound to `domain-model-diagram`. 5-item application checklist. | **Passed** | Both criteria strictly bound to declared output IDs. Self-assessment persistence and reversal verified. |
| **Candidate Video** | Title: *Week 2: Lecture 10 — How to start creating a software conceptual design*<br/>URL: `https://www.youtube.com/watch?v=UMUxxW7MzkE`<br/>Source: NPTEL / IIT Bombay, Software Conceptual Design course. | **Candidate record only** | Publisher/title metadata is recorded. Lesson fit, playback, captions, accessibility, and language suitability have not been checked by a human. |

- **Sample Output Walkthrough (`conceptual-domain-model`):**
  ```mermaid
  flowchart LR
    Organizer[Organizer] -->|coordinates| StudySession[Study session]
    StudySession -->|offers candidate times| TimeOption[Time option]
    Participant[Participant] -->|records a choice| Preference[Preference]
    Preference -->|refers to| StudySession
    Preference -->|names| TimeOption
  ```
- **Gaps & Corrections:** Verified that relationship labels are business actions ("coordinates", "offers candidate times", "records a choice") without database foreign keys or cardinalities.

---

## 3. Browser Suite Verification Record

The browser test suite `e2e/path/visual-modeling.spec.ts` has an earlier author-reported run on port 3204 against a production build. The results below are historical and were not repeated in this static review; application reader coverage does not establish that the fictional sample diagrams render correctly.

```bash
E2E_SERVER=production E2E_PORT=3204 npx playwright test e2e/path/visual-modeling.spec.ts
```

### Test Outcomes (11 Passed, 0 Failed, 0 Skipped):

1. **`Topic 07 (Mermaid Syntax): Displays LTR code, RTL explanations, copy button, and valid renderer` (Passed)**
   - Verifies header, category pill, RTL document direction, LTR `.code-container`, copy button, and Mermaid Live reference.
2. **`Topic 08 (User Flow): Models success and failure paths with decision points tied to PRD` (Passed)**
   - Verifies PROMPT 05, decision points (`CheckAuth`, `CheckActiveLoans`, `CheckStock`, `AdminDecision`), Rule 3 PRD citation, happy path handover, and 4 failure exits.
3. **`Topic 09 (Domain Model): Strictly conceptual without DB keys, SQL types, or functions` (Passed)**
   - Verifies PROMPT 06, `flowchart LR` format, zero PK/FK, zero SQL types, zero programming methods, business concept nodes, and labeled relationships.
4. **`Modal Reader and MermaidViewer: Renders diagrams smoothly and switches perspectives` (Passed)**
   - Verifies home card preview modal, SVG rendering without error, perspective switcher button, and raw syntax toggle.
5. **`Sequential Navigation Bounds: Topics 07, 08, 09 connect smoothly in sequence` (Passed)**
   - Verifies continuous bi-directional navigation: Topic 07 -> Topic 08 -> Topic 09 -> Topic 08 -> Topic 07.
6. **`All Group 04 Topics render learning objectives, core sections, practical steps with expected outputs, and candidate videos` (Passed)**
   - Verifies learning activities container, objectives, 3 core sections, practical steps with expected outputs, worked examples, and candidate video blocks across Topics 07, 08, and 09.
7. **`Practical steps and code snippets are copyable with visual confirmation across all Group 04 topics` (Passed)**
   - Verifies real clipboard interaction and `✓ تم النسخ!` confirmation on Topic 07 code block, Topic 08 PROMPT 05, and Topic 09 PROMPT 06.
8. **`Objective quiz grades answers, provides explanations, supports retries, and persists score across reload` (Passed)**
   - Verifies partial scoring (1/2), feedback with rationale explanations, retry button, perfect score (2/2), retry counter in history, and score persistence across page reload.
9. **`Application checklist and practical rubric criteria support editing, reversal, and survive page reload` (Passed)**
   - Verifies checklist item checking, reload persistence, reversal unchecking, rubric criteria level selection (`ready-for-review`, `in-progress`), reload persistence, and reversal to `not-yet` and empty selection.
10. **`Bidirectional layout integrity: RTL prose with LTR code containers across the group` (Passed)**
    - Verifies root `html[dir="rtl"]`, Arabic article prose direction, and strict `dir="ltr"` on all code containers across all three topics.
11. **`Mobile viewport (390px) responsiveness without horizontal overflow across all Group 04 topics` (Passed)**
    - Evaluates `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2` on viewport `{ width: 390, height: 844 }` for all three topics. Confirmed zero horizontal scrolling or clipping.

---

## 4. Gaps and Corrections Summary

1. **Candidate Video Status Wording:**
   - *Observation:* The component `ExternalVideoResource.tsx` renders the status badge as `'مرشح — بانتظار المراجعة'`.
   - *Correction:* Updated test expectation in `e2e/path/visual-modeling.spec.ts` from `"مرشح للمراجعة"` to `"مرشح — بانتظار المراجعة"`.
2. **Quiz Radio Button Regex with Inline Backticks:**
   - *Observation:* Option 1 of Question 1 includes backticks: `` `flowchart TD` مع عقدة قرار ومسارين مسميين ``. Regex `/flowchart TD مع عقدة قرار/` failed because `TD` is followed by a closing backtick before the space.
   - *Correction:* Replaced with `/مع عقدة قرار ومسارين/` in `e2e/path/visual-modeling.spec.ts`, allowing clean, unambiguous matching.
3. **Rubric Heading and Declared Output String Matching:**
   - *Observation:* The practical assessment title is `'مراجعة ذاتية لمخرجات التمرين'` and output description includes backticks `` `docs/diagrams/README.md` ``.
   - *Correction:* Targeted heading `'مراجعة ذاتية لمخرجات التمرين'` and included backticks in expected output text.
4. **Strict Mode Multi-match on Score and Version Labels:**
   - *Observation:* Multiple DOM nodes contain score strings ("نتيجة معاينة فحص ذاتي: X / Y" vs. "آخر نتيجة محفوظة: X / Y") and version strings ("نسخة الاختبار 1").
   - *Correction:* Specified exact text patterns and used `.first()` on version labels to avoid Playwright strict mode violations.
5. **Product Name Consistency (DEC-50):**
   - Verified owned files (`group-a-04-visual-modeling.ts`, `t04-visual-modeling.ts`, `issue54-group-04-review.md`, `visual-modeling.spec.ts`) contain zero legacy references. Found legacy references in unowned files (`t05`, `t09`, `t12`) and reported them in the final report.

---

## 5. Group Release Recommendation

**Release status for Issue #54:** Group 04 (`mermaid-syntax`, `user-flow-modeling`, `conceptual-domain-model`) remains **draft; not announced as improved**. The static lesson/sample review and author-reported reader tests do not approve the three candidate videos or establish rendered diagram output. Per-video human decisions, independent complete-group verification, and explicit owner sign-off remain outstanding.

## 6. Independent Educational Review Update — 2026-10-20

This static review checked the authored objectives, diagram purposes, source links, and handoffs in Topics 07–09. It did not render the sample Mermaid diagrams, run a learner workflow, or review external video playback. The browser results above are historical author reports, not outcomes of this review.

| Topic or handoff | Status | Finding and remaining evidence |
|---|---|---|
| Topic 07 `mermaid-syntax` | **Pass — static** | Introduces diagram-as-code and provides type/direction and source-documentation guidance. The fictional syntax example and sample packet were not parsed or rendered in this review. |
| Topic 07 → Topic 08 | **Pass — documented artifact shape** | Topic 07's Mermaid syntax guidance is used by the user-flow lesson; there is no completion gate. |
| Topic 08 `user-flow-modeling` | **Pass — static** | The fictional flow includes an entry, decision points, success/failure branches, and PRD trace labels. Tie handling remains open; the scenario is not owner-validated and rendering was not run. |
| Topic 08 → Topic 09 | **Pass — documented artifact shape** | The flow provides business actions and concepts that can inform a conceptual model, while unsupported behavior remains an open question. |
| Topic 09 `conceptual-domain-model` | **Pass — static** | The sample uses business concepts and relationship labels, keeping database keys, SQL types, and programming operations out of this conceptual artifact. Rendering and domain-owner validation remain outstanding. |
| Candidate videos | **Not reviewed** | All three records remain candidates pending human review of playback, captions, accessibility, and lesson fit under DEC-70. |
