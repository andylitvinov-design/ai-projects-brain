import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'test-results');await mkdir(output,{recursive:true});
const server=http.createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://localhost').pathname;const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep))throw Error('Outside root');const body=await readFile(file);res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':'application/json');res.end(body);}catch{res.writeHead(404);res.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true});
const ids=['fixture/ux:free','fixture/product:free','fixture/tech:free','fixture/synth:free'];
const models=ids.map(id=>({id,name:id,canonical_slug:id.replace(':free','-canonical'),pricing:{prompt:'0',completion:'0',request:'0',image:'0'},architecture:{input_modalities:['text','image'],output_modalities:['text']}}));
const answer='# Detailed proposal\n### T-01 Services\nURL: https://holistichouse.vercel.app/en/services\nAcceptance: check the heading.\n'+'Specific implementation detail. '.repeat(110);
const now=new Date().toISOString();
const screenshots=['/','/en','/ru','/es','/en/services'].map(route=>{const page='https://holistichouse.vercel.app'+route;const captures={};for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844]])captures[mode]={url:'https://ai-council-chat.vercel.app/screenshots/fixture'+route.replaceAll('/','-')+'-'+mode+'-'+('a'.repeat(64))+'.jpg',source:'Playwright Chromium',verified:true,sha256:'a'.repeat(64),requested_url:page,final_url:page,http_status:200,viewport:{width,height},width,height,device_scale_factor:1,captured_at:now};return {page,source:'Playwright Chromium',verified:true,desktop_url:captures.desktop.url,mobile_preview_url:captures.mobile.url,captures};});
const scan={ok:true,summary:{target:'https://holistichouse.vercel.app',host:'https://holistichouse.vercel.app',created_at:now,html_pages_checked:5,discovered_public_pages:5,unreviewed_public_pages:0,failed_pages:0,issue_counts:{missing_description:1}},pages:screenshots.map(s=>({url:s.page,path:new URL(s.page).pathname,status:200,title:'Services',h1:['Services'],text_excerpt:'Original raw services text',description:'',canonical:s.page,issues:['missing_description']})),screenshots:[],failures:[]};
let active;
async function setup(handler,directHandler){
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,acceptDownloads:true});
 const calls=[],errors=[],directCalls=[];
 await context.addInitScript(({ids})=>{if(!localStorage.getItem('ai-council-settings-v2'))localStorage.setItem('ai-council-settings-v2',JSON.stringify({models:ids,lang:'en',remember:false}));sessionStorage.setItem('ai-council-session-key','mock-key-never-sent');},{ids});
 await context.route('**/*',async route=>{const request=route.request(),url=new URL(request.url());
  const json=(body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
  if(url.origin==='https://openrouter.ai'){
   if(url.pathname==='/api/v1/models')return json({data:models});
   if(url.pathname==='/api/v1/key')return json({data:{}});
   if(url.pathname==='/api/v1/chat/completions'){
    const body=request.postDataJSON();calls.push(body);
    assert.deepEqual(body.provider,{allow_fallbacks:false,max_price:{prompt:0,completion:0,request:0,image:0}});
    const result=await handler?.(body,calls.length);
    return json(result?.body||{model:models.find(m=>m.id===body.model).canonical_slug,usage:{cost:0},choices:[{message:{content:answer}}]},result?.status||200);
   }
   throw Error('Unexpected OpenRouter endpoint: '+url.pathname);
  }
  if(url.origin==='https://generativelanguage.googleapis.com'&&directHandler){
   directCalls.push({url:request.url(),method:request.method(),body:request.postDataJSON(),headers:request.headers()});
   const result=await directHandler(request);return json(result.body,result.status||200);
  }
  if(url.origin===origin){
   if(url.pathname==='/api/site-audit')return json(scan);
   if(url.pathname==='/screenshots/manifest.json')return json({schema_version:2,generated_at:now,screenshots});
   return route.continue();
  }
  // All third-party images and requests are blocked. No external inference or credentials.
  return route.abort();
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));await page.goto(origin);await page.waitForFunction(()=>document.getElementById('model0').options.length===4);active={context,page,calls,errors,directCalls};return active;
}
try{
 let release;const pending=new Promise(resolve=>release=resolve);
 let h=await setup(async(body,n)=>{if(n===4)return {status:500,body:{error:{code:500}}};if(n===5)await pending;});
 assert.equal(await h.page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),true,'Mobile overflow');
 await h.page.locator('#question').fill('Review the services page');await h.page.locator('#sendButton').click();
 const exportButton=h.page.getByRole('button',{name:'↓ Export Markdown',exact:true});await exportButton.waitFor();
 assert.equal(h.calls.length,4);const downloadPromise=h.page.waitForEvent('download');await exportButton.click();await downloadPromise;
 await h.page.locator('.spec-open-button').click();await h.page.waitForFunction(()=>document.getElementById('specBuild').disabled);
 await h.page.locator('#specEditor').fill('MY HAND EDIT MUST SURVIVE');release();
 await h.page.waitForFunction(()=>!document.getElementById('specBuild').disabled);
 assert.equal(await h.page.locator('#specEditor').inputValue(),'MY HAND EDIT MUST SURVIVE');
 assert.equal(await h.page.locator('#specProposal').isVisible(),true);
 await h.page.screenshot({path:path.join(output,'mobile-editor-preserved.png')});
 assert.equal(h.errors.length,0,h.errors.join('\n'));await h.context.close();
 h=await setup(()=>({status:429,body:{error:{code:429}}}));
 await h.page.locator('#question').fill('Quota test');await h.page.locator('#sendButton').click();await h.page.getByRole('button',{name:'↓ Export Markdown',exact:true}).waitFor();
 assert.equal(h.calls.length,1,'Quota halt must stop the queued reviewers and synthesis');assert.equal(h.errors.length,0,h.errors.join('\n'));await h.context.close();
 h=await setup();await h.page.locator('#auditSiteButton').click();await h.page.getByRole('button',{name:'↓ Export Markdown',exact:true}).waitFor();
 assert.equal(h.calls.length,4);const visual=h.calls[0].messages[1].content;assert.ok(Array.isArray(visual));
 const urls=visual.filter(x=>x.type==='image_url').map(x=>x.image_url.url);assert.equal(urls.length,4);assert.ok(urls.includes(screenshots[4].mobile_preview_url));assert.ok(urls.includes(screenshots[4].desktop_url));
 const saved=await h.page.evaluate(()=>JSON.parse(localStorage.getItem('ai-council-chats-v1')).threads[0].rounds[0]);assert.equal(saved.siteAudit.pages[0].text_excerpt,'Original raw services text');assert.equal(saved.siteAudit.screenshots.length,5);assert.equal(saved.siteAudit.visualInput.dispatch_attempted,true);
 await h.page.screenshot({path:path.join(output,'mobile-audit-evidence.png')});
 assert.equal(h.errors.length,0,h.errors.join('\n'));await h.context.close();
 h=await setup(undefined,request=>request.method()==='GET'?{body:{name:'models/gemini-3.8-flash'}}:{status:500,body:{error:{message:'No direct generation should be attempted'}}});
 await h.page.locator('#topSettings').click();await h.page.locator('#geminiDirectKey').fill('mock-direct-key-never-sent');await h.page.locator('#geminiFreeConfirm').check();await h.page.locator('#geminiDirectConnect').click();
 await h.page.waitForFunction(()=>document.getElementById('model0').options.length===5);
 assert.equal(await h.page.locator('#model0 option[value="google-direct/gemini-3.8-flash:free-tier"]').isDisabled(),true,'Direct option must remain disabled after attestation');
 // Simulate an existing saved direct selection from the preceding owner version.
 await h.page.evaluate(()=>{const settings=JSON.parse(localStorage.getItem('ai-council-settings-v2'));settings.models[0]='google-direct/gemini-3.8-flash:free-tier';localStorage.setItem('ai-council-settings-v2',JSON.stringify(settings));});
 await h.page.reload();await h.page.waitForFunction(()=>document.getElementById('model0').options.length===5);
 assert.match(await h.page.locator('#statusText').innerText(),/Strict-free mode/);assert.equal(await h.page.locator('#costBadgeText').innerText(),'BLOCKED');
 await h.page.locator('#question').fill('Blocked direct selection');await h.page.locator('#sendButton').click();await h.page.locator('#globalError:not(.hidden)').waitFor();
 assert.equal(h.directCalls.filter(r=>r.method==='POST').length,0);assert.equal(h.calls.length,0,'An attested direct choice cannot start a mixed Council round');
 assert.equal(h.errors.length,0,h.errors.join('\n'));await h.context.close();
 console.log('PASS: 390x844 UI, failed-synthesis export, edit race, quota global stop, service image request payload and raw history, strict-free direct-provider block and disabled restored selections; all model calls mocked.');
}finally{await active?.context.close().catch(()=>{});await browser.close();await new Promise(resolve=>server.close(resolve));}
