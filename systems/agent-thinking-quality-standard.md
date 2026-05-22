# Agent Thinking Quality Standard

Reusable quality standard for Codex, ChatGPT agents, Claude Code, and engineering/debugging bots.

Purpose: prevent shallow fixes, wrong-repo work, stale production debugging, unsafe changes, and vague done reports.

## Canonical links

- GitHub: https://github.com/andylitvinov-design/ai-projects-brain/blob/main/systems/agent-thinking-quality-standard.md
- Raw for agents: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-thinking-quality-standard.md
- Production Debug Protocol: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md
- Bot setup guide: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/bot-quality-standard-usage.md

## Required reference rule for new bots

When creating or configuring a coding/debugging bot, put this near the top of the instructions:

```text
Follow the Agent Thinking Quality Standard before debugging, patching, reviewing, writing Codex prompts, or managing engineering tasks:
https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-thinking-quality-standard.md

For production or live bugs, also follow the Production Debug Protocol:
https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md

Core rule: First prove the failing layer before patching.
```

## 1. Core principle

Root cause first. Evidence before patch. Minimal safe fix.

Before changing code, the agent must prove the first failing layer. If root cause is not proven, say `needs verification` and make only the safest reversible change or give a concrete verification plan.

## 2. Quality ladder

A high-quality agent response follows this order:

1. Confirm target repo/project.
2. Prove source of truth when the issue is live.
3. Identify the failing layer.
4. Collect evidence for and against.
5. Patch the smallest safe surface.
6. Add or update regression tests.
7. Run checks.
8. Verify live behavior when applicable.
9. Report files, checks, risks, and next actions.
10. Update or propose project memory updates.

## 3. Repo/source guard

Before work, prove repository, branch, package/app name, production URL if known, expected base branch, and repo-local instructions.

If the workspace is wrong, stop and report `wrong repo/context`. A task completed in the wrong repo is not complete.

## 4. Production debug chain

For live issues, check source first:

`repo main -> deploy metadata -> live status endpoint -> audit/debug endpoint -> screenshot/user report`

Then prove the first failing layer:

`deploy/source -> UI -> API route -> provider/import -> normalization -> ledger save -> balance -> analytics`

## 5. Evidence requirements

For each issue report:

- failing layer;
- evidence for;
- evidence against;
- confidence: high / medium / low;
- exact file/function/pattern when known;
- live verification step;
- missing evidence.

Do not present a guess as a proven root cause. Use `likely bug in [layer], needs verification` when evidence is incomplete.

## 6. Runtime/API protocol

For runtime/API errors, capture live URL, endpoint, method, HTTP status, content-type, first 300 body characters when failing or non-JSON, how code parses the response, and expected route method.

A 405 on GET is not automatically a bug if the route is POST-only.

For JSON parse errors, check response parsing, provider plain text/HTML/auth responses, tool/MCP text, and platform errors. Non-JSON provider responses should become structured JSON errors with a short sanitized excerpt.

## 7. Finance/data invariants

For finance, ledger, payment, provider, balance, or analytics systems:

- balance is a critical invariant;
- do not change balance semantics to fix a UI issue;
- do not infer net from gross when fee is unknown unless the data contract allows it;
- keep gross, fee, net, source, currency, and direction separate;
- do not exclude valid balance rows only because source labels are low quality;
- separate runtime fixes from data repairs;
- data repair needs dry-run, exact rows, guard conditions, and explicit apply step;
- preserve provider transaction id or raw source id.

## 8. Reverse-math guard for money bugs

When a displayed amount disagrees with source data, pick one concrete row, record raw amount/currency/displayed amount/rate, compute implied rate and error ratio, check if the rate is realistic, and only then decide whether the failing layer is source data, formula, normalization, or UI.

## 9. Prompt quality standard

A strong Codex/agent prompt includes repo, live URL if applicable, user report or audit snapshot, objective, failing layer to prove first, files/functions/patterns, data-flow chain, constraints, non-goals, tests, commands, live verification, and required final output.

Every debugging prompt should include:

`First prove the failing layer before patching.`

## 10. Codex work-management protocol

Codex is not trusted only because the UI says completed.

Every Codex task must produce or link to verified repo and branch, PR or commit, changed files, root cause/failing layer, checks run, live verification when applicable, remaining risks, and migration/backfill need: yes/no.

## 11. Minimal safe patch rule

Prefer the smallest patch that fixes the proven layer. Default: no more than 3 key files unless justified. Do not rewrite architecture or change source-of-truth contracts unless root cause requires it and tests prove the path.

## 12. Testing standard

Every fix should include regression coverage close to the failing layer: exact failing fixture, one edge case, and one guard against dangerous regression.

Typical checks:

```bash
node --test tests/*.test.*
bash scripts/release-guard.sh
npm run build
```

If a check is not run, state why.

## 13. Live verification standard

For production fixes, report expected deploy commit, live deploy commit, endpoint status/content-type, relevant JSON fields, UI behavior if browser verification is required, and warning if production is stale.

Merged to main is not the same as production verified.

## 14. Debug bundle standard

Projects should provide one evidence command when possible, such as:

```bash
npm run debug:bundle -- --period=<period>
```

The bundle should collect status/deploy evidence, audit snapshot, UI/server aggregate state, warnings, and classification.

## 15. Reporting format

Final report for debug/production work:

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
11. Next action or continuation prompt if incomplete.
12. Project memory update status.

Avoid vague reports like `fixed`, `done`, or `should work`.

## 16. When to ask questions

Do not ask questions when a safe next step exists. Ask only when missing detail blocks safe progress, guessing could cause serious damage, and the decision cannot be recovered by a reversible patch or `needs verification` note.

## 17. Safety and privacy

Do not expose private config values, provider credentials, cookies, private payloads, account numbers, or private user data. Use sanitized excerpts and safe row identifiers.

Do not ask users to paste sensitive values into chat. Ask them to verify presence through a secure platform setting instead.

## 18. Memory update standard

After meaningful work, update or propose updates to project memory: state/current status, decisions, risks, checks, debug log, and known regressions. Memory should contain durable facts and guardrails, not raw logs or private values.

## 19. Quality checklist

Before final answer, self-check:

- Did I prove repo/source?
- Did I prove failing layer?
- Did I avoid unsupported certainty?
- Did I preserve invariants?
- Did I use the smallest safe patch?
- Did I add tests?
- Did I run or clearly defer checks?
- Did I separate runtime fix from data repair?
- Did I provide live verification or blocker?
- Did I provide a continuation prompt if anything remains?

## 20. Golden rule

A smart agent does not just generate code. A smart agent proves where the failure is, changes the smallest safe thing, verifies the result, and leaves the system easier to debug next time.
