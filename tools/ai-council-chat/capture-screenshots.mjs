import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const HOST='https://holistichouse.vercel.app';
const pages=[
['/','home'],['/en','en'],['/ru','ru'],['/es','es'],
['/en/services','en-services'],['/ru/services','ru-services'],['/es/services','es-services'],
['/en/academy','en-academy'],['/en/about','en-about']
];
const out=path.resolve('screenshots');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const list=[];
for(const [route,slug] of pages){
 const p={page:HOST+route,desktop_url:'',mobile_preview_url:'',source:'Playwright Chromium',verified:false};
 for(const mode of ['desktop','mobile']){
  const dims=mode==='desktop'?{width:1440,height:900,deviceScaleFactor:1}:{width:390,height:844,deviceScaleFactor:1,isMobile:true,hasTouch:true};
  const page=await browser.newPage({...dims,locale:'en-CA',timezoneId:'America/Toronto',reducedMotion:'reduce'});
  try{
   const response=await page.goto(p.page,{waitUntil:'domcontentloaded',timeout:25000});
   if(!response||response.status()>=400)throw Error('HTTP '+response?.status());
   await page.waitForLoadState('networkidle',{timeout:5000}).catch(()=>{});
   await page.evaluate(()=>document.fonts?.ready).catch(()=>{});
   await page.screenshot({path:path.join(out,slug+'-'+mode+'.jpg'),type:'jpeg',quality:72,fullPage:false,animations:'disabled'});
   p[mode==='desktop'?'desktop_url':'mobile_preview_url']='https://ai-council-chat.vercel.app/screenshots/'+slug+'-'+mode+'.jpg';
  }catch(e){console.error('Screenshot skipped',p.page,mode,String(e.message||e));}
  finally{await page.close();}
 }
 p.verified=!!(p.desktop_url&&p.mobile_preview_url);
 if(p.verified)list.push(p);
}
await browser.close();
const report={generated_at:new Date().toISOString(),capture_engine:'Playwright Chromium',device_viewport_desktop:'1440x900',device_viewport_mobile:'390x844',screenshots:list};
await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({generated_at:report.generated_at,pages:list.map(x=>x.page)},null,2));
