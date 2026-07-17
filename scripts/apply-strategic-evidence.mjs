#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_SCORECARD = 'projects/codex-automation/strategic-goal-scorecard.json';
const DEFAULT_EVIDENCE = 'projects/codex-automation/strategic-evidence.json';
const DEFAULT_DASHBOARD = 'projects/codex-automation/system-health-dashboard.json';
const EVIDENCE_STATES = new Set(['PROVEN', 'NEEDS_VERIFICATION', 'BLOCKED', 'RESOLVED', 'SUPERSEDED']);
const POSITIVE_SOURCE_STATES = new Set(['merged_verified', 'workflow_success', 'live_verified', 'observed_outcome', 'owner_confirmed']);
const LIVE_SOURCE_STATES = new Set(['live_verified', 'observed_outcome', 'owner_confirmed']);
const SOURCE_SCORE_CEILINGS = Object.freeze({
  merged_verified: 90,
  workflow_success: 85,
  live_verified: 100,
  observed_outcome: 100,
  owner_confirmed: 100,
  blocked: 100,
  needs_verification: 100,
});

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertTimestamp(value, label) {
  if (!value || !Number.isFinite(Date.parse(value))) throw new Error(`${label} must be a valid timestamp`);
}

function assertScore(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`${label} must be a number from 0 to 100`);
  }
}

function assertSourceUrl(value, label) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid URL`);
  }
  if (parsed.protocol !== 'https:') throw new Error(`${label} must use https`);
  const allowed = parsed.hostname === 'github.com'
    || parsed.hostname === 'api.github.com'
    || parsed.hostname.endsWith('.githubusercontent.com')
    || parsed.hostname.endsWith('.netlify.app')
    || parsed.hostname === 'app.netlify.com';
  if (!allowed) throw new Error(`${label} host is not allowed`);
}

function weightedProgress(goal) {
  const totalWeight = goal.rubric.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  if (totalWeight !== 100) throw new Error(`${goal.project_id || goal.goal_id || 'goal'}.rubric weights must sum to 100`);
  const value = goal.rubric.reduce((sum, item) => {
    assertScore(item.today_score, `${goal.project_id || goal.goal_id || 'goal'}.${item.id}.today_score`);
    return sum + (Number(item.weight) * item.today_score) / 100;
  }, 0);
  return Number(value.toFixed(1));
}

function validateEvidenceEntry(entry, index) {
  const label = `entries[${index}]`;
  if (!entry || typeof entry !== 'object') throw new Error(`${label} is required`);
  if (!entry.id || typeof entry.id !== 'string') throw new Error(`${label}.id is required`);
  if (!['project', 'system'].includes(entry.target_type)) throw new Error(`${label}.target_type must be project or system`);
  if (entry.target_type === 'project' && !entry.project_id) throw new Error(`${label}.project_id is required`);
  if (!entry.rubric_id) throw new Error(`${label}.rubric_id is required`);
  assertScore(entry.proposed_score, `${label}.proposed_score`);
  if (!EVIDENCE_STATES.has(entry.evidence_state)) throw new Error(`${label}.evidence_state is invalid`);
  if (!Object.hasOwn(SOURCE_SCORE_CEILINGS, entry.source_state)) throw new Error(`${label}.source_state is invalid`);
  assertTimestamp(entry.observed_at, `${label}.observed_at`);
  assertSourceUrl(entry.source_url, `${label}.source_url`);
  if (!entry.source_ref || typeof entry.source_ref !== 'string') throw new Error(`${label}.source_ref is required`);
  if (!entry.summary || typeof entry.summary !== 'string') throw new Error(`${label}.summary is required`);
}

function updateMissingConditions(goal, entry) {
  const remove = new Set(entry.missing_conditions_remove || []);
  const existing = (goal.missing_conditions || []).filter((item) => !remove.has(item));
  return [...new Set([...existing, ...(entry.missing_conditions_add || [])])];
}

function baselineFor(goal, targetType, previousDay, sameObservationDate) {
  const historical = targetType === 'system'
    ? previousDay?.system_intelligence
    : previousDay?.projects?.[goal.project_id];
  if (typeof historical === 'number' && Number.isFinite(historical)) return historical;
  if (sameObservationDate && typeof goal.progress_yesterday === 'number') return goal.progress_yesterday;
  return goal.progress_today;
}

function normalizeDailyDeltas(scorecard, previousDay) {
  if (!previousDay) return;
  for (const goal of scorecard.project_goals || []) {
    const baseline = previousDay.projects?.[goal.project_id];
    if (typeof baseline !== 'number' || !Number.isFinite(baseline)) continue;
    goal.progress_yesterday = baseline;
    goal.progress_today = weightedProgress(goal);
    goal.daily_delta = Number((goal.progress_today - baseline).toFixed(1));
    goal.change_state = goal.daily_delta === 0 ? 'UNCHANGED' : 'CHANGED';
  }
  const system = scorecard.system_intelligence_goal;
  const systemBaseline = previousDay.system_intelligence;
  if (system && typeof systemBaseline === 'number' && Number.isFinite(systemBaseline)) {
    system.progress_yesterday = systemBaseline;
    system.progress_today = weightedProgress(system);
    system.daily_delta = Number((system.progress_today - systemBaseline).toFixed(1));
    system.change_state = system.daily_delta === 0 ? 'UNCHANGED' : 'CHANGED';
  }
}

function previousDayFromDashboard(dashboard, evidenceDate) {
  const history = dashboard?.daily_intelligence?.strategic_history;
  if (!Array.isArray(history)) return null;
  return history
    .filter((entry) => entry?.date && entry.date < evidenceDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .at(-1) || null;
}

export function applyStrategicEvidence(inputScorecard, evidenceLedger, { previousDay = null } = {}) {
  if (inputScorecard?.schema_version !== 1) throw new Error('scorecard.schema_version must be 1');
  if (evidenceLedger?.schema_version !== 1) throw new Error('evidence.schema_version must be 1');
  assertTimestamp(evidenceLedger.observed_at, 'evidence.observed_at');
  if (!Array.isArray(evidenceLedger.entries)) throw new Error('evidence.entries must be an array');

  const duplicateIds = evidenceLedger.entries
    .map((entry) => entry?.id)
    .filter((id, index, all) => id && all.indexOf(id) !== index);
  if (duplicateIds.length) throw new Error(`duplicate evidence ids: ${[...new Set(duplicateIds)].join(', ')}`);

  const scorecard = deepClone(inputScorecard);
  const evidenceDate = String(evidenceLedger.observed_at).slice(0, 10);
  const sameObservationDate = String(inputScorecard.observed_at || '').slice(0, 10) === evidenceDate;
  const appliedBefore = new Set(scorecard.evidence_ingestion?.applied_evidence_ids || []);
  const projectById = new Map((scorecard.project_goals || []).map((goal) => [goal.project_id, goal]));
  const touched = new Map();
  const results = [];
  const appliedNow = [];

  for (const [index, entry] of evidenceLedger.entries.entries()) {
    validateEvidenceEntry(entry, index);
    if (appliedBefore.has(entry.id)) {
      results.push({ id: entry.id, status: 'ALREADY_APPLIED' });
      continue;
    }

    const goal = entry.target_type === 'system'
      ? scorecard.system_intelligence_goal
      : projectById.get(entry.project_id);
    if (!goal) throw new Error(`target goal not found for evidence ${entry.id}`);
    const dimension = goal.rubric.find((item) => item.id === entry.rubric_id);
    if (!dimension) throw new Error(`rubric dimension not found for evidence ${entry.id}`);

    const currentScore = dimension.today_score;
    assertScore(currentScore, `${entry.id}.current_score`);
    const isIncrease = entry.proposed_score > currentScore;
    if (isIncrease) {
      if (entry.evidence_state !== 'PROVEN') throw new Error(`${entry.id}: score increase requires PROVEN evidence`);
      if (!POSITIVE_SOURCE_STATES.has(entry.source_state)) throw new Error(`${entry.id}: source state cannot support a score increase`);
      if (entry.requires_live_proof && !LIVE_SOURCE_STATES.has(entry.source_state)) {
        throw new Error(`${entry.id}: live-required dimension needs live_verified, observed_outcome or owner_confirmed evidence`);
      }
      const ceiling = SOURCE_SCORE_CEILINGS[entry.source_state];
      if (entry.proposed_score > ceiling) throw new Error(`${entry.id}: proposed score exceeds ${entry.source_state} ceiling ${ceiling}`);
    }

    const goalKey = entry.target_type === 'system' ? 'system' : entry.project_id;
    if (!touched.has(goalKey)) {
      touched.set(goalKey, {
        goal,
        baselineProgress: baselineFor(goal, entry.target_type, previousDay, sameObservationDate),
        summaries: [],
      });
    }

    if (!sameObservationDate || dimension.yesterday_score === null || dimension.yesterday_score === undefined) {
      dimension.yesterday_score = currentScore;
    }
    dimension.today_score = entry.proposed_score;
    dimension.evidence_state = entry.evidence_state;
    dimension.evidence = entry.summary;
    dimension.evidence_ref = {
      id: entry.id,
      source_state: entry.source_state,
      source_url: entry.source_url,
      source_ref: entry.source_ref,
      observed_at: entry.observed_at,
    };

    goal.missing_conditions = updateMissingConditions(goal, entry);
    if (entry.next_quality_threshold) goal.next_quality_threshold = entry.next_quality_threshold;
    if (entry.goal_evidence_state) {
      if (!EVIDENCE_STATES.has(entry.goal_evidence_state)) throw new Error(`${entry.id}: goal_evidence_state is invalid`);
      goal.evidence_state = entry.goal_evidence_state;
    }
    touched.get(goalKey).summaries.push(entry.summary);
    appliedBefore.add(entry.id);
    appliedNow.push(entry.id);
    results.push({
      id: entry.id,
      status: 'APPLIED',
      target: goalKey,
      rubric_id: entry.rubric_id,
      previous_score: currentScore,
      proposed_score: entry.proposed_score,
    });
  }

  for (const { goal, baselineProgress, summaries } of touched.values()) {
    goal.progress_yesterday = baselineProgress;
    goal.progress_today = weightedProgress(goal);
    goal.daily_delta = Number((goal.progress_today - baselineProgress).toFixed(1));
    goal.change_state = goal.daily_delta === 0 ? 'UNCHANGED' : 'CHANGED';
    goal.why_changed = summaries.join(' ');
  }

  normalizeDailyDeltas(scorecard, previousDay);

  if (appliedNow.length) scorecard.observed_at = evidenceLedger.observed_at;
  scorecard.evidence_ingestion = {
    schema_version: 1,
    last_observed_at: evidenceLedger.observed_at,
    applied_evidence_ids: [...appliedBefore].sort(),
    last_run: {
      applied: appliedNow,
      skipped: results.filter((item) => item.status === 'ALREADY_APPLIED').map((item) => item.id),
      source_ledger_status: evidenceLedger.status || 'unknown',
    },
    daily_baseline: previousDay ? {
      date: previousDay.date,
      source: 'dashboard.daily_intelligence.strategic_history',
    } : null,
  };

  return { scorecard, results };
}

function atomicWrite(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, filePath);
}

function main() {
  const args = process.argv.slice(2);
  const scorecardFile = argValue(args, '--scorecard', DEFAULT_SCORECARD);
  const evidenceFile = argValue(args, '--evidence', DEFAULT_EVIDENCE);
  const outputFile = argValue(args, '--output', scorecardFile);
  const dashboardFile = argValue(args, '--dashboard', DEFAULT_DASHBOARD);
  const scorecard = JSON.parse(fs.readFileSync(scorecardFile, 'utf8'));
  const evidence = JSON.parse(fs.readFileSync(evidenceFile, 'utf8'));
  const dashboard = fs.existsSync(dashboardFile) ? JSON.parse(fs.readFileSync(dashboardFile, 'utf8')) : null;
  const previousDay = previousDayFromDashboard(dashboard, String(evidence.observed_at).slice(0, 10));
  const result = applyStrategicEvidence(scorecard, evidence, { previousDay });
  atomicWrite(outputFile, result.scorecard);
  process.stdout.write(`${JSON.stringify({
    status: 'STRATEGIC_EVIDENCE_APPLIED',
    observed_at: result.scorecard.observed_at,
    applied: result.results.filter((item) => item.status === 'APPLIED').length,
    skipped: result.results.filter((item) => item.status === 'ALREADY_APPLIED').length,
    project_count: result.scorecard.project_goals.length,
    system_progress: result.scorecard.system_intelligence_goal.progress_today,
  })}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
