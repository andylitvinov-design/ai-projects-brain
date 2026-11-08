'use strict';
/* Owner-side model quality dashboard. No server sync, new credentials or background billing. */
(function(g){
 const core=g.AICouncilModelQuality;
 if(!core)return;
 const STORE='ai-council-model-quality-v1';
 const defaults=()=>({cadence:'manual',consent:false,lastAttemptAt:0,lastOutcome:null,grades:{}});
 function read(){try{const value=JSON.parse(localStorage.getItem(STORE)||'null');return value&&typeof value==='object'&&!Array.isArray(value)?{...defaults(),...value,grades:value.grades&&typeof value.grades==='object'&&!Array.isArray(value.grades)?value.grades:{}}:defaults();}catch{return defaults();}}
 let settings=read(),ctx=null,running=false;
 const el=id=>document.getElementById(id);
 const ru=()=>ctx?.getState()?.lang!=='en';
 const word=(ruText,enText)=>ru()?ruText:enText;
 const fmt=n=>Number(n).toFixed(1);
 const date=stamp=>stamp?new Date(stamp).toLocaleString(ru()?'ru-RU':'en-US'):word('ещё нет','none yet');
 const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 function save(){try{localStorage.setItem(STORE,JSON.stringify(settings));return true;}catch{status(word('Ошибка сохранения рейтинга в этом браузере','Could not save ratings in this browser'));return false;}}
 function status(text){const n=el('qualityMessage');if(n)n.textContent=text;}
 function snapshot(){
  const items=core.records(ctx?.getState()?.threads||[]),allowed=new Set(items.map(item=>item.id));
  let pruned=false;
  for(const id of Object.keys(settings.grades))if(!allowed.has(id)){delete settings.grades[id];pruned=true;}
  if(pruned)save();
  return {items,rows:core.summary(items,settings.grades)};
 }
 function refresh(){
  if(!ctx)return;
  const {items,rows}=snapshot(),graded=items.filter(a=>settings.grades[a.id]).length;
  if(el('qualityButton'))el('qualityButton').textContent=word('★ Рейтинг моделей','★ Model ratings')+(graded?' · '+graded:'');
  const dialog=el('qualityDialog');if(!dialog?.open)return;
  el('qualityCadence').value=settings.cadence;
  el('qualityConsent').checked=!!settings.consent;
  el('qualityRun').disabled=running||!settings.consent||!ctx.hasKey()||!core.candidates(items,settings.grades).length;
  el('qualitySummary').textContent=word('Ответов и попыток: ','Answers and attempts: ')+items.length+' · '+word('оценено: ','graded: ')+graded+' · '+word('моделей: ','models: ')+rows.length;
  el('qualityLast').textContent=settings.lastOutcome?(word('Последняя оценка: ','Last evaluation: ')+date(settings.lastOutcome.at)+' · '+settings.lastOutcome.result):word('Оценка ещё не запускалась. Техническая статистика уже собирается.','No grading run yet. Technical statistics are recorded.');
  const table=el('qualityRanking');table.replaceChildren();
  if(!rows.length){table.append(node('div','quality-empty',word('Пока нет ответов моделей в этом браузере.','No model responses stored in this browser.')));return;}
  rows.forEach((row,index)=>{
   const card=node('article','quality-model-row');
   const head=node('div','quality-model-head');head.append(node('b','',String(index+1)+'. '+row.model));
   head.append(node('strong','quality-model-score',row.ranking===null?'—':fmt(row.ranking)+'/10'));
   card.append(head);
   const meta=node('p','quality-model-meta',word('Средняя оценка: ','Mean quality: ')+(row.quality===null?'—':fmt(row.quality))+' · '+word('Успех: ','Success: ')+Math.round(row.reliability*100)+'% ('+row.successes+'/'+row.attempts+') · '+word('Проверено: ','Graded: ')+row.graded+(row.lowSample?word(' · мало данных',' · low sample'):'')+(row.avgLatencyMs!==null?' · '+Math.round(row.avgLatencyMs/1000)+' s':''));
   card.append(meta);
   const grades=items.filter(item=>item.model===row.model&&settings.grades[item.id]).slice(-3).reverse();
   if(grades.length){const detail=node('details','quality-model-detail'),summary=node('summary','',word('Последние оценки и замечания','Latest grades and feedback'));detail.append(summary);grades.forEach(item=>{const grade=settings.grades[item.id],entry=node('p','',fmt(grade.score)+'/10 · '+date(grade.at)+' · '+grade.reason);detail.append(entry);});card.append(detail);}
   table.append(card);
  });
 }
 function download(){
  const {items}=snapshot(),fields=['date','model','role','ok','latency_ms','quality_0_10','judge','scope','reason'];
  const csvCell=value=>{let s=String(value??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
  const lines=[fields.map(csvCell).join(',')];
  items.forEach(item=>{const grade=settings.grades[item.id]||{};lines.push([date(item.created),item.model,item.kind,item.ok?'ok':'error',item.latencyMs??'',grade.score??'',grade.judge??'',grade.scope??'',grade.reason??''].map(csvCell).join(','));});
  const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'})),a=node('a');a.href=url;a.download='AI-Council-model-quality.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
 }
 async function evaluate(automatic=false){
  if(!ctx||running||ctx.isBusy()||!settings.consent||!ctx.hasKey())return;
  if(automatic&&!core.due(settings))return;
  const {items}=snapshot(),samples=core.candidates(items,settings.grades,6);
  if(!samples.length){if(!automatic)status(word('Все доступные ответы уже оценены.','All available answers have been graded.'));refresh();return;}
  const judge=core.chooseJudge(ctx.models(),samples,ctx.isFreeModel);
  if(!judge){status(word('Нет отдельной подтверждённой бесплатной модели для независимой проверки.','No distinct verified free judge is available.'));refresh();return;}
  running=true;
  settings.lastAttemptAt=Date.now();save();refresh();
  status(word('Оцениваем '+samples.length+' ответов · один бесплатный запрос к '+judge,'Grading '+samples.length+' answers · one free request to '+judge));
  try{
   const response=await ctx.request(judge,core.judgePrompt(samples,ctx.getState().lang),{maxTokens:2300,temperature:0.1,timeoutMs:115000});
   const grades=core.parseGrades(response,samples,judge);Object.assign(settings.grades,grades);
   settings.lastOutcome={at:Date.now(),result:'ok · '+samples.length,judge};
   save();status(word('Оценено ответов: ','Graded answers: ')+samples.length+'. '+word('Это оценка другого ИИ, а не доказательство фактической правильности.','This is another AI opinion, not fact verification.'));
  }catch(error){
   settings.lastOutcome={at:Date.now(),result:'failed',judge};save();
   status(word('Оценка не завершена: ','Evaluation failed: ')+String(error?.message||error).slice(0,200));
  }finally{running=false;refresh();}
 }
 function maybeRun(){if(settings.consent&&settings.cadence!=='manual')void evaluate(true);}
 function init(options){
  if(ctx||!options?.getState||!options.request)return;
  ctx=options;
  el('qualityButton').onclick=()=>{el('qualityDialog').showModal();refresh();};
  el('qualityTopButton').onclick=()=>{el('qualityDialog').showModal();refresh();};
  el('qualityClose').onclick=()=>el('qualityDialog').close();
  el('qualityDialog').addEventListener('click',event=>{if(event.target===el('qualityDialog'))el('qualityDialog').close();});
  el('qualityRun').onclick=()=>void evaluate(false);
  el('qualityExport').onclick=download;
  el('qualityConsent').onchange=event=>{settings.consent=!!event.target.checked;save();refresh();maybeRun();};
  el('qualityCadence').onchange=event=>{settings.cadence=event.target.value;save();refresh();maybeRun();};
  refresh();maybeRun();
 }
 g.AICouncilModelMonitor={init,refresh,maybeRun};
})(globalThis);
