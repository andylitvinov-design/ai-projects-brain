# Project State

## 1. Identity

- Name: ezohata-incoming-ledger
- Purpose: Web app for EzoHata incoming payments, expenses,
  fact data, balances, provider imports, and channel
  analytics.
- Live URL: https://ezohata-incoming-ledger.vercel.app
- Repo URL: https://github.com/andylitvinov-design/finance
- Hosting: Vercel project `ezohata-incoming-ledger`
- Production source: `andylitvinov-design/finance`

## 2. Current status

- Working: production source mapping points to `finance`
- Broken: movement total production issue needs deploy/source verification
- Unclear / needs verification: provider imports, Google
  OAuth, and current PR/deploy status

## 3. Important files

- `index.html`
- `config.js`
- `finance.js`
- `google-auth.js`
- `google-sheets.js`
- `sheet-config.json`
- `order-received-movement-overlay.js` when present in the active repo/branch
- `AGENTS.md` when present in the active repo/branch

## 4. Environment variables

Names only, no values:

- `EZOHATA_V2_APPS_SCRIPT_URL`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `WISE_API_TOKEN`
- `OPENAI_API_KEY`

## 5. Recent decisions

- Date: 2026-04-29 Decision: treat `finance` as the active
  production source Reason: old repo and legacy paths can
  mislead agents Risk: deploy/source confusion if legacy
  repo is used
- Date: 2026-05-11 Decision: production bugs must run
  Production Debug Preflight before patching Reason: a
  movement total bug was patched before proving production
  source of truth Risk: agents may patch correct code that is
  not deployed

## 6. Open issues

- Movement table `Итого BALANCE` mismatch: screenshot showed
  `-340.5000` while visible rows summed to `218.2244`.
  Primary next step is deploy/source verification.
- Provider and OAuth state need verification
- Legacy `reconcile-v2/` can still confuse agent routing

## 7. Next actions

- Verify current production health and open PR status
- Confirm live commit/branch before any formula/UI patch
- Confirm `sheet-config.json` and release version are
  aligned
- Run project checks before any PR
- Update `DEBUG_LOG.md`, `RISKS.md`, and `CHECKS.md` after
  each production incident/fix

## 8. Verification

- Commands: needs verification
- Manual checks: needs verification
- Last verified: needs verification

## 9. Agent rules for this project

- Do not: use legacy `reconcile-v2/` as the production
  source
- Do not: patch production formula/UI bugs before proving
  live deploy commit/branch and relevant PR status
- Always: work from `andylitvinov-design/finance`
- Always: apply `systems/production-debug-protocol.md` for
  live bugs
- Before PR: run tests, build, and release guard
