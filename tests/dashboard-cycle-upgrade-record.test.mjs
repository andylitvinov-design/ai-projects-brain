import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  applyCycleUpgradeRecord,
  validateCycleUpgradeRecord,
} from '../scripts/apply-cycle-dashboard-upgrade-record.mjs';

const timestamp = '2026-07-17T07:31:21+02:00';
const sha = 'a'.repeat(40);

function record() {
  return {
    schema_version: 1,
    cycle: 'Morning System Upgrade',
    run_id: 'morning-cycle-aware-test',
    observed_at: timestamp,
    result: 'APPLIED_UPGRADE',
    main_upgrade: {
      id: 'cycle_aware_dashboard_upgrade_records',
      summary: 'Controlled upgrade records preserve Morning and Evening cycle identity.',
      why: 'Morning evidence must not be written into the Evening history lane.',
    },
    portfolio: {
      strongest_positive_change: 'Current publication is verified and cycle identity is deterministic.',
      largest_risk_project_id: 'portfolio',
      largest_risk: 'Observed KPI and provider evidence remain incomplete.',
    },
    publication: {
      verified_at: '2026-07-17T05:22:38Z',
      previous_verified_deploy: {
        deploy_id: 'deploy-ready',
        published_at: '2026-07-17T05:22:33.420Z',
        source_commit_sha: sha,
        branch: 'main',
      },
      evidence_refs: ['workflow', 'deploy-ready'],
    },
    changed_files: ['wrapper', 'test', 'workflow', 'record'],
    metric_impact: [],
    system_intelligence_gain: {
      rules_improved: 1,
      validators_added_or_tightened: 1,
      deterministic_checks_added: 1,
      replay_cases_added_or_improved: 1,
      behavior_fixtures_added_or_improved: 1,
      duplicate_instructions_removed: 0,
      evidence_fields_added: 2,
      automation_contracts_improved: 1,
      dashboard_registry_schema_improvements: 0,
      project_records_instrumented: 1,
    },
    evening_verification_questions: ['Verify the exact new snapshot publication.'],
    unknown_blocked: ['Business KPI source remains unknown.'],
    risky_work_handoffs: [],
    morning_handoff: [{
      rank: 1,
      project_id: 'brain-management',
      goal: 'Business Growth and Professional Value',
      sector: 'Professional delivery and live reliability',
      action: 'Verify the new snapshot.',
      expected_metric_effect: '2/4 -> 4/4',
    }],
    agent_assessment: {
      project_id: 'ai-projects-brain',
      agent: '/upgrade-cycle-record',
      sector: 'learning',
      observed_at: timestamp,
      status: 'PASS',
      applicable_checks: 1,
      passed_checks: 1,
      finding_count: 1,
      critical_finding_count: 0,
      evidence_refs: ['wrapper', 'test'],
      summary: 'Cycle identity is preserved.',
      recommended_action: 'Keep the regression active.',
      confidence: 'high',
    },
    project_metric: {
      project_id: 'ai-projects-brain',
      sector: 'learning',
      id: 'cycle_aware_upgrade_record_contract',
      name: 'Cycle-aware Upgrade Record Contract',
      purpose: 'Preserve truthful Morning and Evening history.',
      type: 'ratio',
      value: 100,
      numerator: 1,
      denominator: 1,
      unit: '%/run',
      period: timestamp,
      source: 'cycle-aware wrapper regression',
      owner: 'Morning System Upgrade',
      confidence: 'high',
      status: 'PASS',
      previous_value: 'evening_only',
      change: 'cycle_aware',
      target_or_slo: '1/1',
      interpretation: 'Controlled records preserve cycle identity.',
      next_action: 'Keep in CI.',
      lifecycle: 'active',
    },
  };
}

const dashboard = JSON.parse(fs.readFileSync('projects/codex-automation/system-health-dashboard.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('projects/portfolio-registry.json', 'utf8'));
const markdown = fs.readFileSync('projects/codex-automation/system-health-dashboard.md', 'utf8');

test('requires an explicit supported cycle', () => {
  const input = record();
  delete input.cycle;
  assert.match(validateCycleUpgradeRecord(input).join('\n'), /record\.cycle/);
});

test('applies a Morning record without corrupting Evening history', () => {
  const previousExactMetric = dashboard.project_metrics.find((entry) => entry.id === 'exact_snapshot_publisher_contract');
  const result = applyCycleUpgradeRecord(dashboard, registry, markdown, record());

  assert.equal(result.dashboard.status, 'morning_upgrade_publication_stale');
  assert.equal(result.dashboard.validation.executed_checks, 25);
  assert.ok(result.dashboard.activity_log.some((entry) => entry.date === '2026-07-17' && entry.cycle === 'Morning System Upgrade'));
  assert.ok(!result.dashboard.activity_log.some((entry) => entry.date === '2026-07-17' && entry.cycle === 'Evening Architecture Upgrade'));
  assert.ok(result.dashboard.agent_assessments.some((entry) => entry.agent === '/upgrade-cycle-record'));
  assert.ok(result.dashboard.project_metrics.some((entry) => entry.id === 'cycle_aware_upgrade_record_contract'));
  assert.equal(
    result.dashboard.project_metrics.find((entry) => entry.id === 'exact_snapshot_publisher_contract')?.period,
    previousExactMetric?.period,
  );
  assert.match(result.markdown, /\*\*Morning result:\*\* `APPLIED_UPGRADE`/);
  assert.match(result.markdown, /MORNING_UPGRADE:morning-cycle-aware-test/);
  assert.match(result.markdown, /### Evening verification questions/);
  assert.doesNotMatch(result.markdown, /Evening Architecture Upgrade — 2026-07-17/);
});
