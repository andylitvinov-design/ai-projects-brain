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
    }
    const status=el('div','telegram-share-status');status.setAttribute('role','status');synth.append(status);
  }
  global.AICouncilTelegram={redact,reportMarkdown,telegramUrl,share,enhanceRound};
})(globalThis);
