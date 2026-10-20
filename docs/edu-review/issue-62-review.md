# Issue #62: Frontend planning and Spec Kit — author review evidence

**Recorded:** 2026-10-20
**Implementation:** complete draft in `src/data/learning/group-b.ts` for the 4 canonical Topics.
**Educational author review:** lesson, question, and rubric records carry a specific Curriculum B author review. Each record remains `review-ready`.
**Release decision:** blocked pending course-owner template/scoring/rubric/video acceptance. No owner approval is recorded. Candidate videos are not approved; playback, captions, accessibility, and user-facing availability remain Not Run.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; learner tool execution, browser validation, video review, and course-owner decisions remain Not Run or pending.

## `frontend-architecture-planning`

**Inputs and lesson walk-through:** اجمع المراجع قبل تقسيم الملفات → مثال محلول: فهرس وتفصيل → برومبت تخطيط ومخرج. Steps:
  - صنف كل شاشة إلى route ومكونات مشتركة وبيانات تقرؤها أو تعدلها. → `docs/FRONTEND_ARCHITECTURE.md يحوي جدول شاشة/route/component/data source.`
  - اختر رحلة واقطعها إلى مهام صغيرة تبدأ بسطح المستخدم وتنتهي بمخرج قابل للتجربة. → `قائمة مهام فيها empty/success states وقبول ملاحظ، لا مهمة واحدة بعنوان "ابن التطبيق".`
  - سجل الاختلاف بين PRD وERD أو الشاشة مع مصدر القرار المطلوب. → `docs/FRONTEND_OPEN_QUESTIONS.md يذكر السؤال والمراجع والمالك.`

**Sample project output (worked example `route-map-example`):** خريطة قائمة موارد — المستندات تصف فهرساً وفتح سجل.

```text
Route /equipment → SearchBar + EquipmentList؛ route /equipment/[id] → EquipmentDetail. الرابط يحمل id، وبقية الحقول مصدرها محدد في الخريطة.
```

**Handoff:** برومبت: «استخرج route/component map من هذه المراجع. اربط كل عنصر بمصدره، وافصل القرارات عن الأسئلة، ثم اقترح مهام صغيرة بقبول ملاحظ. لا تنشئ Backend أو شاشة غير موجودة». سلّم الخريطة إلى مراجعة UX التالية.

**Objective quiz:** v1; stable question IDs `frontend-architecture-planning-requirement-conflict-source`, `frontend-architecture-planning-reviewable-task-boundary`.
  - `frontend-architecture-planning-requirement-conflict-source` (frontend-architecture-planning-objective-1): تختلف شاشة عن ERD في حقلين. ما الخطوة الأولى؟ — مفتاح frontend-architecture-planning-requirement-conflict-source-b; التعليل: الخطة تميز القرار من الافتراض، ولا تنشئ عقداً متعارضاً بالتخمين.
  - `frontend-architecture-planning-reviewable-task-boundary` (frontend-architecture-planning-objective-2): أي مهمة يسهل مراجعتها؟ — مفتاح frontend-architecture-planning-reviewable-task-boundary-b; التعليل: مهمة صغيرة ذات مدخل ونتيجة مرئية يمكن فحصها مستقلة.

**Practical assessment:** scale `frontend-architecture-planning-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `front-map`: خريطة route/component/data مرتبطة بمصادر المتطلبات.
  - `task-slice`: مهام عمودية صغيرة وأسئلة وأدلة قبول.

Criteria:
  - `frontend-architecture-planning-map-source` → `front-map`: تتبّع المصدر. كل route/component يتبع متطلباً أو يحمل سؤالاً مفتوحاً. دليل المراجعة: أشر إلى شاشة ومصدرها في PRD أو inventory.
  - `frontend-architecture-planning-slice-acceptance` → `task-slice`: قبول ملاحظ. للمهام نتيجة مرئية وحالات خارج المسار السعيد. دليل المراجعة: أرفق المهمة الأولى وشرط قبول يمكن إعادة ملاحظته.

**Author finding:** راجع المؤلف ربط المراجع الأربعة بخريطة route/component ومهمة رأسية. لا تُدخل قاعدة أو شاشة غير موثقة، والمخرج يهيئ مراجعة UX وSpec Kit.

**External video candidate:** [Architectural Requirements — Fundamentals of Frontend Architecture](https://frontendatscale.com/courses/frontend-architecture/foundations/course-overview) (`candidate`, approval `proposed`). مرشح من درس فيديو محدد في الدورة: Architectural Requirements (الدرس 13، 7:44)، ومعه Exercise 2 حول تمييز المتطلبات المؤثرة وربطها بالمواصفات. هذا يدعم توثيق المصدر والقيود، ولا يغطي وحده كامل PRD/SRS للمشروع.

**Resource evidence:** فهرس الدورة يسرد درس Architectural Requirements ومدته 7:44 وExercise 2: Architectural Requirements؛ صفحة التمرين تشرح استخراج المتطلبات المعمارية من مواصفة مشروع. صلة الخريطة/المهام جزئية، ولا تُعد موافقة قالب الدورة. لم يُختبر التشغيل أو captions أو الوصولية أو قبول المالك. [Publisher/source page](https://frontendatscale.com/courses/frontend-architecture/foundations/course-overview).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `ui-ux-pro-max-review`

**Inputs and lesson walk-through:** حدد السياق قبل تشغيل الأداة → مثال محلول: اقتراح يخالف الرمز → برومبت مراجعة ومخرج. Steps:
  - جهز وصف الشاشة والمستخدم والمهمة والاتجاه والعروض واحذف بيانات حقيقية. → `docs/UX_REVIEW_CONTEXT.md يحدد نسخة الرموز والسياق.`
  - صنف كل توصية: قبول أو رفض أو اختبار/قرار مطلوب. → `docs/UX_REVIEW_DECISIONS.md يربط التوصية بعنصر الشاشة والمتطلب.`
  - حوّل المقبول فقط إلى تغييرات بقبل/بعد ومعيار تحقق. → `تغييرات لا تحتوي توصيات غير محسومة ولا ادعاء امتثال غير مفحوص.`

**Sample project output (worked example `ux-decision`):** فرز اقتراح لون ومساحة — أداة تقترح تكبير زر ثانوي وتغيير لونه.

```text
تكبير مساحة النقر مقبول لتسهيل اللمس؛ اللون الجديد ينتظر قراراً لأنه خارج DESIGN.md. يضاف فحص contrast قبل أي تغيير لون.
```

**Handoff:** برومبت: «لكل توصية اذكر العنصر والدليل والأثر. ميّز الاقتراح عن معيار الوصولية، ولا تعدل الكود. أخرج قرار قبول/رفض وسؤالاً مفتوحاً». سلّم جدول القرار إلى Spec Kit.

**Objective quiz:** v1; stable question IDs `ui-ux-pro-max-review-suggestion-vs-approved-system`, `ui-ux-pro-max-review-actionable-critique-evidence`.
  - `ui-ux-pro-max-review-suggestion-vs-approved-system` (ui-ux-pro-max-review-objective-1): اقترحت الأداة لوناً غير موجود في DESIGN.md. ماذا تفعل؟ — مفتاح ui-ux-pro-max-review-suggestion-vs-approved-system-b; التعليل: المخرجات مقترحات؛ تغيير النظام قرار قابل للتتبع.
  - `ui-ux-pro-max-review-actionable-critique-evidence` (ui-ux-pro-max-review-objective-2): كيف تجعل ملاحظة "المسافة غير مريحة" قابلة للتنفيذ؟ — مفتاح ui-ux-pro-max-review-actionable-critique-evidence-a; التعليل: المراجع يحتاج موضعاً وسبباً وخطوة تحقق.

**Practical assessment:** scale `ui-ux-pro-max-review-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `ux-context`: سياق شاشة آمن يحدد المستخدم والمهمة والاتجاه والرموز.
  - `ux-decisions`: قرارات قبول/رفض وأسئلة مع دليل ومعيار فحص.

Criteria:
  - `ui-ux-pro-max-review-review-context` → `ux-context`: سياق محدد. المراجعة تذكر المستخدم والمهمة ولا تتضمن بيانات حساسة. دليل المراجعة: أشر إلى الشاشة والمهمة والعرض الذي راجعته.
  - `ui-ux-pro-max-review-decision-record` → `ux-decisions`: قرار قابل للتتبع. كل توصية لها حالة ومبرر أو فحص مطلوب. دليل المراجعة: اعرض توصية ومصدر الحكم وسبب الحالة المختارة.

**Author finding:** راجع المؤلف حدود أداة التوصية بوصفها مدخلاً لا قراراً، وميّز تقييماً آلياً عن إثبات معيار وصولية. يسلم الناتج قرارات قابلة للتطبيق.

**External video candidate:** [How to use Figma agent in your design workflows](https://www.figma.com/solutions/ai-design-feedback-agent/) (`candidate`, approval `proposed`). مرشح من مورد Figma الذي يصف مشاهدة agent ومراجعته للتصميم داخل سياق الإطارات ومكتبة التصميم. يُستخدم كنقطة نقد مساعدة فقط؛ يجب على المتعلم فحص الهدف والسياق وإمكانية الوصول وعدم قبول اقتراحات الأداة تلقائياً.

**Resource evidence:** صفحة Figma الرسمية تسرد “How to use Figma agent in your design workflows” كدرس فيديو وتشرح أن agent يقدم نقداً ضمن طبقات التصميم والسياق وإرشادات الوصولية. المورد خاص بأداة Figma AI ولا يثبت جودة توصياتها أو تغطية اختبار المستخدم. التشغيل/captions/accessibility وموافقة المالك غير منفذة. [Publisher/source page](https://www.figma.com/solutions/ai-design-feedback-agent/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `spec-kit-workflow`

**Inputs and lesson walk-through:** المواصفة تسلسل قرارات → مثال محلول: استعادة مسودة → برومبت ومخرج مرحلي. Steps:
  - اكتب سلوك الميزة والمستخدم والحالات المتوقعة والاستثناءات من المصادر. → `spec.md يصف success/error/empty ويربط القواعد بوثيقة.`
  - سجل أسئلة الأداة ومن يجيب عنها ولا تحول الافتراض إلى قاعدة صامتة. → `قائمة clarification لا تحتوي أسئلة حرجة مخفية داخل الخطة.`
  - راجع الخطة وقسمها لمهام صغيرة مع ملفات واختبار قبول. → `plan/tasks تربط كل مهمة بشرط من spec؛ لا تشمل تنفيذ الكود.`

**Sample project output (worked example `local-draft-spec`):** مواصفة حفظ مسودة — عودة المتعلم للمسودة في المتصفح نفسه.

```text
المواصفة تحدد الحقول والحفظ والاستعادة وفشل storage. سؤال مزامنة الأجهزة يبقى مفتوحاً؛ لا يضاف Backend دون قرار.
```

**Handoff:** برومبت: «اقرأ Constitution وPRD/SRS. صغ spec لهذه الميزة، أظهر الأسئلة بلا افتراض، ثم اقترح خطة ومهام مرتبطة بمعايير قبول. لا تنفذ الكود». الناتج يهيئ التنفيذ التدريجي.

**Objective quiz:** v1; stable question IDs `spec-kit-workflow-scope-expansion-control`, `spec-kit-workflow-spec-plan-task-trace`.
  - `spec-kit-workflow-scope-expansion-control` (spec-kit-workflow-objective-1): أضافت أداة التخطيط مزامنة سحابية لنطاق محلي. ما التصرف؟ — مفتاح spec-kit-workflow-scope-expansion-control-b; التعليل: الخطة لا تملك صلاحية توسيع المتطلبات المعتمدة.
  - `spec-kit-workflow-spec-plan-task-trace` (spec-kit-workflow-objective-2): ما الذي يجعل tasks قابلة للمراجعة؟ — مفتاح spec-kit-workflow-spec-plan-task-trace-a; التعليل: التتبع والقبول يحددان حجم التغيير وأثره.

**Practical assessment:** scale `spec-kit-workflow-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `feature-spec`: مواصفة سيناريوهات وأسئلة مرتبطة بالمصادر.
  - `feature-plan`: خطة ومهام صغيرة ضمن النطاق وبقبول واضح.

Criteria:
  - `spec-kit-workflow-scope` → `feature-spec`: نطاق وقرارات. الأسئلة غير المحسومة ظاهرة ولا توجد قاعدة مخترعة. دليل المراجعة: أرفق متطلباً وسؤالاً مفتوحاً ومصدر كل منهما.
  - `spec-kit-workflow-tasks` → `feature-plan`: تتبع المهام. كل مهمة مرتبطة بمعيار قبول دون توسيع. دليل المراجعة: اختر مهمة واربطها بشرط spec.

**Author finding:** راجع المؤلف التسلسل من المواصفة إلى التوضيح والخطة، وحدود النطاق عند المزامنة. أمر الأداة يجب أن يطابق الإصدار الفعلي.

**External video candidate:** [The ONLY guide you’ll need for GitHub Spec Kit](https://developer.microsoft.com/blog/spec-driven-development-spec-kit/) (`candidate`, approval `proposed`). مرشح لشرح سلسلة Spec Kit من المتطلبات قبل التنفيذ. صفحة Microsoft for Developers تسمي فيديو دليلاً لـ GitHub Spec Kit؛ قارنه بنسخة CLI والقوالب الحالية لأن سير العمل يتغير.

**Resource evidence:** مقال Microsoft for Developers يصف Spec Kit ويضع رابط فيديو بعنوان “The ONLY guide you’ll need for GitHub Spec Kit”. صفحة GitHub الرسمية كذلك تسرد Video Overview. المحتوى ملائم كتقديم، لكن تعليمات CLI/version لا تُعامل كمرجع حالي دون فحص المستودع. لم يُختبر الفيديو أو captions أو الوصولية، ولا قبول مالك. [Publisher/source page](https://developer.microsoft.com/blog/spec-driven-development-spec-kit/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `frontend-incremental-implementation`

**Inputs and lesson walk-through:** من المهام إلى شريحة رأسية → مثال محلول: صفحة تفاصيل → برومبت تنفيذ محدود. Steps:
  - اختر مهمة واكتب معيار قبولها والملفات والبيانات المستخدمة. → `بطاقة عمل فيها مدخل ومخرج وfixture موسوم.`
  - نفذ حالة نجاح وفراغ أو خطأ مناسبة مع مصدر بيانات واضح. → `تدفق لا يوحي بتكامل Backend إن كان mock.`
  - شغل الفحص المتاح وسجل الأمر والنتيجة والملفات الخارجة عن النطاق. → `docs/FRONTEND_SLICE_REVIEW.md بنتيجة Passed/Failed/Not Run وتالية محددة.`

**Sample project output (worked example `detail-slice`):** شريحة تفاصيل — مواصفة لفتح سجل من الفهرس.

```text
1: عرض fixture. 2: حالة id غير موجود. 3: ربط API بعد توفر العقد والخادم. تسجل كل مرحلة على حدة ولا توصف الأولى كتدفق مكتمل.
```

**Handoff:** برومبت: «نفّذ هذه المهمة وحدها وفق spec. اعرض الملفات والافتراضات ثم diff والاختبارات التي شغلتها فعلاً. لا تغير API أو التصميم خارج القبول». سلّم الشريحة إلى مرحلة Backend.

**Objective quiz:** v1; stable question IDs `frontend-incremental-implementation-vertical-slice-choice`, `frontend-incremental-implementation-mocked-service-boundary`.
  - `frontend-incremental-implementation-vertical-slice-choice` (frontend-incremental-implementation-objective-1): أي شريحة أفضل بداية؟ — مفتاح frontend-incremental-implementation-vertical-slice-choice-a; التعليل: الشريحة المحدودة يسهل فحصها وتصحيحها.
  - `frontend-incremental-implementation-mocked-service-boundary` (frontend-incremental-implementation-objective-2): الاختبار يستخدم fixture بدلاً من API. ماذا تسجل؟ — مفتاح frontend-incremental-implementation-mocked-service-boundary-b; التعليل: النتيجة يجب أن تطابق الطبقة التي اختبرت فعلاً.

**Practical assessment:** scale `frontend-incremental-implementation-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `ui-slice`: تغيير واجهة محدود يحقق معياراً مع مصدر بيانات واضح.
  - `slice-evidence`: سجل ملفات وفحوص ونتائج وفجوة وتالية.

Criteria:
  - `frontend-incremental-implementation-acceptance` → `ui-slice`: نطاق الشريحة. تغيير واحد يطابق معيار قبول ولا يضيف متطلبات. دليل المراجعة: اربط الملف أو العنصر بشرط القبول.
  - `frontend-incremental-implementation-test-result` → `slice-evidence`: نتيجة قابلة للإعادة. الأمر والبيئة ومصدر البيانات مذكورة كما هي. دليل المراجعة: أرفق أمراً ونتيجته وطبقة لم تُختبر.

**Author finding:** راجع المؤلف فصل fixture عن التكامل الحقيقي واشتراط نتيجة فحص لكل شريحة. المخرج يسلم العقود إلى تأسيس Python Backend.

**External video candidate:** [22. Breaking Things Down — Fundamentals of Frontend Architecture](https://frontendatscale.com/courses/frontend-architecture/designing/breaking-things-down/) (`candidate`, approval `proposed`). مرشح لشرح تقطيع العمل إلى وحدات ومشكلات أصغر؛ النص المصاحب يبدأ في 00:30 بوحدات/مشكلات صغيرة في نظام الواجهة. يوائم اختيار vertical slice مع عرض مخرج قابل للفحص.

**Resource evidence:** صفحة فيديو Frontend at Scale تسمي درس 22 وتعرض نصاً زمنياً: عند 00:30 يشرح تقسيم النظام إلى modules ومشكلات صغيرة. الملاءمة لتجزئة التنفيذ عملية؛ لا تثبت نجاح تنفيذ مشروع المتعلم. التشغيل/captions/accessibility/owner approval لم تُفحص. [Publisher/source page](https://frontendatscale.com/courses/frontend-architecture/designing/breaking-things-down/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## Owner gates

- Approve or revise the first-group/template and this membership before any group is marked improved.
- Decide the proposed quiz scoring and descriptive rubric scale; all scoring/rubric policy approvals remain `proposed`.
- Review each candidate against the actual lesson, approve/reject each resource, and confirm captions/accessibility/playback before release. A publisher listing alone is not approval.
- Record course-owner acceptance for the complete group and the independent evidence required by the parent release issue.
- Browser journey, persisted history, RTL/LTR, keyboard/mobile, and integrated build checks remain for root-coordinated integration.
