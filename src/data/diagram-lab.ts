import { getTopicBySlug } from '@/src/lib/topicRegistry.ts';

export type DiagramFamily = 'Mermaid' | 'PlantUML' | 'DBML';

export interface DiagramEditorInfo {
  name: string;
  url: string;
  badge: string;
  description: string;
}

export interface EngineBoundaryNotice {
  unsupportedReason: string;
  expectedErrorType: string;
  simulatedMermaidError: string;
  guidance: string;
}

export interface DiagramAlternativeSource {
  family: DiagramFamily;
  syntaxLabel: string;
  sourceCode: string;
  notes: string;
}

export interface DiagramLabItem {
  id: string;
  orderInLab: number;
  name: string;
  title: string;
  subtitle: string;
  category: 'behavior' | 'concept' | 'data' | 'architecture';
  categoryLabel: string;
  family: DiagramFamily;
  syntaxLabel: string;
  coreQuestion: string;
  purpose: string;
  whenToChoose: string[];
  sourceCode: string;
  alternativeSource?: DiagramAlternativeSource;
  editor: DiagramEditorInfo;
  supportsMermaidRender: boolean;
  engineBoundaryNotice?: EngineBoundaryNotice;
  topicSlug: string;
  expectedSequencePosition: number;
  stageName: string;
  inputDependencies: string[];
}

export const DIAGRAM_LAB_ITEMS: DiagramLabItem[] = [
  {
    id: 'user-flow',
    orderInLab: 1,
    name: 'User Flow',
    title: 'مخطط تدفق المستخدم (User Flow)',
    subtitle: 'تسلسل رحلة المستخدم ونقاط اتخاذ القرار ومسارات النجاح والفشل',
    category: 'behavior',
    categoryLabel: 'سلوك وتجربة المستخدم',
    family: 'Mermaid',
    syntaxLabel: 'Mermaid (flowchart TD)',
    coreQuestion: 'ماذا يفعل المستخدم وبأي ترتيب؟',
    purpose: 'توضيح المسار المتسلسل للخطوات التي يتخذها المستخدم لإنجاز هدف محدد في النظام، متضمناً نقاط التحقق والقرارات التفرعية (نعم/لا) ومسارات النجاح ومسارات الخطأ والاعتذار دون استباق تفاصيل الواجهات البرمجية.',
    whenToChoose: [
      'هل ترغب في توضيح وتدقيق تجربة المستخدم خطوة بخطوة قبل تصميم الشاشات في Stitch؟',
      'هل تحتاج لحسم نقاط القرار بوضوح، مع تحديد ما يحدث عند فشل التحقق أو نقص البيانات؟',
      'هل تبحث عن مخطط نصي خفيف يُصيّر مباشرة وسريع المراجعة داخل مستودع Git؟',
    ],
    sourceCode: `flowchart TD
    Start(["بدء: تصفح المعدات"]) --> CheckAuth{"هل الطالب معتمد؟"}
    CheckAuth -- نعم --> Browse["عرض الأجهزة المتاحة"]
    CheckAuth -- لا --> Login["توجيه لتسجيل الدخول"]
    Browse --> SelectItem["اختيار معدة وطلب استعارة"]
    SelectItem --> CheckStock{"هل المخزون متاح؟"}
    CheckStock -- نعم --> Submit["إرسال الطلب للمراجعة"]
    CheckStock -- لا --> ShowAlert["إشعار بعدم التوفر"]
    Submit --> Done(["انتظار اعتماد المعمل"])`,
    editor: {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid.live/',
      badge: 'محرر تفاعلي رسمي',
      description: 'محرر ويب لتصيير ومشاركة وتعديل كود Mermaid فورياً في المتصفح.',
    },
    supportsMermaidRender: true,
    topicSlug: 'user-flow-modeling',
    expectedSequencePosition: 8,
    stageName: 'الموضوع 08 · رحلة المستخدم وهندسة السلوك',
    inputDependencies: ['docs/PRD.md', 'تحديد نطاق MVP'],
  },
  {
    id: 'domain-model',
    orderInLab: 2,
    name: 'Domain Model',
    title: 'النموذج المفاهيمي لمجال العمل (Conceptual Domain Model)',
    subtitle: 'نمذجة كيانات ومفاهيم العمل الحقيقية وعلاقاتها بصورة مجردة دون تفاصيل قواعد البيانات',
    category: 'concept',
    categoryLabel: 'المفاهيم ومجال الأعمال',
    family: 'Mermaid',
    syntaxLabel: 'Mermaid (flowchart LR)',
    coreQuestion: 'ما مفاهيم العمل وعلاقاتها؟',
    purpose: 'استخراج مفاهيم العمل الحقيقية والكيانات المؤسسية (مثل الطالب، المعدة، فئة التصنيف، طلب الاستعارة، محضر التسليم) وتوثيق العلاقات المنطقية بينها، مع الحذر التام من تلويثها بمفاتيح الجداول الأجنبية (FK) أو أنواع بيانات قواعد البيانات.',
    whenToChoose: [
      'هل تحتاج إلى توحيد مصطلحات العمل ولغة الأعمال المشتركة بين أعضاء الفريق؟',
      'هل تريد بناء خريطة للمفاهيم قبل الانجرار لتصميم جداول SQL أو أنواع البيانات التقنية؟',
      'هل ترغب بمخطط مفاهيمي واضح يسبق تصميم ERD ويمنع الخلط بين المفهوم وجدول التخزين؟',
    ],
    sourceCode: `flowchart LR
    Student["الطالب (Student)"] -->|يطلب| LoanRequest["طلب الإعارة (Loan Request)"]
    Staff["مسؤول المعمل (Staff)"] -->|يعتمد ويسلّم| LoanRequest
    Category["تصنيف المعدات (Category)"] -->|يصنف| Equipment["المعدة (Equipment)"]
    LoanRequest -->|يحدد| Equipment
    LoanRequest -->|ينتج عنه| Handover["محضر التسليم (Handover)"]
    Handover -->|يختتم بـ| ReturnCheck["فحص الإرجاع (Return Check)"]
    ReturnCheck -->|يحدد حالة| Equipment`,
    editor: {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid.live/',
      badge: 'محرر تفاعلي رسمي',
      description: 'محرر Mermaid الرسمي لمعاينة العلاقات وتدفق الكيانات بصيغة flowchart LR.',
    },
    supportsMermaidRender: true,
    topicSlug: 'conceptual-domain-model',
    expectedSequencePosition: 9,
    stageName: 'الموضوع 09 · نمذجة مفاهيم الأعمال',
    inputDependencies: ['docs/PRD.md', 'مسار تدفق المستخدم User Flow'],
  },
  {
    id: 'use-case',
    orderInLab: 3,
    name: 'Use Case',
    title: 'مخطط حالات الاستخدام (Use Case Diagram)',
    subtitle: 'حصر فواعل النظام وحدود المنظومة وصلاحيات الأدوار مع علاقات include وextend',
    category: 'architecture',
    categoryLabel: 'الصلاحيات والحدود الهندسية',
    family: 'PlantUML',
    syntaxLabel: 'PlantUML (@startuml)',
    coreQuestion: 'من المستخدم وما الذي يحق له فعله؟',
    purpose: 'تحديد حدود النظام (System Boundary)، والفواعل الخارجية (Actors) كالمستفيد والمشرف، وحالات الاستخدام الأساسية المستمدة من PRD مع صياغة العلاقات الإلزامية (<<include>>) والامتدادية (<<extend>>)، لمنع قيام أي دور بإجراءات غير مرخصة.',
    whenToChoose: [
      'هل تحتاج لحصر صلاحيات الأدوار المتباينة (طالب مقابل مسؤول معمل) وحدود النظام بدقة؟',
      'هل تريد توثيق الشروط الإلزامية مثل التحقق من الأهلية قبل السماح بالاستعارة؟',
      'هل تبحث عن امتثال صارم لمعيار OMG UML 2.x وتفادي تشوه الرسوم في الأنظمة الكبيرة؟',
    ],
    sourceCode: `@startuml
left to right direction
skinparam packageStyle rectangle

actor "طالب (Student)" as Student
actor "مسؤول المعمل (Staff)" as Staff

rectangle "نظام BorrowHub" {
  usecase "تصفح كتالوج المعدات" as UC_Browse
  usecase "تقديم طلب استعارة" as UC_Request
  usecase "التحقق من أهلية الحساب" as UC_Verify
  usecase "مراجعة واعتماد الطلب" as UC_Approve

  UC_Request ..> UC_Verify : <<include>>
}

Student --> UC_Browse
Student --> UC_Request
Staff --> UC_Approve
@enduml`,
    editor: {
      name: 'PlantText Interactive Editor',
      url: 'https://www.planttext.com/',
      badge: 'محرر PlantUML المعتمد',
      description: 'المحرر التفاعلي المعتمد لمعاينة وتصيير كود PlantUML وتصدير صور PNG/SVG.',
    },
    supportsMermaidRender: false,
    engineBoundaryNotice: {
      unsupportedReason: 'صيغة PlantUML تتطلب بيئة تشغيل Java ومحرك Graphviz لتخطيط العقد، ولا يدعمها محرك Mermaid.js المعتمد على المتصفح.',
      expectedErrorType: 'Syntax Parse Error (تعطل صياغي)',
      simulatedMermaidError: `Parse error on line 1:
@startuml
^
Expecting 'SPACE', 'GRAPH', 'flowchart', 'sequenceDiagram', 'classDiagram', got '@'`,
      guidance: 'يُعرض هذا المخطط بمصدره الصافي ويُفتح في محرر PlantText المخصص، وتجنب محاولة تشغيله داخل محرك Mermaid لئلا يتعطل العارض.',
    },
    topicSlug: 'use-case-diagram',
    expectedSequencePosition: 11,
    stageName: 'الموضوع 11 · صلاحيات الأدوار والحدود الهندسية',
    inputDependencies: ['docs/PRD.md', 'تحديد أدوار المستخدمين وصلاحياتهم'],
  },
  {
    id: 'activity',
    orderInLab: 4,
    name: 'Activity',
    title: 'مخطط النشاط وسير العمليات (Activity Diagram)',
    subtitle: 'نمذجة المنطق الإجرائي والمسارات المتفرعة والشروط التشغيلية وقواعد العمل',
    category: 'behavior',
    categoryLabel: 'المنطق الإجرائي وسير العمليات',
    family: 'Mermaid',
    syntaxLabel: 'Mermaid (flowchart TD - Activity Style)',
    coreQuestion: 'ما سير العملية وقراراتها؟',
    purpose: 'نمذجة المنطق الإجرائي المتسلسل لعملية تشغيلية دقيقة (مثل دورة استعارة أصل وفحصه)، وتوضيح بوابات القرار المتعددة، وشروط الحراسة، ومسارات النجاح والرفض وتحميل الغرامات.',
    whenToChoose: [
      'هل تواجه عملية عمل معقدة تعتمد على قيود متعددة (مثل سقف إعارتين نشطتين والتحقق من التلف)؟',
      'هل تحتاج إلى رسم تفرعات القرار الإجرائي بدقة لتوجيه مطوري الـ Backend في كتابة الخدمات؟',
      'هل تريد بيان الخطوات البديلة للتعامل مع نفاد المخزون أو انقضاء مهلة الاستلام؟',
    ],
    sourceCode: `flowchart TD
    Start(["بدء: طلب إعارة"]) --> CheckLimit{"الإعارات النشطة < 2؟"}
    CheckLimit -- لا --> RejectLimit["رفض: تجاوز الحد الأقصى"] --> End(["نهاية"])
    CheckLimit -- نعم --> CheckStock{"المعدة متوفرة؟"}
    CheckStock -- لا --> RejectStock["رفض: غير متوفرة"] --> End
    CheckStock -- نعم --> Approve{"موافقة المسؤول؟"}
    Approve -- لا --> RejectStaff["رفض مع بيان السبب"] --> End
    Approve -- نعم --> Handover["تسليم المعدة وتفعيل الإعارة"]
    Handover --> ReturnCheck{"فحص الإرجاع: سليمة؟"}
    ReturnCheck -- لا --> Fine["تسجيل تلف وغرامة"] --> Restock["إعادة للمخزون"]
    ReturnCheck -- نعم --> Restock --> Success(["تمت بنجاح"])`,
    editor: {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid.live/',
      badge: 'محرر تفاعلي رسمي',
      description: 'محرر Mermaid الرسمي لمعاينة المخططات الإجرائية وتفرعات القرارات.',
    },
    supportsMermaidRender: true,
    topicSlug: 'activity-diagram',
    expectedSequencePosition: 12,
    stageName: 'الموضوع 12 · سير العمليات والمنطق الإجرائي',
    inputDependencies: ['قواعد العمل Business Rules (القاعدة 3 و8)', 'User Flow'],
  },
  {
    id: 'sequence',
    orderInLab: 5,
    name: 'Sequence',
    title: 'مخطط تسلسل التفاعلات (Sequence Diagram)',
    subtitle: 'التفاعل الزمني الدقيق وترتيب تبادل الرسائل بين الفواعل والخدمات وقاعدة البيانات',
    category: 'behavior',
    categoryLabel: 'النمذجة السلوكية والديناميكية',
    family: 'Mermaid',
    syntaxLabel: 'Mermaid (sequenceDiagram)',
    coreQuestion: 'من يرسل ماذا ولمن وبأي ترتيب؟',
    purpose: 'توثيق التفاعل الزمني الدقيق بين المستخدم، وواجهة التطبيق، وخدمة المنطق (Service)، ومخزن البيانات (Database) لحالات الاستخدام الأساسية، وتحديد نقاط الفحص والتحديثات الذرية مع الترقيم الآلي.',
    whenToChoose: [
      'هل تريد تدقيق بروتوكول تبادل الرسائل واستدعاءات API بين الطبقات البرمجية؟',
      'هل تحتاج لحسم الترتيب الزمني الدقيق للاستعلامات الذرية وحماية المخزون من حالات السباق؟',
      'هل ترغب في توفير المدخلات السلوكية التي ستحدد دوال ومناهج الكلاسات في Class Diagram؟',
    ],
    sourceCode: `sequenceDiagram
    autonumber
    actor Student as طالب (Student)
    participant App as تطبيق الويب (App)
    participant Service as خدمة الإعارة (Service)
    participant DB as قاعدة البيانات (DB)

    Student->>App: طلب استعارة معدة
    App->>Service: submitRequest(userId, itemId)
    Service->>DB: فحص حد الاستعارات (< 2)
    DB-->>Service: عدد الاستعارات النشطة = 1
    Service->>DB: حجز ذري لرصيد المخزون
    DB-->>Service: تم الحجز بنجاح
    Service-->>App: اعتماد الطلب (status: APPROVED)
    App-->>Student: إشعار بنجاح الحجز ومهلة الاستلام`,
    editor: {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid.live/',
      badge: 'محرر تفاعلي رسمي',
      description: 'يدعم محرر Mermaid الترقيم الآلي autonumber ومخططات التسلسل بالكامل.',
    },
    supportsMermaidRender: true,
    topicSlug: 'sequence-diagram-modeling',
    expectedSequencePosition: 16,
    stageName: 'الموضوع 16 · التفاعلات الزمنية والرسائل',
    inputDependencies: ['حالات الاستخدام Use Cases', 'تصميم قاعدة البيانات ERD'],
  },
  {
    id: 'state',
    orderInLab: 6,
    name: 'State',
    title: 'مخطط الحالات ودورة حياة الكيانات (State Diagram)',
    subtitle: 'تتبع دورة حياة السجل الحيوي من البداية حتى الإنهاء وضبط أحداث الانتقال',
    category: 'behavior',
    categoryLabel: 'النمذجة السلوكية ودورة الحياة',
    family: 'Mermaid',
    syntaxLabel: 'Mermaid (stateDiagram-v2)',
    coreQuestion: 'ما حالات الكائن ومتى تتغير؟',
    purpose: 'ضبط الحالات المسموحة للكيانات المحورية (مثل طلب الاستعارة)، وتحديد الأحداث المحفزة (Triggers) والشروط الحارسة [Guards]، ومنع اختراع حالات وهمية لا تنعكس في حقل status في قاعدة البيانات.',
    whenToChoose: [
      'هل يمر الكيان البرمجي بحالات تشغيلية متتالية (مسودة، معتمد، نشط، متأخر، مرتجع)؟',
      'هل تحتاج لمنع الانتقالات غير القانونية (مثل تسليم معدة لطلب ملغى أو مرفوض)؟',
      'هل تريد التأكد من مطابقة حالات المخطط لقيد CHECK الخاص بحقل status في جدول البيانات؟',
    ],
    sourceCode: `stateDiagram-v2
    [*] --> Draft: إنشاء الطلب
    Draft --> Submitted: إرسال الطلب [أهلية معتمدة]
    Draft --> Cancelled: إلغاء المسودة
    Submitted --> Approved: موافقة المشرف [المخزون متاح]
    Submitted --> Rejected: رفض المشرف [مع السبب]
    Approved --> Active: تسليم المعدة [مهلة 48 ساعة]
    Approved --> Cancelled: انقضاء المهلة دون استلام
    Active --> Returned: إرجاع وفحص المعدة
    Active --> Overdue: تجاوز تاريخ الاستحقاق
    Overdue --> Returned: إرجاع متأخر مع تسوية
    Returned --> [*]
    Rejected --> [*]
    Cancelled --> [*]`,
    editor: {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid.live/',
      badge: 'محرر تفاعلي رسمي',
      description: 'محرر Mermaid الرسمي لمعاينة الحالات والانتقالات بصيغة stateDiagram-v2.',
    },
    supportsMermaidRender: true,
    topicSlug: 'state-diagram',
    expectedSequencePosition: 13,
    stageName: 'الموضوع 13 · دورة حياة الكيانات',
    inputDependencies: ['وثيقة المتطلبات PRD', 'قواعد العمل وحالات السجلات'],
  },
  {
    id: 'class',
    orderInLab: 7,
    name: 'Class',
    title: 'مخطط الكلاسات البرمجية (Class Diagram)',
    subtitle: 'التصميم الكائني للبنية البرمجية، الخصائص والدوال ومحددات الوصول والعلاقات',
    category: 'architecture',
    categoryLabel: 'التصميم الكائني والمعماري',
    family: 'Mermaid',
    syntaxLabel: 'Mermaid (classDiagram)',
    coreQuestion: 'ما الكلاسات وعلاقاتها التصميمية؟',
    purpose: 'هيكلة البنية الكائنية البرمجية للكود وتحديد الخصائص وأنواعها والدوال ومحددات الوصول (+/-) وعلاقات الوراثة والتجميع؛ مع الالتزام بأن مدخلاته المعمارية تستند إلى ERD (لهيكل البيانات) وSequence (لاستدعاءات العمليات).',
    whenToChoose: [
      'هل انتقلت لمرحلة التصميم البرمجي للكود وتريد تنظيم الطبقات والخدمات ودوالها؟',
      'هل تتوفر لديك بالفعل مخرجات ERD وSequence التي تمثل المدخلات الأساسية لبناء الكلاسات؟',
      'هل تريد تحديد مسؤوليات الدوال (Methods) والتأكد من إمكانية فحصها بالاختبارات الأحادية؟',
    ],
    sourceCode: `classDiagram
    class User {
        +UUID id
        +String fullName
        +canBorrow() bool
    }
    class Equipment {
        +UUID id
        +String name
        +int availableCount
        +isAvailable() bool
    }
    class LoanRequest {
        +UUID id
        +LoanStatus status
        +approve(adminId) void
    }
    User "1" --> "*" LoanRequest : submits
    Equipment "1" --> "*" LoanRequest : reserved_in`,
    editor: {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid.live/',
      badge: 'محرر تفاعلي رسمي',
      description: 'تصيير فوري لمخططات classDiagram مع تفاصيل الخصائص والدوال والعلاقات.',
    },
    supportsMermaidRender: true,
    topicSlug: 'class-diagram-design',
    expectedSequencePosition: 17,
    stageName: 'الموضوع 17 · التصميم الكائني والمعماري',
    inputDependencies: ['مخطط ERD (لهيكلة البيانات)', 'مخطط Sequence (لتحديد الدوال والاستدعاءات)'],
  },
  {
    id: 'erd',
    orderInLab: 8,
    name: 'ERD',
    title: 'مخطط العلاقات بين الكيانات (Relational ERD & DBML)',
    subtitle: 'هندسة جداول قاعدة البيانات والمفاتيح الأساسية والأجنبية والقيود ومعادلة المخزون',
    category: 'data',
    categoryLabel: 'هندسة ونمذجة قواعد البيانات',
    family: 'DBML',
    syntaxLabel: 'DBML (Database Markup Language)',
    coreQuestion: 'كيف تنظم بيانات النظام وجداولها؟',
    purpose: 'تصميم الجداول وقواعد البيانات العلائقية، وتحديد المفاتيح الأساسية (PK) والخارجية (FK)، وتطبيق قواعد التطبيع (3NF)، والتأكد من سلامة المراجع ومعادلة المخزون الذرية، مع توفير صيغة DBML لمحرر dbdiagram.io وصيغة erDiagram لـ Mermaid.',
    whenToChoose: [
      'هل تصمم الجداول الفعلية لحفظ السجلات في PostgreSQL أو MySQL؟',
      'هل تحتاج لتوليد كود SQL DDL تفاعلياً ومشاركته بصرياً مع الفريق؟',
      'هل ترغب بضبط القيود (Unique, Check, Not Null) ومعادلات الأرصدة الذرية؟',
    ],
    sourceCode: `Table users {
  id uuid [pk]
  full_name varchar [not null]
  email varchar [unique, not null]
  role varchar [not null]
}

Table equipment {
  id uuid [pk]
  name varchar [not null]
  available_count int [not null, default: 0]
}

Table loan_requests {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  equipment_id uuid [ref: > equipment.id]
  status varchar [not null, default: 'PENDING']
}`,
    alternativeSource: {
      family: 'Mermaid',
      syntaxLabel: 'Mermaid (erDiagram)',
      sourceCode: `erDiagram
    users ||--o{ loan_requests : "submits"
    equipment ||--o{ loan_requests : "reserved_in"
    users {
        uuid id PK
        string full_name "NOT NULL"
        string role "NOT NULL"
    }
    equipment {
        uuid id PK
        string name "NOT NULL"
        int available_count "NOT NULL"
    }
    loan_requests {
        uuid id PK
        uuid user_id FK
        uuid equipment_id FK
        string status "NOT NULL"
    }`,
      notes: 'صيغة Mermaid erDiagram المكافئة للتوثيق المباشر داخل ملفات Markdown في المستودع.',
    },
    editor: {
      name: 'dbdiagram.io Database Designer',
      url: 'https://dbdiagram.io/',
      badge: 'محرر DBML المعتمد',
      description: 'المحرر التفاعلي الرائد لنمذجة وتصميم قواعد البيانات وتصدير أوامر SQL DDL.',
    },
    supportsMermaidRender: false,
    engineBoundaryNotice: {
      unsupportedReason: 'لغة DBML صُممت خصيصاً لمحرر dbdiagram.io وليست صيغة مدعومة في محرك Mermaid.js.',
      expectedErrorType: 'Syntax Parse Error (تعطل صياغي)',
      simulatedMermaidError: `Parse error on line 1:
Table users {
^
Expecting 'SPACE', 'GRAPH', 'flowchart', 'sequenceDiagram', 'erDiagram', got 'Table'`,
      guidance: 'يُفتح كود DBML داخل محرر dbdiagram.io المخصص للاستفادة من سحب الجداول وتصدير SQL DDL، أو يُستخدم كود Mermaid erDiagram المكافئ.',
    },
    topicSlug: 'relational-erd-design',
    expectedSequencePosition: 14,
    stageName: 'الموضوع 14 · نمذجة قواعد البيانات',
    inputDependencies: ['النموذج المفاهيمي Domain Model', 'User Flow', 'قواعد العمل'],
  },
];

/**
 * Returns all 8 lab items
 */
export function getAllDiagramLabItems(): DiagramLabItem[] {
  return DIAGRAM_LAB_ITEMS;
}

/**
 * Returns single lab item by ID
 */
export function getDiagramLabItemById(id: string): DiagramLabItem | undefined {
  return DIAGRAM_LAB_ITEMS.find((item) => item.id === id);
}

/**
 * Resolves the published topic for a diagram item from the topic registry.
 * Validates publication status and provides honest fallback if absent.
 */
export function resolveDiagramTopicLink(item: DiagramLabItem) {
  const topic = getTopicBySlug(item.topicSlug);
  if (!topic) {
    return {
      isAvailable: false,
      title: item.stageName,
      slug: item.topicSlug,
      sequencePosition: item.expectedSequencePosition,
      url: '#',
      statusText: 'الموضوع قيد الإعداد في المسار (مغلق مؤقتاً)',
    };
  }

  return {
    isAvailable: true,
    title: topic.title,
    slug: topic.slug,
    sequencePosition: topic.sequencePosition ?? item.expectedSequencePosition,
    url: `/learn/${topic.slug}`,
    statusText: topic.publicationStatus === 'unified-complete' ? 'مسار موحد مكتمل ✓' : 'بانتظار استكمال التوحيد',
  };
}
