# Development Roadmap

## Phase 1 — Foundation and interface
- [x] Create project area and initial design documents
- [x] Build a navigable browser prototype
- [x] Add character, inventory, map, quests, journal, and language views
- [x] Add local save and responsive layout
- [ ] Migrate interface into React + TypeScript
- [ ] Accessibility and browser compatibility pass

## Phase 2 — Character system and solo rules
- [x] Six attributes, modifiers, and 27-point-buy allocation
- [x] Five classes with distinct starting resources and equipment
- [x] Class-specific basic actions, spells, and unlockable techniques
- [x] Mana/stamina costs, healing, defense, wards, poison, stun, and escape
- [x] D20 attack rolls against enemy armor class
- [x] Enemy turns, damage, defeat, and recovery
- [x] XP, automatic level progression, resource increases/restoration, gold, and supply rewards
- [x] Unlockable class abilities at milestone levels
- [x] Branching first chapter with quest outcomes and journal state
- [ ] Skill proficiency, advantage/disadvantage, robust status-effect timing, and item effects
- [ ] Extract rules into tested TypeScript modules
- [ ] Move authoritative dice, combat, inventory, and progression server-side

**Current status:** the checked items are implemented for offline solo play in `index.html`. They are experimental browser-side rules and must not be trusted for multiplayer.

## Phase 3 — AI Dungeon Master
- [ ] Secure server-side AI gateway and structured scene/action contracts
- [ ] Retrieve relevant campaign context and NPC memories
- [ ] Let the DM propose actions; validate all mechanics in the game engine
- [ ] Persist event summaries and support recovery/rate limits

## Phase 4 — Japanese learning engine
- [ ] Track vocabulary, grammar, reading, listening, and independent production separately
- [ ] Adapt dialogue complexity and support to each player
- [ ] Evaluate meaning and correctness rather than rewarding text that merely contains Japanese characters
- [ ] Add contextual review and spaced retrieval

## Phase 5 — World state and persistence
- [ ] Persist campaigns, NPCs, locations, factions, quests, and events
- [ ] Add consequence rules and map discovery
- [ ] Save/resume and session recap

## Phase 6 — Multiplayer
- [ ] Authentication, invitations, campaign roles, and permissions
- [ ] Synchronize party and encounter state safely
- [ ] Support 2–4 players with distinct language profiles in one shared scene

## Phase 7 — Content, balance, and release
- [ ] Complete a longer campaign with multiple regions and dungeon encounters
- [ ] Add companions, crafting, equipment effects, and more enemy types
- [ ] Playtest balance, accessibility, security, and performance
- [ ] Deploy production app and player onboarding

## Release definition

The current milestone is a **playable solo vertical slice**, not a public beta. A public beta requires the AI DM, validated language assessment, persistent world state, server-authoritative rules, multiplayer testing, and a complete content pass.
