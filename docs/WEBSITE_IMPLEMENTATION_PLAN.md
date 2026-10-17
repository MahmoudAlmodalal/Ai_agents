# Website Implementation Plan — MET Academy / سلاح العصر

## Strategy

Migrate from the current 12-card engineering guide to a typed, source-backed knowledge base without deleting working interactions. The new system will use a shared page shell and structured records for topics, prompts, tools, templates, glossary, and BorrowHub. Legacy HTML topic content remains available during migration, but new routes are the source of truth for navigation.

## Phase 0 — Audit and baseline

- [x] Read `Weapon_of_the_Era_Website_Content_AR.md`.
- [x] Inventory routes, components, data files, scripts, styles, and checks.
- [x] Create `docs/WEBSITE_CONTENT_AUDIT.md`.
- [x] Create `docs/WEBSITE_CONTENT_MAP.md`.
- [x] Create this plan.
- [ ] Commit and push audit baseline to `dev`.

**Gate:** audit files exist, source line count and current route/data evidence are recorded, and `npm run lint` is green.

## Phase 1 — Content registry and shared reader

- Add typed `LearningTopic`, `PromptEntry`, `ToolEntry`, `TemplateEntry`, and `GlossaryEntry` records.
- Add all 25 top-level topic records with source references and completion status.
- Add operation type to every prompt.
- Add shared topic reader with breadcrumbs, prerequisites, outputs, checklist, related topics, next step, and copyable code/prompt blocks.
- Add route-level metadata and a topic index.

**Gate:** every topic is indexed and reachable; no topic is marked complete without source-backed content.

## Phase 2 — Orientation, fundamentals, requirements, and GitHub

- Build `/start`, `/fundamentals/*`, `/requirements/*`, and `/github`.
- Migrate AI Agent / Skill / MCP explanation, project discovery, Grill Me workflow, all 27 PRD sections, Git/GitHub safety, and required outputs.
- Preserve complete project-neutral prompts.

**Gate:** beginner can produce `docs/PRD.md` without lecture navigation; prompt copy works; secret-handling warning is visible.

## Phase 3 — User Flow, domain, UML, database

- Build `/user-flow`, `/domain-model`, `/diagrams/*`, `/database/*`.
- Add valid Mermaid/PlantUML/DBML code examples and render guidance.
- Keep conceptual Domain Model distinct from Class Diagram and ERD.
- Add BorrowHub five-table example with documented constraints.

**Gate:** diagram source code is valid for its named renderer; DBML is never presented as Mermaid; conceptual model contains no database implementation details.

## Phase 4 — UI/UX, Stitch, Design System, MCP

- Build UI/UX fundamentals and screen discovery pages.
- Add nine-step Stitch prompt sequence, project-specific screen scope rules, design review, and prototype guidance.
- Add DESIGN.md extraction with “use approved visual values” warning.
- Add Stitch MCP secure setup, verification, extraction, and limitations.

**Gate:** design pages distinguish visual prototype from functioning application; no API key appears in examples; RTL/mobile/accessibility guidance is explicit.

## Phase 5 — Frontend planning, Pro Max, Spec Kit, implementation

- Build frontend-only planning pages and expected output file explanations.
- Add UI/UX Pro Max installation status and review prompts.
- Add Spec Kit Constitution → Specify → Clarify → Plan → Tasks → Analyze → Implement → Verify workflow.
- Add small-task implementation reader and stop-after-selected-task behavior.

**Gate:** no backend/API/database migration is promised; task records include inputs, files, dependencies, acceptance criteria, and verification.

## Phase 6 — QA, library, tools, templates, references

- Build `/testing`, `/prompts`, `/tools`, `/templates`, `/borrowhub`, `/glossary`, `/faq`.
- Index all 30 prompts with full text and metadata.
- Document the 19 required tools with official links and verified/illustrative command labels.
- Add source-to-page final coverage report.

**Gate:** search reaches every prompt, tool, topic, and glossary record; no fake download links; all visible links resolve; final QA report only claims executed checks.

## Verification loop after each phase

1. `npm run lint`
2. `npm run build`
3. Inspect changed routes and source content for RTL/LTR direction.
4. Verify copy buttons using the browser interaction layer.
5. Verify Mermaid/PlantUML/DBML snippets with their named renderer where practical.
6. Check navigation links and old-route compatibility.
7. Record missing source material instead of inventing it.
8. Commit and push that modification to `dev` before starting the next phase.

## Definition of done

- Topic-based navigation is the visible primary IA.
- All source-backed topics, prompts, tools, templates, glossary entries, and BorrowHub rules are indexed.
- Every prompt is individually copyable and labeled by operation type.
- The website teaches rather than merely summarizing.
- RTL text, LTR technical terms/code, responsive layouts, keyboard access, and search work.
- Build and type checks are executed and reported honestly.
- `docs/FINAL_CONTENT_COVERAGE_REPORT.md` identifies any remaining source gaps.
