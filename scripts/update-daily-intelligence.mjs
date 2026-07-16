#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UNKNOWN = new Set(['unknown', 'not_applicable', 'not_instrumented', null, undefined, '']);
const LABELS = new Set(['NEW', 'CHANGED', 'UNCHANGED', 'RESOLVED', 'SUPERSEDED']);

function isUnknown(value) {
  return UNKNOWN.has(typeof value === 'string' ? value.trim().toLowerCase() : value);
}

function sameValue(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function numericDelta(today, yesterday) {
  return typeof today === 'number' && Number.isFinite(today) && typeof yesterday === 'number' && Number.isFinite(yesterday)
    ? Number((today - yesterday).toFixed(1))
    : 'state';
}

function directionFor(delta, label) {
  if (label === 'RESOLVED') return 'improved';
  if (label === 'SUPERSEDED') return 'replaced';
  if (typeof delta !== 'number' || delta === 0) return 'flat';
  return delta > 0 ? 'up' : 'down';
}

function metricRows(dashboard) {
  if (!Array.isArray(dashboard.metric_schema) || !Array.isArray(dashboard.metrics)) return [];
  return dashboard.metrics.map((row) => Object.fromEntries(dashboard.metric_schema.map((field, index) => [field, row[index]])));
}

function labelFor({ previous, current }) {
  if (!previous) return 'NEW';
  if (['superseded', 'retired'].includes(String(current.lifecycle || '').toLowerCase())) return 'SUPERSEDED';
  if (isUnknown(previous.today) && !isUnknown(current.value)) return 'RESOLVED';
  if (sameValue(previous.today, current.value)) return 'UNCHANGED';
  return 'CHANGED';
}

function consequenceFor(metric, label) {
  const base = metric.interpretation || metric.summary || metric.source || 'Observed metric state recorded.';
  if (label === 'UNCHANGED') return `No observed change. ${base}`;
  if (label === 'RESOLVED') return `Previously unknown or blocked evidence became observed. ${base}`;
  if (label === 'SUPERSEDED') return `The previous state is no longer decision-active. ${base}`;
  if (label === 'NEW') return `New tracked evidence entered the dashboard. ${base}`;
  return `Observed state changed. ${base}`;
}

function recommendationFor(metric) {
  return metric.recommended_action || metric.next_action || metric.what_improves_it || 'Collect the next required evidence and update this metric.';
}

function assertProgress(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`${label} must be a number from 0 to 100`);
  }
}

function validateGoal(goal, label) {
  if (!goal || typeof goal !== 'object') throw new Error(`${label} is required`);
  if (!Array.isArray(goal.rubric) || goal.rubric.length < 4) throw new Error(`${label}.rubric must contain at least four dimensions`);
  const totalWeight = goal.rubric.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  if (totalWeight !== 100) throw new Error(`${label}.rubric weights must sum to 100`);
  for (const [index, item] of goal.rubric.entries()) {
    assertProgress(item.today_score, `${label}.rubric[${index}].today_score`);
    if (item.yesterday_score !== null && item.yesterday_score !== undefined) {
      assertProgress(item.yesterday_score, `${label}.rubric[${index}].yesterday_score`);
    }
  }
  assertProgress(goal.progress_today, `${label}.progress_today`);
  if (goal.progress_yesterday !== null && goal.progress_yesterday !== undefined) {
    assertProgress(goal.progress_yesterday, `${label}.progress_yesterday`);
  }
}

function normalizeGoal(goal, previousGoal, label, { sameObservationDate = false } = {}) {
  validateGoal(goal, label);
  const progressYesterday = sameObservationDate
    ? (goal.progress_yesterday ?? previousGoal?.progress_yesterday ?? null)
    : (typeof previousGoal?.progress_today === 'number' ? previousGoal.progress_today : (goal.progress_yesterday ?? null));
  const dailyDelta = typeof progressYesterday === 'number'
    ? Number((goal.progress_today - progressYesterday).toFixed(1))
    : null;
  return {
    ...goal,
    progress_yesterday: progressYesterday,
    daily_delta: dailyDelta,
  };
}

export function buildStrategicGoals(previous = {}, strategicGoals) {
  if (!strategicGoals) {
    return {
      project_goals: previous.project_goals || [],
      system_intelligence_goal: previous.system_intelligence_goal || null,
      strategic_history: previous.strategic_history || [],
      strategic_observed_at: previous.strategic_observed_at || null,
    };
  }

  const date = String(strategicGoals.observed_at).slice(0, 10);
  const previousDate = String(previous.strategic_observed_at || '').slice(0, 10);
  const sameObservationDate = previousDate === date;
  const previousById = new Map((previous.project_goals || []).map((goal) => [goal.project_id, goal]));
  const projectGoals = strategicGoals.project_goals.map((goal, index) =>
    normalizeGoal(goal, previousById.get(goal.project_id), `project_goals[${index}]`, { sameObservationDate }));
  const systemIntelligenceGoal = normalizeGoal(
    strategicGoals.system_intelligence_goal,
    previous.system_intelligence_goal,
    'system_intelligence_goal',
    { sameObservationDate },
  );
  const historyEntry = {
    date,
    projects: Object.fromEntries(projectGoals.map((goal) => [goal.project_id, goal.progress_today])),
    system_intelligence: systemIntelligenceGoal.progress_today,
  };
  const strategicHistory = [
    ...(previous.strategic_history || []).filter((entry) => entry.date !== date),
    historyEntry,
  ].slice(-30);

  return {
    project_goals: projectGoals,
    system_intelligence_goal: systemIntelligenceGoal,
    strategic_history: strategicHistory,
    strategic_observed_at: strategicGoals.observed_at,
  };
}

export function buildDailyIntelligence(dashboard, { observedAt, explicitChanges = [], strategicGoals } = {}) {
  const previous = dashboard.daily_intelligence || {};
  const previousById = new Map((previous.indicators || []).map((item) => [item.id, item]));
  const metrics = metricRows(dashboard);

  const indicators = metrics.map((metric) => {
    const prior = previousById.get(metric.id);
    const yesterday = prior ? prior.today : (metric.previous_value ?? 'unknown');
    const deltaLabel = labelFor({ previous: prior, current: metric });
    const delta = numericDelta(metric.value, yesterday);
    return {
      id: metric.id,
      name: metric.name || metric.id,
      yesterday,
      today: metric.value ?? 'unknown',
      delta,
      delta_label: deltaLabel,
      direction: directionFor(delta, deltaLabel),
      consequence: consequenceFor(metric, deltaLabel),
      recommendation: recommendationFor(metric),
      confidence: metric.confidence || 'unknown',
    };
  });

  const explicit = explicitChanges.filter((item) => LABELS.has(item.delta_label));
  const material = indicators.filter((item) => item.delta_label !== 'UNCHANGED');
  const criticalUnchanged = indicators.filter((item) => item.delta_label === 'UNCHANGED' && /BLOCKED|FAIL|STALE|unknown/i.test(String(item.today))).slice(0, 3);
  const changes = [...explicit, ...material, ...criticalUnchanged]
    .filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id && candidate.delta_label === item.delta_label) === index)
    .map((item) => ({
      id: item.id,
      name: item.name || item.id,
      delta_label: item.delta_label,
      consequence: item.consequence || 'Observed change recorded.',
    }));

  const recommendations = indicators
    .filter((item) => item.recommendation && item.recommendation !== 'unknown')
    .sort((a, b) => {
      const rank = { RESOLVED: 4, NEW: 3, CHANGED: 2, UNCHANGED: 1, SUPERSEDED: 0 };
      return (rank[b.delta_label] ?? 0) - (rank[a.delta_label] ?? 0);
    })
    .slice(0, 5)
    .map((item, index) => ({
      rank: index + 1,
      title: item.name,
      action: item.recommendation,
      evidence_state: item.confidence,
      expected_outcome: item.consequence,
    }));

  const stability = indicators
    .filter((item) => item.delta_label === 'UNCHANGED')
    .map((item) => {
      const prior = previous.stability?.find((entry) => entry.id === item.id);
      return {
        id: item.id,
        name: item.name,
        consecutive_days_unchanged: (prior?.consecutive_days_unchanged || 0) + 1,
        reason: item.consequence,
      };
    });

  const date = String(observedAt || dashboard.last_updated || new Date().toISOString()).slice(0, 10);
  const historyEntry = {
    date,
    changed: indicators.filter((item) => item.delta_label === 'CHANGED').length,
    new: indicators.filter((item) => item.delta_label === 'NEW').length,
    resolved: indicators.filter((item) => item.delta_label === 'RESOLVED').length,
    superseded: indicators.filter((item) => item.delta_label === 'SUPERSEDED').length,
    unchanged: indicators.filter((item) => item.delta_label === 'UNCHANGED').length,
  };
  const history = [...(previous.history || []).filter((entry) => entry.date !== date), historyEntry].slice(-30);
  const mainWin = indicators.find((item) => item.delta_label === 'RESOLVED') || indicators.find((item) => item.delta_label === 'CHANGED');
  const mainRisk = indicators.find((item) => item.delta_label === 'UNCHANGED' && /BLOCKED|FAIL|STALE|unknown/i.test(String(item.today))) || indicators.find((item) => isUnknown(item.today));
  const strategic = buildStrategicGoals(previous, strategicGoals);

  return {
    summary: {
      score_now: 'unknown',
      score_yesterday: previous.summary?.score_now ?? 'unknown',
      change: 'state-based; no synthetic aggregate score',
      main_win: mainWin ? `${mainWin.name}: ${mainWin.consequence}` : 'No newly observed improvement.',
      main_risk: mainRisk ? `${mainRisk.name}: ${mainRisk.consequence}` : 'No new critical risk observed.',
      next_step: recommendations[0]?.action || 'Collect the next required evidence.',
      generated_from: 'metric_schema + metrics + previous daily_intelligence snapshot',
    },
    indicators,
    changes,
    recommendations,
    stability,
    history,
    ...strategic,
  };
}

export function updateDashboardObject(dashboard, options = {}) {
  return { ...dashboard, daily_intelligence: buildDailyIntelligence(dashboard, options) };
}

function atomicWrite(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temp = `${filePath}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temp, filePath);
}

function main() {
  const args = process.argv.slice(2);
  const input = args.includes('--input') ? args[args.indexOf('--input') + 1] : 'projects/codex-automation/system-health-dashboard.json';
  const mirror = args.includes('--mirror') ? args[args.indexOf('--mirror') + 1] : null;
  const observedAt = args.includes('--observed-at') ? args[args.indexOf('--observed-at') + 1] : undefined;
  const explicitGoalsFile = args.includes('--goals') ? args[args.indexOf('--goals') + 1] : null;
  const defaultGoalsFile = 'projects/codex-automation/strategic-goal-scorecard.json';
  const goalsFile = explicitGoalsFile || (fs.existsSync(defaultGoalsFile) ? defaultGoalsFile : null);
  const strategicGoals = goalsFile ? JSON.parse(fs.readFileSync(goalsFile, 'utf8')) : undefined;
  const dashboard = JSON.parse(fs.readFileSync(input, 'utf8'));
  const updated = updateDashboardObject(dashboard, { observedAt, strategicGoals });
  atomicWrite(input, updated);
  if (mirror) atomicWrite(mirror, updated);
  process.stdout.write(JSON.stringify({
    status: 'UPDATED',
    input,
    mirror,
    indicators: updated.daily_intelligence.indicators.length,
    project_goals: updated.daily_intelligence.project_goals.length,
    history: updated.daily_intelligence.history.length,
    strategic_history: updated.daily_intelligence.strategic_history.length,
  }) + '\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
