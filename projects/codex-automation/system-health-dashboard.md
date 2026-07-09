# Agent/Codex System Health Dashboard

Status: active dashboard with live public surface.
Last updated: 2026-07-09 Evening Architecture Review.
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
| Provider/live readiness | unknown | unknown | unknown | unknown | Evening verified no provider/product/live mutation or provider/live proof. `psihotavr#168` and `finance#614` remain blockers. | Keep provider/live readiness blocked until provider/env/data/deploy/live behavior proof exists; do not score from docs, CI, or code merge alone. |
| False success protection | 55/100 estimated | unknown | unknown | low | Accepted Morning's structural improvement: workflow artifact-capture contract and validator protection reduce PR-prose-only success risk. | Morning: make raw validation evidence reproducible locally and in CI through one evidence-runner script; Evening should verify raw logs, not prose. |
| Delivery completion quality | 55/100 estimated | unknown | unknown | low | Accepted that Morning made real harness/CI/validator/dashboard/metrics file changes, but corrected completion status to still CI-evidence-pending. | Morning: close the evidence gap with raw logs or an exact blocked state; avoid code-only or dashboard-only completion. |
| User pain repetition | 55/100 estimated | unknown | unknown | low | Accepted that the live dashboard and concrete changed-file reporting address the repeated “what actually changed / where is live dashboard” pain. | Morning: keep reports concrete with dashboard link, changed files, validation state, and exact blockers. |
| Loop closure | 65/100 estimated | unknown | unknown | low | Accepted: prior Evening handoff was consumed and converted into a safe CI evidence-observability upgrade plus dashboard update. | Morning: consume tonight's handoff and produce either an applied evidence-runner upgrade or a proven no-safe-upgrade. |
| Validation evidence | 55/100 estimated | unknown | unknown | low | Corrected Morning's confidence from medium to low for full validation evidence: artifact capture is defined, but raw GitHub Actions artifact/job logs were not fetched and full checkout validation could not be run in this environment. | Morning: add/use a single local+CI evidence runner that writes the four validator logs, then run/fetch it; promote confidence only from raw output. |
| Regression/replay coverage | 65/100 estimated | unknown | unknown | medium | Accepted existing coverage: 6 prompt regressions, 5 failure replay cases, and 5 behavior fixtures are defined and mapped; no new failure class was observed today. | Keep behavior rules candidate until deterministic runner output from a checkout/CI or real automation-prevention evidence exists. |
| Rule lifecycle health | 55/100 estimated | unknown | unknown | low | No behavior rule promoted; this was correct because raw CI/live prevention evidence is still missing. Artifact-capture guard remains structural, not fully proven. | Revise the validation evidence ladder and promote only after raw logs prove the guardrail works. |
| Automation noise / duplication | 50/100 estimated | unknown | unknown | low | No new automation was created. Registry still has several scheduler states marked `needs verification`, so noise/drift risk remains. | Compare live ChatGPT Automation prompts against registry contracts when available; do not add duplicate schedulers. |
| Active project momentum | 50/100 estimated | unknown | unknown | low | Product/provider blockers are routed to exact tickets, but no provider/live project progress was proven today. | Keep Psihotavr and Finance moving through `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin` with provider/live proof requirements. |

## Overall health

| Field | Value |
| --- | --- |
| Overall score now | 56/100 estimated across scored metrics |
| Scored metrics coverage | 9/10 |
| Strongest metric | Loop closure and regression/replay coverage: the handoff loop functioned and existing replay/prompt coverage remains mapped. |
| Weakest metric | Provider/live readiness remains unknown/blocked because no provider/live proof was produced. |
| Biggest improvement today | False-success evidence ladder is clearer: artifact capture is defined, but raw validation output is still not available. |
| Main blocker | Raw GitHub Actions artifact/job logs are still unavailable, and provider/live blockers remain open. |

## Latest activity log

| Date | Cycle | Summary | Dashboard impact |
| --- | --- | --- | --- |
| 2026-07-09 | Evening Architecture Review | Verified Morning's deltas: accepted structural CI artifact-capture and loop-closure improvements, corrected full validation-evidence confidence down to low because raw CI/job logs were unavailable. | Dashboard now separates artifact-capture-defined from raw-validation-output-available and gives Morning one exact safe upgrade: unify local+CI evidence logging. |
| 2026-07-09 | Morning System Upgrade | Added CI raw-evidence artifact capture to `.github/workflows/agent-harness-validators.yml`, tightened `scripts/validate-agentic-prompts.mjs` to require that artifact contract, updated learning metrics, and updated this dashboard. | Validation evidence moved from “workflow defined only” toward “artifact capture defined”; full raw CI pass is still pending Evening verification. |
| 2026-07-09 | Manual upgrade | Created live dashboard route in brain-management after Andrey requested that dashboard be a live link, not only GitHub markdown. | Morning/Evening must now update/link `https://brain-management.pages.dev/system-health-dashboard/`. |

## Expected report link format

Morning and Evening reports should include:

```txt
Dashboard: https://brain-management.pages.dev/system-health-dashboard/
```
