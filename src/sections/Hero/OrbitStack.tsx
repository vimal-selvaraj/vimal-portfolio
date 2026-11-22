import { useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'motion/react'
import {
  siDocker,
  siExpress,
  siGitlab,
  siJavascript,
  siMui,
  siNodedotjs,
  siOkta,
  siPostgresql,
  siReact,
  siRedux,
  siSequelize,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'
import './OrbitStack.css'

type StyleVars = CSSProperties & Record<`--${string}`, string | number>

/**
 * Three tilted rings, inner → outer. `gz` turns the ring in the screen plane (so the rings
 * cross like an atom), `tilt` lays it back in 3D, `dur`/`dir` set its orbit speed and direction.
 */
const RINGS: { r: number; gz: number; tilt: number; dur: number; dir: 1 | -1; icons: SimpleIcon[] }[] = [
  { r: 25, gz: 0, tilt: 64, dur: 26, dir: 1, icons: [siReact, siTypescript, siNodedotjs] },
  { r: 36, gz: 38, tilt: 62, dur: 38, dir: -1, icons: [siExpress, siPostgresql, siRedux, siDocker] },
  { r: 46, gz: -34, tilt: 66, dur: 52, dir: 1, icons: [siJavascript, siMui, siSequelize, siOkta, siGitlab] },
]

/** Very dark brand colours (Express is near-black) would vanish on the dark theme — use the text colour. */
function logoColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum < 0.12 ? 'var(--text)' : `#${hex}`
}

/**
 * The tech stack as an orbital system: logo badges circle a glowing core on tilted 3D rings.
 * Hovering a badge pauses its ring and names it in the core. Pure CSS 3D transforms
 * (GPU-composited); pauses off screen and while the page scrolls.
 */
export function OrbitStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  const [active, setActive] = useState<string | null>(null)
  const all = RINGS.flatMap((r) => r.icons.map((i) => i.title))

  return (
    <div ref={ref} className={`orbit ${inView ? 'is-live' : ''}`}>
      {/* Screen readers get the plain list; the animated scene is decorative. */}
      <ul className="sr-only" aria-label="Technologies I work with">
        {all.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="orbit__scene" aria-hidden="true">
        <div className="orbit__core">
          <span className="orbit__core-glyph">&lt;/&gt;</span>
          <span className="orbit__core-label mono">{active ?? 'Full-stack'}</span>
        </div>

        {RINGS.map((ring, ri) => (
          <div
            key={ri}
            className="orbit__ring"
            style={{ '--r': `${ring.r}cqi`, '--gz': `${ring.gz}deg`, '--tilt': `${ring.tilt}deg`, '--dur': `${ring.dur}s`, '--dir': ring.dir } as StyleVars}
          >
            <div className="orbit__spin">
              <span className="orbit__path" />
              {ring.icons.map((icon, i) => (
                <div key={icon.slug} className="orbit__slot" style={{ '--a': `${(360 / ring.icons.length) * i + ri * 20}deg` } as StyleVars}>
                  <div className="orbit__face">
                    <span
                      className="orbit__badge"
                      onPointerEnter={() => setActive(icon.title)}
                      onPointerLeave={() => setActive(null)}
                    >
                      <svg viewBox="0 0 24 24" style={{ fill: logoColor(icon.hex) }}>
                        <path d={icon.path} />
                      </svg>
                      <span className="orbit__name mono">{icon.title}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
