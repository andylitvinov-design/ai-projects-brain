import test from 'node:test';
import assert from 'node:assert/strict';
import {POST,GET} from '../api/nvidia-chat.js';
const ORIGIN='https://ai-council-chat.vercel.app';
const MODEL='deepseek-ai/deepseek-v4.1-flash';
function makeRequest(body,origin=ORIGIN){return new Request(ORIGIN+'/api/nvidia-chat',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
function validBody(overrides={}){return {consent:true,apiKey:'nvapi-1234567890abcdef',model:MODEL,messages:[{role:'user',content:'Report concrete issues'}],max_tokens:256,...overrides};}
test('Readiness GET discloses key transit and no persistence',async()=>{
 const res=await GET(),d=await res.json();
 assert.equal(res.status,200);assert.match(d.notice,/server transiently/);
});
test('Proxy blocks cross-site callers before reading any key',async()=>{
 const original=globalThis.fetch;let calls=0;globalThis.fetch=()=>{calls++};
 try{
  const r=await POST(makeRequest(validBody(),'https://evil.example'));assert.equal(r.status,403);assert.equal(calls,0);
 }finally{globalThis.fetch=original;}
});
test('Proxy enforces consent, NVIDIA-only model and key format',async()=>{
 const testCases=[
  [{...validBody(),consent:false},403],
  [validBody({model:'meta/muse-wonder'}),400],
  [validBody({apiKey:'sk-or-test'}),400],
  [validBody({messages:[{role:'tool',content:'bad'}]}),400]
 ];
 for(const [b,status] of testCases){const r=await POST(makeRequest(b));assert.equal(r.status,status);}
});
test('Valid opted-in request is strictly forwarded to fixed NVIDIA model; response contains no key',async()=>{
 const orig=globalThis.fetch;let target,body,headers;
 globalThis.fetch=async (url,opt)=>{
  target=url;body=JSON.parse(opt.body);headers=opt.headers;
  return Response.json({choices:[{message:{content:'Review: fix CTA on /en/services.'},finish_reason:'stop'}]});
 };
 try{
  const r=await POST(makeRequest(validBody()));const v=await r.json();
  assert.equal(r.status,200);
  assert.equal(target,'https://integrate.api.nvidia.com/v1/chat/completions');
  assert.equal(headers.Authorization,'Bearer nvapi-1234567890abcdef');
  assert.equal(body.model,MODEL);
  assert.equal(body.stream,false);
  assert.match(v.choices[0].message.content,/CTA/);
  assert.equal(JSON.stringify(v).includes('nvapi-'),false);
  assert.match(r.headers.get('Cache-Control'),/no-store/);
 }finally{globalThis.fetch=orig;}
});
test('Provider rejects invalid key cleanly; no raw provider error/key is disclosed',async()=>{
 const orig=globalThis.fetch;
 globalThis.fetch=async()=>Response.json({error:{message:'private key nvapi-1234567890abcdef is invalid'}},{status:401});
 try{
  const r=await POST(makeRequest(validBody()));const v=await r.json();
  assert.equal(r.status,401);
  assert.match(v.error,/отклонила ключ/);
  assert.equal(JSON.stringify(v).includes('nvapi-'),false);
 }finally{globalThis.fetch=orig;}
});


test('An empty NVIDIA completion is an upstream error, never a verified dummy answer',async()=>{
 const old=globalThis.fetch;
 globalThis.fetch=async()=>Response.json({choices:[{message:{content:''},finish_reason:'length'}]});
 try{
  const r=await POST(makeRequest(validBody()));
  const value=await r.json();
  assert.equal(r.status,502);
  assert.match(value.error,/no textual completion/);
  assert.equal(value.choices,undefined);
  assert.equal(JSON.stringify(value).includes('nvapi-'),false);
 }finally{globalThis.fetch=old;}
});
