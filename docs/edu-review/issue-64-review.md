# Issue #64: Django, FastAPI, permissions, and services — author review evidence

**Recorded:** 2026-10-20
**Implementation:** `src/data/learning/group-b-14-backend-frameworks-services.ts` supplies the draft for the 4 canonical Topics; the original reader lessons remain in the matching wave2/wave3 topic file.
**Educational review state:** authored lesson/question/rubric records remain `review-ready`. The independent static lesson-flow review below passed for the complete group; it does not claim execution of learner tasks.
**Course-owner decisions:** DEC-70 v2 accepted the 19-group membership and lesson template, quiz policy, and descriptive self-assessment policy on 2026-10-20. This is not group-specific release acceptance. The course owner deferred individual video approval until human review of lesson fit, playback, captions, and accessibility. Candidate videos remain `candidate` with `proposed` approval; those human checks are Not Run. No Topic is marked approved and this group is not announced as improved.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The broader output-to-input traceability review for Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). This packet adds an independent review of every owned Topic's inputs, all three authored practical steps and expected outputs, illustrative sample, and handoff. Learner execution and actual project outputs are Not Run; exact-candidate browser/accessibility journeys and per-video human review remain pending.

## Independent lesson-flow re-review

**Verdict:** Passed for authored lesson sequence and output/handoff coherence by static review on 2026-10-20. This verdict concerns the curriculum design only. The sample outputs below are illustrative examples checked for consistency; none was produced by running the learner project. Tool execution is Not Run.

| Topic | Independent walkthrough finding | Result |
|---|---|---|
| `django-backend` | 3/3 steps reviewed: framework choice, models, and migration. Topic 41 records the selected branch or an open question; Django outputs are conditional, FastAPI outputs are `Not Applicable`, and an unresolved branch remains `Not Run`. | **Passed (static)**; learner execution **Not Run** |
| `fastapi-backend` | 3/3 steps reviewed: schemas, session lifecycle, and Alembic. Topic 42 can use the optional decision record or resolve the choice itself; Django outputs are `Not Applicable`, while unresolved work is `Not Run`. The absent record is not an access gate. | **Passed (static)**; learner execution **Not Run** |
| `auth-permissions` | 3/3 steps: source permissions in SRS, enforce at server, test anonymous/unauthorized/allowed; illustrative ownership denial leaves 403/404 to the contract; handoff to services and integration consumes matrix plus test record. | **Passed (static)**; learner execution **Not Run** |
| `services-selectors` | 3/3 steps: layer map, invariant/concurrency test, and measured query count; illustrative transaction example preserves authorization and rollback boundaries; handoff to frontend integration consumes service and invariant evidence. | **Passed (static)**; learner execution **Not Run** |

## `django-backend`

**Inputs and lesson walk-through:** Django خيار مستقل → مثال محلول: قيد uniqueness → برومبت مراجعة migration. يستخدم مخرجات Python/PostgreSQL/API من الموضوعات 38–40 قبل إنشاء ORM؛ Django وFastAPI مساران بديلان. Steps:
  - سجل اختيار Django أو FastAPI وسببه في `docs/BACKEND_FRAMEWORK_DECISION.md`. إن لم يُحسم، دوّن سؤالاً مفتوحاً ولا تدّع تنفيذ فرع. عند اختيار FastAPI، علّم مخرجات Django هنا `Not Applicable` وانتقل إلى الموضوع 42؛ وعند اختيار Django، استخدم هذا الفرع وتجاوز تنفيذ FastAPI. → `الملف يذكر الإطار والبديل الذي لم ينفذ أو يوثق الاختيار غير المحسوم؛ الفرع غير المختار Not Applicable.`
  - إذا كان Django هو الإطار المختار، أنشئ models من الكيانات والعلاقات والقيود المعتمدة؛ إذا اختير FastAPI فسجل الخطوة `Not Applicable`، وإذا ظل الاختيار غير محسوم فسجلها `Not Run`. → `في فرع Django: نماذج تتبع ERD مع كل اختلاف كقرار أو سؤال. في فرع FastAPI: Not Applicable، واستخدم api-schemas من الموضوع 42. عند عدم الحسم: Not Run.`
  - إذا كان Django هو الإطار المختار، ولّد migration وراجعها على قاعدة تطوير قبل التطبيق؛ إذا اختير FastAPI فسجل الخطوة `Not Applicable`، وإذا ظل الاختيار غير محسوم فسجلها `Not Run`. → `في فرع Django: ملف migration ونتيجة أمر الفحص؛ الإنتاج Not Run. في فرع FastAPI: Not Applicable، واستخدم alembic-record من الموضوع 42. عند عدم الحسم: Not Run.`

**Illustrative sample output (worked example `django-migration`):** مراجعة حقل جديد — إضافة category_id إلى نموذج.

```text
افحص هل الحقل nullable أو يحتاج تعبئة أولاً، ثم راجع upgrade/reverse قبل تطبيقه على dev.
```

**Handoff:** برومبت: «طابق models مع ERD والقيود. أنشئ migration وافحص أثرها وrollback في dev؛ لا تطبقها على الإنتاج». الناتج يغذي المصادقة في الموضوع 43.

**Objective quiz:** v1; stable question IDs `django-backend-database-constraint-vs-ui-check`, `django-backend-migration-risk-review`.
  - `django-backend-database-constraint-vs-ui-check` (django-backend-objective-1): قيد uniqueness يعتمد على organization وname. ما الذي يحميه عند كتابتين متزامنتين؟ — مفتاح django-backend-database-constraint-vs-ui-check-b; التعليل: قيد التخزين يحمي invariant حتى عند التزامن؛ يجب أن يتبع ERD والمتطلبات المعتمدة.
  - `django-backend-migration-risk-review` (django-backend-objective-2): ما الذي تراجعه قبل migration؟ — مفتاح django-backend-migration-risk-review-a; التعليل: التوليد لا يثبت سلامة التغيير؛ افحص الأثر أولاً.

**Practical assessment:** scale `django-backend-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `django-models`: نماذج Django وقرار إطار مرتبطان بـ ERD.
  - `django-migration`: migration ونتيجة مراجعتها في بيئة محددة.

Criteria:
  - `django-backend-erd-match` → `django-models`: مطابقة المصدر. كل حقل/علاقة يتبع ERD أو قراراً موثقاً. دليل المراجعة: اربط كياناً بحقول وعلاقات ERD.
  - `django-backend-migration-review` → `django-migration`: أثر التغيير. المراجعة تسمي البيئة والأثر ولا تفترض أمان الإنتاج. دليل المراجعة: أرفق نتيجة مراجعة الترحيل وما لم يُختبر.

**Author finding:** راجع المؤلف أن Django/FastAPI بديلان وأن القيود تحمي التخزين. Migration لا تُطبّق على الإنتاج ضمن التمرين.

**External video candidate:** [Building With Django REST Framework (Overview)](https://realpython.com/videos/building-drf-overview/) (`candidate`, approval `proposed`). مرشح لعرض serializers وviews/ViewSets وURLs والصلاحيات في API قائم على Django. تصف الصفحة عينة شُغلت على Python 3.13 وDjango 5.1.2 وDRF 3.15.2؛ تحقق من الإصدارات الحالية.

**Resource evidence:** صفحة Real Python تذكر REST، serializers، Django views/ViewSets، URLs والصلاحيات؛ وتذكر إصدارات العينة 3.13/5.1.2/3.15.2. الملاءمة مباشرة لمخرجات الموضوع. لم يُختبر التشغيل أو captions أو الوصولية، ومراجعة المالك غير موجودة. [Publisher/source page](https://realpython.com/videos/building-drf-overview/).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## `fastapi-backend`

**Inputs and lesson walk-through:** FastAPI خيار مستقل → مثال محلول: schema مقابل ORM → برومبت ومخرج. يستخدم مخرجات Python/PostgreSQL/API من الموضوعات 38–40 قبل إنشاء ORM؛ FastAPI وDjango مساران بديلان. Steps:
  - استخدم `docs/BACKEND_FRAMEWORK_DECISION.md` إن وُجد؛ إن غاب أو بقي الاختيار مفتوحاً، احسمه هنا أو دوّن السؤال نفسه بلا جعل الملف شرطاً للدراسة. إذا كان FastAPI مختاراً، أنشئ request وresponse منفصلين عن ORM واختبر قيمة غير صالحة؛ عند اختيار Django فسجل هذه الخطوة `Not Applicable`، وعند عدم الحسم اكتب `Not Run`. → `في فرع FastAPI: مخططان يوضحان حقول الإدخال والمخرج؛ لا يتسرب internal field. في فرع Django: Not Applicable، واستخدم django-models من الموضوع 41. عند عدم الحسم: السؤال مسجل وNot Run.`
  - إذا كان FastAPI هو الإطار المختار، حدد دورة session عبر dependency؛ استخدم async فقط مع driver مناسب. إذا اختير Django فسجل الخطوة `Not Applicable`، وإذا ظل الاختيار غير محسوم فسجلها `Not Run`. → `في فرع FastAPI: اختبار/مخطط يوضح فتح الجلسة وإغلاقها لكل طلب. في فرع Django: Not Applicable. عند عدم الحسم: Not Run.`
  - إذا كان FastAPI هو الإطار المختار، اربط metadata وولّد migration تجريبية وافحص upgrade/downgrade على dev. إذا اختير Django فسجل الخطوة `Not Applicable`، وإذا ظل الاختيار غير محسوم فسجلها `Not Run`. → `في فرع FastAPI: رأس Alembic ونتيجة تطبيق على dev؛ الإنتاج لم يتغير. في فرع Django: Not Applicable، واستخدم django-migration من الموضوع 41. عند عدم الحسم: Not Run.`

**Illustrative sample output (worked example `fastapi-schema-example`):** إنشاء عنصر — العميل يحتاج id/name ولا يحتاج internal_note.

```text
CreateItemRequest → SQLAlchemy Item → ItemResponse(id,name).
```

**Handoff:** برومبت: «راجع فصل schema/ORM وربط Alembic metadata. اعرض migration وفرق الترقية والتراجع، ولا تطبقها حتى تفحص dev». الناتج يهيئ auth الموحد.

**Objective quiz:** v1; stable question IDs `fastapi-backend-request-schema-validation`, `fastapi-backend-migration-generated-diff-review`.
  - `fastapi-backend-request-schema-validation` (fastapi-backend-objective-1): أين تتحقق من طول اسم يصل في الطلب؟ — مفتاح fastapi-backend-request-schema-validation-a; التعليل: تحقق المدخل يحدث عند حد API قبل تمرير القيمة للمنطق.
  - `fastapi-backend-migration-generated-diff-review` (fastapi-backend-objective-2): ماذا تفحص في migration مولدة؟ — مفتاح fastapi-backend-migration-generated-diff-review-a; التعليل: التوليد الآلي مسودة تحتاج مراجعة واختباراً.

**Practical assessment:** scale `fastapi-backend-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `api-schemas`: مخططات request/response مفصولة عن ORM.
  - `alembic-record`: migration ومراجعة الجلسة والترحيل في dev.

Criteria:
  - `fastapi-backend-schema-boundary` → `api-schemas`: حد البيانات. الطلب والمخرج لا يكشفان حقول التخزين غير العامة. دليل المراجعة: اعرض حقلاً يُرفض وآخر لا يخرج للعميل.
  - `fastapi-backend-migration-context` → `alembic-record`: سياق الترحيل. النتيجة مرتبطة ببيئة وتفحص downgrade. دليل المراجعة: أرفق الفرق ورأس Alembic وبيئة التجربة.

**Author finding:** راجع المؤلف فصل schemas/ORM وضرورة توافق async driver. ملف migration المولد لا يعد دليلاً على صحة التغيير قبل مراجعته.

**External video candidate:** [Python REST APIs With FastAPI](https://realpython.com/courses/python-rest-apis-with-fastapi/) (`candidate`, approval `proposed`). مرشح لدروس path parameters وPydantic وGET/POST/PUT/DELETE والاختبار/التوثيق؛ صفحة Real Python تسرد 12 درساً و3 تمارين عملية.

**Resource evidence:** فهرس دورة Real Python يسرد درساً مرئياً لـ FastAPI وطلبات CRUD وPydantic validation وSwagger/HTTPie وتمارين. صلة عملية بواجهة API؛ الاستضافة/التشغيل الآمن تحتاج مواد أخرى. playback/captions/accessibility وقبول المالك لم تُفحص. [Publisher/source page](https://realpython.com/courses/python-rest-apis-with-fastapi/).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## `auth-permissions`

**Inputs and lesson walk-through:** المتطلب مصدر الإذن → مثال محلول: تعديل سجل → برومبت ومخرج أمني. يستخدم `api-contract` و`api-layers` من الموضوع 40، مع `django-models` و`django-migration` من 41 أو `api-schemas` و`alembic-record` من 42 بحسب المسار المختار. وتستهلك الموضوعات 44 و45 و54 زوج المخرجات المختار؛ لا تجمع بين بدائل Django وFastAPI. Steps:
  - اربط كل endpoint بدور وشرط ملكية ونتيجة رفض من متطلبات المشروع. → `docs/AUTH_PERMISSIONS_SPEC.md يحدد route/role/owner/action ومراجع SRS.`
  - نفذ فحص هوية ثم تفويض على الخادم وفق الإطار المختار. → `endpoint يرفض العملية عند غياب الصلاحية؛ الواجهة ليست الحارس الوحيد.`
  - اكتب اختبار مجهول/مسجل بلا دور/مسموح وسجل HTTP status. → `نتائج تطابق العقد ولا تطبع اعتماداً أو سراً.`

**Illustrative sample output (worked example `owner-check`):** رفض تعديل غير مملوك — مستخدم مسجل يحاول تعديل سجل مستخدم آخر.

```text
identity=valid; actor=user-3; owner=user-8; action=denied by server. قرار 403/404 يتبع العقد.
```

**Handoff:** برومبت: «اشتق مصفوفة permission من SRS. اختبر anonymous وrole-missing وowner. لا تطبع token أو كلمة مرور». مخرجا `permission-matrix` و`auth-tests` يحددان حدود الخدمة في الموضوع 44، ومدخلات التكامل في 45.

**Objective quiz:** v1; stable question IDs `auth-permissions-authenticated-identity-vs-authorization`, `auth-permissions-server-enforced-ownership`.
  - `auth-permissions-authenticated-identity-vs-authorization` (auth-permissions-objective-1): ما الفرق بين المصادقة والتفويض؟ — مفتاح auth-permissions-authenticated-identity-vs-authorization-a; التعليل: هما قراران مختلفان يجب أن يحمي الثاني كل endpoint.
  - `auth-permissions-server-enforced-ownership` (auth-permissions-objective-2): كيف تثبت أن مالكاً آخر لا يستطيع تعديل المورد؟ — مفتاح auth-permissions-server-enforced-ownership-b; التعليل: اختبار الخادم يتحقق من الحماية عند الحد الحقيقي.

**Practical assessment:** scale `auth-permissions-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `permission-matrix`: مصفوفة دور/ملكية/إجراء مستندة إلى SRS.
  - `auth-tests`: نتائج رفض المجهول وغير المصرح والسماح.

Criteria:
  - `auth-permissions-role-source` → `permission-matrix`: مصدر الصلاحية. السماح والرفض يتبعان SRS أو سؤالاً مفتوحاً. دليل المراجعة: أشر إلى متطلب الدور والroute.
  - `auth-permissions-server-check` → `auth-tests`: فحص الخادم. الاختبار يستدعي endpoint ويتحقق من النتيجة. دليل المراجعة: أرفق الحالات وHTTP status الفعلي.

**Author finding:** راجع المؤلف الفرق بين الهوية والتفويض واختبار الملكية عبر API. لا تفرض أدوار BorrowHub أو تخزين token بعينه.

**External video candidate:** [REST Easy — API Security Done Right](https://www.djangotv.com/videos/djangocon-us/2015/djangocon-us-2015-rest-easy-api-security-done-right-by-jeff-schenck/) (`candidate`, approval `proposed`). مرشح لمقارنة المصادقة والتفويض وفحوص endpoint/object/field/HTTP method، بما فيها حدود الملكية على الاستعلامات. المحتوى في DRF (2015)، لذا يجب مطابقته مع نسخة المشروع الحالية.

**Resource evidence:** صفحة DjangoTV تصف الفيديو حول مصفوفات authentication/authorization وأذونات endpoint وobject وfield وHTTP method، مع مثال قيود قائمة على مالك المورد. المورد قديم؛ يراجع فقط الأفكار ويُطابق مع DRF الحالي. لم يُختبر playback/captions/accessibility ولا موافقة المالك. [Publisher/source page](https://www.djangotv.com/videos/djangocon-us/2015/djangocon-us-2015-rest-easy-api-security-done-right-by-jeff-schenck/).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## `services-selectors`

**Inputs and lesson walk-through:** وزع المسؤولية → مثال محلول: حجز مورد → برومبت ومخرج. يستخدم `api-contract` و`api-layers` من 40، ومخرجات مسار Django/FastAPI المختار من 41/42، و`permission-matrix` و`auth-tests` من 43 عند تصميم الخدمة وحد المعاملة. Steps:
  - اختر قراءة وكتابة وارسم مسؤولية endpoint/service/selector. → `مخطط يوضح أن selector read-only وأن service تملك حد transaction.`
  - حدد invariant من وثيقة المشروع واكتب اختباراً يعيد إنتاج التعارض. → `اختبار يثبت أن المحاولات لا تنتج حالة ممنوعة وأن الفشل يسبب rollback.`
  - سجل عدد الاستعلامات قبل التحسين ثم قارن بعده إذا ظهر دليل N+1. → `قبل/بعد أو Not Run؛ لا يذكر رقماً غير مقاس.`

**Illustrative sample output (worked example `atomic-request`):** طلب ذري — قاعدة مشروع تسمح بحجز مورد متاح مرة واحدة.

```text
authenticate → authorize ownership/action without disclosing availability → begin transaction → lock authorized row → re-check authorization and race-sensitive availability → create → commit; conflict/denial → rollback and policy-consistent response. selector يقرأ القائمة دون كتابة.
```

**Handoff:** برومبت: «استخرج قاعدة الكتابة من PRD. اقترح service وselector، واختبر التنافس وقس query count قبل/بعد. لا تعمم قاعدة BorrowHub». الناتج يهيئ تكامل الواجهة.

**Objective quiz:** v1; stable question IDs `services-selectors-selector-read-side-effects`, `services-selectors-service-invariant-ownership`.
  - `services-selectors-selector-read-side-effects` (services-selectors-objective-1): ما الطبقة المناسبة لقراءة قائمة لا تغير البيانات؟ — مفتاح services-selectors-selector-read-side-effects-a; التعليل: selector يعزل القراءة ويبقى بلا أثر جانبي.
  - `services-selectors-service-invariant-ownership` (services-selectors-objective-2): لماذا قيد أو قفل قاعدة مهم للحجز؟ — مفتاح services-selectors-service-invariant-ownership-b; التعليل: الذرية تحمي سلامة الحالة؛ لا تضمن أداءً أفضل لكل الاستعلامات.

**Practical assessment:** scale `services-selectors-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `service-map`: خريطة طبقات الكتابة والقراءة وحد transaction.
  - `invariant-evidence`: اختبار تنافس وقياس استعلامات حسب البيئة.

Criteria:
  - `services-selectors-tx-boundary` → `service-map`: حد المعاملة. الترتيب يوضح الفشل والكتابة والrollback. دليل المراجعة: أشر إلى بداية transaction وما يحدث عند التعارض.
  - `services-selectors-measured-rule` → `invariant-evidence`: دليل المقارنة. القياس والاختبار مرتبطان بقاعدة ومصدر معلنين. دليل المراجعة: أرفق القاعدة والنتيجة أو وسم Not Run.

**Author finding:** راجع المؤلف الفرق بين service/selector/controller وكلفة تحسين القراءة. مثال التنافس تابع لمتطلبات المشروع وليس مفروضاً من BorrowHub.

**External video candidate:** [Service Layer — Ultimate Guide to FastAPI and Backend Development](https://www.oreilly.com/videos/ultimate-guide-to/9781806101337/) (`candidate`, approval `proposed`). مرشح لتمييز web layer عن service layer عبر فصل من 10:19 بحسب فهرس الناشر. يطبق المتعلم الفكرة فقط إذا دعمتها بنية المشروع، ولا يفترض أن طبقة إضافية مطلوبة دائماً.

**Resource evidence:** فهرس O’Reilly لفيديو FastAPI يعرض فصلاً باسم Service Layer (10m 19s) بين API Router وDependency Chaining، ما يطابق حدود الخدمة/القراءة. لا يثبت أن كل مشروع يحتاج هذا النمط؛ قد يتطلب اشتراكاً. التشغيل/captions/accessibility وقبول المالك لم تُراجع. [Publisher/source page](https://www.oreilly.com/videos/ultimate-guide-to/9781806101337/).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## Remaining acceptance conditions

- Keep each Topic in `review-ready`; no group-specific owner acceptance or improved status is recorded in this packet.
- DEC-70 v2 defers individual video approvals until a human checks fit with the actual lesson, playback, captions, accessibility, and user-facing unavailable/offline behavior. Keep every resource labeled as a candidate until that review is recorded.
- Exact-candidate browser journeys, persistence, RTL/LTR, keyboard/mobile, and integrated build checks belong to the root-coordinated release evidence; this packet does not claim them.
