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
  A[Organizer proposes three times] --> B[Participant views options]
  B --> C[Participant records one preference]
  C --> G{Is the choice one of this session's listed options?}
  G -->|Yes — exercise path| D[Organizer reviews responses]
  D --> E[Organizer selects a time]
  E --> F[Group sees selected time]
  G -->|No — proposed validation path| H[Explain the mismatch]
  H --> B
  D --> Q[Open: how should a tie be resolved?]
```

The validation branch is an explicit exercise proposal, not a product behavior;
replace it with a PRD-backed rule before using the flow for implementation. The
tie node remains an open question. No availability, persistence, or retry
behavior has been executed or independently verified.

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
