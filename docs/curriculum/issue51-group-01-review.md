# Issue #51 — Group 01: Idea and MVP

**Status:** Evidence complete and awaiting course-owner sign-off.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:** `project-idea-mvp` (Topic 01 only). Canonical identity preserved. No access gates or prerequisite locks are introduced, and the published Topic remains accessible at `/learn/project-idea-mvp` and in `scripts/topics/topic01.ts`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status |
|---|---|---|---|
| 1 | Group boundary & 58-Topic preservation | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 01 is Topic 01 (`project-idea-mvp`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: template in `docs/curriculum/` confirmed. | Confirmed: all required template elements audited and present. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | Applied globally via shared builder and verified in browser e2e. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric scale matches policy; builder default is proposed until centralized sign-off. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | Candidate retained with discovery evidence; never marked approved. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | Evidence complete; awaiting course-owner sign-off. |

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

## 3. Real Sample Output (Learner Project Walkthrough)

The following real sample output was produced by walking through Topic 01's Practical Steps for an independent learner project (**StudySync: Study Group Session Coordinator**). It contains no bracketed placeholders, separates confirmed decisions from assumptions and open questions, and prepares the input for Topic 02 Grill Me.

```markdown
# سياق المشروع: StudySync — منسق جلسات المذاكرة الجماعية

## الحالة والمصدر
مسودة أولية لتوثيق فكرة المشروع ونطاق النسخة الأولى، تمهيداً لمقابلة Grill Me في الموضوع الثاني.
المصدر: تجربة تنظيم جلسات مذاكرة لطلاب الدفعة وملاحظة تشتت المواعيد في مجموعات المحادثة.

## المشكلة والمستخدمون والقيمة
- **الموقف والمشكلة:** يواجه منسق مجموعة المذاكرة صعوبة في حصر المواعيد المناسبة للطلاب وإعلان الموعد النهائي، حيث تضيع المقترحات وسط مئات الرسائل في مجموعات الدردشة، مما يؤدي إلى إلغاء الجلسات أو تغيب المشاركين.
- **المستخدم الأساسي (منسق المجموعة):** ينشئ طلب جلسة مذاكرة، يحدد موضوعها و3 خيارات زمنية، يراجع تصويت الطلاب، ويعتمد موعداً واحداً نهائياً.
- **المستخدم المساند (عضو المجموعة / الطالب):** يستعرض خيارات المواعيد للجلسة المطروحة، يختار الموعد الأنسب له، ويتلقى إشعاراً بتأكيد الموعد النهائي ومكانه أو رابطه.
- **القيمة المستهدفة للاختبار:** قدرة المجموعة على الاتفاق على موعد نهائي مؤكد لجلسة مذاكرة خلال أقل من 12 ساعة من طرحها، دون تكرار النقاش في مجموعة الدردشة.
- **تنبيه:** لم تجر مقابلات رسمية بعد؛ صياغة المشكلة مستندة إلى ملاحظة شخصية وتظل فرضية تتطلب التحقق مع 3 منسقين.

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

## قرارات صاحب المشروع ومصادرها
- **قرار المنسق:** مدة التصويت محددة بـ 24 ساعة من وقت الإنشاء لتفادي بقاء الجلسة معلقة دون قرار.
- **قرار المنسق:** لا يلزم تسجيل كلمة مرور للطالب المصوت؛ الاسم والبريد الإلكتروني يكفيان لمنع التعطيل في هذه المرحلة.

## افتراضات تحتاج تحققاً
- **افتراض 1:** سيقوم الطلاب بفتح رابط خارجي للتصويت بدلاً من التفاعل داخل استطلاع رأي سريع في تطبيق الدردشة. (طريقة التحقق: تجربة الرابط مع مجموعتين حقيقيتين ومقارنة نسبة الاستجابة).
- **افتراض 2:** وجود 3 خيارات زمنية كافٍ للوصول إلى موعد مشترك بين 70% على الأقل من المشاركين.

## أسئلة مفتوحة لمقابلة Grill Me (Topic 02)
1. ماذا يحدث إذا تساوت الأصوات بين خيارين؟ هل يحسم المنسق الخيار يدوياً أم يفتح تصويتاً فاصلاً؟
2. كيف نمنع تصويت الطالب الواحد أكثر من مرة بالاسم نفسه دون إلزامه بإنشاء حساب كامل؟
3. هل يحتاج المنسق إلى تحديد حد أقصى لعدد الحاضرين في الجلسة الواحدة إذا كانت القاعة محدودة السعة؟

## معيار النجاح الأولي
- تجربة سيناريو واقعي كامل: يقوم مراجع بإنشاء جلسة، ويصوت ثلاثة مستخدمين تجريبيين، ثم يحسم المنسق الجلسة، ويظهر الموعد النهائي المؤكد لكافة الأطراف بوضوح.
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
3. **Shared Baseline Manifests Isolation:**
   - *Gap:* The shared unit test `src/data/learning/group-split.test.ts` (invoked via `src/lib/groupSplit.test.ts`) verifies that all 58 canonical Topics match the committed SHA-256 baseline in `src/data/learning/learning-content-hashes.json` and review summaries in `learning-content-review-summary.json`. Modifying `reviewState` to `'approved'` in `src/data/learning/group-a.ts` causes hash and summary mismatches against these baseline manifests. Furthermore, under `action_safety`, shared files cannot be modified by individual group workers, and course-owner release sign-off remains pending.
   - *Correction:* Maintained truthful content state (`reviewState: 'draft'` in `group-a.ts` with root question/rubric review evidence recorded), while completing all lesson walkthroughs, sample outputs, corrections, and browser evidence in this documentation packet awaiting course-owner batch release.

---

## 5. Verification Gate Outcomes

All verification gates were run synchronously and passed:

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

Group 01 (`project-idea-mvp`) has completed all educational review walkthroughs, verified the coherent practical step handoff to Topic 02, corrected product branding to Ai_agents, verified candidate external video representation, and achieved full browser test coverage. The group is in **evidence complete and awaiting course-owner sign-off** status.
