# Group 02 sample outputs — Discovery, PRD, and SRS

This is a fictional study-group scheduling exercise. No interviews occurred and no product owner validated these rules. “Exercise choice” means a learner picked a rule for this sample only. The sample shows a possible artifact handoff; it does not approve the Topic template or policy.

**Suggested input from Topic 01:** `docs/PROJECT_CONTEXT.md` from the Group 01 sample in `issue51-group-01-review.md`.

## `docs/DECISIONS_LOG.md` — Topic 02

```markdown
# Decisions log — Study-group scheduling exercise

Status: fictional exercise. No participant interviews have been conducted.

| ID | Statement | Kind | Source / owner | State |
|---|---|---|---|---|
| D-01 | One organizer proposes three candidate meeting times. | Exercise choice | Sample author; not a user decision | Draft |
| A-01 | Participants will respond through a shared link. | Assumption | Untested | Open |
| Q-01 | Can a participant change a submitted preference? | Open question | Ask the project owner | Unresolved |
| Q-02 | Who decides when preferences tie? | Open question | Ask the project owner | Unresolved |
```

**Handoff:** PRD may represent D-01 as a clearly labeled exercise rule, but must retain A-01/Q-01/Q-02 as open rather than confirmed requirements.

## `docs/PRD.md` and `docs/PRD_REVIEW.md` — Topic 03

```markdown
# PRD — Study-group scheduling exercise

Status: draft; no real-user validation.

## Scope
A group organizer proposes meeting times, reviews participant preferences,
and shares one selected time. Calendar sync and automatic recommendations
are outside this exercise.

## Exercise requirements
- FR-01 (exercise choice): An organizer can record three candidate times.
  Source: D-01. Acceptance: the draft lists three distinct options.
- FR-02 (exercise choice): A participant can record one preferred option.
  Source: explicit sample-only exercise rule. Acceptance: the saved response
  identifies one listed option.
- FR-03 (open): A participant can revise a response. Source: Q-01.
- FR-04 (open): Tie resolution. Source: Q-02.

## Assumptions
- A-01: responses arrive through a shared link; not validated.
```

`docs/PRD_REVIEW.md`:

```markdown
| Check | Finding | Action |
|---|---|---|
| Source status | FR-03/FR-04 depend on open questions. | Do not present them as confirmed behavior. |
| Scope | Calendar synchronization is deferred. | Keep manual time selection testable. |
| Traceability | FR-02 needs an explicit source or owner decision. | Keep it marked exercise-only until the owner decides. |
```

## `docs/SRS.md` and traceability — Topic 04

```markdown
# SRS scenario — Record a preference (exercise-only)

Precondition: three options exist for one session.
Given a participant chooses one listed option,
When the sample records that choice,
Then the record links the participant alias to that option.

Unspecified behavior: identity verification, edits, duplicates, tie handling,
notification channel, retention, and timezone rules remain open.
```

`docs/SRS_TRACEABILITY.md`:

```markdown
| Scenario | Source | Acceptance state |
|---|---|---|
| Record one preference | FR-02 (exercise choice) | Sample-only; owner validation pending |
| Revise a preference | Q-01 | Not specified |
| Resolve a tie | Q-02 | Not specified |
```

**Review state:** These are worked sample artifacts only. They were not run through the learner UI, tested with users, or independently reviewed. Topic questions/rubrics remain draft and policy approval is pending.
