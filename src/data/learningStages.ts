import React from 'react';
import { 
  Compass, 
  Layers, 
  Database, 
  Layout, 
  CheckCircle2, 
  Rocket 
} from 'lucide-react';

export interface LearningStage {
  stageNumber: string;
  title: string;
  badge: string;
  duration: string;
  icon: React.ElementType;
  colorClass: 'emerald' | 'blue' | 'amber' | 'purple' | 'rose' | 'cyan';
  goal: string;
  whatYouLearn: string[];
  deliverables: string[];
  startSlug: string;
  startTopicTitle: string;
}

export const LEARNING_STAGES: LearningStage[] = [
  {
    stageNumber: '01',
    title: 'المرحلة التأسيسية: الفكرة ونطاق النسخة الأولى والتوثيق',
    badge: 'المواضيع 01–06',
    duration: '6 ساعات',
    icon: Compass,
    colorClass: 'emerald',
    goal: 'بلورة المشكلة وتحديد الجمهور المستهدف وتفصيل نطاق MVP، ثم حسم القرارات عبر مقابلة استجواب وتوثيق متطلبات النظام في مستودع منظم.',
    whatYouLearn: [
      'صياغة سياق المشروع وعرض القيمة وتحديد نطاق النسخة الأولى (MVP).',
      'طرح أسئلة التحدي وحسم الافتراضات عبر جلسة استجواب Grill Me.',
      'كتابة وتوثيق وثائق متطلبات المنتج (PRD) ومواصفات سلوك النظام (SRS).',
      'تأسيس مستودع Git وGitHub وهيكلة مجلد وثائق المشروع docs/ بشكل احترافي.'
    ],
    deliverables: [
      'docs/PRD.md (وثيقة المتطلبات)',
      'docs/SRS.md (مواصفات النظام)',
      'docs/PROJECT_CONTEXT.md (سياق المشروع)',
      'مستودع Git مهيأ بهيكل الفروع'
    ],
    startSlug: 'project-idea-mvp',
    startTopicTitle: 'فكرة المشروع ونطاق النسخة الأولى (MVP)',
  },
  {
    stageNumber: '02',
    title: 'المرحلة المعمارية: مسارات المستخدم والنمذجة ومخططات السلوك',
    badge: 'المواضيع 07–26',
    duration: '10 ساعات',
    icon: Layers,
    colorClass: 'blue',
    goal: 'تحويل المتطلبات النصية إلى تمثيلات بصرية وهندسية دقيقة تشمل مسارات المستخدم، المخططات المفاهيمية، ومخططات السلوك والتسلسل.',
    whatYouLearn: [
      'كتابة وتوليد مخططات Mermaid لمسارات المستخدم (User Flows) وحالات الاستخدام.',
      'صياغة النموذج المفاهيمي (Conceptual Domain Model) وتفكيك الكيانات والعلاقات.',
      'رسم مخططات السلوك المعماري والنشاط وتغير الحالات باستخدام PlantUML.',
      'نمذجة التفاعل والتسلسل الزمني للعمليات بين المستخدم والواجهة والخادم.'
    ],
    deliverables: [
      'docs/user-flow.md (مسارات المستخدم)',
      'docs/domain-model.md (النموذج المفاهيمي)',
      'مخططات UML (Use Case, Activity, State, Sequence)'
    ],
    startSlug: 'mermaid-syntax',
    startTopicTitle: 'صياغة المخططات باستخدام Mermaid',
  },
  {
    stageNumber: '03',
    title: 'مرحلة هندسة البيانات: قواعد البيانات العلائقية وهياكل النماذج',
    badge: 'المواضيع 27–30',
    duration: '5 ساعات',
    icon: Database,
    colorClass: 'amber',
    goal: 'تصميم نموذج البيانات العلائقي (ERD)، توصيف المخطط بلغة DBML، وإعداد مخططات الكلاسات ومخططات التسلسل للربط مع الكود.',
    whatYouLearn: [
      'تصميم مخطط الكيانات العلائقية (Relational ERD) وتحديد العلاقات والمفاتيح الأساسية والأجنبية.',
      'توصيف بنية الجداول والحقول باستخدام لغة DBML وأدوات مثل dbdiagram.io.',
      'تصميم مخططات الفئات (Class Diagrams) وربط سمات الكيانات بدوال النظام.',
      'إدارة قيود التطبيع، سلامة البيانات، وتخطيط عمليات الترحيل (Migrations).'
    ],
    deliverables: [
      'docs/ERD.md (مخطط الكيانات العلائقية)',
      'docs/database.dbml (توصيف قاعدة البيانات)',
      'docs/class-diagram.md (مخطط الفئات)'
    ],
    startSlug: 'relational-erd-design',
    startTopicTitle: 'تصميم مخطط الكيانات العلائقية (ERD)',
  },
  {
    stageNumber: '04',
    title: 'مرحلة واجهات المستخدم وتطوير الفرونت إند والخادم',
    badge: 'المواضيع 31–53',
    duration: '12 ساعة',
    icon: Layout,
    colorClass: 'purple',
    goal: 'تخطيط تجربة الاستخدام، تصميم الشاشات المرجعية في Stitch، وتوجيه وكلاء الذكاء الاصطناعي لبناء الواجهة والخادم وفق منهجية Spec Kit.',
    whatYouLearn: [
      'تحديد أدوار المستخدمين وهيكل التنقل وجرد كافة الشاشات (Screen Inventory).',
      'تصميم الواجهات في Stitch وربط خادم Stitch MCP وتوثيق لغة التصميم في DESIGN.md.',
      'بناء واجهات Next.js المتجاوبة بالاعتماد على React وTypeScript وTailwind CSS.',
      'منهجية Spec Kit: تفكيك المهمة الكبيرة إلى مهام صغيرة محكمة ومراجعة UI/UX.',
      'بناء الخادم وعقود API في Python (Django / FastAPI) وربط الواجهة بالخادم.'
    ],
    deliverables: [
      'docs/DESIGN.md (نظام ومواصفات التصميم)',
      'docs/SCREEN_INVENTORY.md (جرد الشاشات)',
      'كود الواجهة التفاعلية Next.js والخادم الخلفي'
    ],
    startSlug: 'ui-ux-roles-navigation',
    startTopicTitle: 'تخطيط أدوار المستخدمين وهيكل التنقل',
  },
  {
    stageNumber: '05',
    title: 'مرحلة الجودة والتحقق: الاختبارات وضمان تكامل النظام',
    badge: 'المواضيع 54–55',
    duration: '4 ساعات',
    icon: CheckCircle2,
    colorClass: 'rose',
    goal: 'التحقق الصارم من عمل النظام ككل، اختبار مسار المستخدم من البداية للنهاية (Full-Stack)، وفحص حالات الخطأ واستقرار الأداء.',
    whatYouLearn: [
      'تصميم اختبارات رحلة المستخدم الكاملة (End-to-End User Journeys).',
      'فحص تكامل الواجهة الأمامية مع الخادم وقواعد البيانات واستجابة حالات الخطأ.',
      'إجراء تدقيق الجودة الشامل وتطبيق قائمة فحص الجودة الموحدة قبل التسليم.',
      'تحسين استعلامات قواعد البيانات والتأكد من عدم وجود اختناقات في الأداء.'
    ],
    deliverables: [
      'جناح اختبارات تكاملي مؤتمت (Automated E2E Tests)',
      'docs/QA_REPORT.md (تقرير فحص الجودة والتحقق)'
    ],
    startSlug: 'frontend-backend-integration',
    startTopicTitle: 'ربط الواجهة الأمامية بالخادم الخلفي',
  },
  {
    stageNumber: '06',
    title: 'مرحلة التسليم والتشغيل: النشر السحابي ويوم العرض والملف المهني',
    badge: 'المواضيع 56–58',
    duration: '3 ساعات',
    icon: Rocket,
    colorClass: 'cyan',
    goal: 'تجهيز حزمة التسليم، نشر التطبيق وقاعدة البيانات سحابياً، كتابة دليل التشغيل، وصياغة دراسة حالة هندسية لملف إنجازك (Portfolio).',
    whatYouLearn: [
      'تجهيز الحاويات (Docker) وإعداد بيئات التشغيل وخوادم Linux.',
      'نشر التطبيق سحابياً على منصات مثل Vercel / Netlify وإعداد قواعد البيانات الإنتاجية.',
      'إعداد دليل التشغيل والصيانة وحزمة تسليم المشروع الهندسية.',
      'تقديم المشروع في يوم العرض (Demo Day) وتوثيق الإنجاز المهني بصدق هندسي.'
    ],
    deliverables: [
      'رابط تطبيق حي منشور على السحابة',
      'docs/OPERATIONS_RUNBOOK.md (دليل التشغيل)',
      'docs/PORTFOLIO_ENTRY.md (دراسة الحالة وملف الإنجاز)'
    ],
    startSlug: 'docker-container-workflow',
    startTopicTitle: 'سير عمل الحاويات وتطبيق Docker',
  },
];
