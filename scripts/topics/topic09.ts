export const topic09Html = `
      <!-- ==================== TOPIC 09: STITCH MCP & DESIGN.MD ==================== -->
      <section id="topic-09" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 09</span>
          <span class="step-pill">الربط البرمجي بين التصميم والكود</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">بروتوكول Stitch MCP والتشريح المعماري لوثيقة DESIGN.md</h2>
            <div class="step-subtitle">الجسر الهندسي الإلزامي بين شاشات التصميم وكود الواجهات الأمامية المنفذ</div>
          </div>
        </div>

        <!-- 1. MCP Protocol Explanation -->
        <h3>بروتوكول سياق النموذج (Model Context Protocol - MCP)</h3>
        <p>
          يعد <strong>MCP</strong> معياراً مفتوحاً يمكّن نماذج الذكاء الاصطناعي داخل بيئات التطوير (مثل Antigravity IDE أو Cursor) من الاتصال بأدوات خارجية واسترجاع البيانات منها بشكل آمن ومباشر.
          من خلال خادم <strong>Stitch MCP</strong>، يستطيع وكيل الذكاء الاصطناعي قراءة شاشات التصميم، واستخراج شفرات الألوان والخطوط، وتحويل الأنماط البصرية مباشرة إلى ملفات توثيق وكود دون حاجة لنسخ ولصق يدوي معرض للأخطاء.
        </p>

        <!-- MCP Sequence Flow -->
        <div class="diagram-box">
          <h4>تسلسل الاتصال واستخراج عناصر التصميم عبر بروتوكول MCP</h4>
          <div class="mermaid">
sequenceDiagram
    autonumber
    participant Dev as المهندس (Developer)
    participant IDE as Antigravity IDE (Agent)
    participant MCP as Stitch MCP Server
    participant Cloud as Google Stitch Project
    participant Repo as docs/DESIGN.md

    Dev->>IDE: تشغيل برومبت استخراج قواعد التصميم
    IDE->>MCP: طلب فحص الشاشات: get_project_screens(projectId)
    MCP->>Cloud: جلب عقد التصميم، الألوان، ورموز التايبوجرافي
    Cloud-->>MCP: إرجاع بيانات التصميم البصرية (JSON Schema)
    MCP-->>IDE: تدفق عناصر التصميم والرموز البصرية
    IDE->>Repo: إنشاء وتوليد وثيقة docs/DESIGN.md المرجعية
    IDE-->>Dev: إشعار باكتمال توثيق نظام التصميم كعقد هندسي ملزم
          </div>
          <div class="diagram-caption">
            الشكل (11): بروتوكول MCP يربط بيئة التطوير بمشروع Google Stitch لاستخراج وتثبيت قواعد التصميم بدقة 100%.
          </div>
        </div>

        <!-- 2. Deep Dive: Architectural Dissection of DESIGN.md -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">D2</span>
            <div class="step-title-wrap">
              <h3 class="step-title">التشريح المعماري الكامل لملف DESIGN.md</h3>
              <div class="step-subtitle">لماذا تعد وثيقة DESIGN.md الجسر الإلزامي الذي يمنع خروج المبرمج عن هوية التصميم؟</div>
            </div>
          </div>

          <p>
            ملف <code>docs/DESIGN.md</code> ليس مجرد ملف نصي عادي، بل هو <strong>"الدستور البصري الحاكم"</strong> لكامل مرحلة الفرونت إند. عندما يبدأ المطور أو وكيل الذكاء الاصطناعي بكتابة مكونات React أو أصناف Tailwind CSS، <strong>يُحظر عليه تماماً كتابة ألوان أو مسافات اعتباطية (Hardcoded Values)</strong>، بل يجب استدعاء المتغيرات والرموز الموثقة في هذا الملف حصراً:
          </p>

          <div class="grid-2col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">1. الرموز اللونية (Color Tokens)</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                توثيق الأكواد السداسية (HEX) وقيم RGB لجميع درجات الواجهة (Primary, Secondary, Backgrounds, Semantic Alerts) وربطها بأسماء دلالية في Tailwind مثل <code>bg-brand-primary</code> و <code>text-status-warning</code>.
              </p>
            </div>

            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #10b981; margin-bottom: 0.5rem;">2. مصفوفة التايبوجرافي (Type Scale)</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                تحديد أحجام الخطوط، وأوزانها (Regular 400, Semi-Bold 600, Bold 700, Extra-Bold 800)، وارتفاعات الأسطر (Line Heights) لكل عنصر من عناوين الشاشات إلى نصوص التلميحات المساعدة.
              </p>
            </div>

            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">3. نظام المسافات والحواف (Spacing & Radius)</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                تثبيت مقاسات الهوامش الداخلية والخارجية المعتمدة (Paddings / Margins: 4px, 8px, 16px, 24px, 32px) ونصف قطر انحناء الحواف (Border Radius: sm 4px, md 8px, lg 12px, pill 9999px).
              </p>
            </div>

            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #a855f7; margin-bottom: 0.5rem;">4. معايير المكونات والظلال (Elevation & Shadows)</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                درجات الظلال الثلاثية الأبعاد للبطاقات والقوائم المنسدلة والنوافذ المنبثقة (Modals) لمنح الواجهة عمقاً بصرياً مريحاً للعين وتأكيد التسلسل الهرمي للمعلومات.
              </p>
            </div>
          </div>

          <!-- PROMPT FOR MCP EXTRACTION -->
          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 06 — استخراج شاشات التصميم وبناء وثيقة docs/DESIGN.md (Antigravity CLI / Cursor)</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as a Senior Design Systems Engineer and Frontend Architect.
Using the connected Stitch MCP server:

1. Inspect all generated screens for the BorrowHub project.
2. Extract all Design Tokens into a comprehensive specification document in "docs/DESIGN.md":
   - Color Palette (Primary, Secondary, Accent, Backgrounds, Semantic States) in HEX & HSL.
   - Typography Scale (Fonts, Sizes, Line Heights, Font Weights for Mobile & Desktop).
   - Spacing & Layout Tokens (8pt Grid System, Container Max Widths, Padding rules).
   - Component Specifications (Buttons, Form Inputs, Equipment Cards, Badges, Modals).
   - Elevation & Box Shadows for Light and Dark modes.
3. Generate "docs/STITCH_SCREEN_REFERENCES.md" mapping each screen to its user flow step and business rules.

Ensure the document is strictly structured so that frontend coding agents can use it as a deterministic reference.</code></pre>
          </div>
        </div>

      </section>

<section class="supplemental-content"><span class="supplemental-label">إثراء مقترح — من إعداد الموقع</span><h3>DESIGN.md كعقد لا كزينة</h3><p>أي قيمة لا يمكن تأكيدها من Stitch أو التصدير الحقيقي يجب أن تظهر كغير معروفة، لا أن تُملأ برقم جميل من الذاكرة.</p><div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">SUPPLEMENTAL PROMPT — Design Evidence</span><button class="copy-btn" type="button" aria-label="نسخ برومبت دليل DESIGN.md">نسخ</button></div><pre class="code-content"><code>Extract only design values supported by the provided Stitch export.
For each token include: name, value, source screen, confidence.
If a value is inaccessible, write UNKNOWN and explain what is missing.
Never infer a hex color or spacing value.</code></pre></div></section>
`;
