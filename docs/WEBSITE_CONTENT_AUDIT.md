# Website Content Audit — MET Academy / سلاح العصر

**Audit date:** 2026-10-17  
**Authoritative source:** `Weapon_of_the_Era_Website_Content_AR.md`  
**Scope:** existing Next.js application, source course document, current content/data model, navigation, and required topic-based restructuring.

## Executive finding

The repository is a working RTL Next.js learning interface with useful reusable UI primitives: searchable cards, filters, bookmarks, recently viewed items, dark mode, print support, text-to-speech, Mermaid rendering, and copy buttons. However, its information architecture is still centered on 12 numbered topics and the existing navigation includes `/lectures`, which conflicts with the non-negotiable requirement to organize learning by topic, technical concept, tool, workflow phase, practical step, prompt, and deliverable.

The source document is substantially richer than the current `TOPICS` catalog. It defines 25 navigation destinations, a complete Idea → Frontend QA workflow, 30 approved prompts, tool pages, templates, glossary/FAQ, BorrowHub case study, UI requirements, and explicit limitations. The current app therefore needs a content-driven topic catalog and route system rather than more generic cards.

## Existing implementation inventory

| Area | Current evidence | Finding | Action |
|---|---|---|---|
| Framework | Next.js 15, React 19, TypeScript, Tailwind v4 | Suitable foundation | Preserve |
| Global direction | `src/app/layout.tsx`, `lang="ar"`, `dir="rtl"` | RTL is correctly established | Preserve and strengthen code LTR |
| Homepage | `src/app/page.tsx` | Client-side card browser with filters and modal reader | Reframe as topic-based learning hub |
| Content model | `src/data/topicsData.ts`, 12 `scripts/topics/topic*.ts` files | Numbered topics, several with content not supported by the authoritative document | Replace with structured content catalog; retain reusable renderer |
| Navigation | `src/components/Navbar.tsx`, `Footer.tsx` | Includes `/lectures` and lecture language | Remove lecture-first navigation; preserve compatibility redirects/links only where needed |
| Search | `SearchHeader`, `searchUtils` | Searches titles, tags, summaries, and HTML content | Extend to topics, prompts, tools, and glossary |
| Prompt UX | HTML `.copy-btn` wiring in `TopicDetailModal` | Copy works for rendered content but prompts are not first-class records | Create prompt-detail views with explicit metadata and copy action |
| Diagrams | `MermaidViewer`, diagram engine | Existing support for rendered Mermaid | Keep; expose diagram topics and code separately |
| Accessibility | skip link, focus-visible, responsive styles | Good baseline | Add semantic nav, landmark labels, code direction, keyboard dialog behavior |
| Verification | `npm run lint` maps to `tsc --noEmit`; `npm run build` exists | Basic checks available | Run after each implementation section and report honestly |
| Source material | `Weapon_of_the_Era_Website_Content_AR.md` (1,334 lines) | Authoritative content is present in repo | Map all source sections before marking coverage complete |

## Source-to-page coverage matrix

| Source area | Required destination(s) | Current coverage | Status |
|---|---|---:|---|
| Home / Start Here | `/`, `/start` | Partial | Needs topic-first copy and workflow CTA |
| AI Agents Fundamentals | `/fundamentals/ai-agents`, `/fundamentals/skills-and-mcp` | Partial in topic 01 | Needs dedicated routes and beginner template |
| Project Discovery & Requirements | `/requirements` | Partial | Needs dedicated concept pages |
| Grill Me | `/requirements/grill-me` | Prompt exists in source; not first-class | Needs page + prompt record |
| PRD | `/requirements/prd` | Partial in topic 02 | Needs all 27 sections and review prompts |
| Git & GitHub | `/github` | Partial in topic 07 | Needs hands-on guide and secrets safety |
| User Flow | `/user-flow` | Partial in topic 03 | Needs Mermaid syntax/rendering guide |
| Domain Model | `/domain-model` | Partial in topic 04 | Must remain conceptual; no keys/types/methods |
| UML diagrams | `/diagrams/*` | Partial | Needs separate pages for six diagram types |
| Database & ERD | `/database`, `/database/erd` | Partial in topic 05 | Needs DBML/Mermaid distinction and five-table example |
| UI/UX Fundamentals | `/ui-ux` | Partial in topic 08 | Needs complete beginner glossary and state design |
| UX Discovery & Screen Planning | `/ui-ux/discovery`, `/ui-ux/screen-inventory` | Missing as routes | Needs screen specification template |
| Google Stitch | `/stitch/*` | Partial in topic 08 | Needs nine-step prompt sequence and project-specific caveats |
| Design System / DESIGN.md | `/design-md` | Partial in topic 09 | Must use verified Stitch values, not invented tokens |
| Stitch MCP | `/stitch/mcp` | Partial in topic 09 | Needs secure setup and limitation notes |
| Next.js Frontend Planning | `/frontend/*` | Partial in topic 10 | Must explicitly remain frontend-only |
| UI/UX Pro Max | `/skills/ui-ux-pro-max` | Partial in topic 10 | Needs verified installation and review prompts |
| Spec Kit | `/skills/spec-kit` | Partial in topic 10 | Needs Constitution → Verify workflow |
| Incremental implementation | `/implementation` | Partial in topic 10 | Needs one-feature/one-task workflow |
| Testing & QA | `/testing` | Partial in topic 11 | Needs final QA prompt and honest command status |
| Prompt Library | `/prompts`, `/prompts/[slug]` | Existing content but not indexed | Needs 30 first-class searchable entries |
| Tools Directory | `/tools`, `/tools/[slug]` | Partial in topic 12 | Needs 19 tool records with official links and setup status |
| BorrowHub | `/borrowhub` | Partial | Verify all documented business rules against source before definitive wording |
| Templates & files | `/templates` | Partial | Need purpose/lifecycle/validation for each file |
| Glossary / FAQ | `/glossary`, `/faq` | Partial | Need searchable entries and related links |
| Content audit/report | `docs/*.md` | Missing | This audit is the baseline; final report comes last |

## Non-negotiable content controls

1. No navigation or page title may use lecture numbers as the primary organizing principle.
2. BorrowHub remains a case study; general prompts must use project-neutral placeholders.
3. Conceptual Domain Model must not contain methods, PK/FK, SQL types, or database columns.
4. The documented BorrowHub workflow keeps administrator confirmation of handover and return; it must not be simplified to student-confirmed return.
5. Frontend planning is frontend-only: no real backend, API, or migration may be implied.
6. Version-sensitive commands must be marked verified only after checking their official source; otherwise they are clearly labeled as illustrative/current-check-needed.
7. Every prompt is preserved in full and marked as analysis, documentation generation, diagram generation, visual design, code modification, or test execution.
8. Missing/awaiting material is flagged instead of invented.

## Coverage risks found

- The source document itself contains historical lecture references in legacy sections; these must be retained only as provenance or migrated into topic pages, never as primary navigation.
- The existing 12 topic scripts include material such as backend layers, multi-tenancy, N+1, and Figma that is not part of the requested authoritative learning path. These require a source check before surfacing as course requirements.
- Existing UI labels say “المحاضرات” in multiple places and need a global wording audit.
- The app currently renders most content through HTML strings. This makes prompt metadata, route-level SEO, and structured navigation harder; new content should use typed records while legacy HTML is migrated gradually.

## Audit conclusion

The repository is a strong visual/interaction starting point, but not yet a complete topic-based educational knowledge base. The next safe change is to introduce a typed content registry for topics, prompts, tools, templates, glossary, and case-study records; add route-level readers; then migrate source-backed content in workflow order. The plan below deliberately avoids an uncontrolled rewrite.
