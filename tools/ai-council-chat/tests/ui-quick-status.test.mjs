import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

const folder=join(dirname(fileURLToPath(import.meta.url)),'..');
const app=readFileSync(join(folder,'app.js'),'utf8');
const html=readFileSync(join(folder,'index.html'),'utf8');
const css=readFileSync(join(folder,'house-theme.css'),'utf8');
const recovery=readFileSync(join(folder,'recovery.js'),'utf8');
const manual=readFileSync(join(folder,'opencode-manual.js'),'utf8');
function part(from,to){
 const a=app.indexOf(from),b=app.indexOf(to,a);
 assert.ok(a>=0&&b>a,'missing a real app.js implementation: '+from);
 return app.slice(a,b);
}
const snapshot=new Function(part('function modelStatusSnapshot(','function renderModelStatus(')+';return modelStatusSnapshot;')();
const presets=new Function(part('const QUICK_PROMPTS=[','const ROLES=[')+';return QUICK_PROMPTS;')();
const runnerSource=part('function runQuickPrompt(','function setQuickButtonsBusy(');
function opts(overrides={}){
 return {modelId:'mistral-direct/mistral-small-2603:experiment',index:1,round:null,listed:true,registryLoaded:true,
   connected:true,hasOpenRouterKey:false,openRouterVerified:false,openRouterChecking:false,busy:false,lang:'ru',...overrides};
}
function harness(lang='ru',ready=true,busy=false){
 const field={value:'',style:{}},sent=[],errors=[],settings=[];
 const models=ready?[]:[];
 const run=new Function('QUICK_PROMPTS','state','el','setError','openSettings','globalThis','ask','busy','key',
   runnerSource+';return runQuickPrompt;')(
     presets,{lang},()=>field,(msg)=>errors.push(msg),()=>settings.push('opened'),
     {AICouncilExternalProviders:{models:()=>models}},()=>sent.push(field.value),busy,ready?'sk-or-user-key':'');
 return {run,field,sent,errors,settings};
}
test('status is evidence-based, not a generic works badge for a saved key',()=>{
 const status=snapshot(opts());
 assert.equal(status.tone,'connected');
 assert.match(status.label,/сохранён/);
 assert.doesNotMatch(status.label,/работает/i);
 const replied=snapshot(opts({round:{answers:[null,{model:opts().modelId,status:'ok',text:'Real model reply'}]}}));
 assert.equal(replied.tone,'ok');assert.match(replied.label,/Был ответ/);
 const rate=snapshot(opts({round:{answers:[null,{model:opts().modelId,status:'error',error:'429 Rate limit exceeded'}]}}));
 assert.equal(rate.tone,'rate');assert.match(rate.label,/прошлый раунд/);
});
test('no stale 429 or fabricated response when a different model is now selected',()=>{
 const s=snapshot(opts({round:{answers:[null,{model:'another-provider',status:'error',error:'429'}]}}));
 assert.equal(s.tone,'connected');
 const missing=snapshot(opts({connected:false}));
 assert.equal(missing.tone,'needs');
 const notFree=snapshot(opts({listed:false}));
 assert.equal(notFree.tone,'needs');
 const unverified=snapshot(opts({modelId:'nvidia/nemotron:free',connected:false,hasOpenRouterKey:true,openRouterVerified:false}));
 assert.equal(unverified.tone,'needs');
});
test('synthesis status reflects the real outcome and request limits',()=>{
 const model='google-direct/gemini-3.8-flash:free-tier';
 const base=opts({modelId:model,index:3,connected:true});
 assert.equal(snapshot({...base,round:{synthesisModel:model,synthesisStatus:'ok',synthesis:'Source-backed summary'}}).tone,'ok');
 assert.equal(snapshot({...base,round:{synthesisModel:model,synthesisStatus:'error',synthesisError:'429 quota exceeded'}}).tone,'rate');
 assert.equal(snapshot({...base,round:{synthesisModel:model,synthesisStatus:'partial',synthesis:''}}).tone,'pending');
});
test('one-tap Russian and English suggestions invoke exactly the existing send flow',()=>{
 const expected=['home','first','booking','mobile','spec','business'];
 assert.deepEqual(presets.map(x=>x.id),expected);
 for(const locale of ['ru','en']){
  const h=harness(locale);
  for(const p of presets){
   const before=h.sent.length;
   assert.equal(h.run(p.id),true);
   assert.equal(h.sent.length,before+1,'one click must run one normal send');
   assert.equal(h.sent.at(-1),p[locale],'prompt is localized');
  }
  assert.deepEqual(h.settings,[]);
 }
 assert.match(app,/void ask\(\);\s*\/\/ Same explicit send/);
 assert.match(app,/if\(busy\)return false;/);
});
test('no credentials means show settings and keep the suggestion for user consent',()=>{
 const h=harness('ru',false);
 assert.equal(h.run('home'),false);
 assert.equal(h.sent.length,0,'no automatic provider request without configured key');
 assert.deepEqual(h.settings,['opened']);
 assert.match(h.field.value,/улучшений/);
 assert.match(h.errors.join(' '),/подключите/);
 const another=harness('en',true,true);
 assert.equal(another.run('mobile'),false);
 assert.equal(another.sent.length,0,'busy guard prevents duplicate requests');
 assert.equal(another.run('unknown'),false);
});
test('every suggestion is a real button in persistent composer, and welcome cards also send',()=>{
 const buttons=[...html.matchAll(/<button\b[^>]*class="quick-prompt"[^>]*data-quick-id="([^"]+)"/g)].map(x=>x[1]);
 assert.deepEqual(buttons,['home','first','booking','mobile','spec']);
 const examples=[...html.matchAll(/class="example" data-quick-id="([^"]+)"/g)].map(x=>x[1]);
 assert.deepEqual(examples,['home','business','mobile']);
 assert.ok(html.includes('id="modelStatusPanel"'));
 assert.ok(html.includes('id="modelStatusGrid"'));
 assert.ok(html.includes('id="modelMiniRoles"'));
 assert.ok(app.includes("document.querySelectorAll('[data-quick-id]').forEach(b=>{b.onclick=()=>runQuickPrompt(b.dataset.quickId);});"));
 assert.ok(app.includes("renderMessages();renderConnection();renderModelStatus();"));
 assert.match(css,/\.quick-prompts-scroll\{[^}]*overflow-x:auto/);
 assert.match(css,/@media\(max-width:350px\)/);
});
test('direct-provider 429 is shown by model roles, never as a second large sticky footer banner',()=>{
 assert.match(recovery,/footer\.classList\.toggle\('hidden',!r\|\|kind!=='openrouter'\)/);
 assert.match(recovery,/footer&&kind==='openrouter'/);
 assert.match(manual,/OpenCode · ручной режим, не API/);
 assert.match(manual,/Автоматического запроса нет/);
 assert.doesNotMatch(manual,/\bfetch\s*\(/);
});
