import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const catalog=[{id:'vendor/one:free',canonical_slug:'vendor/one-v1',pricing:{prompt:'0',completion:'0',image:'0',request:'0'},architecture:{input_modalities:['text','image']}},{id:'vendor/one',canonical_slug:'vendor/one-v1',pricing:{prompt:'1',completion:'1'}},{id:'vendor/two:free',canonical_slug:'vendor/two-v2',pricing:{prompt:'0',completion:'0'}}];
function context(){const c=vm.createContext({});vm.runInContext(source('safety.js'),c);return c.AICouncilSafety;}
function store(){const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};}
class Element{
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.value='';this.style={};this.classList={toggle(){},add(){},remove(){}};}
 append(...children){this.children.push(...children)} prepend(...children){this.children.unshift(...children)} replaceChildren(...children){this.children=children} remove(){} setAttribute(){}
}
function harness(reply){
 const elements=new Map(),calls=[];
 const c=vm.createContext({localStorage:store(),sessionStorage:store(),document:{getElementById:id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id)},createElement:tag=>new Element(tag),body:new Element()},location:{origin:'https://council.test'},AbortController,setTimeout,clearTimeout,Promise,Date,console,CATALOG:catalog,fetch:async(url,options)=>{
  if(url.endsWith('/models'))return {ok:true,json:async()=>({data:catalog})};
  if(url.endsWith('/key'))return {ok:true,json:async()=>({data:{}})};
  calls.push(JSON.parse(options.body));return {ok:true,status:200,headers:{get:()=>null},json:async()=>({model:'vendor/one-v1',usage:{cost:0},choices:[{message:{content:'Reviewed'}}]}),...await reply?.(calls.length)};
 }});
 vm.runInContext(source('safety.js'),c);vm.runInContext(source('app.js').replace(/\ninit\(\);\s*$/,'\n'),c);
 vm.runInContext("key='test-key';freeModels=AICouncilSafety.freeCatalog(CATALOG);modelLoadedAt=Date.now();state.models=['vendor/one:free','vendor/one:free','vendor/one:free','vendor/one:free'];",c);
 return {c,calls,elements,run:code=>vm.runInContext(code,c)};
}
test('catalog requires actual numeric zero in every present price field',()=>{
 const g=context();for(const x of ['', ' ',null,false,[],{},'0x0','NaN','Infinity','1e-999','-0.01',0.1]){
  assert.equal(g.isFreeModel({id:'a:free',pricing:{prompt:x,completion:'0'}}),false,JSON.stringify(x));
 }
 for(const x of [0,'0','0.0','0e-10','-0','.0'])assert.equal(g.isZero(x),true,String(x));
 assert.equal(g.isFreeModel({id:'a:free',pricing:{prompt:'0',completion:'0',request:'1'}}),false);
 assert.equal(g.isFreeModel({id:'a:free',pricing:{prompt:'0'}}),false);
 assert.equal(g.isFreeModel({id:'a',pricing:{prompt:'0',completion:'0'}}),false);
});
test('response identity uses current catalog canonical aliases and rejects unknown or charged replies',()=>{
 const g=context(),m=g.freeCatalog(catalog)[0];
 for(const model of ['vendor/one:free','vendor/one-v1','vendor/one'])assert.equal(g.responseIssue(m,{model,usage:{cost:0}}),'');
 for(const model of ['vendor/two:free','vendor/unrelated',''])assert.match(g.responseIssue(m,{model,usage:{cost:0}}),/model/i);
 for(const cost of [undefined,null,'',false,'1e-999',1,-1])assert.match(g.responseIssue(m,{model:m.id,usage:{cost}}),/cost/i);
 assert.match(g.responseIssue(m,{model:m.id,usage:{cost:0,cost_details:{upstream_inference_cost:1}}}),/cost/i);
 assert.match(g.responseIssue(m,{model:m.id,usage:{cost:0,is_byok:true}}),/BYOK/);
});
test('all requests use exact chosen model and provider-side zero price caps without fallback',async()=>{
 const h=harness();assert.equal(await h.run("modelRequest('vendor/one:free',[])"),'Reviewed');
 assert.deepEqual(h.calls[0].provider,{allow_fallbacks:false,max_price:{prompt:0,completion:0,request:0,image:0}});
 assert.equal(h.calls[0].model,'vendor/one:free');assert.equal(h.calls[0].models,undefined);
});
for(const status of [401,402,403,429])test(`${status} stops queued reviewers and synthesis before another completion request`,async()=>{
 const h=harness(()=>({ok:false,status,json:async()=>({error:{code:status,message:'Unsafe provider text is not surfaced'}})}));
 const results=await h.run("Promise.allSettled([modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[])])");
 assert.equal(h.calls.length,1);assert.ok(results.every(r=>r.status==='rejected'));
 await assert.rejects(h.run("modelRequest('vendor/one:free',[])"),/stopped|остановлены/i);assert.equal(h.calls.length,1);
});
for(const response of [{model:'other/paid',usage:{cost:0}},{model:'vendor/one-v1',usage:{cost:1}},{model:'vendor/one-v1'}])test(`unsafe response ${JSON.stringify(response)} halts the queue`,async()=>{
 const h=harness(()=>({json:async()=>({...response,choices:[{message:{content:'Must not be accepted'}}]})}));
 const results=await h.run("Promise.allSettled([modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[])])");
 assert.equal(h.calls.length,1);assert.ok(results.every(r=>r.status==='rejected'));
});
test('long conversation retains latest question and reviewer answer when synthesis failed',()=>{
 const g=context(),thread={rounds:[0,1,2,3].map(i=>({question:'q'+i+'x'.repeat(1950),synthesis:'s'+i+'y'.repeat(2400)}))};
 thread.rounds[3]={question:'LATEST QUESTION',answers:[{status:'ok',model:'expert',text:'LATEST REVIEW'}]};
 const text=g.historyContext(thread);assert.ok(text.length<=8000);assert.match(text,/LATEST QUESTION/);assert.match(text,/LATEST REVIEW/);assert.ok(text.indexOf('q2')<text.indexOf('LATEST QUESTION'));assert.doesNotMatch(text,/q0/);
});
test('aggregate failure keeps Markdown export and specification action; export includes raw evidence',()=>{
 const h=harness();h.run("state.active='thread';state.threads=[{id:'thread',rounds:[{question:'Q',answers:[{model:'vendor/one:free',status:'ok',text:'Raw reviewer'}],synthesisStatus:'error',synthesisError:'Failed',evidenceAppendix:'Appendix facts',siteAudit:{pages:[{url:'https://holistichouse.vercel.app/en/services',title:'Services',text_excerpt:'Raw excerpt'}]}}]}];renderMessages();");
 const flatten=e=>[e,...e.children.flatMap(flatten)];const buttons=flatten(h.elements.get('messages')).filter(e=>e.tag==='button');
 assert.ok(buttons.some(e=>e.textContent.includes('Экспорт')));assert.ok(buttons.some(e=>e.className.includes('spec-open-button')&&!e.disabled));
 const md=h.run('roundMarkdown(current().rounds[0])');for(const value of ['Raw reviewer','Failed','Appendix facts','Raw excerpt','/en/services'])assert.ok(md.includes(value));
});

for(const status of [401,402,403,429])test(`HTTP ${status} cannot be masked by conflicting body code`,async()=>{
 const h=harness(()=>({ok:false,status,json:async()=>({error:{code:500}})}));
 const results=await h.run("Promise.allSettled([modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[])])");
 assert.equal(h.calls.length,1);assert.ok(results.every(r=>r.status==='rejected'));
 assert.match(results[0].reason.message,new RegExp(String(status)));
});

for(const response of [null,[],false,'not an envelope'])test(`invalid response envelope ${JSON.stringify(response)} stops the queue`,async()=>{
 const h=harness(()=>({json:async()=>response}));
 const results=await h.run("Promise.allSettled([modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[])])");
 assert.equal(h.calls.length,1);assert.ok(results.every(r=>r.status==='rejected'));
});
test('failed catalog verification blocks all queued completions without a retry cascade',async()=>{
 const h=harness();let lookups=0;const original=h.c.fetch;h.c.fetch=async(url,options)=>{if(url.endsWith('/models')&&++lookups===1)return {ok:false,status:429};return original(url,options)};
 const results=await h.run("Promise.allSettled([modelRequest('vendor/one:free',[]),modelRequest('vendor/one:free',[])])");
 assert.equal(h.calls.length,0);assert.equal(lookups,1);assert.ok(results.every(r=>r.status==='rejected'));
});

test('a connection check started before a safety failure cannot clear the later halt',async()=>{
 const h=harness(()=>({json:async()=>({model:'unknown/model',usage:{cost:0}})}));
 let release;const gate=new Promise(resolve=>release=resolve);const original=h.c.fetch;
 h.c.fetch=async(url,options)=>{if(url.endsWith('/key')){await gate;return {ok:true,json:async()=>({data:{}})}};return original(url,options)};
 const verification=h.run('verifyConnection()');
 await assert.rejects(h.run("modelRequest('vendor/one:free',[])"),/rejected/);
 release();await verification;
 await assert.rejects(h.run("modelRequest('vendor/one:free',[])"),/stopped|остановлены/i);assert.equal(h.calls.length,1);
});

test('dispatch evidence is recorded only for requests that pass all guards',async()=>{
 const h=harness(()=>({ok:false,status:429,json:async()=>({error:{code:429}})}));
 h.c.dispatched=[];
 await h.run("Promise.allSettled([modelRequest('vendor/one:free',[],{onDispatch:()=>dispatched.push('first')}),modelRequest('vendor/one:free',[],{onDispatch:()=>dispatched.push('blocked')})])");
 assert.deepEqual([...h.c.dispatched],['first']);assert.equal(h.calls.length,1);
});

function externalStub(h,overrides={}){
 const ids=['google-direct/fixture:free-tier','mistral-direct/fixture:experiment'],calls=[];
 h.c.AICouncilExternalProviders={ids,connectionVersion:()=>1,models:()=>ids.map(id=>({id,name:'Direct fixture · billing unverified',architecture:{input_modalities:['text']},billingVerification:'unverified-account-attestation',...overrides})),call:async(...args)=>{calls.push(args);return 'Should not be called';}};
 return {ids,calls};
}
for(const position of [0,1,2,3])test(`a saved direct selection in slot ${position} is ineligible for strict-free Council`,async()=>{
 const h=harness(),external=externalStub(h);h.c.DIRECT=external.ids[0];await h.run('loadModels(true)');h.run(`state.models[${position}]=DIRECT;fillModelSelects()`);
 assert.equal(h.run('selectedModelsValid()'),false);const directOption=h.elements.get('model'+position).children.find(x=>x.value===external.ids[0]);assert.equal(directOption.disabled,true);assert.equal(h.run(`state.models[${position}]`),external.ids[0],'preserve saved choice rather than silently substitute');
});
for(const providerIndex of [0,1])test(`direct provider ${providerIndex} is blocked even after account attestation`,async()=>{
 const h=harness(),external=externalStub(h);h.c.DIRECT=external.ids[providerIndex];h.c.dispatched=[];
 await assert.rejects(h.run("modelRequest(DIRECT,[],{onDispatch:()=>dispatched.push(true)})"),/строгом бесплатном|strict-free/);
 assert.equal(external.calls.length,0);assert.equal(h.calls.length,0);assert.equal(h.c.dispatched.length,0);
});
test('forged zero prices cannot turn a known direct adapter into verified free dispatch',async()=>{
 const h=harness(),external=externalStub(h,{pricing:{prompt:'0',completion:'0'},billingVerification:'verified'});h.c.DIRECT=external.ids[0];
 await assert.rejects(h.run('modelRequest(DIRECT,[])'),/недоступен|unavailable/);assert.equal(external.calls.length,0);assert.equal(h.calls.length,0);
});
test('blocked direct request stops later queued reviewers rather than falling back to another provider',async()=>{
 const h=harness(),external=externalStub(h);h.c.DIRECT=external.ids[0];const result=await h.run("Promise.allSettled([modelRequest(DIRECT,[]),modelRequest('vendor/one:free',[])])");
 assert.ok(result.every(x=>x.status==='rejected'));assert.equal(h.calls.length,0);assert.equal(external.calls.length,0);
});
test('OpenRouter quota halt also prevents queued direct generation',async()=>{
 const h=harness(()=>({ok:false,status:429,json:async()=>({error:{code:500}})})),external=externalStub(h);h.c.DIRECT=external.ids[0];
 await h.run("Promise.allSettled([modelRequest('vendor/one:free',[]),modelRequest(DIRECT,[])])");assert.equal(h.calls.length,1);assert.equal(external.calls.length,0);
});
test('real connected and attested adapter remains blocked by Council without any direct POST',async()=>{
 const h=harness();let directPosts=0;const original=h.c.fetch;
 h.c.fetch=async(url,options)=>{if(url.startsWith('https://generativelanguage.googleapis.com/')){if(options.method==='POST')directPosts++;return {ok:true,status:200,json:async()=>({name:'models/gemini-3.8-flash'})};}return original(url,options);};
 vm.runInContext(source('external-providers.js'),h.c);
 await h.run("AICouncilExternalProviders.init({getRemember:()=>false,refresh:async()=>{},error:()=>{},lang:()=> 'en'});el('geminiDirectKey').value='fixture-only-key';el('geminiFreeConfirm').checked=true;el('geminiDirectConnect').onclick()");
 assert.equal(h.c.AICouncilExternalProviders.valid('gemini'),true);
 await assert.rejects(h.run('modelRequest(AICouncilExternalProviders.ids[0],[])'),/недоступен|unavailable/);assert.equal(directPosts,0);assert.equal(h.calls.length,0);
});
test('new browser credentials remain session-only unless Remember was explicitly saved',()=>{
 const h=harness();assert.equal(h.run('state.remember'),false);
});
test('OpenRouter response evidence records actual model and verified reported zero cost',async()=>{
 const h=harness();h.c.evidence=[];await h.run("modelRequest('vendor/one:free',[],{onResponseEvidence:e=>evidence.push(e)})");assert.equal(h.c.evidence[0].provider,'openrouter');assert.equal(h.c.evidence[0].reported_model,'vendor/one-v1');assert.equal(h.c.evidence[0].reported_cost,0);assert.equal(h.c.evidence[0].reported_zero_cost_verified,true);
});
