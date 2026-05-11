# Production Debug Protocol

This protocol is mandatory for agents debugging production, live UI, runtime API, provider, balance, finance, or deployment issues.

## Purpose

Prevent agents from patching the wrong layer, stale code, or a branch that is not serving production.

The first failure to prove is always the production source of truth.

## Mandatory preflight before patching

Before changing code for any live issue, prove and report:

1. Live URL.
2. Endpoint/method/status/content-type/body excerpt when an API is involved.
3. `/api/status` or equivalent health endpoint.
4. Production deploy id, commit SHA, and branch/ref from hosting provider.
5. Canonical repo and default branch HEAD.
6. Relevant open PRs touching the suspected layer.
7. Whether the intended fix is already open, merged, deployed, or absent.

If live production does not contain the intended fix, classify the issue as `deploy/source-of-truth mismatch` before patching formulas or UI logic.

## Failing layer chain

Prove the first failing layer in this order:

`UI -> API route -> provider/import -> normalization -> ledger save -> balance -> analytics -> deploy/source-of-truth`

For deploy-sensitive production bugs, check deploy/source-of-truth before the chain and again after the fix.

For each problem report:

- failing layer;
- evidence for;
- evidence against;
- confidence: high / medium / low;
- exact file/function/pattern when known;
- live verification command or browser-state check;
- `needs verification` where evidence is incomplete.

## Stop rules

Stop and do not patch business logic when:

- production is not serving the branch/commit being inspected;
- the relevant PR is open but not merged/deployed;
- live response differs from repo source;
- endpoint method is wrong for the route, e.g. GET 405 on a POST-only route;
- data source is stale or private and cannot be verified.

In these cases, first resolve the source mismatch or write a verification plan.

## Provider and JSON errors

For errors like `Unexpected token ... is not valid JSON`, check first:

- `JSON.parse(...)`;
- `response.json()`;
- SSE/MCP/tool text parsing;
- provider HTML/plain text/auth errors;
- Vercel/platform text errors.

Provider non-JSON errors must be normalized to structured JSON:

```json
{ "ok": false, "error": "provider + status + short excerpt" }
```

Do not expose raw HTML, raw SyntaxError, secrets, tokens, or provider credentials.

## Finance and balance invariants

For finance apps:

- balance is a critical invariant;
- balance should use the documented source of truth, usually `amount_net` or the explicit manual balance table;
- valid rows must not be excluded from balance only because `source=unknown`;
- do not change gross/net/fee/source semantics to fix a UI display bug;
- separate runtime/UI fix from migration/backfill;
- add regression tests using the exact failing fixture.

## Memory update loop

After every meaningful production bug or fix, update the relevant project memory:

- `DEBUG_LOG.md`: symptom, evidence, root cause, fix, verification, remaining risk.
- `RISKS.md`: new risk or strengthened guardrail.
- `CHECKS.md`: new command, endpoint, or manual verification step.
- `STATE.md`: current status and next action if the project state changed.
- `LOG.md`: short chronological entry when present.
- `DECISIONS.md`: architecture choice that should not be re-litigated.

Do not store real secrets, tokens, cookies, private keys, refresh tokens, or raw private payloads.

## Required output format for production bugs

1. Brief understanding.
2. Root cause / failing layer.
3. Problem table.
4. What to fix first.
5. Where to look in code.
6. Minimal safe fix.
7. Data migration / backfill.
8. Regression tests.
9. Definition of Done.
10. Codex/Claude prompt.
11. Memory updates required.

## Golden rule

First prove the failing layer before patching. First prove production source of truth before debugging live formulas.
