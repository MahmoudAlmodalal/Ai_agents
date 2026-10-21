# Learning pilot review — issues #34–37

Date: 2026-10-18. Scope: homepage, first topic (`project-idea-mvp`), and shared reader behavior needed for this pilot. Content owner review remains pending before extending the lesson pattern to other topics. Parent issue #33 stays open.

## Review path

1. Open `/` and choose **ابدأ بالموضوع الأول**. The full first topic opens directly.
2. Read the goal, prerequisites, completed BorrowHub example, own-project exercise, common mistakes, and output criteria.
3. Copy the worked context or the exercise template and prepare `docs/PROJECT_CONTEXT.md` for a project of your choice. BorrowHub is optional.
4. Select checklist criteria. Refresh, return to the homepage, and open **معاينة سريعة**. The same criteria retain their selections.
5. Clear a criterion in the preview, return to the full reader, and verify the change. Visit another topic and check that its choices remain separate.
6. Navigate freely to the next topic and back. Published content and content awaiting further work have distinct labels; checklist choices do not certify mastery or lock navigation.

## Verification ledger

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| TypeScript | Passed | `npm run lint` on the final implementation |
| Production build | Passed | `CIRCLE_NODE_TOTAL=2 NODE_OPTIONS=--max-old-space-size=3072 npm run build`; production server starts on port 3000 |
| Pilot browser journeys | Passed | All 24 cases in `application-checklist`, `learning-pilot-integration`, `project-idea-lesson`, `saved-data-compat`, and `topic-navigation` passed against the production build |
| Full course browser suite | Failed | 113 cases: 108 Passed, 5 Failed. After correcting the stale Git predecessor expectation, its targeted recheck Passed (1 case); four failures remain and reproduce at the original commit (details below) |
| Checklist persistence and storage failures | Passed | 12 public storage boundary checks; production browser cases cover both readers, recovery, malformed data and verified inline saves |
| Viewports: 390, 768, 1024, 1366, 1440 | Passed | Full reading, preview width, keyboard selection, reload, focus restoration, RTL Arabic samples and LTR technical filenames; manual inspection of 390px screenshots |
| Search, filtering, favorites, recent history | Passed | Browser compatibility cases include original saved IDs and current topic IDs across cards, preview and full reading |
| Clipboard and theme | Passed | Actual clipboard text and feedback in both readers, single-write legacy copy regression, theme controls and reload |
| Print command and print styling | Passed | Browser print invocation captured and print media styling checked |
| Native print dialog and paper output | Not Run | Requires manual print review |
| Speech control API wiring | Passed | Deterministic browser boundary check exercises speak/pause/resume/cancel and Arabic language selection |
| Audible Arabic speech | Not Run | The boundary check does not establish audible playback or Arabic voice availability |
| Educational walkthrough | Passed | [Completed own-project exercise and criterion review](ISSUE_35_LEARNING_REVIEW.md); no learner study or owner approval is claimed |
| Content owner approval | Not Run | Review this pilot before extending the lesson pattern |

The successful browser coverage comprises 109 of the 113 unique current cases across the full production run and the one corrected-navigation recheck. There are no remaining failures in the 24 pilot cases. The broader course suite is not fully green.

Final gate commands:

```sh
npm run lint
npx tsx --test src/lib/applicationChecklist.test.ts src/lib/legacyHtmlChecklist.test.ts
CIRCLE_NODE_TOTAL=2 NODE_OPTIONS=--max-old-space-size=3072 npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
npx playwright test --output=/tmp/ai-agents-production-results --reporter=line
npx playwright test e2e/path/git-github.spec.ts --grep 'learning page /learn/git-project-docs' --output=/tmp/ai-agents-git-rerun-results --reporter=line
```

The final full browser log is `/tmp/ai-agents-production-e2e.log`; the isolated original-checkout comparison is `/tmp/ai-agents-baseline-e2e.log`; the build log is `/tmp/ai-agents-build.log`. The temporary baseline worktree was removed after the comparison. At completion of this review, implementation and test changes were local and uncommitted. Subsequent delivery is recorded in Git history; no GitHub issue state or deployment was changed during verification.

## Boundaries

- Checklist persistence is local to the current browser and device. If storage is blocked or malformed, current choices remain usable in memory with a visible warning; durable saving is not claimed.
- Unmapped legacy saves are preserved without guessing which new criterion they represent. Changed criterion text requires a new assessment.
- Shared reader changes do not complete or approve the remaining course content.
- No deployment, GitHub issue closure, or content owner approval is implied by passing automated checks.

## Original checkout comparison

An isolated checkout of the original commit `8b2feda` ran the original `e2e/path/visual-modeling.spec.ts` with bundled Chromium on port 3100. Result: **4 Failed, 1 Passed**. Its application code and test expectations were unchanged; only browser/server configuration was adapted to this environment.

The four original failures expect a missing header label (`أدوات وصيغ المخططات النصية`), missing source-block labels (`MERMAID SOURCE — User Flow` and `MERMAID SOURCE — Conceptual Domain Model`), or a missing topic-card title (`صيغة المخططات النصية`). The underlying visual-modeling lesson source is unchanged by the pilot. These checks remain visible failures rather than being weakened to accept different course material. Broader lesson reconciliation is outside this first-topic pilot.

## Integration corrections

- Copy feedback originally disappeared because a toast context update replaced authored HTML. The HTML markup object is now stable across those updates, and obsolete inline copy handlers are removed so each click writes once. A regression check verifies that inline checklist listeners still work after copying.
- Both theme controls now follow the current document theme. Visual toggling still works if storage rejects a write.
- Current topic IDs now resolve to canonical slugs after the frozen legacy mappings. Favorites and history keep the same meaning across cards, preview and full reading; unknown saved values remain preserved.
- The mobile preview header uses separate title and action rows. The first output is a plain filename, with its scope explained in the lesson goal.
- Existing reader tests were updated for the explicit preview action, the self-assessment label, neutral publication labels, and actual published neighbor topics. Clipboard tests grant browser clipboard permissions explicitly.

During verification, simultaneous development and baseline servers exceeded the environment's memory limit (one recorded OOM kill). Connection-refused runs from that interruption do not establish application failures or successes. Final browser verification runs sequentially against the production build.

## Verification continuation — 2026-10-19 (Issues #31 & #37)

Date: 2026-10-19. Scope: Bounded browser evidence matrix expansion for the learning pilot in `e2e/learning-pilot-integration.spec.ts`. Preserves all historic entries from 2026-10-18. Parent issue #33 stays open awaiting content-owner review.

### Viewport matrix expansion

The first two public browser journeys in `e2e/learning-pilot-integration.spec.ts` were parameterized across all five user acceptance viewports (390, 768, 1024, 1366, and 1440 px), alongside the existing five-width reading and preview suite:

1. **Search, filters, and theme survival** (390, 768, 1024, 1366, 1440):
   - Explicit per-test viewport setup (`setViewportSize({ width, height: 900 })`).
   - Supports public mobile search interaction (`button "البحث"`) to reveal the search input on small viewports (390px) while maintaining direct desktop input access on larger viewports.
   - Behavioral assertions preserved: category filtering, empty state, filter reset, theme toggling, direct navigation to `/learn/project-idea-mvp`, reload theme persistence, and light-mode restoration.
2. **Authored content copy, print, and speech controls** (390, 768, 1024, 1366, 1440):
   - Explicit per-test viewport setup (`setViewportSize({ width, height: 900 })`).
   - Behavioral assertions preserved: clipboard copy verification, print control invocation, deterministic Web Speech API boundary control checks (speak with `ar-SA`, pause, resume, cancel), and print media styling hiding action controls.
3. **Reading, preview, checklist, and focus** (390, 768, 1024, 1366, 1440):
   - Maintained all existing behavioral assertions (keyboard navigation, focus outline, RTL text direction, LTR code samples, checklist selection persistence across reload, quick preview modal bounds, and escape key dismiss).
   - Replaced tall full-page screenshot with standard viewport screenshots of both the homepage and the first topic across all five viewports.

### Screenshot artifacts

Normal viewport screenshots (viewport-bounded, non-tall) captured for root visual inspection:
- `test-results/pilot-homepage-390.png`
- `test-results/pilot-homepage-768.png`
- `test-results/pilot-homepage-1024.png`
- `test-results/pilot-homepage-1366.png`
- `test-results/pilot-homepage-1440.png`
- `test-results/pilot-first-topic-390.png`
- `test-results/pilot-first-topic-768.png`
- `test-results/pilot-first-topic-1024.png`
- `test-results/pilot-first-topic-1366.png`
- `test-results/pilot-first-topic-1440.png`

### Continuation verification ledger

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| TypeScript | Passed | `npm run lint -- --incremental false` exited 0 |
| Learning pilot matrix (15 cases) | Passed | `E2E_PORT=3199 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/learning-pilot-integration.spec.ts --output=.verification/pilot-matrix-results --reporter=line` (15 passed) |
| Search & filter at 390, 768, 1024, 1366, 1440 | Passed | All 5 viewport cases passed with public search interaction and filter verification |
| Copy, print & speech at 390, 768, 1024, 1366, 1440 | Passed | All 5 viewport cases passed with deterministic boundary verification |
| Reading & preview at 390, 768, 1024, 1366, 1440 | Passed | All 5 viewport cases passed with focus, RTL, bounds, and checklist persistence |
| Native print dialog and paper output | Not Run | Requires manual print review; boundary tests verify print API trigger and CSS media |
| Audible Arabic speech | Not Run | Web Speech API boundary stub checks wiring only; audible voice synthesis is not tested |
| Content owner approval | Not Run | Issue #33 remains open awaiting content-owner review before generalizing pattern |
