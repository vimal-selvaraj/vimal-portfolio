import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { education, learning, sideProjects } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import './Learning.css'

const practice = sideProjects.find((p) => p.featured)

export function Learning() {
  return (
    <section id="learning" className="section learn" aria-labelledby="learning-title">
      <div className="container">
        <SectionHeading
          id="learning-title"
          index="07"
          label="Learning & Education"
          title={
            <>
              Always learning, <span className="serif muted">always building.</span>
            </>
          }
          intro={learning.intro}
        />

        <div className="learn__grid">
          <ol role="list" className="learn__topics" aria-label="Current learning interests">
            {learning.topics.map((t, i) => (
              <Reveal key={t.title} as="li" className="topic" delay={(i % 4) * 0.05}>
                <span className="topic__index mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="topic__title">{t.title}</h3>
                <p className="topic__note">{t.note}</p>
                <span className="topic__status mono">Exploring</span>
              </Reveal>
            ))}
          </ol>

          <div className="learn__side">
          <Reveal className="edu" delay={0.1}>
            <span className="edu__icon" aria-hidden="true">
              <GraduationCap size={26} strokeWidth={1.5} />
            </span>
            <p className="edu__label mono">Education</p>
            <h3 className="edu__degree">{education.degree}</h3>
            <p className="edu__school">{education.institution}</p>
            <p className="edu__year">
              <span className="mono">Graduated</span>
              <span className="edu__year-num">{education.year}</span>
            </p>
          </Reveal>

          {/* Evidence for the topics above: a real project, not just a reading list. */}
          {practice && (
            <Reveal delay={0.15}>
              <a className="practice" href={practice.url} target="_blank" rel="noopener noreferrer" data-cursor="Repo">
                <span className="practice__label mono">In practice</span>
                <span className="practice__title">
                  {practice.title} <ArrowUpRight size={16} aria-hidden="true" />
                </span>
                <span className="practice__desc">Local models, a provider abstraction and a skills registry — the ideas above, built.</span>
                <span className="sr-only">(GitHub repository, opens in a new tab)</span>
              </a>
            </Reveal>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
