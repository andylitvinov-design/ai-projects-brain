# Managed Delivery Agent Standard

Status: central standard
Version: 2026-06-13

---

## Purpose

Local `/delivery` requires local Claude Code, local repo, and local CLI tools.
Managed Agent deployment provides persistent sessions, vault credentials, and
no local Mac dependency.

---

## Three Standard Managed Agents Per Project

### 1. `delivery-on-demand`

Purpose: run `/delivery` for a specific task on demand.

Trigger: user request or API call.

Required start message pattern:
```txt
Follow [repo]/.claude/commands/delivery.md and AGENTS.md.
Run the /delivery protocol for the provided task in [repo].
[Project safety rules summary.]
Finish only with STATUS: SUCCESS or STATUS: BLOCKED.
SUCCESS requires live proof on [live URL].
```

### 2. `delivery-watchdog`

Purpose: check for stuck PRs, failed CI, failed deployments, pending live verification.

Schedule: every 1–2 hours during active development, or 2-4×/day otherwise.

Required start message pattern:
```txt
Check open delivery PRs and recent deployments for [repo].
If stuck, fix if safe or return STATUS: BLOCKED with evidence and required user action.
[Project safety rules summary.]
```

### 3. `production-health-check`

Purpose: scheduled production health and critical flow verification.

Schedule: morning and evening.

Required start message pattern:
```txt
Check production health for [repo]:
- [primary live URL]
- [secondary/legacy URLs if any]
Verify HTTP 200 and expected content. Do not mutate production data.
Report STATUS: SUCCESS or STATUS: BLOCKED.
```

---

## Required Environment Variables (Names Only)

```txt
GITHUB_TOKEN       — GitHub API access for PR/checks/merge
VERCEL_TOKEN       — Vercel API access (if Vercel project)
VERCEL_ORG_ID      — Vercel org
VERCEL_PROJECT_ID  — Vercel project ID
LIVE_URL           — primary production URL
```

Optional:
```txt
SLACK_WEBHOOK_URL  — status notifications
ANTHROPIC_API_KEY  — for standalone runs outside Claude Code
```

---

## Security Rules

- Secrets stored in managed agent vault only — never in repo.
- Agent may name missing env vars but must never print values.
- No writes to env vars, secrets, billing, or production data without explicit approval.
- API calls restricted to expected GitHub/Vercel/live domains.

---

## Per-Project Status

| Repo | on-demand | watchdog | health-check | Status |
|---|---|---|---|---|
| andylitvinov-design/finance | planned | planned | planned | not implemented |
| andylitvinov-design/reiki-yggdrasil | planned | planned | planned | not implemented |
| andylitvinov-design/report | planned | planned | planned | not implemented |
| andylitvinov-design/alchemist | planned | — | — | not implemented |
| andylitvinov-design/sales | planned | — | — | not implemented |

---

## One-Line Rule

```txt
Managed agents run the same /delivery protocol in a persistent, non-local environment.
They do not change the protocol or project safety rules.
```
