import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'.',testMatch:'*.spec.mjs',timeout:20000,globalTimeout:180000,
 workers:1,retries:0,forbidOnly:!!process.env.CI,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173',serviceWorkers:'block',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:['chromium','webkit'].flatMap(browserName=>[320,390,1280].map(width=>({name:`${browserName}-${width}`,use:{browserName,viewport:{width,height:844}}}))),
 webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1 --directory ..',url:'http://127.0.0.1:4173',reuseExistingServer:false,timeout:15000}
});
