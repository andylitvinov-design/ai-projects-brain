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


---

# 13. Unified information architecture: Coaching Report + My Coaching Plan

This section consolidates the additional iPhone reference screens supplied on 2026-11-09 and supersedes any narrower interpretation of the report as a single end-of-session document.

## 13.1 Three connected but distinct products

1. **Coaching Report** — immutable, dated record of one AI-coach session or one human-specialist consultation, with client corrections as explicit versions.
2. **My Coaching Plan** — the client's living, editable map of goals and development across life areas. It is not the report archive.
3. **Specialist Journey** — an optional, client-approved sequence of work with different specialists when one issue spans several areas. It is not an automatic referral or sales funnel.

A report can propose updates to the Life Plan and a specialist route. The client chooses which proposed changes to accept. The Plan links back to the source report; it does not absorb or rewrite the report.

## 13.2 The canonical ten-section Coaching Report

The full client-facing report uses this order. Empty or unsupported sections are omitted or explicitly marked as not explored; they are never filled with generic prose.

1. **Session Overview** — topic, desired focus, date/time, duration, language, selected coach/specialist, session type and report ID.
2. **Initial Situation** — what the client brought, in the client's own language or a confirmed paraphrase.
3. **Desired Outcome** — what the client wanted to understand, decide, change or achieve.
4. **Key Discoveries** — what the conversation actually clarified, with evidence and client confirmation where needed.
5. **Main Obstacles** — the principal obstacle(s) that appeared; distinguish established facts from hypotheses.
6. **Strengths & Resources** — existing capacities, supports, successful exceptions, useful relationships or skills identified by the client.
7. **New Perspective** — a new interpretation, question or distinction the client recognizes as useful. Never present the coach's hypothesis as the client's insight without confirmation.
8. **Decisions** — decisions the client explicitly made, plus separate items still undecided.
9. **Action Plan** — client-edited and client-confirmed actions. Show up to three priority actions, with timing/trigger and a clear done definition. Do not invent commitments.
10. **Follow-up** — how the client and coach will review results, which measures/questions matter, suggested next focus and any agreed follow-up date.

The immediate closing screen is the compact form of these same ten sections, not a competing report schema. It must also satisfy the earlier closeout contract: short result, main difficulty, desired result, decisions, three action candidates, continuation recommendation and My Coaching Plan option.

## 13.3 Action Plan: operational, not inspirational

Every action card must answer:
- What exactly will I do?
- When, or after which trigger?
- What is the smallest acceptable completion?
- What may get in the way?
- What is my fallback if that happens?
- How will I know I did it?

Recommended three roles:
- **Start** — first small step, often the next day or first available slot.
- **Reduce friction** — remove, postpone, delegate or simplify one obstacle.
- **Review** — check the result after an agreed interval.

The sample in the screenshots (start an important task, reduce overload, review after three days) is a format example, not a default prescription. Client and coach build it together. The client can keep one or two actions; the UI must not force exactly three commitments.

Action statuses: proposed → accepted → in progress → completed; alternatively blocked, deferred or declined. A client can edit the action and preserve its provenance/version history.

## 13.4 Change measurement

At the beginning and end of a session, when appropriate, the client may self-rate four practical dimensions on the same 0–10 scale:
- clarity;
- confidence in the next step;
- perceived readiness to act;
- subjective sense of control over the situation.

The client supplies every score. They are subjective reflection aids, not psychological tests, clinical metrics, or evidence of improved mental health. Compare only identical question keys and scales. If no baseline was captured, show “not measured”. Also allow the client to state that a rating is unchanged or worse.

For Life Plan progress, each life area can have its own client-defined indicator. Do not combine unlike measures into one overall score unless a transparent, explicitly designed calculation and opt-in are approved. A Life Wheel is a navigation/overview view, not a psychometric diagnosis.

## 13.5 My Coaching Plan — main cabinet workspace

My Coaching Plan is the primary destination after the user clicks it in the existing client profile/cabinet.

If there are no coaching reports or consultation reports:
- show a welcoming empty state;
- explain that the plan becomes more useful after the first coaching session;
- offer a clear start-session CTA and available coach/session choices;
- do not display an empty dashboard with fabricated 0% scores.

When data exists, open the **Life Plan dashboard** first, with three main areas:

### A. Life Plan
The Life Plan contains eight independent life domains:
1. **Body & Health** — energy, daily habits, wellbeing and health-related goals (not a medical record).
2. **Emotional Wellbeing** — emotional balance, stress, regulation and support.
3. **Relationships** — partnership, family, friendship, communication and boundaries.
4. **Career & Business** — work, professional direction, business and leadership.
5. **Finance** — financial goals, stability, planning and decisions; not investment advice.
6. **Personal Growth** — learning, skills, creativity and personal development.
7. **Lifestyle** — time, rest, environment, routines and quality of everyday life.
8. **Meaning & Purpose** — values, direction, contribution and life meaning.

Each domain can contain:
- current state (client-described);
- desired state;
- one or more goals;
- obstacles / risks;
- active actions;
- completed actions;
- client-defined indicators and check-in history;
- linked coaching and specialist reports;
- optional next review date.

Domains are independent and can be expanded or collapsed. The client can edit the wording and prioritization at any time. Do not require every domain to be completed. An empty domain remains available without implying a deficit.

### B. Coaching Reports
A chronological searchable/filterable archive of:
- AI Coach session reports;
- reports from human practitioners/specialists;
- consultation summaries;
- client-approved attachments and files;
- recommendations and follow-up dates.

Each entry shows source/type, specialist/coach, date, domain tags, concise outcome, availability/status, and links to the source session. AI coach and human reports must be visibly distinguished. Legacy documents stay accessible and are not silently rewritten into the new report schema.

### C. Specialist Recommendations / Journey
A multi-area problem can lead to a suggested route rather than forcing one coach to solve everything. Example: low energy → Energy Coach (resource recovery plan); professional uncertainty → Career Coach (professional priorities); relationship difficulty → Relationship Coach (communication plan).

The recommendation engine must:
- identify multiple life domains only when supported by the client's own words and confirmed by them;
- distinguish the primary focus from related secondary areas;
- suggest the smallest useful sequence of specialist sessions;
- explain the intended outcome of each proposed specialist;
- avoid duplicate or overlapping interventions;
- let the client reorder, accept, edit, skip or reject recommendations;
- avoid implying that the user must buy a package or meet every specialist.

## 13.6 Minimum-context handoff between specialists

A specialist must not receive the client's entire personal history by default.

For each specialist handoff, create a scoped context packet containing only:
- client-selected Life Plan domain and goal;
- the specific question the client wants that specialist to address;
- relevant client-approved current state and desired result;
- relevant accepted actions and progress;
- selected source report excerpts or conclusions explicitly approved for sharing;
- safety/limitations information only when necessary and appropriately consented;
- date, source and freshness of the information.

The client previews the packet and explicitly grants access before it is shared. Consent is specific to the recipient/specialist and scope, can be revoked for future access, and is logged. The next specialist sees only the allowed packet, not all reports, raw transcripts or unrelated sensitive notes. AI personas are not human practitioners and must not be used to widen access.

## 13.7 Dashboard and progress visualizations

The Life Plan dashboard may contain:
- a Life Wheel / domain overview with eight client-rated areas;
- a habit summary based only on habits the client chose to track;
- an activity trend for completed actions/check-ins over a selected period (e.g. 7 / 30 / 90 days);
- current focus and next review.

Every visual must show the underlying count, scale, time window and missing-data status. No score is calculated for an empty domain. The dashboard must not turn untracked behavior into a low rating. The Life Wheel is an optional self-reflection overview, not a clinical or objective ranking of life quality.

## 13.8 Mobile and desktop information hierarchy

Mobile first:
1. current focus and next action;
2. small progress overview;
3. eight life-domain cards;
4. latest report and follow-up;
5. specialist journey.

Desktop can show overview and domain detail side-by-side. The full report remains a readable document page. Avoid a single long table on mobile; use cards with concise summaries and expandable details.

## 13.9 Cabinet navigation

Add/retain a single **My Coaching Plan** entry in the existing authenticated client profile/cabinet.

Inside it, navigation is:
- Life Plan (default);
- Coaching Reports;
- Specialist Journey.

The report catalog must remain accessible from the Life Plan and vice versa. Do not create a new login, second cabinet, or duplicate client identity. Empty state routes to first session. Existing legacy reports and documents are integrated into the archive through adapters, not by destructive migration.

## 14. Unified product object map

- Session: one conversation and its saved source answers.
- Report: a versioned interpretation/record of that session, with evidence provenance.
- Plan domain: one of eight living areas.
- Goal: desired state inside a domain.
- Action: a client-owned behavior that moves a goal forward.
- Check-in: dated client observation/rating against an agreed indicator.
- Resource: a practice/file/video selected from the approved library.
- Specialist route: a client-approved ordered sequence of specialist work.
- Handoff packet: recipient- and scope-limited context with a consent record.
- Attachment: a private file linked to a report or domain.

These are linked by stable IDs; do not duplicate the same goal/action into disconnected stores.

## 15. Unified design rule

**The report records what happened. The Life Plan records where the client is going. The Specialist Journey coordinates who may help next.** The three must be connected, but each keeps a distinct purpose, permission model and history.


---

# 16. Architecture decision record — verified baseline and product boundaries (2026-11-09)

## 16.1 What exists today — and what it is not

The following source-level facts were verified on branch codex/public-book-library on 2026-11-09. They are not proof that the entire flow is deployed or accepted in production.

| Existing asset | Verified responsibility | Must not be mistaken for |
|---|---|---|
| app_private.personal_coaching_sessions + lib/app/personal-coaching.js | One owner-bound encrypted account payload, transaction lock, optimistic revision, current session and bounded history | A normalized report archive or unlimited Life Plan database |
| components/coaching-action-plan.jsx + save action plan | Client-editable single action card: goal, obstacle, one chosen action, timing and optional confidence | The new three-role action plan with multiple independently tracked actions |
| lib/personal-coaching/session-pdf.js | On-device A4 PDF with source questions, saved answers, reflections and confirmed action card | The new ten-section analytical Coaching Report |
| components/app/my-progress.jsx + lib/app/my-progress.mjs | Read-only aggregation of existing activity, tests, courses, sessions, reports, documents and user-confirmed marks | Eight life-domain planning and progress workspace |
| components/app/profile-domains.jsx | Four existing practitioner/profile perspectives: Psychology, Homeopathy, Wu Xing and Hypnotherapy | The eight Life Plan domains; do not replace or relabel these four profile views |
| app/[locale]/app/memory + client-memory stores | Separate opt-in owner memory with sensitive-data, sharing and retention boundaries | A report store, task manager or automatic Life Plan extractor |
| Legacy components/client-cabinet.jsx | Existing shared-document/report cabinet with legacy selectors and Google Cabinet bridge | A reason to create a new account or duplicate cabinet |

The session service currently defines MAX_HISTORY=8, stores a combined encrypted account record and has a bounded ciphertext constraint. It saves one action-plan object in the current session. Do not keep appending unbounded reports, life domains, actions and change events into that payload.

## 16.2 Canonical product placement

The canonical user home for My Coaching Plan is the existing authenticated Holistic House account workspace under /[locale]/app. It should be reachable from existing profile/cabinet navigation and related My Progress/profile surfaces, using the same verified account identity.

Do not implement a second login or make the legacy /client/[selector] shared-document cabinet the owner of Life Plan data. Existing legacy reports and documents can be surfaced through authorized adapters inside Coaching Reports, preserving original access controls.

Within My Coaching Plan the three areas are:
1. Life Plan — editable current goals and actions across eight life domains; default tab.
2. Coaching Reports — authorized AI session reports, human specialist reports, consultation records and attachments.
3. Specialist Journey — client-approved recommended work sequence and scoped handoffs.

## 16.3 Data-source boundaries

- Session answers remain the source of truth for what was said in that session.
- Report snapshots are versioned, date-bound records that refer to one session or one human consultation.
- Life Plan is the mutable current planning view. Changes are recorded as events/revisions and link back to the report/action/check-in that caused them.
- My Progress remains a read-only activity projection; it may link to My Coaching Plan but must not become a second planning store.
- Client AI Memory remains a separately consented memory feature. A goal appearing in a session does not become a persistent memory fact without explicit confirmation and appropriate memory consent.
- Practitioner reports/documents are included only through their existing owner-authorized source. The archive must not silently copy private practitioner notes or unrelated attachments.

## 16.4 Migration principle

Reuse first, but do not force unlike data into the same table:
- Preserve the current encrypted session payload and historical PDF export.
- Reuse compatible report/document entities if the audit proves they support owner scope, revisions, report type, source session, access control, export and deletion.
- If none exists, add a small normalized private report entity and only the minimum Life Plan domain/goal/action/check-in/event and specialist-route entities proven necessary by the audit.
- Do not create a second account memory store or generic task manager.
- The current encrypted memory item table is not automatically repurposed for plan actions or report snapshots.
- Any new schema must support owner-bound authorization, consent scope, provenance, idempotency, timestamps, edit history, deletion/export and cross-account tests.

## 16.5 Report and plan versioning

A report is a historical snapshot. Editing it creates a visible correction/revision; it does not rewrite what was originally confirmed. Current Life Plan values may change, but each material update records what changed, previous/new values, actor, source report/session/action/check-in, timestamp and revision.

An accepted action imported twice must still create one plan item. A new report cannot silently overwrite an existing goal, due date or action. Similarity detection may suggest a possible relation to an existing goal, but the client chooses whether to link, update or create a separate goal.


## 17. Existing Development Goals compatibility

A further source audit found the existing owner-encrypted app_private.development_goals record and authenticated development-goals API. It uses DEVELOPMENT_GOALS_VERSION=1, a revisioned encrypted targets payload and four existing portrait sectors. Default target positions are initialized to 50, but those values are editable directional preferences, not measured current states or completed assessments.

This existing feature is related but is not the new Life Plan:
- do not rename the four portrait sectors as the eight Life Plan domains;
- do not treat the default value 50 as a client baseline or progress score;
- do not infer eight domain values from four unrelated sector targets;
- keep its existing API and old clients backward-compatible;
- include it in the migration audit and decide explicitly whether a safe adapter or a versioned extension is possible.

The new Life Plan must store client-described current/desired state, goals, obstacles, action history and linked reports in a model that can represent all eight domains without misrepresenting the legacy target profile.
