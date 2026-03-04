import { useState, useEffect, useRef } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');`;

const styleSheet = `
  ${FONT_IMPORT}

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .parallel-root {
    min-height: 100vh;
    background: #030308;
    font-family: 'Share Tech Mono', monospace;
    color: #e0e0ff;
    overflow-x: hidden;
    position: relative;
  }

  /* Animated particle field */
  .particle-field {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    overflow: hidden;
  }
  .particle {
    position: absolute;
    border-radius: 50%;
    animation: floatParticle linear infinite;
    opacity: 0;
  }
  @keyframes floatParticle {
    0%   { transform: translateY(100vh) scale(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
  }

  /* Scanline overlay */
  .scanlines {
    position: fixed; inset: 0; pointer-events: none; z-index: 1;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.08) 2px,
      rgba(0,0,0,0.08) 4px
    );
  }

  /* Vignette */
  .vignette {
    position: fixed; inset: 0; pointer-events: none; z-index: 2;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%);
  }

  .content {
    position: relative; z-index: 10;
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Header */
  .header {
    text-align: center;
    margin-bottom: 52px;
  }
  .header-eyebrow {
    font-size: 11px;
    letter-spacing: 0.35em;
    color: #ff2d55;
    text-transform: uppercase;
    margin-bottom: 12px;
    animation: flicker 4s infinite;
  }
  @keyframes flicker {
    0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.4} 94%{opacity:1} 97%{opacity:0.7} 98%{opacity:1}
  }
  .header-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 12vw, 120px);
    letter-spacing: 0.05em;
    line-height: 0.9;
    background: linear-gradient(135deg, #ffffff 0%, #a78bfa 40%, #ff2d55 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 30px rgba(167,139,250,0.5));
  }
  .header-sub {
    margin-top: 16px;
    font-size: 12px;
    letter-spacing: 0.2em;
    color: rgba(200,200,255,0.45);
    text-transform: uppercase;
  }

  /* Input area */
  .input-section {
    margin-bottom: 56px;
  }
  .input-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.3em;
    color: #a78bfa;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .input-wrapper {
    position: relative;
    border: 1px solid rgba(167,139,250,0.3);
    border-radius: 4px;
    background: rgba(10,8,25,0.8);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .input-wrapper:focus-within {
    border-color: rgba(167,139,250,0.8);
    box-shadow: 0 0 0 1px rgba(167,139,250,0.3), 0 0 24px rgba(167,139,250,0.15), inset 0 0 24px rgba(167,139,250,0.05);
  }
  .decision-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 18px 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 15px;
    color: #e0e0ff;
    resize: none;
    min-height: 80px;
    line-height: 1.6;
  }
  .decision-input::placeholder { color: rgba(167,139,250,0.3); }

  .submit-btn {
    display: block;
    width: 100%;
    margin-top: 12px;
    padding: 16px;
    background: transparent;
    border: 1px solid rgba(255,45,85,0.6);
    color: #ff2d55;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  .submit-btn:hover:not(:disabled) {
    background: rgba(255,45,85,0.1);
    box-shadow: 0 0 20px rgba(255,45,85,0.3);
    border-color: #ff2d55;
  }
  .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Loading */
  .loading-state {
    text-align: center;
    padding: 48px 0;
  }
  .loading-text {
    font-size: 11px;
    letter-spacing: 0.4em;
    color: #a78bfa;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .loading-bars {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
  }
  .loading-bar {
    width: 3px;
    height: 32px;
    background: #a78bfa;
    border-radius: 2px;
    animation: barPulse 1.2s ease-in-out infinite;
  }
  .loading-bar:nth-child(2) { animation-delay: 0.15s; background: #7c3aed; }
  .loading-bar:nth-child(3) { animation-delay: 0.3s; background: #ff2d55; }
  .loading-bar:nth-child(4) { animation-delay: 0.45s; background: #7c3aed; }
  .loading-bar:nth-child(5) { animation-delay: 0.6s; background: #a78bfa; }
  @keyframes barPulse {
    0%,100%{ transform: scaleY(0.3); opacity: 0.4; }
    50%{ transform: scaleY(1); opacity: 1; }
  }

  /* Timeline */
  .timeline-section { position: relative; }
  .timeline-decision-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    color: rgba(200,200,255,0.4);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .timeline-decision-text {
    font-size: 14px;
    color: rgba(200,200,255,0.8);
    margin-bottom: 40px;
    padding: 14px 18px;
    border-left: 2px solid rgba(167,139,250,0.5);
    background: rgba(167,139,250,0.05);
    border-radius: 0 4px 4px 0;
  }

  /* SVG branch lines */
  .branch-svg {
    display: block;
    width: 100%;
    overflow: visible;
    margin-bottom: -8px;
  }

  /* Timeline cards */
  .timelines-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 680px) {
    .timelines-grid { grid-template-columns: 1fr; }
  }

  .timeline-card {
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    animation: cardReveal 0.6s ease forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  .timeline-card:nth-child(1) { animation-delay: 0.1s; }
  .timeline-card:nth-child(2) { animation-delay: 0.25s; }
  .timeline-card:nth-child(3) { animation-delay: 0.4s; }

  @keyframes cardReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  .card-header {
    padding: 14px 16px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .card-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    animation: dotGlow 2s ease-in-out infinite;
  }
  @keyframes dotGlow {
    0%,100%{ box-shadow: 0 0 4px currentColor; }
    50%{ box-shadow: 0 0 12px currentColor, 0 0 24px currentColor; }
  }
  .card-tag {
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    flex: 1;
  }
  .card-index {
    font-size: 11px;
    opacity: 0.4;
  }

  .card-body {
    padding: 0 16px 20px;
  }
  .card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
    line-height: 1.1;
  }
  .card-description {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(220,220,255,0.7);
    margin-bottom: 14px;
  }

  .card-events {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .card-event {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 11px;
    color: rgba(200,200,255,0.55);
    animation: eventFade 0.4s ease forwards;
    opacity: 0;
  }
  .card-event:nth-child(1) { animation-delay: 0.5s; }
  .card-event:nth-child(2) { animation-delay: 0.7s; }
  .card-event:nth-child(3) { animation-delay: 0.9s; }
  @keyframes eventFade { to { opacity: 1; } }

  .event-year {
    flex-shrink: 0;
    font-size: 9px;
    letter-spacing: 0.1em;
    opacity: 0.6;
    padding-top: 1px;
    min-width: 30px;
  }
  .event-line { flex: 1; line-height: 1.5; }

  /* Card themes */
  .card-optimistic {
    background: linear-gradient(160deg, rgba(16,185,129,0.08) 0%, rgba(5,10,20,0.95) 60%);
    border: 1px solid rgba(16,185,129,0.25);
  }
  .card-optimistic .card-dot { color: #10b981; background: #10b981; }
  .card-optimistic .card-tag { color: #10b981; }
  .card-optimistic .card-title { color: #6ee7b7; }

  .card-neutral {
    background: linear-gradient(160deg, rgba(167,139,250,0.08) 0%, rgba(5,10,20,0.95) 60%);
    border: 1px solid rgba(167,139,250,0.25);
  }
  .card-neutral .card-dot { color: #a78bfa; background: #a78bfa; }
  .card-neutral .card-tag { color: #a78bfa; }
  .card-neutral .card-title { color: #c4b5fd; }

  .card-dark {
    background: linear-gradient(160deg, rgba(255,45,85,0.07) 0%, rgba(5,10,20,0.95) 60%);
    border: 1px solid rgba(255,45,85,0.2);
  }
  .card-dark .card-dot { color: #ff2d55; background: #ff2d55; }
  .card-dark .card-tag { color: #ff2d55; }
  .card-dark .card-title { color: #ff6b84; }

  /* Reset */
  .reset-btn {
    display: block;
    margin: 40px auto 0;
    padding: 10px 28px;
    background: transparent;
    border: 1px solid rgba(200,200,255,0.15);
    color: rgba(200,200,255,0.35);
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
  }
  .reset-btn:hover {
    border-color: rgba(200,200,255,0.4);
    color: rgba(200,200,255,0.7);
  }

  /* Error */
  .error-msg {
    text-align: center;
    color: #ff2d55;
    font-size: 11px;
    letter-spacing: 0.15em;
    margin-top: 16px;
    padding: 12px;
    border: 1px solid rgba(255,45,85,0.2);
    border-radius: 4px;
    background: rgba(255,45,85,0.05);
  }
`;

// Particles
function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 15,
    color: ['#a78bfa','#7c3aed','#ff2d55','#818cf8'][Math.floor(Math.random()*4)],
  }));
  return (
    <div className="particle-field">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left,
          width: p.size, height: p.size,
          background: p.color,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          boxShadow: `0 0 ${p.size*3}px ${p.color}`,
        }} />
      ))}
    </div>
  );
}

// Branching SVG lines
function BranchLines() {
  return (
    <svg className="branch-svg" height="60" viewBox="0 0 900 60" preserveAspectRatio="none">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Center source point → three branches */}
      <line x1="450" y1="0" x2="150" y2="60" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" filter="url(#glow)" strokeDasharray="4 2"/>
      <line x1="450" y1="0" x2="450" y2="60" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#glow)" strokeDasharray="4 2"/>
      <line x1="450" y1="0" x2="750" y2="60" stroke="#ff2d55" strokeWidth="1.5" strokeOpacity="0.5" filter="url(#glow)" strokeDasharray="4 2"/>
      <circle cx="450" cy="0" r="4" fill="#ffffff" opacity="0.9" filter="url(#glow)"/>
      <circle cx="150" cy="60" r="3" fill="#10b981" opacity="0.8" filter="url(#glow)"/>
      <circle cx="450" cy="60" r="3" fill="#a78bfa" opacity="0.8" filter="url(#glow)"/>
      <circle cx="750" cy="60" r="3" fill="#ff2d55" opacity="0.8" filter="url(#glow)"/>
    </svg>
  );
}

function TimelineCard({ timeline, index }) {
  const themes = ['optimistic', 'neutral', 'dark'];
  const tags = ['TIMELINE α', 'TIMELINE β', 'TIMELINE γ'];
  const theme = themes[index];
  const tag = tags[index];
  return (
    <div className={`timeline-card card-${theme}`}>
      <div className="card-header">
        <div className="card-dot" />
        <span className="card-tag">{tag}</span>
        <span className="card-index">0{index+1}</span>
      </div>
      <div className="card-body">
        <div className="card-title">{timeline.title}</div>
        <div className="card-description">{timeline.summary}</div>
        <div className="card-events">
          {timeline.events?.map((ev, i) => (
            <div className="card-event" key={i}>
              <span className="event-year">{ev.year}</span>
              <span className="event-line">{ev.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SYSTEM_PROMPT = `You are a parallel universe simulator. When given a life decision, generate exactly 3 parallel timeline outcomes in JSON.

Return ONLY valid JSON, no markdown, no explanation. Format:
{
  "timelines": [
    {
      "title": "Short evocative title (3-5 words)",
      "summary": "2-3 sentence description of this timeline's overall arc and feel.",
      "events": [
        {"year": "+1yr", "event": "Brief milestone event"},
        {"year": "+3yr", "event": "Brief milestone event"},
        {"year": "+10yr", "event": "Brief milestone event"}
      ]
    }
  ]
}

Timeline 1: optimistic/best case (growth, unexpected joy, transformation)
Timeline 2: realistic/bittersweet (mixed results, complexity, growth with setbacks)  
Timeline 3: challenging/dark (struggle, loss, hard lessons — but not without meaning)

Be specific, vivid, and human. Avoid clichés. Make each timeline feel genuinely possible.`;

export default function Parallel() {
  const [decision, setDecision] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const textRef = useRef(null);

  const handleSimulate = async () => {
    if (!decision.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: `Life decision: ${decision}` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || '').join('') || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setResult({ decision: decision.trim(), timelines: parsed.timelines });
    } catch (e) {
      setError('DIMENSIONAL RIFT DETECTED — SIGNAL LOST. TRY AGAIN.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSimulate();
  };

  return (
    <>
      <style>{styleSheet}</style>
      <div className="parallel-root">
        <ParticleField />
        <div className="scanlines" />
        <div className="vignette" />
        <div className="content">
          <header className="header">
            <div className="header-eyebrow">// dimensional fork engine v2.0</div>
            <h1 className="header-title">PARALLEL</h1>
            <p className="header-sub">Enter a decision. Observe the multiverse fracture.</p>
          </header>

          {!result && (
            <div className="input-section">
              <label className="input-label">// input your decision or crossroads</label>
              <div className="input-wrapper">
                <textarea
                  ref={textRef}
                  className="decision-input"
                  placeholder="e.g. I quit my job to start a company... or I move to a new city alone... or I confess my feelings..."
                  value={decision}
                  onChange={e => setDecision(e.target.value)}
                  onKeyDown={handleKey}
                  rows={3}
                />
              </div>
              <button
                className="submit-btn"
                onClick={handleSimulate}
                disabled={loading || !decision.trim()}
              >
                {loading ? '> splitting dimensions...' : '> fork reality  [⌘↵]'}
              </button>
              {error && <div className="error-msg">{error}</div>}
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="loading-text">CALCULATING PROBABILITY MATRICES</div>
              <div className="loading-bars">
                {[1,2,3,4,5].map(i => <div key={i} className="loading-bar" />)}
              </div>
            </div>
          )}

          {result && (
            <div className="timeline-section">
              <div className="timeline-decision-label">// decision node</div>
              <div className="timeline-decision-text">{result.decision}</div>
              <BranchLines />
              <div className="timelines-grid">
                {result.timelines.map((t, i) => (
                  <TimelineCard key={i} timeline={t} index={i} />
                ))}
              </div>
              <button className="reset-btn" onClick={() => { setResult(null); setDecision(''); }}>
                ↺ collapse dimensions
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
