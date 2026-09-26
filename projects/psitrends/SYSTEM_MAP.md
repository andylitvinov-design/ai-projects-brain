# System Map — PsiTrends

## Public flow

`andylitvinov-design/sales` client/content source → reviewed package → guarded Joomla release → Hetzner production → https://psitrends.com

## Operations flow

`andylitvinov-design/psitrends-ops` → sanitized nginx/PHP/backup/release tooling → private before-state and rollback → scoped production action → live readback.

## Coordination flow

`andylitvinov-design/psitrends-work` stores shared routing/editorial/acquisition instructions. It is not the runnable site source.

## Runtime

- Joomla
- separate nginx, PHP, MySQL and Redis containers
- EN/RU client-first pages plus preserved legacy routes
- secrets and live environment exports remain outside Git

## Critical paths

- fresh private backup and exact before-state
- source SHA and reviewed release artifact
- scoped cache purge
- EN/RU desktop/mobile route verification
- rollback checkpoint

## Open verification

- exact source SHA currently active on production
- current state of high-risk privacy/analytics and content-mutation PRs
- same-source product/business effect measurement
