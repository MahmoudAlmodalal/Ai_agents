import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_07: TopicDraft[] = [
{
    topicSlug: 'ui-ux-roles-navigation',
    objectives: [
        { id: 'uiux-objective-roles', text: 'تحويل أدوار PRD وصلاحياتهم إلى احتياجات وواجهات وتنقل واضح.' },
        { id: 'uiux-objective-scope', text: 'صياغة متطلبات تجربة المستخدم دون إضافة أدوار أو ميزات خارج النطاق.' },
    ],
    sections: [
        { heading: 'المدخل: دور ومهمة وصلاحية', body: 'ابدأ بأدوار PRD ثم سمّ المهمات المسموحة لكل دور. افصل ما يفعله المستخدم عما يفعله النظام وما يراه فقط.' },
        { heading: 'المعلومات والتنقل', body: 'اجمع الوجهات بحسب المهمة والعلاقة، ثم اقترح تنقلاً يتيح العثور على الخطوة التالية ويبين أين يوجد المستخدم.' },
        { heading: 'مصفوفة قبل رسم الواجهة', body: 'سجل الدور والإجراء ومرجعه وحالة الوصول. إذا غاب قرار الصلاحية، اتركه سؤالاً ولا تضف زر إدارة لكل مستخدم.' },
    ],
    practicalSteps: [
        { instruction: 'حوّل الأدوار والمهام المعتمدة إلى مصفوفة من يستطيع رؤية أو تنفيذ كل إجراء.', expectedOutput: '`docs/UI_UX_REQUIREMENTS.md` يشرح احتياجات الواجهة ومصفوفة صلاحيات الأدوار.' },
        { instruction: 'رتب الوجهات في نموذج تنقل، ثم راجع أن لكل مسار هدفاً ودوراً ومصدراً في نطاق MVP.', expectedOutput: '`docs/UI_UX_REQUIREMENTS.md` يتضمن نموذج تنقل يربط الوجهة بالمهمة والدور ومتطلب المصدر، مع تسجيل الأسئلة المفتوحة.' },
    ],
    workedExample: { title: 'BorrowHub اختياري: طالب ومسؤول معمل', context: 'الدوران في قصة BorrowHub لهما أفعال مختلفة.', result: 'الطالب يتابع طلبه، والمسؤول يراجعه ويسجل التسليم والإرجاع. لا يظهر إجراء مسؤول المعمل للطالب لمجرد أنه يستطيع فتح الصفحة.', caseStudy: 'borrowhub-optional' },
    outputs: [
        { id: 'uiux-requirements', description: '`docs/UI_UX_REQUIREMENTS.md` يوثق الأدوار والمهام والتنقل بين الوجهات مع متطلب المصدر وحالة القرار.' },
        { id: 'role-ui-matrix', description: 'مصفوفة الأدوار توضح الرؤية والإجراء والصلاحية ومصدر كل قرار.' },
    ],
    questions: [
        { id: 'uiux-q-role', objectiveId: 'uiux-objective-roles', prompt: 'كيف تحدد من يرى إجراء مراجعة الطلب؟', options: ['تطابقه مع صلاحيات الدور المعتمدة في PRD', 'تجعله متاحاً للجميع لتقليل الشاشات', 'تخمن من شكل الواجهة', 'تمنع كل الأدوار'], correct: 0, explanation: 'الواجهة تعرض الصلاحية المقررة؛ لا ينبغي أن تتجاوز أو تخترع قاعدة الوصول.' },
        { id: 'uiux-q-navigation', objectiveId: 'uiux-objective-scope', prompt: 'اقترح فريق شاشة جديدة للتوصيات لكنها ليست ضمن MVP. ما القرار الأنسب في خريطة التنقل؟', options: ['إضافتها تلقائياً لأنها تحسن التجربة', 'تأجيلها أو تسجيلها كاقتراح خارج النطاق', 'جعلها الصفحة الرئيسية', 'اعتبارها متطلباً'], correct: 1, explanation: 'التصميم يلتزم بالنطاق المعتمد؛ الأفكار الجديدة تسجل للمراجعة بدل توسيع MVP بصمت.' },
    ],
    criteria: [
        { id: 'uiux-r-permission', outputId: "role-ui-matrix", name: 'صلاحيات قابلة للتتبع', description: 'كل إجراء في المصفوفة مرتبط بدور وقرار مصدر.', evidencePrompt: 'اختر إجراءً وقارنه بمتطلب أو قرار معتمد.' },
        { id: 'uiux-r-navigation', outputId: "uiux-requirements", name: 'تنقل يطابق المهام', description: 'الوجهات تخدم الرحلات المتفق عليها ولا تضيف وظائف خارج النطاق.', evidencePrompt: 'اتبع مهمة المستخدم في نموذج التنقل حتى تصل إلى نتيجتها.' }
    ],
},
{
    topicSlug: 'ux-blueprint',
    objectives: [
        { id: 'uxbp-objective-states', text: 'توثيق الرحلات وخريطة الموقع وحالات الواجهة الأربع الأساسية لكل تجربة.' },
        { id: 'uxbp-objective-access', text: 'مراعاة الاستجابة وإمكانية الوصول في حالات النجاح والخطأ والفراغ.' },
    ],
    sections: [
        { heading: 'المدخل: مهمة ونقاط تلامس', body: 'اربط الهدف بالصفحة والمعلومات والأفعال التي يحتاجها المستخدم. امتد من بداية الرحلة إلى النتيجة والتعافي.' },
        { heading: 'حالات الواجهة والفحوص العابرة', body: 'لكل شاشة حدد حالات الواجهة الأربع: التحميل والفراغ والخطأ والنجاح. سجّل الاستجابة وإمكانية الوصول كفحصين عابرين للحالات، لا كحالتين مرئيتين للواجهة.' },
        { heading: 'التحقق', body: 'اكتب سلوكاً لكل حالة مع سبب ظهوره وكيف يتابع المستخدم. خطط لاتجاه RTL والنصوص التقنية LTR والوصول بلوحة المفاتيح.' },
    ],
    practicalSteps: [
        { instruction: 'ارسم Sitemap ورحلة MVP واربط الصفحات بالمهام والأدوار.', expectedOutput: '`docs/UX_BLUEPRINT.md` يضم خريطة الموقع ومسارات المستخدم.' },
        { instruction: 'املأ حالات التحميل والفراغ والخطأ والنجاح للشاشة، ثم أضف فحصي الاستجابة وإمكانية الوصول كمتطلبات عابرة.', expectedOutput: 'مصفوفة بأربع حالات واجهة وصفين لفحوص الاستجابة وإمكانية الوصول، مع سلوك أو دليل مطلوب لكل صف.' },
    ],
    workedExample: { title: 'قائمة معدات فارغة', context: 'تظهر شاشة المعدات قبل وجود نتائج أو عندما لا يطابق البحث شيئاً.', result: 'حالة الفراغ تشرح ما الذي يظهر الآن وتتيح العودة للمهمة أو تعديل البحث؛ لا تعرض خطأ تقنياً ولا تدعي أن النظام تعطل.' },
    outputs: [
        { id: 'ux-blueprint', description: '`docs/UX_BLUEPRINT.md` يشرح الرحلة وخريطة الموقع.' },
        { id: 'states-matrix', description: 'مصفوفة بأربع حالات واجهة وفحصي الاستجابة وإمكانية الوصول.' },
    ],
    questions: [
        { id: 'uxbp-q-empty', objectiveId: 'uxbp-objective-states', prompt: 'ما الذي يجب أن تحله حالة الفراغ عند عدم وجود معدات تطابق البحث؟', options: ['تخبر المستخدم بما حدث وتتيح إجراءً مفيداً مثل تعديل البحث', 'تظهر spinner إلى الأبد', 'تخفي الصفحة', 'تضع رسالة خطأ بلا وصف'], correct: 0, explanation: 'حالة الفراغ نتيجة صالحة تحتاج تفسيراً وخطوة متابعة؛ وهي غير حالة الخطأ.' },
        { id: 'uxbp-q-a11y', objectiveId: 'uxbp-objective-access', prompt: 'كيف تتحقق من إمكانية تشغيل الإجراء الأساسي بلوحة المفاتيح؟', options: ['تجربة ترتيب Tab والتركيز المرئي وتفعيل الإجراء دون فأرة', 'فحص لون الخلفية فقط', 'تغيير عرض الشاشة', 'افتراض أن كل div قابل للنقر'], correct: 0, explanation: 'الوصول يتطلب أن يصل المستخدم إلى التحكم ويراه ويشغله بلوحة المفاتيح.' },
    ],
    criteria: [
        { id: 'uxbp-r-states', outputId: "states-matrix", name: 'اكتمال الحالات', description: 'لكل حالة وصف وسلوك وخطوة متابعة تناسبها.', evidencePrompt: 'اختر حالة فراغ أو خطأ واتبع ما سيراه المستخدم بعدها.' },
        { id: 'uxbp-r-journey', outputId: "ux-blueprint", name: 'رحلة مفهومة وميسرة', description: 'الرحلة تغطي المهمة الأساسية والاتجاه والاستجابة والوصول.', evidencePrompt: 'اتبع رحلة مستخدم باللوحة ومن شاشة هاتف مع تسجيل أي عائق.' }
    ],
},
{
    topicSlug: 'screen-inventory',
    objectives: [
        { id: 'inventory-objective-fields', text: 'جرد شاشات النطاق بربط كل شاشة بهدف ودور وبيانات وأفعال وحالات.' },
        { id: 'inventory-objective-coverage', text: 'التحقق من تغطية المتطلبات دون إضافة شاشة لا تسندها الرحلة.' },
    ],
    sections: [
        { heading: 'المدخل: رحلة ومتطلبات', body: 'اجمع الشاشات من Sitemap والرحلات وPRD. اسأل ما الذي يجعل الشاشة ضرورية لإتمام مهمة، ولا تخلط modal أو حالة واجهة بصفحة مستقلة بلا سبب.' },
        { heading: 'حقول الجرد', body: 'لكل شاشة وثق الهدف والمسار والدور والصلاحيات والمكونات والبيانات والإجراءات وقواعد التحقق والحالات.' },
        { heading: 'تغطية من وإلى المتطلب', body: 'كل شاشة تغطي هدفاً/متطلباً، وكل متطلب يحتاج واجهة أو سبباً لعدم وجودها. لا تنسخ عناصر غير مؤكدة من قائمة أفكار.' },
    ],
    practicalSteps: [
        { instruction: 'احصر الشاشات اللازمة لرحلة MVP واملأ حقول الهدف والدور والبيانات والإجراءات والتحقق.', expectedOutput: '`docs/SCREEN_INVENTORY.md` يحتوي جدول جرد بأصحاب الصلاحيات ومصادرها.' },
        { instruction: 'اربط معرفات المتطلبات بالشاشات وراجع العناصر بلا رابط أو المتطلبات بلا تغطية.', expectedOutput: 'مصفوفة تتبع متطلبات إلى شاشات مع قرارات واضحة للنواقص.' },
    ],
    workedExample: { title: 'شاشة مراجعة المسؤول', context: 'قصة المشروع تحدد مسؤولاً يراجع طلب استعارة.', result: 'يصف الجرد الهدف والدور والبيانات المطلوبة وإجراء قبول/رفض والنتيجة، مع ربطها بالمتطلب. لا يضيف لوحة إحصاءات ما لم يطلبها النطاق.' },
    outputs: [
        { id: 'screen-inventory', description: '`docs/SCREEN_INVENTORY.md` يضم جدول الشاشات بالحقول المطلوبة.' },
        { id: 'screen-traceability', description: 'مصفوفة تربط الشاشات بمتطلبات PRD وتظهر أي نقص.' },
    ],
    questions: [
        { id: 'inventory-q-coverage', objectiveId: 'inventory-objective-coverage', prompt: 'وجدت متطلباً معتمداً بلا أي شاشة أو تفسير للمسار. ماذا يعني؟', options: ['يوجد نقص في التغطية أو قرار واجهة يحتاج توثيقاً', 'نضيف شاشة كيفما اتفق', 'نحذف المتطلب', 'لا يحتاج مراجعة'], correct: 0, explanation: 'الجرد يكشف فجوة بين المتطلبات والتجربة؛ لا يحسمها بإضافة صفحة غير مصممة.' },
        { id: 'inventory-q-fields', objectiveId: 'inventory-objective-fields', prompt: 'أي صف في الجرد أكثر فائدة للمراجعة؟', options: ['اسم الشاشة فقط', 'اسم وهدف ودور ومصدر بيانات وإجراءات وحالات', 'لونها المتوقع', 'عدد المكونات دون سلوك'], correct: 1, explanation: 'الجرد يربط المسار بالمستخدم والبيانات والسلوك، كي يمكن مراجعته مقابل المتطلب.' },
    ],
    criteria: [
        { id: 'inventory-r-detail', outputId: "screen-inventory", name: 'اكتمال تفاصيل الشاشة', description: 'كل شاشة تذكر هدفها ودورها ومسارها والبيانات والإجراءات والتحقق.', evidencePrompt: 'اختر شاشة وراجع حقول الجرد المطلوبة واحدة واحدة.' },
        { id: 'inventory-r-trace', outputId: "screen-traceability", name: 'تغطية النطاق', description: 'الروابط من المتطلب إلى شاشة واضحة ولا توجد شاشة خارج النطاق بلا سبب.', evidencePrompt: 'تتبع متطلباً وشاشة في الاتجاهين.' }
    ],
}
];

const groupA07Content = buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_07);

export const LEARNING_CONTENT_GROUP_A_07: Record<string, TopicLearningContent> = {
  ...groupA07Content,
  'ui-ux-roles-navigation': { ...groupA07Content['ui-ux-roles-navigation'], contentVersion: 2 },
};
