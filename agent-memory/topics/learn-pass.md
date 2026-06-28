# learn-pass memory

## 2026-06-28 — Chat-reported lessons should be written automatically

Type: rule  
Memory type: procedural  
Scope: ChatGPT / learn-pass  
Priority: high  
Status: active  

Lesson:
When the user reports a reusable lesson in the current chat, ChatGPT should write it to accessible project memory without requiring an explicit `/save` command.

Apply when:
- The user reports that a rule was not applied.
- The user reports that a project lesson should have been remembered.
- The user reports a repeatable workflow issue.

Check:
- Relevant `agent-memory` files are updated when repository access is available.
- If writing is unavailable, provide a patch-ready update.
- Final response includes an `Auto memory update` section.
