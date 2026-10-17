import fs from 'node:fs';
import path from 'node:path';

export type OperationType =
  | 'تحليل فقط'
  | 'توليد توثيق'
  | 'توليد مخطط'
  | 'توليد تصميم بصري'
  | 'تعديل كود'
  | 'تنفيذ اختبارات';

export interface CourseTopic {
  slug: string;
  titleAr: string;
  titleEn: string;
  phase: string;
  sourceHeading: string;
  summary: string;
  outputs: string[];
}

export interface PromptEntry {
  slug: string;
  number: string;
  title: string;
  category: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  operation: OperationType;
  inputFiles: string[];
  outputFiles: string[];
  recommendedTool: string;
  body: string;
}

const SOURCE_PATH = path.join(process.cwd(), 'Weapon_of_the_Era_Website_Content_AR.md');
const source = fs.readFileSync(SOURCE_PATH, 'utf8');

export const COURSE_TOPICS: CourseTopic[] = [
  { slug: 'fundamentals-ai-agents', titleAr: 'فهم AI Agents', titleEn: 'Understanding AI Agents', phase: 'الأساسيات', sourceHeading: '## ما الفرق بين AI Agent وSkill وMCP؟', summary: 'افهم الفرق بين Agent وSkill وMCP وPrompt، وكيف تُدار الصلاحيات والسياق والمراجعة البشرية.', outputs: ['PROJECT_CONTEXT.md'] },
  { slug: 'requirements-discovery', titleAr: 'اكتشاف المتطلبات والفكرة', titleEn: 'Project Discovery & Requirements', phase: 'المتطلبات', sourceHeading: '## خطوات التطبيق', summary: 'حوّل فكرة غامضة إلى مشكلة ومستخدمين ونطاق MVP وقواعد عمل قابلة للمراجعة.', outputs: ['docs/PROJECT_CONTEXT.md'] },
  { slug: 'requirements-grill-me', titleAr: 'Grill Me — مقابلة اكتشاف المتطلبات', titleEn: 'Grill Me', phase: 'المتطلبات', sourceHeading: '## PROMPT 01 — Grill Me: Product Discovery', summary: 'استخدم سؤالًا واحدًا في كل مرة لكشف الغموض والافتراضات والتناقضات قبل كتابة PRD.', outputs: ['قرارات معتمدة', 'قائمة أسئلة مفتوحة'] },
  { slug: 'requirements-prd', titleAr: 'وثيقة متطلبات المنتج PRD', titleEn: 'Product Requirements Document', phase: 'المتطلبات', sourceHeading: '## بنية الـPRD المطلوبة — 27 قسمًا', summary: 'أنشئ وراجع docs/PRD.md بأقسامه السبعة والعشرين، مع فصل المتطلبات عن التوصيات.', outputs: ['docs/PRD.md', 'docs/PRD_REVIEW.md'] },
  { slug: 'github', titleAr: 'Git وGitHub وتوثيق المشروع', titleEn: 'Git & GitHub', phase: 'التوثيق', sourceHeading: '### D. GitHub Hands-On', summary: 'أنشئ Repository منظمًا، احفظ وثائق المشروع، واعمل بفروع وPull Requests دون تسريب الأسرار.', outputs: ['README.md', 'docs/PRD.md'] },
  { slug: 'user-flow', titleAr: 'مسار المستخدم User Flow', titleEn: 'User Flow', phase: 'التحليل', sourceHeading: '## E. User Flow باستخدام Mermaid', summary: 'مثّل أهداف المستخدم ونقاط القرار ومسارات النجاح والخطأ باستخدام Mermaid flowchart.', outputs: ['docs/user-flow.md'] },
  { slug: 'domain-model', titleAr: 'النموذج المفاهيمي Domain Model', titleEn: 'Conceptual Domain Model', phase: 'التحليل', sourceHeading: '## 7. Domain Model', summary: 'استخرج مفاهيم المجال والعلاقات التجارية دون خلط النموذج المفاهيمي مع Class Diagram أو ERD.', outputs: ['docs/diagrams/domain-model.md', 'docs/diagrams/domain-model.mmd'] },
  { slug: 'diagrams', titleAr: 'UML ومخططات النظام', titleEn: 'UML & System Diagrams', phase: 'التحليل', sourceHeading: '## 10. مختبر المخططات', summary: 'اختر المخطط الذي يجيب السؤال الصحيح: Use Case أو Activity أو Sequence أو State أو Class.', outputs: ['docs/diagrams/*.puml', 'docs/diagrams/*.md'] },
  { slug: 'database-erd', titleAr: 'تحليل قاعدة البيانات وERD', titleEn: 'Database Analysis & ERD', phase: 'البيانات', sourceHeading: '## 9. Database Analysis & ERD', summary: 'صمّم الجداول والمفاتيح والعلاقات والقيود، ثم ولّد DBML وERD قابلين للمراجعة.', outputs: ['docs/database.dbml', 'docs/ERD.md', 'docs/database-review.md'] },
  { slug: 'ui-ux', titleAr: 'أساسيات UI وUX', titleEn: 'UI/UX Fundamentals', phase: 'التجربة', sourceHeading: '## مفاهيم تصميم مهمة', summary: 'تعلم الفرق بين UI وUX، وبناء تجربة قابلة للاستخدام ومتجاوبة وميسرة وملائمة للعربية RTL.', outputs: ['قرارات تجربة المستخدم'] },
  { slug: 'ui-ux-discovery', titleAr: 'اكتشاف الشاشات والتخطيط UX', titleEn: 'UX Discovery & Screen Planning', phase: 'التجربة', sourceHeading: '## 11. UI/UX Discovery & Screen Planning', summary: 'حوّل PRD إلى Sitemap وUX Blueprint وScreen Inventory مع حالات كل شاشة.', outputs: ['docs/UI_UX_REQUIREMENTS.md', 'docs/UX_BLUEPRINT.md', 'docs/SCREEN_INVENTORY.md'] },
  { slug: 'google-stitch', titleAr: 'Google Stitch والتصميم المرئي', titleEn: 'Google Stitch', phase: 'التصميم', sourceHeading: '## 12. Google Stitch', summary: 'صمّم شاشة ممثلة أولًا، ثم نظام تصميم وشاشات منفصلة مع مراجعة واتساق وتدفق تفاعلي.', outputs: ['STITCH_MASTER_PROMPT.md', 'STITCH_SCREEN_PROMPTS.md'] },
  { slug: 'design-md', titleAr: 'Design System وDESIGN.md', titleEn: 'Design System & DESIGN.md', phase: 'التصميم', sourceHeading: '## 13. Design System & DESIGN.md', summary: 'استخرج القيم المرئية المعتمدة من Stitch إلى عقد تصميم يستخدمه فريق Frontend.', outputs: ['DESIGN.md'] },
  { slug: 'stitch-mcp', titleAr: 'تكامل Stitch MCP', titleEn: 'Stitch MCP Integration', phase: 'التكامل', sourceHeading: '## 14. Stitch MCP Integration', summary: 'اربط Stitch بـCoding Agent بأمان، تحقق من الاتصال، واستخرج مراجع التصميم المعتمدة.', outputs: ['مراجع Stitch موثقة'] },
  { slug: 'frontend-planning', titleAr: 'تخطيط Next.js Frontend', titleEn: 'Next.js Frontend Planning', phase: 'الفرونت إند', sourceHeading: '## 15. Next.js Frontend Planning', summary: 'حوّل التصميم المعتمد إلى خطة Frontend فقط: routes وcomponents وmock data وحالات UI.', outputs: ['docs/FRONTEND_PLAN.md', 'docs/FRONTEND_TASKS.md', 'docs/ROUTES_MAP.md', 'docs/COMPONENT_ARCHITECTURE.md', 'docs/FRONTEND_DATA_CONTRACTS.md'] },
  { slug: 'ui-ux-pro-max', titleAr: 'UI/UX Pro Max', titleEn: 'UI/UX Pro Max Skill', phase: 'الفرونت إند', sourceHeading: '## 17. UI/UX Pro Max Skill', summary: 'راجع الاتساق البصري والاستجابة والإتاحة قبل التنفيذ وبعده، مع أولوية DESIGN.md المعتمد.', outputs: ['تقرير مراجعة UI/UX'] },
  { slug: 'spec-kit', titleAr: 'GitHub Spec Kit', titleEn: 'GitHub Spec Kit', phase: 'التنفيذ', sourceHeading: '## 18. GitHub Spec Kit', summary: 'اتبع Constitution ثم Specify ثم Clarify ثم Plan ثم Tasks ثم Analyze ثم Implement ثم Verify.', outputs: ['spec.md', 'plan.md', 'tasks.md'] },
  { slug: 'incremental-implementation', titleAr: 'التنفيذ التدريجي بالمهام الصغيرة', titleEn: 'Incremental Frontend Implementation', phase: 'التنفيذ', sourceHeading: '## 19. Spec Kit + UI/UX Pro Max Implementation Workflow', summary: 'نفّذ ميزة منطقية أو مهمة صغيرة واحدة، تحقق منها، ثم توقف عند طلب التنفيذ التدريجي.', outputs: ['FEATURE_BRIEF.md', 'تغيير كود قابل للتحقق'] },
  { slug: 'testing-qa', titleAr: 'Testing وFrontend QA', titleEn: 'Testing & Frontend Quality Assurance', phase: 'الجودة', sourceHeading: '## 20. Testing & Frontend Quality Assurance', summary: 'افحص TypeScript وLint وBuild والتجاوب والإتاحة والتدفقات دون ادعاء نجاح فحص لم يُنفّذ.', outputs: ['docs/FINAL_FRONTEND_QA.md'] },
  { slug: 'prompt-library', titleAr: 'مكتبة البرومبتات', titleEn: 'Prompt Library', phase: 'المراجع', sourceHeading: '# 9. مكتبة البرومبتات `/prompts`', summary: 'ابحث وانسخ البرومبتات الكاملة مع مدخلاتها ومخرجاتها وتصنيف العملية.', outputs: ['Prompts indexed by slug'] },
  { slug: 'tools', titleAr: 'دليل الأدوات والتثبيت', titleEn: 'Tools & Installation', phase: 'المراجع', sourceHeading: '# 12. الأدوات والتثبيت `/tools`', summary: 'تعرف على أدوات المسار وروابطها الرسمية ومتطلبات التثبيت والتحقق والمشكلات الشائعة.', outputs: ['Tool setup notes'] },
  { slug: 'templates', titleAr: 'القوالب والملفات', titleEn: 'Templates & Project Files', phase: 'المراجع', sourceHeading: '# 13. القوالب والملفات `/templates`', summary: 'اعرف متى ينشأ كل ملف، وماذا يحتوي، ومنشئه، وكيفية مراجعته.', outputs: ['Template lifecycle map'] },
  { slug: 'borrowhub', titleAr: 'دراسة حالة BorrowHub', titleEn: 'BorrowHub Case Study', phase: 'التطبيق', sourceHeading: '# 11. ورشة BorrowHub `/borrowhub`', summary: 'طبّق المسار على نظام استعارة معدات جامعي مع الحفاظ على قواعد العمل الموثقة.', outputs: ['Case study documentation'] },
  { slug: 'glossary', titleAr: 'القاموس التقني والأسئلة الشائعة', titleEn: 'Glossary & FAQ', phase: 'المراجع', sourceHeading: '# 14. القاموس `/glossary`', summary: 'ابحث عن المصطلحات بالعربية والإنجليزية وافهم الفروق بين النماذج والأدوات.', outputs: ['Glossary index'] },
];

function sectionFromHeading(heading: string): string {
  const start = source.indexOf(heading);
  if (start < 0) return 'هذا القسم يحتاج إلى مراجعة المصدر قبل النشر النهائي.';
  const rest = source.slice(start + heading.length);
  const next = rest.search(/\n#{1,2} /);
  return (next < 0 ? rest : rest.slice(0, next)).trim();
}

export function getTopic(slug: string): CourseTopic | undefined {
  return COURSE_TOPICS.find((topic) => topic.slug === slug);
}

export function getTopicContent(topic: CourseTopic): string {
  return sectionFromHeading(topic.sourceHeading);
}

const promptHeadingPattern = /^## PROMPT (\d{2}) — (.+)$/gm;

export const PROMPTS: PromptEntry[] = Array.from(source.matchAll(promptHeadingPattern)).map((match, index, matches) => {
  const start = match.index ?? 0;
  const end = matches[index + 1]?.index ?? source.length;
  const body = source.slice(start + match[0].length, end).trim();
  const number = match[1];
  const title = match[2].trim();
  const slug = `prompt-${number}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${number}`}`;
  return {
    slug,
    number,
    title,
    category: number <= '04' ? 'المتطلبات والتوثيق' : number <= '13' ? 'التحليل والبيانات' : number <= '23' ? 'التصميم والتكامل' : 'الفرونت إند والجودة',
    difficulty: number <= '05' ? 'مبتدئ' : number <= '23' ? 'متوسط' : 'متقدم',
    operation: number === '05' || number === '06' || number === '07' || number === '08' || number === '09' || number === '10' || number === '11' || number === '12' ? 'توليد مخطط' : number >= '24' ? 'تعديل كود' : 'توليد توثيق',
    inputFiles: ['PRD.md', 'PROJECT_CONTEXT.md'],
    outputFiles: ['راجع قسم Expected output داخل البرومبت قبل التنفيذ.'],
    recommendedTool: 'Coding Agent مع مراجعة بشرية',
    body,
  } satisfies PromptEntry;
});

export function getPrompt(slug: string): PromptEntry | undefined {
  return PROMPTS.find((prompt) => prompt.slug === slug);
}

export function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```([\w-]*)\n([\s\S]*?)```/g, '<pre class="course-code" dir="ltr"><code>$2</code></pre>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li><strong>$1.</strong> $2</li>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br />');
}
