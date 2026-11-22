import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { Award, Check, Sparkles } from 'lucide-react'
import { award, impactStories, type ImpactStory, type ImpactVisual } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import { Tilt } from '../../components/ui/Tilt'
import './Impact.css'

/** Counts up from 0 the first time it scrolls into view. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return <span ref={ref}>{reduce ? value : shown}</span>
}

/* ---------- Illustrations: relative and abstract, never benchmark numbers ---------- */

/** Two request lanes; the "after" request arrives in 70% of the time (≈30% faster). */
function LatencyVisual() {
  return (
    <div className="iv-lanes">
      {[
        { label: 'Before', cls: 'is-before' },
        { label: 'After', cls: 'is-after' },
      ].map((l) => (
        <div key={l.label} className={`iv-lane ${l.cls}`}>
          <span className="iv-lane__label mono">{l.label}</span>
          <span className="iv-lane__track">
            <span className="iv-lane__packet" />
          </span>
          <span className="iv-lane__end" />
        </div>
      ))}
      <p className="iv-note mono">UI → API → PostgreSQL → response</p>
    </div>
  )
}

/** One component library feeding five product modules. */
function ComponentsVisual() {
  // The four named modules from the resume work, plus the rest of the product.
  const spokes: [number, number, string][] = [
    [50, 12, 'Tickets'],
    [84, 36, 'Catalog'],
    [74, 82, 'DW'],
    [26, 82, 'KM'],
    [16, 36, '+ more'],
  ]
  return (
    <svg className="iv-hub" viewBox="4 4 92 90" aria-hidden="true">
      {spokes.map(([x, y, name], i) => (
        <g key={i}>
          <line x1="50" y1="52" x2={x} y2={y} pathLength={100} className="iv-hub__line" style={{ animationDelay: `${i * 0.12}s` }} />
          <line x1="50" y1="52" x2={x} y2={y} pathLength={100} className="iv-hub__pulse" style={{ animationDelay: `${0.8 + i * 0.3}s` }} />
          <rect x={x - 11} y={y - 5.5} width="22" height="11" rx="3" className="iv-hub__module" style={{ animationDelay: `${0.5 + i * 0.12}s` }} />
          <text x={x} y={y + 1.9} className="iv-hub__module-text">
            {name}
          </text>
        </g>
      ))}
      {/* Opaque base so the spokes don’t show through the label */}
      <circle cx="50" cy="52" r="13" className="iv-hub__core-base" />
      <circle cx="50" cy="52" r="13" className="iv-hub__core" />
      <text x="50" y="54.2" className="iv-hub__core-text">
        UI kit
      </text>
    </svg>
  )
}

/** A catalog template whose fields switch on one after another. */
function CatalogVisual() {
  const fields = ['Workflow', 'Template', 'Dynamic field', 'Approver']
  return (
    <div className="iv-catalog">
      <p className="iv-catalog__title mono">Catalog item · configure</p>
      {fields.map((f, i) => (
        <div key={f} className="iv-catalog__row" style={{ animationDelay: `${i * 0.55}s` }}>
          <span className="iv-catalog__name">{f}</span>
          <span className="iv-catalog__toggle" style={{ animationDelay: `${i * 0.55}s` }} />
        </div>
      ))}
    </div>
  )
}

/** A status change published once and delivered to every subscriber. */
function EventsVisual() {
  return (
    <div className="iv-events">
      <span className="iv-events__node iv-events__node--src mono">status.changed</span>
      <span className="iv-events__bus" aria-hidden="true">
        <span className="iv-events__dot" />
      </span>
      <span className="iv-events__hub mono">Service Bus</span>
      <span className="iv-events__fan" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="iv-events__branch">
            <span className="iv-events__dot" style={{ animationDelay: `${0.9 + i * 0.12}s` }} />
          </span>
        ))}
      </span>
      <span className="iv-events__subs">
        {['Ticket view', 'Workflow', 'Notifications'].map((s, i) => (
          <span key={s} className="iv-events__node mono" style={{ animationDelay: `${1.5 + i * 0.12}s` }}>
            {s}
          </span>
        ))}
      </span>
    </div>
  )
}

const visuals: Record<ImpactVisual, () => React.JSX.Element> = {
  latency: LatencyVisual,
  components: ComponentsVisual,
  catalog: CatalogVisual,
  events: EventsVisual,
}

function StoryCard({ story, index }: { story: ImpactStory; index: number }) {
  const [live, setLive] = useState(false)
  const Visual = visuals[story.visual]
  const c = story.count
  const metricText = c ? `${c.prefix ?? ''}${c.value}${c.suffix}` : (story.highlight ?? '')

  return (
    <Reveal as="li" className="istory-wrap" delay={(index % 2) * 0.1}>
      <Tilt className="istory-tilt" max={5}>
        <motion.article
          className={`istory ${live ? 'is-live' : ''}`}
          onViewportEnter={() => setLive(true)}
          onViewportLeave={() => setLive(false)}
          viewport={{ amount: 0.3 }}
        >
          <div className="istory__visual" aria-hidden="true">
            <Visual />
          </div>

          <div className="istory__body">
            <div className="istory__metric">
              <p className={`istory__value ${c ? '' : 'istory__value--word'}`}>
                <span className="sr-only">{metricText}</span>
                <span aria-hidden="true">
                  {c ? (
                    <>
                      {c.prefix && <span className="istory__affix">{c.prefix}</span>}
                      <CountUp value={c.value} />
                      <span className="istory__affix accent">{c.suffix}</span>
                    </>
                  ) : (
                    story.highlight
                  )}
                </span>
              </p>
              <p className="istory__metric-label mono">{story.metricLabel}</p>
            </div>

            <h3 className="istory__headline">{story.headline}</h3>
            <p className="istory__context mono">{story.context}</p>

            <div className="istory__did">
              <p className="istory__step-label mono">What I did</p>
              <ul role="list">
                {story.did.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            <p className="istory__outcome">
              <span className="istory__outcome-icon" aria-hidden="true">
                <Check size={14} strokeWidth={2.4} />
              </span>
              <span>
                <span className="istory__step-label mono">Outcome</span>
                {story.outcome}
              </span>
            </p>
          </div>
        </motion.article>
      </Tilt>
    </Reveal>
  )
}

export function Impact() {
  return (
    <section id="impact" className="section impact" aria-labelledby="impact-title">
      <div className="container">
        <SectionHeading
          id="impact-title"
          index="06"
          label="Impact"
          title={
            <>
              What my work <span className="serif muted">changed.</span>
            </>
          }
          intro="Four things I built at Rezolve.ai, and what each one made possible for the product, its users and the team."
        />

        <ul role="list" className="impact__stories">
          {impactStories.map((s, i) => (
            <StoryCard key={s.id} story={s} index={i} />
          ))}
        </ul>

        <Reveal className="award" delay={0.1}>
          <span className="award__border" aria-hidden="true" />
          <span className="award__shine" aria-hidden="true" />
          <div className="award__medal" aria-hidden="true">
            <Award size={34} strokeWidth={1.4} />
            <Sparkles className="award__spark award__spark--a" size={14} />
            <Sparkles className="award__spark award__spark--b" size={10} />
          </div>
          <div className="award__body">
            <p className="award__org mono">Recognition · {award.org}</p>
            <h3 className="award__title">{award.title}</h3>
            <p className="award__detail">{award.detail}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
