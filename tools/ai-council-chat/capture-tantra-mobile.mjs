/** Opt-in live public-page evidence only. No forms, external navigation or publication. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {jpegDimensions} from './screenshot-evidence.mjs';
const HOST='https://holistichouse.vercel.app';
const ROUTE='/academy/reiki/tantra-reiki/free-initiation';
const out=path.resolve('test-results/tantra-mobile-evidence');
const expectedSource=/^[a-f0-9]{40}$/.test(process.env.TANTRA_SOURCE_SHA||'')?process.env.TANTRA_SOURCE_SHA:null;
await fs.mkdir(out,{recursive:true});
const report={captured_at:new Date().toISOString(),target:'live public production',host:HOST,expected_source_sha:expectedSource,actual_runtime_source_sha:null,source_note:expectedSource?'Expected SHA is an operator-supplied hint, not runtime proof. Pair with independent Vercel deployment readbacks before and after capture.':'No source SHA supplied. Bound this live capture with independent Vercel deployment readbacks before and after capture; the public DOM does not prove the runtime SHA.',scope:'EN/RU/ES top and choices at 320/390/430x844. Detailed sections, settled touch/keyboard chooser visibility, keyboard states and end-scroll reachability at 390px. No form submission, video playback or external contact link activation.',pages:[]};
let browser;
function check(entry,name,pass,observed){entry.checks.push({name,pass:!!pass,observed});}
async function geometry(page){return page.evaluate(()=>{
 const width=window.innerWidth,visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&Number(s.opacity)!==0};
 const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
 const describe=e=>({tag:e.tagName,id:e.id||null,text:(e.innerText||e.getAttribute('aria-label')||'').replace(/\s+/g,' ').slice(0,120),rect:rect(e)});
 return {inner_width:width,inner_height:window.innerHeight,client_width:document.documentElement.clientWidth,client_height:document.documentElement.clientHeight,scroll_width:document.documentElement.scrollWidth,scroll_height:document.documentElement.scrollHeight,scroll_y:window.scrollY,dpr:window.devicePixelRatio,
  section_boxes:[...document.querySelectorAll('#intro,#initiation-choices,#how-to,#study-questions,#tantra-apply')].map(describe),
  overflow_candidates:[...document.querySelectorAll('main *')].filter(visible).filter(e=>{const r=e.getBoundingClientRect();return r.x< -1||r.right>width+1}).slice(0,40).map(describe),
  small_control_candidates:[...document.querySelectorAll('main button,main a,main summary')].filter(visible).filter(e=>{const r=e.getBoundingClientRect();return r.width<24||r.height<24}).slice(0,40).map(describe)};
 });}
async function focused(page){return page.evaluate(()=>{const e=document.activeElement,s=getComputedStyle(e);return {tag:e.tagName,id:e.id||null,channel:e.getAttribute('data-contact-channel'),outline_style:s.outlineStyle,outline_width:s.outlineWidth,outline_color:s.outlineColor,box_shadow:s.boxShadow}});}
// Read-only viewport/hit-test diagnostics. Do not scroll or focus inside these.
function contactVisibilityInPage(panelId) {
 const panel=document.getElementById(panelId),button=document.getElementById('apply-free');
 const vv=window.visualViewport;
 const viewport={left:vv?.offsetLeft||0,top:vv?.offsetTop||0,width:vv?.width||window.innerWidth,height:vv?.height||window.innerHeight};
 viewport.right=viewport.left+viewport.width;viewport.bottom=viewport.top+viewport.height;
 const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
 const describe=e=>e?{tag:e.tagName,id:e.id||null,channel:e.getAttribute('data-contact-channel')}:null;
 const channels=[...(panel?.querySelectorAll('a[data-contact-channel]')||[])].map(a=>{
  const r=rect(a),inViewport=r.width>0&&r.height>0&&r.x>=viewport.left&&r.y>=viewport.top&&r.right<=viewport.right&&r.bottom<=viewport.bottom;
  const inset=Math.min(10,r.width/4,r.height/4);
  const points=[[r.x+r.width/2,r.y+r.height/2],[r.x+inset,r.y+inset],[r.right-inset,r.y+inset],[r.x+inset,r.bottom-inset],[r.right-inset,r.bottom-inset]];
  const hit_tests=points.map(([x,y])=>{const hit=document.elementFromPoint(x,y);return {x,y,unobscured:!!hit&&(hit===a||a.contains(hit)),hit:describe(hit)}});
  return {channel:a.getAttribute('data-contact-channel'),rect:r,fully_in_viewport:inViewport,center_unobscured:hit_tests[0].unobscured,all_sample_points_unobscured:hit_tests.every(p=>p.unobscured),hit_tests};
 });
 return {viewport,scroll_y:window.scrollY,scroll_height:document.documentElement.scrollHeight,button:button?rect(button):null,panel:panel?rect(panel):null,channels};
}
async function settleChooser(page,panelId) {
 return page.evaluate(async id=>{
  const started=performance.now(),scrollBefore=window.scrollY;let previous='',stableFrames=0;
  while(performance.now()-started<2500){
   // A background/stalled animation clock must report unresolved positioning,
   // rather than keep the evidence job waiting indefinitely.
   const framesArrived=await new Promise(resolve=>{
    const timer=setTimeout(()=>resolve(false),Math.min(300,Math.max(1,2500-(performance.now()-started))));
    requestAnimationFrame(()=>requestAnimationFrame(()=>{clearTimeout(timer);resolve(true)}));
   });
   if(!framesArrived)return {stable:false,reason:'animation-frame-timeout',elapsed_ms:Math.round(performance.now()-started),scroll_before:scrollBefore,scroll_after:window.scrollY};
   const panel=document.getElementById(id),els=[document.getElementById('apply-free'),panel,...(panel?.querySelectorAll('a[data-contact-channel]')||[])].filter(Boolean);
   const signature=JSON.stringify([window.scrollY,...els.flatMap(e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height].map(n=>Math.round(n*10)/10)})]);
   stableFrames=signature===previous?stableFrames+1:0;previous=signature;
   if(stableFrames>=5&&performance.now()-started>=250)return {stable:true,elapsed_ms:Math.round(performance.now()-started),scroll_before:scrollBefore,scroll_after:window.scrollY};
  }
  return {stable:false,elapsed_ms:Math.round(performance.now()-started),scroll_before:scrollBefore,scroll_after:window.scrollY};
 },panelId);
}
async function recordContactState(page,entry,label,panelId) {
 const settled=await settleChooser(page,panelId),visibility=await page.evaluate(contactVisibilityInPage,panelId);
 const focus=await focused(page);entry.contact_states ||= [];
 entry.contact_states.push({label,settled,visibility,focus});
 check(entry,label+':position-settled',settled.stable,settled);
 for(const channel of ['whatsapp','telegram']){
  const item=visibility.channels.find(c=>c.channel===channel);
  check(entry,label+':'+channel+'-fully-within-viewport-and-sampled-unobscured',!!item&&item.fully_in_viewport&&item.all_sample_points_unobscured,item||null);
 }
 await snap(page,entry,label);
 return focus;
}
async function snap(page,entry,label,selector){
 if(selector)await page.locator(selector).first().scrollIntoViewIfNeeded({timeout:8000});
 const evidence=await geometry(page),bytes=await page.screenshot({type:'jpeg',quality:78,fullPage:false,animations:'disabled'}),dimensions=jpegDimensions(bytes);
 if(dimensions.width!==entry.width||dimensions.height!==844||evidence.inner_width!==entry.width||evidence.dpr!==1)throw Error('Measured viewport or JPEG dimensions mismatch');
 const filename=entry.locale+'-'+entry.width+'-'+label+'.jpg';await fs.writeFile(path.join(out,filename),bytes);
 const stored=await fs.readFile(path.join(out,filename));if(!bytes.equals(stored))throw Error('Saved screenshot mismatch');
 entry.views.push({label,filename,dimensions,sha256:createHash('sha256').update(stored).digest('hex'),captured_at:new Date().toISOString(),geometry:evidence});
 check(entry,label+':no-horizontal-overflow',evidence.scroll_width<=evidence.client_width+1,{scroll_width:evidence.scroll_width,client_width:evidence.client_width});
 return evidence;
}
try{
 browser=await chromium.launch({headless:true});
 for(const locale of ['en','ru','es'])for(const width of [390,320,430]){
  const url=HOST+'/'+locale+ROUTE,entry={locale,width,height:844,url,checks:[],views:[],status:'pending'};report.pages.push(entry);
  const context=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:locale==='en'?'en-CA':locale,reducedMotion:'reduce',acceptDownloads:false});
  const page=await context.newPage();page.setDefaultTimeout(10000);entry.page_errors=[];page.on('pageerror',e=>entry.page_errors.push(String(e.message).slice(0,250)));
  // Prevent background mutation requests and any accidental navigation to contact providers.
  await page.route('**/*',route=>{const r=route.request();if(!['GET','HEAD'].includes(r.method()))return route.abort();if(r.isNavigationRequest()&&r.frame()===page.mainFrame()&&new URL(r.url()).origin!==HOST)return route.abort();return route.continue();});
  try{
   const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});entry.http_status=response?.status();entry.final_url=page.url();
   if(!response||entry.http_status<200||entry.http_status>=300||entry.final_url.replace(/\/$/,'')!==url)throw Error('Wrong route or HTTP status');
   await page.waitForLoadState('networkidle',{timeout:3500}).catch(()=>{});
   await page.waitForFunction(()=>document.fonts.status==='loaded',null,{timeout:3500}).catch(()=>{});
   await page.locator('#intro').waitFor({state:'visible'});entry.title=await page.title();
   await snap(page,entry,'top');
   check(entry,'three-initiation-options',await page.locator('#initiation-choices article').count()===3);
   check(entry,'five-how-to-links',await page.locator('#how-to a').count()===5);
   check(entry,'seven-study-questions',await page.locator('#study-questions li').count()===7);
   check(entry,'practice-video-poster',await page.locator('#tantra-practice-video button').count()>0);
   const options=await page.locator('#initiation-choices').innerText();entry.offer_text=options;
   check(entry,'free-50-100-eur-options',/\b0\s*€|€\s*0\b|free|бесплат|gratis|gratuit/i.test(options)&&/50/.test(options)&&/100/.test(options)&&/€|EUR/.test(options));
   check(entry,'30-and-60-minutes',/30/.test(options)&&/60/.test(options));
   for(const id of ['apply-free','apply-personal','apply-session','apply-answers','apply-feedback'])check(entry,id+':present',await page.locator('#'+id).count()===1);
   await snap(page,entry,'choices','#initiation-choices');
   if(width===390){
    await snap(page,entry,'five-steps','#how-to');
    const summary=page.locator('#study-questions summary'),details=page.locator('#study-questions details');
    check(entry,'questions-initially-collapsed',!(await details.evaluate(e=>e.open)));
    await summary.scrollIntoViewIfNeeded();await summary.focus();await snap(page,entry,'questions-collapsed-focus');
    entry.summary_focus=await focused(page);check(entry,'summary-focus-visible',parseFloat(entry.summary_focus.outline_width)>0&&entry.summary_focus.outline_style!=='none',entry.summary_focus);
    await summary.press('Enter');check(entry,'summary-enter-expands',await details.evaluate(e=>e.open));await snap(page,entry,'questions-expanded');
    await summary.press('Space');check(entry,'summary-space-collapses',!(await details.evaluate(e=>e.open)));
    const order=page.locator('#apply-free');if(await order.getAttribute('type')!=='button')throw Error('Contact control is not the expected non-submit button');await order.scrollIntoViewIfNeeded();
    entry.contact_before_touch=await geometry(page);await order.tap();
    check(entry,'chooser-expanded',await order.getAttribute('aria-expanded')==='true');const panelId=await order.getAttribute('aria-controls');
    const panel=page.locator('[id='+JSON.stringify(panelId)+']');await panel.waitFor({state:'visible'});
    entry.contact_links=await panel.locator('a').evaluateAll(links=>links.map(a=>({channel:a.getAttribute('data-contact-channel'),href:a.href,text:a.textContent.trim()})));
    check(entry,'both-contact-channels-present',entry.contact_links.some(x=>x.channel==='whatsapp')&&entry.contact_links.some(x=>x.channel==='telegram'));
    // No corrective scroll/focus after opening: record where the site's touch handler leaves the links.
    await recordContactState(page,entry,'contact-touch-open-settled',panelId);
    // Reset the same non-submit chooser, then test keyboard opening independently.
    await order.tap();check(entry,'chooser-touch-closes',await order.getAttribute('aria-expanded')==='false');
    await order.scrollIntoViewIfNeeded();await order.focus();entry.contact_before_keyboard=await geometry(page);
    await order.press('Enter');await panel.waitFor({state:'visible'});
    check(entry,'chooser-keyboard-expands',await order.getAttribute('aria-expanded')==='true');
    await recordContactState(page,entry,'contact-keyboard-open-settled',panelId);
    // Tab only, without refocusing the button or scrolling the links into view.
    // Never activate external contact anchors or send a message.
    await page.keyboard.press('Tab');entry.contact_focus=await recordContactState(page,entry,'contact-open-focus',panelId);
    check(entry,'tab-reaches-whatsapp',entry.contact_focus.channel==='whatsapp',entry.contact_focus);
    check(entry,'contact-focus-visible',parseFloat(entry.contact_focus.outline_width)>0&&entry.contact_focus.outline_style!=='none',entry.contact_focus);
    await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
    await page.waitForFunction(()=>window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2,null,{timeout:3000}).catch(()=>{});
    const bottom=await snap(page,entry,'bottom');
    check(entry,'bottom-reached',bottom.scroll_y+bottom.inner_height>=bottom.scroll_height-2,{scroll_y:bottom.scroll_y,inner_height:bottom.inner_height,scroll_height:bottom.scroll_height,remaining_px:Math.max(0,bottom.scroll_height-bottom.scroll_y-bottom.inner_height)});
   }
   check(entry,'no-page-runtime-errors',entry.page_errors.length===0,entry.page_errors);
   entry.status=entry.checks.every(x=>x.pass)?'captured_checks_passed':'captured_with_findings';
  }catch(error){entry.status='capture_failed';entry.error=String(error?.message||error);}
  finally{await context.close();await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');}
 }
}finally{if(browser)await browser.close();report.completed_at=new Date().toISOString();report.status=report.pages.length===9&&report.pages.every(p=>p.status!=='capture_failed')?(report.pages.every(p=>p.status==='captured_checks_passed')?'complete':'complete_with_findings'):'incomplete';await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify({status:report.status,pages:report.pages.map(p=>({locale:p.locale,width:p.width,status:p.status,views:p.views.length,failed_checks:p.checks.filter(c=>!c.pass).map(c=>c.name),error:p.error}))},null,2));
if(report.status==='incomplete')process.exitCode=1;
