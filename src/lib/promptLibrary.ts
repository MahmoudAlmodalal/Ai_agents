import fs from 'node:fs';
import path from 'node:path';
import { PROMPTS, type OperationType, type PromptEntry } from '@/src/lib/courseContent';
import { getAllTopics } from '@/src/lib/topicRegistry';

export type PromptSourceGroup = 'catalog' | 'supplementary' | 'cheatsheet-core' | 'cheatsheet-stage';
export type PromptTopicAvailability = 'available' | 'partial' | 'pending';

export interface PromptTopicReference {
  slug: string;
  title: string;
  availability: PromptTopicAvailability;
  href?: string;
}

export interface PromptLibraryRecord extends PromptEntry {
  purpose: string;
  warnings: string[];
  sourceGroup: PromptSourceGroup;
  sourceLabel: string;
  topicRefs: PromptTopicReference[];
}

type PromptDetails = Pick<PromptEntry, 'category' | 'difficulty' | 'operation' | 'inputFiles' | 'outputFiles' | 'recommendedTool'> & {
  purpose: string;
  warnings?: string[];
};

const DETAILS: Record<string, PromptDetails> = {
  '01': { category: 'اكتشاف المتطلبات', difficulty: 'مبتدئ', operation: 'تحليل فقط', purpose: 'إجراء مقابلة تدريجية لكشف احتياجات المنتج وقراراته وأسئلته المفتوحة.', inputFiles: ['فكرة المشروع وإجابات المستخدم'], outputFiles: ['قرارات معتمدة', 'افتراضات وأسئلة مفتوحة'], recommendedTool: 'محادثة ذكاء اصطناعي مع Grill Me عند توفره', warnings: ['لا تكتب كودًا ولا تخترع قواعد عمل.'] },
  '02': { category: 'المتطلبات والتوثيق', difficulty: 'متوسط', operation: 'توليد توثيق', purpose: 'تحويل إجابات مقابلة Grill Me والقرارات المعتمدة إلى وثيقة PRD منظمة.', inputFiles: ['إجابات مقابلة Grill Me', 'القرارات المعتمدة'], outputFiles: ['docs/PRD.md'], recommendedTool: 'مساعد ذكاء اصطناعي يقرأ السياق ويولّد Markdown', warnings: ['لا تحسم تعارضًا بصمت ولا تضف قرارًا غير معتمد.'] },
  '03': { category: 'المتطلبات والتوثيق', difficulty: 'متوسط', operation: 'تحليل فقط', purpose: 'مراجعة PRD نقديًا ورصد الغموض والتناقضات والثغرات القابلة للتصحيح.', inputFiles: ['docs/PRD.md'], outputFiles: ['قائمة مشكلات مع موقعها ومخاطرها وإجراء مقترح'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة مراجع مستقل', warnings: ['لا تعدّل PRD تلقائيًا.'] },
  '04': { category: 'التوثيق وإدارة النسخ', difficulty: 'مبتدئ', operation: 'توليد توثيق', purpose: 'اقتراح بنية README وdocs وشرح حفظ التوثيق وإدارته عبر GitHub.', inputFiles: ['ملفات مجلد المشروع'], outputFiles: ['اقتراح README.md وبنية docs/', 'قائمة تحقق للطالب'], recommendedTool: 'مساعد أو وكيل يستطيع فحص ملفات المشروع', warnings: ['لا تنفذ أوامر مدمرة ولا تنشر أسرارًا، واطلب قبل تغيير remote.'] },
  '05': { category: 'مخططات وتحليل', difficulty: 'متوسط', operation: 'توليد مخطط', purpose: 'نمذجة رحلات MVP المعتمدة بمخططات User Flow تشمل النجاح والخطأ.', inputFiles: ['docs/PRD.md'], outputFiles: ['docs/user-flow.md', 'مصدر Mermaid'], recommendedTool: 'مساعد يدعم Mermaid', warnings: ['لا تخترع قواعد عمل.'] },
  '06': { category: 'مخططات وتحليل', difficulty: 'متوسط', operation: 'توليد مخطط', purpose: 'إنشاء نموذج مفاهيمي للمجال مع فصل المفاهيم عن الجداول والكلاسات.', inputFiles: ['docs/PRD.md', 'docs/user-flow.md عند توفره'], outputFiles: ['docs/diagrams/domain-model.md', 'docs/diagrams/domain-model.mmd'], recommendedTool: 'مساعد يدعم Mermaid', warnings: ['لا تضف SQL أو PK/FK أو قواعد عمل غير مؤكدة.'] },
  '07': { category: 'مخططات وتحليل', difficulty: 'متوسط', operation: 'توليد مخطط', purpose: 'استخراج الممثلين وحالات الاستخدام وحدود النظام من الوثائق المعتمدة.', inputFiles: ['docs/PRD.md', 'docs/user-flow.md'], outputFiles: ['docs/diagrams/use-case.puml', 'docs/diagrams/use-case.md'], recommendedTool: 'مساعد يدعم PlantUML', warnings: ['أشر إلى قواعد الصلاحيات الناقصة بدل افتراضها.'] },
  '08': { category: 'مخططات وتحليل', difficulty: 'متوسط', operation: 'توليد مخطط', purpose: 'رسم سير العمليات والقرارات والمسارات البديلة في نطاق MVP.', inputFiles: ['PRD معتمد', 'User Flow معتمد'], outputFiles: ['docs/diagrams/activity-diagram.md', 'مصدر Mermaid'], recommendedTool: 'مساعد يدعم Mermaid', warnings: ['لا تضف خطوات أو قواعد غير موثقة.'] },
  '09': { category: 'مخططات وتحليل', difficulty: 'متوسط', operation: 'توليد مخطط', purpose: 'نمذجة تتابع الرسائل بين الممثلين ومكونات النظام لكل Use Case.', inputFiles: ['PRD', 'User Flow', 'Use Case documents'], outputFiles: ['docs/diagrams/sequence-diagrams.md', 'مصادر .mmd منفصلة'], recommendedTool: 'مساعد يدعم Mermaid', warnings: ['استخدم Backend أو API فقط إذا كان موثقًا.'] },
  '10': { category: 'مخططات وتحليل', difficulty: 'متقدم', operation: 'توليد مخطط', purpose: 'تمثيل الحالات والانتقالات الموثقة للكيانات ذات دورة الحياة.', inputFiles: ['PRD', 'مسارات المستخدم ذات الصلة'], outputFiles: ['docs/diagrams/state-diagrams.md', 'جداول الانتقالات'], recommendedTool: 'مساعد يدعم Mermaid', warnings: ['لا تخترع حالات أو انتقالات.'] },
  '11': { category: 'مخططات وتحليل', difficulty: 'متقدم', operation: 'توليد مخطط', purpose: 'إنشاء Class Diagram تصميمي مستند إلى النماذج والمخططات السابقة.', inputFiles: ['PRD', 'Domain Model', 'ERD', 'Sequence Diagrams ذات الصلة'], outputFiles: ['docs/diagrams/class-diagram.md', 'docs/diagrams/class-diagram.mmd'], recommendedTool: 'مساعد يدعم Mermaid', warnings: ['تجنب افتراضات التنفيذ أو الأطر غير المدعومة بالمصادر.'] },
  '12': { category: 'قواعد البيانات والمخططات', difficulty: 'متقدم', operation: 'توليد مخطط', purpose: 'تصميم ERD علائقي للنطاق المعتمد وإخراج DBML وMermaid قابلين للمراجعة.', inputFiles: ['docs/PRD.md', 'User Flow', 'Domain Model معتمد'], outputFiles: ['docs/database.dbml', 'docs/ERD.md', 'docs/database-review.md'], recommendedTool: 'مساعد يدعم DBML وMermaid مع مراجعة بشرية', warnings: ['ميّز الاختيار التقني عن قاعدة العمل، وأشر إلى المتطلبات الناقصة بدل اختراعها.'] },
  '13': { category: 'قواعد البيانات والمراجعة', difficulty: 'متقدم', operation: 'تحليل فقط', purpose: 'مراجعة مخطط قاعدة البيانات مقابل PRD ورصد الاتساق والتطبيع والتزامن.', inputFiles: ['docs/database.dbml', 'docs/ERD.md', 'docs/PRD.md'], outputFiles: ['docs/database-review.md'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة مراجع قواعد بيانات', warnings: ['لا تغيّر المخطط بصمت.'] },
  '14': { category: 'تجربة المستخدم والتصميم', difficulty: 'متوسط', operation: 'تحليل فقط', purpose: 'مقابلة المستخدم حول الأدوار والملاحة والشاشات والحالات وإمكانية الوصول.', inputFiles: ['PRD معتمد', 'User Flows وDiagrams المتاحة'], outputFiles: ['docs/UI_UX_REQUIREMENTS.md'], recommendedTool: 'محادثة ذكاء اصطناعي مع Grill Me عند توفره', warnings: ['لا تخترع ميزات ولا تولّد كودًا أو شاشات أثناء المقابلة.'] },
  '15': { category: 'تجربة المستخدم والتصميم', difficulty: 'متوسط', operation: 'توليد توثيق', purpose: 'إنشاء UX Blueprint وجرد الشاشات من متطلبات المنتج وتجربة المستخدم.', inputFiles: ['docs/PRD.md', 'docs/UI_UX_REQUIREMENTS.md'], outputFiles: ['docs/UX_BLUEPRINT.md', 'docs/SCREEN_INVENTORY.md'], recommendedTool: 'مساعد ذكاء اصطناعي لتوليد التوثيق', warnings: ['لا تضف ميزات مستقبلية إلى MVP.'] },
  '16': { category: 'Google Stitch والتصميم', difficulty: 'متوسط', operation: 'توليد تصميم بصري', purpose: 'صياغة master prompt مخصص لـStitch لشاشة MVP ممثلة واحدة.', inputFiles: ['PRD', 'UX_BLUEPRINT.md', 'SCREEN_INVENTORY.md', 'الهوية المعتمدة'], outputFiles: ['docs/STITCH_MASTER_PROMPT.md'], recommendedTool: 'Google Stitch مع مساعد لصياغة prompt', warnings: ['ابدأ بشاشة ممثلة واحدة؛ لا تطلب توليد جميع الشاشات دفعة واحدة.'] },
  '17': { category: 'Google Stitch والتصميم', difficulty: 'متوسط', operation: 'توليد توثيق', purpose: 'تحديد قواعد نظام التصميم من الهوية والشاشة الممثلة المعتمدة.', inputFiles: ['الهوية المعتمدة', 'شاشة Stitch الممثلة والمعتمدة'], outputFiles: ['قواعد نظام تصميم قابلة لإعادة الاستخدام'], recommendedTool: 'Google Stitch أو مساعد تصميم', warnings: ['لا تغيّر هوية العلامة المعتمدة.'] },
  '18': { category: 'Google Stitch والتصميم', difficulty: 'متقدم', operation: 'توليد تصميم بصري', purpose: 'صياغة prompt مستقل لكل شاشة MVP مع الحفاظ على قواعد التصميم المشتركة.', inputFiles: ['PRD المعتمد', 'SCREEN_INVENTORY.md', 'Design System المعتمد'], outputFiles: ['docs/STITCH_SCREEN_PROMPTS.md'], recommendedTool: 'Google Stitch مع مساعد لصياغة prompts', warnings: ['لا تحذف شاشة MVP ولا تضف ميزة جديدة.'] },
  '19': { category: 'Google Stitch والتصميم', difficulty: 'مبتدئ', operation: 'توليد تصميم بصري', purpose: 'تحسين شاشة واحدة وفق مشكلات مرصودة مع الحفاظ على النظام المعتمد.', inputFiles: ['الشاشة المختارة', 'المشكلات المرصودة', 'Design System المعتمد'], outputFiles: ['نسخة محسّنة من الشاشة المختارة'], recommendedTool: 'Google Stitch', warnings: ['لا تعِد تصميم شاشات أخرى ولا تضف ميزات.'] },
  '20': { category: 'Google Stitch والتصميم', difficulty: 'متوسط', operation: 'توليد تصميم بصري', purpose: 'ربط شاشات النموذج الأولي واختبار انتقالات الرحلات المعتمدة.', inputFiles: ['الشاشات المعتمدة', 'UX Blueprint'], outputFiles: ['نموذج تفاعلي متصل', 'تقرير بالشاشات الناقصة أو المنفصلة'], recommendedTool: 'Google Stitch أو أداة النمذجة المتاحة', warnings: ['لا تخترع تدفقات أو ميزات.'] },
  '21': { category: 'تجربة المستخدم والمراجعة', difficulty: 'متقدم', operation: 'تحليل فقط', purpose: 'مراجعة شاشات Stitch والنموذج الأولي مقابل المتطلبات ونظام التصميم.', inputFiles: ['شاشات Stitch', 'Prototype', 'PRD', 'Design System'], outputFiles: ['قائمة مشكلات UX مصنفة حسب الخطورة', 'اقتراحات إصلاح'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة UX Auditor', warnings: ['اقترح إصلاحات دقيقة دون توسيع النطاق بصمت.'] },
  '22': { category: 'التكامل والأدوات', difficulty: 'متوسط', operation: 'تحليل فقط', purpose: 'التحقق من اتصال Stitch MCP وتحديد المشروع والشاشات المقصودة.', inputFiles: ['اتصال Stitch MCP', 'المشروع المقصود'], outputFiles: ['قائمة المشاريع ومعرفات الشاشات', 'نتيجة التحقق'], recommendedTool: 'Stitch MCP متصل', warnings: ['لا تنشئ أو تحدّث أو تحذف شيئًا، ولا تكشف مفاتيح API.'] },
  '23': { category: 'التكامل والتصميم', difficulty: 'متقدم', operation: 'توليد توثيق', purpose: 'استخراج قيم التصميم المؤكدة من Stitch إلى DESIGN.md وتوثيق المراجع.', inputFiles: ['Stitch MCP متصل أو exports مقدمة', 'الشاشات المعتمدة'], outputFiles: ['DESIGN.md', 'docs/STITCH_SCREEN_REFERENCES.md'], recommendedTool: 'Stitch MCP أو ملفات التصدير ومساعد تصميم', warnings: ['لا تخترع قيمًا؛ أبلغ عن الخصائص غير المتاحة ولا تعدّل شاشات Stitch.'] },
  '24': { category: 'تخطيط الواجهة', difficulty: 'متقدم', operation: 'توليد توثيق', purpose: 'إعداد خطة Frontend فقط تتضمن المسارات والمكونات والبيانات والمهام.', inputFiles: ['PRD', 'SCREEN_INVENTORY', 'UX_BLUEPRINT', 'DESIGN.md', 'مراجع Stitch'], outputFiles: ['docs/FRONTEND_PLAN.md', 'docs/FRONTEND_TASKS.md', 'docs/ROUTES_MAP.md', 'docs/COMPONENT_ARCHITECTURE.md', 'docs/FRONTEND_DATA_CONTRACTS.md'], recommendedTool: 'Coding Agent أو مساعد معماري Next.js', warnings: ['لا تكتب كودًا الآن ولا تنفذ Backend أو قاعدة بيانات أو مصادقة حقيقية.'] },
  '25': { category: 'مراجعة الواجهة', difficulty: 'متقدم', operation: 'تحليل فقط', purpose: 'مراجعة Feature Brief والتصميم والمكونات واقتراح قرارات UI/UX قبل البرمجة.', inputFiles: ['FEATURE_BRIEF', 'DESIGN.md', 'تصميم Stitch', 'المكونات المشتركة الحالية'], outputFiles: ['توصيات تخطيط وتجاوب وإتاحة وتفاعل'], recommendedTool: 'UI/UX Pro Max skill', warnings: ['لا تستبدل الهوية المعتمدة ولا تعدّل الملفات في هذه المراجعة.'] },
  '26': { category: 'تخطيط الواجهة', difficulty: 'متقدم', operation: 'تحليل فقط', purpose: 'تحديد المرحلة التالية الجاهزة وإعداد Feature Brief محدد النطاق.', inputFiles: ['FRONTEND_PLAN.md', 'FRONTEND_TASKS.md', 'حالة المستودع الفعلية'], outputFiles: ['FEATURE_BRIEF'], recommendedTool: 'Coding Agent يقرأ المستودع', warnings: ['لا تبدأ التنفيذ في هذا البرومبت.'] },
  '27': { category: 'Spec Kit وتنظيم المواصفات', difficulty: 'متقدم', operation: 'توليد توثيق', purpose: 'إنشاء Constitution لمشروع Frontend يثبت قواعد التنفيذ ومصادر الحقيقة.', inputFiles: ['قواعد المشروع المعتمدة', 'PRD', 'Stitch references', 'DESIGN.md'], outputFiles: ['Spec Kit Constitution'], recommendedTool: 'Spec Kit `/speckit-constitution`', warnings: ['النطاق Frontend فقط؛ لا تنفذ Backend ولا ميزات غير معتمدة.'] },
  '28': { category: 'Spec Kit وتنفيذ الميزات', difficulty: 'متقدم', operation: 'توليد توثيق', purpose: 'اتباع دورة Spec Kit المتتابعة لصياغة مواصفات Feature واحدة وتخطيطها وتنفيذها والتحقق منها.', inputFiles: ['FEATURE_BRIEF', 'PRD', 'الشاشات', 'DESIGN.md', 'حالة المستودع'], outputFiles: ['مواصفات وخطة ومهام Feature الحالية'], recommendedTool: 'Spec Kit داخل Coding Agent', warnings: ['شغّل كل مرحلة منفصلة، ونفّذ المهمة المعلقة التالية فقط ثم توقف.'] },
  '29': { category: 'الفحص والجودة', difficulty: 'متقدم', operation: 'تنفيذ اختبارات', purpose: 'فحص واجهة Frontend وإمكانية الوصول والتجاوب وتوثيق النتائج الفعلية.', inputFiles: ['الشاشات والتنقل والنماذج الفعلية', 'PRD', 'UX Blueprint', 'SCREEN_INVENTORY', 'DESIGN.md'], outputFiles: ['docs/FINAL_FRONTEND_QA.md'], recommendedTool: 'مراجع Frontend وAccessibility مع الفحوصات المتاحة', warnings: ['لا تدّع نجاح فحص لم يُنفّذ، ولا تبنِ Backend.'] },
  '30': { category: 'التسليم وإدارة النسخ', difficulty: 'متوسط', operation: 'توليد توثيق', purpose: 'إعداد خطة Commit وملخص Pull Request لتسليم مراجعة قابلة للفهم.', inputFiles: ['git status', 'الملفات المتغيرة', 'الأسرار', 'تقرير QA النهائي'], outputFiles: ['خطة Commit', 'ملخص Pull Request'], recommendedTool: 'مساعد تطوير يراجع المستودع', warnings: ['لا تكشف المفاتيح ولا تدفع التغييرات أو تفتح PR دون موافقة.'] },
  '31': { category: 'تخطيط وتنفيذ الواجهة', difficulty: 'متقدم', operation: 'توليد توثيق', purpose: 'تحويل المتطلبات والتصميم المعتمد إلى Phases وTasks ثم اختيار أول مهمة جاهزة فقط.', inputFiles: ['PROJECT_CONTEXT.md', 'PRD.md', 'DESIGN.md', 'STITCH_SCREEN_REFERENCES.md', 'ملفات FRONTEND الحالية إن وجدت'], outputFiles: ['docs/FRONTEND_DISCOVERY.md', 'docs/FRONTEND_PLAN.md', 'docs/FRONTEND_PHASES.md', 'docs/FRONTEND_TASKS.md', 'docs/ROUTES_MAP.md', 'docs/COMPONENT_ARCHITECTURE.md', 'docs/FRONTEND_DATA_CONTRACTS.md', 'تنفيذ أول Task فقط بعد اعتماد الخطة'], recommendedTool: 'Google AI Studio أو Coding Agent مع مراجعة بشرية وGitHub', warnings: ['حلّل وخطّط أولًا؛ اختر أول Task جاهزة فقط، ثم تحقق وتوقف. لا تنشئ Backend.'] },
};

const TOPIC_SLUGS: Record<string, string[]> = {
  'cheatsheet-a-prepare-and-execute': ['frontend-incremental-implementation'],
  'cheatsheet-b-review': ['frontend-incremental-implementation'],
  'cheatsheet-c-handoff': ['github-docs-collaboration'],
  'stage-example-prd-planning': ['prd-specification'],
  'stage-example-database': ['relational-erd-design'],
  'stage-example-uiux': ['ux-blueprint', 'screen-inventory'],
  'stage-example-nextjs-frontend': ['frontend-architecture-planning'],
  'stage-example-backend-api': ['backend-architecture-api-contracts'],
  'stage-example-security': ['auth-permissions'],
  'stage-example-deployment': ['backend-database-deployment'],
};

const TOPIC_TITLES: Record<string, string> = { 'backend-database-deployment': 'نشر Backend وربطه بقاعدة البيانات' };
const topicCatalog = getAllTopics();
const topicsBySlug = new Map(topicCatalog.map((topic) => [topic.slug, topic]));

function topicReferences(slugs: string[]): PromptTopicReference[] {
  return Array.from(new Set(slugs)).map((slug) => {
    const topic = topicsBySlug.get(slug);
    if (!topic) return { slug, title: TOPIC_TITLES[slug] ?? slug, availability: 'pending' };
    const availability = topic.publicationStatus === 'unified-complete' ? 'available' : 'partial';
    return { slug: topic.slug, title: topic.title, availability, href: `/learn/${topic.slug}` };
  });
}

function sourcePromptReferences(prompt: PromptEntry): PromptTopicReference[] {
  return topicReferences(topicCatalog.filter((topic) => topic.promptRefs.includes(prompt.slug)).map((topic) => topic.slug));
}

const CHEATSHEET_SOURCE = fs.readFileSync(path.join(process.cwd(), 'docs/PRACTICAL_PROMPTS_CHEATSHEET.md'), 'utf8');

function textBlockForHeading(heading: string): string {
  const start = CHEATSHEET_SOURCE.indexOf(heading);
  if (start < 0) return '';
  return CHEATSHEET_SOURCE.slice(start).match(/```text\s*\n([\s\S]*?)\n```/)?.[1]?.trim() ?? '';
}

function createCheatsheetPrompt(input: {
  slug: string; number: string; title: string; heading: string; sourceGroup: PromptSourceGroup; sourceLabel: string;
  category: string; purpose: string; warnings?: string[]; operation: OperationType; inputFiles: string[]; outputFiles: string[];
  recommendedTool: string; topicSlugs: string[];
}): PromptLibraryRecord {
  const body = textBlockForHeading(input.heading);
  if (!body) throw new Error(`Missing source prompt block for heading: ${input.heading}`);
  return {
    slug: input.slug, number: input.number, title: input.title, category: input.category, difficulty: 'مبتدئ',
    operation: input.operation, inputFiles: input.inputFiles, outputFiles: input.outputFiles,
    recommendedTool: input.recommendedTool, body, purpose: input.purpose,
    warnings: input.warnings ?? ['احذف الحقول بين الأقواس وراجع المخرج مقابل وثائق مشروعك قبل اعتماده.'],
    sourceGroup: input.sourceGroup, sourceLabel: input.sourceLabel, topicRefs: topicReferences(input.topicSlugs),
  };
}

const CHEATSHEET_PROMPTS: PromptLibraryRecord[] = [
  createCheatsheetPrompt({ slug: 'cheatsheet-a-prepare-and-execute', number: 'A', title: 'التحضير والتنفيذ', heading: '## Prompt A — التحضير والتنفيذ', sourceGroup: 'cheatsheet-core', sourceLabel: 'البرومبتات العملية · Prompt A', category: 'قوالب عامة', purpose: 'تحديد مخرج المحاضرة ومصادره قبل تنفيذ تغيير واحد والتحقق منه.', operation: 'تعديل كود', inputFiles: ['اسم المشروع والمجال والمستخدمون', 'عنوان المحاضرة', 'المخرج المطلوب'], outputFiles: ['مخرج المحاضرة المحدد', 'ملخص التغيير والفحوصات'], recommendedTool: 'Coding Agent أو مساعد يقرأ ملفات المشروع', topicSlugs: TOPIC_SLUGS['cheatsheet-a-prepare-and-execute'] }),
  createCheatsheetPrompt({ slug: 'cheatsheet-b-review', number: 'B', title: 'المراجعة', heading: '## Prompt B — المراجعة', sourceGroup: 'cheatsheet-core', sourceLabel: 'البرومبتات العملية · Prompt B', category: 'قوالب عامة', purpose: 'مراجعة مخرج محاضرة مقابل وثائق المشروع وتحديد أعلى عيب تأثيرًا.', operation: 'تحليل فقط', inputFiles: ['مخرج المحاضرة', 'PRD وSRS أو التصميم والعقود المتاحة'], outputFiles: ['جدول PASS وFAIL وOPEN QUESTION', 'أعلى عيب مقترح للإصلاح'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة Reviewer مستقل', topicSlugs: TOPIC_SLUGS['cheatsheet-b-review'] }),
  createCheatsheetPrompt({ slug: 'cheatsheet-c-handoff', number: 'C', title: 'التسليم', heading: '## Prompt C — التسليم', sourceGroup: 'cheatsheet-core', sourceLabel: 'البرومبتات العملية · Prompt C', category: 'قوالب عامة', purpose: 'إعداد ملخص تسليم يذكر الملفات والقرارات والأسئلة والفحوصات.', operation: 'توليد توثيق', inputFiles: ['رقم المحاضرة', 'المخرج والملفات', 'القرارات والأسئلة والفحوصات'], outputFiles: ['ملاحظة Handoff', 'رسالة Commit مقترحة'], recommendedTool: 'مساعد ذكاء اصطناعي يراجع ملخص العمل', topicSlugs: TOPIC_SLUGS['cheatsheet-c-handoff'] }),
  createCheatsheetPrompt({ slug: 'stage-example-prd-planning', number: 'مرحلة 1', title: 'مثال مرحلي: التخطيط وPRD', heading: '### التخطيط والـPRD', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: التخطيط وPRD', category: 'أمثلة مرحلية', purpose: 'استكشاف الفكرة ثم إعداد PRD بعد اعتماد نطاقها وقراراتها.', operation: 'توليد توثيق', inputFiles: ['فكرة المشروع', 'المجال', 'المستخدمون المستهدفون'], outputFiles: ['PRD يتضمن MVP وUser Stories وAcceptance Criteria والحالات الحدية'], recommendedTool: 'مساعد ذكاء اصطناعي', topicSlugs: TOPIC_SLUGS['stage-example-prd-planning'] }),
  createCheatsheetPrompt({ slug: 'stage-example-database', number: 'مرحلة 2', title: 'مثال مرحلي: قاعدة البيانات', heading: '### قاعدة البيانات', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: قاعدة البيانات', category: 'أمثلة مرحلية', purpose: 'تصميم ERD وDBML من PRD وSRS وربط كل قرار بقاعدة عمل.', operation: 'توليد مخطط', inputFiles: ['PRD', 'SRS'], outputFiles: ['ERD', 'DBML', 'مراجعة PK وFK وUNIQUE وCHECK والتطبيع'], recommendedTool: 'مساعد يدعم ERD وDBML', topicSlugs: TOPIC_SLUGS['stage-example-database'] }),
  createCheatsheetPrompt({ slug: 'stage-example-uiux', number: 'مرحلة 3', title: 'مثال مرحلي: تصميم الواجهة', heading: '### تصميم الواجهة', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: تصميم الواجهة', category: 'أمثلة مرحلية', purpose: 'تحويل User Flow إلى Screen Inventory وUX Blueprint مع حالات الشاشة.', operation: 'توليد توثيق', inputFiles: ['User Flow للمشروع'], outputFiles: ['Screen Inventory', 'UX Blueprint'], recommendedTool: 'مساعد ذكاء اصطناعي لتخطيط UX', topicSlugs: TOPIC_SLUGS['stage-example-uiux'] }),
  createCheatsheetPrompt({ slug: 'stage-example-nextjs-frontend', number: 'مرحلة 4', title: 'مثال مرحلي: Next.js وFrontend', heading: '### Next.js وFrontend', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: Next.js وFrontend', category: 'أمثلة مرحلية', purpose: 'تخطيط Routes وComponents وData Contracts ثم تنفيذ Route ومهمة واحدة.', operation: 'توليد توثيق', inputFiles: ['PRD', 'DESIGN.md'], outputFiles: ['خطة Routes وComponents وData Contracts', 'Route واحدة ومهمة واحدة'], recommendedTool: 'Coding Agent يدعم Next.js App Router', warnings: ['لا تنفذ إلا Route ومهمة واحدة في الدورة.'], topicSlugs: TOPIC_SLUGS['stage-example-nextjs-frontend'] }),
  createCheatsheetPrompt({ slug: 'stage-example-backend-api', number: 'مرحلة 5', title: 'مثال مرحلي: Backend وAPI', heading: '### Backend وAPI', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: Backend وAPI', category: 'أمثلة مرحلية', purpose: 'تحويل User Story معتمدة إلى API Contract قابل للمراجعة.', operation: 'توليد توثيق', inputFiles: ['User Story معتمدة'], outputFiles: ['API Contract مع endpoint وmethod وrequest/response وstatus codes وvalidation وerrors'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة Backend Architect', warnings: ['لا تكتب كودًا قبل اعتماد العقد، ولا تضف API خارج PRD.'], topicSlugs: TOPIC_SLUGS['stage-example-backend-api'] }),
  createCheatsheetPrompt({ slug: 'stage-example-security', number: 'مرحلة 6', title: 'مثال مرحلي: الأمن', heading: '### الأمن', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: الأمن', category: 'أمثلة مرحلية', purpose: 'مراجعة الأسرار والصلاحيات وملكية البيانات مع فصل Authentication عن Authorization.', operation: 'تحليل فقط', inputFiles: ['سياق المشروع وملفات الصلاحيات المتاحة'], outputFiles: ['Role Matrix', 'Threat List'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة مراجع أمن', warnings: ['لا تطبع tokens أو passwords أو مفاتيح API، ولا تضعها في Client أو GitHub.'], topicSlugs: TOPIC_SLUGS['stage-example-security'] }),
  createCheatsheetPrompt({ slug: 'stage-example-deployment', number: 'مرحلة 7', title: 'مثال مرحلي: النشر', heading: '### النشر', sourceGroup: 'cheatsheet-stage', sourceLabel: 'البرومبتات العملية · مثال مرحلي: النشر', category: 'أمثلة مرحلية', purpose: 'إعداد Deployment Plan يذكر البيئات ومتغيرات البيئة والفحوصات والسجلات والرجوع.', operation: 'توليد توثيق', inputFiles: ['مشروع التطبيق وبيئاته'], outputFiles: ['Deployment Plan', 'أسماء متغيرات البيئة', 'Health Check وLogs وRollback'], recommendedTool: 'مساعد ذكاء اصطناعي بصفة Deployment Engineer', warnings: ['اذكر أسماء المتغيرات فقط ولا تعرض قيم الأسرار.'], topicSlugs: TOPIC_SLUGS['stage-example-deployment'] }),
];

const CATALOG_PROMPTS: PromptLibraryRecord[] = PROMPTS.map((prompt) => {
  const details = DETAILS[prompt.number];
  if (!details) throw new Error(`Missing prompt library metadata for prompt ${prompt.number}`);
  const sourceGroup: PromptSourceGroup = prompt.number === '31' ? 'supplementary' : 'catalog';
  return {
    ...prompt,
    ...details,
    warnings: details.warnings ?? ['لا يحدد المصدر تحذيرًا منفصلًا؛ راجع قيود الاستخدام داخل النص الكامل.'],
    sourceGroup,
    sourceLabel: prompt.number === '31' ? 'المصدر الإضافي: خطة التنفيذ المرحلي في courseContent.ts' : `وثيقة محتوى الموقع · PROMPT ${prompt.number}`,
    topicRefs: sourcePromptReferences(prompt),
  };
});

export const PROMPT_LIBRARY: PromptLibraryRecord[] = [...CATALOG_PROMPTS, ...CHEATSHEET_PROMPTS];

export function getPromptLibraryRecord(slug: string): PromptLibraryRecord | undefined {
  return PROMPT_LIBRARY.find((prompt) => prompt.slug === slug);
}
