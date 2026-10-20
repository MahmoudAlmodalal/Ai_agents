import { CandidateExternalVideo } from '@/src/types/learning.ts';

interface VideoCandidateSpec {
  topicSlug: string;
  resourceId: string;
  title: string;
  url: string;
  sourceUrl: string;
  purpose: string;
  discoveryEvidence: string;
}

const candidateSpecs: VideoCandidateSpec[] = [
  {
    topicSlug: 'project-idea-mvp', resourceId: 'yc-mvp-2023',
    title: 'How to Build An MVP | Startup School',
    url: 'https://www.youtube.com/watch?v=QRZ_l7cVzzU',
    sourceUrl: 'https://www.ycombinator.com/blog/startup-school-videos',
    purpose: 'Y Combinator / Michael Seibel: a candidate adjunct for small product scope, early-user learning, and feature selection. Keep the lesson’s complete useful journey and fact-versus-assumption exercise as the governing work.',
    discoveryEvidence: 'Y Combinator’s Startup School video list names “How to Build a Minimum Viable Product” with Michael Seibel and links the candidate. Its listing and video metadata describe MVP feature choice, prototypes or demos, and early-user testing. A third-party transcript mirror was inspected for selected segments on iteration and user learning (00:08–02:24), focused users and limited functionality (07:17–10:00), and cutting a feature specification (14:12–15:49). Transcript evidence is secondary; the official player’s playback, captions, and accessibility were not checked.',
  },
  {
    topicSlug: 'discovery-grill-me', resourceId: 'atlassian-product-discovery',
    title: 'Introduction to Jira Product Discovery: video',
    url: 'https://community.atlassian.com/forums/discussion/2867261/introduction-to-jira-product-discovery-video',
    sourceUrl: 'https://community.atlassian.com/forums/discussion/2867261/introduction-to-jira-product-discovery-video',
    purpose: 'Atlassian: a product-discovery example showing ideas, insights, and prioritization. It is adjacent context, not a demonstration of Grill Me interviewing one question at a time or recording source-backed decisions.',
    discoveryEvidence: 'The Atlassian Community video page names the video and provides a transcript. The inspected transcript describes capturing product opportunities, user problems and possible solutions; attaching research insights; and prioritizing ideas in views. It does not teach the course’s interviewing workflow, so the lesson’s question discipline and decision log remain essential.',
  },
  {
    topicSlug: 'prd-specification', resourceId: 'atlassian-prd-blueprint',
    title: 'Using the Product Requirements blueprint in Confluence',
    url: 'https://www.youtube.com/watch?v=bUL1D7pCfLI',
    sourceUrl: 'https://www.atlassian.com/agile/product-management/requirements',
    purpose: 'Atlassian: a product-requirements document and template walkthrough that can supplement the Topic’s source, status, and acceptance-criteria work. The learner should still keep uncertain decisions open.',
    discoveryEvidence: 'Atlassian’s verified YouTube listing names this video and describes creating and customizing a Product Requirements blueprint in Confluence; Atlassian’s product-requirements guide provides matching PRD context. The interface is from 2019, so current controls and product behavior require a fresh review before use.',
  },
  {
    topicSlug: 'srs', resourceId: 'uw-waterloo-srs',
    title: 'SRS: CS445/ECE451 video',
    url: 'https://student.cs.uwaterloo.ca/~cs445/Winter2026/project/srs/index.html',
    sourceUrl: 'https://student.cs.uwaterloo.ca/~cs445/Winter2026/project/srs/index.html',
    purpose: 'University of Waterloo CS445/ECE451: the page links an SRS video explaining its purpose, content, and format, matching this Topic’s coherent requirements handoff.',
    discoveryEvidence: 'The official course page links an SRS video and says it describes the purpose, content, and format of each SRS section, based on an IEEE requirements standard. It also stresses consistency across use cases, domain model, quality requirements, UI sketches, and navigation. The video file was not fetched or played; the course term and standard-version details need review against the learner’s actual context.',
  },
  {
    topicSlug: 'git-project-docs', resourceId: 'github-git-basics',
    title: 'A brief introduction to Git for beginners',
    url: 'https://www.youtube.com/watch?v=r8jQ9hVA2qs',
    sourceUrl: 'https://www.youtube.com/watch?v=r8jQ9hVA2qs',
    purpose: 'GitHub: a fundamentals refresher for staging, commits, branches, and the difference between Git and GitHub before organizing project documentation.',
    discoveryEvidence: 'Search metadata identifies the publisher as verified GitHub and describes installation, configuration, staging, committing, branching, and the distinction between Git and GitHub. The sequence fits this Topic’s documentation-repository exercise; the lesson remains responsible for the actual docs/ structure and README output.',
  },
  {
    topicSlug: 'github-docs-collaboration', resourceId: 'exampro-pull-requests',
    title: 'GitHub Pull Requests Explained for Beginners - GitHub Foundations',
    url: 'https://www.youtube.com/watch?v=gBIPCZ0abQY',
    sourceUrl: 'https://www.youtube.com/watch?v=gBIPCZ0abQY',
    purpose: 'ExamPro: a third-party GitHub Foundations lesson on proposing, comparing, reviewing, discussing, and merging changes. This is not published by GitHub; it is a candidate for the PR review handoff only.',
    discoveryEvidence: 'The video listing identifies ExamPro as the publisher and its description covers the Pull Request lifecycle, branch comparison, review, discussion, and safe merging. It fits the Topic’s PR collaboration outcome, but does not independently verify the project’s remote, branch target, or secret-safety checks.',
  },
  {
    topicSlug: 'mermaid-syntax', resourceId: 'gitlab-mermaid-editor',
    title: 'How to Create Mermaid Diagrams',
    url: 'https://www.youtube.com/watch?v=SQ9QmuTHuSI',
    sourceUrl: 'https://mermaid.js.org/ecosystem/tutorials',
    purpose: 'GitLab Unfiltered: a Mermaid Live Editor tutorial candidate for writing and rendering text-based diagrams.',
    discoveryEvidence: 'Mermaid’s official Tutorials page lists the linked GitLab Unfiltered video under Live-Editor tutorials and explains that the tutorial list is intended as an introduction to generating and deploying Mermaid diagrams. It warns that tutorials may show an older interface; syntax and rendered meaning still need separate checks.',
  },
  {
    topicSlug: 'user-flow-modeling', resourceId: 'nng-user-flows',
    title: 'User Journeys vs. User Flows (And When to Use Each)',
    url: 'https://www.nngroup.com/videos/user-journeys-vs-user-flows/?lm=journey-mapping-ux-practitioners&pt=article',
    sourceUrl: 'https://www.nngroup.com/videos/user-journeys-vs-user-flows/?lm=journey-mapping-ux-practitioners&pt=article',
    purpose: 'Nielsen Norman Group: a concise distinction between user journeys and task-level user flows to support the Topic’s choice of one role-based scenario.',
    discoveryEvidence: 'The NN/g video page names the distinction and lists a four-minute video. It is directly relevant to choosing the representation; the course’s requirements traceability and documented success/rejection branches are additional learner tasks.',
  },
  {
    topicSlug: 'conceptual-domain-model', resourceId: 'nptel-conceptual-design',
    title: 'Week 2: Lecture 10 — How to start creating a software conceptual design',
    url: 'https://www.youtube.com/watch?v=UMUxxW7MzkE',
    sourceUrl: 'https://onlinecourses.nptel.ac.in/e-learning/course/noc26_cs185',
    purpose: 'NPTEL / IIT Bombay: a software conceptual-design lecture candidate for separating domain concepts and design reasoning from implementation detail.',
    discoveryEvidence: 'The official NPTEL/SWAYAM course page identifies Software Conceptual Design, IIT Bombay instructors, and a YouTube player; the course outcome includes conceptual design and UML modeling. The candidate video listing identifies the lecture as “How to start creating a software conceptual design.” The Topic’s business-language definitions and domain-owner validation still need review.',
  },
  {
    topicSlug: 'plantuml', resourceId: 'yasenstar-plantuml-quickstart',
    title: 'PlantUML in Action 001 - Quick Started',
    url: 'https://www.youtube.com/watch?v=znl8VyLi3jA',
    sourceUrl: 'https://yasenstar.github.io/PlantUML_in_Action/',
    purpose: 'Yasenstar’s PlantUML in Action: a syntax and editor walkthrough candidate for the first @startuml/@enduml render. It is an independent tutorial, not a PlantUML endorsement.',
    discoveryEvidence: 'The candidate video title names a PlantUML quick start. Its series page describes practical PlantUML diagram lessons and states its materials are aligned with the PlantUML core team. That is publisher-provided context, not independent verification; the candidate should be checked for current syntax and the lesson’s separate Mermaid comparison.',
  },
  {
    topicSlug: 'use-case-diagram', resourceId: 'lucid-use-case',
    title: 'UML Use Case Diagram Tutorial',
    url: 'https://lucid.co/diagram/uml/use-case-diagram-tutorial',
    sourceUrl: 'https://lucid.co/diagram/uml/use-case-diagram-tutorial',
    purpose: 'Lucid: an embedded tutorial for actors, system scope, goals, and associations in use-case diagrams.',
    discoveryEvidence: 'Lucid’s official tutorial explains actors and the system interactions/goals that a use-case diagram summarizes and links an instructional video. The candidate is a diagramming-tool tutorial; actor authority and the chosen system boundary must still be compared with the project requirements.',
  },
  {
    topicSlug: 'activity-diagram', resourceId: 'lucid-activity',
    title: 'UML Activity Diagram Tutorial',
    url: 'https://lucid.co/diagram/uml/activity-diagram-tutorial',
    sourceUrl: 'https://lucid.co/diagram/uml/activity-diagram-tutorial',
    purpose: 'Lucid: an activity-diagram walkthrough candidate on actions, decisions, forks, and swimlanes for process behavior.',
    discoveryEvidence: 'Lucid’s official tutorial describes activity diagrams as behavior diagrams for process logic and names the start/end, merge, fork, and swimlane notation. The page explicitly says its third-party player accessibility features are outside Lucid’s control; actual player, caption, and accessibility checks remain open.',
  },
  {
    topicSlug: 'state-diagram', resourceId: 'hamburg-state-machine',
    title: '1.6 UML-Zustandsdiagramm (UML State Diagram)',
    url: 'https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/50973',
    sourceUrl: 'https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/50973',
    purpose: 'University of Hamburg, Software Engineering lecture: a state-diagram candidate for states, transitions, and lifecycle behavior.',
    discoveryEvidence: 'The university’s Lecture2Go entry names the lecture “UML-Zustandsdiagramm,” identifies Prof. Dr. Matthias Riebisch, and lists video, audio, and subtitle links. The lecture is in German; language suitability and subtitle language must be checked for this Arabic/English curriculum, alongside playback and captions.',
  },
  {
    topicSlug: 'relational-erd-design', resourceId: 'lucid-erd',
    title: 'Create an Entity Relationship Diagram in Lucidchart',
    url: 'https://help.lucid.co/hc/en-us/articles/16471565238292-Create-an-Entity-Relationship-Diagram-in-Lucidchart',
    sourceUrl: 'https://help.lucid.co/hc/en-us/articles/16471565238292-Create-an-Entity-Relationship-Diagram-in-Lucidchart',
    purpose: 'Lucid: an embedded ERD tutorial candidate covering entities, attributes, relationships, and cardinalities.',
    discoveryEvidence: 'Lucid’s help page includes an ERD video and defines entities/relationships with cardinality. It also points to a tutorial on primary and foreign keys and bridge tables. The Topic’s normalization, constraints, and source-backed modeling decisions need direct educational review.',
  },
  {
    topicSlug: 'dbml-dbdiagram-io', resourceId: 'fazt-dbml',
    title: 'dbdiagram.io - Database Diagrams with Code (DBML)',
    url: 'https://www.youtube.com/watch?v=yN1RnjZEosY',
    sourceUrl: 'https://www.youtube.com/watch?v=yN1RnjZEosY',
    purpose: 'Fazt: a DBML and dbdiagram.io introduction that can supplement translating the accepted ERD into declarative database markup.',
    discoveryEvidence: 'Video metadata identifies the title and describes DBML as a language for designing relational databases and converting/exporting diagrams. This is a third-party Spanish-language creator; language, syntax currency, exact rendering, and fit with the learner’s chosen DBMS need a human check.',
  },
  {
    topicSlug: 'sequence-diagram-modeling', resourceId: 'hamburg-sequence',
    title: '5.6 UML-Sequenzdiagramm (UML Sequence Diagram)',
    url: 'https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/42264',
    sourceUrl: 'https://lecture2go.uni-hamburg.de/en/l2go/-/get/v/42264',
    purpose: 'University of Hamburg, Software Engineering lecture: a sequence-diagram candidate for ordered messages between participants.',
    discoveryEvidence: 'The university’s Lecture2Go catalog identifies a UML sequence-diagram lecture by Prof. Dr. Matthias Riebisch and exposes video/audio/subtitle controls on its course pages. The candidate’s exact subtitle availability, spoken language, playback, and whether it treats synchronous/asynchronous messages at the learner’s needed level remain unverified.',
  },
  {
    topicSlug: 'class-diagram-design', resourceId: 'lucid-class',
    title: 'UML Class Diagram Tutorial, Examples, and Guide',
    url: 'https://lucid.co/diagram/uml/class-diagram-tutorial',
    sourceUrl: 'https://lucid.co/diagram/uml/class-diagram-tutorial',
    purpose: 'Lucid: an embedded class-diagram walkthrough candidate for classes, attributes, operations, multiplicities, and relationships.',
    discoveryEvidence: 'Lucid’s official page distinguishes static structural class models from behavioral diagrams and provides a “How to make a UML class diagram” video section. The tutorial maps classes to object-oriented code; this Topic’s design-versus-implementation boundary and requirements traceability need separate review.',
  },
  {
    topicSlug: 'ui-ux-roles-navigation', resourceId: 'nng-information-architecture',
    title: 'Information Architecture: 3 Key Models',
    url: 'https://www.nngroup.com/videos/information-architecture-models/?lm=apples-flatland-aesthetic-part-1&pt=article',
    sourceUrl: 'https://www.nngroup.com/videos/information-architecture-models/?lm=apples-flatland-aesthetic-part-1&pt=article',
    purpose: 'Nielsen Norman Group: a compact comparison of navigation, taxonomy, and overall information architecture to support role-aware navigation planning.',
    discoveryEvidence: 'NN/g’s video page states that navigation, taxonomies, and the complete IA structure are distinct models. It is relevant to the Topic’s navigation map; the learner must still validate user roles and permissions from project requirements rather than infer them from an IA diagram.',
  },
  {
    topicSlug: 'ux-blueprint', resourceId: 'nng-service-blueprint',
    title: 'Service Blueprinting FAQ',
    url: 'https://www.nngroup.com/videos/service-blueprinting-faq/',
    sourceUrl: 'https://www.nngroup.com/videos/service-blueprinting-faq/',
    purpose: 'Nielsen Norman Group: a service-blueprint explanation candidate for separating visible touchpoints from backstage people and systems.',
    discoveryEvidence: 'The NN/g video page names service blueprinting and explains its relationship to customer journey maps. This is a concept-level adjunct, not a substitute for the Topic’s required project-specific phases, owners, evidence, and unresolved assumptions.',
  },
  {
    topicSlug: 'screen-inventory', resourceId: 'nng-wireflows-101',
    title: 'Wireflows 101',
    url: 'https://www.nngroup.com/videos/wireflows-101/?lm=tips-for-new-prototypers&pt=youtubevideo',
    sourceUrl: 'https://www.nngroup.com/videos/wireflows-101/?lm=tips-for-new-prototypers&pt=youtubevideo',
    purpose: 'Nielsen Norman Group: a wireflow candidate for connecting screen layouts, actions, and transitions. Adjacent to, but not a complete screen-inventory method.',
    discoveryEvidence: 'NN/g’s page identifies a four-minute video and explains that wireflows combine wireframes with flowcharts to document interactions and screen designs. The candidate supports enumerating and relating screens but does not prescribe the inventory table’s permissions, states, data, or requirements-source fields; those remain in the written Topic.',
  },
  {
    topicSlug: 'stitch-reference-screen', resourceId: 'google-stitch-intro',
    title: 'From idea to app: Introducing Stitch, a new way to design UIs',
    url: 'https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/',
    sourceUrl: 'https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/',
    purpose: 'Google Developers: an introduction to Stitch’s prompt/image-to-UI workflow, suitable as a dated tool-orientation candidate for the reference-screen exercise.',
    discoveryEvidence: 'Google Developers Blog labels a YouTube video alongside the Stitch introduction and describes generating UI from text or image prompts and exporting code. Since Stitch is experimental and the tool changes, the exact current workflow, access, playback, captions, and fit to the learner’s project must be verified before approval.',
  },
  {
    topicSlug: 'design-system-rules', resourceId: 'figma-design-systems-lesson-1',
    title: 'Lesson 1: Welcome to design systems',
    url: 'https://help.figma.com/hc/en-us/articles/14552802134807-Lesson-1-Welcome-to-design-systems',
    sourceUrl: 'https://help.figma.com/hc/en-us/articles/14552802134807-Lesson-1-Welcome-to-design-systems',
    purpose: 'Figma Learn: a video lesson candidate introducing design-system parts and the rationale for reusable patterns.',
    discoveryEvidence: 'Figma identifies this page as the written version of its “Introduction to design systems: Lesson 1” video tutorial. It explains that systems involve more than a style guide and component library; learners should compare the video’s examples with their own source-backed tokens and rules.',
  },
  {
    topicSlug: 'interactive-prototype', resourceId: 'figma-prototype-fundamentals',
    title: 'FD4B: Prototyping fundamentals',
    url: 'https://help.figma.com/hc/en-us/articles/31010011820311-FD4B-Prototyping-fundamentals',
    sourceUrl: 'https://help.figma.com/hc/en-us/articles/31010011820311-FD4B-Prototyping-fundamentals',
    purpose: 'Figma Learn: a prototyping video candidate covering screen flows, interactions, and ways to present/test prototypes.',
    discoveryEvidence: 'Figma’s Learn page includes a YouTube video player and explains connecting screens into journeys such as sign-up or checkout and testing prototypes on devices. Its Figma-specific controls may change; review keyboard, screen-reader, and current-control guidance against the Topic’s tool-neutral prototype acceptance checklist.',
  },
  {
    topicSlug: 'ai-coding-agent', resourceId: 'openai-codex-for-beginners',
    title: 'Codex for Beginners',
    url: 'https://academy.openai.com/public/videos/codex-for-beginners-2026-04-22',
    sourceUrl: 'https://academy.openai.com/public/videos/codex-for-beginners-2026-04-22',
    purpose: 'OpenAI Academy: an introduction to Codex as a coding agent, for comparing a real user task with the Topic’s plan-review-run-test workflow.',
    discoveryEvidence: 'OpenAI Academy lists “Codex for Beginners” as an official Codex video; OpenAI’s Codex learning pages cover setup and agentic software workflows. This vendor-specific candidate must not replace the lesson’s cross-tool task framing, permission boundaries, or learner verification. Access and playback are unverified.',
  },
  {
    topicSlug: 'google-ai-studio', resourceId: 'google-ai-studio-developers',
    title: 'Google AI Studio for developers',
    url: 'https://www.youtube.com/watch?v=MjHZey2_H-o',
    sourceUrl: 'https://ai.google.dev/gemini-api/docs/ai-studio-quickstart',
    purpose: 'Google for Developers: a Google AI Studio orientation candidate for trying prompts, settings, and the handoff from prototype to API work.',
    discoveryEvidence: 'The video listing names “Google AI Studio for developers” and describes getting started with AI Studio and Gemini; the official Gemini API quickstart confirms AI Studio is used to experiment with prompts and models. Product interface, model choices, region/account access, and policies are mutable and require current checks.',
  },
  {
    topicSlug: 'agent-skills', resourceId: 'anthropic-agent-skills-webinar',
    title: 'Agent Skills: Transform Claude from Assistant to Specialized Agent',
    url: 'https://claude.com/resources/webinars/agent-skills-transform-claude-from-assistant-to-specialized-agent',
    sourceUrl: 'https://claude.com/resources/webinars/agent-skills-transform-claude-from-assistant-to-specialized-agent',
    purpose: 'Anthropic: a webinar candidate about turning reusable instructions and resources into specialized agent Skills.',
    discoveryEvidence: 'Anthropic’s webinar listing names Agent Skills and describes transforming Claude into a specialized agent. Its Agent Skills documentation defines skills as filesystem-based resources with workflows and domain knowledge. Whether the recording is accessible without registration, its exact scope, current format details, captions, playback, and course suitability are not yet checked.',
  },
  {
    topicSlug: 'mcp-protocol', resourceId: 'anthropic-mcp-origin',
    title: 'Why we built—and donated—the Model Context Protocol (MCP)',
    url: 'https://www.youtube.com/watch?v=PLyCki2K0Lg',
    sourceUrl: 'https://www.anthropic.com/news/model-context-protocol',
    purpose: 'Anthropic: a protocol-origin discussion with co-creator David Soria Parra, suitable for context on the purpose of a standard connecting AI systems to external tools and data.',
    discoveryEvidence: 'Anthropic’s verified video listing identifies Stuart Ritchie speaking with MCP co-creator David Soria Parra about the protocol’s development and donation as an open standard. The current protocol specification evolves; the video is context, not a substitute for the dated spec and security review.',
  },
  {
    topicSlug: 'stitch-mcp-integration', resourceId: 'alex-hitt-stitch-mcp',
    title: 'Google Stitch MCP Tutorial: Watch Me Convert a UI Design to Code in VS Code',
    url: 'https://zolotube.com/watch?v=8uz1EMPMm0M',
    sourceUrl: 'https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch?hl=en',
    purpose: 'Independent tutorial candidate for connecting a Stitch design to an IDE through MCP and inspecting the resulting code. The official Google Codelab is the authoritative setup reference.',
    discoveryEvidence: 'The third-party video listing describes converting a Stitch-generated UI to frontend code in VS Code using Stitch MCP. Google’s official Codelab independently confirms a design-to-code exercise that connects Stitch to Antigravity via MCP. The tutorial’s authoring identity, setup commands, authentication and current compatibility are not independently verified; use the official Codelab to resolve any conflict.',
  },
  {
    topicSlug: 'design-md-spec', resourceId: 'google-design-md-video',
    title: 'Stitch DESIGN.md: portable design system format (Google Labs video)',
    url: 'https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/',
    purpose: 'Google Labs: an embedded video candidate explaining the DESIGN.md format and its use as a portable written design system.',
    discoveryEvidence: 'Google’s official Labs announcement says David East breaks down the DESIGN.md format in a video and explains that the open-source format shares visual design rules across platforms. The Topic’s source tracing, uncertainty labels, and separation from product requirements remain necessary; the embedded player and captions were not checked.',
  },
];

function toCandidate(spec: VideoCandidateSpec): CandidateExternalVideo {
  return {
    id: `${spec.topicSlug}-${spec.resourceId}`,
    title: spec.title,
    url: spec.url,
    purpose: spec.purpose,
    availability: 'candidate',
    approval: {
      state: 'proposed',
      approvedBy: null,
      approvedAt: null,
      decisionReference: null,
    },
    reviewEvidence: [
      {
        area: 'video',
        outcome: 'not-run',
        evidence: `Candidate metadata research recorded 2026-10-20. ${spec.discoveryEvidence} Course-owner approval, independent educational acceptance, current playback, caption/transcript language, and accessibility are not verified. External playback requires a network connection; no offline availability is promised.`,
        sourceUrl: spec.sourceUrl,
      },
    ],
  };
}

/**
 * Researched group A candidates. Every item remains non-actionable until a
 * course owner approves it and a reviewer records availability evidence.
 */
export const EXTERNAL_VIDEO_CANDIDATES: Partial<Record<string, CandidateExternalVideo[]>> =
  Object.fromEntries(candidateSpecs.map((spec) => [spec.topicSlug, [toCandidate(spec)]]));

export function getExternalVideoCandidates(topicSlug: string): CandidateExternalVideo[] {
  return EXTERNAL_VIDEO_CANDIDATES[topicSlug] ?? [];
}
