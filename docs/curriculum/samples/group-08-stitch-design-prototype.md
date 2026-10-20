# Group 08 sample outputs — Stitch, design systems, and prototype

No Google Stitch session or design artifact was created for this sample. The outputs below show the learner’s brief/evidence process and a truthful fallback.

## `docs/STITCH_MASTER_PROMPT.md` — Topic 21

```text
Create a low-fidelity participant options screen for the fictional study-group
scheduling exercise. Use only these exercise facts: session title, organizer,
and three candidate times. Keep the Arabic reading direction for prose and
left-to-right direction for identifiers and times. Make the primary action
choose one time. Do not invent colors, branding, authentication, notifications,
or tie behavior. Add UNKNOWN notes for any missing design token.
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

## `docs/STITCH_SCREEN_PROMPTS.md` — one draft per inventoried screen

```text
### participant-options — `/sessions/:sessionId/options`
Source: exercise-only Screen Inventory row `participant-options` and
`docs/UX_STATES_MATRIX.md`; no approved product requirement or rendered screen.
Design one participant options screen for the fictional scheduling exercise.
Show the session heading, listed candidate options, one selection action, and
clear status space. Preserve Arabic RTL prose and LTR identifiers/times. Reuse
only evidence-backed design tokens; current primary color, font, and spacing
scale are UNKNOWN. Plan default, loading, empty, error, and disabled variants
when supported by the source. Permission-denied behavior is unresolved because
the exercise has no approved access policy; keep it UNKNOWN rather than
inventing a role rule. Add success feedback only where a requirement supports
it. Review responsive and keyboard/accessibility requirements across states.
Do not invent authentication,
editing, privacy, notification, or tie behavior. Do not generate code.

### organizer-review — `/sessions/:sessionId/review`
Source: exercise-only Screen Inventory row `organizer-review` and
`docs/UX_STATES_MATRIX.md`; no approved product requirement or rendered screen.
Design one organizer review screen for the fictional scheduling exercise.
Show response summaries and a selection action without assuming tie policy.
Preserve Arabic RTL prose and LTR identifiers/times. Reuse only
evidence-backed design tokens; current primary color, font, and spacing scale
are UNKNOWN. Plan default, loading, empty, error, and disabled variants when
supported by the source. Permission-denied behavior is unresolved because the
exercise has no approved access policy; keep it UNKNOWN rather than inventing a
role rule. Add success feedback only where a requirement supports it. Review
responsive and keyboard/accessibility requirements across states. Do not invent authentication,
notifications, or other product rules. Do not generate code.
```

These prompts are draft handoffs only. With no inspected reference screen, they
cannot demonstrate visual consistency or supply actual token values.

## `docs/PROTOTYPE_JOURNEYS_AUDIT.md` — Topic 23

```markdown
Status: Not Run — no generated Stitch screens or prototype link exists.

Manual journey specification:
1. Session options → select one option → confirmation.
2. Organizer review → selected-time confirmation.

Audit next: activate each control, follow success/empty/tie-open states, test
keyboard focus and mobile layout, and record the actual prototype URL/version.
No interaction, persistence, or accessibility result is claimed here.
```

**Handoff:** If Stitch is unavailable, preserve the prompt and screen inventory, then use the course’s manual design-tool fallback. A prompt is not a rendered screen.
