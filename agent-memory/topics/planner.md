# planner memory

## 2026-06-28 — /planner should return one Codex-ready prompt by default

Type: workflow_rule  
Memory type: procedural  
Scope: /planner / Codex handoff  
Priority: high  
Status: active  

User signal:
The user corrected that `/planner` should not require manual GitHub issue creation or a two-artifact workflow by default.

Lesson:
For this user, `/planner` should normally output one copy-paste-ready prompt for Codex or Claude Code. If an issue, branch, PR, or tracking artifact is needed, the prompt should instruct Codex to create it during execution.

Apply when:
- User invokes `/planner`.
- User asks for a plan that will be executed in Codex or Claude Code.
- A task might need issue/branch/PR tracking but the user did not explicitly ask to create the issue manually.

Check:
- Final output contains one clear Codex-ready prompt.
- The user is not asked to manually create a GitHub issue first.
- Issue/branch/PR creation, if needed, is delegated inside the Codex prompt.
- Do not provide separate `Issue body` plus separate `/delivery` prompt unless the user explicitly asks for that format.

Failure if ignored:
- The user gets unnecessary manual steps and the workflow breaks into multiple artifacts instead of one executable prompt.

Anti-pattern:
- First create a GitHub issue, then paste its link into a second `/delivery` prompt.

Preferred pattern:
- Here is one prompt for Codex. Paste it as-is.
