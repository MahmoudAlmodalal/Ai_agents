import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';
import { recordIndependentTopicReview } from '@/src/data/learning/group-b-16-19-independent-review.ts';

export const QUESTION_IDS_GROUP_B_16: Record<string, [string, string]> = {
  'database-performance-engineering': ['measure-before-index', 'plan-vs-latency-evidence'],
  'redis-optional-infrastructure': ['cache-need-evidence', 'cache-invalidation-after-update'],
  'integrated-project-qa': ['build-vs-accessibility-evidence', 'test-reproduction-context'],
};

export const VIDEO_CANDIDATES_GROUP_B_16: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'database-performance-engineering': {
    id: 'database-performance-engineering-video-candidate',
    title: 'EXPLAIN: make it make sense — PGConf.EU 2025',
    url: 'https://www.postgresql.eu/events/pgconfeu2025/sessions/session/6795-explain-make-it-make-sense/',
    purpose: 'مرشح لقراءة query plans وقياس الاستعلامات وتحديد ما إذا كان فهرس مناسباً؛ صفحة الجلسة تصف هذه المحاور وتربط تسجيل الجلسة.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.postgresql.eu/events/pgconfeu2025/sessions/session/6795-explain-make-it-make-sense/', evidence: 'صفحة PGConf.EU 2025 تذكر صراحة تفسير query plans ومراقبة ما تبحث عنه قاعدة البيانات لاختيار indexes وإعادة كتابة anti-patterns، وتعرض Watch Session on YouTube. مصدر حديث ومباشر؛ لا يثبت تحسناً على مشروع متعلم. playback/captions/accessibility أو موافقة المالك لم تُراجع.' }],
  },
  'redis-optional-infrastructure': {
    id: 'redis-optional-infrastructure-video-candidate',
    title: 'Cache modernization for speed & resiliency',
    url: 'https://redis.io/resources/videos/cache-modernization-for-speed-and-resiliency/',
    purpose: 'مرشح لمناقشة دوافع cache ومخاطر الأداء ونضج البنية؛ صفحة Redis تذكر فيديو 25 دقيقة. عرضه مؤسسي ومرتبط بـ Redis 8؛ لا يُعامل كمتطلب أو شرح كافٍ لصلاحية/invalidation على تطبيق بسيط.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://redis.io/resources/videos/cache-modernization-for-speed-and-resiliency/', evidence: 'صفحة Redis الرسمية تصف جلسة 25 دقيقة عن architectures للتخزين المؤقت وperformance risks و4-tier cache maturity وRedis 8. الملاءمة لقرار الحاجة جزئية؛ المحتوى المؤسسي لا يحسم invalidation في مشروع فردي. playback/captions/accessibility وموافقة المالك غير منفذة.' }],
  },
  'integrated-project-qa': {
    id: 'integrated-project-qa-video-candidate',
    title: 'Running tests with Playwright',
    url: 'https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/running-tests-with-playwright',
    purpose: 'مرشح لتسجيل نتيجة اختبار قابلة للإعادة؛ صفحة Microsoft Learn تذكر headless/headed mode وفحص trace خطوة بخطوة. يلزم إضافة commit/البيئة/المتطلبات الخاصة بمشروع المتعلم.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/running-tests-with-playwright', evidence: 'صفحة Microsoft Learn تسمي Episode 3 وتصف تشغيل Playwright headless/headed واستعمال trace لاستعراض تنفيذ الاختبار خطوة بخطوة. هذا يساند توثيق الدليل، لكنه لا يغطي RTL أو keyboard وحده. التشغيل/captions/accessibility وowner signoff لم تُنفذ.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_16: Record<string, TopicDraft> = {
  'database-performance-engineering': {
    slug: 'database-performance-engineering',
    objectives: ['حدد استعلاماً بطيئاً من قياس قابل لإعادة الفحص قبل اقتراح تحسين.', 'قارن query plan/count قبل وبعد ووازن الفهرس بكلفة الكتابة.'],
    sections: [
      { id: 'inputs', heading: 'قِس قبل التعديل', body: 'المدخل مسار القراءة وبياناته من مخرجي الموضوع 46 journey-spec وjourney-log، مع استعلام وبيانات ممثلة وبيئة آمنة. سجل الزمن والحجم وعدد الصفوف. EXPLAIN يوضح الخطة؛ EXPLAIN ANALYZE ينفذ العبارة، فاستخدمه على قراءة آمنة أو dev.' },
      { id: 'example', heading: 'مثال محلول: فلترة حسب الحالة', body: 'افحص استعلام status وcreated_at. قد يفيد index مركب إذا وافق pattern الفلترة والترتيب، لكنه يزيد مساحة وكلفة الكتابة. لا تضفه لمجرد ظهور العمود في WHERE.' },
      { id: 'exercise', heading: 'برومبت مقارنة', body: 'برومبت: «اجمع query والخطة والحجم من test، اقترح تغييراً واحداً وقارن قبل/بعد. لا تنفذ كتابة ولا تعلن تحسناً من الخطة وحدها». سلّم القياس إلى قرار Redis.' },
    ],
    practicalSteps: [
      { id: 'baseline', instruction: 'حدد استعلام رحلة المستخدم وسجل مصدره وبيئته وزمنه وحجم البيانات.', expectedOutput: 'docs/DB_PERFORMANCE_BASELINE.md بخطة أو مقياس فعلي.' },
      { id: 'one-change', instruction: 'جرّب تحسينا واحداً في test وقارن الخطة والزمن والصفوف.', expectedOutput: 'جدول قبل/بعد مع كلفة الكتابة والتخزين؛ القياس غير المنفذ Not Run.' },
      { id: 'decision', instruction: 'وثق سبب اعتماد/رفض التغيير وmigration إن لزم.', expectedOutput: 'قرار مرتبط بقياس دون تعديل قاعدة إنتاج.' },
    ],
    workedExample: { id: 'query-plan-record', title: 'خطة قراءة', context: 'استعلام test يفلتر status ويرتب created_at.', result: 'تسجل environment=test وحجم العلاقة والخطة. يمكن إبقاء sequential scan إذا الجدول صغير؛ لا يدعى فرق أداء قبل إعادة القياس.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ما الذي يسبق إنشاء فهرس؟', options: ['ملاحظة استعلام وخطة/قياس مناسب.', 'فهرس كل عمود.', 'نقل البيانات إلى Redis.'], correct: 0, explanation: 'القياس يحدد المشكلة والفهرس له كلفة.' },
      { objective: 2, prompt: 'Index Scan في plan يثبت ماذا؟', options: ['أن query أسرع دائماً.', 'أن الخطة استخدمت فهرساً؛ يلزم قياس سياقي للمقارنة.', 'أن الصيانة لم تعد لازمة.'], correct: 1, explanation: 'نوع الخطة وحده لا يثبت زمن المستخدم أو تحسناً.' },
    ],
    outputs: [{ id: 'db-baseline', description: 'Query وخطة/زمن وبيئة وحجم بيانات.' }, { id: 'db-change', description: 'مقارنة وقرار index مع كلفته.' }],
    criteria: [
      { id: 'measurement-context', outputId: 'db-baseline', name: 'سياق القياس', description: 'الاستعلام والبيئة والبيانات واضحة والفحص آمن.', evidencePrompt: 'أرفق اسم query وبيئة وتاريخ القياس.' },
      { id: 'tradeoff', outputId: 'db-change', name: 'مفاضلة موثقة', description: 'القرار يقارن نتيجة وكلفة ولا يفترض التحسن.', evidencePrompt: 'أرفق خطة قبل/بعد أو صرح بأن المقارنة لم تجر.' },
    ],
    reviewNote: 'راجع المؤلف تحذير تنفيذ EXPLAIN ANALYZE وكلفة الفهرس. يقبل المثال عدم إضافة index عند غياب حاجة ويمنع ادعاء فرق غير مقاس.',
  },
  'redis-optional-infrastructure': {
    slug: 'redis-optional-infrastructure',
    objectives: ['قرر Redis وفق مشكلة مقاسة ومتطلبات تبرر خدمة إضافية.', 'إن اعتمد cache فحدد TTL والإبطال ومصدر الحقيقة واختبر stale/failure.'],
    sections: [
      { id: 'inputs', heading: 'قرار مشروط', body: 'المدخل مخرجا الموضوع 47 db-baseline وdb-change وقياس الوصول ومتطلبات التوافر. قارن Redis بتحسين SQL أو cache داخل العملية أو عدم cache، مع كلفة التشغيل والمراقبة والخصوصية.' },
      { id: 'example', heading: 'مثال محلول: cache-aside', body: 'افحص key مع TTL؛ عند miss اقرأ المصدر ثم خزّن. عند التحديث أبطل key أو اتبع TTL محدداً. في هذا النمط تبقى قاعدة البيانات المعتمدة مصدر الكتابة، وRedis نسخة cache قابلة لإعادة البناء. لا تخبئ بيانات أشخاص بلا عزل.' },
      { id: 'exercise', heading: 'برومبت قرار', body: 'برومبت: «استخدم القياس لتقرر هل يلزم Redis. قارن البدائل وكلفة التشغيل. إن أوصيت به فحدد key/TTL/invalidation/failure behavior واختبر stale data». قد يكون القرار تأجيله.' },
    ],
    practicalSteps: [
      { id: 'decision-record', instruction: 'اكتب المشكلة والقياس والبدائل وكلفة Redis وسلوك النظام عند التعطل.', expectedOutput: 'docs/REDIS_DECISION.md يقرر adopt/defer/no وسبباً أو فجوة.' },
      { id: 'cache-contract', instruction: 'إذا اعتمدته كـ cache، حدد key غير شخصي وTTL وإبطالاً ومصدر الكتابة المرجعي في هذا التصميم.', expectedOutput: 'جدول key/value/TTL/invalidation/privacy؛ وإلا اكتب غير منطبق.' },
      { id: 'failure-check', instruction: 'اختبر hit/miss/stale/unavailable على test إذا شغلت الخدمة.', expectedOutput: 'نتيجة حقيقية أو Not Run؛ المصدر الأصلي معروف عند failure.' },
    ],
    workedExample: { id: 'defer-redis', title: 'قرار تأجيل', context: 'قياس مشروع صغير لا يظهر bottleneck قراءة.', result: 'Decision=defer. Keep DB query and remeasure with representative growth; no cache dependency or code added.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'متى يكون عدم استخدام Redis معقولاً؟', options: ['لا يوجد قياس أو شرط يبرر التشغيل الإضافي.', 'كل PostgreSQL يحتاجه.', 'لا يمكن رفضه.'], correct: 0, explanation: 'التعقيد يحتاج سبباً؛ التأجيل قرار سليم عند غياب الحاجة.' },
      { objective: 2, prompt: 'في نمط cache-aside، ما الذي يقلل stale بعد تعديل المصدر؟', options: ['TTL/invalidation مرتبطان بتحديث المصدر ومختبران.', 'تسمية key باسم الشخص.', 'اعتبار قيمة cache هي مصدر الكتابة المعتمد.'], correct: 0, explanation: 'في نمط cache-aside تحدد قاعدة البيانات المعتمدة مصدر الكتابة؛ Redis هنا نسخة cache مؤقتة. تصاميم Redis الأخرى قد تختلف.' },
    ],
    outputs: [{ id: 'redis-decision', description: 'قرار مبني على قياس لإضافة Redis أو تأجيله.' }, { id: 'cache-policy', description: 'عقد key وTTL والإبطال والخصوصية عند اعتماده.' }],
    criteria: [
      { id: 'choice-evidence', outputId: 'redis-decision', name: 'سبب الاختيار', description: 'القرار مرتبط بقياس أو يحدد فجوة القياس وخطوتها.', evidencePrompt: 'أرفق baseline أو ما لم يجر وخطوة جمعه.' },
      { id: 'consistency', outputId: 'cache-policy', name: 'مصدر واتساق', description: 'عند الاعتماد يكون TTL والإبطال ومصدر الحقيقة واضحاً.', evidencePrompt: 'اعرض key غير حساس وTTL وسيناريو stale.' },
    ],
    reviewNote: 'راجع المؤلف اختيار Redis كخدمة cache اختيارية وأن تأجيلها مخرج صحيح. المثال محدد بنمط cache-aside؛ لا يعمم دور Redis على تصاميم تخزين أخرى.',
  },
  'integrated-project-qa': {
    slug: 'integrated-project-qa',
    objectives: ['اربط المتطلبات الحرجة بمستويات اختبار وأدلة قابلة للإعادة.', 'راجع الوظائف والأمان والوصولية والتوافق مع حالات Passed/Failed/Not Run.'],
    sections: [
      { id: 'inputs', heading: 'ابدأ بالمتطلب والمخاطر', body: 'المدخل PRD/SRS وAPI contract والفحوص السابقة، ومنها مخرجا الموضوع 48 redis-decision/cache-policy ونتيجة فحص cache إن اعتمده المشروع. حدد رحلة ومخاطر ثم اختر فحصاً مناسباً. build ناجح لا يثبت الوصولية أو كل الرحلات.' },
      { id: 'example', heading: 'مثال محلول: عزل بيانات', body: 'متطلب "يرى المستخدم بياناته فقط" يرتبط باختبار API يطلب سجل غيره، وE2E يفحص رسالة الرفض، ومراجعة يدوية تمنع تسرب الاسم. لكل تجربة بيئة test.' },
      { id: 'exercise', heading: 'برومبت تقرير', body: 'برومبت: «راجع traceability matrix والنتائج. لا تحول Not Run إلى Passed. أضف خطوات الإعادة والبيئة والتاريخ وأثر الفشل». سلّم الفجوات إلى خيار التشغيل التالي.' },
    ],
    practicalSteps: [
      { id: 'trace', instruction: 'اربط كل متطلب حرج باختبار أو مراجعة ودليل.', expectedOutput: 'docs/QA_EVIDENCE.md يحوي requirement/test/evidence/status.' },
      { id: 'risk-check', instruction: 'نفذ الفحوص الملائمة على test ببيانات آمنة.', expectedOutput: 'نتائج بوقت وأمر وبيئة؛ ما لم ينفذ Not Run مع السبب.' },
      { id: 'prioritize', instruction: 'صنف الفجوات حسب أثرها واكتب المالك والخطوة.', expectedOutput: 'قائمة عيوب فيها إعادة إنتاج وقرار حجب إصدار إن لزم.' },
    ],
    workedExample: { id: 'privacy-trace', title: 'تتبع خصوصية', context: 'متطلب عزل سجلات المستخدمين.', result: 'REQ-PRIV-01 → API other-owner forbidden test; UI disclosure review remains Not Run. لا يعلن الإطلاق حتى تحسم الفجوة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'نجح build ولم يجر RTL أو keyboard. كيف تسجل؟', options: ['كل الوصولية Passed.', 'build Passed، وفحصا RTL/keyboard Not Run.', 'احذف المتطلب.'], correct: 1, explanation: 'كل نتيجة تخص فحصاً منفذاً ولا تعمم نتيجة build.' },
      { objective: 2, prompt: 'ما الذي يجعل QA evidence قابلاً لإعادة الاستخدام؟', options: ['اسم الاختبار وحده.', 'متطلب وبيئة وأمر ونتيجة وخطوات.', 'رقم إجمالي بلا سياق.'], correct: 1, explanation: 'السياق والخطوات يتيحان إعادة التجربة وتفسيرها.' },
    ],
    outputs: [{ id: 'qa-matrix', description: 'مصفوفة متطلبات وفحوص ونتائج قابلة للإعادة.' }, { id: 'qa-gaps', description: 'فجوات وأثر ومالك وخطوة وحالة release.' }],
    criteria: [
      { id: 'traceability', outputId: 'qa-matrix', name: 'تتبع الدليل', description: 'لكل مطلب فحص مناسب أو Not Run صريح.', evidencePrompt: 'أرفق مطلباً وبيئة وأمراً ونتيجة.' },
      { id: 'blocker', outputId: 'qa-gaps', name: 'فجوة مملوكة', description: 'الفجوة لها أثر وخطوة ولا تختفي من بوابة الإصدار.', evidencePrompt: 'اعرض فجوة ومالكها وما يمنع حسمها.' },
    ],
    reviewNote: 'راجع المؤلف build مقابل accessibility وربط مطلب خصوصية بعدة أدلة. الحالات غير المنفذة تبقى واضحة.',
  },
};

const INDEPENDENT_REVIEW_NOTES_GROUP_B_16: Record<string, string> = {
  'database-performance-engineering': 'قرأت هدف القياس المتكرر ومقاطع خط الأساس وN+1 والفهرس والتزامن والتقرير. المثال الآن يطابق بيئة test في سياقه ونتيجته. db-baseline وdb-change يقدمان سياقاً وقرار مفاضلة واضحين ويغذيان قرار Redis التالي. الأمثلة توضيحية؛ لم ينفذ قياس على مشروع متعلم.',
  'redis-optional-infrastructure': 'راجعت مساري cache والمهام الخلفية بوصف Redis اختياراً مشروطاً، مع مصدر حقيقة وTTL والإبطال والخصوصية وسلوك التعطل. خيار التأجيل مخرج صالح عند غياب دليل حاجة. redis-decision وcache-policy يستهلكهما موضوع QA؛ لم تشغّل خدمة Redis أو فحوصها هنا.',
  'integrated-project-qa': 'راجعت ربط المتطلب بالفحص والدليل، وتغطية التصميم والتجاوب والوصولية والتكامل وإعادة الفحص. المثال يفصل فحص API عن مراجعة الواجهة التي تبقى Not Run، ومخرجا qa-matrix وqa-gaps ينتقلان إلى قرارات التشغيل دون ادعاء مرور فحوص فعلية.',
};

recordIndependentTopicReview(TOPIC_DRAFTS_GROUP_B_16, INDEPENDENT_REVIEW_NOTES_GROUP_B_16,
  'راجعت السؤالين والخيارات ومفتاح كل إجابة والتعليل مقابل الهدف والمحتوى؛ لا يوجد مفتاح ملتبس أو ادعاء يتجاوز الدرس. سياسة النقاط المقبولة في issue #70 تمنح نقطة للصحيح وصفر للخطأ أو غير المجاب، مع محاولات غير محدودة وتفسير بعد الإرسال وحفظ كل المحاولات بإصدارات السؤال والسياسة. هذا لا يثبت إتقان المتعلم.',
  'راجعت المخرجين ومطابقة كل معيار لمخرجه وسؤال الدليل. سياسة التقييم العملي المقبولة في issue #70 ذاتية بثلاثة مستويات وبلا حد إتقان أو تحقق مستقل للصحة.',
);

export const LEARNING_CONTENT_GROUP_B_16: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_16, QUESTION_IDS_GROUP_B_16, VIDEO_CANDIDATES_GROUP_B_16);

// Topic 47's corrected worked-example environment requires fresh offline copies.
LEARNING_CONTENT_GROUP_B_16['database-performance-engineering'].contentVersion = 2;
