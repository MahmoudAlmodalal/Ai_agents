import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';
import { recordIndependentTopicReview } from '@/src/data/learning/group-b-16-19-independent-review.ts';

export const QUESTION_IDS_GROUP_B_18: Record<string, [string, string]> = {
  'vercel-frontend-deployment': ['public-vs-runtime-env', 'preview-scope'],
  'netlify-frontend-deployment': ['current-framework-support', 'preview-mock'],
  'backend-database-deployment': ['runtime-secret-configuration', 'health-vs-database-check'],
};

export const VIDEO_CANDIDATES_GROUP_B_18: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'vercel-frontend-deployment': {
    id: 'vercel-frontend-deployment-video-candidate',
    title: 'Account Setup — Vercel Foundations',
    url: 'https://vercel.com/academy/vercel-foundations/vercel-account-setup',
    purpose: 'مرشح من درس ضمن سلسلة فيديوهات Vercel Foundations؛ يغطي ربط repo وإعداد environments/regions. استخدمه لتعلم واجهة المنصة بعد مراجعة إعدادات المشروع الفعلية دون نشر غير مصرح.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://vercel.com/academy/vercel-foundations', evidence: 'صفحة Vercel Academy تصف Vercel Foundations كسلسلة فيديو 9 دروس وتذكر Account Setup لربط repo وإعداد البيئات. درس Account Setup ذو صلة بخطوات المشروع، لكن الفيديو/إتاحة الحساب/الإعدادات الخاصة لم تُفحص. لا playback/captions/accessibility أو owner approval.' }],
  },
  'netlify-frontend-deployment': {
    id: 'netlify-frontend-deployment-video-candidate',
    title: '5 ways to deploy a new Netlify site',
    url: 'https://developers.netlify.com/videos/five-ways-to-deploy-a-new-netlify-site/',
    purpose: 'مرشح يعرض Netlify Drop وDeploy button وGit وCLI. يغطي طرق نشر عامة لا صلاحية Next.js/App Router الحالية؛ يجب مراجعة مصفوفة دعم framework والإصدار أولاً.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://developers.netlify.com/videos/five-ways-to-deploy-a-new-netlify-site/', evidence: 'صفحة Netlify Developers تعرض فيديو بخمس طرق نشر منها Git integration وCLI. تتناول إدارة deployment عامة فقط، ولا تسجل توافق Next.js الحالي أو features/runtime. التشغيل/captions/accessibility ومالك المقرر لم يراجعوه.' }],
  },
  'backend-database-deployment': {
    id: 'backend-database-deployment-video-candidate',
    title: 'Deploy a FastAPI app to Render — Mastering REST APIs with FastAPI',
    url: 'https://www.oreilly.com/videos/mastering-rest-apis/9781835464694/',
    purpose: 'مرشح من فصل فيديو بعنوان Deploy a FastAPI app to Render (6:09) وفصل منفصل لإضافة PostgreSQL مجانية (9:15). راجع عروض المنصة وحدود الخطط ونسخ الأدوات الحالية قبل إعداد مشروع حقيقي.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.oreilly.com/videos/mastering-rest-apis/9781835464694/', evidence: 'فهرس O’Reilly يعرض فصل Deploy a FastAPI app to Render (6:09) وفصل Add a free PostgreSQL database to your FastAPI app (9:15). يغطي التطبيق والقاعدة، لكن الأسعار/الخطط والنسخ تتغير وربما يحتاج اشتراكاً. playback/captions/accessibility وموافقة المالك غير منفذة.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_18: Record<string, TopicDraft> = {
  'vercel-frontend-deployment': {
    slug: 'vercel-frontend-deployment',
    objectives: ['راجع إعداد Vercel ليطابق مشروع Next.js والمستودع ونسخ البناء الفعلية.', 'تحقق من رابط preview والرحلات المطلوبة قبل وصف إصدار الواجهة بأنه منشور.'],
    sections: [
      { id: 'inputs', heading: 'جهّز مصدر النشر', body: 'المدخل فرع Git وpackage manager ونسخة Node وأمر build وملف NEXT_PUBLIC الذي يصل للمتصفح. تحقق من أن السر لا يحمل بادئة عامة؛ إخفاء قيمة في واجهة لا يعيدها إلى السرية بعد تضمينها في bundle.' },
      { id: 'example', heading: 'مثال محلول: معاينة قبل الإنتاج', body: 'اربط المستودع، راجع كشف إطار Next.js وأمر التثبيت والبناء، ثم أنشئ preview على فرع تجريبي وافحص صفحة ومساراً ديناميكياً. افصل preview عن production وأسماء النطاقات والمتغيرات؛ النجاح في preview لا يثبت قاعدة backend مستقلة.' },
      { id: 'exercise', heading: 'مهمة نشر محدودة', body: 'برومبت: «اقرأ إعدادات الحساب والمشروع والوثائق الحالية. لخّص branch/root/build/env domains والقيود، ثم اعط خطوات مراجعة preview. لا تنشر أو تغير إعداداً أو تكشف قيمة سرية». سلّم عنوان الواجهة ونتائجها إلى نشر Backend في الموضوع 54.' },
    ],
    practicalSteps: [
      { id: 'project-settings', instruction: 'وثق Git repo والفرع ومجلد المشروع وأداة الحزم ونسخ runtime من إعداد فعلي أو اكتب Not Run.', expectedOutput: 'docs/VERCEL_DEPLOYMENT.md جدول مصدر/إعداد/حالة؛ بلا تخمين إعداد تلقائي.' },
      { id: 'preview-route', instruction: 'في مشروع مخول، افتح preview وافحص route ثابتاً وديناميكياً وRTL من متصفح؛ وإلا اكتب خطوات الفحص.', expectedOutput: 'رابط معاينة وتاريخ ونتيجة لكل مسار، أو خطوات لم تنفذ مع السبب.' },
      { id: 'env-and-rollback', instruction: 'صنف أسماء env إلى public/server-only وحدد خطة عكس إعداد أو العودة لإصدار سابق.', expectedOutput: 'قائمة أسماء بلا قيم، وحدود تراجع التطبيق، مع تمييز قاعدة البيانات.' },
    ],
    workedExample: { id: 'vercel-preview-check', title: 'نتيجة معاينة صريحة', context: 'واجهة Next.js مرتبطة بمستودع اختبار.', result: 'preview /items يعمل ويقرأ fixtures. تفاصيل route سجلت Passed في المتصفح؛ API حقيقي وقاعدة بيانات ونطاق production تبقى Not Run حتى توثق endpoints منفصلة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'تحتاج الواجهة public URL لـ API بينما قاعدة البيانات لها كلمة سر. أي قيمة يمكن تضمينها في bundle؟', options: ['عنوان API غير حساس مخصص للمتصفح.', 'كلمة مرور قاعدة البيانات.', 'مفتاح إدارة production.'], correct: 0, explanation: 'كل قيمة عامة تصل للمتصفح؛ الأسرار تبقى server-side وخارج bundle.' },
      { objective: 2, prompt: 'preview للواجهة يعرض بيانات fixture. ماذا أثبت؟', options: ['نشر UI في بيئة preview فقط؛ backend الحي غير مثبت.', 'تم نشر قاعدة البيانات أيضاً.', 'كل المستخدمين لديهم وصول إنتاجي.'], correct: 0, explanation: 'نجاح الواجهة لا يثبت خدمات منفصلة أو رحلة تكامل.' },
    ],
    outputs: [{ id: 'vercel-config-record', description: 'سجل repo/build/runtime/env والنطاق مع مصادرها.' }, { id: 'vercel-preview-evidence', description: 'نتيجة معاينة لمسارات الواجهة وخطة رجوع دون نشر غير مصرح.' }],
    criteria: [
      { id: 'deploy-source', outputId: 'vercel-config-record', name: 'تتبع الإعداد', description: 'كل قيمة إعداد تأتي من إعداد أو وثيقة فعلية وحالة غير المتحقق ظاهرة.', evidencePrompt: 'أرفق اسم الإعداد ومصدره دون أي قيمة سرية.' },
      { id: 'preview-scope', outputId: 'vercel-preview-evidence', name: 'حدود الدليل', description: 'المسارات المختبرة والبيئة ومصدر البيانات موثقة بدقة.', evidencePrompt: 'اذكر URL/version وroute وfixture/API وما لم يفحص.' },
    ],
    reviewNote: 'راجع المؤلف الفصل بين الواجهة والخادم وقيمة NEXT_PUBLIC. المثال يمنع استنتاج نشر API أو بيانات فعلية من preview واجهة.',
  },
  'netlify-frontend-deployment': {
    slug: 'netlify-frontend-deployment',
    objectives: ['حدد صلاحية Netlify لمسار الواجهة وقيود framework/build بحسب الوثائق الحالية.', 'أنشئ خطة preview أو deploy قابلة للفحص تحمي الإعدادات وتوضح أن backend يحتاج نشرًا منفصلاً.'],
    sections: [
      { id: 'inputs', heading: 'افهم نوع المشروع', body: 'المدخل framework ونسخة Next.js وإعداد build/output وGit provider والدومين. إذا كنت تقارن المضيفين فابدأ بمخرجي الموضوع 52 vercel-config-record وvercel-preview-evidence وحدد ما ينطبق على المشروع وما يحتاج تحققاً جديداً. تتحرك مزايا Next.js مع إصدارات adapter والمنصة؛ اقرأ دليل framework الحالي ولا تفترض أن كل routing أو runtime مدعوم بإعداد قديم.' },
      { id: 'example', heading: 'مثال محلول: اختيار بديل مستضاف', body: 'اربط فرعاً تجريبياً، تحقق من build command وbase directory والمتغيرات دون عرض أسرار، ثم راجع deploy preview ومساراً ديناميكياً. إن كان مشروع الدورة على Vercel، Netlify بديل منفصل لا نسخة إنتاج ثانية بلا داع.' },
      { id: 'exercise', heading: 'مهمة مقارنة ومخرج', body: 'برومبت: «قارن احتياج الواجهة بدليل Netlify الحالي والإعداد المعروض. اذكر framework/version وميزة لازمة وأي قيد مجهول، ثم جهز خطوات deploy preview. لا تضغط Deploy ولا تنسخ الأسرار». سلّم اختيار المضيف إلى استضافة API/قاعدة الموضوع 54.' },
    ],
    practicalSteps: [
      { id: 'framework-compatibility', instruction: 'افتح دليل Netlify لإطار المشروع وإصداره وسجل الميزات أو القيود ذات الصلة.', expectedOutput: 'docs/NETLIFY_DEPLOYMENT.md مصدر رسمي وتاريخ التحقق ومصفوفة حاجة/دعم/غير معلوم.' },
      { id: 'build-settings', instruction: 'سجل base directory وأمر البناء ومجلد الخرج من إعداد فعلي أو وسمها غير متحقق.', expectedOutput: 'قيم build تُقرأ من repo/settings لا من مثال عشوائي؛ مفاتيح env دون قيم.' },
      { id: 'deploy-review', instruction: 'افحص preview وأهم مسار متى توفر صلاحية، وسجل واجهة وAPI كمكوّنين منفصلين.', expectedOutput: 'خطوات ونتيجة URL وتاريخ أو Not Run، مع بيان مصدر كل API مستخدم.' },
    ],
    workedExample: { id: 'netlify-alternative-choice', title: 'اختيار Netlify بحدود معلنة', context: 'الفريق يحتاج preview لكل طلب تغيير ويستخدم إطاراً تدعمه وثائق المنصة.', result: 'القرار يذكر framework/version ودليل الدعم، ثم يسجل رابط preview ومساراً واحداً بعد فحصه. API fixture موسوم محلياً؛ لا يعلن Backend منشوراً.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'تغير دعم framework بين مزودي الاستضافة وإصداراتهم. ما المصدر الأفضل للتحقق؟', options: ['تدوينة قديمة عن إعداد مشابه.', 'دليل المنصة الحالي ومشروع/نسخة الإطار الفعلية.', 'عدد النجوم في المستودع.'], correct: 1, explanation: 'الدعم يعتمد على الميزة والنسخة الحالية؛ المثال غير المطابق لا يكفي.' },
      { objective: 2, prompt: 'نجح deploy preview لكن API يستخدم mock. ما الذي تسجله؟', options: ['الواجهة منشورة للمعاينة؛ تكامل API غير مثبت.', 'قاعدة الإنتاج تعمل.', 'كل الرحلة كاملة.'], correct: 0, explanation: 'مخرج المعاينة يخص طبقة ومصدر البيانات اللذين جرى فحصهما.' },
    ],
    outputs: [{ id: 'netlify-compatibility-record', description: 'توافق framework وإعداد البناء بمصدر وتاريخ.' }, { id: 'netlify-preview-report', description: 'مسار preview ونتيجة فحصه وحدود API/env.' }],
    criteria: [
      { id: 'current-support', outputId: 'netlify-compatibility-record', name: 'دليل نسخة صالح', description: 'الدليل يطابق نسخة framework والميزة المطلوبة.', evidencePrompt: 'أرفق صفحة دعم ونسخة المشروع والميزة التي راجعتها.' },
      { id: 'separated-services', outputId: 'netlify-preview-report', name: 'فصل المكونات', description: 'يعرف التقرير UI وAPI/DB ومصدر بيانات المعاينة.', evidencePrompt: 'اختر طلباً واذكر أين انتهى ومن أين عادت البيانات.' },
    ],
    reviewNote: 'راجع المؤلف طبيعة Netlify كبديل نشر للواجهة وحساسية الدعم لإصدار framework. لا يلزم الجمع بين مزودي واجهة، وتكامل API يبقى مستقلاً.',
  },
  'backend-database-deployment': {
    slug: 'backend-database-deployment',
    objectives: ['اختر target واحداً لـ Backend وPostgreSQL وراجع مسؤولية الشبكة والنسخ والأسرار.', 'اختبر health وAPI باستخدام قاعدة غير إنتاجية أو بيانات آمنة قبل إعلان الرحلة المنشورة.'],
    sections: [
      { id: 'inputs', heading: 'اربط عناصر النشر بالعقد', body: 'المدخل api-contract من الموضوع 40، وإطار Django أو FastAPI ومخرجا المسار المختار من الموضوع 41 django-models/django-migration أو الموضوع 42 api-schemas/alembic-record، ومخرجا PostgreSQL من الموضوع 39 pg-setup/pg-check، ونتيجة مضيف الواجهة المختار: vercel-config-record/vercel-preview-evidence من الموضوع 52 أو netlify-compatibility-record/netlify-preview-report من الموضوع 53. طابق origins والعقود مع الأدلة الفعلية وسم المكونات غير المنفذة. خطط لاستضافة API وقاعدة البيانات على خدمات محددة وسجل ما أُنشئ وما بقي خطة أو غير متحقق، ثم وثق متطلبات TLS والشبكة الخاصة حسب المزود. عنوان قاعدة البيانات وسرها لا يذهبان إلى bundle الواجهة ولا Git.' },
      { id: 'example', heading: 'مثال محلول: ترحيل آمن', body: 'أنشئ staging database منفصلة، واضبط connection string كسرّ في إعدادات وقت التشغيل. شغّل migrations وفق خطة الإطار، ثم افحص health وreadiness وقراءة/كتابة test. وثق ما يعيده الرجوع إذا تغير schema؛ العودة لنسخة تطبيق قديمة لا تعكس البيانات تلقائياً.' },
      { id: 'exercise', heading: 'مهمة تخطيط النشر ومخرج', body: 'برومبت: «راجع الوثائق الرسمية لمزودي API وPostgreSQL المختارين. أنشئ مخططاً يبين أهداف الاستضافة والشبكة والسر والنسخ والترحيل والفحص والرجوع، وميّز الخطة عن خدمة موجودة ومتحقق منها. لا تنشئ خدمة ولا تنفذ migration إنتاجية». سلّم الـ endpoints ونتيجة الرحلة إلى runbook.' },
    ],
    practicalSteps: [
      { id: 'service-map', instruction: 'ارسم frontend → API → DB مع مالك الخدمة والشبكة ومصدر env لكل سهم.', expectedOutput: 'docs/BACKEND_DEPLOYMENT_PLAN.md يبين target لكل مكون أو خياراً غير محسوم.' },
      { id: 'migration-plan', instruction: 'اكتب خطوة ترحيل staging وخطة تحقق وrollback/forward fix مناسبة لتوافق schema.', expectedOutput: 'خطة بأمر الإطار الفعلي الموثق؛ لا migration تنتج من المثال ولا وعد باستعادة غير مجربة.' },
      { id: 'smoke-checks', instruction: 'حدد health وauthentication وownership وDB checks ببيانات test وأوامر واضحة.', expectedOutput: 'جدول طلب/متوقع/فعلي/status؛ إذا لم تنفذ الخطوات كلها تبقى Not Run.' },
    ],
    workedExample: { id: 'staging-deployment-map', title: 'خريطة staging', context: 'Django API منفصل وPostgreSQL يديرهما مزودان مختاران.', result: 'frontend→https://api.staging.example (عنوان توضيحي)→private DB. الأسرار تأتي من manager وقت التشغيل. migration ونسخ القاعدة ما زالت Not Run؛ العنوان illustrative ولا يوصف كخدمة حقيقية.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أين تضع كلمة مرور PostgreSQL المستخدمة في production؟', options: ['داخل .env الملتزم إلى Git.', 'خزّن السرّ في إعدادات وقت التشغيل لدى مزود الخدمة مع صلاحيات محدودة.', 'في NEXT_PUBLIC_DATABASE_URL.'], correct: 1, explanation: 'الأسرار تخص بيئة الخادم ولا تصل للمستودع أو المتصفح.' },
      { objective: 2, prompt: 'نجح health endpoint لكنه لا يتصل بقاعدة البيانات. ما الحالة؟', options: ['الخدمة كلها Passed.', 'health Passed، وفحص DB/رحلة البيانات Not Run أو Failed حسب الشاهد.', 'احذف فحص قاعدة البيانات.'], correct: 1, explanation: 'كل فحص يثبت فقط ما شمله فعلاً.' },
    ],
    outputs: [{ id: 'backend-topology', description: 'خريطة استضافة API وDB والشبكة والأسرار.' }, { id: 'backend-smoke-report', description: 'نتائج migration/health/auth/DB أو قائمة Not Run مع سبب.' }],
    criteria: [
      { id: 'network-secrets', outputId: 'backend-topology', name: 'خريطة آمنة', description: 'العلاقات ومسار secret محددان دون كشف القيم.', evidencePrompt: 'أشر إلى مصدر secret وإلى ما لا يتصل به browser.' },
      { id: 'smoke-scope', outputId: 'backend-smoke-report', name: 'تغطية التقرير', description: 'يفصل health عن قاعدة حقيقية وترحيل ومصادقة.', evidencePrompt: 'اعرض check واحداً وبيئته وstatus ودليله.' },
    ],
    reviewNote: 'راجع المؤلف فصل API/DB عن الواجهة وسلامة migrations ومصدر الأسرار. المثال يصرح بوضوح أن hostname تجريبي وأن التحقق لم يحدث.',
  },
};

const INDEPENDENT_REVIEW_NOTES_GROUP_B_18: Record<string, string> = {
  'vercel-frontend-deployment': 'راجعت ربط repo وإعدادات build/runtime/env بمرجع فعلي، وفصل preview للواجهة عن نشر API/DB. المثال يصرح أن المسارات المبينة وبيانات fixtures لا تثبت خدمة خلفية أو production؛ vercel-config-record وvercel-preview-evidence يغذيان المقارنة أو runbook التاليين.',
  'netlify-frontend-deployment': 'راجعت اشتراط مطابقة وثائق Netlify الحالية لإطار ونسخة المشروع، وتسجيل build settings دون افتراض دعم، وفصل preview للواجهة عن API. netlify-compatibility-record وnetlify-preview-report يوضحان المصدر والتاريخ والقيود؛ أي صلاحية مجهولة تبقى غير متحققة.',
  'backend-database-deployment': 'راجعت خريطة frontend/API/DB ومصدر الأسرار، وبيئة staging للترحيل وفصل health عن auth وملكية البيانات وفحص DB. العنوان في المثال موسوم توضيحياً والفحوص/النسخ لم تنفذ. backend-topology وbackend-smoke-report يغذيان runbook.',
};

recordIndependentTopicReview(TOPIC_DRAFTS_GROUP_B_18, INDEPENDENT_REVIEW_NOTES_GROUP_B_18,
  'راجعت السؤالين والخيارات ومفتاح كل إجابة والتعليل مقابل الهدف والمحتوى؛ الإجابات تفصل بين دليل preview/health وبين خدمة backend أو بيانات غير مفحوصة. سياسة النقاط المقبولة في issue #70 تمنح نقطة للصحيح وصفر للخطأ أو غير المجاب، مع محاولات غير محدودة وتفسير بعد الإرسال وحفظ كل المحاولات بإصدارات السؤال والسياسة. هذا لا يثبت إتقان المتعلم.',
  'راجعت المخرجين ومطابقة كل معيار لمخرجه وسؤال الدليل. سياسة التقييم العملي المقبولة في issue #70 ذاتية بثلاثة مستويات وبلا حد إتقان أو تحقق مستقل للصحة.',
);

export const LEARNING_CONTENT_GROUP_B_18: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_18, QUESTION_IDS_GROUP_B_18, VIDEO_CANDIDATES_GROUP_B_18);
