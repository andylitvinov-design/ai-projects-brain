# Red-Capable Feedback Loop

Last updated: 2026-07-04

Purpose: let the agent system learn from failures without guessing or silently rewriting product code.

## Principle

When a failure repeats, do not only apologize and retry. Convert the failure into one of:

- a replay case;
- a prompt regression;
- a rule lifecycle action;
- a delivery outcome ledger entry;
- an agent-ready ticket.

## Red-capable means

The loop must be able to say:

```txt
The previous result was wrong.
The claim lacked proof.
The provider/live layer was not verified.
The rule did not work.
The prompt shape encouraged the wrong behavior.
The safe response is to block success and create a ticket.
```

## Do not

- invent missing provider state;
- hide uncertainty;
- mark success because code changed;
- rewrite risky product/data/auth/payment behavior from `/improve` or `/upgrade`;
- create broad rules from one-off events without evidence.

## Required output on repeated failures

```txt
failure pattern:
evidence:
root cause:
safe prevention:
replay/regression candidate:
ticket or handoff:
```
