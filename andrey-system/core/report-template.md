# Report Writing Instructions And Templates — Andrey Li System

This file is the report-level instruction library for Report Agent.

It answers three questions:

1. Which report format should be used?
2. What must the agent check before writing this report?
3. What exact structure should the final report follow?

Report Agent is not a one-report generator. It is a multi-format client reporting agent.

Main rule:

raw client data → correct report type → pre-writing check → structured report → safe support direction → next step

Every report must connect:

pain → hidden mechanism → Dao level → Wu Xing resource → bottleneck → next realistic level → practical action

---

## 1. Three-Layer Report Architecture

### Layer 1 — Agent Instruction

Location:

`project-ready/report-agent-project-instruction.md`

Purpose:

- define Report Agent role;
- choose the correct report type;
- separate reports from business / marketing tasks;
- enforce safety and quality rules.

### Layer 2 — Report Writing Instructions

Location:

`core/report-template.md`

Purpose:

- explain how to write each report type;
- define pre-writing checks;
- define output structure;
- prevent mixing formats.

### Layer 3 — Concrete Examples

Location:

`examples/`

Purpose:

- show the final style;
- give sample wording;
- help the agent imitate structure without using private client data.

---

## 2. Report Type Routing

Choose the report type before writing.

### Express Diagnosis

Use when:

- data is limited;
- client is new;
- Andrey needs fast orientation;
- the goal is first clarity or lead generation;
- no deep previous history is provided.

Default to Express Diagnosis if the report type is unclear.

Example:

`examples/sample-express-diagnosis.md`

### Full Client Report

Use when:

- enough client data is available;
- Andrey needs a serious written report;
- the task includes diagnosis, support, plan, and tracking;
- the report may become a paid deliverable.

Example:

`examples/sample-full-client-report.md`

### Monthly Progress Report

Use when:

- there is previous data;
- the client is in ongoing support;
- the goal is to compare before/after and set the next cycle.

Example:

`examples/sample-monthly-progress-report.md`

### Remedy / Support Note

Use when:

- the task is mainly about Bach, homeopathy, oils, naturopathy, rituals, artifacts, or practices;
- a full report is not required;
- Andrey needs a short support explanation.

Example:

`examples/sample-remedy-support-note.md`

### Homeopathy Situation Decoder

Use when:

- the main input is a list of remedies;
- the task is to reconstruct psychodynamics, root conflict, adaptation strategy, and what to verify next.

Example:

`examples/sample-homeopathy-decoder.md`

---

## 3. Shared Pre-Writing Check For All Reports

Before writing any report, check:

1. What is the user asking for?
2. Which report type fits best?
3. Is this a first diagnosis, full report, progress report, support note, or remedy decoder?
4. What data is missing?
5. Can the report still be written as a hypothesis?
6. What must be marked as `needs verification`?
7. What safety limits apply?

If data is incomplete:

- do not stop;
- create a best-effort report;
- mark uncertain points as `needs verification`;
- ask only for missing data if it is critical.

Safe language:

- may support;
- can help soften;
- direction of support;
- requires verification;
- does not replace medical care.

Never:

- give medical diagnoses;
- promise cure;
- claim guaranteed result;
- expose private client data;
- use real client reports without anonymization.

---

## 4. Shared Method Logic

Use this in all report types when relevant.

### Dao Level

Define:

- current level;
- stage / image;
- what this level means;
- main task;
- risk;
- next realistic level;
- one-cycle goal.

### Hidden Mechanism

Use:

Impulse → Compression → Defense → Repetition → Exhaustion

### Wu Xing

Analyze:

- Water — energy, safety, deep reserve;
- Wood — growth, action, direction;
- Fire — expression, visibility, joy, contact;
- Earth — support, stability, receiving;
- Metal — structure, clarity, boundaries, value.

Always identify:

- strongest element;
- weakest element;
- main bottleneck;
- first element to support.

### Core Insight

Every report needs one central conclusion.

Format:

The key issue is not only _____.
The deeper mechanism is _____.
The first support should be _____.
The next movement is _____.

---

# 5. Express Diagnosis

## 5.1 Purpose

Fast orientation. Short, useful, clear.

Use it when the user gives limited data or asks for quick understanding.

## 5.2 Before Writing

Check:

- What is the client’s main pain?
- What is visible from limited data?
- What is the likely Dao level?
- What is the weakest resource?
- What is the first safe next step?

Do not overload with theory.

## 5.3 How To Write

- 1–2 pages maximum in spirit;
- client-facing language;
- short paragraphs;
- clear bottleneck;
- practical next step.

## 5.4 Template

```md
# Express Diagnosis

## 1. Request

## 2. Current State

2–4 sentences in simple client language.

## 3. Dao Level / Stage

Current level:
Stage / image:
What it means:
Next realistic level:
One-cycle goal:

## 4. Hidden Mechanism

Impulse:
Compression:
Defense:
Repetition:
Exhaustion:

## 5. Wu Xing Resource Map

Water:
Wood:
Fire:
Earth:
Metal:

Strongest element:
Weakest element:
Main bottleneck:
First support:

## 6. Core Insight

The key issue is not only _____.
The deeper mechanism is _____.
The first support should be _____.
The next movement is _____.

## 7. Support Direction

## 8. Practical Next Step

## 9. What To Track
```

---

# 6. Full Client Report

## 6.1 Purpose

A complete paid-style diagnostic report.

Use it when there is enough client data and the report must give depth, structure, support, and next steps.

## 6.2 Before Writing

Check:

- What exactly did the client ask?
- What is the current state?
- Is there a goal field?
- What is the current Dao level?
- What is the main Wu Xing bottleneck?
- What support direction matches this level?
- What should not be promised?

## 6.3 How To Write

- Start with human understanding, not theory.
- Then show method structure.
- Give one core insight.
- Do not scatter many equal interpretations.
- End with practical actions and tracking.

## 6.4 Template

```md
# Client Report

## 1. Request

Client request:
Context:
Direct client language, if provided:

## 2. Current State

Current state summary:
Main symptoms / signals:
Energy:
Clarity:
Confidence:
Action / movement:
Relationships / money / health / work, if relevant:

## 3. Self + Goal Field

Current Self field:
Goal field:
Contradiction:
Missing resource between Self and Goal:

## 4. Dao Level And Stage

Current level:
Stage / image:
What this level means:
Main task of this level:
Risk:
Next realistic level:
Final state:
One-cycle goal:

## 5. Hidden Mechanism

Impulse:
Compression:
Defense:
Repetition:
Exhaustion:

Simple explanation for client:

## 6. Wu Xing Resource Analysis

Water — energy, safety, deep reserve:
Level:
Expression:
Distortion:
Support direction:

Wood — growth, action, direction:
Level:
Expression:
Distortion:
Support direction:

Fire — expression, visibility, joy, contact:
Level:
Expression:
Distortion:
Support direction:

Earth — support, stability, receiving:
Level:
Expression:
Distortion:
Support direction:

Metal — structure, clarity, boundaries, value:
Level:
Expression:
Distortion:
Support direction:

Strongest element:
Weakest element:
Main bottleneck:
First element to support:

## 7. Core Insight

Main conclusion:
Why the problem repeats:
What must change first:
Next movement:

## 8. Support Plan

Psychological focus:
Resource focus:
Practical focus:
Relationship / money / health / work focus, if relevant:

## 9. Remedies / Support Tools, If Relevant

Tool / remedy:
Purpose:
Why it fits:
What to track:
Needs verification:

Safety note:
This does not replace medical care. Serious or medical symptoms require appropriate professional support.

## 10. Practical Actions

Action 1:
Action 2:
Action 3:
Minimum step for the next 7 days:

## 11. Forecast And Tracking

What may improve first:
What may take longer:
Possible resistance:
How to track progress:

## 12. Recommended Next Step

Suggested format:
Why this format:
Next session / next report focus:

## 13. Appendix, If Useful

Short essence:
Links / explanations:
Additional notes:
```

---

# 7. Monthly Progress Report

## 7.1 Purpose

Compare dynamics and define the next support cycle.

Use it for ongoing clients.

## 7.2 Before Writing

Check:

- What was the previous level?
- What changed?
- What stabilized?
- What is still blocked?
- Has the bottleneck changed?
- What is the next cycle goal?

## 7.3 How To Write

- Compare before/after clearly.
- Do not repeat the whole old report.
- Focus on movement, stabilization, remaining block, and next cycle.

## 7.4 Template

```md
# Monthly Progress Report

## 1. Period And Request

Period:
Client request for this cycle:
Previous focus:

## 2. Previous State

Previous Dao level:
Previous stage:
Previous bottleneck:
Previous support direction:

## 3. Current State

Current Dao level:
Current stage:
Current state summary:

## 4. What Improved

Resource:
Behavior:
Emotional state:
Body / energy, if relevant:
Relationships / work / money, if relevant:

## 5. What Stabilized

Stable gains:
New behavior:
New support:

## 6. What Still Blocks

Remaining bottleneck:
Hidden mechanism still active:
Risk of regression:

## 7. Updated Wu Xing Map

Water:
Wood:
Fire:
Earth:
Metal:

Main change:
Weakest element now:
First element to support next:

## 8. Main Mechanism Change

Before:
Now:
What this means:

## 9. Next Cycle Goal

Next realistic level:
One-cycle goal:
What must be stabilized:

## 10. Updated Support

Psychological focus:
Resource focus:
Remedies / tools, if relevant:
Practical actions:

## 11. Follow-Up Check

When to check:
What to track:
What data to bring next time:
```

---

# 8. Remedy / Support Note

## 8.1 Purpose

Short explanation of a support direction, remedy, Bach flower, oil, ritual, practice, or artifact.

## 8.2 Before Writing

Check:

- What state is being supported?
- Which element / level is affected?
- Is this a core tool or secondary support?
- What should the client track?
- What requires verification?

## 8.3 How To Write

- Do not turn it into a full report.
- Explain the role of the support tool.
- Connect it to the mechanism.
- Use safe language.

## 8.4 Template

```md
# Remedy / Support Note

## 1. State

Short state summary:
Main emotion:
Main conflict:
Main protection:

## 2. Support Direction

What needs support:
Why now:
Which resource / element it supports:

## 3. Tool / Remedy Logic

Tool / remedy:
Role:
Why it fits:
What it may support:
Needs verification:

## 4. What To Track

Emotional response:
Body / energy response:
Behavioral change:
Timing:

## 5. When To Reassess

## 6. Safety Note

This is a support direction, not a medical prescription or guarantee. Medical symptoms require appropriate medical care.
```

---

# 9. Homeopathy Situation Decoder

## 9.1 Purpose

Decode the psychodynamics of a person through a list of remedies.

Use when the input is mainly:

- homeopathic remedies;
- Bach flowers;
- remedy reactions;
- potency response;
- remedy comparison.

## 9.2 Before Writing

Check:

- Which remedies are central?
- Which show trauma / root?
- Which show emotional reaction?
- Which show adaptation / defense?
- What is only secondary?
- Is the level provided or must it be estimated?
- What needs verification?

## 9.3 How To Write

Do not describe remedies separately.

Use remedies to reconstruct the person’s inner structure.

Build three layers:

1. Root / Trauma — what may have happened.
2. Reaction / Emotion — what the person feels now.
3. Adaptation / Strategy — how the person survives now.

Formula:

what happened → what the person felt → how the person now lives

## 9.4 Template

```md
# Homeopathy Situation Decoder

## 1. General State Portrait

2–4 sentences.

## 2. Key Mechanism

Main mechanism:
- deficit / hypercompensation / suppression / dependency / control / avoidance / exhaustion

How it works:

## 3. Root Problem

Base pain:
Main fear:
Early conflict / developmental layer:

Core phrase:
“Something like this happened to me → now I live as if…”

## 4. Psychodynamics — 3 Layers

Root / Trauma:
Reaction / Emotion:
Adaptation / Strategy:

Formula:
what happened → what the person felt → how the person now lives

## 5. Level / Stage

Dao level hypothesis:
Stage / image:
Developmental stage:
- existence / contact / autonomy / will / love / value / belonging / identity

Needs verification:

## 6. Dynamics

Current direction:
- worsening / stabilization / growth

What happens without change:
What would show improvement:

## 7. Central Conflict

One-line conflict:

## 8. Remedy Map

Core remedies:
- remedy — role in the structure

Additional remedies to verify:
- remedy — why to check

Less likely / secondary:
- remedy — why secondary

## 9. Potency Direction

Main option:
Alternative option:
Caution:

Do not present potency as guaranteed. Potency choice depends on depth, sensitivity, previous response, and requires verification.

## 10. Next Check

What to test:
What to observe:
When to reassess:
```

---

## 10. Quality Checklist For All Reports

Before finalizing, check:

- correct report type selected;
- report-specific pre-writing check completed;
- request is clear;
- current state is clear;
- Dao level is included when possible;
- stage / image is included when possible;
- hidden mechanism is named;
- Wu Xing analysis is included when relevant;
- main bottleneck is named;
- core insight is clear;
- support matches the level;
- actions are concrete;
- next step is clear;
- uncertain points are marked as needs verification;
- no medical guarantees or diagnoses;
- no private data exposed.

---

## 11. Main Goal

The report must give:

clarity → support → next realistic level → practical movement
