# WORLD ZERO: The Other Tongue

A browser-based, isekai-inspired fantasy RPG where Japanese is learned through story, roleplay, and meaningful choices.

## Current status

**Playable single-player Chapter 1 prototype with an AI Dungeon Master integration.** Run the Node server and configure an OpenAI API key to use AI turns. The campaign game state still saves locally in the browser.

Implemented:
- Character creation with five classes, species/background choices, six attributes, and 27-point buy
- Class-specific basic moves, spells, and unlockable techniques
- Turn-based D20 combat, enemy armor, attacks, defense, healing, wards, poison, stun, and escape
- Mana and stamina costs for abilities
- XP progression, HP growth, and class ability unlocks at levels 2, 3, and 5
- No mana/stamina increases, full refill, gold, or supply bundle as level-up rewards
- Branching Chapter 1 story, Hana, missing-child quest, forest clues, shrine guardian, and multiple resolutions
- AI Dungeon Master endpoint using the OpenAI Responses API: free-form actions, adaptive Japanese dialogue, translation, Japanese writing feedback, cautious text-only proficiency estimates, and suggested next actions
- Recent AI DM turns and latest writing assessment saved in the local campaign notebook
- Local campaign save, inventory, quests, map, and journal

## Run locally

Requires Node.js 22+ and an OpenAI API key.

1. Open a terminal in the `world-zero` folder.
2. Set the key as an environment variable. PowerShell:

   ```powershell
   $env:OPENAI_API_KEY="your-key"
   $env:OPENAI_MODEL="gpt-5.5"
   npm start
   ```

   macOS/Linux:

   ```bash
   export OPENAI_API_KEY="your-key"
   export OPENAI_MODEL="gpt-5.5"
   npm start
   ```

3. Visit http://localhost:4173.

Do not open `index.html` directly with `file://`; the AI DM needs the server endpoint. No npm packages are required. See [AI_DM_SETUP.md](AI_DM_SETUP.md) for details.

## Important limitations

This is an AI-connected solo prototype, not a production-ready AI multiplayer game. The AI can narrate reactions and suggest next actions, but it does not yet change authoritative quest/world state or resolve game mechanics. Scripted chapter choices still control the main quest branches. Japanese feedback is text-only and formative; a single message is not a reliable proficiency placement test. There is no speech recognition, listening assessment, login, persistent server database, online multiplayer, or server-authoritative combat. Browser save data and rolls can be modified by the player.

The local Node server includes basic input limits, same-origin checks, a per-process request limit, and timeouts. It is intended for local development only. Public deployment requires authentication, durable rate limits, abuse monitoring, budget controls, HTTPS, and persistent campaign storage.

## Project structure

- `index.html` — playable browser UI
- `server.mjs` — local static server and secure server-side OpenAI API bridge
- `AI_DM_SETUP.md` — setup, key handling, and deployment notes
- `docs/GAME_DESIGN_SPEC.md` — product and system specification
- `docs/GAME_RULES.md` — prototype rules
- `docs/DEVELOPMENT_ROADMAP.md` — phased development plan
- `database/schema.sql` — initial PostgreSQL/Supabase schema draft
- `scripts/check-prototype.mjs` — UI, JavaScript, and rules checks

## Design principles

1. Gameplay first; language learning is embedded in the adventure.
2. Players can attempt open-ended actions, not only predefined choices.
3. Language proficiency is assessed cautiously and separately by skill.
4. The AI may narrate and advise; the deterministic game engine validates mechanics.
5. Campaign history and world consequences should persist between sessions.
6. Single-player and multiplayer should share the same underlying rules and data model.

Never put an OpenAI API key or Supabase service-role key in browser code.
