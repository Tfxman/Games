const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('./engine.js');

function battle(units) {
  const s = E.createGame('hotseat');
  s.phase = 'play';
  s.player = 'A';
  s.teamMove = E.TEAM_MOVE;
  s.units = units.map(u => ({ spent: 0, ...u }));
  return s;
}

test('the rectangular board contains all 121 hexes', () => {
  let count = 0;
  for (let y = 0; y < E.H; y++) {
    for (let x = 0; x < E.W; x++) {
      assert.equal(E.inside(x, y), true);
      count++;
    }
  }
  assert.equal(count, 121);
});

test('all six axial directions are adjacent and reversible', () => {
  const origin = { x: 5, y: 5 };
  assert.equal(E.DIRS.length, 6);
  for (const [dx, dy] of E.DIRS) {
    const next = { x: origin.x + dx, y: origin.y + dy };
    assert.equal(E.adjacent(origin, next), true);
    assert.equal(E.adjacent(next, origin), true);
  }
});


test('flat-top board geometry gives every neighboring hex the same spacing', () => {
  const origin = E.center(5, 5);
  const distances = E.DIRS.map(([dq, dr]) => {
    const next = E.center(5 + dq, 5 + dr);
    return Math.hypot(next.x - origin.x, next.y - origin.y);
  });
  for (const distance of distances) assert.ok(Math.abs(distance - 1.5) < 1e-9);
});

test('both sides can auto-deploy 36 pieces and start a match', () => {
  const s = E.createGame('hotseat');
  assert.equal(E.autoDeploy(s, 'A').ok, true);
  assert.equal(E.total(s, 'A'), 36);
  assert.equal(E.finishDeployment(s).ok, true);
  assert.equal(E.autoDeploy(s, 'B').ok, true);
  assert.equal(E.total(s, 'B'), 36);
  assert.equal(E.finishDeployment(s).ok, true);
  assert.equal(s.phase, 'play');
  assert.equal(s.teamMove, 24);
});

test('a side angle damages the target stack', () => {
  const s = battle([
    { id: 'a', owner: 'A', x: 5, y: 4, hp: 3, facing: 0 },
    { id: 'b', owner: 'B', x: 5, y: 5, hp: 2, facing: 0 }
  ]);
  const preview = E.attackPreview(s, E.get(s, 'a'), E.get(s, 'b'));
  assert.equal(preview.ok, true);
  assert.equal(preview.kind, 'side');
  assert.equal(preview.damage, 1);
  assert.equal(E.attack(s, 'a', 'b').ok, true);
  assert.equal(E.get(s, 'b').hp, 1);
});

test('a rear angle instantly eliminates the entire target stack', () => {
  const s = battle([
    { id: 'a', owner: 'A', x: 4, y: 5, hp: 1, facing: 0 },
    { id: 'b', owner: 'B', x: 5, y: 5, hp: 3, facing: 0 }
  ]);
  const preview = E.attackPreview(s, E.get(s, 'a'), E.get(s, 'b'));
  assert.equal(preview.ok, true);
  assert.equal(preview.kind, 'rear');
  assert.equal(E.attack(s, 'a', 'b').ok, true);
  assert.equal(E.get(s, 'b').hp, 0);
});

test('a front angle is illegal and does not spend movement', () => {
  const s = battle([
    { id: 'a', owner: 'A', x: 6, y: 5, hp: 3, facing: 0 },
    { id: 'b', owner: 'B', x: 5, y: 5, hp: 2, facing: 0 }
  ]);
  const before = s.teamMove;
  const preview = E.attackPreview(s, E.get(s, 'a'), E.get(s, 'b'));
  assert.equal(preview.ok, false);
  assert.equal(preview.reason, 'attack-only-from-side-or-rear');
  assert.equal(E.attack(s, 'a', 'b').ok, false);
  assert.equal(s.teamMove, before);
  assert.equal(E.get(s, 'b').hp, 2);
});
