import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareMorningSnapshot, parseMemoryChanges, renderMarkdown, buildPublicationTrace } from '../scripts/publish-morning-dashboard-snapshot.mjs';

const metricSchema=['id','name','type','value','numerator','denominator','unit','period','source','confidence','status','previous_value','change','target_or_slo','interpretation','next_action','goal','sector','lifecycle'];
function fixture(){
  return {
    schema_version:6,metric_model:'adaptive_portfolio_project_goal_v1',last_updated:'2026-07-14T20:00:00+02:00',status:'evening_upgrade_publication_stale',unrelated:{keep:true},
    portfolio_health:{state:'NEEDS_ATTENTION',active_projects:1,observed_projects:1,blocked_projects:0},
    project_health:[{project_id:'ai-projects-brain',status:'IMPROVING',sectors:{execution:'PASS',product_value:'WATCH',business_growth:'NOT_APPLICABLE',standards:'PASS',reliability:'WATCH',learning:'PASS'}}],
    agent_assessments:[],goal_pyramid:[{id:'g1',name:'Efficiency and System Intelligence',sectors:[{id:'s1',name:'Execution',metric_ids:['eval_pass_rate','avoidable_handoff_rate']}]},{id:'g2',name:'Business Growth and Professional Value',sectors:[{id:'s2',name:'Reliability',metric_ids:['publication_freshness']}]},{id:'g3',name:'Continuous Self-Development',sectors:[{id:'s3',name:'Lifecycle',metric_ids:['scheduler_health']}]}],
    metric_schema:metricSchema,
    metrics:[
      ['eval_pass_rate','Eval Pass Rate','ratio',100,11,11,'%/count','run','old','high','PASS',100,'same','all','ok','keep','g1','s1','active'],
      ['avoidable_handoff_rate','Avoidable Handoff Rate','ratio',0,0,6,'%/count','run','old','high','PASS',0,'same','0','ok','keep','g1','s1','active'],
      ['publication_freshness','Publication Freshness','state','STALE',null,null,'state','run','old','high','CRITICAL_SLO_NOT_MET','STALE','same','4/4','stale','deploy','g2','s2','active'],
      ['scheduler_health','Scheduler Health','ratio',100,2,2,'%/count','run','old','high','PASS',100,'same','2/2','ok','keep','g3','s3','active']
    ],
    critical_slos:[{id:'zero_critical_false_success'},{id:'dashboard_publication_4_of_4'},{id:'scheduler_unique_morning_evening'},{id:'provider_live_gate'},{id:'audit_score_not_health'}],
    publication_evidence:{publication_status:'STALE',success_allowed:false,stages:{deploy_identified:{status:'stale',timestamp:'2026-07-11T09:07:37.194Z'}}},activity_log:[]
  };
}
const registry={projects:[{project_id:'ai-projects-brain',name:'AI Projects Brain'}]};
const memory=`## Current Key Change Map\n\n| Priority | Finding | Delta | Evidence state | Evidence / consequence | Next route |\n|---:|---|---|---|---|---|\n| 1 | Writer integrated | \`RESOLVED\` | \`PROVEN\` | workflow | \`/upgrade\` |`;

test('parses supported memory change labels',()=>{ assert.equal(parseMemoryChanges(memory)[0].delta_label,'RESOLVED'); });
test('prepares canonical snapshot and preserves unrelated fields',()=>{
  const result=prepareMorningSnapshot(fixture(),registry,memory,{timestamp:'2026-07-15T07:30:00+02:00'});
  assert.deepEqual(result.unrelated,{keep:true}); assert.equal(result.last_updated,'2026-07-15T07:30:00+02:00');
  assert.equal(result.daily_intelligence.summary.score_now,'unknown'); assert.equal(result.publication_evidence.publication_status,'STALE');
  assert.equal(result.project_metrics.at(-1).numerator,1);
});
test('renders required dashboard layers',()=>{
  const result=prepareMorningSnapshot(fixture(),registry,memory,{timestamp:'2026-07-15T07:30:00+02:00'}); const md=renderMarkdown(result,registry);
  for(const section of ['## Portfolio Health change','## Project Health matrix change','## Goal-pyramid change','## Daily Intelligence','## Publication ladder']) assert.ok(md.includes(section));
});
test('builds trace only when canonical and mirror blobs match',()=>{
  const result=prepareMorningSnapshot(fixture(),registry,memory,{timestamp:'2026-07-15T07:30:00+02:00'}); const sha='a'.repeat(40); const blob='b'.repeat(40);
  const trace=buildPublicationTrace(result,{canonicalCommitSha:sha,canonicalBlobSha:blob,mirrorCommitSha:sha,mirrorBlobSha:blob});
  assert.equal(trace.publication_status,'STALE'); assert.equal(trace.stages.canonical_updated.blob_sha,trace.stages.mirror_synced.blob_sha);
});
test('rejects trace when mirror blob differs',()=>{
  const result=prepareMorningSnapshot(fixture(),registry,memory,{timestamp:'2026-07-15T07:30:00+02:00'});
  assert.throws(()=>buildPublicationTrace(result,{canonicalCommitSha:'a'.repeat(40),canonicalBlobSha:'b'.repeat(40),mirrorCommitSha:'c'.repeat(40),mirrorBlobSha:'d'.repeat(40)}),/differ/);
});
