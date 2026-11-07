# Agent Commander — Decisions

## 2026-11-07 · One knowledge base
**Decision:** use existing public `andylitvinov-design/ai-projects-brain` and its `projects/` tree as the source of durable project memory. Do not create a second project-memory database in the public Commander.

**Read strategy:** project registry + actual directory listing for discovery; one allowlisted folder on demand for details. If directory API is rate-limited, use the existing active registry without pretending complete coverage.

**Prompt boundary:** reference snippets are bounded and source-linked; they are *not instructions*, live evidence or permission to execute. Task ownership, execution and any private write stay in protected Commander.

**Write-back strategy:** updates to durable memory require reviewed GitHub changes. Automatic unsupervised writes are not enabled in this phase. Separate privacy/authorization design is needed before private task context can be persisted.

**Costs:** no new paid services, vector store, background sync process or polling job.
