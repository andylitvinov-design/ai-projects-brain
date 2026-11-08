# Holistic House — Judgment Mind 1.2: deeper contextual reasoning

Status: proposed implementation specification, not a claim of deployed behavior.
Date: 2026-11-08
Canonical code: https://github.com/andylitvinov-design/books
Baseline inspected on codex/public-book-library:
- lib/holistic-support/judgment-mind.mjs
- lib/holistic-support/judgment-schema.json
- tests/judgment-mind.test.mjs
- docs/holistic-support/JUDGMENT_MIND_V1_1_IMPLEMENTATION_20261106.md

## 1. Product decision

Keep Judgment Mind as the agent's reasoning and decision-quality layer, not another chatbot, diagnosis engine or advice generator. Strengthen the quality of conclusions while preserving v1.1's most important property: it must not pretend to know more about a person than the person has actually said.

Success means the user feels accurately understood, can correct the agent easily, and leaves with a clearer understanding or an achievable next step—not merely a category label.

## 2. Separate the minds

Use one shared, bounded conversation state and separate responsibilities:

1. Reaction Mind recognises and acknowledges explicitly expressed emotion, and respects requests to listen. It does not decide the underlying cause.
2. Judgment Mind builds and updates a tentative situation model, identifies uncertainty and decides what, if anything, needs clarification.
3. Solution Mind generates and ranks possible responses only after the focus is sufficiently clear and the user agrees to receive help.
4. Domain specialists (coach, psychologist, stress instructor, fatigue support, relationship support, business mentor) provide specialist methods only when the user's goal and boundaries justify them.
5. Safety and policy remain independent host-controlled gates before and after all minds.

Psychologist Mind is a specialist perspective, not a second Judgment Mind. Meditation Writer, Motivator and other content-producing minds are downstream executors, not judges of what the user needs.

Pipeline: Reaction → Judgment → (Listen / Clarify / Reflect / Inform / Solution) → optional specialist → user feedback. Safety gates surround the pipeline and cannot be overridden.

## 3. Replace one-label classification with a structured situation model

For each turn, maintain a compact, ephemeral object with independent dimensions:

- User intent: be heard, understand, decide, plan, act, learn, create or obtain a service.
- Observed facts: concise statements directly supported by the current message or consented recent dialogue, with source-turn provenance.
- User interpretations: what the person believes the facts mean; never treat them as verified facts.
- Expressed emotion: only emotion explicitly stated or cautiously reflected by Reaction Mind.
- Main difficulty: the functional obstacle described in the user's own language.
- Context: people/roles, setting, timing, frequency, trigger, stakes and constraints, but only when stated or confirmed.
- Impact: affected areas such as energy, work, relationship, decisions or routine, only when the user says so.
- Resources and exceptions: what helps, what remains functional, when the difficulty is absent or smaller.
- Candidate explanations: maximum three, each with supporting evidence, contradicting evidence, unknowns and confidence band.
- Unknowns: the one or two facts that would materially change the next recommendation.
- Chosen focus: the user's selection, never a hidden model preference.
- Readiness and consent: listening, exploration, options or concrete step.
- Next decision: listen, clarify, reflect, inform, offer options, micro-step, human support or abstain.

Do not display this as a clinical-looking report. Client-facing language remains natural, brief and conversational.

### Evidence levels

- E0: no reliable personal evidence; abstain from personalised judgment.
- E1: one direct statement; only a tentative reflection or low-stakes clarification.
- E2: user confirms a candidate interpretation or supplies a second supporting detail; a small reversible suggestion may be offered with permission.
- E3: user reports whether a suggestion was useful; this is feedback about fit, not proof of efficacy.
- E4: a pattern is confirmed across separate sessions or explicitly consented memory; only then may a stable preference/pattern be suggested, and it remains correctable.

Never raise evidence level because the model repeated its own hypothesis. Model-generated text is not evidence.

## 4. Hypothesis reasoning and uncertainty

For each candidate explanation require: plain-language description; exact user evidence and source turn; evidence against it or a plausible alternative; unknowns; confidence band (low/moderate/strong) with a reason; and what new answer would change its ranking.

Do not emit pseudo-precise percentages until a calibrated statistical model has been validated. The current deterministic pilot should use transparent confidence bands and rule coverage, not invented probabilities.

Anti-premature-closure rules:
- A lexical match is a retrieval hint, not a conclusion.
- Topic words such as love, money, work, family, fatigue or anxiety alone never establish a problem category.
- First-person wording is insufficient if the sentence is hypothetical, quoted, negated, about another person or a direct task request.
- A message may contain multiple difficulties. Do not force one label; identify the immediate priority or ask which thread matters now.
- If two explanations remain plausible, say so and ask one discriminating question.
- If new information contradicts the current model, invalidate affected hypotheses and rebuild from the new evidence.
- If there is no reliable match, respond naturally or ask an open question. Unclassified is a valid outcome.

## 5. Context and dialogue memory

v1.1 is a rule engine with short-lived signed choice context. v1.2 should add bounded recent-turn context, not a permanent psychological profile.

- Pass only the minimum recent turns needed to resolve references such as “that”, “the same thing” or “not because of that”.
- Keep user facts separate from assistant hypotheses and suggestions.
- Current correction outranks stale context.
- A prior hypothesis is never proof of a current condition.
- Topic change, refusal, stop command or direct task intent clears pending judgment state.
- Guest context remains local/ephemeral. Authenticated context must retain existing consent, verified actor/session binding and privacy boundaries.
- Do not persist raw dialogue, sensitive health narratives or inferred traits for training or personalisation.
- Durable memory requires a separate opt-in, purpose limitation, view/edit/delete/revoke controls and RLS/two-account audit before activation.

## 6. Better questions: one at a time

Ask exactly one question, then wait. Select the question whose answer most changes the next decision. Possible dimensions—not a fixed questionnaire—include:
- What outcome does the user want from this conversation?
- What is happening concretely?
- When does it happen, and when does it not?
- What makes it harder or easier?
- What has already been tried, and what happened?
- Which constraint must any solution respect?

Skip questions that do not affect the next decision. Offer at most two or three concise options only when they represent genuinely different paths; always allow free text and “not sure / skip”. If the user says “I don't know”, do not repeat the same question in new words. Offer a smaller observation, a concrete example or simply stay with them.

## 7. Expand coverage without overreach

Retain the eight v1.1 compatibility codes: overload, starting, conflict, loneliness, self_criticism, uncertainty, fatigue and stress.

Introduce a two-layer taxonomy:
- Functional domain: workload, initiation, choice, relationship, belonging, self-evaluation, energy/recovery, stress/pressure, communication, boundaries, transition, purpose/meaning, learning, business/leadership or practical/logistical.
- Specific obstacle and context: only after supported by user evidence.

Do not enable the 16 editorial candidate codes automatically. A new domain requires a definition, positive and near-miss examples, negative/negated cases, multilingual phrases, overlap policy, safe response, specialist boundary and regression fixtures. Unclassified remains a valid result.

Never conflate ordinary stress, low mood, fatigue or conflict with a disorder. Medical symptoms and crisis language use independent safety/medical routing, not ordinary classification.

## 8. Judgment to practical outcome

Choose one next move:
- Listen: user needs presence, not a solution.
- Clarify: one high-value unknown remains.
- Reflect: summarise only what the user said and ask whether it fits.
- Inform: concise factual explanation when requested.
- Offer options: two or three realistic paths with trade-offs.
- Micro-step: one small, reversible action respecting energy, resources and constraints.
- Human support: a qualified person or trusted human is more suitable.
- Abstain: intent/evidence insufficient or a gate requires it.

Before a micro-step, check relevance to chosen focus, feasibility, reversibility, risk, stated constraints and user consent. If any answer is no or unknown, clarify or listen instead. Explain why an option fits, what it does not solve and how to decline it. No promises of healing, diagnosis or guaranteed results.

## 9. Personalisation without overreach

Use only user-provided and consented context. Adapt scale of action to stated time/energy/resources; tone to stated preference and current expression; method to what the user has explicitly said helps or does not help; format to the current goal.

Do not infer personality, attachment style, trauma, hidden motives, medical condition, relationship status or financial state from writing style or a few phrases. User correction is more valuable than model preference.

## 10. RU/EN/ES semantic parity

Detect language from the latest clear user message before classification and response. Preserve language through the turn even when page locale is stale. Handle negation, uncertainty, idiom, grammar, first/third person, hypothetical and quoted speech, and code-switching. Names, URLs and short ambiguous tokens must not trigger a language switch. Safety handling and answer options must be equivalent across all three languages. Regex is only a deterministic baseline; semantic coverage must be tested before expansion.

## 11. Evaluation: measure judgment quality

Create a versioned benchmark with independent labels and exact expected outcomes. Minimum v1.2 gate: 180+ balanced RU/EN/ES examples, with colloquial/code-switched language; positive, negative, ambiguous, hypothetical, quoted, third-person and negated input; multi-intent turns; topic changes; correction/refusal/listening/direct-task cases; prior-context references; competing hypotheses with evidence-for/evidence-against labels; one-question-at-a-time checks; safety, privacy, consent and professional-boundary cases.

Report separately:
- precision/recall by class and language;
- abstention quality (false confident judgments vs useful abstentions);
- hypothesis calibration and contradiction handling;
- question usefulness (whether the answer changed the next decision);
- correction acceptance latency;
- practical-step relevance, feasibility and user acceptance;
- safety/privacy violations (release-blocking; target zero);
- user feedback about feeling understood and usefulness, collected only with explicit consent and without storing sensitive dialogue.

Do not optimise for more classifications or fewer abstentions. Correct abstention is better than unsupported judgment.

## 12. Implementation sequence

### Phase 0 — preserve baseline
Keep v1.1 eight-code fixtures and schema. Inspect current Judgment, Reaction, Messenger language, safety owners and PR leases before editing. Reconcile with open Reaction Mind work (PR #3974 at the time of writing); do not edit another PR's owned files or claim it is merged/live.

### Phase 1 — reasoning contract
Extend the schema with intent, evidence items, candidate explanations, contradictions, unknowns, readiness, next move and confidence band. Add source-turn provenance without logging raw dialogue. Add unclassified/needs_clarification. Preserve eight-code compatibility. Keep core deterministic and dependency-free.

### Phase 2 — bounded dialogue reasoning
Thread bounded recent history through existing guest and authenticated routes. Distinguish user statements from assistant-generated hypotheses. Implement correction, negation, topic-switch precedence and single-question selection. Preserve signed choice binding to actor, session, transcript and TTL, plus current authorization/rate/safety gates.

### Phase 3 — Solution Mind
Add a separate pure module that consumes only user-confirmed focus, evidence level, readiness and consent. Rank at most three next moves; expose one best-fit move and alternatives only when useful. Enforce reversible micro-steps and no autonomous action. Specialist routing requires a real supported service/skill and user agreement.

### Phase 4 — benchmark and release
Expand to 180+ cases and retain all 58 baseline cases. Add invariant/property tests: no more than one question; at most three hypotheses; no action execution; no memory writes; no clinical conclusions. Run focused tests, full required Core/Specialist/Guard CI, TypeScript/build and relevant guest/auth browser tests. Test RU/EN/ES on real iPhone/WebKit after protected merge. Verify Vercel READY serves merged SHA and run production smoke before calling it LIVE.

## 13. Non-negotiable invariants

- One question at a time; wait for the answer.
- Latest user correction and intent outrank model assumptions.
- Reaction acknowledges; Judgment reasons; Solution proposes.
- No diagnosis, hidden-motive claims, coercive persuasion, shame or sales steering.
- No automatic booking, payment, messaging, order, purchase, treatment or content creation.
- No sensitive inference or durable psychological profile.
- No new paid provider/model API/database/background service in v1.2 without separate explicit approval.
- Preserve host safety, consent, authentication, privacy, rate limits and protected CI.
- Green unit tests, merge or HTTP 200 alone do not prove LIVE.

## 14. Source-level baseline gaps observed in v1.1

These are code observations, not claims that every issue appears in production:
- Classification is a fixed first-match regex over eight classes; it does not rank competing explanations.
- The two current “hypotheses” are actually choice identifiers derived from one situation code, not independently evidenced explanations.
- Evidence provenance and contextual facts are not represented beyond pending signed choice.
- Unsupported corrections reframe/abstain rather than using a richer clarification strategy.
- A current open PR proposes passing bounded history into the judgment call; verify its final state before adopting or duplicating that change.
- The 58-case fixture is a useful baseline, not proof of broad semantic coverage or calibrated quality.

These gaps define v1.2. Do not fix them by adding a second overlapping engine or simply expanding brittle keyword lists.
