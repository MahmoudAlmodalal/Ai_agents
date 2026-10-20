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
| D-02 | A participant records one preferred option for a session. | Exercise choice | Sample author; aligns with the optional Topic 01 exercise only | Draft |
| A-01 | Participants will respond through a shared link and use an alias. | Assumption | Untested; no identity model selected | Open |
| Q-01 | Can a participant change a submitted preference? | Open question | Ask the project owner | Unresolved |
| Q-02 | Who decides when preferences tie? | Open question | Ask the project owner | Unresolved |
| Q-03 | What timezone and timestamp format should meeting options use? | Open question | Ask the project owner | Unresolved |
| Q-04 | What should a participant see if storage is unavailable or a response races with another? | Open question | Ask the project owner | Unresolved |
| Q-05 | Where is the organizer's selected option stored, and who may read the result? | Open question | Ask the project owner | Unresolved |
```

**Handoff:** PRD may represent D-01/D-02 as clearly labeled exercise choices, but must retain A-01/Q-01–Q-05 as open rather than confirmed requirements.

## `docs/PRD.md` and `docs/PRD_REVIEW.md` — Topic 03

```markdown
# PRD — Study-group scheduling exercise

Status: fictional exercise draft; no user research or owner validation.
Source rule: every requirement below is an exercise choice unless explicitly
marked assumption or open. None is an approved product decision.
Priority labels are only this sample author's exercise ranking.

## 1. Product Overview
The exercise describes a small service where an organizer proposes meeting
times, participants record preferences, and the organizer shares a selection.

## 2. Problem Statement
Exercise hypothesis: study groups may need a simple way to compare candidate
meeting times. This is not a research finding.

## 3. Product Goals
- Let an organizer draft a session with three candidate times (D-01).
- Let a participant choose one listed option (D-02).
- Let the organizer select and share one option (exercise choice; owner review
  pending).

## 4. Non-Goals
Calendar synchronization, automatic recommendations, authentication, email or
push notifications, and production scheduling are outside this sample.

## 5. Target Users
- Organizer: coordinates one fictional study session.
- Participant: records a preference for that session.
These are exercise roles, not researched user segments.

## 6. User Personas
- Organizer persona (fictional): wants to compare responses and communicate a
  selected time.
- Participant persona (fictional): wants to see listed options and record one
  preference. No interview or usability study supports these personas.

## 7. User Needs
The exercise assumes the organizer needs candidate options and a response
summary, while a participant needs a clear list and confirmation. Validate
these needs with real users before treating them as product requirements.

## 8. User Stories
- US-01 (exercise choice): As an organizer, I can propose three options so a
  group can compare them.
- US-02 (exercise choice): As a participant, I can choose one listed option so
  my preference is recorded for review.
- US-03 (exercise choice): As an organizer, I can select and share an option.

## 9. MVP Scope
In scope for the exercise: create a session, list three options, record one
preference per participant alias, review responses, and share a selection.
The alias is only a sample label; identity and access control remain open.

## 10. Core Features
1. Session and option entry.
2. Participant option selection with a same-session check.
3. Organizer response review and selection.
4. A visible selected-time result. These are draft exercise behaviors.

## 11. Functional Requirements

| ID | Priority | Requirement | Source / state |
|---|---|---|---|
| FR-001 | P1 | The organizer can record three distinct candidate options for a session. | D-01; exercise choice |
| FR-002 | P1 | A participant can submit one preference that references an option listed for the same session. | D-02 plus sample-only same-session rule; exercise choice |
| FR-003 | P1 | The organizer can review recorded preferences and select one listed option. | Exercise choice; no owner decision |
| FR-004 | P1 | The result view identifies the option selected by the organizer. | Exercise choice; no notification channel is implied |
| FR-005 | P1 | A missing or unlisted option is rejected without creating a preference; the participant is told to choose from the session's listed options. | Sample validation choice; no owner decision |
| FR-006 | P2 | A missing or unknown session is rejected without recording a preference; the participant is told the session could not be opened. | Sample validation choice; no owner decision |
| BR-001 | P1 | At most one preference per participant alias and session is stored; a second submission does not overwrite the first. | Exercise choice; alias is not verified identity |

## 12. Non-Functional Requirements
| ID | Priority | Requirement | Source / state |
|---|---|---|---|
| NFR-001 | P2 | Sample fixtures and documentation contain no real participant data or credentials. | Authoring safety constraint; inspect files, not a production guarantee |

NFR-001 applies only to this sample packet. No latency, availability,
retention, accessibility conformance, or production privacy target has been
approved. Record those as owner questions rather than inventing thresholds.

## 13. User Flows
Primary exercise flow: organizer proposes options → participant selects one
listed option → system checks the session/option relationship → organizer
reviews preferences → organizer selects an option → result is shown.
Alternative: an option from another session is rejected and the participant
returns to the listed options. Tie handling remains Q-02.

## 14. Pages / Screens
Candidate screens are session setup, participant options, organizer review,
and selected-time result. Their routes and visual design are placeholders to
be reconciled in the later UI/UX exercise.

## 15. Roles & Permissions
The exercise names Organizer and Participant roles, but does not define login,
authorization, link sharing, or how a role is verified. Do not treat role labels
as an access-control policy.

## 16. Data Requirements
The sample uses StudySession, TimeOption, and Preference records. An option
belongs to one session; a preference refers to an option from that same
session. A participant alias is illustrative. Timestamp format/timezone and
identity scope remain open. See the later ERD exercise for its provisional
schema. The sample does not yet define where the organizer's selected option is
stored or who can read it (Q-05).

## 17. Integrations
None are required by the exercise. Calendar, identity, messaging, and hosting
integrations are deferred or unresolved; no external service is assumed.

## 18. Edge Cases
- No options are listed: publication and participant behavior are unresolved.
- A submitted option belongs to another session: reject it under the sample
  same-session rule.
- A second preference uses the same alias/session: preserve at most one record;
  edit behavior remains Q-01.
- Two options receive equal preference counts: Q-02; do not choose a tie rule.
- Concurrent duplicate submissions: preserve the one-record invariant; exact
  user response is Q-04.

## 19. Error States
For a missing or unlisted option, the sample flow explains the mismatch and
does not record a preference. For storage failure, do not report success unless
a record was saved; exact retry and message behavior remain Q-04.

## 20. Security & Privacy
No real identity, private participant data, or credential belongs in this
sample. A shared link and alias are assumptions only. Authentication, link
guessing, visibility of responses, retention, and deletion need owner decisions.

## 21. Analytics & Tracking
No analytics or tracking is specified. Do not collect participant behavior in
this exercise; any future measurement needs an explicit purpose and privacy
decision.

## 22. Success Metrics / KPIs
No numeric target or measurement plan is approved. The sample can be reviewed
for whether each output is traceable to a source, but that is an authoring check,
not a product KPI.

## 23. Acceptance Criteria (Given/When/Then)
- Given a draft session, when the organizer records three distinct options,
  then the session lists those three options (FR-001; exercise-only).
- Given an option belonging to the session, when a participant submits it,
  then one preference references that session and option (FR-002; exercise-only).
- Given an option from another session, when a participant submits it, then
  no preference is recorded and the mismatch is explained (FR-005; exercise-only).
- Given a missing or unknown session identifier, when a participant submits a
  preference, then no record is created and the session cannot be opened
  (FR-006; sample validation choice).
- Given no option is selected, when the form is submitted, then no preference
  is recorded and the participant is prompted to choose a listed option
  (FR-005; exercise-only).
- Given one preference for an alias/session, when a duplicate arrives, then
  the stored count remains at most one and the existing value is not overwritten
  (BR-001; exercise-only; response wording open).
- Given a saved selection, when the result view opens, then it identifies that
  option (FR-003/FR-004; exercise-only).

## 24. Future Features
Calendar sync and automatic recommendations may be considered only after the
basic exercise is validated. Authentication and notifications are unresolved,
not accepted future commitments.

## 25. Risks & Dependencies
- Alias is not identity verification and may not prevent impersonation.
- No timezone convention means displayed times may be ambiguous.
- Tie, editing, and outage responses are open.
- A real implementation depends on product-owner decisions and privacy review.
- The selected-option result needs a storage/access rule before it can be
  implemented (Q-05); no schema field or authorization policy is implied here.

## 26. Open Questions
- Q-01: Can a participant revise a submitted preference?
- Q-02: Who decides when preferences tie?
- Q-03: What timezone and timestamp format should be used?
- Q-04: What should the participant see after a storage outage or concurrent
  duplicate request?
- Q-05: Where is the organizer's selected option stored, and who may read the
  result? The current sample schema does not represent that decision.
- A-01: Is a shared link and participant alias acceptable? Validate before use.

## 27. Recommended Development Phases
1. Resolve identity, edit, tie, timezone, privacy, selected-result storage, and
   error-response questions.
2. Review the domain/requirements model against those answers.
3. Prototype the exercise screens and their loading, empty, error, and success
   behavior.
4. Implement only after requirements and access rules are accepted.
These are sequencing suggestions, not approved delivery dates.
```

`docs/PRD_REVIEW.md`:

```markdown
| Issue | Severity | Evidence | Explanation | Proposed next step |
|---|---|---|---|---|
| Identity is a shared-link alias, not a verified participant. | High | A-01; sections 9, 15, 20 | Preferences could be attributed to the wrong person; access and privacy rules are absent. | Ask the owner to decide identity and response visibility. |
| A participant may be unable to correct a submitted preference. | High | BR-001; Q-01 | The one-record rule prevents duplicates but does not state whether edits are allowed. | Ask the owner; do not infer an update path. |
| Tie resolution is unspecified. | High | Q-02; sections 13, 18, 26 | The result flow cannot choose a winner deterministically when counts tie. | Keep the branch open until decided. |
| Timezone and stored time format are unspecified. | Medium | Q-03; section 16 | The same text can mean different local times. | Ask for timezone, display, and storage rules. |
| Storage outage and concurrent-conflict response lack a user contract. | High | Q-04; sections 18, 19, 23 | The record invariant is stated, but retry/message behavior is not. | Define response behavior after owner review; preserve the invariant. |
| The selected result has no storage or visibility rule. | High | FR-003/FR-004; Q-05; sections 16, 20, 26 | The exercise asks for a result view but the provisional schema has no selected-option field and access policy is unresolved. | Ask the owner where selection is stored and who can read it; do not invent a schema field or permission. |
| No measurable product KPI or performance/privacy target is approved. | Medium | NFR-001; sections 12, 20–22 | The exercise has no evidence for a numeric service target or collection policy. | Keep metrics open; do not invent thresholds or analytics. |

These are review findings on the sample draft, not approved corrections or owner
decisions. The sample author has not changed the fictional rules in response.
```

## `docs/SRS.md` and traceability — Topic 04

```markdown
# SRS — Study-group scheduling exercise

Status: worked specification for fictional exercise choices only. No service,
database, identity system, or participant workflow was executed. A participant
alias is a sample label, not verified identity.

## Inputs and validation
- `session_id` must identify the session shown to the participant.
- `option_id` must identify an option belonging to that same session.
- An alias must be present for the fixture, but its identity and uniqueness
  across real people are not established.
- Duplicate alias/session records are prevented by the sample data constraint;
  edits and the visible conflict response remain open.

## Scenario SRS-01 — Create a session with three options
Given an organizer creates a draft session with three distinct candidate times,
When the session is saved,
Then it contains those three options for the same session.
Source: FR-001, exercise choice; timezone semantics remain open (Q-03).

## Scenario SRS-02 — Record a listed preference
Precondition: a session and its listed options exist.
Given the participant supplies that session, a listed option, and an exercise
alias,
When the preference is recorded,
Then exactly one preference references the session and the selected option.
Source: FR-002, exercise-only.

## Scenario SRS-03 — Reject an option from another session
Given an option belongs to session B,
When it is submitted for session A,
Then no preference is recorded and the flow explains that the option is not
listed for this session.
Source: FR-005, exercise-only same-session rule.

## Scenario SRS-04 — Reject a missing option
Given the preference form has no selected option,
When it is submitted,
Then no preference is recorded and the participant is asked to choose a
listed option.
Source: FR-005, sample validation choice; not owner-approved.

## Scenario SRS-05 — Reject a missing or unknown session
Given the session identifier is absent or does not resolve to this exercise,
When the participant submits a preference,
Then no record is created and the participant is told the session could not
be opened.
Source: FR-006, sample validation choice; not owner-approved.

## Scenario SRS-06 — Preserve the one-preference invariant
Given a preference already exists for an alias and session,
When another submission for that alias/session arrives,
Then the stored count remains at most one and the earlier record is not
overwritten.
Source: BR-001, exercise-only. The user-facing response and edit policy remain
open (Q-01/Q-04).

## Scenario SRS-07 — Concurrent duplicate attempts
Given two submissions for the same alias and session arrive concurrently,
When the storage constraint is applied,
Then no more than one preference is stored.
Source: BR-001, exercise-only. The winning response, loser message, and retry
policy are unresolved (Q-04); this scenario describes an invariant, not an
executed race test.

## Scenario SRS-08 — Review and select an option
Given preferences have been recorded for a session,
When the organizer reviews them and selects one listed option,
Then the selected option belongs to that session.
Source: FR-003, exercise choice; tie handling remains open (Q-02).

## Scenario SRS-09 — Show the selected result
Given a selected option is supplied to the result view,
When the result view is opened,
Then it identifies that option.
Source: FR-004, exercise choice; where that option is stored and who may open
the view remain Q-05. Notification behavior is not implied.

## Scenario SRS-10 — Storage unavailable
Given preference storage is unavailable,
When the participant submits a preference,
Then the interface must not claim the preference was saved.
Source: sample safety behavior. Exact error text and retry policy remain Q-04.

## Unspecified behavior
Identity verification, response visibility, edit semantics, tie handling,
timezone, selected-result storage, notifications, retention/deletion, and the
response to a concurrent loser remain open. No acceptance outcome is assigned
to those questions.
```

`docs/SRS_TRACEABILITY.md`:

```markdown
| Scenario / behavior | PRD source | Acceptance state |
|---|---|---|
| SRS-01: create session with three options | FR-001 | Exercise-only; no persistence run |
| SRS-02: record a listed preference | FR-002 | Exercise-only; no persistence run |
| SRS-03: reject another session's option | FR-005 | Exercise-only; no runtime validation |
| SRS-04: reject missing option | FR-005 | Sample validation choice; owner validation pending |
| SRS-05: reject missing or unknown session | FR-006 | Sample validation choice; no runtime behavior executed |
| SRS-06: prevent duplicate alias/session record | BR-001 | Exercise-only; DB constraint appears in later sample, app response open |
| SRS-07: concurrent duplicate invariant | BR-001 | Not executed; storage constraint is a design example only |
| SRS-08: review and select an option | FR-003 | Exercise-only; no runtime behavior executed |
| SRS-09: show selected result | FR-004 | Exercise-only; result storage/access rule remains Q-05; no runtime behavior executed |
| SRS-10: no false success during storage outage | Q-04 / sample safety behavior | Error wording and retry remain open; not executed |
| Participant edit | Q-01 | Not specified; no acceptance rule |
| Tie resolution | Q-02 | Not specified; no acceptance rule |
| Timezone / timestamp format | Q-03 | Not specified; no acceptance rule |
| Selected-option storage and result visibility | Q-05 | Not specified; no acceptance rule or schema field |
```

**Review state:** These are worked sample artifacts only. They were not run through the learner UI, tested with users, or independently reviewed. Topic questions/rubrics remain draft and policy approval is pending.

**Sample correction note:** The PRD now contains all 27 headings listed in the canonical Topic 03 prompt, source-labeled requirements with priorities, and a seven-finding critical review. The SRS includes option creation/selection, valid and invalid input, duplicate, concurrent-invariant, and storage-unavailable cases with trace rows. Selected-option storage/access remains Q-05. These are static fictional examples, not user decisions or executed behavior.
