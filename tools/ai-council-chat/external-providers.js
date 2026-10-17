'use strict';
/* Optional BYOK provider adapters.
 * Gemini and Mistral are browser->provider.
 * NVIDIA NIM blocks browser CORS; an EXPLICITLY consented request forwards
 * its key through the AI Council Vercel function, transiently per request.
 * No credentials are stored server-side, no paid fallback and no billing setup.
 */
(function(g){
 const P={
  gemini:{name:'Google Gemini 3.8 Flash',id:'google-direct/gemini-3.8-flash:free-tier',model:'gemini-3.8-flash',keyStore:'ai-council-gemini-key',confirm:'ai-council-gemini-free-verified',link:'https://aistudio.google.com/apikey'},
  mistral:{name:'Mistral Small 4',id:'mistral-direct/mistral-small-2603:experiment',model:'mistral-small-2603',keyStore:'ai-council-mistral-key',confirm:'ai-council-mistral-experiment-verified',link:'https://console.mistral.ai/'},
  nvidia:{name:'DeepSeek V4.1 Flash (NVIDIA NIM trial)',id:'nvidia-direct/deepseek-v4.1-flash:trial',model:'deepseek-ai/deepseek-v4.1-flash',keyStore:'ai-council-nvidia-nim-key',confirm:'ai-council-nvidia-trial-confirmed',link:'https://build.nvidia.com/deepseek-ai/deepseek-v4.1-flash/playground'}
 };
 const RELAY_STORE='ai-council-nvidia-relay-consent';
 const state={gemini:{key:'',confirmed:false,status:''},mistral:{key:'',confirmed:false,status:''},nvidia:{key:'',confirmed:false,status:''}};
 let nvidiaRelayConsent=false;
 let setup,signal,settings;
 function getSaved(p){const store=P[p];const remember=setup?.getRemember?.()||false;return sessionStorage.getItem(store.keyStore)||(remember?localStorage.getItem(store.keyStore)||'':'');}
 function read(){nvidiaRelayConsent=localStorage.getItem(RELAY_STORE)==='true';
  for(const p of Object.keys(P)){state[p].key=getSaved(p);state[p].confirmed=localStorage.getItem(P[p].confirm)==='true';}}
 function valid(p){return !!state[p].key&&state[p].confirmed&&(p!=='nvidia'||nvidiaRelayConsent);}
 function models(){return Object.keys(P).filter(valid).map(p=>({id:P[p].id,name:P[p].name+(p==='gemini'?' · AI Studio Free Tier':p==='mistral'?' · Experiment Free Tier':' · NVIDIA NIM free trial (limited)'),pricing:{prompt:'0',completion:'0'},architecture:{input_modalities:['text'],output_modalities:['text']},provider:p,freeProviderMode:'user-confirmed'}));}
 function render(){const checked=document.getElementById('nvidiaProxyConsent');if(checked)checked.checked=nvidiaRelayConsent;
 for(const p of Object.keys(P)){const d=document.getElementById(p+'DirectStatus'),checkbox=document.getElementById(p+'FreeConfirm'),disconnect=document.getElementById(p+'DirectDisconnect');
  // Do not erase a freshly checked free-tier consent box when showing an error.
  if(checkbox && state[p].confirmed)checkbox.checked=true;
  if(disconnect)disconnect.disabled=!state[p].key;
  if(d){d.textContent=state[p].key?(state[p].status||(settings?.lang?.()==='en'?'Connected (only usable if free-tier checkbox is confirmed)':'Ключ подключён; для использования подтвердите бесплатный тариф')):(settings?.lang?.()==='en'?'Not connected':'Не подключён');}
 }}
 async function refresh(){render();try{await setup?.refresh?.();}catch{}}
 async function verifyGemini(raw){const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),18000);try{
  const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash',{headers:{'x-goog-api-key':raw},signal:ctl.signal});
  if(!res.ok){const b=await res.json().catch(()=>({}));throw Error(b.error?.message||'HTTP '+res.status);}
  const d=await res.json();if(!d.name)throw Error('Invalid API response');
 }finally{clearTimeout(tid);}}
 async function verifyMistral(raw){const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),18000);try{
  const res=await fetch('https://api.mistral.ai/v1/models',{headers:{Authorization:'Bearer '+raw},signal:ctl.signal});
  if(!res.ok){const b=await res.json().catch(()=>({}));throw Error(b.message||'HTTP '+res.status);}
  const d=await res.json();if(!Array.isArray(d.data))throw Error('Invalid Mistral API response');
  if(!d.data.some(m=>m.id===P.mistral.model))throw Error('Model not accessible in this Mistral account');
 }finally{clearTimeout(tid);}}
 async function nvidiaViaRelay(raw,messages,maxTokens,signal,probe=false){
  if(!nvidiaRelayConsent)throw Error('Требуется согласие на передачу ключа через AI Council.');
  let res;
  try{res=await fetch('./api/nvidia-chat',{
     method:'POST',redirect:'error',credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({consent:true,apiKey:raw,model:P.nvidia.model,messages,max_tokens:maxTokens,probe}),
     signal
  });}catch(e){throw Error(e?.name==='AbortError'?'Таймаут соединения с NVIDIA':'Сеть недоступна. Проверь Safari/Wi‑Fi и попробуй ещё раз.');}
  const data=await res.json().catch(()=>({}));
  if(!res.ok)throw Error(String(data.error||('AI Council / NVIDIA HTTP '+res.status)).slice(0,270));
  return data;
 }
 async function verifyNvidia(raw){
  if(!nvidiaRelayConsent)throw Error('Отметь второе поле: разрешение передавать ключ NVIDIA через AI Council для обхода ограничения браузера.');
  if(!/^nvapi-[a-z0-9._-]{12,512}$/i.test(raw))throw Error('Ожидается ключ NVIDIA Build формата nvapi-…; другие ключи DeepSeek или OpenRouter не подходят.');
  const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),60000);
  try{
   const data=await nvidiaViaRelay(raw,[{role:'user',content:'Answer with one word: OK'}],128,ctl.signal,true);
   if(!Array.isArray(data.choices)||!data.choices.length)throw Error('NVIDIA не вернула подтверждение доступа к DeepSeek.');
  }finally{clearTimeout(tid);}
 }
 async function connect(p){
  const input=document.getElementById(p+'DirectKey'),raw=input?.value.trim(),ok=document.getElementById(p+'FreeConfirm')?.checked;
  if(!raw){signal?.(settings?.lang?.()==='en'?'Paste your API key.':'Вставьте API-ключ '+P[p].name);return;}
  if(!ok){signal?.(settings?.lang?.()==='en'?'First confirm that the key belongs to a free-tier project with no paid billing.':'Сначала подтвердите, что ключ принадлежит бесплатному проекту без платного биллинга.');return;}
  if(p==='nvidia'&&!nvidiaRelayConsent){state.nvidia.status='⚠ Отметь согласие на защищённую передачу ключа через сервер AI Council.';render();return;}
  state[p].status=settings?.lang?.()==='en'?'Checking provider key…':'Проверяю ключ…';render();
  try{
   if(p==='gemini')await verifyGemini(raw);else if(p==='mistral')await verifyMistral(raw);else await verifyNvidia(raw);
   state[p].key=raw;state[p].confirmed=true;localStorage.setItem(P[p].confirm,'true');sessionStorage.setItem(P[p].keyStore,raw);
   if(setup?.getRemember?.())localStorage.setItem(P[p].keyStore,raw);
   else localStorage.removeItem(P[p].keyStore);
   input.value='';state[p].status=p==='nvidia'?
    (settings?.lang?.()==='en'?'✓ NVIDIA DeepSeek trial key verified through consented AI Council relay.':'✓ NVIDIA DeepSeek подключён. Пробный ключ проверен через защищённый ретранслятор.'):
    (settings?.lang?.()==='en'?'Key verified. Free-tier billing must be managed in provider account.':'Ключ проверен. Бесплатность проекта нужно контролировать в кабинете провайдера.');
   await refresh();
  }catch(e){state[p].status='⚠ '+String(e?.message||e).slice(0,180);render();}
 }
 async function disconnect(p){
  state[p].key='';state[p].confirmed=false;state[p].status='';
  sessionStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].confirm);
  const freeBox=document.getElementById(p+'FreeConfirm');if(freeBox)freeBox.checked=false;
  if(p==='nvidia'){nvidiaRelayConsent=false;localStorage.removeItem(RELAY_STORE);}
  await refresh();
 }
 function syncRemember(remember){for(const p of Object.keys(P)){if(!remember)localStorage.removeItem(P[p].keyStore);else if(valid(p))localStorage.setItem(P[p].keyStore,state[p].key);}}
 function init(config){setup=config;settings=config;signal=config.error||(()=>{});read();
  const agree=document.getElementById('nvidiaProxyConsent');
  if(agree)agree.onchange=()=>{nvidiaRelayConsent=!!agree.checked;
   if(nvidiaRelayConsent)localStorage.setItem(RELAY_STORE,'true');
   else localStorage.removeItem(RELAY_STORE);
   if(!nvidiaRelayConsent)state.nvidia.status='Согласие на передачу ключа отключено. DeepSeek больше не используется.';
   render();void refresh();
  };
  for(const p of Object.keys(P)){
   const b=document.getElementById(p+'DirectConnect'),d=document.getElementById(p+'DirectDisconnect');
   if(b)b.onclick=()=>connect(p);if(d)d.onclick=()=>disconnect(p);
  }render();
 }
 function flatten(messages){
  const system=[],user=[];
  for(const m of messages||[]){
   const text=typeof m.content==='string'?m.content:Array.isArray(m.content)?m.content.filter(x=>x.type==='text').map(x=>x.text||'').join('\n'):'';
   if(m.role==='system')system.push(text);else if(m.role==='user')user.push(text);
  }
  return {system:system.join('\n\n'),user:user.join('\n\n')};
 }
 async function call(model,messages,options={}){
  const provider=Object.keys(P).find(k=>P[k].id===model);
  if(!provider||!valid(provider))throw Error('External free-tier provider not connected');
  const max=Math.max(250,Math.min(5000,Number(options.maxTokens)||2700));
  const temp=typeof options.temperature==='number'?options.temperature:.2;
  const {system,user}=flatten(messages);
  const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),Number(options.timeoutMs)||115000);
  try{
   let url,config;
   if(provider==='gemini'){
    url='https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent';
    config={method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':state.gemini.key},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:user}]}],generationConfig:{maxOutputTokens:max}}),signal:ctl.signal};
   }else if(provider==='mistral'){
    url='https://api.mistral.ai/v1/chat/completions';
    config={method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+state.mistral.key},body:JSON.stringify({model:P.mistral.model,messages:[{role:'system',content:system},{role:'user',content:user}],max_tokens:max,temperature:temp}),signal:ctl.signal};
   }else{
    // The NVIDIA-hosted API does not send usable browser CORS headers;
    // never try a direct cross-origin fetch or a hidden paid provider.
    const output=await nvidiaViaRelay(state.nvidia.key,[{role:'system',content:system},{role:'user',content:user}],max,ctl.signal);
    const text=output.choices?.[0]?.message?.content;
    if(!text?.trim())throw Error('NVIDIA DeepSeek returned no text');
    return text.trim();
   }
   const res=await fetch(url,config),o=await res.json().catch(()=>({}));
   if(!res.ok)throw Error(String(o.error?.message||o.message||'Provider error HTTP '+res.status).slice(0,250));
   const answer=provider==='gemini'?(o.candidates||[]).flatMap(x=>x.content?.parts||[]).map(x=>x.text||'').join('\n').trim():
      String(o.choices?.[0]?.message?.content||'').trim();
   if(!answer)throw Error('Provider returned no text: finish_reason='+JSON.stringify(o.candidates?.[0]?.finishReason||o.choices?.[0]?.finish_reason||null));
   return answer;
  }finally{clearTimeout(tid);}
 }
 g.AICouncilExternalProviders={init,models,call,syncRemember,valid,ids:Object.values(P).map(x=>x.id)};
})(globalThis);
