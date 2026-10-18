export type ScoreLevel = 'ممتاز' | 'جيد جدا' | 'جيد' | 'مقبول';

export interface ModelEntry {
  slug: string;
  model: string;
  modelAr: string;
  vendor: string;
  contextAr: string;
  coding: ScoreLevel;
  arabic: ScoreLevel;
  reasoning: ScoreLevel;
  costAr: string;
  freeAccessAr: string;
  bestForAr: string;
  officialUrl: string;
}

export interface BestPick {
  title: string;
  model: string;
  reason: string;
}

export const LAST_VERIFIED_MODELS = '2026-10-18';

export const MODELS: ModelEntry[] = [
  {
    slug: 'claude-sonnet-4-5',
    model: 'Claude Sonnet 4.5',
    modelAr: 'كلود سونيت 4.5',
    vendor: 'Anthropic',
    contextAr: 'سياق طويل (200K+)',
    coding: 'ممتاز',
    arabic: 'جيد جدا',
    reasoning: 'ممتاز',
    costAr: 'مدفوع (اشتراك أو API)',
    freeAccessAr: 'تجربة محدودة فقط',
    bestForAr: 'أفضل خيار عام للبرمجة الوكيلية متعددة الخطوات',
    officialUrl: 'https://www.anthropic.com/claude',
  },
  {
    slug: 'claude-opus-4-1',
    model: 'Claude Opus 4.1',
    modelAr: 'كلود أوبوس 4.1',
    vendor: 'Anthropic',
    contextAr: 'سياق طويل (200K+)',
    coding: 'ممتاز',
    arabic: 'جيد جدا',
    reasoning: 'ممتاز',
    costAr: 'الأعلى سعرا في عائلة Claude',
    freeAccessAr: 'لا يوجد مجاني حقيقي',
    bestForAr: 'المهام المعمارية الصعبة والمراجعة العميقة',
    officialUrl: 'https://www.anthropic.com/claude',
  },
  {
    slug: 'gemini-2-5-pro',
    model: 'Gemini 2.5 Pro',
    modelAr: 'جيميناي 2.5 برو',
    vendor: 'Google',
    contextAr: 'حتى مليون رمز (1M)',
    coding: 'ممتاز',
    arabic: 'ممتاز',
    reasoning: 'ممتاز',
    costAr: 'طبقة مجانية سخية + مدفوع',
    freeAccessAr: 'مجاني عبر AI Studio وGemini CLI بحدود',
    bestForAr: 'الخيار الافتراضي للدورة: عربي ممتاز + مجاني',
    officialUrl: 'https://aistudio.google.com/',
  },
  {
    slug: 'gpt-5',
    model: 'GPT-5 / GPT-5 Codex',
    modelAr: 'جي بي تي 5',
    vendor: 'OpenAI',
    contextAr: 'سياق طويل (400K)',
    coding: 'ممتاز',
    arabic: 'جيد جدا',
    reasoning: 'ممتاز',
    costAr: 'مدفوع (اشتراك أو API)',
    freeAccessAr: 'طبقة مجانية محدودة في ChatGPT',
    bestForAr: 'البرمجة العامة والتكامل مع منظومة Copilot/Codex',
    officialUrl: 'https://openai.com/',
  },
  {
    slug: 'grok-code-fast',
    model: 'Grok Code Fast 1',
    modelAr: 'جروك للبرمجة',
    vendor: 'xAI',
    contextAr: 'سياق طويل',
    coding: 'جيد جدا',
    arabic: 'جيد',
    reasoning: 'جيد جدا',
    costAr: 'مدفوع + تجربة مجانية',
    freeAccessAr: 'مجاني جزئيا عبر أدوات مختارة',
    bestForAr: 'الإكمال السريع داخل المحرر للمشتركين',
    officialUrl: 'https://x.ai/',
  },
  {
    slug: 'kimi-k2',
    model: 'Kimi K2',
    modelAr: 'كيمي K2',
    vendor: 'Moonshot AI',
    contextAr: 'سياق طويل جدا (256K)',
    coding: 'ممتاز',
    arabic: 'جيد',
    reasoning: 'جيد جدا',
    costAr: 'تجربة مجانية + API مدفوع رخيص نسبيا',
    freeAccessAr: 'حصة مجانية للتجربة',
    bestForAr: 'أقوى خيار مجاني/رخيص للبرمجة الوكيلية',
    officialUrl: 'https://www.moonshot.ai/',
  },
  {
    slug: 'qwen3-max',
    model: 'Qwen3 Max',
    modelAr: 'كوين 3 ماكس',
    vendor: 'Alibaba Qwen',
    contextAr: 'سياق طويل (256K)',
    coding: 'ممتاز',
    arabic: 'جيد جدا',
    reasoning: 'جيد جدا',
    costAr: 'من الأرخص + حصة مجانية',
    freeAccessAr: 'مجاني عبر Qwen Chat وQwen Code بحدود',
    bestForAr: 'أفضل مفتوح المصدر للربط مع Cline وAider',
    officialUrl: 'https://chat.qwen.ai/',
  },
  {
    slug: 'deepseek-v3-r1',
    model: 'DeepSeek V3 + R1',
    modelAr: 'ديب سيك V3 وR1',
    vendor: 'DeepSeek',
    contextAr: 'سياق طويل (128K+)',
    coding: 'جيد جدا',
    arabic: 'جيد',
    reasoning: 'ممتاز',
    costAr: 'ويب مجاني + API زهيد',
    freeAccessAr: 'مجاني بالكامل على الموقع',
    bestForAr: 'الاستدلال والمراجعة النقدية مجانا (PRD Review)',
    officialUrl: 'https://chat.deepseek.com/',
  },
  {
    slug: 'llama-4',
    model: 'Llama 4 (Maverick/Scout)',
    modelAr: 'لاما 4',
    vendor: 'Meta',
    contextAr: 'حتى 10M في نسخة Scout',
    coding: 'جيد',
    arabic: 'مقبول',
    reasoning: 'جيد',
    costAr: 'مجاني ومفتوح الوزن',
    freeAccessAr: 'مجاني عبر Meta AI ومزودين آخرين',
    bestForAr: 'التشغيل المحلي والخصوصية الكاملة عبر Ollama',
    officialUrl: 'https://www.llama.com/',
  },
];

export const BEST_PICKS: BestPick[] = [
  { title: 'أفضل برمجة وكيلية', model: 'Claude Sonnet 4.5', reason: 'الأكثر نضجا في حلقات القراءة والتعديل والتنفيذ متعددة الخطوات.' },
  { title: 'الأفضل للطالب مجانا', model: 'Gemini 2.5 Pro', reason: 'عربي ممتاز وحصة مجانية سخية تكفي مسار الدورة.' },
  { title: 'أفضل عربي', model: 'Gemini 2.5 Pro', reason: 'فهم وتوليد عربي متفوق مع سياق مليون رمز.' },
  { title: 'أفضل استدلال مجاني', model: 'DeepSeek R1', reason: 'نموذج تفكير عميق مجاني مثالي لمراجعة PRD النقدية.' },
  { title: 'أفضل مفتوح المصدر', model: 'Qwen3 Max', reason: 'قوة قريبة من الكبار مع إمكانية الربط بأي وكيل.' },
];
