# PsiTrends

## Purpose

Bilingual author-led consultation, training, workshop and archive site, with preserved legacy Joomla content and a modern client-first public layer.

## Canonical identity

- canonical live: https://psitrends.com
- production platform: Joomla on Hetzner
- public client/content source: `andylitvinov-design/sales`, default branch `codex/bootstrap-sales`
- sanitized production operations: `andylitvinov-design/psitrends-ops`, branch `main`
- coordination/catalog/editorial strategy: `andylitvinov-design/psitrends-work`, branch `main`
- historical live alias: https://psitrends.pages.dev

These repositories form one project topology. `psitrends-ops` is not a second product identity, and `psitrends-work` is not the runnable production app.

## Current verified state — 2026-09-26

- Canonical root returns a bilingual PsiTrends / Holistic House public experience with consultations, training, workshops, projects, About and Contact.
- `sales` contains the current `psitrends-client-*.html`, CSS/JS, route inventory and public release QA. Recent source work restored full navigation and client sections.
- `psitrends-ops` contains sanitized nginx/PHP/backup/release tooling and explicit production safety boundaries. It proves the Joomla/host operations role without storing live secrets.
- `psitrends-work` explicitly describes itself as Cloud catalog/coordination and warns that it is not automatically the production source repo.
- Production exact-commit binding is not exposed by the public surface. User-visible behavior is verified, but no product/business metric is assigned; metric credit is zero.

## Delivery and safety boundaries

- Use `sales` for client-first public source changes and reviewed release artifacts.
- Use `psitrends-ops` only for sanitized infrastructure, guarded releases, backup/restore and rollback workflows.
- Use `psitrends-work` for cross-repo routing, editorial/acquisition strategy and durable reports.
- Production changes require a fresh private backup, exact before-state, scoped cache purge, EN/RU route verification and rollback evidence.
- Never commit credentials, private backup bundles or live environment exports.
- Preserve legacy routes/content unless a focused reviewed migration explicitly changes them.

## Known open risks

- Production source SHA cannot be proven from the public response alone.
- Open operations PRs include privacy/analytics and database/content mutation work that requires owner review.
- Current public navigation/cache work may have source/live timing gaps; verify canonical live after each release.
- Historical `psitrends.pages.dev` and old `psitrends-work` routing can misdirect agents.

## Next actions

1. Keep one explicit release record linking `sales` source SHA, guarded `psitrends-ops` action, production before-state and live readback.
2. Resolve current navigation/cache follow-ups through the existing guarded Joomla release path.
3. Bind future user-visible work to a same-source product/business effect measure before claiming outcome credit.

## Durable routing rule

Mentions of PsiTrends, `psitrends.com`, Joomla client pages, historical PsiTrends routes or the three related repositories route here first. Choose the target repository by role; never treat repository accessibility or naming as proof of an independent project.
