import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { Award } from 'lucide-react'
import { achievements, award, type Achievement } from '../../data/portfolio'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import './Achievements.css'

/** Counts from 0 to the target the first time it scrolls into view. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return <span ref={ref}>{reduce ? value : shown}</span>
}

function Stat({ item, index }: { item: Achievement; index: number }) {
  const full = `${item.prefix ?? ''}${item.value}${item.suffix}`
  return (
    <Reveal as="li" className="stat" delay={index * 0.08}>
      <p className="stat__value">
        <span className="sr-only">{full}</span>
        <span aria-hidden="true">
          {item.prefix && <span className="stat__affix">{item.prefix}</span>}
          <CountUp value={item.value} />
          <span className="stat__affix accent">{item.suffix}</span>
        </span>
      </p>
      <p className="stat__label">{item.label}</p>
      <p className="stat__detail">{item.detail}</p>
      <span className="stat__bar" aria-hidden="true" />
    </Reveal>
  )
}

export function Achievements() {
  return (
    <section id="achievements" className="section achv" aria-labelledby="achievements-title">
      <div className="container">
        <SectionHeading
          id="achievements-title"
          index="06"
          label="Achievements"
          title={
            <>
              Impact you can <span className="serif muted">measure.</span>
            </>
          }
          intro="Performance gains, shared foundations and recognition — outcomes from shipping enterprise software."
        />

        <ul role="list" className="achv__stats">
          {achievements.map((a, i) => (
            <Stat key={a.label} item={a} index={i} />
          ))}
        </ul>

        <Reveal className="achv__award" delay={0.1}>
          <span className="achv__award-icon" aria-hidden="true">
            <Award size={28} strokeWidth={1.5} />
          </span>
          <div className="achv__award-body">
            <p className="achv__award-org mono">Recognition · {award.org}</p>
            <h3 className="achv__award-title">{award.title}</h3>
            <p className="achv__award-detail">{award.detail}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
