import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ids=['vendor/one:free','vendor/two:free','google/gemma-4-31b-it:free'];
const catalog=ids.map(id=>({id,name:id,pricing:{prompt:'0',completion:'0'}}));
// Minimal DOM contract double: exercises the actual shipped inline event handlers.
// This is not a substitute for real Safari layout/browser QA.
class Element{
 constructor(tag='div'){this.tagName=tag;this.value='';this.checked=false;this.disabled=false;this.textContent='';this.children=[];this.events={};this.attrs={};this.style={};this.classes=new Set();this.classList={toggle:(name,on)=>{if(on===undefined)on=!this.classes.has(name);if(on)this.classes.add(name);else this.classes.delete(name);},contains:name=>this.classes.has(name)};}
 append(...children){children.forEach(child=>child.parent=this);this.children.push(...children);}
 isVisible(){return !this.classes.has('hidden')&&(!this.parent||this.parent.isVisible());}
 replaceChildren(...children){this.children=[...children];}
 add(child){this.children.push(child);}
 setAttribute(k,v){this.attrs[k]=v;}
 addEventListener(event,fn){(this.events[event]??=[]).push(fn);}
 async emit(event){for(const fn of this.events[event]??[])await fn({target:this});}
 scrollIntoView(){} focus(){} select(){} click(){} remove(){}
}
async function setup({failId,failStatus=503,storageBlocked=false,embed=false}={}){
 const elements=Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>[m[1],new Element()]));
 // Parse the shipped HTML hierarchy, so hidden ancestors affect visibility.
 const stack=[];const voidTags=new Set(['input','meta','link','br','hr','img']);
 for(const match of html.split('<script>')[0].matchAll(/<(\/?)(([a-z][a-z0-9]*))\b([^>]*)>/gi)){
  const [,closing,tag,,attrs]=match;
  if(closing){if(stack.at(-1)?.tag===tag)stack.pop();continue;}
  const id=attrs.match(/\bid="([^"]+)"/)?.[1];const el=id?elements[id]:new Element(tag);
  el.classes=new Set((attrs.match(/\bclass="([^"]*)"/)?.[1]??'').split(/\s+/).filter(Boolean));
  el.parent=stack.at(-1)?.el;
  if(!voidTags.has(tag)&&!attrs.endsWith('/'))stack.push({tag,el});
 }
 const walk=el=>[el,...el.children.flatMap(walk)];
 const modelBoxes=()=>walk(elements.modelOptions).filter(el=>Object.hasOwn(el.attrs,'data-model'));
 const document={getElementById:id=>elements[id],createElement:t=>new Element(t),body:new Element(),querySelectorAll(q){return [...new Set(q.split(',').flatMap(sel=>sel.startsWith('#')?[elements[sel.slice(1)]].filter(Boolean):sel==='[data-model]:checked'?modelBoxes().filter(el=>el.checked):sel==='[data-model]'?modelBoxes():[]))];}};
 const calls=[],writes=[],saved={};
 const fetcher=async(url,opts={})=>{if(url.endsWith('/models'))return Response.json({data:catalog});const b=JSON.parse(opts.body);calls.push(b);if(b.model===failId)return Response.json({error:{code:failStatus}},{status:failStatus});return Response.json({model:b.model,usage:{cost:0},choices:[{message:{content:'Answer '+b.model}}]});};
 const parentWindow={sent:[],postMessage(message,origin){this.sent.push({message,origin});}};
 const fakeWindow={location:{search:embed?'?embed=agents-director':''},handlers:{},addEventListener(name,fn){(this.handlers[name]??=[]).push(fn);},postMessage(){}};
 fakeWindow.parent=embed?parentWindow:fakeWindow;
 const context=vm.createContext({document,window:fakeWindow,URLSearchParams,Option:class extends Element{constructor(t,v){super('option');this.textContent=t;this.value=v;}},fetch:fetcher,AbortController,AbortSignal,setTimeout,clearTimeout,Date,URL,Blob,navigator:{clipboard:{writeText:async()=>{}}},sessionStorage:{getItem(k){if(storageBlocked)throw Error('blocked');return saved[k]??null;},setItem(k,v){writes.push(k);saved[k]=v;},removeItem(k){delete saved[k];}}});
 vm.runInContext(script.replace(/\}\)\(\);\s*$/,"globalThis.ui={ask,addMuse,report,getState:()=>state,requestStatus,notifyDirector};})();"),context);
 await new Promise(r=>setImmediate(r));await new Promise(r=>setImmediate(r));
 elements.apiKey.value='mock-key';elements.question.value='Public question A';modelBoxes().slice(0,2).forEach(el=>el.checked=true);elements.consent.checked=true;
 return {elements,calls,writes,boxes:modelBoxes,ui:context.ui,window:fakeWindow,parentWindow};
}
test('actual UI flow sends two same-input answers and one attributed free synthesis',async()=>{
 const {elements,calls,ui,writes}=await setup();await ui.ask();assert.equal(calls.length,3);assert.equal(calls[0].messages[1].content,calls[1].messages[1].content);assert.equal(calls[2].model,ids[2]);assert.match(calls[2].messages[1].content,/vendor\/one:free/);assert.equal(ui.getState().busy,false);assert.equal(elements.question.disabled,false);assert.deepEqual(writes,[]);
});
test('global session counter persists across councils, optional synthesis off avoids extra calls',async()=>{
 const {elements,calls,ui}=await setup();elements.synthModel.value='';await ui.ask();assert.equal(calls.length,2);await ui.ask();assert.equal(calls.length,4);assert.equal(ui.requestStatus().totalCalls,4);assert.match(elements.callEstimate.textContent,/4/);
});
test('without consent or with one model UI never invokes inference',async()=>{
 const {elements,calls,ui,boxes}=await setup();elements.consent.checked=false;await ui.ask();assert.equal(calls.length,0);elements.consent.checked=true;boxes()[1].checked=false;await ui.ask();assert.equal(calls.length,0);
});
test('quota halt preserves independent results and skips synthesis/later council',async()=>{
 const {calls,ui}=await setup({failId:ids[0],failStatus:429});await ui.ask();assert.ok(ui.requestStatus().stopped);const count=calls.length;assert.ok(count<=2);await ui.ask();assert.equal(calls.length,count);assert.equal(ui.getState().responses.length,2);
});
test('manual Muse addition requires renewed consent, exported source remains manual',async()=>{
 const {elements,calls,ui}=await setup();await ui.ask();elements.museAnswer.value='Real pasted public Muse answer';await elements.museAnswer.emit('input');ui.addMuse();const previous=calls.length;await elements.resynth.emit('click');assert.equal(calls.length,previous);elements.consent.checked=true;await elements.resynth.emit('click');assert.equal(calls.length,previous+1);assert.match(calls.at(-1).messages[1].content,/manual:muse/);assert.match(ui.report(),/Личный Muse — вручную/);
});
test('edited question cannot resynthesize older question under new consent',async()=>{
 const {elements,calls,ui}=await setup();await ui.ask();elements.museAnswer.value='Pasted Muse';ui.addMuse();elements.question.value='Question B';elements.consent.checked=true;const previous=calls.length;await elements.resynth.emit('click');assert.equal(calls.length,previous);
});
test('synthesis Off blocks manual re-synthesis; provider failures remain explicit',async()=>{
 const {elements,calls,ui}=await setup({failId:ids[0]});await ui.ask();assert.equal(calls.length,2);assert.equal(ui.getState().responses[0].status,'error');elements.museAnswer.value='Pasted Muse';ui.addMuse();elements.synthModel.value='';elements.consent.checked=true;await elements.resynth.emit('click');assert.equal(calls.length,2);
});
test('storage unavailable does not break startup; export redacts credentials',async()=>{
 const synthetic='sk-'+'or-v1-should-not-export';const {elements,ui}=await setup({storageBlocked:true});elements.question.value='Public example '+synthetic;await ui.ask();assert.ok(!ui.report().includes(synthetic));assert.ok(ui.report().includes('[REDACTED]'));
});
test('manual-only Muse card and report need no key or model call',async()=>{
 const {elements,calls,ui}=await setup();elements.apiKey.value='';elements.museAnswer.value='Public manual answer';ui.addMuse();assert.equal(calls.length,0);assert.equal(ui.getState().question,'Public question A');assert.equal(ui.getState().muse,'Public manual answer');assert.match(ui.report(),/Public manual answer/);
});
test('enabling synthesis after Off summarizes existing answers with only one call',async()=>{
 const {elements,calls,ui}=await setup();elements.synthModel.value='';await ui.ask();elements.synthModel.value=ids[2];await elements.synthModel.emit('change');await elements.resynth.emit('click');assert.equal(calls.length,2);elements.consent.checked=true;await elements.resynth.emit('click');assert.equal(calls.length,3);
});
test('refreshing catalog preserves explicit synthesis Off and clears consent',async()=>{
 const {elements}=await setup();elements.synthModel.value='';await elements.refreshModels.emit('click');assert.equal(elements.synthModel.value,'');assert.equal(elements.consent.checked,false);
});

test('manual-only exports become visible through actual HTML ancestors, stale summary stays hidden',async()=>{
 const {elements,calls,ui}=await setup();
 assert.equal(elements.copyReport.isVisible(),false);assert.equal(elements.downloadReport.isVisible(),false);
 elements.apiKey.value='';elements.museAnswer.value='Synthetic UI fixture, not a generated model answer';ui.addMuse();
 assert.equal(elements.copyReport.isVisible(),true);assert.equal(elements.downloadReport.isVisible(),true);
 assert.equal(elements.summaryText.isVisible(),false);assert.equal(ui.getState().summary,'');assert.equal(calls.length,0);
 assert.match(ui.report(),/Synthetic UI fixture/);
});
test('adding Muse after a summary clears stale summary and leaves exports visible',async()=>{
 const {elements,ui,calls}=await setup();await ui.ask();assert.ok(ui.getState().summary);
 elements.museAnswer.value='Synthetic changed manual fixture';const before=calls.length;ui.addMuse();
 assert.equal(ui.getState().summary,'');assert.equal(elements.summaryText.isVisible(),false);
 assert.equal(elements.copyReport.isVisible(),true);assert.equal(calls.length,before);
});


const DIRECTOR_ORIGIN='https://holistic-house-pr-monitor.vercel.app';
const DIRECTOR_PROTOCOL='HH_AI_COUNCIL_BRIDGE_V1';
const PROMPT_ID='request-12345678-1234-1234';
test('embedded Council rejects untrusted origins and sources, then accepts only the Director parent prompt',async()=>{
 const {elements,window,parentWindow}=await setup({embed:true});
 const receive=window.handlers.message[0];
 const payload={protocol:DIRECTOR_PROTOCOL,type:'HH_AI_COUNCIL_SET_PROMPT_V1',requestId:PROMPT_ID,prompt:'Оцени новую функцию Commander.'};
 await receive({origin:'https://evil.example',source:parentWindow,data:payload});
 assert.equal(elements.question.value,'Public question A');
 await receive({origin:DIRECTOR_ORIGIN,source:{},data:payload});
 assert.equal(elements.question.value,'Public question A');
 await receive({origin:DIRECTOR_ORIGIN,source:parentWindow,data:{...payload,requestId:'bad'}});
 assert.equal(elements.question.value,'Public question A');
 await receive({origin:DIRECTOR_ORIGIN,source:parentWindow,data:payload});
 assert.equal(elements.question.value,payload.prompt);
 assert.equal(elements.context.value,'');
 assert.equal(elements.consent.checked,false);
 assert.equal(elements.directorSaveConsent.checked,false);
 assert.equal(parentWindow.sent.at(-1).origin,DIRECTOR_ORIGIN);
 assert.equal(parentWindow.sent.at(-1).message.type,'HH_AI_COUNCIL_PROMPT_READY_V1');
 assert.equal(parentWindow.sent.at(-1).message.requestId,PROMPT_ID);
});
test('embedded Council never sends a report to Director without explicit report-save consent',async()=>{
 const {elements,ui,window,parentWindow}=await setup({embed:true});
 const receive=window.handlers.message[0];
 await receive({origin:DIRECTOR_ORIGIN,source:parentWindow,data:{protocol:DIRECTOR_PROTOCOL,type:'HH_AI_COUNCIL_SET_PROMPT_V1',requestId:PROMPT_ID,prompt:'Оцени продукт публично.'}});
 elements.apiKey.value='mock-private-key';elements.consent.checked=true;
 await ui.ask();
 const sent=parentWindow.sent.map(x=>x.message);
 assert.ok(sent.some(x=>x.type==='HH_AI_COUNCIL_DONE_V1'));
 assert.ok(!sent.some(x=>x.type==='HH_AI_COUNCIL_RESULT_V1'));
 assert.ok(sent.every(x=>!JSON.stringify(x).includes('mock-private-key')));
});
test('embedded Council returns only a redacted report after separate opt-in and supports acknowledged delivery',async()=>{
 const {elements,calls,ui,window,parentWindow}=await setup({embed:true});
 const receive=window.handlers.message[0];
 await receive({origin:DIRECTOR_ORIGIN,source:parentWindow,data:{protocol:DIRECTOR_PROTOCOL,type:'HH_AI_COUNCIL_SET_PROMPT_V1',requestId:PROMPT_ID,prompt:'Проверь публичную страницу.'}});
 elements.apiKey.value='mock-private-key';elements.consent.checked=true;elements.directorSaveConsent.checked=true;
 await ui.ask();
 const result=parentWindow.sent.map(x=>x.message).find(x=>x.type==='HH_AI_COUNCIL_RESULT_V1');
 assert.ok(result);
 assert.equal(result.requestId,PROMPT_ID);
 assert.match(result.report,/Проверь публичную страницу/);
 assert.ok(!result.report.includes('mock-private-key'));
 assert.equal(result.report.length<=18000,true);
 await receive({origin:DIRECTOR_ORIGIN,source:parentWindow,data:{protocol:DIRECTOR_PROTOCOL,type:'HH_AI_COUNCIL_SAVE_FAILED_V1',requestId:PROMPT_ID}});
 assert.equal(elements.directorRetry.isVisible(),true);
 elements.directorRetry.events.click[0]();
 const retry=parentWindow.sent.map(x=>x.message).filter(x=>x.type==='HH_AI_COUNCIL_RESULT_V1');
 assert.equal(retry.length,2);
 await receive({origin:DIRECTOR_ORIGIN,source:parentWindow,data:{protocol:DIRECTOR_PROTOCOL,type:'HH_AI_COUNCIL_SAVE_ACK_V1',requestId:PROMPT_ID}});
 assert.equal(elements.directorRetry.isVisible(),false);
 assert.ok(!ui.report().includes('mock-private-key'));
 assert.ok(calls.length>=2);
});
