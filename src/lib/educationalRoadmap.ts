import {
  EducationalReviewRecord,
  LessonTemplateCompliance,
  ProposedGroupRecord,
  GroupImprovementStatus,
  GroupStatusPresentation,
  TopicImprovementStatus,
} from '@/src/types/roadmap.ts';
import { getAllTopics, getTopicBySlug } from '@/src/lib/topicRegistry.ts';
import { isPolicyApproved } from '@/src/lib/learningPolicy.ts';

/**
 * 19 educational groups covering all 58 canonical topics exactly once.
 * Boundaries and the lesson template were accepted in the 2026-10-20 course-owner
 * decision package. Complete-group educational acceptance remains separate.
 */
export const PROPOSED_EDUCATIONAL_GROUPS: ProposedGroupRecord[] = [
  {
    id: 'group-01',
    number: '01',
    titleAr: 'الفكرة ونطاق النسخة الأولى (Idea and MVP)',
    titleEn: 'Idea and MVP',
    descriptionAr: 'تحديد المشكلة والمستخدم والقيمة ونطاق النسخة الأولى وفصل الافتراضات والقرارات.',
    topicSlugs: ['project-idea-mvp'],
    isProposedFirstGroup: true,
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-02',
    number: '02',
    titleAr: 'استكشاف المتطلبات وهندسة المنتج والتحقق (Discovery, PRD, and SRS)',
    titleEn: 'Discovery, PRD, and SRS',
    descriptionAr: 'استجواب الفكرة بمقابلة Grill Me وصياغة PRD ومواصفات سلوك النظام SRS.',
    topicSlugs: ['discovery-grill-me', 'prd-specification', 'srs'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-03',
    number: '03',
    titleAr: 'التوثيق وإدارة الإصدارات في Git وGitHub (Git and GitHub documentation)',
    titleEn: 'Git and GitHub documentation',
    descriptionAr: 'هيكلة مجلد وثائق المشروع docs/ والتعاون الهندسي وإدارة الفروع.',
    topicSlugs: ['git-project-docs', 'github-docs-collaboration'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-04',
    number: '04',
    titleAr: 'مسارات المستخدم والنمذجة المفاهيمية ومخططات Mermaid (Mermaid, User Flow, and Domain Model)',
    titleEn: 'Mermaid, User Flow, and Domain Model',
    descriptionAr: 'صياغة مخططات Mermaid ومسارات المستخدم ونمذجة الكيانات المفاهيمية.',
    topicSlugs: ['mermaid-syntax', 'user-flow-modeling', 'conceptual-domain-model'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-05',
    number: '05',
    titleAr: 'مخططات السلوك المعماري وPlantUML (PlantUML and behavior diagrams)',
    titleEn: 'PlantUML and behavior diagrams',
    descriptionAr: 'مخططات حالات الاستخدام والنشاط وتغير الحالات باستخدام PlantUML.',
    topicSlugs: ['plantuml', 'use-case-diagram', 'activity-diagram', 'state-diagram'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-06',
    number: '06',
    titleAr: 'تصميم قواعد البيانات والمخططات الهندسية (ERD, DBML, Sequence, and Class diagrams)',
    titleEn: 'ERD, DBML, Sequence, and Class diagrams',
    descriptionAr: 'مخططات الكيانات العلائقية ERD وتوصيف DBML ومخططات التسلسل وفئات النظام.',
    topicSlugs: ['relational-erd-design', 'dbml-dbdiagram-io', 'sequence-diagram-modeling', 'class-diagram-design'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-07',
    number: '07',
    titleAr: 'تخطيط تجربة وواجهة المستخدم وجرد الشاشات (UI/UX planning)',
    titleEn: 'UI/UX planning',
    descriptionAr: 'أدوار المستخدمين وهيكل التنقل ومخطط التجربة وجرد الشاشات التفصيلي.',
    topicSlugs: ['ui-ux-roles-navigation', 'ux-blueprint', 'screen-inventory'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-08',
    number: '08',
    titleAr: 'أنظمة التصميم والشاشات المرجعية والنموذج الأولي (Stitch, design systems, and prototypes)',
    titleEn: 'Stitch, design systems, and prototypes',
    descriptionAr: 'الشاشة المرجعية في Stitch وقواعد نظام التصميم والنماذج التفاعلية.',
    topicSlugs: ['stitch-reference-screen', 'design-system-rules', 'interactive-prototype'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-09',
    number: '09',
    titleAr: 'أدوات التنفيذ ووكلاء البرمجة وSkills وMCP (AI implementation tools, Skills, and MCP)',
    titleEn: 'AI implementation tools, Skills, and MCP',
    descriptionAr: 'إعداد وكلاء البرمجة واستوديو الذكاء الاصطناعي والمهارات وبروتوكول MCP.',
    topicSlugs: ['ai-coding-agent', 'google-ai-studio', 'agent-skills', 'mcp-protocol'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-10',
    number: '10',
    titleAr: 'تكامل Stitch MCP وتوثيق التصميم DESIGN.md (Stitch MCP and design documentation)',
    titleEn: 'Stitch MCP and design documentation',
    descriptionAr: 'ربط خادم Stitch MCP وتوثيق لغة ومواصفات التصميم في docs/DESIGN.md.',
    topicSlugs: ['stitch-mcp-integration', 'design-md-spec'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-11',
    number: '11',
    titleAr: 'حزمة الواجهة الأمامية: TypeScript وReact وTailwind وNext.js (TypeScript, React, Tailwind, and Next.js)',
    titleEn: 'TypeScript, React, Tailwind, and Next.js',
    descriptionAr: 'الأنواع الصارمة ومكونات وحالة React والتصميم المتجاوب وموجه Next.js.',
    topicSlugs: ['typescript-types', 'react-components-state', 'tailwind-css-responsive', 'nextjs-app-router'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-12',
    number: '12',
    titleAr: 'تخطيط بنية الواجهة ومنهجية Spec Kit والتنفيذ التدريجي (Frontend planning and Spec Kit)',
    titleEn: 'Frontend planning and Spec Kit',
    descriptionAr: 'هندسة الواجهة الأمامية ومراجعة UI/UX ومنهجية Spec Kit والتنفيذ خطوة بخطوة.',
    topicSlugs: ['frontend-architecture-planning', 'ui-ux-pro-max-review', 'spec-kit-workflow', 'frontend-incremental-implementation'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-13',
    number: '13',
    titleAr: 'أساس الخادم الخلفي وقواعد PostgreSQL وعقود API (Python, PostgreSQL, and API architecture)',
    titleEn: 'Python, PostgreSQL, and API architecture',
    descriptionAr: 'أساسيات بايثون للخادم وإعداد PostgreSQL وتصميم عقود واجهات REST API.',
    topicSlugs: ['python-backend-foundation', 'postgresql-database-setup', 'backend-architecture-api-contracts'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-14',
    number: '14',
    titleAr: 'أطر العمل Django وFastAPI والصلاحيات والخدمات (Django, FastAPI, permissions, and services)',
    titleEn: 'Django, FastAPI, permissions, and services',
    descriptionAr: 'بناء الخوادم عبر Django وFastAPI وهندسة الصلاحيات وطبقة الخدمات والمنتقيات.',
    topicSlugs: ['django-backend', 'fastapi-backend', 'auth-permissions', 'services-selectors'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-15',
    number: '15',
    titleAr: 'ربط الواجهة بالخادم واختبار رحلة المستخدم الشاملة (Frontend/API integration and journey testing)',
    titleEn: 'Frontend/API integration and journey testing',
    descriptionAr: 'تكامل الواجهة الأمامية مع API واختبار تدفقات العمل ورحلة المستخدم Full-Stack.',
    topicSlugs: ['frontend-backend-integration', 'full-stack-journey-testing'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-16',
    number: '16',
    titleAr: 'أداء قواعد البيانات والتخزين المؤقت Redis وضمان الجودة (Database performance, Redis, and QA)',
    titleEn: 'Database performance, Redis, and QA',
    descriptionAr: 'تحسين استعلامات وفهارس البيانات والتخزين المؤقت الاختياري واختبارات الجودة الشاملة.',
    topicSlugs: ['database-performance-engineering', 'redis-optional-infrastructure', 'integrated-project-qa'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-17',
    number: '17',
    titleAr: 'حاويات Docker وتشغيل خوادم Linux (Docker and Linux operations)',
    titleEn: 'Docker and Linux operations',
    descriptionAr: 'بناء بيئات التطوير والتشغيل بالحاويات وإدارة خوادم لينكس الأساسية.',
    topicSlugs: ['docker-container-workflow', 'linux-server-operations'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-18',
    number: '18',
    titleAr: 'نشر الواجهة والخادم وقواعد البيانات سحابيًا (Cloud deployment)',
    titleEn: 'Cloud deployment',
    descriptionAr: 'نشر واجهات Vercel وNetlify وإطلاق الخوادم وقواعد البيانات السحابية الإنتاجية.',
    topicSlugs: ['vercel-frontend-deployment', 'netlify-frontend-deployment', 'backend-database-deployment'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
  {
    id: 'group-19',
    number: '19',
    titleAr: 'دليل التشغيل وتسليم المشروع ويوم العرض وملف الإنجاز (Operations, handoff, Demo Day, and portfolio)',
    titleEn: 'Operations, handoff, Demo Day, and portfolio',
    descriptionAr: 'دليل تشغيل وصيانة النظام وحزمة التسليم وعرض يوم التخرج وتوثيق ملف الإنجاز.',
    topicSlugs: ['project-operations-runbook', 'project-handoff-package', 'project-demo-day', 'project-portfolio-entry'],
    groupBoundariesApproved: true,
    templateApproved: true,
  },
];

/**
 * Honest baseline educational review records for all 58 topics.
 * Complete-group acceptance remains pending; static author/agent reviews do not
 * establish human video review or course-owner release acceptance.
 */
export const TOPIC_EDUCATIONAL_REVIEWS: Record<string, EducationalReviewRecord> = Object.fromEntries(
  PROPOSED_EDUCATIONAL_GROUPS.flatMap((g) => g.topicSlugs).map((slug) => [
    slug,
    {
      verdict: 'pending',
      evidenceNotes: 'المحتوى متاح ومنشور وحدود المجموعة وقالب الدرس معتمدان؛ اكتمال أدلة المراجعة التعليمية والفيديو وقبول إصدار المجموعة ما زال معلقًا.',
    },
  ])
);

/**
 * Honest baseline template compliance records for all 58 topics.
 * Unknown / pending review is represented honestly without fabricated passing criteria.
 */
export const TOPIC_TEMPLATE_COMPLIANCE: Record<string, LessonTemplateCompliance> = Object.fromEntries(
  PROPOSED_EDUCATIONAL_GROUPS.flatMap((g) => g.topicSlugs).map((slug) => [
    slug,
    {
      complete: false,
      hasApprovedTemplate: true,
      hasRequiredSections: false,
      hasPracticalSteps: false,
      hasExpectedOutputs: false,
      hasChecklist: false,
      hasApprovedVideo: false,
      evidenceNotes: 'قالب الدرس معتمد بقرار مالك المساق بتاريخ 2026-10-20؛ اكتمال تطبيقه وأدلة المراجعة وقبول إصدار المجموعة ما زال معلقًا.',
    },
  ])
);

/**
 * Evaluates whether a group satisfies the rigorous educational improvement criteria.
 * ALL of the following must strictly hold:
 * 1. Course-owner approval of group boundaries.
 * 2. Course-owner approval of lesson template.
 * 3. Every member topic must exist in the group.
 * 4. Every member topic must have complete template compliance with all required sections verified.
 * 5. Every member topic must have passed educational review with recorded reviewer, timestamp, and evidence.
 * 6. Every member has its approved video and this complete group has explicit owner release acceptance.
 * If any member is missing, failed, pending, or not-run, or if approvals/evidence are missing, the group is NOT improved.
 */
export function isGroupImproved(
  group: ProposedGroupRecord,
  reviews: Record<string, EducationalReviewRecord> = TOPIC_EDUCATIONAL_REVIEWS,
  compliance: Record<string, LessonTemplateCompliance> = TOPIC_TEMPLATE_COMPLIANCE
): boolean {
  if (!group || !group.groupBoundariesApproved || !group.templateApproved || !isPolicyApproved(group.releaseApproval)) {
    return false;
  }
  if (!group.topicSlugs || group.topicSlugs.length === 0) {
    return false;
  }
  for (const slug of group.topicSlugs) {
    const rev = reviews[slug];
    if (!rev) return false;
    if (rev.verdict !== 'passed') return false;
    if (!rev.reviewer || rev.reviewer.trim().length === 0) return false;
    if (!rev.reviewedAt || rev.reviewedAt.trim().length === 0) return false;
    if (!rev.evidenceNotes || rev.evidenceNotes.trim().length === 0) return false;

    const comp = compliance[slug];
    if (!comp) return false;
    if (!comp.complete) return false;
    if (!comp.hasApprovedTemplate) return false;
    if (!comp.hasRequiredSections) return false;
    if (!comp.hasPracticalSteps) return false;
    if (!comp.hasExpectedOutputs) return false;
    if (!comp.hasChecklist) return false;
    if (!comp.hasApprovedVideo) return false;
    if (!comp.evidenceNotes || comp.evidenceNotes.trim().length === 0) return false;
  }
  return true;
}

/**
 * Maps slug to its parent proposed group.
 */
const TOPIC_TO_GROUP_MAP: Record<string, ProposedGroupRecord> = (() => {
  const map: Record<string, ProposedGroupRecord> = {};
  for (const group of PROPOSED_EDUCATIONAL_GROUPS) {
    for (const slug of group.topicSlugs) {
      map[slug] = group;
    }
  }
  return map;
})();

export function getGroupForTopic(slug: string): ProposedGroupRecord | undefined {
  return TOPIC_TO_GROUP_MAP[slug];
}

export function getAllProposedGroups(): ProposedGroupRecord[] {
  return PROPOSED_EDUCATIONAL_GROUPS;
}

export function getGroupImprovementStatus(
  group: ProposedGroupRecord,
  reviews?: Record<string, EducationalReviewRecord>,
  compliance?: Record<string, LessonTemplateCompliance>
): GroupImprovementStatus {
  return isGroupImproved(group, reviews, compliance) ? 'improved' : 'pending-review';
}

/**
 * Shared presentation source for a group header or card.
 */
export function getGroupStatusPresentation(
  group: ProposedGroupRecord,
  reviews?: Record<string, EducationalReviewRecord>,
  compliance?: Record<string, LessonTemplateCompliance>
): GroupStatusPresentation {
  const isFirst = Boolean(group.isProposedFirstGroup);
  const boundaryStatusLabel = group.groupBoundariesApproved
    ? (isFirst ? 'المجموعة الأولى — حدود معتمدة' : 'حدود مجموعة معتمدة')
    : (isFirst ? 'المجموعة الأولى المقترحة (مقترح بانتظار الاعتماد)' : 'حدود مقترحة بانتظار الاعتماد');

  const improvementStatus = getGroupImprovementStatus(group, reviews, compliance);
  const improvementStatusLabel =
    improvementStatus === 'improved'
      ? 'مجموعة محسّنة ومعتمدة تعليميًا'
      : 'بانتظار المراجعة التعليمية الجديدة';

  return {
    groupId: group.id,
    groupNumber: group.number,
    isFirstGroupProposal: isFirst,
    boundaryStatusLabel,
    improvementStatus,
    improvementStatusLabel,
  };
}

/**
 * Returns single shared status presentation for any topic across catalog, roadmap, full reader, and preview.
 * Prevents treating unknown slugs as available content.
 */
export function getTopicImprovementStatus(slug: string): TopicImprovementStatus {
  const topic = getTopicBySlug(slug);
  const group = getGroupForTopic(slug);

  if (!topic || !group) {
    return {
      slug,
      isKnownTopic: false,
      contentAvailability: 'unknown',
      availabilityLabel: 'موضوع غير متوفر',
      improvementStatus: 'not-applicable',
      improvementLabel: 'غير مدرج في الخارطة',
      group: undefined,
      isFirstGroupProposal: false,
      groupProposalLabel: 'خارج المجموعات المعتمدة',
      boundariesApproved: false,
      templateApproved: false,
      reviewVerdict: 'not-run',
    };
  }

  const groupPresentation = getGroupStatusPresentation(group);
  const review = TOPIC_EDUCATIONAL_REVIEWS[slug] ?? { verdict: 'pending' };

  return {
    slug,
    isKnownTopic: true,
    contentAvailability: 'available',
    availabilityLabel: 'محتوى متاح (منشور)',
    improvementStatus: groupPresentation.improvementStatus,
    improvementLabel: groupPresentation.improvementStatusLabel,
    group,
    isFirstGroupProposal: groupPresentation.isFirstGroupProposal,
    groupProposalLabel: `${groupPresentation.isFirstGroupProposal ? 'المجموعة الأولى' : `المجموعة ${group.number}`}: ${group.titleEn} (${groupPresentation.boundaryStatusLabel})`,
    boundariesApproved: group.groupBoundariesApproved,
    templateApproved: group.templateApproved,
    reviewVerdict: review.verdict,
  };
}

/**
 * Validates that every canonical topic from topicRegistry maps to exactly one proposed group.
 */
export function validateGroupMembershipIntegrity(): {
  isValid: boolean;
  totalTopics: number;
  totalGroups: number;
  missingSlugs: string[];
  duplicateSlugs: string[];
} {
  const allCanonical = getAllTopics();
  const canonicalSlugs = new Set(allCanonical.map((t) => t.slug));
  const seenSlugs = new Map<string, string>(); // slug -> groupId
  const duplicateSlugs: string[] = [];

  for (const group of PROPOSED_EDUCATIONAL_GROUPS) {
    for (const slug of group.topicSlugs) {
      if (seenSlugs.has(slug)) {
        duplicateSlugs.push(slug);
      } else {
        seenSlugs.set(slug, group.id);
      }
    }
  }

  const missingSlugs = Array.from(canonicalSlugs).filter((slug) => !seenSlugs.has(slug));

  return {
    isValid:
      missingSlugs.length === 0 &&
      duplicateSlugs.length === 0 &&
      seenSlugs.size === 58 &&
      PROPOSED_EDUCATIONAL_GROUPS.length === 19,
    totalTopics: seenSlugs.size,
    totalGroups: PROPOSED_EDUCATIONAL_GROUPS.length,
    missingSlugs,
    duplicateSlugs,
  };
}
