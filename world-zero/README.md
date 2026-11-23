# WORLD ZERO: The Other Tongue

A browser-based, isekai-inspired fantasy RPG where Japanese is learned through story, roleplay, and meaningful choices.

## Current build

**Offline, single-player branching campaign.** The game is a self-contained browser experience hosted on GitHub Pages. It does not use AI, an API key, a backend, or network requests during play.

Implemented:
- Character creation with five classes, six attributes, and 27-point buy
- Class-specific moves, spells, and unlockable techniques
- Deterministic combat with fixed damage, resource costs, defense, healing, wards, poison, and stun
- Attribute challenges: the relevant ability modifier is compared directly with a fixed difficulty; no dice or random checks
- Level progression with HP, mana, and stamina increases
- Three campaign chapters, watchtower/ferry/sealed-shrine routes, persistent relationships, hidden quests, failure states, and 14 authored endings
- Fixed Japanese multiple-choice responses; each dialogue offers several accepted natural responses and several contextually incorrect distractors
- Duolingo-inspired practice patterns: short contextual prompts, recognition choices, plausible distractors, repeated vocabulary exposure, and flashcard review. WORLD ZERO uses original phrases and content, not copied Duolingo lessons or assets
- In-game flashcards with Japanese, kana reading, English meaning, example sentence, reveal, next/previous, and known/still-learning tracking
- Japanese hover translations for supported interface and story phrases, with highlight and translation tooltip
- Four adaptive immersion starting levels
- Local campaign save, inventory, quests, map, journal, and character progression

## Play

https://tfxman.github.io/Games/world-zero/

Open the page in a modern browser. No installation, account, AI service, or API key is required. Progress saves in that browser's local storage; another browser/device will have a separate save.

## Challenge rules

Modifier = `floor((score - 10) / 2)`.

| Difficulty | Required modifier |
|---|---:|
| Easy | -1 |
| Standard | 0 |
| Hard | +1 |
| Very hard | +2 |

The relevant modifier is compared directly with the threshold. Higher ability modifiers make the associated challenge easier. There are no dice rolls. Combat damage is fixed by the move and encounter.

## Limitations

This is a solo browser prototype, not a multiplayer service. Dialogue responses are authored and curated per scene rather than evaluated by an open-ended grammar parser. The flashcard deck covers vocabulary in the current campaign build and should grow with new scenes. Hover translations cover the supported interface and authored phrase library; expanding complete bilingual coverage is ongoing. There is no speech recognition, pronunciation assessment, live listening assessment, cloud save, or online multiplayer.

## Project structure

- `index.html` — complete offline browser game
- `docs/GAME_DESIGN_SPEC.md` — product and system specification
- `docs/GAME_RULES.md` — deterministic rules
- `docs/DEVELOPMENT_ROADMAP.md` — development roadmap
- `database/schema.sql` — unused initial database schema draft
- `scripts/check-prototype.mjs` — UI, JavaScript, and rules checks
