# Issue #57 — Group 07: UI/UX Planning (Roles, Navigation, Blueprint & Screen Inventory)

**Status:** Evidence complete and awaiting course-owner sign-off.
(This group is neither released nor marked improved until course-owner sign-off is completed. No curriculum author or agent review constitutes course-owner acceptance.)

**Group membership:** `ui-ux-roles-navigation`, `ux-blueprint`, `screen-inventory` (Topics 18, 19, 20). Canonical identities preserved. No access gates or prerequisite locks are introduced, and all published Topics remain accessible at `/learn/ui-ux-roles-navigation`, `/learn/ux-blueprint`, and `/learn/screen-inventory`.

---

## 1. Course Owner Decision Status (DEC-50 & Package 70 v2)

| Item | Subject | Owner Disposition (2026-10-20) | Implementation Status |
|---|---|---|---|
| 1 | Group boundary & 58-Topic preservation | **Accepted** by MahmoudAlmodalal: 19 groups, all 58 canonical Topics preserved. | Confirmed: Group 07 contains exactly Topics 18, 19, 20 (`ui-ux-roles-navigation`, `ux-blueprint`, `screen-inventory`). |
| 2 | Lesson template | **Accepted** by MahmoudAlmodalal: template in `docs/curriculum/` confirmed. | Confirmed: all required template elements audited and present across all 3 Topics. |
| 3 | Quiz scoring policy | **Accepted** by MahmoudAlmodalal: 1 point correct, 0 incorrect/unanswered, unlimited retries, feedback after submit, all attempts retained with versions. | Applied globally via shared builder and verified in browser e2e. |
| 4 | Practical self-assessment policy | **Accepted** by MahmoudAlmodalal: self-reported levels `not-yet`, `in-progress`, `ready-for-review`, no mastery threshold, no independent correctness claim. | Rubric scale matches policy; builder default is proposed until centralized sign-off. |
| 5 | External video candidates | **Deferred** by MahmoudAlmodalal: candidate representation accepted, but individual video approval deferred pending human check of playback/captions/accessibility. | All 3 video candidates retained with discovery evidence; never marked approved. |
| 6 | Group release / improved status | **Accepted** by MahmoudAlmodalal: group may be announced as improved only after complete evidence is recorded, independently verified, and included in owner sign-off. | Evidence complete; awaiting course-owner sign-off. |

---

## 2. Walkthrough and Verification Ledgers

### Topic 18: `ui-ux-roles-navigation`
- **Topic Slug:** `ui-ux-roles-navigation`
- **Sequence Position:** 18
- **Reviewer:** Curriculum Reviewer (agent/issue-57) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `uiux-objective-roles` (تحويل أدوار PRD وصلاحياتهم إلى احتياجات وواجهات وتنقل واضح) and `uiux-objective-scope` (صياغة متطلبات تجربة المستخدم دون إضافة أدوار أو ميزات خارج النطاق). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | PRD confirmed roles, tasks, permissions, and requirements; mark role assumptions for review. Informational prerequisite note clarifies that prerequisites are non-blocking guidance. | **Passed** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains architectural distinction between UI, UX, and IA; role-based UI matrix before drawing screens; navigation hierarchy and Arabic RTL requirements; handoff to UX Blueprint. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Worked example clearly labeled optional: `BorrowHub اختياري: طالب ومسؤول معمل`. Distinguishes student loan tracking from staff review/handover without leaking staff actions to student views. | **Passed** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Step 1: transform approved roles and tasks into a visibility/action matrix (`docs/UI_UX_REQUIREMENTS.md`). Step 2: structure destinations into a navigation model without adding out-of-scope screens. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Guided exercise with PROMPT 14 (UI/UX Grill Me) for deep discovery with UX Researcher persona. Clipboard copy tested and verified in Playwright. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `uiux-requirements` (`docs/UI_UX_REQUIREMENTS.md`) and `role-ui-matrix` (Role-based UI matrix). Supplies documented input for Topic 19 without access locks. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `uiux-q-role` (matching actions to PRD permissions) and `uiux-q-navigation` (deferring out-of-scope recommendations). 4 options each, correctly keyed, educational explanations verified. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (5 items) and rubric criteria `uiux-r-permission` (referencing `role-ui-matrix`) and `uiux-r-navigation` (referencing `uiux-requirements`). 3-level scale, reload persistence verified. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Nielsen Norman Group: "Information Architecture: 3 Key Models" (`nng-information-architecture`, URL: `https://www.nngroup.com/videos/information-architecture-models/?lm=apples-flatland-aesthetic-part-1&pt=article`). Retained as candidate; approval deferred. | **Passed** (as candidate) |
| **Diagrams** | Diagram where relevant | Flowchart Mermaid diagram (`flowchart TD`) illustrating BorrowHub navigation hierarchy. Local rendering verified. | **Passed** |

---

### Topic 19: `ux-blueprint`
- **Topic Slug:** `ux-blueprint`
- **Sequence Position:** 19
- **Reviewer:** Curriculum Reviewer (agent/issue-57) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `uxbp-objective-states` (توثيق الرحلات وخريطة الموقع وحالات الواجهة الأربع الأساسية لكل تجربة) and `uxbp-objective-access` (مراعاة الاستجابة وإمكانية الوصول في حالات النجاح والخطأ والفراغ). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Input: `docs/UI_UX_REQUIREMENTS.md` and user journey touchpoints; non-blocking prerequisites guidance. | **Passed** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Explains Sitemap construction, user journeys, 4 UI states (Loading, Empty, Error, Success) separated from 2 cross-cutting quality reviews (Responsive and Accessibility). | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Worked example: `قائمة معدات فارغة` explaining empty state behavior as actionable guidance rather than a system crash or error. BorrowHub note marks it optional. | **Passed** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Step 1: draw Sitemap and MVP journeys linking pages to tasks and roles (`docs/UX_BLUEPRINT.md`). Step 2: populate states matrix with 4 UI states and 2 cross-cutting checks. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Guided exercise with PROMPT 15 (UX Blueprint + Screen Inventory) for Senior UX Architect persona. Clipboard copy tested and verified in Playwright. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `ux-blueprint` (`docs/UX_BLUEPRINT.md`) and `states-matrix` (4 UI states and 2 cross-cutting checks matrix). Supplies documented input for Topic 20. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `uxbp-q-empty` (informative empty states with actionable CTA) and `uxbp-q-a11y` (keyboard navigation, focus visible, and activation). 4 options each, correctly keyed, educational explanations verified. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `uxbp-r-states` (referencing `states-matrix`) and `uxbp-r-journey` (referencing `ux-blueprint`). 3-level scale, reload persistence verified. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Nielsen Norman Group: "Service Blueprinting FAQ" (`nng-service-blueprint`, URL: `https://www.nngroup.com/videos/service-blueprinting-faq/`). Retained as candidate; approval deferred. | **Passed** (as candidate) |
| **Diagrams** | Diagram where relevant | Flowchart Mermaid diagram (`flowchart TD`) showing BorrowHub Sitemap across `/`, `/equipment`, `/dashboard/loans`, and `/staff/requests`. | **Passed** |

---

### Topic 20: `screen-inventory`
- **Topic Slug:** `screen-inventory`
- **Sequence Position:** 20
- **Reviewer:** Curriculum Reviewer (agent/issue-57) & independent question/rubric review by `root`
- **Review Date:** 2026-10-20

| Element | Required Item | Inspected Content & Evidence | Verdict |
|---|---|---|---|
| **Learning Objectives** | Clear objectives with stable semantic IDs | Two stable objectives: `inventory-objective-fields` (جرد شاشات النطاق بربط كل شاشة بهدف ودور وبيانات وأفعال وحالات) and `inventory-objective-coverage` (التحقق من تغطية المتطلبات دون إضافة شاشة لا تسندها الرحلة). | **Passed** |
| **Inputs & Prerequisites** | Clear starting context and minimal prerequisites without access locks | Input: `docs/UI_UX_REQUIREMENTS.md`, `docs/UX_BLUEPRINT.md`, and PRD business rules; non-blocking prerequisites guidance. | **Passed** |
| **Explanation** | Real explanation of concepts, boundaries, and decision handoff | Golden rule: strict prohibition of invented screens outside MVP; Core vs Supporting vs Future categorization; full inventory fields specification; coverage audit against PRD rules. | **Passed** |
| **Worked Example** | Concrete worked example with BorrowHub explicitly optional | Worked example: `شاشة مراجعة المسؤول` mapping goal, role, required data, accept/reject actions, and requirement traceability without unprompted metrics dashboards. BorrowHub note marks it optional. | **Passed** |
| **Practical Steps** | Actionable steps for the learner's own project with concrete outputs | Step 1: list MVP screens with goal, role, data, actions, and validation (`docs/SCREEN_INVENTORY.md`). Step 2: map requirements to screens in a bidirectional traceability matrix. | **Passed** |
| **Exercise & Prompt** | Guided exercise and copyable review prompt | Markdown template for `docs/SCREEN_INVENTORY.md` and PROMPT 15. Clipboard copying of the template tested and verified in Playwright. | **Passed** |
| **Expected Outputs** | Declared outputs linking to next topic without locks | Declared outputs: `screen-inventory` (`docs/SCREEN_INVENTORY.md`) and `screen-traceability` (Requirements-to-screens traceability matrix). Supplies documented input for UI prototyping and Stitch prompts. | **Passed** |
| **Objective Quiz** | Stable question IDs, 4 options, key, explanation, policy compliance | Questions `inventory-q-coverage` (handling requirements without screens) and `inventory-q-fields` (identifying high-value inventory fields). 4 options each, correctly keyed, educational explanations verified. | **Passed** |
| **Checklist & Rubric** | Measurable criteria referencing concrete outputs, stable IDs | Sidebar checklist (6 items) and rubric criteria `inventory-r-detail` (referencing `screen-inventory`) and `inventory-r-trace` (referencing `screen-traceability`). 3-level scale, reload persistence verified. | **Passed** |
| **External Video** | Real candidate URL with discovery evidence; candidate only | Nielsen Norman Group: "Wireflows 101" (`nng-wireflows-101`, URL: `https://www.nngroup.com/videos/wireflows-101/?lm=tips-for-new-prototypers&pt=youtubevideo`). Retained as candidate; approval deferred. | **Passed** (as candidate) |
| **Diagrams** | Diagram where relevant | Structured Markdown traceability tables mapping PRD Rules 3, 6, and 8 to specific screens (`SCR-03`, `SCR-04`, `SCR-05`, `SCR-06`). | **Passed** |

---

## 3. Real Sample Output (Learner Project Walkthrough)

The following real sample outputs were produced by walking through Group 07's Practical Steps for an independent learner project (**StudySync: Study Group Session Coordinator**). They contain no bracketed placeholders, separate confirmed decisions from assumptions and open questions, and provide concrete deliverables for UI/UX requirements, blueprint, states matrix, screen inventory, and traceability.

### 3.1. `docs/UI_UX_REQUIREMENTS.md` (Topic 18)

```markdown
# متطلبات تجربة وواجهة المستخدم: StudySync

## 1. احتياجات الأدوار ومصادر المهام
| الدور (Role) | الهدف العام | المهمة المرشحة | المصدر والحالة |
|---|---|---|---|
| المنسق (Organizer) | طرح 3 مواعيد مقترحة، مراجعة أصوات الطلاب، واعتماد موعد نهائي واحد. | إنشاء جلسة، استعراض الأصوات المسجلة، وحسم الموعد. | FR-001 / FR-003؛ مقتصر على التمرين؛ صلاحيات الحسابات لم تُحسم بعد. |
| المشارك / الطالب (Participant) | تسجيل صوت واحد لأحد المواعيد المطروحة. | فتح رابط الجلسة، اختيار موعد، وإرسال التصويت. | FR-002 / BR-001؛ مقتصر على التمرين؛ آلية التحقق من الهوية تظل افتراضاً A-01. |

## 2. نموذج التنقل المرشح (Candidate Navigation Model)
- `session-setup` (مهمة المنسق، FR-001) → `participant-options` (مهمة المشارك عبر رابط المشاركة، FR-002 / A-01) → `organizer-review` (مهمة المنسق، FR-003) → `selected-result` (عرض النتيجة لجميع الأطراف، FR-004 / Q-05).
- ملاحظة: الأسهم تمثل تسلسل المهام وليست صلاحيات وصول تلقائية. الانتقال الثاني مشروط بالفرضية A-01 (مشاركة الرابط). لا تضاف أي شاشة تسجيل دخول أو إشعارات خارج النطاق.

## 3. مصفوفة الأدوار والرؤية والإجراءات ومصادر الصلاحيات
| الدور / الفاعل | الشاشة أو الإجراء | الرؤية (من يرى؟) | الإجراء (من ينفذ؟) | المصدر وحالة الصلاحية |
|---|---|---|---|---|
| المنسق | فتح `session-setup` وإنشاء جلسة بـ 3 مواعيد | المنسق فقط | المنسق يكتب ويرسل | FR-001؛ لا يشترط كلمة مرور في MVP. |
| المشارك | فتح `participant-options` واختيار موعد | كل من يملك الرابط (A-01) | المشارك يرسل صوته | FR-002, BR-001؛ تصويت واحد لكل اسم مستعار. |
| المنسق | فتح `organizer-review` وحسم الموعد | المنسق | المنسق يعتمد الخيار | FR-003؛ مسألة تعادل الأصوات تظل سؤالاً مفتوحاً Q-02. |
| عام / غير محدد | فتح `selected-result` وقراءة الموعد المعتمد | كل من يملك الرابط | قراءة فقط دون أفعال | FR-004؛ يُعرض الموعد النهائي المؤكد. |
```

### 3.2. `docs/UX_BLUEPRINT.md` (Topic 19)

```markdown
# مخطط تجربة المستخدم (UX Blueprint): StudySync

## 1. خريطة الموقع (Sitemap) للشاشات الأربع
| معرف الشاشة | المسار المرشح | الدور | الوظيفة والمصدر |
|---|---|---|---|
| `session-setup` | `/sessions/new` | المنسق | إنشاء جلسة وطرح 3 فترات زمنية (FR-001). |
| `participant-options` | `/sessions/:sessionId/options` | المشارك | استقبال الرابط والتصويت لموعد واحد (FR-002). |
| `organizer-review` | `/sessions/:sessionId/review` | المنسق | مراجعة الأصوات واعتماد الموعد النهائي (FR-003). |
| `selected-result` | `/sessions/:sessionId/result` | الجميع | استعراض الموعد النهائي المعتمد (FR-004). |

## 2. مسار الرحلة المتكامل (End-to-End Journey)
1. **مرحلة الإعداد (Setup):** يفتح المنسق `/sessions/new`، يكتب عنوان الموضوع، يحدد 3 خيارات زمنية، ويضغط «إنشاء الجلسة».
2. **مرحلة التصويت (Respond):** يتلقى الطالب الرابط `/sessions/:sessionId/options`، يرى الخيارات الثلاثة، يختار الفترة الأنسب ويسجل اسمه المستعار، ثم يضغط «تأكيد التصويت».
3. **مرحلة الحسم (Decide):** يفتح المنسق `/sessions/:sessionId/review`، يشاهد شريط عدد الأصوات لكل فترة، ثم يضغط «حسم الموعد» للخيار الفائز.
4. **مرحلة النتيجة (Result):** تتبدل حالة الجلسة إلى «معتمدة»، ويعرض المسار `/sessions/:sessionId/result` الموعد المعتمد النهائي ومكانه.
```

### 3.3. `docs/UX_STATES_MATRIX.md` (Topic 19)

```markdown
# مصفوفة حالات الواجهة والفحوص العابرة: StudySync

## 1. حالات الواجهة الأربع لكل شاشة
| الشاشة | حالة التحميل (Loading) | حالة الفراغ (Empty) | حالة الخطأ والتعافي (Error) | حالة النجاح (Success) |
|---|---|---|---|---|
| `session-setup` | زر الحفظ معطل مع Spinner صغير أثناء الإنشاء. | الحقول فارغة مع نصوص توجيهية (Placeholders) لأمثلة المواعيد. | تنبيه مضمن عند نقص أحد الخيارات الثلاثة أو تكرارها. | إشعار نجاح فوري وتوليد رابط المشاركة للانتقال للخطوة التالية. |
| `participant-options` | هيكل عظمي (Skeleton) لبطاقات الخيارات الثلاثة أثناء الجلب. | رسالة "لم يتم العثور على خيارات لهذه الجلسة" مع زر تواصل. | تنبيه عند محاولة الإرسال دون تحديد خيار أو إذا كان الرابط غير صالح. | شاشة تأكيد التصويت مع زر الانتقال لصفحة النتيجة. |
| `organizer-review` | Skeleton لأعمدة الإحصاءات وشريط التقدم. | رسالة توجيهية: "لم يسجل أي طالب صوته بعد. شارك الرابط لتلقي الأصوات". | تنبيه عند تعذر الاتصال بقاعدة البيانات مع زر "إعادة المحاولة". | إشعار اعتماد الموعد بنجاح وتحويل حالة الجلسة إلى "مكتملة". |
| `selected-result` | Skeleton لبطاقة تفاصيل الموعد النهائي. | إذا لم تُحسم الجلسة بعد: "التصويت ما زال جارياً، الموعد لم يُعتمد بعد". | رسالة خطأ واضحة في حال عدم وجود جلسة بهذا المعرف. | بطاقة مميزة باللون الأخضر توضح الموعد والتوقيت المعتمدين بوضوح. |

## 2. الفحوص العابرة للحالات (Cross-Cutting Checks)
- **الاستجابة (Responsive):** تم اختبار العرض على 390px (شاشة الهاتف) و1440px (شاشة الحاسوب)؛ تلتف الخيارات الثلاثة عمودياً على الشاشات الصغيرة مع بقاء أزرار الإجراء بارزة دون تمرير أفقي.
- **إمكانية الوصول (Accessibility):** ترتيب علامات التبويب (Tab Order) منطقي من العنوان إلى الخيارات ثم زر التأكيد؛ مؤشر التركيز مرئي بوضوح؛ نسبة تباين النصوص تفوق 4.5:1 للنصوص العادية؛ اتجاه الواجهة RTL مع بقاء الرموز والأوقات التقنية LTR.
```

### 3.4. `docs/SCREEN_INVENTORY.md` (Topic 20)

```markdown
# وثيقة جرد الشاشات المعتمد (Screen Inventory): StudySync

## 1. ملخص نطاق الشاشات وقواعد الحصر
- حصر شاشات الـ MVP في 4 شاشات فقط (2 جوهرية Core و2 مساندة Supporting).
- عزل الشاشات المستقبلية (مثل شاشة الربط بالتقويم Calendar Sync وشاشة الدردشة) خارج النطاق.

## 2. جدول جرد الشاشات المعتمد (Screen Inventory Table)
| المعرف | اسم الشاشة | المسار (Route) | الدور المسموح | الأولوية | المكونات الرئيسية | البيانات المطلوبة | الإجراءات والتحقق | تغطية الحالات | مصدر المتطلب |
|:------:|:-----------|:---------------|:--------------|:--------:|:------------------|:------------------|:------------------|:-------------|:-------------|
| SCR-01 | إنشاء جلسة المذاكرة | `/sessions/new` | المنسق | Core | عنوان الجلسة، 3 حقول مواعيد، زر الإنشاء | موضوع الجلسة، 3 خيارات زمنية | التحقق من عدم فراغ الحقول وتمايز الأوقات | Loading, Empty, Validation Error, Success | FR-001 |
| SCR-02 | تصويت الطلاب | `/sessions/:id/options` | المشارك (الطالب) | Core | بطاقات المواعيد، حقل الاسم المستعار، زر التصويت | بيانات الجلسة، الخيارات المطروحة | اختيار موعد واحد فقط، منع التصويت المزدوج (BR-001) | Loading, Empty, Invalid Link Error, Success | FR-002, BR-001 |
| SCR-03 | مراجعة وحسم الموعد | `/sessions/:id/review` | المنسق | Supporting | شريط نسب الأصوات، زر حسم الموعد، ملخص المصوتين | عدد الأصوات لكل موعد، قائمة الأسماء | اختيار الموعد الفائز، التعامل مع التعادل يدوياً | Loading, No Votes Yet (Empty), Error, Success | FR-003 |
| SCR-04 | الموعد النهائي المعتمد | `/sessions/:id/result` | الجميع | Supporting | بطاقة الموعد المؤكد، زر النسخ، تفاصيل اللقاء | الموعد المعتمد، موضوع المذاكرة | نسخ رسالة التأكيد للمجموعة | Loading, Pending State, Error, Confirmed Success | FR-004 |

## 3. مصفوفة تدقيق التغطية الهندسية (Requirements-to-Screens Traceability Matrix)
| متطلب PRD | الشاشة المسؤولة في الجرد | حالة التغطية والتحقق |
|---|---|---|
| FR-001: طرح 3 خيارات زمنية للجلسة | `SCR-01` (`/sessions/new`) | **مغطى بالكامل:** حقول الإدخال والتحقق تمنع إنشاء جلسة بأقل من 3 مواعيد. |
| FR-002: تسجيل تصويت الطالب لموعد واحد | `SCR-02` (`/sessions/:id/options`) | **مغطى بالكامل:** بطاقات الخيارات براديو فردي يضمن اختيار موعد واحد فقط. |
| FR-003: مراجعة المنسق للأصوات وحسم الموعد | `SCR-03` (`/sessions/:id/review`) | **مغطى بالكامل:** استعراض عداد الأصوات وزر الحسم لاعتماد الموعد النهائي. |
| FR-004: عرض الموعد النهائي المؤكد للجميع | `SCR-04` (`/sessions/:id/result`) | **مغطى بالكامل:** بطاقة واضحة يفتحها أي طالب لمعرفة الموعد النهائي ومكانه. |
| BR-001: صوت واحد كحد أقصى لكل اسم مستعار | `SCR-02` (`/sessions/:id/options`) | **مغطى بالكامل:** التحقق على مستوى الواجهة وقاعدة البيانات لمنع التكرار. |
```

---

## 4. Gaps Found and Corrections Made

1. **Product Name Consistency (DEC-50):**
   - *Audit:* Inspected all owned files (`src/data/learning/group-a-07-ui-ux.ts`, `src/data/topics/wave2/t07-ui-ux.ts`) for references to old product names (e.g. سلاح العصر, Weapon of the Era, MET Academy).
   - *Result:* Zero old references found; approved product name `Ai_agents` is preserved.

2. **Educational Review and Content Model State:**
   - *Audit:* Verified that `group-a-07-ui-ux.ts` adheres to accepted template rules: stable semantic IDs, 4 options per quiz question, accurate answer keys, criteria bound to declared outputs, and coherent practical steps.
   - *Safety Rule Compliance:* Left `reviewState: 'draft'` intact without setting approval flags or editing shared builders (`group-a-common.ts`, `group-b-base.ts`), preserving baseline hash stability across the curriculum.

3. **Browser Test Suite Extension (`e2e/path/ui-ux-blueprint-inventory.spec.ts`):**
   - *Gap:* The original spec contained 4 tests covering metadata, role matrix, states overview, screen scope, and sequential navigation. It lacked automated verification for structured activities sections, practical steps and expected output presence/copying across all 3 topics, objective quiz grading and explanatory feedback with retry, checklist and rubric persistence and reversal across page reload, RTL prose and LTR code directionality, and mobile viewport (390px) horizontal overflow.
   - *Correction:* Extended `e2e/path/ui-ux-blueprint-inventory.spec.ts` from 4 to 10 comprehensive tests. Corrected test assertions to use diacritic-tolerant regex for `أهداف التعلّم` and verified exact clipboard copy for template headers. All 10 tests passed synchronously in 42.1s on dedicated port 3207 against the production build.

4. **External Video Candidate Representation:**
   - *Audit:* Verified that external videos for all 3 Topics (`nng-information-architecture`, `nng-service-blueprint`, `nng-wireflows-101`) are registered with URLs and discovery evidence in `src/data/externalVideoRegistry.ts` and rendered with the candidate badge (`مرشح`).
   - *Correction:* Maintained truthful status: video approval is deferred pending human verification of playback, captions, and accessibility; no video is claimed as approved.

---

## 5. Verification Gate Outcomes

All verification commands were run synchronously and finished with code 0:

1. **Typecheck and Lint:**
   ```sh
   npm run lint
   ```
   *Result:* Exit code 0 (`tsc --noEmit` completed with zero errors).

2. **Lib and Unit Test Suite:**
   ```sh
   npx tsx --test src/lib/*.test.ts
   ```
   *Result:* Exit code 0 (80/80 tests passed, 0 failures, duration ~1.59s).
   - `group split preserves exact byte-for-byte topic records across all 58 canonical topics`: Passed
   - `review state, approvals, and review evidence summaries match baseline across all 58 canonical topics`: Passed
   - All persistence, badge, export, and rollback tests: Passed

3. **Production Build:**
   ```sh
   npm run build
   ```
   *Result:* Exit code 0 (Next.js 15.5.28 compiled successfully in 24.8s, generated 182 static pages including `/learn/ui-ux-roles-navigation`, `/learn/ux-blueprint`, and `/learn/screen-inventory`).

4. **Production Browser Test Suite:**
   ```sh
   E2E_SERVER=production E2E_PORT=3207 npx playwright test e2e/path/ui-ux-blueprint-inventory.spec.ts
   ```
   *Result:* Exit code 0 (10/10 passed in 42.1s on dedicated port 3207).
   - `Topic 18 (UI/UX Roles & Navigation): Renders metadata, role matrix, RTL layout, and PROMPT 14 copyable`: Passed
   - `Topic 19 (UX Blueprint): Renders Sitemap, four UI states and cross-cutting checks, and PROMPT 15`: Passed
   - `Topic 20 (Screen Inventory): Verifies strict MVP scope, SCR-01 to SCR-06, traceability matrix, and no invented screens`: Passed
   - `Sequential Navigation Bounds: Seamless bi-directional transition between Topics 18, 19, and 20`: Passed
   - `Group 07: Renders all lesson and structured activity sections for UI/UX planning topics`: Passed
   - `Group 07: Practical steps and expected outputs are present and copyable across all topics`: Passed
   - `Group 07: Objective quiz grades responses and provides explanatory feedback with retry`: Passed
   - `Group 07: Application checklist and practical rubric can be edited, reversed, and persist across reload`: Passed
   - `Group 07: RTL prose and LTR technical content render with proper directionality and styling`: Passed
   - `Group 07: Mobile viewport at 390px has no horizontal overflow in reader and modal`: Passed

---

## 6. Release Recommendation

Group 07 (`ui-ux-roles-navigation`, `ux-blueprint`, `screen-inventory`) has completed the educational review audit, verified coherent practical step handoffs without prerequisite locks, validated external video candidates with honest deferred approval, confirmed absence of legacy brand names, and extended browser test coverage to 10 passing tests.

The group is in **evidence complete and awaiting course-owner sign-off** status.
