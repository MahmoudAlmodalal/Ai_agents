# Curriculum A independent re-review — 2026-10-20

**Reviewer:** assessments agent (`/root/assessments`)
**Reviewed source revision:** `25e07950c5abdea14e4ced3c8f448e35423b209c` on `resume/curriculum_a`.
**Scope:** Independent static re-review of Topics 01–29 sample artifacts and their lesson handoffs after Curriculum A's corrections. The earlier `curriculum-a-cross-review-2026-10-20.md` records the review of revision `65780d7fe148a11533c6c1457c8cfe7f4fe3550f`; its superseded findings are retained there as history. This report records the corrected state and remaining limitations at the exact source revision above.

## Review method and limits

- `git diff --check` from `aa50ccdf59643de533adedcca395dd550fa3e3b4` through the reviewed source revision: **Passed**.
- Sample scan found eight Mermaid code fences: **Passed** for enumeration. Two fenced JSON blocks parsed successfully: **Passed**.
- Sample Mermaid browser rendering: **Not Run** pending the root's exclusive full-suite and integration-visual slot. A Playwright script is prepared to use the installed Mermaid bundle, save each actual SVG, and record its text labels and dimensions; no parse-only check is represented as visual evidence.
- PlantUML rendering, Git/GitHub actions, Stitch, AI Studio, MCP, external video playback/captions/accessibility, learner browser journeys, mobile/keyboard/screen-reader testing, and project-owner decisions: **Not Run**.
- Static status assesses whether the sample packet demonstrates the stated artifact/handoff shape. It does not imply implementation, source-owner approval, course-owner acceptance, or external-tool success. `Partial` means the static packet is useful but a required generated/tool artifact or decision remains outstanding. `Not Run` identifies an activity/output requiring a real tool or environment that was not exercised.

## Per-topic results

| Topic | Status | Static finding and outstanding evidence |
|---|---|---|
| 01 `project-idea-mvp` | **Pass** | Fictional context and MVP boundary provide a usable sample input. No user interview or owner validation. |
| 02 `discovery-grill-me` | **Pass** | Decision log distinguishes exercise choices, assumption, and open questions; the PRD handoff preserves uncertainty. No interview was run. |
| 03 `prd-specification` | **Pass** | Revised sample supplies the 27-section PRD, prioritized/source-labeled requirements, and a seven-finding review. It remains fictional and unapproved. |
| 04 `srs` | **Pass** | Revised SRS includes ten scenarios for valid/invalid input, missing session, duplicates, concurrent invariant, review/selection, result view, and storage outage, with trace rows. No runtime behavior or owner policy was tested. |
| 05 `git-project-docs` | **Not Run** | README, `.gitignore`, and command transcript are clearly illustrative. No local learner-exercise repository/status/diff/commit was created. |
| 06 `github-docs-collaboration` | **Not Run** | The PR description is a reviewable draft and accurately claims no remote or PR. No GitHub account, branch, PR, or review was created. |
| 07 `mermaid-syntax` | **Pass** | README now includes a small `flowchart TD` syntax sample with purpose and semantic-limit notes. Browser rendering remains **Not Run**. |
| 08 `user-flow-modeling` | **Pass** | Flow includes setup, missing-session and invalid-option branches, save, review, open tie, selected result, Arabic explanation, and a static PRD trace. Rendering and owner validation remain **Not Run**. |
| 09 `conceptual-domain-model` | **Pass** | The artifact is a business-language `flowchart LR`, explicitly distinguished from a class diagram/ERD. Relationship source validation and rendering remain **Not Run**. |
| 10 `plantuml` | **Pass** | README explains PlantUML's exercise use and limits; the group contains a PlantUML source handoff. Editor rendering and UML verification remain **Not Run**. |
| 11 `use-case-diagram` | **Partial** | PlantUML source and explanation exist. FR-004's result use case intentionally has no actor association because Q-05 leaves the viewer unknown. PlantUML rendering and independent role/permission validation remain **Not Run**. |
| 12 `activity-diagram` | **Pass** | Mermaid `flowchart TD` has session/option guards, save, success/error branches, tie-open handling, explanation, and static FR/Q mapping. Browser rendering and independent source-trace validation remain **Not Run**. |
| 13 `state-diagram` | **Pass** | Mermaid `stateDiagram-v2` is accompanied by a transition table and explanation; tie handling and result storage remain open rather than invented. Browser rendering and domain validation remain **Not Run**. |
| 14 `relational-erd-design` | **Pass** | Mermaid ERD now marks PK/FK fields and explains that the composite same-session key is represented in DBML. Browser/ERD rendering and DBML validation remain **Not Run**. |
| 15 `dbml-dbdiagram-io` | **Partial** | DBML and a hand-transcribed SQLite comparison preview are present. The sample explicitly marks the actual dbdiagram link and tool-generated PostgreSQL export **Not Run / incomplete**; DBML parsing and PostgreSQL execution were not performed. The separate SQLite probe only covers manually translated DDL semantics. |
| 16 `sequence-diagram-modeling` | **Pass** | Sequence source now checks session and option, saves a valid preference, and models duplicate/storage failure without claiming an implementation. Mermaid rendering and service/database execution remain **Not Run**. |
| 17 `class-diagram-design` | **Pass** | Class source includes operations/repositories corresponding to sequence messages and a responsibility mapping; selected-result storage is explicitly Q-05. Rendering and code/database validation remain **Not Run**. |
| 18 `ui-ux-roles-navigation` | **Partial** | Sample includes role/task needs, a candidate navigation sequence, and a visibility/action/source matrix. Authorization, shared-link access, result-reader role, and owner decisions remain open. No interface or access policy was tested. |
| 19 `ux-blueprint` | **Partial** | Sample has a four-screen sitemap and journey, relevant loading/empty/error/success states for each candidate screen, and separate responsive/accessibility checks. Visual design, responsive, keyboard, contrast, screen-reader, and RTL/LTR verification remain **Not Run**. |
| 20 `screen-inventory` | **Partial** | Four candidate screens have paths, roles, goal, components, data, actions/validation, state coverage, and sources; the trace maps FR-001–FR-006 and BR-001. Routes and roles are exercise placeholders; owner/browser validation remains **Not Run**. |
| 21 `stitch-reference-screen` | **Partial** | Master prompt targets one representative `participant-options` screen, labeled an exercise choice. No Stitch screen was generated or inspected; reference review and token extraction remain **Not Run**. |
| 22 `design-system-rules` | **Partial** | Static evidence table keeps unsupported tokens `UNKNOWN`; four separate prompts cover the four inventory screens. No design system was inspected, no token approved, and visual consistency remains **Not Run**. |
| 23 `interactive-prototype` | **Not Run** | Audit contains a manual journey specification and clearly says no screens/prototype exist. No interaction, prototype URL/version, or journey audit was run. |
| 24 `ai-coding-agent` | **Pass** | Safe task boundary, placeholder `.env.example`, and ignore guidance are present as sample text. No coding agent or repository task was executed. |
| 25 `google-ai-studio` | **Pass** | Workflow fields are documented and the synthetic fixture parses as JSON and matches the provisional record shape. No AI Studio session/model/output or database import was run. |
| 26 `agent-skills` | **Pass** | Narrow Skill draft has trigger, scope, evidence, and test-limit guidance. It was not installed or invoked. |
| 27 `mcp-protocol` | **Pass** | Static packet distinguishes host/client/server, illustrative tool/resource/prompt types, a least-scope permission matrix, and non-executable placeholders. No server/capability/authorization behavior was checked. |
| 28 `stitch-mcp-integration` | **Partial** | Connection and screen-reference records truthfully state **Not Run** and provide a manual fallback. No client, project, authorization, screen export, or actual reference was read. |
| 29 `design-md-spec` | **Pass** | Prompt uses the target tool's documented format and explicitly says the YAML-frontmatter/Markdown example is optional, not a universal Google format. Values remain `UNKNOWN`; no live source extraction, target-tool parsing/lint, contrast, or rendered-screen review was run. |

## Remaining review limits

The sample packet documents unresolved T15 export/link work rather than claiming completion. T11 PlantUML and all sample Mermaid browser renderings remain **Not Run**. Topics 05–06 and 21–29 include truthful draft/manual-fallback records but no local/remote product actions or live tool outputs. External videos have not been checked for availability, playback, transcript/captions, or accessibility. Assessment-policy, roadmap/template, and sample product decisions remain proposed or open; no owner approval or release decision is inferred.

This re-review supersedes the earlier static gap findings in `curriculum-a-cross-review-2026-10-20.md` only for the corrected sample/handoff state at `25e0795`. It does not revise that historical record, assert a browser-render pass, or approve any lesson, policy, external source, or curriculum group for release.
