import { motion } from 'motion/react'
import { featuredProjects, secondaryProjects, type FeaturedProject } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import { ProjectVisual } from './ProjectVisual'
import './Projects.css'

const EASE = [0.22, 1, 0.36, 1] as const
const total = String(featuredProjects.length).padStart(2, '0')

function FeaturedRow({ project, index }: { project: FeaturedProject; index: number }) {
  const num = String(index + 1).padStart(2, '0')
  const titleId = `project-${project.id}-title`
  const flipped = index % 2 === 1

  return (
    <article className={`proj ${flipped ? 'proj--flip' : ''}`} aria-labelledby={titleId}>
      <motion.div
        className="proj__copy"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
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
      </motion.div>

      <motion.div
        className="proj__visual"
        initial={{ opacity: 0, y: 56, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      >
        <ProjectVisual kind={project.visual} label={project.subtitle ?? project.title} />
      </motion.div>
    </article>
  )
}

export function Projects() {
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

        <div className="projects__featured">
          {featuredProjects.map((p, i) => (
            <FeaturedRow key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="projects__more">
          <Reveal className="projects__more-head">
            <h3 className="projects__more-title">
              Also delivered <span className="serif muted">along the way.</span>
            </h3>
            <p className="muted">Client projects from my frontend years — dashboards, marketplaces and booking flows.</p>
          </Reveal>

          <ul role="list" className="projects__grid">
            {secondaryProjects.map((p, i) => (
              <Reveal key={p.title} as="li" className="mini" delay={(i % 3) * 0.06}>
                <div className="mini__head">
                  <p className="mini__cat mono">{p.category}</p>
                  <span className="mini__num mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="mini__title">{p.title}</h4>
                <ul role="list" className="mini__points">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <p className="mini__stack mono">{p.stack.join(' · ')}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
