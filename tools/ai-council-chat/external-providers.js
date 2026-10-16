'use strict';
/* Optional BYOK direct-provider adapters.
 * Eligibility requires an explicit account free-tier attestation. Key/model access checks
 * do NOT verify account billing or zero cost, so these models have no asserted pricing.
 * Keys stay in browser storage and are sent only to the provider's HTTPS API.
 */
(function(g){
 const P={
  gemini:{name:'Google Gemini 3.8 Flash',id:'google-direct/gemini-3.8-flash:free-tier',model:'gemini-3.8-flash',keyStore:'ai-council-gemini-key',confirm:'ai-council-gemini-free-verified',link:'https://aistudio.google.com/apikey'},
  mistral:{name:'Mistral Small 4',id:'mistral-direct/mistral-small-2603:experiment',model:'mistral-small-2603',keyStore:'ai-council-mistral-key',confirm:'ai-council-mistral-experiment-verified',link:'https://console.mistral.ai/'}
 };
 const state=Object.fromEntries(Object.keys(P).map(p=>[p,{key:'',confirmed:false,verified:false,status:'',version:0,pending:null}]));
 let setup,signal,settings,revision=0;
 const english=()=>settings?.lang?.()==='en';
 function bump(p){state[p].version=++revision;}
 function cancelConnect(p){const pending=state[p].pending;state[p].pending=null;pending?.controller.abort();}
 function clearConsent(p){sessionStorage.removeItem(P[p].confirm);localStorage.removeItem(P[p].confirm);}
 function clearSaved(p){sessionStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].keyStore);clearConsent(p);}
 function saveConnection(p){
  const s=state[p];sessionStorage.setItem(P[p].keyStore,s.key);sessionStorage.setItem(P[p].confirm,'true');
  if(setup?.getRemember?.()){localStorage.setItem(P[p].keyStore,s.key);localStorage.setItem(P[p].confirm,'true');}
  else{localStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].confirm);}
 }
 function getSaved(p){
  const store=P[p],sessionKey=sessionStorage.getItem(store.keyStore);
  if(sessionKey)return {key:sessionKey,confirmed:sessionStorage.getItem(store.confirm)==='true'};
  const key=setup?.getRemember?.()?localStorage.getItem(store.keyStore)||'':'';
  const confirmed=!!key&&localStorage.getItem(store.confirm)==='true';
  if(key){sessionStorage.setItem(store.keyStore,key);if(confirmed)sessionStorage.setItem(store.confirm,'true');else sessionStorage.removeItem(store.confirm);}
  return {key,confirmed};
 }
 function read(){for(const p of Object.keys(P)){cancelConnect(p);bump(p);const s=state[p];const saved=getSaved(p);s.key=saved.key;s.verified=!!s.key;s.confirmed=saved.confirmed;s.status='';}}
 function valid(p){const s=state[p];return !!(s&&s.key&&s.verified&&s.confirmed&&!s.pending);}
 function connectionVersion(model){const p=Object.keys(P).find(k=>P[k].id===model);return p?state[p].version:null;}
 function models(){return Object.keys(P).filter(valid).map(p=>({id:P[p].id,name:P[p].name+(english()?' · billing unverified':' · биллинг не проверен'),architecture:{input_modalities:['text'],output_modalities:['text']},provider:p,freeProviderMode:'user-confirmed',billingVerification:'unverified-account-attestation'}));}
 function render(){for(const p of Object.keys(P)){const s=state[p],d=document.getElementById(p+'DirectStatus'),checkbox=document.getElementById(p+'FreeConfirm'),disconnect=document.getElementById(p+'DirectDisconnect');
  if(checkbox)checkbox.checked=s.confirmed;
  if(disconnect)disconnect.disabled=!s.key&&!s.pending;
  if(d)d.textContent=s.status||(s.key?(english()?'Key connected; account billing is unverified. Free-tier confirmation is required.':'Ключ подключён; биллинг не проверен. Нужно подтверждение бесплатного тарифа.'):(english()?'Not connected':'Не подключён'));
 }}
 async function refresh(){render();try{await setup?.refresh?.();}catch{}}
 function providerError(provider,message,details={}){const error=new Error(message);Object.assign(error,{provider,code:'provider_error',safeMessage:message},details);return error;}
 function statusOf(response){const status=Number(response?.status);return Number.isInteger(status)&&status>=100&&status<=599?status:null;}
 function retryAfterOf(response){const value=response?.headers?.get?.('retry-after');return typeof value==='string'?value.slice(0,128):null;}
 async function responseData(provider,response){
  // Transport status is authoritative, even when the JSON body claims a different code.
  if(!response.ok)throw providerError(provider,'Provider request failed (HTTP '+(statusOf(response)||'unknown')+').',{status:statusOf(response),retryAfter:retryAfterOf(response),code:'provider_http_error'});
  let data;try{data=await response.json();}catch{throw providerError(provider,'Provider returned invalid JSON.',{code:'invalid_response'});}
  if(!data||typeof data!=='object'||Array.isArray(data))throw providerError(provider,'Provider returned an invalid response envelope.',{code:'invalid_response'});
  if(Object.prototype.hasOwnProperty.call(data,'error')&&data.error!=null){
   const terminal=[data.error?.code,data.error?.status,data.error?.status_code,data.status_code].find(value=>Number.isInteger(value)&&[401,402,403,429].includes(value));
   throw providerError(provider,'Provider returned an error response.',{status:terminal||statusOf(response),httpStatus:statusOf(response),retryAfter:retryAfterOf(response),code:'provider_response_error'});
  }
  return data;
 }
 async function verify(p,raw,controller){
  const url=p==='gemini'?'https://generativelanguage.googleapis.com/v1beta/models/'+P[p].model:'https://api.mistral.ai/v1/models';
  const headers=p==='gemini'?{'x-goog-api-key':raw}:{Authorization:'Bearer '+raw};
  const data=await responseData(p,await fetch(url,{headers,signal:controller.signal,redirect:'error',credentials:'omit'}));
  if(p==='gemini'){
   if(typeof data.name!=='string'||!data.name.trim())throw providerError(p,'Provider returned invalid model metadata.',{code:'invalid_response'});
  }else{
   if(!Array.isArray(data.data))throw providerError(p,'Provider returned an invalid models list.',{code:'invalid_response'});
   if(!data.data.some(model=>model&&(model.id===P[p].model||(Array.isArray(model.aliases)&&model.aliases.includes(P[p].model)))))throw providerError(p,'Model is not accessible in this Mistral account.',{code:'model_unavailable'});
  }
 }
 async function connect(p){
  const s=state[p],input=document.getElementById(p+'DirectKey'),raw=input?.value.trim(),ok=!!document.getElementById(p+'FreeConfirm')?.checked;
  cancelConnect(p);bump(p);s.confirmed=ok;
  if(!ok)clearConsent(p);
  if(!raw){s.status='';render();signal?.(english()?'Paste your API key.':'Вставьте API-ключ '+P[p].name);return;}
  if(!ok){s.status='';await refresh();signal?.(english()?'First confirm that the key belongs to a free-tier project with no paid billing.':'Сначала подтвердите, что ключ принадлежит бесплатному проекту без платного биллинга.');return;}
  // A replacement cannot fall back to an old key or inherit persisted eligibility.
  s.key='';s.verified=false;clearSaved(p);
  const attempt={controller:new AbortController(),version:s.version};s.pending=attempt;
  s.status=english()?'Checking provider key…':'Проверяю ключ…';render();
  const tid=setTimeout(()=>attempt.controller.abort(),18000);
  try{
   await verify(p,raw,attempt.controller);
   if(attempt.controller.signal.aborted)throw providerError(p,'Provider connection check was cancelled.',{code:'request_aborted'});
   if(s.pending!==attempt||s.version!==attempt.version||!s.confirmed||!document.getElementById(p+'FreeConfirm')?.checked)return;
   s.pending=null;s.key=raw;s.verified=true;bump(p);
   saveConnection(p);
   input.value='';s.status=english()?'Key access checked. Account billing remains unverified; manage free-tier limits in the provider account.':'Доступ по ключу проверен. Биллинг не проверен; контролируйте бесплатный тариф в кабинете провайдера.';
   await refresh();
  }catch(e){
   if(s.pending!==attempt||s.version!==attempt.version)return;
   s.pending=null;s.confirmed=false;clearConsent(p);
   s.status='⚠ '+(e?.safeMessage||(english()?'Provider connection failed. Check the key and account in the provider console.':'Не удалось подключиться. Проверьте ключ и аккаунт в кабинете провайдера.'));await refresh();
  }finally{clearTimeout(tid);}
 }
 async function disconnect(p){
  cancelConnect(p);bump(p);Object.assign(state[p],{key:'',confirmed:false,verified:false,status:''});clearSaved(p);await refresh();
 }
 async function changeConsent(p,checked){
  cancelConnect(p);bump(p);const s=state[p];s.confirmed=!!checked;s.status='';
  if(s.confirmed&&s.verified&&s.key)saveConnection(p);else clearConsent(p);
  await refresh();
 }
 function syncRemember(remember){for(const p of Object.keys(P)){
  if(!remember){localStorage.removeItem(P[p].keyStore);localStorage.removeItem(P[p].confirm);}
  else if(valid(p)){localStorage.setItem(P[p].keyStore,state[p].key);localStorage.setItem(P[p].confirm,'true');}
 }}
 function init(config){setup=config;settings=config;signal=config.error||(()=>{});read();
  for(const p of Object.keys(P)){
   const b=document.getElementById(p+'DirectConnect'),d=document.getElementById(p+'DirectDisconnect'),checkbox=document.getElementById(p+'FreeConfirm'),input=document.getElementById(p+'DirectKey');
   if(b)b.onclick=()=>connect(p);if(d)d.onclick=()=>disconnect(p);
   if(checkbox)checkbox.onchange=()=>changeConsent(p,checkbox.checked);
   // Editing a replacement must not let its attestation re-enable the previous key.
   if(input)input.oninput=()=>{if(state[p].key||state[p].confirmed||state[p].pending||checkbox?.checked)return disconnect(p);};
  }render();
 }
 function flatten(messages){
  const system=[],user=[];
  for(const m of messages||[]){
   const text=typeof m.content==='string'?m.content:Array.isArray(m.content)?m.content.filter(x=>x&&x.type==='text'&&typeof x.text==='string').map(x=>x.text).join('\n'):'';
   if(m.role==='system')system.push(text);else if(m.role==='user')user.push(text);
  }
  return {system:system.join('\n\n'),user:user.join('\n\n')};
 }
 function checkConnection(provider,expected){
  if(!valid(provider))throw providerError(provider,'External free-tier provider is not connected or confirmed.',{code:'provider_not_connected',safetyFailure:true});
  if(expected!==undefined&&state[provider].version!==expected)throw providerError(provider,'Provider connection changed. Queue a new request with the current connection.',{code:'connection_changed',safetyFailure:true});
 }
 function answerText(provider,data){
  let answer='';
  if(provider==='gemini'){
   const parts=data.candidates?.[0]?.content?.parts;
   if(!Array.isArray(data.candidates)||!Array.isArray(parts))throw providerError(provider,'Provider returned an invalid answer envelope.',{code:'invalid_response'});
   answer=parts.filter(part=>part&&part.thought!==true&&typeof part.text==='string').map(part=>part.text).join('\n').trim();
  }else{
   const content=data.choices?.[0]?.message?.content;
   if(!Array.isArray(data.choices)||!(typeof content==='string'||Array.isArray(content)))throw providerError(provider,'Provider returned an invalid answer envelope.',{code:'invalid_response'});
   answer=(typeof content==='string'?content:content.filter(part=>part&&part.type==='text'&&typeof part.text==='string').map(part=>part.text).join('\n')).trim();
  }
  if(!answer)throw providerError(provider,'Provider returned no final text.',{code:'empty_response'});
  return answer;
 }
 function responseEvidence(provider,model,data,key){
  const reported=provider==='gemini'?data.modelVersion:data.model;
  const reportedModel=typeof reported==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:/@+-]{0,159}$/.test(reported)&&!reported.includes(key)?reported:null;
  const usage=provider==='gemini'?data.usageMetadata:data.usage,reportedUsage={};
  const counters=provider==='gemini'?['promptTokenCount','candidatesTokenCount','totalTokenCount','cachedContentTokenCount','thoughtsTokenCount','toolUsePromptTokenCount']:['prompt_tokens','completion_tokens','total_tokens'];
  for(const name of counters){const count=usage?.[name];if(Number.isSafeInteger(count)&&count>=0)reportedUsage[name]=count;}
  return {provider,requested_model:model,requested_provider_model:P[provider].model,reported_model:reportedModel,reported_usage:reportedUsage,billing_verified:false,model_identity_verified:false};
 }
 async function call(model,messages,options={}){
  const provider=Object.keys(P).find(k=>P[k].id===model);
  if(!provider)throw providerError(null,'Unknown external provider model.',{code:'provider_not_connected',safetyFailure:true});
  checkConnection(provider,options.expectedConnectionVersion);
  const version=state[provider].version,key=state[provider].key;
  const max=Math.max(250,Math.min(5000,Number(options.maxTokens)||2700));
  const temp=typeof options.temperature==='number'?options.temperature:.2;
  const {system,user}=flatten(messages);
  const ctl=new AbortController(),tid=setTimeout(()=>ctl.abort(),Number(options.timeoutMs)||115000);
  try{
   let url,config;
   if(provider==='gemini'){
    url='https://generativelanguage.googleapis.com/v1beta/models/'+P[provider].model+':generateContent';
    config={method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:user}]}],generationConfig:{temperature:temp,maxOutputTokens:max}}),signal:ctl.signal,redirect:'error',credentials:'omit'};
   }else{
    url='https://api.mistral.ai/v1/chat/completions';
    config={method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify({model:P[provider].model,messages:[{role:'system',content:system},{role:'user',content:user}],max_tokens:max,temperature:temp}),signal:ctl.signal,redirect:'error',credentials:'omit'};
   }
   // No await between this fence and dispatch: queued work may never adopt a new key.
   checkConnection(provider,options.expectedConnectionVersion);checkConnection(provider,version);
   options.onDispatch?.();
   checkConnection(provider,version); // Also reject synchronous revocation inside a callback.
   const data=await responseData(provider,await fetch(url,config)),answer=answerText(provider,data);
   try{options.onResponseEvidence?.(responseEvidence(provider,model,data,key));}catch{}
   return answer;
  }catch(e){
   if(e?.safeMessage)throw e;
   throw providerError(provider,e?.name==='AbortError'?'Provider request timed out or was cancelled.':'Could not reach provider. Check the connection and provider status.',{code:e?.name==='AbortError'?'request_aborted':'network_error'});
  }finally{clearTimeout(tid);}
 }
 g.AICouncilExternalProviders={init,models,call,syncRemember,valid,connectionVersion,ids:Object.values(P).map(x=>x.id)};
})(globalThis);
