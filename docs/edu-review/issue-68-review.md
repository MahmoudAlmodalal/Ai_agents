# Issue #68: Cloud deployment — author review evidence

**Recorded:** 2026-10-20
**Implementation:** complete draft in `src/data/learning/group-b.ts` for the 3 canonical Topics.
**Educational author review:** lesson, question, and rubric records carry a specific Curriculum B author review. Each record remains `review-ready`.
**Release decision:** blocked pending course-owner template/scoring/rubric/video acceptance. No owner approval is recorded. Candidate videos are not approved; playback, captions, accessibility, and user-facing availability remain Not Run.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

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

**Practical assessment:** scale `vercel-frontend-deployment-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `vercel-config-record`: سجل repo/build/runtime/env والنطاق مع مصادرها.
  - `vercel-preview-evidence`: نتيجة معاينة لمسارات الواجهة وخطة رجوع دون نشر غير مصرح.

Criteria:
  - `vercel-frontend-deployment-deploy-source` → `vercel-config-record`: تتبع الإعداد. كل قيمة إعداد تأتي من إعداد أو وثيقة فعلية وحالة غير المتحقق ظاهرة. دليل المراجعة: أرفق اسم الإعداد ومصدره دون أي قيمة سرية.
  - `vercel-frontend-deployment-preview-scope` → `vercel-preview-evidence`: حدود الدليل. المسارات المختبرة والبيئة ومصدر البيانات موثقة بدقة. دليل المراجعة: اذكر URL/version وroute وfixture/API وما لم يفحص.

**Author finding:** راجع المؤلف الفصل بين الواجهة والخادم وقيمة NEXT_PUBLIC. المثال يمنع استنتاج نشر API أو بيانات فعلية من preview واجهة.

**External video candidate:** [Account Setup — Vercel Foundations](https://vercel.com/academy/vercel-foundations/vercel-account-setup) (`candidate`, approval `proposed`). مرشح من درس ضمن سلسلة فيديوهات Vercel Foundations؛ يغطي ربط repo وإعداد environments/regions. استخدمه لتعلم واجهة المنصة بعد مراجعة إعدادات المشروع الفعلية دون نشر غير مصرح.

**Resource evidence:** صفحة Vercel Academy تصف Vercel Foundations كسلسلة فيديو 9 دروس وتذكر Account Setup لربط repo وإعداد البيئات. درس Account Setup ذو صلة بخطوات المشروع، لكن الفيديو/إتاحة الحساب/الإعدادات الخاصة لم تُفحص. لا playback/captions/accessibility أو owner approval. [Publisher/source page](https://vercel.com/academy/vercel-foundations).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

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

**Practical assessment:** scale `netlify-frontend-deployment-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `netlify-compatibility-record`: توافق framework وإعداد البناء بمصدر وتاريخ.
  - `netlify-preview-report`: مسار preview ونتيجة فحصه وحدود API/env.

Criteria:
  - `netlify-frontend-deployment-current-support` → `netlify-compatibility-record`: دليل نسخة صالح. الدليل يطابق نسخة framework والميزة المطلوبة. دليل المراجعة: أرفق صفحة دعم ونسخة المشروع والميزة التي راجعتها.
  - `netlify-frontend-deployment-separated-services` → `netlify-preview-report`: فصل المكونات. يعرف التقرير UI وAPI/DB ومصدر بيانات المعاينة. دليل المراجعة: اختر طلباً واذكر أين انتهى ومن أين عادت البيانات.

**Author finding:** راجع المؤلف طبيعة Netlify كبديل نشر للواجهة وحساسية الدعم لإصدار framework. لا يلزم الجمع بين مزودي واجهة، وتكامل API يبقى مستقلاً.

**External video candidate:** [5 ways to deploy a new Netlify site](https://developers.netlify.com/videos/five-ways-to-deploy-a-new-netlify-site/) (`candidate`, approval `proposed`). مرشح يعرض Netlify Drop وDeploy button وGit وCLI. يغطي طرق نشر عامة لا صلاحية Next.js/App Router الحالية؛ يجب مراجعة مصفوفة دعم framework والإصدار أولاً.

**Resource evidence:** صفحة Netlify Developers تعرض فيديو بخمس طرق نشر منها Git integration وCLI. تتناول إدارة deployment عامة فقط، ولا تسجل توافق Next.js الحالي أو features/runtime. التشغيل/captions/accessibility ومالك المقرر لم يراجعوه. [Publisher/source page](https://developers.netlify.com/videos/five-ways-to-deploy-a-new-netlify-site/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `backend-database-deployment`

**Inputs and lesson walk-through:** اربط عناصر النشر بالعقد → مثال محلول: ترحيل آمن → مهمة نشر ومخرج. Steps:
  - ارسم frontend → API → DB مع مالك الخدمة والشبكة ومصدر env لكل سهم. → `docs/BACKEND_DEPLOYMENT_PLAN.md يبين target لكل مكون أو خياراً غير محسوم.`
  - اكتب خطوة ترحيل staging وخطة تحقق وrollback/forward fix مناسبة لتوافق schema. → `خطة بأمر الإطار الفعلي الموثق؛ لا migration تنتج من المثال ولا وعد باستعادة غير مجربة.`
  - حدد health وauthentication وownership وDB checks ببيانات test وأوامر واضحة. → `جدول طلب/متوقع/فعلي/status؛ إذا لم تنفذ الخطوات كلها تبقى Not Run.`

**Sample project output (worked example `staging-deployment-map`):** خريطة staging — Django API منفصل وPostgreSQL يديرهما مزودان مختاران.

```text
frontend→https://api.staging.example (عنوان توضيحي)→private DB. الأسرار تأتي من manager وقت التشغيل. migration ونسخ القاعدة ما زالت Not Run؛ العنوان illustrative ولا يوصف كخدمة حقيقية.
```

**Handoff:** برومبت: «راجع الوثائق الرسمية لخدمات API وPostgreSQL المختارة. أنشئ مخططاً يبين الشبكة والسّر والنسخ والترحيل والفحص والرجوع. لا تنشئ خدمة ولا تنفذ migration إنتاجية». سلّم الـ endpoints ونتيجة الرحلة إلى runbook.

**Objective quiz:** v1; stable question IDs `backend-database-deployment-runtime-secret-configuration`, `backend-database-deployment-health-vs-database-check`.
  - `backend-database-deployment-runtime-secret-configuration` (backend-database-deployment-objective-1): أين تضع كلمة مرور PostgreSQL المستخدمة في production؟ — مفتاح backend-database-deployment-runtime-secret-configuration-b; التعليل: الأسرار تخص بيئة الخادم ولا تصل للمستودع أو المتصفح.
  - `backend-database-deployment-health-vs-database-check` (backend-database-deployment-objective-2): نجح health endpoint لكنه لا يتصل بقاعدة البيانات. ما الحالة؟ — مفتاح backend-database-deployment-health-vs-database-check-b; التعليل: كل فحص يثبت فقط ما شمله فعلاً.

**Practical assessment:** scale `backend-database-deployment-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `backend-topology`: خريطة استضافة API وDB والشبكة والأسرار.
  - `backend-smoke-report`: نتائج migration/health/auth/DB أو قائمة Not Run مع سبب.

Criteria:
  - `backend-database-deployment-network-secrets` → `backend-topology`: خريطة آمنة. العلاقات ومسار secret محددان دون كشف القيم. دليل المراجعة: أشر إلى مصدر secret وإلى ما لا يتصل به browser.
  - `backend-database-deployment-smoke-scope` → `backend-smoke-report`: تغطية التقرير. يفصل health عن قاعدة حقيقية وترحيل ومصادقة. دليل المراجعة: اعرض check واحداً وبيئته وstatus ودليله.

**Author finding:** راجع المؤلف فصل API/DB عن الواجهة وسلامة migrations ومصدر الأسرار. المثال يصرح بوضوح أن hostname تجريبي وأن التحقق لم يحدث.

**External video candidate:** [Deploy a FastAPI app to Render — Mastering REST APIs with FastAPI](https://www.oreilly.com/videos/mastering-rest-apis/9781835464694/) (`candidate`, approval `proposed`). مرشح من فصل فيديو بعنوان Deploy a FastAPI app to Render (6:09) وفصل منفصل لإضافة PostgreSQL مجانية (9:15). راجع عروض المنصة وحدود الخطط ونسخ الأدوات الحالية قبل إعداد مشروع حقيقي.

**Resource evidence:** فهرس O’Reilly يعرض فصل Deploy a FastAPI app to Render (6:09) وفصل Add a free PostgreSQL database to your FastAPI app (9:15). يغطي التطبيق والقاعدة، لكن الأسعار/الخطط والنسخ تتغير وربما يحتاج اشتراكاً. playback/captions/accessibility وموافقة المالك غير منفذة. [Publisher/source page](https://www.oreilly.com/videos/mastering-rest-apis/9781835464694/).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## Owner gates

- Approve or revise the first-group/template and this membership before any group is marked improved.
- Decide the proposed quiz scoring and descriptive rubric scale; all scoring/rubric policy approvals remain `proposed`.
- Review each candidate against the actual lesson, approve/reject each resource, and confirm captions/accessibility/playback before release. A publisher listing alone is not approval.
- Record course-owner acceptance for the complete group and the independent evidence required by the parent release issue.
- Browser journey, persisted history, RTL/LTR, keyboard/mobile, and integrated build checks remain for root-coordinated integration.
