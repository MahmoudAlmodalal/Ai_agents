/** A guided practice session that composes several existing topics into one
 * end-to-end reading experience. Sessions are not part of the 58-topic
 * sequence and must never be added to the roadmap groups. */
export interface LearningSessionPrompt {
  /** Stable anchor used inside the session HTML. */
  id: string;
  /** Lecture prompt number, or a short label for unnumbered prompts. */
  number: string;
  title: string;
  purpose: string;
  /** When present, the full prompt already lives in /prompts/[slug]. */
  librarySlug?: string;
  /** When present, the full prompt is authored inside the session page. */
  inline?: boolean;
}

export interface LearningSessionRelatedGroup {
  title: string;
  topicSlugs: string[];
}

export interface LearningSession {
  slug: string;
  route: string;
  title: string;
  subtitle: string;
  summary: string;
  goal: string;
  durationLabel: string;
  levelLabel: string;
  sourceNote: string;
  outcomes: string[];
  prerequisites: string[];
  deliverables: string[];
  tableOfContents: Array<{ id: string; title: string }>;
  checklist: string[];
  assignment: string[];
  deliveryCriteria: string[];
  htmlContent: string;
  prompts: LearningSessionPrompt[];
  relatedGroups: LearningSessionRelatedGroup[];
  previousTopicSlug: string;
  nextTopicSlug: string;
}
