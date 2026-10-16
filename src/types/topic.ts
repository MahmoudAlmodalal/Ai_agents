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
  htmlContent: string;
}

export interface SearchMatch {
  topic: TopicItem;
  score: number;
  matchedFields: string[];
  matchedSnippet?: string;
}
