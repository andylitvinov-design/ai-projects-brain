# Agent Thinking Quality Standard

This standard defines how Codex, ChatGPT agents, Claude Code, and other engineering/debugging bots should think, debug, write prompts, manage work, and report results across projects.

It is designed to prevent shallow fixes, wrong-repo work, stale-deploy debugging, unsafe production changes, vague “done” reports, and agent work that cannot be audited later.

## 1. Core principle

Root cause first. Evidence before patch. Minimal safe fix.

Before changing code, the agent must prove the first failing layer. If it cannot prove the root cause, it must say `needs verification` and make only the safest reversible change or produce a concrete verification plan.

Mandatory debugging sentence:

```text
First prove the failing layer before patching.
```

## 2. Quality ladder

A high-quality agent response moves through this ladder:

1. Confirm the task and target repo/project.
2. Prove production/source-of-truth if the issue is live.
3. Identify the failing layer.
4. Collect evidence for and against the suspected cause.
5. Patch the smallest safe surface.
6. Add or update regression tests.
7. Run checks.
8. Verify live behavior when applicable.
9. Report changed files, results, risks, and next actions.
10. Update or propose project memory updates.

Skipping steps is allowed only when the step is irrelevant or impossible. The agent must state the reason.

## 3. Agent maturity levels

### Level 0 — Guessing agent

- Starts with broad hypotheses.
- Patches without proving the layer.
- Does not verify repo, branch, or live deploy.
- Reports “done” without evidence.

### Level 1 — Helpful assistant

- Explains possible causes.
- Gives useful instructions or prompts.
- May still lack repo/live verification.
- Often asks questions before using available evidence.

### Level 2 — Code fixer

- Locates files and makes a plausible patch.
- Adds some tests.
- May still miss deploy/source mismatch, finance semantics, or provider edge cases.

### Level 3 — Production debugger

- Proves the failing layer before patching.
- Captures live/API evidence.
- Makes a minimal safe patch.
- Adds regression tests and reports checks honestly.

### Level 4 — Autonomous debugger

- Creates a clean branch/worktree.
- Detects stale branches and dirty worktrees.
- Opens PRs with evidence.
- Checks CI/Vercel.
- Verifies production after merge when safe.
- Updates project memory or logs.

### Level 5 — Self-improving project agent

- Improves observability and debug tools.
- Adds durable project memory.
- Creates dashboards/metrics that measure agent quality.
- Leaves the system easier to debug next time.

## 4. Mandatory repo/source guard

Before working, prove the current workspace is the correct project:

- repository full name;
- branch;
- package/app/project name;
- production URL if known;
- default branch or expected base branch;
- relevant project instructions such as `AGENTS.md`.

If the workspace is wrong, stop immediately and report `wrong repo/context`.

A task completed in the wrong repo is not complete, even if the Codex/agent UI says `Completed`.

## 5. Production debug chain

For live production issues, prove source-of-truth before business logic:

`repo main -> deploy/provider metadata -> live /status endpoint -> audit/debug endpoint -> screenshot/user report`

Then prove the failing layer:

`deploy/source -> UI -> API route -> provider/import -> normalization -> ledger save -> balance -> analytics`

The exact chain can vary by project, but the agent must explicitly name the first layer that fails.

## 6. Evidence requirements

For each suspected issue, report:

- failing layer;
- evidence for;
- evidence against;
- confidence: high / medium / low;
- exact file/function/pattern when known;
- what to verify live;
- what evidence is missing.

Do not present a guess as a proven root cause.

Use `likely bug in [layer], needs verification` when evidence is incomplete.

## 7. API/runtime error protocol

For runtime/API/provider errors, always capture:

- live URL;
- endpoint;
- method;
- HTTP status;
- content-type;
- first 300 body characters when failing or non-JSON;
- how code parses the response;
- whether the route expects GET, POST, OPTIONS, or another method.

A `405` on GET is not automatically a bug if the route is POST-only.

For errors like `Unexpected token ... is not valid JSON`, check:

- `JSON.parse(...)`;
- `response.json()`;
- SSE/tool/MCP/plain-text parsing;
- provider plain text/HTML/auth error;
- platform/plain text deploy errors.

Provider non-JSON responses must become structured JSON errors with a short sanitized excerpt.

Structured provider error shape:

```json
{
  "ok": false,
  "provider": "paypal",
  "status": 401,
  "contentType": "text/html",
  "error": "Provider returned non-JSON response: short redacted excerpt",
  "retryable": false
}
```

Do not expose raw HTML, raw `SyntaxError`, bearer tokens, cookies, client secrets, refresh tokens, private keys, or full provider pages.

## 8. Finance/data invariants

For finance, ledger, payment, provider, balance, or analytics systems:

- balance is a critical invariant;
- never change balance semantics to fix a UI issue;
- never infer net from gross when fee is unknown unless the contract explicitly allows it;
- keep gross, fee, net, source, currency, and direction semantics separate;
- preserve `sourceTransactionId` / raw provider transaction id;
- determine direction from original sign before `Math.abs` when sign matters;
- do not exclude valid rows from balance only because their source label is low quality;
- separate runtime fix from data migration/backfill;
- any data repair must have dry-run, exact target rows, guard conditions, and apply confirmation.

For Ezohata Ledger and similar payout/order systems, preserve these invariants unless the calculation layer is proven wrong:

```text
paidTotalDisplay = abs(paidTotalSigned)
orders70Percent = ordersTotal * 0.7
payRemainingSigned = orders70Percent - paidTotalDisplay
payRemainingDisplay = abs(payRemainingSigned)
```

If `amount_net` or a ledger-v2 contract is not proven in the current production flow, mark it as `needs verification`.

## 9. Reverse-math guard for money bugs

When a displayed amount disagrees with a raw source amount, start with one-row arithmetic before broad code inspection:

1. Pick one concrete row/date/client/channel.
2. Record raw amount, currency, displayed amount, rate, and derived amount.
3. Compute implied rate and error ratio.
4. Check whether the rate is realistic.
5. Only then decide whether the failing layer is source data, formula, normalization, or UI.

This prevents fixing JavaScript when the actual issue is a bad rate cell or source formula.

## 10. Prompt quality standard

A high-quality Codex/agent prompt must include:

- repo;
- live URL if applicable;
- exact user report or audit snapshot as source;
- task objective;
- exact failing layer to prove first;
- files/functions/patterns to inspect;
- data flow chain;
- constraints and non-goals;
- what not to change;
- minimal patch requirement;
- tests to add or update;
- commands to run;
- live verification steps;
- required final output.

Every debugging prompt should include the sentence:

```text
First prove the failing layer before patching.
```

A prompt should avoid broad requests like `fix it` unless it also contains a proof and verification plan.

## 11. Codex work-management protocol

Codex should not be used as a black box that simply says `Completed`.

Every Codex task must produce or link to:

- verified repo and branch;
- PR or commit;
- changed files;
- root cause/failing layer;
- tests/checks run;
- live verification when applicable;
- remaining risks;
- whether any migration/backfill is needed.

If Codex completes without a report, the task is not trusted until GitHub/CI/live evidence proves it.

A high-quality Codex execution loop:

```text
1. Read project memory.
2. Verify repo/source/live target.
3. Check dirty worktree.
4. Create fresh branch/worktree from current main.
5. Prove failing layer.
6. Patch minimally.
7. Add tests.
8. Run checks.
9. Open PR.
10. Check CI/Vercel.
11. Merge only when safe.
12. Verify production deploy when relevant.
13. Update project memory/log.
14. Report risks and next action.
```

## 12. Minimal safe patch rule

Prefer the smallest patch that fixes the proven layer.

Default limit: no more than 3 key files unless justified.

Do not rewrite architecture, rename broad modules, or change source-of-truth contracts unless the root cause requires it and tests prove the migration path.

Patch observability or diagnostics before changing business semantics when the root cause is not yet proven.

If the current checkout is dirty, use a clean branch/worktree and do not mix unrelated changes.

If a branch becomes stale, recreate or rebase before opening a PR. Do not ship stale diff against an outdated `main`.

## 13. Testing standard

Every fix should include regression coverage close to the failing layer.

Minimum useful tests:

- the exact failing fixture;
- one edge case;
- one guard against the dangerous regression.

For production systems, also run project-level checks such as:

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build
```

Use the project’s actual commands when different.

If a check is not run, state why.

## 14. Live verification standard

For production fixes, report before/after evidence:

- expected deploy commit;
- live deploy commit;
- endpoint status/content-type;
- first 300 body characters when relevant;
- relevant JSON fields;
- UI behavior if browser verification is required;
- warning if production is stale.

A PR merged to main is not the same as production verified.

## 15. Debug bundle standard

Projects should provide a single evidence command or endpoint when possible, such as:

```bash
npm run debug:bundle -- --period=<period>
```

or:

```text
/api/debug-full?from=YYYY-MM-DD&to=YYYY-MM-DD
```

The bundle should collect:

- status/deploy evidence;
- audit snapshot;
- UI/server aggregate state;
- warnings;
- problem codes;
- classification: source ok / deploy mismatch / needs verification.

Agents should use the bundle before patching production bugs.

## 16. Reporting format

For production/debug tasks, the final report should include:

1. Brief understanding.
2. Root cause / failing layer.
3. Evidence for and against.
4. Changed files.
5. Minimal safe fix.
6. Tests/checks run.
7. Checks not run.
8. Live verification.
9. Data migration/backfill: yes/no.
10. Remaining risks.
11. Next action or Codex continuation prompt if incomplete.
12. Project memory update status.

Avoid vague reports like `fixed`, `done`, or `should work`.

## 17. When to ask questions

Do not ask questions when a safe next step exists.

Ask only when all are true:

- the missing detail blocks safe progress;
- guessing could corrupt data, money, production, credentials, or user trust;
- the decision cannot be recovered with a small reversible patch or a `needs verification` note.

Otherwise proceed with best effort and document assumptions.

## 18. Safety and privacy

Never expose private configuration values, provider credentials, cookies, private keys, full provider payloads, account numbers, or private user data.

Use sanitized excerpts and safe row identifiers.

Do not ask users to paste secrets into chat. If an env/config issue is suspected, ask them to verify presence or use the platform’s secure secret manager.

## 19. Memory update standard

After meaningful work, update or propose updates to project memory:

- `PROJECT.md` for repo, live URL, status, hosting, env names, important files, and next actions;
- `STATE.md` for current focus, active issues, risks, and next actions;
- `LOG.md` for dated evidence and completed tasks;
- `SYSTEM_MAP.md` for runtime/data flow changes;
- `DATA_SCHEMA.md` for schema/data-contract changes;
- `DEBUG_PROTOCOL.md` for debug flow changes;
- `KNOWN_BUGS.md` for durable risks/regressions;
- `CODEX_BRIEF.md` for operational guidance.

Unknowns must be marked as:

```text
needs verification
```

Memory should contain durable facts and guardrails, not raw logs or secrets.

## 20. Codex Intelligence scoring rubric

Use this rubric to evaluate agent/debugger quality and feed dashboards such as `brain-management`.

Scores are 0–100. Missing proof should reduce score even if the final patch works.

### Root Cause Discipline

Measures whether the agent proved the failing layer before patching.

Inputs:

- failing layer identified;
- evidence-for count;
- evidence-against count;
- root cause confidence stated;
- exact file/function/pattern found;
- no patch before proof;
- layer chain used.

### Live Verification

Measures whether the agent verified production/source-of-truth.

Inputs:

- `/api/status` or equivalent checked;
- deploy commit checked;
- CI/Vercel/GitHub status checked;
- endpoint status/content-type/body excerpt captured;
- production/source mismatch detected when present;
- after-merge production verification performed when relevant.

### Finance Safety

Measures whether money/data invariants were protected.

Inputs:

- balance logic changed: yes/no;
- amount/net/gross/fee semantics respected;
- source transaction id preserved;
- signed/display semantics preserved;
- valid rows not excluded for weak source labels;
- data migration separated from runtime fix.

### Patch Discipline

Measures whether the patch was minimal and focused.

Inputs:

- files changed count;
- unrelated changes avoided;
- stale branch detected/recreated;
- dirty worktree avoided;
- tests added near failing layer;
- no broad rewrite without proof.

### Provider Robustness

Measures provider/API error safety.

Inputs:

- non-JSON provider responses structured;
- no raw HTML;
- no raw SyntaxError;
- token/secret redaction;
- provider/status/content-type/excerpt included.

### Trustworthiness / Needs Verification

Measures honesty and uncertainty handling.

Inputs:

- `needs verification` used for unproven facts;
- checks not run reported;
- unsupported claims avoided;
- source freshness stated;
- risks separated from facts.

### Autonomy

Measures whether the agent can run the work loop without unnecessary friction.

Inputs:

- project memory read;
- fresh branch/worktree created;
- PR opened;
- CI/Vercel checked;
- safe PR merged when allowed;
- production deploy checked;
- project memory updated/proposed.

### Speed / Friction

Measures time and interaction cost without rewarding unsafe shortcuts.

Inputs:

- time to first useful root-cause hypothesis;
- time to PR;
- number of user turns needed;
- number of stale-branch retries;
- number of tool errors recovered;
- unnecessary clarifying questions avoided.

## 21. Codex Intelligence Index

For dashboard use, compute a weighted aggregate:

```text
Root Cause Discipline: 25%
Live Verification: 20%
Finance Safety: 20%
Patch Discipline: 15%
Trustworthiness: 10%
Autonomy: 5%
Speed: 5%
```

Provider Robustness can be included as part of Finance Safety for finance/provider projects or as a separate score card when provider work is central.

Suggested dashboard cards:

- Codex Intelligence Index;
- Root Cause Score;
- Live Verification Score;
- Finance Safety Score;
- Patch Discipline Score;
- Provider Robustness Score;
- Trustworthiness Score;
- Autonomy Score;
- Speed Score.

Suggested recent-task columns:

```text
date
project
issue/PR
task
failing layer
root cause confidence
files changed
checks run
Vercel/CI status
live verified
score
risks
```

Suggested quality flags:

- patched before proof;
- no live check;
- no tests;
- stale branch used;
- changed finance semantics;
- raw provider error exposed;
- missing project memory update;
- unsupported certainty.

## 22. Quality checklist

Before final answer, the agent should self-check:

- Did I prove the repo/source?
- Did I prove the failing layer?
- Did I avoid unsupported certainty?
- Did I preserve core invariants?
- Did I use the smallest safe patch?
- Did I add tests?
- Did I run or clearly defer checks?
- Did I separate runtime fix from data migration?
- Did I provide live verification or a clear blocker?
- Did I update or propose project memory updates?
- Did I provide a concrete continuation prompt if anything remains?

## 23. Golden rule

A smart agent does not just generate code. A smart agent proves where the failure is, changes the smallest safe thing, verifies the result, and leaves the system easier to debug next time.
