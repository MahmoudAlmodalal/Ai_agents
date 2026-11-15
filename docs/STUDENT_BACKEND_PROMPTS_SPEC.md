# مواصفات سلسلة برومبتات الباك إند للمبتدئين (Student-Friendly Backend Prompts Spec)

## Problem Statement

يواجه الطلاب المبتدئون وأصحاب المستوى البرمجي الضعيف صعوبة كبيرة عند الانتقال من الواجهة الأمامية إلى بناء الخادم الخلفي (Backend) بالذكاء الاصطناعي:
- صياغة مطالبات عامة أو عشوائية تؤدي إلى توليد أكواد ضخمة ومعقدة ومحشوة في ملف واحد (Fat Views)، مما يربك الطالب ويعجزه عن فهم أو تعديل الكود.
- تشتت الطالب بين متطلبات قواعد البيانات، وإعدادات البيئة، والمصادقة، وعقود الـ API في آن واحد دون تسلسل منطقي محدد.
- صعوبة تخصيص النماذج المشروحة لأفكار مشاريعهم المتنوعة (عيادة، متجر، حجوزات، منصة دورات)، مما يجعلهم عالقين عند محاولة نقل الشرح إلى مشاريعهم.

---

## Solution

توفير سلسلة برومبتات تعليمية معيارية ومبسطة، مقسمة إلى 9 محطات متسلسلة خطوة بخطوة، تعتمد على نظام **المتغيرات الصريحة بين أقواس** (`[اسم_مشروعك]`، `[فكرة_المشروع]`، `[الكيانات_الأساسية]`، إلخ):
- يدير الطالب مشروعه كـ "مدير مشروع ومراجع" دون الحاجة لكتابة كود البايثون المعقد بيده.
- ترغم البرومبتات وكيل الذكاء الاصطناعي على التوقف لانتظار موافقة الطالب في كل مرحلة، وتشترط المعمارية الطبقية النظيفة (Django Clean Layering)، وتمنع استعلامات N+1 ومشاكل التزامن.
- تغطي السلسلة الدورة الكاملة: من التخطيط الأولي، مروراً بالـ ERD و API، وإعدادات Docker و Supabase، وبناء التطبيقات، وانتهاءً بتغذية البيانات والاختبارات الآلية والمراجعة المستقلة.

---

## User Stories

1. As a beginner student, I want an initial phased planning prompt, so that the AI breaks down my custom project into manageable phases without generating overwhelming code upfront.
2. As a student, I want an explicit ERD generation prompt, so that the AI generates a visual Mermaid relational diagram with prefixed IDs and a state machine for my main entity.
3. As a student, I want an API contracts prompt, so that the AI documents all REST endpoints with camelCase fields and a unified response envelope matching my Next.js frontend.
4. As a student, I want an infrastructure setup prompt, so that the AI configures Docker Compose and `.env.example` targeting Supabase without exposing credentials.
5. As a student, I want a Django common foundation prompt, so that the AI configures CamelCaseJSONRenderer, custom error handling, and pagination before feature code is written.
6. As a student, I want an app layering prompt, so that the AI strictly isolates read queries in `selectors.py` and atomic writes in `services.py`, preventing messy fat views.
7. As a student, I want a data seeder prompt, so that the AI creates a `seed_data` management command with realistic mock records to test my UI immediately.
8. As a student, I want an automated tests prompt, so that the AI writes simple pass/fail behavioral tests for my endpoints and provides the exact terminal command to run them.
9. As a student, I want a code reviewer prompt, so that an independent AI persona checks my backend for N+1 queries, race conditions, and security flaws before submission.
10. As an instructor, I want all prompts standardized with consistent bracketed placeholders, so that every student can use the exact same template regardless of their chosen project domain.
11. As an instructor, I want the prompt sequence integrated into the course documentation, so that learners can navigate from frontend directly into backend scaffolding without friction.

---

## Implementation Decisions

### 1. توحيد جدول المتغيرات العامة
تثبيت جدول متغيرات موحد يملأه الطالب في بداية رحلته:
- `[اسم_مشروعك]`: اسم المشروع المختار.
- `[فكرة_المشروع]`: ملخص الهدف والنطاق في سطرين.
- `[المستخدمين]`: أدوار النظام ومصفوفة الصلاحيات.
- `[الكيانات_الأساسية]`: الجداول المركزية (Entities).
- `[الكيان_الرئيسي]`: الكيان صاحب آلة الحالات (State Machine).
- `[اسم_التطبيق]`: مجلد التطبيق في Django (`apps/[APP_NAME]`).

### 2. معمارية البرومبتات المقيدة (Bounded Prompts)
- تشتمل كافة البرومبتات التأسيسية على جملة حظر صريحة: *"لا تكتب أي كود برمجي تنفيذي الآن؛ فقط وثق المطلوب وتوقف لانتظار موافقتي"*.
- في برومبتات البرمجة (البرومبت 5 و 6)، يُلزم الوكيل بالنمط:
  `Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs`
  مع حظر أي استعلامات N+1 داخل الـ Selectors وإلزام الـ Services بـ `transaction.atomic()`.

### 3. موقع السلسلة في المنصة
- الدليل المرجعي المستقل للطلاب: [STUDENT_BACKEND_PROMPTS_GUIDE.md](file:///home/mahmoud/Desktop/كورس/Ai_agents/docs/STUDENT_BACKEND_PROMPTS_GUIDE.md).
- دمج السلسلة كاملة كملحق مرجعي للطلاب في وثيقة [BACKEND_PARALLEL_EXECUTION_GUIDE.md](file:///home/mahmoud/Desktop/كورس/Ai_agents/docs/BACKEND_PARALLEL_EXECUTION_GUIDE.md#8-مكتبة-البرومبتات-الهندسية-العامة-general-prompts-for-any-learner-project).
- ربط روابط المواضيع (38، 39، 40، 41، 44، 50، 54) مباشرة بأرقام البرومبتات في هذه السلسلة.

---

## Testing Decisions

### 1. مفهوم الاختبار الجيد لهذه السلسلة
- **اختبار فعالية البرومبت (Prompt Efficacy):** تجربة البرومبتات في نافذة سياق فارغة ومحاكاة طالب ذي مستوى مبتدئ، والتأكد من أن مخرجات الوكيل تلتزم بالهيكل المعماري المطلوب دون توليد كود عشوائي.
- **حد الفحص السلوكي (Testing Seams):**
  - **Seam 1 (Prompt Contract Seam):** التأكد من وضوح وسهولة ملء المتغيرات للطلاب وتوليد مخرجات مطابقة للفرونت إند.
  - **Seam 2 (Code Verification Seam):** تشغيل أمر الاختبارات الذي يولده البرومبت 8 والتأكد من خروج النتيجة الخضراء (PASS).

---

## Out of Scope

1. إجبار الطالب على كتابة أكواد SQL يدوية أو إدارة خوادم Linux معقدة.
2. استخدام بوابات دفع إلكتروني خارجية أو خدمات خارجية مدفوعة أثناء التطوير الأساسي.
3. التعديل على قيد الـ 58 موضوعاً الثابت في المنصة.

---

## Further Notes

- هذه السلسلة موجهة خصيصاً للطلاب المبتدئين لتقليل الاحتكاك الذهني وضمان تسليم مشروع تخرج/تدريبي متكامل واحترافي باستخدام الذكاء الاصطناعي.
