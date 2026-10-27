import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

// Execute functions extracted from the production app instead of cloning their logic.
const source=readFileSync(join(dirname(fileURLToPath(import.meta.url)),'..','app.js'),'utf8');
function extract(start,end){
 const a=source.indexOf(start),b=source.indexOf(end,a);
 assert.ok(a>=0&&b>a,'app.js contract must expose '+start);
 return source.slice(a,b);
}
const loadSource=extract('async function loadModels(', '\nfunction fillModelSelects(){');
const chooseSource=extract('function chooseEngineeringModel(', '\nasync function startOAuth(){');
const DEEPSEEK='nvidia-direct/deepseek-v4.1-flash:trial';
const DIRECT={id:DEEPSEEK,name:'DeepSeek NVIDIA trial',pricing:{prompt:'0',completion:'0'},architecture:{output_modalities:['text']}};

function registry(fetchMock,direct=[]){
 const body=[
  "const API='https://openrouter.ai/api/v1';",
  "const globalThis={AICouncilExternalProviders:{models:()=>direct}};",
  "const state={lang:'ru',models:['ux','product','technical','synth']};",
  "let freeModels=[],modelLoadedAt=0,filled=0,persisted=0;",
  "const status={textContent:''},el=()=>status,t=k=>k==='ready'?'Ready: ':k;",
  "const persist=()=>persisted++,fillModelSelects=()=>filled++;",
  loadSource,
  "return {loadModels,get models(){return freeModels;},get selections(){return state.models;},get status(){return status.textContent;},get filled(){return filled;},get persisted(){return persisted;}};"
 ].join('\n');
 return new Function('fetch','direct',body)(fetchMock,direct);
}

test('DeepSeek remains selectable if OpenRouter model catalog is unreachable',async()=>{
 const h=registry(async()=>{throw new Error('network unavailable');},[DIRECT]);
 const saved=h.selections.slice();
 const models=await h.loadModels(true);
 assert.deepEqual(models.map(x=>x.id),[DEEPSEEK]);
 assert.deepEqual(h.selections,saved,'manual choices never silently change');
 assert.equal(h.filled,1);
 assert.equal(h.persisted,1);
 assert.match(h.status,/OpenRouter: network unavailable/);
 assert.match(h.status,/прямые подключения доступны/);
});
test('Only actually zero-price catalog entries are accepted alongside opted-in providers',async()=>{
 const response={ok:true,json:async()=>({data:[
  {id:'bad/paid:free',name:'paid despite suffix',pricing:{prompt:'0.1',completion:'0'}},
  {id:'bad/unknown:free',name:'missing rate',pricing:{prompt:null,completion:'0'}},
  {id:'good/free:free',name:'free',pricing:{prompt:'0',completion:'0'},architecture:{output_modalities:['text']}}
 ]})};
 const h=registry(async()=>response,[DIRECT]);
 const found=await h.loadModels(true);
 assert.deepEqual(found.map(x=>x.id),['good/free:free',DEEPSEEK]);
 assert.doesNotMatch(h.status,/OpenRouter:/);
});
test('No direct providers and failed OpenRouter catalog remains a real error',async()=>{
 const h=registry(async()=>{throw new Error('network unavailable');});
 await assert.rejects(()=>h.loadModels(true),/network unavailable/);
 assert.deepEqual(h.models,[]);
 assert.equal(h.filled,0);
});
test('Explicit DeepSeek selection only changes engineering reviewer after verified consent',()=>{
 function choice(connected,registryModels){
  const body=[
   "const state={lang:'ru',models:['ux','product','old-tech','synth']};",
   "let saved=0,filled=0;",
   "const persist=()=>saved++,fillModelSelects=()=>filled++;",
   "const globalThis={AICouncilExternalProviders:{valid:p=>p==='nvidia'&&connected}};",
   "const freeModels=registryModels;",
   "const el=()=>({set textContent(v){}});",
   chooseSource,
   "return {chooseEngineeringModel,get models(){return state.models;},get saved(){return saved;},get filled(){return filled;}};"
  ].join('\n');
  return new Function('connected','registryModels',body)(connected,registryModels);
 }
 const disconnected=choice(false,[DIRECT]);
 assert.equal(disconnected.chooseEngineeringModel(DEEPSEEK),false);
 assert.deepEqual(disconnected.models,['ux','product','old-tech','synth']);
 const missing=choice(true,[]);
 assert.equal(missing.chooseEngineeringModel(DEEPSEEK),false);
 const active=choice(true,[DIRECT]);
 assert.equal(active.chooseEngineeringModel(DEEPSEEK),true);
 assert.deepEqual(active.models,['ux','product',DEEPSEEK,'synth']);
 assert.equal(active.saved,1);
 assert.equal(active.filled,1);
 assert.equal(active.chooseEngineeringModel('paid/anything'),false);
});
