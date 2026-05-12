# Task Intake Template

Use this to turn a vague task into a compact Codex-ready request.

```md
# Task Intake

Repo:
- <owner/name or needs verification>

Project:
- <project slug/name>

Goal:
- <one sentence>

User-visible problem:
- <what is wrong / what should improve>

Exact target, if known:
- URL:
- file:
- function/component/endpoint:

Context to read first:
- `projects.md`
- `projects/<slug>/PROJECT.md`
- `CODEX_BRIEF.md`
- `STATE.md`
- exact files listed above

Do not read first:
- full repo scan
- unrelated sibling repos
- old/deprecated repo unless explicitly needed

Minimal safe fix:
- <smallest acceptable change>

What not to change:
- <routes/APIs/contracts/UX/env/secrets/etc.>

Checks:
- <command/check 1>
- <command/check 2>
- <live check if production behavior is claimed>

Risks:
- <risk 1>
- <risk 2>

Final report must include:
- studied files
- found
- changed
- changed files
- checks run / not run
- risks / needs verification
- STATE/LOG update status
```

Rules:

- Prefer one concrete goal per Codex session.
- Group only closely related small changes.
- If the task becomes large, ask Codex to produce a session summary before continuing.
