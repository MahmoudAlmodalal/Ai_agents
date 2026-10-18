# Issue 34: entry and reading review

Date: 2026-10-18. Scope: homepage, direct full reader entry, optional preview, and the shared interactions affected by those paths.

## Implemented journey

- The homepage names the learner (basic programming knowledge, beginning with AI Agents), describes the first topic and its expected output, and derives its start link, goal, title and outputs from the first entry in the canonical topic list.
- Topic titles and the primary **قراءة الموضوع كاملاً** action open the matching `/learn/[slug]` page. **معاينة سريعة** remains an explicit separate button. Recently viewed topics also link directly to the full reader.
- The full reader and preview use the same topic identity, goal, outputs, authored HTML and authored application checklist. Empty checklists do not gain invented criteria. Publication labels describe availability without claiming educational approval.
- Previous and next links follow the existing canonical list. Topic one links to `/learn/discovery-grill-me`; the last available entry has no next topic. Self-assessment choices do not restrict navigation. Pending application material is identified on the current topic and on a pending next topic.
- Full page entry records canonical recently viewed history and supports favorites, printing and the existing bounded browser speech capability. The speech action explicitly describes introduction playback; pause, resume and stop are available. The global navigation continues to provide theme controls, and returning home follows its theme without writing an initial light preference over it.
- A shared HTML wrapper wires copy buttons in both readers, provides accessible success or error feedback, and delegates authored inline checklist behavior to the issue 36 helper. Clipboard denial leaves the text available for manual copying.
- Preview focus starts on Close, stays inside the dialog with Tab and Shift+Tab, and returns to the opener after closing. Escape works from form controls; arrow navigation preserves native form and diagram control behavior. The diagram opening action scrolls to its section. Diagram controls and claims appear only for topics that declare a diagram.

## Evidence and checks

Static review confirmed the first/second and last canonical entries and stable legacy identity mappings. The navigation browser spec now checks real full-reader bounds before leaving the page, second-topic return navigation, free navigation with unchecked criteria, preview focus and focus restoration, copy text in both readers, and readable pending content without invented checklist items. Saved-data tests cover legacy bookmark identity, canonical history from direct reading, and current topic IDs across card, preview and full reader favorite changes. The canonical resolver now recognizes current topic IDs after the frozen legacy and alias maps, preventing duplicate favorites or raw current IDs in new history writes while preserving unknown saved values.

During combined validation, a focused Chromium reproduction found that legacy inline copy handlers and the shared handler both wrote to the clipboard, and a toast context update replaced the authored DOM and reset copy feedback. The wrapper now keeps its HTML markup reference stable and removes legacy inline copy handlers. A second focused reproduction confirmed one clipboard write, persistent copied feedback after the toast, unchanged button and checkbox DOM nodes, and a legacy checkbox uncheck saved as false. The navigation spec includes the corresponding copy and checklist regression.

The coordinating agent owns combined browser checks, TypeScript and production build validation, and records results in [LEARNING_PILOT_QA.md](LEARNING_PILOT_QA.md). Native print output, audible Arabic speech and owner approval require their respective manual review; invoking browser APIs does not establish those results.

## Remaining scope

The remaining lessons are not rewritten or educationally approved by this change. History and favorites use the existing local browser storage adapters. The first lesson content review belongs to issue 35; checklist storage and legacy criterion handling belong to issue 36.
