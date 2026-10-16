'use strict';
(function(global){
 const ageLimit=14*24*3600*1000;
 function route(shot){try{return new URL(shot.page).pathname;}catch{return '';}}
 function prioritize(shots){
  const valid=(shots||[]).filter(s=>s&&s.page&&s.desktop_url&&s.mobile_preview_url);
  const home=valid.find(s=>/^\/(?:en|ru|es)?\/?$/.test(route(s)));
  const service=valid.find(s=>/\/services(?:\/|$)/.test(route(s)));
  return [home,service,...valid].filter((s,i,all)=>s&&all.findIndex(x=>x?.page===s.page)===i);
 }
 function captureAsset(url,hash){try{const u=new URL(url);return typeof hash==='string'&&/^[a-f0-9]{64}$/.test(hash)&&u.pathname.endsWith('-'+hash+'.jpg')&&u.origin==='https://ai-council-chat.vercel.app'&&/^\/screenshots\/[a-z0-9-]+\.jpg$/.test(u.pathname)&&!u.search&&!u.hash&&!u.username&&!u.password;}catch{return false;}}
 function matchingPage(requested,final){
  try{const a=new URL(requested),b=new URL(final);return a.origin==='https://holistichouse.vercel.app'&&b.origin===a.origin&&!a.search&&!b.search&&!a.hash&&!b.hash&&
    (a.pathname.replace(/\/$/,'')===b.pathname.replace(/\/$/,'')||(a.pathname==='/'&&/^\/(?:en|ru|es)\/?$/.test(b.pathname)));}catch{return false;}
 }
 function verifiedCapture(shot,mode,now){
  const capture=shot.captures?.[mode],expected=mode==='mobile'?{width:390,height:844}:{width:1440,height:900};
  const age=now-Date.parse(capture?.captured_at);
  const url=mode==='mobile'?shot.mobile_preview_url:shot.desktop_url;
  return capture?.verified===true&&capture.source==='Playwright Chromium'&&capture.requested_url===shot.page&&
    capture.url===url&&captureAsset(url,capture.sha256)&&capture.width===expected.width&&capture.height===expected.height&&
    capture.viewport?.width===expected.width&&capture.viewport?.height===expected.height&&capture.device_scale_factor===1&&
    capture.http_status>=200&&capture.http_status<300&&matchingPage(shot.page,capture.final_url)&&Number.isFinite(age)&&age>=0&&age<ageLimit;
 }
 function mergeScreenshots(scan,manifest,now=Date.now()){
  const fallback=(scan.screenshots||[]).map(s=>({...s,verified:false}));
  const age=now-Date.parse(manifest?.generated_at);
  if(manifest?.schema_version!==2||!Number.isFinite(age)||age<0||age>=ageLimit||!Array.isArray(manifest.screenshots))return prioritize(fallback);
  const checked=new Set((scan.pages||[]).filter(p=>p.status===200).map(p=>p.url));
  const real=manifest.screenshots.filter(s=>s?.verified===true&&checked.has(s.page)&&verifiedCapture(s,'desktop',now)&&verifiedCapture(s,'mobile',now));
  return prioritize([...real,...fallback.filter(s=>!real.some(r=>r.page===s.page))]);
 }
 function visualShots(scan){
  const shots=prioritize(scan.screenshots);
  const home=shots.find(s=>/^\/(?:en|ru|es)?\/?$/.test(route(s)))||shots[0];
  const service=shots.find(s=>/\/services(?:\/|$)/.test(route(s)));
  return [home,service].filter((s,i,all)=>s&&all.findIndex(x=>x?.page===s.page)===i);
 }
 function visualContent(text,shots){
  return [{type:'text',text:text+'\nImages below are appearance evidence only. They do not prove interactions. Unverified cached previews may be stale or placeholders.'},...shots.flatMap(s=>[
   {type:'text',text:'PAGE '+s.page+' | source: '+s.source+' | verified: '+!!s.verified+' | DESKTOP '+(s.captures?.desktop? s.captures.desktop.width+'x'+s.captures.desktop.height:'unverified dimensions')},
   {type:'image_url',image_url:{url:s.desktop_url}},
   {type:'text',text:'PAGE '+s.page+' | MOBILE '+(s.captures?.mobile?s.captures.mobile.width+'x'+s.captures.mobile.height:'unverified cached preview; not mobile browser evidence')},
   {type:'image_url',image_url:{url:s.mobile_preview_url}}
  ])];
 }
 function pack(scan){return JSON.parse(JSON.stringify({summary:scan.summary,pages:scan.pages||[],failures:scan.failures||[],screenshots:scan.screenshots||[],visualInput:scan.visualInput||null}));}
 global.AICouncilEvidence={prioritize,mergeScreenshots,visualShots,visualContent,pack};
})(globalThis);
