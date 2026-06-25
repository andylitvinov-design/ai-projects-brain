# Mentalica CODEX_BRIEF

Use this brief whenever the user asks about Mentalica, 2mentalica, or migrating/synchronizing the two.

## Confirmed context

- Draft/baseline URL: https://2mentalica.vercel.app
- Target URL: https://mentalica.vercel.app
- User intent: `2mentalica.vercel.app` is the draft/current working variant for `mentalica.vercel.app`.
- Live observation on 2026-06-25: both URLs were reachable and returned title `Рейки Иггдрасиль`.

## Unknowns

- Repo: needs verification
- Hosting project names: Vercel / needs verification
- Deploy source branches: needs verification
- Env names: needs verification
- Build/dev/test commands: needs verification
- Important files: needs verification

## Mandatory first commands/checks

```bash
pwd
git status --short
git remote -v
git branch --show-current
ls
find .. -maxdepth 2 -iname '*mentalica*' -o -iname '*reports*'
```

Then inspect:

```bash
cat AGENTS.md 2>/dev/null || echo 'AGENTS.md not found'
cat README.md 2>/dev/null || echo 'README.md not found'
cat STATE.md 2>/dev/null || echo 'STATE.md not found'
cat project-state.md 2>/dev/null || echo 'project-state.md not found'
cat LOG.md 2>/dev/null || echo 'LOG.md not found'
cat package.json
cat vercel.json 2>/dev/null || echo 'vercel.json not found'
```

If Vercel CLI is available and authenticated:

```bash
vercel whoami
vercel project ls
vercel inspect https://2mentalica.vercel.app
vercel inspect https://mentalica.vercel.app
vercel env ls
```

Do not print env values.

## Default task prompt

```text
Project: Mentalica
Draft/baseline URL: https://2mentalica.vercel.app
Target URL: https://mentalica.vercel.app
Repo: needs verification
Hosting: Vercel / needs verification
Target branch: codex/mentalica-task

Treat 2mentalica.vercel.app as the draft/current working baseline for mentalica.vercel.app.
First verify repo, Vercel project mapping, production vs preview, env names, build settings, and routes.
Do not expose secrets. Do not rewrite the app. Make minimal branch-based changes. Preserve current user flows and mobile/desktop UX unless the task explicitly asks to change them.
Run repo-defined checks and verify both URLs after changes.
Report changed files, checks run, URLs checked, risks, and what was not verified.
```
