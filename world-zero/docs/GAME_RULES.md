# WORLD ZERO — Core Rules v0.1

These are prototype rules for the first solo playtest. They are intentionally small and will be refined through playtesting. They are not intended to reproduce any proprietary tabletop ruleset.

## 1. Attributes

Every character has six scores:
- Strength (STR): force, lifting, melee power
- Dexterity (DEX): agility, reflexes, precision
- Constitution (CON): endurance and resilience
- Intelligence (INT): recall, analysis, arcane study
- Wisdom (WIS): awareness, intuition, empathy
- Charisma (CHA): persuasion, presence, leadership

The modifier is:

`floor((score - 10) / 2)`

Examples: 8–9 = −1, 10–11 = +0, 12–13 = +1, 14–15 = +2.

## 2. Character creation

Allocate 27 points across all six attributes. Each score starts at 8 and can be raised to 15 before future ancestry/background adjustments.

| Score | Total point cost |
|---:|---:|
| 8 | 0 |
| 9 | 1 |
| 10 | 2 |
| 11 | 3 |
| 12 | 4 |
| 13 | 5 |
| 14 | 7 |
| 15 | 9 |

The current browser prototype initializes all attributes at 10 (12 points spent) to keep the first session quick; players can allocate the remaining points from the character screen.

## 3. Checks

Roll one twenty-sided die and add the relevant attribute modifier:

`d20 + attribute modifier >= Difficulty Class (DC)`

Suggested DCs:
- 8: easy under pressure
- 12: standard challenge
- 15: hard
- 18: very hard

A natural 20 is not yet a separate critical success rule; a natural 1 is not yet an automatic failure. Those rules need playtesting before adoption.

## 4. Classes and starting vitality

| Archetype | Base HP | Focus |
|---|---:|---|
| Adventurer | 10 | Flexible generalist |
| Warrior | 14 | Frontline and physical challenges |
| Mage | 8 | Knowledge and magic |
| Rogue | 10 | Precision and stealth |
| Cleric | 12 | Support and resilience |

Maximum HP in the prototype is base HP plus twice the Constitution modifier, with a minimum of 1. On level-up, maximum HP increases by 2 and current HP is restored by 2 (up to maximum).

Starter equipment is a placeholder kit. Real item slots, armor class, weapon traits, and consumable effects are not implemented yet.

## 5. Prototype combat

The training encounter is a deliberately simple test target:
- Target HP: 18
- Attack target: total attack roll 12 or higher
- Warrior attack: d20 + STR modifier; damage d10 + positive STR modifier
- Other archetypes: d20 + DEX modifier; damage d6 + positive DEX modifier
- Enemy retaliation: d6 + 2 damage
- Warrior reduces incoming damage by 2; Cleric by 1
- Defending reduces the next incoming damage by a further 3
- Retreat ends the encounter without a reward

This is a training loop, not the final tactical combat system. It currently runs client-side and uses browser randomness; it is not suitable for competitive play or multiplayer authority.

## 6. Experience and levels

The prototype awards small XP rewards for successful checks and defeating the practice target. The threshold for the next level is `current level × 100 XP`. Excess XP carries over. Level-up adds 2 maximum HP and restores 2 HP.

## 7. Authority and multiplayer

The browser prototype is for feel-testing only. In production:
- The server generates and records dice results.
- The server validates character ownership, turn order, actions, damage, inventory, XP, and level changes.
- The AI DM can suggest actions and narrate results but cannot write authoritative state directly.
- Every accepted action creates a campaign event record.
