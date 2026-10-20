# Issue #51 — Group 01: Idea and MVP

**Status:** Authoring draft prepared; group release is blocked pending course-owner approval and independent educational review.

**Proposed membership:** `project-idea-mvp` (Topic 01 only), matching the current proposed roadmap. The group boundary is not approved. No access gates are introduced and the published Topic remains available in `scripts/topics/topic01.ts`.

## Owner decision package

Please review each decision separately. A decision on one item does not imply the others.

1. **First-group boundary:** accept Group 01 as Topic 01 `project-idea-mvp`, or specify changed membership. If membership changes, the course map must be reconciled before release.
2. **Lesson template:** accept or revise the proposed required elements below. The new activity data supplements the substantial existing Arabic lesson; it does not replace it.
3. **Quiz scoring proposal:** accept or revise one point per correct response, zero for incorrect/unanswered, feedback after submission, unlimited retries, and retention of all attempts. It is preview-only until explicitly approved.
4. **Practical self-assessment proposal:** accept or revise the policy proposal’s three descriptive levels: “not started” (`not-yet`), “in progress” (`in-progress`), and “ready for review” (`ready-for-review`). The last label means the learner can point to evidence for a review request; it does not mean that evidence has been verified. No mastery or completion threshold applies.
5. **Video review checklist:** accept or revise `video-review-checklist.md`.
6. **Representative video:** approve or reject the candidate described in `issue47-video-candidate-evidence.md` after checking playback, accessibility, and educational fit. A candidate source does not count as approval.

**Owner / date / decision reference:** Pending for all six items.

## Proposed complete lesson template

| Required element | Group 01 evidence | Review state |
|---|---|---|
| Objective and purpose | `topic01.ts` states the goal and output; `group-a.ts` adds two stable learning objectives. | Draft |
| Starting input and prerequisites | Existing lesson says programming basics and a problem to understand are enough; no coding agent, Skill, or MCP setup is needed. | Draft |
| Explanation of terms and decisions | Existing lesson explains problem vs. feature, a complete MVP journey, decisions, assumptions, and open questions; the supplement clarifies the handoff to Grill Me. | Draft |
| Worked example | Existing detailed BorrowHub example remains optional and marks its facts, assumptions, and unverified details. | Draft |
| Practical Steps | Learner writes a problem statement and a complete MVP journey with explicitly deferred features. | Draft |
| Prompt | Existing copyable project-context review prompt asks for evidence, forbids invented rules, and asks one question at a time. | Draft; prompt policy unapproved |
| Exercise | Apply the method to the learner’s own project; BorrowHub is available only as optional practice. | Draft |
| Expected output | `docs/PROJECT_CONTEXT.md` with source-labeled decisions, assumptions, questions, scope, and an observable success scenario. | Draft |
| Objective quiz | Two topic-specific questions distinguish an unverified assumption and a complete MVP journey. | Preview-only |
| Checklist and rubric | Existing checklist remains visible; new proposed rubric ties criteria to the project-context artifact. | Self-assessment proposal; policy unapproved |
| External video | One researched candidate for `project-idea-mvp`; no other video is implied. | Candidate; owner review pending |
| Diagrams | None required for this Topic’s written context output. Add only if a learner’s chosen example benefits from one. | Not applicable to this Topic |

## Learner-project walkthrough

The following is a worked sample artifact for a fictional study-group scheduling project. It is an authoring example, not user research or an approved product decision.

```markdown
# Project context: Study-group scheduling

Status: fictional exercise; no interviews have been conducted.

## Problem and source
Hypothesis: a student organizer needs a clear way to collect possible meeting
times and tell a study group which time was selected. This statement is an
exercise assumption, not a verified need.

## Users and value
- Organizer: proposes times and communicates the selected time.
- Participant: indicates a preferred time and sees the result.
Value to test: the group can reach and see one confirmed meeting time.

## Proposed MVP journey for the exercise
1. The organizer shares three possible meeting times.
2. Participants choose a preferred time.
3. The organizer reviews responses, chooses a time, and shares the result.

## Deferred
- Calendar synchronization: the basic collect-and-share journey can be tried
  without connecting personal calendars.
- Automatic time recommendations: the exercise can test whether collecting
  preferences is useful before adding recommendations.

## Exercise decisions (not decisions for a real product)
- One organizer starts the exercise and shares the options.
- Participants may submit one preferred option.

## Assumptions to check
- Participants will use a shared link to submit a preference.
- The organizer can contact participants through an existing channel.

## Open questions for Grill Me
- Can a participant change a submitted preference? Ask the project owner.
- What should happen if the most-selected options are tied? Ask the project owner.

## Observable review scenario
Given three proposed times and participant responses, a reviewer can follow
the artifact to see which time the organizer selected and how the group learns
the result. Tie handling remains open until the project owner decides it.

## Next step
Use this file as input to Topic 02 Grill Me; resolve open questions without
letting the assistant invent product rules.
```

**Author dry run:** Passed for artifact-to-next-step handoff only. The saved output name matches the current Topic 01 source and the next Topic’s stated input. This was an author self-check, not an independent educational review.

## Review record

- Existing lesson inspected: `scripts/topics/topic01.ts`, including prerequisites, BorrowHub worked example, learner exercise/template, copyable review prompt, checklist, and link to Grill Me.
- Supplemental artifact: `src/data/learning/group-a.ts`, quiz and rubric IDs stable within `project-idea-mvp`, policy approvals explicitly proposed, review state `draft`. Practical outputs retain semantic IDs (`project-context`, `next-topic-input`), and rubric criteria name their output IDs directly.
- Source-output handoff: `docs/PROJECT_CONTEXT.md` is the input to existing Topic 02, `discovery-grill-me`; Topic 02’s existing goal produces `docs/DECISIONS_LOG.md` and unresolved questions. It is guidance, never an access condition.
- Templates/documents: the copyable context template already exists inside the Topic 01 reader. No separate downloadable template asset is claimed.
- Narrow independent review by `root` on 2026-10-20: **Passed** for both Topic 01 question answer keys/rationales, the sample’s separation of assumptions from fictional exercise decisions and useful complete journey, and the two artifact-bound rubric criteria. This does not cover the full lesson walkthrough, browser rendering, policies, video playback/captions, or owner acceptance.
- Full lesson walkthrough and review of the learning experience beyond the cited narrow evidence: **Not Run**. The narrow review above covers the stated question keys/rationales, sample assumptions and journey, and artifact-bound criteria only; the author dry run covers source/output continuity.
- Course-owner boundary/template/policy/video decisions: **Pending**.
- Release status: **Not improved**. The roadmap’s approval and compliance flags remain unchanged.

## Unresolved before release

- Owner approval of the group boundary and complete template.
- Independent review of the complete lesson and any sample, question, rubric, or expected-output details beyond the narrow passed evidence recorded above.
- Owner approval of quiz scoring and rubric policies.
- Playback and accessibility checks of the candidate video, direct educational review, and owner decision.
- A documented group walkthrough and owner acceptance after the preceding decisions.
