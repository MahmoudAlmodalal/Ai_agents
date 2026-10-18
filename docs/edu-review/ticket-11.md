# مراجعة تعليمية شاملة: تذكرة [مسار المشروع 11]

**التذكرة:** [مسار المشروع 11] TypeScript وReact وTailwind وNext.js  
**المسار التسلسلي:** المواضيع 30 و31 و32 و33 ضمن مسار بناء مشروع الطالب (1–58)  
**تاريخ المراجعة:** 2026-10-18  
**المراجع:** مهندس مسار تعليمي (Educational Path Reviewer)

---

## 1. ملخص المراجعة ونطاق العمل

تغطي هذه التذكرة محطة الأساسيات البرمجية والتطبيقية لكود الفرونت إند لمشروع الطالب (Frontend Stack Foundations). تأتي هذه المحطة بعد اكتمال مرحلة التحليل والتصميم المرئي (Google Stitch وPrototype وDESIGN.md) وتهيئة أدوات التنفيذ (AI Coding Agent وGoogle AI Studio وSkills وMCP).

تُقدم التقنيات الأربع كمواضيع مستقلة ومتتابعة ومترابطة عضوياً:
1. **الموضوع 30 (TypeScript):** صياغة عقود البيانات والأنواع الصارمة المستمدة من `docs/ERD.md` وجرد الشاشات `docs/SCREEN_INVENTORY.md` لمنع الهلوسة البرمجية وحظر نوع `any`، مع التركيز على المستوى اللازم للمشروع دون دورة أكاديمية مطولة.
2. **الموضوع 31 (React):** بناء هيكل المكونات الهرمية وإدارة الحالة المحلية وتدفق البيانات أحادي الاتجاه (One-Way Data Flow) وتطبيق React 19 مع توجيه `'use client'`، وفحص حالات العرض الأربع (تحميل، نجاح، فارغة، خطأ).
3. **الموضوع 32 (Tailwind CSS):** تطبيق التنسيق النفعي المستند حصراً إلى رموز نظام التصميم المعتمد في `DESIGN.md` (ألوان الزمردي والكحلي والزوايا المعتمدة)، مع دعم كامل للغة العربية (RTL First) باستخدام الخصائص المنطقية (Logical Properties)، والتجاوب الدقيق عبر نقاط الكسر الخمس للمسار (390، 768، 1024، 1366، 1440 بكسل) دون أي تدفق أفقي.
4. **الموضوع 33 (Next.js):** معمارية App Router في Next.js 15 وربط شجرة المسارات والتخطيطات المشتركة (`layout.tsx`) بجرد الشاشات، مع التنقل الفوري بمكون `next/link`، والالتزام الصارم بحدود التنفيذ: الموقع واجهة مستخدم كاملة الوظائف بنمط **Frontend-Only** تعتمد على Mock Data محلية دون ادعاء وجود Backend فعلي.

---

## 2. جدول المراجعة التعليمية التفصيلية لكل موضوع

### الموضوع 30: TypeScript: الأنواع وعقود البيانات لمشروع الطالب (`typescript-types`)
- **الموقع في المسار (sequencePosition):** `30`
- **المعرّف الثابت (slug):** `typescript-types`
- **حالة النشر:** `unified-complete`
- **المخرج المتوقع (Expected Output):**
  - ملف عقود بيانات المشروع `src/types/project.ts`.
  - وثيقة إرشادات وقواعد الأنواع `docs/TYPESCRIPT_GUIDELINES.md`.
  - التحقق من تفعيل النمط الصارم (`strict: true`, `noImplicitAny: true`) ومطابقة Mock Data.
- **دليل الفحص والشواهد (Inspected Evidence):**
  - تم فحص صفحة المسار `/learn/typescript-types` والتأكد من شارة «مسار موحد مكتمل ✓» واتجاه `dir="rtl"`.
  - تم فحص نص المنهجية التعليمية: التركيز على المستوى اللازم للفرونت إند (واجهات الكيانات، Union Types، Generics خفيفة، Props) وتجنب الدورات النظرية المطولة.
  - تم التحقق من مطابقة كيانات `src/types/project.ts` (`User`, `Equipment`, `Category`, `LoanRequest`) مع جداول `docs/ERD.md` ونطاق BorrowHub.
  - تم التحقق من حصر حالات النظام عبر Literal Union (`LoanStatus = 'pending' | 'approved' | 'active' | 'returned' | 'rejected'`).
  - تم فحص التنبيه الهندسي الصارم الذي يميز كود التجريب في السكريبتات المؤقتة عن كود المشروع المعتمد، ويؤكد عدم وجود Backend فعلي في هذه المحطة.
  - تم فحص المخطط الهيكلي SVG لتدفق الأنواع من التحليل إلى المكونات ومستهلكي الفرونت.
  - تم فحص كود TypeScript القابل للنسخ وتأكيد عمل زر النسخ بالكامل.
  - تم التحقق من رابط التنقل التالي الذي يشير مباشرة للموضوع 31 (`/learn/react-components-state`).
- **الفجوات المرصودة (Gaps):** لا توجد فجوات.
- **النتيجة (Status):** **Passed**

---

### الموضوع 31: React: المكونات والحالة وتدفق البيانات في الواجهة (`react-components-state`)
- **الموقع في المسار (sequencePosition):** `31`
- **المعرّف الثابت (slug):** `react-components-state`
- **حالة النشر:** `unified-complete`
- **المخرج المتوقع (Expected Output):**
  - كود المكون المشترك النقي `src/components/common/StatusBadge.tsx`.
  - وثيقة معمارية المكونات وتدفق الحالة `docs/REACT_ARCHITECTURE.md`.
  - استيعاب نموذج $UI = f(state)$ ومعمارية React 19 وحالات الواجهة الأربع.
- **دليل الفحص والشواهد (Inspected Evidence):**
  - تم فحص صفحة المسار `/learn/react-components-state` وشارة الاكتمال والمخرجات المطلوبة.
  - تم التحقق من تقسيم المكونات إلى ذرات (Atoms: `StatusBadge`) وجزيئات (Molecules: `EquipmentCard`) وكائنات شاشات (Organisms).
  - تم فحص شرح تدفق البيانات أحادي الاتجاه (Props نزولاً وCallbacks صعوداً) ومبدأ رفع الحالة (Lifting State Up).
  - تم التحقق من توضيح معمارية React 19: المكونات خادمة افتراضياً، وتوجيه `'use client'` يوضع للمكونات التي تستخدم Hooks وأحداث المتصفح.
  - تم فحص كود مكون `StatusBadge.tsx` المعتمد لمشروع BorrowHub مع معالجة كافة حالات `LoanStatus` بألوان متناسقة.
  - تم فحص التوجيه لاختبار المكونات في عزلة (Isolation) ببيانات تمثيلية دون الحاجة لخادم backend.
  - تم فحص المخطط المعماري SVG لهرمية المكونات وتدفق الحالة.
  - تم التحقق من روابط التنقل: السابق يشير للموضوع 30 (`/learn/typescript-types`) والتالي يشير للموضوع 32 (`/learn/tailwind-css-responsive`).
- **الفجوات المرصودة (Gaps):** لا توجد فجوات.
- **النتيجة (Status):** **Passed**

---

### الموضوع 32: Tailwind CSS: التنسيق والتجاوب ونظام التصميم المعتمد (`tailwind-css-responsive`)
- **الموقع في المسار (sequencePosition):** `32`
- **المعرّف الثابت (slug):** `tailwind-css-responsive`
- **حالة النشر:** `unified-complete`
- **المخرج المتوقع (Expected Output):**
  - ملف تكوين Tailwind المربوط بنظام التصميم `tailwind.config.ts`.
  - وثيقة ربط رموز التصميم بفئات التنسيق `docs/TAILWIND_DESIGN_MAPPING.md`.
  - تطبيق التجاوب التام عبر عروض المسار الخمسة (390، 768، 1024، 1366، 1440 بكسل) مع خلو كامل من التدفق الأفقي.
- **دليل الفحص والشواهد (Inspected Evidence):**
  - تم فحص صفحة المسار `/learn/tailwind-css-responsive` والتحقق من العنوان والمخرجات وقائمة التحقق.
  - تم التحقق من ربط قيم التنسيق برموز `DESIGN.md` المعتمدة من Google Stitch (الزمردي `emerald-600` ودرجات الكحلي `slate-900` والزوايا `rounded-2xl`) مع التحذير الصارم من كتابة قيم عشوائية خارج نظام التصميم.
  - تم فحص قسم دعم العربية (RTL First) باستخدام الخصائص المنطقية (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) وتجنب الفئات الصلبة (`ml-`, `mr-`).
  - تم فحص جدول نقاط الكسر الخمس وسلوك الواجهة عند كل عرض.
  - تم فحص كود مكون `EquipmentCard.tsx` المتجاوب والداعم لـ RTL.
  - تم فحص المخطط التخطيطي SVG للتجاوب عبر الشاشات الخمس.
  - تم التحقق من روابط التنقل: السابق يشير للموضوع 31 (`/learn/react-components-state`) والتالي يشير للموضوع 33 (`/learn/nextjs-app-router`).
- **الفجوات المرصودة (Gaps):** لا توجد فجوات.
- **النتيجة (Status):** **Passed**

---

### الموضوع 33: Next.js: بنية App Router والمسارات والصفحات (`nextjs-app-router`)
- **الموقع في المسار (sequencePosition):** `33`
- **المعرّف الثابت (slug):** `nextjs-app-router`
- **حالة النشر:** `unified-complete`
- **المخرج المتوقع (Expected Output):**
  - هيكل شجرة مجلد المسارات `src/app/` والتخطيط الجذري `layout.tsx`.
  - وثيقة مواصفة مسارات وتخطيطات المشروع `docs/NEXTJS_ROUTING_SPEC.md`.
  - التنبيه الصريح لكون المشروع Frontend-Only بنسبة 100% دون وجود Backend فعلي.
- **دليل الفحص والشواهد (Inspected Evidence):**
  - تم فحص صفحة المسار `/learn/nextjs-app-router` وشارة «مسار موحد مكتمل ✓».
  - تم التحقق من شرح معمارية App Router في Next.js 15 ودور الملفات الخاصة (`layout.tsx`, `page.tsx`, `loading.tsx`, `not-found.tsx`, `[id]/page.tsx`).
  - تم التحقق من مطابقة شجرة المسارات مع وثيقة جرد الشاشات `docs/SCREEN_INVENTORY.md` لمشروع BorrowHub (`/`, `/equipment`, `/equipment/[id]`, `/requests`, `/admin`).
  - تم فحص التنبيه الحاسم والصريح بكون المشروع Frontend-Only يعمل ببيانات `mock-data.json` محلية، ولا يتصل بأي قاعدة بيانات PostgreSQL أو خادم Backend فعلي في هذه المرحلة.
  - تم التحقق من شرح التنقل الفوري من جانب العميل بمكون `next/link`.
  - تم فحص كود `src/app/layout.tsx` الداعم لـ RTL مع شريط تنقل علوي وشارة النموذج التجريبي.
  - تم فحص المخطط المعماري SVG لشجرة مجلدات Next.js App Router والتخطيطات المتداخلة.
  - تم التحقق من رابط التنقل السابق الذي يشير للموضوع 32 (`/learn/tailwind-css-responsive`).
- **الفجوات المرصودة (Gaps):** لا توجد فجوات.
- **النتيجة (Status):** **Passed**

---

## 3. خلاصة نتائج المراجعة وحالة الاعتماد

| الموضوع | sequencePosition | المعرّف (slug) | المخرج التعليمي المعتمد | النتيجة |
| :--- | :---: | :---: | :--- | :---: |
| TypeScript: الأنواع وعقود البيانات | 30 | `typescript-types` | `src/types/project.ts` + `docs/TYPESCRIPT_GUIDELINES.md` | **Passed** |
| React: المكونات والحالة وتدفق البيانات | 31 | `react-components-state` | `src/components/common/StatusBadge.tsx` + `docs/REACT_ARCHITECTURE.md` | **Passed** |
| Tailwind CSS: التنسيق والتجاوب | 32 | `tailwind-css-responsive` | `tailwind.config.ts` + `docs/TAILWIND_DESIGN_MAPPING.md` | **Passed** |
| Next.js: بنية App Router والمسارات | 33 | `nextjs-app-router` | `src/app/layout.tsx` + `docs/NEXTJS_ROUTING_SPEC.md` | **Passed** |

**القرار النهائي للمراجعة:** **اعتماد كامل لكافة مواضيع التذكرة 11 (Passed)** بنسبة 100% ومطابقة دقيقة لكافة معايير القبول وشروط المسار الموحد.
