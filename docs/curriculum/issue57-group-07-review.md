# Issue #57 — Group 07: UI/UX Planning (Roles, Navigation, Blueprint & Screen Inventory)

**Status:** Static curriculum review recorded; runtime evidence Not Run; group acceptance/release pending.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:** `ui-ux-roles-navigation`, `ux-blueprint`, `screen-inventory` (Topics 18, 19, 20). Canonical identities preserved. No access gates or prerequisite locks are introduced, and all published Topics remain accessible at `/learn/ui-ux-roles-navigation`, `/learn/ux-blueprint`, and `/learn/screen-inventory`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status |
|---|---|---|---|
| 1 | Group boundary & 58-Topic preservation | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 07 contains exactly Topics 18, 19, 20 (`ui-ux-roles-navigation`, `ux-blueprint`, `screen-inventory`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: template in `docs/curriculum/` confirmed. | Confirmed: required template elements inspected in source across all 3 Topics. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | DEC-70 accepts the quiz policy; runtime scoring, retries, feedback, and attempt retention are Not Run in this packet. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric scale matches policy; DEC-70 accepts the self-reported scale; learner ratings do not assert independent correctness. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | All 3 video candidates retained with discovery evidence; never marked approved. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | This packet does not establish complete evidence or group acceptance; independent verification and end-of-queue owner sign-off remain pending. |

---

## 2. Walkthrough and Verification Ledgers

**Review boundary:** The verdicts below record static source/educational inspection only. They do not attest to browser behavior, external-tool execution, learner artifacts, independent verification of a release candidate, or owner acceptance. Runtime state is recorded separately as Not Run.

### Topic 18: `ui-ux-roles-navigation`
- **Topic Slug:** `ui-ux-roles-navigation`
- **Sequence Position:** 18
- **Reviewer:** Curriculum Reviewer (agent/issue-57) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `uiux-objective-roles` (تحويل أدوار PRD وصلاحياتهم إلى احتياجات وواجهات وتنقل واضح) and `uiux-objective-scope` (صياغة متطلبات تجربة المستخدم دون إضافة أدوار أو ميزات خارج النطاق). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Uses PRD roles, tasks, permissions, and requirements as inputs; mark role assumptions for review. Informational prerequisite note clarifies that prerequisites are non-blocking guidance. | **Static review: present** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains architectural distinction between UI, UX, and IA; role-based UI matrix before drawing screens; navigation hierarchy and Arabic RTL requirements; handoff to UX Blueprint. | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Worked example clearly labeled optional: `BorrowHub اختياري: طالب ومسؤول معمل`. Distinguishes student loan tracking from staff review/handover without leaking staff actions to student views. | **Static review: present** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Step 1: transform approved roles and tasks into a visibility/action matrix (`docs/UI_UX_REQUIREMENTS.md`). Step 2: structure destinations into a navigation model without adding out-of-scope screens. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Guided exercise with PROMPT 14 (UI/UX Grill Me) for deep discovery with UX Researcher persona. Template and prompt text are present in source; clipboard interaction is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `uiux-requirements` (`docs/UI_UX_REQUIREMENTS.md`) and `role-ui-matrix` (Role-based UI matrix). Supplies documented input for Topic 19 without access locks. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `uiux-q-role` (matching actions to PRD permissions) and `uiux-q-navigation` (deferring out-of-scope recommendations). 4 options each, correctly keyed, educational explanations inspected statically. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (5 items) and rubric criteria `uiux-r-permission` (referencing `role-ui-matrix`) and `uiux-r-navigation` (referencing `uiux-requirements`). 3-level scale and output references inspected statically; edit/reload persistence is Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Nielsen Norman Group: "Information Architecture: 3 Key Models" (`nng-information-architecture`, URL: `https://www.nngroup.com/videos/information-architecture-models/?lm=apples-flatland-aesthetic-part-1&pt=article`). Retained as candidate; approval deferred. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Diagram where relevant | Flowchart Mermaid diagram (`flowchart TD`) illustrating BorrowHub navigation hierarchy. Diagram source is present; renderer execution is Not Run. | **Static review: present** |

---

### Topic 19: `ux-blueprint`
- **Topic Slug:** `ux-blueprint`
- **Sequence Position:** 19
- **Reviewer:** Curriculum Reviewer (agent/issue-57) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `uxbp-objective-states` (توثيق الرحلات وخريطة الموقع وحالات الواجهة الأربع الأساسية لكل تجربة) and `uxbp-objective-access` (مراعاة الاستجابة وإمكانية الوصول في حالات النجاح والخطأ والفراغ). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Input: `docs/UI_UX_REQUIREMENTS.md` and user journey touchpoints; non-blocking prerequisites guidance. | **Static review: present** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains Sitemap construction, user journeys, 4 UI states (Loading, Empty, Error, Success) separated from 2 cross-cutting quality reviews (Responsive and Accessibility). | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Worked example: `قائمة معدات فارغة` explaining empty state behavior as actionable guidance rather than a system crash or error. BorrowHub note marks it optional. | **Static review: present** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Step 1: draw Sitemap and MVP journeys linking pages to tasks and roles (`docs/UX_BLUEPRINT.md`). Step 2: populate states matrix with 4 UI states and 2 cross-cutting checks. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Guided exercise with PROMPT 15 (UX Blueprint + Screen Inventory) for Senior UX Architect persona. Template and prompt text are present in source; clipboard interaction is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `ux-blueprint` (`docs/UX_BLUEPRINT.md`) and `states-matrix` (4 UI states and 2 cross-cutting checks matrix). Supplies documented input for Topic 20. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `uxbp-q-empty` (informative empty states with actionable CTA) and `uxbp-q-a11y` (keyboard navigation, focus visible, and activation). 4 options each, correctly keyed, educational explanations inspected statically. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `uxbp-r-states` (referencing `states-matrix`) and `uxbp-r-journey` (referencing `ux-blueprint`). 3-level scale and output references inspected statically; edit/reload persistence is Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Nielsen Norman Group: "Service Blueprinting FAQ" (`nng-service-blueprint`, URL: `https://www.nngroup.com/videos/service-blueprinting-faq/`). Retained as candidate; approval deferred. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Diagram where relevant | Flowchart Mermaid source (`flowchart TD`) showing a BorrowHub Sitemap across `/`, `/equipment`, `/dashboard/loans`, and `/staff/requests`; rendering is Not Run. | **Static review: present** |

---

### Topic 20: `screen-inventory`
- **Topic Slug:** `screen-inventory`
- **Sequence Position:** 20
- **Reviewer:** Curriculum Reviewer (agent/issue-57) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `inventory-objective-fields` (جرد شاشات النطاق بربط كل شاشة بهدف ودور وبيانات وأفعال وحالات) and `inventory-objective-coverage` (التحقق من تغطية المتطلبات دون إضافة شاشة لا تسندها الرحلة). | **Static review: present** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Input: `docs/UI_UX_REQUIREMENTS.md`, `docs/UX_BLUEPRINT.md`, and PRD business rules; non-blocking prerequisites guidance. | **Static review: present** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Golden rule: strict prohibition of invented screens outside MVP; Core vs Supporting vs Future categorization; full inventory fields specification; coverage audit against PRD rules. | **Static review: present** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Worked example: `شاشة مراجعة المسؤول` mapping goal, role, required data, accept/reject actions, and requirement traceability without unprompted metrics dashboards. BorrowHub note marks it optional. | **Static review: present** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Step 1: list MVP screens with goal, role, data, actions, and validation (`docs/SCREEN_INVENTORY.md`). Step 2: map requirements to screens in a bidirectional traceability matrix. | **Static review: present** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Markdown template for `docs/SCREEN_INVENTORY.md` and PROMPT 15. Template text is present in source; clipboard interaction is Not Run. | **Static review: present** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `screen-inventory` (`docs/SCREEN_INVENTORY.md`) and `screen-traceability` (Requirements-to-screens traceability matrix). Supplies documented input for UI prototyping and Stitch prompts. | **Static review: present** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `inventory-q-coverage` (handling requirements without screens) and `inventory-q-fields` (identifying high-value inventory fields). 4 options each, correctly keyed, educational explanations inspected statically. | **Static review: present** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `inventory-r-detail` (referencing `screen-inventory`) and `inventory-r-trace` (referencing `screen-traceability`). 3-level scale and output references inspected statically; edit/reload persistence is Not Run. | **Static review: present** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Nielsen Norman Group: "Wireflows 101" (`nng-wireflows-101`, URL: `https://www.nngroup.com/videos/wireflows-101/?lm=tips-for-new-prototypers&pt=youtubevideo`). Retained as candidate; approval deferred. | **Candidate recorded; individual human approval Not Run** |
| **Diagrams** | Diagram where relevant | Structured Markdown traceability tables mapping PRD Rules 3, 6, and 8 to specific screens (`SCR-03`, `SCR-04`, `SCR-05`, `SCR-06`). | **Static review: present** |

---


## 3. Learner Artifact and Runtime Status

The StudySync tables and screen decisions previously shown as “real sample outputs” were not learner artifacts or verified product decisions. They are removed from the evidence record. The walkthrough inspected the lesson instructions and their handoffs only; no StudySync project was created or reviewed here.

| Topic | Required learner output and handoff | Status in this packet |
|---|---|---|
| 18 `ui-ux-roles-navigation` | PRD-derived UI/UX requirements, role/action matrix, and navigation model for Topic 19 | Source instructions reviewed; learner artifacts **Not Run / not supplied**. |
| 19 `ux-blueprint` | Sitemap/journeys plus a state matrix, handed to Topic 20 | Source instructions reviewed; learner artifacts and usability checks **Not Run / not supplied**. |
| 20 `screen-inventory` | In-scope screen inventory and bidirectional requirements traceability, handed to Topic 21 | Source instructions reviewed; no screen decisions were independently approved and no learner artifact was supplied. |

The sample's `SCR-04` and other product details must not be treated as confirmed or approved. Mobile layout, contrast, keyboard access, screen-reader behavior, browser rendering, clipboard behavior, and persistence were not tested in this packet.

## 4. Verification and Acceptance Status

| Evidence item | Status |
|---|---|
| Educational walkthrough of Topics 18–20, including objectives, examples, practical steps, expected outputs, questions/rubrics, and handoffs | Static source review recorded. |
| Browser/e2e/Playwright, mobile, RTL/LTR, clipboard, quiz/retry, rubric persistence, and visual/accessibility checks | **Not Run** by this packet; root owns integrated candidate checks. |
| Lint/typecheck, unit tests, and production build | **Not Run** by this packet. |
| Individual video playback, captions, accessibility, and lesson fit | **Deferred** for human review under DEC-70; candidates remain unapproved. |
| Independent exact-candidate evidence and end-of-queue owner sign-off | **Pending**; group is not improved or released. |

**Handoff:** Topic 18's role/task and navigation decisions inform Topic 19's journeys and states; Topic 19 informs Topic 20's scoped screen inventory; Topic 20 provides the screen candidates for Topic 21. Prerequisites remain guidance, with no access locks. A transition to Topic 21 does not imply that an actual design screen exists.

**Release status:** DEC-70 accepts the template, quiz, and learner-reported rubric policies. This packet records static curriculum review only. Group 07 remains **pending acceptance and not improved/released** until required evidence is complete, independently verified, and included in the course owner's end-of-queue sign-off list.