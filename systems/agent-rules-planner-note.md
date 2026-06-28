# Agent Rules Planner Note

This companion note records the planner/delivery rule without rewriting the larger `systems/agent-rules.md` file.

- `/planner` is ChatGPT-side task formulation for abstract, risky, or unclear work.
- ChatGPT writes the clarified task and delivery prompt for Andrey.
- Codex executes only after Andrey sends the final `/delivery` task.
- Clear tasks should go directly to a strong delivery prompt.
- Do not create a separate prompt-audit mode.

Canonical files:

- `systems/planner-mode.md`
- `systems/chatgpt-delivery-prompt-standard.md`
- `systems/templates/planner-output-template.md`
