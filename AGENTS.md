# Global Autonomous Project Rules

**Mandatory across all projects when making GitHub code/PR changes:** read [GLOBAL_PR_ONE_PUBLISH_V1](systems/pr-one-publish-standard.md) before editing/publishing the branch. Prepare and test cohesive files before opening PR; publish one complete HEAD; avoid modifying it while protected CI runs except for a verified failure or urgent security fix. No new paid runners/automation or CI bypass. Agent preflight is required even when the target is another repo.

Before working in this repository, read and apply the shared project-brain rules:

- `https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/autonomous-project-executor.md`
- `https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md`
- `https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-workflow.md`
- `https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-cloud-repo-mode.md` when working on ChatGPT Codex Cloud repository setup or mobile/cloud launch routing
- `https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/mobile-autopilot-control-plane.md` for plain-language phone/web implementation requests across projects

Default mode: work autonomously for safe read-only, docs, diagnosis, planning, branch, patch, validation, and PR work. Ask only before risky actions: secrets/env changes, deletion, merge to `main`, production deploy, financial/account/access changes, irreversible changes, or broad rewrites.

---

# AI Projects Brain Agent Rules

This repository is the cross-project memory and governance source for the user's projects.

## Required context

Before changing project memory or system rules, read:

1. `projects.md`
2. `projects.json`
3. `systems/autonomous-project-executor.md`
4. `systems/agent-rules.md`
5. `systems/codex-project-workflow.md`
6. `systems/codex-cloud-repo-mode.md` when the task mentions Codex Cloud, cloud threads, mobile Codex, GitHub Connector, or cloud environments
7. `systems/mobile-autopilot-control-plane.md` when Andrey gives a plain-language implementation request from ChatGPT web/mobile
8. the relevant `projects/<slug>/PROJECT.md`
9. relevant `CODEX_BRIEF.md`, `SYSTEM_MAP.md`, `DATA_SCHEMA.md`, or `RISKS.md` when present

## Default mode

Apply the global Autonomous Project Executor mode:

- work autonomously for safe read-only, docs, diagnosis, planning, branch, patch, validation, and PR work;
- ask only before risky actions: secrets/env changes, deletion, merge to `main`, production deploy, financial/account/access changes, irreversible changes, or broad rewrites;
- if information is missing, stale, inferred, or uncertain, mark it as `needs verification` and continue with the safest useful next action.

## Agent memory router

Before `/delivery`, `/audit`, `/save`, `/memory`, `/memory-review`, `/learn-pass`, `/upgrade`, or memory-instruction work:

1. Read `agent-memory/active.md` if present.
2. Read `agent-memory/index.md` if present.
3. Identify task scope.
4. Read only relevant topic/component memory.
5. Do not load `archive.md` unless resolving conflicts or running `/memory-review`.
6. Do not load `candidates.md`, `metrics.md`, `harness-proposals.md`, or `harness-regression-tests.md` unless running `/learn-pass`, `/memory-review`, or `/upgrade`.
7. Use `.codex/skills/*` or `.claude/commands/*` adapters only for the invoked command.

## Memory rules

- Keep `projects.md` and `projects.json` aligned.
- Keep generated indexes valid when scripts exist.
- Do not invent repo, live URL, hosting, env, or status facts.
- Store environment variable names only, never values.
- Mark uncertain project mappings as `needs verification`.
- Treat `/save` as upsert, not append.
- Put weak single-signal lessons in `agent-memory/candidates.md`, not active memory.
- Keep `agent-memory/active.md` compact and checkable.

## Verification

For docs-only changes, verify:

- changed links are correct;
- `projects.json` remains valid JSON if edited;
- generated indexes or validation scripts are run when relevant and available.

## Final report

Always report changed files, checks run, checks not run, risks, and whether project STATE/LOG or memory files need updates.

## Two owner Skills

For «доведи до лив» read agent-skills/finish-to-live.md; for «проверь дизайн» read agent-skills/check-design.md. ChatGPT entry: prompts/chatgpt-two-skills.md; multi-session state: systems/resumable-skill-run-contract.md. Existing one-publish and risk rules prevail. No false LIVE or design-parity success and no unverified background promises.
