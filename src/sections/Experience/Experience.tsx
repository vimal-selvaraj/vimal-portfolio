import { useId, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { experience, type Job } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import './Experience.css'

const EASE = [0.22, 1, 0.36, 1] as const

function TimelineItem({ job, index, defaultOpen }: { job: Job; index: number; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const current = job.period.includes('Present')

  return (
    <motion.li
      className={`xp__item ${open ? 'is-open' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Node on the rail */}
      <span className={`xp__node ${current ? 'is-current' : ''}`} aria-hidden="true" />

      <div className="xp__meta">
        <p className="xp__period mono">{job.period}</p>
        <p className="xp__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </p>
      </div>

      <article className="xp__card">
        <header className="xp__head">
          <div>
            <h3 className="xp__company">
              {job.company}
              {current && <span className="xp__badge mono">Current</span>}
            </h3>
            <p className="xp__role">
              {job.role}
              {job.companyNote && <span className="xp__note"> · {job.companyNote}</span>}
            </p>
            {job.client && (
              <p className="xp__client mono">
                Client <span>{job.client}</span>
              </p>
            )}
          </div>
        </header>

        <p className="xp__summary">{job.summary}</p>

        <ul role="list" className="xp__stack" aria-label={`${job.company} technology stack`}>
          {job.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <button
          type="button"
          className="xp__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="mono">{open ? 'Hide' : 'View'} key contributions</span>
          <span className="xp__toggle-count mono">{job.contributions.length}</span>
          <ChevronDown className="xp__chevron" size={16} aria-hidden="true" />
        </button>

        {/* grid-template-rows 0fr → 1fr animates height without measuring the DOM */}
        <div id={panelId} className="xp__panel" role="region" aria-label={`${job.company} contributions`}>
          <div className="xp__panel-inner" inert={!open}>
            <ul role="list" className="xp__list">
              {job.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.7', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="section xp" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="04"
          label="Professional Experience"
          title={
            <>
              5+ years of <span className="serif muted">building enterprise software.</span>
            </>
          }
          intro="From responsive interfaces to full-stack platforms — a career moving steadily deeper into architecture, data and delivery."
        />

        <div ref={timelineRef} className="xp__timeline">
          {/* Rail that fills as you scroll through the timeline */}
          <span className="xp__rail" aria-hidden="true">
            <motion.span className="xp__rail-fill" style={{ scaleY: progress }} />
          </span>
          <ol role="list" className="xp__list-root">
            {experience.map((job, i) => (
              <TimelineItem key={job.company} job={job} index={i} defaultOpen={i === 0} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
