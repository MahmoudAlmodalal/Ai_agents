# Issue #51 — Group 01: Idea and MVP

**Status:** Static topic evidence recorded; Group 01 remains draft and is not announced as improved.
(The course owner accepted the common template, group boundaries, and assessment policies in DEC-70. That decision does not record a complete Group 01 release sign-off. Its candidate video still requires individual human review.)

**Group membership:** `project-idea-mvp` (Topic 01 only). Canonical identity preserved. No access gates or prerequisite locks are introduced, and the published Topic remains accessible at `/learn/project-idea-mvp` and in `scripts/topics/topic01.ts`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status |
|---|---|---|---|
| 1 | Group boundary & 58-Topic preservation | **Accepted** by MahmoudAlmodalal in DEC-70: 19 groups, all 58 canonical Topics preserved. | Group 01 is Topic 01 (`project-idea-mvp`); this packet does not record the separate complete-group release sign-off. |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: template in `docs/curriculum/` confirmed. | Confirmed: all required template elements audited and present. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | Applied globally via shared builder and verified in browser e2e. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal in DEC-70: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | The shared builder records the accepted scale policy; this does not approve the lesson or group. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal in DEC-70: candidate representation accepted, but individual video approval deferred pending human review of playback, captions, accessibility, and lesson fit. | Candidate retained with discovery evidence; it is not approved. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal in DEC-70: only complete, independently verified groups included in the owner sign-off list may be announced as improved. | This packet does not record the required group sign-off; status remains draft. |

---

## 2. Topic 01 Walkthrough and Verification Ledger

Topic: **`project-idea-mvp`** (`topic-01`)
Reviewer: Curriculum Reviewer (agent/issue-51) & independent question/rubric review by `root`
Review Date: 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `idea-mvp-objective-problem` (صياغة المشكلة والمستخدم والقيمة مع فصل الافتراضات) and `idea-mvp-objective-scope` (تحديد رحلة MVP كاملة وتأجيل ما لا يلزم). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Stated clearly in section «قبل أن تبدأ»: basic programming knowledge and a problem to understand are sufficient. No coding agent, Skill, or MCP setup required. Not locked behind any prerequisite. | **Passed** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Section 1 explains: problem vs. feature list, MVP as smallest complete useful journey, necessity of writing boundaries, separation of facts from assumptions and open questions, and handoff to Grill Me. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Section 2 provides BorrowHub example explicitly labeled optional («BorrowHub مثال اختياري»). 5 distinct steps (أ–هـ) showing problem formulation, user roles, MVP journey boundaries, confirmed facts vs open questions, and a complete completed sample artifact without unfilled bracket placeholders. | **Passed** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Section 3 provides 6 numbered practical steps guiding the learner through problem formulation, roles, MVP journey, deferring at least two features with reasons, classifying information, and saving to `docs/PROJECT_CONTEXT.md`. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Copyable own-project template `docs/PROJECT_CONTEXT.md` and copyable review prompt that asks for evidence citations, forbids invented rules, and enforces one question at a time. Verified clipboard copying in browser suite. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `project-context` (`docs/PROJECT_CONTEXT.md`) and `next-topic-input` (open questions fed into Topic 02 Grill Me). Supplies documented handoff without access locks. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `idea-mvp-q-evidence` and `idea-mvp-q-journey`: 4 options each, keyed correctly, educational explanation provided. Independent review by `root` passed. Browser grading, retry, and explanation feedback verified in Playwright. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (5 items) and rubric criteria `idea-mvp-r-problem` and `idea-mvp-r-scope` referencing `project-context`. 3-level scale (`not-yet`, `in-progress`, `ready-for-review`), no mastery threshold. Independent review by `root` passed. Edit, reversal, and reload persistence verified in Playwright. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Y Combinator / Michael Seibel: "How to Build An MVP | Startup School" (`yc-mvp-2023`, URL: `https://www.youtube.com/watch?v=QRZ_l7cVzzU`). Discovery evidence documented in `externalVideoRegistry.ts`. Retained as candidate; approval honestly deferred. | **Passed** (as candidate) |
| **Diagrams** | Diagram where relevant | No architecture or behavioral diagram required for this written context artifact. (Diagram lab begins in later modeling topics). | **Passed** (N/A) |

---

## 3. Fictional Sample Output (Not a Learner or Owner Record)

The following constructed example shows how a learner could apply Topic 01 to a fictional study-group scheduling exercise (**StudySync**). No learner project, interview, user observation, prototype, test, or product-owner decision was performed. Every rule and measurement below is an exercise choice or hypothesis, not a confirmed product fact. The sample illustrates the Topic 02 handoff only.

```markdown
# سياق المشروع: StudySync — منسق جلسات المذاكرة الجماعية

## الحالة والمصدر
مثال خيالي لمسودة سياق مشروع، تمهيداً لمقابلة Grill Me في الموضوع الثاني.
المصدر: سيناريو تعليمي أنشأه كاتب العينة؛ لا يمثل تجربة مستخدم أو ملاحظة ميدانية.

## المشكلة والمستخدمون والقيمة
- **فرضية المشكلة:** قد يصعب على منسق مجموعة مذاكرة جمع المواعيد وإعلان اختيار نهائي. لم تُجمع رسائل أو ملاحظات أو مقابلات تثبت وجود هذه المشكلة أو أثرها.
- **المستخدم الأساسي (منسق المجموعة):** ينشئ طلب جلسة مذاكرة، يحدد موضوعها و3 خيارات زمنية، يراجع تصويت الطلاب، ويعتمد موعداً واحداً نهائياً.
- **المستخدم المساند (عضو المجموعة / الطالب):** يستعرض خيارات المواعيد للجلسة المطروحة، يختار الموعد الأنسب له، ويتلقى إشعاراً بتأكيد الموعد النهائي ومكانه أو رابطه.
- **فرضية قياس قابلة للمراجعة:** اختبار ما إذا كانت مجموعة تستطيع اختيار موعد خلال 12 ساعة. لم يعتمد صاحب مشروع هدفاً أو عتبة نجاح، ولم تُجر تجربة.
- **تنبيه:** يلزم التحقق من المشكلة والسياق مع مستخدمين حقيقيين قبل التعامل مع هذه الفرضية كدليل.

## نطاق رحلة MVP (النسخة الأولى)
1. يسجل المنسق عنوان موضوع المذاكرة ويطرح 3 فترات زمنية مقترحة.
2. يحصل المنسق على رابط مشاركة مباشر يرسله إلى مجموعة الطلاب.
3. يفتح الطالب الرابط دون اشتراط إنشاء حساب معقد، ويكتفي بكتابة اسمه واختيار موعد واحد أو أكثر من المواعيد المتاحة.
4. يرى المنسق جدولاً ملخصاً لعدد الأصوات لكل فترة زمنية.
5. يضغط المنسق زر «حسم الموعد» لاختيار الفترة الأكثر ملاءمة، وتتحول حالة الجلسة إلى «معتمدة» مع إظهار الموعد النهائي لكل من يفتح الرابط.

## الميزات المؤجلة وسبب التأجيل
1. **الربط مع تقويم Google / Outlook (Calendar Sync):** مؤجل؛ لأن التحقق من رغبة الطلاب في التصويت واكتمال الرحلة يمكن اختباره برابط الجلسة والتوقيت المكتوب دون الحاجة لدمج واجهات برمجة تطبيقات خارجية معقدة في النسخة الأولى.
2. **التذكير الآلي عبر الرسائل القصيرة أو البريد الإلكتروني:** مؤجل؛ يمكن للمنسق نسخ رسالة التأكيد ومشاركتها في قناة التواصل الحالية للمجموعة دون التأثير على قيمة تنسيق الموعد.
3. **نظام الدردشة داخل التطبيق:** مؤجل؛ الغرض هو حسم الموعد وليس توفير منصة محادثة بديلة لما يستخدمه الطلاب بالفعل.

## اختيارات العينة (ليست قرارات صاحب مشروع)
- **اختيار تمرين:** يعرض المثال مدة تصويت افتراضية قدرها 24 ساعة؛ لا يعتمدها منتج أو مستخدم.
- **اختيار تمرين:** يستخدم المثال اسماً مستعاراً للمشارك؛ لم تُحدد هوية أو صلاحيات حقيقية، ولا يُدّعى أن الاسم أو البريد يمنعان التصويت المكرر.

## افتراضات تحتاج تحققاً
- **افتراض 1:** سيقوم الطلاب بفتح رابط خارجي للتصويت بدلاً من التفاعل داخل استطلاع رأي سريع في تطبيق الدردشة. (طريقة التحقق: تجربة الرابط مع مجموعتين حقيقيتين ومقارنة نسبة الاستجابة).
- **افتراض 2:** وجود 3 خيارات زمنية كافٍ للوصول إلى موعد مشترك بين 70% على الأقل من المشاركين.

## أسئلة مفتوحة لمقابلة Grill Me (Topic 02)
1. ماذا يحدث إذا تساوت الأصوات بين خيارين؟ هل يحسم المنسق الخيار يدوياً أم يفتح تصويتاً فاصلاً؟
2. كيف نمنع تصويت الطالب الواحد أكثر من مرة بالاسم نفسه دون إلزامه بإنشاء حساب كامل؟
3. هل يحتاج المنسق إلى تحديد حد أقصى لعدد الحاضرين في الجلسة الواحدة إذا كانت القاعة محدودة السعة؟

## سيناريو تحقق مقترح (لم يُنفذ)
- يمكن لاحقاً إعداد تجربة يختبر فيها مشاركون إنشاء جلسة والتصويت وعرض النتيجة. لا توجد جلسة أو مشاركون أو نتيجة فعلية في هذا المثال.
- التالي: استخدام هذه الوثيقة كمدخل لجلسة المقابلة الاستكشافية في Topic 02 (`discovery-grill-me`).
```

---

## 4. Gaps Found and Corrections Made

1. **Product Name Consistency (DEC-50):**
   - *Gap:* `scripts/topics/topic01.ts` line 40 referenced the raw course source filename `Weapon_of_the_Era_Website_Content_AR.md` without referencing the canonical product name `Ai_agents`.
   - *Correction:* Updated the reference in `scripts/topics/topic01.ts` to refer naturally to `مادة مسار Ai_agents المرجعية (Weapon_of_the_Era_Website_Content_AR.md)`.
2. **Browser Suite Coverage Extension:**
   - *Gap:* The existing browser spec `e2e/project-idea-lesson.spec.ts` only verified lesson rendering parity and code snippet copying (3 tests). It lacked end-to-end verification of structured activity sections, practical steps and expected output presence/copying, objective quiz grading and explanatory feedback, rubric and checklist persistence and reversal across page reload, RTL prose and LTR technical text direction, and mobile viewport (390px) horizontal overflow.
   - *Correction:* Extended `e2e/project-idea-lesson.spec.ts` with 6 comprehensive browser tests covering all required journeys while strictly retaining existing assertions. All 9 tests passed synchronously in 24.5s against the production build on port 3201.
3. **Shared Baseline Manifest Reconciliation:**
   - *Finding:* The shared hash test compares all 58 learning records against `learning-content-hashes.json`. The Topic 01 evidence-text correction changes its content hash; the review-summary projection is unchanged. The root integration owner will reconcile shared manifests centrally.
   - *Status:* `reviewState` remains `draft`. Narrow question/rubric reviews and this static packet do not complete lesson or group approval. DEC-70 accepted the shared policies; complete exact-candidate evidence, individual video review, independent verification, and explicit owner sign-off remain outstanding.

---

## 5. Previously Reported Verification (Not Re-run in This Review)

The commands and outcomes below are retained from the earlier author report. They were not re-run during this static educational review and do not establish learner or product execution.

The prior report recorded these gates as passed:

1. **Typecheck and Lint:**
   ```sh
   npm run lint
   ```
   *Result:* Exit code 0 (`tsc --noEmit` completed with zero errors).

2. **Lib and Unit Test Suite:**
   ```sh
   npx tsx --test src/lib/*.test.ts
   ```
   *Result:* Exit code 0 (80/80 tests passed, 0 failures, duration ~475ms).

3. **Production Build:**
   ```sh
   npm run build
   ```
   *Result:* Exit code 0 (Next.js 15.5.28 compiled successfully in 7.0s, generated 182 static pages including `/learn/project-idea-mvp`).

4. **Production Browser Test Suite:**
   ```sh
   E2E_SERVER=production E2E_PORT=3201 npx playwright test e2e/project-idea-lesson.spec.ts
   ```
   *Result:* Exit code 0 (9/9 passed in 24.5s on dedicated port 3201).
   - `first-topic full reader and preview expose the same worked lesson and own-project exercise`: Passed
   - `copies the completed context, own-project template and review prompt in full reader`: Passed
   - `copies the completed context, own-project template and review prompt in preview`: Passed
   - `renders all lesson and activity sections for the project-idea-mvp Topic`: Passed
   - `practical steps and expected outputs are present and copyable`: Passed
   - `quiz grades responses and provides explanatory feedback`: Passed
   - `checklist and rubric can be edited, reversed, and survive reload`: Passed
   - `RTL prose and LTR technical text render correctly`: Passed
   - `mobile viewport at 390px has no horizontal overflow`: Passed

---

## 6. Release Recommendation

Group 01 (`project-idea-mvp`) has a static lesson review and a coherent documented handoff to Topic 02. The StudySync artifact above is fictional, and the candidate video has not received the required human review. Shared policy decisions are accepted, but this packet is not a complete-group release decision. Group status remains **draft; not announced as improved** until complete evidence, independent verification, individual video disposition, and explicit owner sign-off are recorded.

## 7. Independent Educational Review Update — 2026-10-20

This review checked the authored Topic 01 learning record and the fictional sample for objective alignment, evidence labeling, and the documented handoff. It was static only; the previous browser results above are historical author-reported results and were not repeated here.

| Topic or handoff | Status | Finding and remaining evidence |
|---|---|---|
| Topic 01 `project-idea-mvp` | **Pass — static** | Objectives align with problem/evidence classification and a complete MVP journey. The exercise distinguishes hypothesis from research evidence and proposes a concrete `PROJECT_CONTEXT.md` output. The StudySync example is fictional; no interview, prototype, or test occurred. |
| Topic 01 → Topic 02 | **Pass — documented artifact shape** | Open questions and context are named as inputs to Grill Me. This is a suggested handoff, not an enforced prerequisite or proof of interview completion. |
| Candidate video | **Not reviewed** | The URL and discovery record remain candidate metadata. Playback, captions, accessibility, and lesson fit require human review under DEC-70. |
