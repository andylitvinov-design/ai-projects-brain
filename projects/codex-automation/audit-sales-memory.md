# Audit Sales Memory

Persistent longitudinal memory for the weekly `/audit-sales` portfolio review.

## Rules

- Read before every portfolio sales audit and every Sales Audit Intelligence upgrade.
- Compare each site with the previous saved state.
- Label major findings `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED`.
- Store heuristic scores only as audit history, never as proof of revenue or conversion change.
- Never store secret values, provider payloads, private analytics, personal data, customer messages, or financial records.
- Preserve verified strengths and resolved findings instead of deleting history silently.
- Keep one compact current portfolio table and a short dated history.

## Current portfolio baseline

No weekly portfolio `/audit-sales` run has completed yet.

| Project | Repo | Production URL | Previous score | Evidence state | Top known sales question |
|---|---|---|---:|---|---|
| Ezohata | `andylitvinov-design/ezohata` | `https://ezohata.vercel.app` | — | NOT_TESTED | Does the catalog clearly convert interest into a Telegram or order action? |
| Psihotavr | `andylitvinov-design/psihotavr` | `https://psihotavr.vercel.app` | — | NOT_TESTED | Is the stable Telegram-first path clear and trustworthy? |
| Psitherapy | `andylitvinov-design/report` | `https://psitherapy.vercel.app` | — | NOT_TESTED | Does the public intake create value before login? |
| Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | `https://reiki-yggdrasil.vercel.app` | — | NOT_TESTED | Is one course or profile journey understandable and completable? |
| TorontoTantra | `andylitvinov-design/torontotantra` | `https://torontotantra.vercel.app` | — | NOT_TESTED | Does the site turn interest into a community or event lead? |
| EzoHata Finance | `andylitvinov-design/ezohata-finance` | `https://ezohata-finance.vercel.app` | — | NOT_TESTED | Does the owner workflow communicate the next decision clearly? |
| Legacy Finance | `andylitvinov-design/finance` | `https://ezohata-incoming-ledger.vercel.app` | — | NOT_TESTED | Is the legacy/reference role explicit to users and agents? |

## Current durable principles

- `/audit-sales` is the only canonical sales audit mode.
- `/audit-sale` is a deprecated compatibility alias only.
- Heuristic score changes are not conversion-rate or revenue evidence.
- Provider-dependent paths remain `BLOCKED` or `NEEDS_VERIFICATION` without live proof.
- Every site audit must preserve what already sells well and produce one bounded Codex prompt.

## History

### 2026-07-13

- Created the persistent sales-audit memory.
- Unified the canonical command under `/audit-sales`.
- Added initial active-site baseline with all scores `NOT_TESTED`.
