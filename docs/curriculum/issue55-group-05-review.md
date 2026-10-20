# Issue #55 — Educational Review: Group 05 (PlantUML and Behavior Diagrams)

**Group Status:** Evidence complete and awaiting course-owner sign-off.
*Note:* This group is not marked as approved, improved, or accepted in the content model or roadmap. The course owner signs off after independent verification, and the orchestrator applies the central state flip.

**Reviewer:** Educational Pair Reviewer
**Date:** 2026-10-20
**Group Membership:** 4 canonical Topics:
1. Topic 10: `plantuml` (`plantuml-tool`)
2. Topic 11: `use-case-diagram` (`use-case-diagram`)
3. Topic 12: `activity-diagram` (`activity-diagram`)
4. Topic 13: `state-diagram` (`state-diagram`)

**Sample Artifact Packet:** `docs/curriculum/samples/group-05-plantuml-behavior.md`

---

## 1. Member-by-Member Walkthrough & Audit Record

### Topic 10: `plantuml` (أداة ومحرر PlantUML للنمذجة الهندسية ككود)

| Item | Content & Details | Verdict |
|---|---|---|
| **Lesson Inputs** | Introduces UML modeling as code without requiring Java installation; directs learners to live web editors (PlantText, PlantUML Server). Prerequisites (Mermaid 07, engineering modeling) are purely advisory; no access locks. | **Passed** |
| **Explanation** | Clarifies the engineering philosophy of PlantUML (OMG UML Standard compliance), technical contrast table with Mermaid.js (rendering engine, browser vs server, syntax), editor links, and syntax boundaries (`@startuml` / `@enduml`). | **Passed** |
| **Example** | Basic model defining actors and system boundaries (`rectangle`). BorrowHub is explicitly optional; learner applies the tool to their chosen Learner Project. | **Passed** |
| **Exercise** | Create a basic UML diagram in PlantUML matching the project's behavioral modeling needs; test syntax and export capability. | **Passed** |
| **Prompt** | Direct editor and syntax prompts provided; guides learner on `@startuml` envelope and element definitions. | **Passed** |
| **Expected Output** | 1. `docs/diagrams/README-plantuml.md`: Explains editor setup, rendering workflow, and comparison with Mermaid.<br/>2. Valid, copyable PlantUML code sample with explicit `@startuml` and `@enduml`. | **Passed** |
| **Assessment Criteria** | **Quiz Questions:**<br/>- `plantuml-q-boundary`: Identifies `@startuml` and `@enduml` as the core diagram wrapper (Correct: index 1).<br/>- `plantuml-q-render`: Explains that successful syntax rendering does not prove requirement validity or semantic correctness (Correct: index 0).<br/>**Practical Rubric:**<br/>- `plantuml-r-render` (targets `plantuml-sample`): Checks valid syntax wrapper and appropriate diagram type.<br/>- `plantuml-r-guide` (targets `plantuml-guide`): Checks documentation explaining tool choice and verification limits. | **Passed** |

- **Real Sample Output Produced:**
  ```markdown
  # docs/diagrams/README-plantuml.md
  # PlantUML Setup & Tooling Guide
  - Tool: PlantText interactive web editor (https://www.planttext.com/) & PlantUML Server (https://www.plantuml.com/plantuml/uml/).
  - File convention: Source files saved as `docs/diagrams/*.puml` with accompanying Arabic documentation `docs/diagrams/*.md`.
  - Boundary: Syntax correctness verified via renderer; semantic validation requires tracing back to PRD rules.
  ```
  ```plantuml
  @startuml
  left to right direction
  skinparam packageStyle rectangle
  actor "طالب جامعي" as Student
  actor "مسؤول المعمل" as Staff
  rectangle "نظام إدارة العهد والمختبرات" {
    usecase "تصفح كتالوج المعدات" as UC_Browse
    usecase "تقديم طلب استعارة" as UC_Request
    usecase "التحقق من أهلية الحساب" as UC_Verify
    usecase "مراجعة واعتماد الطلب" as UC_Approve
    UC_Request ..> UC_Verify : <<include>>
  }
  Student --> UC_Browse
  Student --> UC_Request
  Staff --> UC_Approve
  @enduml
  ```
- **External Video Candidate:** [PlantUML in Action 001 - Quick Started](https://www.youtube.com/watch?v=znl8VyLi3jA) (Yasenstar).
  - *Candidate Status:* Discovery evidence recorded. Per course owner policy, video remains an unverified candidate; playback, transcript accuracy, captions, and accessibility were NOT verified.
- **Gaps Found:** None in data model. Content matches lesson template.
- **Corrections Made:** None required for Topic 10.

---

### Topic 11: `use-case-diagram` (مخطط حالات الاستخدام - Use Case Diagram)

| Item | Content & Details | Verdict |
|---|---|---|
| **Lesson Inputs** | System boundary, user roles, and feature requirements from `docs/PRD.md` and `docs/user-flow.md`. Prerequisites are advisory. | **Passed** |
| **Explanation** | Details primary, secondary, and automated actors. Enforces strict engineering rules for `<<include>>` (mandatory shared behavior) and `<<extend>>` (conditional behavior at an extension point); warns against functional decomposition anti-pattern. | **Passed** |
| **Example** | BorrowHub loan request review and return with damage reporting. Clearly marked as an educational case study (`BorrowHub مثال اختياري`). | **Passed** |
| **Exercise** | Derive actors and MVP use cases from PRD, enclose system boundary in `rectangle`, model confirmed interactions, and justify any `<<include>>` or `<<extend>>`. | **Passed** |
| **Prompt** | **PROMPT 07 — Use Case Diagram**: Role-based Senior UML Use Case Analyst prompt extracting confirmed MVP actors and permissions, enforcing `include`/`extend` discipline. | **Passed** |
| **Expected Output** | 1. `docs/diagrams/use-case.puml`: Valid PlantUML defining actors, system boundary, and justified relations.<br/>2. `docs/diagrams/use-case.md`: Arabic documentation explaining role permissions, relations, and PRD rule traceability. | **Passed** |
| **Assessment Criteria** | **Quiz Questions:**<br/>- `usecase-q-actor`: Actor is placed outside the system boundary to represent an external interacting role (Correct: index 1).<br/>- `usecase-q-extend`: Justified only when adding conditional or optional behavior to a base case backed by requirements (Correct: index 1).<br/>**Practical Rubric:**<br/>- `usecase-r-boundary` (targets `usecase-puml`): Roles outside boundary, goals inside, linked to functional requirements.<br/>- `usecase-r-relations` (targets `usecase-notes`): Justification for include/extend relationships or explicit omission if not justified. | **Passed** |

- **Real Sample Output Produced:**
  ```plantuml
  @startuml
  left to right direction
  actor Organizer
  actor Participant
  rectangle "Study-group scheduling exercise" {
    usecase "Propose meeting times" as UC1
    usecase "Record one preference" as UC2
    usecase "Review responses" as UC3
    usecase "View selected result\n(viewer unresolved: Q-05)" as UC4
  }
  Organizer --> UC1
  Organizer --> UC3
  Participant --> UC2
  @enduml
  ```
  ```markdown
  # docs/diagrams/use-case.md
  # Use-Case Documentation
  - System Boundary: Study-group scheduling exercise.
  - Roles & Permissions:
    - Organizer: Proposes candidate times (FR-001) and reviews responses/selects meeting time (FR-003).
    - Participant: Submits preference for an active session (FR-002).
  - Deferred & Open Items: UC4 (View selected result) is intentionally unassociated pending product owner decision on Q-05 (viewer role definition).
  ```
- **External Video Candidate:** [UML Use Case Diagram Tutorial](https://lucid.co/diagram/uml/use-case-diagram-tutorial) (Lucid).
  - *Candidate Status:* Discovery evidence recorded. Per course owner policy, video remains an unverified candidate; playback, captions, and accessibility were NOT verified.
- **Gaps Found:** None in data model. Content matches lesson template.
- **Corrections Made:** None required for Topic 11.

---

### Topic 12: `activity-diagram` (مخطط النشاط وسير العمليات - Activity Diagram)

| Item | Content & Details | Verdict |
|---|---|---|
| **Lesson Inputs** | Documented business process scenarios, use cases, and decision logic from `docs/PRD.md` and `docs/user-flow.md`. Prerequisites are advisory. | **Passed** |
| **Explanation** | Explains internal operational logic vs external user flows; models decision nodes, guarded branches (`[condition]`), happy paths, rejection paths, and error recovery in Mermaid `flowchart TD`. | **Passed** |
| **Example** | BorrowHub loan request processing, checking account authentication, 2-loan limit (Rule 3), inventory stock, staff approval, 48-hour pickup deadline (Rule 6), and return inspection without restocking damaged units (Rule 8). Optional case study. | **Passed** |
| **Exercise** | Select a critical business operation in the learner project, identify initial and final nodes, branch conditions with descriptive guards, and document failure/recovery handling. | **Passed** |
| **Prompt** | **PROMPT 08 — Activity Diagram**: Senior Business Process Analyst prompt generating Mermaid `flowchart TD` with explicit actor/system actions, decision gates, and recovery branches. | **Passed** |
| **Expected Output** | 1. `docs/diagrams/activity-diagram.md`: Arabic explanation of process logic, decision gates, and PRD rule references.<br/>2. `docs/diagrams/activity-diagram.mmd`: Valid Mermaid `flowchart TD` diagram covering verified success and failure branches. | **Passed** |
| **Assessment Criteria** | **Quiz Questions:**<br/>- `activity-q-guard`: Clear labeling of decision branches with guards such as `[البيانات صالحة]` and `[غير صالحة]` (Correct: index 0).<br/>- `activity-q-source`: Unconfirmed team suggestions must be recorded as open questions, not assumed as accepted policy (Correct: index 1).<br/>**Practical Rubric:**<br/>- `activity-r-paths` (targets `activity-code`): Covers success, failure, and recovery paths with descriptive guards.<br/>- `activity-r-source` (targets `activity-doc`): Traces every decision condition to PRD/SRS or labels it as an open question. | **Passed** |

- **Real Sample Output Produced:**
  ```mermaid
  flowchart TD
    Start([Participant opens session]) --> Known{Session exists?}
    Known -->|No: FR-006| NoSession[Explain session cannot be opened; do not write]
    Known -->|Yes| Choose[Choose one listed option]
    Choose --> Valid{Does the option belong to this session?}
    Valid -->|Yes: FR-002| Save[Save one preference for alias/session: BR-001]
    Save --> Review[Organizer reviews saved responses: FR-003]
    Review --> Tie{Are counts tied?}
    Tie -->|Yes: Q-02| TieOpen[Wait for owner decision; no winner inferred]
    Tie -->|No| Select[Organizer selects one listed option: FR-003]
    Select --> Done([Result shows selected option: FR-004])
    Valid -->|No: FR-005| Reject[Explain mismatch; do not write]
    Reject --> Choose
  ```
  ```markdown
  # docs/diagrams/activity-diagram.md
  # Operational Activity Logic
  - Process: Participant preference submission and organizer selection.
  - Decision Gates:
    1. Session validation (FR-006): Invalid sessions abort with explanation without persisting state.
    2. Option membership (FR-002 / FR-005): Options outside session rejected and prompted to re-select.
    3. Tie condition (Q-02): Open question; workflow halts at neutral decision node without automatic tie-breaking.
  ```
- **External Video Candidate:** [UML Activity Diagram Tutorial](https://lucid.co/diagram/uml/activity-diagram-tutorial) (Lucid).
  - *Candidate Status:* Discovery evidence recorded. Per course owner policy, video remains an unverified candidate; playback, captions, and accessibility were NOT verified.
- **Gaps Found:** None in data model. Content matches lesson template.
- **Corrections Made:** None required for Topic 12.

---

### Topic 13: `state-diagram` (مخطط الحالات ودورة حياة الكيانات - State Diagram)

| Item | Content & Details | Verdict |
|---|---|---|
| **Lesson Inputs** | State-bearing entities identified in `docs/PRD.md` and operational flows from `docs/diagrams/activity-diagram.md`. Prerequisites are advisory. | **Passed** |
| **Explanation** | Explains state machines, initial/final states, transitions with triggers and guards (`[guard]`), and the strict architectural rule against inventing unbacked states (every state must reflect a database `status` column). | **Passed** |
| **Example** | BorrowHub `LoanRequest` lifecycle: `Draft` → `Submitted` → `Approved` / `Rejected` / `Cancelled` → `Active` → `Overdue` / `Returned`. Optional case study. | **Passed** |
| **Exercise** | Select a core project entity, document its confirmed statuses in a State Transition Table with triggers and guards, and render in Mermaid `stateDiagram-v2`. | **Passed** |
| **Prompt** | **PROMPT 10 — State Diagram**: Senior State Machine Analyst prompt generating Mermaid `stateDiagram-v2` with transition tables and no invented states. | **Passed** |
| **Expected Output** | 1. `docs/diagrams/state-diagrams.md`: State Transition Table with original state, trigger, guard, next state, and PRD rule references.<br/>2. `docs/diagrams/state-diagrams.mmd`: Valid Mermaid `stateDiagram-v2` diagram modeling verified transitions. | **Passed** |
| **Assessment Criteria** | **Quiz Questions:**<br/>- `state-q-event`: An arrow between states must represent an approved event or guard condition that changes entity state (Correct: index 0).<br/>- `state-q-unknown`: Unresolved transitions (e.g. unspecified expiration) must be recorded as open questions rather than guessing automatic transitions (Correct: index 1).<br/>**Practical Rubric:**<br/>- `state-r-lifecycle` (targets `state-code`): Entity lifecycle states and transitions are traced to PRD/business rules.<br/>- `state-r-unknown` (targets `state-doc`): Preserves ambiguity and records open questions without guessing unconfirmed rules. | **Passed** |

- **Real Sample Output Produced:**
  ```mermaid
  stateDiagram-v2
    [*] --> Draft: exercise starts
    Draft --> CollectingPreferences: three distinct options saved (FR-001)
    CollectingPreferences --> CollectingPreferences: valid preference saved (FR-002 / BR-001)
    CollectingPreferences --> Review: organizer opens saved responses
    Review --> Selected: organizer selects one listed option
    Selected --> [*]: result shows selected option
    note right of Review
      Tie handling is unresolved; no transition is specified.
    end note
    note right of CollectingPreferences
      Invalid option or unknown session: no preference write (FR-005 / FR-006).
    end note
  ```
  ```markdown
  # docs/diagrams/state-diagrams.md
  # State Model: StudySession Entity
  | Current State | Trigger / Event | Guard [Condition] | Next State | Source / Evidence |
  |---|---|---|---|---|
  | Draft | Organizer saves options | [Count == 3 distinct] | CollectingPreferences | FR-001 |
  | CollectingPreferences | Participant submits preference | [Valid option & session] | CollectingPreferences | FR-002 / BR-001 |
  | CollectingPreferences | Organizer opens responses | [Session active] | Review | FR-003 |
  | Review | Organizer selects option | [No tie or owner decides] | Selected | FR-003; Q-02 open |
  | Selected | Result displayed | [Option confirmed] | [*] | FR-004 |
  ```
- **External Video Candidate:** [1.6 UML-Zustandsdiagramm (UML State Diagram)](https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/50973) (University of Hamburg, Prof. Dr. Matthias Riebisch).
  - *Candidate Status:* Discovery evidence recorded. Lecture is in German; language suitability and Arabic/English alignment must be evaluated alongside playback and accessibility.
- **Gaps Found & Corrected:**
  - **Gap (DEC-50 product name consistency):** Section 6 in Topic 13 HTML content (`src/data/topics/wave2/t05-plantuml-behavior.ts:821`) cited the legacy product name: `استخدم هذا البرومبت المعتمد من مكتبة سلاح العصر`.
  - **Correction Made:** Updated the prompt introduction text to: `استخدم هذا البرومبت المعتمد من مكتبة Ai_agents لتحليل دورة حياة الكيانات وتوليد كود Mermaid stateDiagram-v2 سليم:`.

---

## 2. Policy & Template Alignment Summary

1. **Lesson Template Completeness:**
   All 4 Topics in Group 05 satisfy the approved template requirements:
   - Clear learning objectives with stable semantic IDs (`plantuml-objective-*`, `usecase-objective-*`, `activity-objective-*`, `state-objective-*`).
   - Context/input section and authentic technical explanations distinguishing PlantUML from Mermaid, enforcing OMG UML semantics, and explaining behavior modeling.
   - Worked examples where BorrowHub is explicitly optional (`BorrowHub مثال اختياري`).
   - Coherent Practical Steps for the learner's own project, each with a declared output feeding the next topic.
   - Reviewed objective quiz questions with 4 options, stable IDs, keyed answers, and educational rationales.
   - Practical rubric criteria tied via semantic `outputId` to declared outputs, using the approved 3-level scale (`not-yet`, `in-progress`, `ready-for-review`) without mastery thresholds.
   - External video candidates with discovery records, explicitly remaining candidates without unverified playback/caption claims.

2. **Content Model Review State:**
   In accordance with instruction 4a, `reviewState` remains `draft` in `src/data/learning/group-a-05-plantuml-behavior.ts`. No review state flip or evidence mutation was applied to shared builders or topic drafts. The orchestrator will perform the central state change upon course-owner sign-off.

3. **External Video Policy:**
   All 4 videos are candidate resources (`availability: candidate`) with discovery notes. No claim of verified playback, captions, or accessibility is made.

---

## 3. Verification & Test Gate Results

1. **TypeScript Lint Check:**
   - Command: `npm run lint`
   - Output: `tsc --noEmit` exited with code 0 (clean).

2. **Unit Tests:**
   - Command: `npx tsx --test src/lib/*.test.ts`
   - Outcome: All 80 tests passed (including topic hash baseline tests and assessment policy evaluations).
   - Time: ~440ms.

3. **Production Build:**
   - Command: `npm run build`
   - Outcome: Next.js 15.5.28 compiled successfully; all 182 static pages generated with 0 errors.

4. **Playwright E2E Suite:**
   - Command: `E2E_SERVER=production E2E_PORT=3205 npx playwright test e2e/path/t05-plantuml-behavior.spec.ts`
   - Outcome: **13 passed** (0 failed) in 47.8s.
   - Coverage:
     - Topics 10, 11, 12, 13 metadata, cards, numbers, stage tags.
     - Topic 10 PlantUML tool explanation, Mermaid contrast, live editor links, copyable code.
     - Topic 11 role permissions, include/extend rules, BorrowHub code, PROMPT 07.
     - Topic 12 operational decisions, Mermaid flowchart TD, PROMPT 08, Rule 8 damage handling.
     - Topic 13 documented lifecycle states, state transition table, PROMPT 10.
     - TopicDetailModal sequential navigation across Topics 10-13.
     - Group 05 learning activities: objectives, sections, worked examples, video candidate sections.
     - Practical steps and expected outputs presence and clipboard copyability.
     - Interactive quiz grading, positive/negative feedback, rationales, and retry flow.
     - Practical rubric self-assessment and checklist editing, localStorage persistence, reversal, and survival across reload.
     - RTL layout for prose and LTR computed direction for code containers.
     - Mobile viewport (390px) rendered with zero horizontal overflow across all 4 topics.

---

## 4. Release Decision for Issue #55

**Status:** Evidence complete and awaiting course-owner sign-off.
*Independent verification complete. Group release awaiting course-owner formal sign-off before orchestrator state flip.*
