export type TopicCategory = 
  | 'all'
  | 'foundations'
  | 'architecture'
  | 'database'
  | 'frontend'
  | 'qa'
  | 'reference';

export type ContentType = 
  | 'all'
  | 'diagram'
  | 'prompt'
  | 'code'
  | 'checklist'
  | 'glossary';

export type PublicationStatus = 'unified-complete' | 'legacy-pending-migration';

export interface TopicItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: TopicCategory;
  categoryName: string;
  stageTag: string;
  summary: string;
  tags: string[];
  contentTypes: ContentType[];
  diagramCount: number;
  promptCount: number;
  codeSnippetCount: number;
  checklistCount: number;
  readingTimeMinutes: number;
  htmlContent: string;

  // Unified contract fields (Wave 1 foundational)
  slug: string;
  goal: string;
  prerequisites: string[];
  steps: string[];
  promptRefs: string[];
  outputs: string[];
  checklist: string[];
  publicationStatus: PublicationStatus;

  // Authoritative sequence position (1–58; undefined = legacy anchor)
  sequencePosition?: number;
}

export interface SearchMatch {
  topic: TopicItem;
  score: number;
  matchedFields: string[];
  matchedSnippet?: string;
}
