import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_10: TopicDraft[] = [
{
    topicSlug: 'stitch-mcp-integration',
    objectives: [
        { id: 'stitchmcp-objective-connect', text: 'التحقق من اتصال Stitch MCP قراءةً فقط بعد وجود مشروع وشاشة معتمدة.' },
        { id: 'stitchmcp-objective-fallback', text: 'توفير مسار يدوي عند غياب الاتصال وعدم كشف المفتاح.' },
    ],
    sections: [
        { heading: 'المدخل: أصول تصميم موجودة', body: 'هذا التكامل يأتي بعد تصميم شاشة مرجعية وفهم MCP. لا تنشئ أو تغير تصميمات قبل التحقق من المشروع والشاشات.' },
        { heading: 'ربط القراءة بأمان', body: 'استخدم إعداداً محلياً ومفتاحاً خارج المستودع. اطلب قائمة المشاريع ومعرفات الشاشات فقط ولا تطلب إخراج المفتاح.' },
        { heading: 'بديل يدوي كامل', body: 'عند غياب الاتصال، صدّر المرجع أو دوّن القيم التي يمكن فحصها ومصدرها في `docs/STITCH_SCREEN_REFERENCES.md`. سجل UNKNOWN لما لا يمكن التحقق منه.' },
    ],
    practicalSteps: [
        { instruction: 'تحقق من إعداد MCP ومشروع Stitch والشاشة المقصودة بطلب قراءة فقط، ولا تسمح بأي تعديل.', expectedOutput: '`docs/mcp/stitch-connection.md` يسجل المشروع والشاشات التي أمكن قراءتها ونتيجة الاتصال.' },
        { instruction: 'إذا تعذر الاتصال، وثق خطوات الفحص اليدوي والقيم المصدرية والمجهولة.', expectedOutput: '`docs/STITCH_SCREEN_REFERENCES.md` يتضمن رابطاً/معرفاً أو نتيجة غياب موثقة ومساراً يدوياً.' },
    ],
    workedExample: { title: 'استخراج مرجع شاشة', context: 'الشاشة المرجعية جاهزة في Stitch لكن خادم MCP غير متصل على جهاز المتعلم.', result: 'يستخدم المتعلم تصدير الشاشة وفحصها يدوياً؛ يسجل الألوان التي يستطيع إثباتها، ويكتب UNKNOWN للباقي، ولا يزعم أن التكامل نجح.' },
    outputs: [
        { id: 'stitch-reference', description: '`docs/STITCH_SCREEN_REFERENCES.md` بيانات شاشة مع مصدر وحالة التحقق.' },
        { id: 'stitch-connection', description: '`docs/mcp/stitch-connection.md` نتيجة الاتصال وخطوات البديل اليدوي.' },
    ],
    questions: [
        { id: 'stitchmcp-q-scope', objectiveId: 'stitchmcp-objective-connect', prompt: 'ما الطلب الآمن الأول للتحقق من الخادم؟', options: ['قراءة المشاريع ومعرفات الشاشات المقصودة دون تعديل أو كشف أسرار', 'إنشاء شاشات تلقائياً', 'طباعة API key للتأكد', 'حذف مشروع تجريبي'], correct: 0, explanation: 'فحص القراءة يؤكد الاتصال والهدف مع تقليل التغيير ومخاطر كشف الأسرار.' },
        { id: 'stitchmcp-q-fallback', objectiveId: 'stitchmcp-objective-fallback', prompt: 'ما الذي تسجله عندما لا تستطيع فحص لون في المرجع؟', options: ['قيمة متوقعة من صورة مشابهة', 'UNKNOWN وسبب تعذر التحقق', 'قيمة random', 'لون default للمتصفح'], correct: 1, explanation: 'المجهول يجب أن يبقى واضحاً حتى لا يتحول التخمين إلى قاعدة تصميم.' },
    ],
    criteria: [
        { id: 'stitchmcp-r-readonly', outputId: "stitch-connection", name: 'فحص اتصال قراءة فقط', description: 'الطلب يحدد المشروع والشاشات ولا يغيرها ولا يكشف السر.', evidencePrompt: 'أظهر نص الطلب وسجل نتيجة الاتصال دون أي قيمة سرية.' },
        { id: 'stitchmcp-r-fallback', outputId: "stitch-reference", name: 'بديل يدوي قابل للمتابعة', description: 'القيم موثقة بمصادرها والمجهول موسوم.', evidencePrompt: 'اختر قيمة ومصدرها ثم قيمة UNKNOWN وسببها.' }
    ],
},
{
    topicSlug: 'design-md-spec',
    objectives: [
        { id: 'designmd-objective-spec', text: 'كتابة DESIGN.md من هوية وقيم تصميم يمكن تأكيدها في مصادر معتمدة.' },
        { id: 'designmd-objective-trace', text: 'ربط كل token بالشاشة والمصدر والثقة وترك غير المتاح مجهولاً.' },
    ],
    sections: [
        { heading: 'المدخل: دليل مصمم أو شاشة', body: 'استخدم الشاشة المرجعية وتصديرها وملاحظات الفحص. لا تختر هوية جديدة إذا كان المطلوب توثيق الهوية الموجودة.' },
        { heading: 'العقد لا التخمين', body: 'وثق الألوان والخطوط والمسافات والحواف والمكونات مع المصدر والشاشة والثقة. اكتب UNKNOWN وسبب النقص إذا لم يمكن قراءة قيمة.' },
        { heading: 'يفصل الرمز عن المتطلب', body: 'DESIGN.md يصف قواعد الواجهة؛ لا يغير أدوار أو رحلات PRD. استخدمه في التنفيذ للمطابقة ثم حدثه فقط حين يظهر قرار تصميم جديد قابل للإثبات.' },
    ],
    practicalSteps: [
        { instruction: 'اجمع القيم المؤكدة من مراجع Stitch وسجل مصادرها وشاشاتها، واترك أي قيمة غير قابلة للفحص UNKNOWN.', expectedOutput: '`docs/DESIGN_TOKENS.md` جدول قيم ومصادر وحالة ثقة.' },
        { instruction: 'اكتب قواعد التصميم ومكونات الواجهة التي يسندها الدليل ثم راجع اتساقها مع المرجع وPRD.', expectedOutput: '`DESIGN.md` عقد تصميم يمكن للوكيل تطبيقه دون تخمين.' },
    ],
    workedExample: { title: 'توثيق لون رئيسي', context: 'فاحص Stitch يعرض لون زر أساسي من الشاشة المرجعية.', result: 'يكتب DESIGN.md قيمة اللون مع رابط الشاشة واسم token. إذا لم يظهر مصدر القيمة، يحتفظ الجدول بـUNKNOWN ولا يخترع hex.' },
    outputs: [
        { id: 'design-md', description: '`DESIGN.md` قواعد تصميم مستندة إلى مصادر فعلية.' },
        { id: 'design-tokens', description: '`docs/DESIGN_TOKENS.md` اسم وقيمة ومصدر شاشة وثقة أو UNKNOWN.' },
    ],
    questions: [
        { id: 'designmd-q-unknown', objectiveId: 'designmd-objective-trace', prompt: 'ما الاستجابة الصحيحة إذا لم يمكن التأكد من مسافة بين مكونين؟', options: ['كتابة 16px لأنها شائعة', 'تسجيل UNKNOWN وسبب نقص الدليل', 'نسخ قيمة من موقع آخر', 'حذف مصدر الشاشة'], correct: 1, explanation: 'القيمة غير المدعومة لا يجب أن تظهر كحقيقة. يوضح UNKNOWN ما يجب فحصه قبل التنفيذ.' },
        { id: 'designmd-q-role', objectiveId: 'designmd-objective-spec', prompt: 'ما الذي لا ينبغي أن يقرره DESIGN.md؟', options: ['توكن لون له مصدر', 'نمط خط موثق', 'صلاحيات المستخدمين أو نطاق المنتج بدلاً من PRD', 'مسافات قابلة للفحص'], correct: 2, explanation: 'وثيقة التصميم تصف المظهر وقواعد الواجهة؛ متطلبات الأدوار والوظائف لها مصدر منفصل.' },
    ],
    criteria: [
        { id: 'designmd-r-token', outputId: "design-tokens", name: 'قيم مسندة', description: 'الرموز لها مصادر حقيقية أو موسومة UNKNOWN.', evidencePrompt: 'اختر token وتحقق من مصدر الشاشة والقيمة.' },
        { id: 'designmd-r-scope', outputId: "design-md", name: 'نطاق وثيقة التصميم', description: 'قواعد الواجهة لا تستبدل متطلبات PRD أو تضيف قرارات منتج.', evidencePrompt: 'قارن قاعدة واجهة بمتطلب وظيفي وتأكد من عدم تعارض الوثيقتين.' }
    ],
}
];

export const LEARNING_CONTENT_GROUP_A_10: Record<string, TopicLearningContent> =
  buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_10);
