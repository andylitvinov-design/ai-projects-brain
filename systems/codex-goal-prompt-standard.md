# Codex `/goal` Prompt Standard

This is the canonical rule for ChatGPT, Agent-Projector, Debugger agents, and Codex handoffs when they create or rewrite a Codex `/goal` prompt.

Use this when the user asks for a Codex goal, a debugger goal, an autonomous repair task, or a production fix prompt. For Claude Code prompts, keep using `systems/claude-code-prompt-standard.md` instead.

## Core rule

A `/goal` prompt is not a long chat summary. It is a short execution contract.

The goal must define:

1. the concrete result that must become true;
2. the project/repo/live target;
3. the source of truth and context to read first;
4. the suspected or required investigation scope;
5. the boundaries of what must not be changed;
6. the definition of done;
7. verification commands and live checks;
8. the required final report.

If these items are missing, do not invent them. Mark missing items as `needs verification` and still write the safest useful goal.

## Good `/goal` shape

```text
/goal
Goal: <one concrete outcome>.

Project/source of truth:
- Project: <project_key or app name>.
- Canonical repo: <owner/repo> or needs verification.
- Live URL/API: <URL/check> or needs verification.
- Read first: <project memory files + repo-local files>.

Problem/evidence:
- Current failure: <specific symptom>.
- Known example: <date/order/channel/endpoint/screenshot>.
- Expected behavior: <specific expected result>.

Required investigation:
- Prove the failing layer before patching.
- Check: <provider/import/normalization/ledger/API/UI/deploy/etc.>.
- Do not assume the cause from old chat history.

Allowed scope:
- May change: <files/areas>.
- Must not change: <secrets/env values, data contracts, finance semantics, auth, unrelated UI>.
- Use the minimal safe fix; no broad rewrite.

Definition of done:
- Root cause and failing layer are proven with evidence.
- Minimal patch is implemented.
- Regression test or explicit verification is added.
- Checks pass or failures are reported exactly.
- Production/live state is verified when the task is about live behavior.

Final report:
1. Studied files/data.
2. Root cause and failing layer.
3. Changed files.
4. Tests/checks run.
5. Live/deploy status, if relevant.
6. Remaining risks and needs verification.
7. STATE.md/LOG.md update status.
```

## Required discipline

- One `/goal` = one coherent objective. Do not combine unrelated bugs, features, deploys, and audits.
- Prefer 1,500-3,000 characters. Longer is allowed only when the task truly needs it.
- Do not paste long logs, screenshots text, or whole reports into `/goal`. Summarize evidence and point to exact files/endpoints.
- Use `/plan` first when the task is still unclear. Convert the plan into `/goal` only after scope, checks, and done criteria are clear.
- A debugger must not write vague goals like `fix balance`, `fix everything`, `audit and deploy`, or `make it work`.
- A debugger must not ask Codex to patch before proving the failing layer.
- Do not use `/goal` as a brainstorming prompt. Use it for execution.

## Production debugger additions

For production bugs, especially finance/debugger tasks, include:

- current live URL and health/status endpoint;
- expected production repo and deploy source;
- exact user-visible symptom;
- exact data example if known;
- required source-of-truth check before patching;
- regression invariant that proves the bug cannot return;
- deploy/live verification requirement.

Template:

```text
/goal
Fix the production bug in <project> without changing unrelated finance semantics.

Source of truth:
- Project memory: read `START-HERE-FOR-AGENTS.md`, `projects/index.md`, selected project `PROJECT.md`, `CODEX_BRIEF.md`, `CHECKS.md`, `RISKS.md`, and `DEBUG_LOG.md` if present.
- Canonical repo: <owner/repo>.
- Live URL/status: <URL/status endpoint>.

Problem:
<specific symptom and example>.

Required workflow:
1. Verify repo/live/deploy source first.
2. Reproduce or prove the failure from API/data/UI evidence.
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

Good:

```text
/goal
Fix the May balance mismatch in `andylitvinov-design/finance` for `https://ezohata-incoming-ledger.vercel.app`.

Evidence: summary card and movement table disagree for May; exact values need current verification.

Before patching, verify `/api/status`, `/api/audit-snapshot`, and the relevant UI/API path. Prove whether the failing layer is provider/import, ledger normalization, aggregation, API, UI render, or deploy alias.

Patch only the proven layer. Preserve amount_net/gross/fee, transfer, payout, exchange, and ledger contract semantics unless the evidence proves that exact logic is wrong. Add a regression test for the mismatch path, run project checks, and verify live if production changed.

Final report: studied files/data, root cause, failing layer, changed files, checks, PR/commit/deploy status, live verification, remaining risks, STATE.md/LOG.md update status.
```

## When to refuse to generate a `/goal`

Do not generate an execution `/goal` when the task would require unsafe access, secrets exposure, destructive financial/account changes, or unclear production target selection. In those cases, produce a `/plan` or a blocked handoff with `needs verification` instead.
