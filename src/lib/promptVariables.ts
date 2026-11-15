export const LEARNER_PROFILE_STORAGE_KEY = 'ai-agents-learner-profile-v1';
export const PROMPT_VARIABLES_STORAGE_KEY = 'ai-agents-prompt-vars-v1';
export const PROMPT_VARIABLES_CHANGE_EVENT = 'ai-agents-prompt-vars-change';

export interface PromptVariableDefinition {
  key: string;
  label: string;
  question: string;
  placeholder: string;
  defaultValue: string;
  isGlobal?: boolean;
  multiline?: boolean;
}

export interface PromptVariableSchema {
  slug: string;
  titleAr: string;
  variables: PromptVariableDefinition[];
  interpolate: (baseBody: string, values: Record<string, string>) => string;
}

export interface LearnerProjectProfile {
  projectName: string;
  projectSummary: string;
  targetAudience: string;
  mvpScope: string;
}

export const DEFAULT_PROJECT_PROFILE: LearnerProjectProfile = {
  projectName: 'منصة BorrowHub لاستعارة المعدات الجامعية',
  projectSummary: 'نظام لتنظيم استعارة الأجهزة والمعدات بين طلبة ومختبرات الجامعة وحل مشكلة ضياع العهد وتأخر الإرجاع.',
  targetAudience: 'طلبة الجامعة ومشرفو المعامل والمختبرات وإدارة القسم.',
  mvpScope: 'تصفح قائمة المعدات المتوفرة، تقديم طلب استعارة، موافقة المشرف، وسجل تتبع مواعيد الإرجاع النشطة.',
};

export const PILOT_PROMPT_SCHEMAS: Record<string, PromptVariableSchema> = {
  'prompt-01-grill-me-product-discovery': {
    slug: 'prompt-01-grill-me-product-discovery',
    titleAr: 'Grill Me: استكشاف المنتج',
    variables: [
      {
        key: 'projectName',
        label: 'اسم المشروع',
        question: 'ما هو اسم مشروعك المقترح؟',
        placeholder: 'مثال: منصة BorrowHub',
        defaultValue: DEFAULT_PROJECT_PROFILE.projectName,
        isGlobal: true,
      },
      {
        key: 'projectSummary',
        label: 'فكرة المشروع والمشكلة',
        question: 'ما هي المشكلة الأساسية التي يعالجها المشروع؟',
        placeholder: 'صف المشكلة والحل المقترح باختصار',
        defaultValue: DEFAULT_PROJECT_PROFILE.projectSummary,
        isGlobal: true,
        multiline: true,
      },
      {
        key: 'targetAudience',
        label: 'الفئات والمستخدمون المستهدفون',
        question: 'من هم مستخدمو النظام وأدوارهم الأساسية؟',
        placeholder: 'مثال: طلبة، أساتذة، مشرفو مختبرات',
        defaultValue: DEFAULT_PROJECT_PROFILE.targetAudience,
        isGlobal: true,
      },
      {
        key: 'mvpScope',
        label: 'نطاق النسخة الأولية (MVP)',
        question: 'ما هي الميزات المحورية فقط التي ستشملها النسخة الأولى؟',
        placeholder: 'حدد الميزات الأساسية واستبعد المؤجلة',
        defaultValue: DEFAULT_PROJECT_PROFILE.mvpScope,
        isGlobal: true,
        multiline: true,
      },
      {
        key: 'focusTopic',
        label: 'نقطة التركيز في المقابلة',
        question: 'ما هو الجانب الأكثر غموضًا الذي تريد أن يركز عليه المساعد أولاً؟',
        placeholder: 'مثال: شروط الاستعارة، منع الحجز المزدوج، سياسة التأخير',
        defaultValue: 'قواعد حجز الأجهزة ومنع التعارض الزمني، وصلاحيات اعتماد مشرف المعمل.',
        isGlobal: false,
      },
    ],
    interpolate: (baseBody, values) => {
      const name = values.projectName?.trim() || DEFAULT_PROJECT_PROFILE.projectName;
      const summary = values.projectSummary?.trim() || DEFAULT_PROJECT_PROFILE.projectSummary;
      const audience = values.targetAudience?.trim() || DEFAULT_PROJECT_PROFILE.targetAudience;
      const mvp = values.mvpScope?.trim() || DEFAULT_PROJECT_PROFILE.mvpScope;
      const focus = values.focusTopic?.trim() || 'قواعد حجز الأجهزة وصلاحيات الاعتماد.';

      const contextHeader = [
        `Act as a Senior Product Manager and Business Analyst.`,
        `I want to discover the requirements for my web application: "${name}".`,
        ``,
        `### سياق مشروعي المخصص (Project Context):`,
        `- اسم المشروع: ${name}`,
        `- فكرة المشروع والمشكلة: ${summary}`,
        `- المستخدمون والأدوار: ${audience}`,
        `- نطاق النسخة الأولية MVP: ${mvp}`,
        `- نقطة التركيز ذات الأولوية: ${focus}`,
      ].join('\n');

      return baseBody.replace(
        /Act as a Senior Product Manager and Business Analyst\.\s*I want to discover the requirements for my web application\./,
        contextHeader,
      );
    },
  },

  'prompt-16-project-specific-stitch-master-prompt-generator': {
    slug: 'prompt-16-project-specific-stitch-master-prompt-generator',
    titleAr: 'برومبت Stitch الرئيسي للمشروع',
    variables: [
      {
        key: 'projectName',
        label: 'اسم المشروع',
        question: 'ما هو اسم مشروعك؟',
        placeholder: 'مثال: BorrowHub',
        defaultValue: DEFAULT_PROJECT_PROFILE.projectName,
        isGlobal: true,
      },
      {
        key: 'targetAudience',
        label: 'الفئة المستهدفة',
        question: 'من هو المستخدم الأساسي لهذه الواجهة؟',
        placeholder: 'مثال: طلبة الجامعة والمشرفون',
        defaultValue: DEFAULT_PROJECT_PROFILE.targetAudience,
        isGlobal: true,
      },
      {
        key: 'representativeScreen',
        label: 'الشاشة الممثلة الأولى',
        question: 'ما هي الشاشة الرئيسية الأولى التي تريد بناءها وتثبيت نظام التصميم من خلالها؟',
        placeholder: 'مثال: لوحة التحكم الرئيسية Dashboard',
        defaultValue: 'لوحة التحكم الرئيسية (Dashboard) لعرض الأجهزة المتاحة وحالة الاستعارات الحالية.',
        isGlobal: false,
      },
      {
        key: 'visualDirection',
        label: 'الهوية البصرية وطابع الألوان',
        question: 'ما هي الألوان والطابع العام للواجهة؟',
        placeholder: 'مثال: طابع حديث وأنيق مع درجات الزمردي والرمادي الداكن ودعم RTL',
        defaultValue: 'تصميم داكن ناعم (Dark mode slate/emerald)، بطاقات واضحة، وأزرار توجيهية خضراء مع دعم كامل للعربية RTL.',
        isGlobal: false,
      },
      {
        key: 'primaryActions',
        label: 'الإجراءات والتفاعلات الأساسية',
        question: 'ما هي الأزرار والتفاعلات التي يجب أن تظهر في الشاشة الأولى؟',
        placeholder: 'مثال: تصفح المعدات، طلب استعارة، فلترة الأقسام',
        defaultValue: 'بطاقات المعدات، زر «طلب استعارة»، شريط بحث وفلاتر المعامل، وتنبيهات مواعيد التسليم.',
        isGlobal: false,
      },
    ],
    interpolate: (baseBody, values) => {
      const name = values.projectName?.trim() || DEFAULT_PROJECT_PROFILE.projectName;
      const audience = values.targetAudience?.trim() || DEFAULT_PROJECT_PROFILE.targetAudience;
      const screen = values.representativeScreen?.trim() || 'لوحة التحكم الرئيسية (Dashboard)';
      const visual = values.visualDirection?.trim() || 'طابع داكن حديث متناسق مع دعم RTL';
      const actions = values.primaryActions?.trim() || 'تصفح المعدات وطلب الاستعارة والفلترة';

      const contextBlock = [
        `Act as a Google Stitch Prompt Engineer.`,
        `Read PRD, UX_BLUEPRINT.md, SCREEN_INVENTORY.md and approved branding.`,
        ``,
        `### محددات مشروعي المخصص (Project Context & Inputs):`,
        `- اسم المشروع: ${name}`,
        `- الجمهور المستهدف: ${audience}`,
        `- الشاشة الممثلة الأولى المطلوبة: ${screen}`,
        `- الهوية البصرية ونمط الألوان: ${visual}`,
        `- الإجراءات والمكونات الأساسية: ${actions}`,
        `- اللغة والاتجاه: العربية باتجاه اليمين (RTL)`,
      ].join('\n');

      return baseBody.replace(
        /Act as a Google Stitch Prompt Engineer\.\s*Read PRD, UX_BLUEPRINT\.md, SCREEN_INVENTORY\.md and approved branding\./,
        contextBlock,
      );
    },
  },

  'prompt-31-frontend-phased-implementation-plan': {
    slug: 'prompt-31-frontend-phased-implementation-plan',
    titleAr: 'خطة تنفيذ الواجهة على مراحل',
    variables: [
      {
        key: 'projectName',
        label: 'اسم المشروع',
        question: 'ما هو اسم مشروعك؟',
        placeholder: 'مثال: BorrowHub',
        defaultValue: DEFAULT_PROJECT_PROFILE.projectName,
        isGlobal: true,
      },
      {
        key: 'mvpScope',
        label: 'نطاق الواجهة (MVP Scope)',
        question: 'ما هي حدود واجهات النسخة الأولى المستهدفة؟',
        placeholder: 'مثال: تصفح، لوحة تحكم، صفحة طلب',
        defaultValue: DEFAULT_PROJECT_PROFILE.mvpScope,
        isGlobal: true,
        multiline: true,
      },
      {
        key: 'firstTask',
        label: 'المهمة الأولى الجاهزة للتنفيذ',
        question: 'ما هي المهمة الصغيرة المحددة التي تريد من الوكيل البدء بها فور اعتماد الخطة؟',
        placeholder: 'مثال: تجهيز Root Layout والـ Navbar وعناصر Design Tokens',
        defaultValue: 'بناء Root Layout وشريط التنقل المتجاوب (Navbar) وعناصر التصميم المشتركة مع دعم RTL وبيانات تجريبية (Mock).',
        isGlobal: false,
      },
      {
        key: 'techStack',
        label: 'حزمة التقنيات والقيود',
        question: 'ما هي حزمة الواجهة الأمامية المعتمدة؟',
        placeholder: 'مثال: Next.js 15 App Router، React 19، Tailwind CSS v4، TypeScript',
        defaultValue: 'Next.js 15 App Router، React 19، Tailwind CSS v4، TypeScript (Frontend فقط مع Mock Data دون Backend).',
        isGlobal: false,
      },
      {
        key: 'verificationCommand',
        label: 'أمر الفحص والتحقق الإلزامي',
        question: 'ما هي أوامر الفحص التي يجب تشغيلها للتأكد من خلو الكود من الأخطاء؟',
        placeholder: 'مثال: npm run lint و npm run build',
        defaultValue: 'npm run lint (tsc --noEmit) ثم npm run build',
        isGlobal: false,
      },
    ],
    interpolate: (baseBody, values) => {
      const name = values.projectName?.trim() || DEFAULT_PROJECT_PROFILE.projectName;
      const scope = values.mvpScope?.trim() || DEFAULT_PROJECT_PROFILE.mvpScope;
      const task = values.firstTask?.trim() || 'بناء Root Layout وشريط التنقل المشترك';
      const stack = values.techStack?.trim() || 'Next.js App Router و Tailwind CSS (Frontend Only)';
      const verify = values.verificationCommand?.trim() || 'npm run lint و npm run build';

      const customContextSection = [
        `أنت Principal Frontend Architect وقائد تنفيذ Next.js. تعمل داخل مستودع مشروع "${name}".`,
        `هدفك تحويل متطلبات المنتج والتصميم المعتمد إلى واجهة مستخدم قابلة للتنفيذ على مراحل صغيرة يمكن مراجعتها وقياسها.`,
        ``,
        `### مدخلات المشروع والبيئة المعتمدة:`,
        `- اسم المشروع: ${name}`,
        `- نطاق الواجهة (MVP): ${scope}`,
        `- حزمة التقنيات: ${stack}`,
        `- المهمة الأولى المحددة للتنفيذ بعد الخطة: ${task}`,
        `- أوامر الفحص والتحقق الإلزامية: ${verify}`,
      ].join('\n');

      return baseBody.replace(
        /أنت Principal Frontend Architect وقائد تنفيذ Next\.js\. تعمل داخل مستودع موجود، وهدفك تحويل متطلبات المنتج والتصميم المعتمد إلى واجهة مستخدم قابلة للتنفيذ على مراحل صغيرة يمكن مراجعتها وقياسها\./,
        customContextSection,
      );
    },
  },
};

export function getGenericPromptSchema(slug: string, titleAr: string): PromptVariableSchema {
  return {
    slug,
    titleAr,
    variables: [
      {
        key: 'projectName',
        label: 'اسم المشروع',
        question: 'ما هو اسم مشروعك؟',
        placeholder: 'مثال: منصة BorrowHub',
        defaultValue: DEFAULT_PROJECT_PROFILE.projectName,
        isGlobal: true,
      },
      {
        key: 'projectSummary',
        label: 'فكرة المشروع ومجاله',
        question: 'ما هي فكرة المشروع الأساسية؟',
        placeholder: 'صف فكرة المشروع باختصار',
        defaultValue: DEFAULT_PROJECT_PROFILE.projectSummary,
        isGlobal: true,
        multiline: true,
      },
      {
        key: 'mvpScope',
        label: 'نطاق النسخة الأولى (MVP)',
        question: 'ما هو النطاق الأساسي للعمل في هذه المرحلة؟',
        placeholder: 'حدد الميزات الرئيسية',
        defaultValue: DEFAULT_PROJECT_PROFILE.mvpScope,
        isGlobal: true,
      },
    ],
    interpolate: (baseBody, values) => {
      const name = values.projectName?.trim() || DEFAULT_PROJECT_PROFILE.projectName;
      const summary = values.projectSummary?.trim() || DEFAULT_PROJECT_PROFILE.projectSummary;
      const scope = values.mvpScope?.trim() || DEFAULT_PROJECT_PROFILE.mvpScope;

      const header = [
        `### سياق مشروع المتدرّب المخصص:`,
        `- اسم المشروع: ${name}`,
        `- فكرة المشروع والمجال: ${summary}`,
        `- نطاق النسخة الأولية (MVP): ${scope}`,
        `---`,
        ``,
      ].join('\n');

      return `${header}${baseBody}`;
    },
  };
}

export function getPromptVariableSchema(slug: string, titleAr: string = 'برومبت'): PromptVariableSchema {
  return PILOT_PROMPT_SCHEMAS[slug] ?? getGenericPromptSchema(slug, titleAr);
}

export function hasDedicatedVariableSchema(slug: string): boolean {
  return Boolean(PILOT_PROMPT_SCHEMAS[slug]);
}

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function announcePromptVariablesChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PROMPT_VARIABLES_CHANGE_EVENT));
}

export function createPromptVariablesStore(getStorage: () => StorageLike) {
  function getProfile(): LearnerProjectProfile {
    try {
      const raw = getStorage().getItem(LEARNER_PROFILE_STORAGE_KEY);
      if (!raw) return { ...DEFAULT_PROJECT_PROFILE };
      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || !parsed) return { ...DEFAULT_PROJECT_PROFILE };
      return {
        projectName: typeof parsed.projectName === 'string' && parsed.projectName ? parsed.projectName : DEFAULT_PROJECT_PROFILE.projectName,
        projectSummary: typeof parsed.projectSummary === 'string' && parsed.projectSummary ? parsed.projectSummary : DEFAULT_PROJECT_PROFILE.projectSummary,
        targetAudience: typeof parsed.targetAudience === 'string' && parsed.targetAudience ? parsed.targetAudience : DEFAULT_PROJECT_PROFILE.targetAudience,
        mvpScope: typeof parsed.mvpScope === 'string' && parsed.mvpScope ? parsed.mvpScope : DEFAULT_PROJECT_PROFILE.mvpScope,
      };
    } catch {
      return { ...DEFAULT_PROJECT_PROFILE };
    }
  }

  function saveProfile(patch: Partial<LearnerProjectProfile>): LearnerProjectProfile {
    const current = getProfile();
    const updated = { ...current, ...patch };
    try {
      getStorage().setItem(LEARNER_PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable or write blocked
    }
    return updated;
  }

  function getPromptOverrides(slug: string): Record<string, string> {
    try {
      const raw = getStorage().getItem(PROMPT_VARIABLES_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || !parsed || !parsed[slug]) return {};
      return parsed[slug];
    } catch {
      return {};
    }
  }

  function savePromptOverride(slug: string, key: string, value: string): void {
    try {
      const storage = getStorage();
      const raw = storage.getItem(PROMPT_VARIABLES_STORAGE_KEY);
      const allOverrides = raw ? JSON.parse(raw) : {};
      const promptOverrides = allOverrides[slug] || {};
      promptOverrides[key] = value;
      allOverrides[slug] = promptOverrides;
      storage.setItem(PROMPT_VARIABLES_STORAGE_KEY, JSON.stringify(allOverrides));
    } catch {
      // Ignore write errors
    }
  }

  function resetPromptOverrides(slug: string): void {
    try {
      const storage = getStorage();
      const raw = storage.getItem(PROMPT_VARIABLES_STORAGE_KEY);
      if (!raw) return;
      const allOverrides = JSON.parse(raw);
      delete allOverrides[slug];
      storage.setItem(PROMPT_VARIABLES_STORAGE_KEY, JSON.stringify(allOverrides));
    } catch {
      // Ignore errors
    }
  }

  function getEffectiveVariables(slug: string, titleAr: string): { schema: PromptVariableSchema; values: Record<string, string> } {
    const schema = getPromptVariableSchema(slug, titleAr);
    const profile = getProfile();
    const overrides = getPromptOverrides(slug);

    const values: Record<string, string> = {};
    schema.variables.forEach((variable) => {
      if (variable.isGlobal) {
        // Read from profile first, allow fallback to defaultValue
        const profileValue = (profile as unknown as Record<string, string>)[variable.key];
        values[variable.key] = profileValue ?? variable.defaultValue;
      } else {
        values[variable.key] = overrides[variable.key] ?? variable.defaultValue;
      }
    });

    return { schema, values };
  }

  function setVariable(slug: string, titleAr: string, key: string, value: string): void {
    const schema = getPromptVariableSchema(slug, titleAr);
    const target = schema.variables.find((v) => v.key === key);
    if (!target) return;

    if (target.isGlobal) {
      saveProfile({ [key]: value });
    } else {
      savePromptOverride(slug, key, value);
    }
    announcePromptVariablesChange();
  }

  function buildPrompt(slug: string, titleAr: string, baseBody: string): string {
    const { schema, values } = getEffectiveVariables(slug, titleAr);
    return schema.interpolate(baseBody, values);
  }

  return {
    getProfile,
    saveProfile,
    getEffectiveVariables,
    setVariable,
    resetPromptOverrides,
    buildPrompt,
  };
}

let browserPromptVariablesStore: ReturnType<typeof createPromptVariablesStore> | null = null;

export function getBrowserPromptVariablesStore() {
  if (typeof window === 'undefined') {
    return createPromptVariablesStore(() => ({
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    }));
  }
  if (!browserPromptVariablesStore) {
    browserPromptVariablesStore = createPromptVariablesStore(() => window.localStorage);
  }
  return browserPromptVariablesStore;
}
