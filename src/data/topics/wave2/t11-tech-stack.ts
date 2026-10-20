import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 30: TYPESCRIPT TYPES & DATA CONTRACTS (أنواع وعقود البيانات)
 * Sequence Position: 30
 * ========================================================================= */
export const topic30TypeScriptHtml = `
<section id="topic-30-typescript" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 30 · الأساسيات البرمجية</span>
    <span class="step-pill">عقود البيانات وسلامة الأنواع</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">TypeScript: الأنواع وعقود البيانات لمشروع الطالب</h2>
      <div class="step-subtitle">صياغة نماذج البيانات المشتقة من ERD، وحالات العمل (Union Types)، وسلامة الخصائص (Props) دون إسهاب نظري</div>
    </div>
  </div>

  <!-- 1. The Project-Level Need for TypeScript -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. المستوى اللازم للمشروع: لماذا TypeScript وما الذي نحتاجه فعلاً؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في مسار هندسة البرمجيات بالذكاء الاصطناعي، ليس المطلوب دراسة دورة أكاديمية منفصلة تستغرق أسابيع في كافة دقائق لغة TypeScript المتقدمة (مثل الأنواع الشرطية الملتوية أو حيل الميتابروجرافينج). ما يحتاجه مشروع الطالب للانطلاق في بناء كود الفرونت إند هو <strong>عقود بيانات صلبة (Data Contracts)</strong> تحقق أربعة أهداف هندسية واضحة:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-3">
      <li><strong>توحيد لغة التخاطب بين المكونات:</strong> تمرير البيانات بين الواجهات والبطاقات دون تخمين أسماء الحقول (مثل هل الحقل هو <code>user_id</code> أم <code>userId</code>).</li>
      <li><strong>إرشاد وكيل البرمجة (AI Coding Agent):</strong> ملف الأنواع يوضح العقود ويساعد على كشف المخرجات غير المتسقة؛ لا يغني عن مراجعة الكود واختباره.</li>
      <li><strong>منع أخطاء زمن التشغيل (Runtime Errors):</strong> اصطياد الأخطاء الشائعة (مثل <code>Cannot read property of undefined</code>) أثناء الكتابة وفي وقت الترجمة قبل وصول الكود للمتصفح.</li>
      <li><strong>حظر نوع التخمين <code>any</code>:</strong> فرض الصرامة البرمجية وتفعيل فحص <code>noImplicitAny</code> لضمان عدم تسريب أي ثغرات برمجية غامضة.</li>
    </ul>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>القاعدة الذهبية للأنواع في الفرونت إند</span>
      </div>
      <p class="leading-7">
        الأنواع في TypeScript لا تضيف أي حجم إلى حزمة الجافاسكريبت النهائية للمتصفح؛ فهي تتبخر بالكامل وقت البناء (Zero Runtime Overhead). قيمتها الحقيقية تكمن في كونها وثيقة حية ومحققة آلياً لعقود النظام.
      </p>
    </div>
  </div>

  <div class="callout tip my-6"><p class="leading-7">المواضيع 30–32 تجهز عقود البيانات وأمثلة المكونات وخريطة التنسيق قبل إنشاء التطبيق. اكتب المسودات الآن؛ بعد تهيئة مشروع Next.js في الموضوع 33 انقلها إلى ملفات المشروع وشغّل فحص الأنواع والعرض. لا تفترض وجود npm scripts أو Tailwind مهيأ قبل ذلك.</p></div>

  <!-- 2. Converting ERD & Domain Model to TS Interfaces -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. تحويل مخطط ERD وجرد الشاشات إلى واجهات TypeScript</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تنبع كافة أنواع البيانات في مشروع الطالب من مخرجات المراحل السابقة التي أقرها واعتمدها: <strong>النموذج المفاهيمي (Domain Model)</strong> و<strong>مخطط الكيانات والعلاقات (ERD.md)</strong>. في مشروع دراسة الحالة BorrowHub، نحوّل الكيانات والعلاقات إلى واجهات برمجية واضحة داخل ملف مخصص: <code>src/types/project.ts</code>:
    </p>

    <!-- Code Block: TypeScript Interfaces -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">TypeScript · src/types/project.ts</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود الأنواع">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>// ============================================================================
// BorrowHub Domain Types & Data Contracts
// Derived from docs/ERD.md & docs/SCREEN_INVENTORY.md
// ============================================================================

/** أدوار المستخدمين المعتمدة في النظام */
 export type UserRole = 'student' | 'staff' | 'admin';

/** الحالات الممكنة لطلب الاستعارة وفق قواعد العمل */
export type LoanStatus = 'pending' | 'approved' | 'active' | 'returned' | 'rejected';

/** حالات توفر المعدة في المستودع */
export type EquipmentAvailability = 'available' | 'borrowed' | 'maintenance' | 'retired';

/** كيان المستخدم في الواجهة */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

/** كيان تصنيف الأجهزة والمعدات */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
}

/** كيان المعدة أو الأصل القابل للإعارة */
export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  categoryId: string;
  category?: Category;
  description: string;
  imageUrl: string;
  status: EquipmentAvailability;
  totalQuantity: number;
  availableQuantity: number;
  specifications: Record&lt;string, string&gt;;
}

/** كيان طلب الاستعارة */
export interface LoanRequest {
  id: string;
  userId: string;
  user?: User;
  equipmentId: string;
  equipment?: Equipment;
  startDate: string; // ISO 8601 Date
  endDate: string;   // ISO 8601 Date
  status: LoanStatus;
  notes?: string;
  createdAt: string;
  reviewedBy?: string;
}

/** عقد مرشحات البحث والفرز في صفحة الكتالوج */
export interface EquipmentFilters {
  searchQuery: string;
  categoryId: string | 'all';
  availability: 'all' | 'available_only';
  sortBy: 'name' | 'popularity' | 'newest';
  sortOrder: 'asc' | 'desc';
}

/** نموذج استجابة قائمة البيانات التمثيلية مع الفهرسة */
export interface PaginatedResult&lt;T&gt; {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}</code></pre>
    </div>
  </div>

  <!-- 3. Union Types, Props Contracts & Strict Verification -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. أنواع الحالات المحددة (Union Types) وعقود الخصائص (Props)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      من أهم ممارسات TypeScript في مشاريع الفرونت إند تجنب استخدام السلاسل النصية الحرة (Strings) لتمثيل حالات الواجهة أو أدوار المستخدمين. بدلاً من ذلك، نستخدم <strong>أنواع الاتحاد المحددة (Discriminated Union Types / Literal Unions)</strong> مثل:
    </p>
    <div class="bg-[var(--bg-card-subtle)] p-4 rounded-xl border border-[var(--border-color)] my-4 text-sm font-mono" dir="ltr">
      <code>type LoanStatus = 'pending' | 'approved' | 'active' | 'returned' | 'rejected';</code>
    </div>
    <p class="leading-8 text-[var(--text-muted)]">
      هذا الحصر الدقيق يمنع كتابة حالة غير صحيحة بالخطأ مثل <code>'pending_review'</code> أو <code>'completed'</code>، ويجعل محرر الكود ينبهك فوراً لأي قيمة غير مطابقة للمواصفة.
    </p>

    <!-- Testing Examples vs Production Code Callout -->
    <div class="callout warning my-6">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>حدود كود التجريب مقابل كود المشروع المعتمد وتوضيح غياب Backend</span>
      </div>
      <p class="leading-7">
        <strong>تنبيه هندسي حاسم:</strong> أثناء تعلم الأنواع، قد تكتب أمثلة تجريبية في سكريبتات اختبار سريعة (مثل <code>test-types.ts</code>) لتتأكد من عمل الأنواع. يجب التمييز الصارم بين هذه التجارب المؤقتة وبين ملفات العقود المعتمدة في <code>src/types/</code>. علاوة على ذلك، <strong>لا يدّعي هذا المشروع وجود Backend أو قاعدة بيانات حقيقية في هذه المحطة</strong>؛ موقعنا يعمل بنمط Frontend-Only نقي، وتُحقن هذه الأنواع في بيانات تمثيلية (Mock Data) مخزنة محلياً حتى نصل إلى محطات الـ Backend في مواضيع لاحقة.
      </p>
    </div>
  </div>

  <!-- 4. Structural Diagram / SVG Flow -->
  <div class="diagram-box my-8">
    <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (30): تدفق عقود TypeScript من وثائق التحليل إلى المكونات والبيانات التمثيلية</h4>
    <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
      <svg viewBox="0 0 820 260" style="width: 100%; height: auto; max-width: 820px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط تدفق عقود TypeScript">
        <!-- Step 1: Sources -->
        <rect x="20" y="30" width="180" height="200" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="110" y="65" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="middle">1. مصادر التحليل المعتمدة</text>
        <rect x="35" y="85" width="150" height="35" rx="6" fill="#0f172a"/>
        <text x="110" y="107" fill="#cbd5e1" font-size="12" text-anchor="middle">docs/ERD.md (الجداول)</text>
        <rect x="35" y="130" width="150" height="35" rx="6" fill="#0f172a"/>
        <text x="110" y="152" fill="#cbd5e1" font-size="12" text-anchor="middle">SCREEN_INVENTORY.md</text>
        <rect x="35" y="175" width="150" height="35" rx="6" fill="#0f172a"/>
        <text x="110" y="197" fill="#cbd5e1" font-size="12" text-anchor="middle">حالات العمل وقواعد النطاق</text>

        <!-- Arrow 1 -> 2 -->
        <path d="M 200 130 L 250 130" stroke="#059669" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>

        <!-- Step 2: Types Core -->
        <rect x="250" y="20" width="230" height="220" rx="10" fill="#064e3b" stroke="#059669" stroke-width="2"/>
        <text x="365" y="55" fill="#6ee7b7" font-size="16" font-weight="bold" text-anchor="middle">2. عقود TypeScript الصارمة</text>
        <rect x="270" y="75" width="190" height="40" rx="6" fill="#022c22"/>
        <text x="365" y="100" fill="#f8fafc" font-size="12" font-family="monospace" text-anchor="middle">src/types/project.ts</text>
        <text x="365" y="140" fill="#a7f3d0" font-size="12" text-anchor="middle">• Entity Interfaces (User, Equip)</text>
        <text x="365" y="165" fill="#a7f3d0" font-size="12" text-anchor="middle">• Union Types (LoanStatus)</text>
        <text x="365" y="190" fill="#a7f3d0" font-size="12" text-anchor="middle">• Component Props Types</text>
        <text x="365" y="215" fill="#fbbf24" font-size="11" text-anchor="middle">Zero Any · Strict Mode</text>

        <!-- Arrow 2 -> 3 -->
        <path d="M 480 130 L 530 130" stroke="#059669" stroke-width="3" fill="none"/>

        <!-- Step 3: Consumers -->
        <rect x="530" y="30" width="270" height="200" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="665" y="65" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="middle">3. مستهلكو العقود في الفرونت</text>
        <rect x="545" y="85" width="240" height="38" rx="6" fill="#0f172a"/>
        <text x="665" y="108" fill="#e2e8f0" font-size="12" text-anchor="middle">بيانات Mock Data التمثيلية (محلياً)</text>
        <rect x="545" y="132" width="240" height="38" rx="6" fill="#0f172a"/>
        <text x="665" y="155" fill="#e2e8f0" font-size="12" text-anchor="middle">مكونات React (تطابق Props مع الأنواع)</text>
        <rect x="545" y="179" width="240" height="38" rx="6" fill="#0f172a"/>
        <text x="665" y="202" fill="#ef4444" font-size="11" text-anchor="middle">Frontend-Only (لا يوجد Backend فعلي)</text>
      </svg>
    </div>
  </div>

  <!-- 5. Verification Commands -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. فحص سلامة الأنواع في الطرفية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يتحقق الطالب من سلامة عقود TypeScript دون الحاجة إلى تشغيل المتصفح، عبر أمر التحقق الصارم المدمج في المشروع:
    </p>
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Bash · Terminal Verification</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText('npm run lint').then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الأمر';},2000);})" aria-label="نسخ أمر التحقق">نسخ الأمر</button>
      </div>
      <pre class="code-content"><code># فحص سلامة الأنواع وعدم وجود أخطاء في الكود
npm run lint

# أو تشغيل فاحص TypeScript المباشر دون توليد ملفات
npx tsc --noEmit</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 31: REACT COMPONENTS, STATE & DATA FLOW (المكونات والحالة)
 * Sequence Position: 31
 * ========================================================================= */
export const topic31ReactHtml = `
<section id="topic-31-react" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 31 · الأساسيات البرمجية</span>
    <span class="step-pill">المكونات والحالة وتدفق البيانات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">React: المكونات والحالة وتدفق البيانات في الواجهة</h2>
      <div class="step-subtitle">بناء المكونات القابلة لإعادة الاستخدام، وإدارة الحالة المحلية، وتطبيق React 19 لمشروع الطالب</div>
    </div>
  </div>

  <!-- 1. The Right Level of React -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. المستوى اللازم للمشروع: واجهة المستخدم كتبع للحالة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      النموذج الذهني الأساسي الذي يحتاجه الطالب للبدء في تنفيذ مشروع الفرونت إند هو المعادلة الهندسية البسيطة: <code>UI = f(state)</code>؛ الواجهة ما هي إلا دالة برمجية نقية تستقبل الحالة الحالية للمشروع (State) وخصائص الإدخال (Props) لترسم عناصر العرض على الشاشة.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      لا نحتاج في مشروعنا إلى مكتبات إدارة حالة خارجية متخمة (مثل Redux أو MobX)؛ فمعمارية <strong>React 19 الحديثة</strong> مع خطافات الحالة القياسية (Hooks) كافية تماماً لإدارة تجربة مستخدم سلسلة وتفاعلية.
    </p>

    <!-- Component Breakdown Table -->
    <div class="table-container my-6">
      <table class="data-table">
        <thead>
          <tr>
            <th>مستوى المكون</th>
            <th>الوظيفة والمسؤولية</th>
            <th>أمثلة من مشروع BorrowHub</th>
            <th>الاعتماد على الحالة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المكونات الذرية (UI Atoms)</strong></td>
            <td>عناصر واجهة أساسية قابلة لإعادة الاستخدام في كافة الشاشات</td>
            <td><code>StatusBadge</code>, <code>Button</code>, <code>EmptyState</code></td>
            <td>بدون حالة داخلية (Pure Presentational / Props-only)</td>
          </tr>
          <tr>
            <td><strong>المكونات المركبة (Molecules)</strong></td>
            <td>تجميع عناصر متعددة لأداء وظيفة تفاعلية واحدة</td>
            <td><code>EquipmentCard</code>, <code>FilterBar</code>, <code>SearchBar</code></td>
            <td>تستقبل البيانات عبر Props وترسل الأحداث للأعلى عبر Callbacks</td>
          </tr>
          <tr>
            <td><strong>مكونات الشاشات (Organisms / Views)</strong></td>
            <td>تركيب الصفحة الكاملة وربط المرشحات بالبيانات التمثيلية</td>
            <td><code>EquipmentCatalogView</code>, <code>LoanRequestModal</code></td>
            <td>تحتفظ بالحالة المحلية المرفوعة (State) وتنسق بين المكونات</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 2. One-Way Data Flow & Lifting State Up -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. تدفق البيانات أحادي الاتجاه (One-Way Data Flow) ورفع الحالة</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تلتزم مكونات مشروع الطالب بالقاعدة الصارمة لتدفق البيانات:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>البيانات تتدفق للأسفل (Props Down):</strong> تمرر الشاشة قائمة المعدات إلى مكون البطاقة كخصائص للقراءة فقط.</li>
      <li><strong>الأحداث تصعد للأعلى (Events Up):</strong> عندما ينقر المستخدم على زر "طلب استعارة"، لا يغير المكون الداخلي البيانات مباشرة، بل يستدعي دالة رد نداء مثل <code>onSelect(equipmentId)</code> تخطر المكون الأب ليحدث الحالة.</li>
      <li><strong>حالات الواجهة الأربع الإلزامية:</strong> كل شاشة أو ميزة يجب أن تصمم وتعالج 4 حالات:
        <span class="text-emerald-600 dark:text-emerald-400 font-bold">1) التحميل (Loading)</span>،
        <span class="text-blue-600 dark:text-blue-400 font-bold">2) النجاح وظهور البيانات (Success)</span>،
        <span class="text-amber-600 dark:text-amber-400 font-bold">3) الحالة الفارغة (Empty State)</span>،
        <span class="text-rose-600 dark:text-rose-400 font-bold">4) الخطأ (Error State)</span>.
      </li>
    </ul>
  </div>

  <!-- 3. Server vs Client Components in React 19 -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. مكونات الخادم والعميل في React 19 وتوجيه <code>'use client'</code></h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في معمارية React 19 وNext.js الحديثة، تكون المكونات افتراضياً <strong>مكونات خادم (Server Components)</strong> تُبنى وتُرندر بشكل ثابت وسريع. عندما يحتاج المكون إلى تفاعل من قبل المستخدم في المتصفح، مثل:
    </p>
    <ul class="list-disc list-inside space-y-1 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4 mt-2">
      <li>استخدام خطافات الحالة مثل <code>useState</code> أو <code>useEffect</code></li>
      <li>الاستماع لأحداث المتصفح مثل <code>onClick</code> أو <code>onChange</code></li>
      <li>استخدام واجهات برمجة المتصفح (Browser APIs مثل <code>localStorage</code>)</li>
    </ul>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      نضع التوجيه الصريح <code>'use client';</code> في أول سطر من ملف المكون لنخبر الإطار بأن هذا المكون تفاعلي من جانب العميل.
    </p>
  </div>

  <!-- 4. Concrete Code Example: StatusBadge & EquipmentCard -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. كود مكون معتمد لمشروع BorrowHub: <code>StatusBadge.tsx</code></h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نموذج تطبيقي لمكون ذري نقي يستقبل نوع الحالة <code>LoanStatus</code> المعرّف في الموضوع 30 ويعرض الشارة باللون والرمز المتوافق مع نظام التصميم:
    </p>

    <!-- Code Block: StatusBadge Component -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">React (TSX) · src/components/common/StatusBadge.tsx</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود المكون">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>import React from 'react';
import { LoanStatus } from '@/src/types/project';

interface StatusBadgeProps {
  status: LoanStatus;
  className?: string;
}

const STATUS_CONFIG: Record&lt;LoanStatus, { label: string; bg: string; text: string; dot: string }&gt; = {
  pending: {
    label: 'قيد المراجعة',
    bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  approved: {
    label: 'تمت الموافقة',
    bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  active: {
    label: 'نشطة حالياً',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-800 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  returned: {
    label: 'تم الإرجاع',
    bg: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-400',
  },
  rejected: {
    label: 'مرفوض',
    bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
    text: 'text-rose-800 dark:text-rose-300',
    dot: 'bg-rose-500',
  },
};

export const StatusBadge: React.FC&lt;StatusBadgeProps&gt; = ({ status, className = '' }) => {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    &lt;span
      className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border \${config.bg} \${config.text} \${className}\`}
    &gt;
      &lt;span className={\`w-1.5 h-1.5 rounded-full \${config.dot}\`} aria-hidden="true" /&gt;
      &lt;span&gt;{config.label}&lt;/span&gt;
    &lt;/span&gt;
  );
};</code></pre>
    </div>

    <!-- Testing Callout -->
    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">💡</span>
        <span>اختبار المكونات في عزلة تامة دون خادم خلفي</span>
      </div>
      <p class="leading-7">
        لاحظ كيف أن مكون <code>StatusBadge</code> ومكون <code>EquipmentCard</code> يمكن اختبارهما وتجريبهما في صفحة فحص معزولة بتمرير خصائص تجريبية (Mock Props) مثل <code>status="active"</code>، دون الحاجة للاتصال بأي شبكة أو انتظار بناء خادم backend.
      </p>
    </div>
  </div>

  <!-- 5. Structural Diagram / SVG Flow -->
  <div class="diagram-box my-8">
    <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (31): هرمية المكونات وتدفق البيانات والحالة في شاشة تصفح المعدات</h4>
    <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
      <svg viewBox="0 0 820 280" style="width: 100%; height: auto; max-width: 820px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط هرمية مكونات ريفاكت وتدفق الحالة">
        <!-- Root View Container -->
        <rect x="20" y="20" width="780" height="240" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
        <text x="50" y="50" fill="#60a5fa" font-size="16" font-weight="bold">EquipmentCatalogView (المكون الأب · يحتفظ بالحالة State)</text>
        <text x="680" y="50" fill="#94a3b8" font-size="12" font-family="monospace">'use client'</text>

        <!-- Subcomponent 1: Search & Filter -->
        <rect x="50" y="75" width="330" height="90" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="215" y="105" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">FilterBar &amp; SearchInput</text>
        <text x="215" y="130" fill="#94a3b8" font-size="11" text-anchor="middle">Props: searchQuery, categoryId</text>
        <text x="215" y="150" fill="#34d399" font-size="11" text-anchor="middle">Callback: onFilterChange(newFilters) ⬆️</text>

        <!-- Subcomponent 2: Grid & Cards -->
        <rect x="420" y="75" width="350" height="170" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="595" y="105" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">EquipmentGrid (قائمة الكروت)</text>
        
        <!-- Individual Card inside Grid -->
        <rect x="440" y="125" width="310" height="105" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="595" y="150" fill="#e2e8f0" font-size="13" font-weight="bold" text-anchor="middle">EquipmentCard (مكون العرض)</text>
        <text x="595" y="172" fill="#94a3b8" font-size="11" text-anchor="middle">Props: item: Equipment ⬇️</text>
        
        <!-- StatusBadge inside Card -->
        <rect x="490" y="185" width="210" height="32" rx="16" fill="#064e3b" stroke="#059669" stroke-width="1"/>
        <text x="595" y="206" fill="#6ee7b7" font-size="12" font-weight="bold" text-anchor="middle">StatusBadge (حالة التوفر)</text>

        <!-- Flow description below FilterBar -->
        <rect x="50" y="180" width="330" height="65" rx="6" fill="#022c22" stroke="#059669" stroke-width="1"/>
        <text x="215" y="205" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">حالات العرض الأربع:</text>
        <text x="215" y="228" fill="#cbd5e1" font-size="11" text-anchor="middle">Loading Spinner | Empty Search | Error Alert | Card Grid</text>
      </svg>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 32: TAILWIND CSS & RESPONSIVE DESIGN (التنسيق والتجاوب)
 * Sequence Position: 32
 * ========================================================================= */
export const topic32TailwindHtml = `
<section id="topic-32-tailwind" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 32 · الأساسيات البرمجية</span>
    <span class="step-pill">التنسيق والتجاوب ونظام التصميم</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد</h2>
      <div class="step-subtitle">تطبيق الرموز المعتمدة من DESIGN.md، وتنسيق RTL بالخصائص المنطقية، والتجاوب عبر شاشات المسار الخمس</div>
    </div>
  </div>

  <div class="callout tip my-6">
    <p class="leading-7">في هذه المحطة جهّز خريطة رموز التصميم وأمثلة التنسيق؛ لا تحتاج مشروعًا مهيأ مسبقًا. طبّق الملفات وافحصها بعد إنشاء مشروع Next.js في الموضوع 33. إذا كان لديك مشروع قائم، افحص إصدار Tailwind فيه قبل أي تعديل.</p>
    <p class="leading-7">المثال التالي لـ Tailwind v4: الإعداد في CSS باستخدام <code>@theme</code>، وليس اشتراط إنشاء <code>tailwind.config.ts</code>. في مشروع v3 قائم احتفظ بإعداده واتبع دليل إصداره؛ لا تستبدله تلقائيًا.</p>
    <p class="leading-7">مراجع رسمية روجعت 19 أكتوبر 2026: <a href="https://tailwindcss.com/docs/theme" target="_blank" rel="noreferrer">متغيرات الثيم</a> و<a href="https://tailwindcss.com/docs/installation/using-postcss" target="_blank" rel="noreferrer">تكامل PostCSS</a> و<a href="https://tailwindcss.com/docs/upgrade-guide" target="_blank" rel="noreferrer">دليل اختلاف الإصدارات</a>. هذه مراجعة توثيق؛ لم ننشئ تطبيق الطالب.</p>
  </div>

  <!-- 1. Design Token Mapping: No Invented Values -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. التنسيق المستند إلى نظام التصميم المعتمد لا إلى قيم عشوائية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      أكبر خطر يهدد هوية تطبيق الويب هو <strong>الارتجال البصري</strong> واستخدام قيم ألوان وهوامش عشوائية (مثل <code>bg-[#3a7bd5]</code> أو <code>p-[13px]</code>) مبعثرة داخل كود المكونات. في مسارنا، ترتبط فئات Tailwind CSS بروابط مباشرة وصارمة مع رموز التصميم المعتمدة في وثيقة <strong>DESIGN.md</strong> التي استخرجها الطالب في الموضوع 29:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>عنصر التصميم</th>
            <th>قيم توضيحية — استبدلها بقيم DESIGN.md لمشروعك</th>
            <th>فئة Tailwind CSS المطابقة</th>
            <th>الاستخدام في مشروع BorrowHub</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>اللون الأساسي (Primary)</strong></td>
            <td>الزمردي المتدرج <code>#059669</code> / <code>#10b981</code></td>
            <td><code>bg-emerald-600</code>, <code>text-emerald-600</code></td>
            <td>أزرار الإجراء الرئيسي، الروابط النشطة، إشارات النجاح</td>
          </tr>
          <tr>
            <td><strong>الأسطح والخلفيات (Surfaces)</strong></td>
            <td>الرمادي الداكن <code>#0f172a</code> / الفاتح <code>#f8fafc</code></td>
            <td><code>bg-slate-900</code>, <code>bg-slate-50</code></td>
            <td>خلفية التطبيق، ألواح البطاقات، القوائم المنبثقة</td>
          </tr>
          <tr>
            <td><strong>زوايا الحواف (Border Radius)</strong></td>
            <td>نصف قطر 16px للبطاقات و8px للأزرار</td>
            <td><code>rounded-2xl</code>, <code>rounded-lg</code></td>
            <td>بطاقات المعدات، حقول الإدخال، شارات الحالات</td>
          </tr>
          <tr>
            <td><strong>الخط العربي واللاتيني</strong></td>
            <td>خط Cairo للعربية وInter للأرقام والأكواد</td>
            <td><code>font-sans</code> (Cairo), <code>font-mono</code></td>
            <td>عناوين الشاشات، أرقام السيريال، نصوص الواجهة</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="code-container my-6" dir="ltr">
    <div class="code-header"><span class="code-lang">CSS · Tailwind v4 · src/app/globals.css (apply after topic 33)</span></div>
    <pre class="code-content"><code>@import "tailwindcss";

/* Illustrative value only: replace from your approved DESIGN.md. */
@theme {
  --color-brand: #059669;
}

/* bg-brand / text-brand now use the reviewed project token. */</code></pre>
  </div>
  <p class="leading-7 text-[var(--text-muted)]">في الموضوع 33، افحص الملفات التي أنشأها خيار Tailwind في create-next-app قبل إضافة إعداد جديد. عند الإعداد اليدوي لـ v4 يستخدم PostCSS الإضافة <code>@tailwindcss/postcss</code> ويستورد CSS الحزمة كما في المثال؛ اتبع المرجع الرسمي المتوافق مع الإصدار المثبت.</p>

  <!-- 2. RTL First & Logical Properties -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. دعم العربية والاتجاه (RTL) باستخدام الخصائص المنطقية (Logical Properties)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      عند بناء واجهات عربية، يُعد استخدام فئات الاتجاه المطلق القديمة (مثل <code>mr-4</code> أو <code>pl-6</code> أو <code>text-left</code>) خطأً برمجياً يؤدي إلى تداخل العناصر عند تغيير الاتجاه أو ترجمة التطبيق. بدلاً منها، نستخدم <strong>الخصائص المنطقية (Logical Properties)</strong> المدعومة أصيلاً في Tailwind CSS:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>الهوامش الخارجية:</strong> نستخدم <code>ms-4</code> (Margin Inline Start) و<code>me-4</code> (Margin Inline End) بدلاً من <code>ml-</code> و<code>mr-</code>.</li>
      <li><strong>الهوامش الداخلية:</strong> نستخدم <code>ps-4</code> (Padding Inline Start) و<code>pe-4</code> (Padding Inline End) بدلاً من <code>pl-</code> و<code>pr-</code>.</li>
      <li><strong>محاذاة النصوص:</strong> نستخدم <code>text-start</code> (تبدأ من اليمين في العربية) و<code>text-end</code> بدلاً من <code>text-right</code> و<code>text-left</code>.</li>
      <li><strong>حاويات الأيقونات والنصوص:</strong> استخدام <code>flex items-center gap-2</code> يلغي الحاجة تماماً لكتابة هوامش يدوية بين الأيقونة والكلمة.</li>
    </ul>
  </div>

  <!-- 3. The 5 Official Screen Breakpoints -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. نقاط كسر التجاوب الرسمية للمسار (390، 768، 1024، 1366، 1440 بكسل)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      افحص الواجهة عند خمسة عروض شاشة وسجّل النتيجة الفعلية لكل اتجاه. أصلح العنصر الذي يسبب التدفق الأفقي؛ إخفاء التدفق على الصفحة لا يثبت أن السبب عولج:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>عرض الشاشة المستهدف</th>
            <th>بادئة Tailwind</th>
            <th>السلوك التخطيطي لمشروع BorrowHub</th>
            <th>فحص التدفق وإصلاح سببه</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>390px (الهاتف الذكي)</strong></td>
            <td>النمط الأساسي (Default)</td>
            <td>عمود واحد للبطاقات، قائمة تنقل سفلية أو زر هامبرغر</td>
            <td>افحص العنصر المسبب؛ جرّب <code>min-w-0</code> أو التفاف النص عند الحاجة، ثم أعد الفحص</td>
          </tr>
          <tr>
            <td><strong>768px (الأجهزة اللوحية)</strong></td>
            <td><code>md:</code></td>
            <td>عمودان لشبكة المعدات، شريط بحث أفقي مدمج</td>
            <td><code>md:grid-cols-2 md:gap-4</code></td>
          </tr>
          <tr>
            <td><strong>1024px (الشاشات المحمولة)</strong></td>
            <td><code>lg:</code></td>
            <td>ثلاثة أعمدة للبطاقات مع ظهور الشريط الجانبي للتصنيفات</td>
            <td><code>lg:grid-cols-3 lg:gap-6</code></td>
          </tr>
          <tr>
            <td><strong>1366px (الحواسيب العادية)</strong></td>
            <td><code>xl:</code></td>
            <td>أربعة أعمدة متوازنة، هوامش تنفس مريحة</td>
            <td><code>xl:grid-cols-4</code></td>
          </tr>
          <tr>
            <td><strong>1440px (الشاشات العريضة)</strong></td>
            <td><code>2xl:</code></td>
            <td>تثبيت أقصى عرض للحاوية لمنع تشتت العين والامتداد الزائد</td>
            <td><code>max-w-7xl mx-auto px-6</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 4. Concrete Code Example: Tailwind Config & Card Component -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. كود بطاقة المعدة المتجاوبة بالكامل لـ BorrowHub</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تطبيق متكامل يجمع رموز DESIGN.md، والخصائص المنطقية العربية، والتجاوب عبر كافة الشاشات:
    </p>

    <!-- Code Block: Responsive EquipmentCard -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">React &amp; Tailwind · src/components/equipment/EquipmentCard.tsx</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود البطاقة">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>import React from 'react';
import Image from 'next/image';
import { Equipment } from '@/src/types/project';
import { StatusBadge } from '@/src/components/common/StatusBadge';

interface EquipmentCardProps {
  item: Equipment;
  onSelect: (id: string) => void;
}

export const EquipmentCard: React.FC&lt;EquipmentCardProps&gt; = ({ item, onSelect }) => {
  const isAvailable = item.status === 'available' &amp;&amp; item.availableQuantity &gt; 0;

  return (
    &lt;article className="group flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md"&gt;
      &lt;div&gt;
        {/* الصورة مع مؤشر التوفر */}
        &lt;div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"&gt;
          &lt;img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          /&gt;
          &lt;div className="absolute top-2.5 start-2.5"&gt;
            &lt;span className="rounded-full bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white"&gt;
              {item.category?.name ?? 'عام'}
            &lt;/span&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        {/* تفاصيل المعدة */}
        &lt;div className="mt-3.5 space-y-1.5"&gt;
          &lt;h3 className="text-base font-black text-[var(--text-main)] group-hover:text-emerald-600 transition-colors line-clamp-1"&gt;
            {item.name}
          &lt;/h3&gt;
          &lt;p className="text-xs font-mono text-[var(--text-muted)]"&gt;
            طراز: {item.model} · متاح: {item.availableQuantity} من {item.totalQuantity}
          &lt;/p&gt;
          &lt;p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-5"&gt;
            {item.description}
          &lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* التذييل وزر الإجراء الرئيسي */}
      &lt;div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-2"&gt;
        &lt;span className="text-xs font-bold text-emerald-700 dark:text-emerald-300"&gt;
          {isAvailable ? 'جاهزة للإعارة' : 'غير متوفرة حالياً'}
        &lt;/span&gt;

        &lt;button
          type="button"
          onClick={() =&gt; onSelect(item.id)}
          disabled={!isAvailable}
          className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
        &gt;
          طلب استعارة
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/article&gt;
  );
};</code></pre>
    </div>
  </div>

  <!-- 5. Structural Diagram / SVG Flow -->
  <div class="diagram-box my-8">
    <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (32): التجاوب عبر عروض الشاشة الخمسة (390 إلى 1440 بكسل) في BorrowHub</h4>
    <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
      <svg viewBox="0 0 820 220" style="width: 100%; height: auto; max-width: 820px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="رسم تخطيطي لنقاط التجاوب الخمس">
        <!-- 390px Mobile -->
        <rect x="20" y="20" width="130" height="180" rx="8" fill="#1e293b" stroke="#059669" stroke-width="2"/>
        <text x="85" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">390px (هاتف)</text>
        <rect x="35" y="60" width="100" height="35" rx="4" fill="#334155"/>
        <rect x="35" y="105" width="100" height="35" rx="4" fill="#334155"/>
        <rect x="35" y="150" width="100" height="35" rx="4" fill="#334155"/>
        <text x="85" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">عمود واحد (1 Col)</text>

        <!-- 768px Tablet -->
        <rect x="175" y="20" width="160" height="180" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
        <text x="255" y="45" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">768px (لوحي)</text>
        <rect x="190" y="60" width="60" height="50" rx="4" fill="#334155"/>
        <rect x="260" y="60" width="60" height="50" rx="4" fill="#334155"/>
        <rect x="190" y="120" width="60" height="50" rx="4" fill="#334155"/>
        <rect x="260" y="120" width="60" height="50" rx="4" fill="#334155"/>
        <text x="255" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">عمودان (md:grid-cols-2)</text>

        <!-- 1024px Laptop -->
        <rect x="360" y="20" width="200" height="180" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
        <text x="460" y="45" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">1024px (محمول)</text>
        <rect x="375" y="60" width="40" height="110" rx="4" fill="#064e3b" stroke="#059669"/>
        <text x="395" y="120" fill="#a7f3d0" font-size="9" text-anchor="middle" transform="rotate(-90 395 120)">الفلاتر</text>
        <rect x="425" y="60" width="55" height="50" rx="4" fill="#334155"/>
        <rect x="490" y="60" width="55" height="50" rx="4" fill="#334155"/>
        <rect x="425" y="120" width="55" height="50" rx="4" fill="#334155"/>
        <rect x="490" y="120" width="55" height="50" rx="4" fill="#334155"/>
        <text x="460" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">شريط جانبي + 2 عمود</text>

        <!-- 1366px & 1440px Desktop -->
        <rect x="585" y="20" width="215" height="180" rx="8" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
        <text x="692" y="45" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">1366px - 1440px (حاسوب عريض)</text>
        <rect x="600" y="60" width="40" height="110" rx="4" fill="#064e3b" stroke="#059669"/>
        <rect x="648" y="60" width="42" height="50" rx="4" fill="#334155"/>
        <rect x="696" y="60" width="42" height="50" rx="4" fill="#334155"/>
        <rect x="744" y="60" width="42" height="50" rx="4" fill="#334155"/>
        <rect x="648" y="120" width="42" height="50" rx="4" fill="#334155"/>
        <rect x="696" y="120" width="42" height="50" rx="4" fill="#334155"/>
        <rect x="744" y="120" width="42" height="50" rx="4" fill="#334155"/>
        <text x="692" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">max-w-7xl + 3 أعمدة + شريط جانبي</text>
      </svg>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 33: NEXT.JS APP ROUTER, LAYOUTS & ROUTES (المسارات والتخطيطات)
 * Sequence Position: 33
 * ========================================================================= */
export const topic33NextjsHtml = `
<section id="topic-33-nextjs" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 33 · الأساسيات البرمجية</span>
    <span class="step-pill">بنية App Router والمسارات</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Next.js: بنية App Router والمسارات والصفحات</h2>
      <div class="step-subtitle">هيكلة مجلد app، والتخطيطات المتداخلة (Layouts)، والتنقل بين صفحات جرد الشاشات في واجهة Frontend-Only</div>
    </div>
  </div>

  <!-- 1. Why Next.js 15 & The App Router -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. تجميع الأدوات في إطار عمل الإنتاج: Next.js 15 App Router</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      بعد أن صاغ الطالب أنواع البيانات الصارمة في <strong>TypeScript (الموضوع 30)</strong>، وبنى المكونات والحالة في <strong>React (الموضوع 31)</strong>، ونسّق الواجهات بنظام التصميم المعتمد في <strong>Tailwind CSS (الموضوع 32)</strong>، يأتي دور إطار العمل <strong>Next.js 15</strong> ليجمع هذه الركائز الثلاث في بنية مسارات وتشغيل واقعية موثوقة.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      يعتمد Next.js على نظام <strong>App Router</strong> القائم على المجلدات والملفات (File-system based routing) داخل مجلد <code>src/app/</code>، حيث يمثل كل مجلد جزءاً من مسار الرابط (URL)، وتمثل الملفات الخاصة أدواراً معمارية محددة:
    </p>

    <!-- File Roles Table -->
    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الملف الخاص</th>
            <th>الدور المعماري والمسؤولية</th>
            <th>مثال تطبيقي في مشروع BorrowHub</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>layout.tsx</code></td>
            <td>التخطيط المشترك الثابت بين صفحات متعددة (مثل الشريط العلوي والقائمة الجانبية)</td>
            <td><code>src/app/layout.tsx</code> (التخطيط الجذري مع <code>dir="rtl"</code> و<code>lang="ar"</code>)</td>
          </tr>
          <tr>
            <td><code>page.tsx</code></td>
            <td>واجهة الصفحة الفريدة التي تُعرض عند زيارة هذا المسار</td>
            <td><code>src/app/equipment/page.tsx</code> (شاشة كتالوج المعدات)</td>
          </tr>
          <tr>
            <td><code>loading.tsx</code></td>
            <td>هيكل التحميل التمهيدي التلقائي (Suspense Fallback / Skeleton) أثناء جلب البيانات</td>
            <td><code>src/app/equipment/loading.tsx</code> (هياكل كروت فارغة ومتحركة)</td>
          </tr>
          <tr>
            <td><code>not-found.tsx</code></td>
            <td>شاشة الخطأ 404 المخصصة عند طلب معدة أو مسار غير موجود</td>
            <td><code>src/app/not-found.tsx</code> (تنبيه لطيف وزر رجوع للكتالوج)</td>
          </tr>
          <tr>
            <td><code>[id]/page.tsx</code></td>
            <td>مسار ديناميكي يستقبل معرّف العنصر من الرابط كمعامل (Route Parameter)</td>
            <td><code>src/app/equipment/[id]/page.tsx</code> (شاشة تفاصيل المعدة المحددة)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 2. Mapping SCREEN_INVENTORY to Next.js App Router Tree -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. تحويل وثيقة جرد الشاشات (SCREEN_INVENTORY.md) إلى شجرة مسارات</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لا يبتكر الطالب مسارات عشوائية من مخيلته؛ بل ينشئ مجلدات المشروع مطابقة تماماً للمسارات المعتمدة في <strong>وثيقة جرد الشاشات (docs/SCREEN_INVENTORY.md)</strong> التي أنجزها في الموضوع 20:
    </p>

    <div class="callout tip my-6"><p class="leading-7">ابدأ هنا بتهيئة التطبيق إذا لم يكن لديك مشروع قائم؛ المواضيع 30–32 جهزت المسودات فقط. من مجلد أب جديد شغّل <code dir="ltr">npx create-next-app@latest my-project --ts --tailwind --eslint --app --src-dir --use-npm</code>، ثم ادخل <code>my-project</code> وافحص package.json وملفات PostCSS وCSS الناتجة قبل نقل مسوداتك. أمثلة الدورة معنونة Next.js 15؛ latest قد ينشئ إصدارًا أحدث، لذا طابق المثال مع توثيق الإصدار المثبت ولا تدّع اختباره تلقائيًا. لا تنشئ مشروعًا فوق مستودع قائم. <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app" target="_blank" rel="noreferrer">مرجع create-next-app الرسمي</a> (روجعت الخيارات 19 أكتوبر 2026).</p></div>

    <!-- Code Block: Folder Structure Tree -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Project Structure · Next.js 15 App Router</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الهيكل';},2000);})" aria-label="نسخ هيكل المسارات">نسخ الهيكل</button>
      </div>
      <pre class="code-content"><code>src/
├── app/
│   ├── layout.tsx                # التخطيط الجذري المشترك (RTL, Navbar, Footer)
│   ├── page.tsx                  # الشاشة 01: الرئيسية واستعراض المنصة
│   ├── not-found.tsx             # صفحة 404 المخصصة
│   ├── equipment/
│   │   ├── page.tsx              # الشاشة 02: كتالوج تصفح وبحث وتصفية المعدات
│   │   ├── loading.tsx           # هيكل تحميل الكتالوج
│   │   └── [id]/
│   │       ├── page.tsx          # الشاشة 03: تفاصيل المعدة ومواصفاتها وزر الاستعارة
│   │       └── loading.tsx       # هيكل تحميل تفاصيل المعدة
│   ├── (dashboard)/              # مجموعة مسارات (Route Group) لمستخدمي النظام
│   │   ├── layout.tsx            # تخطيط لوحة التحكم المشتركة
│   │   ├── requests/
│   │   │   └── page.tsx          # الشاشة 04: متابعة طلبات الاستعارة وحالاتها
│   │   └── admin/
│   │       └── page.tsx          # الشاشة 05: إدارة العهد والمخزن وإقرار الإرجاع
│   └── globals.css               # استيراد خطوط Cairo وTailwind CSS
├── components/                   # المكونات الذرية والمركبة من الموضوع 31
│   ├── common/
│   └── equipment/
├── data/
│   └── mock-data.json            # البيانات التمثيلية المحلية (Mock Data)
└── types/
    └── project.ts                # عقود TypeScript الصارمة من الموضوع 30</code></pre>
    </div>
  </div>

  <!-- 3. Explicit Educational Boundary: Frontend-Only (No Real Backend) -->
  <div class="content-block mt-8">
    <div class="callout warning my-6">
      <div class="callout-header">
        <span class="callout-icon">🛑</span>
        <span>حدود التنفيذ الحاسمة: موقع Frontend-Only ولا وجود لـ Backend فعلي هنا!</span>
      </div>
      <p class="leading-7">
        <strong>تنبيه هندسي إلزامي:</strong> الموقع التعليمي لمشروع الطالب في هذه المرحلة (المواضيع 30 إلى 37) هو <strong>تطبيق واجهة مستخدم نقي (Frontend-Only Application)</strong> كامل الأداء والجمالية والتفاعل والتجاوب، ولكنه <strong>لا يتصل بأي خادم Backend حقيقي ولا بقاعدة بيانات PostgreSQL أو Django/FastAPI</strong>.
      </p>
      <p class="leading-7 mt-2">
        كافة مسارات Next.js تقرأ البيانات وتعرضها وتفلترها محلياً من ملف البيانات التمثيلية <code>src/data/mock-data.json</code> أو عبر دوال خدمة محاكية (Mock Services) تعيد وعوداً (Promises) خفيفة. لا تدّعِ في توثيقك أو واجهتك وجود نظام مصادقة خادمي أو عمليات قاعدة بيانات؛ فمرحلة الـ Backend وهندسة الخوادم وقواعد البيانات ستأتي مستقلة في المواضيع (38 إلى 44).
      </p>
    </div>
  </div>

  <!-- 4. Client-Side Navigation with next/link -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. التنقل الفوري من جانب العميل باستخدام <code>next/link</code></h3>
    <p class="leading-8 text-[var(--text-muted)]">
      في تطبيقات Next.js، لا نستخدم وسوم <code>&lt;a href="..."&gt;</code> التقليدية للتنقل الداخلي؛ لأنها تعيد تحميل الصفحة بالكامل من الصفر وتلغي حالة التطبيق. بدلاً من ذلك، نستخدم مكون <code>Link</code> من حزمة <code>next/link</code> الذي يقوم بما يلي:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>التنقل الفوري (Instant Client Navigation):</strong> تبديل محتوى الشاشة دون إعادة تحميل المتصفح.</li>
      <li><strong>التحميل المسبق التلقائي (Prefetching):</strong> يقوم Next.js تلقائياً بتحميل كود ومسار الصفحة التالية في الخلفية عندما يظهر الرابط في شاشة المستخدم.</li>
      <li><strong>الحفاظ على حالة الواجهة:</strong> بقاء عناصر التخطيط المشترك (مثل شريط البحث أو الفلاتر الجانبية) ثابتة دون اهتزاز.</li>
    </ul>

    <!-- Code Block: Next.js Layout Sample -->
    <div class="code-container my-6" dir="ltr">
      <div class="code-header">
        <span class="code-lang">React (TSX) · src/app/layout.tsx</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ كود التخطيط الجذري">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>import React from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'BorrowHub · نظام استعارة الأجهزة والمعدات',
  description: 'منصة استعارة الأجهزة الجامعية والمعدات التقنية للطلاب وأعضاء الهيئة التدريسية',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    &lt;html lang="ar" dir="rtl"&gt;
      &lt;body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased"&gt;
        {/* شريط التنقل العلوي المشترك */}
        &lt;header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"&gt;
          &lt;div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="flex items-center gap-6"&gt;
              &lt;Link href="/" className="flex items-center gap-2.5 font-black text-lg text-emerald-600 dark:text-emerald-400"&gt;
                &lt;span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold"&gt;B&lt;/span&gt;
                &lt;span&gt;BorrowHub&lt;/span&gt;
              &lt;/Link&gt;
              &lt;nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300"&gt;
                &lt;Link href="/equipment" className="hover:text-emerald-600 transition-colors"&gt;كتالوج المعدات&lt;/Link&gt;
                &lt;Link href="/requests" className="hover:text-emerald-600 transition-colors"&gt;طلباتي&lt;/Link&gt;
                &lt;Link href="/admin" className="hover:text-emerald-600 transition-colors"&gt;إدارة المستودع&lt;/Link&gt;
              &lt;/nav&gt;
            &lt;/div&gt;
            &lt;div className="text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 rounded-full"&gt;
              Frontend Prototype · Mock Data
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/header&gt;

        {/* محتوى المسار المتغير */}
        &lt;main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"&gt;
          {children}
        &lt;/main&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}</code></pre>
    </div>
  </div>

  <!-- 5. Verification Commands -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. تشغيل خادم التطوير وفحص مسارات المتصفح</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      يشغل الطالب خادم التطوير المحلي للتحقق من سلامة البناء وسرعة استجابة المسارات دون أي أخطاء ترجمة أو وميض:
    </p>
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">Bash · Development Server</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText('npm run dev').then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الأمر';},2000);})" aria-label="نسخ أمر تشغيل الخادم">نسخ الأمر</button>
      </div>
      <pre class="code-content"><code># تشغيل خادم Next.js المحلي
npm run dev

# ثم فتح المتصفح على العنوان المحلي:
# http://localhost:3000</code></pre>
    </div>
  </div>

  <!-- 6. Structural Diagram / SVG Flow -->
  <div class="diagram-box my-8">
    <h4 class="font-bold text-[var(--text-main)] mb-3 text-center">الشكل (33): معمارية شجرة المسارات والتخطيطات المتداخلة في Next.js App Router</h4>
    <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
      <svg viewBox="0 0 820 250" style="width: 100%; height: auto; max-width: 820px; background: #0f172a; border-radius: 12px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="رسم تخطيطي لمعمارية Next.js App Router">
        <!-- Root Layout Box -->
        <rect x="20" y="20" width="780" height="210" rx="10" fill="#1e293b" stroke="#059669" stroke-width="2"/>
        <text x="45" y="48" fill="#34d399" font-size="15" font-weight="bold">Root Layout (src/app/layout.tsx · dir="rtl" · Navbar + Footer)</text>

        <!-- Route 1: Home Page -->
        <rect x="45" y="70" width="165" height="140" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="127" y="100" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">الرئيسية</text>
        <text x="127" y="125" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">src/app/page.tsx</text>
        <text x="127" y="155" fill="#94a3b8" font-size="11" text-anchor="middle">استعراض المنصة</text>
        <text x="127" y="180" fill="#94a3b8" font-size="11" text-anchor="middle">وأزرار البدء السريع</text>

        <!-- Route 2: Equipment Catalog & Details -->
        <rect x="230" y="70" width="310" height="140" rx="8" fill="#0f172a" stroke="#059669" stroke-width="1.5"/>
        <text x="385" y="98" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">المعدات والتفاصيل</text>
        <rect x="245" y="112" width="130" height="85" rx="6" fill="#1e293b"/>
        <text x="310" y="135" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">equipment/page.tsx</text>
        <text x="310" y="155" fill="#94a3b8" font-size="10" text-anchor="middle">الكتالوج والبحث</text>
        <text x="310" y="175" fill="#94a3b8" font-size="10" text-anchor="middle">+ loading.tsx</text>

        <rect x="390" y="112" width="135" height="85" rx="6" fill="#1e293b"/>
        <text x="457" y="135" fill="#fbbf24" font-size="11" font-family="monospace" text-anchor="middle">[id]/page.tsx</text>
        <text x="457" y="155" fill="#94a3b8" font-size="10" text-anchor="middle">المسار الديناميكي</text>
        <text x="457" y="175" fill="#94a3b8" font-size="10" text-anchor="middle">لتفاصيل المعدة</text>

        <!-- Route 3: Dashboard Group -->
        <rect x="560" y="70" width="220" height="140" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="670" y="98" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">لوحة التحكم (dashboard)</text>
        <rect x="575" y="112" width="190" height="40" rx="4" fill="#1e293b"/>
        <text x="670" y="136" fill="#cbd5e1" font-size="11" font-family="monospace" text-anchor="middle">requests/page.tsx</text>
        <rect x="575" y="157" width="190" height="40" rx="4" fill="#1e293b"/>
        <text x="670" y="181" fill="#cbd5e1" font-size="11" font-family="monospace" text-anchor="middle">admin/page.tsx</text>
      </svg>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * ASSEMBLED ENTRIES: TOPICS 30, 31, 32, 33
 * ========================================================================= */
export const t11Entries: TopicItem[] = [
  {
    id: 'typescript-types',
    number: '30',
    slug: 'typescript-types',
    title: 'TypeScript: الأنواع وعقود البيانات لمشروع الطالب',
    subtitle: 'صياغة نماذج البيانات المشتقة من ERD، وحالات العمل (Union Types)، وسلامة الخصائص (Props) دون إسهاب نظري',
    category: 'frontend',
    categoryName: 'تنفيذ الفرونت إند',
    stageTag: 'المرحلة التطبيقية · الأساسيات البرمجية',
    summary: 'صياغة عقود بيانات TypeScript الصارمة لمشروع الطالب انطلاقاً من المخطط المفاهيمي ووثيقة ERD. التركيز العملي على ما يحتاجه مشروع الفرونت: واجهات الكيانات الأساسية (User, Equipment, LoanRequest)، أنواع حالات العمل المحددة (Union Types)، قوالب الاستجابات، وضبط الخصائص (Props) لمنع الأخطاء التخمينية وحظر نوع any.',
    tags: ['TypeScript', 'Data Contracts', 'Interfaces', 'Union Types', 'Props Types', 'Strict Mode', 'Mock Data'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic30TypeScriptHtml),
    htmlContent: topic30TypeScriptHtml,

    goal: 'صياغة العقود البرمجية والأنواع (TypeScript Types & Interfaces) لمشروع الطالب انطلاقاً من المخطط المفاهيمي ووثيقة ERD وبيانات Mock Data، وضمان سلامة الأنواع (Strict Type Safety) لخصائص المكونات والحالات دون إطالة أكاديمية غير لازمة.',
    prerequisites: [
      'مخطط الكيانات والعلاقات docs/ERD.md (الموضوع 14)',
      'النموذج المفاهيمي docs/diagrams/domain-model.md (الموضوع 09)',
      'ملف مرجع التصميم المعتمد DESIGN.md (الموضوع 29)',
      'تهيئة بيئة المشروع وكود الفرونت إند (الموضوع 24)'
    ],
    steps: [
      '1. راجع الكيانات والحقول المعتمدة في docs/ERD.md وdocs/SCREEN_INVENTORY.md لتحديد الحقول الإلزامية والاختيارية.',
      '2. أنشئ ملف العقود الرئيسي src/types/project.ts ليكون المصدر الوحيد المعتمد لكافة أنواع الفرونت إند.',
      '3. عرّف واجهات الكيانات الأساسية (User, Equipment, Category, LoanRequest) باستخدام صيغ دقيقة دون استخدام any نهائياً.',
      '4. احصر حالات النظام وقواعد العمل باستخدام أنواع الاتحاد المحددة (Literal Union Types مثل LoanStatus).',
      '5. اربط كائنات البيانات التمثيلية في src/data/mock-data.json بهذه الواجهات لضمان مطابقة البيانات لشكل العقد البرمجي.',
      '6. افحص سلامة الأنواع عبر تشغيل npm run lint أو npx tsc --noEmit في الطرفية، ووثق إرشادات الأنواع في docs/TYPESCRIPT_GUIDELINES.md.'
    ],
    promptRefs: [
      'prompt-24-frontend-only-next-js-plan',
      'prompt-27-spec-kit-constitution'
    ],
    outputs: [
      'src/types/project.ts',
      'docs/TYPESCRIPT_GUIDELINES.md'
    ],
    checklist: [
      'فهم المستوى العملي المطلوب من TypeScript دون الانجرار لدورات أكاديمية مطولة غير لازمة للمشروع.',
      'إنشاء ملف src/types/project.ts وتعريف كيانات المشروع (User, Equipment, LoanRequest).',
      'حصر حالات العمل وقواعد النطاق باستخدام Union Types صريحة لمنع التخمين.',
      'تطبيق الصرامة البرمجية (Strict Mode) والتأكد من خلو ملفات المشروع من نوع any.',
      'مطابقة بيانات Mock Data التمثيلية بالكامل مع العقود المكتوبة.',
      'نجاح فحص الترجمة واصطياد الأخطاء عبر npx tsc --noEmit بنتيجة نظيفة دون تحذيرات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 30,
  },
  {
    id: 'react-components-state',
    number: '31',
    slug: 'react-components-state',
    title: 'React: المكونات والحالة وتدفق البيانات في الواجهة',
    subtitle: 'بناء المكونات القابلة لإعادة الاستخدام، وإدارة الحالة المحلية، وتطبيق React 19 لمشروع الطالب',
    category: 'frontend',
    categoryName: 'تنفيذ الفرونت إند',
    stageTag: 'المرحلة التطبيقية · الأساسيات البرمجية',
    summary: 'النموذج الذهني لـ React 19 وبناء الواجهات كتبع للحالة UI = f(state). تقسيم الشاشات إلى مكونات ذرية مشتركة (StatusBadge) ومكونات مركبة (EquipmentCard). تنظيم تدفق البيانات أحادي الاتجاه (Props نزولاً والأحداث صعوداً)، وتحديد متى نرفع الحالة (Lifting State Up)، مع إدراك حدود مكونات الخادم والعميل (use client) وتصميم حالات العرض الأربع.',
    tags: ['React 19', 'Components', 'State Management', 'useState', 'Props', 'One-Way Data Flow', 'use client'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic31ReactHtml),
    htmlContent: topic31ReactHtml,

    goal: 'بناء هيكل المكونات القابلة لإعادة الاستخدام وإدارة الحالة وتدفق البيانات أحادي الاتجاه (One-Way Data Flow) بالاعتماد على React 19 والأنواع المحددة، مع فحص تجريب المكونات بالحالات المختلفة (فارغة، تحميل، خطأ، نجاح).',
    prerequisites: [
      'عقود بيانات TypeScript المعتمدة src/types/project.ts (الموضوع 30)',
      'جرد الشاشات المعتمد docs/SCREEN_INVENTORY.md (الموضوع 20)',
      'النموذج التفاعلي المعتمد في Stitch (الموضوع 23)',
      'توضيح عدم وجود خادم حقيقي (Frontend-Only مع بيانات Mock Data)'
    ],
    steps: [
      '1. فكك شاشات جرد MVP إلى مستويات هرمية: مكونات ذرية مشتركة (Atoms)، ومكونات مركبة (Molecules)، ومكونات شاشات كاملة.',
      '2. ابنِ المكونات المشتركة النقية مثل StatusBadge اعتماداً على أنواع المشروع المعرفة مسبقاً دون ربطها بحالة معقدة.',
      '3. أنشئ المكونات التفاعلية وأضف توجيه \'use client\' في أعلى الملف للمكونات التي تعتمد على useState أو أحداث النقر.',
      '4. طبّق مبدأ رفع الحالة (Lifting State Up): احتفظ بالحالة المشتركة في المكون الأب ومرر البيانات والدوال للأبناء عبر Props.',
      '5. صمم حالات الواجهة الأربع الإلزامية لكل ميزة: التحميل (Loading)، والنجاح (Success)، والفارغة (Empty)، والخطأ (Error).',
      '6. اختبر المكونات في عزلة تامة بتمرير خصائص تمثيلية (Mock Props) ووثق معمارية المكونات في docs/REACT_ARCHITECTURE.md.'
    ],
    promptRefs: [
      'prompt-24-frontend-only-next-js-plan',
      'prompt-25-ui-ux-pro-max-review-before-coding'
    ],
    outputs: [
      'src/components/common/StatusBadge.tsx',
      'docs/REACT_ARCHITECTURE.md'
    ],
    checklist: [
      'استيعاب النموذج الذهني لـ React: الواجهة كتبع للحالة UI = f(state).',
      'تقسيم عناصر الواجهة إلى مكونات هرمية قابلة لإعادة الاستخدام دون تكرار الكود.',
      'تطبيق تدفق البيانات أحادي الاتجاه (Props نزولاً وCallbacks صعوداً).',
      'الفهم الدقيق لدور توجيه \'use client\' في React 19 وحصره على المكونات التفاعلية.',
      'تغطية حالات العرض الأربع (التحميل، النجاح، الحالة الفارغة، والخطأ) في كل شاشة.',
      'تجريب مكونات العرض في عزلة ببيانات تمثيلية وتوثيق المعمارية في docs/REACT_ARCHITECTURE.md.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 31,
  },
  {
    id: 'tailwind-css-responsive',
    number: '32',
    slug: 'tailwind-css-responsive',
    title: 'Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد',
    subtitle: 'تطبيق الرموز المعتمدة من DESIGN.md، وتنسيق RTL بالخصائص المنطقية، والتجاوب عبر شاشات المسار الخمس',
    category: 'frontend',
    categoryName: 'تنفيذ الفرونت إند',
    stageTag: 'المرحلة التطبيقية · الأساسيات البرمجية',
    summary: 'تطبيق التنسيق النفعي (Utility-First) المنضبط بركائز نظام التصميم المعتمد في DESIGN.md. التخلص من القيم العشوائية وربط الألوان والتباعدات والزوايا برموز التصميم، مع تطبيق دعم اللغة العربية بالخصائص المنطقية (ms, me, ps, pe, text-start) والتجاوب الدقيق عبر نقاط الكسر الخمس للمسار (390 و768 و1024 و1366 و1440 بكسل) دون تدفق أفقي.',
    tags: ['Tailwind CSS', 'DESIGN.md', 'Responsive Design', 'RTL', 'Logical Properties', 'Breakpoints', 'Accessibility'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic32TailwindHtml),
    htmlContent: topic32TailwindHtml,

    goal: 'تطبيق التنسيق النفعي (Utility-First) والتصميم المتجاوب ودعم اللغة العربية (RTL) بالاستناد المباشر إلى الرموز البصرية وقيم التصميم المعتمدة في DESIGN.md دون ابتكار قيم عشوائية خارج نظام التصميم.',
    prerequisites: [
      'ملف مرجع نظام التصميم المعتمد DESIGN.md (الموضوع 29)',
      'هيكل مكونات React القابلة للتنسيق (الموضوع 31)',
      'لا يشترط مشروع مهيأ: جهز الخريطة الآن وطبق التنسيق بعد تهيئة Next.js في الموضوع 33',
      'فهم نقاط كسر التجاوب المعتمدة في المواصفة الرسمية'
    ],
    steps: [
      '1. راجع رموز DESIGN.md ووثق ربطها؛ في Tailwind v4 جهز @theme في src/app/globals.css لتطبيقه بعد الموضوع 33، واحتفظ بإعداد v3 إن كان مشروعك قائمًا عليه.',
      '2. استخدم الخصائص المنطقية (Logical Properties مثل ms-, me-, ps-, pe-, text-start) بدلاً من الفئات الصلبة القديمة.',
      '3. نسق مكونات المشروع (مثل EquipmentCard) لتتجاوب بسلاسة عبر نقاط الكسر الخمس: 390 و768 و1024 و1366 و1440 بكسل.',
      '4. تأكد من تباين الألوان وإمكانية الوصول (Accessibility & WCAG AA) وتجهيز فئات الوضع الليلي (dark:).',
      '5. افحص العروض الخمسة واتجاهي RTL/LTR، وحدد العنصر الذي يسبب التدفق الأفقي وأصلح عرضه أو التفاف محتواه قبل إعادة الفحص. لا تخف التدفق على مستوى الصفحة؛ استخدم القص المحلي فقط عندما يكون مقصوداً ولا يحجب محتوى أو تحكماً.',
      '6. وثق مصفوفة ربط رموز التصميم بفئات Tailwind في docs/TAILWIND_DESIGN_MAPPING.md.'
    ],
    promptRefs: [
      'prompt-23-extract-design-md-from-stitch',
      'prompt-25-ui-ux-pro-max-review-before-coding'
    ],
    outputs: [
      'src/app/globals.css (Tailwind v4؛ يطبق بعد تهيئة الموضوع 33)',
      'docs/TAILWIND_DESIGN_MAPPING.md'
    ],
    checklist: [
      'ربط فئات Tailwind برموز وثيقة DESIGN.md المعتمدة وتجنب الارتجال البصري.',
      'الاعتماد الكامل على الخصائص المنطقية (Logical Properties) لضمان اتجاه RTL سليم.',
      'التجاوب التام عبر نقاط الكسر الخمس المعتمدة (390، 768، 1024، 1366، 1440 بكسل).',
      'خلو كافة الصفحات من التدفق الأفقي (Horizontal Overflow) في عروض الهواتف (390px).',
      'مراعاة تباين الألوان وسهولة القراءة في وضعي الإضاءة والوضع الليلي (Dark Mode).',
      'توثيق ربط الرموز في docs/TAILWIND_DESIGN_MAPPING.md ومطابقتها للمكونات المنجزة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 32,
  },
  {
    id: 'nextjs-app-router',
    number: '33',
    slug: 'nextjs-app-router',
    title: 'Next.js: بنية App Router والمسارات والصفحات',
    subtitle: 'هيكلة مجلد app، والتخطيطات المتداخلة (Layouts)، والتنقل بين صفحات جرد الشاشات في واجهة Frontend-Only',
    category: 'frontend',
    categoryName: 'تنفيذ الفرونت إند',
    stageTag: 'المرحلة التطبيقية · الأساسيات البرمجية',
    summary: 'معمارية App Router في Next.js 15 ودمج TypeScript وReact وTailwind في بنية إنتاجية متكاملة. هيكلة مسارات المشروع وتخطيطاته وفق وثيقة SCREEN_INVENTORY.md، والتنقل الفوري بين الصفحات بمكون next/link، مع التأكيد الصارم على حدود التنفيذ: المشروع واجهة مستخدم كاملة الوظائف بنمط Frontend-Only تعتمد على Mock Data محلية دون ادعاء وجود Backend فعلي.',
    tags: ['Next.js 15', 'App Router', 'Layouts', 'File-system Routing', 'next/link', 'Frontend-Only', 'Mock Data'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic33NextjsHtml),
    htmlContent: topic33NextjsHtml,

    goal: 'هيكلة مشروع Next.js 15 بنظام App Router وبناء شجرة المسارات والتخطيطات المشتركة (Layouts & Pages) وفق جرد الشاشات المعتمد، مع إدارة التنقل وحالات التحميل والخطأ في إطار Frontend-Only دون ادعاء وجود Backend فعلي.',
    prerequisites: [
      'عقود بيانات TypeScript المعتمدة (الموضوع 30)',
      'هيكل مكونات React وتدفق الحالة (الموضوع 31)',
      'نظام التنسيق المتجاوب في Tailwind CSS (الموضوع 32)',
      'وثيقة جرد الشاشات المعتمدة docs/SCREEN_INVENTORY.md (الموضوع 20)'
    ],
    steps: [
      '1. راجع شاشات جرد MVP في docs/SCREEN_INVENTORY.md لتحديد بنية المسارات ومجموعات التوجيه (Route Groups).',
      '2. ابنِ التخطيط الجذري src/app/layout.tsx مع تفعيل dir="rtl" وlang="ar" واستيراد خط Cairo وشريط التنقل العلوي.',
      '3. أنشئ مجلدات المسارات الأساسية: الصفحة الرئيسية (app/page.tsx)، وكتالوج المعدات (app/equipment/page.tsx)، والتفاصيل الديناميكية (app/equipment/[id]/page.tsx).',
      '4. استخدم مكون next/link للتنقل الفوري من جانب العميل مع تفعيل مؤشرات الرابط النشط.',
      '5. أضف ملفات التحميل loading.tsx والصفحات المفقودة not-found.tsx لمعالجة الحالات الانتقائية بأمان.',
      '6. التزم بالحدود التعليمية: اربط المسارات ببيانات Mock Data المحلية دون إنشاء اتصال بـ Backend حقيقي، وشغل خادم npm run dev وافحص المسارات في المتصفح.'
    ],
    promptRefs: [
      'prompt-24-frontend-only-next-js-plan',
      'prompt-26-select-next-implementation-phase'
    ],
    outputs: [
      'src/app/layout.tsx',
      'docs/NEXTJS_ROUTING_SPEC.md'
    ],
    checklist: [
      'فهم معمارية App Router القائمة على المجلدات والملفات في Next.js 15.',
      'هيكلة مسارات المشروع تطابقاً تاماً مع شاشات docs/SCREEN_INVENTORY.md المعتمدة.',
      'إعداد التخطيط الجذري مع دعم كامل للغة العربية dir="rtl" وlang="ar".',
      'استخدام مكون next/link حصراً للتنقل السريع من جانب العميل.',
      'الالتزام الصارم بحدود Frontend-Only وعدم ادعاء وجود Backend أو قاعدة بيانات حقيقية في هذه المرحلة.',
      'تشغيل خادم التطوير بنجاح (npm run dev) واختبار التنقل السلس بين المسارات دون أخطاء.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 33,
  },
];
