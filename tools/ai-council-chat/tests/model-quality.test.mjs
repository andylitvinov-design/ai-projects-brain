import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const context=vm.createContext({});
vm.runInContext(readFileSync(new URL('../model-quality-core.js',import.meta.url),'utf8'),context);
const core=context.AICouncilModelQuality;
const threads=[{id:'t-1',created:100,rounds:[{created:101,question:'Find a source',answers:[
 {model:'a/one:free',status:'ok',text:'Observation requires verification',durationMs:300},
 {model:'a/one:free',status:'ok',text:'Second role from same call',sharedRequest:true},
 {model:'b/two:free',status:'error',error:'HTTP 429',requestDispatched:true}],
 synthesisModel:'c/three:free',synthesisStatus:'ok',synthesis:'Detailed synthesis',synthesisDurationMs:500},
 {question:'manual prompt',manualMode:'opencode',answers:[],synthesisStatus:'partial'},
 {question:'queued but not sent',answers:[{model:'d/four:free',status:'error',error:'Stopped before dispatch'}],synthesisStatus:'partial'}]}];
test('round ledger includes actual provider attempts, never doubles shared-call roles or manual imports',()=>{
 const rows=core.records(threads);
 assert.equal(rows.length,3);
 assert.equal(rows.filter(x=>x.ok).length,2);
 assert.equal(rows.find(x=>x.model==='b/two:free').ok,false);
 assert.equal(rows.find(x=>x.model==='a/one:free').latencyMs,300);
 assert.equal(rows.find(x=>x.kind==='synthesis').latencyMs,500);
});
test('ranking distinguishes response quality from availability and uses conservative low-sample estimate',()=>{
 const rows=core.records(threads),quality=core.summary(rows,{
  [rows[0].id]:{score:10},[rows[2].id]:{score:8}
 });
 const a=quality.find(x=>x.model==='a/one:free'),b=quality.find(x=>x.model==='b/two:free');
 assert.equal(a.graded,1);assert.equal(a.quality,10);assert.ok(a.ranking<10);assert.equal(a.lowSample,true);
 assert.equal(b.graded,0);assert.equal(b.ranking,null);assert.equal(b.reliability,0);
});
test('score calculation rejects invented IDs, duplicate IDs and malformed grades',()=>{
 const samples=core.records(threads).filter(x=>x.ok);
 const evaluations=samples.map((s,i)=>({id:'E'+(i+1),relevance:10,specificity:8,completeness:6,evidence:4,clarity:8,reason:'Concrete critique with uncertainty'}));
 const accepted=core.parseGrades(JSON.stringify({evaluations}),samples,'judge/free',123);
 assert.equal(Object.keys(accepted).length,2);assert.equal(accepted[samples[0].id].score,7.3);
 assert.equal(accepted[samples[0].id].scope,'model_opinion_only');
 assert.throws(()=>core.parseGrades(JSON.stringify({evaluations:[{...evaluations[0],id:'E8'},evaluations[1]]}),samples,'judge/free'),/Unexpected/);
 assert.throws(()=>core.parseGrades(JSON.stringify({evaluations:[evaluations[0],evaluations[0]]}),samples,'judge/free'),/repeated/);
 assert.throws(()=>core.parseGrades(JSON.stringify({evaluations:[{...evaluations[0],evidence:100},evaluations[1]]}),samples,'judge/free'),/Invalid/);
});
test('judging never includes model identity and requires independent verified-free judge',()=>{
 const samples=core.records(threads).filter(x=>x.ok);
 const prompt=core.judgePrompt(samples,'ru');
 assert.equal(JSON.stringify(prompt).includes('a/one:free'),false);
 const isFree=x=>x.id.endsWith(':free')&&x.pricing?.prompt===0&&x.pricing?.completion===0;
 const catalog=[{id:'a/one:free',pricing:{prompt:0,completion:0}},
  {id:'a/other:free',pricing:{prompt:0,completion:0}},
  {id:'z/independent:free',pricing:{prompt:0,completion:0}},
  {id:'h/paid',pricing:{prompt:1,completion:1}}];
 assert.equal(core.chooseJudge(catalog,samples,isFree),'z/independent:free');
 assert.equal(core.chooseJudge([{id:'a/one:free',pricing:{prompt:0,completion:0}}],samples,isFree),null);
});
test('automatic due gate is opt-in and cadence-bound; manual is never due',()=>{
 const t=604800001;
 assert.equal(core.due({cadence:'weekly',consent:false,lastAttemptAt:1},t),false);
 assert.equal(core.due({cadence:'manual',consent:true,lastAttemptAt:1},t),false);
 assert.equal(core.due({cadence:'weekly',consent:true,lastAttemptAt:1},t),true);
 assert.equal(core.due({cadence:'weekly',consent:true,lastAttemptAt:t-1000},t),false);
 assert.equal(core.due({cadence:'daily',consent:true,lastAttemptAt:t-90000000},t),true);
});
test('ungraded answer selection is bounded and model-balanced',()=>{
 const items=[];for(let i=0;i<14;i++)items.push({id:'a'+i,model:i<12?'alpha':'beta',ok:true,created:i});
 const selected=core.candidates(items,{},6);
 assert.equal(selected.length,6);assert.ok(selected.filter(x=>x.model==='beta').length>=2);
});
