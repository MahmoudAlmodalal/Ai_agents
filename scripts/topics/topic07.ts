export const topic07Html = `
      <!-- ==================== TOPIC 07: GIT, GITHUB & REPO STRUCTURE ==================== -->
      <section id="topic-07" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 07</span>
          <span class="step-pill">تنظيم ملفات المشروع وإدارة الإصدارات</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">هيكلية ملفات التوثيق في المشروع وقواعد التحقق الحاسمة وإدارة Git / GitHub</h2>
            <div class="step-subtitle">ضمان الاتساق بين المخططات والوثائق، وحماية الأسرار، وتدفق الفروع الآمن</div>
          </div>
        </div>

        <!-- 1. Docs Directory Tree -->
        <h3>الشكل النهائي لهيكلية ملفات التوثيق في مشروع BorrowHub</h3>
        <p>
          بعد تشغيل البرومبتات الهندسية وحفظ المخرجات ورفعها على GitHub (مع وجود ملف <code>README.md</code> وإضافة ملف <code>.gitignore</code> لحماية الأسرار وملفات <code>.env</code>)، يصبح هيكل مجلد التوثيق في مشروعك منظماً ومرجعياً كالتالي:
        </p>

        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">شجرة ملفات التوثيق المعتمدة (Directory Tree: BorrowHub/docs/)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ الشجرة">نسخ الهيكل</button>
          </div>
          <pre class="code-content"><code>BorrowHub/
├── README.md                      # الوثيقة التعريفية الشاملة بالمشروع وكيفية تشغيله
├── .gitignore                     # استبعاد node_modules وملفات البيئة .env من الرفع
└── docs/                          # المجلد المرجعي الهندسي الوحيد
    ├── PRD.md                     # وثيقة متطلبات المنتج المعتمدة (27 قسماً)
    ├── user-flow.md               # مسار المستخدم وقرارات النجاح والفشل بـ Mermaid
    ├── database.dbml              # هيكل قاعدة البيانات بصيغة DBML لموقع dbdiagram.io
    ├── ERD.md                     # مخطط الكيانات والعلاقات والقيود والتطبيع 3NF
    ├── database-review.md         # المراجعة النقدية لقاعدة البيانات وحل مشكلات الأداء
    └── diagrams/                  # مجلد المخططات الهندسية المعمارية
        ├── README.md              # شرح تكامل المخططات مع بعضها وارتباطها بـ PRD
        ├── domain-model.md        # النموذج المفاهيمي للأعمال (Conceptual Domain Model)
        ├── domain-model.mmd       # كود Mermaid للنموذج المفاهيمي
        ├── use-case.md            # حالات الاستخدام وحدود النظام والممثلين
        ├── use-case.puml          # كود PlantUML لمخطط حالات الاستخدام
        ├── activity-diagram.md    # سير العمليات وتوزيع الأنشطة (Swimlanes)
        ├── sequence-diagrams.md   # مخططات التسلسل الزمني للتفاعلات والرسائل
        ├── sequences/             # تفصيل حالات الاستخدام الفردية
        ├── state-diagrams.md      # دورة حياة الكيانات والآلة الحالة (State Machine)
        ├── class-diagram.md       # كلاسات التصميم البرمجي والعمليات والتعددية
        └── class-diagram.mmd      # كود Mermaid لمخطط الكلاسات</code></pre>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 2. The 6 Critical Consistency Rules -->
        <h3>أهم 6 قواعد عمل يجب التحقق من اتساقها التام عبر المخططات</h3>
        <p>
          عند مراجعتك للمخططات الناتجة، تأكد من أن قواعد العمل المعتمدة في وثيقة <code>PRD.md</code> قد انعكست <strong>بنفس المنطق الصارم في كل مخطط دون أي تناقض</strong>:
        </p>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>قاعدة العمل في BorrowHub</th>
                <th>أين وكيف يجب أن تظهر وتنعكس في المخططات؟</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1</strong></td>
                <td><strong>اعتماد حساب الطالب يدوياً</strong></td>
                <td>تظهر كوظيفة لمسؤول المستودع في <code>Use Case</code>، وكشرط تحقق قبل السماح بالاستعارة في <code>User Flow</code> و <code>Sequence</code>، وكعمود حالة <code>is_approved</code> في جدول <code>users</code> داخل <code>ERD</code>.</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td><strong>استعارة وحدة واحدة لكل طلب</strong></td>
                <td>تظهر كقيد في <code>Domain Model</code> و <code>PRD</code>، وتمنع الحاجة لجدول تفاصيل أصناف متعددة داخل الطلب الواحد في <code>ERD</code>.</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td><strong>حد أقصى طلبين نشطين للطالب</strong></td>
                <td>نقطة قرار فحص (Decision) في <code>User Flow</code> و <code>Activity</code>، وعملية تحقق منطقية (Validation) في <code>Sequence Diagram</code> قبل حفظ الطلب.</td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td><strong>مدة الإعارة لا تتجاوز 10 أيام تقويمية</strong></td>
                <td>شرط تحقق صارم على تاريخ الإرجاع في <code>User Flow</code> و <code>Sequence</code>، وقيد زمني في جدول <code>loan_requests</code> داخل <code>ERD</code>.</td>
              </tr>
              <tr>
                <td><strong>5</strong></td>
                <td><strong>انتهاء الحجز خلال 48 ساعة إن لم يستلم</strong></td>
                <td>حالة انتقال صريحة إلى <code>Expired</code> في <code>State Diagram</code>، ومسار بديل في <code>Activity Diagram</code> يعيد الكمية المحجوزة للمخزون المتاح.</td>
              </tr>
              <tr>
                <td><strong>6</strong></td>
                <td><strong>متابعة التأخر يدوياً + استبعاد التالف</strong></td>
                <td>حالة <code>Overdue</code> في <code>State Diagram</code>، وعند إرجاع معدة تالفة في <code>Activity</code> و <code>ERD</code> لا تُضاف للكمية السليمة المتاحة (<code>available_qty</code>).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2.5rem 0;">

        <!-- 3. Git & GitHub Teamwork Workflow -->
        <h3>إدارة الإصدارات والعمل الجماعي بـ Git و GitHub</h3>
        <p>
          الهدف من <strong>GitHub</strong> ليس مجرد رفع ملفات المشروع كقرص تخزين سحابي؛ بل <strong>تسجيل تاريخ التغييرات البرمجية والعمل الجماعي الآمن</strong> دون تخريب نسخة الآخرين:
        </p>

        <div class="callout warning">
          <div class="callout-header">
            <span class="callout-icon">🔒</span>
            <span>حماية الأسرار وملفات البيئة (.env): لا ترفع أسرارك أبداً!</span>
          </div>
          <p>
            ملف <code>.env</code> يحتوي على مفاتيح API، وكلمات مرور قواعد البيانات، وأسرار الجلسات. <strong>يجب ألا يُرفع هذا الملف نهائياً إلى المستودع</strong>، وتأكد من وجوده في ملف <code>.gitignore</code>.
            إذا تم تسريب مفتاح سري بالخطأ على GitHub، فحذفه من أحدث Commit <strong>لا يكفي إطلاقاً</strong>؛ لأن تاريخ Git يحتفظ به! في هذه الحالة يجب فوراً إبطال المفتاح (Revoke) وتوليد مفتاح جديد.
          </p>
        </div>

        <div class="code-container">
          <div class="code-header">
            <span class="code-lang">دورة العمل الآمنة على الفروع (Branching & Pull Requests)</span>
            <button class="copy-btn" onclick="copyCode(this)" title="نسخ الأوامر">نسخ الأوامر</button>
          </div>
          <pre class="code-content"><code># 1. إنشاء فرع مستقل لميزة جديدة بدلاً من التعديل المباشر على main
git checkout -b feature/borrowing-flow

# 2. فحص التغييرات بعد إتمام العمل
git status

# 3. إضافة الملفات المجهزة للمرحلة
git add docs/ PRD.md

# 4. حفظ التغييرات برسالة دلالية واضحة تصف ما تم إنجازه
git commit -m "docs: finalize borrow flow decision points and state machine"

# 5. رفع الفرع إلى مستودع GitHub
git push -u origin feature/borrowing-flow

# 6. فتح Pull Request (PR) ليقوم زميلك أو المشرف بمراجعة الكود والموافقة قبل الدمج</code></pre>
        </div>

      </section>
`;
