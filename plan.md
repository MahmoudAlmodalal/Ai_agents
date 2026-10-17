# MET Academy — خطة ترحيل موقع Weapon of the Era

## مصدر الحقيقة

المرجع الوحيد للمحتوى التعليمي هو `Weapon_of_the_Era_Website_Content_AR.md`. لا تُنشأ محاضرة أو Prompt أو ملف تنزيل أو فيديو غير موجود في المرجع أو المستودع. تُعرض المحاضرة الرابعة بحالة «بانتظار اعتماد المحتوى» فقط.

## نتيجة التدقيق الحالي

- التطبيق Next.js App Router يعمل حاليًا من `src/app/page.tsx` فقط.
- المحتوى الحالي مبني على `TOPICS` وعددها 12 موضوعًا عامًا، ويُعرض داخل `TopicDetailModal` بدل صفحات دروس مستقلة.
- كثير من الموضوعات الحالية تعرض مواد عامة أو مستقبلية لا تطابق النسخة المعتمدة: System Architecture، Backend Layers، Database Performance، QA Matrix، وGolden Rules كمنهج مستقل.
- لا توجد مسارات فعلية لـ`/start`, `/lectures`, `/prompts`, `/diagrams`, `/borrowhub`, `/tools`, `/templates`, `/glossary`, `/faq`, `/about`.
- لا يوجد `manus-routes.json` يصف مجموعة المسارات.
- النسخة الحالية ناجحة في `npm run lint` و`npm run build` قبل التعديل.
- نقاط إعادة الاستخدام المهمة: هوية MET الحالية، `Navbar`, `Footer`, CSS tokens، `MermaidViewer`, أدوات التطبيع والبحث، وWeb Speech API.

## خريطة المحتوى المعتمدة

| الصفحة/المسار | المحتوى الذي سيُعرض |
|---|---|
| `/` | Hero، فلسفة الدورة، الرحلة ذات 7 مراحل، المحاضرات، BorrowHub، الجمهور، CTA |
| `/start` | خطوات البداية، المتطلبات، Agent/Skill/MCP/PRD، مستودع `docs/` |
| `/lectures` | فهرس المحاضرات وحالات النشر والتقدم |
| `/lectures/01-product-discovery` | Grill Me، PRD ذي 27 قسمًا، المفاهيم، التطبيق، الأخطاء، التسليم |
| `/lectures/02-prd-github-user-flow` | مراجعة PRD، PRD vs SRS، Git/GitHub، GitHub Hands-On، User Flow Mermaid |
| `/lectures/03-diagrams-erd` | Domain/UML/ERD، الفرق بين العدسات، BorrowHub، مراجعة قاعدة البيانات |
| `/lectures/04-pending` | حالة غير منشورة: بانتظار اعتماد المحتوى، بلا مادة تعليمية مخترعة |
| `/lectures/05-uiux-stitch-frontend` | UX Discovery، Stitch، Screen Prompts، Prototype، MCP، DESIGN.md، Frontend Plan، Spec Kit، QA |
| `/prompts` | مكتبة بحث/تصفية لـPROMPT 01–30، كل Prompt مستقل مع الهدف والمدخلات والمخرجات والأداة والتحذيرات والكود ونسخ فعلي |
| `/diagrams` | مختبر User Flow وDomain وUse Case وActivity وSequence وState وClass وERD وروابط المحررات الرسمية |
| `/borrowhub` | القصة، الأدوار، قواعد النموذج الأحدث، رحلة الطالب، الملفات المتاحة فقط، مخطط قابل للعرض، تنبيه مراجعة PRD |
| `/tools` | Antigravity، Grill Me، Git/GitHub، Mermaid، PlantUML، dbdiagram، Stitch، Stitch MCP، DESIGN.md، Next.js، UI/UX Pro Max، Spec Kit |
| `/templates` | بطاقات القوالب مع حالة «غير متاح/قريبًا» ما لم يوجد الملف فعليًا |
| `/glossary` | قاموس المصطلحات 30 بندًا مع بحث |
| `/faq` | الأسئلة والأجوبة المعتمدة |
| `/about` | تعريف الدورة وفلسفة التدريب وما يبنيه الطالب |

## نموذج التنفيذ

- إنشاء طبقة بيانات typed في `src/data/courseContent.ts` تستخرج المحتوى من المرجع وتفصل: lectures, prompts, diagrams, tools, glossary, faq, templates.
- استخدام مكونات مشتركة: `SiteShell`, `PageHero`, `StatusBadge`, `SectionCard`, `CopyButton`, `CodeBlock`, `ProgressRail`, `PromptCard`, `ResourceStatus`.
- جعل الصفحات Server Components قدر الإمكان؛ استخدام Client Components فقط للنسخ والبحث والتصفية وMermaid/Web Speech.
- الحفاظ على RTL على مستوى الموقع، ووضع `dir="ltr"` صراحة للأكواد ومخططات Mermaid/PlantUML/DBML والروابط التقنية.
- استبدال موضوعات `TOPICS` العامة من التنقل، مع الإبقاء على المكونات القديمة القابلة لإعادة الاستخدام إلى حين استقرار الصفحات.
- تحديث `public/manus-routes.json` مع كل route فعلي.
- عدم إضافة Backend أو مصادقة أو تتبع دائم أو تنزيلات وهمية.

## الهوية والتصميم

- حركة التصميم: **Editorial engineering lab** — واجهة تعليمية تحريرية تشبه دفتر مختبر هندسي، لا لوحة SaaS عامة.
- بدائل مختصرة: وثائق أكاديمية هادئة (0.07)، مختبر داكن تقني (0.06)، مجلة تعليمية شبكية (0.05). الاختيار: Editorial engineering lab.
- المبادئ: وضوح هرمية المحتوى، كحلي عميق مع أخضر MET كإشارة تقدم، مساحات فاتحة، كتل كود LTR واضحة، وتفاعلات عملية لا زخرفية.
- فلسفة اللون: الكحلي للثقة والصرامة، الأخضر للفعل والإنجاز، الخلفية الفاتحة لقراءة عربية طويلة، والأصفر/العنبر للتحذيرات التحريرية.
- التخطيط: عمود محتوى واسع مع rail جانبي للمرحلة/التقدم، وأقسام متداخلة بدل بطاقات متساوية فقط.
- العناصر المميزة: خط تقدم أخضر، علامات حالة «منشور/بانتظار اعتماد/غير متاح»، وكتل Prompt ذات شريط نسخ مستقل.
- التفاعل: كل زر يدل على فعل حقيقي؛ النسخ يغيّر حالته ويعلن نجاحه، والروابط غير المتاحة معطلة بصريًا ومعلّمة.
- الحركة: انتقالات قصيرة عند الظهور والتصفية، دون حركة تعيق القراءة أو لوحة المفاتيح.
- الخط: خط عربي النظام/`Noto Sans Arabic` إن توفر، مع `ui-monospace` للكود؛ H1 كبير وواضح، H2 متوسط، نص الدرس 1rem–1.1rem.
- جوهر العلامة: «من فكرة موثقة إلى واجهة قابلة للتطوير»؛ الشخصية: عملية، دقيقة، تمكينية.
- الصوت: عناوين مباشرة مثل «لا تبدأ بالكود قبل أن تعرف ما الذي تبنيه» و«انسخ البرومبت، ثم راجع الناتج».
- العلامة: wordmark نصي MET مع خط سفلي أخضر؛ لا نختلق شعار صورة غير موجود.
- اللون المميز: `#0f766e` الأخضر البترولي بجانب الكحلي `#0f172a`.

## الترتيب المرحلي

1. **Foundation**: layout/navigation, route manifest, typed content model, homepage, start, lectures index.
2. **Published lessons**: lecture 01, 02, 03, pending 04, lecture 05 with next/previous/progress.
3. **Prompt Library**: parse all 30 approved prompts, search/filter/copy.
4. **Diagrams + BorrowHub**: diagram matrix, Mermaid preview, official editor links, case study and file availability.
5. **Tools + references**: tools/install, templates, glossary, FAQ, about.
6. **Verification**: links/routes, copy interactions, typecheck/build, responsive/accessibility review, QA report.

## حدود صريحة

- لا نعلن أن المحاضرة 04 مكتملة.
- لا نضيف MVP Development Tasks إلى المحاضرة 02؛ تقسيم Frontend Tasks يبقى في المحاضرة 05.
- لا ننشئ روابط تنزيل لملفات غير موجودة فعليًا.
- لا نعرض Prototype أو Play أو Download وهميًا.
- BorrowHub مثال تعليمي؛ لا تُعمّم قواعده على مشاريع الطلاب.
