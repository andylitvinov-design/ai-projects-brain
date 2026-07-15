# Delivery failure classes

## LOCAL_ONLY_DELIVERY_ARTIFACT

**Status:** active durable lesson  
**First confirmed:** 2026-07-15  
**Scope:** `/delivery`, Codex Cloud, local Codex, automation handoffs, PR/deploy pipelines

### Observed failure

A Codex run correctly diagnosed and repaired the dashboard pipeline, passed local checks, and created local commit `e65c76d`, but the checkout had no configured remote and the commit never reached GitHub. The run still produced PR-like metadata and a detailed completion report. Later agents assumed the commit/PR could be found and merged, but the artifact did not exist remotely.

### Root cause

The harness treated these as nearly equivalent:

- local commit created;
- branch pushed to the canonical remote;
- GitHub PR URL exists;
- PR merged into the canonical production branch;
- deployment/live verification completed.

They are separate delivery stages. Local success was reported without proving remote persistence.

Contributing conditions:

1. The execution environment had no `origin` remote, GitHub CLI, or permitted outbound GitHub API access.
2. A local helper reported that PR metadata was created, but no accessible GitHub PR URL was verified.
3. The final status allowed `BLOCKED` after local implementation instead of requiring an explicit `LOCAL_ONLY_DELIVERY_ARTIFACT` state.
4. The next agent trusted a SHA from prose before searching the remote repository.
5. The original prompt did not include a hard stop rule prohibiting local-only completion.

### Permanent rule

For any task that requires GitHub delivery, the following evidence ladder is mandatory:

```text
local_change
-> local_checks_passed
-> remote_branch_verified
-> remote_pr_verified
-> canonical_merge_verified
-> deploy_identified
-> live_verified_when_required
```

A stage is `verified` only with an externally resolvable identifier:

- remote branch: canonical repository + branch name + remote head SHA;
- PR: accessible `https://github.com/<owner>/<repo>/pull/<number>`;
- merge: merge/base SHA reachable from canonical production branch;
- deploy: provider deploy ID + source commit/branch;
- live: public behavior or timestamp matches the canonical source.

### Forbidden claims

Do not report any of these from a local commit or local helper metadata alone:

- `PR created`;
- `pushed`;
- `merged`;
- `deployed`;
- `LIVE`;
- `delivery complete`.

`make_pr`, a local PR description, a local SHA, or a branch name without remote lookup is not remote evidence.

### Required preflight

Before editing, record:

```text
canonical_repo
canonical_default_branch
remote_present: yes/no
remote_write_available: yes/no/unknown
github_pr_write_available: yes/no/unknown
provider_deploy_available: yes/no/unknown
```

If remote delivery is required and remote write is unavailable:

1. Continue safe diagnosis and implementation only when preserving the patch is possible.
2. Export a patch or exact changed-file content.
3. Report `LOCAL_ONLY_DELIVERY_ARTIFACT` or `OWNER_ACTION_REQUIRED`.
4. Do not create a success-looking local commit as the only handoff unless its patch is also persisted in an accessible artifact.
5. Prefer working in a connected GitHub/Codex Cloud environment from the start.

### Required postcondition

Before finishing a delivery run, query the remote independently:

1. Search the commit SHA in the canonical repository.
2. Resolve the remote branch head.
3. Open the PR by repository and number.
4. Verify the PR base is the canonical production branch.
5. After merge, verify reachability from the production branch.
6. When live is required, verify the provider deploy and public state.

If any required stage is missing, final state must be one of:

- `LOCAL_ONLY_DELIVERY_ARTIFACT`;
- `REMOTE_PUSH_BLOCKED`;
- `PR_CREATION_BLOCKED`;
- `MERGE_BLOCKED`;
- `MERGED_NOT_LIVE`;
- `LIVE_VERIFICATION_BLOCKED`.

### Replay test

Given an environment where:

- local edits and commits work;
- no `origin` remote exists;
- GitHub CLI/API write is unavailable;
- a local helper emits PR metadata;

Expected behavior:

- local tests may be reported as passed;
- the agent must not claim that a remote PR exists;
- the agent searches the canonical GitHub repository and confirms absence;
- status is `LOCAL_ONLY_DELIVERY_ARTIFACT`;
- the handoff contains an accessible patch or a prompt that reproduces the change from fresh remote `main`;
- the next run begins by reconciling the missing remote artifact, not by trying to merge the local SHA.

### Metrics affected

- First-pass accepted completion
- End-to-end completion
- False-success count
- Live completion rate
- Avoidable handoff rate
- Evidence completeness
- Learning closure rate
- Recurrence prevention rate

### Review condition

Promote this lesson from `active` to `proven` after at least three delivery runs correctly reject local-only PR/merge claims and successfully use remote proof gates.
