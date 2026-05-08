# artefacts

## 1. Purpose

Artefacts marketplace MVP: RU-first Next.js marketplace/content platform for physical artefacts, independent diagnostics, strength scale `0–10`, masters, articles, seller/admin flows, and mock persistence.

## 2. Agent Entry

Use this project when the user mentions:

- artefacts / артефакты;
- artefact marketplace;
- physical artefacts catalog;
- masters / seller cabinet / admin moderation;
- diagnostics / strength scale `0–10` for artefacts.

Read order:

1. `STATE.md`
2. `PROJECT.md`
3. `CHECKS.md`
4. `DECISIONS.md`
5. repo-local `README.md`
6. repo-local `package.json`

## 3. Live URLs

- production: needs verification
- preview: needs verification
- admin: needs verification
- needs verification: exact Vercel project URL/source is not confirmed in project memory.

## 4. Repositories

- canonical repo: https://github.com/andylitvinov-design/artefacts
- repo visibility: private
- repo status: active, not archived
- code search index: not indexed according to GitHub inventory
- deprecated repo: none known / needs verification
- related repos: needs verification

## 5. Hosting / Deploy

- provider: expected Vercel workflow per repo README, exact project needs verification
- project name: needs verification
- deploy source: needs verification
- production branch: `main` per repo README
- release flow: `branch -> PR -> merge -> Vercel production deploy`

## 6. Current Status

- status: `active/cloud-ready` per repo README
- current goal: cloud-preview state so the project can be safely continued from browser
- current task: fix/record current MVP and prepare simple GitHub + Vercel workflow
- next step: create preview deploy and use README + STATE as resume points

## 7. Stack / Commands

Confirmed from `package.json`:

- Next.js `16.2.3`
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- shadcn/base-ui related dependencies
- Supabase packages present
- Stripe package present

Scripts:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run smoke:release`
- `npm run rollback:prepare`

## 8. Important Files / Areas

Confirmed or described by repo README:

- `src/app`
- `src/components`
- `src/data`
- `src/lib`
- `src/types`
- `.runtime/marketplace-state.json` runtime persistence
- `scripts/smoke-release.mjs`
- `scripts/revert-last-good.mjs`

Important routes:

- `/`
- `/catalog`
- `/artifacts/[slug]`
- `/masters/[slug]`
- `/evaluation`
- `/articles`
- `/articles/[slug]`
- `/seller`
- `/admin`
- `/admin/applications`
- `/admin/artifacts`
- `/admin/users`
- `/admin/curators`
- `/admin/diagnostics`

## 9. Environment Variable Names

Only names are allowed here. Values must never be stored.

- needs verification

## 10. Known Issues / Gaps

- Live URL / Vercel project mapping not confirmed.
- Hosting source not confirmed.
- Env names/completeness need verification.
- Runtime persistence is currently JSON/mock-style; future backend migration expected.
- Real auth, upload storage, checkout/provider flows are future-stage and must not be claimed live without verification.

## 11. Recent Tasks

- Next.js marketplace MVP with catalog, cards, seller/admin flow and mock persistence exists per README.
- Repo STATE says current task is to record current MVP and prepare simple GitHub + Vercel workflow.

## 12. Next Actions

1. Verify live Vercel project URL and deploy source.
2. Verify preview deploy flow.
3. Run/confirm `npm run build`, `npm run lint`, `npm run smoke:release` when changing code.
4. If project moves toward production, verify real auth, storage, checkout, orders, and payment flow separately.

## 13. Risks

- Confusing cloud-ready MVP with production-ready marketplace.
- Claiming real checkout/payment/auth/storage before verification.
- Applying patterns from finance/codex/reiki without inspecting this repo.
- Storing secrets or provider credentials.
- Assuming live URL from README wording without deploy verification.

## 14. Rules for Codex

- Do not apply patterns from `codex-links`, `finance`, or `reiki-yggdrasil` without checking this repo.
- Preserve RU-first marketplace concept unless explicitly changed.
- Keep `main` production-ready and use branch/PR flow.
- Do not change env/secrets.
- Verify live/deploy source before production claims.

## 15. Verification Status

- repo mapping: verified from GitHub inventory and repo README
- repo status: active/private/not archived verified from GitHub metadata
- stack/package scripts: verified from repo `package.json`
- local state file: verified from repo `STATE.md`
- live mapping: needs verification
- env status: needs verification
- deploy status: needs verification
- production checkout/auth/storage/payment: needs verification
