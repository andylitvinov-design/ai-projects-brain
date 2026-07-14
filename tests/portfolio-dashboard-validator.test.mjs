import test from "node:test";
import assert from "node:assert/strict";
import { validatePortfolioDashboard } from "../scripts/validate-portfolio-dashboard.mjs";

const metricSchema = ["id","name","type","value","numerator","denominator","unit","period","source","confidence","status","previous_value","change","target_or_slo","interpretation","next_action","goal","sector","lifecycle"];

function fixture() {
  const metricIds = ["m1"];
  const dashboard = {
    schema_version: 6,
    metric_model: "adaptive_portfolio_project_goal_v1",
    last_updated: "2026-07-14T20:24:00+02:00",
    main_upgrade: {status:"APPLIED_UPGRADE"},
    portfolio_health: {
      active_projects: 1,
      blocked_projects: 0,
      observed_projects: 1,
      observed_project_ids: ["p1"]
    },
    project_health: [{
      project_id:"p1",
      status:"IMPROVING",
      observation_basis:"deterministic test evidence",
      sectors:{execution:"PASS",product_value:"WATCH",business_growth:"NOT_APPLICABLE",standards:"PASS",reliability:"WATCH",learning:"PASS"}
    }],
    agent_assessments:[{
      project_id:"p1",agent:"/upgrade-validator",sector:"standards",observed_at:"2026-07-14T20:24:00+02:00",
      status:"PASS",applicable_checks:4,passed_checks:4,finding_count:1,critical_finding_count:1,
      evidence_refs:["validator"],summary:"aligned",recommended_action:"keep gate",confidence:"high"
    }],
    goal_pyramid:[{
      id:"g1",name:"one",sectors:[{id:"s1",name:"one",metric_ids:metricIds}]
    },{
      id:"g2",name:"two",sectors:[]
    },{
      id:"g3",name:"three",sectors:[]
    }],
    metric_schema:metricSchema,
    metrics:[["m1","Metric","ratio",100,1,1,"%","run","fixture","high","PASS",0,"improved","1/1","aligned","keep","g1","s1","active"]],
    publication_evidence:{
      publication_status:"STALE",
      success_allowed:false,
      canonical_snapshot_timestamp:"2026-07-14T20:24:00+02:00",
      stages:{canonical_updated:{status:"verified"},mirror_synced:{status:"verified"},deploy_identified:{status:"stale"},live_verified:{status:"needs_verification"}}
    }
  };
  const registry = {projects:[{project_id:"p1"}]};
  const markdown = [
    "# Dashboard",
    "",
    "**Metric model:** `adaptive_portfolio_project_goal_v1`  ",
    "**Last updated:** `2026-07-14T20:24:00+02:00`  ",
    "**Evening result:** `APPLIED_UPGRADE`  ",
    "**Public publication state:** `STALE`"
  ].join("\n");
  return {dashboard,registry,markdown};
}

test("accepts aligned canonical snapshot", () => {
  const {dashboard,registry,markdown} = fixture();
  assert.deepEqual(validatePortfolioDashboard(dashboard,registry,markdown), []);
});

test("rejects Markdown timestamp drift", () => {
  const {dashboard,registry,markdown} = fixture();
  const errors = validatePortfolioDashboard(dashboard,registry,markdown.replace("20:24:00","07:30:00"));
  assert.ok(errors.includes("Markdown last_updated differs from JSON"));
});

test("rejects Markdown model drift", () => {
  const {dashboard,registry,markdown} = fixture();
  const errors = validatePortfolioDashboard(dashboard,registry,markdown.replace("adaptive_portfolio_project_goal_v1","observable_outcomes_v2"));
  assert.ok(errors.includes("Markdown metric model differs from JSON"));
});

test("rejects publication-state drift", () => {
  const {dashboard,registry,markdown} = fixture();
  const errors = validatePortfolioDashboard(dashboard,registry,markdown.replace("`STALE`","`LIVE`"));
  assert.ok(errors.includes("Markdown public publication state differs from JSON"));
});
