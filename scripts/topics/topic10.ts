export const topic10Html = `
      <!-- ==================== TOPIC 10: FRONTEND IMPLEMENTATION ==================== -->
      <section id="topic-10" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 10</span>
          <span class="step-pill">التخطيط الهندسي وتنفيذ الفرونت إند</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">التخطيط المعماري للواجهة الأمامية وتنفيذها بـ Spec Kit و UI/UX Pro Max</h2>
            <div class="step-subtitle">تفكيك المهام الذرية، دستور المشروع البرمجي، والتنفيذ التكراري الصارم دون هلوسة</div>
          </div>
        </div>

        <!-- 1. Small Verifiable Tasks -->
        <h3>خطة التنفيذ المعمارية وتفكيك المهام البرمجية الصغيرة (Small Verifiable Tasks)</h3>
        <p>
          السبب الأول لفشل مشاريع الذكاء الاصطناعي في مرحلة الفرونت إند هو تكليف الوكيل ببناء المشروع ككتلة واحدة ضخمة (Monolithic Task): <em>«ابنِ لي صفحات التطبيق كاملة مع الاتصال بالخادم!»</em>. النتيجة هي كود متقطع، ملفات مفقودة، وتوقف الوكيل في منتصف الطريق بسبب نفاد نافذة الذاكرة.
        </p>

        <div class="callout tip">
          <div class="callout-header">
            <span class="callout-icon">🧩</span>
            <span>استراتيجية التفكيك الذري (Atomic Task Breakdown)</span>
          </div>
          <p>
            الحل المعماري الاحترافي هو إعداد <strong>خطة تنفيذ مكتوبة مسبقاً</strong> تقسم العمل إلى مهام صغيرة جداً ومستقلة، لا تستغرق المهمة الواحدة أكثر من خطوة برمجية واحدة قابلة للاختبار الفوري عبر سطر الأوامر (مثل تشغيل <code>npm run build</code> أو <code>npx tsc --noEmit</code>).
            تسير الخطة بالتسلسل التالي:
          </p>
          <ol style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li>تأسيس هيكل المشروع، والمكتبات، ونظام الألوان والخطوط في <code>tailwind.config.ts</code>.</li>
            <li>بناء المكونات القاعدية المعزولة (UI Primitives: Button, Input, Badge, Card, Modal).</li>
            <li>بناء شريط التنقل العلوي والقائمة الجانبية مع إدارة الحالة (State Management).</li>
            <li>بناء شاشات تصفح المعدات ودمج بطاقات المعدات بحالاتها المتعددة.</li>
            <li>بناء نافذة طلب الاستعارة ونظام التحقق من القواعد والأخطاء.</li>
          </ol>
        </div>

        <!-- 2. Spec Kit Constitution & Rules -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">R1</span>
            <div class="step-title-wrap">
              <h3 class="step-title">دستور المشروع الهندسي وقواعد الكود (speckit-constitution & Project Rules)</h3>
              <div class="step-subtitle">تثبيت القواعد الصارمة التي تمنع وكيل الذكاء الاصطناعي من كسر معايير الجودة</div>
            </div>
          </div>

          <p>
            قبل السماح للوكيل بكتابة أي كود برمجي، يتم حقن ملف قواعد المشروع <code>docs/rules/frontend.md</code> ليكون بمثابة <strong>"الدستور البرمجي"</strong> الملزم. يتضمن هذا الدستور:
          </p>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>البند الدستوري</th>
                  <th>القاعدة الهندسية الصارمة</th>
                  <th>الأثر البرمجي</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>صرامة TypeScript</strong></td>
                  <td>يُحظر تماماً استخدام <code>any</code> أو <code>unknown</code> بدون فحص دلالي للنوع.</td>
                  <td>منع الأخطاء غير المتوقعة (Runtime Crashes) أثناء التشغيل.</td>
                </tr>
                <tr>
                  <td><strong>استدعاء الرموز</strong></td>
                  <td>يُحظر كتابة ألوان سداسية كودية اعتباطية؛ الاستدعاء حصراً من <code>DESIGN.md</code>.</td>
                  <td>اتساق الهوية البصرية بنسبة 100% ودعم الوضعين الليلي والنهاري.</td>
                </tr>
                <tr>
                  <td><strong>فصل المسؤوليات</strong></td>
                  <td>المكونات البصرية منفصلة عن منطق جلب البيانات وخطافات React (Custom Hooks).</td>
                  <td>كود نظيف، سهل الصيانة، وقابل لإعادة الاستخدام والاختبار.</td>
                </tr>
                <tr>
                  <td><strong>إمكانية الوصول (A11y)</strong></td>
                  <td>إلزامية إضافة وسوم <code>aria-label</code> و <code>role</code> والتباين الكافي للنصوص.</td>
                  <td>توافق تام مع معايير الويب العالمية وتجربة مستخدم رفيعة.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PROMPT FOR CONSTITUTION -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 07 — توليد دستور المشروع وقواعد الفرونت إند في docs/rules/frontend.md</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as a Senior Principal Frontend Architect.
Read "docs/PRD.md" and "docs/DESIGN.md".

Generate a comprehensive software engineering constitution in "docs/rules/frontend.md" containing:
1. Strict TypeScript Standards: No 'any', strict null checks, explicit component prop interfaces.
2. Design Token Integrity: Ban on arbitrary inline CSS and custom HEX codes; use Tailwind theme tokens only.
3. Component Hierarchy: Structure for Atomic UI Primitives, Composite Components, and Page Layouts.
4. Error & Empty State Mandate: Every view MUST handle Loading, Empty, and Error states explicitly.
5. Accessibility & Responsive Rules: Mobile-first responsive breakpoints (390px, 768px, 1024px, 1440px), Zero horizontal scrollbars.
6. Verification Command: The agent MUST verify code with "npx tsc --noEmit && npm run build" after every single component edit.</code></pre>
          </div>
        </div>

        <!-- 3. UI/UX Pro Max Review Protocol -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">R2</span>
            <div class="step-title-wrap">
              <h3 class="step-title">بروتوكول مراجعة الجودة البصرية بـ UI/UX Pro Max</h3>
              <div class="step-subtitle">التدقيق البصري الصارم لكل شاشة ومكون ومقارنتها بالتصميم الأصلي قبل الاعتماد</div>
            </div>
          </div>

          <p>
            أداة <strong>UI/UX Pro Max</strong> هي مستشار الجودة البصرية الذي يفحص الكود المنجز بعين ناقدة لا تجامل. بعد بناء كل مكون، يتم تشغيل بروتوكول المراجعة للتأكد من:
          </p>

          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
            <li><strong>الدقة البصرية (Pixel Precision):</strong> مطابقة الهوامش والمسافات ودرجات التباين لملف <code>DESIGN.md</code>.</li>
            <li><strong>تكامل الحالات التفاعلية:</strong> هل يتغير لون الزر عند الوقوف بالفأرة (Hover)، والضغط (Active)، والتعطيل (Disabled)؟</li>
            <li><strong>رسائل التنبيه والخطأ:</strong> هل تظهر رسائل التحذير بألوان واضحة ونصوص دلالية لا تجعل المستخدم تائهاً؟</li>
            <li><strong>سلاسة التجاوب (Mobile Polish):</strong> هل الأزرار والعناصر مريحة للمس بالإصبع على الهواتف الذكية (&ge; 44px)؟</li>
          </ul>

          <!-- PROMPT FOR UI/UX PRO MAX -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 08 — بروتوكول مراجعة الشاشات بـ UI/UX Pro Max (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as the Lead UI/UX Pro Max Reviewer.
Compare the implemented frontend component in "src/components/EquipmentCard.tsx" against "docs/DESIGN.md" and "docs/STITCH_SCREEN_REFERENCES.md".

Audit the following criteria:
1. Visual Fidelity: Exact font weight, line-height, and padding alignment.
2. Color Token Compliance: Verify no rogue hex colors were injected.
3. Interactive States: Inspect hover, focus-visible, and active transition animations.
4. Mobile Touch Targets: Ensure all clickable triggers meet minimum 44x44px standards.
5. Contrast Ratio: Verify foreground/background text contrast meets WCAG AA (minimum 4.5:1).

Output:
- PASS / FAIL score for each item.
- Specific Tailwind CSS code fixes for any defect identified.</code></pre>
          </div>
        </div>

      </section>
`;
