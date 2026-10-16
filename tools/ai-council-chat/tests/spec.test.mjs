import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here=dirname(fileURLToPath(import.meta.url));
const src=readFileSync(join(here,'..','spec.js'),'utf8');
class FakeElement {
  constructor(tag,ids){this.tag=tag;this.ids=ids;this.children=[];this.textContent='';this.value='';this.className='';this.style={};this.dataset={};this.open=false;const classes=new Set();this.classList={toggle(name,on){if(on)classes.add(name);else classes.delete(name);},contains:name=>classes.has(name)};}
  set id(id){this._id=id;this.ids.set(id,this)}
  get id(){return this._id}
  append(...args){this.children.push(...args)}
  setAttribute(key,value){this[key]=value}
  addEventListener(type,fn){this['on'+type]=fn}
  showModal(){this.open=true}
  close(){if(this.open){this.open=false;this.onclose?.();}}
  focus(){this.focused=true}
  select(){this.selected=true}
  setSelectionRange(a,b){this.range=[a,b]}
  click(){if(!this.disabled)return this.onclick?.()}
  remove(){}
}
function deferred(){let resolve,reject;const promise=new Promise((res,rej)=>{resolve=res;reject=rej;});return {promise,resolve,reject};}
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));
function harness(options={}){
  const ids=new Map(),document={body:new FakeElement('body',ids),getElementById:id=>ids.get(id),createElement:tag=>new FakeElement(tag,ids)};
  const state={lang:'ru',models:['ux','strategy','tech','free-synth']};
  let persisted=0,requested=0,clipboardText='',rendered=0;const downloads=[],snapshots=[],prompts=[];
  const navigator={clipboard:{writeText:async value=>{clipboardText=value}},...options.navigator};
  if(options.execCommand)document.execCommand=options.execCommand;
  const URL={createObjectURL(blob){downloads.push(blob);return 'blob:test';},revokeObjectURL(){}};
  const freeModels=[{id:'free-synth'}];
  const response='# Подробное техническое задание\n\n## 1. Цель и аудитория\n'+'Detailed scope. '.repeat(45)+
    '\n## 2. Факты\nConfirmed HTML.\n## 3. Приоритетные задачи\n### T-01 — Заголовок\nURL: https://holistichouse.vercel.app/en/services\nКритерии проверки: ровно один H1.\n'+
    '\n### T-02 — Кнопка заявки\nURL: https://holistichouse.vercel.app/ru/services\nКритерии проверки: кнопка ведёт в форму.\n'+
    'Риски, конкретные изменения, тестирование. '.repeat(70);
  const func=new Function('globalThis','state','document','navigator','key','freeModels','persist','loadModels','modelRequest','renderMessages','openSettings','setTimeout','URL',src+';return globalThis.AICouncilSpec;');
  const core=func(options.globals||{},state,document,navigator,'test-user-key',freeModels,()=>{persisted++;snapshots.push(JSON.stringify(round));},options.loadModels||(async()=>{}),async(...args)=>{requested++;prompts.push(args);return options.modelRequest?options.modelRequest(...args):response},()=>{rendered++;},()=>{},()=>{},URL);
  const round={question:'Проверка услуг Holistic House',answers:[{status:'ok',model:'UX Expert',text:'Observed H1 issue at /en/services and exact route https://holistichouse.vercel.app/en/services.'},{status:'ok',model:'Technical Reviewer',text:'Examine canonical and locales; do not assume broken forms.'}],synthesis:'Prioritize H1 and forms.',evidenceAppendix:'Multiple H1: https://holistichouse.vercel.app/en/services',siteAudit:{summary:{html_pages_checked:54,discovered_public_pages:605,unreviewed_public_pages:551},pages:[{path:'/en/services',issues:['multiple_h1']}]}};
  return {core,ids,round,response,downloads,snapshots,prompts,edit(value){ids.get('specEditor').value=value;ids.get('specEditor').oninput();},get rendered(){return rendered},get saved(){return persisted},get requests(){return requested},get copied(){return clipboardText}};
}
test('source draft and AI input preserve both reviewers, exact evidence, and scan limits',()=>{
  const h=harness();const draft=h.core.sourceDraft(h.round),prompt=h.core.modelInput(h.round);
  assert.match(draft,/UX Expert/);assert.match(draft,/Technical Reviewer/);assert.match(draft,/551/);
  assert.match(prompt,/Observed H1 issue/);assert.match(prompt,/canonical and locales/);
  assert.match(prompt,/multiple_h1/);
  assert.match(h.core.withEvidence('# Draft',h.round),/Multiple H1/);
});
test('spec editor asynchronously generates detailed output, persists and copies full text',async()=>{
  const h=harness();h.core.open(h.round);
  await new Promise(resolve=>setTimeout(resolve,0));
  assert.equal(h.round.tzVersion,2);assert.equal(h.requests,1);assert.ok(h.saved>=1);
  assert.match(h.round.tz,/### T-01/);assert.match(h.round.tz,/Multiple H1/);
  await h.ids.get('specCopy').click();
  assert.equal(h.copied,h.round.tz);
  h.ids.get('specSelect').click();
  assert.deepEqual(h.ids.get('specEditor').range,[0,h.round.tz.length]);
  h.ids.get('specEditor').value+='\n### Третья задача — исправить';
  h.ids.get('specEditor').oninput();
  assert.match(h.round.tz,/Третья задача/);
  h.core.open(h.round);
  assert.equal(h.requests,1,'opening existing specification does not spend an extra API call');
});
test('weak, placeholder and truncated drafts are not marked good',()=>{
  const h=harness();
  assert.equal(h.core.assessDraft('# General improvements',h.round).weak,true);
  assert.equal(h.core.assessDraft('### T-01 test [OUTPUT LIMIT: truncated] '+('x'.repeat(2000)),h.round).weak,true);
});


test('pending generation preserves manual input and keeps its full output as an explicit proposal',async()=>{
  const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
  h.core.open(h.round);await flush();
  h.edit('My exact manual specification.');
  pending.resolve(h.response);await flush();
  assert.equal(h.round.tz,'My exact manual specification.');
  assert.equal(h.ids.get('specEditor').value,h.round.tz);
  assert.equal(h.round.tzProposal.text,h.core.withEvidence(h.response,h.round));
  assert.equal(h.ids.get('specProposal').hidden,false);
  assert.equal(h.ids.get('specProposalEditor').readOnly,true);
  assert.equal(h.ids.get('specProposalEditor').value,h.round.tzProposal.text);
  assert.equal(JSON.parse(h.snapshots.at(-1)).tzProposal.text,h.round.tzProposal.text,'proposal survives persistence');
  const proposed=h.round.tzProposal.text;
  h.ids.get('specApplyProposal').click();
  assert.equal(h.round.tz,proposed);
  assert.equal(h.ids.get('specEditor').value,proposed);
  assert.equal(h.round.tzProposal,undefined);
  assert.equal(h.ids.get('specProposal').hidden,true);
  assert.equal(h.round.tzVersion,2);
  await h.ids.get('specCopy').click();assert.equal(h.copied,proposed);
  assert.equal(h.requests,1,'applying a proposal makes no model request');
});

test('edit then revert, including identical-value input, still counts as a manual edit',async()=>{
  for(const values of [['Changed','Original'],['Original']]){
    const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
    h.round.tz='Original';h.round.tzVersion=2;h.core.open(h.round);
    const run=h.ids.get('specBuild').click();await flush();
    values.forEach(value=>h.edit(value));
    pending.resolve(h.response);await run;
    assert.equal(h.round.tz,'Original');
    assert.equal(h.ids.get('specEditor').value,'Original');
    assert.match(h.round.tzProposal.text,/### T-01/);
  }
});

test('edits during model discovery are protected from the later response',async()=>{
  const loading=deferred(),h=harness({loadModels:()=>loading.promise});
  h.core.open(h.round);
  h.edit('Edited while the model list was loading.');
  assert.equal(h.requests,0);
  loading.resolve();await flush();
  assert.equal(h.round.tz,'Edited while the model list was loading.');
  assert.match(h.round.tzProposal.text,/### T-01/);
  assert.match(h.prompts[0][1][1].content,/Edited while the model list was loading/);
});

test('switching rounds isolates pending output and keeps both rounds editable',async()=>{
  const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
  h.core.open(h.round);await flush();h.edit('First round manual text.');
  const second={question:'Other round',tz:'Other specification',tzVersion:2,answers:h.round.answers};
  h.core.open(second);h.edit('Second round manual text.');
  const secondStatus=h.ids.get('specStatus').textContent;
  assert.equal(h.ids.get('specBuild').disabled,true);
  pending.resolve(h.response);await flush();
  assert.equal(h.round.tz,'First round manual text.');
  assert.match(h.round.tzProposal.text,/### T-01/);
  assert.equal(second.tz,'Second round manual text.');
  assert.equal(second.tzProposal,undefined);
  assert.equal(h.ids.get('specEditor').value,second.tz);
  assert.equal(h.ids.get('specStatus').textContent,secondStatus);
  assert.equal(h.ids.get('specProposal').hidden,true);
  assert.equal(h.ids.get('specBuild').disabled,false);
  h.core.open(h.round);
  assert.equal(h.ids.get('specEditor').value,h.round.tz);
  assert.equal(h.ids.get('specProposalEditor').value,h.round.tzProposal.text);
  assert.equal(h.requests,1);
});

test('switching away and back keeps unedited late output separate and prevents automatic extra requests',async()=>{
  const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
  h.core.open(h.round);await flush();
  const original=h.ids.get('specEditor').value;
  h.core.open({tz:'Other text',tzVersion:2});h.core.open(h.round);
  pending.resolve(h.response);await flush();
  assert.equal(h.round.tz,undefined);
  assert.equal(h.ids.get('specEditor').value,original);
  assert.match(h.round.tzProposal.text,/### T-01/);
  h.core.open(h.round);await flush();
  assert.equal(h.requests,1,'reopening a proposal does not silently spend another request');
});

test('closing and reopening the editor protects manual text, including an intentionally empty document',async()=>{
  for(const closeBeforeCompletion of [true,false]){
    const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
    h.core.open(h.round);await flush();h.edit('');
    h.ids.get('specClose').click();
    if(closeBeforeCompletion)h.core.open(h.round);
    pending.resolve(h.response);await flush();
    if(!closeBeforeCompletion)h.core.open(h.round);
    assert.equal(h.round.tz,'');
    assert.equal(h.ids.get('specEditor').value,'');
    assert.match(h.round.tzProposal.text,/### T-01/);
    assert.equal(h.ids.get('specProposal').hidden,false);
    assert.equal(h.requests,1);
  }
});

test('a failed generation retains edits and the previous proposal and permits a retry',async()=>{
  const pending=deferred();let calls=0;
  const h=harness({modelRequest:()=>++calls===1?pending.promise:Promise.resolve('Replacement result')});
  h.round.tz='Original';h.round.tzVersion=2;
  h.round.tzProposal={text:'Previous proposal',quality:{weak:true},sourceModels:[],generatedAt:'earlier'};
  h.core.open(h.round);const run=h.ids.get('specBuild').click();await flush();
  h.edit('Manual changes survive errors.');pending.reject(Error('Test failure'));await run;
  assert.equal(h.round.tz,'Manual changes survive errors.');
  assert.equal(h.round.tzProposal.text,'Previous proposal');
  assert.equal(h.ids.get('specEditor').value,h.round.tz);
  assert.match(h.ids.get('specStatus').textContent,/Test failure/);
  assert.equal(h.ids.get('specBuild').disabled,false);
  await h.ids.get('specBuild').click();
  assert.match(h.round.tz,/Replacement result/);
  assert.equal(h.round.tzProposal,undefined);
  assert.equal(h.requests,2);
});

test('a stale error cannot replace the new round status or leak proposal contents',async()=>{
  const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
  h.core.open(h.round);await flush();
  const second={tz:'Another document',tzVersion:2};h.core.open(second);
  const currentStatus=h.ids.get('specStatus').textContent;
  pending.reject(Error('First round error'));await flush();
  assert.equal(h.ids.get('specStatus').textContent,currentStatus);
  assert.equal(h.ids.get('specEditor').value,second.tz);
  assert.equal(h.ids.get('specProposalEditor').value,'');
  assert.equal(h.ids.get('specBuild').disabled,false);
});

test('model discovery failures preserve the document and release the build button',async()=>{
  const loading=deferred(),h=harness({loadModels:()=>loading.promise});
  h.core.open(h.round);h.edit('Saved during discovery.');
  loading.reject(Error('Discovery unavailable'));await flush();
  assert.equal(h.requests,0);
  assert.equal(h.round.tz,'Saved during discovery.');
  assert.equal(h.ids.get('specEditor').value,h.round.tz);
  assert.match(h.ids.get('specStatus').textContent,/Discovery unavailable/);
  assert.equal(h.ids.get('specBuild').disabled,false);
});

test('manual downloads, shares, selection, and clipboard fallback use the current text',async()=>{
  const shared=[],h=harness({navigator:{share:async value=>shared.push(value),clipboard:{writeText:async()=>{throw Error('denied')}}}});
  h.round.tz='Original';h.round.tzVersion=2;h.core.open(h.round);h.edit('Edited text to export.');
  h.ids.get('specDownload').click();assert.equal(await h.downloads[0].text(),h.round.tz);
  await h.ids.get('specShare').click();assert.equal(shared[0].text,h.round.tz);
  await h.ids.get('specCopy').click();
  assert.deepEqual(h.ids.get('specEditor').range,[0,h.round.tz.length]);
  assert.match(h.ids.get('specStatus').textContent,/Автокопирование недоступно/);
  assert.equal(h.requests,0);
});

test('persisted proposals reopen without a model call and applying one during generation is protected',async()=>{
  const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
  h.core.open(h.round);await flush();h.edit('Keep my work.');
  pending.resolve(h.response);await flush();
  const next=deferred(),restored=harness({modelRequest:()=>next.promise});
  Object.assign(restored.round,JSON.parse(h.snapshots.at(-1)));
  restored.core.open(restored.round);await flush();
  assert.equal(restored.requests,0);
  const firstProposal=restored.round.tzProposal.text;
  assert.equal(restored.ids.get('specProposalEditor').value,firstProposal);
  const run=restored.ids.get('specBuild').click();await flush();
  restored.ids.get('specApplyProposal').click();
  next.resolve('A different model result');await run;
  assert.equal(restored.round.tz,firstProposal,'explicitly applied text survives an already pending generation');
  assert.equal(restored.ids.get('specEditor').value,firstProposal);
  assert.match(restored.round.tzProposal.text,/A different model result/);
});

test('an error after reopening the same round clears its loading status without changing edits',async()=>{
  const pending=deferred(),h=harness({modelRequest:()=>pending.promise});
  h.core.open(h.round);await flush();h.edit('Keep after reopening.');
  h.ids.get('specClose').click();h.core.open(h.round);
  pending.reject(Error('Reopened request failed'));await flush();
  assert.equal(h.round.tz,'Keep after reopening.');
  assert.equal(h.ids.get('specEditor').value,h.round.tz);
  assert.match(h.ids.get('specStatus').textContent,/Reopened request failed/);
  assert.equal(h.ids.get('specBuild').disabled,false);
});

test('direct-provider specification carries unverified billing evidence into standalone copy and download',async()=>{
 let h;const evidence={provider:'gemini',requested_model:'google-direct/fixture:free-tier',reported_model:'fixture-v1',billing_verified:false,model_identity_verified:false};
 h=harness({modelRequest:(_model,_messages,options)=>{options.onResponseEvidence(evidence);return h.response;}});
 h.core.open(h.round);await flush();assert.deepEqual(h.round.tzProviderEvidence,evidence);assert.match(h.round.tz,/стоимость аккаунта.*не проверены/);assert.match(h.round.tz,/fixture-v1/);
 await h.ids.get('specCopy').click();assert.equal(h.copied,h.round.tz);await h.ids.get('specDownload').click();assert.equal(await h.downloads.at(-1).text(),h.round.tz);
});

test('strict-free specification refuses a direct provider even if it appears in the available model list',async()=>{
 const h=harness({globals:{AICouncilExternalProviders:{ids:['free-synth']}}});h.core.open(h.round);await flush();assert.equal(h.requests,0);assert.equal(h.round.tz,undefined);assert.match(h.ids.get('specStatus').textContent,/бесплатный агрегатор/);
});
