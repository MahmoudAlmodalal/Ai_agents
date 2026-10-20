# Issue #40 review: Apply the Ai_agents identity to the entry and reading journey

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 02] Apply the Ai_agents identity to the entry and reading journey  
**Date:** 2026-10-20  
**Status:** In Progress / Partially Verified (code implementation complete; browser journey and theme switching verified across 5 widths; full visual approval matrix remains with the course owner)

---

## 1. Summary of changes

In accordance with DEC-50 and Course Owner Decision Package 70 (v2, 2026-10-20, Course-owner decisions section), the approved Ai_agents identity was applied across the entry and reading journey, retiring legacy MET Academy branding while preserving all 58 canonical topics, local learner storage, and existing reading tools.

### Key modifications:
- **Identity proposal and owner decision record ([`docs/AI_AGENTS_IDENTITY_PROPOSAL.md`](../AI_AGENTS_IDENTITY_PROPOSAL.md)):**
  - Updated the status line to reference approval by course owner per DEC-50 and Course Owner Decision Package 70 (Course-owner decisions section).
  - Recorded decisions 1–4 as Approved (three-node A mark `public/ai-agents-mark.svg`, ink/porcelain/indigo/lime palette with dark mode mapping, typography stack, and Arabic positioning line “فكّر بوضوح. ابنِ بثقة.”).
  - Recorded decision 5 as **Deferred** to the offline follow-up with the honest reason that remote Google Fonts are cross-origin, are not cached by the same-origin service-worker bundle, and rely on the system fallback font stack during offline usage.
- **Single toast event mechanism ([`src/components/Toast.tsx`](../../src/components/Toast.tsx)):**
  - Replaced legacy MET blue container styling with Ai_agents ink (`#17231f`) and lime (`#c7f36b`) border/icon tokens.
  - Standardized on a single custom event `ai-agents-toast` across `showToast`, `showGlobalToast`, and `ToastProvider`.
  - Completely removed the redundant parallel `met-toast` dispatch and listener after confirming no other file in `src/`, `e2e/`, or `release-e2e/` references it.
- **Home screen alignment and copyright year ([`src/app/page.tsx`](../../src/app/page.tsx)):**
  - Aligned the home footer bar with the approved Ai_agents name, slogan, and copyright year: `Ai_agents — الدليل الهندسي لبناء وبرمجة المشاريع ونمذجة الأنظمة بالذكاء الاصطناعي · فكّر بوضوح. ابنِ بثقة. © {current year}` alongside `/` and `Esc` shortcut badges.
- **Browser verification coverage ([`e2e/site-journey.spec.ts`](../../e2e/site-journey.spec.ts)):**
  - Extended the Playwright suite with end-to-end assertions for the landing-to-reader journey across all 5 established responsive widths (390, 768, 1024, 1366, 1440 px), touch target sizing (>= 44px on mobile), LTR technical identifiers, visible focus rings, reader tools retention, and clean theme switching between warm porcelain (`#f5f5f0`) and deep ink (`#101613`).

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Result |
|---|---|---|
| **1. Reviewable logo, palette, typography, and responsive entry/reading design; record course-owner approval before treating visual direction as final.** | **Observed in browser & code:** Vector mark `public/ai-agents-mark.svg` uses ink `#17231F`, lime `#C7F36B`, and lavender `#AAA1FF`. Color tokens in `src/app/globals.css` set light canvas `#F5F5F0`, dark canvas `#101613`, dark surface `#151D19`, main ink `#17231F`, interaction `#5547D8`, and accent `#C7F36B`. Typography stack configures IBM Plex Sans Arabic, Manrope, and JetBrains Mono with system fallbacks. Course-owner approval is formally recorded in `docs/edu-review/owner-decision-package-70.md` (Course-owner decisions section) and `docs/AI_AGENTS_IDENTITY_PROPOSAL.md`.<br><br>**Not Run - remaining visual approval gap:** The full visual matrix across dashboard, prompt editing, preview modal, navigation drawer, and screenshots across all widths/themes remains open for final human visual sign-off. | **Partially Passed** (Direction approved & implemented; full visual matrix remains open) |
| **2. Retain Ai_agents name and apply approved identity consistently.** | Navigation brand link displays `Ai_agents` with `/ai-agents-mark.svg` logo; product metadata in `src/app/layout.tsx`, `src/app/metadata.ts`, and `public/manifest.webmanifest` consistently use `Ai_agents`; reader header (`.learning-reader-header`) and controls inherit approved design tokens; feedback toasts use ink `#17231f` and lime `#c7f36b`. | **Passed** |
| **3. Explain outcomes and provide clear start action, direct full reading, and optional preview while preserving working navigation.** | Landing page hero clearly explains outcomes (“من فكرة أولية إلى منتج برمجي تفهمه وتختبره” with guiding AI agents); “ابدأ بالموضوع الأول” links directly to `/learn/project-idea-mvp`; topic cards provide direct reading link “قراءة الموضوع كاملاً” and modal preview “معاينة سريعة”; existing routes (`/start`, `/about`, `/borrowhub`, `/tools`, `/templates`, `/glossary`, `/faq`, `/prompts`, `/roadmap`, `/saved`) remain fully operational. | **Passed** |
| **4. Respect DEC-50 as superseding prior MET branding and colors.** | DEC-50 is fully honored: prior MET Academy branding and colors are retired across navigation, reader controls, entry surfaces, and toast notifications. All touchpoints use Ai_agents tokens. | **Passed** |
| **5. Preserve Arabic RTL prose, LTR technical text, visible keyboard focus, usable touch controls, and supported theme behavior.** | `html[dir="rtl"]` enforced across all routes; technical values like `docs/PROJECT_CONTEXT.md` explicitly use `dir="ltr"` in code tags; visible outline ring (`var(--focus-ring)`) confirmed on focus; minimum touch target height >= 44px confirmed at 390px; theme toggle cleanly transitions between light (`#f5f5f0`) and dark (`#101613`) without breaking layout or contrast. | **Passed** |
| **6. Verify landing-to-reader journey and affected screens at established responsive widths; record remaining visual approval gaps accurately.** | **Observed in browser:** Landing-to-reader journey verified at 390, 768, 1024, 1366, and 1440 px with zero horizontal overflow (`scrollWidth <= innerWidth`) on both entry and reader pages.<br><br>**Not Run - remaining visual approval gap:** The comprehensive visual matrix specified in `docs/AI_AGENTS_IDENTITY_PROPOSAL.md` (dashboard, prompt editing state, optional preview modal, navigation drawer, both themes at every width, and captured visual screenshots beyond the 390px reference) is Not Run. | **Partially Passed** (Journey verified; visual matrix gap recorded) |

---

## 3. Verification commands and exact results

### Gate 1: Typecheck and lint
```sh
npm run lint
```
**Outcome:** Passed (exit code 0).
```
> ai-agents@1.0.0 lint
> tsc --noEmit
```

### Gate 2: Unit tests
```sh
npx tsx --test src/lib/*.test.ts
```
**Outcome:** Passed 59/59 unit tests (exit code 0, duration: ~470ms).
```
ℹ tests 59
ℹ suites 0
ℹ pass 59
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

### Gate 3: Production build
```sh
npm run build
```
**Outcome:** Passed (exit code 0).
- 182 static pages generated successfully.
- No compilation or bundling warnings.

### Gate 4: Playwright journey verification (Chromium / Google Chrome)
```sh
E2E_SERVER=production E2E_PORT=3300 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/site-journey.spec.ts e2e/topic-navigation.spec.ts
```
**Outcome:** Passed 18/18 tests (exit code 0, duration: 47.3s).
- `reading remains usable when speech synthesis is unavailable` (Passed)
- `landing-to-reader journey applies approved Ai_agents identity at 390px` (Passed)
- `entry and reference pages support reading and keyboard links at 390px` (Passed)
- `landing-to-reader journey applies approved Ai_agents identity at 768px` (Passed)
- `entry and reference pages support reading and keyboard links at 768px` (Passed)
- `landing-to-reader journey applies approved Ai_agents identity at 1024px` (Passed)
- `entry and reference pages support reading and keyboard links at 1024px` (Passed)
- `landing-to-reader journey applies approved Ai_agents identity at 1366px` (Passed)
- `entry and reference pages support reading and keyboard links at 1366px` (Passed)
- `landing-to-reader journey applies approved Ai_agents identity at 1440px` (Passed)
- `entry and reference pages support reading and keyboard links at 1440px` (Passed)
- `theme toggle switches cleanly between warm porcelain light theme and deep ink dark theme` (Passed)
- `opens the full reader directly and follows the real first and second topics` (Passed)
- `last available topic has a previous link and no invented next topic` (Passed)
- `optional preview traps keyboard focus and restores its opener` (Passed)
- `copy buttons work in the full reader and optional preview` (Passed)
- `retired composite routes reach the active index without a conflicting reader` (Passed)
- `copy feedback keeps authored DOM and application checklist state after toast updates` (Passed)

### Gate 5: Regression suites verified (Chromium / Google Chrome)
```sh
E2E_SERVER=production E2E_PORT=3300 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/entry-compatibility.spec.ts e2e/navigation-category-consistency.spec.ts
```
**Outcome:** Passed 17/17 tests (exit code 0, duration: 37.7s).
- `historical User Flow save keeps its content meaning, not its mislabeled PRD title` (Passed)
- `ambiguous recent history survives subsequent reading and the five-item display limit` (Passed)
- `entry question explains both answers and opens the first topic with a keyboard at 390px` (Passed)
- `entry question explains both answers and opens the first topic with a keyboard at 768px` (Passed)
- `entry question explains both answers and opens the first topic with a keyboard at 1024px` (Passed)
- `entry question explains both answers and opens the first topic with a keyboard at 1366px` (Passed)
- `entry question explains both answers and opens the first topic with a keyboard at 1440px` (Passed)
- `Start and About describe the same Full-Stack program and postpone execution setup` (Passed)
- `old lecture and reference URLs reach available topics and references` (Passed)
- `prototype-like unknown persisted strings in bookmarks and history do not crash homepage and survive new save/view` (Passed)
- `Navbar tagline displays Full-Stack scope and does not end at frontend` (Passed)
- `Topic links lead directly to canonical topics without redirecting to index` (Passed)
- `Counts derive dynamically from current registry and filtering semantics` (Passed)
- `Preserves legacy route destinations for historical links and bookmarks` (Passed)
- `Footer contains canonical learning path and updated Full-Stack description` (Passed)
- `Search-only term displays matching cards and aligns category filter chip counts` (Passed)
- `Favorites candidate filter derives counts exclusively from saved favorites` (Passed)

---

## 4. Deviations, gaps, and decision log

- **Visual sign-off remains with the course owner:** This issue does not claim completed visual approval. While automated behavioral tests confirm the landing-to-reader journey, LTR/RTL text direction, touch targets, and color/theme switches across all 5 widths, human visual sign-off across the full matrix (dashboard, prompt editor, modal preview, drawer, multi-theme screenshots) remains with the course owner.
- **Deferred font self-hosting:** Google Fonts are loaded from remote stylesheets with system font fallbacks (`system-ui`, `-apple-system`, `Segoe UI`, `ui-monospace`). Because remote fonts are cross-origin, they are not cached by the same-origin service worker offline bundle; font self-hosting remains deferred to the offline asset follow-up.
- **Single toast event:** Pre-removal audit verified that no file in `src/`, `e2e/`, or `release-e2e/` referenced `met-toast`. The event was consolidated to `ai-agents-toast`, eliminating the duplicate event path.
