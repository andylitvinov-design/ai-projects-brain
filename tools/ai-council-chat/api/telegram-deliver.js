/* Authenticated AI Council owner UI -> central Holistic House Telegram hub.
 * The BotFather token and numeric chat ID are stored ONLY in Holistic House.
 * This Vercel project holds an independent, randomly-generated relay key.
 */
import {createHash,timingSafeEqual} from 'node:crypto';

const ALLOWED_ORIGINS=new Set([
  'https://ai-council-chat.vercel.app',
  'https://ai-council-chat-super10.vercel.app'
]);
const HUB='https://holistichouse.vercel.app/api/internal/telegram-hub';
const MAX_BODY=94000,MAX_MARKDOWN=85000;
function respond(body,status=200){
  return Response.json(body,{status,headers:{
    'Cache-Control':'no-store, no-cache, max-age=0',
    'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'
  }});
}
function authorized(candidate,expected){
  if(typeof candidate!=='string'||typeof expected!=='string'||
    candidate.length<32||expected.length<32||
    candidate.length>256||expected.length>256)return false;
  const digest=x=>createHash('sha256').update(x).digest();
  return timingSafeEqual(digest(candidate),digest(expected));
}
function restricted(body){
  if(!body||typeof body!=='object'||Array.isArray(body)||
    !Object.keys(body).every(key=>['mode','markdown','title','sources'].includes(key)))
    return 'INVALID_PAYLOAD';
  if(body.mode==='probe')return Object.keys(body).length===1?null:'INVALID_PROBE';
  if(body.mode!=='report')return 'INVALID_MODE';
  if(typeof body.markdown!=='string'||!body.markdown.trim()||
    body.markdown.length>MAX_MARKDOWN)return 'INVALID_REPORT';
  if(typeof body.title!=='string'||body.title.length>120)return 'INVALID_TITLE';
  if(!Array.isArray(body.sources)||body.sources.length>6||
    body.sources.some(x=>typeof x!=='string'||x.length>100))return 'INVALID_SOURCES';
  return null;
}
export async function POST(request){
  if(!ALLOWED_ORIGINS.has(request.headers.get('origin')||''))
    return respond({error:'Incorrect origin'},403);
  if(!String(request.headers.get('content-type')||'').toLowerCase().includes('application/json'))
    return respond({error:'JSON required'},415);
  if(Number(request.headers.get('content-length')||0)>MAX_BODY)
    return respond({error:'Report too large'},413);
  const access=request.headers.get('x-council-telegram-access')||'';
  if(!authorized(access,process.env.COUNCIL_TELEGRAM_ACCESS_KEY||''))
    return respond({error:'Not authorized'},401);
  let data;
  try{
    const raw=await request.text();
    if(raw.length>MAX_BODY)return respond({error:'Report too large'},413);
    data=JSON.parse(raw);
  }catch{return respond({error:'Invalid JSON'},400);}
  const invalid=restricted(data);
  if(invalid)return respond({error:'Invalid Telegram request'},400);
  if(data.mode==='report'&&process.env.COUNCIL_TELEGRAM_ENABLED!=='true')
    return respond({error:'Telegram owner delivery not enabled'},503);
  const relay=process.env.COUNCIL_TELEGRAM_RELAY_KEY||'';
  if(relay.length<32||relay.length>256)
    return respond({error:'Central Telegram relay not configured'},503);
  try{
    const upstream=await fetch(HUB,{
      method:'POST',redirect:'error',cache:'no-store',referrerPolicy:'no-referrer',
      headers:{'content-type':'application/json','x-hh-council-relay-key':relay},
      body:JSON.stringify(data),signal:AbortSignal.timeout(49000)
    });
    const answer=await upstream.json().catch(()=>null);
    if(upstream.status===422)return respond({
      error:'Telegram bot or verified private owner chat does not match'},422);
    if(!upstream.ok||answer?.ok!==true)
      return respond({error:'Central Telegram delivery unavailable',upstream_status:upstream.status},503);
    if(data.mode==='probe')return respond({
      ok:true,configured:answer.configured===true,
      bot_username_verified:answer.bot_username_verified===true,
      owner_username_verified:answer.owner_username_verified===true,
      private_chat_verified:answer.private_chat_verified===true,
      existing_webhook_present:answer.existing_webhook_present===true,
      delivery_enabled:process.env.COUNCIL_TELEGRAM_ENABLED==='true'&&
        answer.delivery_enabled===true,
      no_message_sent:true
    });
    if(answer.accepted!==true)
      return respond({error:'Telegram did not confirm acceptance'},503);
    return respond({
      ok:true,accepted:true,
      notice:'Telegram Bot API accepted the document; recipient reading is not verified'
    });
  }catch{
    return respond({error:'Central Telegram relay unavailable'},503);
  }
}
export async function GET(){
  return respond({ok:true,enabled:false,note:'Owner-only POST. Bot credentials stored centrally.'});
}
