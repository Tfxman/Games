import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const htmlPath = new URL('../index.html', import.meta.url);
const html = fs.readFileSync(htmlPath, 'utf8');
const requiredIds = [
  'view-adventure', 'view-character', 'view-party', 'view-inventory',
  'view-map', 'view-quests', 'view-journal', 'view-language',
  'pointBuy', 'rollCheck', 'startCombat', 'attackBtn', 'defendBtn', 'fleeBtn'
];
for (const id of requiredIds) {
  assert.match(html, new RegExp('id=["\\']' + id + '["\\']'), `Missing required UI element: ${id}`);
}

const scripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/gi)].map(m => m[1]);
assert.ok(scripts.length >= 2, 'Expected the base app script and Phase 2 rules script');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'world-zero-check-'));
try {
  scripts.forEach((source, index) => {
    const file = path.join(tempDir, `inline-${index}.js`);
    fs.writeFileSync(file, source);
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    assert.equal(result.status, 0, `Inline script ${index} failed syntax check:\\n${result.stderr}`);
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
console.log(`WORLD ZERO prototype checks passed (${requiredIds.length} UI anchors, ${scripts.length} inline scripts).`);
