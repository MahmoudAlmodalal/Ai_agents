# MET Academy — Implementation Task List

## 1. Foundation and migration

- [ ] Replace the generic 12-topic navigation model with the approved MET Academy course information architecture while preserving reusable UI components and existing working behavior.
- [ ] Add the approved Arabic RTL shell, responsive navigation, footer, active route state, focus styles, and LTR treatment for English code/technical diagrams.
- [ ] Add `public/manus-routes.json` containing every implemented page route and keep it synchronized with source.
- [ ] Create typed course data for lectures, prompts, diagrams, tools, templates, glossary, FAQ, and resource availability without inventing unavailable materials.
- [ ] Preserve the MET Academy navy/green/light visual identity and remove irrelevant generic AI Agents claims from visible content.

## 2. Core pages

- [ ] Build `/` with the approved hero, course promise, seven-stage path, lecture summary, BorrowHub callout, audience, and final CTA.
- [ ] Build `/start` with the first eight learner steps, required setup, and the Agent/Skill/MCP/PRD explanation.
- [ ] Build `/lectures` with published/pending statuses, course progress framing, and links to each lecture.
- [ ] Build `/lectures/01-product-discovery` with explanations, concepts, application steps, the complete 27-section PRD list, outputs, and common mistakes.
- [ ] Build `/lectures/02-prd-github-user-flow` with PRD review, PRD vs SRS, Git/GitHub definitions and hands-on, and Mermaid User Flow; explicitly exclude MVP Development Tasks as a standalone lecture topic.
- [ ] Build `/lectures/03-diagrams-erd` with all approved diagram lenses, ERD focus, BorrowHub example, database review questions, and outputs.
- [ ] Build `/lectures/04-pending` as a clearly marked pending lesson with no invented educational content.
- [ ] Build `/lectures/05-uiux-stitch-frontend` with UX discovery, Stitch, prompts, prototype, Stitch MCP, DESIGN.md, frontend-only Next.js plan, Spec Kit, UI/UX Pro Max, and QA boundaries.
- [ ] Add previous/next lecture navigation and a collapsible lesson progress rail.

## 3. Prompt Library

- [ ] Import all approved PROMPT 01–30 from the source document exactly, preserving code and prompt wording.
- [ ] Give every Prompt its own clearly labeled section/card with goal, files/read context, output, tool, warnings, prompt code, and working copy button.
- [ ] Add search and category/status filters; keep code blocks LTR and show an accessible copy-success state.

## 4. Diagrams and BorrowHub

- [ ] Build `/diagrams` with the eight diagram types, their questions, elements, formats, official tools, approved prompt numbers, and comparison/error guidance.
- [ ] Add Mermaid rendering only for supported examples and visibly distinguish Mermaid, PlantUML, DBML, and code.
- [ ] Build `/borrowhub` with story, roles, latest documented business rules, core student journey, available-file status, table list, database questions, and a review-against-PRD warning.
- [ ] Never create broken download links; show unavailable/coming-soon states for absent files.

## 5. Tools and reference pages

- [ ] Build `/tools` with the authoritative tool purposes, official links, commands, and security notes.
- [ ] Build `/templates` with the approved template inventory and accurate availability states.
- [ ] Build `/glossary` with the approved terminology table and search.
- [ ] Build `/faq` with the approved questions and answers.
- [ ] Build `/about` with the course description, training philosophy, and learner outputs.

## 6. Quality and handoff

- [ ] Verify every internal navigation link and every external official tool link.
- [ ] Verify prompt copy buttons and keyboard focus/announcements.
- [ ] Verify responsive behavior at 390, 768, 1024, 1366, and 1440 widths, including no horizontal overflow.
- [ ] Run TypeScript/lint and production build; record actual results in `docs/FINAL_FRONTEND_QA.md`.
- [ ] Review secrets and unrelated user data before commits.
- [ ] Commit and push each significant logical section to `origin/development`.
