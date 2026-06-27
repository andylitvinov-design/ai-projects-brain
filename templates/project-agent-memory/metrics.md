# Agent Memory Metrics

This file tracks whether saved rules actually help.

Use it during `/learn-pass` and `/memory-review`.

Example entry:

```md
## Rule: <title>

Scope: ...  
Status: active | candidate | needs_revision | archived  
Times applied: 0  
Failures after application: 0  
Last applied: never  
Confidence: low | medium | high  

Evidence:
- ...

Decision:
- keep | revise | promote | archive | replace
```

Do not load this file by default except during `/learn-pass` or `/memory-review`.
