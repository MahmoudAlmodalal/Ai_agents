# Issue #58 — Group 08: Stitch, Design Systems, and Prototypes

**Status:** Static curriculum review recorded; runtime evidence Not Run; group acceptance/release pending.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:**
1. `stitch-reference-screen` (Topic 21)
2. `design-system-rules` (Topic 22)
3. `interactive-prototype` (Topic 23)

Canonical identities and 58-Topic scope are strictly preserved. No access gates or prerequisite locks are introduced. All topics remain accessible in full reader at `/learn/[slug]`, in quick preview modals, and in `src/data/topics/wave2/t08-stitch-design-system-prototype.ts` and `src/data/learning/group-a-08-stitch-design-prototype.ts`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status in Group 08 |
|---|---|---|---|
| 1 | Group boundary & 58-Topic scope | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 08 contains exactly Topics 21 (`stitch-reference-screen`), 22 (`design-system-rules`), and 23 (`interactive-prototype`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: lesson template in `docs/curriculum/` confirmed. | Confirmed: required template elements inspected in source for all 3 Topics. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | The policy is accepted in DEC-70; runtime scoring, retries, feedback, and attempt retention are Not Run in this packet. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric criteria reference declared output IDs; the accepted scale is learner-reported; editing and persistence behavior are Not Run in this packet. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | Candidate retained with discovery evidence in registry; never marked as approved; status remains candidate. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | This packet does not establish complete evidence or group acceptance; independent verification and end-of-queue owner sign-off remain pending. Review state in content model remains `draft` pending central orchestrator flip. |

---

## 2. Topic Walkthrough and Verification Ledgers

**Review boundary:** The verdicts below record static source/educational inspection only. They do not attest to browser behavior, external-tool execution, learner artifacts, independent verification of a release candidate, or owner acceptance. Runtime state is recorded separately as Not Run.

### Topic 21: `stitch-reference-screen` (تصميم الشاشة المرجعية في Google Stitch)
- **Reviewer:** Curriculum Reviewer (agent/issue-58) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Walkthrough Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `stitchref-objective-prompt` (صياغة برومبت لشاشة مرجعية واحدة تمثل المهمة والهوية والاتجاه) and `stitchref-objective-evidence` (توثيق ما اعتمد وما بقي غير معروف دون اختلاق مواصفات التصميم). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context without access locks | Starting context: PRD, UX Blueprint, and Screen Inventory. Tool access guidance provided for Google Stitch (`https://stitch.withgoogle.com/`) with explicit fallback to Figma/HTML wireframe if tool access is restricted. Prerequisite documents are informative references, not gating locks. | **Static review: present** |
| **Explanation** | Real explanation of concepts, visual drift, and single-screen rule | Detailed explanation: hazards of bulk screen generation causing visual drift, rationale for focusing on one representative MVP screen first, role/status documentation, separating confirmed tokens from `UNKNOWN`, and deferring coding agents to later topics. | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 4 provides BorrowHub Browse Equipment reference screen breakdown explicitly marked as an optional case study («وهو دراسة حالة استرشادية واختيارية توضح طريقة التحليل، ويمكنك استبدالها بشاشة تمثيلية في مشروعك الخاص دون أي قيود»). Full structural SVG diagram (Figure 11) illustrates Navbar, Search/Filter, and Cards Grid with RTL orientation. | **Static review: present** |
| **Practical Steps** | Actionable steps for learner's project with concrete outputs | Two structured practical steps: 1) Select one representative screen from inventory and draft Stitch master prompt with user role, data, RTL, and requirements source; 2) Record design result or generation blocker and classify tokens as confirmed vs `UNKNOWN`. Expected outputs: `docs/STITCH_MASTER_PROMPT.md` and reference screen identifier/link. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompts | Copyable PROMPT 16 (Master Prompt Generator) and copyable PROMPT 19 (Single Screen Refinement) embedded with LTR code blocks and copy affordances; browser clipboard behavior is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `stitch-prompt` (`docs/STITCH_MASTER_PROMPT.md`) and `reference-screen` (a real, inspectable Google Stitch screen with source/link or ID and review state; a labeled fallback may support continuation but does not establish Stitch execution). Supplies documented input for Topic 22 design token extraction without access locks. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `stitchref-q-unknown` (unsupported color recorded as `UNKNOWN`) and `stitchref-q-reference` (starting with one reference screen to anchor visual decisions). 4 options each, keyed correctly, educational rationale inspected statically. Question structure and answer explanations were inspected statically; browser grading, retry, and feedback are Not Run. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (5 items) and rubric criteria `stitchref-r-scope` (bound to `stitch-prompt`) and `stitchref-r-evidence` (bound to `reference-screen`). 3-level scale (`not-yet`, `in-progress`, `ready-for-review`), no mastery threshold. Rubric criteria and scale were inspected statically; editing and reload persistence are Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Google Developers: "From idea to app: Introducing Stitch, a new way to design UIs" (`google-stitch-intro`, URL: `https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/`). Discovery evidence recorded in `externalVideoRegistry.ts`. Retained as candidate; playback/captions unverified. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Structural diagram/wireframe | Figure (11) SVG wireframe diagram of the reference screen with Arabic RTL layout, status badges, and cards grid. SVG source is present; browser visibility and responsiveness are Not Run. | **Static review: present** |

---

### Topic 22: `design-system-rules` (قواعد نظام التصميم وبرومبتات الشاشات المنفصلة)
- **Reviewer:** Curriculum Reviewer (agent/issue-58) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Walkthrough Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `designrules-objective-tokens` (استخراج قواعد ورموز تصميم من الشاشة المرجعية المعتمدة) and `designrules-objective-consistency` (إنشاء برومبتات مستقلة للشاشات تستخدم النظام نفسه ولا تخترع قيماً). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context without access locks | Starting context: inspected reference screen from Topic 21, PRD, and Screen Inventory. Unsupported tokens explicitly kept as `UNKNOWN`. Not locked behind access gates. | **Static review: present** |
| **Explanation** | Real explanation of design tokens, optional rules, and one-prompt-per-screen | Explains: extracting source-backed tokens, treating 60-30-10 color rules and 8px grid as optional project proposals rather than universal laws, WCAG contrast verification (4.5:1 for normal text, 3:1 for large text), 6 UI states (default, loading, empty, error, disabled, permission denied only if specified in PRD), and the "One Prompt Per Screen" architecture to protect LLM context windows. Explicit warning against generating frontend code at this stage. | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 4 provides BorrowHub screen prompt breakdown (SCR-01 through SCR-04 in user-flow order) explicitly marked as an optional case study («كدراسة حالة تطبيقية استرشادية واختيارية؛ تطبق نفس الهيكلية المنفصلة على شاشات مشروعك الخاص دون التقيد ببيانات هذا المثال»). | **Static review: present** |
| **Practical Steps** | Actionable steps for learner's project with concrete outputs | Two structured practical steps: 1) Extract verifiable values from reference screen, document source and confidence, or mark `UNKNOWN`; 2) Author an independent prompt for each screen in inventory referencing approved tokens. Expected outputs: Design system token notes and `docs/STITCH_SCREEN_PROMPTS.md`. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompts | Copyable PROMPT 17 (Stitch Design System) and copyable PROMPT 18 (Generate One Prompt per Screen) embedded with LTR code blocks and copy affordances; browser clipboard behavior is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `screen-prompts` (`docs/STITCH_SCREEN_PROMPTS.md`) and `design-system-evidence` (Stitch screens and tokens with sources). Supplies documented input for Topic 23 interactive prototype transitions. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `designrules-q-token` (most verifiable token record includes name, value, source screen, and confidence) and `designrules-q-prompts` (preventing visual drift by using reviewed tokens from single reference). 4 options each, keyed correctly, educational rationale inspected statically. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `designrules-r-source` (bound to `screen-prompts`) and `designrules-r-consistency` (bound to `design-system-evidence`). 3-level scale, no mastery threshold. Rubric criteria and scale were inspected statically; editing and reload persistence are Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Figma Learn: "Lesson 1: Welcome to design systems" (`figma-design-systems-lesson-1`, URL: `https://help.figma.com/hc/en-us/articles/14552802134807-Lesson-1-Welcome-to-design-systems`). Discovery evidence recorded in `externalVideoRegistry.ts`. Retained as candidate; playback/captions unverified. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Data tables & design cards | 3-column visual cards for color/type/spacing rules, and structured interactive UI states table. | **Static review: present** |

---

### Topic 23: `interactive-prototype` (النموذج التفاعلي والتحقق من الرحلات)
- **Reviewer:** Curriculum Reviewer (agent/issue-58) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Walkthrough Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `prototype-objective-journey` (ربط شاشات النموذج بتفاعلات حقيقية تمثل الرحلات المعتمدة) and `prototype-objective-audit` (تدقيق المسارات السعيدة والفاشلة والعودة والصلاحيات في النموذج). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context without access locks | Starting context: MVP screens from Topic 22, user flows, and PRD. If Stitch linking is unavailable, an explicitly labeled interactive fallback such as Figma Prototype can support the activity; a transition matrix is planning preparation only and does not satisfy the interactive prototype objective. No access locks. | **Static review: present** |
| **Explanation** | Real explanation of behavioral validation vs fake demo buttons | Detailed explanation: rejecting fake demo buttons (`href="#"`), 4-part transition specification (`Origin` -> `Trigger` -> `Destination` -> `Back/Cancel`), comprehensive journey verification matrix covering Happy Path, boundary limits, out-of-stock, empty search, role permissions, and visual UX audit ranking issues (Critical/Major/Minor). | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 2 provides a complete 5-row transition matrix for BorrowHub explicitly marked as an optional case study («وهي دراسة حالة إيضاحية واختيارية توضح آلية تدقيق الانتقالات لتقيس عليها مسارات مشروعك الخاص»). Covers happy path, limit exceeded, out-of-stock, empty search, and role permission denials. | **Static review: present** |
| **Practical Steps** | Actionable steps for learner's project with concrete outputs | Two structured practical steps: 1) Connect MVP screens in Stitch and exercise primary user journey to outcome; 2) Audit happy path, rejection, cancel/back, and role permissions, recording defects and boundaries. Expected outputs: connected interactive prototype and `docs/PROTOTYPE_JOURNEYS_AUDIT.md`. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompts | Copyable PROMPT 20 (Stitch Prototype) and copyable PROMPT 21 (Visual UX Audit) embedded with LTR code blocks and copy affordances; browser clipboard behavior is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `prototype` (an actual interactive prototype in Stitch or an explicitly labeled interactive fallback; a transition matrix alone does not meet the criterion) and `prototype-audit` (`docs/PROTOTYPE_JOURNEYS_AUDIT.md`). Supplies documented validation for Topic 24 frontend planning without access locks. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `prototype-q-functional` (prototype tests interactions and expected outcomes unlike static images) and `prototype-q-audit` (prototype audit must cover happy, failure, back, and role journeys). 4 options each, keyed correctly, educational rationale inspected statically. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `prototype-r-interaction` (bound to `prototype`) and `prototype-r-audit` (bound to `prototype-audit`). 3-level scale, no mastery threshold. Rubric criteria and scale were inspected statically; editing and reload persistence are Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Figma Learn: "FD4B: Prototyping fundamentals" (`figma-prototype-fundamentals`, URL: `https://help.figma.com/hc/en-us/articles/31010011820311-FD4B-Prototyping-fundamentals`). Discovery evidence recorded in `externalVideoRegistry.ts`. Retained as candidate; playback/captions unverified. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Matrix & transition tables | Detailed 5-column transition verification matrix table in Section 2. | **Static review: present** |

---


## 3. Learner Artifact and Runtime Status

The StudySync screen, palette, design system, and prototype data formerly shown below this heading were not obtained from Google Stitch or a learner project. Those fabricated values, “confirmed” decisions, contrast calculations, and browser claims are not evidence and have been removed from the review record.

| Topic | Required learner output and handoff | Status in this packet |
|---|---|---|
| 21 `stitch-reference-screen` | A real, inspectable reference screen with its source/link or ID and review state, plus `docs/STITCH_MASTER_PROMPT.md`; feeds Topic 22 | Prompt instructions reviewed statically. No Stitch screen, Figma/HTML fallback screen, screen ID/link, or approved reference was created or inspected: **Not Run / incomplete**. Google Stitch is the primary named tool; a fallback helps continue planning but does not establish Stitch execution. |
| 22 `design-system-rules` | Source-linked token evidence with confidence/`UNKNOWN`, and per-screen prompts; feeds Topic 23 | No design source was inspected and no token, contrast ratio, accessibility result, or prompt artifact was produced: **Not Run / incomplete**. Unknown values must stay `UNKNOWN`; proposed values cannot be described as confirmed. |
| 23 `interactive-prototype` | An actual connected interactive prototype plus journey audit; feeds Topic 24 | No prototype was created or exercised. A transition matrix is preparation and does not meet the interactive prototype objective or rubric: **Not Run / incomplete**. |

No screen was generated, approved, visually inspected, or tested for responsive behavior, contrast, keyboard access, or assistive technology in this packet. The exact values in the withdrawn mock sample are not product decisions.

## 4. Verification and Acceptance Status

| Evidence item | Status |
|---|---|
| Educational walkthrough of Topics 21–23, required practical steps, output criteria, quizzes/rubrics, and intended handoffs | Static source review recorded. |
| Google Stitch generation, real reference-screen review, token extraction, interactive prototype exercise, and UX audit | **Not Run / incomplete** in this packet. Required outcomes remain required; `Not Run` is not a substitute for them. |
| Browser/e2e/Playwright, rendering, responsive, visual/accessibility, clipboard, quiz/retry, and rubric persistence checks | **Not Run** by this packet; root owns integrated candidate checks. |
| Lint/typecheck, unit tests, and production build | **Not Run** by this packet. |
| Human review of candidate videos | **Deferred** under DEC-70; no candidate is approved. |
| Independent exact-candidate evidence and end-of-queue owner sign-off | **Pending**; group is not improved or released. |

**Handoff:** Topic 21 must provide an actual reference screen before Topic 22 can claim evidence-based design tokens. Topic 22 supplies source-linked tokens and screen prompts to Topic 23. Topic 23 requires a working prototype and tested journey evidence before handing a design outcome to Topic 24. Learners may continue the instructional path when tools are unavailable, but the required result stays incomplete and is reported as `Not Run`.

**Release status:** DEC-70 accepts the lesson template, quiz policy, and descriptive self-assessment scale. Group 08 remains **pending acceptance and not improved/released** until its required evidence is completed, independently verified, and included in the course owner's end-of-queue sign-off list.