# Project Memory Standard

This repo is a public, text-first project memory base for
ChatGPT, Codex, and Agent-Projector. It helps agents find
the right project, avoid deprecated repos, understand
current risks, and preserve operational context without
exposing secrets.

## Required Files

Each project listed in `projects.json` should have:

- `PROJECT.md`
- `SYSTEM_MAP.md`
- `DATA_SCHEMA.md`
- `CODE_ACCESS.md`
- `DATA_SAMPLES.md`
- `DEBUG_LOG.md`
- `RISKS.md`
- `CODEX_BRIEF.md`

Older Level 2 files such as `STATE.md` and `LOG.md` can
coexist with this expanded memory. Do not delete them unless
explicitly requested.

## Source Of Truth

- `projects.json` is the machine-readable source of truth.
- `projects.md` is the human-readable inventory.
- `projects/<slug>/PROJECT.md` is the detailed project
  passport.
- `data/project-index.json` is the generated index for
  agents and automation.
- Repo-local `AGENTS.md`, `README.md`, `STATE.md`, deploy
  docs, and code remain the source of truth for
  implementation details.

## Updating `PROJECT.md`

Update `PROJECT.md` when purpose, live URLs, repo mapping,
hosting, current status, important files, env names, known
issues, recent tasks, next actions, risks, rules, or
verification status change.

Use only confirmed facts. If a field is missing, stale,
inferred, or not checked in the current task, write
`needs verification`.

## Updating `SYSTEM_MAP.md`

Update `SYSTEM_MAP.md` when input, processing, storage,
output, runtime, deploy flow, or critical paths change.

Do not infer production architecture from naming alone. If
repo-to-hosting mapping is uncertain, mark it
`needs verification`.

## Updating `DATA_SCHEMA.md`

Update `DATA_SCHEMA.md` when data entities, canonical
fields, data contracts, storage, derived data, validation
rules, or migration constraints change.

Do not invent fields or contracts. If exact schema is not
confirmed from code, data, or docs, write
`needs verification`.

## Real Data And Debug Cases

Use `DATA_SAMPLES.md` and `DEBUG_LOG.md` for safe examples
and troubleshooting evidence.

Allowed:

- redacted sample rows
- synthetic examples clearly marked as templates
- public URLs
- file paths
- error messages without credentials

Not allowed:

- real tokens
- cookies
- secret keys
- refresh tokens
- private customer data
- full unredacted provider payloads

## Secrets

Environment variables may be listed by name only. Never
store real values in docs, samples, logs, JSON, issues,
commits, or PRs.

Examples of allowed values:

- `PAYPAL_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `SLACK_BOT_TOKEN`

Examples of disallowed content:

- assignment forms that include a client secret value
- authorization headers that include bearer credentials
- private keys
- real OAuth refresh tokens

## `needs verification`

Use `needs verification` when data is missing, stale,
inferred, partially known, or not checked directly.

Prefer explicit uncertainty over false certainty. Do not
replace `needs verification` with a guess.

## Agent Usage

ChatGPT and Agent-Projector should:

1. Read `projects.md` for the human map.
2. Read `projects.json` or `data/project-index.json` for
   structured lookup.
3. Read the matching `projects/<slug>/PROJECT.md`.
4. Read `CODEX_BRIEF.md`, `SYSTEM_MAP.md`, `DATA_SCHEMA.md`,
   and `RISKS.md` before advising on work.
5. Treat private repo details and live state as
   `needs verification` unless current evidence is provided.

Codex should:

1. Read the relevant project folder before making changes.
2. Read repo-local instructions in the target repo.
3. Keep fixes minimal and evidence-backed.
4. Update memory files after meaningful changes.
5. Run validation before PR.
