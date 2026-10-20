import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';

export const QUESTION_IDS_GROUP_B_14: Record<string, [string, string]> = {
  'django-backend': ['database-constraint-vs-ui-check', 'migration-risk-review'],
  'fastapi-backend': ['request-schema-validation', 'migration-generated-diff-review'],
  'auth-permissions': ['authenticated-identity-vs-authorization', 'server-enforced-ownership'],
  'services-selectors': ['selector-read-side-effects', 'service-invariant-ownership'],
};

export const VIDEO_CANDIDATES_GROUP_B_14: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'django-backend': {
    id: 'django-backend-video-candidate',
    title: 'Building With Django REST Framework (Overview)',
    url: 'https://realpython.com/videos/building-drf-overview/',
    purpose: 'مرشح لعرض serializers وviews/ViewSets وURLs والصلاحيات في API قائم على Django. تصف الصفحة عينة شُغلت على Python 3.13 وDjango 5.1.2 وDRF 3.15.2؛ تحقق من الإصدارات الحالية.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://realpython.com/videos/building-drf-overview/', evidence: 'صفحة Real Python تذكر REST، serializers، Django views/ViewSets، URLs والصلاحيات؛ وتذكر إصدارات العينة 3.13/5.1.2/3.15.2. الملاءمة مباشرة لمخرجات الموضوع. لم يُختبر التشغيل أو captions أو الوصولية، ومراجعة المالك غير موجودة.' }],
  },
  'fastapi-backend': {
    id: 'fastapi-backend-video-candidate',
    title: 'Python REST APIs With FastAPI',
    url: 'https://realpython.com/courses/python-rest-apis-with-fastapi/',
    purpose: 'مرشح لدروس path parameters وPydantic وGET/POST/PUT/DELETE والاختبار/التوثيق؛ صفحة Real Python تسرد 12 درساً و3 تمارين عملية.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://realpython.com/courses/python-rest-apis-with-fastapi/', evidence: 'فهرس دورة Real Python يسرد درساً مرئياً لـ FastAPI وطلبات CRUD وPydantic validation وSwagger/HTTPie وتمارين. صلة عملية بواجهة API؛ الاستضافة/التشغيل الآمن تحتاج مواد أخرى. playback/captions/accessibility وقبول المالك لم تُفحص.' }],
  },
  'auth-permissions': {
    id: 'auth-permissions-video-candidate',
    title: 'REST Easy — API Security Done Right',
    url: 'https://www.djangotv.com/videos/djangocon-us/2015/djangocon-us-2015-rest-easy-api-security-done-right-by-jeff-schenck/',
    purpose: 'مرشح لمقارنة المصادقة والتفويض وفحوص endpoint/object/field/HTTP method، بما فيها حدود الملكية على الاستعلامات. المحتوى في DRF (2015)، لذا يجب مطابقته مع نسخة المشروع الحالية.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.djangotv.com/videos/djangocon-us/2015/djangocon-us-2015-rest-easy-api-security-done-right-by-jeff-schenck/', evidence: 'صفحة DjangoTV تصف الفيديو حول مصفوفات authentication/authorization وأذونات endpoint وobject وfield وHTTP method، مع مثال قيود قائمة على مالك المورد. المورد قديم؛ يراجع فقط الأفكار ويُطابق مع DRF الحالي. لم يُختبر playback/captions/accessibility ولا موافقة المالك.' }],
  },
  'services-selectors': {
    id: 'services-selectors-video-candidate',
    title: 'Service Layer — Ultimate Guide to FastAPI and Backend Development',
    url: 'https://www.oreilly.com/videos/ultimate-guide-to/9781806101337/',
    purpose: 'مرشح لتمييز web layer عن service layer عبر فصل من 10:19 بحسب فهرس الناشر. يطبق المتعلم الفكرة فقط إذا دعمتها بنية المشروع، ولا يفترض أن طبقة إضافية مطلوبة دائماً.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.oreilly.com/videos/ultimate-guide-to/9781806101337/', evidence: 'فهرس O’Reilly لفيديو FastAPI يعرض فصلاً باسم Service Layer (10m 19s) بين API Router وDependency Chaining، ما يطابق حدود الخدمة/القراءة. لا يثبت أن كل مشروع يحتاج هذا النمط؛ قد يتطلب اشتراكاً. التشغيل/captions/accessibility وقبول المالك لم تُراجع.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_14: Record<string, TopicDraft> = {
  'django-backend': {
    slug: 'django-backend',
    objectives: ['حوّل ERD إلى نماذج Django وترحيلات قابلة للمراجعة.', 'افحص أثر migration في تطوير قبل أي تطبيق ذي بيانات مهمة.'],
    sections: [
      { id: 'inputs', heading: 'Django خيار مستقل', body: 'المدخل ERD ومخرجا الموضوع 38 python-env/config-template، مخرجا الموضوع 39 pg-setup/pg-check، ومخرجا الموضوع 40 api-contract/api-layers. استخدم حالة قاعدة التطوير كما سُجلت، ولا تدّع أن migration منفذة قبل إعداد ORM. Django ORM وmigrations مدمجان؛ FastAPI مسار بديل ولا يلزم تنفيذ الإطارين. اختر واحداً وافحص إصدار المكتبات.' },
      { id: 'example', heading: 'مثال محلول: قيد uniqueness', body: 'إذا كان الاسم فريداً داخل organization، فالقيد المركب يوضع عند قاعدة البيانات بعد التحقق من المتطلب. فحص الواجهة وحده لا يحمي كتابات متزامنة.' },
      { id: 'exercise', heading: 'برومبت مراجعة migration', body: 'برومبت: «طابق models مع ERD والقيود. أنشئ migration وافحص أثرها وrollback في dev؛ لا تطبقها على الإنتاج». الناتج يغذي المصادقة في الموضوع 43.' },
    ],
    practicalSteps: [
      { id: 'choose-framework', instruction: 'سجل اختيار Django أو FastAPI وسبباً؛ إذا اخترت Django تجاوز بناء FastAPI.', expectedOutput: 'docs/BACKEND_FRAMEWORK_DECISION.md يذكر الإطار والبديل الذي لم ينفذ.' },
      { id: 'models', instruction: 'أنشئ models من الكيانات والعلاقات والقيود المعتمدة.', expectedOutput: 'نماذج تتبع ERD مع كل اختلاف كقرار أو سؤال.' },
      { id: 'migration', instruction: 'ولّد migration وراجعها على قاعدة تطوير قبل التطبيق.', expectedOutput: 'ملف migration ونتيجة أمر الفحص؛ الإنتاج Not Run.' },
    ],
    workedExample: { id: 'django-migration', title: 'مراجعة حقل جديد', context: 'إضافة category_id إلى نموذج.', result: 'افحص هل الحقل nullable أو يحتاج تعبئة أولاً، ثم راجع upgrade/reverse قبل تطبيقه على dev.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'قيد uniqueness يعتمد على organization وname. ما الذي يحميه عند كتابتين متزامنتين؟', options: ['فحص الواجهة قبل الإرسال.', 'قيد مركب مناسب في قاعدة البيانات بعد تثبيت المتطلب.', 'إخفاء زر الحفظ في الواجهة.'], correct: 1, explanation: 'قيد التخزين يحمي invariant حتى عند التزامن؛ يجب أن يتبع ERD والمتطلبات المعتمدة.' },
      { objective: 2, prompt: 'ما الذي تراجعه قبل migration؟', options: ['تطابق ERD وأثر البيانات وخطة الرجوع في dev.', 'اسم الملف فقط.', 'تطبيقها مباشرة على الإنتاج.'], correct: 0, explanation: 'التوليد لا يثبت سلامة التغيير؛ افحص الأثر أولاً.' },
    ],
    outputs: [{ id: 'django-models', description: 'نماذج Django وقرار إطار مرتبطان بـ ERD.' }, { id: 'django-migration', description: 'migration ونتيجة مراجعتها في بيئة محددة.' }],
    criteria: [
      { id: 'erd-match', outputId: 'django-models', name: 'مطابقة المصدر', description: 'كل حقل/علاقة يتبع ERD أو قراراً موثقاً.', evidencePrompt: 'اربط كياناً بحقول وعلاقات ERD.' },
      { id: 'migration-review', outputId: 'django-migration', name: 'أثر التغيير', description: 'المراجعة تسمي البيئة والأثر ولا تفترض أمان الإنتاج.', evidencePrompt: 'أرفق نتيجة مراجعة الترحيل وما لم يُختبر.' },
    ],
    reviewNote: 'راجع المؤلف أن Django/FastAPI بديلان وأن القيود تحمي التخزين. Migration لا تُطبّق على الإنتاج ضمن التمرين.',
  },
  'fastapi-backend': {
    slug: 'fastapi-backend',
    objectives: ['افصل Pydantic request/response schemas عن SQLAlchemy models.', 'جهز جلسة قاعدة البيانات وراجع Alembic upgrade/downgrade في التطوير.'],
    sections: [
      { id: 'inputs', heading: 'FastAPI خيار مستقل', body: 'المدخل ERD وقرار الإطار، ومخرجا الموضوع 38 python-env/config-template، مخرجا الموضوع 39 pg-setup/pg-check، ومخرجا الموضوع 40 api-contract/api-layers. استخدم حالة اتصال التطوير الموثقة ولا تدّع migration منفذة قبل إعداد ORM. Pydantic يتحقق من الرسائل وSQLAlchemy يمثل التخزين؛ Alembic يدير الترحيلات. اختره أو Django ولا تبنِ الاثنين للمشروع نفسه.' },
      { id: 'example', heading: 'مثال محلول: schema مقابل ORM', body: 'CreateItemRequest يحتوي name/category_id، وصف ORM يمثل الصف، وItemResponse يعيد id وname فقط. لا ترجع حقلاً داخلياً من ORM لمجرد أنه موجود.' },
      { id: 'exercise', heading: 'برومبت ومخرج', body: 'برومبت: «راجع فصل schema/ORM وربط Alembic metadata. اعرض migration وفرق الترقية والتراجع، ولا تطبقها حتى تفحص dev». الناتج يهيئ auth الموحد.' },
    ],
    practicalSteps: [
      { id: 'schemas', instruction: 'أنشئ request وresponse منفصلين عن ORM واختبر قيمة طلب غير صالحة.', expectedOutput: 'مخططان يوضحان حقول الإدخال والمخرج؛ لا يتسرب internal field.' },
      { id: 'session', instruction: 'حدد دورة session عبر dependency؛ استخدم async فقط مع driver مناسب.', expectedOutput: 'اختبار/مخطط يوضح فتح الجلسة وإغلاقها لكل طلب.' },
      { id: 'alembic', instruction: 'اربط metadata وولّد migration تجريبية وافحص upgrade/downgrade على dev.', expectedOutput: 'رأس Alembic ونتيجة تطبيق على dev؛ الإنتاج لم يتغير.' },
    ],
    workedExample: { id: 'fastapi-schema-example', title: 'إنشاء عنصر', context: 'العميل يحتاج id/name ولا يحتاج internal_note.', result: 'CreateItemRequest → SQLAlchemy Item → ItemResponse(id,name).', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أين تتحقق من طول اسم يصل في الطلب؟', options: ['Pydantic request schema.', 'response ORM فقط.', 'README.'], correct: 0, explanation: 'تحقق المدخل يحدث عند حد API قبل تمرير القيمة للمنطق.' },
      { objective: 2, prompt: 'ماذا تفحص في migration مولدة؟', options: ['فرق المخطط واتجاه الترقية/التراجع في dev.', 'وجود الملف فقط.', 'تطبيق الإنتاج لاكتشاف الخطأ.'], correct: 0, explanation: 'التوليد الآلي مسودة تحتاج مراجعة واختباراً.' },
    ],
    outputs: [{ id: 'api-schemas', description: 'مخططات request/response مفصولة عن ORM.' }, { id: 'alembic-record', description: 'migration ومراجعة الجلسة والترحيل في dev.' }],
    criteria: [
      { id: 'schema-boundary', outputId: 'api-schemas', name: 'حد البيانات', description: 'الطلب والمخرج لا يكشفان حقول التخزين غير العامة.', evidencePrompt: 'اعرض حقلاً يُرفض وآخر لا يخرج للعميل.' },
      { id: 'migration-context', outputId: 'alembic-record', name: 'سياق الترحيل', description: 'النتيجة مرتبطة ببيئة وتفحص downgrade.', evidencePrompt: 'أرفق الفرق ورأس Alembic وبيئة التجربة.' },
    ],
    reviewNote: 'راجع المؤلف فصل schemas/ORM وضرورة توافق async driver. ملف migration المولد لا يعد دليلاً على صحة التغيير قبل مراجعته.',
  },
  'auth-permissions': {
    slug: 'auth-permissions',
    objectives: ['فرّق authentication عن authorization وارسم الصلاحيات من SRS.', 'اختبر مستخدماً مجهولاً ومستخدماً بلا صلاحية ومالكاً مسموحاً عند API.'],
    sections: [
      { id: 'inputs', heading: 'المتطلب مصدر الإذن', body: 'المدخل مخرجا الموضوع 40 api-contract وapi-layers، وSRS وإطار Backend المختار، ومعه مخرجا الموضوع 41 django-models/django-migration أو الموضوع 42 api-schemas/alembic-record، بحسب المسار المنفذ وحده. Authentication يثبت الهوية؛ authorization يقرر الفعل. سجل الدور وملكية المورد وفق النموذج المختار. طريقة JWT أو session تتبع التهديدات ومتطلبات المشروع.' },
      { id: 'example', heading: 'مثال محلول: تعديل سجل', body: 'المستخدم authenticated لكن owner_id مختلف. المصادقة نجحت والتفويض يرفض؛ إخفاء زر الواجهة لا يحمي endpoint. اختَر 403 أو 404 حسب العقد وسياسة الخصوصية.' },
      { id: 'exercise', heading: 'برومبت ومخرج أمني', body: 'برومبت: «اشتق مصفوفة permission من SRS. اختبر anonymous وrole-missing وowner. لا تطبع token أو كلمة مرور». الناتج يضبط حدود طبقة الخدمة في الموضوع 44.' },
    ],
    practicalSteps: [
      { id: 'matrix', instruction: 'اربط كل endpoint بدور وشرط ملكية ونتيجة رفض من متطلبات المشروع.', expectedOutput: 'docs/AUTH_PERMISSIONS_SPEC.md يحدد route/role/owner/action ومراجع SRS.' },
      { id: 'guard', instruction: 'نفذ فحص هوية ثم تفويض على الخادم وفق الإطار المختار.', expectedOutput: 'endpoint يرفض العملية عند غياب الصلاحية؛ الواجهة ليست الحارس الوحيد.' },
      { id: 'test-denial', instruction: 'اكتب اختبار مجهول/مسجل بلا دور/مسموح وسجل HTTP status.', expectedOutput: 'نتائج تطابق العقد ولا تطبع اعتماداً أو سراً.' },
    ],
    workedExample: { id: 'owner-check', title: 'رفض تعديل غير مملوك', context: 'مستخدم مسجل يحاول تعديل سجل مستخدم آخر.', result: 'identity=valid; actor=user-3; owner=user-8; action=denied by server. قرار 403/404 يتبع العقد.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ما الفرق بين المصادقة والتفويض؟', options: ['الهوية مقابل الإجراء المسموح.', 'كلاهما تشفير.', 'التفويض في الواجهة فقط.'], correct: 0, explanation: 'هما قراران مختلفان يجب أن يحمي الثاني كل endpoint.' },
      { objective: 2, prompt: 'كيف تثبت أن مالكاً آخر لا يستطيع تعديل المورد؟', options: ['إخفاء الزر فقط.', 'استدعاء API مباشرة بحساب غير مالك وتسجيل الرفض.', 'اختبار المدير فقط.'], correct: 1, explanation: 'اختبار الخادم يتحقق من الحماية عند الحد الحقيقي.' },
    ],
    outputs: [{ id: 'permission-matrix', description: 'مصفوفة دور/ملكية/إجراء مستندة إلى SRS.' }, { id: 'auth-tests', description: 'نتائج رفض المجهول وغير المصرح والسماح.' }],
    criteria: [
      { id: 'role-source', outputId: 'permission-matrix', name: 'مصدر الصلاحية', description: 'السماح والرفض يتبعان SRS أو سؤالاً مفتوحاً.', evidencePrompt: 'أشر إلى متطلب الدور والroute.' },
      { id: 'server-check', outputId: 'auth-tests', name: 'فحص الخادم', description: 'الاختبار يستدعي endpoint ويتحقق من النتيجة.', evidencePrompt: 'أرفق الحالات وHTTP status الفعلي.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين الهوية والتفويض واختبار الملكية عبر API. لا تفرض أدوار BorrowHub أو تخزين token بعينه.',
  },
  'services-selectors': {
    slug: 'services-selectors',
    objectives: ['ضع الكتابة وقاعدة العمل في service داخل حد transaction واجعل selectors للقراءة.', 'اختبر invariant عند التنافس وقس query count قبل أي تحسين.'],
    sections: [
      { id: 'inputs', heading: 'وزع المسؤولية', body: 'المدخل مخرجا الموضوع 40 api-contract وapi-layers، ومخرجا المسار المختار: الموضوع 41 django-models/django-migration أو الموضوع 42 api-schemas/alembic-record، وقواعد PRD/SRS، إضافة إلى مخرجي الموضوع 43 permission-matrix وauth-tests في docs/AUTH_PERMISSIONS_SPEC.md وسجل الاختبارات. استخدم نتيجة الفحص كما هي، بما فيها Not Run. Controller يتعامل مع HTTP، service تنسق الكتابة والمعاملة، selector يقرأ دون أثر جانبي. النمط وسيلة تنظيم تتبع المشروع لا قاعدة مكتبية مطلقة.' },
      { id: 'example', heading: 'مثال محلول: حجز مورد', body: 'صادق على الهوية ثم نفذ فحص تفويض لا يكشف حالة المورد لمستخدم غير مصرح، وفق مصفوفة الموضوع 43. داخل transaction اقفل/اقرأ المورد المصرح به، وأعد فحص شرط التوفر الحساس للتنافس، ثم اكتب الطلب والتزم؛ عند التعارض rollback. selector يجلب القراءة؛ eager loading يستخدم إذا ظهر N+1 في القياس.' },
      { id: 'exercise', heading: 'برومبت ومخرج', body: 'برومبت: «استخرج قاعدة الكتابة من PRD. اقترح service وselector، واختبر التنافس وقس query count قبل/بعد. لا تعمم قاعدة BorrowHub». الناتج يهيئ تكامل الواجهة.' },
    ],
    practicalSteps: [
      { id: 'layer-map', instruction: 'اختر قراءة وكتابة وارسم مسؤولية endpoint/service/selector.', expectedOutput: 'مخطط يوضح أن selector read-only وأن service تملك حد transaction.' },
      { id: 'invariant-test', instruction: 'حدد invariant من وثيقة المشروع واكتب اختباراً يعيد إنتاج التعارض.', expectedOutput: 'اختبار يثبت أن المحاولات لا تنتج حالة ممنوعة وأن الفشل يسبب rollback.' },
      { id: 'measure-queries', instruction: 'سجل عدد الاستعلامات قبل التحسين ثم قارن بعده إذا ظهر دليل N+1.', expectedOutput: 'قبل/بعد أو Not Run؛ لا يذكر رقماً غير مقاس.' },
    ],
    workedExample: { id: 'atomic-request', title: 'طلب ذري مع منع كشف الحالة', context: 'قاعدة مشروع تسمح بحجز مورد متاح مرة واحدة؛ شروط التفويض من مخرج الموضوع 43.', result: 'authenticate → authorize ownership/action without disclosing availability → begin transaction → lock authorized row → re-check authorization and race-sensitive availability → create → commit; conflict/denial → rollback and return policy-consistent response. selector يقرأ القائمة دون كتابة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ما الطبقة المناسبة لقراءة قائمة لا تغير البيانات؟', options: ['Selector.', 'Controller يكتب مباشرة.', 'ملف الإعداد.'], correct: 0, explanation: 'selector يعزل القراءة ويبقى بلا أثر جانبي.' },
      { objective: 2, prompt: 'لماذا قيد أو قفل قاعدة مهم للحجز؟', options: ['يمنع إعادة الرسم.', 'يحمي invariant عند تنافس طلبين.', 'يسرع كل الاستعلامات.'], correct: 1, explanation: 'الذرية تحمي سلامة الحالة؛ لا تضمن أداءً أفضل لكل الاستعلامات.' },
    ],
    outputs: [{ id: 'service-map', description: 'خريطة طبقات الكتابة والقراءة وحد transaction.' }, { id: 'invariant-evidence', description: 'اختبار تنافس وقياس استعلامات حسب البيئة.' }],
    criteria: [
      { id: 'tx-boundary', outputId: 'service-map', name: 'حد المعاملة', description: 'الترتيب يوضح الفشل والكتابة والrollback.', evidencePrompt: 'أشر إلى بداية transaction وما يحدث عند التعارض.' },
      { id: 'measured-rule', outputId: 'invariant-evidence', name: 'دليل المقارنة', description: 'القياس والاختبار مرتبطان بقاعدة ومصدر معلنين.', evidencePrompt: 'أرفق القاعدة والنتيجة أو وسم Not Run.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين service/selector/controller وكلفة تحسين القراءة. مثال التنافس تابع لمتطلبات المشروع وليس مفروضاً من BorrowHub.',
  },
};

export const LEARNING_CONTENT_GROUP_B_14: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_14, QUESTION_IDS_GROUP_B_14, VIDEO_CANDIDATES_GROUP_B_14);
