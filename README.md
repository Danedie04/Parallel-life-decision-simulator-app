# PARALLEL — AI Life Simulation App

> *Enter a decision. Observe the multiverse fracture.*

---

## What It Is

**Parallel** is an AI-powered life simulation tool with a Stranger Things–inspired interface. You type a life decision, and the app splits reality into **3 parallel timelines** — optimistic, realistic, and dark — each with a narrative arc and timestamped milestone events.

---

## Stack

- **React 18** + **Vite** (frontend)
- **Serverless functions** — works on both Netlify and Vercel
- **Anthropic Claude API** (`claude-sonnet-4-20250514`) called server-side (key never exposed to browser)
- **Google Fonts** — Bebas Neue + Share Tech Mono
- **CSS Modules** — scoped styles, no CSS-in-JS

---

## Project Structure

```
parallel/
├── src/
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global reset + font import
│   ├── App.jsx                    # Root component + API call
│   ├── App.module.css
│   └── components/
│       ├── ParticleField.jsx      # Animated background particles
│       ├── ParticleField.module.css
│       ├── BranchLines.jsx        # SVG branching timeline lines
│       ├── TimelineCard.jsx       # Individual parallel outcome card
│       └── TimelineCard.module.css
├── api/
│   ├── _handler.js                # Shared Claude API logic
│   └── simulate.js                # Vercel serverless function
├── netlify/
│   └── functions/
│       └── simulate.js            # Netlify serverless function
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.js
├── netlify.toml                   # Netlify build + redirect config
├── vercel.json                    # Vercel build + rewrite config
├── package.json
├── .env.example
└── .gitignore
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set your API key
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Start Vite dev server
npm run dev
```

> **Note:** For local dev, the Vite proxy forwards `/api` requests to `localhost:8888`.  
> To test the serverless function locally, install the Netlify CLI:
> ```bash
> npm install -g netlify-cli
> netlify dev
> ```
> Or the Vercel CLI:
> ```bash
> npm install -g vercel
> vercel dev
> ```

---

## Deploy to Netlify

### Option A — Netlify CLI

```bash
npm install -g netlify-cli

# Build and deploy
netlify deploy --build --prod
```

### Option B — Netlify Dashboard (recommended)

1. Push this project to a GitHub/GitLab repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Set build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Go to **Site settings → Environment variables** and add:
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```
5. Click **Deploy site**

The `netlify.toml` handles all redirects automatically:  
`/api/simulate` → `/.netlify/functions/simulate`

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel

# Deploy (follow the prompts)
vercel

# Set your env var
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

### Option B — Vercel Dashboard (recommended)

1. Push this project to a GitHub/GitLab/Bitbucket repo
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Project**
3. Vercel auto-detects Vite — no settings to change
4. Before deploying, go to **Environment Variables** and add:
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```
5. Click **Deploy**

The `vercel.json` routes `/api/*` to the serverless functions in `api/`.

---

## How It Works

1. User types a life decision
2. Frontend `POST`s to `/api/simulate` — a serverless function
3. The function calls the Anthropic Claude API with a structured prompt (server-side, key is never in the browser)
4. Claude returns 3 parallel timeline outcomes as JSON
5. React renders them as glowing branching timeline cards

### Timeline Structure

| Field | Description |
|-------|-------------|
| `title` | Short evocative name (3–5 words) |
| `summary` | 2–3 sentence arc description |
| `events` | 3 milestones at +1yr, +3yr, +10yr |

### Timeline Types

| Label | Color | Tone |
|-------|-------|------|
| Timeline α | Green | Optimistic — growth, unexpected joy |
| Timeline β | Purple | Realistic — bittersweet, complexity |
| Timeline γ | Red | Dark — struggle, hard lessons |

---

## Example Inputs

**Career**
- `I quit my stable job to build a startup with my college friend`
- `I turn down the promotion and go back to school for art`
- `I accept the job offer in Tokyo even though I don't speak Japanese`

**Relationships**
- `I tell my best friend I'm in love with them`
- `I end a 4-year relationship because something feels missing`
- `I reach out to my estranged father after 10 years of silence`

**Life Upheaval**
- `I sell everything I own and move to a small town in Portugal`
- `I adopt a child as a single parent at 34`
- `I drop out of med school in my final year`

**Subtle & Loaded**
- `I say yes when she asks if I'm okay, instead of the truth`
- `I send the email I've been drafting for three months`
- `I stay at the party instead of leaving early like I always do`

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ Yes | Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com) |

---

## License

MIT — do whatever you want with it.
