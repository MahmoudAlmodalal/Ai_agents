import type { TopicLearningContent } from '@/src/types/learning';
import {
  TopicDraft,
  buildGroupB,
  proposedApproval,
} from '@/src/data/learning/group-b-base.ts';

export const QUESTION_IDS_GROUP_B_15: Record<string, [string, string]> = {
  'frontend-backend-integration': ['successful-empty-response-state', 'browser-public-env-vs-secret'],
  'full-stack-journey-testing': ['test-layer-evidence', 'reproducible-e2e-fixture'],
};

export const VIDEO_CANDIDATES_GROUP_B_15: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'frontend-backend-integration': {
    id: 'frontend-backend-integration-video-candidate',
    title: 'Building microservices with Tye — Frontend / Backend Tye Demo',
    url: 'https://learn.microsoft.com/en-us/shows/on-dotnet/building-microservices-with-tye',
    purpose: 'مرشح لشرح الربط والتشغيل المتزامن بين واجهة وخلفية؛ الفصل 06:15 هو Frontend / Backend Tye Demo. يستخدم .NET Project Tye القديم، لذا يصلح للمفاهيم المعمارية فقط ولا يوصي باستبدال Next.js/FastAPI الحاليين.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/on-dotnet/building-microservices-with-tye', evidence: 'صفحة Microsoft Learn تعرض فصلاً زمنياً بعنوان Frontend / Backend Tye Demo عند 06:15 وتشرح التشغيل المحلي للخدمات المتصلة. المورد خاص بأداة .NET Tye القديمة وليس دورة Next.js/FastAPI؛ صلته توضيحية فقط. لم يُختبر الفيديو أو captions أو الوصولية ولم يوافق المالك.' }],
  },
  'full-stack-journey-testing': {
    id: 'full-stack-journey-testing-video-candidate',
    title: 'Get started with end-to-end testing with Playwright',
    url: 'https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/get-started-with-end-to-end-testing-with-playwright',
    purpose: 'مرشح لكتابة رحلة مستخدم مع locators/assertions واختبار install وتشغيل مشروع Playwright؛ صفحة الناشر تسميه Episode 2. لا يثبت التكامل مع API فعلي ما لم تُشغّل الرحلة عليه.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/getting-started-with-end-to-end-testing-with-playwright/get-started-with-end-to-end-testing-with-playwright', evidence: 'صفحة Microsoft Learn تسمّي Episode 2 وتصف تنصيب Playwright واستخدام locators وassertions في اختبار end-to-end. ملائم لسير الرحلة؛ نطاقه مثال تدريبي ولا يثبت API/DB للمشروع. التشغيل/captions/accessibility وowner signoff لم تُنفذ.' }],
  },
};

export const TOPIC_DRAFTS_GROUP_B_15: Record<string, TopicDraft> = {
  'frontend-backend-integration': {
    slug: 'frontend-backend-integration',
    objectives: ['اربط الواجهة بعقد API typed وتعامل مع pending/empty/error حسب حالة الشبكة.', 'اضبط CORS ومتغيرات المصدر من دون كشف سر خادم في المتصفح.'],
    sections: [
      { id: 'inputs', heading: 'العقد يربط الطرفين', body: 'المدخل مخرجا الموضوع 39 pg-setup/pg-check، ومخرجا المسار المختار من الموضوع 41 django-models/django-migration أو الموضوع 42 api-schemas/alembic-record، ومخرجا الموضوع 40 api-contract/api-layers، ومخرجا الموضوع 43 permission-matrix/auth-tests، ومخرجا الموضوع 44 service-map/invariant-evidence مع حالة تنفيذ الخادم الفعلية. أنشئ client صغيراً مطابقاً للطلب/الاستجابة، وافحص status قبل تحليل body. NEXT_PUBLIC_ يصل للمتصفح، فلا تضع فيه اعتماد قاعدة بيانات.' },
      { id: 'example', heading: 'مثال محلول: قائمة عناصر', body: 'GET /items مع 200 [] يعرض empty؛ 401 يتبع سياسة الدخول؛ network failure يعرض رسالة عامة. لا تسجل token أو stack trace للمستخدم.' },
      { id: 'exercise', heading: 'برومبت ومصفوفة تكامل', body: 'برومبت: «طابق client مع العقد واختبر 200/empty/401/validation/network. افحص CORS وbundle بحثاً عن أسرار. لا تسم mock اتصالاً حقيقياً». سلّم matrix الرحلة إلى اختبارات full-stack.' },
    ],
    practicalSteps: [
      { id: 'typed-client', instruction: 'أنشئ دالة typed لطلب واحد وافحص status قبل تفسير body.', expectedOutput: 'العميل يميز response الناجح وHTTP error ورفض الشبكة.' },
      { id: 'config-map', instruction: 'سجل origin المسموح وأسماء المتغيرات وحدد العام والسري.', expectedOutput: 'docs/INTEGRATION_CONFIG.md بأسماء فقط ومصادر إعدادها.' },
      { id: 'exercise-states', instruction: 'اختبر نجاحاً وempty وunauthorized وnetwork failure باستخدام مصدر معلّم.', expectedOutput: 'جدول UI/HTTP يحدد لكل تجربة fixture أو خدمة فعلية.' },
    ],
    workedExample: { id: 'api-state-matrix', title: 'نتيجة قائمة API', context: 'واجهة تقرأ endpoint موثقاً.', result: '200 [] → empty message; 401 → agreed sign-in flow; fetch rejection → connection message without secret details.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'يرجع الخادم 200 ومصفوفة فارغة. ما حالة الواجهة؟', options: ['Empty state.', 'Network error.', 'Unauthorized.'], correct: 0, explanation: 'الاستجابة ناجحة لكن لا تحتوي عناصر؛ تختلف عن الفشل.' },
      { objective: 2, prompt: 'ما القيمة المناسبة لمتغير NEXT_PUBLIC_API_BASE_URL؟', options: ['عنوان API عام إذا كان مطلوباً.', 'كلمة مرور PostgreSQL.', 'JWT سري طويل الأجل.'], correct: 0, explanation: 'البادئة تعني أن القيمة تصل للمتصفح؛ الأسرار تبقى في الخادم.' },
    ],
    outputs: [{ id: 'api-client', description: 'عميل typed يعالج النجاح وأخطاء HTTP والشبكة.' }, { id: 'integration-config', description: 'جدول origin/vars/status ومصدر بيانات التجربة.' }],
    criteria: [
      { id: 'contract-errors', outputId: 'api-client', name: 'التزام العقد', description: 'العميل يفصل success وHTTP/network errors.', evidencePrompt: 'أرفق العقد ونتيجة حالتين أو اذكر ما لم يُختبر.' },
      { id: 'secret-boundary', outputId: 'integration-config', name: 'حد العام والسري', description: 'القيم العامة لا تتضمن بيانات اعتماد ومصدر التجربة واضح.', evidencePrompt: 'اذكر أسماء المتغيرات ومكان تخزينها دون قيم.' },
    ],
    reviewNote: 'راجع المؤلف empty مقابل network error وحد NEXT_PUBLIC_. بيانات mock لا تعد تكاملاً حقيقياً.',
  },
  'full-stack-journey-testing': {
    slug: 'full-stack-journey-testing',
    objectives: ['اختبر رحلة مستخدم عبر واجهة وAPI وstorage ببيانات اختبار معزولة.', 'سجل البيئة والأمر والطبقات والنتائج كي يعيد المراجع الاختبار.'],
    sections: [
      { id: 'inputs', heading: 'اختر مستوى الاختبار', body: 'Unit يختبر وحدة، integration يختبر اتصال طبقتين، E2E يختبر رحلة متصفح. استخدم مخرجي الموضوع 45 api-client وintegration-config مع عقد API وطريقة إعداد test؛ سمّ لكل تجربة fixture أو خدمة فعلية. لا تسم mock اختبار قاعدة بيانات حقيقية.' },
      { id: 'example', heading: 'مثال محلول: إنشاء مورد', body: 'مستخدم test يفتح نموذجاً، يرسل قيمة صالحة، يرى السجل، ثم يرسل قيمة غير صالحة ويرى رسالة. seed/cleanup صريحان فلا يعتمد الترتيب على اختبار سابق.' },
      { id: 'exercise', heading: 'برومبت وخطة إثبات', body: 'برومبت: «اكتب الرحلة من شروط البداية للنتيجة. حدد مستوى الاختبار ومصدر البيانات والتنظيف. شغّل success/failure/reload وسجل الأمر والنتيجة بلا بيانات شخصية». سلّم gaps إلى الأداء وQA.' },
    ],
    practicalSteps: [
      { id: 'scenario', instruction: 'اكتب خطوات الرحلة والبيانات الأولية والنتائج والتنظيف.', expectedOutput: 'docs/JOURNEY_TESTS.md قابل للإعادة في بيئة محددة.' },
      { id: 'success-failure', instruction: 'نفذ success وvalidation/network failure ببيانات test ثابتة.', expectedOutput: 'تغطية UI/HTTP بأسماء source واضحة؛ الفشل لا يمر كنجاح.' },
      { id: 'run-record', instruction: 'سجل الأمر والمتصفح والبيئة والوقت والنتائج الفعلية.', expectedOutput: 'Passed/Failed/Not Run لكل حالة مع طريقة إعادة إنتاج.' },
    ],
    workedExample: { id: 'journey-example', title: 'إنشاء وقراءة', context: 'مثال توضيحي لرحلة متصفح بمستخدم تجريبي في test أو staging؛ لم تُشغّل هذه العينة.', result: 'Given an empty catalog → submit a valid item → receive the success status defined by the project contract (for example, 201 only when the contract specifies it) → show the item; submit an invalid name → show the contract-defined validation message; cleanup removes only the fixture created by the test.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'الرحلة تستخدم mock لـ API. ما الذي تثبته؟', options: ['تكامل DB حقيقي.', 'سلوك الواجهة مع response mock المحدد.', 'أداء الإنتاج.'], correct: 1, explanation: 'المحاكاة تغطي حدها فقط؛ يجب تسمية ما لم يدخل.' },
      { objective: 2, prompt: 'كيف تجعل الرحلة قابلة للإعادة؟', options: ['تعتمد على بيانات اختبار سابق.', 'تهيئ fixtures وتعزلها وتنظف ما أنشأته.', 'تستخدم بيانات أشخاص حقيقية.'], correct: 1, explanation: 'التهيئة والتنظيف يمنعان الاعتماد على ترتيب التشغيل ويحميان البيانات.' },
    ],
    outputs: [{ id: 'journey-spec', description: 'سيناريوهات success/failure وشروط وfixtures وتنظيف.' }, { id: 'journey-log', description: 'سجل تشغيل فعلي بالأمر والبيئة أو Not Run.' }],
    criteria: [
      { id: 'reproducible', outputId: 'journey-spec', name: 'إعادة الرحلة', description: 'التهيئة والتنظيف مستقلان عن ترتيب التشغيل.', evidencePrompt: 'أرفق شروط البداية ومصدر API وخطوة التنظيف.' },
      { id: 'test-boundary', outputId: 'journey-log', name: 'حدود التغطية', description: 'السجل يحدد الطبقات التي فحصها الاختبار.', evidencePrompt: 'أرفق الأمر والنتيجة والطبقة التي لم تغط.' },
    ],
    reviewNote: 'راجع المؤلف مستويات الاختبار ومصدر بيانات المثال. يفرق المخرج mock عن قاعدة فعلية ويسجل نتيجته كما حدثت.',
  },
};

export const LEARNING_CONTENT_GROUP_B_15: Record<string, TopicLearningContent> =
  buildGroupB(TOPIC_DRAFTS_GROUP_B_15, QUESTION_IDS_GROUP_B_15, VIDEO_CANDIDATES_GROUP_B_15);

LEARNING_CONTENT_GROUP_B_15['full-stack-journey-testing'].contentVersion = 2;
