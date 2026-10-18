export const topic08Html = `
      <!-- ==================== TOPIC 08: UI/UX & GOOGLE STITCH ==================== -->
      <section id="topic-08" class="topic-section">
        <div class="step-badge-group">
          <span class="stage-tag">الموضوع 08</span>
          <span class="step-pill">تصميم الواجهات والأنظمة البصرية</span>
        </div>

        <div class="step-header">
          <div class="step-title-wrap">
            <h2 class="step-title">تصميم الواجهات وتوليد النظم البصرية (UI/UX Design & Google Stitch)</h2>
            <div class="step-subtitle">الانتقال من المخططات المجردة إلى شاشات متكاملة ونظام تصميم قياسي موحد</div>
          </div>
        </div>

        <!-- 1. The Design Philosophy -->
        <h3>الانتقال الهندسي من المخططات التجريدية إلى الشاشات التفاعلية</h3>
        <p>
          بعد حسم متطلبات PRD، ومسارات User Flow، والمخططات المعمارية، وقواعد البيانات في المراحل السابقة؛ نمتلك الآن الأساس الصلب لبناء الواجهات. لم يعد هناك أي مجال للتخمين أو التصميم العشوائي.
          نستخدم <strong>Google Stitch</strong> كمنصة تصميم توليدي احترافية مدعومة بنماذج الذكاء الاصطناعي لتحويل هذه المتطلبات إلى شاشات حقيقية ونظام تصميم (Design System) متكامل.
        </p>

        <!-- 2. Master Stitch Prompt -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">S1</span>
            <div class="step-title-wrap">
              <h3 class="step-title">البرومبت الرئيسي وتحديد التوجه البصري في Google Stitch</h3>
              <div class="step-subtitle">تأسيس المشروع وتحديد فلسفة التصميم والألوان والخطوط وهوية الواجهة</div>
            </div>
          </div>

          <p>
            يبدأ العمل في Google Stitch بصياغة برومبت تأسيسي فائق الدقة، يحدد هوية المنصة، والجمهور المستهدف، وفلسفة التصميم (Design Philosophy)، ولوحة الألوان الأولية:
          </p>

          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 05 — التأسيس البصري والتوجه العام في Google Stitch</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as a World-Class Principal Product Designer & Design Systems Architect.

Project: BorrowHub - University Equipment Borrowing Platform
Target Users: University Students & Laboratory / Warehouse Staff
Design Philosophy: Clean, trustworthy, academic-yet-modern SaaS aesthetic.
Primary Goal: Maximum clarity in equipment availability, active borrowing statuses, and instant reservation.

Visual Guidelines:
1. Color Palette:
   - Primary: Deep Academic Blue (#1e3a8a) representing trust and institution.
   - Accent: Energetic Emerald (#10b981) for available items and success actions.
   - Warning/Urgent: Warm Amber (#f59e0b) for pending approvals and 48h expiration countdowns.
   - Danger: Muted Crimson (#ef4444) for overdue alerts and rejected requests.
   - Background: Crisp Slate (#f8fafc) in light mode with pure dark slate (#0f172a) in dark mode.
2. Typography:
   - Modern Arabic & Latin pairing (Cairo / Inter), high contrast readability.
3. Component Hierarchy:
   - Equipment Card with instant badges (Available: X units, Reserved, In Maintenance).
   - Sticky Top Navbar with quick loan status pill badge.
   - Step-by-Step borrowing modal with real-time rule validation preview.

Generate the Initial Dashboard and Browse Equipment screens maintaining strict consistency with these tokens.</code></pre>
          </div>
        </div>

        <!-- 3. Building the Complete Design System -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">S2</span>
            <div class="step-title-wrap">
              <h3 class="step-title">بناء الـ Design System وتوليد الشاشات التفاعلية</h3>
              <div class="step-subtitle">الألوان، مقاييس الخطوط، المسافات، وحالات الشاشات (Active / Empty / Error)</div>
            </div>
          </div>

          <p>
            نظام التصميم هو المصدر الوحيد للحقيقة البصرية للمطورين. يجب أن يشمل:
          </p>

          <div class="grid-3col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0;">
            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: var(--brand-primary); margin-bottom: 0.5rem;">🎨 لوحة الألوان (Palette Tokens)</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                تحديد رموز الألوان كمتغيرات دلالية (Semantic Tokens): ألوان الواجهة الرئيسية، الخلفيات السطحية، والدرجات الوظيفية للنجاح والتحذير والخطأ لتسهيل دعم الوضعين النهاري والليلي.
              </p>
            </div>

            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #10b981; margin-bottom: 0.5rem;">📐 مقاييس التايبوجرافي والمسافات</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                اعتماد مقياس خطي متدرج (Type Scale: H1, H2, H3, Body, Small) بنسب ثابتة، ونظام مسافات قياسي قائم على شبكة الـ 8 بكسل (8px Grid System: 8, 16, 24, 32, 48px).
              </p>
            </div>

            <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #a855f7; margin-bottom: 0.5rem;">🔄 الحالات المتعددة (UI States)</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
                تصميم كل شاشة ومكون بكافة حالاته: الحالة الممتلئة (Default)، حالة التحميل (Skeleton/Loading)، الحالة الفارغة (Empty State)، وحالات الخطأ والرفض الصريحة.
              </p>
            </div>
          </div>

          <!-- SVG Wireframe Preview -->
          <div class="diagram-box">
            <h4>نموذج تخطيطي لشاشة تصفح واستعارة المعدات في BorrowHub</h4>
            <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
              <svg viewBox="0 0 800 420" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, sans-serif;" role="img" aria-label="رسم تخطيطي لواجهة تصفح واستعارة المعدات">
                <!-- Top Navbar -->
                <rect x="0" y="0" width="800" height="50" fill="#1e293b"/>
                <circle cx="30" cy="25" r="10" fill="#3b82f6"/>
                <text x="50" y="30" fill="#f8fafc" font-size="14" font-weight="bold">BorrowHub</text>
                <rect x="580" y="12" width="120" height="26" rx="13" fill="#334155"/>
                <text x="640" y="29" fill="#94a3b8" font-size="11" text-anchor="middle">طلبين نشطين (الحد الأقصى)</text>
                <circle cx="750" cy="25" r="14" fill="#3b82f6"/>
                <text x="750" y="30" fill="#fff" font-size="12" text-anchor="middle">طالب</text>

                <!-- Search & Filters Bar -->
                <rect x="30" y="70" width="480" height="40" rx="6" fill="#1e293b" stroke="#334155"/>
                <text x="50" y="95" fill="#64748b" font-size="12">🔍 ابحث عن كاميرا، لابتوب، جهاز عرض...</text>
                <rect x="530" y="70" width="110" height="40" rx="6" fill="#1e293b" stroke="#334155"/>
                <text x="585" y="95" fill="#94a3b8" font-size="12" text-anchor="middle">التصنيف: الكل</text>
                <rect x="660" y="70" width="110" height="40" rx="6" fill="#10b981"/>
                <text x="715" y="95" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">+ طلب جديد</text>

                <!-- Equipment Cards Grid -->
                <!-- Card 1 -->
                <rect x="30" y="130" width="225" height="250" rx="8" fill="#1e293b" stroke="#334155"/>
                <rect x="30" y="130" width="225" height="120" rx="8" fill="#334155"/>
                <text x="142" y="195" fill="#64748b" font-size="14" text-anchor="middle">📷 صورة الكاميرا</text>
                <text x="45" y="275" fill="#f8fafc" font-size="14" font-weight="bold">Sony Alpha A7 IV</text>
                <text x="45" y="295" fill="#94a3b8" font-size="11">معدات الوسائط والتصوير</text>
                <rect x="45" y="310" width="85" height="20" rx="4" fill="#064e3b"/>
                <text x="87" y="324" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">متاح: 4 وحدات</text>
                <rect x="45" y="340" width="195" height="28" rx="4" fill="#3b82f6"/>
                <text x="142" y="358" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">استعارة المعدة</text>

                <!-- Card 2 -->
                <rect x="285" y="130" width="225" height="250" rx="8" fill="#1e293b" stroke="#334155"/>
                <rect x="285" y="130" width="225" height="120" rx="8" fill="#334155"/>
                <text x="397" y="195" fill="#64748b" font-size="14" text-anchor="middle">💻 صورة اللابتوب</text>
                <text x="300" y="275" fill="#f8fafc" font-size="14" font-weight="bold">MacBook Pro 16 M3</text>
                <text x="300" y="295" fill="#94a3b8" font-size="11">معامل الحوسبة والذكاء</text>
                <rect x="300" y="310" width="85" height="20" rx="4" fill="#451a03"/>
                <text x="342" y="324" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">متاح: 1 وحدة فقط</text>
                <rect x="300" y="340" width="195" height="28" rx="4" fill="#3b82f6"/>
                <text x="397" y="358" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">استعارة المعدة</text>

                <!-- Card 3 -->
                <rect x="540" y="130" width="225" height="250" rx="8" fill="#1e293b" stroke="#334155"/>
                <rect x="540" y="130" width="225" height="120" rx="8" fill="#334155"/>
                <text x="652" y="195" fill="#64748b" font-size="14" text-anchor="middle">📽️ صورة البروجكتور</text>
                <text x="555" y="275" fill="#f8fafc" font-size="14" font-weight="bold">Epson 4K Projector</text>
                <text x="555" y="295" fill="#94a3b8" font-size="11">قاعات العروض والمدرجات</text>
                <rect x="555" y="310" width="85" height="20" rx="4" fill="#450a0a"/>
                <text x="597" y="324" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">غير متاح حالياً</text>
                <rect x="555" y="340" width="195" height="28" rx="4" fill="#334155"/>
                <text x="652" y="358" fill="#64748b" font-size="12" text-anchor="middle">محجوز بالكامل</text>
              </svg>
            </div>
            <div class="diagram-caption">
              الشكل (10): مخطط هيكلي بصري يوضح ترجمة قواعد العمل (المخزون، الرصيد، والحد الأقصى) إلى عناصر واجهة صريحة.
            </div>
          </div>
        </div>

        <!-- 4. Google AI Studio to Stitch to Frontend Workflow -->
        <div class="step-card" style="margin-top: 2rem;">
          <div class="step-header">
            <span class="step-number">S3</span>
            <div class="step-title-wrap">
              <h3 class="step-title">من Google AI Studio إلى Google Stitch ثم تنفيذ الواجهة</h3>
              <div class="step-subtitle">حلّل المتطلبات أولاً، اعتمد التصميم ثانياً، ثم نفّذ Frontend صغيراً وقابلاً للتحقق</div>
            </div>
          </div>

          <div class="callout tip">
            <div class="callout-header">
              <span class="callout-icon">→</span>
              <span>المسار المعتمد: AI Studio → Stitch → DESIGN.md → Frontend Plan → GitHub</span>
            </div>
            <p>
              لا نبدأ بطلب «ابنِ التطبيق كاملًا». نستخدم Google AI Studio لتحليل <code>PRD.md</code> واستخراج الشاشات والحالات وقواعد العمل، ثم نستخدم Google Stitch لاستكشاف الواجهة وتثبيت اللغة البصرية، وبعد اعتماد شاشة ممثلة نوثق القيم في <code>DESIGN.md</code> وننفذ مكوّناً أو شاشة واحدة في كل دورة.
            </p>
          </div>

          <h4>أولاً: جلسة التحليل في Google AI Studio</h4>
          <ol style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.9;">
            <li>افتح <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer">Google AI Studio</a> من الهاتف أو اللاب، وأرفق نسخة من <code>PROJECT_CONTEXT.md</code> و<code>PRD.md</code> دون مفاتيح أو أسرار.</li>
            <li>اطلب استخراج جدول الشاشات، هدف كل شاشة، المستخدم المستهدف، المدخلات، الحالات، ورسائل النجاح والفشل.</li>
            <li>اطلب تحويل القواعد المؤكدة إلى متطلبات واجهة قابلة للملاحظة، مع فصل المؤكد عن الافتراضات والأسئلة المفتوحة.</li>
            <li>احفظ الناتج في <code>docs/FRONTEND_DISCOVERY.md</code> وراجعه يدويًا قبل إرساله إلى Stitch.</li>
          </ol>

          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 05A — تحليل الواجهة في Google AI Studio</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Act as a Product Designer and Senior Frontend Architect.
Read PROJECT_CONTEXT.md and PRD.md.

Do not write application code and do not invent backend behavior.
Create a frontend discovery brief containing:
1. User roles and the primary goal of each role.
2. A screen inventory with route, purpose, entry point, and exit action.
3. Required states for every screen: loading, empty, error, success, disabled, and permission denied.
4. Business rules that must be visible in the UI.
5. Open questions and assumptions that require approval.
6. A recommended order for designing the screens in Stitch.

Output only docs/FRONTEND_DISCOVERY.md content in clear Markdown.</code></pre>
          </div>

          <h4>ثانياً: تحويل الاكتشاف إلى تصميم في Stitch</h4>
          <p>
            في <a href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer">Google Stitch</a> أنشئ مشروعًا جديدًا وابدأ بشاشة ممثلة واحدة، مثل شاشة Browse Equipment أو Dashboard. أرفق وصف الشاشة أو wireframe، ثم ثبّت اتجاه RTL، نوع الخط، أحجام اللمس، الألوان الدلالية، وحالات الشاشة قبل توليد بقية الشاشات. يمكن أن يساعد Stitch في توليد واجهات Web وMobile من نص أو صورة، لكن الناتج يحتاج مراجعة بشرية ولا يُعد Backend أو عقد بيانات نهائيًا.
          </p>

          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 05B — توليد شاشة ممثلة في Stitch</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Design one representative responsive screen for the approved product requirements.
Product: BorrowHub university equipment borrowing platform.
Screen: Browse Equipment.
Users: approved university students.
Direction: Arabic RTL with clear Latin labels where technical names are required.

Show only behaviors confirmed in the requirements:
- search and category filtering;
- equipment availability and maintenance status;
- maximum active-loan rule;
- clear action for starting a borrowing request.

Create all required states: default, loading, empty search result, unavailable item, error, and success feedback.
Use an academic, trustworthy visual style and a consistent 8px spacing system.
Do not add payments, chat, notifications, login flows, or backend data that are not in the PRD.
Return a screen structure, design tokens, and component inventory for review.</code></pre>
          </div>

          <h4>ثالثاً: الاعتماد والتوثيق قبل كتابة الكود</h4>
          <ul style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.9;">
            <li>اعتمد شاشة واحدة ومكوّناتها قبل توليد بقية الشاشات.</li>
            <li>انقل القيم المعتمدة إلى <code>docs/DESIGN.md</code>: الألوان، الخطوط، المسافات، الحواف، الظلال، نقاط التوقف، وحالات المكونات.</li>
            <li>أنشئ <code>docs/STITCH_SCREEN_REFERENCES.md</code> لربط كل شاشة بمسار المستخدم وقواعد <code>PRD.md</code>.</li>
            <li>استخدم خيار تصدير Frontend أو النقل إلى Figma أو <a href="https://stitch.withgoogle.com/docs/mcp/setup" target="_blank" rel="noreferrer">Stitch MCP</a> عندما يكون متاحًا في حسابك وبيئة التطوير.</li>
          </ul>

          <h4>رابعاً: تنفيذ Frontend على مراحل</h4>
          <ol style="margin: 0.5rem 0 1rem 1.5rem; line-height: 1.9;">
            <li><strong>Phase 1 — Foundation:</strong> إعداد Next.js، الخطوط، Direction، Design Tokens، وملف قواعد الواجهة.</li>
            <li><strong>Phase 2 — Primitives:</strong> بناء Button وInput وBadge وCard وModal مع حالات التركيز والتعطيل.</li>
            <li><strong>Phase 3 — Representative screen:</strong> تنفيذ شاشة واحدة ببيانات Mock مطابقة لعقد البيانات.</li>
            <li><strong>Phase 4 — States:</strong> إضافة Loading وEmpty وError وSuccess وPermission Denied.</li>
            <li><strong>Phase 5 — Expansion:</strong> تكرار النمط للشاشات التالية فقط بعد مراجعة الشاشة الممثلة.</li>
            <li><strong>Phase 6 — Verification:</strong> تشغيل TypeScript وBuild وفحص RTL وResponsive وWCAG وZero Overflow.</li>
          </ol>

          <div class="callout warning">
            <div class="callout-header">
              <span class="callout-icon">!</span>
              <span>الـTokens والأمان</span>
            </div>
            <p>
              لا يوجد وعد عام بأن استخدام Stitch أو AI Studio لا يستهلك أي quota؛ راجع حدود حسابك وصفحة Usage في AI Studio. إذا استُخدم Gemini API، فالمفتاح سرّ ولا يوضع داخل Frontend أو GitHub، بل في متغيرات بيئة على خادم آمن أو Backend proxy. لا ترفع ملفات <code>.env</code> أو أي مفتاح إلى المستودع.
            </p>
          </div>

          <div class="code-container">
            <div class="code-header">
              <span class="code-lang">PROMPT 05C — تحويل التصميم المعتمد إلى خطة تنفيذ</span>
              <button class="copy-btn" onclick="copyCode(this)" title="نسخ البرومبت">نسخ البرومبت</button>
            </div>
            <pre class="code-content"><code>Read PRD.md, docs/DESIGN.md, and docs/STITCH_SCREEN_REFERENCES.md.
Create:
- docs/FRONTEND_PLAN.md
- docs/FRONTEND_TASKS.md
- docs/ROUTES_MAP.md
- docs/COMPONENT_ARCHITECTURE.md
- docs/FRONTEND_DATA_CONTRACTS.md

For each task specify: files, dependencies, input contract, acceptance criteria, verification command, and visual reference.
Choose only the first task that is ready. Do not implement backend, authentication, payments, or API calls unless explicitly confirmed in PRD.md.
After implementation, run the available checks and stop for review.</code></pre>
          </div>

          <h4>العمل من الهاتف واللاب ثم المزامنة</h4>
          <p>
            الهاتف مناسب لفتح AI Studio وStitch، مراجعة التصميم، اعتماد المخرجات، ومتابعة Commits وIssues وPull Requests. تنفيذ Frontend طويل وتشغيل Build وفحص Responsive أفضل على اللاب أو Cloud IDE. بعد كل دورة اعمل Commit وPush إلى GitHub، وعند الانتقال إلى جهاز آخر نفّذ Pull قبل التعديل، ولا تعمل على نسختين متعارضتين في الوقت نفسه.
          </p>
        </div>

      </section>

<section class="supplemental-content"><span class="supplemental-label">إثراء مقترح — من إعداد الموقع</span><h3>شاشة واحدة قبل النظام كله</h3><p>اعتمد شاشة MVP ممثلة أولًا، ثم ثبّت اللغة البصرية والحالات التفاعلية. لا تطلب من Stitch إنتاج كل الشاشات قبل مراجعة الشاشة المرجعية.</p><div class="code-container" dir="ltr"><div class="code-header"><span class="code-lang">SUPPLEMENTAL PROMPT — One Screen First</span><button class="copy-btn" type="button" aria-label="نسخ برومبت شاشة واحدة في Stitch">نسخ</button></div><pre class="code-content"><code>Design one representative MVP screen only.
Use the approved role, content hierarchy, RTL requirements, and documented states.
Show loading, empty, error, and success states as notes without inventing features.
Stop after this screen and list decisions that need approval.</code></pre></div></section>
`;
