import { TopicItem } from '@/src/types/topic.ts';

export type DiagramPerspective = 'architecture' | 'flow' | 'sequence';

export interface DiagramPerspectiveOption {
  id: DiagramPerspective;
  label: string;
  icon: string;
  description: string;
}

export const DIAGRAM_PERSPECTIVES: DiagramPerspectiveOption[] = [
  {
    id: 'architecture',
    label: 'بنية النظام',
    icon: '🏗️',
    description: 'المعمارية الهندسية، الطبقات، والحدود البنيوية بين المكونات',
  },
  {
    id: 'flow',
    label: 'مسار العمليات',
    icon: '🔄',
    description: 'خطوات العمل المتتابعة، نقاط اتخاذ القرار، ومسارات النجاح والفشل',
  },
  {
    id: 'sequence',
    label: 'تسلسل التفاعلات',
    icon: '⚡',
    description: 'التفاعل الزمني الدقيق وتبادل الرسائل بين الفواعل والأنظمة',
  },
];

// Tailored, verified high-fidelity Mermaid diagrams for each of the 12 roadmap topics
const PREBUILT_TOPIC_DIAGRAMS: Record<string, Record<DiagramPerspective, string>> = {
  'topic-01': {
    architecture: `flowchart TD
  subgraph AI_Engineering["منظومة هندسة الذكاء الاصطناعي المنضبطة"]
    Idea["استنطاق الفكرة<br/>(Idea Clarification)"] --> Specs["وثيقة المتطلبات<br/>(PRD.md & Tasks)"]
    Specs --> Context["إدارة السياق والرموز<br/>(Context & Token Budget)"]
    Context --> Permissions["قواعد الأذونات والحماية<br/>(Tool Permissions Gate)"]
    Permissions --> Execution["التنفيذ الهندسي الدقيق<br/>(Deterministic Code Run)"]
  end

  subgraph Hazards["مخاطر البرمجة التخمينية (Vibe Coding)"]
    Hallucination["الهلوسة وتخمين المتطلبات"]
    TokenBurn["استنزاف الـ Tokens والذاكرة"]
    DestructiveOps["عمليات غير مصرح بها على الملفات"]
  end

  Permissions -.->|يمنع| DestructiveOps
  Context -.->|يحجم| TokenBurn
  Idea -.->|يقضي على| Hallucination

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef secure fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  classDef risk fill:#881337,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2;
  class Permissions,Execution secure;
  class Hallucination,TokenBurn,DestructiveOps risk;`,

    flow: `flowchart LR
  A["1. استجواب الفكرة<br/>Grill Me"] --> B["2. وثيقة المتطلبات<br/>PRD.md"]
  B --> C["3. مسار المستخدم<br/>User Flow"]
  C --> D["4. النمذجة الهندسية<br/>Domain + Use Case"]
  D --> E["5. تحليل السلوك<br/>Activity / Seq / State"]
  E --> F["6. هيكلة البيانات<br/>ERD + Class Diagram"]
  F --> G["7. تصميم الواجهات<br/>Stitch & Tokens"]
  G --> H["8. جسر الكود<br/>Stitch MCP & DESIGN.md"]
  H --> I["9. بناء الفرونت إند<br/>Spec Kit & UI/UX"]
  I --> J["10. التحقق الشامل<br/>QA & GitHub Release"]

  classDef default fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#93c5fd;
  classDef highlight fill:#1d4ed8,stroke:#60a5fa,stroke-width:2px,color:#ffffff;
  class A,B,F,G,I highlight;
  class C,D,E,H,J default;`,

    sequence: `sequenceDiagram
  autonumber
  actor Engineer as المهندس (Engineer)
  participant Agent as وكيل الذكاء الاصطناعي (AI Agent)
  participant Gate as بوابة الأذونات (Permissions Gate)
  participant Runtime as بيئة التشغيل (Applet Runtime)

  Engineer->>Agent: طرح متطلب هندسي جديد
  Agent->>Agent: تحليل المتطلب والتحقق من وثيقة المتطلبات
  Agent->>Gate: طلب تنفيذ أمر قراءة أو تعديل ملفات
  Gate->>Engineer: إشعار بطلب الصلاحية وبيان الأثر
  Engineer-->>Gate: اعتماد الصلاحية (Approval)
  Gate->>Runtime: تفويض تشغيل الأداة
  Runtime-->>Agent: إرجاع النتيجة الفعلية مع سجلات الفحص
  Agent-->>Engineer: تقديم كود منضبط ومثبت بالتحقق الهندسي`,
  },

  'topic-02': {
    architecture: `flowchart TD
  subgraph PRD_Structure["هيكلية وثيقة متطلبات المنتج (PRD.md)"]
    Executive["الملخص التنفيذي<br/>Executive Summary"]
    Persona["شخصيات المستخدمين<br/>User Personas"]
    Scope["تحديد نطاق MVP<br/>Scope & Boundaries"]
    GWT["معايير القبول<br/>Given / When / Then"]
    EdgeCases["الحالات الحدية<br/>Edge Cases & Errors"]
  end

  subgraph ReviewEngine["المراجعة النقدية الاستقصائية"]
    GrillMe["استجواب Grill Me"] --> FlawDetection["كشف الثغرات والغموض"]
    FlawDetection --> Refinement["إحكام الشروط والمعايير"]
  end

  GrillMe --> PRD_Structure
  Refinement --> GWT
  Refinement --> EdgeCases

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef accent fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#f0fdf4;
  class GWT,Scope accent;`,

    flow: `flowchart TD
  DraftStart(["طرح مسودة فكرة المنتج"]) --> Interview["جلسة استجواب Grill Me الصارمة"]
  Interview --> ProbeScope{"هل حدود الـ MVP واضحة المعالم؟"}
  ProbeScope -- لا --> TrimScope["استبعاد الميزات الهامشية وتحديد النطاق الأدنى"]
  TrimScope --> Interview
  ProbeScope -- نعم --> FormatGWT["صياغة معايير القبول بصيغة Given/When/Then"]
  FormatGWT --> CheckEdges{"هل تم حصر كافة الحالات الحدية (Edge Cases)؟"}
  CheckEdges -- ناقصة --> IdentifyGaps["إضافة سيناريوهات الفشل وانقطاع الشبكة"]
  IdentifyGaps --> FormatGWT
  CheckEdges -- مكتملة --> FinalPRD["اعتماد وثيقة PRD.md كعقد هندسي ملزم"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class ProbeScope,CheckEdges decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor Founder as صاحب الفكرة (Product Owner)
  participant Architect as محاور الذكاء الاصطناعي (Grill Me AI)
  participant SpecDoc as وثيقة PRD.md
  participant DevTeam as فريق التطوير والتحقق

  Founder->>Architect: تقديم فكرة التطبيق الأولية
  loop الاستجواب الحازم
    Architect->>Founder: طرح 5 أسئلة جوهرية عن المستهدفين والحالات الحدية
    Founder-->>Architect: الإجابة وتوضيح المتطلبات الأساسية
  end
  Architect->>SpecDoc: توليد أقسام PRD وصياغة معايير Given/When/Then
  SpecDoc->>Architect: مراجعة نقدية لكشف أي تناقض أو غموض
  Architect->>DevTeam: تسليم وثيقة نهائية خالية من التخمين`,
  },

  'topic-03': {
    architecture: `flowchart TD
  subgraph UserExperienceMap["مخطط تجربة ومسار المستخدم (User Flow)"]
    Entrypoint["نقطة الدخول<br/>Landing / Deep Link"]
    AuthCheck{"التحقق من الهوية"}
    Dashboard["لوحة التحكم المركزية<br/>Main Dashboard"]
    ActionModal["نافذة الإجراء والعمليات<br/>Action Modal"]
    SuccessView["شاشة التأكيد والنجاح<br/>Success State"]
    ErrorView["معالجة الخطأ والاستعادة<br/>Error Recovery"]
  end

  Entrypoint --> AuthCheck
  AuthCheck -- مسجل --> Dashboard
  AuthCheck -- غير مسجل --> LoginFlow["شاشة تسجيل الدخول"]
  LoginFlow --> Dashboard
  Dashboard --> ActionModal
  ActionModal -->|تنفيذ سليم| SuccessView
  ActionModal -->|فشل الإدخال| ErrorView
  ErrorView --> ActionModal

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  classDef success fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  class AuthCheck decision;
  class SuccessView success;`,

    flow: `flowchart TD
  UserVisit(["المستخدم يفتح التطبيق"]) --> LoadCheck{"فحص حالة الجلسة المحلية"}
  LoadCheck -- صالحة --> ShowMain["عرض المواضيع النشطة والبحث السريع"]
  LoadCheck -- منتهية --> GuestView["عرض نمط الزائر مع إمكانية التصفح المحدود"]
  ShowMain --> ClickTopic["النقر على موضوع تقني محدد"]
  ClickTopic --> TrackView["تسجيل الموضوع في قائمة شوهدت مؤخراً"]
  TrackView --> OpenReader["فتح نافذة القراءة التفاعلية"]
  OpenReader --> ReadScroll["التمرير عبر المحتوى وتحديث مؤشر الإنجاز"]
  ReadScroll --> CloseOrNext{"هل تم اختيار التالي أم الإغلاق؟"}
  CloseOrNext -- التالي --> NextTopic["الانتقال للموضوع المجاور بسلاسة"]
  NextTopic --> TrackView
  CloseOrNext -- إغلاق --> BackToGrid["العودة إلى الشبكة الرئيسية"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class LoadCheck,CloseOrNext decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor User as المستخدم (User)
  participant UI as واجهة التطبيق (React UI)
  participant Storage as الذاكرة المحلية (localStorage)
  participant Modal as نافذة القراءة (TopicDetailModal)

  User->>UI: النقر على بطاقة الموضوع
  UI->>Storage: تخزين معرف الموضوع في شوهدت مؤخراً (Max 5)
  UI->>Modal: فتح النافذة وتهيئة شريط تقدم القراءة (0%)
  User->>Modal: التمرير للأسفل ومطالعة المحتوى
  Modal->>UI: تحديث النسبة المئوية للقراءة في الوقت الفعلي
  User->>Modal: الضغط على زر Esc أو السهم الأيسر للتنقل
  Modal->>UI: تفعيل الانتقال السلس للموضوع التالي`,
  },

  'topic-04': {
    architecture: `flowchart TD
  subgraph ArchitectureUML["حزمة المخططات المعمارية السبعة (The 7 UML Diagrams)"]
    DM["1. النموذج المفاهيمي<br/>(Domain Model)"]
    UC["2. حالات الاستخدام<br/>(Use Case Diagram)"]
    AD["3. سير العمليات والمسارات<br/>(Activity with Swimlanes)"]
    SD["4. التفاعل والتسلسل الزمني<br/>(Sequence Diagram)"]
    SM["5. دورة حياة الكيان<br/>(State Machine Diagram)"]
    CD["6. التصميم البنيوي للكلاسات<br/>(Class Diagram)"]
    C4["7. خريطة النشر والتوزيع<br/>(Deployment / Component)"]
  end

  DM --> UC
  UC --> AD
  AD --> SD
  SD --> SM
  SM --> CD
  CD --> C4

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef highlight fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#eff6ff;
  class SD,CD highlight;`,

    flow: `flowchart TD
  ReqPhase(["المتطلبات المعتمدة في PRD"]) --> Step1["رسم Domain Model لاستخراج الكيانات الجوهرية"]
  Step1 --> Step2["نمذجة Use Cases لتحديد أدوار الفواعل"]
  Step2 --> Step3["بناء Activity Diagram مع مسارات السباحة (Swimlanes)"]
  Step3 --> Step4["تفصيل Sequence Diagram لإبراز تبادل الرسائل الزمنية"]
  Step4 --> Step5["ضبط State Machine لدورات حياة الحالات والتحولات"]
  Step5 --> Step6["صياغة Class Diagram مع العلاقات (1:1, 1:N, N:M)"]
  Step6 --> Verified["حزمة معمارية متسقة جاهزة للترميز البرمجي"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;`,

    sequence: `sequenceDiagram
  autonumber
  actor User as المستخدم (Client)
  participant Gateway as بوابة الطلبات (API Gateway)
  participant Auth as خادم المصادقة (Auth Service)
  participant Core as المحرك المعماري (Core Service)
  participant DB as قاعدة البيانات (Database)

  User->>Gateway: إرسال طلب تنفيذ إجراء مع الرمز المميز
  Gateway->>Auth: التحقق من صحة التوقيع والصلاحيات
  Auth-->>Gateway: تأكيد الصلاحية (Authorized 200 OK)
  Gateway->>Core: تمرير حمولة الطلب المعالجة
  Core->>DB: استعلام تركيبي آمن ومعزول
  DB-->>Core: إرجاع السجلات المطلوبة
  Core-->>Gateway: صياغة الرد المعياري JSON
  Gateway-->>User: عرض النتائج بنجاح`,
  },

  'topic-05': {
    architecture: `flowchart TD
  subgraph DataLayer["هندسة البيانات وقواعد البيانات (ERD & Optimization)"]
    Users[("جدول المستخدمين<br/>users (PK: id)")]
    Orgs[("جدول المؤسسات<br/>organizations")]
    Topics[("جدول المواضيع<br/>topics (Index: category)")]
    Bookmarks[("جدول المفضلة<br/>bookmarks (FK: user_id, topic_id)")]
    Logs[("سجلات القراءة<br/>reading_logs (B-Tree: created_at)")]
  end

  Orgs -->|1:N| Users
  Users -->|1:N| Bookmarks
  Topics -->|1:N| Bookmarks
  Users -->|1:N| Logs

  subgraph Performance["تقنيات تحسين الأداء"]
    Index["فهارس B-Tree المركبة"]
    EagerLoad["Eager Loading بدلاً من N+1"]
    Normal3NF["تطبيع 3NF لمنع التكرار"]
  end

  Performance -.-> DataLayer

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef db fill:#0f766e,stroke:#14b8a6,stroke-width:2px,color:#ccfbf1;
  class Users,Topics,Bookmarks db;`,

    flow: `flowchart TD
  ReqData(["طلب عرض قائمة المواضيع مع المفضلة"]) --> QueryPlan{"هل الاستعلام يستخدم Lazy Loading؟"}
  QueryPlan -- نعم --> WarningNPlusOne["وقوع كارثة استعلامات N+1 (استعلام لكل صف!)"]
  WarningNPlusOne --> FixQuery["استخدام JOIN أو Eager Loading (Include) في استعلام موحد"]
  FixQuery --> QueryPlan
  QueryPlan -- لا (استعلام موحد) --> CheckIndex{"هل الحقول المبحوثة مفهرسة بفهرس B-Tree؟"}
  CheckIndex -- لا --> FullTableScan["فحص كامل للجدول وبطء شديد في الأداء"]
  FullTableScan --> AddIndex["إنشاء فهارس مركبة تغطي معايير البحث والترتيب"]
  AddIndex --> CheckIndex
  CheckIndex -- نعم --> FastExec["تنفيذ فوري بزمن استجابة أقل من 5ms"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  classDef alert fill:#881337,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2;
  class QueryPlan,CheckIndex decision;
  class WarningNPlusOne,FullTableScan alert;`,

    sequence: `sequenceDiagram
  autonumber
  actor App as خادم التطبيق (Backend Service)
  participant Cache as ذاكرة التخزين المؤقت (Redis)
  participant DB as قاعدة البيانات (PostgreSQL / SQL)

  App->>Cache: فحص وجود السجلات المخزنة مؤقتاً
  alt ذاكرة التخزين تحتوي على النتيجة (Cache Hit)
    Cache-->>App: إرجاع البيانات في 1ms
  else غير موجودة (Cache Miss)
    App->>DB: استعلام مفهرس عبر B-Tree مع JOIN موحد
    DB-->>App: استرجاع السجلات بزمن قياسي
    App->>Cache: تخزين النتيجة مع TTL محدد
  end
  App-->>App: إرسال البيانات للواجهة الأمامية`,
  },

  'topic-06': {
    architecture: `flowchart TD
  Client["متصفح العميل (React SPA)"] -->|HTTPS / Port 443| Nginx["الخادم العكسي وموزع الأحمال (Nginx)"]

  subgraph BackendArchitecture["هيكلية خادم التطبيقات (Backend Layers)"]
    Nginx --> Views["طبقة العرض والتحكم (Views / Controllers)"]
    Views --> Services["طبقة المنطق وقواعد العمل (Services Layer)"]
    Services --> Selectors["طبقة استعلام البيانات (Selectors Layer)"]
  end

  Services --> Cache[("ذاكرة التخزين المؤقت (Redis)")]
  Selectors --> DB[("قاعدة البيانات الأساسية (Postgres/SQL)")]
  Services --> Queue["طابور المهام في الخلفية (Background Queue)"]
  Queue --> Worker["معالجات المهام الثقيلة (Workers)"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef layer fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#eff6ff;
  class Views,Services,Selectors layer;`,

    flow: `flowchart TD
  UserReq(["طلب عملية شراء أو تصدير"]) --> Controller["استقبال الطلب والتحقق من صحة المدخلات"]
  Controller --> ServiceCall["تحويل الطلب إلى Service Layer لتطبيق قواعد العمل"]
  ServiceCall --> CheckCache{"هل البيانات محسوبة مسبقاً؟"}
  CheckCache -- نعم --> ReturnFast["إرجاع الرد الفوري من الذاكرة"]
  CheckCache -- لا --> NeedHeavyTask{"هل العملية تستغرق وقتاً طويلاً؟"}
  NeedHeavyTask -- نعم --> Enqueue["إدراج المهمة في طابور الخلفية وإرجاع 202 Accepted"]
  Enqueue --> WorkerRun["تنفيذ المهمة عبر Worker في الخلفية"]
  NeedHeavyTask -- لا --> DirectDB["تنفيذ فوري عبر Selector واسترجاع النتيجة"]
  DirectDB --> ReturnFast

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class CheckCache,NeedHeavyTask decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor Browser as المتصفح (Client)
  participant Nginx as خادم Nginx
  participant View as Controller
  participant Service as Service Layer
  participant Selector as Selector Layer
  participant DB as Database

  Browser->>Nginx: إرسال طلب POST لتعديل البيانات
  Nginx->>View: تمرير الطلب بعد إنهاء التشفير TLS
  View->>Service: التحقق من القواعد المنطقية (Business Logic)
  Service->>Selector: طلب قراءة وكتابة السجلات
  Selector->>DB: تنفيذ المعاملة الآمنة (ACID Transaction)
  DB-->>Selector: تأكيد نجاح العملية
  Selector-->>Service: البيانات المحدثة
  Service-->>View: صياغة النتيجة
  View-->>Browser: إرجاع الرد 200 OK للمتصفح`,
  },

  'topic-07': {
    architecture: `flowchart TD
  subgraph Repository["هيكلية مستودع المشروع وإدارة الإصدارات"]
    Docs["مجلد التوثيق /docs<br/>(PRD, Architecture, Flows)"]
    Src["مجلد الكود المصدري /src<br/>(Components, Utils, Pages)"]
    EnvSec["حماية ملفات السرية<br/>(.gitignore, .env.example)"]
    CI["أنابيب الفحص الآلي<br/>(GitHub Actions CI/CD)"]
  end

  subgraph BranchingFlow["استراتيجية الفروع (Trunk-Based / Git Flow)"]
    Main["الفرع الرئيسي (main)<br/>محمي ضد الدفع المباشر"]
    Feature["فروع الميزات (feat/*)<br/>تطوير معزول ومحدد"]
    PR["طلب الدمج (Pull Request)<br/>مراجعة الكود وفحص الاختبارات"]
  end

  Feature --> PR
  PR -->|اجتياز الفحص والمراجعة| Main
  CI -.->|يفحص| PR

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef secure fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  class Main,EnvSec secure;`,

    flow: `flowchart TD
  StartTask(["استلام تذكرة مهمة جديدة"]) --> CreateBranch["إنشاء فرع جديد متفرع من main (feat/name)"]
  CreateBranch --> CodeDev["كتابة الكود مع الحفاظ على القواعد الست للاتساق"]
  CodeDev --> LocalTest{"هل اجتاز الكود الفحص المحلي والبناء؟"}
  LocalTest -- لا --> FixCode["إصلاح أخطاء Linting والبناء محلياً"]
  FixCode --> LocalTest
  LocalTest -- نعم --> CommitPush["التزام منظم بالمعايير ودفع الفرع البعيد"]
  CommitPush --> OpenPR["فتح Pull Request وإرفاق التوثيق المحدث"]
  OpenPR --> AutomatedCI{"هل اجتازت الاختبارات في GitHub Actions؟"}
  AutomatedCI -- فشل --> FixCI["مراجعة سجلات الخطأ ومعالجتها"]
  FixCI --> CommitPush
  AutomatedCI -- نجاح --> MergeMain["دمج الفرع إلى main بنجاح"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class LocalTest,AutomatedCI decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor Dev as المهندس (Developer)
  participant Git as مستودع Git المحلي
  participant Remote as مستودع GitHub البعيد
  participant Actions as أنابيب الفحص (CI Pipeline)
  participant Lead as مراجع الكود (Peer Reviewer)

  Dev->>Git: git checkout -b feat/diagram-viewer
  Dev->>Git: git commit -m "feat: add mermaid diagram viewer"
  Dev->>Remote: git push origin feat/diagram-viewer
  Remote->>Actions: إطلاق الفحص الآلي للبناء والاختبارات
  Actions-->>Remote: تأكيد اجتياز الاختبارات 100%
  Dev->>Lead: طلب مراجعة الكود (Request Review)
  Lead-->>Remote: اعتماد الدمج (Approved & Merged)`,
  },

  'topic-08': {
    architecture: `flowchart TD
  subgraph DesignSystem["نظام التصميم الشامل (Design System)"]
    Tokens["رموز التصميم (Design Tokens)<br/>Colors, Radii, Shadows, Spacing"]
    Palette["موازنة الألوان 60-30-10<br/>60% Surface, 30% Structural, 10% Accent"]
    Typography["التايبوجرافي المتزن<br/>System Fonts, Scale, Font-Weights"]
    States["الحالات التفاعلية الشاملة<br/>Hover, Focus-Visible, Active, Disabled"]
    FeedbackViews["شاشات التجربة الحية<br/>Empty State, Loading Skeleton, Error"]
  end

  Tokens --> Palette
  Tokens --> Typography
  Palette --> States
  States --> FeedbackViews

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef highlight fill:#7c2d12,stroke:#f97316,stroke-width:2px,color:#fff7ed;
  class Palette,States highlight;`,

    flow: `flowchart TD
  ReqUI(["طلب شاشة تفاعلية جديدة"]) --> RuleCheck{"فحص موازنة الألوان والرموز"}
  RuleCheck -- استخدام ألوان عشوائية --> RefactorTokens["استبدالها بمتغيرات CSS Tokens القياسية"]
  RefactorTokens --> RuleCheck
  RuleCheck -- منضبطة 60-30-10 --> StateCoverage{"هل تغطي الشاشة جميع الحالات الخمس؟"}
  StateCoverage -- نقص في إحدى الحالات --> AddStates["إضافة حالة التحميل Skeleton وحالة الشاشة الفارغة Empty"]
  AddStates --> StateCoverage
  StateCoverage -- تغطية كاملة --> TouchCheck{"هل مساحات النقر تلبي معيار 40px فما فوق؟"}
  TouchCheck -- أصغر من 40px --> EnlargeTouch["زيادة مساحة اللمس للأجهزة المحمولة"]
  EnlargeTouch --> TouchCheck
  TouchCheck -- نعم --> DoneUI["واجهة فائقة الجودة وجاهزة للاستخدام"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class RuleCheck,StateCoverage,TouchCheck decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor User as المستخدم (User)
  participant Component as المكون البصري (TopicCard)
  participant Theme as موفر السمة (Theme Context)
  participant Screen as شاشة العرض (DOM)

  User->>Component: تمرير المؤشر (Hover)
  Component->>Screen: إطلاق تأثير الرفع الدقيق (Scale 1.02) وزيادة الظل
  User->>Theme: تبديل السمة إلى النمط الليلي (Dark Mode)
  Theme->>Screen: تبديل متغيرات الألوان فورياً بدون وميض
  Component->>Screen: تطبيق تباين WCAG AA على جميع النصوص والأيقونات`,
  },

  'topic-09': {
    architecture: `flowchart TD
  subgraph StitchBridge["جسر الربط بين التصميم والبرمجة (MCP Bridge)"]
    StitchFigma["منصة التصميم (Google Stitch / Figma)"]
    MCPProtocol["بروتوكول سياق النموذج<br/>(Model Context Protocol - MCP)"]
    DesignSpec["وثيقة التصميم الحاكمة<br/>(DESIGN.md)"]
    AICursor["بيئة التطوير بالذكاء الاصطناعي<br/>(Cursor / Claude / AI Studio)"]
    CodeOutput["الكود المصدري المطابق<br/>(React Components + Tailwind)"]
  end

  StitchFigma -->|تصدير المواصفات عبر| MCPProtocol
  MCPProtocol --> DesignSpec
  DesignSpec -->|عقد إلزامي| AICursor
  AICursor --> CodeOutput

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef bridge fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
  class MCPProtocol,DesignSpec bridge;`,

    flow: `flowchart TD
  DesignReady(["اكتمال التصميم في أداة النمذجة"]) --> QueryMCP["استدعاء أدوات خادم MCP لاستخراج الرموز والمكونات"]
  QueryMCP --> ParseSpec["تشريح الشاشات إلى قياسات، خطوط، وألوان دقيقة"]
  ParseSpec --> GenDesignMd["توليد وتحديث وثيقة DESIGN.md الملزمة"]
  GenDesignMd --> VerifyContract{"هل الكود المقترح يطابق وثيقة DESIGN.md؟"}
  VerifyContract -- لا --> RejectDeviations["منع أي كلاسات أو ألوان تخرج عن النظام"]
  RejectDeviations --> VerifyContract
  VerifyContract -- نعم --> BuildComponents["إنتاج مكونات React نقية ومتوافقة بنسبة 100%"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class VerifyContract decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor Agent as المطور المساعد (AI Engineer)
  participant MCP as خادم بروتوكول MCP
  participant DesignDoc as وثيقة DESIGN.md
  participant AppCode as كود المشروع (React / Tailwind)

  Agent->>MCP: استعلام عن تفاصيل شاشة القراءة وعناصر التحكم
  MCP-->>Agent: إرجاع المقاسات الدقيقة وقيم التباين وحالات التفاعل
  Agent->>DesignDoc: مطابقة المدخلات مع جدول الألوان والخطوط المعتمد
  Agent->>AppCode: كتابة مكونات نقية تحترم العقد التصميمي بدون تخمين
  AppCode-->>Agent: اجتياز فحص الاتساق البصري بنجاح`,
  },

  'topic-10': {
    architecture: `flowchart TD
  subgraph FrontendDiscipline["دستور تنفيذ الفرونت إند وهندسة المهام الصغيرة"]
    SpecKit["أوامر Spec Kit الثمانية للمراجعة الدقيقة"]
    SmallTasks["تفكيك المهام الصغيرة القابلة للتحقق (Small Verifiable Tasks)"]
    Rules["دستور الفرونت إند الصارم (Zero-Pill, Typographic Hierarchy)"]
    StateManagement["إدارة الحالة المحلية والمعزولة (Hooks & Props)"]
  end

  subgraph ReviewPipeline["أوامر المراجعة الآلية"]
    Cmd1["1. مراجعة التجاوب"]
    Cmd2["2. مراجعة التباين"]
    Cmd3["3. فحص انعدام الطفحان"]
    Cmd4["4. اختبار سهولة الوصول"]
  end

  SpecKit --> ReviewPipeline
  SmallTasks --> Rules
  Rules --> StateManagement

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef tool fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
  class SpecKit,SmallTasks tool;`,

    flow: `flowchart TD
  StartTask(["استلام مهمة بناء ميزة جديدة"]) --> TaskBreakdown["تفكيك الميزة إلى مهام ذرية صغيرة (Sub-tasks)"]
  TaskBreakdown --> CodeStep["تنفيذ المهمة الذرية الأولى"]
  CodeStep --> QuickVerify{"هل تم التحقق من البناء وخلوه من أخطاء Lint؟"}
  QuickVerify -- خطأ --> QuickFix["إصلاح الخطأ فوراً قبل الانتقال لما بعده"]
  QuickFix --> QuickVerify
  QuickVerify -- سليم --> SpecKitReview["تشغيل أوامر فحص Spec Kit على التجاوب والأنماط"]
  SpecKitReview --> AllPassed{"هل استوفت كافة الشروط الهندسية؟"}
  AllPassed -- لا --> Refine["ضبط التجاوب وإزالة أي هوامش تسبب طفحاناً"]
  Refine --> SpecKitReview
  AllPassed -- نعم --> TaskDone["إتمام المهمة وتسليم ميزة متينة"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class QuickVerify,AllPassed decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor Engineer as مهندس الواجهات (Frontend Engineer)
  participant SpecKit as حزمة Spec Kit
  participant Linter as فاحص الكود (ESLint / TypeScript)
  participant Browser as بيئة المعاينة (Vite Dev Server)

  Engineer->>SpecKit: استدعاء أمر فحص التجاوب ونقاط التوقف
  SpecKit->>Browser: فحص أبعاد الحاويات وتمدد العناصر
  Browser-->>SpecKit: رصد استقرار العرض دون طفحان أفقي
  Engineer->>Linter: تشغيل lint_applet & compile_applet
  Linter-->>Engineer: نجاح البناء بنسبة 100% بدون أي أخطاء ترقيم أو استيراد`,
  },

  'topic-11': {
    architecture: `flowchart TD
  subgraph QAMatrix["مصفوفة الفحص الشامل وضمان الجودة (Comprehensive QA Matrix)"]
    Breakpoints["1. التجاوب عبر 5 نقاط توقف<br/>(Mobile, Tablet, Laptop, Desktop, 4K)"]
    ZeroOverflow["2. انعدام الطفحان الأفقي<br/>(Zero Horizontal Overflow at all scales)"]
    A11y["3. سهولة الوصول الشاملة<br/>(WCAG AA, Contrast 4.5:1, Keyboard Nav)"]
    Stress["4. اختبار ضغط البيانات<br/>(Long text strings, RTL/LTR balance)"]
    Perf["5. مقاييس الأداء العالية<br/>(Lighthouse 95+, 0ms Layout Shifts)"]
  end

  Breakpoints --> ZeroOverflow
  ZeroOverflow --> A11y
  A11y --> Stress
  Stress --> Perf

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef qa fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  class Breakpoints,ZeroOverflow,A11y qa;`,

    flow: `flowchart TD
  QACheck(["بدء فحص ضمان الجودة قبل النشر"]) --> BP5{"اختبار الشاشات على 5 نقاط توقف"}
  BP5 -- وجود انكسار --> FixCSS["تعديل فئات Tailwind التجاوبية (sm, md, lg, xl)"]
  FixCSS --> BP5
  BP5 -- سليم --> OverflowCheck{"فحص document.body.scrollWidth === innerWidth"}
  OverflowCheck -- طفحان أفقي --> RemoveFixedW["استبدال العروض الثابتة بعروض مرنة w-full"]
  RemoveFixedW --> OverflowCheck
  OverflowCheck -- انعدام الطفحان --> A11yCheck{"فحص إمكانية التنقل باللوحة وقارئات الشاشة"}
  A11yCheck -- أزرار تفتقر لـ aria-label --> AddA11y["إضافة التسميات الواضحة ومؤشرات Focus"]
  AddA11y --> A11yCheck
  A11yCheck -- معتمدة --> ApprovedRelease["موافقة نهائية ونشر بنجاح"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class BP5,OverflowCheck,A11yCheck decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor QA as مهندس الجودة (QA Automation)
  participant Viewport as محاكي الشاشات (Responsive Viewport)
  participant A11yAudit as فاحص سهولة الوصول (A11y Audit)
  participant Report as تقرير الجودة النهائي

  QA->>Viewport: اختبار أبعاد 320px، 768px، 1024px، 1440px
  Viewport-->>QA: تأكيد انسيابية العناصر دون قص أو طفحان
  QA->>A11yAudit: فحص تباين الألوان ومفاتيح التبويب Tab و Esc
  A11yAudit-->>QA: اجتياز معايير WCAG AA ومفاتيح الاختصار
  QA->>Report: توثيق الجاهزية بنسبة 100% واعتماد الإطلاق`,
  },

  'topic-12': {
    architecture: `flowchart TD
  subgraph ReferenceSystem["المرجع المعماري والقاموس التقني الشامل"]
    FAQ["أسئلة الفهم الجوهرية الخمسة وأجوبتها"]
    GoldenRules["القواعد المعمارية الذهبية الإلزامية"]
    PromptTable["جدول البرومبتات الكامل القابل للنسخ بنقرة واحدة"]
    Glossary["قاموس المصطلحات البرمجية والمعمارية"]
  end

  subgraph ValueToEngineer["القيمة المضافة للمهندس"]
    QuickCopy["نسخ مباشر للأوامر دون كتابة يدوية"]
    SolidDecisions["اتخاذ قرارات هندسية مدعومة بالأسس"]
    UnifiedLang["لغة تقنية موحدة بين الفريق والذكاء الاصطناعي"]
  end

  PromptTable --> QuickCopy
  GoldenRules --> SolidDecisions
  Glossary --> UnifiedLang

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef gold fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fef3c7;
  class GoldenRules,PromptTable gold;`,

    flow: `flowchart TD
  EngineerNeedsHelp(["المهندس يواجه معضلة في المشروع"]) --> CheckRef{"ما هو نوع الحاجة التقنية؟"}
  CheckRef -- مصطلح غير مألوف --> OpenGlossary["مراجعة القاموس المعماري للتعريف الدقيق"]
  CheckRef -- صياغة متطلب --> OpenPrompts["اختيار البرومبت المعتمد من جدول الأوامر ونسخه"]
  CheckRef -- التحقق من قرار معماري --> OpenRules["مراجعة القواعد الذهبية لحسم القرار الهندسي"]
  OpenGlossary --> FastApply["تطبيق المعرفة فوراً في المشروع"]
  OpenPrompts --> FastApply
  OpenRules --> FastApply

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class CheckRef decision;`,

    sequence: `sequenceDiagram
  autonumber
  actor Engineer as المهندس (Engineer)
  participant App as دليل هندسة البرمجيات
  participant Clipboard as حافظة النظام (Clipboard)
  participant IDE as محرر الكود (AI IDE)

  Engineer->>App: البحث عن برومبت معايير القبول Given/When/Then
  App-->>Engineer: عرض البرومبت المعتمد مع زر النسخ السريع
  Engineer->>App: النقر على "نسخ البرومبت"
  App->>Clipboard: نسخ النص البرمجي الكامل مع إشعار نجاح
  Engineer->>IDE: لصق البرومبت وتنفيذه فوراً بجودة هندسية متقنة`,
  },

  'mermaid-syntax': {
    architecture: `flowchart TD
  subgraph ClientApp["بيئة المتصفح التفاعلية (Browser Client-Side)"]
    Source["كود المخطط النصي<br/>(Markdown / Code Block)"] --> Parser["محلل الصياغة النحوية<br/>(Mermaid Lexer & AST)"]
    Parser --> Validator{"فحص سلامة الصياغة<br/>(Syntax Check)"}
    Validator -- سليمة --> SvgGen["محرك توليد الرسوم<br/>(SVG Vector Generator)"]
    SvgGen --> DomMount["عرض المخطط التفاعلي<br/>(Interactive DOM Canvas)"]
    Validator -- خطأ صياغي --> ErrorBox["تنبيه خطأ موضعي غير معطّل<br/>(Inline Non-blocking Alert)"]
  end

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef success fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  classDef error fill:#881337,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2;
  class SvgGen,DomMount success;
  class ErrorBox error;`,

    flow: `flowchart LR
  A["1. كتابة كود نصي LTR"] --> B["2. معاينة في Mermaid Live"]
  B --> C{"3. التحقق من الصياغة"}
  C -- خطأ في الصياغة --> D["معالجة سريعة لسطر الخطأ"]
  D --> B
  C -- صياغة سليمة --> E["4. تصيير SVG في المتصفح"]
  E --> F["5. حفظ في docs/diagrams/"]

  classDef default fill:#0f172a,stroke:#3b82f6,stroke-width:1.5px,color:#93c5fd;
  classDef highlight fill:#1d4ed8,stroke:#60a5fa,stroke-width:2px,color:#ffffff;
  class A,E,F highlight;`,

    sequence: `sequenceDiagram
  autonumber
  actor User as الطالب / المطوّر
  participant Editor as محرر الكود / المتصفح
  participant Engine as محرك Mermaid.js المدمج
  participant Canvas as عارض المخططات (Viewer)

  User->>Editor: كتابة أو تعديل كود Mermaid النصي
  Editor->>Engine: استدعاء mermaid.render()
  alt كود صالح وسليم
    Engine-->>Canvas: إرجاع وسم SVG المتجهي وتثبيته في الصفحة
    Canvas-->>User: عرض المخطط مع أدوات التكبير والنسخ
  else خطأ في الصياغة (Syntax Error)
    Engine-->>Canvas: اعتراض الخطأ عبر try / catch
    Canvas-->>User: إظهار تنبيه موضعي يحدد مكان الخطأ دون كسر الصفحة
  end`,
  },

  'user-flow-modeling': {
    architecture: `flowchart TD
  subgraph FlowArchitecture["هيكلية مخطط تدفق المستخدم (User Flow)"]
    Entry["نقطة الانطلاق (Entry State)"] --> Actions["إجراءات المستخدم (User Actions)"]
    Actions --> Gate{"بوابات القرار (Decision Gates)"}
    Gate -- شروط مستوفاة --> Happy["مسار النجاح (Happy Path)"]
    Gate -- شروط غير مستوفاة --> Fallback["مسارات الفشل والاعتذار (Failure Paths)"]
    Happy --> ExitSuccess["إتمام الهدف بنجاح (Exit State)"]
    Fallback --> ExitError["التعافي أو إغلاق الطلب (Recovery / Exit)"]
  end

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef success fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  classDef error fill:#881337,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2;
  class Happy,ExitSuccess success;
  class Fallback,ExitError error;`,

    flow: `flowchart TD
  Start(["بدء: استعارة معدة معملية"]) --> Browse["تصفح كتالوج المعدات المتاحة"]
  Browse --> SelectItem["اختيار معدة والنقر على طلب استعارة"]
  SelectItem --> CheckAuth{"هل حساب الطالب معتمد؟"}
  CheckAuth -- لا --> ShowAuthError["عرض تنبيه: الحساب بانتظار الاعتماد"] --> ExitAuth(["نهاية: إيقاف الطلب"])
  CheckAuth -- نعم --> CheckStock{"هل المعدة متوفرة بالمخزن؟"}
  CheckStock -- لا --> ShowOutOfStock["عرض تنبيه: المعدة غير متوفرة"] --> ExitStock(["نهاية: اقتراح بدائل"])
  CheckStock -- نعم --> CheckLoans{"هل عدد الإعارات النشطة < 2؟"}
  CheckLoans -- لا --> ShowLimitError["خطأ: بلوغ الحد الأقصى (جهازان)"] --> ExitLimit(["نهاية: رفض الطلب"])
  CheckLoans -- نعم --> SubmitRequest["إرسال طلب الاستعارة (قيد المراجعة)"]
  SubmitRequest --> AdminDecision{"قرار مسؤول المستودع"}
  AdminDecision -- رفض --> NotifyReject["إشعار الطالب بسبب الرفض"] --> ExitReject(["نهاية: طلب مرفوض"])
  AdminDecision -- موافقة --> Handover["تسليم المعدة خلال 48 ساعة"]
  Handover --> ActiveLoan(["إعارة نشطة بنجاح ✓"])

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  classDef error fill:#881337,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2;
  classDef success fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  class CheckAuth,CheckStock,CheckLoans,AdminDecision decision;
  class ShowAuthError,ShowOutOfStock,ShowLimitError,NotifyReject error;
  class ActiveLoan success;`,

    sequence: `sequenceDiagram
  autonumber
  actor Student as الطالب (Student)
  participant UI as واجهة الاستعارة (Frontend UI)
  participant Core as نظام إدارة الإعارة (BorrowHub)
  actor Staff as مسؤول المستودع (Staff)

  Student->>UI: تصفح كتالوج الأجهزة واختيار معدة
  UI->>Core: فحص أهلية الطالب ورصيد الإعارات النشطة
  alt تجاوز الحد الأقصى (أكثر من جهازين)
    Core-->>UI: رفض الطلب (Rule 3: Limit Exceeded)
    UI-->>Student: إشعار بالحد الأقصى واقتراح إعادة الأجهزة السابقة
  else مؤهل والكمية متوفرة
    Core-->>UI: إتاحة نموذج الاستعارة
    Student->>UI: تقديم الطلب وتحديد التواريخ
    UI->>Core: تسجيل الطلب بحالة "قيد المراجعة"
    Core->>Staff: إشعار بوجود طلب استعارة جديد
    Staff->>Core: اعتماد الطلب وبدء مهلة التسليم
    Core-->>Student: إشعار بالموافقة ومهلة الاستلام (48 ساعة)
  end`,
  },

  'conceptual-domain-model': {
    architecture: `flowchart LR
  subgraph UsersBoundary["مجال الفواعل والمستفيدين"]
    Student["الطالب (Student)<br/>المستعير المعتمد"]
    Staff["مسؤول المستودع (Staff)<br/>إدارة الأصول والتسليم"]
  end

  subgraph AssetsBoundary["مجال الأجهزة والعهد"]
    Category["تصنيف المعدة (Equipment Category)<br/>القواعد والتعليمات العامة"]
    Equipment["المعدة المعملية (Equipment)<br/>الأصل الفيزيائي القابل للإعارة"]
  end

  subgraph OperationBoundary["مجال عمليات الاستعارة والتدقيق"]
    LoanRequest["طلب الاستعارة (Loan Request)<br/>فترة الحجز، الغرض، والحالة"]
    Handover["محضر التسليم (Handover Record)<br/>توثيق الاستلام وبدء الإعارة"]
    Inspection["فحص الإرجاع (Inspection Record)<br/>معاينة السلامة وتقدير التلفيات"]
  end

  Category -- "يصنف ويحدد شروط" --> Equipment
  Student -- "يقدّم" --> LoanRequest
  LoanRequest -- "يطلب" --> Equipment
  Staff -- "يعتمد أو يرفض" --> LoanRequest
  LoanRequest -- "ينتج عنه عند الاعتماد" --> Handover
  Staff -- "يسلّم بموجب" --> Handover
  Handover -- "يُختتم بـ" --> Inspection
  Inspection -- "يحدّث حالة التوفر لـ" --> Equipment

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef conceptual fill:#0f3460,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;
  class Student,Staff,Category,Equipment,LoanRequest,Handover,Inspection conceptual;`,

    flow: `flowchart TD
  Concept1["1. استخراج المفاهيم من PRD"] --> Concept2["2. صياغة مسؤوليات كل مفهوم"]
  Concept2 --> Concept3["3. تحديد العلاقات بلغة الأعمال"]
  Concept3 --> BoundaryCheck{"4. فحص حدود النموذج المفاهيمي"}
  BoundaryCheck -- وجود مفاتيح PK/FK أو SQL --> Cleanse["حذف التفاصيل التقنية والتخزينية فوراً"]
  Cleanse --> BoundaryCheck
  BoundaryCheck -- مفاهيمي خالص ومطابق لـ PRD --> FinalModel["5. اعتماد Conceptual Domain Model"]

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  classDef success fill:#065f46,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
  class BoundaryCheck decision;
  class FinalModel success;`,

    sequence: `sequenceDiagram
  autonumber
  actor Analyst as محلل النظم / الطالب
  participant PRD as وثيقة المتطلبات (PRD.md)
  participant Domain as النموذج المفاهيمي (Domain Model)
  participant Review as صاحب العمل / خبير المجال

  Analyst->>PRD: قراءة وتحديد مصطلحات العمل الأساسية
  Analyst->>Domain: استخراج الكيانات والمسؤوليات والعلاقات
  Domain->>Domain: تنقية النموذج من مفاتيح SQL والدوال التقنية
  Analyst->>Review: عرض المخطط بلغة الأعمال الصافية
  Review-->>Analyst: تأكيد مطابقة العلاقات لقواعد المنظومة الواقعية`,
  },
};

/**
 * Generates an intelligent, clean, syntactically-valid Mermaid diagram for any topic
 * Completely client-side with ZERO external API calls.
 */
export function getTopicMermaidDiagram(
  topic: TopicItem,
  perspective: DiagramPerspective = 'architecture'
): string {
  // 1. Check pre-built verified models first for maximum architectural fidelity
  const prebuiltForTopic = PREBUILT_TOPIC_DIAGRAMS[topic.id];
  if (prebuiltForTopic && prebuiltForTopic[perspective]) {
    return prebuiltForTopic[perspective].trim();
  }

  // 2. Client-side dynamic synthesis engine for any custom or dynamic topic
  return generateDynamicMermaid(topic, perspective);
}

/**
 * Deterministic client-side diagram synthesis engine for any topic
 */
function generateDynamicMermaid(topic: TopicItem, perspective: DiagramPerspective): string {
  const cleanTitle = topic.title.replace(/["\n\r\\]/g, ' ').trim();
  const cleanStage = topic.stageTag.replace(/["\n\r\\]/g, ' ').trim();
  const tags = topic.tags.slice(0, 4).map((t) => t.replace(/["\n\r\\]/g, ' ').trim());

  if (perspective === 'flow') {
    return `flowchart TD
  Start(["بدء: ${cleanTitle}"]) --> Phase1["مرحلة الإعداد: ${cleanStage}"]
  Phase1 --> Check{"فحص معايير الجودة"}
  Check -- غير مكتملة --> Refine["استدراك المتطلبات وتحسين الصياغة"]
  Refine --> Check
  Check -- مكتملة --> Action["تطبيق التقنيات: ${tags.join(' | ') || 'أفضل الممارسات'}"]
  Action --> Finished(["مخرجات منضبطة ومعتمدة"])

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef decision fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
  class Check decision;`;
  }

  if (perspective === 'sequence') {
    return `sequenceDiagram
  autonumber
  actor Engineer as المهندس (Engineer)
  participant Module as وحدة: ${cleanStage}
  participant Core as المحرك البرمجي الرئيسي
  participant Target as المخرجات المعتمدة

  Engineer->>Module: إطلاق إجراءات: ${cleanTitle}
  Module->>Core: تمرير المعطيات والتحقق من القواعد
  Core-->>Module: مطابقة معايير القبول
  Module->>Target: صياغة وتوثيق النتيجة النهائية
  Target-->>Engineer: إشعار باكتمال الإجراء بنجاح`;
  }

  // Default: Architecture
  return `flowchart TD
  subgraph TopicBoundary["${cleanTitle}"]
    StageNode["المرحلة: ${cleanStage}"]
    CoreNode["الهدف الجوهري"]
    TagNode1["التقنية: ${tags[0] || 'الأساس المعماري'}"]
    TagNode2["الأداة: ${tags[1] || 'إدارة السياق'}"]
  end

  StageNode --> CoreNode
  CoreNode --> TagNode1
  CoreNode --> TagNode2

  classDef default fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc;
  classDef highlight fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#eff6ff;
  class CoreNode highlight;`;
}
