import { motion } from 'motion/react'
import { BrainCircuit, Building2, Clock3, Database, Layers, Workflow, type LucideIcon } from 'lucide-react'
import { about, hero, type HighlightIcon } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ScrollText } from '../../components/ui/ScrollText'
import { Reveal } from '../../components/ui/Reveal'
import './About.css'

const icons: Record<HighlightIcon, LucideIcon> = {
  years: Clock3,
  fullstack: Layers,
  architecture: Building2,
  workflow: Workflow,
  database: Database,
  ai: BrainCircuit,
}

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="02"
          label="About Me"
          title={
            <>
              {about.title[0]} <span className="serif muted">{about.title[1]}</span>
            </>
          }
        />

        <div className="about__grid">
          {/* Left: sticky editorial statement */}
          <div className="about__lead">
            <div className="about__sticky">
              <ScrollText text={about.statement} className="about__statement" />

              <Reveal className="about__figure" delay={0.1}>
                <span className="about__figure-num">
                  5<span className="accent">+</span>
                </span>
                <span className="about__figure-label mono">
                  Years building
                  <br />
                  enterprise software
                </span>
              </Reveal>
            </div>
          </div>

          {/* Right: narrative, highlights, timeline snapshot */}
          <div className="about__body">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} as="p" className="about__para" delay={i * 0.06}>
                {p}
              </Reveal>
            ))}

            <ul role="list" className="about__highlights" aria-label="Highlights">
              {about.highlights.map((h, i) => {
                const Icon = icons[h.icon]
                return (
                  <motion.li
                    key={h.label}
                    className="about__highlight"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="about__hl-index mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="about__hl-label">{h.label}</span>
                    <Icon className="about__hl-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
                  </motion.li>
                )
              })}
            </ul>

            <Reveal className="about__now">
              <div>
                <p className="mono about__now-label">Currently</p>
                <p className="about__now-value">{hero.meta.current}</p>
                <p className="about__now-sub muted">Client · {hero.meta.client}</p>
              </div>
              <div>
                <p className="mono about__now-label">Previously</p>
                <p className="about__now-value">{about.previously.join(' · ')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
