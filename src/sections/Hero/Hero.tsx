import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { hero, profile } from '../../data/portfolio'
import { MagneticLink } from '../../components/ui/MagneticLink'
import { Portrait } from './Portrait'
import './Hero.css'

const EASE = [0.22, 1, 0.36, 1] as const

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
}

const word: Variants = {
  hidden: { y: '115%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.05, ease: EASE } },
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

/** Words wrapped in their own mask so each one rises into view. */
function Line({ text, accentWord }: { text: string; accentWord?: string }) {
  return (
    <span className="hero__line">
      {text.split(' ').map((w, i) => (
        <span className="hero__word-mask" key={`${w}-${i}`}>
          <motion.span className={`hero__word ${w === accentWord ? 'serif hero__word--accent' : ''}`} variants={word}>
            {w}
          </motion.span>
          {' '}
        </span>
      ))}
    </span>
  )
}

/** One-time typed reveal of the alternate headline. */
function TypedLine({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.p
      className="hero__typed mono"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.028, delayChildren: delay } } }}
    >
      {/* aria-label isn't allowed on a plain <p>, so screen readers get the sentence as hidden text */}
      <span className="sr-only">{text}</span>
      <span className="hero__typed-prompt" aria-hidden="true">
        &gt;
      </span>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
      <span className="hero__caret" aria-hidden="true" />
    </motion.p>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])

  return (
    <section ref={ref} id="top" className="hero" aria-label="Introduction">
      {/* Content and meta row move together on scroll so they can never overlap. */}
      <motion.div className="hero__stage" style={{ y: contentY, opacity: contentOpacity }}>
      <div className="hero__inner container">
        <div className="hero__copy">
          <motion.p className="hero__label mono" {...fadeUp(0.1)}>
            <span className="hero__pulse" aria-hidden="true" />
            {hero.label}
          </motion.p>

          <motion.h1 className="hero__title" initial="hidden" animate="show" variants={headline}>
            <Line text={hero.headline[0]} />
            <Line text={hero.headline[1]} accentWord="Digital" />
          </motion.h1>

          <TypedLine text={hero.altHeadline} delay={1.3} />

          <motion.p className="hero__desc" {...fadeUp(0.95)}>
            {hero.description}
          </motion.p>

          <motion.div className="hero__ctas" {...fadeUp(1.1)}>
            <MagneticLink href="#projects">
              Explore My Work <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href={profile.resume} download={profile.resumeFileName} variant="secondary">
              Download Resume <Download size={17} aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="#contact" variant="ghost" strength={0.2}>
              Let&rsquo;s Connect
            </MagneticLink>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        >
          <Portrait />
        </motion.div>
      </div>

      <motion.div className="hero__meta container" {...fadeUp(1.5)}>
        <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
          <span className="hero__scroll-track" aria-hidden="true">
            <span className="hero__scroll-thumb" />
          </span>
          <span className="mono">Scroll</span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
        <p className="hero__meta-item mono">
          <MapPin size={13} aria-hidden="true" /> Based in {profile.location}
        </p>
        <p className="hero__meta-item mono hero__meta-item--end">
          Currently @ <span className="hero__meta-strong">{hero.meta.current}</span>
        </p>
      </motion.div>
      </motion.div>
    </section>
  )
}
