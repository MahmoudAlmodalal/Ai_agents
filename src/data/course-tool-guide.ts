export type ToolVerificationStatus = 'موثّق من مصدر رسمي' | 'اختياري' | 'لم يُختبر التثبيت';

export type ToolUsageStage =
  | 'اكتشاف المتطلبات'
  | 'التوثيق وإدارة الإصدارات'
  | 'النمذجة والمخططات'
  | 'التصميم'
  | 'نقل التصميم إلى الكود'
  | 'تنفيذ الفرونت إند'
  | 'وكيل التنفيذ';

export interface StageDecisionEntry {
  stage: ToolUsageStage;
  whenNeeded: string;
  tools: string[];
  skipCondition: string;
}

export const TOOL_USAGE_STAGES: ToolUsageStage[] = [
  'اكتشاف المتطلبات',
  'التوثيق وإدارة الإصدارات',
  'النمذجة والمخططات',
  'التصميم',
  'نقل التصميم إلى الكود',
  'تنفيذ الفرونت إند',
  'وكيل التنفيذ',
];

// Governed by docs/TOOLS_AND_REFERENCES_SPEC.md (Issue #80, Ticket #83)
export const STAGE_DECISION_TABLE: StageDecisionEntry[] = [
  {
    stage: 'اكتشاف المتطلبات',
    whenNeeded: 'عند بدء استكشاف فكرة المشروع وتحويلها إلى متطلبات ومسودة PRD وتحديد قرارات النطاق قبل أي كود.',
    tools: ['Grill Me', 'Google AI Studio'],
    skipCondition: 'إذا كانت متطلبات المشروع وقراراته موثقة ومحسومة مسبقًا في وثيقة PRD معتمدة، أو عند إجراء المقابلة واستخراج المتطلبات يدويًا دون أدوات.',
  },
  {
    stage: 'التوثيق وإدارة الإصدارات',
    whenNeeded: 'عند حفظ أول وثيقة في المشروع (PROJECT_CONTEXT.md أو PRD) لتتبع التعديلات محليًا وسحابيًا.',
    tools: ['Git', 'GitHub'],
    skipCondition: 'لا يُنصح بتخطي Git محليًا لحفظ تاريخ المشروع؛ ويمكن تأجيل المستودع البعيد (GitHub) إذا كان العمل فرديًا ومحليًا في البداية.',
  },
  {
    stage: 'النمذجة والمخططات',
    whenNeeded: 'بعد تحديد رحلة المستخدم وقواعد العمل، لرسم تدفق العمليات (User Flow) ونموذج البيانات (ERD) ومخططات التسلسل وحالات الاستخدام قبل كتابة الكود.',
    tools: ['Mermaid Live', 'PlantUML / PlantText', 'dbdiagram.io'],
    skipCondition: 'إذا كان تدفق العمليات وقواعد البيانات بسيطًا وبديهيًا وموثقًا نصيًا بوضوح كافٍ لا يحتاج تمثيلًا بصريًا، أو استُخدمت أداة رسم واحدة كافية.',
  },
  {
    stage: 'التصميم',
    whenNeeded: 'بعد إعداد UX Blueprint وجرد الشاشات، لإنشاء شاشة مرجعية ونموذج أولي تفاعلي (Prototype) يعتمد عليه كود الواجهة.',
    tools: ['Google Stitch'],
    skipCondition: 'إذا كان لديك تصميم معتمد ومكتمل مسبقًا بأداة أخرى، أو كان المشروع يعتمد مباشرة على مكتبة مكونات قياسية دون شاشات مخصصة.',
  },
  {
    stage: 'نقل التصميم إلى الكود',
    whenNeeded: 'بعد اعتماد التصميم وعند نقله إلى كود الفرونت لضمان ثبات الهوية البصرية والمتغيرات (tokens).',
    tools: ['Stitch MCP', 'DESIGN.md'],
    skipCondition: 'يمكن استخراج قيم التصميم وكتابة DESIGN.md يدويًا؛ ولا حاجة لـ Stitch MCP إذا كان النقل والتطابق يتمان يدويًا دون ربط آلي بالوكيل.',
  },
  {
    stage: 'تنفيذ الفرونت إند',
    whenNeeded: 'عند بدء بناء واجهة المستخدم وتثبيت إطار العمل وتنظيم خطة المكونات والمهام الذرية وفحص الجودة.',
    tools: ['Node.js + npm', 'Next.js', 'UI/UX Pro Max', 'GitHub Spec Kit', 'Python 3.11 + uv'],
    skipCondition: 'لا يمكن تخطي بيئة Node وNext.js لبناء الواجهة؛ ولكن يمكن تخطي الأدوات المساعدة الاختيارية (UI/UX Pro Max وSpec Kit وPython/uv) وتنظيم المهام يدويًا.',
  },
  {
    stage: 'وكيل التنفيذ',
    whenNeeded: 'عند بدء تنفيذ مهام كود الفرونت إند تدريجيًا بعد اعتماد النموذج الأولي؛ اختيار أداة واحدة يكفي.',
    tools: ['Antigravity CLI / IDE'],
    skipCondition: 'يمكن تخطي وكيل الذكاء الاصطناعي وكتابة كود المكونات والواجهات يدويًا بالكامل، أو استخدام أي محرر ومساعد بديل دون اشتراك مدفوع.',
  },
];

export interface CourseToolGuideEntry {
  name: string;
  stage: ToolUsageStage;
  reviewDate: string;
  purpose: string;
  timing: string;
  input: string;
  output: string;
  lifecycle: string;
  commonPitfall: string;
  workedExample: string;
  topic: string;
  source: string;
  command?: string;
  verification: string;
  verificationStatus: ToolVerificationStatus;
}

// Course reference section 12; source review evidence governed by docs/TOOLS_AND_REFERENCES_SPEC.md.
export const COURSE_TOOL_GUIDE: CourseToolGuideEntry[] = [
  {
    name: 'Grill Me',
    stage: 'اكتشاف المتطلبات',
    reviewDate: '2026-10-21',
    purpose: 'كشف المتطلبات بسؤال واحد في كل مرة؛ يمكن إجراء المقابلة يدويًا دون تثبيت.',
    timing: 'اكتشاف المتطلبات؛ إعداد المهارات داخل وكيل التنفيذ يؤجل لوقت كود الفرونت.',
    input: 'Project Brief وإجابات صاحب الفكرة',
    output: 'Decision Log يميز القرار والافتراض والسؤال المفتوح',
    lifecycle: 'أعد المقابلة عند غموض النطاق؛ لا تعتمد إجابات الوكيل بدل صاحب القرار.',
    commonPitfall: 'الاعتماد على إجابات الوكيل الافتراضية بدل إجابات صاحب القرار الحقيقي، مما يولد متطلبات وهمية.',
    workedExample: 'طرح سؤال واحد: "من المستخدم الأساسي للنظام وما المشكلة التي تحلها له؟" وتسجيل الإجابة في Decision Log قبل الانتقال للسؤال التالي.',
    topic: 'discovery-grill-me',
    source: 'https://github.com/mattpocock/skills',
    verification: 'مراجعة المصدر: راجعنا المستودع الرسمي؛ طريقة إضافة المهارة تختلف حسب الوكيل، وإعداد المهارات يؤجل إلى مرحلة كود الفرونت، لذلك لا نعرض هنا أمر تثبيت كأمر مضمون.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'Google AI Studio',
    stage: 'اكتشاف المتطلبات',
    reviewDate: '2026-10-21',
    purpose: 'تجربة مخرجات نماذج Google ومقارنتها، واستكشاف صياغة البرومبتات قبل اعتمادها.',
    timing: 'في مرحلة استكشاف المتطلبات وصياغة النماذج الأولية؛ أداة ويب لا تتطلب تثبيتًا محليًا.',
    input: 'سياق الفكرة، مسودة المتطلبات، أو برومبت تجريبي لاختبار صياغة الحقول',
    output: 'نتائج استجابات النماذج، ومسودة معايير القبول، ومقارنات بين أحجام النماذج',
    lifecycle: 'استخدمه للمقارنة وضبط البرومبتات السريعة؛ لا تعتمد مخرجاته دون مراجعة بشرية مقابل PRD.',
    commonPitfall: 'استهلاك سياق المحادثة دون تنظيم، أو الاعتماد على إجابات النموذج دون مراجعة بشرية للقرارات.',
    workedExample: 'تجربة برومبت استخراج قواعد العمل لـ BorrowHub ومقارنة مخرجات نموذجين على البرومبت نفسه قبل تثبيت الصياغة في وثيقة PRD.',
    topic: 'google-ai-studio',
    source: 'https://aistudio.google.com/',
    verification: 'مراجعة المصدر: توثيق Google الرسمي يؤكد الواجهة وإمكانية تجربة النماذج عبر الويب؛ لم نختبر حصص الاستخدام أو استدعاءات API المدفوعة.',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'Git',
    stage: 'التوثيق وإدارة الإصدارات',
    reviewDate: '2026-10-21',
    purpose: 'تتبع تاريخ تغييرات الملفات والوثائق محليًا وتسجيل التعديلات في سجل commits.',
    timing: 'عند حفظ أول وثيقة في المشروع (PROJECT_CONTEXT.md أو PRD)؛ ليس شرطًا لبدء التفكير بالفكرة.',
    input: 'ملفات docs وتغييرات صغيرة تمت مراجعتها وفحصها',
    output: 'سجل Commits محلي ومستودع منظم وفروع عمل واضحة',
    lifecycle: 'سجّل Commit بعد كل مخرج مكتمل ومراجع؛ لا تخلط عدة مهام في Commit واحد، واستبعد الأسرار عبر .gitignore.',
    commonPitfall: 'تسجيل ملفات الأسرار .env أو مجلدات الاعتماديات الضخمة مثل node_modules في المستودع لغياب ملف .gitignore.',
    workedExample: 'تهيئة المستودع وإضافة أول ملف توثيق: git init && git add docs/PROJECT_CONTEXT.md && git commit -m "docs: add initial project context".',
    topic: 'git-project-docs',
    source: 'https://git-scm.com/docs',
    verification: 'مراجعة المصدر: مرجع Git الرسمي يؤكد أوامر التهيئة والتتبع؛ اختر تعليمات التثبيت لنظام تشغيلك. لا نقدم أمر تثبيت موحدًا.',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'GitHub',
    stage: 'التوثيق وإدارة الإصدارات',
    reviewDate: '2026-10-21',
    purpose: 'استضافة المستودع البعيد والمراجعة الجماعية وإدارة القضايا والمهام وتأمين الأسرار.',
    timing: 'بعد تهيئة مستودع Git المحلي والرغبة في مزامنة العمل ومشاركته أو التعاون عليه.',
    input: 'مستودع Git محلي جاهز للدفع وحساب GitHub موثق',
    output: 'مستودع بعيد، مراجعات Pull Requests، وتتبع المهام عبر Issues',
    lifecycle: 'ادفع التغييرات بعد كل مرحلة مراجعة؛ احمِ الفرع الرئيسي وتأكد من خلو المستودع من المفاتيح السرية.',
    commonPitfall: 'دفع أسرار أو مفاتيح API إلى مستودع عام (Public Repo) دون تفعيل تنبيهات الأمان أو فحص مسبق.',
    workedExample: 'ربط المستودع المحلي بالمستودع البعيد ودفع الفرع الرئيسي: git remote add origin https://github.com/user/repo.git && git push -u origin main.',
    topic: 'github-docs-collaboration',
    source: 'https://github.com/',
    verification: 'مراجعة المصدر: راجعنا وثائق GitHub الرسمية لإدارة المستودعات البعيدة؛ لم نختبر حساب المتدرّب أو سياسات المؤسسات.',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'Mermaid Live',
    stage: 'النمذجة والمخططات',
    reviewDate: '2026-10-21',
    purpose: 'تحويل وصف نصي إلى User Flow ومخططات تسلسل وحالة وغيرها بصيغة كود قابل للتعديل.',
    timing: 'بعد تحديد رحلة المستخدم وقواعدها وقبل كتابة كود الواجهة.',
    input: 'نص Mermaid مستند إلى قواعد معتمدة وأدوار واضحة',
    output: 'مصدر مخطط نصي قابل للتعديل ومعاينة بصرية معاينة فورية',
    lifecycle: 'احفظ النص مع الوثائق في مجلد docs؛ أعد العرض والمراجعة بعد أي تعديل في السلوك.',
    commonPitfall: 'كتابة نصوص معقدة داخل العقد دون أقواس تنصيص مما يسبب خطأ في التحليل الصياغي للمحرك.',
    workedExample: 'رسم مسار تصفح واستعارة: flowchart TD; A[تصفح المعدات] --> B{مسجل؟}; B -- نعم --> C[طلب استعارة]; B -- لا --> D[تسجيل الدخول].',
    topic: 'mermaid-syntax',
    source: 'https://mermaid.js.org/intro/',
    verification: 'مراجعة المصدر: راجعنا أنواع المخططات في التوثيق الرسمي؛ المحرر التفاعلي: https://mermaid.live',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'PlantUML / PlantText',
    stage: 'النمذجة والمخططات',
    reviewDate: '2026-10-21',
    purpose: 'رسم حالات الاستخدام (Use Case) القياسية والأدوار وحدود النظام بنص برمجي.',
    timing: 'بعد تثبيت الأدوار والأهداف؛ أداة بديلة لمن يفضل صيغة PlantUML القياسية.',
    input: 'ملف PlantUML يحتوي Actors وUse Cases وحدود النظام',
    output: 'مصدر .puml ورسم حالات استخدام قياسي يوضح الصلاحيات',
    lifecycle: 'حدّث المصدر مع الصلاحيات؛ راجع نجاح العرض في المحرر قبل مشاركة الرسم.',
    commonPitfall: 'محاولة تشغيل كود @startuml داخل محرك Mermaid بدلاً من استخدام محرر PlantText المخصص.',
    workedExample: 'توصيف حالة استعارة: @startuml\nactor الطالب\nrectangle BorrowHub {\nالطالب --> (طلب استعارة معدة)\n}\n@enduml',
    topic: 'use-case-diagram',
    source: 'https://plantuml.com/use-case-diagram',
    verification: 'مراجعة المصدر: راجعنا صيغة Use Case الرسمية؛ المحرر الاختياري: https://www.planttext.com/',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'dbdiagram.io',
    stage: 'النمذجة والمخططات',
    reviewDate: '2026-10-21',
    purpose: 'معاينة نموذج الجداول والعلاقات المكتوب بلغة DBML كـ ERD تفاعلي.',
    timing: 'بعد تحليل البيانات وتحديد الكيانات وقبل إنشاء جداول حقيقية في قاعدة البيانات.',
    input: 'كود DBML بأسماء الجداول والمفاتيح الأساسية والأجنبية والقيود',
    output: 'مخطط ERD بصري ومصدر DBML محفوظ في الوثائق',
    lifecycle: 'راجع العلاقات والقيود مع الفريق؛ الرسم لا يثبت معالجة التزامن وقت التشغيل.',
    commonPitfall: 'إضافة حقول محاسبية معقدة أو منطق وقت التشغيل كحقول في الجداول قبل حسم المتطلبات.',
    workedExample: `تعريف جدول المعدات بلغة DBML:
Table equipment {
  id int [pk]
  name varchar
  status varchar
}`,
    topic: 'dbml-dbdiagram-io',
    source: 'https://dbml.dbdiagram.io/docs/',
    verification: 'مراجعة المصدر: راجعنا صيغة DBML الرسمية؛ المحرر: https://dbdiagram.io',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'Google Stitch',
    stage: 'التصميم',
    reviewDate: '2026-10-21',
    purpose: 'إنشاء شاشة مرجعية وتصميم تفاعلي انطلاقًا من احتياجات واضحة ووصف نصي.',
    timing: 'بعد UX Blueprint وجرد الشاشات، قبل تعميم التصميم وكتابة كود الواجهة.',
    input: 'وصف الشاشة والدور والحالات والمرجع البصري المعتمد',
    output: 'شاشة مرجعية ثم Prototype تتم مراجعته وتجربته',
    lifecycle: 'راجع الشاشة أولًا ثم عمم النظام؛ مخرجات التصميم ليست تطبيقًا متصلًا بالخادم.',
    commonPitfall: 'توليد شاشات عشوائية دون الاستناد إلى وثيقة SCREEN_INVENTORY.md المعتمدة.',
    workedExample: 'توليد شاشة تفاصيل المعدة لـ BorrowHub بوصف الحالات: متاحة، معارة، محجوزة، وتأكيد الهوية البصرية.',
    topic: 'stitch-reference-screen',
    source: 'https://stitch.withgoogle.com/',
    verification: 'مراجعة المصدر: رابط Google الرسمي؛ لم نختبر حسابًا أو حصص استخدام أو توليد تصميم فعلي على أجهزة الطلاب.',
    verificationStatus: 'موثّق من مصدر رسمي',
  },
  {
    name: 'Stitch MCP',
    stage: 'نقل التصميم إلى الكود',
    reviewDate: '2026-10-21',
    purpose: 'نقل بيانات التصميم من Stitch إلى وكيل التنفيذ مباشرة عبر بروتوكول MCP.',
    timing: 'وقت ربط التصميم بكود الفرونت، إذا اختار المتدرّب تفعيل الاتصال الآلي.',
    input: 'مشروع Stitch ومفتاح API في إعدادات آمنة داخل بيئة الوكيل',
    output: 'Design Metadata وقائمة الشاشات ومكونات التصميم المسترجعة',
    lifecycle: 'تحقق بطلب List my Stitch projects؛ راجع البيانات قبل توليد DESIGN.md ولا تحفظ المفتاح في Git.',
    commonPitfall: 'تخزين API Key في ملفات التوثيق docs أو رفعه إلى المستودع بدلاً من ضبطه في إعدادات البيئة الآمنة.',
    workedExample: 'استدعاء قائمة المشاريع من داخل الوكيل عبر MCP للتأكد من الاتصال واسترجاع معرف المشروع المطلوب.',
    topic: 'stitch-mcp-integration',
    source: 'https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch?hl=ar',
    verification: 'مراجعة المصدر: راجعنا دليل Google: API Key ثم MCP Store داخل IDE. لم نشغّل الاتصال؛ الواجهة والسياسة قد تتغيران.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'DESIGN.md',
    stage: 'نقل التصميم إلى الكود',
    reviewDate: '2026-10-21',
    purpose: 'مرجع بصري ثابت للقيم (tokens) وقواعد التطبيق يربط التصميم بكود الفرونت.',
    timing: 'بعد اعتماد التصميم وعند نقله إلى كود الفرونت لضمان ثبات الهوية.',
    input: 'tokens وألوان وقواعد الخطوط والفراغات من تصميم معتمد',
    output: 'ملف docs/DESIGN.md وتقرير فحص البنية والتنسيق',
    lifecycle: 'حدّث الملف مع كل تعديل في التصميم؛ نجاح أداة lint لا يثبت المطابقة البصرية التامة.',
    commonPitfall: 'تعديل الألوان يدويًا داخل كود المكونات بدلاً من الرجوع إلى المتغيرات المعتمدة في DESIGN.md.',
    workedExample: 'فحص اتساق ملف التوثيق البصري: npx @google/design.md lint DESIGN.md',
    topic: 'design-md-spec',
    source: 'https://github.com/google-labs-code/design.md',
    command: 'npx @google/design.md lint DESIGN.md',
    verification: 'مراجعة المصدر: صيغة lint مؤكدة من README الرسمي؛ لم ننفّذ الحزمة على جهاز الطالب.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'Node.js + npm',
    stage: 'تنفيذ الفرونت إند',
    reviewDate: '2026-10-21',
    purpose: 'بيئة تشغيل JavaScript ومدير الحزم لتثبيت وتشغيل أدوات الواجهة الحديثة ومشروع Next.js.',
    timing: 'عند بدء تنفيذ كود الفرونت بعد اعتماد التصميم؛ لا حاجة لها أثناء التفكير والتحليل.',
    input: 'نظام تشغيل مدعوم وحزمة التثبيت الرسمية (LTS)',
    output: 'بيئة تشغيل Node وأمر npm في الطرفية لإدارة الحزم والتشغيل',
    lifecycle: 'استخدم إصدار LTS نشط؛ راجع توافق إصدارات الحزم في package.json ولا تعدل ملف lock يدويًا.',
    commonPitfall: 'تثبيت إصدار قديم غير مدعوم من Node، فيفشل أمر إنشاء مشروع Next.js برسالة غامضة.',
    workedExample: 'التحقق من تثبيت بيئة التشغيل ومدير الحزم: node -v && npm -v',
    topic: 'nextjs-app-router',
    source: 'https://nodejs.org/',
    command: 'node -v && npm -v',
    verification: 'مراجعة المصدر: راجعنا متطلبات التشغيل في توثيق Node.js الرسمي؛ تحقق من تثبيت إصدار LTS المناسب لنظامك.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'Next.js',
    stage: 'تنفيذ الفرونت إند',
    reviewDate: '2026-10-21',
    purpose: 'بناء واجهة React تفاعلية بنظام App Router ودعم كامل لـ TypeScript وTailwind.',
    timing: 'عند بدء كود الفرونت بعد اعتماد النموذج الأولي؛ لا تثبيت مطلوب أثناء التحليل والتصميم.',
    input: 'خطة الواجهة FRONTEND_PLAN.md وDESIGN.md وجرد الشاشات',
    output: 'مشروع واجهة يعمل أولًا ببيانات تجريبية (Mock Data) دون خادم حقيقي',
    lifecycle: 'أنشئ مشروعًا جديدًا خارج مجلد عمل موجود؛ ثبّت إصداراته واختبر كل مهمة، فالإصدار latest يتغير باستمرار.',
    commonPitfall: 'إنشاء مشروع Next.js جديد داخل مجلد عمل يحتوي بالفعل مستودع Git أو ملفات أخرى.',
    workedExample: 'إنشاء هيكل تطبيق واجهة جديد: npx create-next-app@latest my-project --ts --tailwind --eslint --app --src-dir --use-npm',
    topic: 'nextjs-app-router',
    source: 'https://nextjs.org/docs/app/api-reference/cli/create-next-app',
    command: 'npx create-next-app@latest my-project --ts --tailwind --eslint --app --src-dir --use-npm',
    verification: 'مراجعة المصدر: الخيارات مؤكدة من مرجع create-next-app الرسمي؛ لم ننشئ مشروعًا أو نختبر متطلبات جهازك.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'UI/UX Pro Max',
    stage: 'تنفيذ الفرونت إند',
    reviewDate: '2026-10-21',
    purpose: 'مساعدة اختيار الأنماط ومراجعة إمكانية الوصول والتجاوب وتطابق المكونات مع المعايير.',
    timing: 'عند تخطيط كود الفرونت ومراجعة تنفيذه؛ أداة مساعدة اختيارية.',
    input: 'نظام التصميم، كود المكونات، وشروط القبول للمهام',
    output: 'ملاحظات قابلة للمراجعة وتحسينات مقترحة للتجاوب وإمكانية الوصول',
    lifecycle: 'راجع الاقتراحات مقابل DESIGN.md ولا تستبدل به قرارات التصميم المعتمدة في مشروعك.',
    commonPitfall: 'تطبيق تعديلات أنماط التصميم المقترحة آليًا دون التأكد من مطابقتها لـ DESIGN.md.',
    workedExample: 'تهيئة أداة الفحص للتكامل مع الوكيل: npx ui-ux-pro-max-cli init --ai antigravity',
    topic: 'ui-ux-pro-max-review',
    source: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    command: 'npx ui-ux-pro-max-cli init --ai antigravity',
    verification: 'مراجعة المصدر: README يؤكد CLI واسم التكامل antigravity وخيار npx؛ لم نختبر التثبيت. راجع الملفات التي سيضيفها.',
    verificationStatus: 'اختياري',
  },
  {
    name: 'GitHub Spec Kit',
    stage: 'تنفيذ الفرونت إند',
    reviewDate: '2026-10-21',
    purpose: 'تنظيم المواصفة والخطة والمهام الذرية وتتبع التنفيذ التدريجي للميزات.',
    timing: 'أثناء تخطيط وتنفيذ الفرونت إند بعد اكتمال المخرجات المعتمدة؛ لا يعيد التحليل من البداية.',
    input: 'مواصفة واضحة وخطة FRONTEND_PLAN.md وقرارات معتمدة',
    output: 'مهام ذرية بشروط قبول واضحة وتتبع دقيق بين الكود والمواصفة',
    lifecycle: 'راجع الملفات قبل التهيئة في مشروع قائم وخذ Git Commit؛ اختر تكامل الوكيل المناسب لإصدارك.',
    commonPitfall: 'تشغيل specify init في مستودع يحتوي تغييرات غير مسجلة (Uncommitted Changes) مما قد يسبب تعارضًا في الملفات.',
    workedExample: 'تثبيت أداة المواصفات كأداة معزولة عبر uv: uv tool install specify-cli',
    topic: 'spec-kit-workflow',
    source: 'https://github.com/github/spec-kit',
    command: 'uv tool install specify-cli',
    verification: 'مراجعة المصدر: README الرسمي يؤكد الأمر وPython 3.11+ وuv؛ أمر init ومفتاح التكامل يُراجعان في الدليل. لم نشغّل التثبيت أو Converge.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'Python 3.11 + uv',
    stage: 'تنفيذ الفرونت إند',
    reviewDate: '2026-10-21',
    purpose: 'بيئة تشغيل Python ومدير الحزم والأدوات السريع uv لتشغيل أدوات التطوير المعزولة مثل Spec Kit.',
    timing: 'عند الحاجة لتشغيل أدوات CLI المعتمدة على Python في مرحلة تنظيم وتخطيط الفرونت إند.',
    input: 'إصدار Python 3.11 أو أحدث مع أداة uv',
    output: 'بيئة تشغيل معزولة وأدوات CLI مثبتة بأمان دون تعارض مع النظام',
    lifecycle: 'استخدم uv tool لإدارة أدوات سطر الأوامر المستقلة؛ تحقق من الإصدار النشط في طرفيتك.',
    commonPitfall: 'تثبيت أدوات Python العامة عبر pip على مستوى النظام مباشرة بدلاً من استخدام بيئة معزولة أو uv tool.',
    workedExample: 'التحقق من تثبيت أداة uv وجاهزية البيئة: uv --version',
    topic: 'spec-kit-workflow',
    source: 'https://docs.astral.sh/uv/',
    command: 'uv --version',
    verification: 'مراجعة المصدر: راجعنا وثائق Astral الرسمية؛ تثبيت uv واستخدامه موثق عبر سكريبت التثبيت الرسمي. لم نختبر التثبيت على جهاز الطالب.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
  {
    name: 'Antigravity CLI / IDE',
    stage: 'وكيل التنفيذ',
    reviewDate: '2026-10-21',
    purpose: 'وكيل برمجة يقرأ ملفات المشروع وينفذ مهام كود محددة وفق الصلاحيات الممنوحة.',
    timing: 'عند بدء كود الفرونت بعد اعتماد Prototype؛ اختيار أداة واحدة يكفي.',
    input: 'وثائق معتمدة (PRD وDESIGN.md وFRONTEND_TASKS.md) ومهمة صغيرة محددة',
    output: 'تغييرات كود موثقة وأدلة فحص تتطلب مراجعة بشرية قبل اعتمادها',
    lifecycle: 'راجع diff واختبر محليًا ثم سجل Commit؛ إعداد CLI وIDE مختلفان.',
    commonPitfall: 'منح الوكيل صلاحيات تعديل واسعة دون مراجعة كل تغيير، أو تشغيله قبل حسم وثائق المتطلبات.',
    workedExample: 'تشغيل الوكيل لمراجعة ملف مهمة ذرية وتنفيذ شروط قبولها خطوة بخطوة.',
    topic: 'ai-coding-agent',
    source: 'https://antigravity.google/docs',
    verification: 'مراجعة المصدر: الصفحة الرسمية تحيل إلى getting-started. لم نتحقق من نص مثبت PowerShell؛ حُذف أمر التشغيل عن بُعد بدل وصفه بأنه محقق.',
    verificationStatus: 'لم يُختبر التثبيت',
  },
];
