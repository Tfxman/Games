# WORLD ZERO AI Dungeon Master setup

## What is now connected

The Adventure screen's free-response box calls the local `POST /api/dm` endpoint. The server sends the action and a limited campaign snapshot to the OpenAI Responses API. The model returns a structured turn containing:
- Story narration that reacts to the player's action
- A Japanese NPC/world utterance and English translation
- Formative feedback on Japanese text the player actually wrote
- A cautious, evidence-based proficiency estimate and confidence
- Three suggested next actions

The model is explicitly not allowed to award XP, alter character stats, grant items, decide dice rolls, or mark quests complete. The game engine remains responsible for mechanics.

## Run locally

Requires Node.js 22 or later and an OpenAI API key with API billing enabled.

1. Create an API key in the OpenAI platform.
2. In a terminal, enter the `world-zero` folder.
3. Either copy `.env.example` to `.env` and replace the placeholder key, or set the key as an environment variable (shell environment variables take precedence). PowerShell example:

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

4. Open http://localhost:4173.

Do not open `index.html` directly with `file://`; the AI request needs the local server. You do not need to install dependencies.

## Security and deployment

- The API key is read only by the Node server from its environment. It is never sent to the browser.
- The server validates and bounds input, limits requests per IP, restricts browser origins to same-origin, and applies a request timeout.
- The included server is a local development bridge, not a public production service. Before public deployment, add user authentication, persistent per-user rate limits, abuse monitoring, budget limits, and HTTPS. Do not expose an unauthenticated paid AI endpoint to the public internet.
- Keep secrets in the hosting provider's secret/environment settings. Never commit `.env`, API keys, or service-role keys.
- The current offline game state remains browser-local. The AI sees a bounded snapshot and recent turns; it does not yet persist campaigns or independently synchronize multiplayer state.

## Model choice

The default model is configured by `OPENAI_MODEL` and currently defaults to `gpt-5.5`. Change it to another model available to your API project if needed.
