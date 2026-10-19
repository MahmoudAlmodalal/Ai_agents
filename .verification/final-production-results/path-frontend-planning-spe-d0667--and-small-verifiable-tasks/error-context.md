# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: path/frontend-planning-spec-kit.spec.ts >> Sequential Project Path - Ticket 12: Frontend Planning, UI/UX Pro Max, Spec Kit & Incremental Implementation (Slots 34-37) >> Topic 34 (Frontend Planning): Routes, components hierarchy, data contracts, and small verifiable tasks
- Location: e2e/path/frontend-planning-spec-kit.spec.ts:5:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('article')
Timeout: 7000ms
- Expected substring  -   1
+ Received string     + 382

- docs/DESIGN.md
+ خطوات التطبيق على مشروعك1اقرأ وثائق PRD وجرد الشاشات ونظام التصميم DESIGN.md لاستيعاب كافة رحلات المستخدم وحالات الواجهة المطلوبة دون تخمين.2صمم شجرة المسارات (Routes Map) لمشروعك وفق Next.js App Router مع تحديد الصفحات العامة والمسارات المحمية وملفات layout وloading وerror.3خطط هرمية المكونات (Component Architecture): افصل المكونات القاعدية (UI Primitives) عن المكونات المركبة (Feature Components) وحدد بوضوح Server Components مقابل Client Components.4حدد عقود البيانات للواجهة (Frontend Data Contracts) واكتب الأنواع (TypeScript Interfaces) لكل نموذج بيانات دون انتظار اكتمال الخادم.5فكك مراحل التنفيذ إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks) وحدد لكل مهمة: المعرّف (ID)، المدخلات، المخرجات، ومعايير القبول (Acceptance Criteria).6وثّق الخطة المعمارية في docs/FRONTEND_PLAN.md وجدول المهام في docs/FRONTEND_TASKS.md وخريطة المسارات في docs/ROUTES_MAP.md.المتطلبات السابقةوثيقة متطلبات المنتج المعتمدة docs/PRD.md (الموضوع 03)نظام التصميم DESIGN.md ومراجع شاشات Stitch (الموضوعان 22 و29)جرد الشاشات docs/SCREEN_INVENTORY.md والنموذج التفاعلي (الموضوعان 20 و23)أساسيات Next.js وTypeScript وTailwind CSS (المواضيع 30-33)
+
+   
+     الموضوع 34 · تخطيط الفرونت إند
+     المسارات والمكونات وعقود البيانات والمهام الذرية
+   
+
+   
+     
+       تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)
+       تفكيك الواجهة إلى مسارات ومكونات وعقود بيانات ومهام ذرية صغيرة قابلة للتحقق قبل كتابة الكود
+     
+   
+
+   
+   
+     1. لماذا يسبق التخطيط المعماري أي كتابة للكود البرمجي؟
+     
+       أكبر فخ يقع فيه مطورو تطبيقات الذكاء الاصطناعي هو «البرمجة الاندفاعية» (Impulsive Vibe Coding): فتح محرر الكود وتوجيه أمر عام للوكيل مثل «ابنِ لي صفحات التطبيق كاملة مع لوحة التحكم وتسجيل الدخول!». النتيجة الحتمية لهذا النهج هي انهيار نافذة السياق، وتشوه هيكل المشروع، وإنتاج كود متنافر وغير مترابط يعجز حتى أمهر المطورين عن صيانته.
+     
+     
+       في منهجيتنا الهندسية، يدخل الطالب مرحلة الفرونت إند مسلحاً بجميع المخرجات التحليلية والبصرية المعتمدة من المحطات السابقة:
+     
+     
+       وثيقة متطلبات المنتج (docs/PRD.md): المرجع التشريعي للوظائف، وقواعد العمل، وصلاحيات الأدوار.
+       جرد الشاشات (docs/SCREEN_INVENTORY.md): القائمة الحصرية لكافة الشاشات وحالاتها المستهدفة في النسخة التجريبية الأولى (MVP).
+       نظام التصميم (DESIGN.md ومراجع Stitch): المرجع البصري المعتمد لتوكنز الألوان والخطوط ومقاسات التباعد.
+       مخطط الكيانات (docs/ERD.md): الهيكل المفاهيمي للبيانات الذي ستشتق منه عقود الواجهة.
+     
+
+     
+       
+         ⚠️
+         حدود النطاق الصارمة: الواجهة الأمامية فقط (Frontend-Only Boundary)
+       
+       
+         تخطيط هذه المرحلة ينصب حصرياً على الواجهة الأمامية (Frontend Only). يُحظر تماماً كتابة كود الخادم (Backend)، أو إنشاء قواعد البيانات والـ Migrations، أو ادعاء وجود تكامل حي أو مصادقة حقيقية (Authentication) في هذه المرحلة. يتم التعامل مع كافة البيانات عبر بيانات تمثيلية صريحة (Mock Data) وعقود مكتوبة الأنواع (Typed Contracts) حتى يحين موعد بناء الخادم والربط في المحطات اللاحقة.
+       
+     
+   
+
+   
+   
+     2. شجرة المسارات وهيكلية Next.js App Router
+     
+       نعتمد هيكلية Next.js App Router المعيارية، حيث يتحول كل مجلد داخل app/ إلى مسار (Route) حقيقي في الموقع، بينما تُعرّف ملفات النظام الخاصة سلوك كل مسار:
+     
+
+     
+       
+         
+           
+             الملف المعياري
+             الوظيفة الهندسية
+             الاستخدام في مشروع الطالب
+           
+         
+         
+           
+             page.tsx
+             الواجهة الفريدة للمسار
+             عرض محتوى الشاشة المحددة من جرد الشاشات
+           
+           
+             layout.tsx
+             الغلاف المشترك المحفوظ
+             شريط التنقل (Navbar) والقائمة الجانبية (Sidebar) المشتركة
+           
+           
+             loading.tsx
+             واجهة التحميل الفورية (Suspense Boundary)
+             عرض شاشات الهيكل العظمي (Skeleton Screens) أثناء جلب البيانات
+           
+           
+             error.tsx
+             معالجة الأخطاء المعزولة (Error Boundary)
+             التقاط الأخطاء وعرض زر إعادة المحاولة دون إسقاط كامل التطبيق
+           
+           
+             not-found.tsx
+             واجهة الصفحة غير الموجودة (404)
+             توجيه المستخدم بشكل ودود عند طلب مورد أو slug غير موجود
+           
+         
+       
+     
+
+     
+       خريطة مسارات مشروع BorrowHub (docs/ROUTES_MAP.md)
+       
+         
+           
+             المسار (Route)
+             نوع الوصول
+             الوظيفة والهدف
+           
+         
+         
+           
+             /
+             عام (Public)
+             الصفحة الرئيسية واستكشاف أقسام المعدات الأكثر طلباً
+           
+           
+             /equipment
+             عام (Public)
+             كتالوج المعدات الشامل مع البحث والتصفية حسب الأقسام وحالة التوفر
+           
+           
+             /equipment/[id]
+             عام (Public)
+             تفاصيل المعدة الكاملة والمواصفات الفنية وزر تقديم طلب الاستعارة
+           
+           
+             /requests
+             محمي شكلياً (Student Role)
+             متابعة طلبات الاستعارة الحالية والسابقة وسجل الحالات للطالب
+           
+           
+             /admin/inventory
+             محمي شكلياً (Staff Role)
+             إدارة المخزون وتحديث حالات المعدات (متاحة، محجوزة، معارة، تالفة)
+           
+           
+             /admin/loans
+             محمي شكلياً (Staff Role)
+             مراجعة واعتماد طلبات الاستعارة وتسجيل التسليم والإرجاع الميداني
+           
+         
+       
+     
+   
+
+   
+   
+     3. هرمية المكونات وفصل المسؤوليات (Component Architecture)
+     
+       تنظم المكونات في ثلاث طبقات معمارية واضحة المعالم، مع الحفاظ على قاعدة ذهبية: المكونات خادمة (Server Components) افتراضياً، وتتحول إلى عميلة (Client Components) فقط عند الحاجة للتفاعل المباشر:
+     
+
+     
+       
+         1. المكونات القاعدية (UI Primitives)
+         
+           مكونات ذرية مستقلة تماماً عن مجال المشروع توضع في src/components/ui/، مثل Button، وBadge، وCard، وModal، وInput، تُبنى وفق توكنز DESIGN.md.
+         
+       
+       
+         2. مكونات الهيكل (Layout Components)
+         
+           المكونات الهيكلية المشتركة في src/components/layout/، مثل Navbar، وSidebar، وFooter، وRoleSwitcher للتبديل السريع بين أدوار المستخدمين التمثيلية.
+         
+       
+       
+         3. مكونات الميزات (Feature Modules)
+         
+           مكونات متخصصة بكيانات المشروع توضع في src/components/equipment/ وsrc/components/loans/، مثل EquipmentCard وLoanRequestModal، وترتبط مباشرة بعقود البيانات.
+         
+       
+     
+   
+
+   
+   
+     4. عقود بيانات الفرونت إند والأنواع الصارمة (TypeScript Data Contracts)
+     
+       استخدم عقود الموضوع 30 في src/types/project.ts كمصدر موحد للأنواع. المثال المختصر أدناه يشرح View Model توضيحيًا خاصًا بالواجهة، وليس بديلًا لتلك العقود أو لمخطط ERD المعتمد.
+     
+
+     
+       
+         ⚠️
+         تنبيه اتساق المصدر وقواعد BorrowHub التسع
+       
+       
+         قواعد العمل المعتمدة في BorrowHub محددة بدقة: عشرة أيام تقويمية كحد أقصى للمدة، طلبان نشطان كحد أقصى للطالب، وحدة واحدة لكل طلب، سبب الاستعارة إلزامي، اعتماد يدوي لحساب الطالب، تأكيد مادي للاستلام والإرجاع بواسطة مسؤول المعمل (Staff)، مهلة استلام 48 ساعة تبدأ من تاريخ بداية الطلب خاضعة لتعريف PRD، وانعدام الغرامات المالية أو الحظر التلقائي.
+       
+       
+         عقود الموضوع 30 الأساسية تعتمد المعرّف userId وحالة active؛ بينما يستخدم نموذج العرض التوضيحي أدناه studentId وحالة collected كعينة لمتطلبات الواجهة المحلية، مما يتطلب مواءمتها عبر Adapter بدلاً من التعديل الصامت أو افتراض مدد متغيرة (مثل 7 أو 14 يوماً) غير معتمدة.
+       
+     
+
+     
+     
+       
+         src/types/equipment.ts (Illustrative UI View Models)
+         نسخ الكود
+       
+       // Illustrative view models only; canonical domain types remain in topic 30 (src/types/project.ts).
+ // Note field naming difference: UI model uses studentId/collected; canonical domain uses userId/active.
+ // BorrowHub loan duration rule is fixed at 10 calendar days max; do not invent arbitrary 7/14 day rules.
+ export type EquipmentStatus = 'available' | 'reserved' | 'borrowed' | 'damaged' | 'maintenance';
+
+ export interface Category {
+   id: string;
+   name: string;
+   slug: string;
+   iconName?: string;
+ }
+
+ export interface EquipmentViewModel {
+   id: string;
+   name: string;
+   serialNumber: string;
+   categoryId: string;
+   category?: Category;
+   status: EquipmentStatus;
+   description: string;
+   specifications: Record<string, string>;
+   imageUrl: string;
+   location: string;
+   requiresSupervisorApproval: boolean;
+   maxBorrowDays: number;
+ }
+
+ export interface LoanRequestViewModel {
+   id: string;
+   equipmentId: string;
+   equipment?: EquipmentViewModel;
+   studentId: string;
+   studentName: string;
+   studentEmail: string;
+   status: 'pending' | 'approved' | 'rejected' | 'collected' | 'returned' | 'overdue';
+   startDate: string;
+   expectedReturnDate: string;
+   actualReturnDate?: string;
+   purpose: string;
+   supervisorNotes?: string;
+   createdAt: string;
+ }
+     
+   
+
+   
+   
+     5. استراتيجية التفكيك إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks)
+     
+       الركيزة الجوهرية لمنهجية سلاح العصر هي «المهام الذرية الصغيرة القابلة للتحقق الفوري». لا يُكلف الوكيل ببناء صفحة كاملة أو ميزة مجمعة، بل يتم تقسيم خطة التنفيذ إلى مهام لا تتجاوز الواحدة منها تعديل ملف أو ملفين، مع تحديد الشروط التالية لكل مهمة:
+     
+
+     
+       
+         
+           
+             عنصر المهمة
+             المقصود به
+             مثال من مهمة بناء بطاقة المعدة (TASK-FE-03)
+           
+         
+         
+           
+             المعرّف (Task ID)
+             رمز فريد يحدد ترتيب المهمة
+             TASK-FE-03
+           
+           
+             النطاق المحدد (Scope)
+             الملفات التي سيتم إنشاؤها أو تعديلها حصراً
+             إنشاء src/components/equipment/EquipmentCard.tsx فقط
+           
+           
+             المدخلات المرجعية (Inputs)
+             المستندات والتصميمات التي يقرأ منها الوكيل
+             DESIGN.md، ومرجع Stitch لشاشة الكتالوج، وsrc/types/equipment.ts
+           
+           
+             المخرج المتوقع (Output)
+             المكون أو الواجهة المنتجة
+             مكون بطاقة المعدة التفاعلي يدعم كافة حالات التوفر
+           
+           
+             الاعتماديات السابقة (Dependencies)
+             المهام التي يجب اكتمالها قبل بدء هذه المهمة
+             TASK-FE-01 (المكونات القاعدية) وTASK-FE-02 (عقود البيانات)
+           
+           
+             معايير القبول (Acceptance Criteria)
+             شروط إغلاق المهمة وقبول العمل
+             تطبيق شارات التوفر، دعم زر الحجز للمعدات المتاحة، ودعم التجاوب ≥ 44px لمس
+           
+           
+             أمر التحقق الفوري (Verification)
+             أمر طرفية سريع يتأكد من سلامة الشيفرة
+             npx tsc --noEmit && npm run build
+           
+         
+       
+     
+
+     
+     
+       الشكل (14): دورة التخطيط المعماري للفرونت إند من المتطلبات إلى المهام الذرية
+       
+         
+           
+           
+           المراجع المعتمدة
+           docs/PRD.md
+           docs/SCREEN_INVENTORY.md
+           DESIGN.md
+           مراجع Stitch
+           docs/ERD.md
+
+           
+           
+
+           
+           
+           المسارات والمكونات
+           Next.js App Router
+           docs/ROUTES_MAP.md
+           هرمية المكونات
+           UI Primitives vs Features
+           Server vs Client
+
+           
+           
+
+           
+           
+           عقود البيانات والأنواع
+           TypeScript Interfaces
+           مطابقة لـ ERD
+           Mock Data Schemas
+           جاهزة للاستبدال لاحقاً
+           لا خادم ولا قاعدة حالياً
+
+           
+           
+
+           
+           
+           المهام الذرية
+           docs/FRONTEND_TASKS.md
+           Task ID + Inputs
+           Acceptance Criteria
+           أمر الفحص الفوري
+           مهمة واحدة في كل مرة
+         
+       
+     
+   
+
+   
+   
+     6. برومبتات التخطيط المعماري المعتمدة
+
+     
+     
+       
+         PROMPT 24 — Frontend-Only Next.js Plan
+         نسخ البرومبت
+       
+       Act as a Senior Next.js Frontend Architect.
+ Read PRD, SCREEN_INVENTORY, UX_BLUEPRINT, DESIGN.md and Stitch references.
+ Plan only the frontend: Next.js App Router, React, TypeScript, Tailwind CSS.
+ Create route hierarchy, layouts, shared components, feature modules,
+ typed mock data, data contracts, user interactions and UI states.
+ Divide implementation into small dependency-ordered PHASES and TASKS.
+ For every task define ID, exact scope, inputs, expected output, dependencies,
+ acceptance criteria and verification method. Map every MVP screen to a phase.
+ Do not code yet, and do not implement backend, database or real authentication.
+ Create docs/FRONTEND_PLAN.md, docs/FRONTEND_TASKS.md,
+ docs/ROUTES_MAP.md, docs/COMPONENT_ARCHITECTURE.md,
+ docs/FRONTEND_DATA_CONTRACTS.md.
+     
+
+     
+     
+       
+         PROMPT 26 — Select Next Implementation Phase
+         نسخ البرومبت
+       
+       Act as a Senior Frontend Tech Lead.
+ Read FRONTEND_PLAN.md, FRONTEND_TASKS.md and actual repository state.
+ Choose the next uncompleted phase whose dependencies are satisfied.
+ Create a FEATURE_BRIEF with exact scope, screens, inputs, dependencies,
+ deliverables and acceptance criteria. Do not implement anything yet.
+     
+   
+
+

Call log:
  - Expect "toContainText" locator('article') with timeout 7000ms
  - waiting for locator('article')
    17 × locator resolved to <article class="content-area rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-8 space-y-6">…</article>
       - unexpected value "خطوات التطبيق على مشروعك1اقرأ وثائق PRD وجرد الشاشات ونظام التصميم DESIGN.md لاستيعاب كافة رحلات المستخدم وحالات الواجهة المطلوبة دون تخمين.2صمم شجرة المسارات (Routes Map) لمشروعك وفق Next.js App Router مع تحديد الصفحات العامة والمسارات المحمية وملفات layout وloading وerror.3خطط هرمية المكونات (Component Architecture): افصل المكونات القاعدية (UI Primitives) عن المكونات المركبة (Feature Components) وحدد بوضوح Server Components مقابل Client Components.4حدد عقود البيانات للواجهة (Frontend Data Contracts) واكتب الأنواع (TypeScript Interfaces) لكل نموذج بيانات دون انتظار اكتمال الخادم.5فكك مراحل التنفيذ إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks) وحدد لكل مهمة: المعرّف (ID)، المدخلات، المخرجات، ومعايير القبول (Acceptance Criteria).6وثّق الخطة المعمارية في docs/FRONTEND_PLAN.md وجدول المهام في docs/FRONTEND_TASKS.md وخريطة المسارات في docs/ROUTES_MAP.md.المتطلبات السابقةوثيقة متطلبات المنتج المعتمدة docs/PRD.md (الموضوع 03)نظام التصميم DESIGN.md ومراجع شاشات Stitch (الموضوعان 22 و29)جرد الشاشات docs/SCREEN_INVENTORY.md والنموذج التفاعلي (الموضوعان 20 و23)أساسيات Next.js وTypeScript وTailwind CSS (المواضيع 30-33)

  
    الموضوع 34 · تخطيط الفرونت إند
    المسارات والمكونات وعقود البيانات والمهام الذرية
  

  
    
      تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)
      تفكيك الواجهة إلى مسارات ومكونات وعقود بيانات ومهام ذرية صغيرة قابلة للتحقق قبل كتابة الكود
    
  

  
  
    1. لماذا يسبق التخطيط المعماري أي كتابة للكود البرمجي؟
    
      أكبر فخ يقع فيه مطورو تطبيقات الذكاء الاصطناعي هو «البرمجة الاندفاعية» (Impulsive Vibe Coding): فتح محرر الكود وتوجيه أمر عام للوكيل مثل «ابنِ لي صفحات التطبيق كاملة مع لوحة التحكم وتسجيل الدخول!». النتيجة الحتمية لهذا النهج هي انهيار نافذة السياق، وتشوه هيكل المشروع، وإنتاج كود متنافر وغير مترابط يعجز حتى أمهر المطورين عن صيانته.
    
    
      في منهجيتنا الهندسية، يدخل الطالب مرحلة الفرونت إند مسلحاً بجميع المخرجات التحليلية والبصرية المعتمدة من المحطات السابقة:
    
    
      وثيقة متطلبات المنتج (docs/PRD.md): المرجع التشريعي للوظائف، وقواعد العمل، وصلاحيات الأدوار.
      جرد الشاشات (docs/SCREEN_INVENTORY.md): القائمة الحصرية لكافة الشاشات وحالاتها المستهدفة في النسخة التجريبية الأولى (MVP).
      نظام التصميم (DESIGN.md ومراجع Stitch): المرجع البصري المعتمد لتوكنز الألوان والخطوط ومقاسات التباعد.
      مخطط الكيانات (docs/ERD.md): الهيكل المفاهيمي للبيانات الذي ستشتق منه عقود الواجهة.
    

    
      
        ⚠️
        حدود النطاق الصارمة: الواجهة الأمامية فقط (Frontend-Only Boundary)
      
      
        تخطيط هذه المرحلة ينصب حصرياً على الواجهة الأمامية (Frontend Only). يُحظر تماماً كتابة كود الخادم (Backend)، أو إنشاء قواعد البيانات والـ Migrations، أو ادعاء وجود تكامل حي أو مصادقة حقيقية (Authentication) في هذه المرحلة. يتم التعامل مع كافة البيانات عبر بيانات تمثيلية صريحة (Mock Data) وعقود مكتوبة الأنواع (Typed Contracts) حتى يحين موعد بناء الخادم والربط في المحطات اللاحقة.
      
    
  

  
  
    2. شجرة المسارات وهيكلية Next.js App Router
    
      نعتمد هيكلية Next.js App Router المعيارية، حيث يتحول كل مجلد داخل app/ إلى مسار (Route) حقيقي في الموقع، بينما تُعرّف ملفات النظام الخاصة سلوك كل مسار:
    

    
      
        
          
            الملف المعياري
            الوظيفة الهندسية
            الاستخدام في مشروع الطالب
          
        
        
          
            page.tsx
            الواجهة الفريدة للمسار
            عرض محتوى الشاشة المحددة من جرد الشاشات
          
          
            layout.tsx
            الغلاف المشترك المحفوظ
            شريط التنقل (Navbar) والقائمة الجانبية (Sidebar) المشتركة
          
          
            loading.tsx
            واجهة التحميل الفورية (Suspense Boundary)
            عرض شاشات الهيكل العظمي (Skeleton Screens) أثناء جلب البيانات
          
          
            error.tsx
            معالجة الأخطاء المعزولة (Error Boundary)
            التقاط الأخطاء وعرض زر إعادة المحاولة دون إسقاط كامل التطبيق
          
          
            not-found.tsx
            واجهة الصفحة غير الموجودة (404)
            توجيه المستخدم بشكل ودود عند طلب مورد أو slug غير موجود
          
        
      
    

    
      خريطة مسارات مشروع BorrowHub (docs/ROUTES_MAP.md)
      
        
          
            المسار (Route)
            نوع الوصول
            الوظيفة والهدف
          
        
        
          
            /
            عام (Public)
            الصفحة الرئيسية واستكشاف أقسام المعدات الأكثر طلباً
          
          
            /equipment
            عام (Public)
            كتالوج المعدات الشامل مع البحث والتصفية حسب الأقسام وحالة التوفر
          
          
            /equipment/[id]
            عام (Public)
            تفاصيل المعدة الكاملة والمواصفات الفنية وزر تقديم طلب الاستعارة
          
          
            /requests
            محمي شكلياً (Student Role)
            متابعة طلبات الاستعارة الحالية والسابقة وسجل الحالات للطالب
          
          
            /admin/inventory
            محمي شكلياً (Staff Role)
            إدارة المخزون وتحديث حالات المعدات (متاحة، محجوزة، معارة، تالفة)
          
          
            /admin/loans
            محمي شكلياً (Staff Role)
            مراجعة واعتماد طلبات الاستعارة وتسجيل التسليم والإرجاع الميداني
          
        
      
    
  

  
  
    3. هرمية المكونات وفصل المسؤوليات (Component Architecture)
    
      تنظم المكونات في ثلاث طبقات معمارية واضحة المعالم، مع الحفاظ على قاعدة ذهبية: المكونات خادمة (Server Components) افتراضياً، وتتحول إلى عميلة (Client Components) فقط عند الحاجة للتفاعل المباشر:
    

    
      
        1. المكونات القاعدية (UI Primitives)
        
          مكونات ذرية مستقلة تماماً عن مجال المشروع توضع في src/components/ui/، مثل Button، وBadge، وCard، وModal، وInput، تُبنى وفق توكنز DESIGN.md.
        
      
      
        2. مكونات الهيكل (Layout Components)
        
          المكونات الهيكلية المشتركة في src/components/layout/، مثل Navbar، وSidebar، وFooter، وRoleSwitcher للتبديل السريع بين أدوار المستخدمين التمثيلية.
        
      
      
        3. مكونات الميزات (Feature Modules)
        
          مكونات متخصصة بكيانات المشروع توضع في src/components/equipment/ وsrc/components/loans/، مثل EquipmentCard وLoanRequestModal، وترتبط مباشرة بعقود البيانات.
        
      
    
  

  
  
    4. عقود بيانات الفرونت إند والأنواع الصارمة (TypeScript Data Contracts)
    
      استخدم عقود الموضوع 30 في src/types/project.ts كمصدر موحد للأنواع. المثال المختصر أدناه يشرح View Model توضيحيًا خاصًا بالواجهة، وليس بديلًا لتلك العقود أو لمخطط ERD المعتمد.
    

    
      
        ⚠️
        تنبيه اتساق المصدر وقواعد BorrowHub التسع
      
      
        قواعد العمل المعتمدة في BorrowHub محددة بدقة: عشرة أيام تقويمية كحد أقصى للمدة، طلبان نشطان كحد أقصى للطالب، وحدة واحدة لكل طلب، سبب الاستعارة إلزامي، اعتماد يدوي لحساب الطالب، تأكيد مادي للاستلام والإرجاع بواسطة مسؤول المعمل (Staff)، مهلة استلام 48 ساعة تبدأ من تاريخ بداية الطلب خاضعة لتعريف PRD، وانعدام الغرامات المالية أو الحظر التلقائي.
      
      
        عقود الموضوع 30 الأساسية تعتمد المعرّف userId وحالة active؛ بينما يستخدم نموذج العرض التوضيحي أدناه studentId وحالة collected كعينة لمتطلبات الواجهة المحلية، مما يتطلب مواءمتها عبر Adapter بدلاً من التعديل الصامت أو افتراض مدد متغيرة (مثل 7 أو 14 يوماً) غير معتمدة.
      
    

    
    
      
        src/types/equipment.ts (Illustrative UI View Models)
        نسخ الكود
      
      // Illustrative view models only; canonical domain types remain in topic 30 (src/types/project.ts).
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
  specifications: Record<string, string>;
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
}
    
  

  
  
    5. استراتيجية التفكيك إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks)
    
      الركيزة الجوهرية لمنهجية سلاح العصر هي «المهام الذرية الصغيرة القابلة للتحقق الفوري». لا يُكلف الوكيل ببناء صفحة كاملة أو ميزة مجمعة، بل يتم تقسيم خطة التنفيذ إلى مهام لا تتجاوز الواحدة منها تعديل ملف أو ملفين، مع تحديد الشروط التالية لكل مهمة:
    

    
      
        
          
            عنصر المهمة
            المقصود به
            مثال من مهمة بناء بطاقة المعدة (TASK-FE-03)
          
        
        
          
            المعرّف (Task ID)
            رمز فريد يحدد ترتيب المهمة
            TASK-FE-03
          
          
            النطاق المحدد (Scope)
            الملفات التي سيتم إنشاؤها أو تعديلها حصراً
            إنشاء src/components/equipment/EquipmentCard.tsx فقط
          
          
            المدخلات المرجعية (Inputs)
            المستندات والتصميمات التي يقرأ منها الوكيل
            DESIGN.md، ومرجع Stitch لشاشة الكتالوج، وsrc/types/equipment.ts
          
          
            المخرج المتوقع (Output)
            المكون أو الواجهة المنتجة
            مكون بطاقة المعدة التفاعلي يدعم كافة حالات التوفر
          
          
            الاعتماديات السابقة (Dependencies)
            المهام التي يجب اكتمالها قبل بدء هذه المهمة
            TASK-FE-01 (المكونات القاعدية) وTASK-FE-02 (عقود البيانات)
          
          
            معايير القبول (Acceptance Criteria)
            شروط إغلاق المهمة وقبول العمل
            تطبيق شارات التوفر، دعم زر الحجز للمعدات المتاحة، ودعم التجاوب ≥ 44px لمس
          
          
            أمر التحقق الفوري (Verification)
            أمر طرفية سريع يتأكد من سلامة الشيفرة
            npx tsc --noEmit && npm run build
          
        
      
    

    
    
      الشكل (14): دورة التخطيط المعماري للفرونت إند من المتطلبات إلى المهام الذرية
      
        
          
          
          المراجع المعتمدة
          docs/PRD.md
          docs/SCREEN_INVENTORY.md
          DESIGN.md
          مراجع Stitch
          docs/ERD.md

          
          

          
          
          المسارات والمكونات
          Next.js App Router
          docs/ROUTES_MAP.md
          هرمية المكونات
          UI Primitives vs Features
          Server vs Client

          
          

          
          
          عقود البيانات والأنواع
          TypeScript Interfaces
          مطابقة لـ ERD
          Mock Data Schemas
          جاهزة للاستبدال لاحقاً
          لا خادم ولا قاعدة حالياً

          
          

          
          
          المهام الذرية
          docs/FRONTEND_TASKS.md
          Task ID + Inputs
          Acceptance Criteria
          أمر الفحص الفوري
          مهمة واحدة في كل مرة
        
      
    
  

  
  
    6. برومبتات التخطيط المعماري المعتمدة

    
    
      
        PROMPT 24 — Frontend-Only Next.js Plan
        نسخ البرومبت
      
      Act as a Senior Next.js Frontend Architect.
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
docs/FRONTEND_DATA_CONTRACTS.md.
    

    
    
      
        PROMPT 26 — Select Next Implementation Phase
        نسخ البرومبت
      
      Act as a Senior Frontend Tech Lead.
Read FRONTEND_PLAN.md, FRONTEND_TASKS.md and actual repository state.
Choose the next uncompleted phase whose dependencies are satisfied.
Create a FEATURE_BRIEF with exact scope, screens, inputs, dependencies,
deliverables and acceptance criteria. Do not implement anything yet.
    
  

"

```

```yaml
- article:
  - heading "خطوات التطبيق على مشروعك" [level=2]
  - list:
    - listitem: 1 اقرأ وثائق PRD وجرد الشاشات ونظام التصميم DESIGN.md لاستيعاب كافة رحلات المستخدم وحالات الواجهة المطلوبة دون تخمين.
    - listitem: 2 صمم شجرة المسارات (Routes Map) لمشروعك وفق Next.js App Router مع تحديد الصفحات العامة والمسارات المحمية وملفات layout وloading وerror.
    - listitem: "3 خطط هرمية المكونات (Component Architecture): افصل المكونات القاعدية (UI Primitives) عن المكونات المركبة (Feature Components) وحدد بوضوح Server Components مقابل Client Components."
    - listitem: 4 حدد عقود البيانات للواجهة (Frontend Data Contracts) واكتب الأنواع (TypeScript Interfaces) لكل نموذج بيانات دون انتظار اكتمال الخادم.
    - listitem: "5 فكك مراحل التنفيذ إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks) وحدد لكل مهمة: المعرّف (ID)، المدخلات، المخرجات، ومعايير القبول (Acceptance Criteria)."
    - listitem: 6 وثّق الخطة المعمارية في docs/FRONTEND_PLAN.md وجدول المهام في docs/FRONTEND_TASKS.md وخريطة المسارات في docs/ROUTES_MAP.md.
  - heading "المتطلبات السابقة" [level=3]
  - list:
    - listitem: وثيقة متطلبات المنتج المعتمدة docs/PRD.md (الموضوع 03)
    - listitem: نظام التصميم DESIGN.md ومراجع شاشات Stitch (الموضوعان 22 و29)
    - listitem: جرد الشاشات docs/SCREEN_INVENTORY.md والنموذج التفاعلي (الموضوعان 20 و23)
    - listitem: أساسيات Next.js وTypeScript وTailwind CSS (المواضيع 30-33)
  - text: الموضوع 34 · تخطيط الفرونت إند المسارات والمكونات وعقود البيانات والمهام الذرية
  - heading "تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)" [level=2]
  - text: تفكيك الواجهة إلى مسارات ومكونات وعقود بيانات ومهام ذرية صغيرة قابلة للتحقق قبل كتابة الكود
  - heading "1. لماذا يسبق التخطيط المعماري أي كتابة للكود البرمجي؟" [level=3]
  - paragraph:
    - text: "أكبر فخ يقع فيه مطورو تطبيقات الذكاء الاصطناعي هو «البرمجة الاندفاعية» (Impulsive Vibe Coding): فتح محرر الكود وتوجيه أمر عام للوكيل مثل"
    - emphasis: «ابنِ لي صفحات التطبيق كاملة مع لوحة التحكم وتسجيل الدخول!»
    - text: . النتيجة الحتمية لهذا النهج هي انهيار نافذة السياق، وتشوه هيكل المشروع، وإنتاج كود متنافر وغير مترابط يعجز حتى أمهر المطورين عن صيانته.
  - paragraph: "في منهجيتنا الهندسية، يدخل الطالب مرحلة الفرونت إند مسلحاً بجميع المخرجات التحليلية والبصرية المعتمدة من المحطات السابقة:"
  - list:
    - listitem:
      - strong: "وثيقة متطلبات المنتج (docs/PRD.md):"
      - text: المرجع التشريعي للوظائف، وقواعد العمل، وصلاحيات الأدوار.
    - listitem:
      - strong: "جرد الشاشات (docs/SCREEN_INVENTORY.md):"
      - text: القائمة الحصرية لكافة الشاشات وحالاتها المستهدفة في النسخة التجريبية الأولى (MVP).
    - listitem:
      - strong: "نظام التصميم (DESIGN.md ومراجع Stitch):"
      - text: المرجع البصري المعتمد لتوكنز الألوان والخطوط ومقاسات التباعد.
    - listitem:
      - strong: "مخطط الكيانات (docs/ERD.md):"
      - text: الهيكل المفاهيمي للبيانات الذي ستشتق منه عقود الواجهة.
  - text: "⚠️ حدود النطاق الصارمة: الواجهة الأمامية فقط (Frontend-Only Boundary)"
  - paragraph:
    - text: تخطيط هذه المرحلة ينصب
    - strong: حصرياً على الواجهة الأمامية (Frontend Only)
    - text: . يُحظر تماماً كتابة كود الخادم (Backend)، أو إنشاء قواعد البيانات والـ Migrations، أو ادعاء وجود تكامل حي أو مصادقة حقيقية (Authentication) في هذه المرحلة. يتم التعامل مع كافة البيانات عبر
    - strong: بيانات تمثيلية صريحة (Mock Data) وعقود مكتوبة الأنواع (Typed Contracts)
    - text: حتى يحين موعد بناء الخادم والربط في المحطات اللاحقة.
  - heading "2. شجرة المسارات وهيكلية Next.js App Router" [level=3]
  - paragraph:
    - text: نعتمد هيكلية Next.js App Router المعيارية، حيث يتحول كل مجلد داخل
    - code: app/
    - text: "إلى مسار (Route) حقيقي في الموقع، بينما تُعرّف ملفات النظام الخاصة سلوك كل مسار:"
  - table:
    - rowgroup:
      - row "الملف المعياري الوظيفة الهندسية الاستخدام في مشروع الطالب":
        - columnheader "الملف المعياري"
        - columnheader "الوظيفة الهندسية"
        - columnheader "الاستخدام في مشروع الطالب"
    - rowgroup:
      - row "page.tsx الواجهة الفريدة للمسار عرض محتوى الشاشة المحددة من جرد الشاشات":
        - cell "page.tsx":
          - code: page.tsx
        - cell "الواجهة الفريدة للمسار"
        - cell "عرض محتوى الشاشة المحددة من جرد الشاشات"
      - row "layout.tsx الغلاف المشترك المحفوظ شريط التنقل (Navbar) والقائمة الجانبية (Sidebar) المشتركة":
        - cell "layout.tsx":
          - code: layout.tsx
        - cell "الغلاف المشترك المحفوظ"
        - cell "شريط التنقل (Navbar) والقائمة الجانبية (Sidebar) المشتركة"
      - row "loading.tsx واجهة التحميل الفورية (Suspense Boundary) عرض شاشات الهيكل العظمي (Skeleton Screens) أثناء جلب البيانات":
        - cell "loading.tsx":
          - code: loading.tsx
        - cell "واجهة التحميل الفورية (Suspense Boundary)"
        - cell "عرض شاشات الهيكل العظمي (Skeleton Screens) أثناء جلب البيانات"
      - row "error.tsx معالجة الأخطاء المعزولة (Error Boundary) التقاط الأخطاء وعرض زر إعادة المحاولة دون إسقاط كامل التطبيق":
        - cell "error.tsx":
          - code: error.tsx
        - cell "معالجة الأخطاء المعزولة (Error Boundary)"
        - cell "التقاط الأخطاء وعرض زر إعادة المحاولة دون إسقاط كامل التطبيق"
      - row "not-found.tsx واجهة الصفحة غير الموجودة (404) توجيه المستخدم بشكل ودود عند طلب مورد أو slug غير موجود":
        - cell "not-found.tsx":
          - code: not-found.tsx
        - cell "واجهة الصفحة غير الموجودة (404)"
        - cell "توجيه المستخدم بشكل ودود عند طلب مورد أو slug غير موجود"
  - heading "خريطة مسارات مشروع BorrowHub (docs/ROUTES_MAP.md)" [level=4]
  - table:
    - rowgroup:
      - row "المسار (Route) نوع الوصول الوظيفة والهدف":
        - columnheader "المسار (Route)"
        - columnheader "نوع الوصول"
        - columnheader "الوظيفة والهدف"
    - rowgroup:
      - row "/ عام (Public) الصفحة الرئيسية واستكشاف أقسام المعدات الأكثر طلباً":
        - cell "/":
          - code: /
        - cell "عام (Public)"
        - cell "الصفحة الرئيسية واستكشاف أقسام المعدات الأكثر طلباً"
      - row "/equipment عام (Public) كتالوج المعدات الشامل مع البحث والتصفية حسب الأقسام وحالة التوفر":
        - cell "/equipment":
          - code: /equipment
        - cell "عام (Public)"
        - cell "كتالوج المعدات الشامل مع البحث والتصفية حسب الأقسام وحالة التوفر"
      - row "/equipment/[id] عام (Public) تفاصيل المعدة الكاملة والمواصفات الفنية وزر تقديم طلب الاستعارة":
        - cell "/equipment/[id]":
          - code: /equipment/[id]
        - cell "عام (Public)"
        - cell "تفاصيل المعدة الكاملة والمواصفات الفنية وزر تقديم طلب الاستعارة"
      - row "/requests محمي شكلياً (Student Role) متابعة طلبات الاستعارة الحالية والسابقة وسجل الحالات للطالب":
        - cell "/requests":
          - code: /requests
        - cell "محمي شكلياً (Student Role)"
        - cell "متابعة طلبات الاستعارة الحالية والسابقة وسجل الحالات للطالب"
      - row "/admin/inventory محمي شكلياً (Staff Role) إدارة المخزون وتحديث حالات المعدات (متاحة، محجوزة، معارة، تالفة)":
        - cell "/admin/inventory":
          - code: /admin/inventory
        - cell "محمي شكلياً (Staff Role)"
        - cell "إدارة المخزون وتحديث حالات المعدات (متاحة، محجوزة، معارة، تالفة)"
      - row "/admin/loans محمي شكلياً (Staff Role) مراجعة واعتماد طلبات الاستعارة وتسجيل التسليم والإرجاع الميداني":
        - cell "/admin/loans":
          - code: /admin/loans
        - cell "محمي شكلياً (Staff Role)"
        - cell "مراجعة واعتماد طلبات الاستعارة وتسجيل التسليم والإرجاع الميداني"
  - heading "3. هرمية المكونات وفصل المسؤوليات (Component Architecture)" [level=3]
  - paragraph:
    - text: "تنظم المكونات في ثلاث طبقات معمارية واضحة المعالم، مع الحفاظ على قاعدة ذهبية:"
    - strong: المكونات خادمة (Server Components) افتراضياً، وتتحول إلى عميلة (Client Components) فقط عند الحاجة للتفاعل المباشر
    - text: ":"
  - heading "1. المكونات القاعدية (UI Primitives)" [level=4]
  - paragraph:
    - text: مكونات ذرية مستقلة تماماً عن مجال المشروع توضع في
    - code: src/components/ui/
    - text: ، مثل
    - code: Button
    - text: ، و
    - code: Badge
    - text: ، و
    - code: Card
    - text: ، و
    - code: Modal
    - text: ، و
    - code: Input
    - text: ، تُبنى وفق توكنز
    - code: DESIGN.md
    - text: .
  - heading "2. مكونات الهيكل (Layout Components)" [level=4]
  - paragraph:
    - text: المكونات الهيكلية المشتركة في
    - code: src/components/layout/
    - text: ، مثل
    - code: Navbar
    - text: ، و
    - code: Sidebar
    - text: ، و
    - code: Footer
    - text: ، و
    - code: RoleSwitcher
    - text: للتبديل السريع بين أدوار المستخدمين التمثيلية.
  - heading "3. مكونات الميزات (Feature Modules)" [level=4]
  - paragraph:
    - text: مكونات متخصصة بكيانات المشروع توضع في
    - code: src/components/equipment/
    - text: و
    - code: src/components/loans/
    - text: ، مثل
    - code: EquipmentCard
    - text: و
    - code: LoanRequestModal
    - text: ، وترتبط مباشرة بعقود البيانات.
  - heading "4. عقود بيانات الفرونت إند والأنواع الصارمة (TypeScript Data Contracts)" [level=3]
  - paragraph:
    - text: استخدم عقود الموضوع 30 في
    - code: src/types/project.ts
    - text: كمصدر موحد للأنواع. المثال المختصر أدناه يشرح View Model توضيحيًا خاصًا بالواجهة، وليس بديلًا لتلك العقود أو لمخطط ERD المعتمد.
  - text: ⚠️ تنبيه اتساق المصدر وقواعد BorrowHub التسع
  - paragraph:
    - text: "قواعد العمل المعتمدة في BorrowHub محددة بدقة:"
    - strong: عشرة أيام تقويمية
    - text: كحد أقصى للمدة،
    - strong: طلبان نشطان
    - text: كحد أقصى للطالب،
    - strong: وحدة واحدة
    - text: لكل طلب،
    - strong: سبب الاستعارة إلزامي
    - text: ،
    - strong: اعتماد يدوي
    - text: لحساب الطالب،
    - strong: تأكيد مادي للاستلام والإرجاع بواسطة مسؤول المعمل (Staff)
    - text: ،
    - strong: مهلة استلام 48 ساعة
    - text: تبدأ من تاريخ بداية الطلب خاضعة لتعريف PRD، و
    - strong: انعدام الغرامات المالية أو الحظر التلقائي
    - text: .
  - paragraph:
    - text: عقود الموضوع 30 الأساسية تعتمد المعرّف
    - code: userId
    - text: وحالة
    - code: active
    - text: ؛ بينما يستخدم نموذج العرض التوضيحي أدناه
    - code: studentId
    - text: وحالة
    - code: collected
    - text: كعينة لمتطلبات الواجهة المحلية، مما يتطلب مواءمتها عبر Adapter بدلاً من التعديل الصامت أو افتراض مدد متغيرة (مثل 7 أو 14 يوماً) غير معتمدة.
  - text: src/types/equipment.ts (Illustrative UI View Models)
  - button "نسخ الكود"
  - code: "// Illustrative view models only; canonical domain types remain in topic 30 (src/types/project.ts). // Note field naming difference: UI model uses studentId/collected; canonical domain uses userId/active. // BorrowHub loan duration rule is fixed at 10 calendar days max; do not invent arbitrary 7/14 day rules. export type EquipmentStatus = 'available' | 'reserved' | 'borrowed' | 'damaged' | 'maintenance'; export interface Category { id: string; name: string; slug: string; iconName?: string; } export interface EquipmentViewModel { id: string; name: string; serialNumber: string; categoryId: string; category?: Category; status: EquipmentStatus; description: string; specifications: Record<string, string>; imageUrl: string; location: string; requiresSupervisorApproval: boolean; maxBorrowDays: number; } export interface LoanRequestViewModel { id: string; equipmentId: string; equipment?: EquipmentViewModel; studentId: string; studentName: string; studentEmail: string; status: 'pending' | 'approved' | 'rejected' | 'collected' | 'returned' | 'overdue'; startDate: string; expectedReturnDate: string; actualReturnDate?: string; purpose: string; supervisorNotes?: string; createdAt: string; }"
  - heading "5. استراتيجية التفكيك إلى مهام ذرية صغيرة قابلة للتحقق (Small Verifiable Tasks)" [level=3]
  - paragraph:
    - text: الركيزة الجوهرية لمنهجية سلاح العصر هي
    - strong: «المهام الذرية الصغيرة القابلة للتحقق الفوري»
    - text: ". لا يُكلف الوكيل ببناء صفحة كاملة أو ميزة مجمعة، بل يتم تقسيم خطة التنفيذ إلى مهام لا تتجاوز الواحدة منها تعديل ملف أو ملفين، مع تحديد الشروط التالية لكل مهمة:"
  - table:
    - rowgroup:
      - row "عنصر المهمة المقصود به مثال من مهمة بناء بطاقة المعدة (TASK-FE-03)":
        - columnheader "عنصر المهمة"
        - columnheader "المقصود به"
        - columnheader "مثال من مهمة بناء بطاقة المعدة (TASK-FE-03)"
    - rowgroup:
      - row "المعرّف (Task ID) رمز فريد يحدد ترتيب المهمة TASK-FE-03":
        - cell "المعرّف (Task ID)":
          - strong: المعرّف (Task ID)
        - cell "رمز فريد يحدد ترتيب المهمة"
        - cell "TASK-FE-03":
          - code: TASK-FE-03
      - row "النطاق المحدد (Scope) الملفات التي سيتم إنشاؤها أو تعديلها حصراً إنشاء src/components/equipment/EquipmentCard.tsx فقط":
        - cell "النطاق المحدد (Scope)":
          - strong: النطاق المحدد (Scope)
        - cell "الملفات التي سيتم إنشاؤها أو تعديلها حصراً"
        - cell "إنشاء src/components/equipment/EquipmentCard.tsx فقط":
          - text: إنشاء
          - code: src/components/equipment/EquipmentCard.tsx
          - text: فقط
      - row "المدخلات المرجعية (Inputs) المستندات والتصميمات التي يقرأ منها الوكيل DESIGN.md، ومرجع Stitch لشاشة الكتالوج، وsrc/types/equipment.ts":
        - cell "المدخلات المرجعية (Inputs)":
          - strong: المدخلات المرجعية (Inputs)
        - cell "المستندات والتصميمات التي يقرأ منها الوكيل"
        - cell "DESIGN.md، ومرجع Stitch لشاشة الكتالوج، وsrc/types/equipment.ts":
          - code: DESIGN.md
          - text: ، ومرجع Stitch لشاشة الكتالوج، و
          - code: src/types/equipment.ts
      - row "المخرج المتوقع (Output) المكون أو الواجهة المنتجة مكون بطاقة المعدة التفاعلي يدعم كافة حالات التوفر":
        - cell "المخرج المتوقع (Output)":
          - strong: المخرج المتوقع (Output)
        - cell "المكون أو الواجهة المنتجة"
        - cell "مكون بطاقة المعدة التفاعلي يدعم كافة حالات التوفر"
      - row "الاعتماديات السابقة (Dependencies) المهام التي يجب اكتمالها قبل بدء هذه المهمة TASK-FE-01 (المكونات القاعدية) وTASK-FE-02 (عقود البيانات)":
        - cell "الاعتماديات السابقة (Dependencies)":
          - strong: الاعتماديات السابقة (Dependencies)
        - cell "المهام التي يجب اكتمالها قبل بدء هذه المهمة"
        - cell "TASK-FE-01 (المكونات القاعدية) وTASK-FE-02 (عقود البيانات)":
          - code: TASK-FE-01
          - text: (المكونات القاعدية) و
          - code: TASK-FE-02
          - text: (عقود البيانات)
      - row "معايير القبول (Acceptance Criteria) شروط إغلاق المهمة وقبول العمل تطبيق شارات التوفر، دعم زر الحجز للمعدات المتاحة، ودعم التجاوب ≥ 44px لمس":
        - cell "معايير القبول (Acceptance Criteria)":
          - strong: معايير القبول (Acceptance Criteria)
        - cell "شروط إغلاق المهمة وقبول العمل"
        - cell "تطبيق شارات التوفر، دعم زر الحجز للمعدات المتاحة، ودعم التجاوب ≥ 44px لمس"
      - row "أمر التحقق الفوري (Verification) أمر طرفية سريع يتأكد من سلامة الشيفرة npx tsc --noEmit && npm run build":
        - cell "أمر التحقق الفوري (Verification)":
          - strong: أمر التحقق الفوري (Verification)
        - cell "أمر طرفية سريع يتأكد من سلامة الشيفرة"
        - cell "npx tsc --noEmit && npm run build":
          - code: npx tsc --noEmit && npm run build
  - 'heading "الشكل (14): دورة التخطيط المعماري للفرونت إند من المتطلبات إلى المهام الذرية" [level=4]'
  - img "مخطط التخطيط المعماري للفرونت إند": المراجع المعتمدة docs/PRD.md docs/SCREEN_INVENTORY.md DESIGN.md مراجع Stitch docs/ERD.md المسارات والمكونات Next.js App Router docs/ROUTES_MAP.md هرمية المكونات UI Primitives vs Features Server vs Client عقود البيانات والأنواع TypeScript Interfaces مطابقة لـ ERD Mock Data Schemas جاهزة للاستبدال لاحقاً لا خادم ولا قاعدة حالياً المهام الذرية docs/FRONTEND_TASKS.md Task ID + Inputs Acceptance Criteria أمر الفحص الفوري مهمة واحدة في كل مرة
  - heading "6. برومبتات التخطيط المعماري المعتمدة" [level=3]
  - text: PROMPT 24 — Frontend-Only Next.js Plan
  - button "نسخ البرومبت"
  - code: "Act as a Senior Next.js Frontend Architect. Read PRD, SCREEN_INVENTORY, UX_BLUEPRINT, DESIGN.md and Stitch references. Plan only the frontend: Next.js App Router, React, TypeScript, Tailwind CSS. Create route hierarchy, layouts, shared components, feature modules, typed mock data, data contracts, user interactions and UI states. Divide implementation into small dependency-ordered PHASES and TASKS. For every task define ID, exact scope, inputs, expected output, dependencies, acceptance criteria and verification method. Map every MVP screen to a phase. Do not code yet, and do not implement backend, database or real authentication. Create docs/FRONTEND_PLAN.md, docs/FRONTEND_TASKS.md, docs/ROUTES_MAP.md, docs/COMPONENT_ARCHITECTURE.md, docs/FRONTEND_DATA_CONTRACTS.md."
  - text: PROMPT 26 — Select Next Implementation Phase
  - button "نسخ البرومبت"
  - code: Act as a Senior Frontend Tech Lead. Read FRONTEND_PLAN.md, FRONTEND_TASKS.md and actual repository state. Choose the next uncompleted phase whose dependencies are satisfied. Create a FEATURE_BRIEF with exact scope, screens, inputs, dependencies, deliverables and acceptance criteria. Do not implement anything yet.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Sequential Project Path - Ticket 12: Frontend Planning, UI/UX Pro Max, Spec Kit & Incremental Implementation (Slots 34-37)', () => {
  4   | 
  5   |   test('Topic 34 (Frontend Planning): Routes, components hierarchy, data contracts, and small verifiable tasks', async ({ page }) => {
  6   |     await page.goto('/learn/frontend-architecture-planning');
  7   | 
  8   |     // Page metadata and headers
  9   |     await expect(page.locator('h1')).toContainText('تخطيط واجهة المستخدم وهندسة الفرونت إند (Frontend Planning)');
  10  |     const header = page.locator('header.rounded-3xl');
  11  |     await expect(header).toContainText('محتوى منشور');
  12  |     await expect(header).toContainText('docs/FRONTEND_PLAN.md');
  13  |     await expect(header).toContainText('docs/FRONTEND_TASKS.md');
  14  |     await expect(header).toContainText('docs/ROUTES_MAP.md');
  15  |     await expect(header).toContainText('docs/COMPONENT_ARCHITECTURE.md');
  16  |     await expect(header).toContainText('docs/FRONTEND_DATA_CONTRACTS.md');
  17  | 
  18  |     // RTL directionality
  19  |     await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  20  | 
  21  |     // Content: Architecture before code & avoiding monolithic vibe coding
  22  |     const content = page.locator('article');
  23  |     await expect(content).toContainText('لماذا يسبق التخطيط المعماري أي كتابة للكود البرمجي؟');
  24  |     await expect(content).toContainText('البرمجة الاندفاعية');
  25  |     await expect(content).toContainText('docs/PRD.md');
  26  |     await expect(content).toContainText('docs/SCREEN_INVENTORY.md');
> 27  |     await expect(content).toContainText('docs/DESIGN.md');
      |                           ^ Error: expect(locator).toContainText(expected) failed
  28  | 
  29  |     // Content: Frontend-Only boundary
  30  |     await expect(content).toContainText('حدود النطاق الصارمة: الواجهة الأمامية فقط');
  31  |     await expect(content).toContainText('Frontend Only');
  32  | 
  33  |     // Content: Routes Map & Next.js App Router
  34  |     await expect(content).toContainText('شجرة المسارات وهيكلية Next.js App Router');
  35  |     await expect(content).toContainText('layout.tsx');
  36  |     await expect(content).toContainText('loading.tsx');
  37  |     await expect(content).toContainText('error.tsx');
  38  |     await expect(content).toContainText('not-found.tsx');
  39  |     await expect(content).toContainText('/equipment');
  40  |     await expect(content).toContainText('/requests');
  41  |     await expect(content).toContainText('/admin/inventory');
  42  | 
  43  |     // Content: Component Architecture (Primitives, Layout, Features)
  44  |     await expect(content).toContainText('هرمية المكونات وفصل المسؤوليات');
  45  |     await expect(content).toContainText('المكونات القاعدية (UI Primitives)');
  46  |     await expect(content).toContainText('مكونات الهيكل (Layout Components)');
  47  |     await expect(content).toContainText('مكونات الميزات (Feature Modules)');
  48  | 
  49  |     // Content: TypeScript Data contracts
  50  |     await expect(content).toContainText('عقود بيانات الفرونت إند والأنواع الصارمة');
  51  |     await expect(content).toContainText('EquipmentStatus');
  52  |     await expect(content).toContainText('interface Equipment');
  53  |     await expect(content).toContainText('interface LoanRequest');
  54  | 
  55  |     // Content: Small Verifiable Tasks
  56  |     await expect(content).toContainText('استراتيجية التفكيك إلى مهام ذرية صغيرة قابلة للتحقق');
  57  |     await expect(content).toContainText('TASK-FE-03');
  58  |     await expect(content).toContainText('npx tsc --noEmit && npm run build');
  59  | 
  60  |     // SVG architecture diagram
  61  |     const svg = page.locator('.diagram-box svg');
  62  |     await expect(svg).toBeVisible();
  63  | 
  64  |     // Zero broken anchor links in article
  65  |     const brokenLinks = await page.locator('article a[href="#"]').count();
  66  |     expect(brokenLinks).toBe(0);
  67  | 
  68  |     // Practical steps and checklist
  69  |     await expect(page.locator('text=خطوات التطبيق على مشروعك')).toBeVisible();
  70  |     await expect(page.locator('text=قائمة تحقق التطبيق')).toBeVisible();
  71  | 
  72  |     // Navigation bounds
  73  |     const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
  74  |     await expect(prevLink).toBeVisible();
  75  |     await expect(prevLink).toHaveAttribute('href', '/learn/nextjs-app-router');
  76  | 
  77  |     const nextLink = page.getByRole('link', { name: /الموضوع التالي/ });
  78  |     await expect(nextLink).toBeVisible();
  79  |     await expect(nextLink).toHaveAttribute('href', '/learn/ui-ux-pro-max-review');
  80  |   });
  81  | 
  82  |   test('Topic 35 (UI/UX Pro Max): Verified official CLI, 5 audit dimensions, WCAG AA & touch targets', async ({ page }) => {
  83  |     await page.goto('/learn/ui-ux-pro-max-review');
  84  | 
  85  |     // Title and headers
  86  |     await expect(page.locator('h1')).toContainText('مراجعة معايير التجربة والواجهة بـ UI/UX Pro Max');
  87  |     const header = page.locator('header.rounded-3xl');
  88  |     await expect(header).toContainText('محتوى منشور');
  89  |     await expect(header).toContainText('docs/UI_UX_PRO_MAX_AUDIT.md');
  90  | 
  91  |     const content = page.locator('article');
  92  | 
  93  |     // Content: Proper placement in workflow
  94  |     await expect(content).toContainText('التموضع الهندسي لأداة UI/UX Pro Max في مسار التطوير');
  95  |     await expect(content).toContainText('UI/UX Pro Max لا تستبدل الهوية البصرية المعتمدة في DESIGN.md');
  96  | 
  97  |     // Content: Verified vs official source
  98  |     await expect(content).toContainText('مراجعة الأوامر والاعتماد مقابل المصادر الرسمية');
  99  |     await expect(content).toContainText('مُراجع ومطابق للمستودع الرسمي (Verified against official repo)');
  100 |     const officialRepoLink = page.locator('a[href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"]');
  101 |     await expect(officialRepoLink).toBeVisible();
  102 |     await expect(content).toContainText('npm install -g ui-ux-pro-max-cli');
  103 |     await expect(content).toContainText('uipro init --ai antigravity');
  104 |     await expect(content).toContainText('npx ui-ux-pro-max-cli init --ai antigravity');
  105 | 
  106 |     // Content: 5 Core Audit dimensions
  107 |     await expect(content).toContainText('أبعاد المراجعة الخمسة الأساسية في تدقيق الواجهات');
  108 |     await expect(content).toContainText('الدقة البصرية وتوكنز التصميم');
  109 |     await expect(content).toContainText('تكامل الحالات التفاعلية');
  110 |     await expect(content).toContainText('إمكانية الوصول وتباين الألوان (WCAG AA)');
  111 |     await expect(content).toContainText('أهداف اللمس على الهواتف (Touch Targets)');
  112 |     await expect(content).toContainText('44×44 بكسل');
  113 |     await expect(content).toContainText('مرونة التجاوب وانعدام التمرير الأفقي');
  114 | 
  115 |     // Content: BorrowHub practical audit example
  116 |     await expect(content).toContainText('نموذج تقرير مراجعة مكون بطاقة المعدة');
  117 |     await expect(content).toContainText('PASS');
  118 |     await expect(content).toContainText('FIXED');
  119 | 
  120 |     // SVG Diagram
  121 |     const svg = page.locator('.diagram-box svg');
  122 |     await expect(svg).toBeVisible();
  123 | 
  124 |     // Navigation bounds
  125 |     const prevLink = page.getByRole('link', { name: /الموضوع السابق/ });
  126 |     await expect(prevLink).toHaveAttribute('href', '/learn/frontend-architecture-planning');
  127 | 
```