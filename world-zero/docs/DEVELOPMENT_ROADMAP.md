# Development Roadmap — Offline WORLD ZERO

## Phase 1 — Browser foundation
- [x] Build a navigable static browser game
- [x] Add character, abilities, inventory, map, quests, journal, and Japanese learning views
- [x] Add local campaign save and responsive layout
- [ ] Accessibility and cross-browser compatibility pass

## Phase 2 — Character system and deterministic rules
- [x] Six attributes, modifiers, and 27-point-buy allocation
- [x] Five classes with distinct starting resources and equipment
- [x] Class-specific moves, spells, and unlockable techniques
- [x] Mana/stamina costs, healing, defense, wards, poison, and stun
- [x] Deterministic attribute challenges; no dice or random rolls
- [x] Fixed combat damage and enemy turns
- [x] XP, level progression, and class ability unlocks
- [x] Branching campaign with quest outcomes and journal state
- [ ] Balance challenge thresholds and combat damage through playtesting
- [ ] Extract the rules engine into tested modules

## Phase 3 — Japanese choice-based learning
- [x] Fixed-choice Japanese responses; no typed answers or AI input
- [x] Multiple accepted variants and contextual distractors in dialogue
- [x] Four adaptive immersion starting levels
- [x] Flashcards with readings, meanings, examples, and local review tracking
- [x] Hover/tap translations for scene descriptions, headings, story choices, and interface labels
- [ ] Expand translations to every remaining journal, combat, and dynamic status message
- [ ] Add more grammar-focused choice patterns (particles, verb forms, politeness, questions)
- [ ] Expand the vocabulary deck whenever new story scenes are added
- [ ] Add optional audio assets and offline listening practice

## Phase 4 — Campaign content and balance
- [x] Three chapters and fourteen authored endings
- [x] Watchtower, ferry, and sealed-shrine routes
- [x] Hidden quests, relationship consequences, and failure states
- [ ] Add more scenes, NPC conversations, and meaningful wrong-answer consequences
- [ ] Add more varied context exercises and recurring vocabulary
- [ ] Playtest each branch and challenge with different character builds

## Phase 5 — Release quality
- [ ] Accessibility, keyboard navigation, and touch usability pass
- [ ] Browser compatibility and local-save recovery
- [ ] Full bilingual editorial review by a Japanese-language expert
- [ ] Public playtest and bug-fix cycle

## Product guardrails

- The browser game remains offline and does not call an AI model or external API.
- Story outcomes and challenges are authored and deterministic.
- Every dialogue scene should include multiple natural accepted answers and several plausible incorrect choices.
- Japanese translations must be authored and reviewed, not fabricated by a live service.
- No dice, hidden random checks, or free-form answer box should be reintroduced without an explicit design change.

## Current milestone

An offline single-player campaign prototype with fixed-choice Japanese dialogue, deterministic ability challenges, flashcards, and bilingual hover/tap support. The next content milestone is broader Japanese translation coverage and more scene-specific language exercises.
