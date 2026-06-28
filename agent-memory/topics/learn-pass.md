# learn-pass memory

## 2026-06-28 — Chat-reported and assistant-admitted lessons should be written automatically

Type: rule  
Memory type: procedural  
Scope: ChatGPT / learn-pass / auto-memory  
Priority: high  
Status: active  

Lesson:
When the user reports a reusable lesson in the current chat, or when the assistant itself admits a reusable workflow error, ChatGPT should write it to accessible project memory without requiring an explicit `/save` command.

Apply when:
- The user reports that a rule was not applied.
- The user reports that a project lesson should have been remembered.
- The user reports a repeatable workflow issue.
- The assistant says it made a workflow error, used the wrong format, missed a required step, or gave a response that creates unnecessary manual work for the user.
- The issue affects `/planner`, `/delivery`, `/audit`, `/critic`, `/save`, `/learn-pass`, `/memory-review`, or `/upgrade`.

Check:
- Relevant `agent-memory` files are updated when repository access is available.
- If writing is unavailable, provide a patch-ready update.
- Final response includes an `Auto memory update` section.
- Do not merely apologize or explain; write the reusable lesson.

Failure if ignored:
- The assistant repeats workflow mistakes and the memory system remains manual instead of self-learning.
