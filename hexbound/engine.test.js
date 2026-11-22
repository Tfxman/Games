const test=require('node:test'),assert=require('node:assert/strict'),E=require('./engine.js');
function battle(units){const s=E.createGame();s.phase='play';s.player='A';s.team=24;s.units=units.map((u,i)=>({id:'u'+(i+1),alive:true,spent:0,facing:0,...u}));s.nextId=s.units.length+1;return s;}
test('91 regular hexes form 6-11-6 rows',()=>{let n=0,a=[];for(let r=-5;r<=5;r++){let c=0;for(let q=-5;q<=5;q++)if(E.inside(q,r)){n++;c++;}a.push(c);}assert.equal(n,91);assert.deepEqual(a,[6,7,8,9,10,11,10,9,8,7,6]);});
test('all neighboring centers are exactly sqrt(3) apart',()=>{for(let q=-5;q<=5;q++)for(let r=-5;r<=5;r++)if(E.inside(q,r)){const a=E.center(q,r);for(const [dq,dr]of E.D)if(E.inside(q+dq,r+dr)){const b=E.center(q+dq,r+dr);assert.ok(Math.abs(Math.hypot(a.x-b.x,a.y-b.y)-Math.sqrt(3))<1e-9);}}});
test('deployments total 36 each and start with 24 points',()=>{const s=E.createGame();assert.ok(E.autoDeploy(s,'A').ok);assert.equal(E.total(s,'A'),36);assert.ok(E.finishDeployment(s).ok);assert.ok(E.autoDeploy(s,'B').ok);assert.equal(E.total(s,'B'),36);assert.ok(E.finishDeployment(s).ok);assert.equal(s.team,24);});
test('scout, warrior and juggernaut ranges are 5, 4 and 3',()=>{for(const [size,n]of [[1,5],[2,4],[3,3]]){const s=battle([{owner:'A',q:0,r:0,size}]);assert.equal(E.range(s.units[0]),n);assert.ok(E.legalMoves(s,s.units[0]).some(m=>m.d===n));}});
test('occupied hexes block movement and no move leaves board',()=>{const s=battle([{owner:'A',q:0,r:0,size:1},{owner:'B',q:1,r:0,size:1}]);const m=E.legalMoves(s,s.units[0]);assert.ok(m.every(x=>E.inside(x.q,x.r)));assert.ok(m.filter(x=>x.q===2&&x.r===0).every(x=>x.d>2));});
test('side attacks damage and rear attacks eliminate',()=>{let s=battle([{owner:'A',q:-1,r:1,size:2},{owner:'B',q:0,r:0,size:1}]);assert.equal(E.attackPreview(s,s.units[0],s.units[1]).kind,'side');assert.ok(E.attack(s,'u1','u2').ok);assert.equal(s.units[1].size,0);s=battle([{owner:'A',q:-1,r:0,size:1},{owner:'B',q:0,r:0,size:3}]);assert.equal(E.attackPreview(s,s.units[0],s.units[1]).kind,'rear');assert.ok(E.attack(s,'u1','u2').ok);assert.equal(s.units[1].alive,false);});
test('front attacks are illegal and cost nothing',()=>{const s=battle([{owner:'A',q:1,r:0,size:3},{owner:'B',q:0,r:0,size:2}]);assert.equal(E.attack(s,'u1','u2').ok,false);assert.equal(s.team,24);});
test('push requires greater mass and advances the line',()=>{let s=battle([{owner:'A',q:0,r:0,size:2},{owner:'B',q:1,r:0,size:2}]);assert.equal(E.pushPreview(s,'u1',1,0).reason,'not-enough-mass');s=battle([{owner:'A',q:-1,r:0,size:2},{owner:'A',q:0,r:0,size:2},{owner:'B',q:1,r:0,size:1}]);assert.ok(E.push(s,'u2',1,0).ok);assert.equal(s.units[1].q,1);assert.equal(s.units[2].q,2);});
test('split and merge preserve total pieces',()=>{const s=battle([{owner:'A',q:0,r:0,size:3},{owner:'A',q:1,r:0,size:1}]);assert.ok(E.split(s,'u1',1,0,1).ok);assert.equal(E.total(s,'A'),4);assert.ok(E.merge(s,'u1','u2').ok);assert.equal(E.total(s,'A'),4);});
test('axial centers are symmetric around the board center',()=>{for(let q=-5;q<=5;q++)for(let r=-5;r<=5;r++)if(E.inside(q,r)){const a=E.center(q,r),b=E.center(-q,-r);assert.ok(Math.abs(a.x+b.x)<1e-9&&Math.abs(a.y+b.y)<1e-9);}});

test('hex tile edges exactly meet in all six axial directions',()=>{
 const radius=1,eps=1e-9;
 for(let q=-5;q<=5;q++)for(let r=-5;r<=5;r++)if(E.inside(q,r)){
  const a=E.center(q,r),av=E.hexVertices(a.x,a.y,radius);
  for(const [dq,dr] of E.D)if(E.inside(q+dq,r+dr)){
   const b=E.center(q+dq,r+dr),bv=E.hexVertices(b.x,b.y,radius);
   const angle=Math.atan2(b.y-a.y,b.x-a.x);
   const shared=[angle-Math.PI/6,angle+Math.PI/6].map(theta=>({x:a.x+radius*Math.cos(theta),y:a.y+radius*Math.sin(theta)}));
   for(const p of shared)assert.ok(Math.min(...bv.map(v=>Math.hypot(v.x-p.x,v.y-p.y)))<eps, 'neighboring hexagons must share both edge vertices');
  }
 }
});
