# Daily Improve Memory

Persistent memory for the Daily Improve strategic loop.

## Purpose

Each Daily Improve run must read this file before forming conclusions and update it after the analysis when GitHub write access is available. The next run should compare new evidence with the previous state instead of rediscovering the same findings from scratch.

## Update rules

- Keep only durable cross-project observations, active blockers, strategic decisions, and the single next improvement prompt.
- Never store secret values, provider payloads, financial records, or personal data.
- Use evidence states: `PROVEN`, `NEEDS_VERIFICATION`, `BLOCKED`, `RESOLVED`, `SUPERSEDED`.
- If evidence has not changed, preserve the previous conclusion and say `UNCHANGED`; do not present it as a new discovery.
- When a finding changes, record the old state, new state, evidence, and consequence.
- Mark resolved or superseded items instead of silently deleting them.
- Keep the current map compact. Retain only a short dated history below it.

## Current Key Change Map

| Priority | Finding | Status | Evidence / reason | Next route |
|---:|---|---|---|---|
| 1 | Project routing can drift behind current production truth. | NEEDS_VERIFICATION | Finance now has both new `ezohata-finance` and legacy `finance`; repo/live/hosting targets must always be named explicitly. | `/upgrade` |
| 2 | Provider/live readiness is separate from code and PR readiness. | PROVEN | Auth, payments, storage, finance providers, deploy source, and production persistence require live proof. | `/safe` |
| 3 | The newest provider deployment is not automatically the production deployment. | PROVEN | Preview, target-less, CLI, or similarly named projects can be newer than the deployment serving the production domain. | `/upgrade` |
| 4 | Psihotavr default-state verification remains a durable regression class. | NEEDS_VERIFICATION | Clean session, legacy localStorage, clicked state, and live source must be checked independently. | `/audit-ui` |
| 5 | Daily Improve must end with one decision map and one next prompt. | PROVEN | Broad portfolio context is useful only when it produces a ranked change map and a single actionable next run. | `/improve` |

## Current strategic decisions

- Treat `andylitvinov-design/ezohata-finance` as the new finance production project and `andylitvinov-design/finance` as a separate live legacy/reference system until a formal transition plan says otherwise.
- Treat `andylitvinov-design/report` as the canonical Psitherapy repo; do not confuse it with the separate Vercel project `reports`.
- Treat `https://brain-management.netlify.app` as the current Brain Management production surface; Cloudflare is legacy unless current provider evidence changes this.
- Do not call provider-dependent work successful from merged code or a READY preview alone.

## Current single next improvement

`/upgrade` the portfolio routing and persistent-analysis contract so every Daily Improve reads this file, compares deltas, updates it, and writes one exact next prompt into the Morning handoff.

## History

### 2026-07-13

- Created persistent Daily Improve memory.
- Seeded durable findings from recent portfolio sweeps.
- Next runs must report `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED` for each major conclusion.
