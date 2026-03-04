import styles from './TimelineCard.module.css'

const THEMES = ['optimistic', 'neutral', 'dark']
const TAGS = ['TIMELINE α', 'TIMELINE β', 'TIMELINE γ']

export default function TimelineCard({ timeline, index }) {
  const theme = THEMES[index]
  const tag = TAGS[index]
  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <div className={styles.header}>
        <div className={styles.dot} />
        <span className={styles.tag}>{tag}</span>
        <span className={styles.idx}>0{index + 1}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{timeline.title}</div>
        <div className={styles.summary}>{timeline.summary}</div>
        <div className={styles.events}>
          {timeline.events?.map((ev, i) => (
            <div className={styles.event} key={i} style={{ animationDelay: `${0.5 + i * 0.2}s` }}>
              <span className={styles.year}>{ev.year}</span>
              <span className={styles.eventText}>{ev.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
