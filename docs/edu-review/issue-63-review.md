# Issue #63: Python, PostgreSQL, and API architecture — author review evidence

**Recorded:** 2026-10-20
**Implementation:** complete draft in `src/data/learning/group-b.ts` for the 3 canonical Topics.
**Educational author review:** lesson, question, and rubric records carry a specific Curriculum B author review. Each record remains `review-ready`.
**Release decision:** blocked pending course-owner template/scoring/rubric/video acceptance. No owner approval is recorded. Candidate videos are not approved; playback, captions, accessibility, and user-facing availability remain Not Run.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; learner tool execution, browser validation, video review, and course-owner decisions remain Not Run or pending.

## `python-backend-foundation`

**Inputs and lesson walk-through:** نسخة Python وحدود الإعداد → مثال مفاهيمي محايد للإطار → برومبت تأسيس وتسليم. يستقبل مخرجي الموضوع 37 `ui-slice` و`slice-evidence` لتحديد حاجة Backend؛ يؤجل هيكل Django/FastAPI حتى اختيار الإطار. Steps:
  - سجل إصدار Python وأنشئ venv محلية مستبعدة من Git. → `README يذكر النسخة والمسار؛ لا يدخل مجلد البيئة للمستودع.`
  - ثبت أقل التبعيات اللازمة واحفظ lockfile/إصدارات متوافقة. → `ملف تبعيات يعيد البيئة ونتيجة compileall أو فحص موثق.`
  - أنشئ إعداداً يفحص المتغيرات المطلوبة وقالباً بلا أسرار. → `.env.example أسماء فقط و.gitignore يستبعد .env.`

**Sample project output (worked example `python-skeleton`):** خريطة تحضير محايدة للإطار — مشروع سيختار Django أو FastAPI لاحقاً.

```text
backend/README.md، وdocs/BACKEND_RESPONSIBILITIES.md لمسؤوليات config/domain/tests مفاهيمياً، و.env.example بأسماء متغيرات فقط. أجّل entry point وملفات إطار بعينه حتى الاختيار؛ لا يثبت هذا اتصال قاعدة بيانات.
```

**Handoff:** برومبت: «افحص نسخة Python وملفات المشروع، وجهز هيكلاً صغيراً وإعداداً يتحقق من المتغيرات. لا تعرض الأسرار ولا تختَر إطاراً خارج القرار». الناتج يهيئ PostgreSQL.

**Objective quiz:** v1; stable question IDs `python-backend-foundation-venv-vs-secret-storage`, `python-backend-foundation-runtime-input-validation-vs-type-hints`.
  - `python-backend-foundation-venv-vs-secret-storage` (python-backend-foundation-objective-1): ما فائدة venv؟ — مفتاح python-backend-foundation-venv-vs-secret-storage-a; التعليل: venv تعزل المكتبات؛ لا تخزن سراً ولا تنشر التطبيق.
  - `python-backend-foundation-runtime-input-validation-vs-type-hints` (python-backend-foundation-objective-2): دالة API تستقبل JSON خارجياً. ماذا يثبت type hint وحده؟ — مفتاح python-backend-foundation-runtime-input-validation-vs-type-hints-b; التعليل: type hints لا تفرض التحقق وقت التشغيل. استخدم تحققاً مناسباً عند حد الإدخال، واحفظ القيم السرية خارج Git كما يوضح قالب البيئة.

**Practical assessment:** scale `python-backend-foundation-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `python-env`: نسخة وهيكل وتبعيات موثقة.
  - `config-template`: قالب إعداد بلا قيم سرية وفحص أخطاء آمن.

Criteria:
  - `python-backend-foundation-reproducible` → `python-env`: إعادة البيئة. تبعيات ونسخة وأمر فحص موثقة دون ادعاء تجربة غير منجزة. دليل المراجعة: أرفق الأمر والنسخة ونتيجة الفحص.
  - `python-backend-foundation-secret-boundary` → `config-template`: حد الأسرار. القالب يخلو من قيم وملف الإعداد مستبعد. دليل المراجعة: أظهر أسماء المتغيرات وقاعدة التجاهل فقط.

**Author finding:** راجع المؤلف venv والتبعيات وحدود type hints مقابل تحقق الطلب. المخرج ينتقل إلى قاعدة تطوير دون كشف سر.

**External video candidate:** [Structuring a Python Application (Overview)](https://realpython.com/videos/structuring-python-application/) (`candidate`, approval `proposed`). مرشح لتقسيم مشروع Python إلى ملفات/حزم مع نظرة إلى تنظيم Django وFlask. لا يفرض هيكلاً واحداً؛ يستخدم المتعلم الهيكل الذي توافق عليه متطلبات المشروع.

**Resource evidence:** صفحة Real Python تسمي الفيديو وتذكر layouts لسكريبتات وحزم قابلة للتثبيت وتطبيقات ويب منها Flask وDjango. هذا يناسب بنية المجلدات والحدود، لا يغطي أسرار أو deployment. التشغيل/captions/accessibility ومراجعة المالك لم تُنفذ. [Publisher/source page](https://realpython.com/videos/structuring-python-application/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `postgresql-database-setup`

**Inputs and lesson walk-through:** حدد البيئة والاتصال → مثال محلول: سجل اتصال غير منفذ → برومبت ومخرج التسليم. يستقبل مخرجي الموضوع 38 `python-env` و`config-template`؛ يوثق هذا الموضوع استراتيجية migration ولا يطبقها قبل اختيار ORM. Steps:
  - وثق طريقة تشغيل قاعدة تطوير وإصدارها ومتطلبات الاتصال. → `docs/POSTGRES_SETUP.md يصف البيئة والمتغيرات بالاسم فقط.`
  - حدد دور تطبيق بالامتيازات اللازمة واترك الإدارة منفصلة. → `جدول دور/امتيازات بلا كلمة مرور محفوظة في Git.`
  - سجل حالة SELECT 1 على dev وطابق حدود التخطيط مع التنفيذ دون تطبيق migration قبل اختيار ORM. → `نتيجة SELECT 1 الفعلية أو Not Run؛ migration=Deferred حتى وجود ORM/models في الموضوع 41 أو 42.`

**Sample project output (worked example `postgres-check`):** سجل اتصال — قاعدة تطوير لكيان Item وRequest.

```text
Environment=not-recorded; SELECT 1=Not Run; migration=Deferred until ORM/models are selected in topic 41 or 42. Production connectivity and restore drill=Not Run.
```

**Handoff:** برومبت: «طابق تهيئة PostgreSQL مع ERD، وافصل حساب الإدارة عن التطبيق. استخدم أسماء متغيرات دون قيم، وسجل أمر الفحص. لا تنفذ إسقاطاً أو ترحيلاً إنتاجياً». سلّم مخرجي `pg-setup` و`pg-check` إلى موضوع 40 كي يراعي عقد API سياق قاعدة التطوير؛ موضوع 40 هو الذي ينتج `api-contract` و`api-layers` لموضوع 41 أو 42.

**Objective quiz:** v1; stable question IDs `postgresql-database-setup-least-privilege-db-role`, `postgresql-database-setup-dev-connection-evidence`.
  - `postgresql-database-setup-least-privilege-db-role` (postgresql-database-setup-objective-1): أي حساب تستخدمه خدمة التطبيق عادة؟ — مفتاح postgresql-database-setup-least-privilege-db-role-b; التعليل: أقل صلاحية تحد أثر خطأ أو اختراق التطبيق.
  - `postgresql-database-setup-dev-connection-evidence` (postgresql-database-setup-objective-2): نجح SELECT 1 على جهازك. ماذا يثبت؟ — مفتاح postgresql-database-setup-dev-connection-evidence-b; التعليل: الفحص محدد ببيئته؛ الإنتاج والمخطط والاستعادة تحتاج أدلة مستقلة.

**Practical assessment:** scale `postgresql-database-setup-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `pg-setup`: خطوات وقالب اتصال تطويري بلا أسرار واستراتيجية ترحيل مؤجلة.
  - `pg-check`: نتيجة SELECT 1 ببيئة محددة أو Not Run؛ تطبيق migration ومراجعتها مؤجلان إلى ما بعد اختيار ORM/models.

Criteria:
  - `postgresql-database-setup-db-role` → `pg-setup`: حساب محدود. التوثيق يميز حساب التطبيق عن الإدارة. دليل المراجعة: أظهر اسم الدور ومستوى امتيازه دون سر.
  - `postgresql-database-setup-env-result` → `pg-check`: نتيجة محددة البيئة. النتيجة تسمي البيئة والفحوص التي لم تجر. دليل المراجعة: أرفق تاريخاً وبيئة وأمر الفحص وحالة restore.

**Author finding:** راجع المؤلف حدود SELECT 1، أقل الصلاحيات، وعدم تخزين السر. نجاح dev لا يثبت الإنتاج ولا الاستعادة.

**External video candidate:** [Create database using PgAdmin — English](https://spoken-tutorial.org/watch/RDBMS%2BPostgreSQL/Create%2Bdatabase%2Busing%2BPgAdmin/English/) (`candidate`, approval `proposed`). مرشح لإنشاء قاعدة محلية من pgAdmin مع شاهد مرئي على إعدادها. صفحة Spoken Tutorial تسمي المورد sample video؛ تحقق من إصدار PostgreSQL/pgAdmin الحالي قبل اتباع أي خطوات واجهة.

**Resource evidence:** صفحة Spoken Tutorial الرسمية تعرض عنوان Create database using PgAdmin — English وتصفه بأنه sample video، ضمن مسار PostgreSQL الذي يتضمن التثبيت. لا تثبت حداثة الواجهة أو إعدادات صلاحيات المشروع. لم يُختبر التشغيل أو captions أو الوصولية ولا موافقة المالك. [Publisher/source page](https://spoken-tutorial.org/watch/RDBMS%2BPostgreSQL/Create%2Bdatabase%2Busing%2BPgAdmin/English/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `backend-architecture-api-contracts`

**Inputs and lesson walk-through:** العقد يسبق route → مثال محلول: إنشاء مورد → برومبت ومخرج. Steps:
  - اختر رحلة واربط فعل المستخدم بالطلب والنتيجة التي تحتاجها الواجهة. → `جدول journey → endpoint → متطلب مصدر.`
  - اكتب عقد OpenAPI أو docs/API_CONTRACTS.md مع نجاح وفشل. → `العقد يوضح الحقول ورموز الحالات والتحقق والمصادقة إن لزمت.`
  - ارسم route/controller → service → persistence وسم ما لم ينفذ. → `مخطط طلب لا يخفي قواعد عمل داخل طبقة HTTP.`

**Sample project output (worked example `create-item-api`):** عقد إنشاء — عميل مصرح يضيف عنصراً إلى مشروعه.

```text
Request {name, categoryId}; success 201 {id,name}; validation 400 {code:"invalid_input"}. التنفيذ الفعلي لاحق.
```

**Handoff:** برومبت: «استخرج endpoints من هذه الرحلة، واذكر method/path/request/response/errors/auth ومصدر كل قاعدة. أظهر التعارضات كأسئلة ولا تختر إطاراً». العقد يغذي اختيار Django أو FastAPI.

**Objective quiz:** v1; stable question IDs `backend-architecture-api-contracts-contract-fields-before-route`, `backend-architecture-api-contracts-borrowhub-optional-rule`.
  - `backend-architecture-api-contracts-contract-fields-before-route` (backend-architecture-api-contracts-objective-1): ما الذي يجعل عقد API قابلاً للتنفيذ؟ — مفتاح backend-architecture-api-contracts-contract-fields-before-route-b; التعليل: العقد يحدد الرسائل والنتائج التي يتفق عليها الطرفان.
  - `backend-architecture-api-contracts-borrowhub-optional-rule` (backend-architecture-api-contracts-objective-2): مثال BorrowHub يحدد سقفاً غير موجود في مشروعك. ماذا تفعل؟ — مفتاح backend-architecture-api-contracts-borrowhub-optional-rule-b; التعليل: BorrowHub اختياري؛ لا يصبح شرطاً للمشروع إلا إذا كان ضمن متطلباته المعتمدة.

**Practical assessment:** scale `backend-architecture-api-contracts-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `api-contract`: عقد endpoint مع النجاح والفشل ومراجع القواعد.
  - `api-layers`: مخطط مسؤوليات HTTP والخدمة والتخزين.

Criteria:
  - `backend-architecture-api-contracts-contract-shape` → `api-contract`: حقول وحالات. العقد يوضح الطلب والنجاح والخطأ والمصادقة المطلوبة. دليل المراجعة: أرفق endpoint وحقل ومصدر شرطه.
  - `backend-architecture-api-contracts-rule-source` → `api-layers`: مصدر قاعدة العمل. كل قاعدة موثقة أو موسومة كسؤال، لا مستنسخة من المثال. دليل المراجعة: اربط قاعدة بوثيقة أو بسجل قرار مفتوح.

**Author finding:** راجع المؤلف شكل العقد وفصل قواعد المشروع عن حالة BorrowHub. المخرج يمكن تمريره لأي من بديلَي الإطار.

**External video candidate:** [API Design and What’s new with Open API? (Google Cloud Next ’17)](https://www.openapis.org/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17) (`candidate`, approval `proposed`). مرشح لتقديم OpenAPI كبيانات تقنية محايدة للمورد واتجاهات تصميم API. المورد من 2017؛ يفيد كخلفية مفاهيمية فقط، وتُراجع صيغة OpenAPI الحالية قبل بناء العقد.

**Resource evidence:** صفحة OpenAPI Initiative الرسمية تسمي المورد فيديو وتشرح أنه عن OAS كبيانات REST التقنية المحايدة واتجاهات تصميم API (Google Cloud Next ’17). هذا مناسب لمبدأ contract-first مع قيد قدم النسخة. playback/captions/accessibility ومالك المقرر لم يراجعوه. [Publisher/source page](https://www.openapis.org/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## Owner gates

- Approve or revise the first-group/template and this membership before any group is marked improved.
- Decide the proposed quiz scoring and descriptive rubric scale; all scoring/rubric policy approvals remain `proposed`.
- Review each candidate against the actual lesson, approve/reject each resource, and confirm captions/accessibility/playback before release. A publisher listing alone is not approval.
- Record course-owner acceptance for the complete group and the independent evidence required by the parent release issue.
- Browser journey, persisted history, RTL/LTR, keyboard/mobile, and integrated build checks remain for root-coordinated integration.
