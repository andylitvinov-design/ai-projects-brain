/*
 * NVIDIA NIM CORS-safe relay for an opted-in user-provided trial key.
 * The key is transient per request, never logged, persisted, cached or placed in a URL.
 * Requests ONLY deepseek-ai/deepseek-v4.1-flash at NVIDIA. No payment/billing support.
 * This is a trust boundary: the user's API key does traverse AI Council Vercel functions.
 */
const UPSTREAM='https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL='deepseek-ai/deepseek-v4.1-flash';
const ALLOWED_ORIGINS=new Set(['https://ai-council-chat.vercel.app','https://ai-council-chat-super10.vercel.app']);
const SAFE_TEXT=/^[\s\S]{1,80000}$/;
function reply(body,status=200){return Response.json(body,{status,headers:{'Cache-Control':'no-store, no-cache, max-age=0','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});}
function clientError(status){if(status===400||status===422)return 'Неверные параметры запроса или модель недоступна (HTTP '+status+').';
 if(status===401||status===403)return 'NVIDIA отклонила ключ (HTTP '+status+'). Проверь ключ NVIDIA Build, не NGC и не DeepSeek/OpenRouter.';
 if(status===402)return 'NVIDIA просит оплату или исчерпаны пробные кредиты. Платный режим не используется.';
 if(status===429)return 'Достигнут пробный лимит NVIDIA (HTTP 429). Подожди и попробуй позже.';
 if(status>=500)return 'NVIDIA API временно недоступен (HTTP '+status+').';
 return 'NVIDIA API ответил с ошибкой HTTP '+status+'.';}
export async function GET(){return reply({ok:true,provider:'nvidia',model:MODEL,usage:'explicit opt-in only',notice:'Transmits API key through the site server transiently; no persistence.'});}
export async function POST(req){
 const origin=req.headers.get('origin')||'';
 if(!ALLOWED_ORIGINS.has(origin))return reply({error:'Request blocked: incorrect site origin'},403);
 const size=Number(req.headers.get('content-length')||0);
 if(size>120000)return reply({error:'Request too large'},413);
 const ct=req.headers.get('content-type')||'';
 if(!ct.toLowerCase().includes('application/json'))return reply({error:'JSON required'},415);
 let b;try{b=await req.json();}catch{return reply({error:'Invalid JSON'},400);}
 if(!b||b.consent!==true)return reply({error:'Explicit permission required to relay key through AI Council'},403);
 const apiKey=typeof b.apiKey==='string'?b.apiKey.trim():'';
 if(!/^nvapi-[a-z0-9._-]{12,512}$/i.test(apiKey))return reply({error:'Invalid NVIDIA Build API key format. Expected nvapi-…'},400);
 if(b.model!==MODEL)return reply({error:'Unsupported model (strict DeepSeek V4.1 only)'},400);
 const msgs=b.messages;
 if(!Array.isArray(msgs)||!msgs.length||msgs.length>7||msgs.some(m=>!m||!['system','user','assistant'].includes(m.role)||typeof m.content!=='string'||!SAFE_TEXT.test(m.content)))
   return reply({error:'Invalid messages'},400);
 if(msgs.reduce((n,m)=>n+m.content.length,0)>92000)return reply({error:'Conversation too long'},413);
 const isProbe=b.probe===true;
 // A probe is exactly one bounded, low-token call. Do not waste a 256-token cap
 // on model reasoning: a "length" finish with empty content is not a valid test.
 const tokens=isProbe?128:Math.min(5300,Math.max(24,Number.isFinite(b.max_tokens)?Math.floor(b.max_tokens):1600));
 // No hidden paid fallbacks, no arbitrary URL, no dynamic providers or model IDs.
 const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),isProbe?42000:120000);
 try{
  let r;
  try{r=await fetch(UPSTREAM,{
    method:'POST',redirect:'error',signal:ctl.signal,
    headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({model:MODEL,messages:msgs,max_tokens:tokens,stream:false,temperature:1,top_p:0.95,
      ...(isProbe?{reasoning_effort:'none'}:{})})
  });}catch(e){return reply({error:e?.name==='AbortError'?
      'NVIDIA не ответила на короткую проверку за 42 секунды. Это задержка сервиса, а не доказательство неверного ключа. Попробуй позже; автоматических повторов нет.':
      'Не удалось установить соединение с NVIDIA. Проверь сеть и попробуй позже; автоматических повторов нет.'},503);}
  if(!r.ok)return reply({error:clientError(r.status),upstream_status:r.status},r.status>=500?502:r.status);
  let data;
  try{data=await r.json();}catch(e){return reply({error:e?.name==='AbortError'?
    'NVIDIA не завершила передачу ответа до тайм-аута. Попробуй позже.':
    'NVIDIA вернула неполный или нечитаемый ответ. Попробуй позже.'},502);}
  const val=data.choices?.[0]?.message;
  const text=typeof val?.content==='string'?val.content:Array.isArray(val?.content)?val.content.filter(p=>p.type==='text').map(p=>p.text||'').join('\n'):'';
  if(!text.trim())return reply({error:isProbe?
    'NVIDIA завершила проверку без текстового ответа. Доступ к модели пока не подтверждён; пробный лимит или задержка провайдера возможны.':
    'NVIDIA returned no textual completion',finish_reason:data.choices?.[0]?.finish_reason||null},502);
  return reply({ok:true,model:MODEL,choices:[{message:{role:'assistant',content:text},finish_reason:data.choices?.[0]?.finish_reason||null}]});
 }finally{clearTimeout(tid);}
}
