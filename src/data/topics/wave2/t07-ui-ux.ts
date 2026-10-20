import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 18: UI/UX Foundations, Roles & Navigation Architecture
 * Sequence Position: 18
 * ========================================================================= */
export const topic18UiUxHtml = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-18-ui-ux" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 18 · المحطة الأساسية</span>
    <span class="step-pill">هندسة تجربة المستخدم وتوزيع الأدوار</span>
    <span class="status-pill verified">مرجع معتمد: المحاضرة 05</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل</h2>
      <div class="step-subtitle">تحويل متطلبات المنتج إلى هندسة معلومات، توزيع الأدوار، وهياكل تنقل واضحة قبل التصميم المرئي</div>
    </div>
  </div>

  <!-- 1. Architectural Distinction: UI vs UX vs IA -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. التمييز المعماري: ما الفرق بين UI و UX وهندسة المعلومات (IA)؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الخطأ الأكثر شيوعاً بين المبتدئين هو القفز الفوري إلى أدوات الرسم وتلوين الواجهات بمجرد الانتهاء من وثيقة المتطلبات.
      في مسار هندسة البرمجيات المنضبطة، <strong>التصميم ليس مجرد ألوان وأزرار جذابة</strong>، بل هو ترجمة عملية لسلوك المستخدم ومساراته:
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>المفهوم التصميمي</th>
            <th>التعريف والدور في المشروع</th>
            <th>المخرج الهندسي الملموس</th>
            <th>حدود المرحلة الحالية</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>هندسة المعلومات (IA)</strong></td>
            <td>تنظيم المحتوى وتحديد مستويات الصفحات، والتصنيفات، وهيكلية العناوين لتسهيل الوصول للمعلومة.</td>
            <td>شجرة المحتوى ومخطط مسارات الصفحات ومستوياتها.</td>
            <td>تسبق الواجهة المرئية وتحدد أماكن البيانات.</td>
          </tr>
          <tr>
            <td><strong>تجربة المستخدم (UX)</strong></td>
            <td>وضوح الإجراءات، سهولة إتمام المهام، تقليل العبء الذهني، ومعالجة حالات الخطأ والتعافي.</td>
            <td>وثيقة <code>UI_UX_REQUIREMENTS.md</code> ومخطط <code>UX_BLUEPRINT.md</code>.</td>
            <td>تحدد <em>كيف يعمل</em> المنتج ويسلك قبل رسمه.</td>
          </tr>
          <tr>
            <td><strong>واجهة المستخدم (UI)</strong></td>
            <td>المظهر البصري: اختيار الخطوط، لوحة الألوان (60-30-10)، تباين العناصر، والمسافات المتسقة.</td>
            <td>شاشات Google Stitch ونظام التصميم <code>Design System</code>.</td>
            <td>تأتي بعد تثبيت الاحتياجات والجرد، وليس قبلهما.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout tip">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>القاعدة الذهبية لمرحلة الاستكشاف</span>
      </div>
      <p>
        <strong>خطّط الشاشات وUX قبل فتح أداة التصميم:</strong> لا تبدأ في توليد الشاشات عبر Stitch أو كتابة كود Next.js حتى تحسم أسئلة الأدوار والتنقل والحالات. التصميم الذي يُبنى على افتراضات مجهولة سينهار عند أول مراجعة برمجية.
      </p>
    </div>
  </div>

  <!-- 2. Role-Based UI Architecture -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. معمارية الواجهة القائمة على الأدوار (Role-Based UI Matrix)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في التطبيقات الحقيقية، لا يرى كل مستخدم نفس الواجهة. يجب أن تعكس واجهة المستخدم صلاحيات الأدوار المحددة في وثيقة PRD وقواعد العمل:
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>الدور (User Role)</th>
            <th>الهدف الأساسي على الواجهة</th>
            <th>الشاشات وعناصر التنقل المرئية</th>
            <th>الإجراءات المحظورة والمخفية</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>الزائر العام (Guest)</strong></td>
            <td>التعرف على الخدمة والمعدات المتوفرة وبدء تسجيل الدخول.</td>
            <td>الصفحة التعريفية (Landing)، كتالوج المعدات المتاح، زر تسجيل الدخول.</td>
            <td>حظر تقديم طلب إعارة، حظر لوحات التحكم، إخفاء أدوات الإدارة.</td>
          </tr>
          <tr>
            <td><strong>الطالب المستعير (Student)</strong></td>
            <td>البحث عن المعدات وطلب إعارتها ومتابعة تواريخ الإرجاع وتنبيهاتها.</td>
            <td>كتالوج المعدات الشامل، صفحة تفاصيل المعدة والطلب، لوحة تحكم الإعارات الشخصية.</td>
            <td>حظر مراجعة طلبات الطلاب الآخرين، حظر تسجيل استلام المعدات بالمخزن.</td>
          </tr>
          <tr>
            <td><strong>مشرف المستودع (Staff)</strong></td>
            <td>مراجعة طلبات الإعارة، التحقق من الأصول، تأكيد التسليم والفحص، ورصد الأضرار.</td>
            <td>لوحة طلبات المستودع المعلقة، نموذج الفحص والتسليم، سجل الأضرار وحالة الأصول.</td>
            <td>حظر تعديل السياسات العامة للنظام أو حذف سجلات الحسابات.</td>
          </tr>
          <tr>
            <td><strong>مدير النظام (Admin)</strong></td>
            <td>مراقبة الامتثال، إدارة فئات الأجهزة، مراجعة التقارير التشغيلية والإحصاءات.</td>
            <td>لوحة التقارير المركزية، إدارة الكتالوج والمستخدمين، سجل التدقيق (Audit Log).</td>
            <td>منفصلة تماماً عن مسارات الاستعارة الطلابية اليومية لتفادي الارتباك.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. Navigation Hierarchy & Arabic RTL -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. هيكلية التنقل وأنماط التصفح العربية (RTL Navigation Patterns)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يتطلب بناء واجهة باللغة العربية مراعاة صارمة لاتجاه القراءة من اليمين إلى اليسار (RTL)؛ حيث تختلف نقاط البداية البصرية وحركات اليد وعناصر التصفح:
    </p>

    <ul class="list-disc list-inside space-y-3 leading-8 text-[var(--text-muted)] my-4">
      <li><strong>المحاذاة في RTL:</strong> ابدأ من تدفق المحتوى والمهام المعتمدة لتقرر موضع الشعار والروابط وأدوات المستخدم. استخدم خصائص الاتجاه المنطقية، ولا تحول مواضع عناصر بعينها إلى قاعدة ثابتة لكل منتج.</li>
      <li><strong>القائمة الجانبية (Sidebar):</strong> يمكن وضعها عند بداية التدفق المنطقي في واجهة RTL، لكن تحقق من تسلسل الاستخدام وحالة العنصر النشط وملاءمة الجهاز بدلاً من افتراض مكوّن واحد لكل شاشة.</li>
      <li><strong>أيقونات التراجع والتقدم (Directional Icons):</strong> لا تقلب رمزاً اعتماداً على RTL وحده؛ اتبع معنى الإجراء واتفاقات المنصة، وادعم الرمز باسم مفهوم واختبره في اتجاه العرض الفعلي.</li>
      <li><strong>التنقل في شاشات الجوال:</strong> اختر شريطاً سفلياً أو قائمة أو رابطاً حسب عدد الوجهات وتكرارها ومهام الدور؛ لا تفرض عدداً ثابتاً من العناصر. راعِ معيار حجم الهدف المستهدف، ويمكن استخدام 44×44 بكسل كهدف مريح لا كحد WCAG عام.</li>
    </ul>

    <!-- Mermaid Diagram: Navigation Flow -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">MERMAID (flowchart TD) — هيكلية التنقل القائمة على الأدوار في BorrowHub</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ المخطط';},2000);})" aria-label="نسخ مخطط التنقل">نسخ المخطط</button>
      </div>
      <pre class="code-content"><code>flowchart TD
    AppRoot["بوابة النظام: BorrowHub"] --&gt; AuthCheck{"فحص حالة الدخول والدور"}
    
    AuthCheck -- زائر غير مسجل --&gt; PublicNav["التنقل العام: الرئيسية + استعراض الكتالوج"]
    PublicNav -- تسجيل الدخول --&gt; LoginView["نموذج الدخول الجامعي الموحد"]
    
    AuthCheck -- طالب معتمد --&gt; StudentNav["واجهة الطالب (Student Layout)"]
    StudentNav --&gt; S1["كتالوج المعدات والتصفية"]
    StudentNav --&gt; S2["تفاصيل المعدة وطلب الإعارة"]
    StudentNav --&gt; S3["لوحة إعاراتي وتنبيهات الإرجاع"]
    
    AuthCheck -- مشرف المعمل --&gt; StaffNav["واجهة المشرف (Staff Layout)"]
    StaffNav --&gt; St1["قائمة طلبات الإعارة الواردة"]
    StaffNav --&gt; St2["محطة تسليم العتاد (خلال 48 ساعة)"]
    StaffNav --&gt; St3["فحص الاسترجاع وتوثيق الأضرار"]</code></pre>
    </div>
  </div>

  <!-- 4. UI/UX Grill Me Methodology & PROMPT 14 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. منهجية استكشاف التجربة: برومبت UI/UX Grill Me (PROMPT 14)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا نستنبط متطلبات الواجهة بالتخمين، بل نخوض مقابلة تدريجية عميقة مع الذكاء الاصطناعي تحاكي عمل كبير مهندسي تجربة المستخدم (Senior UX Researcher).
      يطرح الوكيل <strong>سؤالاً واحداً فقط في كل مرة</strong>، ويتحدى القرارات غير المفسرة حتى يتم حسم شكل الصفحات والتفاعلات:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 14 — UI/UX Grill Me</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 14">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>/grill-me
Act as a Senior UX Researcher and Product Designer.
Read the approved PRD and available User Flows/Diagrams.
Interview me in Arabic, ONE question at a time, about information
architecture, required pages for each role, navigation, layout,
content hierarchy, forms, interactions, empty/loading/error/success states,
responsive behavior, accessibility, language and existing brand identity.
Challenge unclear decisions and suggest alternatives with trade-offs.
Do not invent features or generate code/screens during the interview.
After all questions are resolved, create docs/UI_UX_REQUIREMENTS.md.
Start with the first question only.</code></pre>
    </div>

    <div class="callout warning">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>حدود صارمة لمقابلة UI/UX Grill Me</span>
      </div>
      <ul class="list-disc list-inside space-y-2 mt-2 leading-7 text-sm">
        <li><strong>ممنوع اختراع ميزات:</strong> إذا اقترح الذكاء الاصطناعي ميزة ليست في PRD (مثل محادثة فورية شات أو دفع إلكتروني)، ارفضها فوراً وانقلها إلى الميزات المؤجلة.</li>
        <li><strong>ممنوع كتابة كود أو رسم شاشات أثناء المقابلة:</strong> الهدف هو حسم القرارات المنطقية وتوثيقها وليس التشتت في تفاصيل CSS.</li>
        <li><strong>سؤال واحد في كل مرة:</strong> ركّز على الإجابة بتعمق في سياق مشروعك الحقيقي دون إجابات عمومية.</li>
      </ul>
    </div>
  </div>

  <!-- 5. Target Deliverable Structure -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. هيكل وثيقة متطلبات التجربة: docs/UI_UX_REQUIREMENTS.md</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      المخرج المعتمد من هذا الموضوع هو ملف <code>docs/UI_UX_REQUIREMENTS.md</code> المحفوظ داخل مستودع المشروع. يجب أن يحتوي الملف على الأقسام الهندسية التالية:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">MARKDOWN — هيكل وثيقة UI_UX_REQUIREMENTS.md المعتمدة</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ الهيكل';},2000);})" aria-label="نسخ هيكل الوثيقة">نسخ الهيكل</button>
      </div>
      <pre class="code-content"><code># وثيقة متطلبات واجهة وتجربة المستخدم (UI/UX Requirements)

## 1. ملخص المنتج ونطاق التجربة
- اسم المشروع وبيان المشكلة
- نطاق MVP المؤكد (بدون ميزات مؤجلة)

## 2. مصفوفة الأدوار والصلاحيات المرئية
- جدول الأدوار (Guest, Student, Staff, Admin)
- الصفحات المسموحة والمحظورة لكل دور

## 3. معمارية المعلومات وهيكل التنقل (Information Architecture & Navigation)
- التنقل الرئيسي (Header / Sidebar / Bottom Nav)
- مسارات الانتقال والتراجع مع مراعاة اتجاه RTL
- مستويات الصفحات ومواقع النماذج (Modals vs Dedicated Pages)

## 4. المبادئ التوجيهية للهوية البصرية واللغة
- لغة الواجهة الأساسية (العربية RTL أولاً)
- نبرة الخطاب في الرسائل (مهنية، مشجعة، وواضحة)
- توزيع الألوان الأساسي وفق قاعدة (60-30-10)

## 5. الأسئلة المحسومة والقرارات المعتمدة
- سجل القرارات التي تم تثبيتها خلال جلسة Grill Me</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 19: UX Blueprint, Complete Journeys & Cross-cutting Checks
 * Sequence Position: 19
 * ========================================================================= */
export const topic19UxBlueprintHtml = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-19-ux-blueprint" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 19 · المحطة الأساسية</span>
    <span class="step-pill">مخطط التجربة وهندسة الحالات</span>
    <span class="status-pill verified">مرجع معتمد: المحاضرة 05</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة</h2>
      <div class="step-subtitle">تخطيط رحلات المستخدم وخريطة الموقع (Sitemap)، وتوثيق حالات الواجهة مع مراجعة الاستجابة وإمكانية الوصول كفحوص عابرة</div>
    </div>
  </div>

  <!-- 1. What is UX Blueprint -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو مخطط تجربة المستخدم (UX Blueprint) ولماذا نحتاجه؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الـ <strong>UX Blueprint</strong> هو المخطط الذي يربط خريطة الموقع (Sitemap) برحلات المستخدم وحالات الواجهة المناسبة لكل شاشة، ثم يراجع الاستجابة وإمكانية الوصول عبر الرحلة.
      إذا كان الـ PRD يحدد <em>ماذا نريد أن نبني</em>، فإن الـ UX Blueprint يحدد <em>كيف تتصرف الواجهة في كافة الظروف الواقعية</em> قبل كتابة أي كود أو توليد تصميمات نهائية.
    </p>

    <div class="callout tip">
      <div class="callout-header">
        <span class="callout-icon">📌</span>
        <span>مبدأ النطاق الصارم</span>
      </div>
      <p>
        يغطي الـ UX Blueprint رحلات ومسارات <strong>النسخة الأولى (MVP) فقط</strong>. لا يتم إدخال أي مسار لميزة مستقبلية (مثل نظام الدفع أو المراسلة الحية) داخل المخطط حتى لا تتعقد الشاشات وتتشتت جهود التطوير.
      </p>
    </div>
  </div>

  <!-- 2. Sitemap Architecture -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. خريطة الموقع وهيكل المسارات (Sitemap Architecture)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      توضح خريطة الموقع التسلسل الهرمي للمسارات وتوزيع الشاشات بحسب طبيعة الوصول (عام للجميع مقابل محمي بصلاحية معينة).
      فيما يلي خريطة مسارات مشروع <strong>BorrowHub</strong> لنطاق MVP بصيغة كود نصي متجاوب:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">MERMAID (flowchart TD) — خريطة موقع BorrowHub لنطاق MVP</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ خريطة الموقع';},2000);})" aria-label="نسخ خريطة الموقع">نسخ خريطة الموقع</button>
      </div>
      <pre class="code-content"><code>flowchart TD
    Root["/ (البوابة الرئيسية والتعريف)"] --&gt; Catalog["/equipment (كتالوج المعدات والتصفية)"]
    Root --&gt; Login["/login (تسجيل الدخول الموحد)"]
    
    Catalog --&gt; Detail["/equipment/[id] (تفاصيل المعدة وطلب الإعارة)"]
    
    Login -- مسار الطالب --&gt; StudentPortal["منطقة الطالب المحمية"]
    StudentPortal --&gt; MyLoans["/dashboard/loans (إعاراتي النشطة وسجل الطلبات)"]
    StudentPortal --&gt; LoanRequest["/requests/new (تأكيد نموذج طلب الاستعارة)"]
    
    Login -- مسار المشرف --&gt; StaffPortal["منطقة مشرف المستودع المحمية"]
    StaffPortal --&gt; StaffQueue["/staff/requests (طلبات الإعارة قيد المراجعة)"]
    StaffPortal --&gt; Handover["/staff/handover (تسليم العتاد وتأكيد الاستلام)"]
    StaffPortal --&gt; Inspection["/staff/inspections (فحص الاسترجاع وتوثيق الأضرار)"]</code></pre>
    </div>
  </div>

  <!-- 3. UI states and cross-cutting checks -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. حالات الواجهة وفحوص الجودة العابرة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      معظم التطبيقات الفاشلة تبدو رائعة في التصميم عندما تكون البيانات مكتملة والإنترنت سريعاً، لكنها تنهار عندما تواجه الواقع: بطء الشبكة، غياب البيانات، أو أخطاء المستخدم.
      وثّق حالات التحميل والفراغ والخطأ والنجاح ذات الصلة بكل تدفق. الاستجابة وإمكانية الوصول بُعدان للمراجعة عبر الحالات وليستا حالتين مرئيتين للواجهة؛ لا تضف حالة أو سلوكاً لا تدعمه متطلبات المشروع.
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>الحالة أو بُعد المراجعة</th>
            <th>التحدي الإنساني والتقني</th>
            <th>إرشاد قابل للتكييف</th>
            <th>تطبيق حي من واقع BorrowHub</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. التحميل (Loading)</strong></td>
            <td>الانتظار والقلق من تجمد التطبيق وتغير أماكن العناصر المفاجئ (CLS).</td>
            <td>استخدام الهياكل العظمية (Skeleton Screens) للبطاقات، ومؤشرات التقدم الموضعية للأزرار مع تعطيل النقر المزدوج.</td>
            <td>عرض 6 بطاقات رمادية متدرجة تحاكي بطاقات المعدات أثناء جلب بيانات الكتالوج.</td>
          </tr>
          <tr>
            <td><strong>2. الفراغ (Empty)</strong></td>
            <td>شعور المستخدم بالضياع عند عدم وجود نتائج أو عند أول استخدام للنظام.</td>
            <td>أيقونة معبرة، عنوان توضيحي إيجابي، ونص يوضح سبب الفراغ، مع زر إجراء مباشر (Actionable CTA).</td>
            <td>شاشة "لا توجد إعارات نشطة حالياً" مع زر بارز: "تصفح كتالوج المعدات واطلب جهازك الأول".</td>
          </tr>
          <tr>
            <td><strong>3. الخطأ والتعافي (Error)</strong></td>
            <td>الإحباط عند فشل الطلب أو إدخال بيانات خاطئة أو تعطل الخادم.</td>
            <td>رسائل واضحة بلغة بشرية (دون كشف تفاصيل تقنية غامضة)، تحديد الحقل المسبب للخطأ، وتقديم مسار تعافٍ صريح.</td>
            <td>عند محاولة استعارة جهاز ثالث: "عذراً، لقد بلغت الحد الأقصى (جهازان نشطان وفق القاعدة 3). يُرجى إرجاع عتاد سابق أولاً".</td>
          </tr>
          <tr>
            <td><strong>4. النجاح (Success)</strong></td>
            <td>الحاجة للتأكيد التام على اكتمال الإجراء ومعرفة الخطوة التالية.</td>
            <td>إشعار تأكيد عائم (Toast)، شاشة تأكيد تحتوي رقم الطلب، مع خطوات الاستلام التالية بوضوح.</td>
            <td>عند إرسال الطلب: "تم تسجيل طلبك بنجاح! رقم الطلب #1042. مهلة الاستلام من المعمل 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق؛ لا يبدأ عدّها عند إرسال الطلب أو اعتماده".</td>
          </tr>
          <tr>
            <td><strong>فحص عابر: الاستجابة (Responsive)</strong></td>
            <td>اختلاف أحجام الشاشات وتغير بيئة التصفح بين المكتب والميدان.</td>
            <td>افحص أحجام العرض المناسبة للجمهور والمنصة. 390px و1440px مثالان للاختبار، و44 CSS px قيمة راحة اختيارية وليست شرطاً عاماً لكل عنصر.</td>
            <td>تحول جدول طلبات المستودع في الديسكتوب إلى بطاقات عمودية قابلة للسحب على أجهزة المشرف اللوحية.</td>
          </tr>
          <tr>
            <td><strong>فحص عابر: إمكانية الوصول (Accessibility)</strong></td>
            <td>صعوبة القراءة لضعاف البصر أو عدم القدرة على استخدام الفأرة.</td>
            <td>افحص التباين وفق المعيار المناسب (4.5:1 للنص العادي و3:1 للنص الكبير)، مع أسماء قابلة للإدراك وتركيز ولوحة مفاتيح؛ لا تدّعِ المطابقة قبل القياس.</td>
            <td>ظهور حلقة تركيز بارزة (Focus Ring) حول زر "تأكيد الاستعارة" عند التنقل عبر لوحة المفاتيح لتمكين ذوي الإعاقة.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Official PROMPT 15 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. برومبت توليد مخطط التجربة وجرد الشاشات (PROMPT 15 المعتمد)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نستخدم هذا البرومبت المعتمد من المرجع الرسمي للمسار لتكليف الذكاء الاصطناعي بدور مهندس تجربة مستخدم خبير (Senior UX Architect) لتحويل الوثائق السابقة إلى مخطط تجربة مكتمل:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 15 — UX Blueprint + Screen Inventory</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 15">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior UX Architect.
Read docs/PRD.md and docs/UI_UX_REQUIREMENTS.md.
Create complete MVP user journeys, Mermaid flows, a Sitemap and Screen Inventory.
For EACH screen specify ID, purpose, roles, route, components, data,
actions, navigation, validation and relevant UI states (loading, empty, error,
success). Review responsive behavior and accessibility across states; they are
cross-cutting checks, not additional UI states. Keep unresolved behavior open.
Prioritize core/supporting/future, without bringing future features into MVP.
Save docs/UX_BLUEPRINT.md and docs/SCREEN_INVENTORY.md.
Do not design screens yet or write code.</code></pre>
    </div>
  </div>

  <!-- 5. Target UX_BLUEPRINT.md File Structure -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. هيكل وثيقة docs/UX_BLUEPRINT.md المعتمدة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تُحفظ مخرجات هذا الموضوع داخل ملف <code>docs/UX_BLUEPRINT.md</code> وفق الهيكل المعياري المنضبط:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">MARKDOWN — نموذج هيكل ملف docs/UX_BLUEPRINT.md</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ النموذج';},2000);})" aria-label="نسخ نموذج Blueprint">نسخ النموذج</button>
      </div>
      <pre class="code-content"><code># وثيقة مخطط تجربة المستخدم (UX Blueprint)

## 1. خريطة الموقع ومسارات MVP (Sitemap)
- هيكلية الروابط والصفحات العامة والمحمية
- مخطط Mermaid لخريطة الموقع

## 2. رحلات المستخدم المكتملة (End-to-End User Journeys)
- رحلة تصفح وطلب استعارة معدة (الطالب)
- رحلة مراجعة وتسليم العتاد وفحص المرتجع (مشرف المستودع)

## 3. حالات الواجهة وفحوص الجودة العابرة
- حالات التحميل (Skeleton Patterns)
- حالات الفراغ (Empty Messages & CTAs)
- حالات الخطأ واستراتيجيات التعافي (Error Handling & Recovery)
- حالات النجاح والإشعارات (Success Feedback)
- مراجعة الاستجابة على أحجام مناسبة للجمهور والمنصة (تُذكر قيم الاختبار)
- مراجعة إمكانية الوصول والتباين وفق المعيار المناسب ودليل القياس
- الاستجابة وإمكانية الوصول فحوص عابرة، وليستا حالتين للواجهة

## 4. ضوابط اللغة والاتجاه (RTL Guidelines)
- محاذاة العناوين والأيقونات التوجيهية
- صياغة الرسائل الميدانية بالنبرة المعتمدة</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 20: Screen Inventory, Purpose, Actions, Data & States
 * Sequence Position: 20
 * ========================================================================= */
export const topic20ScreenInventoryHtml = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-20-screen-inventory" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 20 · المحطة الأساسية</span>
    <span class="step-pill">جرد الشاشات وهندسة النطاق</span>
    <span class="status-pill verified">مرجع معتمد: المحاضرة 05</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات</h2>
      <div class="step-subtitle">توثيق كل شاشة بهدفها، أدوارها، مكوناتها، بياناتها، إجراءاتها، وحالاتها دون اختراع شاشات زائدة</div>
    </div>
  </div>

  <!-- 1. The Golden Rule of Screen Inventory -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. القاعدة الذهبية: حظر اختراع شاشات وهمية أو زائدة عن نطاق MVP</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      <strong>جرد الشاشات (Screen Inventory)</strong> ليس مجرد قائمة عشوائية لأسماء الصفحات، بل هو <strong>عقد هندسي ملزم</strong> يحدد بالضبط ما سيتم تصميمه وبرمجته لاحقاً.
      أي شاشة تضاف إلى هذا الجرد ستكلفك وقتاً في كتابة البرومبت، وتصميماً في Stitch، وتكويفاً في Next.js، وفحوصات في QA.
    </p>

    <div class="callout warning">
      <div class="callout-header">
        <span class="callout-icon">🚫</span>
        <span>قاعدة المنع الصارم (No Invented Screens)</span>
      </div>
      <p>
        <strong>لا تخترع شاشات غير مطلوبة في متطلبات PRD:</strong> إذا لم يكن للمنتج ميزة دردشة حية أو نظام دفع أو إعدادات متقدمة في الـ MVP، فمن المحظور تماماً تخصيص شاشات لها. كل شاشة يجب أن تبرر وجودها بربط مباشر بقاعدة عمل أو رحلة مستخدم أساسية.
      </p>
    </div>
  </div>

  <!-- 2. Screen Prioritization Matrix -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. تصنيف أولويات الشاشات (Core vs Supporting vs Future)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      قبل إدراج الشاشات في الجرد التفصيلي، نقوم بتصنيفها هندسياً لتركيز الجهود على ما يحقق قيمة المنتج الأساسية:
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>مستوى الأولوية</th>
            <th>المعنى الهندسي</th>
            <th>التعامل معها في المرحلة الحالية</th>
            <th>أمثلة من مشروع BorrowHub</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>الجوهرية (Core)</strong></td>
            <td>شاشات أساسية لا يمكن للنظام أن يؤدي غرضه التجاري الأول بدونها على الإطلاق.</td>
            <td>تُجرد بالكامل، وتُصمم أولاً في Stitch كمرجع رئيسي، وتُنفذ في المرحلة الأولى.</td>
            <td>كتالوج المعدات (SCR-02)، نموذج طلب الاستعارة (SCR-03)، لوحة تسليم المشرف (SCR-05).</td>
          </tr>
          <tr>
            <td><strong>المساندة (Supporting)</strong></td>
            <td>شاشات تكمل تجربة المستخدم وتمنحه إمكانية المتابعة والتحقق والوصول للنتائج.</td>
            <td>تُجرد وتُصمم باتساق مع نظام التصميم المعتمد للشاشات الجوهرية.</td>
            <td>الصفحة الرئيسية (SCR-01)، لوحة إعارات الطالب (SCR-04)، شاشة فحص الأضرار (SCR-06).</td>
          </tr>
          <tr>
            <td><strong>المستقبلية (Future / Out of Scope)</strong></td>
            <td>شاشات تخدم ميزات مؤجلة تقرر عزلها في وثيقة PRD (مثل تقارير الذكاء الاصطناعي والتكامل مع جهات خارجية).</td>
            <td><strong>تُعزل تماماً خارج الجرد الحالي</strong> وتُسجل في قائمة الميزات المؤجلة دون إضاعة الوقت فيها.</td>
            <td>شاشة الدفع المالي، شاشة المحادثة الفورية، شاشة مزامنة المستودعات الخارجية.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. BorrowHub Complete Reference Screen Inventory -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. الجرد المرجعي الكامل لشاشات النسخة الأولى (BorrowHub Case Study)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يوضح الجدول التالي الجرد الهندسي المنضبط لنطاق MVP في دراسة حالة <strong>BorrowHub</strong>، مبيناً ربط كل شاشة بالمعرف، الهدف، المسار، الأدوار، البيانات، الإجراءات، والحالات:
    </p>

    <div class="table-container my-6">
      <table class="data-table text-sm">
        <thead>
          <tr>
            <th>معرف الشاشة والاسم</th>
            <th>المسار (Route) والأدوار</th>
            <th>الهدف الرئيسي من الشاشة</th>
            <th>المكونات والبيانات المطلوبة</th>
            <th>إجراءات المستخدم وقواعد التحقق</th>
            <th>تخصيص الحالات الخاصة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SCR-01</strong><br />الرئيسية والتعريف<br /><code>Home / Landing</code></td>
            <td><code>/</code><br />الجميع (Public)</td>
            <td>التعريف بخدمة إعارة المعدات المعملية، إبراز الأجهزة الأكثر طلباً، وتوجيه المستخدم لتسجيل الدخول.</td>
            <td>شريط علوي، بطاقة الترحيب (Hero Section)، عينات أجهزة مميزة، روابط سريعة للكتالوج.</td>
            <td>النقر على "ابدأ التصفح"، النقر على "تسجيل الدخول". لا تتطلب نماذج إدخال.</td>
            <td>تحميل خفيف، لا توجد حالة فراغ (محتوى ترويجي ثابت)، متجاوبة بالكامل على الهواتف (390px).</td>
          </tr>
          <tr>
            <td><strong>SCR-02</strong><br />كتالوج المعدات والبحث<br /><code>Equipment Catalog</code></td>
            <td><code>/equipment</code><br />الزائر، الطالب، المشرف</td>
            <td>استعراض كافة الأصول المعملية المتاحة، البحث بالاسم والنوع، والتصفية حسب حالة التوفر والتصنيف.</td>
            <td>حقل البحث المباشر، شرائح التصنيف (Pills)، شبكة بطاقات الأجهزة، ترقيم الصفحات.</td>
            <td>البحث الفوري، تبديل الفئات، اختيار معدة للانتقال للتفاصيل. التصفية لا تتطلب إعادة تحميل الصفحة.</td>
            <td><strong>فراغ:</strong> "لا توجد معدات تطابق معايير بحثك".<br /><strong>تحميل:</strong> 6 هياكل عظمية متدرجة.</td>
          </tr>
          <tr>
            <td><strong>SCR-03</strong><br />تفاصيل المعدة ونموذج الطلب<br /><code>Equipment Detail & Modal</code></td>
            <td><code>/equipment/[id]</code><br />الطالب المعتمد</td>
            <td>عرض المواصفات الفنية للعتاد، حالة التوفر الفوري، وتقديم طلب استعارة محدد التاريخ والغرض.</td>
            <td>معرض صور العتاد، جدول المواصفات، نموذج حجز التاريخ والغرض، شارة حالة المخزون.</td>
            <td>إدخال تاريخ البدء والنهاية، كتابة الغرض، تقديم الطلب.<br /><strong>تحقق:</strong> فحص القاعدة 3 (الحد الأقصى جهازان).</td>
            <td><strong>خطأ:</strong> تنبيه "لقد تجاوزت حد الاستعارة المسموح".<br /><strong>نجاح:</strong> تأكيد الطلب مع مهلة 48 ساعة.</td>
          </tr>
          <tr>
            <td><strong>SCR-04</strong><br />لوحة إعارات الطالب<br /><code>Student Loans Dashboard</code></td>
            <td><code>/dashboard/loans</code><br />الطالب المسجل</td>
            <td>متابعة الأجهزة المستعارة حالياً، تواريخ الإرجاع الإلزامية، وسجل الطلبات السابقة وتفاصيلها.</td>
            <td>بطاقات الإعارات النشطة، عداد الأيام المتبقية، جدول الأرشيف، أزرار طلب التمديد/الإرجاع.</td>
            <td>تأكيد الحضور للتسليم، طلب إرجاع العتاد، مراجعة ملاحظات المشرف.</td>
            <td><strong>فراغ:</strong> "ليس لديك أي إعارات نشطة اليوم، ابدأ بطلب جهاز من الكتالوج".</td>
          </tr>
          <tr>
            <td><strong>SCR-05</strong><br />لوحة مراجعة وتسليم المشرف<br /><code>Staff Request Queue</code></td>
            <td><code>/staff/requests</code><br />مشرف المستودع</td>
            <td>مراجعة طلبات الطلاب المعلقة، التحقق من أهلية الحساب وتوفر الأصل، وتأكيد التسليم اليدوي (Handover).</td>
            <td>جدول الطلبات الواردة، شارات الأولوية، نافذة تأكيد تسليم العتاد وإدخال الرمز التسلسلي (Asset Tag).</td>
            <td>قبول الطلب، رفض الطلب مع كتابة السبب، تأكيد تسليم الجهاز وتفعيل الإعارة (القاعدة 7).</td>
            <td><strong>تحقق:</strong> لا يتم التسليم إلا بإدخال المعرف التسلسلي للأصل وفحص صلاحية الطالب.</td>
          </tr>
          <tr>
            <td><strong>SCR-06</strong><br />فحص الاسترجاع ورصد الأضرار<br /><code>Inspection & Damage Log</code></td>
            <td><code>/staff/inspections</code><br />مشرف المستودع</td>
            <td>توثيق حالة المعدة عند إرجاعها إلى المعمل، التأكد من سلامتها الفنية، أو تسجيل الأضرار والملاحظات.</td>
            <td>بيانات الإعارة المنتهية، قائمة فحص السلامة (Checklist)، حقل رصد الأضرار ونوع العطل وصور الإثبات.</td>
            <td>تأكيد الإرجاع السليم وإخلاء طرف الطالب، أو تسجيل تلف دون إعادة الوحدة للمتاح كسؤال PRD مفتوح للسياسات الإضافية (القاعدة 8).</td>
            <td><strong>خطأ:</strong> حظر إغلاق الإعارة المتضررة دون كتابة تقرير فحص تفصيلي موثق.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Traceability Matrix -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. مصفوفة تدقيق التغطية الهندسية (Requirements Traceability Matrix)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لضمان عدم سقوط أي قاعدة عمل أو مسار معتمد، نقوم بإجراء تدقيق تغطية شامل بين متطلبات PRD ومسارات تدفق المستخدم وشاشات الجرد:
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>قاعدة PRD المعتمدة</th>
            <th>مسار التدفق المرتبط (User Flow)</th>
            <th>الشاشة المسؤولة في الجرد</th>
            <th>آلية التطبيق على الواجهة والتحقق</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>القاعدة 3:</strong> الحد الأقصى لجهازين نشطين للطالب</td>
            <td>نقطة القرار <code>CheckActiveLoans</code></td>
            <td><code>SCR-03</code> تفاصيل المعدة والطلب</td>
            <td>فحص عدد الأجهزة قبل فتح نموذج الطلب؛ عند وصول الحد يظهر تنبيه مانع ويتعطل زر الإرسال.</td>
          </tr>
          <tr>
            <td><strong>القاعدة 6:</strong> استلام الجهاز خلال 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق</td>
            <td>عقدة التسليم <code>ApprovedReady &rarr; Handover</code></td>
            <td><code>SCR-04</code> للوحة الطالب و <code>SCR-05</code> للمشرف</td>
            <td>عرض مؤقت عد تنازلي لمهلة الـ 48 ساعة؛ يتم إلغاء الحجز تلقائياً في حال عدم الحضور.</td>
          </tr>
          <tr>
            <td><strong>القاعدة 8:</strong> توثيق الأضرار والأعطال عند الإرجاع</td>
            <td>عقدة الفحص <code>Inspection &rarr; LogDamage</code></td>
            <td><code>SCR-06</code> فحص الاسترجاع والأضرار</td>
            <td>إلزام المشرف بملء تقرير الفحص وتحديد درجة الضرر قبل تحديث حالة الجهاز في المخزن.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 5. Target docs/SCREEN_INVENTORY.md Structure -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. هيكل وثيقة docs/SCREEN_INVENTORY.md المعتمدة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      المخرج المعتمد من هذا الموضوع هو ملف <code>docs/SCREEN_INVENTORY.md</code>، والذي يمثل حجر الأساس لإنشاء برومبتات الشاشات في Google Stitch بالمرحلة التالية:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">MARKDOWN — نموذج هيكل docs/SCREEN_INVENTORY.md</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ النموذج';},2000);})" aria-label="نسخ نموذج Screen Inventory">نسخ النموذج</button>
      </div>
      <pre class="code-content"><code># وثيقة جرد الشاشات (Screen Inventory)

## 1. ملخص نطاق الشاشات وقواعد الحصر
- حصر شاشات MVP المؤكدة (Core & Supporting)
- التعهد بعدم اختراع شاشات زائدة أو استباق ميزات مستقبلية

## 2. جدول جرد الشاشات المعتمد (Screen Inventory Table)
| المعرف | اسم الشاشة | المسار (Route) | الدور المسموح | الأولوية | المكونات الرئيسية |
|:------:|:-----------|:---------------|:--------------|:--------:|:------------------|
| SCR-01 | الرئيسية والتعريف | / | الجميع | Supporting | Hero, Featured Grid |
| SCR-02 | كتالوج المعدات والبحث | /equipment | الجميع | Core | Search, Filter Pills, Grid |
| SCR-03 | تفاصيل المعدة والطلب | /equipment/[id] | الطالب | Core | Specs, Booking Form, Stock |
| SCR-04 | لوحة تحكم إعارات الطالب | /dashboard/loans | الطالب | Supporting | Active Loans, Due Timers |
| SCR-05 | لوحة مراجعة وتسليم المشرف | /staff/requests | المشرف | Core | Requests Queue, Handover |
| SCR-06 | فحص الاسترجاع وتوثيق الأضرار | /staff/inspections | المشرف | Supporting | Inspection Checklist, Damage |

## 3. المواصفة الفنية لكل شاشة
(توثيق الهدف والبيانات والإجراءات والتحقق والحالات ذات الصلة؛ راجع الاستجابة وإمكانية الوصول عبر الحالات)

## 4. مصفوفة تتبع التغطية مع PRD (Traceability Matrix)
- ربط كل قاعدة عمل بالشاشة المعنية وضمان التغطية الكاملة</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * ASSEMBLED WAVE 2 ENTRIES FOR TICKET 07
 * ========================================================================= */
export const t07Entries: TopicItem[] = [
  {
    id: 'ui-ux-roles-navigation',
    number: '18',
    slug: 'ui-ux-roles-navigation',
    title: 'تصميم تجربة وواجهة المستخدم (UI/UX): الأدوار وهيكلية التنقل',
    subtitle: 'تحويل متطلبات المنتج إلى هندسة معلومات، توزيع الأدوار، وهياكل تنقل واضحة قبل التصميم المرئي',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'تجربة المستخدم وهندسة المعلومات',
    summary: 'تفكيك متطلبات المنتج المعتمدة إلى معمارية معلومات واضحة، تحديد مصفوفة صلاحيات الأدوار على الواجهة، بناء نماذج التنقل المتجاوبة مع خصوصية اللغة العربية (RTL)، وإجراء مقابلة UI/UX Grill Me التفاعلية (PROMPT 14) لتوثيق ملف docs/UI_UX_REQUIREMENTS.md.',
    tags: ['UI/UX', 'Information Architecture', 'Roles Matrix', 'Navigation', 'RTL', 'Grill Me', 'UI Requirements'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 3,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic18UiUxHtml),
    htmlContent: topic18UiUxHtml,

    goal: 'تمكين الطالب من تفكيك متطلبات مشروعه إلى هيكلية معلومات منضبطة (Information Architecture)، وتحديد صلاحيات وأدوار المستخدمين على الواجهة، وبناء نموذج تنقل متكامل (Navigation Model)، وصياغة وثيقة docs/UI_UX_REQUIREMENTS.md باستخدام مقابلة UI/UX Grill Me التفاعلية دون اختراع أي ميزات خارج النطاق.',
    prerequisites: [
      'وثيقة متطلبات المنتج المعتمدة docs/PRD.md',
      'مخططات تدفق المستخدم docs/user-flow.md ومخططات التحليل الأولية',
      'سجل القرارات المعتمدة docs/DECISIONS_LOG.md وقاموس مصطلحات المشروع'
    ],
    steps: [
      '1. راجع وثيقة docs/PRD.md واستخرج كافة الأدوار المعتمدة (مثل: الطالب ومسؤول المعمل في BorrowHub) والصلاحيات الممنوحة لكل دور على الواجهة.',
      '2. أنشئ نموذج تنقل مرشحاً يربط كل وجهة بمهمة ودور ومتطلب مصدر، وسجل العناصر العامة أو الخاصة بكل دور كأسئلة مفتوحة عند غياب قرار.',
      '3. ابنِ هيكلية المعلومات (Information Architecture): صنف المحتوى إلى صفحات رئيسية وفرعية وشاشات منبثقة (Modals/Drawers) بحسب الأولوية البصرية.',
      '4. راعِ خصوصية اللغة العربية والتوجيه من اليمين لليسار (RTL): ترتيب العناصر من اليمين، اتجاه أيقونات التراجع، ومحاذاة النصوص ونقاط الجذب البصري.',
      '5. شغّل جلسة استكشاف الواجهة باستخدام برومبت UI/UX Grill Me المعتمد (PROMPT 14) للإجابة عن أسئلة تجربة المستخدم سؤالاً بسؤال.',
      '6. احفظ نموذج الأدوار والتنقل ومصادرهما والأسئلة المفتوحة في docs/UI_UX_REQUIREMENTS.md؛ اترك الاقتراحات مرشحة حتى يراجعها صاحب القرار.'
    ],
    promptRefs: ['prompt-14-ui-ux-grill-me'],
    outputs: [
      'docs/UI_UX_REQUIREMENTS.md مع نموذج التنقل المرتبط بالمهام والأدوار والمصادر',
      'مصفوفة صلاحيات الأدوار على الواجهة (Role-Based UI Matrix)'
    ],
    checklist: [
      'تحديد أدوار المستخدمين بوضوح وعزل ما يراه كل دور عن الآخر.',
      'تحديد نمط التنقل الرئيسي (Header/Sidebar/Bottom Nav) لكل جهاز.',
      'مراعاة اتجاه RTL في توزيع العناصر وحركات التصفح وأيقونات التراجع.',
      'تنفيذ مقابلة UI/UX Grill Me للإجابة عن الأسئلة المفتوحة دون استعجال.',
      'توثيق متطلبات الواجهة كاملة في docs/UI_UX_REQUIREMENTS.md.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 18,
  },
  {
    id: 'ux-blueprint',
    number: '19',
    slug: 'ux-blueprint',
    title: 'مخطط تجربة المستخدم (UX Blueprint): الرحلات وحالات الواجهة الشاملة',
    subtitle: 'تخطيط رحلات المستخدم المكتملة، خريطة الموقع (Sitemap)، وهندسة حالات التحميل والفراغ والخطأ والنجاح والتجاوب والوصول',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'مخطط التجربة وهندسة الحالات',
    summary: 'بناء مخطط تجربة مستخدم يضم خريطة الموقع ورحلات MVP، ويوثق حالات التحميل والفراغ والخطأ والنجاح ذات الصلة، مع مراجعة الاستجابة وإمكانية الوصول كفحوص عابرة للحالات في docs/UX_BLUEPRINT.md.',
    tags: ['UX Blueprint', 'Sitemap', 'User Journeys', 'Empty State', 'Loading State', 'Error Handling', 'Responsive', 'Accessibility'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 3,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic19UxBlueprintHtml),
    htmlContent: topic19UxBlueprintHtml,

    goal: 'تمكين الطالب من رسم مخطط تجربة المستخدم وخريطة الموقع ومسارات MVP، وتوثيق حالات الواجهة ذات الصلة ومراجعة الاستجابة وإمكانية الوصول كفحوص عابرة للحالات، وحفظ ذلك في docs/UX_BLUEPRINT.md.',
    prerequisites: [
      'وثيقة متطلبات الواجهة المعتمدة docs/UI_UX_REQUIREMENTS.md',
      'وثيقة متطلبات المنتج docs/PRD.md ومسارات التدفق docs/user-flow.md'
    ],
    steps: [
      '1. استخرج هيكل صفحات المنتج وأنشئ خريطة الموقع (Sitemap) التي توضح تسلسل المسارات والشاشات لجميع الأدوار.',
      '2. ارسم رحلات المستخدم المكتملة لنطاق MVP باستخدام مخطط Mermaid يوضح الانتقال بين الصفحات والإجراءات.',
      '3. فصّل حالات التحميل (Loading States): اختر الأنماط المناسبة (Skeleton Screens للبطاقات، Spinners للأزرار، التحديث المتفائل Optimistic UI).',
      '4. صمم حالات الفراغ (Empty States): حدد النصوص التوجيهية وأزرار الدعوة للإجراء (Actionable CTA) عند عدم وجود بيانات أو نتائج بحث.',
      '5. حدد حالات الخطأ والتعافي (Error & Recovery): أخطاء التحقق الميداني (Field Validation)، رسائل التنبيه العائمة (Toasts)، وأخطاء الاتصال والانقطاع.',
      '6. وثّق حالات النجاح (Success States): إشعارات التأكيد، التحديث الفوري، وتوجيه المستخدم للخطوة التالية بوضوح.',
      '7. راجع الاستجابة وإمكانية الوصول (Responsive & Accessibility): اختر أحجام الأهداف وفق المنصة والمعيار المستهدف، وقس التباين وفق معيار WCAG المناسب؛ 4.5:1 للنص العادي و3:1 للنص الكبير.',
      '8. استخدم برومبت UX Blueprint المعتمد (PROMPT 15) لإنشاء وثيقة docs/UX_BLUEPRINT.md المتكاملة.'
    ],
    promptRefs: ['prompt-15-ux-blueprint-screen-inventory'],
    outputs: [
      'docs/UX_BLUEPRINT.md',
      'مخطط Sitemap وهيكل الرحلات بصيغة Mermaid',
      'مصفوفة حالات الواجهة وفحوص الاستجابة وإمكانية الوصول العابرة'
    ],
    checklist: [
      'اكتمال خريطة الموقع (Sitemap) لجميع مسارات النسخة الأولى (MVP).',
      'توثيق حالات الواجهة ذات الصلة لكل شاشة، ثم مراجعة الاستجابة وإمكانية الوصول عبر هذه الحالات.',
      'تحديد نمط الهياكل العظمية (Skeleton Screens) لمنع القفزات البصرية (CLS).',
      'كتابة نصوص رسائل الفراغ والخطأ بلغة عربية واضحة تقترح حلاً أو إجراءً بديلاً.',
      'مراجعة معايير الوصول الرقمي (WCAG AA): التباين، التركيز، وتسميات ARIA.',
      'توليد وتوثيق ملف docs/UX_BLUEPRINT.md كاملاً.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 19,
  },
  {
    id: 'screen-inventory',
    number: '20',
    slug: 'screen-inventory',
    title: 'جرد الشاشات (Screen Inventory): حصر الشاشات وربط الأهداف والبيانات والحالات',
    subtitle: 'توثيق كل شاشة بهدفها، أدوارها، مكوناتها، بياناتها، إجراءاتها، وحالاتها دون اختراع شاشات زائدة',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'جرد الشاشات وهندسة النطاق',
    summary: 'إعداد جرد شاشات منضبط (Screen Inventory) يحصر شاشات MVP فقط ويربط كل شاشة بهدفها، أدوارها المصرحة، مسارها في Next.js، مكوناتها، بياناتها، إجراءاتها، وحالاتها التفصيلية، مع مصفوفة تدقيق التغطية الهندسية (Traceability Matrix) لضمان عدم اختراع شاشات زائدة وحفظ المخرج في docs/SCREEN_INVENTORY.md.',
    tags: ['Screen Inventory', 'MVP Scope', 'No Invented Screens', 'Components', 'Data Requirements', 'Traceability Matrix', 'BorrowHub'],
    contentTypes: ['prompt', 'code', 'checklist'],
    diagramCount: 0,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic20ScreenInventoryHtml),
    htmlContent: topic20ScreenInventoryHtml,

    goal: 'تمكين الطالب من إعداد جرد شاشات كامل ومنضبط (Screen Inventory) يربط كل شاشة بهدفها المباشر، الأدوار المصرح لها، المسار، المكونات، مصادر البيانات، الإجراءات، وقواعد التحقق، مع الالتزام الصارم بقاعدة عدم اختراع أي شاشات خارج نطاق الـ MVP وتوثيقه في docs/SCREEN_INVENTORY.md.',
    prerequisites: [
      'وثيقة متطلبات الواجهة docs/UI_UX_REQUIREMENTS.md',
      'مخطط تجربة المستخدم وخريطة الموقع docs/UX_BLUEPRINT.md',
      'وثيقة متطلبات المنتج docs/PRD.md وقواعد العمل'
    ],
    steps: [
      '1. احصر قائمة الشاشات الإلزامية لنطاق MVP فقط مستنداً إلى PRD وخريطة الموقع، وامتنع تماماً عن إضافة شاشات افتراضية غير مطلوبة.',
      '2. صنف الشاشات بحسب الأولوية: شاشات جوهرية (Core) لا يعمل المنتج بدونها، وشاشات مساندة (Supporting)، واعزل شاشات المستقبل (Future) خارج الجرد.',
      '3. امنح كل شاشة معرفاً ثابتاً وفريداً (مثل SCR-01 إلى SCR-06) واسماً واضحاً بالعربية والإنجليزية.',
      '4. لكل شاشة في الجرد، وثّق: الهدف، الأدوار المخولة، المسار في Next.js، المكونات الأساسية، البيانات المطلوبة، والإجراءات المتاحة.',
      '5. اربط كل شاشة بحالاتها الخاصة المشتقة من UX Blueprint: رسائل الفراغ المحددة، قواعد التحقق، ومعايير التجاوب الخاصة بها.',
      '6. راجع التغطية الكاملة (Coverage Audit) بين متطلبات PRD وجرد الشاشات للتأكد من عدم سقوط أي قاعدة عمل أو مسار تدفق.',
      '7. احفظ الجرد الكامل في docs/SCREEN_INVENTORY.md ليكون الأساس المعتمد لبناء برومبتات الشاشات في Google Stitch.'
    ],
    promptRefs: ['prompt-15-ux-blueprint-screen-inventory'],
    outputs: [
      'docs/SCREEN_INVENTORY.md',
      'جدول جرد الشاشات المعتمد (Screen Inventory Table)',
      'مصفوفة تدقيق التغطية (Requirements-to-Screens Traceability Matrix)'
    ],
    checklist: [
      'حصر جميع شاشات الـ MVP دون أي زيادة أو اختراع شاشات وهمية.',
      'ربط كل شاشة بهدفها وأدوارها ومسارها ومكوناتها وبياناتها وإجراءاتها.',
      'تحديد شاشات Core وSupporting بوضوح وعزل الشاشات المستقبلية.',
      'توثيق حالات الشاشة الميدانية (فراغ، خطأ، نجاح) لكل شاشة بشكل مخصص.',
      'التأكد من التغطية الكاملة لقواعد العمل (مثل قواعد BorrowHub 3 و7 و8).',
      'إنشاء واعتماد ملف docs/SCREEN_INVENTORY.md في المستودع.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 20,
  },
];
