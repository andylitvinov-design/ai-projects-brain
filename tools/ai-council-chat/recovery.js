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
 function sourceForModel(model){const id=String(model||'');
   if(id.startsWith('mistral-direct/'))return 'mistral';
   if(id.startsWith('google-direct/'))return 'gemini';
   if(id.startsWith('nvidia-direct/'))return 'nvidia';
   return 'openrouter';
 }
 function sourceForRound(round){
   const failed=(round?.answers||[]).filter(a=>has429(a.error)).map(a=>sourceForModel(a.model));
   if(has429(round?.synthesisError))failed.push(sourceForModel(round.synthesisModel||state.models[3]));
   const set=[...new Set(failed)];
   return set.length===1?set[0]:set.length>1?'mixed':null;
 }
 function providerText(kind,label){
   const ru=state.lang==='ru';
   const name={mistral:'Mistral',gemini:'Gemini',nvidia:'NVIDIA DeepSeek',openrouter:'OpenRouter',mixed:ru?'Несколько API':'Multiple APIs'}[kind]||'API';
   if(label==='title')return ru?name+': лимит запросов (429)':name+': request limit (429)';
   if(label==='body')return ru?
    'Это ограничение '+name+' или бесплатного тарифного плана. Текущий аудит неполный. Не повторяй сразу: дождись обновления лимита либо выбери другую подключённую модель в настройках. Одновременные вызовы одного провайдера теперь объединяются в один запрос.':
    'The '+name+' provider/free-tier request limit was reached. This audit is incomplete. Do not immediately retry; wait for the quota reset or choose a different connected model. Duplicate roles now use one shared API call.';
   return ru?'Настроить модели':'Change models';
 }
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
  const kind=r?sourceForRound(r):null;
  // Direct provider limits are shown on the selected-model status strip; no duplicate sticky alert.
  if(footer){footer.replaceChildren();footer.classList.toggle('hidden',!r||kind!=='openrouter');}
  if(!r||!wrap)return;
  if(footer&&kind==='openrouter'){
   const info=document.createElement('span');info.textContent=kind==='openrouter'?
     (state.lang==='ru'?'OpenRouter 429: лимит бесплатных запросов':'OpenRouter 429: free tier limit'):
     providerText(kind,'title');
   const {gemini,mistral}=available();
   const directSelected=gemini&&mistral&&state.models.every(id=>[gemini.id,mistral.id].includes(id));
   const action=kind!=='openrouter'
     ?makeButton(providerText(kind,'action'),()=>openSettings(),'recovery-primary')
     :makeButton(!gemini||!mistral?str('connect'):directSelected?(r.siteAudit?str('retry'):str('manual')):str('switch'),
       ()=>{if(!gemini||!mistral)openSettings();else if(directSelected)retry(r);else switchModels();},'recovery-primary');
   footer.append(info,action);
  }
  const panel=document.createElement('section');panel.className='recovery-panel';panel.id='quotaRecoveryPanel';panel.setAttribute('role','alert');
  const title=document.createElement('strong');title.className='recovery-title';title.textContent='⚠ '+(kind==='openrouter'?str('title'):providerText(kind,'title'));panel.append(title);
  const body=document.createElement('p');body.className='recovery-description';body.textContent=kind==='openrouter'?str('body'):providerText(kind,'body');panel.append(body);
  const count=document.createElement('p');count.className='recovery-vision-warning';count.textContent=str('vis');panel.append(count);
  const row=document.createElement('div');row.className='recovery-actions';panel.append(row);
  const {gemini,mistral}=available();
  if(kind!=='openrouter'){
   row.append(makeButton(providerText(kind,'action'),()=>openSettings(),'recovery-primary'));
   const note=document.createElement('small');
   note.textContent=state.lang==='ru'?
     'Сводная, если появилась, опирается только на успешно ответившие модели. Проверь в каждой карточке, что действительно было оценено.':
     'Any synthesis is based only on successful reviewer responses; check individual cards for coverage.';
   panel.append(note);
  }else if(gemini&&mistral){
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
 g.AICouncilQuotaRecovery={available,currentFailure,sourceForRound,switchModels,retry,restoreModels};
})(globalThis);
