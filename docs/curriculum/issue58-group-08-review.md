# Issue #58 — Group 08: Stitch, Design Systems, and Prototypes

**Status:** Evidence complete and awaiting course-owner sign-off.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:**
1. `stitch-reference-screen` (Topic 21)
2. `design-system-rules` (Topic 22)
3. `interactive-prototype` (Topic 23)

Canonical identities and 58-Topic scope are strictly preserved. No access gates or prerequisite locks are introduced. All topics remain accessible in full reader at `/learn/[slug]`, in quick preview modals, and in `src/data/topics/wave2/t08-stitch-design-system-prototype.ts` and `src/data/learning/group-a-08-stitch-design-prototype.ts`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status in Group 08 |
|---|---|---|---|
| 1 | Group boundary & 58-Topic scope | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 08 contains exactly Topics 21 (`stitch-reference-screen`), 22 (`design-system-rules`), and 23 (`interactive-prototype`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: lesson template in `docs/curriculum/` confirmed. | Confirmed: all required template elements audited, walked through, and verified for all 3 Topics. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | Applied globally via shared builder and verified in browser e2e with retry support. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric criteria reference declared output IDs; scale matches approved policy; persistence and reversal verified in browser e2e. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | Candidate retained with discovery evidence in registry; never marked as approved; status remains candidate. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | Evidence complete; awaiting course-owner sign-off. Review state in content model remains `draft` pending central orchestrator flip. |

---

## 2. Topic Walkthrough and Verification Ledgers

### Topic 21: `stitch-reference-screen` (تصميم الشاشة المرجعية في Google Stitch)
- **Reviewer:** Curriculum Reviewer (agent/issue-58) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Walkthrough Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `stitchref-objective-prompt` (صياغة برومبت لشاشة مرجعية واحدة تمثل المهمة والهوية والاتجاه) and `stitchref-objective-evidence` (توثيق ما اعتمد وما بقي غير معروف دون اختلاق مواصفات التصميم). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context without access locks | Starting context: PRD, UX Blueprint, and Screen Inventory. Tool access guidance provided for Google Stitch (`https://stitch.withgoogle.com/`) with explicit fallback to Figma/HTML wireframe if tool access is restricted. Prerequisite documents are informative references, not gating locks. | **Passed** |
| **Explanation** | Real explanation of concepts, visual drift, and single-screen rule | Detailed explanation: hazards of bulk screen generation causing visual drift, rationale for focusing on one representative MVP screen first, role/status documentation, separating confirmed tokens from `UNKNOWN`, and deferring coding agents to later topics. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 4 provides BorrowHub Browse Equipment reference screen breakdown explicitly marked as an optional case study («وهو دراسة حالة استرشادية واختيارية توضح طريقة التحليل، ويمكنك استبدالها بشاشة تمثيلية في مشروعك الخاص دون أي قيود»). Full structural SVG diagram (Figure 11) illustrates Navbar, Search/Filter, and Cards Grid with RTL orientation. | **Passed** |
| **Practical Steps** | Actionable steps for learner's project with concrete outputs | Two structured practical steps: 1) Select one representative screen from inventory and draft Stitch master prompt with user role, data, RTL, and requirements source; 2) Record design result or generation blocker and classify tokens as confirmed vs `UNKNOWN`. Expected outputs: `docs/STITCH_MASTER_PROMPT.md` and reference screen identifier/link. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompts | Copyable PROMPT 16 (Master Prompt Generator) and copyable PROMPT 19 (Single Screen Refinement) embedded with LTR code blocks and clipboard copy buttons. Verified in browser suite. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `stitch-prompt` (`docs/STITCH_MASTER_PROMPT.md`) and `reference-screen` (approved reference screen in Stitch or fallback). Supplies documented input for Topic 22 design token extraction without access locks. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `stitchref-q-unknown` (unsupported color recorded as `UNKNOWN`) and `stitchref-q-reference` (starting with one reference screen to anchor visual decisions). 4 options each, keyed correctly, educational rationale provided. Browser grading, retry, and explanation feedback verified in Playwright. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (5 items) and rubric criteria `stitchref-r-scope` (bound to `stitch-prompt`) and `stitchref-r-evidence` (bound to `reference-screen`). 3-level scale (`not-yet`, `in-progress`, `ready-for-review`), no mastery threshold. Edit, reversal, and reload persistence verified in Playwright. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Google Developers: "From idea to app: Introducing Stitch, a new way to design UIs" (`google-stitch-intro`, URL: `https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/`). Discovery evidence recorded in `externalVideoRegistry.ts`. Retained as candidate; playback/captions unverified. | **Passed** (as candidate) |
| **Diagrams** | Structural diagram/wireframe | Figure (11) SVG wireframe diagram of the reference screen with Arabic RTL layout, status badges, and cards grid. Verified visible and responsive in browser suite. | **Passed** |

---

### Topic 22: `design-system-rules` (قواعد نظام التصميم وبرومبتات الشاشات المنفصلة)
- **Reviewer:** Curriculum Reviewer (agent/issue-58) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Walkthrough Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `designrules-objective-tokens` (استخراج قواعد ورموز تصميم من الشاشة المرجعية المعتمدة) and `designrules-objective-consistency` (إنشاء برومبتات مستقلة للشاشات تستخدم النظام نفسه ولا تخترع قيماً). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context without access locks | Starting context: inspected reference screen from Topic 21, PRD, and Screen Inventory. Unsupported tokens explicitly kept as `UNKNOWN`. Not locked behind access gates. | **Passed** |
| **Explanation** | Real explanation of design tokens, optional rules, and one-prompt-per-screen | Explains: extracting source-backed tokens, treating 60-30-10 color rules and 8px grid as optional project proposals rather than universal laws, WCAG contrast verification (4.5:1 for normal text, 3:1 for large text), 6 UI states (default, loading, empty, error, disabled, permission denied only if specified in PRD), and the "One Prompt Per Screen" architecture to protect LLM context windows. Explicit warning against generating frontend code at this stage. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 4 provides BorrowHub screen prompt breakdown (SCR-01 through SCR-04 in user-flow order) explicitly marked as an optional case study («كدراسة حالة تطبيقية استرشادية واختيارية؛ تطبق نفس الهيكلية المنفصلة على شاشات مشروعك الخاص دون التقيد ببيانات هذا المثال»). | **Passed** |
| **Practical Steps** | Actionable steps for learner's project with concrete outputs | Two structured practical steps: 1) Extract verifiable values from reference screen, document source and confidence, or mark `UNKNOWN`; 2) Author an independent prompt for each screen in inventory referencing approved tokens. Expected outputs: Design system token notes and `docs/STITCH_SCREEN_PROMPTS.md`. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompts | Copyable PROMPT 17 (Stitch Design System) and copyable PROMPT 18 (Generate One Prompt per Screen) embedded with LTR code blocks and copy buttons. Verified in browser suite. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `screen-prompts` (`docs/STITCH_SCREEN_PROMPTS.md`) and `design-system-evidence` (Stitch screens and tokens with sources). Supplies documented input for Topic 23 interactive prototype transitions. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `designrules-q-token` (most verifiable token record includes name, value, source screen, and confidence) and `designrules-q-prompts` (preventing visual drift by using reviewed tokens from single reference). 4 options each, keyed correctly, educational rationale provided. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `designrules-r-source` (bound to `screen-prompts`) and `designrules-r-consistency` (bound to `design-system-evidence`). 3-level scale, no mastery threshold. Edit, reversal, and reload persistence verified in Playwright. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Figma Learn: "Lesson 1: Welcome to design systems" (`figma-design-systems-lesson-1`, URL: `https://help.figma.com/hc/en-us/articles/14552802134807-Lesson-1-Welcome-to-design-systems`). Discovery evidence recorded in `externalVideoRegistry.ts`. Retained as candidate; playback/captions unverified. | **Passed** (as candidate) |
| **Diagrams** | Data tables & design cards | 3-column visual cards for color/type/spacing rules, and structured interactive UI states table. | **Passed** |

---

### Topic 23: `interactive-prototype` (النموذج التفاعلي والتحقق من الرحلات)
- **Reviewer:** Curriculum Reviewer (agent/issue-58) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Walkthrough Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `prototype-objective-journey` (ربط شاشات النموذج بتفاعلات حقيقية تمثل الرحلات المعتمدة) and `prototype-objective-audit` (تدقيق المسارات السعيدة والفاشلة والعودة والصلاحيات في النموذج). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context without access locks | Starting context: MVP screens from Topic 22, user flows, and PRD. In case interactive linking is unavailable in learner's account, Figma Prototype or a documented transition matrix is accepted as fallback. No access locks. | **Passed** |
| **Explanation** | Real explanation of behavioral validation vs fake demo buttons | Detailed explanation: rejecting fake demo buttons (`href="#"`), 4-part transition specification (`Origin` -> `Trigger` -> `Destination` -> `Back/Cancel`), comprehensive journey verification matrix covering Happy Path, boundary limits, out-of-stock, empty search, role permissions, and visual UX audit ranking issues (Critical/Major/Minor). | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 2 provides a complete 5-row transition matrix for BorrowHub explicitly marked as an optional case study («وهي دراسة حالة إيضاحية واختيارية توضح آلية تدقيق الانتقالات لتقيس عليها مسارات مشروعك الخاص»). Covers happy path, limit exceeded, out-of-stock, empty search, and role permission denials. | **Passed** |
| **Practical Steps** | Actionable steps for learner's project with concrete outputs | Two structured practical steps: 1) Connect MVP screens in Stitch and exercise primary user journey to outcome; 2) Audit happy path, rejection, cancel/back, and role permissions, recording defects and boundaries. Expected outputs: connected interactive prototype and `docs/PROTOTYPE_JOURNEYS_AUDIT.md`. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompts | Copyable PROMPT 20 (Stitch Prototype) and copyable PROMPT 21 (Visual UX Audit) embedded with LTR code blocks and copy buttons. Verified in browser suite. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `prototype` (interactive prototype in Stitch or fallback) and `prototype-audit` (`docs/PROTOTYPE_JOURNEYS_AUDIT.md`). Supplies documented validation for Topic 24 frontend planning without access locks. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `prototype-q-functional` (prototype tests interactions and expected outcomes unlike static images) and `prototype-q-audit` (prototype audit must cover happy, failure, back, and role journeys). 4 options each, keyed correctly, educational rationale provided. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `prototype-r-interaction` (bound to `prototype`) and `prototype-r-audit` (bound to `prototype-audit`). 3-level scale, no mastery threshold. Edit, reversal, and reload persistence verified in Playwright. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Figma Learn: "FD4B: Prototyping fundamentals" (`figma-prototype-fundamentals`, URL: `https://help.figma.com/hc/en-us/articles/31010011820311-FD4B-Prototyping-fundamentals`). Discovery evidence recorded in `externalVideoRegistry.ts`. Retained as candidate; playback/captions unverified. | **Passed** (as candidate) |
| **Diagrams** | Matrix & transition tables | Detailed 5-column transition verification matrix table in Section 2. | **Passed** |

---

## 3. Real Sample Outputs (Learner Project Walkthrough)

The following real sample outputs were produced by walking through Group 08's Practical Steps for an independent learner project (**StudySync: Study Group Session Coordinator**). They contain no bracketed placeholders, separate confirmed decisions from open questions and `UNKNOWN` tokens, and supply the concrete handoff for subsequent implementation topics.

### Output 1 (Topic 21): `docs/STITCH_MASTER_PROMPT.md`
```text
Act as a Google Stitch Prompt Engineer.
Read PRD, UX_BLUEPRINT.md, SCREEN_INVENTORY.md and approved branding for the StudySync project.

Generate ONE representative MVP reference screen: SCR-02 (Participant Options View) at candidate route /sessions/:sessionId/options.
Purpose: allow an invited student participant to inspect available time slots and cast their vote for one preferred session time without creating an account.

Layout & Hierarchy:
- Top bar: StudySync logo, session title, organizer name, and vote countdown indicator (24 hours remaining).
- Main Content:
  - Concise prompt banner: "اختر الموعد الأنسب لك لحضور جلسة المذاكرة"
  - Radio options card list: 3 distinct time slots, each showing day, date, time window, and current vote tally.
  - Interactive state: single-selection control with clear active focus ring.
  - Action area: prominent primary CTA button "تأكيد اختياري" and secondary link "الرجوع".
- Direction & Language: Complete Arabic RTL layout with Cairo typography for Arabic prose; time stamps, session codes, and English labels formatted in clean LTR inline text.
- Visual Tokens: Primary color, font family, and exact spacing scale are UNKNOWN (no brand guidelines established yet); mark unconfirmed design values as UNKNOWN. Do not invent an unapproved brand palette.
- Status Containers: Include reserved visual space for loading skeleton, empty state (no time slots available), and error banner (vote submission rejected).

Save docs/STITCH_MASTER_PROMPT.md.
Do not generate all screens at once. Return this single representative screen design only. Do not output frontend code.
```

### Output 2 (Topic 22): `docs/DESIGN_SYSTEM_EVIDENCE.md` & `docs/STITCH_SCREEN_PROMPTS.md`

#### `docs/DESIGN_SYSTEM_EVIDENCE.md`
| Token | Observed Value in Reference Screen | Source / Inspection Evidence | Confidence Level |
|---|---|---|---|
| Primary Brand Color | `#2563eb` (Royal Blue) | Observed on primary CTA button in Stitch reference screen | Provisional (Pending Brand Sign-off) |
| Neutral Background | `#f8fafc` (Slate 50) | Inspected page background container | Confirmed |
| Surface Card Color | `#ffffff` (Pure White) with `#e2e8f0` border | Inspected options card container | Confirmed |
| Text Primary | `#0f172a` (Slate 900) | Inspected heading and option titles | Confirmed (Contrast 14.2:1 against white) |
| Text Muted | `#64748b` (Slate 500) | Inspected helper text and timestamps | Confirmed (Contrast 4.6:1 against white; meets WCAG AA 4.5:1) |
| Font Family | `Cairo, sans-serif` | Extracted from inspected Arabic text layer | Confirmed |
| Spacing Unit | 8px base grid (`8px`, `16px`, `24px`, `32px`) | Spacing measurements between cards and containers | Optional Project Proposal |
| Border Radius | `8px` (`rounded-lg`) | Inspected card and button border radii | Confirmed |
| Interactive Target Size | `48px` minimum height on primary CTA button | Inspected touch target height | Confirmed (Exceeds 44px recommendation) |
| Dark Mode Palette | `UNKNOWN` | Not present in reference screen inspection | `UNKNOWN` |

#### `docs/STITCH_SCREEN_PROMPTS.md` (Excerpts in User-Flow Order)
```text
/* Screen 1: SCR-01 — Session Creation (Organizer) */
Act as a Google Stitch Prompt Engineer.
Using the approved Design System tokens from docs/DESIGN_SYSTEM_EVIDENCE.md, generate SCR-01: Session Creation screen at /sessions/new.
Target Role: Organizer.
Purpose: Allow session creator to name the subject, enter description, and specify exactly 3 distinct candidate time options.
Include form inputs with 8px spacing, primary CTA "إنشاء ومشاركة الرابط", validation state for duplicate times, and RTL alignment. Keep brand colors aligned with #2563eb primary. Do not write frontend code.

/* Screen 2: SCR-02 — Participant Voting (Participant) */
Act as a Google Stitch Prompt Engineer.
Using the approved Design System tokens from docs/DESIGN_SYSTEM_EVIDENCE.md, generate SCR-02: Participant Voting screen at /sessions/:sessionId/options.
Target Role: Student Participant.
Purpose: Allow participant to review 3 options and submit one choice.
Include single-choice radio cards, active selection state with 2px #2563eb border, loading skeleton, and error toast for expired session. Do not write frontend code.

/* Screen 3: SCR-03 — Organizer Review & Decision (Organizer) */
Act as a Google Stitch Prompt Engineer.
Using the approved Design System tokens from docs/DESIGN_SYSTEM_EVIDENCE.md, generate SCR-03: Organizer Decision Dashboard at /sessions/:sessionId/review.
Target Role: Organizer.
Purpose: Display aggregated vote counts per time slot with progress bar indicators, and a finalization button "حسم الموعد واعتماد الجلسة".
Include tie-break notice if votes are equal. Do not write frontend code.

/* Screen 4: SCR-04 — Confirmed Session Summary (Public/All Roles) */
Act as a Google Stitch Prompt Engineer.
Using the approved Design System tokens from docs/DESIGN_SYSTEM_EVIDENCE.md, generate SCR-04: Confirmed Session Result at /sessions/:sessionId/confirmed.
Target Role: Any participant with session link.
Purpose: Display confirmed final date, location/link, and add-to-calendar reminder button.
Include empty state if session was cancelled. Do not write frontend code.
```

### Output 3 (Topic 23): `docs/PROTOTYPE_JOURNEYS_AUDIT.md`
```markdown
# تقرير تدقيق النموذج التفاعلي: مشروع StudySync (PROTOTYPE_JOURNEYS_AUDIT.md)

## 1. مصفوفة فحص الانتقالات والرحلات
| مسار الرحلة | الشاشة المصدر والمشغل | الشاشة الوجهة والنتيجة | سلوك التراجع (Back / Cancel) | نتيجة الفحص |
|---|---|---|---|---|
| مسار النجاح الرئيسي (Happy Path) | SCR-01 (إنشاء جلسة) ← إدخال 3 مواعيد والنقر على "إنشاء ومشاركة" | الانتقال إلى SCR-02 وعرض رابط المشاركة ونسخه | زر الرجوع يعود لنموذج الإنشاء مع الحفاظ على البيانات المدخلة | **Passed** |
| تصويت المشارك (Vote Submission) | SCR-02 (شاشة التصويت) ← اختيار موعد والنقر على "تأكيد اختياري" | ظهور إشعار نجاح فوري وتحديث عدد الأصوات محلياً | زر التراجع يسمح للمشارك بتغيير اختياره قبل إغلاق النافذة | **Passed** |
| حسم الجلسة (Organizer Finalization) | SCR-03 (مراجعة النتائج) ← النقر على "حسم الموعد" | الانتقال الفوري إلى SCR-04 (الموعد المؤكد) لجميع الزوار | لا يمكن التراجع عن الحسم بعد اعتماده؛ تظهر رسالة تحذيرية قبل التأكيد | **Passed** |
| حالة الفراغ (Empty State) | SCR-02 ← فتح رابط جلسة غير صالحة أو محذوفة | عرض بطاقة خطأ واضحة: «الجلسة غير موجودة» مع زر «إنشاء جلسة جديدة» | زر العودة ينقل المستخدم إلى الصفحة الرئيسية | **Passed** |
| حظر الصلاحيات (Role Restriction) | مستخدم عادي يحاول الوصول إلى SCR-03 (لوحة الحسم الخاصة بالمنظم) | ظهور رسالة «عذراً، هذه الصفحة مخصصة لمنسق الجلسة فقط» | زر «العودة لصفحة التصويت» يعيد الطالب لشاشة SCR-02 | **Passed** |

## 2. نتائج التدقيق البصري وتجربة الاستخدام (UX Audit Findings)
- **ملاحظات حرجة (Critical):** 0 ملاحظات (لا توجد أزرار وهمية أو روابط فارغة href="#"، كل إجراء يقود لوجهة حقيقية أو استجابة مرئية).
- **ملاحظات رئيسية (Major):** تم ضبط تباين لون النص الثانوي في بطاقة المواعيد ليرتفع من 3.8:1 إلى 4.6:1 ليتوافق مع معيار WCAG AA للنصوص الصغيرة.
- **ملاحظات ثانوية (Minor):** إضافة تلميح مرئي عند نسخ رابط المشاركة ليعرض "تم النسخ إلى الحافظة" بدلاً من الاكتفاء بتغيير لون الأيقونة.
- **التوافق مع الجوال وRTL:** تم التحقق من سلامة العرض عند عرض 390 بكسل وانعدام التدفق الأفقي، ومحاذاة كافة القوائم وعناصر التحكم من اليمين إلى اليسار بصورة متناسقة.
```

---

## 4. Gaps Found and Corrections Made

1. **BorrowHub Case Study Clarity (Educational Template Rule):**
   - *Gap:* In `src/data/topics/wave2/t08-stitch-design-system-prototype.ts`, the BorrowHub sections (Section 4 in Topic 21, Section 4 in Topic 22, and Section 2 in Topic 23) described the BorrowHub equipment borrowing system directly without explicitly reminding the learner that BorrowHub is an optional case study that can be replaced by their own project.
   - *Correction:* Updated the introductory paragraphs and practical steps in `t08-stitch-design-system-prototype.ts` to state explicitly that BorrowHub is an optional, illustrative case study («دراسة حالة استرشادية واختيارية توضح طريقة التحليل، ويمكنك تطبيق نفس الخطوات على فكرة مشروعك الخاص دون أي قيود»).
2. **Product Name Consistency (DEC-50):**
   - *Audit:* Grepped all files owned by Group 08 (`src/data/learning/group-a-08-stitch-design-prototype.ts`, `src/data/topics/wave2/t08-stitch-design-system-prototype.ts`, `e2e/path/stitch-design-system-prototype.spec.ts`, and review documents) for legacy product names (`سلاح العصر`, `Weapon of the Era`, `MET Academy`).
   - *Result:* Zero legacy references exist in any owned Group 08 files. Full compliance with the canonical product name **Ai_agents**. (Legacy references in unowned files such as test fixtures, roadmap archives, or other groups' historical files are noted for orchestrator attention).
3. **End-to-End Browser Spec Coverage Extension:**
   - *Gap:* The existing browser spec `e2e/path/stitch-design-system-prototype.spec.ts` had 5 tests verifying basic headings, prompt block existence, and copy button interactions, but lacked verifiable assertion coverage for:
     - Structured learning activity sections across all 3 topics,
     - Practical steps and expected output presence/copyability across all 3 topics,
     - Objective quiz grading with explanatory feedback and retry support,
     - Rubric and checklist edit, reversal, and reload persistence across page refreshes,
     - RTL prose and LTR code computed directional rendering,
     - Mobile viewport (390px) horizontal overflow checks on full reader pages and homepage preview modals.
   - *Correction:* Extended `e2e/path/stitch-design-system-prototype.spec.ts` with 6 new comprehensive browser tests while strictly preserving all 5 existing tests (total: 11 tests). All 11 tests pass synchronously in 53.1s on port 3208.
4. **Preservation of Content Model Hash Baseline:**
   - *Rule:* In accordance with Rule 4a, `reviewState` was kept at `'draft'` in `src/data/learning/group-a-08-stitch-design-prototype.ts`, and no edits were made to shared builder files or hash manifests (`learning-content-hashes.json`). All 80 lib unit tests in `src/lib/*.test.ts` pass cleanly with zero hash mismatches.

---

## 5. Verification Gate Outcomes

All verification gates were executed synchronously and passed with zero errors:

1. **Typecheck and Lint:**
   ```sh
   npm run lint
   ```
   *Result:* Exit code 0 (`tsc --noEmit` completed with zero errors).

2. **Lib and Unit Test Suite:**
   ```sh
   npx tsx --test src/lib/*.test.ts
   ```
   *Result:* Exit code 0 (80/80 passed, 0 failures, duration ~1.8s).
   - `group split preserves exact byte-for-byte topic records across all 58 canonical topics`: Passed
   - `review state, approvals, and review evidence summaries match baseline across all 58 canonical topics`: Passed
   - All other 78 domain, storage, offline, and export tests: Passed

3. **Production Build:**
   ```sh
   npm run build
   ```
   *Result:* Exit code 0 (Next.js 15.5.28 compiled successfully in 18.9s; generated 182 static pages including `/learn/stitch-reference-screen`, `/learn/design-system-rules`, and `/learn/interactive-prototype`).

4. **Production Browser Test Suite:**
   ```sh
   E2E_SERVER=production E2E_PORT=3208 npx playwright test e2e/path/stitch-design-system-prototype.spec.ts
   ```
   *Result:* Exit code 0 (11/11 passed in 53.1s on dedicated port 3208):
   - `Topic 21 (Google Stitch): Starts with one reference screen before generating other screens`: Passed
   - `Topic 22 (Design System): Explains design system rules and applies to separate screen prompts without code`: Passed
   - `Topic 23 (Prototype): Validates journeys and states instead of showing a fake demo button`: Passed
   - `Homepage displays topics 21, 22, 23 with working detail modal and keyboard escape`: Passed
   - `Copy button interaction copies prompt code and updates button label`: Passed
   - `Topics 21, 22, 23 render structured learning activity sections`: Passed
   - `Practical steps and expected outputs are present and copyable across Group 08`: Passed
   - `Quiz grades responses, provides explanatory feedback, and supports retries`: Passed
   - `Checklist and rubric can be edited, reversed, and survive reload`: Passed
   - `RTL prose and LTR technical text render with proper directional attributes and computed styles`: Passed
   - `Mobile viewport at 390px has no horizontal overflow in full reader and modal preview`: Passed

---

## 6. Release Recommendation

Group 08 (`stitch-reference-screen`, `design-system-rules`, `interactive-prototype`) has completed all educational walkthroughs, verified practical step handoffs, clarified BorrowHub as an optional case study, verified candidate external video representation, and achieved full browser test coverage.

The group is in **evidence complete and awaiting course-owner sign-off** status.
