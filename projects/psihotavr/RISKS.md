# Risks - psihotavr

## Critical Risks

- Breaking the live catalog, admin mandala tools, cart, or AI-video hub.
- Losing Excel-derived mandala services or image mappings.
- Misclassifying services as articles/collections or merging distinct mandalas.
- Merging wrong-base PRs that never reach `main`.
- Claiming live fixed without verifying the live deployment source and browser
  behavior.

## Data Risks

- LocalStorage-only admin/content changes may not persist across devices.
- Backend persistence for catalog/order/admin edits needs verification.
- Supabase/Firebase auth and order/cabinet experiments can confuse agents.
- Uploaded/updated photos need verified persistence and sort behavior.
- Unknown schema/storage details must stay marked as `needs verification`.

## Deploy Risks

- Vercel Git auto-deploy/source can drift.
- Preview and production must be distinguished.
- `main` is canonical unless repo/deploy metadata proves otherwise.
- Old Claude/Codex branches must not be carried wholesale.

## Security Risks

- Env values must never be stored or printed.
- Env names include `GITHUB_TOKEN`, `ADMIN_TOKEN`, provider API keys, Firebase,
  and Supabase values.
- Admin routes and provider APIs must not expose secrets or raw internal errors.
- Auth/cart/orders migrations need provider, migration, RLS, admin, user, and live
  gates before merge/deploy.

## Agent/Codex Risks

- Editing product code during `/upgrade` instead of creating a `/delivery`
  handoff.
- Running broad repo rewrites for narrow UI/data bugs.
- Verifying only clicked happy path and missing clean-session default state.
- Ignoring mobile layout and legacy localStorage state.
- Confusing production repo with old branches or unrelated worktrees.

## Do Not Do

- Do not publish secrets or env values.
- Do not assume Supabase/Firebase/payment/provider configuration works without
  live verification.
- Do not change auth/payment/data/deploy behavior inside `/upgrade`.
- Do not merge stale branches wholesale.
- Do not claim production completion without tool/browser evidence.
