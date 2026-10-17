export const topic05Html = `
      <!-- ==================== TOPIC 05: DATABASE ARCHITECTURE & PERFORMANCE ==================== -->
      <section id="topic-05" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 05</span>
          <span class="step-pill">هندسة قواعد البيانات والأداء المعماري</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">تصميم قاعدة البيانات (ERD & DBML) وهندسة أداء الاستعلامات (N+1 Query & Indexing)</h2>
            <div class="step-subtitle">هيكلة الجداول الخمسة، القيود، التطبيع (3NF)، وحل مشكلات الأداء قبل كتابة الكود</div>
          </div>
        </div>

        <!-- 1. The 5 Core Tables of BorrowHub -->
        <h3>الجداول الخمسة الرئيسية في نموذج قاعدة بيانات BorrowHub</h3>
        <p>
          يحوّل مخطط الـ <strong>ERD</strong> متطلبات البيانات إلى جداول ومفاتيح أساسية (<code>PK</code>) وأجنبية (<code>FK</code>) وقيود (<code>NOT NULL, UNIQUE, CHECK</code>) مع تطبيق التطبيع (<code>Normalization</code> حتى المستوى <strong>3NF</strong>) لمنع تكرار البيانات وتناقضها. في نموذج BorrowHub المعتمد، يتكون التصميم من <strong>5 جداول رئيسية</strong>:
        </p>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>اسم الجدول (Table)</th>
                <th>أهم المفاتيح والأعمدة (Columns)</th>
                <th>المسؤولية والغرض الهندسي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>users</code></td>
                <td><code>id (PK), email (UNIQUE), role, is_approved</code></td>
                <td>حسابات الطلاب ومسؤولي المستودع وحالة اعتماد الحساب يدوياً لمنع الاستعارة قبل التوثيق.</td>
              </tr>
              <tr>
                <td><code>equipment_categories</code></td>
                <td><code>id (PK), name (UNIQUE), description</code></td>
                <td>تصنيف المعدات الجامعية (كاميرات، حواسيب محمولة، أجهزة عرض ضوئي...).</td>
              </tr>
              <tr>
                <td><code>equipment</code></td>
                <td><code>id (PK), category_id (FK), total_qty, available_qty</code></td>
                <td>بيانات المعدات وكميات المخزون الإجمالي والسليم المتاح حالياً للإعارة.</td>
              </tr>
              <tr>
                <td><code>loan_requests</code></td>
                <td><code>id (PK), student_id (FK), equipment_id (FK), status, pickup_deadline, due_date, return_condition</code></td>
                <td>طلبات الاستعارة، تواريخ المهلة (48 ساعة للاستلام)، والمدة الكلية (&le; 10 أيام)، وحالة الإرجاع.</td>
              </tr>
              <tr>
                <td><code>loan_action_logs</code></td>
                <td><code>id (PK), loan_request_id (FK), actor_id (FK), action, created_at</code></td>
                <td>سجل تدقيق تاريخي (Audit Log) لجميع إجراءات الاعتماد والتسليم والإرجاع ورصد التلفيات.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Relational Core Rules -->
        <div class="grid-2col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">
              المفاتيح الأساسية PK والخارجية FK والجداول الوسيطة
            </h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7;">
              <strong>PK (Primary Key):</strong> معرّف فريد لا يتكرر داخل الجدول إطلاقاً.
              <br>
              <strong>FK (Foreign Key):</strong> عمود يشير إلى صف موجود في جدول آخر.
              <br>
              المستخدم يمكن أن يكون له عدة عمليات استعارة عبر الزمن، والعملية ترتبط بمستخدم واحد؛ هذه علاقة <code>One-to-Many</code>. بينما علاقة المستخدمين بالمعدات عبر الزمن هي <code>Many-to-Many</code> وتم حلها هندسياً عبر جدول وسيط هو <code>loan_requests</code> لحفظ تواريخ الاستعارة وحالتها وشروطها.
            </p>
          </div>

          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">
              القيود (Constraints) والتطبيع (Normalization 3NF)
            </h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7;">
              <strong>NOT NULL:</strong> يمنع ترك الحقل فارغاً كمعرف الطالب أو حالة الحساب.
              <br>
              <strong>UNIQUE:</strong> يمنع التكرار كالبريد الإلكتروني واسم التصنيف.
              <br>
              <strong>CHECK:</strong> يمنع القيم غير المنطقية مثل أن تكون الكمية المتاحة سالبة <code>available_qty &ge; 0</code>.
              <br>
              <strong>التطبيع 3NF:</strong> تنظيم الجداول لعزل البيانات المكررة في جداولها المستقلة حتى لا يؤدي تعديل اسم معدة إلى تناقض السجلات القديمة.
            </p>
          </div>
        </div>

        <!-- PROMPT FOR ERD AND DBML -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">برومبت توليد ERD و DBML ومراجعة قاعدة البيانات (Antigravity CLI / Cursor)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
          </div>
          <pre class="code-content"><code># Role
Act as a Senior Database Architect, Database Designer, and Business Analyst.

# Context
Read: docs/PRD.md, docs/user-flow.md, docs/diagrams/domain-model.md, docs/diagrams/use-case.md, docs/diagrams/sequence-diagrams.md.
The PRD is the primary source of truth.

# Task
Generate ONLY a professional Entity Relationship Diagram (ERD) and its supporting database documentation for the MVP.

# Step 1 — Database Analysis & 3NF Design
Identify: Required entities, Columns and data types, PK and FK, Cardinality, Nullable fields, UNIQUE and CHECK constraints.
Avoid redundant columns. Preserve referential integrity. Consider concurrent borrowing requests and atomic updates.

# Step 2 — DBML & Mermaid ERD
Generate valid DBML code compatible with dbdiagram.io.
Also generate valid Mermaid erDiagram.

# Step 3 — Database Review
Check: Missing entities, Normalization issues, Race conditions, Missing foreign keys.

# Deliverables
Create:
- docs/database.dbml
- docs/ERD.md
- docs/database-review.md</code></pre>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 2. Performance Engineering: N+1 & Indexes -->
        <h3>أداء قواعد البيانات وهندسة الاستعلامات (Index / JOIN / N+1 Problem)</h3>
        <p>
          صحة قاعدة البيانات وتطبيعها لا يضمنان وحدهما سرعة التطبيق! هناك ثغرتان معماريتان شهيرتان تتسببان في انهيار أداء الأنظمة في بيئات الإنتاج:
        </p>

        <!-- N+1 Query Explanation -->
        <div class="callout mistake">
          <div class="callout-header">
            <span class="callout-icon">🚨</span>
            <span>1. كارثة مشكلة الاستعلامات المتكررة (N+1 Query Problem)</span>
          </div>
          <p>
            تخيل صفحة في لوحة التحكم تعرض <strong>30 طلب استعارة</strong>:
            إذا نفذ البرنامج استعلاماً أولياً لجلب الـ 30 طلباً، ثم دار في حلقة تكرارية (Loop) ونفذ استعلاماً إضافياً منفصلاً لجلب اسم الطالب لكل طلب على حدة... فالمحصلة هي <strong>31 استعلاماً إلى قاعدة البيانات</strong> بدلاً من استعلام واحد!
          </p>
          <p>
            <strong>الحل الهندسي:</strong> حل مشكلة <code>N+1</code> يتم بدمج الجداول عبر <strong>JOIN</strong> في استعلام SQL واحد، أو تفعيل <strong>التحميل المسبق للعلاقات (Eager Loading)</strong> في طبقة الـ ORM (مثل <code>include / select_related</code>) لجلب البيانات المرتبطة دفعة واحدة.
          </p>
        </div>

        <!-- Database Indexing Explanation -->
        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">⚡</span>
            <span>2. دور الفهرس (Database Index) ومبدأ البحث الثنائي (Binary Search)</span>
          </div>
          <p>
            تخيل كتاباً ضخماً من 1000 صفحة: البحث عن كلمة معينة صفحةً صفحة يستغرق وقتاً طويلاً (Scan كامل)؛ فهرس الكتاب في النهاية يختصر الوصول إليها في لحظة.
            بالمثل، فهرس قاعدة البيانات (<code>B-Tree Index</code>) ينشئ هيكل بيانات مرتب يقلل خطوات البحث من <code>O(N)</code> إلى <code>O(log N)</code> على الأعمدة التي يُستعلم عنها بكثرة (مثل <code>student_id</code> أو <code>status</code> أو <code>email</code>).
          </p>
          <p>
            <strong>تحذير هندسي هام:</strong> الفهرس ليس مجانياً! وجود الفهرس يزيد من استهلاك مساحة التخزين، <strong>ويبطئ عمليات الإضافة والتحديث (INSERT / UPDATE)</strong> لأن قاعدة البيانات تضطر لتحديث شجرة الفهرس مع كل تعديل. لذلك نضيف الفهارس فقط حيث توجد حاجة استعلامية فعلية متكررة، ولا نضيف فهارس عشوائية بلا سبب.
          </p>
        </div>

      </section>
`;
