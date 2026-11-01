import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const models=[
 {id:'synthetic/first:free',name:'Synthetic free fixture one',pricing:{prompt:'0',completion:'0'}},
 {id:'synthetic/second:free',name:'Synthetic free fixture two',pricing:{prompt:'0',completion:'0'}},
 {id:'synthetic/paid:free',name:'Reject nonzero fixture',pricing:{prompt:'1',completion:'0'}},
 {id:'synthetic/unknown:free',name:'Reject missing fixture',pricing:{completion:'0'}}
];
test('catalog, real ancestor visibility, consent, manual export and responsive layout',async({page,context},testInfo)=>{
 const forbidden=[],catalogRequests=[];const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 // Browser traffic cannot leave localhost: public catalog is intercepted, never forwarded.
 // No actual or fake credential is entered; chat requests are forbidden, even mocked ones.
 await context.route('**/*',async route=>{
  const req=route.request(),url=new URL(req.url());
  if(req.headers().authorization){forbidden.push('Unexpected Authorization header');await route.abort();return;}
  if(url.href==='https://openrouter.ai/api/v1/models'&&req.method()==='GET'){
   catalogRequests.push(url.href);await route.fulfill({status:200,headers:{'Access-Control-Allow-Origin':'http://127.0.0.1:4173'},contentType:'application/json',body:JSON.stringify({data:models})});return;
  }
  if(url.origin==='http://127.0.0.1:4173'&&req.method()==='GET'){await route.continue();return;}
  forbidden.push(`${req.method()} ${url.origin}${url.pathname}`);await route.abort();
 });
 await page.goto('/');await expect(page.locator('[data-model]')).toHaveCount(2);
 await expect(page.locator('[data-model]:checked')).toHaveCount(0);
 await expect(page.locator('#consent')).not.toBeChecked();
 await page.locator('#question').fill('Synthetic public UI fixture question');
 await page.locator('#consent').check();await page.locator('#question').fill('Synthetic public UI fixture question revised');
 await expect(page.locator('#consent')).not.toBeChecked();
 await page.locator('#consent').check();await page.locator('[data-model]').first().check();
 await expect(page.locator('#consent')).not.toBeChecked();
 await page.locator('#consent').check();await page.locator('#synthModel').selectOption(models[0].id);
 await expect(page.locator('#consent')).not.toBeChecked();
 await page.locator('#synthModel').selectOption('');await page.locator('#refreshModels').click();
 await expect.poll(()=>catalogRequests.length).toBe(2);await expect(page.locator('#synthModel')).toHaveValue('');
 await expect(page.locator('#copyReport')).toBeHidden();
 await page.getByText('Вставить ответ Muse',{exact:true}).click();
 const manual='SYNTHETIC TEST FIXTURE, not a model answer: <script>alert(1)</script> Public example.';
 await page.locator('#museAnswer').fill(manual);await page.locator('#addMuse').click();
 await expect(page.locator('#results')).toContainText(manual);await expect(page.locator('#results script')).toHaveCount(0);
 await expect(page.locator('#copyReport')).toBeVisible();await expect(page.locator('#downloadReport')).toBeVisible();
 await expect(page.locator('#summaryText')).toBeHidden();await expect(page.locator('#consent')).not.toBeChecked();
 const downloading=page.waitForEvent('download');await page.locator('#downloadReport').click();const download=await downloading;
 const report=await readFile(await download.path(),'utf8');expect(report).toContain(manual);expect(report).toContain('Личный Muse — вручную');expect(report).toContain('Synthetic public UI fixture question revised');
 await page.locator('#consent').check();await page.locator('#askBtn').click();
 await expect(page.locator('#status')).toContainText('Введи бесплатный ключ');
 await expect(page.locator('#apiKey')).toHaveValue('');await expect(page.locator('#callEstimate')).toContainText('страницы: 0');
 const overflow=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(overflow.scroll).toBeLessThanOrEqual(overflow.width+1);
 expect(forbidden).toEqual([]);expect(errors).toEqual([]);
 await page.screenshot({path:testInfo.outputPath('manual-export.png'),fullPage:true});
});
