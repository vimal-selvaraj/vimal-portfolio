import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Database, MonitorSmartphone, Network, Server, Wrench, type LucideIcon } from 'lucide-react'
import { skillGroups } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import './Skills.css'

const groupIcons: Record<string, LucideIcon> = {
  frontend: MonitorSmartphone,
  backend: Server,
  database: Database,
  architecture: Network,
  tools: Wrench,
}

/** Every unique technology, used for the marquee strip. */
const allTech = Array.from(new Set(skillGroups.flatMap((g) => g.items)))
const half = Math.ceil(allTech.length / 2)
const marqueeRows = [allTech.slice(0, half), allTech.slice(half)]

export function Skills() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const group = skillGroups[active]
  const Icon = groupIcons[group.id]

  // WAI-ARIA tabs: arrow keys move between groups, Home/End jump to the ends.
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = skillGroups.length - 1
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="expertise" className="section skills" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading
          id="expertise-title"
          index="03"
          label="Technical Expertise"
          title={
            <>
              A toolkit for the <span className="serif muted">whole stack.</span>
            </>
          }
          intro="From interface to database — the technologies and practices I use to design, build and ship enterprise applications."
        />

        <Reveal className="skills__explorer">
          <div className="skills__tabs" role="tablist" aria-label="Skill categories" aria-orientation="vertical">
            {skillGroups.map((g, i) => {
              const TabIcon = groupIcons[g.id]
              const selected = i === active
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={`skills__tab ${selected ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  {selected && (
                    <motion.span
                      layoutId="skills-tab-bg"
                      className="skills__tab-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="skills__tab-index mono">{String(i + 1).padStart(2, '0')}</span>
                  <TabIcon className="skills__tab-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span className="skills__tab-title">{g.title}</span>
                  <span className="skills__tab-count mono">{g.items.length}</span>
                </button>
              )
            })}
          </div>

          <div
            className="skills__panel"
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${group.id}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={group.id}
                className="skills__panel-inner"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <header className="skills__panel-head">
                  <span className="skills__panel-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="skills__panel-title">{group.title}</h3>
                    <p className="skills__panel-caption muted">{group.caption}</p>
                  </div>
                </header>

                <ul role="list" className="skills__tags">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      className="skills__tag"
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.04 + i * 0.025, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Decorative moving strip of every technology; the real list is in the tab panel above. */}
      <div className="skills__marquee" aria-hidden="true">
        {marqueeRows.map((row, r) => (
          <div key={r} className={`skills__marquee-row ${r % 2 ? 'is-reverse' : ''}`}>
            {[0, 1].map((copy) => (
              <div key={copy} className="skills__marquee-track">
                {row.map((t) => (
                  <span key={t} className="skills__marquee-item">
                    {t}
                    <span className="skills__marquee-sep">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
