# MET Academy — Implementation Task List

## 1. Foundation and migration

- [ ] Replace the generic 12-topic navigation model with the approved MET Academy course information architecture while preserving reusable UI components and existing working behavior.
- [ ] Add the approved Arabic RTL shell, responsive navigation, footer, active route state, focus styles, and LTR treatment for English code/technical diagrams.
- [ ] Add `public/manus-routes.json` containing every implemented page route and keep it synchronized with source.
- [ ] Create typed course data for lectures, prompts, diagrams, tools, templates, glossary, FAQ, and resource availability without inventing unavailable materials.
- [ ] Preserve the MET Academy navy/green/light visual identity and remove irrelevant generic AI Agents claims from visible content.

## 2. Topic-based course content

- [ ] Keep the existing 12-topic cards, search, category filters, favorites, TTS, print, and modal reader as the primary experience.
- [ ] Re-map topic titles, subtitles, summaries, tags, categories, and counts to the approved course content instead of generic AI Agents material.
- [ ] Improve Topic 01 with the approved Start Here workflow and the Agent/Skill/MCP/PRD distinction.
- [ ] Improve Topics 02–03 with the real Grill Me, PRD 27-section structure, review method, outputs, and open-question discipline.
- [ ] Improve Topic 04 with Git/GitHub and User Flow Mermaid; do not add MVP Development Tasks to this topic.
- [ ] Improve Topics 05–06 with the approved Database/ERD and eight diagram lenses, keeping code and diagrams LTR.
- [ ] Mark Topic 07 as the approved lecture-04 pending state without invented lecture content.
- [ ] Improve Topics 08–10 with UX Discovery, Stitch, screen prompts, prototype, Stitch MCP, DESIGN.md, Frontend-only Next.js planning, Spec Kit, and UI/UX Pro Max.
- [ ] Use Topic 11 as the searchable PROMPT 01–30 library and Topic 12 as BorrowHub plus reference materials, or expose these as sections within the existing topic reader without breaking routes.
- [ ] Keep unavailable downloads/resources visibly unavailable and avoid broken links.

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
