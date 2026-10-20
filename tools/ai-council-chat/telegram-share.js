/* User-initiated Telegram sharing of REAL AI Council outputs. No bot token in browser. */
(function(global){
  'use strict';
  const MAX_LINK_TEXT=2600;
  const MAX_REPORT=120000;
  function redact(value){
    return String(value||'')
      .replace(/sk-or-v1-[a-z0-9_-]{12,}/gi,'[REDACTED_OPENROUTER_KEY]')
      .replace(/nvapi-[a-z0-9._-]{12,}/gi,'[REDACTED_NVIDIA_KEY]')
      .replace(/AIza[0-9A-Za-z_-]{25,}/g,'[REDACTED_GOOGLE_KEY]')
      .replace(/\b\d{7,12}:[A-Za-z0-9_-]{20,}\b/g,'[REDACTED_TELEGRAM_TOKEN]');
  }
  function reportMarkdown(round){
    const out=['# AI Council — сообщения для Telegram','','Дата экспорта: '+new Date().toISOString(),'','## Запрос',String(round?.question||''),''];
    for(const answer of (Array.isArray(round?.answers)?round.answers:[])){
      const id=String(answer?.model||'unknown');
      out.push('## '+id);
      if(answer.status==='ok' && typeof answer.text==='string' && answer.text.trim())
        out.push(answer.text);
      else out.push('[Нет подтверждённого ответа: '+String(answer.status||'unknown')+']');
      out.push('');
    }
    if(typeof round?.museManual==='string' && round.museManual.trim()){
      out.push('## Личный Muse — ручная вставка','',round.museManual.trim(),'');
    }
    if(round?.synthesisStatus==='ok' && round.synthesis){
      out.push('## Сводка (сформирована без ручного ответа Muse, если он добавлен позже)','',String(round.synthesis),'');
    }
    if(round?.tz)out.push('## Техническое задание','',String(round.tz),'');
    out.push('Источники: только реальные ответы, полученные в AI Council, и явно вставленный пользователем Muse.','');
    return redact(out.join('\n'));
  }
  function telegramUrl(text){
    const safe=redact(text);
    if(!safe || safe.length>MAX_LINK_TEXT) return null; // Never silently truncate an answer.
    return 'https://t.me/share/url?text='+encodeURIComponent(safe);
  }
  async function share(title,body,ru){
    const text=redact(body);
    if(text.length>MAX_REPORT)return {status:'too_long'};
    if(!text.trim())return {status:'empty'};
    const file=(typeof File==='function')?new File([text],'ai-council-report.md',{type:'text/markdown'}):null;
    if(file && typeof navigator!=='undefined' && typeof navigator.share==='function' &&
       typeof navigator.canShare==='function' && (()=>{try{return navigator.canShare({files:[file]});}catch{return false;}})()){
      try{await navigator.share({title,files:[file],text:ru?'AI Council — файл с реальными ответами':'AI Council — real responses attached'});
        return {status:'chooser'}; // Native share resolving is NOT proof of Telegram delivery.
      }catch(error){if(error?.name==='AbortError')return {status:'cancelled'};}
    }
    if(text.length>MAX_LINK_TEXT)return {status:'too_long'}; // No opaque OS text-length truncation without file share.
    if(typeof navigator!=='undefined' && typeof navigator.share==='function'){
      try{await navigator.share({title,text});return {status:'chooser'};}
      catch(error){if(error?.name==='AbortError')return {status:'cancelled'};}
    }
    const url=telegramUrl(text);
    if(!url)return {status:'too_long'};
    if(typeof global.open==='function')global.open(url,'_blank','noopener,noreferrer');
    return {status:'chooser'};
  }
  function el(tag,cls,text){const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x;}
  function action(label,handler){const b=el('button','action-button',label);b.type='button';b.addEventListener('click',handler);return b;}
  function enhanceRound(block,round,options={}){
    if(typeof document==='undefined'||!block||!round)return;
    const ru=options.lang!=='en',prefix=ru?'↗ Telegram':'↗ Telegram';
    const notify=message=>{const n=block.querySelector('.telegram-share-status');if(n)n.textContent=message;};
    async function dispatch(title,text){
      const result=await share(title,text,ru);
      const messages=ru?{
        chooser:'Открой Telegram, выбери чат и подтверди отправку. Доставка ботом не выполнялась.',
        cancelled:'Отправка отменена.',
        too_long:'Ответ слишком длинный для Telegram-ссылки. Скачай .md или открой сайт на iPhone и поделись файлом.',
        empty:'Пока нечего отправлять.'
      }:{
        chooser:'Choose Telegram, select a chat and confirm. No automatic bot delivery occurred.',
        cancelled:'Sharing cancelled.',
        too_long:'Too long for a Telegram link. Export .md or share as a file on your phone.',
        empty:'Nothing to share yet.'
      };
      notify(messages[result.status]||messages.empty);
    }
    const grid=block.querySelector('.review-grid');
    if(grid){
      const cards=grid.querySelectorAll('.review-card');
      (round.answers||[]).forEach((answer,index)=>{
        if(answer?.status!=='ok' || !String(answer.text||'').trim() || !cards[index])return;
        const title='AI Council / '+String(answer.model||'Model');
        cards[index].append(action(prefix,()=>dispatch(title,'# '+title+'\n\nВопрос: '+String(round.question||'')+'\n\n'+answer.text)));
      });
    }
    const synth=block.querySelector('.synthesis');
    if(!synth)return;
    if(round.answers?.some(a=>a.status==='pending')||round.synthesisStatus==='pending')return;
    const panel=el('details','muse-manual-panel');
    const summary=el('summary','',ru?'Добавить ответ личного Muse (вручную)':'Add personal Muse reply (manual)');
    panel.append(summary);
    const input=el('textarea','muse-manual-input');
    input.rows=4;input.maxLength=16000;input.value=round.museManual||'';
    input.placeholder=ru?'Вставь реальный ответ Muse на этот вопрос (без приватных данных)':'Paste Muse\'s actual answer to this question (no private information)';
    input.setAttribute('aria-label',input.placeholder);
    panel.append(input);
    const saveBtn=action(ru?'Сохранить мнение Muse':'Save Muse reply',()=>{
      const value=input.value.trim();
      if(!value){notify(ru?'Вставь ответ Muse перед сохранением.':'Paste the Muse response first.');return;}
      round.museManual=value;
      options.save?.();
      void maybeAutoSend(round,options.save);
      options.rerender?.();
    });
    panel.append(saveBtn);
    const hint=el('div','source-note',ru?
      'Это ручной импорт, не API Muse. Ответ привязан к данному вопросу; ранее созданная сводка не пересчитывается автоматически.':
      'Manual import, not Muse API. Bound to this question; older synthesis is not updated automatically.');
    panel.append(hint);synth.append(panel);
    if(round.museManual){
      const card=el('div','muse-manual-saved');
      card.append(el('strong','',ru?'Личный Muse · вручную':'Personal Muse · manual'));
      card.append(el('div','muse-manual-text',round.museManual));
      card.append(action(prefix,()=>dispatch('AI Council / Personal Muse','Вопрос: '+String(round.question||'')+'\n\n'+round.museManual)));
      synth.append(card);
    }
    if((round.answers||[]).some(a=>a.status==='ok')||round.museManual){
      synth.append(action(ru?'↗ Telegram · весь отчёт':'↗ Telegram · full report',
        ()=>dispatch('AI Council — full report',reportMarkdown(round))));
      synth.append(action(ru?'Отправить ботом в мой чат':'Send via my Telegram bot',
        ()=>void maybeAutoSend(round,options.save,true,notify)));
    }
    const status=el('div','telegram-share-status');status.setAttribute('role','status');
    status.textContent=round.telegramBotError?'Ошибка отправки ботом: '+round.telegramBotError:
      round.telegramBotBaseAccepted?'Telegram Bot API принял отправку '+round.telegramBotBaseAccepted+' UTC.':'';
    synth.append(status);
  }

  // Optional, owner-gated serverless Telegram Bot API delivery. Disabled until explicitly
  // configured on the existing Vercel project. No bot token or access key is persisted here.
  let ownerAccessKey='', autoEnabled=false;
  const inFlight=new WeakSet();
  function acceptedAnswers(round){
    return (Array.isArray(round?.answers)?round.answers:[]).filter(a=>a.status==='ok'&&String(a.text||'').trim());
  }
  function complete(round){
    return !!round && (round.answers||[]).every(a=>a.status!=='pending') &&
      round.synthesisStatus!=='pending' && acceptedAnswers(round).length>0;
  }
  function sources(round){
    const list=acceptedAnswers(round).map(x=>String(x.model||'unknown'));
    if(round?.museManual)list.push('manual:muse');
    return list.slice(0,6);
  }
  async function relay(body){
    const key=ownerAccessKey;
    if(key.length<32)throw new Error('First enter your private Telegram relay access key in settings.');
    const response=await fetch('./api/telegram-deliver',{
      method:'POST',redirect:'error',credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',
      headers:{'content-type':'application/json','x-council-telegram-access':key},
      body:JSON.stringify(body),signal:AbortSignal.timeout(22000)
    });
    const data=await response.json().catch(()=>null);
    if(!response.ok || data?.ok!==true){
      const status=response.status;
      if(status===401||status===403){autoEnabled=false;throw new Error('Owner Telegram access denied ('+status+'). Check the access key and allowed site domain.');}
      if(status===422)throw new Error('Telegram bot or private owner account is not verified. Check @Andydotbot and @AndyTherapist before enabling sends.');
      if(status===503)throw new Error('Telegram Bot API delivery is not enabled/configured on the Vercel server.');
      if(status===413)throw new Error('Report too large for Telegram relay.');
      throw new Error('Telegram Bot API delivery failed (HTTP '+status+').');
    }
    return data;
  }
  function connected(){return ownerAccessKey.length>=32;}
  async function maybeAutoSend(round,save,manual=false,onStatus=()=>{}){
    if(!manual&&!autoEnabled)return;
    if(!connected()){onStatus('Настрой ключ отправки Telegram в параметрах.');return;}
    if(!complete(round)){if(manual)onStatus('Нет завершённых ответов для отправки.');return;}
    if(inFlight.has(round)){if(manual)onStatus('Предыдущая отправка ещё выполняется.');return;}
    const hasMuse=typeof round.museManual==='string'&&round.museManual.trim();
    let type='base';
    if(round.telegramBotBaseAccepted){
      if(hasMuse && round.telegramBotMuseSentText!==round.museManual)type='muse';
      else if(!manual)return;
    }
    const attempt=type==='base'?'base':'muse:'+round.museManual;
    if(!manual && round.telegramBotLastAttempt===attempt)return; // No background retry storms.
    const text=type==='muse'?'# Личный Muse — ручной ответ\n\nВопрос: '+String(round.question||'')+'\n\n'+round.museManual:reportMarkdown(round);
    if(text.length>88000){onStatus('Отчёт длиннее лимита Telegram Bot API. Используй файл/экспорт.');return;}
    round.telegramBotLastAttempt=attempt;
    save?.();
    inFlight.add(round);
    onStatus('Отправляем отчёт боту Telegram…');
    try{
      await relay({mode:'report',title:type==='muse'?'Manual Muse reply':'AI Council replies',
        markdown:redact(text),sources:type==='muse'?['manual:muse']:sources(round)});
      if(type==='base'){
        round.telegramBotBaseAccepted=new Date().toISOString();
        if(hasMuse)round.telegramBotMuseSentText=round.museManual;
      }else round.telegramBotMuseSentText=round.museManual;
      round.telegramBotError='';
      save?.();
      onStatus('Telegram Bot API принял документ. Прочтение в чате нужно проверить.');
    }catch(error){
      round.telegramBotError=String(error?.message||'Delivery failed').slice(0,200);
      save?.();
      onStatus('Не отправлено: '+round.telegramBotError+' При необходимости нажми «Ботом в мой чат» повторно.');
    }finally{inFlight.delete(round);}
  }
  function setupBotPanel(){
    const settings=document.getElementById('settingsDialog');
    if(!settings||document.getElementById('councilTelegramBotSettings'))return;
    const panel=document.createElement('section');panel.id='councilTelegramBotSettings';
    panel.className='external-provider telegram-bot-settings';
    const heading=document.createElement('h3');heading.textContent='Telegram · мой личный бот';panel.append(heading);
    const help=document.createElement('p');help.className='small muted';
    help.textContent='Дополнительная прямая доставка: после настройки владельцем Telegram Bot API и ключа доступа на сервере Vercel. Сам токен бота сюда НЕ вводи.';
    panel.append(help);
    const label=document.createElement('label');label.htmlFor='councilTelegramAccess';
    label.textContent='Ключ доступа AI Council (не Telegram bot token)';
    panel.append(label);
    const input=document.createElement('input');input.type='password';input.id='councilTelegramAccess';
    input.autocomplete='off';input.spellcheck=false;input.placeholder='Твой отдельный ключ доступа (32+ символа)';
    input.addEventListener('input',()=>{
      ownerAccessKey=input.value.trim();autoEnabled=false;box.checked=false;
      status.textContent=connected()?'Ключ введён только в памяти этой вкладки. Проверь серверное подключение.':'Введи ключ доступа; не токен бота.';
    });
    panel.append(input);
    const checkLabel=document.createElement('label');checkLabel.className='rowlabel';
    const box=document.createElement('input');box.type='checkbox';box.id='councilTelegramAuto';
    box.addEventListener('change',()=>{
      if(box.checked&&!connected()){box.checked=false;status.textContent='Сначала введи ключ доступа.';}
      autoEnabled=box.checked && connected();
      if(autoEnabled)status.textContent='Автодоставка включена для НОВЫХ публичных ответов в этой открытой вкладке. Никакие старые беседы не отправлены.';
    });
    const checkText=document.createElement('span');
    checkText.textContent='Автоматически отправлять новые публичные ответы в мой Telegram, когда я работаю в AI Council';
    checkLabel.append(box,checkText);panel.append(checkLabel);
    const danger=document.createElement('p');danger.className='small muted';
    danger.textContent='Не отправляй медицинские, клиентские, персональные и секретные данные. Это не синхронизация сторонних аккаунтов Mistral/Gemini/Muse. При закрытой вкладке ответы не генерируются.';
    panel.append(danger);
    const test=document.createElement('button');test.type='button';test.className='outline-button';
    test.textContent='Проверить подключение (без отправки)';
    test.addEventListener('click',async()=>{
      test.disabled=true;status.textContent='Проверяем защищённый канал…';
      try{
        const r=await relay({mode:'probe'});
        status.textContent=r.configured?
          (r.delivery_enabled?
            'BotFather подтвердил @Andydotbot и личный чат @AndyTherapist. Отправка включена, но реальная доставка ещё не тестировалась.':
            'Бот @Andydotbot и личный чат @AndyTherapist проверены. Отправка пока выключена; сообщение не отправлялось.'):
          'Подключение не подтверждено, сообщение не отправлялось.';
      }
      catch(e){status.textContent=String(e?.message||'Ошибка подключения');}
      finally{test.disabled=false;}
    });
    panel.append(test);
    const status=document.createElement('p');status.className='telegram-share-status';
    status.id='councilTelegramBotStatus';status.setAttribute('role','status');
    status.textContent='По умолчанию выключено. Никаких автоматических сообщений.';
    panel.append(status);
    const anchor=settings.querySelector('.dialog-foot');
    if(anchor)settings.insertBefore(panel,anchor);else settings.append(panel);
  }
  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupBotPanel,{once:true});
    else setupBotPanel();
  }
    global.AICouncilTelegram={redact,reportMarkdown,telegramUrl,share,enhanceRound,maybeAutoSend};
})(globalThis);
