# Issue #27 — tools and reference templates

Reviewed 2026-10-19 against source sections 12–13 and the sequential project learning specification. Content-owner approval (#33) remains pending.

## Delivered and educational review

- The exact fourteen reference templates replace the previous seventeen-file list. Every card explains inputs, expected student output, update/review lifecycle, and links to its active topic. The descriptions are reference fields, not complete templates.
- Source-to-path review covers idea → decision log → PRD/review → flow/domain/use case/sequence/ERD → screen inventory → DESIGN.md → frontend plan/task → QA. Domain concepts stay distinct from database tables; diagram changes follow approved requirements; frontend tasks can use local mock data without waiting for a backend.
- No reference template files exist in the repository or public assets. All fourteen are explicitly unavailable for download, with no download anchors or invented files. Copying reference fields works. Real file download is **Not Run / not applicable until actual files are supplied**, rather than reported as passed.
- Twelve source tools describe purpose, timing, inputs, outputs and lifecycle. Coding agent, installed Skills and MCP setup start at frontend coding after Prototype. Manual requirements interviews remain possible earlier.
- The existing thirteen-agent directory and filters remain supplementary. Its old installation commands and pricing/free-tier claims are not presented as verified instructions; the directory clearly qualifies remaining editorial comparison descriptions.

## Official-source verification

These are documentation checks, not installations or account tests. No packages, providers or accounts were provisioned.

| Reference | Evidence and resulting guidance |
| --- | --- |
| [Next create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) | Verified TS, Tailwind, ESLint, App Router, src-dir and npm flags. `latest` remains explicitly version-sensitive; use a new project directory. |
| [DESIGN.md](https://github.com/google-labs-code/design.md) | Verified `npx @google/design.md lint DESIGN.md`. A structural lint result does not prove visual fidelity. |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Verified CLI package, Antigravity integration and npx invocation. Installation was not executed. |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | Verified `uv tool install specify-cli`, Python 3.11+ and uv prerequisites. Integration key and init syntax are referred to the installed-version guide; no unconditional agy/Converge promise. |
| [Google Stitch MCP codelab](https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch?hl=ar) | Verified API key + MCP Store IDE workflow and test request. No live account/connection execution. |
| [Antigravity docs](https://antigravity.google/docs) | Official entry redirects to getting-started; PowerShell installer text was not verified and is not reproduced as checked. CLI and IDE setup remain distinct. |
| [Matt Pocock skills](https://github.com/mattpocock/skills) | Official source has agent-specific installation choices; do not claim a successfully installed grill-me skill or universal slash command. |
| [Mermaid](https://mermaid.js.org/intro/), [PlantUML Use Case](https://plantuml.com/use-case-diagram), [DBML](https://dbml.dbdiagram.io/docs/) | Checked official reference destinations and supported diagram/syntax purposes. Rendered student artifacts were not generated in external services. |
| [Git](https://git-scm.com/docs), [Stitch](https://stitch.withgoogle.com/) | Official entrypoints opened. No universal OS install command or account quota guarantee is given. |

## Verification evidence

- **Passed:** `npm run lint` (`tsc --noEmit --incremental false`) with zero errors.
- **Passed:** `E2E_BROWSER_CHANNEL=chrome E2E_PORT=3199 npx playwright test e2e/tools-templates.spec.ts e2e/path/stitch-mcp-design-md.spec.ts e2e/path/tech-stack.spec.ts --output=/tmp/agy-tools-final --reporter=line` — 18 tests passed (56.4s), including the 4 focused tests in `e2e/tools-templates.spec.ts`: real browser clipboard read/write, fourteen availability states, absence of fake download links, active topic navigation, every reference destination HTTP 200, directory filter, Tailwind v4/@theme mapping, and horizontal overflow checks across 390/768/1024/1366/1440px viewports.
- **Environment and Port Note:** Port 3000 on this machine was occupied by an external project (`phone sales/frontend`); running against 3000 returned that project's 404 page. The course Next.js dev server runs on port 3199 (as confirmed in `.verification/integration-findings.txt`), where all 18 tests execute and pass cleanly.
- **Observed and fixed:** destination verification first failed on `/learn/git-github-workflow` (404); changed to the actual `/learn/git-project-docs`, rerun passed.
- Initial browser test attempt could not launch bundled Chromium; root supplied system Chrome through an optional shared configuration. That run is not behavioral red evidence.
- **Not Run here:** full-suite/build integration (owned by orchestrator), external installations, external account/MCP execution, actual template file download, manual screen-reader review. Automated overflow checks do not establish visual/accessibility approval.
