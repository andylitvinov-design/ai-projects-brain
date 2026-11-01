import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const context=vm.createContext({});
vm.runInContext(source('safety.js'),context);
const safe=context.AICouncilSafety;
test('only explicitly zero-cost :free models qualify',()=>{
 const free={id:'provider/model:free',pricing:{prompt:'0',completion:0,image:'0',request:'0'}};
 assert.equal(safe.isFreeModel(free),true);
 for(const price of ['1','',null,false,'1e-999',0.1]){
   assert.equal(safe.isFreeModel({id:free.id,pricing:{prompt:'0',completion:price}}),false);
 }
 assert.equal(safe.isFreeModel({id:'provider/model:trial',pricing:free.pricing}),false);
 assert.equal(safe.isFreeModel({id:free.id,pricing:{prompt:'0'}}),false);
 assert.equal(safe.isFreeModel({id:free.id,pricing:{...free.pricing,request:'2'}}),false);
});
test('model and usage response must match selected catalog and cost',()=>{
 const chosen=safe.freeCatalog([{id:'provider/model:free',canonical_slug:'provider/model-v1',pricing:{prompt:'0',completion:'0'}},{id:'provider/model-v1',pricing:{prompt:'1',completion:'1'}}])[0];
 assert.equal(safe.responseIssue(chosen,{model:'provider/model-v1',usage:{cost:0}}),'');
 for(const bad of [
   {model:'paid/model',usage:{cost:0}},
   {model:chosen.id,usage:{}},
   {model:chosen.id,usage:{cost:1}},
   {model:chosen.id,usage:{cost:0,is_byok:true}},
   {model:chosen.id,usage:{cost:0,cost_details:{extra:0.5}}}
 ])assert.ok(safe.responseIssue(chosen,bad));
});
test('delivery path serializes review and denies paid fallback',()=>{
 const app=source('app.js'),html=source('index.html');
 assert.match(app,/councilRequestQueue\.then\(task,task\)/);
 assert.match(app,/await loadModels\(true\)/);
 assert.match(app,/provider:safety\.providerPolicy\(\)/);
 assert.match(app,/safety\.responseIssue\(record,out\)/);
 assert.match(app,/Direct Gemini, Mistral or NVIDIA billing is not verified zero/);
 assert.ok(html.indexOf('<script src="./safety.js" defer>')>0);
 assert.ok(html.indexOf('<script src="./safety.js" defer>')<html.indexOf('<script src="./app.js" defer>'));
 const policy=safe.providerPolicy();
 assert.equal(policy.allow_fallbacks,false);
 for(const p of Object.values(policy.max_price))assert.equal(p,0);
});
