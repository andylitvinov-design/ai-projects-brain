import test from 'node:test';
import assert from 'node:assert/strict';
import { applyStrategicGoalScorecard } from '../scripts/apply-strategic-goal-scorecard.mjs';

const timestamp = '2026-07-16T06:58:20+02:00';

function scorecard() {
  const rubric = [
    { id: 'a', name: 'A', weight: 25, yesterday_score: 40, today_score: 60 },
    { id: 'b', name: 'B', weight: 25, yesterday_score: 40, today_score: 60 },
    { id: 'c', name: 'C', weight: 25, yesterday_score: 40, today_score: 60 },
    { id: 'd', name: 'D', weight: 25, yesterday_score: 40, today_score: 60 },
  ];
  return {
    schema_version: 1,
    observed_at: timestamp,
    project_goals: [{
      project_id: 'alpha', project_name: 'Alpha', big_goal: 'Maximum-quality Alpha.', rubric,
      progress_yesterday: 40, progress_today: 60, daily_delta: 20, evidence_state: 'PROVEN',
      missing_conditions: ['Live proof'], next_quality_threshold: 'Prove live.',
    }],
    system_intelligence_goal: {
      goal_id: 'system', big_goal: 'Maximum-quality system.', rubric,
      progress_yesterday: 40, progress_today: 60, daily_delta: 20, evidence_state: 'PROVEN',
      missing_conditions: [], next_quality_threshold: 'Automate evidence.',
    },
  };
}

function dashboard(overrides = {}) {
  return {
    schema_version: 6,
    metric_model: 'adaptive_portfolio_project_goal_v1',
    last_updated: '2026-07-15T20:23:05+02:00',
    status: 'evening_upgrade_publication_stale',
    live_url: 'https://brain-management.netlify.app/system-health-dashboard/',
    main_upgrade: { id: 'old', status: 'APPLIED_UPGRADE', summary: 'old', why: 'old' },
    portfolio_health: {
      state: 'NEEDS_ATTENTION', active_projects: 1, observed_projects: 1, blocked_projects: 0,
      strongest_positive_change: { project_id: 'alpha', change: 'old' },
      largest_risk: { project_id: 'alpha', risk: 'old' },
    },
    daily_intelligence: {
      indicators: [], history: [],
      strategic_history: [{ date: '2026-07-15', projects: { alpha: 40 }, system_intelligence: 40 }],
    },
    publication_evidence: {
      trace_path: 'trace.json', publication_status: 'STALE', success_allowed: false,
      canonical_snapshot_timestamp: '2026-07-15T20:23:05+02:00',
      stages: {
        deploy_identified: {
          status: 'stale', timestamp: '2026-07-15T08:00:21.606Z', deploy_id: 'deploy',
          source_commit_sha: 'a'.repeat(40), branch: 'main',
        },
      },
    },
    activity_log: [],
    system_intelligence_gain: {
      rules_improved: 1,
      validators_added_or_tightened: 2,
      deterministic_checks_added: 1,
      evidence_fields_added: 0,
      automation_contracts_improved: 1,
      dashboard_registry_schema_improvements: 1,
    },
    ...overrides,
  };
}

const markdown = `# Dashboard

**Metric model:** \`adaptive_portfolio_project_goal_v1\`  
**Last updated:** \`2026-07-15T20:23:05+02:00\`  
**Evening result:** \`APPLIED_UPGRADE\`  
**Public publication state:** \`STALE\`
`;

test('applies project and system scoreboards without inventing LIVE state', () => {
  const result = applyStrategicGoalScorecard(dashboard(), markdown, scorecard());
  assert.equal(result.dashboard.last_updated, timestamp);
  assert.equal(result.dashboard.main_upgrade.id, 'portfolio_strategic_goal_scoreboard');
  assert.equal(result.dashboard.daily_intelligence.project_goals[0].progress_today, 60);
  assert.equal(result.dashboard.daily_intelligence.system_intelligence_goal.progress_today, 60);
  assert.equal(result.dashboard.daily_intelligence.strategic_history.length, 2);
  assert.equal(result.dashboard.daily_intelligence.strategic_application.accounting, 'counted_once');
  assert.equal(result.dashboard.system_intelligence_gain.rules_improved, 2);
  assert.equal(result.dashboard.system_intelligence_gain.validators_added_or_tightened, 3);
  assert.equal(result.dashboard.system_intelligence_gain.deterministic_checks_added, 4);
  assert.equal(result.dashboard.system_intelligence_gain.evidence_fields_added, 8);
  assert.equal(result.dashboard.publication_evidence.publication_status, 'STALE');
  assert.equal(result.dashboard.publication_evidence.success_allowed, false);
  assert.equal(result.dashboard.publication_evidence.stages.mirror_synced.status, 'verified');
  assert.equal(result.dashboard.publication_evidence.stages.mirror_synced.timestamp, timestamp);
  assert.match(result.markdown, /Portfolio Strategic Scoreboard/);
  assert.match(result.markdown, /Alpha/);
  assert.match(result.markdown, new RegExp(timestamp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('same scorecard rerun preserves history, rendering and gain counters', () => {
  const first = applyStrategicGoalScorecard(dashboard(), markdown, scorecard());
  const second = applyStrategicGoalScorecard(first.dashboard, first.markdown, scorecard());
  assert.equal((second.markdown.match(/STRATEGIC_GOAL_SCOREBOARD:1/g) || []).length, 1);
  assert.equal(second.dashboard.daily_intelligence.strategic_history.length, 2);
  assert.equal(second.dashboard.daily_intelligence.strategic_application.accounting, 'already_counted');
  assert.deepEqual(second.dashboard.system_intelligence_gain, first.dashboard.system_intelligence_gain);
});

test('repairs the known duplicate strategic gain signature once', () => {
  const inflated = dashboard({
    last_updated: timestamp,
    main_upgrade: {
      id: 'portfolio_strategic_goal_scoreboard', status: 'APPLIED_UPGRADE', summary: 'old', why: 'old',
    },
    daily_intelligence: {
      indicators: [], history: [], strategic_observed_at: timestamp,
      project_goals: [], system_intelligence_goal: null,
      strategic_history: [{ date: '2026-07-16', projects: { alpha: 60 }, system_intelligence: 60 }],
    },
    system_intelligence_gain: {
      rules_improved: 3,
      validators_added_or_tightened: 4,
      deterministic_checks_added: 7,
      replay_cases_added_or_improved: 1,
      behavior_fixtures_added_or_improved: 1,
      duplicate_instructions_removed: 0,
      evidence_fields_added: 16,
      automation_contracts_improved: 3,
      dashboard_registry_schema_improvements: 3,
      project_records_instrumented: 1,
    },
  });
  const repaired = applyStrategicGoalScorecard(inflated, markdown, scorecard());
  assert.equal(repaired.dashboard.daily_intelligence.strategic_application.accounting, 'legacy_duplicate_repaired');
  assert.equal(repaired.dashboard.system_intelligence_gain.rules_improved, 2);
  assert.equal(repaired.dashboard.system_intelligence_gain.validators_added_or_tightened, 3);
  assert.equal(repaired.dashboard.system_intelligence_gain.deterministic_checks_added, 4);
  assert.equal(repaired.dashboard.system_intelligence_gain.evidence_fields_added, 8);
  assert.equal(repaired.dashboard.system_intelligence_gain.automation_contracts_improved, 2);
  assert.equal(repaired.dashboard.system_intelligence_gain.dashboard_registry_schema_improvements, 2);

  const rerun = applyStrategicGoalScorecard(repaired.dashboard, repaired.markdown, scorecard());
  assert.deepEqual(rerun.dashboard.system_intelligence_gain, repaired.dashboard.system_intelligence_gain);
});

test('rejects an invalid scorecard', () => {
  const invalid = scorecard();
  invalid.schema_version = 2;
  assert.throws(() => applyStrategicGoalScorecard(dashboard(), markdown, invalid), /schema_version/);
});
