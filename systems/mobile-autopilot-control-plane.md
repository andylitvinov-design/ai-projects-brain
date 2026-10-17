# Mobile Autopilot Control Plane

Use this mode when Andrey wants to manage implementation work from ChatGPT web/mobile without opening a local editor or manually launching Codex on the Mac.

## User experience

The default interaction is plain language.

Examples:
- `В Finance добавь фильтр по месяцу и проверь мобильную версию.`
- `На TorontoTantra поправь меню и выложи preview.`
- `Проверь Psihotavr после последнего PR и исправь очевидные регрессии.`

The user does **not** need to write `/delivery`, a technical Codex prompt, branch names, test commands, or repository paths.

## Control-plane flow

For every implementation request:

1. Route the wording through `projects/index.md` and the project capsule.
2. Resolve the canonical repo, base branch, hosting, checks, risk boundaries, and deployment path.
3. Prefer Codex Cloud Repo Mode when a cloud environment exists for the canonical repository.
4. Otherwise use the connected GitHub/plugin tools for safe read-only work, focused branch/file changes, issues, PRs, and CI inspection that can be completed without a local host.
5. Never require the local Mac merely because a historical workflow used it.
6. For a normal safe task, continue autonomously through:
   - inspect;
   - branch;
   - implement;
   - test/check;
   - push;
   - PR;
   - preview/readback when available;
   - concise report.
7. Ask only at a genuine risk boundary defined by `systems/autonomous-project-executor.md`.

## Phone-first routing rule

When the user sends a request from ChatGPT mobile/web:

- identify the project from its name, alias, URL, feature, or recent context;
- do not ask the user to open Codex Desktop;
- do not ask the user to translate the request into a Codex prompt;
- do not ask for repo/branch/test commands already present in project memory;
- if one project is clearly identified, start the safe execution path immediately;
- if the requested task spans projects, split it into per-project workstreams and keep source/deploy boundaries separate.

## Cloud-ready requirement

Full remote code execution without the Mac requires a Codex Cloud environment mapped to the canonical GitHub repository.

Repo-side instructions cannot create or authorize a cloud environment. One-time environment setup is therefore a platform prerequisite, not a recurring user task.

Track each active project as one of:

- `CLOUD_READY` — Codex cloud environment mapped and verified;
- `CONNECTOR_READY` — GitHub/provider tools can perform useful work, but no full Codex cloud runtime is verified;
- `LOCAL_ONLY` — an essential step still depends on the local Mac;
- `NEEDS_VERIFICATION` — current launch path is unknown.

Prefer moving active projects from `LOCAL_ONLY` or `NEEDS_VERIFICATION` to `CLOUD_READY`.

## Safe default autonomy

Without an additional project-specific delegation, the default automated boundary is:

**plain-language request -> branch -> implementation -> checks -> PR/preview -> report**

Production deploy, merge to the production branch, secrets/env changes, destructive data operations, billing/account/access changes, or irreversible operations remain governed by the existing risk rules.

A project may explicitly grant a narrower trusted auto-deploy policy in its own `AUTONOMY.md` or repo `AGENTS.md`.

## Project launch contract

For every active project that should work from the phone, memory should record:

- `project_id`
- canonical GitHub repository
- base branch
- cloud environment label
- working branch convention
- checks/tests
- preview mechanism
- production deploy path
- whether local Mac is required
- allowed autonomous actions
- actions requiring owner approval

Do not duplicate secrets or credential values.

## Failure behavior

If a task cannot complete remotely:

1. complete every independent safe step first;
2. state the exact missing capability;
3. distinguish a missing cloud environment from missing repo access, provider auth, production permission, or owner-only 2FA;
4. do not tell the user to sit at the computer unless the unresolved step genuinely requires it;
5. leave a branch/PR/issue or exact resumable state when possible.

## Recurring automation layer

Scheduled maintenance is separate from on-demand phone execution.

Good recurring candidates include:
- morning PR/CI sweep;
- production health checks;
- failed-deployment alerts;
- stale project-memory review;
- weekly UI/regression audit;
- dependency/security checks.

Create recurring automations only when the user asks for that cadence. Keep each automation project-scoped or portfolio-scoped with explicit safe boundaries.

## Success criterion

The target experience is:

**Andrey speaks or types one ordinary sentence on the phone -> ChatGPT routes it -> cloud/connected agents perform the safe implementation workflow -> Andrey receives the finished PR/preview/live result or one precise unavoidable approval request.**


## Codex Cloud launch visibility

Whenever a plain-language request is actually dispatched into a Codex Cloud task, tell Andrey immediately and explicitly:

`Запущено в Codex Cloud: <project>`

Do not use that phrase for ordinary ChatGPT discussion, direct GitHub connector edits, read-only checks, or planning that did not create a Codex Cloud task.

When the Codex Cloud task reaches a terminal result, report:

`Codex Cloud готов: <short result>`

If it fails or is blocked, say so explicitly instead of implying completion. This launch/completion notice is the user's allowance-visibility boundary.
