import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_09: TopicDraft[] = [
{
    topicSlug: 'ai-coding-agent',
    objectives: [
        { id: 'agent-objective-context', text: 'تهيئة وكيل البرمجة بسياق ملفات وقواعد المشروع وحدود المهام.' },
        { id: 'agent-objective-safety', text: 'حماية الأسرار والتحقق من صلاحيات الأوامر والمخرجات قبل التنفيذ.' },
    ],
    sections: [
        { heading: 'المدخل: مستودع وقواعد مكتوبة', body: 'وفر ملفات السياق مثل PRD وDESIGN.md والقواعد ذات الصلة. اطلب مهمة صغيرة ذات مخرج يمكن مراجعته.' },
        { heading: 'حدود التفويض', body: 'اختر أقل صلاحية وأدوات لازمة، واطلب خطة أو فرقاً قبل أوامر حذف أو نشر. راجع الملفات التي قرأها والملفات التي سيغيرها.' },
        { heading: 'الأسرار ليست سياقاً عاماً', body: 'ضع المتغيرات السرية في مكان محلي مستبعد من Git، واستخدم `.env.example` بأسماء وقيم placeholder. لا تطبع المفاتيح في السجل أو المحادثة.' },
    ],
    practicalSteps: [
        { instruction: 'اكتب إعداد الوكيل: سياق الملفات، قواعد الجودة، نطاق الصلاحية، والأوامر المسموحة والمراجعة المطلوبة.', expectedOutput: '`docs/CODING_AGENT_SETUP.md` يشرح إعداداً لا يعتمد على وكيل مدفوع بعينه.' },
        { instruction: 'راجع ملفات البيئة والتجاهل دون كشف أي قيمة سرية، ثم سجل استعادة/تراجع آمنة.', expectedOutput: '`.env.example` بلا أسرار و`.gitignore` يحمي الملفات المحلية.' },
    ],
    workedExample: { title: 'مهمة مراجعة وثائق', context: 'يطلب مطور من وكيل تلخيص تضارب بين PRD وSRS.', result: 'يقرأ الوكيل الملفين ويقدم مواقع الاختلاف ومقترحاً للمراجعة فقط؛ لا يحرر كل النظام ولا يطبع قيمة من `.env.local`.' },
    outputs: [
        { id: 'agent-setup', description: '`docs/CODING_AGENT_SETUP.md` السياق والحدود والخطوات.' },
        { id: 'safe-env', description: '`.env.example` و`.gitignore` مع أسماء عامة ومنع تتبع الأسرار.' },
    ],
    questions: [
        { id: 'agent-q-secret', objectiveId: 'agent-objective-safety', prompt: 'ما القيمة الصحيحة في ملف `.env.example` الملتزم بالمستودع؟', options: ['مفتاح API الحقيقي', 'اسم المتغير مع placeholder واضح، لا سر فعلي', 'نسخة من متغير الإنتاج', 'كلمة مرور المطور'], correct: 1, explanation: 'ملف المثال يوضح أسماء الإعدادات دون كشف اعتماد فعلي.' },
        { id: 'agent-q-scope', objectiveId: 'agent-objective-context', prompt: 'أي طلب يعطي الوكيل عملاً يمكن مراجعته بأمان؟', options: ['أعد كتابة التطبيق كله وارفعه إلى الإنتاج', 'راجع ملفين محددين واعرض فرقاً مقترحاً دون نشر', 'احذف أي ملف قديم', 'غيّر كل الإعدادات تلقائياً'], correct: 1, explanation: 'النطاق المحدد والمخرج القابل للمراجعة يقللان الأثر ويكشفان هل فهم الوكيل المطلوب.' },
    ],
    criteria: [
        { id: 'agent-r-boundary', outputId: "agent-setup", name: 'حدود المهمة', description: 'الإعداد يحدد السياق والأذونات والمراجعة ومتى يتوقف الوكيل.', evidencePrompt: 'أشر إلى بند يطلب خطة أو مراجعة قبل أثر غير قابل للرجوع.' },
        { id: 'agent-r-secret', outputId: "safe-env", name: 'عزل الأسرار', description: 'ملف المثال لا يحمل سرّاً حقيقياً والملفات المحلية مستبعدة.', evidencePrompt: 'افحص أسماء الملفات وقواعد `.gitignore` دون طباعة أي قيمة سرية.' }
    ],
},
{
    topicSlug: 'google-ai-studio',
    objectives: [
        { id: 'aistudio-objective-test', text: 'إجراء تجربة نموذج موثقة مع تعليمات ومدخلات ومخرجات قابلة للمراجعة.' },
        { id: 'aistudio-objective-data', text: 'إنتاج بيانات تمثيلية JSON تطابق ERD دون خلطها ببيانات مستخدمين حقيقية.' },
    ],
    sections: [
        { heading: 'المدخل: مخطط وهدف تجربة', body: 'ابدأ من ERD وحدد السؤال الذي تختبره. سجل model/tool selection والتاريخ في وثيقتك لأن تفاصيل المنتج والخطط تتغير.' },
        { heading: 'Mock data لا بيانات حقيقية', body: 'استخدم أسماء وقيم اصطناعية ولا تضع معلومات شخصية أو أسراراً. تحقق من JSON ومفاتيحه وعلاقاته مقابل ERD.' },
        { heading: 'مفتاح API منفصل', body: 'إذا جربت API، خزن المفتاح محلياً خارج Git، وضع الاسم فقط في `.env.example`. لا تضع المفتاح داخل prompt أو سجل النتائج.' },
    ],
    practicalSteps: [
        { instruction: 'سجل الهدف والتعليمات والنموذج والإعدادات المرئية والنتيجة التي تريد اختبارها.', expectedOutput: '`docs/AI_STUDIO_WORKFLOW.md` يحفظ خطوات قابلة للتكرار دون قيمة مفتاح.' },
        { instruction: 'اطلب بيانات اصطناعية قليلة وافحص JSON ثم قارن كل حقل وعلاقة بERD.', expectedOutput: '`src/data/mock-data.json` بيانات اختبارية متوافقة وموسومة بأنها غير حقيقية.' },
    ],
    workedExample: { title: 'بيانات استعارة اصطناعية', context: 'ERD يتضمن طالباً ومعدة وطلباً مع مفاتيح مرجعية.', result: 'ثلاث سجلات بأسماء وهمية وقيم معرّفات متطابقة بين الطلب والطرفين؛ لا توجد بيانات شخصية أو قاعدة جديدة غير موجودة في ERD.' },
    outputs: [
        { id: 'studio-workflow', description: '`docs/AI_STUDIO_WORKFLOW.md` غرض التجربة وإعداداتها والنتيجة.' },
        { id: 'mock-data', description: '`src/data/mock-data.json` بيانات اصطناعية صالحة ومتوافقة مع ERD.' },
    ],
    questions: [
        { id: 'aistudio-q-data', objectiveId: 'aistudio-objective-data', prompt: 'أعاد النموذج JSON صالح النحو لكنه يستخدم حقل `pickup_deadline` غير موجود في ERD. ما النتيجة؟', options: ['البيانات متوافقة لأنها JSON صالح', 'تحتاج مطابقة المخطط؛ صحة النحو لا تثبت مطابقة النموذج', 'نضيف الحقل إلى الإنتاج تلقائياً', 'نستخدم بيانات حقيقية'], correct: 1, explanation: 'يجب التحقق من البنية والحقول والعلاقات مقابل المصدر، لا من قابلية تحليل JSON وحدها.' },
        { id: 'aistudio-q-key', objectiveId: 'aistudio-objective-test', prompt: 'أين توثق API key في سير العمل التعليمي؟', options: ['في المستودع كي يتكرر الاختبار', 'تذكر طريقة الإعداد واسم المتغير دون نشر القيمة السرية', 'في سجل المخرجات', 'داخل بيانات mock'], correct: 1, explanation: 'إمكانية التكرار لا تبرر كشف السر؛ وثق selector/الإعداد دون القيمة.' },
    ],
    criteria: [
        { id: 'aistudio-r-repro', outputId: "studio-workflow", name: 'تجربة قابلة للتفسير', description: 'الهدف والتعليمات والإعدادات والنتيجة موثقة بما يكفي للفهم.', evidencePrompt: 'أعد وصف التجربة دون قراءة سر أو اعتماد على ذاكرة غير مكتوبة.' },
        { id: 'aistudio-r-schema', outputId: "mock-data", name: 'مطابقة البيانات للمخطط', description: 'JSON قابل للقراءة وحقوله وعلاقاته تطابق ERD والبيانات اصطناعية.', evidencePrompt: 'تحقق من مفاتيح وعلاقة واحدة مقابل ERD.' }
    ],
},
{
    topicSlug: 'agent-skills',
    objectives: [
        { id: 'skills-objective-instructions', text: 'كتابة Skill صغيرة توجه الوكيل إلى معايير المشروع ونتيجة قابلة للمراجعة.' },
        { id: 'skills-objective-selection', text: 'اختيار المهارة ذات الصلة فقط كي لا يثقل السياق بقواعد غير لازمة.' },
    ],
    sections: [
        { heading: 'المدخل: قاعدة متكررة قابلة لإعادة الاستخدام', body: 'اختر إرشاداً يتكرر في مهام متعددة مثل RTL أو سياسات الاختبار؛ لا تنقل كل وثائق المشروع إلى Skill.' },
        { heading: 'تعليمات وإشارة استخدام', body: 'حدد متى تُستخدم المهارة، ما المدخلات التي تحتاجها، القواعد الإلزامية، وما الذي يجب أن يعيده الوكيل أو يتحقق منه.' },
        { heading: 'فعّل عند الحاجة', body: 'اجعل أسماء ومجالات المهارات واضحة. فعّلها للمهمة المناسبة ولا تفترض أن الوكيل قرأ كل المهارات أو أن وجود الملف يعني امتثالاً.' },
    ],
    practicalSteps: [
        { instruction: 'اكتب وصف المهارة ومعايير الواجهة أو المشروع ونطاق المهام التي تغطيها.', expectedOutput: '`docs/PROJECT_AGENT_SKILLS.md` يشرح المهارات ومتى يستدعي كل منها.' },
        { instruction: 'أضف Skill فرعية للمعايير الأكثر تكراراً واختبرها بطلب صغير يقتضي القاعدة.', expectedOutput: '`docs/skills/frontend-standards.md` يتضمن تعليمات قابلة للمراجعة لا سيرة عامة.' },
    ],
    workedExample: { title: 'معايير واجهة RTL', context: 'الفريق يكرر طلب واجهات Next.js عربية بأزرار قابلة للوحة المفاتيح.', result: 'Skill قصيرة تحدد تشغيل RTL للنص العربي وإبقاء الكود LTR وفحص التركيز المرئي. لا تحمل تفاصيل سياسة بيانات الخلفية إلى مهمة CSS.' },
    outputs: [
        { id: 'skill-index', description: '`docs/PROJECT_AGENT_SKILLS.md` فهرس يشرح نطاق واستدعاء كل مهارة.' },
        { id: 'frontend-skill', description: '`docs/skills/frontend-standards.md` قواعد مشروع محددة مع تحقق مقترح.' },
    ],
    questions: [
        { id: 'skills-q-scope', objectiveId: 'skills-objective-selection', prompt: 'طلب المهمة متعلق بمخطط PostgreSQL، لكن Skill الوحيدة لديك تخص CSS. ماذا تفعل؟', options: ['تحملها رغم عدم الصلة', 'تختار إرشادات قاعدة البيانات المناسبة أو تنفذ دون Skill غير ملائمة', 'تطلب من Skill تعديل ألوان المخطط', 'تدمج كل المهارات في prompt'], correct: 1, explanation: 'تفعيل المهارات بحسب الحاجة يقلل الضوضاء ويمنع تحميل توجيهات لا تخص المهمة.' },
        { id: 'skills-q-test', objectiveId: 'skills-objective-instructions', prompt: 'كيف تعرف أن Skill مفيدة وقابلة للتطبيق؟', options: ['اسمها يبدو احترافياً', 'لها مشغل واضح ومدخلات وقواعد ومخرج يمكن فحصه بطلب صغير', 'طويلة جداً', 'تحتوي كل الملفات'], correct: 1, explanation: 'نطاق الاستخدام والمخرجات القابلة للتحقق هي ما يسمح بتقييم التعليمات.' },
    ],
    criteria: [
        { id: 'skills-r-trigger', outputId: "skill-index", name: 'متى تستخدم المهارة', description: 'كل Skill لها مهمة ونطاق واضحان ولا تحمل كل سياق المشروع.', evidencePrompt: 'اقرأ وصفاً وحدد نوع الطلب الذي يشغّلها.' },
        { id: 'skills-r-output', outputId: "frontend-skill", name: 'قواعد قابلة للتحقق', description: 'التعليمات لها مخرج أو فحص يمكن للمراجع ملاحظته.', evidencePrompt: 'نفذ مثالاً صغيراً وأشر إلى القاعدة ونتيجتها.' }
    ],
},
{
    topicSlug: 'mcp-protocol',
    objectives: [
        { id: 'mcp-objective-roles', text: 'شرح أدوار host وclient وserver والعلاقة بينها في اتصال MCP.' },
        { id: 'mcp-objective-safety', text: 'تحديد أدوات الخادم وصلاحياته ومصادر الأسرار قبل توصيله بالوكيل.' },
    ],
    sections: [
        { heading: 'المدخل: حاجة لتكامل محدد', body: 'حدد ما الذي يحتاجه الوكيل قبل إضافة خادم MCP. لا تضف الخادم لمجرد أن البروتوكول متاح.' },
        { heading: 'الأدوار والرسائل', body: 'Host يضم تجربة الوكيل، client يتولى اتصال MCP، وserver يعرض أدوات أو موارد أو prompts. يكتشف المضيف ما يتيحه الخادم ويتفاعل معه بحسب الإعداد.' },
        { heading: 'الأمان محلي أولاً', body: 'راجع العمليات والأذونات والمصادر قبل التشغيل، واحفظ الاعتمادات محلياً خارج Git. استخدم خادماً تجريبياً محدوداً وتجنب منح صلاحيات كتابة غير ضرورية.' },
    ],
    practicalSteps: [
        { instruction: 'ارسم مكونات MCP المطلوبة لتكامل تجريبي واكتب تبادل الأدوار والقدرات التي تحتاجها فقط.', expectedOutput: '`docs/MCP_FOUNDATIONS.md` يشرح host/client/server والقدرات المطلوبة.' },
        { instruction: 'اكتب إعداداً نموذجياً بلا أسرار حقيقية مع قائمة صلاحيات ونطاق ومخاطر.', expectedOutput: 'نموذج config محلي بعناصر placeholder وملاحظة أنه لا يرفع للمستودع.' },
    ],
    workedExample: { title: 'قراءة شاشة تصميم', context: 'مضيف الوكيل يحتاج قراءة معرفات شاشات من خادم تصميم.', result: 'الـhost يدير الواجهة، والـclient يتصل بالخادم، والخادم يعرض أدوات قراءة محددة. يمنح الوكيل صلاحية القراءة فقط إن كانت كافية للمهمة.' },
    outputs: [
        { id: 'mcp-foundations', description: '`docs/MCP_FOUNDATIONS.md` تعريف الأدوار والقدرات ومسار الاتصال.' },
        { id: 'mcp-config', description: 'نموذج config بلا أسرار يبين الأذونات المطلوبة ومصدرها.' },
    ],
    questions: [
        { id: 'mcp-q-roles', objectiveId: 'mcp-objective-roles', prompt: 'أي وصف يميز أطراف اتصال MCP؟', options: ['Host يضم الوكيل، client يتصل، server يعرض قدرات', 'Server هو المتصفح دائماً', 'Client هو قاعدة البيانات فقط', 'الأدوار أسماء لنفس العملية'], correct: 0, explanation: 'توزيع الأدوار يساعد على فهم أين تعمل التجربة وأين ينفذ الاتصال وأين تعرض الأدوات أو الموارد.' },
        { id: 'mcp-q-scope', objectiveId: 'mcp-objective-safety', prompt: 'مهمة القراءة لا تحتاج أي تعديل. أي صلاحية تراجع أولاً؟', options: ['منح كتابة عامة لكل الأدوات', 'اختيار قدرة القراءة المحددة وتقليل الأذونات', 'نسخ المفتاح إلى prompt', 'تفعيل كل خادم في الجهاز'], correct: 1, explanation: 'تحديد الحاجة وأقل صلاحية لازمة يحدان من أثر التكامل.' },
    ],
    criteria: [
        { id: 'mcp-r-roles', outputId: "mcp-foundations", name: 'تمييز الأدوار', description: 'الوثيقة تشرح host وclient وserver وقدرات كل طرف.', evidencePrompt: 'تتبع طلباً واحداً من الوكيل إلى الخادم والعودة.' },
        { id: 'mcp-r-permissions', outputId: "mcp-config", name: 'نطاق وصلاحيات', description: 'الإعداد بلا سر فعلي والصلاحية متناسبة مع المهمة.', evidencePrompt: 'أظهر placeholder وسجل القدرة والصلاحية المختارة.' }
    ],
}
];

export const LEARNING_CONTENT_GROUP_A_09: Record<string, TopicLearningContent> =
  buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_09);
