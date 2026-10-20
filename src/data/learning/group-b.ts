import type { TopicLearningContent } from '@/src/types/learning';

/** Supplements for canonical Topics 30–58. Existing HTML lessons remain intact. */

type QuestionDraft = {
  objective: 1 | 2;
  prompt: string;
  options: [string, string, string];
  correct: 0 | 1 | 2;
  explanation: string;
};
type CriterionDraft = {
  id: string;
  outputId: string;
  name: string;
  description: string;
  evidencePrompt: string;
};
type TopicDraft = {
  slug: string;
  objectives: [string, string];
  sections: TopicLearningContent['sections'];
  practicalSteps: TopicLearningContent['practicalSteps'];
  workedExample: TopicLearningContent['workedExamples'][number];
  questions: [QuestionDraft, QuestionDraft];
  outputs: TopicLearningContent['practicalAssessment']['outputs'];
  criteria: [CriterionDraft, CriterionDraft];
  videos?: TopicLearningContent['candidateVideos'];
  reviewNote: string;
};

const REVIEWED_AT = '2026-10-20';
const proposedApproval = (): TopicLearningContent['quiz']['scoringPolicy']['approval'] => ({
  state: 'proposed', approvedBy: null, approvedAt: null, decisionReference: null,
});

/** Stable, topic-specific IDs keep saved quiz attempts meaningful across copy edits. */
const QUESTION_IDS: Record<string, [string, string]> = {
  'typescript-types': ['typed-status-union', 'runtime-json-validation'],
  'react-components-state': ['shared-state-owner', 'server-client-boundary'],
  'tailwind-css-responsive': ['design-token-source', 'logical-spacing-rtl'],
  'nextjs-app-router': ['layout-route-mapping', 'fixture-vs-api'],
  'frontend-architecture-planning': ['requirement-conflict-source', 'reviewable-task-boundary'],
  'ui-ux-pro-max-review': ['suggestion-vs-approved-system', 'actionable-critique-evidence'],
  'spec-kit-workflow': ['scope-expansion-control', 'spec-plan-task-trace'],
  'frontend-incremental-implementation': ['vertical-slice-choice', 'mocked-service-boundary'],
  'python-backend-foundation': ['venv-vs-secret-storage', 'runtime-input-validation-vs-type-hints'],
  'postgresql-database-setup': ['least-privilege-db-role', 'dev-connection-evidence'],
  'backend-architecture-api-contracts': ['contract-fields-before-route', 'borrowhub-optional-rule'],
  'django-backend': ['database-constraint-vs-ui-check', 'migration-risk-review'],
  'fastapi-backend': ['request-schema-validation', 'migration-generated-diff-review'],
  'auth-permissions': ['authenticated-identity-vs-authorization', 'server-enforced-ownership'],
  'services-selectors': ['selector-read-side-effects', 'service-invariant-ownership'],
  'frontend-backend-integration': ['successful-empty-response-state', 'browser-public-env-vs-secret'],
  'full-stack-journey-testing': ['test-layer-evidence', 'reproducible-e2e-fixture'],
  'database-performance-engineering': ['measure-before-index', 'plan-vs-latency-evidence'],
  'redis-optional-infrastructure': ['cache-need-evidence', 'cache-invalidation-after-update'],
  'integrated-project-qa': ['build-vs-accessibility-evidence', 'test-reproduction-context'],
  'docker-container-workflow': ['container-needed-decision', 'runtime-secret-injection'],
  'linux-server-operations': ['managed-host-boundary', 'least-privilege-file-access'],
  'vercel-frontend-deployment': ['public-vs-runtime-env', 'preview-scope'],
  'netlify-frontend-deployment': ['current-framework-support', 'preview-mock'],
  'backend-database-deployment': ['runtime-secret-configuration', 'health-vs-database-check'],
  'project-operations-runbook': ['backup-vs-restore-drill', 'application-rollback-vs-schema'],
  'project-handoff-package': ['missing-resource-traceability', 'test-commit-provenance'],
  'project-demo-day': ['reproducible-demo-flow', 'live-vs-recorded-evidence'],
  'project-portfolio-entry': ['individual-contribution-attribution', 'measured-impact-claim'],
};

/**
 * Researched external video candidates for review. Evidence records describe
 * publisher metadata and topic fit only; playback, captions, accessibility, and
 * owner acceptance have not been verified.
 */
const VIDEO_CANDIDATES: Record<string, TopicLearningContent['candidateVideos'][number]> = {
  'typescript-types': {
    id: 'typescript-types-video-candidate',
    title: 'TypeScript Crash Course with Matt Pocock',
    url: 'https://learn.microsoft.com/en-us/shows/vs-code-livestreams/typescript-crash-course-with-matt-pocock',
    purpose: 'مرشح لمراجعة الأساسيات والأنواع والاتحادات؛ تعرض صفحة Microsoft Learn فصلاً بعنوان Types and unions عند 51:00 واختبارات عند 14:40. المحتوى من 2022، لذا تُراجع الأمثلة مع إصدار TypeScript الحالي.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/vs-code-livestreams/typescript-crash-course-with-matt-pocock', evidence: 'صفحة الناشر تسمي الفيديو وتعرض الفصلين 14:40 Testing و51:00 Types and unions؛ الملاءمة لunion والعينة السلبية جزئية ومباشرة. لم يُختبر التشغيل أو captions أو الوصولية، ولم يراجع المالك المورد أو النسخة التعليمية.' }],
  },
  'react-components-state': {
    id: 'react-components-state-video-candidate',
    title: 'S01 E16: Five Things About State in React',
    url: 'https://learn.microsoft.com/en-us/shows/5-things/episode-16-five-things-about-state-in-react',
    purpose: 'مرشح لملكية الحالة وتدفقها عبر props والمكونات؛ صفحة Microsoft Learn تذكر هذه المحاور صراحة. المورد من 2022 ويحتاج موازنة مع توثيق React الحالي.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/5-things/episode-16-five-things-about-state-in-react', evidence: 'صفحة Microsoft Learn تصف local state وstate flow وprops واستعمال state داخل المكونات. صلة الموضوع واضحة على مستوى المفاهيم، مع حاجة لمراجعة مصطلحات/واجهات React الحديثة. لم يُختبر التشغيل أو captions أو الوصولية، ولا توجد موافقة مالك.' }],
  },
  'tailwind-css-responsive': {
    id: 'tailwind-css-responsive-video-candidate',
    title: 'Tailwind CSS: From Zero to Production',
    url: 'https://tailwindcss.com/blog/tailwindcss-from-zero-to-production',
    purpose: 'مرشح من سلسلة Tailwind الرسمية ذات 8 أجزاء؛ الجزء الثالث responsive design والسابع تخصيص design system. السلسلة تعلم Tailwind v2.0، لذا تصلح للمبادئ فقط ويجب عدم نسخ صياغة الإعداد أو الفئات قبل التحقق من الإصدار.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://tailwindcss.com/blog/tailwindcss-from-zero-to-production', evidence: 'صفحة Tailwind الرسمية تسرد 8 فيديوهات، ومنها Responsive Design وCustomizing Your Design System، وتذكر أنها لـ Tailwind CSS v2.0 (2021). تطابقها مع التجاوب والرموز مناسب بمحدودية النسخة. لم يُختبر تشغيل الفيديو أو captions أو الوصولية؛ موافقة المالك غير مسجلة.' }],
  },
  'nextjs-app-router': {
    id: 'nextjs-app-router-video-candidate',
    title: 'Less code, better UX: Fetching data faster with the Next.js 13 App Router',
    url: 'https://vercel.com/blog/nextjs-app-router-data-fetching',
    purpose: 'مرشح يوضح جلب البيانات داخل Server Components والـ layouts المشتركة وتحسين حالات التحميل في App Router. صفحة Vercel تشير إلى demo فيديو قصير؛ المادة مرتبطة بـ Next.js 13 (2023) فتحتاج مقارنة بالأدلة الحالية قبل استخدامها في خطوات إصدار حديث.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://vercel.com/blog/nextjs-app-router-data-fetching', evidence: 'مقال Vercel عن Next.js 13 App Router يشرح app directory وServer Components وnested layouts ويقول إن Sam Selikoff يعرض demo بأقل من ثلاث دقائق. هذا يثبت وجود مورد مرئي ذي صلة، لا التوافق مع كل ملفات App Router الحالية. التشغيل وcaptions والوصولية ومراجعة المالك لم تُنفذ.' }],
  },
  'frontend-architecture-planning': {
    id: 'frontend-architecture-planning-video-candidate',
    title: 'Architectural Requirements — Fundamentals of Frontend Architecture',
    url: 'https://frontendatscale.com/courses/frontend-architecture/foundations/course-overview',
    purpose: 'مرشح من درس فيديو محدد في الدورة: Architectural Requirements (الدرس 13، 7:44)، ومعه Exercise 2 حول تمييز المتطلبات المؤثرة وربطها بالمواصفات. هذا يدعم توثيق المصدر والقيود، ولا يغطي وحده كامل PRD/SRS للمشروع.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://frontendatscale.com/courses/frontend-architecture/foundations/course-overview', evidence: 'فهرس الدورة يسرد درس Architectural Requirements ومدته 7:44 وExercise 2: Architectural Requirements؛ صفحة التمرين تشرح استخراج المتطلبات المعمارية من مواصفة مشروع. صلة الخريطة/المهام جزئية، ولا تُعد موافقة قالب الدورة. لم يُختبر التشغيل أو captions أو الوصولية أو قبول المالك.' }],
  },
  'ui-ux-pro-max-review': {
    id: 'ui-ux-pro-max-review-video-candidate',
    title: 'How to use Figma agent in your design workflows',
    url: 'https://www.figma.com/solutions/ai-design-feedback-agent/',
    purpose: 'مرشح من مورد Figma الذي يصف مشاهدة agent ومراجعته للتصميم داخل سياق الإطارات ومكتبة التصميم. يُستخدم كنقطة نقد مساعدة فقط؛ يجب على المتعلم فحص الهدف والسياق وإمكانية الوصول وعدم قبول اقتراحات الأداة تلقائياً.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.figma.com/solutions/ai-design-feedback-agent/', evidence: 'صفحة Figma الرسمية تسرد “How to use Figma agent in your design workflows” كدرس فيديو وتشرح أن agent يقدم نقداً ضمن طبقات التصميم والسياق وإرشادات الوصولية. المورد خاص بأداة Figma AI ولا يثبت جودة توصياتها أو تغطية اختبار المستخدم. التشغيل/captions/accessibility وموافقة المالك غير منفذة.' }],
  },
  'spec-kit-workflow': {
    id: 'spec-kit-workflow-video-candidate',
    title: 'The ONLY guide you’ll need for GitHub Spec Kit',
    url: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit/',
    purpose: 'مرشح لشرح سلسلة Spec Kit من المتطلبات قبل التنفيذ. صفحة Microsoft for Developers تسمي فيديو دليلاً لـ GitHub Spec Kit؛ قارنه بنسخة CLI والقوالب الحالية لأن سير العمل يتغير.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit/', evidence: 'مقال Microsoft for Developers يصف Spec Kit ويضع رابط فيديو بعنوان “The ONLY guide you’ll need for GitHub Spec Kit”. صفحة GitHub الرسمية كذلك تسرد Video Overview. المحتوى ملائم كتقديم، لكن تعليمات CLI/version لا تُعامل كمرجع حالي دون فحص المستودع. لم يُختبر الفيديو أو captions أو الوصولية، ولا قبول مالك.' }],
  },
  'frontend-incremental-implementation': {
    id: 'frontend-incremental-implementation-video-candidate',
    title: '22. Breaking Things Down — Fundamentals of Frontend Architecture',
    url: 'https://frontendatscale.com/courses/frontend-architecture/designing/breaking-things-down/',
    purpose: 'مرشح لشرح تقطيع العمل إلى وحدات ومشكلات أصغر؛ النص المصاحب يبدأ في 00:30 بوحدات/مشكلات صغيرة في نظام الواجهة. يوائم اختيار vertical slice مع عرض مخرج قابل للفحص.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://frontendatscale.com/courses/frontend-architecture/designing/breaking-things-down/', evidence: 'صفحة فيديو Frontend at Scale تسمي درس 22 وتعرض نصاً زمنياً: عند 00:30 يشرح تقسيم النظام إلى modules ومشكلات صغيرة. الملاءمة لتجزئة التنفيذ عملية؛ لا تثبت نجاح تنفيذ مشروع المتعلم. التشغيل/captions/accessibility/owner approval لم تُفحص.' }],
  },
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
  'docker-container-workflow': {
    id: 'docker-container-workflow-video-candidate',
    title: 'Accelerating Development with Docker',
    url: 'https://www.docker.com/resources/accelerating-development-with-docker-on-demand-training/',
    purpose: 'مرشح مسجل لإنشاء Dockerfile/Compose وبناء صورة وبيئة تطوير وتشغيل اختبارات. قد يتطلب الاشتراك للاستفادة الكاملة؛ إذا كان المضيف يبني مباشرة فلا حاجة للحاوية.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.docker.com/resources/accelerating-development-with-docker-on-demand-training/', evidence: 'صفحة Docker تسميه recorded session وتذكر إنشاء Dockerfile/Compose وبناء صور وتشغيل اختبارات وتصحيح. الصفحة تنبه إلى أن الاشتراك مطلوب للاستفادة الكاملة. صلته عملية إذا اختيرت الحاوية؛ لم يُختبر تشغيله أو captions أو الوصولية ولم يوافق المالك.' }],
  },
  'linux-server-operations': {
    id: 'linux-server-operations-video-candidate',
    title: 'How to Modify File Permissions in Bash (Part 12 of 20)',
    url: 'https://learn.microsoft.com/en-us/shows/bash-for-beginners/how-to-modify-file-permissions-in-bash-12-of-20-bash-for-beginners',
    purpose: 'مرشح لشرح قراءة صلاحيات الملفات وchown/chgrp/chmod. يقتصر على مختبر أو مضيف مخوّل، ولا يثبت صلاحية الطالب لتغيير خادم مُدار.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/bash-for-beginners/how-to-modify-file-permissions-in-bash-12-of-20-bash-for-beginners', evidence: 'صفحة Microsoft Learn تذكر فصول عرض الصلاحيات (00:00) وchown (02:25) وchgrp (04:35) وchmod (06:00). هذا يطابق فحص الصلاحيات مع ضرورة التقييد بمضيف مخوّل. لم يُختبر التشغيل/captions/accessibility ولم توجد موافقة مالك.' }],
  },
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
  'project-operations-runbook': {
    id: 'project-operations-runbook-video-candidate',
    title: 'Deployments Going Deeper — Vercel Foundations',
    url: 'https://vercel.com/academy/vercel-foundations/deployments',
    purpose: 'مرشح لخطة التشغيل، حيث تسرد سلسلة الفيديو rollback فورياً وفحوص النشر والسجلات وobservability. تضبط الخطوات وفق قدرات الحساب الفعلية؛ لا تفترض أن backup قد استعيد.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://vercel.com/academy/vercel-foundations', evidence: 'فهرس Vercel Foundations يصف درس Deployments Going Deeper بفحوص deployment وinstant rollback، كما يدرج دروس Logs وObservability. صفحة الدورة تؤكد أنها تسعة مقاطع فيديو. الدرس خاص بـ Vercel ولا يغطي restore قاعدة البيانات. لم يُختبر التشغيل/captions/accessibility ولم يوافق المالك.' }],
  },
  'project-handoff-package': {
    id: 'project-handoff-package-video-candidate',
    title: 'Best Practices for Knowledge Transfer and Software Project Handoff',
    url: 'https://praxent.com/blog/knowledge-transfer-best-practices-software-project-handoff',
    purpose: 'مرشح يلخص مشاركة الفريق الداخلي والتوثيق المعماري وREADME ومراجعات الكود وhandoff sprint. المورد من شركة تعهيد، لذا يراجع المتعلم الخطة بما يناسب فريق مشروعه.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://praxent.com/blog/knowledge-transfer-best-practices-software-project-handoff', evidence: 'صفحة الفيديو ونص Praxent يذكران مشاركة الفريق في القرارات، جودة الكود، README للتشغيل/المساهمة/النشر، توثيق البنية وhandoff sprint. مطابقة مباشرة لحزمة التسليم؛ سياقها تعهيد. لم يُختبر الفيديو/captions/accessibility ولم توجد موافقة مالك.' }],
  },
  'project-demo-day': {
    id: 'project-demo-day-video-candidate',
    title: 'Tips on better Demo Presentation Skills and StoryTelling',
    url: 'https://learn.microsoft.com/en-us/shows/regular-it-guy/tips-on-better-demo-presentation-skills-storytelling',
    purpose: 'مرشح لتسلسل العرض وصياغة القصة لجمهور؛ صفحة Microsoft Learn تصف نصائح لعرض demo لمجموعة مدربين. المورد قديم وعام، فلا يثبت صحة عرض التطبيق أو ادعاءاته ويجب تسميته في عرض المتعلم كمصدر للتقديم فقط.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://learn.microsoft.com/en-us/shows/regular-it-guy/tips-on-better-demo-presentation-skills-storytelling', evidence: 'صفحة Microsoft Learn تسمي فيديو نصائح العرض والسرد وتقول إنه قُدّم لمجموعة Microsoft Certified Trainers. يغطي أسلوب التقديم العام لا فحص سلوك منتج؛ المحتوى قديم. لم يُختبر التشغيل/captions/accessibility أو موافقة المالك.' }],
  },
  'project-portfolio-entry': {
    id: 'project-portfolio-entry-video-candidate',
    title: 'Building A Portfolio Website That Will Get You Hired — Udacity Project Walkthrough',
    url: 'https://www.udacity.com/video/project-walkthrough-portfolio',
    purpose: 'مرشح لتنظيم موقع portfolio وحكاية مشروع؛ توضح صفحة Udacity أنه موجّه للمستقل/المتعاقد/الاستشاري/المبدع. يُستخدم لترتيب الحالة فقط، لا كدليل على جودة الشيفرة أو أثرها.',
    availability: 'candidate', approval: proposedApproval(),
    reviewEvidence: [{ area: 'video', outcome: 'not-run', sourceUrl: 'https://www.udacity.com/video/project-walkthrough-portfolio', evidence: 'صفحة Udacity تسمي فيديو Project Walkthrough عن بناء موقع portfolio للمستقلين والمتعاقدين والاستشاريين والمبدعين. ملائم لبنية العرض العامة مع فرق سياق عن portfolio مهندس برمجيات؛ لا يبرر ادعاءات تقنية/أثر غير موثقة. تشغيل/captions/accessibility وowner signoff لم تُفحص.' }],
  },
};

function topic(d: TopicDraft): TopicLearningContent {
  const questions: TopicLearningContent['quiz']['questions'] = d.questions.map((q) => {
    const id = `${d.slug}-${QUESTION_IDS[d.slug][q.objective - 1]}`;
    const evidence = [{
      area: 'question' as const, outcome: 'passed' as const,
      reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
      evidence: 'راجِع المؤلف ارتباط السؤال بهدفه، ومفتاح الإجابة، والتعليل والمشتتات الخاصة بالمجال. مراجعة مالك المقرر المستقلة ما زالت مطلوبة.',
    }];
    return {
      id, version: 1, objectiveId: `${d.slug}-objective-${q.objective}`, prompt: q.prompt,
      options: q.options.map((text, i) => ({ id: `${id}-${String.fromCharCode(97 + i)}`, text })),
      correctOptionId: `${id}-${String.fromCharCode(97 + q.correct)}`,
      explanation: q.explanation, reviewEvidence: evidence,
    };
  });
  const criteria: TopicLearningContent['practicalAssessment']['criteria'] = d.criteria.map((c) => ({
    ...c, id: `${d.slug}-${c.id}`, version: 1,
    reviewEvidence: [{
      area: 'rubric', outcome: 'passed', reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
      evidence: 'تحقق المؤلف من ارتباط المعيار بمخرج محدد ومن أن سؤال الدليل يطلب فحصاً ذاتياً وصفياً لا حكماً مستقلاً على الإتقان.',
    }],
  }));
  const lessonEvidence = {
    area: 'lesson' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT, evidence: d.reviewNote,
  };
  const questionEvidence = {
    area: 'question' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
    evidence: 'راجَع المؤلف مفتاحي الإجابة وتعليل كل سؤال ومطابقتهما للهدف. اعتماد السياسة وقبول المالك لم يُسجلا.',
  };
  const rubricEvidence = {
    area: 'rubric' as const, outcome: 'passed' as const,
    reviewer: 'Curriculum B author review', reviewedAt: REVIEWED_AT,
    evidence: 'راجَع المؤلف صلة المعيارين بمخرجات قابلة للفحص؛ التقييم وصفي ذاتي وليس إثباتاً مستقلاً للصحة.',
  };
  const video = d.videos?.[0] ?? VIDEO_CANDIDATES[d.slug];
  return {
    topicSlug: d.slug, contentVersion: 1, reviewState: 'review-ready',
    objectives: d.objectives.map((text, i) => ({ id: `${d.slug}-objective-${i + 1}`, text })),
    sections: d.sections, practicalSteps: d.practicalSteps, workedExamples: [d.workedExample],
    candidateVideos: d.videos ?? [VIDEO_CANDIDATES[d.slug]],
    quiz: {
      id: `${d.slug}-objective-quiz`, version: 1, title: 'فحص أهداف الدرس',
      instructions: 'أجب بعد القراءة. النتيجة تقيس المفاهيم فقط ولا تثبت تنفيذ المشروع.',
      questions,
      scoringPolicy: {
        id: `${d.slug}-quiz-scoring`, version: 1,
        correctAnswerPoints: 1, incorrectAnswerPoints: 0, unansweredAnswerPoints: 0,
        retryPolicy: 'unlimited', feedbackTiming: 'after-submit', retainedAttempts: 'all',
        summary: 'اقتراح قيد قرار مالك المقرر: نقطة للإجابة الصحيحة، وإعادة المحاولة متاحة، مع حفظ المحاولات منفصلة.',
        approval: proposedApproval(),
      },
      reviewEvidence: [questionEvidence],
    },
    practicalAssessment: {
      id: `${d.slug}-practical-assessment`, version: 1, title: 'راجع مخرجات مشروعك',
      outputs: d.outputs,
      scale: {
        id: `${d.slug}-descriptive-scale`, version: 1,
        levels: [
          { id: 'not-yet', label: 'لم أبدأ بعد', description: 'لم أبدأ هذا المخرج أو لم أرفق دليلاً بعد.' },
          { id: 'in-progress', label: 'قيد العمل', description: 'بدأت المخرج وما زالت أجزاء محددة تحتاج إكمالاً.' },
          { id: 'ready-for-review', label: 'جاهز للمراجعة', description: 'أرفقت المخرج ودليلاً وحددت أسئلة أو قيوداً للمراجع؛ لا يعني اجتيازاً أو إتقاناً.' },
        ],
        completionRule: 'no-mastery-threshold',
        summary: 'مقياس وصفي ذاتي بلا حد إتقان أو تحقق مستقل.',
        approval: proposedApproval(),
      },
      criteria, reviewEvidence: [rubricEvidence],
    },
    reviewEvidence: [lessonEvidence, questionEvidence, rubricEvidence, {
      area: 'video', outcome: 'not-run',
      evidence: video
        ? `بحث المؤلف في مصدر الناشر ورشّح “${video.title}” لموضوع الدرس؛ مصدر المطابقة مذكور في دليل المورد. لم يُختبر playback أو captions أو الوصولية أو ملاءمة إصدار الفيديو، ولم يسجل قبول المالك.`
        : 'لم يُعثر على مورد فيديو ملائم بمصدر ناشر مستقل حتى الآن؛ يظل اختيار candidate وفحص المصدر والمقطع ومراجعته المستقلة بوابة مفتوحة.',
      ...(video?.reviewEvidence[0]?.sourceUrl ? { sourceUrl: video.reviewEvidence[0].sourceUrl } : {}),
    }],
  };
}

/** Keyed by canonical Topic.slug. These 29 records cover Topics 30–58. */
export const LEARNING_CONTENT_GROUP_B: Record<string, TopicLearningContent> = {
  'typescript-types': topic({
    slug: 'typescript-types',
    objectives: [
      'اشتق عقود الأنواع من ERD المعتمد وميّز union الحالة عن الحقل الاختياري.',
      'طابق بيانات تجريبية مع العقد وارفض القيم غير الصالحة عند حد البيانات.',
    ],
    sections: [
      { id: 'inputs', heading: 'ابدأ من البيانات المعتمدة', body: 'المدخل ERD وجرد الشاشات، لا تخمين من واجهة منفردة. حوّل الحقول والعلاقات إلى أنواع مشتركة؛ استخدم union لقيم الحالة، وحقلًا اختيارياً فقط عندما تسمح القاعدة بغيابه. TypeScript يفحص الشيفرة وقت التطوير ولا يتحقق وحده من JSON وقت التشغيل.' },
      { id: 'example', heading: 'مثال توضيحي: حالة طلب', body: "الاتحاد draft وsubmitted وaccepted وcancelled مثال تعليمي بأربع حالات فقط، وليس LoanStatus المعتمد ذي الحالات الخمس في BorrowHub. استبدل الحالات بما يحدده ERD لمشروعك. لا تجعل الحقل اختيارياً لإخفاء قيمة ناقصة. يفحص TypeScript الشيفرة المعلّمة وقت التطوير؛ أما JSON الوارد فيحتاج تحققاً وقت التشغيل عند حد النظام." },
      { id: 'exercise', heading: 'مهمة وبرومبت ومخرج', body: 'برومبت: «اشتق الأنواع من ERD والعينة؛ اعرض كل افتراض كسؤال، واكتب اختباراً يرفض حالة غير مدرجة، ولا تستخدم any». سلّم العقود وفحص البيانات إلى بناء المكونات في الموضوع 31.' },
    ],
    practicalSteps: [
      { id: 'define-contract', instruction: 'أنشئ src/types/project.ts وعرّف كياناً وحالاته من ERD.', expectedOutput: "Equipment له id/name وRequestStatus محصور بالقيم الموثقة؛ لا يوجد any أو status? بلا سبب." },
      { id: 'test-boundary', instruction: 'افصل فحص النوع الساكن عن اختبار JSON وقت التشغيل، وسجل نتيجة كل واحد.', expectedOutput: 'إسناد TypeScript معلّم بقيمة status: "waiting" يفشل في tsc؛ أما JSON الخام فلا يرفضه TypeScript، ولا يفشل إلا بعد تنفيذ schema validator واختبار مستقل. اكتب Not Run لأي فحص لم تنفذه.' },
      { id: 'document-assumptions', instruction: 'اربط كل نوع بمصدره وسجل الحقول غير المحسومة.', expectedOutput: 'docs/TYPESCRIPT_GUIDELINES.md يحوي مرجع ERD وأسئلة مفتوحة، بلا قواعد مخترعة.' },
    ],
    workedExample: { id: 'request-union-example', title: 'عقد حالة طلب توضيحي', context: 'مثال بأربع حالات لتوضيح union فقط؛ ليس قائمة BorrowHub ولا يثبت فحصاً منفذاً. استبدل القيم بحالات ERD لمشروعك.', result: "type RequestStatus = 'draft' | 'submitted' | 'accepted' | 'cancelled';\ninterface Request { id: string; status: RequestStatus }\nconst sample: Request = { id: 'req-104', status: 'submitted' };\n// Compile-time example: const invalid: RequestStatus = 'waiting'; // tsc error\n// Raw JSON still needs a separately implemented runtime schema check.", caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'ERD يحدد أربع حالات. أي تعريف يحافظ على العقد؟', options: ['status: string', "status: 'draft' | 'submitted' | 'accepted' | 'cancelled'", 'status?: string'], correct: 1, explanation: 'الاتحاد الحرفي يقيد القيم المعتمدة؛ string والحقل الاختياري يغيران معنى العقد.' },
      { objective: 2, prompt: 'وصل JSON بحالة غير موجودة في union. ماذا يلزم؟', options: ['TypeScript يضمن JSON وقت التشغيل.', 'اقبل القيمة وأخف التحذير.', 'تحقق عند حد البيانات؛ النوع الساكن لا يفحص JSON وحده.'], correct: 2, explanation: 'الأنواع لا تتحقق آلياً من بيانات خارجية أثناء التشغيل.' },
    ],
    outputs: [
      { id: 'types-file', description: 'عقود المشروع المشتقة من ERD مع حالات موثقة.' },
      { id: 'type-evidence', description: 'عينة صحيحة وحالة سلبية ونتيجة فحص مسجلة.' },
    ],
    criteria: [
      { id: 'contract-source', outputId: 'types-file', name: 'مصدر العقد', description: 'كل كيان وحالة يتتبعان إلى ERD أو سؤال مفتوح.', evidencePrompt: 'أشر إلى حقل وحالة ومصدرهما في ERD.' },
      { id: 'runtime-boundary', outputId: 'type-evidence', name: 'فحص الحد', description: 'العينة غير الصحيحة تفشل عند الفحص المناسب.', evidencePrompt: 'أرفق اسم الاختبار ورسالة الفشل أو فحص وقت التشغيل.' },
    ],
    reviewNote: 'راجع المؤلف union والحقل الاختياري والفرق بين فحص النوع والتحقق وقت التشغيل. عينة المخرج صحيحة/سلبية وتغذي React؛ لا تقفل الوصول للموضوع التالي.',
  }),
  'react-components-state': topic({
    slug: 'react-components-state',
    objectives: [
      'قسّم الشاشة إلى مكونات عرض بواجهات props واضحة وتدفق بيانات باتجاه واحد.',
      'ضع الحالة في أقرب أب مشترك واعرض التحميل والنجاح والفراغ والخطأ ببيانات معلومة.',
    ],
    sections: [
      { id: 'inputs', heading: 'من العقود إلى مكونات', body: 'ابدأ بمخرجي الموضوع 30 types-file وtype-evidence، وجرد الشاشات وبيانات تجريبية. المكون الذي يعرض props فقط أسهل للفحص؛ الحدث يصعد كـ callback. لا تعدل prop ولا تحفظ نسختين متعارضتين من الحالة.' },
      { id: 'example', heading: 'مثال محلول: بحث قائمة', body: 'احتفظ query في CatalogPage، ومرر items وonSelect إلى CatalogList. اشتق النتائج من items وquery. اعرض loading وsuccess وempty وerror، وعلّم مصدر البيانات إن كان fixture محلياً.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «قسّم الشاشة إلى عرض ومالك حالة، واستخدم الأنواع، وبيّن أربع حالات ببيانات محلية. لا تضف طلب شبكة، واذكر أين يلزم use client ولماذا». سلّم خريطة المكونات إلى التنسيق في الموضوع 32.' },
    ],
    practicalSteps: [
      { id: 'map', instruction: 'ارسم شجرة مكونات وحدد من يملك كل قيمة مشتركة.', expectedOutput: 'CatalogPage → SearchToolbar + CatalogList → ItemCard، ومالك واحد لـ query.' },
      { id: 'states', instruction: 'نفذ بطاقة نقية واعرض حالات القائمة الأربع بfixtures.', expectedOutput: 'لقطة أو fixture لكل حالة؛ كل بيانات البطاقة تطابق العقد المعرّف.' },
      { id: 'client-boundary', instruction: 'حدد المكون الذي يستخدم hook أو حدثاً وأضف توجيه العميل عند الحاجة.', expectedOutput: 'توضيح موضع use client وسببه؛ العرض البحت لا يحمل توجيهاً زائداً.' },
    ],
    workedExample: { id: 'search-flow', title: 'تدفق بحث باتجاه واحد', context: 'صفحة فهرس تملك query وتعرض بطاقات قراءة فقط.', result: 'SearchPage(query) → CatalogList(items,onSelect) → ItemCard(item). النتائج مشتقة ولا توجد نسخة ثانية قابلة للتعارض.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'القائمة وشريط البحث يحتاجان query نفسها. أين تحفظ؟', options: ['في كل بطاقة.', 'في أقرب أب مشترك ينسق الإدخال والنتائج.', 'في prop يعدله الطفل مباشرة.'], correct: 1, explanation: 'مالك واحد للحالة المشتركة يتيح تدفق props نزولاً.' },
      { objective: 2, prompt: 'مكوّن عرض بلا hooks أو أحداث. هل يحتاج use client؟', options: ['لا، حتى تظهر حاجة تفاعلية.', 'نعم، كل مكونات Next.js تحتاجه.', 'نعم، كي تختبر بيانات fixtures.'], correct: 0, explanation: 'حد العميل مطلوب عند استخدام hooks أو browser APIs أو أحداث.' },
    ],
    outputs: [
      { id: 'component-map', description: 'خريطة props وحدود المكونات ومالك الحالة.' },
      { id: 'state-fixtures', description: 'مكونات وfixtures لحالات التحميل والنجاح والفراغ والخطأ.' },
    ],
    criteria: [
      { id: 'state-owner', outputId: 'component-map', name: 'مالك حالة واضح', description: 'القيمة المشتركة لها مصدر واحد؛ props للأبناء وcallbacks للأعلى.', evidencePrompt: 'أشر إلى تعريف query والحدث الذي يعيد التغيير للأب.' },
      { id: 'state-coverage', outputId: 'state-fixtures', name: 'حالات ظاهرة', description: 'كل حالة لها بيانات قابلة للعرض ولا توصف fixture كـ API.', evidencePrompt: 'أرفق أسماء fixtures الأربع ومصدر بياناتها.' },
    ],
    reviewNote: 'راجع المؤلف اشتقاق النتائج وملكية الحالة وحد use client. حالات العرض الأربع محددة وبياناتها محلية بوضوح.',
  }),
  'tailwind-css-responsive': topic({
    slug: 'tailwind-css-responsive',
    objectives: [
      'اربط فئات Tailwind برموز DESIGN.md وتجنب قيم التصميم الاعتباطية.',
      'استخدم الخصائص المنطقية وافحص RTL/LTR عند عروض مختلفة بلا overflow أفقي.',
    ],
    sections: [
      { id: 'inputs', heading: 'من الرمز إلى الفئة', body: 'المدخل DESIGN.md ومخرجا الموضوع 31 component-map وstate-fixtures، ثم مكونات React التي تريد تنسيقها. Utility-first لا يعني اختيار قيمة بلا ضابط. اربط tokens بمتغير أو فئة، وتحقق من إصدار Tailwind لأن إعداد theme يختلف بين النسخ.' },
      { id: 'example', heading: 'مثال محلول: بطاقة ثنائية الاتجاه', body: 'بطاقة تستخدم ps-4 وtext-start وms-auto عوض padding-left وmargin-left. يتغير ترتيبها مع dir. افحص العنصر المسبب لأي overflow قبل إخفائه.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «طبّق الرموز على هذا المكون، واستخدم خصائص منطقية، واعرض الفحص عند 390/768/1024/1366/1440px. لا تضف لوناً خارج DESIGN.md». سلّم جدول الرموز إلى هيكلة المسارات في الموضوع 33.' },
    ],
    practicalSteps: [
      { id: 'token-map', instruction: 'اربط لوناً ومسافة ونصف قطر من DESIGN.md بمتغير/فئة حسب إصدار Tailwind.', expectedOutput: 'docs/TAILWIND_DESIGN_MAPPING.md يذكر المصدر والأسئلة غير المحسومة.' },
      { id: 'logical-card', instruction: 'نسق بطاقة بخصائص منطقية وافحص العربية والإنجليزية.', expectedOutput: 'لا تعتمد المحاذاة على ml/mr أو left/right إذا كان المقصود اتجاه النص.' },
      { id: 'width-check', instruction: 'افحص العروض الخمسة وسجل overflow مع العنصر ونتيجة RTL/LTR. أصلح سبب التدفق أولاً؛ لا تخفه على مستوى الصفحة.', expectedOutput: 'مصفوفة تسجل العرض والاتجاه والعنصر وسبب التدفق والإصلاح والفحص الفعلي؛ يجوز قص محتوى محلي مقصود فقط مع توثيق سببه. غير المفحوص ليس Passed.' },
    ],
    workedExample: { id: 'logical-layout', title: 'بطاقة اتجاهية', context: 'بطاقة لها عنوان وزر إجراء.', result: 'ps-4 وtext-start وms-auto يتبعون اتجاه الكتابة؛ تنتقل الأزرار لسطر عند الهاتف عند الحاجة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'كيف تحد من تشتت الألوان بين الصفحات؟', options: ['اختيار قيم مختلفة لكل مكون.', 'ربط الفئات برموز DESIGN.md وتسجيل الرمز غير الموجود كسؤال.', 'حذف النظام بعد أول شاشة.'], correct: 1, explanation: 'الربط بالرموز يجعل القرار البصري متسقاً وقابلاً للمراجعة.' },
      { objective: 2, prompt: 'ml-4 يضع المسافة في الجهة الخطأ بالعربية. ما البديل؟', options: ['ms-4 إذا كان المقصود الهامش المنطقي قبل العنصر.', 'إضافة ml-4 وmr-4 دائماً.', 'إخفاء overflow-x.'], correct: 0, explanation: 'الخاصية المنطقية تتبع اتجاه الكتابة؛ إخفاء overflow يخفي العَرَض فقط.' },
    ],
    outputs: [
      { id: 'token-map', description: 'جدول الرموز المعتمدة وربطها بمتغيرات/فئات.' },
      { id: 'responsive-report', description: 'مصفوفة عروض واتجاهات بنتائج فحص حقيقية.' },
    ],
    criteria: [
      { id: 'token-source', outputId: 'token-map', name: 'مصدر الرمز', description: 'الفئات المخصصة مرتبطة بمصدر أو سؤال مفتوح.', evidencePrompt: 'أشر إلى مصدر لون ومسافة وفئتهما.' },
      { id: 'direction-check', outputId: 'responsive-report', name: 'فحص الاتجاه والعرض', description: 'يذكر العرض والاتجاه والعنصر المتأثر لا ادعاء تجاوب عام.', evidencePrompt: 'أرفق أصغر عرض فحصته ونتيجة RTL/LTR.' },
    ],
    reviewNote: 'راجع المؤلف فرق الخصائص المنطقية عن إخفاء overflow وربط الفئات بمصدر التصميم. جدول الفحص لا يسجل عروضاً غير معاينة.',
  }),
  'nextjs-app-router': topic({
    slug: 'nextjs-app-router',
    objectives: [
      'حوّل جرد الشاشات إلى مسارات App Router وافصل layout عن page والمسار الديناميكي.',
      'حدد حدود مكونات الخادم والعميل وسمّ البيانات المحلية fixtures بوضوح.',
    ],
    sections: [
      { id: 'inputs', heading: 'من الجرد إلى الملفات', body: 'المدخل SCREEN_INVENTORY.md وعقود البيانات وخريطة المكونات، مع token-map من الموضوع 32 عند تنسيق shell؛ راجع responsive-report كحدود فحص موثقة. مجلدات app تمثل مسارات؛ page محتوى المسار وlayout هيكل مشترك. [id] يلتقط مساراً؛ loading/not-found يعالجان حالات منفصلة.' },
      { id: 'example', heading: 'مثال محلول: قائمة وتفصيل BorrowHub', body: 'في مثال BorrowHub المسار /equipment يكون app/equipment/page.tsx والتفصيل /equipment/[id] يكون app/equipment/[id]/page.tsx؛ يعرضان معدات من fixtures محلية. استخدم Link للتنقل الداخلي. اتبع مسارات جرد مشروعك إذا اختلفت، والبيانات المحلية لا تثبت وجود API أو قاعدة حية.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «حوّل الجرد إلى شجرة App Router، وسم كل ملف ومصدر البيانات. حافظ على RTL، وضع use client عند hook/حدث فقط. لا تدّع وجود Backend». سلّم الشجرة لتخطيط المشروع التالي.' },
    ],
    practicalSteps: [
      { id: 'route-tree', instruction: 'اربط كل شاشة بمسار وpage وحدد layout وحالات loading/not-found.', expectedOutput: 'docs/NEXTJS_ROUTING_SPEC.md يربط الجرد بملفات app.' },
      { id: 'shell', instruction: 'أنشئ layout بlang/dir وتنقلاً داخلياً إلى مسارين موجودين.', expectedOutput: 'تخطيط lang="ar" وdir="rtl" وروابط لمسارات قائمة.' },
      { id: 'data-boundary', instruction: 'حدد لكل صفحة هل مصدرها fixture أو API منفذ فعلاً.', expectedOutput: 'مصفوفة route/source/client-boundary بلا ادعاء API عند استخدام fixtures.' },
    ],
    workedExample: { id: 'route-files', title: 'شجرة مسارات BorrowHub', context: 'مثال BorrowHub يعرض فهرس معدات وتفاصيلها؛ طابقه مع SCREEN_INVENTORY.md لمشروعك.', result: 'src/app/layout.tsx; src/app/equipment/page.tsx; src/app/equipment/[id]/page.tsx. صفحة التفصيل تعرض not-found لقيمة id غير موجودة. مصدر السجلات fixtures محلية حتى يثبت API منفذ.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أين تضع واجهة تظهر حول القائمة والتفاصيل؟', options: ['في layout مشترك للمسارين.', 'تكرارها في كل page.', 'داخل مجلد [id].'], correct: 0, explanation: 'layout يوفر الهيكل المشترك للمسارات التابعة.' },
      { objective: 2, prompt: 'صفحة تعرض fixtures محلية. ما الوصف الدقيق؟', options: ['API الخلفية مكتمل.', 'البيانات تجريبية؛ التكامل لم يثبت بعد.', 'Next.js حفظها تلقائياً في قاعدة.'], correct: 1, explanation: 'عرض البيانات المحلية لا يثبت وجود API أو قاعدة بيانات.' },
    ],
    outputs: [
      { id: 'route-spec', description: 'شجرة مسارات ومطابقة للشاشات وحالاتها.' },
      { id: 'route-shell', description: 'layout وتنقل داخلي مع مصدر البيانات معلناً.' },
    ],
    criteria: [
      { id: 'screen-trace', outputId: 'route-spec', name: 'تغطية الجرد', description: 'الشاشات المختارة لها مسار وملف وحالة مناسبة.', evidencePrompt: 'أشر إلى شاشة ومسار وملف الصفحة المقابل.' },
      { id: 'source-label', outputId: 'route-shell', name: 'صدق المصدر', description: 'fixture وAPI الفعلي مسميان كما هما.', evidencePrompt: 'أرفق صفحة واحدة ومصدر بياناتها الفعلي.' },
    ],
    reviewNote: 'راجع المؤلف أسماء الملفات وحدود fixture مقابل API. المخرجات تبني على المكونات وتبقى جميع المسارات قابلة للفتح مستقلاً.',
  }),
  'frontend-architecture-planning': topic({
    slug: 'frontend-architecture-planning',
    objectives: ['اشتق شجرة الصفحات والمكونات والعقود من PRD/SRS وجرد الشاشات وERD.', 'حوّل رحلة استخدام واحدة إلى مهام مرتبة ذات مدخل ومخرج قابل للفحص.'],
    sections: [
      { id: 'inputs', heading: 'اجمع المراجع قبل تقسيم الملفات', body: 'ابدأ بـ PRD وSRS وجرد الشاشات وDESIGN.md وERD ومخرجي الموضوع 33 route-spec وroute-shell (docs/NEXTJS_ROUTING_SPEC.md). طابق كل ملف ومسار هناك قبل إضافة مكونات أو مهام. سجل ما يطلبه المستخدم وما تعرضه كل route، ثم اربط المكونات بالكيانات. لا تضف شاشة أو دوراً لأنه شائع في منتج آخر.' },
      { id: 'example', heading: 'مثال محلول: فهرس وتفصيل', body: 'في BorrowHub المسار /equipment يعرض AppShell وSearchBar وEquipmentCard؛ /equipment/[id] يعرض التفاصيل. العقد يمرر EquipmentSummary للفهرس وEquipmentRecord للتفصيل، وأي حقل غير محسوم يبقى سؤالاً.' },
      { id: 'exercise', heading: 'برومبت تخطيط ومخرج', body: 'برومبت: «استخرج route/component map من هذه المراجع. اربط كل عنصر بمصدره، وافصل القرارات عن الأسئلة، ثم اقترح مهام صغيرة بقبول ملاحظ. لا تنشئ Backend أو شاشة غير موجودة». سلّم الخريطة إلى مراجعة UX التالية.' },
    ],
    practicalSteps: [
      { id: 'screen-map', instruction: 'صنف كل شاشة إلى route ومكونات مشتركة وبيانات تقرؤها أو تعدلها.', expectedOutput: 'docs/FRONTEND_ARCHITECTURE.md يحوي جدول شاشة/route/component/data source.' },
      { id: 'vertical-task', instruction: 'اختر رحلة واقطعها إلى مهام صغيرة تبدأ بسطح المستخدم وتنتهي بمخرج قابل للتجربة.', expectedOutput: 'قائمة مهام فيها empty/success states وقبول ملاحظ، لا مهمة واحدة بعنوان "ابن التطبيق".' },
      { id: 'unknowns', instruction: 'سجل الاختلاف بين PRD وERD أو الشاشة مع مصدر القرار المطلوب.', expectedOutput: 'docs/FRONTEND_OPEN_QUESTIONS.md يذكر السؤال والمراجع والمالك.' },
    ],
    workedExample: { id: 'route-map-example', title: 'خريطة فهرس المعدات', context: 'BorrowHub SCREEN_INVENTORY.md وroute-spec يحددان فهرس المعدات والتفاصيل.', result: 'Route /equipment → SearchBar + EquipmentList؛ route /equipment/[id] → EquipmentDetail. الرابط يحمل id، وبقية الحقول مصدرها محدد في الخريطة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'تختلف شاشة عن ERD في حقلين. ما الخطوة الأولى؟', options: ['اختيار الحقول المعتادة.', 'تسجيل سؤال وربطه بالمصدرين قبل تثبيت العقد.', 'إضافة الحقلين إلى قاعدة البيانات.'], correct: 1, explanation: 'الخطة تميز القرار من الافتراض، ولا تنشئ عقداً متعارضاً بالتخمين.' },
      { objective: 2, prompt: 'أي مهمة يسهل مراجعتها؟', options: ['"ابن الواجهة".', '"نفذ ItemCard بfixture وحالة empty ومعيار قبول".', '"حسن الملفات لاحقاً".'], correct: 1, explanation: 'مهمة صغيرة ذات مدخل ونتيجة مرئية يمكن فحصها مستقلة.' },
    ],
    outputs: [{ id: 'front-map', description: 'خريطة route/component/data مرتبطة بمصادر المتطلبات.' }, { id: 'task-slice', description: 'مهام عمودية صغيرة وأسئلة وأدلة قبول.' }],
    criteria: [
      { id: 'map-source', outputId: 'front-map', name: 'تتبّع المصدر', description: 'كل route/component يتبع متطلباً أو يحمل سؤالاً مفتوحاً.', evidencePrompt: 'أشر إلى شاشة ومصدرها في PRD أو inventory.' },
      { id: 'slice-acceptance', outputId: 'task-slice', name: 'قبول ملاحظ', description: 'للمهام نتيجة مرئية وحالات خارج المسار السعيد.', evidencePrompt: 'أرفق المهمة الأولى وشرط قبول يمكن إعادة ملاحظته.' },
    ],
    reviewNote: 'راجع المؤلف ربط المراجع الأربعة بخريطة route/component ومهمة رأسية. لا تُدخل قاعدة أو شاشة غير موثقة، والمخرج يهيئ مراجعة UX وSpec Kit.',
  }),
  'ui-ux-pro-max-review': topic({
    slug: 'ui-ux-pro-max-review',
    objectives: ['راجع توصيات UI/UX مقابل المستخدم والمتطلب ونظام التصميم قبل قبولها.', 'سجل قرارات تصميم وأسبابها بحيث يستطيع المطور تطبيقها واختبارها.'],
    sections: [
      { id: 'inputs', heading: 'حدد السياق قبل تشغيل الأداة', body: 'المدخل DESIGN.md ومخرجا تخطيط الواجهة في الموضوع 34 front-map وtask-slice، مع مهمة المستخدم والعرض والاتجاه. أداة التوصية لا تعتمد القرارات نيابة عن مالك المشروع. احذف البيانات الشخصية ولا ترسل أسراراً.' },
      { id: 'example', heading: 'مثال محلول: اقتراح يخالف الرمز', body: 'إذا اقترحت الأداة لون زر غير موجود في DESIGN.md، احتفظ باللون المعتمد أو افتح قرار تغيير. افحص تباين ومساحة النقر عند الحاجة؛ لا تدّع WCAG compliant من رأي آلي.' },
      { id: 'exercise', heading: 'برومبت مراجعة ومخرج', body: 'برومبت: «لكل توصية اذكر العنصر والدليل والأثر. ميّز الاقتراح عن معيار الوصولية، ولا تعدل الكود. أخرج قرار قبول/رفض وسؤالاً مفتوحاً». سلّم جدول القرار إلى Spec Kit.' },
    ],
    practicalSteps: [
      { id: 'context', instruction: 'جهز وصف الشاشة والمستخدم والمهمة والاتجاه والعروض واحذف بيانات حقيقية.', expectedOutput: 'docs/UX_REVIEW_CONTEXT.md يحدد نسخة الرموز والسياق.' },
      { id: 'triage', instruction: 'صنف كل توصية: قبول أو رفض أو اختبار/قرار مطلوب.', expectedOutput: 'docs/UX_REVIEW_DECISIONS.md يربط التوصية بعنصر الشاشة والمتطلب.' },
      { id: 'apply-reviewed', instruction: 'حوّل المقبول فقط إلى تغييرات بقبل/بعد ومعيار تحقق.', expectedOutput: 'تغييرات لا تحتوي توصيات غير محسومة ولا ادعاء امتثال غير مفحوص.' },
    ],
    workedExample: { id: 'ux-decision', title: 'فرز اقتراح لون ومساحة', context: 'أداة تقترح تكبير زر ثانوي وتغيير لونه.', result: 'تكبير مساحة النقر مقبول لتسهيل اللمس؛ اللون الجديد ينتظر قراراً لأنه خارج DESIGN.md. يضاف فحص contrast قبل أي تغيير لون.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'اقترحت الأداة لوناً غير موجود في DESIGN.md. ماذا تفعل؟', options: ['تطبقه مباشرة.', 'توثق الاقتراح وتراجع النظام وتطلب قراراً إن كان تغييره مطلوباً.', 'تحذف كل الاقتراحات.'], correct: 1, explanation: 'المخرجات مقترحات؛ تغيير النظام قرار قابل للتتبع.' },
      { objective: 2, prompt: 'كيف تجعل ملاحظة "المسافة غير مريحة" قابلة للتنفيذ؟', options: ['تحدد العنصر والسياق والدليل والتغيير والفحص.', 'ترفق صورة الأداة وحدها.', 'تغير كل padding.'], correct: 0, explanation: 'المراجع يحتاج موضعاً وسبباً وخطوة تحقق.' },
    ],
    outputs: [{ id: 'ux-context', description: 'سياق شاشة آمن يحدد المستخدم والمهمة والاتجاه والرموز.' }, { id: 'ux-decisions', description: 'قرارات قبول/رفض وأسئلة مع دليل ومعيار فحص.' }],
    criteria: [
      { id: 'review-context', outputId: 'ux-context', name: 'سياق محدد', description: 'المراجعة تذكر المستخدم والمهمة ولا تتضمن بيانات حساسة.', evidencePrompt: 'أشر إلى الشاشة والمهمة والعرض الذي راجعته.' },
      { id: 'decision-record', outputId: 'ux-decisions', name: 'قرار قابل للتتبع', description: 'كل توصية لها حالة ومبرر أو فحص مطلوب.', evidencePrompt: 'اعرض توصية ومصدر الحكم وسبب الحالة المختارة.' },
    ],
    reviewNote: 'راجع المؤلف حدود أداة التوصية بوصفها مدخلاً لا قراراً، وميّز تقييماً آلياً عن إثبات معيار وصولية. يسلم الناتج قرارات قابلة للتطبيق.',
  }),
  'spec-kit-workflow': topic({
    slug: 'spec-kit-workflow',
    objectives: ['حوّل طلب ميزة إلى مواصفة وأسئلة وسياق قبل توليد خطة التنفيذ.', 'راجع clarify/plan/tasks مقابل مصادر المشروع وتوقف عند سؤال أو تعارض جوهري.'],
    sections: [
      { id: 'inputs', heading: 'المواصفة تسلسل قرارات', body: 'المدخل Constitution وPRD/SRS وخريطة الواجهة، ومخرجا الموضوع 35 ux-context وux-decisions في docs/UX_REVIEW_CONTEXT.md وdocs/UX_REVIEW_DECISIONS.md، بما فيهما القرارات والأسئلة المفتوحة. يمر العمل من spec إلى توضيح الأسئلة ثم plan وtasks، مع حمل القرارات المقبولة فقط إلى معايير التنفيذ. أسماء أوامر Spec Kit قد تتغير؛ افحص إصدار المستودع ولا تنسخ أمراً بلا تحقق.' },
      { id: 'example', heading: 'مثال محلول: استعادة مسودة', body: 'حدد حقول المسودة ومتى تحفظ وما يحدث عند تعارض جهازين. لا تجعل الخطة تضيف مزامنة سحابية إذا كان نطاق MVP محلياً؛ اكتب السؤال واطلب قراراً.' },
      { id: 'exercise', heading: 'برومبت ومخرج مرحلي', body: 'برومبت: «اقرأ Constitution وPRD/SRS. صغ spec لهذه الميزة، أظهر الأسئلة بلا افتراض، ثم اقترح خطة ومهام مرتبطة بمعايير قبول. لا تنفذ الكود». الناتج يهيئ التنفيذ التدريجي.' },
    ],
    practicalSteps: [
      { id: 'spec', instruction: 'اكتب سلوك الميزة والمستخدم والحالات المتوقعة والاستثناءات من المصادر.', expectedOutput: 'spec.md يصف success/error/empty ويربط القواعد بوثيقة.' },
      { id: 'clarify', instruction: 'سجل أسئلة الأداة ومن يجيب عنها ولا تحول الافتراض إلى قاعدة صامتة.', expectedOutput: 'قائمة clarification لا تحتوي أسئلة حرجة مخفية داخل الخطة.' },
      { id: 'plan', instruction: 'راجع الخطة وقسمها لمهام صغيرة مع ملفات واختبار قبول.', expectedOutput: 'plan/tasks تربط كل مهمة بشرط من spec؛ لا تشمل تنفيذ الكود.' },
    ],
    workedExample: { id: 'local-draft-spec', title: 'مواصفة حفظ مسودة', context: 'عودة المتعلم للمسودة في المتصفح نفسه.', result: 'المواصفة تحدد الحقول والحفظ والاستعادة وفشل storage. سؤال مزامنة الأجهزة يبقى مفتوحاً؛ لا يضاف Backend دون قرار.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أضافت أداة التخطيط مزامنة سحابية لنطاق محلي. ما التصرف؟', options: ['اعتمادها لأنها في الخطة.', 'إعادتها لحدود النطاق وتسجيلها كقرار جديد إن لزم.', 'تغيير النطاق تلقائياً.'], correct: 1, explanation: 'الخطة لا تملك صلاحية توسيع المتطلبات المعتمدة.' },
      { objective: 2, prompt: 'ما الذي يجعل tasks قابلة للمراجعة؟', options: ['كل مهمة لها متطلب وملف/نتيجة وقبول.', 'كلها بعنوان "نفذ الميزة".', 'أكبر عدد من الملفات.'], correct: 0, explanation: 'التتبع والقبول يحددان حجم التغيير وأثره.' },
    ],
    outputs: [{ id: 'feature-spec', description: 'مواصفة سيناريوهات وأسئلة مرتبطة بالمصادر.' }, { id: 'feature-plan', description: 'خطة ومهام صغيرة ضمن النطاق وبقبول واضح.' }],
    criteria: [
      { id: 'scope', outputId: 'feature-spec', name: 'نطاق وقرارات', description: 'الأسئلة غير المحسومة ظاهرة ولا توجد قاعدة مخترعة.', evidencePrompt: 'أرفق متطلباً وسؤالاً مفتوحاً ومصدر كل منهما.' },
      { id: 'tasks', outputId: 'feature-plan', name: 'تتبع المهام', description: 'كل مهمة مرتبطة بمعيار قبول دون توسيع.', evidencePrompt: 'اختر مهمة واربطها بشرط spec.' },
    ],
    reviewNote: 'راجع المؤلف التسلسل من المواصفة إلى التوضيح والخطة، وحدود النطاق عند المزامنة. أمر الأداة يجب أن يطابق الإصدار الفعلي.',
  }),
  'frontend-incremental-implementation': topic({
    slug: 'frontend-incremental-implementation',
    objectives: ['نفذ شرائح صغيرة من الواجهة ترتبط بمعيار قبول ومصدر بيانات معلوم.', 'اعرض حالات الفشل والفراغ ودوّن نتائج الفحص قبل بدء الشريحة التالية.'],
    sections: [
      { id: 'inputs', heading: 'من المهام إلى شريحة رأسية', body: 'المدخل مخرجا الموضوع 36 feature-spec وfeature-plan، ومخرج الموضوع 35 ux-decisions، وعقود البيانات. الشريحة تغطي تفاعلاً واحداً من المستخدم إلى نتيجة، وتوضح هل المصدر fixture أم API. لا تنفذ توصية UX غير محسومة ولا تفتح تغييرات واسعة قبل فهم المخرج.' },
      { id: 'example', heading: 'مثال محلول: صفحة تفاصيل', body: 'ابدأ ببيانات fixture وحالة not-found، ثم أضف التحميل عند توفر المصدر، ثم معالجة خطأ. سجل كل فحص وأي طبقة لم تدخل التجربة؛ لا تسم fixture تكاملاً.' },
      { id: 'exercise', heading: 'برومبت تنفيذ محدود', body: 'برومبت: «نفّذ هذه المهمة وحدها وفق spec. اعرض الملفات والافتراضات ثم diff والاختبارات التي شغلتها فعلاً. لا تغير API أو التصميم خارج القبول». سلّم الشريحة إلى مرحلة Backend.' },
    ],
    practicalSteps: [
      { id: 'choose-slice', instruction: 'اختر مهمة واكتب معيار قبولها والملفات والبيانات المستخدمة.', expectedOutput: 'بطاقة عمل فيها مدخل ومخرج وfixture موسوم.' },
      { id: 'implement', instruction: 'نفذ حالة نجاح وفراغ أو خطأ مناسبة مع مصدر بيانات واضح.', expectedOutput: 'تدفق لا يوحي بتكامل Backend إن كان mock.' },
      { id: 'review', instruction: 'شغل الفحص المتاح وسجل الأمر والنتيجة والملفات الخارجة عن النطاق.', expectedOutput: 'docs/FRONTEND_SLICE_REVIEW.md بنتيجة Passed/Failed/Not Run وتالية محددة.' },
    ],
    workedExample: { id: 'detail-slice', title: 'شريحة تفاصيل', context: 'مواصفة لفتح سجل من الفهرس.', result: '1: عرض fixture. 2: حالة id غير موجود. 3: ربط API بعد توفر العقد والخادم. تسجل كل مرحلة على حدة ولا توصف الأولى كتدفق مكتمل.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أي شريحة أفضل بداية؟', options: ['مهمة صغيرة بمعيار قبول ومصدر بيانات معروف.', 'إعادة كتابة الواجهة.', 'فتح كل المهام معاً.'], correct: 0, explanation: 'الشريحة المحدودة يسهل فحصها وتصحيحها.' },
      { objective: 2, prompt: 'الاختبار يستخدم fixture بدلاً من API. ماذا تسجل؟', options: ['API Passed.', 'فحص عرض fixture Passed إن نجح، وتكامل API Not Run.', 'لا تذكر المصدر.'], correct: 1, explanation: 'النتيجة يجب أن تطابق الطبقة التي اختبرت فعلاً.' },
    ],
    outputs: [{ id: 'ui-slice', description: 'تغيير واجهة محدود يحقق معياراً مع مصدر بيانات واضح.' }, { id: 'slice-evidence', description: 'سجل ملفات وفحوص ونتائج وفجوة وتالية.' }],
    criteria: [
      { id: 'acceptance', outputId: 'ui-slice', name: 'نطاق الشريحة', description: 'تغيير واحد يطابق معيار قبول ولا يضيف متطلبات.', evidencePrompt: 'اربط الملف أو العنصر بشرط القبول.' },
      { id: 'test-result', outputId: 'slice-evidence', name: 'نتيجة قابلة للإعادة', description: 'الأمر والبيئة ومصدر البيانات مذكورة كما هي.', evidencePrompt: 'أرفق أمراً ونتيجته وطبقة لم تُختبر.' },
    ],
    reviewNote: 'راجع المؤلف فصل fixture عن التكامل الحقيقي واشتراط نتيجة فحص لكل شريحة. المخرج يسلم العقود إلى تأسيس Python Backend.',
  }),
  'python-backend-foundation': topic({
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
  }),
  'postgresql-database-setup': topic({
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
  }),
  'backend-architecture-api-contracts': topic({
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
  }),
  'django-backend': topic({
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
  }),
  'fastapi-backend': topic({
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
  }),
  'auth-permissions': topic({
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
  }),
  'services-selectors': topic({
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
  }),
  'frontend-backend-integration': topic({
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
  }),
  'full-stack-journey-testing': topic({
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
    workedExample: { id: 'journey-example', title: 'إنشاء وقراءة', context: 'E2E لمستخدم تجريبي في test أو staging.', result: 'Given empty catalog → submit valid item → 201 → visible list; submit invalid name → validation message; cleanup removes only fixture created by test.', caseStudy: 'learner-project' },
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
  }),
  'database-performance-engineering': topic({
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
    workedExample: { id: 'query-plan-record', title: 'خطة قراءة', context: 'استعلام dev يفلتر status ويرتب created_at.', result: 'تسجل environment=test وحجم العلاقة والخطة. يمكن إبقاء sequential scan إذا الجدول صغير؛ لا يدعى فرق أداء قبل إعادة القياس.', caseStudy: 'learner-project' },
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
  }),
  'redis-optional-infrastructure': topic({
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
  }),
  'integrated-project-qa': topic({
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
  }),
  'docker-container-workflow': topic({
    slug: 'docker-container-workflow',
    objectives: ['قرر هل يتطلب مسار النشر صورة حاوية أم أن البناء المُدار يفي بالحاجة.', 'عند اختيار Docker اربط Dockerfile بسياق البناء وإصدار runtime وأمر التشغيل مع حماية الأسرار.'],
    sections: [
      { id: 'inputs', heading: 'حدد من يبني الصورة', body: 'المدخل مستودع المشروع وإصدار Node أو Python ومزود النشر ومخرجا الموضوع 49 qa-matrix وqa-gaps لتحديد الرحلة والمخاطر التي يجب أن تبقى مرئية. بعض المنصات تبني من Git مباشرة؛ لا تضف Docker لمجرد أنه شائع. صورة الحاوية artifact قابل للنقل، والحاوية عملية تشغيل منها؛ Compose خيار تطوير لخدمات متعددة وليس شرطاً.' },
      { id: 'example', heading: 'مثال محلول: خادم يحتاج صورة', body: 'اختر Dockerfile يطابق lockfile ونسخة runtime، وانسخ ملفات التشغيل فقط، واجعل مجلد الأسرار خارج build context عبر .dockerignore. شغل العملية بمستخدم غير root، ومرر الإعداد عبر آلية أسرار runtime لا ARG أو طبقة صورة.' },
      { id: 'exercise', heading: 'مهمة وبرومبت ومخرج', body: 'برومبت: «افحص المنصة وإعداد المشروع؛ قارن البناء المُدار وصورة OCI. إن اخترت Docker فسجل السياق والنسخ والأمر والمستخدم ومصدر الأسرار، ولا تبنِ أو تنشر صورة بإعداد إنتاجي». سلّم قرار التشغيل إلى فحص Linux أو سجّل سبب تجاوز إدارته.' },
    ],
    practicalSteps: [
      { id: 'runtime-decision', instruction: 'قارن متطلبات المنصة ببناء Git أو OCI image واكتب سبب الاختيار.', expectedOutput: 'docs/DOCKER_DECISION.md يذكر المنصة ومصدر معلوماتها وحالة التحقق أو سبب تأجيل القرار.' },
      { id: 'image-config', instruction: 'إذا كانت الصورة مطلوبة، اكتب Dockerfile يطابق المشروع و.dockerignore يستثني .env وnode_modules أو venv.', expectedOutput: 'Dockerfile اختياري قابل للمراجعة، ولا يحتوي قيمة سرية أو أمر تشغيل غير مطابق.' },
      { id: 'run-evidence', instruction: 'حدد مستخدم runtime والمنفذ وطريقة تمرير الإعداد؛ اختبر بناءً محلياً فقط إذا كان ذلك آمناً ومتاحاً.', expectedOutput: 'جدول build/run/user/port/secrets مع أمر ونتيجة فعلية أو Not Run وسببها.' },
    ],
    workedExample: { id: 'managed-hosting-choice', title: 'قرار عدم إضافة Docker', context: 'منصة الواجهة تبني مشروع Next.js من المستودع بإعدادها المدعوم.', result: 'Decision=managed build. لا يوجد Dockerfile أو Compose إضافي؛ سجل رابط دليل المنصة وفحص build الحالي. إذا تطلب خادم Python صورة OCI لاحقاً أعد القرار وفق إعداد الخادم.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'المنصة تدعم بناء Next.js مباشرة من Git ولا تحتاج image. ما المخرج المقبول؟', options: ['توثيق البناء المُدار وتجاوز Docker مع سبب.', 'إضافة Compose وRedis دائماً.', 'تضمين .env في الصورة لتسهيل التشغيل.'], correct: 0, explanation: 'الحاوية قرار تشغيل؛ لا تضفها دون حاجة يثبتها المسار.' },
      { objective: 2, prompt: 'أين تمرر قاعدة البيانات السرية إلى حاوية وقت التشغيل؟', options: ['قيمة ثابتة في Dockerfile.', 'وسيط ARG يُحفظ في سجل البناء.', 'مدير أسرار البيئة أو آلية runtime الموثقة.'], correct: 2, explanation: 'الأسرار لا توضع في طبقات الصورة أو سجل البناء.' },
    ],
    outputs: [{ id: 'container-decision', description: 'قرار Docker أو التجاوز مع مصدر المنصة والحاجة.' }, { id: 'container-runtime-evidence', description: 'Dockerfile اختياري وسجل build/run/user/port/secrets بنتيجة صادقة.' }],
    criteria: [
      { id: 'container-need', outputId: 'container-decision', name: 'مبرر اختيار الأداة', description: 'القرار مبني على متطلبات تشغيل فعلية لا على شيوع Docker.', evidencePrompt: 'أشر إلى خاصية المنصة أو حاجة التشغيل التي قادتك للقرار.' },
      { id: 'container-safety', outputId: 'container-runtime-evidence', name: 'سلامة الصورة', description: 'السياق يستثني الأسرار ويحدد هوية التشغيل ومصدر الإعداد.', evidencePrompt: 'اعرض سطر الإعداد الذي يثبت non-root وما استثني من السياق.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين image وcontainer والبناء المُدار، وربط المثال بـ Next.js أو بديل Python. الإعداد المقترح لا يحمل أسراراً، واختبار البناء غير المنفذ لا يوصف بأنه ناجح.',
  }),
  'linux-server-operations': topic({
    slug: 'linux-server-operations',
    objectives: ['حدد ما إذا كانت إدارة Linux اليدوية ضمن مسؤولية الطالب أو أن المنصة تدير النظام.', 'عند إدارة الخادم، فسّر المستخدم والملكية وrwx واختر أقل صلاحية لازمة قبل أي تغيير.'],
    sections: [
      { id: 'inputs', heading: 'ابدأ بحدود مسؤولية الاستضافة', body: 'المدخل منصة النشر أو إعداد VPS وعملية Django/FastAPI ومخرجا الموضوع 50 container-decision وcontainer-runtime-evidence، ومجلدات الكتابة المطلوبة. إذا اختير بناء مُدار فسجل أن إعدادات Linux غير متاحة بدلاً من افتراضها. في بيئة تملكها، افحص id وstat وpwd وps كقراءة أولاً؛ لا تستخدم sudo أو chmod -R على production.' },
      { id: 'example', heading: 'مثال محلول: مجلد رفع محدود', body: 'إذا احتاجت الخدمة مجلد uploads، عرّف مستخدم خدمة ومجموعة ومجلداً واحداً تملكه العملية. اشرح rwx للمالك والمجموعة والآخرين؛ 755 للمجلد لا يمنح الكتابة لكل أحد. إن لم تكن المنصة تسمح بهذه الإدارة، اتبع وثائقها وسجل التجاوز.' },
      { id: 'exercise', heading: 'مهمة وبرومبت وتسليم', body: 'برومبت: «استخرج حدود مزود الاستضافة وهوية العملية ومجلداتها. اقترح أضيق صلاحية مع تحقق قراءة فقط؛ لا تشغّل أوامر تغيير ولا تتصل بالخادم. اذكر مالك القرار وخطة التراجع المطلوبة قبل تعديل مأذون». سلّم ملاحظات التشغيل إلى runbook الموضوع 55.' },
    ],
    practicalSteps: [
      { id: 'host-ownership', instruction: 'حدد من يدير Linux من وصف الخطة أو إعداد المشروع واحفظ مرجعاً موثوقاً.', expectedOutput: 'docs/LINUX_RUNTIME_NOTES.md يحدد self-managed أو managed ودرجة التحقق.' },
      { id: 'permissions-map', instruction: 'إذا كانت الإدارة يدوية، ارسم process user → files read/write → owner/group/mode من مخرجات آمنة.', expectedOutput: 'جدول مجلد/هوية/حاجة/صلاحية؛ وإذا كانت الإدارة مُدارة فسجل ما لا تملكه بدلاً من اختلاق صلاحيات.' },
      { id: 'change-review', instruction: 'اكتب تغييراً مقترحاً واحداً وسبباً وطريقة تحقق وخطة رجوع؛ لا تنفذه على الإنتاج.', expectedOutput: 'تغيير مراجع بأقل وصول وموافقة مطلوبة، أو Not Applicable مع مرجع المنصة.' },
    ],
    workedExample: { id: 'managed-linux', title: 'تجاوز إدارة النظام', context: 'المتجر السحابي يوفر runtime مُداراً ولا يكشف نظام ملفات المضيف.', result: 'Owner=provider. الطالب يوثق متغيرات البيئة ومسار السجلات المكشوف فقط؛ لا يطلب chown/chmod أو SSH. أي صلاحية/سجل غير ظاهر يبقى سؤال دعم للمزود.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'الخدمة تعمل على منصة مُدارة لا تسمح بـ SSH. ما الخطوة السليمة؟', options: ['تسجيل مسؤولية المزود واتباع واجهته دون افتراض وصول Linux.', 'إضافة chmod في build حتى تتغير ملفات المضيف.', 'طلب root من أي مستخدم.'], correct: 0, explanation: 'تتبع الإجراء حدود الاستضافة؛ الطالب لا يدير المضيف المُدار.' },
      { objective: 2, prompt: 'ملف إعداد يحتاجه مستخدم خدمة واحد فقط. أي سياسة تبدأ بها؟', options: ['777 على كل مجلدات المشروع.', 'ملكية مناسبة وصلاحية قراءة أضيق لذلك المستخدم.', 'تشغيل الخدمة دائماً بصفة root.'], correct: 1, explanation: 'الحد الأدنى من الصلاحيات يقلل أثر الخطأ أو الاختراق.' },
    ],
    outputs: [{ id: 'linux-ownership', description: 'خريطة مسؤولية المضيف والمستخدم والمجلدات أو سجل التجاوز.' }, { id: 'linux-change-plan', description: 'اقتراح صلاحيات محدود بخطوة تحقق ورجوع دون تنفيذ إنتاجي.' }],
    criteria: [
      { id: 'host-boundary', outputId: 'linux-ownership', name: 'مسؤولية واضحة', description: 'يوضح المالك الفعلي للنظام والمعلومات التي يمكن للمتعلم رؤيتها.', evidencePrompt: 'أرفق اسم مصدر الخطة ودليلاً على ما يديره مزود الاستضافة.' },
      { id: 'least-privilege', outputId: 'linux-change-plan', name: 'أقل وصول', description: 'يربط الصلاحية بمستخدم ومجلد وحاجة وخطة تحقق/رجوع.', evidencePrompt: 'أشر إلى المجلد والحاجة والهوية، واذكر الأمر الذي لم تنفذه.' },
    ],
    reviewNote: 'راجع المؤلف التفريق بين Linux مُدار ويدوي، وميّز فحص القراءة من تغيير الملكية. المثال لا يوجه إلى تنفيذ أمر إداري قبل الإذن وخطة الرجوع.',
  }),
  'vercel-frontend-deployment': topic({
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
  }),
  'netlify-frontend-deployment': topic({
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
  }),
  'backend-database-deployment': topic({
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
  }),
  'project-operations-runbook': topic({
    slug: 'project-operations-runbook',
    objectives: ['اكتب إجراءات تشغيل مرتبطة بقدرات خطة الاستضافة المثبتة لا بميزات متوقعة.', 'افصل تحديث التطبيق وتراجعه عن نسخ البيانات واستعادتها مع مالك وخطوات تحقق.'],
    sections: [
      { id: 'inputs', heading: 'افحص البيئة المختارة', body: 'المدخل مخرجا الموضوع 54 backend-topology/backend-smoke-report، ومخرجا مضيف الواجهة المختار: الموضوع 52 vercel-config-record/vercel-preview-evidence أو الموضوع 53 netlify-compatibility-record/netlify-preview-report، ومخرجا الموضوع 51 linux-ownership/linux-change-plan عند انطباقه، ومخرجا الموضوع 49 qa-matrix/qa-gaps. تحقق من مصادر CI والسجلات والتنبيه والنسخ وحدود الاحتفاظ. اسم زر backup لا يثبت أن نسخة قابلة للاستعادة؛ لا تخترع RPO/RTO.' },
      { id: 'example', heading: 'مثال محلول: تراجع التطبيق', body: 'إذا فشل إصدار واجهة، أعد آخر إصدار محفوظاً، ثم اختبر landing والroute الحرجة وسجل version. تغيير قاعدة بيانات منفصل: راجع compatibility migration وخطة restore مجربة خارج الإنتاج. لا تعكس كتابة البيانات بمجرد الرجوع إلى code.' },
      { id: 'exercise', heading: 'برومبت تشغيل', body: 'برومبت: «استخدم إعدادات ووثائق المزود الفعلية. سجّل CI وlogs/alerts/backup/restore/deploy/rollback كـ verified أو available-not-tested أو unavailable أو unknown. احمِ الأسرار، ولا تغير production». سلّم الإجراءات إلى حزمة handoff في الموضوع 56.' },
    ],
    practicalSteps: [
      { id: 'capability-inventory', instruction: 'اجمع اسم الخطة والخدمة والرابط الرسمي أو إعداد الحساب لكل قدرة تشغيل.', expectedOutput: 'docs/OPERATIONS_RUNBOOK.md فيه capability/source/status/owner/next-check.' },
      { id: 'restore-drill', instruction: 'صمم تمرين استعادة على test مع نسخة معروفة؛ إن لم تتوفر الصلاحية فاكتب إجراء تحقق مؤجلاً.', expectedOutput: 'docs/RESTORE_DRILL.md بنتيجة فعلية أو Not Run وسبب آمن.' },
      { id: 'rollback-check', instruction: 'افصل rollback application عن restore database وأضف smoke-check لكل عملية.', expectedOutput: 'نسخة/خطوة/مالك/شرط توقف لكل إجراء، دون أوامر إنتاج غير مراجعة.' },
    ],
    workedExample: { id: 'unknown-backup', title: 'قدرة نسخ غير معلومة', context: 'خطة الاستضافة لم تُراجع بعد ولم يجر اختبار استعادة.', result: 'Backup status=unknown, restore drill=Not Run. المالك يراجع صفحة الخطة، ثم ينفذ نسخة إلى بيئة test إذا سمح المزود. لا وعد بسلامة أو زمن استعادة.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'لوحة الخطة تعرض backup لكن لم تجر restore. ماذا تسجل؟', options: ['استعادة Passed.', 'النسخ متاح حسب الدليل؛ restore لم يختبر.', 'RTO مضمون خلال ساعة.'], correct: 1, explanation: 'وجود ميزة لا يثبت نجاح استعادة أو زمنها.' },
      { objective: 2, prompt: 'رجع التطبيق لإصدار أقدم بعد migration أحدثت عموداً. ماذا يجب مراجعة؟', options: ['النسخ والتوافق الرجعي للـ schema؛ rollback التطبيق لا يعكس DB وحده.', 'لا شيء لأن Git يعيد البيانات.', 'امسح العمود فوراً.'], correct: 0, explanation: 'الكود والبيانات لهما إجراءات استعادة مختلفة وقد تكون migration غير عكسية.' },
    ],
    outputs: [{ id: 'operations-capabilities', description: 'جرد قدرات الاستضافة مع مصدر وحالة ومالك.' }, { id: 'restore-rollback-plan', description: 'إجراءات اختبار لاستعادة البيانات وتراجع التطبيق منفصلان.' }],
    criteria: [
      { id: 'capability-evidence', outputId: 'operations-capabilities', name: 'قدرة بدليل', description: 'كل ادعاء تشغيل مرتبط بصفحة/إعداد ومصنف بصدق.', evidencePrompt: 'أرفق قدرة واحدة ومصدرها وما بقي غير متحقق.' },
      { id: 'data-application-separation', outputId: 'restore-rollback-plan', name: 'فصل الإجراءين', description: 'الرجوع للكود لا يوصف باستعادة قاعدة البيانات.', evidencePrompt: 'أشر إلى خطوة تطبيق وخطوة بيانات وشرط كل منهما.' },
    ],
    reviewNote: 'راجع المؤلف حالات القدرة الأربع وفصل rollback عن restore. الدليل التعليمي يتطلب اختباراً خارج الإنتاج أو يسجل Not Run صريحاً؛ قبول المالك ما زال مطلوباً.',
  }),
  'project-handoff-package': topic({
    slug: 'project-handoff-package',
    objectives: ['اجمع نقطة بدء وروابط ومتطلبات ومخططات وتعليمات تشغيل يمكن لمراجع اتباعها.', 'اربط نتيجة QA بإصدار وبيئة وطريقة وتاريخ، وأظهر النواقص والأسرار المحذوفة.'],
    sections: [
      { id: 'inputs', heading: 'حدد من يستلم ولماذا', body: 'المدخل مستندات PRD/SRS وERD وAPI وUX وQA، ومخرجا الموضوع 55 operations-capabilities وrestore-rollback-plan. حزمة التسليم مؤشر للموجود لا مخزن نسخ مضطربة؛ اربط النسخة المعتمدة ولا تنشئ ملفاً أو رابطاً افتراضياً. لا تضع .env أو بيانات مستخدم.' },
      { id: 'example', heading: 'مثال محلول: README موجز', body: 'يبدأ README بالمشكلة والحالة والميزات المنفذة، ثم quick start ومتغيرات البيئة بأسمائها فقط ورابط HANDOFF. تقرير QA يسجل commit وcommand وdate وPassed/Failed/Not Run. إذا API يستخدم fixtures فأظهر ذلك.' },
      { id: 'exercise', heading: 'مهمة تسليم', body: 'برومبت: «أنشئ فهرس الحزمة من الملفات الموجودة. لكل رابط تحقق من المسار والصلاحية، ولكل نتيجة أرفق الأمر والنسخة. اذكر القيود والمالك والخطوة التالية. لا تنسخ الأسرار». سلّم نسخة مختصرة قابلة للعرض في Demo Day.' },
    ],
    practicalSteps: [
      { id: 'readme-index', instruction: 'حدّث README بملخص المشروع والحالة وquick start وروابط نسبية موجودة.', expectedOutput: 'README يفتح مسارات حقيقية ويبين publish/local/prototype بلا ادعاء.' },
      { id: 'handoff-map', instruction: 'أنشئ فهرس متطلبات/مخطط/API/design/runbook/QA مع رقم أو تاريخ النسخة.', expectedOutput: 'docs/HANDOFF.md يذكر الموجود والمفقود والمسؤول والوصول.' },
      { id: 'qa-claim', instruction: 'انقل نتيجة فحص واحدة مع commit/environment/command/date/status.', expectedOutput: 'docs/QA_RESULTS.md يسمح بإعادة الفحص ويحتفظ بـ Failed وNot Run كما هما.' },
    ],
    workedExample: { id: 'handoff-status', title: 'حالة تكامل صادقة', context: 'تسليم مشروع يعرض fixtures بعد نجاح build.', result: 'README: واجهة نموذجية ببيانات محلية؛ QA: build Passed على commit placeholder، API integration Not Run. قبل الحفظ استبدل placeholder بأدلة حقيقية أو احذفه.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'الحزمة تشير إلى docs/ERD.md لكن الملف غير موجود. ماذا تفعل؟', options: ['تسجل المفقود والمالك والخطوة، أو تصلح الرابط بملف حقيقي.', 'تعلن التسليم مكتملاً.', 'تنسخ ERD من مشروع مختلف.'], correct: 0, explanation: 'المراجع يحتاج ملفاً واقعياً أو فجوة واضحة لا رابطاً متخيلاً.' },
      { objective: 2, prompt: 'نتيجة build تخص commit سابقاً. كيف تعرضها؟', options: ['تنسبها إلى النسخة الحالية.', 'تذكر commit والبيئة والتاريخ، وتعيد الفحص إذا احتجت دليلاً للحالي.', 'تحذف معلومات النسخة.'], correct: 1, explanation: 'النتيجة مرتبطة بالنسخة التي شُغلت عليها.' },
    ],
    outputs: [{ id: 'handoff-index', description: 'README وفهرس docs بروابط موجودة وإصدارات.' }, { id: 'handoff-evidence', description: 'تقرير فحوص وقيود ونتائج مرتبطة بcommit.' }],
    criteria: [
      { id: 'link-integrity', outputId: 'handoff-index', name: 'روابط صحيحة', description: 'الروابط إلى ملفات موجودة وصلاحية مشاركة قابلة للشرح.', evidencePrompt: 'أشر إلى رابط داخلي واحد وتحقق من هدفه.' },
      { id: 'test-provenance', outputId: 'handoff-evidence', name: 'مصدر نتيجة', description: 'النتيجة معها command/environment/commit/date/status.', evidencePrompt: 'أرفق صف نتيجة واحدة مع مصدرها وحدودها.' },
    ],
    reviewNote: 'راجع المؤلف نقطة بدء README وتسلسل الوثائق وصدق الادعاءات المرتبطة بالنسخة. السطر المثال معلّم placeholder ولا يمثل فحصاً فعلياً.',
  }),
  'project-demo-day': topic({
    slug: 'project-demo-day',
    objectives: ['ابنِ قصة عرض قصيرة حول مشكلة مستخدم ورحلة قابلة للإعادة وقرار موثق.', 'جهز fallback آمن وسمّه بوضوح، واربط ادعاءات الأثر بالدليل المتوفر.'],
    sections: [
      { id: 'inputs', heading: 'حدد الجمهور والنسخة', body: 'المدخل README ومخرجا الموضوع 56 handoff-index وhandoff-evidence، والنسخة المنشورة أو التشغيل المحلي والبيانات الآمنة. استخدم حالة الإصدار والأدلة كما سُجلت. اكتب الهدف والمدة والجمهور. لا تبدأ برسم معماري طويل ولا تدّع مقابلات أو عدد مستخدمين لم يُقَس.' },
      { id: 'example', heading: 'مثال محلول: طلب مورد', body: 'اعرض إضافة طلب واحد من حساب test ثم حالة مراجعته، واربط القرار بعقد API. وضح إذا المشهد mock أو live. إذا فشل الرابط، اعرض تسجيل الشاشة كبديل مسمى وليس كتفاعل مباشر.' },
      { id: 'exercise', heading: 'مهمة وبرومبت تدريب', body: 'برومبت: «استخدم README والأدلة الحالية فقط. اكتب مقدمة ومشهد رحلة وقراراً وقيداً، ووقت اختبار الرابط وخطة fallback. لا تخترع مقياساً أو مستخدماً». جرّب النص والبيانات قبل العرض، ثم صغ بطاقة portfolio.' },
    ],
    practicalSteps: [
      { id: 'talk-track', instruction: 'اكتب قصة المشكلة والحل والرحلة والقرار بوقت لكل مقطع.', expectedOutput: 'docs/DEMO_DAY_SCRIPT.md بحقائق مسندة إلى README أو قرار فعلي.' },
      { id: 'demo-check', instruction: 'شغّل الرحلة في نسخة العرض وبيانات آمنة ودوّن التاريخ والنسخة والنتائج.', expectedOutput: 'docs/DEMO_CHECKLIST.md يميز Passed وFailed وNot Run مع نقطة البداية.' },
      { id: 'fallback', instruction: 'جهز fallback واحداً يمكن الوصول إليه من دون سر، وحدد كيف تعرضه إذا انقطع الرابط.', expectedOutput: 'تسجيل/لقطة/تشغيل محلي بعلامة fallback ووقت آخر فحص.' },
    ],
    workedExample: { id: 'demo-story', title: 'مشهد واحد قابل للتكرار', context: 'نموذج حجز مورد ببيانات اختبار.', result: 'المشكلة: تعارض الحجز. المشهد: افتح يومين واختر موعداً، ثم أظهر rejection لحجز متزامن. دليل test موجود؛ الاستخدام الحقيقي ورضا المستخدم لم يُقَس.', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أي عرض يقنع المراجع بسلوك محدد؟', options: ['رحلة واحدة وخطواتها ونتيجتها على نسخة معلومة.', 'عرض لائحة تقنيات فقط.', 'ادعاء أن المنتج خدم 1000 مستخدم بلا مصدر.'], correct: 0, explanation: 'رحلة قابلة لإعادة الفحص أوضح من التقنيات أو أرقام بلا دليل.' },
      { objective: 2, prompt: 'انقطع الاتصال وتعرض فيديو تسجيل للرحلة. كيف تقدمه؟', options: ['كعرض حي.', 'كـ fallback مسجل مع ذكر أنه لا يتصل بالخدمة الآن.', 'كدليل أن الإنتاج يعمل.'], correct: 1, explanation: 'نوع الدليل وحالته يظلان واضحين للجمهور.' },
    ],
    outputs: [{ id: 'demo-script', description: 'نص عرض قصير لرحلة وقرار وقيود مع مصادر.' }, { id: 'demo-readiness', description: 'قائمة فحص نسخة وبيانات وروابط وخطة احتياط.' }],
    criteria: [
      { id: 'claim-evidence', outputId: 'demo-script', name: 'ادعاء له مصدر', description: 'المشكلة والسلوك والنتيجة تتبع دليلاً أو توصف كافتراض.', evidencePrompt: 'اختر جملة واحدة وأرفق المصدر الذي يدعمها.' },
      { id: 'fallback-label', outputId: 'demo-readiness', name: 'احتياط مفهوم', description: 'الاحتياط موسوم بالتسجيل أو الصورة أو التشغيل المحلي وتاريخه.', evidencePrompt: 'أرفق وصف fallback وأحدث وقت تحقق من نسخته.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين رحلة حية ولقطة fallback، وقيّد الأثر بما يقيسه الدليل. المشهد لا يختلق نتائج استخدام واقعي.',
  }),
  'project-portfolio-entry': topic({
    slug: 'project-portfolio-entry',
    objectives: ['اكتب بطاقة مشروع تصف حالته ومساهمتك الفردية والتعاون ومساعدة الأدوات بدقة.', 'ادعم نتيجة قابلة للقياس بطريقة ومصدر وعينة، أو صرح بأن الأثر لم يقس.'],
    sections: [
      { id: 'inputs', heading: 'اجمع الأثر قبل الصياغة', body: 'المدخل repo وREADME ومخرجا الموضوع 57 demo-script وdemo-readiness، وسجل مساهمات وQA ورابط/لقطة النسخة. استخدم حالة العرض والفجوات كما هي. تحقق من حقوق المشاركة ونظف البيانات والأسرار. فرّق بين prototype وlocal وpublished وبين ما صنعه الطالب وما شارك فيه.' },
      { id: 'example', heading: 'مثال محلول: مساهمة قابلة للتحديد', body: 'اكتب «نفذت نموذج الحجز في src/...، وراجعت سياسة الصلاحيات مع الفريق. العرض يستخدم fixtures؛ لم نقس الاستخدام بعد». لا تحول اجتياز اختبار محلي إلى ادعاء أثر تجاري أو نجاح مستخدم.' },
      { id: 'exercise', heading: 'مهمة كتابة ومراجعة', body: 'برومبت: «استخدم الأدلة المرفقة فقط. اكتب المشكلة ومساهمتي والقرار والنتائج والقيود. راجع كل رقم ورابط وادعاء عمل جماعي. إن لم يوجد قياس، اذكر ذلك. احذف أي بيانات خاصة». سلّم البطاقة وأدلة الروابط.' },
    ],
    practicalSteps: [
      { id: 'contribution-record', instruction: 'اكتب ما نفذته أنت وما شاركت فيه وما ساعدت به الأداة أو مساهم آخر.', expectedOutput: 'docs/PORTFOLIO_ENTRY.md فيه أسماء أجزاء وروابط commits قابلة للمشاركة.' },
      { id: 'outcome-proof', instruction: 'لكل نتيجة أرفق مصدر وطريقة ووقت وعينة، أو عبارة لم يُقَس.', expectedOutput: 'جدول claim/evidence/method/limit؛ لا نسبة أو رقم تخميني.' },
      { id: 'privacy-and-links', instruction: 'افحص روابط العرض والمستودع واللقطات وامسح بيانات شخصية أو سرية.', expectedOutput: 'قائمة رابط وحالة صلاحية مشاركة وتاريخ فحص، وخطوة إزالة لأي مرفق حساس.' },
    ],
    workedExample: { id: 'honest-portfolio-card', title: 'بطاقة نموذج غير منشور', context: 'مشروع فريق يعرض صوراً ببيانات ثابتة.', result: 'State=prototype, not published. Contribution: built filter UI and added empty-state test. Impact: not measured. Evidence: commit and screenshot from local run; API integration not run. (Replace paths with real artifacts before sharing.)', caseStudy: 'learner-project' },
    questions: [
      { objective: 1, prompt: 'أنجز فريق ميزة وأنت كتبت صفحة واحدة. أي صياغة عادلة؟', options: ['بنيت النظام بالكامل.', 'نفذت الصفحة المحددة ضمن فريق، واربطها بالcommit.', 'لا حاجة لذكر عمل الزملاء.'], correct: 1, explanation: 'المساهمة المحددة تمثل الواقع وتتيح للمراجع تتبعها.' },
      { objective: 2, prompt: 'تظهر اختباراتك محلياً لكن لا يوجد بحث مستخدم أو مقياس. ماذا تقول عن الأثر؟', options: ['حسّنت رضا المستخدمين 40%.', 'الاختبارات المحلية مرت؛ أثر المستخدم لم يقس.', 'أثبتت نجاح المنتج التجاري.'], correct: 1, explanation: 'دليل فحص البرمجية لا يساوي قياس أثر المستخدم.' },
    ],
    outputs: [{ id: 'portfolio-narrative', description: 'بطاقة مشكلة/حالة/مساهمة/قرار/قيود.' }, { id: 'portfolio-evidence-map', description: 'روابط وclaims وطريقة قياس أو تصريح غياب قياس.' }],
    criteria: [
      { id: 'contribution-accuracy', outputId: 'portfolio-narrative', name: 'حجم مساهمة صادق', description: 'الفردي والجماعي ومساعدة الأداة منفصلة ومسنودة.', evidencePrompt: 'اربط عبارة واحدة في البطاقة بملف أو commit وصلاحية مشاركته.' },
      { id: 'impact-method', outputId: 'portfolio-evidence-map', name: 'قياس قابل للفحص', description: 'أي أثر رقمي معه baseline/source/sample/method؛ وإلا يوصف بأنه غير مقاس.', evidencePrompt: 'أرفق خلية قياس كاملة أو الجملة التي تصرح بعدم القياس.' },
    ],
    reviewNote: 'راجع المؤلف الفرق بين مساهمة شخصية وأثر منتج، واشتراط خط أساس ووسيلة قياس لأي نسبة. المثال prototype توضيحي وليس سيرة أو إنجازاً فعلياً.',
  }),
};
