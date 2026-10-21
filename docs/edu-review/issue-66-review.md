# Issue #66: Database performance, Redis, and QA — educational review evidence

**Recorded:** 2026-10-20

**Implementation:** original wave3 lessons plus the typed module in `src/data/learning/group-b-16-performance-redis-qa.ts` for 3 canonical Topics.
**Independent educational review:** Passed (static) on 2026-10-20 for lesson sequences, worked examples, questions/keys/rationales, criterion-to-output links, practical outputs, and handoffs; topic-specific findings follow. Learner execution, media review, and browser journeys are outside this pass. Each record remains `review-ready` pending final group acceptance.
**Course-owner policies:** accepted on 2026-10-20 in issue #70: the template and 19-group membership; quiz scoring of 1 point correct and 0 for incorrect/unanswered, unlimited retries, feedback after submit, and retention of all attempts with question and policy versions; learner-reported levels not-yet/in-progress/ready-for-review with no mastery threshold or independent correctness claim; and the candidate-video checklist. These decisions do not approve an individual video or this complete group.
**Release status:** this group remains `review-ready` and is not marked improved. Human review of each candidate video and exact-candidate browser/integration evidence remain pending; final group-specific owner sign-off is not recorded.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; it does not claim learner execution. Owner policies are accepted in issue #70, while individual human video reviews, browser validation, and final group-specific acceptance remain pending.

## `database-performance-engineering`

**Inputs and lesson walk-through:** قِس قبل التعديل → مثال محلول: فلترة حسب الحالة → برومبت مقارنة. Steps:
  - حدد استعلام رحلة المستخدم وسجل مصدره وبيئته وزمنه وحجم البيانات. → `docs/DB_PERFORMANCE_BASELINE.md بخطة أو مقياس فعلي.`
  - جرّب تحسينا واحداً في test وقارن الخطة والزمن والصفوف. → `جدول قبل/بعد مع كلفة الكتابة والتخزين؛ القياس غير المنفذ Not Run.`
  - وثق سبب اعتماد/رفض التغيير وmigration إن لزم. → `قرار مرتبط بقياس دون تعديل قاعدة إنتاج.`

**Sample project output (worked example `query-plan-record`):** خطة قراءة — استعلام dev يفلتر status ويرتب created_at.

```text
تسجل environment=test وحجم العلاقة والخطة. يمكن إبقاء sequential scan إذا الجدول صغير؛ لا يدعى فرق أداء قبل إعادة القياس.
```

**Handoff:** برومبت: «اجمع query والخطة والحجم من test، اقترح تغييراً واحداً وقارن قبل/بعد. لا تنفذ كتابة ولا تعلن تحسناً من الخطة وحدها». سلّم القياس إلى قرار Redis.

**Objective quiz:** v1; stable question IDs `database-performance-engineering-measure-before-index`, `database-performance-engineering-plan-vs-latency-evidence`.
  - `database-performance-engineering-measure-before-index` (database-performance-engineering-objective-1): ما الذي يسبق إنشاء فهرس؟ — مفتاح database-performance-engineering-measure-before-index-a; التعليل: القياس يحدد المشكلة والفهرس له كلفة.
  - `database-performance-engineering-plan-vs-latency-evidence` (database-performance-engineering-objective-2): Index Scan في plan يثبت ماذا؟ — مفتاح database-performance-engineering-plan-vs-latency-evidence-b; التعليل: نوع الخطة وحده لا يثبت زمن المستخدم أو تحسناً.

**Practical assessment:** scale `database-performance-engineering-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `db-baseline`: Query وخطة/زمن وبيئة وحجم بيانات.
  - `db-change`: مقارنة وقرار index مع كلفته.

Criteria:
  - `database-performance-engineering-measurement-context` → `db-baseline`: سياق القياس. الاستعلام والبيئة والبيانات واضحة والفحص آمن. دليل المراجعة: أرفق اسم query وبيئة وتاريخ القياس.
  - `database-performance-engineering-tradeoff` → `db-change`: مفاضلة موثقة. القرار يقارن نتيجة وكلفة ولا يفترض التحسن. دليل المراجعة: أرفق خطة قبل/بعد أو صرح بأن المقارنة لم تجر.

**Author finding:** راجع المؤلف تحذير تنفيذ EXPLAIN ANALYZE وكلفة الفهرس. يقبل المثال عدم إضافة index عند غياب حاجة ويمنع ادعاء فرق غير مقاس.

**Independent educational review:** Passed (static): the lesson sequences a repeatable baseline, N+1 diagnosis, index tradeoffs and concurrency checks; sample context now matches its test environment. `contentVersion` is 2 for this corrected Topic so an older offline copy is refreshed; quiz, question, rubric, and scoring-policy versions stay at 1 because their text and semantics did not change. `db-baseline` and `db-change` hand off evidence to the Redis decision. No learner measurement was executed.

**External video candidate:** [EXPLAIN: make it make sense — PGConf.EU 2025](https://www.postgresql.eu/events/pgconfeu2025/sessions/session/6795-explain-make-it-make-sense/) (`candidate`, approval `proposed`). مرشح لقراءة query plans وقياس الاستعلامات وتحديد ما إذا كان فهرس مناسباً؛ صفحة الجلسة تصف هذه المحاور وتربط تسجيل الجلسة.

**Resource evidence:** صفحة PGConf.EU 2025 تذكر صراحة تفسير query plans ومراقبة ما تبحث عنه قاعدة البيانات لاختيار indexes وإعادة كتابة anti-patterns، وتعرض Watch Session on YouTube. مصدر حديث ومباشر؛ لا يثبت تحسناً على مشروع متعلم. playback/captions/accessibility أو موافقة المالك لم تُراجع. [Publisher/source page](https://www.postgresql.eu/events/pgconfeu2025/sessions/session/6795-explain-make-it-make-sense/).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `redis-optional-infrastructure`

**Inputs and lesson walk-through:** قرار مشروط → مثال محلول: cache-aside → برومبت قرار. Steps:
  - اكتب المشكلة والقياس والبدائل وكلفة Redis وسلوك النظام عند التعطل. → `docs/REDIS_DECISION.md يقرر adopt/defer/no وسبباً أو فجوة.`
  - إذا اعتمدته، حدد key غير شخصي وTTL وإبطالاً ومصدر الحقيقة. → `جدول key/value/TTL/invalidation/privacy؛ وإلا اكتب غير منطبق.`
  - اختبر hit/miss/stale/unavailable على test إذا شغلت الخدمة. → `نتيجة حقيقية أو Not Run؛ المصدر الأصلي معروف عند failure.`

**Sample project output (worked example `defer-redis`):** قرار تأجيل — قياس مشروع صغير لا يظهر bottleneck قراءة.

```text
Decision=defer. Keep DB query and remeasure with representative growth; no cache dependency or code added.
```

**Handoff:** برومبت: «استخدم القياس لتقرر هل يلزم Redis. قارن البدائل وكلفة التشغيل. إن أوصيت به فحدد key/TTL/invalidation/failure behavior واختبر stale data». قد يكون القرار تأجيله.

**Objective quiz:** v1; stable question IDs `redis-optional-infrastructure-cache-need-evidence`, `redis-optional-infrastructure-cache-invalidation-after-update`.
  - `redis-optional-infrastructure-cache-need-evidence` (redis-optional-infrastructure-objective-1): متى يكون عدم استخدام Redis معقولاً؟ — مفتاح redis-optional-infrastructure-cache-need-evidence-a; التعليل: التعقيد يحتاج سبباً؛ التأجيل قرار سليم عند غياب الحاجة.
  - `redis-optional-infrastructure-cache-invalidation-after-update` (redis-optional-infrastructure-objective-2): في نمط cache-aside، ما الذي يقلل stale بعد تعديل المصدر؟ — مفتاح redis-optional-infrastructure-cache-invalidation-after-update-a; التعليل: في نمط cache-aside تحدد قاعدة البيانات المعتمدة مصدر الكتابة؛ Redis هنا نسخة cache مؤقتة. تصاميم Redis الأخرى قد تختلف.

**Practical assessment:** scale `redis-optional-infrastructure-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `redis-decision`: قرار مبني على قياس لإضافة Redis أو تأجيله.
  - `cache-policy`: عقد key وTTL والإبطال والخصوصية عند اعتماده.

Criteria:
  - `redis-optional-infrastructure-choice-evidence` → `redis-decision`: سبب الاختيار. القرار مرتبط بقياس أو يحدد فجوة القياس وخطوتها. دليل المراجعة: أرفق baseline أو ما لم يجر وخطوة جمعه.
  - `redis-optional-infrastructure-consistency` → `cache-policy`: مصدر واتساق. في cache-aside يبقى مصدر الكتابة المرجعي محدداً وتوصف Redis كنسخة مؤقتة. دليل المراجعة: اعرض key غير حساس وTTL وسيناريو stale.

**Author finding:** راجع المؤلف اختيار Redis كخدمة cache اختيارية وأن تأجيلها مخرج صحيح. المثال محدد بنمط cache-aside؛ لا يعمم دور Redis على تصاميم تخزين أخرى.

**Independent educational review:** Passed (static): the lesson treats Redis as optional, distinguishes cache from background work, and requires a source of truth, TTL, invalidation, privacy and failure behavior. `redis-decision` and `cache-policy` feed QA. No Redis service or learner check was run.

**External video candidate:** [Cache modernization for speed & resiliency](https://redis.io/resources/videos/cache-modernization-for-speed-and-resiliency/) (`candidate`, approval `proposed`). مرشح لمناقشة دوافع cache ومخاطر الأداء ونضج البنية؛ صفحة Redis تذكر فيديو 25 دقيقة. عرضه مؤسسي ومرتبط بـ Redis 8؛ لا يُعامل كمتطلب أو شرح كافٍ لصلاحية/invalidation على تطبيق بسيط.

**Resource evidence:** صفحة Redis الرسمية تصف جلسة 25 دقيقة عن architectures للتخزين المؤقت وperformance risks و4-tier cache maturity وRedis 8. الملاءمة لقرار الحاجة جزئية؛ المحتوى المؤسسي لا يحسم invalidation في مشروع فردي. playback/captions/accessibility وموافقة المالك غير منفذة. [Publisher/source page](https://redis.io/resources/videos/cache-modernization-for-speed-and-resiliency/).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `integrated-project-qa`

**Inputs and lesson walk-through:** ابدأ بالمتطلب والمخاطر → مثال محلول: عزل بيانات → برومبت تقرير. Steps:
  - اربط كل متطلب حرج باختبار أو مراجعة ودليل. → `docs/QA_EVIDENCE.md يحوي requirement/test/evidence/status.`
  - نفذ الفحوص الملائمة على test ببيانات آمنة. → `نتائج بوقت وأمر وبيئة؛ ما لم ينفذ Not Run مع السبب.`
  - صنف الفجوات حسب أثرها واكتب المالك والخطوة. → `قائمة عيوب فيها إعادة إنتاج وقرار حجب إصدار إن لزم.`

**Sample project output (worked example `privacy-trace`):** تتبع خصوصية — متطلب عزل سجلات المستخدمين.

```text
REQ-PRIV-01 → API other-owner forbidden test; UI disclosure review remains Not Run. لا يعلن الإطلاق حتى تحسم الفجوة.
```

**Handoff:** برومبت: «راجع traceability matrix والنتائج. لا تحول Not Run إلى Passed. أضف خطوات الإعادة والبيئة والتاريخ وأثر الفشل». سلّم الفجوات إلى خيار التشغيل التالي.

**Objective quiz:** v1; stable question IDs `integrated-project-qa-build-vs-accessibility-evidence`, `integrated-project-qa-test-reproduction-context`.
  - `integrated-project-qa-build-vs-accessibility-evidence` (integrated-project-qa-objective-1): نجح build ولم يجر RTL أو keyboard. كيف تسجل؟ — مفتاح integrated-project-qa-build-vs-accessibility-evidence-b; التعليل: كل نتيجة تخص فحصاً منفذاً ولا تعمم نتيجة build.
  - `integrated-project-qa-test-reproduction-context` (integrated-project-qa-objective-2): ما الذي يجعل QA evidence قابلاً لإعادة الاستخدام؟ — مفتاح integrated-project-qa-test-reproduction-context-b; التعليل: السياق والخطوات يتيحان إعادة التجربة وتفسيرها.

**Practical assessment:** scale `integrated-project-qa-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `qa-matrix`: مصفوفة متطلبات وفحوص ونتائج قابلة للإعادة.
  - `qa-gaps`: فجوات وأثر ومالك وخطوة وحالة release.

Criteria:
  - `integrated-project-qa-traceability` → `qa-matrix`: تتبع الدليل. لكل مطلب فحص مناسب أو Not Run صريح. دليل المراجعة: أرفق مطلباً وبيئة وأمراً ونتيجة.
  - `integrated-project-qa-blocker` → `qa-gaps`: فجوة مملوكة. الفجوة لها أثر وخطوة ولا تختفي من بوابة الإصدار. دليل المراجعة: اعرض فجوة ومالكها وما يمنع حسمها.

**Author finding:** راجع المؤلف build مقابل accessibility وربط مطلب خصوصية بعدة أدلة. الحالات غير المنفذة تبقى واضحة.

**Independent educational review:** Passed (static): the lesson ties requirements to evidence and separates a build result from design, responsive, accessibility, privacy and integration checks. `qa-matrix` and `qa-gaps` hand off unresolved risks to deployment. No learner test run is claimed.

**External video candidate:** [Running tests with Playwright](https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/running-tests-with-playwright) (`candidate`, approval `proposed`). مرشح لتسجيل نتيجة اختبار قابلة للإعادة؛ صفحة Microsoft Learn تذكر headless/headed mode وفحص trace خطوة بخطوة. يلزم إضافة commit/البيئة/المتطلبات الخاصة بمشروع المتعلم.

**Resource evidence:** صفحة Microsoft Learn تسمي Episode 3 وتصف تشغيل Playwright headless/headed واستعمال trace لاستعراض تنفيذ الاختبار خطوة بخطوة. هذا يساند توثيق الدليل، لكنه لا يغطي RTL أو keyboard وحده. التشغيل/captions/accessibility وowner signoff لم تُنفذ. [Publisher/source page](https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/running-tests-with-playwright).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## Remaining group acceptance conditions

- The course owner accepted the template, 19-group membership, quiz-scoring policy, descriptive self-assessment policy, and candidate-video checklist in [owner decision package #70](owner-decision-package-70.md). Those policy decisions do not constitute approval of this complete group.
- Each linked external resource remains a candidate until a human reviews playback, captions, accessibility, and fit with its lesson. No video in this group is approved or reported as playback-tested.
- Learner project execution and exact-candidate browser checks for full-reader/preview, persistence, RTL/LTR, keyboard, mobile and relevant diagrams remain Not Run or are owned by the root-coordinated integration review.
- Keep every canonical Topic available. Do not mark this group improved until the remaining evidence is complete and the course owner records this group in the final sign-off list.
