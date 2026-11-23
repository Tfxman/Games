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
  'aiReply', 'aiNarration', 'aiJapanese', 'aiSuggestions'
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
assert.ok(serverSource.includes('OPENAI_API_KEY'), 'Server must read the API key from its environment');
assert.ok(serverSource.includes('/v1/responses'), 'Server must call the Responses API');
assert.ok(!html.includes('OPENAI_API_KEY'), 'The browser must never contain the OpenAI API key');
assert.ok(!html.includes('supply bundle'), 'Level-up UI must not promise a supply bundle');
assert.ok(!html.includes('maximum mana, +2 maximum stamina'), 'Level-up UI must not increase mana/stamina');

console.log('WORLD ZERO prototype checks passed (' + requiredIds.length + ' UI anchors, ' + scripts.length + ' inline scripts).');
