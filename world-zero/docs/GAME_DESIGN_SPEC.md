# WORLD ZERO: The Other Tongue
## Game Design Specification — v0.1

### Product vision
A browser-based fantasy tabletop RPG that teaches Japanese through contextual immersion. Players arrive in another world, learn to communicate, form relationships, solve problems, fight, explore, and permanently influence a shared campaign world.

### Locked initial decisions
- Modes: single-player and multiplayer
- Initial target language: Japanese
- Immersion: hybrid, gradually increasing target-language exposure with optional support
- Combat: hybrid tactical and narrative
- Visual direction: classic tabletop fantasy
- Platform: browser
- Campaign model: persistent world with player-driven consequences

### Core principles
1. Gameplay must be entertaining without treating the experience as a lesson.
2. Language knowledge unlocks richer information and options; it should not block basic participation.
3. Players may propose actions outside predefined choices.
4. Player decisions have persistent, understandable consequences.
5. Each player's language profile is independent.
6. AI proposes narration and actions; deterministic game services validate mechanics and write state.

### Core systems
1. Game rules engine: D20 checks, attributes, skills, combat, damage, inventory, XP, leveling.
2. AI Dungeon Master: narrator, NPC behavior, quest director, encounter director, language-aware scene adaptation.
3. Language engine: vocabulary, reading, listening, speaking, grammar, contextual inference; evidence-based proficiency estimates.
4. World simulation: locations, NPCs, relationships, factions, settlement state, active conflicts, world events.
5. Character system: identity, appearance, background, class, attributes, abilities, equipment.
6. Multiplayer: campaign membership, party state, turn/encounter synchronization, permissions, concurrent actions.
7. Interface: adventure, character, party, inventory, map, quests, journal, language notebook.
8. Persistence: campaign snapshots, append-only event history, session summaries, per-player progression.

### Initial rules
Six attributes:
- Strength: physical power
- Dexterity: agility and precision
- Constitution: health and endurance
- Intelligence: knowledge and investigation
- Wisdom: perception and intuition
- Charisma: persuasion and leadership

Basic check: d20 + relevant modifiers >= difficulty class.

Suggested starting classes:
- Warrior: frontline combat and defense
- Mage: magic, research, and arcane puzzles
- Rogue: stealth, traps, and exploration
- Cleric: healing, support, and divine abilities

Classes should provide starting strengths, not permanent restrictions on character development.

### Japanese progression
Track these separately for each player:
- Vocabulary recognition
- Reading comprehension
- Listening comprehension
- Speaking / sentence construction
- Grammar recognition
- Contextual inference

Use an internal progression scale from 0 (new learner) to 5 (advanced). It is inspired by broad proficiency concepts but is not an official JLPT score or certification.

Hybrid immersion stages (player-selectable starting point, then adaptive):
1. Guided: generous English context and strong clues.
2. Supported: Japanese with partial support.
3. Balanced: Japanese-first with hints when needed.
4. Full immersion: Japanese-first with minimal support.

The dialogue interface combines response and action choices in one scene panel. Players can answer in Japanese, use a gesture, take an action without responding, or respond first and then act where the scene allows. Japanese entry accepts kana/kanji and common romaji; romanized text is converted to hiragana for preview and phrase matching. Incorrect attempts should show the entered form, a natural target phrase, and a clear explanation of the mismatch. The current prototype uses phrase patterns and heuristic explanations, not unrestricted grammar understanding.\n\nThe game tracks best Japanese, understandable Japanese, and poor communication separately. Strong independent Japanese raises immersion; understandable Japanese and successful gestures also raise it more gradually; repeated poor results lower immersion and restore contextual support. Gestures resolve with d20 + Wisdom and are capped at the good outcome tier. Incorrect Japanese can be repaired with d20 + Intelligence; a successful repair earns a good outcome, never the best outcome. Clear Japanese production earns the best outcome. Communication outcomes influence NPC trust and later narrative options.

Assessment must be based on observable evidence: recognition, independent production, comprehension in a new context, and successful communication. Do not infer mastery from participation alone.

### World agency
Track persistent locations, NPC identities and motives, relationships, factions, settlement conditions, quest states, player decisions, and historical events. The model may propose world changes, but server-side rules validate and commit them. Preserve an event history so the world can be audited and reconstructed.

### Multiplayer model
Single-player and multiplayer use the same campaign and rules model. Multiplayer campaigns have a host, members, individual characters, individual language profiles, shared world state, and synchronized encounters. Players may take separate actions where the fiction and game state permit.

### Interface requirements
The player must be able to access:
- Character sheet
- Party and companions
- Inventory and equipped gear
- World map and discovered locations
- Active, available, and completed quests
- Event journal / session summary
- Language profile and vocabulary notebook

The adventure screen is the default view. Navigation should not discard the current scene.

### First vertical slice
A short opening adventure, "The Stranger":
- Player wakes in an unfamiliar forest.
- A traveler approaches and speaks Japanese.
- Player reaches a village.
- Player can seek shelter, food, information, or explore.
- A child has disappeared in the nearby forest.
- Investigation and communication reveal clues.
- The party can resolve the situation through multiple approaches.

### MVP acceptance criteria
- Create and save a character.
- Enter and resume a campaign.
- Interact with an AI DM.
- Display adaptive Japanese dialogue and optional support.
- Maintain individual language evidence and progress.
- Complete a quest through multiple approaches.
- Resolve combat consistently.
- Persist character, inventory, quest, and world changes.
- Access character, party, gear, map, quests, journal, and language views.

### Technical guardrails
- Never expose AI provider secrets in client-side code.
- The AI does not directly mutate authoritative database records.
- Validate actions and game rules server-side.
- Use database authorization policies for campaign membership and character ownership.
- Treat language proficiency as an estimate with evidence and confidence, not a single opaque score.


### AI Japanese interpreter and procedural narrative (prototype)
- The local `POST /api/language` endpoint assesses open-ended Japanese replies in context, separating communicative appropriateness from grammatical naturalness.
- Assessment includes intended meaning, grammar points, corrected phrasing, natural alternatives, and confidence. It should accept valid paraphrases rather than exact-string matches.
- Each assessment generates an NPC reaction, a short narrative beat, contextual clues, and three possible next actions that reflect the player's wording and the recent story.
- AI output is narrative-only. The deterministic client engine continues to own XP, inventory, stats, combat, quest completion, and persistent world flags.
- This is a model-based interpreter, not a complete formal Japanese grammar parser; ambiguous outputs should be marked uncertain and evaluated conservatively. A local phrase-matching fallback remains available without the backend.
- GitHub Pages cannot run the Node API. AI turns require the local server or a separately deployed, secured backend.
