/* Public-only Holistic House audit.
 * Read-only HTTP evidence. No user accounts, private routes, AI keys or paid browser providers.
 * Scope and budgets are intentionally strict because this endpoint is public.
 */
const ROOT='https://holistichouse.vercel.app';
const HOST='holistichouse.vercel.app';
const MAX_PAGES=54, MAX_SITEMAP=500, TIMEOUT=7500, MAX_HTML=430000;
const SKIP=/(?:^|\/)(?:api|app|account|cabinet|dashboard|profile|login|signin|signup|register|checkout|admin|auth|client|results|privacy-settings)(?:\/|$)/i;
const SEED=['/','/en','/ru','/es','/en/services','/ru/services','/es/services','/en/academy','/en/about','/en/app','/en/academy/reiki/yggdrasil/basic-course'];
const strip=s=>String(s||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi,' ');
const decode=s=>String(s||'').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([a-f0-9]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&(amp|quot|apos|lt|gt|nbsp|ndash|mdash|hellip);/g,(_,n)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',ndash:'–',mdash:'—',hellip:'…'}[n]));
function safePath(raw){
 try{const u=new URL(raw,ROOT);if(u.hostname!==HOST||u.protocol!=='https:'||u.username||u.password)return null;
  const path=u.pathname.replace(/\/{2,}/g,'/');
  if(SKIP.test(path)||/\.(?:png|jpg|jpeg|gif|svg|webp|avif|mp4|mp3|pdf|zip|xml|txt|json|css|js|ico|woff2?)$/i.test(path))return null;
  return ROOT+(path.length>1?path.replace(/\/+$/,''):'/');
 }catch{return null;}
}
function linkURLs(html,base){const urls=[];for(const m of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"'#]+)["']/gi)){const v=safePath(decode(m[1]));if(v&&!urls.includes(v))urls.push(v);}return urls;}
function pick(html,rx){return decode((html.match(rx)||[])[1]||'').trim().replace(/\s+/g,' ').slice(0,500);}
function meta(html,name){
 const tags=html.match(/<meta\b[^>]*>/gi)||[];
 for(const tag of tags){const n=tag.match(/\bname\s*=\s*["']([^"']+)["']/i);if(!n||n[1].toLowerCase()!==name.toLowerCase())continue;
  const m=tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i);if(m)return decode(m[1]).trim().slice(0,600);}
 return '';
}
function getLinks(html,rel){
 return (html.match(/<link\b[^>]*>/gi)||[]).filter(tag=>{const m=tag.match(/\brel\s*=\s*["']([^"']+)["']/i);return m&&m[1].toLowerCase()===rel.toLowerCase();});
}
function bodyText(html){const withSpace=strip(html).replace(/<\/(?:p|h[1-6]|li|section|article|div|br|main|button|a)>/gi,' $& ');let body=(withSpace.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)||[])[1]||withSpace;return decode(body.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim().slice(0,2350);}
function normalizePage(url,html,status,elapsedMs){
 const clean=strip(html), headings=[...clean.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(x=>decode(x[1].replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim()).filter(Boolean).slice(0,8);
 const title=pick(clean,/<title\b[^>]*>([\s\S]*?)<\/title>/i),description=meta(clean,'description');
 const lang=pick(html,/<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i);
 const canonical=(getLinks(html,'canonical')[0]||'').match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1]||'';
 const hreflangs=(html.match(/<link\b[^>]*\bhreflang\s*=/gi)||[]).length;
 const links=linkURLs(clean,url),imageCount=(html.match(/<img\b/gi)||[]).length;
 const missingAlt=(html.match(/<img\b[^>]*>/gi)||[]).filter(x=>!/\balt\s*=\s*["'][^"']*["']/i.test(x)).length;
 const text=bodyText(html);
 const issues=[];
 if(!title)issues.push('missing_title');
 if(!description)issues.push('missing_description');
 if(headings.length!==1)issues.push(headings.length?'multiple_h1':'missing_h1');
 if(!lang)issues.push('missing_html_lang');
 if(!canonical)issues.push('missing_canonical');
 if(/^\/(?:en|ru|es)(?:\/|$)/.test(new URL(url).pathname)&&!hreflangs)issues.push('missing_hreflang');
 if(missingAlt)issues.push('images_without_alt');
 const pass=getLinks(html,'canonical').length,robots=meta(html,'robots');
 return {url,path:new URL(url).pathname,status,elapsed_ms:elapsedMs,title,description,h1:headings,lang,canonical, hreflang_tags:hreflangs,image_count:imageCount,missing_alt:missingAlt,robots, word_count:text.split(/\s+/).filter(Boolean).length,links:links.slice(0,45),text_excerpt:text,issues};
}
async function getSafe(url,maxBytes=MAX_HTML){
 const controller=new AbortController();const tid=setTimeout(()=>controller.abort(),TIMEOUT);
 try{
  let current=url;
  for(let redirect=0;redirect<3;redirect++){
   const r=await fetch(current,{signal:controller.signal,redirect:'manual',cache:'no-store',headers:{'User-Agent':'HolisticHousePublicAudit/1.0 (+site owner)',Accept:'text/html,application/xml,text/xml,text/plain;q=0.8'}});
   if([301,302,303,307,308].includes(r.status)){const next=safePath(r.headers.get('location')||'');if(!next)throw Error('redirect_outside_allowed_host_or_private_path');current=next;continue;}
   const ct=r.headers.get('content-type')||'';
   const text=await r.text();
   return {status:r.status,url:current,content_type:ct,text:text.slice(0,maxBytes),redirected:current!==url};
  }
  throw Error('too_many_redirects');
 }finally{clearTimeout(tid);}
}
async function fetchSitemap(url){
 const allowed=url===ROOT+'/sitemap.xml'||url.startsWith(ROOT+'/sitemap-')&&url.endsWith('.xml');
 if(!allowed)throw Error('invalid_sitemap_path');
 // Use separate sitemap fetch because safePath rejects .xml by design.
 const c=new AbortController(),tid=setTimeout(()=>c.abort(),TIMEOUT);
 try{const r=await fetch(url,{signal:c.signal,redirect:'error',cache:'no-store',headers:{Accept:'application/xml,text/xml'}});
  if(!r.ok)throw Error('HTTP '+r.status);
  const xml=(await r.text()).slice(0,750000);
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(m=>decode(m[1].trim())).slice(0,MAX_SITEMAP);
 }finally{clearTimeout(tid);}
}
function rank(u){const path=new URL(u).pathname;let score=30-(path.split('/').length*2);if(path==='/'||/^\/(en|ru|es)\/?$/.test(path))score+=45;
 if(/services|consult|diagnos|psychotherap|about|academy|reiki|tests|free|contact|course|booking|results/i.test(path))score+=30;
 if(/^\/en(?:\/|$)/.test(path))score+=10;if(/^\/ru(?:\/|$)/.test(path))score+=7;if(/^\/es(?:\/|$)/.test(path))score+=7;
 if(/\/(?:books|remedies|library)\/[^/]+\/[^/]+/i.test(path))score-=12;
 return score;
}
function screen(url,w,h){return 'https://s.wordpress.com/mshots/v1/'+encodeURIComponent(url)+'?w='+w+'&h='+h;}
let lastScanAt=0;
export async function GET(){return Response.json({ok:true,service:'Holistic House public site audit',scope:HOST,max_pages:MAX_PAGES,live_browser_testing:false,screenshots:'WordPress mShots cached previews only',security:'Public routes only; no login, forms submissions or private data'}, {headers:{'Cache-Control':'no-store'}});}
export async function POST(request){
 const origin=request.headers.get('origin');
 if(origin && origin!=='https://ai-council-chat.vercel.app' && !/^https:\/\/ai-council-chat(?:-[a-z0-9-]+)?\.vercel\.app$/.test(origin))return Response.json({error:'invalid_origin'}, {status:403});
 const now=Date.now();if(now-lastScanAt<12000)return Response.json({error:'please_wait_12_seconds'}, {status:429});lastScanAt=now;
 let input;try{input=await request.json();}catch{return Response.json({error:'invalid_json'}, {status:400});}
 if(!input||typeof input.url!=='string'||input.url.length>300)return Response.json({error:'invalid_target'}, {status:400});
 const rawUrl=input.url.trim();const site=safePath(/^https?:\/\//i.test(rawUrl)?rawUrl:'https://'+rawUrl);if(!site)return Response.json({error:'only_public_holistichouse_vercel_app_pages_supported'}, {status:400});
 const start=Date.now();let sitemap=[],sitemapErrors=[];
 try{
  const roots=await fetchSitemap(ROOT+'/sitemap.xml');
  const nested=roots.filter(u=>u.startsWith(ROOT+'/sitemap-')&&u.endsWith('.xml')).slice(0,8);
  sitemap=roots.filter(u=>safePath(u));
  if(nested.length){const others=await Promise.allSettled(nested.map(fetchSitemap));others.forEach(r=>{if(r.status==='fulfilled')sitemap.push(...r.value);else sitemapErrors.push(String(r.reason?.message||r.reason));});}
 }catch(e){sitemapErrors.push(String(e.message||e));}
 const urls=new Set([...SEED.map(p=>safePath(ROOT+p)).filter(Boolean),site,...sitemap.map(safePath).filter(Boolean)]);
 // First crawl home if no sitemap, then use discovered links as a limited fallback.
 if(sitemap.length<3){try{const a=await getSafe(ROOT+'/');if(a.content_type.includes('html'))linkURLs(a.text,ROOT+'/').forEach(u=>urls.add(u));}catch{}}
 const indexed=[...urls].filter(Boolean),sorted=indexed.sort((a,b)=>rank(b)-rank(a)||a.localeCompare(b));
 const take=sorted.slice(0,MAX_PAGES);const pages=[],failures=[];
 for(let off=0;off<take.length;off+=6){
  const batch=await Promise.allSettled(take.slice(off,off+6).map(async url=>{const st=Date.now();const r=await getSafe(url);if(!r.content_type.includes('html'))throw Error('not_html_'+r.status);return normalizePage(url,r.text,r.status,Date.now()-st);}));
  batch.forEach((v,i)=>{if(v.status==='fulfilled')pages.push(v.value);else failures.push({url:take[off+i],error:String(v.reason?.message||v.reason).slice(0,100)});});
 }
 const langs={en:0,ru:0,es:0,other:0},categories={services:0,academy:0,tests:0,content:0,other:0},issueCounts={};
 for(const p of pages){const l=(p.path.match(/^\/(en|ru|es)(?:\/|$)/)||[])[1]||'other';langs[l]++;
  const cat=/service|consult|diagnos/i.test(p.path)?'services':/academy|reiki|course/i.test(p.path)?'academy':/test|assessment|result/i.test(p.path)?'tests':/book|remed|library/i.test(p.path)?'content':'other';categories[cat]++;
  for(const issue of p.issues)issueCounts[issue]=(issueCounts[issue]||0)+1;
  if(p.status>=400)issueCounts.http_error=(issueCounts.http_error||0)+1;
 }
 const screenshots=sorted.filter(u=>pages.some(p=>p.url===u&&p.status===200)).slice(0,4).map(u=>({page:u,desktop_url:screen(u,1280,850),mobile_preview_url:screen(u,390,844),source:'WordPress.com mShots',verified:false,warning:'External cached thumbnail; mobile preview is not device-emulated browser QA. May show placeholder.'}));
 const info={target:site,host:HOST,created_at:new Date().toISOString(), elapsed_ms:Date.now()-start,sitemap_urls:sitemap.length,discovered_public_pages:indexed.length,html_pages_checked:pages.length, failed_pages:failures.length,unreviewed_public_pages:Math.max(0,indexed.length-take.length),scope_limit:MAX_PAGES,coverage_note:'Read-only public HTML; no logged-in journeys, real user interaction, JS runtime checks or device-accurate screenshots. Technical findings reflect retrieved HTML, not verified rendered DOM.',locales:langs,categories,issue_counts:issueCounts,sitemap_errors:sitemapErrors};
 return Response.json({ok:true,summary:info,pages,failures,screenshots},{headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
