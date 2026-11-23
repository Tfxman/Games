# WORLD ZERO: The Other Tongue

A browser-based, isekai-inspired tabletop RPG prototype where Japanese is learned through story, roleplay, and meaningful choices.

## Current status

**Phase 1 foundation + Phase 2 rules prototype.** The browser prototype includes a navigable campaign interface, editable character profile, 27-point-buy attributes, five character archetypes, D20 ability checks, a practice combat loop, XP/level progression, party roster, inventory, regional map, quest board, event journal, and Japanese vocabulary view. Demo campaign state is saved in browser local storage.

This is still a front-end prototype. It does **not** yet include an AI DM, server-side persistence, authentication, production language assessment, or online multiplayer. Browser-side rolls and character data are editable and are not authoritative.

## Run locally

Open `world-zero/index.html` in a modern browser. No build step is required for this prototype.

## Project structure

- `world-zero/index.html` — interactive prototype
- `world-zero/docs/GAME_DESIGN_SPEC.md` — product and system specification
- `world-zero/docs/GAME_RULES.md` — prototype tabletop rules
- `world-zero/docs/DEVELOPMENT_ROADMAP.md` — phased development plan
- `world-zero/database/schema.sql` — initial PostgreSQL/Supabase schema draft

## Design principles

1. Gameplay first; language learning is embedded in the adventure.
2. Players can attempt open-ended actions, not only predefined choices.
3. Language proficiency is assessed independently by skill and player.
4. The game engine, not the language model, validates mechanics.
5. Campaign history and world consequences persist between sessions.
6. Single-player and multiplayer share the same underlying rules and data model.

## Planned stack

- Frontend: React + TypeScript (migration from this no-build prototype)
- Backend/database: Supabase + PostgreSQL
- AI DM: OpenAI API through a secure server-side endpoint
- Multiplayer: Supabase Realtime
- Hosting: GitHub Pages for static prototype; a server-capable host such as Vercel for AI/backend features

Never put an OpenAI API key or Supabase service-role key in browser code.
