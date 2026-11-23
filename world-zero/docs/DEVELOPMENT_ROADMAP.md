# Development Roadmap

## Phase 1 — Foundation and interface
- [x] Create project area and initial design documents
- [x] Build a navigable browser prototype
- [x] Add character, party, inventory, map, quests, journal, and language views
- [x] Add editable character data and local demo save
- [ ] Move interface into React + TypeScript
- [ ] Add responsive/mobile layout and accessibility pass
- [ ] Add automated UI tests

**Exit condition:** a stable, navigable client with a clear data model.

## Phase 2 — Character system and rules
- [x] Define six attributes and ability modifiers
- [x] Add 27-point-buy allocation (scores 8–15)
- [x] Add five selectable archetypes: Adventurer, Warrior, Mage, Rogue, Cleric
- [x] Add class-based starting HP and starter equipment
- [x] Add D20 ability checks against selectable difficulty classes
- [x] Add a deterministic-rules prototype combat loop (initiative, attack, defend, retreat, damage, victory)
- [x] Add XP awards and automatic level progression
- [ ] Add skill proficiency and advantage/disadvantage
- [ ] Add real equipment slots, armor class, weapon properties, and item effects
- [ ] Add class-specific abilities and spell resources
- [ ] Extract rules into tested TypeScript modules with unit tests
- [ ] Move authoritative dice, combat, and progression calculations server-side

**Current note:** the checked items above are implemented in the browser prototype for solo experimentation. They are not secure multiplayer rules yet; browser-side state can be edited and must not be trusted by a server.

**Exit condition:** a player can create, develop, equip, and use a character in a rules-consistent encounter, with authoritative rules validated server-side.

## Phase 3 — AI Dungeon Master
- Create secure server-side AI gateway
- Define structured scene, NPC, quest, and action response contracts
- Add conversation context retrieval from campaign state
- Add action proposal and server-side validation pipeline
- Add NPC memory and session summaries
- Add cost, rate-limit, safety, and failure handling

**Exit condition:** a complete short adventure can be run with AI narration and validated game actions.

## Phase 4 — Japanese learning engine
- Define evidence model for six language skills
- Add vocabulary and phrase records with context
- Add adaptive dialogue levels and player-controlled support
- Evaluate comprehension and production separately
- Add review opportunities and spaced retrieval
- Add learner-facing progress explanations

**Exit condition:** two players at different levels receive appropriately different support without splitting the campaign.

## Phase 5 — World state and persistence
- Implement campaign, location, NPC, faction, quest, and event records
- Add append-only campaign event log
- Add consequence rules and world-state snapshots
- Add map discovery and quest state transitions
- Add save/resume and session recap

**Exit condition:** the world consistently reflects prior player decisions after reload and across sessions.

## Phase 6 — Multiplayer
- Add authentication and campaign invitations
- Add campaign roles and authorization
- Synchronize party and encounter state
- Resolve concurrent player actions safely
- Add chat / table communication and reconnect handling
- Test individual language profiles in one shared scene

**Exit condition:** 2–4 players can complete the opening adventure together.

## Phase 7 — Content, balance, and release
- Complete and playtest the opening campaign
- Add more NPCs, quests, locations, and encounter variety
- Balance classes, checks, rewards, and language pacing
- Test accessibility, security, reliability, and performance
- Deploy the production app and publish player onboarding

**Exit condition:** a reliable public beta with a complete playable campaign.

## Recommended first release scope
Prioritize single-player first, but keep multiplayer-compatible data structures from the beginning. Include one village, nearby wilderness, one small dungeon, four classes, a short branching quest, basic turn-based combat, Japanese dialogue adaptation, character progression, and persistent journal/quest state. Defer full faction simulation, large-scale world economy, voice recognition, and multi-language support until the core loop is proven.
