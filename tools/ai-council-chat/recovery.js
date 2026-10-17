'use strict';
/* Explicit, zero-surprise recovery from OpenRouter free rate limits.
 * It NEVER calls AI models on its own. Only the user's "run again" click does.
 * No paid OpenRouter fallbacks; only user-connected, confirmed free-tier keys.
 */
(function(g){
 const PREVIOUS='ai-council-previous-reviewer-panel';
 const view={
 ru:{title:'OpenRouter отклонил запросы (429)',body:'Это лимит аккаунта или бесплатного провайдера OpenRouter. Число «Локально» показывает только запросы из этого браузера, а не оставшуюся квоту всего аккаунта. Анализ не завершён — не считай его ТЗ окончательным.',connect:'Подключить Gemini / Mistral',switch:'Переключиться на Gemini + Mistral',retry:'Повторить аудит с новыми моделями',manual:'Повторить вопрос',two:'Обе модели должны быть подключены и разрешены для бесплатного тарифа. Если доступна только одна, полного независимого совета не будет.',selected:'Выбран Gemini + Mistral: 3 рецензии двумя независимыми моделями и Gemini для итогового ТЗ. Запросы начнутся только после кнопки «Повторить».',restore:'Вернуть прошлый состав',restored:'Предыдущий состав восстановлен.',vis:'Важно: по прямому API Gemini/Mistral передаётся текстовый HTML-аудит; визуальные снимки этих моделей пока не анализируются. Не доверяй выводам о внешнем виде без отдельной проверки.',wait:'Дождись завершения текущего запроса.',unavailable:'Подключи оба API в настройках. На платные модели приложение не переходит.'},
 en:{title:'OpenRouter rejected requests (429)',body:'This is an OpenRouter account/provider free-tier rate limit. The local count is only calls from this browser, not your account-wide remaining quota. The audit is incomplete; do not treat this as the final technical specification.',connect:'Connect Gemini / Mistral',switch:'Switch to Gemini + Mistral',retry:'Rerun audit with selected models',manual:'Retry question',two:'Both providers must be connected and affirmed as Free Tier to keep independently sourced reviews.',selected:'Gemini and Mistral selected: three role-specific opinions from two independent models, with Gemini for final specs. No calls will be made until you explicitly retry.',restore:'Restore previous panel',restored:'Previous models restored.',vis:'Direct Gemini/Mistral currently receive textual HTML evidence, not visual screenshot inputs. Visual conclusions need a separate browser inspection.',wait:'Wait for the current request to finish.',unavailable:'Connect both provider APIs first. No paid fallback is used.'}
 };
 const str=k=>(view[state.lang]||view.ru)[k]||k;
 const has429=a=>/(\b429\b|rate limit|лимит бесплатн|free quota|quota exceeded|too many requests)/i.test(String(a||''));
 function available(){
  const connected=g.AICouncilExternalProviders?.models?.()||[];
  return {gemini:connected.find(x=>x.id==='google-direct/gemini-3.8-flash:free-tier'),
    mistral:connected.find(x=>x.id==='mistral-direct/mistral-small-2603:experiment')};
 }
 function currentFailure(){
  const th=current();if(!th?.rounds?.length)return null;
  const r=th.rounds.at(-1);
  if(!r)return null;
  const errors=[...(r.answers||[]).map(a=>a.error||''),r.synthesisError||''];
  return errors.some(has429)?r:null;
 }
 function switchModels(){
  if(busy){setError(str('wait'));return false;}
  const {gemini,mistral}=available();
  if(!gemini||!mistral){setError(str('unavailable'));openSettings();return false;}
  if(!localStorage.getItem(PREVIOUS))localStorage.setItem(PREVIOUS,JSON.stringify(state.models.slice()));
  // Three review lenses but two actual providers; never claim three independent model families.
  state.models=[gemini.id,mistral.id,mistral.id,gemini.id];
  persist();fillModelSelects();setError('');
  const area=document.getElementById('recoveryMessage');if(area)area.textContent=str('selected');
  renderMessages();
  return true;
 }
 function restoreModels(){
  const old=safeJson(localStorage.getItem(PREVIOUS),null);
  if(!Array.isArray(old)||old.length!==4)return;
  state.models=old;localStorage.removeItem(PREVIOUS);persist();fillModelSelects();renderMessages();setError(str('restored'));
 }
 function retry(round){
  if(busy){setError(str('wait'));return;}
  const {gemini,mistral}=available();
  if(!gemini||!mistral||!state.models.every(id=>[gemini.id,mistral.id].includes(id))){setError(str('unavailable'));return;}
  // Keep previous failed conversation and its reviewer error evidence intact.
  const original=(round?.question||''),url=round?.siteAudit?.summary?.target||'https://holistichouse.vercel.app';
  state.active=null;persist();renderAll();
  el('question').value='';
  if(round?.siteAudit){el('siteUrl').value=url;el('auditSiteButton').click();}
  else{el('question').value=original;el('sendButton').click();}
 }
 function makeButton(title,fn,variant){
  const b=document.createElement('button');b.type='button';b.className='recovery-btn '+(variant||'');b.textContent=title;b.onclick=fn;return b;
 }
 function render(){
  const r=currentFailure(),wrap=el('messages'),footer=el('quotaFooterBanner');
  if(footer){footer.replaceChildren();footer.classList.toggle('hidden',!r);}
  if(!r||!wrap)return;
  if(footer){
   const info=document.createElement('span');info.textContent=state.lang==='ru'?'OpenRouter 429: лимит бесплатных запросов':'OpenRouter 429: free tier limit';
   const {gemini,mistral}=available();
   const directSelected=gemini&&mistral&&state.models.every(id=>[gemini.id,mistral.id].includes(id));
   const action=makeButton(!gemini||!mistral?str('connect'):directSelected?(r.siteAudit?str('retry'):str('manual')):str('switch'),
     ()=>{if(!gemini||!mistral)openSettings();else if(directSelected)retry(r);else switchModels();},'recovery-primary');
   footer.append(info,action);
  }
  const panel=document.createElement('section');panel.className='recovery-panel';panel.id='quotaRecoveryPanel';panel.setAttribute('role','alert');
  const title=document.createElement('strong');title.className='recovery-title';title.textContent='⚠ '+str('title');panel.append(title);
  const body=document.createElement('p');body.className='recovery-description';body.textContent=str('body');panel.append(body);
  const count=document.createElement('p');count.className='recovery-vision-warning';count.textContent=str('vis');panel.append(count);
  const row=document.createElement('div');row.className='recovery-actions';panel.append(row);
  const {gemini,mistral}=available();
  if(gemini&&mistral){
   row.append(makeButton(str('switch'),switchModels,'recovery-primary'));
   row.append(makeButton(r?.siteAudit?str('retry'):str('manual'),()=>retry(r),'recovery-secondary'));
   const selected=state.models.every(id=>[gemini.id,mistral.id].includes(id));
   const note=document.createElement('small');note.id='recoveryMessage';note.textContent=selected?str('selected'):str('two');panel.append(note);
  }else{
   row.append(makeButton(str('connect'),()=>openSettings(),'recovery-primary'));
   const small=document.createElement('small');small.textContent=str('two');panel.append(small);
  }
  if(localStorage.getItem(PREVIOUS))row.append(makeButton(str('restore'),restoreModels,'recovery-secondary'));
  wrap.append(panel);
 }
 const previous=renderMessages;
 renderMessages=function(){previous();render();};
 g.AICouncilQuotaRecovery={available,currentFailure,switchModels,retry,restoreModels};
})(globalThis);
