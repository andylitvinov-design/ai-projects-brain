# Codex Cloud Repo Mode

Use this when Andrey wants Codex to run from ChatGPT web/mobile without relying
on the local Mac host.

## Required cloud state

Codex Cloud Repo Mode requires a Codex cloud environment connected to the target
GitHub repository in ChatGPT Codex settings.

Local Codex app projects are not enough. A folder listed under a host such as
`MacBook-Air-Andrii-3.local` means Codex can work through that connected local
machine. It does not mean the repository is available as a cloud environment.

Configure cloud environments at:

- https://chatgpt.com/codex/settings/environments

## Target launch contracts

Repository: `andylitvinov-design/psihotavr`

- Base branch: `main`
- Working branch: `codex/<task-name>`
- Mode: Codex Cloud Repo Mode
- Local Mac required: no
- Output target: PR in `andylitvinov-design/psihotavr`
- Cloud environment label should be: `psihotavr`

Repository: `andylitvinov-design/finance`

- Base branch: `main`
- Working branch: `codex/<task-name>`
- Mode: Codex Cloud Repo Mode
- Local Mac required: no
- Output target: PR in `andylitvinov-design/finance`
- Cloud environment label should be: `finance`

Repository: `andylitvinov-design/ai-projects-brain`

- Base branch: `main`
- Working branch: `codex/<task-name>`
- Mode: Codex Cloud Repo Mode
- Local Mac required: no
- Output target: PR in `andylitvinov-design/ai-projects-brain`
- Cloud environment label should be: `ai-projects-brain`

## Manual setup checklist

For each target repo:

1. Open https://chatgpt.com/codex/settings/environments.
2. Select the workspace/account used on ChatGPT mobile.
3. Choose **New environment** or equivalent.
4. Connect GitHub through the ChatGPT GitHub Connector or Codex GitHub App.
5. Select the GitHub account or org `andylitvinov-design`.
6. Grant repository access to the exact repo.
7. Set the default/base branch to `main`.
8. Use a clear environment label matching the repo slug.
9. Save the environment.
10. In ChatGPT mobile, open Codex -> Cloud threads -> New cloud task and verify
    the selector shows the environment label on `main`.

Expected mobile selector after setup:

- `psitrends-work`
- `psihotavr`
- `finance`
- `ai-projects-brain`

## Verification prompt

After setup, use this prompt from ChatGPT mobile as a read-only cloud smoke:

```text
/delivery
Verify Codex Cloud Repo Mode for this repository.

Do not edit files. Do not use local Mac mode.

Report:
- repository full name;
- current branch;
- whether this is a Codex Cloud task;
- whether the repo has AGENTS.md;
- what branch name you would create for a real task;
- whether local Mac is required.
```

Success means the cloud task starts in the selected repository and can report
the repository full name and base branch without using the local host.

## Boundaries

- Do not treat local connected-host projects as cloud-ready.
- Do not store GitHub tokens or secrets here.
- If only `psitrends-work` appears in Cloud threads or New cloud task, the
  missing step is Codex cloud environment mapping, not a repo docs problem.
- Repo-side `AGENTS.md` improves behavior after a cloud environment exists, but
  it cannot create or authorize that environment.
