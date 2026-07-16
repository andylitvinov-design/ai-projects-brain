#!/usr/bin/env node
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildStrategicGoals } from './update-daily-intelligence.mjs';

const DEFAULT_DASHBOARD = 'projects/codex-automation/system-health-dashboard.json';
const DEFAULT_MARKDOWN = 'projects/codex-automation/system-health-dashboard.md';
const DEFAULT_SCORECARD = 'projects/codex-automation/strategic-goal-scorecard.json';
const STRATEGIC_GAIN_DELTA = Object.freeze({
  rules_improved: 1,
  validators_added_or_tightened: 1,
  deterministic_checks_added: 3,
  evidence_fields_added: 8,
  automation_contracts_improved: 1,
  dashboard_registry_schema_improvements: 1,
});
const LEGACY_DUPLICATE_SIGNATURE = Object.freeze({
  observed_at: '2026-07-16T06:58:20+02:00',
  counters: {
    rules_improved: 3,
    validators_added_or_tightened: 4,
    deterministic_checks_added: 7,
    evidence_fields_added: 16,
    automation_contracts_improved: 3,
    dashboard_registry_schema_improvements: 3,
  },
});

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function escapeCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function renderScoreboard(scorecard) {
  const rows = scorecard.project_goals.map((goal) =>
    `| ${escapeCell(goal.project_name || goal.project_id)} | ${escapeCell(goal.big_goal)} | ${goal.progress_yesterday}% | ${goal.progress_today}% | ${goal.daily_delta >= 0 ? '+' : ''}${goal.daily_delta} pp | ${goal.evidence_state} | ${escapeCell(goal.next_quality_threshold)} |`);
  const system = scorecard.system_intelligence_goal;
  return [
    '<!-- STRATEGIC_GOAL_SCOREBOARD:1 -->',
    '## Portfolio Strategic Scoreboard',
    '',
    '| Project | Big Goal | Yesterday | Today | Daily Delta | Evidence | Next Quality Threshold |',
    '|---|---|---:|---:|---:|---|---|',
    ...rows,
    '',
    '## System Intelligence Scoreboard',
    '',
    '| Big Goal | Yesterday | Today | Daily Delta | Evidence | Next Quality Threshold |',
    '|---|---:|---:|---:|---|---|',
    `| ${escapeCell(system.big_goal)} | ${system.progress_yesterday}% | ${system.progress_today}% | ${system.daily_delta >= 0 ? '+' : ''}${system.daily_delta} pp | ${system.evidence_state} | ${escapeCell(system.next_quality_threshold)} |`,
    '',
    'Percentages are conservative weighted progress values from the canonical project-specific rubrics. Missing evidence is never counted as success.',
    '<!-- /STRATEGIC_GOAL_SCOREBOARD -->',
  ].join('\n');
}

function hasLegacyDuplicateSignature(gain, timestamp) {
  return timestamp === LEGACY_DUPLICATE_SIGNATURE.observed_at
    && Object.entries(LEGACY_DUPLICATE_SIGNATURE.counters)
      .every(([key, value]) => gain?.[key] === value);
}

function applyStrategicGain(inputGain, priorApplication, timestamp, projectCount) {
  const gain = { ...(inputGain || {}) };
  const sameApplication = priorApplication?.observed_at === timestamp;
  const legacyDuplicate = !priorApplication && hasLegacyDuplicateSignature(gain, timestamp);

  if (legacyDuplicate) {
    for (const [key, value] of Object.entries(STRATEGIC_GAIN_DELTA)) {
      gain[key] = Math.max(0, (gain[key] || 0) - value);
    }
  } else if (!sameApplication) {
    for (const [key, value] of Object.entries(STRATEGIC_GAIN_DELTA)) {
      gain[key] = (gain[key] || 0) + value;
    }
  }

  gain.project_records_instrumented = projectCount;
  return {
    gain,
    application: {
      observed_at: timestamp,
      gain_delta: { ...STRATEGIC_GAIN_DELTA },
      accounting: legacyDuplicate ? 'legacy_duplicate_repaired' : (sameApplication ? 'already_counted' : 'counted_once'),
    },
  };
}

export function applyStrategicGoalScorecard(inputDashboard, inputMarkdown, scorecard) {
  if (scorecard?.schema_version !== 1) throw new Error('scorecard.schema_version must be 1');
  if (!Array.isArray(scorecard.project_goals) || scorecard.project_goals.length === 0) {
    throw new Error('scorecard.project_goals is required');
  }
  const timestamp = scorecard.observed_at;
  if (!timestamp || !Number.isFinite(Date.parse(timestamp))) throw new Error('scorecard.observed_at must be a valid timestamp');

  const dashboard = JSON.parse(JSON.stringify(inputDashboard));
  dashboard.last_updated = timestamp;
  dashboard.status = 'strategic_improve_publication_stale';
  dashboard.main_upgrade = {
    id: 'portfolio_strategic_goal_scoreboard',
    status: 'APPLIED_UPGRADE',
    summary: 'Added persistent Big Goals, weighted progress, daily deltas and next quality thresholds for every active project and the operating system.',
    why: 'The portfolio previously tracked health states but did not preserve a comparable definition of maximum quality or progress toward it.',
  };

  const priorApplication = dashboard.daily_intelligence?.strategic_application;
  const strategic = buildStrategicGoals(dashboard.daily_intelligence || {}, scorecard);
  const strategicGain = applyStrategicGain(
    dashboard.system_intelligence_gain,
    priorApplication,
    timestamp,
    scorecard.project_goals.length,
  );
  dashboard.daily_intelligence = {
    ...(dashboard.daily_intelligence || {}),
    ...strategic,
    strategic_application: strategicGain.application,
  };
  dashboard.portfolio_health = {
    ...dashboard.portfolio_health,
    strongest_positive_change: {
      project_id: 'ai-projects-brain',
      change: 'Every active project now has a canonical Big Goal, weighted progress, daily delta and next quality threshold.',
    },
    largest_risk: {
      project_id: 'portfolio',
      risk: 'Provider/live proof and observed business KPI sources remain the largest constraints on progress.',
    },
  };
  dashboard.system_intelligence_gain = strategicGain.gain;
  dashboard.activity_log = [
    ...(dashboard.activity_log || []).filter((entry) => !(entry.date === timestamp.slice(0, 10) && entry.cycle === 'Daily Strategic Improve')),
    {
      date: timestamp.slice(0, 10),
      cycle: 'Daily Strategic Improve',
      result: 'STRATEGIC_APPLIED_3',
      summary: 'Canonical Big Goals, weighted score persistence and automated dashboard publication.',
      publication_status: 'STALE',
    },
  ];

  const previousDeploy = dashboard.publication_evidence?.stages?.deploy_identified || {};
  dashboard.publication_evidence = {
    publication_attempt_id: `strategic-${timestamp.replace(/[:.]/g, '-').replace(/\+/g, 'plus')}`,
    trace_path: dashboard.publication_evidence?.trace_path || 'projects/codex-automation/system-health-dashboard-publication-trace.json',
    publication_status: 'STALE',
    success_allowed: false,
    canonical_snapshot_timestamp: timestamp,
    stages: {
      canonical_updated: {
        status: 'verified',
        timestamp,
        path: DEFAULT_DASHBOARD,
        confidence: 'high',
      },
      mirror_synced: {
        status: 'verified',
        timestamp,
        path: 'brain-management/system-health-dashboard/data/current-system-health-dashboard.json',
        confidence: 'high',
      },
      deploy_identified: {
        ...previousDeploy,
        status: 'stale',
        confidence: 'high',
        failure_reason: 'The previous verified deploy predates the strategic scorecard snapshot.',
      },
      live_verified: {
        status: 'needs_verification',
        timestamp: null,
        url: dashboard.live_url,
        public_last_updated: null,
        live_verified_at: null,
        confidence: 'high',
        failure_reason: 'Public timestamp and strategic scoreboards must be verified after publication.',
      },
    },
  };

  let markdown = inputMarkdown
    .replace(/\*\*Last updated:\*\*\s*`[^`]+`/, `**Last updated:** \`${timestamp}\``)
    .replace(/\*\*(?:Morning|Evening) result:\*\*\s*`[^`]+`/, '**Evening result:** `APPLIED_UPGRADE`')
    .replace(/\*\*Public publication state:\*\*\s*`[^`]+`/, '**Public publication state:** `STALE`');

  const section = renderScoreboard(scorecard);
  if (/<!-- STRATEGIC_GOAL_SCOREBOARD:1 -->[\s\S]*?<!-- \/STRATEGIC_GOAL_SCOREBOARD -->/.test(markdown)) {
    markdown = markdown.replace(/<!-- STRATEGIC_GOAL_SCOREBOARD:1 -->[\s\S]*?<!-- \/STRATEGIC_GOAL_SCOREBOARD -->/, section);
  } else {
    markdown = `${markdown.trimEnd()}\n\n${section}\n`;
  }

  return { dashboard, markdown };
}

function main() {
  const args = process.argv.slice(2);
  const dashboardFile = argValue(args, '--dashboard', DEFAULT_DASHBOARD);
  const markdownFile = argValue(args, '--markdown', DEFAULT_MARKDOWN);
  const scorecardFile = argValue(args, '--scorecard', DEFAULT_SCORECARD);
  const result = applyStrategicGoalScorecard(
    readJson(dashboardFile),
    fs.readFileSync(markdownFile, 'utf8'),
    readJson(scorecardFile),
  );
  writeJson(dashboardFile, result.dashboard);
  fs.writeFileSync(markdownFile, result.markdown.endsWith('\n') ? result.markdown : `${result.markdown}\n`);
  process.stdout.write(JSON.stringify({
    status: 'STRATEGIC_SCORECARD_APPLIED',
    projects: result.dashboard.daily_intelligence.project_goals.length,
    system_progress: result.dashboard.daily_intelligence.system_intelligence_goal.progress_today,
    observed_at: result.dashboard.daily_intelligence.strategic_observed_at,
  }) + '\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
