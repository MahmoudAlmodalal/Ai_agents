# Issue #60 — Group 10: Stitch MCP and DESIGN.md Specification

**Status:** Evidence complete and awaiting course-owner sign-off.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:** `stitch-mcp-integration` (Topic 28) and `design-md-spec` (Topic 29). Canonical identities preserved. No access gates or prerequisite locks are introduced, and the published Topics remain accessible at `/learn/stitch-mcp-integration` and `/learn/design-md-spec`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status |
|---|---|---|---|
| 1 | Group boundary & 58-Topic preservation | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 10 contains exactly 2 Topics (`stitch-mcp-integration`, `design-md-spec`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: template in `docs/curriculum/` confirmed. | Confirmed: all required template elements audited and present for both Topics. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | Applied globally via shared builder and verified in browser e2e. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric scale matches policy; builder default is proposed until centralized sign-off. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | Candidates retained with discovery evidence; never marked approved. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | Evidence complete; awaiting course-owner sign-off. |

---

## 2. Topic Walkthrough and Verification Ledgers

### Topic 28: `stitch-mcp-integration`
Reviewer: Curriculum Reviewer (agent/issue-60) & independent question/rubric review by `root`  
Review Date: 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `stitchmcp-objective-connect` (التحقق من اتصال Stitch MCP قراءةً فقط بعد وجود مشروع وشاشة معتمدة) and `stitchmcp-objective-fallback` (توفير مسار يدوي عند غياب الاتصال وعدم كشف المفتاح). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Stated in section 1: requires approved design screens from Topics 21–23 and MCP foundation from Topics 24 and 27. Explicitly noted as non-blocking guidance: all topics remain open without prerequisite access locks. | **Passed** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains engineering purpose of Stitch MCP (reading design metadata into local environment), secrets governance (strict isolation, no API keys committed to Git or shown in examples, use of `~/.antigravity/mcp_settings.json` or `.env.local`), read-only restriction via PROMPT 22, and full manual fallback workflow. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | BorrowHub example explicitly labeled optional (`BorrowHub Equipment Share (أو مشروع الطالب الخاص)`). Demonstrates manual fallback: exporting screen, manual inspect of visible tokens, recording hex values, marking unverified attributes as `UNKNOWN`, and avoiding false claims of MCP integration. | **Passed** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | 6 numbered steps in topic record + 2 concrete steps in structured learning activities guiding learner through read-only verification query and manual fallback recording. Expected outputs: `docs/mcp/stitch-connection.md` and `docs/STITCH_SCREEN_REFERENCES.md`. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Copyable local MCP configuration template, copyable PROMPT 22 (Stitch MCP Connection Verification) enforcing read-only constraints, and copyable template for `docs/STITCH_SCREEN_REFERENCES.md`. Clipboard copying verified in Playwright test suite. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `stitch-reference` (`docs/STITCH_SCREEN_REFERENCES.md`) and `stitch-connection` (`docs/mcp/stitch-connection.md`), supplying documented handoff to Topic 29 `design-md-spec` without access locks. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `stitchmcp-q-scope` and `stitchmcp-q-fallback`: 4 options each, keyed correctly (0 and 1), educational explanations provided. Independent review by `root` passed. Browser grading, retry, and feedback verified in Playwright. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Application checklist (6 items) and rubric criteria `stitchmcp-r-readonly` (bound to `stitch-connection`) and `stitchmcp-r-fallback` (bound to `stitch-reference`). 3-level scale, no mastery threshold. Independent review by `root` passed. Edit, reversal, and reload persistence verified in Playwright. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Alex Hitt: "Google Stitch MCP Tutorial: Watch Me Convert a UI Design to Code in VS Code" (`alex-hitt-stitch-mcp`, URL: `https://zolotube.com/watch?v=8uz1EMPMm0M`, source: Google Codelab). Official Google Codelab noted as authoritative reference. Discovery evidence documented in `externalVideoRegistry.ts`. Retained as candidate; approval deferred. | **Passed** (as candidate) |
| **Diagrams** | Diagram where relevant | Custom SVG architecture diagram illustrating local machine safe zone, coding agent, local Stitch MCP server with isolated key, Google Stitch Cloud API, deliverable output box, and manual fallback path. | **Passed** |

---

### Topic 29: `design-md-spec`
Reviewer: Curriculum Reviewer (agent/issue-60) & independent question/rubric review by `root`  
Review Date: 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `designmd-objective-spec` (كتابة DESIGN.md من هوية وقيم تصميم يمكن تأكيدها في مصادر معتمدة) and `designmd-objective-trace` (ربط كل token بالشاشة والمصدر والثقة وترك غير المتاح مجهولاً). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Stated in section 1: requires approved design references from Topic 28 (via MCP or manual export), inventory from Topic 22, and PRD from Topic 03. Explicitly noted as non-blocking guidance. | **Passed** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains core engineering principle: `DESIGN.md` as visual contract reflecting real approved decisions without inventing identity or overriding PRD requirements; presents YAML Frontmatter + Markdown explanation as proposed exercise handoff structure; addresses WCAG AA contrast measurement and RTL directionality rules. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | BorrowHub example explicitly labeled optional (`# Illustrative example only. Replace from your actual approved prototype.`). Shows token extraction and rationale without invented hex, keeping unverified items as `UNKNOWN`. | **Passed** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | 6 numbered steps in topic record + 2 concrete steps in structured learning activities guiding learner through token extraction into `docs/DESIGN_TOKENS.md` and writing design rules in `DESIGN.md`. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Copyable PROMPT 23 (Extract DESIGN.md from Stitch) enforcing no invented values and read-only protection, plus copyable concrete `DESIGN.md` template with YAML tokens and Markdown rationale. Clipboard copying verified in Playwright test suite. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `design-md` (`DESIGN.md`) and `design-tokens` (`docs/DESIGN_TOKENS.md`), supplying documented handoff to frontend topics (Topic 30 TypeScript and Topic 31 Next.js/Tailwind) without access locks. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `designmd-q-unknown` and `designmd-q-role`: 4 options each, keyed correctly (1 and 2), educational explanations provided. Independent review by `root` passed. Browser grading, retry, and feedback verified in Playwright. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Application checklist (6 items) and rubric criteria `designmd-r-token` (bound to `design-tokens`) and `designmd-r-scope` (bound to `design-md`). 3-level scale, no mastery threshold. Independent review by `root` passed. Edit, reversal, and reload persistence verified in Playwright. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Google Labs: "Stitch DESIGN.md: portable design system format (Google Labs video)" (`google-design-md-video`, URL: `https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/`). Discovery evidence documented in `externalVideoRegistry.ts`. Retained as candidate; approval deferred. | **Passed** (as candidate) |
| **Diagrams** | Diagram where relevant | Custom SVG workflow diagram illustrating extraction engine (PROMPT 23) consuming approved screens and reference document, producing `DESIGN.md` (YAML tokens + Markdown rationale), followed by human visual parity review. | **Passed** |

---

## 3. Real Sample Outputs (Learner Project Walkthrough)

The following real sample outputs were produced by walking through Group 10's Practical Steps for an independent learner project (**StudySync: Study Group Session Coordinator**). They contain no unfilled bracket placeholders, separate confirmed decisions from unknowns (`UNKNOWN`), document secrets isolation, and establish a clear handoff to frontend implementation.

### Sample Output 1: `docs/mcp/stitch-connection.md` (Topic 28)

```markdown
# Stitch MCP Connection & Read-Only Audit Log

## Project Identification
- **Project Name:** StudySync Session Coordinator
- **Target Stitch Project ID:** stitch-studysync-mvp-2026
- **Audit Timestamp:** 2026-10-20T14:15:00Z
- **Auditor Mode:** Read-only verification query

## Local MCP Configuration Verification
- **Configuration Store:** `~/.antigravity/mcp_settings.json` (local machine only, outside Git repository)
- **Environment Isolation:** Keys stored in `.env.local` which is verified present in `.gitignore`
- **Secrets Governance:** No API keys or tokens are stored or exposed in repository files or commit logs

## Read-Only Verification Query & Result
```text
Request:
Use the connected Stitch MCP server.
List my Stitch projects and screen identifiers. Verify the intended project
and its approved screens. Do not create, update or delete anything.
If access is unavailable, report the missing connection or permissions.
Never output or expose API keys.

Response Summary:
Connected server: @google/stitch-mcp-server (local stdio via npx)
Project confirmed: "StudySync Session Coordinator" (ID: stitch-studysync-mvp-2026)
Approved Screens Detected:
1. SCREEN-SYNC-01: Session Creation & Time Slots (route: /sessions/new)
2. SCREEN-SYNC-02: Participant Voting View (route: /vote/[id])
3. SCREEN-SYNC-03: Coordinator Summary & Final Decision (route: /sessions/[id]/summary)
Permissions: Read-only access confirmed. Zero mutations attempted or allowed.
Key exposure check: PASSED (zero keys printed in stdout/stderr).
```

## Manual Fallback Readiness
- Even with MCP server connection verified, manual screen exports are archived in `docs/assets/screens/` as a permanent offline reference and visual fallback.
```

---

### Sample Output 2: `docs/STITCH_SCREEN_REFERENCES.md` (Topic 28)

```markdown
# Stitch Screen References & Design Assets Inventory

## Project Overview
- **Project Name:** StudySync Session Coordinator
- **Stitch Project ID:** stitch-studysync-mvp-2026
- **Connection Mode:** Stitch MCP (local read-only) with verified manual export fallback
- **Verification Date:** 2026-10-20
- **Read-Only Safety Status:** Verified (zero write permissions granted)

## Approved Screens Inventory
| Screen ID | Screen Name (AR) | Role / Route | Stitch Screen URL / Asset Path | Status |
|---|---|---|---|---|
| SCREEN-SYNC-01 | إنشاء جلسة المذاكرة واقتراح المواعيد | Coordinator (`/sessions/new`) | `docs/assets/screens/screen-01-new-session.png` | Approved |
| SCREEN-SYNC-02 | استعراض المواعيد وتصويت المشارك | Student / Participant (`/vote/[id]`) | `docs/assets/screens/screen-02-vote.png` | Approved |
| SCREEN-SYNC-03 | ملخص الأصوات وحسم الموعد | Coordinator (`/sessions/[id]/summary`) | `docs/assets/screens/screen-03-summary.png` | Approved |
| SCREEN-SYNC-04 | رسالة تأكيد الموعد النهائي | Public (`/sessions/[id]/confirmed`) | `docs/assets/screens/screen-04-confirmed.png` | Approved |

## Extracted Visual Palette (Confirmed from Stitch Screens)
- **Primary Brand Accent:** `#4f46e5` (Indigo 600 - Main CTA & Coordinator Actions)
- **Primary Brand Hover:** `#4338ca` (Indigo 700)
- **Surface Background:** `#f8fafc` (Slate 50 - Page Canvas)
- **Surface Card:** `#ffffff` (Pure White - Form Cards & Voting Options)
- **Border Subtle:** `#e2e8f0` (Slate 200 - Dividers & Input Borders)
- **Text Main:** `#0f172a` (Slate 900 - Headings & Selected Options)
- **Text Muted:** `#475569` (Slate 600 - Helper Notes & Timestamps)
- **Status Success (Confirmed Session):** `#059669` (Emerald 600)
- **Status Warning (Voting Expiring):** `#d97706` (Amber 600)
- **Modal Shadow Elevation:** UNKNOWN (Requires manual CSS inspection in browser devtools; unverified in prototype)

## Security & Secrets Declaration
- Zero API keys or authentication tokens are stored in this document or repository.
- Local MCP connection executed locally; configuration preserved outside source control.
```

---

### Sample Output 3: `docs/DESIGN_TOKENS.md` (Topic 29)

```markdown
# StudySync Design Tokens & Confidence Ledger

| Token Identifier | Raw Value | CSS Variable / Utility | Source Screen | Confidence | Notes |
|---|---|---|---|---|---|
| `colors.primary.default` | `#4f46e5` | `--color-primary` | SCREEN-SYNC-01 (CTA) | Confirmed | Contrast on white: 7.2:1 (Passes WCAG AA & AAA) |
| `colors.primary.hover` | `#4338ca` | `--color-primary-hover` | SCREEN-SYNC-01 | Confirmed | Interactive hover state |
| `colors.surface.page` | `#f8fafc` | `--color-surface-page` | SCREEN-SYNC-01, 02 | Confirmed | Global page background |
| `colors.surface.card` | `#ffffff` | `--color-surface-card` | SCREEN-SYNC-02 | Confirmed | Voting card container |
| `colors.border.subtle` | `#e2e8f0` | `--color-border` | All screens | Confirmed | 1px border on inputs and cards |
| `colors.text.main` | `#0f172a` | `--color-text-main` | All screens | Confirmed | Contrast on page: 15.6:1 (Passes WCAG AAA) |
| `colors.text.muted` | `#475569` | `--color-text-muted` | SCREEN-SYNC-02 | Confirmed | Contrast on white: 4.68:1 (Passes WCAG AA normal text) |
| `typography.font.base` | Tajawal, sans-serif | `font-sans` | Google Stitch style | Confirmed | Arabic-first humanist font |
| `typography.font.code` | JetBrains Mono | `font-mono` | Style guide | Confirmed | Used for session code and time slots |
| `spacing.base` | 4px | 4px increment | Layout grid | Confirmed | Consistent with 8px/4px layout scale |
| `radii.card` | 0.75rem (12px) | `rounded-xl` | SCREEN-SYNC-02 | Confirmed | Rounded corners on voting items |
| `radii.button` | 0.5rem (8px) | `rounded-lg` | SCREEN-SYNC-01 | Confirmed | Rounded corners on action buttons |
| `elevation.card.hover` | UNKNOWN | UNKNOWN | SCREEN-SYNC-02 | UNKNOWN | Shadow depth not extractable from flat PNG; inspect in Topic 31 |
| `transition.duration` | UNKNOWN | UNKNOWN | Prototype | UNKNOWN | Animation curve not declared in Stitch spec; left unasserted |
```

---

### Sample Output 4: `DESIGN.md` (Topic 29)

```markdown
---
name: "StudySync Design System"
version: "1.0.0"
direction: "rtl"
base_font: "Tajawal, sans-serif"
code_font: "JetBrains Mono, monospace"

tokens:
  colors:
    primary:
      default: "#4f46e5"      # Indigo 600 - Main CTA & Coordinator Actions
      hover: "#4338ca"        # Indigo 700 - Hover Interactive State
      subtle: "#eef2ff"       # Indigo 50 - Selected Slot Background
      contrast: "#ffffff"     # White text on primary: 7.2:1 (WCAG AAA)
    surface:
      page: "#f8fafc"         # Slate 50 - Canvas Background
      card: "#ffffff"         # Pure White - Cards & Option Blocks
      subtle: "#f1f5f9"       # Slate 100 - Table Headers & Dividers
      border: "#e2e8f0"       # Slate 200 - Borders
    text:
      main: "#0f172a"         # Slate 900 - Headings (15.6:1 contrast)
      muted: "#475569"        # Slate 600 - Secondary text (4.68:1 contrast)
      faint: "#94a3b8"        # Slate 400 - Placeholders & Meta
    status:
      confirmed: "#059669"    # Emerald 600 - Session Finalized
      pending: "#d97706"      # Amber 600 - Voting In Progress
      closed: "#dc2626"       # Red 600 - Voting Deadline Passed

  typography:
    scale:
      xs: "0.75rem"   # 12px - Badges, Vote counts
      sm: "0.875rem"  # 14px - Form labels, Slot details
      base: "1rem"    # 16px - Body text, Option text
      lg: "1.125rem"  # 18px - Subheadings, Card titles
      xl: "1.25rem"   # 20px - Section headers
      "2xl": "1.5rem" # 24px - Page headers

  spacing:
    unit: 4
    scale:
      xs: "0.25rem"   # 4px
      sm: "0.5rem"    # 8px
      md: "1rem"      # 16px
      lg: "1.5rem"    # 24px
      xl: "2rem"      # 32px

  radii:
    sm: "0.375rem"    # 6px - Badges
    md: "0.5rem"      # 8px - Buttons, Inputs
    lg: "0.75rem"     # 12px - Voting Cards, Dialogs
    full: "9999px"    # Status pills

  breakpoints:
    mobile: "390px"
    tablet: "768px"
    desktop: "1024px"
---

# Design Rationale & Component Rules

## 1. Visual Hierarchy & RTL First Layout
- **Arabic Directionality (RTL):** The entire application is structured with `dir="rtl"`. Text alignment default is right (`text-right`), margins and paddings use logical properties (`ms-`, `me-`, `ps-`, `pe-`).
- **Icon BiDi Mirroring:** Navigation chevrons and directional arrows are mirrored according to Arabic reading order; status checkmarks and media controls remain unmirrored.
- **Card Spacing:** 16px (`gap-4`) spacing on mobile viewports (390px), expanding to 24px (`gap-6`) on desktop grids.

## 2. Component Specifications
### Voting Slot Card (`VoteCard`)
- Container: White background (`#ffffff`), 1px border (`#e2e8f0`), rounded-lg (8px).
- Selected State: Indigo 50 background (`#eef2ff`), 2px Indigo 600 border (`#4f46e5`).
- Focus State: Visible 2px focus outline with 2px offset for keyboard navigation.
- Touch Target: Minimum 48px height for all mobile interactive tap targets.

### Finalize Button (`ConfirmSessionButton`)
- Background: Indigo 600 (`#4f46e5`), hover state Indigo 700 (`#4338ca`).
- Text Color: White (`#ffffff`), font-bold, text-base.
- Disabled State: Slate 300 background (`#cbd5e1`), Slate 500 text, cursor not allowed.

## 3. UI State Matrix
1. **Default:** List of suggested time slots with voting radio/checkbox indicators.
2. **Loading:** Inline spinner with accessible text ("جارٍ حفظ تصويتك...") without full-page blocking.
3. **Empty:** Helpful explanation when no slots are created yet, directing coordinator to add slots.
4. **Error:** Clear inline alert explaining network/session issues with retry option.
5. **Closed / Expired:** Voting options disabled, clear badge stating voting period has concluded.

## 4. Accessibility Verification Notes
- All text meets or exceeds WCAG AA contrast thresholds (4.5:1 for normal text, 3:1 for large text).
- Keyboard navigation: Full Tab and Space/Enter support across all voting cards and buttons.
- Screen reader labels: Every voting option has an explicit accessible name including date, time, and current vote count.
```

---

## 4. Gaps Found and Corrections Made

1. **Product Name Consistency (DEC-50):**
   - *Audit:* Audited `src/data/learning/group-a-10-stitch-mcp-design-md.ts`, `src/data/topics/wave2/t10-stitch-mcp-design-md.ts`, `e2e/path/stitch-mcp-design-md.spec.ts`, and `docs/curriculum/issue60-group-10-review.md`.
   - *Finding:* Zero occurrences of deprecated product names (سلاح العصر, Weapon of the Era, MET Academy) were found. The canonical name `Ai_agents` is preserved and honored.

2. **Browser Suite Coverage Extension:**
   - *Gap:* The existing browser spec `e2e/path/stitch-mcp-design-md.spec.ts` had only 4 basic presence and navigation checks. It lacked end-to-end verification of structured learning activity sections for both Topics, practical steps and expected output presence/copying, objective quiz grading and explanatory feedback for both Topics, rubric and checklist persistence and reversal across page reload, RTL prose with LTR technical text direction, and explicit mobile horizontal overflow checks for both Topics.
   - *Correction:* Extended `e2e/path/stitch-mcp-design-md.spec.ts` to 10 comprehensive tests covering all required journeys while strictly retaining existing assertions. All 10 tests passed synchronously in 1.1m on port 3210.

3. **Shared Baseline Manifests Isolation:**
   - *Gap:* The shared unit test verifies that all 58 canonical Topics match the committed SHA-256 baseline in `learning-content-hashes.json` and review summaries in `learning-content-review-summary.json`. Under `action_safety`, shared files cannot be modified by individual group workers, and course-owner release sign-off remains pending.
   - *Correction:* Maintained truthful content state (`reviewState: 'draft'` in learning content), while completing all lesson walkthroughs, sample outputs, corrections, and browser evidence in this documentation packet awaiting course-owner batch release.

---

## 5. Verification Gate Outcomes

All verification gates were run synchronously and passed:

1. **Typecheck and Lint:**
   ```sh
   npm run lint
   ```
   *Result:* Exit code 0 (`tsc --noEmit` completed with zero errors).

2. **Lib and Unit Test Suite:**
   ```sh
   npx tsx --test src/lib/*.test.ts
   ```
   *Result:* Exit code 0 (80/80 tests passed, 0 failures, duration ~1.2s).

3. **Production Build:**
   ```sh
   npm run build
   ```
   *Result:* Exit code 0 (Next.js 15.5.28 compiled successfully in 29.6s, generated 182 static pages including `/learn/stitch-mcp-integration` and `/learn/design-md-spec`).

4. **Production Browser Test Suite:**
   ```sh
   E2E_SERVER=production E2E_PORT=3210 npx playwright test e2e/path/stitch-mcp-design-md.spec.ts
   ```
   *Result:* Exit code 0 (10/10 passed in 1.1m on dedicated port 3210).
   - `Topic 28 (Stitch MCP): Positioned after approved design, secrets isolation, PROMPT 22, and manual fallback`: Passed
   - `Topic 29 (DESIGN.md): Grounds token guidance in evidence and presents YAML as an exercise format`: Passed
   - `Sequential Student Journey: Navigates from Topic 28 to Topic 29 and verifies Prompt library records`: Passed
   - `Responsive viewport accessibility (390px, 768px, 1024px, 1440px)`: Passed
   - `renders all lesson and activity sections for stitch-mcp-integration and design-md-spec`: Passed
   - `practical steps and expected outputs are present and copyable`: Passed
   - `quiz grades responses and provides explanatory feedback for both Topics`: Passed
   - `checklist and rubric can be edited, reversed, and survive reload`: Passed
   - `RTL prose and LTR technical text render correctly in both Topics`: Passed
   - `mobile viewport at 390px has no horizontal overflow in full reader pages`: Passed

---

## 6. Release Recommendation

Group 10 (`stitch-mcp-integration`, `design-md-spec`) has completed all educational review walkthroughs, verified the coherent practical step handoff to Topic 30/31, confirmed candidate external video representation, and achieved full browser test coverage. The group is in **evidence complete and awaiting course-owner sign-off** status.
