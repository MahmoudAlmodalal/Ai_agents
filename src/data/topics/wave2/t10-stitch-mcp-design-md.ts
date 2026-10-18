import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 28: STITCH MCP & DESIGN RETRIEVAL (ربط Stitch MCP واسترجاع مراجع التصميم)
 * Sequence Position: 28
 * ========================================================================= */
export const topic28StitchMcpHtml = `
<section id="topic-28-stitch-mcp" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 28 · أدوات التنفيذ والتصميم</span>
    <span class="step-pill">تكامل Stitch MCP وحوكمة الأسرار والبديل اليدوي</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">ربط Stitch MCP واسترجاع مراجع التصميم البصري</h2>
      <div class="step-subtitle">قراءة بيانات الشاشات المعتمدة بأمان دون تسريب المفاتيح وتوفير البديل اليدوي الكامل عند تعذر الاتصال</div>
    </div>
  </div>

  <!-- 1. The Right Place in the Learning Sequence -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. التموضع الهندسي الصحيح: لماذا يأتي ربط Stitch MCP هنا تحديداً؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مسارنا الهندسي، لا نربط الأدوات اعتباطياً أو قبل أوانها. ربط <strong>خادم Stitch MCP (Model Context Protocol)</strong> يأتي في هذه المحطة فقط بعد اكتمال ركنين أساسيين:
    </p>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-2">
      <li><strong>التصميم المعتمد في Google Stitch (المواضيع 21 و22 و23):</strong> حيث صممنا الشاشة المرجعية، واستخرجنا قواعد نظام التصميم، واختبرنا النموذج التفاعلي (Interactive Prototype). خادم Stitch MCP أداة <em>قراءة واسترجاع</em> لأصول تصميم موجودة بالفعل؛ فلا معنى لمحاولة ربطه قبل وجود مشروع وتصميم معتمد لقراءته.</li>
      <li><strong>أسس بروتوكول MCP وبيئة وكيل البرمجة (المواضيع 24 و27):</strong> حيث جهّزنا وكيل البرمجة المستقل وفهمنا معمارية MCP (المضيف، العميل، الخادم) وحوكمة الصلاحيات وإدارة الأسرار المحلية.</li>
    </ol>
    <p class="leading-8 text-[var(--text-muted)] mt-3">
      بهذا الترتيب المحكم، ينتقل الطالب من مرحلة «التصميم في بيئة المتصفح» إلى مرحلة «استرجاع بيانات التصميم الهندسية (Design Metadata) إلى بيئة التطوير المحلية» تمهيداً لصياغة وثيقة <code>DESIGN.md</code> والبدء في برمجة واجهة المستخدم بالـ Next.js.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>وظيفة Stitch MCP في مسار الطالب</span>
      </div>
      <p class="leading-7">
        يسمح خادم Stitch MCP لوكيل البرمجة (Coding Agent) بقراءة معرّفات الشاشات المعتمدة، وبيانات الألوان والخطوط والمسافات والحواف مباشرة من مشروع Google Stitch، دون الحاجة لنسخها ولصقها يدويًا عبر النوافذ، مما يمنع الانجراف البصري والتخمين العشوائي.
      </p>
    </div>
  </div>

  <!-- 2. Secrets Management & Key Isolation -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. إدارة أسرار الاتصال بأمان وحظر تسريب المفاتيح</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يتطلب الاتصال بخدمات السحابة ومشاريع Stitch في بعض البيئات مفتاح وصول برمجياً (API Key / Auth Token). تفرض معايير هندسة البرمجيات الآمنة قاعدة قطعية: <strong>حظر تسريب أو كتابة المفاتيح السرية في ملفات المستودع أو ملفات التوثيق</strong>.
    </p>
    
    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">🛑</span>
        <span>خط أحمر أمني: لا تضع المفاتيح الحقيقية مطلقاً</span>
      </div>
      <p class="leading-7">
        لا تضع مفتاح Stitch API أو أي سر برمجي داخل ملفات <code>PRD.md</code> أو <code>README.md</code> أو أمثلة التكوين، وتجنب تماماً طباعتها في سجلات الطرفية أو محادثات الوكيل. نستخدم حصراً علامات حجز عامة مثل <code>&lt;YOUR_STITCH_API_KEY&gt;</code> في كافة الأمثلة التعليمية.
      </p>
    </div>

    <p class="leading-8 text-[var(--text-muted)] mt-3">
      تُدار أسرار خادم Stitch MCP محلياً على جهاز المطور عبر إحدى طريقتين آمنتين:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>ملف إعدادات المضيف المحلي (Host MCP Config):</strong> مثل ملف تكوين Antigravity IDE أو المحرر الداعم لـ MCP، ويكون مخزناً خارج مستودع الكود في المجلد المحلي للمستخدم.</li>
      <li><strong>المتغيرات البيئية المعزولة (Environment Variables):</strong> عبر ملف <code>.env.local</code> الخاضع لقواعد الاستبعاد في <code>.gitignore</code>.</li>
    </ul>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">json</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ نموذج الإعداد';},2000);})" aria-label="نسخ نموذج إعداد خادم Stitch MCP">نسخ نموذج الإعداد</button>
      </div>
      <pre class="code-content"><code>// Local MCP Configuration Template (e.g. ~/.antigravity/mcp_settings.json)
// NEVER commit this file with real keys to Git repository!
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@google/stitch-mcp-server"],
      "env": {
        "STITCH_API_KEY": "&lt;YOUR_STITCH_API_KEY&gt;",
        "STITCH_PROJECT_ID": "&lt;YOUR_STITCH_PROJECT_ID&gt;"
      }
    }
  }
}</code></pre>
    </div>
  </div>

  <!-- 3. Connection Verification Prompt (PROMPT 22) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. برومبت التحقق من الاتصال وقراءة الشاشات (PROMPT 22)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      قبل استخراج أي توكنز أو تعديل ملفات، نختبر خادم Stitch MCP ببرومبت فحص مخصص ومقيد الصلاحيات. الهدف هو التحقق من نجاح الربط، وحصر معرّفات الشاشات المعتمدة، مع اشتراط عدم إنشاء أو تعديل أي شاشة، والتأكيد الصريح على عدم طباعة أي مفاتيح سرية في المخرجات:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">text</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 22">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Use the connected Stitch MCP server.
List my Stitch projects and screen identifiers. Verify the intended project
and its approved screens. Do not create, update or delete anything.
If access is unavailable, report the missing connection or permissions.
Never output or expose API keys.</code></pre>
    </div>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>ضابط الأمان في البرومبت</th>
            <th>الشرط الإلزامي</th>
            <th>الهدف الهندسي</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>قراءة فقط (Read-only)</strong></td>
            <td><code>Do not create, update or delete anything</code></td>
            <td>منع العبث بالشاشات المعتمدة في Stitch وحمايتها من التعديل غير المقصود</td>
          </tr>
          <tr>
            <td><strong>حظر تسريب المفاتيح</strong></td>
            <td><code>Never output or expose API keys</code></td>
            <td>ضمان عدم تسريب الـ API Key في محادثة الوكيل أو ملفات التوثيق</td>
          </tr>
          <tr>
            <td><strong>الإبلاغ الصريح عن الأخطاء</strong></td>
            <td><code>If access is unavailable, report missing connection</code></td>
            <td>تجنب السقوط الصامت وتفعيل المسار البديل اليدوي فوراً عند تعذر الاتصال</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Complete Manual Fallback Path -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. المسار البديل اليدوي الكامل: عندما يتعذر الاتصال بـ Stitch MCP</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من أهم مبادئ مسارنا التعليمي: <strong>لا شيء يوقف تقدم الطالب</strong>. إذا تعذر ربط خادم Stitch MCP بسبب قيود في الشبكة، أو عدم توفر مفتاح API، أو انتهاء الحصص، أو استخدام بيئة عمل لا تدعم بروتوكول MCP، فإن الطالب يمتلك مساراً بديلاً يدوياً (Manual Fallback Path) موثقاً وواضحاً بالكامل:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الخطوة اليدوية</th>
            <th>الإجراء في واجهة Google Stitch</th>
            <th>الملف والموضع في مشروع الطالب</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. تصدير لقطات الشاشات</strong></td>
            <td>افتح الشاشة المعتمدة في Stitch ثم اختر Export كصورة PNG عالية الدقة</td>
            <td>احفظها في <code>docs/assets/screens/screen-XX.png</code></td>
          </tr>
          <tr>
            <td><strong>2. استخراج أكواد الألوان</strong></td>
            <td>استخدم أداة فحص الألوان (Inspect / Eyedropper) لاستخراج قيم Hex للألوان الأساسية والسطوح والحدود</td>
            <td>دوّنها في جدول المراجع بملف <code>docs/STITCH_SCREEN_REFERENCES.md</code></td>
          </tr>
          <tr>
            <td><strong>3. استخراج أحجام الخطوط والمسافات</strong></td>
            <td>سجّل أحجام النصوص الرئيسية (Heading, Body) والمسافات البينية (Padding/Gap)</td>
            <td>دوّنها كقيم مرجعية تمهيداً لنقلها إلى <code>DESIGN.md</code></td>
          </tr>
          <tr>
            <td><strong>4. تسجيل روابط ومعرفات الشاشات</strong></td>
            <td>انسخ رابط مشاركة الشاشة (Share Link) أو معرّف الشاشة من شريط العنوان في Stitch</td>
            <td>وثقها مع حالة الاعتماد في <code>docs/STITCH_SCREEN_REFERENCES.md</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout tip my-4">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>النتيجة التعليمية واحدة في المسارين</span>
      </div>
      <p class="leading-7">
        سواء تم استرجاع مراجع التصميم آلياً عبر خادم Stitch MCP أو يدوياً عبر التصدير وفحص الواجهة، فإن المخرج النهائي واحد تماماً: ملف <code>docs/STITCH_SCREEN_REFERENCES.md</code> متكامل يوفر لوكيل البرمجة المعطيات البصرية الدقيقة لصياغة <code>DESIGN.md</code> دون أي تخمين.
      </p>
    </div>
  </div>

  <!-- 5. Architecture SVG Diagram -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. المخطط المعماري لسير عمل Stitch MCP وعزل الأسرار</h3>
    <p class="leading-8 text-[var(--text-muted)] mb-4">
      يوضح المخطط التالي تدفق الاتصال الآمن بين وكيل البرمجة وخادم Stitch MCP وعزل المفاتيح، إلى جانب المسار البديل اليدوي المستقل:
    </p>

    <div class="diagram-box my-6">
      <svg viewBox="0 0 800 370" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مخطط معمارية ربط Stitch MCP وإدارة الأسرار والبديل اليدوي">
        <desc>مخطط يوضح تدفق قراءة مراجع التصميم من Google Stitch عبر خادم MCP الآمن والمسار البديل اليدوي</desc>
        <defs>
          <linearGradient id="mcpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#0369a1" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <linearGradient id="fallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#b45309" />
          </linearGradient>
        </defs>

        <!-- Background Container -->
        <rect x="10" y="10" width="780" height="350" rx="16" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="2" />

        <!-- Security Boundary (Local Machine) -->
        <rect x="30" y="30" width="460" height="200" rx="12" fill="var(--bg-card-subtle)" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="6,4" />
        <text x="50" y="55" fill="#0284c7" font-size="12" font-weight="bold" font-family="sans-serif">منطقة الجهاز المحلي الآمنة (Local Safe Zone - No Leaks)</text>

        <!-- Coding Agent Box -->
        <rect x="50" y="80" width="160" height="120" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.5" />
        <text x="130" y="115" fill="var(--text-main)" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">وكيل البرمجة</text>
        <text x="130" y="135" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="sans-serif">(Coding Agent)</text>
        <rect x="65" y="150" width="130" height="30" rx="4" fill="var(--bg-card-subtle)" stroke="var(--border-color)" />
        <text x="130" y="170" fill="var(--text-main)" font-size="10" text-anchor="middle" font-family="sans-serif">PROMPT 22 (Read-only)</text>

        <!-- Local MCP Server Box -->
        <rect x="290" y="80" width="180" height="120" rx="8" fill="url(#mcpGrad)" stroke="#0284c7" stroke-width="1.5" />
        <text x="380" y="115" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">خادم Stitch MCP المحلي</text>
        <text x="380" y="135" fill="#e0f2fe" font-size="11" text-anchor="middle" font-family="sans-serif">mcp_settings.json</text>
        <rect x="305" y="150" width="150" height="32" rx="4" fill="#0c4a6e" />
        <text x="380" y="170" fill="#38bdf8" font-size="10" text-anchor="middle" font-family="monospace">🔒 &lt;YOUR_API_KEY&gt;</text>

        <!-- Google Stitch Cloud API Box -->
        <rect x="570" y="80" width="190" height="120" rx="8" fill="url(#cloudGrad)" stroke="#059669" stroke-width="1.5" />
        <text x="665" y="115" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Google Stitch Cloud</text>
        <text x="665" y="135" fill="#d1fae5" font-size="11" text-anchor="middle" font-family="sans-serif">المشروع والشاشات المعتمدة</text>
        <text x="665" y="165" fill="#a7f3d0" font-size="10" text-anchor="middle" font-family="sans-serif">Design Metadata &amp; Screen IDs</text>

        <!-- Connections (Automated Path) -->
        <line x1="210" y1="140" x2="290" y2="140" stroke="#0284c7" stroke-width="2" />
        <text x="250" y="130" fill="var(--text-muted)" font-size="9" text-anchor="middle">طلب آمن</text>

        <line x1="470" y1="140" x2="570" y2="140" stroke="#059669" stroke-width="2" />
        <text x="520" y="130" fill="var(--text-muted)" font-size="9" text-anchor="middle">استرجاع Metadata</text>

        <!-- Output Deliverable File Box -->
        <rect x="230" y="260" width="340" height="75" rx="8" fill="var(--bg-surface)" stroke="#059669" stroke-width="2" />
        <text x="400" y="290" fill="#059669" font-size="14" font-weight="bold" text-anchor="middle" font-family="monospace">docs/STITCH_SCREEN_REFERENCES.md</text>
        <text x="400" y="315" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="sans-serif">المخرج المعتمد: جرد معرّفات الشاشات وروابطها وقيمها الحقيقية</text>

        <!-- Downward line to deliverable -->
        <line x1="380" y1="200" x2="380" y2="260" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,4" />

        <!-- Manual Fallback Box & Path -->
        <rect x="50" y="260" width="160" height="75" rx="8" fill="url(#fallbackGrad)" stroke="#d97706" stroke-width="1.5" />
        <text x="130" y="285" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">البديل اليدوي</text>
        <text x="130" y="305" fill="#fef3c7" font-size="10" text-anchor="middle" font-family="sans-serif">تصدير يدوي للشاشات</text>
        <text x="130" y="322" fill="#fef3c7" font-size="9" text-anchor="middle" font-family="sans-serif">في حال تعذر خادم MCP</text>

        <!-- Line from Fallback to Deliverable -->
        <line x1="210" y1="298" x2="230" y2="298" stroke="#d97706" stroke-width="2" />
      </svg>
    </div>
  </div>

  <!-- 6. Tool Reference & Availability Table -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">6. مراجع الأدوات الرسمية وحالة التوفر الفعلية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نلتزم بالشفافية المطلقة في توثيق حالة كل أداة ومسار بديل، دون اختراع روابط أو ادعاء توفر خدمات غير مؤكدة:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الأداة / المرجع</th>
            <th>الوظيفة والربط</th>
            <th>الرابط الرسمي المعتمد</th>
            <th>حالة التوفر الفعلي والتوجيه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google Stitch</strong></td>
            <td>بيئة تصميم الواجهات والشاشات المعتمدة</td>
            <td><a href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">stitch.withgoogle.com</a></td>
            <td><span class="badge-available">متاح رسميًا من Google</span> (بحساب Google شخصي أو مؤسسي)</td>
          </tr>
          <tr>
            <td><strong>Google Codelab: Design to Code</strong></td>
            <td>دليل Google الإرشادي لربط Antigravity وStitch MCP</td>
            <td><a href="https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch?hl=ar" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">codelabs.developers.google.com</a></td>
            <td><span class="badge-available">توثيق مرجعي متاح</span> (دليل رسمي بالعربية لشرح خطوات التكامل)</td>
          </tr>
          <tr>
            <td><strong>خادم Stitch MCP Server</strong></td>
            <td>بروتوكول سياق النموذج لقراءة الشاشات برمجياً</td>
            <td><span class="text-[var(--text-muted)]">حزمة npm / تكامل IDE</span></td>
            <td><span class="badge-available">خيار مدعوم</span> (يعتمد على دعم بيئة الطالب للملحق؛ وإلا يُعتمد البديل اليدوي)</td>
          </tr>
          <tr>
            <td><strong>المسار البديل اليدوي</strong></td>
            <td>تصدير الصور وقيم الألوان والخطوط يدوياً</td>
            <td><span class="text-[var(--text-muted)]">مسار محلي كامل</span></td>
            <td><span class="badge-conditional">مسار بديل متاح دائمًا</span> (يعمل بنسبة 100% ولا يحتاج أي مفتاح اتصال أو إعدادات سحابية)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 7. Deliverable Output Template -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">7. المخرج العملي: ملف وثيقة مراجع الشاشات (STITCH_SCREEN_REFERENCES.md)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الهدف العملي من هذا الموضوع هو إنتاج ملف <code>docs/STITCH_SCREEN_REFERENCES.md</code> في مستودع مشروعك، ليصبح الجسر الحقيقي الذي يربط التصميم بكود الواجهة:
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">markdown</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ النموذج';},2000);})" aria-label="نسخ نموذج STITCH_SCREEN_REFERENCES.md">نسخ النموذج</button>
      </div>
      <pre class="code-content"><code># Stitch Screen References &amp; Design Assets

## Project Overview
- **Project Name:** BorrowHub Equipment Share (أو مشروع الطالب الخاص)
- **Stitch Project ID:** stitch-proj-borrowhub-mvp
- **Connection Mode:** Stitch MCP Sync (أو Manual Export Fallback)
- **Last Verification Date:** 2026-10-18
- **Read-only Safety Verified:** Yes (No write/delete mutations performed)

## Approved Screens Inventory
| Screen ID | Screen Name (AR) | Role / Route | Stitch Screen URL / Asset Path | Status |
|-----------|------------------|--------------|--------------------------------|--------|
| SCREEN-01 | تصفح واستعارة المعدات | Member / /items | stitch://screen/browse-01 أو docs/assets/screens/browse.png | Approved ✓ |
| SCREEN-02 | تفاصيل المعدة وطلب الحجز | Member / /items/[id] | stitch://screen/detail-02 أو docs/assets/screens/detail.png | Approved ✓ |
| SCREEN-03 | نافذة تأكيد مدة الاستعارة | Member / Modal | stitch://screen/modal-03 أو docs/assets/screens/modal.png | Approved ✓ |
| SCREEN-04 | لوحة تحكم المشرف وإدارة الطلبات | Admin / /admin/loans | stitch://screen/admin-04 أو docs/assets/screens/admin.png | Approved ✓ |

## Confirmed Primary Palette Sample (For Verification)
- **Primary Brand:** #059669 (Emerald 600)
- **Surface Background:** #f8fafc (Slate 50)
- **Text Main:** #0f172a (Slate 900)
- **Status Warning:** #d97706 (Amber 600)

## Security &amp; Keys Declaration
- No API keys or authorization tokens are stored in this document or repository.
- Local MCP connection configured via user-level environment settings.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 29: DESIGN.MD SPECIFICATION (وثيقة التصميم DESIGN.md)
 * Sequence Position: 29
 * ========================================================================= */
export const topic29DesignMdHtml = `
<section id="topic-29-design-md" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 29 · أنظمة وقواعد التصميم</span>
    <span class="step-pill">صياغة وثيقة DESIGN.md القياسية واستخراج التوكنز</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة</h2>
      <div class="step-subtitle">توثيق رموز وهوية التصميم الحقيقية من مراجع الشاشات دون اختراع هوية جديدة أو استبدال المتطلبات</div>
    </div>
  </div>

  <!-- 1. The Core Principle: Real Confirmed Values Only -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. المبدأ الهندسي الصارم: توثيق القيم المعتمدة فعلياً لا هوية متخيلة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تُعد وثيقة <strong>DESIGN.md</strong> «العقد البصري الإلزامي» الحاكم لتنفيذ كود الفرونت إند في المواضيع اللاحقة (Next.js وTailwind CSS وReact). القاعدة الجوهرية التي لا تقبل المساومة في هذا المسار هي: <strong>تعكس وثيقة التصميم القيم البصرية المعتمدة فعلياً من نموذج الطالب وشاشات Stitch، ولا تخترع هوية بصرية جديدة من العدم أو تستبدل متطلبات PRD المعتمدة</strong>.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      إن محاولة كتابة قيم ألوان عشوائية أو اقتراح خطوط بديلة في هذه المحطة يُعد هدماً لكافة جهود التحليل والتصميم التي بذلها الطالب في المواضيع السابقة (الموضوع 21 الشاشة المرجعية، والموضوع 22 نظام التصميم، والموضوع 23 النموذج التفاعلي). وثيقة <code>DESIGN.md</code> وظيفتها <em>استخراج وتثبيت وتأطير</em> تلك القرارات الواقعية في صياغة هندسية قياسية يسهل على وكيل البرمجة والمطور الالتزام بها حرفياً أثناء البرمجة.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>ما هي وثيقة DESIGN.md؟</span>
      </div>
      <p class="leading-7">
        هو معيار توثيقي هندسي معتمد (مطابق لنمط Google Design)، يجمع بين قسمين متكاملين: قسم <strong>رموز التصميم المهيكلة (Design Tokens في YAML Frontmatter)</strong> التي تغذي إعدادات Tailwind CSS برمجياً، وقسم <strong>الشرح المنطقي الهيكلي (Markdown Design Rationale)</strong> الذي يحدد قواعد التباين، والتسلسل الهرمي، والأنماط التفاعلية، ودعم اللغة العربية (RTL).
      </p>
    </div>
  </div>

  <!-- 2. Standard Google DESIGN.md Structure -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. البنية القياسية لوثيقة DESIGN.md (توكنز YAML + شرح Markdown)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تتألف وثيقة <code>DESIGN.md</code> المتوافقة مع معايير Google الهندسية من هيكل موحد ينقسم إلى ركيزتين:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>القسم في الوثيقة</th>
            <th>الصيغة التقنية</th>
            <th>المحتويات والقيم الموثقة</th>
            <th>المستفيد في مرحلة الكود</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. رموز التصميم (Tokens)</strong></td>
            <td><code>YAML Frontmatter</code> (في أعلى الملف)</td>
            <td>رموز الألوان الدقيقة بصيغة Hex، مقياس الخطوط (Font Sizes)، مقياس المسافات (Spacing)، أنصاف أقطار الحواف (Radii)، والظلال (Elevation)</td>
            <td>إعدادات <code>tailwind.config.ts</code> والمتغيرات البرمجية</td>
          </tr>
          <tr>
            <td><strong>2. فلسفة التصميم (Rationale)</strong></td>
            <td><code>Markdown Text</code></td>
            <td>التسلسل الهرمي البصري، بنية الشبكة، التباعد بين الأقسام، واتجاه القراءة الطبيعي RTL</td>
            <td>مطورو الواجهة ووكيل البرمجة عند بناء الـ Layout</td>
          </tr>
          <tr>
            <td><strong>3. مواصفات المكونات (Components)</strong></td>
            <td><code>Markdown Specs</code></td>
            <td>مواصفات الأزرار (Primary, Secondary, Ghost)، والبطاقات، وحقول الإدخال، والنوافذ المنبثقة</td>
            <td>بناء مكونات React في المواضيع 31 و32</td>
          </tr>
          <tr>
            <td><strong>4. حالات الواجهة الست (UI States)</strong></td>
            <td><code>State Matrix</code></td>
            <td>حالات المكونات: الافتراضية، والتحميل (Skeleton)، والفارغة (Empty)، والخطأ، والتعطيل (Disabled)، وحجب الصلاحية</td>
            <td>منع نسيان شاشات التحميل والحالات الفارغة</td>
          </tr>
          <tr>
            <td><strong>5. إمكانية الوصول وRTL (A11y)</strong></td>
            <td><code>WCAG &amp; BiDi Rules</code></td>
            <td>فحص نسب التباين (Contrast ≥ 4.5:1)، وتوجيه الأيقونات، والتركيز بلوحة المفاتيح (Focus Ring)</td>
            <td>مراجعة UI/UX Pro Max واختبارات الجودة</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. Extract DESIGN.md Prompt (PROMPT 23) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. برومبت استخراج DESIGN.md من Stitch (PROMPT 23)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نستخدم برومبت استخراج وثيقة التصميم (PROMPT 23) المعتمد في المسار لتوجيه وكيل البرمجة أو مهندس نظام التصميم. يقرأ البرومبت مراجع الشاشات المسترجعة عبر Stitch MCP أو المصدّرة يدوياً، ويستخرج القيم الحقيقية المؤكدة فقط، مع حظر اختراع أي قيم وهمية:
    </p>

    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">text</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ PROMPT 23">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Design System Engineer.
Use the connected Stitch MCP, or explicitly provided exports if MCP is unavailable.
Read the approved project and its screens. Extract REAL confirmed hex values,
fonts, typography, spacing, radii, components, interaction patterns,
responsive rules and accessibility notes.
Create DESIGN.md using optional YAML tokens and Markdown design rationale,
consistent with Google's DESIGN.md format. Do not invent values.
Create docs/STITCH_SCREEN_REFERENCES.md with screen identifiers and links.
Report inaccessible properties. Do not modify Stitch screens.</code></pre>
    </div>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">🔍</span>
        <span>تحليل تعليمات البرومبت الحاسمة</span>
      </div>
      <ul class="list-disc list-inside space-y-1 text-sm sm:text-base leading-7 pr-2">
        <li><strong>الدور المحدد:</strong> يتصرف الوكيل كمهندس نظام تصميم (Design System Engineer) منضبط، لا كمسوق أو مصمم يبتكر هوية جديدة.</li>
        <li><strong>المرونة ومراعاة البديل:</strong> يعمل البرومبت سواء كان خادم MCP متصلاً أو تم تقديم المراجع المصدرة يدوياً.</li>
        <li><strong>أمر صريح بمنع التخمين:</strong> <code>Do not invent values</code> — إذا كان هناك قرار بصري غير واضح، يطلبه الوكيل أو يوثق قيمته المجهولة بدل اختلاقها.</li>
        <li><strong>عدم تعديل الشاشات:</strong> <code>Do not modify Stitch screens</code> — الحفاظ على سلامة التصميم المعتمد من أي عبث آلي.</li>
      </ul>
    </div>
  </div>

  <!-- 4. Workflow SVG Diagram -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. المخطط الهندسي لدورة استخراج وثيقة DESIGN.md ومطابقتها</h3>
    <p class="leading-8 text-[var(--text-muted)] mb-4">
      يوضح المخطط التالي كيفية تحويل مراجع الشاشات إلى وثيقة DESIGN.md القياسية، والمراجعة البشرية الإلزامية للمطابقة قبل الانتقال لكود الفرونت:
    </p>

    <div class="diagram-box my-6">
      <svg viewBox="0 0 800 370" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مخطط استخراج وثيقة DESIGN.md والمراجعة التعليمية للمطابقة">
        <desc>مخطط يوضح تدفق استخراج التوكنز والشرح المنطقي إلى وثيقة DESIGN.md والتحقق البشري من مطابقة النموذج البصري</desc>
        <defs>
          <linearGradient id="tokenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4f46e5" />
            <stop offset="100%" stop-color="#4338ca" />
          </linearGradient>
          <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
        </defs>

        <!-- Container -->
        <rect x="10" y="10" width="780" height="350" rx="16" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="2" />

        <!-- Source 1: Approved Screens -->
        <rect x="35" y="40" width="200" height="100" rx="10" fill="var(--bg-card-subtle)" stroke="var(--border-color)" stroke-width="1.5" />
        <text x="135" y="70" fill="var(--text-main)" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">الشاشات المعتمدة</text>
        <text x="135" y="90" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="sans-serif">Google Stitch / Prototype</text>
        <text x="135" y="115" fill="#0284c7" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">المواضيع 21 و22 و23</text>

        <!-- Source 2: References Document -->
        <rect x="35" y="170" width="200" height="100" rx="10" fill="var(--bg-card-subtle)" stroke="var(--border-color)" stroke-width="1.5" />
        <text x="135" y="200" fill="var(--text-main)" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">مراجع الشاشات</text>
        <text x="135" y="220" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="sans-serif">Stitch MCP أو البديل اليدوي</text>
        <text x="135" y="245" fill="#059669" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">docs/STITCH_SCREEN_REFERENCES.md</text>

        <!-- Center: Extraction Engine PROMPT 23 -->
        <rect x="290" y="95" width="220" height="120" rx="12" fill="url(#tokenGrad)" stroke="#4f46e5" stroke-width="1.5" />
        <text x="400" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">استخراج التوكنز والأسس</text>
        <text x="400" y="150" fill="#e0e7ff" font-size="12" text-anchor="middle" font-family="sans-serif">PROMPT 23 (Design System Engineer)</text>
        <rect x="310" y="165" width="180" height="30" rx="6" fill="#312e81" />
        <text x="400" y="185" fill="#a5b4fc" font-size="10" text-anchor="middle" font-family="sans-serif">لا قيم مخترعة · Real Values Only</text>

        <!-- Lines from sources to Center -->
        <line x1="235" y1="90" x2="290" y2="135" stroke="#4f46e5" stroke-width="2" />
        <line x1="235" y1="220" x2="290" y2="175" stroke="#4f46e5" stroke-width="2" />

        <!-- Output: DESIGN.md Document -->
        <rect x="560" y="40" width="205" height="175" rx="10" fill="url(#docGrad)" stroke="#059669" stroke-width="2" />
        <text x="662" y="75" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" font-family="monospace">DESIGN.md</text>
        <rect x="575" y="90" width="175" height="40" rx="6" fill="#064e3b" />
        <text x="662" y="108" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">YAML Tokens (Colors, Scale)</text>
        <text x="662" y="122" fill="#a7f3d0" font-size="9" text-anchor="middle" font-family="sans-serif">قيم Hex، مقاسات، حواف، مسافات</text>
        <rect x="575" y="140" width="175" height="60" rx="6" fill="#064e3b" />
        <text x="662" y="158" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">Markdown Rationale</text>
        <text x="662" y="174" fill="#a7f3d0" font-size="9" text-anchor="middle" font-family="sans-serif">الهرم البصري، الحالات الست</text>
        <text x="662" y="190" fill="#a7f3d0" font-size="9" text-anchor="middle" font-family="sans-serif">دعم RTL وقواعد التباين</text>

        <!-- Line from Center to Output -->
        <line x1="510" y1="155" x2="560" y2="130" stroke="#059669" stroke-width="2" />

        <!-- Bottom: Human Educational Review & Verification -->
        <rect x="150" y="290" width="500" height="55" rx="8" fill="var(--bg-surface)" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,4" />
        <text x="400" y="315" fill="#d97706" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">المراجعة التعليمية الصارمة: مطابقة المرجع البصري والوثيقة</text>
        <text x="400" y="333" fill="var(--text-muted)" font-size="10" text-anchor="middle" font-family="sans-serif">التأكد من تطابق كل قيمة Hex وحجم خط مع النموذج قبل الانتقال لكود الفرونت (الموضوع 30 فصاعداً)</text>

        <line x1="662" y1="215" x2="662" y2="290" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,3" />
      </svg>
    </div>
  </div>

  <!-- 5. Concrete DESIGN.md Template -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. النموذج المعتمد الكامل لملف DESIGN.md القياسي</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      فيما يلي نموذج واقعي مكتمل لملف <code>DESIGN.md</code> يعكس معايير Google وتوكنز حقيقية متوافقة مع مشروع الطالب ودعم اللغة العربية (RTL):
    </p>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">yaml</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ وثيقة DESIGN.md';},2000);})" aria-label="نسخ نموذج DESIGN.md">نسخ وثيقة DESIGN.md</button>
      </div>
      <pre class="code-content"><code>---
# DESIGN.md - Project Design System Tokens &amp; Specifications
# Generated from Approved Google Stitch Prototype (Topics 21-23 &amp; 28)
# All values are CONFIRMED REAL decisions - No invented or random values!

name: "BorrowHub Design System"
version: "1.0.0"
direction: "rtl"
base_font: "Tajawal, sans-serif"
code_font: "JetBrains Mono, monospace"

tokens:
  colors:
    primary:
      default: "#059669"      # Emerald 600 - Main CTA &amp; Brand Accent
      hover: "#047857"        # Emerald 700 - Interactive Hover State
      subtle: "#ecfdf5"       # Emerald 50 - Badge &amp; Highlight Background
      contrast: "#ffffff"     # White - Text on primary (Ratio 4.8:1 ✓ WCAG AA)
    surface:
      page: "#f8fafc"         # Slate 50 - Background
      card: "#ffffff"         # Pure White - Card &amp; Modal Background
      subtle: "#f1f5f9"       # Slate 100 - Table Headers &amp; Skeletons
      border: "#e2e8f0"       # Slate 200 - Borders &amp; Dividers
    text:
      main: "#0f172a"         # Slate 900 - High Contrast Headings (14.2:1 ✓)
      muted: "#475569"        # Slate 600 - Body &amp; Descriptive Text (5.6:1 ✓)
      faint: "#94a3b8"        # Slate 400 - Placeholders &amp; Captions
    status:
      available: "#059669"    # Green - Equipment Ready for Loan
      on_loan: "#d97706"      # Amber - Active Loan
      maintenance: "#dc2626"  # Red - Out of Service
      info: "#0284c7"         # Blue - System Notice

  typography:
    scale:
      xs: "0.75rem"   # 12px - Badges, Table Meta
      sm: "0.875rem"  # 14px - Form Labels, Inputs
      base: "1rem"    # 16px - Body Text, Standard Buttons
      lg: "1.125rem"  # 18px - Subheadings, Card Titles
      xl: "1.25rem"   # 20px - Section Headers
      "2xl": "1.5rem" # 24px - Page Headers
      "3xl": "1.875rem" # 30px - Hero Titles

  spacing:
    unit: 4           # 4px base increment
    scale:
      xs: "0.25rem"   # 4px
      sm: "0.5rem"    # 8px
      md: "1rem"      # 16px
      lg: "1.5rem"    # 24px
      xl: "2rem"      # 32px
      "2xl": "3rem"   # 48px

  radii:
    sm: "0.375rem"    # 6px - Badges, Micro-chips
    md: "0.5rem"      # 8px - Form Inputs, Small Cards
    lg: "0.75rem"     # 12px - Main Item Cards, Modals
    full: "9999px"    # Pill Buttons, Avatars

  breakpoints:
    mobile: "390px"
    tablet: "768px"
    desktop: "1024px"
    wide: "1440px"
---

# Design Rationale &amp; Component Rules

## 1. Visual Hierarchy &amp; Layout Grid
- RTL First: All primary content, sidebar menus, and form labels align to the right (text-right).
- Icons &amp; Chevrons: Back and forward arrows are mirrored according to Arabic directionality.
- Card Spacing: Use gap-4 (16px) on mobile and gap-6 (24px) on desktop grid layouts.

## 2. Component Specifications
### Primary Action Button
- Background: var(--colors-primary-default)
- Height: 44px minimum for comfortable touch target on mobile screens.
- Border Radius: var(--radii-md) (8px).
- Focus State: Visible 2px outline with #059669 and 2px offset.

### Item Card
- Background: Pure White (#ffffff) with 1px border #e2e8f0.
- Hover Effect: Subtle elevation change (shadow-md) without abrupt layout shifts.
- Image Aspect Ratio: 16:9 with object-cover and fallback placeholder.

## 3. UI State Matrix (Mandatory Implementation)
1. Default: Normal interactive presentation with full data.
2. Loading: Animated Pulse Skeleton with identical component dimensions.
3. Empty: Illustrated or iconography-backed message when zero results exist.
4. Error: Clear human-friendly Arabic message with a Retry button.
5. Disabled: Opacity 50%, pointer-events none, clear explanation why action is blocked.
6. Permission Denied: Explains role requirement without crashing the interface.

## 4. Accessibility Verification
- All text meets WCAG AA 4.5:1 minimum contrast against its background.
- Interactive elements support full keyboard tab navigation.</code></pre>
    </div>
  </div>

  <!-- 6. Educational Verification Review -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">6. مراجعة المطابقة البصرية وتوثيق الجودة قبل بدء الكود</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      قبل الانتقال إلى الموضوع 30 للبدء في تعلّم TypeScript وكتابة كود Next.js، يُجري الطالب مراجعة مطابقة بصرية واضحة بين مخرجين:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>المرجع البصري:</strong> لقطات الشاشات المعتمدة في Google Stitch أو النموذج التفاعلي (الموضوع 23).</li>
      <li><strong>الوثيقة الهندسية:</strong> ملف <code>DESIGN.md</code> وملف <code>docs/STITCH_SCREEN_REFERENCES.md</code>.</li>
    </ul>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      تضمن هذه المراجعة ألا يدخل الطالب مرحلة البرمجة بأي غموض بصري، مما يقطع الطريق تماماً أمام البرمجة التخمينية (Vibe Coding) ويجعل كل سطر في كود Tailwind مبنياً على توكن موثّق مسبقاً.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * WAVE 2 TOPIC ENTRIES EXPORT: T10 (Stitch MCP & DESIGN.md)
 * ========================================================================= */
export const t10Entries: TopicItem[] = [
  {
    id: 'stitch-mcp-integration',
    number: '28',
    slug: 'stitch-mcp-integration',
    title: 'ربط Stitch MCP واسترجاع مراجع التصميم البصري',
    subtitle: 'قراءة بيانات الشاشات المعتمدة وحوكمة أسرار الاتصال مع توفير البديل اليدوي الكامل',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'أدوات التنفيذ والتصميم',
    summary: 'تكامل خادم Stitch MCP مع وكيل البرمجة لقراءة مراجع وبيانات التصميم (Design Metadata) والشاشات المعتمدة في Google Stitch بعد اكتمال مرحلة التصميم وإعداد أسس MCP. يشرح الموضوع إدارة أسرار الاتصال ومفاتيح API بأمان محلياً دون إظهارها في الأمثلة أو المستودع، وتشغيل برومبت التحقق (PROMPT 22) بصلاحية قراءة فقط، مع تقديم مسار بديل يدوي كامل وموثق لنقل الأصول والتصميمات عند تعذر تشغيل خادم MCP لضمان استمرارية تعلم الطالب دون عوائق.',
    tags: ['Stitch MCP', 'Google Stitch', 'MCP Tools', 'Design Metadata', 'Secrets Management', 'PROMPT 22', 'Manual Fallback', 'No Key Leaks'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 3,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic28StitchMcpHtml),
    htmlContent: topic28StitchMcpHtml,

    goal: 'ربط وكيل البرمجة بمشروع Google Stitch عبر خادم Stitch MCP بعد اكتمال التصميم وأسس MCP، لقراءة مراجع وبيانات التصميم والشاشات المعتمدة بأمان دون تسريب أي مفاتيح، مع توفير البديل اليدوي الكامل والموثق عند تعذر الاتصال.',
    prerequisites: [
      'الشاشة المرجعية ونظام التصميم والنموذج التفاعلي (المواضيع 21 و22 و23)',
      'وكيل البرمجة وإدارة الصلاحيات (الموضوع 24)',
      'بروتوكول سياق النموذج MCP وإدارة الخوادم (الموضوع 27)',
      'وجود شاشات معتمدة في مشروع Google Stitch',
      'إيضاح: يأتي ربط Stitch MCP هنا فقط بعد اعتماد التصميم؛ لم يُشترط وجوده في المراحل السابقة'
    ],
    steps: [
      '1. تحقق من جاهزية المدخلات: التصميم المعتمد من شاشات Google Stitch والنموذج التفاعلي (المواضيع 21-23) وخادم MCP الأساسي (الموضوع 27).',
      '2. جهّز خادم Stitch MCP في بيئة وكيل البرمجة المعتمدة أو المحرر الداعم للبروتوكول (مثل Antigravity IDE).',
      '3. أدر أسرار الاتصال ومفتاح API بأمان عبر ملف إعدادات خادم MCP المحلي المحمي (مثل mcp_settings.json أو .env.local)، مع الامتناع المطلق عن تضمين المفاتيح في المستودع أو ملفات PRD أو README أو الأمثلة.',
      '4. شغّل برومبت التحقق من الاتصال (PROMPT 22: Stitch MCP Connection Verification) بصلاحية قراءة فقط (Read-only) لحصر معرّفات الشاشات والتأكد من عدم تعديل أي شاشة.',
      '5. طبّق المسار البديل اليدوي الكامل (Manual Fallback) في حال تعذر تشغيل خادم MCP أو عدم توفر المفتاح: تصدير لقطات الشاشات وأكواد الألوان والتوكنز يدوياً من واجهة Stitch وحفظها في docs/assets/screens/.',
      '6. وثّق مراجع الشاشات المسترجعة وروابطها وحالة اعتمادها في ملف docs/STITCH_SCREEN_REFERENCES.md تمهيداً لصياغة وثيقة DESIGN.md.'
    ],
    promptRefs: [
      'prompt-22-stitch-mcp-connection-verification'
    ],
    outputs: [
      'docs/STITCH_SCREEN_REFERENCES.md',
      'docs/mcp/stitch-connection.md'
    ],
    checklist: [
      'التأكد من أن ربط Stitch MCP يأتي بعد اعتماد التصميم وأسس MCP وليس قبلها.',
      'إدارة أسرار الاتصال محلياً دون إظهار أي مفاتيح API في الأمثلة أو الملفات المشتركة.',
      'تشغيل برومبت التحقق (PROMPT 22) بصلاحية قراءة فقط لحصر معرّفات الشاشات دون تعديلها.',
      'توثيق المسار البديل اليدوي بالتفصيل لنقل مراجع التصميم عند تعذر الاتصال بـ MCP.',
      'إنشاء ملف docs/STITCH_SCREEN_REFERENCES.md يربط معرّفات الشاشات وروابطها بحالتها الواقعية.',
      'التحقق من تضمين ملفات إعدادات MCP المحلية والمتغيرات البيئية السرية داخل .gitignore.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 28,
  },
  {
    id: 'design-md-spec',
    number: '29',
    slug: 'design-md-spec',
    title: 'وثيقة التصميم DESIGN.md واستخراج القيم المعتمدة',
    subtitle: 'صياغة وثيقة نظام التصميم القياسية واستخراج التوكنز الحقيقية دون اختراع هوية جديدة',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'أنظمة وقواعد التصميم',
    summary: 'صياغة وثيقة DESIGN.md القياسية المتوافقة مع معايير Google، واستخراج رموز التصميم (Design Tokens) والشرح المنطقي الهيكلي (Rationale) من الشاشات المعتمدة ومراجع Stitch المسترجعة في الموضوع السابق. يرسخ الموضوع مبدأ توثيق القيم الواقعية المعتمدة فعلياً في مشروع الطالب ومنع اختراع هوية جديدة أو استبدال متطلبات PRD، مع ضبط تباين الألوان وفق WCAG AA، ودعم اتجاه اللغة العربية RTL، وتوثيق الحالات التفاعلية الست لتكون مرجعاً موحداً لمرحلة كود الفرونت.',
    tags: ['DESIGN.md', 'Design Tokens', 'Google Design Spec', 'Color Palette', 'Typography', '8px Grid', 'PROMPT 23', 'WCAG AA', 'RTL Support'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 3,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic29DesignMdHtml),
    htmlContent: topic29DesignMdHtml,

    goal: 'صياغة وثيقة DESIGN.md القياسية المتوافقة مع معايير Google، وتوثيق رموز وهوية التصميم الحقيقية المستخرجة من شاشات مشروع الطالب المعتمدة، دون اختراع هوية جديدة أو استبدال متطلبات PRD.',
    prerequisites: [
      'الشاشات المعتمدة ونظام التصميم والنموذج التفاعلي (المواضيع 21 و22 و23)',
      'مراجع شاشات Stitch المسترجعة عبر MCP أو المصدّرة يدوياً (الموضوع 28)',
      'جرد الشاشات docs/SCREEN_INVENTORY.md ومتطلبات الواجهة docs/UI_UX_REQUIREMENTS.md',
      'إيضاح: تعكس وثيقة التصميم قرارات الطالب المعتمدة في مشروعه ولا تبتكر هوية جديدة أو تستبدل المتطلبات'
    ],
    steps: [
      '1. استعرض مراجع الشاشات المعتمدة في docs/STITCH_SCREEN_REFERENCES.md (المسترجعة عبر Stitch MCP أو المصدّرة يدوياً).',
      '2. استخدم برومبت استخراج وثيقة التصميم (PROMPT 23: Extract DESIGN.md from Stitch) لاستخراج رموز التصميم والأسس البصرية.',
      '3. استخرج وثبّت قيم الألوان المؤكدة (Confirmed Hex Values) وافحص نسب التباين وإمكانية الوصول وفق WCAG AA (نسبة 4.5:1 للنصوص).',
      '4. وثّق مقاييس التيبوغرافيا (Typography Scale مع دعم خطوط اللغة العربية واتجاه RTL) وشبكة المسافات (8px Grid) وأنصاف الأقطار ومستويات الظلال.',
      '5. صيّغ وثيقة DESIGN.md بالهيكل القياسي المعتمد: رموز YAML Frontmatter في الرأس وشرح هندسي منطقي (Markdown Rationale) في المتن.',
      '6. أجرِ مراجعة المطابقة البصرية الصارمة بين النموذج التفاعلي المعتمد ووثيقة DESIGN.md وتأكد من عدم اختراع أي هوية جديدة أو إسقاط حالات الواجهة الست قبل الانتقال لكود الفرونت.'
    ],
    promptRefs: [
      'prompt-23-extract-design-md-from-stitch'
    ],
    outputs: [
      'DESIGN.md',
      'docs/DESIGN_TOKENS.md'
    ],
    checklist: [
      'استخراج القيم المعتمدة فعلياً من شاشات التصميم دون ابتكار هوية بصرية جديدة.',
      'التأكد من صياغة DESIGN.md بهيكل توكنز YAML وشرح منطقي متوافق مع معايير Google.',
      'توثيق قيم الألوان الدقيقة بصيغة Hex مع فحص نسب التباين وإمكانية الوصول WCAG AA.',
      'تثبيت مقاييس الخطوط والتيبوغرافيا ودعم الاتجاه العربي RTL وشبكة المسافات 8px.',
      'تحديد مواصفات المكونات والحالات الست التفاعلية في وثيقة التصميم.',
      'إجراء المطابقة البصرية البشرية لضمان تطابق الوثيقة مع النموذج المعتمد قبل مرحلة كود الفرونت.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 29,
  },
];
