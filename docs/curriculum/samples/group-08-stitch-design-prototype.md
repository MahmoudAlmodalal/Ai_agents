# Group 08 sample outputs — Stitch, design systems, and prototype

No Google Stitch session or design artifact was created for this sample. Topic 21 has one static master prompt for a representative reference screen; Topic 22 has four separate static prompts for the four candidate screens in `docs/SCREEN_INVENTORY.md`. The selected reference screen is an exercise choice, not an approved product decision; none of these prompts is evidence of a generated screen.

## `docs/STITCH_MASTER_PROMPT.md` — Topic 21

```text
Create one low-fidelity reference screen for `participant-options` (SCR-02),
candidate route `/sessions/:sessionId/options`, in the fictional study-group
scheduling exercise. This is the sample author's representative-screen
exercise choice, not an approved screen or role permission. Use only the
`SCREEN_INVENTORY.md` and linked PRD requirements; do not design the other
screens in this prompt.

Purpose: let a participant compare the listed times and submit one listed
option (FR-002). Arrange a session heading, option list with a single-choice
control, and a clearly labeled submit action. Include status space for loading,
empty, error, and success feedback from the inventory. Keep Arabic prose RTL
and identifiers/times LTR. Identity and shared-link access remain unresolved
(A-01); edit behavior is Q-01. Do not invent authentication, privacy,
notification, or permission behavior.

Use only evidence-backed design tokens. Primary color, font, and spacing
values are UNKNOWN because no reference has been inspected. Mark unresolved
values UNKNOWN. Return this one screen design only; do not generate frontend
code.
```

## `docs/DESIGN_SYSTEM_EVIDENCE.md` — Topic 22

```markdown
| Token | Observed value | Source | Confidence |
|---|---|---|---|
| Primary color | UNKNOWN | No inspected reference screen | Unknown |
| Body font | UNKNOWN | No inspected reference screen | Unknown |
| Spacing scale | UNKNOWN | No inspected reference screen | Unknown |
| Arabic direction | RTL prose requested by exercise | Sample prompt | Exercise input, not visual proof |
```

## `docs/STITCH_SCREEN_PROMPTS.md` — one prompt for each inventory screen

### `session-setup` — SCR-01 — Organizer — FR-001

```text
Design one low-fidelity screen for `session-setup` (SCR-01), candidate
route `/sessions/new`. Source: fictional PRD FR-001 and
`docs/SCREEN_INVENTORY.md`; no product owner accepted this behavior.

Purpose: let the Organizer enter one session and exactly three distinct
candidate times. Use this hierarchy: session title; three clearly labeled time
inputs; validation/status area; primary save action. Show only content and
components needed for FR-001. Do not add account setup, invitations, sharing,
or notifications. The shared-link assumption A-01 remains unresolved.

Data: exercise `StudySession` and `TimeOption` records. Validation: require
three distinct options as the exercise choice; timestamp format and time zone
are UNKNOWN (Q-03). Include default, loading, empty/validation, error, and
success feedback as draft states; do not imply persistence succeeded until a
save is reported. There is no approved post-save destination; keep navigation
open instead of adding a route transition.

Use only source-backed visual values and write UNKNOWN for unobserved tokens.
Review responsive behavior, keyboard/focus, contrast, and RTL/LTR across
states; these are review dimensions, not additional UI states. Permission
denied behavior is not specified. Do not generate code.
```

### `participant-options` — SCR-02 — Participant — FR-002 / FR-005 / FR-006 / BR-001

```text
Design one low-fidelity screen for `participant-options` (SCR-02),
candidate route `/sessions/:sessionId/options`. Source: fictional PRD
FR-002, FR-005, FR-006, BR-001, and `docs/SCREEN_INVENTORY.md`.

Purpose: let a participant compare listed times and submit one listed option.
Hierarchy: session title; listed options; one-choice selection control; status
or validation area; submit action. Data: read one session and its options;
submit one preference referencing the same session and option. Reject a
missing/foreign option and a missing/unknown session without a preference
write. Preserve the one-preference-per-alias/session invariant as an exercise
rule. Identity and link access remain unresolved (A-01); edit behavior is Q-01.

Include default, loading, empty, error, and success feedback as appropriate.
The post-submit destination is unspecified; do not add an unapproved route.
Do not invent the empty-session policy, authentication, privacy, or a link
sharing mechanism. Use only source-backed design values; keep tokens UNKNOWN.
Review responsive behavior, keyboard/focus, contrast, and RTL/LTR across
states as cross-cutting checks. Do not generate code.
```

### `organizer-review` — SCR-03 — Organizer — FR-003

```text
Design one low-fidelity screen for `organizer-review` (SCR-03),
candidate route `/sessions/:sessionId/review`. Source: fictional PRD FR-003
and `docs/SCREEN_INVENTORY.md`.

Purpose: let the Organizer review saved preferences and select one listed
option. Hierarchy: session title; response summary; listed options and their
counts; selection control; status area. Data: read this session's saved
preferences and options. Show a tie as unresolved (Q-02); do not choose a
winner. Selected-option storage and who may read the result remain open (Q-05),
so do not imply a durable save, permission rule, or notification.

Include default, loading, empty, error, and selection-feedback states only as
supported by the exercise. If a selection is made, show local feedback without
claiming persistence; the transition to the result view is pending Q-05. Keep
tokens UNKNOWN unless supported by an inspected
reference. Review responsive behavior, keyboard/focus, contrast, and RTL/LTR
across states as cross-cutting checks. Permission denied is not specified.
Do not generate code.
```

### `selected-result` — SCR-04 — viewer role unknown — FR-004 / Q-05

```text
Design one low-fidelity screen for `selected-result` (SCR-04),
candidate route `/sessions/:sessionId/result`. Source: fictional PRD FR-004
and `docs/SCREEN_INVENTORY.md`.

Purpose: identify the option selected by the Organizer. Hierarchy: session
title; selected time; concise result status. Do not add an announcement,
calendar link, or secondary action. The PRD does not decide where the selected
option is stored or who may view it (Q-05); do not invent a viewer permission
or imply the result can be retrieved before that decision is made.

Include loading, empty/no-selection, error, and success presentation as draft
states. The destination after viewing the result is unspecified. Use only
evidence-backed design values; keep unobserved tokens UNKNOWN.
Review responsive behavior, keyboard/focus, contrast, and RTL/LTR across
states as cross-cutting checks. Do not generate code.
```

These four prompts cover the four candidate screens in the current inventory.
With no inspected reference screen, they cannot demonstrate visual consistency
or supply actual token values. No Stitch artifact was generated.

## `docs/PROTOTYPE_JOURNEYS_AUDIT.md` — Topic 23

Status: **Not Run** — no generated Stitch screens or prototype link exists.

Manual journey specification:
1. `session-setup` → participant opens the session → `participant-options` →
   organizer reviews saved preferences → `organizer-review`.
2. After the organizer's selection and resolution of Q-05, `selected-result`
   identifies the selected option. Tie handling Q-02 remains unresolved.

Audit next: activate each control, follow success/empty/error and tie-open
states, test keyboard focus and mobile layout, and record the actual prototype
URL/version. No interaction, persistence, or accessibility result is claimed.

**Handoff:** If Stitch is unavailable, preserve the prompts and inventory, then
use the course's manual design-tool fallback. A prompt is not a rendered screen.
