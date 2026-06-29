# Agent Memory Index

Use this file as the routing map for brain repo memory. Keep it short.

Always load:

- `active.md` — compact high-value rules

Load only when relevant:

- `topics/delivery.md` — delivery workflow, verification, PR/deploy behavior
- `topics/audit.md` — audit workflow, repeated mistakes, issue writing
- `topics/planner.md` — `/planner` output shape and Codex/Claude handoff rules
- `topics/learn-pass.md` — auto-memory, candidate lessons, and self-learning triggers
- `topics/memory-system.md` — memory architecture, templates, adapters, rollout behavior
- `topics/project-routing.md` — project mapping and repo selection rules
- `component-notes/<Component>.md` — file/component-specific rules

Load only for memory maintenance or `/upgrade`:

- `candidates.md` — `/learn-pass` candidates that are not active yet
- `metrics.md` — application counts, failures, confidence, promotion/archive decisions
- `harness-proposals.md` — proposed harness changes, validation plans, promotion status
- `harness-regression-tests.md` — regression checks for memory/harness changes
- `archive.md` — old, replaced, or low-priority memory
- `mistakes.md` — concise repeated-failure evidence and corrected behavior

Do not load the full `agent-memory/` tree by default. Classify the task scope first, then load the smallest useful set.
