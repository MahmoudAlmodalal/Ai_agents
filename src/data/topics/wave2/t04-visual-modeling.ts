import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 07: Mermaid Syntax & Renderer Usage
 * Sequence Position: 7
 * ========================================================================= */
export const topic07Html = `
<section id="topic-07-mermaid" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 07 · المحطة الأساسية</span>
    <span class="step-pill">أدوات الرسم والنمذجة الهندسية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">صيغة Mermaid ومحرك التصيير في المتصفح</h2>
      <div class="step-subtitle">كتابة المخططات الهندسية ككود نصي قابل للإصدار والمراجعة والتصيير المباشر</div>
    </div>
  </div>

  <!-- 1. Why Diagrams as Code -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. فلسفة المخططات ككود (Diagrams as Code)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مسار هندسة البرمجيات المنضبطة، نتجنب استخدام الصور الثابتة (PNG / JPG) لتوثيق بنية النظام؛ فالصور الثابتة <strong>تفقد سياقها سريعاً</strong>، وتتعذر مراجعتها في طلبات السحب (Pull Requests)، ولا يمكن تتبع تاريخ تعديلاتها عبر Git.
      الحل الهندسي المعتمد هو <strong>Diagrams as Code</strong> بواسطة <code>Mermaid.js</code>: نكتب المخطط كنص برمجي بسيط داخل ملفات <code>Markdown</code>، فيقوم المتصفح أو بيئة التطوير بتصييره فورياً إلى رسم بياني تفاعلي.
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>المعيار الهندسي</th>
            <th>الصور النقطية التقليدية (Images)</th>
            <th>مخططات ككود نصي (Mermaid.js)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>التخزين والإصدار في Git</strong></td>
            <td>ملفات ثنائية ضخمة لا تظهر الفروق بين الإصدارات (No Diff)</td>
            <td>نص خالص خفيف يُظهر سطر التعديل بدقة متناهية (Git Diff)</td>
          </tr>
          <tr>
            <td><strong>المراجعة في Pull Requests</strong></td>
            <td>تتطلب إعادة تصدير الصورة ورفعها مجدداً</td>
            <td>مراجعة نصية فورية مباشرة بجانب التوثيق والكود</td>
          </tr>
          <tr>
            <td><strong>التحديث والتعديل</strong></td>
            <td>معقد، يتطلب ملف المصدر الأصلي والبرنامج الرسومي</td>
            <td>تعديل سطر واحد في ملف Markdown بنقرة زر واحدة</td>
          </tr>
          <tr>
            <td><strong>التصيير (Rendering)</strong></td>
            <td>ثابت ولا يدعم الثيم المظلم أو التكبير عالي الدقة</td>
            <td>ناقل شعاعي (SVG) متجاوب يدعم Dark Mode والتكبير غير المحدود</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 2. Core Mermaid Syntax -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. الصيغ الأساسية والأشكال في Mermaid</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تبدأ صياغة المخطط في Mermaid بتحديد نوعه واتجاهه. أكثر الأنواع استخداماً في مرحلة التحليل الأولي هما:
      <code>flowchart TD</code> (من الأعلى إلى الأسفل - Top-Down) لمسارات العمليات والقرارات، و<code>flowchart LR</code> (من اليسار إلى اليمين - Left-to-Right) للنماذج المفاهيمية والهيكلية.
    </p>

    <!-- Syntax Table -->
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الشكل الهندسي</th>
            <th>صيغة الكود في Mermaid</th>
            <th>الاستخدام الشائع في المسار</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>مستطيل قياسي (Box)</strong></td>
            <td><code>id["نص الخطوة أو المفهوم"]</code></td>
            <td>الخطوات الإجرائية، مفاهيم العمل، الشاشات</td>
          </tr>
          <tr>
            <td><strong>معين القرار (Decision)</strong></td>
            <td><code>cond{"شرط القرار أو الفحص؟"}</code></td>
            <td>نقاط الفحص الشرطي (نعم / لا، نجاح / فشل)</td>
          </tr>
          <tr>
            <td><strong>مستطيل دائري الحواف (Rounded)</strong></td>
            <td><code>node("إجراء نظام أو حالة")</code></td>
            <td>العمليات التلقائية الداخلية وحالات النظام</td>
          </tr>
          <tr>
            <td><strong>شكل الملعب (Stadium)</strong></td>
            <td><code>start(["نقطة البداية / النهاية"])</code></td>
            <td>بداية الرحلة ونهايتها (Entry & Exit Points)</td>
          </tr>
          <tr>
            <td><strong>أسطوانة قاعدة بيانات (Cylinder)</strong></td>
            <td><code>db[("مخزن البيانات")]</code></td>
            <td>تمثيل مخازن البيانات وحفظ السجلات</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Copyable Mermaid Code Example -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (flowchart TD) — مثال حي قابل للنسخ</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود Mermaid">نسخ</button>
      </div>
      <pre class="code-content"><code>flowchart TD
    Start(["بدء: تصفح المعدات"]) --&gt; CheckAuth{"هل الطالب مسجل ومعتمد؟"}
    CheckAuth -- نعم --&gt; Browse["عرض قائمة المعدات المتاحة"]
    CheckAuth -- لا --&gt; RedirectLogin["توجيه لصفحة تسجيل الدخول"]
    Browse --&gt; SelectItem["اختيار معدة وطلب استعارة"]
    SelectItem --&gt; Finish(["نهاية مرحلة الاختيار"])</code></pre>
    </div>
  </div>

  <!-- 3. RTL / LTR Directionality Rules -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. قواعد الاتجاهية: عربي RTL مقابل كود LTR</h3>
    <div class="callout tip">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>قاعدة ذهبية للاتجاهات</span>
      </div>
      <p>
        شرح المخطط والتوثيق والتحليل يكتب دائماً باللغة العربية باتجاه <strong>RTL (من اليمين إلى اليسار)</strong> لضمان سلامة القراءة والفهم.
        بينما تُكتب كتل أكواد Mermaid دائماً باتجاه <strong>LTR (من اليسار إلى اليمين)</strong> داخل وسوم <code>dir="ltr"</code> وكتل كود <code>\`\`\`mermaid</code>؛ لضمان عدم انقلاب الأسهم الشرطية وتناسق علامات التنصيص والأقواس.
      </p>
    </div>
  </div>

  <!-- 4. Rendering Engine & Error Handling -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. محرك التصيير المحلي ومعالجة أخطاء الصياغة (Error Handling)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يعمل عارض المخططات المدمج في الموقع التعليمي محلياً بنسبة 100% داخل المتصفح بواسطة مكتبة <code>mermaid.render()</code> دون إرسال بياناتك إلى أي خادم خارجي (Zero API / Zero Telemetry).
      إذا احتوى كود Mermaid على خطأ صياغي (Syntax Error) مثل قوس غير مغلق أو سهم مكسور، يتعامل المحرك بحصافة:
      <strong>يُظهر تنبيهاً موضعياً واضحاً يحدد سبب الخطأ دون تعطيل الصفحة أو كسر قراءة بقية الدرس</strong>.
    </p>

    <!-- Error Demo Callout -->
    <div class="rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/20 p-5 my-4">
      <div class="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold mb-2">
        <span>⚠️</span>
        <span>كيف يعرض النظام أخطاء الصياغة دون تعطيل القراءة؟</span>
      </div>
      <p class="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-6">
        عند حدوث خطأ نحوي في الكود (مثل نسيان علامة تنصيص <code>["نص</code>)، يلتقط العارض الخطأ في كتلة <code>try / catch</code> ويعرض رسالة الخطأ الموضعية التالية، مع إبقاء أزرار التنقل والدروس المحيطة قابلة للقراءة تماماً:
      </p>
      <div class="mt-3 p-3 rounded-xl bg-slate-900 text-rose-400 font-mono text-xs border border-rose-700/50" dir="ltr">
        تعذر تصيير المخطط: Parse error on line 2: ... Unclosed quotation mark
      </div>
    </div>
  </div>

  <!-- 5. Online Testing with Mermaid Live -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. بيئة التجربة: محرّر Mermaid Live</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      قبل اعتماد المخطط في توثيق مشروعك، يمكنك تجربة كودك وتعديله في محرر
      <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" class="font-bold text-[var(--brand-primary)] underline">Mermaid Live Editor</a>.
      يتيح لك المحرر المباشر فحص المخطط فورياً وتنزيل صور SVG أو PNG واستخراج روابط قابلة للمشاركة.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 08: User Flow Modeling
 * Sequence Position: 8
 * ========================================================================= */
export const topic08Html = `
<section id="topic-08-user-flow" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 08 · المحطة الأساسية</span>
    <span class="step-pill">رحلة المستخدم وهندسة السلوك</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">نمذجة مسارات تدفق المستخدم (User Flow)</h2>
      <div class="step-subtitle">رسم رحلة المستخدم وقراراته ومسارات النجاح والفشل استناداً إلى PRD</div>
    </div>
  </div>

  <!-- 1. What is User Flow -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو الـ User Flow ولماذا يأتي بعد PRD مباشرة؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يوضح <strong>User Flow</strong> كيف ينجز المستخدم هدفاً محدداً من نقطة البداية إلى نقطة النهاية، متتبعاً الخطوات الإجرائية ونقاط اتخاذ القرار ومسارات النجاح والخطأ.
      <strong>القاعدة الذهبية:</strong> لا تضف أي سلوك أو شاشة أو ميزة غير موجودة في وثيقة <code>docs/PRD.md</code>. الـ User Flow ليس مكاناً لابتكار ميزات جديدة، بل هو ترجمة هندسية بصرية لمتطلبات معتمدة.
    </p>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>الفرق بين PRD و User Flow وتصميم الواجهات UI</span>
      </div>
      <p>
        <strong>PRD:</strong> تجيب عن <em>"ماذا نريد ولماذا وما هي قواعد العمل؟"</em>.<br>
        <strong>User Flow:</strong> يجيب عن <em>"ما هي الخطوات والقرارات التي يمر بها المستخدم لإنجاز هذا الهدف؟"</em>.<br>
        <strong>UI Screens:</strong> تجيب عن <em>"كيف سيبدو كل زر وكل حقل بصرياً على الشاشة؟"</em>.
      </p>
    </div>
  </div>

  <!-- 2. Anatomy of User Flow -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. أركان مخطط مسار المستخدم المتكامل</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      أي مخطط تدفق مستخدم احترافي لنطاق الـ MVP يجب أن يشتمل على المكونات الخمسة التالية بوضوح تام:
    </p>

    <ol class="space-y-3 my-4 pr-4 leading-7 text-[var(--text-muted)] list-decimal list-inside">
      <li><strong>حالة البداية (Entry State):</strong> أين يقف المستخدم عند انطلاق الرحلة (مثلاً: صفحة الهبوط أو كتالوج الأجهزة).</li>
      <li><strong>إجراءات المستخدم (User Actions):</strong> الأفعال التي يقوم بها المستخدم (النقر، البحث، ملء النموذج، إرسال الطلب).</li>
      <li><strong>ردود النظام (System Responses):</strong> الاستجابة الفورية للنظام (التحقق من البيانات، فحص الرصيد، عرض التنبيه).</li>
      <li><strong>نقاط اتخاذ القرار (Decision Points):</strong> تفرعات الشرط الحاسم بصيغة سؤال (نعم / لا) تحدد المسار اللاحق.</li>
      <li><strong>مسار النجاح ومسارات الفشل (Happy & Failure Paths):</strong>
        <ul>
          <li><strong>مسار النجاح (Happy Path):</strong> الطريق المباشر الذي يسير فيه المستخدم حين تسير كل الشروط بسلاسة.</li>
          <li><strong>مسارات الفشل والاعتذار (Failure & Edge Cases):</strong> معالجة الأخطاء (نفاد الكمية، تجاوز الحد الأقصى، رفض الاعتماد).</li>
        </ul>
      </li>
    </ol>
  </div>

  <!-- 3. Practical Case Study: BorrowHub Equipment Loan Flow -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. دراسة حالة BorrowHub: مسار استعارة معدة معملية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      المثال التالي يوضح مسار استعارة جهاز في دراسة حالة <strong>BorrowHub</strong>، مبيناً نقاط القرار المرتبطة بقواعد العمل الموثقة (مثل: الحد الأقصى 2 استعارة نشطة - القاعدة 3، والتسليم خلال 48 ساعة - القاعدة 7):
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (flowchart TD) — كود مسار الاستعارة الكامل في BorrowHub</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود مسار الاستعارة">نسخ</button>
      </div>
      <pre class="code-content"><code>flowchart TD
    Start(["بدء: استعارة معدة معملية"]) --&gt; Browse["تصفح كتالوج المعدات المتاحة"]
    Browse --&gt; SelectItem["اختيار معدة والنقر على طلب استعارة"]
    
    SelectItem --&gt; CheckAuth{"هل حساب الطالب معتمد؟"}
    CheckAuth -- لا --&gt; ShowAuthError["عرض رسالة: الحساب بانتظار اعتماد الإدارة"] --&gt; ExitAuth(["نهاية: إيقاف الطلب"])
    
    CheckAuth -- نعم --&gt; CheckStock{"هل المعدة متوفرة في المخزن؟"}
    CheckStock -- لا --&gt; ShowOutOfStock["عرض رسالة: المعدة غير متوفرة حالياً"] --&gt; ExitStock(["نهاية: اقتراح بدائل"])
    
    CheckStock -- نعم --&gt; CheckActiveLoans{"هل عدد الإعارات النشطة للطالب &lt; 2؟"}
    CheckActiveLoans -- لا --&gt; ShowLimitError["خطأ: لقد وصلت للحد الأقصى للإعارة (جهازان)"] --&gt; ExitLimit(["نهاية: رفض تقديم الطلب"])
    
    CheckActiveLoans -- نعم --&gt; SubmitRequest["إدخال تواريخ الاستعارة والغرض وإرسال الطلب"]
    SubmitRequest --&gt; PendingReview["حالة الطلب: قيد مراجعة مسؤول المستودع"]
    
    PendingReview --&gt; AdminDecision{"قرار مسؤول المستودع"}
    AdminDecision -- رفض --&gt; NotifyRejection["إشعار الطالب بسبب الرفض وإغلاق الطلب"] --&gt; ExitReject(["نهاية: طلب مرفوض"])
    
    AdminDecision -- موافقة --&gt; ApprovedReady["اعتماد الطلب وبدء مهلة الاستلام (48 ساعة)"]
    ApprovedReady --&gt; Handover["حضور الطالب ومسؤول المستودع وتأكيد التسليم"]
    Handover --&gt; ActiveLoan(["المعدة بحوزة الطالب: إعارة نشطة بنجاح ✓"])</code></pre>
    </div>
  </div>

  <!-- 4. Official PROMPT 05 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. برومبت توليد مسار المستخدم (PROMPT 05 المعتمد)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم هذا البرومبت المعتمد من مرجع المسار لتوليد مسارات مستخدم دقيقة لمشروعك استناداً إلى ملف <code>docs/PRD.md</code>:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 05 — User Flow</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 05">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior UX Designer.
Read docs/PRD.md. Create a User Flow for each major confirmed MVP journey.
Include user actions, system responses, decision points, success/error paths,
entry/exit states and role-based navigation.
Use valid Mermaid flowchart TD. Do not invent business rules.
Create docs/user-flow.md with Mermaid source, Arabic explanation,
related PRD requirements and open questions.
Do not generate other diagrams or code.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 09: Conceptual Domain Model
 * Sequence Position: 9
 * ========================================================================= */
export const topic09Html = `
<section id="topic-09-domain-model" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 09 · المحطة الأساسية</span>
    <span class="step-pill">نمذجة مفاهيم الأعمال</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)</h2>
      <div class="step-subtitle">تحديد مفاهيم العمل وعلاقاتها بلغة الأعمال دون تفاصيل تقنية أو جداول SQL</div>
    </div>
  </div>

  <!-- 1. What is Conceptual Domain Model -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو النموذج المفاهيمي؟ ولمن نوجهه؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الـ <strong>Conceptual Domain Model</strong> هو تمثيل بصري مجرد لمفاهيم مجال العمل (Business Concepts) ومسؤولياتها والعلاقات المنطقية التي تربط بينها، باستخدام <strong>لغة يفهمها العميل وصاحب العمل وخبير المجال</strong>.
      إنه يصف <em>عالم المشكلة (Problem Space)</em> وليس <em>عالم الحل البرمجي وقواعد البيانات (Solution Space)</em>.
    </p>

    <!-- The 3 Golden Negatives -->
    <div class="rounded-2xl border-2 border-amber-400 bg-amber-50/80 dark:bg-amber-950/30 p-6 my-6">
      <div class="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-lg mb-3">
        <span>🛑</span>
        <span>المحظورات الثلاثة الإلزامية في النموذج المفاهيمي (Strict Boundaries)</span>
      </div>
      <p class="text-sm leading-7 text-amber-950 dark:text-amber-100 font-medium mb-4">
        لكي يظل النموذج مفاهيمياً خالصاً ولا يختلط بمخطط قاعدة البيانات (ERD) أو مخطط الفئات البرمجية (Class Diagram)، يُمنع منعاً باتاً تضمين أي من العناصر التالية:
      </p>
      <ul class="space-y-2.5 text-sm leading-6 text-amber-950 dark:text-amber-200">
        <li class="flex items-start gap-2">
          <span class="font-bold text-red-600 dark:text-red-400">✗ ممنوع:</span>
          <span><strong>مفاتيح قواعد البيانات:</strong> لا تضع معرّفات تقنية مثل <code>PK</code> أو <code>FK</code> أو <code>student_id UUID</code>. المفاهيم ترتبط بعلاقات تجارية صريحة وليست مفاتيح أجنبية.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="font-bold text-red-600 dark:text-red-400">✗ ممنوع:</span>
          <span><strong>أنواع بيانات SQL والبرمجة:</strong> لا تذكر <code>VARCHAR(255)</code> أو <code>INT</code> أو <code>BOOLEAN</code> أو <code>TIMESTAMP</code>. هذا توصيف تخزيني مكانه الـ ERD.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="font-bold text-red-600 dark:text-red-400">✗ ممنوع:</span>
          <span><strong>الدوال والعمليات البرمجية:</strong> لا تضع <code>()calculatePenalty</code> أو <code>()approveLoan</code> أو كلاسات OOP. هذا منطق برمجي مكانه الـ Class Diagram.</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- 2. Difference Table -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. المقارنة الجوهرية: Domain Model مقابل ERD مقابل Class Diagram</h3>
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>وجه المقارنة</th>
            <th>النموذج المفاهيمي (Domain Model)</th>
            <th>مخطط قاعدة البيانات (ERD)</th>
            <th>مخطط الكلاسات (Class Diagram)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>العدسة والتركيز</strong></td>
            <td>مفاهيم مجال العمل وعلاقاتها الواقعية</td>
            <td>جداول التخزين والمفاتيح والعلاقات العلائقية</td>
            <td>الهياكل البرمجية والخصائص والدوال</td>
          </tr>
          <tr>
            <td><strong>المفاتيح (PK / FK)</strong></td>
            <td><span class="text-rose-600 font-bold">مرفوضة تماماً</span></td>
            <td><span class="text-emerald-600 font-bold">إلزامية وأساسية</span></td>
            <td>غير مستخدمة (تُستبدل بمراجع الكائنات)</td>
          </tr>
          <tr>
            <td><strong>أنواع البيانات</strong></td>
            <td>مفاهيمية (مثل: اسم، كمية، تاريخ)</td>
            <td>أنواع SQL محددة (INT, VARCHAR, TIMESTAMP)</td>
            <td>أنواع اللغة البرمجية (string, number, Date)</td>
          </tr>
          <tr>
            <td><strong>الدوال والعمليات</strong></td>
            <td><span class="text-rose-600 font-bold">مرفوضة تماماً</span></td>
            <td>غير موجودة (تقتصر على القيود والـ Triggers)</td>
            <td><span class="text-emerald-600 font-bold">إلزامية (Methods / Functions)</span></td>
          </tr>
          <tr>
            <td><strong>الصيغة الموصى بها</strong></td>
            <td><code>Mermaid flowchart LR</code></td>
            <td><code>DBML + Mermaid erDiagram</code></td>
            <td><code>Mermaid classDiagram</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. BorrowHub Domain Model Example -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. مثال تطبيقي: النموذج المفاهيمي لمشروع BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مشروع <strong>BorrowHub</strong>، نستخرج مفاهيم العمل ومسؤولياتها والعلاقات التي تربطها دون أي إشارة لقواعد البيانات أو لغات البرمجة:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (flowchart LR) — Conceptual Domain Model الخالص</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود النموذج المفاهيمي">نسخ</button>
      </div>
      <pre class="code-content"><code>flowchart LR
    subgraph Users_Domain["مجال المستفيدين والإدارة"]
        Student["الطالب (Student)<br/>المستعير المعتمد في المنظومة"]
        Staff["مسؤول المستودع (Staff)<br/>إدارة العهدة والاعتماد والتسليم"]
    end

    subgraph Inventory_Domain["مجال الأجهزة والعهد"]
        Category["تصنيف المعدات (Equipment Category)<br/>القواعد والتعليمات العامة للنوع"]
        Equipment["المعدة المعملية (Equipment)<br/>الأصل الفيزيائي المتاح للإعارة"]
    end

    subgraph Loan_Domain["مجال عمليات الاستعارة والتسليم"]
        LoanRequest["طلب الاستعارة (Loan Request)<br/>فترة الحجز، الغرض، وحالة الاعتماد"]
        Handover["محضر التسليم (Handover Record)<br/>توثيق الاستلام الفعلي وبدء الإعارة"]
        Inspection["فحص الإرجاع (Inspection & Return)<br/>معاينة سلامة المعدة ورصد التلفيات"]
    end

    Category -- "يصنّف ويحدد معايير" --&gt; Equipment
    Student -- "يطلب استعارة" --&gt; LoanRequest
    LoanRequest -- "يحدد الجهاز المطلوب" --&gt; Equipment
    Staff -- "يعتمد أو يرفض" --&gt; LoanRequest
    LoanRequest -- "ينتج عنه عند الموافقة" --&gt; Handover
    Staff -- "يشرف على تسليم" --&gt; Handover
    Handover -- "يُختتم بإجراء" --&gt; Inspection
    Inspection -- "يحدّث حالة التوفر لـ" --&gt; Equipment</code></pre>
    </div>
  </div>

  <!-- 4. Official PROMPT 06 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. برومبت توليد النموذج المفاهيمي (PROMPT 06 المعتمد)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم هذا البرومبت المعتمد لاستنطاق النموذج المفاهيمي لمشروعك من وثيقتي <code>docs/PRD.md</code> و<code>docs/user-flow.md</code>:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 06 — Conceptual Domain Model (not UML)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 06">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Domain Analyst.
Read docs/PRD.md and docs/user-flow.md if available.
Create ONLY a conceptual Domain Model using Mermaid flowchart LR.
Show business concepts, their responsibilities, boundaries and labeled
relationships. Avoid SQL tables, PK/FK, data types, UML classes or methods.
Use cardinality only when confirmed. No invented business rules.
Save docs/diagrams/domain-model.md and domain-model.mmd.
Explain the model and open questions in Arabic.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * WAVE 2 ENTRIES EXPORT FOR TICKET 04
 * ========================================================================= */
export const t04Entries: TopicItem[] = [
  {
    id: 'mermaid-syntax',
    number: '07',
    slug: 'mermaid-syntax',
    title: 'صيغة Mermaid ومحرك التصيير في المتصفح',
    subtitle: 'كتابة المخططات ككود نصي قابل للإصدار والنسخ والتصيير المباشر',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'أدوات الرسم والنمذجة',
    summary: 'إتقان صيغة Mermaid.js كأداة رسم تعتمد على النصوص (Diagrams as Code)، واستخدام محرك التصيير المدمج ومحرر Mermaid Live، مع معالجة أخطاء الصياغة وفصل التوثيق عن التنفيذ البرمجي.',
    tags: ['Mermaid', 'Diagrams as Code', 'Mermaid Live', 'flowchart', 'sequenceDiagram', 'Syntax Error', 'RTL/LTR'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic07Html),
    htmlContent: topic07Html,

    goal: 'تمكين الطالب من صياغة مخططات Mermaid البرمجية والمعمارية بدقة، ومعاينة الرسوم محلياً ومشاركتها في ملفات docs/ عبر كتل كود LTR وشروحات RTL دون تعطيل القراءة.',
    prerequisites: [
      'معرفة أساسيات التوثيق المنظم في مجلد docs/',
      'معرفة صيغة Markdown الأساسية'
    ],
    steps: [
      '1. استوعب فلسفة Diagrams as Code: المخطط النصي يُحفظ في Git ويخضع للمراجعة والتعديل تماماً كالكود، ولا يُفقد سياقه كما يحدث مع الصور الثابتة.',
      '2. افتح محرر Mermaid Live (https://mermaid.live) وجرّب كتابة flowchart TD مع تعريف العقد والوصلات والأنماط التنسيقية.',
      '3. تعلّم التمييز بين اتجاهات الرسم: TD (من الأعلى للأسفل) للتدفقات، وLR (من اليسار لليمين) للمفاهيم والهياكل الأفقية.',
      '4. احرص على حصر كتل الكود باتجاه LTR حصراً داخل علامات ```mermaid مع كتابة الشروح العربية المحيطة باتجاه RTL لتجنب انقلاب الأسهم والرموز.',
      '5. افهم كيف يتعامل محرك التصيير المحلي مع أخطاء الكتابة: ظهور إشعار خطأ موضعي (Inline Error) دون إسقاط الصفحة أو كسر قراءة بقية التوثيق.',
      '6. جهّز قالباً نصياً للمخططات في مستودع مشروعك داخل docs/diagrams/ تمهيداً لرسم User Flow وDomain Model.'
    ],
    promptRefs: ['prompt-05-user-flow', 'prompt-06-conceptual-domain-model-not-uml'],
    outputs: [
      'docs/diagrams/README.md',
      'أكواد Mermaid قياسية صالحة للتصيير'
    ],
    checklist: [
      'فهم الفرق بين حفظ المخطط ككود نصي في Git وتخزينه كصورة نقطية جامدة.',
      'إتقان أنواع المخططات الأساسية في Mermaid (flowchart TD, flowchart LR, sequenceDiagram).',
      'الالتزام باتجاه LTR لكتل الكود النصية وRTL للشروح والتوثيق العربي.',
      'التأكد من جاهزية محرك التصيير المحلي والتعامل مع رسائل الأخطاء بوضوح دون تشويش التصفح.',
      'إنشاء مجلد docs/diagrams/ وتجهيزه لاستقبال مخططات التحليل القادمة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 7,
  },
  {
    id: 'user-flow-modeling',
    number: '08',
    slug: 'user-flow-modeling',
    title: 'نمذجة مسارات تدفق المستخدم (User Flow)',
    subtitle: 'رسم رحلة المستخدم وقراراته ومسارات النجاح والفشل استناداً إلى PRD',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'رحلة المستخدم وهندسة السلوك',
    summary: 'تحويل متطلبات PRD المعتمدة إلى مسارات تدفق مستخدم (User Flow) منضبطة بصيغة Mermaid flowchart TD، وتحديد نقاط القرار، ورسم مسار النجاح (Happy Path) ومسارات الفشل والاعتذار دون اختراع قواعد عمل غير موثقة.',
    tags: ['User Flow', 'Mermaid', 'Happy Path', 'Failure Path', 'Decision Points', 'PRD', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic08Html),
    htmlContent: topic08Html,

    goal: 'صياغة مسار تدفق مستخدم كامل لنطاق الـ MVP يوضح خطوات المستخدم ونقاط القرار ومسارات النجاح والرفض، وتوثيقه في docs/user-flow.md استناداً الصارم لوثيقة PRD.',
    prerequisites: [
      'وثيقة متطلبات المنتج المعتمدة docs/PRD.md',
      'إتقان صيغة Mermaid flowchart TD من الموضوع السابق'
    ],
    steps: [
      '1. استخرج رحلات المستخدم الرئيسية من docs/PRD.md وحالات الاستخدام الأساسية لنطاق MVP.',
      '2. حدد نقطة البداية (Entry State) ونقطة النهاية (Exit State) لكل رحلة مستخدم مؤكدة.',
      '3. ارسم مسار النجاح الأساسي (Happy Path) من التصفح إلى إتمام العملية.',
      '4. حدد نقاط اتخاذ القرار (Decision Points) بصيغة شكل المعيّن {"{الشرط}"} وتفرعاته المباشرة (نعم / لا).',
      '5. ارسم مسارات الفشل والاعتذار (Failure Paths) مثل: تجاوز حد الاستعارة، الحساب غير معتمد، المعدة غير متوفرة.',
      '6. استخدم برومبت User Flow المعتمد (PROMPT 05) لإنشاء كود Mermaid flowchart TD دقيق دون إضافة أي سلوك غير موجود في PRD.',
      '7. احفظ المسار والشرح بالعربية في docs/user-flow.md وافحصه في عارض المخططات.'
    ],
    promptRefs: ['prompt-05-user-flow'],
    outputs: [
      'docs/user-flow.md',
      'مخطط Mermaid flowchart TD لمسارات MVP'
    ],
    checklist: [
      'ارتباط جميع المسارات بمتطلبات موثقة في PRD دون اختراع ميزات أو شاشات وهمية.',
      'ظهور مسار النجاح (Happy Path) بوضوح من البداية حتى المخرج النهائي.',
      'ظهور جميع نقاط القرار (Decision Points) وفروعها (نعم/لا) بصراحة.',
      'تغطية مسارات الفشل والاعتذار وكيفية تعافي المستخدم منها.',
      'صلاحية كود Mermaid flowchart TD وقابليته للتصيير دون أخطاء.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 8,
  },
  {
    id: 'conceptual-domain-model',
    number: '09',
    slug: 'conceptual-domain-model',
    title: 'النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)',
    subtitle: 'تحديد مفاهيم العمل وعلاقاتها بلغة الأعمال دون تفاصيل تقنية أو جداول SQL',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'نمذجة مفاهيم الأعمال',
    summary: 'بناء نموذج مفاهيمي (Conceptual Domain Model) خالص بصيغة Mermaid flowchart LR يحدد مفاهيم النظام ومسؤولياتها والعلاقات بينها بلغة الأعمال، مع الالتزام التام بالابتعاد عن مفاتيح قواعد البيانات (No PK/FK)، وأنواع SQL، والكلاسات والدوال البرمجية.',
    tags: ['Domain Model', 'Conceptual', 'DDD', 'Business Terminology', 'No SQL Types', 'No DB Keys', 'Mermaid'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic09Html),
    htmlContent: topic09Html,

    goal: 'بناء وتوثيق نموذج مفاهيمي لنطاق MVP يربط مفاهيم العمل وعلاقاتها وحدودها بلغة واضحة يفهمها صاحب المشروع دون أي تفاصيل تقنية من عالم قواعد البيانات أو البرمجة.',
    prerequisites: [
      'وثيقة متطلبات المنتج docs/PRD.md',
      'مسارات تدفق المستخدم docs/user-flow.md',
      'قاموس مصطلحات المشروع المعتمد'
    ],
    steps: [
      '1. استخرج الكيانات ومفاهيم العمل الجوهرية (Domain Concepts) من PRD ومسارات تدفق المستخدم.',
      '2. عرّف مسؤولية كل مفهوم في جملة واحدة واضحة تعبر عن الغرض التجاري منه.',
      '3. ارسم العلاقات بين المفاهيم باستخدام مسميات لغة الأعمال (يقدم، يرتبط بـ، يخضع لفحص).',
      '4. احذر خلط المفاهيم بالتقنية: امنع تماماً إضافة مفاتيح أساسية أو أجنبية (PK/FK)، أو أنواع بيانات SQL، أو دوال برمجية.',
      '5. استخدم برومبت النموذج المفاهيمي المعتمد (PROMPT 06) لتوليد كود Mermaid flowchart LR منضبط.',
      '6. احفظ النموذج في docs/diagrams/domain-model.md وملف domain-model.mmd واشرح المفاهيم بالعربية.'
    ],
    promptRefs: ['prompt-06-conceptual-domain-model-not-uml'],
    outputs: [
      'docs/diagrams/domain-model.md',
      'docs/diagrams/domain-model.mmd'
    ],
    checklist: [
      'النموذج مفاهيمي خالص: خلو تام من مفاتيح PK/FK ومعرفات الجداول الفنية.',
      'خلو تام من أنواع بيانات SQL (مثل VARCHAR, INT, TIMESTAMP).',
      'خلو تام من الدوال البرمجية (Methods) أو تمثيل كلاسات الـ OOP.',
      'تسمية العلاقات بين المفاهيم بأفعال أعمال صريحة ومفهومة لأصحاب الشأن.',
      'حفظ وتوثيق النموذج في docs/diagrams/domain-model.md والتأكد من صحة تصييره.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 9,
  },
];
