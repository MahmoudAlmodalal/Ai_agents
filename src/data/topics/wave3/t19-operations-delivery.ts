import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

const operationsHtml = `
<section id="topic-55-operations" class="topic-section">
  <div class="step-badge-group"><span class="stage-tag">الموضوع 55 · التشغيل بعد النشر</span><span class="step-pill">تحديثات وسجلات ونسخ واستعادة وتراجع</span></div>
  <div class="step-header"><div class="step-title-wrap"><h2 class="step-title">CI/CD والمراقبة والنسخ الاحتياطي لمشروع الطالب</h2><div class="step-subtitle">وثّق إجراءات التشغيل بحسب ما تدعمه الاستضافة التي اخترتها</div></div></div>
  <div class="callout warning my-6"><div class="callout-header"><span class="callout-icon">⚠️</span><span>ابدأ بقدرات الاستضافة الفعلية</span></div><p class="leading-7">لا تفترض أن المنصة توفر CI/CD أو تنبيهات أو سجلات دائمة أو نسخًا آلية أو استعادة بنقرة واحدة. راجع وثائق الخطة والإعداد الذي تستخدمه، وسجّل القدرة المتاحة وحدودها وما تحققت منه. إذا لم تتوفر ميزة، اكتب ذلك وخطة يدوية آمنة أو قيدًا واضحًا؛ لا تصفها كأنها تعمل.</p></div>
  <div class="content-block"><h3 class="text-xl font-black mb-3">1. افصل الفحص عن النشر</h3><p class="leading-8">CI يشغّل الفحوص التي يعرّفها المشروع عند تغيير الكود. CD قد يجهّز إصدارًا أو ينشره آليًا، لكن معناه وحدوده يعتمدان على إعداد المستودع والمنصة. ابدأ بكتابة مسار التحديث الحالي: من يراجع التغيير، وما الفحوص التي تعمل، ومن يوافق على النشر، وكيف تحدد الإصدار الحي. لا تضف نشرًا آليًا قبل معرفة صلاحياته وطريقة إيقافه.</p><ol class="list-decimal list-inside space-y-2 leading-8 pr-4"><li>اختر فحوصًا قابلة للتكرار من مشروعك، مثل فحص الأنواع والاختبارات والبناء، واكتب الأمر الفعلي ونتيجته وتاريخه.</li><li>إذا كانت بيئتك تدعم staging، استخدمها لمراجعة التغيير قبل الإنتاج، ولا تعتبرها موجودة قبل التحقق.</li><li>وثّق طريقة إيقاف النشر أو العودة لإصدار تطبيق سابق والمسؤول المخول وخطوة التحقق بعد ذلك.</li></ol></div>
  <div class="content-block mt-8"><h3 class="text-xl font-black mb-3">2. اقرأ السجلات مع حماية الخصوصية</h3><p class="leading-8">حدّد مكان سجلات الواجهة والخادم وقاعدة البيانات في إعدادك، ومن يستطيع الوصول إليها، ومدة الاحتفاظ بها إن كانت موثقة. استخدمها لتحديد وقت الخطأ والإصدار والطلب المتأثر. لا تنسخ كلمات مرور أو رموز جلسات أو بيانات شخصية إلى سجل أو تقرير عام. لا تسمّ السجلات مراقبة كاملة إن لم يوجد مقياس أو تنبيه فعلي.</p><div class="overflow-x-auto my-5"><table class="min-w-full text-sm border-collapse"><thead><tr><th class="border p-3 text-right">العنصر</th><th class="border p-3 text-right">دليل التحقق</th><th class="border p-3 text-right">ما لا تفترضه</th></tr></thead><tbody><tr><td class="border p-3">مصدر السجلات</td><td class="border p-3">لوحة المنصة أو سجل التطبيق بعد التحقق</td><td class="border p-3">مدة احتفاظ واحدة لكل الخطط</td></tr><tr><td class="border p-3">فحص الصحة</td><td class="border p-3">طلب فعلي إلى مسار موثق أو فحص رحلة أساسية</td><td class="border p-3">وجود health check أو تنبيه تلقائي</td></tr><tr><td class="border p-3">التنبيه</td><td class="border p-3">اسم الميزة ومصدره ونتيجة تجربة آمنة</td><td class="border p-3">وصول رسالة تلقائية عند كل إخفاق</td></tr></tbody></table></div></div>
  <div class="content-block mt-8"><h3 class="text-xl font-black mb-3">3. افصل النسخ والاستعادة عن التراجع</h3><p class="leading-8">اسأل مزود قاعدة البيانات عن نطاق النسخة ووتيرتها ومدة الاحتفاظ ومكانها وطريقة الاستعادة، ثم دوّن الإجابة ومصدرها. إذا سمحت الإمكانات، جرّب الاستعادة في بيئة غير إنتاجية وسجّل النتيجة. تسجيل اسم زر Backup لا يثبت نجاح الاستعادة.</p><ul class="list-disc list-inside space-y-2 leading-8 pr-4"><li><strong>التراجع عن إصدار التطبيق:</strong> العودة إلى كود أو إعداد نشر سابق ثم فحص الرحلة الأساسية. هذا لا يعكس تغييرات قاعدة البيانات وحده.</li><li><strong>استعادة البيانات:</strong> إجراء منفصل قد يعيد البيانات إلى نقطة سابقة؛ دوّن أثره المتوقع ومن يصرح به وكيف تراجع النتيجة.</li><li><strong>تغييرات المخطط:</strong> راجع الترحيلات وتوافق الإصدار القديم والجديد قبل النشر. لا تستخدم أمر حذف أو استعادة إنتاجية كتجربة.</li><li><strong>RPO وRTO:</strong> لا تعد بأزمنة أو حدود من عندك؛ اذكرها فقط إذا كانت محددة من المزود أو مقاسة بتجربة موثقة.</li></ul><div class="callout tip my-6"><div class="callout-header"><span class="callout-icon">🧭</span><span>المخرجات</span></div><p class="leading-7">أنشئ <code dir="ltr">docs/OPERATIONS_RUNBOOK.md</code> للإجراءات و<code dir="ltr">docs/RESTORE_DRILL.md</code> لنتيجة تجربة الاستعادة أو سبب تعذرها. صنف كل قدرة: متاح ومتحقق، متاح ولم يُجرّب، غير متاح، أو غير معلوم.</p></div></div>
  <div class="code-container my-6" dir="ltr"><div class="code-header"><span class="code-lang">Prompt · مراجعة خطة التشغيل</span><button class="copy-btn" type="button" aria-label="نسخ برومبت مراجعة التشغيل">نسخ البرومبت</button></div><pre class="code-content"><code>Review the actual hosting plan and project deployment settings for [PROJECT_NAME].
Create docs/OPERATIONS_RUNBOOK.md and docs/RESTORE_DRILL.md.
For CI/CD, logs, alerts, backup, restore, and rollback, record:
- evidence and source that show whether the capability is available
- actual steps, owner, and verification method
- status: verified / available but not tested / unavailable / unknown
Separate application rollback from database restore. Do not change production.
Do not invent commands, guarantees, RPO/RTO, or expose secrets or personal data.
If a capability cannot be verified, record the gap and stop at the existing setup.</code></pre></div>
  <p class="text-sm leading-7">راجع <a href="/prompts" class="underline">مكتبة البرومبتات</a> و<a href="/templates" class="underline">الملفات والقوالب</a>. أضف مرجع الوثائق الرسمية الحالي لمزودك بعد اختيار المنصة والتحقق من الخطة.</p>
</section>`;

const handoffHtml = `
<section id="topic-56-handoff" class="topic-section">
  <div class="step-badge-group"><span class="stage-tag">الموضوع 56 · توثيق وتسليم المشروع</span><span class="step-pill">حزمة قابلة للمراجعة والتشغيل</span></div>
  <div class="step-header"><div class="step-title-wrap"><h2 class="step-title">توثيق وتسليم مشروع يمكن مراجعته</h2><div class="step-subtitle">اجمع المتطلبات والمخططات ودليل الاستخدام والتشغيل ونتائج الفحص</div></div></div>
  <div class="callout tip my-6"><div class="callout-header"><span class="callout-icon">📦</span><span>التسليم دليل، لا إعلان اكتمال</span></div><p class="leading-7">الحزمة الجيدة تبيّن ما بُني وما لم يُبنَ وكيف يشغّل المراجع المشروع بأمان وما فُحص. اذكر النتيجة كما حدثت، بما فيها Failed أو Not Run. لا تضع ملف <code dir="ltr">.env</code> أو مفاتيح أو بيانات أشخاص في المستودع أو الحزمة.</p></div>
  <div class="content-block"><h3 class="text-xl font-black mb-3">1. اجعل نقطة البدء واضحة</h3><p class="leading-8">ابدأ بـ <code dir="ltr">README.md</code> يشرح المشكلة والمستخدمين والهدف والميزات المنفذة وطريقة الوصول. اربط الوثائق المصدرية بدل نسخ نسخة قديمة. اشرح الإعداد المحلي بأسماء متغيرات البيئة فقط، واذكر أين يحصل المتعاون على القيم السرية خارج المستودع.</p><ul class="list-disc list-inside space-y-2 leading-8 pr-4"><li>المتطلبات والقرارات: نسخ PRD وSRS المعتمدة والأسئلة المفتوحة.</li><li>المخططات: مخطط معماري وERD وعقود API ومرجع التصميم الموجود في المشروع.</li><li>الاستخدام: أدوار المستخدمين وخطوات الرحلة الأساسية وتعليمات بيانات العرض الآمنة.</li><li>التشغيل: إصدارات الأدوات التي جُربت وأوامر الإعداد والتشغيل والإيقاف والمتغيرات المطلوبة دون قيمها.</li><li>التحقق: نتائج QA الفعلية ورابط دليل التشغيل والاستعادة إن كان متاحًا.</li></ul></div>
  <div class="content-block mt-8"><h3 class="text-xl font-black mb-3">2. اربط النتيجة بدليل</h3><p class="leading-8">اكتب تاريخ الفحص وأمره وطريقته ونتيجته ورابط الشاهد. إن لم تُجر تجربة متصفح أو استعادة، اكتب Not Run مع السبب. لقطة شاشة أو Build ناجح لا يثبت أن كل الرحلات تعمل.</p><div class="overflow-x-auto my-5"><table class="min-w-full text-sm border-collapse"><thead><tr><th class="border p-3 text-right">العنصر</th><th class="border p-3 text-right">الدليل</th><th class="border p-3 text-right">الحالة</th></tr></thead><tbody><tr><td class="border p-3">متطلب أساسي</td><td class="border p-3">اختبار أو خطوات إعادة الإنتاج</td><td class="border p-3">Passed / Failed / Not Run</td></tr><tr><td class="border p-3">رابط منشور</td><td class="border p-3">URL وتاريخ آخر فحص</td><td class="border p-3">نتيجة فعلية أو غير متاح</td></tr><tr><td class="border p-3">قيد معروف</td><td class="border p-3">ميزة غير مكتملة أو غير مختبرة</td><td class="border p-3">الأثر والخطوة التالية</td></tr></tbody></table></div></div>
  <div class="callout warning my-6"><div class="callout-header"><span class="callout-icon">🔐</span><span>قبل مشاركة المستودع</span></div><ul class="list-disc list-inside space-y-2 leading-7 pr-4"><li>افحص الملفات وسجل Git بحثًا عن أسرار أو بيانات حقيقية، وألغِ أي مفتاح نُشر سابقًا.</li><li>لا تعتبر المستودع الخاص بديلًا عن حماية الأسرار أو منح أقل الصلاحيات.</li><li>تأكد أن روابط README لا تشير إلى ملفات محلية أو وجهات لا يستطيع المراجع الوصول إليها.</li><li>حدد مالك المشروع والحسابات والخدمات ومن يتسلم مسؤولية التحديث.</li></ul></div>
  <div class="code-container my-6" dir="ltr"><div class="code-header"><span class="code-lang">Markdown · فهرس تسليم مقترح</span><button class="copy-btn" type="button" aria-label="نسخ فهرس التسليم">نسخ الفهرس</button></div><pre class="code-content"><code># Handoff
- [ ] README: problem, scope, setup, run, and verified links
- [ ] Approved docs/PRD.md and docs/SRS.md
- [ ] Existing diagrams, API contracts, and design references
- [ ] User guide and safe demo data instructions
- [ ] Environment variable names only; no secret values
- [ ] Test and QA evidence: Passed / Failed / Not Run
- [ ] docs/OPERATIONS_RUNBOOK.md and restore evidence, if available
- [ ] Known limitations, owners, and next steps</code></pre></div>
  <p class="text-sm leading-7">استخدم <a href="/templates" class="underline">الملفات والقوالب</a> و<a href="/prompts" class="underline">مكتبة البرومبتات</a> كمراجع عامة. تحقق من الملفات والروابط في مستودعك؛ هذه الصفحات لا تثبت وجود مخرجات مشروعك.</p>
</section>`;

const demoDayHtml = `
<section id="topic-57-demo-day" class="topic-section">
  <div class="step-badge-group"><span class="stage-tag">الموضوع 57 · عرض المشروع</span><span class="step-pill">قصة واضحة وتجربة قابلة للتكرار</span></div>
  <div class="step-header"><div class="step-title-wrap"><h2 class="step-title">Demo Day: اعرض الفكرة والقرارات والقيود</h2><div class="step-subtitle">قدّم تجربة حية مع خطة احتياطية تصف حالة المنتج كما هي</div></div></div>
  <div class="callout tip my-6"><div class="callout-header"><span class="callout-icon">🎤</span><span>اعرض ما يستطيع المشروع فعله الآن</span></div><p class="leading-7">ابدأ بالمشكلة والمستخدم، ثم نفّذ رحلة واحدة مترابطة ببيانات آمنة. اشرح قرارًا تقنيًا مهمًا وسبب اختياره، واذكر قيدًا حقيقيًا وخطوة تالية. إن لم يكن هناك نشر حي، قل إن العرض محلي أو إنه نموذج أولي؛ لا تسمّه منتجًا منشورًا.</p></div>
  <div class="content-block"><h3 class="text-xl font-black mb-3">1. حضّر مسار العرض</h3><ol class="list-decimal list-inside space-y-2 leading-8 pr-4"><li>اكتب افتتاحية تصف المشكلة والفئة المستفيدة دون ادعاء بحث لم تُجره.</li><li>اختر بيانات تجريبية غير حساسة، وجهّز حالة بداية وخطوات العودة إليها.</li><li>اعرض رحلة أساسية: المدخل وفعل المستخدم ونتيجة النظام؛ اشرح حالة خطأ إذا كانت مهمة.</li><li>اشرح قرارًا من المعمارية أو التصميم واربطه بوثيقة موجودة.</li><li>اختم بما يعمل وما بقي. افصل نتيجة الاختبارات عن ملاحظاتك الشخصية.</li></ol></div>
  <div class="content-block mt-8"><h3 class="text-xl font-black mb-3">2. سمّ الخطة الاحتياطية بوضوح</h3><p class="leading-8">افحص الرابط والاتصال والبيانات قبل العرض. إذا تعذر الاتصال، استخدم لقطة أو تسجيلًا من النسخة نفسها وقل إنه بديل مسجل وليس تفاعلًا مباشرًا. إذا لم يتوفر رابط، اعرض تشغيلًا محليًا فقط إذا اختبرته واذكر ذلك. لا تعرض واجهة ثابتة كأنها تعمل مع خادم فعلي.</p><ul class="list-disc list-inside space-y-2 leading-8 pr-4"><li>سجّل وقت آخر فحص للرابط والنسخة المستخدمة.</li><li>احتفظ بمسار بديل لا يحتاج أسرارًا أو بيانات خاصة.</li><li>إذا فشل السيناريو، انتقل للخطة الموثقة بدل اختراع نتيجة لحظية.</li><li>اترك وقتًا للأسئلة عن القرار والقيود والمساهمة الفعلية.</li></ul></div>
  <div class="overflow-x-auto my-6"><table class="min-w-full text-sm border-collapse"><thead><tr><th class="border p-3 text-right">الجزء</th><th class="border p-3 text-right">ما تقوله</th><th class="border p-3 text-right">الدليل</th></tr></thead><tbody><tr><td class="border p-3">المشكلة</td><td class="border p-3">من يواجهها وما هدف المشروع؟</td><td class="border p-3">PRD أو سياق المشروع</td></tr><tr><td class="border p-3">التجربة</td><td class="border p-3">ما الرحلة التي ستعرضها؟</td><td class="border p-3">رابط أو بيئة محددة وبيانات آمنة</td></tr><tr><td class="border p-3">القرار</td><td class="border p-3">ما المفاضلة التي حسمتها ولماذا؟</td><td class="border p-3">مخطط أو قرار موثق</td></tr><tr><td class="border p-3">القيود</td><td class="border p-3">ما غير المدعوم أو غير المختبر؟</td><td class="border p-3">قائمة فجوات ونتائج فحص</td></tr></tbody></table></div>
  <div class="code-container my-6" dir="ltr"><div class="code-header"><span class="code-lang">Prompt · سيناريو عرض صادق</span><button class="copy-btn" type="button" aria-label="نسخ برومبت إعداد العرض">نسخ البرومبت</button></div><pre class="code-content"><code>Write a [DURATION]-minute Demo Day script for [PROJECT_NAME].
Use only evidence in the README, docs/PRD.md, and actual check results.
Cover the problem and user, one demo journey, one documented decision,
known limitations, and the next step.
Add a fallback if the link or network fails. Label screenshots, recordings,
or local runs as fallbacks; do not present them as a live interaction.
Do not invent impact metrics, users, research results, or test success.</code></pre></div>
  <p class="text-sm leading-7">احفظ النص وقائمة التحقق في <code dir="ltr">docs/DEMO_DAY_SCRIPT.md</code> و<code dir="ltr">docs/DEMO_CHECKLIST.md</code>. راجع <a href="/templates" class="underline">الملفات والقوالب</a> و<a href="/prompts" class="underline">مكتبة البرومبتات</a> للوثائق الموجودة فعلًا.</p>
</section>`;

const portfolioHtml = `
<section id="topic-58-portfolio" class="topic-section">
  <div class="step-badge-group"><span class="stage-tag">الموضوع 58 · Portfolio</span><span class="step-pill">مساهمة ونتائج قابلة للإثبات</span></div>
  <div class="step-header"><div class="step-title-wrap"><h2 class="step-title">Portfolio: وثّق ما أنجزته وما تعلمته</h2><div class="step-subtitle">اعرض دورك والأدلة والقيود دون ادعاءات غير مثبتة</div></div></div>
  <div class="callout warning my-6"><div class="callout-header"><span class="callout-icon">🧾</span><span>اجعل الادعاء بحجم دليله</span></div><p class="leading-7">لا تكتب «حسّنّا الكفاءة» أو «ارتفع رضا المستخدمين» دون خط أساس وقياس موثق. لا تقل إنك بنيت النظام كاملًا إذا شاركك فريق أو ساعدتك أداة. اذكر ما خططته أو كتبته أو راجعته، وما أنجزه الآخرون، وكيف تحققت من النتيجة.</p></div>
  <div class="content-block"><h3 class="text-xl font-black mb-3">1. اعرض حالة مشروع لا قائمة تقنيات</h3><p class="leading-8">ابدأ بالمشكلة والمستخدم والنطاق الحالي. أضف رابطًا حيًا فقط إذا كان متاحًا وفُحص، ولقطات شاشة من النسخة التي تصفها. وضّح إن كانت النسخة منشورة أو محلية أو نموذجًا أوليًا.</p><ul class="list-disc list-inside space-y-2 leading-8 pr-4"><li><strong>مساهمتك:</strong> افصل ما نفذته بنفسك وما شاركت فيه، واذكر مساعدة زملاء أو أدوات AI بوضوح.</li><li><strong>القرارات:</strong> اشرح قرارًا واحدًا ومفاضلته واربطه بمصدر.</li><li><strong>النتائج:</strong> اذكر سلوكًا تحقق أو مخرجًا ملموسًا. للرقم أضف خط الأساس والمصدر والفترة والعينة وطريقة القياس؛ إذا لم تقس الأثر فاكتب ذلك.</li><li><strong>الحدود:</strong> اذكر ما لم يكتمل أو لم يُختبر والخطوة التالية.</li><li><strong>المشاركة:</strong> احذف الأسرار والبيانات الشخصية وتحقق من حق مشاركة المستودع والمواد.</li></ul></div>
  <div class="content-block mt-8"><h3 class="text-xl font-black mb-3">2. فرّق بين النتيجة والدليل</h3><div class="overflow-x-auto my-4"><table class="min-w-full text-sm border-collapse"><thead><tr><th class="border p-3 text-right">الادعاء</th><th class="border p-3 text-right">الدليل المطلوب</th><th class="border p-3 text-right">الصياغة عند غياب الدليل</th></tr></thead><tbody><tr><td class="border p-3">«قللنا زمن المهمة 40٪»</td><td class="border p-3">قياس قبل وبعد، عينة وطريقة</td><td class="border p-3">«نفذت رحلة؛ لم أقس أثرها بعد»</td></tr><tr><td class="border p-3">«تحقق المستخدمون من المنتج»</td><td class="border p-3">اختبار مستخدم موثق</td><td class="border p-3">«راجعت الرحلة ذاتيًا؛ لم أختبرها مع مستخدمين»</td></tr><tr><td class="border p-3">«بنيت المنتج كاملًا»</td><td class="border p-3">سجل يوضح نطاق مساهمتك</td><td class="border p-3">«نفذت [الجزء] وراجعت [الجزء] ضمن فريق»</td></tr></tbody></table></div></div>
  <div class="code-container my-6" dir="ltr"><div class="code-header"><span class="code-lang">Markdown · بطاقة Portfolio</span><button class="copy-btn" type="button" aria-label="نسخ قالب Portfolio">نسخ القالب</button></div><pre class="code-content"><code># [Project name]
## Problem and intended users
[What the project addresses; avoid unsupported claims]
## What I contributed
- Built: [specific files/features]
- Collaborated on: [specific work]
- AI/tool assistance: [how outputs were reviewed]
## Evidence and current status
- Demo/repository: [verified link or “not published”]
- Checks: [actual result, date, or Not Run]
- Measured outcome: [method/source/date, or “not measured”]
## Decisions and limitations
[One trade-off, known gaps, next step]</code></pre></div>
  <p class="text-sm leading-7">احفظ البطاقة في <code dir="ltr">docs/PORTFOLIO_ENTRY.md</code> أو منصتك الشخصية. استخدم <a href="/prompts" class="underline">مكتبة البرومبتات</a> و<a href="/templates" class="underline">الملفات والقوالب</a> للمراجع، وتأكد من صلاحية كل رابط ومن إزالة المعلومات الخاصة.</p>
</section>`;

export const t19Entries: TopicItem[] = [
  {
    id: 'project-operations-runbook', number: '55', slug: 'project-operations-runbook',
    title: 'CI/CD والمراقبة والنسخ الاحتياطي والتراجع',
    subtitle: 'إجراءات تشغيل موثقة بحسب قدرات الاستضافة المختارة',
    category: 'architecture', categoryName: 'التشغيل والتسليم', stageTag: 'المرحلة النهائية · تشغيل المشروع',
    summary: 'أنشئ دليلًا لمسار CI/CD والسجلات والتنبيه والنسخ والاستعادة والتراجع وفق إعدادك الفعلي. افصل تراجع الكود عن استعادة البيانات، واكتب ما توفر وما لم يُختبر دون افتراض ميزات من مزود الاستضافة.',
    tags: ['CI/CD', 'Operations', 'Logs', 'Monitoring', 'Backup', 'Restore', 'Rollback', 'Hosting Capabilities'],
    contentTypes: ['prompt', 'checklist', 'code'], diagramCount: 0, promptCount: 1, codeSnippetCount: 1, checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(operationsHtml), htmlContent: operationsHtml,
    goal: 'إعداد docs/OPERATIONS_RUNBOOK.md وdocs/RESTORE_DRILL.md يميزان بين المتاح والمتحقق وغير المتاح أو غير المجرّب، ويصفان التحديث والتراجع والاستعادة وفق بيئة المشروع.',
    prerequisites: ['توثيق حالة نشر الواجهة والخادم وقاعدة البيانات (الموضوع 54).', 'نتائج فحوص واختبارات المشروع المتاحة (الموضوعان 46 و49).', 'معرفة مزود الاستضافة والخطة والإعدادات؛ إذا لم يُحسم الاختيار فسجّل أسئلة التحقق بدل افتراض الإجابات.'],
    steps: [
      '1. احصر الاستضافة والخدمات والخطة وإعدادات النشر، واربط كل معلومة بوثيقة رسمية أو إعداد قابل للمراجعة.',
      '2. اكتب خطوات التحديث ومراجعة التغيير والفحوص السابقة للنشر، وحدد الآلي واليدوي والموافقة اللازمة.',
      '3. سجل مصادر السجلات والمدة والصلاحيات والتنبيهات المتاحة، دون إدراج كلمات مرور أو بيانات شخصية.',
      '4. وثّق نطاق النسخ ووتيرتها ومدة الاحتفاظ وطريقة الاستعادة بمصدر من المزود أو الإعداد الفعلي.',
      '5. إذا سمحت البيئة، جرّب الاستعادة خارج الإنتاج وسجل التاريخ والنسخة والخطوات والنتيجة؛ لا تستخدم الإنتاج كتجربة.',
      '6. افصل تراجع إصدار التطبيق عن استعادة قاعدة البيانات وراجع توافق ترحيلات المخطط قبل النشر.',
      '7. صنف كل قدرة إلى متاح ومتحقق، متاح ولم يُجرّب، غير متاح، أو غير معلوم؛ وحدد المالك وخطوة التحقق التالية.'
    ],
    promptRefs: [], outputs: ['docs/OPERATIONS_RUNBOOK.md', 'docs/RESTORE_DRILL.md'],
    checklist: ['تم التحقق من قدرات الخطة ومصدر كل معلومة.', 'يفصل الدليل بين فحوص CI وتجهيز الإصدار والنشر الفعلي.', 'يوضح مكان السجلات والتنبيه والصلاحيات ويحمي الأسرار والبيانات الشخصية.', 'يصف نطاق النسخة الاحتياطية وطريقة الاستعادة ومالك الإجراء.', 'يسجل نتيجة تجربة الاستعادة أو يصرح بأنها لم تُجرَ والسبب.', 'يفصل تراجع الكود عن استعادة البيانات ويسجل الفجوات والقيود.'],
    publicationStatus: 'unified-complete', sequencePosition: 55,
  },
  {
    id: 'project-handoff-package', number: '56', slug: 'project-handoff-package',
    title: 'توثيق وتسليم المشروع',
    subtitle: 'حزمة تشمل المتطلبات والمخططات ودليل الاستخدام والتشغيل ونتائج الفحص',
    category: 'reference', categoryName: 'التشغيل والتسليم', stageTag: 'المرحلة النهائية · تسليم قابل للمراجعة',
    summary: 'جهّز README وحزمة تجمع وثائق المتطلبات والمخططات ودليل الاستخدام والتشغيل ونتائج فحص دقيقة. اربط كل ادعاء بدليل، واذكر Failed وNot Run والقيود، واحمِ الأسرار وبيانات المستخدمين.',
    tags: ['Handoff', 'README', 'Documentation', 'Runbook', 'QA Evidence', 'Secrets', 'Known Limitations'],
    contentTypes: ['checklist', 'code'], diagramCount: 0, promptCount: 0, codeSnippetCount: 1, checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(handoffHtml), htmlContent: handoffHtml,
    goal: 'إعداد README.md وdocs/HANDOFF.md وdocs/QA_RESULTS.md لتمكين مراجع من فهم المشروع وتشغيله ومراجعة وثائقه ونتائجه دون تخمين أو كشف أسرار.',
    prerequisites: ['وثائق المتطلبات والمخططات والتصميم ونتائج الفحص المتاحة.', 'دليل التشغيل وإجراءات بيئة الاستضافة إن توفرت (الموضوع 55).', 'معرفة ما يحق مشاركته من المستودع والحسابات والبيانات.'],
    steps: [
      '1. ابدأ README.md بالمشكلة والنطاق والميزات المنفذة فعلًا، ثم أضف روابط تعمل إلى الوثائق والمستودع أو العرض إن توفر.',
      '2. اجمع نسخ PRD وSRS المعتمدة والمخططات وعقود API والتصميم الموجودة، ولا تنشئ روابط لملفات لم تُنتج.',
      '3. اكتب دليل الاستخدام للرحلات الأساسية والأدوار والبيانات التجريبية الآمنة وحدود المنتج.',
      '4. وثق الأدوات وأوامر الإعداد والتشغيل والإيقاف وأسماء متغيرات البيئة دون قيم سرية.',
      '5. أرفق تقرير الفحص بتاريخ وطريقة تنفيذ ونتيجة Passed أو Failed أو Not Run ورابط الدليل إن توفر.',
      '6. أضف القيود والقرارات والأسئلة المفتوحة والمالك والخطوة التالية، ثم راجع الروابط والصلاحيات.'
    ],
    promptRefs: [], outputs: ['README.md', 'docs/HANDOFF.md', 'docs/QA_RESULTS.md'],
    checklist: ['توضح نقطة البداية المشكلة والنطاق والميزات الحالية.', 'تربط الحزمة بإصدارات المتطلبات والمخططات الفعلية.', 'يمكن اتباع دليل الاستخدام والإعداد والتشغيل دون أسرار.', 'تذكر أسماء المتغيرات دون قيم سرية ولا تعرض بيانات شخصية.', 'تعرض Passed وFailed وNot Run بتاريخ ودليل مناسب.', 'توضح القيود والمالك والخطوة التالية وتعمل الروابط المشتركة.'],
    publicationStatus: 'unified-complete', sequencePosition: 56,
  },
  {
    id: 'project-demo-day', number: '57', slug: 'project-demo-day',
    title: 'Demo Day: عرض الفكرة والقرارات والقيود',
    subtitle: 'سيناريو حي وخطة احتياطية تصف النسخة كما هي',
    category: 'reference', categoryName: 'العرض وPortfolio', stageTag: 'المرحلة النهائية · عرض حي',
    summary: 'حضّر عرضًا يبدأ بالمشكلة والمستخدم، ويشرح رحلة قابلة للتكرار وقرارًا وقيودًا بأدلة. افحص الرابط والبيانات مسبقًا، وسمّ اللقطات أو التسجيل أو التشغيل المحلي بديلًا لا تفاعلًا مباشرًا.',
    tags: ['Demo Day', 'Live Demo', 'Presentation', 'Fallback Plan', 'Limitations', 'Evidence'],
    contentTypes: ['prompt', 'checklist', 'code'], diagramCount: 0, promptCount: 1, codeSnippetCount: 1, checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(demoDayHtml), htmlContent: demoDayHtml,
    goal: 'إعداد docs/DEMO_DAY_SCRIPT.md وdocs/DEMO_CHECKLIST.md لعرض يشرح الفكرة والقرارات والقيود ويملك خطة بديلة واضحة عند تعطل الاتصال أو الرابط.',
    prerequisites: ['حزمة تسليم وروابط قابلة للمراجعة (الموضوع 56).', 'رحلة أساسية اختبرها الطالب وبيانات عرض غير حساسة.', 'معرفة حالة النشر الفعلية: رابط حي أو تشغيل محلي مجرّب أو نموذج أولي.'],
    steps: [
      '1. اكتب هدف العرض والجمهور والمدة، وعرّف المشكلة دون ادعاء مقابلات لم تُجرَ.',
      '2. اختر رحلة أساسية وحدد مدخلاتها ونتيجتها والحالات التي ستشرحها.',
      '3. جهز حسابًا وبيانات آمنة وأعد الحالة الابتدائية، ثم جرّب الرحلة كاملة.',
      '4. اختر قرارًا موثقًا واربطه بمفاضلته، واذكر قيدًا أو اختبارًا لم يكتمل.',
      '5. افحص الرابط والاتصال، وجهز لقطة أو تسجيلًا أو تشغيلًا محليًا مجربًا كبديل موسوم بوضوح.',
      '6. تدرب على الانتقال والأسئلة، واحفظ النص وقائمة الفحص وتاريخ آخر تجربة.'
    ],
    promptRefs: [], outputs: ['docs/DEMO_DAY_SCRIPT.md', 'docs/DEMO_CHECKLIST.md'],
    checklist: ['يشرح العرض المشكلة والمستخدم والنطاق دون ادعاء غير موثق.', 'الرحلة محددة ومجربة على النسخة المعروضة.', 'البيانات آمنة ولا تعرض أسرارًا أو معلومات شخصية.', 'يرتبط القرار بوثيقة وتظهر القيود كما هي.', 'تسمى الخطة البديلة لقطة أو تسجيلًا أو تشغيلًا محليًا لا عرضًا حيًا.', 'تسجل القائمة تاريخ الرابط والنسخة وآخر تجربة.'],
    publicationStatus: 'unified-complete', sequencePosition: 57,
  },
  {
    id: 'project-portfolio-entry', number: '58', slug: 'project-portfolio-entry',
    title: 'Portfolio: عرض المساهمة والنتائج بصدق',
    subtitle: 'حالة مشروع توضّح دور الطالب والأدلة والقيود دون مبالغة',
    category: 'reference', categoryName: 'العرض وPortfolio', stageTag: 'المرحلة النهائية · ملف مهني قابل للمشاركة',
    summary: 'اكتب بطاقة Portfolio تشرح سياق المشروع ومساهمتك الفردية والتعاون ومساعدة الأدوات والنتائج المثبتة. اربط الأرقام بطريقة القياس ومصدرها وتاريخها، وميز النسخة المنشورة عن النموذج الأولي وغير المختبر.',
    tags: ['Portfolio', 'Contribution', 'Evidence', 'Impact', 'Limitations', 'AI Assistance'],
    contentTypes: ['checklist', 'code'], diagramCount: 0, promptCount: 0, codeSnippetCount: 1, checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(portfolioHtml), htmlContent: portfolioHtml,
    goal: 'إعداد docs/PORTFOLIO_ENTRY.md أو بطاقة شخصية تشرح المشروع ومساهمة الطالب وقراراته ونتائجه وحدوده مع دليل لكل رابط أو ادعاء قابل للقياس.',
    prerequisites: ['README وحزمة تسليم محدثة وروابط مشاركة مسموحة (الموضوع 56).', 'نص العرض والقيود والنتائج المراجعة (الموضوع 57).', 'سجل واقعي لمساهمات الفرد والفريق والأدوات ونتائج قياس متاحة.'],
    steps: [
      '1. اكتب المشكلة والمستخدم والنطاق الحالي، وحدد إن كان المنتج منشورًا أو محليًا أو نموذجًا أوليًا.',
      '2. سجل ما نفذته بنفسك وما شاركت فيه وما نفذه الزملاء أو أدوات التوليد، واربطه بأدلة قابلة للمشاركة.',
      '3. اختر قرارًا يشرح تعلمك وأظهر سببه والبدائل والمرجع.',
      '4. اذكر النتائج مع المصدر والطريقة والتاريخ والعينة؛ إذا لم تقس الأثر فاكتب أنه لم يُقَس.',
      '5. أضف القيود والميزات غير المختبرة والخطوة التالية، واحذف الأسرار والبيانات الشخصية.',
      '6. تحقق من الروابط واللقطات وصلاحيات المشاركة قبل نشر البطاقة.'
    ],
    promptRefs: [], outputs: ['docs/PORTFOLIO_ENTRY.md', 'روابط أو لقطات شاشة بعد التحقق منها'],
    checklist: ['توضح البطاقة حالة المشروع ولا تساوي النموذج الأولي بالنشر الكامل.', 'تحدد المساهمة الفردية والتعاون ومساعدة AI بدقة.', 'تستند الأرقام إلى خط أساس ومصدر وفترة وعينة وطريقة قياس أو لا تدعي أثرًا رقميًا.', 'تظهر القرارات والقيود والميزات غير المختبرة.', 'تخص الروابط واللقطات النسخة الموصوفة ولا تعرض معلومات خاصة.', 'تم التحقق من صلاحية مشاركة المستودع والمواد.'],
    publicationStatus: 'unified-complete', sequencePosition: 58,
  },
];
