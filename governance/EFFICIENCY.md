# AI System Efficiency

Last aggregated: `needs verification`

## Core dimensions

- Completion: tasks closed with evidence, PR, or clear no-change diagnosis.
- Context efficiency: initial files, total files, repeated reads, broad scans.
- Tool efficiency: unnecessary browser/MCP/tool calls and failed loops.
- Verification quality: exact checks run, skipped checks, live claims supported.
- Memory quality: current state updated without duplicating history.
- Automation health: successful runs, actionable findings, stale or duplicate loops.

## Weekly scorecard

| Metric | Current | Trend | Notes |
|---|---:|---|---|
| Important task closure rate | needs verification | — | Use task/PR sweep evidence. |
| Broad repo scans | needs verification | — | Lower is better unless justified. |
| Repeated unchanged reads | needs verification | — | Lower is better. |
| Skipped required verification | needs verification | — | Target zero. |
| Oversized final reports | needs verification | — | Track normal reports above policy budget. |
| Missing/stale project capsules | needs verification | — | Target zero for active projects. |
| Automation duplication | needs verification | — | Target zero unjustified overlaps. |

## Guardrail

Efficiency must never be improved by skipping auth, security, data-loss protection, tests, accessibility, or required production verification.
