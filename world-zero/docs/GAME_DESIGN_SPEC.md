# WORLD ZERO: The Other Tongue
## Offline Browser Game Design

### Product vision
A browser-based isekai fantasy RPG that teaches Japanese through contextual story choices, repeated vocabulary exposure, and flashcard review. The player explores, forms relationships, solves challenges, and changes the campaign through deterministic choices.

### Product decisions
- Single-player browser game
- Japanese as the initial target language
- No AI, backend, API key, or external service
- Fixed-choice Japanese dialogue; no free-form typed answers
- Deterministic attribute challenges; no dice
- Local browser save
- Original Duolingo-inspired practice structure; no copied proprietary lessons or assets

### Core systems
1. Campaign engine: authored scenes, branching choices, quest states, NPC relationships, inventory, XP, and endings.
2. Character system: identity, class, six attributes, abilities, equipment, and progression.
3. Challenge engine: compare the relevant ability modifier with a fixed difficulty.
4. Japanese learning: scene-specific accepted responses, contextual distractors, vocabulary exposure, adaptive immersion, and flashcard review.
5. Bilingual interface: paired Japanese/English text with hover highlighting and translation display.
6. Local persistence: campaign state and flashcard review progress stored in browser local storage.

### Attribute and challenge model

Modifier = `floor((score - 10) / 2)`.

| Difficulty | Required modifier |
|---|---:|
| Easy | -1 |
| Standard | 0 |
| Hard | +1 |
| Very hard | +2 |

A higher modifier makes the associated challenge easier. No random roll is used. Each challenge names the relevant attribute and a fixed difficulty.

### Japanese learning model
- Every authored dialogue scene should provide several accepted Japanese responses and several incorrect distractors.
- Accepted choices should include natural variations in wording and politeness.
- Incorrect choices should be plausible Japanese that does not fit the immediate context, rather than nonsense.
- Use original language-learning patterns: recognition, context matching, short phrase selection, repeated vocabulary, and flashcard recall.
- Maintain a vocabulary catalog with Japanese, kana reading, English meaning, and example sentence.
- Include every campaign vocabulary item in the flashcard deck.
- Track known and still-learning cards locally.
- Hovering a bilingual phrase highlights its paired English/Japanese meaning.
- No response is evaluated by an AI model or open-ended grammar parser.

### Campaign and consequences
The three-chapter campaign retains branching watchtower, ferry, and sealed-shrine routes, persistent relationship flags, hidden quests, meaningful failure, and fourteen authored endings. Story state is controlled by scripted rules and saved locally.

### Acceptance criteria
- Loads and plays as a static browser page.
- No browser network calls or AI endpoints.
- No free-form Japanese answer input.
- Multiple accepted and incorrect fixed responses per scene.
- No dice or random challenge checks.
- Higher ability modifiers improve deterministic challenge outcomes.
- Flashcards cover campaign vocabulary and save review progress.
- Hover translations are available for supported interface and authored phrases.
- Character, inventory, quests, journal, map, and story progression remain accessible.
