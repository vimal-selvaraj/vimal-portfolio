import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { colanProjects, featuredProjects, profile, sideProjects, type FeaturedProject } from '../../data/portfolio'
import { GitHubIcon } from '../../components/ui/BrandIcons'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import { Tilt } from '../../components/ui/Tilt'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ProjectVisual } from './ProjectVisual'
import './Projects.css'

const COUNT = featuredProjects.length
const total = String(COUNT).padStart(2, '0')

type CardProps = { project: FeaturedProject; index: number; progress: MotionValue<number>; stacking: boolean }

/**
 * One project card. While stacking, every card pins under the navbar; as later cards
 * slide over it, it scales back and dims so the pile reads as depth.
 */
function StackCard({ project, index, progress, stacking }: CardProps) {
  const num = String(index + 1).padStart(2, '0')
  const titleId = `project-${project.id}-title`
  const start = index / COUNT
  const scale = useTransform(progress, [start, 1], [1, 1 - (COUNT - 1 - index) * 0.04])
  const shade = useTransform(progress, [start, Math.min(1, start + 1 / COUNT)], [0, index === COUNT - 1 ? 0 : 0.55])

  return (
    <div className="stack__item" style={{ '--i': index } as React.CSSProperties}>
      <motion.article
        className="pcard"
        aria-labelledby={titleId}
        style={stacking ? { scale } : undefined}
        initial={stacking ? false : { opacity: 0, y: 40 }}
        whileInView={stacking ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pcard__copy">
          <p className="proj__meta mono">
            <span className="proj__num">
              {num} <span className="proj__total">/ {total}</span>
            </span>
            <span className="proj__rule" aria-hidden="true" />
            <span>{project.category}</span>
          </p>

          <h3 className="proj__title" id={titleId}>
            {project.title}
          </h3>
          {project.subtitle && <p className="proj__subtitle serif">{project.subtitle}</p>}

          <p className="proj__overview">{project.overview}</p>

          <div className="proj__built">
            <p className="proj__built-label mono">What I built</p>
            <ul role="list" className="proj__list">
              {project.contributions.map((c) => (
                <li key={c}>{c.replace(/\.$/, '')}</li>
              ))}
            </ul>
          </div>

          <ul role="list" className="proj__stack" aria-label={`${project.title} technology stack`}>
            {project.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <Tilt className="pcard__visual" max={5}>
          <ProjectVisual kind={project.visual} label={project.subtitle ?? project.title} />
        </Tilt>

        {stacking && <motion.span className="pcard__shade" style={{ opacity: shade }} aria-hidden="true" />}
      </motion.article>
    </div>
  )
}

export function Projects() {
  const reduce = useReducedMotion()
  // Stacking needs room for a whole card on screen; otherwise cards simply flow.
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 760px)')
  const stacking = roomy && !reduce
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          index="05"
          label="Featured Projects"
          title={
            <>
              Platforms built for <span className="serif muted">real business workflows.</span>
            </>
          }
          intro="CRM, service catalogs, ticketing, analytics and AI knowledge retrieval — the enterprise systems I have designed and delivered."
        />

        <div ref={stackRef} className={`stack ${stacking ? 'is-stacking' : ''}`}>
          {featuredProjects.map((p, i) => (
            <StackCard key={p.id} project={p} index={i} progress={scrollYProgress} stacking={stacking} />
          ))}
        </div>

        <div className="projects__more">
          <Reveal className="projects__more-head">
            <h3 className="projects__more-title">
              Also delivered <span className="serif muted">along the way.</span>
            </h3>
            <p className="muted">Client projects I built at Colan Infotech — dashboards, marketplaces and booking flows.</p>
          </Reveal>

          <ul role="list" className="client-grid">
            {colanProjects.map((p, i) => (
              <Reveal key={p.title} as="li" className="client-wrap" delay={(i % 3) * 0.06}>
                <Tilt className="client" max={5}>
                  <div className="client__head">
                    <p className="client__cat mono">{p.category}</p>
                    <span className="client__num mono" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="client__title">{p.title}</h4>
                  <ul role="list" className="client__points">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p className="client__stack mono">{p.stack.join(' · ')}</p>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="projects__more">
          <Reveal className="projects__more-head">
            <h3 className="projects__more-title">
              Built on my own <span className="serif muted">time.</span>
            </h3>
            <a className="projects__gh mono" href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor="Code">
              <GitHubIcon size={16} /> github.com/{profile.githubHandle}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>

          <ul role="list" className="projects__grid">
            {sideProjects.map((p, i) => (
              <Reveal key={p.name} as="li" className={`mini-wrap ${p.featured ? 'is-featured' : ''}`} delay={(i % 3) * 0.06}>
                <Tilt className="mini" max={5}>
                  <a className="mini__link" href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="Repo">
                    <span className="mini__head">
                      <span className="mini__cat mono">{p.kind}</span>
                      <ArrowUpRight className="mini__arrow" size={18} aria-hidden="true" />
                    </span>
                    <span className="mini__title">{p.title}</span>
                    <span className="mini__desc">{p.description}</span>
                    <span className="mini__stack mono">{p.stack.join(' · ')}</span>
                    <span className="sr-only">(GitHub repository, opens in a new tab)</span>
                  </a>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
