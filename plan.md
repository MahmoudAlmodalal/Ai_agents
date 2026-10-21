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

## خريطة المحتوى المعتمدة داخل تقسيم الموضوعات

نحافظ على تجربة الموقع الحالية القائمة على 12 موضوعًا وبطاقات ومودال القراءة، ونستبدل المادة العامة داخلها بالنسخة المعتمدة. لا ننشئ نظام صفحات محاضرات منفصلًا إلا إذا كان ذلك ضروريًا لإعادة استخدام رابط أو وظيفة موجودة.

| الموضوع الحالي | إعادة المواءمة المعتمدة |
|---|---|
| 01 | ابدأ هنا: الفكرة، Agent/Skill/MCP، عدم التخمين، مسار الدورة |
| 02 | Product Discovery وGrill Me واستخراج القرارات |
| 03 | PRD ذي 27 قسمًا + مراجعة المتطلبات |
| 04 | Git/GitHub/User Flow وMermaid؛ دون إدخال MVP Tasks |
| 05 | Database Analysis وERD وقواعد BorrowHub الموثقة |
| 06 | مختبر المخططات: Domain/Use Case/Activity/Sequence/State/Class/ERD |
| 07 | المحاضرة الرابعة: حالة بانتظار اعتماد المحتوى، دون اختلاق درس |
| 08 | UX Discovery وGoogle Stitch وScreen Prompts وPrototype |
| 09 | Stitch MCP وDESIGN.md واستخراج القيم المؤكدة فقط |
| 10 | Frontend-only Next.js Plan وSpec Kit وUI/UX Pro Max |
| 11 | Prompt Library: PROMPT 01–30، بحث وتصفية ونسخ فعلي |
| 12 | BorrowHub + الأدوات والقوالب والقاموس وFAQ وQA المرجعي |

## نموذج التنفيذ

- إنشاء طبقة بيانات typed في `src/data/courseContent.ts` أو تحسين `TOPICS` الحالية، مع فصل metadata عن HTML التفصيلي داخل كل موضوع.
- استخدام مكونات مشتركة: `SiteShell`, `PageHero`, `StatusBadge`, `SectionCard`, `CopyButton`, `CodeBlock`, `ProgressRail`, `PromptCard`, `ResourceStatus`.
- جعل الصفحات Server Components قدر الإمكان؛ استخدام Client Components فقط للنسخ والبحث والتصفية وMermaid/Web Speech.
- الحفاظ على RTL على مستوى الموقع، ووضع `dir="ltr"` صراحة للأكواد ومخططات Mermaid/PlantUML/DBML والروابط التقنية.
- الإبقاء على `TOPICS` و`TopicCard` و`TopicDetailModal` كهيكل أساسي، وإعادة تسمية/إعادة كتابة الموضوعات تدريجيًا وفق الجدول أعلاه؛ لا نحذف الوظائف الحالية مثل البحث والمفضلة والصوت والطباعة.
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
5. **Tools + references**: tools/install, templates, glossary, FAQ, about; يخضع تأليف المحتوى المرجعي للقرار المعماري والوثيقة المرجعية في `docs/TOOLS_AND_REFERENCES_SPEC.md`.
6. **Verification**: links/routes, copy interactions, typecheck/build, responsive/accessibility review, QA report.

## حدود صريحة

- لا نعلن أن المحاضرة 04 مكتملة.
- لا نضيف MVP Development Tasks إلى المحاضرة 02؛ تقسيم Frontend Tasks يبقى في المحاضرة 05.
- لا ننشئ روابط تنزيل لملفات غير موجودة فعليًا.
- لا نعرض Prototype أو Play أو Download وهميًا.
- BorrowHub مثال تعليمي؛ لا تُعمّم قواعده على مشاريع الطلاب.
- موضوعات المسار التعليمي الثمانية والخمسون مستثناة صراحةً من أي تغيير عبر دليل الأدوات والمراجع؛ وتخضع إضافات وتحديثات المحتوى المرجعي للأدوات والمراجع لشرط التحقق الموثق والقرار المعماري في [docs/TOOLS_AND_REFERENCES_SPEC.md](docs/TOOLS_AND_REFERENCES_SPEC.md). لا يُعتبر هذا القرار تفويضًا عامًا بتعديل المنهج أو تغيير موضوعات المسار المعتمدة.
