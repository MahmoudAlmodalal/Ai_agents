import type { TopicLearningContent } from '@/src/types/learning.ts';
import { TopicDraft, buildReviewedGroup } from '@/src/data/learning/group-a-common.ts';

export const TOPIC_DRAFTS_GROUP_A_03: TopicDraft[] = [
{
    topicSlug: 'git-project-docs',
    objectives: [
        { id: 'gitdocs-objective-history', text: 'تهيئة Git لحفظ وثائق المشروع في تغييرات صغيرة ذات رسائل قابلة للفهم.' },
        { id: 'gitdocs-objective-secrets', text: 'فحص ما سيدخل إلى commit وحماية الملفات المحلية والسرية قبل نشر المستودع.' },
    ],
    sections: [
        { heading: 'المدخل: ملفات المشروع قبل أول حفظ', body: 'راجع `docs/` و`README.md` وحالة العمل. أنشئ `.gitignore` قبل إضافة ملفات البيئة والمفاتيح.' },
        { heading: 'من مساحة العمل إلى commit', body: '`git status` يبين الملفات المتغيرة، و`git diff` يراجع التغييرات، و`git add` يختارها للمرحلة، و`git commit` يحفظ لقطة محلية. commit لا يعني أن الملفات وصلت إلى GitHub.' },
        { heading: 'نطاق السر', body: 'لا تضف سرّاً حقيقياً إلى Git. `.gitignore` يمنع تتبع الملفات غير المضافة مستقبلاً، ولا يمحو سراً سبق أن حُفظ في تاريخ Git؛ تعامل مع ذلك كتسريب يحتاج إزالة/تدوير السر.' },
    ],
    practicalSteps: [
        { instruction: 'هيئ المستودع وأضف قواعد تجاهل ملفات البيئة والمخرجات المؤقتة قبل إضافة الوثائق.', expectedOutput: 'مستودع محلي مع `.gitignore` يجتاز `git status` دون إظهار ملفات الأسرار.' },
        { instruction: 'افحص الفرق والمرحلة، ثم احفظ الوثائق في commit باسم يوضح المحتوى وأنشئ فرع الوثائق المقترح.', expectedOutput: 'commit أولي يضم الملفات المقصودة فقط، وفارق يمكن مراجعته على فرع عمل.' },
    ],
    workedExample: { title: 'حفظ وثائق MVP', context: 'ملف `docs/PROJECT_CONTEXT.md` جاهز، ويحتوي المشروع أيضاً على `.env.local` محلي.', result: 'تضاف قاعدة تجاهل `.env.local` قبل stage؛ يفحص المتعلم `git status` و`git diff --cached` ثم يحفظ ملف السياق. لا يرفع المفتاح إلى commit ولا يظن أن تجاهله لاحقاً يمحو تاريخاً سابقاً.', caseStudy: 'learner-project' },
    outputs: [
        { id: 'local-repository', description: 'مستودع Git محلي مع `.gitignore` وتاريخ commit مفهوم.' },
        { id: 'tracked-docs', description: 'وثائق `docs/` و`README.md` محفوظة من دون ملفات أسرار.' },
    ],
    questions: [
        { id: 'gitdocs-q-ignore', objectiveId: 'gitdocs-objective-secrets', prompt: 'اكتشفت أن مفتاحاً حقيقياً دخل commit سابقاً ثم أضفت ملفه إلى `.gitignore`. ما الاستنتاج الصحيح؟', options: ['اختفى السر من تاريخ Git تلقائياً', 'يجب اعتبار السر مسرباً وتدويره، لأن تجاهل الملف لاحقاً لا يمحو commit السابق', 'أصبح آمناً بعد حذف نسخة العمل', 'يمنع GitHub الجميع من رؤية التاريخ'], correct: 1, explanation: 'قواعد التجاهل لا تعيد كتابة التاريخ. يجب إبطال السر والتعامل مع سجل المستودع وفق إجراء معالجة التسريب.' },
        { id: 'gitdocs-q-commit', objectiveId: 'gitdocs-objective-history', prompt: 'أين تتحقق من الملفات التي ستدخل في commit قبل حفظه؟', options: ['`git diff --cached` مع `git status`', '`git log` فقط قبل أي تعديل', 'إعدادات محرر النصوص', '`git remote -v`'], correct: 0, explanation: 'مراجعة المرحلة والحالة تكشف بالضبط ما سيحفظ محلياً، وتساعد على استبعاد ملفات غير مقصودة.' },
    ],
    criteria: [
        { id: 'gitdocs-r-ignore', outputId: "local-repository", name: 'فحص الأسرار قبل الحفظ', description: 'قواعد التجاهل موجودة ومرحلة Git لا تحتوي ملفات سرية.', evidencePrompt: 'أظهر `.gitignore` ونتيجة `git status` أو `git diff --cached` دون طباعة أسرار.' },
        { id: 'gitdocs-r-history', outputId: "tracked-docs", name: 'تاريخ قابل للمراجعة', description: 'الـcommit يحفظ وثائق مقصودة برسالة واضحة وفارق مفهوم.', evidencePrompt: 'أشر إلى commit وفارقه والملفات التي تم تضمينها.' }
    ],
},
{
    topicSlug: 'github-docs-collaboration',
    objectives: [
        { id: 'githubdocs-objective-remote', text: 'ربط المستودع المحلي بمستودع GitHub بعيد مع التحقق من الفرع والوجهة.' },
        { id: 'githubdocs-objective-review', text: 'استخدام Pull Request لمراجعة وثائق واضحة وفحص الأسرار قبل النشر.' },
    ],
    sections: [
        { heading: 'المدخل: تاريخ محلي نظيف', body: 'يأتي GitHub بعد commits محلية مقصودة وملف README يشرح المشروع ومجلد الوثائق.' },
        { heading: 'المستودع البعيد وPull Request', body: 'remote يحدد الوجهة؛ push يرسل commits؛ Pull Request يطلب مراجعة التغييرات قبل دمجها. راجع المقارنة والفرع الهدف والمراجعات المطلوبة قبل الدمج.' },
        { heading: 'النشر مسؤولية منفصلة', body: 'افحص الأسرار في الملفات والتاريخ، واستخدم صلاحيات مناسبة. منع السر من README وحده لا يكفي إن كان محفوظاً في commit آخر.' },
    ],
    practicalSteps: [
        { instruction: 'أنشئ مستودعاً بعيداً مناسباً ثم تحقق من `git remote -v` والفرع الحالي قبل push.', expectedOutput: 'remote موثق يشير إلى مستودع مشروعك الصحيح مع README يشرح الفكرة وبنية docs/.' },
        { instruction: 'ادفع فرع الوثائق وافتح Pull Request يوضح الهدف والملفات وكيف يراجعها زميلك؛ لا تدمج قبل فحص التغييرات.', expectedOutput: 'Pull Request قابل للمراجعة مع سجل تغييرات ووصف واضح وفحص أسرار.' },
    ],
    workedExample: { title: 'مراجعة PRD قبل الدمج', context: 'بعد إنشاء PRD على فرع `docs/prd`, يريد زميل مراجعة المتطلبات والافتراضات.', result: 'يفتح PR من `docs/prd` إلى الفرع المتفق عليه، ويلخص مصدر المتطلبات والأسئلة المفتوحة. يراجع الزميل diff ولا يطلب نشر `.env.local`.' },
    outputs: [
        { id: 'remote-repository', description: 'مستودع GitHub بعيد مضبوط وREADME تعريفي يشرح المشروع والوثائق.' },
        { id: 'review-pull-request', description: 'Pull Request للوثائق يمكن فيه مراجعة diff والأسئلة قبل الدمج.' },
    ],
    questions: [
        { id: 'githubdocs-q-pr', objectiveId: 'githubdocs-objective-review', prompt: 'ما وظيفة Pull Request في رحلة توثيق مشروعك؟', options: ['يرسل commit إلى جهاز زميل بلا مراجعة', 'يطلب مراجعة فرق فرع قبل دمجه في هدف محدد', 'يستبدل `git status` محلياً', 'يمحو الأسرار من كل النسخ'], correct: 1, explanation: 'Pull Request يعرض التغييرات للمراجعة والنقاش قبل الدمج؛ لا ينفذ وحده تنظيف السر من التاريخ.' },
        { id: 'githubdocs-q-remote', objectiveId: 'githubdocs-objective-remote', prompt: 'قبل أول push، ما الفحص الذي يساعدك على تجنب إرسال المستودع إلى وجهة خاطئة؟', options: ['مراجعة `git remote -v` والفرع الحالي والمرحلة', 'تغيير اسم README', 'حذف commit محلي', 'فتح إعدادات الألوان'], correct: 0, explanation: 'التحقق من الوجهة والفرع والملفات المقصودة يقلل نشر تغييرات في مستودع أو فرع غير صحيح.' },
    ],
    criteria: [
        { id: 'githubdocs-r-remote', outputId: "remote-repository", name: 'وجهة معلومة', description: 'الremote والفرع الهدف متوافقان مع المستودع المقصود.', evidencePrompt: 'أظهر اسم المستودع والفرع من إعدادات المشروع دون إظهار بيانات اعتماد.' },
        { id: 'githubdocs-r-review', outputId: "review-pull-request", name: 'مراجعة قبل الدمج', description: 'PR يوضح التغيير ويتيح فحصه، ولا يحتوي أسراراً.', evidencePrompt: 'أشر إلى الوصف والـdiff وفحوص السر أو المراجعة المسجلة.' }
    ],
}
];

export const LEARNING_CONTENT_GROUP_A_03: Record<string, TopicLearningContent> =
  buildReviewedGroup(TOPIC_DRAFTS_GROUP_A_03);
