/* Owner-only AI Council → Telegram bridge. Disabled until explicit Vercel env opt-in.
 * Sends only to the server-configured private Telegram chat, never a client-specified ID.
 * Access key is distinct from Telegram bot token; never store provider/bot secrets in browser.
 */
import {createHash,timingSafeEqual} from 'node:crypto';

const ALLOWED_ORIGINS=new Set([
  'https://ai-council-chat.vercel.app',
  'https://ai-council-chat-super10.vercel.app'
]);
const MAX_BODY=95000, MAX_MARKDOWN=88000;
function respond(body,status=200){
  return Response.json(body,{status,headers:{
    'Cache-Control':'no-store, no-cache, max-age=0',
    'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'no-referrer'
  }});
}
function equalAccessKey(candidate,expected){
  if(typeof candidate!=='string'||typeof expected!=='string'||candidate.length<32||expected.length<32||candidate.length>256||expected.length>256)return false;
  const hash=x=>createHash('sha256').update(x).digest();
  return timingSafeEqual(hash(candidate),hash(expected));
}
function restricted(body){
  if(!body || !['probe','report'].includes(body.mode))return 'Invalid delivery mode';
  if(body.mode==='probe')return null;
  if(typeof body.markdown!=='string'||!body.markdown.trim()||body.markdown.length>MAX_MARKDOWN)return 'Report length invalid';
  if(typeof body.title!=='string'||body.title.length>120)return 'Invalid title';
  if(!Array.isArray(body.sources)||body.sources.length>6||
    body.sources.some(x=>typeof x!=='string'||x.length>120))return 'Invalid source attribution';
  return null;
}
export async function POST(request){
  if(!ALLOWED_ORIGINS.has(request.headers.get('origin')||''))return respond({error:'Incorrect origin'},403);
  if(!String(request.headers.get('content-type')||'').toLowerCase().includes('application/json'))return respond({error:'JSON required'},415);
  const size=Number(request.headers.get('content-length')||0);
  if(size>MAX_BODY)return respond({error:'Report too large'},413);
  const provided=request.headers.get('x-council-telegram-access')||'';
  if(!equalAccessKey(provided,process.env.COUNCIL_TELEGRAM_ACCESS_KEY||''))return respond({error:'Not authorized'},401);
  if(process.env.COUNCIL_TELEGRAM_ENABLED!=='true')return respond({error:'Telegram owner delivery not enabled'},503);
  const token=process.env.TELEGRAM_BOT_TOKEN,chat=process.env.TELEGRAM_CHAT_ID;
  if(!token||!chat)return respond({error:'Telegram owner delivery not configured'},503);
  let raw;
  try{raw=await request.text();}catch{return respond({error:'Invalid request'},400);}
  if(raw.length>MAX_BODY)return respond({error:'Report too large'},413);
  let payload;try{payload=JSON.parse(raw);}catch{return respond({error:'Invalid JSON'},400);}
  const err=restricted(payload);if(err)return respond({error:err},400);
  if(payload.mode==='probe')return respond({ok:true,configured:true,note:'No Telegram message has been sent'});
  const form=new FormData();
  form.set('chat_id',chat);
  form.set('document',new Blob([payload.markdown],{type:'text/markdown; charset=utf-8'}),'ai-council-report.md');
  form.set('caption',('AI Council · '+payload.title).slice(0,160)+'\nИсточники: '+payload.sources.join(', ').slice(0,650));
  try{
    const r=await fetch('https://api.telegram.org/bot'+token+'/sendDocument',{
      method:'POST',body:form,redirect:'error',signal:AbortSignal.timeout(20000)
    });
    if(!r.ok)return respond({error:'Telegram Bot API rejected delivery',upstream_status:r.status},502);
    const data=await r.json().catch(()=>null);
    if(!data||data.ok!==true)return respond({error:'Telegram Bot API did not confirm acceptance'},502);
    return respond({ok:true,accepted:true,notice:'Telegram Bot API accepted the document; recipient reading is not verified'});
  }catch{
    return respond({error:'Telegram Bot API is unavailable or timed out'},503);
  }
}
export async function GET(){return respond({ok:true,enabled:false,note:'Owner-only POST. No credentials or delivery status disclosed.'});}
