# ezohata-incoming-ledger

## 1. Purpose
Web app for EzoHata incoming payments, expenses, fact data, balances, provider imports, and channel analytics.

## 2. Live URLs
- production: https://ezohata-incoming-ledger.vercel.app
- preview: needs verification
- admin: needs verification
- needs verification: preview/admin mappings and any secondary live URLs need verification.

## 3. Repositories
- canonical repo: https://github.com/andylitvinov-design/finance
- deprecated repo: needs verification
- related repos: needs verification
- needs verification: repo relationships beyond the listed inventory need verification.

## 4. Hosting / Deploy
- provider: Vercel
- project name: Vercel project ezohata-incoming-ledger
- deploy source: needs verification
- branch: needs verification
- deploy rules: needs verification

## 5. Current Status
Active production source is andylitvinov-design/finance. Old repo andylitvinov-design/ezohata-incoming-ledger is private/deprecated read-only according to GitHub metadata.

## 6. Important Files
- index.html
- config.js
- finance.js
- google-auth.js
- google-sheets.js
- sheet-config.json
- api/paypal-transactions.js
- api/wise-transactions.js
- scripts/release-guard.sh

## 7. Environment Variable Names
Only names are listed. Values must never be stored here.

- EZOHATA_V2_APPS_SCRIPT_URL
- EZOHATA_LEGACY_MANUAL_FINANCE_URL
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- PAYPAL_ENVIRONMENT
- PAYPAL_MCP_CLIENT_ID
- PAYPAL_MCP_REFRESH_TOKEN
- WISE_API_TOKEN
- WISE_PROFILE_ID
- WISE_API_BASE
- OPENAI_API_KEY
- OPENAI_EXPENSE_MODEL

## 8. Known Issues
- Legacy reconcile-v2/ and old repo can mislead agents into using the wrong production source.
- Provider imports depend on configured Vercel env variables.
- Older ledger behavior has sensitive rules around Остатки, Расходы, СТАЛО, now, transfers, and payout math.

## 9. Recent Tasks
- Finance repo PR #5 Harden OCR fallback and document finance env.
- Old repo PR #13 Restore full channel reconciliation table.

## 10. Next Actions
- Verify open PR status before new production work.
- Keep release version and sheet-config.json aligned.
- Run npm test, npm run build, and npm run release-guard before PR.

## 11. Risks
- Breaking Google Sheets OAuth.
- Breaking provider import routes.
- Breaking manual finance formulas.
- Using the wrong Vercel deploy source.

## 12. Rules for Codex
- Do not use legacy reconcile-v2/ as production source.
- Use branch -> PR -> merge.
- Run test/build/release guard.
- Treat old repo as reference only unless explicitly asked.

## 13. Verification Status
- repo mapping: listed in inventory; current source still needs verification before production work
- live mapping: listed in inventory; live behavior needs verification before claims
- env status: names only; values and completeness need verification
- deploy status: hosting listed; deploy source needs verification
- data flow: needs verification
- needs verification: unconfirmed repo, live, deploy, env, and data-flow details.
