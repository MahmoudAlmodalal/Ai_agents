# Group 07 sample outputs — UI/UX planning

This is an illustrative planning set for the fictional scheduling exercise. No user research, routes, screens, or interface behavior were conducted or implemented. The four screen names and paths below are candidate handoffs traced to the sample PRD, not approved product scope.

## `docs/UI_UX_REQUIREMENTS.md` — Topic 18

### Role needs and task sources

| Role label | Goal | Candidate task | Source / state |
|---|---|---|---|
| Organizer | Propose three distinct options, review responses, and select one option. | Set up a session, review saved preferences, and make a selection. | FR-001 / FR-003; exercise-only; role authorization is undefined. |
| Participant | Record one preference for a listed option. | Open the session, choose one option, and submit it. | FR-002 / BR-001; exercise-only; identity/edit rules remain open. |

### Candidate navigation model

`session-setup` (Organizer task, FR-001) → `participant-options` (Participant task, FR-002 / A-01) → `organizer-review` (Organizer task, FR-003) → `selected-result` (viewer unassigned, FR-004 / Q-05).

The arrows describe the sample's task sequence, not grants of access. The first-to-second transition depends on the unvalidated shared-link assumption A-01. Opening organizer review is a candidate task from FR-003, but section 15 of the PRD leaves authentication and authorization unspecified. The last transition is conditional on resolving Q-05, which asks where the result is stored and who may read it. No extra page or notification is implied.

### Role, visibility, action, and permission source matrix

| Role label / actor | Candidate screen or action | Visibility: who may see it? | Action: who may do it? | Source and permission status |
|---|---|---|---|---|
| Organizer | Open `session-setup`; create a session with three distinct options | Candidate task visibility; actual screen access is open | Organizer is the exercise actor for FR-001; authorization is open | FR-001 names the task role; PRD section 15 defines no login or authorization rule. |
| Participant | Open `participant-options`; read options and submit one preference | Depends on a shared link that is only assumption A-01; access is unvalidated | Participant is the exercise actor for FR-002 / BR-001; identity and edit authority remain open | A-01, FR-002, BR-001, Q-01; no access-control rule is established. |
| Organizer | Open `organizer-review`; read preferences and select one option | Candidate task visibility; actual screen access is open | Organizer is the exercise actor for FR-003; selection authority beyond that exercise role is open | FR-003; tie decision Q-02 and selection storage Q-05 remain unresolved; PRD section 15 has no authorization policy. |
| Unassigned viewer | Open `selected-result`; read the selected option | Unknown | Unknown; do not assign to Organizer or Participant | FR-004 requires a result view; Q-05 explicitly leaves the reader role and access rule unresolved. |

Role labels in the first two tables describe fictional PRD tasks, not authentication, link access, or permissions. `Open` and `Unknown` are deliberate gaps, not proposed grants. Resolve them with the project owner before drawing access boundaries or implementing guards.

## `docs/UX_BLUEPRINT.md` — Topic 19

### Sitemap — four PRD candidate screens

| Screen ID | Candidate route | Role label | Relationship / source |
|---|---|---|---|
| `session-setup` | `/sessions/new` | Organizer | Creates a session with three distinct options (FR-001). |
| `participant-options` | `/sessions/:sessionId/options` | Participant | Receives the shared session link (A-01, unvalidated) and records a preference (FR-002). |
| `organizer-review` | `/sessions/:sessionId/review` | Organizer | Reviews preferences and selects an option (FR-003); tie handling is Q-02. |
| `selected-result` | `/sessions/:sessionId/result` | Viewer unassigned (Q-05) | Shows the organizer's selected option (FR-004); storage and visibility are Q-05. |

These are route placeholders for the four screens named in PRD section 14. The flow crosses roles from session setup through the participant link to organizer review and result. Link distribution is an assumption, not a specified screen or permission. No login, confirmation screen, or notification page is added.

### End-to-end journey

| Stage | Role / action | Frontstage | Backstage / support | Source or open question |
|---|---|---|---|---|
| Setup | Organizer records three distinct candidate times. | `session-setup` form and saved-session feedback. | Create a session and its options. | FR-001; time zone/format Q-03. |
| Respond | Participant opens the session and submits one listed option. | `participant-options`; reject a missing/foreign option or missing session with an explanation. | Check session/option relationship, then save at most one preference for the alias/session. | FR-002, FR-005, FR-006, BR-001; A-01 and Q-01 remain open. |
| Decide | Organizer reviews saved preferences and selects one listed option. | `organizer-review`; tie branch pauses for an owner decision. | Read saved preferences; selection storage is unresolved. | FR-003, Q-02, Q-05. |
| Result | The viewer role and access rule remain undecided; a viewer reads the selected option once that rule is defined. | `selected-result` identifies the choice. | Storage/access mechanism is not modeled yet. | FR-004, Q-05; no notification is implied. |

## `docs/UX_STATES_MATRIX.md` — Topic 19

| Screen | Relevant UI states and proposed behavior | PRD source | Evidence / unresolved behavior |
|---|---|---|---|
| `session-setup` | Default: three option inputs. Loading: show progress while saving. Empty/validation: explain that three distinct options are required by the exercise. Error: do not report success if storage fails. Success: confirm a session only after a save. | FR-001; Q-03 / Q-04 | Copy and behavior are proposals. No save or error path was run. |
| `participant-options` | Loading: indicate options are being retrieved. Empty: explain no options are available without inventing a publication rule. Error: explain missing/unknown session (FR-006) or missing/foreign option (FR-005) and do not write. Success: confirm only after preference save. | FR-002, FR-005, FR-006, BR-001 | Editability Q-01 and identity/access A-01 remain open. No persistence was run. |
| `organizer-review` | Loading: indicate responses are being retrieved. Empty: explain that no preferences are available. Error: do not display stale counts as current. Selection feedback must not claim a durable result until storage is decided. | FR-003; Q-02, Q-04, Q-05 | Tie and selected-result storage/visibility remain unresolved. No response data was created. |
| `selected-result` | Loading: indicate the selected result is being read. Empty: explain that no selection is available yet. Error: do not invent access or retry policy. Success: identify the option named by the organizer. | FR-004; Q-05 | Storage and who may read the result are open. No result was saved or rendered. |

### Cross-cutting checks — apply across all four screens and relevant states

| Dimension | Review task | Evidence |
|---|---|---|
| Responsive behavior | Check narrow and wide layouts selected for the intended devices; keep actions and content reachable without unintended horizontal scrolling. | Design proposal only; viewport review **Not Run**. |
| Accessibility | Check keyboard order/focus, accessible names, RTL prose and LTR IDs/times, contrast against the applicable criterion, and status announcements. | Checklist only; keyboard, screen reader, contrast, and direction checks **Not Run**. |

Responsive behavior and accessibility are review dimensions across UI states, not additional UI states. No visual design or conformance claim is made.

## `docs/SCREEN_INVENTORY.md` — Topic 20

| Screen ID | Candidate path | Role / permission | Goal | Components | Data read / written | Action and validation | State coverage | Requirement source |
|---|---|---|---|---|---|---|---|---|
| `session-setup` | `/sessions/new` | Organizer task label; authorization open | Create one session with three distinct options. | Session title field, three option inputs, save action, status message. | Writes `StudySession` and `TimeOption` rows in the exercise model. | FR-001; distinctness validation. Time format/time zone Q-03. | Default/loading/validation/error/success in `UX_STATES_MATRIX.md`. | FR-001. |
| `participant-options` | `/sessions/:sessionId/options` | Participant task label; shared-link access A-01 unvalidated | Compare listed times and submit one preference. | Session heading, option list, submit action, status message. | Reads session/options; writes one `Preference` for the alias/session. | FR-002 / BR-001; reject missing/foreign options (FR-005) and missing/unknown session (FR-006); editing Q-01. | Loading/empty/error/success plus cross-cutting checks in `UX_STATES_MATRIX.md`. | FR-002, FR-005, FR-006, BR-001. |
| `organizer-review` | `/sessions/:sessionId/review` | Organizer task label; authorization open | Review saved responses and select one listed option. | Response summary, selection control, status message. | Reads preferences; selected-option storage is not represented in the sample schema (Q-05). | FR-003; tie decision Q-02; selection access/storage Q-05. | Loading/empty/error/selection feedback plus cross-cutting checks in `UX_STATES_MATRIX.md`. | FR-003, Q-02, Q-05. |
| `selected-result` | `/sessions/:sessionId/result` | Viewer access unknown (Q-05) | Identify the option selected by the organizer. | Selected-time heading, option details, status. | Reads selected option; storage/access model is unresolved. | FR-004; do not infer a notification or permission rule. | Loading/empty/error/success plus cross-cutting checks in `UX_STATES_MATRIX.md`. | FR-004, Q-05. |

### Requirements-to-screens trace

| PRD source | Screen(s) | Coverage / gap |
|---|---|---|
| FR-001 — propose three distinct options | `session-setup` | Candidate form and validation mapped; persistence not run. |
| FR-002 — submit one preference for a listed option | `participant-options` | Candidate selection and validation mapped; persistence not run. |
| FR-003 — review preferences and select one option | `organizer-review` | Candidate review and selection mapped; tie and selected-option storage remain open. |
| FR-004 — show the organizer-selected result | `selected-result` | Candidate result view mapped; storage and viewer access remain Q-05. |
| FR-005 — reject missing/unlisted option | `participant-options` | No write and explanation mapped as sample validation behavior. |
| FR-006 — reject missing/unknown session | `participant-options` | No write and explanation mapped as sample validation behavior. |
| BR-001 — at most one preference per alias/session | `participant-options` | Storage constraint is in the provisional data sample; no app race test ran. |
| Q-01 / A-01 | `participant-options` | Edit, identity, and link-access rules remain open. |
| Q-02 / Q-05 | `organizer-review`, `selected-result` | Tie handling and selected-result storage/visibility remain open. |
| Q-03 / Q-04 | `session-setup`, `participant-options`, `organizer-review` | Time format and failure/concurrency responses remain open. |

Reverse check: each of the four PRD candidate screens maps to at least one functional requirement; each functional requirement and BR-001 maps to a screen or an explicit unresolved rule. These are not approved routes or roles. No screen, route, interaction, persistence, responsive behavior, or accessibility result was implemented or tested.
