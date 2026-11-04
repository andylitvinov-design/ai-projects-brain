# PR One-Publish Standard v1.0 — cross-project agent contract

**Contract ID:** `GLOBAL_PR_ONE_PUBLISH_V1`  
**Owner instruction:** 2026-11-04  
**Authority:** applies to every project, agent, workflow author and code-producing task that can create/update GitHub PRs in the owner's projects. Read this **before** publishing code, even when working through ChatGPT, Codex Cloud, Claude Code, Hermes, or a connected GitHub app. Preserve higher-priority user safety instructions and repo-specific CI/security policies. Non-code and non-PR work simply records `N/A`.

**Single public source of truth:** [ai-projects-brain/systems/pr-one-publish-standard.md](https://github.com/andylitvinov-design/ai-projects-brain/blob/main/systems/pr-one-publish-standard.md). Project `AGENTS.md`, `CLAUDE.md`, Codex instructions and automation prompts SHOULD link here, not duplicate it or rely on outdated chat memory.

## 1. Default rule — prepare → verify → publish once → wait for the protected gate

1. **Resolve the correct repository and current branch policy.** Read local `AGENTS.md`, `CLAUDE.md` when present, and the applicable CI/merge rules. Identify whether a branch push or PR creation can incur GitHub Actions / Vercel / external provider costs. No unverified new billing risk.
2. **Prepare all cohesive source, tests and docs before opening a PR.** Work in an unopened task branch or local worktree; do the smallest useful offline syntax/unit/routing checks first, without weakening assertions. A task may take many private/local edits, but **do not publish each intermediate file to an open PR**.
3. **One coherent publish.** Prefer an atomic multi-file git commit/push or a single GitHub tree/commit + compare-and-swap `update_ref`. When connector tools commit each file individually, finish those commits **before PR creation**, then open the PR **once**. For required CI on PR opening, only a complete self-consistent HEAD is admissible.
4. **Freeze published HEAD while mandatory checks are queued/running.** Do not append cosmetic docs/formatting/metadata/no-op follow-ups, automated base refreshes, and second bot edits merely to produce a new CI wave. PR title/body edits can be CI triggers in some repositories; publish progress as **issue/PR comments or existing logs**, not repeat PR metadata edits. Never assume Draft bypasses all workflows.
5. **Repair only with evidence and in one batch.** A verified failed exact-HEAD check, security vulnerability or meaningful correctness bug may justify another coherent code publish. Gather related failures, change the smallest verified set, locally run relevant tests, update HEAD once, and allow the mandatory exact-HEAD CI to run again. Urgent security/P0 work may preempt a wave; correctness overrides an arbitrary wave limit.
6. **No false wakeups or unbounded retries.** No empty commits, repeated `workflow_dispatch`, `rerun`, no-op rebases or branch updates solely to obtain green status when valid exact-HEAD required CI already exists. Missing-CI recovery may use the project's **existing** verified one-shot fallback only after proving zero legitimate run history; do not disable a project-specific `pull_request.edited` trigger if an authorized CI wake relies on it.
7. **Protected merge and LIVE remain independent.** Merge only against currently required exact-HEAD checks, reviewers, leases and branch protection. Production LIVE needs an independently verified deployment and functional acceptance. A docs-only policy merge is not proof that runtime behavior has changed.

## 2. Agent execution preflight (required for all PR-authoring tools)

Before the first source write, record these decisions in the task's existing notes (not a new service):
- `repo/base/branch`, `project identity`, `PR exists? yes/no`, current `HEAD`.
- `stage files before PR? yes/no`, `local checks`, `one-publish plan`, `CI cost risk`.
- `who owns HEAD` and `whether required CI already queued/running`.
- If an open PR exists: does the proposed update fix a **verified** new failure? If not, HOLD the optional edit until the wave is complete, or only report it.
- If a repository has no PR/CI, say `N/A`: don't create workflows, add polling or invent a release pipeline to satisfy this standard.

**Completion evidence:** `first published HEAD`, `PR opened at`, `number of post-open commits`, `number of same-HEAD duplicate Core/test waves`, `first-pass success/failure`, `verified repair waves`, and real `merged_at`. Derive from existing GitHub events/jobs, and mark unknown coverage; do not fabricate durations. Aim for **1 initial wave**, optionally **1 verified repair wave**. **3+** is a diagnostic indicator, not a security override or hard block.

## 3. Enforcement and distribution

- **Every repo agent entrypoint:** Link to this standard in root `AGENTS.md`; when `CLAUDE.md` exists, link from there or ensure it requires reading `AGENTS.md`. Link from project prompts and existing automation instructions **before** code-authoring. New repository templates and cloud task templates must include it.
- **Central router:** `ai-projects-brain/systems/agent-rules.md`, `systems/codex-project-workflow.md`, `systems/autonomous-project-executor.md`, `START-HERE-FOR-AGENTS.md` and `AGENTS.md` include a direct preflight link.
- **Project-scoped specifics:** Holistic House further uses [its current control-plane canon](https://github.com/andylitvinov-design/books/blob/codex/bootstrap-books/docs/operations/PR_AUTOMATION_CANONICAL_V1.md) and its `CORE`, `Specialist` and `Guard` rules; do not replace them with generic exemptions.
- **No new CI to enforce the rule.** An agent preflight + repo AGENTS pointer is the zero-new-run implementation. If an existing test suite already executes on legitimate source changes, an assertion for generated task instructions may be added *inside that suite* only when it does not fan out new workflows or paid runs.
- **Do not claim universal coverage without inventory.** New/private/other-account repos, local-only projects, external agents not configured to read their instructions and ChatGPT Projects' private instruction fields cannot be controlled through a GitHub file alone. Report each as connected / missing / needs explicit setup. Keep instructions local to the projects that can read them.
- **Costs:** No new schedule, GitHub Actions workflow, runner, Vercel deployment, third-party platform, bot, token or paid API. Even a documentation commit may trigger a host; confirm triggers/quotas before a broad rollout and use **one batch per repository**, never a file-by-file CI storm.

## 4. Minimal automatic task acknowledgement

Every code-producing agent should record this line **before PR creation** in its normal task notes, log, or PR description on first publication:

`GLOBAL_PR_ONE_PUBLISH_V1: staged_before_open=<yes|no|n/a>; local_checks=<verified|partial|n/a>; post_open_head_updates=0; extra_waves=<verified_reason|none>; cost_new_spend=NO_NEW_SERVICES`

Do not rewrite a live PR body to insert this marker: that itself may trigger a redundant CI wave. Use the agent's regular report if the PR already exists.

**Measurement and honesty:** The #3502/#3509 Holistic House incident inspired this standard, but the claimed wave reduction is a **target** for newly started PRs. A merged policy alone does not prove future agents read it or that waves decreased. Require subsequent evidence and acknowledge unknown coverage.
