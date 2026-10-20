# Group 05 sample outputs — PlantUML and behavior diagrams

These sample diagrams use the fictional study-group scheduling exercise. They state only sample choices; they do not establish real product scope.

## `docs/diagrams/README-plantuml.md` — Topic 10

```markdown
# PlantUML sample

Purpose: practice `@startuml` / `@enduml` and preview a UML diagram.
A successful render checks notation, not whether actors, permissions, or rules
are correct. The links below are candidate editors; no server was used.
```

## `docs/diagrams/use-case.puml` — Topic 11

```plantuml
@startuml
left to right direction
actor Organizer
actor Participant
rectangle "Study-group scheduling exercise" {
  usecase "Propose meeting times" as UC1
  usecase "Record one preference" as UC2
  usecase "Review responses" as UC3
  usecase "Share selected time" as UC4
}
Organizer --> UC1
Organizer --> UC3
Organizer --> UC4
Participant --> UC2
@enduml
```

## `docs/diagrams/activity-diagram.mmd` — Topic 12 (Mermaid flowchart)

```mermaid
flowchart TD
  Start([Participant opens session]) --> Choose[Choose a listed option]
  Choose --> Valid{Does the choice belong to this session?}
  Valid -->|Yes — exercise path| Save[Record preference]
  Save --> Review[Organizer reviews responses]
  Review --> Select[Organizer selects a time]
  Select --> Done([Show selected time])
  Valid -->|No — proposed validation path| Reject[Show a mismatch explanation]
  Reject --> Choose
```

The invalid-choice branch is an exercise proposal for demonstrating a guard and
recovery path. Replace it with source-backed behavior before using this as a
product model. The tie rule remains open and is not modeled as a transition.

## `docs/diagrams/state-diagrams.mmd` — Topic 13 (Mermaid stateDiagram-v2)

```mermaid
stateDiagram-v2
  [*] --> Draft: exercise starts
  Draft --> CollectingPreferences: options shared (exercise)
  CollectingPreferences --> Review: organizer opens review (exercise)
  Review --> Selected: selection made (exercise)
  Selected --> [*]
  note right of Review
    Tie handling is unresolved; no transition is specified.
  end note
```

These Mermaid snippets match the expected `.mmd` outputs. They are sample
states and transitions only; event names, persistence, rejection/recovery, and
rendering have not been validated against a real product or renderer.

**Review state:** The Topic 11 use-case example above is the only PlantUML
diagram in this group. Its rendering, UML correctness, role authority, and
source traceability have not been independently checked.
