import test from 'node:test'
import assert from 'node:assert/strict'
import {POST,GET} from '../api/telegram-deliver.js'

const ORIGIN='https://ai-council-chat.vercel.app'
const KEY='owner_access_'.repeat(4)
const RELAY='private_central_key_'.repeat(4)
const VARS=['COUNCIL_TELEGRAM_ACCESS_KEY','COUNCIL_TELEGRAM_ENABLED','COUNCIL_TELEGRAM_RELAY_KEY']
function request(payload={},headers={}){
  return new Request(ORIGIN+'/api/telegram-deliver',{
    method:'POST',headers:{origin:ORIGIN,'content-type':'application/json',
      'x-council-telegram-access':KEY,...headers},body:JSON.stringify(payload)
  })
}
const report={
  mode:'report',title:'Real Gemini and Mistral',
  markdown:'# Real public AI Council report',sources:['Google Gemini','Mistral']
}
async function fixture(fn){
  const before=Object.fromEntries(VARS.map(k=>[k,process.env[k]]))
  const previous=globalThis.fetch
  Object.assign(process.env,{
    COUNCIL_TELEGRAM_ACCESS_KEY:KEY,
    COUNCIL_TELEGRAM_ENABLED:'true',
    COUNCIL_TELEGRAM_RELAY_KEY:RELAY
  })
  const calls=[]
  globalThis.fetch=async(url,init)=>{
    calls.push({url:String(url),init})
    const body=JSON.parse(init.body)
    if(body.mode==='probe')return Response.json({ok:true,configured:true,
      bot_username_verified:true,owner_username_verified:true,
      private_chat_verified:true,existing_webhook_present:true,
      delivery_enabled:true,no_message_sent:true})
    return Response.json({ok:true,accepted:true,
      notice:'Telegram API accepted the document; read receipt not available'})
  }
  try{await fn(calls)}
  finally{
    globalThis.fetch=previous
    for(const [k,val]of Object.entries(before)){
      if(val===undefined)delete process.env[k];else process.env[k]=val
    }
  }
}
test('public GET never discloses any secrets or receiver details',async()=>{
  await fixture(async calls=>{
    const res=await GET(),txt=await res.text()
    assert.equal(res.status,200)
    assert.doesNotMatch(txt,/owner_access_|private_central_key_|chat_id|BotFather/)
    assert.equal(calls.length,0)
  })
})
test('origin, owner access key and payload validation fail before relay network',async()=>{
  await fixture(async calls=>{
    assert.equal((await POST(request(report,{origin:'https://evil.example'}))).status,403)
    assert.equal((await POST(request(report,{'x-council-telegram-access':'wrong'}))).status,401)
    assert.equal((await POST(request({mode:'weird'}))).status,400)
    assert.equal((await POST(request({...report,markdown:'x'.repeat(85001)}))).status,400)
    assert.equal((await POST(request({...report,chat_id:'other'}))).status,400)
    assert.equal(calls.length,0)
  })
})
test('owner probe works while sending is disabled and never includes BotFather token',async()=>{
  await fixture(async calls=>{
    process.env.COUNCIL_TELEGRAM_ENABLED='false'
    const probe=await POST(request({mode:'probe'}))
    assert.equal(probe.status,200)
    const result=await probe.json()
    assert.equal(result.ok,true);assert.equal(result.configured,true)
    assert.equal(result.bot_username_verified,true)
    assert.equal(result.owner_username_verified,true)
    assert.equal(result.delivery_enabled,false)
    assert.equal(result.no_message_sent,true)
    assert.equal(calls.length,1)
    assert.equal(JSON.parse(calls[0].init.body).mode,'probe')
    assert.equal(calls[0].init.headers['x-hh-council-relay-key'],RELAY)
    assert.doesNotMatch(JSON.stringify(result),/private_central_key_|TELEGRAM_CHAT_ID/)
    assert.equal((await POST(request(report))).status,503)
    assert.equal(calls.length,1)
  })
})
test('manual report forwards to fixed HH URL, never Telegram provider directly',async()=>{
  await fixture(async calls=>{
    const resp=await POST(request(report))
    assert.equal(resp.status,200)
    assert.equal((await resp.json()).accepted,true)
    assert.equal(calls.length,1)
    assert.equal(calls[0].url,'https://holistichouse.vercel.app/api/internal/telegram-hub')
    assert.equal(calls[0].init.headers['x-hh-council-relay-key'],RELAY)
    assert.equal(JSON.parse(calls[0].init.body).title,report.title)
    assert.doesNotMatch(calls[0].init.body,/TELEGRAM_BOT_TOKEN|123456789:|private_central_key_/)
  })
})
test('central wrong owner and provider errors fail closed',async()=>{
  await fixture(async calls=>{
    globalThis.fetch=async()=>Response.json({error:'Wrong owner',chat_id:'PRIVATE'}, {status:422})
    let resp=await POST(request(report))
    assert.equal(resp.status,422)
    assert.doesNotMatch(await resp.text(),/PRIVATE/)
    globalThis.fetch=async()=>Response.json({error:'SERVER_PRIVATE_DETAILS'}, {status:503})
    resp=await POST(request(report))
    assert.equal(resp.status,503)
    assert.doesNotMatch(await resp.text(),/SERVER_PRIVATE_DETAILS/)
  })
})
test('missing relay credential cannot be worked around with a Bot token',async()=>{
  await fixture(async calls=>{
    delete process.env.COUNCIL_TELEGRAM_RELAY_KEY
    process.env.TELEGRAM_BOT_TOKEN='fake'
    const resp=await POST(request(report))
    assert.equal(resp.status,503)
    assert.equal(calls.length,0)
    delete process.env.TELEGRAM_BOT_TOKEN
  })
})
