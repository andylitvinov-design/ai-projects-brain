import test from 'node:test';
import assert from 'node:assert/strict';
import {POST,GET} from '../api/telegram-deliver.js';

const ALLOWED='https://ai-council-chat.vercel.app';
const KEY='abcdefghijklmnopqrstuvwxyz0123456789_owner_only';
const BOT='0000000:FAKE-TELEGRAM-TEST-TOKEN';
const ENV=['COUNCIL_TELEGRAM_ACCESS_KEY','COUNCIL_TELEGRAM_ENABLED','TELEGRAM_BOT_TOKEN','TELEGRAM_CHAT_ID'];
function request(payload={},overrides={}){
  return new Request('https://ai-council-chat.vercel.app/api/telegram-deliver',{
    method:'POST',headers:{
      origin:ALLOWED,'content-type':'application/json',
      'x-council-telegram-access':KEY,...(overrides.headers||{})
    },body:JSON.stringify(payload)
  });
}
async function fixture(callback){
  const saved=Object.fromEntries(ENV.map(k=>[k,process.env[k]]));
  const fetchBefore=globalThis.fetch;
  Object.assign(process.env,{
    COUNCIL_TELEGRAM_ACCESS_KEY:KEY,
    COUNCIL_TELEGRAM_ENABLED:'true',
    TELEGRAM_BOT_TOKEN:BOT,
    TELEGRAM_CHAT_ID:'999888777'
  });
  const calls=[];
  globalThis.fetch=async(url,init)=>{
    calls.push({url,init});
    return Response.json({ok:true,result:{message_id:123}});
  };
  try{await callback(calls);}
  finally{
    globalThis.fetch=fetchBefore;
    for(const [key,value] of Object.entries(saved)){
      if(value===undefined)delete process.env[key];else process.env[key]=value;
    }
  }
}
test('GET only advertises disabled owner-only POST and never secrets',async()=>{
  await fixture(async calls=>{
    const result=await GET(),value=await result.text();
    assert.equal(result.status,200);
    assert.doesNotMatch(value,/FAKE-TELEGRAM|999888777/);
    assert.equal(calls.length,0);
  });
});
test('origin and access key guard fail before any Telegram API network',async()=>{
  await fixture(async calls=>{
    const body={mode:'report',title:'Council',markdown:'Only public data',sources:['manual:muse']};
    assert.equal((await POST(request(body,{headers:{origin:'https://evil.example'}}))).status,403);
    assert.equal((await POST(request(body,{headers:{'x-council-telegram-access':'wrong'}}))).status,401);
    assert.equal(calls.length,0);
  });
});
test('disabled server fails closed and does not leak tokens',async()=>{
  await fixture(async calls=>{
    process.env.COUNCIL_TELEGRAM_ENABLED='false';
    const result=await POST(request({mode:'probe'}));
    assert.equal(result.status,503);
    const text=await result.text();
    assert.doesNotMatch(text,/FAKE-TELEGRAM|999888777/);
    assert.equal(calls.length,0);
  });
});
test('probe validates server configuration without messaging Telegram',async()=>{
  await fixture(async calls=>{
    const result=await POST(request({mode:'probe'}));
    assert.equal(result.status,200);
    assert.match(await result.text(),/No Telegram message has been sent/);
    assert.equal(calls.length,0);
  });
});
test('sendDocument uses only server-fixed chat ID and includes source attribution',async()=>{
  await fixture(async calls=>{
    const result=await POST(request({
      mode:'report',title:'Mistral and Gemini',
      markdown:'# AI Council\n\nReal Mistral reply\nReal Gemini reply',
      sources:['mistral-direct/mistral-small-2603:experiment','google-direct/gemini-3.8-flash:free-tier']
    }));
    assert.equal(result.status,200);
    assert.equal((await result.json()).accepted,true);
    assert.equal(calls.length,1);
    assert.equal(calls[0].url,'https://api.telegram.org/bot'+BOT+'/sendDocument');
    assert.equal(calls[0].init.method,'POST');
    const form=calls[0].init.body;
    assert.equal(form.get('chat_id'),'999888777');
    assert.match(form.get('caption'),/mistral-direct/);
    assert.match(await form.get('document').text(),/Real Gemini reply/);
  });
});
test('oversize, arbitrary chat IDs, malformed payload do not cause sends',async()=>{
  await fixture(async calls=>{
    let response=await POST(request({mode:'report',title:'A',markdown:'X'.repeat(88001),sources:[]}));
    assert.equal(response.status,400);
    response=await POST(request({mode:'report',title:'A',markdown:'Fine',sources:['x'],chat_id:'attacker_chat'}));
    assert.equal(response.status,200); // Unknown fields are ignored; server chat target cannot be changed.
    assert.equal(calls[0].init.body.get('chat_id'),'999888777');
    assert.equal(calls.length,1);
    response=await POST(request({mode:'something_bad'}));
    assert.equal(response.status,400);
    assert.equal(calls.length,1);
  });
});
test('Telegram Bot API rejection is not a delivered/accepted success',async()=>{
  await fixture(async calls=>{
    globalThis.fetch=async(url,init)=>{
      calls.push({url,init});
      return Response.json({ok:false,description:'PRIVATE DETAILS'}, {status:502});
    };
    const response=await POST(request({mode:'report',title:'Council',markdown:'Only public data',sources:['manual:muse']}));
    assert.equal(response.status,502);
    assert.match(await response.text(),/rejected delivery/);
    assert.equal(calls.length,1);
  });
});