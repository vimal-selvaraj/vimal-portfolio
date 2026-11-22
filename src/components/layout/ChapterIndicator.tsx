import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useActiveSection } from '../../hooks/useActiveSection'
import './ChapterIndicator.css'

/** The page read as a story: each section is a chapter. */
const chapters = [
  { id: 'about', label: 'Who I am' },
  { id: 'expertise', label: 'The toolkit' },
  { id: 'experience', label: 'The work history' },
  { id: 'projects', label: 'What I built' },
  { id: 'impact', label: 'The impact' },
  { id: 'learning', label: 'Always learning' },
  { id: 'contact', label: 'Get in touch' },
] as const

const ids = chapters.map((c) => c.id)

/** Fixed vertical chapter marker in the left margin (wide screens only, decorative). */
export function ChapterIndicator() {
  const active = useActiveSection(ids)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const index = chapters.findIndex((c) => c.id === active)
  const current = index === -1 ? { num: '00', label: 'Prologue' } : { num: String(index + 2).padStart(2, '0'), label: chapters[index].label }

  return (
    <div className="chapter" aria-hidden="true">
      <span className="chapter__track">
        <motion.span className="chapter__fill" style={{ scaleY: progress }} />
      </span>
      <div className="chapter__text mono">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.label}
            className="chapter__label"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chapter__num">Ch. {current.num}</span> · {current.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
