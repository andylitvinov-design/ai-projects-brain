# Code Access — PsiTrends

## Repositories

- public client/content source: https://github.com/andylitvinov-design/sales
- sanitized production operations: https://github.com/andylitvinov-design/psitrends-ops
- coordination/catalog/editorial strategy: https://github.com/andylitvinov-design/psitrends-work

## Live

- canonical: https://psitrends.com
- historical alias: https://psitrends.pages.dev

## Routing

- HTML/CSS/JS client pages and public release QA → `sales`
- nginx/PHP/backups/release/rollback → `psitrends-ops`
- cross-repo instructions and strategy → `psitrends-work`

Never place credentials, private backups or live environment exports in durable memory or Git.
