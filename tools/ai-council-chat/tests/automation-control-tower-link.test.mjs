import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('index.html',root),'utf8');
const css=readFileSync(new URL('house-theme.css',root),'utf8');
const app=readFileSync(new URL('app.js',root),'utf8');
const target='https://holistichouse.vercel.app/admin/automations';
test('Council links to canonical owner-only Automation Control Tower, no API proxy or token transfer',()=>{
  assert.equal(html.split('href="'+target+'"').length-1,2);
  assert.equal(html.split('target="_blank" rel="noopener noreferrer"').length>=3,true);
  assert.match(html,/class="sidebar-automations"/);
  assert.match(html,/class="top-automations"/);
  assert.doesNotMatch(html,/automations[^\\n]+(?:apikey|token|auth|cookie|oauth|secret)=/i);
});
test('Council language switch labels both owner links in RU/EN',()=>{
  assert.match(app,/ru:\\{automations:'Автоматизации',new:/);
  assert.match(app,/en:\\{automations:'Automations',new:/);
  assert.match(html,/data-i18n="automations"/);
  assert.match(css,/\\.top-automations\\{display:inline-flex/);
  assert.match(css,/@media\\(max-width:780px\\)\\{\\.top-automations\\{display:none\\}\\}/);
});
