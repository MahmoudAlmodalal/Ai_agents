# Issue #46 review: Customize, retain, and copy prompts from the library

**Parent issue:** [MahmoudAlmodalal/Ai_agents#38](https://github.com/MahmoudAlmodalal/Ai_agents/issues/38)  
**Task reference:** [MVP #38: 08] Customize, retain, and copy prompts from the library  
**Date:** 2026-10-20  
**Status:** Verified / Complete

---

## 1. Summary of implementation and owner decision alignment

Per the course-owner decisions recorded on 2026-10-20 in [`docs/edu-review/owner-decision-package-70.md`](owner-decision-package-70.md) (v2, Course-owner decisions section), the prompt customization behavior was accepted as final policy:
- One browser-local saved copy per prompt (`localStorage` key `ai-agents-prompt-customizations-v1`).
- Explicit save and reset actions: learner edits a custom draft for their project without silently modifying or overwriting source material.
- Source-text revision tracking using an FNV-1a hash digest (`promptSourceRevision`).
- Coherent stale-source handling: when an original source prompt is updated, the learner's saved customization is preserved intact and an informative stale-source notice is shown.
- Full clipboard copy of the selected version (original or customized) with fallback to legacy copy and honest reporting on clipboard denial/failure.
- Honest storage failure messaging for blocked reads, quota exhaustion (`write-error`), and malformed stored JSON (`invalid`), ensuring corrupted data is never silently wiped.
- Accessible editing controls with RTL Arabic prose and LTR/auto prompt text, visible keyboard focus rings, and touch target sizing.

---

## 2. Observable proof for each acceptance criterion

| Acceptance criterion | Observable behavior and proof | Result |
|---|---|---|
| **1. Prepare the editing, original-text preservation, local saving, and reset interaction for course-owner approval before treating it as final.** | Proposed policy and interaction were documented in `docs/ISSUES_44_45_46_50_REVIEW.md` and formally accepted by course owner MahmoudAlmodalal on 2026-10-20 in `docs/edu-review/owner-decision-package-70.md` (v2, item 40). Implemented as final behavior without inventing diverging variants or approval gates. | **Passed** |
| **2. Extend the existing searchable prompt library and preserve stable prompt identities and Topic references.** | Verified 42 stable prompts in `src/lib/promptLibrary.ts` across catalog (`01`–`31`), supplementary, and cheatsheet templates (`A`, `B`, `C`, stage examples 1–7). Searchable by title, operation, category, and source group at `/prompts`. Canonical topic references link directly to `/learn/[slug]` with publication status (`available`, `partial`, `pending`). | **Passed** |
| **3. Keep the original prompt available while a learner edits an individual customization; do not silently overwrite source material.** | Verified in `PromptCopyPanel.tsx`: learner toggles between “الأصل” and “تخصيصي”. The original prompt is permanently preserved in a read-only `<pre>` block sourced from `PROMPT_LIBRARY`. Editing or saving in “تخصيصي” never modifies the original source. Switching back to “الأصل” immediately displays and allows copying the untampered source text. | **Passed** |
| **4. Copy the complete selected version to the clipboard and report unsupported or failed copying accurately.** | Verified at the browser boundary in `e2e/prompt-copy.spec.ts`: copying when “الأصل” is selected writes the complete original text to `navigator.clipboard`. Copying when “تخصيصي” is selected writes the complete custom draft. When `navigator.clipboard.writeText` rejects and legacy copy fails, status displays `تعذر النسخ من هذا المتصفح. النص الكامل ظاهر؛ حدده وانسخه يدويًا.` instead of falsely claiming success. Legacy copy fallback via `execCommand` functions when the modern API is unavailable. | **Passed** |
| **5. Restore saved customizations under the approved policy, handle a changed source prompt coherently, and report storage failure honestly.** | Verified in `e2e/prompt-copy.spec.ts` and `e2e/dashboard-prompt-export.spec.ts`: saved customization restores on page reload and defaults to custom mode. When source revision differs from saved revision, a warning banner alerts the learner (`تغير النص الأصلي منذ حفظ هذا التخصيص`) while retaining their custom text. If storage write throws `QuotaExceededError`, status reports `التخصيص متاح في هذه الجلسة، لكن تعذر حفظه محليًا.`. If storage contains corrupted JSON, it is left byte-for-byte untouched and reported as `بيانات التخصيص المحلية غير صالحة؛ لم تُستبدل.`. | **Passed** |
| **6. Use accessible editing controls and correct direction for Arabic prose and technical prompt text.** | Verified in `src/components/PromptCopyPanel.tsx`: container and labels use Arabic RTL prose; prompt code and `<textarea>` editor use `dir="auto"` and `font-mono`, ensuring LTR display for English technical prompts and RTL for Arabic text; textarea has an accessible label (`htmlFor`) and helper description (`aria-describedby`); mode toggle buttons use `aria-pressed`; interactive controls have visible focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-400`); touch targets meet minimum accessible dimensions. | **Passed** |
| **7. Verify search-to-edit-to-copy, original/customized switching, reset, reload, source revisions, and failed clipboard/storage behavior at the browser boundary.** | Verified in Playwright against the production Next.js build: `e2e/prompt-copy.spec.ts` (8 tests) and `e2e/dashboard-prompt-export.spec.ts` (6 tests) cover the complete journey: search -> open -> toggle -> edit -> copy -> reload -> reset -> stale source -> storage error -> malformed storage -> clipboard failure. All 14 tests passed in Chromium. | **Passed** |

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
**Outcome:** Passed 64/64 tests (exit code 0, duration: ~1065ms).
```
✔ several failed saves remain in the session snapshot and merge safely when storage recovers (7.015011ms)
✔ a failed removal remains visible and is applied after a later refresh (0.803179ms)
✔ blocked reads keep requested session edits until a later focus-style refresh succeeds (0.666055ms)
✔ malformed saved data stays byte-for-byte intact and is reported as invalid (0.507716ms)
✔ source revisions change when the original prompt text changes (0.347841ms)
ℹ tests 64
ℹ suites 0
ℹ pass 64
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
```
   ▲ Next.js 15.5.28
   Creating an optimized production build ...
 ✓ Compiled successfully in 6.1s
   Linting and checking validity of types     ✓ Linting and checking validity of types 
   Collecting page data     ✓ Collecting page data 
 ✓ Generating static pages (182/182)
   Finalizing page optimization     ✓ Finalizing page optimization
```

### Gate 4: Playwright browser verification (production server, Chromium / Google Chrome)
```sh
E2E_SERVER=production E2E_PORT=3254 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/prompt-copy.spec.ts e2e/dashboard-prompt-export.spec.ts
```
**Outcome:** Passed 14/14 tests (exit code 0, duration: 21.3s).
```
Running 14 tests using 1 worker

[1/14] …le downloads a ZIP with real content and honest missing-resource entries
[2/14] …rner records survive reload and remain isolated to their browser profile
[3/14] …empts prior when their saved policy or question versions no longer match
[4/14] …rowser data is marked unconfirmed in the dashboard and exported manifest
[5/14] …re stays visible after a blocked write and same-tab dashboard transition
[6/14] …, copies the full custom text, resets, and flags a stale source revision
[7/14] …rches, filters, opens a prompt by keyboard, and copies the complete text
[8/14] … › reports a clipboard failure instead of claiming the prompt was copied
[9/14] …ough the legacy clipboard fallback when the Clipboard API is unavailable
[10/14] …inks the deployment example to the canonical backend and database topic
[11/14] …y: switches original/custom, saves, survives reload, and resets cleanly
[12/14] …e source revision coherently while preserving the learner customization
[13/14] … honestly when saving customization fails due to quota or storage error
[14/14] …alformed customization storage honestly without overwriting or crashing
  14 passed (21.3s)
```

### Additional test suites verified
```sh
E2E_SERVER=production E2E_PORT=3254 E2E_BROWSER_CHANNEL=chrome npx playwright test e2e/entry-compatibility.spec.ts e2e/path/discovery-prd-srs.spec.ts e2e/path/git-github.spec.ts
```
**Outcome:** Passed 20/20 tests (exit code 0, duration: 33.5s).

---

## 4. Deviations, gaps, and decisions

- **Course-owner approval:** Fully accepted on 2026-10-20 per `owner-decision-package-70.md` v2. No pending or unapproved policy variants exist.
- **Scope boundaries:**
  - One saved copy per prompt in browser-local storage. No accounts, backend databases, or cross-device syncing.
  - Export snapshot correctly packages both original and custom versions into `prompts/original/` and `prompts/customized/` inside the ZIP archive.
- **Unsatisfied criteria:** None. All 7 acceptance criteria have been verified with observable browser and runtime behavior.
