import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_05: TopicDraft[] = [
{
    topicSlug: 'plantuml',
    objectives: [
        { id: 'plantuml-objective-syntax', text: 'إنشاء ملف PlantUML يبدأ وينتهي بعلامات صحيحة واختيار الرسم المناسب.' },
        { id: 'plantuml-objective-render', text: 'استخدام معاينة للتحقق من الصياغة والتمييز بين صلاحية الرسم وصحة النموذج.' },
    ],
    sections: [
        { heading: 'المدخل: رسم هندسي يحتاج إلى ترميز', body: 'اختر UML مثل Use Case أو Activity أو State بحسب معنى السؤال؛ Mermaid خيار لمخططات أخرى. لا تخلط لغتي الترميز في كتلة واحدة.' },
        { heading: 'حدود الملف', body: 'تبدأ العينة بـ `@startuml` وتنتهي بـ `@enduml`. استخدم معرفات واضحة ثم جرّب المصيّر المختار لتلقي أخطاء الصياغة.' },
        { heading: 'مقارنة واعية', body: 'سجل المحرر والخطوات في README. نجاح التصيير لا يثبت أن actor أو العلاقة أو القاعدة صحيحة؛ قارن المعنى بالمتطلبات في Topics اللاحقة.' },
    ],
    practicalSteps: [
        { instruction: 'أنشئ عينة بسيطة من نوع UML يناسب سؤالك، ثم افحص البداية والنهاية والأسماء في محرر PlantUML.', expectedOutput: 'كود PlantUML يعمل في المعاينة ويتضمن تعليقات عن الغرض من الرسم.' },
        { instruction: 'وثق طريقة المعاينة والفروق التي تهمك عن Mermaid، ثم احتفظ بعينة قابلة لإعادة الاستخدام.', expectedOutput: '`docs/diagrams/README-plantuml.md` مع عينة كود صالحة للتصيير.' },
    ],
    workedExample: { title: 'رسم علاقة Actor بالنظام', context: 'نحتاج لاحقاً إلى توثيق تفاعل المستخدم مع النظام عبر Use Case.', result: 'عينة `@startuml` و`@enduml` تضيف actor ونظاماً وتسمي الغرض؛ لا تسبق هذه العينة اعتماد صلاحيات use cases.' },
    outputs: [
        { id: 'plantuml-guide', description: '`docs/diagrams/README-plantuml.md` يشرح المحرر والتصيير واختيار اللغة.' },
        { id: 'plantuml-sample', description: 'كود PlantUML صالح مع بداية ونهاية واضحتين.' },
    ],
    questions: [
        { id: 'plantuml-q-boundary', objectiveId: 'plantuml-objective-syntax', prompt: 'ما الغلاف الأساسي لعينة PlantUML؟', options: ['`<diagram>` و`</diagram>`', '`@startuml` و`@enduml`', '`flowchart TD` فقط', '`SELECT` و`;`'], correct: 1, explanation: 'هاتان علامتا بداية ونهاية مخطط PlantUML؛ Mermaid له صياغة بداية مختلفة.' },
        { id: 'plantuml-q-render', objectiveId: 'plantuml-objective-render', prompt: 'المحرر يعرض الرسم بلا خطأ. ماذا تفحص بعد ذلك؟', options: ['أن المعنى والأدوار يستندان إلى المتطلبات', 'أن المشروع يحتاج قاعدة بيانات جديدة', 'أن كل العلاقات صحيحة تلقائياً', 'أن الرسم صار قراراً معتمداً'], correct: 0, explanation: 'المصيّر يتحقق من الصياغة؛ على المتعلم التحقق من المعنى والمصدر.' },
    ],
    criteria: [
        { id: 'plantuml-r-render', outputId: "plantuml-sample", name: 'العينة قابلة للمعاينة', description: 'لها غلاف صحيح ونوع مخطط مناسب للغرض.', evidencePrompt: 'الصق الكود في المصيّر المعتمد واذكر نتيجة التصيير.' },
        { id: 'plantuml-r-guide', outputId: "plantuml-guide", name: 'توثيق الاستخدام', description: 'يشرح README متى يستخدم PlantUML وما لا يثبته التصيير.', evidencePrompt: 'أشر إلى مثال صالح وملاحظة الفرق عن Mermaid.' }
    ],
},
{
    topicSlug: 'use-case-diagram',
    objectives: [
        { id: 'usecase-objective-boundary', text: 'تحديد حدود النظام والأدوار الخارجية وأهداف المستخدمين ضمن MVP.' },
        { id: 'usecase-objective-relations', text: 'استخدام include وextend عند وجود مسوغ سلوكي من المتطلبات.' },
    ],
    sections: [
        { heading: 'المدخل: أدوار وأهداف من PRD', body: 'كل actor خارج حدود النظام ويمثل دوراً يتفاعل معه. اكتب الهدف بصيغة نتيجة للمستخدم، لا كزر أو شاشة.' },
        { heading: 'حدود النظام', body: 'ضع الوظائف التي ينفذها النظام داخل حد مسمى. أظهر الأدوار المخولة فقط حسب PRD، ولا تفترض أن موظفاً أو خدمة خارجية موجودة.' },
        { heading: 'العلاقات ليست زخرفة', body: '`include` يعني سلوكاً مشتركاً إلزامياً في المسارات التي تشير إليه، و`extend` يضيف سلوكاً اختيارياً/شرطياً إلى use case أساسي. استخدمها فقط حين تشرح العلاقة فعلاً.' },
    ],
    practicalSteps: [
        { instruction: 'استخرج الأدوار والأهداف من PRD، وارسم حدود النظام وحالات الاستخدام بتسميات فعلية.', expectedOutput: '`docs/diagrams/use-case.puml` يحدد actors وحالات الاستخدام داخل النظام.' },
        { instruction: 'راجع كل علاقة include/extend إلى سلوك موثق واكتب شرحاً قصيراً للحدود والصلاحيات.', expectedOutput: '`docs/diagrams/use-case.md` يبرر العلاقات ويشير إلى متطلبات المصدر.' },
    ],
    workedExample: { title: 'مراجعة طلب استعارة', context: 'الطالب يطلب معدة والمسؤول يقرر القبول أو الرفض وفق سياسة المنتج.', result: 'يمكن تمثيل “تقديم طلب” و“مراجعة طلب” كهدفين لدورين. لا تستخدم include لمراجعة المسؤول في كل حالة إلا إذا أثبت PRD أن هذه خطوة إلزامية.' },
    outputs: [
        { id: 'usecase-puml', description: '`docs/diagrams/use-case.puml` يوضح actors وحالات الاستخدام وحدود النظام.' },
        { id: 'usecase-notes', description: '`docs/diagrams/use-case.md` يشرح include/extend وأساس الصلاحيات.' },
    ],
    questions: [
        { id: 'usecase-q-actor', objectiveId: 'usecase-objective-boundary', prompt: 'أين يوضع actor في مخطط use case؟', options: ['داخل قاعدة البيانات', 'خارج حد النظام ليمثل دوراً يتفاعل معه', 'داخل كل شاشة كعنصر UI', 'في مستودع Git'], correct: 1, explanation: 'Actor خارجي بالنسبة إلى النظام؛ حالة الاستخدام تصف هدفاً يقدمه النظام لذلك الدور.' },
        { id: 'usecase-q-extend', objectiveId: 'usecase-objective-relations', prompt: 'متى تبرر علاقة extend؟', options: ['كلما اشترك مساران في اسم', 'عندما يضيف سلوكاً اختيارياً أو شرطياً لحالة أساسية بمسوغ موثق', 'لإظهار ترتيب زمني دقيق دائماً', 'لإخفاء متطلب مفتوح'], correct: 1, explanation: 'extend يوضح إضافة شرطية/اختيارية؛ يجب ألا يستخدم بدلاً من شرح سلوك لم يحسم.' },
    ],
    criteria: [
        { id: 'usecase-r-boundary', outputId: "usecase-puml", name: 'الأدوار وحدود النظام', description: 'الأدوار خارج الحد والأهداف داخله ومسنودة بمتطلبات.', evidencePrompt: 'تتبع actor وحالة استخدام إلى FR/صلاحية في PRD.' },
        { id: 'usecase-r-relations', outputId: "usecase-notes", name: 'مسوغ العلاقات', description: 'include/extend لا تستعمل إلا بدلالة سلوكية واضحة.', evidencePrompt: 'اشرح علاقة واحدة بالمصدر أو اذكر لماذا لا تحتاج العينة إلى علاقة خاصة.' }
    ],
},
{
    topicSlug: 'activity-diagram',
    objectives: [
        { id: 'activity-objective-branch', text: 'تمثيل تدفق النشاط وبوابات التحقق والتفرعات ومسارات التعافي.' },
        { id: 'activity-objective-evidence', text: 'إظهار كل قرار على أساس شرط مصدره المتطلبات.' },
    ],
    sections: [
        { heading: 'المدخل: عملية لها قرار', body: 'اختر عملاً يمتد عبر خطوات، لا علاقة ساكنة بين مفاهيم. اذكر من يقوم بالفعل والشرط الذي يفتح الفرع.' },
        { heading: 'المسارات والبوابات', body: 'استخدم أسهماً متصلة وعقدة قرار مع حراس مسماة؛ اظهر النجاح والفشل والتعافي بدلاً من إسقاط الحالة غير السعيدة.' },
        { heading: 'حافظ على المصدر', body: 'يمكن رسم Mermaid flowchart TD كما في الدرس. اربط كل فرع بقاعدة في PRD/SRS، وسجل الأسئلة المفتوحة بدلاً من جعل الرسم مرجع سياسة جديداً.' },
    ],
    practicalSteps: [
        { instruction: 'اختر عملية ذات تحقق أو رفض، واكتب خطوات النظام والمستخدم بترتيبها مع تفرع واضح.', expectedOutput: '`docs/diagrams/activity-diagram.mmd` يحتوي مسارات النجاح والفشل والتعافي المدعومة.' },
        { instruction: 'أضف شرحاً نصياً للبوابات والحراس واربطها بشروط PRD/SRS.', expectedOutput: '`docs/diagrams/activity-diagram.md` يشرح القرار ومصدر كل فرع.' },
    ],
    workedExample: { title: 'التحقق من طلب', context: 'طلب يحتوي سبباً ومدة ويحتاج قرار مسؤول إذا كانت هذه قواعد معتمدة.', result: 'يفحص النظام الحقول أولاً؛ المدخل غير المقبول يعرض سبب الرفض، والمقبول يذهب إلى مراجعة المسؤول. لا يرسم مسار انتهاء تلقائي ما لم يرد في SRS.' },
    outputs: [
        { id: 'activity-doc', description: '`docs/diagrams/activity-diagram.md` يوضح السلوك والقرارات.' },
        { id: 'activity-code', description: '`docs/diagrams/activity-diagram.mmd` مخطط Mermaid يضم الفروع المدعومة.' },
    ],
    questions: [
        { id: 'activity-q-guard', objectiveId: 'activity-objective-branch', prompt: 'كيف تجعل بوابة القرار مفهومة في مخطط النشاط؟', options: ['تسمية الفروع بحراس مثل `[البيانات صالحة]` و`[غير صالحة]`', 'ترك سهمين بلا أسماء', 'إضافة متغير بيئة', 'حذف مسار الرفض'], correct: 0, explanation: 'الحراس يشرحون سبب اختيار كل فرع، ويجعلون النقاش والاختبار ممكنين.' },
        { id: 'activity-q-source', objectiveId: 'activity-objective-evidence', prompt: 'اقترح الفريق إعادة المحاولة تلقائياً بعد الخطأ، لكن المصدر لا يذكرها. كيف تمثلها؟', options: ['كقرار متفق عليه', 'كسؤال مفتوح أو تحذفها من المخطط الحالي', 'كحارس صحيح دائماً', 'في README فقط باعتبارها سلوكاً'], correct: 1, explanation: 'المخطط لا يسن قاعدة جديدة. يحتاج السلوك مصدر قرار قبل أن يدخل مساراً تنفيذياً.' },
    ],
    criteria: [
        { id: 'activity-r-paths', outputId: "activity-code", name: 'تغطية الفروع', description: 'تظهر حالات النجاح والفشل والتعافي المعتمدة مع حراس واضحة.', evidencePrompt: 'اختر قراراً واتبع كل فرع حتى يصل إلى نتيجة.' },
        { id: 'activity-r-source', outputId: "activity-doc", name: 'اتساق المصدر', description: 'كل شرط قرار مرتبط بـPRD/SRS أو موسوم كسؤال مفتوح.', evidencePrompt: 'أشر إلى مرجع كل شرط في مخططك.' }
    ],
},
{
    topicSlug: 'state-diagram',
    objectives: [
        { id: 'state-objective-life', text: 'تحديد حالات كيان ودورة حياته وانتقالاته وفق قرارات المشروع.' },
        { id: 'state-objective-transition', text: 'كتابة انتقالات ذات حدث أو حارس ومصدر دون إضافة حالات افتراضية.' },
    ],
    sections: [
        { heading: 'المدخل: كيان تتغير حالته', body: 'استخدم state diagram لشيء له حالات مستقرة وانتقالات، لا لكل خطوة عابرة في رحلة المستخدم.' },
        { heading: 'الحالات والانتقالات', body: 'سمّ الحالات المعلومة، ثم اكتب الحدث أو الشرط الذي ينقل الكيان بينها. لا تفترض أن خطأ الشبكة حالة دائمة إذا كان مجرد حدث عابر.' },
        { heading: 'المصدر يضبط دورة الحياة', body: 'استخدم `stateDiagram-v2` واربط كل حالة وانتقال بمتطلب/قاعدة في PRD. اعرض ما لم يحسم كاعتماد أو سؤال بدلاً من اختراع حالة.' },
    ],
    practicalSteps: [
        { instruction: 'اختر كيان MVP وحدد الحالات الموثقة والحدث أو الشرط الذي ينقل بينها.', expectedOutput: '`docs/diagrams/state-diagrams.mmd` دورة حياة مصدرها متطلبات المنتج.' },
        { instruction: 'اكتب شرحاً للحالات والانتقالات وبيّن أين بقيت قاعدة غير محسومة.', expectedOutput: '`docs/diagrams/state-diagrams.md` يشرح الرسم ويحفظ الأسئلة المفتوحة.' },
    ],
    workedExample: { title: 'دورة الطلب', context: 'يمكن أن يذكر PRD حالات مثل قيد المراجعة ومقبول ومرفوض.', result: 'يرسم انتقالاً من قيد المراجعة إلى إحدى النتيجتين عند قرار المسؤول. لا يضيف حالة “منتهي” أو مؤقتاً آلياً إلا إذا ورد في المصدر.' },
    outputs: [
        { id: 'state-doc', description: '`docs/diagrams/state-diagrams.md` تعريف الحالات والأحداث ومصادرها.' },
        { id: 'state-code', description: '`docs/diagrams/state-diagrams.mmd` رسم `stateDiagram-v2` للكيان المحدد.' },
    ],
    questions: [
        { id: 'state-q-event', objectiveId: 'state-objective-transition', prompt: 'ما الذي ينبغي أن يفسر سهماً بين حالتي طلب؟', options: ['حدث أو شرط معتمد يغير حالة الكيان', 'لون السهم', 'اسم الشاشة فقط', 'اقتراح مصمم'], correct: 0, explanation: 'السهم يصف انتقالاً له محفز أو شرط في سلوك النظام؛ مصدره يثبت أنه انتقال حقيقي.' },
        { id: 'state-q-unknown', objectiveId: 'state-objective-life', prompt: 'لا يحدد PRD متى ينتهي الطلب المقبول. ما الذي تفعله؟', options: ['ترسم انتهاءً تلقائياً بعد 48 ساعة', 'تسجل موعد الانتهاء كسؤال ولا تضفه انتقالاً مؤكداً', 'تحذف حالة الطلب', 'تستخدم نهاية الرسم للحسم'], correct: 1, explanation: 'معلومة غير محسومة تبقى سؤالاً؛ وجود احتمال في قصة غير معتمدة لا يثبت قاعدة منتج.' },
    ],
    criteria: [
        { id: 'state-r-lifecycle', outputId: "state-code", name: 'دورة حياة مدعومة', description: 'الحالات والانتقالات تخص كياناً ومصادرها ظاهرة.', evidencePrompt: 'اربط حالتين وسهم الانتقال بمتطلب أو قرار.' },
        { id: 'state-r-unknown', outputId: "state-doc", name: 'الغموض محفوظ', description: 'الانتقال غير المحسوم لا يظهر كقاعدة معتمدة.', evidencePrompt: 'أشر إلى سؤال مفتوح أو اعتماد مرسوم بوضوح.' }
    ],
}
];

export const LEARNING_CONTENT_GROUP_A_05: Record<string, TopicLearningContent> =
  buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_05);
