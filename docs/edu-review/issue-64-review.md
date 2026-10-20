# Issue #64: Django, FastAPI, permissions, and services — author review evidence

**Recorded:** 2026-10-20
**Implementation:** complete draft in `src/data/learning/group-b.ts` for the 4 canonical Topics.
**Educational author review:** lesson, question, and rubric records carry a specific Curriculum B author review. Each record remains `review-ready`.
**Release decision:** blocked pending course-owner template/scoring/rubric/video acceptance. No owner approval is recorded. Candidate videos are not approved; playback, captions, accessibility, and user-facing availability remain Not Run.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

## `django-backend`

**Inputs and lesson walk-through:** Django خيار مستقل → مثال محلول: قيد uniqueness → برومبت مراجعة migration. Steps:
  - سجل اختيار Django أو FastAPI وسبباً؛ إذا اخترت Django تجاوز بناء FastAPI. → `docs/BACKEND_FRAMEWORK_DECISION.md يذكر الإطار والبديل الذي لم ينفذ.`
  - أنشئ models من الكيانات والعلاقات والقيود المعتمدة. → `نماذج تتبع ERD مع كل اختلاف كقرار أو سؤال.`
  - ولّد migration وراجعها على قاعدة تطوير قبل التطبيق. → `ملف migration ونتيجة أمر الفحص؛ الإنتاج Not Run.`

**Sample project output (worked example `django-migration`):** مراجعة حقل جديد — إضافة category_id إلى نموذج.

```text
افحص هل الحقل nullable أو يحتاج تعبئة أولاً، ثم راجع upgrade/reverse قبل تطبيقه على dev.
```

**Handoff:** برومبت: «طابق models مع ERD والقيود. أنشئ migration وافحص أثرها وrollback في dev؛ لا تطبقها على الإنتاج». الناتج يغذي المصادقة في الموضوع 43.

**Objective quiz:** v1; stable question IDs `django-backend-database-constraint-vs-ui-check`, `django-backend-migration-risk-review`.
  - `django-backend-database-constraint-vs-ui-check` (django-backend-objective-1): قيد uniqueness يعتمد على organization وname. ما الذي يحميه عند كتابتين متزامنتين؟ — مفتاح django-backend-database-constraint-vs-ui-check-b; التعليل: قيد التخزين يحمي invariant حتى عند التزامن؛ يجب أن يتبع ERD والمتطلبات المعتمدة.
  - `django-backend-migration-risk-review` (django-backend-objective-2): ما الذي تراجعه قبل migration؟ — مفتاح django-backend-migration-risk-review-a; التعليل: التوليد لا يثبت سلامة التغيير؛ افحص الأثر أولاً.

**Practical assessment:** scale `django-backend-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `django-models`: نماذج Django وقرار إطار مرتبطان بـ ERD.
  - `django-migration`: migration ونتيجة مراجعتها في بيئة محددة.

Criteria:
  - `django-backend-erd-match` → `django-models`: مطابقة المصدر. كل حقل/علاقة يتبع ERD أو قراراً موثقاً. دليل المراجعة: اربط كياناً بحقول وعلاقات ERD.
  - `django-backend-migration-review` → `django-migration`: أثر التغيير. المراجعة تسمي البيئة والأثر ولا تفترض أمان الإنتاج. دليل المراجعة: أرفق نتيجة مراجعة الترحيل وما لم يُختبر.

**Author finding:** راجع المؤلف أن Django/FastAPI بديلان وأن القيود تحمي التخزين. Migration لا تُطبّق على الإنتاج ضمن التمرين.

**External video candidate:** [Building With Django REST Framework (Overview)](https://realpython.com/videos/building-drf-overview/) (`candidate`, approval `proposed`). مرشح لعرض serializers وviews/ViewSets وURLs والصلاحيات في API قائم على Django. تصف الصفحة عينة شُغلت على Python 3.13 وDjango 5.1.2 وDRF 3.15.2؛ تحقق من الإصدارات الحالية.

**Resource evidence:** صفحة Real Python تذكر REST، serializers، Django views/ViewSets، URLs والصلاحيات؛ وتذكر إصدارات العينة 3.13/5.1.2/3.15.2. الملاءمة مباشرة لمخرجات الموضوع. لم يُختبر التشغيل أو captions أو الوصولية، ومراجعة المالك غير موجودة. [Publisher/source page](https://realpython.com/videos/building-drf-overview/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `fastapi-backend`

**Inputs and lesson walk-through:** FastAPI خيار مستقل → مثال محلول: schema مقابل ORM → برومبت ومخرج. Steps:
  - أنشئ request وresponse منفصلين عن ORM واختبر قيمة طلب غير صالحة. → `مخططان يوضحان حقول الإدخال والمخرج؛ لا يتسرب internal field.`
  - حدد دورة session عبر dependency؛ استخدم async فقط مع driver مناسب. → `اختبار/مخطط يوضح فتح الجلسة وإغلاقها لكل طلب.`
  - اربط metadata وولّد migration تجريبية وافحص upgrade/downgrade على dev. → `رأس Alembic ونتيجة تطبيق على dev؛ الإنتاج لم يتغير.`

**Sample project output (worked example `fastapi-schema-example`):** إنشاء عنصر — العميل يحتاج id/name ولا يحتاج internal_note.

```text
CreateItemRequest → SQLAlchemy Item → ItemResponse(id,name).
```

**Handoff:** برومبت: «راجع فصل schema/ORM وربط Alembic metadata. اعرض migration وفرق الترقية والتراجع، ولا تطبقها حتى تفحص dev». الناتج يهيئ auth الموحد.

**Objective quiz:** v1; stable question IDs `fastapi-backend-request-schema-validation`, `fastapi-backend-migration-generated-diff-review`.
  - `fastapi-backend-request-schema-validation` (fastapi-backend-objective-1): أين تتحقق من طول اسم يصل في الطلب؟ — مفتاح fastapi-backend-request-schema-validation-a; التعليل: تحقق المدخل يحدث عند حد API قبل تمرير القيمة للمنطق.
  - `fastapi-backend-migration-generated-diff-review` (fastapi-backend-objective-2): ماذا تفحص في migration مولدة؟ — مفتاح fastapi-backend-migration-generated-diff-review-a; التعليل: التوليد الآلي مسودة تحتاج مراجعة واختباراً.

**Practical assessment:** scale `fastapi-backend-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `api-schemas`: مخططات request/response مفصولة عن ORM.
  - `alembic-record`: migration ومراجعة الجلسة والترحيل في dev.

Criteria:
  - `fastapi-backend-schema-boundary` → `api-schemas`: حد البيانات. الطلب والمخرج لا يكشفان حقول التخزين غير العامة. دليل المراجعة: اعرض حقلاً يُرفض وآخر لا يخرج للعميل.
  - `fastapi-backend-migration-context` → `alembic-record`: سياق الترحيل. النتيجة مرتبطة ببيئة وتفحص downgrade. دليل المراجعة: أرفق الفرق ورأس Alembic وبيئة التجربة.

**Author finding:** راجع المؤلف فصل schemas/ORM وضرورة توافق async driver. ملف migration المولد لا يعد دليلاً على صحة التغيير قبل مراجعته.

**External video candidate:** [Python REST APIs With FastAPI](https://realpython.com/courses/python-rest-apis-with-fastapi/) (`candidate`, approval `proposed`). مرشح لدروس path parameters وPydantic وGET/POST/PUT/DELETE والاختبار/التوثيق؛ صفحة Real Python تسرد 12 درساً و3 تمارين عملية.

**Resource evidence:** فهرس دورة Real Python يسرد درساً مرئياً لـ FastAPI وطلبات CRUD وPydantic validation وSwagger/HTTPie وتمارين. صلة عملية بواجهة API؛ الاستضافة/التشغيل الآمن تحتاج مواد أخرى. playback/captions/accessibility وقبول المالك لم تُفحص. [Publisher/source page](https://realpython.com/courses/python-rest-apis-with-fastapi/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `auth-permissions`

**Inputs and lesson walk-through:** المتطلب مصدر الإذن → مثال محلول: تعديل سجل → برومبت ومخرج أمني. Steps:
  - اربط كل endpoint بدور وشرط ملكية ونتيجة رفض من متطلبات المشروع. → `docs/AUTH_PERMISSIONS_SPEC.md يحدد route/role/owner/action ومراجع SRS.`
  - نفذ فحص هوية ثم تفويض على الخادم وفق الإطار المختار. → `endpoint يرفض العملية عند غياب الصلاحية؛ الواجهة ليست الحارس الوحيد.`
  - اكتب اختبار مجهول/مسجل بلا دور/مسموح وسجل HTTP status. → `نتائج تطابق العقد ولا تطبع اعتماداً أو سراً.`

**Sample project output (worked example `owner-check`):** رفض تعديل غير مملوك — مستخدم مسجل يحاول تعديل سجل مستخدم آخر.

```text
identity=valid; actor=user-3; owner=user-8; action=denied by server. قرار 403/404 يتبع العقد.
```

**Handoff:** برومبت: «اشتق مصفوفة permission من SRS. اختبر anonymous وrole-missing وowner. لا تطبع token أو كلمة مرور». الناتج يضبط حدود طبقة الخدمة في الموضوع 44.

**Objective quiz:** v1; stable question IDs `auth-permissions-authenticated-identity-vs-authorization`, `auth-permissions-server-enforced-ownership`.
  - `auth-permissions-authenticated-identity-vs-authorization` (auth-permissions-objective-1): ما الفرق بين المصادقة والتفويض؟ — مفتاح auth-permissions-authenticated-identity-vs-authorization-a; التعليل: هما قراران مختلفان يجب أن يحمي الثاني كل endpoint.
  - `auth-permissions-server-enforced-ownership` (auth-permissions-objective-2): كيف تثبت أن مالكاً آخر لا يستطيع تعديل المورد؟ — مفتاح auth-permissions-server-enforced-ownership-b; التعليل: اختبار الخادم يتحقق من الحماية عند الحد الحقيقي.

**Practical assessment:** scale `auth-permissions-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `permission-matrix`: مصفوفة دور/ملكية/إجراء مستندة إلى SRS.
  - `auth-tests`: نتائج رفض المجهول وغير المصرح والسماح.

Criteria:
  - `auth-permissions-role-source` → `permission-matrix`: مصدر الصلاحية. السماح والرفض يتبعان SRS أو سؤالاً مفتوحاً. دليل المراجعة: أشر إلى متطلب الدور والroute.
  - `auth-permissions-server-check` → `auth-tests`: فحص الخادم. الاختبار يستدعي endpoint ويتحقق من النتيجة. دليل المراجعة: أرفق الحالات وHTTP status الفعلي.

**Author finding:** راجع المؤلف الفرق بين الهوية والتفويض واختبار الملكية عبر API. لا تفرض أدوار BorrowHub أو تخزين token بعينه.

**External video candidate:** [REST Easy — API Security Done Right](https://www.djangotv.com/videos/djangocon-us/2015/djangocon-us-2015-rest-easy-api-security-done-right-by-jeff-schenck/) (`candidate`, approval `proposed`). مرشح لمقارنة المصادقة والتفويض وفحوص endpoint/object/field/HTTP method، بما فيها حدود الملكية على الاستعلامات. المحتوى في DRF (2015)، لذا يجب مطابقته مع نسخة المشروع الحالية.

**Resource evidence:** صفحة DjangoTV تصف الفيديو حول مصفوفات authentication/authorization وأذونات endpoint وobject وfield وHTTP method، مع مثال قيود قائمة على مالك المورد. المورد قديم؛ يراجع فقط الأفكار ويُطابق مع DRF الحالي. لم يُختبر playback/captions/accessibility ولا موافقة المالك. [Publisher/source page](https://www.djangotv.com/videos/djangocon-us/2015/djangocon-us-2015-rest-easy-api-security-done-right-by-jeff-schenck/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `services-selectors`

**Inputs and lesson walk-through:** وزع المسؤولية → مثال محلول: حجز مورد → برومبت ومخرج. Steps:
  - اختر قراءة وكتابة وارسم مسؤولية endpoint/service/selector. → `مخطط يوضح أن selector read-only وأن service تملك حد transaction.`
  - حدد invariant من وثيقة المشروع واكتب اختباراً يعيد إنتاج التعارض. → `اختبار يثبت أن المحاولات لا تنتج حالة ممنوعة وأن الفشل يسبب rollback.`
  - سجل عدد الاستعلامات قبل التحسين ثم قارن بعده إذا ظهر دليل N+1. → `قبل/بعد أو Not Run؛ لا يذكر رقماً غير مقاس.`

**Sample project output (worked example `atomic-request`):** طلب ذري — قاعدة مشروع تسمح بحجز مورد متاح مرة واحدة.

```text
transaction → lock/check availability → validate owner rule → create → commit; conflict → rollback. selector يقرأ القائمة دون كتابة.
```

**Handoff:** برومبت: «استخرج قاعدة الكتابة من PRD. اقترح service وselector، واختبر التنافس وقس query count قبل/بعد. لا تعمم قاعدة BorrowHub». الناتج يهيئ تكامل الواجهة.

**Objective quiz:** v1; stable question IDs `services-selectors-selector-read-side-effects`, `services-selectors-service-invariant-ownership`.
  - `services-selectors-selector-read-side-effects` (services-selectors-objective-1): ما الطبقة المناسبة لقراءة قائمة لا تغير البيانات؟ — مفتاح services-selectors-selector-read-side-effects-a; التعليل: selector يعزل القراءة ويبقى بلا أثر جانبي.
  - `services-selectors-service-invariant-ownership` (services-selectors-objective-2): لماذا قيد أو قفل قاعدة مهم للحجز؟ — مفتاح services-selectors-service-invariant-ownership-b; التعليل: الذرية تحمي سلامة الحالة؛ لا تضمن أداءً أفضل لكل الاستعلامات.

**Practical assessment:** scale `services-selectors-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `service-map`: خريطة طبقات الكتابة والقراءة وحد transaction.
  - `invariant-evidence`: اختبار تنافس وقياس استعلامات حسب البيئة.

Criteria:
  - `services-selectors-tx-boundary` → `service-map`: حد المعاملة. الترتيب يوضح الفشل والكتابة والrollback. دليل المراجعة: أشر إلى بداية transaction وما يحدث عند التعارض.
  - `services-selectors-measured-rule` → `invariant-evidence`: دليل المقارنة. القياس والاختبار مرتبطان بقاعدة ومصدر معلنين. دليل المراجعة: أرفق القاعدة والنتيجة أو وسم Not Run.

**Author finding:** راجع المؤلف الفرق بين service/selector/controller وكلفة تحسين القراءة. مثال التنافس تابع لمتطلبات المشروع وليس مفروضاً من BorrowHub.

**External video candidate:** [Service Layer — Ultimate Guide to FastAPI and Backend Development](https://www.oreilly.com/videos/ultimate-guide-to/9781806101337/) (`candidate`, approval `proposed`). مرشح لتمييز web layer عن service layer عبر فصل من 10:19 بحسب فهرس الناشر. يطبق المتعلم الفكرة فقط إذا دعمتها بنية المشروع، ولا يفترض أن طبقة إضافية مطلوبة دائماً.

**Resource evidence:** فهرس O’Reilly لفيديو FastAPI يعرض فصلاً باسم Service Layer (10m 19s) بين API Router وDependency Chaining، ما يطابق حدود الخدمة/القراءة. لا يثبت أن كل مشروع يحتاج هذا النمط؛ قد يتطلب اشتراكاً. التشغيل/captions/accessibility وقبول المالك لم تُراجع. [Publisher/source page](https://www.oreilly.com/videos/ultimate-guide-to/9781806101337/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## Owner gates

- Approve or revise the first-group/template and this membership before any group is marked improved.
- Decide the proposed quiz scoring and descriptive rubric scale; all scoring/rubric policy approvals remain `proposed`.
- Review each candidate against the actual lesson, approve/reject each resource, and confirm captions/accessibility/playback before release. A publisher listing alone is not approval.
- Record course-owner acceptance for the complete group and the independent evidence required by the parent release issue.
- Browser journey, persisted history, RTL/LTR, keyboard/mobile, and integrated build checks remain for root-coordinated integration.
