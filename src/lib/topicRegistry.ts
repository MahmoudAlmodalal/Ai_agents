import { topic01Html } from '@/scripts/topics/topic01.ts';
import { TopicItem } from '@/src/types/topic.ts';
import { calculateReadingTime } from '@/src/utils/searchUtils.ts';
import { t02Entries } from '@/src/data/topics/wave2/t02-discovery-prd-srs.ts';
import { t03Entries } from '@/src/data/topics/wave2/t03-git-github.ts';
import { t04Entries } from '@/src/data/topics/wave2/t04-visual-modeling.ts';
import { t05Entries } from '@/src/data/topics/wave2/t05-plantuml-behavior.ts';
import { t06Entries } from '@/src/data/topics/wave2/t06-database-diagrams.ts';
import { t07Entries } from '@/src/data/topics/wave2/t07-ui-ux.ts';
import { t08Entries } from '@/src/data/topics/wave2/t08-stitch-design-system-prototype.ts';
import { t09Entries } from '@/src/data/topics/wave2/t09-execution-tools.ts';
import { t11Entries } from '@/src/data/topics/wave2/t11-tech-stack.ts';
import { t12Entries } from '@/src/data/topics/wave2/t12-frontend-planning-spec-kit.ts';
import { t10Entries } from '@/src/data/topics/wave2/t10-stitch-mcp-design-md.ts';
import { t13Entries } from '@/src/data/topics/wave2/t13-python-postgres-api.ts';
import { t14Entries } from '@/src/data/topics/wave2/t14-backend-frameworks-services.ts';
import { t15Entries } from '@/src/data/topics/wave3/t15-frontend-api-testing.ts';
import { t16Entries } from '@/src/data/topics/wave3/t16-performance-redis-qa.ts';
import { t17Entries } from '@/src/data/topics/wave3/t17-docker-linux.ts';
import { t18Entries } from '@/src/data/topics/wave3/t18-cloud-deployment.ts';
import { t19Entries } from '@/src/data/topics/wave3/t19-operations-delivery.ts';

/** Only unambiguous historical source identities become active topic saves.
 * Composite source lessons remain preserved identifiers with explicit choices.
 */
export const LEGACY_TOPIC_ID_MAP: Record<string, string> = {
  'topic-01': 'project-idea-mvp',
  'topic-03': 'user-flow-modeling',
  'topic-07': 'git-project-docs',
};

export const HISTORICAL_TOPICS: Record<string, { title: string; choices: string[] }> = {
  'topic-02': { title: 'Grill Me وصياغة PRD ومراجعتها', choices: ['discovery-grill-me', 'prd-specification'] },
  'topic-04': { title: 'مخططات UML والنمذجة المعمارية', choices: ['conceptual-domain-model', 'use-case-diagram', 'activity-diagram', 'sequence-diagram-modeling', 'state-diagram', 'class-diagram-design'] },
  'topic-05': { title: 'ERD وDBML وأداء قاعدة البيانات', choices: ['relational-erd-design', 'dbml-dbdiagram-io', 'database-performance-engineering'] },
  'topic-06': { title: 'طبقات النظام وServices وSelectors وRedis', choices: ['backend-architecture-api-contracts', 'services-selectors', 'redis-optional-infrastructure'] },
  'topic-08': { title: 'UI/UX وGoogle Stitch ونظام التصميم', choices: ['ui-ux-roles-navigation', 'stitch-reference-screen', 'design-system-rules'] },
  'topic-09': { title: 'Stitch MCP وDESIGN.md', choices: ['stitch-mcp-integration', 'design-md-spec'] },
  'topic-10': { title: 'Frontend وSpec Kit وUI/UX Pro Max', choices: ['frontend-architecture-planning', 'spec-kit-workflow', 'ui-ux-pro-max-review'] },
  'topic-11': { title: 'مكتبة البرومبتات', choices: [] },
  'topic-12': { title: 'الأسئلة الشائعة والقواعد والقاموس', choices: [] },
};

/** Intended route names keep their meaning; mismatched old card slugs follow source content. */
export const TOPIC_SLUG_ALIASES: Record<string, string> = {
  'fundamentals-ai-agents': 'project-idea-mvp',
  'requirements-discovery': 'discovery-grill-me',
  'grill-me': 'discovery-grill-me',
  'prd': 'prd-specification',
  'github': 'git-project-docs',
  'user-flow': 'user-flow-modeling',
  'requirements-prd': 'user-flow-modeling',
  'database-analysis-erd': 'relational-erd-design',
  'domain-model': 'conceptual-domain-model',
  'ui-ux': 'ui-ux-roles-navigation',
  'ui-ux-discovery': 'ui-ux-roles-navigation',
  'google-stitch': 'stitch-reference-screen',
  'google-ai-studio-stitch-workflow': 'google-ai-studio',
  'design-md': 'design-md-spec',
  'stitch-mcp': 'stitch-mcp-integration',
  'frontend-planning': 'frontend-architecture-planning',
  'ui-ux-pro-max': 'ui-ux-pro-max-review',
  'spec-kit': 'spec-kit-workflow',
  'incremental-implementation': 'frontend-incremental-implementation',
};

// Composite identifiers stay unresolved in storage, while their historical URLs
// lead to the single active index or an appropriate reference page.
export const LEGACY_ROUTE_DESTINATIONS: Record<string, string> = {
  'requirements-grill-me': '/#topics',
  'git-github-user-flow': '/diagrams',
  'database-erd': '/#topics',
  'diagrams-lab': '/#topics',
  'lecture-04-pending': '/learn/git-project-docs',
  'ux-discovery-stitch': '/#topics',
  'stitch-mcp-design-md': '/#topics',
  'frontend-planning-spec-kit': '/#topics',
  'prompt-library': '/prompts',
  'borrowhub-reference': '/faq',
  'testing-qa': '/prompts',
  'diagrams': '/diagrams',
  ...Object.fromEntries(Object.keys(HISTORICAL_TOPICS).map((id) => [id, id === 'topic-11' ? '/prompts' : id === 'topic-12' ? '/faq' : '/#topics'])),
};

// Old slug saves carry the identity of the original HTML, even when the card title was wrong.
const HISTORICAL_SAVED_IDENTITIES: Record<string, string> = {
  'requirements-grill-me': 'topic-02',
  'git-github-user-flow': 'topic-04',
  'database-erd': 'topic-05',
  'diagrams-lab': 'topic-06',
  'lecture-04-pending': 'git-project-docs',
  'ux-discovery-stitch': 'topic-08',
  'stitch-mcp-design-md': 'topic-09',
  'frontend-planning-spec-kit': 'topic-10',
  'prompt-library': 'topic-11',
  'borrowhub-reference': 'topic-12',
  'testing-qa': 'topic-11',
};

const LEGACY_TOPICS: TopicItem[] = [
  {
    id: 'topic-01',
    number: '01',
    slug: 'project-idea-mvp',
    title: 'اختيار فكرة المشروع وتحديد MVP',
    subtitle: 'مثال محلول وتمرين موجّه لكتابة سياق مشروعك ونطاق نسخته الأولى',
    category: 'foundations',
    categoryName: 'المرحلة التأسيسية',
    stageTag: 'الفكرة ونطاق النسخة الأولى',
    summary: 'تعلّم تحديد المشكلة والمستخدم والقيمة ورحلة MVP بمثال BorrowHub اختياري، ثم اكتب docs/PROJECT_CONTEXT.md لمشروعك وراجع القرارات والافتراضات والأسئلة قبل Grill Me.',
    tags: ['MVP', 'PROJECT_CONTEXT.md', 'Problem Statement', 'Target Users', 'Non-Goals', 'BorrowHub'],
    contentTypes: ['prompt', 'checklist', 'code'],
    diagramCount: 0,
    promptCount: 1,
    codeSnippetCount: 3,
    checklistCount: 5,
    readingTimeMinutes: calculateReadingTime(topic01Html),
    htmlContent: topic01Html,

    // Shared contract fields (Wave 1 foundational)
    goal: 'كتابة docs/PROJECT_CONTEXT.md لمشروعك: مشكلة ومستخدمون وقيمة ورحلة MVP وميزات مؤجلة، مع فصل القرارات عن الافتراضات والأسئلة استعدادًا لمقابلة Grill Me.',
    prerequisites: ['معرفة أساسيات البرمجة وفكرة أو مشكلة تريد فهمها؛ لا تحتاج خبرة في AI Agents.', 'محرر نصوص أو ورقة تنقلها لاحقًا إلى ملف؛ لا يلزم تثبيت وكيل أو Skills أو MCP.'],
    steps: [
      '1. اقرأ مثال BorrowHub الاختياري ولاحظ مصدر كل حقيقة وسبب كل خطوة، ثم اختر مشكلة لمشروعك أنت.',
      '2. اكتب المستخدم والموقف والمشكلة والقيمة وأفعال الأدوار، مع مصدر معرفتك وما لم تتحقق منه.',
      '3. صف رحلة MVP من البداية إلى النتيجة وأجّل ميزتين على الأقل مع تفسير بقاء الرحلة مفيدة بدونهما.',
      '4. املأ قالب docs/PROJECT_CONTEXT.md بنطاق MVP والقرارات ومصادرها وافتراض موسوم وسؤالين محددين ومعيار نجاح قابل للملاحظة.',
      '5. راجع ملفك بمعايير المخرج، ثم استخدمه مدخلًا لجلسة Grill Me لحسم الأسئلة المتبقية.'
    ],
    promptRefs: ['prompt-01-grill-me-product-discovery'],
    outputs: ['docs/PROJECT_CONTEXT.md'],
    checklist: [
      'تمت صياغة بيان المشكلة والهدف الرئيسي من المنتج بوضوح دون غموض.',
      'تم تحديد المستخدمين المستهدفين واحتياجاتهم وفصل أدوارهم.',
      'تم حسم نطاق MVP واستبعاد الميزات غير الأساسية إلى مرحلة مستقبلية.',
      'تم إنشاء ملف docs/PROJECT_CONTEXT.md وحفظ ملخص الفكرة وقواعدها بداخله.',
      'تمت مراجعة الافتراضات والتأكد من وضوح الفكرة لجلسة استكشاف المتطلبات.'
    ],
    publicationStatus: 'unified-complete',
    sequencePosition: 1,
  },

];

/**
 * Wave-2 topic sources registry:
 * Each Wave-2 ticket creates a module under `src/data/topics/wave2/` exporting `TopicItem[]`.
 * To register topics, each ticket makes ONLY two one-line edits in this file:
 *   1. Import line at top of file:
 *      import { myTopicEntries } from '@/src/data/topics/wave2/<ticketModule>.ts';
 *   2. Topic source line inside WAVE2_TOPIC_SOURCES array below:
 *      myTopicEntries,
 */
export const WAVE2_TOPIC_SOURCES: TopicItem[][] = [
  t02Entries,
  t03Entries,
  t04Entries,
  t05Entries,
  t06Entries,
  t07Entries,
  t08Entries,
  t09Entries,
  t11Entries,
  t12Entries,
  t10Entries,
  t13Entries,
  t14Entries,
];

/**
 * Wave-3 topic sources registry. Topics 45–58 continue the sequential project path.
 */
export const WAVE3_TOPIC_SOURCES: TopicItem[][] = [
  t15Entries,
  t16Entries,
  t17Entries,
  t18Entries,
  t19Entries,
];

/**
 * Computes assembled topic sequence:
 * - Positioned topics (sequencePosition defined) come FIRST, sorted ascending by sequencePosition.
 * - Ties preserve insertion order.
 * - Historical composites are not active topics.
 * - Positioned topic-01 (sequencePosition: 1) stays at the front.
 */
function assembleTopics(): TopicItem[] {
  const all = [...LEGACY_TOPICS, ...WAVE2_TOPIC_SOURCES.flat(), ...WAVE3_TOPIC_SOURCES.flat()];
  const positioned = all
    .filter((t) => t.sequencePosition !== undefined)
    .sort((a, b) => a.sequencePosition! - b.sequencePosition!);
  return positioned;
}

export const UNIFIED_TOPICS: TopicItem[] = assembleTopics();
export const TOPICS = UNIFIED_TOPICS;

/**
 * Resolves any topic identifier (legacy ID, current topic ID, route alias, or canonical slug)
 * to its stable canonical slug.
 */
export function resolveCanonicalSlug(identifier: string): string {
  if (!identifier) return '';
  const trimmed = identifier.trim();
  if (Object.hasOwn(LEGACY_TOPIC_ID_MAP, trimmed)) {
    return LEGACY_TOPIC_ID_MAP[trimmed];
  }
  if (Object.hasOwn(HISTORICAL_SAVED_IDENTITIES, trimmed)) {
    return HISTORICAL_SAVED_IDENTITIES[trimmed];
  }
  if (Object.hasOwn(TOPIC_SLUG_ALIASES, trimmed)) {
    return TOPIC_SLUG_ALIASES[trimmed];
  }
  return UNIFIED_TOPICS.find((topic) => topic.id === trimmed)?.slug ?? trimmed;
}

/**
 * Returns a topic by its canonical slug, legacy id (topic-NN), or alias.
 */
export function getTopicBySlug(slugOrId: string): TopicItem | undefined {
  if (!slugOrId) return undefined;
  const canonical = resolveCanonicalSlug(slugOrId);
  return UNIFIED_TOPICS.find((t) => t.slug === canonical || t.id === slugOrId || t.slug === slugOrId);
}

/**
 * Returns all topics in canonical sequence.
 */
export function getAllTopics(): TopicItem[] {
  return UNIFIED_TOPICS;
}

/**
 * Returns all route slugs (canonical + aliases + legacy IDs) for static generation and route matching.
 */
export function getAllTopicSlugs(): string[] {
  const canonicalSlugs = UNIFIED_TOPICS.map((t) => t.slug);
  const legacyIds = Object.keys(LEGACY_TOPIC_ID_MAP);
  const aliasSlugs = Object.keys(TOPIC_SLUG_ALIASES);
  return Array.from(new Set([...canonicalSlugs, ...legacyIds, ...aliasSlugs, ...Object.keys(LEGACY_ROUTE_DESTINATIONS)]));
}

/* =========================================================================
 * Saved Data Adapter (localStorage: bookmarks & recently-viewed)
 * Writes newly in canonical slugs; reads and translates legacy IDs through
 * the audited source identities, preserving ambiguous composites.
 * ========================================================================= */

import {
  getBrowserTopicStorage,
  type TopicStorageStatus,
} from './topicStorage';

export type { TopicStorageStatus };

export function readSavedBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  return getBrowserTopicStorage().readBookmarks();
}

export function writeSavedBookmarks(slugs: string[]): string[] {
  if (typeof window === 'undefined') {
    return Array.from(new Set(slugs.map((s) => resolveCanonicalSlug(s)).filter(Boolean)));
  }
  return getBrowserTopicStorage().writeBookmarks(slugs);
}

export function readSavedRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return [];
  return getBrowserTopicStorage().readRecentlyViewed();
}

export function writeSavedRecentlyViewed(slugs: string[]): string[] {
  if (typeof window === 'undefined') {
    const saved = Array.from(new Set(slugs.map(resolveCanonicalSlug).filter(Boolean)));
    return [...saved.filter((slug) => getTopicBySlug(slug)).slice(0, 5), ...saved.filter((slug) => !getTopicBySlug(slug))];
  }
  return getBrowserTopicStorage().writeRecentlyViewed(slugs);
}

export function getSavedBookmarksStatus(): TopicStorageStatus {
  if (typeof window === 'undefined') return 'available';
  return getBrowserTopicStorage().getBookmarksStatus();
}

export function getSavedRecentlyViewedStatus(): TopicStorageStatus {
  if (typeof window === 'undefined') return 'available';
  return getBrowserTopicStorage().getRecentlyViewedStatus();
}

export function subscribeTopicStorage(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  return getBrowserTopicStorage().subscribe(listener);
}

