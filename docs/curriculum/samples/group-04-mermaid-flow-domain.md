# Group 04 sample outputs — Mermaid, User Flow, and Domain Model

All rules below are sample-only. Diagram syntax can render correctly while the product meaning remains unvalidated.

## `docs/diagrams/README.md` — Topic 07

````markdown
# Diagram samples

Each diagram identifies its question, source requirements, and unresolved
rules. Mermaid rendering checks syntax only; review the semantics against PRD.

## Small Mermaid example: option validation

```mermaid
flowchart TD
  Start([Start]) --> Listed{Is the option listed?}
  Listed -->|Yes| Continue[Continue the exercise]
  Listed -->|No| Explain[Explain the mismatch and return to options]
```

This is a syntax exercise, not an accepted product rule. Replace the branch
condition and recovery behavior with the project's source-backed requirement.
````

## `docs/user-flow.md` — Topic 08

```mermaid
flowchart TD
  Start([Start]) --> Setup[Organizer sets up three options<br/>FR-001]
  Setup --> Open{Can the participant open the session?}
  Open -->|No: missing or unknown session, FR-006| NoSession[Explain that the session cannot be opened<br/>Do not record a preference]
  Open -->|Yes| Options[Participant views listed options<br/>FR-002]
  Options --> Submit[Participant submits one option]
  Submit --> Listed{Option belongs to this session?}
  Listed -->|No: FR-005| Invalid[Explain mismatch<br/>Do not record a preference]
  Invalid --> Options
  Listed -->|Yes| Save[Save one preference for alias and session<br/>BR-001; exercise behavior]
  Save --> Review[Organizer reviews responses<br/>FR-003]
  Review --> Tie{Do response counts tie?}
  Tie -->|Yes: Q-02| TieOpen[Owner decision required<br/>No winner is inferred]
  Tie -->|No| Select[Organizer selects one listed option<br/>FR-003]
  Select --> Result[Result identifies selected option<br/>FR-004 Q-05]
```

### شرح التدفق وربطه بمتطلبات PRD

يبدأ المنظّم بإعداد جلسة وثلاثة خيارات متميزة (FR-001). يفتح المشارك الجلسة
ويختار خياراً واحداً من الخيارات التابعة لها (FR-002). قبل التسجيل، يرفض
التمرين الخيار المفقود أو غير المدرج (FR-005) والجلسة المفقودة أو المجهولة
(FR-006)، ولا ينشئ تفضيلاً في هذين المسارين. عند نجاح التحقق، يحفظ النظام
تفضيلاً واحداً للمعرّف المستعار والجلسة (BR-001). يراجع المنظّم الردود ويختار
خياراً مدرجاً (FR-003)، ثم تُظهر النتيجة الخيار المحدد (FR-004). موضع تخزين
الاختيار ومن يمكنه قراءة النتيجة ما زالا سؤالاً مفتوحاً Q-05. إذا تعادلت
الأعداد، يتوقف التدفق عند Q-02 ولا يخترع قاعدة للفصل.

| Diagram path | PRD source | Status |
|---|---|---|
| Set up three options | FR-001 | Exercise choice; no session was created |
| Open session and submit one listed option | FR-002 | Exercise choice; no preference was persisted |
| Reject a missing or unlisted option | FR-005 | Sample validation choice; owner decision pending |
| Reject a missing or unknown session | FR-006 | Sample validation choice; owner decision pending |
| Keep at most one preference per alias/session | BR-001 | Exercise choice; no race or database write was run |
| Review, select, and display one option | FR-003 / FR-004 / Q-05 | Exercise choice; selection storage/viewer access unresolved; no result was saved |
| Resolve a tie | Q-02 | Open; intentionally no winner transition |

This is an authoring flow tied to the fictional PRD, not a runtime trace. No
availability, persistence, retry behavior, owner decision, or visual rendering
has been independently verified.

## `docs/diagrams/domain-model.md` and `.mmd` — Topic 09

````markdown
| Concept | Exercise definition | Relationship | Source/status |
|---|---|---|---|
| Study session | A scheduled group event | Has candidate time options | Exercise vocabulary |
| Organizer | Person coordinating the exercise | Proposes options and selects a time | Exercise role |
| Participant | Person responding to options | Records a preference | Exercise role; identity rules open |
| Time option | One proposed meeting time | Belongs to one session | Exercise choice |
| Preference | Participant’s selected option | Refers to participant and option | Revision rule open |
````

```mermaid
flowchart LR
  Organizer[Organizer] -->|coordinates| StudySession[Study session]
  StudySession -->|offers candidate times| TimeOption[Time option]
  Participant[Participant] -->|records a choice| Preference[Preference]
  Preference -->|refers to| StudySession
  Preference -->|names| TimeOption
```

**Review state:** This is a business-concept map, not a class diagram or ERD;
it intentionally carries no implementation fields or cardinalities. Relationship
labels are exercise vocabulary and still need confirmation against a domain
source. No Mermaid renderer or owner review was run for this sample packet.
