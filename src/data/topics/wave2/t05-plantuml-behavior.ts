import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 10: PlantUML Tool & Live Editors
 * Sequence Position: 10
 * ========================================================================= */
export const topic10Html = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-10-plantuml" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 10 · المحطة الأساسية</span>
    <span class="step-pill">أدوات النمذجة السلوكية ككود</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">أداة ومحرر PlantUML للنمذجة الهندسية ككود</h2>
      <div class="step-subtitle">فهم بيئة PlantUML والفرق بينها وبين Mermaid ومحررات التصيير المباشر وقوالب الكود القابلة للنسخ</div>
    </div>
  </div>

  <!-- 1. Philosophy of PlantUML -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. فلسفة أداة PlantUML في مسار هندسة البرمجيات</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تُعد <strong>PlantUML</strong> من أقدم وأقوى الأدوات مفتوحة المصدر في عالم <em>Diagrams as Code</em>؛ حيث صُممت لتطبيق معايير اتحاد إدارة الكائنات (OMG UML Standard) بدقة بالغة.
      بينما نعتمد على Mermaid في مسارات العمل السريعة داخل المتصفح، تبرز الحاجة الهندسية لأداة PlantUML عند نمذجة <strong>مخططات حالات الاستخدام (Use Case Diagrams)</strong>، حيث توفر تمثيلاً بيانياً قياسياً للفواعل (Actors) وحدود النظام (System Boundaries) والعلاقات الإلزامية والشرطية (include / extend) دون تشويه بصري.
    </p>

    <!-- Distinction from Mermaid Table -->
    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>وجه المقارنة</th>
            <th>أداة PlantUML</th>
            <th>أداة Mermaid.js</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المعيار الهندسي</strong></td>
            <td>امتثال صارم لمواصفات UML 2.x الرسمية (Actors, Use Cases, Boundaries)</td>
            <td>تركيز على الرسوم الإجرائية السريعة (Flowcharts, Sequences, State)</td>
          </tr>
          <tr>
            <td><strong>محرك التصيير (Rendering)</strong></td>
            <td>يعتمد على محرك Java مع مكتبة Graphviz لتخطيط العقد وتوليد الصور</td>
            <td>يعمل بنسبة 100% داخل المتصفح عبر JavaScript وتوليد SVG المباشر</td>
          </tr>
          <tr>
            <td><strong>التوافق مع المحررات الحية</strong></td>
            <td><strong class="text-amber-600 dark:text-amber-400">لا يعمل إطلاقاً داخل Mermaid Live!</strong> يتطلب محررات مخصصة</td>
            <td>مدعوم مباشرة في Mermaid Live وGitHub Markdown دون إضافات</td>
          </tr>
          <tr>
            <td><strong>محررات الويب المعتمدة</strong></td>
            <td>محرر <a href="https://www.planttext.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">PlantText</a> وخادم <a href="https://www.plantuml.com/plantuml/uml/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">PlantUML Server</a> الرسمي</td>
            <td>محرر Mermaid Live Editor عبر المتصفح</td>
          </tr>
          <tr>
            <td><strong>الاستخدام المعتمد في المسار</strong></td>
            <td>مخطط حالات الاستخدام (Use Case Diagram) وصلاحيات الأدوار</td>
            <td>تدفق المستخدم (User Flow)، مخطط النشاط (Activity)، ومخطط الحالات (State)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 2. Supported Editors and Live Links -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. محررات وبيئات تشغيل PlantUML المعتمدة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لإنشاء ومعاينة مخططات PlantUML الخاصة بمشروعك، نعتمد أداتين رسميتين مثبتتين في مرجع المسار، إلى جانب بيئة التطوير المحلية:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-5">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-[var(--text-main)] text-base">محرر PlantText التفاعلي</h4>
          <span class="rounded bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">موصى به للتجربة السريعة</span>
        </div>
        <p class="text-sm leading-6 text-[var(--text-muted)] mb-3">
          محرر ويب سريع وخفيف يسمح بلصق الكود ومعاينته فورياً وتصدير النتائج كصور PNG أو متجهات SVG أو روابط مباشرة للمشاركة.
        </p>
        <a href="https://www.planttext.com/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline" dir="ltr">
          https://www.planttext.com/ ↗
        </a>
      </div>

      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-5">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-bold text-[var(--text-main)] text-base">خادم PlantUML الرسمي المرجعي</h4>
          <span class="rounded bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 text-xs font-bold text-blue-800 dark:text-blue-300">المرجع القياسي</span>
        </div>
        <p class="text-sm leading-6 text-[var(--text-muted)] mb-3">
          الخادم المرجعي المفتوح من مؤلفي الأداة، يضمن التوافق الكامل مع أحدث قواعد الصياغة ودعم جميع امتدادات OMG UML الرسمية.
        </p>
        <a href="https://www.plantuml.com/plantuml/uml/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline" dir="ltr">
          https://www.plantuml.com/plantuml/uml/ ↗
        </a>
      </div>
    </div>

    <!-- Common Mistake Warning -->
    <div class="callout mistake">
      <div class="callout-header">⚠️ خطأ شائع يجب الحذر منه</div>
      <p>
        <strong>لا تلصق كود PlantUML داخل محرر Mermaid Live أو العكس!</strong>
        تختلف اللغتان جذرياً في محرك التصيير وقواعد الصياغة النحوية. كود PlantUML يبدأ دائماً بالوسم <code>@startuml</code> وينتهي بـ <code>@enduml</code>، بينما يبدأ Mermaid بتعريف النوع مثل <code>flowchart TD</code> أو <code>stateDiagram-v2</code>.
      </p>
    </div>
  </div>

  <!-- 3. Core PlantUML Syntax -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. قواعد الصياغة الأساسية في PlantUML</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تعتمد PlantUML على مفردات نصية صريحة لنمذجة العناصر والعلاقات. فيما يلي القواعد الأساسية التي ستحتاجها لنمذجة حالات الاستخدام:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>العنصر الهندسي</th>
            <th>صيغة كود PlantUML</th>
            <th>الدلالة والاستخدام</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>حدود المخطط</strong></td>
            <td><code>@startuml ... @enduml</code></td>
            <td>وسما البداية والنهاية الإلزاميان في أي ملف PlantUML</td>
          </tr>
          <tr>
            <td><strong>اتجاه العرض</strong></td>
            <td><code>left to right direction</code></td>
            <td>توجيه الرسم أفقياً من اليسار لليمين ليناسب الفواعل وحالات الاستخدام</td>
          </tr>
          <tr>
            <td><strong>الفاعل (Actor)</strong></td>
            <td><code>actor "طالب معتمد" as Student</code></td>
            <td>شخصية أو نظام خارجي يتفاعل مع النظام وله صلاحيات محددة</td>
          </tr>
          <tr>
            <td><strong>حدود النظام (System Boundary)</strong></td>
            <td><code>rectangle "نظام BorrowHub" { ... }</code></td>
            <td>إطار يعزل الوظائف الداخلية للنظام عن الفواعل الخارجية</td>
          </tr>
          <tr>
            <td><strong>حالة الاستخدام (Use Case)</strong></td>
            <td><code>usecase "تقديم طلب استعارة" as UC_Apply</code></td>
            <td>وظيفة مكتملة يقدمها النظام لتحقيق هدف ملموس للفاعل</td>
          </tr>
          <tr>
            <td><strong>الربط الأساسي</strong></td>
            <td><code>Student --&gt; UC_Apply</code></td>
            <td>ربط الفاعل بحالة الاستخدام التي يملك صلاحية تشغيلها</td>
          </tr>
          <tr>
            <td><strong>علاقة التضمين الإلزامي</strong></td>
            <td><code>UC_Apply ..&gt; UC_Check : &lt;&lt;include&gt;&gt;</code></td>
            <td>سلوك مشترك وإلزامي ينفذ دائماً كجزء من الحالة الأصلية</td>
          </tr>
          <tr>
            <td><strong>علاقة التمديد الشرطي</strong></td>
            <td><code>UC_Damage ..&gt; UC_Return : &lt;&lt;extend&gt;&gt;</code></td>
            <td>سلوك استثنائي أو اختياري ينفذ فقط عند تحقق شرط محدد</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Copyable Live Example -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. مثال حي قياسي قابل للنسخ والتجربة المباشرة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يمكنك نسخ الكود التالي ولصقه مباشرة في <a href="https://www.planttext.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">PlantText</a> لمعاينته فورياً والتحقق من آلية عمل الأداة:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PlantUML — كود نموذجي أساسي قابل للنسخ والتجربة</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود PlantUML">نسخ</button>
      </div>
      <pre class="code-content"><code>@startuml
left to right direction
skinparam packageStyle rectangle

actor "طالب جامعي" as Student
actor "مسؤول المعمل" as Staff

rectangle "نظام إدارة العهد والمختبرات" {
  usecase "تصفح كتالوج المعدات" as UC_Browse
  usecase "تقديم طلب استعارة" as UC_Request
  usecase "التحقق من أهلية الحساب" as UC_Verify
  usecase "مراجعة واعتماد الطلب" as UC_Approve
  
  UC_Request ..&gt; UC_Verify : &lt;&lt;include&gt;&gt;
}

Student --&gt; UC_Browse
Student --&gt; UC_Request
Staff --&gt; UC_Approve

@enduml</code></pre>
    </div>
  </div>

  <!-- 5. Project Integration and File Placement -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. توثيق وحفظ ملفات PlantUML في مستودع مشروعك</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      وفقاً لمعايير المسار الهندسي المنضبط، تُحفظ مصادر PlantUML النصية كملفات مستقلة بامتداد <code>.puml</code> داخل مجلد التوثيق المعماري:
    </p>
    <ul class="list-disc list-inside space-y-2 text-[var(--text-muted)] mt-2">
      <li><code>docs/diagrams/use-case.puml</code>: ملف كود المصدر الخالص القابل لإعادة التصيير والتعديل.</li>
      <li><code>docs/diagrams/use-case.md</code>: ملف توثيق بصيغة Markdown يحتوي على الشرح بالعربية، وقائمة الفواعل والصلاحيات، ورابط المخطط أو صورته المصيرة.</li>
    </ul>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 11: Use Case Diagram
 * Sequence Position: 11
 * ========================================================================= */
export const topic11Html = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-11-use-case" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 11 · المحطة الأساسية</span>
    <span class="step-pill">صلاحيات الأدوار والحدود الهندسية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط حالات الاستخدام (Use Case Diagram)</h2>
      <div class="step-subtitle">تحديد فواعل النظام وصلاحيات الأدوار وحدود النظام واستخدام include وextend بمسوغ موثق</div>
    </div>
  </div>

  <!-- 1. Architectural Purpose -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. الغرض المعماري من مخطط حالات الاستخدام</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يجيب مخطط حالات الاستخدام (Use Case Diagram) عن سؤال جوهري واحد: <strong>من يستخدم النظام، وما الذي يحق له فعله بالتحديد؟</strong>
      لا يهدف هذا المخطط إلى شرح خوارزميات العمل أو تصميم واجهات المستخدم، بل يحدد <strong>حدود النظام (System Boundary)</strong>، والأدوار الخارجية المتفاعلة معه (Actors)، والصلاحيات الوظيفية الصريحة المستمدة مباشرة من وثيقة <code>docs/PRD.md</code>.
    </p>
  </div>

  <!-- 2. Actors & Permissions in BorrowHub -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. فواعل النظام وصلاحيات الأدوار الموثقة في BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      انطلاقاً من دراسة حالة BorrowHub المعتمدة، نحدد بدقة الفواعل المستقلة ونطاق صلاحيات كل دور دون خلط أو تداخل:
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>الفاعل (Actor)</th>
            <th>نوع الدور في النظام</th>
            <th>حالات الاستخدام والصلاحيات المعتمدة (MVP)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>الطالب الجامعي (Student)</strong></td>
            <td>فاعل أولي (Primary Actor) يستفيد من خدمات النظام</td>
            <td>
              • تصفح كتالوج المعدات والأجهزة المتاحة.<br/>
              • تقديم طلب استعارة معدة معملية.<br/>
              • إلغاء طلب الاستعارة المعلق قبل مراجعته.<br/>
              • متابعة سجل العهد الشخصية وحالة الطلبات النشطة.
            </td>
          </tr>
          <tr>
            <td><strong>مسؤول المعمل (Staff / Lab Supervisor)</strong></td>
            <td>فاعل إداري وتشغيلي (Secondary Actor) يدير العهدة</td>
            <td>
              • مراجعة طلبات الاستعارة واعتمادها أو رفضها بمسوغ.<br/>
              • تسجيل التسليم المادي الفعلي للأصل (Handover).<br/>
              • تسجيل الاستلام وفحص سلامة المعدة المرتجعة (Inspect Return).<br/>
              • متابعة جرد المخزون وحالات الأجهزة المعطلة.
            </td>
          </tr>
          <tr>
            <td><strong>مجدول النظام الآلي (System Scheduler)</strong></td>
            <td>فاعل تقني مؤتمت (Automated System Actor)</td>
            <td>
              • فحص مهلة الاستلام (48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق - قاعدة 6) وإلغاء الطلبات غير المستلمة.<br/>
              • رصد الإعارات المتأخرة وتعديل حالة الطلب إلى متأخر (Overdue).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. include vs extend: Justified Rules -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. الضوابط الصارمة لاستخدام علاقتي include وextend</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من أكثر الأخطاء شيوعاً في نمذجة الأنظمة هو الاستخدام العشوائي لعلاقتي <code>&lt;&lt;include&gt;&gt;</code> و<code>&lt;&lt;extend&gt;&gt;</code>؛ مما يحول المخطط إلى خريطة تدفق برمجي مشوهة (Functional Decomposition Anti-pattern). في مسارنا، نلتزم بالقواعد الهندسية التالية:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-5">
        <h4 class="font-bold text-blue-900 dark:text-blue-300 text-base mb-2">علاقة التضمين الإلزامي &lt;&lt;include&gt;&gt;</h4>
        <p class="text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-300 mb-2">
          <strong>التعريف:</strong> سلوك فرعي مشترك وإلزامي <em>ينفذ دائماً وبشكل حتمي</em> في كل مرة تُنفذ فيها حالة الاستخدام الأساسية.
        </p>
        <p class="text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-300">
          <strong>مسوغ BorrowHub:</strong> تقديم طلب الاستعارة (Submit Loan Request) يتضمن دائماً وبشكل إلزامي فحص أهلية حساب الطالب وسقف الإعارات النشطة (Check Eligibility & Limit: Rule 3). بدون هذا الفحص لا يمكن إنشاء الطلب.
        </p>
      </div>

      <div class="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 p-5">
        <h4 class="font-bold text-amber-900 dark:text-amber-300 text-base mb-2">علاقة التمديد الشرطي &lt;&lt;extend&gt;&gt;</h4>
        <p class="text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-300 mb-2">
          <strong>التعريف:</strong> سلوك فرعي استثنائي أو اختياري <em>لا ينفذ إلا عند تحقق شرط أو نقطة تمديد (Extension Point)</em> محددة.
        </p>
        <p class="text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-300">
          <strong>مسوغ BorrowHub:</strong> تسجيل استرجاع المعدة (Record Return) يمتد إلى تسجيل تقرير التلف (Record Damage Report) <em>فقط وحصرياً إذا أسفر الفحص المادي عن وجود ضرر بالأصل</em> (Rule 8). في الحالات الطبيعية السليمة لا يُنفذ هذا السلوك.
        </p>
      </div>
    </div>

    <div class="callout warning">
      <div class="callout-header">⚖️ قاعدة التحكيم الهندسي</div>
      <p>
        إذا لم يكن السلوك مشتركاً بين حالتي استخدام على الأقل، أو لم يكن معزولاً بسبب شرط حرج يبرره PRD، <strong>فلا تفصل حالة استخدام جديدة بـ include أو extend</strong>؛ أبقِ السلوك ضمن الوصف الداخلي للحالة الأساسية لتجنب تشتيت النطاق.
      </p>
    </div>
  </div>

  <!-- 4. Complete BorrowHub PlantUML Code -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. كود PlantUML المعتمد لمشروع BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      فيما يلي كود PlantUML القياسي الكامل لمخطط حالات استخدام BorrowHub. يمكنك نسخه وتجربته فورياً عبر زر النسخ:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PlantUML (use-case.puml) — كود حالات الاستخدام الكامل في BorrowHub</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود حالات الاستخدام">نسخ</button>
      </div>
      <pre class="code-content"><code>@startuml
left to right direction
skinparam packageStyle rectangle
skinparam shadowing false
skinparam actorStyle awesome

actor "طالب معتمد\\n(Student)" as Student
actor "مسؤول المعمل\\n(Staff)" as Staff
actor "نظام المراقبة الآلي\\n(System Scheduler)" as System

rectangle "حدود نظام BorrowHub (System Boundary)" {
  ' حالات استخدام الطالب
  usecase "تصفح كتالوج المعدات" as UC_Browse
  usecase "تقديم طلب استعارة" as UC_Apply
  usecase "التحقق من أهلية الحساب وسقف الإعارة" as UC_Eligibility
  usecase "إلغاء طلب معلق" as UC_Cancel
  usecase "متابعة حالة العهد الشخصية" as UC_MyLoans

  ' حالات استخدام مسؤول المعمل
  usecase "مراجعة واعتماد أو رفض الطلبات" as UC_Review
  usecase "تسجيل التسليم المادي للأصل" as UC_Handover
  usecase "تسجيل استلام وفحص المعدة" as UC_Return
  usecase "توثيق تقرير التلف والأضرار" as UC_DamageReport
  usecase "جرد ومراجعة رصيد المخزون" as UC_AuditStock

  ' حالات النظام المؤتمتة
  usecase "إلغاء الطلبات المتأخرة عن مهلة 48 ساعة" as UC_Expire
  usecase "رصد العهد المتأخرة عن موعد الإرجاع" as UC_MarkOverdue

  ' علاقات التضمين الإلزامي <<include>>
  UC_Apply ..&gt; UC_Eligibility : &lt;&lt;include&gt;&gt;

  ' علاقات التمديد الشرطي <<extend>>
  UC_DamageReport ..&gt; UC_Return : &lt;&lt;extend&gt;&gt;\\n(عند اكتشاف ضرر مادي)
}

' ربط الفواعل بالصلاحيات
Student --&gt; UC_Browse
Student --&gt; UC_Apply
Student --&gt; UC_Cancel
Student --&gt; UC_MyLoans

Staff --&gt; UC_Review
Staff --&gt; UC_Handover
Staff --&gt; UC_Return
Staff --&gt; UC_AuditStock

System --&gt; UC_Expire
System --&gt; UC_MarkOverdue

@enduml</code></pre>
    </div>
  </div>

  <!-- 5. Approved Prompt 07 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. البرومبت المعتمد لتوليد حالات الاستخدام (PROMPT 07)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم هذا البرومبت المعتمد من مكتبة سلاح العصر لتوجيه وكيل الذكاء الاصطناعي إلى استخراج حالات الاستخدام وضبط علاقات include وextend وفق PRD:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 07 — Use Case Diagram</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 07">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior UML Use Case Analyst.
Read docs/PRD.md and docs/user-flow.md.
Identify confirmed MVP actors, permissions, use cases and system boundary.
Use &lt;&lt;include&gt;&gt; only for truly mandatory shared behavior and
&lt;&lt;extend&gt;&gt; only for justified conditional behavior.
Generate valid PlantUML with actors and use case ovals.
Save docs/diagrams/use-case.puml and use-case.md with Arabic explanation.
Flag conflicts and missing rules. Do not create other diagrams or code.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 12: Activity Diagram
 * Sequence Position: 12
 * ========================================================================= */
export const topic12Html = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-12-activity" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 12 · المحطة الأساسية</span>
    <span class="step-pill">مسارات وقرارات العمليات التشغيلية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط النشاط وسير العمليات (Activity Diagram)</h2>
      <div class="step-subtitle">نمذجة مسارات العمليات وقرارات التشغيل والتفرعات البديلة بصيغة Mermaid flowchart TD</div>
    </div>
  </div>

  <!-- 1. Purpose & Contrast with User Flow -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. الغرض المعماري من مخطط النشاط والفارق بينه وبين User Flow</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      بينما ركز مسار تدفق المستخدم (User Flow في الموضوع 08) على تجربة المستخدم وتسلسل الشاشات من منظوره الخارجي، يغوص <strong>مخطط النشاط (Activity Diagram)</strong> في <strong>منطق العمليات التشغيلي (Operational Business Logic)</strong>.
      يوضح هذا المخطط تسلسل الإجراءات التي يتشارك فيها الفاعل مع خدمات النظام وقواعد البيانات، ويُبرز بدقة <strong>نقاط اتخاذ القرار (Decision Nodes)</strong>، والشروط المنطقية، ومسارات الرفض والاعتذار، والتعافي من الأخطاء.
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>المعيار</th>
            <th>مخطط تدفق المستخدم (User Flow)</th>
            <th>مخطط النشاط الإجرائي (Activity Diagram)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المنظور الأساسي</strong></td>
            <td>منظور المستخدم الخارجي وتنقله بين الشاشات والواجهات</td>
            <td>منظور المعالجة الداخلية للنظام وتكامل الأدوار مع الشروط</td>
          </tr>
          <tr>
            <td><strong>نقاط القرار</strong></td>
            <td>خيارات المستخدم على الواجهة (مثل: تأكيد أو إلغاء)</td>
            <td>بوابات فحص منطق الأعمال (مثل: الرصيد، سقف الإعارة، توفر المخزون)</td>
          </tr>
          <tr>
            <td><strong>مسارات الفشل</strong></td>
            <td>رسائل خطأ مرئية على شاشة التطبيق</td>
            <td>إجراءات تعامل مع الاستثناءات وإلغاء وتعديل سجلات البيانات</td>
          </tr>
          <tr>
            <td><strong>صيغة الرسم المعتمدة</strong></td>
            <td>Mermaid <code>flowchart TD</code> على مستوى الشاشات</td>
            <td>Mermaid <code>flowchart TD</code> بأسلوب إجرائي يبرز العقد المنطقية والفواعل</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 2. Decision Points in BorrowHub -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. بوابات اتخاذ القرار المنطقية في عملية استعارة BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا يقتصر سير العمل على المسار السعيد (Happy Path)؛ بل يخضع لسلسلة من بوابات القرار المستندة لقواعد العمل الموثقة:
    </p>

    <ol class="space-y-3 text-[var(--text-muted)] my-4 leading-7">
      <li><strong>بوابة فحص اعتماد الحساب (Account Verification):</strong> هل الطالب مسجل وحسابه معتمد؟ إذا لا، يتم رفض الطلب وتوجيهه للتفعيل.</li>
      <li><strong>بوابة سقف الإعارة النشطة (Active Loans Limit - Rule 3):</strong> هل يمتلك الطالب أقل من إعارتين نشطتين؟ إذا كان لديه جهازان، يُرفض الطلب فوراً.</li>
      <li><strong>بوابة توفر الأصل في المستودع (Stock Check):</strong> هل المعدة متوفرة في المخزون الفعلي؟ إذا نفدت، يُعتذر للطالب ويُرفض الطلب دون إضافة ميزات غير معتمدة.</li>
      <li><strong>بوابة مراجعة وتأكيد المسؤول (Staff Confirmation - Rule 7):</strong> يؤكد مسؤول المعمل التسليم المادي والإرجاع بعد الإجراء الواقعي؛ ولا يُعتبر إجراء الطالب بديلاً عن تأكيد المسؤول.</li>
      <li><strong>بوابة مهلة الاستلام (48-Hour Deadline - Rule 6):</strong> هل حضر الطالب للاستلام خلال 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق؟ قد تنتهي المهلة آليًا ويُحرر الحجز وفق PRD؛ لا نفترض بدءها عند الموافقة.</li>
      <li><strong>بوابة فحص السلامة عند الإرجاع (Return Inspection - Rule 8):</strong> هل المعدة سليمة؟ يسجل المسؤول التلف ولا يعيد الوحدة التالفة إلى الكمية المتاحة. لا تفرض قواعد المصدر غرامة؛ توثق أي سياسة إضافية كسؤال PRD.</li>
    </ol>
  </div>

  <!-- 3. Copyable Mermaid Activity Diagram Code -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. كود Mermaid الكامل لمخطط النشاط في BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      مخطط النشاط الإجرائي الكامل لعملية الاستعارة، متضمناً كافة بوابات القرار ومسارات النجاح والرفض:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (flowchart TD) — كود مخطط النشاط التشغيلي الكامل</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود مخطط النشاط">نسخ</button>
      </div>
      <pre class="code-content"><code>flowchart TD
    Start(["بدء: طلب استعارة معدة معملية"]) --&gt; CheckAuth{"هل حساب الطالب معتمد؟"}

    CheckAuth -- لا --&gt; ErrAuth["إشعار: الحساب بانتظار اعتماد الإدارة"] --&gt; EndRejected(["نهاية: رفض الطلب"])
    CheckAuth -- نعم --&gt; CheckLimit{"هل الإعارات النشطة &lt; 2؟ (Rule 3)"}

    CheckLimit -- لا --&gt; ErrLimit["إشعار: تم بلوغ الحد الأقصى المسموح"] --&gt; EndRejected
    CheckLimit -- نعم --&gt; CheckStock{"هل المعدة متوفرة في المخزون؟"}

    CheckStock -- لا --&gt; ErrStock["إشعار: المعدة غير متوفرة حالياً"] --&gt; EndRejected
    CheckStock -- نعم --&gt; SubmitReq["إنشاء وحفظ الطلب بحالة Submitted"]

    SubmitReq --&gt; StaffReview{"قرار مسؤول المعمل"}
    StaffReview -- رفض --&gt; RecordRejection["تسجيل سبب الرفض وإشعار الطالب"] --&gt; EndRejected
    StaffReview -- اعتماد --&gt; SetApproved["Approved؛ المهلة 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق"]

    SetApproved --&gt; PickupCheck{"هل حضر الطالب ضمن المهلة الموثقة من تاريخ بداية الطلب؟"}
    PickupCheck -- لا --&gt; AutoCancel["إلغاء الحجز آلياً وإعادة المعدة للمخزون"] --&gt; EndCancelled(["نهاية: إلغاء لتجاوز المهلة"])
    PickupCheck -- نعم --&gt; Handover["تأكيد المسؤول التسليم المادي وتغيير الحالة إلى Active (Rule 7)"]

    Handover --&gt; ActiveUsage["استخدام الطالب للمعدة حتى تاريخ الاستحقاق"]
    ActiveUsage --&gt; ReturnPhysically["حضور الطالب لإرجاع المعدة وتأكيد المسؤول الاستلام (Rule 7)"]

    ReturnPhysically --&gt; InspectItem{"فحص المعدة: هل بها تلف أو كسر؟ (Rule 8)"}
    InspectItem -- نعم --&gt; RecordDamage["تسجيل المسؤول التلف دون إعادة الوحدة إلى المتاح (Rule 8)"] --&gt; CloseDamaged["تأكيد المسؤول إغلاق الإعارة مع قيد التلف وتحديث رصيد الطالب دون إعادة للمخزون"] --&gt; EndDamaged(["نهاية: إتمام الإرجاع مع إثبات التلف"])
    InspectItem -- لا --&gt; Restock["إعادة المعدة للمخزون المتاح وتحديث رصيد الطالب"] --&gt; CloseReturn["تأكيد المسؤول إغلاق الإعارة بحالة Returned"] --&gt; EndSuccess(["نهاية: إتمام الإعارة بنجاح"])</code></pre>
    </div>
  </div>

  <!-- 4. Approved Prompt 08 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. البرومبت المعتمد لتوليد مخطط النشاط (PROMPT 08)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم هذا البرومبت المعتمد من مكتبة سلاح العصر لإنشاء مخطط النشاط وسير العمليات بصيغة Mermaid flowchart TD:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 08 — Activity Diagram</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 08">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Business Process Analyst.
Read the approved PRD and User Flow.
Create ONLY activity-style process diagrams for main MVP operations.
Include actor/system actions, decision points, success/failure and
alternative paths. Use Mermaid flowchart TD with labeled branches.
Create docs/diagrams/activity-diagram.md.
Explain in Arabic. Do not invent steps or build code.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 13: State Diagram
 * Sequence Position: 13
 * ========================================================================= */
export const topic13Html = `
<aside class="callout note"><p><strong>مراجعة BorrowHub:</strong> هذا نموذج تعليمي، وتُراجع أسماء الحالات وتوقيت انتهاء المهلة وتحديث المخزون مقابل PRD المعتمد. المصدر يحدد المهلة من تاريخ بداية الطلب وفق التعريف الموثق، وتأكيد التسليم والإرجاع للمسؤول، وتسجيل التلف دون إعادة الوحدة للمتاح، ومتابعة التأخر يدويًا دون حظر تلقائي. أي تعارض يوثق كسؤال قرار ولا يُحسم بصمت.</p></aside>
  <section id="topic-13-state" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 13 · المحطة الأساسية</span>
    <span class="step-pill">حالات الكائنات والانتقالات الموثقة</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط الحالات ودورة حياة الكيانات (State Diagram)</h2>
      <div class="step-subtitle">نمذجة حالات الكائنات والانتقالات الموثقة وأحداث التبديل دون اختراع حالات وهمية</div>
    </div>
  </div>

  <!-- 1. Purpose of State Diagram -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. مفهوم آلة الحالات (State Machine) وأهميتها المعمارية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الكيانات الحيوية في أي نظام برمجي (مثل طلب الاستعارة، تذكرة الدعم، الفاتورة المالية) ليست كيانات ساكنة، بل تمر بسلسلة من <strong>الحالات (States)</strong> المتتالية خلال دورة حياتها.
      يجيب مخطط الحالات (State Diagram) عن سؤال حاسم: <strong>ما هي الحالات الممكنة لهذا الكائن، وما الأحداث والشروط التي تنقله من حالة لأخرى؟</strong>
      يمنع هذا المخطط حدوث عمليات غير منطقية؛ مثل تسليم معدة لطلب مرفوض، أو إرجاع طلب لم يُستلم بعد.
    </p>
  </div>

  <!-- 2. No Invented States Rule -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. القاعدة المعمارية الصارمة: عدم اختراع حالات وهمية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      واحدة من أخطر ثغرات التصميم هي أن يقوم المهندس أو وكيل الذكاء الاصطناعي <strong>باختراع حالات افتراضية</strong> لم يرد لها ذكر في وثيقة المتطلبات (PRD) أو قواعد العمل (مثل: <code>UnderInspectionByDean</code> أو <code>SentToThirdPartyCleaning</code>).
      كل حالة تظهر في المخطط يجب أن تنعكس مباشرة في حقل <code>status</code> في جدول قاعدة البيانات؛ واختراع حالات خيالية يؤدي إلى:
    </p>

    <ul class="list-disc list-inside space-y-2 text-[var(--text-muted)] my-3 leading-7">
      <li>تعقيد كود الـ Backend واشتراط تحققات إضافية لا وجود لها في منطق العمل الحقيقي.</li>
      <li>تعطيل تكامل واجهة المستخدم التي لن تجد نصوصاً أو أزراراً تدعم تلك الحالات الوهمية.</li>
      <li>تشوه بيانات الاختبار وقاعدة البيانات بحالات ميتة (Dead States) يستحيل الخروج منها.</li>
    </ul>

    <div class="callout note">
      <div class="callout-header">📌 ميثاق النمذجة المنضبطة</div>
      <p>
        كل حالة في مخطط <code>stateDiagram-v2</code> يجب أن تستند إلى متطلب صريح وموثق في PRD. إذا شعرت بحاجة لحالة جديدة، وثقها أولاً في وثيقة المتطلبات واعتمدها قبل إضافتها للمخطط.
      </p>
    </div>
  </div>

  <!-- 3. Documented States in BorrowHub LoanRequest -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. الحالات المعتمدة لدورة حياة طلب الاستعارة (LoanRequest)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مشروع BorrowHub، يمر كيان طلب الاستعارة <code>LoanRequest</code> بالحالات الموثقة التالية:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>اسم الحالة (State)</th>
            <th>الوصف والمعنى التجاري</th>
            <th>الحالة السابقة المحتملة</th>
            <th>الحالة اللاحقة الممكنة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Draft</code></td>
            <td>مسودة أولية أنشأها الطالب ولم يُرسلها بعد للمراجعة</td>
            <td>البداية <code>[*]</code></td>
            <td><code>Submitted</code> أو الإلغاء</td>
          </tr>
          <tr>
            <td><code>Submitted</code></td>
            <td>تم إرسال الطلب وهو بانتظار مراجعة مسؤول المعمل</td>
            <td><code>Draft</code></td>
            <td><code>Approved</code>, <code>Rejected</code>, <code>Cancelled</code></td>
          </tr>
          <tr>
            <td><code>Approved</code></td>
            <td>وافق المشرف على الطلب؛ مهلة الاستلام 48 ساعة من تاريخ بداية الطلب وفق التعريف الموثق، لا من الموافقة</td>
            <td><code>Submitted</code></td>
            <td><code>Active</code>, <code>Cancelled</code> (انتهاء المهلة)</td>
          </tr>
          <tr>
            <td><code>Rejected</code></td>
            <td>رفض المشرف الطلب مع توثيق سبب الرفض (حالة نهائية)</td>
            <td><code>Submitted</code></td>
            <td>النهاية <code>[*]</code></td>
          </tr>
          <tr>
            <td><code>Cancelled</code></td>
            <td>ألغي الطلب بواسطة الطالب أو آلياً لتجاوز مهلة الـ 48 ساعة</td>
            <td><code>Submitted</code>, <code>Approved</code></td>
            <td>النهاية <code>[*]</code></td>
          </tr>
          <tr>
            <td><code>Active</code></td>
            <td>استلم الطالب الأصل فعلياً وهو بعهدته لحين تاريخ الإرجاع</td>
            <td><code>Approved</code></td>
            <td><code>Returned</code>, <code>Overdue</code></td>
          </tr>
          <tr>
            <td><code>Overdue</code></td>
            <td>تجاوز الطالب موعد الإرجاع المعتمد دون تسليم المعدة</td>
            <td><code>Active</code></td>
            <td><code>Returned</code></td>
          </tr>
          <tr>
            <td><code>Returned</code></td>
            <td>سلّم الطالب المعدة، وفحصت وسُجل الاستلام بنجاح (حالة نهائية)</td>
            <td><code>Active</code>, <code>Overdue</code></td>
            <td>النهاية <code>[*]</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. State Transitions Table -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. جدول الانتقالات وشروط الحراسة (State Transition Table)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يوثق الجدول التالي الأحداث المحفزة (Triggers) والشروط الحارسة (Guards) لكل انتقال:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الحالة الابتدائية</th>
            <th>الحدث المحفز (Event / Trigger)</th>
            <th>الشرط الحارس [Guard]</th>
            <th>الحالة التالية</th>
            <th>الإجراء المصاحب</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Draft</code></td>
            <td>النقر على «إرسال الطلب»</td>
            <td>[أهلية الطالب معتمدة وحصته &lt; 2]</td>
            <td><code>Submitted</code></td>
            <td>إنشاء سجل طلب جديد وإشعار الإدارة</td>
          </tr>
          <tr>
            <td><code>Submitted</code></td>
            <td>قرار المسؤول: موافقة</td>
            <td>[المعدة متوفرة بالمخزون]</td>
            <td><code>Approved</code></td>
            <td>حجز الأصل ومراجعة مهلة الاستلام من تاريخ بداية الطلب وفق التعريف الموثق</td>
          </tr>
          <tr>
            <td><code>Submitted</code></td>
            <td>قرار المسؤول: رفض</td>
            <td>[تم تدوين سبب الرفض]</td>
            <td><code>Rejected</code></td>
            <td>إرسال إشعار اعتذار للطالب</td>
          </tr>
          <tr>
            <td><code>Submitted</code></td>
            <td>إلغاء من جانب الطالب</td>
            <td>[الطلب لم يدخل حيز المراجعة]</td>
            <td><code>Cancelled</code></td>
            <td>إلغاء الطلب وتحرير الحصة</td>
          </tr>
          <tr>
            <td><code>Approved</code></td>
            <td>حضور الطالب وتأكيد الهوية</td>
            <td>[ضمن مهلة الـ 48 ساعة]</td>
            <td><code>Active</code></td>
            <td>تسجيل التسليم وبدء فترة الإعارة</td>
          </tr>
          <tr>
            <td><code>Approved</code></td>
            <td>مضي 48 ساعة دون حضور</td>
            <td>[انقضاء المهلة الزمنية]</td>
            <td><code>Cancelled</code></td>
            <td>إلغاء آلي وتحرير المعدة المحجوزة</td>
          </tr>
          <tr>
            <td><code>Active</code></td>
            <td>مرور تاريخ الاستحقاق دون تسليم</td>
            <td>[تاريخ اليوم &gt; تاريخ الإرجاع]</td>
            <td><code>Overdue</code></td>
            <td>إرسال تنبيه تأخير وفرض حظر إعارة</td>
          </tr>
          <tr>
            <td><code>Active / Overdue</code></td>
            <td>إرجاع المعدة وفحصها من المشرف</td>
            <td>[تأكيد الفحص وتسجيل أي تلفيات]</td>
            <td><code>Returned</code></td>
            <td>إعادة المعدة للمخزون وتحرير ذمة الطالب</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 5. Copyable Mermaid State Diagram Code -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. كود Mermaid الكامل لمخطط الحالات في BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      كود <code>stateDiagram-v2</code> القياسي الكامل لدورة حياة طلب الاستعارة، قابل للنسخ والتصيير المباشر:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (stateDiagram-v2) — دورة حياة طلب الاستعارة LoanRequest</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود مخطط الحالات">نسخ</button>
      </div>
      <pre class="code-content"><code>stateDiagram-v2
    [*] --&gt; Draft : إنشاء الطلب من الطالب
    
    Draft --&gt; Submitted : إرسال الطلب [حساب معتمد وأقل من إعارتين]
    Draft --&gt; Cancelled : تراجع الطالب عن المسودة
    
    Submitted --&gt; Approved : موافقة مسؤول المعمل [المعدة متوفرة]
    Submitted --&gt; Rejected : رفض المسؤول [مع ذكر السبب]
    Submitted --&gt; Cancelled : إلغاء الطالب قبل المعالجة
    
    Approved --&gt; Active : تأكيد المسؤول التسليم المادي [ضمن المهلة من تاريخ بداية الطلب]
    Approved --&gt; Cancelled : انقضاء المهلة من تاريخ بداية الطلب [وفق تعريف PRD وتحرير الحجز]
    
    Active --&gt; Returned : تأكيد المسؤول الإرجاع والفحص المادي وتسجيل التلف إن وجد
    Active --&gt; Overdue : تجاوز تاريخ الاستحقاق دون إرجاع
    
    Overdue --&gt; Returned : تأكيد المسؤول الإرجاع المتأخر والفحص [متابعة يدوية دون حظر تلقائي]
    
    Rejected --&gt; [*]
    Cancelled --&gt; [*]
    Returned --&gt; [*]</code></pre>
    </div>
  </div>

  <!-- 6. Approved Prompt 10 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">6. البرومبت المعتمد لتوليد مخطط الحالات (PROMPT 10)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم هذا البرومبت المعتمد من مكتبة سلاح العصر لتحليل دورة حياة الكيانات وتوليد كود Mermaid stateDiagram-v2 سليم:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 10 — State Diagram</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 10">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior State Machine Analyst.
Read the PRD and related User Flows.
Identify MVP entities with meaningful documented lifecycle states.
For each, generate valid Mermaid stateDiagram-v2 showing initial states,
allowed transitions, triggering events, guards and end states if applicable.
Do not invent statuses. Flag missing transition decisions.
Save docs/diagrams/state-diagrams.md with transition tables and Arabic explanation.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * WAVE 2 TOPIC ENTRIES: Ticket 05 (Topics 10, 11, 12, 13)
 * ========================================================================= */
export const t05Entries: TopicItem[] = [
  {
    id: 'plantuml-tool',
    number: '10',
    slug: 'plantuml',
    title: 'أداة ومحرر PlantUML للنمذجة الهندسية ككود',
    subtitle: 'فهم بيئة PlantUML والفرق بينها وبين Mermaid ومحررات التصيير المباشر وقوالب الكود القابلة للنسخ',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'أدوات النمذجة السلوكية',
    summary: 'مقدمة معمارية لأداة PlantUML كأداة متخصصة في نمذجة سلوك الأنظمة (Use Case)، وبيان الفروق الجوهرية بينها وبين Mermaid ومحركات التصيير، واستخدام محررات PlantText وPlantUML الرسمية مع كود صالح وقابل للنسخ المباشر.',
    tags: ['PlantUML', 'UML', 'PlantText', 'Diagrams as Code', 'Mermaid vs PlantUML', 'Use Case Tool'],
    contentTypes: ['diagram', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic10Html),
    htmlContent: topic10Html,

    goal: 'إتقان صياغة كود PlantUML وفهم الفروق التقنية والمعمارية بينها وبين Mermaid، واستخدام المحررات الحية (PlantText وخادم PlantUML) لتوليد وفحص المخططات الهندسية قبل نمذجة حالات الاستخدام الفعلية للمشروع.',
    prerequisites: [
      'صيغة Mermaid الأساسية (موضوع 07)',
      'مفاهيم النمذجة الهندسية والتوثيق ككود'
    ],
    steps: [
      '1. افتح محرر PlantText (https://www.planttext.com/) أو خادم PlantUML الرسمي لتجربة البيئة المباشرة.',
      '2. افهم هيكل كود PlantUML المحاط بوسمي @startuml و@enduml واتجاه المخطط left to right direction.',
      '3. جرب كتابة فاعل actor ومستطيل حدود النظام rectangle وحالة استخدام usecase.',
      '4. تحقق من ظهور المخطط وتصييره اللحظي، واختبر استجابة المحرر لأخطاء الصياغة.',
      '5. أنشئ مجلداً مخصصاً لملفات المخططات في مستودع مشروعك docs/diagrams/ تمهيداً لحفظ ملفات .puml.'
    ],
    promptRefs: ['prompt-07-use-case-diagram'],
    outputs: [
      'docs/diagrams/README-plantuml.md',
      'عينة كود PlantUML صالحة للتصيير'
    ],
    checklist: [
      'فهم الفرق المعماري بين PlantUML وMermaid ومتى يُستخدم كل منهما.',
      'معرفة أن PlantUML لا يعمل داخل Mermaid Live ويتطلب محرره الخاص أو خادمه.',
      'تجربة محرر PlantText أو خادم PlantUML الرسمي والتأكد من تصيير المخطط بنجاح.',
      'استيعاب البنية الصورية لكود PlantUML (@startuml و@enduml والعلاقات الأساسية).',
      'تجهيز مسار docs/diagrams/ في مستودع المشروع لحفظ ملفات .puml القادمة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 10,
  },
  {
    id: 'use-case-diagram',
    number: '11',
    slug: 'use-case-diagram',
    title: 'مخطط حالات الاستخدام (Use Case Diagram)',
    subtitle: 'تحديد فواعل النظام وصلاحيات الأدوار وحدود النظام واستخدام include وextend بمسوغ موثق',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'صلاحيات الأدوار والحدود',
    summary: 'بناء مخطط حالات الاستخدام (Use Case Diagram) بصيغة PlantUML استناداً إلى PRD وUser Flow، لتحديد الفواعل (Actors) وصلاحيات كل دور وحدود النظام (System Boundary)، مع الالتزام التام بضوابط علاقتي include وextend وعدم استخدامهما إلا بمسوغ وظيفي صريح.',
    tags: ['Use Case', 'PlantUML', 'Actors', 'Permissions', 'System Boundary', 'include', 'extend', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic11Html),
    htmlContent: topic11Html,

    goal: 'بناء وتوثيق مخطط حالات الاستخدام (Use Case Diagram) بصيغة PlantUML لنطاق MVP يحدد فواعل النظام، وصلاحيات كل دور، وحدود النظام، واستخدام include وextend بمسوغ هندسي مستند لـ PRD.',
    prerequisites: [
      'أداة ومحرر PlantUML (موضوع 10)',
      'وثيقة متطلبات المنتج docs/PRD.md',
      'مسارات تدفق المستخدم docs/user-flow.md'
    ],
    steps: [
      '1. استخرج الفواعل الأساسية والثانوية (Actors) من docs/PRD.md وحدد الصلاحيات الدقيقة لكل دور.',
      '2. ارسم حدود النظام (System Boundary) مستبعداً أي خدمات خارجية أو فواعل من داخل الصندوق.',
      '3. حدد حالات الاستخدام الرئيسية لنطاق MVP لكل دور دون تفتيتها إلى خطوات إجرائية صغيرة.',
      '4. قيّم الحاجة لعلاقات <<include>>: لا تضفها إلا إذا كان السلوك مشتركاً وإلزامياً في عدة حالات (مثل فحص الأهلية والحد الأقصى).',
      '5. قيّم الحاجة لعلاقات <<extend>>: لا تضفها إلا لسلوك شرطي استثنائي ناتج عن شرط محدد (مثل توثيق التلف عند الإرجاع).',
      '6. استخدم برومبت حالات الاستخدام المعتمد (PROMPT 07) لتوليد كود PlantUML منضبط.',
      '7. احفظ الكود والشرح في docs/diagrams/use-case.puml وdocs/diagrams/use-case.md وافحصه على PlantText.'
    ],
    promptRefs: ['prompt-07-use-case-diagram'],
    outputs: [
      'docs/diagrams/use-case.puml',
      'docs/diagrams/use-case.md'
    ],
    checklist: [
      'تحديد جميع فواعل النظام (Actors) وصلاحيات كل دور بدقة دون تداخل.',
      'رسم حدود النظام (System Boundary) بوضوح لتمييز داخل النظام عن خارجه.',
      'استخدام علاقة <<include>> فقط للسلوك المشترك الإلزامي المبرر بالمتطلبات.',
      'استخدام علاقة <<extend>> فقط للسلوك الشرطي الاستثنائي المبرر بنقطة تمديد.',
      'صلاحية كود PlantUML للتصيير على PlantText وحفظه في docs/diagrams/use-case.puml.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 11,
  },
  {
    id: 'activity-diagram',
    number: '12',
    slug: 'activity-diagram',
    title: 'مخطط النشاط وسير العمليات (Activity Diagram)',
    subtitle: 'نمذجة مسارات العمليات وقرارات التشغيل والتفرعات البديلة بصيغة Mermaid flowchart TD',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'مسارات وقرارات العمليات',
    summary: 'نمذجة العمليات التشغيلية التفاعلية لنطاق MVP عبر مخطط نشاط بصيغة Mermaid flowchart TD، لإبراز خطوات الفواعل والنظام، ونقاط القرار (Decision Nodes)، ومسارات النجاح والرفض والتعافي دون قفز على شروط التحقق أو منطق الأعمال.',
    tags: ['Activity Diagram', 'Mermaid', 'Process Flow', 'Decision Points', 'Business Logic', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic12Html),
    htmlContent: topic12Html,

    goal: 'صياغة مخطط نشاط عملي (Activity Diagram) بصيغة Mermaid flowchart TD يعكس قرارات التشغيل المنطقية، ومسارات النجاح، وبوابات التحقق، ومسارات الفشل والتعافي لنطاق MVP.',
    prerequisites: [
      'مخطط حالات الاستخدام docs/diagrams/use-case.md',
      'مسارات تدفق المستخدم docs/user-flow.md',
      'قواعد الأعمال الموثقة في PRD'
    ],
    steps: [
      '1. اختر العملية الجوهرية لمشروعك (مثل دورة حياة استعارة المعدة من البداية للإرجاع).',
      '2. حدد نقطة البداية (Initial Node) ونقاط النهاية (Activity Final Nodes) لجميع المسارات.',
      '3. استخرج كافة نقاط اتخاذ القرار (Decision Nodes) والشروط الحاكمة لكل فرع (Guards).',
      '4. مثل مسار النجاح الأساسي وتأكد من مرور كل خطوة عبر شروط التحقق المسبقة.',
      '5. مثل مسارات الرفض والفشل لكل قرار (مثل نفاد المخزون أو تجاوز سقف الاستعارة أو عدم الحضور للاستلام).',
      '6. استخدم برومبت مخطط النشاط المعتمد (PROMPT 08) لتوليد كود Mermaid flowchart TD منضبط.',
      '7. احفظ المخطط في docs/diagrams/activity-diagram.md وactivity-diagram.mmd وتأكد من تصييره.'
    ],
    promptRefs: ['prompt-08-activity-diagram'],
    outputs: [
      'docs/diagrams/activity-diagram.md',
      'docs/diagrams/activity-diagram.mmd'
    ],
    checklist: [
      'عكس جميع نقاط القرار التشغيلية (Decision Points) بوضوح تام وتسمية فروعها.',
      'تغطية مسارات الفشل والرفض وعدم الاقتصار على مسار النجاح السعيد فقط.',
      'مطابقة قواعد العمل الموثقة في PRD دون اختراع شروط أو خطوات وهمية.',
      'استخدام صيغة Mermaid flowchart TD صالحة للتصيير المباشر دون أخطاء.',
      'حفظ وتوثيق المخطط في docs/diagrams/activity-diagram.md مع شرح تفصيلي بالعربية.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 12,
  },
  {
    id: 'state-diagram',
    number: '13',
    slug: 'state-diagram',
    title: 'مخطط الحالات ودورة حياة الكيانات (State Diagram)',
    subtitle: 'نمذجة حالات الكائنات والانتقالات الموثقة وأحداث التبديل دون اختراع حالات وهمية',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'حالات الكائنات والانتقالات',
    summary: 'بناء آلة حالات (State Machine) لكيانات النظام الجوهرية (مثل طلب الاستعارة LoanRequest) بصيغة Mermaid stateDiagram-v2، مع الالتزام الصارم بالحالات الموثقة في PRD وقواعد العمل، وتوثيق أحداث التبديل وشروط الحراسة دون اختراع أي حالات غير موثقة.',
    tags: ['State Diagram', 'stateDiagram-v2', 'State Machine', 'Entity Lifecycle', 'LoanRequest', 'Mermaid', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic13Html),
    htmlContent: topic13Html,

    goal: 'بناء وتوثيق مخطط حالات كامل (State Diagram) بصيغة Mermaid stateDiagram-v2 لكيانات MVP الأساسية، يعكس حصراً الحالات والانتقالات الموثقة في PRD دون أي حالات وهمية.',
    prerequisites: [
      'مخطط النشاط docs/diagrams/activity-diagram.md',
      'وثيقة متطلبات المنتج docs/PRD.md',
      'قواعد مشروع الطالب المعتمدة؛ BorrowHub مثال اختياري'
    ],
    steps: [
      '1. حدد الكيان الجوهري صاحب دورة الحياة المتقلبة في مشروعك (مثل LoanRequest أو Order).',
      '2. احصر جميع الحالات الموثقة صراحة في docs/PRD.md ولا تضف أي حالة لم يرد لها نص صريح.',
      '3. حدد الحالة الابتدائية [*] --> InitialState والحالات النهائية FinalState --> [*].',
      '4. حدد الأحداث المنشئة لكل انتقال (Triggers) والشروط الحارسة (Guards) بين الأقواس المعقوفة [condition].',
      '5. نظّم الانتقالات في جدول انتقالات صريح يوضح الحالة الأصلية، الحدث، الشرط، والحالة التالية.',
      '6. استخدم برومبت مخطط الحالات المعتمد (PROMPT 10) لتوليد كود Mermaid stateDiagram-v2 صالح.',
      '7. احفظ المخطط وجدول الانتقالات في docs/diagrams/state-diagrams.md وstate-diagrams.mmd.'
    ],
    promptRefs: ['prompt-10-state-diagram'],
    outputs: [
      'docs/diagrams/state-diagrams.md',
      'docs/diagrams/state-diagrams.mmd'
    ],
    checklist: [
      'اقتصار الحالات على ما هو موثق في PRD دون اختراع أي حالات وهمية غير مبررة.',
      'تحديد نقطة البداية والحالات النهائية لدورة حياة الكيان بوضوح.',
      'توثيق شروط الحراسة والأحداث المؤدية لكل انتقال بين الحالات.',
      'إعداد جدول انتقالات الحالات (State Transition Table) بجانب المخطط.',
      'صلاحية كود Mermaid stateDiagram-v2 للتصيير المباشر وحفظه في docs/diagrams/.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 13,
  },
];
