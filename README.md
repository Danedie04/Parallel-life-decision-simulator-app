# PARALLEL — AI Life Simulation App

> *Enter a decision. Observe the multiverse fracture.*

---

## What It Is

**Parallel** is an AI-powered life simulation tool with a Stranger Things–inspired interface. You type a life decision, and the app splits reality into **3 parallel timelines** — optimistic, realistic, and dark — each with a narrative arc and timestamped milestone events.

---

## Stack

- **React** (single `.jsx` file, no build step required)
- **Anthropic Claude API** (`claude-sonnet-4-20250514`) via `/v1/messages`
- **Google Fonts** — Bebas Neue + Share Tech Mono
- **Pure CSS animations** — no animation libraries

---

## Getting Started

### Prerequisites

- A Claude-compatible environment that proxies the Anthropic API (e.g. Claude.ai artifacts, or your own setup with an API key)

### Running Locally

If running outside Claude.ai, you'll need to add your API key to the fetch headers:

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_ANTHROPIC_API_KEY",
  "anthropic-version": "2023-06-01"
}
```

Then serve the file with any static React renderer or paste the JSX into a Vite/CRA project.

---

## How It Works

1. User types a life decision into the input field
2. Press **⌘↵** (or click the button) to submit
3. The app calls the Claude API with a structured prompt
4. Claude returns 3 parallel outcomes as JSON
5. The UI renders them as glowing branching timeline cards

### Timeline Structure

Each parallel outcome includes:

| Field | Description |
|-------|-------------|
| `title` | Short evocative name (3–5 words) |
| `summary` | 2–3 sentence arc description |
| `events` | 3 milestone events at +1yr, +3yr, +10yr |

### Timeline Types

| Label | Color | Tone |
|-------|-------|------|
| Timeline α | Green | Optimistic — growth, unexpected joy |
| Timeline β | Purple | Realistic — bittersweet, complexity |
| Timeline γ | Red | Dark — struggle, hard lessons |

---

## Design

The interface is styled as a **Stranger Things Upside Down** aesthetic:

- Animated floating particle field
- CRT scanline overlay
- Radial vignette
- Glitch flicker on header text
- Branching SVG lines with glow filter connecting the input to the 3 timeline cards
- Staggered card and event reveal animations

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

> **Tip:** The more specific and personal the decision feels, the more vivid and human the timelines will be.

---

## File Structure

```
parallel.jsx    ← entire app in one file
README.md       ← this file
```

---

## License

MIT — do whatever you want with it.
