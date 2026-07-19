# Sales Audit Automation Contract

Last updated: 2026-07-19

## Canonical mode

- `/audit-sales` is the only canonical sales/conversion audit mode.
- `/audit-sale` is a deprecated compatibility alias that routes to `/audit-sales`.
- The alias must never own a second scorecard, memory file, validator contract, regression set, replay fixture, or automation.

## Sales Audit Intelligence

Role: weekly evidence-backed maintenance of the `/audit-sales` framework.

Must:

- read `systems/audit-sales.md`, `systems/audit-sales-markers.md`, `projects/codex-automation/audit-sales-memory.md`, project inventory, provider/live gate, and relevant harness validation files;
- research 4–7 credible current sources, including W3C/WCAG or web.dev, established UX/CRO evidence, and current analytics/platform guidance when relevant;
- apply at most three durable marker or temporary candidate changes;
- keep the score total at 100;
- give every accepted marker a concrete `PASS` / `WATCH` / `FAIL` / `NOT_TESTED` contract;
- record accepted/rejected candidates and rationale in memory;
- add regression/replay/fixture coverage for every new durable failure class;
- open or refresh a docs/harness-only PR in `andylitvinov-design/ai-projects-brain`;
- run Markdown/JSON, audit-sales, agentic-prompt, behavior replay, context-scout, project-brain, and available harness validators.

Must not:

- audit or modify product sites in the intelligence run;
- change product code, deploy/provider/config/data, auth/payment settings, secrets, or analytics payloads;
- invent claims, testimonials, metrics, scarcity, urgency, or conversion uplift;
- create an `/audit-sale` automation or any alias-owned artifact.

## Portfolio Sales Audit

Role: use the canonical `/audit-sales` scorecard to compare active public sites and produce one bounded Codex prompt per site.

Must:

- read the same canonical scorecard and persistent memory;
- preserve prior strengths and compare findings as `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED`;
- separate screenshot, browser behavior, accessibility, performance, analytics, and provider/live evidence;
- mark unavailable behavior `NOT_TESTED`;
- update only the single `audit-sales-memory.md` file.

Must not:

- perform framework research or marker maintenance during the portfolio run;
- modify product code, provider state, production data, secrets, or deploy configuration;
- route to or maintain `/audit-sale` as a separate mode.
