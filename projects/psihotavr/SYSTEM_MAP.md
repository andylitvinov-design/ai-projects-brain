# System Map — Psihotavr

## High-level flow

Visitor or admin action → Vite/React route → catalog/content/cart/admin helper → static or provider-dependent storage path → public UI, Telegram order handoff, or provider response.

## Runtime surfaces

- public catalog and article routes;
- mandala/service detail and collection views;
- cart and Telegram-first order handoff;
- admin mandala/content tools;
- AI-video admin/API routes;
- experimental auth, cabinet, storage, and payment paths.

## Canonical deploy flow

`andylitvinov-design/psihotavr` → `main` → current Vercel production deployment → https://psihotavr.vercel.app

The exact deployment ID, branch, source commit, and production alias must be re-read before every LIVE claim.

## Data and persistence boundaries

- Repo/static catalog data is distinct from browser-local admin state.
- Browser `localStorage` is not cross-device persistence.
- Telegram submission is a handoff, not proof of stored order data.
- Supabase, Firebase, storage, AI-video, and payment code paths are not provider readiness by themselves.

## Critical paths

1. Catalog classification and image mapping.
2. Services versus collections/articles presentation.
3. `/mandalas` default grid state and legacy storage migration.
4. Admin editing/upload visibility and persistence.
5. Cart and Telegram message generation.
6. AI-video provider request/status handling.
7. Auth/cabinet role and data-policy behavior.
8. Vercel source mapping and live verification.

## Verification matrix

| Layer | Required evidence |
| --- | --- |
| Repository | canonical repo, fresh `main`, relevant commit reachable |
| Build | project checks pass on final commit |
| Default UI | clean session plus desktop/mobile evidence |
| Persisted UI | legacy and current storage behavior verified |
| Provider | current configuration by env name, provider response, no secret exposure |
| Data | storage/persistence and policy evidence |
| Deployment | deploy ID, branch, source SHA, production alias |
| Live | expected route/action verified after deployment |
| Rollback | prior stable target and revert steps |

## Known unknowns

Current authenticated admin/cabinet behavior, provider credentials, payment completion, and backend persistence remain `needs verification` unless a newer project report proves them.
