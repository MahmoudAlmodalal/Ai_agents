export const topic01Html = `
      <!-- ==================== TOPIC 01: FOUNDATIONS ==================== -->
      <section id="topic-01" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 01</span>
          <span class="step-pill">الأساسيات والمدخل الهندسي</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">بناء المشاريع البرمجية بالذكاء الاصطناعي دون تخمين</h2>
            <div class="step-subtitle">من معضلة الطلب العشوائي إلى مسار العمل الهندسي المنضبط الموثق</div>
          </div>
        </div>

        <!-- Section Intro Callout -->
        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">💡</span>
            <span>المدخل الجوهري: كيف نبني مشروعاً برمجياً بالذكاء الاصطناعي دون تخمين؟</span>
          </div>
          <p>
            عندما تطلب من الذكاء الاصطناعي بجملة واحدة عشوائية مثل: <em>«اصنع لي موقعاً لاستعارة معدات الجامعة»</em>، فإنه يضطر حتماً لتخمين عشرات القواعد الجوهرية والقرارات الحرجة التي لم تحددها له:
          </p>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li>من يوافق على الطلب؟ وما هي صلاحيات كل دور؟</li>
            <li>هل الحجز فوري أم مشروط بموافقة إدارية؟ وخلال كم ساعة تنتهي صلاحية الحجز إن لم يستلم؟</li>
            <li>كم معدة يحق للطالب استعارتها في نفس الوقت؟ وما هي أقصى مدة إعارة مسموحة؟</li>
            <li>ماذا يحدث لو كانت المعدة غير متاحة، أو أرجعها الطالب تالفة؟</li>
          </ul>
          <p>
            <strong>النتيجة الكارثية:</strong> تطبيق بواجهة أنيقة ظاهرياً، لكنه يعمل بمنطق خاطئ وفاسد من الداخل، وينهار عند أول حالة استخدام حقيقية.
          </p>
          <p>
            <strong>القاعدة الأساسية:</strong> إغلاق باب التخمين تماماً قبل كتابة سطر كود واحد؛ فنبدأ باستجواب الفكرة وحسم قراراتها عبر تقنية <code>Grill Me</code>، ثم توثيقها في وثيقة متطلبات <code>PRD.md</code> ومراجعتها نقدياً، ثم نمذجتها عبر <strong>المخططات الهندسية الثمانية (UML & ERD)</strong>، ومن ثم بناء نظام التصميم وتوليد كود الواجهات الأمامية.
          </p>
        </div>

        <h3>قواعد التعامل الذكي مع وكلاء الذكاء الاصطناعي (AI Agents)</h3>
        <p>
          الوكيل البرمجي (AI Agent في بيئات مثل Antigravity CLI أو Cursor) ليس مجرد روبوت محادثة (Chatbot) يجيب عن الأسئلة؛ بل هو وكيل يمتلك أدوات قراءة للملفات، والتعديل عليها، وتشغيل أوامر Terminal، والتصفح. للتعامل معه باحترافية يجب الالتزام بقاعدتين حاسمتين:
        </p>

        <div class="grid-2col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🛡️</span> 1. صلاحيات الأدوات (Tool Permissions)
            </h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7;">
              اسمح للأداة بقراءة ملفات المشروع بحرية لتكوين السياق، لكن <strong>أبقِ العمليات الحساسة</strong> (حذف الملفات، تعديل مخططات قواعد البيانات، أو تشغيل أوامر Terminal غير مألوفة) مشروطة <strong>بموافقتك اليدوية الصريحة</strong>. منح الوكيل صلاحية كاملة ومطلقة ليس شرطاً ليعمل جيداً، بل قد يمسح ساعات من العمل.
            </p>
          </div>

          <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🧠</span> 2. إدارة السياق ومستهلك الـ Tokens
            </h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7;">
              كلما طالت المحادثة زاد استهلاك الـ Tokens وفقد الوكيل تركيزه. بعد انتهاء كل مرحلة وحفظ مخرجها في مجلد <code>/docs</code>، افتح جلسة جديدة أو امسح السياق بأمر <code>/clear</code>، ومرر للأداة الملف المحفوظ (مثل <code>@docs/PRD.md</code>) ليكون <strong>هو المرجع الوحيد</strong> بدلاً من الاعتماد على ذاكرة الدردشة الطويلة المشوشة.
            </p>
          </div>
        </div>

        <div class="callout warning">
          <div class="callout-header">
            <span class="callout-icon">⚠️</span>
            <span>قاعدة ذهبية: الوثائق هي المرجع الوحيد (Single Source of Truth)</span>
          </div>
          <p>
            لا تعتمد على ذاكرة المحادثة الشفهية وحدها. الوثائق المكتوبة والمحفوظة داخل مجلد <code>docs/</code> هي المرجع الوحيد القابل للمراجعة والتدقيق والمساءلة الهندسية بين المالك والمصمم والمطور والمختبر.
          </p>
        </div>

        <!-- Master Pipeline Flowchart -->
        <div class="diagram-box">
          <h4>المسار الهندسي المعتمد لتحويل الفكرة إلى نظام برمجي متكامل</h4>
          <div class="mermaid">
flowchart LR
    A["1. استجواب الفكرة\nGrill Me"] --> B["2. وثيقة المتطلبات\nPRD.md"]
    B --> C["3. مسار المستخدم\nUser Flow"]
    C --> D["4. النمذجة الهندسية\nDomain + Use Case"]
    D --> E["5. تحليل السلوك\nActivity / Seq / State"]
    E --> F["6. هيكلة البيانات\nERD + Class Diagram"]
    F --> G["7. تصميم الواجهات\nGoogle Stitch & Design Tokens"]
    G --> H["8. جسر الكود\nStitch MCP & DESIGN.md"]
    H --> I["9. بناء الفرونت إند\nSpec Kit & UI/UX Pro Max"]
    I --> J["10. التحقق الشامل\nQA & GitHub Release"]

    classDef stage fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#93c5fd;
    classDef highlight fill:#1d4ed8,stroke:#60a5fa,stroke-width:2px,color:#fff;
    class A,B,F,G,I highlight;
    class C,D,E,H,J stage;
          </div>
          <div class="diagram-caption">
            الشكل (1): التسلسل الهندسي المعتمد لتحويل الفكرة إلى وثائق ومخططات متكاملة ثم واجهات وكود خاضع لضمان الجودة قبل النشر.
          </div>
        </div>

      </section>
`;
