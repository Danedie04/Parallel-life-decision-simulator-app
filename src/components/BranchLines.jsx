export default function BranchLines() {
  return (
    <svg
      style={{ display: 'block', width: '100%', overflow: 'visible', marginBottom: '-8px' }}
      height="60"
      viewBox="0 0 900 60"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <line x1="450" y1="0" x2="150" y2="60" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" filter="url(#glow)" strokeDasharray="4 2"/>
      <line x1="450" y1="0" x2="450" y2="60" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#glow)" strokeDasharray="4 2"/>
      <line x1="450" y1="0" x2="750" y2="60" stroke="#ff2d55" strokeWidth="1.5" strokeOpacity="0.5" filter="url(#glow)" strokeDasharray="4 2"/>
      <circle cx="450" cy="0" r="4" fill="#ffffff" opacity="0.9" filter="url(#glow)"/>
      <circle cx="150" cy="60" r="3" fill="#10b981" opacity="0.8" filter="url(#glow)"/>
      <circle cx="450" cy="60" r="3" fill="#a78bfa" opacity="0.8" filter="url(#glow)"/>
      <circle cx="750" cy="60" r="3" fill="#ff2d55" opacity="0.8" filter="url(#glow)"/>
    </svg>
  )
}
