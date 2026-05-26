# Codex `/goal` Prompt Standard

This is the canonical rule for ChatGPT, Agent-Projector, Debugger agents, and Codex handoffs when they create or rewrite a Codex `/goal` prompt.

Use this when the user asks for a Codex goal, a debugger goal, an autonomous repair task, or a production fix prompt. For Claude Code prompts, keep using `systems/claude-code-prompt-standard.md` instead.

## Core rule

A `/goal` prompt is not a long chat summary. It is a short execution contract.

Hard limit: the `/goal` body must be under 4,000 characters whenever technically possible. Target length is 1,500-3,000 characters. If the task needs more context, put the details in a GitHub issue, PR description, project memory file, or debug log, then link that source from the `/goal`.

The goal must define:

1. the concrete result that must become true;
2. the project/repo/live target;
3. the source of truth and context to read first;
4. the GitHub issue/PR/memory link that contains detailed evidence when the task is complex;
5. the suspected or required investigation scope;
6. the boundaries of what must not be changed;
7. the definition of done;
8. verification commands and live checks;
9. the required final report.

If these items are missing, do not invent them. Mark missing items as `needs verification` and still write the safest useful goal.

## GitHub issue as context container

For complex bugs, production incidents, finance/debugger tasks, or anything with screenshots, long logs, many examples, tables, or prior investigation, do not put all context into `/goal`.

Create or use a GitHub issue and put the key information there:

- user-visible problem;
- exact examples, dates, order IDs, channels, screenshots, URLs, API outputs;
- expected vs actual behavior;
- suspected layers and evidence for/against each;
- constraints and protected semantics;
- acceptance criteria;
- useful links to project memory, PRs, commits, deploys, logs, and endpoints.

Then the `/goal` should say: read the issue first, treat it as the task context, and execute against the definition of done.

## Good `/goal` shape

```text
/goal
Goal: <one concrete outcome>.

Primary context:
- GitHub issue: <issue URL with full evidence/context>.
- Project: <project_key or app name>.
- Canonical repo: <owner/repo> or needs verification.
- Live URL/API: <URL/check> or needs verification.
- Read first: <project memory files + repo-local files>.

Required investigation:
- Prove the failing layer before patching.
- Check: <provider/import/normalization/ledger/API/UI/deploy/etc.>.
- Do not assume the cause from old chat history.

Boundaries:
- May change: <files/areas>.
- Must not change: <secrets/env values, data contracts, finance semantics, auth, unrelated UI>.
- Use the minimal safe fix; no broad rewrite.

Definition of done:
- Root cause and failing layer are proven with evidence.
- Minimal patch is implemented.
- Regression test or explicit verification is added.
- Checks pass or failures are reported exactly.
- Production/live state is verified when the task is about live behavior.

Final report: studied files/data, root cause, failing layer, changed files, checks, live/deploy status, risks, STATE.md/LOG.md update status.
```

## Required discipline

- One `/goal` = one coherent objective. Do not combine unrelated bugs, features, deploys, and audits.
- `/goal` must be under 4,000 characters whenever possible.
- Put bulky context into a GitHub issue/PR/project memory file, not into `/goal`.
- Do not paste long logs, screenshots text, whole reports, or old chat history into `/goal`. Link to the issue or source instead.
- Use `/plan` first when the task is still unclear. Convert the plan into `/goal` only after scope, checks, and done criteria are clear.
- A debugger must not write vague goals like `fix balance`, `fix everything`, `audit and deploy`, or `make it work`.
- A debugger must not ask Codex to patch before proving the failing layer.
- Do not use `/goal` as a brainstorming prompt. Use it for execution.

## Production debugger additions

For production bugs, especially finance/debugger tasks, include or link:

- current live URL and health/status endpoint;
- expected production repo and deploy source;
- GitHub issue with exact user-visible symptom and data examples;
- required source-of-truth check before patching;
- regression invariant that proves the bug cannot return;
- deploy/live verification requirement.

Template:

```text
/goal
Fix the production bug in <project> without changing unrelated finance semantics.

Primary context:
- GitHub issue: <issue URL containing full evidence, examples, screenshots/logs, expected behavior, and acceptance criteria>.
- Project memory: read `START-HERE-FOR-AGENTS.md`, `projects/index.md`, selected project `PROJECT.md`, `CODEX_BRIEF.md`, `CHECKS.md`, `RISKS.md`, and `DEBUG_LOG.md` if present.
- Canonical repo: <owner/repo>.
- Live URL/status: <URL/status endpoint>.

Required workflow:
1. Verify repo/live/deploy source first.
2. Reproduce or prove the failure from issue evidence plus API/data/UI checks.
3. Identify the failing layer: provider/import, normalization, ledger save, aggregation, API route, UI render, deploy/alias, or env/config.
4. Patch only the proven layer.
5. Add a regression test for the exact case.
6. Run targeted tests, guard scripts, build, and live verification if production is affected.

Do not change secrets/env values. Do not rewrite balance, gross/net/fee, transfer, payout, exchange, or ledger semantics unless the evidence proves that exact layer is wrong.

Final report must include root cause, failing layer, changed files, checks, PR/commit/deploy status, live verification, and remaining risks.
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
/goal <4,000+ characters of copied chat history, screenshots, logs, and prior reports>
```

Good:

```text
/goal
Fix the May balance mismatch in `andylitvinov-design/finance` for `https://ezohata-incoming-ledger.vercel.app`.

Primary context: read GitHub issue <issue URL> for full evidence, examples, expected behavior, and acceptance criteria.

Before patching, verify `/api/status`, `/api/audit-snapshot`, and the relevant UI/API path. Prove whether the failing layer is provider/import, ledger normalization, aggregation, API, UI render, or deploy alias.

Patch only the proven layer. Preserve amount_net/gross/fee, transfer, payout, exchange, and ledger contract semantics unless evidence proves that exact logic is wrong. Add a regression test, run project checks, and verify live if production changed.

Final report: studied files/data, root cause, failing layer, changed files, checks, PR/commit/deploy status, live verification, remaining risks, STATE.md/LOG.md update status.
```

## When to create a GitHub issue first

Create or request a GitHub issue before `/goal` when:

- the context would push `/goal` near or over 4,000 characters;
- there are multiple screenshots, examples, orders, channels, or dates;
- the task depends on prior investigation or a long user report;
- acceptance criteria need to be preserved across sessions;
- several agents may work on the same bug.

## When to refuse to generate a `/goal`

Do not generate an execution `/goal` when the task would require unsafe access, secrets exposure, destructive financial/account changes, or unclear production target selection. In those cases, produce a `/plan` or a blocked handoff with `needs verification` instead.
