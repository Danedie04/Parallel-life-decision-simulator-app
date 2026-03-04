import { useState, useRef } from 'react'
import styles from './App.module.css'
import ParticleField from './components/ParticleField'
import BranchLines from './components/BranchLines'
import TimelineCard from './components/TimelineCard'

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

Be specific, vivid, and human. Avoid clichés. Make each timeline feel genuinely possible.`

export default function App() {
  const [decision, setDecision] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const textRef = useRef(null)

  const handleSimulate = async () => {
    if (!decision.trim()) return
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: decision.trim(), systemPrompt: SYSTEM_PROMPT }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setResult({ decision: decision.trim(), timelines: data.timelines })
    } catch (e) {
      setError(`DIMENSIONAL RIFT DETECTED — ${e.message.toUpperCase()}`)
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSimulate()
  }

  return (
    <div className={styles.root}>
      <ParticleField />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>// dimensional fork engine v2.0</div>
          <h1 className={styles.title}>PARALLEL</h1>
          <p className={styles.subtitle}>Enter a decision. Observe the multiverse fracture.</p>
        </header>

        {!result && (
          <div className={styles.inputSection}>
            <label className={styles.inputLabel}>// input your decision or crossroads</label>
            <div className={styles.inputWrapper}>
              <textarea
                ref={textRef}
                className={styles.textarea}
                placeholder="e.g. I quit my job to start a company... or I move to a new city alone... or I confess my feelings..."
                value={decision}
                onChange={e => setDecision(e.target.value)}
                onKeyDown={handleKey}
                rows={3}
              />
            </div>
            <button
              className={styles.submitBtn}
              onClick={handleSimulate}
              disabled={loading || !decision.trim()}
            >
              {loading ? '> splitting dimensions...' : '> fork reality  [⌘↵]'}
            </button>
            {error && <div className={styles.error}>{error}</div>}
          </div>
        )}

        {loading && (
          <div className={styles.loading}>
            <div className={styles.loadingText}>CALCULATING PROBABILITY MATRICES</div>
            <div className={styles.loadingBars}>
              {[1,2,3,4,5].map(i => <div key={i} className={styles.loadingBar} />)}
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timelineSection}>
            <div className={styles.decisionLabel}>// decision node</div>
            <div className={styles.decisionText}>{result.decision}</div>
            <BranchLines />
            <div className={styles.grid}>
              {result.timelines.map((t, i) => (
                <TimelineCard key={i} timeline={t} index={i} />
              ))}
            </div>
            <button className={styles.resetBtn} onClick={() => { setResult(null); setDecision('') }}>
              ↺ collapse dimensions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
