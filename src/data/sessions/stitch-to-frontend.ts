import type { LearningSession } from '@/src/types/session';

/* =========================================================================
 * SESSION: STITCH → FRONTEND
 * A guided three-hour practice session that composes topics 18–37.
 * It is intentionally NOT a topic and has no sequencePosition.
 * ========================================================================= */

export const sessionOverviewHtml = `
<section id="overview" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">جلسة تطبيقية · 3 ساعات</span>
    <span class="step-pill">من التصميم المعتمد إلى أول Task قابل للمراجعة</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">لماذا هذه الجلسة؟</h2>
      <div class="step-subtitle">قراءة واحدة تربط Stitch وNext.js وSpec Kit وUI/UX Pro Max دون تكرار المواضيع التفصيلية</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    هذه الجلسة امتداد مباشر لمخرجات المحاضرة الخامسة: <code>DESIGN.md</code>، ومراجع الشاشات المعتمدة، وخطة المشروع.
    ننتقل الآن من التصميم إلى التنفيذ البرمجي المنظم، مع الحفاظ على مشروعك الحالي كما هو؛ لأنه مبني بالفعل باستخدام
    Next.js، وتم توليد واجهته في Google AI Studio وربطه بـ GitHub.
  </p>

  <div class="callout note my-6">
    <div class="callout-header">
      <span class="callout-icon">🧭</span>
      <span>قاعدة الجلسة: لا مشروع جديد، ولا إعادة تصميم، ولا برومبت واحد يبني كل شيء</span>
    </div>
    <p class="leading-7">
      لن ننشئ مشروعًا جديدًا، ولن نعيد التصميم من الصفر، ولن نطلب من الذكاء الاصطناعي تنفيذ المشروع كاملًا في برومبت واحد.
      نفحص الموجود، ثم نخطط، ثم ننفذ مهمة واحدة قابلة للتحقق، ونربط كل خطوة بالموضوع التفصيلي الذي يشرحها.
    </p>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">أهداف الجلسة</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>فهم البنية الأساسية لمشروع Next.js موجود بالفعل.</li>
    <li>التمييز بين <strong>App Router</strong> و<strong>Pages Router</strong> وفهم دور <code>layout</code> و<code>page</code> و<code>components</code>.</li>
    <li>فحص المشروع قبل تعديل أي ملف، وفصل الحقائق المؤكدة عن الافتراضات.</li>
    <li>تحويل التصاميم المعتمدة في Stitch إلى خطة Frontend واضحة.</li>
    <li>استخدام Spec Kit لتحويل كل مرحلة إلى مواصفات ومهام صغيرة.</li>
    <li>الاستفادة من UI/UX Pro Max دون تغيير الهوية البصرية المعتمدة عشوائيًا.</li>
    <li>تنفيذ كل مهمة بصورة مستقلة، ثم اختبارها وتوثيق نتيجتها.</li>
    <li>اكتشاف المشكلات قبل أن تتراكم في بقية المشروع.</li>
  </ul>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">ما الذي يعنيه Frontend فقط؟</h3>
  <p class="leading-8 text-[var(--text-muted)]">
    نريد بناء الواجهات وتجربة المستخدم والتفاعلات المحلية، دون بناء Backend حقيقي في هذه المرحلة.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>يمكن تنفيذه الآن</th><th>مؤجل إلى مرحلة Backend</th></tr>
      </thead>
      <tbody>
        <tr><td>الصفحات والتنقل</td><td>API حقيقي</td></tr>
        <tr><td>النماذج والتحقق من المدخلات</td><td>حفظ البيانات في قاعدة بيانات</td></tr>
        <tr><td>حالات التحميل والخطأ والنجاح</td><td>عمليات الخادم الفعلية</td></tr>
        <tr><td>بيانات تجريبية Typed Mock Data</td><td>استرجاع بيانات المستخدم الحقيقية</td></tr>
        <tr><td>واجهة تسجيل الدخول التجريبية</td><td>نظام مصادقة حقيقي وجلسات آمنة</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout warning">
    <div class="callout-header">
      <span class="callout-icon">⚠️</span>
      <span>واجهة تسجيل دخول شكلية لا تعني وجود مصادقة آمنة</span>
    </div>
    <p class="leading-7">
      لا نخزن كلمات مرور حقيقية، ولا ندّعي أن تسجيل الدخول يعمل فعليًا قبل ربط النظام المناسب.
      وكل بيانات الواجهة في هذه الجلسة صريحة وموسومة كمحلية أو تجريبية، حتى لا تُفهم كتكامل حي.
    </p>
  </div>
</section>

<section id="schedule" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">خطة الوقت — 3 ساعات</h2>
      <div class="step-subtitle">توزيع عملي يمنع القفز من الشرح إلى التنفيذ قبل اعتماد المخرجات</div>
    </div>
  </div>

  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr><th>المدة</th><th>المحور</th></tr>
      </thead>
      <tbody>
        <tr><td>20 دقيقة</td><td>مراجعة مخرجات المحاضرة السابقة</td></tr>
        <tr><td>30 دقيقة</td><td>شرح Next.js وبنية المشروع</td></tr>
        <tr><td>25 دقيقة</td><td>تحليل المشروع وفحصه</td></tr>
        <tr><td>25 دقيقة</td><td>سلسلة برومبتات Google Stitch</td></tr>
        <tr><td>20 دقيقة</td><td>إنشاء خطة Frontend</td></tr>
        <tr><td>35 دقيقة</td><td>Spec Kit وUI/UX Pro Max عمليًا</td></tr>
        <tr><td>15 دقيقة</td><td>اختبارات الجودة والتكليف</td></tr>
        <tr><td>10 دقائق</td><td>احتياطي وأسئلة</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout tip">
    <div class="callout-header">
      <span class="callout-icon">💡</span>
      <span>قاعدة الوقت</span>
    </div>
    <p class="leading-7">
      لا تبدأ التنفيذ لأن الوقت انتهى، ولا تمدّد الشرح لأن التنفيذ تأخر. أنهِ المحور بمخرج مكتوب،
      ثم انتقل. المخرج الناقص يُسجَّل كسؤال مفتوح، ولا يُخترع له قرار.
    </p>
  </div>
</section>

<section id="journey" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">خريطة الرحلة الكاملة: من التصميم إلى التسليم</h2>
      <div class="step-subtitle">اثنا عشر موضعًا تربط مخرجات المحاضرة الخامسة بما ننفذه اليوم</div>
    </div>
  </div>

  <ol class="list-decimal list-inside space-y-3 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li><strong>تحليل المشروع:</strong> راجع PRD والمخططات وUser Flows وصلاحيات الأدوار قبل أي كود.</li>
    <li><strong>UI/UX Grill Me:</strong> مقابلة أسئلة متدرجة لاكتشاف شكل التجربة وكل صفحة.</li>
    <li><strong>UX Blueprint:</strong> أنشئ Sitemap وScreen Inventory وحالات الشاشات.</li>
    <li><strong>Google Stitch:</strong> صمّم شاشة تمثيلية، ثبّت الهوية، ثم كل شاشة بمفردها.</li>
    <li><strong>Prototype:</strong> اربط الشاشات واختبر رحلة كاملة.</li>
    <li><strong>UX Audit:</strong> راجع Responsive وRTL وAccessibility وحالات الأخطاء.</li>
    <li><strong>Stitch MCP:</strong> اربط بيئة البرمجة بمشروع Stitch عبر API Key في إعدادات MCP.</li>
    <li><strong>DESIGN.md:</strong> استخرج القيم المعتمدة فعلًا لا قيمًا متخيلة.</li>
    <li><strong>Frontend Plan:</strong> خطط Next.js App Router وTypeScript وTailwind وMock Data.</li>
    <li><strong>UI/UX Pro Max:</strong> راجع معايير الواجهة قبل التنفيذ وبعده.</li>
    <li><strong>Spec Kit:</strong> Constitution ← Specify ← Clarify ← Plan ← Tasks ← Analyze ← Implement ← Converge.</li>
    <li><strong>Final QA:</strong> تحقّق من التصميم والمسارات والتجاوب والاختبارات، ثم وثّق العمل على GitHub.</li>
  </ol>

  <div class="callout note">
    <div class="callout-header">
      <span class="callout-icon">📌</span>
      <span>إن كان التصميم مكتملًا بالفعل</span>
    </div>
    <p class="leading-7">
      لا تعِد توليد الشاشات في Stitch. استخدم الرحلة لمراجعة المخرجات الموجودة وسد النواقص فقط،
      ثم انتقل مباشرة إلى فحص المشروع وخطة Frontend. إعادة التوليد بلا سبب تهدر الوقت وتُفقد قرارات معتمدة.
    </p>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    كل خطوة من هذه الرحلة لها موضوع تفصيلي في الموقع. ستجد في نهاية الجلسة خريطة المواضيع المرتبطة،
    وفي كل قسم رابط للموضوع الذي يشرحه بعمق أكبر.
  </p>
</section>
`;

export const sessionNextjsHtml = `
<section id="nextjs" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">المواضيع 30–33</span>
    <span class="step-pill">React · TypeScript · Tailwind · Next.js App Router</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Next.js من الصفر — ما الذي نحتاجه فعلًا؟</h2>
      <div class="step-subtitle">فهم البنية قبل فتح المشروع وقبل توجيه أي وكيل برمجة</div>
    </div>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو Next.js؟</h3>
  <p class="leading-8 text-[var(--text-muted)]">
    Next.js هو إطار عمل مبني على React لتطوير تطبيقات الويب. يضيف إلى React نظامًا لتنظيم الصفحات والمسارات،
    وطرقًا مختلفة لعرض المحتوى، وإمكانات لبناء تطبيقات متكاملة.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>الأداة</th><th>دورها في مشروعك</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>React</strong></td><td>بناء الواجهات والمكونات التفاعلية</td></tr>
        <tr><td><strong>Next.js</strong></td><td>التوجيه والصفحات وLayouts والعرض والأدوات المساندة</td></tr>
        <tr><td><strong>Tailwind CSS + TypeScript</strong></td><td>تنسيق الواجهات وضبط أنواع البيانات</td></tr>
      </tbody>
    </table>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    مثال: إذا كان مشروعك منصة تعليمية، فإن React يساعدك على بناء بطاقة الدورة وزر التسجيل،
    بينما يتيح Next.js تنظيم صفحات مثل <code>/courses</code> و<code>/courses/123</code> وتحديد التخطيطات المشتركة بينها.
  </p>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">2. ما هو App Router؟</h3>
  <p class="leading-8 text-[var(--text-muted)]">
    يوفر Next.js نظام توجيه يعتمد على الملفات والمجلدات داخل <code>app/</code> أو <code>src/app/</code>.
    هذا مثال توضيحي للبنية، وليس أمرًا بإعادة ترتيب مشروعك الحالي؛ سنعتمد ما يكشفه الفحص الفعلي.
  </p>

  <div class="code-container">
    <div class="code-header"><span class="code-lang">App Router structure</span><button class="copy-btn">نسخ</button></div>
    <pre class="code-content"><code>my-project/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── courses/
│   │   │   └── page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   ├── features/
│   ├── lib/
│   └── types/
├── package.json
├── tsconfig.json
└── next.config.ts</code></pre>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">ما وظيفة كل ملف؟</h3>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr><th>العنصر</th><th>الوظيفة</th></tr>
      </thead>
      <tbody>
        <tr><td><code>app/page.tsx</code></td><td>الصفحة الرئيسية للمسار <code>/</code></td></tr>
        <tr><td><code>app/courses/page.tsx</code></td><td>صفحة <code>/courses</code></td></tr>
        <tr><td><code>app/layout.tsx</code></td><td>التخطيط الجذري المشترك، مثل الخطوط و<code>html</code> و<code>body</code></td></tr>
        <tr><td><code>courses/[id]/page.tsx</code></td><td>صفحة ديناميكية مثل <code>/courses/123</code></td></tr>
        <tr><td><code>loading.tsx</code></td><td>واجهة تحميل للمسار عند الحاجة</td></tr>
        <tr><td><code>error.tsx</code></td><td>واجهة لمعالجة أخطاء جزء من شجرة المسار</td></tr>
        <tr><td><code>not-found.tsx</code></td><td>واجهة لحالة عدم العثور على الصفحة</td></tr>
        <tr><td><code>components/</code></td><td>مكونات قابلة لإعادة الاستخدام</td></tr>
        <tr><td><code>lib/</code></td><td>وظائف مساعدة وتهيئة خدمات مشتركة</td></tr>
        <tr><td><code>types/</code></td><td>تعريفات TypeScript عند اعتماد هذا التنظيم</td></tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">3. الفرق بين App Router وPages Router</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li><strong>App Router:</strong> يعتمد على مجلد <code>app/</code>، ويدعم Server Components وClient Components وLayouts المتداخلة.</li>
    <li><strong>Pages Router:</strong> يعتمد على مجلد <code>pages/</code>، وهو نظام توجيه أقدم لا يزال مدعومًا.</li>
  </ul>
  <p class="leading-8 text-[var(--text-muted)] mt-3">
    إذا وجدت مجلد <code>app</code>، فهذا مؤشر على App Router، لكن يجب فحص ملفات المشروع ومساراته للتأكد من النظام
    المستخدم فعليًا. بعض المستودعات تحتوي على النظامين معًا خلال انتقال تدريجي.
  </p>

  <div class="callout note">
    <div class="callout-header"><span class="callout-icon">🔎</span><span>لا تفترض — افحص</span></div>
    <p class="leading-7">
      وجود <code>app/</code> لا يكفي للحكم. افحص <code>package.json</code> و<code>next.config</code> وملفات التوجيه،
      ثم اكتب في تقرير الفحص: «App Router» أو «Pages Router» أو «مختلط» مع الملفات التي تثبت ذلك.
    </p>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">4. Server Components وClient Components</h3>
  <p class="leading-8 text-[var(--text-muted)]">
    في App Router، المكونات تكون Server Components افتراضيًا، ما لم تُحدَّد حدود عميل باستخدام <code>&quot;use client&quot;</code>.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>النوع</th><th>متى تستخدمه؟</th><th>أمثلة</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Server Component</strong></td>
          <td>لعرض محتوى الصفحة وتجميع الواجهة والعمل الذي لا يحتاج إلى تفاعل مباشر داخل المتصفح.</td>
          <td>صفحة معلومات، قائمة عناصر ثابتة، هيكل الصفحة.</td>
        </tr>
        <tr>
          <td><strong>Client Component</strong></td>
          <td>عندما تحتاج الواجهة إلى state أو أحداث المستخدم أو APIs خاصة بالمتصفح.</td>
          <td>قائمة منسدلة تفاعلية، عدّاد، نموذج يتحقق من المدخلات لحظيًا.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="code-container">
    <div class="code-header"><span class="code-lang">app/components/Counter.tsx</span><button class="copy-btn">نسخ</button></div>
    <pre class="code-content"><code>&quot;use client&quot;;

import { useState } from &quot;react&quot;;

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;button onClick={() =&gt; setCount((value) =&gt; value + 1)}&gt;
      العدد: {count}
    &lt;/button&gt;
  );
}</code></pre>
  </div>

  <div class="callout mistake">
    <div class="callout-header"><span class="callout-icon">🚫</span><span>لا تضف &quot;use client&quot; إلى كل ملف تلقائيًا</span></div>
    <p class="leading-7">
      استخدمه عندما تتطلب المكونات ذلك. الإفراط فيه قد يزيد حجم JavaScript المرسل للمتصفح،
      ويفقدك مزايا العرض على الخادم. القاعدة: ابدأ بـ Server Component، وأضف حدود العميل عند الحاجة الفعلية.
    </p>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل الكامل راجع المواضيع:
    <a href="/learn/typescript-types" class="font-bold text-[var(--primary)] hover:underline">TypeScript</a>،
    <a href="/learn/react-components-state" class="font-bold text-[var(--primary)] hover:underline">React</a>،
    <a href="/learn/tailwind-css-responsive" class="font-bold text-[var(--primary)] hover:underline">Tailwind CSS</a>،
    و<a href="/learn/nextjs-app-router" class="font-bold text-[var(--primary)] hover:underline">Next.js App Router</a>.
  </p>
</section>
`;

export const sessionAuditHtml = `
<section id="audit" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوعان 24–25</span>
    <span class="step-pill">فحص المشروع قبل التعديل</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">لا تبدأ بتحسين الكود قبل أن تعرف ما الموجود بالفعل</h2>
      <div class="step-subtitle">القاعدة الذهبية: الفحص أولًا، والتقرير قبل التعديل</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    افتح مجلد المشروع الذي ربطته بـGitHub داخل أداة البرمجة التي تستخدمها، ثم نفّذ سلسلة البرومبتات التالية بالترتيب.
    لا تسمح للوكيل بتعديل ملف أو تثبيت حزمة في مرحلة الفحص.
  </p>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">ما الذي نفحصه؟</h3>
  <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>إصدارات Framework وReact وTypeScript والتنسيق من ملفات المشروع الفعلية.</li>
    <li>نظام التوجيه: App Router أو Pages Router أو مختلط.</li>
    <li>مدير الحزم وملفات القفل والسكربتات والإعدادات.</li>
    <li>المسارات والتخطيطات ومكونات الصفحات والمكونات المشتركة والمزودات.</li>
    <li>Design Tokens والخطوط والأيقونات والأصول وإعداد RTL.</li>
    <li>النماذج والتفاعلات والبيانات التجريبية وتدفق البيانات.</li>
    <li>الاختبارات وLinting وType Checking وإعداد البناء.</li>
    <li>حالة Git والتعديلات غير المحفوظة، إن توفر الطرفية.</li>
    <li>التنقل المعطّل والعناصر المؤقتة والمكونات المكررة ومخاطر الوصول والتجاوب.</li>
    <li>حالات التحميل والفراغ والخطأ والنجاح الناقصة.</li>
  </ol>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 1 — فحص شامل للمستودع</h3>
      <span class="step-pill">Inline · لا تعديل</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      الهدف: معرفة حالة المشروع دون تعديل الكود. استخدمه في وكيل يقرأ المستودع فعليًا، واطلب أدلة من الملفات.
    </p>
    <div class="code-container" id="prompt-repo-audit">
      <div class="code-header"><span class="code-lang">PROMPT 01 — Repository Audit</span><button class="copy-btn">نسخ</button></div>
      <pre class="code-content"><code>Act as a Senior Next.js Architect and Frontend Auditor.

This repository already contains an existing Next.js project generated using Google AI Studio and connected to GitHub.

Your task is to AUDIT the existing repository before any implementation.

STRICT RULES:
- Do not recreate the project.
- Do not migrate frameworks.
- Do not modify application code.
- Do not install, remove, or upgrade packages.
- Do not overwrite existing documentation.
- Do not assume the project structure; inspect it.
- Do not claim a command passed unless you executed it.

Inspect and report:
1. Framework, React, TypeScript, and styling versions from actual project files.
2. App Router, Pages Router, or mixed routing.
3. Package manager, lockfiles, scripts, and configuration.
4. Existing routes, layouts, page components, shared components, and providers.
5. Design tokens, fonts, icons, assets, and RTL configuration.
6. Existing forms, interactions, mock data, and data flow.
7. Tests, linting, type checking, and build setup.
8. Git status and uncommitted changes, if terminal access is available.
9. Broken navigation, obvious placeholders, duplicated components, accessibility risks, and responsive risks.
10. Missing loading, empty, error, and success states.

Use repository evidence for every finding. Separate confirmed facts from assumptions and items that could not be verified.

Create docs/PROJECT_AUDIT.md only after checking whether it already exists. If it exists, do not overwrite it; propose a safe update or use a new dated report.

Finish with:
- Current architecture summary.
- Critical findings.
- Items that are already working.
- The safest first improvement.
- Commands actually executed and their real results.

Do not implement fixes yet.</code></pre>
    </div>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">ماذا نراجع في النتيجة؟</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>هل اكتشف إصدار Next.js من <code>package.json</code> فعلًا؟</li>
    <li>هل فحص ملفات التوجيه بدل افتراض أن المشروع يستخدم App Router؟</li>
    <li>هل ميّز بين مشكلة مؤكدة ومشكلة محتملة؟</li>
    <li>هل حافظ على الكود كما هو؟</li>
    <li>هل ذكر الاختبارات التي شغّلها فعلًا؟</li>
  </ul>

  <div class="callout warning">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>تقرير عام دون ملفات = تقرير غير معتمد</span></div>
    <p class="leading-7">
      إذا أعطاك التقرير وصفًا عامًا دون ذكر ملفات المشروع، لا تعتمد عليه؛ اطلب منه أدلة من الملفات.
      التقرير الجيد يذكر المسار والملف والسطر أو الأمر الذي يثبت الاستنتاج.
    </p>
  </div>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 2 — فحص سلامة المشروع قبل العمل</h3>
      <span class="step-pill">Inline · لا تغيير</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      بعد قراءة تقرير الفحص وحالة Git، استخدم هذا البرومبت لتحديد ما يمكن تشغيله بأمان وما هو محجوب.
    </p>
    <div class="code-container" id="prompt-project-health">
      <div class="code-header"><span class="code-lang">PROMPT 02 — Project Health Check</span><button class="copy-btn">نسخ</button></div>
      <pre class="code-content"><code>Act as a Senior Frontend QA Engineer.

Read docs/PROJECT_AUDIT.md and inspect the current Git working tree.

Do not change any files.

Determine:
1. Whether there are uncommitted user changes.
2. Whether the project has the expected package manager and lockfile.
3. Which scripts exist for development, linting, type checking, testing, and production build.
4. Which checks can safely be run without installing packages or changing the lockfile.
5. Whether dependencies are already available locally.
6. Which checks are blocked and why.

If safe and supported, run the relevant existing checks individually. Do not invent scripts. Do not run destructive Git commands. Do not reset, clean, checkout over, or discard user changes.

Report every command and its actual exit status. Separate passed, failed, skipped, and blocked checks.

Recommend the minimum safe verification sequence for this repository. Do not implement fixes.</code></pre>
    </div>
  </div>

  <div class="callout note">
    <div class="callout-header"><span class="callout-icon">🧪</span><span>وجود أمر build لا يعني أنه نجح</span></div>
    <p class="leading-7">
      يجب تشغيله فعليًا، وكذلك التمييز بين فشل الكود ومشكلة نقص الحزم أو البيئة.
      ولا تنسخ نتيجة قديمة من تقرير سابق؛ شغّل الأمر في الحالة الحالية وسجّل الناتج.
    </p>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل: <a href="/learn/ai-coding-agent" class="font-bold text-[var(--primary)] hover:underline">وكيل البرمجة بالذكاء الاصطناعي</a>
    و<a href="/learn/google-ai-studio" class="font-bold text-[var(--primary)] hover:underline">Google AI Studio</a>.
  </p>
</section>
`;

export const sessionStitchHtml = `
<section id="stitch" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">المواضيع 18–23</span>
    <span class="step-pill">Google Stitch · تصميم قابل للتنفيذ</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">سلسلة برومبتات Google Stitch</h2>
      <div class="step-subtitle">تسعة مواضع تحوّل مشروعك الحقيقي إلى تصميم واضح قابل للتنفيذ</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    هذه المرحلة تأتي بعد التحليل، وتستهدف تحويل مشروعك الحقيقي إلى تصميم واضح قابل للتنفيذ،
    لا إلى مجموعة صور منفصلة. إذا كان التصميم قد اكتمل في المحاضرة السابقة، لا تعِد توليده؛
    استخدم السلسلة لمراجعة المخرجات الموجودة وسد النواقص فقط.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>#</th><th>الموضع</th><th>المخرج</th></tr>
      </thead>
      <tbody>
        <tr><td>01</td><td>Project Analysis</td><td>فهم الفكرة والمستخدمين والوظائف</td></tr>
        <tr><td>02</td><td>UX Blueprint</td><td>رحلات المستخدم والتنقل</td></tr>
        <tr><td>03</td><td>Screen Inventory</td><td>قائمة الشاشات وحالاتها</td></tr>
        <tr><td>04</td><td>Design System</td><td>الهوية والمكونات وقواعد RTL</td></tr>
        <tr><td>05</td><td>Master Prompt</td><td>تثبيت السياق البصري في Stitch</td></tr>
        <tr><td>06</td><td>Screen Prompts</td><td>تصميم الشاشات تدريجيًا</td></tr>
        <tr><td>07</td><td>Prototype</td><td>ربط الشاشات واختبار الرحلات</td></tr>
        <tr><td>08</td><td>UX Audit</td><td>مراجعة التصميم وإصلاح العيوب</td></tr>
        <tr><td>09</td><td>DESIGN.md</td><td>تسليم مواصفات التصميم للمطور</td></tr>
      </tbody>
    </table>
  </div>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 3 — تحليل المشروع وتجهيز Design Brief</h3>
      <span class="step-pill">Inline · موضع 01</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      لماذا نبدأ بهذا؟ لأن جودة التصميم تعتمد على فهم المنتج. لو طلبنا من Stitch تصميم شاشة لوحة تحكم
      قبل أن نحدد المستخدم الذي سيستخدمها، فقد نحصل على تصميم جميل لكنه غير مناسب للوظيفة.
    </p>
    <div class="code-container" id="prompt-design-brief">
      <div class="code-header"><span class="code-lang">PROMPT 03 — Project Design Brief</span><button class="copy-btn">نسخ</button></div>
      <pre class="code-content"><code>Act as a Senior Product Designer and UX Strategist.

Analyze my actual project using the existing PRD, SRS, requirements, repository documentation, and approved UI designs.

Do not invent a different product. If a critical fact is missing, identify it explicitly.

Produce a project-specific design brief covering:
1. Product purpose and main problem.
2. Target users and their primary goals.
3. User roles and permissions only when supported by the requirements.
4. MVP features and explicit exclusions.
5. Main user journeys.
6. Existing screens and missing screens.
7. Navigation model.
8. Arabic/English language requirements and RTL/LTR behavior.
9. Accessibility and responsive requirements.
10. Existing design decisions that must be preserved.

Save the result as docs/PROJECT_CONTEXT.md if that file does not already exist. Do not overwrite existing files.

Include a section named &quot;Open Questions&quot; for unresolved decisions. Do not design screens or modify application code yet.</code></pre>
    </div>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">البرومبتات 4–11: من الرحلات إلى DESIGN.md</h3>
  <p class="leading-8 text-[var(--text-muted)]">
    هذه البرومبتات موجودة كاملة في مكتبة البرومبتات، مع مدخلاتها ومخرجاتها وتحذيراتها.
    افتح كل برومبت من رابطه، ثم استخدمه بعد اعتماد الخطوة السابقة — لا تشغّل السلسلة دفعة واحدة.
  </p>

  <div class="grid gap-3 sm:grid-cols-2 my-5">
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 4 · UX Blueprint</span>
      <h4 class="font-black mt-2 mb-1">رحلات المستخدم والتنقل</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">حوّل المتطلبات إلى رحلات أولية وثانوية وحالات فراغ وخطأ ونجاح، مع مخطط Mermaid لكل رحلة مهمة.</p>
      <a href="/prompts/prompt-15-ux-blueprint-screen-inventory" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 15 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 5 · Screen Inventory</span>
      <h4 class="font-black mt-2 mb-1">حصر الشاشات وحالاتها</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">لكل شاشة: المعرّف والاسم والمسار والهدف والمحتوى والأفعال والبيانات والحالات والأولوية.</p>
      <a href="/prompts/prompt-15-ux-blueprint-screen-inventory" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 15 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 6 · Design System</span>
      <h4 class="font-black mt-2 mb-1">نظام تصميم واحد متسق</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">ألوان وخطوط ومسافات وأزرار ونماذج وبطاقات وحالات، مع RTL وقواعد وصول وتباين.</p>
      <a href="/prompts/prompt-17-stitch-design-system" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 17 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 7 · Master Prompt</span>
      <h4 class="font-black mt-2 mb-1">تثبيت السياق البصري</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">مرجع واحد لتوجيه بقية الشاشات: الأهداف والقيود واعتماد الرحلة الأساسية قبل التوسع.</p>
      <a href="/prompts/prompt-16-project-specific-stitch-master-prompt-generator" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 16 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 8 · Screen Prompt</span>
      <h4 class="font-black mt-2 mb-1">برومبت لكل شاشة</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">أنشئ الشاشة الأولى، راجعها، ثم استخدم القالب للشاشة التالية، دون توليد عشرات الشاشات دفعة واحدة.</p>
      <a href="/prompts/prompt-18-generate-one-prompt-per-screen" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 18 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 9 · Prototype</span>
      <h4 class="font-black mt-2 mb-1">ربط الشاشات واختبار الرحلات</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">اربط كل فعل أساسي بالشاشة أو الحالة التالية، وسجّل الانتقالات الناقصة أو الخاطئة.</p>
      <a href="/prompts/prompt-20-stitch-prototype" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 20 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 10 · UX Audit</span>
      <h4 class="font-black mt-2 mb-1">فحص التصميم قبل البرمجة</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">قيّم الاكتمال والتنقل والهرمية والتجاوب وRTL والوصول والنماذج والحالات، واقترح إصلاحات دقيقة فقط.</p>
      <a href="/prompts/prompt-21-visual-ux-audit" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 21 كاملًا ←</a>
    </div>
    <div class="step-card m-0">
      <span class="step-pill">البرومبت 11 · DESIGN.md</span>
      <h4 class="font-black mt-2 mb-1">تسليم مواصفات التصميم</h4>
      <p class="text-sm leading-7 text-[var(--text-muted)] m-0">وثّق القيم المعتمدة فعلًا فقط، وامنع الوكيل من اختراع نظام تصميم جديد عند التنفيذ.</p>
      <a href="/prompts/prompt-23-extract-design-md-from-stitch" class="inline-block mt-2 text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 23 كاملًا ←</a>
    </div>
  </div>

  <div class="callout warning">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>اطلب الشاشة الأولى، راجعها، ثم أكمل</span></div>
    <p class="leading-7">
      لا تولّد عشرات الشاشات دفعة واحدة قبل اعتماد الهوية والمكونات الأساسية.
      وكل قيمة في <code>DESIGN.md</code> يجب أن تكون مستخرجة من التصميم المعتمد أو موثقة كمصدر آخر؛
      القيم غير المؤكدة تُعلَّم بوضوح ولا تُقدَّم كحقيقة.
    </p>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل راجع
    <a href="/learn/ui-ux-roles-navigation" class="font-bold text-[var(--primary)] hover:underline">أساسيات UI/UX</a>،
    <a href="/learn/ux-blueprint" class="font-bold text-[var(--primary)] hover:underline">UX Blueprint</a>،
    <a href="/learn/screen-inventory" class="font-bold text-[var(--primary)] hover:underline">Screen Inventory</a>،
    <a href="/learn/stitch-reference-screen" class="font-bold text-[var(--primary)] hover:underline">الشاشة المرجعية</a>،
    <a href="/learn/design-system-rules" class="font-bold text-[var(--primary)] hover:underline">قواعد نظام التصميم</a>،
    و<a href="/learn/interactive-prototype" class="font-bold text-[var(--primary)] hover:underline">النموذج التفاعلي</a>.
  </p>
</section>
`;

export const sessionPlanHtml = `
<section id="plan" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 34</span>
    <span class="step-pill">Frontend Planning · Routes &amp; Components &amp; Contracts</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">إعداد خطة Frontend كاملة</h2>
      <div class="step-subtitle">تحويل كل شاشة معتمدة إلى مرحلة ومهمة قابلة للتنفيذ والاختبار</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    بعد اعتماد التصميم، نعود إلى المشروع الموجود في GitHub. لا نفترض أن هيكل المشروع الذي ظهر في Stitch
    مطابق للكود الحالي؛ يجب ربط كل شاشة بمسار ومكون موجود أو مخطط له.
  </p>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">المدخلات الإلزامية</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li><code>docs/PROJECT_AUDIT.md</code> — حالة المشروع الفعلية.</li>
    <li><code>docs/PROJECT_CONTEXT.md</code> — الفكرة والمستخدمون والنطاق.</li>
    <li><code>docs/UX_BLUEPRINT.md</code> — الرحلات والتنقل.</li>
    <li><code>docs/SCREEN_INVENTORY.md</code> — الشاشات وحالاتها.</li>
    <li><code>DESIGN.md</code> — القيم البصرية المعتمدة.</li>
    <li>كود المشروع الحالي ومراجع شاشات Stitch المعتمدة.</li>
  </ul>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">الخطوات الست للخطة</h3>
  <ol class="list-decimal list-inside space-y-3 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li><strong>اربط المشروع الحالي:</strong> وثّق المسارات والتخطيطات والمكونات والتنسيق وإدارة الحالة والأصول والبيانات التجريبية الموجودة.</li>
    <li><strong>اربط التصميم بالكود:</strong> لكل شاشة معتمدة حدّد المسار ومكون الصفحة والمكونات القابلة لإعادة الاستخدام والبيانات والتفاعلات والحالات ومرجع Stitch.</li>
    <li><strong>صمّم المعمارية:</strong> تنظيم المسارات والتخطيطات وحدود الميزات والمكونات المشتركة والأنواع والتوكنز والبيانات التجريبية وحدود Server/Client والتجاوب والوصول.</li>
    <li><strong>قسّم مراحل التنفيذ:</strong> مراحل مرتبة حسب الاعتماديات، لكل مرحلة هدف ونطاق واستثناءات وشاشات وملفات واعتماديات ومخرجات ومعايير قبول وطريقة تحقق.</li>
    <li><strong>اكتب المهام:</strong> كل مهمة صغيرة وقابلة للتحقق ومتتبعة لمتطلب وتصميم معتمد.</li>
    <li><strong>حدّد الجودة:</strong> فحوصات البناء والأنواع وLint والتنقل والنماذج والتجاوب والوصول ومطابقة التصميم والانحدارات، باستخدام أدوات المشروع المتاحة فقط.</li>
  </ol>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">مراحل تنفيذ مقترحة — عدّلها حسب مشروعك</h3>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr><th>المرحلة</th><th>الهدف</th><th>المخرج</th></tr>
      </thead>
      <tbody>
        <tr><td>Phase 01 · Foundation Audit</td><td>تثبيت فهم البنية الموجودة وحل العيوب الحرجة فقط.</td><td>تقرير فحص وقرارات سلامة.</td></tr>
        <tr><td>Phase 02 · Design System</td><td>تطبيق الألوان والخطوط والمكونات المعتمدة.</td><td>توكنز ومكونات أساسية.</td></tr>
        <tr><td>Phase 03 · Shared Layouts</td><td>الترويسة والقائمة والتخطيطات المشتركة.</td><td>هيكل تنقل متسق.</td></tr>
        <tr><td>Phase 04 · Core User Journey</td><td>بناء أهم رحلة استخدام من البداية إلى النهاية.</td><td>رحلة قابلة للتجربة.</td></tr>
        <tr><td>Phase 05 · Remaining MVP Screens</td><td>تنفيذ الشاشات المتبقية حسب الاعتماديات.</td><td>شاشات MVP مكتملة.</td></tr>
        <tr><td>Phase 06 · Interactions &amp; Mock Data</td><td>تفعيل التفاعلات والنماذج والبيانات التجريبية.</td><td>حالات وبيانات typed.</td></tr>
        <tr><td>Phase 07 · Responsive &amp; QA</td><td>اختبارات الجودة والتحسينات النهائية.</td><td>تقرير QA ونتائج فعلية.</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout note">
    <div class="callout-header"><span class="callout-icon">📌</span><span>هذه مراحل توضيحية وليست خطة نهائية</span></div>
    <p class="leading-7">
      الخطة الفعلية يجب أن تنتج من تقرير الفحص والتصميم الموجودين. لا تنسخ الجدول كما هو إذا كان مشروعك
      لا يحتوي على هذه المراحل أو يحتاج ترتيبًا مختلفًا. الأهم أن تكون كل مرحلة قابلة للمراجعة ومترابطة.
    </p>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">المخرجات المطلوبة</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li><code>docs/FRONTEND_PLAN.md</code> — النطاق والقرارات وترتيب التنفيذ والمخاطر.</li>
    <li><code>docs/FRONTEND_TASKS.md</code> — مهام مرقمة صغيرة ومترابطة بملفات محددة.</li>
    <li><code>docs/ROUTES_MAP.md</code> — كل مسار ومكون صفحته ومصدر بياناته وحالاته.</li>
    <li><code>docs/COMPONENT_ARCHITECTURE.md</code> — المكونات الأساسية والمشتركة والمركبة.</li>
    <li><code>docs/FRONTEND_DATA_CONTRACTS.md</code> — أنواع TypeScript وأشكال البيانات التجريبية.</li>
  </ul>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 12 — خطة Frontend كاملة</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      البرومبت الكامل في المكتبة يطلب من الوكيل قراءة الوثائق والكود ومراجع Stitch، ثم إنتاج الملفات الخمسة
      دون تنفيذ ميزة. استخدمه بعد اعتماد التصميم، وقارن الناتج بالخطة الفعلية قبل أي كود.
    </p>
    <div class="flex flex-wrap gap-3">
      <a href="/prompts/prompt-24-frontend-only-next-js-plan" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 24 كاملًا ←</a>
      <a href="/prompts/prompt-31-frontend-phased-implementation-plan" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">أو البرومبت 31 للخطة المرحلية ←</a>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-header"><span class="callout-icon">💡</span><span>أي مرحلة تبدأ بها؟</span></div>
    <p class="leading-7">
      ابدأ بالمرحلة التي أصبحت جاهزة، وتأكد من أن اعتمادياتها مكتملة. لا تبدأ بكل مراحل الخطة معًا،
      ولا تختَر مرحلة تحتاج تصميمًا أو متطلبًا غير محسوم. أفضل أول مرحلة غالبًا هي تثبيت الأساس
      وإصلاح العيوب الحرجة فقط، لأنها تحمي بقية العمل من إعادة البناء.
    </p>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل راجع
    <a href="/learn/frontend-architecture-planning" class="font-bold text-[var(--primary)] hover:underline">تخطيط واجهة المستخدم وهندسة الفرونت إند</a>.
  </p>
</section>
`;

export const sessionSpecKitHtml = `
<section id="spec-kit" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 36</span>
    <span class="step-pill">Spec Kit · مواصفة ثم خطة ثم مهام ثم تنفيذ</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Spec Kit — كيف نحوّل الخطة إلى تنفيذ؟</h2>
      <div class="step-subtitle">دورة واحدة لميزة واحدة، لا مشروع كامل في موجة أوامر</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    Spec Kit هو أسلوب وأدوات للتطوير الموجّه بالمواصفات (Spec-Driven Development). بدل أن تقول للوكيل
    «ابنِ المنصة كاملة»، تحدد له ميزة واحدة، وتكتب مواصفاتها، وتخطط لتنفيذها، وتقسمها إلى مهام،
    ثم تتحقق من التنفيذ.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>المرحلة</th><th>السؤال الذي تجيب عنه</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Constitution</strong></td><td>قواعد هندسة المشروع وحدوده.</td></tr>
        <tr><td><strong>Specify</strong></td><td>ماذا يجب أن تفعل الميزة؟</td></tr>
        <tr><td><strong>Clarify</strong></td><td>حل الغموض والنواقص.</td></tr>
        <tr><td><strong>Plan</strong></td><td>كيف سننفذها تقنيًا؟</td></tr>
        <tr><td><strong>Tasks</strong></td><td>تقسيم التنفيذ إلى مهام صغيرة.</td></tr>
        <tr><td><strong>Analyze</strong></td><td>فحص الاتساق بين المواصفات والخطة والمهام.</td></tr>
        <tr><td><strong>Implement</strong></td><td>تنفيذ النطاق المحدد فقط.</td></tr>
        <tr><td><strong>Converge / QA</strong></td><td>فحص الاكتمال والاختبارات وإغلاق الفجوات.</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout note">
    <div class="callout-header"><span class="callout-icon">🧭</span><span>تحقق من الأوامر المثبتة في بيئتك</span></div>
    <p class="leading-7">
      قد تختلف أسماء الأوامر أو طريقة استدعائها باختلاف نسخة Spec Kit والتكامل مع أداة البرمجة.
      لذلك يجب التأكد من الأوامر والمهارات المثبتة في المستودع الحالي قبل تنفيذها.
      لا نفترض أن كل بيئة تدعم الأسماء نفسها، ولا نعلن إنشاء ملف لم يتأكد وجوده.
    </p>
  </div>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 13 — تعريف قواعد المشروع (Constitution)</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      ينفذ مرة واحدة بعد مراجعة آلية Spec Kit في البيئة الحالية، ويُحدّث عند تغيّر القرارات الأساسية.
      الدستور يثبت: الحفاظ على البنية الحالية، اتباع المتطلبات والنطاق، حماية نظام التصميم، TypeScript،
      إعادة استخدام المكونات، حدود Server/Client، التجاوب والوصول، HTML الدلالي، البيانات التجريبية،
      ومنع اختراع API أو قاعدة بيانات أو مصادقة حقيقية.
    </p>
    <a href="/prompts/prompt-27-spec-kit-constitution" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 27 كاملًا ←</a>
  </div>

  <div class="step-card mt-4">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">اختيار أول مرحلة — قبل Specify</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      لا نبدأ بكل مراحل الخطة معًا. نختار المرحلة التي أصبحت جاهزة، ونتأكد من أن اعتمادياتها مكتملة.
      البرومبت يعيد: معرّف المرحلة واسمها، النطاق الدقيق، الشاشات والمكونات، الملفات والمراجع،
      الاعتماديات المكتملة، معايير القبول، خطوات التحقق، وملخص Feature Brief.
    </p>
    <a href="/prompts/prompt-26-select-next-implementation-phase" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 26 كاملًا ←</a>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">دورة الميزة الواحدة</h3>
  <ol class="list-decimal list-inside space-y-3 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li><strong>Specify:</strong> حدّد أهداف المستخدم والشاشات والسلوك والتنقل والتحقق والحالات ومعايير القبول وما هو خارج النطاق. هذه مواصفة Frontend فقط.</li>
    <li><strong>Clarify:</strong> اكشف الغموض والنواقص والمسارات غير الواضحة وسلوك التحقق والحالات غير المحددة والتعارضات. استخدم الوثائق المعتمدة، واترك السؤال مفتوحًا إذا لم تجد مصدرًا.</li>
    <li><strong>Plan:</strong> اكتب خطة تقنية تشمل المكونات والمسارات والملفات والأنواع والبيانات التجريبية وحدود Server/Client والحالات والتجاوب والوصول والاختبارات.</li>
    <li><strong>Tasks:</strong> ولّد مهام صغيرة مرتبة حسب الاعتماديات، لكل مهمة معرّف وهدف ومراجع وملفات واعتماديات ومخرج ومعايير قبول وطريقة تحقق.</li>
    <li><strong>Analyze:</strong> افحص الاتساق: متطلبات بلا مهام، مهام بلا متطلب، تعارض في القبول، اعتماديات ناقصة، حالات غير مغطاة، انحراف في التصميم، أو أعمال Backend أُدرجت خطأً.</li>
    <li><strong>Implement:</strong> نفّذ مهمة واحدة فقط، ثم شغّل الفحوصات، وتحقق من كل معيار قبول، وسجّل الملفات والنتائج، ثم توقف.</li>
    <li><strong>Converge:</strong> راجع الميزة مقابل المواصفة والخطة والمهام و<code>DESIGN.md</code>، وأغلق الفجوات دون توسيع النطاق.</li>
  </ol>

  <div class="callout warning">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>لا تدمج الأوامر في أمر طرفية واحد</span></div>
    <p class="leading-7">
      شغّل كل مرحلة منفصلة، واقرأ ناتجها قبل الانتقال. التنفيذ قبل Analyze قد يبني على مواصفة متناقضة،
      وإصلاح ذلك لاحقًا أغلى من إيقافه الآن.
    </p>
  </div>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبتات 15–20 — دورة الميزة الواحدة</h3>
      <span class="step-pill">موجودة في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      Specify وClarify وPlan وTasks وAnalyze وImplement مجموعة في برومبت Spec Kit لكل ميزة.
      استخدمه داخل الوكيل مع تنفيذ مهمة واحدة في كل دورة، ولا تنفذ البرومبت كاملًا في مرة واحدة إذا كانت البيئة
      لا تدعم ذلك.
    </p>
    <a href="/prompts/prompt-28-spec-kit-per-feature" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 28 كاملًا ←</a>
  </div>

  <div class="step-card mt-4">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 21 — Converge وإغلاق المرحلة</h3>
      <span class="step-pill">Inline · لا توسيع للنطاق</span>
    </div>
    <div class="code-container" id="prompt-converge">
      <div class="code-header"><span class="code-lang">PROMPT 21 — Converge the feature</span><button class="copy-btn">نسخ</button></div>
      <pre class="code-content"><code>Review the completed current frontend feature against its approved specification, implementation plan, tasks, and DESIGN.md.

Verify:
- All acceptance criteria.
- Navigation and interactive behavior.
- Responsive behavior.
- RTL/LTR behavior where applicable.
- Accessibility basics.
- Loading, empty, error, and success states.
- No unintended regressions.
- No unrelated files or features changed.
- Relevant tests, lint, type checks, and build where available.

Run only commands supported by the actual project. Report the exact results; do not claim a check passed if it was not run.

Produce:
- Completed tasks.
- Uncompleted tasks and reasons.
- Changed files.
- Known limitations.
- Verification results.
- Remaining UX issues.
- Next recommended phase.

Do not expand scope. If acceptance criteria fail, identify the smallest corrective task rather than rewriting the feature.</code></pre>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل راجع
    <a href="/learn/spec-kit-workflow" class="font-bold text-[var(--primary)] hover:underline">تنظيم المواصفات وتطوير الميزات بـ Spec Kit</a>.
  </p>
</section>
`;

export const sessionQualityHtml = `
<section id="ux-pro-max" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 35</span>
    <span class="step-pill">UI/UX Pro Max · مراجعة قبل الكود وبعده</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">تطبيق UI/UX Pro Max قبل كتابة الكود</h2>
      <div class="step-subtitle">مهارة مراجعة، وليست بديلًا عن تصميم Stitch المعتمد</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    UI/UX Pro Max مهارة مساعدة لقرارات الواجهة وتجربة المستخدم. هي ليست بديلًا عن تصميم Stitch المعتمد،
    ولا أداة تولّد كل الشاشات تلقائيًا بمجرد تثبيتها. نستعملها لمراجعة المرحلة المحددة، ثم ننفذ ضمن التصميم المعتمد.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>الموضع</th><th>ما تراجعه</th><th>المخرج</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>قبل التنفيذ</strong></td>
          <td>التخطيط وهرمية المعلومات وفرص إعادة استخدام المكونات والخطوط والمسافات والتجاوب والوصول وأنماط النماذج والحالات وRTL/LTR والاتساق مع نظام التصميم.</td>
          <td>ملاحظات مدعومة بالمشروع وقائمة تحقق مركزة.</td>
        </tr>
        <tr>
          <td><strong>بعد التنفيذ</strong></td>
          <td>الهرمية البصرية والمسافات والمكونات والتجاوب وRTL والوصول والتباين ووضوح التنقل وCTA وملاحظات النماذج والحالات.</td>
          <td>مشكلات Critical وMajor وMinor مع أصغر إصلاح مستهدف.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout warning">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>لا تستبدل الهوية المعتمدة</span></div>
    <p class="leading-7">
      إذا تعارضت توصية من UI/UX Pro Max مع <code>DESIGN.md</code> المعتمد، احتفظ بالتصميم المعتمد
      وسجّل التعارض. المهارة تضبط الاتساق والتباين والوصول، ولا تعيد تصميم العلامة من تلقاء نفسها.
    </p>
  </div>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 14 — مراجعة UX للمرحلة</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      استخدمه بعد اختيار المرحلة وقبل تنفيذها. يقرأ Feature Brief و<code>DESIGN.md</code> ومراجع Stitch
      والخطة والمكونات الحالية، ثم يعيد ملاحظات وتوصيات وتحذيرات تعارض وقائمة تحقق للتنفيذ.
      لا يعدل الملفات ولا يعيد تصميم شاشات غير مرتبطة.
    </p>
    <a href="/prompts/prompt-25-ui-ux-pro-max-review-before-coding" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 25 كاملًا ←</a>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">قائمة مراجعة مركزة</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>هل لكل شاشة هدف واحد واضح وCTA أساسي مرئي؟</li>
    <li>هل التباعد والخطوط متسقة مع <code>DESIGN.md</code>؟</li>
    <li>هل المكونات مشتركة حيث يجب، وغير مكررة بلا سبب؟</li>
    <li>هل تعمل الواجهة على 390 و768 و1024 و1440px دون Overflow؟</li>
    <li>هل RTL/LTR مصقولان، والأكواد والروابط التقنية في اتجاه LTR؟</li>
    <li>هل التركيز بلوحة المفاتيح واضح، والعناصر الدلالية صحيحة؟</li>
    <li>هل النماذج تعرض التحقق والخطأ والنجاح والتعطيل؟</li>
    <li>هل حالات Loading وEmpty وError وSuccess موجودة حيث تلزم؟</li>
  </ul>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل راجع
    <a href="/learn/ui-ux-pro-max-review" class="font-bold text-[var(--primary)] hover:underline">مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max</a>.
  </p>
</section>

<section id="implementation" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 37</span>
    <span class="step-pill">تنفيذ مهمة واحدة · فحص · توثيق</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">تنفيذ Task واحدة فقط</h2>
      <div class="step-subtitle">حلقة قصيرة قابلة للمراجعة بدل بناء الواجهة كاملة في محاولة واحدة</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    لا نطلب من الوكيل بناء كل شيء. نختار المهمة التالية المعلّمة Ready، وننفذها، ونتحقق منها،
    ثم نسجّل النتيجة. إذا فشلت، نصلح المشكلة المحددة بدل إعادة بناء الصفحة كاملة.
  </p>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">قبل التعديل</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>افحص حالة Git الحالية، ولا تبدأ فوق تعديلات مستخدم غير محفوظة.</li>
    <li>اقرأ المواصفة والخطة والمهام و<code>DESIGN.md</code>.</li>
    <li>اقرأ مراجعة UI/UX Pro Max للمرحلة.</li>
    <li>افحص المكونات الحالية ومراجع Stitch المعتمدة.</li>
    <li>اذكر معايير القبول قبل التعديل.</li>
  </ul>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">أثناء التنفيذ</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>حافظ على بنية Next.js الحالية.</li>
    <li>أعد استخدام المكونات حيث يلزم.</li>
    <li>طابق التصميم المعتمد ولا تخترع هوية جديدة.</li>
    <li>ابقَ داخل المهمة المحددة.</li>
    <li>استخدم بيانات تجريبية typed عند الحاجة.</li>
    <li>حافظ على التجاوب والوصول.</li>
    <li>لا تبنِ Backend ولا تعدّل شاشات غير مرتبطة.</li>
  </ul>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">بعد التنفيذ</h3>
  <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>شغّل الفحوصات الموجودة في المشروع فقط.</li>
    <li>تحقق من كل معيار قبول.</li>
    <li>اسرد الملفات المتغيرة.</li>
    <li>سجّل نتائج الأوامر الفعلية.</li>
    <li>حدّد المشكلات المتبقية.</li>
    <li>حدّد المهمة التالية المعلقة.</li>
  </ol>

  <div class="callout mistake">
    <div class="callout-header"><span class="callout-icon">🚫</span><span>لا تعلن مهمة مكتملة دون دليل</span></div>
    <p class="leading-7">
      لا تعلن أن مهمة اكتملت إلا إذا كان الكود والتحقق يدعمان ذلك. ولا تدّع نجاح فحص لم يُنفّذ،
      ولا browser testing لم تستخدم فيه متصفحًا أو اختبارًا مكافئًا.
    </p>
  </div>

  <div class="step-card mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 20 — تنفيذ المهمة التالية</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      استخدم برومبت Spec Kit لكل ميزة، مع تحديد المهمة التالية فقط. ينفذ الوكيل مهمة واحدة،
      ثم يشغّل الفحوصات ويعيد تقريرًا بالملفات والنتائج، ثم يتوقف.
    </p>
    <a href="/prompts/prompt-28-spec-kit-per-feature" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 28 كاملًا ←</a>
  </div>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">Git بأمان</h3>
  <p class="leading-8 text-[var(--text-muted)]">
    قبل كل مرحلة، تأكد من حالة Git. لا تستخدم أوامر مثل <code>git reset --hard</code> أو <code>git clean -fd</code>
    لإزالة المشاكل دون فهمها؛ فقد تحذف تعديلات مهمة.
  </p>
  <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>افحص حالة المستودع.</li>
    <li>راجع التعديلات غير المحفوظة.</li>
    <li>أنشئ فرع عمل مناسبًا بعد التأكد من عدم ضياع أي تعديل.</li>
    <li>نفّذ مهمة واحدة.</li>
    <li>راجع <code>git diff</code>.</li>
    <li>شغّل الفحوصات.</li>
    <li>سجّل التغييرات في Commit واضح عند اعتمادها.</li>
  </ol>

  <div class="step-card mt-6">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">مراجعة التغييرات قبل Commit</h3>
      <span class="step-pill">Inline · لا تنفيذ تلقائي</span>
    </div>
    <div class="code-container" id="prompt-diff-review">
      <div class="code-header"><span class="code-lang">PROMPT — Review the diff before commit</span><button class="copy-btn">نسخ</button></div>
      <pre class="code-content"><code>Review the current Git diff before committing this frontend task.

Check:
- Whether every change belongs to the selected task.
- Whether unrelated user changes are present.
- Whether generated files or secrets were added accidentally.
- Whether lockfiles changed unexpectedly.
- Whether DESIGN.md and the feature specification are respected.
- Whether any implementation or test files are missing.

Do not stage, commit, discard, reset, or clean anything automatically.

Report the relevant changed files, suspicious changes, and recommended next action. Preserve all existing user work.</code></pre>
    </div>
  </div>

  <div class="step-card mt-4">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 22 — Frontend QA شامل</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      افحص المسارات والتنقل والأزرار والنماذج والحالات والتجاوب وRTL والوصول وTypeScript وLint واختبارات
      والبناء الفعلي ومطابقة التصميم والانحدارات. افصل العيوب المؤكدة عن المخاطر غير المؤكدة.
    </p>
    <a href="/prompts/prompt-29-final-frontend-qa" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 29 كاملًا ←</a>
  </div>

  <div class="step-card mt-4">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="text-lg font-black text-[var(--text-main)] m-0">البرومبت 23 — مراجعة UI/UX بعد التنفيذ</h3>
      <span class="step-pill">موجود في المكتبة</span>
    </div>
    <p class="text-sm leading-7 text-[var(--text-muted)]">
      أعد استخدام مراجعة UI/UX Pro Max بعد التنفيذ، مع تصنيف المشكلات Critical وMajor وMinor،
      واقتراح أصغر إصلاح مستهدف لكل مشكلة. لا تعِد تصميم الشاشات غير المرتبطة.
    </p>
    <a href="/prompts/prompt-25-ui-ux-pro-max-review-before-coding" class="inline-block text-sm font-bold text-[var(--primary)] hover:underline">افتح البرومبت 25 كاملًا ←</a>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    للتفصيل راجع
    <a href="/learn/frontend-incremental-implementation" class="font-bold text-[var(--primary)] hover:underline">التنفيذ التدريجي للفرونت إند وحالات الواجهة</a>.
  </p>
</section>
`;

export const sessionClosingHtml = `
<section id="example" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مثال تطبيقي مصغّر</h2>
      <div class="step-subtitle">كيف ننفذ رحلة واحدة دون طلب المشروع كله؟</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    لنفترض أن مشروعك منصة تعليمية، ولدينا تصميم معتمد لقائمة الدورات. لا نطلب من الوكيل بناء كل شيء.
    هذه مهام صغيرة متتابعة؛ عدّل أسماء الملفات والمسارات حسب مشروعك الحقيقي.
  </p>

  <div class="table-container my-4">
    <table class="data-table">
      <thead>
        <tr><th>المهمة</th><th>الفعل</th><th>التحقق</th></tr>
      </thead>
      <tbody>
        <tr><td>A</td><td>افحص المسار الحالي وتأكد من وجود الصفحة ومكوناتها، وحدّد ما يمكن إعادة استخدامه.</td><td>قائمة ملفات ومكونات قابلة لإعادة الاستخدام.</td></tr>
        <tr><td>B</td><td>طبّق المكونات المعتمدة: البطاقات والأزرار والألوان والخطوط من <code>DESIGN.md</code>.</td><td>مطابقة بصرية وعدم إدخال هوية جديدة.</td></tr>
        <tr><td>C</td><td>نفّذ البحث والتصفية ببيانات تجريبية Typed Mock Data إذا كان ذلك ضمن المتطلبات.</td><td>حالة فراغ وحالة نتائج وحالة مسح الفلاتر.</td></tr>
        <tr><td>D</td><td>أضف حالات الواجهة واختبر الجوال والتنقل.</td><td>390 و768 و1440px دون Overflow.</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout tip">
    <div class="callout-header"><span class="callout-icon">💡</span><span>بعد كل مهمة</span></div>
    <p class="leading-7">
      راجع النتيجة. إذا نجحت، انتقل إلى المهمة التالية. وإذا فشلت، أصلح المشكلة المحددة
      بدل إعادة بناء الصفحة كاملة. هذا هو الفرق بين التنفيذ التدريجي وإعادة المحاولة العشوائية.
    </p>
  </div>
</section>

<section id="checklist" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">قائمة فحص قبل اعتماد المشروع</h2>
      <div class="step-subtitle">استخدمها في نهاية كل مرحلة، وليس فقط قبل التسليم</div>
    </div>
  </div>

  <div class="checklist-card">
    <div class="checklist-title">
      <span>✅ قائمة الاعتماد</span>
      <span class="checklist-counter">0 / 10 محدد ذاتيًا</span>
    </div>
    <label class="checklist-item"><input type="checkbox" /><span>تمت مراجعة المتطلبات والمواصفات.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>التصميم يطابق <code>DESIGN.md</code> والمراجع المعتمدة.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>كل المسارات والأزرار ضمن النطاق تعمل كما هو متوقع.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>تمت مراجعة حالات التحميل والفراغ والخطأ والنجاح عند الحاجة.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>الواجهة متجاوبة مع أحجام الشاشات المطلوبة.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>تمت مراجعة RTL/LTR عند الحاجة.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>لم تتم إضافة Backend أو ميزات خارج النطاق.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>تمت مراجعة Git diff والتغييرات غير المقصودة.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>تم تشغيل الفحوصات المتاحة وتوثيق نتائجها الفعلية.</span></label>
    <label class="checklist-item"><input type="checkbox" /><span>تم تحديث حالة المهام وتحديد الخطوة التالية.</span></label>
  </div>

  <div class="callout note">
    <div class="callout-header"><span class="callout-icon">💾</span><span>حفظ محلي فقط</span></div>
    <p class="leading-7">
      تُحفظ الاختيارات في هذا المتصفح على هذا الجهاز، وتُفقد عند مسح بيانات المتصفح،
      ولا تنتقل إلى متصفح آخر. هي أداة تقييم ذاتي، وليست شهادة إتمام أو تقييمًا رسميًا.
    </p>
  </div>
</section>

<section id="assignment" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">التكليف العملي للمتدربين</h2>
      <div class="step-subtitle">طبّق الخطوات على مشروعك الحقيقي، وليس على مشروع جديد</div>
    </div>
  </div>

  <ol class="list-decimal list-inside space-y-3 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>تنفيذ فحص المشروع وإنتاج تقرير <code>PROJECT_AUDIT.md</code>.</li>
    <li>مراجعة الشاشات الموجودة في Stitch وإكمال النواقص دون إعادة التصميم بالكامل.</li>
    <li>التأكد من وجود <code>DESIGN.md</code> ومراجع الشاشات المعتمدة.</li>
    <li>إنشاء <code>FRONTEND_PLAN.md</code> و<code>FRONTEND_TASKS.md</code> حسب المشروع.</li>
    <li>اختيار مرحلة واحدة جاهزة.</li>
    <li>تنفيذ دورة Spec Kit كاملة لهذه المرحلة.</li>
    <li>استخدام UI/UX Pro Max للمراجعة قبل التنفيذ وبعده.</li>
    <li>تنفيذ أول مهمة فقط، وفحصها، ثم توثيق النتيجة.</li>
  </ol>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">معايير التسليم</h3>
  <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
    <li>تقرير فحص مدعوم بأدلة من المشروع.</li>
    <li>خطة Frontend مرتبطة بالشاشات والمتطلبات.</li>
    <li>مواصفات ومهام للمرحلة المختارة.</li>
    <li>تغيير برمجي محدود يمكن مراجعته.</li>
    <li>نتائج فحوصات حقيقية، مع توضيح أي اختبار تعذّر تشغيله.</li>
  </ul>
</section>

<section id="summary" class="topic-section" style="scroll-margin-top:5.5rem">
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">الخلاصة</h2>
      <div class="step-subtitle">سلاح العصر ليس كتابة أكبر كمية من الكود</div>
    </div>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    الفكرة الأساسية ليست أن نطلب من الذكاء الاصطناعي كتابة أكبر كمية من الكود؛ بل أن نستخدمه ضمن دورة هندسية قابلة للمراجعة:
  </p>

  <div class="callout tip">
    <div class="callout-header"><span class="callout-icon">🔁</span><span>دورة العمل</span></div>
    <p class="leading-8 font-bold" dir="ltr" style="text-align:center">
      Analyze → Design → Plan → Specify → Clarify → Tasks → Implement → Test → Review
    </p>
  </div>

  <p class="leading-8 text-[var(--text-muted)]">
    نحافظ على مشروع Next.js الموجود، ونستفيد من Stitch للتصميم، ومن Spec Kit لتنظيم التنفيذ،
    ومن UI/UX Pro Max لمراجعة جودة الواجهة، مع التحقق من كل نتيجة قبل الانتقال إلى الخطوة التالية.
  </p>

  <h3 class="text-xl font-black text-[var(--text-main)] mt-8 mb-3">أين تذهب الآن؟</h3>
  <div class="flex flex-wrap gap-3">
    <a href="/learn/frontend-architecture-planning" class="rounded-xl bg-[var(--action-bg)] px-4 py-2.5 text-sm font-black text-[var(--action-text)] hover:bg-[var(--action-bg-hover)]">ابدأ بتخطيط الفرونت إند ←</a>
    <a href="/prompts/prompt-24-frontend-only-next-js-plan" class="rounded-xl border border-[var(--border-color)] px-4 py-2.5 text-sm font-black hover:border-[var(--primary)]">افتح برومبت الخطة ←</a>
    <a href="/learn/frontend-incremental-implementation" class="rounded-xl border border-[var(--border-color)] px-4 py-2.5 text-sm font-black hover:border-[var(--primary)]">راجع التنفيذ التدريجي ←</a>
  </div>
</section>
`;

export const STITCH_TO_FRONTEND_SESSION: LearningSession = {
  slug: 'stitch-to-frontend',
  route: '/learn/stitch-to-frontend',
  title: 'من تصميم Stitch إلى Frontend احترافي',
  subtitle: 'جلسة تطبيقية واحدة تربط Next.js وStitch وSpec Kit وUI/UX Pro Max من الفحص إلى أول Task',
  summary:
    'جلسة عملية من ثلاث ساعات تبدأ بمخرجات التصميم المعتمدة، تفحص مشروع Next.js الموجود، تحوّل الشاشات إلى خطة Frontend صغيرة، ثم تنفذ مهمة واحدة فقط وتتحقق منها. الجلسة تجمع المواضيع 18–37 في قراءة واحدة دون تكرارها، وتترك لكل موضوع صفحته التفصيلية.',
  goal:
    'الخروج من الجلسة بتقرير فحص مدعوم، وخطة Frontend ومهام صغيرة، ودورة Spec Kit كاملة لمرحلة واحدة، وتغيير برمجي محدود يمكن مراجعته، مع نتائج فحوصات حقيقية.',
  durationLabel: '3 ساعات',
  levelLabel: 'متوسط إلى متقدم',
  sourceNote:
    'مبنية على المحاضرة السادسة، وتُكمل مخرجات المحاضرة الخامسة. لا تُغيّر هوية المشروع ولا تضيف موضوعًا إلى مسار الـ58 موضوعًا.',
  outcomes: [
    'فهم بنية مشروع Next.js موجود بالفعل والتمييز بين App Router وPages Router.',
    'فحص المشروع قبل التعديل وفصل الحقائق المؤكدة عن الافتراضات.',
    'تحويل شاشات Stitch المعتمدة إلى خطة Frontend قابلة للتنفيذ.',
    'تقسيم المرحلة إلى مواصفة وخطة ومهام صغيرة باستخدام Spec Kit.',
    'مراجعة الواجهة بـ UI/UX Pro Max دون تغيير الهوية المعتمدة.',
    'تنفيذ مهمة واحدة واختبارها وتوثيق نتيجتها الفعلية.',
    'اكتشاف المشكلات مبكرًا قبل أن تتراكم في بقية المشروع.',
    'التمييز الصريح بين نطاق Frontend والخدمات المؤجلة إلى Backend.',
  ],
  prerequisites: [
    'مشروع Next.js موجود ومربوط بـGitHub، مع مخرجات المحاضرة الخامسة: DESIGN.md ومراجع الشاشات المعتمدة.',
    'نسخة من FRONTEND_PLAN.md أو استعداد لإنشائها، ووصول إلى مستودع المشروع في أداة البرمجة.',
    'فهم أساسي لـReact وTypeScript؛ لا يلزم إتقان متقدم، لكن لا تبدأ دون قراءة الكود الموجود.',
    'بيانات المشروع التجريبية أو خطة واضحة لها؛ لا تحتاج Backend حقيقيًا في هذه الجلسة.',
  ],
  deliverables: [
    'docs/PROJECT_AUDIT.md',
    'docs/FRONTEND_PLAN.md',
    'docs/FRONTEND_TASKS.md',
    'docs/ROUTES_MAP.md',
    'docs/COMPONENT_ARCHITECTURE.md',
    'docs/FRONTEND_DATA_CONTRACTS.md',
    'تغيير برمجي محدود لمهمة واحدة',
    'نتائج فحوصات فعلية وتوثيق الخطوة التالية',
  ],
  tableOfContents: [
    { id: 'overview', title: 'لماذا هذه الجلسة؟' },
    { id: 'schedule', title: 'خطة الوقت — 3 ساعات' },
    { id: 'journey', title: 'خريطة الرحلة الكاملة' },
    { id: 'nextjs', title: 'Next.js من الصفر' },
    { id: 'audit', title: 'فحص المشروع قبل التعديل' },
    { id: 'stitch', title: 'سلسلة برومبتات Stitch' },
    { id: 'plan', title: 'خطة Frontend كاملة' },
    { id: 'spec-kit', title: 'Spec Kit خطوة بخطوة' },
    { id: 'ux-pro-max', title: 'UI/UX Pro Max' },
    { id: 'implementation', title: 'تنفيذ مهمة واحدة والجودة' },
    { id: 'example', title: 'مثال تطبيقي مصغّر' },
    { id: 'checklist', title: 'قائمة فحص الاعتماد' },
    { id: 'assignment', title: 'التكليف العملي' },
    { id: 'summary', title: 'الخلاصة' },
  ],
  checklist: [
    'تمت مراجعة المتطلبات والمواصفات.',
    'التصميم يطابق DESIGN.md والمراجع المعتمدة.',
    'كل المسارات والأزرار ضمن النطاق تعمل كما هو متوقع.',
    'تمت مراجعة حالات التحميل والفراغ والخطأ والنجاح عند الحاجة.',
    'الواجهة متجاوبة مع أحجام الشاشات المطلوبة.',
    'تمت مراجعة RTL/LTR عند الحاجة.',
    'لم تتم إضافة Backend أو ميزات خارج النطاق.',
    'تمت مراجعة Git diff والتغييرات غير المقصودة.',
    'تم تشغيل الفحوصات المتاحة وتوثيق نتائجها الفعلية.',
    'تم تحديث حالة المهام وتحديد الخطوة التالية.',
  ],
  assignment: [
    'تنفيذ فحص المشروع وإنتاج تقرير PROJECT_AUDIT.md.',
    'مراجعة الشاشات الموجودة في Stitch وإكمال النواقص دون إعادة التصميم بالكامل.',
    'التأكد من وجود DESIGN.md ومراجع الشاشات المعتمدة.',
    'إنشاء FRONTEND_PLAN.md وFRONTEND_TASKS.md حسب المشروع.',
    'اختيار مرحلة واحدة جاهزة.',
    'تنفيذ دورة Spec Kit كاملة لهذه المرحلة.',
    'استخدام UI/UX Pro Max للمراجعة قبل التنفيذ وبعده.',
    'تنفيذ أول مهمة فقط، وفحصها، ثم توثيق النتيجة.',
  ],
  deliveryCriteria: [
    'تقرير فحص مدعوم بأدلة من المشروع.',
    'خطة Frontend مرتبطة بالشاشات والمتطلبات.',
    'مواصفات ومهام للمرحلة المختارة.',
    'تغيير برمجي محدود يمكن مراجعته.',
    'نتائج فحوصات حقيقية، مع توضيح أي اختبار تعذّر تشغيله.',
  ],
  htmlContent: [
    sessionOverviewHtml,
    sessionNextjsHtml,
    sessionAuditHtml,
    sessionStitchHtml,
    sessionPlanHtml,
    sessionSpecKitHtml,
    sessionQualityHtml,
    sessionClosingHtml,
  ].join('\n'),
  prompts: [
    { id: 'prompt-repo-audit', number: '01', title: 'فحص شامل للمستودع', purpose: 'معرفة حالة المشروع دون تعديل الكود، بأدلة من الملفات.', inline: true },
    { id: 'prompt-project-health', number: '02', title: 'فحص سلامة المشروع قبل العمل', purpose: 'تحديد التعديلات غير المحفوظة والفحوصات الآمنة والمحجوبة.', inline: true },
    { id: 'prompt-design-brief', number: '03', title: 'تحليل المشروع وتجهيز Design Brief', purpose: 'تثبيت الفكرة والمستخدمين والنطاق قبل تصميم أي شاشة.', inline: true },
    { id: 'prompt-ux-blueprint', number: '04', title: 'UX Blueprint', purpose: 'رحلات المستخدم والتنقل والحالات.', librarySlug: 'prompt-15-ux-blueprint-screen-inventory' },
    { id: 'prompt-screen-inventory', number: '05', title: 'Screen Inventory', purpose: 'حصر الشاشات وحالاتها ومدخلاتها وأولوياتها.', librarySlug: 'prompt-15-ux-blueprint-screen-inventory' },
    { id: 'prompt-design-system', number: '06', title: 'نظام التصميم', purpose: 'تعريف المكونات والتوكنز والحالات وقواعد RTL.', librarySlug: 'prompt-17-stitch-design-system' },
    { id: 'prompt-master-prompt', number: '07', title: 'Master Prompt لـStitch', purpose: 'تثبيت السياق البصري قبل توسيع الشاشات.', librarySlug: 'prompt-16-project-specific-stitch-master-prompt-generator' },
    { id: 'prompt-per-screen', number: '08', title: 'برومبت لكل شاشة', purpose: 'تصميم الشاشات واحدة تلو الأخرى دون فقدان الاتساق.', librarySlug: 'prompt-18-generate-one-prompt-per-screen' },
    { id: 'prompt-prototype', number: '09', title: 'ربط Prototype', purpose: 'ربط الأفعال الأساسية بوجهاتها واختبار الرحلات.', librarySlug: 'prompt-20-stitch-prototype' },
    { id: 'prompt-ux-audit', number: '10', title: 'فحص التصميم قبل البرمجة', purpose: 'اكتشاف مشكلات الاكتمال والتنقل والتجاوب والوصول.', librarySlug: 'prompt-21-visual-ux-audit' },
    { id: 'prompt-design-md', number: '11', title: 'إعداد DESIGN.md', purpose: 'توثيق القيم المعتمدة فقط لتسليمها للتنفيذ.', librarySlug: 'prompt-23-extract-design-md-from-stitch' },
    { id: 'prompt-frontend-plan', number: '12', title: 'خطة Frontend كاملة', purpose: 'تحويل الشاشات إلى مسارات ومكونات وعقود ومهام.', librarySlug: 'prompt-24-frontend-only-next-js-plan' },
    { id: 'prompt-constitution', number: '13', title: 'قواعد المشروع (Constitution)', purpose: 'تثبيت قواعد هندسة الفرونت إند قبل التنفيذ.', librarySlug: 'prompt-27-spec-kit-constitution' },
    { id: 'prompt-phase-selection', number: '—', title: 'اختيار أول مرحلة جاهزة', purpose: 'تحديد المرحلة التالية التي اكتملت اعتمادياتها.', librarySlug: 'prompt-26-select-next-implementation-phase' },
    { id: 'prompt-ux-review', number: '14', title: 'مراجعة UX للمرحلة', purpose: 'تدقيق التخطيط والمكونات والحالات قبل الكود.', librarySlug: 'prompt-25-ui-ux-pro-max-review-before-coding' },
    { id: 'prompt-spec-cycle', number: '15–20', title: 'Specify → Clarify → Plan → Tasks → Analyze → Implement', purpose: 'دورة Spec Kit لميزة واحدة، مع تنفيذ مهمة واحدة فقط.', librarySlug: 'prompt-28-spec-kit-per-feature' },
    { id: 'prompt-converge', number: '21', title: 'Converge وإغلاق المرحلة', purpose: 'التحقق من معايير القبول وإغلاق الفجوات دون توسيع النطاق.', inline: true },
    { id: 'prompt-frontend-qa', number: '22', title: 'Frontend QA شامل', purpose: 'فحص المسارات والتفاعلات والحالات والتجاوب والوصول والبناء.', librarySlug: 'prompt-29-final-frontend-qa' },
    { id: 'prompt-post-ux', number: '23', title: 'مراجعة UI/UX بعد التنفيذ', purpose: 'تصنيف المشكلات واقتراح أصغر إصلاح مستهدف.', librarySlug: 'prompt-25-ui-ux-pro-max-review-before-coding' },
    { id: 'prompt-diff-review', number: '—', title: 'مراجعة Git diff قبل Commit', purpose: 'منع التغييرات غير المرتبطة أو الأسرار أو ملفات القفل غير المتوقعة.', inline: true },
  ],
  relatedGroups: [
    {
      title: 'التجربة وجرد الشاشات',
      topicSlugs: ['ui-ux-roles-navigation', 'ux-blueprint', 'screen-inventory'],
    },
    {
      title: 'Stitch ونظام التصميم',
      topicSlugs: ['stitch-reference-screen', 'design-system-rules', 'interactive-prototype'],
    },
    {
      title: 'أدوات التنفيذ وربط التصميم',
      topicSlugs: ['ai-coding-agent', 'google-ai-studio', 'agent-skills', 'mcp-protocol', 'stitch-mcp-integration', 'design-md-spec'],
    },
    {
      title: 'الأساس التقني',
      topicSlugs: ['typescript-types', 'react-components-state', 'tailwind-css-responsive', 'nextjs-app-router'],
    },
    {
      title: 'التخطيط والتنفيذ والجودة',
      topicSlugs: ['frontend-architecture-planning', 'ui-ux-pro-max-review', 'spec-kit-workflow', 'frontend-incremental-implementation'],
    },
  ],
  previousTopicSlug: 'design-md-spec',
  nextTopicSlug: 'frontend-architecture-planning',
};

