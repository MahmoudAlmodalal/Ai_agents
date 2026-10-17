export const topic04Html = `
      <!-- ==================== TOPIC 04: SYSTEM MODELING & UML ==================== -->
      <section id="topic-04" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 04</span>
          <span class="step-pill">نمذجة الأنظمة والمخططات الهندسية المعمارية</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">المخططات الهندسية المعمارية (UML & System Diagrams)</h2>
            <div class="step-subtitle">النظر إلى النظام من زوايا متعددة: المفاهيم، الصلاحيات، العمليات، التفاعلات، والحالات</div>
          </div>
        </div>

        <!-- 1. The 8 Diagrams Overview Table -->
        <p>
          بعد تثبيت وثيقة <code>PRD</code> ومسارات <code>User Flow</code>، تأتي المخططات المعمارية لتوضيح سلوك النظام وهيكلته. <strong>لا يوجد مخطط واحد يشرح كل شيء بمفرده</strong>، لذلك نعتمد على عدة مخططات متكاملة، كل واحد منها يجيب عن سؤال هندسي محدد بعدسة مختلفة:
        </p>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>المخطط الهندسي (Diagram)</th>
                <th>الهدف الأساسي والسؤال الذي يحسمه</th>
                <th>أداة وصيغة الرسم</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1</strong></td>
                <td><strong>User Flow</strong></td>
                <td>تتبع خطوات المستخدم وقراراته ومسارات النجاح والخطأ في الواجهة.</td>
                <td><code>Mermaid (flowchart TD)</code></td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td><strong>Domain Model (المفاهيمي)</strong></td>
                <td>توضيح مفاهيم العمل الأساسية والعلاقات بينها بلغة الأعمال دون تفاصيل تقنية.</td>
                <td><code>Mermaid (flowchart LR)</code></td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td><strong>Use Case Diagram</strong></td>
                <td>تحديد المستخدمين (Actors) والصلاحيات ووظائف النظام وحدود المنظومة.</td>
                <td><code>PlantUML</code></td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td><strong>Activity Diagram</strong></td>
                <td>تمثيل سير العمليات التجارية وتوزيع المسؤوليات بين الأطراف (Swimlanes).</td>
                <td><code>Mermaid (flowchart TD)</code></td>
              </tr>
              <tr>
                <td><strong>5</strong></td>
                <td><strong>Sequence Diagram</strong></td>
                <td>توضيح التسلسل الزمني الدقيق للطلبات والردود بين مكونات النظام.</td>
                <td><code>Mermaid (sequenceDiagram)</code></td>
              </tr>
              <tr>
                <td><strong>6</strong></td>
                <td><strong>State Diagram</strong></td>
                <td>رصد الحالات التي يمر بها الكيان والأحداث والشروط الحارسة التي تنقله بينها.</td>
                <td><code>Mermaid (stateDiagram-v2)</code></td>
              </tr>
              <tr>
                <td><strong>7</strong></td>
                <td><strong>Class Diagram</strong></td>
                <td>تصميم الكلاسات البرمجية وخصائصها وعملياتها الموثقة وتعدديتها.</td>
                <td><code>Mermaid (classDiagram)</code></td>
              </tr>
              <tr>
                <td><strong>8</strong></td>
                <td><strong>ERD (قاعدة البيانات)</strong></td>
                <td>تصميم جداول قاعدة البيانات والمفاتيح (PK/FK) والقيود والتطبيع.</td>
                <td><code>DBML + Mermaid (erDiagram)</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 2. Diagram 2: Conceptual Domain Model -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">D1</span>
            <div class="step-title-wrap">
              <h3 class="step-title">المخطط 2: النموذج المفاهيمي (Conceptual Domain Model)</h3>
              <div class="step-subtitle">ربط مفاهيم العمل بلغة واضحة يفهمها صاحب المشروع دون تفاصيل تقنية</div>
            </div>
          </div>

          <p>
            يحدد الـ <strong>Domain Model</strong> المفاهيم الأساسية لمجال العمل وعلاقاتها ببعضها بلغة يفهمها العميل وصاحب المشروع، مثل: <code>Student</code> و <code>Equipment</code> و <code>Equipment Category</code> و <code>Stock</code> و <code>Loan Request</code> و <code>Return & Inspection</code>.
          </p>

          <div class="callout warning">
            <div class="callout-header">
              <span class="callout-icon">⚠️</span>
              <span>انتبه جيداً: هذا المخطط مفاهيمي خالص (Pure Conceptual)</span>
            </div>
            <p>
              النموذج المفاهيمي <strong>لا يحتوي</strong> على مفاتيح أساسية أو أجنبية (PK/FK)، ولا أنواع بيانات SQL، ولا دوال برمجية (Methods). إنه يصف "عالم المشكلة" (Problem Space) وليس "عالم الكود وقاعدة البيانات" (Solution Space).
            </p>
          </div>
          <!-- PROMPT FOR DOMAIN MODEL -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">برومبت توليد Conceptual Domain Model (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code># Role
Act as a Senior Domain Analyst, Business Analyst, and Domain-Driven Design Expert.

# Context
Read:
- docs/PRD.md
- docs/user-flow.md
The PRD is the primary source of truth.

# Task
Create ONLY a Conceptual Domain Model for the MVP.
This is NOT a UML Class Diagram or Database ERD.

# Requirements
1. Identify the core business domain.
2. Extract the main business concepts.
3. Identify responsibilities of each concept.
4. Define relationships between concepts using business terminology.
5. Include domain boundaries when meaningful.
6. Show cardinality only when documented.
7. Identify business constraints.
8. Avoid duplicate or unnecessary concepts.
9. Do not invent business rules.

# Exclusions
Do not include: Classes or methods, Database tables or columns, Primary or Foreign Keys, SQL data types, API endpoints.

# Diagram Format
Generate valid Mermaid:
flowchart LR

# Deliverables
Create:
- docs/diagrams/domain-model.md
- docs/diagrams/domain-model.mmd</code></pre>
          </div>
        </div>

        <!-- 3. Diagram 3: Use Case Diagram -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">D2</span>
            <div class="step-title-wrap">
              <h3 class="step-title">المخطط 3: مخطط حالات الاستخدام (Use Case Diagram)</h3>
              <div class="step-subtitle">تحديد حدود النظام والممثلين (Actors) ووظائفهم وعلاقات include و extend</div>
            </div>
          </div>

          <p>
            يحدد الـ <strong>Use Case Diagram</strong> حدود النظام (System Boundary)، ومن هم المتفاعلون معه (Actors)، وما هي الوظائف المسموحة لكل دور. في مشروع BorrowHub لدينا دوران رئيسيان:
          </p>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li><strong>Student (الطالب):</strong> تصفح المعدات المتاحة، تقديم طلب استعارة، ومتابعة أو إلغاء الطلب المعلق.</li>
            <li><strong>Warehouse Admin (مسؤول المستودع):</strong> اعتماد حسابات الطلاب يدوياً، قبول أو رفض طلبات الاستعارة وتسليم المعدة، وتسجيل الإرجاع وفحص التلف.</li>
          </ul>

          <!-- PlantUML Code Box -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">كود PlantUML لمخطط حالات الاستخدام (Use Case Diagram)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ الكود">نسخ الكود</button>
            </div>
            <pre class="code-content"><code>@startuml
left to right direction
skinparam packageStyle rectangle
skinparam actorStyle awesome

actor "Student\\n(طالب معتمد)" as Student
actor "Warehouse Admin\\n(مسؤول المستودع)" as Admin

rectangle "BorrowHub System Boundary" {
  usecase "تصفح المعدات المتاحة" as UC_Browse
  usecase "تقديم طلب استعارة" as UC_Request
  usecase "متابعة / إلغاء طلب معلق" as UC_Track
  usecase "التحقق من الرصيد والحد الأقصى" as UC_Validate
  
  usecase "اعتماد حسابات الطلاب يدوياً" as UC_ApproveUser
  usecase "مراجعة واعتماد طلب الاستعارة" as UC_ReviewLoan
  usecase "تسليم المعدة وتفعيل الإعارة" as UC_Handover
  usecase "تسجيل الإرجاع وفحص التلف" as UC_Return
  usecase "تغريم أو توثيق الأضرار" as UC_Penalty
}

Student --> UC_Browse
Student --> UC_Request
Student --> UC_Track

UC_Request ..> UC_Validate : &lt;&lt;include&gt;&gt;
UC_Return &lt;.. UC_Penalty : &lt;&lt;extend&gt;&gt; (في حال وجود تلفيات)

Admin --> UC_ApproveUser
Admin --> UC_ReviewLoan
Admin --> UC_Handover
Admin --> UC_Return
@enduml</code></pre>
          </div>

          <!-- PROMPT FOR USE CASE -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">برومبت توليد Use Case Diagram بـ PlantUML (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code># Role
Act as a Senior Business Analyst and UML Use Case Modeling Expert.

# Context
Read:
- docs/PRD.md
- docs/user-flow.md
- docs/diagrams/domain-model.md
Use the PRD as the primary source of truth.

# Task
Generate ONLY a professional UML Use Case Diagram for the confirmed MVP.

# Step 1 — Analysis
Identify: Primary and secondary actors, Actor responsibilities and permissions, Main MVP use cases,
System boundary, Mandatory shared behavior (&lt;&lt;include&gt;&gt;), Optional or conditional behavior (&lt;&lt;extend&gt;&gt;).

# Step 2 — UML Design
Generate valid PlantUML using @startuml / left to right direction.
Deliverables in docs/diagrams/use-case.md and docs/diagrams/use-case.puml.</code></pre>
          </div>
        </div>

        <!-- 4. Diagram 4: Activity Diagram -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">D3</span>
            <div class="step-title-wrap">
              <h3 class="step-title">المخطط 4: مخطط سير العمليات (Activity Diagram)</h3>
              <div class="step-subtitle">تمثيل سير العمليات التجارية وتوزيع المسؤوليات عبر مسارات السباحة (Swimlanes)</div>
            </div>
          </div>

          <p>
            يمثل الـ <strong>Activity Diagram</strong> تسلسل الأنشطة التي تجري خلال العملية التجارية كاملة عبر جميع الأطراف: (تقديم الطلب &larr; التحقق التلقائي &larr; مراجعة المسؤول &larr; التسليم خلال 48 ساعة &larr; الإرجاع وفحص المعدة).
          </p>

          <div class="callout tip">
            <div class="callout-header">
              <span class="callout-icon">💡</span>
              <span>الفرق الهندسي بين Activity Diagram و User Flow</span>
            </div>
            <p>
              يختلف <strong>Activity Diagram</strong> عن <strong>User Flow</strong> في كونه يركز على <strong>منطق العملية وتوزيع المسؤوليات</strong> بين الطالب والنظام ومسؤول المستودع عبر ممرات السباحة (Swimlanes)، وليس مجرد تنقل المستخدم بين شاشات الواجهة.
            </p>
          </div>
          <!-- PROMPT FOR ACTIVITY DIAGRAM -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">برومبت توليد Activity Diagram بصيغة Mermaid (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code># Role
Act as a Senior Business Process Analyst, UML Expert, and System Designer.

# Context
Read: docs/PRD.md, docs/user-flow.md, docs/diagrams/use-case.md.

# Task
Create ONLY Activity-style Process Diagrams for the main MVP business workflows.

# Analysis
Identify: Main business processes, Actors and responsible parties, User actions, System actions,
Decision points, Business rules, Success paths, Failure and alternative paths, Relevant state changes.

# Diagram Requirements
Generate valid Mermaid flowcharts using: flowchart TD with subgraphs (Swimlanes).
Save in docs/diagrams/activity-diagram.md.</code></pre>
          </div>
        </div>

        <!-- 5. Diagram 5: Sequence Diagram -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">D4</span>
            <div class="step-title-wrap">
              <h3 class="step-title">المخطط 5: مخطط تسلسل التفاعلات (Sequence Diagram)</h3>
              <div class="step-subtitle">الترتيب الزمني الدقيق لتبادل الطلبات والردود بين مكونات النظام مع الشروط alt/else/end</div>
            </div>
          </div>

          <p>
            يركز الـ <strong>Sequence Diagram</strong> على الترتيب الزمني الدقيق لانتقال الرسائل والطلبات (<code>Requests &minus;&gt;&gt;</code>) والردود (<code>Responses --&gt;&gt;</code>) بين المستخدم ومكونات النظام: <code>Student (Actor) &rarr; Frontend UI &rarr; Backend Service &rarr; Database</code>.
          </p>
          <!-- PROMPT FOR SEQUENCE DIAGRAM -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">برومبت توليد Sequence Diagram بصيغة Mermaid (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code># Role
Act as a Senior Software Architect, UML Expert, and Business Analyst.

# Context
Read: docs/PRD.md, docs/user-flow.md, docs/diagrams/use-case.md, docs/ERD.md, docs/database.dbml.
The PRD is the primary source of truth.

# Task
Generate ONLY professional Sequence Diagrams for the major MVP use cases.

# Diagram Format
Use valid Mermaid: sequenceDiagram
Requirements:
- Use actor for users, participant for system components (Frontend, Backend, Database).
- Use -&gt;&gt; for synchronous requests and --&gt;&gt; for responses.
- Use alt / else / end for conditions.
- Show data reads and writes clearly.

# Deliverables
Create: docs/diagrams/sequence-diagrams.md and individual files in docs/diagrams/sequences/</code></pre>
          </div>
        </div>

        <!-- 6. Diagram 6: State Diagram -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">D5</span>
            <div class="step-title-wrap">
              <h3 class="step-title">المخطط 6: مخطط حالات الكائن (State Diagram)</h3>
              <div class="step-subtitle">رصد دورة حياة الكيان (طلب الاستعارة)، والأحداث، والشروط الحارسة (Guards)</div>
            </div>
          </div>

          <p>
            يرصد الـ <strong>State Diagram</strong> دورة حياة كيان محدد داخل النظام مثل <strong>طلب الاستعارة (Loan Request)</strong>، وما هي الأحداث (Events) والشروط الحارسة (Guards) التي تنقله من حالة إلى أخرى، ومن يملك صلاحية إحداث هذا الانتقال.
          </p>
          <!-- PROMPT FOR STATE DIAGRAM -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">برومبت توليد State Diagram بصيغة Mermaid (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code># Role
Act as a Senior Domain Analyst, UML State Machine Expert, and Business Analyst.

# Context
Read: docs/PRD.md, docs/user-flow.md, docs/diagrams/domain-model.md, docs/diagrams/use-case.md.

# Task
Generate ONLY professional State Diagrams for MVP domain entities with meaningful lifecycles.

# Diagram Requirements
Use valid Mermaid: stateDiagram-v2
- Clearly show states and transitions.
- Label transitions with triggering events and role guards.
- Include guards only when documented in PRD.
- Include terminal states [*].
- Do not invent undocumented statuses.

# Deliverables
Create: docs/diagrams/state-diagrams.md</code></pre>
          </div>
        </div>

        <!-- 7. Diagram 7: Class Diagram -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">D6</span>
            <div class="step-title-wrap">
              <h3 class="step-title">المخطط 7: التصميم البنيوي للكلاسات (Design-Level Class Diagram)</h3>
              <div class="step-subtitle">الكلاسات البرمجية، الخصائص، الدوال الموثقة، وعلاقات التعددية (Multiplicity)</div>
            </div>
          </div>

          <p>
            يمثل الـ <strong>Class Diagram</strong> الكلاسات البرمجية (Classes)، وخصائصها (Attributes)، وعملياتها الموثقة (Methods)، والعلاقات بينها مع التعددية (Multiplicity). في هذه المرحلة نصمم <strong>Design-Level Class Diagram</strong> مستقلاً عن أي إطار عمل (دون التقيد بـ Django أو Next.js قبل اعتماد التقنية).
          </p>
          <!-- PROMPT FOR CLASS DIAGRAM -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">برومبت توليد Class Diagram بصيغة Mermaid (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code># Role
Act as a Senior Software Architect, Object-Oriented Design Expert, and UML Specialist.

# Context
Read: docs/PRD.md, docs/diagrams/domain-model.md, docs/ERD.md, docs/database.dbml, docs/diagrams/sequence-diagrams.md.

# Task
Generate ONLY a professional design-level UML Class Diagram for the MVP.

# Diagram Format
Generate valid Mermaid: classDiagram
Requirements:
- Use clear class names and relevant attributes.
- Include methods only when supported by documented behavior.
- Show meaningful relationships and correct multiplicity (1 to 0..*).
- Keep the diagram consistent with the Domain Model and ERD.

# Deliverables
Create: docs/diagrams/class-diagram.md and docs/diagrams/class-diagram.mmd</code></pre>
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 8. Crucial Comparison: The Confusing Lenses -->
        <h3>الفروق الجوهرية والعدسات التي يختلط فيها المهندسون</h3>
        <p>
          كثير من الطلاب والمطورين يخلطون بين المخططات ويرسمون نفس الرسمة بثلاثة أسماء مختلفة. إليك الفاصل المعماري الصارم بينها:
        </p>

        <div class="grid-2col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">
              الفرق بين: User Flow و Activity و Sequence
            </h4>
            <ul style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.8; margin-right: 1.2rem;">
              <li><strong>User Flow:</strong> يركز على <strong>رحلة المستخدم وشاشات الواجهة</strong> ونقاط اتخاذ القرار أثناء التصفح.</li>
              <li><strong>Activity Diagram:</strong> يركز على <strong>خطوات العملية وتوزيع المسؤوليات</strong> بين الطالب والنظام ومسؤول المستودع.</li>
              <li><strong>Sequence Diagram:</strong> يركز على <strong>التبادل الزمني للرسائل</strong> البرمجية بين مكونات النظام (UI, API, DB).</li>
            </ul>
          </div>

          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">
              الفرق بين: Domain Model و ERD و Class Diagram
            </h4>
            <ul style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.8; margin-right: 1.2rem;">
              <li><strong>Domain Model:</strong> يشرح <strong>مفاهيم العمل</strong> بلغة يفهمها صاحب المشروع دون تفاصيل تقنية أو جداول.</li>
              <li><strong>ERD (قاعدة البيانات):</strong> يمثل <strong>تصميم وتخزين الجداول</strong> بمفاتيح أساسية وخارجية وأنواع بيانات وقيود.</li>
              <li><strong>Class Diagram:</strong> يمثل <strong>الكلاسات والعمليات البرمجية (Methods)</strong> المنطقية داخل كود التطبيق.</li>
            </ul>
          </div>
        </div>

      </section>

<section class="supplemental-content"><span class="supplemental-label">إثراء مقترح — من إعداد الموقع</span><h3>قاعدة رسم User Flow قابل للمراجعة</h3><p>كل عقدة في الرسم يجب أن تكون فعلًا أو قرارًا يمكن ربطه بمتطلب. إذا لم تعرف مصدر العقدة داخل PRD، أضفها إلى قائمة المراجعة بدل إبقائها في الرسم.</p><div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">SUPPLEMENTAL PROMPT — Flow Audit</span><button class="copy-btn" type="button" aria-label="نسخ برومبت تدقيق User Flow">نسخ</button></div><pre class="code-content"><code>Audit the User Flow against the PRD.
For every node, report: node label, supporting requirement, actor, success/error outcome.
Flag any node with no evidence. Do not redraw the flow or invent missing behavior.</code></pre></div></section>
`;
