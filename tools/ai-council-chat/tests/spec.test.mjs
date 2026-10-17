import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here=dirname(fileURLToPath(import.meta.url));
const src=readFileSync(join(here,'..','spec.js'),'utf8');
class FakeElement {
  constructor(tag,ids){this.tag=tag;this.ids=ids;this.children=[];this.textContent='';this.value='';this.className='';this.style={};this.dataset={};this.open=false;this.classList={toggle() {}};}
  set id(id){this._id=id;this.ids.set(id,this)}
  get id(){return this._id}
  append(...args){this.children.push(...args)}
  setAttribute(key,value){this[key]=value}
  addEventListener(type,fn){this['on'+type]=fn}
  showModal(){this.open=true}
  close(){this.open=false}
  focus(){this.focused=true}
  select(){this.selected=true}
  setSelectionRange(a,b){this.range=[a,b]}
  click(){return this.onclick?.()}
  remove(){}
}
function harness(){
  const ids=new Map(),document={body:new FakeElement('body',ids),getElementById:id=>ids.get(id),createElement:tag=>new FakeElement(tag,ids)};
  const state={lang:'ru',models:['ux','strategy','tech','free-synth']};
  let persisted=0,requested=0,clipboardText='';
  const navigator={clipboard:{writeText:async value=>{clipboardText=value}}};
  const freeModels=[{id:'free-synth'}];
  const response='# Подробное техническое задание\n\n## 1. Цель и аудитория\n'+'Detailed scope. '.repeat(45)+
    '\n## 2. Факты\nConfirmed HTML.\n## 3. Приоритетные задачи\n### T-01 — Заголовок\nURL: https://holistichouse.vercel.app/en/services\nКритерии проверки: ровно один H1.\n'+
    '\n### T-02 — Кнопка заявки\nURL: https://holistichouse.vercel.app/ru/services\nКритерии проверки: кнопка ведёт в форму.\n'+
    'Риски, конкретные изменения, тестирование. '.repeat(70);
  const func=new Function('globalThis','state','document','navigator','key','freeModels','persist','loadModels','modelRequest','renderMessages','openSettings','setTimeout',src+';return globalThis.AICouncilSpec;');
  const core=func({AICouncilReviewHealth:{ready:r=>r.answers.filter(a=>a.status==='ok').length>=2}},state,document,navigator,'test-user-key',freeModels,()=>{persisted++;},async()=>{},async()=>{requested++;return response},()=>{},()=>{},setTimeout);
  const round={question:'Проверка услуг Holistic House',answers:[{status:'ok',model:'UX Expert',text:'Observed H1 issue at /en/services and exact route https://holistichouse.vercel.app/en/services.'},{status:'ok',model:'Technical Reviewer',text:'Examine canonical and locales; do not assume broken forms.'}],synthesis:'Prioritize H1 and forms.',evidenceAppendix:'Multiple H1: https://holistichouse.vercel.app/en/services',siteAudit:{summary:{html_pages_checked:54,discovered_public_pages:605,unreviewed_public_pages:551},pages:[{path:'/en/services',issues:['multiple_h1']}]}};
  return {core,ids,round,get saved(){return persisted},get requests(){return requested},get copied(){return clipboardText}};
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

test('incomplete audit opens its original sources without auto-spending a new synthesis call',async()=>{
 const h=harness();
 h.round.answers=[{status:'ok',model:'Gemini',text:'Page observations by one model'},
 {status:'error',model:'Mistral',error:'Rate limit exceeded'}];
 h.core.open(h.round);
 await new Promise(resolve=>setTimeout(resolve,0));
 assert.equal(h.requests,0,'single-model source should never trigger automatic paid/free model generation');
 assert.equal(h.round.tzVersion,undefined);
 assert.match(h.ids.get('specEditor').value,/Page observations by one model/);
 assert.match(h.ids.get('specStatus').textContent,/неполный аудит/);
});
