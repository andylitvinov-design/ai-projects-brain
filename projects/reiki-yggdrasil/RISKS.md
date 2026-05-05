# Risks - reiki-yggdrasil

## Critical Risks

- Breaking existing home page `/`.
- Breaking `/profile`, `/masters`, or `/profile/admin`.
- Breaking RU default interface.
- Breaking Vercel route rewrites.
- Breaking Supabase auth/data flows.
- Breaking the accepted desktop three-column layout.
- Making visual changes that conflict with the designer-approved layout.

## Data Risks

- Supabase credentials and seeded/live data require live verification.
- Unknown or stale data must stay marked as `needs verification`.
- Data contracts need verification before schema changes.
- The migration `supabase/migrations/20260428_master_cabinet_mvp.sql` must be checked before schema or auth/profile/admin changes.
- Do not claim profile, masters catalog, or admin moderation works end-to-end unless live Supabase behavior was verified.

## Deploy Risks

- Hosting is listed as Vercel, Vite build.
- Deploy source and branch need verification before production work.
- Preview and production must be distinguished before live claims.
- Vercel GitHub App access can block import/deploy visibility.
- Route rewrites in `vercel.json` must not be broken.

## Security Risks

- Environment variables are names only. Values must never be stored.
- Required env names: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAIL`.
- Supabase keys, admin emails, user data, profile data, and auth state must not be exposed in logs or memory files.

## Agent/Codex Risks

- Starting UI work without checking `src/App.jsx`, `src/index.css`, route pages, Supabase client, migration, and `vercel.json`.
- Treating code path existence as live auth/data verification.
- Collapsing the accepted three-column desktop structure while fixing responsive or card layout issues.
- Accidentally converting RU-first UI into English-first UI.
- Rewriting the app instead of making a minimal safe fix.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, deploy source, or data-flow mappings.
- Do not change production without explicit instruction.
- Do not remove or rename protected routes without explicit instruction.
- Do not replace the existing home page unless explicitly asked.
