#!/usr/bin/env node
/* Single daily public HTML scan + Gemini/Mistral reviews + owner Telegram report.
 * Muse is intentionally manual-only: no verified personal Muse agent API.
 * No paid-model fallback and no public/private website changes.
 */
import {resolve} from 'node:path';
import {torontoDate,collectEvidence,SITE} from './daily-gemini-telegram.mjs';
import {reviewGemini,reviewMistral,generateSpec,observedTasks} from './daily-council-providers.mjs';

const REPO='andylitvinov-design/ai-projects-brain',ISSUE=242;
const marker=date=>'<!-- HH-COUNCIL-DAILY:'+date+' -->';
const delivered=date=>'<!-- HH-COUNCIL-TELEGRAM-SENT:'+date+' -->';
const legacySent=date=>'<!-- HH-TELEGRAM-SENT:'+date+' -->';
// Always archive a fully parseable, bounded JSON evidence bundle.
// Never slice raw JSON in half; the downstream HH model reviewer needs each
// actual checked public URL, status, meta tag and excerpt for grounded TZs.
export function compactPublicEvidence(evidence){
  return {
    source:evidence?.source, date_toronto:evidence?.date_toronto,
    checked_at_utc:evidence?.checked_at_utc,
    method:'anonymous public HTML/HTTP; no browser, health records, login or Web Vitals',
    scope:evidence?.scope,
    pages:(Array.isArray(evidence?.pages)?evidence.pages:[]).slice(0,24).map(p=>({
      url:p.url,status:p.status,redirect:p.redirect,
      title:String(p.title||'').slice(0,150),
      description:String(p.description||'').slice(0,195),
      canonical:String(p.canonical||'').slice(0,180),
      lang:String(p.lang||'').slice(0,12),
      h1_count:p.h1_count,
      flags:Array.isArray(p.flags)?p.flags.slice(0,8):[],
      public_text_excerpt:String(p.public_text_excerpt||'').slice(0,195),
    }))
  };
}
const caveat='Анонимные HTTP/HTML проверки; нет скриншотов, кликов, клиентского кабинета, настоящих Core Web Vitals или конверсий.';
const muse='MANUAL_ONLY: личный Muse не имеет подтверждённого внешнего API. Его ответ можно вручную вставить в AI Council и отправить в Telegram; Muse Spark API — другая (платная) модель.';
function status(x){return x.status==='ok'?'OK · '+x.model:
  'НЕ ПОЛУЧЕНО · '+x.model+' · '+x.status+' ('+(x.reason||'нет подключения')+')';}
function output(x,max=10500){return x.status==='ok'?x.text.slice(0,max):'[NOT_AVAILABLE] '+status(x);}
export function makeDailyReport({date,evidence,gemini,mistral,spec}){
  const facts=observedTasks(evidence),lines=[
    '# Holistic House — ежедневные анализы и техническое задание · '+date,'',
    '## Статус рецензентов','- Gemini: '+status(gemini),'- Mistral: '+status(mistral),
    '- Muse: '+muse,'- ТЗ: '+(spec.status==='ok'?'Gemini по доступным рецензиям':'только детерминистические HTML факты'),'',
    '## Метод и объём','Сайт: '+SITE,
    'Проверено публичных URL: '+(evidence?.pages?.length||0),
    caveat,'',
    '## Gemini — независимый отчёт',output(gemini),'',
    '## Mistral — независимый отчёт',output(mistral),'',
    '## Личный Muse',muse,'',
    '## Приоритизированное ТЗ для Codex (черновик)',
    spec.status==='ok'?spec.text.slice(0,16000):
      '[AI-синтез не получен. Только наблюдения HTTP/HTML ниже; без вымышленных рекомендаций.]','',
    '## Детерминистические наблюдения и критерии приёмки'
  ];
  if(!facts.length)lines.push('Подтверждённых дефектов из проверяемого HTTP/HTML перечня не обнаружено. Браузерные пути не тестировались.');
  facts.forEach((x,i)=>lines.push(
    '### T-'+String(i+1).padStart(2,'0')+' — '+x.observation,
    '- P2 / needs verification; URL: '+x.url,
    '- Основание: '+x.proof+' / '+x.flag,
    '- Исправление: '+x.change,
    '- Pass/fail: '+x.acceptance,''
  ));
  lines.push('## Ограничения','Мнения моделей — гипотезы, а не доказательства дефектов.',
    'Никаких клиентских данных, публикаций, PR-merge, редактирования сайта, трат на модели.','');
  return lines.join('\n');
}
export function cleanArchivedReport(comment){
  return String(comment.body||'').replace(/^<!-- HH-COUNCIL-DAILY:\d{4}-\d{2}-\d{2} -->\s*/,'')
    .split('<!-- HH-COUNCIL-EVIDENCE -->')[0].trim();
}
function checkSettings(env){
  if(env.GITHUB_REPOSITORY&&env.GITHUB_REPOSITORY!==REPO)throw Error('Wrong repository');
  const archiveOnly=env.COUNCIL_DELIVERY_MODE==='archive_only';
  const required=archiveOnly?['GITHUB_TOKEN']:
    ['GITHUB_TOKEN','TELEGRAM_BOT_TOKEN','TELEGRAM_CHAT_ID'];
  for(const key of required)
    if(!env[key])throw Error('Missing private setting '+key);
  if(!archiveOnly&&!/^-?\d{1,20}$/.test(env.TELEGRAM_CHAT_ID))
    throw Error('Numeric Telegram chat ID required');
}
async function github(path,method,body,env,fetcher){
  const res=await fetcher('https://api.github.com/repos/'+REPO+path,{
    method,redirect:'error',signal:AbortSignal.timeout(20000),
    headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+env.GITHUB_TOKEN,
      'x-github-api-version':'2022-11-28',...(body?{'content-type':'application/json'}:{})},
    ...(body?{body:JSON.stringify(body)}:{})
  });
  if(!res.ok)throw Error('GitHub HTTP '+res.status);
  return res.json();
}
async function recent(env,fetcher){
  const after=new Date(Date.now()-7*86400000).toISOString(),all=[];
  for(let p=1;p<=4;p++){
    const items=await github('/issues/'+ISSUE+'/comments?per_page=100&page='+p+
      '&since='+encodeURIComponent(after),'GET',null,env,fetcher);
    if(!Array.isArray(items))throw Error('Invalid GitHub response');
    all.push(...items.filter(x=>x.user?.login==='github-actions[bot]'&&
      (/<!-- HH-COUNCIL-DAILY:\d{4}-\d{2}-\d{2} -->/.test(x.body||'')||
       /<!-- HH-GEMINI-AUDIT:\d{4}-\d{2}-\d{2} -->/.test(x.body||''))));
    if(items.length<100)break;
  }
  return all;
}
async function send(date,report,url,env,fetcher){
  const form=new FormData();
  form.set('chat_id',env.TELEGRAM_CHAT_ID);
  form.set('document',new Blob([report],{type:'text/markdown; charset=utf-8'}),date+'-holistic-house-ai-council.md');
  form.set('caption','🔎 Holistic House · '+date+
    '\nGemini / Mistral / Muse: статус, отдельные анализы и ТЗ внутри.'+
    '\nАрхив: '+url);
  const res=await fetcher('https://api.telegram.org/bot'+env.TELEGRAM_BOT_TOKEN+'/sendDocument',{
    method:'POST',redirect:'error',signal:AbortSignal.timeout(28000),body:form
  });
  if(!res.ok)throw Error('Telegram HTTP '+res.status);
  const receipt=await res.json();
  if(receipt.ok!==true||String(receipt.result?.chat?.id||'')!==String(env.TELEGRAM_CHAT_ID))
    throw Error('Telegram recipient unconfirmed');
}
export async function runDailyCouncil({env=process.env,fetcher=fetch,collect=collectEvidence,now=new Date()}={}){
  checkSettings(env);
  const date=torontoDate(now),existing=await recent(env,fetcher);
  if(existing.some(x=>String(x.body||'').includes(legacySent(date)))){
    console.log('Legacy report delivered on this date; skipping duplicate');
    return {status:'already_sent_legacy',date};
  }
  let today=existing.find(x=>String(x.body||'').includes(marker(date)));
  if(!today){
    const evidence=await collect(date);
    const [gemini,mistral]=await Promise.all([reviewGemini(evidence,env,fetcher),reviewMistral(evidence,env,fetcher)]);
    const spec=await generateSpec(evidence,gemini,mistral,env,fetcher);
    const report=makeDailyReport({date,evidence,gemini,mistral,spec});
    const short=JSON.stringify(compactPublicEvidence(evidence),null,2);
    const fence=String.fromCharCode(96).repeat(3);
    const body=marker(date)+'\n\n'+report+'\n\n<!-- HH-COUNCIL-EVIDENCE -->\n\n'+
      '<details><summary>Public HTTP evidence JSON</summary>\n\n'+fence+'json\n'+
      short+'\n'+fence+'\n\n</details>\n';
    if(body.length>65000)throw Error('Public report exceeds GitHub comment limit');
    today=await github('/issues/'+ISSUE+'/comments','POST',{body},env,fetcher);
    console.log('Archived public Council report: '+today.html_url);
  }else console.log('Daily Council archive reused; no repeated provider calls');
  // GitHub Actions never receives a BotFather token. The HH Vercel cron picks
  // this public archive up later and forwards it through the central Telegram hub.
  if(env.COUNCIL_DELIVERY_MODE==='archive_only')
    return {date,status:'archived_only'};
  const rows=new Map([...existing,today].filter(Boolean).map(x=>[x.id,x]));
  const pending=[...rows.values()].filter(x=>{
    const dateMatch=String(x.body||'').match(/<!-- HH-COUNCIL-DAILY:(\d{4}-\d{2}-\d{2}) -->/);
    return dateMatch&&!String(x.body||'').includes(delivered(dateMatch[1]));
  }).sort((a,b)=>String(b.created_at||'').localeCompare(String(a.created_at||''))).slice(0,3);
  for(const item of pending){
    const day=String(item.body).match(/<!-- HH-COUNCIL-DAILY:(\d{4}-\d{2}-\d{2}) -->/)[1];
    await send(day,cleanArchivedReport(item),item.html_url,env,fetcher);
    await github('/issues/comments/'+item.id,'PATCH',{body:String(item.body)+'\n\n'+
      delivered(day)+'\nTelegram Bot API accepted at '+new Date().toISOString()+
      ' UTC; recipient read not verified.\n'},env,fetcher);
  }
  return {date,status:pending.length?'accepted':'already_sent'};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+resolve(process.argv[1])).href){
  runDailyCouncil().catch(e=>{
    const msg=String(e?.message||''),http=msg.match(/HTTP\s+\d{3}/);
    console.error('Council daily failed: '+(http?http[0]:'check private configuration/archives'));
    process.exitCode=1;
  });
}
