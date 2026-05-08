# DECISIONS — psitrends

> Architecture decisions and guardrails for PsiTrends.

## Current boundary

- Canonical repo candidate: `andylitvinov-design/psitrends-work`.
- Live URL candidate: https://psitrends.pages.dev.
- Repo-to-live mapping is not yet confirmed.

## Verification first

Before implementation or production claims:

- inspect repository tree;
- identify framework/build path;
- verify Cloudflare Pages deploy source;
- verify whether root is intentionally empty/minimal or project lives in a subfolder.

## Build assumptions

- No root `README.md` found during verification.
- No root `package.json` found during verification.
- Therefore agents must not assume npm/Next/Vite build commands.

## Secrets

- Do not store Cloudflare credentials, API keys, analytics tokens, or env values.
- Env names only if later discovered.

## Main formula

**PsiTrends mapping is plausible but not fully verified: verify repo tree and Cloudflare deploy source before coding or live claims.**
