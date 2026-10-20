import test from 'node:test';
import assert from 'node:assert/strict';
import {POST,GET} from '../api/telegram-deliver.js';

const ALLOWED='https://ai-council-chat.vercel.app';
const KEY='abcdefghijklmnopqrstuvwxyz0123456789_owner_only';
const BOT='0000000:FAKE-TELEGRAM-TEST-TOKEN';
const ID='999888777';
const ENV=['COUNCIL_TELEGRAM_ACCESS_KEY','COUNCIL_TELEGRAM_ENABLED','TELEGRAM_BOT_TOKEN','TELEGRAM_CHAT_ID'];
function request(payload={},overrides={}){
  return new Request(ALLOWED+'/api/telegram-deliver',{
    method:'POST',
    headers:{origin:ALLOWED,'content-type':'application/json',
      'x-council-telegram-access':KEY,...(overrides.headers||{})},
    body:JSON.stringify(payload)
  });
}
function report(extra={}){
  return {mode:'report',title:'Mistral and Gemini',
    markdown:'# AI Council\n\nReal Mistral reply\nReal Gemini reply',
    sources:['mistral-direct/experiment','google-direct/gemini-free'],...extra};
}
async function fixture(callback){
  const saved=Object.fromEntries(ENV.map(key=>[key,process.env[key]]));
  const original=globalThis.fetch;
  Object.assign(process.env,{
    COUNCIL_TELEGRAM_ACCESS_KEY:KEY,
    COUNCIL_TELEGRAM_ENABLED:'true',
    TELEGRAM_BOT_TOKEN:BOT,
    TELEGRAM_CHAT_ID:ID
  });
  const calls=[];
  globalThis.fetch=async(url,init={})=>{
    const u=String(url);calls.push({url:u,init});
    if(u.endsWith('/getMe'))
      return Response.json({ok:true,result:{is_bot:true,username:'Andydotbot',id:111111}});
    if(u.endsWith('/getChat?chat_id='+ID))
      return Response.json({ok:true,result:{id:Number(ID),type:'private',username:'AndyTherapist'}});
    if(u.endsWith('/getWebhookInfo'))
      return Response.json({ok:true,result:{url:'https://webhook.example/private'}});
    if(u.endsWith('/sendDocument'))
      return Response.json({ok:true,result:{message_id:1,chat:{id:Number(ID)}}});
    throw Error('Unexpected request '+u);
  };
  try{await callback(calls);}
  finally{
    globalThis.fetch=original;
    for(const [key,value] of Object.entries(saved))
      if(value===undefined)delete process.env[key];else process.env[key]=value;
  }
}
test('public GET discloses no live config or secrets',async()=>{
  await fixture(async calls=>{
    const res=await GET(),body=await res.text();
    assert.equal(res.status,200);
    assert.doesNotMatch(body,/FAKE-TELEGRAM|999888777|Andydotbot|AndyTherapist/);
    assert.equal(calls.length,0);
  });
});
test('origin, access key and malformed payload are rejected without Telegram network',async()=>{
  await fixture(async calls=>{
    assert.equal((await POST(request(report(),{headers:{origin:'https://evil.example'}}))).status,403);
    assert.equal((await POST(request(report(),{headers:{'x-council-telegram-access':'wrong'}}))).status,401);
    assert.equal((await POST(request({mode:'wrong'}))).status,400);
    assert.equal((await POST(request({mode:'report',title:'t',markdown:'x'.repeat(88001),sources:[]}))).status,400);
    assert.equal(calls.length,0);
  });
});
test('owner-only Bot API probe works while send flag OFF and never sends',async()=>{
  await fixture(async calls=>{
    process.env.COUNCIL_TELEGRAM_ENABLED='false';
    const probe=await POST(request({mode:'probe'}));
    assert.equal(probe.status,200);
    const body=await probe.json();
    assert.equal(body.ok,true);assert.equal(body.configured,true);
    assert.equal(body.bot_username_verified,true);
    assert.equal(body.private_chat_verified,true);
    assert.equal(body.owner_username_verified,true);
    assert.equal(body.delivery_enabled,false);
    assert.equal(body.no_message_sent,true);
    assert.equal(body.existing_webhook_present,true);
    assert.ok(calls.some(x=>x.url.endsWith('/getMe')));
    assert.ok(calls.some(x=>x.url.includes('/getChat?chat_id='+ID)));
    assert.ok(calls.some(x=>x.url.endsWith('/getWebhookInfo')));
    assert.equal(calls.length,3);
    assert.ok(!calls.some(x=>x.url.endsWith('/sendDocument')));
    assert.doesNotMatch(JSON.stringify(body),/FAKE-TELEGRAM|999888777|webhook.example/);
    const denied=await POST(request(report()));
    assert.equal(denied.status,503);
    assert.equal(calls.length,3);
  });
});
test('bot/user identity mismatch blocks reports and returns no private chat ID',async()=>{
  await fixture(async calls=>{
    const normal=globalThis.fetch;
    globalThis.fetch=async(url,init)=>{
      if(String(url).endsWith('/getMe'))
        return Response.json({ok:true,result:{is_bot:true,username:'Wrongbot'}});
      return normal(url,init);
    };
    let res=await POST(request({mode:'probe'}));
    assert.equal(res.status,422);
    assert.equal((await res.json()).bot_username_verified,false);
    res=await POST(request(report()));
    assert.equal(res.status,422);
    assert.ok(!calls.some(x=>x.url.endsWith('/sendDocument')));
    globalThis.fetch=async(url,init)=>{
      if(String(url).includes('/getChat?'))
        return Response.json({ok:true,result:{id:Number(ID),type:'private',username:'DifferentUser'}});
      return normal(url,init);
    };
    res=await POST(request({mode:'probe'}));
    assert.equal(res.status,422);
    assert.equal((await res.json()).owner_username_verified,false);
    assert.ok(!calls.some(x=>x.url.endsWith('/sendDocument')));
  });
});
test('report sends only after successful preflight to verified fixed private chat',async()=>{
  await fixture(async calls=>{
    const res=await POST(request(report({chat_id:'attacker_supplied'})));
    assert.equal(res.status,200);
    assert.equal((await res.json()).accepted,true);
    assert.equal(calls.length,4);
    const last=calls[3];
    assert.equal(last.url,'https://api.telegram.org/bot'+BOT+'/sendDocument');
    assert.equal(last.init.method,'POST');
    assert.equal(last.init.body.get('chat_id'),ID);
    assert.match(last.init.body.get('caption'),/mistral-direct/);
    assert.match(await last.init.body.get('document').text(),/Real Gemini reply/);
  });
});
test('missing bot token or nonnumeric chat refuses to reach network',async()=>{
  await fixture(async calls=>{
    process.env.TELEGRAM_CHAT_ID='@AndyTherapist';
    assert.equal((await POST(request({mode:'probe'}))).status,503);
    process.env.TELEGRAM_CHAT_ID=ID;process.env.TELEGRAM_BOT_TOKEN='';
    assert.equal((await POST(request(report()))).status,503);
    assert.equal(calls.length,0);
  });
});
test('Telegram provider failure cannot be reported as verified or delivered',async()=>{
  await fixture(async calls=>{
    const original=globalThis.fetch;
    globalThis.fetch=async(url,init)=>{
      if(String(url).endsWith('/sendDocument')){
        calls.push({url:String(url),init});
        return Response.json({ok:false,description:'PRIVATE'}, {status:502});
      }
      return original(url,init);
    };
    let res=await POST(request(report()));
    assert.equal(res.status,502);assert.match(await res.text(),/rejected delivery/);
    globalThis.fetch=async(url,init)=>{
      if(String(url).endsWith('/sendDocument')){
        calls.push({url:String(url),init});
        return Response.json({ok:true,result:{chat:{id:1234}}});
      }
      return original(url,init);
    };
    res=await POST(request(report()));
    assert.equal(res.status,502);assert.match(await res.text(),/expected private chat/);
  });
});
test('real Bot API preflight failure refuses to send and suppresses raw provider output',async()=>{
  await fixture(async calls=>{
    const original=globalThis.fetch;
    globalThis.fetch=async(url,init)=>{
      if(String(url).endsWith('/getMe')){
        calls.push({url:String(url),init});
        return Response.json({ok:false,description:'SECRET DETAIL'},{status:403});
      }
      return original(url,init);
    };
    const res=await POST(request(report()));
    assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/SECRET DETAIL|FAKE-TELEGRAM/);
    assert.ok(!calls.some(x=>x.url.endsWith('/sendDocument')));
  });
});
