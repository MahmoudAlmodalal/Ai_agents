import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TOPIC 34: FRONTEND PLANNING (تخطيط واجهة المستخدم وهندسة الفرونت إند)
 * Sequence Position: 34
 * ========================================================================= */
export const topic34FrontendPlanningHtml = `
<section id="topic-34-frontend-planning" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 34 · تخطيط الفرونت إند</span>
    <span class="step-pill">المسارات والمكونات وعقود البيانات والمهام الذرية</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)</h2>
      <div class="step-subtitle">تفكيك الواجهة إلى مسارات ومكونات وعقود بيانات ومهام ذرية صغيرة قابلة للتحقق قبل كتابة الكود</div>
    </div>
  </div>

  <!-- 1. Architecture Before Code -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. لماذا يسبق التخطيط المعماري أي كتابة للكود البرمجي؟</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      أكبر فخ يقع فيه مطورو تطبيقات الذكاء الاصطناعي هو «البرمجة الاندفاعية» (Impulsive Vibe Coding): فتح محرر الكود وتوجيه أمر عام للوكيل مثل <em>«ابنِ لي صفحات التطبيق كاملة مع لوحة التحكم وتسجيل الدخول!»</em>. النتيجة الحتمية لهذا النهج هي انهيار نافذة السياق، وتشوه هيكل المشروع، وإنتاج كود متنافر وغير مترابط يعجز حتى أمهر المطورين عن صيانته.
    </p>
    <p class="leading-8 text-[var(--text-muted)] mt-2">
      في منهجيتنا الهندسية، يدخل الطالب مرحلة الفرونت إند مسلحاً بجميع المخرجات التحليلية والبصرية المعتمدة من المحطات السابقة:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>وثيقة متطلبات المنتج (docs/PRD.md):</strong> المرجع التشريعي للوظائف، وقواعد العمل، وصلاحيات الأدوار.</li>
      <li><strong>جرد الشاشات (docs/SCREEN_INVENTORY.md):</strong> القائمة الحصرية لكافة الشاشات وحالاتها المستهدفة في النسخة التجريبية الأولى (MVP).</li>
      <li><strong>نظام التصميم (DESIGN.md ومراجع Stitch):</strong> المرجع البصري المعتمد لتوكنز الألوان والخطوط ومقاسات التباعد.</li>
      <li><strong>مخطط الكيانات (docs/ERD.md):</strong> الهيكل المفاهيمي للبيانات الذي ستشتق منه عقود الواجهة.</li>
    </ul>

    <div class="callout warning my-6">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>حدود النطاق الصارمة: الواجهة الأمامية فقط (Frontend-Only Boundary)</span>
      </div>
      <p class="leading-7">
        تخطيط هذه المرحلة ينصب <strong>حصرياً على الواجهة الأمامية (Frontend Only)</strong>. يُحظر تماماً كتابة كود الخادم (Backend)، أو إنشاء قواعد البيانات والـ Migrations، أو ادعاء وجود تكامل حي أو مصادقة حقيقية (Authentication) في هذه المرحلة. يتم التعامل مع كافة البيانات عبر <strong>بيانات تمثيلية صريحة (Mock Data) وعقود مكتوبة الأنواع (Typed Contracts)</strong> حتى يحين موعد بناء الخادم والربط في المحطات اللاحقة.
      </p>
    </div>
  </div>

  <!-- 2. Routes Map (Next.js App Router) -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. شجرة المسارات وهيكلية Next.js App Router</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نعتمد هيكلية Next.js App Router المعيارية، حيث يتحول كل مجلد داخل <code>app/</code> إلى مسار (Route) حقيقي في الموقع، بينما تُعرّف ملفات النظام الخاصة سلوك كل مسار:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الملف المعياري</th>
            <th>الوظيفة الهندسية</th>
            <th>الاستخدام في مشروع الطالب</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>page.tsx</code></td>
            <td>الواجهة الفريدة للمسار</td>
            <td>عرض محتوى الشاشة المحددة من جرد الشاشات</td>
          </tr>
          <tr>
            <td><code>layout.tsx</code></td>
            <td>الغلاف المشترك المحفوظ</td>
            <td>شريط التنقل (Navbar) والقائمة الجانبية (Sidebar) المشتركة</td>
          </tr>
          <tr>
            <td><code>loading.tsx</code></td>
            <td>واجهة التحميل الفورية (Suspense Boundary)</td>
            <td>عرض شاشات الهيكل العظمي (Skeleton Screens) أثناء جلب البيانات</td>
          </tr>
          <tr>
            <td><code>error.tsx</code></td>
            <td>معالجة الأخطاء المعزولة (Error Boundary)</td>
            <td>التقاط الأخطاء وعرض زر إعادة المحاولة دون إسقاط كامل التطبيق</td>
          </tr>
          <tr>
            <td><code>not-found.tsx</code></td>
            <td>واجهة الصفحة غير الموجودة (404)</td>
            <td>توجيه المستخدم بشكل ودود عند طلب مورد أو slug غير موجود</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-container my-4">
      <h4 class="font-bold text-[var(--text-main)] mb-2">خريطة مسارات مشروع BorrowHub (docs/ROUTES_MAP.md)</h4>
      <table class="data-table">
        <thead>
          <tr>
            <th>المسار (Route)</th>
            <th>نوع الوصول</th>
            <th>الوظيفة والهدف</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/</code></td>
            <td>عام (Public)</td>
            <td>الصفحة الرئيسية واستكشاف أقسام المعدات الأكثر طلباً</td>
          </tr>
          <tr>
            <td><code>/equipment</code></td>
            <td>عام (Public)</td>
            <td>كتالوج المعدات الشامل مع البحث والتصفية حسب الأقسام وحالة التوفر</td>
          </tr>
          <tr>
            <td><code>/equipment/[id]</code></td>
            <td>عام (Public)</td>
            <td>تفاصيل المعدة الكاملة والمواصفات الفنية وزر تقديم طلب الاستعارة</td>
          </tr>
          <tr>
            <td><code>/requests</code></td>
            <td>محمي شكلياً (Student Role)</td>
            <td>متابعة طلبات الاستعارة الحالية والسابقة وسجل الحالات للطالب</td>
          </tr>
          <tr>
            <td><code>/admin/inventory</code></td>
            <td>محمي شكلياً (Staff Role)</td>
            <td>إدارة المخزون وتحديث حالات المعدات (متاحة، محجوزة، معارة، تالفة)</td>
          </tr>
          <tr>
            <td><code>/admin/loans</code></td>
            <td>محمي شكلياً (Staff Role)</td>
            <td>مراجعة واعتماد طلبات الاستعارة وتسجيل التسليم والإرجاع الميداني</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 3. Component Architecture -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. هرمية المكونات وفصل المسؤوليات (Component Architecture)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تنظم المكونات في ثلاث طبقات معمارية واضحة المعالم، مع الحفاظ على قاعدة ذهبية: <strong>المكونات خادمة (Server Components) افتراضياً، وتتحول إلى عميلة (Client Components) فقط عند الحاجة للتفاعل المباشر</strong>:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <h4 class="font-bold text-[var(--text-main)] mb-2">1. المكونات القاعدية (UI Primitives)</h4>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          مكونات ذرية مستقلة تماماً عن مجال المشروع توضع في <code>src/components/ui/</code>، مثل <code>Button</code>، و<code>Badge</code>، و<code>Card</code>، و<code>Modal</code>، و<code>Input</code>، تُبنى وفق توكنز <code>DESIGN.md</code>.
        </p>
      </div>
      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <h4 class="font-bold text-[var(--text-main)] mb-2">2. مكونات الهيكل (Layout Components)</h4>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          المكونات الهيكلية المشتركة في <code>src/components/layout/</code>، مثل <code>Navbar</code>، و<code>Sidebar</code>، و<code>Footer</code>، و<code>RoleSwitcher</code> للتبديل السريع بين أدوار المستخدمين التمثيلية.
        </p>
      </div>
      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <h4 class="font-bold text-[var(--text-main)] mb-2">3. مكونات الميزات (Feature Modules)</h4>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          مكونات متخصصة بكيانات المشروع توضع في <code>src/components/equipment/</code> و<code>src/components/loans/</code>، مثل <code>EquipmentCard</code> و<code>LoanRequestModal</code>، وترتبط مباشرة بعقود البيانات.
        </p>
      </div>
    </div>
  </div>

  <!-- 4. Frontend Data Contracts -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. عقود بيانات الفرونت إند والأنواع الصارمة (TypeScript Data Contracts)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      استخدم عقود الموضوع 30 في <code>src/types/project.ts</code> كمصدر موحد للأنواع. المثال المختصر أدناه يشرح View Model توضيحيًا خاصًا بالواجهة، وليس بديلًا لتلك العقود أو لمخطط ERD المعتمد.
    </p>

    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>تنبيه اتساق المصدر وقواعد BorrowHub التسع</span>
      </div>
      <p class="leading-7 text-xs sm:text-sm">
        قواعد العمل المعتمدة في BorrowHub محددة بدقة: <strong>عشرة أيام تقويمية</strong> كحد أقصى للمدة، <strong>طلبان نشطان</strong> كحد أقصى للطالب، <strong>وحدة واحدة</strong> لكل طلب، <strong>سبب الاستعارة إلزامي</strong>، <strong>اعتماد يدوي</strong> لحساب الطالب، <strong>تأكيد مادي للاستلام والإرجاع بواسطة مسؤول المعمل (Staff)</strong>، <strong>مهلة استلام 48 ساعة</strong> تبدأ من تاريخ بداية الطلب خاضعة لتعريف PRD، و<strong>انعدام الغرامات المالية أو الحظر التلقائي</strong>.
      </p>
      <p class="leading-7 text-xs sm:text-sm mt-2">
        عقود الموضوع 30 الأساسية تعتمد المعرّف <code>userId</code> وحالة <code>active</code>؛ بينما يستخدم نموذج العرض التوضيحي أدناه <code>studentId</code> وحالة <code>collected</code> كعينة لمتطلبات الواجهة المحلية، مما يتطلب مواءمتها عبر Adapter بدلاً من التعديل الصامت أو افتراض مدد متغيرة (مثل 7 أو 14 يوماً) غير معتمدة.
      </p>
    </div>

    <!-- Code Snippet: Frontend Data Contracts -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">src/types/equipment.ts (Illustrative UI View Models)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ الكود">نسخ الكود</button>
      </div>
      <pre class="code-content"><code>// Illustrative view models only; canonical domain types remain in topic 30 (src/types/project.ts).
// Note field naming difference: UI model uses studentId/collected; canonical domain uses userId/active.
// BorrowHub loan duration rule is fixed at 10 calendar days max; do not invent arbitrary 7/14 day rules.
export type EquipmentStatus = 'available' | 'reserved' | 'borrowed' | 'damaged' | 'maintenance';

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
}

export interface EquipmentViewModel {
  id: string;
  name: string;
  serialNumber: string;
  categoryId: string;
  category?: Category;
  status: EquipmentStatus;
  description: string;
  specifications: Record&lt;string, string&gt;;
  imageUrl: string;
  location: string;
  requiresSupervisorApproval: boolean;
  maxBorrowDays: number;
}

export interface LoanRequestViewModel {
  id: string;
  equipmentId: string;
  equipment?: EquipmentViewModel;
  studentId: string;
  studentName: string;
  studentEmail: string;
  status: 'pending' | 'approved' | 'rejected' | 'collected' | 'returned' | 'overdue';
  startDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  purpose: string;
  supervisorNotes?: string;
  createdAt: string;
}</code></pre>
    </div>
  </div>

  <!-- 5. Small Verifiable Tasks Strategy -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. استراتيجية التفكيك إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      الركيزة الجوهرية لمنهجية سلاح العصر هي <strong>«المهام الذرية الصغيرة القابلة للتحقق الفوري»</strong>. لا يُكلف الوكيل ببناء صفحة كاملة أو ميزة مجمعة، بل يتم تقسيم خطة التنفيذ إلى مهام لا تتجاوز الواحدة منها تعديل ملف أو ملفين، مع تحديد الشروط التالية لكل مهمة:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>عنصر المهمة</th>
            <th>المقصود به</th>
            <th>مثال من مهمة بناء بطاقة المعدة (TASK-FE-03)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>المعرّف (Task ID)</strong></td>
            <td>رمز فريد يحدد ترتيب المهمة</td>
            <td><code>TASK-FE-03</code></td>
          </tr>
          <tr>
            <td><strong>النطاق المحدد (Scope)</strong></td>
            <td>الملفات التي سيتم إنشاؤها أو تعديلها حصراً</td>
            <td>إنشاء <code>src/components/equipment/EquipmentCard.tsx</code> فقط</td>
          </tr>
          <tr>
            <td><strong>المدخلات المرجعية (Inputs)</strong></td>
            <td>المستندات والتصميمات التي يقرأ منها الوكيل</td>
            <td><code>DESIGN.md</code>، ومرجع Stitch لشاشة الكتالوج، و<code>src/types/equipment.ts</code></td>
          </tr>
          <tr>
            <td><strong>المخرج المتوقع (Output)</strong></td>
            <td>المكون أو الواجهة المنتجة</td>
            <td>مكون بطاقة المعدة التفاعلي يدعم كافة حالات التوفر</td>
          </tr>
          <tr>
            <td><strong>الاعتماديات السابقة (Dependencies)</strong></td>
            <td>المهام التي يجب اكتمالها قبل بدء هذه المهمة</td>
            <td><code>TASK-FE-01</code> (المكونات القاعدية) و<code>TASK-FE-02</code> (عقود البيانات)</td>
          </tr>
          <tr>
            <td><strong>معايير القبول (Acceptance Criteria)</strong></td>
            <td>شروط إغلاق المهمة وقبول العمل</td>
            <td>تطبيق شارات التوفر، دعم زر الحجز للمعدات المتاحة، ودعم التجاوب &ge; 44px لمس</td>
          </tr>
          <tr>
            <td><strong>أمر التحقق الفوري (Verification)</strong></td>
            <td>أمر طرفية سريع يتأكد من سلامة الشيفرة</td>
            <td><code>npx tsc --noEmit && npm run build</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Visual Diagram: Frontend Planning Flow -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (14): دورة التخطيط المعماري للفرونت إند من المتطلبات إلى المهام الذرية</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 320" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط التخطيط المعماري للفرونت إند">
          <!-- Inputs Block -->
          <rect x="20" y="40" width="160" height="240" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="100" y="70" fill="#60a5fa" font-size="13" font-weight="bold" text-anchor="middle">المراجع المعتمدة</text>
          <text x="100" y="110" fill="#94a3b8" font-size="11" text-anchor="middle">docs/PRD.md</text>
          <text x="100" y="145" fill="#94a3b8" font-size="11" text-anchor="middle">docs/SCREEN_INVENTORY.md</text>
          <text x="100" y="180" fill="#94a3b8" font-size="11" text-anchor="middle">DESIGN.md</text>
          <text x="100" y="215" fill="#94a3b8" font-size="11" text-anchor="middle">مراجع Stitch</text>
          <text x="100" y="250" fill="#94a3b8" font-size="11" text-anchor="middle">docs/ERD.md</text>

          <!-- Arrow 1 -->
          <line x1="180" y1="160" x2="220" y2="160" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)"/>

          <!-- Routes & Components -->
          <rect x="220" y="40" width="170" height="240" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="305" y="70" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">المسارات والمكونات</text>
          <text x="305" y="110" fill="#cbd5e1" font-size="11" text-anchor="middle">Next.js App Router</text>
          <text x="305" y="145" fill="#94a3b8" font-size="11" text-anchor="middle">docs/ROUTES_MAP.md</text>
          <text x="305" y="180" fill="#cbd5e1" font-size="11" text-anchor="middle">هرمية المكونات</text>
          <text x="305" y="215" fill="#94a3b8" font-size="11" text-anchor="middle">UI Primitives vs Features</text>
          <text x="305" y="250" fill="#94a3b8" font-size="11" text-anchor="middle">Server vs Client</text>

          <!-- Arrow 2 -->
          <line x1="390" y1="160" x2="430" y2="160" stroke="#10b981" stroke-width="2"/>

          <!-- Data Contracts -->
          <rect x="430" y="40" width="160" height="240" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="510" y="70" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">عقود البيانات والأنواع</text>
          <text x="510" y="115" fill="#cbd5e1" font-size="11" text-anchor="middle">TypeScript Interfaces</text>
          <text x="510" y="150" fill="#94a3b8" font-size="11" text-anchor="middle">مطابقة لـ ERD</text>
          <text x="510" y="185" fill="#cbd5e1" font-size="11" text-anchor="middle">Mock Data Schemas</text>
          <text x="510" y="220" fill="#94a3b8" font-size="11" text-anchor="middle">جاهزة للاستبدال لاحقاً</text>
          <text x="510" y="255" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">لا خادم ولا قاعدة حالياً</text>

          <!-- Arrow 3 -->
          <line x1="590" y1="160" x2="630" y2="160" stroke="#f59e0b" stroke-width="2"/>

          <!-- Tasks Block -->
          <rect x="630" y="40" width="150" height="240" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
          <text x="705" y="70" fill="#a78bfa" font-size="13" font-weight="bold" text-anchor="middle">المهام الذرية</text>
          <text x="705" y="110" fill="#cbd5e1" font-size="11" text-anchor="middle">docs/FRONTEND_TASKS.md</text>
          <text x="705" y="145" fill="#94a3b8" font-size="11" text-anchor="middle">Task ID + Inputs</text>
          <text x="705" y="180" fill="#94a3b8" font-size="11" text-anchor="middle">Acceptance Criteria</text>
          <text x="705" y="215" fill="#94a3b8" font-size="11" text-anchor="middle">أمر الفحص الفوري</text>
          <text x="705" y="250" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">مهمة واحدة في كل مرة</text>
        </svg>
      </div>
    </div>
  </div>

  <!-- 6. Prompts Section -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">6. برومبتات التخطيط المعماري المعتمدة</h3>

    <!-- PROMPT 24 -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 24 — Frontend-Only Next.js Plan</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Next.js Frontend Architect.
Read PRD, SCREEN_INVENTORY, UX_BLUEPRINT, DESIGN.md and Stitch references.
Plan only the frontend: Next.js App Router, React, TypeScript, Tailwind CSS.
Create route hierarchy, layouts, shared components, feature modules,
typed mock data, data contracts, user interactions and UI states.
Divide implementation into small dependency-ordered PHASES and TASKS.
For every task define ID, exact scope, inputs, expected output, dependencies,
acceptance criteria and verification method. Map every MVP screen to a phase.
Do not code yet, and do not implement backend, database or real authentication.
Create docs/FRONTEND_PLAN.md, docs/FRONTEND_TASKS.md,
docs/ROUTES_MAP.md, docs/COMPONENT_ARCHITECTURE.md,
docs/FRONTEND_DATA_CONTRACTS.md.</code></pre>
    </div>

    <!-- PROMPT 26 -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 26 — Select Next Implementation Phase</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Frontend Tech Lead.
Read FRONTEND_PLAN.md, FRONTEND_TASKS.md and actual repository state.
Choose the next uncompleted phase whose dependencies are satisfied.
Create a FEATURE_BRIEF with exact scope, screens, inputs, dependencies,
deliverables and acceptance criteria. Do not implement anything yet.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 35: UI/UX PRO MAX (مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max)
 * Sequence Position: 35
 * ========================================================================= */
export const topic35UiUxProMaxHtml = `
<section id="topic-35-ui-ux-pro-max" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 35 · مراجعة الواجهة والتجربة</span>
    <span class="step-pill">تدقيق معايير التصميم والوصول والتجاوب</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max</h2>
      <div class="step-subtitle">تدقيق خطة وتصميم المكونات بمعايير الجودة البصرية وإمكانية الوصول وتجاوب الشاشات قبل وبعد التنفيذ</div>
    </div>
  </div>

  <!-- 1. Proper Placement in the Workflow -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. التموضع الهندسي لأداة UI/UX Pro Max في مسار التطوير</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تأتي أداة ومهارة <strong>UI/UX Pro Max</strong> في موضع استخدامها الطبيعي الدقيق: <strong>بعد إعداد خطة الفرونت إند وهرمية المكونات، وقبل وأثناء تنفيذ الكود البرمجي</strong>. دورها الهندسي ليس مجرد إبداء آراء جمالية عابرة، بل العمل كـ «مدقق جودة بصرية واختصاصي وصول رقمي» (Accessibility & UX Auditor)، يفحص خطة الشاشات والمكونات المنفذة بعين ناقدة وصارمة تمنع التنافر البصري وتلزم الكود بتوكنز التصميم المعتمدة في <code>DESIGN.md</code>.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🎯</span>
        <span>القاعدة الذهبية لمراجعة UI/UX Pro Max</span>
      </div>
      <p class="leading-7">
        <strong>UI/UX Pro Max لا تستبدل الهوية البصرية المعتمدة في DESIGN.md ولا تغير ألوان المشروع!</strong> وظيفتها هي ضبط اتساق الكود مع تلك الهوية، والتأكد من تطبيق التباين الكافي، وأبعاد اللمس السليمة، وسلاسة الحالات التفاعلية في كافة الشاشات.
      </p>
    </div>
  </div>

  <!-- 2. Verified vs Official Sources -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. مراجعة الأوامر والاعتماد مقابل المصادر الرسمية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      التزاماً بقاعدة التذكرة الصارمة (<em>«تُراجع أوامرها مقابل المصادر الرسمية قبل اعتمادها»</em>)، تم تدقيق الأداة مقابل مستودعها الرسمي المعتمد:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>المصدر الرسمي المعتمد:</strong> <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline font-mono">https://github.com/nextlevelbuilder/ui-ux-pro-max-skill</a></li>
      <li><strong>حالة التحقق:</strong> <span class="rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 text-xs font-bold">مُراجع ومطابق للمستودع الرسمي (Verified against official repo)</span></li>
      <li><strong>طرق التثبيت والتشغيل الرسمية:</strong></li>
    </ul>

    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">أوامر التثبيت والتهيئة الرسمية (Official CLI Commands)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الأوامر';},2000);})" aria-label="نسخ الأوامر">نسخ الأوامر</button>
      </div>
      <pre class="code-content"><code># الخيار الأول: التثبيت العام (Global Install)
npm install -g ui-ux-pro-max-cli
uipro init --ai antigravity

# الخيار الثاني: تشغيل فوري دون تثبيت عام (npx on-demand)
npx ui-ux-pro-max-cli init --ai antigravity</code></pre>
    </div>

    <p class="leading-7 text-xs sm:text-sm text-[var(--text-muted)] mt-2">
      ملاحظة للمحررات الأخرى: تدعم الأداة التهيئة لبيئات متعددة مثل Cursor وClaude Code عبر تمرير الوسم المناسب (مثل <code>--ai cursor</code> أو <code>--ai claude</code>). في حال العمل داخل بيئة لا تدعم الـ CLI، تُستخدم تعليمات المهارة مباشرة كملف سياق في <code>docs/skills/ui-ux-pro-max.md</code>.
    </p>
  </div>

  <!-- 3. Five Core Audit Dimensions -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. أبعاد المراجعة الخمسة الأساسية في تدقيق الواجهات</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      عند مراجعة أي مكون أو شاشة، يطبق الطالب الفحص مقابل خمسة معايير هندسية ملزمة:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>البعد الهندسي</th>
            <th>المعيار الرقمي المطلوب</th>
            <th>الهدف والأثر على تجربة المستخدم</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. الدقة البصرية وتوكنز التصميم (Visual Fidelity)</strong></td>
            <td>مطابقة 100% لألوان وهوامش <code>DESIGN.md</code> دون أي ألوان سداسية كودية عشوائية (Arbitrary Hex).</td>
            <td>منع التلوث البصري، وضمان اتساق المظهر، ودعم الوضعين الليلي والنهاري بسلاسة.</td>
          </tr>
          <tr>
            <td><strong>2. تكامل الحالات التفاعلية (Interactive States)</strong></td>
            <td>تغطية حالات <code>hover</code>، و<code>focus-visible</code>، و<code>active</code>، و<code>disabled</code> لكافة الأزرار والروابط.</td>
            <td>إشعار المستخدم الفوري بتفاعله ومنع إحساس التجمد في الواجهة.</td>
          </tr>
          <tr>
            <td><strong>3. إمكانية الوصول وتباين الألوان (WCAG AA)</strong></td>
            <td>نسبة تباين النص مع الخلفية لا تقل عن <strong>4.5:1</strong> للنصوص العادية، و<strong>3:1</strong> للعناوين الكبيرة.</td>
            <td>تمكين ضعاف البصر والقراءة في ظروف الإضاءة القوية ومطابقة معايير الويب العالمية.</td>
          </tr>
          <tr>
            <td><strong>4. أهداف اللمس على الهواتف (Touch Targets)</strong></td>
            <td>حجم منطقة النقر لا يقل عن <strong>44×44 بكسل</strong> (أو <code>min-h-[44px] min-w-[44px]</code> في Tailwind).</td>
            <td>منع أخطاء النقر المزعجة عند تصفح التطبيق من الهواتف الذكية والشاشات اللمسية.</td>
          </tr>
          <tr>
            <td><strong>5. مرونة التجاوب وانعدام التمرير الأفقي (Responsive)</strong></td>
            <td>فحص الواجهة عند 390px، و768px، و1024px، و1440px مع صفر تمرير أفقي (Zero Horizontal Overflow).</td>
            <td>عرض مرتب على كافة الأجهزة المحمولة والشاشات الكبيرة دون خروج أي عنصر خارج الشاشة.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Visual Diagram: UI/UX Pro Max Protocol Flow -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (15): مسار مراجعة الجودة البصرية بـ UI/UX Pro Max قبل الكود وبعده</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 280" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط مراجعة UI/UX Pro Max">
          <!-- Step 1: Pre-Coding Review -->
          <rect x="30" y="40" width="210" height="200" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="135" y="70" fill="#60a5fa" font-size="13" font-weight="bold" text-anchor="middle">1. مراجعة ما قبل الكود</text>
          <text x="135" y="105" fill="#cbd5e1" font-size="11" text-anchor="middle">مطابقة FEATURE_BRIEF</text>
          <text x="135" y="135" fill="#94a3b8" font-size="11" text-anchor="middle">فحص DESIGN.md</text>
          <text x="135" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">إعادة استخدام المكونات</text>
          <text x="135" y="200" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">منع إعادة اختراع العجلة</text>

          <!-- Arrow 1 -->
          <line x1="240" y1="140" x2="280" y2="140" stroke="#3b82f6" stroke-width="2"/>

          <!-- Step 2: Implementation & Code -->
          <rect x="280" y="40" width="220" height="200" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="390" y="70" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">2. التدقيق الفني للمكون</text>
          <text x="390" y="105" fill="#cbd5e1" font-size="11" text-anchor="middle">فحص التباين WCAG AA</text>
          <text x="390" y="135" fill="#94a3b8" font-size="11" text-anchor="middle">أهداف اللمس &ge; 44px</text>
          <text x="390" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">الحالات: Hover, Active, Focus</text>
          <text x="390" y="200" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">دعم RTL والتجاوب</text>

          <!-- Arrow 2 -->
          <line x1="500" y1="140" x2="540" y2="140" stroke="#f59e0b" stroke-width="2"/>

          <!-- Step 3: Verified Component -->
          <rect x="540" y="40" width="230" height="200" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="655" y="70" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">3. المخرج المعتمد للتقرير</text>
          <text x="655" y="105" fill="#cbd5e1" font-size="11" text-anchor="middle">docs/UI_UX_PRO_MAX_AUDIT.md</text>
          <text x="655" y="135" fill="#94a3b8" font-size="11" text-anchor="middle">نقاط الفحص: PASS / FAIL</text>
          <text x="655" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">تعديلات Tailwind الدقيقة</text>
          <text x="655" y="200" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">كود جاهز للاعتماد والدمج</text>
        </svg>
      </div>
    </div>
  </div>

  <!-- 4. Prompts and Practical BorrowHub Example -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. برومبت المراجعة ومثال عملي من مشروع BorrowHub</h3>

    <!-- PROMPT 25 -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 25 — UI/UX Pro Max Review Before Coding</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Use the installed ui-ux-pro-max skill.
Review the approved FEATURE_BRIEF, DESIGN.md, relevant Stitch designs
and existing shared UI components. Recommend the best project-specific
layout, component reuse, typography, spacing, responsiveness,
accessibility and interaction patterns.
Do not replace approved identity or modify files yet.</code></pre>
    </div>

    <p class="leading-7 text-[var(--text-muted)]">الجدول التالي نموذج تعليمي لكتابة الملاحظات؛ حالات PASS وFIXED فيه أمثلة لا نتائج فحص فعلية لمشروع الطالب. ابدأ تقريرك بـ Not Run، ثم سجل دليل القياس ونتيجة فحصك. استعمال المهارة مشروط بتوفرها في وكيلك؛ يمكن إجراء المراجعة يدويًا بالقائمة نفسها.</p>
    <!-- Practical Audit Example -->
    <div class="table-container my-4">
      <h4 class="font-bold text-[var(--text-main)] mb-2">نموذج تقرير مراجعة مكون بطاقة المعدة (docs/UI_UX_PRO_MAX_AUDIT.md)</h4>
      <table class="data-table">
        <thead>
          <tr>
            <th>عنصر الفحص</th>
            <th>الحالة</th>
            <th>الملاحظة الهندسية</th>
            <th>الإجراء التصحيحي المعتمد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ألوان شارات التوفر</td>
            <td><span class="text-emerald-500 font-bold">PASS</span></td>
            <td>استخدام توكنز <code>DESIGN.md</code> المعتمدة للحالات</td>
            <td>لا يلزم تعديل</td>
          </tr>
          <tr>
            <td>زر طلب الاستعارة</td>
            <td><span class="text-amber-500 font-bold">FIXED</span></td>
            <td>الارتفاع الأولي كان 36px مما يخالف معيار اللمس للهواتف</td>
            <td>تعديل الكلاس إلى <code>min-h-[44px] px-4 py-2.5</code></td>
          </tr>
          <tr>
            <td>تباين نص الوصف</td>
            <td><span class="text-amber-500 font-bold">FIXED</span></td>
            <td>استخدام <code>text-slate-400</code> على خلفية بيضاء يعطي تباين 3.2:1</td>
            <td>تصحيح الكلاس إلى <code>text-slate-600 dark:text-slate-300</code> (تباين 5.1:1)</td>
          </tr>
          <tr>
            <td>مؤشر التركيز للوحة المفاتيح</td>
            <td><span class="text-amber-500 font-bold">FIXED</span></td>
            <td>غياب مؤشر التركيز عند التنقل بزر Tab</td>
            <td>إضافة <code>focus-visible:ring-2 focus-visible:ring-emerald-500</code></td>
          </tr>
          <tr>
            <td>تجاوب الشبكة على الموبايل</td>
            <td><span class="text-emerald-500 font-bold">PASS</span></td>
            <td>عمود واحد على 390px، وعمودان على 768px، وثلاثة على 1024px</td>
            <td>انعدام أي تمرير أفقي</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 36: SPEC KIT (تنظيم المواصفات وتطوير الميزات بـ Spec Kit)
 * Sequence Position: 36
 * ========================================================================= */
export const topic36SpecKitHtml = `
<section id="topic-36-spec-kit" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 36 · منهجية المواصفات والتنفيذ</span>
    <span class="step-pill">التطوير القائم على المواصفات ودستور المشروع</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">تنظيم المواصفات وتطوير الميزات بـ Spec Kit</h2>
      <div class="step-subtitle">منهجية التطوير القائم على المواصفات: الدستور، التخصيص، التوضيح، التخطيط، والمهام</div>
    </div>
  </div>

  <!-- 1. Philosophy of Specification-Driven Development -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. فلسفة التطوير القائم على المواصفات (Specification-Driven Development)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      عندما يعمل المطور مع وكيل ذكاء اصطناعي، فإن أكبر خطر يهدد المشروع هو <strong>«الغموض الصامت»</strong>: حالات يواجه فيها الوكيل تفاصيل غير محسومة، فيقوم باختراع منطق عمل عشوائي من تلقاء نفسه ليمضي في البرمجة!
      أداة <strong>GitHub Spec Kit</strong> جاءت لحل هذه المعضلة جذرياً عبر فرض حلقة عمل منضبطة ترتكز على مبدأ صارم: <em>«لا كود قبل اكتمال المواصفة، وتوضيح الغموض، وفحص الاتساق»</em>.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">📋</span>
        <span>ما هو دستور المشروع (Constitution)؟</span>
      </div>
      <p class="leading-7">
        دستور المشروع هو وثيقة قواعد هندسية صارمة تُحقن في بداية الجلسة عبر أمر <code>/speckit-constitution</code> وتُحفظ في <code>docs/rules/frontend.md</code>. يلزم هذا الدستور الوكيل البرمجي بعدم استخدام <code>any</code>، والالتزام الصارم بتوكنز <code>DESIGN.md</code>، وتغطية حالات التحميل والخطأ والفراغ في كل مكون، وعدم التطرق لأي كود خادم خارج النطاق.
      </p>
    </div>
  </div>

  <!-- 2. Verified vs Official Sources -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. مراجعة الأداة ومتطلباتها مقابل المصادر الرسمية</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      التزاماً بمعايير القبول ومراجعة الأوامر مقابل المصادر الرسمية:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>المصدر الرسمي المعتمد:</strong> <a href="https://github.com/github/spec-kit" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline font-mono">https://github.com/github/spec-kit</a></li>
      <li><strong>الأداة الرسمية:</strong> <code>specify-cli</code> المطورة من GitHub.</li>
      <li><strong>المتطلبات التقنية:</strong> Python وبيئة إدارة الحزم السريعة <code>uv</code> وفق الدليل الرسمي لـ GitHub.</li>
      <li><strong>حالة التحقق:</strong> <span class="rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 text-xs font-bold">مُراجع ومطابق للمستودع الرسمي (Verified against official repo)</span></li>
    </ul>

    <!-- Warning about Pre-init commit -->
    <div class="callout warning my-4">
      <div class="callout-header">
        <span class="callout-icon">⚠️</span>
        <span>تحذير إلزامي: احفظ عملك بنسخة Git Commit قبل التهيئة!</span>
      </div>
      <p class="leading-7">
        قبل تشغيل أمر تهيئة <code>specify init</code> في مشروعك القائم، يجب عليك إجراء <code>git commit</code> نظيف لحفظ كافة ملفات المشروع. هذا يضمن حماية ملفاتك القائمة من الكتابة غير المقصودة فوقها، ويتيح لك مراجعة أي ملفات جديدة تضيفها أداة التهيئة عبر <code>git status</code>.
      </p>
    </div>

    <!-- Code Snippet: Spec Kit Installation & Setup -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">أوامر التثبيت والتهيئة الرسمية (Official Spec Kit CLI)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الأوامر';},2000);})" aria-label="نسخ الأوامر">نسخ الأوامر</button>
      </div>
      <pre class="code-content"><code># 1. تثبيت أداة specify-cli الرسمية عبر uv
uv tool install specify-cli

# 2. التأكد من إصدار الأداة وتثبيتها بنجاح
specify version

# 3. مثال تكامل Antigravity؛ تحقق من specify init --help ودليل الإصدار أولًا
specify init --here --integration agy

# لمستخدمي Windows PowerShell يمكن إضافة خيار السكربت:
# specify init --here --integration agy --script ps</code></pre>
    </div>
  </div>

  <!-- 3. Spec Kit Lifecycle & Slash Commands -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. دورة حياة تطوير الميزات بـ Slash Commands</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      تُدار كل ميزة في مسار الفرونت إند عبر سلسلة أوامر <strong>Slash Commands</strong> متتالية داخل محادثة وكيل البرمجة.
      <strong class="text-red-500">تنبيه هام:</strong> شغّل كل أمر بشكل منفصل وتأكد من اكتمال مخرجه، ولا ترسل جميع الأوامر دفعة واحدة كأنها أمر طرفية مجمع!
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>الأمر التدريجي</th>
            <th>المرحلة الهندسية</th>
            <th>ماذا يطلب من الوكيل؟</th>
            <th>المخرج التوثيقي الناتج</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/speckit-constitution</code></td>
            <td>دستور المشروع</td>
            <td>تثبيت قواعد الفرونت إند الصارمة (TypeScript, Tailwind, A11y, Mock Data)</td>
            <td><code>docs/rules/frontend.md</code></td>
          </tr>
          <tr>
            <td><code>/speckit-specify</code></td>
            <td>تخصيص الميزة</td>
            <td>تحديد أهداف وسلوكيات وحالات ميزة واحدة فقط، مع عزل أي عمل خارج النطاق</td>
            <td><code>specs/001-equipment/spec.md</code></td>
          </tr>
          <tr>
            <td><code>/speckit-clarify</code></td>
            <td>توضيح الغموض</td>
            <td>استخراج أي نقاط غامضة وحسمها بالرجوع لـ PRD وDESIGN.md دون تخمين</td>
            <td>تحديث <code>spec.md</code> وحسم الأسئلة</td>
          </tr>
          <tr>
            <td><code>/speckit-plan</code></td>
            <td>التخطيط الفني للميزة</td>
            <td>تخطيط المسارات، وهياكل المكونات، وعقود البيانات التمثيلية للميزة</td>
            <td><code>specs/001-equipment/plan.md</code></td>
          </tr>
          <tr>
            <td><code>/speckit-tasks</code></td>
            <td>تفكيك المهام</td>
            <td>تقسيم الميزة إلى مهام ذرية صغيرة مرتبة حسب الاعتماديات ومعايير القبول</td>
            <td><code>specs/001-equipment/tasks.md</code></td>
          </tr>
          <tr>
            <td><code>/speckit-analyze</code></td>
            <td>تحليل الاتساق</td>
            <td>مقارنة المواصفة مع الخطة والمهام ورصد أي تعارض وإصلاحه قبل الكود</td>
            <td>تقرير اتساق الوثائق واعتماد البدء</td>
          </tr>
          <tr>
            <td><code>/speckit-implement</code></td>
            <td>التنفيذ التدريجي</td>
            <td>تنفيذ مهمة واحدة فقط من tasks.md والتوقف الفوري لإجراء الفحص</td>
            <td>كود المكون واجتياز الفحص</td>
          </tr>
          <tr>
            <td><code>/speckit-converge</code></td>
            <td>مطابقة الإغلاق</td>
            <td>مقارنة المنجز النهائي بالمواصفة ورصد أي فجوات دون تزييف النتائج</td>
            <td>تقرير الإغلاق النهائي للميزة</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Visual Diagram: Spec Kit Lifecycle Flow -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (16): حلقة التطوير القائم على المواصفات بـ GitHub Spec Kit</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 240" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط دورة عمل Spec Kit">
          <!-- Flow boxes -->
          <rect x="15" y="40" width="105" height="150" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="67" y="70" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Constitution</text>
          <text x="67" y="105" fill="#94a3b8" font-size="10" text-anchor="middle">قواعد الكود</text>
          <text x="67" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">docs/rules/</text>
          <text x="67" y="165" fill="#34d399" font-size="9" text-anchor="middle">تثبيت الدستور</text>

          <line x1="120" y1="115" x2="135" y2="115" stroke="#3b82f6" stroke-width="2"/>

          <rect x="135" y="40" width="95" height="150" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="182" y="70" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Specify</text>
          <text x="182" y="105" fill="#94a3b8" font-size="10" text-anchor="middle">مواصفة الميزة</text>
          <text x="182" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">نطاق معزول</text>
          <text x="182" y="165" fill="#34d399" font-size="9" text-anchor="middle">عزل النطاق</text>

          <line x1="230" y1="115" x2="245" y2="115" stroke="#3b82f6" stroke-width="2"/>

          <rect x="245" y="40" width="95" height="150" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="292" y="70" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Clarify</text>
          <text x="292" y="105" fill="#94a3b8" font-size="10" text-anchor="middle">حسم الغموض</text>
          <text x="292" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">منع التخمين</text>
          <text x="292" y="165" fill="#34d399" font-size="9" text-anchor="middle">إغلاق الأسئلة</text>

          <line x1="340" y1="115" x2="355" y2="115" stroke="#f59e0b" stroke-width="2"/>

          <rect x="355" y="40" width="95" height="150" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="402" y="70" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Plan</text>
          <text x="402" y="105" fill="#94a3b8" font-size="10" text-anchor="middle">الخطة الفنية</text>
          <text x="402" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">Next.js + UI</text>
          <text x="402" y="165" fill="#34d399" font-size="9" text-anchor="middle">هيكل المكونات</text>

          <line x1="450" y1="115" x2="465" y2="115" stroke="#10b981" stroke-width="2"/>

          <rect x="465" y="40" width="95" height="150" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="512" y="70" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tasks</text>
          <text x="512" y="105" fill="#94a3b8" font-size="10" text-anchor="middle">المهام الذرية</text>
          <text x="512" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">معايير القبول</text>
          <text x="512" y="165" fill="#34d399" font-size="9" text-anchor="middle">ترتيب الاعتماديات</text>

          <line x1="560" y1="115" x2="575" y2="115" stroke="#10b981" stroke-width="2"/>

          <rect x="575" y="40" width="95" height="150" rx="6" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
          <text x="622" y="70" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">Analyze</text>
          <text x="622" y="105" fill="#94a3b8" font-size="10" text-anchor="middle">فحص الاتساق</text>
          <text x="622" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">كشف التعارض</text>
          <text x="622" y="165" fill="#34d399" font-size="9" text-anchor="middle">قبل أي كود!</text>

          <line x1="670" y1="115" x2="685" y2="115" stroke="#ec4899" stroke-width="2"/>

          <rect x="685" y="40" width="100" height="150" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
          <text x="735" y="70" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Implement</text>
          <text x="735" y="105" fill="#cbd5e1" font-size="10" text-anchor="middle">مهمة تلو مهمة</text>
          <text x="735" y="135" fill="#34d399" font-size="10" text-anchor="middle">فحص التغيير</text>
          <text x="735" y="165" fill="#fbbf24" font-size="9" text-anchor="middle">توقف وتحقق</text>
        </svg>
      </div>
    </div>
  </div>

  <!-- 4. Prompts and Templates -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. برومبتات دستور المشروع وإدارة الميزات بـ Spec Kit</h3>

    <!-- PROMPT 27 -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 27 — Spec Kit Constitution</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>/speckit-constitution
Establish project rules for FRONTEND ONLY:
follow approved PRD, Stitch references and DESIGN.md;
use Next.js App Router + TypeScript + Tailwind CSS;
reuse components, maintain responsiveness, accessibility and semantic HTML;
use typed mock data until APIs exist; avoid unnecessary dependencies;
never implement out-of-scope backend features; verify every change.
Use UI/UX Pro Max for relevant design work.</code></pre>
    </div>

    <!-- PROMPT 28 -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 28 — Spec Kit per Feature (Step-by-Step Commands)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code># الخطوة 1: تخصيص الميزة
/speckit-specify
Read the current FEATURE_BRIEF, PRD, screens and DESIGN.md.
Specify ONLY this frontend feature: user goals, UI behavior,
validation, navigation, states and testable acceptance criteria.
Explicitly exclude unrelated phases and backend work.

# الخطوة 2: حسم الغموض
/speckit-clarify
Identify genuine ambiguity in this feature specification.
Use approved documents to resolve known facts; ask about undecided ones.
Do not silently invent requirements.

# الخطوة 3: التخطيط الفني للميزة
/speckit-plan
Create the technical plan for the current frontend feature only.
Use Next.js App Router, TypeScript and Tailwind; reuse components and
DESIGN.md. Cover routes, component structure, mock data, states, tests,
responsiveness and accessibility. Do not implement code yet.

# الخطوة 4: تقسيم المهام
/speckit-tasks
Break the current feature into small dependency-ordered, verifiable tasks.
Reference acceptance criteria and existing shared components.

# الخطوة 5: تحليل الاتساق
/speckit-analyze
Check consistency between specification, implementation plan and tasks.
Report and fix documentation conflicts before starting code.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * TOPIC 37: FRONTEND IMPLEMENTATION (تنفيذ الواجهة الأمامية والبيانات التمثيلية)
 * Sequence Position: 37
 * ========================================================================= */
export const topic37FrontendImplementationHtml = `
<section id="topic-37-frontend-implementation" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 37 · تنفيذ الفرونت إند</span>
    <span class="step-pill">حلقة التنفيذ وفحص التغيير وحفظ العمل</span>
  </div>

  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">التنفيذ التدريجي للفرونت إند وحالات الواجهة</h2>
      <div class="step-subtitle">بناء الواجهة مهمة تلو الأخرى، إدارة البيانات التمثيلية، وحلقة فحص التغيير وحفظ العمل</div>
    </div>
  </div>

  <!-- 1. Incremental Implementation & Stop-and-Verify -->
  <div class="content-block">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">1. مبدأ التنفيذ التدريجي والتوقف الذكي (Stop & Verify)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      السر الفارق بين مهندس البرمجيات المحترف ومستخدم الذكاء الاصطناعي الهاوي هو <strong>«التنفيذ التدريجي المنضبط»</strong>. عند الوصول إلى مرحلة كتابة الكود، لا تطلب من الوكيل بناء تطبيق كامل، ولا حتى صفحة كاملة. بل تختار المهمة التالية الجاهزة في <code>FRONTEND_TASKS.md</code> أو <code>specs/.../tasks.md</code>، وتوجه الوكيل لتنفيذ تلك المهمة الذرية حصراً، وتلزمه بالتوقف الفوري بمجرد إنجازها.
    </p>

    <div class="callout tip my-6">
      <div class="callout-header">
        <span class="callout-icon">🛑</span>
        <span>أمر التوقف الإلزامي (The STOP Directive)</span>
      </div>
      <p class="leading-7">
        تتضمن جميع برومبتات التنفيذ في مسارنا عبارة صريحة: <em>«After changes run checks, list changed files, verify acceptance criteria, and STOP.»</em> هذا التوقف الإلزامي يتيح لك مراجعة الكود، وتشغيل الفحص، والتأكد من مطابقة التصميم قبل أن يشرع الوكيل في الخطوة التالية.
      </p>
    </div>
  </div>

  <!-- 2. Representative Data & Frontend-Only Boundary -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">2. البيانات التمثيلية الصريحة وحدود الفرونت إند (Frontend-Only Boundary)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      نؤكد مجدداً على القاعدة الهندسية الصارمة: <strong>الواجهة في هذه المرحلة تعمل ببيانات تمثيلية صريحة (Mock Data) دون ادعاء وجود خادم حقيقي أو ربط فعلي</strong>:
    </p>
    <ul class="list-disc list-inside space-y-2 text-sm sm:text-base leading-7 text-[var(--text-muted)] pr-4">
      <li><strong>عزل مجلد البيانات التمثيلية:</strong> توضع كافة ملفات الـ Mock Data في مجلد صريح مثل <code>src/data/mock/</code> ويسمى الملف بوضوح مثل <code>equipmentMock.ts</code> أو <code>mockLoans.ts</code>.</li>
      <li><strong>مطابقة العقود المكتوبة (Typed Contracts):</strong> تشتق البيانات التمثيلية من نفس الـ Interfaces المصاغة في <code>src/types/</code> والمطابقة لـ ERD، مما يتيح استبدالها بدوال جلب البيانات الحقيقية (fetch) في الموضوع 45 دون تعديل أي مكون.</li>
      <li><strong>حظر ادعاء وجود مصادقة حقيقية (No False Integration):</strong> يُحظر إنشاء جداول مستخدمين أو تشفير كلمات مرور أو حفظ جلسات في هذه المرحلة. يتم استخدام محوّل أدوار تمثيلي (Mock Role Switcher) في شريط التنقل للتبديل السريع بين تجربة "الطالب" وتجربة "مسؤول المعمل".</li>
    </ul>

    <!-- Code Snippet: Explicit Mock Data -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">src/data/mock/equipmentMock.ts (Explicit Typed Mock Data)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ الكود';},2000);})" aria-label="نسخ الكود">نسخ الكود</button>
      </div>
       <pre class="code-content"><code>import { Equipment, Category } from '@/src/types/project';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-01', name: 'الكاميرات والتصوير', slug: 'cameras', description: 'بيانات عرض تجريبية', iconName: 'Camera' },
  { id: 'cat-02', name: 'أجهزة القياس والمعامل', slug: 'lab-tools', description: 'بيانات عرض تجريبية', iconName: 'Cpu' },
  { id: 'cat-03', name: 'الحواسيب المتخصصة', slug: 'workstations', description: 'بيانات عرض تجريبية', iconName: 'Laptop' },
];

/**
 * بيانات تمثيلية صريحة (Mock Data Placeholder)
 * عينة واجهة وفق Equipment من الموضوع 30؛ ليست سجلًا حقيقيًا أو ERD منفذًا
 * تُستخدم لاختبار الواجهة قبل بناء الخادم وقاعدة البيانات
 */
export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-101',
    name: 'كاميرا سينمائية Sony FX3',
    serialNumber: 'SN-FX3-9941',
    categoryId: 'cat-01',
    status: 'available',
    description: 'كاميرا سينمائية كاملة الإطار مخصصة لمشاريع التخرج والإنتاج الإعلامي.',
    specifications: { 'الدقة': '4K 120fps', 'الحساس': 'Full Frame BSI-CMOS', 'الوزن': '715g' },
    imageUrl: '/images/mock/fx3.jpg',
    model: 'Sony FX3',
    totalQuantity: 1,
    availableQuantity: 1,
  },
  {
    id: 'eq-102',
    name: 'راسم إشارة رقمي Rigol DS1054Z',
    serialNumber: 'SN-RGL-4412',
    categoryId: 'cat-02',
    status: 'borrowed',
    description: 'جهاز راسم إشارة 4 قنوات لقياس وتصحيح الدوائر الإلكترونية المتقدمة.',
    specifications: { 'النطاق الترددي': '50 MHz', 'القنوات': '4 Channels', 'معدل العينة': '1 GSa/s' },
    imageUrl: '/images/mock/oscilloscope.jpg',
    model: 'Rigol DS1054Z',
    totalQuantity: 1,
    availableQuantity: 0,
  },
  {
    id: 'eq-103',
    name: 'محطة عمل متنقلة Dell Precision 7760',
    serialNumber: 'SN-DLL-8819',
    categoryId: 'cat-03',
    status: 'maintenance',
    description: 'حاسوب محمول بمعالج Xeon وذاكرة 64GB مخصص لمحاكاة الذكاء الاصطناعي.',
    specifications: { 'المعالج': 'Intel Xeon W-11955M', 'الرام': '64GB ECC', 'الكرت': 'RTX A5000' },
    imageUrl: '/images/mock/precision.jpg',
    model: 'Dell Precision 7760',
    totalQuantity: 1,
    availableQuantity: 0,
  },
];</code></pre>
    </div>
  </div>

    <p class="leading-7 text-[var(--text-muted)]">البيانات السابقة أمثلة عرض محلية وفق عقد Equipment في الموضوع 30 وليست قاعدة بيانات منفذة. الصور والمسارات مثال ويجب توفير ملفاتها الفعلية أو بديل ظاهر؛ لا تدّع توفرها. لم نضف موافقة مشرف أو مدة مختلفة لكل معدة. في BorrowHub مدة الاستعارة المعتمدة عشرة أيام؛ طابق أي سلوك مع PRD قبل التنفيذ.</p>
    <!-- 3. Four Mandatory UI States -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">3. حالات الواجهة الأربع الإلزامية (The Four Mandatory UI States)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      التطبيق الاحترافي لا يعرض فقط "حالة النجاح" (Success State)؛ بل يعالج بدقة متناهية الحالات الأربع الأساسية لأي شاشة:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="h-3 w-3 rounded-full bg-blue-500"></span>
          <h4 class="font-bold text-[var(--text-main)]">1. حالة التحميل (Loading / Skeleton State)</h4>
        </div>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          استخدام واجهات الهيكل العظمي (Skeleton Loaders) في <code>loading.tsx</code> بدل شاشات الدوران التقليدية (Spinners). تمنع هذه الواجهات القفزات البصرية الفجائية (Layout Shifts) وتمنح المستخدم إحساساً فورياً بسرعة الاستجابة.
        </p>
      </div>

      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="h-3 w-3 rounded-full bg-emerald-500"></span>
          <h4 class="font-bold text-[var(--text-main)]">2. حالة النجاح وتوفر البيانات (Success / Populated)</h4>
        </div>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          عرض قائمة المعدات أو تفاصيل الطلب بشكل متكامل ومتسق مع توكنز <code>DESIGN.md</code>، مع دعم كافة شارات الحالة (متاح، محجوز، معار، تحت الصيانة) بوضوح بصري تام.
        </p>
      </div>

      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="h-3 w-3 rounded-full bg-amber-500"></span>
          <h4 class="font-bold text-[var(--text-main)]">3. حالة الفراغ (Empty State)</h4>
        </div>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          عندما لا توجد بيانات (مثلاً: لا توجد نتائج تطابق بحث الطالب، أو لم يقدم الطالب أي طلبات بعد)، تُعرض واجهة ودودة توضح سبب الفراغ وتقدم إجراءً واضحاً (مثل زر "إعادة ضبط التصفية" أو "تصفح الكتالوج").
        </p>
      </div>

      <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="h-3 w-3 rounded-full bg-rose-500"></span>
          <h4 class="font-bold text-[var(--text-main)]">4. حالة الخطأ (Error Boundary State)</h4>
        </div>
        <p class="text-xs text-[var(--text-muted)] leading-6">
          معالجة استثناءات العرض في <code>error.tsx</code>، وعرض رسالة خطأ إنسانية مفهومة مع زر "إعادة المحاولة" (Try Again)، مما يضمن بقاء باقي أجزاء الصفحة وشريط التنقل يعمل بسلاسة دون انهيار التطبيق.
        </p>
      </div>
    </div>
  </div>

  <!-- 4. The Strict Execution Loop -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">4. حلقة التنفيذ الهندسية الصارمة (The Execution Loop)</h3>
    <p class="leading-8 text-[var(--text-muted)]">
      لكل مهمة ذرية ينجزها الوكيل، يتبع الطالب دورة العمل الهندسية الثلاثية دون استثناء:
    </p>

    <div class="table-container my-4">
      <table class="data-table">
        <thead>
          <tr>
            <th>المرحلة</th>
            <th>الإجراء الهندسي الدقيق</th>
            <th>الأمر أو الأداة المستخدمة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. فحص التغيير (Check Change)</strong></td>
            <td>تشغيل فحص الأنواع الثابت وبناء المشروع للتأكد من خلو الكود من الأخطاء، ثم فحص التجاوب على المتصفح</td>
            <td><code>npx tsc --noEmit && npm run build</code> وفحص عروض 390px و768px</td>
          </tr>
          <tr>
            <td><strong>2. الرجوع للمتطلبات والتصميم (Return to Specs)</strong></td>
            <td>مقارنة المخرج الناتج مع <code>docs/PRD.md</code> للتأكد من الوظيفة، ومع <code>DESIGN.md</code> ومراجع Stitch للتأكد من الهوية البصرية وعدم تجاوز النطاق</td>
            <td>مطابقة بصرية ووظيفية صارمة مع وثائق المشروع المعتمدة</td>
          </tr>
          <tr>
            <td><strong>3. حفظ العمل في Git (Save Work)</strong></td>
            <td>مراجعة الملفات المعدلة بدقة عبر <code>git status</code>، وإضافة الملفات المنجزة، وتسجيل Commit وصفي نظيف يوثق إنجاز المهمة</td>
            <td><code>git status</code> ثم <code>git add [files]</code> ثم <code>git commit -m "feat: ..."</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Visual Diagram: The Strict Execution Loop -->
    <div class="diagram-box my-6">
      <h4 class="font-bold text-[var(--text-main)] mb-3">الشكل (17): حلقة التنفيذ البرمجية (فحص التغيير &larr; مراجعة المتطلبات والتصميم &larr; حفظ العمل)</h4>
      <div style="text-align: center; overflow-x: auto; padding: 1rem 0;">
        <svg viewBox="0 0 800 260" style="width: 100%; height: auto; max-width: 800px; background: #0f172a; border-radius: 8px; font-family: Cairo, system-ui, sans-serif;" role="img" aria-label="مخطط حلقة التنفيذ البرمجية">
          <!-- Step 1: Implement Atomic Task -->
          <rect x="30" y="45" width="210" height="170" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="135" y="75" fill="#60a5fa" font-size="13" font-weight="bold" text-anchor="middle">1. تنفيذ المهمة وتوقف الوكيل</text>
          <text x="135" y="110" fill="#cbd5e1" font-size="11" text-anchor="middle">/speckit-implement</text>
          <text x="135" y="140" fill="#94a3b8" font-size="11" text-anchor="middle">تعديل ملف أو ملفين حصراً</text>
          <text x="135" y="170" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">STOP Directive</text>

          <!-- Arrow 1 -->
          <line x1="240" y1="130" x2="280" y2="130" stroke="#3b82f6" stroke-width="2"/>

          <!-- Step 2: Check Change & Return to Specs -->
          <rect x="280" y="45" width="230" height="170" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="395" y="75" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">2. فحص التغيير والمراجعة</text>
          <text x="395" y="105" fill="#34d399" font-size="11" text-anchor="middle">tsc --noEmit && npm run build</text>
          <text x="395" y="135" fill="#cbd5e1" font-size="11" text-anchor="middle">مقارنة مع PRD وDESIGN.md</text>
          <text x="395" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">فحص التجاوب (390, 768, 1440px)</text>
          <text x="395" y="195" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">UI/UX Pro Max Checklist</text>

          <!-- Arrow 2 -->
          <line x1="510" y1="130" x2="550" y2="130" stroke="#f59e0b" stroke-width="2"/>

          <!-- Step 3: Save Work in Git -->
          <rect x="550" y="45" width="220" height="170" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="660" y="75" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">3. حفظ العمل في Git</text>
          <text x="660" y="110" fill="#cbd5e1" font-size="11" text-anchor="middle">git status & diff</text>
          <text x="660" y="140" fill="#94a3b8" font-size="11" text-anchor="middle">git add [specific files]</text>
          <text x="660" y="170" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">git commit -m "feat: ..."</text>
          <text x="660" y="195" fill="#a78bfa" font-size="9" text-anchor="middle">جاهز للمهمة التالية!</text>
        </svg>
      </div>
    </div>
  </div>

  <!-- 5. Prompts and Commands Section -->
  <div class="content-block mt-8">
    <h3 class="text-xl font-black text-[var(--text-main)] mb-3">5. برومبتات التنفيذ والتدقيق النهائي وتسليم GitHub</h3>

    <!-- PROMPT 28 Implement -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 28 — speckit-implement (Execute One Task Only)</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>/speckit-implement
Implement ONLY the next pending task from tasks.md.
Read DESIGN.md and approved Stitch reference first. Use UI/UX Pro Max
for relevant layout/interaction work. Reuse code. After changes run checks,
list changed files, verify acceptance criteria, and STOP.</code></pre>
    </div>

    <!-- PROMPT 29 Final Frontend QA -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 29 — Final Frontend QA</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Frontend QA and Accessibility Auditor.
Verify all screens, routes, role-based navigation, forms, mock interactions,
loading/empty/error states, design fidelity and responsiveness at 390,
768, 1024, 1366 and 1440 px. Compare against PRD, UX Blueprint,
SCREEN_INVENTORY, DESIGN.md and Stitch references.
Run only available checks, e.g. TypeScript, lint, build, and browser tests.
Report actual Passed / Failed / Not Run results.
Save docs/FINAL_FRONTEND_QA.md. Do not claim tests passed unless executed.
Do not build backend.</code></pre>
    </div>

    <!-- PROMPT 30 GitHub Handoff -->
    <div class="code-container my-4" dir="ltr">
      <div class="code-header">
        <span class="code-lang">PROMPT 30 — GitHub Handoff</span>
        <button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ البرومبت';},2000);})" aria-label="نسخ البرومبت">نسخ البرومبت</button>
      </div>
      <pre class="code-content"><code>Act as a Senior Developer preparing a reviewable frontend delivery.
Check git status, changed files, secrets and the final QA report.
Propose a clear commit plan and Pull Request summary covering scope,
screens, tests, limitations, out-of-scope backend work and next steps.
Do not expose keys. Request approval before pushing or opening a PR.</code></pre>
    </div>
  </div>
</section>
`;

/* =========================================================================
 * ASSEMBLED WAVE 2 ENTRIES FOR TICKET 12 (POSITIONS 34, 35, 36, 37)
 * ========================================================================= */
export const t12Entries: TopicItem[] = [
  {
    id: 'frontend-architecture-planning',
    number: '34',
    slug: 'frontend-architecture-planning',
    title: 'تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)',
    subtitle: 'تفكيك الواجهة إلى مسارات ومكونات وعقود بيانات ومهام ذرية صغيرة قابلة للتحقق',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'تخطيط الفرونت إند',
    summary: 'تحويل متطلبات PRD وتصميمات Stitch ومراجع الشاشات إلى خطة معمارية محكمة للفرونت إند قبل كتابة سطر كود واحد. تفكيك التطبيق إلى شجرة مسارات (Next.js App Router)، ومخطط هرمية المكونات (UI Primitives vs Feature Modules)، وعقود بيانات مكتوبة بدقة (TypeScript Data Contracts)، وجدولة المهام الذرية الصغيرة (Small Verifiable Tasks) مع تحديد المدخلات والمخرجات ومعايير القبول وأوامر التحقق لكل مهمة، مع عزل حدود الفرونت إند وتجنب التورط في كود الخادم.',
    tags: ['Frontend Planning', 'Next.js App Router', 'Routes Map', 'Component Hierarchy', 'Data Contracts', 'Atomic Tasks', 'Small Verifiable Tasks', 'Acceptance Criteria'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 3,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic34FrontendPlanningHtml),
    htmlContent: topic34FrontendPlanningHtml,

    goal: 'إعداد خطة معمارية شاملة للواجهة الأمامية لمشروع الطالب تحدد شجرة المسارات، وهرمية المكونات، وعقود البيانات، وتقسم العمل إلى مهام برمجية صغيرة ومستقلة قابلة للتحقق الفوري مع عزل نطاق الواجهة بالكامل.',
    prerequisites: [
      'وثيقة متطلبات المنتج المعتمدة docs/PRD.md (الموضوع 03)',
      'نظام التصميم DESIGN.md ومراجع شاشات Stitch (الموضوعان 22 و29)',
      'جرد الشاشات docs/SCREEN_INVENTORY.md والنموذج التفاعلي (الموضوعان 20 و23)',
      'أساسيات Next.js وTypeScript وTailwind CSS (المواضيع 30-33)'
    ],
    steps: [
      '1. اقرأ وثائق PRD وجرد الشاشات ونظام التصميم DESIGN.md لاستيعاب كافة رحلات المستخدم وحالات الواجهة المطلوبة دون تخمين.',
      '2. صمم شجرة المسارات (Routes Map) لمشروعك وفق Next.js App Router مع تحديد الصفحات العامة والمسارات المحمية وملفات layout وloading وerror.',
      '3. خطط هرمية المكونات (Component Architecture): افصل المكونات القاعدية (UI Primitives) عن المكونات المركبة (Feature Components) وحدد بوضوح Server Components مقابل Client Components.',
      '4. حدد عقود البيانات للواجهة (Frontend Data Contracts) واكتب الأنواع (TypeScript Interfaces) لكل نموذج بيانات دون انتظار اكتمال الخادم.',
      '5. فكك مراحل التنفيذ إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks) وحدد لكل مهمة: المعرّف (ID)، المدخلات، المخرجات، ومعايير القبول (Acceptance Criteria).',
      '6. وثّق الخطة المعمارية في docs/FRONTEND_PLAN.md وجدول المهام في docs/FRONTEND_TASKS.md وخريطة المسارات في docs/ROUTES_MAP.md.'
    ],
    promptRefs: [
      'prompt-24-frontend-only-next-js-plan',
      'prompt-26-select-next-implementation-phase',
      'prompt-31-frontend-phased-implementation-plan'
    ],
    outputs: [
      'docs/FRONTEND_PLAN.md',
      'docs/FRONTEND_TASKS.md',
      'docs/ROUTES_MAP.md',
      'docs/COMPONENT_ARCHITECTURE.md',
      'docs/FRONTEND_DATA_CONTRACTS.md'
    ],
    checklist: [
      'تحديد شجرة مسارات التطبيق في docs/ROUTES_MAP.md وفق Next.js App Router.',
      'هرمية المكونات تفصل UI Primitives عن مكونات الميزات وتحدد Client vs Server.',
      'صياغة عقود بيانات واضحة ومكتوبة الأنواع (TypeScript) في docs/FRONTEND_DATA_CONTRACTS.md.',
      'تفكيك الواجهة إلى مهام ذرية صغيرة لا تتجاوز خطوة واحدة قابلة للفحص.',
      'تحديد المدخلات والاعتماديات ومعايير القبول وأمر الفحص لكل مهمة في docs/FRONTEND_TASKS.md.',
      'الالتزام الصارم بحدود الفرونت إند وعدم ادعاء تكامل مع خادم أو قاعدة بيانات حقيقية قبل ربطهما.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 34,
  },
  {
    id: 'ui-ux-pro-max-review',
    number: '35',
    slug: 'ui-ux-pro-max-review',
    title: 'مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max',
    subtitle: 'تدقيق خطة وتصميم المكونات بمعايير الجودة البصرية وإمكانية الوصول وتجاوب الشاشات قبل وبعد التنفيذ',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'مراجعة الواجهة والتجربة',
    summary: 'توظيف أداة ومهارة UI/UX Pro Max في موضع استخدامها الطبيعي قبل بدء الكود وبعد بناء المكونات، لمراجعة خطة الواجهة وتدقيق المعايير البصرية وإمكانية الوصول (Accessibility: WCAG AA) وملاءمة اللمس وتجاوب الشاشات (390px, 768px, 1024px, 1440px). شرح التثبيت من المصدر الرسمي ومراجعة الأوامر مقابل المستودع المعتمد، وتطبيق بروتوكول المراجعة خطوة بخطوة لمنع التنافر البصري وتوليد توصيات تصحيحية دقيقة دون المساس بالهوية البصرية المعتمدة في DESIGN.md.',
    tags: ['UI/UX Pro Max', 'Design Audit', 'Accessibility', 'WCAG AA', 'Responsive Design', 'Touch Targets', 'Official Sources Verification', 'Visual Polish'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 1,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic35UiUxProMaxHtml),
    htmlContent: topic35UiUxProMaxHtml,

    goal: 'إجراء تدقيق احترافي شامل لخطة وتصميم مكونات الواجهة باستخدام UI/UX Pro Max من مصدرها الرسمي، وتوثيق ملاحظات التصميم وإمكانية الوصول والتجاوب في تقرير docs/UI_UX_PRO_MAX_AUDIT.md لتوجيه مرحلة التنفيذ.',
    prerequisites: [
      'خطة الفرونت إند وجدول المهام (الموضوع 34)',
      'نظام التصميم المعتمد DESIGN.md (الموضوع 29)',
      'مراجع شاشات Stitch المعتمدة (الموضوع 29)',
      'مهارات الوكيل وكيفية استدعاء المهارات (الموضوع 26)'
    ],
    steps: [
      '1. راجع الأوامر مقابل المصادر الرسمية: افحص مستودع github.com/nextlevelbuilder/ui-ux-pro-max-skill واطلع على صيغ التثبيت المعتمدة رسميًا.',
      '2. ثبّت الأداة أو استدعِ المهارة: اختر بين التثبيت المعتمد (npm i -g ui-ux-pro-max-cli ثم uipro init --ai antigravity) أو التشغيل المباشر دون تثبيت عام (npx ui-ux-pro-max-cli init --ai antigravity).',
      '3. شغل بروتوكول مراجعة ما قبل الكود (Pre-Coding Audit): قارن مواصفات الشاشة الحالية في FRONTEND_PLAN.md مع DESIGN.md لضبط التباين والمسافات وهرمية الخطوط.',
      '4. دقق معايير إمكانية الوصول (A11y): تأكد من توافق تباين الألوان مع معايير WCAG AA (نسبة 4.5:1 على الأقل) وتوفر وسوم aria-label ومؤشرات التركيز (focus-visible).',
      '5. افحص ملاءمة الهواتف والشاشات اللمسية: تأكد من أن جميع الأزرار وعناصر النقر تحقق الحجم الأدنى للأهداف اللمسية (44×44px على الأقل).',
      '6. وثّق نتائج المراجعة والتوصيات التصحيحية في docs/UI_UX_PRO_MAX_AUDIT.md مع وسم الأوامر والمصادر بوضوح.'
    ],
    promptRefs: [
      'prompt-25-ui-ux-pro-max-review-before-coding'
    ],
    outputs: [
      'docs/UI_UX_PRO_MAX_AUDIT.md',
      'تقرير مراجعة التجاوب وإمكانية الوصول لكل شاشة'
    ],
    checklist: [
      'مراجعة أوامر التثبيت والتشغيل مقابل المستودع الرسمي (github.com/nextlevelbuilder/ui-ux-pro-max-skill).',
      'تشغيل بروتوكول المراجعة الاستباقية للمكونات قبل كتابة الكود البرمجي.',
      'التحقق من تباين النصوص والألوان وفق معيار WCAG AA (4.5:1 على الأقل).',
      'فحص أهداف اللمس (Touch Targets >= 44x44px) وتجاوب المكونات على 390px و768px.',
      'عدم تغيير الهوية البصرية المعتمدة في DESIGN.md بل ضبط الاتساق معها.',
      'توثيق مخرجات الفحص في docs/UI_UX_PRO_MAX_AUDIT.md مع تصنيف المشكلات وإجراءات التصحيح.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 35,
  },
  {
    id: 'spec-kit-workflow',
    number: '36',
    slug: 'spec-kit-workflow',
    title: 'تنظيم المواصفات وتطوير الميزات بـ Spec Kit',
    subtitle: 'منهجية التطوير القائم على المواصفات: الدستور، التخصيص، التوضيح، التخطيط، والمهام',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'منهجية المواصفات والتنفيذ',
    summary: 'اعتماد منهجية Spec Kit الرسمية (GitHub Spec Kit / specify-cli) لإدارة تطوير ميزات الفرونت إند ميزة بميزة انطلاقاً من المواصفات الصارمة. فحص الأداة من مصدرها الرسمي (github.com/github/spec-kit)، ومتطلبات Python/uv، وأوامر التهيئة (specify init --here --integration agy). تدريب الطالب على حلقة التطوير المنضبطة: الدستور الهندسي (Constitution) لمنع تجاوز الحدود، ثم التخصيص (Specify)، والتوضيح (Clarify) لمنع الهلوسة، ثم التخطيط الفني للميزة (Plan)، وتقسيم المهام (Tasks)، والتحليل الاتساقي (Analyze)، مع حفظ العمل بنسخة احتياطية أو Commit قبل التهيئة.',
    tags: ['Spec Kit', 'GitHub Spec Kit', 'specify-cli', 'Constitution', 'Specification-Driven Development', 'Slash Commands', 'Official Sources Verification', 'Feature Planning'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic36SpecKitHtml),
    htmlContent: topic36SpecKitHtml,

    goal: 'إعداد بيئة Spec Kit الرسمية وتأسيس دستور المشروع البرمجي للواجهة، وتوليد حزمة مواصفات وتخطيط ومهام تفصيلية متسقة لميزة واحدة من ميزات MVP (مثل تصفح المعدات في BorrowHub) دون كتابة كود عشوائي.',
    prerequisites: [
      'خطة الفرونت إند وهرمية المسارات (الموضوع 34)',
      'ملاحظات مراجعة UI/UX Pro Max (الموضوع 35)',
      'بيئة Python وأداة uv وفق الدليل الرسمي',
      'نسخة محفوظة (Git Commit) لمستودع المشروع قبل بدء التهيئة'
    ],
    steps: [
      '1. راجع الأداة مقابل المصدر الرسمي: تحقق من مستودع github.com/github/spec-kit وأدلة specify-cli ومتطلبات Python/uv.',
      '2. احفظ العمل الحالي: أنشئ Git commit نظيفاً للمستودع قبل تشغيل أي أمر تهيئة تجنباً للكتابة فوق ملفاتك.',
      '3. ثبّت الأداة وهيئ المشروع: شغّل uv tool install specify-cli ثم specify version ثم specify init --here --integration agy (أو إضافة --script ps لـ PowerShell).',
      '4. أنشئ دستور الفرونت إند (Constitution): صغ ملف قواعد المشروع (docs/rules/frontend.md) مانعاً استخدام any، وملزماً بتوكنز DESIGN.md، وموجهاً لمعالجة حالات Loading/Empty/Error.',
      '5. طبق دورة الميزة المحددة (Feature Loop): نفذ مرحلة التخصيص (/speckit-specify) لعزل ميزة واحدة، ثم التوضيح (/speckit-clarify) لإغلاق الفجوات دون هلوسة.',
      '6. فكك الميزة فنياً وحلل الاتساق: نفذ /speckit-plan و/speckit-tasks ثم /speckit-analyze لضمان تطابق المهام مع المواصفة قبل الانتقال للتنفيذ.'
    ],
    promptRefs: [
      'prompt-27-spec-kit-constitution',
      'prompt-28-spec-kit-per-feature'
    ],
    outputs: [
      'docs/rules/frontend.md',
      'specs/001-equipment-browsing/spec.md',
      'specs/001-equipment-browsing/plan.md',
      'specs/001-equipment-browsing/tasks.md'
    ],
    checklist: [
      'مراجعة أوامر Spec Kit مقابل المستودع الرسمي (github.com/github/spec-kit) وتأكيد متطلبات uv/python.',
      'أخذ Commit نظيف قبل التهيئة لحماية ملفات المشروع من الكتابة غير المقصودة.',
      'صياغة دستور الفرونت إند الملزم (docs/rules/frontend.md) وفق قيود TypeScript ونظام التصميم.',
      'تشغيل خطوات Spec Kit منفصلة خطوة بخطوة وعدم دمج أوامر Slash في أمر طرفية واحد.',
      'تطبيق مرحلة Clarify لمنع التخمين وحسم الأسئلة المفتوحة بالمصادر المعتمدة.',
      'إجراء مرحلة Analyze لفحص اتساق المواصفة مع الخطة والمهام قبل بدء الكود.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 36,
  },
  {
    id: 'frontend-incremental-implementation',
    number: '37',
    slug: 'frontend-incremental-implementation',
    title: 'التنفيذ التدريجي للفرونت إند وحالات الواجهة',
    subtitle: 'بناء الواجهة مهمة تلو الأخرى، إدارة البيانات التمثيلية، وحلقة فحص التغيير وحفظ العمل',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'تنفيذ الواجهة الأمامية',
    summary: 'التنفيذ العملي التدريجي لواجهة المستخدم مهمة تلو الأخرى (Task by Task) وفق خطة Spec Kit ومهام FRONTEND_TASKS.md. تطبيق حلقة التنفيذ الهندسية الصارمة: فحص التغيير البرمجي (TypeScript tsc --noEmit, build, responsive checks) → الرجوع للمتطلبات والتصميم (PRD, DESIGN.md, Stitch) → حفظ العمل في Git (commit منظم لكل مهمة). استخدام بيانات تمثيلية صريحة (Mock Data) مكتوبة الأنواع (Typed Contracts) مع التوضيح البات لحدود الفرونت إند: لا خادم حقيقي، لا قاعدة بيانات فعلية، ولا ادعاء تكامل حتى مرحلة الربط.',
    tags: ['Frontend Implementation', 'Incremental Coding', 'Mock Data', 'UI States', 'Execution Loop', 'Verification Cycle', 'Git Commit Loop', 'Frontend-Only Boundary'],
    contentTypes: ['code', 'checklist', 'prompt'],
    diagramCount: 1,
    promptCount: 3,
    codeSnippetCount: 4,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic37FrontendImplementationHtml),
    htmlContent: topic37FrontendImplementationHtml,

    goal: 'تنفيذ مهام الفرونت إند المجدولة تدريجياً وبناء مكونات الواجهة بحالاتها الكاملة (Loading, Empty, Error, Success) مع بيانات تمثيلية typed، واتباع حلقة التنفيذ الصارمة (فحص التغيير → مراجعة التصميم → حفظ العمل) لكل مهمة منجزة.',
    prerequisites: [
      'خطة ومسارات الفرونت إند (الموضوع 34)',
      'مراجعة UI/UX Pro Max (الموضوع 35)',
      'دستور ومواصفات ومهام Spec Kit (الموضوع 36)',
      'بيانات تمثيلية مطابقة لـ ERD ومكتوبة الأنواع (الموضوعان 25 و30)'
    ],
    steps: [
      '1. اختر المهمة التالية الجاهزة فقط من FRONTEND_TASKS.md التي تحققت كافة اعتمادياتها السابقة ولا تنفذ كوداً عشوائياً.',
      '2. ابنِ المكون بنظام البيانات التمثيلية (Mock Data): استهلك أنواع TypeScript المعتمدة وبيانات تمثيلية واضحة في src/data/mock/ دون ادعاء تكامل مع خادم.',
      '3. غطِّ حالات الواجهة الأربع في كل شاشة: الحالة العادية (Success)، وحالة التحميل (Loading / Skeleton)، وحالة الفراغ (Empty State)، وحالة الخطأ (Error State).',
      '4. شغّل حلقة فحص التغيير (Check Change): نفّذ npx tsc --noEmit وnpm run build وتأكد من خلو الشيفرة من أي أخطاء ومن التجاوب على كافة المقاسات.',
      '5. ارجع للمتطلبات والتصميم (Return to Specs): قارن النتيجة البصرية مع DESIGN.md ومراجع Stitch، وتأكد من عدم تجاوز نطاق المهمة المحدد في PRD.',
      '6. احفظ العمل في Git (Save Work): افحص git status، وأضف الملفات المعدلة تحديداً، وأنشئ commit وصفي للمهمة المكتملة، وكرر الدورة للمهمة التالية.'
    ],
    promptRefs: [
      'prompt-28-spec-kit-per-feature',
      'prompt-29-final-frontend-qa',
      'prompt-30-github-handoff'
    ],
    outputs: [
      'مكونات واجهة المستخدم التفاعلية (src/components/ وsrc/app/)',
      'ملف البيانات التمثيلية المكتوبة src/data/mock/ وsrc/types/',
      'docs/FRONTEND_EXECUTION_LOG.md (سجل دورة التنفيذ والتحقق)',
      'سجل Git commits منظم يوثق إنجاز كل مهمة بشكل مستقل'
    ],
    checklist: [
      'تنفيذ مهمة واحدة في كل مرة والتوقف الفوري عند اكتمال معايير قبولها.',
      'استخدام Mock Data مصرح بكونها تمثيلية مع منع ادعاء وجود API حقيقي في هذه المرحلة.',
      'تغطية الحالات الأربع للواجهة: التحميل، الفراغ، الخطأ، والنجاح لكل مكون رئيسي.',
      'فحص التغيير بأوامر الطرفية (tsc --noEmit && npm run build) وفحص Responsive.',
      'الرجوع للمتطلبات وتدقيق التطابق مع PRD وDESIGN.md ومراجع Stitch قبل الاعتماد.',
      'حفظ العمل بـ Git commit نظيف يصف المهمة بعد اجتياز الفحص وعدم مراكمة التغييرات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 37,
  },
];
