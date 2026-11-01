'use strict';
/* Review request coordinator.
   Repeated model IDs represent ONE provider and must not produce duplicate
   simultaneous requests, fake independence, or hidden paid fallbacks.
   Split one combined response into explicit role sections when possible.
*/
(function(g){
 const roleMarker=i=>'<<<COUNCIL_ROLE_'+(i+1)+'>>>';
 const limit=(s,n)=>String(s||'').slice(0,n);
 function extract(text,indices){
  const parts={};const located=indices.map(i=>({i,token:roleMarker(i),at:text.indexOf(roleMarker(i))}));
  if(located.some(item=>item.at<0))return null;
  const ordered=located.slice().sort((a,b)=>a.at-b.at);
  ordered.forEach((item,index)=>{
   const start=item.at+item.token.length,end=index+1<ordered.length?ordered[index+1].at:text.length;
   parts[item.i]=text.slice(start,end).trim();
  });
  return indices.every(i=>parts[i]?.length>=35)?parts:null;
 }
 function combined(messages,indices,lang){
  const lines=[
   'You are ONE model covering MULTIPLE editorial review roles in ONE API call. You are not multiple independent AI reviewers.',
   'Each role requires a DISTINCT, detailed, concrete critique. Keep observed HTML evidence, URL, changed element, acceptance tests and NOT_TESTED status.',
   'IMPORTANT: Output sections with these literal delimiters IN ORDER, and no content before the first delimiter:',
   ...indices.map(i=>roleMarker(i)),
   'Respond in '+(lang==='en'?'English':'Russian')+'. Do not invent facts, do not claim any independent review by another model.',
   'If the provider imposes a free-tier limit, fail normally; do not retry or switch to a paid model.'
  ];
  const input=indices.map(i=>{
   const msg=messages[i]||[],system=msg.filter(m=>m.role==='system').map(m=>typeof m.content==='string'?m.content:'').join('\n');
   const user=msg.filter(m=>m.role==='user').map(m=>typeof m.content==='string'?m.content:JSON.stringify(m.content)).join('\n');
   return 'TASK FOR '+roleMarker(i)+'\nReview criteria:\n'+limit(system,8500)+'\nEvidence & question:\n'+limit(user,28000);
  }).join('\n\n');
  return [{role:'system',content:lines.join('\n')},{role:'user',content:input}];
 }
 async function run(answers,makeMessages,request,onUpdate,options={}){
  if(!Array.isArray(answers))throw Error('Missing reviewer list');
  const map=new Map();
  answers.forEach((a,i)=>{const key=a.model||'__missing_'+i;if(!map.has(key))map.set(key,[]);map.get(key).push(i);});
  const tasks=[...map.entries()].map(async([model,indices])=>{
   const groups=indices.length>1,optionsForCall={...options,maxTokens:groups?Math.max(3400,Math.min(5400,indices.length*2400)):options.maxTokens};
   if(groups)indices.forEach(i=>{answers[i].sharedRequest=true;answers[i].sharedRoles=indices.length;});
   try{
    const prepared=indices.map(i=>makeMessages(answers[i],i));
    const requestMessages=groups?combined(Object.fromEntries(indices.map((i,k)=>[i,prepared[k]])),indices,options.language):prepared[0];
    const text=await request(model,requestMessages,optionsForCall);
    if(!groups){
     const i=indices[0];answers[i].text=text;answers[i].status='ok';
    }else{
     const sections=extract(text,indices);
     if(sections){indices.forEach(i=>{answers[i].status='ok';answers[i].text=sections[i];});}
     else{
      const first=indices[0];answers[first].status='ok';answers[first].text=text;
      indices.slice(1).forEach(i=>{answers[i].status='shared';answers[i].text=options.language==='en'?
        'The same model returned a combined response without distinct role sections; no independent second opinion is available. See the first card.':
        'Модель вернула общий ответ без отдельных разделов. Независимого второго заключения нет; смотри первую карточку.';});
     }
    }
   }catch(e){
    indices.forEach(i=>{answers[i].status='error';answers[i].error=String(e?.message||e);});
   }finally{onUpdate?.();}
  });
  await Promise.allSettled(tasks);
  return answers;
 }
 g.AICouncilReviewBatch={run,extract,roleMarker};
})(globalThis);
