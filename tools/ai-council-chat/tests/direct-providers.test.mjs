import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
const moduleText=readFileSync(join(dirname(fileURLToPath(import.meta.url)),'..','external-providers.js'),'utf-8');
function store(){const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}}
function harness(){
 const sessionStorage=store(),localStorage=store(),els=new Map(),requests=[];
 for(const p of ['gemini','mistral','nvidia'])for(const suffix of ['DirectKey','FreeConfirm','DirectStatus','DirectDisconnect','DirectConnect']){
   els.set(p+suffix,{value:'',checked:false,disabled:false,textContent:'',onclick:null});
 }
 const document={getElementById:x=>els.get(x)};
 const fetch=async(url,opts)=>{
  requests.push({url,opts});
  if(url.endsWith('models/gemini-3.8-flash'))return {ok:true,json:async()=>({name:'models/gemini-3.8-flash'})};
  if(url.endsWith('/models'))return {ok:true,json:async()=>({data:[{id:'mistral-small-2603'}]})};
  if(url.includes('generateContent'))return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:'Gemini analysis: concrete findings and acceptance tests'}]}}]})};
  if(url.includes('chat/completions'))return {ok:true,json:async()=>({choices:[{message:{content:'Review: exact URLs and tests'}}]})};
  return {ok:false,status:404,json:async()=>({})};
 };
 const globalThis={};
 const factory=new Function('globalThis','document','localStorage','sessionStorage','fetch','AbortController','setTimeout','clearTimeout',moduleText+';return globalThis.AICouncilExternalProviders;');
 const api=factory(globalThis,document,localStorage,sessionStorage,fetch,AbortController,setTimeout,clearTimeout);
 let refreshed=0;let errors=[];
 api.init({getRemember:()=>true,refresh:async()=>{refreshed++},error:msg=>errors.push(msg),lang:()=> 'ru'});
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
 assert.match(msg,/Review: exact URLs/);
 assert.equal(h.requests.at(-1).url,'https://api.mistral.ai/v1/chat/completions');
 await h.els.get('mistralDirectDisconnect').onclick();assert.equal(h.api.models().length,0);
});

test('NVIDIA NIM DeepSeek provider only appears after explicit trial affirmation and model challenge',async()=>{
 const h=harness();
 h.els.get('nvidiaDirectKey').value='nvapi-test';
 await h.els.get('nvidiaDirectConnect').onclick();
 assert.equal(h.api.models().length,0,'NVIDIA trial must not silently activate');
 h.els.get('nvidiaFreeConfirm').checked=true;
 await h.els.get('nvidiaDirectConnect').onclick();
 assert.equal(h.api.models().length,1);
 assert.equal(h.api.models()[0].id,'nvidia-direct/deepseek-v4.1-flash:trial');
 assert.ok(h.requests.some(r=>r.url==='https://integrate.api.nvidia.com/v1/chat/completions'));
 const answer=await h.api.call('nvidia-direct/deepseek-v4.1-flash:trial',[{role:'system',content:'Critique independently'},{role:'user',content:'Audit Holistic House from verified public URL evidence'}],{maxTokens:1500});
 assert.match(answer,/Review: exact URLs/);
 const req=h.requests.at(-1);
 assert.equal(req.url,'https://integrate.api.nvidia.com/v1/chat/completions');
 assert.equal(req.opts.headers.Authorization,'Bearer nvapi-test');
 assert.match(req.opts.body,/deepseek-ai\/deepseek-v4.1-flash/);
 await h.els.get('nvidiaDirectDisconnect').onclick();
 assert.equal(h.api.models().length,0);
 assert.equal(h.localStorage.getItem('ai-council-nvidia-nim-key'),null);
});
