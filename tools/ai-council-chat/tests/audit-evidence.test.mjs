import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const c=vm.createContext({URL,Date});vm.runInContext(readFileSync(new URL('../audit-evidence.js',import.meta.url),'utf8'),c);const E=c.AICouncilEvidence;
const now=Date.now();
function shot(path){const page='https://holistichouse.vercel.app'+path;const captures={};for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844]])captures[mode]={url:'https://ai-council-chat.vercel.app/screenshots/'+(path.replaceAll('/','-').replace(/^-/, '')||'home')+'-'+mode+'-'+('a'.repeat(64))+'.jpg',verified:true,sha256:'a'.repeat(64),source:'Playwright Chromium',viewport:{width,height},width,height,device_scale_factor:1,captured_at:new Date(now-1000).toISOString(),requested_url:page,final_url:page,http_status:200};return {page,source:'Playwright Chromium',verified:true,desktop_url:captures.desktop.url,mobile_preview_url:captures.mobile.url,captures};}
const shots=['/','/en','/ru','/es','/en/services','/ru/services'].map(shot);
function scan(){return {summary:{html_pages_checked:6},pages:shots.map(s=>({url:s.page,path:new URL(s.page).pathname,status:200,title:'Title',h1:['H1'],canonical:s.page,hreflang_tags:['en'],text_excerpt:'Raw public page copy'})),screenshots:[],failures:[{url:'https://holistichouse.vercel.app/missing',error:'404'}]};}
function manifest(){return {schema_version:2,generated_at:new Date(now-500).toISOString(),screenshots:structuredClone(shots)};}
test('prioritization includes a service among first four and in actual model image payload',()=>{
 const data=scan();data.screenshots=E.mergeScreenshots(data,manifest(),now);
 assert.equal(data.screenshots[1].page,shots[4].page);
 const selected=E.visualShots(data);assert.equal(selected.length,2);assert.equal(selected[1].page,shots[4].page);
 const content=E.visualContent('Prompt',selected);const images=content.filter(x=>x.type==='image_url');assert.equal(images.length,4);
 assert.ok(images.some(x=>x.image_url.url===shots[4].mobile_preview_url));assert.ok(images.some(x=>x.image_url.url===shots[4].desktop_url));
 assert.ok(content.some(x=>x.type==='text'&&x.text.includes('/en/services')&&x.text.includes('MOBILE 390x844')));
});
test('legacy, stale, future and wrong-dimension captures are never accepted as verified',()=>{
 for(const mutate of [m=>m.schema_version=1,m=>m.generated_at=new Date(now+1000).toISOString(),m=>m.generated_at=new Date(now-15*86400000).toISOString(),m=>m.screenshots.forEach(s=>s.captures.mobile.width=1280),m=>m.screenshots.forEach(s=>delete s.captures)]){
  const m=manifest();mutate(m);assert.equal(E.mergeScreenshots(scan(),m,now).length,0);
 }
});
test('unfetched or failed routes are excluded and unverified fallback stays unverified',()=>{
 const data=scan();data.pages=data.pages.filter(p=>!p.path.includes('services'));data.screenshots=[{...shots[4],source:'WordPress.com mShots',verified:true}];
 const result=E.mergeScreenshots(data,manifest(),now);assert.equal(result.find(s=>s.page===shots[4].page).verified,false);
});
test('packing preserves raw page metadata, excerpts, failures, and all screenshot provenance',()=>{
 const data=scan();data.screenshots=shots;data.visualInput={model:'vision:free',images_prepared:true,dispatch_attempted:true,response_accepted:true,pages:[shots[4].page]};
 const packed=E.pack(data);assert.deepEqual(JSON.parse(JSON.stringify(packed)),data);
 data.pages[0].text_excerpt='Mutated';assert.equal(packed.pages[0].text_excerpt,'Raw public page copy');assert.equal(packed.screenshots.length,6);
});

test('verified evidence rejects redirects, non-2xx responses and off-origin image URLs',()=>{
 for(const mutate of [m=>m.screenshots.forEach(s=>s.captures.mobile.http_status=302),m=>m.screenshots.forEach(s=>s.captures.mobile.final_url='https://holistichouse.vercel.app/private'),m=>m.screenshots.forEach(s=>{s.captures.mobile.url=s.mobile_preview_url='https://untrusted.example/image.jpg'})]){const m=manifest();mutate(m);assert.equal(E.mergeScreenshots(scan(),m,now).length,0);}
});
