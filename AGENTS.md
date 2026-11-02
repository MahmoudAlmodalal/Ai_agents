# AGENTS.md

## Project

Arabic-first (RTL) learning site for AI-assisted software engineering. Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4. Content-driven; no backend, auth, database, or API routes. Learner state (bookmarks, quiz attempts, offline bundles) lives in browser `localStorage` / Cache API.

Live brand is `Ai_agents`. Many docs still say MET Academy / سلاح العصر / Weapon of the Era — historical naming, not a second product.

## Commands

```sh
npm ci                                  # npm is the package manager (package-lock.json)
npm run dev                             # 0.0.0.0:3000
npm run lint                            # tsc --noEmit only; there is no ESLint/Prettier
npx tsx --test "src/**/*.test.ts" "src/**/*.test.tsx"   # all unit tests (node:test)
npx tsx --test src/lib/topicStorage.test.ts             # single file
npm run build                           # next build
npx playwright install chromium
npm run test:e2e                        # Playwright, auto-starts dev server
npx playwright test e2e/reference-content.spec.ts       # focused suite
npx playwright test --config playwright.release.config.ts  # requires npm run build first
```

`package.json` has no `test` script. Unit tests are colocated `*.test.ts(x)` under `src/` and run through `tsx`, not Jest/Vitest.

Playwright facts:
- Config runs one worker, `fullyParallel: false`, and launches its own server.
- `E2E_PORT` overrides port 3000; `E2E_SERVER=production` uses `npm run start`; `E2E_REUSE_SERVER=1` is opt-in only when a server is already listening; `E2E_BROWSER_CHANNEL=chrome` uses installed Chrome.
- Do not run Next builds and servers concurrently on constrained machines.
- `scripts/verify-all.ts` is only a compatibility shim that forwards to Playwright. `--tier` / `--milestone` fail by design. `TEST_READY.md` is historical; `TEST_INFRA.md` is current.

## Content architecture

- `src/lib/topicRegistry.ts` is the executable source of truth for topic order, slugs, and legacy aliases. `UNIFIED_TOPICS` is assembled from `src/data/topics/wave2|wave3` modules.
- Exactly **58 canonical topics** is a hard invariant asserted in tests and `scripts/learning_content_hashes.ts`. Adding, removing, or renumbering a topic is cross-cutting: topic module → `WAVE2_TOPIC_SOURCES`/`WAVE3_TOPIC_SOURCES` → `PROPOSED_EDUCATIONAL_GROUPS` in `src/lib/educationalRoadmap.ts` → learning content → hash baselines → the hard-coded 58 guards.
- Lesson metadata/HTML lives in `src/data/topics/`; quiz/rubric/objectives live in `src/data/learning/` (groups A and B), built via `buildTopic`/`buildTopicB` and merged in `src/lib/learningContent.ts`.
- `tsconfig.json` maps `@/*` to the **repo root**, not `src/`. Imports are `@/src/...` and `@/scripts/...`.
- Legacy topic IDs, slugs, and route aliases in `topicRegistry.ts` plus storage migrations exist to preserve old saves and URLs. Do not delete them; e2e compatibility tests cover this.
- After intentional learning-content edits, bump that topic's `contentVersion` (see the loop at the end of `src/data/learning/group-a.ts`) so saved offline snapshots refresh.
- `src/data/learning/learning-content-hashes.json` and `learning-content-review-summary.json` are regression baselines. Regenerate with `npx tsx scripts/learning_content_hashes.ts` only when a content change is deliberate; `group-split.test.ts` uses them to detect byte-level drift.
- `public/sw.js` is a hand-written service worker. Offline bundles validate `contentVersion`, quiz metadata, diagrams, and asset dependencies; changes there are high-risk.

## Conventions and constraints

- UI is Arabic RTL (`<html lang="ar" dir="rtl">`). Code blocks, Mermaid/PlantUML/DBML, commands, and URLs must be explicitly `dir="ltr"`.
- Unit tests assert exact Arabic wording, review states (`draft` / `approved`), approval metadata, and evidence dates. Wording changes usually require test updates.
- Educational honesty is enforced: assessments are self-assessment, never mastery/accreditation/verified results. Do not add claims like these.
- Never expose fake downloads, prototypes, or actions for unavailable files; show unavailability honestly.
- `docs/` mixes current specs with historical review ledgers. Prefer executable config and `TEST_INFRA.md`; do not treat every `docs/*REVIEW*.md` claim as current.
- `@google/genai`, `express`, and `dotenv` are declared dependencies but unused in `src/`; the app has no server-side API.
