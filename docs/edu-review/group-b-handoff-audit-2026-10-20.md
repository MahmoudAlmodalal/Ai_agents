# Curriculum B output-to-input traceability — 2026-10-20

**Scope:** canonical Topics 30–58 (`src/data/learning/group-b.ts`), 29 topics across issues #61–#69.
**Static review:** Source correction commit `5b0c8be2a2628b0d29a3debc044772e0a54254c8` passed Dashboard's independent static re-review. The review also found additional direct Topic 39/40/41/42 references in Topic 45/54 that the earlier audit omitted; this revision expands the table to 49 topic-to-topic handoff edges and names the relevant artifacts. The documentation update is being recorded separately from the source commit. This audit does not treat missing prior evidence as an access gate.
**Execution status:** learner-project outputs, external tools, browser journeys, videos, and owner decisions were not executed or approved by this audit. Those remain Not Run or pending. This audit does not mark a group improved or make the preceding topic an access requirement.

The table follows the output IDs declared by one topic to the input text of the next relevant topic. When an output is missing or a path is not selected, the learner records `Not Run`, `unknown`, or `not applicable` and can continue. Django and FastAPI are alternatives; Vercel and Netlify are host choices that may be compared, not simultaneous prerequisites.

| Topic(s) | Declared output(s) | Consuming topic and input alignment |
|---|---|---|
| 30 → 31 | `types-file`, `type-evidence` | 31 starts from both TypeScript contracts and negative/positive boundary evidence. |
| 31 → 32 | `component-map`, `state-fixtures` | 32 takes the React component/state map and fixtures into design-token styling. |
| 32 → 33 | `token-map`, `responsive-report` | 33 uses the token map when styling the route shell and treats the responsive report as recorded viewport evidence. |
| 33 → 34 | `route-spec`, `route-shell` | 34 maps its architecture to the route specification and existing shell. |
| 34 → 35 | `front-map`, `task-slice` | 35 reviews the planned screen/component map and task slice in the UI/UX recommendation context. |
| 35 → 36, 37 | `ux-context`, `ux-decisions` | 36 uses both review records; 37 carries the accepted UX decisions and open questions into implementation. |
| 36 → 37 | `feature-spec`, `feature-plan` | 37 takes the specification and scoped task plan as implementation inputs. |
| 37 → 38 | `ui-slice`, `slice-evidence` | 38 uses the implemented slice and its evidence to identify whether backend work is needed. |
| 38 → 39 | `python-env`, `config-template` | 39 uses the Python environment and secret-free configuration template for the development database setup. |
| 39 → 40, 41, 42, 45, 54 | `pg-setup`, `pg-check` | 40 records database constraints and connection state while defining the API contract; 41/42 use the setup and check when configuring the selected ORM path; 45/54 use the same named database setup/check outputs in their integration/deployment inputs. Migration remains deferred until that ORM and its models exist. |
| 40 → 41, 42, 43, 44, 45 | `api-contract`, `api-layers` | 41/42 implement the selected framework against the contract and layer map; 43/44 use them as the API and service authorization context; 45 uses them to connect the UI to the implemented service. |
| 40 → 54 | `api-contract` | 54 names the API contract as the deployment-planning input; it does not list `api-layers`. |
| 41 → 43, 44, 45, 54 | `django-models`, `django-migration` | 43/44, 45, and 54 name the selected Django model/migration outputs when Django is the chosen path. |
| 42 → 43, 44, 45, 54 | `api-schemas`, `alembic-record` | 43/44, 45, and 54 name the selected FastAPI schema/migration outputs when FastAPI is the chosen path. |
| 43 → 44, 45 | `permission-matrix`, `auth-tests` | 44 places the authorization rules and test outcomes at service boundaries; 45 carries the same policy into client integration. |
| 44 → 45 | `service-map`, `invariant-evidence` | 45 uses service boundaries and concurrency/invariant evidence with the implemented server state. |
| 45 → 46 | `api-client`, `integration-config` | 46 writes journeys against the typed client and the declared fixture/service and public/server configuration. |
| 46 → 47 | `journey-spec`, `journey-log` | 47 selects the measured read path from a reproducible journey and its actual test record. |
| 47 → 48 | `db-baseline`, `db-change` | 48 bases a Redis decision on the SQL baseline and measured change/tradeoff. |
| 48 → 49 | `redis-decision`, `cache-policy` | 49 includes the optional cache decision and policy, plus cache-check evidence if Redis was adopted. |
| 49 → 50, 55 | `qa-matrix`, `qa-gaps` | 50 uses the risk and blocker list in the runtime decision; 55 carries QA results and gaps into operations. |
| 50 → 51 | `container-decision`, `container-runtime-evidence` | 51 uses the selected image or managed-runtime boundary when documenting Linux ownership; inaccessible host controls remain unknown. |
| 51 → 55 | `linux-ownership`, `linux-change-plan` | 55 uses the host boundary and any reviewed, limited change plan when preparing the runbook. |
| 52 → 53, 54, 55 | `vercel-config-record`, `vercel-preview-evidence` | 53 may use these records when comparing providers; 54/55 use them if Vercel is the selected frontend host. |
| 53 → 54, 55 | `netlify-compatibility-record`, `netlify-preview-report` | 54/55 use these records if Netlify is selected. A preview does not establish a live backend. |
| 54 → 55 | `backend-topology`, `backend-smoke-report` | 55 uses the API/DB topology and actual smoke-check statuses, including Not Run items. |
| 55 → 56 | `operations-capabilities`, `restore-rollback-plan` | 56 indexes the verified/unknown operations capabilities and separate rollback/restore plan. |
| 56 → 57 | `handoff-index`, `handoff-evidence` | 57 uses the handoff package and version-bound evidence to prepare its Demo Day story. |
| 57 → 58 | `demo-script`, `demo-readiness` | 58 uses the demo claims, readiness state, and labeled fallback when describing the portfolio entry. |
| 58 | `portfolio-narrative`, `portfolio-evidence-map` | Terminal topic for this scope; no next Topic is declared. |

## Review limits

`Passed` here means the authored input/output references trace across the stated topic sequence after static review. It does not mean a learner created or validated any listed artifact. Actual command output, migrations, network/service behavior, test execution, responsive inspection, and media playback remain Not Run until recorded by the learner or release review. Policies, scoring, rubric scale, candidate video approval, and course-owner acceptance remain proposed or pending in the issue packets.
