# Agent Memory Metrics

This file tracks whether saved rules are applied and whether they still work.

Use it during `/learn-pass` and `/memory-review`. Do not load it by default during ordinary delivery/audit work.

---

## Metrics entry template

```md
## Rule: <title or stable id>

Scope: ...  
Status: active | candidate | needs_revision | archived | replaced  
Times applied: 0  
Failures after application: 0  
Last applied: never  
Confidence: low | medium | high  

Evidence:
- task / PR / issue / correction

Decision:
- keep | revise | promote | archive | replace

Next check:
- What future agents should verify next time this rule is relevant.
```

---

## Maintenance notes

- Increment `Times applied` only when a rule was intentionally used.
- Increment `Failures after application` when the rule was used but did not prevent a repeat issue.
- Mark `needs_revision` when wording is too vague, scope is wrong, or checks are not observable.
- Prefer revising or archiving weak rules over adding more active rules.
