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
| Rogue | 11 | 4 | 9 | Precision, poison, evasion |
| Cleric | 13 | 10 | 4 | Healing, wards, radiant attacks |

Each class has two basic actions and three milestone techniques. Class techniques unlock at levels 2, 3, and 5. The character learns an unlocked technique from the Abilities screen. Mage and Cleric abilities primarily consume mana; martial abilities consume stamina.

## Combat

- Combat is turn-based. Player actions resolve before enemy retaliation.
- Attacks roll d20 + the relevant class attribute modifier against enemy AC.
- A hit deals a random die based on the move's power plus a positive relevant attribute modifier. Natural 20s add a bonus die.
- Defensive moves reduce the next incoming damage; wards absorb damage; healing restores HP; poison deals damage on subsequent enemy turns.\n- **Retreat:** costs 1 stamina and makes a Dexterity check against enemy AC. Success avoids the enemy's next strike, but the encounter stays active and must still be completed. Failure leaves the player exposed.\n- **Hide:** costs 2 stamina and makes a Dexterity check against enemy AC. Success avoids the next strike and adds +2 damage to the player's next attack; failure leaves the player exposed.\n- **Counter attack:** costs 2 stamina. The player braces, reduces the next hit by 3, then automatically deals 4 damage plus the Strength modifier.\n- **Weapon attack:** costs 1 stamina, uses Strength, and deals 1d8 plus the positive Strength modifier on a hit.\n- **Ranged attack:** costs 2 stamina, uses Dexterity, and deals 1d6 plus the positive Dexterity modifier on a hit.\n- These tactical actions consume the player's turn. Retreat is a defensive maneuver, not an encounter skip; required encounters cannot be bypassed.
- Enemy attacks deal a random amount based on the encounter's damage rating.
- While an enemy is active, story choices, travel/navigation, and free-form Dungeon Master actions are locked. Only combat moves are available until the foe is defeated.
- If HP reaches zero, the character loses 5 gold and wakes at half HP; the unresolved foe returns to full HP. Spent mana and stamina are not restored. After three defeats in the same campaign, the journey ends and the player must start a new campaign.

## Story, choices, and failure

- The opening campaign contains branching outcomes for the first meeting with Hana, the missing-child search, the shrine guardian, the village aftermath, and three distinct Chapter 2 routes: the watchtower, ferry, and sealed shrine.
- Scripted story choices write persistent flags, quest states, inventory, resource, relationship, or destination changes. Later scenes use those flags to alter descriptions and available choices.
- Dialogue interpretation attempts also have consequences. Correct and incorrect guesses affect the recorded understanding and Hana's trust; later scenes respond through changed behavior and circumstances rather than immediate answer explanations.
- Investigation checks can fail. Losing the trail costs time and HP and can change the rescue outcome. Players can abandon the rescue, ignore the alarm, lose the child, or be defeated in combat.
- The missing-child quest can end as complete, failed, or abandoned. A failed quest does not silently become a success later.
- Three combat defeats end the campaign. The game presents a new-campaign action rather than silently reviving the player indefinitely.
- Choices with unmet prerequisites are hidden. Combat actions that cannot currently be paid for are hidden; healing is hidden at full HP, wards are hidden while an existing ward remains, and ranged attacks require sling ammunition.
- During combat, navigation and free-form AI actions are hidden. Combat choices remain available only when the player has the resources and equipment required.

## Level progression and rewards

The XP threshold is current level × 100. Excess XP carries over. On each level:
- Maximum HP increases by 2 (3 for Warrior).
- The character recovers HP equal to that increase, but does not receive a full refill.
- Maximum mana increases by 1 and the character recovers 1 mana.
- Maximum stamina increases by 1 and the character recovers 1 stamina.
- Class techniques become available at milestone levels 2, 3, and 5; the player chooses when to learn each technique from the Abilities screen.

Leveling does **not** fully refill HP, mana, or stamina, grant gold, or grant a supply bundle. Gold and items can still be earned through story and encounter rewards.

## AI Dungeon Master

The AI DM receives the player's free-form action, a bounded snapshot of character/scene/quest details, and a short recent history. It returns story narration, Japanese dialogue with translation, formative language feedback, a cautious text-only estimate, and suggested actions. The local Node server calls the OpenAI Responses API using a server-side environment key.

The AI is not authoritative. It must not award XP, gold, items, levels, stats, decide dice, resolve combat, or commit quest/world changes. The current prototype displays AI suggestions but still relies on scripted story choices for main-quest progression. Future dynamic story actions must be validated and applied by the game engine.

## Language learning and adaptive immersion

The language notebook lets the player choose a starting immersion level: Guided (0), Supported (1), Balanced (2), or Full immersion (3). This is a starting preference, not a fixed difficulty. The campaign adjusts exposure using accumulated communication results. Clear independent Japanese production raises the immersion level fastest; understandable partial Japanese or successful gestures also advance it; poor communication lowers the level and restores more support. The scale is a game adaptation setting, not an official JLPT score.

Dialogue, response, and action choices share one scene panel. The player may answer the speaker, take an action without speaking, or communicate first and then take an action. In scenes where both are useful, the player can respond first and then choose an available action; action choices remain visible after a communication result.\n\nJapanese responses accept kana/kanji or romaji. Romanized input is converted to hiragana for display and phrase matching (for example, `daijoubu desu` becomes `だいじょうぶです`). Exact, appropriate Japanese earns the best communication tier. Understandable partial Japanese earns a good tier. A wrong phrase triggers a d20 + Intelligence repair check; success lets the character infer and clarify the intended meaning for a good tier, while failure is poor. The feedback panel shows the entered phrase, its kana conversion, a natural target phrase, and a rule-based explanation of why the attempt did not match. Gesture responses use d20 + Wisdom (with a small situational bonus for choosing the gesture that fits the moment); a successful appropriate gesture earns a good tier, while a poor gesture has the worst result. Gesture success never outranks clear Japanese production. Phrase scoring and explanations are pattern-based, not a general-purpose grammar engine.

Communication tiers affect NPC trust, reactions, journal history, and future immersion support. The original interpretation quiz remains optional context practice. A wrong guess is not instantly translated; the NPC's behavior and later events provide feedback. Japanese text checks are pattern-based in this prototype, not a full natural-language assessment. It does not yet assess pronunciation or actual listening.

AI feedback evaluates only the Japanese text actually supplied. English-only actions and gestures provide no Japanese production evidence. A single sample is not a reliable placement test; estimates are formative and should remain low-confidence until supported by multiple examples.

## Technical authority

All current game state and dice rolls remain in browser local storage. The local server protects the OpenAI key from browser exposure, but it is intended for local development, not public deployment. Production multiplayer requires authentication, server-side validation, persistent campaign event records, and durable rate limits.
