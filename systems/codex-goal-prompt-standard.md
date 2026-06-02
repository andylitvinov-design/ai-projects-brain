# Codex `/goal` Prompt Standard

This is the canonical rule for ChatGPT, Agent-Projector, Debugger agents, and Codex handoffs when they create or rewrite a Codex `/goal` prompt.

Use this when the user asks for a Codex goal, a debugger goal, an autonomous repair task, or a production fix prompt. For Claude Code prompts, keep using `systems/claude-code-prompt-standard.md` instead.

## Core rule

A `/goal` prompt is not a long chat summary. It is a short execution contract.

Strict length rule:

- A Codex `/goal` should be no more than 4000 characters.
- Prefer 1500-3000 characters.
- If the task needs more detail, create/update a GitHub issue, repo doc, PR description, or task spec first, then link to it from the `/goal`.
- Do not put full specifications, long checklists, screenshot analysis, acceptance matrices, or historical context directly into `/goal`.

The `/goal` must define only:

1. the concrete result that must become true;
2. the repo/live target;
3. the GitHub issue/doc/spec to read first;
4. the smallest useful investigation/implementation scope;
5. the boundaries of what must not be changed;
6. the short verification command list;
7. the required final report.

If these items are missing, do not invent them. Mark missing items as `needs verification` and still write the safest useful goal.

## Where details must go

Before writing a detailed Codex task, save the detailed scope in one of these places:

- GitHub issue for task specification and acceptance criteria.
- `docs/<task-name>.md` for larger implementation plans.
- PR description when work is already scoped by a branch.
- `STATE.md` / `LOG.md` only for factual status after work or verification.

Then keep `/goal` as a short pointer to that source.

## Good `/goal` shape

```text
/goal
Repo: <owner/repo>

Task:
<1-3 sentence objective>.

Spec / issue:
<link or repo path>

Target branch:
<branch-name>

Read first:
- AGENTS.md
- README.md
- STATE.md
- LOG.md
- <specific issue/doc/spec>
- <specific code files>

Rules:
- minimal safe fix;
- do not break named routes/data flows;
- do not expose secrets;
- preserve production/preview distinction.

Run:
- <short test list>

Report:
- changed files;
- checks run;
- verified / not verified;
- risks;
- next step.
```

## Required discipline

- One `/goal` = one coherent objective. Do not combine unrelated bugs, features, deploys, and audits.
- Do not paste long logs, screenshot text, or whole reports into `/goal`. Summarize evidence and point to exact issue/doc/files/endpoints.
- If a prompt grows beyond 4000 characters, move details into GitHub and rewrite the `/goal` as a short pointer.
- Use `/plan` first when the task is still unclear. Convert the plan into `/goal` only after scope, checks, and done criteria are clear.
- A debugger must not write vague goals like `fix balance`, `fix everything`, `audit and deploy`, or `make it work`.
- A debugger must not ask Codex to patch before proving the failing layer.
- Do not use `/goal` as a brainstorming prompt. Use it for execution.

## Production debugger additions

For production bugs, especially finance/debugger tasks, include briefly:

- current live URL and health/status endpoint;
- expected production repo and deploy source;
- exact user-visible symptom;
- exact data example if known;
- required source-of-truth check before patching;
- regression invariant that proves the bug cannot return;
- deploy/live verification requirement.

If these details exceed 4000 characters, put them in an issue/doc and link it.

## Template

```text
/goal
Repo: <owner/repo>

Task:
Fix <specific production bug or feature gap> without changing unrelated behavior.

Spec / issue:
<GitHub issue or docs path>

Target branch:
<branch-name>

Workflow:
1. Verify repo/live/deploy source first.
2. Reproduce or prove the failure from API/data/UI evidence.
3. Patch only the proven layer.
4. Add/adjust regression coverage.
5. Run checks and live verification if production is affected.

Do not change secrets/env values. Do not rewrite unrelated routes, data contracts, auth, billing, finance semantics, or UI areas outside the task.

Run:
<short command list>

Final report:
root cause, changed files, checks, PR/commit/deploy status, live verification, remaining risks, STATE.md/LOG.md update status.
```

## Anti-patterns

Bad:

```text
/goal fix finance balance and deploy everything
```

Bad:

```text
/goal read all files, audit the whole repo, find any issues, fix them, improve UI, update docs, deploy
```

Bad:

```text
/goal based on previous chats, you know what to do
```

Bad:

```text
/goal <multi-page detailed specification pasted directly into the goal>
```

Good:

```text
/goal
Repo: andylitvinov-design/reiki-yggdrasil

Task:
Fix the remaining Profile Lite parity gaps against `/profile-old`.

Spec:
docs/profile-lite-old-profile-gap-fix.md

Target branch:
codex/profile-lite-old-profile-gap-fix

Read the spec first, then inspect the listed files. Do not invent a new layout; copy the old implemented ProfilePage layout where it exists. Preserve `/profile-old`, route-backed tabs, `ProfileLiteImagePicker`, auth/bootstrap, `/`, `/masters`, `/profile/admin`, and RU-default.

Run:
npm run test:profile-lite
npm run test:profile-media
npm run test:power-place
npm run test:profile-loading-recovery
npm run check
npm run build

Report:
changed files, copied old sections, fixed gaps, remaining differences, checks run, QA notes.
```

## When to refuse to generate a `/goal`

Do not generate an execution `/goal` when the task would require unsafe access, secrets exposure, destructive financial/account changes, or unclear production target selection. In those cases, produce a `/plan` or a blocked handoff with `needs verification` instead.
