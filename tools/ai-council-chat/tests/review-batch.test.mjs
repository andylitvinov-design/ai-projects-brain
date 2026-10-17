import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dirname=path.dirname(fileURLToPath(import.meta.url));
const code=fs.readFileSync(path.join(dirname,'..','review-batch.js'),'utf8');
function getModule(){
 const holder={};new Function('globalThis',code)(holder);return holder.AICouncilReviewBatch;
}
function data(){
 return [
  {model:'google-direct/gemini-3.8-flash:free-tier',status:'pending'},
  {model:'mistral-direct/mistral-small-2603:experiment',status:'pending'},
  {model:'mistral-direct/mistral-small-2603:experiment',status:'pending'}
 ];
}
const makeMessages=(a,i)=>[{role:'system',content:'Evaluate role '+(i+1)+' with evidenced URLs, acceptance checks, and hypotheses'},{role:'user',content:'Please review https://holistichouse.vercel.app/en/services for role '+(i+1)}];
test('same Mistral assigned to two roles results in exactly ONE Mistral network call',async()=>{
 const q=getModule(),ans=data(),calls=[],changes=[];
 const request=async(model,messages)=>{
  calls.push({model,messages});
  if(model.startsWith('google-direct/'))return 'Independent UX review: specific mobile CTA fixes from supplied HTML.';
  const combined=messages.at(-1).content;
  assert.match(combined,/TASK FOR <<<COUNCIL_ROLE_2>>>/);
  assert.match(combined,/TASK FOR <<<COUNCIL_ROLE_3>>>/);
  return '<<<COUNCIL_ROLE_2>>>\nProduct findings: /en/services lacks clear service comparison; test entry CTA on mobile, check copy and criteria.\n<<<COUNCIL_ROLE_3>>>\nEngineering findings: /en/services verify canonical and lang tags in HTML; test 390px and 1440px, no private assumptions.';
 };
 await q.run(ans,makeMessages,request,()=>changes.push(1),{maxTokens:2700,language:'ru'});
 assert.equal(calls.length,2,'one Google and one Mistral total');
 assert.equal(calls.filter(x=>x.model.includes('mistral')).length,1);
 assert.deepEqual(ans.map(a=>a.status),['ok','ok','ok']);
 assert.match(ans[1].text,/Product findings/);
 assert.match(ans[2].text,/Engineering findings/);
 assert.equal(ans[1].sharedRequest,true);
 assert.equal(ans[2].sharedRequest,true);
 assert.equal(ans[0].sharedRequest,undefined);
 assert.equal(changes.length,2);
});
test('Mistral 429 marks both shared roles failed, without retry/fallback',async()=>{
 const q=getModule(),ans=data();let mistralCalls=0,geminiCalls=0;
 await q.run(ans,makeMessages,async(model)=>{
  if(model.startsWith('mistral')){mistralCalls++;throw Error('Rate limit exceeded');}
  geminiCalls++;return 'Gemini response with checked URL.';
 },()=>{},{language:'ru'});
 assert.equal(mistralCalls,1);
 assert.equal(geminiCalls,1);
 assert.deepEqual(ans.map(a=>a.status),['ok','error','error']);
 assert.match(ans[1].error,/Rate limit exceeded/);
 assert.match(ans[2].error,/Rate limit exceeded/);
});
test('no separator means second role is transparently marked shared, not independently reviewed',async()=>{
 const q=getModule(),ans=data();
 await q.run(ans,makeMessages,async()=> 'One combined answer with evidence and a technical example but no structured split.',()=>{},{language:'ru'});
 assert.equal(ans[1].status,'ok');
 assert.equal(ans[2].status,'shared');
 assert.match(ans[2].text,/Независимого второго заключения нет/);
});
test('separate reviewers from different models still receive independent calls',async()=>{
 const q=getModule(),ans=[{model:'A',status:'pending'},{model:'B',status:'pending'},{model:'C',status:'pending'}];
 const seen=[];
 await q.run(ans,makeMessages,async(model,msg)=>{seen.push(model);return 'Result '+model},()=>{},{language:'en'});
 assert.equal(seen.length,3);
 assert.deepEqual(ans.map(a=>a.status),['ok','ok','ok']);
 assert.ok(ans.every(a=>!a.sharedRequest));
});
