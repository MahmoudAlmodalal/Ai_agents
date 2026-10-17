export const topic06Html = `
      <!-- ==================== TOPIC 06: SYSTEM ARCHITECTURE ==================== -->
      <section id="topic-06" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 06</span>
          <span class="step-pill">المعمارية الكبرى وتوزيع المسؤوليات</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">الصورة المعمارية الكبرى وتكامل طبقات النظام (System Architecture & Backend Layers)</h2>
            <div class="step-subtitle">تنظيم الكود الداخلي (Views / Services / Selectors)، التخزين المؤقت، ومعمارية Multi-Tenancy</div>
          </div>
        </div>

        <!-- 1. The Big Architectural Picture Diagram -->
        <h3>تكامل الواجهة الأمامية والباك إند وأدوات البنية التحتية</h3>
        <p>
          بعد فهم متطلبات المنتج وهيكلة البيانات، نصل إلى الصورة المعمارية الكبرى التي توضح كيف يتكامل تطبيق الواجهة الأمامية (Frontend)، والخادم العكسي (Nginx)، وخادم الباك إند (Backend)، وقاعدة البيانات، وأدوات المهام الخلفية:
        </p>

        <div class="diagram-box">
          <h4>الصورة المعمارية للنظام وتنظيم الكود الداخلي (System Architecture & Backend Layers)</h4>
          <div class="mermaid">
flowchart LR
    subgraph Client_Side ["طبقة العميل (Client Layer)"]
        FE["Frontend (واجهة المستخدم)\nReact / Next.js"]
    end

    subgraph Gateway ["طبقة التوجيه والحماية"]
        NGX["Nginx Web Server\nReverse Proxy & SSL Termination"]
    end

    subgraph Backend_App ["طبقات تطبيق الباك إند (Backend Application Layers)"]
        V["Views / Controllers\nاستقبال الطلب وإرجاع الرد"]
        S["Services\nتنفيذ قواعد العمل والتحقق"]
        SEL["Selectors\nاستعلامات قراءة البيانات"]
    end

    subgraph Storage ["طبقة التخزين والمهام الخلفية"]
        RDB[("Relational Database\nPostgreSQL / MySQL\nحفظ الجداول والعلاقات")]
        REDIS[("Redis In-Memory Cache\nتخزين مؤقت فائق السرعة")]
        WRK["Background Workers\nطابور المهام غير المتزامنة\n(إرسال الإشعارات والتقارير)"]
    end

    FE -- "HTTP Requests" --> NGX
    NGX -- "Proxy Pass" --> V
    V --> S
    S --> SEL
    SEL --> RDB
    S -- "Write / Transactions" --> RDB
    S -- "Async Job Queue" --> REDIS
    REDIS --> WRK
    SEL -- "Cache Hit / Read" --> REDIS

    classDef client fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef gate fill:#0f172a,stroke:#64748b,stroke-width:2px,color:#fff;
    classDef backend fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef storage fill:#581c87,stroke:#a855f7,stroke-width:2px,color:#fff;

    class FE client;
    class NGX gate;
    class V,S,SEL backend;
    class RDB,REDIS,WRK storage;
          </div>
          <div class="diagram-caption">
            الشكل (9): معمارية النظام وتكامل طبقات الـ Backend مع خادم Nginx، وقاعدة البيانات، وذاكرة Redis، وعمال الخلفية Workers.
          </div>
        </div>

        <!-- 2. Separation of Concerns in Backend Code -->
        <h3>فصل المسؤوليات في كود الباك إند (Separation of Concerns)</h3>
        <p>
          لمنع ما يسمى بـ <strong>"الكود الفوضوي السباغيتي" (Spaghetti Code)</strong> حيث يختلط استعلام SQL مع إرجاع الـ JSON مع قواعد التحقق في دالة واحدة، نعتمد نمط فصل المسؤوليات الثلاثي:
        </p>

        <div class="grid-3col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>📥</span> Views / Controllers
            </h4>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
              تستقبل طلب الـ HTTP الوارد من المستخدم، وتتحقق من صحة صيغة المدخلات (Schema Validation)، وتمرر البيانات لطبقة الخدمات، ثم تعيد كود الحالة (Status Code مثل 200 أو 201 أو 400) والرد النهائي.
            </p>
          </div>

          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: #10b981; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>⚙️</span> Services (Business Logic)
            </h4>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
              <strong>قلب النظام النابض:</strong> تنفذ قواعد العمل والسياسات الصارمة المنصوص عليها في وثيقة PRD؛ مثل: التحقق من أن الطالب لا يملك أكثر من طلبين نشطين، وفحص مهلة الـ 48 ساعة، وحجز المعدة داخل معاملة ذرية (Transaction).
            </p>
          </div>

          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: #a855f7; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🔍</span> Selectors (Read Queries)
            </h4>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
              تختص حصرياً باستعلامات قراءة البيانات من قاعدة البيانات. هذا الفصل يسمح بتحسين الاستعلامات واستخدام التحميل المسبق وتطبيق التخزين المؤقت دون التأثير على منطق العمل، ويسهل الاختبارات المؤتمتة (Unit Testing).
            </p>
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 3. Redis & Workers -->
        <h3>متى نستخدم Redis و Background Workers؟</h3>
        <p>
          فكّر في إرسال <strong>1000 إشعار أو بريد إلكتروني</strong> عند اعتماد حجز معين:
          ليس من المنطقي أبداً أن يظل المتصفح معلقاً والمستخدم ينتظر لعدة دقائق حتى ينتهي الخادم من إرسال آخر بريد!
        </p>

        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">💡</span>
            <span>طوابير الأعمال غير المتزامنة (Queues) والتخزين المؤقت (Cache)</span>
          </div>
          <p>
            الحل هو إضافة طابور مهام (<strong>Task Queue</strong> عبر Redis)؛ تستقبل طبقة الخدمة الطلب وتضع مهمة الإرسال في الطابور خلال 5 مللي ثانية وتجيب المستخدم فوراً بنجاح العملية. وفي الخلفية، تقوم خيوط المعالجة المستقلة (<strong>Background Workers</strong>) بسحب المهام تدريجياً وإرسال الإشعارات دون التأثير على سرعة الموقع إطلاقاً.
          </p>
          <p>
            كذلك ذاكرة <strong>Redis</strong> تخزن نتائج الاستعلامات الثقيلة التي تُقرأ بكثرة ولا تتغير باستمرار (مثل قائمة أقسام وتصنيفات المعدات)، مما يوفر آلاف الاستعلامات على قاعدة البيانات الرئيسية.
          </p>
        </div>

        <!-- 4. Multi-Tenancy Architecture -->
        <h3>معمارية العزل المتعدد للمستأجرين (Multi-Tenancy)</h3>
        <p>
          لو تطورت منصة BorrowHub مستقبلاً لتخدم <strong>عدة جامعات أو كليات مستقلة</strong> في منصة سحابية واحدة (SaaS)، سنحتاج إلى عزل بيانات كل جهة عن الأخرى تماماً لمنع أي تسريب للبيانات.
        </p>
        <p>
          يتم تطبيق الـ <strong>Multi-Tenancy</strong> هندسياً إما عبر إضافة عمود <code>tenant_id</code> إلزامي في كل جدول مع سياسات أمان صارمة في قاعدة البيانات (Row-Level Security)، أو عبر تخصيص قاعدة بيانات منفصلة لكل جامعة.
        </p>

        <div class="callout warning">
          <div class="callout-header">
            <span class="callout-icon">⚠️</span>
            <span>قاعدة معمارية حاسمة لنطاق الـ MVP</span>
          </div>
          <p>
            خاصية <strong>Multi-Tenancy</strong> و <strong>Redis</strong> هي ميزات معمارية مشروطة بطبيعة وحجم المنتج الفعلي؛ <strong>لا تدخل تلقائياً في نسخة الـ MVP الأولى</strong> لجامعة واحدة حتى لا نزيد التعقيد وتكاليف البنية التحتية دون حاجة مؤكدة.
          </p>
        </div>

      </section>

<section class="supplemental-content"><span class="supplemental-label">إثراء مقترح — من إعداد الموقع</span><h3>اختيار المخطط قبل الرسم</h3><p>ابدأ بالسؤال لا بالأداة: سؤال «من يملك الوظيفة؟» يقود إلى Use Case، وسؤال «كيف تُخزّن البيانات؟» يقود إلى ERD. هذا يقلل خلط Domain Model مع الجداول.</p><div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">SUPPLEMENTAL PROMPT — Diagram Lens</span><button class="copy-btn" type="button" aria-label="نسخ برومبت اختيار عدسة المخطط">نسخ</button></div><pre class="code-content"><code>Given the approved requirement below, choose the single best diagram lens.
Return: question answered, recommended notation, required inputs, and one risk of using the wrong diagram.
Do not generate the diagram yet.
Requirement: [PASTE REQUIREMENT]</code></pre></div></section>
`;
