'use strict';
/* Fail closed using the live catalog, provider-side price caps, then response evidence.
 * This cannot reverse a provider charge; it stops all queued requests on uncertainty.
 */
(function(global){
  function isZero(value){
    if(typeof value==='number')return Number.isFinite(value)&&value===0;
    return typeof value==='string'&&/^-?(?:0+(?:\.0*)?|\.0+)(?:e[+-]?\d+)?$/i.test(value.trim())&&Number(value)===0;
  }
  function isFreeModel(model){
    const prices=model?.pricing;
    return typeof model?.id==='string'&&model.id.endsWith(':free')&&prices&&typeof prices==='object'&&!Array.isArray(prices)&&
      Object.hasOwn(prices,'prompt')&&Object.hasOwn(prices,'completion')&&Object.values(prices).every(isZero);
  }
  function freeCatalog(data){
    if(!Array.isArray(data))return [];
    return data.filter(isFreeModel).map(model=>({...model,response_ids:[...new Set([
      model.id,
      ...(typeof model.canonical_slug==='string'&&model.canonical_slug?[
        model.canonical_slug,...data.filter(m=>m?.canonical_slug===model.canonical_slug&&typeof m.id==='string').map(m=>m.id)
      ]:[])
    ])]}));
  }
  function providerPolicy(){return {allow_fallbacks:false,max_price:{prompt:0,completion:0,request:0,image:0}};}
  function responseIssue(model,response){
    if(!isFreeModel(model))return 'Selected model has unverified or non-zero catalog pricing';
    const allowed=model.response_ids||[model.id,model.canonical_slug].filter(Boolean);
    if(typeof response?.model!=='string'||!allowed.includes(response.model))return 'Response model does not match the selected catalog model';
    if(!isZero(response?.usage?.cost))return 'Response cost is missing, invalid or non-zero';
    if(response.usage.is_byok===true)return 'Unexpected BYOK response';
    const costs=response.usage.cost_details;
    if(costs!=null&&(typeof costs!=='object'||Array.isArray(costs)||Object.values(costs).some(v=>v!=null&&!isZero(v))))return 'Response reports an unverified or non-zero provider cost';
    return '';
  }
  function historyContext(thread,budget=8000){
    const selected=[];let left=budget;
    for(const round of (thread.rounds||[]).slice(-3).reverse()){
      const answer=round.synthesis||(round.answers||[]).filter(a=>a.status==='ok').map(a=>a.model+': '+a.text).join('\n');
      const block='Question: '+String(round.question||'').slice(-2000)+'\nResponse: '+String(answer||'').slice(-2400);
      if(left<=0)break;
      selected.unshift(block.length<=left?block:'[Older context shortened]\n'+block.slice(-(Math.max(0,left-26))));
      left-=selected[0].length+2;
    }
    return selected.join('\n\n').slice(-budget);
  }
  global.AICouncilSafety={isZero,isFreeModel,freeCatalog,providerPolicy,responseIssue,historyContext};
})(globalThis);
