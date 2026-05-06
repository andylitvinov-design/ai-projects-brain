#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = {
    input: 'projects/codex-automation/data/run-ledger.json',
    today: new Date().toISOString().slice(0, 10),
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--input') {
      args.input = argv[++index];
    } else if (arg === '--today') {
      args.today = argv[++index];
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function usage() {
  return `Usage:\n  node scripts/summarize-codex-automation-costs.mjs [--input path/to/run-ledger.json] [--today YYYY-MM-DD]\n\nInput can be either an array of run records or an object with a \"runs\" array.\n`;
}

function toDateOnly(date) {
  return date.toISOString().slice(0, 10);
}

function startOfIsoWeek(date) {
  const copy = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = copy.getUTCDay() || 7;
  copy.setUTCDate(copy.getUTCDate() - day + 1);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function parseDate(dateString) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  return date;
}

function loadRuns(inputPath) {
  if (!fs.existsSync(inputPath)) {
    return {
      runs: [],
      missingInput: true,
    };
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const parsed = JSON.parse(raw);
  const runs = Array.isArray(parsed) ? parsed : parsed.runs;

  if (!Array.isArray(runs)) {
    throw new Error('Run ledger must be an array or an object with a runs array.');
  }

  return { runs, missingInput: false };
}

function runStartedAt(run) {
  const raw = run?.started_at || run?.startedAt || run?.createdAt || run?.created_at || '';
  const date = new Date(raw);
  return Number.isNaN(date.valueOf()) ? null : date;
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function summarizeWeek(runs, weekStart) {
  const weekEndExclusive = addDays(weekStart, 7);
  const weekRuns = runs.filter((run) => {
    const startedAt = runStartedAt(run);
    return startedAt && startedAt >= weekStart && startedAt < weekEndExclusive;
  });

  const byAutomation = new Map();
  let estimatedCost = 0;
  let unknownCostRuns = 0;
  let scheduledRunCount = 0;
  let manualRunCount = 0;
  let tokenSpendingRunCount = 0;

  for (const run of weekRuns) {
    const automation = String(run.automation || 'unknown');
    const current = byAutomation.get(automation) || {
      automation,
      run_count: 0,
      estimated_cost_ue: 0,
      unknown_cost_runs: 0,
    };

    const cost = numberOrNull(run.estimated_cost_ue ?? run.estimatedCostUe);
    current.run_count += 1;
    if (cost === null) {
      current.unknown_cost_runs += 1;
      unknownCostRuns += 1;
    } else {
      current.estimated_cost_ue += cost;
      estimatedCost += cost;
    }

    if (run.scheduled === true || String(run.trigger || '').toLowerCase() === 'cron' || String(run.trigger || '').toLowerCase() === 'schedule') {
      scheduledRunCount += 1;
    } else {
      manualRunCount += 1;
    }

    if (run.can_spend_tokens === true || run.canSpendTokens === true) {
      tokenSpendingRunCount += 1;
    }

    byAutomation.set(automation, current);
  }

  return {
    week_start: toDateOnly(weekStart),
    week_end: toDateOnly(addDays(weekStart, 6)),
    currency: 'UE',
    total_estimated_cost_ue: Number(estimatedCost.toFixed(2)),
    run_count: weekRuns.length,
    scheduled_run_count: scheduledRunCount,
    manual_run_count: manualRunCount,
    token_spending_run_count: tokenSpendingRunCount,
    unknown_cost_runs: unknownCostRuns,
    by_automation: Array.from(byAutomation.values()).map((item) => ({
      ...item,
      estimated_cost_ue: Number(item.estimated_cost_ue.toFixed(2)),
    })),
  };
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  const today = parseDate(args.today);
  const thisWeekStart = startOfIsoWeek(today);
  const lastWeekStart = addDays(thisWeekStart, -7);
  const previousWeekStart = addDays(thisWeekStart, -14);
  const inputPath = path.resolve(args.input);
  const { runs, missingInput } = loadRuns(inputPath);

  const output = {
    generated_at: new Date().toISOString(),
    input: args.input,
    input_missing: missingInput,
    note: missingInput
      ? 'No run ledger was found, so actual last-week and previous-week cost cannot be measured from repository data yet.'
      : '',
    last_week: summarizeWeek(runs, lastWeekStart),
    previous_week: summarizeWeek(runs, previousWeekStart),
    needs_verification: [
      ...(missingInput ? ['projects/codex-automation/data/run-ledger.json is missing'] : []),
      'OpenAI/Codex billing export if direct API/Codex usage must be exact',
      'GitHub Actions run history for mobile-dashboard-launch.yml',
      'codex-links command storage export for the same date range',
      'local air-andrii.lan cron/launchd/process logs',
    ],
  };

  console.log(JSON.stringify(output, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
