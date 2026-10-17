# TEST_INFRA — E2E Testing Infrastructure Specification

> **Project:** MET Academy — Weapon of the Era (سلاح العصر)  
> **Track:** E2E Testing Track  
> **Authoritative Specification:** `Weapon_of_the_Era_Website_Content_AR.md`  
> **Master Project Plan:** `.agents/teamwork/orchestrator_1/PROJECT.md`  
> **Authoritative Request:** `.agents/teamwork/ORIGINAL_REQUEST.md`  
> **Execution Harness:** `scripts/verify-all.ts` (runnable via `npx tsx scripts/verify-all.ts`)

---

## 1. Executive Summary & Test Philosophy

### 1.1 Purpose
This document establishes the end-to-end (E2E) testing infrastructure, testing philosophy, 4-tier methodology, and coverage thresholds for the **MET Academy — Weapon of the Era (سلاح العصر)** educational platform. The platform transforms the legacy single-page application into a complete, authoritative 16-route Next.js App Router educational portal based on `Weapon_of_the_Era_Website_Content_AR.md`.

### 1.2 Testing Philosophy
1. **Opaque-Box Verification:** Tests treat the system and its modules through their public interfaces, routes, data contracts, and observable behaviors, without relying on implementation secrets.
2. **Deterministic Assertions:** Every test has an authoritative, documented expected output derived strictly from `Weapon_of_the_Era_Website_Content_AR.md` or `PROJECT.md`. No fuzzy heuristics or facade tests.
3. **Zero-Flakiness Guarantee:** Tests execute in a deterministic Node/TypeScript environment via `npx tsx scripts/verify-all.ts`, avoiding brittle third-party browser daemon dependencies while rigorously verifying file system integrity, AST contracts, route exports, data models, layout tokens, and runtime utility algorithms.
4. **Progressive Testability:** The test harness supports milestone-progressive verification. Tests are structured by milestone dependency (M1 Layout → M2 Data Layer → M3 Interactive Hubs → M4 Lectures → M5 Workshops/Pages → M6 Integration), providing clear diagnostic reporting on what is already implemented, what has regressed, and what remains to be built.
5. **No Broken Links / No Fabricated Content:** Strict enforcement of course boundaries — unhosted template files must display "غير متاح" badges, and Lecture 04 must strictly state "بانتظار اعتماد المحتوى" with zero invented materials.

---

## 2. Feature Inventory

The platform encompasses 29 discrete features tracked across 6 milestones:

| Feature ID | Feature Name | Scope & Route / Target | Milestone | Authoritative Reference |
|------------|--------------|------------------------|-----------|-------------------------|
| **F-01** | Root Layout & RTL Baseline | `src/app/layout.tsx`, `dir="rtl"`, `lang="ar"`, Cairo font, removal of root `/app` | M1 | Content Doc § 1, 17 / R1, R6 |
| **F-02** | Global Navigation (Navbar) | `src/components/Navbar.tsx`, responsive menu, active route indicator, 9 primary links | M1 | Content Doc § 1 / R1 |
| **F-03** | Global Footer | `src/components/Footer.tsx`, slogan *"Don't Just Prompt. Engineer."*, copyright | M1 | Content Doc § 1 / R1 |
| **F-04** | Dead Code Purge | Deletion of `src/App.tsx`, `src/index.css`, legacy scripts | M1 | PROJECT.md § Architecture / R6 |
| **F-05** | Prompts Data Model | `src/data/promptsData.ts`, exactly 30 prompts with metadata, body, stage, tool | M2 | Content Doc § 9 / R3 |
| **F-06** | Lectures Data Model | `src/data/lecturesData.ts`, structured L01-L05 content (L04 pending) | M2 | Content Doc § 3-8 / R2 |
| **F-07** | Diagrams Data Model | `src/data/diagramsData.ts`, 8 diagram definitions, questions, editor links, code | M2 | Content Doc § 10 / R4 |
| **F-08** | BorrowHub Data Model | `src/data/borrowhubData.ts`, 10 business rules, 2 roles, 5 tables, 12 files | M2 | Content Doc § 11 / R4 |
| **F-09** | Tools Data Model | `src/data/toolsData.ts`, 12 tools, CLI commands, official URLs | M2 | Content Doc § 12 / R4 |
| **F-10** | Templates Data Model | `src/data/templatesData.ts`, 14 templates with availability status | M2 | Content Doc § 13 / R4 |
| **F-11** | Glossary Data Model | `src/data/glossaryData.ts`, 35 technical terms (Arabic definition + English term) | M2 | Content Doc § 14 / R4 |
| **F-12** | FAQ Data Model | `src/data/faqData.ts`, 12 interactive questions and answers | M2 | Content Doc § 15 / R4 |
| **F-13** | Prompts Library Hub | `/prompts`, search with Arabic normalization, multi-filters, copy button + toast | M3 | Content Doc § 9 / R3 |
| **F-14** | Diagrams Lab Hub | `/diagrams`, 8 tabs, live Mermaid viewer, editor outbound links | M3 | Content Doc § 10 / R4 |
| **F-15** | Lectures Hub Page | `/lectures`, curriculum overview, lecture cards, progress indicators | M4 | Content Doc § 3 / R2 |
| **F-16** | Lecture 01 Page | `/lectures/01-product-discovery`, Grill Me, 27 PRD sections, deliverables | M4 | Content Doc § 4 / R2 |
| **F-17** | Lecture 02 Page | `/lectures/02-prd-github-user-flow`, PRD review, SRS diff, Git/GitHub, User Flow | M4 | Content Doc § 5 / R2 |
| **F-18** | Lecture 03 Page | `/lectures/03-diagrams-erd`, Database analysis, 8 diagrams, BorrowHub ERD/DBML | M4 | Content Doc § 6 / R2 |
| **F-19** | Lecture 04 Page | `/lectures/04-pending`, strictly marked "بانتظار اعتماد المحتوى" | M4 | Content Doc § 7 / R2 |
| **F-20** | Lecture 05 Page | `/lectures/05-uiux-stitch-frontend`, 12 steps A-L, Stitch, DESIGN.md, Next.js plan | M4 | Content Doc § 8 / R2 |
| **F-21** | BorrowHub Workshop Page | `/borrowhub`, 10 business rules, roles, schema, file map, student journey | M5 | Content Doc § 11 / R4 |
| **F-22** | Tools & Setup Page | `/tools`, 12 tool installation cards, copyable terminal snippets, links | M5 | Content Doc § 12 / R4 |
| **F-23** | Templates & Files Page | `/templates`, 14 templates, "غير متاح" badges for unhosted assets | M5 | Content Doc § 13 / R4 |
| **F-24** | Glossary Page | `/glossary`, 35 terms, search filter, categories | M5 | Content Doc § 14 / R4 |
| **F-25** | FAQ Page | `/faq`, 12 accordion panels with complete answers | M5 | Content Doc § 15 / R4 |
| **F-26** | Start Here Page | `/start`, 8 student steps, golden rule, prerequisites | M5 | Content Doc § 2 / R1 |
| **F-27** | About Page | `/about`, course philosophy, MET Academy background, deliverables | M5 | Content Doc § 16 / R1 |
| **F-28** | Home Page | `/`, modern hero, curriculum highlight, quick jump links, slogan | M5 | Content Doc § 1 / R1 |
| **F-29** | Responsive Design & Tokens | Breakpoints (390px, 768px, 1024px, 1366px, 1440px), zero horizontal overflow | M1-M5 | Content Doc § 17 / R5 |

---

## 3. 4-Tier Testing Methodology

Our testing harness organizes test coverage into 4 ascending tiers, ensuring comprehensive validation from basic feature presence to complex multi-step user scenarios:

```
+--------------------------------------------------------------------------+
| Tier 4: Real-World Application Scenarios (End-to-End Student Journeys)   |
|   - Student Onboarding & Orientation Journey                             |
|   - Requirements & Prompt Engineering Journey                            |
|   - Architecture Analysis & Data Modeling Journey                        |
|   - UI/UX Stitch to Frontend QA Graduation Journey                       |
+--------------------------------------------------------------------------+
| Tier 3: Cross-Feature Combinations                                       |
|   - Search + Stage Filter + Tool Filter + Copy Prompt Payload            |
|   - Sequential Lecture Navigation (L01 -> L02 -> L03 -> L04 -> L05)      |
|   - Diagram Format Mapping & External Editor Route Linking               |
|   - BorrowHub Business Rule to ERD Schema Cross-Referencing              |
+--------------------------------------------------------------------------+
| Tier 2: Boundary & Corner Cases                                          |
|   - Arabic Normalization (Tashkeel, Alef variants, Taa Marbuta, Yaa)     |
|   - Empty, Whitespace-Only, & Special Character Search Queries           |
|   - Unhosted Template Files Enforced as "غير متاح" (Zero Broken Downloads)|
|   - Lecture 04 Strictly "بانتظار اعتماد المحتوى" (Zero Fabricated Assets) |
|   - Viewport Breakpoint CSS & Zero Horizontal Overflow Rules             |
+--------------------------------------------------------------------------+
| Tier 1: Feature Coverage (>=5 test assertions per feature)               |
|   - All 16 Dedicated Next.js Page Routes                                 |
|   - All 30 Authoritative Prompts Verbatim                                |
|   - Approved Lectures (01, 02, 03, 05) & Pending Lecture 04              |
|   - 8 Diagram Types & Engineering Questions                              |
|   - BorrowHub Case Study (10 Rules, 2 Roles, 5 Tables, 12 Files)         |
|   - 12 Tools Installation Guides & Commands                              |
|   - 14 Templates & Availability Badges                                   |
|   - 35 Glossary Technical Terms                                          |
|   - 12 Interactive FAQ Accordions                                        |
+--------------------------------------------------------------------------+
```

### 3.1 Tier 1: Feature Coverage Specifications
Each feature in scope must pass at least 5 distinct assertions:
1. **16 Dedicated Routes:**
   - Segment existence (`src/app/<route>/page.tsx`).
   - Page component export (`default export`).
   - Page title / semantic heading matching authoritative content.
   - RTL text direction compliance.
   - Core educational sections present.
2. **30 Prompts:**
   - Exact count = 30.
   - Sequential numbering from `PROMPT 01` to `PROMPT 30`.
   - Complete verbatim body text without truncation.
   - Valid stage metadata (`Discovery`, `Documentation`, `User Flow`, `Diagrams`, `Database`, `UI-UX`, `Stitch`, `MCP`, `Frontend`, `QA`).
   - Valid tool metadata (`Antigravity`, `Stitch`, `Mermaid`, `PlantUML`, `dbdiagram.io`).
   - Valid output types (`Markdown`, `DBML`, `Mermaid`, `PlantUML`, `Screen Design`, `Code`).
   - Warning notes present for missing project files.
3. **Lectures 01-05:**
   - Lecture 01: Objectives, terminology, 27 PRD sections, Grill Me interview method, deliverables.
   - Lecture 02: PRD review, SRS difference, Git/GitHub setup, User Flow, MVP task removal notice.
   - Lecture 03: 8 diagram comparison, ERD & DBML focus, BorrowHub 5-table schema, database review checklist.
   - Lecture 04: Strictly "بانتظار اعتماد المحتوى", status "pending", no fabricated media.
   - Lecture 05: 12 steps A-L, Google Stitch, DESIGN.md, Next.js plan, Frontend-Only boundary.
4. **Diagrams (8 types):**
   - User Flow (`flowchart TD`), Domain Model (`flowchart LR`), Use Case (`PlantUML`), Activity (`flowchart TD`), Sequence (`sequenceDiagram`), State (`stateDiagram-v2`), Class (`classDiagram`), ERD (`DBML` + `erDiagram`).
   - Each diagram has its specific engineering question answered.
   - Correct official editor URL associated.
5. **BorrowHub Case Study:**
   - 10 business rules verbatim.
   - 2 user roles (Student, Administrator/Staff).
   - 5 tables (`users`, `equipment_categories`, `equipment`, `loan_requests`, `loan_action_logs`).
   - 12 case study artifact files listed.
   - Complete student journey steps mapped.
6. **Tools & Setup (12 tools):**
   - Verified entries: Antigravity CLI/IDE, Grill Me, Git/GitHub, Mermaid Live, PlantUML/PlantText, dbdiagram.io, Google Stitch, Stitch MCP, DESIGN.md, Next.js, UI/UX Pro Max, GitHub Spec Kit.
   - Official URLs and terminal installation commands.
7. **Templates (14 items):**
   - All 14 templates from Content Doc § 13 present.
   - Availability flags (`isAvailable: false` for unhosted items).
8. **Glossary (35 terms):**
   - Exact term list with Arabic definitions and English technical terms.
9. **FAQ (12 items):**
   - 12 interactive questions with authoritative answers.

### 3.2 Tier 2: Boundary & Corner Cases
1. **Arabic Text Normalization Vectors:**
   - Stripping diacritics: `مُحَاضَرَاتٌ` → `محاضرات`, `سِلَاحُ العَصْرِ` → `سلاح العصر`.
   - Unifying Alef: `أحمد`, `إبراهيم`, `آمنة`, `ٱستعارة` → `احمد`, `ابراهيم`, `امنة`, `استعارة`.
   - Normalizing Taa Marbuta: `مكتبة` → `مكتبه`, `دورة` → `دوره`.
   - Normalizing Yaa: `محتوى` → `محتوي`, `إلى` → `الي`.
   - Extra whitespace collapse: `"  سلاح   العصر  "` → `"سلاح العصر"`.
2. **Search Edge Conditions:**
   - Empty query (`""`) returns all items.
   - Whitespace query (`"   "`) returns all items without crashing.
   - Special punctuation (`؟`, `!`, `*`, `...`) handled safely without regex exceptions.
   - Case insensitivity across English acronyms (`PRD`, `prd`, `Prd`, `STITCH`, `stitch`).
3. **Unhosted Templates Guard:**
   - Download buttons disabled or suppressed for templates with `isAvailable: false`.
   - Label explicitly renders "غير متاح" or "قريبًا".
   - Zero broken `#` or 404 links.
4. **Lecture 04 Strictly Pending:**
   - No mock video links or fake download files.
   - Status badge displays "بانتظار اعتماد المحتوى".
5. **Responsive Viewports & Overflow Guard:**
   - Breakpoints defined in CSS for `390px`, `768px`, `1024px`, `1366px`, `1440px`.
   - `overflow-x: hidden` and `max-width: 100vw` asserted on body/root layout.

### 3.3 Tier 3: Cross-Feature Combinations
1. **Search + Filter + Copy Flow:**
   - Applying query `"PRD"` + Stage `"Discovery"` + Tool `"Antigravity"` filters down to Prompt 02.
   - Copy action copies the full 27-section prompt body.
   - Visual confirmation toast triggered (`تم النسخ ✓`).
2. **Sequential Lecture Navigation Graph:**
   - Navigating sequentially: L01 (`next: 02`) → L02 (`prev: 01`, `next: 03`) → L03 (`prev: 02`, `next: 04`) → L04 (`prev: 03`, `next: 05`, pending notice) → L05 (`prev: 04`, `next: none`).
   - Ensures no disconnected lecture pages or circular loops.
3. **Diagrams Tab & Editor Integration:**
   - Switching between diagram tabs updates the editor URL (`mermaid.live`, `planttext.com`, `dbdiagram.io`) and switches language syntax accordingly.
4. **BorrowHub Rules & Data Schema Consistency:**
   - Verifies that business rule #3 (maximum 2 active loans) and rule #7 (admin confirms physical pickup) align with the `loan_requests` table schema and status values.

### 3.4 Tier 4: Real-World Application Scenarios
1. **Scenario 1 — Student Onboarding Journey:**
   - Student lands on Home (`/`), reads hero and slogan *"Don't Just Prompt. Engineer."*.
   - Clicks primary CTA "ابدأ رحلة التعلم" leading to `/start`.
   - Reviews the 8-step roadmap and golden rule: *"Agent ينفّذ، Skill يرشده، MCP يوصله، وPRD يحدد المطلوب"*.
   - Proceeds to `/lectures/01-product-discovery`.
2. **Scenario 2 — Hands-on Prompt Mining Journey:**
   - Student needs to draft PRD requirements.
   - Visits `/prompts`, searches for `Grill Me`, copies Prompt 01.
   - Visits `/templates` to inspect the 27-section PRD template.
   - Reviews common pitfalls in Lecture 01.
3. **Scenario 3 — Architecture & Database Analysis Journey:**
   - Student studies Lecture 03 (`/lectures/03-diagrams-erd`).
   - Opens `/diagrams` to inspect the difference between User Flow and Sequence diagram.
   - Moves to `/borrowhub` to inspect the 10 business rules and 5 database tables.
   - Reviews the database audit checklist (`database-review.md`).
4. **Scenario 4 — Design-to-Code Graduation Journey:**
   - Student studies Lecture 05 (`/lectures/05-uiux-stitch-frontend`).
   - Reviews steps A through L, verifies Stitch MCP instructions in `/tools`.
   - Confirms Frontend-Only boundary in `/faq`.
   - Verifies all graduation deliverables.

---

## 4. Test Execution Architecture

### 4.1 Test Harness Command
The automated test runner is executed from the project root via:
```bash
npx tsx scripts/verify-all.ts
```

### 4.2 CLI Options
- `npx tsx scripts/verify-all.ts` — Executes full 4-tier verification suite.
- `npx tsx scripts/verify-all.ts --tier=1` — Executes Tier 1 (Feature Coverage) only.
- `npx tsx scripts/verify-all.ts --tier=2` — Executes Tier 2 (Boundary & Corner Cases) only.
- `npx tsx scripts/verify-all.ts --tier=3` — Executes Tier 3 (Cross-Feature Combinations) only.
- `npx tsx scripts/verify-all.ts --tier=4` — Executes Tier 4 (Real-World Scenarios) only.
- `npx tsx scripts/verify-all.ts --json` — Emits structured JSON results for CI/agent automation.
- `npx tsx scripts/verify-all.ts --milestone=m1` — Runs milestone-filtered checks for current milestone.

### 4.3 Output Format
The runner outputs clear ANSI-formatted results:
- Tier grouping headers
- Individual test case name, status (`PASS`, `FAIL`, `PENDING_MILESTONE`)
- Failure diagnostics with expected vs. actual values
- Summary scoreboard: Total Tests, Passed, Failed, Pending, Duration
- Exit code: `0` when all non-pending assertions pass; `1` on regression or unexpected failure.

---

## 5. Coverage Thresholds & Quality Gates

| Gate | Scope | Target Threshold | Authoritative Source |
|------|-------|------------------|----------------------|
| **Gate 1: Route Coverage** | Dedicated App Router segments | 16/16 routes (100%) | ORIGINAL_REQUEST.md R1 |
| **Gate 2: Prompt Completeness** | Exact prompts verbatim | 30/30 prompts (100%) | Content Doc § 9 |
| **Gate 3: Lecture Fidelity** | L01-L05 content & L04 pending | 5/5 lectures (100%) | Content Doc § 3-8 |
| **Gate 4: Diagram Lab** | 8 diagram types with questions | 8/8 diagrams (100%) | Content Doc § 10 |
| **Gate 5: BorrowHub Model** | 10 business rules + 5 tables | 100% matched | Content Doc § 11 |
| **Gate 6: Zero Broken Links** | Templates availability badges | 100% unhosted marked "غير متاح" | ORIGINAL_REQUEST.md R4 |
| **Gate 7: Arabic Normalization** | Diacritics/Alef/Taa/Yaa vectors | 100% pass | `src/utils/searchUtils.ts` |
| **Gate 8: Responsive Guard** | Breakpoints & overflow rules | 0 horizontal scroll | ORIGINAL_REQUEST.md R5 |
| **Gate 9: TypeScript & Lint** | Compilation & type checking | 0 errors (`npm run lint`) | ORIGINAL_REQUEST.md AC |
| **Gate 10: Production Build** | Static generation of all routes | 16/16 static pages (`npm run build`)| ORIGINAL_REQUEST.md AC |

---

## 6. Maintenance & Ownership

- **Owner:** E2E Testing Track (`test_writer_e2e_1` & QA role)
- **Modifications:** Only test code and test specifications are modified within this track. Any implementation defects or missing features are escalated to the respective milestone implementation agents.
- **Milestone Sign-Off:** Milestone 6 requires a 100% pass rate of all 4 tiers before publishing final completion.
