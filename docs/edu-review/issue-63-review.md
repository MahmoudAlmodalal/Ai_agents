# Issue #63: Python, PostgreSQL, and API architecture — author review evidence

**Recorded:** 2026-10-20
**Implementation:** `src/data/learning/group-b-13-python-postgres-api.ts` supplies the draft for the 3 canonical Topics; the original reader lessons remain in the matching wave2/wave3 topic file.
**Educational review state:** authored lesson/question/rubric records remain `review-ready`. The independent static lesson-flow review below passed for the complete group; it does not claim execution of learner tasks.
**Course-owner decisions:** DEC-70 v2 accepted the 19-group membership and lesson template, quiz policy, and descriptive self-assessment policy on 2026-10-20. This is not group-specific release acceptance. The course owner deferred individual video approval until human review of lesson fit, playback, captions, and accessibility. Candidate videos remain `candidate` with `proposed` approval; those human checks are Not Run. No Topic is marked approved and this group is not announced as improved.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The broader output-to-input traceability review for Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). This packet adds an independent review of every owned Topic's inputs, all three authored practical steps and expected outputs, illustrative sample, and handoff. Learner execution and actual project outputs are Not Run; exact-candidate browser/accessibility journeys and per-video human review remain pending.

## Independent lesson-flow re-review

**Verdict:** Passed for authored lesson sequence and output/handoff coherence by static review on 2026-10-20. This verdict concerns the curriculum design only. The sample outputs below are illustrative examples checked for consistency; none was produced by running the learner project. Tool execution is Not Run.

| Topic | Independent walkthrough finding | Result |
|---|---|---|
| `python-backend-foundation` | 3/3 steps: version/venv, dependency record, and secret-free configuration; illustrative skeleton defers framework selection; handoff to PostgreSQL consumes environment and config outputs. | **Passed (static)**; learner execution **Not Run** |
| `postgresql-database-setup` | 3/3 steps: dev setup, least-privilege role, and connection-only `SELECT 1`; sample accurately says Not Run and defers migration until ORM/models exist; handoff to API architecture uses the setup/check record without implying schema verification. | **Passed (static)**; learner execution **Not Run** |
| `backend-architecture-api-contracts` | 3/3 steps: user journey, contract, and layer map; illustrative request/response is not a running API; handoff to Django/FastAPI preserves method, payload, error, auth, and requirement sources. | **Passed (static)**; learner execution **Not Run** |

## `python-backend-foundation`

**Inputs and lesson walk-through:** نسخة Python وحدود الإعداد → مثال مفاهيمي محايد للإطار → برومبت تأسيس وتسليم. يستقبل مخرجي الموضوع 37 `ui-slice` و`slice-evidence` لتحديد حاجة Backend؛ يؤجل هيكل Django/FastAPI حتى اختيار الإطار. Steps:
  - سجل إصدار Python وأنشئ venv محلية مستبعدة من Git. → `README يذكر النسخة والمسار؛ لا يدخل مجلد البيئة للمستودع.`
  - ثبت أقل التبعيات اللازمة واحفظ lockfile/إصدارات متوافقة. → `ملف تبعيات يعيد البيئة ونتيجة compileall أو فحص موثق.`
  - أنشئ إعداداً يفحص المتغيرات المطلوبة وقالباً بلا أسرار. → `.env.example أسماء فقط و.gitignore يستبعد .env.`

**Illustrative sample output (worked example `python-skeleton`):** خريطة تحضير محايدة للإطار — مشروع سيختار Django أو FastAPI لاحقاً.

```text
backend/README.md، وdocs/BACKEND_RESPONSIBILITIES.md لمسؤوليات config/domain/tests مفاهيمياً، و.env.example بأسماء متغيرات فقط. أجّل entry point وملفات إطار بعينه حتى الاختيار؛ لا يثبت هذا اتصال قاعدة بيانات.
```

**Handoff:** برومبت: «افحص نسخة Python وملفات المشروع، وجهز هيكلاً صغيراً وإعداداً يتحقق من المتغيرات. لا تعرض الأسرار ولا تختَر إطاراً خارج القرار». الناتج يهيئ PostgreSQL.

**Objective quiz:** v1; stable question IDs `python-backend-foundation-venv-vs-secret-storage`, `python-backend-foundation-runtime-input-validation-vs-type-hints`.
  - `python-backend-foundation-venv-vs-secret-storage` (python-backend-foundation-objective-1): ما فائدة venv؟ — مفتاح python-backend-foundation-venv-vs-secret-storage-a; التعليل: venv تعزل المكتبات؛ لا تخزن سراً ولا تنشر التطبيق.
  - `python-backend-foundation-runtime-input-validation-vs-type-hints` (python-backend-foundation-objective-2): دالة API تستقبل JSON خارجياً. ماذا يثبت type hint وحده؟ — مفتاح python-backend-foundation-runtime-input-validation-vs-type-hints-b; التعليل: type hints لا تفرض التحقق وقت التشغيل. استخدم تحققاً مناسباً عند حد الإدخال، واحفظ القيم السرية خارج Git كما يوضح قالب البيئة.

**Practical assessment:** scale `python-backend-foundation-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `python-env`: نسخة وهيكل وتبعيات موثقة.
  - `config-template`: قالب إعداد بلا قيم سرية وفحص أخطاء آمن.

Criteria:
  - `python-backend-foundation-reproducible` → `python-env`: إعادة البيئة. تبعيات ونسخة وأمر فحص موثقة دون ادعاء تجربة غير منجزة. دليل المراجعة: أرفق الأمر والنسخة ونتيجة الفحص.
  - `python-backend-foundation-secret-boundary` → `config-template`: حد الأسرار. القالب يخلو من قيم وملف الإعداد مستبعد. دليل المراجعة: أظهر أسماء المتغيرات وقاعدة التجاهل فقط.

**Author finding:** راجع المؤلف venv والتبعيات وحدود type hints مقابل تحقق الطلب. المخرج ينتقل إلى قاعدة تطوير دون كشف سر.

**External video candidate:** [Structuring a Python Application (Overview)](https://realpython.com/videos/structuring-python-application/) (`candidate`, approval `proposed`). مرشح لتقسيم مشروع Python إلى ملفات/حزم مع نظرة إلى تنظيم Django وFlask. لا يفرض هيكلاً واحداً؛ يستخدم المتعلم الهيكل الذي توافق عليه متطلبات المشروع.

**Resource evidence:** صفحة Real Python تسمي الفيديو وتذكر layouts لسكريبتات وحزم قابلة للتثبيت وتطبيقات ويب منها Flask وDjango. هذا يناسب بنية المجلدات والحدود، لا يغطي أسرار أو deployment. التشغيل/captions/accessibility ومراجعة المالك لم تُنفذ. [Publisher/source page](https://realpython.com/videos/structuring-python-application/).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## `postgresql-database-setup`

**Inputs and lesson walk-through:** حدد البيئة والاتصال → مثال محلول: سجل اتصال غير منفذ → برومبت ومخرج التسليم. يستقبل مخرجي الموضوع 38 `python-env` و`config-template`؛ يوثق هذا الموضوع استراتيجية migration ولا يطبقها قبل اختيار ORM. Steps:
  - وثق طريقة تشغيل قاعدة تطوير وإصدارها ومتطلبات الاتصال. → `docs/POSTGRES_SETUP.md يصف البيئة والمتغيرات بالاسم فقط.`
  - حدد دور تطبيق بالامتيازات اللازمة واترك الإدارة منفصلة. → `جدول دور/امتيازات بلا كلمة مرور محفوظة في Git.`
  - سجل حالة SELECT 1 على dev؛ هو فحص اتصال فقط ولا يثبت وجود المخطط أو مطابقته. لا تطبق migration قبل اختيار ORM. → `نتيجة SELECT 1 الفعلية أو Not Run؛ migration=Deferred حتى وجود ORM/models في الموضوع 41 أو 42.`

**Illustrative sample output (worked example `postgres-check`):** سجل اتصال — قاعدة تطوير لكيان Item وRequest.

```text
Environment=not-recorded; SELECT 1=Not Run; migration=Deferred until ORM/models are selected in topic 41 or 42. Production connectivity and restore drill=Not Run.
```

**Handoff:** برومبت: «طابق تهيئة PostgreSQL مع ERD، وافصل حساب الإدارة عن التطبيق. استخدم أسماء متغيرات دون قيم، وسجل أمر الفحص. لا تنفذ إسقاطاً أو ترحيلاً إنتاجياً». موضوع 39 يخرج `pg-setup` و`pg-check` إلى الموضوعات 40 و41 و42 و45 و54؛ موضوع 40 يراعي سياق قاعدة التطوير وينتج `api-contract` و`api-layers` لمساري 41/42 وللموضوع 43/44/45، كما يستخدم `api-contract` في تخطيط الموضوع 54.

**Objective quiz:** v1; stable question IDs `postgresql-database-setup-least-privilege-db-role`, `postgresql-database-setup-dev-connection-evidence`.
  - `postgresql-database-setup-least-privilege-db-role` (postgresql-database-setup-objective-1): أي حساب تستخدمه خدمة التطبيق عادة؟ — مفتاح postgresql-database-setup-least-privilege-db-role-b; التعليل: أقل صلاحية تحد أثر خطأ أو اختراق التطبيق.
  - `postgresql-database-setup-dev-connection-evidence` (postgresql-database-setup-objective-2): نجح SELECT 1 على جهازك. ماذا يثبت؟ — مفتاح postgresql-database-setup-dev-connection-evidence-b; التعليل: الفحص محدد ببيئته؛ الإنتاج والمخطط والاستعادة تحتاج أدلة مستقلة.

**Practical assessment:** scale `postgresql-database-setup-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `pg-setup`: خطوات وقالب اتصال تطويري بلا أسرار واستراتيجية ترحيل مؤجلة.
  - `pg-check`: نتيجة SELECT 1 ببيئة محددة أو Not Run؛ تطبيق migration ومراجعتها مؤجلان إلى ما بعد اختيار ORM/models.

Criteria:
  - `postgresql-database-setup-db-role` → `pg-setup`: حساب محدود. التوثيق يميز حساب التطبيق عن الإدارة. دليل المراجعة: أظهر اسم الدور ومستوى امتيازه دون سر.
  - `postgresql-database-setup-env-result` → `pg-check`: نتيجة محددة البيئة. النتيجة تسمي البيئة والفحوص التي لم تجر. دليل المراجعة: أرفق تاريخاً وبيئة وأمر الفحص وحالة restore.

**Author finding:** راجع المؤلف حدود SELECT 1، أقل الصلاحيات، وعدم تخزين السر. نجاح dev لا يثبت الإنتاج ولا الاستعادة.

**External video candidate:** [Create database using PgAdmin — English](https://spoken-tutorial.org/watch/RDBMS%2BPostgreSQL/Create%2Bdatabase%2Busing%2BPgAdmin/English/) (`candidate`, approval `proposed`). مرشح لإنشاء قاعدة محلية من pgAdmin مع شاهد مرئي على إعدادها. صفحة Spoken Tutorial تسمي المورد sample video؛ تحقق من إصدار PostgreSQL/pgAdmin الحالي قبل اتباع أي خطوات واجهة.

**Resource evidence:** صفحة Spoken Tutorial الرسمية تعرض عنوان Create database using PgAdmin — English وتصفه بأنه sample video، ضمن مسار PostgreSQL الذي يتضمن التثبيت. لا تثبت حداثة الواجهة أو إعدادات صلاحيات المشروع. لم يُختبر التشغيل أو captions أو الوصولية ولا موافقة المالك. [Publisher/source page](https://spoken-tutorial.org/watch/RDBMS%2BPostgreSQL/Create%2Bdatabase%2Busing%2BPgAdmin/English/).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## `backend-architecture-api-contracts`

**Inputs and lesson walk-through:** العقد يسبق route → مثال محلول: إنشاء مورد → برومبت ومخرج. Steps:
  - اختر رحلة واربط فعل المستخدم بالطلب والنتيجة التي تحتاجها الواجهة. → `جدول journey → endpoint → متطلب مصدر.`
  - اكتب عقد OpenAPI أو docs/API_CONTRACTS.md مع نجاح وفشل. → `العقد يوضح الحقول ورموز الحالات والتحقق والمصادقة إن لزمت.`
  - ارسم route/controller → service → persistence وسم ما لم ينفذ. → `مخطط طلب لا يخفي قواعد عمل داخل طبقة HTTP.`

**Illustrative worked example (`create-item-api`; not executed):** عقد إنشاء — عميل مصرح يضيف عنصراً إلى مشروعه، والحالات الفعلية يحددها عقد المشروع.

```text
Request {name, categoryId}; success 201 {id,name} only if the project contract specifies 201; validation uses the contract-defined status and body. التنفيذ الفعلي لاحق.
```

**Handoff:** برومبت: «استخرج endpoints من هذه الرحلة، واذكر method/path/request/response/errors/auth ومصدر كل قاعدة. أظهر التعارضات كأسئلة ولا تختر إطاراً». العقد يغذي اختيار Django أو FastAPI.

**Objective quiz:** v1; stable question IDs `backend-architecture-api-contracts-contract-fields-before-route`, `backend-architecture-api-contracts-borrowhub-optional-rule`.
  - `backend-architecture-api-contracts-contract-fields-before-route` (backend-architecture-api-contracts-objective-1): ما الذي يجعل عقد API قابلاً للتنفيذ؟ — مفتاح backend-architecture-api-contracts-contract-fields-before-route-b; التعليل: العقد يحدد الرسائل والنتائج التي يتفق عليها الطرفان.
  - `backend-architecture-api-contracts-borrowhub-optional-rule` (backend-architecture-api-contracts-objective-2): مثال BorrowHub يحدد سقفاً غير موجود في مشروعك. ماذا تفعل؟ — مفتاح backend-architecture-api-contracts-borrowhub-optional-rule-b; التعليل: BorrowHub اختياري؛ لا يصبح شرطاً للمشروع إلا إذا كان ضمن متطلباته المعتمدة.

**Practical assessment:** scale `backend-architecture-api-contracts-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `approved` under the course-owner decision in DEC-70 v2 (issue #43). Outputs:
  - `api-contract`: عقد endpoint مع النجاح والفشل ومراجع القواعد.
  - `api-layers`: مخطط مسؤوليات HTTP والخدمة والتخزين.

Criteria:
  - `backend-architecture-api-contracts-contract-shape` → `api-contract`: حقول وحالات. العقد يوضح الطلب والنجاح والخطأ والمصادقة المطلوبة. دليل المراجعة: أرفق endpoint وحقل ومصدر شرطه.
  - `backend-architecture-api-contracts-rule-source` → `api-layers`: مصدر قاعدة العمل. كل قاعدة موثقة أو موسومة كسؤال، لا مستنسخة من المثال. دليل المراجعة: اربط قاعدة بوثيقة أو بسجل قرار مفتوح.

**Author finding:** راجع المؤلف شكل العقد وفصل قواعد المشروع عن حالة BorrowHub. المخرج يمكن تمريره لأي من بديلَي الإطار.

**External video candidate:** [API Design and What’s new with Open API? (Google Cloud Next ’17)](https://www.openapis.org/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17) (`candidate`, approval `proposed`). مرشح لتقديم OpenAPI كبيانات تقنية محايدة للمورد واتجاهات تصميم API. المورد من 2017؛ يفيد كخلفية مفاهيمية فقط، وتُراجع صيغة OpenAPI الحالية قبل بناء العقد.

**Resource evidence:** صفحة OpenAPI Initiative الرسمية تسمي المورد فيديو وتشرح أنه عن OAS كبيانات REST التقنية المحايدة واتجاهات تصميم API (Google Cloud Next ’17). هذا مناسب لمبدأ contract-first مع قيد قدم النسخة. playback/captions/accessibility ومالك المقرر لم يراجعوه. [Publisher/source page](https://www.openapis.org/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17).

**Gaps:** per-video owner review remains deferred under DEC-70 v2 and awaits human review; playback, captions, accessibility, and user-facing unavailable/offline behavior are Not Run. No individual video approval or final availability is claimed.

## Remaining acceptance conditions

- Keep each Topic in `review-ready`; no group-specific owner acceptance or improved status is recorded in this packet.
- DEC-70 v2 defers individual video approvals until a human checks fit with the actual lesson, playback, captions, accessibility, and user-facing unavailable/offline behavior. Keep every resource labeled as a candidate until that review is recorded.
- Exact-candidate browser journeys, persistence, RTL/LTR, keyboard/mobile, and integrated build checks belong to the root-coordinated release evidence; this packet does not claim them.
