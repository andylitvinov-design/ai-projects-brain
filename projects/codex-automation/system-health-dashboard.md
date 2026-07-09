# Agent/Codex System Health Dashboard

Status: active dashboard with live public surface.
Last updated: 2026-07-09.
Update owners: Evening Architecture Review and Morning System Upgrade.

Live dashboard:

```txt
https://brain-management.pages.dev/system-health-dashboard/
```

Canonical dashboard source:

```txt
projects/codex-automation/system-health-dashboard.md
```

Machine-readable source mirror:

```txt
projects/codex-automation/system-health-dashboard.json
```

Live brain-management data mirror:

```txt
system-health-dashboard/data/current-system-health-dashboard.json
```

## Purpose

This dashboard tracks the health of Andrey's agent/Codex operating system as a daily management table.

Every Morning System Upgrade and Evening Architecture Review should update or reference this dashboard and include the live dashboard URL in the final report when repository access is available.

## Update rules

- Evening writes diagnosis: current score, yesterday score, change, evidence, what should be done tomorrow.
- Morning writes implementation result: what was done today, score after the applied upgrade, confidence, and what Evening must verify.
- Do not invent numbers. If evidence is missing, use `unknown` and create the next measurement action.
- Do not inflate `Provider/live readiness` from documentation-only changes. Provider/live readiness rises only from provider/live proof.
- Use confidence labels: `high`, `medium`, `low`, `unknown`.
- Keep the dashboard compact; detailed explanations belong in the Morning/Evening reports and ledgers.
- The GitHub markdown is the durable source-of-truth; the brain-management route is the live public dashboard surface.

## Current dashboard

| Metric / parameter | Today | Yesterday | Change | Confidence | What was done today | What to do tomorrow |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Provider/live readiness | unknown | unknown | unknown | unknown | No provider/product/live mutation was made; provider blockers remain routed to `psihotavr#168` and `finance#614`. | Evening: keep provider/live readiness blocked until provider/live proof exists; do not score from docs or CI workflow changes. |
| False success protection | 55/100 estimated | unknown | unknown | low | Validator now fails if the CI workflow stops capturing raw validator evidence artifacts; this reduces PR-prose-only false success risk. | Evening: verify whether reports now separate `CI workflow defined`, `artifact capture defined`, `raw CI logs fetched`, and `live behavior proven`. |
| Delivery completion quality | 55/100 estimated | unknown | unknown | low | Morning applied real harness/CI/validator/metrics/dashboard changes instead of report-only output. | Evening: verify the next workflow run actually produces the expected artifact and does not leave the task at code-only completion. |
| User pain repetition | 55/100 estimated | unknown | unknown | low | Continued the live-dashboard response path and added raw-evidence capture so reports can show actual changed files and evidence state. | Evening: check whether the report answered “what actually changed” with concrete commits, dashboard update, and validation evidence. |
| Loop closure | 65/100 estimated | unknown | unknown | low | Consumed the prior handoff’s top action and converted it into a CI evidence artifact contract plus dashboard update. | Evening: accept/correct the estimate after checking the latest workflow run and artifact availability. |
| Validation evidence | 60/100 estimated | unknown | unknown | medium | CI workflow now tees all four validator commands into log files and uploads `agent-harness-validation-evidence`; the prompt validator checks this contract. Local reconstructed `validate-agentic-prompts` and behavior fixture runner passed. | Evening: fetch GitHub Actions job/artifact logs for the latest main run; promote only if raw logs show all four validators passed. |
| Regression/replay coverage | 65/100 estimated | unknown | unknown | medium | Existing 6 prompt regressions, 5 replay cases, and 5 behavior fixtures remain covered; no new failure class required today. | Evening: keep behavior rules candidate until raw CI or live automation prevention evidence exists. |
| Rule lifecycle health | 55/100 estimated | unknown | unknown | low | No behavior rule was promoted from candidate; the structural CI-evidence artifact contract is now enforced by validator. | Evening: decide whether the artifact-capture guard can be considered structurally active only after a passing raw workflow log exists. |
| Automation noise / duplication | unknown | unknown | unknown | unknown | No new automation was created; existing Morning/Evening loop was reused. | Evening: continue checking live ChatGPT Automation prompt drift without creating duplicate scheduler loops. |
| Active project momentum | unknown | unknown | unknown | unknown | Product/provider work remains in exact tickets instead of unsafe Morning mutation. | Daily Improve/Evening: keep active projects moving through `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin` tickets with provider proof. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | 58/100 estimated across scored metrics |
| Scored metrics coverage | 6/10 |
| Strongest metric | Loop closure, because the top Evening handoff was consumed and implemented as a safe harness/CI change. |
| Weakest metric | Provider/live readiness remains unknown/blocked because no provider/live proof was produced. |
| Biggest improvement today | Raw validation evidence observability: CI now writes validator command output to artifact logs and the prompt validator protects that contract. |
| Main blocker | Full GitHub Actions/raw checkout logs are still not fetched and provider/live blockers remain open. |

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-09 | Morning System Upgrade | Added CI raw-evidence artifact capture to `.github/workflows/agent-harness-validators.yml`, tightened `scripts/validate-agentic-prompts.mjs` to require that artifact contract, updated learning metrics, and updated this dashboard. | Validation evidence moved from “workflow defined only” toward “artifact capture defined”; full raw CI pass is still pending Evening verification. |
| 2026-07-09 | Manual upgrade | Created live dashboard route in brain-management after Andrey requested that dashboard be a live link, not only GitHub markdown. | Morning/Evening must now update/link `https://brain-management.pages.dev/system-health-dashboard/`. |

## Expected report link format

Morning and Evening reports should include:

```txt
Dashboard: https://brain-management.pages.dev/system-health-dashboard/
```
