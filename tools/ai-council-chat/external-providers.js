'use strict';
/* Optional BYOK direct-provider adapters.
 * NEVER enabled automatically, only after user confirms their account is on the provider's FREE API tier.
 * This app cannot verify whether an external project's billing has been enabled. Users must confirm it.
 * No credentials are sent to AI Council/Vercel, and no paid OpenRouter model can be selected here.
 */
(function(g){
 const P={
  gemini:{name:'Google Gemini 3.8 Flash',id:'google-direct/gemini-3.8-flash:free-tier',model:'gemini-3.8-flash',keyStore:'ai-council-gemini-key',confirm:'ai-council-gemini-free-verified',link:'https://aistudio.google.com/apikey'},
  mistral:{name:'Mistral Small 4',id:'mistral-direct/mistral-small-2603:experiment',model:'mistral-small-2603',keyStore:'ai-council-mistral-key',confirm:'ai-council-mistral-experiment-verified',link:'https://console.mistral.ai/'},
  nvidia:{name:'DeepSeek V4.1 Flash (NVIDIA NIM trial)',id:'nvidia-direct/deepseek-v4.1-flash:trial',model:'deepseek-ai/deepseek-v4.1-flash',keyStore:'ai-council-nvidia-nim-key',confirm:'ai-council-nvidia-trial-confirmed',link:'https://build.nvidia.com/deepseek-ai/deepseek-v4.1-flash/playground'}
 };
 const state={gemini:{key:'',confirmed:false,status:''},mistral:{key:'',confirmed:false,status:''},nvidia:{key:'',confirmed:false,status:''}};
 let setup,signal,settings;
 function getSaved(p){const store=P[p];const remember=setup?.getRemember?.()||false;return sessionStorage.getItem(store.keyStore)||(remember?localStorage.getItem(store.keyStore)||'':'');}
 function read(){for(const p of Object.keys(P)){state[p].key=getSaved(p);state[p].confirmed=localStorage.getItem(P[p].confirm)==='true';}}
 function valid(p){return !!state[p].key&&state[p].confirmed;}
 function models(){return Object.keys(P).filter(valid).map(p=>({id:P[p].id,name:P[p].name+(p==='gemini'?' · AI Studio Free Tier':p==='mistral'?' · Experiment Free Tier':' · NVIDIA NIM free trial (limited)'),pricing:{prompt:'0',completion:'0'},architecture:{input_modalities:['text'],output_modalities:['text']},provider:p,freeProviderMode:'user-confirmed'}));}
 function render(){for(const p of Object.keys(P)){const d=document.getElementById(p+'DirectStatus'),checkbox=document.getElementById(p+'FreeConfirm'),disconnect=document.getElementById(p+'DirectDisconnect');
  if(checkbox)checkbox.checked=state[p].confirmed;
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
 async function verifyNvidia(raw){
  // NVIDIA NIM trial free endpoint uses OpenAI-compatible POST; tiny challenge
  // verifies model access instead of trusting a key that merely exists.
  const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),22000);
  try {
    const res=await fetch('https://integrate.api.nvidia.com/v1/chat/completions',{
      method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+raw},
      body:JSON.stringify({model:P.nvidia.model,messages:[{role:'user',content:'Say OK.'}],max_tokens:24,stream:false}),signal:ctl.signal
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw Error(String(data.error?.message||data.detail||data.message||'HTTP '+res.status).slice(0,190));
    if(!Array.isArray(data.choices)||!data.choices.length)throw Error('NVIDIA NIM model did not return a completion');
  }finally{clearTimeout(tid);}
 }
 async function connect(p){
  const input=document.getElementById(p+'DirectKey'),raw=input?.value.trim(),ok=document.getElementById(p+'FreeConfirm')?.checked;
  if(!raw){signal?.(settings?.lang?.()==='en'?'Paste your API key.':'Вставьте API-ключ '+P[p].name);return;}
  if(!ok){signal?.(settings?.lang?.()==='en'?'First confirm that the key belongs to a free-tier project with no paid billing.':'Сначала подтвердите, что ключ принадлежит бесплатному проекту без платного биллинга.');return;}
  state[p].status=settings?.lang?.()==='en'?'Checking provider key…':'Проверяю ключ…';render();
  try{
   if(p==='gemini')await verifyGemini(raw);else if(p==='mistral')await verifyMistral(raw);else await verifyNvidia(raw);
   state[p].key=raw;state[p].confirmed=true;localStorage.setItem(P[p].confirm,'true');sessionStorage.setItem(P[p].keyStore,raw);
   if(setup?.getRemember?.())localStorage.setItem(P[p].keyStore,raw);
   else localStorage.removeItem(P[p].keyStore);
   input.value='';state[p].status=settings?.lang?.()==='en'?'Key verified. Free-tier billing must be managed in provider account.':'Ключ проверен. Бесплатность проекта нужно контролировать в кабинете провайдера.';
   await refresh();
  }catch(e){state[p].status='⚠ '+String(e?.message||e).slice(0,180);render();}
 }
 async function disconnect(p){
  state[p].key='';state[p].confirmed=false;state[p].status='';
  sessionStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].confirm);
  await refresh();
 }
 function syncRemember(remember){for(const p of Object.keys(P)){if(!remember)localStorage.removeItem(P[p].keyStore);else if(valid(p))localStorage.setItem(P[p].keyStore,state[p].key);}}
 function init(config){setup=config;settings=config;signal=config.error||(()=>{});read();
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
    url='https://integrate.api.nvidia.com/v1/chat/completions';
    config={method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+state.nvidia.key},body:JSON.stringify({model:P.nvidia.model,messages:[{role:'system',content:system},{role:'user',content:user}],max_tokens:max,stream:false,temperature:1,top_p:0.95}),signal:ctl.signal};
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
