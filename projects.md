# Project Memory — Current Human Catalog

Last reconciled: `2026-08-08`

> This file is now a compact current catalog. Detailed historical project records remain available in Git history before this reconciliation and in `projects/<slug>/PROJECT.md`. The canonical active machine overlay is `projects/portfolio-registry.json`; the complete current GitHub owner-repository enumeration is represented in `projects.json` and `data/project-index.json`.

## Source boundaries

- `ai-projects-brain` — durable project/governance source of truth.
- `brain-management` — operational metrics, chains, assignments, immutable receipts and live publication state.
- GitHub/provider reachability — current identity evidence.
- Historical repo/live URLs are context only when current reachability fails.

## Active portfolio

| ID | Purpose | Canonical source | Live | Current durable state |
|---|---|---|---|---|
| `ezohata` | Current Ezohata product/catalog | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | `BLOCKED` — provider/live proof remains incomplete. |
| `ezohata-finance` | Current protected finance app | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | `BLOCKED_BY_OWNER` — owner-session + read-only provider journey required. |
| `legacy-finance` | Legacy incoming ledger/reference finance | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | `WATCH`; `andylitvinov-design/ezohata-incoming-ledger` is a deprecated/reference repo alias. |
| `psitherapy` | Public psychotherapy/content funnel | `andylitvinov-design/report` | https://psitherapy.vercel.app | `BLOCKED` — repo/project exist; deploy-source/auth proof incomplete. |
| `reiki-yggdrasil` | Reiki learning/master platform | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | `WATCH`. |
| `codex-links` | Codex command/report delivery surface | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | `WATCH`. |
| `brain-management` | Operational management control plane/PWA | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | `DEGRADED_STALE_FAIL_CLOSED` — canonical operational APIs reject stale source data. |
| `torontotantra` | Toronto Tantra and related landing/program surfaces | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | `WATCH`. |
| `ai-projects-brain` | Durable project/governance memory | `andylitvinov-design/ai-projects-brain` | not applicable | `IMPROVING`. |
| `psihotavr` | Historical mandala/catalog product identity | `NEEDS_VERIFICATION` | https://psihotavr.vercel.app historical/unverified | `IDENTITY_UNRESOLVED` — former repo mapping currently returns 404. |

## Current repository inventory

GitHub owner enumeration on 2026-08-08 confirms 30 accessible repositories. Accessible repositories are not automatically active products.

### Active-project repositories confirmed

`ai-projects-brain`, `brain-management`, `codex-links`, `ezohata`, `ezohata-finance`, `finance`, `reiki-yggdrasil`, `report`, `torontotantra`.

### Related / backup / bootstrap / not-currently-active identities

`active-projects-ops`, `agent-loops`, `alchemist`, `alchemy`, `alchemy-method`, `alchemy_site`, `artefacts`, `books`, `brain`, `brain-advice`, `codex-daily-backups`, `council`, `dao-usin-bach-report-kit`, `ezohata-incoming-ledger`, `ezohata_ads`, `hermes-cloud`, `Profile`, `psimaster`, `psitrends-work`, `sales`, `weblinks-private-backup`.

These require capsule/mapping evidence before promotion into the active portfolio. Bootstrap branches are not assumed to be production branches.

## Identity corrections in this reconciliation

- Brain Management remains one canonical Vercel product at `brain-management.vercel.app`, but CURRENT state is no longer `LIVE_VERIFIED`: `/api/data` and the other operational APIs are intentionally fail-closed because source age exceeded 18 hours.
- Psitherapy repo mapping is confirmed as `andylitvinov-design/report` from current GitHub owner inventory plus its capsule.
- Psihotavr's previously stored `andylitvinov-design/psihotavr` repo is not present in the current 30-repository owner enumeration and direct lookup returns 404. Its live/provider mapping also lacks current proof; do not route code work there until reverified.
- `andylitvinov-design/finance` remains canonical for legacy finance; the similarly named incoming-ledger repository is reference/deprecated, not a duplicate product identity.

## Operational-control-plane note

Brain Management live evidence checked on 2026-08-08 returns `503 STALE_OPERATIONAL_DATA_FORBIDDEN` from source `2026-08-06T04:55:44.630Z`, well beyond the 18-hour ceiling. This is a correct guard behavior but an unhealthy freshness state. The existing recovery chain remains owned by Brain Regression Guard; durable reconciliation does not publish or repair operational data.

## Provider identity note

The connected Vercel team contains the canonical Brain Management project plus many temporary probe/recovery projects created during release diagnostics. Those temporary provider projects are not durable project identities and must not replace the canonical `brain-management` mapping.

## How agents should use this file

1. Use `projects/index.md` or `projects/portfolio-registry.json` for current active routing.
2. Use `projects.json` / `data/project-index.json` for owner-repository discovery.
3. Open the project capsule before changing durable state.
4. Verify current repo/provider reachability before code work.
5. Treat `LIVE_VERIFIED` as time-bound; a later stale/fail-closed check supersedes an older healthy label.
6. Never infer secrets, protected provider proof, deployment source, or missing canonical identity.
