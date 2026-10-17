export const topic03Html = `
      <!-- ==================== TOPIC 03: USER FLOW MODELING ==================== -->
      <section id="topic-03" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 03</span>
          <span class="step-pill">نمذجة مسارات وتجربة المستخدم</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">مخطط مسار المستخدم (User Flow Diagram) ونمذجة نقاط القرار</h2>
            <div class="step-subtitle">تتبع خطوات المستخدم، وقرارات النجاح والفشل، ومسارات الحالات الاستثنائية</div>
          </div>
        </div>

        <!-- 1. The Engineering Concept -->
        <h3>الوظيفة والفكرة الهندسية لمسار المستخدم (User Flow)</h3>
        <p>
          يوضح مخطط الـ <strong>User Flow</strong> كيف ينتقل المستخدم خطوة بخطوة منذ لحظة دخوله للنظام وحتى إتمام هدفه (مثل استعارة المعدة)، وما هي نقاط القرار (Decision Points) وحالات النجاح أو الفشل التي تصادفه في الطريق.
        </p>

        <div class="callout note">
          <div class="callout-header">
            <span class="callout-icon">⚖️</span>
            <span>ما الفرق الجوهري بين PRD و User Flow؟</span>
          </div>
          <p>
            إذا كانت وثيقة <strong>PRD</strong> تجيب عن سؤال: <em>«ما هي الشروط والمتطلبات؟»</em>، فإن مخطط <strong>User Flow</strong> يجيب عن سؤال: <em>«متى وأين يواجه المستخدم هذه الشروط أثناء تصفحه وتفاعله مع النظام؟»</em>.
            <br>
            يمكن أن تكون كل المتطلبات مكتوبة في PRD، ومع ذلك لا نفهم ماذا يظهر للمستخدم عند فشل خطوة معينة! هنا يأتي المخطط ليكشف الرحلة الكاملة.
          </p>
        </div>

        <!-- PROMPT 04: USER FLOW -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">PROMPT 04 — توليد User Flow Diagram بصيغة Mermaid (Antigravity CLI / Cursor)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
          </div>
          <pre class="code-content"><code># Role
Act as a Senior UX Designer, Business Analyst, and User Flow Architect.

# Context
Read:
- docs/PRD.md
Use the PRD as the single source of truth.

# Task
Create professional User Flow diagrams for the main MVP user journeys.

# Requirements
1. Identify actors and user goals.
2. Define entry and exit points.
3. Show user actions and system responses.
4. Include decision points with explicit Yes/No branches.
5. Include success, failure, and alternative paths.
6. Include relevant validations and business rules directly on edges/nodes.
7. Cover only the confirmed MVP scope.
8. Do not invent functionality or business rules.
9. Flag unclear requirements as open questions.

# Diagram Format
Generate valid Mermaid flowcharts using:
flowchart TD
Use rectangles for actions and diamonds for decisions.
Create separate flows when combining journeys would make the diagram difficult to read.

# Deliverables
Create:
- docs/user-flow.md
Include Mermaid code, Arabic explanations, related PRD requirements, and open questions.
Validate Mermaid syntax strictly. Do not generate application code, ERD, or other UML diagrams.</code></pre>
        </div>

        <!-- Verification Checklist -->
        <div class="checklist-card" data-step="topic-03-flow">
          <div class="checklist-header">
            <span class="checklist-title">قائمة التدقيق المعماري لمخطط مسار المستخدم (User Flow Checklist)</span>
            <span class="checklist-counter" id="counter-topic-03-flow">0 / 4 مكتمل</span>
          </div>
          <ul class="checklist-items">
            <li class="checklist-item">
              <input type="checkbox" id="chk-flow-1" onchange="updateChecklist('topic-03-flow')">
              <label for="chk-flow-1"><strong>وضوح المخرج لكل قرار:</strong> يوجد مسار واضح ومعنون بالكامل لكل خيار نعم/لا في جميع المعينات.</label>
            </li>
            <li class="checklist-item">
              <input type="checkbox" id="chk-flow-2" onchange="updateChecklist('topic-03-flow')">
              <label for="chk-flow-2"><strong>معالجة مسارات الرفض والفشل:</strong> يشرح المخطط بدقة ما يحدث للمستخدم وللمخزون عند رفض الطلب أو انتهاء المهلة.</label>
            </li>
            <li class="checklist-item">
              <input type="checkbox" id="chk-flow-3" onchange="updateChecklist('topic-03-flow')">
              <label for="chk-flow-3"><strong>صلاحيات التنفيذ:</strong> كل خطوة مسندة لدور محدد يمتلك الصلاحية الهندسية لتنفيذها وفق وثيقة PRD.</label>
            </li>
            <li class="checklist-item">
              <input type="checkbox" id="chk-flow-4" onchange="updateChecklist('topic-03-flow')">
              <label for="chk-flow-4"><strong>عدم اختراع قرارات غير محسومة:</strong> أي شرط غير موثق في PRD وُضع كسؤال مفتوح ولم يُرسم من الخيال.</label>
            </li>
          </ul>
        </div>

      </section>
`;
