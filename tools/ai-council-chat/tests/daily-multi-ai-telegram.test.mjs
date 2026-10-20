import test from 'node:test';
import assert from 'node:assert/strict';
import {reviewGemini,reviewMistral,verifyFreeMistral,chooseFreeMistral,observedTasks,generateSpec} from '../scripts/daily-council-providers.mjs';
import {runDailyCouncil,makeDailyReport,cleanArchivedReport} from '../scripts/daily-multi-ai-telegram.mjs';
import {torontoDate} from '../scripts/daily-gemini-telegram.mjs';

const evidence={source:'https://holistichouse.vercel.app',date_toronto:'2026-10-19',
  method:'anonymous HTML',scope:{scanned_urls:2},
  pages:[{url:'https://holistichouse.vercel.app/en/services',status:200,
    title:'Services',flags:['missing_description'],lang:'en'},
    {url:'https://holistichouse.vercel.app/ru/academy',status:404,flags:[]}]};
const longReview='Независимые наблюдения: '+('Конкретная HTML-рекомендация по публичным страницам. ').repeat(9);
const apiJson=(value,status=200)=>Response.json(value,{status});

test('Gemini/Mistral skip when free provider conditions are unconfirmed, without network calls',async()=>{
  const nope=async()=>{throw Error('No paid model/network allowed')};
  const gemini=await reviewGemini(evidence,{GEMINI_API_KEY:'fake'},nope);
  const mistral=await reviewMistral(evidence,{MISTRAL_API_KEY:'fake'},nope);
  assert.equal(gemini.status,'disabled');
  assert.equal(mistral.status,'unavailable');
});
test('verified free Mistral requires known zero prices for every present price field',()=>{
  assert.equal(verifyFreeMistral({id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0',completion:'0',request:'0'}}),true);
  for(const item of [
    {id:'mistralai/mistral-7b-instruct',pricing:{prompt:'0',completion:'0'}},
    {id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0.01',completion:'0'}},
    {id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0',completion:'0',request:'unknown'}},
    {id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0'}},
    {id:'other/mistral:free',pricing:{prompt:'0',completion:'0'}},
  ]) assert.equal(verifyFreeMistral(item),false,JSON.stringify(item));
  assert.equal(chooseFreeMistral([{id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0',completion:'0'}}]).id,
    'mistralai/mistral-7b-instruct:free');
  assert.equal(chooseFreeMistral([]),null);
});
test('OpenRouter allows exactly one zero-price Mistral without any paid fallback',async()=>{
  const calls=[];
  const fake=async(url,init)=>{
    calls.push({url:String(url),init});
    if(String(url).endsWith('/models'))return apiJson({data:[
      {id:'mistralai/paid-model:free',pricing:{prompt:'0.05',completion:'0'}},
      {id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0',completion:'0'}}
    ]});
    const sent=JSON.parse(init.body);
    assert.equal(sent.provider.allow_fallbacks,false);
    assert.deepEqual(sent.provider.max_price,{prompt:0,completion:0,request:0,image:0});
    assert.equal(sent.model,'mistralai/mistral-7b-instruct:free');
    return apiJson({model:sent.model,usage:{cost:0},choices:[{finish_reason:'stop',message:{content:longReview}}]});
  };
  const out=await reviewMistral(evidence,{OPENROUTER_API_KEY:'test-free-key'},fake);
  assert.equal(out.status,'ok');
  assert.equal(calls.length,2);
  const failed=await reviewMistral(evidence,{OPENROUTER_API_KEY:'test-free-key'},async(url,init)=>{
    if(String(url).endsWith('/models'))
      return apiJson({data:[{id:'mistralai/mistral-7b-instruct:free',pricing:{prompt:'0',completion:'0'}}]});
    return apiJson({model:'mistralai/mistral-7b-instruct:free',usage:{cost:0.1},
      choices:[{finish_reason:'stop',message:{content:longReview}}]});
  });
  assert.equal(failed.status,'error');
});
test('Mistral Experiment is explicit opt-in; incomplete/429 responses cannot become success',async()=>{
  const calls=[];
  const env={MISTRAL_API_KEY:'offline-key',MISTRAL_EXPERIMENT_CONFIRMED:'true'};
  const out=await reviewMistral(evidence,env,async(url,init)=>{
    calls.push(url);
    assert.equal(JSON.parse(init.body).model,'mistral-small-2603');
    return apiJson({choices:[{finish_reason:'stop',message:{content:longReview}}]});
  });
  assert.equal(out.status,'ok');
  assert.equal(calls.length,1);
  const failing=await reviewMistral(evidence,env,async()=>apiJson({error:'quota'},429));
  assert.equal(failing.status,'error');assert.equal(failing.reason,'HTTP 429');
});
test('Gemini synthesis requires free-tier confirmation and generates independent TZ once',async()=>{
  let calls=0;
  const env={GEMINI_API_KEY:'offline-google-key',GEMINI_FREE_TIER_CONFIRMED:'true'};
  const reply=async(_url,init)=>{
    calls++;
    assert.equal(JSON.parse(init.body).generationConfig.thinkingConfig.thinkingLevel,'low');
    return apiJson({candidates:[{finishReason:'STOP',content:{parts:[{text:longReview}]}}]});
  };
  const gemini=await reviewGemini(evidence,env,reply);
  assert.equal(gemini.status,'ok');
  const spec=await generateSpec(evidence,gemini,{status:'unavailable',model:'Mistral'},env,reply);
  assert.equal(spec.status,'ok');
  assert.equal(calls,2);
});
test('report attributes every source; no synthetic Muse output and no private URL is invented',()=>{
  const doc=makeDailyReport({date:'2026-10-19',evidence,
    gemini:{status:'ok',model:'gemini-3.8-flash',text:longReview},
    mistral:{status:'error',model:'Mistral',reason:'HTTP 429'},
    spec:{status:'not_generated'}});
  assert.match(doc,/## Gemini — независимый отчёт/);
  assert.match(doc,/Mistral.*HTTP 429/);
  assert.match(doc,/MANUAL_ONLY/);
  assert.match(doc,/T-01/);
  assert.match(doc,/https:\/\/holistichouse\.vercel\.app\/en\/services/);
  assert.doesNotMatch(doc,/Muse.*независимое заключение получено/);
  assert.deepEqual(observedTasks(evidence).map(t=>t.flag),['missing_description','public_http_404']);
});
test('Council archives daily evidence once and confirms Telegram recipient; second run does not repeat',async()=>{
  const current=torontoDate(),stored=[];
  const env={GITHUB_TOKEN:'fake-github',TELEGRAM_BOT_TOKEN:'fake-bot',TELEGRAM_CHAT_ID:'123456',
    GITHUB_REPOSITORY:'andylitvinov-design/ai-projects-brain'};
  const calls={post:0,scan:0,send:0,patch:0};
  const collect=async date=>{calls.scan++;return {...evidence,date_toronto:date}};
  const fake=async(url,init={})=>{
    const u=String(url);
    if(u.includes('/issues/242/comments?'))return apiJson(stored);
    if(u.endsWith('/issues/242/comments')&&init.method==='POST'){
      calls.post++;const {body}=JSON.parse(init.body);
      assert.ok(body.includes('HH-COUNCIL-DAILY:'));
      assert.doesNotMatch(body,/fake-bot|fake-github/);
      const row={id:123,body,user:{login:'github-actions[bot]'},created_at:new Date().toISOString(),
        html_url:'https://github.com/andylitvinov-design/ai-projects-brain/issues/242#issuecomment-123'};
      stored.push(row);return apiJson(row,201);
    }
    if(u.includes('/issues/comments/123')&&init.method==='PATCH'){
      calls.patch++;stored[0].body=JSON.parse(init.body).body;return apiJson(stored[0]);
    }
    if(u.includes('api.telegram.org/')){
      calls.send++;
      const text=await init.body.get('document').text();
      assert.match(text,/## Gemini/);
      assert.match(text,/## Mistral/);
      assert.match(text,/## Личный Muse/);
      assert.equal(init.body.get('chat_id'),'123456');
      return apiJson({ok:true,result:{chat:{id:123456},message_id:55}});
    }
    throw Error('Unexpected URL '+u);
  };
  const first=await runDailyCouncil({env,fetcher:fake,collect,now:new Date()});
  assert.equal(first.status,'accepted');
  assert.deepEqual(calls,{post:1,scan:1,send:1,patch:1});
  assert.ok(stored[0].body.includes('HH-COUNCIL-TELEGRAM-SENT'));
  const cleaned=cleanArchivedReport(stored[0]);
  assert.doesNotMatch(cleaned,/HH-COUNCIL-EVIDENCE/);
  const again=await runDailyCouncil({env,fetcher:fake,collect,now:new Date()});
  assert.equal(again.status,'already_sent');
  assert.deepEqual(calls,{post:1,scan:1,send:1,patch:1});
});
test('If Telegram fails, retry uses the same archived model results without new generation',async()=>{
  const date=torontoDate(),content='<!-- HH-COUNCIL-DAILY:'+date+' -->\n\n# real public report';
  const arr=[{id:7,body:content,user:{login:'github-actions[bot]'},created_at:new Date().toISOString(),
    html_url:'https://github.com/andylitvinov-design/ai-projects-brain/issues/242#issuecomment-7'}];
  const env={GITHUB_TOKEN:'fake',TELEGRAM_BOT_TOKEN:'fake',TELEGRAM_CHAT_ID:'123456'};
  let sends=0,patch=0;
  const fake=async(url,init={})=>{
    const s=String(url);
    if(s.includes('/issues/242/comments?'))return apiJson(arr);
    if(s.includes('api.telegram.org')){sends++;return sends===1?
      apiJson({ok:false},503):apiJson({ok:true,result:{chat:{id:123456},message_id:8}});}
    if(s.endsWith('/issues/comments/7')&&init.method==='PATCH'){
      patch++;arr[0].body=JSON.parse(init.body).body;return apiJson(arr[0]);
    }
    throw Error('Unexpected request '+s);
  };
  await assert.rejects(runDailyCouncil({env,fetcher:fake,collect:async()=>{throw Error('must reuse archive')}}),/Telegram HTTP 503/);
  assert.ok(!arr[0].body.includes('HH-COUNCIL-TELEGRAM-SENT'));
  const success=await runDailyCouncil({env,fetcher:fake,collect:async()=>{throw Error('must reuse archive')}});
  assert.equal(success.status,'accepted');assert.equal(sends,2);assert.equal(patch,1);
});
test('legacy same-day sent marker prevents double push after switching workflow modes',async()=>{
  const date=torontoDate();
  const env={GITHUB_TOKEN:'fake',TELEGRAM_BOT_TOKEN:'fake',TELEGRAM_CHAT_ID:'123456'};
  const old={id:9,body:'<!-- HH-GEMINI-AUDIT:'+date+' -->\n<!-- HH-TELEGRAM-SENT:'+date+' -->',
    user:{login:'github-actions[bot]'},created_at:new Date().toISOString()};
  const result=await runDailyCouncil({env,fetcher:async()=>apiJson([old]),
    collect:async()=>{throw Error('Should not scan')}});assert.equal(result.status,'already_sent_legacy');
});

test('central archive-only mode needs no Telegram secrets and emits no Bot API requests',async()=>{
  const date=torontoDate(),saved=[],calls={archive:0,scan:0,telegram:0}
  const env={GITHUB_TOKEN:'offline-github-token',
    COUNCIL_DELIVERY_MODE:'archive_only',
    GITHUB_REPOSITORY:'andylitvinov-design/ai-projects-brain'}
  const fetcher=async(url,init={})=>{
    const endpoint=String(url)
    if(endpoint.includes('/issues/242/comments?'))return apiJson(saved)
    if(endpoint.endsWith('/issues/242/comments')&&init.method==='POST'){
      calls.archive++
      const {body}=JSON.parse(init.body)
      const item={id:765,body,user:{login:'github-actions[bot]'},
        created_at:new Date().toISOString(),
        html_url:'https://github.com/andylitvinov-design/ai-projects-brain/issues/242#issuecomment-765'}
      saved.push(item)
      return apiJson(item,201)
    }
    if(endpoint.includes('api.telegram.org'))calls.telegram++
    throw Error('Unexpected central archive-only request '+endpoint)
  }
  const collect=async()=>{calls.scan++;return {...evidence,date_toronto:date}}
  const first=await runDailyCouncil({env,fetcher,collect})
  assert.equal(first.status,'archived_only')
  assert.equal(calls.telegram,0)
  assert.equal(calls.archive,1)
  assert.equal(calls.scan,1)
  assert.match(saved[0].body,/Muse.*MANUAL_ONLY|Личный Muse/)
  const second=await runDailyCouncil({env,fetcher,collect})
  assert.equal(second.status,'archived_only')
  assert.equal(calls.archive,1)
  assert.equal(calls.scan,1)
  assert.equal(calls.telegram,0)
})
