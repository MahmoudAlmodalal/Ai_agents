import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createPromptVariablesStore,
  DEFAULT_PROJECT_PROFILE,
  getPromptVariableSchema,
  hasDedicatedVariableSchema,
  PILOT_PROMPT_SCHEMAS,
} from './promptVariables';

function createMockStorage(initialData: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initialData));
  return {
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
    dump() {
      return Object.fromEntries(store.entries());
    },
  };
}

test('pilot prompts 01, 16, and 31 have dedicated schemas with correct variables', () => {
  assert.equal(hasDedicatedVariableSchema('prompt-01-grill-me-product-discovery'), true);
  assert.equal(hasDedicatedVariableSchema('prompt-16-project-specific-stitch-master-prompt-generator'), true);
  assert.equal(hasDedicatedVariableSchema('prompt-31-frontend-phased-implementation-plan'), true);
  assert.equal(hasDedicatedVariableSchema('prompt-02-generate-prd-after-grill-me'), false);

  const schema01 = getPromptVariableSchema('prompt-01-grill-me-product-discovery');
  assert.ok(schema01.variables.some((v) => v.key === 'projectName' && v.isGlobal));
  assert.ok(schema01.variables.some((v) => v.key === 'focusTopic' && !v.isGlobal));

  const schema16 = getPromptVariableSchema('prompt-16-project-specific-stitch-master-prompt-generator');
  assert.ok(schema16.variables.some((v) => v.key === 'representativeScreen' && !v.isGlobal));

  const schema31 = getPromptVariableSchema('prompt-31-frontend-phased-implementation-plan');
  assert.ok(schema31.variables.some((v) => v.key === 'firstTask' && !v.isGlobal));
});

test('generic fallback schema works for unlisted prompts', () => {
  const generic = getPromptVariableSchema('prompt-99-unknown', 'برومبت مجهول');
  assert.equal(generic.slug, 'prompt-99-unknown');
  assert.ok(generic.variables.length >= 3);
  const interpolated = generic.interpolate('نص أصلي تجريبي', {
    projectName: 'مشروع الاختبار',
    projectSummary: 'حل مشكلة معينة',
    mvpScope: 'نطاق مصغر',
  });
  assert.ok(interpolated.includes('مشروع الاختبار'));
  assert.ok(interpolated.includes('نص أصلي تجريبي'));
});

test('Prompt 01 schema correctly interpolates project context into prompt text', () => {
  const schema = PILOT_PROMPT_SCHEMAS['prompt-01-grill-me-product-discovery'];
  const base = `Act as a Senior Product Manager and Business Analyst.\nI want to discover the requirements for my web application.\nInterview me in Arabic...`;

  const result = schema.interpolate(base, {
    projectName: 'تطبيق المسافر الذكي',
    projectSummary: 'تنظيم الرحلات الجوية والميزانية',
    targetAudience: 'المسافرون الدائمون',
    mvpScope: 'إضافة رحلة وحساب تكاليف التذاكر',
    focusTopic: 'حساب تحويل العملات أوفلاين',
  });

  assert.ok(result.includes('تطبيق المسافر الذكي'));
  assert.ok(result.includes('تنظيم الرحلات الجوية والميزانية'));
  assert.ok(result.includes('المسافرون الدائمون'));
  assert.ok(result.includes('حساب تحويل العملات أوفلاين'));
  assert.ok(result.includes('Interview me in Arabic'));
});

test('Prompt 16 schema correctly interpolates Stitch design inputs', () => {
  const schema = PILOT_PROMPT_SCHEMAS['prompt-16-project-specific-stitch-master-prompt-generator'];
  const base = `Act as a Google Stitch Prompt Engineer.\nRead PRD, UX_BLUEPRINT.md, SCREEN_INVENTORY.md and approved branding.\nGenerate a READY-TO-PASTE master prompt...`;

  const result = schema.interpolate(base, {
    projectName: 'متجر الحرف اليدوية',
    targetAudience: 'عشاق التحف والمقتنيات',
    representativeScreen: 'صفحة تفاصيل القطعة الفنية مع زر الشراء',
    visualDirection: 'طابع فني كلاسيكي بألوان ترابية وخطوط عربية دافئة',
    primaryActions: 'استعراض الصور، تكبير التفاصيل، وإضافة للسلة',
  });

  assert.ok(result.includes('متجر الحرف اليدوية'));
  assert.ok(result.includes('صفحة تفاصيل القطعة الفنية مع زر الشراء'));
  assert.ok(result.includes('طابع فني كلاسيكي'));
  assert.ok(result.includes('Generate a READY-TO-PASTE master prompt'));
});

test('Prompt 31 schema correctly interpolates Frontend implementation plan', () => {
  const schema = PILOT_PROMPT_SCHEMAS['prompt-31-frontend-phased-implementation-plan'];
  const base = `أنت Principal Frontend Architect وقائد تنفيذ Next.js. تعمل داخل مستودع موجود، وهدفك تحويل متطلبات المنتج والتصميم المعتمد إلى واجهة مستخدم قابلة للتنفيذ على مراحل صغيرة يمكن مراجعتها وقياسها.\n### المرحلة الأولى...`;

  const result = schema.interpolate(base, {
    projectName: 'بوابة العيادة الطبية',
    mvpScope: 'حجز موعد وعرض التخصصات الطبية',
    firstTask: 'بناء مكون البطاقة الطبية ومحدد المواعيد مع Mock data',
    techStack: 'Next.js 15, Tailwind CSS, Lucide icons',
    verificationCommand: 'npm run lint && npm test',
  });

  assert.ok(result.includes('بوابة العيادة الطبية'));
  assert.ok(result.includes('بناء مكون البطاقة الطبية'));
  assert.ok(result.includes('npm run lint && npm test'));
  assert.ok(result.includes('المرحلة الأولى'));
});

test('store syncs global project variables across prompts while isolating prompt-specific overrides', () => {
  const mock = createMockStorage();
  const store = createPromptVariablesStore(() => mock);

  // 1. Initial state has default values
  const profile0 = store.getProfile();
  assert.equal(profile0.projectName, DEFAULT_PROJECT_PROFILE.projectName);

  // 2. Change global variable from Prompt 01
  store.setVariable('prompt-01-grill-me-product-discovery', 'Grill Me', 'projectName', 'مشروع العيادة الطبية');

  // Verify profile updated
  const profile1 = store.getProfile();
  assert.equal(profile1.projectName, 'مشروع العيادة الطبية');

  // Verify it reflects when reading Prompt 16
  const vars16 = store.getEffectiveVariables('prompt-16-project-specific-stitch-master-prompt-generator', 'Stitch');
  assert.equal(vars16.values.projectName, 'مشروع العيادة الطبية');

  // 3. Set a prompt-specific variable on Prompt 16
  store.setVariable(
    'prompt-16-project-specific-stitch-master-prompt-generator',
    'Stitch',
    'representativeScreen',
    'شاشة المواعيد المحجوزة',
  );

  const vars16Updated = store.getEffectiveVariables('prompt-16-project-specific-stitch-master-prompt-generator', 'Stitch');
  assert.equal(vars16Updated.values.representativeScreen, 'شاشة المواعيد المحجوزة');

  // Verify Prompt 01 is unaffected by Prompt 16 local variable
  const vars01 = store.getEffectiveVariables('prompt-01-grill-me-product-discovery', 'Grill Me');
  assert.equal(vars01.values.representativeScreen, undefined);

  // 4. Reset prompt overrides restores local default while keeping global profile intact
  store.resetPromptOverrides('prompt-16-project-specific-stitch-master-prompt-generator');
  const vars16Reset = store.getEffectiveVariables('prompt-16-project-specific-stitch-master-prompt-generator', 'Stitch');
  assert.notEqual(vars16Reset.values.representativeScreen, 'شاشة المواعيد المحجوزة');
  assert.equal(vars16Reset.values.projectName, 'مشروع العيادة الطبية');
});

test('store safely handles malformed storage without throwing', () => {
  const mock = createMockStorage({
    'ai-agents-learner-profile-v1': '{{{invalid json',
    'ai-agents-prompt-vars-v1': 'null',
  });
  const store = createPromptVariablesStore(() => mock);

  const profile = store.getProfile();
  assert.equal(profile.projectName, DEFAULT_PROJECT_PROFILE.projectName);

  const vars = store.getEffectiveVariables('prompt-01-grill-me-product-discovery', 'Grill Me');
  assert.ok(vars.values.projectName);
});
