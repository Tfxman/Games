# WORLD ZERO: The Other Tongue

A browser-based, isekai-inspired fantasy RPG where Japanese is learned through story, roleplay, and meaningful choices.

## Current status

**Playable single-player Chapter 1 prototype.** Open `index.html` in a modern browser; no build step or account is required. The campaign saves locally in the browser.

Implemented:
- Character creation with five classes, species/background choices, six attributes, and 27-point buy
- Class-specific basic moves and unlockable techniques/spells
- Turn-based combat with D20 attack rolls, enemy armor class, damage, defensive moves, healing, wards, poison, and escape
- Mana and stamina resources
- XP, automatic level-ups, increased maximum HP/mana/stamina, full resource restoration, gold, supply bundles, and class ability unlocks
- A branching Chapter 1 story with the traveler Hana, missing-child quest, forest clues, shrine guardian, and multiple resolutions
- Free-form roleplay input, Japanese vocabulary attempt tracking, journal, quest state, inventory, and map
- Local save and reset

## Important limitations

This is a playable offline prototype, not the finished AI-driven multiplayer product. Story branches and Japanese rewards are scripted. Free-form Japanese input is detected as Japanese text but is **not** yet translated or evaluated for correctness. There is no speech recognition, AI DM, server-side persistence, authentication, online multiplayer, or authoritative server combat. Browser save data and rolls can be modified by the player. The map is illustrative, and companion behavior/equipment effects remain limited.

## Run locally

Open `world-zero/index.html` in a modern desktop or mobile browser. Progress is saved in that browser's local storage. Use **Reset** to start a new campaign.

## Project structure

- `world-zero/index.html` — playable no-build browser prototype
- `world-zero/docs/GAME_DESIGN_SPEC.md` — product and system specification
- `world-zero/docs/GAME_RULES.md` — prototype rules
- `world-zero/docs/DEVELOPMENT_ROADMAP.md` — phased development plan
- `world-zero/database/schema.sql` — initial PostgreSQL/Supabase schema draft
- `world-zero/scripts/check-prototype.mjs` — UI-anchor, JavaScript syntax, and rules sanity checks

## Design principles

1. Gameplay first; language learning is embedded in the adventure.
2. Players can attempt open-ended actions, not only predefined choices.
3. Language proficiency is assessed independently by skill and player.
4. The game engine, not the language model, validates mechanics.
5. Campaign history and world consequences persist between sessions.
6. Single-player and multiplayer share the same underlying rules and data model.

## Planned production stack

- Frontend: React + TypeScript
- Backend/database: Supabase + PostgreSQL
- AI DM: OpenAI API through a secure server-side endpoint
- Multiplayer: Supabase Realtime
- Hosting: a server-capable host for AI/backend features

Never put an OpenAI API key or Supabase service-role key in browser code.
