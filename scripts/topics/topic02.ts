export const topic02Html = `
      <!-- ==================== TOPIC 02: REQUIREMENTS ENGINEERING ==================== -->
      <section id="topic-02" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 02</span>
          <span class="step-pill">هندسة المتطلبات واستنطاق الفكرة</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">استجواب الفكرة (Grill Me) وصياغة وثيقة متطلبات المنتج (PRD.md) ومراجعتها نقدياً</h2>
            <div class="step-subtitle">استخراج التفاصيل والقرارات الحاسمة قبل الحلول لمنع الثغرات المعمارية مبكراً</div>
          </div>
        </div>

        <!-- 1. Grill Me Philosophy -->
        <h3>1. مرحلة الاستجواب (Grill Me) — استخراج التفاصيل قبل الحلول</h3>
        <p>
          أسلوب <strong>Grill Me</strong> هو مقابلة استجواب متدرجة يقوم بها وكيل الذكاء الاصطناعي مع صاحب الفكرة. بدلاً من أن يبدأ الوكيل فوراً بإنشاء الشاشات أو كتابة الكود، يلعب دور مدير منتج أول وخبير تحليل أعمال (Senior PM & BA)، فيسألك <strong>سؤالاً واحداً فقط في كل مرة</strong>، وينتظر إجابتك، ثم ينتقل للسؤال التالي بناءً على ردك:
        </p>

        <div class="callout note">
          <div class="callout-header">
            <span class="callout-icon">📌</span>
            <span>قواعد المقابلة الصارمة ومبدأ الأسئلة المفتوحة (Open Questions)</span>
          </div>
          <p>
            إذا كان جوابك عاماً، يطلب منك الوكيل توضيحاً تفصيلياً؛ وإذا ظهرت حالات استثنائية (Edge Cases)، يثيرها ويطلب حسمها فوراً قبل التنفيذ.
            <br>
            <strong>القاعدة الذهبية:</strong> أي نقطة لم تحسمها بعد، <strong>لا تخترع لها قاعدة من خيالك</strong>، بل سجلها صراحة كسؤال مفتوح (<code>Open Question</code>) حتى تعود لصاحب القرار وتفصل فيها رسمياً.
          </p>
        </div>

        <!-- PROMPT 01: GRILL ME -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">PROMPT 01 — بدء مقابلة Grill Me الاستجوابية (Antigravity CLI / Cursor)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
          </div>
          <pre class="code-content"><code>/grill-me

I want to build a web application called [ضع هنا اسم المشروع، مثلاً: BorrowHub]
[ضع هنا شرحاً مبسطاً في سطرين عن فكرة النظام والمستفيدين منه]

Act as a Senior Product Manager and Business Analyst.
Your task is to interview me using the Grill Me approach to create a complete, practical PRD.

Rules:
1. Ask me ONE question at a time.
2. Wait for my answer before asking the next question.
3. Challenge unclear requirements and assumptions.
4. Ask about users, features, borrowing rules, permissions, edge cases, and error states.
5. Help me define a realistic MVP.
6. Do not invent business requirements.
7. Do not generate code.
8. Communicate with me in Arabic.
9. Continue until all important requirements are clear.

After the interview, generate a professional PRD.md containing product overview, goals, target users,
user stories, MVP scope, functional and non-functional requirements, business rules, user flows, roles and
permissions, edge cases, acceptance criteria, and open questions.

Start by asking me the first question.</code></pre>
        </div>

        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">🎯</span>
            <span>ماذا تتوقع بعد تشغيل البرومبت؟ ومتى ننتقل للمرحلة التالية؟</span>
          </div>
          <p>
            لا تتوقع أن ينشئ التطبيق؛ المطلوب منه أن يبدأ بسؤال منطقي أولي، مثل: <em>«من هم المستخدمون؟ وما هي أهدافهم الرئيسية؟»</em>. فتجيب مثلاً: <em>«طالب جامعي ومسؤول مستودع»</em>، فيسألك بعدها: <em>«هل يوافق المسؤول على كل طلب؟ وما أقصى مهلة للاستلام؟»</em>.
          </p>
          <p>
            <strong>معيار الانتقال:</strong> ننتقل عندما تصبح أهداف المنتج، والأدوار، وقواعد الـ MVP، والعمليات الأساسية، والحالات الاستثنائية واضحة وموثقة بما يكفي لكتابة متطلبات قابلة للاختبار المعماري.
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 2. PRD Document Writing -->
        <h3>2. كتابة وثيقة متطلبات المنتج (PRD.md)</h3>
        <p>
          وثيقة <strong>PRD (Product Requirements Document)</strong> هي عقد العمل التأسيسي الذي يحوّل إجابات المقابلة إلى مرجع هندسي ملزم. إنها لا تتحدث فقط عن شكل التطبيق، بل توضح: <em>من يستخدمه؟ وما الذي يجب أن يفعله؟ ولماذا؟ وكيف نتحقق هندسياً أنه يعمل كما ينبغي؟</em>
        </p>

        <!-- Acceptance Criteria Example -->
        <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin: 1rem 0;">
          <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">
            صياغة معايير القبول القابلة للاختبار (Acceptance Criteria: Given / When / Then)
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.8;">
            بدلاً من كتابة متطلب مبهم مثل: <em>«زر الاستعارة يعمل»</em>، نكتبه في وثيقة PRD بصيغة هندسية صارمة:
          </p>
          <div style="background: var(--bg-surface); padding: 0.85rem 1.25rem; border-right: 4px solid var(--brand-primary); border-radius: 4px; font-family: var(--font-sans); font-size: 0.92rem; margin-top: 0.5rem;">
            <strong>Given:</strong> طالب مسجل دخوله بحساب معتمد، ومعدة جامعية متاحة وفق القواعد المعتمدة.<br>
            <strong>When:</strong> يرسل الطالب طلب استعارة مكتملاً للبيانات ولم يتجاوز حد الإعارة الأقصى (طلبين نشطين ومدة &le; 10 أيام).<br>
            <strong>Then:</strong> ينشئ النظام طلباً جديداً بحالة <code>Pending Review</code>، ويحجز وحدة المعدة مبدئياً، ويعرض للطالب إشعار التأكيد مع رقم التتبع.
          </div>
        </div>

        <!-- PROMPT 02: PRD GENERATION -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">PROMPT 02 — إنشاء وثيقة PRD.md الاحترافية ذات الـ 27 قسماً (Antigravity CLI / Cursor)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
          </div>
          <pre class="code-content"><code>Context
You are an experienced Senior Product Manager and Business Analyst specializing in SaaS and web applications.
We have just completed a detailed requirements discovery interview using the Grill Me Skill.
Your task is to transform everything discussed during our Grill Me interview into a complete,
professional, implementation-ready Product Requirements Document (PRD).

Product Information
Extract from our conversation: Product Name, Product Idea, Problem to Solve, Target Users, Business Goal,
Main Features, Preferred Tech Stack, Competitors/References, Business Rules, User Roles, Constraints and Decisions.

Important: Use our actual interview answers as the primary source of truth. Do not replace them with generic assumptions.

Task & Constraints
Create a complete and practical PRD in "docs/PRD.md" (in Professional English) using 27 sections:
1. Product Overview | 2. Problem Statement | 3. Product Goals | 4. Non-Goals | 5. Target Users | 6. User Personas
7. User Needs | 8. User Stories | 9. MVP Scope | 10. Core Features | 11. Functional Requirements (FR-xxx)
12. Non-Functional Requirements (NFR-xxx) | 13. User Flows | 14. Pages / Screens | 15. Roles & Permissions
16. Data Requirements | 17. Integrations | 18. Edge Cases | 19. Error States | 20. Security & Privacy
21. Analytics & Tracking | 22. Success Metrics / KPIs | 23. Acceptance Criteria (Given/When/Then)
24. Future Features | 25. Risks & Dependencies | 26. Open Questions | 27. Recommended Development Phases.

Assign unique IDs (FR-001, NFR-001, BR-001). Do not silently resolve unanswered questions.
Do not generate code, ERD, or UI designs yet. Save output directly to docs/PRD.md.</code></pre>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 3. PRD Review -->
        <h3>3. مرحلة المراجعة النقدية للوثيقة (PRD Review)</h3>
        <p>
          <strong>لماذا نراجع وثيقة PRD إذا كتبها الذكاء الاصطناعي؟</strong>
          لأن الذكاء الاصطناعي قد يكتب متطلبات تبدو مقنعة وبراقة للوهلة الأولى، لكنها <strong>متناقضة في جوهرها</strong>. فقد يذكر في قسم أن: <em>«الموافقة إلزامية من المسؤول قبل استلام المعدة»</em>، ثم يذكر في قسم الواجهات أن: <em>«الطالب يستلم المعدة فور الضغط على زر الاستعارة!»</em>. هذا التناقض إن لم يُكتشف مبكراً، فسيتحول إلى كوارث برمجية حين يبني كل مطور فهمه الخاص.
        </p>

        <!-- Review Issues Table -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>المشكلة المكتشفة</th>
                <th>درجة الخطورة</th>
                <th>لماذا تعد مشكلة معمارية؟</th>
                <th>الإجراء الهندسي المطلوب</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>هل يمكن إلغاء الطلب بعد تجهيزه؟</strong></td>
                <td><span class="status-badge" style="background:#fee2e2; color:#b91c1c;">مرتفعة</span></td>
                <td>تؤثر على رحلة الطالب، وإشغال المخزون، ودورة عمل مسؤول المستودع.</td>
                <td>حسم سياسة الإلغاء ومن يملك صلاحية اتخاذ القرار في الـ PRD.</td>
              </tr>
              <tr>
                <td><strong>الحالة الافتراضية للطلب غير محددة</strong></td>
                <td><span class="status-badge" style="background:#fef3c7; color:#92400e;">متوسطة</span></td>
                <td>الواجهة الأمامية وقاعدة البيانات قد تفترضان حالات مختلفة (Draft vs Pending).</td>
                <td>الاتفاق على جدول حالات الكيان (State Machine) قبل رسم الجداول.</td>
              </tr>
              <tr>
                <td><strong>سلوك النظام عند انقطاع الاتصال</strong></td>
                <td><span class="status-badge" style="background:#e0f2fe; color:#0369a1;">متوسطة</span></td>
                <td>خطر تكرار إنشاء الطلب عند ضغط المستخدم المتكرر.</td>
                <td>إضافة متطلب Idempotency ومعالجة حالات الخطأ الصريحة.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PROMPT 03: PRD REVIEW -->
        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">PROMPT 03 — المراجعة النقدية لوثيقة PRD.md (Antigravity CLI / Cursor)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
          </div>
          <pre class="code-content"><code>Act as a Senior Business Analyst and Product Manager.
Review the following PRD in docs/PRD.md critically:

1. Identify unclear or missing requirements.
2. Detect contradictions between features and rules.
3. Find unnecessary MVP features that should be deferred.
4. Identify missing edge cases and error states.
5. Check whether acceptance criteria are strictly testable.
6. Separate assumptions from confirmed requirements.
7. Suggest improvements without changing the product vision.

Output a table: Issue | Severity | PRD Section | Explanation | Recommended Fix
Do not rewrite the entire PRD. Ask clarifying questions for critical missing decisions.</code></pre>
        </div>

      </section>

<section class="supplemental-content"><span class="supplemental-label">إثراء مقترح — من إعداد الموقع</span><h3>سجل القرار بعد Grill Me</h3><p>بعد كل إجابة مهمة، سجّل القرار والسبب وما بقي مفتوحًا. هذا السجل يمنع تحول كلام المحادثة إلى قاعدة غير موثقة.</p><div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">SUPPLEMENTAL PROMPT — Decision Log</span><button class="copy-btn" type="button" aria-label="نسخ برومبت سجل القرار">نسخ</button></div><pre class="code-content"><code>Using only the confirmed answers in this interview, create a decision log with:
Question | Confirmed Answer | Product Decision | Evidence | Open Question.
Do not resolve an open question yourself.</code></pre></div></section>
`;
