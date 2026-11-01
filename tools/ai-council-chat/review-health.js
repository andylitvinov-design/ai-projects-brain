'use strict';
(function(g){
 const ru={
  insufficient:'Недостаточно независимых ответов для сводного ТЗ: ответила только одна модель. Повторные запросы автоматически не отправляются. Можно сохранить исходный ответ и проверенные HTML-данные, но это НЕ готовый аудит.',
  empty:'Ни один рецензент не ответил. Проверенный HTML-аудит сохранён ниже, а выводы ИИ пока отсутствуют.',
  share:'Сводная не сформирована. Источники и HTML-данные сохранены, но заключение является частичным.',
  historical:'Сохранённый незавершённый результат. Ошибки этого запуска не исчезнут после обновления приложения; для новой проверки нужен новый запрос.',
  one:'один независимый рецензент'
 };
 const en={
  insufficient:'Not enough independent model answers for a credible multi-model synthesis: only one model answered. No automatic retries. The original review and checked HTML evidence can be saved, but this is NOT a completed audit.',
  empty:'No reviewer responded. The observed HTTP/HTML evidence remains available; no AI review is complete.',
  share:'No completed synthesis; reviewer source materials and observed HTML evidence have been retained as an incomplete report.',
  historical:'Saved incomplete result from a previous run. Refreshing the app will not rewrite old errors; a fresh run is required.',
  one:'one independent reviewer'
 };
 const lang=()=>typeof state!=='undefined'&&state.lang==='en'?en:ru;
 function good(round){return (round?.answers||[]).filter(a=>a.status==='ok'&&String(a.text||'').trim());}
 function unique(round){return [...new Set(good(round).map(x=>x.model))].length;}
 function ready(round){return unique(round)>=2;}
 function partialText(round){
  const l=lang(),s=good(round),source=unique(round);
  const pref=source?l.insufficient:l.empty;
  const missing=(round?.answers||[]).filter(a=>a.status==='error').map(a=>a.model+': '+String(a.error||'').slice(0,150));
  return pref+(missing.length?'\n\n'+(typeof state!=='undefined'&&state.lang==='en'?'Provider errors:':'Ошибки провайдеров:')+'\n'+missing.join('\n'):'');
 }
 function isNetworkError(error){return /load failed|failed to fetch|networkerror|network request failed|connection failed/i.test(String(error||''));}
 g.AICouncilReviewHealth={good,unique,ready,partialText,isNetworkError,lang};
})(globalThis);
