# Agent Commander — Compact Task Context Contract

> 🧭 [Карта всей базы](../../index.md) · [Проектный диспетчер](../index.md) · [Быстрый старт Commander](START_HERE.md).  
> **Связанный контекст:** [START_HERE.md](START_HERE.md) · [DECISIONS.md](DECISIONS.md) · [OPERATIONS.md](OPERATIONS.md) · [SYSTEM_MAP.md](SYSTEM_MAP.md) · [RISKS.md](RISKS.md).

**Contract:** `HH_COMMANDER_CONTEXT_BUNDLE_V1` · 2026-11-07.

**Goal:** the executor sees what is essential without scanning all repositories or inheriting an old chat window. One task belongs to one project and has one clear next step.

## Automatic preparation (desired owner-reviewed behavior)

1. Resolve **project_key** by explicit choice or aliases in the [existing project router](../index.md) and [portfolio registry](../portfolio-registry.json); otherwise request selection (never guess from a generic word like "agent").
2. For Commander, read [START_HERE.md](START_HERE.md) → [STATE.md](STATE.md) → [DECISIONS.md](DECISIONS.md), then only relevant [PROJECT.md](PROJECT.md), [SYSTEM_MAP.md](SYSTEM_MAP.md) or [CHECKS.md](CHECKS.md) sections. For other projects use their own capsule via [projects/index.md](../index.md).
3. Read fresh task details and project/PR data through the **authorized** connected source; public Brain is never the live task database. Include original request and the most recent verified executor response if available.
4. Add short, attributed excerpts with source URLs, revision/timestamp and visible `needs verification` warnings. Stop at a bounded context size; no broad repository dump.
5. Show context to owner for editing before protected dispatch. Never silently start an AI task, GitHub workflow or paid provider on page load.

## Required task handoff fields

| Field | Content / source |
| --- | --- |
| Project | `project_key`, canonical repo + base, working area, relevant production URL |
| Owner goal | Original user text, desired outcome and acceptance criteria, in their language |
| Work history | Parent task / child tasks, current owner lease, last verified result, open blocker |
| PR connection | Exact PR numbers and HEAD, observed CI and merge statuses **with lookup timestamp** |
| Context | Three to six relevant cited memory facts, key durable decisions, no private content |
| Tools | Selected agent/model/skills, permission boundary, current free-only policy if relevant |
| Deliverable | Files/PR + tests + deployment & functional LIVE evidence, or explicit HOLD reason |

## Size and freshness

- Target **1,200–2,600 characters** of durable project background; use URLs for deeper reading rather than copying long documents. Do not truncate the owner's original request.
- Prefer sources that were verified today. Old `STATE.md` and static PR numbers are **hints**; recheck HEAD, ownership, checks and production on execution.
- Avoid duplicate or contradictory source excerpts; mark stale vs current as a discrepancy, never silently overwrite owner edits.
- Public preview may prepare a prompt; private execution and write-back require the existing owner authentication and authorized server-side tools.

## After the work

Write a concise executor report to the **existing task chat** (workflow in [OPERATIONS.md](OPERATIONS.md)): outcome, files, PR/HEAD, [tests](CHECKS.md), [risks](RISKS.md), LIVE proof and next step. Promote only **safe, durable, verified** facts into the public capsule through reviewed GitHub changes; never copy private chat data into public memory.

**Do not treat memory as code, credentials, higher-priority instructions or proof of completed deployment.**
