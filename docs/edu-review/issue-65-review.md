# Issue #65: Frontend/API integration and journey testing — author review evidence

**Recorded:** 2026-10-20
**Implementation:** complete draft in `src/data/learning/group-b.ts` for the 2 canonical Topics.
**Educational author review:** lesson, question, and rubric records carry a specific Curriculum B author review. Each record remains `review-ready`.
**Release decision:** blocked pending course-owner template/scoring/rubric/video acceptance. No owner approval is recorded. Candidate videos are not approved; playback, captions, accessibility, and user-facing availability remain Not Run.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

## `frontend-backend-integration`

**Inputs and lesson walk-through:** العقد يربط الطرفين → مثال محلول: قائمة عناصر → برومبت ومصفوفة تكامل. Steps:
  - أنشئ دالة typed لطلب واحد وافحص status قبل تفسير body. → `العميل يميز response الناجح وHTTP error ورفض الشبكة.`
  - سجل origin المسموح وأسماء المتغيرات وحدد العام والسري. → `docs/INTEGRATION_CONFIG.md بأسماء فقط ومصادر إعدادها.`
  - اختبر نجاحاً وempty وunauthorized وnetwork failure باستخدام مصدر معلّم. → `جدول UI/HTTP يحدد لكل تجربة fixture أو خدمة فعلية.`

**Sample project output (worked example `api-state-matrix`):** نتيجة قائمة API — واجهة تقرأ endpoint موثقاً.

```text
200 [] → empty message; 401 → agreed sign-in flow; fetch rejection → connection message without secret details.
```

**Handoff:** برومبت: «طابق client مع العقد واختبر 200/empty/401/validation/network. افحص CORS وbundle بحثاً عن أسرار. لا تسم mock اتصالاً حقيقياً». سلّم matrix الرحلة إلى اختبارات full-stack.

**Objective quiz:** v1; stable question IDs `frontend-backend-integration-successful-empty-response-state`, `frontend-backend-integration-browser-public-env-vs-secret`.
  - `frontend-backend-integration-successful-empty-response-state` (frontend-backend-integration-objective-1): يرجع الخادم 200 ومصفوفة فارغة. ما حالة الواجهة؟ — مفتاح frontend-backend-integration-successful-empty-response-state-a; التعليل: الاستجابة ناجحة لكن لا تحتوي عناصر؛ تختلف عن الفشل.
  - `frontend-backend-integration-browser-public-env-vs-secret` (frontend-backend-integration-objective-2): ما القيمة المناسبة لمتغير NEXT_PUBLIC_API_BASE_URL؟ — مفتاح frontend-backend-integration-browser-public-env-vs-secret-a; التعليل: البادئة تعني أن القيمة تصل للمتصفح؛ الأسرار تبقى في الخادم.

**Practical assessment:** scale `frontend-backend-integration-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `api-client`: عميل typed يعالج النجاح وأخطاء HTTP والشبكة.
  - `integration-config`: جدول origin/vars/status ومصدر بيانات التجربة.

Criteria:
  - `frontend-backend-integration-contract-errors` → `api-client`: التزام العقد. العميل يفصل success وHTTP/network errors. دليل المراجعة: أرفق العقد ونتيجة حالتين أو اذكر ما لم يُختبر.
  - `frontend-backend-integration-secret-boundary` → `integration-config`: حد العام والسري. القيم العامة لا تتضمن بيانات اعتماد ومصدر التجربة واضح. دليل المراجعة: اذكر أسماء المتغيرات ومكان تخزينها دون قيم.

**Author finding:** راجع المؤلف empty مقابل network error وحد NEXT_PUBLIC_. بيانات mock لا تعد تكاملاً حقيقياً.

**External video candidate:** [Building microservices with Tye — Frontend / Backend Tye Demo](https://learn.microsoft.com/en-us/shows/on-dotnet/building-microservices-with-tye) (`candidate`, approval `proposed`). مرشح لشرح الربط والتشغيل المتزامن بين واجهة وخلفية؛ الفصل 06:15 هو Frontend / Backend Tye Demo. يستخدم .NET Project Tye القديم، لذا يصلح للمفاهيم المعمارية فقط ولا يوصي باستبدال Next.js/FastAPI الحاليين.

**Resource evidence:** صفحة Microsoft Learn تعرض فصلاً زمنياً بعنوان Frontend / Backend Tye Demo عند 06:15 وتشرح التشغيل المحلي للخدمات المتصلة. المورد خاص بأداة .NET Tye القديمة وليس دورة Next.js/FastAPI؛ صلته توضيحية فقط. لم يُختبر الفيديو أو captions أو الوصولية ولم يوافق المالك. [Publisher/source page](https://learn.microsoft.com/en-us/shows/on-dotnet/building-microservices-with-tye).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `full-stack-journey-testing`

**Inputs and lesson walk-through:** اختر مستوى الاختبار → مثال محلول: إنشاء مورد → برومبت وخطة إثبات. Steps:
  - اكتب خطوات الرحلة والبيانات الأولية والنتائج والتنظيف. → `docs/JOURNEY_TESTS.md قابل للإعادة في بيئة محددة.`
  - نفذ success وvalidation/network failure ببيانات test ثابتة. → `تغطية UI/HTTP بأسماء source واضحة؛ الفشل لا يمر كنجاح.`
  - سجل الأمر والمتصفح والبيئة والوقت والنتائج الفعلية. → `Passed/Failed/Not Run لكل حالة مع طريقة إعادة إنتاج.`

**Sample project output (worked example `journey-example`):** إنشاء وقراءة — E2E لمستخدم تجريبي في test أو staging.

```text
Given empty catalog → submit valid item → 201 → visible list; submit invalid name → validation message; cleanup removes only fixture created by test.
```

**Handoff:** برومبت: «اكتب الرحلة من شروط البداية للنتيجة. حدد مستوى الاختبار ومصدر البيانات والتنظيف. شغّل success/failure/reload وسجل الأمر والنتيجة بلا بيانات شخصية». سلّم gaps إلى الأداء وQA.

**Objective quiz:** v1; stable question IDs `full-stack-journey-testing-test-layer-evidence`, `full-stack-journey-testing-reproducible-e2e-fixture`.
  - `full-stack-journey-testing-test-layer-evidence` (full-stack-journey-testing-objective-1): الرحلة تستخدم mock لـ API. ما الذي تثبته؟ — مفتاح full-stack-journey-testing-test-layer-evidence-b; التعليل: المحاكاة تغطي حدها فقط؛ يجب تسمية ما لم يدخل.
  - `full-stack-journey-testing-reproducible-e2e-fixture` (full-stack-journey-testing-objective-2): كيف تجعل الرحلة قابلة للإعادة؟ — مفتاح full-stack-journey-testing-reproducible-e2e-fixture-b; التعليل: التهيئة والتنظيف يمنعان الاعتماد على ترتيب التشغيل ويحميان البيانات.

**Practical assessment:** scale `full-stack-journey-testing-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `journey-spec`: سيناريوهات success/failure وشروط وfixtures وتنظيف.
  - `journey-log`: سجل تشغيل فعلي بالأمر والبيئة أو Not Run.

Criteria:
  - `full-stack-journey-testing-reproducible` → `journey-spec`: إعادة الرحلة. التهيئة والتنظيف مستقلان عن ترتيب التشغيل. دليل المراجعة: أرفق شروط البداية ومصدر API وخطوة التنظيف.
  - `full-stack-journey-testing-test-boundary` → `journey-log`: حدود التغطية. السجل يحدد الطبقات التي فحصها الاختبار. دليل المراجعة: أرفق الأمر والنتيجة والطبقة التي لم تغط.

**Author finding:** راجع المؤلف مستويات الاختبار ومصدر بيانات المثال. يفرق المخرج mock عن قاعدة فعلية ويسجل نتيجته كما حدثت.

**External video candidate:** [Get started with end-to-end testing with Playwright](https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/get-started-with-end-to-end-testing-with-playwright) (`candidate`, approval `proposed`). مرشح لكتابة رحلة مستخدم مع locators/assertions واختبار install وتشغيل مشروع Playwright؛ صفحة الناشر تسميه Episode 2. لا يثبت التكامل مع API فعلي ما لم تُشغّل الرحلة عليه.

**Resource evidence:** صفحة Microsoft Learn تسمّي Episode 2 وتصف تنصيب Playwright واستخدام locators وassertions في اختبار end-to-end. ملائم لسير الرحلة؛ نطاقه مثال تدريبي ولا يثبت API/DB للمشروع. التشغيل/captions/accessibility وowner signoff لم تُنفذ. [Publisher/source page](https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/get-started-with-end-to-end-testing-with-playwright).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## Owner gates

- Approve or revise the first-group/template and this membership before any group is marked improved.
- Decide the proposed quiz scoring and descriptive rubric scale; all scoring/rubric policy approvals remain `proposed`.
- Review each candidate against the actual lesson, approve/reject each resource, and confirm captions/accessibility/playback before release. A publisher listing alone is not approval.
- Record course-owner acceptance for the complete group and the independent evidence required by the parent release issue.
- Browser journey, persisted history, RTL/LTR, keyboard/mobile, and integrated build checks remain for root-coordinated integration.
