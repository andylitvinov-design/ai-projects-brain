import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
const moduleText=readFileSync(join(dirname(fileURLToPath(import.meta.url)),'..','external-providers.js'),'utf-8');
function store(){const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}}
function harness({remember=true,responder=null,sessionEntries={},localEntries={},lang='ru'}={}){
 const sessionStorage=store(),localStorage=store(),els=new Map(),requests=[];
 for(const [key,value] of Object.entries(sessionEntries))sessionStorage.setItem(key,value);
 for(const [key,value] of Object.entries(localEntries))localStorage.setItem(key,value);
 for(const p of ['gemini','mistral'])for(const suffix of ['DirectKey','FreeConfirm','DirectStatus','DirectDisconnect','DirectConnect']){
   els.set(p+suffix,{value:'',checked:false,disabled:false,textContent:'',onclick:null,onchange:null,oninput:null});
 }
 const document={getElementById:x=>els.get(x)};
 const fetch=async(url,opts)=>{
  requests.push({url,opts});
  if(responder){const response=await responder(url,opts,requests);if(response!==undefined)return response;}
  if(url.endsWith('models/gemini-3.8-flash'))return {ok:true,json:async()=>({name:'models/gemini-3.8-flash'})};
  if(url.endsWith('/models'))return {ok:true,json:async()=>({data:[{id:'mistral-small-2603'}]})};
  if(url.includes('generateContent'))return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:'Gemini analysis: concrete findings and acceptance tests'}]}}]})};
  if(url.includes('chat/completions'))return {ok:true,json:async()=>({choices:[{message:{content:'Mistral technical review: exact URLs and tests'}}]})};
  return {ok:false,status:404,json:async()=>({})};
 };
 const globalThis={};
 const factory=new Function('globalThis','document','localStorage','sessionStorage','fetch','AbortController','setTimeout','clearTimeout',moduleText+';return globalThis.AICouncilExternalProviders;');
 const api=factory(globalThis,document,localStorage,sessionStorage,fetch,AbortController,setTimeout,clearTimeout);
 let refreshed=0;let errors=[];
 api.init({getRemember:()=>remember,refresh:async()=>{refreshed++},error:msg=>errors.push(msg),lang:()=>lang});
 return {api,sessionStorage,localStorage,els,requests,get refreshed(){return refreshed},errors};
}
test('only explicitly connected and free-tier-confirmed provider models appear',async()=>{
 const h=harness();
 assert.equal(h.api.models().length,0);
 h.els.get('geminiDirectKey').value='test-key-123';
 await h.els.get('geminiDirectConnect').onclick();
 assert.equal(h.api.models().length,0,'missing free-tier confirmation must prevent connection');
 assert.ok(h.errors.length>=1);
 h.els.get('geminiFreeConfirm').checked=true;
 await h.els.get('geminiDirectConnect').onclick();
 assert.equal(h.api.models().length,1);
 assert.equal(h.api.models()[0].id,'google-direct/gemini-3.8-flash:free-tier');
 assert.ok(h.api.ids.every(id=>!/muse|argon|large/i.test(id)),'paid Muse/Gemini 4 Argon are never selectable');
});
test('direct Gemini uses user key with official Google API, never OpenRouter or AI Council proxy',async()=>{
 const h=harness();
 h.els.get('geminiDirectKey').value='test-key';h.els.get('geminiFreeConfirm').checked=true;await h.els.get('geminiDirectConnect').onclick();
 const answer=await h.api.call('google-direct/gemini-3.8-flash:free-tier',[{role:'system',content:'Find evidence'},{role:'user',content:'Review https://holistichouse.vercel.app/en/services'}],{maxTokens:1500});
 assert.match(answer,/Gemini analysis/);
 const req=h.requests.at(-1);assert.equal(req.url,'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent');
 assert.equal(req.opts.headers['x-goog-api-key'],'test-key');assert.match(req.opts.body,/Review/);
 await h.els.get('geminiDirectDisconnect').onclick();
 assert.equal(h.api.models().length,0);assert.equal(h.localStorage.getItem('ai-council-gemini-key'),null);
});
test('direct Mistral is gated by free-tier affirmation and uses Mistral API only',async()=>{
 const h=harness();h.els.get('mistralDirectKey').value='mistral-key';h.els.get('mistralFreeConfirm').checked=true;await h.els.get('mistralDirectConnect').onclick();
 assert.equal(h.api.models()[0].id,'mistral-direct/mistral-small-2603:experiment');
 const msg=await h.api.call('mistral-direct/mistral-small-2603:experiment',[{role:'system',content:'Be specific'},{role:'user',content:'Fix /en/services'}]);
 assert.match(msg,/Mistral technical review/);
 assert.equal(h.requests.at(-1).url,'https://api.mistral.ai/v1/chat/completions');
 await h.els.get('mistralDirectDisconnect').onclick();assert.equal(h.api.models().length,0);
});

const GEMINI='google-direct/gemini-3.8-flash:free-tier';
const MISTRAL='mistral-direct/mistral-small-2603:experiment';
const messages=[{role:'user',content:'Use only public website evidence.'}];
const json=(body,status=200,headers={})=>({ok:status>=200&&status<300,status,headers:{get:name=>headers[name.toLowerCase()]??null},json:async()=>body});
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};
async function connect(h,p='gemini',key='test-key'){
 h.els.get(p+'DirectKey').value=key;h.els.get(p+'FreeConfirm').checked=true;await h.els.get(p+'DirectConnect').onclick();
}
const posts=h=>h.requests.filter(request=>request.opts.method==='POST');

test('model eligibility never fabricates zero pricing or a billing verification',async()=>{
 const h=harness({lang:'en'});await connect(h);await connect(h,'mistral','other-test-key');
 for(const model of h.api.models()){
  assert.equal(Object.hasOwn(model,'pricing'),false);
  assert.equal(model.billingVerification,'unverified-account-attestation');
  assert.equal(model.freeProviderMode,'user-confirmed');
  assert.match(model.name,/billing unverified/i);
 }
});

test('unchecking attestation revokes eligibility synchronously before refresh',async()=>{
 const h=harness();await connect(h);const version=h.api.connectionVersion(GEMINI);
 h.els.get('geminiFreeConfirm').checked=false;
 const pending=h.els.get('geminiFreeConfirm').onchange();
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.api.models().length,0);
 assert.ok(h.api.connectionVersion(GEMINI)>version);
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-free-verified'),null);
 assert.equal(h.localStorage.getItem('ai-council-gemini-free-verified'),null);
 let dispatched=0;
 await assert.rejects(h.api.call(GEMINI,messages,{expectedConnectionVersion:version,onDispatch:()=>dispatched++}),{code:'provider_not_connected'});
 assert.equal(dispatched,0);assert.equal(posts(h).length,0);await pending;
});

test('render preserves a checked attestation while key verification is pending',async()=>{
 const gate=deferred(),h=harness({responder:(url)=>url.endsWith('models/gemini-3.8-flash')?gate.promise:undefined});
 h.els.get('geminiDirectKey').value='test-key';h.els.get('geminiFreeConfirm').checked=true;
 const pending=h.els.get('geminiDirectConnect').onclick();
 assert.equal(h.els.get('geminiFreeConfirm').checked,true);
 assert.equal(h.els.get('geminiDirectDisconnect').disabled,false);
 assert.equal(h.api.valid('gemini'),false);assert.match(h.els.get('geminiDirectStatus').textContent,/Проверяю/);
 gate.resolve(json({name:'models/gemini-3.8-flash'}));await pending;
 assert.equal(h.api.valid('gemini'),true);
});

for(const revoke of ['disconnect','uncheck'])test('late verification cannot undo '+revoke,async()=>{
 const gate=deferred(),h=harness({responder:(url)=>url.endsWith('models/gemini-3.8-flash')?gate.promise:undefined});
 h.els.get('geminiDirectKey').value='late-key';h.els.get('geminiFreeConfirm').checked=true;
 const pending=h.els.get('geminiDirectConnect').onclick(),signal=h.requests[0].opts.signal;
 if(revoke==='disconnect')await h.els.get('geminiDirectDisconnect').onclick();
 else{h.els.get('geminiFreeConfirm').checked=false;await h.els.get('geminiFreeConfirm').onchange();}
 const version=h.api.connectionVersion(GEMINI);
 assert.equal(signal.aborted,true);
 gate.resolve(json({name:'models/gemini-3.8-flash'}));await pending;
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.api.models().length,0);
 assert.equal(h.api.connectionVersion(GEMINI),version);
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),null);
 assert.equal(h.localStorage.getItem('ai-council-gemini-key'),null);
 assert.equal(h.els.get('geminiFreeConfirm').checked,false);
});

test('newer connect wins even when an older provider verification resolves last',async()=>{
 const first=deferred(),second=deferred();let count=0;
 const h=harness({responder:url=>url.endsWith('models/gemini-3.8-flash')?(++count===1?first.promise:second.promise):undefined});
 h.els.get('geminiDirectKey').value='old-key';h.els.get('geminiFreeConfirm').checked=true;
 const old=h.els.get('geminiDirectConnect').onclick();
 h.els.get('geminiDirectKey').value='new-key';h.els.get('geminiFreeConfirm').checked=true;
 const replacement=h.els.get('geminiDirectConnect').onclick();
 assert.equal(h.requests[0].opts.signal.aborted,true);
 second.resolve(json({name:'models/gemini-3.8-flash'}));await replacement;
 const version=h.api.connectionVersion(GEMINI);
 first.resolve(json({name:'models/gemini-3.8-flash'}));await old;
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),'new-key');
 assert.equal(h.localStorage.getItem('ai-council-gemini-key'),'new-key');
 assert.equal(h.api.connectionVersion(GEMINI),version);
 await h.api.call(GEMINI,messages);
 assert.equal(posts(h)[0].opts.headers['x-goog-api-key'],'new-key');
});

test('old failed verification cannot overwrite a newer successful connection status',async()=>{
 const first=deferred();let count=0;
 const h=harness({responder:url=>url.endsWith('models/gemini-3.8-flash')&&++count===1?first.promise:undefined});
 h.els.get('geminiDirectKey').value='old-key';h.els.get('geminiFreeConfirm').checked=true;
 const old=h.els.get('geminiDirectConnect').onclick();await connect(h,'gemini','new-key');
 const status=h.els.get('geminiDirectStatus').textContent;
 first.reject(new Error('old-key must never appear'));await old;
 assert.equal(h.els.get('geminiDirectStatus').textContent,status);assert.equal(h.api.valid('gemini'),true);
});

test('queued requests cannot silently migrate to a replacement key',async()=>{
 const h=harness();await connect(h);const version=h.api.connectionVersion(GEMINI);
 await connect(h,'gemini','replacement-key');let dispatched=0;
 await assert.rejects(h.api.call(GEMINI,messages,{expectedConnectionVersion:version,onDispatch:()=>dispatched++}),{code:'connection_changed'});
 assert.equal(dispatched,0);assert.equal(posts(h).length,0);
 await h.api.call(GEMINI,messages,{expectedConnectionVersion:h.api.connectionVersion(GEMINI),onDispatch:()=>dispatched++});
 assert.equal(dispatched,1);assert.equal(posts(h)[0].opts.headers['x-goog-api-key'],'replacement-key');
});

test('key input edits revoke prior consent and cancel a pending verification',async()=>{
 const h=harness();await connect(h);const old=h.api.connectionVersion(GEMINI);
 h.els.get('geminiDirectKey').value='replacement-key';await h.els.get('geminiDirectKey').oninput();
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.els.get('geminiFreeConfirm').checked,false);
 assert.ok(h.api.connectionVersion(GEMINI)>old);
 const count=h.requests.length;await h.els.get('geminiDirectConnect').onclick();assert.equal(h.requests.length,count);
});

test('remember off stores the key and its attestation only for this browser session',async()=>{
 const h=harness({remember:false});await connect(h);
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),'test-key');
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-free-verified'),'true');
 assert.equal(h.localStorage.getItem('ai-council-gemini-key'),null);
 assert.equal(h.localStorage.getItem('ai-council-gemini-free-verified'),null);
 const resumed=harness({remember:false,sessionEntries:{'ai-council-gemini-key':'test-key','ai-council-gemini-free-verified':'true'}});
 assert.equal(resumed.api.valid('gemini'),true);
});

test('stale local consent cannot attest a different session key',()=>{
 const h=harness({sessionEntries:{'ai-council-gemini-key':'session-key'},localEntries:{'ai-council-gemini-key':'old-key','ai-council-gemini-free-verified':'true'}});
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.els.get('geminiFreeConfirm').checked,false);
});

test('remember toggle clears persistent attestation together with the key',async()=>{
 const h=harness();await connect(h);h.api.syncRemember(false);
 assert.equal(h.localStorage.getItem('ai-council-gemini-key'),null);
 assert.equal(h.localStorage.getItem('ai-council-gemini-free-verified'),null);
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),'test-key');
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-free-verified'),'true');
 h.api.syncRemember(true);assert.equal(h.localStorage.getItem('ai-council-gemini-key'),'test-key');
});

for(const provider of ['gemini','mistral'])for(const status of [401,402,403,429])test(provider+' HTTP '+status+' overrides conflicting error-body status and never echoes secrets',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json({error:{code:400,message:'secret-key-should-not-appear'},message:'secret-key-should-not-appear'},status,{'retry-after':'17'}):undefined});
 await connect(h,provider);
 let dispatched=0;
 await assert.rejects(h.api.call(provider==='gemini'?GEMINI:MISTRAL,messages,{onDispatch:()=>dispatched++}),error=>{
  assert.equal(error.status,status);assert.equal(error.provider,provider);assert.equal(error.retryAfter,'17');
  assert.doesNotMatch(error.message,/secret-key|400/);return true;
 });
 assert.equal(dispatched,1);assert.equal(posts(h).length,1);
});

test('dispatch callback runs after eligibility checks and directly before the provider request',async()=>{
 const events=[],h=harness({responder:(_url,opts)=>{if(opts.method==='POST')events.push('fetch');}});
 await connect(h);await h.api.call(GEMINI,messages,{expectedConnectionVersion:h.api.connectionVersion(GEMINI),onDispatch:()=>events.push('dispatch')});
 assert.deepEqual(events,['dispatch','fetch']);
 await h.els.get('geminiDirectDisconnect').onclick();
 await assert.rejects(h.api.call(GEMINI,messages,{onDispatch:()=>events.push('incorrect dispatch')}));
 assert.deepEqual(events,['dispatch','fetch']);
});

test('synchronous revocation in dispatch callback still prevents provider fetch',async()=>{
 const h=harness();await connect(h);
 await assert.rejects(h.api.call(GEMINI,messages,{onDispatch:()=>{h.els.get('geminiDirectDisconnect').onclick();}}));
 assert.equal(posts(h).length,0);
});

test('Gemini emits only final text from the first candidate and bounds response evidence',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json({modelVersion:'gemini-3.8-flash-001',usageMetadata:{promptTokenCount:12,candidatesTokenCount:7,totalTokenCount:19,thoughtsTokenCount:2,prompt:'private content',cost:0},candidates:[{content:{parts:[{thought:true,text:'internal thoughts'},{text:'Final answer'},{text:{secret:'not text'}}]}},{content:{parts:[{text:'Different alternative'}]}}]}):undefined});
 await connect(h);let evidence;
 const answer=await h.api.call(GEMINI,messages,{onResponseEvidence:value=>{evidence=value;}});
 assert.equal(answer,'Final answer');
 assert.deepEqual(evidence,{provider:'gemini',requested_model:GEMINI,requested_provider_model:'gemini-3.8-flash',reported_model:'gemini-3.8-flash-001',reported_usage:{promptTokenCount:12,candidatesTokenCount:7,totalTokenCount:19,thoughtsTokenCount:2},billing_verified:false,model_identity_verified:false});
});

test('Mistral text chunks exclude thinking and response aliases do not fabricate identity proof',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json({model:'mistral-small-latest',usage:{prompt_tokens:4,completion_tokens:5,total_tokens:9,cost:0},choices:[{message:{content:[{type:'thinking',thinking:[{text:'private thoughts'}]},{type:'text',text:'First final'},{type:'text',text:'Second final'},{type:'text',text:12}]}}]}):undefined});
 await connect(h,'mistral');let evidence;
 assert.equal(await h.api.call(MISTRAL,messages,{onResponseEvidence:value=>{evidence=value;}}),'First final\nSecond final');
 assert.equal(evidence.reported_model,'mistral-small-latest');assert.equal(evidence.model_identity_verified,false);assert.equal(evidence.billing_verified,false);
 assert.deepEqual(evidence.reported_usage,{prompt_tokens:4,completion_tokens:5,total_tokens:9});
});

test('observed Mistral model aliases may establish catalog accessibility',async()=>{
 const h=harness({responder:url=>url.endsWith('/models')?json({data:[{id:'mistral-small-canonical',aliases:['mistral-small-2603']}] }):undefined});
 await connect(h,'mistral');assert.equal(h.api.valid('mistral'),true);
});

for(const body of [null,[],{}, {error:{code:429,message:'secret-key'}}, {candidates:[{content:{parts:'bad'}}]}, {candidates:[{content:{parts:[{thought:true,text:'reasoning only'}]}}]}])test('invalid or non-final Gemini response fails clearly: '+JSON.stringify(body),async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json(body):undefined});await connect(h);let evidence=false;
 await assert.rejects(h.api.call(GEMINI,messages,{onResponseEvidence:()=>{evidence=true;}}),error=>{
  assert.equal(error.provider,'gemini');assert.match(error.message,/Provider returned/);assert.doesNotMatch(error.message,/secret-key/);return true;
 });assert.equal(evidence,false);
});

test('invalid JSON is reported clearly without leaking a response body',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?{ok:true,status:200,json:async()=>{throw Error('raw secret-key');}}:undefined});await connect(h);
 await assert.rejects(h.api.call(GEMINI,messages),{code:'invalid_response',message:'Provider returned invalid JSON.'});
});

test('structured Mistral non-text content cannot become object string output',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json({choices:[{message:{content:{text:'not a valid content shape'}}}]}):undefined});await connect(h,'mistral');
 await assert.rejects(h.api.call(MISTRAL,messages),{code:'invalid_response'});
});

test('provider requests do not follow redirects or include browser cookies',async()=>{
 const h=harness();await connect(h);await connect(h,'mistral');await h.api.call(GEMINI,messages);await h.api.call(MISTRAL,messages);
 for(const {url,opts} of h.requests){assert.match(url,/^https:\/\/(generativelanguage\.googleapis\.com|api\.mistral\.ai)\//);assert.equal(opts.redirect,'error');assert.equal(opts.credentials,'omit');}
});


test('already revoked key edits do not repeatedly refresh the public catalog',async()=>{
 const h=harness();await connect(h);
 h.els.get('geminiDirectKey').value='r';await h.els.get('geminiDirectKey').oninput();const refreshed=h.refreshed,version=h.api.connectionVersion(GEMINI);
 for(const value of ['re','rep','replacement']){h.els.get('geminiDirectKey').value=value;await h.els.get('geminiDirectKey').oninput();}
 assert.equal(h.refreshed,refreshed);assert.equal(h.api.connectionVersion(GEMINI),version);assert.equal(h.api.valid('gemini'),false);
});

test('numeric terminal error in HTTP 200 envelope remains terminal and preserves transport status',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json({error:{code:429,message:'secret-key'}},200,{'retry-after':'29'}):undefined});await connect(h);
 await assert.rejects(h.api.call(GEMINI,messages),error=>{assert.equal(error.status,429);assert.equal(error.httpStatus,200);assert.equal(error.retryAfter,'29');assert.equal(error.provider,'gemini');return true;});
});

test('local version and eligibility failures are safety failures for the shared queue',async()=>{
 const h=harness();await connect(h);const version=h.api.connectionVersion(GEMINI);await connect(h,'gemini','new-key');
 await assert.rejects(h.api.call(GEMINI,messages,{expectedConnectionVersion:version}),{code:'connection_changed',safetyFailure:true});
 await h.els.get('geminiDirectDisconnect').onclick();await assert.rejects(h.api.call(GEMINI,messages),{code:'provider_not_connected',safetyFailure:true});assert.equal(posts(h).length,0);
});

test('response evidence omits credential-like identity and nonnumeric usage fields',async()=>{
 const h=harness({responder:(_url,opts)=>opts.method==='POST'?json({modelVersion:'test-key',usageMetadata:{promptTokenCount:'prompt text',candidatesTokenCount:-1,totalTokenCount:Infinity,cachedContentTokenCount:2},candidates:[{content:{parts:[{text:'Final'}]}}]}):undefined});
 await connect(h);let evidence;await h.api.call(GEMINI,messages,{onResponseEvidence:value=>{evidence=value;}});
 assert.equal(evidence.reported_model,null);assert.deepEqual(evidence.reported_usage,{cachedContentTokenCount:2});
 assert.doesNotMatch(JSON.stringify(evidence),/test-key|prompt text/);
});

test('last-moment local eligibility changes are rejected before dispatch notification',async()=>{
 const h=harness();await connect(h);let dispatched=0;
 const options={expectedConnectionVersion:h.api.connectionVersion(GEMINI),get maxTokens(){h.els.get('geminiDirectDisconnect').onclick();return 500;},onDispatch:()=>dispatched++};
 await assert.rejects(h.api.call(GEMINI,messages,options),{safetyFailure:true});
 assert.equal(dispatched,0);assert.equal(posts(h).length,0);
});

test('failed replacement cannot silently reuse the previous saved key',async()=>{
 let count=0;const h=harness({responder:url=>url.endsWith('models/gemini-3.8-flash')&&++count===2?json({error:{message:'replacement-key'}},401):undefined});
 await connect(h,'gemini','old-key');await connect(h,'gemini','replacement-key');
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),null);assert.equal(h.localStorage.getItem('ai-council-gemini-key'),null);
 assert.doesNotMatch(h.els.get('geminiDirectStatus').textContent,/replacement-key/);
 await assert.rejects(h.api.call(GEMINI,messages));assert.equal(posts(h).length,0);
});

test('editing a key during verification cancels the pending connection',async()=>{
 const gate=deferred(),h=harness({responder:url=>url.endsWith('models/gemini-3.8-flash')?gate.promise:undefined});
 h.els.get('geminiDirectKey').value='old-key';h.els.get('geminiFreeConfirm').checked=true;const pending=h.els.get('geminiDirectConnect').onclick();
 h.els.get('geminiDirectKey').value='replacement-key';await h.els.get('geminiDirectKey').oninput();assert.equal(h.requests[0].opts.signal.aborted,true);
 gate.resolve(json({name:'models/gemini-3.8-flash'}));await pending;
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.els.get('geminiDirectKey').value,'replacement-key');assert.equal(h.els.get('geminiFreeConfirm').checked,false);
});

test('attesting an edited replacement never re-enables the previous key before Connect',async()=>{
 const h=harness();await connect(h,'gemini','old-key');
 h.els.get('geminiDirectKey').value='replacement-key';await h.els.get('geminiDirectKey').oninput();
 h.els.get('geminiFreeConfirm').checked=true;await h.els.get('geminiFreeConfirm').onchange();
 assert.equal(h.api.valid('gemini'),false);assert.equal(h.api.models().length,0);
 assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),null);assert.equal(h.localStorage.getItem('ai-council-gemini-key'),null);
 let dispatched=0;await assert.rejects(h.api.call(GEMINI,messages,{onDispatch:()=>dispatched++}),{safetyFailure:true});assert.equal(dispatched,0);assert.equal(posts(h).length,0);
 await h.els.get('geminiDirectConnect').onclick();assert.equal(h.api.valid('gemini'),true);assert.equal(h.sessionStorage.getItem('ai-council-gemini-key'),'replacement-key');
});
