# Group 09 sample outputs — Coding agents, AI Studio, Skills, and MCP

These are safe exercise drafts. No AI service, coding agent, credential, or MCP server was used to produce them.

## `docs/CODING_AGENT_SETUP.md` — Topic 24

```markdown
# Coding-agent task boundary

Task: inspect the fictional study-group sample documents and identify
contradictions between the PRD and a proposed flow.
Allowed: read the named docs; propose a change with file and line references.
Not allowed: execute deployment, publish, contact users, or change access rules.
Review: inspect the diff, run the relevant tests, and keep unresolved questions open.
Secrets: never read or print `.env.local`; no credential is included here.
```

## `docs/AI_STUDIO_WORKFLOW.md` — Topic 25

```markdown
Experiment: classify synthetic requirements as exercise-choice, assumption,
or open-question.
Input: the fictional PRD excerpt below, with no personal data or secrets.
Record: interface date, model ID as displayed, prompt, output, and human review.
Status: Not Run — no AI Studio session or current model selection is claimed.
```

## `docs/PROJECT_AGENT_SKILLS.md` / `docs/skills/frontend-standards.md` — Topic 26

```markdown
# Project Skill draft: review-arabic-ui

Use only when reviewing Arabic interface text or mixed Arabic/code layouts.
1. Check prose direction, code direction, labels, focus order, and visible focus.
2. Report each finding with the file/screen and observed evidence.
3. Do not change product behavior, permissions, or unverified design tokens.
4. Mark what was not tested.

Status: draft; not installed, invoked, or independently reviewed.
```

## `docs/MCP_FOUNDATIONS.md` and safe config sketch — Topic 27

```markdown
Host: the application coordinating a user/agent session.
Client: protocol participant that requests tools/resources from a server.
Server: component that advertises the bounded tools/resources it can provide.
Sample need: read selected Stitch screen metadata, if the owner configures access.
Permission: prefer read-only scope when it supports the task; review each tool.
```

```json
{
  "mcpServers": {
    "stitch": {
      "command": "<documented local command>",
      "args": [],
      "env": { "TOKEN": "<load from local secret store; never commit>" }
    }
  }
}
```

This is not an executable configuration and the placeholder is not a real endpoint or secret.
