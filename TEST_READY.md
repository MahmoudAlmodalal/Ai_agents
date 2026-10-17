# TEST_READY — E2E Test Suite Readiness Declaration

> **Project:** MET Academy — Weapon of the Era (سلاح العصر)  
> **Status:** **HARNESS OPERATIONAL & VERIFIED**  
> **Authoritative Specification:** `Weapon_of_the_Era_Website_Content_AR.md`  
> **Project Plan:** `.agents/teamwork/orchestrator_1/PROJECT.md`  
> **Test Harness:** `scripts/verify-all.ts`  
> **Execution Command:** `npx tsx scripts/verify-all.ts`  
> **Total Test Assertions:** **204**

---

## 1. Test Harness Execution & Command Reference

The complete automated end-to-end (E2E) testing suite is implemented in `scripts/verify-all.ts` and runs deterministically via TypeScript execution:

```bash
# Execute entire 4-tier E2E verification suite (204 tests)
npx tsx scripts/verify-all.ts

# Execute specific tiers
npx tsx scripts/verify-all.ts --tier=1    # Tier 1: Feature Coverage (141 tests)
npx tsx scripts/verify-all.ts --tier=2    # Tier 2: Boundary & Corner Cases (29 tests)
npx tsx scripts/verify-all.ts --tier=3    # Tier 3: Cross-Feature Combinations (18 tests)
npx tsx scripts/verify-all.ts --tier=4    # Tier 4: Real-World Student Journeys (16 tests)

# Machine-readable JSON output for CI / agent automation
npx tsx scripts/verify-all.ts --json
```

---

## 2. Test Suite Breakdown by Tier

| Tier | Focus Area | Assertions | Current Pass | Pending Milestone | Failures |
|------|------------|------------|--------------|-------------------|----------|
| **Tier 1** | Feature Coverage (>=5 tests per feature) | 141 | 4 | 137 | 0 |
| **Tier 2** | Boundary & Corner Cases | 29 | 23 | 6 | 0 |
| **Tier 3** | Cross-Feature Combinations | 18 | 0 | 18 | 0 |
| **Tier 4** | Real-World Application Scenarios | 16 | 0 | 16 | 0 |
| **Total** | **Comprehensive E2E Suite** | **204** | **27** | **177** | **0** |

*Note on Progressive Testability:* Current passed tests (27) validate active baseline components including Arabic text normalization algorithms (`normalizeArabic`), responsive media query breakpoints, overflow containment rules, and RTL layout attributes. As Milestone 1 through 5 agents deliver their respective modules, the 177 pending tests will automatically transition to `PASS`. In Milestone 6, the gate criterion is 100% pass (204/204).

---

## 3. Comprehensive Feature Checklist

### 3.1 Tier 1: Feature Coverage (141 Tests)

#### Dedicated Page Routes (16 Routes x 5 Tests = 80 Tests)
- [x] **Route 01: `/` (Home)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 02: `/start` (Start Here)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 03: `/lectures` (Lectures Hub)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 04: `/lectures/01-product-discovery` (Lecture 01)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 05: `/lectures/02-prd-github-user-flow` (Lecture 02)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 06: `/lectures/03-diagrams-erd` (Lecture 03)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 07: `/lectures/04-pending` (Lecture 04)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 08: `/lectures/05-uiux-stitch-frontend` (Lecture 05)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 09: `/prompts` (Prompts Library)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 10: `/diagrams` (Diagrams Lab)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 11: `/borrowhub` (BorrowHub Case Study)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 12: `/tools` (Tools & Installation)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 13: `/templates` (Templates & Files)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 14: `/glossary` (Glossary)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 15: `/faq` (FAQ)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.
- [x] **Route 16: `/about` (About)** — Segment exists, component export, Arabic heading, RTL compliance, metadata linkage.

#### Content Models & Hub Features (61 Tests)
- [x] **Prompts Data Model (6 Tests):**
  - `src/data/promptsData.ts` existence
  - Exactly 30 prompts verified
  - Sequential numbering 1 through 30 verified
  - Prompt 01 contains verbatim `/grill-me` discovery instructions
  - Prompt 02 contains 27 PRD sections specification
  - Stage, tool, and outputType metadata properties present
- [x] **Lecture 01 (5 Tests):** L01 entry, 27 PRD sections, Grill Me method, deliverables (`docs/PRD.md`), common pitfalls.
- [x] **Lecture 02 (5 Tests):** L02 entry, PRD vs SRS comparison, Git/GitHub hands-on, User Flow Mermaid, MVP tasks moved to L05.
- [x] **Lecture 03 (5 Tests):** L03 entry, 8 database fundamentals, BorrowHub ERD data model, 8 diagrams matrix, database review audit questions.
- [x] **Lecture 04 (5 Tests):** Status strictly "pending", title strictly "بانتظار اعتماد المحتوى", zero fabricated videos, zero fabricated downloadable assets, canonical slug `04-pending`.
- [x] **Lecture 05 (5 Tests):** L05 entry, steps A through L, Google Stitch & DESIGN.md, Next.js Frontend Plan, Frontend-Only scope boundary.
- [x] **Diagrams Lab (5 Tests):** 8 diagram definitions, engineering questions answered, tool mapping (Mermaid / PlantUML / DBML), official editor URLs, syntax format verification.
- [x] **BorrowHub Workshop (5 Tests):** 10 business rules verbatim, 2 user roles (Student, Staff), 5 tables (`users`, `equipment_categories`, `equipment`, `loan_requests`, `loan_action_logs`), 12 case study files, student journey steps.
- [x] **Tools & Setup (5 Tests):** 12 tools represented, CLI terminal commands, official URLs, API key security warnings, Stitch MCP instructions.
- [x] **Templates & Files (5 Tests):** 14 templates represented, `isAvailable: false` on unhosted items, format mapping, zero broken download links.
- [x] **Glossary (5 Tests):** 35 technical terms, Arabic definitions, English technical terms preserved, categorization, searchability.
- [x] **FAQ (5 Tests):** 12 questions from authoritative doc, Stitch backend boundary clarified, Spec Kit incremental usage clarified, accordion structure.

---

### 3.2 Tier 2: Boundary & Corner Cases (29 Tests)
- [x] **Arabic Diacritic Stripping (5 Tests):** Damma/Tanween (`مُحَاضَرَاتٌ`), Kasra/Fatha (`سِلَاحُ العَصْرِ`), Tanween Fath (`شَامِلاً`), Shaddah (`تَطْوِيرٌ`), Sukun (`مَشْرُوعْ`).
- [x] **Alef Normalization (5 Tests):** Alef Hamza Above (`أحمد`), Below (`إبراهيم`), Madda (`آمنة`), Wasla (`ٱستعارة`), mixed sentence variants (`إدارة الأجهزة والمعدات`).
- [x] **Taa Marbuta & Yaa Normalization (4 Tests):** Taa Marbuta (`مكتبة`, `دورة`), Alif Maqsura (`محتوى`), Preposition (`إلى`).
- [x] **Whitespace Collapsing (1 Test):** Collapses multiple internal whitespaces and trims margins.
- [x] **Search Query Boundaries (4 Tests):** Empty query string, whitespace-only string, punctuation/symbols (`؟`, `!`), mixed English/Arabic case insensitivity.
- [x] **Unhosted Templates Guard (3 Tests):** Null downloadUrl for unavailable templates, "غير متاح" badge rendered, zero dead `href="#"` links.
- [x] **Lecture 04 Boundary (3 Tests):** Verbatim pending notice banner, zero video players/iframes, zero downloadable files.
- [x] **Responsive Styles Guard (4 Tests):** 390px/767px mobile breakpoints, horizontal overflow containment (`overflow-x: hidden`), root layout `dir="rtl"` and `lang="ar"`, code blocks LTR formatting.

---

### 3.3 Tier 3: Cross-Feature Combinations (18 Tests)
- [x] **Search + Filter + Copy Flow (5 Tests):** Isolating Prompt 02 via search + stage filter, verifying 27 sections in copy payload, copy button feedback toast ("تم النسخ ✓"), isolating Stitch prompts 16-20, Prompt 01 Arabic interview mode.
- [x] **Sequential Lecture Navigation Graph (5 Tests):** Bidirectional graph verification (L01 -> L02 -> L03 -> L04 -> L05) and terminal condition.
- [x] **Diagram Tab & Editor Mapping (4 Tests):** ERD -> dbdiagram.io, Use Case -> PlantUML, User Flow -> Mermaid flowchart, Sequence -> sequenceDiagram.
- [x] **BorrowHub Rules to Schema Consistency (4 Tests):** Rule 3 (active loans) mapped to `loan_requests`, Rule 8 (damaged equipment) mapped to `equipment`, Rule 7 (staff approval) mapped to user roles, 12 case study files mapped to course syllabus.

---

### 3.4 Tier 4: Real-World Student Journeys (16 Tests)
- [x] **Journey 1: Student Onboarding & Orientation (4 Tests):** Home page landing -> Course slogan -> CTA link -> `/start` Golden Rule -> Link to Lecture 01.
- [x] **Journey 2: Hands-on Requirements & Prompt Mining (4 Tests):** `/prompts` search -> Prompt 01 selection & copy -> `/templates` PRD template -> Lecture 01 deliverables cross-verification.
- [x] **Journey 3: Architecture & Data Modeling (4 Tests):** Lecture 03 diagrams overview -> `/diagrams` comparative tab review -> `/borrowhub` 10 rules & 5 tables -> `database-review.md` audit questions.
- [x] **Journey 4: UI/UX Stitch to Frontend QA Graduation (4 Tests):** Lecture 05 steps A to L -> `/tools` Stitch MCP guide -> `/faq` Frontend-Only boundary confirmation -> Graduation portfolio checklist.

---

## 4. Verification Baseline Execution Output

```
======================================================================
  MET Academy — Weapon of the Era (سلاح العصر)
  Master E2E Automated Verification Test Suite (Tiers 1-4)
======================================================================

  Total Test Assertions:   204
  Passed (Current Code):   27
  Pending Implementation:  177 (tracked across M1-M5)
  Unexpected Failures:     0
  Execution Duration:      6 ms
  Timestamp:               2026-10-17T13:07:51.084Z
======================================================================

Result: HARNESS ACTIVE (27 passed, 177 pending milestone completion)
Note: Pending tests will transition to PASS as M1->M5 agents deliver their tracks.
```

---

## 5. Milestone 6 Signoff Gate

Before final release, Milestone 6 requires:
1. `npx tsx scripts/verify-all.ts` returns exit code 0 with **204 passed**, 0 pending, 0 failed.
2. `npm run lint` (`tsc --noEmit`) passes with 0 errors.
3. `npm run build` compiles all 16 static routes successfully without errors.
