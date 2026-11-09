# AI Coaching Session Report v2 — Product Concept

**Status:** Product concept for implementation  
**Product:** Holistic House · Personal Coaching  
**Version:** 2.0 · 2026-11-09

## 1. Purpose

The report is the durable bridge between a 20-minute coaching conversation and the client's ongoing work. It is not a transcript, generic AI summary, psychological diagnosis, or decorative PDF.

Within the first minute, the client should understand:
1. What did I come to work on?
2. What did we clarify?
3. What remains uncertain?
4. What did I decide?
5. What are my next actions?
6. How does this become part of My Coaching Plan?

Product outcome: **clarity → ownership → action → review → continuity**.

## 2. Closing contract from the coaching-session concept

The screenshot's closeout requirements are mandatory. After the conversation the client receives:
- a short outcome;
- the main difficulty identified;
- the desired result;
- decisions formulated during the session;
- three concrete action candidates;
- recommendations for continuing work;
- a Personal Coaching Report;
- an option to add confirmed results to My Coaching Plan.

This is a closeout contract, not permission to invent missing data. If the client confirms one action rather than three, the report must show one confirmed action and label other suggestions as optional ideas.

## 3. Product principles

- **Client-owned truth:** facts and commitments are reported as client statements only when explicitly said or confirmed.
- **Evidence separation:** distinguish what the client said, what the client confirmed, what the coach observed, what is only a hypothesis, and what was not established.
- **No fabricated progress:** before/after values appear only if the same question and scale were explicitly answered at both points.
- **Three prioritized action roles:** Start, Build, Review. They are proposed action slots, not fabricated obligations.
- **Twenty minutes is an orientation:** stage duration can flex; the session does not end abruptly to satisfy a timer.
- **One canonical result:** mobile report, PDF and My Coaching Plan updates derive from one versioned structured report.
- **Consent-aware continuity:** future sessions may use prior reports and plan state only within the client's permissions.
- **Privacy by design:** no client-specific data in GitHub, public logs, analytics or project documentation.
- **Multilingual:** RU and EN must be complete; preserve ES parity where coaching currently supports it.
- **Coach persona changes delivery, not facts:** avatar/persona affects tone, question style and focus, never evidence rules or safety.

## 4. Three layers of the experience

### A. Immediate session close

Show a concise result screen:
1. short session outcome;
2. main difficulty / bottleneck;
3. desired outcome;
4. key insight;
5. confirmed decisions;
6. up to three proposed actions;
7. recommendation for continued work;
8. Add confirmed results to My Coaching Plan;
9. Open full Coaching Report.

Client can edit, accept, defer or decline each item before it is saved as a commitment.

### B. Personal Coaching Report

Mobile-first report, target reading time 2–4 minutes:
1. Session header: date, duration, language, direction, coach persona.
2. Starting request: concise client-confirmed paraphrase.
3. Desired result: what the client wanted to change or understand.
4. What we clarified: only relevant context.
5. Main difficulty / maintaining pattern: include only when supported.
6. Key insight: preferably the client's own words.
7. Session outcome: cognitive, emotional, behavioral and resource outcomes kept separate.
8. Decisions and open questions.
9. Three action cards with timing, minimum completion definition, obstacle and fallback.
10. At most one primary practice and one optional resource, when relevant.
11. Next-session focus and optional specialist/session recommendation with rationale.
12. Client confirmation, edits and revision status.
13. Safety/support note if needed.

The first screen must show the outcome, main insight and next action. Never include a full transcript by default.

### C. My Coaching Plan

The report can contribute approved items to the existing life plan:
- life area and goal;
- current and desired state;
- confirmed decision/insight;
- accepted actions with dates or triggers;
- practice/resource;
- review date;
- source report and session links;
- current action status and progress notes.

A new report proposes updates; it never silently overwrites the existing plan. The client accepts, edits or declines updates. Historical reports remain versioned records.

## 5. Three-action model

The report generator proposes no more than three prioritized roles:
- **Start:** smallest meaningful first step.
- **Build:** repeat, prepare, communicate or remove one obstacle.
- **Review:** observe the result, collect evidence or return to the issue at an agreed checkpoint.

Each action must have:
- specific behavior, not a vague aspiration;
- timing or trigger, if stated/confirmed;
- a minimum definition of done;
- likely obstacle and a fallback, where useful;
- provenance: client statement, client edit or explicit acceptance;
- status: proposed, accepted, in progress, done, blocked or declined.

Do not create dates without client input. A selected priority, resource, aspiration, date or confidence score is not automatically an action.

## 6. Outcome model

Keep four outcome dimensions separate:
- cognitive: clarity, understanding, alternative perspective;
- emotional: self-reported feeling or intensity;
- behavioral: decision, action, experiment or communication;
- resource: perceived support, confidence, energy or capacity.

Each self-rating stores the exact question, scale, timestamp, stage and value. Comparisons require matching measure key and scale. No baseline means “not measured”, not an estimated score. No improvement is still a valid report outcome.

## 7. Evidence levels

Every claim in the report has one evidence type:
- client_stated;
- client_confirmed;
- coach_observation;
- hypothesis;
- not_established.

Only client_stated and client_confirmed items can become facts or commitments. Coach observations use tentative wording. Hypotheses must be visibly tentative, require client confirmation before being promoted, and must never be used to infer trauma, diagnosis, identity or hidden motives.

## 8. Personalized report profiles

One schema; specialized emphasis:
- stress/recovery: stressors, recovery resources, manageable regulation practice;
- energy/burnout: load, boundaries, recovery, capacity;
- anxiety: triggers, responses, useful options and safety screening when indicated;
- low mood: functioning, support, safety and referral; never equate it with laziness or weak motivation;
- confidence: desired behavior, self-trust and experiments;
- relationships: needs, boundaries, communication and decisions;
- goals/motivation: goal, obstacle, options and experiment;
- work/business: priorities, constraints, stakeholders and next decision.

## 9. Client controls

Client can confirm or edit the summary, accept/edit/decline each action, add selected actions to My Coaching Plan, flag inaccurate content, request correction, choose prior-context permissions for future sessions and download a PDF. External sharing is off by default and requires a separate explicit action and preview.

## 10. Relationship to existing implementation

Open PR #3980 is the current starting point for the authored GROW session and deterministic offline coaching intelligence. Its description explicitly states that it is a structured self-coaching pilot, not a generative live AI coach, and does not implement client-data persistence/report generation. This concept is a follow-on reporting and continuity layer. Implementation must verify the current status of #3980 and reuse the existing session runner, coaching catalog, consent, private storage and Client Cabinet. Do not assume the PR is merged.

## 11. Non-goals

- Full transcript as the default report.
- Automated psychological or medical diagnosis.
- Claims that one 20-minute conversation resolves a complex issue.
- Mandatory commitments when a client has not agreed.
- Automatic insertion of unconfirmed actions into My Coaching Plan.
- A duplicate cabinet, client table, auth system, storage bucket, payment system or AI provider.
- Storing real client examples or personal data in GitHub documentation.

## 12. Success measures

Measure report availability, open rate, client correction rate, action acceptance/edit rate, transfer rate into My Coaching Plan, action review/completion, repeat-session usefulness and safety/privacy incidents. Do not optimize only for number of actions or sessions. Clarity, a deliberate pause or referral to human support can be a valid result.
