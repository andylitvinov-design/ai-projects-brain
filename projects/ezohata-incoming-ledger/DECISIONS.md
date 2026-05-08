# DECISIONS — ezohata-incoming-ledger

> Architecture decisions and guardrails that should not be re-litigated without explicit reason.

## Canonical source

- Canonical production code source is `andylitvinov-design/finance`.
- Old `andylitvinov-design/ezohata-incoming-ledger` repo is deprecated/read-only unless explicitly requested.

## Source of truth

- Ledger is the source of truth for analytics/balances where the v2 contract is available.
- Google Sheets manual inputs remain important, but calculations should use normalized ledger rows where applicable.

## Audit endpoint

- `/api/audit-snapshot` is the preferred data source for audits.
- Do not rely only on UI screenshots when audit snapshot exists.
- Browser login / Google OAuth should not be required for agent audit.

## Amount semantics

- Use `amount_net` for ledger calculations when present.
- Missing `amount_net` should be treated as a data/contract issue, not silently ignored.
- PayPal gross/net/fee semantics must remain explicit.

## Provider imports

- PayPal, Wise, and other provider imports depend on configured production env variables and provider permissions.
- Code path present does not equal live provider access verified.

## Deployment

- Production deploy must match the intended repo/project/commit.
- Verify `/api/status` after production-facing changes.
- Distinguish preview, production, and stale aliases.

## Prohibited shortcuts

- Do not change env/secrets.
- Do not infer production from local code alone.
- Do not rewrite ledger schema without checking contract docs.
- Do not collapse plan/fact/date-range semantics into all-time totals.

## Main formula

**Ledger correctness > UI appearance. Audit snapshot > screenshot-only audit. Canonical repo > legacy repo. Explicit net/gross/fee > silent fallback.**
