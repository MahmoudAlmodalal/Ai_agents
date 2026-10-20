import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';

export const QUESTION_IDS_GROUP_B_13: Record<string, [string, string]> = {
  'python-backend-foundation': ['venv-vs-secret-storage', 'runtime-input-validation-vs-type-hints'],
  'postgresql-database-setup': ['least-privilege-db-role', 'dev-connection-evidence'],
  'backend-architecture-api-contracts': ['contract-fields-before-route', 'borrowhub-optional-rule'],
};

export const VIDEO_CANDIDATES_GROUP_B_13: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'python-backend-foundation': {
    id: 'python-backend-foundation-video-candidate',
    title: 'Structuring a Python Application (Overview)',
    url: 'https://realpython.com/videos/structuring-python-application/',
    purpose: 'مرشح لتقسيم مشروع Python إلى ملفات/حزم مع نظرة إلى تنظيم Django وFlask. لا يفرض هيكلاً واحداً؛ يستخدم المتعلم الهيكل الذي توافق عليه متطلبات المشروع.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://realpython.com/videos/structuring-python-application/', evidence: 'صفحة Real Python تسمي الفيديو وتذكر layouts لسكريبتات وحزم قابلة للتثبيت وتطبيقات ويب منها Flask وDjango. هذا يناسب بنية المجلدات والحدود، لا يغطي أسرار أو deployment. التشغيل/captions/accessibility ومراجعة المالك لم تُنفذ.' }],
  },
  'postgresql-database-setup': {
    id: 'postgresql-database-setup-video-candidate',
    title: 'Create database using PgAdmin — English',
    url: 'https://spoken-tutorial.org/watch/RDBMS%2BPostgreSQL/Create%2Bdatabase%2Busing%2BPgAdmin/English/',
    purpose: 'مرشح لإنشاء قاعدة محلية من pgAdmin مع شاهد مرئي على إعدادها. صفحة Spoken Tutorial تسمي المورد sample video؛ تحقق من إصدار PostgreSQL/pgAdmin الحالي قبل اتباع أي خطوات واجهة.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://spoken-tutorial.org/watch/RDBMS%2BPostgreSQL/Create%2Bdatabase%2Busing%2BPgAdmin/English/', evidence: 'صفحة Spoken Tutorial الرسمية تعرض عنوان Create database using PgAdmin — English وتصفه بأنه sample video، ضمن مسار PostgreSQL الذي يتضمن التثبيت. لا تثبت حداثة الواجهة أو إعدادات صلاحيات المشروع. لم يُختبر التشغيل أو captions أو الوصولية ولا موافقة المالك.' }],
  },
  'backend-architecture-api-contracts': {
    id: 'backend-architecture-api-contracts-video-candidate',
    title: 'API Design and What’s new with Open API? (Google Cloud Next ’17)',
    url: 'https://www.openapis.org/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17',
    purpose: 'مرشح لتقديم OpenAPI كبيانات تقنية محايدة للمورد واتجاهات تصميم API. المورد من 2017؛ يفيد كخلفية مفاهيمية فقط، وتُراجع صيغة OpenAPI الحالية قبل بناء العقد.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.openapis.org/blog/presentation/2017/03/08/api-design-and-whats-new-with-open-api-google-cloud-next-17', evidence: 'صفحة OpenAPI Initiative الرسمية تسمي المورد فيديو وتشرح أنه عن OAS كبيانات REST التقنية المحايدة واتجاهات تصميم API (Google Cloud Next ’17). هذا مناسب لمبدأ contract-first مع قيد قدم النسخة. playback/captions/accessibility ومالك المقرر لم يراجعوه.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_13: Record<string, TopicDraft> = {
  'python-backend-foundation': {
    slug: 'python-backend-foundation',
    objectives: ['جهز بيئة Python معزولة وتبعيات قابلة للإعادة دون حفظ أسرار في Git.', 'قسّم إعداد الخادم ووظائفه واستخدم type hints مع تحقق إدخال عند الحدود.'],
    sections: [
      { id: 'inputs', heading: 'نسخة Python وحدود الإعداد', body: 'ابدأ بسياق الشريحة والمخرجات في الموضوع 37 ui-slice وslice-evidence لتحدد الحاجة إلى Backend، ثم اختر إطار Backend وراجع نسخة Python المدعومة. أنشئ venv وسجل التبعيات بقفل يناسب الأداة. .env محلي مستبعد من Git و.env.example يحوي أسماء متغيرات بلا قيم حساسة.' },
      { id: 'example', heading: 'مثال محلول: هيكل مفاهيمي محايد للإطار', body: 'قبل اختيار Django أو FastAPI، وثق مسؤوليات الإعداد والمنطق والاختبارات من دون إنشاء ملفات إطار بعينه. هذا رسم مفاهيمي؛ لا تنشئ app/config.py أو main.py أو مسارات framework حتى يسجل قرار الإطار في الموضوع 41 أو 42. Type hints توضح التواقيع لكنها لا تتحقق وحدها من كل طلب خارجي.' },
      { id: 'exercise', heading: 'برومبت تأسيس وتسليم', body: 'برومبت: «افحص نسخة Python وملفات المشروع، وجهز هيكلاً صغيراً وإعداداً يتحقق من المتغيرات. لا تعرض الأسرار ولا تختَر إطاراً خارج القرار». الناتج يهيئ PostgreSQL.' },
    ],
    practicalSteps: [
      { id: 'venv', instruction: 'سجل إصدار Python وأنشئ venv محلية مستبعدة من Git.', expectedOutput: 'README يذكر النسخة والمسار؛ لا يدخل مجلد البيئة للمستودع.' },
      { id: 'dependencies', instruction: 'ثبت أقل التبعيات اللازمة واحفظ lockfile/إصدارات متوافقة.', expectedOutput: 'ملف تبعيات يعيد البيئة ونتيجة compileall أو فحص موثق.' },
      { id: 'config', instruction: 'أنشئ إعداداً يفحص المتغيرات المطلوبة وقالباً بلا أسرار.', expectedOutput: '.env.example أسماء فقط و.gitignore يستبعد .env.' },
    ],
    workedExample: { id: 'python-skeleton', title: 'خريطة تحضير محايدة للإطار', context: 'مشروع سيختار Django أو FastAPI لاحقاً؛ لا توجد ملفات إطار بعد.', result: 'backend/README.md (نسخة Python وتشغيل venv)؛ docs/BACKEND_RESPONSIBILITIES.md (مسؤوليات config/domain/tests مفاهيمياً)؛ .env.example بأسماء متغيرات فقط. أجّل entry point وملفات framework إلى ما بعد اختيار الإطار. هذا لا يثبت اتصال قاعدة بيانات.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ما فائدة venv؟', options: ['عزل تبعيات المشروع وتوثيقها.', 'تشفير .env.', 'نشر التطبيق.'], correct: 0, explanation: 'venv تعزل المكتبات؛ لا تخزن سراً ولا تنشر التطبيق.' },
      { objective: 2, prompt: 'دالة API تستقبل JSON خارجياً. ماذا يثبت type hint وحده؟', options: ['أنه تحقق وقت التشغيل من قيمة المستخدم.', 'يساعد الأدوات والمطور على فهم النوع؛ يلزم تحقق عند حد الطلب.', 'أنه يخفي القيمة من السجلات تلقائياً.'], correct: 1, explanation: 'type hints لا تفرض التحقق وقت التشغيل. استخدم تحققاً مناسباً عند حد الإدخال، واحفظ القيم السرية خارج Git كما يوضح قالب البيئة.' },
    ],
    outputs: [{ id: 'python-env', description: 'نسخة وهيكل وتبعيات موثقة.' }, { id: 'config-template', description: 'قالب إعداد بلا قيم سرية وفحص أخطاء آمن.' }],
    criteria: [
      { id: 'reproducible', outputId: 'python-env', name: 'إعادة البيئة', description: 'تبعيات ونسخة وأمر فحص موثقة دون ادعاء تجربة غير منجزة.', evidencePrompt: 'أرفق الأمر والنسخة ونتيجة الفحص.' },
      { id: 'secret-boundary', outputId: 'config-template', name: 'حد الأسرار', description: 'القالب يخلو من قيم وملف الإعداد مستبعد.', evidencePrompt: 'أظهر أسماء المتغيرات وقاعدة التجاهل فقط.' },
    ],
    reviewNote: 'راجع المؤلف venv والتبعيات وحدود type hints مقابل تحقق الطلب. المخرج ينتقل إلى قاعدة تطوير دون كشف سر.',
  },
  'postgresql-database-setup': {
    slug: 'postgresql-database-setup',
    objectives: ['جهز قاعدة PostgreSQL تطويرية بحساب تطبيق محدود وإعداد اتصال لا يكشف الأسرار.', 'سجل فحص الاتصال ببيئة محددة، وافصل استراتيجية الترحيل عن تطبيقها حتى اختيار ORM في الموضوع 41 أو 42.'],
    sections: [
      { id: 'inputs', heading: 'حدد البيئة والاتصال', body: 'المدخل ERD ومخرجا الموضوع 38 python-env وconfig-template (نسخة Python وvenv و.env.example مع تجاهل .env في Git)، إضافة إلى إطار Backend الذي سيُختار. سجل إصدار PostgreSQL وطريقة تشغيله محلياً أو لدى المزود؛ أسماء الخدمات والمنافذ تختلف. افصل دور التطبيق عن superuser واحفظ كلمة المرور خارج Git. لا تفترض أن ORM أو models أو migrations موجودة بعد.' },
      { id: 'example', heading: 'مثال محلول: سجل اتصال غير منفذ', body: 'قالب الدليل يطلب SELECT 1 ويسجل البيئة والتاريخ بعد تنفيذه؛ هنا النتيجة Not Run إلى أن ينفذ المتعلم الاستعلام ويحفظ مخرجه. استراتيجية migration توثق فقط؛ تطبيق schema مؤجل حتى اختيار ORM وإعداد models في الموضوع 41 أو 42. نجاح استعلام لاحق يثبت الاتصال بتلك البيئة فقط، ولا يثبت الإنتاج أو النسخة الاحتياطية.' },
      { id: 'exercise', heading: 'برومبت ومخرج التسليم', body: 'برومبت: «طابق تهيئة PostgreSQL مع ERD، وافصل حساب الإدارة عن التطبيق. استخدم أسماء متغيرات دون قيم، وسجل أمر SELECT 1 ونتيجته الفعلية أو Not Run. وثق استراتيجية migration بلا تطبيقها قبل اختيار ORM وبناء models. لا تنفذ إسقاطاً أو ترحيلاً إنتاجياً». سلّم سجل الاتصال إلى موضوع API.' },
    ],
    practicalSteps: [
      { id: 'dev-db', instruction: 'وثق طريقة تشغيل قاعدة تطوير وإصدارها ومتطلبات الاتصال.', expectedOutput: 'docs/POSTGRES_SETUP.md يصف البيئة والمتغيرات بالاسم فقط.' },
      { id: 'least-privilege', instruction: 'حدد دور تطبيق بالامتيازات اللازمة واترك الإدارة منفصلة.', expectedOutput: 'جدول دور/امتيازات بلا كلمة مرور محفوظة في Git.' },
      { id: 'verify-schema', instruction: 'سجل حالة SELECT 1 ببيئة التطوير وطابق حدود التخطيط مع التنفيذ. لا تطبق migration هنا؛ أجّلها حتى اختيار Django/FastAPI وإعداد ORM في الموضوع 41 أو 42.', expectedOutput: 'نتيجة SELECT 1 الفعلية أو Not Run؛ migration=Deferred حتى اختيار الإطار/ORM ووجود models، لا migration=applied.' },
    ],
    workedExample: { id: 'postgres-check', title: 'قالب سجل اتصال', context: 'توثيق إعداد قاعدة تطوير؛ لا يتضمن هذا المثال تنفيذ أمر أو تطبيق مخطط.', result: 'Environment=not-recorded; SELECT 1=Not Run; migration=Deferred until ORM/models are selected in topic 41 or 42. Production connectivity and restore drill=Not Run.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أي حساب تستخدمه خدمة التطبيق عادة؟', options: ['superuser لكل طلب.', 'حساب تطبيق محدود بالعمليات المطلوبة.', 'كلمة مرور مشتركة للفريق.'], correct: 1, explanation: 'أقل صلاحية تحد أثر خطأ أو اختراق التطبيق.' },
      { objective: 2, prompt: 'نجح SELECT 1 على جهازك. ماذا يثبت؟', options: ['إنتاج ونسخ احتياطية تعمل.', 'اتصال بيئة التطوير التي فحصتها نجح في ذلك الوقت.', 'مطابقة ERD بالكامل.'], correct: 1, explanation: 'الفحص محدد ببيئته؛ الإنتاج والمخطط والاستعادة تحتاج أدلة مستقلة.' },
    ],
    outputs: [{ id: 'pg-setup', description: 'خطوات وقالب اتصال تطويري بلا أسرار مع سجل استراتيجية ترحيل مؤجلة.' }, { id: 'pg-check', description: 'سجل نتيجة SELECT 1 ببيئة محددة أو Not Run؛ تطبيق migration والمراجعة الفعلية مؤجلان إلى ما بعد اختيار ORM/models.' }],
    criteria: [
      { id: 'db-role', outputId: 'pg-setup', name: 'حساب محدود', description: 'التوثيق يميز حساب التطبيق عن الإدارة.', evidencePrompt: 'أظهر اسم الدور ومستوى امتيازه دون سر.' },
      { id: 'env-result', outputId: 'pg-check', name: 'نتيجة محددة البيئة', description: 'النتيجة تسمي البيئة والفحوص التي لم تجر.', evidencePrompt: 'أرفق تاريخاً وبيئة وأمر الفحص وحالة restore.' },
    ],
    reviewNote: 'راجع المؤلف حدود SELECT 1، أقل الصلاحيات، وعدم تخزين السر. نجاح dev لا يثبت الإنتاج ولا الاستعادة.',
  },
  'backend-architecture-api-contracts': {
    slug: 'backend-architecture-api-contracts',
    objectives: ['حوّل رحلة مستخدم إلى عقد API يحدد المورد والطلب والاستجابة والأخطاء.', 'افصل حدود HTTP عن قواعد العمل واربط كل قاعدة بمصدر متطلبات.'],
    sections: [
      { id: 'inputs', heading: 'العقد يسبق route', body: 'المدخل PRD/SRS وERD ورحلة المستخدم، ومخرجا الموضوع 39 pg-setup وpg-check بحدود اتصال وتخطيط قاعدة التطوير وحالة SELECT 1 أو Not Run. استخدم هذه المعلومات لتحديد قيود التخزين ذات الصلة فقط؛ لا تفترض أن migration طُبقت. ثبت method/path/request/response/auth/errors. لا تنسخ قاعدة أو دور BorrowHub إلى مشروع الطالب ما لم تنص وثائقه عليه.' },
      { id: 'example', heading: 'مثال محلول: إنشاء مورد', body: 'POST /api/items يستقبل name وcategoryId؛ النجاح 201 مع id؛ قيمة غير صالحة تعيد خطأ منظماً. قواعد pagination أو idempotency تدخل فقط إذا تطلبها المصدر.' },
      { id: 'exercise', heading: 'برومبت ومخرج', body: 'برومبت: «استخرج endpoints من هذه الرحلة، واذكر method/path/request/response/errors/auth ومصدر كل قاعدة. أظهر التعارضات كأسئلة ولا تختر إطاراً». العقد يغذي اختيار Django أو FastAPI.' },
    ],
    practicalSteps: [
      { id: 'map-journey', instruction: 'اختر رحلة واربط فعل المستخدم بالطلب والنتيجة التي تحتاجها الواجهة.', expectedOutput: 'جدول journey → endpoint → متطلب مصدر.' },
      { id: 'write-contract', instruction: 'اكتب عقد OpenAPI أو docs/API_CONTRACTS.md مع نجاح وفشل.', expectedOutput: 'العقد يوضح الحقول ورموز الحالات والتحقق والمصادقة إن لزمت.' },
      { id: 'layers', instruction: 'ارسم route/controller → service → persistence وسم ما لم ينفذ.', expectedOutput: 'مخطط طلب لا يخفي قواعد عمل داخل طبقة HTTP.' },
    ],
    workedExample: { id: 'create-item-api', title: 'عقد إنشاء', context: 'عميل مصرح يضيف عنصراً إلى مشروعه.', result: 'Request {name, categoryId}; success 201 {id,name}; validation 400 {code:"invalid_input"}. التنفيذ الفعلي لاحق.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ما الذي يجعل عقد API قابلاً للتنفيذ؟', options: ['اسم route فقط.', 'method وحقول الطلب والاستجابة والحالات.', 'اسم framework.'], correct: 1, explanation: 'العقد يحدد الرسائل والنتائج التي يتفق عليها الطرفان.' },
      { objective: 2, prompt: 'مثال BorrowHub يحدد سقفاً غير موجود في مشروعك. ماذا تفعل؟', options: ['تنسخه.', 'تتركه خارج العقد أو تفتحه كسؤال.', 'تطبقه في الواجهة وحدها.'], correct: 1, explanation: 'BorrowHub اختياري؛ لا يصبح شرطاً للمشروع إلا إذا كان ضمن متطلباته المعتمدة.' },
    ],
    outputs: [{ id: 'api-contract', description: 'عقد endpoint مع النجاح والفشل ومراجع القواعد.' }, { id: 'api-layers', description: 'مخطط مسؤوليات HTTP والخدمة والتخزين.' }],
    criteria: [
      { id: 'contract-shape', outputId: 'api-contract', name: 'حقول وحالات', description: 'العقد يوضح الطلب والنجاح والخطأ والمصادقة المطلوبة.', evidencePrompt: 'أرفق endpoint وحقل ومصدر شرطه.' },
      { id: 'rule-source', outputId: 'api-layers', name: 'مصدر قاعدة العمل', description: 'كل قاعدة موثقة أو موسومة كسؤال، لا مستنسخة من المثال.', evidencePrompt: 'اربط قاعدة بوثيقة أو بسجل قرار مفتوح.' },
    ],
    reviewNote: 'راجع المؤلف شكل العقد وفصل قواعد المشروع عن حالة BorrowHub. المخرج يمكن تمريره لأي من بديلَي الإطار.',
  },
};

export const LEARNING_CONTENT_GROUP_B_13: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_13, QUESTION_IDS_GROUP_B_13, VIDEO_CANDIDATES_GROUP_B_13);
