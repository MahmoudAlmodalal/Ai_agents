# مواصفات تبسيط تجربة المتعلم وأدوات السقالات التفاعلية للذكاء الاصطناعي
## (Learner Experience Simplification & Interactive AI Scaffolding Spec)

## Problem Statement

يواجه الطلاب المبتدئون والمتعلمون ذوو الخلفية البرمجية الضعيفة تحديات ملموسة عند دراسة مسار هندسة البرمجيات بالذكاء الاصطناعي:
1. **صعوبة استبدال المتغيرات يدوياً:** تكرار نسخ وتعديل المتغيرات (`[PROJECT_NAME]`، `[CORE_ENTITIES]`، إلخ) عبر 9 برومبتات مختلفة يؤدي إلى أخطاء شائعة وتكاسل وفقدان التركيز.
2. **غياب حس المراجعة والتحكيم:** يعجز الطالب المبتدئ عن معرفة متى يوافق على مخرجات الوكيل ومتى يرفضها، مما يجعله يعتمد بشكل أعمى على أكواد قد تكون محشوة (Fat Views) أو غير آمنة.
3. **الارتباك عند انحراف الوكيل:** عندما يخرج وكيل البرمجة عن المعمارية أو يتجاوز نطاقه، يفتقر الطالب إلى برومبتات طوارئ تعيد ضبط الوكيل وتمنعه من تخريب المشروع.
4. **الخوف من أخطاء بيئة التشغيل:** تكرار أخطاء الاتصال بقاعدة البيانات أو CORS أو تضارب ملفات التهجير يربك المتعلم ويوقف تقدمه دون مرجع فوري سريع للإنقاذ.

---

## Solution

بناء منظومة متكاملة لتبسيط تجربة المتعلم ودعمه بأدوات سقالات تفاعلية (Interactive Scaffolding Tools) مدمجة في المنصة:
1. **مولّد البرومبتات التفاعلي (Interactive Prompt Customizer):** واجهة ويب سريعة يدخل فيها الطالب تفاصيل مشروعه مرة واحدة، لتُحقن ديناميكياً داخل كافة البرومبتات مع أزرار نسخ فورية.
2. **بطاقات المقارنة "افعل ولا تفعل" (Do & Don't Guidance):** مقارنات مرئية ترشد المتعلم لأساليب التوجيه السليمة وتجنبه الأخطاء الفادحة.
3. **قوائم التحقق المسبق للاعتماد (Pre-Approval Checklists):** معايير واضحة وسريعة يفحصها الطالب قبل قبول عمل الوكيل ودمجه.
4. **كتيب الطوارئ والإنقاذ بضغطة زر (Emergency Reset & Troubleshooting):** برومبتات مخصصة لإعادة ضبط الوكيل وحل أشهر 5 أخطاء شائعة في بيئات Django وSupabase وDocker.
5. **خارطة الطريق البصرية الموحدة (Visual Project Lifecycle Roadmap):** مخطط بصري يوضح تسلسل الخطوات الهندسية من فكرة PRD حتى النشر السحابي.

---

## User Stories

1. As a beginner student, I want to input my project details once in an interactive prompt customizer, so that all 9 backend prompts are dynamically generated with my specific domain terms.
2. As a student, I want a single-click copy button on every tailored prompt, so that I can paste it into my AI coding agent without manual editing errors.
3. As a student, I want my entered project configuration saved in local storage, so that I don't have to re-type my project details every time I revisit the platform.
4. As a student, I want a reset button in the prompt customizer, so that I can clear my inputs and start over or experiment with a different project idea.
5. As an orchestrator-in-training, I want a pre-approval checklist for each stage, so that I know exactly what code smells or architectural violations to verify before saying yes to the agent.
6. As a student, I want a standardized Emergency Reset Prompt, so that I can immediately stop the AI when it produces monolithic views or violates layered architecture.
7. As a student, I want a common runtime errors cheat sheet, so that I can quickly resolve Postgres connection failures, CORS mismatches, or migration conflicts with ready-made repair prompts.
8. As a visual learner, I want clear "Do and Don't" comparison cards across topics, so that I can immediately contrast effective targeted prompting with vague anti-patterns.
9. As a student, I want real-world analogies for abstract technical terms (e.g. comparing Selectors to a restaurant menu reader and Services to the kitchen workflow), so that I can conceptualize technical layers effortlessly.
10. As a learner, I want a dual case study switcher (Candy Loz e-commerce vs BorrowHub peer lending), so that I can see how identical architectural rules apply to both transactional and lifecycle-heavy domains.
11. As an instructor, I want an end-to-end visual infographic linking all 58 curriculum topics to project phases, so that learners understand how their daily lessons contribute to their final graduation system.
12. As a student navigating on mobile or desktop, I want all interactive tools and checklists to be fully responsive and RTL-native, so that the learning experience remains seamless on any device.

---

## Implementation Decisions

### 1. معمارية الأدوات التفاعلية (Client-Only Architecture)
- بناء المكونات التفاعلية كعناصر واجهة مستخدم نقية (Client Components) داخل Next.js دون أي مسارات خادم (Zero API Routes / Zero Backend).
- حفظ تفضيلات ومدخلات الطالب ومشاريعه في المتصفح حصراً عبر `localStorage` مع ضمان التحميل الآمن وحماية البيانات من التلف.

### 2. تصميم مولّد البرومبتات وتوحيد القوالب
- فصل قوالب البرومبتات في مصفوفة بيانات مهيكلة، تحتوي كل منها على العنوان، والهدف، والقالب الخام، وقائمة المتغيرات المعتمدة.
- استبدال المعرفات ديناميكياً لحظة إدخال الطالب لأي حرف، مع تمييز الحقول المعبأة بلون مخصص لإعطاء رد فعل بصري فوري.

### 3. تكامل بطاقات الإرشاد والدعم مع الدروس الحالية
- إدراج بطاقات "افعل ولا تفعل" وقوائم التحقق المسبق كعناصر إيضاحية مدمجة (Callouts & Checklists) داخل مواضيع المسار ذات الصلة (المواضيع 26، 38، 39، 40، 41، 44، 50، 54).
- الحفاظ المطلق على قيد الـ 58 موضوعاً الكنسي وعدم استحداث أي مواضيع جديدة خارج الهيكل المعتمد.

### 4. دعم التوافقية وإمكانية الوصول (Accessibility & RTL)
- توفير نصوص بديلة لكافة الأيقونات ومراعاة التباين اللوني وفق معايير WCAG AA.
- دعم كامل للغة العربية واتجاه اليمين إلى اليسار (`RTL`) مع عزل كتل الأكواد والبرومبتات بـ `dir="ltr"` الصريح.

---

## Testing Decisions

### 1. مفهوم الاختبار الجيد لهذه المنظومة
- **اختبار السلوك الخارجي فقط:** التحقق من مطابقة النصوص المولدة وتفاعلات الحفظ والاسترجاع دون اختبار التفاصيل الداخلية للمكونات.
- **حدود الفحص المعتمدة (Testing Seams):**
  - **Seam 1 (Prompt Template & Replacement Seam):** التأكد من أن دوال التعويض تستبدل كافة المتغيرات بدون ترك أي حقول فارغة أو وسوم مفقودة.
  - **Seam 2 (Storage & Resilience Seam):** اختبار حفظ مدخلات الطالب في `localStorage` والتعافي الآمن عند وجود بيانات تالفة أو تعذر التخزين.
  - **Seam 3 (Curriculum Invariant Seam):** تشغيل حزمة اختبارات المنصة لضمان بقاء المواضيع الـ 58 دون أي حيود في البصمات `learning-content-hashes.json`.

---

## Out of Scope

1. إنشاء واجهات خادم خلفية أو قواعد بيانات مركزية لحفظ مشاريع الطلاب (تطبيق مبدأ الخصوصية المحلية الكاملة).
2. استدعاء نماذج الذكاء الاصطناعي السحابية مباشرة من المتصفح (تطبيق مبدأ عدم فرض اشتراكات أو تكاليف).
3. المساس بهيكل المواضيع الـ 58 أو تغيير عناوين المواضيع الأساسية المعتمدة في المنصة.

---

## Further Notes

- هذه المواصفة تمثل جسر العبور الحاسم الذي يحول المعرفة النظرية العميقة إلى تجربة تطبيقية ميسرة تمكّن حتى أضعف الطلاب من إنجاز مشاريع تخرج وهندسة برمجيات احترافية ومكتملة بالذكاء الاصطناعي.
