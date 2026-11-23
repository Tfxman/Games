import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const requiredIds = ['view-adventure','view-character','view-abilities','view-inventory','view-map','view-quests','view-journal','view-language','storyChoices','battleActions','abilityCatalog','levelRewards','interpretation','immersionStart','saveImmersion','flashcardFront','flashcardBack','flashPrev','flashNext','flashReveal','flashKnown','flashMissed'];
for (const id of requiredIds) assert.ok(html.includes('id="'+id+'"'), 'Missing UI element: '+id);

const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
assert.ok(scripts.length>=1,'Expected a playable inline browser script');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'world-zero-check-'));
try { scripts.forEach((source,n)=>{const file=path.join(temp,'script-'+n+'.js');fs.writeFileSync(file,source);const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(result.status,0,'Inline script syntax error:\n'+result.stderr);}); }
finally { fs.rmSync(temp,{recursive:true,force:true}); }

assert.ok(!html.includes('fetch('),'The browser game must not make network requests');
assert.ok(!html.includes('/api/language')&&!html.includes('/api/dm'),'No AI endpoints should be referenced');
assert.ok(!html.includes('OPENAI_API_KEY')&&!html.includes('askDungeonMaster'),'No AI configuration or Dungeon Master code should remain');
assert.ok(!html.includes('freeInput')&&!html.includes('jpReply')&&!html.includes('submitFree'),'No free-form text response inputs should remain');
assert.ok(!html.includes('die(')&&!html.includes('d20'),'Dice mechanics must be removed');
assert.ok(html.includes('function challenge(attribute,difficulty)'),'Ability challenges must be deterministic');
assert.ok(html.includes("challenge('Wisdom',1)")&&html.includes("challenge('Strength',0)")&&html.includes("challenge('Dexterity',2)"),'Story and combat should use different ability-based challenge difficulties');
assert.ok(html.includes('Choose your Japanese response')&&html.includes('data-response='),'Japanese responses must be fixed multiple-choice options');
assert.ok(html.includes('const accepted=')||html.includes('const acceptedChoices='),'Each dialogue scene must provide a set of correct responses');
assert.ok(html.includes('wrongPool')&&html.includes("tier:'poor'"),'Each dialogue scene must include incorrect distractors');
assert.ok(html.includes('const FLASHCARDS=')&&(html.match(/jp:'/g)||[]).length>=25,'The game must include a substantial in-game vocabulary deck');
assert.ok(html.includes('function renderFlashcard()')&&html.includes('flashcardKnown')&&html.includes('flashcardMissed'),'Flashcard review and progress must be saved');
assert.ok(html.includes('function bilingualize')&&html.includes('data-ja')&&html.includes('.bilingual:hover'),'English text must expose Japanese hover translations');
assert.ok(html.includes('visibleQuests')&&html.includes("q[1]!=='hidden'"),'Hidden quests must stay undiscovered until story triggers');
assert.ok(html.includes('const ENDINGS=[')&&(html.match(/epitaph:'/g)||[]).length===14,'The campaign must retain fourteen authored endings');
assert.ok(html.includes("else if(n===11)")&&html.includes("else if(n===12)")&&html.includes("else if(n===13)"),'Chapter two must retain all three routes');
assert.ok(html.includes('state.flags.destination')&&html.includes('state.flags.routeChosen'),'Route decisions must persist');
assert.ok(html.includes('state.flags.hanaTrust'),'Japanese response outcomes must affect relationships');
assert.ok(html.includes('Sling stones (5)'),'Ranged attacks must retain finite ammunition');
assert.ok(html.includes('state.defeats>=3')&&html.includes('campaignFailed'),'Repeated defeat must still end the campaign');
assert.ok(html.includes('activeChoices.filter(x=>!x.show||x.show())'),'Unavailable story options must remain hidden');
assert.ok(html.includes('function useCombatAction(action)')&&html.includes('state.evadeNext')&&html.includes('state.counterDamage'),'Combat actions must resolve deterministically');
assert.ok(html.includes('function finishEnding(id)')&&html.includes('else if(n===14)'),'The Lantern Archive ending flow must remain playable');
console.log('WORLD ZERO offline prototype checks passed ('+requiredIds.length+' UI anchors, '+scripts.length+' inline scripts).');
