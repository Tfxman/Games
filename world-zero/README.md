# WORLD ZERO: The Other Tongue

A browser-based, isekai-inspired fantasy RPG where Japanese is learned through story, roleplay, and meaningful choices.

## Current status

**Playable single-player branching campaign prototype, with three story chapters and 14 authored endings.** The browser game can be hosted as a static site on GitHub Pages. The optional AI Dungeon Master requires a separate server and a privately configured OpenAI API key; it does not run on GitHub Pages.

Implemented:
- Character creation with five classes, species/background choices, six attributes, and 27-point buy
- Class-specific basic moves, spells, and unlockable techniques
- Turn-based D20 combat, enemy armor, attacks, defense, healing, wards, poison, and stun
- Mana and stamina costs for abilities
- XP progression; on level-up, +2 max HP (+3 for Warriors), +1 max mana, and +1 max stamina, with those amounts restored
- Class ability unlocks at levels 2, 3, and 5
- Expanded branching campaign through Chapter 3 and the Lantern Archive, with watchtower, ferry, and sealed-shrine routes, persistent relationships, quest outcomes, and 14 authored endings
- Choices and Japanese comprehension guesses affect later relationships, checks, descriptions, and available options; mistakes are allowed to shape the narrative
- Meaningful failure states: failed investigations, abandoned or failed quests, lost NPC trust, resource loss, and campaign-ending defeat after three combat defeats
- Prerequisite-aware choices: unavailable story options and unaffordable combat moves are hidden; healing, wards, and ranged attacks respect current HP, active wards, and ammunition
- Adaptive Japanese immersion with four starting levels (Guided, Supported, Balanced, Full immersion), adjusted from accumulated communication results
- Unified scene interaction: response and action choices appear together; players can speak, act without speaking, or respond first and then take an action
- Japanese input accepts kana/kanji or romaji, with romanized text converted to hiragana for display and checking; incorrect attempts show a target phrase and rule-based feedback about the mismatch
- Two communication modes: type Japanese or choose a gesture; exact Japanese is the best tier, partial Japanese or a successful gesture earns a good tier, and poor communication can produce the worst result
- Expanded sensory descriptions for Hana, the village, forest, shrine guardian, rescued child, and chapter locations
- d20 + Wisdom gesture checks; d20 + Intelligence can help repair an incorrect Japanese response; outcomes affect trust, later reactions, and immersion level
- Context-first Japanese dialogue: infer meaning from gestures, tone, and scene clues; mistakes change NPC reactions and relationship state rather than triggering immediate translations
- Encounter lock: while an enemy is active, story choices, travel, and free-form actions are blocked; required fights cannot be escaped
- AI Dungeon Master integration for free-form actions, adaptive Japanese dialogue, translation, Japanese writing feedback, cautious text-only proficiency estimates, and suggested next actions (when connected to a configured backend)
- Recent AI DM turns and latest writing assessment saved in the local campaign notebook
- Local campaign save, inventory, quests, map, and journal

## Play on the web (GitHub Pages)

The deployment workflow publishes the contents of this folder when changes are pushed to `main`.

After GitHub Pages is enabled for this repository, the game URL will be:

https://tfxman.github.io/Games/world-zero/

To enable it: open the repository's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**, and save. Then open **Actions** and wait for **pages build and deployment** to finish successfully. The workflow may also be started manually from the Actions tab.

The hosted static version supports the scripted single-player game and saves progress in that browser. The AI Dungeon Master panel requires a separately deployed, secured backend; it will not work on the static GitHub Pages site by itself. Do not put an API key in browser code or GitHub Pages files.

## Run locally with the AI Dungeon Master

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

This is a solo prototype, not a production-ready AI multiplayer game. The AI can assess Japanese in context, narrate reactions, and generate follow-up actions, but it does not yet change authoritative quest/world state or resolve game mechanics. Scripted chapter choices still control the main quest branches. The AI Japanese interpreter provides contextual, model-based grammar and pragmatics feedback when the local backend is configured; this is probabilistic rather than a guaranteed complete grammar parser. Without the backend, the game falls back to phrase-pattern checks. AI-generated story turns create reactive narrative and suggested actions, but do not yet rewrite the authoritative scripted quest graph or persist new world-state flags; romaji conversion supports common Hepburn-style syllables but is not a full IME. The AI writing estimate is text-only; a single message is not a reliable proficiency placement test. There is no speech recognition, listening assessment, login, persistent server database, online multiplayer, or server-authoritative combat. Browser save data and rolls can be modified by the player.

The local Node server includes basic input limits, same-origin checks, a per-process request limit, and timeouts. It is intended for local development only. Public AI deployment requires authentication, durable rate limits, abuse monitoring, budget controls, HTTPS, and persistent campaign storage.

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
