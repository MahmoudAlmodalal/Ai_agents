import { topic01Html } from '@/scripts/topics/topic01.ts';
import { topic02Html } from '@/scripts/topics/topic02.ts';
import { topic03Html } from '@/scripts/topics/topic03.ts';
import { topic04Html } from '@/scripts/topics/topic04.ts';
import { topic05Html } from '@/scripts/topics/topic05.ts';
import { topic06Html } from '@/scripts/topics/topic06.ts';
import { topic07Html } from '@/scripts/topics/topic07.ts';
import { topic08Html } from '@/scripts/topics/topic08.ts';
import { topic09Html } from '@/scripts/topics/topic09.ts';
import { topic10Html } from '@/scripts/topics/topic10.ts';
import { topic11Html } from '@/scripts/topics/topic11.ts';
import { topic12Html } from '@/scripts/topics/topic12.ts';
import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';
import { t02Entries } from '@/src/data/topics/wave2/t02-discovery-prd-srs.ts';
import { t03Entries } from '@/src/data/topics/wave2/t03-git-github.ts';

/**
 * Frozen mapping from legacy topic IDs (topic-01 .. topic-12) to canonical slugs.
 * Preserves user bookmarks and recently-viewed history without silent drift.
 */
export const LEGACY_TOPIC_ID_MAP: Record<string, string> = {
  'topic-01': 'project-idea-mvp',
  'topic-02': 'requirements-grill-me',
  'topic-03': 'requirements-prd',
  'topic-04': 'git-github-user-flow',
  'topic-05': 'database-erd',
  'topic-06': 'diagrams-lab',
  'topic-07': 'lecture-04-pending',
  'topic-08': 'ux-discovery-stitch',
  'topic-09': 'stitch-mcp-design-md',
  'topic-10': 'frontend-planning-spec-kit',
  'topic-11': 'prompt-library',
  'topic-12': 'borrowhub-reference',
};

/**
 * Route aliases for backward compatibility with legacy courseContent slugs.
 * Ensures existing URLs continue resolving to the correct topic.
 */
export const TOPIC_SLUG_ALIASES: Record<string, string> = {
  'fundamentals-ai-agents': 'project-idea-mvp',
  'requirements-discovery': 'project-idea-mvp',
  'grill-me': 'requirements-grill-me',
  'prd': 'requirements-prd',
  'github': 'git-github-user-flow',
  'user-flow': 'git-github-user-flow',
  'database-analysis-erd': 'database-erd',
  'diagrams': 'diagrams-lab',
  'domain-model': 'diagrams-lab',
  'ui-ux': 'ux-discovery-stitch',
  'ui-ux-discovery': 'ux-discovery-stitch',
  'google-stitch': 'ux-discovery-stitch',
  'google-ai-studio-stitch-workflow': 'stitch-mcp-design-md',
  'design-md': 'stitch-mcp-design-md',
  'stitch-mcp': 'stitch-mcp-design-md',
  'frontend-planning': 'frontend-planning-spec-kit',
  'ui-ux-pro-max': 'frontend-planning-spec-kit',
  'spec-kit': 'frontend-planning-spec-kit',
  'incremental-implementation': 'frontend-planning-spec-kit',
  'testing-qa': 'prompt-library',
  'tools': 'borrowhub-reference',
  'templates': 'borrowhub-reference',
  'borrowhub': 'borrowhub-reference',
  'glossary': 'borrowhub-reference',
};

const LEGACY_TOPICS: TopicItem[] = [
  {
    id: 'topic-01',
    number: '01',
    slug: 'project-idea-mvp',
    title: 'اختيار فكرة المشروع وتحديد MVP',
    subtitle: 'صياغة المشكلة وتحديد المستخدمين وحسم نطاق النسخة الأولى',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'الأساسيات والمدخل الهندسي',
    summary: 'معضلة البرمجة التخمينية (Vibe Coding) وكيفية إغلاق باب التخمين باستنطاق الفكرة، صياغة المشكلة والمستخدمين، وحسم نطاق MVP وتوثيق سياق المشروع في ملف PROJECT_CONTEXT.md.',
    tags: ['Vibe Coding', 'AI Agents', 'MVP', 'PROJECT_CONTEXT.md', 'Problem Statement', 'Target Users', 'Non-Goals'],
    contentTypes: ['prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic01Html),
    htmlContent: topic01Html,

    // Shared contract fields (Wave 1 foundational)
    goal: 'صياغة المشكلة الأساسية وتحديد الفئات المستهدفة وحسم نطاق النسخة الأولى (MVP) وعزل الميزات المؤجلة (Non-Goals)، وتوثيق سياق المشروع في ملف PROJECT_CONTEXT.md قبل البدء بالمتطلبات التفصيلية أو البرمجة.',
    prerequisites: ['لا توجد متطلبات برمجية مسبقة؛ يكفي وجود فكرة تطبيق أو مشكلة واقعية يراد حلها.'],
    steps: [
      '1. اختر فكرة المشروع وصغ بيان المشكلة (Problem Statement) بدقة: ما هي المشكلة الحقيقية ولمن تُحل؟',
      '2. حدد فئات المستخدمين المستهدفين (Target Users) واحتياجاتهم الأساسية وصلاحياتهم الأولية.',
      '3. عرّف نطاق النسخة التجريبية الأولى (MVP Scope) واعزل الميزات المؤجلة (Non-Goals / Future Features).',
      '4. وثّق قرارات الفكرة ونطاقها في ملف سياق المشروع docs/PROJECT_CONTEXT.md.',
      '5. راجع حدود المشروع وتأكد من اكتمال المعطيات قبل الانتقال لمرحلة استنطاق المتطلبات (Grill Me).'
    ],
    promptRefs: ['prompt-01-grill-me-product-discovery'],
    outputs: ['docs/PROJECT_CONTEXT.md', 'وثيقة نطاق MVP'],
    checklist: [
      'تمت صياغة بيان المشكلة والهدف الرئيسي من المنتج بوضوح دون غموض.',
      'تم تحديد المستخدمين المستهدفين واحتياجاتهم وفصل أدوارهم.',
      'تم حسم نطاق MVP واستبعاد الميزات غير الأساسية إلى مرحلة مستقبلية.',
      'تم إنشاء ملف docs/PROJECT_CONTEXT.md وحفظ ملخص الفكرة وقواعدها بداخله.',
      'تمت مراجعة الافتراضات والتأكد من وضوح الفكرة لجلسة استكشاف المتطلبات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 1,
  },
  {
    id: 'topic-02',
    number: '02',
    slug: 'requirements-grill-me',
    title: 'Product Discovery وGrill Me: اكتشاف المتطلبات',
    subtitle: 'اسأل سؤالًا واحدًا في كل مرة، وثبّت القرارات قبل الكتابة',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'تحليل المتطلبات وهندسة المنتج',
    summary: 'منهجية المقابلة الاستجوابية الحازمة للذكاء الاصطناعي، تحديد نطاق الـ MVP وحسم الحالات الحدية، وصياغة وثيقة متطلبات المنتج الكاملة ومراجعتها نقدياً لكشف الثغرات.',
    tags: ['PRD', 'Grill Me', 'MVP', 'Scope', 'Given-When-Then', 'Acceptance Criteria', 'Product Spec'],
    contentTypes: ['prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 3,
    codeSnippetCount: 2,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic02Html),
    htmlContent: topic02Html,

    goal: 'إجراء مقابلة استكشاف متطلبات المنتج لكشف الافتراضات وتثبيت القرارات.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-03',
    number: '03',
    slug: 'requirements-prd',
    title: 'PRD: الوثيقة ذات الأقسام الـ27 ومراجعة المتطلبات',
    subtitle: 'افصل المؤكد عن الافتراض، وراجع النطاق قبل التخطيط',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'تجربة المستخدم ومسارات التدفق',
    summary: 'الفرق الجوهري بين PRD و User Flow، نمذجة مسارات الاستعارة، حالات الخطأ والنجاح، ونقاط اتخاذ القرار (Decision Points) باستخدام صيغة Mermaid flowchart TD.',
    tags: ['User Flow', 'Mermaid', 'Decision Points', 'Happy Path', 'Failure Path', 'Flowchart', 'UX'],
    contentTypes: ['diagram', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 3,
    readingTimeMinutes: calculateReadingTime(topic03Html),
    htmlContent: topic03Html,

    goal: 'صياغة وثيقة متطلبات المنتج المكتملة بأقسامها الـ27 ومراجعتها نقدياً.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-04',
    number: '04',
    slug: 'git-github-user-flow',
    title: 'Git وGitHub وUser Flow باستخدام Mermaid',
    subtitle: 'وثّق المشروع وارسم رحلة النجاح والفشل دون إضافة سلوك غير معتمد',
    category: 'architecture',
    categoryName: 'المعمارية والنمذجة',
    stageTag: 'نمذجة الأنظمة المعمارية (UML)',
    summary: 'مخططات UML السبعة الأساسية: النموذج المفاهيمي، حالات الاستخدام PlantUML، سير العمليات ومسارات السباحة (Swimlanes)، التفاعل الزمني (Sequence)، دورة حياة الكيان (State Machine)، والتصميم البنيوي للكلاسات.',
    tags: ['UML', 'Sequence Diagram', 'Domain Model', 'Use Case', 'Activity Diagram', 'State Machine', 'Class Diagram', 'PlantUML', 'Mermaid', 'Swimlanes'],
    contentTypes: ['diagram', 'prompt', 'code'],
    diagramCount: 6,
    promptCount: 6,
    codeSnippetCount: 7,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic04Html),
    htmlContent: topic04Html,

    goal: 'حفظ وثائق المشروع في مستودع Git ورسم مسارات تدفق المستخدم باستخدام Mermaid.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-05',
    number: '05',
    slug: 'database-erd',
    title: 'Database Analysis وERD لمشروع BorrowHub',
    subtitle: 'الجداول والعلاقات والقيود ومراجعة الاتساق مع PRD',
    category: 'database',
    categoryName: 'قواعد البيانات والأداء',
    stageTag: 'هندسة قواعد البيانات والأداء',
    summary: 'تصميم مخطط الكيانات والعلاقات (ERD) ومفاتيح PK/FK والقيود، كود DBML، التطبيع 3NF، وحل مشكلة استعلامات N+1 المتكررة عبر JOIN و Eager Loading، ودور فهارس B-Tree وتكلفتها.',
    tags: ['ERD', 'DBML', 'PostgreSQL', 'Normalization', '3NF', 'N+1 Query', 'Indexing', 'B-Tree', 'Constraints', 'Eager Loading'],
    contentTypes: ['diagram', 'code', 'prompt'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 4,
    checklistCount: 4,
    readingTimeMinutes: calculateReadingTime(topic05Html),
    htmlContent: topic05Html,

    goal: 'تحليل وتصميم قاعدة بيانات المشروع ومخطط العلاقات والقيود وتطبيع 3NF.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-06',
    number: '06',
    slug: 'diagrams-lab',
    title: 'مختبر المخططات: كل مخطط يجيب عن سؤال مختلف',
    subtitle: 'Domain وUse Case وActivity وSequence وState وClass وERD',
    category: 'architecture',
    categoryName: 'المعمارية والنمذجة',
    stageTag: 'المعمارية الكبرى وتوزيع المسؤوليات',
    summary: 'الصورة المعمارية المتكاملة لطبقات العميل والخادم العكسي وتطبيقات الباك إند، فصل المسؤوليات الثلاثي (Views, Services, Selectors)، واستخدام Redis و Background Workers، ونماذج Multi-Tenancy.',
    tags: ['System Architecture', 'Nginx', 'Views', 'Services', 'Selectors', 'Redis', 'Background Workers', 'Multi-Tenancy', 'Caching'],
    contentTypes: ['diagram', 'prompt', 'code'],
    diagramCount: 1,
    promptCount: 2,
    codeSnippetCount: 2,
    checklistCount: 4,
    readingTimeMinutes: calculateReadingTime(topic06Html),
    htmlContent: topic06Html,

    goal: 'اختيار المخطط المناسب لكل زاوية معمارية وتوليد المخططات الهندسية.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-07',
    number: '07',
    slug: 'lecture-04-pending',
    title: 'المحاضرة الرابعة — بانتظار اعتماد المحتوى',
    subtitle: 'لا تُنشر مادة تعليمية غير موثقة أو مخرجات متخيلة',
    category: 'architecture',
    categoryName: 'المعمارية والنمذجة',
    stageTag: 'تنظيم الملفات وإدارة Git',
    summary: 'الهيكل القياسي لمجلد التوثيق /docs، القواعد الست لضمان اتساق قواعد العمل عبر المخططات، حماية ملفات البيئة .env، ودورة العمل الآمنة على فروع Git ومراجعة الأكواد.',
    tags: ['Git', 'GitHub', 'Branching', 'docs structure', 'PR', '.env', 'Code Review', 'Cross-Model Consistency'],
    contentTypes: ['checklist', 'prompt', 'code'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 3,
    checklistCount: 6,
    readingTimeMinutes: calculateReadingTime(topic07Html),
    htmlContent: topic07Html,

    goal: 'حفظ وتأكيد معايير المحتوى المعتمد وتوثيق الملفات قبل النشر.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-08',
    number: '08',
    slug: 'ux-discovery-stitch',
    title: 'UX Discovery وGoogle Stitch',
    subtitle: 'من احتياجات المستخدم إلى Screen Prompts وPrototype',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'تصميم الواجهات والنظم البصرية',
    summary: 'الانتقال من المخططات التجريدية إلى الشاشات التفاعلية، بناء الـ Design System، موازنة الألوان 60-30-10، التايبوجرافي المتزن، والحالات التفاعلية (Hover, Loading, Empty, Error).',
    tags: ['UI/UX', 'Google Stitch', 'Design System', 'Typography', 'Color Tokens', 'Figma', 'Interactive States', 'Empty State'],
    contentTypes: ['prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 3,
    codeSnippetCount: 2,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic08Html),
    htmlContent: topic08Html,

    goal: 'تحويل متطلبات المنتج إلى جرد شاشات وتصميم واجهة مرجعية ونظام تصميم في Stitch.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-09',
    number: '09',
    slug: 'stitch-mcp-design-md',
    title: 'Stitch MCP وDESIGN.md',
    subtitle: 'اربط التصميم بالكود بالقيم والمراجع المؤكدة فقط',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'ربط التصميم بالكود (MCP)',
    summary: 'بروتوكول سياق النموذج (Model Context Protocol - MCP) وربطه بمحررات الذكاء الاصطناعي، استخراج مواصفات الشاشات، وتشريح أقسام وثيقة DESIGN.md كعقد برمجي ملزم.',
    tags: ['Stitch MCP', 'DESIGN.md', 'Model Context Protocol', 'Cursor', 'Antigravity', 'Design Tokens', 'Frontend Contract'],
    contentTypes: ['code', 'prompt', 'checklist'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 3,
    checklistCount: 4,
    readingTimeMinutes: calculateReadingTime(topic09Html),
    htmlContent: topic09Html,

    goal: 'ربط مراجع التصميم ببيئة كود الفرونت وتوثيق عقد التصميم DESIGN.md.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-10',
    number: '10',
    slug: 'frontend-planning-spec-kit',
    title: 'Frontend Plan وSpec Kit وUI/UX Pro Max',
    subtitle: 'خطط للواجهة فقط، نفّذ مهمة صغيرة، ثم تحقق',
    category: 'frontend',
    categoryName: 'الواجهات وتطوير الفرونت إند',
    stageTag: 'تطوير الفرونت إند وSpec Kit',
    summary: 'استراتيجية المهام الصغيرة القابلة للتحقق (Small Verifiable Tasks)، دستور وقواعد الفرونت إند الصارمة، ودورة أوامر Spec Kit الثمانية للمراجعة الدقيقة للجودة وتوافق التصميم.',
    tags: ['Frontend Rules', 'Spec Kit', 'Small Tasks', 'UI/UX Pro Max', 'Review Commands', 'Tailwind', 'React', 'Zero-Pill'],
    contentTypes: ['checklist', 'prompt', 'code'],
    diagramCount: 0,
    promptCount: 3,
    codeSnippetCount: 3,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic10Html),
    htmlContent: topic10Html,

    goal: 'تخطيط وتنفيذ واجهات المشروع تدريجياً عبر مهام صغيرة محددة وقابلة للتحقق.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-11',
    number: '11',
    slug: 'prompt-library',
    title: 'مكتبة البرومبتات — PROMPT 01–30',
    subtitle: 'برومبتات حقيقية قابلة للبحث والنسخ من وثيقة الدورة',
    category: 'qa',
    categoryName: 'الجودة والتحقق الهندسي',
    stageTag: 'مصفوفة الفحص وضمان الجودة',
    summary: 'الفحوصات الهندسية الخمسة الشاملة: التجاوب عبر 5 نقاط توقف (Mobile, Tablet, Laptop, Desktop, 4K)، انعدام الطفحان الأفقي (Zero Overflow)، سهولة الوصول WCAG AA، التباين، والتحقق عبر أوامر الطرفية.',
    tags: ['QA Matrix', 'Responsive', 'Breakpoints', 'Zero Overflow', 'A11y', 'Contrast', 'Automated Verification', 'Lighthouse'],
    contentTypes: ['checklist', 'code'],
    diagramCount: 0,
    promptCount: 2,
    codeSnippetCount: 4,
    checklistCount: 7,
    readingTimeMinutes: calculateReadingTime(topic11Html),
    htmlContent: topic11Html,

    goal: 'استعراض ونسخ برومبتات المسار الكاملة وفحص معايير الجودة والتحقق.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
  {
    id: 'topic-12',
    number: '12',
    slug: 'borrowhub-reference',
    title: 'BorrowHub والمراجع: الأدوات والقوالب والقاموس وFAQ',
    subtitle: 'حالة تطبيقية موثقة مع حدود واضحة ومواد مرجعية',
    category: 'reference',
    categoryName: 'المراجع والقاموس التقني',
    stageTag: 'الأسئلة والقاموس الهندسي',
    summary: 'أسئلة الفهم الجوهرية الخمسة وأجوبتها المعمارية، القواعد الذهبية الإلزامية للمهندس، جدول البرومبتات الكامل الجاهز للنسخ الفوري بنقرة واحدة، وقاموس المصطلحات البرمجية والمعمارية.',
    tags: ['FAQ', 'Golden Rules', 'Prompt Table', 'Architecture Glossary', 'Terminology', 'Copyable Prompts', 'Quick Reference'],
    contentTypes: ['glossary', 'prompt', 'code'],
    diagramCount: 0,
    promptCount: 8,
    codeSnippetCount: 5,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic12Html),
    htmlContent: topic12Html,

    goal: 'مراجعة دراسة حالة BorrowHub والمواد المرجعية والأسئلة الشائعة والقاموس الهندسي.',
    prerequisites: [],
    steps: [],
    promptRefs: [],
    outputs: [],
    checklist: [],
    publicationStatus: 'legacy-pending-migration',
  },
];

/**
 * Wave-2 topic sources registry:
 * Each Wave-2 ticket creates a module under `src/data/topics/wave2/` exporting `TopicItem[]`.
 * To register topics, each ticket makes ONLY two one-line edits in this file:
 *   1. Import line at top of file:
 *      import { myTopicEntries } from '@/src/data/topics/wave2/<ticketModule>.ts';
 *   2. Topic source line inside WAVE2_TOPIC_SOURCES array below:
 *      myTopicEntries,
 */
export const WAVE2_TOPIC_SOURCES: TopicItem[][] = [
  t02Entries,
  t03Entries,
];

/**
 * Computes assembled topic sequence:
 * - Positioned topics (sequencePosition defined) come FIRST, sorted ascending by sequencePosition.
 * - Ties preserve insertion order.
 * - Unpositioned legacy anchors (02–12) keep their relative order AFTER the positioned block.
 * - Positioned topic-01 (sequencePosition: 1) stays at the front.
 */
function assembleTopics(): TopicItem[] {
  const all = [...LEGACY_TOPICS, ...WAVE2_TOPIC_SOURCES.flat()];
  const positioned = all
    .filter((t) => t.sequencePosition !== undefined)
    .sort((a, b) => a.sequencePosition! - b.sequencePosition!);
  const unpositioned = all.filter((t) => t.sequencePosition === undefined);
  return [...positioned, ...unpositioned];
}

export const UNIFIED_TOPICS: TopicItem[] = assembleTopics();
export const TOPICS = UNIFIED_TOPICS;

/**
 * Resolves any topic identifier (legacy ID like topic-05, legacy route slug, or canonical slug)
 * to its stable canonical slug.
 */
export function resolveCanonicalSlug(identifier: string): string {
  if (!identifier) return '';
  const trimmed = identifier.trim();
  if (LEGACY_TOPIC_ID_MAP[trimmed]) {
    return LEGACY_TOPIC_ID_MAP[trimmed];
  }
  if (TOPIC_SLUG_ALIASES[trimmed]) {
    return TOPIC_SLUG_ALIASES[trimmed];
  }
  return trimmed;
}

/**
 * Returns a topic by its canonical slug, legacy id (topic-NN), or alias.
 */
export function getTopicBySlug(slugOrId: string): TopicItem | undefined {
  if (!slugOrId) return undefined;
  const canonical = resolveCanonicalSlug(slugOrId);
  return UNIFIED_TOPICS.find((t) => t.slug === canonical || t.id === slugOrId || t.slug === slugOrId);
}

/**
 * Returns all topics in canonical sequence.
 */
export function getAllTopics(): TopicItem[] {
  return UNIFIED_TOPICS;
}

/**
 * Returns all route slugs (canonical + aliases + legacy IDs) for static generation and route matching.
 */
export function getAllTopicSlugs(): string[] {
  const canonicalSlugs = UNIFIED_TOPICS.map((t) => t.slug);
  const legacyIds = Object.keys(LEGACY_TOPIC_ID_MAP);
  const aliasSlugs = Object.keys(TOPIC_SLUG_ALIASES);
  return Array.from(new Set([...canonicalSlugs, ...legacyIds, ...aliasSlugs]));
}

/* =========================================================================
 * Saved Data Adapter (localStorage: bookmarks & recently-viewed)
 * Writes newly in canonical slugs; reads and translates legacy IDs through
 * the frozen map from TODAY's 12 topics.
 * ========================================================================= */

const BOOKMARKS_KEY = 'engineering_guide_bookmarks';
const RECENTLY_VIEWED_KEY = 'engineering_guide_recently_viewed';

export function readSavedBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return Array.from(new Set(list.map((id) => resolveCanonicalSlug(String(id))).filter(Boolean)));
  } catch (err) {
    console.warn('Failed reading bookmarks from localStorage:', err);
    return [];
  }
}

export function writeSavedBookmarks(slugs: string[]): string[] {
  const canonicalSlugs = Array.from(new Set(slugs.map((s) => resolveCanonicalSlug(s)).filter(Boolean)));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(canonicalSlugs));
    } catch (err) {
      console.warn('Failed writing bookmarks to localStorage:', err);
    }
  }
  return canonicalSlugs;
}

export function readSavedRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return Array.from(new Set(list.map((id) => resolveCanonicalSlug(String(id))).filter(Boolean))).slice(0, 5);
  } catch (err) {
    console.warn('Failed reading recently viewed from localStorage:', err);
    return [];
  }
}

export function writeSavedRecentlyViewed(slugs: string[]): string[] {
  const canonicalSlugs = Array.from(new Set(slugs.map((s) => resolveCanonicalSlug(s)).filter(Boolean))).slice(0, 5);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(canonicalSlugs));
    } catch (err) {
      console.warn('Failed writing recently viewed to localStorage:', err);
    }
  }
  return canonicalSlugs;
}
