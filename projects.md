# Projects

Last inventory update: 2026-08-30.

This file mirrors the core records in `projects.json`. It lists public context only. Environment variables are names only, not values.

## Memory System

- `projects.md` = human-readable project map
- `projects.json` = machine-readable project database
- `data/project-index.json` = generated project memory index
- `projects/<slug>/PROJECT.md` = detailed per-project passport
- `projects/<slug>/SYSTEM_MAP.md` = flow/runtime/deploy map
- `projects/<slug>/DATA_SCHEMA.md` = data contracts and schema notes
- `systems/project-memory-schema.md` = shared memory schema
- `systems/project-memory-standard.md` = expanded memory standard
- `systems/codex-project-update-protocol.md` = Codex memory update protocol
- `systems/project-state-template.md` = current-state template
- `systems/project-log-template.md` = change log template
- `systems/codex-project-workflow.md` = Codex workflow

Canonical field mapping in this database:

- `name`
- `purpose`
- `url`
- `repo`
- `hosting`
- `status`
- `issues`
- `important files`
- `env`
- `notes`

## ezohata-incoming-ledger

- **project memory:** `projects/ezohata-incoming-ledger/PROJECT.md`

- **name:** ezohata-incoming-ledger
- **purpose:** Web app for EzoHata incoming payments, expenses, fact data, balances, provider imports, and channel analytics.
- **live URL:** https://ezohata-incoming-ledger.vercel.app
- **repo URL:** https://github.com/andylitvinov-design/finance
- **hosting:** Vercel project `ezohata-incoming-ledger`
- **current status:** Active production source is `andylitvinov-design/finance`. Old repo `andylitvinov-design/ezohata-incoming-ledger` is private/deprecated read-only according to GitHub metadata.
- **important files:** `index.html`, `config.js`, `finance.js`, `google-auth.js`, `google-sheets.js`, `sheet-config.json`, `api/paypal-transactions.js`, `api/wise-transactions.js`, `scripts/release-guard.sh`
- **env variables:** `EZOHATA_V2_APPS_SCRIPT_URL`, `EZOHATA_LEGACY_MANUAL_FINANCE_URL`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENVIRONMENT`, `PAYPAL_MCP_CLIENT_ID`, `PAYPAL_MCP_REFRESH_TOKEN`, `WISE_API_TOKEN`, `WISE_PROFILE_ID`, `WISE_API_BASE`, `OPENAI_API_KEY`, `OPENAI_EXPENSE_MODEL`
- **known issues:** Legacy `reconcile-v2/` and old repo can mislead agents into
  using the wrong production source. Provider imports depend on configured
  Vercel env variables. Older ledger behavior has sensitive rules around
  `Остатки`, `Расходы`, `СТАЛО`, `now`, transfers, and payout math.
- **recent tasks:** Finance repo PR #5 `Harden OCR fallback and document finance env`; old repo PR #13 `Restore full channel reconciliation table`.
- **next actions:** Verify open PR status before new production work. Keep release version and `sheet-config.json` aligned. Run `npm test`, `npm run build`, and `npm run release-guard` before PR.
- **risks:** Breaking Google Sheets OAuth, provider import routes, manual finance formulas, or Vercel deploy source.
- **rules for Codex:** Do not use legacy `reconcile-v2/` as production source. Use branch -> PR -> merge. Run test/build/release guard. Treat old repo as reference only unless explicitly asked.

## Agent-Auditor

- **project memory:** `projects/agent-auditor/PROJECT.md`

- **name:** Agent-Auditor
- **slug:** `agent-auditor`
- **purpose:** Data-based project auditor for detecting mismatches, anomalies, and regression risks across user projects.
- **live URL:** not applicable
- **repo URL:** needs verification
- **hosting:** not applicable / needs verification
- **current status:** design/instruction project
- **important files:** needs verification
- **env variables:** none
- **known issues:** Browser-based audits fail for private Google OAuth and Google Sheets data. Audit snapshot endpoint availability and exact contract need verification. Visual screenshots alone are insufficient for reliable finance audits.
- **recent tasks:** Defined Agent-Auditor as a Data Auditor that uses project memory, schemas, debug logs, safe audit snapshots, and sanitized user-provided exports.
- **next actions:** Verify whether a canonical repository exists. Verify the finance `/api/audit-snapshot` availability and response contract. Use `ezohata-incoming-ledger` as the first audit target.
- **risks:** Requesting or storing secrets, trying to bypass Google OAuth, claiming live provider sync when only code paths exist, confusing the production finance repo with old deprecated repos, or mutating data during an audit.
- **rules for Codex:** Read target project memory before auditing. Compare `DATA_SCHEMA` with the audit snapshot or sanitized user-provided export. Mark unknowns as `needs verification`. Never request or expose secrets. Do not log in to the target site as the audit method.
- **notes:** Does not store secrets. Does not bypass OAuth. Uses safe audit snapshots and project memory.

## psihotavr

- **project memory:** `projects/psihotavr/PROJECT.md`

- **name:** psihotavr
- **purpose:** Psihotavr Vite/React site for mandala catalog sales, AI-video hub, admin/content tools, Telegram-first order flow, and future customer cabinet/admin account features.
- **live URL:** https://psihotavr.vercel.app
- **repo URL:** https://github.com/andylitvinov-design/psihotavr
- **hosting:** Vercel project `psihotavr`
- **current status:** Active public Vite/React catalog/admin/cart site. Keep Google/Supabase cabinet and cart/orders RLS replacement work blocked until backend, auth, migration, and live RLS gates are verified.
- **important files:** `package.json`, `vercel.json`, `src/App.tsx`, `src/main.tsx`, `src/lib/mandalaServices.ts`, `src/pages/MandalaCatalogPage.tsx`, `src/pages/CartPage.tsx`, `src/pages/AdminMandalasPage.tsx`, `src/pages/AdminVideoFormPage.tsx`, `src/lib/aiVideoGeneration.ts`, `src/server/videoProviders/videoProviderService.ts`, `api/ai-videos/generate.ts`, `api/ai-videos/status.ts`
- **env variables:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAILS`, `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `GITHUB_TOKEN`, `ADMIN_TOKEN`, `HEYGEN_API_KEY`, `SYNTHESIA_API_KEY`, `D_ID_API_KEY`
- **known issues:** Supabase free active project limit blocks a dedicated backend for now. Auth experiments can confuse agents; verify the selected backend before editing auth code. Vercel Git auto-deploy/source can drift and needs live verification.
- **recent tasks:** Restored `/mandalas` grid behavior, added AI-video homepage/admin boundaries, normalized legacy image URLs, synced mini-mandala services/photos, and created blocked replacement auth/cart-orders PRs.
- **next actions:** Keep as a first-class active project in daily sweeps. Verify Vercel deployment source and browser behavior before live claims. Prefer the no-Supabase Telegram order flow until a backend is available.
- **risks:** Breaking the live catalog, admin, cart, AI-video hub, Excel-derived mandala services, image mappings, or leaking provider secrets.
- **rules for Codex:** Treat `main` as canonical unless repo/deploy metadata proves otherwise. Do not carry old branches wholesale. Do not merge auth/orders migrations without proven backend/auth/RLS gates. Do not commit secrets or env values.

## psitherapy

- **project memory:** `projects/psitherapy/PROJECT.md`

- **name:** psitherapy
- **purpose:** Psitherapy public site and funnel for psychological analysis, psychotherapy, homeopathy-oriented content, and consultation offers.
- **live URL:** https://psitherapy.vercel.app
- **repo URL:** needs verification
- **hosting:** Vercel project `psitherapy`
- **current status:** Active live Vercel site. Treat as a first-class active project for audits and planning, but keep code changes blocked until repository mapping is verified.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** Repository mapping ambiguity can route agents to the wrong repo. Live-only UX checks cannot prove source code or deploy branch. Health, psychotherapy, and homeopathy wording needs careful safety framing.
- **recent tasks:** Added to `/improve` daily target list as an active Psitherapy/homeopathy UX surface. Repo search did not confirm a canonical repository.
- **next actions:** Resolve canonical repo mapping through Vercel project metadata, GitHub installed repositories, or explicit user confirmation. Add repo/deploy/env/file details after source mapping is confirmed.
- **risks:** Editing an unrelated repo, making unsafe medical or homeopathy claims, claiming implementation without source/deploy mapping, or confusing Psitherapy with Reiki Yggdrasil or Psihotavr backend/auth work.
- **rules for Codex:** Mark repo/deploy/source facts as `needs verification` until proven. Do not edit product code until the canonical repo is confirmed. Use the live URL for public UX audit only.

## reiki-yggdrasil

- **project memory:** `projects/reiki-yggdrasil/PROJECT.md`

- **name:** reiki-yggdrasil
- **purpose:** Reiki Yggdrasil Vite/React platform with public learning UI, master cabinet, public masters catalog, and admin moderation.
- **live URL:** https://reiki-yggdrasil.vercel.app
- **repo URL:** https://github.com/andylitvinov-design/reiki-yggdrasil
- **hosting:** Vercel, Vite build
- **current status:** Public Vite/Supabase MVP with `/`, `/profile`, `/masters`, and `/profile/admin`.
- **important files:** `src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/pages/ProfilePage.jsx`, `src/pages/MastersPage.jsx`, `src/pages/AdminPage.jsx`, `src/lib/supabaseClient.js`, `supabase/migrations/20260428_master_cabinet_mvp.sql`, `vercel.json`
- **env variables:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAIL`
- **known issues:** Supabase credentials and seeded data require live verification. Vercel GitHub App access can block import/deploy visibility. Layout changes can accidentally collapse the accepted three-column desktop structure.
- **recent tasks:** Added `/profile`, `/masters`, `/profile/admin`, Supabase schema/seed, RU-first i18n-ready structure, and route-based app split.
- **next actions:** Verify Supabase env values and live auth/profile flow before claiming end-to-end completion.
- **risks:** Breaking existing home page, RU default interface, route rewrites, Supabase auth/data flows, or the three-column layout.
- **rules for Codex:** Preserve the existing home page. Keep RU default. Prefer additive route/module changes. Do not collapse the accepted three-column layout without explicit reason.

## brain-management

- **project memory:** `projects/brain-management/PROJECT.md`

- **name:** brain-management
- **purpose:** Operational management control plane for current metrics, immutable daily snapshots, automation assignments, delivery chains, Trends, projects, and the installable web/PWA client.
- **live URL:** https://brain-management.vercel.app
- **repo URL:** https://github.com/andylitvinov-design/brain-management
- **hosting:** Vercel team `super10`, project `brain-management`
- **current status:** Canonical production boundary is `main` on Vercel at https://brain-management.vercel.app. Current API behavior may be readable while terminal deployment/source attribution remains unresolved; Cloudflare Pages, Netlify, separate-mobile, preview, and deployment-specific URLs are historical or diagnostic only.
- **important files:** `SAFE.md`, `index.html`, `app.js`, `styles.css`, `agent-productivity-ui.js`, `metrics-goals.js`, `dashboard-enhancements.js`, `manifest.webmanifest`, `sw.js`, `mobile-contract.json`, operational API files, `lib/history.js`
- **env variables:** `MOBILE_LAUNCH_KEY`, `STATUS_CALLBACK_SECRET`, `MOBILE_RUNS`, `GH_REPO_OWNER`, `GH_REPO_NAME`, `GH_WORKFLOW_FILE`, `GH_WORKFLOW_REF`, `GH_WORKFLOW_PAT`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_AUTH_SESSION_SECRET`, `GOOGLE_AUTH_ALLOWED_EMAILS`, `GOOGLE_AUTH_ALLOWED_DOMAIN`
- **known issues:** Provider/live readiness remains owner-session gated for protected finance journeys. Public business-KPI coverage excludes unverified or collector-error targets. Legacy Brain origins may contain stale historical snapshots and must not be treated as canonical production.
- **recent tasks:** Canonical Vercel production and its five operational JSON APIs were behaviorally verified, but terminal deployment/source attribution remains unresolved; dashboard control-plane evidence continuity and canonical priority routing were repaired on 2026-08-30.
- **next actions:** Keep the current Vercel live contract stable, preserve honest daily snapshots, prove matching source SHA, deployment ID, and delayed continuity before claiming terminal `LIVE_VERIFIED`, and verify protected provider journeys only with an authorized owner session.
- **risks:** Reporting legacy Cloudflare data as current, mixing sibling repositories into the management boundary, exceeding the Vercel function budget, or claiming provider readiness without owner-session proof.
- **rules for Codex:** Use one repository, `main`, Vercel project `brain-management`, and `https://brain-management.vercel.app` as the canonical production boundary. Verify JSON body/content type, not HTTP status alone. Treat `brain-management.pages.dev` as legacy/diagnostic only.

## codex-links

- **project memory:** `projects/codex-links/PROJECT.md`

- **name:** codex-links
- **purpose:** Cloudflare Pages inbox, delivery timeline, reports surface, Slack-backed Codex Cloud command bridge, and `codex-save` diagnostics/remediation app.
- **live URL:** https://codex-links.pages.dev
- **repo URL:** https://github.com/andylitvinov-design/codex-links
- **hosting:** Cloudflare Pages projects `codex-links` and related `codex-save`
- **current status:** Public repo. Production command delivery is primarily Slack-backed Codex Cloud with local bridge/direct OpenAI paths as secondary or optional modes.
- **important files:** `functions/api/commands.js`, `functions/api/delivery.js`, `functions/api/reports.js`, `functions/_lib/dispatch.js`, `functions/_lib/reports.js`, `public/app.js`, `public/version.json`, `wrangler.toml/jsonc`, `codex-save/`
- **env variables:** `LINKS_WRITE_TOKEN`, `ADMIN_TOKEN`, `COMMAND_DISPATCH_MODE`, `OPENAI_API_KEY`, `CLOUD_BRIDGE_BASE_URL`, `CLOUD_BRIDGE_SHARED_SECRET`, `SLACK_BOT_TOKEN`, `SLACK_CODEX_DISPATCH_TOKEN`, `SLACK_SIGNING_SECRET`, `SLACK_CODEX_CHANNEL_ID`, `SLACK_CODEX_USER_ID`, `SLACK_CODEX_MENTION`
- **known issues:** Cloud delivery can be fixed in repo while external worker/account linkage remains blocked. Release deploys require version triplet alignment. DNS/network reachability can block report verification.
- **recent tasks:** Open PRs #148 `fix: pass Slack url_private_download into Codex Cloud photo prompt` and #137 `Restore GitHub auto-sync push`.
- **next actions:** Verify open PR status before new work. Confirm live Cloudflare behavior after production-facing changes.
- **risks:** Breaking command lifecycle, Slack delivery, report rendering, Cloudflare KV contracts, or `codex-save` diagnostics.
- **rules for Codex:** Keep `public/version.json`, `public/index.html`, and `public/app.js` build version aligned. Distinguish cloud plumbing from worker/account linkage. Verify live behavior when production-facing.

## codex-links-myportal

- **project memory:** `projects/codex-links-myportal/PROJECT.md`

- **name:** codex-links-myportal
- **purpose:** Clean-room Cloudflare Pages inbox and finance sync app with PayPal, Plaid, Wise, and Binance provider ingestion.
- **live URL:** https://codex-links-myportal.pages.dev
- **repo URL:** unknown
- **hosting:** Cloudflare Pages project `codex-links-myportal`
- **current status:** Local checkout has no remote configured and is dirty. Cloudflare Pages app has token-gated `/api/finance/sync` and finance import helpers.
- **important files:** `functions/api/finance/sync.js`, `functions/api/finance/plaid.js`, `functions/_lib/finance.js`, `functions/_lib/security.js`, `public/finance-import.html`, `public/td-easyweb-import.html`, `wrangler.jsonc`
- **env variables:** `LINKS_EXECUTOR_TOKEN`, `FINANCE_CONNECT_TOKEN`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_API_BASE`, `PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_API_BASE`, `WISE_API_TOKEN`, `WISE_PROFILE_ID`, `WISE_API_BASE`, `BINANCE_API_KEY`, `BINANCE_SECRET_KEY`, `BINANCE_API_BASE`
- **known issues:** Repo remote mapping needs verification. Dirty local checkout should not be touched for unrelated repo creation. Provider code path is not the same as live credential verification. Binance history has API window limits.
- **recent tasks:** Added PayPal, Wise balances/statements, Binance, Plaid/TD import helpers, and `/api/finance/sync` provider selection.
- **next actions:** Establish canonical remote or mark as local-only. Verify live Cloudflare secrets before claiming provider sync works.
- **risks:** Leaking finance secrets, overwriting dirty local changes, confusing configured code with live provider access.
- **rules for Codex:** Do not touch the dirty `myportal` checkout for unrelated tasks. Use temp clone/workdir. Store only env names, never values.

## ezohata_ads

- **project memory:** `projects/ezohata_ads/PROJECT.md`

- **name:** ezohata_ads
- **purpose:** Standalone EzoHata ads and analytics bundle.
- **live URL:** unknown
- **repo URL:** https://github.com/andylitvinov-design/ezohata_ads
- **hosting:** needs verification
- **current status:** Private related repo from GitHub inventory.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** needs verification
- **recent tasks:** Skill installation and ads/analytics setup context exists in local memory.
- **next actions:** Inspect repo README, AGENTS, deploy config, and current hosting before agent work.
- **risks:** Analytics/ads credentials and external account access are likely sensitive.
- **rules for Codex:** Do not infer credentials. Verify exact provider setup and repo-local rules first.

## codex-daily-backups

- **project memory:** `projects/codex-daily-backups/PROJECT.md`

- **name:** codex-daily-backups
- **purpose:** Daily backup repository for changed eligible projects.
- **live URL:** not applicable
- **repo URL:** https://github.com/andylitvinov-design/codex-daily-backups
- **hosting:** GitHub repository
- **current status:** Private backup repo from GitHub inventory.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** Sensitive projects may be encrypted-only or skipped from plaintext backups.
- **recent tasks:** Recent-upgrades backup automation saved selected project snapshots and reported preservation status.
- **next actions:** Inspect backup automation before relying on backup coverage.
- **risks:** Accidentally exposing private/sensitive data.
- **rules for Codex:** Treat as sensitive backup infrastructure. Do not publish backup contents.

## active-projects-ops

- **project memory:** `projects/active-projects-ops/PROJECT.md`

- **name:** active-projects-ops
- **purpose:** Cloud-ready ops and content projects.
- **live URL:** unknown
- **repo URL:** https://github.com/andylitvinov-design/active-projects-ops
- **hosting:** needs verification
- **current status:** Private related repo from GitHub inventory.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** Shared repo, not necessarily one project per root.
- **recent tasks:** needs verification
- **next actions:** Inspect repo boundary and subproject mapping before changes.
- **risks:** Mixing independent project contexts.
- **rules for Codex:** Do not assume one repo equals one product. Read repo-local `AGENTS.md` and subproject docs first.

## report

- **project memory:** `projects/report/PROJECT.md`

- **name:** report
- **purpose:** Report-related project.
- **live URL:** unknown
- **repo URL:** https://github.com/andylitvinov-design/report
- **hosting:** needs verification
- **current status:** Public related repo from GitHub inventory.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** needs verification
- **recent tasks:** needs verification
- **next actions:** Inspect README, deploy config, and live URL.
- **risks:** Unknown until repo inspection.
- **rules for Codex:** Mark uncertain assumptions as `needs verification`.

## artefacts

- **project memory:** `projects/artefacts/PROJECT.md`

- **name:** artefacts
- **purpose:** Artefacts marketplace MVP.
- **live URL:** unknown
- **repo URL:** https://github.com/andylitvinov-design/artefacts
- **hosting:** needs verification
- **current status:** Private related repo from GitHub inventory.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** needs verification
- **recent tasks:** needs verification
- **next actions:** Inspect repo-local README, STATE, AGENTS, and deploy config before changes.
- **risks:** Unknown private project context.
- **rules for Codex:** Do not apply patterns from `links` or `ezohata` without checking this repo.

## council

- **project memory:** `projects/council/PROJECT.md`

- **name:** council
- **purpose:** SIA Council local MVP app.
- **live URL:** unknown
- **repo URL:** https://github.com/andylitvinov-design/council
- **hosting:** needs verification
- **current status:** Private related repo from GitHub inventory.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** needs verification
- **recent tasks:** needs verification
- **next actions:** Inspect repo and hosting metadata.
- **risks:** Unknown until repo inspection.
- **rules for Codex:** Verify local app assumptions before implementation.

## psitrends

- **project memory:** `projects/psitrends/PROJECT.md`

- **name:** psitrends
- **purpose:** PsiTrends project.
- **live URL:** https://psitrends.pages.dev
- **repo URL:** https://github.com/andylitvinov-design/psitrends-work
- **hosting:** Cloudflare Pages project `psitrends`
- **current status:** Private related repo and Cloudflare Pages project from inventory; mapping needs verification.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** Repo-to-hosting mapping is inferred from names and needs verification.
- **recent tasks:** needs verification
- **next actions:** Inspect repo and Cloudflare deployment source.
- **risks:** Incorrect repo/live URL mapping.
- **rules for Codex:** Treat mapping as `needs verification` until confirmed.

## ezohata-save

- **project memory:** `projects/ezohata-save/PROJECT.md`

- **name:** ezohata-save
- **purpose:** EzoHata save/diagnostics project.
- **live URL:** https://ezohata-save.pages.dev
- **repo URL:** unknown
- **hosting:** Cloudflare Pages project `ezohata-save`
- **current status:** Cloudflare Pages project found in inventory; repo mapping needs verification.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** needs verification
- **recent tasks:** EzoHata deterministic diagnosis/remediation context exists in local memory.
- **next actions:** Map Cloudflare project to repo and inspect deployment source.
- **risks:** Misrouting remediation commands or confusing with `codex-save`.
- **rules for Codex:** Verify target app and command surface before making changes.

## codex-save

- **project memory:** `projects/codex-save/PROJECT.md`

- **name:** codex-save
- **purpose:** Operator-facing diagnostics/remediation site for `codex-links`.
- **live URL:** https://codex-save-cjb.pages.dev
- **repo URL:** https://github.com/andylitvinov-design/codex-links
- **hosting:** Cloudflare Pages project `codex-save`
- **current status:** Related subproject under `codex-links/codex-save`.
- **important files:** `codex-save/README.md`, `codex-save/package.json`, `codex-save/public/`
- **env variables:** `SAVE_STORE`, `LINKS_WRITE_TOKEN`, `ADMIN_TOKEN`
- **known issues:** Remediation creates real `codex-links` agent commands; it does not push directly to `main`.
- **recent tasks:** Diagnostics and remediation UX added to `codex-links`.
- **next actions:** Verify live project and KV binding before changing remediation flows.
- **risks:** Triggering real commands unintentionally.
- **rules for Codex:** Treat as operational tooling for `codex-links`; verify command side effects.

## ezohata-dashboard

- **project memory:** `projects/ezohata-dashboard/PROJECT.md`

- **name:** ezohata-dashboard
- **purpose:** EzoHata dashboard Cloudflare Pages project.
- **live URL:** https://ezohata-dashboard.pages.dev
- **repo URL:** unknown
- **hosting:** Cloudflare Pages project `ezohata-dashboard`
- **current status:** Cloudflare Pages project found in inventory; repo mapping needs verification.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** May be separate from current `finance`/Vercel incoming ledger production.
- **recent tasks:** needs verification
- **next actions:** Verify whether this is legacy dashboard, active dashboard, or archived target.
- **risks:** Confusing Cloudflare dashboard with Vercel incoming ledger.
- **rules for Codex:** Do not deploy here unless target is explicitly confirmed.

## sales-bwa-photo

- **project memory:** `projects/sales-bwa-photo/PROJECT.md`

- **name:** sales-bwa-photo
- **purpose:** Sales/BWA photo Cloudflare Pages project.
- **live URL:** https://sales-bwa-photo.pages.dev
- **repo URL:** unknown
- **hosting:** Cloudflare Pages project `sales-bwa-photo`
- **current status:** Cloudflare Pages project found in inventory; repo mapping needs verification.
- **important files:** needs verification
- **env variables:** needs verification
- **known issues:** needs verification
- **recent tasks:** needs verification
- **next actions:** Map project to repo before changes.
- **risks:** Unknown project boundary.
- **rules for Codex:** Verify repo and deployment source first.

## shamanic-academy-youtube

- **project memory:** `projects/shamanic-academy-youtube/PROJECT.md`

- **name:** shamanic-academy-youtube
- **purpose:** Public knowledge base for videos, meditations, shorts, practices, and course-like material from YouTube channel Академия Древних Культур (@shamanic_academy).
- **live URL:** https://www.youtube.com/@shamanic_academy
- **repo URL:** https://github.com/andylitvinov-design/ai-projects-brain
- **hosting:** GitHub raw text / public YouTube source data
- **current status:** Initial public index collected on 2026-05-13: 105 public entries (94 videos, 11 shorts), 102 with per-video metadata, 3 needing verification.
- **important files:** `projects/shamanic-academy-youtube/VIDEO_INDEX.md`, `projects/shamanic-academy-youtube/MEDITATIONS.md`, `projects/shamanic-academy-youtube/HIGHLIGHTS.md`, `projects/shamanic-academy-youtube/videos.json`
- **env variables:** none
- **known issues:** RSS is incomplete; some public tab entries lack per-video metadata; classification is rule-based and needs editorial review.
- **recent tasks:** Created initial public YouTube video and meditation index on 2026-05-13.
- **next actions:** Review high-priority meditations/practices; map confirmed assets to Reiki Yggdrasil, Artefacts, or future courses; refresh public metadata when YouTube changes.
- **risks:** Storing login-only YouTube data, treating derived classification as confirmed taxonomy, or using unavailable videos as confirmed public assets.
- **rules for Codex:** Use public YouTube data only. Do not store cookies, OAuth tokens, YouTube Studio data, or private data. Mark uncertain metadata as `needs verification`.
