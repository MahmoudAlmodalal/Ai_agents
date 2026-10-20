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

`.env.example`:

```dotenv
# Optional local AI Studio access. Replace only in an ignored local env file.
AI_STUDIO_API_KEY=replace-with-local-secret
```

The value above is an unmistakable placeholder, not a credential and not a
claim that this variable is configured in any tool. `.gitignore` excerpt:

```gitignore
.env
.env.*
!.env.example
node_modules/
```

The real key belongs in a local ignored file such as `.env.local` or a secret
store. Review the actual repository status before staging; ignoring a file
later does not erase a secret already committed.

## `docs/AI_STUDIO_WORKFLOW.md` — Topic 25

```markdown
Experiment: classify synthetic requirements as exercise-choice, assumption,
or open-question.
Input: the fictional PRD excerpt below, with no personal data or secrets.
Record: interface date, model ID as displayed, prompt, output, and human review.
Status: Not Run — no AI Studio session or current model selection is claimed.
```

`src/data/mock-data.json` — synthetic fixture matching the provisional Group 06
ERD:

```json
{
  "_fixture_meta": {
    "synthetic": true,
    "purpose": "relationship-shape exercise only",
    "notProductionData": true
  },
  "study_session": [
    {
      "id": 101,
      "title": "Exercise session 101",
      "organizer_alias": "synthetic_organizer_01"
    }
  ],
  "time_option": [
    {
      "id": 201,
      "session_id": 101,
      "starts_at": "2031-05-12 17:00"
    }
  ],
  "preference": [
    {
      "id": 301,
      "session_id": 101,
      "option_id": 201,
      "participant_alias": "synthetic_participant_01"
    }
  ]
}
```

`_fixture_meta` describes the fixture and is not a database table. Each row in
the three arrays uses only fields in the provisional ERD/DBML; `session_id` and
`option_id` demonstrate the same-session links. The timestamp-like value is a
synthetic string; timezone and production format remain unresolved. JSON syntax
and field correspondence can be checked locally, but no AI Studio output or
database import is claimed.

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

## `docs/MCP_FOUNDATIONS.md`, permissions, and capability examples — Topic 27

```markdown
# MCP foundations — illustrative design-reference exercise

## Roles
- Host: the user-facing application that manages the agent session and policy.
- Client: the host component that speaks MCP to a server.
- Server: a process or service that advertises capabilities and handles requests.

## Capability types
These names and schemas are invented for teaching. They are not claims about
the actual Google Stitch server or any server's current capability list.

| Type | Illustrative name | Purpose | User/host control |
|---|---|---|---|
| Tool | `list_reference_screens(project_ref)` | Return identifiers for one selected project. | Model-invoked action; host asks for approval before the first read and constrains the project scope. |
| Tool | `read_screen_metadata(screen_id)` | Read metadata for one selected screen. | Read-only; host/user confirms the exact screen. No create, update, or delete tool is in scope. |
| Resource | `designref://project/{project}/screen/{screen}` | Provide a read-only metadata document for a chosen screen. | Host includes it only when requested and after confirming the referenced project/screen. |
| Prompt | `summarize-screen-evidence` | Template that asks for source-linked tokens and UNKNOWN values. | User-selected text template; it does not grant tool or resource access by itself. |

MCP capability discovery describes what a server offers. It does not, by itself,
establish that an operation is authorized or safe. The host and server must
enforce the approved access policy. Actual capability names, argument schemas,
transport, authentication, and consent controls must be checked against the
chosen server's documentation before connection.

## Permission matrix

| Capability | Data scope | Read/write | Required gate | Denied by default |
|---|---|---|---|---|
| List screens | One owner-selected project | Read | User confirms project and host shows returned identifiers. | All projects, hidden projects, or account-wide enumeration |
| Read screen metadata | One user-selected screen | Read | User confirms screen ID; host records source and date. | Other screens or whole workspace |
| Read resource URI | Exact URI for a selected screen | Read | Host validates project/screen scope before resolving. | Wildcard URI or arbitrary file access |
| Use prompt template | Prompt text only | No direct data access | User chooses to run it with already authorized context. | Implicit tool calls or permission expansion |
| Create/update/delete | No scope | Write | Out of scope for this exercise. | Always |
| Read secrets / shell / local files | No scope | Read/write | Out of scope; secrets stay in a local secret store. | Always |

## Review record
No MCP server, client, authorization prompt, or request was run. The matrix is
a proposed least-scope policy for discussion, not a granted permission set.
```

`docs/mcp/client-config.example.json` — deliberately non-executable placeholder:

```json
{
  "mcpServers": {
    "design-reference": {
      "command": "<documented local launcher; review before replacing>",
      "args": [],
      "env": {
        "DESIGN_SERVICE_TOKEN": "<load from local secret store; never commit>"
      }
    }
  }
}
```

This is syntactically valid JSON but not an executable configuration: command,
transport, environment variable, authentication behavior, and capability list
are placeholders. No endpoint or secret is supplied. The operator must compare
the configuration with the chosen server's current documentation and review
the host's permission controls before use.
