# WORLD ZERO: The Other Tongue

A browser-based, isekai-inspired tabletop RPG prototype where Japanese is learned through story, roleplay, and meaningful choices.

## Current status

**Phase 1 foundation prototype.** This is a front-end-only playable shell. It includes a navigable campaign interface, editable character profile, party roster, equipment inventory, regional map, quest board, event journal, and a small Japanese dialogue encounter. It saves demo campaign state in the browser's local storage.

It does **not** yet include an AI DM, server-side persistence, authentication, real multiplayer, or production language assessment. Those require the backend and database phases described in `docs/DEVELOPMENT_ROADMAP.md`.

## Run locally

Open `world-zero/index.html` in a modern browser. No build step is required for this first prototype.

## Project structure

- `world-zero/index.html` — interactive prototype
- `world-zero/docs/GAME_DESIGN_SPEC.md` — product and system specification
- `world-zero/docs/DEVELOPMENT_ROADMAP.md` — phased development plan
- `world-zero/database/schema.sql` — initial PostgreSQL/Supabase schema draft

## Design principles

1. Gameplay first; language learning is embedded in the adventure.
2. Players can attempt open-ended actions, not only predefined choices.
3. Language proficiency is assessed independently by skill and player.
4. The game engine, not the language model, validates game-state changes.
5. Campaign history and world consequences persist between sessions.
6. Single-player and multiplayer share the same underlying rules and data model.

## Planned stack

- Frontend: React + TypeScript (migration from this no-build prototype)
- Backend/database: Supabase + PostgreSQL
- AI DM: OpenAI API through a secure server-side endpoint
- Multiplayer: Supabase Realtime
- Hosting: GitHub Pages for static prototype; a server-capable host such as Vercel for AI/backend features

Never put an OpenAI API key or Supabase service-role key in browser code.
