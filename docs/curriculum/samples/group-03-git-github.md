# Group 03 sample outputs — Git and GitHub documentation

The same fictional study-group exercise is used. The command transcript below is illustrative; no repository, remote, GitHub account, or Pull Request was created. It contains no real credentials.

## `README.md` and documentation layout — Topic 05

```markdown
# Study-group scheduling exercise

A fictional exercise for collecting preferred study-group meeting times.
No user interviews have been conducted; product rules are sample-only.

## Project notes
- `docs/PROJECT_CONTEXT.md` — exercise context
- `docs/DECISIONS_LOG.md` — decisions, assumptions, and open questions
- `docs/PRD.md` — requirement draft with source status
- `docs/diagrams/` — diagrams with links to their requirement sources

## Safety
Do not commit `.env`, `.env.local`, tokens, or real participant data.
```

Illustrative `.gitignore` excerpt:

```gitignore
.env
.env.*
!.env.example
node_modules/
```

Illustrative command sequence (not executed):

```text
git status --short
git diff --cached
git log --oneline -3
```

A learner must inspect the actual output locally before committing. Ignoring a file later does not erase a secret already present in Git history.

## Pull Request description — Topic 06

```markdown
## Purpose
Add the study-group exercise context, source-labeled requirement drafts,
and diagram guidance.

## Review focus
- Are exercise choices clearly separated from validated decisions?
- Are open questions retained?
- Does the README disclose that this is fictional?
- Did the diff exclude `.env*`, personal data, and generated files?

## Merge state
Awaiting review; no PR or merge has been created by this sample.
```

**Handoff:** A reviewed branch can carry docs changes into the next diagramming work. A remote URL, target branch, review result, and merge authorization must be supplied by the learner; this sample invents none.
