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

const SUPPLEMENTARY_CONTENT: Record<string, string> = {
  'google-ai-studio-stitch-workflow': `
## لماذا نستخدم Google AI Studio وGoogle Stitch؟

هذا المسار يفصل بين مرحلتين مختلفتين: نستخدم **Google AI Studio** للتجربة مع نماذج Gemini، تحليل المتطلبات، تحسين البرومبتات، ومراجعة الخطط؛ ونستخدم **Google Stitch** لتوليد واستكشاف واجهات Web وMobile من وصف نصي أو مرجع بصري ثم تصدير التصميم أو كود Frontend قابل للمراجعة.

روابط الخدمة الرسمية: [Google AI Studio](https://aistudio.google.com/) و[Google Stitch](https://stitch.withgoogle.com/) و[توثيق Stitch MCP](https://stitch.withgoogle.com/docs/mcp/setup).

## تنبيه مهم حول الـTokens والـquota

لا نعد بأن استخدام Stitch لا يستهلك أي quota أو لا يرتبط بحساب Google. الخدمات قد تكون لها حدود استخدام وشروط مستقلة، بينما Gemini API يقيس عادةً Requests per Minute وTokens per Minute وRequests per Day على مستوى المشروع، وليس على مستوى مفتاح API فقط. راجع صفحة Usage وRate limits في AI Studio قبل تنفيذ جلسات طويلة.

إذا كان المقصود هو عدم استهلاك **باقة Coding Agent أو API key خاصة بمشروعك** عند تصميم الواجهات داخل Stitch، فهذه ليست ضمانة عامة يمكن نشرها كحقيقة. اعتبر Stitch أداة تصميم مستقلة، وتحقق من حسابك وحدوده وسياسة المنتج الحالية. لا تضع API key في الواجهة أو داخل GitHub.

## المسار العملي من أي جهاز إلى Frontend على GitHub

### 1. تجهيز المشروع

أنشئ Repository خاصًا أو عامًا حسب حاجتك، ثم أضف \`README.md\` وملف \`PROJECT_CONTEXT.md\`. احتفظ بمخرجات التحليل داخل \`docs/\`، ولا تبدأ بتوليد كل الشاشات قبل تثبيت نطاق المنتج.

### 2. استخدام Google AI Studio

افتح AI Studio من الهاتف أو اللاب وسجّل الدخول بحساب Google. استخدمه لتحليل \`PROJECT_CONTEXT.md\` و\`PRD.md\`، توليد أسئلة Grill Me، مراجعة المتطلبات، وبناء \`FRONTEND_PLAN.md\`. عند استخدام Gemini API، خزّن المفتاح في متغير بيئة ولا تضعه في الكود أو GitHub. اختبر الإجابة على جزء صغير، وراجعها يدويًا قبل اعتمادها.

### 3. نقل الفكرة إلى Stitch

افتح Stitch، أنشئ مشروعًا جديدًا، ثم أدخل وصفًا واضحًا لدور المستخدم والشاشة والهدف والحالات المطلوبة. يمكن استخدام وصف نصي أو صورة/wireframe كمرجع. ابدأ بشاشة ممثلة واحدة، اعتمد الاتجاه البصري ونظام التصميم، ثم أنشئ كل شاشة بشكل منفصل. راجع Desktop وMobile وRTL وحالات Loading وEmpty وError وSuccess قبل اعتماد التصميم.

### 4. سحب التصميم أو الكود من Stitch

بعد اعتماد الشاشة، استخدم إمكانيات Stitch المتاحة في حسابك لتصدير Frontend code أو نقل التصميم إلى Figma أو استخدام Stitch MCP مع IDE/CLI مدعوم. التصدير ليس تطبيقًا مكتملًا ولا Backend؛ يجب تنظيف الكود ومقارنته مع \`DESIGN.md\` و\`FRONTEND_PLAN.md\` قبل دمجه.

### 5. كتابة خطة Frontend

بعد اعتماد المراجع البصرية، اطلب توليد الملفات التالية: \`docs/FRONTEND_PLAN.md\` و\`docs/FRONTEND_TASKS.md\` و\`docs/ROUTES_MAP.md\` و\`docs/COMPONENT_ARCHITECTURE.md\` و\`docs/FRONTEND_DATA_CONTRACTS.md\`. الخطة تحدد routes وcomponents وmock data وحالات الواجهة، ولا تنشئ Backend أو API حقيقيًا ما لم يكن ذلك مطلوبًا في مرحلة أخرى.

### 6. تقسيم الخطة إلى Phases

قسّم العمل إلى مراحل منطقية خاصة بالمشروع: setup، design tokens، shared components، layout/navigation، الشاشات الأساسية، التفاعلات، mock data، responsive QA، ثم final testing. لا تفرض هذه المراحل على كل مشروع، ولا تجعل كل زر Phase مستقلة. كل Feature يجب أن يحتوي على Tasks صغيرة ذات Acceptance Criteria وVerification method.

### 7. تنفيذ Frontend وربطه بـGitHub

نفّذ Task واحدة فقط في كل دورة، افحص التغيير، ثم نفّذ \`git status\` و\`git add\` و\`git commit\` و\`git push\`. استخدم فرعًا مثل \`feature/dashboard-layout\` بدل التعديل المباشر على \`main\`. ارفع الكود والوثائق، ولا ترفع \`.env\` أو مفاتيح Google أو Tokens.

### 8. العمل من الهاتف واللاب

يمكن من الهاتف فتح AI Studio وStitch وGitHub لمراجعة المحادثات والتصميمات والـCommits وفتح Issues أو Pull Requests، ويمكن تنفيذ تعديلات صغيرة إذا كانت بيئة التحرير تدعم ذلك. أما بناء Frontend طويل، تشغيل \`npm run build\`، مراجعة Responsive layouts، وإصلاح TypeScript فمن الأفضل تنفيذه على لاب أو Cloud IDE. GitHub هو نقطة المزامنة: اعمل Commit من أي جهاز ثم نفّذ \`git pull\` على الجهاز الآخر قبل المتابعة.

## دورة العمل المختصرة

\`AI Studio لتحليل المتطلبات → Stitch للتصميم → DESIGN.md → Frontend Plan → Phases وTasks → تنفيذ واجهة واحدة → QA → Commit وPush إلى GitHub → Pull على اللاب أو الجهاز التالي → متابعة التعديل\`.

## Prompt عملي لمسار كامل



\`\`\`text
أنت مهندس Frontend ومخطط منتج. اقرأ PROJECT_CONTEXT.md وPRD.md وأي مراجع Stitch معتمدة.
لا تنشئ Backend أو API أو migrations.
أولاً استخرج أهداف المستخدم والشاشات والحالات وقواعد العمل.
ثانيًا أنشئ FRONTEND_PLAN.md وROUTES_MAP.md وCOMPONENT_ARCHITECTURE.md وFRONTEND_DATA_CONTRACTS.md.
ثالثًا اقترح Phases مناسبة للمشروع، ولكل Phase Tasks صغيرة مع الملفات والمدخلات والاعتماديات وAcceptance Criteria وطريقة التحقق.
رابعًا اختر أول Task جاهزة فقط ولا تنفذ غيرها.
خامسًا بعد التنفيذ شغّل الفحوصات المتاحة، لخّص الملفات المتغيرة، وتوقف.
استخدم DESIGN.md والقيم المعتمدة من Stitch كمصدر الحقيقة البصري.
لا تفترض وجود Login أو Dashboard أو Checkout إلا إذا وردت في PRD.
\`\`\` 

## المراجع الرسمية

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Gemini API keys and security](https://ai.google.dev/gemini-api/docs/api-key)
- [Gemini API billing and usage](https://ai.google.dev/gemini-api/docs/billing)
- [Google Stitch](https://stitch.withgoogle.com/)
- [Stitch MCP setup](https://stitch.withgoogle.com/docs/mcp/setup)
- [Google announcement: Stitch](https://developers.googleblog.com/stitch-a-new-way-to-design-uis/)
`,
};

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
  { slug: 'google-ai-studio-stitch-workflow', titleAr: 'Google AI Studio وStitch من أي جهاز إلى GitHub', titleEn: 'AI Studio → Stitch → Frontend → GitHub', phase: 'التصميم والتنفيذ', sourceHeading: '', summary: 'مسار عملي لاستخدام AI Studio للتحليل، وStitch للتصميم والتصدير، ثم خطة Frontend وتقسيم Phases وتنفيذ الكود ومزامنته عبر GitHub.', outputs: ['DESIGN.md', 'docs/FRONTEND_PLAN.md', 'docs/FRONTEND_TASKS.md', 'GitHub commits'] },
  { slug: 'design-md', titleAr: 'Design System وDESIGN.md', titleEn: 'Design System & DESIGN.md', phase: 'التصميم', sourceHeading: '## 13. Design System & DESIGN.md', summary: 'استخرج القيم المرئية المعتمدة من Stitch إلى عقد تصميم يستخدمه فريق Frontend.', outputs: ['DESIGN.md'] },
  { slug: 'stitch-mcp', titleAr: 'تكامل Stitch MCP', titleEn: 'Stitch MCP Integration', phase: 'التكامل', sourceHeading: '## 14. Stitch MCP Integration', summary: 'اربط Stitch بـCoding Agent بأمان، تحقق من الاتصال، واستخرج مراجع التصميم المعتمدة.', outputs: ['مراجع Stitch موثقة'] },
  { slug: 'frontend-planning', titleAr: 'تخطيط Next.js Frontend', titleEn: 'Next.js Frontend Planning', phase: 'الفرونت إند', sourceHeading: '## 15. Next.js Frontend Planning', summary: 'حوّل التصميم المعتمد إلى خطة Frontend فقط: routes وcomponents وmock data وحالات UI.', outputs: ['docs/FRONTEND_PLAN.md', 'docs/FRONTEND_TASKS.md', 'docs/ROUTES_MAP.md', 'docs/COMPONENT_ARCHITECTURE.md', 'docs/FRONTEND_DATA_CONTRACTS.md'] },
  { slug: 'ui-ux-pro-max', titleAr: 'UI/UX Pro Max', titleEn: 'UI/UX Pro Max Skill', phase: 'الفرونت إند', sourceHeading: '## 17. UI/UX Pro Max Skill', summary: 'راجع الاتساق البصري والاستجابة والإتاحة قبل التنفيذ وبعده، مع أولوية DESIGN.md المعتمد.', outputs: ['تقرير مراجعة UI/UX'] },
  { slug: 'spec-kit', titleAr: 'GitHub Spec Kit', titleEn: 'GitHub Spec Kit', phase: 'التنفيذ', sourceHeading: '## 18. GitHub Spec Kit', summary: 'اتبع Constitution ثم Specify ثم Clarify ثم Plan ثم Tasks ثم Analyze ثم Implement ثم Verify.', outputs: ['spec.md', 'plan.md', 'tasks.md'] },
  { slug: 'incremental-implementation', titleAr: 'التنفيذ التدريجي بالمهام الصغيرة', titleEn: 'Incremental Frontend Implementation', phase: 'التنفيذ', sourceHeading: '## 19. Spec Kit + UI/UX Pro Max Implementation Workflow', summary: 'نفّذ ميزة منطقية أو مهمة صغيرة واحدة، تحقق منها، ثم توقف عند طلب التنفيذ التدريجي.', outputs: ['FEATURE_BRIEF.md', 'تغيير كود قابل للتحقق'] },
  { slug: 'testing-qa', titleAr: 'Testing وFrontend QA', titleEn: 'Testing & Frontend Quality Assurance', phase: 'الجودة', sourceHeading: '## 20. Testing & Frontend Quality Assurance', summary: 'افحص TypeScript وLint وBuild والتجاوب والإتاحة والتدفقات دون ادعاء نجاح فحص لم يُنفّذ.', outputs: ['docs/FINAL_FRONTEND_QA.md'] },
  { slug: 'prompt-library', titleAr: 'مكتبة البرومبتات', titleEn: 'Prompt Library', phase: 'المراجع', sourceHeading: '# 10. مكتبة البرومبتات `/prompts`', summary: 'ابحث وانسخ البرومبتات الكاملة مع مدخلاتها ومخرجاتها وتصنيف العملية.', outputs: ['Prompts indexed by slug'] },
  { slug: 'tools', titleAr: 'دليل الأدوات والتثبيت', titleEn: 'Tools & Installation', phase: 'المراجع', sourceHeading: '# 13. الأدوات والتثبيت `/tools`', summary: 'تعرف على أدوات المسار وروابطها الرسمية ومتطلبات التثبيت والتحقق والمشكلات الشائعة.', outputs: ['Tool setup notes'] },
  { slug: 'templates', titleAr: 'القوالب والملفات', titleEn: 'Templates & Project Files', phase: 'المراجع', sourceHeading: '# 14. القوالب والملفات `/templates`', summary: 'اعرف متى ينشأ كل ملف، وماذا يحتوي، ومنشئه، وكيفية مراجعته.', outputs: ['Template lifecycle map'] },
  { slug: 'borrowhub', titleAr: 'دراسة حالة BorrowHub', titleEn: 'BorrowHub Case Study', phase: 'التطبيق', sourceHeading: '# 12. ورشة BorrowHub `/borrowhub`', summary: 'طبّق المسار على نظام استعارة معدات جامعي مع الحفاظ على قواعد العمل الموثقة.', outputs: ['Case study documentation'] },
  { slug: 'glossary', titleAr: 'القاموس التقني والأسئلة الشائعة', titleEn: 'Glossary & FAQ', phase: 'المراجع', sourceHeading: '# 15. القاموس `/glossary`', summary: 'ابحث عن المصطلحات بالعربية والإنجليزية وافهم الفروق بين النماذج والأدوات.', outputs: ['Glossary index'] },
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
  return SUPPLEMENTARY_CONTENT[topic.slug] ?? sectionFromHeading(topic.sourceHeading);
}

const promptHeadingPattern = /^## PROMPT (\d{2}) — (.+)$/gm;

const parsedPrompts: PromptEntry[] = Array.from(source.matchAll(promptHeadingPattern)).map((match, index, matches) => {
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

const FRONTEND_PHASE_PROMPT: PromptEntry = {
  slug: 'prompt-31-frontend-phased-implementation-plan',
  number: '31',
  title: 'خطة تنفيذ واجهة المستخدم على مراحل Phases وTasks',
  category: 'الفرونت إند والتنفيذ',
  difficulty: 'متقدم',
  operation: 'تعديل كود',
  inputFiles: ['PRD.md', 'PROJECT_CONTEXT.md', 'DESIGN.md', 'STITCH_SCREEN_REFERENCES.md'],
  outputFiles: [
    'docs/FRONTEND_PLAN.md',
    'docs/FRONTEND_PHASES.md',
    'docs/FRONTEND_TASKS.md',
    'docs/ROUTES_MAP.md',
    'docs/COMPONENT_ARCHITECTURE.md',
    'docs/FRONTEND_DATA_CONTRACTS.md',
    'تنفيذ أول Task فقط بعد اعتماد الخطة',
  ],
  recommendedTool: 'Google AI Studio أو Coding Agent مع مراجعة بشرية وGitHub',
  body: `
## متى تستخدم هذا البرومبت؟

استخدمه بعد اعتماد \`PRD.md\` و\`DESIGN.md\` ومراجع Stitch، وقبل البدء في بناء صفحات Next.js. وظيفته ليست توليد التطبيق كاملًا دفعة واحدة، بل تحويل المتطلبات والتصميم إلى خطة قابلة للتنفيذ، ثم اختيار أول Task جاهزة فقط وتنفيذها والتحقق منها.

## البرومبت الجاهز للنسخ

أنت Principal Frontend Architect وقائد تنفيذ Next.js. تعمل داخل مستودع موجود، وهدفك تحويل متطلبات المنتج والتصميم المعتمد إلى واجهة مستخدم قابلة للتنفيذ على مراحل صغيرة يمكن مراجعتها وقياسها.

### قواعد المصدر والحماية

1. اقرأ الملفات التالية قبل أي اقتراح: \`PROJECT_CONTEXT.md\` و\`PRD.md\` و\`DESIGN.md\` و\`STITCH_SCREEN_REFERENCES.md\` وأي \`docs/FRONTEND_*.md\` موجودة.
2. اعتبر PRD مصدر الحقيقة للوظائف وقواعد العمل، واعتبر DESIGN.md مصدر الحقيقة البصري، واعتبر مراجع Stitch مرجعًا للشاشات فقط.
3. لا تخترع Login أو Dashboard أو Checkout أو API أو Backend أو قاعدة بيانات أو صلاحيات غير مذكورة بوضوح في المصادر.
4. إذا وجدت تعارضًا بين الملفات، أوقف التنفيذ وسجّل التعارض في قسم Open Questions بدل اختيار حل من عندك.
5. لا تقرأ أو تطبع أسرار \`.env\`، ولا تنشئ API keys أو تضعها في Client Components أو GitHub.
6. هذه المرحلة Frontend فقط. استخدم Mock data وtyped contracts عندما لا يوجد API معتمد.

### المرحلة الأولى: تحليل النطاق

استخرج في جدول واضح:

- المستخدمين والأدوار.
- الشاشات والـroutes المطلوبة.
- هدف كل شاشة ونقطة الدخول والخروج.
- المكونات المشتركة والميزات الخاصة بكل شاشة.
- قواعد العمل التي يجب أن تظهر في الواجهة.
- حالات Loading وEmpty وError وSuccess وDisabled وPermission Denied.
- الاعتماديات والأسئلة المفتوحة والافتراضات غير المعتمدة.

أنشئ أو حدّث \`docs/FRONTEND_DISCOVERY.md\`، ولا تنتقل إلى التخطيط إذا كان هناك غموض يمنع تحديد Route أو حالة قبول.

### المرحلة الثانية: تخطيط المعمارية

أنشئ الملفات التالية بمحتوى عملي وليس عناوين فارغة:

- \`docs/FRONTEND_PLAN.md\`: النطاق، خارج النطاق، القرارات، ترتيب التنفيذ، ومخاطر الواجهة.
- \`docs/FRONTEND_PHASES.md\`: Phases مرتبة مع هدف كل Phase ومدخلاتها ومخرجاتها وشروط بدايتها ونهايتها.
- \`docs/FRONTEND_TASKS.md\`: Tasks مرقمة، صغيرة، مستقلة قدر الإمكان، ومرتبطة بملفات محددة.
- \`docs/ROUTES_MAP.md\`: كل Route، نوعها، مكون الصفحة، الـlayout، مصدر البيانات، والحالات المطلوبة.
- \`docs/COMPONENT_ARCHITECTURE.md\`: UI primitives، shared components، feature components، وpage composition.
- \`docs/FRONTEND_DATA_CONTRACTS.md\`: TypeScript types وMock data shapes وحقول الحالات، دون اختراع API حقيقي.

قسّم العمل إلى Phases مناسبة للمشروع. استخدم هذه القائمة كنقطة بداية فقط وعدّلها حسب المصادر:

Phase 0 — Baseline: تثبيت Next.js، TypeScript، RTL، الخطوط، lint، build، وDesign Tokens.
Phase 1 — Foundation: Button وInput وCard وBadge وModal وContainer وTypography.
Phase 2 — Shell: root layout وNavbar وSidebar وFooter وresponsive navigation.
Phase 3 — Representative Route: تنفيذ شاشة واحدة ممثلة ببيانات Mock وحالاتها الكاملة.
Phase 4 — Feature Routes: توسيع النمط إلى الشاشات التالية مع الحفاظ على العقد البصري.
Phase 5 — Interaction: النماذج، الفلاتر، modals، validation، وfeedback states.
Phase 6 — Responsive and Accessibility: RTL، نقاط التوقف، keyboard navigation، focus، contrast، وtouch targets.
Phase 7 — Verification and Handoff: TypeScript، build، QA، توثيق القرار، Commit، وPull Request.

لا تعتبر كل شاشة Phase مستقلة تلقائيًا، ولا تجعل كل زر Task. اجعل Phase تمثل مخرجًا قابلًا للمراجعة، واجعل Task تمثل تغييرًا صغيرًا يمكن تنفيذه والتحقق منه في دورة واحدة.

### مواصفات كل Phase

لكل Phase اكتب:

- الهدف والسبب.
- الملفات الداخلة والمخرجات.
- الاعتماديات التي يجب أن تكتمل قبل البدء.
- Tasks التابعة لها بالترتيب.
- Acceptance Criteria قابلة للملاحظة.
- Verification method وأوامر الفحص.
- المخاطر وطريقة الرجوع الآمن.
- شرط الانتقال إلى Phase التالية.

### مواصفات كل Task

لكل Task اكتب:

- ID وعنوانًا فعليًا يبدأ بفعل.
- الملفات التي ستنشأ أو تتغير.
- المكون أو الـRoute المتأثر.
- المدخلات والعقد المطلوبة.
- خطوات التنفيذ القصيرة.
- ما لن يتم تنفيذه.
- Acceptance Criteria بصيغة Given / When / Then عند الحاجة.
- أمر التحقق والنتيجة المتوقعة.
- الاعتماديات وحالة Task: Ready أو Blocked أو Done.

### قواعد Next.js

- استخدم App Router وبنية \`app/\` الواضحة.
- اجعل Server Components هي الافتراضية، وأضف \`use client\` فقط للمكون الذي يحتاج state أو browser events.
- استخدم \`page.tsx\` للصفحة و\`layout.tsx\` للغلاف و\`loading.tsx\` للانتظار و\`error.tsx\` للفشل و\`not-found.tsx\` للموارد غير الموجودة.
- لا تضع كل الكود في \`page.tsx\`; استخرج components وlib وtypes.
- لا تستخدم \`any\`، ولا تضع أسرارًا في Client Components.
- أضف loading وempty وerror وsuccess states لكل Route يحتاج بيانات أو تفاعلًا.

### طريقة التنفيذ الإلزامية

بعد كتابة الملفات والخطة، لا تنفذ كل الخطة. اختر أول Task حالتها Ready فقط.

1. اعرض ملخص Task والملفات التي ستتغير.
2. اذكر Acceptance Criteria قبل التعديل.
3. نفّذ Task واحدة فقط.
4. افحص \`git diff\` وراجع أن التعديل لم يخرج عن DESIGN.md وPRD.md.
5. شغّل \`npx tsc --noEmit\` ثم \`npm run build\` أو أوامر المشروع المعتمدة.
6. إذا فشل الفحص، أصلح سبب الفشل ضمن نفس Task ولا تبدأ Task أخرى.
7. لخّص الملفات المتغيرة والنتائج والأسئلة المفتوحة.
8. توقف وانتظر الاعتماد قبل الانتقال إلى Task التالية.

### صيغة التقرير النهائي

أعد التقرير بهذا الترتيب:

1. Scope understood.
2. Conflicts and open questions.
3. Files created or changed.
4. Phase and Task selected.
5. Acceptance Criteria.
6. Verification commands and results.
7. Remaining work with exact next Task.

ابدأ بالتحليل والتخطيط فقط، ثم نفّذ أول Task Ready. لا تنشئ Backend، ولا تغيّر التصميم، ولا تضف ميزة غير موثقة.
`,
};

export const PROMPTS: PromptEntry[] = [...parsedPrompts, FRONTEND_PHASE_PROMPT];

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
