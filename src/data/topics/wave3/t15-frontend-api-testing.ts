import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function copyableCode(code: string, label: string, language: string): string {
  return `
    <div class="code-container my-4" dir="ltr">
      <div class="code-header"><span class="code-lang">${escapeHtml(language)}</span></div>
      <pre class="code-content overflow-x-auto"><code>${escapeHtml(code)}</code></pre>
      <button class="copy-btn" type="button" aria-label="${escapeHtml(label)}">${escapeHtml(label)}</button>
    </div>
  `;
}

const contractWorksheet = `{
  "endpoint": "exact method and path from docs/API_CONTRACTS.md",
  "request": "exact fields and types from the contract",
  "success": "documented status and response schema",
  "authentication": "cookie session | bearer token | none, as documented",
  "authorization": "rule from docs/PERMISSIONS_MATRIX.md",
  "errors": "documented statuses and error body; do not invent an envelope"
}`;

const requestPattern = `const apiUrl = new URL(pathFromContract, apiBaseUrl);
const isCrossOrigin = apiUrl.origin !== window.location.origin;
const credentials: RequestCredentials = isCookieSession
  ? (isCrossOrigin ? "include" : "same-origin")
  : "omit";
const body = requestBody === undefined ? undefined : JSON.stringify(requestBody);

const response = await fetch(apiUrl, {
  method: methodFromContract,
  headers: headersFromTheSelectedAuthContract,
  credentials,
  ...(body === undefined ? {} : { body }),
});

// Decode the success or error shape documented for this endpoint.
const outcome = await mapResponseUsingContract(response, endpointContract);`;

export const topic45FrontendApiHtml = `
<section id="topic-45-frontend-api-integration" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 45 · تكامل الواجهة والخادم</span>
    <span class="step-pill">استبدال البيانات التمثيلية بعقد API فعلي</span>
  </div>
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">ربط Frontend مع Backend: الطلبات والجلسات والأخطاء</h2>
      <div class="step-subtitle">اربط ميزة واحدة في مشروعك بعقد الخادم الموثق، وأظهر نتيجة الطلب وحالاته بصدق</div>
    </div>
  </div>

  <div class="callout info my-6">
    <div class="callout-header"><span class="callout-icon">🧭</span><span>ابدأ من العقد المعتمد</span></div>
    <p class="leading-7">هذا الموضوع يربط واجهة مشروعك أنت بخادمه. مرجع أسماء المسارات والحقول والردود هو <code>docs/API_CONTRACTS.md</code> ومصفوفة الأدوار في <code>docs/PERMISSIONS_MATRIX.md</code>، بعد مطابقتها مع تنفيذ الخادم الذي تشغله. لا تنشئ مسارًا أو حقلًا أو شكل خطأ من التخمين، ولا تعتبر بيانات Mock طلبًا حقيقيًا. هذه المادة لا تضيف API أو Backend إلى الموقع التعليمي.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. قبل كتابة طلب الشبكة: طابق الطرفين</h3>
    <p class="leading-8 text-[var(--text-muted)]">اختر رحلة واحدة اكتملت واجهتها وقواعدها في PRD وSRS. قارن عقد البيانات المؤقت الذي استخدمته الواجهة في <code>docs/FRONTEND_DATA_CONTRACTS.md</code> مع عقد API: المسار، الطريقة، أسماء الحقول وأنواعها، الحقول المطلوبة، غلاف الاستجابة إن وجد، الترقيم، رموز HTTP، شكل الخطأ، وآلية المصادقة. إذا اختلفت وثائق الواجهة والخادم، سجّل التعارض ثم حدّث الطرفين قبل ربطهما.</p>
    <p class="leading-8 text-[var(--text-muted)]">وثيقة OpenAPI أو Swagger مفيدة لاكتشاف العقد، لكنها لا تثبت وحدها أن الخادم الذي يعمل يطابق الوثيقة. افحص إصدار العقد والتنفيذ الفعلي وبيئة الاختبار؛ لا تستخدم ردًا التقطته من بيانات تمثيلية على أنه رد الخادم.</p>
    ${copyableCode(contractWorksheet, 'نسخ ورقة مطابقة عقد API', 'قالب توثيق العقد · غيّر العناصر الوصفية وفق عقد مشروعك')}
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. الجلسة وإثبات الهوية والصلاحية مفاهيم مختلفة</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>جلسة Cookie:</strong> يحتفظ الخادم بحالة تسجيل الدخول، ويرسل متصفح المستخدم ملف الارتباط وفق النطاق وخصائصه. يرسل <code>fetch</code> ملفات الارتباط ذات الأصل نفسه افتراضيًا؛ أما الطلب عبر أصل مختلف فيحتاج إعداد <code>credentials: 'include'</code> إذا كان العقد يتطلبه، وإعداد CORS صريحًا على الخادم يسمح بالأصل والاعتمادات. هذا لا يتجاوز <code>SameSite</code> أو <code>Secure</code> أو سياسة CSRF. لا تقرأ Cookie من JavaScript إذا كانت <code>HttpOnly</code>.</li>
      <li><strong>Bearer token:</strong> أرسل ترويسة <code>Authorization: Bearer …</code> فقط إذا كان عقد المصادقة يحددها. مصدر الرمز وتجديده ومكان حفظه جزء من تصميم الأمان المعتمد؛ لا تفترض <code>localStorage</code> ولا تطبع الرمز في السجلات.</li>
      <li><strong>Authorization:</strong> تسجيل الدخول يثبت هوية الجلسة أو الرمز؛ الخادم يقرر هل يحق لتلك الهوية تنفيذ العملية وعلى هذا المورد. إخفاء زر في الواجهة تحسين للتجربة، ولا يحل محل فحص الصلاحية في الخادم.</li>
    </ul>
    <div class="overflow-x-auto my-4">
      <table class="min-w-full text-xs sm:text-sm border-collapse text-right">
        <thead><tr class="border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)]"><th class="p-3">الحالة</th><th class="p-3">المعنى الشائع</th><th class="p-3">استجابة الواجهة</th></tr></thead>
        <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
          <tr><td class="p-3 font-mono" dir="ltr">401</td><td class="p-3">جلسة أو اعتماد مفقود أو غير صالح وفق العقد.</td><td class="p-3">اعرض انتهاء الجلسة أو اطلب تسجيل الدخول من جديد؛ لا تعرضها كأنها مشكلة صلاحية الدور.</td></tr>
          <tr><td class="p-3 font-mono" dir="ltr">403</td><td class="p-3">هوية معروفة لكن العملية غير مسموحة لها وفق العقد.</td><td class="p-3">اعرض رفضًا مفهومًا ولا تعاود الطلب آليًا مع الاعتماد نفسه.</td></tr>
          <tr><td class="p-3 font-mono" dir="ltr">404 / 409 / 422</td><td class="p-3">مورد غير موجود أو تعارض حالة أو تحقق بيانات؛ المعنى الدقيق من عقد المسار.</td><td class="p-3">اربط الرسالة بالحقل أو الرحلة المناسبة، ولا تعرض تفاصيل الخادم الداخلية.</td></tr>
          <tr><td class="p-3 font-mono" dir="ltr">5xx / network error</td><td class="p-3">فشل خادم أو تعذر الوصول إليه؛ ليس فشل تحقق من مدخل المستخدم.</td><td class="p-3">أظهر إمكانية المحاولة لاحقًا، واحتفظ بمدخلات المستخدم عند ملاءمة ذلك.</td></tr>
        </tbody>
      </table>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">قد يستخدم عقد موثق <code>404</code> لإخفاء وجود مورد غير مسموح بعرضه، أو يعرّف رموزًا مختلفة. اعرض المعنى المكتوب للعقد الفعلي؛ لا تفرض الجدول الشائع على الخادم إذا كانت مواصفته الصحيحة مختلفة.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. اربط حالة الطلب بحالة واجهة مرئية</h3>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li>اقرأ إعداد عنوان API من إعداد بيئة العميل المناسب؛ عنوان API العام ليس سرًا، لكن مفاتيح الخادم وكلمات المرور لا تذهب إلى حزمة المتصفح.</li>
      <li>نفّذ طلبًا واحدًا من ميزة واحدة، مستخدمًا الطريقة والحقول والرؤوس وآلية الاعتماد المحددة في العقد. لا ترسل جسمًا لطلب لا يعرّف جسمًا.</li>
      <li>ميّز بين انتظار الطلب، والاستجابة الناجحة، ونجاح بلا نتائج، وخطأ HTTP وفق العقد، وتعذر الشبكة. لا تعرض نجاحًا قبل وصول نجاح الخادم.</li>
      <li>تحقق من الاستجابة قبل تحديث الواجهة، وطبّق schema مطابقًا لما وثقه الخادم. لا تعتمد على أن كل استجابة خطأ تحتوي JSON أو لها envelope موحد ما لم يضمن العقد ذلك.</li>
      <li>بعد تغير الجلسة أو إبطالها، تصرف وفق سياسة المصادقة؛ لا تكرر طلب كتابة غير آمن بعد <code>401</code> إلا إذا كان مسار التجديد والعقد يضمنان إعادة المحاولة الآمنة.</li>
      <li>اختبر الطلب في بيئة محلية أو اختبارية ضد الخادم الحقيقي لميزة الطالب، وتأكد من عنوان الطلب في Network ومن أن البيانات العائدة لم تأت من Mock أو Service Worker.</li>
    </ol>
    <p class="leading-8 text-[var(--text-muted)]">المقتطف التالي مخطط ربط يوضح أين يطبّق العقد. أسماء المتغيرات دلالية وليست أسماء حقول في API؛ استبدلها بما هو موجود في مشروعك، ولا تنسخها كمسار أو envelope جاهز.</p>
    ${copyableCode(requestPattern, 'نسخ نمط طلب الواجهة', 'TypeScript · نمط توضيحي يعتمد على عقد مشروعك')}
  </div>

  <div class="callout tip my-6">
    <div class="callout-header"><span class="callout-icon">🔎</span><span>مثال BorrowHub اختياري</span></div>
    <p class="leading-7">في عقد دراسة BorrowHub السابق، تظهر عملية طلب الإعارة في <code dir="ltr">POST /api/v1/loans</code> وتظهر إضافة صنف في <code dir="ltr">POST /api/v1/equipment</code>. لا تستخدم هذين المسارين لمشروعك المختلف. الأدوار وقواعد التوفر تخص مثال BorrowHub، ويجب أن تطابق قواعد مشروعك PRD وSRS وعقوده.</p>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>الفشل ليس نجاحًا مخفيًا</span></div>
    <p class="leading-7">إذا فشل الطلب، لا تمسح النموذج ولا تحدث بيانات القائمة كأن العملية تمت. اعرض رسالة آمنة متسقة مع استجابة العقد، احتفظ بالمدخلات التي يمكن إعادة استخدامها، ولا تعرض stack trace أو تفاصيل قاعدة البيانات. النجاح يعني استجابة صحيحة من API الحقيقي وواجهة تعرض نتيجتها، أما تشغيل الواجهة وحدها فيثبت واجهة فقط.</p>
  </div>
</section>
`;

const frontendMockTest = `test('shows the contract-defined conflict state', async ({ page }) => {
  // Route interception replaces the API: this demonstrates Frontend behavior only.
  await page.route(API_ROUTE, (route) => route.fulfill({
    status: CONTRACT_CONFLICT_STATUS,
    contentType: 'application/json',
    body: JSON.stringify(CONTRACT_CONFLICT_BODY),
  }));

  await page.goto(FEATURE_ROUTE);
  await page.getByRole('button', { name: SUBMIT_LABEL }).click();
  await expect(page.getByRole('alert')).toContainText(EXPECTED_UI_MESSAGE);
});`;

export const topic46TestingJourneysHtml = `
<section id="topic-46-testing-journeys" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 46 · Testing</span>
    <span class="step-pill">تحقق من الرحلة ومستوى الدليل الذي جمعته</span>
  </div>
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج</h2>
      <div class="step-subtitle">ابدأ الفحوصات أثناء التنفيذ، وصنّف كل نتيجة بحسب الأنظمة التي شملها الاختبار فعليًا</div>
    </div>
  </div>

  <div class="callout info my-6">
    <div class="callout-header"><span class="callout-icon">🧪</span><span>الاختبار الكامل دليل بحدود تشغيله</span></div>
    <p class="leading-7">هذا الموضوع يكمل الربط في الموضوع 45. يختبر مشروع الطالب حسب متطلباته وعقده؛ لا يضيف Backend للموقع التعليمي. نجاح اختبار Frontend لا يثبت أن Backend أو قاعدة البيانات يعملان، ونجاح اختبار API وحده لا يثبت أن شاشة المتصفح أو رحلة المستخدم تعمل.</p>
  </div>

  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. اختر نوع الاختبار قبل وصف ما يثبته</h3>
    <div class="overflow-x-auto my-4">
      <table class="min-w-full text-xs sm:text-sm border-collapse text-right">
        <thead><tr class="border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)]"><th class="p-3">المستوى</th><th class="p-3">ما الذي يشغله؟</th><th class="p-3">ما الذي يثبته؟</th><th class="p-3">ما الذي لا يثبته وحده؟</th></tr></thead>
        <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
          <tr><td class="p-3 font-bold">Unit / Component</td><td class="p-3">دالة أو مكون مع اعتماديات مضبوطة.</td><td class="p-3">سلوك الوحدة والواجهة المعزولة للمدخلات التي اختُبرت.</td><td class="p-3">أن API أو الخادم أو قاعدة البيانات حقيقية أو سليمة.</td></tr>
          <tr><td class="p-3 font-bold">Frontend integration</td><td class="p-3">المتصفح والواجهة مع API mock أو route interception.</td><td class="p-3">أن الواجهة تتعامل مع الردود المحددة وتعرض الحالات المتوقعة.</td><td class="p-3">أن endpoint الحقيقي نفّذ الطلب أو أن صلاحية المستخدم طُبقت في الخادم.</td></tr>
          <tr><td class="p-3 font-bold">API / backend integration</td><td class="p-3">route الخادم، الخدمات، المصادقة، وقاعدة اختبار معزولة.</td><td class="p-3">السلوك الذي شُغّل في مسار الخادم وبيانات الاختبار.</td><td class="p-3">أن شاشة المتصفح أو رحلة المستخدم تعمل.</td></tr>
          <tr><td class="p-3 font-bold">Full-Stack browser journey</td><td class="p-3">المتصفح، الواجهة، الخادم الحقيقي المخصص للاختبار، وقاعدة بيانات اختبار؛ الطلب المستهدف غير معترض بMock.</td><td class="p-3">الرحلة التي عبرت هذه المكونات ضمن الإعداد والتغطية المسجلين.</td><td class="p-3">المسارات والبيانات والمنصات التي لم يشملها الاختبار أو التشغيل الإنتاجي.</td></tr>
        </tbody>
      </table>
    </div>
    <p class="leading-8 text-[var(--text-muted)]">اختبار Playwright الذي يستخدم <code>page.route</code> لاستبدال رد API يختبر سلوك Frontend مع الرد المعطى. حتى لو فتح متصفحًا ونقر الأزرار فهو لا يصبح Full-Stack بمجرد تسميته E2E. أثبت نوعه بحدود بيئته وشبكته، لا باسم الملف أو الأداة.</p>
    ${copyableCode(frontendMockTest, 'نسخ مثال اختبار Frontend مع Mock', 'Playwright · الاختبار المعترض يثبت Frontend فقط')}
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. حوّل متطلباتك إلى رحلة نجاح ورحلة فشل</h3>
    <p class="leading-8 text-[var(--text-muted)]">ابدأ بمعيار قبول من PRD/SRS وبالمسار الفعلي في <code>docs/API_CONTRACTS.md</code>. جهّز بيانات اختبار معلومة، واستخدم حسابات أدوار معتمدة وفق <code>docs/PERMISSIONS_MATRIX.md</code>. اجعل شرط النجاح والفشل قابلًا للتحقق، بما في ذلك حالة الواجهة وحالة الخادم أو قاعدة الاختبار حين يتطلب ادعاؤك ذلك.</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
      <div class="rounded-xl border border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/20 p-4">
        <h4 class="font-bold text-[var(--text-main)]">رحلة نجاح BorrowHub الإرشادية</h4>
        <ol class="list-decimal list-inside mt-2 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
          <li>أنشئ بيانات اختبار معروفة فيها معدة متاحة ومستخدم يملك دور تقديم الطلب.</li>
          <li>سجّل الدخول بالآلية التي يحددها العقد، ثم أرسل طلب الإعارة إلى <code dir="ltr">POST /api/v1/loans</code> دون اعتراض هذا الطلب بMock.</li>
          <li>تحقق من استجابة <code dir="ltr">201 Created</code> لإنشاء طلب الإعارة وفق عقد BorrowHub، ومن عرض النتيجة في الواجهة، ومن أثرها المتوقع في قاعدة اختبار معزولة.</li>
        </ol>
        <p class="mt-2 text-xs leading-6 text-[var(--text-muted)]">المسار وحالة BorrowHub مثالان تعليميان مستمدان من المادة السابقة؛ لا تنفذهما كما هما لمشروع آخر.</p>
      </div>
      <div class="rounded-xl border border-amber-300 bg-amber-50/60 dark:bg-amber-950/20 p-4">
        <h4 class="font-bold text-[var(--text-main)]">رحلة فشل BorrowHub الإرشادية</h4>
        <ol class="list-decimal list-inside mt-2 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
          <li>جهّز حالة تعارض موثقة، مثل نفاد الكمية قبل إتمام الطلب، مع تثبيت بيانات البداية.</li>
          <li>نفّذ الطلب الحقيقي وتحقق من <code dir="ltr">409 Conflict</code> لحالة نفاد الكمية وفق عقد BorrowHub، ومن جسم الخطأ كما هو موثق، دون افتراض envelope آخر.</li>
          <li>تحقق من رسالة الواجهة، وبقاء المدخلات المناسبة، وعدم إنشاء طلب أو تغيير مخزون غير صحيح في قاعدة الاختبار.</li>
        </ol>
        <p class="mt-2 text-xs leading-6 text-[var(--text-muted)]">المتطلبات وحالة التوفر ورمز التعارض يجب أن تتطابق مع عقد BorrowHub المنشور والمختار؛ قراءة هذه الخطوات ليست تنفيذًا لها.</p>
      </div>
    </div>
    <p class="leading-8 text-[var(--text-muted)]">أضف اختبارات منفصلة لـ <code>401</code> عند انتهاء الجلسة و<code>403</code> عند رفض الصلاحية إذا كانت هذه الحالات في عقد مشروعك. تحقق من أن الفشل لا ينشئ سجلًا أو يغير حالة مورد، وأن الواجهة لا تتعامل معه على أنه نجاح. استخدم قاعدة بيانات اختبار منفصلة، ولا توجه الاختبارات إلى بيانات الإنتاج.</p>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. اكتب تقريرًا يبيّن ما شملته النتيجة</h3>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li>سجّل كل معيار وطبقة الاختبار، والأمر أو الرابط الذي شُغّل، والبيئة وإصدار commit، ومصدر API والبيانات، والنتيجة الفعلية.</li>
      <li>اكتب <strong>Passed</strong> فقط إذا نُفذ الاختبار واكتملت تأكيداته؛ اكتب <strong>Failed</strong> عند تنفيذ الاختبار وفشل تأكيد؛ اكتب <strong>Not Run</strong> إذا لم يعمل أصلًا أو لم تتوفر خدمته أو دليله.</li>
      <li>افصل نتائج Frontend mock عن API وFull-Stack في التقرير. لا تجمعها في علامة نجاح واحدة، ولا تسمِّ فحص TypeScript أو build أو الواجهة المتصلة بMock اختبارًا للمنتج كاملًا.</li>
      <li>إذا كان الخادم أو قاعدة الاختبار غير متاحين، سجّل فحص Frontend كما حدث، واجعل رحلة Full-Stack <strong dir="ltr">Not Run</strong> مع السبب والخطوة اللازمة لتشغيلها.</li>
      <li>احفظ أدلة لا تحتوي أسرارًا أو بيانات أشخاص: نتيجة assertion، سجلات منقحة، معرفات fixtures، ومرجع البيئة. لا تضع tokens أو كلمات مرور في التقرير.</li>
    </ul>
    <div class="callout warning my-6">
      <div class="callout-header"><span class="callout-icon">🚦</span><span>لا ترفع مستوى الدليل بالاستنتاج</span></div>
      <p class="leading-7">اختبار واجهة ناجح مع رد API مصطنع يعني أن الواجهة تعاملت مع هذا الرد. لا يثبت أن المسار موجود أو أن الصلاحية أو قاعدة البيانات تعمل. حتى Full-Stack Passed يخص الرحلات والبيانات والإعداد المسجل فقط؛ لا يعني تغطية كل خصائص المنتج أو نجاح النشر.</p>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. ترتيب التطبيق على مشروعك</h3>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li>اكتب في <code>docs/INTEGRATION_TEST_PLAN.md</code> رحلتي نجاح وفشل مأخوذتين من متطلبات مشروعك، وحدد API الحقيقي وبيئة قاعدة الاختبار.</li>
      <li>ابدأ باختبار وحدة أو مكون ثم فحص Frontend مع ردود اختبار معلومة؛ وسم هذا الدليل Frontend عندما يعترض الاختبار API.</li>
      <li>اكتب اختبارات route والخدمات والصلاحيات على الخادم باستخدام قاعدة اختبار معزولة وبيانات معلومة، ثم تحقق من التراجع عن التغييرات عند الفشل حيث ينطبق.</li>
      <li>شغّل رحلة المتصفح بعد تشغيل الواجهة والخادم الحقيقيين للاختبار. لا تعترض الطلب المستهدف، وتأكد من العنوان والاستجابة والأثر المتوقع.</li>
      <li>أنشئ <code>docs/TEST_RESULTS.md</code> بنتائج Passed / Failed / Not Run، أصلح الفشل المؤثر، ثم أعد الاختبار ووثّق تشغيله الجديد.</li>
    </ol>
  </div>

  <div class="callout tip my-6">
    <div class="callout-header"><span class="callout-icon">📌</span><span>BorrowHub دراسة حالة فقط</span></div>
    <p class="leading-7">مسارات المعدات وطلبات الإعارة والأدوار والقيود الواردة هنا تشرح طريقة اشتقاق رحلة قابلة للاختبار. استخرج متطلبات مشروعك أنت من PRD وSRS وعقد API، ولا تنسخ أدوار BorrowHub أو حالات مخزونه أو قيمه الرقمية تلقائيًا.</p>
  </div>
</section>
`;

export const t15Entries: TopicItem[] = [
  {
    id: 'frontend-backend-integration',
    number: '45',
    slug: 'frontend-backend-integration',
    title: 'ربط Frontend مع Backend: الطلبات والجلسات والأخطاء',
    subtitle: 'استبدل البيانات التمثيلية بطلبات فعلية وفق عقد API الموثق',
    category: 'frontend',
    categoryName: 'الربط والتكامل',
    stageTag: 'المرحلة التطبيقية · تكامل الواجهة والخادم',
    summary: 'طابق واجهة مشروعك مع docs/API_CONTRACTS.md وdocs/PERMISSIONS_MATRIX.md، ثم اربط ميزة واحدة بطلب API فعلي. افهم Session Cookie وBearer token كخيارين يحددهما العقد، وميّز حالات المصادقة والصلاحيات والأخطاء دون افتراض endpoint أو envelope غير موثق.',
    tags: ['Frontend', 'Backend', 'API Contract', 'Session', 'Cookie', 'Bearer Token', 'Authorization', 'Error Handling'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 2,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic45FrontendApiHtml),
    htmlContent: topic45FrontendApiHtml,
    goal: 'ربط رحلة واحدة في واجهة مشروع الطالب بخادم فعلي وفق API contract متطابق، وإظهار نتيجة الطلب وأخطاء الجلسة والصلاحيات والشبكة دون اختراع مسارات أو استجابات.',
    prerequisites: [
      'واجهة أولية قابلة للتجربة وخطة وعقود بيانات Frontend (المواضيع 34–37).',
      'وثيقة API المعتمدة docs/API_CONTRACTS.md ومصفوفة الصلاحيات docs/PERMISSIONS_MATRIX.md (الموضوع 40).',
      'اختيار إطار خادم واحد وتنفيذ المصادقة والصلاحيات ومنطق العمل وفق المشروع (المواضيع 41–44).',
      'متطلبات PRD وSRS وسيناريوهات User Flow الخاصة بالميزة.'
    ],
    steps: [
      '1. اختر رحلة واحدة وراجع متطلباتها ومعيار قبولها في PRD وSRS قبل بدء الربط.',
      '2. طابق method وpath والطلب والاستجابة وأكواد الأخطاء وآلية الجلسة ومصفوفة الدور مع عقد API والتنفيذ الفعلي.',
      '3. سجّل التعارضات بين عقد Frontend وعقد Backend، وحلها في الوثائق والطرفين قبل توصيلهما.',
      '4. اربط الميزة بطلب واحد إلى API الفعلي؛ أبقِ الأسرار في الخادم ولا تستخدم Mock بوصفه مصدر بيانات حقيقيًا.',
      '5. أظهر loading وempty وsuccess وHTTP error وnetwork error وفق الرد الفعلي، ولا تعلن نجاح العملية قبل نجاح الخادم.',
      '6. تحقق من إرسال Cookie أو Bearer token بحسب العقد، مع اعتبار فحص صلاحية العملية مسؤولية الخادم.',
      '7. اختبر الرحلة محليًا أو في بيئة اختبار، ودوّن عنوان API والرد ودليل التشغيل في docs/FRONTEND_API_INTEGRATION.md.'
    ],
    promptRefs: [],
    outputs: [
      'docs/FRONTEND_API_INTEGRATION.md',
      'تغيير Frontend واحد مربوط بعقد API الحقيقي لمشروع الطالب',
      'دليل طلب ورد من بيئة محلية أو اختبارية مع تنقيح أي بيانات حساسة'
    ],
    checklist: [
      'المسار والطريقة وأسماء الحقول مطابقة للعقد الفعلي والتنفيذ الذي جرى فحصه.',
      'اختيار نقل الجلسة أو الرمز مأخوذ من عقد المصادقة ولا يفترض التخزين أو التجديد.',
      'الخادم يتحقق من صلاحيات الدور والموارد؛ إخفاء عناصر الواجهة ليس حماية.',
      'الواجهة تفرق بين 401 و403 وأخطاء التحقق والتعارض وفشل الشبكة بحسب عقد المشروع.',
      'لا تظهر رسالة نجاح قبل رد نجاح، ولا تُمسح مدخلات المستخدم عند فشل قابل للاسترداد.',
      'مصدر البيانات في الرحلة هو API الحقيقي للبيئة المختارة وليس mock أو service worker.',
      'لا توجد أسرار خادم أو رموز جلسة في client bundle أو logs أو مستند التسليم.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 45,
  },
  {
    id: 'full-stack-journey-testing',
    number: '46',
    slug: 'full-stack-journey-testing',
    title: 'Testing: اختبر نجاح الواجهة وفشلها ثم تكامل المنتج',
    subtitle: 'ميّز دليل Frontend عن API وFull-Stack وسجّل غير المنفذ Not Run',
    category: 'qa',
    categoryName: 'الاختبار والجودة',
    stageTag: 'المرحلة التطبيقية · اختبار رحلات المشروع',
    summary: 'ابدأ الفحص أثناء التنفيذ، واختبر النجاح والفشل بطبقات واضحة: مكونات Frontend مع mocks، API وخادم مع قاعدة اختبار، ثم رحلة متصفح Full-Stack دون اعتراض الطلب الحقيقي. سجل ما شغّلته فعلًا فقط، وافصل Passed وFailed وNot Run ولا ترفع فحص الواجهة إلى دليل نجاح منتج كامل.',
    tags: ['Testing', 'Playwright', 'Frontend Test', 'API Integration', 'Full-Stack', 'Success Journey', 'Failure Journey', 'Not Run'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 1,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic46TestingJourneysHtml),
    htmlContent: topic46TestingJourneysHtml,
    goal: 'اختبار رحلات نجاح وفشل لمشروع الطالب، وتصنيف كل نتيجة وفق المكونات التي شملها التشغيل، مع تسجيل Passed أو Failed أو Not Run بدليل قابل للمراجعة.',
    prerequisites: [
      'رحلة Frontend مرتبطة بBackend وفق عقد API الفعلي (الموضوع 45).',
      'متطلبات PRD وSRS وقواعد المشروع ومصفوفة الصلاحيات المعتمدة.',
      'بيئة اختبار معزولة وبيانات اختبار قابلة لإعادة الإنشاء؛ لا تستخدم قاعدة الإنتاج.'
    ],
    steps: [
      '1. اختر شرط قبول من PRD/SRS واكتب رحلة نجاح ورحلة فشل متوافقتين مع عقد API ومصفوفة الأدوار.',
      '2. صنّف الاختبار مسبقًا: Unit/Component أو Frontend مع Mock أو API/Backend أو Full-Stack في متصفح.',
      '3. افحص الحالات المرئية مبكرًا بردود معروفة، ووسم هذا الدليل Frontend عندما يعترض الاختبار API.',
      '4. اختبر المسار الخلفي والمصادقة والصلاحيات وقواعد العمل باستخدام قاعدة اختبار منفصلة وبيانات معلومة.',
      '5. شغّل رحلة المتصفح الكاملة على Frontend وBackend الاختباريين دون اعتراض الطلب المستهدف، وافحص أثرها في قاعدة الاختبار.',
      '6. سجّل Passed فقط للتأكيدات التي نفذت ونجحت، وFailed للفشل المشغل، وNot Run لما لم يتوفر تشغيله أو دليله.',
      '7. اكتب docs/INTEGRATION_TEST_PLAN.md وdocs/TEST_RESULTS.md بما يحددان نطاق كل دليل وcommit والبيئة والنتائج.'
    ],
    promptRefs: [],
    outputs: [
      'docs/INTEGRATION_TEST_PLAN.md',
      'اختبارات Frontend وBackend ورحلات Full-Stack المناسبة لمشروع الطالب',
      'docs/TEST_RESULTS.md بنتائج Passed / Failed / Not Run وأدلة التشغيل'
    ],
    checklist: [
      'لكل اختبار متطلب أو عقد أو قاعدة عمل محددة ومعيار نجاح وفشل قابل للملاحظة.',
      'اختبارات Frontend المعترضة بMock موسومة Frontend ولا تُعرض كاختبارات API حقيقي.',
      'اختبارات الخادم تستخدم إعدادًا وبيانات قاعدة اختبار معزولة لا الإنتاج.',
      'رحلة Full-Stack لا تعترض طلب API الذي تدعي اختباره وتستخدم الخادم الحقيقي المخصص للاختبار.',
      'رحلتا النجاح والفشل تتحققان من حالة الواجهة ومن الأثر أو عدم الأثر الخلفي عند انطباقه.',
      'التقرير يفصل Passed وFailed وNot Run ويذكر أمر التشغيل والبيئة وcommit والدليل.',
      'لا يوصف المنتج Full-Stack بأنه ناجح اعتمادًا على TypeScript أو build أو Frontend وحده.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 46,
  },
];
