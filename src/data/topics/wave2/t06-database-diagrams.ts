import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 14: Relational ERD & Database Modeling
 * Sequence Position: 14
 * ========================================================================= */
export const topic14Html = `
<aside class="callout note"><p><strong>حدود نموذج BorrowHub:</strong> هذه أمثلة جزئية لتعليم النمذجة وليست مخططًا تنفيذيًا معتمدًا أو بديلًا عن PRD. حالات ACTIVE/SUSPENDED وحدها لا توثق انتظار اعتماد الحساب، وحقول الأمثلة لا تستكمل بالضرورة سبب الاستعارة وتاريخ البداية وحد المدة (10 أيام). دوّن هذه الفجوات في database-review.md وراجع تمثيلها مع مالك PRD قبل التنفيذ. أسماء حالات الطلب وتعريف الحالات النشطة وتوقيت حجز المخزون تحتاج توحيدًا بين State وERD وSequence وClass؛ لا تنسخها كنموذج نهائي. مهلة 48 ساعة مرتبطة بتاريخ بداية الطلب وفق التعريف الموثق، والتسليم والإرجاع يؤكدهما المسؤول، والتلف لا يعود للمتاح، والتأخر متابعة يدوية دون حظر تلقائي.</p></aside>
<section id="topic-14-relational-erd" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 14 · المحطة الأساسية</span>
    <span class="step-pill">نمذجة قواعد البيانات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط العلاقات بين الكيانات (ERD) ونمذجة قواعد البيانات</h2>
      <div class="step-subtitle">تصميم الجداول والمفاتيح والعلاقات والقيود لنطاق MVP مع مراجعة الجودة وتجنب حالات السباق</div>
    </div>
  </div>

  <!-- 1. What is ERD and How it Differs from Domain Model -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو مخطط ERD ولماذا يختلف جذرياً عن Domain Model؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      مخطط <strong>ERD (Entity Relationship Diagram)</strong> هو المخطط الهندسي الذي يحدد كيفية <strong>تخزين بيانات النظام فعلياً في جداول مترابطة</strong> داخل قاعدة البيانات العلائقية (Relational Database).
      من أكبر الأخطاء الهندسية الخلط بين <strong>النموذج المفاهيمي (Domain Model)</strong> ومخطط <strong>ERD</strong>:
    </p>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>وجه المقارنة</th>
            <th>النموذج المفاهيمي (Domain Model)</th>
            <th>مخطط قاعدة البيانات (ERD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المستوى والتجريد</strong></td>
            <td>مفاهيمي بحت يصف لغة العمل ومسؤوليات المفاهيم لأصحاب المصلحة</td>
            <td>منطقي وتقني يحدد البنية الهيكلية المباشرة لقاعدة البيانات</td>
          </tr>
          <tr>
            <td><strong>المفاتيح (PK / FK)</strong></td>
            <td>ممنوع منعاً باتاً: لا مفاتيح أساسية ولا أجنبية</td>
            <td>إلزامي: كل جدول يملك مفتاحاً أساسياً (PK) ومفاتيح أجنبية (FK) للربط</td>
          </tr>
          <tr>
            <td><strong>أنواع البيانات والقيود</strong></td>
            <td>لا يحتوي على أنواع بيانات تقنية (No SQL Types)</td>
            <td>يحدد أنواع الحقول بدقة (UUID, INT, VARCHAR, TIMESTAMP, CHECK)</td>
          </tr>
          <tr>
            <td><strong>تسمية الكيانات</strong></td>
            <td>اسم المفهوم المفرد بصيغة الأعمال (مثل: معدة، طلب، مستخدم)</td>
            <td>اسم الجدول بصيغة الجمع التقنية (مثل: <code>equipment</code>, <code>loan_requests</code>, <code>users</code>)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 2. Core ERD Elements -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. العناصر الأساسية لمخطط ERD المتكامل</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يقوم تصميم قاعدة البيانات المنضبط على ست ركائز هيكلية متكاملة:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">الجدول / الكيان (Entity / Table)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-relaxed">يمثل وحدة تخزين السجلات المستقلة، ويُسمى دائماً بصيغة الجمع الإنجليزية بحروف صغيرة (مثل <code>users</code>, <code>loan_requests</code>).</p>
      </div>
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">المفتاح الأساسي (Primary Key - PK)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-relaxed">معرّف فريد غير قابل للتكرار لكل سجل في الجدول (مثل <code>id UUID</code> أو <code>id BIGINT</code>) لمنع اختلاط السجلات.</p>
      </div>
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">المفتاح الأجنبي (Foreign Key - FK)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-relaxed">حقل يشير إلى المفتاح الأساسي في جدول آخر لإنشاء العلاقة العلائقية وفرض السلامة المرجعية (Referential Integrity).</p>
      </div>
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">درجات العلاقة (Cardinality)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-relaxed">تحدد نسبة الارتباط بين الجداول: <code>1:1</code> (واحد لواحد)، <code>1:N</code> (واحد لمتعدد)، و<code>N:M</code> (متعدد لمتعدد عبر جدول وسيط).</p>
      </div>
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">القيود الهندسية (Constraints)</h4>
        <p class="text-sm text-[var(--text-muted)] leading-relaxed">قواعد تفرض على مستوى المحرك: <code>NOT NULL</code> (إلزامية القيمة)، <code>UNIQUE</code> (منع التكرار مثل البريد)، و<code>CHECK</code> (التحقق من صحة القيمة).</p>
      </div>
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">التطبيع وقواعد 3NF</h4>
        <p class="text-sm text-[var(--text-muted)] leading-relaxed">تقليل التكرار وضمان أن كل حقل غير مفتاحي يعتمد اعتماداً كاملاً على المفتاح الأساسي وحده (Third Normal Form).</p>
      </div>
    </div>
  </div>

  <!-- 3. Critical Audit Questions & Concurrency / Race Conditions -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. أسئلة التدقيق الهندسي وحالات التزامن (Concurrency & Race Conditions)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      المخطط الصحيح نحوياً قد ينهار وظيفياً إذا أهمل حالات التزامن وحسابات المخزون المتزامنة. قبل اعتماد المخطط، يجب الإجابة عن الأسئلة الصارمة التالية:
    </p>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>معادلة المخزون الذرية ومنع التضارب في BorrowHub</span>
      </div>
      <p class="leading-7">
        في أنظمة إدارة الأصول والاستعارة، يجب أن تتطابق كميات المخزون دائماً وفق المعادلة الثابتة:<br>
        <code>total_count = available_count + reserved_count + borrowed_count + damaged_count</code><br>
        <strong>خطر حالة السباق (Race Condition):</strong> إذا طلب طالبان نفس الجهاز المتوفر منه نسخة واحدة في نفس اللحظة، لا يجوز الاعتماد على فحص الواجهة فقط، بل يجب إحاطة التحديث بحركات ذرية (Atomic Transaction) وقفل تشاؤمي أو فحص شرطي في قاعدة البيانات: <code>UPDATE equipment SET available_count = available_count - 1, reserved_count = reserved_count + 1 WHERE id = :id AND available_count &gt; 0</code>.
      </p>
    </div>
  </div>

  <!-- 4. Case Study: BorrowHub Relational Model -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. دراسة حالة BorrowHub: النموذج العلائقي لنطاق MVP</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يتكون نموذج بيانات دراسة حالة <strong>BorrowHub</strong> لنطاق النسخة الأولى (MVP) من خمسة جداول علائقية منضبطة:
    </p>

    <ul class="space-y-2 pr-4 leading-7 text-[var(--text-muted)] list-disc list-inside my-4">
      <li><strong><code>users</code>:</strong> بيانات حساب الطالب ومسؤول المعمل، الأدوار (STUDENT / LAB_ADMIN)، وحالة الحساب (ACTIVE / SUSPENDED).</li>
      <li><strong><code>equipment_categories</code>:</strong> تصنيف الأجهزة والمعدات المعملية (مثل الإلكترونيات، الروبوتات، الحساسات).</li>
      <li><strong><code>equipment</code>:</strong> تفاصيل المعدة ورقم الطراز وكميات المخزون المفصلة (total, available, reserved, borrowed, damaged).</li>
      <li><strong><code>loan_requests</code>:</strong> طلبات الاستعارة ومواعيد التسليم والإرجاع، والحالة (PENDING, APPROVED, REJECTED, PICKED_UP, RETURNED).</li>
      <li><strong><code>loan_action_logs</code>:</strong> سجل غير قابل للتعديل (Audit Log) يوثق كل إجراء حدث على الطلب (من الفاعل، متى، ونوع الإجراء).</li>
    </ul>

    <!-- Mermaid ERD Diagram Code Block -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (erDiagram) — كود مخطط العلاقات العلائقي لمشروع BorrowHub</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود Mermaid ERD">نسخ</button>
      </div>
      <pre class="code-content"><code>erDiagram
    users ||--o{ loan_requests : "submits"
    users ||--o{ loan_action_logs : "performs"
    equipment_categories ||--o{ equipment : "categorizes"
    equipment ||--o{ loan_requests : "reserved_in"
    loan_requests ||--o{ loan_action_logs : "logged_in"

    users {
        uuid id PK
        string full_name "NOT NULL"
        string email UK "NOT NULL"
        string role "CHECK role IN ('STUDENT', 'LAB_ADMIN')"
        string status "CHECK status IN ('ACTIVE', 'SUSPENDED')"
        datetime created_at
    }

    equipment_categories {
        uuid id PK
        string name "NOT NULL UNIQUE"
        string description
        string icon
    }

    equipment {
        uuid id PK
        uuid category_id FK "NOT NULL"
        string name "NOT NULL"
        string model_number
        int total_count "CHECK >= 0"
        int available_count "CHECK >= 0"
        int reserved_count "CHECK >= 0"
        int borrowed_count "CHECK >= 0"
        int damaged_count "CHECK >= 0"
        datetime created_at
    }

    loan_requests {
        uuid id PK
        uuid user_id FK "NOT NULL"
        uuid equipment_id FK "NOT NULL"
        string status "CHECK IN ('PENDING','APPROVED','REJECTED','PICKED_UP','RETURNED')"
        datetime requested_at "NOT NULL"
        datetime due_date "NOT NULL"
        datetime picked_up_at
        datetime returned_at
    }

    loan_action_logs {
        uuid id PK
        uuid loan_request_id FK "NOT NULL"
        uuid actor_id FK "NOT NULL"
        string action_type "NOT NULL"
        string notes
        datetime created_at "NOT NULL"
    }</code></pre>
    </div>
  </div>

  <!-- 5. Approved Prompts for ERD and Quality Review -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. البرومبتات الهندسية المعتمدة لتصميم ومراجعة قاعدة البيانات</h3>

    <!-- Prompt 12 -->
    <div class="prompt-section my-4">
      <div class="prompt-heading">
        <h4 class="text-base font-black text-[var(--text-main)]">البرومبت 12: توليد ERD بصيغتي DBML و Mermaid</h4>
        <span class="prompt-index">PROMPT 12</span>
      </div>
      <div class="prompt-meta">
        <span>المدخلات: docs/PRD.md + docs/user-flow.md + docs/diagrams/domain-model.md</span>
        <span>المخرجات: docs/database.dbml + docs/ERD.md + docs/database-review.md</span>
      </div>
      <div class="code-container" dir="ltr">
        <div class="code-header">
          <span class="code-lang">PROMPT 12 — Relational ERD Generation</span>
          <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ البرومبت 12">نسخ</button>
        </div>
        <pre class="code-content"><code>Act as a Senior Database Architect.
Read docs/PRD.md, User Flow and approved Domain Model.
Design ONLY the MVP relational ERD.
Identify tables, columns, data types, PK/FK, cardinality, unique/not-null/check
constraints and justified indexes. Apply 3NF where suitable.
Avoid unnecessary duplication and tables; consider race conditions and
atomic inventory updates. Distinguish technical choices from business rules.
Generate valid DBML for dbdiagram.io and equivalent Mermaid erDiagram.
Save docs/database.dbml, docs/ERD.md and docs/database-review.md.
Explain every entity and relationship in Arabic.
Flag missing requirements rather than inventing them. No migrations or code.</code></pre>
      </div>
    </div>

    <!-- Prompt 13 -->
    <div class="prompt-section my-6">
      <div class="prompt-heading">
        <h4 class="text-base font-black text-[var(--text-main)]">البرومبت 13: التدقيق الهندسي لجودة قاعدة البيانات</h4>
        <span class="prompt-index">PROMPT 13</span>
      </div>
      <div class="prompt-meta">
        <span>المدخلات: docs/database.dbml + docs/ERD.md + docs/PRD.md</span>
        <span>المخرجات: docs/database-review.md</span>
      </div>
      <div class="code-container" dir="ltr">
        <div class="code-header">
          <span class="code-lang">PROMPT 13 — Database Quality Review</span>
          <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ البرومبت 13">نسخ</button>
        </div>
        <pre class="code-content"><code>Act as a Senior Database Reviewer.
Review docs/database.dbml and docs/ERD.md against docs/PRD.md.
Check cardinality, 3NF, redundant counters, referential integrity,
check constraints, transaction boundaries, concurrent requests,
stock consistency and consistency with documented statuses.
Report each issue with severity, evidence, impact and proposed correction.
Do not silently change the schema. Save docs/database-review.md.</code></pre>
      </div>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 15: DBML Syntax & dbdiagram.io Editor
 * Sequence Position: 15
 * ========================================================================= */
export const topic15Html = `
<aside class="callout note"><p><strong>حدود نموذج BorrowHub:</strong> هذه أمثلة جزئية لتعليم النمذجة وليست مخططًا تنفيذيًا معتمدًا أو بديلًا عن PRD. حالات ACTIVE/SUSPENDED وحدها لا توثق انتظار اعتماد الحساب، وحقول الأمثلة لا تستكمل بالضرورة سبب الاستعارة وتاريخ البداية وحد المدة (10 أيام). دوّن هذه الفجوات في database-review.md وراجع تمثيلها مع مالك PRD قبل التنفيذ. أسماء حالات الطلب وتعريف الحالات النشطة وتوقيت حجز المخزون تحتاج توحيدًا بين State وERD وSequence وClass؛ لا تنسخها كنموذج نهائي. مهلة 48 ساعة مرتبطة بتاريخ بداية الطلب وفق التعريف الموثق، والتسليم والإرجاع يؤكدهما المسؤول، والتلف لا يعود للمتاح، والتأخر متابعة يدوية دون حظر تلقائي.</p></aside>
<section id="topic-15-dbml-dbdiagram" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 15 · المحطة الأساسية</span>
    <span class="step-pill">أدوات نمذجة البيانات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">لغة DBML ومحرر dbdiagram.io</h2>
      <div class="step-subtitle">كتابة مخططات قواعد البيانات بلغة DBML التفاعلية، تصدير SQL، وفهم الفروق الجوهرية عن Mermaid</div>
    </div>
  </div>

  <!-- 1. What is DBML -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هي لغة DBML وما وظيفته في مسار هندسة البرمجيات؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لغة <strong>DBML (Database Markup Language)</strong> هي لغة نصية مفتوحة المصدر وبسيطة ومقروءة بشرياً صُممت خصيصاً لتعريف وهيكلة قواعد البيانات العلائقية.
      بدلاً من كتابة كود SQL DDL المعقد يدوياً أو استخدام برامج رسم ثقيلة ومعقدة، توفر DBML صياغة نصية رشيقة تمكن المطور والوكيل الذكي من كتابة الجداول والحقول والقيود والعلاقات بنقاء فائق، وحفظها كملف نصي خفيف <code>docs/database.dbml</code> داخل مستودع Git.
    </p>
  </div>

  <!-- 2. Crucial Distinction: DBML vs Mermaid -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. التمايز القاطع: DBML ليس Mermaid!</h3>
    <div class="callout danger my-4">
      <div class="callout-header">
        <span class="callout-icon">🚫</span>
        <span>خطأ هندسي شائع: محاولة لصق DBML في محرر Mermaid</span>
      </div>
      <p class="leading-7">
        <strong>DBML ليست صيغة رسم عامة ولا تتبع Mermaid.js إطلاقاً!</strong><br>
        إذا حاولت لصق كود DBML داخل محرر Mermaid Live أو داخل كتلة <code>\`\`\`mermaid</code> فستفشل الصفحة فوراً وتظهر خطأ صياغة (Syntax Parse Error).
        مكان تشغيل وعرض وتصدير كود DBML هو المحرر المخصص <strong><a href="https://dbdiagram.io" target="_blank" rel="noopener noreferrer" class="font-bold underline text-[var(--brand-primary)]">dbdiagram.io</a></strong>.
      </p>
    </div>

    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>المعيار</th>
            <th>لغة DBML ومحرر dbdiagram.io</th>
            <th>مخطط Mermaid erDiagram</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المحرر والبيئة المخصصة</strong></td>
            <td>محرر <a href="https://dbdiagram.io" target="_blank" rel="noopener noreferrer" class="underline font-bold">dbdiagram.io</a> السحابي المتخصص لقواعد البيانات</td>
            <td>محرر <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" class="underline font-bold">Mermaid Live</a> ومحركات Markdown العامة</td>
          </tr>
          <tr>
            <td><strong>طبيعة الاستخدام</strong></td>
            <td>هندسة متخصصة لقواعد البيانات تدعم التصدير لـ SQL DDL (PostgreSQL / MySQL)</td>
            <td>توثيق بصري سريع داخل ملفات التوثيق Markdown في المستودع</td>
          </tr>
          <tr>
            <td><strong>التفاعل والتحريك</strong></td>
            <td>تفاعلي بالكامل: سحب وإفلات الجداول (Drag & Drop)، تكبير حر، ومشاركة الروابط</td>
            <td>تصيير ثابت كصورة شعاعية SVG مدمجة</td>
          </tr>
          <tr>
            <td><strong>صيغة كود العلاقات</strong></td>
            <td><code>Ref: loan_requests.user_id &gt; users.id</code></td>
            <td><code>users ||--o{ loan_requests : "submits"</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. DBML Syntax Rules -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. قواعد كتابة DBML الأساسية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تتميز لغة DBML بالوضوح التام وسهولة التتبع:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">تعريف الجداول (Table)</h4>
        <pre class="text-xs bg-[var(--bg-card-subtle)] p-2 rounded mt-2 font-mono" dir="ltr"><code>Table table_name {
  id uuid [pk]
  name varchar [not null]
  created_at timestamp
}</code></pre>
      </div>

      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">تعريف العلاقات (Ref)</h4>
        <pre class="text-xs bg-[var(--bg-card-subtle)] p-2 rounded mt-2 font-mono" dir="ltr"><code>// 1:N Relationship
Ref: child.fk_id > parent.id

// 1:1 Relationship
Ref: profile.user_id - users.id</code></pre>
      </div>

      <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <h4 class="font-black text-[var(--brand-primary)] mb-1">القيود والملاحظات (Constraints & Notes)</h4>
        <pre class="text-xs bg-[var(--bg-card-subtle)] p-2 rounded mt-2 font-mono" dir="ltr"><code>status varchar [
  not null,
  default: 'PENDING',
  note: 'Current state'
]</code></pre>
      </div>
    </div>
  </div>

  <!-- 4. Case Study: BorrowHub Complete DBML -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. دراسة حالة BorrowHub: كود DBML الكامل والجاهز للنسخ</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      انسخ هذا الكود والصقه مباشرة في <a href="https://dbdiagram.io" target="_blank" rel="noopener noreferrer" class="font-bold underline text-[var(--brand-primary)]">dbdiagram.io</a> لتوليد مخطط قاعدة بيانات تفاعلي واستخراج كود PostgreSQL DDL:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">DBML — كود نموذج BorrowHub الكامل لـ dbdiagram.io</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود DBML">نسخ</button>
      </div>
      <pre class="code-content"><code>Table users {
  id uuid [pk]
  full_name varchar [not null]
  email varchar [unique, not null]
  role varchar [not null, note: 'STUDENT or LAB_ADMIN']
  status varchar [not null, default: 'ACTIVE', note: 'ACTIVE or SUSPENDED']
  created_at timestamp [default: \`now()\`]

  Note: 'المستخدمون: الطلاب ومسؤولو المعامل والمستودع'
}

Table equipment_categories {
  id uuid [pk]
  name varchar [unique, not null]
  description text
  icon varchar

  Note: 'تصنيفات المعدات المعملية'
}

Table equipment {
  id uuid [pk]
  category_id uuid [not null]
  name varchar [not null]
  model_number varchar
  total_count int [not null, default: 0]
  available_count int [not null, default: 0]
  reserved_count int [not null, default: 0]
  borrowed_count int [not null, default: 0]
  damaged_count int [not null, default: 0]
  created_at timestamp [default: \`now()\`]

  Note: 'الأجهزة والمخزون التجميعي المنضبط بمعادلة الإجمالي'
}

Table loan_requests {
  id uuid [pk]
  user_id uuid [not null]
  equipment_id uuid [not null]
  status varchar [not null, default: 'PENDING', note: 'PENDING, APPROVED, REJECTED, PICKED_UP, RETURNED']
  requested_at timestamp [not null, default: \`now()\`]
  due_date timestamp [not null]
  picked_up_at timestamp
  returned_at timestamp

  Note: 'طلبات استعارة المعدات وتتبع حالاتها'
}

Table loan_action_logs {
  id uuid [pk]
  loan_request_id uuid [not null]
  actor_id uuid [not null]
  action_type varchar [not null, note: 'SUBMIT, APPROVE, REJECT, PICKUP, RETURN']
  notes text
  created_at timestamp [not null, default: \`now()\`]

  Note: 'سجل تدقيق الإجراءات والقرارات غير القابل للتعديل'
}

Ref: equipment.category_id > equipment_categories.id [delete: restrict]
Ref: loan_requests.user_id > users.id [delete: restrict]
Ref: loan_requests.equipment_id > equipment.id [delete: restrict]
Ref: loan_action_logs.loan_request_id > loan_requests.id [delete: cascade]
Ref: loan_action_logs.actor_id > users.id [delete: restrict]</code></pre>
    </div>
  </div>

  <!-- 5. Step-by-Step Guide for dbdiagram.io -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. خطوات العمل على محرر dbdiagram.io وتصدير SQL DDL</h3>
    <ol class="space-y-3 pr-4 leading-7 text-[var(--text-muted)] list-decimal list-inside my-4">
      <li><strong>فتح المحرر:</strong> توجّه إلى <a href="https://dbdiagram.io" target="_blank" rel="noopener noreferrer" class="font-bold underline text-[var(--brand-primary)]">dbdiagram.io</a> وانقر على زر "Go to App".</li>
      <li><strong>لصق الكود الخام:</strong> امسح النص التجريبي الافتراضي والصق كود DBML السابق. <em>تنبيه: لا تقم بتضمين علامات التنسيق <code>\`\`\`dbml</code></em>؛ الصق نص الكود مباشرة.</li>
      <li><strong>التنظيم البصري:</strong> قم بسحب الصناديق وضبط أماكن الجداول بما يحقق وضوح الأسهم وتجنب تقاطع الخطوط.</li>
      <li><strong>تصدير كود DDL:</strong> من القائمة العلوية اختر <strong>Export &gt; Export to PostgreSQL</strong> أو MySQL للحصول على أوامر <code>CREATE TABLE</code> المعتمدة، واحفظ الملف باسم <code>docs/database.sql</code>.</li>
      <li><strong>المشاركة والتوثيق:</strong> انقر على زر <strong>Share</strong> وانسخ الرابط التفاعلي لتوثيقه في ملف <code>docs/README.md</code> بمستودع مشروعك.</li>
    </ol>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 16: Sequence Diagram & Dynamic Interactions
 * Sequence Position: 16
 * ========================================================================= */
export const topic16Html = `
<aside class="callout note"><p><strong>حدود نموذج BorrowHub:</strong> هذه أمثلة جزئية لتعليم النمذجة وليست مخططًا تنفيذيًا معتمدًا أو بديلًا عن PRD. حالات ACTIVE/SUSPENDED وحدها لا توثق انتظار اعتماد الحساب، وحقول الأمثلة لا تستكمل بالضرورة سبب الاستعارة وتاريخ البداية وحد المدة (10 أيام). دوّن هذه الفجوات في database-review.md وراجع تمثيلها مع مالك PRD قبل التنفيذ. أسماء حالات الطلب وتعريف الحالات النشطة وتوقيت حجز المخزون تحتاج توحيدًا بين State وERD وSequence وClass؛ لا تنسخها كنموذج نهائي. مهلة 48 ساعة مرتبطة بتاريخ بداية الطلب وفق التعريف الموثق، والتسليم والإرجاع يؤكدهما المسؤول، والتلف لا يعود للمتاح، والتأخر متابعة يدوية دون حظر تلقائي.</p></aside>
<section id="topic-16-sequence-diagram" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 16 · المحطة الأساسية</span>
    <span class="step-pill">النمذجة السلوكية والديناميكية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط تسلسل التفاعلات (Sequence Diagram)</h2>
      <div class="step-subtitle">توثيق ترتيب الرسائل والتفاعلات الزمنية بين المستخدم والنظام ومخزن البيانات لحالات الاستخدام الأساسية</div>
    </div>
  </div>

  <!-- 1. What is Sequence Diagram -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو مخطط Sequence Diagram ولماذا نحتاجه؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      إذا كان <strong>User Flow</strong> يوضح مسار خطوات المستخدم وقراراته من زاوية التجربة، و<strong>ERD</strong> يوضح كيف ترقد البيانات داخل الجداول، فإن <strong>Sequence Diagram</strong> يجيب عن السؤال المعماري الحاسم:
      <strong>"من يرسل ماذا، ولمن، وبأي ترتيب زمني دقيق؟"</strong>
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      يوثق مخطط التسلسل تبادل الرسائل بين الفواعل (Actors) والمكونات البرمجية ومخازن البيانات، مبيناً نقاط التحقق، وفروع النجاح والخطأ، والتحديثات الذرية لحالة النظام.
    </p>
  </div>

  <!-- 2. Architectural Rule: Logical Participants vs Speculative Backends -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. القاعدة المعمارية: المشاركون المنطقيون وتجنب التخمين</h3>
    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>قاعدة ذهبية من البرومبت المعتمد PROMPT 09</span>
      </div>
      <p class="leading-7">
        <strong>لا تخترع معمارية خوادم مجهولة أو مايكروسيرفس معقدة لم تُحسم في وثيقة PRD!</strong><br>
        إذا لم تكن وثائق المشروع قد حسمت معمارية الـ Backend بعد، نعتمد المشاركين المنطقيين الأساسيين:<br>
        1. <strong>المستخدم (Actor):</strong> مثل الطالب (Student) أو مسؤول المعمل (Lab Admin).<br>
        2. <strong>واجهة التطبيق (Application / Web App):</strong> استقبال المدخلات وعرض الرسائل.<br>
        3. <strong>خدمة المنطق والتحقق (Logic / Service):</strong> تطبيق قواعد العمل والتأكد من الصلاحيات.<br>
        4. <strong>مخزن البيانات (Data Store / DB):</strong> الاستعلام والتعديل الذري للسجلات.
      </p>
    </div>
  </div>

  <!-- 3. Mermaid Sequence Syntax -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. قواعد وأشكال الصياغة في Mermaid sequenceDiagram</h3>
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>العنصر</th>
            <th>الصيغة في Mermaid</th>
            <th>الوظيفة والمعنى الهندسي</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>الفاعل البشري (Actor)</strong></td>
            <td><code>actor Student as طالب</code></td>
            <td>يمثل المستخدم البشري الذي يطلق التفاعل</td>
          </tr>
          <tr>
            <td><strong>المشارك المنطقي (Participant)</strong></td>
            <td><code>participant App as واجهة الويب</code></td>
            <td>يمثل مكوناً برمجياً أو شاشة أو طبقة منطقية</td>
          </tr>
          <tr>
            <td><strong>طلب متزامن (Synchronous Call)</strong></td>
            <td><code>A-&gt;&gt;B: رسالة الطلب</code></td>
            <td>سهم مصمت برأس مسنن يمثل استدعاء دالة أو طلب إجرائي</td>
          </tr>
          <tr>
            <td><strong>رد متزامن (Response)</strong></td>
            <td><code>B--&gt;&gt;A: إرجاع النتيجة</code></td>
            <td>سهم منقط برأس مسنن يمثل نتيجة التحقق أو رد البيانات</td>
          </tr>
          <tr>
            <td><strong>التفرع الشرطي (Alt / Else)</strong></td>
            <td><code>alt شرط النجاح ... else شرط الخطأ ... end</code></td>
            <td>توضيح مسار النجاح وفروع الأخطاء والاعتذارات البديلة</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Case Study: BorrowHub Equipment Loan Sequence -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. دراسة حالة BorrowHub: مخطط تسلسل استعارة معدة وفحص القواعد</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      المخطط التالي يوثق التفاعل الزمني لطلب استعارة معدة في <strong>BorrowHub</strong>، مبيناً فحص القواعد المعتمدة (اعتماد الحساب، الحد الأقصى لجهازين نشطين - القاعدة 3، وتوفر رصيد المخزون):
    </p>

    <!-- Mermaid Sequence Diagram Code Block -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (sequenceDiagram) — تسلسل تقديم طلب استعارة في BorrowHub</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود Mermaid Sequence">نسخ</button>
      </div>
      <pre class="code-content"><code>sequenceDiagram
    autonumber
    actor Student as طالب (Student)
    participant WebApp as واجهة التطبيق (Web App)
    participant LoanService as خدمة الطلبات (Loan Service)
    participant DB as قاعدة البيانات (Database Store)

    Student-&gt;&gt;WebApp: اختيار معدة وتقديم طلب استعارة (equipment_id)
    WebApp-&gt;&gt;LoanService: submitLoanRequest(userId, equipmentId)

    Note over LoanService,DB: 1. فحص حالة حساب الطالب
    LoanService-&gt;&gt;DB: SELECT status FROM users WHERE id = userId
    DB--&gt;&gt;LoanService: status = 'ACTIVE'

    Note over LoanService,DB: 2. فحص الحد الأقصى للاستعارات النشطة (قاعدة 3: جهازان كحد أقصى)
    LoanService-&gt;&gt;DB: COUNT(loan_requests) WHERE user_id = userId AND status IN ('PENDING','APPROVED','PICKED_UP')
    DB--&gt;&gt;LoanService: activeCount

    alt activeCount &gt;= 2
        LoanService--&gt;&gt;WebApp: خطأ: تجاوزت الحد الأقصى للاستعارة النشطة (جهازان)
        WebApp--&gt;&gt;Student: عرض تنبيه المنع مع توجيه لصفحة الطلبات السابقة
    else activeCount &lt; 2
        Note over LoanService,DB: 3. فحص المخزون المتاح والحجز الذري
        LoanService-&gt;&gt;DB: UPDATE equipment SET available_count = available_count - 1, reserved_count = reserved_count + 1 WHERE id = equipmentId AND available_count &gt; 0
        DB--&gt;&gt;LoanService: rowsUpdated

        alt rowsUpdated == 0 (الكمية نفدت)
            LoanService--&gt;&gt;WebApp: خطأ: المعدة غير متوفرة حالياً في المخزون
            WebApp--&gt;&gt;Student: عرض رسالة اعتذار واقتراح موعد متوقع
        else rowsUpdated == 1 (حجز ناجح)
            LoanService-&gt;&gt;DB: INSERT INTO loan_requests (status: 'PENDING', due_date)
            DB--&gt;&gt;LoanService: loanRequestId
            LoanService-&gt;&gt;DB: INSERT INTO loan_action_logs (loan_id, action: 'SUBMIT')
            DB--&gt;&gt;LoanService: logConfirmed

            LoanService--&gt;&gt;WebApp: نجاح: تم تسجيل الطلب بنجاح وهو بانتظار اعتماد المعمل
            WebApp--&gt;&gt;Student: عرض رقم الطلب وحالة انتظار مراجعة المسؤول؛ لا يبدأ مؤقت الاستلام عند إرسال الطلب
        end
    end</code></pre>
    </div>
  </div>

  <!-- 5. Approved Prompt 09 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. البرومبت المعتمد لتوليد مخططات Sequence لحالات الاستخدام</h3>

    <div class="prompt-section my-4">
      <div class="prompt-heading">
        <h4 class="text-base font-black text-[var(--text-main)]">البرومبت 09: مخططات Sequence Diagram لحالات الاستخدام</h4>
        <span class="prompt-index">PROMPT 09</span>
      </div>
      <div class="prompt-meta">
        <span>المدخلات: docs/PRD.md + docs/user-flow.md + حالات الاستخدام</span>
        <span>المخرجات: docs/diagrams/sequence-diagrams.md + sequence-diagrams.mmd</span>
      </div>
      <div class="code-container" dir="ltr">
        <div class="code-header">
          <span class="code-lang">PROMPT 09 — Sequence Diagram Generation</span>
          <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ البرومبت 09">نسخ</button>
        </div>
        <pre class="code-content"><code>Act as a Senior Software Architect and UML Expert.
Read the PRD, User Flow and Use Case documents.
Create a separate Mermaid sequenceDiagram for each main MVP use case.
Show actor, logical participants, requests/responses, validations,
data operations, alt/else branches, success and error scenarios.
Use a Backend or API component only if documented; otherwise use
User, Application and Data Store as logical participants.
Save docs/diagrams/sequence-diagrams.md and separate .mmd sources.
Validate actor permissions and the sequence against PRD. Explain in Arabic.
Generate no application code.</code></pre>
      </div>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 17: Class Diagram & Object-Oriented Design
 * Sequence Position: 17
 * ========================================================================= */
export const topic17Html = `
<aside class="callout note"><p><strong>حدود نموذج BorrowHub:</strong> هذه أمثلة جزئية لتعليم النمذجة وليست مخططًا تنفيذيًا معتمدًا أو بديلًا عن PRD. حالات ACTIVE/SUSPENDED وحدها لا توثق انتظار اعتماد الحساب، وحقول الأمثلة لا تستكمل بالضرورة سبب الاستعارة وتاريخ البداية وحد المدة (10 أيام). دوّن هذه الفجوات في database-review.md وراجع تمثيلها مع مالك PRD قبل التنفيذ. أسماء حالات الطلب وتعريف الحالات النشطة وتوقيت حجز المخزون تحتاج توحيدًا بين State وERD وSequence وClass؛ لا تنسخها كنموذج نهائي. مهلة 48 ساعة مرتبطة بتاريخ بداية الطلب وفق التعريف الموثق، والتسليم والإرجاع يؤكدهما المسؤول، والتلف لا يعود للمتاح، والتأخر متابعة يدوية دون حظر تلقائي.</p></aside>
<section id="topic-17-class-diagram" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 17 · المحطة الأساسية</span>
    <span class="step-pill">التصميم الكائني والمعماري</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مخطط الكلاسات البرمجية (Class Diagram)</h2>
      <div class="step-subtitle">بناء الهيكل الكائني للنظام وعلاقات الفئات اعتماداً على مخرجات ERD وSequence</div>
    </div>
  </div>

  <!-- 1. What is Class Diagram -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو مخطط Class Diagram؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      مخطط <strong>Class Diagram</strong> هو المخطط الهيكلي المركزي في هندسة البرمجيات كائنية التوجه (OOP).
      يوضح المخطط الكلاسات البرمجية التي سيتألف منها كود النظام، ومسؤوليات كل كلاس، وحقوله وخصائصه (Attributes)، والدوال والعمليات التي يؤديها (Methods / Operations)، والعلاقات التنسيقية بين الكلاسات (Associations, Compositions, Inheritances).
    </p>
  </div>

  <!-- 2. The Golden Engineering Order: Why Class comes AFTER ERD & Sequence -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. سر الترتيب الهندسي: لماذا يأتي Class Diagram بعد ERD وSequence؟</h3>
    <div class="callout tip my-4">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>حتمية التسلسل المعماري المعتمد</span>
      </div>
      <p class="leading-7">
        <strong>لا يمكن تصميم كلاسات برمجية ناضجة في الفراغ قبل تحديد البيانات والتفاعلات!</strong><br>
        كثير من المطورين يقعون في خطأ رسم Class Diagram مبكراً فيخترعون دوالاً وهمية وكلاسات لا وظيفة لها. الترتيب الصحيح المعتمد في مسارنا:<br>
        1. <strong>PRD &amp; Domain Model:</strong> يحددان مفاهيم العمل ونطاق MVP.<br>
        2. <strong>ERD:</strong> يحدد الكيانات المخزنة، الخصائص الأساسية، والمفاتيح (لتغذية خصائص الكلاسات <code>attributes</code>).<br>
        3. <strong>Sequence Diagram:</strong> يحدد الرسائل المتبادلة بين المكونات لتنفيذ المهام (لتغذية وتبرير دوال الكلاسات <code>methods</code>).<br>
        4. <strong>Class Diagram (الآن):</strong> يجمع البيانات والتفاعلات في كلاسات منضبطة ومبررة 100% دون أي تخمين!
      </p>
    </div>
  </div>

  <!-- 3. Mermaid Class Syntax & Relationships -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. قواعد كتابة Class Diagram ومحددات الرؤية والعلاقات</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تتضمن صياغة <code>Mermaid classDiagram</code> محددات الرؤية القياسية وأنواع العلاقات:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الرمز</th>
            <th>محدد الرؤية (Visibility)</th>
            <th>نوع العلاقة (Relationship)</th>
            <th>الصيغة في Mermaid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>+</code></td>
            <td>عام (Public) - متاح للجميع</td>
            <td>الوراثة / التعميم (Inheritance)</td>
            <td><code>ClassA &lt;|-- ClassB</code></td>
          </tr>
          <tr>
            <td><code>-</code></td>
            <td>خاص (Private) - داخل الكلاس فقط</td>
            <td>التركيب القوي (Composition)</td>
            <td><code>Parent *-- Child</code></td>
          </tr>
          <tr>
            <td><code>#</code></td>
            <td>محمي (Protected) - للكلاس وأبنائه</td>
            <td>التجميع الضعيف (Aggregation)</td>
            <td><code>Whole o-- Part</code></td>
          </tr>
          <tr>
            <td><code>~</code></td>
            <td>حزمة (Package / Internal)</td>
            <td>الارتباط العادي (Association)</td>
            <td><code>ClassA --&gt; ClassB</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Case Study: BorrowHub Class Diagram -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. دراسة حالة BorrowHub: كود Class Diagram الكامل والمتسق</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لاحظ الاتساق التام في أسماء الكلاسات مع جداول ERD والرسائل المستخرجة من Sequence Diagram:
    </p>

    <!-- Mermaid Class Diagram Code Block -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Mermaid (classDiagram) — مخطط كلاسات مشروع BorrowHub لنطاق MVP</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ كود Mermaid Class">نسخ</button>
      </div>
      <pre class="code-content"><code>classDiagram
    direction TB

    class UserRole {
        &lt;&lt;enumeration&gt;&gt;
        STUDENT
        LAB_ADMIN
    }

    class UserStatus {
        &lt;&lt;enumeration&gt;&gt;
        ACTIVE
        SUSPENDED
    }

    class LoanStatus {
        &lt;&lt;enumeration&gt;&gt;
        PENDING
        APPROVED
        REJECTED
        PICKED_UP
        RETURNED
    }

    class User {
        +UUID id
        +String fullName
        +String email
        +UserRole role
        +UserStatus status
        +DateTime createdAt
        +canBorrow() bool
        +hasActiveLoansExceeded(int maxLimit) bool
    }

    class EquipmentCategory {
        +UUID id
        +String name
        +String description
        +String icon
    }

    class Equipment {
        +UUID id
        +UUID categoryId
        +String name
        +String modelNumber
        +int totalCount
        +int availableCount
        +int reservedCount
        +int borrowedCount
        +int damagedCount
        +isAvailable() bool
        +reserveStock() bool
        +confirmPickup() void
        +processReturn(bool isDamaged) void
    }

    class LoanRequest {
        +UUID id
        +UUID userId
        +UUID equipmentId
        +LoanStatus status
        +DateTime requestedAt
        +DateTime dueDate
        +DateTime pickedUpAt
        +DateTime returnedAt
        +approve(UUID adminId) void
        +reject(UUID adminId, String reason) void
        +markPickedUp() void
        +markReturned() void
    }

    class LoanActionLog {
        +UUID id
        +UUID loanRequestId
        +UUID actorId
        +String actionType
        +String notes
        +DateTime createdAt
    }

    EquipmentCategory "1" --&gt; "*" Equipment : categorizes
    User "1" --&gt; "*" LoanRequest : submits
    Equipment "1" --&gt; "*" LoanRequest : requested in
    LoanRequest "1" *-- "*" LoanActionLog : tracks history
    User "1" --&gt; "*" LoanActionLog : performs action
    User ..&gt; UserRole
    User ..&gt; UserStatus
    LoanRequest ..&gt; LoanStatus</code></pre>
    </div>
  </div>

  <!-- 5. Cross-Diagram Naming Consistency Table -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. جدول اتساق الأسماء والمفردات بين المخططات الهندسية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      دليل سلامة التصميم المعماري هو <strong>وحدة وتناغم المسميات</strong> عبر كافة المخططات دون أي تضارب أو اختراع لأسماء جديدة:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>المفهوم المعماري</th>
            <th>مخطط ERD (جداول وقواعد)</th>
            <th>مخطط DBML (dbdiagram.io)</th>
            <th>مخطط Sequence (تفاعلات)</th>
            <th>مخطط Class (كلاسات OOP)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المستخدم والفاعل</strong></td>
            <td><code>users</code> (جدول)</td>
            <td><code>Table users</code></td>
            <td><code>actor Student</code> / <code>Admin</code></td>
            <td><code>class User</code></td>
          </tr>
          <tr>
            <td><strong>الأجهزة المعملية</strong></td>
            <td><code>equipment</code> (جدول)</td>
            <td><code>Table equipment</code></td>
            <td><code>equipmentId</code> / رصيد المخزون</td>
            <td><code>class Equipment</code></td>
          </tr>
          <tr>
            <td><strong>تصنيف الأجهزة</strong></td>
            <td><code>equipment_categories</code></td>
            <td><code>Table equipment_categories</code></td>
            <td>فئات الأجهزة في الكتالوج</td>
            <td><code>class EquipmentCategory</code></td>
          </tr>
          <tr>
            <td><strong>طلب الاستعارة</strong></td>
            <td><code>loan_requests</code> (جدول)</td>
            <td><code>Table loan_requests</code></td>
            <td><code>submitLoanRequest()</code></td>
            <td><code>class LoanRequest</code></td>
          </tr>
          <tr>
            <td><strong>سجل الحركات والتدقيق</strong></td>
            <td><code>loan_action_logs</code></td>
            <td><code>Table loan_action_logs</code></td>
            <td>تسجيل الحدث الذري في Log</td>
            <td><code>class LoanActionLog</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 6. Approved Prompt 11 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">6. البرومبت المعتمد لتوليد Class Diagram</h3>

    <div class="prompt-section my-4">
      <div class="prompt-heading">
        <h4 class="text-base font-black text-[var(--text-main)]">البرومبت 11: مخطط الكلاسات البرمجية</h4>
        <span class="prompt-index">PROMPT 11</span>
      </div>
      <div class="prompt-meta">
        <span>المدخلات: docs/PRD.md + docs/diagrams/domain-model.md + docs/ERD.md + docs/diagrams/sequence-diagrams.md</span>
        <span>المخرجات: docs/diagrams/class-diagram.md + class-diagram.mmd</span>
      </div>
      <div class="code-container" dir="ltr">
        <div class="code-header">
          <span class="code-lang">PROMPT 11 — Class Diagram Generation</span>
          <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.innerText='✓ تم النسخ!';setTimeout(()=>{this.innerText='نسخ';},2000);})" aria-label="نسخ البرومبت 11">نسخ</button>
        </div>
        <pre class="code-content"><code>Act as a Senior Object-Oriented Design Expert.
Read the PRD, Domain Model, ERD and relevant Sequence Diagrams.
Create ONLY a design-level Mermaid classDiagram for the MVP.
Show justified classes, responsibilities, important attributes,
meaningful associations and multiplicity; include operations only if supported.
Avoid unnecessary implementation/framework assumptions.
Save docs/diagrams/class-diagram.md and class-diagram.mmd.
Explain design decisions and assumptions in Arabic.</code></pre>
      </div>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * Wave-2 Ticket 06 Topic Entries Export
 * Covers authoritative sequence slots 14, 15, 16, 17
 * ========================================================================= */
export const t06Entries: TopicItem[] = [
  {
    id: 'relational-erd-design',
    number: '14',
    slug: 'relational-erd-design',
    title: 'مخطط العلاقات بين الكيانات (ERD) ونمذجة قواعد البيانات',
    subtitle: 'تصميم الجداول والمفاتيح والعلاقات والقيود لنطاق MVP مع مراجعة الجودة وتجنب حالات السباق',
    category: 'database',
    categoryName: 'قواعد البيانات والنمذجة',
    stageTag: 'نمذجة قواعد البيانات',
    summary: 'تحويل مفاهيم النظام وقواعد العمل المعتمدة إلى مخطط علائقي (ERD) منضبط يحدد الجداول والأعمدة والمفاتيح الأساسية والأجنبية (PK/FK) ودرجات العلاقة (Cardinality)، مع تطبيق قيود السلامة المرجعية وصيغة التفكيك 3NF ومراجعة حالات التزامن وحفظ المخرجات في docs/ERD.md وdocs/database-review.md.',
    tags: ['ERD', 'Database Modeling', 'Primary Key', 'Foreign Key', 'Cardinality', '3NF', 'Constraints', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic14Html),
    htmlContent: topic14Html,

    goal: 'تصميم وتوثيق مخطط العلاقات بين الكيانات (ERD) لنطاق MVP بدقة هندسية تشمل تحديد الجداول، المفاتيح الأساسية والأجنبية، القيود، معايير التكامل المرجعي، ومراجعة التزامن، وتوثيق المخطط في docs/ERD.md وتقرير المراجعة في docs/database-review.md.',
    prerequisites: [
      'وثيقة متطلبات المنتج المعتمدة docs/PRD.md وقواعد العمل',
      'مسار تدفق المستخدم docs/user-flow.md والنموذج المفاهيمي docs/diagrams/domain-model.md'
    ],
    steps: [
      '1. اقرأ وثيقة PRD وقواعد العمل (Business Rules) والنموذج المفاهيمي لمجال العمل (Domain Model) بدقة.',
      '2. استخرج الكيانات الحقيقية التي تتطلب حفظاً دائماً في قاعدة البيانات، وميّز بين المفهوم التجاري المجرد والجدول المخزن.',
      '3. حدد أسماء الجداول بصيغة الجمع القياسية (مثل users, equipment, loan_requests)، وحدد المفتاح الأساسي (PK) لكل جدول ونوعه (UUID أو BigInt Auto-increment).',
      '4. حدد المفاتيح الأجنبية (Foreign Keys) وعلاقات الترابط ودرجات العلاقة (Cardinality: 1:1, 1:N, N:M) بدقة.',
      '5. ضع قيود الحقول الضرورية (NOT NULL, UNIQUE, CHECK) وفهارس البحث المبررة (Indexes) دون إفراط.',
      '6. راجع قواعد سلامة البيانات وتجنب التكرار غير المنطقي (تطبيق 3NF حيث يلزم)، وافحص حالات السباق (Race Conditions) وتحديث المخزون الذري (Atomic Updates).',
      '7. استخدم البرومبت المعتمد (PROMPT 12) لتوليد كود Mermaid erDiagram ووثيقة docs/ERD.md، ثم طبق فحص الجودة ببرومبت (PROMPT 13) لحفظ docs/database-review.md.'
    ],
    promptRefs: [
      'prompt-12-erd-dbml-mermaid',
      'prompt-13-database-quality-review'
    ],
    outputs: [
      'docs/ERD.md',
      'docs/database-review.md'
    ],
    checklist: [
      'تمييز صريح بين النموذج المفاهيمي (Domain Model) ومخطط قاعدة البيانات العلائقي (ERD).',
      'تحديد المفاتيح الأساسية (PK) والمفاتيح الأجنبية (FK) لكل جدول بعلاقات واضحة.',
      'تحديد درجات العلاقة (Cardinality: 1:1, 1:N, N:M) مع تفسير سبب كل علاقة.',
      'إضافة قيود السلامة المرجعية (NOT NULL, UNIQUE, CHECK) ومحددات القيم المقبولة.',
      'معالجة حالات التزامن وحساب المخزون (الكمية الإجمالية = المتاحة + المحجوزة + المستعارة + التالفة).',
      'توثيق مراجعة الجودة الشاملة في docs/database-review.md قبل الانتقال للخطوة التالية.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 14,
  },
  {
    id: 'dbml-dbdiagram-io',
    number: '15',
    slug: 'dbml-dbdiagram-io',
    title: 'لغة DBML ومحرر dbdiagram.io',
    subtitle: 'كتابة مخططات قواعد البيانات بلغة DBML التفاعلية، تصدير SQL، وفهم الفروق الجوهرية عن Mermaid',
    category: 'database',
    categoryName: 'قواعد البيانات والنمذجة',
    stageTag: 'أدوات نمذجة البيانات',
    summary: 'إتقان لغة توصيف قواعد البيانات DBML (Database Markup Language) واستخدام محررها المخصص dbdiagram.io لرسم الجداول والعلاقات التفاعلية، وتصدير أكواد PostgreSQL DDL، مع توضيح الفروق الجوهرية بين DBML وMermaid وعدم خلطهما.',
    tags: ['DBML', 'dbdiagram.io', 'Database DDL', 'SQL Schema', 'PostgreSQL', 'Diagram Tools', 'Mermaid vs DBML'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic15Html),
    htmlContent: topic15Html,

    goal: 'كتابة مخطط قاعدة بيانات مشروع الطالب بلغة DBML القياسية، وعرضه وتعديله وتوليد الروابط التفاعلية وتصدير كود DDL على محرر dbdiagram.io، مع إدراك الفرق بينه وبين Mermaid.',
    prerequisites: [
      'مخطط ERD المعتمد من الموضوع السابق docs/ERD.md',
      'فهم بنية الجداول والحقول والعلاقات والقيود'
    ],
    steps: [
      '1. تعرّف على صياغة لغة DBML: كتل الجداول Table، الحقول وأنواعها، المفاتيح الأساسية [pk]، والقيود [not null, unique].',
      '2. صغ علاقات الجداول باستخدام صيغة الربط المباشر Ref: table_a.foreign_key > table_b.id.',
      '3. افتح محرر dbdiagram.io الرسمي (https://dbdiagram.io) وأنشئ مخططاً جديداً.',
      '4. الصق كود DBML مباشرة دون علامات التنصيص الخلفية الخاصة بـ Markdown (تجنب لصق ```dbml).',
      '5. نظّم تخطيط المخطط بصرياً عبر السحب والإفلات (Drag and Drop) لضبط تموضع الجداول وحركيتها.',
      '6. صدّر كود إنشاء الجداول (PostgreSQL DDL) واحتفظ بنسخة docs/database.sql، وشارك رابط المخطط التفاعلي.',
      '7. احفظ ملف التوصيف كاملاً في مستودع مشروعك بالمسار docs/database.dbml.'
    ],
    promptRefs: [
      'prompt-12-erd-dbml-mermaid'
    ],
    outputs: [
      'docs/database.dbml',
      'رابط تفاعلي على dbdiagram.io',
      'docs/database.sql'
    ],
    checklist: [
      'التفريق القاطع بين DBML وMermaid: DBML لا يعمل في Mermaid Live، وMermaid erDiagram ليس بديلاً عن dbdiagram.io.',
      'صحة صياغة كود DBML وخلوه من أخطاء الكتابة عند لصقه في dbdiagram.io.',
      'اشتمال كود DBML على جميع جداول وحقول وعلاقات مشروع الطالب (BorrowHub كمثال مرجعي).',
      'استخدام التوجيهات المتقدمة في DBML: التوثيق بالـ Note، القيود الافتراضية default، والمفاتيح المركبة.',
      'تصدير كود SQL DDL النظيف وتوثيق رابط المخطط السحابي في ملفات المشروع.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 15,
  },
  {
    id: 'sequence-diagram-modeling',
    number: '16',
    slug: 'sequence-diagram-modeling',
    title: 'مخطط تسلسل التفاعلات (Sequence Diagram)',
    subtitle: 'توثيق ترتيب الرسائل والتفاعلات الزمنية بين المستخدم والنظام ومخزن البيانات لحالات الاستخدام الأساسية',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'النمذجة السلوكية والديناميكية',
    summary: 'بناء مخططات تسلسل التفاعلات (Sequence Diagrams) بصيغة Mermaid sequenceDiagram لحالات الاستخدام الرئيسية لنطاق MVP، مبيناً الفواعل (Actors)، والمشاركين المنطقيين (User, Application, Data Store)، وترتيب الرسائل، والفحوصات، والتفرعات البديلة (alt / else) لمسارات النجاح والخطأ، استناداً الصارم لمتطلبات PRD دون اختراع عمليات غير مبررة.',
    tags: ['Sequence Diagram', 'Mermaid', 'Dynamic Modeling', 'UML', 'Interactions', 'Alt Else Branches', 'PRD', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic16Html),
    htmlContent: topic16Html,

    goal: 'توثيق التفاعلات الزمنية الديناميكية لحالات استخدام MVP الأساسية عبر مخططات Sequence قياسية توضح تسلسل الطلبات والردود ونقاط التحقق وفروع الخطأ والنجاح، وتخزينها في docs/diagrams/sequence-diagrams.md.',
    prerequisites: [
      'وثيقة المتطلبات docs/PRD.md وحالات الاستخدام المعتمدة',
      'مسار تدفق المستخدم docs/user-flow.md ومخطط ERD docs/ERD.md'
    ],
    steps: [
      '1. حدد حالة الاستخدام الرئيسية لنطاق MVP من وثيقة PRD (مثال BorrowHub: تقديم طلب استعارة معدة).',
      '2. حدد الفاعل المباشر (Actor) والمشاركين المنطقيين (Participants): مثل الطالب، واجهة التطبيق (Web App)، خدمة الطلبات (Request Service)، ومخزن البيانات (Data Store).',
      '3. التزم بقاعدة التجريد المنطقي: لا تفترض معمارية خادم معقدة أو مايكروسيرفس إن لم تكن موثقة في PRD؛ اكتفِ بالمشاركين المنطقيين.',
      '4. رتّب الرسائل زمنياً من الأعلى للأسفل: استخدم الأسهم المصمتة للطلبات (->>) والأسهم المنقطة للردود (-->>).',
      '5. حدد عمليات التحقق المتتابعة (Validations): فحص حساب المستخدم، فحص رصيد الاستعارات النشطة، وفحص توفر المخزون.',
      '6. ابنِ التفرعات الشرطية البديلة باستخدام كتل alt وelse لتغطية مسار النجاح والاعتذارات (رفض الطلب، نفاد المخزون).',
      '7. استخدم البرومبت المعتمد (PROMPT 09) لتوليد كود Mermaid sequenceDiagram، واحفظ المخرج في docs/diagrams/sequence-diagrams.md وsequence-diagrams.mmd.'
    ],
    promptRefs: [
      'prompt-09-sequence-diagram'
    ],
    outputs: [
      'docs/diagrams/sequence-diagrams.md',
      'docs/diagrams/sequence-diagrams.mmd'
    ],
    checklist: [
      'انسجام المخطط تماماً مع متطلبات PRD دون اختراع عمليات أو مسارات وهمية.',
      'وضوح الفاعل الرئيسي (Actor) والمشاركين المنطقيين المناسبين لمرحلة المشروع.',
      'استخدام التمييز الصحيح لأسهم الرسائل: ->> للطلبات المتزامنة، -->> للردود والتأكيدات.',
      'ظهور كتل alt / else لتغطية مسارات النجاح وفروع الأخطاء والاعتذار.',
      'تطابق أسماء الجداول والبيانات مع نموذج ERD المعتمد (users, equipment, loan_requests).',
      'صلاحية كود Mermaid sequenceDiagram وتصييره بسلاسة دون أخطاء صياغة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 16,
  },
  {
    id: 'class-diagram-design',
    number: '17',
    slug: 'class-diagram-design',
    title: 'مخطط الكلاسات البرمجية (Class Diagram)',
    subtitle: 'بناء الهيكل الكائني للنظام وعلاقات الفئات اعتماداً على مخرجات ERD وSequence',
    category: 'architecture',
    categoryName: 'التحليل وهندسة النظم',
    stageTag: 'التصميم الكائني والمعماري',
    summary: 'تصميم مخطط الكلاسات (Class Diagram) بصيغة Mermaid classDiagram لنطاق MVP، بالاعتماد الصارم على مخرجات ERD (لتحديد الخصائص والبيانات المخزنة) ومخططات Sequence (لتبرير العمليات والوظائف الديناميكية)، مع تمثيل العلاقات الكائنية، دون اختراع كلاسات أو دوال غير مدعومة بالمتطلبات.',
    tags: ['Class Diagram', 'Mermaid', 'Object-Oriented Design', 'UML', 'Design Inputs', 'ERD vs Class', 'BorrowHub'],
    contentTypes: ['diagram', 'prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic17Html),
    htmlContent: topic17Html,

    goal: 'بناء مخطط كلاسات كائني منضبط ومبرر يعكس بنية النظام لنطاق MVP، مستنداً إلى ERD في خصائصه وإلى Sequence في دواله وعملياته، وتوثيقه في docs/diagrams/class-diagram.md.',
    prerequisites: [
      'مخطط ERD ونموذج البيانات المعتمد docs/ERD.md',
      'مخططات تسلسل التفاعلات docs/diagrams/sequence-diagrams.md',
      'وثيقة متطلبات المنتج docs/PRD.md'
    ],
    steps: [
      '1. افهم الاعتمادية الهندسية: لماذا يأتي Class Diagram بعد ERD وSequence؟ (ERD يوفر الخصائص والعلاقات المخزنة، وSequence يبرر الدوال والعمليات المطلوبة).',
      '2. استخرج الكلاسات الجوهرية من الكيانات المعتمدة في ERD (مثل User, Equipment, LoanRequest, EquipmentCategory).',
      '3. حدد خصائص كل كلاس (Attributes) وأنواعها ومحددات الرؤية (+ عام، - خاص، # محمي) مسترشداً بحقول ERD.',
      '4. حدد الدوال والعمليات (Methods / Operations) لكل كلاس استناداً المباشر إلى الرسائل التي استقبلها الكائن في مخططات Sequence.',
      '5. حدد العلاقات الكائنية بدقة: الاقتران (Association)، التجميع (Aggregation)، التركيب (Composition)، والتعميم (Generalization/Inheritance).',
      '6. تجنب الحشو والتعقيد التخميني: لا تضف كلاسات أو دوال أو افتراضات إطارية (Framework Assumptions) غير مبررة بالمتطلبات.',
      '7. استخدم البرومبت المعتمد (PROMPT 11) لتوليد كود Mermaid classDiagram، واحفظ المخرج في docs/diagrams/class-diagram.md وclass-diagram.mmd.'
    ],
    promptRefs: [
      'prompt-11-class-diagram'
    ],
    outputs: [
      'docs/diagrams/class-diagram.md',
      'docs/diagrams/class-diagram.mmd'
    ],
    checklist: [
      'الالتزام بترتيب الاعتماديات: بناء Class Diagram اعتماداً على ERD وSequence وليس قبلهما.',
      'اتساق أسماء الكلاسات وخصائصها مع جداول وحقول ERD (User -> users, Equipment -> equipment).',
      'تبرير كل دالة برمجية (Method) بوجود تفاعل مقابل في مخططات Sequence.',
      'تحديد محددات الرؤية (+, -, #) وأنواع البيانات ومُعاملات الدوال بوضوح.',
      'تحديد نوع العلاقة الكائنية (Association, Composition, Inheritance) ونسب التعددية (Multiplicity: 1, 0..*, 1..*).',
      'خلو المخطط من أي افتراضات تقنية أو فئات إطارية وهمية.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 17,
  },
];
