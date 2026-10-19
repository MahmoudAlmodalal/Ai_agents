# Educational review — ticket 20: Prompt Library

## Review status

**Source and instructional alignment: Passed.** I reviewed each source-defined prompt record, its displayed purpose and metadata, and its link to the project path. **Browser checks: Passed.** Three Playwright tests passed on 2026-10-19, covering search and filters, keyboard detail navigation, complete-text copy and clipboard failure messaging, plus the canonical deployment-topic link. **Running prompts through an AI provider: Not Run.** Manual visual browser review was not performed.

## Source and count evidence

The source inventory contains distinct groups; the count is derived from the assembled records, not the old page label or navigation badge:

| Source | Records | Catalog treatment |
|---|---:|---|
| `Weapon_of_the_Era_Website_Content_AR.md` | 30 numbered prompts (`PROMPT 01`–`PROMPT 30`) | Primary numbered collection |
| `src/lib/courseContent.ts` | 1 explicit supplementary `prompt-31-frontend-phased-implementation-plan` record | Supplementary prompt |
| `docs/PRACTICAL_PROMPTS_CHEATSHEET.md` | 3 named templates (`Prompt A`, `Prompt B`, `Prompt C`) | Separate general templates |
| `docs/PRACTICAL_PROMPTS_CHEATSHEET.md` | 7 individual code-blocked examples under stage headings | Separate stage-example group |
| **Total distinct source-backed copyable records** | **41** | Counted from the records passed to the library |

The sequential course spec says 33 prompts. Thirty numbered prompts plus the three separately named A/B/C templates account for 33, but that count omits the existing supplementary prompt 31 and the seven independently copyable stage examples in the cheatsheet. The app keeps the prompt sequence, supplementary item, general templates, and stage examples visibly distinct. It does not add unsourced text to reach a target number.

Older `TEST_INFRA.md`, `plan.md`, `TODO.md`, and `WEBSITE_CONTENT_MAP.md` describe the original 30-prompt inventory and are planning records, not additional prompt sources. Similar prompt snippets copied inside topic lessons are instructional uses of the catalog entries, not new library records.

## Instructional alignment

The primary numbered set follows the course work in order:

1. Prompts 01–04 cover discovery, PRD creation and review, and saving project documentation.
2. Prompts 05–13 cover user-flow and system diagrams, database design, and database review.
3. Prompts 14–23 cover UX requirements, screen planning, Stitch design and review, MCP verification, and design references.
4. Prompts 24–28 cover frontend planning and a staged Spec Kit workflow.
5. Prompts 29–31 cover frontend QA, handoff, and phased implementation planning.

The three general templates and seven stage examples remain separate from the numbered collection. They give students reusable preparation, review, handoff, and stage-specific phrasing without changing the numbered order. The detail screen keeps each original prompt text intact and displays its source group.

For numbered records, topic associations come from the topic catalog's `promptRefs` and canonical topic slugs. The cheatsheet records use explicit canonical slugs. Topics with published pages are linked; legacy topics with a route are marked as partial; topics with no registered route appear as non-link pending text. The deployment example uses the canonical wave 3 topic slug `backend-database-deployment` (topic 54, supplied by issue #22), which resolves to `/learn/backend-database-deployment` in the integrated registry. No obsolete generic `deployment` slug is retained.

The prompt topic references use these canonical wave 2 slugs: `frontend-incremental-implementation`, `github-docs-collaboration`, `prd-specification`, `relational-erd-design`, `ux-blueprint`, `screen-inventory`, `frontend-architecture-planning`, `backend-architecture-api-contracts`, and `auth-permissions`. The supplied slug check finds all nine in the registered wave 2 topic records; wave 3 registers `backend-database-deployment` at topic 54.

## Accuracy checks

- Purpose, inputs, outputs, tool, and warnings are presented separately from the complete source text.
- Source-specific restrictions remain visible, including prohibitions on inventing business rules, changing files during review-only prompts, exposing secrets, or claiming checks that did not run.
- PROMPT 24 and the supplementary plan retain their Frontend-only boundaries; PROMPT 29 requires actual QA results; PROMPT 30 proposes handoff material without authorizing a push or PR.
- No BorrowHub rule is presented as a general rule for a student's project.
- Copy success is announced only after the clipboard write resolves. Clipboard failure produces a failure message with manual-copy guidance.
- Search covers titles, full prompt bodies, purpose, inputs, outputs, tools, warnings, and topic titles. Filters include category, operation, source group, and topic availability.
- Listing cards and controls use native links, buttons, inputs, and selects with visible keyboard focus.

## Centralized integration completed

The shared registry, navigation, and footer were updated during centralized integration. Legacy `topic-11` (`slug: 'prompt-library'`) now describes the prompt library as a reference collection, uses `reference` metadata and prompt-specific tags, reports the 41 source-backed records, and no longer describes QA. The wave-3 source arrays for topics 45–58 are registered centrally.

The library imports `getAllTopics()` from `topicRegistry.ts` to build topic references, so `topicRegistry.ts` does not import `promptLibrary.ts`. The library page derives its displayed counts from the assembled records. The Navbar uses a nonnumeric `بحث ونسخ` badge, and the Footer label is `مكتبة البرومبتات الكاملة`.

The public sequential course spec and ticket breakdown now say that the full available library contains 41 source-backed records. This reconciles the old 33 count with the actual source inventory; the 33 count represented only the 30 numbered primary prompts plus Prompt A/B/C. No wording or business rule was altered to manufacture a record.
