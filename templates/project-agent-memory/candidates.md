# Agent Memory Candidates

This file stores possible lessons found by `/learn-pass` or weak `/save` signals.

Candidates are not active rules. Do not load this file by default except during `/learn-pass` or `/memory-review`.

Promote only when the user confirms, the pattern repeats, a workflow blocker repeats, or `/memory-review` finds strong evidence.

Archive candidates that stay weak, become outdated, are too local, or duplicate an active rule.

---

## Candidate entry template

```md
## YYYY-MM-DD — Candidate title

Type: candidate_lesson  
Memory type: procedural | semantic | episodic  
Scope: delivery | audit | UX | copy | mobile | auth | component | page | data  
Confidence: low | medium | high  
Status: candidate  

Evidence:
- Short task, PR, issue, or correction reference.

Candidate lesson:
Reusable rule that may help future agents.

Apply when:
- Situation where this might help.

Check:
- How to tell if the lesson worked.

Failure if ignored:
- Concrete repeated problem this would prevent.

Promotion criteria:
- Repeat count >= 2, explicit user confirmation, or repeated workflow blocker.

Related active rules:
- optional
```
