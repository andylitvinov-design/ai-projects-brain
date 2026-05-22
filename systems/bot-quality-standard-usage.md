# Bot Quality Standard Usage Guide

Use this file when creating, configuring, or reviewing bots and coding agents.

## Canonical standard

- GitHub: https://github.com/andylitvinov-design/ai-projects-brain/blob/main/systems/agent-thinking-quality-standard.md
- Raw for agents: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-thinking-quality-standard.md

Related files:

- Agent start guide: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/START-HERE-FOR-AGENTS.md
- General agent rules: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md
- Production debug protocol: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md
- Codex project workflow: https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/codex-project-workflow.md

## Required setup instruction

Add this block to every coding/debugging bot, Codex task template, ChatGPT Project instruction, Claude Code instruction, and repo-local `AGENTS.md` when the bot may inspect code, create patches, review PRs, debug production, or write prompts:

```text
Follow the Agent Thinking Quality Standard before debugging, patching, reviewing, writing Codex prompts, or managing engineering tasks:
https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-thinking-quality-standard.md

For production or live bugs, also follow the Production Debug Protocol:
https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/production-debug-protocol.md

Core rule: First prove the failing layer before patching.
```

## Where this must be referenced

Reference the standard in:

- ChatGPT Project instructions for engineering/debugging agents;
- Codex Cloud templates;
- repo-local `AGENTS.md`;
- project `CODEX_BRIEF.md`;
- PR templates for production repositories;
- Claude Code project instructions;
- automation prompts that create branches, PRs, audits, fixes, or deploy checks;
- any bot that coordinates other bots.

## Placement rule

Put the reference near the top of the instruction set, before project-specific tactics.

Reason: the quality standard defines the thinking method. Project-specific instructions define the local implementation details.

## Minimal bot checklist

A configured bot should be able to answer:

1. Which repo/project am I working in?
2. What is the source of truth?
3. What is the first failing layer?
4. What evidence supports it?
5. What evidence argues against it?
6. What is the smallest safe patch?
7. What checks must run?
8. What live verification is required?
9. What remains `needs verification`?
10. What must be reported back to the user?

## Required final report shape

Bots should not finish with only `done` or `completed`.

Required final report:

- verified repo and branch;
- root cause / failing layer;
- evidence before patch;
- changed files;
- tests or checks run;
- live verification when applicable;
- PR or commit link;
- remaining risks;
- next action if incomplete.

## Codex task quality rule

A Codex task is not accepted as finished until one of these exists:

- merged PR with checks and final report;
- open PR with exact remaining checks;
- explicit `needs verification` report with blocker and next action.

A UI label such as `Completed` is not enough by itself.
