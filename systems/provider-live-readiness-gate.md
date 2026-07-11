# Provider / Live Readiness Gate

Last updated: 2026-07-04

Purpose: prevent false success when a feature depends on production providers, live deployment, auth, persistence, payments, finance data, or third-party configuration.

## Rule

Code merged is not enough when the result depends on a provider or live environment. Final status must stay `BLOCKED`, `PARTIAL`, or `NEEDS_VERIFICATION` until the run separately proves:

1. code path exists;
2. provider/env/config is present by non-secret name only;
3. required data/schema/storage/policy exists;
4. production deploy source is known;
5. live behavior is verified through the narrowest reliable check.

Never print secret values. Report env/config names only.

## Applies to

Use this gate for work touching or depending on:

- Supabase migrations, RLS, storage, auth providers, buckets, policies, or anon URL/key presence;
- Firebase/Auth fallback versus intended provider behavior;
- Google OAuth redirects, client IDs, callback URLs, or allowed origins;
- Vercel, Cloudflare, Netlify env, branch, deployment, alias, or source-commit mapping;
- Google Sheets, Binance, finance providers, provider balances, source records, and manual balance inputs;
- Telegram, SaleBot, PayPal, webhooks, payment flows, billing, or paid API cost controls;
- production persistence beyond localStorage, mock, demo, or fallback data;
- admin upload, cabinet/login, public content publishing, and provider-backed previews.

## Required report separation

Every provider-dependent report must separate these layers:

```txt
code path exists: yes/no/needs verification
provider configured: yes/no/needs verification
schema/storage/data present: yes/no/needs verification
live deployment source proven: yes/no/needs verification
live behavior verified: yes/no/needs verification
final status: SUCCESS / PARTIAL / BLOCKED / NEEDS_VERIFICATION
```

`SUCCESS` is allowed only when all required layers for the user-visible outcome are proven.

## Safe read-only checks first

Before changing anything, verify the source of truth:

1. canonical repo and branch;
2. live URL and deploy provider/project;
3. latest production deployment branch/commit when accessible;
4. provider/config presence by name only;
5. current failing user-visible layer.

If access is missing, stop and produce exact manual dashboard steps or an agent-ready ticket. Do not guess.

## Forbidden in analysis/upgrade modes

Do not mutate provider config, env values, production data, financial records, auth/payment settings, billing, or secrets from `/improve`, Morning System Upgrade, or Evening Architecture Review. Convert the work to `/delivery`, `/safe`, `/audit-ui`, or `/audit-fin` using `systems/to-delivery-tickets.md`.

## Prompt regression expectation

The regression `provider-dependent-feature-without-provider-proof` must block any prompt/report that claims `SUCCESS` from code merge alone when provider/live proof is missing.

## Dashboard publication trace

For dashboards require four non-interchangeable steps: `canonical_updated`, `mirror_synced`, `deploy_identified`, and `live_verified`. Automatic Git deployment additionally needs source commit and branch evidence. Older live timestamps are `STALE`; absent provider/browser proof is `NEEDS_VERIFICATION` or `BLOCKED`, never `SUCCESS`.
