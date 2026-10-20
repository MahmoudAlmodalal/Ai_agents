import type { PracticalAssessmentRecord, QuizAttemptRecord, TopicLearningContent } from '@/src/types/learning';
import type { TopicItem } from '@/src/types/topic';
import type { PromptCustomizationRecord, PromptCustomizationStorageStatus } from '@/src/lib/promptCustomization';
import { promptSourceRevision } from '@/src/lib/promptCustomization';
import type { PromptLibraryRecord } from '@/src/lib/promptLibrary';
import type { DashboardChecklistSnapshot } from '@/src/lib/dashboardRecords';
import type { BadgeAwardEvent, BadgeAwardStorageStatus } from '@/src/lib/badgeAwards';
import { createStoredZip, type ZipArchiveFile } from '@/src/lib/zipArchive';
import { DIAGRAM_PERSPECTIVES, getTopicMermaidDiagram } from '@/src/utils/diagramEngine';

export interface LearningExportSnapshot {
  schemaVersion: 1;
  generatedAt: string;
  scope: 'this-browser-and-device';
  storageStatus: {
    bookmarks: string;
    recentlyViewed: string;
    checklists: string;
    learningRecords: string;
    badgeAwards: BadgeAwardStorageStatus;
    promptCustomizations: PromptCustomizationStorageStatus;
  };
  bookmarks: string[];
  recentlyViewed: string[];
  unresolvedBookmarks: string[];
  unresolvedRecentlyViewed: string[];
  checklistActivity: DashboardChecklistSnapshot;
  quizAttempts: QuizAttemptRecord[];
  practicalAssessments: PracticalAssessmentRecord[];
  badgeAwardEvents: BadgeAwardEvent[];
  promptCustomizations: Record<string, PromptCustomizationRecord>;
};

export interface ExportReferenceTemplate {
  name: string;
  fields: string;
  topic: string;
  input: string;
  output: string;
  lifecycle: string;
}

function safeFileSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item';
}

function escapeHtmlAttribute(text: string) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtmlText(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function standaloneLesson(topic: TopicItem) {
  const content = topic.htmlContent
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  return `<!doctype html>\n<html lang="ar" dir="rtl">\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtmlAttribute(topic.title)}</title></head>\n<body><main><h1>${escapeHtmlText(topic.title)}</h1><p>${escapeHtmlText(topic.summary)}</p><article>${content}</article></main></body>\n</html>\n`;
}

function approvalSummary(approval: TopicLearningContent['quiz']['scoringPolicy']['approval']) {
  if (approval.state !== 'approved') return `لم يعتمدها صاحب المقرر؛ حالة المراجعة: ${approval.state}.`;
  return `اعتمدها ${approval.approvedBy} في ${approval.approvedAt}؛ مرجع القرار: ${approval.decisionReference}.`;
}

function listMarkdown(values: string[], empty: string) {
  return values.length ? values.map((value) => `- ${value}`).join('\n') : `- ${empty}`;
}

export function summarizeTopicLearning(topic: TopicItem, content?: TopicLearningContent) {
  const lines = [
    `# ${topic.title}`,
    '',
    `- المعرّف الثابت للموضوع: \`${topic.slug}\``,
    `- ترتيبه في المسار: ${topic.sequencePosition ?? 'غير محدد'}`,
    '',
    '## الهدف والمخرجات المتوقعة',
    '',
    topic.goal || topic.summary,
    '',
    '### المتطلبات السابقة',
    '',
    listMarkdown(topic.prerequisites, 'لا توجد متطلبات سابقة مسجلة.'),
    '',
    '### خطوات التطبيق',
    '',
    listMarkdown(topic.steps, 'لا توجد خطوات تطبيق منظمة مسجلة.'),
    '',
    '### المخرجات',
    '',
    listMarkdown(topic.outputs, 'لا توجد مخرجات مسجلة.'),
    '',
    '### قائمة تحقق المتعلم',
    '',
    listMarkdown(topic.checklist, 'لا توجد قائمة تحقق للموضوع.'),
  ];

  if (!content) {
    lines.push('', '## محتوى التعلم والتقييم بإصدارات محددة', '', 'لا يوجد حاليًا اختبار أو تعريف معايير تقييم بإصدار محدد لهذا الموضوع داخل التطبيق.');
    return `${lines.join('\n')}\n`;
  }

  const objectiveNames = new Map(content.objectives.map((objective) => [objective.id, objective.text]));
  const outputNames = new Map(content.practicalAssessment.outputs.map((output) => [output.id, output.description]));
  const answerKey = new Map(content.quiz.questions.map((question) => [question.id, question.correctOptionId]));
  lines.push(
    '',
    '## الدرس بإصدار محدد',
    '',
    `- إصدار محتوى التعلم: ${content.contentVersion}`,
    `- حالة المراجعة: ${content.reviewState}`,
    '',
    '### الأهداف',
    '',
    listMarkdown(content.objectives.map((objective) => objective.text), 'لا توجد أهداف مسجلة.'),
    '',
    '### أقسام الدرس',
    '',
    content.sections.length ? content.sections.flatMap((section) => [`#### ${section.heading}`, '', section.body, '']).join('\n') : '- لا توجد أقسام درس مسجلة.',
    '',
    '## الاختبار المعرفي',
    '',
    `- ${content.quiz.title} · version ${content.quiz.version}`,
    content.quiz.instructions,
    '',
    `- مقترح التصحيح: ${content.quiz.scoringPolicy.id} · الإصدار ${content.quiz.scoringPolicy.version}`,
    `- ملخص السياسة: ${content.quiz.scoringPolicy.summary}`,
    `- اعتماد السياسة: ${approvalSummary(content.quiz.scoringPolicy.approval)}`,
    `- حالة مراجعة الاختبار: ${content.reviewState}`,
    `- عناصر أدلة مراجعة الاختبار: ${content.quiz.reviewEvidence.length}`,
    '',
  );
  if (content.quiz.questions.length) {
    content.quiz.questions.forEach((question, index) => {
      const objective = objectiveNames.get(question.objectiveId);
      lines.push(
        `### السؤال ${index + 1} · الإصدار ${question.version}`,
        '',
        question.prompt,
        objective ? `الهدف: ${objective}` : `مرجع الهدف: ${question.objectiveId}`,
        '',
        ...question.options.map((option) => `- ${option.text}${option.id === answerKey.get(question.id) ? ' (الإجابة الصحيحة)' : ''}`),
        '',
        `التفسير: ${question.explanation}`,
        `عناصر أدلة مراجعة السؤال: ${question.reviewEvidence.length}`,
        '',
      );
    });
  } else lines.push('لا توجد أسئلة اختبار مسجلة.', '');

  lines.push(
    '## التقييم العملي الذاتي',
    '',
    `- ${content.practicalAssessment.title} · version ${content.practicalAssessment.version}`,
    `- عناصر أدلة مراجعة المعايير: ${content.practicalAssessment.reviewEvidence.length}`,
    `- سلم التقدير: ${content.practicalAssessment.scale.id} · الإصدار ${content.practicalAssessment.scale.version}`,
    `- قاعدة الإكمال: ${content.practicalAssessment.scale.completionRule}`,
    `- ملخص السلم: ${content.practicalAssessment.scale.summary}`,
    `- اعتماد السلم: ${approvalSummary(content.practicalAssessment.scale.approval)}`,
    '',
    '### مستويات التقدير الوصفية',
    '',
    content.practicalAssessment.scale.levels.length
      ? content.practicalAssessment.scale.levels.map((level) => `- ${level.label}: ${level.description}`).join('\n')
      : '- لا توجد مستويات تقدير مسجلة.',
    '',
    '### مخرجات التقييم',
    '',
    listMarkdown(content.practicalAssessment.outputs.map((output) => `${output.id}: ${output.description}`), 'لا توجد مخرجات تقييم مسجلة.'),
    '',
    '### المعايير',
    '',
  );
  if (content.practicalAssessment.criteria.length) {
    content.practicalAssessment.criteria.forEach((criterion, index) => {
      lines.push(
        `#### المعيار ${index + 1} · الإصدار ${criterion.version}: ${criterion.name}`,
        '',
        criterion.description,
        `سؤال الدليل: ${criterion.evidencePrompt}`,
        `المخرج المتوقع: ${outputNames.get(criterion.outputId) ?? criterion.outputId}`,
        `عناصر أدلة مراجعة المعيار: ${criterion.reviewEvidence.length}`,
        '',
      );
    });
  } else lines.push('لا توجد معايير تقييم مسجلة.', '');
  lines.push(
    'التقييم الذاتي وصف لما سجله المتعلم؛ ولا يمثل مراجعة مستقلة أو قرار إتقان أو شهادة إكمال.',
    '',
  );
  return `${lines.join('\n')}\n`;
}

export function summarizeLearningExport(snapshot: LearningExportSnapshot) {
  const unavailable = Object.entries(snapshot.storageStatus).filter(([, status]) => status !== 'available');
  const unresolvedCount = snapshot.unresolvedBookmarks.length + snapshot.unresolvedRecentlyViewed.length
    + snapshot.checklistActivity.unresolvedHistoricalKeys.length;
  return [
    '# ملخص حزمة التعلم المحلية',
    '',
    `تاريخ إنشاء اللقطة: ${snapshot.generatedAt}`,
    'النطاق: سجلات المتصفح الحالي على هذا الجهاز فقط. لا تتضمن هذه الحزمة مزامنة أو استعادة لجهاز آخر.',
    '',
    '## السجلات المتاحة',
    '',
    `- قائمة الموضوعات التي زرتها مؤخرًا: ${snapshot.recentlyViewed.length} معرّفًا. القائمة تحتفظ بآخر خمسة موضوعات فقط ولا تحتوي على وقت أو مدة قراءة.`,
    `- الموضوعات المفضلة: ${snapshot.bookmarks.length} معرّفًا.`,
    `- محاولات الاختبار المسجلة: ${snapshot.quizAttempts.length}. نتائج الفحص الذاتي التي تسبق اعتماد السياسة تظهر كمعاينة.`,
    `- تقييمات عملية ذاتية: ${snapshot.practicalAssessments.length}. أحكام المتعلم منفصلة عن التحقق المستقل.`,
    `- أحداث الشارات المحفوظة: ${snapshot.badgeAwardEvents.length}. تعرضها اللوحة فقط عند وجود سياسة معتمدة بقرار موثق.`,
    `- مجموعات قوائم التحقق التي تحتوي على اختيارات: ${snapshot.checklistActivity.entries.length}. الاختيارات لا تثبت صحة مخرج المشروع.`,
    `- تخصيصات البرومبتات المحفوظة في اللقطة: ${Object.keys(snapshot.promptCustomizations).length}.`,
    '',
    '## حالة التخزين المحلي وقت إنشاء الحزمة',
    '',
    ...Object.entries(snapshot.storageStatus).map(([key, status]) => `- ${key}: ${status}`),
    unavailable.length
      ? '- بعض السجلات لم يتسنّ تأكيد قراءتها أو حفظها؛ راجع الحالة أعلاه. قد لا تمثل الحزمة كامل البيانات الموجودة في المتصفح.'
      : '- أمكن قراءة مصادر السجلات المحلية. يظل هذا تصديرًا من الجهاز الحالي فقط.',
    unresolvedCount
      ? `- توجد ${unresolvedCount} معرّفات تاريخية غير محسومة. أُبقيت منفصلة ولم تُنسب إلى موضوع حديث.`
      : '- لا توجد معرّفات تاريخية غير محسومة ضمن السجلات المعروضة.',
    '',
    '## تفسير النتائج',
    '',
    '- فتح الموضوع يسجل زيارة فقط؛ لا يحسب وقت القراءة ولا إكمال الموضوع.',
    '- نتائج الاختبار تُحفظ كسجل فحص ذاتي بإجابات وإصدارات الأسئلة. لا تعني اعتماد الإتقان.',
    '- قوائم التحقق ومعايير التقييم العملي أحكام ذاتية للمتعلم، ولا تقدم تقييمًا مستقلًا لمشروعه.',
    '- لا تتضمن ملفات Learner Project الموجودة خارج التطبيق على جهاز المتعلم.',
    '',
  ].join('\n');
}

function uniqueUnavailablePromptOutputs(prompts: PromptLibraryRecord[]) {
  const byName = new Map<string, string[]>();
  for (const prompt of prompts) {
    for (const name of prompt.outputFiles) {
      const sources = byName.get(name) ?? [];
      sources.push(prompt.slug);
      byName.set(name, sources);
    }
  }
  return [...byName.entries()].map(([name, sourcePromptSlugs]) => ({
    name,
    sourcePromptSlugs: [...new Set(sourcePromptSlugs)],
    status: 'not-included',
    reason: 'مخرج متوقع لمشروع المتعلم؛ التطبيق لا يملك ملفًا صادرًا من مشروع المتعلم لإدراجه.',
  }));
}

export function buildLearningExportFiles(
  snapshot: LearningExportSnapshot,
  topics: TopicItem[],
  learningContents: TopicLearningContent[],
  prompts: PromptLibraryRecord[],
  referenceTemplates: readonly ExportReferenceTemplate[],
): ZipArchiveFile[] {
  const files: ZipArchiveFile[] = [];
  const currentPromptSlugs = new Set(prompts.map((prompt) => prompt.slug));
  const statuses = Object.values(snapshot.storageStatus);
  const hasUnavailableStorage = statuses.some((status) => status !== 'available');
  const promptCustomizations = Object.entries(snapshot.promptCustomizations).map(([slug, record]) => ({
    ...record,
    sourcePromptAvailable: currentPromptSlugs.has(slug),
    sourceRevisionMatches: currentPromptSlugs.has(slug)
      ? record.sourceRevision === promptSourceRevision(prompts.find((prompt) => prompt.slug === slug)!.body)
      : false,
  }));

  files.push({
    path: 'README.md',
    contents: [
      '# حزمة التعلم المحلية',
      '',
      `أُنشئت في ${snapshot.generatedAt} من سجلات هذا المتصفح على هذا الجهاز.`,
      '',
      'تتضمن السجلات كما أمكن قراءتها وقت التصدير، ومحتوى الدروس وملخصات الاختبارات ومعايير التقييم ومصادر Mermaid المتاحة، وملخصات القوالب المرجعية، والنصوص الأصلية للبرومبتات والتخصيصات المحفوظة.',
      'راجع `resources/availability-manifest.json` لمعرفة المواد المتاحة والملفات غير المتوفرة.',
      `حالة سجلات التخزين: ${hasUnavailableStorage ? 'جزئية أو غير مؤكدة؛ راجع learner-data/records.json' : 'قُرئت مصادر السجلات المحلية'}.`,
      '',
      'هذه لقطة قابلة للقراءة وليست أداة استيراد أو استعادة أو مزامنة. لا تحتوي على ملفات Learner Project المخزنة خارج التطبيق أو مقاطع الفيديو الخارجية.',
      'نتائج الاختبار والتقييم العملي ظاهرة كما سجلها المتعلم؛ لا تعني شهادة أو تحققًا مستقلًا أو إتقانًا.',
      '',
    ].join('\n'),
  });
  files.push({ path: 'learner-data/records.json', contents: JSON.stringify(snapshot, null, 2) });
  files.push({ path: 'learner-data/activity-summary.md', contents: summarizeLearningExport(snapshot) });
  files.push({ path: 'prompts/customizations.json', contents: JSON.stringify({ storageStatus: snapshot.storageStatus.promptCustomizations, records: promptCustomizations }, null, 2) });

  for (const topic of topics) {
    files.push({ path: `course/topics/${topic.slug}/lesson.html`, contents: standaloneLesson(topic) });
    const content = learningContents.find((item) => item.topicSlug === topic.slug);
    files.push({ path: `course/topics/${topic.slug}/learning-summary.md`, contents: summarizeTopicLearning(topic, content) });
    if (topic.diagramCount > 0) {
      for (const perspective of DIAGRAM_PERSPECTIVES) {
        files.push({
          path: `course/topics/${topic.slug}/diagrams/${perspective.id}.mmd`,
          contents: `%% ${topic.title} — ${perspective.label}\n${getTopicMermaidDiagram(topic, perspective.id)}\n`,
        });
      }
    }
  }
  for (const content of learningContents) {
    files.push({ path: `course/learning-content/${content.topicSlug}.json`, contents: JSON.stringify(content, null, 2) });
  }

  for (const template of referenceTemplates) {
    const path = `resources/reference-guides/${safeFileSlug(template.name)}.md`;
    files.push({
      path,
      contents: [
        `# ${template.name}`,
        '',
        '**نوع المادة: مخطط حقول مرجعي فقط؛ ملف القالب الكامل غير متاح للتنزيل.**',
        '',
        `- الموضوع المرتبط: \`${template.topic}\``,
        `- المدخلات: ${template.input}`,
        `- المخرجات المقصودة: ${template.output}`,
        `- دورة الحياة: ${template.lifecycle}`,
        '',
        '## الحقول المتاحة في التطبيق',
        '',
        template.fields,
        '',
      ].join('\n'),
    });
  }

  for (const prompt of prompts) {
    const promptPath = `prompts/original/${prompt.slug}`;
    files.push({ path: `${promptPath}.txt`, contents: prompt.body });
    files.push({
      path: `${promptPath}.json`,
      contents: JSON.stringify({
        slug: prompt.slug,
        number: prompt.number,
        title: prompt.title,
        category: prompt.category,
        difficulty: prompt.difficulty,
        operation: prompt.operation,
        purpose: prompt.purpose,
        sourceGroup: prompt.sourceGroup,
        sourceLabel: prompt.sourceLabel,
        topicRefs: prompt.topicRefs,
        sourceRevision: promptSourceRevision(prompt.body),
      }, null, 2),
    });
    const customized = snapshot.promptCustomizations[prompt.slug];
    if (customized) files.push({ path: `prompts/customized/${prompt.slug}.txt`, contents: customized.text });
  }

  const unmatchedCustomizations = Object.entries(snapshot.promptCustomizations).filter(([slug]) => !currentPromptSlugs.has(slug));
  for (const [slug, customization] of unmatchedCustomizations) {
    const safeSlug = safeFileSlug(slug);
    files.push({ path: `prompts/customized/${safeSlug}.txt`, contents: customization.text });
    files.push({ path: `prompts/customized/${safeSlug}.json`, contents: JSON.stringify({ ...customization, sourcePromptAvailable: false }, null, 2) });
  }

  const templateAvailability = referenceTemplates.map((template) => ({
    name: template.name,
    topic: template.topic,
    includedReferenceOutline: `resources/reference-guides/${safeFileSlug(template.name)}.md`,
    completeTemplateFile: 'not-available',
    reason: 'The application exposes field descriptions only; it does not contain a complete downloadable template file.',
  }));
  const externalVideos = learningContents.flatMap((content) => content.candidateVideos.map((video) => ({
    id: video.id,
    topicSlug: content.topicSlug,
    title: video.title,
    url: video.url,
    availability: video.availability,
    approval: video.approval.state,
    included: false,
    reason: 'External video content is not embedded in the application export.',
  })));
  files.push({
    path: 'resources/availability-manifest.json',
    contents: JSON.stringify({
      generatedAt: snapshot.generatedAt,
      includedCourseLessons: topics.map((topic) => ({ topicSlug: topic.slug, path: `course/topics/${topic.slug}/lesson.html` })),
      includedTopicSummaries: topics.map((topic) => ({ topicSlug: topic.slug, path: `course/topics/${topic.slug}/learning-summary.md` })),
      includedDiagramSources: topics.flatMap((topic) => topic.diagramCount > 0 ? DIAGRAM_PERSPECTIVES.map((perspective) => ({
        topicSlug: topic.slug,
        perspective: perspective.id,
        path: `course/topics/${topic.slug}/diagrams/${perspective.id}.mmd`,
      })) : []),
      renderedDiagramFilesIncluded: false,
      renderedDiagramAvailabilityNote: 'Mermaid source is included for each perspective exposed by the application; SVG rendering is not generated by the ZIP exporter.',
      topicsWithoutApplicationDiagram: topics.filter((topic) => topic.diagramCount <= 0).map((topic) => ({
        topicSlug: topic.slug,
        status: 'not-rendered-by-topic-page',
        reason: 'The current topic does not expose the Mermaid viewer in its page data.',
      })),
      includedLearningContent: learningContents.map((content) => ({ topicSlug: content.topicSlug, path: `course/learning-content/${content.topicSlug}.json` })),
      referenceTemplates: templateAvailability,
      learnerProjectOutputsNotIncluded: uniqueUnavailablePromptOutputs(prompts),
      savedCustomizationsWithUnavailableSource: unmatchedCustomizations.map(([slug, customization]) => ({
        promptSlug: slug,
        sourceRevision: customization.sourceRevision,
        includedTextPath: `prompts/customized/${safeFileSlug(slug)}.txt`,
        reason: 'تم الاحتفاظ بنص التخصيص، لكن لم يعد النص الأصلي بهذا المعرّف موجودًا في المكتبة الحالية.',
      })),
      externalVideosNotDownloaded: externalVideos,
      learnerProjectFilesNotAccessible: true,
    }, null, 2),
  });

  files.push({
    path: 'manifest.json',
    contents: JSON.stringify({
      packageSchemaVersion: 1,
      generatedAt: snapshot.generatedAt,
      scope: snapshot.scope,
      recordsStatus: hasUnavailableStorage ? 'partial-or-unconfirmed' : 'readable-from-current-browser',
      recordStorageStatus: snapshot.storageStatus,
      fileCount: files.length + 1,
      files: files.map((file) => file.path),
    }, null, 2),
  });
  return files;
}

export function createLearningExportArchive(
  snapshot: LearningExportSnapshot,
  topics: TopicItem[],
  learningContents: TopicLearningContent[],
  prompts: PromptLibraryRecord[],
  referenceTemplates: readonly ExportReferenceTemplate[],
) {
  return createStoredZip(buildLearningExportFiles(snapshot, topics, learningContents, prompts, referenceTemplates), new Date(snapshot.generatedAt));
}

