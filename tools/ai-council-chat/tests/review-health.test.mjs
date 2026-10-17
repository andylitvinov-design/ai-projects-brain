import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const here=dirname(fileURLToPath(import.meta.url));
const source=readFileSync(join(here,'..','review-health.js'),'utf8');
function helper(lang='ru'){
 const g={};
 new Function('globalThis','state',source)(g,{lang});
 return g.AICouncilReviewHealth;
}
test('one successful reviewer and two Mistral 429 are not a completed audit',()=>{
 const api=helper();
 const r={answers:[{model:'google-direct/gemini-3.8-flash:free-tier',status:'ok',text:'A verified HTML finding'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'error',error:'Rate limit exceeded'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'error',error:'Rate limit exceeded'}]};
 assert.equal(api.unique(r),1);
 assert.equal(api.ready(r),false);
 assert.match(api.partialText(r),/Недостаточно независимых ответов/);
 assert.match(api.partialText(r),/Mistral|mistral/);
});
test('three role outputs from same model never count as independent providers',()=>{
 const api=helper();
 const r={answers:[1,2,3].map(i=>({model:'google-direct/gemini-3.8-flash:free-tier',status:'ok',text:'Role '+i}))};
 assert.equal(api.unique(r),1);
 assert.equal(api.ready(r),false);
});
test('two different successful models are enough to attempt detailed synthesis',()=>{
 const api=helper('en'),r={answers:[{model:'google-direct/gemini-3.8-flash:free-tier',status:'ok',text:'A'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'ok',text:'B'},
 {model:'mistral-direct/mistral-small-2603:experiment',status:'shared',text:'Not independent'}]};
 assert.equal(api.unique(r),2);
 assert.equal(api.ready(r),true);
});
test('network load failures are recognized without pretending the key is bad',()=>{
 const api=helper();
 assert.equal(api.isNetworkError('Load failed'),true);
 assert.equal(api.isNetworkError('Failed to fetch'),true);
 assert.equal(api.isNetworkError('HTTP 401 invalid API key'),false);
});
