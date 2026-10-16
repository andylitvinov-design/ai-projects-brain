import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Run only the read-only in-page geometry function in a synthetic DOM. No
// Playwright launch, network request, screenshot, contact click or model call.
const source=fs.readFileSync(new URL('../capture-tantra-mobile.mjs',import.meta.url),'utf8');
const start=source.indexOf('function contactVisibilityInPage(');
const end=source.indexOf('\nasync function settleChooser(',start);
assert.ok(start>=0&&end>start);
const fn=source.slice(start,end);
function harness({y=500,height=48,occlude=false,descendant=false,visualViewport=null,missing=false}={}){
 const rect={x:30,y,width:300,height,right:330,bottom:y+height};
 const child={tagName:'SPAN',id:'',getAttribute:()=>null};
 const link={tagName:'A',id:'',getAttribute:()=> 'whatsapp',getBoundingClientRect:()=>rect,contains:e=>e===child};
 const overlay={tagName:'NAV',id:'mobile-nav',getAttribute:()=>null};
 const panel={getBoundingClientRect:()=>({...rect,height:130,bottom:y+130}),querySelectorAll:()=>missing?[]:[link]};
 const button={getBoundingClientRect:()=>({...rect,y:y-60,bottom:y-12})};
 const calls=[];
 const context={window:{innerWidth:390,innerHeight:844,visualViewport,scrollY:720},document:{documentElement:{scrollHeight:3000},getElementById:id=>id==='apply-free'?button:panel,elementFromPoint(x,y){calls.push([x,y]);if(x<0||x>=390||y<0||y>=844)return null;return occlude?overlay:descendant?child:link}}};
 return {result:vm.runInNewContext('('+fn+')',context)('panel-id'),calls};
}
test('contact visibility accepts genuinely visible unobscured channels and records actual geometry',()=>{
 const {result,calls}=harness();const c=result.channels[0];
 assert.equal(c.fully_in_viewport,true);assert.equal(c.center_unobscured,true);assert.equal(c.all_sample_points_unobscured,true);
 assert.equal(result.scroll_y,720);assert.equal(result.scroll_height,3000);assert.equal(result.viewport.bottom,844);
 assert.equal(calls.length,5);assert.equal(calls[1][0],40);assert.equal(calls[1][1],510);
});
test('partial bottom clipping never passes just because channel focus or center is visible',()=>{
 const c=harness({y:815}).result.channels[0];assert.equal(c.center_unobscured,true);assert.equal(c.fully_in_viewport,false);assert.equal(c.all_sample_points_unobscured,false);
});
test('fixed bottom navigation obstruction is recorded and fails hit testing',()=>{
 const c=harness({occlude:true}).result.channels[0];assert.equal(c.fully_in_viewport,true);assert.equal(c.center_unobscured,false);assert.equal(c.all_sample_points_unobscured,false);assert.equal(c.hit_tests[0].hit.id,'mobile-nav');
});
test('anchor descendants count as unobscured hits',()=>{
 assert.equal(harness({descendant:true}).result.channels[0].all_sample_points_unobscured,true);
});
test('visual viewport offsets and height bound visibility independently of layout height',()=>{
 const c=harness({visualViewport:{offsetLeft:0,offsetTop:40,width:390,height:480}}).result.channels[0];assert.equal(c.fully_in_viewport,false);
});
test('missing channels remain missing rather than fabricating visibility',()=>{
 assert.equal(harness({missing:true}).result.channels.length,0);
});
test('zero-size channel cannot be fully visible',()=>{
 assert.equal(harness({height:0}).result.channels[0].fully_in_viewport,false);
});

const settleSource=source.slice(source.indexOf('async function settleChooser('),source.indexOf('\nasync function recordContactState('));
test('settling waits at least250ms and multiple stable frames without changing scroll',async()=>{
 let time=0,frames=0;
 const context={performance:{now:()=>time},window:{scrollY:715},document:{getElementById:()=>null},setTimeout,clearTimeout,requestAnimationFrame:callback=>{time+=16;frames++;callback()}};
 const page={evaluate:async(fn,arg)=>vm.runInNewContext('('+fn.toString()+')',context)(arg)};
 const result=await vm.runInNewContext('('+settleSource+')')(page,'panel');
 assert.equal(result.stable,true);assert.ok(result.elapsed_ms>=250);assert.ok(frames>=12);assert.equal(result.scroll_before,result.scroll_after);
});
test('stalled animation frames report unresolved position instead of hanging capture',async()=>{
 const context={performance,window:{scrollY:715},setTimeout,clearTimeout,requestAnimationFrame:()=>{}};
 const page={evaluate:async(fn,arg)=>vm.runInNewContext('('+fn.toString()+')',context)(arg)};
 const result=await vm.runInNewContext('('+settleSource+')')(page,'panel');
 assert.equal(result.stable,false);assert.equal(result.reason,'animation-frame-timeout');assert.equal(result.scroll_before,result.scroll_after);
});
