# Code Access - psihotavr

## 1. Repo Links

- canonical: https://github.com/andylitvinov-design/psihotavr
- live: https://psihotavr.vercel.app
- Vercel project: `psihotavr`
- related/deprecated repos: needs verification

## 2. Useful Links

- PRs: https://github.com/andylitvinov-design/psihotavr/pulls
- commits: https://github.com/andylitvinov-design/psihotavr/commits
- deployments: Vercel project `psihotavr`, exact deployment URL/source needs
  verification per run
- admin route: https://psihotavr.vercel.app/admin/mandalas
- Codex Cloud environment: should be configured as `psihotavr` for
  `andylitvinov-design/psihotavr` on base branch `main`; current ChatGPT
  account visibility needs verification in Codex Cloud settings.

## 3. Important Files

- `package.json`
- `vercel.json`
- `src/App.tsx`
- `src/main.tsx`
- `src/lib/mandalaServices.ts`
- `src/pages/MandalaCatalogPage.tsx`
- `src/pages/CartPage.tsx`
- `src/pages/AdminMandalasPage.tsx`
- `src/pages/AdminVideoFormPage.tsx`
- `src/lib/aiVideoGeneration.ts`
- `src/server/videoProviders/videoProviderService.ts`
- `api/ai-videos/generate.ts`
- `api/ai-videos/status.ts`

## 4. How to Share Code With ChatGPT

- PR link
- commit link
- diff
- changed files
- error logs
- screenshots
- live/preview URL
- no secrets

## 5. Access Limitations

ChatGPT may not have direct authenticated access to private admin/provider
states. For analysis, share PRs, diffs, safe logs, screenshots, and live/preview
URLs. Do not share secrets or env values.

## 6. Codex Cloud Launch Contract

- Repository: `andylitvinov-design/psihotavr`
- Base branch: `main`
- Working branch: `codex/<task-name>`
- Mode: Codex Cloud Repo Mode
- Local Mac required: no
- Output target: PR in this repository
