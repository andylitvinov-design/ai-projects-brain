#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_REGISTRY = 'projects/codex-automation/strategic-collector-registry.json';
const DEFAULT_SCORECARD = 'projects/codex-automation/strategic-goal-scorecard.json';
const DEFAULT_OUTPUT = 'projects/codex-automation/strategic-action-plan.json';

const SOURCE_TYPES = new Set([
  'merged_verified',
  'workflow_success',
  'live_verified',
  'observed_outcome',
  'owner_confirmed',
  'blocked',
  'needs_verification',
]);
const AUTOMATION_STATES = new Set([
  'ACTIVE',
  'READY',
  'PLANNED',
  'BLOCKED_OWNER',
  'BLOCKED_PROVIDER',
  'BLOCKED_EVIDENCE',
]);

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function assertObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
}

function assertString(value, label) {
  if (!value || typeof value !== 'string') throw new Error(`${label} is required`);
}

function assertTimestamp(value, label) {
  if (!value || !Number.isFinite(Date.parse(value))) throw new Error(`${label} must be a valid timestamp`);
}

function assertNumber(value, label, minimum, maximum) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < minimum || value > maximum) {
    throw new Error(`${label} must be a number from ${minimum} to ${maximum}`);
  }
}

function targetKey(targetType, projectId = null) {
  return targetType === 'system' ? 'system' : `project:${projectId}`;
}

function targetContexts(scorecard) {
  if (!Array.isArray(scorecard?.project_goals)) throw new Error('scorecard.project_goals must be an array');
  assertObject(scorecard.system_intelligence_goal, 'scorecard.system_intelligence_goal');

  const contexts = new Map();
  for (const project of scorecard.project_goals) {
    assertString(project.project_id, 'project.project_id');
    contexts.set(targetKey('project', project.project_id), {
      target_type: 'project',
      project_id: project.project_id,
      target_name: project.project_name,
      big_goal: project.big_goal,
      progress_today: project.progress_today,
      daily_delta: project.daily_delta,
      evidence_state: project.evidence_state,
      next_quality_threshold: project.next_quality_threshold,
      rubrics: new Set((project.rubric || []).map((dimension) => dimension.id)),
    });
  }

  const system = scorecard.system_intelligence_goal;
  contexts.set('system', {
    target_type: 'system',
    target_name: 'System Intelligence',
    big_goal: system.big_goal,
    progress_today: system.progress_today,
    daily_delta: system.daily_delta,
    evidence_state: system.evidence_state,
    next_quality_threshold: system.next_quality_threshold,
    rubrics: new Set((system.rubric || []).map((dimension) => dimension.id)),
  });
  return contexts;
}

function validateCollector(collector, index, contexts) {
  const label = `collectors[${index}]`;
  assertObject(collector, label);
  assertString(collector.id, `${label}.id`);
  if (!['project', 'system'].includes(collector.target_type)) {
    throw new Error(`${label}.target_type must be project or system`);
  }
  if (collector.target_type === 'project') assertString(collector.project_id, `${label}.project_id`);
  assertString(collector.rubric_id, `${label}.rubric_id`);
  if (!SOURCE_TYPES.has(collector.source_type)) throw new Error(`${label}.source_type is invalid`);
  assertString(collector.owner_role, `${label}.owner_role`);
  assertNumber(collector.cadence_hours, `${label}.cadence_hours`, 1, 8760);
  assertNumber(collector.impact_scope, `${label}.impact_scope`, 1, 5);
  assertNumber(collector.cross_project_leverage, `${label}.cross_project_leverage`, 1, 5);
  assertNumber(collector.expected_score_gain, `${label}.expected_score_gain`, 0, 25);
  if (!AUTOMATION_STATES.has(collector.automation_state)) {
    throw new Error(`${label}.automation_state is invalid`);
  }
  if (collector.last_success_at !== null && collector.last_success_at !== undefined) {
    assertTimestamp(collector.last_success_at, `${label}.last_success_at`);
  }
  assertString(collector.route, `${label}.route`);
  assertString(collector.action, `${label}.action`);
  assertString(collector.success_contract, `${label}.success_contract`);
  assertString(collector.missing_proof, `${label}.missing_proof`);

  const key = targetKey(collector.target_type, collector.project_id);
  const context = contexts.get(key);
  if (!context) throw new Error(`${label} points to unknown target ${key}`);
  if (!context.rubrics.has(collector.rubric_id)) {
    throw new Error(`${label}.rubric_id does not exist on ${key}`);
  }
}

export function validateCollectorRegistry(registry, scorecard) {
  if (registry?.schema_version !== 1) throw new Error('registry.schema_version must be 1');
  assertTimestamp(registry.observed_at, 'registry.observed_at');
  assertObject(registry.policy, 'registry.policy');
  if (!Number.isInteger(registry.policy.selection_count) || registry.policy.selection_count <= 0) {
    throw new Error('registry.policy.selection_count must be a positive integer');
  }
  if (!Array.isArray(registry.collectors)) throw new Error('registry.collectors must be an array');

  const contexts = targetContexts(scorecard);
  const ids = new Set();
  const coverage = new Map([...contexts.keys()].map((key) => [key, 0]));
  registry.collectors.forEach((collector, index) => {
    validateCollector(collector, index, contexts);
    if (ids.has(collector.id)) throw new Error(`duplicate collector id: ${collector.id}`);
    ids.add(collector.id);
    const key = targetKey(collector.target_type, collector.project_id);
    coverage.set(key, coverage.get(key) + 1);
  });

  const uncovered = [...coverage.entries()].filter(([, count]) => count === 0).map(([key]) => key);
  if (uncovered.length) throw new Error(`collector coverage missing for: ${uncovered.join(', ')}`);
  return { contexts, coverage };
}

function collectorHealth(collector, nowMs) {
  if (collector.automation_state.startsWith('BLOCKED_')) return { health: 'BLOCKED', age_hours: null };
  if (!collector.last_success_at) return { health: 'UNPROVEN', age_hours: null };
  const ageHours = Math.max(0, (nowMs - Date.parse(collector.last_success_at)) / 3_600_000);
  return {
    health: ageHours > collector.cadence_hours ? 'DUE' : 'HEALTHY',
    age_hours: Number(ageHours.toFixed(1)),
  };
}

function actionability(collector, health) {
  if (collector.automation_state.startsWith('BLOCKED_')) return 'BLOCKED';
  if (health === 'HEALTHY') return 'MONITOR';
  if (collector.automation_state === 'ACTIVE' || collector.automation_state === 'READY') return 'ACTIONABLE';
  return 'PLANNED';
}

function priorityScore(collector, context, health, actionState) {
  if (actionState === 'MONITOR') return 0;
  const gap = Math.max(0, 100 - context.progress_today);
  const evidenceBoost = context.evidence_state === 'BLOCKED' ? 12
    : context.evidence_state === 'NEEDS_VERIFICATION' ? 6 : 0;
  const stateBoost = actionState === 'ACTIONABLE' ? 18 : actionState === 'PLANNED' ? 6 : -10;
  const stallBoost = context.daily_delta <= 0 && gap >= 15 ? 10 : 0;
  const freshnessBoost = health === 'UNPROVEN' ? 8 : health === 'DUE' ? 12 : 0;
  return Number((
    gap * 0.45
    + collector.impact_scope * 8
    + collector.cross_project_leverage * 6
    + collector.expected_score_gain * 1.5
    + evidenceBoost
    + stateBoost
    + stallBoost
    + freshnessBoost
  ).toFixed(2));
}

export function buildStrategicActionPlan(registry, scorecard) {
  const { contexts, coverage } = validateCollectorRegistry(registry, scorecard);
  const nowMs = Date.parse(registry.observed_at);
  const records = registry.collectors.map((collector) => {
    const context = contexts.get(targetKey(collector.target_type, collector.project_id));
    const { health, age_hours: ageHours } = collectorHealth(collector, nowMs);
    const actionState = actionability(collector, health);
    const gap = Number((100 - context.progress_today).toFixed(1));
    const stalled = context.daily_delta <= 0 && gap >= 15;
    return {
      collector_id: collector.id,
      target_type: collector.target_type,
      ...(collector.target_type === 'project' ? { project_id: collector.project_id } : {}),
      target_name: context.target_name,
      rubric_id: collector.rubric_id,
      big_goal: context.big_goal,
      progress_today: context.progress_today,
      goal_gap: gap,
      daily_delta: context.daily_delta,
      evidence_state: context.evidence_state,
      collector_health: health,
      age_hours: ageHours,
      stall_state: stalled ? 'STALLED' : 'MOVING',
      action_state: actionState,
      priority_score: priorityScore(collector, context, health, actionState),
      source_type: collector.source_type,
      owner_role: collector.owner_role,
      cadence_hours: collector.cadence_hours,
      expected_score_gain: collector.expected_score_gain,
      route: collector.route,
      action: collector.action,
      success_contract: collector.success_contract,
      missing_proof: collector.missing_proof,
      next_quality_threshold: context.next_quality_threshold,
    };
  }).sort((a, b) => b.priority_score - a.priority_score || a.collector_id.localeCompare(b.collector_id));

  const selectionCount = registry.policy.selection_count;
  const selectable = records.filter((record) => ['ACTIONABLE', 'PLANNED'].includes(record.action_state));
  const selected = selectable.slice(0, selectionCount);
  if (selected.length < selectionCount) {
    selected.push(...records.filter((record) => record.action_state === 'BLOCKED').slice(0, selectionCount - selected.length));
  }
  if (selected.length !== selectionCount) {
    throw new Error(`unable to select exactly ${selectionCount} strategic actions`);
  }

  return {
    schema_version: 1,
    observed_at: registry.observed_at,
    status: 'strategic_action_plan',
    selection_policy: {
      count: selectionCount,
      rule: 'Rank non-healthy collectors by confirmed goal gap, portfolio leverage, expected rubric impact, evidence state, readiness and stall risk. Healthy collectors remain monitoring-only.',
    },
    summary: {
      target_count: contexts.size,
      collector_count: records.length,
      covered_target_count: [...coverage.values()].filter((count) => count > 0).length,
      healthy_collectors: records.filter((record) => record.collector_health === 'HEALTHY').length,
      actionable_collectors: records.filter((record) => record.action_state === 'ACTIONABLE').length,
      planned_collectors: records.filter((record) => record.action_state === 'PLANNED').length,
      blocked_collectors: records.filter((record) => record.action_state === 'BLOCKED').length,
      stalled_targets: new Set(records.filter((record) => record.stall_state === 'STALLED').map((record) => record.target_name)).size,
    },
    selected_actions: selected.map((record, index) => ({ rank: index + 1, ...record })),
    blocked_actions: records.filter((record) => record.action_state === 'BLOCKED'),
    collector_health: records,
  };
}

function atomicWrite(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, filePath);
}

function main() {
  const args = process.argv.slice(2);
  const registryFile = argValue(args, '--registry', DEFAULT_REGISTRY);
  const scorecardFile = argValue(args, '--scorecard', DEFAULT_SCORECARD);
  const outputFile = argValue(args, '--output', DEFAULT_OUTPUT);
  const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
  const scorecard = JSON.parse(fs.readFileSync(scorecardFile, 'utf8'));
  const plan = buildStrategicActionPlan(registry, scorecard);
  atomicWrite(outputFile, plan);
  process.stdout.write(`${JSON.stringify({
    status: 'STRATEGIC_ACTION_PLAN_BUILT',
    observed_at: plan.observed_at,
    collector_count: plan.summary.collector_count,
    selected_count: plan.selected_actions.length,
    blocked_count: plan.summary.blocked_collectors,
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
