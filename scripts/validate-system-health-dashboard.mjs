#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const METRIC_MODEL = 'observable_outcomes_v2';
const SCHEMA_VERSION = 5;
const MOMENTUM_STATUSES = new Set([
  'BALANCED',
  'SYSTEM_HEAVY',
  'DELIVERY_HEAVY',
  'GROWTH_HEAVY',
  'STALLED',
  'INSUFFICIENT_DATA',
]);
const MOMENTUM_LANES = ['product_delivery', 'system_improvement', 'business_growth'];
const DOMAINS = new Set([
  'product_business_outcomes',
  'software_delivery_flow',
  'live_reliability',
  'agent_quality',
  'efficiency_flow',
  'governance_learning',
]);
const METRIC_IDS = [
  'product_delivery_rate',
  'business_growth_outcomes',
  'user_pain_recurrence_rate',
  'lead_time_to_live',
  'deployment_frequency',
  'change_fail_rate',
  'failed_deployment_recovery_time',
  'rework_rate',
  'provider_live_readiness_ratio',
  'publication_freshness',
  'rollback_readiness_ratio',
  'task_success_rate',
  'live_completion_rate',
  'false_success_rate',
  'eval_pass_rate',
  'correct_abstention_rate',
  'verification_retry_rate',
  'duplicate_scan_rate',
  'avoidable_handoff_rate',
  'context_retry_cost',
  'evidence_completeness',
  'failure_class_coverage',
  'rule_lifecycle',
  'scheduler_health',
];
const REQUIRED_METRIC_FIELDS = [
  'id',
  'domain',
  'name',
  'type',
  'value',
  'numerator',
  'denominator',
  'unit',
  'period',
  'source',
  'confidence',
  'status',
  'previous_value',
  'change',
  'target_or_slo',
  'interpretation',
  'next_action',
];
const NUMERIC_TYPES = new Set(['count', 'ratio', 'duration', 'currency']);
const UNKNOWN_VALUES = new Set(['unknown', 'not_applicable', 'not_instrumented']);

function isUnknown(value) {
  return typeof value === 'string' && UNKNOWN_VALUES.has(value.trim().toLowerCase());
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function validateMetric(metric, index) {
  const errors = [];
  const prefix = `metrics[${index}]`;

  if (!metric || typeof metric !== 'object' || Array.isArray(metric)) {
    return [`${prefix} must be an object`];
  }

  for (const field of REQUIRED_METRIC_FIELDS) {
    if (!(field in metric)) errors.push(`${prefix} missing required field: ${field}`);
  }

  if (!METRIC_IDS.includes(metric.id)) errors.push(`${prefix} has unexpected id: ${metric.id ?? 'missing'}`);
  if (!DOMAINS.has(metric.domain)) errors.push(`${prefix} has invalid domain: ${metric.domain ?? 'missing'}`);
  if (!nonEmpty(metric.name)) errors.push(`${prefix} requires name`);
  if (!nonEmpty(metric.type)) errors.push(`${prefix} requires type`);
  if (!nonEmpty(metric.unit)) errors.push(`${prefix} requires unit`);
  if (!nonEmpty(metric.period)) errors.push(`${prefix} requires period`);
  if (!nonEmpty(metric.source)) errors.push(`${prefix} requires source`);
  if (!nonEmpty(metric.confidence)) errors.push(`${prefix} requires confidence`);
  if (!nonEmpty(metric.status)) errors.push(`${prefix} requires status`);
  if (!nonEmpty(String(metric.target_or_slo ?? ''))) errors.push(`${prefix} requires target_or_slo`);
  if (!nonEmpty(metric.interpretation)) errors.push(`${prefix} requires interpretation`);
  if (!nonEmpty(metric.next_action)) errors.push(`${prefix} requires next_action`);

  if (NUMERIC_TYPES.has(metric.type)) {
    if (metric.numerator === null || metric.numerator === undefined || metric.denominator === null || metric.denominator === undefined) {
      errors.push(`${prefix} numeric metric requires explicit numerator and denominator`);
    }
    const validValue = typeof metric.value === 'number' && Number.isFinite(metric.value) || isUnknown(metric.value);
    if (!validValue) {
      errors.push(`${prefix} numeric metric value must be finite number or explicit unknown/not_applicable`);
    }
    if (typeof metric.value === 'number' && metric.value < 0) {
      errors.push(`${prefix} numeric metric value cannot be negative`);
    }
  }

  const scoreText = [
    metric.name,
    metric.value,
    metric.interpretation,
    metric.target_or_slo,
  ].map((value) => String(value ?? '')).join(' ');
  if (/\/100\b/.test(scoreText) || /\blegacy score\b/i.test(scoreText)) {
    errors.push(`${prefix} must not use a decision-making 0-100 legacy score`);
  }

  return errors;
}

export function validateDashboard(data, { mirror } = {}) {
  const errors = [];

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return ['dashboard must be a JSON object'];
  }
  if (data.schema_version !== SCHEMA_VERSION) {
    errors.push(`schema_version must be ${SCHEMA_VERSION}, received ${data.schema_version ?? 'missing'}`);
  }
  if (data.metric_model !== METRIC_MODEL) {
    errors.push(`metric_model must be ${METRIC_MODEL}, received ${data.metric_model ?? 'missing'}`);
  }
  if (!nonEmpty(data.last_updated)) errors.push('last_updated is required');

  if (!Array.isArray(data.metrics)) {
    errors.push('metrics must be an array');
  } else {
    if (data.metrics.length !== METRIC_IDS.length) {
      errors.push(`expected ${METRIC_IDS.length} metrics, received ${data.metrics.length}`);
    }
    const ids = data.metrics.map((metric) => metric?.id);
    if (new Set(ids).size !== ids.length) errors.push('metric ids must be unique');
    for (const id of METRIC_IDS) {
      if (!ids.includes(id)) errors.push(`missing required metric: ${id}`);
    }
    data.metrics.forEach((metric, index) => errors.push(...validateMetric(metric, index)));

    const evidence = data.metrics.find((metric) => metric?.id === 'evidence_completeness');
    if (evidence) {
      const expected = METRIC_IDS.length * REQUIRED_METRIC_FIELDS.length;
      if (evidence.numerator !== expected || evidence.denominator !== expected) {
        errors.push(`evidence_completeness must report ${expected}/${expected} required fields`);
      }
    }
  }

  const momentum = data.momentum;
  if (!momentum || typeof momentum !== 'object' || Array.isArray(momentum)) {
    errors.push('missing momentum object');
  } else {
    if (!MOMENTUM_STATUSES.has(momentum.status)) {
      errors.push(`invalid momentum status: ${momentum.status ?? 'missing'}`);
    }
    if ('formula' in momentum || 'today_score' in momentum || 'yesterday_score' in momentum || 'composite' in momentum) {
      errors.push('momentum lanes must not be averaged into a decision score');
    }
    const lanes = Array.isArray(momentum.lanes) ? momentum.lanes : [];
    const ids = lanes.map((lane) => lane?.id);
    for (const id of MOMENTUM_LANES) {
      if (!ids.includes(id)) errors.push(`missing momentum lane: ${id}`);
    }
    if (new Set(ids).size !== ids.length) errors.push('momentum lane ids must be unique');
  }

  const criticalSlos = Array.isArray(data.critical_slos) ? data.critical_slos : [];
  const sloIds = new Set(criticalSlos.map((slo) => slo?.id));
  for (const id of [
    'zero_critical_false_success',
    'dashboard_publication_4_of_4',
    'scheduler_unique_morning_evening',
    'provider_live_gate',
  ]) {
    if (!sloIds.has(id)) errors.push(`missing critical SLO: ${id}`);
  }

  const publication = data.publication_evidence;
  if (!publication || typeof publication !== 'object' || Array.isArray(publication)) {
    errors.push('missing publication_evidence');
  } else {
    const stages = ['canonical_updated', 'mirror_synced', 'deploy_identified', 'live_verified'];
    for (const stage of stages) {
      if (!publication.stages?.[stage]) errors.push(`missing publication stage: ${stage}`);
    }
    const allVerified = stages.every((stage) => publication.stages?.[stage]?.status === 'verified');
    const liveClaimed = publication.publication_status === 'LIVE' || publication.success_allowed === true;
    if (liveClaimed && !allVerified) {
      errors.push('LIVE publication requires all four stages verified');
    }
    if (liveClaimed) {
      const liveTimestamp = publication.stages?.live_verified?.timestamp;
      if (liveTimestamp !== publication.canonical_snapshot_timestamp) {
        errors.push('LIVE publication requires public timestamp equal to canonical timestamp');
      }
    }
    if (publication.canonical_snapshot_timestamp !== data.last_updated) {
      errors.push('publication canonical timestamp must equal dashboard last_updated');
    }
  }

  if (mirror && stableJson(data) !== stableJson(mirror)) {
    errors.push('canonical and mirror JSON snapshots must be identical');
  }

  return errors;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function main() {
  const args = process.argv.slice(2);
  const file = args.includes('--file')
    ? args[args.indexOf('--file') + 1]
    : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../projects/codex-automation/system-health-dashboard.json');
  const mirrorFile = args.includes('--mirror') ? args[args.indexOf('--mirror') + 1] : null;
  const [data, mirror] = await Promise.all([
    readJson(file),
    mirrorFile ? readJson(mirrorFile) : Promise.resolve(null),
  ]);
  const errors = validateDashboard(data, { mirror });
  if (errors.length) throw new Error(errors.join('\n'));
  process.stdout.write(`Validated schema v${SCHEMA_VERSION} ${METRIC_MODEL} dashboard: ${path.resolve(file)}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
