# DECISIONS — ai-projects-brain

> Architecture decisions and guardrails for Project Brain itself.

## Purpose

`ai-projects-brain` is the dispatcher and public text memory layer for agents working across Andrey's projects.

## Dispatcher first

Agents should start from:

1. `START-HERE-FOR-AGENTS.md`
2. `projects/index.md`
3. `CURRENT-FOCUS.md` when project is ambiguous
4. selected project capsule

`projects.md`, `projects.json`, and `data/project-index.json` remain important inventories, but the dispatcher layer is the fastest entry path.

## Context Scout preflight

`/context-scout` is the shared read-only preflight for `/planner`, `/delivery`,
`/audit`, `/audit-fin`, and `/critic`. It produces a compact project-aware
`CONTEXT BUNDLE` before the owning workflow plans, edits, auto-fixes, or
critiques. The scout itself must not mutate files, issues, PRs, deployments,
archives, or data.

## Source separation

- Project memory lives here.
- Canonical code lives in target project repos.
- Live state must be verified via target live checks/endpoints.
- Secrets/env values never live here.

## Project capsule standard

Active projects should gradually follow `systems/project-capsule-standard.md`:

- `PROJECT.md`
- `STATE.md`
- `SYSTEM_MAP.md`
- `CODEX_BRIEF.md`
- `LOG.md`
- `CHECKS.md`
- `DECISIONS.md`

Do not require all files for old/secondary projects unless useful.

## Inventory consistency

When project inventory changes, keep consistent:

- `projects/index.md`
- `projects.md`
- `projects.json`
- `data/project-index.json`
- project capsule files

Run sync/validation scripts when possible.

## Main formula

**Project Brain is not a code repo substitute. It is a routing, memory, and decision layer that points agents to the right project, right repo, right checks, and right boundaries.**
