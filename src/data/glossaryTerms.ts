export interface GlossaryDefinition {
  term: string;
  label: string;
  description: string;
  href: string;
}

export const GLOSSARY_TOOLTIP_TERMS: Record<string, GlossaryDefinition> = {
  MVP: {
    term: 'MVP',
    label: 'النسخة الأولية القابلة للإطلاق (MVP)',
    description: 'أبسط إصدار من المنتج يحل المشكلة الأساسية لاختبار الفكرة عملياً مع المستخدمين بسرعة وبأقل جهد.',
    href: '/glossary#mvp',
  },
  PRD: {
    term: 'PRD',
    label: 'وثيقة متطلبات المنتج (PRD)',
    description: 'ملف يحدد ما الذي سنبنيه، ولماذا، وقواعد عمل النظام وقصص المستخدمين بالتفصيل قبل كتابة الكود.',
    href: '/glossary#prd',
  },
  SRS: {
    term: 'SRS',
    label: 'مواصفات متطلبات البرمجيات (SRS)',
    description: 'وثيقة تصف السلوك البرمجي الدقيق للنظام، وشروط القبول والمواصفات التشغيلية التي تضمن جودة الكود.',
    href: '/glossary#srs',
  },
  MCP: {
    term: 'MCP',
    label: 'بروتوكول سياق النموذج (MCP)',
    description: 'معيار يتيح للذكاء الاصطناعي التواصل مباشرة مع بيئة عملك (الملفات، قواعد البيانات، الأدوات الخارجية).',
    href: '/glossary#mcp',
  },
  'Spec Kit': {
    term: 'Spec Kit',
    label: 'حزمة المواصفات التطبيقية (Spec Kit)',
    description: 'مجموعة من ملفات التخطيط والمواصفات (مثل PRD ومهام التنفيذ) لتوجيه الذكاء الاصطناعي بدقة.',
    href: '/glossary#spec-kit',
  },
  DBML: {
    term: 'DBML',
    label: 'لغة نمذجة قواعد البيانات (DBML)',
    description: 'لغة نصية مبسطة وسريعة لكتابة وتصميم جداول قاعدة البيانات وعلاقاتها بطريقة يفهمها المطور والذكاء الاصطناعي.',
    href: '/glossary#dbml',
  },
  ERD: {
    term: 'ERD',
    label: 'مخطط علاقات الكيانات (ERD)',
    description: 'رسم توضيحي يُظهر جداول قاعدة البيانات والحقول والعلاقات المنطقية التي تربط الجداول ببعضها.',
    href: '/glossary#erd',
  },
  'User Flow': {
    term: 'User Flow',
    label: 'مسار تجربة المستخدم (User Flow)',
    description: 'خريطة الخطوات والشاشات التي يمر بها المستخدم من دخوله المنصة وحتى تحقيق هدفه المطلوب.',
    href: '/glossary#user-flow',
  },
  'Domain Model': {
    term: 'Domain Model',
    label: 'نموذج نطاق العمل (Domain Model)',
    description: 'تمثيل مفاهيمي للكيانات الأساسية في مشروعك وقواعد العمل والعلاقات بينها بلغة الواقع.',
    href: '/glossary#domain-model',
  },
  API: {
    term: 'API',
    label: 'واجهة برمجة التطبيقات (API)',
    description: 'جسر للتواصل يتيح للواجهة طلب البيانات وحفظها من الخادم أو الخدمات الخارجية.',
    href: '/glossary#api',
  },
  'Mock Data': {
    term: 'Mock Data',
    label: 'بيانات وهمية تجريبية (Mock Data)',
    description: 'بيانات افتراضية واقعية تُستخدم لاختبار الواجهة وبناء الشاشات قبل ربط قاعدة البيانات الحقيقية.',
    href: '/glossary#mock-data',
  },
  UI: {
    term: 'UI',
    label: 'واجهة المستخدم (UI)',
    description: 'العناصر المرئية التي يتفاعل معها المستخدم على الشاشة كالأزرار والنصوص والألوان والتنسيق.',
    href: '/glossary#ui',
  },
  UX: {
    term: 'UX',
    label: 'تجربة المستخدم (UX)',
    description: 'الشعور وسهولة الاستخدام والكفاءة التي يختبرها المستخدم أثناء إنجاز مهامه داخل التطبيق.',
    href: '/glossary#ux',
  },
};

export function getGlossaryTerm(rawTerm: string): GlossaryDefinition | undefined {
  const normalized = rawTerm.trim();
  const direct = GLOSSARY_TOOLTIP_TERMS[normalized];
  if (direct) return direct;

  const upper = normalized.toUpperCase();
  for (const [key, val] of Object.entries(GLOSSARY_TOOLTIP_TERMS)) {
    if (key.toUpperCase() === upper) return val;
  }
  return undefined;
}
