import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 02: GRILL ME (استجواب الفكرة واستكشاف المتطلبات)
 * ========================================================================= */
export const topic02GrillMeHtml = `
<section id="topic-w2-02-grill-me" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 02</span>
    <span class="step-pill">استكشاف المتطلبات وهندسة المنتج</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">استجواب الفكرة (Grill Me) واستنطاق المتطلبات</h2>
      <div class="step-subtitle">طرح سؤال واحد في كل مرة، وتحدي الغموض، وحسم نطاق MVP وفصل القرارات عن الافتراضات</div>
    </div>
  </div>

  <!-- 1. Grill Me Philosophy -->
  <h3>1. فلسفة المقابلة الاستجوابية (Grill Me) — إغلاق باب البرمجة التخمينية</h3>
  <p>
    المعضلة الكبرى في تطوير التطبيقات بمساعدة الذكاء الاصطناعي هي <strong>البرمجة التخمينية (Vibe Coding)</strong>؛ حيث يقدم المطور فكرة عامة ومبهمة، فيبادر النموذج باختراع قواعد عمل، وشاشات، وجداول بيانات معقدة لم يطلبها أحد. النتيجة الحتمية هي منتج متضخم مليء بالثغرات المعمارية والتناقضات.
  </p>
  <p>
    أسلوب <strong>Grill Me</strong> يقلب المعادلة بالكامل: بدلاً من أن تطلب من الذكاء الاصطناعي التوليد المباشر، تطلب منه أن يلعب دور <strong>مدير منتج أول وخبير تحليل أعمال (Senior PM &amp; Business Analyst)</strong> يستجوبك أنت! يقودك النموذج في مقابلة حازمة ومنهجية تطرح <strong>سؤالاً واحداً فقط في كل مرة</strong>، وينتظر إجابتك، ثم يبني سؤاله التالي بناءً على ما حسمته.
  </p>

  <div class="callout note">
    <div class="callout-header">
      <span class="callout-icon">📌</span>
      <span>القاعدة الذهبية: التحليل يسبق الأدوات ولا يشترط تثبيت أي بيئة تنفيذية</span>
    </div>
    <p>
      مرحلة استكشاف المتطلبات (Grill Me وPRD وSRS) <strong>لا تتطلب تثبيت وكلاء برمجة (AI Coding Agents)، أو مهارات برمجية (Skills)، أو بروتوكولات أدوات (MCP)</strong>. هذه الأدوات مكانها الطبيعي يبدأ لاحقاً عند الشروع في كود الواجهة الأمامية بعد اعتماد التصميم والمخططات. يمكنك إنجاز المقابلة بالكامل داخل أي نافذة محادثة ذكاء اصطناعي عادية أو في محرر نصوص بسيط، وتدوين القرارات يدوياً في مشروعك.
    </p>
  </div>

  <!-- 2. Interview Rules & Distinctions -->
  <h3>2. ضوابط المقابلة وتثبيت القرارات: ثلاثة مستويات للمعلومات</h3>
  <p>
    خلال جلسة Grill Me، ستمر بتدفق مستمر من الأسئلة. لضمان عدم تحول كلام الدردشة إلى قواعد غير منضبطة، يجب فرز كل إجابة في أحد ثلاثة مسارات صارمة:
  </p>

  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>المستوى</th>
          <th>التعريف الهندسي</th>
          <th>المصدر الإلزامي</th>
          <th>كيف يُعامل في المشروع؟</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>قرارات معتمدة (Confirmed Decisions)</strong></td>
          <td>خيار واضح وحاسم حدده صاحب المشروع استجابةً لسؤال محدد.</td>
          <td>إجابة صريحة من الطالب أثناء المقابلة.</td>
          <td>يتحول مباشرة إلى متطلب وظيفي أو قاعدة عمل ملزمة (Single Source of Truth).</td>
        </tr>
        <tr>
          <td><strong>افتراضات مقترحة (Assumptions)</strong></td>
          <td>توصية أو حل مقترح من الذكاء الاصطناعي لتسهيل التجربة دون حسم نهائي.</td>
          <td>اقتراح أو بديل لم يعتمده صاحب المشروع رسمياً بعد.</td>
          <td>يُعزل في قسم مستقل ويظل معلقاً حتى يؤكده الطالب؛ يمنع فرضه كقاعدة عمل.</td>
        </tr>
        <tr>
          <td><strong>أسئلة مفتوحة (Open Questions)</strong></td>
          <td>نقطة خلافية أو حالة حدية لم تتوفر معلومات كافية للإجابة عنها فوراً.</td>
          <td>حدود نظام غير محسومة (مثل: سياسة التعويض عند تلف المعدة).</td>
          <td>تُسجل صراحة في قائمة الأسئلة المفتوحة، ويُمنع منعاً باتاً اختراع حل خيالي لها.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PROMPT 01: GRILL ME -->
  <div class="code-container">
    <div class="code-header">
      <span class="code-lang">PROMPT 01 — Grill Me: Product Discovery (المعتمد في مكتبة البرومبتات)</span>
      <button class="copy-btn" type="button" title="نسخ البرومبت">نسخ البرومبت</button>
    </div>
    <pre class="code-content"><code>/grill-me
Act as a Senior Product Manager and Business Analyst.
I want to discover the requirements for my web application.
Interview me in Arabic, ONE question at a time. Wait for my answer.
Explore: problem, users, goals, roles, MVP, features, business rules,
permissions, exceptions, constraints, acceptance criteria, and open questions.
Challenge ambiguous answers. Offer options with trade-offs when needed.
Record confirmed decisions separately from assumptions and recommendations.
Do not invent business rules or write code.
Continue until critical product decisions are clear.
Start with the first question only.</code></pre>
  </div>

  <!-- 3. Real Example: BorrowHub Discovery -->
  <h3>3. مثال توضيحي من واقع مشروع BorrowHub</h3>
  <p>
    في دراسة حالة نظام <strong>BorrowHub</strong> (نظام استعارة المعدات الجامعية المرجعي)، بدأت المقابلة بالسؤال الأول:
    <em>«من الفئات المستهدفة للنظام؟ وما صلاحيات كل فئة؟»</em>.
  </p>
  <p>
    كانت الإجابة الأولية: <em>«الطلاب وموظفو الجامعة»</em>. فوراً تحدى المحلل (Grill Me) هذا الغموض بسؤال تعقيبي:
    <em>«هل كل الطلاب يملكون الأهلية ذاتها للاستعارة؟ وماذا عن مسؤول المستودع (Staff)؟ هل يوافق الموظف يدويًا على كل طلب أم أن الحجز فوري؟»</em>.
    هنا تم حسم القرار المعتمد:
  </p>
  <ul>
    <li><strong>قرار معتمد:</strong> يوجد دوران فقط في MVP: <code>Student</code> (يقدم الطلب) و<code>Staff</code> (يراجع ويعتمد ويسلم ويستلم). الحجز ليس فورياً، بل يتطلب مراجعة مسؤول المستودع.</li>
    <li><strong>قاعدة عمل محددة:</strong> الحد الأقصى للطالب هو استعارة معدتين نشطتين فقط في الوقت نفسه لمدة لا تتجاوز 10 أيام.</li>
    <li><strong>سؤال مفتوح (Open Question):</strong> كيف نتعامل مع تأخر الطالب عن الإرجاع؟ هل تُفرض غرامة مالية أم يُعلّق الحساب تلقائياً؟ (قُيدت كسؤال مفتوح ولم يُخترع لها نظام دفع افتراضي).</li>
  </ul>

  <!-- 4. Deliverable: Decisions Log -->
  <h3>4. مخرج المقابلة: سجل القرارات والأسئلة المفتوحة</h3>
  <p>
    بنهاية جلسة الاستجواب، لا ننتقل فوراً لكتابة الكود ولا نصمم الشاشات، بل ننشئ ملف <code>docs/DECISIONS_LOG.md</code> ليكون القاعدة التي ستُبنى عليها وثيقة PRD لاحقاً.
  </p>

  <div class="code-container" dir="ltr">
    <div class="code-header">
      <span class="code-lang">Markdown — docs/DECISIONS_LOG.md (Template)</span>
      <button class="copy-btn" type="button" title="نسخ النموذج">نسخ</button>
    </div>
    <pre class="code-content"><code># سجل القرارات واستكشاف المتطلبات (Decisions Log)

## 1. بيان المشكلة والمستخدمين المستهدفين
الحالة: مثال سجل مقابلة تعليمي، وليس محضر مقابلة فعلية أو PRD معتمدًا. قواعد المصدر تراجع مقابل PRD قبل التنفيذ.
- **صياغة تعليمية تحتاج تحققًا:** يحتاج الطالب إلى طلب معدات ومتابعة حالتها ويحتاج المسؤول إلى تتبع الطلب والتسليم والإرجاع. لا توجد هنا مقابلات تثبت فقدان أدوات أو تضارب مواعيد.
- **الأدوار المعتمدة:** طالب (Borrower)، مسؤول المستودع (Custodian / Staff).

## 2. نطاق النسخة التجريبية الأولى (MVP Scope)
- **ميزات مؤكدة:** استعراض الكتالوج، طلب استعارة، اعتماد/رفض الطلب، تسجيل التسليم والإرجاع.
- **ميزات مؤجلة (Non-Goals):** نظام الدفع الإلكتروني، الإشعارات عبر SMS، التقييم والمراجعات.

## 3. قواعد العمل الحاسمة (Business Rules)
- BR-01: أقصى حد للطلبات النشطة لكل مستخدم هو طلبان متزامنان.
- BR-02: مدة الاستعارة القصوى 10 أيام تقويمية.

## 4. قائمة الأسئلة المفتوحة (Open Questions)
- OQ-01: المصدر يحدد اعتماد الحساب يدويًا؛ من يملك الاعتماد وما خطواته في PRD المعتمد؟ لا نستبدله باعتماد البريد تلقائيًا.
- OQ-02: المصدر يحدد تسجيل المسؤول التلف وعدم إعادة الوحدة إلى المتاح؛ ما تفاصيل الفحص والتوثيق في PRD المعتمد؟</code></pre>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 03: PRD (وثيقة متطلبات المنتج بالأقسام الـ27 ومراجعتها)
 * ========================================================================= */
export const topic03PrdHtml = `
<section id="topic-w2-03-prd" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 03</span>
    <span class="step-pill">توثيق وهندسة المتطلبات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها النقدية</h2>
      <div class="step-subtitle">البنية المرجعية الكاملة، عزل المؤكد عن الافتراض، والمراجعة الصارمة لمنع الثغرات والتناقضات</div>
    </div>
  </div>

  <!-- 1. PRD Core Role -->
  <h3>1. ما هي وثيقة PRD وما وظيفتها الهندسية؟</h3>
  <p>
    وثيقة <strong>PRD (Product Requirements Document)</strong> هي العقد الهندسي والتأسيسي الأهم في دورة حياة المشروع. إنها تجيب بدقة وشمول عن ثلاثة أسئلة جوهرية: <strong>ماذا نبني؟ ولماذا نبنيه؟ ولمن نبنيه؟</strong>
  </p>
  <p>
    لا تحتوي وثيقة PRD على أسطر كود برمجية، ولا على نماذج شاشات مرسومة، ولا على استعلامات قواعد بيانات؛ بل تحدد القيمة المطلوبة، والشروط الوظيفية، والقيود غير الوظيفية، وقواعد العمل، ومصفوفة الصلاحيات، ومعايير القبول. 
    تُبنى الوثيقة <strong>حصرياً</strong> على إجابات مقابلة Grill Me وسجل القرارات المعتمد (<code>docs/DECISIONS_LOG.md</code>)، وتعد المرجع الوحيد المعتمد (Single Source of Truth) لكافة الخطوات اللاحقة من مخططات وتصميم وكود.
  </p>

  <!-- 2. The 27 Reference Sections -->
  <h3>2. البنية المرجعية لوثيقة PRD — الأقسام الـ 27 المعتمدة</h3>
  <p>
    لضمان عدم سقوط أي جانب معماري أو تشغيلي سهواً، يعتمد المنهج هيكلية مرجعية صارمة تتألف من <strong>27 قسماً مترابطاً</strong>:
  </p>

  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>القسم (باللغة الإنجليزية)</th>
          <th>الاسم بالعربية</th>
          <th>الوظيفة والمخرج المتوقع داخل الوثيقة</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td><strong>Product Overview</strong></td><td>نظرة عامة على المنتج</td><td>ملخص تنفيذي يوضح هوية النظام والفكرة المحورية في فقرة واحدة مركزة.</td></tr>
        <tr><td>2</td><td><strong>Problem Statement</strong></td><td>بيان المشكلة</td><td>وصف المشكلة الواقعية الحقيقية وتأثيرها على المستفيدين وأسباب فشل الطرق اليدوية.</td></tr>
        <tr><td>3</td><td><strong>Product Goals</strong></td><td>أهداف المنتج</td><td>الأهداف الإستراتيجية والعملية القابلة للتحقق التي يسعى النظام لتحقيقها.</td></tr>
        <tr><td>4</td><td><strong>Non-Goals</strong></td><td>ما ليس هدفاً للمنتج</td><td>الميزات والمسارات المستبعدة صراحة لمنع تضخم النطاق (Scope Creep).</td></tr>
        <tr><td>5</td><td><strong>Target Users</strong></td><td>المستخدمون المستهدفون</td><td>فئات المستفيدين الرئيسية وخصائصهم ومواقع استخدامهم للنظام.</td></tr>
        <tr><td>6</td><td><strong>User Personas</strong></td><td>شخصيات المستخدمين</td><td>نماذج تمثيلية لسلوك ودوافع وتحديات كل فئة من فئات المستخدمين.</td></tr>
        <tr><td>7</td><td><strong>User Needs</strong></td><td>احتياجات المستخدمين</td><td>قائمة الاحتياجات الفعلية ونقاط الألم (Pain Points) التي يحلها التطبيق.</td></tr>
        <tr><td>8</td><td><strong>User Stories</strong></td><td>قصص المستخدمين</td><td>صياغة سلوكية بصيغة: «بصفتي [دور] أريد [إجراء] لكي [أحقق قيمة]».</td></tr>
        <tr><td>9</td><td><strong>MVP Scope</strong></td><td>نطاق النسخة الأولى</td><td>الحد الأدنى القابل للإطلاق لاختبار الفرضية والقيمة الأساسية للنظام.</td></tr>
        <tr><td>10</td><td><strong>Core Features</strong></td><td>الميزات الأساسية</td><td>قائمة الميزات الحيوية التي لا يمكن للتطبيق العمل بدونها في النسخة الأولى.</td></tr>
        <tr><td>11</td><td><strong>Functional Requirements</strong></td><td>المتطلبات الوظيفية</td><td>المتطلبات الإلزامية مرقمة بمعرفات فريدة (FR-001, FR-002) وتفصيل سلوكها.</td></tr>
        <tr><td>12</td><td><strong>Non-Functional Requirements</strong></td><td>المتطلبات غير الوظيفية</td><td>معايير الأداء، التوفر، زمن الاستجابة، وقابلية التوسع (NFR-001, NFR-002).</td></tr>
        <tr><td>13</td><td><strong>User Flows</strong></td><td>مسارات المستخدمين</td><td>تحديد نقطة البداية والنهاية ومسار التفاعل لكل رحلة رئيسية في النظام.</td></tr>
        <tr><td>14</td><td><strong>Pages / Screens</strong></td><td>حصر الشاشات والصفحات</td><td>قائمة أولية بالشاشات المستقلة والصفحات اللازمة لتحقيق قصص المستخدمين.</td></tr>
        <tr><td>15</td><td><strong>Roles &amp; Permissions</strong></td><td>الأدوار والصلاحيات</td><td>مصفوفة الصلاحيات توضح بدقة ما يحق لكل دور القيام به وما يُمنع منه.</td></tr>
        <tr><td>16</td><td><strong>Data Requirements</strong></td><td>متطلبات البيانات</td><td>الكيانات الرئيسية (Entities) والحقول الضرورية والبيانات المشتركة.</td></tr>
        <tr><td>17</td><td><strong>Integrations</strong></td><td>التكاملات الخارجية</td><td>أي واجهات برمجية أو خدمات طرف ثالث يعتمد عليها النظام.</td></tr>
        <tr><td>18</td><td><strong>Edge Cases</strong></td><td>الحالات الحدية والاستثنائية</td><td>السلوك المتوقع في الحالات النادرة والظروف غير المعتادة.</td></tr>
        <tr><td>19</td><td><strong>Error States</strong></td><td>حالات وأخطاء النظام</td><td>طريقة استجابة النظام وتنبيه المستخدم عند حدوث أخطاء إدخال أو معالجة.</td></tr>
        <tr><td>20</td><td><strong>Security &amp; Privacy Requirements</strong></td><td>متطلبات الأمان والخصوصية</td><td>سياسات حماية البيانات، تشفير كلمات المرور، والامتثال للخصوصية.</td></tr>
        <tr><td>21</td><td><strong>Analytics &amp; Tracking</strong></td><td>التحليلات والمتابعة</td><td>الأحداث (Events) والمؤشرات التي يراد تتبعها لفهم سلوك الاستخدام.</td></tr>
        <tr><td>22</td><td><strong>Success Metrics / KPIs</strong></td><td>مؤشرات النجاح</td><td>الأرقام والمعايير الكمية التي تحدد ما إذا كان الإطلاق ناجحاً أم لا.</td></tr>
        <tr><td>23</td><td><strong>Acceptance Criteria</strong></td><td>معايير القبول</td><td>حالات اختبارية محددة بصيغة Given/When/Then للتحقق من إنجاز المتطلبات.</td></tr>
        <tr><td>24</td><td><strong>Future Features</strong></td><td>ميزات المراحل اللاحقة</td><td>قائمة بالأفكار والميزات المؤجلة إلى ما بعد النسخة التجريبية الأولى.</td></tr>
        <tr><td>25</td><td><strong>Risks &amp; Dependencies</strong></td><td>المخاطر والاعتماديات</td><td>العوامل التقنية أو التنظيمية التي قد تعيق تسليم المشروع وطرق تخفيفها.</td></tr>
        <tr><td>26</td><td><strong>Open Questions</strong></td><td>الأسئلة المفتوحة</td><td>النقاط غير المحسومة التي تحتاج استشارة أو قراراً مستقبلياً دون تخمين.</td></tr>
        <tr><td>27</td><td><strong>Recommended Development Phases</strong></td><td>مراحل التطوير الموصى بها</td><td>خطة تدريجية لتنفيذ وبناء مكونات النظام وفق الأسبقية والاعتماديات.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- PROMPT 02: PRD GENERATION -->
  <div class="code-container">
    <div class="code-header">
      <span class="code-lang">PROMPT 02 — Generate PRD after Grill Me (المعتمد في مكتبة البرومبتات)</span>
      <button class="copy-btn" type="button" title="نسخ البرومبت">نسخ البرومبت</button>
    </div>
    <pre class="code-content"><code>Act as a Senior Product Manager and Business Analyst.
We have completed a Grill Me interview. Use the actual interview answers
and approved decisions as the single source of truth.
Create a complete, practical PRD in docs/PRD.md with these 27 sections:
1 Product Overview; 2 Problem Statement; 3 Product Goals; 4 Non-Goals;
5 Target Users; 6 User Personas; 7 User Needs; 8 User Stories;
9 MVP Scope; 10 Core Features; 11 Functional Requirements;
12 Non-Functional Requirements; 13 User Flows; 14 Pages/Screens;
15 Roles & Permissions; 16 Data Requirements; 17 Integrations;
18 Edge Cases; 19 Error States; 20 Security & Privacy Requirements;
21 Analytics & Tracking; 22 Success Metrics/KPIs; 23 Acceptance Criteria;
24 Future Features; 25 Risks & Dependencies; 26 Open Questions;
27 Recommended Development Phases.
For each major feature provide purpose, story, requirements, business rules,
edge cases, acceptance criteria, and Must/Should/Nice priority.
Use requirement IDs FR-001, NFR-001, BR-001 and testable Given/When/Then.
Separate confirmed requirements, assumptions, proposed decisions and questions.
Do not code, design screens or silently resolve conflicts.</code></pre>
  </div>

  <!-- 3. Critical PRD Review -->
  <h3>3. المراجعة النقدية للوثيقة (PRD Review) — كشف الثغرات المعمارية</h3>
  <p>
    <strong>لماذا نراجع وثيقة PRD إذا كان الذكاء الاصطناعي هو من صاغها؟</strong>
    النماذج اللغوية بارعة في كتابة نصوص أنيقة ومتدفقة، ولكنها تخفي أحياناً <strong>تناقضات جوهرية</strong> وثغرات منطقية خطيرة:
  </p>
  <ul>
    <li><strong>تناقض القواعد:</strong> قد تنص الوثيقة في قسم القواعد على أن اعتماد مسؤول المستودع إلزامي قبل تسليم أي معدة، بينما تذكر في قسم الشاشات أن الطالب يستلم المعدة فوراً!</li>
    <li><strong>ثغرات الصلاحيات:</strong> إغفال تحديد ما إذا كان الموظف العادي يستطيع تعديل حالة معدة تالفة أم أن ذلك مقصور على المشرف.</li>
    <li><strong>تضخم النطاق (Scope Creep):</strong> تسلل ميزات معقدة (مثل بوابات الدفع الإلكتروني) إلى الـ MVP دون اعتماد في المقابلة.</li>
    <li><strong>متطلبات غير قابلة للاختبار:</strong> عبارات فضفاضة مثل «يجب أن يكون النظام سريعاً جداً وسهل الاستخدام» بدلاً من أرقام محددة قابلة للقياس.</li>
  </ul>

  <!-- PROMPT 03: PRD REVIEW -->
  <div class="code-container">
    <div class="code-header">
      <span class="code-lang">PROMPT 03 — PRD Review (المعتمد في مكتبة البرومبتات)</span>
      <button class="copy-btn" type="button" title="نسخ البرومبت">نسخ البرومبت</button>
    </div>
    <pre class="code-content"><code>Act as a critical Product Requirements Reviewer.
Read docs/PRD.md and identify at least five high-impact issues:
ambiguity, contradictory rules, missing permissions, unverifiable
requirements, oversized MVP, missing edge/error cases.
For each issue show location, risk, suggested correction, and whether
stakeholder approval is needed. Do not modify the PRD automatically.
Explain findings in Arabic.</code></pre>
  </div>

  <div class="callout tip">
    <div class="callout-header">
      <span class="callout-icon">📋</span>
      <span>مخرج المراجعة: تقرير docs/PRD_REVIEW.md</span>
    </div>
    <p>
      ينشئ الطالب ملف <code>docs/PRD_REVIEW.md</code> يضم جدولاً بالمشكلات المكتشفة، ودرجة خطورتها (مرتفعة/متوسطة/منخفضة)، والقرار التصحيحي الذي اعتمده، ثم يعكس التصحيحات في <code>docs/PRD.md</code> قبل البدء بكتابة مواصفات السلوك (SRS).
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 04: SRS (مواصفات متطلبات النظام وتوصيف السلوك)
 * ========================================================================= */
export const topic04SrsHtml = `
<section id="topic-w2-04-srs" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 04</span>
    <span class="step-pill">هندسة النظام والتحقق</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول</h2>
      <div class="step-subtitle">تفكيك متطلبات PRD إلى سلوك تقني، وحالات استثناء وأخطاء، ومعايير Given/When/Then القابلة للاختبار</div>
    </div>
  </div>

  <!-- 1. PRD vs SRS -->
  <h3>1. الفرق الجوهري بين وثيقة PRD ومواصفات SRS</h3>
  <p>
    يقع العديد من المطورين في خطأ الخلط بين PRD وSRS، أو إهمال إحداهما. يوضح الجدول التالي الفارق الحاسم بينهما:
  </p>

  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>وجه المقارنة</th>
          <th>وثيقة متطلبات المنتج (PRD)</th>
          <th>مواصفات متطلبات النظام (SRS)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>السؤال الجوهري</strong></td>
          <td>ماذا نبني، ولماذا، ولمن؟</td>
          <td>كيف يتصرف النظام تقنياً في كل خطوة، وكيف نتحقق من صحته؟</td>
        </tr>
        <tr>
          <td><strong>الجمهور المستهدف</strong></td>
          <td>أصحاب المصلحة، مدير المنتج، المصممون، والمطورون.</td>
          <td>مهندسو البرمجيات، مهندسو الاختبار (QA)، ومصممو البنية التحتية.</td>
        </tr>
        <tr>
          <td><strong>مستوى التفصيل</strong></td>
          <td>وصف احتياج المستخدم وقيمة الميزة وحدود النطاق.</td>
          <td>شروط التحقق الدقيقة، تغيير الحالات، رسائل الأخطاء، والاستثناءات.</td>
        </tr>
        <tr>
          <td><strong>مثال تطبيقي (BorrowHub)</strong></td>
          <td><em>«يستطيع الطالب المؤهل تقديم طلب استعارة لمعدة متاحة.»</em></td>
          <td>
            <em>«يستقبل النظام الطلب، ويتحقق من: 1) مصادقة الجلسة، 2) عدد طلبات الطالب النشطة &lt; 2، 3) حالة المعدة = <code>AVAILABLE</code>. عند التحقق: يُنشئ سجلاً بحالة <code>PENDING</code> ويحجز المعدة مؤقتاً، وإلا يُرجع كود الخطأ المناسب ورسالة عربية توضيحية.»</em>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 2. System Behavior Decomposition -->
  <h3>2. تفكيك المتطلب الوظيفي إلى سلوك نظام محدد</h3>
  <p>
    لكل متطلب وظيفي معتمد في PRD (مثل <code>FR-001</code>)، يقوم مهندس النظام بتفكيكه إلى أربعة عناصر تقنية داخل <code>docs/SRS.md</code>:
  </p>
  <ol>
    <li><strong>الشروط المسبقة (Preconditions):</strong> ما الحالة الإلزامية للنظام والمستخدم قبل بدء تنفيذ العملية؟ (مثال: وجود حساب نشط غير موقوف).</li>
    <li><strong>شروط التحقق من المدخلات (Input Validation &amp; Business Rules):</strong> القواعد الإلزامية لصحة البيانات (مثال: تاريخ الإرجاع لا يتجاوز 10 أيام من تاريخ الطلب).</li>
    <li><strong>تغيّر حالة الكيان (State Transitions):</strong> ما هي الحالة الجديدة للسجل في قاعدة البيانات؟ (مثال: تحول حالة الطلب من <code>DRAFT</code> إلى <code>PENDING_REVIEW</code>).</li>
    <li><strong>الاستجابة والمخرجات (System Output &amp; Feedback):</strong> ما الذي يُعرض للمستخدم فور إتمام العملية وما هي البيانات المسترجعة؟</li>
  </ol>

  <!-- 3. Error Handling and Edge Cases -->
  <h3>3. هندسة حالات الخطأ والحالات الحدية (Error States &amp; Edge Cases)</h3>
  <p>
    النظام البرمجي القوي لا يُعرف بكيفية عمله في مسار النجاح فقط (Happy Path)، بل بطريقة صموده ومعالجته الواضحة لحالات الفشل دون اختراع قواعد عشوائية:
  </p>
  <ul>
    <li><strong>أخطاء التحقق (Validation Failures):</strong> يجب تحديد نص رسالة الخطأ للمستخدم وحقل الإدخال المعني، مثل: <em>«لا يمكن تحديد تاريخ إرجاع أطول من 10 أيام»</em>.</li>
    <li><strong>تعارض التزامن (Concurrency / Race Conditions):</strong> إذا حاول طالبان استعارة الوحدة الأخيرة من كاميرا في نفس اللحظة، كيف يحسم النظام التنافس؟ (من يصل طلبه أولاً يحصل عليها، والآخر يتلقى إشعار نفاد المخزون).</li>
    <li><strong>منع التكرار (Idempotency):</strong> حماية النظام من الضغط المتكرر السريع على زر «إرسال الطلب»، لضمان عدم إنشاء طلبات مكررة في قاعدة البيانات.</li>
  </ul>

  <!-- 4. Given / When / Then Standard -->
  <h3>4. المعيار الصارم لمعايير القبول: صيغة Given / When / Then</h3>
  <p>
    لضمان أن كل متطلب يمكن اختباره برمجياً وتلقائياً دون أدنى لبس، نلزم صياغة معايير القبول بالصيغة الثلاثية الهندسية:
  </p>

  <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin: 1rem 0;">
    <h4 style="color: var(--brand-primary); margin-bottom: 0.75rem;">ثلاثة سيناريوهات إلزامية لكل متطلب وظيفي</h4>
    
    <div style="background: var(--bg-surface); padding: 0.85rem 1.25rem; border-right: 4px solid #10b981; border-radius: 4px; margin-bottom: 0.75rem; font-size: 0.92rem; line-height: 1.8;">
      <strong>1. المسار الناجح (Happy Path Scenario):</strong><br>
      <strong>Given:</strong> طالب مسجل دخوله بحساب معتمد، ويمتلك طلباً نشطاً واحداً فقط، ومعدة مطلوبة متوفرة في المستودع.<br>
      <strong>When:</strong> يقدم الطالب طلب استعارة للمعدة لمدة 5 أيام.<br>
      <strong>Then:</strong> يقبل النظام الطلب، ويحدد حالته <code>PENDING_REVIEW</code>، ويحجز المعدة مؤقتاً، ويظهر للطالب رسالة تأكيد تتضمن رقم الطلب.
    </div>

    <div style="background: var(--bg-surface); padding: 0.85rem 1.25rem; border-right: 4px solid #f59e0b; border-radius: 4px; margin-bottom: 0.75rem; font-size: 0.92rem; line-height: 1.8;">
      <strong>2. مسار تجاوز الحد الأقصى (Validation Rejection):</strong><br>
      <strong>Given:</strong> طالب يمتلك حالياً طلبين نشطين بحالة <code>APPROVED</code> أو <code>ISSUED</code>.<br>
      <strong>When:</strong> يحاول الطالب إرسال طلب استعارة لمعدة جديدة.<br>
      <strong>Then:</strong> يرفض النظام العملية فوراً قبل إنشاء أي سجل، ويعرض تنبيهاً صريحاً: <em>«عذراً، لقد بلغت الحد الأقصى للاستعارة المتزامنة (طلبين). يرجى إرجاع إحدى المعدات أولاً»</em>.
    </div>

    <div style="background: var(--bg-surface); padding: 0.85rem 1.25rem; border-right: 4px solid #ef4444; border-radius: 4px; font-size: 0.92rem; line-height: 1.8;">
      <strong>3. مسار التعارض ونفاد المخزون (Edge Case / Out of Stock):</strong><br>
      <strong>Given:</strong> توجد وحدة واحدة فقط متبقية من المعدة X، وطالب فتح صفحتها قبل 5 دقائق.<br>
      <strong>When:</strong> أتم مستخدم آخر استعارة الوحدة الأخيرة قبل أن يضغط الطالب الأول زر التأكيد.<br>
      <strong>Then:</strong> عند معالجة طلب الطالب الأول، يكتشف النظام نفاد المخزون، فيمنع العملية ويعرض إشعاراً فورياً: <em>«نأسف، لم تعد هذه المعدة متوفرة حالياً»</em> دون حدوث خطأ 500 في الخادم.
    </div>
  </div>

  <!-- 5. SRS Prompt -->
  <h3>5. برومبت استخراج مواصفات السلوك ومعايير القبول (SRS Generation)</h3>
  <div class="code-container">
    <div class="code-header">
      <span class="code-lang">PROMPT — Generate SRS & Acceptance Criteria (من PRD المعتمد)</span>
      <button class="copy-btn" type="button" title="نسخ البرومبت">نسخ البرومبت</button>
    </div>
    <pre class="code-content"><code>Act as a Senior Software Systems Architect and QA Lead.
Context:
Read docs/PRD.md and docs/PRD_REVIEW.md. Use them as the single source of truth.
Do not invent new business features or change approved rules.

Task:
Transform the functional requirements (FR-xxx) and business rules (BR-xxx) from PRD into a detailed Software Requirements Specification (SRS) in docs/SRS.md.

For each functional requirement provide:
1. Requirement ID & PRD Source Traceability (e.g. SRS-001 tracing to FR-001).
2. Detailed System Behavior: preconditions, inputs, validation rules, state changes, and system response.
3. Error States & Edge Cases: specific error messages, response codes, and idempotency rules.
4. Acceptance Criteria in strict Given / When / Then format (covering happy path, validation failures, and edge cases).

Deliverable:
Create docs/SRS.md in technical Arabic with English terms.
Ensure zero invented decisions; flag any ambiguities as Open Questions.</code></pre>
  </div>

  <div class="callout tip">
    <div class="callout-header">
      <span class="callout-icon">🎯</span>
      <span>المخرج النهائي وجاهزية الانتقال لمرحلة Git وGitHub</span>
    </div>
    <p>
      بامتلاكك لملف <code>docs/PROJECT_CONTEXT.md</code>، و<code>docs/DECISIONS_LOG.md</code>، و<code>docs/PRD.md</code>، و<code>docs/SRS.md</code>، تكون قد أغلقت بالكامل باب التخمين وبنيت أساساً هندسياً صلباً. تصبح وثائق مشروعك الآن جاهزة لحفظها في مستودع <strong>Git</strong> ورفعها إلى <strong>GitHub</strong> في الموضوع التالي!
    </p>
  </div>
</section>
`;

/* =========================================================================
 * ASSEMBLED WAVE 2 ENTRIES FOR TICKET 02
 * ========================================================================= */
export const t02Entries: TopicItem[] = [
  {
    id: 'topic-w2-02-grill-me',
    number: '02',
    slug: 'discovery-grill-me',
    title: 'استجواب الفكرة واستكشاف المتطلبات (Grill Me)',
    subtitle: 'مقابلة استجوابية خطوة بخطوة لكشف الافتراضات وتثبيت القرارات قبل صياغة الوثائق',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'تحليل المتطلبات وهندسة المنتج',
    summary: 'منهجية المقابلة الاستجوابية الحازمة (Grill Me) لطرح سؤال واحد في كل مرة، وتحدي الإجابات الفضفاضة، وحسم نطاق MVP، وتوثيق سجل القرارات المعتمدة وتمييز الافتراضات والأسئلة المفتوحة دون الحاجة لأدوات برمجية متقدمة.',
    tags: ['Grill Me', 'Product Discovery', 'MVP Scope', 'Decision Log', 'Open Questions', 'Assumptions'],
    contentTypes: ['prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic02GrillMeHtml),
    htmlContent: topic02GrillMeHtml,

    // Shared frozen contract fields
    goal: 'إجراء مقابلة استكشاف متطلبات تفاعلية مع الذكاء الاصطناعي (Grill Me) بطرح سؤال واحد في كل مرة، وتحدي الغموض وتحديد نطاق MVP بدقة، وتوثيق سجل القرارات المعتمدة وتمييز الافتراضات والأسئلة المفتوحة قبل البدء بكتابة وثيقة المتطلبات.',
    prerequisites: [
      'صياغة الفكرة الأولية وسياق المشروع في ملف docs/PROJECT_CONTEXT.md ونطاق النسخة الأولى الأولي (مخرج الموضوع 01).',
      'لا يشترط تثبيت أي أدوات برمجية للواجهة أو مهارات Skills أو خوادم MCP؛ يمكن إنجاز المقابلة في أي نافذة محادثة ذكاء اصطناعي عادية.'
    ],
    steps: [
      '1. راجع ملف docs/PROJECT_CONTEXT.md واستخرج بيان المشكلة، الفئات المستهدفة، ونطاق MVP الأولي.',
      '2. ابدأ جلسة المقابلة الاستكشافية باستخدام برومبت Grill Me المعتمد (Prompt 01)، مع اشتراط طرح سؤال واحد فقط في كل مرة وعدم اختراع قواعد عمل.',
      '3. تفاعل مع أسئلة الوكيل سؤالاً بسؤال؛ وضح رغبات المستخدمين وقواعد العمل والحالات الحدية لمشروعك.',
      '4. عند مواجهة نقطة غامضة أو غير محسومة، لا تخترع لها حلاً وهمياً، بل سجّلها صراحة في قائمة الأسئلة المفتوحة (Open Questions).',
      '5. راقب عدد الأسئلة وتدرجها، وتحدّ الميزات غير الضرورية لعزلها خارج نطاق MVP ونقلها إلى قائمة الميزات المؤجلة (Non-Goals).',
      '6. دوّن نتائج المقابلة في سجل القرارات docs/DECISIONS_LOG.md متضمناً جدول القرارات والافتراضات والأسئلة المفتوحة، ليكون المرجع الحصري للمرحلة التالية.'
    ],
    promptRefs: ['prompt-01-grill-me-product-discovery'],
    outputs: [
      'docs/DECISIONS_LOG.md',
      'قائمة الأسئلة المفتوحة والافتراضات (Open Questions & Assumptions)',
      'نطاق MVP المعتمد نهائياً'
    ],
    checklist: [
      'تم تشغيل المقابلة بالالتزام الصارم بقاعدة "سؤال واحد في كل مرة" دون توليد كود أو شاشات.',
      'تم تحدي الإجابات العامة وتحديد أدوار المستخدمين وصلاحياتهم الأساسية.',
      'تم حسم نطاق MVP بدقة وفصل الميزات المعقدة إلى مراحل لاحقة (Non-Goals).',
      'تم توثيق القرارات المعتمدة صراحة وفصلها عن الافتراضات والتوصيات المقترحة.',
      'تم تسجيل النقاط غير المحسومة في قائمة Open Questions بدلاً من اختراع حلول افتراضية.',
      'تم إتمام المقابلة بالكامل دون الحاجة لتثبيت بيئات كود أو مهارات أو أدوات إضافية.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 2,
  },
  {
    id: 'topic-w2-03-prd',
    number: '03',
    slug: 'prd-specification',
    title: 'وثيقة متطلبات المنتج (PRD) بالأقسام الـ27 ومراجعتها',
    subtitle: 'البنية المرجعية الكاملة، وعزل المؤكد عن الافتراضات، والمراجعة النقدية لكشف التناقضات',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'توثيق وهندسة المتطلبات',
    summary: 'صياغة وثيقة متطلبات المنتج الكاملة (PRD) ببنيتها المرجعية ذات الـ 27 قسمًا، استنادًا لقرارات Grill Me، مع الترقيم الصارم للمتطلبات الوظيفية وغير الوظيفية وقواعد العمل، وإجراء مراجعة نقدية صارمة لكشف التناقضات وتضخم النطاق وتوثيق تقرير المراجعة.',
    tags: ['PRD', 'Product Requirements', '27 Sections', 'PRD Review', 'FR-xxx', 'NFR-xxx', 'Scope Control'],
    contentTypes: ['prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic03PrdHtml),
    htmlContent: topic03PrdHtml,

    // Shared frozen contract fields
    goal: 'تحويل مخرجات مقابلة Grill Me وسجل القرارات إلى وثيقة متطلبات منتج شاملة docs/PRD.md تتضمن الأقسام الـ 27 المرجعية كاملة، مع ترقيم المتطلبات (FR-xxx و NFR-xxx)، وفصل المتطلبات المؤكدة عن الأسئلة المفتوحة، وإجراء مراجعة نقدية لكشف التناقضات وتضخم النطاق.',
    prerequisites: [
      'إتمام مقابلة استنطاق المتطلبات (Grill Me) وحسم نطاق MVP وسجل القرارات docs/DECISIONS_LOG.md (الموضوع 02).',
      'وجود قائمة واضحة بالأسئلة المفتوحة والقرارات المعتمدة دون اختراع متطلبات جديدة.',
      'لا يشترط تثبيت أي بيئة برمجية أو أدوات Frontend أو مهارات وكيل لتوليد أو مراجعة الوثيقة.'
    ],
    steps: [
      '1. افتح سجل القرارات docs/DECISIONS_LOG.md وتحقق من اكتمال النقاط الأساسية وعدم وجود قرارات مستنتجة دون إجابة معتمدة.',
      '2. استخدم برومبت توليد PRD المعتمد (Prompt 02) مع تمرير إجابات المقابلة الفعلية وسجل القرارات كمصدر وحيد للحقيقة (Single Source of Truth).',
      '3. ولّد وثيقة docs/PRD.md متضمنة الأقسام الـ27 المرجعية كاملة: من نظرة عامة وبيان المشكلة وحتى معايير القبول ومراحل التطوير الموصى بها.',
      '4. رقّم جميع المتطلبات الوظيفية وغير الوظيفية وقواعد العمل بمعرفات قياسية فريدة (FR-001, NFR-001, BR-001) مع تحديد الأولوية (Must/Should/Nice).',
      '5. افصل داخل الوثيقة بوضوح تام بين ما تم تأكيده، وما هو افتراض مقترح، وقسم الأسئلة المفتوحة (Open Questions) دون تسوية صامتة للغموض.',
      '6. شغّل برومبت المراجعة النقدية (Prompt 03) لفحص وثيقة docs/PRD.md واستخراج خمس مشكلات معمارية وتناقضات على الأقل (مثل تناقض الصلاحيات، متطلبات غير قابلة للتحقق، تضخم MVP).',
      '7. أنشئ تقرير المراجعة النقدية docs/PRD_REVIEW.md وحدد الإجراءات التصحيحية المعتمدة وعالج التناقضات في PRD قبل الانتقال لمرحلة توصيف السلوك.'
    ],
    promptRefs: [
      'prompt-02-generate-prd-after-grill-me',
      'prompt-03-prd-review'
    ],
    outputs: [
      'docs/PRD.md (متضمنة الأقسام الـ 27 المرجعية)',
      'docs/PRD_REVIEW.md (تقرير المراجعة النقدية ومعالجة الثغرات)'
    ],
    checklist: [
      'اعتمدت وثيقة PRD كلياً على إجابات مقابلة Grill Me وسجل القرارات الفعلي كمصدر حقيقة وحيد.',
      'تغطي وثيقة docs/PRD.md الأقسام الـ27 المرجعية الواردة في المنهج بالكامل دون حذف.',
      'كل متطلب يحمل معرّفاً فريداً (FR-xxx, NFR-xxx, BR-xxx) ومستوى أولوية واضح.',
      'تم عزل الافتراضات والتوصيات وقسم الأسئلة المفتوحة دون فرض حلول غير معتمدة.',
      'تم تشغيل المراجعة النقدية (PRD Review) وتوثيق التقرير في docs/PRD_REVIEW.md ومعالجة التناقضات المكتشفة.',
      'تم إنجاز الوثيقة ومراجعتها دون اشتراط تثبيت أدوات برمجة أو Skills أو MCP.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 3,
  },
  {
    id: 'topic-w2-04-srs',
    number: '04',
    slug: 'srs',
    title: 'مواصفات متطلبات النظام (SRS) وتوصيف السلوك ومعايير القبول',
    subtitle: 'تحويل بنود PRD إلى سلوك تقني مدقق، وحالات استثناء وأخطاء، ومعايير Given/When/Then',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'هندسة المتطلبات والتحقق',
    summary: 'الانتقال من متطلبات المنتج (PRD) إلى مواصفات متطلبات النظام (SRS)، وتفصيل سلوك النظام الداخلي، شروط التحقق، ومعالجة أخطاء المدخلات والحدود القصوى، وصياغة معايير القبول القابلة للاختبار بصيغة Given/When/Then، مع الحفاظ على مصفوفة التتبع دون اختراع قرارات عمل جديدة.',
    tags: ['SRS', 'Given-When-Then', 'Acceptance Criteria', 'System Behavior', 'Error Handling', 'Validation Rules', 'Traceability'],
    contentTypes: ['prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic04SrsHtml),
    htmlContent: topic04SrsHtml,

    // Shared frozen contract fields
    goal: 'تفكيك المتطلبات المعتمدة في وثيقة PRD إلى مواصفات سلوكية تقنية دقيقة داخل docs/SRS.md، تغطي شروط التحقق من صحة المدخلات، استجابة النظام، معالجة كافة حالات الخطأ والاستثناءات، وصياغة معايير القبول بصيغة Given/When/Then الصارمة القابلة للاختبار، دون اختراع قرارات منتج جديدة.',
    prerequisites: [
      'اعتماد وثيقة متطلبات المنتج docs/PRD.md واجتياز تقرير المراجعة النقدية docs/PRD_REVIEW.md (الموضوع 03).',
      'فهم الفرق الجوهري بين PRD (ماذا نبني ولماذا) وSRS (السلوك التقني المفصل وشروط التحقق).',
      'لا تشترط هذه الخطوة تثبيت أدوات كود الفرونت أو الوكلاء أو مهارات التنفيذ.'
    ],
    steps: [
      '1. استخرج المتطلبات الوظيفية المعتمدة (FR-xxx) وقواعد العمل (BR-xxx) من وثيقة docs/PRD.md.',
      '2. ميّز بدقة بين صياغة PRD العامة ("يستطيع الطالب استعارة معدة") وصياغة SRS السلوكية ("عند استلام طلب الاستعارة، يتحقق النظام من الشروط الثلاثة: الجلسة، والحد، والتوفر").',
      '3. حدد لكل متطلب وظيفي شروط التحقق من صحة المدخلات (Validation Rules)، ردود الفعل الفورية للنظام، وتغيّر حالات الكيانات.',
      '4. وثّق بالتفصيل جميع حالات الخطأ المحتملة (Error States) والاستثناءات (Edge Cases): رسائل الخطأ للمستخدم، رموز الاستجابة، وحماية النظام من تكرار الإرسال.',
      '5. صغ معايير القبول (Acceptance Criteria) لكل متطلب وحالة استثنائية بصيغة هندسية قياسية: Given / When / Then تغطي المسار الناجح، وأخطاء التحقق، وحالات التنافس والتعارض.',
      '6. نظّم مصفوفة تتبع المتطلبات (Requirements Traceability Matrix) لربط كل بند سلوكي في SRS بالمتطلب المعتمد في PRD المقابل له لمنع اختراع متطلبات جديدة.',
      '7. احفظ وثيقة مواصفات النظام في docs/SRS.md وتأكد من اكتمالها لتكون المرجع الحاسم لكتابة الاختبارات وبناء المخططات ومستودع Git.'
    ],
    promptRefs: [
      'prompt-02-generate-prd-after-grill-me'
    ],
    outputs: [
      'docs/SRS.md (مواصفات السلوك ومعايير القبول Given/When/Then)',
      'مصفوفة تتبع المتطلبات (Requirements Traceability: PRD -> SRS)'
    ],
    checklist: [
      'يوضح المستند الفرق بوضوح بين متطلبات المنتج (PRD) ومواصفات سلوك النظام (SRS).',
      'كل سلوك في SRS مشتق مباشرة من متطلب وظيفي معتمد في PRD ومقيد بمعرّفه (FR-xxx).',
      'تم تحديد شروط التحقق (Validation) وقواعد البيانات وحالات الاستثناء (Edge Cases) بدقة.',
      'تم توثيق جميع حالات الخطأ (Error States) والرسائل الناتجة دون ترك سلوكيات غامضة.',
      'تمت كتابة معايير القبول بصيغة صارمة قابلة للاختبار (Given / When / Then).',
      'لم يُخترع أي متطلب أو قرار وظيفي جديد خارج ما اعتُمد في وثيقة PRD.',
      'تم إنجاز العمل بالكامل كتحليل وتوثيق دون اشتراط أدوات فرونت أو إضافات بيئة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 4,
  },
];
