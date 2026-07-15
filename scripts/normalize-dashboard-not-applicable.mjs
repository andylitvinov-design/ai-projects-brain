#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_DASHBOARD = 'projects/codex-automation/system-health-dashboard.json';
const NUMERIC_TYPES = new Set(['count', 'ratio', 'duration', 'currency']);

function metricRows(dashboard) {
  return dashboard.metrics.map((row) => Object.fromEntries(dashboard.metric_schema.map((field, index) => [field, row[index]])));
}

function saveMetricRows(dashboard, rows) {
  dashboard.metrics = rows.map((row) => dashboard.metric_schema.map((field) => row[field] ?? null));
}

function isNotApplicable(metric) {
  return String(metric.status ?? '').toUpperCase() === 'NOT_APPLICABLE'
    || String(metric.value ?? '').toLowerCase() === 'not_applicable';
}

export function normalizeNotApplicableMetrics(input) {
  const dashboard = JSON.parse(JSON.stringify(input));
  const rows = metricRows(dashboard);
  let changed = 0;

  for (const metric of rows) {
    if (!NUMERIC_TYPES.has(metric.type) || !isNotApplicable(metric)) continue;
    if (metric.value !== 'not_applicable') {
      metric.value = 'not_applicable';
      changed += 1;
    }
    if (metric.status !== 'NOT_APPLICABLE') {
      metric.status = 'NOT_APPLICABLE';
      changed += 1;
    }
    if (metric.numerator !== null) {
      metric.numerator = null;
      changed += 1;
    }
    if (metric.denominator !== null) {
      metric.denominator = null;
      changed += 1;
    }
    metric.interpretation = 'No applicable sample exists; this metric is not zero and is excluded from numeric interpretation.';
  }

  saveMetricRows(dashboard, rows);
  return { dashboard, changed };
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const index = args.indexOf('--file');
  const file = path.resolve(root, index >= 0 ? args[index + 1] : DEFAULT_DASHBOARD);
  const input = JSON.parse(fs.readFileSync(file, 'utf8'));
  const { dashboard, changed } = normalizeNotApplicableMetrics(input);
  fs.writeFileSync(file, `${JSON.stringify(dashboard, null, 2)}\n`);
  process.stdout.write(`Normalized NOT_APPLICABLE evidence fields: ${changed}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
