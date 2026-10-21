# Issue #68: Cloud deployment — educational review evidence

**Recorded:** 2026-10-20

**Implementation:** original wave3 lessons plus the typed module in `src/data/learning/group-b-18-cloud-deployment.ts` for 3 canonical Topics.
**Independent educational review:** Passed (static) on 2026-10-20 for lesson sequences, worked examples, questions/keys/rationales, criterion-to-output links, practical outputs, and handoffs; topic-specific findings follow. Learner execution, media review, and browser journeys are outside this pass. Each record remains `review-ready` pending final group acceptance.
**Course-owner policies:** accepted on 2026-10-20 in issue #70: the template and 19-group membership; quiz scoring of 1 point correct and 0 for incorrect/unanswered, unlimited retries, feedback after submit, and retention of all attempts with question and policy versions; learner-reported levels not-yet/in-progress/ready-for-review with no mastery threshold or independent correctness claim; and the candidate-video checklist. These decisions do not approve an individual video or this complete group.
**Release status:** this group remains `review-ready` and is not marked improved. Human review of each candidate video and exact-candidate browser/integration evidence remain pending; final group-specific owner sign-off is not recorded.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; it does not claim learner execution. Owner policies are accepted in issue #70, while individual human video reviews, browser validation, and final group-specific acceptance remain pending.

## `vercel-frontend-deployment`

**Inputs and lesson walk-through:** جهّز مصدر النشر → مثال محلول: معاينة قبل الإنتاج → مهمة نشر محدودة. Steps:
  - وثق Git repo والفرع ومجلد المشروع وأداة الحزم ونسخ runtime من إعداد فعلي أو اكتب Not Run. → `docs/VERCEL_DEPLOYMENT.md جدول مصدر/إعداد/حالة؛ بلا تخمين إعداد تلقائي.`
  - في مشروع مخول، افتح preview وافحص route ثابتاً وديناميكياً وRTL من متصفح؛ وإلا اكتب خطوات الفحص. → `رابط معاينة وتاريخ ونتيجة لكل مسار، أو خطوات لم تنفذ مع السبب.`
  - صنف أسماء env إلى public/server-only وحدد خطة عكس إعداد أو العودة لإصدار سابق. → `قائمة أسماء بلا قيم، وحدود تراجع التطبيق، مع تمييز قاعدة البيانات.`

**Sample project output (worked example `vercel-preview-check`):** نتيجة معاينة صريحة — واجهة Next.js مرتبطة بمستودع اختبار.

```text
preview /items يعمل ويقرأ fixtures. تفاصيل route سجلت Passed في المتصفح؛ API حقيقي وقاعدة بيانات ونطاق production تبقى Not Run حتى توثق endpoints منفصلة.
```

**Handoff:** برومبت: «اقرأ إعدادات الحساب والمشروع والوثائق الحالية. لخّص branch/root/build/env domains والقيود، ثم اعط خطوات مراجعة preview. لا تنشر أو تغير إعداداً أو تكشف قيمة سرية». سلّم عنوان الواجهة ونتائجها إلى نشر Backend في الموضوع 54.

**Objective quiz:** v1; stable question IDs `vercel-frontend-deployment-public-vs-runtime-env`, `vercel-frontend-deployment-preview-scope`.
  - `vercel-frontend-deployment-public-vs-runtime-env` (vercel-frontend-deployment-objective-1): تحتاج الواجهة public URL لـ API بينما قاعدة البيانات لها كلمة سر. أي قيمة يمكن تضمينها في bundle؟ — مفتاح vercel-frontend-deployment-public-vs-runtime-env-a; التعليل: كل قيمة عامة تصل للمتصفح؛ الأسرار تبقى server-side وخارج bundle.
  - `vercel-frontend-deployment-preview-scope` (vercel-frontend-deployment-objective-2): preview للواجهة يعرض بيانات fixture. ماذا أثبت؟ — مفتاح vercel-frontend-deployment-preview-scope-a; التعليل: نجاح الواجهة لا يثبت خدمات منفصلة أو رحلة تكامل.

**Practical assessment:** scale `vercel-frontend-deployment-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `vercel-config-record`: سجل repo/build/runtime/env والنطاق مع مصادرها.
  - `vercel-preview-evidence`: نتيجة معاينة لمسارات الواجهة وخطة رجوع دون نشر غير مصرح.

Criteria:
  - `vercel-frontend-deployment-deploy-source` → `vercel-config-record`: تتبع الإعداد. كل قيمة إعداد تأتي من إعداد أو وثيقة فعلية وحالة غير المتحقق ظاهرة. دليل المراجعة: أرفق اسم الإعداد ومصدره دون أي قيمة سرية.
  - `vercel-frontend-deployment-preview-scope` → `vercel-preview-evidence`: حدود الدليل. المسارات المختبرة والبيئة ومصدر البيانات موثقة بدقة. دليل المراجعة: اذكر URL/version وroute وfixture/API وما لم يفحص.

**Author finding:** راجع المؤلف الفصل بين الواجهة والخادم وقيمة NEXT_PUBLIC. المثال يمنع استنتاج نشر API أو بيانات فعلية من preview واجهة.

**Independent educational review:** Passed (static): the lesson binds settings to the actual repo/build/runtime, separates preview from production and frontend evidence from API/DB evidence, and excludes secret values. `vercel-config-record` and `vercel-preview-evidence` feed a host comparison or runbook. No learner deployment was run.

**External video candidate:** [Account Setup — Vercel Foundations](https://vercel.com/academy/vercel-foundations/vercel-account-setup) (`candidate`, approval `proposed`). مرشح من درس ضمن سلسلة فيديوهات Vercel Foundations؛ يغطي ربط repo وإعداد environments/regions. استخدمه لتعلم واجهة المنصة بعد مراجعة إعدادات المشروع الفعلية دون نشر غير مصرح.

**Resource evidence:** صفحة Vercel Academy تصف Vercel Foundations كسلسلة فيديو 9 دروس وتذكر Account Setup لربط repo وإعداد البيئات. درس Account Setup ذو صلة بخطوات المشروع، لكن الفيديو/إتاحة الحساب/الإعدادات الخاصة لم تُفحص. لا playback/captions/accessibility أو owner approval. [Publisher/source page](https://vercel.com/academy/vercel-foundations).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `netlify-frontend-deployment`

**Inputs and lesson walk-through:** افهم نوع المشروع → مثال محلول: اختيار بديل مستضاف → مهمة مقارنة ومخرج. Steps:
  - افتح دليل Netlify لإطار المشروع وإصداره وسجل الميزات أو القيود ذات الصلة. → `docs/NETLIFY_DEPLOYMENT.md مصدر رسمي وتاريخ التحقق ومصفوفة حاجة/دعم/غير معلوم.`
  - سجل base directory وأمر البناء ومجلد الخرج من إعداد فعلي أو وسمها غير متحقق. → `قيم build تُقرأ من repo/settings لا من مثال عشوائي؛ مفاتيح env دون قيم.`
  - افحص preview وأهم مسار متى توفر صلاحية، وسجل واجهة وAPI كمكوّنين منفصلين. → `خطوات ونتيجة URL وتاريخ أو Not Run، مع بيان مصدر كل API مستخدم.`

**Sample project output (worked example `netlify-alternative-choice`):** اختيار Netlify بحدود معلنة — الفريق يحتاج preview لكل طلب تغيير ويستخدم إطاراً تدعمه وثائق المنصة.

```text
القرار يذكر framework/version ودليل الدعم، ثم يسجل رابط preview ومساراً واحداً بعد فحصه. API fixture موسوم محلياً؛ لا يعلن Backend منشوراً.
```

**Handoff:** برومبت: «قارن احتياج الواجهة بدليل Netlify الحالي والإعداد المعروض. اذكر framework/version وميزة لازمة وأي قيد مجهول، ثم جهز خطوات deploy preview. لا تضغط Deploy ولا تنسخ الأسرار». سلّم اختيار المضيف إلى استضافة API/قاعدة الموضوع 54.

**Objective quiz:** v1; stable question IDs `netlify-frontend-deployment-current-framework-support`, `netlify-frontend-deployment-preview-mock`.
  - `netlify-frontend-deployment-current-framework-support` (netlify-frontend-deployment-objective-1): تغير دعم framework بين مزودي الاستضافة وإصداراتهم. ما المصدر الأفضل للتحقق؟ — مفتاح netlify-frontend-deployment-current-framework-support-b; التعليل: الدعم يعتمد على الميزة والنسخة الحالية؛ المثال غير المطابق لا يكفي.
  - `netlify-frontend-deployment-preview-mock` (netlify-frontend-deployment-objective-2): نجح deploy preview لكن API يستخدم mock. ما الذي تسجله؟ — مفتاح netlify-frontend-deployment-preview-mock-a; التعليل: مخرج المعاينة يخص طبقة ومصدر البيانات اللذين جرى فحصهما.

**Practical assessment:** scale `netlify-frontend-deployment-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `netlify-compatibility-record`: توافق framework وإعداد البناء بمصدر وتاريخ.
  - `netlify-preview-report`: مسار preview ونتيجة فحصه وحدود API/env.

Criteria:
  - `netlify-frontend-deployment-current-support` → `netlify-compatibility-record`: دليل نسخة صالح. الدليل يطابق نسخة framework والميزة المطلوبة. دليل المراجعة: أرفق صفحة دعم ونسخة المشروع والميزة التي راجعتها.
  - `netlify-frontend-deployment-separated-services` → `netlify-preview-report`: فصل المكونات. يعرف التقرير UI وAPI/DB ومصدر بيانات المعاينة. دليل المراجعة: اختر طلباً واذكر أين انتهى ومن أين عادت البيانات.

**Author finding:** راجع المؤلف طبيعة Netlify كبديل نشر للواجهة وحساسية الدعم لإصدار framework. لا يلزم الجمع بين مزودي واجهة، وتكامل API يبقى مستقلاً.

**Independent educational review:** Passed (static): the lesson requires current framework/version support evidence and keeps preview, API and data source claims separate. `netlify-compatibility-record` and `netlify-preview-report` carry the source, date and unknowns forward. No learner deployment was run.

**External video candidate:** [5 ways to deploy a new Netlify site](https://developers.netlify.com/videos/five-ways-to-deploy-a-new-netlify-site/) (`candidate`, approval `proposed`). مرشح يعرض Netlify Drop وDeploy button وGit وCLI. يغطي طرق نشر عامة لا صلاحية Next.js/App Router الحالية؛ يجب مراجعة مصفوفة دعم framework والإصدار أولاً.

**Resource evidence:** صفحة Netlify Developers تعرض فيديو بخمس طرق نشر منها Git integration وCLI. تتناول إدارة deployment عامة فقط، ولا تسجل توافق Next.js الحالي أو features/runtime. التشغيل/captions/accessibility ومالك المقرر لم يراجعوه. [Publisher/source page](https://developers.netlify.com/videos/five-ways-to-deploy-a-new-netlify-site/).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## `backend-database-deployment`

**Inputs and lesson walk-through:** تخطيط نشر مرتبط بالأدلة السابقة → مثال محلول: ترحيل آمن → مهمة تخطيط ومخرج. مدخلات Topic 54 المسماة هي `pg-setup`/`pg-check` من 39، و`api-contract` من 40، ومخرجات المسار المختار (`django-models`/`django-migration` من 41 أو `api-schemas`/`alembic-record` من 42)، ونتيجة المضيف المختار من 52 أو 53. لا يصف التمرين إنشاء خدمة فعلية. Steps:
  - ارسم frontend → API → DB مع مالك الخدمة والشبكة ومصدر env لكل سهم. → `docs/BACKEND_DEPLOYMENT_PLAN.md يبين target لكل مكون أو خياراً غير محسوم.`
  - اكتب خطوة ترحيل staging وخطة تحقق وrollback/forward fix مناسبة لتوافق schema. → `خطة بأمر الإطار الفعلي الموثق؛ لا migration تنتج من المثال ولا وعد باستعادة غير مجربة.`
  - حدد health وauthentication وownership وDB checks ببيانات test وأوامر واضحة. → `جدول طلب/متوقع/فعلي/status؛ إذا لم تنفذ الخطوات كلها تبقى Not Run.`

**Sample project output (worked example `staging-deployment-map`):** خريطة staging — Django API منفصل وPostgreSQL يديرهما مزودان مختاران.

```text
frontend→https://api.staging.example (عنوان توضيحي)→private DB. الأسرار تأتي من manager وقت التشغيل. migration ونسخ القاعدة ما زالت Not Run؛ العنوان illustrative ولا يوصف كخدمة حقيقية.
```

**Handoff:** برومبت: «راجع الوثائق الرسمية لخدمات API وPostgreSQL المختارة. أنشئ مخططاً يبين الشبكة والسّر والنسخ والترحيل والفحص والرجوع. لا تنشئ خدمة ولا تنفذ migration إنتاجية». سلّم endpoints المخططة وحالة كل فحص إلى runbook مع فصل الموجود عن المخطط وغير المتحقق.

**Objective quiz:** v1; stable question IDs `backend-database-deployment-runtime-secret-configuration`, `backend-database-deployment-health-vs-database-check`.
  - `backend-database-deployment-runtime-secret-configuration` (backend-database-deployment-objective-1): أين تضع كلمة مرور PostgreSQL المستخدمة في production؟ — مفتاح backend-database-deployment-runtime-secret-configuration-b; التعليل: الأسرار تخص بيئة الخادم ولا تصل للمستودع أو المتصفح.
  - `backend-database-deployment-health-vs-database-check` (backend-database-deployment-objective-2): نجح health endpoint لكنه لا يتصل بقاعدة البيانات. ما الحالة؟ — مفتاح backend-database-deployment-health-vs-database-check-b; التعليل: كل فحص يثبت فقط ما شمله فعلاً.

**Practical assessment:** scale `backend-database-deployment-descriptive-scale` v1, completion rule `no-mastery-threshold`; the descriptive self-assessment policy is accepted by the course owner under issue #43 (per issue #70); final group sign-off remains pending. Outputs:
  - `backend-topology`: خريطة استضافة API وDB والشبكة والأسرار.
  - `backend-smoke-report`: نتائج migration/health/auth/DB أو قائمة Not Run مع سبب.

Criteria:
  - `backend-database-deployment-network-secrets` → `backend-topology`: خريطة آمنة. العلاقات ومسار secret محددان دون كشف القيم. دليل المراجعة: أشر إلى مصدر secret وإلى ما لا يتصل به browser.
  - `backend-database-deployment-smoke-scope` → `backend-smoke-report`: تغطية التقرير. يفصل health عن قاعدة حقيقية وترحيل ومصادقة. دليل المراجعة: اعرض check واحداً وبيئته وstatus ودليله.

**Author finding:** راجع المؤلف فصل API/DB عن الواجهة وسلامة migrations ومصدر الأسرار. المثال يصرح بوضوح أن hostname تجريبي وأن التحقق لم يحدث.

**Independent educational review:** Passed (static): the lesson separates frontend, API and PostgreSQL, keeps secrets server-side, scopes migration checks to staging, and distinguishes health from auth/ownership/DB checks. `backend-topology` and `backend-smoke-report` feed operations. The example hostname is illustrative; no service or migration was created.

**External video candidate:** [Deploy a FastAPI app to Render — Mastering REST APIs with FastAPI](https://www.oreilly.com/videos/mastering-rest-apis/9781835464694/) (`candidate`, approval `proposed`). مرشح من فصل فيديو بعنوان Deploy a FastAPI app to Render (6:09) وفصل منفصل لإضافة PostgreSQL مجانية (9:15). راجع عروض المنصة وحدود الخطط ونسخ الأدوات الحالية قبل إعداد مشروع حقيقي.

**Resource evidence:** فهرس O’Reilly يعرض فصل Deploy a FastAPI app to Render (6:09) وفصل Add a free PostgreSQL database to your FastAPI app (9:15). يغطي التطبيق والقاعدة، لكن الأسعار/الخطط والنسخ تتغير وربما يحتاج اشتراكاً. playback/captions/accessibility وموافقة المالك غير منفذة. [Publisher/source page](https://www.oreilly.com/videos/mastering-rest-apis/9781835464694/).

**Remaining gaps:** All external resources remain `candidate` under the accepted issue #70 deferral. Human review of playback, captions, accessibility, and fit with the current lesson is Not Run, as is the exact user-facing state when a candidate cannot be reached. Learner-project commands, deployments, migrations, restore drills, and browser journeys are not implied by these static examples. The final group-specific owner sign-off is not recorded; the group remains `review-ready` and is not announced as improved.

## Remaining group acceptance conditions

- The course owner accepted the template, 19-group membership, quiz-scoring policy, descriptive self-assessment policy, and candidate-video checklist in [owner decision package #70](owner-decision-package-70.md). Those policy decisions do not constitute approval of this complete group.
- Each linked external resource remains a candidate until a human reviews playback, captions, accessibility, and fit with its lesson. No video in this group is approved or reported as playback-tested.
- Learner project execution and exact-candidate browser checks for full-reader/preview, persistence, RTL/LTR, keyboard, mobile and relevant diagrams remain Not Run or are owned by the root-coordinated integration review.
- Keep every canonical Topic available. Do not mark this group improved until the remaining evidence is complete and the course owner records this group in the final sign-off list.
