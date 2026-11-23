# WORLD ZERO — Playable Prototype Rules v0.3

These original lightweight rules support the offline solo campaign and remain subject to playtesting.

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

- Combat is turn-based. Player actions resolve before enemy retaliation.
- Attacks roll d20 + the relevant class attribute modifier against enemy AC.
- A hit deals a random die based on the move's power plus a positive relevant attribute modifier. Natural 20s add a bonus die.
- Defensive moves reduce the next incoming damage; wards absorb damage; healing restores HP; poison deals damage on subsequent enemy turns; escape ends combat.
- Enemy attacks deal a random amount based on the encounter's damage rating.
- If HP reaches zero, the character retreats to safety at half HP and loses 5 gold. The campaign continues.

## Level progression and rewards

The XP threshold is current level × 100. Excess XP carries over. On each level:
- Maximum HP increases by 2 (3 for Warrior).
- The character recovers HP equal to that increase, but does not receive a full refill.
- Class techniques become available at milestone levels 2, 3, and 5; the player chooses when to learn each technique from the Abilities screen.

Leveling does **not** increase mana or stamina, refill those resources, grant gold, or grant a supply bundle. Gold and items can still be earned through story and encounter rewards.

## AI Dungeon Master

The AI DM receives the player's free-form action, a bounded snapshot of character/scene/quest details, and a short recent history. It returns story narration, Japanese dialogue with translation, formative language feedback, a cautious text-only estimate, and suggested actions. The local Node server calls the OpenAI Responses API using a server-side environment key.

The AI is not authoritative. It must not award XP, gold, items, levels, stats, decide dice, resolve combat, or commit quest/world changes. The current prototype displays AI suggestions but still relies on scripted story choices for main-quest progression. Future dynamic story actions must be validated and applied by the game engine.

## Language learning

AI feedback evaluates only the Japanese text actually supplied. English-only actions and gestures provide no Japanese production evidence. A single sample is not a reliable placement test; estimates are formative and should remain low-confidence until supported by multiple examples. Text interaction does not assess listening or pronunciation.

## Technical authority

All current game state and dice rolls remain in browser local storage. The local server protects the OpenAI key from browser exposure, but it is intended for local development, not public deployment. Production multiplayer requires authentication, server-side validation, persistent campaign event records, and durable rate limits.
