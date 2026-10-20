# Group 07 sample outputs — UI/UX planning

This is an illustrative planning set for the fictional scheduling exercise; no user research or screen design was conducted.

## `docs/UI_UX_REQUIREMENTS.md` — Topic 18

```markdown
| Role | Goal | Candidate permissions | Source/state |
|---|---|---|---|
| Organizer | Propose options and communicate a selection | Create session; view responses; select time | Exercise-only |
| Participant | Record and see a preference | View options; submit one preference | Exercise-only; identity/edit rules open |
```

A candidate navigation map is `Home → Session → Options → Preference → Confirmation`; organizer review is a separate route. Confirm labels, permissions, and information structure before implementation.

## `docs/UX_BLUEPRINT.md` — Topic 19

```markdown
| Stage | Participant action | Frontstage | Backstage / support | Open question |
|---|---|---|---|---|
| Share | Open a session link | Session details and options | Organizer creates options | Access/privacy model? |
| Respond | Select a preferred time | Confirmation of submitted choice | Preference saved | Can it be edited? |
| Decide | Wait for selection | Selected time announcement | Organizer reviews responses | Tie handling? |
```

## `docs/UX_STATES_MATRIX.md` — Topic 19

| State | Participant options screen: observable behavior and next action | Organizer review screen: observable behavior and next action | Review evidence |
|---|---|---|---|
| Loading | Show a labeled skeleton for session/options; keep the page title stable. | Show a labeled skeleton for response counts; keep review actions unavailable until data resolves. | Draft only; no screen exists. Verify layout shift and announced status in a prototype. |
| Empty | Explain that no options are listed and point back to the organizer/contact route; do not show a technical error. | Explain that no preferences have arrived; selection remains unavailable. | Draft copy/behavior; confirm empty-session policy with owner. |
| Error | State that options could not be loaded and offer retry or return to the session. | State that responses could not be loaded and offer retry; do not show stale counts as current. | Draft recovery actions; no network/error behavior was run. |
| Success | Show the selected preference and a clear confirmation; editability is an open product question. | Show the selected time and confirmation after organizer choice; tie handling remains open. | Draft success outcomes; persistence and notification are not claimed. |
| Responsive | At a narrow viewport, stack option rows and keep the primary action reachable without horizontal scrolling. | Stack response summaries and keep the selection action reachable. | Design check to perform at 390px and wide viewport; **Not Run**. |
| Accessibility | Give controls names, visible keyboard focus, logical RTL reading order, and LTR treatment for IDs/times. | Make response counts and validation perceivable without color alone; preserve keyboard order and RTL/LTR handling. | Accessibility checklist only; keyboard, contrast, screen-reader and direction checks **Not Run**. |

This matrix is a proposal for the exercise, not evidence of a built interface.

## `docs/SCREEN_INVENTORY.md` — Topic 20

```markdown
| Screen ID | Path | Role / permission | Goal | Components | Data read/written | Action and validation | Error / state coverage | Requirement source |
|---|---|---|---|---|---|---|---|---|
| participant-options | `/sessions/:sessionId/options` | Participant; view this session and submit own choice (exercise proposal) | Compare listed candidate times and submit one preference | Session heading, option list, submit button, status message | Reads session/options; writes proposed preference | Select one listed option; proposed guard rejects an option outside this session | Loading, empty, error, success, narrow viewport, keyboard/RTL-LTR checks in `UX_STATES_MATRIX.md` | `FR-02` exercise-only; replace with source requirement |
| organizer-review | `/sessions/:sessionId/review` | Organizer; view responses and select time (exercise proposal) | Review response counts and record a selection | Response summary, selection controls, status message | Reads session/preferences; writes selected option | Select an option in the session; tie resolution remains open | Loading, empty, error, success, narrow viewport, keyboard/RTL-LTR checks in `UX_STATES_MATRIX.md` | `FR-04` / `Q-02` exercise IDs only; source behavior open |
```

### Bidirectional trace exercise

| Requirement placeholder | Screen | Coverage / gap |
|---|---|---|
| `FR-02` — participant can record one preference (exercise placeholder) | `participant-options` | Proposed coverage; verify source and choice/edit rules before implementation. |
| `FR-04` — organizer can review and select (exercise placeholder) | `organizer-review` | Proposed coverage; tie behavior remains open. |
| Session privacy, authentication, and notification rules | None assigned | Explicit uncovered questions; do not invent screens or permissions to fill the gap. |

Reverse check: every listed screen points to an exercise requirement placeholder; every placeholder above either maps to a screen or names an unresolved gap. These are not approved PRD IDs. No route, component, validation, error, responsive, or accessibility behavior has been implemented or tested.
