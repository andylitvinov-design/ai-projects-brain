/* Owner-only AI Council Telegram relay with VERIFIED bot and chat.
 * The bot token and recipient ID are server-side; probe works while sending is off.
 * No bot webhook changes, no getUpdates, no client/medical data reads.
 */
import {createHash,timingSafeEqual} from 'node:crypto';

const ALLOWED_ORIGINS=new Set([
  'https://ai-council-chat.vercel.app',
  'https://ai-council-chat-super10.vercel.app'
]);
const MAX_BODY=95000, MAX_MARKDOWN=88000;
const EXPECTED_BOT_USERNAME='andydotbot',EXPECTED_OWNER_USERNAME='andytherapist';
function respond(body,status=200){
  return Response.json(body,{status,headers:{
    'Cache-Control':'no-store, no-cache, max-age=0',
    'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'no-referrer'
  }});
}
function equalAccessKey(candidate,expected){
  if(typeof candidate!=='string'||typeof expected!=='string'||
    candidate.length<32||expected.length<32||candidate.length>256||expected.length>256)return false;
  const hash=x=>createHash('sha256').update(x).digest();
  return timingSafeEqual(hash(candidate),hash(expected));
}
function restricted(body){
  if(!body||!['probe','report'].includes(body.mode))return 'Invalid delivery mode';
  if(body.mode==='probe')return null;
  if(typeof body.markdown!=='string'||!body.markdown.trim()||
    body.markdown.length>MAX_MARKDOWN)return 'Report length invalid';
  if(typeof body.title!=='string'||body.title.length>120)return 'Invalid title';
  if(!Array.isArray(body.sources)||body.sources.length>6||
    body.sources.some(x=>typeof x!=='string'||x.length>120))return 'Invalid source attribution';
  return null;
}
// GET metadata stays intentionally uninformative. Private owner POST is mandatory.
export async function GET(){
  return respond({ok:true,enabled:false,note:'Owner-only POST. No credentials or delivery status disclosed.'});
}
// Verify actual BotFather identity and owner private chat BEFORE enabling any real delivery.
// A webhook does not affect outbound sendDocument; do not read or change it here.
async function telegramGet(token,method,chatId){
  const suffix=method==='getChat'?'?chat_id='+encodeURIComponent(chatId):'';
  const url='https://api.telegram.org/bot'+token+'/'+method+suffix;
  const response=await fetch(url,{
    method:'GET',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(9000)
  });
  if(!response.ok)throw Error('Telegram preflight HTTP '+response.status);
  const body=await response.json().catch(()=>null);
  if(body?.ok!==true||!body.result)throw Error('Telegram preflight unavailable');
  return body.result;
}
async function probeOwner(token,chatId){
  const [bot,chat,webhook]=await Promise.all([
    telegramGet(token,'getMe'),
    telegramGet(token,'getChat',chatId),
    telegramGet(token,'getWebhookInfo')
  ]);
  const correctBot=bot.is_bot===true&&
    String(bot.username||'').toLowerCase()===EXPECTED_BOT_USERNAME;
  const privateChat=chat.type==='private'&&String(chat.id||'')===String(chatId);
  const ownerUsername=String(chat.username||'').toLowerCase()===EXPECTED_OWNER_USERNAME;
  return {
    configured:correctBot&&privateChat&&ownerUsername,
    bot_username_verified:correctBot,
    private_chat_verified:privateChat,
    owner_username_verified:ownerUsername,
    existing_webhook_present:Boolean(webhook.url),
  };
}
export async function POST(request){
  if(!ALLOWED_ORIGINS.has(request.headers.get('origin')||''))
    return respond({error:'Incorrect origin'},403);
  if(!String(request.headers.get('content-type')||'').toLowerCase().includes('application/json'))
    return respond({error:'JSON required'},415);
  const size=Number(request.headers.get('content-length')||0);
  if(!Number.isFinite(size)||size>MAX_BODY)
    return respond({error:'Report too large'},413);
  const provided=request.headers.get('x-council-telegram-access')||'';
  if(!equalAccessKey(provided,process.env.COUNCIL_TELEGRAM_ACCESS_KEY||''))
    return respond({error:'Not authorized'},401);

  let raw;
  try{raw=await request.text();}catch{return respond({error:'Invalid request'},400);}
  if(raw.length>MAX_BODY)return respond({error:'Report too large'},413);
  let payload;try{payload=JSON.parse(raw);}catch{return respond({error:'Invalid JSON'},400);}
  const err=restricted(payload);if(err)return respond({error:err},400);

  const token=process.env.TELEGRAM_BOT_TOKEN||'';
  const chat=process.env.TELEGRAM_CHAT_ID||'';
  // Do not call Bot API if chat is absent, nonnumeric, or no credentials.
  if(!token||!/^-?\d{1,20}$/.test(chat))
    return respond({error:'Telegram owner delivery not configured'},503);

  if(payload.mode!=='probe'&&process.env.COUNCIL_TELEGRAM_ENABLED!=='true')
    return respond({error:'Telegram owner delivery not enabled'},503);

  let verified;
  try{verified=await probeOwner(token,chat);}
  catch{return respond({error:'Telegram Bot API identity check failed'},503);}

  if(payload.mode==='probe'){
    return respond({
      ok:verified.configured,
      ...verified,
      delivery_enabled:process.env.COUNCIL_TELEGRAM_ENABLED==='true',
      no_message_sent:true,
      note:verified.configured?'Bot and owner private chat verified without sending':
        'Bot or private owner chat identity does not match; delivery blocked',
    },verified.configured?200:422);
  }
  if(!verified.configured)
    return respond({error:'Wrong Telegram bot or owner private chat; delivery blocked'},422);

  const form=new FormData();
  form.set('chat_id',chat);
  form.set('document',new Blob([payload.markdown],{type:'text/markdown; charset=utf-8'}),
    'ai-council-report.md');
  form.set('caption',('AI Council · '+payload.title).slice(0,160)+
    '\nИсточники: '+payload.sources.join(', ').slice(0,650));
  try{
    const r=await fetch('https://api.telegram.org/bot'+token+'/sendDocument',{
      method:'POST',body:form,redirect:'error',signal:AbortSignal.timeout(20000)
    });
    if(!r.ok)return respond({error:'Telegram Bot API rejected delivery',upstream_status:r.status},502);
    const data=await r.json().catch(()=>null);
    if(!data||data.ok!==true||
      String(data.result?.chat?.id||'')!==String(chat))
      return respond({error:'Telegram Bot API did not confirm expected private chat'},502);
    return respond({
      ok:true,accepted:true,
      notice:'Telegram Bot API accepted the document; recipient reading is not verified'
    });
  }catch{
    return respond({error:'Telegram Bot API is unavailable or timed out'},503);
  }
}
