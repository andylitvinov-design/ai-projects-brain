# AI Coaching Session Report v2 — Technical Specification

**Repository:** andylitvinov-design/books  
**Concept:** andylitvinov-design/ai-projects-brain → andrey-system/projects/ai-coaching/session-report-v2-concept.md  
**Version:** 2.0 · **Date:** 2026-11-09

## 0. Mission

Implement a secure, structured, client-confirmable report from an existing 20-minute coaching session and connect accepted actions to the existing My Coaching Plan. The deterministic recap must remain available if optional AI analysis fails.

The mandatory closeout output is: short outcome, main difficulty, desired result, decisions, three concrete action candidates, continuation recommendations, Personal Coaching Report and an option to add confirmed results to My Coaching Plan.

## 1. Verified baseline and constraints

Open PR #3980, titled “feat(coaching): add first 20-minute overload-to-plan GROW session”, changes:
- lib/personal-coaching/guided-session.js
- lib/personal-coaching/offline-intelligence.js
- supabase/migrations/20261108140500_hh_coaching_overload_session_v1.sql
- tests/coaching-overload-session.test.mjs
- package.json

It adds a localized GROW scheme, catalog questions and deterministic authored follow-ups. The PR description explicitly limits the feature to a structured self-coaching pilot, not a generative live AI coach; it adds no client-answer table, LLM/provider call or new storage. It was open when this spec was prepared. Verify the latest branch, PR status and current default branch before implementation.

### Hard constraints

1. Audit PR #3980 and current code before editing. Base changes on the actual up-to-date implementation.
2. Reuse existing authentication, consent, coaching catalog, session runner, private data access, storage, Client Cabinet and My Coaching Plan.
3. Inspect the current My Coaching Plan implementation and domain model before choosing persistence. Do not invent a second plan store.
4. Do not create a second client profile, session runner, report vault, authentication route or duplicate task manager.
5. Do not persist raw transcript by default. Use saved structured answers, client-approved recap and approved structured notes. If consented transcript storage already exists, access it through its authorized path without duplicating it.
6. Use the existing approved model gateway, if present. If none exists or it is not approved for this feature, ship deterministic reporting first; do not introduce a paid provider.
7. Keep RU/EN complete and preserve ES where supported.
8. Migrations are additive, idempotent, RLS-reviewed and deployed only through the existing production procedure.
9. No production migration/deployment is included in this specification task.

## 2. End-to-end journey

### Before the session
- Resolve the signed-in client through existing auth context; never trust a clientId from the browser.
- Load only the minimum My Coaching Plan context that the client permitted future sessions to use.
- Resolve coach persona, persona version, specialty, session scheme and scheme version.
- Capture any baseline self-ratings with exact measure key, question wording, range, value and timestamp. Null/skip is preserved.
- Explain report storage and obtain the existing consent. Report storage, transcript analysis, prior-session context and external sharing are separate consent scopes.

### During the session
- Existing session runner is the source of truth for question order and saved answers.
- Capture candidate insights/actions with source turn or answer references.
- Do not interrupt a live conversation with report UI.
- Session duration is an orientation, not a hard forced cutoff.
- Skipped questions remain skipped. The model must not fill them.

### Closing phase
1. Coach gives a concise spoken recap.
2. Client can correct or confirm it.
3. Confirm main difficulty and desired outcome.
4. Present one key insight; client accepts, edits or marks “not mine”.
5. Separate decisions from unresolved questions.
6. Present up to three action candidates, labeled Start / Build / Review. Client can edit, accept, defer or decline each.
7. If fewer than three actions are accepted, retain fewer. Do not manufacture commitments to fill slots.
8. Show recommendation for continuing work. A recommended session/specialist must include a reason and remain optional.
9. Ask whether accepted results should be added to My Coaching Plan.
10. Preview exact fields to be saved; record confirmation.
11. Save closeout first. Generate the detailed report asynchronously after the canonical closeout is persisted.

### After the session
- Show an immediate result screen from persisted closeout data.
- Full report status is pending/ready/failed; pending and failed states must survive reload.
- If AI/report generation fails, show deterministic recap and confirmed actions.
- Client can correct the report and transfer chosen actions to My Coaching Plan.
- A subsequent session uses prior context only with the relevant consent.

## 3. Canonical report schema

Use a versioned JSON document as the single source for mobile report, PDF and plan transfer. Validate at API and persistence boundaries with the repository's existing validation library (Zod if already used).

~~~ts
type EvidenceKind =
  | 'client_stated'
  | 'client_confirmed'
  | 'coach_observation'
  | 'hypothesis'
  | 'not_established';

type ConfirmState = 'draft' | 'accepted' | 'edited' | 'declined' | 'deferred';

type EvidenceRef = {
  sourceType: 'answer' | 'transcript_turn' | 'client_edit' | 'coach_note';
  sourceId: string;
};

type ReportItem<T> = {
  value: T;
  evidence: EvidenceKind;
  sourceRefs: EvidenceRef[];
  confirmation: ConfirmState;
};

type SelfRating = {
  measureKey: string;
  label: string;
  scaleMin: number;
  scaleMax: number;
  before: null | { value: number; capturedAt: string; source: 'client_self_report' };
  after: null | { value: number; capturedAt: string; source: 'client_self_report' };
  direction: 'higher_is_better' | 'lower_is_better' | 'neutral';
  comparable: boolean;
};

type CoachingAction = {
  id: string;
  title: string;
  description: string;
  role: 'start' | 'build' | 'review';
  dueAt: string | null;
  trigger: string | null;
  minimumDoneDefinition: string | null;
  likelyObstacle: string | null;
  fallback: string | null;
  status: 'proposed' | 'accepted' | 'in_progress' | 'done' | 'blocked' | 'declined';
  confirmation: ConfirmState;
  evidence: EvidenceRef[];
  planItemId?: string | null;
};

type CoachingSessionReportV2 = {
  schemaVersion: '2.0';
  reportId: string;
  sessionId: string;
  locale: 'en' | 'ru' | 'es';
  createdAt: string;
  updatedAt: string;
  coach: { personaId: string; personaVersion: string; specialtyKey: string };
  sessionMeta: { durationSeconds: number | null; schemeKey: string; schemeVersion: string };
  consent: {
    reportStorage: boolean;
    priorContextUse: boolean;
    transcriptAnalysis: boolean;
  };
  request: ReportItem<string> | null;
  desiredOutcome: ReportItem<string> | null;
  keyContext: ReportItem<string>[];
  mainDifficulty: ReportItem<string> | null;
  maintainingPattern: ReportItem<{
    trigger: string;
    internalResponse: string;
    behavior: string;
    consequence: string;
  }> | null;
  hypotheses: ReportItem<string>[];
  keyInsight: ReportItem<string> | null;
  outcomes: {
    cognitive: ReportItem<string> | null;
    emotional: ReportItem<string> | null;
    behavioral: ReportItem<string> | null;
    resource: ReportItem<string> | null;
  };
  ratings: SelfRating[];
  decisions: ReportItem<string>[];
  unresolvedQuestions: ReportItem<string>[];
  actions: CoachingAction[];
  practices: Array<{
    resourceId: string;
    role: 'primary' | 'optional';
    rationale: string;
    confirmation: ConfirmState;
  }>;
  continuation: {
    recommendation: string | null;
    nextSessionFocus: string | null;
    suggestedSchemeKey: string | null;
    rationale: string | null;
  };
  safety: {
    routing: 'none' | 'human_support_recommended' | 'urgent_support';
    clientMessage: string | null;
  };
  clientReview: {
    status: 'pending' | 'confirmed' | 'corrected';
    reviewedAt: string | null;
  };
  provenance: {
    generatorVersion: string;
    promptVersion?: string;
    sourceMode: 'structured_answers' | 'approved_transcript' | 'hybrid';
  };
};
~~~

Schema constraints:
- Use stable semantic keys and localized display strings according to existing repo conventions.
- Client ownership must come from authenticated server context, never browser input.
- Source references are private and must not expose transcript text to the client by default.
- A hypothesis cannot become a decision or accepted action without explicit confirmation.
- Missing fields are null/empty and, where useful, marked “not discussed” or “not measured”.
- Avoid storing unnecessary quotes or duplicate transcript content.
- Keep the actual persisted schema consistent with existing database practices; this type is the target domain contract, not an instruction to add a duplicate table.

## 4. Persistence model and access policy

First inspect the current session storage and My Coaching Plan data model. The catalog tables under app_private introduced by PR #3980 are reference data; do not assume they store a client's completed session or report.

Preferred mapping:
- Reuse an existing private session/result record if compatible.
- Store owner, source session, report schema version, generation status, locale, timestamps, consent scope and canonical JSON.
- If there is no compatible entity, add one minimal private report entity through a reviewed additive migration. Do not duplicate existing data models.
- Store generation states: pending, ready, failed, needs_review.
- Corrections create a revision with actor, timestamp and changed fields. Do not silently mutate historical snapshots.
- Accepted plan actions should use existing My Coaching Plan entities. Only if no compatible entity exists, add the smallest private relation with owner, goal/area, report ID, session ID, action fields, status, confirmation, provenance and timestamps.

Idempotency/indexes:
- Unique report version by report ID + version.
- Unique plan import by accepted action ID + destination plan.
- Index client/report by owner + created time; plan actions by owner + area + status.
- Follow existing FK and client deletion/export semantics.

RLS:
- A client can read only their own reports.
- A client can update only permitted review, edits and confirmation fields.
- Server creates report only after verifying session ownership and consent.
- Coach persona is not a human staff identity and must not receive blanket client-table access.
- No public read policy.
- Test same-client access and cross-client rejection for every operation.
- Use existing secure service conventions; avoid new SECURITY DEFINER functions unless justified and reviewed.

## 5. Report generation pipeline

Build a staged orchestrator, not one giant LLM prompt.

### Stage A — Normalize
Inputs: session scheme/version, ordered Q&A, client-approved recap edits, ratings, persona/version, locale and consent flags. Normalize answer values, retain explicit skips and preserve stage order.

### Stage B — Evidence ledger
Create evidence items for client statements, explicit confirmations, observations, hypotheses and unresolved/not-asked topics. Every report fact must point to one or more source refs. No source ref means it cannot appear as a fact.

### Stage C — Choose profile
Select a report profile using session specialty and available evidence: stress/recovery, energy/burnout, anxiety, low mood, confidence, relationships, goals/motivation, work/business or generic GROW. The profile chooses emphasis and localized wording, not a different report schema.

### Stage D — Draft report
Prefer the client's language for request, goal, insight and decision. AI may compress/paraphrase and propose candidate mechanisms only when the approved existing model gateway is available and consented. Require evidence refs. Separate facts and hypotheses. Do not infer trauma, medical diagnosis, identity or hidden motives.

### Stage E — Propose actions
Generate no more than three action candidates:
- Start: smallest meaningful action.
- Build: repeat, prepare, communicate or remove one barrier.
- Review: observe/check/report back.

Each action needs a specific behavior, evidence reference, timing or trigger if known, and a minimum done definition. Ask the client if timing is unknown, or leave it null. Distinguish accepted commitment, edited commitment, optional idea, deferred and declined. A priority, date, resource, aspiration or rating is never an action by inference.

### Stage F — Validate
Validate schema, evidence coverage, consistency, comparability of ratings, action specificity, absence of unsupported claims, safety routing, localization and readability. Omit invalid fields or send them to client review; never fill gaps with guesses.

### Stage G — Client review
Show the recap and proposed actions. Record field-level client edits and acceptance. Freeze a report snapshot after review. Later corrections create a new revision with audit metadata.

### Stage H — Publish and connect
Save the canonical report, render the mobile page and optionally produce a PDF from that same JSON. Create plan items only for accepted actions following explicit client choice. Preserve source report/session links and idempotency.

## 6. Model gateway and prompting contract

Logical interfaces (adapt to actual existing service names):
- analyzeSessionForReport(input) → EvidenceLedger
- draftReport(ledger, profile, locale) → CoachingSessionReportDraft
- validateReport(draft, ledger) → ValidationResult
- reviseReport(draft, clientEdits) → CoachingSessionReportV2

Requirements:
- Use the existing approved provider/model gateway; no direct vendor SDK inside feature components.
- Strict structured JSON matching the schema.
- Each claim must cite source IDs; reject unsupported claims.
- Low-variance generation, bounded input and token budget.
- Record model ID and prompt version, never credentials.
- Treat transcript/answers as untrusted content, not system instructions.
- Timeout policy and at most one bounded retry; no retry loops or unexpected spend.
- No model call without consent and provider approval.
- Minimize payload: structured answers and selected excerpts preferred over the full transcript.
- Redact credentials, third-party personal data and unrelated sensitive content where possible.
- Private session data must not be used for model training absent separate explicit consent and product approval.

Deterministic fallback:
- Build an honest short report from explicit saved answers and client-confirmed edits.
- Omit mechanism analysis and unverified interpretation.
- Mark absent information not discussed/not measured.
- Keep only actions the client explicitly chose.
- Provider outage must never lose or block the saved session.

## 7. UX requirements

### 7.1 Immediate closeout screen
Mobile-first, one column:
- header: “Your session result”, date and duration;
- outcome summary (2–3 sentences);
- main difficulty;
- desired outcome;
- key insight with confirm/edit/not mine;
- decisions and unresolved questions;
- up to three action cards, each edit/accept/defer/decline;
- continuation recommendation and why;
- primary CTA: “Add accepted actions to My Coaching Plan”;
- secondary CTA: “Open full Coaching Report”.

Keep the main result and actions visible; use collapsible details for longer explanations. Do not present an overly long wall of text.

### 7.2 Full report
- Title, date, session direction, coach persona and objective.
- Outcome and next action above the fold.
- Separate headings: “What you said”, “What we explored”, “What remains a possibility”.
- Before/after values only when comparable; charts require equivalent text labels.
- Actions show status, timing/trigger, fallback and plan link.
- Visible client confirmation and revision status.
- Responsive font size and spacing for iPhone Safari.

### 7.3 My Coaching Plan
- Preserve existing life-area structure and report catalog in the existing section.
- Each imported action includes source report/session provenance.
- Unassigned actions wait for the client to choose a life area.
- New reports propose an update; they do not overwrite an existing goal.
- Recommendations for another specialist/session type are optional and explain the reason.
- Report history remains available next to plan, not in a second cabinet.

### 7.4 PDF
- On-demand rendering from canonical JSON; never regenerate report text separately.
- Same information as web report.
- Include locale, date, session type and report revision.
- Exclude internal prompts, reasoning trace and QA notes.
- PDF generation failure must not block report availability.

## 8. API/application service contracts

Adapt these logical operations to existing routing conventions; do not create duplicate endpoints if equivalents exist.

- POST /api/coaching/sessions/:sessionId/report/draft
  - verifies owner, session state and report-storage consent;
  - idempotently creates pending report;
  - returns report ID and state.
- GET /api/coaching/reports/:reportId
  - owner-authorized read.
- PATCH /api/coaching/reports/:reportId/review
  - accepts edits and field-level decisions;
  - rejects edits to immutable provenance.
- POST /api/coaching/reports/:reportId/plan-items
  - accepts selected confirmed action IDs and client-selected area/goal;
  - verifies ownership and confirmation;
  - uses idempotency key.
- GET /api/coaching/reports/:reportId/pdf
  - private PDF download from saved canonical content.
- GET /api/coaching/plan/context
  - minimum prior context only when allowed by consent.

All operations validate at the server boundary, use existing authentication helpers, rate-limit generation, prevent IDOR, and ignore browser-supplied ownership values.

## 9. State machine and recovery

~~~text
SESSION_ACTIVE
  -> CLOSEOUT_DRAFT
  -> CLIENT_REVIEW
  -> REPORT_PENDING
  -> REPORT_READY
  -> PLAN_LINKED (optional)

REPORT_PENDING -> REPORT_FAILED -> DETERMINISTIC_FALLBACK -> REPORT_READY
CLIENT_REVIEW -> CLIENT_CORRECTED -> REPORT_READY (new revision)
Any stage with safety trigger -> HUMAN_SUPPORT_RECOMMENDED / URGENT_SUPPORT
~~~

All states survive reload. A failed optional model call is not a failed session. Repeated requests must not create duplicate report versions or duplicate plan tasks.

## 10. Security, privacy and safety

- Authenticate each report operation and verify session/report ownership on the server.
- Test cross-client denial for reports, PDFs, revisions and plan imports.
- Do not log raw transcript or report content in analytics, public URLs or error messages.
- Use existing managed encryption and private storage; do not introduce another key system.
- Private signed URLs must be short-lived.
- Consent scopes and timestamps are separate: report storage, transcript analysis, prior-session context and sharing.
- Follow existing export, correction and deletion policies.
- Never expose hidden chain-of-thought. Client sees useful conclusions and evidence labels, not internal reasoning.
- Coaching is not diagnosis or therapy. For self-harm/suicidal intent, imminent danger, abuse or acute crisis, stop ordinary goal coaching and use the existing safety/human-support pathway. Do not continue with productivity tasks.
- For serious anxiety or low mood, recommend qualified human support without labeling or diagnosing the client.
- No guarantees or cure claims.

## 11. Localization and accessibility

- RU and EN complete for every title, section, control, error, status, confirmation and PDF label.
- Preserve ES parity where the existing catalog supports ES.
- Store semantic keys independent of localized labels.
- Follow existing message-language switching behavior without losing session state.
- Mobile Safari: large touch targets, focus visibility, reduced-motion, wrapping, no horizontal overflow.
- Charts have textual equivalents and do not rely on color alone.

## 12. Tests

### Unit
- Every report fact requires source refs.
- Hypothesis cannot become fact/decision/action without client confirmation.
- GROW priority answer is not an action.
- Chosen date is not an action.
- Before/after requires matching measure key and scale.
- Missing baseline displays “not measured”.
- Fewer than three confirmed actions remain fewer than three.
- Edit retains provenance and revision trail.
- Deterministic fallback works.
- All locales have complete labels and statuses.

### Integration
- Closeout persists and resumes after reload.
- Report generation requires consent.
- Cross-client reads/writes are rejected.
- Client can edit/accept/decline actions.
- Only accepted actions transfer to plan.
- Idempotency prevents duplicate plan items.
- New reports never overwrite existing goals.
- Links between session, report and plan work.
- AI timeout does not lose session.
- Safety trigger blocks ordinary recommendations.

### E2E
- Guest and signed-in flows as supported by current application.
- GROW overload 20-minute flow.
- Other available session profiles.
- RU/EN/ES.
- iPhone Safari: finish → confirm recap → open report → add action to plan → reopen from cabinet.
- PDF matches web content.
- Cross-account access attempt is denied.

### Release gates
- Existing coaching regression tests and npm run test:coaching:release remain green.
- Lint, typecheck, build, full CI and relevant browser E2E pass.
- Migration diff and RLS review complete.
- Apply migration only through approved deployment.
- Verify real production flow, not only mocks.
- No new paid service/provider without separate approval.

## 13. Delivery plan

**P0 — reliable recap and continuity**
1. Audit PR #3980 status, current session persistence, existing report archive and My Coaching Plan model.
2. Freeze validated schema and evidence ledger.
3. Implement deterministic recap and client confirmation from existing saved answers.
4. Persist reports privately with RLS/versioning, reusing current data structures where possible.
5. Import accepted actions into My Coaching Plan idempotently.
6. Add truthfulness, ownership and duplicate-action regression tests.

**P1 — report quality**
7. Add optional generation through the approved shared model gateway.
8. Add evidence validator and deterministic fallback.
9. Add profiles for stress, recovery, anxiety, low mood, confidence, relationships, goals and work/business.
10. Match one relevant practice/resource from the existing approved library.

**P2 — progress**
11. Add multi-session timeline and comparable measure charts.
12. Add client feedback, correction and review reminders.
13. Add PDF export from canonical JSON.
14. Prepare the next session from consented plan context.

Each phase is a reviewable PR. Keep the work on the existing coaching application.

## 14. Acceptance criteria

Feature is accepted when:
- Every completed session can show a short recap even when AI is unavailable.
- The recap covers all required closeout elements from the concept.
- Full report is grounded in saved session evidence.
- Client statements, coach observations and hypotheses are clearly separated.
- No unsupported clinical/psychological conclusions appear as facts.
- Before/after is honest and based only on comparable client ratings.
- Action candidates are editable and require client confirmation.
- The report does not fabricate three commitments.
- Only accepted actions can enter My Coaching Plan.
- Existing plan data is not overwritten.
- Client can reopen report in My Coaching Plan / Client Cabinet.
- Future sessions access only consented context.
- Report, revisions, PDF and plan links are private and ownership-checked.
- RU/EN/ES and mobile Safari pass.
- Existing GROW regression suite passes.
- No duplicate application, client store, payment or unapproved provider is introduced.

## 15. Handoff instruction

Begin with an audit of PR #3980 and the actual current branch. This is a report and plan-continuity layer, not a rewrite of the GROW runner. Coordinate merge dependencies if #3980 is still open. Do not claim LIVE until migrations, protected CI, production deployment and a real client-side end-to-end flow are verified.
