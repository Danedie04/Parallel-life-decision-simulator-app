/**
 * Shared handler for the /api/simulate endpoint.
 * Called by both Netlify and Vercel serverless wrappers.
 */
export async function simulateHandler(body) {
  const { decision, systemPrompt } = body

  if (!decision || typeof decision !== 'string' || !decision.trim()) {
    return { status: 400, json: { error: 'Missing decision' } }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return { status: 500, json: { error: 'ANTHROPIC_API_KEY not configured' } }
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Life decision: ${decision}` }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('Anthropic API error:', err)
    return { status: 502, json: { error: 'Upstream API error' } }
  }

  const data = await response.json()
  const text = data.content?.map(b => b.text || '').join('') || ''
  const clean = text.replace(/```json|```/g, '').trim()

  let parsed
  try {
    parsed = JSON.parse(clean)
  } catch {
    return { status: 502, json: { error: 'Invalid JSON from model' } }
  }

  return { status: 200, json: parsed }
}
