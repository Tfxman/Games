# WORLD ZERO — Playable Prototype Rules v0.2

These rules support the current offline solo campaign. They are original lightweight RPG rules and remain subject to playtesting.

## Attributes and checks

Characters have Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. The modifier is `floor((score - 10) / 2)`. Allocate 27 points; scores begin at 8 and are capped at 15. Point costs: 8=0, 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9.

Checks use `d20 + relevant modifier >= DC`. Suggested DCs are 8 (easy), 12 (standard), 15 (hard), and 18 (very hard).

## Classes

| Class | Base HP | Mana | Stamina | Role |
|---|---:|---:|---:|---|
| Adventurer | 12 | 5 | 5 | Flexible generalist |
| Warrior | 16 | 2 | 8 | Heavy melee and defense |
| Mage | 9 | 12 | 3 | Offensive magic and control |
| Rogue | 11 | 4 | 9 | Precision, poison, escape |
| Cleric | 13 | 10 | 4 | Healing, wards, radiant attacks |

Each class has two basic actions and three milestone techniques. Class techniques unlock at levels 2, 3, and 5. The character learns an unlocked technique from the Abilities screen. Mage and Cleric abilities primarily consume mana; martial abilities consume stamina.

## Combat

- Combat is turn-based. Player actions resolve before the enemy retaliation.
- Attacks roll d20 + the relevant class attribute modifier against enemy AC.
- A hit deals a random die based on the move's power plus a positive relevant attribute modifier. Natural 20s add a bonus die.
- Defensive moves reduce the next incoming damage; wards absorb damage; healing restores HP; poison deals damage on subsequent enemy turns; escape ends combat.
- Enemy attacks deal a random amount based on the encounter's damage rating.
- If HP reaches zero, the character retreats to safety at half HP and loses 5 gold. The campaign continues.

## Level progression and rewards

The XP threshold is current level × 100. Excess XP carries over. On each level:
- Maximum HP increases by 2 (3 for Warrior).
- Maximum mana increases by 2.
- Maximum stamina increases by 2.
- HP, mana, and stamina are fully restored.
- The character receives gold equal to 10 + (new level × 2), plus a supply bundle.
- Class techniques become available at milestone levels 2, 3, and 5.

## Chapter 1

The first chapter follows the stranger's arrival in Kodama Forest, meeting Hana, discovering a missing child, following clues, confronting or calming the shrine guardian, and returning the child. The silver bell and social choices allow non-combat resolution paths. Story branches currently use scripted outcomes.

## Language learning

The prototype records vocabulary practice and rewards Japanese text attempts. It does not yet evaluate grammar, translation, comprehension, pronunciation, or independent language proficiency. The production language engine must assess these separately and adapt the DM's dialogue without allowing the model to alter game rules.

## Technical authority

All current state and dice rolls run in the browser and local storage. They are suitable for solo experimentation only. Production multiplayer requires server-side validation and append-only campaign event records.
