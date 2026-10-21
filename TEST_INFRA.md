# Verification of the sequential project path

The current behavioral suite is Playwright under `e2e/`. The original four-tier source-text harness has been retired: file existence, copied search implementations, fixed lecture counts and a pending-lecture page do not establish working student journeys. Its historical implementation remains in Git.

## Commands

```sh
npm run lint
npx tsx --test src/lib/applicationChecklist.test.ts src/lib/legacyHtmlChecklist.test.ts
npx playwright install chromium
npm run test:e2e
npm run build
```

`scripts/verify-all.ts` now forwards to the same Playwright suite. It accepts Playwright file paths and options; its legacy `--json` switch maps to `--reporter=json`. Retired `--tier` and `--milestone` filters fail with migration guidance instead of silently ignoring them. The JSON format is Playwright's reporter format.

## Boundaries under test

- Browser journeys: index, full reading and preview, previous/next boundaries, prompts and actual clipboard writes, reference pages, favorites/history compatibility, theme, print invocation and speech API support.
- Public storage boundary: checklist identity, migration, malformed data and blocked storage. Selecting a criterion records self-assessment; it does not certify mastery.
- Responsive reading and keyboard access: widths 390, 768, 1024, 1366 and 1440; RTL prose, LTR technical content and no horizontal overflow.
- Educational review: inspect each published topic's inputs, steps, prompt, exercise and expected output, and whether the output supplies the next step. See `docs/edu-review/` and `docs/ISSUES_26_31_37_REVIEW.md` for evidence and limits.

Tests use the registered path rather than treating an old ordinal ID as a new topic. Ambiguous historical saves must remain preserved and visibly unresolved. Download links require real available files; unavailable materials must not expose dummy actions.

## Running safely

The default Playwright config starts a development server on port 3000 (`E2E_PORT` overrides it) and runs one worker. Server reuse is opt-in with `E2E_REUSE_SERVER=1`; the same setting applies locally and in CI. `E2E_SERVER=production` selects `npm run start` instead of the development server, so Playwright can either launch the built production app or reuse an existing production server on the selected port.

For example, after building once and starting the production app on port 3200, run:

```sh
E2E_SERVER=production E2E_REUSE_SERVER=1 E2E_PORT=3200 npm run test:e2e
```

The command selects port 3200 and reuses the server already listening there. If no server is available, Playwright launches the production command selected by `E2E_SERVER`. Use a port dedicated to the expected server when enabling reuse. Avoid simultaneous Next.js builds and servers on constrained machines.

If Google Chrome is already installed, `E2E_BROWSER_CHANNEL=chrome npm run test:e2e` selects it without downloading bundled Chromium. Omit the variable to use Playwright's default browser.

Run focused files during development; run the full suite after integration. Repeat only affected tests after a correction. Typechecking and build success are complementary checks, not educational or browser evidence.

Record **Passed**, **Failed**, or **Not Run** with the command and actual observation. Speech API stubs do not prove audible Arabic playback. Capturing `window.print` does not verify a native print dialog or paper output. Content-owner approval remains separate from automated and agent educational reviews; the already-closed pilot #33 remains unchanged, and no new acceptance is inferred from this verification.
