import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const code=await readFile(new URL('../telegram-share.js',import.meta.url),'utf8');
function createSandbox(){
  const opened=[];
  const sandbox={open:(url)=>opened.push(url)};
  sandbox.globalThis=sandbox;
  runInNewContext(code,sandbox,{filename:'telegram-share.js'});
  return {api:sandbox.AICouncilTelegram,opened};
}
test('reports identify independent providers and only real completed answers',()=>{
  const {api}=createSandbox();
  const doc=api.reportMarkdown({
    question:'Review a public site',
    answers:[
      {model:'google-direct/gemini-3.8-flash:free-tier',status:'ok',text:'Gemini verified reply'},
      {model:'mistral-direct/mistral-small-2603:experiment',status:'ok',text:'Mistral verified reply'},
      {model:'unavailable',status:'error',error:'429'}
    ],
    museManual:'Muse user-pasted reply',
    synthesisStatus:'ok',synthesis:'Earlier synthesis without Muse'
  });
  assert.match(doc,/Gemini verified reply/);
  assert.match(doc,/Mistral verified reply/);
  assert.match(doc,/Личный Muse — ручная вставка/);
  assert.match(doc,/Muse user-pasted reply/);
  assert.match(doc,/Нет подтверждённого ответа: error/);
  assert.doesNotMatch(doc,/## unavailable\n429/);
  assert.match(doc,/сформирована без ручного ответа Muse/);
});
test('does not accidentally include common provider or Telegram tokens',()=>{
  const {api}=createSandbox();
  const secret='sk-or-v1-abcdefghijklmnopqrstuvwxyz09876';
  const bot='123456789:ABCDabcd0123456789EFGHijkl';
  const doc=api.reportMarkdown({question:'check '+secret,answers:[{model:'mistral',status:'ok',text:bot}]});
  assert.doesNotMatch(doc,/sk-or-v1-/);
  assert.doesNotMatch(doc,/123456789:ABCD/);
  assert.match(doc,/REDACTED_OPENROUTER_KEY/);
  assert.match(doc,/REDACTED_TELEGRAM_TOKEN/);
});
test('short texts get Telegram chooser URL; long texts never silently truncate',()=>{
  const {api}=createSandbox();
  assert.equal(api.telegramUrl('A'.repeat(2601)),null);
  const link=api.telegramUrl('Mistral & Gemini + Muse');
  assert.match(link,/^https:\/\/t\.me\/share\/url\?text=/);
  assert.ok(decodeURIComponent(link.split('text=')[1]).includes('Mistral & Gemini + Muse'));
});
test('share opens Telegram chooser only from an explicit call, never Bot API',async()=>{
  const {api,opened}=createSandbox();
  assert.equal(opened.length,0);
  const result=await api.share('Council','Mistral: hello',true);
  assert.equal(result.status,'chooser');
  assert.equal(opened.length,1);
  assert.match(opened[0],/^https:\/\/t\.me\/share\/url\?text=/);
  const tooLong=await api.share('Council','X'.repeat(3000),true);
  assert.equal(tooLong.status,'too_long');
  assert.equal(opened.length,1);
});
test('integration loads addon before app and enhances each round',async()=>{
  const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const app=await readFile(new URL('../app.js',import.meta.url),'utf8');
  assert.ok(index.indexOf('telegram-share.js')>=0);
  assert.ok(index.indexOf('telegram-share.js')<index.indexOf('app.js'));
  assert.match(app,/AICouncilTelegram\?\.enhanceRound\(block,round,/);
});
