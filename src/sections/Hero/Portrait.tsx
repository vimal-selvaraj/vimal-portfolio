import type { CSSProperties, PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { hero, profile } from '../../data/portfolio'
import { DeveloperIllustration } from './DeveloperIllustration'
import { CodeEditorVisual } from './CodeEditorVisual'

/** Inline style that may also set CSS custom properties. */
type StyleVars = CSSProperties & Record<`--${string}`, string | number>

/** Positions for the floating tech labels, as % of the visual's box. */
const chipSpots: CSSProperties[] = [
  { top: '58%', left: '-18%' }, // below the request.path panel (top-left), clear of the plant
  { top: '18%', right: '-12%' },
  { top: '42%', left: '-16%' },
  { top: '56%', right: '-14%' },
  { top: '-4%', left: '10%' },
  { bottom: '6%', right: '-6%' },
  { top: '-4%', right: '22%' },
  { bottom: '-4%', left: '26%' },
]

/**
 * Profile frame with a monogram placeholder (or photo when `profile.photo` is set),
 * a subtle 3D tilt on mouse move, floating tech labels and a layered-architecture panel.
 */
export function Portrait() {
  const isCode = hero.visual === 'code'
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 120, damping: 18 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring)
  const glowX = useTransform(px, [-0.5, 0.5], ['20%', '80%'])
  const glowY = useTransform(py, [-0.5, 0.5], ['20%', '80%'])

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  function reset() {
    px.set(0)
    py.set(0)
  }

  return (
    <div className={`portrait portrait--${isCode ? 'code' : 'art'}`} onPointerMove={handleMove} onPointerLeave={reset}>
      <motion.figure className="portrait__frame" style={{ rotateX, rotateY }}>
        <motion.div
          className="portrait__glow"
          aria-hidden="true"
          style={{ left: glowX, top: glowY }}
        />
        {profile.photo ? (
          <img className="portrait__photo" src={profile.photo} alt={`Portrait of ${profile.name}`} loading="eager" decoding="async" />
        ) : isCode ? (
          <CodeEditorVisual />
        ) : (
          <DeveloperIllustration />
        )}

        {/* Technical frame details */}
        <span className="portrait__corner portrait__corner--tl" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--tr" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--bl" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--br" aria-hidden="true" />

        {!isCode && (
          <figcaption className="portrait__caption">
            <span className="mono portrait__caption-label">{profile.title}</span>
            <span className="portrait__caption-name">{profile.name}</span>
          </figcaption>
        )}
      </motion.figure>

      {/* The code editor's terminal already traces the request path, so the panel is only for the illustration. */}
      {!isCode && (
      <div className="portrait__stack" aria-label="Layered architecture I work across">
        <p className="mono portrait__stack-title">
          <span className="portrait__stack-dot" aria-hidden="true" /> request.path
        </p>
        <ol role="list" className="portrait__layers">
          {hero.systemPath.map((step, i) => (
            <li key={step.layer} className="portrait__layer" style={{ '--i': i } as StyleVars}>
              <span className="mono portrait__layer-name">{step.layer}</span>
              <span className="portrait__layer-tech">{step.tech}</span>
            </li>
          ))}
        </ol>
      </div>
      )}

      <ul role="list" className="portrait__chips" aria-label="Core technologies">
        {hero.floatingTech.map((tech, i) => (
          <motion.li
            key={tech}
            className="portrait__chip mono"
            style={{ ...chipSpots[i % chipSpots.length], '--d': `${i * -1.3}s` } as StyleVars}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Float animation lives on the inner span so it doesn't fight Motion's entrance transform. */}
            <span className="portrait__chip-inner">{tech}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
