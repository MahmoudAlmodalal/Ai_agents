# Website Content Map — Topic-Based IA

## Navigation principles

The site is organized by learning topic, technical concept, tool, workflow phase, practical step, prompt, and expected deliverable. Lecture numbers are not navigation categories. Legacy lecture URLs may remain as compatibility aliases, but every visible learning entry points to a topic route.

## Primary navigation

| Group | Route | Arabic label | Core deliverables |
|---|---|---|---|
| Orientation | `/` | الرئيسية | workflow overview, course identity |
| Orientation | `/start` | ابدأ هنا | prerequisites, first project checklist |
| Foundations | `/fundamentals/ai-agents` | أساسيات AI Agents | Agent / Skill / MCP / Prompt |
| Foundations | `/fundamentals/skills-and-mcp` | Skills وMCP | permissions, context, supervision |
| Requirements | `/requirements` | اكتشاف المتطلبات | problem, users, MVP, rules |
| Requirements | `/requirements/grill-me` | Grill Me | interview → approved decisions |
| Requirements | `/requirements/prd` | PRD | `docs/PRD.md`, 27 sections |
| Documentation | `/github` | Git وGitHub | repository, branches, docs, PR |
| Analysis | `/user-flow` | User Flow | `docs/user-flow.md` |
| Analysis | `/domain-model` | Domain Model | conceptual model files |
| Analysis | `/diagrams` | UML والمخططات | use case, activity, sequence, state, class |
| Data | `/database` | تحليل قاعدة البيانات | entities, keys, constraints |
| Data | `/database/erd` | ERD | DBML, Mermaid ERD, review |
| Experience | `/ui-ux` | UI وUX | usability, responsive, RTL, states |
| Experience | `/ui-ux/discovery` | اكتشاف الشاشات | UX blueprint, sitemap, inventory |
| Design | `/stitch` | Google Stitch | master prompt, screens, prototype |
| Design → Delivery | `/learn/google-ai-studio-stitch-workflow` | AI Studio وStitch إلى GitHub | AI Studio analysis, Stitch export, Frontend plan, phases, GitHub sync |
| Design | `/design-md` | Design System وDESIGN.md | approved visual contract |
| Integration | `/stitch/mcp` | Stitch MCP | verified design retrieval |
| Frontend | `/frontend` | تخطيط Frontend | Next.js plan, routes, components |
| Frontend | `/skills/ui-ux-pro-max` | UI/UX Pro Max | review and audit prompts |
| Frontend | `/skills/spec-kit` | GitHub Spec Kit | specify → plan → tasks → verify |
| Delivery | `/implementation` | التنفيذ التدريجي | phases, features, small tasks |
| Quality | `/testing` | Testing وQA | `docs/FINAL_FRONTEND_QA.md` |
| Library | `/prompts` | مكتبة البرومبتات | 30+ searchable full prompts |
| Library | `/tools` | دليل الأدوات | setup, verify, troubleshooting |
| Library | `/templates` | القوالب والملفات | lifecycle and validation |
| Reference | `/borrowhub` | دراسة BorrowHub | practical case study only |
| Reference | `/glossary` | القاموس | searchable Arabic definitions |
| Reference | `/faq` | الأسئلة الشائعة | boundaries, limitations, rules |

## Full learning path

`Idea → Requirements → PRD → GitHub → User Flow → Conceptual Domain Model → UML → ERD → UI/UX Discovery → Google Stitch → DESIGN.md → Stitch MCP → Next.js Frontend Plan → UI/UX Pro Max → Spec Kit → Incremental Frontend Implementation → Testing → GitHub handoff`

## Topic page contract

Every technical page exposes: Arabic/English title, definition, purpose, timing, workflow position, prerequisites, beginner explanation, terms, practical steps, official links, setup, verified commands, project-neutral example, optional BorrowHub example, complete prompt(s), prompt behavior, expected files, review/render instructions, mistakes, best practices, exercise, checklist, related topics, and next step.

## Content entity indexes

- **Topics:** 25 information-architecture areas above, with diagram subtopics as separate records.
- **Prompts:** 30 required prompt records from the source document plus approved supplementary prompts found during migration.
- **Tools:** Antigravity, Grill Me, Git, GitHub, Mermaid Live, PlantUML, PlantText, dbdiagram.io, Google Stitch, Stitch MCP, DESIGN.md, Next.js, React, TypeScript, Tailwind CSS, UI/UX Pro Max, Spec Kit, Node.js/npm, Python/uv.
- **Templates:** PRD, SRS, user flow, domain model, six diagrams, database/ERD/review, project context, UX requirements/blueprint/inventory, Stitch references, DESIGN.md, frontend plan/tasks/routes/components/data contracts, Spec Kit files, final QA.
- **Reference records:** glossary terms, FAQ answers, source limitations, BorrowHub business rules.

## Search index fields

Each entity is indexed by `slug`, Arabic title, English title, summary, category, workflow phase, tags, body, related topics, and output filenames. Prompt records also expose difficulty, required inputs, recommended tool, operation type, expected outputs, full prompt, usage steps, and common mistakes.
