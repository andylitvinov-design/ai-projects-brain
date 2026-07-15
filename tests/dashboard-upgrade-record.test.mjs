import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyUpgradeRecord,
  buildPublicationTrace,
  validateUpgradeRecord,
} from '../scripts/apply-dashboard-upgrade-record.mjs';

const timestamp = '2026-07-15T20:00:21+02:00';
const shaA = 'a'.repeat(40);
const shaB = 'b'.repeat(40);

function record() {
  return {
    schema_version: 1,
    run_id: 'evening-test',
    observed_at: timestamp,
    result: 'APPLIED_UPGRADE',
    main_upgrade: {
      id: 'exact_snapshot_publisher_ownership',
      summary: 'Publisher validates an explicit snapshot.',
      why: 'Publication must not regenerate Morning content.',
    },
    portfolio: {
      strongest_positive_change: 'Previous publication recovered.',
      largest_risk_project_id: 'portfolio',
      largest_risk: 'Business KPI sources remain missing.',
    },
    publication: {
      verified_at: '2026-07-15T10:00:31+02:00',
      previous_verified_deploy: {
        deploy_id: 'deploy-ready',
        published_at: '2026-07-15T08:00:21.606Z',
        source_commit_sha: shaA,
        branch: 'main',
      },
      evidence_refs: ['workflow #28', 'deploy-ready'],
    },
    changed_files: ['a', 'b', 'c'],
    metric_impact: [],
    system_intelligence_gain: {
      rules_improved: 1,
      validators_added_or_tightened: 2,
      deterministic_checks_added: 2,
      replay_cases_added_or_improved: 1,
      behavior_fixtures_added_or_improved: 1,
      duplicate_instructions_removed: 1,
      evidence_fields_added: 4,
      automation_contracts_improved: 1,
      dashboard_registry_schema_improvements: 1,
      project_records_instrumented: 2,
    },
    evening_verification_questions: ['Verify publication.'],
    unknown_blocked: ['KPI source unknown.'],
    risky_work_handoffs: [],
    morning_handoff: [{
      rank: 1,
      project_id: 'brain-management',
      goal: 'Business Growth and Professional Value',
      sector: 'Professional delivery and live reliability',
      action: 'Verify the new snapshot.',
      expected_metric_effect: '2/4 -> 4/4',
    }],
  };
}

function dashboard() {
  const metricSchema = [
    'id','name','type','value','numerator','denominator','unit','period','source','confidence',
    'status','previous_value','change','target_or_slo','interpretation','next_action','goal','sector','lifecycle',
  ];
  const row = (values) => metricSchema.map((field) => values[field] ?? null);
  return {
    schema_version: 6,
    metric_model: 'adaptive_portfolio_project_goal_v1',
    last_updated: '2026-07-15T07:51:30+02:00',
    status: 'morning_upgrade_publication_stale',
    live_url: 'https://brain-management.netlify.app/system-health-dashboard/',
    portfolio_health: {
      state: 'NEEDS_ATTENTION', active_projects: 2, observed_projects: 1, blocked_projects: 1,
      strongest_positive_change: { project_id: 'ai-projects-brain', change: 'old' },
      largest_risk: { project_id: 'brain-management', risk: 'old' },
    },
    project_health: [
      { project_id: 'brain-management', status: 'BLOCKED', sectors: { execution: 'WATCH', product_value: 'WATCH', business_growth: 'NOT_APPLICABLE', standards: 'WATCH', reliability: 'BLOCKED', learning: 'PASS' } },
      { project_id: 'ai-projects-brain', status: 'IMPROVING', sectors: { execution: 'PASS', product_value: 'WATCH', business_growth: 'NOT_APPLICABLE', standards: 'PASS', reliability: 'WATCH', learning: 'PASS' } },
    ],
    agent_assessments: [],
    metric_schema: metricSchema,
    metrics: [
      row({ id: 'publication_freshness', name: 'Publication Freshness', type: 'state', value: 'STALE', unit: 'state', period: 'run', source: 'old', confidence: 'high', status: 'CRITICAL_SLO_NOT_MET', previous_value: 'STALE', change: 'same', target_or_slo: '4/4', interpretation: 'old', next_action: 'old', goal: 'business_growth_professional_value', sector: 'professional_delivery_live_reliability', lifecycle: 'active' }),
      row({ id: 'eval_pass_rate', name: 'Eval Pass Rate', type: 'ratio', value: 100, numerator: 22, denominator: 22, unit: '%/count', period: 'run', source: 'old', confidence: 'high', status: 'PASS', previous_value: 100, change: 'same', target_or_slo: 'all pass', interpretation: 'old', next_action: 'old', goal: 'continuous_self_development', sector: 'validation_accumulated_knowledge', lifecycle: 'active' }),
      row({ id: 'business_growth_outcomes', name: 'Business Growth Outcomes', type: 'state', value: 'not_instrumented', unit: 'outcomes', period: '7d', source: 'no KPI source', confidence: 'low', status: 'NOT_INSTRUMENTED', previous_value: 'not_instrumented', change: 'same', target_or_slo: 'one observed KPI', interpretation: 'unknown', next_action: 'register source', goal: 'business_growth_professional_value', sector: 'commercial_outcomes', lifecycle: 'needs_revision' }),
    ],
    project_metrics: [],
    critical_slos: [
      { id: 'dashboard_publication_4_of_4', state: 'STALE', observed: '2/4', target: '4/4 same run', unit: 'stages', period: 'run', source: 'gate' },
      { id: 'scheduler_unique_morning_evening', state: 'PASS', observed: '2/2; duplicates=0', target: 'one each', unit: 'schedules', period: 'run', source: 'registry' },
    ],
    publication_evidence: { publication_status: 'STALE' },
    activity_log: [],
  };
}

function registry() {
  return {
    last_updated: '2026-07-14T20:00:00+02:00',
    projects: [
      { project_id: 'brain-management', status: 'BLOCKED', sectors: { execution: 'WATCH', product_value: 'WATCH', business_growth: 'NOT_APPLICABLE', standards: 'WATCH', reliability: 'BLOCKED', learning: 'PASS' }, blocker: 'old', evidence_refs: [] },
      { project_id: 'ai-projects-brain', status: 'IMPROVING', sectors: { execution: 'PASS', product_value: 'WATCH', business_growth: 'NOT_APPLICABLE', standards: 'PASS', reliability: 'WATCH', learning: 'PASS' }, blocker: null, evidence_refs: [] },
    ],
  };
}

const markdown = `# Dashboard\n\n**Metric model:** \`adaptive_portfolio_project_goal_v1\`  \n**Last updated:** \`2026-07-15T07:51:30+02:00\`  \n**Morning result:** \`APPLIED_UPGRADE\`  \n**Public publication state:** \`STALE\`\n\n## Status\n\n**APPLIED_UPGRADE**\n\n## Main upgrade applied this morning\n\nOld.\n\n## Portfolio Health change\n\nState **NEEDS_ATTENTION**; active 2; observed 1; blocked 1.\nStrongest change: old\nLargest risk: old\n\n## Project Health matrix change\n\n| Project | Execution | Product Value | Business Growth | Standards | Reliability | Learning | State |\n|---|---|---|---|---|---|---|---|\n| Brain Management | WATCH | WATCH | NOT_APPLICABLE | WATCH | BLOCKED | PASS | BLOCKED |\n\n- **Brain Management:** BLOCKED; reliability BLOCKED; learning PASS.\n`;

test('validates a complete deterministic upgrade record', () => {
  assert.deepEqual(validateUpgradeRecord(record()), []);
});

test('rejects a publication record without a source commit', () => {
  const input = record();
  input.publication.previous_verified_deploy.source_commit_sha = 'not-a-sha';
  assert.match(validateUpgradeRecord(input).join('\n'), /40-character SHA/);
});

test('applies the evening record while preserving unrelated unknown states', () => {
  const result = applyUpgradeRecord(dashboard(), registry(), markdown, record());
  assert.equal(result.dashboard.last_updated, timestamp);
  assert.equal(result.dashboard.main_upgrade.id, 'exact_snapshot_publisher_ownership');
  assert.equal(result.dashboard.publication_evidence.publication_status, 'STALE');
  assert.equal(result.dashboard.publication_evidence.stages.deploy_identified.deploy_id, 'deploy-ready');
  assert.equal(result.dashboard.project_health[0].sectors.reliability, 'PASS');
  assert.equal(result.registry.projects[0].blocker, null);
  const metricIndex = Object.fromEntries(result.dashboard.metric_schema.map((field, index) => [field, index]));
  const growth = result.dashboard.metrics.find((row) => row[metricIndex.id] === 'business_growth_outcomes');
  assert.equal(growth[metricIndex.value], 'not_instrumented');
  assert.match(result.markdown, /\*\*Evening result:\*\* `APPLIED_UPGRADE`/);
  assert.match(result.markdown, /EVENING_UPGRADE:evening-test/);
});

test('builds a trace from the explicit snapshot without hard-coded deploy replacement', () => {
  const result = applyUpgradeRecord(dashboard(), registry(), markdown, record());
  const trace = buildPublicationTrace(result.dashboard, {
    canonicalCommitSha: shaA,
    canonicalBlobSha: shaB,
    mirrorCommitSha: shaA,
    mirrorBlobSha: shaB,
  });
  assert.equal(trace.stages.deploy_identified.deploy_id, 'deploy-ready');
  assert.equal(trace.stages.canonical_updated.commit_sha, shaA);
  assert.equal(trace.stages.mirror_synced.blob_sha, shaB);
  assert.equal(trace.publication_status, 'STALE');
});
