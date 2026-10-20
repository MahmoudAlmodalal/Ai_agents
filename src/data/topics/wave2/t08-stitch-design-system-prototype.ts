import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 21: GOOGLE STITCH & REFERENCE SCREEN (تصميم الشاشة المرجعية)
 * Sequence Position: 21
 * ========================================================================= */
export const topic21StitchHtml = `
<section id="topic-21-stitch" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 21 · المحطة الأساسية</span>
    <span class="step-pill">تصميم الواجهات والشاشة المرجعية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">تصميم الشاشة المرجعية الأولى في Google Stitch</h2>
      <div class="step-subtitle">تأسيس الهوية البصرية ونمط التخطيط واللغة المشتركة بشاشة تمثيلية واحدة قبل توليد بقية الشاشات</div>
    </div>
  </div>

  <!-- 1. The Single Reference Screen Rule -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. قاعدة الشاشة المرجعية الواحدة: منع الانجراف البصري والتشتت</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الخطأ الفادح الأكثر شيوعاً عند استخدام أدوات التصميم بالذكاء الاصطناعي (مثل <strong>Google Stitch</strong>) هو كتابة برومبت ضخم يطلب توليد كامل شاشات التطبيق دفعة واحدة. هذه الممارسة تؤدي حتماً إلى <strong>الانجراف البصري (Visual Drift)</strong>: تباين أحجام الأزرار وهوامش الحقول من شاشة لأخرى، اختلال لوحة الألوان، وتناقض التايبوجرافي وتجربة المستخدم بين الصفحات.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      المنهج الهندسي المعتمد في مسارنا يفرض قاعدة حاسمة: <strong>ابدأ بشاشة مرجعية تمثيلية واحدة فقط (One Reference Screen First)</strong>. نختار شاشة محورية تجسد جوهر نطاق النسخة الأولى (MVP)، مثل شاشة تصفح واستعارة المعدات (Browse Equipment) في مشروع BorrowHub، ونركز كافة جهودنا على حسم هويتها، وتناسق ألوانها، وتوزيع مساحاتها، واتجاه RTL، قبل التفكير في توليد أي شاشة أخرى.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>لماذا شاشة واحدة أولاً؟</span>
      </div>
      <p class="leading-7">
      الشاشة المرجعية دليل على القرارات المرئية التي يمكن فحصها في ذلك التصميم، وليست دليلاً على قاعدة عامة لكل مشروع. وثّق الخطوط والمسافات والألوان وأشكال المكونات التي تظهر فعلاً، وميّزها عن المقترحات. يمكن تجربة قاعدة 60-30-10 أو مقياس مسافات 8px كاتفاق اختياري للمشروع، لكن لا تعتبرهما متطلبين عالميين ولا تفرضهما إذا خالفا المرجع أو احتياج المستخدم.
      </p>
    </div>
  </div>

  <!-- 2. Tool Reference & Availability Status -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. مرجع Google Stitch وحالة التوفر الفعلي للأداة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نلتزم في هذا المسار التعليمي بعرض الروابط الرسمية المعتمدة وتوضيح حالة التوفر الفعلية للأدوات دون اختراع روابط وهمية أو تزييف توفر الميزات:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الأداة / المرجع</th>
            <th>الوظيفة في هذا الموضوع</th>
            <th>الرابط الرسمي المعتمد</th>
            <th>حالة التوفر الفعلي والتوجيه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google Stitch</strong></td>
            <td>توليد الواجهات والشاشات وتجربتها بصرياً انطلاقاً من الوصف النصي</td>
            <td><a href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">stitch.withgoogle.com</a></td>
            <td><span class="badge-available">متاح رسميًا من Google</span> (يتطلب تسجيل الدخول بحساب Google؛ قد تخضع بعض الميزات التوليدية للتدرج الجغرافي)</td>
          </tr>
          <tr>
            <td><strong>Google Codelab: Design to Code</strong></td>
            <td>دليل Google الإرشادي العملي لربط التصميم بالكود</td>
            <td><a href="https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch?hl=ar" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">codelabs.developers.google.com</a></td>
            <td><span class="badge-available">توثيق مرجعي متاح</span> (مادة تعليمية رسمية باللغة العربية تشرح تكامل Stitch)</td>
          </tr>
          <tr>
            <td><strong>بديل أداة التصميم عند تعذر الوصول</strong></td>
            <td>تصميم الشاشة التمثيلية عبر Figma أو HTML Wireframe بنفس البرومبت</td>
            <td><span class="text-[var(--text-muted)]">مسار بديل محلي</span></td>
            <td><span class="badge-conditional">مسار بديل مشروط</span> (إذا لم تتوفر الأداة في حسابك، يمكن تطبيق البرومبتات ذاتها على Figma أو عارض HTML دون تغيير القواعد)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>تنبيه هندسي: تأجيل أدوات التنفيذ والكود</span>
      </div>
      <p class="leading-7">
        في هذا الموضوع (موضوع 21) والموضوعين التاليين (22 و23)، ينصب عمل الطالب كلياً على <strong>التصميم وتجربة المستخدم</strong>. لا نثبت وكلاء برمجة (AI Coding Agents)، ولا نربط Stitch MCP، ولا نعد ملف DESIGN.md أو بيئة Next.js؛ فهذه الأدوات موقعها الصحيح يبدأ من الموضوع 24 فصاعداً بعد اعتماد التصميم بالكامل.
      </p>
    </div>
  </div>

  <!-- 3. Master Stitch Prompt Generator (PROMPT 16) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. البرومبت الرئيسي لمشروعك في Google Stitch (PROMPT 16)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا تبدأ بكتابة أوامر عشوائية داخل Stitch. استخدم برومبت مولّد البرومبت الرئيسي (PROMPT 16) المعتمد في المسار، والذي يوجّه النموذج لقراءة <code>PRD.md</code> و<code>UX_BLUEPRINT.md</code> و<code>SCREEN_INVENTORY.md</code> وتوليد برومبت Stitch مخصص بالكامل لمشروعك، مع حثّه صراحةً على توليد <strong>شاشة تمثيلية واحدة فقط</strong>:
    </p>

    <!-- Copyable PROMPT 16 Container -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 16 — Project-Specific Stitch Master Prompt Generator</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ برومبت 16">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Google Stitch Prompt Engineer.
Read PRD, UX_BLUEPRINT.md, SCREEN_INVENTORY.md and approved branding.
Generate a READY-TO-PASTE master prompt for Google Stitch tailored to
this actual product: its users, platform, roles, journeys, layout needs,
accessibility, language, RTL if relevant, visual direction and shared UI rules.
Ask Stitch to produce ONE representative MVP screen first and establish
a consistent design direction. Do not generate all screens at once.
Save docs/STITCH_MASTER_PROMPT.md.</code></pre>
    </div>

    <p class="leading-8 text-[var(--text-muted)]">
      احفظ الناتج المولّد في مستودع مشروعك داخل ملف <code>docs/STITCH_MASTER_PROMPT.md</code> قبل تطبيقه في واجهة Stitch، ليكون سجلاً موثقاً يخضع للمراجعة والإصدار في Git.
    </p>
  </div>

  <!-- 4. Case Study: BorrowHub Reference Screen Structure -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. دراسة حالة BorrowHub: تشريح الشاشة المرجعية (Browse Equipment)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مشروع BorrowHub (وهو دراسة حالة استرشادية واختيارية توضح طريقة التحليل، ويمكنك استبدالها بشاشة تمثيلية في مشروعك الخاص دون أي قيود)، تم اختيار شاشة <strong>تصفح المعدات (Browse Equipment)</strong> كشاشة مرجعية؛ لأنها تجمع أهم مكونات المنصة وقواعد العمل الموثقة في وثيقة PRD:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>الشريط العلوي (Navbar):</strong> يوضح هوية المنصة، ودور المستخدم (طالب معتمد)، ومؤشر الاستعارات النشطة الحالية (حد أقصى جهازين - PRD Rule 3).</li>
      <li><strong>شريط البحث والتصفية:</strong> بحث فوري مع فلترة حسب الأقسام (كاميرات، حواسيب، بروجكتورات).</li>
      <li><strong>شبكة البطاقات (Cards Grid):</strong> بطاقة المعدة القياسية، وتتضمن: صورة العنصر، اسمه، قسمه، شارة حالة التوفر (متاح: X وحدات / محجوز بالكامل)، وزر الإجراء الأساسي (CTA).</li>
      <li><strong>التوجيه العربي الكامل (RTL):</strong> محاذاة العناصر من اليمين لليسار مع إبقاء المسميات التقنية الإنجليزية واضحة.</li>
    </ul>

    <!-- Visual Structural Diagram / SVG Wireframe -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (11): المخطط الهيكلي للشاشة المرجعية المعتمدة لمشروع BorrowHub</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 420" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="رسم تخطيطي للشاشة المرجعية تصفح المعدات">
          <!-- Top Navbar -->
          <rect x="0" y="0" width="800" height="50" fill="#1e293b"/>
          <circle cx="765" cy="25" r="12" fill="#2563eb"/>
          <text x="740" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="end">BorrowHub · نظام استعارة الأجهزة</text>
          <rect x="180" y="12" width="180" height="26" rx="13" fill="#334155"/>
          <text x="270" y="29" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">استعارات نشطة: 1 من 2 (الحد الأقصى)</text>
          <circle cx="50" cy="25" r="14" fill="#10b981"/>
          <text x="50" y="29" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">طالب</text>

          <!-- Search & Filter Bar -->
          <rect x="30" y="68" width="520" height="42" rx="6" fill="#1e293b" stroke="#334155"/>
          <text x="530" y="94" fill="#64748b" font-size="12" text-anchor="end">🔍 ابحث باسم المعدة، الكاميرا، المعمل...</text>
          <rect x="565" y="68" width="105" height="42" rx="6" fill="#1e293b" stroke="#334155"/>
          <text x="617" y="94" fill="#94a3b8" font-size="12" text-anchor="middle">التصنيف: الكل ▾</text>
          <rect x="685" y="68" width="85" height="42" rx="6" fill="#2563eb"/>
          <text x="727" y="94" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">بحث</text>

          <!-- Card 1 (Available) -->
          <rect x="535" y="125" width="235" height="265" rx="8" fill="#1e293b" stroke="#334155"/>
          <rect x="535" y="125" width="235" height="120" rx="8" fill="#334155"/>
          <text x="652" y="190" fill="#94a3b8" font-size="13" text-anchor="middle">📷 صورة المعدة</text>
          <text x="755" y="265" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="end">Sony Alpha A7 IV</text>
          <text x="755" y="285" fill="#94a3b8" font-size="11" text-anchor="end">معمل الميديا والتوثيق</text>
          <rect x="660" y="300" width="95" height="22" rx="4" fill="#064e3b"/>
          <text x="707" y="315" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">متاح: 4 وحدات</text>
          <rect x="550" y="335" width="205" height="34" rx="6" fill="#2563eb"/>
          <text x="652" y="357" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">طلب استعارة</text>

          <!-- Card 2 (Limited Stock) -->
          <rect x="282" y="125" width="235" height="265" rx="8" fill="#1e293b" stroke="#334155"/>
          <rect x="282" y="125" width="235" height="120" rx="8" fill="#334155"/>
          <text x="399" y="190" fill="#94a3b8" font-size="13" text-anchor="middle">💻 صورة اللابتوب</text>
          <text x="502" y="265" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="end">MacBook Pro 16 M3</text>
          <text x="502" y="285" fill="#94a3b8" font-size="11" text-anchor="end">معمل الذكاء الاصطناعي</text>
          <rect x="407" y="300" width="95" height="22" rx="4" fill="#451a03"/>
          <text x="454" y="315" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">متاح: 1 وحدة فقط</text>
          <rect x="297" y="335" width="205" height="34" rx="6" fill="#2563eb"/>
          <text x="399" y="357" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">طلب استعارة</text>

          <!-- Card 3 (Unavailable / Reserved) -->
          <rect x="30" y="125" width="235" height="265" rx="8" fill="#1e293b" stroke="#334155"/>
          <rect x="30" y="125" width="235" height="120" rx="8" fill="#334155"/>
          <text x="147" y="190" fill="#94a3b8" font-size="13" text-anchor="middle">📽️ صورة البروجكتور</text>
          <text x="250" y="265" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="end">Epson 4K Laser</text>
          <text x="250" y="285" fill="#94a3b8" font-size="11" text-anchor="end">قاعة المؤتمرات</text>
          <rect x="155" y="300" width="95" height="22" rx="4" fill="#450a0a"/>
          <text x="202" y="315" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">محجوز بالكامل</text>
          <rect x="45" y="335" width="205" height="34" rx="6" fill="#334155"/>
          <text x="147" y="357" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">غير متوفر حالياً</text>
        </svg>
      </div>
      <div class="diagram-caption text-xs text-[var(--text-muted)] mt-2 text-center">
        الشكل يوضح كيف تعكس الشاشة المرجعية قواعد PRD (المخزون، الرصيد، والحد الأقصى) داخل تصميم بصري عربي RTL متسق.
      </div>
    </div>
  </div>

  <!-- 5. Single Screen Refinement (PROMPT 19) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. تنقيح الشاشة المرجعية حتى الاعتماد (PROMPT 19)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نادراً ما يُعطي التوليد الأول نتيجة متكاملة من المحاولة الأولى. عند رصد مشكلات بصرية (مثل هوامش غير متناسقة، خط غير مقروء في وضع الموبايل، أو شارات حالة باهتة التباين)، <strong>لا تُعد توليد المشروع بالكامل</strong>، بل استخدم برومبت التنقيح الفردي (PROMPT 19) المخصص لمعالجة المشكلات المرصودة في هذه الشاشة حصراً مع تثبيت بقية القرارات:
    </p>

    <!-- Copyable PROMPT 19 Container -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 19 — Single Screen Refinement in Stitch</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ برومبت 19">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Improve ONLY the selected screen.
Specific problems to correct: [WRITE OBSERVED PROBLEMS].
Preserve the approved Design System, content, user role, functions,
navigation destinations and shared component patterns.
Explain what changed. Do not redesign unrelated screens or add features.</code></pre>
    </div>

    <p class="leading-8 text-[var(--text-muted)]">
      كرر دورة التنقيح حتى تصبح الشاشة التمثيلية مطابقة لكافة معايير القبول. بمجرد اعتمادها، تكون جاهزاً للانتقال إلى الموضوع التالي لاستخراج نظام التصميم وصياغة برومبتات منفصلة لبقية شاشات المشروع.
    </p>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 22: DESIGN SYSTEM & SCREEN PROMPTS (قواعد نظام التصميم وبرومبتات الشاشات)
 * Sequence Position: 22
 * ========================================================================= */
export const topic22DesignSystemHtml = `
<section id="topic-22-design-system" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 22 · المحطة الأساسية</span>
    <span class="step-pill">النظم البصرية وتوليد الشاشات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">قواعد نظام التصميم وتوليد برومبتات الشاشات المنفصلة</h2>
      <div class="step-subtitle">استخراج الرموز البصرية من الشاشة المرجعية وتطبيقها عبر برومبت مستقل لكل شاشة في جرد MVP دون كتابة كود</div>
    </div>
  </div>

  <!-- 1. Design System Rules & Core Anatomy -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. القواعد الهندسية لنظام التصميم (Design System Rules)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نظام التصميم يوثق القرارات المرئية التي اختارها المشروع ومصادرها، ثم يساعد الفريق على تطبيقها باتساق. بعد مراجعة الشاشة المرجعية في الموضوع السابق، استخرج القواعد التي يدعمها الدليل فقط، وسجل القيم غير المؤكدة على أنها <code>UNKNOWN</code>. الأمثلة التالية وسائل اختيارية للنقاش، وليست قواعد إلزامية لكل واجهة:
    </p>

    <div class="grid-3col my-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
      <!-- Rule 1: Colors 60-30-10 -->
      <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="color: #3b82f6; margin-bottom: 0.5rem; font-weight: bold;">🎨 قاعدة الألوان 60-30-10</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
          قاعدة 60-30-10 اقتراح بصري اختياري لتجربة توزيع الألوان، وليست نسبة نجاح عامة. إذا جرّبها المشروع، راجعها مقابل الشاشة المرجعية واحتياجات القراءة والتباين؛ قد تحتاج الواجهات إلى توزيع آخر، ولا يقتصر اللون البارز بالضرورة على أزرار الإجراء.
        </p>
      </div>

      <!-- Rule 2: Typography Scale -->
      <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="color: #10b981; margin-bottom: 0.5rem; font-weight: bold;">📐 مقياس التايبوجرافي المتزن</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
          يمكن أن تكون Cairo وInter أو أحجام H1/H2/Body أمثلة أولية فقط. اختر الخطوط والأحجام وارتفاع السطر من متطلبات المشروع ومراجعة القراءة الفعلية؛ لا توجد عائلة خط أو قيمة واحدة تناسب جميع اللغات والشاشات.
        </p>
      </div>

      <!-- Rule 3: 8px Grid Spacing -->
      <div class="card-inner" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="color: #a855f7; margin-bottom: 0.5rem; font-weight: bold;">📏 شبكة المسافات القياسية (8px Grid)</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
          يمكن تجربة شبكة 8px أو مقياس آخر لتنظيم المسافات، بشرط أن يتوافق مع المرجع واحتياجات التخطيط. سجل القيم التي اعتمدها المشروع فقط، واترك غير المقاس أو غير المحسوم كـ <code>UNKNOWN</code>.
        </p>
      </div>
    </div>

    <!-- Common UI states to consider -->
    <div class="table-container my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">حالات واجهة شائعة تُراجع عند انطباقها (UI States to Consider)</h4>
      <table class="data-table">
        <thead>
          <tr>
            <th>الحالة التفاعلية</th>
            <th>الظهور السلوكي في الواجهة</th>
            <th>توجيه عند الحاجة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. الحالة الافتراضية (Default / Populated)</strong></td>
            <td>عرض البيانات العادية المكتملة للمستخدم</td>
            <td>تنظيم المعلومات بتسلسل هرمي بصري واضح، مع إبراز الإجراء الأساسي.</td>
          </tr>
          <tr>
            <td><strong>2. حالة التحميل (Loading / Skeleton)</strong></td>
            <td>انتظار جلب البيانات من الخادم</td>
            <td>أظهر تقدماً مناسباً عند انتظار عملية؛ اختر Skeleton أو مؤشراً آخر بما يلائم السياق، ولا توحِ بأن البيانات جاهزة.</td>
          </tr>
          <tr>
            <td><strong>3. الحالة الفارغة (Empty State)</strong></td>
            <td>انعدام النتائج أو خلو السجل (مثل نتيجة بحث منعدمة)</td>
            <td>اشرح عدم وجود النتائج وأظهر خطوة تالية مفيدة إذا كان ذلك مدعوماً بالمهمة.</td>
          </tr>
          <tr>
            <td><strong>4. حالة الخطأ (Error State)</strong></td>
            <td>فشل الاتصال أو رفض العملية من قواعد العمل</td>
            <td>اشرح المشكلة والخطوة التالية؛ لا تعتمد على اللون وحده ولا تعرض إعادة المحاولة إن لم تكن مناسبة.</td>
          </tr>
          <tr>
            <td><strong>5. الحالة المعطلة (Disabled State)</strong></td>
            <td>عنصر أو زر غير متاح حالياً</td>
            <td>بيّن أن الإجراء غير متاح ووفّر السبب بطريقة قابلة للإدراك بلوحة المفاتيح وقارئ الشاشة عند انطباقه؛ لا تعتمد على التحويم وحده.</td>
          </tr>
          <tr>
            <td><strong>6. حالة حظر الصلاحية (Permission Denied)</strong></td>
            <td>محاولة وصول ممنوعة وفق قاعدة صلاحيات موثقة</td>
            <td>أظهر رسالة أو مساراً مناسباً فقط إذا حددت المتطلبات قاعدة الصلاحية والسلوك.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Accessibility and RTL Rules -->
    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">♿</span>
        <span>إمكانية الوصول وتباين الألوان ودعم RTL</span>
      </div>
      <p class="leading-7">
        - <strong>تباين الألوان:</strong> افحص النص وفق حجمه ووزنه (4.5:1 للنص العادي، و3:1 للنص الكبير)، وافحص حدود وأجزاء التحكم غير النصية وفق معيارها المناسب. لا تدّعِ النجاح دون قياس.<br/>
        - <strong>مساحات التفاعل:</strong> اختر مساحة الهدف وفق معيار الوصول والمنصة المستهدفين وافحصها؛ 44×44 CSS px قيمة إرشادية شائعة للراحة وليست شرطاً عاماً من WCAG AA لكل عنصر.<br/>
        - <strong>دعم الاتجاه (RTL First):</strong> تدفق القوائم، محاذاة العناوين، وسلاسل البطاقات تبدأ من اليمين، مع انعكاس اتجاه أيقونات الأسهم والتنقل.
      </p>
    </div>
  </div>

  <!-- 2. Stitch Design System Prompt (PROMPT 17) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. برومبت استخراج نظام التصميم (PROMPT 17)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نستخدم برومبت نظام التصميم (PROMPT 17) لتثبيت لغة التصميم وتفصيل الرموز (Tokens) استناداً إلى الشاشة المرجعية المعتمدة وهوية المنتج، دون ابتداع هوية متخيلة تخالف متطلبات PRD:
    </p>

    <!-- Copyable PROMPT 17 Container -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 17 — Stitch Design System</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ برومبت 17">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Design System Architect.
Using my approved brand and the representative Stitch screen,
define colors, type scale, spacing, radii, shadows, grids, icons,
buttons, inputs, cards, tables, dialogs, navigation, semantic states,
breakpoints, keyboard/focus/contrast rules and RTL guidance if applicable.
Do not invent a different brand. Preserve requirements.
Use only values supported by the approved reference; write UNKNOWN when
the reference does not establish a value. Treat 60-30-10 color allocation
and an 8px spacing grid as optional proposals, not universal rules.
Check contrast against the applicable WCAG criterion and do not claim a pass
without a measurement. Do not invent a different brand. Preserve requirements.
Apply the reviewed shared rules consistently to subsequent Stitch screens.</code></pre>
    </div>
  </div>

  <!-- 3. One Prompt Per Screen Architecture & PROMPT 18 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. فلسفة «برومبت منفصل لكل شاشة» (One Prompt Per Screen)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      السر في نجاح النظم البصرية المتسقة هو <strong>عدم خلط الشاشات في برومبت واحد</strong>. لكل شاشة من شاشات جرد الـ MVP في <code>SCREEN_INVENTORY.md</code>، نكتب برومبت كاملاً، مستقلاً، وقابلاً للنسخ المنفصل. هذا الانفصال يضمن:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>حماية ميزانية السياق (Context Window):</strong> تركيز نموذج الذكاء الاصطناعي على متطلبات وتفاعلات شاشة واحدة بكل حالاتها.</li>
      <li><strong>حالات الواجهة:</strong> حدد الحالات الملائمة للمصدر مثل Default وLoading وEmpty وError وDisabled؛ اطلب Permission Denied فقط إذا كان PRD يحدد قاعدة صلاحية. الاستجابة وإمكانية الوصول فحوص عابرة للحالات.</li>
      <li><strong>تسهيل المراجعة والتعديل:</strong> إذا احتاجت نافذة تأكيد الحجز (Modal) إلى تحسين، نعدل برومبتها فقط دون التأثير على بقية الشاشات.</li>
    </ul>

    <!-- Copyable PROMPT 18 Container -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 18 — Generate One Prompt per Screen</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ برومبت 18">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Google Stitch Prompt Engineer.
Read approved PRD, SCREEN_INVENTORY.md and the approved Design System.
Create a COMPLETE, individually copyable Stitch prompt for EVERY MVP screen.
For each include ID, title, role, purpose, hierarchy, content, data,
components, CTA, validation, navigation, default/loading/empty/error/disabled
states as relevant. Include a permission-denied state only when the PRD defines
the rule; otherwise preserve it as an open question. Add success feedback when
a source requirement defines it. Check responsive behavior, keyboard/focus,
contrast and RTL across states; these are review dimensions, not UI-state
variants. Use source-backed values and write UNKNOWN for unobserved tokens.
Preserve the reviewed shared visual rules.
Sort screens in user-flow order. Do not omit any or add new MVP features.
Save docs/STITCH_SCREEN_PROMPTS.md.
Do not generate frontend code.</code></pre>
    </div>

    <!-- Explicit Warning: No Code Yet -->
    <div class="callout warning my-6">
      <div class="callout-header">
        <span class="callout-icon">🛑</span>
        <span>خط أحمر هندسي: منع كتابة أو توليد الكود في هذه المرحلة</span>
      </div>
      <p class="leading-7">
        لاحظ الجملة الحاسمة في ختام البرومبت: <code>Do not generate frontend code</code>. نحن لا نطلب من النموذج كتابة كود Next.js أو React أو Tailwind في هذا الموضوع! الهدف هو حسم التوجه البصري، وإنشاء ملف <code>docs/STITCH_SCREEN_PROMPTS.md</code> وتوليد كافة شاشات MVP في أداة التصميم لتكون جاهزة لاختبار النموذج التفاعلي في الموضوع القادم.
      </p>
    </div>
  </div>

  <!-- 4. Practical Screen Breakdown in BorrowHub -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. تطبيق عملي: تفكيك برومبتات شاشات BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في ملف <code>docs/STITCH_SCREEN_PROMPTS.md</code> لمشروع BorrowHub (كدراسة حالة تطبيقية استرشادية واختيارية؛ تطبق نفس الهيكلية المنفصلة على شاشات مشروعك الخاص دون التقيد ببيانات هذا المثال)، تم ترتيب برومبتات الشاشات وفق تسلسل مسار تدفق المستخدم (User Flow Order):
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>معرف الشاشة</th>
            <th>اسم الشاشة</th>
            <th>الدور والمستخدم</th>
            <th>الحالات الحرجة المطلوب تمثيلها في البرومبت</th>
            <th>التسلسل في التدفق</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>SCR-01</code></td>
            <td>تصفح المعدات (Browse Equipment)</td>
            <td>طالب جامعي معتمد</td>
            <td>الحالة الممتلئة، نتيجة بحث فارغة، وفلترة حسب المعمل</td>
            <td>نقطة الدخول الرئيسية (Entry Point)</td>
          </tr>
          <tr>
            <td><code>SCR-02</code></td>
            <td>تفاصيل المعدة (Equipment Detail)</td>
            <td>طالب جامعي معتمد</td>
            <td>المواصفات الفنية، رصيد الوحدات، وزر الإجراء الأساسي</td>
            <td>الانتقال المباشر بعد اختيار المعدة</td>
          </tr>
          <tr>
            <td><code>SCR-03</code></td>
            <td>نافذة طلب الاستعارة (Borrow Modal)</td>
            <td>طالب جامعي معتمد</td>
            <td>فحص الحد الأقصى (جهازين)، تحديد تاريخ الإرجاع، وحالة الخطأ</td>
            <td>إجراء الحجز التفاعلي</td>
          </tr>
          <tr>
            <td><code>SCR-04</code></td>
            <td>لوحة اعتماد الطلبات (Staff Dashboard)</td>
            <td>مسؤول المعمل / المستودع</td>
            <td>قوائم الانتظار، أزرار الاعتماد والتسليم، وتوثيق فحص التلف</td>
            <td>مسار إدارة العمليات والمخزون</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 23: PROTOTYPE & JOURNEY VALIDATION (النموذج التفاعلي وفحص الرحلات)
 * Sequence Position: 23
 * ========================================================================= */
export const topic23PrototypeHtml = `
<section id="topic-23-prototype" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 23 · المحطة الأساسية</span>
    <span class="step-pill">فحص النماذج والتحقق التفاعلي</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">النموذج التفاعلي (Prototype) والتحقق من رحلات وحالات النظام</h2>
      <div class="step-subtitle">ربط الشاشات المعتمدة واختبار مسارات النجاح والفشل والتراجع دون الاكتفاء بأزرار تجربة شكلية وهمية</div>
    </div>
  </div>

  <!-- 1. The Core Philosophy: Real Journey Validation vs Fake Demo Button -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. فلسفة النموذج التفاعلي: فحص سلوكي صارم بدل «زر التجربة الوهمي»</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مشاريع الهواة، يُعرض النموذج الأولي كصفحة ثابتة تحتوي على زر برّاق يحمل نص "جرب النموذج الآن" (Fake Demo Button)؛ وعند النقر عليه، إما ألا يحدث شيء على الإطلاق (رابط فارغ <code>href="#"</code>)، أو ينتقل المستخدم إلى شاشة وهمية لا تختبر أي مسار حقيقي!
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      في هندسة البرمجيات الاحترافية، <strong>النموذج التفاعلي (Interactive Prototype) هو أداة فحص واختبار قبل كتابة سطر كود واحد</strong>. وظيفته التحقق من صحة الرحلات الكاملة للمستخدم (User Journeys)، والتأكد من انعدام الشاشات المعزولة (Dead Ends)، ومطابقة السلوك لقواعد العمل الموثقة في وثيقة PRD.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">⚡</span>
        <span>معادلة الانتقال التفاعلي المنضبط</span>
      </div>
      <p class="leading-7">
        كل انتقال بين شاشات النموذج يجب أن يُعرّف بصيغة رباعية واضحة:<br/>
        <strong>الشاشة المصدر (Origin)</strong> ← <strong>مشغل الإجراء (Trigger: نقرة، تقديم نموذج، تبديل تبويب)</strong> ← <strong>الشاشة الوجهة (Destination)</strong> ← <strong>سلوك الإلغاء والرجوع (Back / Cancel Behavior)</strong>.
      </p>
    </div>
  </div>

  <!-- 2. Transition Matrix & Journey Verification -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. مصفوفة فحص الرحلات والحالات التفاعلية (Journey Verification Matrix)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا يقتصر فحص النموذج على مسار النجاح السهل (Happy Path)؛ بل يجب إخضاع النموذج لاختبارات الحالات الحدية والاعتذار. يوضح الجدول التالي مصفوفة الفحص الشاملة المعتمدة لمشروع BorrowHub (وهي دراسة حالة إيضاحية واختيارية توضح آلية تدقيق الانتقالات لتقيس عليها مسارات مشروعك الخاص):
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>مسار الرحلة</th>
            <th>الشاشة المصدر والمشغل</th>
            <th>الشاشة الوجهة والنتيجة</th>
            <th>سلوك التراجع (Back / Cancel)</th>
            <th>القاعدة المرتبطة في PRD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>مسار النجاح الكامل (Happy Path)</strong></td>
            <td>شاشة التصفح ← النقر على معدة متاحة ← النقر على "طلب استعارة" وتأكيد النموذج</td>
            <td>شاشة تأكيد الحجز وصدور رمز الاستلام خلال مهلة 48 ساعة</td>
            <td>زر الرجوع يعيد المستخدم إلى قائمة المعدات مع الحفاظ على موضع التمرير</td>
            <td>قاعدة الاستعارة القياسية والمهلة 48 ساعة (PRD Rule 7)</td>
          </tr>
          <tr>
            <td><strong>حظر تجاوز الحد الأقصى (Limit Exceeded)</strong></td>
            <td>طالب لديه طلبان نشطان ← النقر على "طلب استعارة" على معدة جديدة</td>
            <td>ظهور إشعار خطأ صريح وحظر زر التأكيد: «بلغت الحد الأقصى لجهازين نشطين»</td>
            <td>إغلاق النافذة المنبثقة والعودة لشاشة تفاصيل المعدة دون إنشاء طلب معلق</td>
            <td>حظر حجز أكثر من جهازين للطالب (PRD Rule 3)</td>
          </tr>
          <tr>
            <td><strong>المعدة غير متوفرة (Out of Stock)</strong></td>
            <td>تصفح المعدات ← معدة رصيدها 0 وحدات</td>
            <td>زر طلب الاستعارة معطل مع رسالة نفاد المخزون؛ لا نضيف إشعارات خارج نطاق MVP المعتمد</td>
            <td>لا يوجد انتقال معطل، يظل الطالب في صفحة التصفح</td>
            <td>إدارة رصيد الوحدات المتاحة وحظر الطلب السلبي</td>
          </tr>
          <tr>
            <td><strong>الحالة الفارغة للبحث (Empty Search)</strong></td>
            <td>كتابة اسم معدة غير موجودة في صندوق البحث</td>
            <td>عرض شاشة فارغة مع رسم هادف وزر: «مسح الفلاتر والبحث مجدداً»</td>
            <td>النقر على زر مسح الفلاتر يعيد قائمة المعدات كاملة فورياً</td>
            <td>منع الشاشات المعزولة وتمكين التعافي السريع</td>
          </tr>
          <tr>
            <td><strong>صلاحيات الأدوار (Role Permission)</strong></td>
            <td>طالب يحاول الوصول إلى لوحة اعتماد الطلبات الخاصة بالمسؤولين</td>
            <td>شاشة حظر الوصول (Permission Denied) مع توجيه صريح للرئيسية</td>
            <td>زر "العودة للرئيسية" يعيد الطالب فورياً لشاشة تصفح المعدات</td>
            <td>فصل صلاحيات الطلاب عن مسؤولي المعمل</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. Prototype Prompt (PROMPT 20) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. برومبت بناء النموذج التفاعلي في Stitch (PROMPT 20)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم برومبت بناء النموذج التفاعلي (PROMPT 20) لربط كافة الشاشات المعتمدة وفق مصفوفة التدفق، واكتشاف أي شاشات مفقودة أو مسارات منقطعة قبل الانتقال إلى مرحلة التنفيذ البرمجي:
    </p>

    <!-- Copyable PROMPT 20 Container -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 20 — Stitch Prototype</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ برومبت 20">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Review the approved screens and UX Blueprint.
Create or refine the interactive prototype by connecting existing screens.
For each transition define origin, trigger, destination, back/cancel behavior,
success and failure outcomes, and role restrictions.
Test main user journeys. Report missing or disconnected screens.
Do not invent new flows or features.</code></pre>
    </div>
  </div>

  <!-- 4. Visual UX Audit (PROMPT 21) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. التدقيق البصري الشامل للنموذج الأولي (PROMPT 21)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      قبل إغلاق مرحلة التصميم واعتمادها، نُخضع النموذج لاختبار تدقيق بصري شامل (Visual UX Audit) باستخدام برومبت 21 لمراجعة التناسق الهرمي، تباين الألوان، التجاوب عبر الشاشات المختلفة، وسهولة الوصول، وتصنيف المشكلات المرصودة حسب خطورتها:
    </p>

    <!-- Copyable PROMPT 21 Container -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 21 — Visual UX Audit</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ برومبت 21">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior UX Auditor.
Review all Stitch screens and the prototype against the PRD and design system.
Check hierarchy, forms, CTA visibility, mobile/desktop responsiveness,
contrast, keyboard accessibility, RTL, visual consistency, empty/loading/error
states and complete navigation flows. Rank issues Critical/Major/Minor.</code></pre>
    </div>

    <p class="leading-8 text-[var(--text-muted)]">
      وثّق نتائج هذا الفحص في ملف <code>docs/PROTOTYPE_JOURNEYS_AUDIT.md</code>. إذا كانت هناك ملاحظات حرجة (Critical)، يجب تصحيحها في الشاشات ونظام التصميم قبل الشروع في إعداد أدوات كود الفرونت إند في الموضوع القادم.
    </p>
  </div>

  <!-- 5. Status & Reference Notice -->
  <div class="content-block mt-8">
    <div class="callout tip">
      <div class="callout-header">
        <span class="callout-icon">📌</span>
        <span>حالة الميزات والمراجع التفاعلية</span>
      </div>
      <p class="leading-7">
        - <strong>رابط المنصة:</strong> يتم تجربة النموذج التفاعلي مباشرة داخل مشروعك على <a href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer" class="text-emerald-600 dark:text-emerald-400 font-bold underline">Google Stitch</a>.<br/>
        - <strong>في حال عدم تفعيل الربط التفاعلي بحسابك:</strong> يُعتمد الربط التفاعلي عبر Figma Prototype أو مصفوفة الانتقالات الموثقة كبديل معتمد بدلاً من وضع أزرار تجربة وهمية غير متصلة.<br/>
        - <strong>لا توجد ملفات تنزيل صورية:</strong> يعتمد التوثيق على مصفوفة الانتقالات المكتوبة وتقرير التدقيق <code>docs/PROTOTYPE_JOURNEYS_AUDIT.md</code>.
      </p>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * WAVE 2 TOPIC ENTRIES EXPORT (TICKETS 21, 22, 23)
 * ========================================================================= */
export const t08Entries: TopicItem[] = [
  {
    id: 'stitch-reference-screen',
    number: '21',
    slug: 'stitch-reference-screen',
    title: 'تصميم الشاشة المرجعية في Google Stitch',
    subtitle: 'ابدأ بشاشة تمثيلية واحدة لحسم الهوية واللغة البصرية قبل توليد بقية الشاشات',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'تصميم الواجهات والشاشة المرجعية',
    summary: 'استخدام Google Stitch لتصميم الشاشة المرجعية الأولى لنطاق MVP استناداً إلى PRD وUX Blueprint وجرد الشاشات. يركز الموضوع على منع خطأ توليد الشاشات دفعة واحدة، وصياغة البرومبت الرئيسي المخصص (PROMPT 16)، وتثبيت اتجاه RTL والتخطيط العام، وتنقيح الشاشة المختارة عبر (PROMPT 19) حتى اعتمادها كمرجع وحيد.',
    tags: ['Google Stitch', 'Reference Screen', 'MVP', 'PROMPT 16', 'PROMPT 19', 'RTL', 'UI/UX', 'BorrowHub'],
    contentTypes: ['prompt', 'code', 'checklist'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic21StitchHtml),
    htmlContent: topic21StitchHtml,

    goal: 'تصميم واعتماد شاشة تمثيلية مرجعية واحدة (Reference Screen) في Google Stitch تحسم الهوية البصرية والتخطيط وتوزيع العناصر واتجاه RTL لنطاق MVP، وتوثيق البرومبت الرئيسي في docs/STITCH_MASTER_PROMPT.md قبل الانتقال لأي شاشة أخرى.',
    prerequisites: [
      'وثيقة متطلبات المنتج docs/PRD.md',
      'مخطط تجربة المستخدم docs/UX_BLUEPRINT.md',
      'جرد الشاشات المعتمد docs/SCREEN_INVENTORY.md',
      'حساب Google Stitch على https://stitch.withgoogle.com/ (أو أداة تصميم بديلة عند عدم التوفر)'
    ],
    steps: [
      '1. اختر الشاشة الأكثر تمثيلاً لجوهر المنتج ونطاق الـ MVP (مثل شاشة Browse Equipment في مشروع BorrowHub الاسترشادي الاختياري، أو شاشة مكافئة في مشروعك الخاص).',
      '2. افتح منصة Google Stitch عبر الرابط المعتمد https://stitch.withgoogle.com/ وسجّل الدخول بحساب Google.',
      '3. اقرأ وثائق PRD.md وUX_BLUEPRINT.md وSCREEN_INVENTORY.md لاستخراج سياق المشروع والأدوار والشاشة المرجعية فقط.',
      '4. استخدم برومبت مولّد البرومبت الرئيسي (PROMPT 16) لصياغة برومبت مخصص لمشروعك، واطلب توليد شاشة مرجعية واحدة أولاً، وامتنع صراحةً عن توليد جميع الشاشات معاً.',
      '5. احفظ البرومبت المخصص في مستودع مشروعك داخل docs/STITCH_MASTER_PROMPT.md.',
      '6. الصق البرومبت في Google Stitch، وافحص الناتج الأولي: التخطيط، التسلسل الهرمي، قابلية القراءة، اتجاه RTL، وحجم العناصر التفاعلية.',
      '7. استخدم برومبت التنقيح الفردي (PROMPT 19) لمعالجة أي مشكلات بصرية محددة (مثل الهوامش، RTL، أو زر الإجراء الرئيسي) دون إضافة ميزات خارج MVP.',
      '8. اعتمد الشاشة المرجعية المكتملة ووثق لقطاتها ومعرفاتها لتكون الأساس لنظام التصميم في الموضوع التالي.'
    ],
    promptRefs: [
      'prompt-16-project-specific-stitch-master-prompt-generator',
      'prompt-19-single-screen-refinement-in-stitch'
    ],
    outputs: [
      'docs/STITCH_MASTER_PROMPT.md',
      'الشاشة المرجعية المعتمدة في Google Stitch'
    ],
    checklist: [
      'البدء بشاشة تمثيلية واحدة فقط (مثل تصفح المعدات) وعدم توليد شاشات متعددة في وقت واحد.',
      'صياغة وحفظ docs/STITCH_MASTER_PROMPT.md وفق معطيات PRD وUX Blueprint الحقيقية دون تخمين.',
      'التحقق من دعم اتجاه RTL وملاءمة النصوص العربية والأزرار والأيقونات.',
      'تنقيح الشاشة المرجعية عبر PROMPT 19 ومعالجة الملاحظات المحددة بدقة.',
      'اعتماد الشاشة كمرجع وحيد قبل الانتقال لبناء نظام التصميم أو بقية الشاشات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 21,
  },
  {
    id: 'design-system-rules',
    number: '22',
    slug: 'design-system-rules',
    title: 'قواعد نظام التصميم وبرومبتات الشاشات المنفصلة',
    subtitle: 'استخراج قواعد النظام البصري من الشاشة المرجعية وتطبيقها على برومبت مستقل لكل شاشة',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'النظم البصرية وتوليد الشاشات',
    summary: 'صياغة وتوثيق قواعد نظام التصميم من قيم الشاشة المرجعية التي يمكن فحصها، مع إبقاء 60-30-10 وشبكة 8px أمثلة اختيارية لا متطلبات عامة. يتضمن العمل حالات المكونات وإرشادات إمكانية الوصول وRTL، ثم يكتب برومبتاً مستقلاً لكل شاشة في جرد الشاشات داخل docs/STITCH_SCREEN_PROMPTS.md دون كود.',
    tags: ['Design System', 'Color Tokens', 'Typography', '8px Grid', 'UI States', 'PROMPT 17', 'PROMPT 18', 'A11y'],
    contentTypes: ['prompt', 'code', 'checklist'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic22DesignSystemHtml),
    htmlContent: topic22DesignSystemHtml,

    goal: 'استخراج قواعد نظام التصميم المعتمدة وتوثيقها استناداً للشاشة المرجعية وهوية المشروع، وتوليد برومبتات مستقلة ومنفصلة لكل شاشة من شاشات MVP وفق تسلسل رحلة المستخدم وتوثيقها في docs/STITCH_SCREEN_PROMPTS.md مع الحفاظ على وحدة النظام البصري وتجنب كتابة أي كود برمجي.',
    prerequisites: [
      'الشاشة المرجعية المعتمدة من Google Stitch (الموضوع 21)',
      'docs/STITCH_MASTER_PROMPT.md',
      'جرد الشاشات docs/SCREEN_INVENTORY.md',
      'وثيقة PRD.md'
    ],
    steps: [
      '1. حلّل عناصر الشاشة المرجعية المعتمدة لاستخراج لغة التصميم المشتركة (الألوان، التايبوجرافي، المسافات، الحواف، والظلال).',
      '2. استخدم برومبت نظام التصميم (PROMPT 17: Stitch Design System) لتحديد قواعد النظام البصري دون اختراع هوية متخيلة أو تغيير متطلبات PRD.',
      '3. وثّق قيم الألوان ومصادرها، وافحص التباين مقابل معيار WCAG المناسب لحجم النص ووزنه؛ يمكن تجربة 60-30-10 أو شبكة 8px كاتفاق اختياري، ولا تسجلها كقاعدة للمشروع قبل قبولها.',
      '4. حدّد الحالات التفاعلية القياسية لكل مكون: (الحالة الافتراضية Default، التحميل Skeleton/Loading، الحالة الفارغة Empty State، وحالة الخطأ والرفض Error/Denied).',
      '5. استخدم برومبت توليد برومبت منفصل لكل شاشة (PROMPT 18: Generate One Prompt per Screen) لقراءة SCREEN_INVENTORY.md وصياغة برومبت مستقل كامل لكل شاشة من شاشات MVP.',
      '6. تأكد أن كل برومبت شاشة يتضمن: المعرف الرقمي، العنوان، الدور المستهدف، التسلسل الهرمي، المكونات، حالات الواجهة المطلوبة، والالتزام بالقواعد التي لها مصدر فقط؛ أبق القيم المجهولة واضحة.',
      '7. احفظ جميع برومبتات الشاشات مرتبة حسب تدفق المستخدم (User Flow Order) في ملف docs/STITCH_SCREEN_PROMPTS.md.',
      '8. قف هنا وتأكد من عدم توليد أي كود برمجي (Frontend/React/Next.js) في هذه المرحلة؛ العمل ينحصر في تجهيز الشاشات في أداة التصميم.'
    ],
    promptRefs: [
      'prompt-17-stitch-design-system',
      'prompt-18-generate-one-prompt-per-screen'
    ],
    outputs: [
      'docs/STITCH_SCREEN_PROMPTS.md',
      'شاشات MVP المصممة في Google Stitch'
    ],
    checklist: [
      'استخراج وتوثيق رموز التصميم (الألوان، الخطوط، المسافات، الحواف) من الشاشة المرجعية المعتمدة.',
      'مراجعة التباين وفق معيار WCAG المناسب؛ نسبة 4.5:1 تنطبق على النص العادي، وتحتاج الأحجام أو الأوزان الأخرى إلى معيارها المناسب. لا تسجل نجاحاً قبل القياس.',
      'صياغة برومبت مستقل ومنفصل لكل شاشة من شاشات جرد MVP دون تجميع عشوائي.',
      'تحديد حالات الواجهة التي يقتضيها كل تدفق؛ لا تضف Permission Denied إلا إذا عرّفت المتطلبات صلاحية وسلوكاً لها، وسجّل الاستجابة وإمكانية الوصول كفحوص عابرة.',
      'حفظ جميع البرومبتات في docs/STITCH_SCREEN_PROMPTS.md مرتبة بمسار تدفق المستخدم.',
      'الالتزام التام بعدم كتابة أو توليد كود برمجي في هذه المرحلة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 22,
  },
  {
    id: 'interactive-prototype',
    number: '23',
    slug: 'interactive-prototype',
    title: 'النموذج التفاعلي (Prototype) والتحقق من الرحلات',
    subtitle: 'ربط الشاشات وفحص مسارات المستخدم وحالات النظام بدل عرض أزرار تجربة وهمية',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'فحص النماذج والتحقق التفاعلي',
    summary: 'بناء النموذج التفاعلي (Interactive Prototype) بربط شاشات MVP المصممة في Google Stitch، واختبار الرحلات السلوكية الكاملة للمستخدمين. يركز الموضوع على منع وهم "زر التجربة الشكلي" (Fake Demo Button)، ويُخضع النموذج لفحص دقيق يشمل: تحديد المشغلات والوجهات، مسار النجاح، مسارات الفشل والاعتذار، حالات التراجع والإلغاء، وقيود الصلاحيات، مع إجراء فحص تدقيق بصري شامل (PROMPT 21) قبل البدء في مرحلة الكود.',
    tags: ['Prototype', 'User Journeys', 'Happy Path', 'Failure Path', 'No Fake Demo Button', 'PROMPT 20', 'PROMPT 21', 'UX Audit'],
    contentTypes: ['prompt', 'code', 'checklist'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic23PrototypeHtml),
    htmlContent: topic23PrototypeHtml,

    goal: 'بناء نموذج تفاعلي متكامل يربط شاشات MVP في Google Stitch، وفحص جميع رحلات المستخدم (Happy & Failure Paths) وحالات النظام والتراجع وصلاحيات الأدوار بدقة، بدلاً من وضع أزرار تجربة شكلية وهمية، وتوثيق نتائج التدقيق البصري في docs/PROTOTYPE_JOURNEYS_AUDIT.md.',
    prerequisites: [
      'شاشات MVP المصممة في Google Stitch (الموضوع 22)',
      'مسارات تدفق المستخدم docs/user-flow.md',
      'وثيقة متطلبات المنتج docs/PRD.md',
      'جرد الشاشات docs/SCREEN_INVENTORY.md'
    ],
    steps: [
      '1. راجع شاشات MVP المصممة وتأكد من اكتمال الشاشات المطلوبة لمسار المستخدم من نقطة الدخول حتى نقطة الخروج.',
      '2. افتح مشروع التصميم في Google Stitch وفعّل نمط النموذج التفاعلي (Prototype Mode) أو نمط الربط بين الشاشات.',
      '3. استخدم برومبت النموذج التفاعلي (PROMPT 20: Stitch Prototype) لتعريف انتقالات كل شاشة بدقة متناهية: الشاشة المصدر (Origin)، المشغل (Trigger: نقرة، إرسال، تبديل)، والشاشة الوجهة (Destination).',
      '4. امتنع تماماً عن الاكتفاء بـ "زر تجربة وهمي" (Fake Demo Button) أو روابط فارغة؛ يجب أن يؤدي كل زر إجراء (Action Button) إلى وجهة حقيقية أو استجابة واضحة لحالة النظام.',
      '5. اربط واختبر سلوك التراجع والإلغاء (Back / Cancel / Close) في كل نافذة منبثقة أو شاشة فرعية لضمان عودة المستخدم إلى حالته السابقة دون ضياع بياناته.',
      '6. اختبر مسار النجاح (Happy Path) كاملاً من تصفح الخدمة، وتعبئة النموذج، حتى شاشة التأكيد بنجاح.',
      '7. اختبر مسارات الاعتذار والحالات الحدية (Failure & Boundary Paths): ماذا يحدث عند تجاوز الحد الأقصى (مثل حجز أكثر من جهازين في نموذج BorrowHub الاختياري)؟ ماذا يُعرض عند عدم توفر المعدة؟ وماذا يرى المستخدم غير المصرح له؟',
      '8. أجرِ التدقيق البصري الشامل لتجربة الاستخدام (PROMPT 21: Visual UX Audit) لفحص التسلسل الهرمي، استجابة الشاشات (Responsive)، تباين الألوان، دعم RTL، وسهولة الوصول، ووثق التقرير في docs/PROTOTYPE_JOURNEYS_AUDIT.md.'
    ],
    promptRefs: [
      'prompt-20-stitch-prototype',
      'prompt-21-visual-ux-audit'
    ],
    outputs: [
      'نموذج تفاعلي متصل في Google Stitch',
      'docs/PROTOTYPE_JOURNEYS_AUDIT.md'
    ],
    checklist: [
      'ربط الشاشات بانتقالات حقيقية محددة المشغل والوجهة (Origin -> Trigger -> Destination).',
      'التخلص التام من أزرار التجربة الوهمية (Fake Demo Buttons) أو الروابط الصورية غير المربوطة.',
      'فحص وتأكيد سلوك زر الإغلاق والرجوع (Back / Cancel) في كافة النوافذ والمسارات.',
      'التحقق التفاعلي من مسار النجاح ومسارات الفشل والرفض وحدود الصلاحيات الموثقة.',
      'فحص الحالات الفارغة (Empty) وحالات التحميل (Loading) والتأكد من انعدام الشاشات المعزولة (Dead Ends).',
      'إجراء الفحص البصري عبر PROMPT 21 وتوثيق docs/PROTOTYPE_JOURNEYS_AUDIT.md قبل الانتقال لأدوات الكود.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 23,
  },
];
