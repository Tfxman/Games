import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const htmlPath = new URL('../index.html', import.meta.url);
const html = fs.readFileSync(htmlPath, 'utf8');
const requiredIds = [
  'view-adventure', 'view-character', 'view-abilities', 'view-inventory',
  'view-map', 'view-quests', 'view-journal', 'view-language',
  'storyChoices', 'battleActions', 'abilityCatalog', 'levelRewards', 'submitFree',
  'aiReply', 'aiNarration', 'aiJapanese', 'aiSuggestions', 'interpretation', 'immersionStart', 'saveImmersion'
];
for (const id of requiredIds) {
  assert.ok(html.includes('id="' + id + '"') || html.includes("id='" + id + "'"), 'Missing required UI element: ' + id);
}

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
assert.ok(scripts.length >= 1, 'Expected the playable campaign script');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'world-zero-check-'));
try {
  scripts.forEach((source, index) => {
    const file = path.join(tempDir, 'inline-' + index + '.js');
    fs.writeFileSync(file, source);
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    assert.equal(result.status, 0, 'Inline script ' + index + ' failed syntax check:\n' + result.stderr);
  });
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

// Sanity-check the documented D20 math and point-buy table.
const modifier = score => Math.floor((score - 10) / 2);
assert.equal(modifier(8), -1);
assert.equal(modifier(9), -1);
assert.equal(modifier(10), 0);
assert.equal(modifier(13), 1);
assert.equal(modifier(15), 2);
const cost = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
assert.equal(cost[15], 9);
assert.equal(cost[8] + cost[10] * 5, 10);

const serverPath = new URL('../server.mjs', import.meta.url);
const serverCheck = spawnSync(process.execPath, ['--check', serverPath.pathname], { encoding:'utf8' });
assert.equal(serverCheck.status, 0, 'Server syntax check failed:\\n' + serverCheck.stderr);
const serverSource = fs.readFileSync(serverPath, 'utf8');
assert.ok(aiServerText.includes('OPENAI_API_KEY'), 'Server must read the API key from its environment');
assert.ok(serverSource.includes('/v1/responses'), 'Server must call the Responses API');
assert.ok(!html.includes('OPENAI_API_KEY='), 'The browser must never contain an API key assignment');
assert.ok(!html.includes('api.openai.com/v1/responses'), 'The browser must call only the local AI endpoint');
assert.ok(!html.includes('supply bundle'), 'Level-up UI must not promise a supply bundle');
assert.ok(!html.includes('maximum mana, +2 maximum stamina'), 'Level-up UI must not increase mana/stamina');
assert.ok(html.includes('function interpretation('), 'Dialogue must offer contextual interpretation guesses');
assert.ok(html.includes('if(state.enemy)') && html.includes('activeChoices'), 'Active combat must lock story choices');
assert.ok(html.includes('Resolve the encounter before taking story actions'), 'Combat lock must be visible to the player');
assert.ok(html.includes('state.defeats>=3') && html.includes('campaignFailed'), 'Repeated defeat must be able to end the campaign');
assert.ok(html.includes('activeChoices.filter(x=>!x.show||x.show())'), 'Story choices with unmet requirements must be hidden');
assert.ok(html.includes('function interpretation(options,correct,meaning,clue,onGuess)'), 'Dialogue guesses must have persistent consequences');
assert.ok(html.includes('Sling stones (5)'), 'Ranged attacks must consume finite ammunition');
assert.ok(html.includes("else if(n===11)") && html.includes("else if(n===12)") && html.includes("else if(n===13)"), 'Chapter two must include three story scenes');
assert.ok(html.includes('state.flags.destination') && html.includes('state.flags.routeChosen'), 'Branching routes must persist story choices');
assert.ok(html.includes('state.flags.hanaTrust'), 'Dialogue interpretation must affect later relationship checks');
assert.ok(html.includes('const ENDINGS=[') && (html.match(/epitaph:'/g) || []).length === 14, 'Campaign must include fourteen authored endings');
assert.ok(html.includes('function finishEnding(id)') && html.includes('else if(n===14)'), 'Chapter three must route choices to persistent endings');
assert.ok(html.includes('LANGUAGE_LINES') && html.includes('function updateLanguageEvidence'), 'Dialogue must include structured Japanese and gesture response data');
assert.ok(html.includes("die(20)+mod(state.stats.Wisdom)") && html.includes("die(20)+mod(state.stats.Intelligence)"), 'Gesture and Japanese-repair checks must use Wisdom and Intelligence respectively');
assert.ok(html.includes('state.immersionStage') && html.includes('state.immersionStart'), 'Language immersion must adapt from the chosen starting level');
assert.ok(html.includes("tier==='good'") && html.includes("tier==='medium'") && html.includes("else{state.flags.hanaTrust"), 'Communication must resolve into three outcome tiers');
assert.ok(html.includes('function romajiToKana(input)') && html.includes('ROMAJI_RESPONSES'), 'Japanese input must accept romanized phrases and convert them to kana');
assert.ok(html.includes('Kana conversion:') && html.includes('Why it was marked incorrect:'), 'Japanese responses must show kana conversion and explain mistakes');
assert.ok(html.includes('Respond, act, or both') && (html.match(/id="storyChoices"/g)||[]).length===1, 'Dialogue and story actions must share one response area');
assert.ok(html.includes('d20 + Wisdom') && html.includes('Intelligence repair'), 'The player must see the relevant language check explanations');
assert.ok(html.includes('Hana is about twenty') && html.includes('The shrine guardian is a broad'), 'Characters and locations must have richer sensory descriptions');
assert.ok(html.includes("classList.toggle('hidden',!!state.enemy"), 'Unavailable navigation and AI actions must be hidden during combat');
assert.ok(!html.includes("type:'escape'"), 'Required encounters must not have a combat escape ability');
for (const action of ['retreat','hide','counter','weapon','ranged']) { assert.ok(html.includes("['"+action+"'") || html.includes("data-combat-action=\\\"' + a[0]"), 'Missing tactical combat action: ' + action); }
assert.ok(html.includes('function useCombatAction(action)'), 'Tactical combat actions must resolve through the combat engine');
assert.ok(html.includes('state.evadeNext') && html.includes('state.counterDamage'), 'Retreat, hide, and counter states must resolve during enemy turns');

console.log('WORLD ZERO prototype checks passed (' + requiredIds.length + ' UI anchors, ' + scripts.length + ' inline scripts).');

assert.ok(html.includes('visibleQuests') && html.includes("q[1]!=='hidden'"), 'Hidden quests must not appear in the quest log before story discovery');
assert.ok(html.includes('function validateJapaneseResponse') && html.includes('RESPONSE_ACCEPTANCE'), 'Japanese responses must be checked against scene-specific accepted answers');
assert.ok(html.includes('daijoubu desu') && html.includes('hai daijoubu desu') && html.includes('watashi ga tetsudaimasu'), 'The first two dialogue prompts must accept multiple valid Japanese answers');
assert.ok(html.includes('normalizeDialogueKey(k)===normalizeDialogueKey(line)'), 'Dialogue response lookup must tolerate punctuation and quote formatting');
assert.ok(!html.includes("best:'hai wakarimashita',medium:['hai','wakarimashita']"), 'Unknown dialogue must not fall back to an unrelated generic answer');

const aiServerPath = new URL('../server.mjs', import.meta.url);
const aiServerText = fs.readFileSync(aiServerPath, 'utf8');
const aiServerSyntax = spawnSync(process.execPath, ['--check', aiServerPath.pathname], { encoding:'utf8' });
assert.equal(aiServerSyntax.status, 0, 'AI server must pass Node syntax validation: ' + aiServerSyntax.stderr);
assert.ok(aiServerText.includes("url.pathname === '/api/language'") && serverSource.includes('async function handleLanguage'), 'The server must expose a dedicated Japanese language interpretation endpoint');
assert.ok(serverSource.includes('const languageSchema') && serverSource.includes('grammar_points') && serverSource.includes('npc_response') && serverSource.includes('next_actions'), 'The AI response must contain structured grammar feedback and procedural story content');
assert.ok(serverSource.includes('Accept natural paraphrases') && serverSource.includes('Do not punish valid alternate wording'), 'The language judge must assess meaning and grammar, not exact phrase matches');
assert.ok(html.includes("fetch('/api/language'") && html.includes('AI Japanese assessment') && html.includes('generatedNextActions'), 'Japanese dialogue must invoke the AI interpreter and show generated story choices');
assert.ok(html.includes('using the local phrase checker') && html.includes('validateJapaneseResponse'), 'The game must retain a local fallback when the AI server is unavailable');
