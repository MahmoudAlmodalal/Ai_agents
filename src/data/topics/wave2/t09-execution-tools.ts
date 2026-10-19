import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 24: AI CODING AGENT (وكيل البرمجة بالذكاء الاصطناعي)
 * Sequence Position: 24
 * ========================================================================= */
export const topic24CodingAgentHtml = `
<section id="topic-24-coding-agent" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 24 · أدوات التنفيذ</span>
    <span class="step-pill">تهيئة وكيل البرمجة وإدارة الصلاحيات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)</h2>
      <div class="step-subtitle">مفهوم الوكيل وصلاحيات الملفات والأوامر وإدارة السياق وأمان الأسرار دون فرض بيئة معينة</div>
    </div>
  </div>

  <!-- 1. The Right Place in the Learning Sequence -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. وضع وكيل البرمجة في مكانه الهندسي الصحيح</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      أحد الأخطاء المنهجية الشائعة في مسارات الذكاء الاصطناعي هو إغراق المتعلّم بتثبيت وكلاء البرمجة (AI Coding Agents) وأدوات سياق النماذج منذ اليوم الأول، قبل حتى أن يعرف ماذا يبني أو لمن يبني. في مسارنا، أُنجزت كافة المحطات التحليلية والتصميمية السابقة — من استكشاف الفكرة، ومقابلة Grill Me، وكتابة PRD وSRS، وتوثيق Git/GitHub، ورسم مخططات UML وERD، إلى تصميم شاشات Google Stitch واعتماد النموذج التفاعلي (Prototype) — <strong>بشكل مستقل وتدريجي دون اشتراط وجود أو تثبيت وكيل برمجي أو مهارة متقدمة</strong>.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      الآن، ومع انتهاء مرحلة التصميم البصري والتأكد السلوكي من النموذج التفاعلي، ننتقل إلى مرحلة <strong>تنفيذ كود الفرونت إند</strong>. هنا تحديداً يأتي دور وكيل البرمجة كشريك تقني منفذ للمهام (Executor)، يتلقى التوجيهات الهندسية من المواصفات، ويقرأ أصول التصميم، وينفّذ مهام الكود بأسلوب تدريجي خاضع للمراجعة والتحقق.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>ما هو وكيل البرمجة (Coding Agent)؟</span>
      </div>
      <p class="leading-7">
        وكيل البرمجة ليس مجرد نافذة محادثة دردشة (Chatbot)؛ بل هو نظام برمجي ذكي يمتلك القدرة على التفاعل مع بيئة العمل المحلية: قراءة ملفات المشروع، إنشاء وتعديل الكود، تنفيذ أوامر الطرفية (Terminal Commands)، وقراءة سجلات الأخطاء لإصلاحها، كل ذلك تحت سياق توجيهي محدد وبإشراف بشري مستمر.
      </p>
    </div>
  </div>

  <!-- 2. No Vendor Lock-in & No Subscription Assumptions -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. حرية اختيار الأداة وعدم فرض أي اشتراكات مدفوعة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نلتزم في هذا المسار بمبدأ <strong>الاستقلال التقني (No Vendor Lock-in)</strong>:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>لا يُفرض تبديل وكيل البرمجة:</strong> يحق للطالب اختيار أي وكيل برمجي تدعمه بيئته ومحرره المفضل، سواء كان Antigravity CLI/IDE، أو Cursor، أو Claude Code، أو GitHub Copilot، أو Aider، أو محرر محلي كـ VS Code مع ملحقات مفتوحة المصدر مثل Continue. المفاهيم الهندسية الواردة هنا تنطبق على أي وكيل.</li>
      <li><strong>لا افتراض لاشتراكات مدفوعة:</strong> لا يفترض المسار التعليمي شراء أي باقة احترافية أو اشتراك مدفوع. جميع التطبيقات مصممة للعمل بنماذج مجانية، أو باقات تجريبية، أو استدعاءات API خفيفة.</li>
      <li><strong>غياب ضمانات حدود الاستخدام:</strong> الحسابات المجانية أو التجريبية تخضع لسياسات الشركات المزودة وحدود استدعاء (Rate Limits) متغيرة. يتعلم الطالب كيفية إدارة استهلاك الـ Tokens والتوقف الذكي، دون بناء اعتماده على حصص استدعاء مضمونة.</li>
    </ul>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الأداة / البيئة</th>
            <th>نوع البيئة</th>
            <th>الرابط الرسمي المعتمد</th>
            <th>حالة التوفر والتوجيه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Antigravity CLI / IDE</strong></td>
            <td>بيئة Google الرسمية للوكلاء البرمجيين</td>
            <td><a href="https://antigravity.google/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">antigravity.google</a></td>
            <td><span class="badge-available">متاح رسميًا</span> (يدعم CLI وIDE مع تكامل MCP أصيل)</td>
          </tr>
          <tr>
            <td><strong>Cursor / VS Code</strong></td>
            <td>محررات تطوير مدعمة بوكلاء الذكاء الاصطناعي</td>
            <td><a href="https://www.cursor.com/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">cursor.com</a></td>
            <td><span class="badge-available">خيار مدعوم</span> (يعمل الطالب به إن كان محرره الأساسي دون تبديل)</td>
          </tr>
          <tr>
            <td><strong>Aider / Claude Code</strong></td>
            <td>وكلاء طرفية (CLI Coding Agents)</td>
            <td><a href="https://aider.chat/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">aider.chat</a></td>
            <td><span class="badge-conditional">بديل طرفية مرن</span> (مناسب للبيئات الخفيفة والطرفية الصرفة)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. Permissions & Guardrails -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. حوكمة الصلاحيات وحماية نظام المطور</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      منح وكيل البرمجة صلاحيات مطلقة دون قيود هو تصرف عالي المخاطر (Security Hazard). يعتمد المسار نموذج الصلاحيات المتدرج التالي:
    </p>

    <div class="grid gap-4 sm:grid-cols-3 my-4">
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mb-1">صلاحيات القراءة (Read)</div>
        <div class="text-xs text-[var(--text-muted)] leading-6">
          السماح بقراءة ملفات مجلد المشروع فقط. حظر الوصول لملفات النظام العامة مثل <code>~/.ssh</code> أو <code>~/.bashrc</code> أو سجلات الاعتماد.
        </div>
      </div>
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
        <div class="text-blue-600 dark:text-blue-400 font-bold mb-1">صلاحيات الكتابة (Write)</div>
        <div class="text-xs text-[var(--text-muted)] leading-6">
          تعديل وإنشاء ملفات المشروع المحددة في المهمة. مراجعة التغييرات عبر <code>git diff</code> قبل الاعتماد أو عمل Commit.
        </div>
      </div>
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
        <div class="text-amber-600 dark:text-amber-400 font-bold mb-1">صلاحيات الطرفية (Execute)</div>
        <div class="text-xs text-[var(--text-muted)] leading-6">
          الموافقة التلقائية على الأوامر الآمنة (مثل <code>npm test</code> أو <code>git status</code>)، وفرض التأكيد البشري الصارم للأوامر التدميرية.
        </div>
      </div>
    </div>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>قائمة الأوامر التدميرية المحظورة دون موافقة بشرية</span>
      </div>
      <p class="leading-7">
        لا تسمح أبداً للوكيل بتشغيل أوامر الحذف الكلي <code>rm -rf</code>، أو أوامر إسقاط جداول قواعد البيانات <code>DROP DATABASE / TABLE</code>، أو الدفع القسري في Git مثل <code>git push --force</code>، أو نشر الحزم <code>npm publish</code> بشكل صامت. يجب أن يظل المبرمج هو المسؤول النهائي عن قرارات التنفيذ.
      </p>
    </div>
  </div>

  <!-- 4. Secrets & Environment Variables (.env Security) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. إدارة الأسرار والمتغيرات البيئية وتأمين .gitignore</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تسريب مفاتيح API وبيانات الاعتماد في مستودعات Git هو الكارثة الأمنية الأولى التي يقع فيها المبرمجون المبتدئون. نطبق في مشروع الطالب القواعد الصارمة التالية:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>عزل الأسرار:</strong> توضع جميع المفاتيح السرية في ملف <code>.env.local</code> أو <code>.env</code> غير المرفوع للمستودع مطلقاً.</li>
      <li><strong>تأكيد .gitignore:</strong> إضافة <code>.env*</code> إلى ملف <code>.gitignore</code> قبل عمل أول Commit يتعلق بالواجهة أو الوكلاء.</li>
      <li><strong>حظر الأسرار في البرومبتات:</strong> لا تكتب مفاتيح API داخل نصوص البرومبت، ولا تطلب من الوكيل تضمينها كقيم ثابتة في الكود المصدري.</li>
      <li><strong>ملف النموذج .env.example:</strong> توفير ملف توثيقي يحتوي أسماء المتغيرات فقط مع قيم توضيحية فارغة لإرشاد أعضاء الفريق.</li>
    </ul>

    <!-- LTR Code Snippet: .env.example & .gitignore -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">.gitignore & .env.example Configuration</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ الكود">نسخ الكود</button>
      </div>
      <pre class="code-content"><code># In .gitignore:
.env
.env*.local
.env.development.local
.env.test.local
.env.production.local

# In .env.example (Safe to commit to GitHub):
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
STITCH_API_KEY=your_stitch_api_key_here</code></pre>
    </div>
  </div>

  <!-- 5. Context Window Management -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. إدارة نافذة السياق (Context Window) ومنع التخمة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تمتلك النماذج اللغوية حدوداً لحجم السياق (Context Window). حشو كامل ملفات المشروع وسجلاته والمكتبات في السياق في كل برومبت يؤدي إلى ثلاث مشكلات جسيمة:
    </p>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>ظاهرة التوهان في المنتصف (Lost in the Middle):</strong> يتراجع انتباه النموذج وتضعف قدرته على تتبع التفاصيل الحساسة عندما يفيض السياق بنصوص غير لازمة.</li>
      <li><strong>استنزاف التوكنز وتكلفة الاستخدام:</strong> تكرار قراءة آلاف الأسطر غير الضرورية يستنزف الحصص المجانية ومعدلات الطلب (Rate Limits) بسرعة فائقة.</li>
      <li><strong>توليد الهلوسات البرمجية:</strong> تشتت النموذج بين ملفات غير مكتملة أو تعليمات قديمة يقوده لاختراع حلول لا تتوافق مع بنية المشروع الحالية.</li>
    </ol>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      <strong>الحل الهندسي المعتمد:</strong> تزويد الوكيل بسياق مركّز من خلال ملف <code>docs/PROJECT_CONTEXT.md</code> الذي أُعد في المحاضرة الأولى، واستدعاء الملفات المرتبطة فقط بالمهمة البرمجية اللحظية.
    </p>

    <!-- Visual Diagram: Permissions and Context Sandbox -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (12): معمارية صلاحيات وكيل البرمجة وإدارة الأسرار والسياق في مشروع الطالب</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 360" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط معمارية صلاحيات وكيل البرمجة">
          <!-- Outer Box: Developer Machine -->
          <rect x="20" y="20" width="760" height="320" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <text x="750" y="50" fill="#94a3b8" font-size="13" font-weight="bold" text-anchor="end">بيئة عمل المطور (Developer Machine)</text>

          <!-- Agent Box -->
          <rect x="50" y="80" width="220" height="230" rx="8" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
          <text x="160" y="115" fill="#60a5fa" font-size="14" font-weight="bold" text-anchor="middle">AI Coding Agent</text>
          <text x="160" y="140" fill="#94a3b8" font-size="11" text-anchor="middle">(Antigravity, Cursor, etc.)</text>
          <rect x="70" y="165" width="180" height="30" rx="4" fill="#1e293b"/>
          <text x="160" y="185" fill="#34d399" font-size="11" text-anchor="middle">قراءة السياق المستهدف فقط</text>
          <rect x="70" y="205" width="180" height="30" rx="4" fill="#1e293b"/>
          <text x="160" y="225" fill="#fcd34d" font-size="11" text-anchor="middle">تنفيذ المهام عبر أوامر مؤكدة</text>
          <rect x="70" y="245" width="180" height="45" rx="4" fill="#312e81"/>
          <text x="160" y="265" fill="#c7d2fe" font-size="10" text-anchor="middle">لا اشتراك إجباري</text>
          <text x="160" y="280" fill="#c7d2fe" font-size="10" text-anchor="middle">لا تبديل قسري للأداة</text>

          <!-- Middle Gate: Permissions Firewall -->
          <rect x="310" y="80" width="140" height="230" rx="8" fill="#1e1e38" stroke="#f59e0b" stroke-width="2"/>
          <text x="380" y="115" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">حوكمة الصلاحيات</text>
          <text x="380" y="145" fill="#34d399" font-size="11" text-anchor="middle">✓ قراءة ملفات المشروع</text>
          <text x="380" y="175" fill="#34d399" font-size="11" text-anchor="middle">✓ كتابة كود الواجهة</text>
          <text x="380" y="205" fill="#f87171" font-size="11" text-anchor="middle">⛔ حظر الملفات الحساسة</text>
          <text x="380" y="235" fill="#f87171" font-size="11" text-anchor="middle">⛔ حظر الأوامر التدميرية</text>
          <text x="380" y="275" fill="#93c5fd" font-size="10" text-anchor="middle">موافقة بشرية إلزامية</text>

          <!-- Right: Project Files & Secrets -->
          <rect x="490" y="80" width="260" height="230" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="620" y="115" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">مستودع مشروع الطالب (BorrowHub)</text>
          
          <rect x="510" y="135" width="220" height="35" rx="4" fill="#1e293b"/>
          <text x="620" y="157" fill="#f8fafc" font-size="11" text-anchor="middle">docs/PROJECT_CONTEXT.md</text>

          <rect x="510" y="180" width="220" height="35" rx="4" fill="#1e293b"/>
          <text x="620" y="202" fill="#f8fafc" font-size="11" text-anchor="middle">src/ (Next.js 15, React 19)</text>

          <!-- Isolated Secrets Box -->
          <rect x="510" y="225" width="220" height="65" rx="4" fill="#450a0a" stroke="#ef4444"/>
          <text x="620" y="247" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">منطقة الأسرار المعزولة</text>
          <text x="620" y="265" fill="#fecaca" font-size="10" text-anchor="middle">.env.local (داخل .gitignore)</text>
          <text x="620" y="280" fill="#fecaca" font-size="9" text-anchor="middle">ممنوع الرفع إلى Git نهائياً</text>
        </svg>
      </div>
    </div>
  </div>

  <!-- 6. Practical Setup Deliverables -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">6. مخرجات التجهيز العملي لمشروعك</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      عند استكمال هذا الموضوع، ينتج الطالب في مستودع مشروعه ملف <code>docs/CODING_AGENT_SETUP.md</code> لتوثيق إعدادات الوكيل، وملف <code>.env.example</code> لتوثيق أسماء المتغيرات البيئية، وتأكيد حماية <code>.gitignore</code>، تمهيداً لربط بقية الأدوات في المواضيع اللاحقة.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 25: GOOGLE AI STUDIO (بيئة Google AI Studio)
 * Sequence Position: 25
 * ========================================================================= */
export const topic25AiStudioHtml = `
<section id="topic-25-ai-studio" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 25 · أدوات التنفيذ</span>
    <span class="step-pill">استكشاف النماذج وتوليد البيانات التمثيلية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول</h2>
      <div class="step-subtitle">بيئة تجربة نماذج Gemini، إدارة المفاتيح والتعليمات، وتوليد البيانات التمثيلية (Mock Data) دون تشتيت متطلبات المشروع</div>
    </div>
  </div>

  <!-- 1. Positioning Alongside Frontend Tools -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. موضع Google AI Studio في مرحلة التنفيذ</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تم وضع <strong>Google AI Studio</strong> في هذه المحطة (بجانب أدوات الواجهة والتنفيذ) وليس في بداية المسار؛ لأن استخدامه الأساسي في مشروع الطالب يتركز على:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>التجربة السريعة للبرومبتات المعقدة واختبار سلوك نماذج Gemini (مثل Gemini 1.5 Flash وGemini 1.5 Pro).</li>
      <li>ضبط تعليمات النظام (System Instructions) ومعاملات التوليد (Temperature وSafety Settings).</li>
      <li>توليد البيانات التمثيلية الأولية (Mock Data) بصيغة JSON النقية استناداً إلى مخطط قاعدة البيانات المعتمد في <code>docs/ERD.md</code> وشاشات <code>docs/SCREEN_INVENTORY.md</code>.</li>
      <li>استخراج وتأمين مفتاح API لاستخدامه لاحقاً في الميزات الذكية للواجهة.</li>
    </ul>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      تأجيل هذه الخطوة حمى المتدرّب من التشتت في ضبط معاملات الذكاء الاصطناعي أثناء مرحلة كشف المتطلبات وتوثيق PRD، حيث كان التركيز منصباً بالكامل على الفهم البشري والتحليل المنطقي.
    </p>
  </div>

  <!-- 2. Tool Reference & Availability -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. مرجع المنصة الرسمي وضوابط الاستخدام</h3>
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الأداة / المرجع</th>
            <th>الوظيفة في مشروع الطالب</th>
            <th>الرابط الرسمي المعتمد</th>
            <th>حالة التوفر والتوجيه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google AI Studio</strong></td>
            <td>منصة الويب الرسمية لتجربة نماذج Gemini وضبط System Instructions واستخراج API Keys</td>
            <td><a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">aistudio.google.com</a></td>
            <td><span class="badge-available">متاح رسميًا</span> (يتطلب حساب Google؛ يوفر باقة استخدام مجانية خاضعة لمعدلات الطلب)</td>
          </tr>
          <tr>
            <td><strong>Gemini API Documentation</strong></td>
            <td>التوثيق المرجعي الرسمي لمعاملات النماذج وتنسيق JSON</td>
            <td><a href="https://ai.google.dev/docs" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">ai.google.dev/docs</a></td>
            <td><span class="badge-available">توثيق مرجعي مفتوح</span> (دليل المطورين لمعاملات Temperature وStructured Outputs)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>حدود الاستخدام المجاني (Rate Limits) وغياب الضمانات المطلقة</span>
      </div>
      <p class="leading-7">
        توفر Google باقة مجانية (Free Tier) للاستخدام المكتبي والتجريبي لنماذج Gemini بمعدلات طلب محددة (مثل عدد الطلبات في الدقيقة RPM والتوكنز في الدقيقة TPM). يجب أن يدرك الطالب أن <strong>هذه الحصص المجانية غير مضمونة الأبدية</strong> وقد تختلف باختلاف النطاق الجغرافي. لا يشترط المسار شراء أي اشتراك؛ بل يوجّه المتعلّم إلى ترشيد الاستعلامات واستخدام البيانات التمثيلية المحلية (Local Mock Data) كمسار احتياطي موثوق.
      </p>
    </div>
  </div>

  <!-- 3. System Instructions & Structured JSON Mock Data -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. ضبط تعليمات النظام وتوليد Mock Data بنمط JSON</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تحتاج الواجهة الأمامية (Frontend) في مرحلة البداية إلى بيانات واقعية لاختبار الشاشات والمكونات دون انتظار اكتمال الباك إند (Backend). يوفر Google AI Studio ميزة <strong>Structured Outputs (JSON Mode)</strong> التي تجبر النموذج على إرجاع كائنات JSON دقيقة تتوافق 100% مع مخطط ERD المعتمد:
    </p>

    <!-- Copyable Prompt Container -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT: Generate Mock Data Matching ERD in Google AI Studio</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Database & Frontend Mock Data Engineer.
Read the approved ERD, PRD and SCREEN_INVENTORY.md for the student's project.
Generate a small illustrative JSON dataset for equipment and categories.
First list the required schema fields, types and enum values from those documents.
If a field or enum is unspecified, ask instead of inventing it.
Preserve foreign keys, quantity constraints and approved loan rules.
Do not invent dailyBorrowLimit, notification features or new role permissions.
This is frontend mock data, not proof that a database or backend exists.
Before using it, map it to the canonical TypeScript contracts from topic 30.

Return ONLY valid raw JSON array without markdown formatting, introductions, or apologies.</code></pre>
    </div>

    <p class="leading-8 text-[var(--text-muted)]">
      احفظ الناتج المولّد في مشروعك داخل ملف <code>src/data/mock-data.json</code> لتغذية مكونات Next.js خلال بناء واجهات MVP.
    </p>
  </div>

  <!-- 4. API Key Security and Isolation -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. تأمين مفتاح Gemini API وعزله عن المتصفح</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      عند الحصول على مفتاح API من زر <code>Get API key</code> في Google AI Studio:
    </p>
    <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li>احفظ المفتاح فوراً في ملف <code>.env.local</code> تحت اسم <code>GEMINI_API_KEY</code>.</li>
      <li><strong>لا تضع بادئة <code>NEXT_PUBLIC_</code></strong> أمام المتغير السري؛ فبادئة <code>NEXT_PUBLIC_</code> في Next.js تجعل المتغير مرئياً لجميع زوار الموقع في المتصفح!</li>
      <li>تأكد من عدم تمرير المفتاح في أي برومبت يُحفظ داخل المستودع.</li>
      <li>استخدم مفتاح API حصرياً داخل خوادم Next.js (Server Components / Server Actions / Route Handlers) ولا تطلبه من جانب العميل (Client Components).</li>
    </ol>

    <!-- Visual Diagram: AI Studio Workflow -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (13): دورة عمل المطور مع Google AI Studio وعزل الأسرار عن كود الفرونت</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 320" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط دورة عمل Google AI Studio">
          <!-- AI Studio Box -->
          <rect x="30" y="40" width="220" height="240" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="140" y="75" fill="#60a5fa" font-size="14" font-weight="bold" text-anchor="middle">Google AI Studio</text>
          <text x="140" y="98" fill="#94a3b8" font-size="11" text-anchor="middle">(aistudio.google.com)</text>
          <rect x="50" y="120" width="180" height="30" rx="4" fill="#0f172a"/>
          <text x="140" y="140" fill="#38bdf8" font-size="11" text-anchor="middle">System Instructions</text>
          <rect x="50" y="160" width="180" height="30" rx="4" fill="#0f172a"/>
          <text x="140" y="180" fill="#34d399" font-size="11" text-anchor="middle">JSON Output Mode</text>
          <rect x="50" y="200" width="180" height="30" rx="4" fill="#0f172a"/>
          <text x="140" y="220" fill="#fcd34d" font-size="11" text-anchor="middle">Get API Key (Free Quota)</text>

          <!-- Arrow 1: Mock Data Export -->
          <path d="M 260 145 L 340 145" stroke="#34d399" stroke-width="2" marker-end="url(#arrow)"/>
          <text x="300" y="135" fill="#34d399" font-size="10" text-anchor="middle">تصدير JSON</text>

          <!-- Arrow 2: API Key Transfer -->
          <path d="M 260 215 L 340 215" stroke="#fcd34d" stroke-width="2" stroke-dasharray="4"/>
          <text x="300" y="205" fill="#fcd34d" font-size="10" text-anchor="middle">نقل المفتاح</text>

          <!-- Middle Box: Local Files -->
          <rect x="350" y="40" width="200" height="240" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="450" y="75" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">ملفات المشروع المحلية</text>
          <rect x="370" y="120" width="160" height="50" rx="4" fill="#064e3b"/>
          <text x="450" y="142" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">src/data/mock-data.json</text>
          <text x="450" y="160" fill="#6ee7b7" font-size="9" text-anchor="middle">بيانات معدات BorrowHub</text>

          <rect x="370" y="190" width="160" height="50" rx="4" fill="#450a0a"/>
          <text x="450" y="212" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">.env.local</text>
          <text x="450" y="230" fill="#fecaca" font-size="9" text-anchor="middle">محمي من Git تماماً</text>

          <!-- Arrow 3: To Next.js App -->
          <path d="M 560 145 L 620 145" stroke="#38bdf8" stroke-width="2"/>
          <path d="M 560 215 L 620 215" stroke="#fcd34d" stroke-width="2"/>

          <!-- Right Box: Next.js Frontend App -->
          <rect x="630" y="40" width="140" height="240" rx="8" fill="#0f172a" stroke="#6366f1" stroke-width="2"/>
          <text x="700" y="75" fill="#818cf8" font-size="13" font-weight="bold" text-anchor="middle">Next.js 15 App</text>
          <rect x="645" y="115" width="110" height="60" rx="4" fill="#1e1b4b"/>
          <text x="700" y="140" fill="#c7d2fe" font-size="10" text-anchor="middle">UI Components</text>
          <text x="700" y="160" fill="#93c5fd" font-size="9" text-anchor="middle">(تستهلك mock-data)</text>

          <rect x="645" y="190" width="110" height="60" rx="4" fill="#1e1b4b"/>
          <text x="700" y="215" fill="#c7d2fe" font-size="10" text-anchor="middle">Server Actions</text>
          <text x="700" y="235" fill="#fcd34d" font-size="9" text-anchor="middle">(تستهلك API Key آمن)</text>
        </svg>
      </div>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 26: SKILLS (المهارات المخصصة - Skills)
 * Sequence Position: 26
 * ========================================================================= */
export const topic26SkillsHtml = `
<section id="topic-26-skills" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 26 · أدوات التنفيذ</span>
    <span class="step-pill">المهارات المخصصة وتوجيه الوكيل</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">المهارات المخصصة (Skills) وتوجيه وكيل البرمجة</h2>
      <div class="step-subtitle">تزويد الوكيل بتعليمات تخصصية وسياق منهجي دون حشو نافذة السياق أو تكرار الأوامر</div>
    </div>
  </div>

  <!-- 1. The Golden Rule -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. القاعدة الذهبية لمسار سلاح العصر</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يرتكز التعامل الهندسي مع أدوات الذكاء الاصطناعي في مشروعنا على معادلة رباعية حاسمة تمنع الفوضى وتحدد المسؤوليات بدقة:
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">👑</span>
        <span>القاعدة الذهبية لمنظومة التطوير (The Golden Rule)</span>
      </div>
      <p class="text-lg font-black text-emerald-950 dark:text-emerald-200 py-2">
        «Agent ينفّذ، Skill يرشده، MCP يوصله بالأدوات، وPRD يحدد المطلوب.»
      </p>
      <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)] mt-2">
        <li><strong>Agent (المنفذ):</strong> وكيل البرمجة الذي يقرأ الملفات ويكتب الكود ويشغّل الاختبارات.</li>
        <li><strong>Skill (المرشد):</strong> حزمة المعايير والتعليمات التخصصية التي تشرح للوكيل <em>كيف</em> ينفّذ نوعاً محدداً من المهام.</li>
        <li><strong>MCP (الجسر):</strong> البروتوكول القياسي الذي يربط الوكيل بالخدمات والبيانات الخارجية (مثل Stitch أو قواعد البيانات).</li>
        <li><strong>PRD (الحكم والمرجع):</strong> وثيقة متطلبات المنتج التي تحدد <em>ماذا</em> نبني، ولماذا، ولمن، وقواعد العمل الملزمة.</li>
      </ul>
    </div>
  </div>

  <!-- 2. Difference Between Prompt & Skill -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. الفرق الجوهري بين البرومبت (Prompt) والمهارة (Skill)</h3>
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>وجه المقارنة</th>
            <th>البرومبت (Prompt)</th>
            <th>المهارة المخصصة (Skill)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>طبيعة الاستخدام</strong></td>
            <td>توجيه لحظي لمرة واحدة (One-off prompt) ينتهي أثره بنهاية جلسة الحوار</td>
            <td>حزمة معرفة إجرائية دائمة وموثقة في المستودع قابلة لإعادة الاستخدام المتكرر</td>
          </tr>
          <tr>
            <td><strong>المحتوى المعتاد</strong></td>
            <td>طلب محدد: «أنشئ جدولاً»، «افحص خطأ في سطر 40»</td>
            <td>معايير معمارية كاملة، أنماط تصميم، مراجع أكواد، وإجراءات خطوة بخطوة</td>
          </tr>
          <tr>
            <td><strong>موقع الحفظ</strong></td>
            <td>مكتبة البرومبتات أو نافذة الدردشة</td>
            <td>ملف داخل المستودع (مثل <code>docs/skills/</code> أو <code>.cursorrules</code> أو ملفات تكوين الوكيل)</td>
          </tr>
          <tr>
            <td><strong>التفعيل وإدارة السياق</strong></td>
            <td>يُرسل في كل رسالة مما يستنزف نافذة السياق</td>
            <td>يُفعّل انتقائياً (On-Demand) عند الحاجة للمهمة التخصصية فقط</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout info my-4">
      <div class="callout-header">
        <span class="callout-icon">ℹ️</span>
        <span>توضيح مرحلي: مهارات المراحل المبكرة</span>
      </div>
      <p class="leading-7">
        استخدام أسلوب Grill Me في المحاضرة الأولى لم يكن اشتراطاً تقنياً مغلقاً يتطلب تثبيت أدوات متقدمة؛ بل كان أسلوباً استجوابياً حوارياً يمكن تنفيذه بمجرد نسخ البرومبت في أي واجهة دردشة ذكاء اصطناعي. تأجيل مفهوم المهارات المبرمجة إلى هذا الموضوع يهدف لتوظيفها في <strong>كود الواجهة الفعلي</strong> ومعايير Next.js وTypeScript.
      </p>
    </div>
  </div>

  <!-- 3. Skill Bloat & Context Efficiency -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. مشكلة «تخمة المهارات» (Skill Bloat) وإدارة السياق</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من الأخطاء القاتلة تفعيل 20 أو 30 مهارة في بيئة المطور دفعة واحدة. هذه الممارسة تؤدي إلى:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>تآكل نافذة السياق:</strong> تستهلك نصوص المهارات الطويلة جزءاً ضخماً من مساحة الـ Context المخصصة لمشروعك.</li>
      <li><strong>تضارب القواعد الهندسية:</strong> قد تنص مهارة قديمة على معايير React 18، بينما تنص مهارة حديثة على معايير React 19، مما يربك الوكيل.</li>
      <li><strong>بطء المعالجة وزيادة التكلفة:</strong> زيادة التوكنز في كل طلب يؤدي لبطء ملحوظ وقد يدخلك في حدود الحصص المجانية بسرعة.</li>
    </ul>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      <strong>القاعدة الاحترافية:</strong> فعّل المهارة المرتبطة بمرحلتك الحالية فقط. عند بناء واجهات الفرونت إند، فعّل مهارة معايير الفرونت، ودع مهارات الباك إند أو النشر معطلة حتى يحين وقتها.
    </p>
  </div>

  <!-- 4. Project-Specific Skill Example -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. مهارة معايير الفرونت إند لمشروع الطالب</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يقوم الطالب بكتابة مسودة تعليمات في <code>docs/skills/frontend-standards.md</code>. هذا مسار توثيق فقط؛ لا يعني أن الوكيل اكتشف المهارة أو ثبّتها. لتحميلها فعليًا اتبع دليل وكيلك للإصدار المثبت، أو أرفق الملف يدويًا بالسياق إذا لم يدعم المهارات. لا يوجد أمر استدعاء موحد مضمون لكل الوكلاء. المثال التالي مرتبط بإصدارات الدورة؛ طابقه مع package.json بعد تهيئة مشروعك:
    </p>

    <!-- Copyable Skill Snippet -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">docs/skills/frontend-standards.md (Reusable Project Skill)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ المهارة';},2000);})" aria-label="نسخ المهارة">نسخ المهارة</button>
      </div>
      <pre class="code-content"><code>---
name: frontend-standards
description: Enforce MET Academy Frontend standards for Next.js 15, React 19, Tailwind CSS and RTL.
---

# Frontend Engineering Skill: BorrowHub Standards

When generating or modifying frontend code:
1. Framework: Next.js 15 with App Router (src/app). Default to React Server Components; use 'use client' only for interactive state.
2. React: React 19 standards, no deprecated hooks or APIs.
3. Language: TypeScript in strict mode. All component props and data models MUST have explicit interfaces.
4. Direction & Accessibility: Complete RTL support by default using logical Tailwind classes (ms-*, me-*, ps-*, pe-*).
5. Colors & Spacing: Adhere strictly to DESIGN.md and the 8px grid scale. Never invent random hex colors.
6. Mock Data: Import initial data from src/data/mock-data.json; never hardcode ad-hoc records in JSX.
7. Verification: Run 'npm run lint' (tsc --noEmit) after every file creation to ensure zero type errors.</code></pre>
    </div>

    <!-- Visual Diagram: The Golden Rule Quadrant -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (14): مصفوفة القاعدة الذهبية وتكامل المهارات مع الوكيل والمواصفات</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 320" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مصفوفة القاعدة الذهبية">
          <!-- 4 Boxes Grid -->
          <!-- Top Left: PRD -->
          <rect x="50" y="30" width="320" height="115" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="210" y="60" fill="#60a5fa" font-size="14" font-weight="bold" text-anchor="middle">PRD (وثيقة المتطلبات)</text>
          <text x="210" y="85" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">«يحدد المطلوب وقواعد العمل»</text>
          <text x="210" y="110" fill="#94a3b8" font-size="10" text-anchor="middle">ماذا نبني؟ لمن نبني؟ وما حدود نطاق MVP؟</text>

          <!-- Top Right: Skill -->
          <rect x="430" y="30" width="320" height="115" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="590" y="60" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">Skill (المهارة التخصصية)</text>
          <text x="590" y="85" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">«يرشد الوكيل لطريقة الإنجاز»</text>
          <text x="590" y="110" fill="#94a3b8" font-size="10" text-anchor="middle">معايير Next.js، قواعد TypeScript، وأنماط RTL</text>

          <!-- Bottom Left: Agent -->
          <rect x="50" y="175" width="320" height="115" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="210" y="205" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">AI Agent (الوكيل البرمجي)</text>
          <text x="210" y="230" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">«ينفّذ المهام في بيئة المطور»</text>
          <text x="210" y="255" fill="#94a3b8" font-size="10" text-anchor="middle">قراءة الملفات، كتابة الكود، وإصلاح الأخطاء</text>

          <!-- Bottom Right: MCP -->
          <rect x="430" y="175" width="320" height="115" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
          <text x="590" y="205" fill="#a78bfa" font-size="14" font-weight="bold" text-anchor="middle">MCP (بروتوكول سياق النموذج)</text>
          <text x="590" y="230" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">«يوصل الوكيل بالأدوات الخارجية»</text>
          <text x="590" y="255" fill="#94a3b8" font-size="10" text-anchor="middle">جلب تصاميم Stitch وقراءة قواعد البيانات بأمان</text>

          <!-- Center Badge -->
          <circle cx="400" cy="160" r="30" fill="#0f172a" stroke="#e2e8f0" stroke-width="2"/>
          <text x="400" y="165" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">⚡</text>
        </svg>
      </div>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 27: MCP (بروتوكول سياق النموذج - Model Context Protocol)
 * Sequence Position: 27
 * ========================================================================= */
export const topic27McpHtml = `
<section id="topic-27-mcp" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 27 · أدوات التنفيذ</span>
    <span class="step-pill">المعمارية القياسية لربط الأدوات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">بروتوكول سياق النموذج (MCP - Model Context Protocol)</h2>
      <div class="step-subtitle">المعمارية القياسية لربط وكيل البرمجة بالأدوات الخارجية وأمان الصلاحيات قبل ربط Stitch MCP</div>
    </div>
  </div>

  <!-- 1. What is MCP & Why Now? -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. ما هو بروتوكول سياق النموذج (MCP) ولماذا ندرسه الآن؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      <strong>بروتوكول سياق النموذج (Model Context Protocol - MCP)</strong> هو معيار مفتوح المصدر أنشئ لتوحيد الطريقة التي تتصل بها تطبيقات الذكاء الاصطناعي بالبيانات والأدوات الخارجية. قبل MCP، كان كل وكيل وكل أداة يحتاج تكاملاً مخصصاً (Custom Integration)؛ أما مع MCP، فقد أصبح للأدوات بروتوكول موحد يشبه تماماً منفذ <code>USB</code> القياسي في عتاد الحواسيب.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      <strong>التمهيد الهندسي قبل الموضوع 28 (Stitch MCP):</strong> في الموضوع التالي سنقوم بربط خادم Stitch MCP لجلب تفاصيل الشاشات المعتمدة آلياً. لا يمكن للمتعلّم ربط Stitch بنجاح وفهم ما يحدث خلف الكواليس دون أن يستوعب أولاً كيف تعمل معمارية MCP، وكيف تُدار الصلاحيات، وأين تُحفظ إعدادات الخوادم، وكيف يُفصل بين المضيف والعميل والخادم.
    </p>

    <div class="callout info my-4">
      <div class="callout-header">
        <span class="callout-icon">ℹ️</span>
        <span>تأكيد استقلالية المراحل السابقة</span>
      </div>
      <p class="leading-7">
        المواضيع السابقة (1–26) نُفذت جميعها بنجاح دون الحاجة لوجود خوادم MCP. هذا التدرج يؤكد أن MCP أداة مساعدة لأتمتة جلب البيانات وتسريع التنفيذ، وليس عائقاً يوقف الطالب عن التفكير الهندسي أو تصميم واجهاته.
      </p>
    </div>
  </div>

  <!-- 2. The Three-Tier Architecture -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. معمارية MCP الثلاثية: Host و Client و Server</h3>
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>المكون</th>
            <th>الدور والمسؤولية</th>
            <th>مثال في مشروع الطالب</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المضيف (MCP Host)</strong></td>
            <td>بيئة التشغيل التي يستخدمها المطور، وتدير الجلسات وحوكمة الصلاحيات البشرية</td>
            <td>محرر Antigravity IDE، أو Claude Desktop، أو Cursor</td>
          </tr>
          <tr>
            <td><strong>العميل (MCP Client)</strong></td>
            <td>الطبقة البرمجية داخل الوكيل التي تتحدث بلغة البروتوكول وتطلب استدعاء الأدوات</td>
            <td>محرك العميل المدمج في وكيل البرمجة</td>
          </tr>
          <tr>
            <td><strong>الخادم (MCP Server)</strong></td>
            <td>برنامج خفيف يقدّم قدرات محددة (أدوات، موارد، برومبتات) عبر اتصال محلي (stdio) أو عبر الشبكة (SSE)</td>
            <td>خادم Stitch MCP، خادم قراءة نظام الملفات، خادم قاعدة البيانات PostgreSQL</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. MCP Primitives -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. قدرات MCP الأساسية الثلاث (MCP Primitives)</h3>
    <div class="grid gap-4 sm:grid-cols-3 my-4">
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
        <div class="text-emerald-600 dark:text-emerald-400 font-bold mb-1">1. الأدوات (Tools)</div>
        <div class="text-xs text-[var(--text-muted)] leading-6">
          دوال تنفيذية يطلب الوكيل تشغيلها مع تمرير بارامترات محددة (مثل: <code>list_screens</code> أو <code>run_query</code>). تتطلب عادةً موافقة المستخدم.
        </div>
      </div>
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
        <div class="text-blue-600 dark:text-blue-400 font-bold mb-1">2. الموارد (Resources)</div>
        <div class="text-xs text-[var(--text-muted)] leading-6">
          بيانات وسجلات قابلة للقراءة دون إحداث أثر جانبي، تشبه طلب <code>GET</code> (مثل: قراءة ملف تصميم أو قراءة مخطط جدول).
        </div>
      </div>
      <div class="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card-subtle)] p-4">
        <div class="text-purple-600 dark:text-purple-400 font-bold mb-1">3. البرومبتات (Prompts)</div>
        <div class="text-xs text-[var(--text-muted)] leading-6">
          قوالب توجيه مسبقة الصنع ومضمّنة داخل الخادم لمساعدة المستخدم في صياغة المهام الخاصة بتلك الأداة بكفاءة.
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Security & Configuration -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. أمان التكوين وحماية الأسرار في MCP</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لربط أي خادم MCP في بيئتك، يُستخدم ملف تكوين محلي (Local JSON Configuration). تفرض معاييرنا الهندسية القواعد التالية:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>عزل ملفات تكوين MCP:</strong> إعدادات خوادم MCP التي تحتوي على مفاتيح API أو توكنز تُحفظ في مجلد الإعدادات المحلي الخاص بالمحرر (وليس داخل المستودع العام المرفوع إلى GitHub).</li>
      <li><strong>مبدأ الصلاحيات الأقل (Least Privilege):</strong> لا تفعّل إلا خوادم MCP التي تحتاجها بالفعل للمهمة الحالية؛ لمنع التداخل وحماية النظام.</li>
      <li><strong>المسار البديل اليدوي:</strong> إذا تعذر تثبيت خادم MCP أو لم يدعمه محرر الطالب، يظل بإمكان المتعلّم دائماً تصدير التصاميم والبيانات يدوياً وتضمينها في ملفات المشروع دون أي عائق في المسار التعليمي.</li>
    </ul>

    <!-- LTR Code Snippet: MCP Configuration Example -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Standard Local MCP Configuration Template (JSON)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ التكوين';},2000);})" aria-label="نسخ التكوين">نسخ التكوين</button>
      </div>
      <pre class="code-content"><code>{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/student-project"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}</code></pre>
    </div>

    <!-- Visual Diagram: MCP Architecture & Permission Handshake -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (15): معمارية بروتوكول سياق النموذج ومصافحة الصلاحيات (Permission Handshake)</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 320" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="معمارية بروتوكول سياق النموذج">
          <!-- Left: User / Host -->
          <rect x="30" y="40" width="210" height="240" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="135" y="75" fill="#60a5fa" font-size="14" font-weight="bold" text-anchor="middle">MCP Host & Client</text>
          <text x="135" y="98" fill="#94a3b8" font-size="11" text-anchor="middle">(Antigravity IDE / Cursor)</text>
          <rect x="50" y="125" width="170" height="35" rx="4" fill="#0f172a"/>
          <text x="135" y="147" fill="#f8fafc" font-size="11" text-anchor="middle">المطور البشري (User)</text>
          <rect x="50" y="175" width="170" height="35" rx="4" fill="#0f172a"/>
          <text x="135" y="197" fill="#38bdf8" font-size="11" text-anchor="middle">AI Agent Controller</text>
          <rect x="50" y="225" width="170" height="35" rx="4" fill="#1e1e38"/>
          <text x="135" y="247" fill="#a78bfa" font-size="11" text-anchor="middle">MCP Client Engine</text>

          <!-- Middle: Security Handshake Gateway -->
          <rect x="290" y="60" width="180" height="200" rx="8" fill="#1e1e38" stroke="#f59e0b" stroke-width="2"/>
          <text x="380" y="95" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">بوابة الصلاحيات</text>
          <text x="380" y="125" fill="#e2e8f0" font-size="11" text-anchor="middle">1. استكشاف القدرات</text>
          <text x="380" y="150" fill="#38bdf8" font-size="10" text-anchor="middle">(Tools / Resources)</text>
          <text x="380" y="180" fill="#e2e8f0" font-size="11" text-anchor="middle">2. طلب إذن التنفيذ</text>
          <text x="380" y="205" fill="#34d399" font-size="10" text-anchor="middle">✓ موافقة المطور</text>
          <text x="380" y="235" fill="#f87171" font-size="10" text-anchor="middle">عزل الأسرار محلياً</text>

          <!-- Arrows -->
          <path d="M 245 150 L 285 150" stroke="#38bdf8" stroke-width="2"/>
          <path d="M 475 150 L 515 150" stroke="#38bdf8" stroke-width="2"/>

          <!-- Right: MCP Servers & Tools -->
          <rect x="520" y="40" width="250" height="240" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="645" y="75" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">MCP Servers & Services</text>
          
          <rect x="540" y="105" width="210" height="45" rx="4" fill="#0f172a" stroke="#8b5cf6"/>
          <text x="645" y="125" fill="#c4b5fd" font-size="11" font-weight="bold" text-anchor="middle">Stitch MCP Server (الموضوع 28)</text>
          <text x="645" y="142" fill="#94a3b8" font-size="9" text-anchor="middle">جلب الشاشات والـ Metadata</text>

          <rect x="540" y="160" width="210" height="45" rx="4" fill="#0f172a"/>
          <text x="645" y="180" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Filesystem Server</text>
          <text x="645" y="197" fill="#94a3b8" font-size="9" text-anchor="middle">قراءة وكتابة ملفات المشروع</text>

          <rect x="540" y="215" width="210" height="45" rx="4" fill="#0f172a"/>
          <text x="645" y="235" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Database / Postgres Server</text>
          <text x="645" y="252" fill="#94a3b8" font-size="9" text-anchor="middle">استعلام الهيكل والجداول بأمان</text>
        </svg>
      </div>
    </div>
  </div>

  <!-- 5. Outputs -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. مخرجات الموضوع والجاهزية لموضوع Stitch MCP</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يوثّق الطالب فهمه لبروتوكول MCP، وخريطة الصلاحيات، ونموذج التكوين المحلي في ملف <code>docs/MCP_FOUNDATIONS.md</code>. بهذه المعرفة الصلبة، يصبح الطالب مؤهلاً بالكامل للانتقال إلى الموضوع 28 لربط خادم Stitch MCP مع Antigravity IDE واستخراج أصول التصميم بثقة وأمان.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * EXPORTED TOPIC ITEMS (Topic 24, 25, 26, 27)
 * ========================================================================= */
export const t09Entries: TopicItem[] = [
  {
    id: 'ai-coding-agent',
    number: '24',
    slug: 'ai-coding-agent',
    title: 'وكيل البرمجة بالذكاء الاصطناعي (AI Coding Agent)',
    subtitle: 'مفهوم الوكيل، صلاحيات الملفات والأوامر، إدارة السياق، وأمان الأسرار دون فرض بيئة محددة',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'أدوات التنفيذ البرمجي',
    summary: 'نقل إعداد وكيل البرمجة إلى مدخل تنفيذ الكود بدل إثقال بداية المسار به. شرح دور وكيل البرمجة كمنفذ للمهام البرمجية، نموذج الصلاحيات (قراءة وتعديل الملفات وتشغيل أوامر الطرفية)، إدارة نافذة السياق (Context Window) وتجنب الحشو، إدارة الأسرار والمتغيرات البيئية (.env) وحمايتها من التسريب في Git، مع التأكيد الصارم على حرية اختيار الأداة وعدم فرض أي اشتراك مدفوع.',
    tags: ['Coding Agent', 'Permissions', 'Context Management', 'Secrets Security', '.env', '.gitignore', 'No Vendor Lock-in', 'No Subscription Assumption'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic24CodingAgentHtml),
    htmlContent: topic24CodingAgentHtml,

    goal: 'تهيئة وكيل البرمجة على مشروع الطالب بفهم عميق لنموذج الصلاحيات وأمان الأسرار والحدود الآمنة لتشغيل الأوامر، وإدارة سياق الملفات بفعالية، دون التقيد بوكيل محدد أو افتراض أي اشتراكات مدفوعة.',
    prerequisites: [
      'النموذج التفاعلي المعتمد (الموضوع 23)',
      'مستودع المشروع الموثق على Git وGitHub (الموضوعان 05 و06)',
      'بيئة عمل برمجية (Node.js ومحرر الكود)',
      'ملاحظة: المواضيع السابقة (1–23) نُفذت تحليلياً وبصرياً دون الحاجة لتثبيت وكلاء برمجة'
    ],
    steps: [
      '1. اختر وكيل البرمجة المناسب لبيئتك (مثل Antigravity CLI/IDE، أو Cursor، أو Claude Code، أو Aider، أو أي بديل مفضل) دون إجبار على تبديل أداتك أو شراء اشتراك.',
      '2. افحص نطاق صلاحيات الوكيل: تأكد من تفعيل صلاحيات قراءة الملفات في مجلد المشروع وحظر الوصول إلى خارج مجلد العمل.',
      '3. اضبط إعدادات تشغيل الأوامر (Terminal Permissions): اجعل الأوامر الحساسة أو التدميرية (مثل rm، drop، git push force) مشروطة بالموافقة اليدوية الصريحة.',
      '4. أنشئ ملف .env.local للأسرار والمفاتيح وتأكد من تضمينه في .gitignore لمنع رفعه إلى GitHub نهائياً.',
      '5. جهّز ملف docs/PROJECT_CONTEXT.md لتقديم سياق مركز وموجز للوكيل دون استنزاف نافذة السياق (Context Window) بملفات غير لازمة.',
      '6. وثّق تعليمات وإعدادات الوكيل المعتمدة لمشروعك في docs/CODING_AGENT_SETUP.md وافحص اتصال الوكيل وقراءته لمجلد المشروع.'
    ],
    promptRefs: [
      'prompt-04-github-documentation-setup',
      'prompt-24-frontend-only-next-js-plan'
    ],
    outputs: [
      'docs/CODING_AGENT_SETUP.md',
      '.env.example',
      '.gitignore (محدث بحماية الأسرار)'
    ],
    checklist: [
      'تأكيد أن المراحل التحليلية والتصميمية السابقة أُنجزت بنجاح دون اشتراط وكيل برمجة.',
      'حرية اختيار وكيل البرمجة دون فرض أداة بعينها أو اشتراط شراء خدمة مدفوعة.',
      'تحديد صلاحيات الملفات وحصر وصول الوكيل داخل حدود مجلد المشروع فقط.',
      'حماية الأسرار والمفاتيح عبر .env وإدراجها الصارم في .gitignore وعدم تضمينها في البرومبتات.',
      'إدارة السياق (Context Management) وتفادي تحميل كامل المستودع عشوائياً لتجنب الهلوسة والنفاد.',
      'توثيق إعدادات الوكيل واختبار تشغيله الأولي على مشروع الطالب في docs/CODING_AGENT_SETUP.md.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 24,
  },
  {
    id: 'google-ai-studio',
    number: '25',
    slug: 'google-ai-studio',
    title: 'استخدام Google AI Studio في استكشاف النماذج وتوليد الأصول',
    subtitle: 'بيئة تجربة نماذج Gemini، إدارة المفاتيح والتعليمات، وتوليد البيانات التمثيلية (Mock Data) دون تشتيت متطلبات المشروع',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'أدوات التنفيذ البرمجي',
    summary: 'موقع Google AI Studio في مسار التنفيذ بجانب أدوات الواجهة، لمنع تشتيت المراحل المبكرة من اكتشاف المتطلبات. شرح استخدام المنصة لاختبار نماذج Gemini (مثل Gemini 1.5 Pro وFlash)، ضبط تعليمات النظام (System Instructions)، استخراج البيانات التمثيلية (Mock Data) بصيغة JSON وفق معطيات ERD وجرد الشاشات، وإدارة مفاتيح API بأمان، مع إيضاح حدود الاستخدام المجاني ومعدلات الطلبات (Rate Limits) دون افتراض اشتراكات أو ضمانات غير مشروطة.',
    tags: ['Google AI Studio', 'Gemini API', 'System Instructions', 'Mock Data', 'JSON Mode', 'API Keys', 'Rate Limits', 'No Subscription Assumption'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic25AiStudioHtml),
    htmlContent: topic25AiStudioHtml,

    goal: 'استخدام Google AI Studio كمنصة سريعة لاختبار النماذج، وضبط تعليمات النظام، وتوليد البيانات التمثيلية (Mock Data) لمشروع الطالب بصيغة JSON مطابقة لـ ERD، واستخراج مفتاح API وتأمينه محلياً مع إدراك حدود الاستخدام المجاني.',
    prerequisites: [
      'حساب Google للوصول إلى Google AI Studio',
      'مخطط الكيانات والعلاقات docs/ERD.md (الموضوع 14)',
      'جرد الشاشات docs/SCREEN_INVENTORY.md (الموضوع 20)',
      'وكيل البرمجة المهيأ (الموضوع 24)'
    ],
    steps: [
      '1. افتح منصة Google AI Studio الرسمية (aistudio.google.com) وسجّل الدخول بحساب Google دون الحاجة لشراء أي اشتراك.',
      '2. تعرّف على واجهة المنصة: اختيار النموذج (Gemini 1.5 Flash / Pro)، نافذة التعليمات (System Instructions)، ومعاملات التوليد (Temperature وSafety Settings).',
      '3. أدخل وصف دور النظام وهيكل البيانات المستخرج من docs/ERD.md لتوليد بيانات تمثيلية واقعية (Mock Data) لمشروعك (مثل معدات وتصنيفات BorrowHub).',
      '4. فعّل نمط الإخراج الهيكلي (Structured Outputs / JSON Mode) لضمان الحصول على كائنات JSON نقية قابلة للاستهلاك المباشر في واجهة Next.js.',
      '5. أنشئ مفتاح API جديداً من لوحة Get API key، واحفظه مباشرة في ملف .env.local محلياً، ولا تضعه في أي ملف ترفعه لـ Git.',
      '6. احفظ عينة البيانات المولدة في src/data/mock-data.json، ووثق سير العمل في docs/AI_STUDIO_WORKFLOW.md مع توضيح حدود الاستخدام المجاني.'
    ],
    promptRefs: [
      'prompt-02-generate-prd-after-grill-me',
      'prompt-24-frontend-only-next-js-plan'
    ],
    outputs: [
      'docs/AI_STUDIO_WORKFLOW.md',
      'src/data/mock-data.json'
    ],
    checklist: [
      'فهم موضع Google AI Studio كأداة تنفيذ مساعدة بجانب الواجهة وليس شرطاً لمراحل المتطلبات الأولى.',
      'الوصول للمنصة الرسمية عبر aistudio.google.com دون افتراض أي اشتراك مدفوع.',
      'استخدام System Instructions ونمط JSON لتوليد Mock Data واقعية لمشروع الطالب.',
      'توليد مفتاح API وتأمينه حصرياً داخل .env.local مع الحظر التام لرفعه إلى GitHub.',
      'استيعاب حدود الاستخدام المجاني ومعدلات الطلب (Rate Limits: RPM/TPM) وإعداد معالجة الأخطاء.',
      'توثيق تجربة الاستكشاف والبيانات التمثيلية في docs/AI_STUDIO_WORKFLOW.md.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 25,
  },
  {
    id: 'agent-skills',
    number: '26',
    slug: 'agent-skills',
    title: 'المهارات المخصصة (Skills) وتوجيه وكيل البرمجة',
    subtitle: 'تزويد الوكيل بتعليمات تخصصية وسياق منهجي دون حشو نافذة السياق أو تكرار الأوامر',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'أدوات التنفيذ البرمجي',
    summary: 'مفهوم المهارات البرمجية المخصصة (Skills) كتعليمات تخصصية إجرائية ترشد الوكيل لطريقة إنجاز مهام معينة وفق أفضل الممارسات. ترسيخ القاعدة الذهبية: «الوكيل ينفّذ، والمهارة ترشده، وMCP يوصله بالأدوات، وPRD يحدد المطلوب». شرح الفرق بين البرومبت العابر والمهارة الدائمة، كيفية تنظيم المهارات في ملفات المشروع دون استنزاف السياق، وتوضيح أن مهارات مثل Grill Me أو UI/UX Pro Max ليست عائق تثبيت مسبق لاكتشاف المتطلبات.',
    tags: ['Agent Skills', 'Custom Skills', 'Golden Rule', 'Context Efficiency', 'Skill Architecture', 'Reusable Instructions', 'No Subscription Assumption'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic26SkillsHtml),
    htmlContent: topic26SkillsHtml,

    goal: 'بناء وتفعيل مهارة مخصصة (Custom Skill) لمشروع الطالب ترشد وكيل البرمجة إلى معايير التطوير (Next.js 15, TypeScript, Tailwind, RTL) وإدارة تفعيل المهارات حسب الحاجة لمنع تشتت نافذة السياق، وفق القاعدة الذهبية للمسار.',
    prerequisites: [
      'وكيل البرمجة المهيأ (الموضوع 24)',
      'وثيقة متطلبات المنتج docs/PRD.md (الموضوع 03)',
      'نظام التصميم المعتمد (الموضوع 22)',
      'توضيح: استخدام Grill Me في الموضوع 02 كان أسلوباً استجوابياً ولا يشترط تثبيت مهارات تقنية مسبقة'
    ],
    steps: [
      '1. استوعب القاعدة الذهبية للمسار الهندسي: Agent ينفّذ، Skill يرشده، MCP يوصله بالأدوات، وPRD يحدد المطلوب.',
      '2. ميّز بين البرومبت (توجيه لحظي لمرة واحدة) والمهارة (Skill: معرفة إجرائية متكررة تُستدعى عند الحاجة لنوع محدد من المهام).',
      '3. حلّل مشكلة «تخمة المهارات» (Skill Bloat): تجنب تفعيل عشرات المهارات غير ذات الصلة حتى لا تستنزف نافذة السياق وتشتت دقة الوكيل.',
      '4. أنشئ مهارة مخصصة لمشروعك (مثلاً docs/skills/frontend-standards.md أو .project-rules.md) تتضمن: بنية المشروع، قواعد TypeScript الصارمة، مكونات Tailwind، ودعم RTL.',
      '5. اختبر استدعاء المهارة مع وكيلك عبر توجيه مهمة فرعية (مثل توليد مكون بطاقة المعدة وفق المعايير الموثقة).',
      '6. وثّق المهارات وطريقة التحميل الفعلية في وكيلك داخل docs/PROJECT_AGENT_SKILLS.md؛ استخدم إرفاق الملف يدويًا عند غياب دعم المهارات، ولا تدّع أنها مثبّتة لمجرد حفظها في docs.'
    ],
    promptRefs: [
      'prompt-25-ui-ux-pro-max-review-before-coding',
      'prompt-27-spec-kit-constitution'
    ],
    outputs: [
      'docs/PROJECT_AGENT_SKILLS.md',
      'docs/skills/frontend-standards.md'
    ],
    checklist: [
      'استيعاب دور المهارة (Skill) كمرشد إجرائي للوكيل وتمييزها عن البرومبت الفردي.',
      'ترسيخ القاعدة الذهبية: Agent ينفّذ، Skill يرشده، MCP يوصله بالأدوات، وPRD يحدد المطلوب.',
      'التأكيد على أن مراحل المتطلبات السابقة لم تشترط تثبيت مهارات تقنية أو إيقاف الطالب عندها.',
      'حماية نافذة السياق من التخمة عبر التفعيل الانتقائي للمهارات المرتبطة بالمهمة فقط.',
      'إنشاء مهارة معايير الفرونت إند لمشروع الطالب (Next.js 15, TypeScript, Tailwind, RTL).',
      'توثيق بنية المهارات في docs/PROJECT_AGENT_SKILLS.md دون التقيد بأداة محددة أو اشتراك.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 26,
  },
  {
    id: 'mcp-protocol',
    number: '27',
    slug: 'mcp-protocol',
    title: 'بروتوكول سياق النموذج (MCP - Model Context Protocol)',
    subtitle: 'المعمارية القياسية لربط وكيل البرمجة بالأدوات الخارجية وأمان الصلاحيات قبل ربط Stitch MCP',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'أدوات التنفيذ البرمجي',
    summary: 'تأسيس فهم بروتوكول سياق النموذج (Model Context Protocol - MCP) كمعيار مفتوح يربط وكلاء البرمجة بمصادر البيانات والأدوات الخارجية (مثل أنظمة الملفات، وقواعد البيانات، وStitch MCP لاحقاً). شرح معمارية Client-Host-Server، أنواع القدرات (Tools, Resources, Prompts)، حوكمة الصلاحيات (Permission Handshake)، وإدارة أسرار خوادم MCP في ملفات الإعداد المحلية، مع التأكيد على المسار البديل اليدوي في حال تعذر تشغيل MCP.',
    tags: ['MCP', 'Model Context Protocol', 'MCP Architecture', 'Tools & Resources', 'Permissions Handshake', 'Local Config', 'Security Boundaries', 'No Vendor Lock-in'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic27McpHtml),
    htmlContent: topic27McpHtml,

    goal: 'فهم البنية الأساسية لبروتوكول سياق النموذج (MCP) كطبقة تكامل قياسية بين الوكيل والأدوات، وإدارة صلاحيات وأسرار الخوادم محلياً بأمان، كتمهيد لازم قبل ربط Stitch MCP في الموضوع اللاحق.',
    prerequisites: [
      'وكيل البرمجة المهيأ (الموضوع 24)',
      'مهارات الوكيل وقواعد المشروع (الموضوع 26)',
      'بيئة تشغيل Node.js وnpx لأدوات MCP',
      'إيضاح: لا يُشترط إعداد MCP في المواضيع السابقة (1–23)؛ المسار كان مستقلاً تماماً'
    ],
    steps: [
      '1. استوعب معمارية MCP: المضيف (Host: وكيل البرمجة أو المحرر)، العميل (MCP Client)، والخادم (MCP Server) الذي يوفر أدوات وموارد عبر بروتوكول موحد.',
      '2. تعرّف على قدرات MCP الثلاث: الأدوات (Tools: دوال تنفيذية)، الموارد (Resources: بيانات للقراءة)، والبرومبتات (Prompts: قوالب استدعاء جاهزة).',
      '3. ادرس حوكمة الصلاحيات (Security & Permissions): كيف يطلب الخادم الإذن قبل تشغيل أي أداة تؤثر على النظام أو تجلب بيانات حساسة.',
      '4. افهم إدارة الأسرار: إدخال المفاتيح والتوكنز في ملف إعدادات المضيف المحلي (مثل mcp_settings.json أو .env)، والامتناع البات عن حفظها في ملفات المستودع.',
      '5. تدرّب على قراءة ملف إعدادات خادم MCP محلي قياسي (مثل خادم قراءة نظام الملفات أو الذاكرة) واختبار التحقق من الاتصال.',
      '6. وثّق فهم معمارية MCP ومصفوفة الصلاحيات في docs/MCP_FOUNDATIONS.md مع تجهيز بيئتك للموضوع التالي (Stitch MCP).'
    ],
    promptRefs: [
      'prompt-22-stitch-mcp-connection-verification'
    ],
    outputs: [
      'docs/MCP_FOUNDATIONS.md',
      'نموذج إعداد خادم محلي تجريبي (MCP Config Template)'
    ],
    checklist: [
      'استيعاب معمارية MCP المفتوحة ودورها كجسر قياسي بين الوكيل والأدوات الخارجية.',
      'التأكيد الصارم على أن المتطلبات والتصميمات السابقة لم تشترط وجود MCP لتنفيذها.',
      'فحص قدرات MCP الثلاث: Tools وResources وPrompts ونموذج الصلاحيات المرافق لها.',
      'تطبيق سياسة عزل الأسرار وعدم رفع ملفات تكوين MCP الحاوية على مفاتيح إلى Git.',
      'توفر المسار البديل اليدوي في حال لم تدعم بيئة الطالب بروتوكول MCP دون إيقاف المسار.',
      'توثيق أسس ومعمارية البروتوكول في docs/MCP_FOUNDATIONS.md تمهيداً لربط Stitch MCP.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 27,
  },
];
