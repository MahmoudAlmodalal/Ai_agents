# Issue #60 — Group 10: Stitch MCP and DESIGN.md Specification

**Status:** Static curriculum review recorded; runtime evidence Not Run; group acceptance/release pending.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:** `stitch-mcp-integration` (Topic 28) and `design-md-spec` (Topic 29). Canonical identities preserved. No access gates or prerequisite locks are introduced, and the published Topics remain accessible at `/learn/stitch-mcp-integration` and `/learn/design-md-spec`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status |
|---|---|---|---|
| 1 | Group boundary & 58-Topic preservation | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 10 contains exactly 2 Topics (`stitch-mcp-integration`, `design-md-spec`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: template in `docs/curriculum/` confirmed. | Confirmed: required template elements inspected in source for both Topics. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | DEC-70 accepts the quiz policy; runtime scoring, retries, feedback, and attempt retention are Not Run in this packet. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric scale matches policy; DEC-70 accepts the self-reported scale; learner ratings do not assert independent correctness. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | Candidates retained with discovery evidence; never marked approved. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | This packet does not establish complete evidence or group acceptance; independent verification and end-of-queue owner sign-off remain pending. |

---

## 2. Topic Walkthrough and Verification Ledgers

**Review boundary:** The verdicts below record static source/educational inspection only. They do not attest to browser behavior, external-tool execution, learner artifacts, independent verification of a release candidate, or owner acceptance. Runtime state is recorded separately as Not Run.

### Topic 28: `stitch-mcp-integration`
Reviewer: Curriculum Reviewer (agent/issue-60) & independent question/rubric review by `root`  
Review Date: 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `stitchmcp-objective-connect` (التحقق من اتصال Stitch MCP قراءةً فقط بعد وجود مشروع وشاشة معتمدة) and `stitchmcp-objective-fallback` (توفير مسار يدوي عند غياب الاتصال وعدم كشف المفتاح). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Stated in section 1: requires approved design screens from Topics 21–23 and MCP foundation from Topics 24 and 27. Explicitly noted as non-blocking guidance: all topics remain open without prerequisite access locks. | **Static review: present** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains engineering purpose of Stitch MCP (reading design metadata into local environment), secrets governance (strict isolation, no API keys committed to Git or shown in examples, use of `~/.antigravity/mcp_settings.json` or `.env.local`), read-only restriction via PROMPT 22, and full manual fallback workflow. | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | BorrowHub example explicitly labeled optional (`BorrowHub Equipment Share (أو مشروع الطالب الخاص)`). Demonstrates manual fallback: exporting screen, manual inspect of visible tokens, recording hex values, marking unverified attributes as `UNKNOWN`, and avoiding false claims of MCP integration. | **Static review: present** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | 6 numbered steps in topic record + 2 concrete steps in structured learning activities guiding learner through read-only verification query and manual fallback recording. Expected outputs: `docs/mcp/stitch-connection.md` and `docs/STITCH_SCREEN_REFERENCES.md`. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Copyable local MCP configuration template, copyable PROMPT 22 (Stitch MCP Connection Verification) enforcing read-only constraints, and copyable template for `docs/STITCH_SCREEN_REFERENCES.md`. Prompt/config/template source is present; browser clipboard behavior is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `stitch-reference` (`docs/STITCH_SCREEN_REFERENCES.md`) and `stitch-connection` (`docs/mcp/stitch-connection.md`), supplying documented handoff to Topic 29 `design-md-spec` without access locks. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `stitchmcp-q-scope` and `stitchmcp-q-fallback`: 4 options each, keyed correctly (0 and 1), educational explanations provided. Independent educational review by `root` recorded. Question structure and answer explanations were inspected statically; browser grading, retry, and feedback are Not Run. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Application checklist (6 items) and rubric criteria `stitchmcp-r-readonly` (bound to `stitch-connection`) and `stitchmcp-r-fallback` (bound to `stitch-reference`). 3-level scale, no mastery threshold. Independent educational review by `root` recorded. Rubric criteria and scale were inspected statically; editing and reload persistence are Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Alex Hitt: "Google Stitch MCP Tutorial: Watch Me Convert a UI Design to Code in VS Code" (`alex-hitt-stitch-mcp`, URL: `https://zolotube.com/watch?v=8uz1EMPMm0M`, source: Google Codelab). Official Google Codelab noted as authoritative reference. Discovery evidence documented in `externalVideoRegistry.ts`. Retained as candidate; approval deferred. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Diagram where relevant | Custom SVG architecture diagram source illustrating local machine safe zone, coding agent, local Stitch MCP server with isolated key, Google Stitch Cloud API, deliverable output box, and manual fallback path; browser rendering is Not Run. | **Static review: present** |

---

### Topic 29: `design-md-spec`
Reviewer: Curriculum Reviewer (agent/issue-60) & independent question/rubric review by `root`  
Review Date: 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `designmd-objective-spec` (كتابة DESIGN.md من هوية وقيم تصميم يمكن تأكيدها في مصادر معتمدة) and `designmd-objective-trace` (ربط كل token بالشاشة والمصدر والثقة وترك غير المتاح مجهولاً). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Stated in section 1: requires approved design references from Topic 28 (via MCP or manual export), inventory from Topic 22, and PRD from Topic 03. Explicitly noted as non-blocking guidance. | **Static review: present** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains core engineering principle: `DESIGN.md` as visual contract reflecting real approved decisions without inventing identity or overriding PRD requirements; presents YAML Frontmatter + Markdown explanation as proposed exercise handoff structure; addresses WCAG AA contrast measurement and RTL directionality rules. | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | BorrowHub example explicitly labeled optional (`# Illustrative example only. Replace from your actual approved prototype.`). Shows token extraction and rationale without invented hex, keeping unverified items as `UNKNOWN`. | **Static review: present** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | 6 numbered steps in topic record + 2 concrete steps in structured learning activities guiding learner through token extraction into `docs/DESIGN_TOKENS.md` and writing design rules in `DESIGN.md`. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Copyable PROMPT 23 (Extract DESIGN.md from Stitch) enforcing no invented values and read-only protection, plus copyable concrete `DESIGN.md` template with YAML tokens and Markdown rationale. Prompt/config/template source is present; browser clipboard behavior is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `design-md` (`DESIGN.md`) and `design-tokens` (`docs/DESIGN_TOKENS.md`), supplying documented handoff to frontend topics (Topic 30 TypeScript and Topic 31 Next.js/Tailwind) without access locks. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `designmd-q-unknown` and `designmd-q-role`: 4 options each, keyed correctly (1 and 2), educational explanations provided. Independent educational review by `root` recorded. Question structure and answer explanations were inspected statically; browser grading, retry, and feedback are Not Run. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Application checklist (6 items) and rubric criteria `designmd-r-token` (bound to `design-tokens`) and `designmd-r-scope` (bound to `design-md`). 3-level scale, no mastery threshold. Independent educational review by `root` recorded. Rubric criteria and scale were inspected statically; editing and reload persistence are Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Google Labs: "Stitch DESIGN.md: portable design system format (Google Labs video)" (`google-design-md-video`, URL: `https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/`). Discovery evidence documented in `externalVideoRegistry.ts`. Retained as candidate; approval deferred. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Diagram where relevant | Custom SVG workflow diagram source illustrating the proposed extraction and human visual-parity review; browser rendering and the described workflow are Not Run. | **Static review: present** |

---


## 3. Learner Artifact and Service Evidence Status

The StudySync project, screen IDs, MCP connection log, permission checks, color palette, token values, WCAG ratios, and responsive/accessibility results formerly presented below were fabricated for this packet. They were not obtained from Stitch, an MCP server, a browser, or a learner project and are removed from the evidence record.

| Topic | Required learner output and handoff | Status in this packet |
|---|---|---|
| 28 `stitch-mcp-integration` | If using MCP: an actual read-only connection record in `docs/mcp/stitch-connection.md`; actual screen references in `docs/STITCH_SCREEN_REFERENCES.md`; preserve the manual export path if MCP is unavailable. The reference source feeds Topic 29. | No host, server, key, project, screen, asset, or connection was configured or inspected. No approval, permission audit, secret check, or output is established: **Not Run / incomplete**. No `stitch-connection.md` or real screen reference is claimed as produced. |
| 29 `design-md-spec` | Evidence-backed `docs/DESIGN_TOKENS.md` plus `DESIGN.md`, with each claimed value linked to a real approved source and unknowns left `UNKNOWN`; handoff to frontend Topics 30–31 | No reference screen or design token source exists in this packet. No token, hex value, font, spacing, contrast ratio, WCAG result, or visual parity finding was measured: **Not Run / incomplete**. No `DESIGN.md` or token artifact is claimed as produced. |

A configuration or read-only connection claim requires an actual host/version, local setup, source-backed permission review, and recorded query result. A `DESIGN.md` completion claim requires actual approved design evidence; placeholder values and proposed tokens remain unconfirmed. Manual fallback can support the lesson when MCP is unavailable, but must record a real exported/inspectable screen and cannot be represented as MCP execution.

## 4. Verification and Acceptance Status

| Evidence item | Status |
|---|---|
| Educational walkthrough of Topics 28–29, objectives, safety boundaries, practical steps, expected outputs, questions/rubrics, and frontend handoff | Static source review recorded. |
| Stitch MCP configuration/query, read-only scope, secret handling, screen/asset inspection, manual export, token extraction, contrast/accessibility, and design parity | **Not Run / incomplete** in this packet. |
| Browser/e2e/Playwright, SVG display, clipboard, quiz/retry, rubric persistence, responsive, visual/accessibility checks | **Not Run** by this packet; root owns integrated candidate checks. |
| Lint/typecheck, unit tests, and production build | **Not Run** by this packet. |
| Human review of candidate videos | **Deferred** under DEC-70; no candidate is approved. |
| Independent exact-candidate evidence and end-of-queue owner sign-off | **Pending**; group is not improved or released. |

**Handoff:** Topic 28 supplies actual inspected screen/reference evidence through MCP or a documented manual route. Topic 29 must derive tokens only from that evidence and carries the resulting design contract into frontend Topics 30–31. With neither the reference evidence nor execution in this packet, that handoff is planned, not complete.

**Release status:** DEC-70 accepts the lesson template, quiz policy, and descriptive self-assessment policy. Group 10 remains **pending acceptance and not improved/released** until required artifacts and independent evidence are complete and it is explicitly included in the course owner's end-of-queue sign-off list.