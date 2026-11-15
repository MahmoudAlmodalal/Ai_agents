/**
 * Prompt Template Engine & Scaffolding Interpolator (Issue #107)
 * Provides structured contracts and dynamic text replacement for the 9 student backend prompts.
 */

export interface ProjectVariables {
  projectName: string;
  domainSummary: string;
  targetUsers: string;
  coreEntities: string;
  stateEntity: string;
  appName: string;
}

export type ProjectVariableKey = keyof ProjectVariables;

export interface PromptTemplate {
  id: string;
  number: number;
  slug: string;
  titleAr: string;
  stageAr: string;
  goalAr: string;
  rawTemplate: string;
  requiredVariables: ProjectVariableKey[];
  allowedScopeTemplate?: string;
  forbiddenScopeTemplate?: string;
}

export const BORROWHUB_PRESET: ProjectVariables = {
  projectName: 'BorrowHub',
  domainSummary: 'منصة لاستعارة وتأجير المعدات بين طلاب ومختبرات الجامعة وحل مشكلة ضياع العهد وتأخر الإرجاع.',
  targetUsers: 'مستعير (Borrower), مالك (Lender), مشرف (Admin)',
  coreEntities: 'مستخدمين، تصنيفات، معدات، طلبات استعارة',
  stateEntity: 'طلب الاستعارة (LoanRequest)',
  appName: 'loans',
};

export const CANDYLOZ_PRESET: ProjectVariables = {
  projectName: 'Candy Loz',
  domainSummary: 'متجر إلكتروني لبيع وتوصيل الحلويات مع سلة شراء ودفع إلكتروني وشحن وتتبع طلبات.',
  targetUsers: 'زبون (Customer), مدير المتجر (Manager), موظف الشحن (Staff)',
  coreEntities: 'أصناف، منتجات، مناطق توصيل، سلات، طلبات',
  stateEntity: 'الطلب (Order)',
  appName: 'orders',
};

export const VARIABLE_PLACEHOLDERS: Record<ProjectVariableKey, { tokens: string[]; labelAr: string; questionAr: string }> = {
  projectName: {
    tokens: ['[PROJECT_NAME]', '[اسم_مشروعك]'],
    labelAr: 'اسم المشروع',
    questionAr: 'ما هو اسم مشروعك البرمجي؟',
  },
  domainSummary: {
    tokens: ['[DOMAIN_SUMMARY]', '[فكرة_المشروع]'],
    labelAr: 'فكرة المشروع والمجال',
    questionAr: 'ما هي فكرة المشروع الأساسية والمشكلة التي يعالجها؟',
  },
  targetUsers: {
    tokens: ['[TARGET_USERS]', '[أدوار_المستخدمين]'],
    labelAr: 'أدوار المستخدمين',
    questionAr: 'من هم مستخدمو النظام وأدوارهم الأساسية في الواجهة الخلفية؟',
  },
  coreEntities: {
    tokens: ['[CORE_ENTITIES]', '[الكيانات_الأساسية]'],
    labelAr: 'الكيانات والجداول المركزية',
    questionAr: 'ما هي الجداول والكيانات الرئيسية في قاعدة البيانات؟',
  },
  stateEntity: {
    tokens: ['[STATE_ENTITY]', '[الكيان_صاحب_الحالات]'],
    labelAr: 'الكيان صاحب دورة الحياة',
    questionAr: 'ما هو الكيان المحوري الذي يمتلك آلة حالات ومعاملات متعددة؟',
  },
  appName: {
    tokens: ['[APP_NAME]', '[اسم_التطبيق]'],
    labelAr: 'اسم تطبيق Django',
    questionAr: 'ما هو اسم التطبيق الفرعي في Django المراد تنفيذه حالياً؟',
  },
};

export const STUDENT_BACKEND_PROMPTS: PromptTemplate[] = [
  {
    id: 'backend-01-phased-plan',
    number: 1,
    slug: 'prompt-01-phased-architecture-plan',
    titleAr: 'برومبت التخطيط الأولي وتقسيم المراحل',
    stageAr: 'استكشاف الباك إند والتخطيط المعماري',
    goalAr: 'توجيه الوكيل لقراءة مستندات الفرونت إند وتقسيم المشروع إلى 7 فيزات منطقية دون كتابة كود عشوائي.',
    requiredVariables: ['projectName', 'domainSummary', 'targetUsers'],
    rawTemplate: `أنت مهندس معماري أول للواجهة الخلفية (Senior Backend Architect).
أعمل على مشروع [PROJECT_NAME] في مجال [DOMAIN_SUMMARY] للمستخدمين [TARGET_USERS].
اقرأ وثائق مشروعي المتاحة في المستودع (خاصة PRD.md وعقود الواجهة الأمامية إن وُجدت).

المطلوب:
1. صياغة خطة تنفيذية شاملة للباك إند backend_plan.md مقسمة إلى مراحل متسلسلة (Phases):
   - التأسيس والمشتركات (Common Infrastructure).
   - المستخدمين والمصادقة والصلاحيات (Authentication & RBAC).
   - الكيانات الأساسية للمشروع (Core Domain Entities).
   - العمليات والمعاملات وآلة الحالات (Workflows & State Machines).
   - التغذية التجريبية (Data Seeding).
   - حزمة التحقق والاختبارات الآلية (Verification & QA).
2. الالتزام الصارم بمعمارية Django الطبقية:
   Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs
3. حدد في كل مرحلة: مسؤوليات النماذج، السياسات، استعلامات القراءة (Selectors)، الخدمات الذرية (Services)، والمسارات.
4. لا تكتب أي كود تنفيذي الآن؛ فقط وثق الخطة المعمارية وتوقف لانتظار مراجعتي واعتمادي.`,
  },
  {
    id: 'backend-02-erd-state-machine',
    number: 2,
    slug: 'prompt-02-erd-state-machine',
    titleAr: 'برومبت حسم قاعدة البيانات وتوليد مخطط العلاقات وآلة الحالات',
    stageAr: 'نمذجة البيانات والمعاملات',
    goalAr: 'مقارنة تثبت اختيار PostgreSQL، رسم مخطط Mermaid للجداول ببادئات فريدة، ورسم آلة الحالات لدورة حياة الكيان الرئيسي.',
    requiredVariables: ['projectName', 'coreEntities', 'stateEntity'],
    rawTemplate: `بصفتك مهندس بيانات أول (Senior Data Engineer) لمشروع [PROJECT_NAME]:
1. حلل متطلبات البيانات لنظام [PROJECT_NAME]، وقارن باختصار بين قواعد البيانات العلائقية SQL (PostgreSQL) وقواعد المستندات NoSQL، واشرح سبب اختيار PostgreSQL لمشروعي من حيث المعاملات المالية/التشغيلية (ACID)، وسلامة العلاقات (Foreign Keys)، وقفل التزامن (select_for_update).
2. أنشئ وثيقة ERD.md متضمنة مخطط Mermaid كامل لكافة الجداول والعلاقات [CORE_ENTITIES].
3. استخدم معرفات بادئة فريدة لكل جدول (مثل usr_*, item_*, req_*) لتسهيل التدقيق والربط.
4. حدد قيود السلامة (Unique, Check, Not Null) وسياسات الحذف المالي/التشغيلي الصارمة (RESTRICT مقابل Soft Delete).
5. ارسم مخطط آلة الحالات (State Machine) لدورة حياة الكيان الرئيسي [STATE_ENTITY] موضحاً شروط كل انتقال والحالات المغلقة نهائياً.`,
  },
  {
    id: 'backend-03-api-contracts',
    number: 3,
    slug: 'prompt-03-api-contracts',
    titleAr: 'برومبت صياغة وتوليد عقود الـ API ومطابقة الفرونت إند',
    stageAr: 'تصميم واجهات البرمجة (API Design)',
    goalAr: 'اشتقاق المسارات من الـ ERD والفرونت إند، وتوحيد التسمية بصيغة camelCase وغلاف الاستجابات الموحد ومصفوفة الصلاحيات.',
    requiredVariables: ['projectName', 'targetUsers'],
    rawTemplate: `أنت Backend API Designer لمشروع [PROJECT_NAME].
بناءً على وثيقة ERD.md ومتطلبات النظام:
1. أنشئ ملف API.md يوثق مسارات RESTful لجميع المستخدمين [TARGET_USERS].
2. اعتمد غلاف الاستجابة الموحد (Unified Response Envelope):
   - في حالة النجاح: { "success": true, "data": ..., "meta": ... }
   - في حالة الخطأ: { "success": false, "error": { "code": "...", "message": "...", "details": [...] } }
3. الزم جميع المدخلات والمخرجات بصيغة camelCase لمطابقة واجهة المستخدم مع الحفاظ على كود استجابة HTTP دقيق لكل عملية.
4. وثق مصفوفة الصلاحيات (RBAC Matrix): من يملك حق استدعاء كل Endpoint بحسب أدواره.`,
  },
  {
    id: 'backend-04-docker-supabase-env',
    number: 4,
    slug: 'prompt-04-docker-supabase-env',
    titleAr: 'برومبت تجهيز بيئة التشغيل السحابية والمحلية وحماية الأسرار',
    stageAr: 'البنية التحتية وحماية الأسرار',
    goalAr: 'ضبط بيئة Docker محلياً، ربط Supabase السحابي، وحظر تسريب الأسرار في Git.',
    requiredVariables: ['projectName'],
    rawTemplate: `أنت DevOps Engineer لمشروع [PROJECT_NAME] المبني بـ Django و PostgreSQL:
1. أنشئ ملف docker-compose.yml لتشغيل خادم PostgreSQL محلي ومخزن Redis لتوحيد بيئة عمل المطورين والوكلاء.
2. أنشئ قالب .env.example نظيف وموثق يوضح متغيرات التشغيل الآمنة، وكيفية الاتصال بقاعدة بيانات Supabase المدارة سحابياً عبر متغير DATABASE_URL ومكتبة dj-database-url، مع إعدادات JWT ومفاتيح التطبيق دون وضع أي أسرار حقيقية.
3. أنشئ ملف .gitignore صارم يحظر تماماً رفع .env، ملفات sqlite، مخلفات pycache، ومجلدات مساحات العمل المؤقتة (.worktrees/).`,
  },
  {
    id: 'backend-05-common-infrastructure',
    number: 5,
    slug: 'prompt-05-common-infrastructure',
    titleAr: 'برومبت بناء البنية المشتركة والمعالجة المركزية (apps/common)',
    stageAr: 'التأسيس البرمجي في Django',
    goalAr: 'بناء معالج الأخطاء الموحد، محولات camelCase التلقائية، ونظام الترقيم القياسي.',
    requiredVariables: ['projectName'],
    rawTemplate: `أنت Senior Django Developer لمشروع [PROJECT_NAME]:
1. أنشئ تطبيق المشتركات apps/common ليكون الأساس لجميع تطبيقات المشروع اللاحقة.
2. أنشئ معالج استثناءات مخصص custom_exception_handler يضمن إرجاع كافة الأخطاء (ValidationError, Http404, PermissionDenied, وغيرها) في الغلاف الموحد:
   { "success": false, "error": { "code": "...", "message": "...", "details": [...] } }
3. فعّل محول الأسماء التلقائي CamelCaseJSONRenderer و CamelCaseJSONParser لتحويل snake_case إلى camelCase والعكس تلقائياً.
4. أنشئ فئة ترقيم قياسية StandardResultsSetPagination تعيد البيانات مع بيانات الصفحات (page, limit, totalItems, totalPages).
5. لا تكتب أي منطق خاص بالميزات التجارية في هذا التطبيق.`,
  },
  {
    id: 'backend-06-layered-app',
    number: 6,
    slug: 'prompt-06-layered-app',
    titleAr: 'برومبت بناء تطبيق محدد بمعمارية Django الطبقية الصارمة',
    stageAr: 'تنفيذ ميزات التطبيق وعزل CQS',
    goalAr: 'منع الـ Fat Views وفصل استعلامات القراءة (Selectors) عن العمليات الذرية (Services) وقواعد العمل (Policies).',
    requiredVariables: ['projectName', 'appName'],
    allowedScopeTemplate: 'backend/apps/[APP_NAME]/\nbackend/apps/[APP_NAME]/tests/',
    forbiddenScopeTemplate: 'backend/config/\nbackend/apps/common/',
    rawTemplate: `أنت Senior Django Developer مكلف ببناء التطبيق [APP_NAME] لمشروع [PROJECT_NAME].
تلتزم إلزاماً صارماً بنمط المعمارية التالي:
Models → Policies → Permissions → Selectors → Services → Views → Serializers → URLs

المطلوب تنفيذه في [APP_NAME]:
1. النماذج في models.py: الحقول، القيود، والمفاتيح الأجنبية طبقاً لـ ERD.md.
2. المحددات في selectors.py: استعلامات القراءة فقط (CQS Read) مع تفعيل select_related و prefetch_related للقضاء على استعلامات N+1 (يُمنع منعاً باتاً أي تعديل أو كتابة داخل الـ Selectors).
3. الخدمات في services.py: كافة عمليات الإنشاء والتعديل والكتابة (CQS Write) داخل transaction.atomic() مع معالجة الاستثناءات وتطبيق أقفال select_for_update لمنع حالات السباق.
4. السياسات في policies.py: دوال بايثون نقية تفصل في إمكانية الإجراء منطقياً (معزولة تماماً عن كائنات الـ HTTP).
5. الصلاحيات في permissions.py: فحص هوية وأدوار المستخدمين عبر DRF.
6. الـ Views نحيفة تماماً (Thin Views): دورها التنسيق فقط واستدعاء الخدمة أو المحدد وتمرير النتيجة للـ Serializer.
7. تسجيل المسارات في urls.py وتفعيل المحول CamelCaseJSONRenderer.`,
  },
  {
    id: 'backend-07-seed-data',
    number: 7,
    slug: 'prompt-07-seed-data',
    titleAr: 'برومبت التغذية التجريبية السريعة بالبيانات الواقعية (seed_data)',
    stageAr: 'إعداد بيانات التطوير والاختبار',
    goalAr: 'إنشاء أمر إدارة في Django لتوليد حسابات وبيانات واقعية فورية لتجربة واجهة Next.js بأمان وبشكل متكرر (Idempotent).',
    requiredVariables: ['projectName', 'appName', 'coreEntities', 'targetUsers', 'stateEntity'],
    rawTemplate: `أنت Django Engineer لمشروع [PROJECT_NAME]:
1. أنشئ أمر إدارة مخصص في manage.py باسم seed_[APP_NAME] أو seed_data داخل apps/[APP_NAME]/management/commands/.
2. أنشئ بيانات واقعية منطقية لكيانات [CORE_ENTITIES] تشمل:
   - مستخدمين تجريبيين لكافة الأدوار [TARGET_USERS] بكلمة مرور موحدة واضحة للتطوير.
   - سجلات واقعية تمثل الكيان الرئيسي [STATE_ENTITY] في مختلف حالات آلة الحالات (مكتمل، ملغى، قيد الانتظار، نشط).
3. اجعل الأمر قابلاً لإعادة التشغيل بأمان (Idempotent) باستخدام update_or_create بحيث لا يضاعف السجلات عند تكراره.
4. اعرض ملخصاً مطبوعاً في الطرفية بما تم إنشاؤه من حسابات وبيانات.`,
  },
  {
    id: 'backend-08-automated-tests',
    number: 8,
    slug: 'prompt-08-automated-tests',
    titleAr: 'برومبت الاختبارات السلوكية الآلية للتحقق من سلامة المسارات والمعاملات',
    stageAr: 'ضمان الجودة والتحقق الآلي',
    goalAr: 'فحص استعلامات N+1، العمليات الذرية، انتقالات الحالات غير القانونية، ومصفوفة الصلاحيات (403 Forbidden).',
    requiredVariables: ['projectName', 'appName', 'stateEntity'],
    rawTemplate: `أنت QA & Test Automation Engineer لمشروع [PROJECT_NAME]:
1. اكتب حزمة اختبارات سلوكية لتطبيق [APP_NAME] داخل apps/[APP_NAME]/tests/.
2. غطِّ السيناريوهات التالية:
   - اختبار نجاح القراءة عبر الـ Selectors مع التأكد من عدم وجود استعلامات N+1.
   - اختبار نجاح عملية الكتابة الذرية عبر الـ Service داخل transaction.atomic().
   - اختبار رفض الانتقال غير القانوني في آلة الحالات لـ [STATE_ENTITY] وإرجاع كود الخطأ المناسب في الغلاف الموحد.
   - اختبار مصفوفة الصلاحيات: رفض وصول المستخدم غير المخول (403 Forbidden).
3. اعطني أمر الطرفية الدقيق لتشغيل هذه الاختبارات والتأكد من خروج النتيجة الخضراء (PASS).`,
  },
  {
    id: 'backend-09-independent-code-review',
    number: 9,
    slug: 'prompt-09-independent-code-review',
    titleAr: 'برومبت المراجع الكودي المستقل لفحص الكفاءة والتزامن والثغرات',
    stageAr: 'مراجعة الجودة قبل الاعتماد',
    goalAr: 'محاكاة مهندس برمجيات مستقل يراجع الكود بحثاً عن أخطاء الأداء والتزامن والأمان في سياق مستقل تماماً.',
    requiredVariables: ['projectName', 'appName', 'stateEntity'],
    rawTemplate: `أنت Principal Software Engineer تقوم بمراجعة كود الباك إند لمشروع [PROJECT_NAME] المبني بـ Django و PostgreSQL:
راجع كود تطبيق [APP_NAME] بدقة صارمة وركز على:
1. هل تحترم كل طبقة مسؤوليتها؟ (هل توجد استعلامات ORM داخل Views أو Serializers؟ هل هناك عمليات كتابة داخل Selectors؟).
2. هل كافة عمليات تعديل [STATE_ENTITY] محمية بـ transaction.atomic() وأقفال select_for_update؟
3. هل هناك أي استعلامات N+1 في استعلامات القراءة؟
4. هل استجابات الخطأ والنجاح تطابق الغلاف الموحد بصيغة camelCase؟
5. هل هناك أي أسرار أو كلمات مرور مكتوبة مباشرة داخل الكود؟
قدّم تقرير مراجعة بجدول يحتوي على: (الملف، السطر، المشكلة المكتشفة، والتصحيح المقترح).`,
  },
];

export interface RenderResult {
  rendered: string;
  missingVariables: ProjectVariableKey[];
  unreplacedTokens: string[];
}

/**
 * Pure function to render a prompt template with provided project variables.
 * Replaces both English tokens ([PROJECT_NAME]) and Arabic aliases ([اسم_مشروعك]).
 */
export function renderPrompt(
  template: PromptTemplate,
  variables: Partial<ProjectVariables>
): RenderResult {
  let rendered = template.rawTemplate;
  const missingVariables: ProjectVariableKey[] = [];

  // Check required variables
  for (const key of template.requiredVariables) {
    const val = variables[key];
    if (!val || typeof val !== 'string' || !val.trim()) {
      missingVariables.push(key);
    }
  }

  // Perform replacements for all known variables
  for (const [key, meta] of Object.entries(VARIABLE_PLACEHOLDERS) as [ProjectVariableKey, typeof VARIABLE_PLACEHOLDERS[ProjectVariableKey]][]) {
    const value = variables[key]?.trim();
    if (value) {
      for (const token of meta.tokens) {
        rendered = rendered.split(token).join(value);
      }
    }
  }

  // Also check if any allowed/forbidden scope templates are present and replace tokens there
  // Scan for any remaining known tokens that were not replaced
  const unreplacedTokens: string[] = [];
  for (const meta of Object.values(VARIABLE_PLACEHOLDERS)) {
    for (const token of meta.tokens) {
      if (rendered.includes(token)) {
        unreplacedTokens.push(token);
      }
    }
  }

  return {
    rendered,
    missingVariables,
    unreplacedTokens,
  };
}

/**
 * Convenience helper to render all 9 backend prompts at once.
 */
export function renderAllPrompts(variables: Partial<ProjectVariables>): { template: PromptTemplate; result: RenderResult }[] {
  return STUDENT_BACKEND_PROMPTS.map((template) => ({
    template,
    result: renderPrompt(template, variables),
  }));
}
