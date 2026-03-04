import styles from './ParticleField.module.css'

const COLORS = ['#a78bfa', '#7c3aed', '#ff2d55', '#818cf8']

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 15,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
}))

export default function ParticleField() {
  return (
    <div className={styles.field}>
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
