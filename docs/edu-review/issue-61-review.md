# Issue #61: TypeScript, React, Tailwind, and Next.js — author review evidence

**Recorded:** 2026-10-20
**Implementation:** complete draft in `src/data/learning/group-b.ts` for the 4 canonical Topics.
**Educational author review:** lesson, question, and rubric records carry a specific Curriculum B author review. Each record remains `review-ready`.
**Release decision:** blocked pending course-owner template/scoring/rubric/video acceptance. No owner approval is recorded. Candidate videos are not approved; playback, captions, accessibility, and user-facing availability remain Not Run.

**Independent narrow assessment review:** root passed all 58 B question/key/rationale and artifact-bound criterion/output references on 2026-10-20; see [scope and limits](group-b-narrow-review-2026-10-20.md).

The original wave2/wave3 lessons remain in place. The typed module adds objectives, worked examples, practical project outputs, objective quizzes, self-assessment criteria, and a candidate resource for each Topic. BorrowHub stays optional and no Topic access gate was added.

The current output-to-input traceability review for all Topics 30–58 is recorded in [Curriculum B output-to-input traceability](group-b-handoff-audit-2026-10-20.md). It covers static artifact references only; learner tool execution, browser validation, video review, and course-owner decisions remain Not Run or pending.

## `typescript-types`

**Inputs and lesson walk-through:** ابدأ من البيانات المعتمدة → مثال محلول: حالة طلب → مهمة وبرومبت ومخرج. Steps:
  - أنشئ src/types/project.ts وعرّف كياناً وحالاته من ERD. → `Equipment له id/name وRequestStatus محصور بالقيم الموثقة؛ لا يوجد any أو status? بلا سبب.`
  - افصل فحص النوع الساكن عن اختبار JSON وقت التشغيل وسجل نتيجة كل واحد. → `إسناد TypeScript معلّم بقيمة status: "waiting" يفشل في tsc؛ JSON الخام لا يرفضه TypeScript ويحتاج schema validator مستقل. غير المنفذ يوسم Not Run.`
  - اربط كل نوع بمصدره وسجل الحقول غير المحسومة. → `docs/TYPESCRIPT_GUIDELINES.md يحوي مرجع ERD وأسئلة مفتوحة، بلا قواعد مخترعة.`

**Sample project output (worked example `request-union-example`):** عقد حالة طلب توضيحي من أربع حالات، وليس قائمة BorrowHub ذات الحالات الخمس ولا نتيجة فحص منفذ.

```text
type RequestStatus = 'draft' | 'submitted' | 'accepted' | 'cancelled';
interface Request { id: string; status: RequestStatus }
const sample: Request = { id: 'req-104', status: 'submitted' };
// Compile-time example: const invalid: RequestStatus = 'waiting'; // tsc error
// Raw JSON still needs a separately implemented runtime schema check.
```

**Handoff:** برومبت: «اشتق الأنواع من ERD والعينة؛ اعرض كل افتراض كسؤال، واكتب اختباراً يرفض حالة غير مدرجة، ولا تستخدم any». سلّم العقود وفحص البيانات إلى بناء المكونات في الموضوع 31.

**Objective quiz:** v1; stable question IDs `typescript-types-typed-status-union`, `typescript-types-runtime-json-validation`.
  - `typescript-types-typed-status-union` (typescript-types-objective-1): ERD يحدد أربع حالات. أي تعريف يحافظ على العقد؟ — مفتاح typescript-types-typed-status-union-b; التعليل: الاتحاد الحرفي يقيد القيم المعتمدة؛ string والحقل الاختياري يغيران معنى العقد.
  - `typescript-types-runtime-json-validation` (typescript-types-objective-2): وصل JSON بحالة غير موجودة في union. ماذا يلزم؟ — مفتاح typescript-types-runtime-json-validation-c; التعليل: الأنواع لا تتحقق آلياً من بيانات خارجية أثناء التشغيل.

**Practical assessment:** scale `typescript-types-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `types-file`: عقود المشروع المشتقة من ERD مع حالات موثقة.
  - `type-evidence`: عينة صحيحة وحالة سلبية ونتيجة فحص مسجلة.

Criteria:
  - `typescript-types-contract-source` → `types-file`: مصدر العقد. كل كيان وحالة يتتبعان إلى ERD أو سؤال مفتوح. دليل المراجعة: أشر إلى حقل وحالة ومصدرهما في ERD.
  - `typescript-types-runtime-boundary` → `type-evidence`: فحص الحد. العينة غير الصحيحة تفشل عند الفحص المناسب. دليل المراجعة: أرفق اسم الاختبار ورسالة الفشل أو فحص وقت التشغيل.

**Author finding:** راجع المؤلف union والحقل الاختياري والفرق بين فحص النوع والتحقق وقت التشغيل. عينة المخرج صحيحة/سلبية وتغذي React؛ لا تقفل الوصول للموضوع التالي.

**External video candidate:** [TypeScript Crash Course with Matt Pocock](https://learn.microsoft.com/en-us/shows/vs-code-livestreams/typescript-crash-course-with-matt-pocock) (`candidate`, approval `proposed`). مرشح لمراجعة الأساسيات والأنواع والاتحادات؛ تعرض صفحة Microsoft Learn فصلاً بعنوان Types and unions عند 51:00 واختبارات عند 14:40. المحتوى من 2022، لذا تُراجع الأمثلة مع إصدار TypeScript الحالي.

**Resource evidence:** صفحة الناشر تسمي الفيديو وتعرض الفصلين 14:40 Testing و51:00 Types and unions؛ الملاءمة لunion والعينة السلبية جزئية ومباشرة. لم يُختبر التشغيل أو captions أو الوصولية، ولم يراجع المالك المورد أو النسخة التعليمية. [Publisher/source page](https://learn.microsoft.com/en-us/shows/vs-code-livestreams/typescript-crash-course-with-matt-pocock).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `react-components-state`

**Inputs and lesson walk-through:** من العقود إلى مكونات → مثال محلول: بحث قائمة → مهمة وبرومبت وتسليم. Steps:
  - ارسم شجرة مكونات وحدد من يملك كل قيمة مشتركة. → `CatalogPage → SearchToolbar + CatalogList → ItemCard، ومالك واحد لـ query.`
  - نفذ بطاقة نقية واعرض حالات القائمة الأربع بfixtures. → `لقطة أو fixture لكل حالة؛ كل بيانات البطاقة تطابق العقد المعرّف.`
  - حدد المكون الذي يستخدم hook أو حدثاً وأضف توجيه العميل عند الحاجة. → `توضيح موضع use client وسببه؛ العرض البحت لا يحمل توجيهاً زائداً.`

**Sample project output (worked example `search-flow`):** تدفق بحث باتجاه واحد — صفحة فهرس تملك query وتعرض بطاقات قراءة فقط.

```text
SearchPage(query) → CatalogList(items,onSelect) → ItemCard(item). النتائج مشتقة ولا توجد نسخة ثانية قابلة للتعارض.
```

**Handoff:** برومبت: «قسّم الشاشة إلى عرض ومالك حالة، واستخدم الأنواع، وبيّن أربع حالات ببيانات محلية. لا تضف طلب شبكة، واذكر أين يلزم use client ولماذا». سلّم خريطة المكونات إلى التنسيق في الموضوع 32.

**Objective quiz:** v1; stable question IDs `react-components-state-shared-state-owner`, `react-components-state-server-client-boundary`.
  - `react-components-state-shared-state-owner` (react-components-state-objective-1): القائمة وشريط البحث يحتاجان query نفسها. أين تحفظ؟ — مفتاح react-components-state-shared-state-owner-b; التعليل: مالك واحد للحالة المشتركة يتيح تدفق props نزولاً.
  - `react-components-state-server-client-boundary` (react-components-state-objective-2): مكوّن عرض بلا hooks أو أحداث. هل يحتاج use client؟ — مفتاح react-components-state-server-client-boundary-a; التعليل: حد العميل مطلوب عند استخدام hooks أو browser APIs أو أحداث.

**Practical assessment:** scale `react-components-state-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `component-map`: خريطة props وحدود المكونات ومالك الحالة.
  - `state-fixtures`: مكونات وfixtures لحالات التحميل والنجاح والفراغ والخطأ.

Criteria:
  - `react-components-state-state-owner` → `component-map`: مالك حالة واضح. القيمة المشتركة لها مصدر واحد؛ props للأبناء وcallbacks للأعلى. دليل المراجعة: أشر إلى تعريف query والحدث الذي يعيد التغيير للأب.
  - `react-components-state-state-coverage` → `state-fixtures`: حالات ظاهرة. كل حالة لها بيانات قابلة للعرض ولا توصف fixture كـ API. دليل المراجعة: أرفق أسماء fixtures الأربع ومصدر بياناتها.

**Author finding:** راجع المؤلف اشتقاق النتائج وملكية الحالة وحد use client. حالات العرض الأربع محددة وبياناتها محلية بوضوح.

**External video candidate:** [S01 E16: Five Things About State in React](https://learn.microsoft.com/en-us/shows/5-things/episode-16-five-things-about-state-in-react) (`candidate`, approval `proposed`). مرشح لملكية الحالة وتدفقها عبر props والمكونات؛ صفحة Microsoft Learn تذكر هذه المحاور صراحة. المورد من 2022 ويحتاج موازنة مع توثيق React الحالي.

**Resource evidence:** صفحة Microsoft Learn تصف local state وstate flow وprops واستعمال state داخل المكونات. صلة الموضوع واضحة على مستوى المفاهيم، مع حاجة لمراجعة مصطلحات/واجهات React الحديثة. لم يُختبر التشغيل أو captions أو الوصولية، ولا توجد موافقة مالك. [Publisher/source page](https://learn.microsoft.com/en-us/shows/5-things/episode-16-five-things-about-state-in-react).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `tailwind-css-responsive`

**Inputs and lesson walk-through:** من الرمز إلى الفئة → مثال محلول: بطاقة ثنائية الاتجاه → مهمة وبرومبت وتسليم. Steps:
  - اربط لوناً ومسافة ونصف قطر من DESIGN.md بمتغير/فئة حسب إصدار Tailwind. → `docs/TAILWIND_DESIGN_MAPPING.md يذكر المصدر والأسئلة غير المحسومة.`
  - نسق بطاقة بخصائص منطقية وافحص العربية والإنجليزية. → `لا تعتمد المحاذاة على ml/mr أو left/right إذا كان المقصود اتجاه النص.`
  - افحص العروض الخمسة وحدد سبب overflow وأصلحه قبل إعادة فحص RTL/LTR. → `مصفوفة تسجل العرض والاتجاه والعنصر والسبب والإصلاح والنتيجة الفعلية؛ لا تخف التدفق على مستوى الصفحة.`

**Sample project output (worked example `logical-layout`):** بطاقة اتجاهية — بطاقة لها عنوان وزر إجراء.

```text
ps-4 وtext-start وms-auto يتبعون اتجاه الكتابة؛ تنتقل الأزرار لسطر عند الهاتف عند الحاجة.
```

**Handoff:** برومبت: «طبّق الرموز على هذا المكون، واستخدم خصائص منطقية، واعرض الفحص عند 390/768/1024/1366/1440px. لا تضف لوناً خارج DESIGN.md». سلّم جدول الرموز إلى هيكلة المسارات في الموضوع 33.

**Objective quiz:** v1; stable question IDs `tailwind-css-responsive-design-token-source`, `tailwind-css-responsive-logical-spacing-rtl`.
  - `tailwind-css-responsive-design-token-source` (tailwind-css-responsive-objective-1): كيف تحد من تشتت الألوان بين الصفحات؟ — مفتاح tailwind-css-responsive-design-token-source-b; التعليل: الربط بالرموز يجعل القرار البصري متسقاً وقابلاً للمراجعة.
  - `tailwind-css-responsive-logical-spacing-rtl` (tailwind-css-responsive-objective-2): ml-4 يضع المسافة في الجهة الخطأ بالعربية. ما البديل؟ — مفتاح tailwind-css-responsive-logical-spacing-rtl-a; التعليل: الخاصية المنطقية تتبع اتجاه الكتابة؛ إخفاء overflow يخفي العَرَض فقط.

**Practical assessment:** scale `tailwind-css-responsive-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `token-map`: جدول الرموز المعتمدة وربطها بمتغيرات/فئات.
  - `responsive-report`: مصفوفة عروض واتجاهات بنتائج فحص حقيقية.

Criteria:
  - `tailwind-css-responsive-token-source` → `token-map`: مصدر الرمز. الفئات المخصصة مرتبطة بمصدر أو سؤال مفتوح. دليل المراجعة: أشر إلى مصدر لون ومسافة وفئتهما.
  - `tailwind-css-responsive-direction-check` → `responsive-report`: فحص الاتجاه والعرض. يذكر العرض والاتجاه والعنصر المتأثر لا ادعاء تجاوب عام. دليل المراجعة: أرفق أصغر عرض فحصته ونتيجة RTL/LTR.

**Author finding:** راجع المؤلف الدرس الأصلي والمكمل معاً: الجدول والخطوة القديمة لم يعودا يوصيان بإخفاء تدفق الصفحة، بل بتحديد العنصر المسبب وإعادة فحصه؛ القص محلي ومقصود فقط. ربط الفئات بمصدر التصميم وعروض الفحص الفعلية موضحان.

**Breakpoint correction:** مثال Tailwind يعرّف `--breakpoint-2xl: 90rem` في `@theme` ليطابق استخدام `2xl:` عند 1440px. يوضح الدرس أن Tailwind v4 الافتراضي هو 96rem/1536px، وأن استخدام `xl:` هو البديل إذا لم يُعرّف breakpoint مخصص.

**External video candidate:** [Tailwind CSS: From Zero to Production](https://tailwindcss.com/blog/tailwindcss-from-zero-to-production) (`candidate`, approval `proposed`). مرشح من سلسلة Tailwind الرسمية ذات 8 أجزاء؛ الجزء الثالث responsive design والسابع تخصيص design system. السلسلة تعلم Tailwind v2.0، لذا تصلح للمبادئ فقط ويجب عدم نسخ صياغة الإعداد أو الفئات قبل التحقق من الإصدار.

**Resource evidence:** صفحة Tailwind الرسمية تسرد 8 فيديوهات، ومنها Responsive Design وCustomizing Your Design System، وتذكر أنها لـ Tailwind CSS v2.0 (2021). تطابقها مع التجاوب والرموز مناسب بمحدودية النسخة. لم يُختبر تشغيل الفيديو أو captions أو الوصولية؛ موافقة المالك غير مسجلة. [Publisher/source page](https://tailwindcss.com/blog/tailwindcss-from-zero-to-production).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## `nextjs-app-router`

**Inputs and lesson walk-through:** من الجرد إلى الملفات → مثال محلول: قائمة وتفصيل → مهمة وبرومبت وتسليم. Steps:
  - اربط كل شاشة بمسار وpage وحدد layout وحالات loading/not-found. → `docs/NEXTJS_ROUTING_SPEC.md يربط الجرد بملفات app.`
  - أنشئ layout بlang/dir وتنقلاً داخلياً إلى مسارين موجودين. → `تخطيط lang="ar" وdir="rtl" وروابط لمسارات قائمة.`
  - حدد لكل صفحة هل مصدرها fixture أو API منفذ فعلاً. → `مصفوفة route/source/client-boundary بلا ادعاء API عند استخدام fixtures.`

**Sample project output (worked example `route-files`):** شجرة مسارات BorrowHub تطابق مساري `/equipment` و`/equipment/[id]` من الدرس الأصلي; استخدم مسارات جرد مشروعك إذا اختلفت.

```text
src/app/layout.tsx; src/app/equipment/page.tsx; src/app/equipment/[id]/page.tsx. صفحة التفصيل تعرض not-found لقيمة id غير موجودة. مصدر السجلات fixtures محلية حتى يثبت API منفذ.
```

**Handoff:** برومبت: «حوّل الجرد إلى شجرة App Router، وسم كل ملف ومصدر البيانات. حافظ على RTL، وضع use client عند hook/حدث فقط. لا تدّع وجود Backend». سلّم الشجرة لتخطيط المشروع التالي.

**Objective quiz:** v1; stable question IDs `nextjs-app-router-layout-route-mapping`, `nextjs-app-router-fixture-vs-api`.
  - `nextjs-app-router-layout-route-mapping` (nextjs-app-router-objective-1): أين تضع واجهة تظهر حول القائمة والتفاصيل؟ — مفتاح nextjs-app-router-layout-route-mapping-a; التعليل: layout يوفر الهيكل المشترك للمسارات التابعة.
  - `nextjs-app-router-fixture-vs-api` (nextjs-app-router-objective-2): صفحة تعرض fixtures محلية. ما الوصف الدقيق؟ — مفتاح nextjs-app-router-fixture-vs-api-b; التعليل: عرض البيانات المحلية لا يثبت وجود API أو قاعدة بيانات.

**Practical assessment:** scale `nextjs-app-router-descriptive-scale` v1, completion rule `no-mastery-threshold`; scale approval is `proposed`. Outputs:
  - `route-spec`: شجرة مسارات ومطابقة للشاشات وحالاتها.
  - `route-shell`: layout وتنقل داخلي مع مصدر البيانات معلناً.

Criteria:
  - `nextjs-app-router-screen-trace` → `route-spec`: تغطية الجرد. الشاشات المختارة لها مسار وملف وحالة مناسبة. دليل المراجعة: أشر إلى شاشة ومسار وملف الصفحة المقابل.
  - `nextjs-app-router-source-label` → `route-shell`: صدق المصدر. fixture وAPI الفعلي مسميان كما هما. دليل المراجعة: أرفق صفحة واحدة ومصدر بياناتها الفعلي.

**Author finding:** راجع المؤلف أسماء الملفات وحدود fixture مقابل API. المخرجات تبني على المكونات وتبقى جميع المسارات قابلة للفتح مستقلاً.

**External video candidate:** [Less code, better UX: Fetching data faster with the Next.js 13 App Router](https://vercel.com/blog/nextjs-app-router-data-fetching) (`candidate`, approval `proposed`). مرشح يوضح جلب البيانات داخل Server Components والـ layouts المشتركة وتحسين حالات التحميل في App Router. صفحة Vercel تشير إلى demo فيديو قصير؛ المادة مرتبطة بـ Next.js 13 (2023) فتحتاج مقارنة بالأدلة الحالية قبل استخدامها في خطوات إصدار حديث.

**Resource evidence:** مقال Vercel عن Next.js 13 App Router يشرح app directory وServer Components وnested layouts ويقول إن Sam Selikoff يعرض demo بأقل من ثلاث دقائق. هذا يثبت وجود مورد مرئي ذي صلة، لا التوافق مع كل ملفات App Router الحالية. التشغيل وcaptions والوصولية ومراجعة المالك لم تُنفذ. [Publisher/source page](https://vercel.com/blog/nextjs-app-router-data-fetching).

**Gaps:** owner decision is pending; video playback, captions, accessibility, and any user-facing connectivity state are Not Run. No owner approval or final video availability is claimed.

## Owner gates

- Approve or revise the first-group/template and this membership before any group is marked improved.
- Decide the proposed quiz scoring and descriptive rubric scale; all scoring/rubric policy approvals remain `proposed`.
- Review each candidate against the actual lesson, approve/reject each resource, and confirm captions/accessibility/playback before release. A publisher listing alone is not approval.
- Record course-owner acceptance for the complete group and the independent evidence required by the parent release issue.
- Browser journey, persisted history, RTL/LTR, keyboard/mobile, and integrated build checks remain for root-coordinated integration.
