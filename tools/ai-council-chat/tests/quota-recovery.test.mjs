import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const source=fs.readFileSync(path.join(dir,'..','recovery.js'),'utf8');
const app=fs.readFileSync(path.join(dir,'..','app.js'),'utf8');
const audit=fs.readFileSync(path.join(dir,'..','audit.js'),'utf8');
const idGemini='google-direct/gemini-3.8-flash:free-tier',idMistral='mistral-direct/mistral-small-2603:experiment';
function storage(){const map=new Map();return{getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)}}
function setup(providers=[idGemini,idMistral]){
 const localStorage=storage(),els=new Map(),events={persist:0,renderAll:0,settings:0,render:0,load:0,audit:0,send:0};
 const wrap={append(){}};
 els.set('messages',wrap);els.set('siteUrl',{value:'',click(){}});
 els.set('auditSiteButton',{click(){events.audit++;}});els.set('sendButton',{click(){events.send++;}});
 els.set('question',{value:''});els.set('recoveryMessage',{textContent:''});
 const document={createElement(tag){return{tag,type:'',className:'',textContent:'',children:[],append(...items){this.children.push(...items)},setAttribute(k,v){this[k]=v},onclick:null}},
  getElementById:id=>els.get(id)||null};
 const state={lang:'ru',active:'thread-123',models:['openrouter/1:free','openrouter/2:free','openrouter/3:free','openrouter/4:free']};
 const th={rounds:[{question:'Audit Holistic House',siteAudit:{summary:{target:'https://holistichouse.vercel.app'}},
 answers:[{model:'google/gemma:free',status:'error',error:'429 OpenRouter quota expired'},{status:'error',error:'429 quota'}, {status:'ok',text:'Some review'}],
 synthesisStatus:'error',synthesisError:'429 account limit'}]};
 const fakeGlobal={AICouncilExternalProviders:{models:()=>providers.map(id=>({id}))}};
 const resolve=()=>th;
 let failure='',busy=false;
 const init=new Function('globalThis','state','current','busy','localStorage','safeJson','persist','fillModelSelects','setError','openSettings','renderMessages','renderAll','el','document',source+
  ';return globalThis.AICouncilQuotaRecovery;');
 const api=init(fakeGlobal,state,resolve,busy,localStorage,(s,f)=>{try{return JSON.parse(s)}catch{return f}},()=>{events.persist++},
  ()=>{events.load++},text=>{failure=text},()=>{events.settings++},()=>{events.render++},()=>{events.renderAll++},
  id=>els.get(id),document);
 return {api,state,events,th,localStorage,get failure(){return failure}};
}
test('detects quota failures, preserves 429 evidence from prior round',()=>{
 const h=setup();assert.equal(h.api.currentFailure(),h.th.rounds[0]);
 assert.match(h.th.rounds[0].answers[0].error,/429/);
});
test('switch requires two already connected free-tier providers, no provider requests are made automatically',()=>{
 const h=setup([idGemini]);
 assert.equal(h.api.switchModels(),false);
 assert.equal(h.events.settings,1);
 assert.deepEqual(h.state.models,['openrouter/1:free','openrouter/2:free','openrouter/3:free','openrouter/4:free']);
 assert.equal(h.events.audit,0);
});
test('explicit switch uses Gemini+Mistral with role-specific prompts; rerun only after button',()=>{
 const h=setup();
 assert.equal(h.api.switchModels(),true);
 assert.deepEqual(h.state.models,[idGemini,idMistral,idMistral,idGemini]);
 assert.equal(h.events.audit,0,'Switching should not secretly spend provider calls');
 assert.equal(h.events.persist,1);
 h.api.retry(h.th.rounds[0]);
 assert.equal(h.events.audit,1);
 assert.equal(h.state.active,null);
 assert.equal(h.events.renderAll,1);
 assert.equal(h.th.rounds[0].answers[0].error,'429 OpenRouter quota expired','failed round must be preserved');
 assert.equal(h.localStorage.getItem('ai-council-previous-reviewer-panel')!==null,true);
 h.api.restoreModels();
 assert.deepEqual(h.state.models,['openrouter/1:free','openrouter/2:free','openrouter/3:free','openrouter/4:free']);
});
test('provider-only questions/audits are not blocked by empty OpenRouter key',()=>{
 assert.match(app,/!key&&!globalThis\.AICouncilExternalProviders\?\.models\(\)\?\.length/);
 assert.match(audit,/!key&&!globalThis\.AICouncilExternalProviders\?\.models\(\)\?\.length/);
});
test('no misleading 50/day local quota and browser-side backoff after 429',()=>{
 assert.ok(app.includes('Локально: '));
 assert.ok(!app.includes("useCount()+' · 50/day¹'"));
 assert.match(app,/openRouterBackoffUntil=Date\.now\(\)\+10\*60\*1000/);
});

test('Mistral free-tier 429 is attributed to Mistral rather than OpenRouter',()=>{
 const h=setup();
 const round=h.th.rounds[0];
 round.answers=[{model:'google-direct/gemini-3.8-flash:free-tier',status:'ok',text:'Gemini response'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'error',error:'Rate limit exceeded'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'error',error:'Rate limit exceeded'}];
 round.synthesisModel='google-direct/gemini-3.8-flash:free-tier';
 round.synthesisError='';
 assert.equal(h.api.sourceForRound(round),'mistral');
 assert.equal(h.api.currentFailure(),round);
});
test('mixed OpenRouter and direct-provider limits are not mislabeled as OpenRouter only',()=>{
 const h=setup();
 const round=h.th.rounds[0];
 round.answers=[{model:'google/gemma-4-31b-it:free',status:'error',error:'HTTP 429'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'error',error:'Rate limit exceeded'}];
 round.synthesisError='';
 assert.equal(h.api.sourceForRound(round),'mixed');
});
