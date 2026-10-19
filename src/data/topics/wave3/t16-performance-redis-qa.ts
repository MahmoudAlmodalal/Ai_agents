import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';

/* =========================================================================
 * TICKET 16: MEASURED DATABASE PERFORMANCE, CONDITIONAL REDIS, AND QA
 * Sequence positions: 47–49
 * ========================================================================= */

export const topic47DatabasePerformanceHtml = `
<section id="topic-47-database-performance" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 47 · ما بعد تكامل التطبيق</span>
    <span class="step-pill">قياس قبل التحسين</span>
  </div>
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">هندسة أداء قاعدة البيانات: قِس ثم عالج</h2>
      <div class="step-subtitle">استخدم أثرًا قابلًا لإعادة القياس لمعالجة N+1 أو اختيار فهرس أو فحص التزامن</div>
    </div>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">⚠️</span><span>لا تبدأ بقائمة تحسينات جاهزة</span></div>
    <p class="leading-7">بطء شاشة واحدة لا يثبت أن قاعدة البيانات هي السبب. حدّد رحلة مستخدم بطيئة، ثم افصل زمن الشبكة والخادم وقاعدة البيانات، وسجّل خط أساس على بيانات وحجم استخدام يمثلان مشروعك. لا تضف فهرسًا أو تخزينًا مؤقتًا أو اتصالات أكثر قبل وجود قياس يبرر ذلك.</p>
  </div>

  <div class="content-block">
    <h3>1. أنشئ خط أساس يمكن تكراره</h3>
    <p>اختر استعلامًا أو رحلة مرتبطة بمعيار أداء موثق في SRS، مثل فتح قائمة بصفحاتها أو البحث عن سجل. سجّل البيئة وحجم البيانات ونص الاستعلام أو بصمته، وعدد الاستعلامات، وزمن قاعدة البيانات وزمن الرحلة، وعدد الأخطاء. استخدم p50 وp95 عند تكرار الطلبات بدل الاستناد إلى أسرع محاولة أو لقطة واحدة. لا تقارن نتائج بيئتين مختلفتين أو تغييرات على أحجام بيانات مختلفة.</p>
    <ul class="list-disc list-inside space-y-2 leading-7">
      <li>نفّذ السيناريو نفسه قبل التغيير وبعده، مع إعدادات وبيانات متقاربة.</li>
      <li>افحص خطة الاستعلام والصفوف المقروءة، لا الزمن وحده؛ نتيجة القياس تتأثر بالجهاز والذاكرة وحالة التخزين المؤقت.</li>
      <li>لا تشغّل <code>EXPLAIN ANALYZE</code> على استعلام كتابة في قاعدة إنتاج؛ فهو ينفّذ الاستعلام. استخدم بيئة آمنة أو خطة لا تنفذ الكتابة.</li>
    </ul>
  </div>

  <div class="content-block mt-8">
    <h3>2. عالج N+1 حين يثبتها عدّ الاستعلامات</h3>
    <p>إذا كانت الصفحة تجلب قائمة ثم تصدر استعلامًا منفصلًا لعلاقة لكل صف، افحص ارتباط عدد الاستعلامات بعدد العناصر. قارن الأثر قبل التغيير وبعده مع إبقاء الحقول والصفحات والسلوك كما هو. عند ثبوت النمط، استخدم JOIN أو التحميل المسبق الملائم لعلاقة ORM؛ في Django مثلًا يختلف <code>select_related</code> للعلاقات المفردة عن <code>prefetch_related</code> للمجموعات. أعد تشغيل السيناريو وتأكد من أن العدد انخفض وأن البيانات ما زالت مطابقة.</p>
    <div class="callout tip my-4">
      <div class="callout-header"><span class="callout-icon">🔎</span><span>علامة الدليل</span></div>
      <p>وثّق عدد الاستعلامات والصفوف والزمن قبل الإصلاح وبعده. لا تكتب «تم حل N+1» لمجرد إضافة دالة eager loading؛ أحيانًا يبقى استعلام زائد أو يصبح الاستعلام الواحد أكبر وأبطأ.</p>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3>3. أضف فهرسًا لاستعلام مرصود، ثم قِس كلفته</h3>
    <p>ابدأ باستعلام بطيء متكرر، وافحص شروط <code>WHERE</code> والربط والترتيب وخطة التنفيذ والفهارس الموجودة. صغ فرضية محددة عن الفهرس الذي قد يساعد ذلك النمط، واختبرها ببيانات ممثلة. الفهرس يستهلك مساحة ويضيف كلفة إلى الكتابة والصيانة؛ لا يعني شيوع عمود أن فهرسته مفيدة لكل استعلام. افحص أيضًا أثره على استعلامات أخرى قبل اعتماده.</p>
    <p>هذا مثال تشخيصي فقط: استبدل أسماء الجداول والأعمدة بما في مخططك، وشغّل القراءة في بيئة آمنة. لا تنسخ فهرسًا إلى المشروع من المثال دون نتائجك.</p>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">PostgreSQL · خطة استعلام قراءة</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ المثال';},2000);})" aria-label="نسخ مثال EXPLAIN لخطة استعلام">نسخ المثال</button></div>
      <pre class="code-content"><code>EXPLAIN (ANALYZE, BUFFERS)
SELECT id, status, created_at
FROM loan_requests
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 20;</code></pre>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3>4. افحص التزامن فقط عندما يظهر الاختناق تحت حمل ممثل</h3>
    <p>ارفع عدد الطلبات المتزامنة تدريجيًا حتى الحمل المتوقع الموثق، وراقب p95 ومعدل الأخطاء وانتظار حوض الاتصالات واستهلاك قاعدة البيانات والانتظار على الأقفال. زيادة الاتصالات لا تصلح تلقائيًا بطء SQL، وقد تزيد ضغط قاعدة البيانات. إذا لم يظهر اختناق قابل للتكرار عند الحمل المتوقع، سجّل القياس واترك الإعداد كما هو.</p>
    <p>إذا ظهر التدهور، حدّد هل السبب استعلامًا بطيئًا أو انتظار اتصال أو معاملة طويلة أو قفلًا، ثم غيّر عاملًا واحدًا وأعد القياس. حافظ على invariants ومعاملات الكتابة؛ لا تستبدل التزامن بتخزين مؤقت لبيانات يلزم أن تكون حديثة.</p>
  </div>

  <div class="content-block mt-8">
    <h3>5. اكتب تقريرًا يثبت قرارك</h3>
    <p>أنشئ <code>docs/DATABASE_PERFORMANCE_REPORT.md</code>. سجّل الرحلة والاستعلام والبيئة وحجم البيانات ومصدر القياس والنتائج قبل وبعد، والفرضية والتغيير ومخاطره. إذا لم تكشف القياسات مشكلة، اذكر ما قسته ولماذا لم تضف تحسينًا؛ هذا قرار مكتمل وليس فجوة يجب ملؤها بتحسين عشوائي.</p>
  </div>

  <div class="content-block mt-8">
    <h3>مراجع رسمية</h3>
    <ul class="list-disc list-inside space-y-2 leading-7">
      <li><a href="https://www.postgresql.org/docs/current/using-explain.html" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">PostgreSQL: Using EXPLAIN</a> — قراءة خطة التنفيذ والتنبيه إلى أن ANALYZE ينفّذ العبارة.</li>
      <li><a href="https://www.postgresql.org/docs/current/indexes.html" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">PostgreSQL: Indexes</a> — أنواع الفهارس واستخدامها وكلفتها.</li>
      <li><a href="https://www.postgresql.org/docs/current/pgstatstatements.html" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">PostgreSQL: pg_stat_statements</a> — إحصاءات تنفيذ العبارات عند تفعيل الامتداد.</li>
      <li><a href="https://docs.djangoproject.com/en/stable/topics/db/optimization/" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">Django: Database access optimization</a> — أدوات ORM لتحسين الوصول إلى البيانات.</li>
    </ul>
  </div>
</section>
`;

export const topic48RedisHtml = `
<section id="topic-48-redis" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 48 · قرار بنية مشروط</span>
    <span class="step-pill">أضف Redis عند وجود سبب قابل للتحقق</span>
  </div>
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">Redis: قرار مشروط بمتطلبات مشروعك</h2>
      <div class="step-subtitle">اختر تخزينًا مؤقتًا أو طابور مهام بعد توثيق المشكلة، أو سجّل سبب التجاوز</div>
    </div>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">⚖️</span><span>Redis ليس مكوّنًا إلزاميًا</span></div>
    <p class="leading-7">اتبع قياسات أداء قاعدة البيانات السابقة. إذا كان التطبيق يحقق متطلبات زمن الاستجابة والحمل من دون استعلام متكرر مكلف أو عمل خلفي طويل، اختر مسار التجاوز واكتب مبرره في <code>docs/REDIS_DECISION.md</code>. لا تضف خدمة وبيانات تشغيل ومخاطر إبطال للمخبأ لمجرد أن Redis شائع.</p>
  </div>

  <div class="content-block">
    <h3>متى يستحق Redis تجربة محدودة؟</h3>
    <ul class="list-disc list-inside space-y-2 leading-7">
      <li><strong>مخبأ:</strong> قراءة متكررة ومكلفة ثبتت بالقياس، تتغير قيمتها بوتيرة تسمح بعمر مؤقت، ويمكن إعادة بنائها من مصدر موثوق عند فقد المخبأ.</li>
      <li><strong>مهام خلفية:</strong> متطلب معتمد يحتاج فصل عمل بطيء عن استجابة المستخدم، مع حالات تسليم وإعادة محاولة ومراقبة موثقة. Redis قد يكون جزءًا من وسيط الرسائل بحسب نظام المهام المختار؛ ليس قائمة انتظار مضمونة بمجرد تثبيته.</li>
      <li>في الحالتين، احسب كلفة التشغيل والمراقبة والتعطل والإبطال، وحدد مالك البيانات ومصدر الحقيقة.</li>
    </ul>
  </div>

  <div class="content-block mt-8">
    <h3>إن اخترت المخبأ: عرّف سياسة الاتساق أولًا</h3>
    <p>نمط cache-aside يبدأ بقراءة المفتاح؛ عند غيابه اقرأ المصدر الأساسي ثم اكتب قيمة ذات مدة صلاحية مناسبة. عند تغيير المصدر، أبطِل المفتاح المرتبط أو اقبل نافذة عدم حداثة محددة وموثقة. صمم المفتاح ليشمل نطاق المستخدم أو المستأجر عند وجود بيانات خاصة. لا تجعل المخزن المؤقت مصدر الحقيقة للصلاحيات أو حالة معاملة، ولا تضع أسرارًا أو بيانات حساسة بلا سياسة أمن واحتفاظ مناسبة.</p>
    <p>اختبر نسبة الإصابة والإخفاقات وزمن الاستجابة مع المخبأ وبدونه. تأكد أن حذف قيمة أو إعادة تشغيل Redis لا يفقد سجلًا أساسيًا. أوقف التجربة إن لم تتحسن نتيجة قابلة للقياس بما يبرر تكلفتها.</p>
  </div>

  <div class="content-block mt-8">
    <h3>إن اخترت مهمة خلفية: وثّق سلوك التسليم</h3>
    <p>حدّد ما يجب أن يحدث داخل طلب المستخدم وما يمكن تأجيله، ومعرّف المهمة وحالاتها، وسياسة إعادة المحاولة، والتعامل مع التكرار (idempotency)، ومراقبة الأعمال العالقة والفشل. لا تعرض للمستخدم نجاح إرسال أو تنفيذ قبل أن يضمن عقد المنتج معنى «تم القبول» و«اكتمل التنفيذ». لا تضع العمل المطلوب لصحة المعاملة بعد الاستجابة لمجرد تقصير زمنها.</p>
  </div>

  <div class="content-block mt-8">
    <h3>سجل قرارًا قابلًا للمراجعة</h3>
    <p>اكتب <code>docs/REDIS_DECISION.md</code> في كلا المسارين. عند التجاوز، سجّل المتطلب والقياس والسبب، ومتى ستعيد النظر. عند الاعتماد، أضف مبرر اختيار التخزين المؤقت أو المهام ومخطط تدفق البيانات وسياسة TTL والإبطال أو إعادة المحاولة، وحدود الفشل، وأوامر التحقق، والنتيجة قبل Redis وبعده. Redis إضافة اختيارية لخادم مشروع الطالب؛ لا يُنشأ Redis للموقع التعليمي.</p>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">قالب قرار قابل للنسخ · Markdown</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ القالب';},2000);})" aria-label="نسخ قالب قرار Redis">نسخ القالب</button></div>
      <pre class="code-content"><code># Redis decision

Status: Not needed | Trial | Adopted
Requirement or measured symptom:
Evidence and baseline:
Chosen pattern: cache-aside | background task | none
Source of truth and failure behavior:
Expiry, invalidation, or retry policy:
Verification result:
Revisit when:</code></pre>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3>مراجع رسمية</h3>
    <ul class="list-disc list-inside space-y-2 leading-7">
      <li><a href="https://redis.io/docs/latest/develop/use-cases/cache-aside/" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">Redis: Cache-aside pattern</a> — نمط القراءة من المصدر وإدارة المخبأ.</li>
      <li><a href="https://redis.io/docs/latest/develop/data-types/strings/" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">Redis: Strings and expiration</a> — تخزين القيمة ومدة صلاحيتها.</li>
      <li><a href="https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">Redis: Benchmarking</a> — قياس الأداء ضمن سياق التشغيل.</li>
      <li><a href="https://docs.celeryq.dev/en/stable/getting-started/introduction.html" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">Celery: Introduction</a> — مفهوم طابور المهام والعامل الذي ينفذها.</li>
    </ul>
  </div>
</section>
`;

export const topic49QaHtml = `
<section id="topic-49-qa" class="topic-section">
  <div class="step-badge-group">
    <span class="stage-tag">الموضوع 49 · مراجعة المنتج المتكامل</span>
    <span class="step-pill">سجّل ما فُحص فعلًا</span>
  </div>
  <div class="step-header">
    <div class="step-title-wrap">
      <h2 class="step-title">QA: مراجعة متكاملة قبل التسليم</h2>
      <div class="step-subtitle">قارن التطبيق بالمتطلبات والتصميم، وافحص الرحلات والتجاوب والوصول والتكامل</div>
    </div>
  </div>

  <div class="callout warning my-6">
    <div class="callout-header"><span class="callout-icon">🧾</span><span>النتيجة يجب أن تعكس دليلًا منفذًا</span></div>
    <p class="leading-7"><strong>Passed</strong> يعني أن الحالة نُفذت على بيئة موصوفة واجتازت معيارها. <strong>Failed</strong> يعني أن فحصًا منفذًا كشف عيبًا موثقًا. <strong>Not Run</strong> يعني أن الحالة لم تُنفذ أو لم تتوفر بيئتها، مع تسجيل السبب والأثر. لا تحول عدم الفحص إلى نجاح لمجرد أن البناء اكتمل أو الواجهة بدت صحيحة.</p>
  </div>

  <div class="content-block">
    <h3>1. اربط الفحص بمتطلب ومعيار قبول</h3>
    <p>خذ معرّفات المتطلبات وسيناريوهات النجاح والرفض من PRD وSRS، وغطِّ الأدوار والحالات الحدية ومراحل التحميل والفراغ والخطأ. أضف لكل حالة طريقة تنفيذ ونتيجة متوقعة ودليلًا (رابط سجل أو لقطة أو أمر ونسخة بيئة). الاختبارات الآلية السابقة دليل مفيد، لكنها لا تغطي كل تجربة مستخدم ولا تُثبت وحدها صحة المتطلبات.</p>
  </div>

  <div class="content-block mt-8">
    <h3>2. قارن بالتصميم المعتمد</h3>
    <p>افحص مسارات الشاشة والعناصر وحالات التفاعل مقابل <code>UX_BLUEPRINT.md</code> و<code>SCREEN_INVENTORY.md</code> و<code>DESIGN.md</code> والنموذج المعتمد عند توفره. راجع التسلسل البصري والنصوص والأزرار ورسائل التحقق وحالات التحميل والفراغ والخطأ، وسجّل أي اختلاف مع مرجع التصميم والقرار المطلوب. لا تعتبر اختلافًا مقصودًا عيبًا قبل مراجعته، ولا تعدّل التصميم المعتمد بصمت.</p>
  </div>

  <div class="content-block mt-8">
    <h3>3. اختبر التجاوب عبر أحجام محددة</h3>
    <p>افحص المسارات الأساسية عند 390 و768 و1024 و1366 و1440 بكسل، وعلى جهاز فعلي أو محاكاة موثقة عند الإمكان. راقب القص والتداخل والتمرير الأفقي وترتيب العناصر وسهولة تنفيذ الفعل الرئيسي. اختبر محتوى عربي RTL مع الأكواد والقيم LTR والبيانات الطويلة. لا تصف التطبيق بأنه متجاوب اعتمادًا على عرض واحد.</p>
  </div>

  <div class="content-block mt-8">
    <h3>4. راجع الوصول يدويًا وبأدوات مناسبة</h3>
    <p>افحص التنقل بلوحة المفاتيح وترتيب التركيز ووضوح مؤشره وتسميات عناصر التحكم ورسائل الأخطاء والتباين والتكبير. راجع أسماء الأزرار والحقول بقارئ شاشة عند توفره. يمكن للفحص الآلي كشف بعض المشكلات، لكنه لا يثبت وحده الامتثال إلى WCAG؛ وثّق معيار الفحص والإصدار والأدوات والحالات التي بقيت غير متحققة.</p>
  </div>

  <div class="content-block mt-8">
    <h3>5. أعد اختبار التكامل على بيانات حقيقية للمشروع</h3>
    <p>نفّذ الرحلات الأساسية من الواجهة إلى API ثم قاعدة البيانات، بما فيها تسجيل الدخول والصلاحيات والنجاح والرفض وحالات الخطأ وإعادة المحاولة. تحقق من أن الحفظ والاسترجاع يعكسان الحالة الصحيحة ولا يعتمد المسار على بيانات تمثيلية فقط. إذا كانت البيئة المتكاملة غير متاحة، سجّل حالات التكامل Not Run بدل استنتاج نجاحها من اختبار الواجهة وحده.</p>
  </div>

  <div class="content-block mt-8">
    <h3>6. افتح عيبًا قابلًا لإعادة الإنتاج وأعد فحصه</h3>
    <p>لكل Failed سجّل خطوات التكرار، والبيئة والنتيجة الفعلية والمتوقعة وشدة الأثر، ثم اربطه بمتطلب أو مرجع تصميم. بعد الإصلاح أعد الحالة نفسها واختبارًا قريبًا لمنع التراجع. احتفظ بحالات Not Run في التقرير مع مالك وخطوة لازمة لإغلاقها؛ لا تحذفها عند إعداد ملخص التسليم.</p>
  </div>

  <div class="content-block mt-8">
    <h3>المخرج: <code>docs/FINAL_QA_REPORT.md</code></h3>
    <p>استخدم قالبًا يسجل لكل حالة: المعرّف والمتطلب، المنصة وحجم العرض والبيئة، الخطوات والدليل، النتيجة Passed أو Failed أو Not Run، ومتابعة العيب. لخّص التغطية والفجوات والقيود وقرار الجاهزية بصيغة لا تخفي أي فحص مؤجل.</p>
    <div class="code-container my-6" dir="ltr">
      <div class="code-header"><span class="code-lang">قالب سجل QA · Markdown</span><button class="copy-btn" type="button" onclick="navigator.clipboard.writeText(this.closest('.code-container').querySelector('code').innerText).then(()=>{this.classList.add('copied');this.innerText='✓ تم النسخ!';setTimeout(()=>{this.classList.remove('copied');this.innerText='نسخ القالب';},2000);})" aria-label="نسخ قالب سجل QA">نسخ القالب</button></div>
      <pre class="code-content"><code>| ID / requirement | Area | Environment / viewport | Evidence | Status | Follow-up |
|---|---|---|---|---|---|
| QA-01 / SRS-... | Integration | staging / 390px | link or run ID | Not Run | API unavailable |

## Summary
Passed: 0
Failed: 0
Not Run: 1
Known risks and next action:</code></pre>
    </div>
  </div>

  <div class="content-block mt-8">
    <h3>مراجع رسمية</h3>
    <ul class="list-disc list-inside space-y-2 leading-7">
      <li><a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">W3C: Web Content Accessibility Guidelines (WCAG) 2.2</a> — معايير الوصول وإرشاداتها.</li>
      <li><a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">W3C WAI: Test and Evaluate</a> — الجمع بين الاختبار الآلي والمراجعة البشرية.</li>
      <li><a href="https://playwright.dev/docs/intro" target="_blank" rel="noreferrer" class="text-[var(--accent)] underline">Playwright: Getting started</a> — تشغيل فحوص المتصفح وتسجيلها.</li>
    </ul>
  </div>
</section>
`;

export const t16Entries: TopicItem[] = [
  {
    id: 'database-performance-engineering',
    number: '47',
    slug: 'database-performance-engineering',
    title: 'هندسة أداء قاعدة البيانات: قِس ثم عالج',
    subtitle: 'حلل الاستعلامات والتزامن وفق أثر قابل لإعادة القياس',
    category: 'database',
    categoryName: 'البيانات والأداء',
    stageTag: 'قياس الأداء بعد تكامل المشروع',
    summary: 'ابدأ من رحلة بطيئة ومعيار أداء، وسجّل خط الأساس وخطة الاستعلامات وعددها وزمنها. عالج N+1 أو أضف فهرسًا أو غيّر إعدادات التزامن فقط عندما تدعم القياسات ذلك، ثم قارن النتيجة وسجّل أثرها وتكلفتها في تقرير أداء.',
    tags: ['PostgreSQL', 'Database Performance', 'N+1', 'EXPLAIN', 'Indexes', 'Concurrency', 'Measurement'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 1,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic47DatabasePerformanceHtml),
    htmlContent: topic47DatabasePerformanceHtml,
    goal: 'إعداد تقرير أداء قائم على خط أساس قابل لإعادة القياس، وتغيير واحد مبرر أو قرار موثق بعدم الحاجة إلى تحسين.',
    prerequisites: [
      'الرحلة الكاملة المتكاملة واختباراتها من موضوعي ربط الواجهة بالخادم وTesting (45–46).',
      'وثائق متطلبات الأداء وعقد API ومخطط البيانات المعتمد لمشروعك.'
    ],
    steps: [
      '1. اختر استعلامًا أو رحلة بطيئة ومعيار أداء من SRS، وحدد بيانات الاختبار والبيئة وحالة المخبأ.',
      '2. اجمع خط الأساس: p50 وp95 عند تكرار كافٍ، عدد الاستعلامات والصفوف، الأخطاء، ووقت قاعدة البيانات وحوض الاتصالات عند توفر القياس.',
      '3. افحص خطة الاستعلام وحدد فرضية واحدة: N+1 أو فهرس مفقود أو تنافس على الموارد؛ لا تغيّر عدة عوامل دفعة واحدة.',
      '4. نفّذ التغيير في بيئة آمنة مع الحفاظ على النتائج الوظيفية وسلامة المعاملات.',
      '5. أعد السيناريو نفسه وقارن النتائج والتكلفة التشغيلية، أو دوّن عدم ظهور حاجة إلى تعديل.',
      '6. وثّق الأدلة والقرار والمخاطر في docs/DATABASE_PERFORMANCE_REPORT.md.'
    ],
    promptRefs: [],
    outputs: ['docs/DATABASE_PERFORMANCE_REPORT.md'],
    checklist: [
      'سُجلت البيئة وحجم البيانات وطريقة القياس وخط الأساس قبل التغيير.',
      'استند قرار معالجة N+1 إلى عدد الاستعلامات وعلاقته بعدد الصفوف.',
      'استند قرار إضافة فهرس إلى خطة استعلام فعلية، مع فحص كلفة الكتابة والمساحة.',
      'استند قرار تعديل التزامن أو حوض الاتصالات إلى حمل ممثل ومؤشرات انتظار وأخطاء.',
      'أعيد القياس بعد تغيير واحد مع التحقق من بقاء النتائج الوظيفية صحيحة.',
      'وُثق عدم الحاجة لتحسين إذا كانت المتطلبات متحققة دون تعديل.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 47,
  },
  {
    id: 'redis-optional-infrastructure',
    number: '48',
    slug: 'redis-optional-infrastructure',
    title: 'Redis: قرار مشروط بمتطلبات مشروعك',
    subtitle: 'جرّب المخبأ أو المهام الخلفية عند وجود حاجة موثقة، وتجاوز Redis بقرار واضح عند غيابها',
    category: 'architecture',
    categoryName: 'المعمارية والبنية التحتية',
    stageTag: 'قرار بنية مشروط بقياس',
    summary: 'يأتي Redis بعد قياس قاعدة البيانات. يستخدم فقط عند ثبوت حاجة لمخبأ قراءة متكررة ومكلفة أو لفصل عمل خلفي طويل مع ضوابط تسليم واضحة. يوثق الطالب مسار التجاوز إذا حقق التطبيق أهدافه من دون Redis، أو يختبر أثر الإضافة قبل اعتمادها.',
    tags: ['Redis', 'Cache Aside', 'TTL', 'Background Jobs', 'Optional Infrastructure', 'Decision Record'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 1,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic48RedisHtml),
    htmlContent: topic48RedisHtml,
    goal: 'كتابة قرار Redis موثق يربط الحاجة بقياس ومتطلب، ويحدد تصميمًا واختبارات عند اعتماده أو يفسر تجاوزه عند عدم الحاجة.',
    prerequisites: [
      'تقرير أداء قاعدة البيانات من الموضوع 47، أو دليل أن حمل التطبيق الحالي يحقق متطلباته.',
      'متطلبات المشروع التي تحدد زمن الاستجابة وحداثة البيانات والأعمال التي يمكن فصلها عن الطلب.'
    ],
    steps: [
      '1. راجع متطلبات الأداء والقياسات، وحدد إن كانت هناك قراءة متكررة مكلفة أو مهمة طويلة لا يلزم انتظارها.',
      '2. إذا لم تثبت الحاجة، سجّل القرار Not needed وسبب التجاوز ومؤشرًا يستدعي المراجعة لاحقًا.',
      '3. إذا ثبتت الحاجة، اختر cache-aside أو وسيط مهام مناسبًا لمتطلب محدد، وحدد مصدر الحقيقة وحدود الفشل.',
      '4. عرّف TTL والإبطال ونطاق مفاتيح المستخدم أو المستأجر، أو سياسة حالة المهمة وإعادة المحاولة ومنع التكرار.',
      '5. اختبر الحالة مع Redis وبدونه بما فيها انقطاع Redis أو إعادة تشغيله، وقارن النتيجة بخط الأساس.',
      '6. وثق القرار والاختبار والنتيجة في docs/REDIS_DECISION.md.'
    ],
    promptRefs: [],
    outputs: ['docs/REDIS_DECISION.md'],
    checklist: [
      'يرتبط الاختيار بمتطلب أو قياس ملموس، لا بالانتشار أو التفضيل الشخصي.',
      'لدى مسار التجاوز مبرر واضح وخطوة أو حد لإعادة النظر.',
      'المخبأ غير مرجعي وتوجد سياسة صلاحية وإبطال واتساق ومصدر حقيقة.',
      'المفاتيح لا تكشف بيانات مستخدم أو مستأجر آخر عند وجود عزل بيانات.',
      'تحدد المهام الخلفية التكرار والفشل وإعادة المحاولة ومعنى الإقرار للمستخدم.',
      'سُجلت نتيجة الاختبار قبل الاعتماد أو تم توثيق سبب Not Run.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 48,
  },
  {
    id: 'integrated-project-qa',
    number: '49',
    slug: 'integrated-project-qa',
    title: 'QA: مراجعة متكاملة قبل التسليم',
    subtitle: 'تحقق من المتطلبات والتصميم والتجاوب والوصول والتكامل بدليل صريح',
    category: 'qa',
    categoryName: 'الجودة والتحقق الهندسي',
    stageTag: 'التحقق من المنتج المتكامل',
    summary: 'راجع التطبيق المرتبط من البداية للنهاية مقابل PRD وSRS والتصميم المعتمد. افحص الرحلات الوظيفية والتجاوب عند خمسة عروض ووصول لوحة المفاتيح والتكامل مع API وقاعدة البيانات، وسجل لكل فحص Passed أو Failed أو Not Run مع الدليل والمتابعة.',
    tags: ['QA', 'Acceptance Criteria', 'Integration', 'Responsive', 'Accessibility', 'WCAG 2.2', 'Passed Failed Not Run'],
    contentTypes: ['code', 'checklist'],
    diagramCount: 0,
    promptCount: 0,
    codeSnippetCount: 1,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic49QaHtml),
    htmlContent: topic49QaHtml,
    goal: 'إنشاء docs/FINAL_QA_REPORT.md يربط حالات الفحص بمعايير القبول ويثبت النتائج الفعلية للمتطلبات والتصميم والتجاوب والوصول والتكامل.',
    prerequisites: [
      'المخرجات المتكاملة من المواضيع 45–48، مع استخدام Not Run للحالات التي لا تتوفر بيئتها.',
      'متطلبات PRD وSRS، ومراجع UX Blueprint وScreen Inventory وDesign System أو البدائل المعتمدة في مشروعك.'
    ],
    steps: [
      '1. حوّل معايير قبول PRD وSRS إلى حالات فحص مع خطوات ونتيجة متوقعة ودليل مطلوب.',
      '2. نفذ الرحلات الرئيسية وحالات الرفض والخطأ، واربط كل نتيجة بمتطلب ودور مستخدم.',
      '3. قارن الشاشات وحالاتها بمراجع التصميم المعتمدة وسجل الانحرافات التي تحتاج قرارًا.',
      '4. افحص المسارات الرئيسية عند 390 و768 و1024 و1366 و1440 بكسل، وسجل القص والتداخل والتمرير والاتجاه RTL/LTR.',
      '5. افحص لوحة المفاتيح والتركيز والتسميات والأخطاء والتباين، وأكمل فحص قارئ الشاشة أو دوّن تعذر تنفيذه.',
      '6. اختبر الواجهة وAPI وقاعدة البيانات على بيئة متكاملة، أو ضع حالات التكامل غير المتاحة ضمن Not Run.',
      '7. أنشئ تذاكر للعيوب، أعد فحص الإصلاحات، وسجل Passed أو Failed أو Not Run في docs/FINAL_QA_REPORT.md.'
    ],
    promptRefs: [],
    outputs: ['docs/FINAL_QA_REPORT.md', 'قائمة عيوب قابلة لإعادة الإنتاج أو قرار جاهزية مع فجوات معلنة'],
    checklist: [
      'لكل حالة فحص متطلب أو مرجع تصميم وطريقة تنفيذ ونتيجة متوقعة.',
      'تعرض النتائج أدلة تشغيل فعلية وبيئة قابلة للتعريف.',
      'جرت مراجعة الوظائف والتصميم والتجاوب والوصول والتكامل كلٌّ بدليله.',
      'اختبرت عروض 390 و768 و1024 و1366 و1440 بكسل أو سجلت سبب عدم توفر أحدها.',
      'حالات Not Run واضحة ولا تظهر في الملخص على أنها اجتازت.',
      'أعيد فحص العيوب المصححة وحالة جوارها لمنع التراجع.',
      'لا يعلن التقرير امتثال WCAG أو جاهزية Full-Stack اعتمادًا على فحص آلي واحد أو واجهة منفصلة.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 49,
  },
];
