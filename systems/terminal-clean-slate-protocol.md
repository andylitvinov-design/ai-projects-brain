# Terminal Clean Slate Protocol

Use this protocol whenever Andrey asks for a terminal prompt, bash script, CLI command, git command, Codex command, PR/push command, deployment command, or recovery command.

This protocol is mandatory for ChatGPT, Codex, Claude, and any project agent working on Andrey's repositories.

## Core rule

Always assume a fresh terminal window with zero useful context.

Never assume:

- current directory;
- existing local branch;
- existing worktree path;
- `/tmp` or `/private/tmp` still exists;
- previous shell variables;
- previous partial command succeeded;
- local repo is the intended repo;
- local `main` is usable;
- the commit hash exists locally or remotely;
- GitHub branch is already pushed.

## Required command structure

Every terminal prompt must be one complete self-checking script.

It must:

1. start with safe shell settings when useful:

```bash
set -euo pipefail
```

2. define repo/branch constants explicitly:

```bash
REPO_FULL="andylitvinov-design/reiki-yggdrasil"
REPO_URL="https://github.com/andylitvinov-design/reiki-yggdrasil.git"
BRANCH="..."
```

3. find or create the correct repo/worktree;
4. verify the remote URL matches the expected repo;
5. verify the branch exists before using it, or create it from `origin/main`;
6. verify whether the target commit exists before using it;
7. never run git commands in `$HOME` by accident;
8. print `pwd`, branch, remote, and recent commits before push/PR;
9. fail with a clear message if required state is missing;
10. include the full push/PR/check flow if that is the requested task.

## Clean terminal prompt for existing local worktree

If the task depends on a previously created worktree, the script must first search for it.

Search common locations:

```bash
$HOME/.config/superpowers/worktrees
$HOME/codex-workspace
$HOME/projects
$HOME/Desktop
$HOME/Documents
$HOME/Downloads
/private/tmp
/tmp
```

If the worktree is not found, the script must not continue in `$HOME`.

It must stop and say:

```text
Expected worktree was not found. Do not push from this directory.
```

## Clean terminal prompt for push/PR

Before `git push`, the script must verify:

```bash
git -C "$REPO" rev-parse --is-inside-work-tree
git -C "$REPO" remote -v
git -C "$REPO" branch --show-current
git -C "$REPO" status --short
git -C "$REPO" log --oneline -5
```

It must verify that the remote contains the expected repo name.

It must not push if:

- not inside the expected repo;
- current directory is `$HOME`;
- branch does not match the target branch;
- target commit is missing and the task depends on it;
- worktree is dirty unless the script intentionally stages/commits.

## Clean terminal prompt for missing temp worktree

If the previous worktree was in `/private/tmp` or `/tmp`, always assume it may be gone after reboot.

A recovery script must:

1. search for the worktree;
2. check whether the branch/commit exists on remote;
3. if neither exists, clearly say the local work was lost and must be recreated from the issue/docs;
4. never silently create an empty branch and push it as if it contained the work.

## Forbidden prompt pattern

Do not give a prompt that starts like this unless the path was just verified in the same script:

```bash
cd /private/tmp/some-worktree
git push ...
```

Do not give commands that continue after `cd` fails.

Do not give commands that can accidentally run `git status`, `git push`, or `gh pr create` from `$HOME`.

## Required recovery behavior after failure

If Andrey pastes output showing:

```text
cd: no such file or directory
fatal: your current branch 'main' does not have any commits yet
no git remotes found
```

The agent must immediately identify the root cause:

```text
The script ran from the home directory because the expected worktree path did not exist.
```

Then the agent must provide a fresh clean-slate finder/recovery script, not blame the user and not continue from the wrong directory.

## Permanent phrasing requirement

When giving terminal prompts to Andrey, include a line like:

```text
This script refuses to continue if it is not inside the expected repo.
```

## Goal

Terminal prompts must be safe for copy-paste from a brand-new terminal window, even if:

- the machine rebooted;
- `/tmp` was cleaned;
- the branch exists only locally;
- the branch exists only remotely;
- the current folder is wrong;
- the previous paste failed halfway;
- another worktree already uses `main`.
