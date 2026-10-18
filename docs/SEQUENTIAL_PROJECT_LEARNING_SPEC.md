# مواصفة: تحويل موقع سلاح العصر إلى مسار مواضيع متسلسلة لبناء مشروع الطالب

الحالة: حُولت المواصفة إلى 27 تذكرة معتمدة ومنشورة على GitHub بوسم ready-for-agent؛ لم يبدأ تنفيذ تغييرات الموقع.
النطاق: تحديث محتوى الموقع التعليمي وتنظيمه ووظائف قراءته، وليس تنفيذ مشاريع الطلاب.
تستند المواصفة إلى الملف المرفق وتصحيحات المستخدم اللاحقة، وتسبق التصحيحات أي تقسيم مخالف في المراجع القديمة.

## Problem Statement

لا يستطيع الطالب اتباع مسار موثوق لبناء مشروعه من الموقع الحالي. فالرئيسية ومسار القراءة يعتمدان فهرسين مختلفين، وتوجد بطاقات لا تطابق محتواها، وأوصاف وأعداد برومبتات غير دقيقة، وروابط تنقل لصفحات غير منفذة. يعكس بعض التخطيط القديم نطاق Frontend فقط، بينما المادة الجديدة تصف رحلة Full-Stack حتى النشر والعرض.

تقسيم المحتوى وفق مواضيع الدورة المجمعة أو المحاور الثابتة لا يحقق طلب المستخدم: لكل تقنية أو مفهوم أو مخرج موضوع مستقل، وتُرتب المواضيع بحسب الخطوات التي ينفذها الطالب على مشروع واحد. تقديم أدوات التنفيذ قبل أن يصل الطالب إلى كود الفرونت يزيد التشتيت ويحمّل البداية تجهيزات غير مطلوبة.

## Solution

تقديم مسار مشروع واحد بمواضيع مستقلة ومتتابعة، يبدأ بالفكرة واكتشاف المتطلبات والتوثيق، ثم المخططات وتصميم التجربة، وبعد اعتماد التصميم يبدأ إعداد أدوات كود الفرونت والتنفيذ، ثم Backend والتكامل والفحص والنشر والتسليم والعرض.

كل موضوع يقدم هدفًا ومتطلبات سابقة وشرحًا وخطوات تطبيق على مشروع الطالب وبرومبتات مرتبطة ومخرجًا قابلًا للمراجعة وقائمة تحقق. يرى الطالب الترتيب نفسه في الفهرس والبطاقات والقراءة والتنقل السابق والتالي. تظل المراجع متاحة طوال الرحلة، وBorrowHub مثالًا مرافقًا له قواعد خاصة به.

قرارات التنظيم والفصل وتأخير أدوات التنفيذ مؤكدة من المستخدم. القائمة التالية خريطة العمل الحالية المراجعة مع المستخدم، وليست قيدًا على عدد المواضيع أو إعلانًا أن جميع تفاصيلها أو بدائلها اعتُمدت نهائيًا:

1. اختيار فكرة المشروع وتحديد MVP
2. Grill Me
3. PRD
4. SRS
5. Git
6. GitHub
7. Mermaid
8. User Flow
9. Domain Model
10. PlantUML
11. Use Case Diagram
12. Activity Diagram
13. State Diagram
14. ERD
15. DBML وdbdiagram.io
16. Sequence Diagram
17. Class Diagram
18. UI/UX
19. UX Blueprint
20. Screen Inventory
21. Google Stitch
22. Design System
23. Prototype
24. AI Coding Agent
25. Google AI Studio
26. Skills
27. MCP
28. Stitch MCP
29. DESIGN.md
30. TypeScript
31. React
32. Tailwind CSS
33. Next.js
34. Frontend Planning
35. UI/UX Pro Max
36. Spec Kit
37. تنفيذ Frontend
38. Python
39. PostgreSQL
40. معمارية Backend وعقود API
41. Django
42. FastAPI
43. المصادقة والصلاحيات
44. Services وSelectors
45. ربط Frontend مع Backend
46. Testing
47. هندسة أداء قاعدة البيانات
48. Redis
49. QA
50. Docker
51. Linux
52. Vercel
53. Netlify
54. نشر Backend وقاعدة البيانات
55. CI/CD والمراقبة والنسخ الاحتياطي
56. توثيق وتسليم المشروع
57. Demo Day
58. Portfolio

Django وFastAPI موضوعان مستقلان يمثلان بديلين للخادم؛ Vercel وNetlify موضوعان مستقلان يمثلان بديلين لنشر الواجهة. لا ينفذ الطالب المنتج مرتين. أدوات مثل Redis ومسار استضافة Linux تظهر عند الحاجة، ولا يُفرض اعتماد بديل افتراضي لم يحسمه المستخدم.

## User Stories

1. As a learner, I want a single ordered list of topics, so that I know exactly where to start and what comes next.
2. As a learner, I want each technology to have its own topic, so that I can learn and revisit it without searching through unrelated material.
3. As a learner, I want each major concept and diagram type to have its own topic, so that I understand its purpose and output.
4. As a learner, I want the sequence to follow project dependencies, so that I never need a document that has not yet been created.
5. As a learner, I want to choose one project at the start, so that every practical step contributes to the same product.
6. As a learner, I want to define the problem, users and MVP first, so that I avoid building an undefined product.
7. As a learner, I want to complete product discovery before generating requirements, so that the documents reflect my decisions.
8. As a learner, I want confirmed decisions separated from assumptions and open questions, so that AI output does not silently become a business rule.
9. As a learner, I want separate PRD and SRS guidance, so that I understand product requirements and detailed system behavior.
10. As a learner, I want early steps that work without installing coding agents, skills or MCP connections, so that tooling does not block discovery.
11. As a learner, I want Git and GitHub introduced when saving project documentation, so that I can preserve and review my work.
12. As a learner, I want drawing tools explained immediately before their diagrams, so that I can use the right format and editor.
13. As a learner, I want a conceptual Domain Model that stays separate from database design, so that concepts are not confused with tables.
14. As a learner, I want to create ERD and Sequence diagrams before the Class Diagram, so that design inputs are available.
15. As a learner, I want screen planning before visual design, so that my product has the required roles, journeys and states.
16. As a learner, I want to approve one representative screen and a shared design system before expanding the design, so that screens remain consistent.
17. As a learner, I want to test a prototype before coding, so that I can correct navigation and interaction issues early.
18. As a learner, I want coding-agent setup, execution skills and MCP setup at the start of Frontend coding, so that I learn them when I need them.
19. As a learner, I want Google AI Studio's execution workflow alongside the Frontend tools, so that it does not distract from early requirements work.
20. As a learner, I want Stitch MCP after approved visual designs and basic MCP setup, so that there is an actual design reference to retrieve.
21. As a learner, I want DESIGN.md to reflect approved design values, so that implementation follows the real visual decisions.
22. As a learner, I want TypeScript, React, Tailwind CSS and Next.js as separate sequential topics, so that the implementation stack has understandable prerequisites.
23. As a learner, I want an explicit Frontend plan and small verifiable tasks, so that I can build incrementally.
24. As a learner, I want UI/UX Pro Max and Spec Kit explained at their execution steps, so that I can apply them to the current task.
25. As a learner, I want temporary Frontend data clearly identified, so that a prototype is not mistaken for a working integrated product.
26. As a learner, I want Python, PostgreSQL, Backend architecture and API contracts explained before server implementation, so that the server follows the project requirements.
27. As a learner, I want alternative server frameworks identified as alternatives, so that I do not rebuild the same Backend twice.
28. As a learner, I want authentication, permissions, business logic and data access explained with project examples, so that the integrated product follows its rules.
29. As a learner, I want to replace temporary data with real API interactions, so that the same project becomes a working Full-Stack product.
30. As a learner, I want continuous checks and a final integrated testing step, so that errors are found throughout development.
31. As a learner, I want optional tools such as Redis tied to a documented project need, so that I do not add infrastructure without a reason.
32. As a learner, I want deployment alternatives identified clearly, so that I publish through one suitable path.
33. As a learner, I want guidance for both Frontend and Backend deployment, so that a live interface is not confused with a deployed product.
34. As a learner, I want a final handoff, live demonstration and Portfolio step, so that I can present and share the completed work.
35. As a learner, I want prerequisites, numbered practical steps, prompts, expected outputs and a completion checklist in each topic, so that I know what to do and when to continue.
36. As a learner, I want previous and next links to match the topic index, so that all navigation follows the same sequence.
37. As a learner, I want cards, full topic pages and the modal reader to describe the same topic, so that I do not receive conflicting instructions.
38. As a learner, I want accurate topic titles, summaries, tags, categories and prompt counts, so that search and filtering lead to the right content.
39. As a learner, I want searchable prompts with their purpose, inputs, outputs and a working copy action, so that I can use the correct prompt for the current step.
40. As a learner, I want the source-backed collection of 33 prompts accessible from relevant topics, so that the added Backend and deployment guidance is available.
41. As a learner, I want BorrowHub examples alongside each relevant step, so that I can compare the method with my own project.
42. As a learner, I want BorrowHub's rules clearly distinguished from generic guidance, so that I do not accidentally copy requirements into my product.
43. As a learner, I want tools, templates, glossary entries and FAQs available during the journey, so that I can resolve questions without waiting for a final reference lesson.
44. As a learner, I want downloads and resource links to reflect actual availability, so that I do not encounter fake or broken actions.
45. As a returning learner, I want saved topics and recently viewed entries to retain their meaning after reordering, so that my history does not silently point to unrelated content.
46. As a learner, I want old links to reach a relevant current topic or a useful index, so that restructuring does not strand existing bookmarks.
47. As an Arabic-speaking learner, I want RTL explanations and LTR code and diagram source, so that both remain readable.
48. As a mobile or keyboard user, I want accessible, responsive topic navigation and reading controls, so that I can complete the same learning journey.
49. As a learner, I want favorites, search, filtering, audio reading, print and theme controls to remain usable, so that the update preserves the ways I already study.
50. As a prospective learner, I want the homepage and program information to describe the updated practical journey accurately, so that I understand the program's outcome.
51. As an instructor, I want publication and verification statuses that reflect reality, so that I do not present missing material or untested behavior as complete.
52. As a content maintainer, I want one consistent topic catalog and clearly ranked content authorities, so that the same mismatch does not return during future edits.

## Implementation Decisions

### قرارات مؤكدة من المستخدم

- وحدة التنظيم الأساسية هي الموضوع التعليمي المستقل، ويشمل تقنية أو مفهومًا أو مخرجًا أو نوع مخطط.
- لا يُفرض تقسيم المحاور الستة أو قائمة المواضيع الـ16 على فهرس التعلم، ولا تُستخدم المحاضرات أساسًا للتنقل.
- تُرتب المواضيع وفق اعتماديات العمل على مشروع المتدرّب، لا وفق ترتيب مواد الدورة القديمة.
- يتبع الطالب الخطوات لبناء مشروعه تدريجيًا؛ لا يقتصر الموقع على موسوعة تعريفية بالأدوات.
- تنتقل إعدادات أدوات التنفيذ المبكرة إلى وقت بدء كود الفرونت. تطبيق هذا القرار في خريطة العمل ينقل وكيل البرمجة وGoogle AI Studio وSkills وMCP إلى ما بعد اعتماد التصميم.
- يكون كل نوع مخطط موضوعًا مستقلًا، مع إتاحة مدخلاته قبل توليده.
- لا تعد الدعوة إلى صياغة هذه المواصفة طلبًا لتنفيذ تغييرات الموقع أو نشر المنتج.

### قرارات تنفيذية مقترحة لتحقيق السلوك المطلوب

- توحيد هوية الموضوع وترتيبه وبياناته بين فهرس الرئيسية وقراءة الموضوع ومكتبة البرومبتات؛ تُعاد الاستفادة من مكونات القراءة والبحث والتصفية والعرض الموجودة.
- يعتمد الموضوع معرّفًا ثابتًا لا يتغير مع موقعه في القائمة، وترتيبًا منفصلًا، وهدفًا ومتطلبات سابقة وخطوات ومخرجات وقائمة تحقق وروابط برومبتات وحالة نشر.
- يعرض القارئ المختصر وصفحة القراءة الكاملة المادة نفسها للموضوع المختار، وتطابق بيانات البطاقة محتواها.
- تُراجع المواضيع التي لا تطابق عناوينها محتواها، وتصحح بيانات مكتبة البرومبتات التي ما زالت تصف QA رغم صحة محتواها الفعلي.
- تُحفظ المفضلة وسجلات المشاهدة القديمة بمعناها الصحيح عبر مطابقة صريحة عند توفرها؛ لا تُربط المعرّفات القديمة تلقائيًا بمواضيع جديدة لمجرد تشابه رقم الترتيب. عند تعذر المطابقة، يُعرض وضع واضح غير مضلل دون تحويلها لمحتوى مختلف.
- ترتبط البرومبتات بالمواضيع وفق وظيفتها ومدخلاتها ومخرجاتها، مع استكمال البرومبتات الإضافية الموثقة في المرفق. تُشتق الأعداد المعروضة من السجلات الفعلية.
- يبقى نص البرومبت المعتمد قابلًا للنسخ كاملًا، ولا تُعدل قواعد العمل فيه بصمت لحل تعارض.
- تكون الفكرة وGrill Me وPRD وSRS قابلة للإنجاز دون تثبيت بيئة وكيل برمجة أو مهارات تنفيذ. يأتي Git وGitHub مبكرًا لحفظ الوثائق؛ هذه مواضع تطبيق مقترحة لقاعدة الاستخدام عند الحاجة.
- يسبق شرح أداة الرسم استخدامها، ويبقى Domain Model مفاهيميًا؛ يسبق ERD وSequence مخطط Class.
- يسبق جرد الشاشات التصميم، وتسبق الشاشة المرجعية تعميم نظام التصميم، ويسبق اعتماد التصميم نقل مرجعه إلى أدوات التنفيذ.
- تظل التقنية المختارة لخادم مشروع الطالب ومنصة استضافته بدائل تعليمية مفتوحة، ولا تتحول إلى اعتماديات جديدة للموقع التعليمي.
- يُستكمل المحتوى المرجعي وصفحات البدء والمخططات والأدوات والقوالب والقاموس والأسئلة والأمثلة وتعريف البرنامج المطلوبة في المادة الأصلية. تُزال الروابط الوهمية أو تستبدل بحالة توفر واضحة.
- يُحدّث وصف البرنامج ومخرجاته بما ينسجم مع رحلة Full-Stack. يمكن إبقاء معلومات البرنامج الرسمية بيانات تعريفية، دون جعلها تقسيمًا ملزمًا لفهرس التعلم. لا تُخترع ساعات لكل موضوع.
- تبقى واجهة الموقع عربية RTL، وتُعرض الأكواد والبرومبتات ومصادر المخططات LTR. تُحفظ وظائف البحث والتصفية والمفضلة والصوت والثيم والطباعة والقراءة.
- تُراجع الصفحات القديمة وتوجّه للوجهة الصحيحة؛ لا تُترك صفحة انتظار محاضرة مرئية ولا يُفترض وجود صفحة فهرس غير منفذة.
- تبقى المراجع القديمة محفوظة بوصفها مصادر؛ تُحدّث خطط التنفيذ المتعارضة لتوضح أولوية قرارات المستخدم الأخيرة.
- لا يتطلب هذا النطاق قاعدة بيانات أو حسابات أو API جديدة للموقع التعليمي؛ Backend في هذه المواصفة محتوى يتعلمه الطالب على مشروعه.

## Testing Decisions

### نقاط التحقق المعتمدة

اعتمد المستخدم اختبار رحلة الطالب عبر واجهة الموقع، من الفهرس إلى قراءة الموضوع والانتقال للموضوع التالي ونسخ برومبتاته والرجوع إلى العناصر المحفوظة، وأضاف صراحةً: «أضف أيضًا مراجعة تعليمية يدوية لمخرجات كل موضوع».

يختبر الفحص السلوك المرئي للمستخدم، لا أسماء المصفوفات أو عدد المكونات أو النص الخام لملفات المصدر. يُفضّل مسار تكاملي واحد يغطي الفهرس وقارئي المحتوى والتنقل والبرومبتات والمراجع، مع حالات بيانات تغطي الرجوع بعد الترحيل، بدل توزيع اختبارات تعكس تفاصيل التنفيذ.

المراجعة التعليمية اليدوية مطلوبة لكل موضوع منشور، إلى جانب فحص رحلة الموقع. يتحقق المراجع من توفر المدخلات من المواضيع السابقة، واتساق الهدف والشرح والبرومبت والخطوات، وقابلية تطبيقها على مشروع الطالب، وصحة المخرج وكفايته للخطوة التالية. في البدائل والمواضيع المشروطة، يتحقق من وضوح متى يُختار الموضوع أو يُتجاوز دون فقد مدخل ضروري.

يسجّل تقرير المراجعة لكل موضوع: هويته، والمخرج المتوقع، ودليل فحص المخرج أو تجربته، والنتيجة، والفجوات والإجراء التصحيحي. تكون النتيجة Passed أو Failed أو Not Run؛ تُعالج الفجوة التي تمنع متابعة المشروع قبل اعتماد الموضوع، ولا تعني إعادة صياغة الشرح وحدها نجاح المراجعة. هذه مراجعة جودة للمحتوى التعليمي، وليست نظام تصحيح واجبات أو إلزامًا بتسليم مشاريع الطلاب.

### معايير القبول التي ستتحقق منها الاختبارات

- عند فتح الفهرس والانتقال إلى موضوع ثم التالي، تتطابق الهوية والمحتوى والترتيب في الواجهات المختلفة، ويتعامل أول موضوع وآخر موضوع مع حدود التنقل بوضوح.
- عند مقارنة تسلسل المتطلبات السابقة، لا يحتاج أي موضوع إلى مخرج تعليمي لم يتح إنجازه قبله؛ وخصوصًا مدخلات Class Diagram وأدوات ربط التصميم.
- عند بدء المسار، يستطيع الطالب إكمال التحليل والتوثيق قبل إعداد أدوات كود الفرونت؛ تظهر أدوات التنفيذ في موضع استخدامها بعد التصميم.
- عند البحث والتصفية، يطابق المحتوى المعروض عنوانه وبياناته، ولا تعود بطاقة مكتبة البرومبتات إلى تصنيف QA الخاطئ.
- عند نسخ برومبت، يطابق النص المنسوخ البرومبت الكامل ويظهر تأكيد قابل للإدراك. تُعرض مدخلاته ومخرجاته، وتتطابق أعداد المكتبة مع سجلاتها.
- عند فتح موضوع قديم محفوظ قبل إعادة التنظيم، يصل الطالب إلى المحتوى المقابل الصحيح أو إلى حالة واضحة غير مضللة؛ لا يُختبر حفظ الرقم وحده.
- عند فتح رابط تعليمي قديم أو مرجع أو زر تنزيل، يصل الطالب إلى وجهة موجودة أو يرى حالة عدم توفر صريحة؛ لا توجد إجراءات تفاعلية وهمية.
- يستطيع الطالب استخدام لوحة المفاتيح والقراءة على الشاشات المستهدفة دون فقدان التنقل أو تداخل المحتوى، ويُحفظ اتجاه الأكواد.
- تظل المفضلة وسجل المشاهدة والثيم والصوت والطباعة تعمل ضمن قدرات المتصفح المتاحة. عند فحص الصوت يُختبر وجود دعم المتصفح والتعامل مع عدم توفره، ولا يُدّعى نجاح تشغيل مسموع لم يُفحص.
- يُراجع محتوى BorrowHub والضوابط المفاهيمية والمراجع مراجعة تعليمية فعلية؛ نجاح البناء أو الرسم نحويًا لا يثبت صحة المحتوى.
- لا تُعرض مادة ناقصة أو فحص غير منفذ بوصفه مكتملًا.

### الاختبارات القائمة وما يتغير فيها

يوجد إطار تحقق مخصص على مستويات متعددة، لكن بعض توقعاته ما زال يتطلب تنظيم المحاضرات وصفحة الانتظار. لا تُعامل تسميته E2E دليلًا على اختبار سلوك المتصفح؛ يجب فحص ما ينفذه فعلًا، وإعادة استخدام أجزائه السلوكية المناسبة وتحديث التوقعات المتقادمة. فحص وجود ملف أو نص وحده لا يحقق رحلة الطالب المقترحة.

التحقق المعلن حاليًا يتضمن TypeScript وبناء الإنتاج؛ وهما فحصا سلامة تكميليان، لا بديلان عن اختبار المستخدم. لا توجد أداة اختبار متصفح معلنة اعتمادًا مباشرًا في إعداد حزم المشروع الذي تمت مراجعته؛ ظهور أداة ضمن اعتماد انتقالي لا يعني وجود حزمة اختبارات عاملة. عند الحاجة يقترح أصغر إعداد متصفح يختبر الرحلة نفسها دون إضافة اختبارات لكل عنصر عرض.

الفحص المتجاوب يستهدف العروض الواردة في المرجع: 390 و768 و1024 و1366 و1440 بكسل، مع التركيز على الوصول والتنقل وعدم التدفق الأفقي. تُسجّل النتائج بصراحة Passed أو Failed أو Not Run.

لم تُشغل اختبارات التطبيق أو البناء أثناء إعداد هذه المواصفة؛ العمل الحالي توثيق فقط.

## Out of Scope

- الالتزام بستة محاور أو 16 موضوعًا أو تثبيت عدد 58 بوصفه شرط قبول؛ العدد نتيجة تفصيل المسار.
- توزيع المواضيع على جدول أسابيع أو تعديل مدة البرنامج أو الادعاء أن التفصيل الحالي قد تمت ملاءمته زمنيًا.
- إنشاء نظام حسابات وتسجيل طلاب أو قفل التقدم أو إلزام رفع الواجبات أو مزامنة تقدم عبر خادم.
- بناء مشروع BorrowHub تشغيليًا أو إنشاء Backend للموقع التعليمي أو تنفيذ مشاريع الطلاب نيابة عنهم.
- فرض Django أو FastAPI، أو Vercel أو Netlify، أو إجبار الطالب على تنفيذ البديلين.
- تشغيل تثبيت أدوات على جهاز الطالب أو المستخدم، أو توفير خدمات سحابية أو نشر المنتج من خلال كتابة هذه المواصفة.
- إعادة تصميم هوية MET أو إضافة مكتبات وتجريدات لا يحتاجها توحيد المسار.
- حذف محتوى صحيح من المراجع القديمة لمجرد أنه لا يناسب مكانه السابق؛ يُعاد تصنيفه وفق وظيفته ومصدره.
- اختراع ملفات دراسة حالة أو قوالب قابلة للتنزيل أو مفاتيح خدمة أو سياسات برنامج غير متاحة.
- اعتماد ADR لقرار لم يجمع شروط التكلفة العالية للرجوع ووجود مفاضلة فعلية والسياق الذي يحتاجه القارئ مستقبلًا.

## Further Notes

- مصدر المصطلحات هو [قاموس المشروع](../GLOSSARY.md)، وتاريخ القرارات في [سجل المقابلة](CONTENT_RESTRUCTURING_INTERVIEW.md).
- تفاصيل التطبيق والمخرجات لكل موضوع في [خريطة المسار](PROJECT_LEARNING_SEQUENCE.md)، وتذاكر التنفيذ المنشورة وروابط اعتمادياتها في [فهرس التذاكر](TICKET_BREAKDOWN_REVIEW.md).
- أكد المستخدم GitHub وجهةً للنشر واعتمد تقسيم التذاكر. نُشرت التذاكر من #5 إلى #31 في مستودع المشروع بوسم ready-for-agent، وتحقق تطابق 51 علاقة حجب فعلية مع التقسيم المعتمد.
- تأكدت نقاط الاختبار من المستخدم: رحلة الموقع والمراجعة التعليمية اليدوية لكل موضوع. نشر التذاكر لا يعني تنفيذ الاختبارات أو مراجعات المحتوى أو اكتمال العمل.
- ما يزال تحديد البدائل الافتراضية للخادم والاستضافة وعمق المحتوى ضمن الساعات المتاحة مفتوحًا، ويجب ألا تحسمه مرحلة التنفيذ بصمت.
- الأولوية عند التعارض: توجيهات المستخدم في المحادثة، ثم المرفق في البنود التي لم يصححها المستخدم، ثم المراجع القديمة التي تتفق معهما.
