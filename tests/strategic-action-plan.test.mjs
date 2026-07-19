import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  buildStrategicActionPlan,
  validateCollectorRegistry,
} from '../scripts/build-strategic-action-plan.mjs';

function scorecard() {
  return {
    project_goals: [
      {
        project_id: 'alpha',
        project_name: 'Alpha',
        big_goal: 'Alpha reaches maximum quality.',
        progress_today: 50,
        daily_delta: 0,
        evidence_state: 'BLOCKED',
        next_quality_threshold: 'Prove the core journey.',
        rubric: [{ id: 'live' }],
      },
      {
        project_id: 'beta',
        project_name: 'Beta',
        big_goal: 'Beta reaches maximum quality.',
        progress_today: 70,
        daily_delta: 2,
        evidence_state: 'PROVEN',
        next_quality_threshold: 'Measure outcomes.',
        rubric: [{ id: 'outcomes' }],
      },
    ],
    system_intelligence_goal: {
      big_goal: 'The system chooses and completes the highest-leverage work.',
      progress_today: 80,
      daily_delta: 0,
      evidence_state: 'PROVEN',
      next_quality_threshold: 'Measure retry cost.',
      rubric: [{ id: 'visibility' }],
    },
  };
}

function collector(overrides = {}) {
  return {
    id: 'alpha-live',
    target_type: 'project',
    project_id: 'alpha',
    rubric_id: 'live',
    source_type: 'live_verified',
    owner_role: 'automation',
    cadence_hours: 24,
    impact_scope: 5,
    cross_project_leverage: 4,
    expected_score_gain: 10,
    automation_state: 'READY',
    last_success_at: null,
    route: '/safe',
    action: 'Prove the live journey.',
    success_contract: 'Every exact-live condition matches.',
    missing_proof: 'Current public evidence.',
    ...overrides,
  };
}

function registry(collectors) {
  return {
    schema_version: 1,
    observed_at: '2026-07-19T06:59:10+02:00',
    policy: { selection_count: 3 },
    collectors,
  };
}

function completeCollectors() {
  return [
    collector(),
    collector({
      id: 'beta-outcomes',
      project_id: 'beta',
      rubric_id: 'outcomes',
      source_type: 'observed_outcome',
      automation_state: 'PLANNED',
      impact_scope: 3,
      action: 'Measure the outcome.',
    }),
    collector({
      id: 'system-retry',
      target_type: 'system',
      project_id: undefined,
      rubric_id: 'visibility',
      source_type: 'observed_outcome',
      automation_state: 'PLANNED',
      action: 'Measure retries.',
    }),
    collector({
      id: 'alpha-owner-blocked',
      automation_state: 'BLOCKED_OWNER',
      impact_scope: 2,
      action: 'Wait for owner proof.',
    }),
  ];
}

test('requires collector coverage for every project and System Intelligence', () => {
  assert.throws(
    () => validateCollectorRegistry(registry([collector()]), scorecard()),
    /collector coverage missing for/,
  );
});

test('rejects collectors without accountable ownership or cadence', () => {
  assert.throws(
    () => validateCollectorRegistry(registry(completeCollectors().map((item) => (
      item.id === 'alpha-live' ? { ...item, owner_role: '' } : item
    ))), scorecard()),
    /owner_role is required/,
  );
  assert.throws(
    () => validateCollectorRegistry(registry(completeCollectors().map((item) => (
      item.id === 'alpha-live' ? { ...item, cadence_hours: 0 } : item
    ))), scorecard()),
    /cadence_hours must be a number/,
  );
});

test('selects exactly three deterministic non-healthy actions and keeps blocked work separate', () => {
  const result = buildStrategicActionPlan(registry(completeCollectors()), scorecard());
  assert.equal(result.selected_actions.length, 3);
  assert.deepEqual(
    result.selected_actions.map((item) => item.collector_id),
    ['alpha-live', 'system-retry', 'beta-outcomes'],
  );
  assert.equal(result.blocked_actions.length, 1);
  assert.equal(result.blocked_actions[0].collector_id, 'alpha-owner-blocked');
  assert.equal(result.selected_actions.some((item) => item.action_state === 'BLOCKED'), false);
});

test('healthy collectors are monitoring-only and overdue collectors become due', () => {
  const collectors = completeCollectors().map((item) => {
    if (item.id === 'alpha-live') {
      return { ...item, last_success_at: '2026-07-19T06:00:00+02:00' };
    }
    if (item.id === 'beta-outcomes') {
      return { ...item, automation_state: 'ACTIVE', cadence_hours: 1, last_success_at: '2026-07-18T00:00:00Z' };
    }
    return item;
  });
  const result = buildStrategicActionPlan(registry(collectors), scorecard());
  const healthy = result.collector_health.find((item) => item.collector_id === 'alpha-live');
  const due = result.collector_health.find((item) => item.collector_id === 'beta-outcomes');
  assert.equal(healthy.collector_health, 'HEALTHY');
  assert.equal(healthy.action_state, 'MONITOR');
  assert.equal(due.collector_health, 'DUE');
  assert.equal(due.action_state, 'ACTIONABLE');
});

test('canonical registry covers all active goals and produces exactly three actions', () => {
  const canonicalRegistry = JSON.parse(fs.readFileSync(
    'projects/codex-automation/strategic-collector-registry.json',
    'utf8',
  ));
  const canonicalScorecard = JSON.parse(fs.readFileSync(
    'projects/codex-automation/strategic-goal-scorecard.json',
    'utf8',
  ));
  const result = buildStrategicActionPlan(canonicalRegistry, canonicalScorecard);
  assert.equal(result.summary.target_count, canonicalScorecard.project_goals.length + 1);
  assert.equal(result.summary.covered_target_count, result.summary.target_count);
  assert.equal(result.selected_actions.length, canonicalRegistry.policy.selection_count);
  assert.equal(result.selected_actions.some((item) => item.collector_health === 'HEALTHY'), false);
});
