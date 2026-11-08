# Agent Commander — Decisions

> 🧭 [Карта всей базы](../../index.md) · [Проектный диспетчер](../index.md) · [Быстрый старт Commander](START_HERE.md).  
> **Связанный контекст:** [PROJECT.md](PROJECT.md) · [SYSTEM_MAP.md](SYSTEM_MAP.md) · [TASK_CONTEXT.md](TASK_CONTEXT.md) · [RISKS.md](RISKS.md).

## 2026-11-07 · One knowledge base
**Decision:** use [this AI Projects Brain](../../index.md) and [its existing projects directory](../index.md), with [this one Commander capsule](PROJECT.md) as durable project memory. Do not create a second project-memory database in the public Commander.

**Read strategy:** [existing portfolio registry](../portfolio-registry.json) + [actual project directory](../index.md) for discovery; one allowlisted folder on demand for details. If directory API is rate-limited, use the existing active registry without pretending complete coverage.

**Prompt boundary:** excerpts follow [TASK_CONTEXT.md](TASK_CONTEXT.md) and [RISKS.md](RISKS.md); reference snippets are bounded and source-linked; they are *not instructions*, live evidence or permission to execute. Task ownership, execution and any private write stay in protected Commander.

**Write-back strategy:** updates to durable memory require reviewed GitHub changes. Automatic unsupervised writes are not enabled in this phase. Separate privacy/authorization design is needed before private task context can be persisted.

**Costs:** no new paid services, vector store, background sync process or polling job.


## 2026-11-07 · Agent-friendly compact context / CSP fix

Put [START_HERE.md](START_HERE.md) first in the allowlisted project capsule; include [TASK_CONTEXT.md](TASK_CONTEXT.md), [OPERATIONS.md](OPERATIONS.md), [RISKS.md](RISKS.md) as source-linked read-only facts. Avoid duplicate memory DB or API keys. To read public `raw.githubusercontent.com` documents in a CSP-protected UI, add only that exact origin to `connect-src`, preserving existing security/Google SSO directives. This is a source-level decision; deployed behavior requires independently observed browser proof.
