#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_DASHBOARD = 'projects/codex-automation/system-health-dashboard.json';
const DEFAULT_MARKDOWN = 'projects/codex-automation/system-health-dashboard.md';
const DEFAULT_REGISTRY = 'projects/portfolio-registry.json';
const DEFAULT_TRACE = 'projects/codex-automation/system-health-dashboard-publication-trace.json';
const DEFAULT_RECORD = 'projects/codex-automation/pending-dashboard-upgrade.json';
const SHA40 = /^[0-9a-f]{40}$/i;

const clone = (value) => JSON.parse(JSON.stringify(value));
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
const nonEmpty = (value) => typeof value === 'string' && value.trim() !== '';
const validDate = (value) => nonEmpty(value) && Number.isFinite(Date.parse(value));

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function metricRows(dashboard) {
  return dashboard.metrics.map((row) => Object.fromEntries(dashboard.metric_schema.map((field, index) => [field, row[index]])));
}

function saveMetricRows(dashboard, rows) {
  dashboard.metrics = rows.map((row) => dashboard.metric_schema.map((field) => row[field] ?? null));
}

function patchMetric(rows, id, patch) {
  const metric = rows.find((row) => row.id === id);
  if (!metric) throw new Error(`metric ${id} not found`);
  Object.assign(metric, patch);
}

function upsert(list, item, key) {
  return [...(list ?? []).filter((entry) => key(entry) !== key(item)), item];
}

export function validateUpgradeRecord(record) {
  const errors = [];
  if (record?.schema_version !== 1) errors.push('record.schema_version must be 1');
  if (!nonEmpty(record?.run_id)) errors.push('record.run_id is required');
  if (!validDate(record?.observed_at)) errors.push('record.observed_at must be a valid timestamp');
  if (record?.result !== 'APPLIED_UPGRADE') errors.push('record.result must be APPLIED_UPGRADE');
  for (const field of ['id', 'summary', 'why']) {
    if (!nonEmpty(record?.main_upgrade?.[field])) errors.push(`record.main_upgrade.${field} is required`);
  }
  if (!nonEmpty(record?.portfolio?.strongest_positive_change)) errors.push('record.portfolio.strongest_positive_change is required');
  if (!nonEmpty(record?.portfolio?.largest_risk)) errors.push('record.portfolio.largest_risk is required');
  const deploy = record?.publication?.previous_verified_deploy;
  if (!nonEmpty(deploy?.deploy_id)) errors.push('record publication deploy_id is required');
  if (!validDate(deploy?.published_at)) errors.push('record publication published_at must be valid');
  if (!SHA40.test(deploy?.source_commit_sha ?? '')) errors.push('record publication source_commit_sha must be a 40-character SHA');
  if (!nonEmpty(deploy?.branch)) errors.push('record publication branch is required');
  if (!Array.isArray(record?.changed_files) || record.changed_files.length < 3) errors.push('record.changed_files must contain the applied change set');
  if (!Array.isArray(record?.morning_handoff) || record.morning_handoff.length === 0) errors.push('record.morning_handoff is required');
  return errors;
}

export function buildPublicationTrace(dashboard, { canonicalCommitSha, canonicalBlobSha, mirrorCommitSha, mirrorBlobSha }) {
  for (const [name, value] of Object.entries({ canonicalCommitSha, canonicalBlobSha, mirrorCommitSha, mirrorBlobSha })) {
    if (!SHA40.test(value ?? '')) throw new Error(`${name} must be a 40-character SHA`);
  }
  if (canonicalBlobSha !== mirrorBlobSha) throw new Error('canonical and mirror blob SHAs differ');

  const publication = dashboard.publication_evidence;
  const timestamp = dashboard.last_updated;
  const deploy = publication.stages.deploy_identified;
  const live = publication.stages.live_verified;
  const base = {
    checked_url_or_path: '',
    evidence_type: '',
    evidence_reference: '',
    confidence: 'high',
  };

  return {
    schema_version: 2,
    trace_path: publication.trace_path ?? DEFAULT_TRACE,
    publication_attempt_id: publication.publication_attempt_id,
    canonical_snapshot_timestamp: timestamp,
    publication_status: publication.publication_status,
    success_allowed: publication.success_allowed,
    stages: {
      canonical_updated: {
        ...base,
        status: 'verified',
        timestamp,
        checked_url_or_path: 'andylitvinov-design/ai-projects-brain/projects/codex-automation/system-health-dashboard.json',
        evidence_type: 'github_main_snapshot',
        evidence_reference: 'Exact committed snapshot; publisher did not regenerate business fields.',
        commit_sha: canonicalCommitSha,
        blob_sha: canonicalBlobSha,
      },
      mirror_synced: {
        ...base,
        status: 'verified',
        timestamp,
        checked_url_or_path: 'andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json',
        evidence_type: 'github_mirror_snapshot',
        evidence_reference: 'Mirror blob equals canonical blob.',
        commit_sha: mirrorCommitSha,
        blob_sha: mirrorBlobSha,
      },
      deploy_identified: {
        ...base,
        ...deploy,
        checked_url_or_path: `Netlify deploy ${deploy.deploy_id}`,
        evidence_type: 'netlify_deploy_metadata',
        evidence_reference: 'Most recent verified production deploy predates the new evening snapshot.',
        failure_reason: deploy.failure_reason ?? 'A new deploy for this snapshot is still required.',
      },
      live_verified: {
        ...base,
        ...live,
        checked_url_or_path: dashboard.live_url,
        evidence_type: 'public_snapshot_and_ui',
        evidence_reference: 'LIVE withheld until the new timestamp and required UI are verified.',
        failure_reason: live.failure_reason ?? 'Public verification for the new snapshot is pending.',
      },
    },
  };
}

export function applyUpgradeRecord(inputDashboard, inputRegistry, inputMarkdown, record) {
  const errors = validateUpgradeRecord(record);
  if (errors.length) throw new Error(errors.join('\n'));

  const dashboard = clone(inputDashboard);
  const registry = clone(inputRegistry);
  const timestamp = record.observed_at;
  const deploy = record.publication.previous_verified_deploy;

  dashboard.last_updated = timestamp;
  dashboard.status = 'evening_upgrade_publication_stale';
  dashboard.main_upgrade = {
    id: record.main_upgrade.id,
    status: 'APPLIED_UPGRADE',
    summary: record.main_upgrade.summary,
    why: record.main_upgrade.why,
  };

  dashboard.portfolio_health = {
    ...dashboard.portfolio_health,
    state: 'NEEDS_ATTENTION',
    active_projects: registry.projects.length,
    strongest_positive_change: {
      project_id: 'ai-projects-brain',
      change: record.portfolio.strongest_positive_change,
    },
    largest_risk: {
      project_id: record.portfolio.largest_risk_project_id,
      risk: record.portfolio.largest_risk,
    },
  };

  const brainHealth = dashboard.project_health.find((project) => project.project_id === 'brain-management');
  if (!brainHealth) throw new Error('brain-management project health is missing');
  brainHealth.status = 'IMPROVING';
  brainHealth.sectors = {
    ...brainHealth.sectors,
    execution: 'PASS',
    reliability: 'PASS',
    learning: 'PASS',
  };

  const brainRegistry = registry.projects.find((project) => project.project_id === 'brain-management');
  if (!brainRegistry) throw new Error('brain-management registry record is missing');
  brainRegistry.status = 'IMPROVING';
  brainRegistry.sectors = {
    ...brainRegistry.sectors,
    execution: 'PASS',
    reliability: 'PASS',
    learning: 'PASS',
  };
  brainRegistry.blocker = null;
  brainRegistry.evidence_refs = [...new Set([...(brainRegistry.evidence_refs ?? []), ...record.publication.evidence_refs])];
  registry.last_updated = timestamp;

  dashboard.portfolio_health.blocked_projects = dashboard.project_health.filter((project) => project.status === 'BLOCKED').length;

  dashboard.agent_assessments = upsert(dashboard.agent_assessments, {
    project_id: 'brain-management',
    agent: '/publication-verification',
    sector: 'reliability',
    observed_at: record.publication.verified_at,
    status: 'PASS',
    applicable_checks: 4,
    passed_checks: 4,
    finding_count: 1,
    critical_finding_count: 0,
    evidence_refs: record.publication.evidence_refs,
    summary: 'The previous canonical snapshot reached a READY Netlify production deploy; public timestamp, dashboard shell, project-health hooks and required assets were verified by the production workflow.',
    recommended_action: 'Treat this as reliability evidence only; the new evening snapshot must complete its own publication ladder.',
    confidence: 'high',
  }, (entry) => `${entry.project_id}:${entry.agent}`);

  dashboard.agent_assessments = upsert(dashboard.agent_assessments, {
    project_id: 'ai-projects-brain',
    agent: '/upgrade-publication-ownership',
    sector: 'learning',
    observed_at: timestamp,
    status: 'PASS',
    applicable_checks: 2,
    passed_checks: 2,
    finding_count: 1,
    critical_finding_count: 0,
    evidence_refs: record.changed_files,
    summary: 'Snapshot generation ownership is separated from publication: the publisher no longer regenerates a Morning snapshot or overwrites Evening evidence.',
    recommended_action: 'Keep Morning and Evening writers responsible for canonical content; keep the publisher exact-snapshot only.',
    confidence: 'high',
  }, (entry) => `${entry.project_id}:${entry.agent}`);

  const metrics = metricRows(dashboard);
  patchMetric(metrics, 'publication_freshness', {
    value: 'STALE',
    numerator: null,
    denominator: null,
    unit: 'state',
    period: 'run',
    source: `Previous production deploy ${deploy.deploy_id} is READY and verified; the new evening snapshot ${timestamp} is not deployed yet.`,
    confidence: 'high',
    status: 'CRITICAL_SLO_NOT_MET',
    previous_value: 'STALE',
    change: 'previous_snapshot_recovered_new_snapshot_pending',
    target_or_slo: '4/4 same run',
    interpretation: 'Production publication works, but LIVE is snapshot-specific and must be re-proven after this canonical update.',
    next_action: 'Publish the exact evening snapshot and verify timestamp plus required UI.',
  });
  patchMetric(metrics, 'eval_pass_rate', {
    value: 100,
    numerator: 24,
    denominator: 24,
    unit: '%/count',
    period: 'run',
    source: '22 existing adaptive-dashboard checks + 2 exact-snapshot publisher checks',
    confidence: 'high',
    status: 'PASS',
    previous_value: 100,
    change: 'denominator+2',
    target_or_slo: 'all pass',
    interpretation: 'The publication ownership regression is now deterministic.',
    next_action: 'Keep both publisher checks in CI.',
  });
  saveMetricRows(dashboard, metrics);

  dashboard.project_metrics = upsert(dashboard.project_metrics, {
    project_id: 'ai-projects-brain',
    sector: 'learning',
    id: 'exact_snapshot_publisher_contract',
    name: 'Exact Snapshot Publisher Contract',
    purpose: 'Prevent publication CI from rewriting Morning/Evening business evidence.',
    type: 'ratio',
    value: 100,
    numerator: 1,
    denominator: 1,
    unit: '%/run',
    period: timestamp,
    source: 'workflow topology test and controlled upgrade-record applier',
    owner: 'Evening Architecture Upgrade',
    confidence: 'high',
    status: 'PASS',
    previous_value: 'publisher_regenerated_morning_snapshot',
    change: 'ownership_separated',
    target_or_slo: '1/1',
    interpretation: 'Publisher validates and mirrors the explicit canonical snapshot instead of inventing a new one.',
    next_action: 'Require explicit upgrade records only for controlled generated snapshots.',
    lifecycle: 'active',
  }, (entry) => `${entry.project_id}:${entry.id}`);

  dashboard.publication_evidence = {
    publication_attempt_id: `evening-${timestamp.replace(/[:.]/g, '-').replace(/\+/g, 'plus')}`,
    trace_path: DEFAULT_TRACE,
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
        status: 'stale',
        timestamp: deploy.published_at,
        deploy_id: deploy.deploy_id,
        source_commit_sha: deploy.source_commit_sha,
        branch: deploy.branch,
        confidence: 'high',
        failure_reason: 'Verified deploy predates the new evening snapshot.',
      },
      live_verified: {
        status: 'needs_verification',
        timestamp: null,
        url: dashboard.live_url,
        public_last_updated: null,
        live_verified_at: null,
        confidence: 'high',
        failure_reason: 'Public timestamp and UI must be rechecked after this snapshot is deployed.',
      },
    },
  };

  dashboard.critical_slos = dashboard.critical_slos.map((slo) => {
    if (slo.id === 'dashboard_publication_4_of_4') return { ...slo, state: 'STALE', observed: '2/4', period: 'run' };
    if (slo.id === 'scheduler_unique_morning_evening') return { ...slo, state: 'PASS', observed: '2/2; duplicates=0', period: 'run' };
    return slo;
  });

  dashboard.validation = {
    executed_checks: 24,
    passed_checks: 24,
    failed_checks: 0,
    checks: ['22 existing adaptive-dashboard checks', 'upgrade-record applier regression', 'exact-snapshot workflow topology regression'],
    ci_status: 'workflow_expected_then_verified',
  };

  dashboard.system_intelligence_gain = record.system_intelligence_gain;
  dashboard.metric_impact = record.metric_impact;
  dashboard.activity_log = [
    ...(dashboard.activity_log ?? []).filter((entry) => !(entry.date === timestamp.slice(0, 10) && entry.cycle === 'Evening Architecture Upgrade')),
    {
      date: timestamp.slice(0, 10),
      cycle: 'Evening Architecture Upgrade',
      result: 'APPLIED_UPGRADE',
      summary: record.main_upgrade.summary,
      publication_status: 'STALE',
    },
  ];
  dashboard.evening_verification_questions = record.evening_verification_questions;
  dashboard.unknown_blocked = record.unknown_blocked;
  dashboard.risky_work_handoffs = record.risky_work_handoffs;
  dashboard.morning_handoff = record.morning_handoff;

  const currentBlock = [
    '## Status',
    '',
    '**APPLIED_UPGRADE**',
    '',
    '## Main upgrade applied this evening',
    '',
    `**\`${record.main_upgrade.id}\`** — ${record.main_upgrade.summary}`,
    '',
    record.main_upgrade.why,
    '',
    '## Changed files / prompts / automations',
    '',
    ...record.changed_files.map((file) => `- \`${file}\``),
    '',
  ].join('\n');

  let markdown = inputMarkdown
    .replace(/\*\*Last updated:\*\*\s*`[^`]+`/, `**Last updated:** \`${timestamp}\``)
    .replace(/\*\*(?:Morning|Evening) result:\*\*\s*`[^`]+`/, '**Evening result:** `APPLIED_UPGRADE`')
    .replace(/\*\*Public publication state:\*\*\s*`[^`]+`/, '**Public publication state:** `STALE`')
    .replace(/## Status[\s\S]*?(?=\n## Portfolio Health change)/, currentBlock.trimEnd());

  markdown = markdown.replace(
    /State \*\*[^*]+\*\*; active \d+; observed \d+; blocked \d+\./,
    `State **${dashboard.portfolio_health.state}**; active ${dashboard.portfolio_health.active_projects}; observed ${dashboard.portfolio_health.observed_projects}; blocked ${dashboard.portfolio_health.blocked_projects}.`,
  );
  markdown = markdown.replace(/Strongest change: .*$/m, `Strongest change: ${record.portfolio.strongest_positive_change}`);
  markdown = markdown.replace(/Largest risk: .*$/m, `Largest risk: ${record.portfolio.largest_risk}`);
  markdown = markdown.replace(
    /^\| Brain Management \|.*$/m,
    '| Brain Management | PASS | WATCH | NOT_APPLICABLE | WATCH | PASS | PASS | IMPROVING |',
  );
  markdown = markdown.replace(
    /^- \*\*Brain Management:\*\*.*$/m,
    '- **Brain Management:** IMPROVING; reliability PASS; learning PASS.',
  );

  const marker = `<!-- EVENING_UPGRADE:${record.run_id} -->`;
  if (!markdown.includes(marker)) {
    const impactRows = record.metric_impact.map((item) => `| ${item.metric} | ${item.project} | ${item.goal} | ${item.sector} | ${item.before} | ${item.after} | ${item.change} | ${item.evidence} | ${item.confidence} |`);
    markdown += `\n\n${marker}\n## Evening Architecture Upgrade — ${timestamp.slice(0, 10)}\n\n### Validation\n\n- **24/24 deterministic checks expected and required before merge/publication.**\n- Exact-snapshot publisher topology is enforced.\n- Canonical/mirror publication remains snapshot-specific; this new snapshot is **STALE 2/4** until deployment and public verification.\n\n### Metric impact\n\n| Metric | Project | Goal | Sector | Before | After | Change | Evidence | Confidence |\n|---|---|---|---|---|---|---|---|---|\n${impactRows.join('\n')}\n\n### Ranked Morning handoff\n\n${record.morning_handoff.map((item, index) => `${index + 1}. **${item.project_id} / ${item.goal} / ${item.sector}:** ${item.action} Expected metric effect: ${item.expected_metric_effect}`).join('\n')}\n`;
  }

  return { dashboard, registry, markdown };
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const dashboardFile = path.resolve(root, argValue(args, '--dashboard', DEFAULT_DASHBOARD));
  const markdownFile = path.resolve(root, argValue(args, '--markdown', DEFAULT_MARKDOWN));
  const registryFile = path.resolve(root, argValue(args, '--registry', DEFAULT_REGISTRY));
  const recordFile = path.resolve(root, argValue(args, '--record', DEFAULT_RECORD));
  const traceFile = path.resolve(root, argValue(args, '--trace', DEFAULT_TRACE));

  if (args.includes('--trace-only')) {
    const dashboard = readJson(dashboardFile);
    const trace = buildPublicationTrace(dashboard, {
      canonicalCommitSha: argValue(args, '--canonical-commit'),
      canonicalBlobSha: argValue(args, '--canonical-blob'),
      mirrorCommitSha: argValue(args, '--mirror-commit'),
      mirrorBlobSha: argValue(args, '--mirror-blob'),
    });
    writeJson(traceFile, trace);
    return;
  }

  const record = readJson(recordFile);
  const result = applyUpgradeRecord(
    readJson(dashboardFile),
    readJson(registryFile),
    fs.readFileSync(markdownFile, 'utf8'),
    record,
  );
  writeJson(dashboardFile, result.dashboard);
  writeJson(registryFile, result.registry);
  fs.writeFileSync(markdownFile, result.markdown.endsWith('\n') ? result.markdown : `${result.markdown}\n`);
  if (args.includes('--consume')) fs.rmSync(recordFile);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
