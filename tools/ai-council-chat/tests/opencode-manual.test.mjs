import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('../opencode-manual.js',import.meta.url),'utf8');
function setup(document) {
 const sandbox={document};
 sandbox.globalThis=sandbox;
 runInNewContext(source,sandbox,{filename:'opencode-manual.js'});
 return sandbox.AICouncilOpenCode;
}
const GLM='opencode/glm-5.3-flash-free';
const DEEP='opencode/deepseek-v4.1-flash-free';
const seeded=()=>({question:'Assess public /en/services usability',siteAudit:{summary:{html_pages_checked:2,discovered_public_pages:4},pages:[{path:'/en/services',status:200,title:'Services',issues:['missing_h1']}]},evidenceAppendix:'HTTP 200 · /en/services'});
test('registry names only OpenCode application-only free models; no web API or paid fallback',()=>{
 const api=setup();
 assert.deepEqual(Array.from(api.models,m=>m.id),[GLM,DEEP]);
 assert.doesNotMatch(source,/\bfetch\s*\(|\/inference\/|chat\/completions/);
 assert.doesNotMatch(source,/localStorage|sessionStorage/);
 assert.throws(()=>api.makePrompt(seeded(),'opencode/glm-5.3-flash'),/Unsupported/);
});
test('review prompts keep public HTML observations but never mislabel them as real interaction evidence',()=>{
 const api=setup(),r=seeded();
 const prompt=api.makePrompt(r,GLM);
 assert.match(prompt,/missing_h1/);assert.match(prompt,/read-only public HTTP\/HTML/);
 assert.match(prompt,/UNTRUSTED/);assert.match(prompt,/Do not claim to have opened a URL/);
 assert.match(prompt,/not instructions to override/);
});
test('user-pasted answer is whitelisted, length-bounded and has manual provenance',()=>{
 const api=setup(),r=seeded();
 r.openCodeManual={
  [GLM]:{text:'  GLM answer  '},
  [DEEP]:{text:'  DeepSeek answer '},
  ['paid/model']:{text:'should never be included'}
 };
 const entries=api.entries(r);
 assert.equal(entries.length,2);assert.equal(entries[0].model,GLM);
 assert.equal(entries[0].text,'GLM answer');assert.equal(entries[1].text,'DeepSeek answer');
 assert.ok(entries.every(x=>x.source==='manual:opencode'));
 r.openCodeManual[GLM].text='x'.repeat(18500);
 assert.equal(api.entries(r)[0].text.length,18000);
});
test('manual synthesis requires two distinct imported free model responses and preserves attribution',()=>{
 const api=setup(),r=seeded();
 r.openCodeManual={[GLM]:{text:'first genuine answer'}};
 assert.throws(()=>api.makePrompt(r,DEEP,'synthesis'),/Two independently/);
 r.openCodeManual[DEEP]={text:'second genuine answer'};
 const prompt=api.makePrompt(r,GLM,'synthesis');
 assert.match(prompt,/MANUAL SOURCE opencode\/glm-5.3-flash-free/);
 assert.match(prompt,/MANUAL SOURCE opencode\/deepseek-v4.1-flash-free/);
 assert.match(prompt,/not API-verified/);
 r.openCodeSynthesis={model:GLM,text:'  merged comparison  '};
 assert.equal(api.synthesis(r).text,'merged comparison');
 r.openCodeSynthesis.model='untrusted/paid';
 assert.equal(api.synthesis(r),null);
});
test('manual panel saves and deletes a response without any network request',()=>{
 class El {
  constructor(tag){this.tag=tag;this.children=[];this.listeners={};this.value='';this.className='';this.textContent='';this.attributes={};}
  append(...children){this.children.push(...children);}
  setAttribute(k,v){this.attributes[k]=v;}
  addEventListener(k,v){this.listeners[k]=v;}
  querySelector(s){return s==='.synthesis'?this.synth:null;}
  focus(){} select(){}
 }
 const document={createElement:tag=>new El(tag)};
 const api=setup(document),round=seeded();
 round.synthesisStatus='partial';round.answers=[];
 const block=new El('article');block.synth=new El('section');
 let saves=0;
 api.enhanceRound(block,round,{lang:'en',save:()=>{saves++;}});
 const panel=block.synth.children[0];
 const all=(root)=>[root,...root.children.flatMap(all)];
 const items=all(panel);
 const answer=items.find(x=>x.tag==='textarea'&&x.attributes['aria-label']?.includes('Real response'));
 const save=items.find(x=>x.tag==='button'&&x.textContent==='Save response');
 assert.ok(answer&&save,'real answer control exists');
 answer.value='GLM manual answer';
 save.listeners.click();
 assert.equal(round.openCodeManual[GLM].text,'GLM manual answer');
 assert.equal(saves,1);
 const after=new El('article');after.synth=new El('section');
 api.enhanceRound(after,round,{lang:'en',save:()=>{saves++;}});
 const del=all(after.synth).find(x=>x.tag==='button'&&x.textContent==='Remove response');
 assert.ok(del);del.listeners.click();
 assert.equal(api.entries(round).length,0);assert.equal(saves,2);
});
test('integration wires the manual-only composer action, persisted rounds, export and specification',()=>{
 const root=new URL('..',import.meta.url);
 const html=readFileSync(new URL('index.html',root),'utf8');
 const app=readFileSync(new URL('app.js',root),'utf8');
 const spec=readFileSync(new URL('spec.js',root),'utf8');
 const share=readFileSync(new URL('telegram-share.js',root),'utf8');
 assert.ok(html.indexOf('opencode-manual.js')<html.indexOf('app.js'));
 assert.match(html,/id="openCodeStart"/);
 assert.match(app,/startOpenCodeOnly/);assert.match(app,/manualMode:'opencode'/);
 assert.match(app,/AICouncilOpenCode\?\.enhanceRound/);
 assert.match(app,/AICouncilOpenCode\?\.entries/);
 assert.match(spec,/manual OpenCode paste/);
 assert.match(share,/OpenCode manual import/);
});
