# Remote PR Auto-Creation Contract

## Purpose

Prevent delivery chains from stopping after a local commit, local branch, pushed branch, compare URL, or manual "Create PR" button.

## Mandatory rule

For every task whose completion requires a pull request:

1. The agent must check whether the intended head branch exists in the canonical remote repository.
2. The agent must search for an existing open or recently closed PR with the same head branch, issue, failure class, or intended files.
3. If an equivalent PR exists, reuse it. Do not create a duplicate.
4. If the remote branch exists and no PR exists, the agent must create the PR itself through the available GitHub API, connector, CLI, or authenticated repository tool.
5. A compare URL or visible `Create PR` button is not completion evidence.
6. Do not ask Andrey to click `Create PR` when a GitHub write-capable connector or API is available.
7. If the local environment cannot push but another connected tool can write to GitHub, switch tools and continue.
8. If no available tool can create the PR, persist the patch/branch details and finish with `PR_CREATION_BLOCKED`, naming the exact missing permission. Do not report `PR_CREATED`.

## Evidence ladder

A PR is considered created only when all are recorded:

- canonical repository;
- base branch;
- remote head branch;
- remote head SHA;
- accessible GitHub PR URL;
- PR number;
- PR state.

## Automatic fallback order

Use the first available method:

1. GitHub connector `create_pull_request`.
2. GitHub CLI `gh pr create`.
3. GitHub REST/GraphQL API.
4. Repository platform PR action.

Do not stop at a local `make_pr` helper if its output is not independently visible on GitHub.

## Duplicate handling

If PR creation returns `A pull request already exists`:

- search the canonical repository;
- recover the existing PR number and URL;
- continue checks/merge from that PR;
- treat this as successful recovery, not as a blocker.

If PR creation returns `head invalid`:

- verify the remote branch exists;
- if local only, push it through an available remote-write tool;
- otherwise classify `REMOTE_PUSH_BLOCKED`.

## Completion states

Allowed:

- `PR_CREATED_VERIFIED`
- `PR_REUSED_VERIFIED`
- `PR_CREATION_BLOCKED`
- `REMOTE_PUSH_BLOCKED`

Forbidden from local-only evidence:

- `PR_CREATED`
- `DELIVERY_COMPLETE`
- `MERGED`
- `LIVE`

## Replay case

Scenario:

- local commit exists;
- remote branch later appears;
- compare page shows a manual Create PR button;
- GitHub connector is available.

Expected behavior:

- agent searches for an existing PR;
- if none exists, agent creates it automatically;
- records the real PR URL and number;
- continues to checks and merge;
- does not ask Andrey to press the button.
