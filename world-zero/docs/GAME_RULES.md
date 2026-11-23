# WORLD ZERO — Offline Prototype Rules v0.4

## Attributes and challenges

Characters have Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. The modifier is `floor((score - 10) / 2)`. Allocate 27 points; scores begin at 8 and are capped at 15. Point costs: 8=0, 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9.

There are no dice, random rolls, or AI adjudication. Each challenge compares the relevant attribute modifier with a fixed difficulty:

| Difficulty | Required modifier |
|---|---:|
| Easy | -1 |
| Standard | 0 |
| Hard | +1 |
| Very hard | +2 |

A modifier equal to or higher than the requirement succeeds. A lower modifier fails. Higher relevant ability scores therefore make challenges easier. Tracking uses Wisdom, social approaches use Charisma, stealth and movement use Dexterity, hauling uses Strength, and interpreting patterns uses Intelligence. Combat attacks use Strength or Intelligence depending on class; ranged attacks and evasion use Dexterity.

## Classes

| Class | Base HP | Mana | Stamina | Role |
|---|---:|---:|---:|---|
| Adventurer | 12 | 5 | 5 | Flexible generalist |
| Warrior | 16 | 2 | 8 | Heavy melee and defense |
| Mage | 9 | 12 | 3 | Offensive magic and control |
| Rogue | 11 | 4 | 9 | Precision, poison, evasion |
| Cleric | 13 | 10 | 4 | Healing, wards, radiant attacks |

Class techniques unlock at levels 2, 3, and 5. Mage and Cleric abilities primarily consume mana; martial abilities consume stamina.

## Combat

- Player actions resolve before enemy retaliation.
- Attacks use a fixed challenge based on the relevant attribute and enemy difficulty. Success deals fixed move damage plus the positive relevant modifier; failure deals no damage.
- Defensive moves reduce incoming damage; wards absorb damage; healing restores HP; poison deals fixed damage on subsequent enemy turns.
- Retreat costs 1 stamina and uses Dexterity; success avoids the next strike.
- Hide costs 2 stamina, requires cover, and uses a harder Dexterity challenge; success avoids the next strike and prepares the next attack.
- Counter attack costs 2 stamina, reduces the next hit by 3, then deals 4 damage plus the positive Strength modifier.
- Weapon attack costs 1 stamina and uses Strength. Ranged attack costs 2 stamina, uses Dexterity, and consumes one sling stone.
- Enemy attacks deal a fixed amount based on the encounter damage rating. No damage dice are used.
- While an enemy is active, story choices and navigation are locked. Required encounters cannot be escaped.
- If HP reaches zero, the character loses 5 gold and wakes at half HP; the unresolved foe returns to full HP. After three defeats, the journey ends.

## Story and Japanese learning

- The campaign retains three chapters, branching watchtower/ferry/sealed-shrine routes, persistent relationships, hidden quests, meaningful failure, and fourteen authored endings.
- Quests remain hidden until the story reveals them; choices with unmet prerequisites are hidden.
- Each dialogue scene offers multiple curated natural Japanese responses and multiple incorrect distractors. The player selects from fixed options rather than typing.
- Accepted variants should express the same intent naturally, including appropriate differences in politeness and sentence length.
- Duolingo-inspired practice patterns include contextual recognition, multiple-choice selection, plausible distractors, repeated vocabulary exposure, and flashcard retrieval. All lesson text is original to WORLD ZERO.
- The flashcard deck contains Japanese vocabulary, kana readings, English meanings, and example phrases. Players reveal answers and mark cards known or still learning; progress is saved locally.
- Hover translations are available for supported interface and authored story phrases.

## Level progression

The XP threshold is current level × 100. Excess XP carries over. On each level:
- Maximum HP increases by 2 (3 for Warrior), and the character recovers that amount.
- Maximum mana increases by 1 and the character recovers 1 mana.
- Maximum stamina increases by 1 and the character recovers 1 stamina.
- Class techniques unlock at levels 2, 3, and 5.

Leveling does not grant gold, full resource refills, or a supply bundle.

## Technical notes

The game runs in the browser and stores progress in local storage. It makes no API calls and requires no AI service, secret key, backend, or Node server.
