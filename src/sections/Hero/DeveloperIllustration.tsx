import { useState } from 'react'
import { motion } from 'motion/react'
import './DeveloperIllustration.css'

/** Code tokens that drift up around the developer's head. */
const tokens = [
  { text: '</>', x: 92, y: 150, delay: 0 },
  { text: '{ }', x: 300, y: 118, delay: 1.1 },
  { text: '=>', x: 318, y: 210, delay: 2.2 },
  { text: 'SQL', x: 70, y: 238, delay: 3.0 },
  { text: '200', x: 268, y: 70, delay: 3.9 },
]

/** Short "code" lines reflected in the glasses; they scroll upward in a loop. */
const reflection = [16, 22, 12, 26, 18, 10, 24, 14, 20, 12]

/**
 * Flat illustration of a developer typing at a laptop (drawn in SVG, theme-aware).
 * Animations — typing, blinking, code reflections, steam, drifting tokens — run only
 * while the figure is on screen; reduced motion shows the still scene.
 */
export function DeveloperIllustration() {
  const [live, setLive] = useState(false)

  return (
    <motion.div
      className={`dev ${live ? 'is-live' : ''}`}
      onViewportEnter={() => setLive(true)}
      onViewportLeave={() => setLive(false)}
    >
      <svg viewBox="0 0 400 500" role="img" aria-label="Illustration of a developer typing on a laptop">
        <defs>
          <radialGradient id="dev-halo" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dev-screen-glow" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dev-logo-glow">
            <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
          </radialGradient>
          <clipPath id="dev-lens-left">
            <rect x="160" y="196" width="38" height="28" rx="9" />
          </clipPath>
          <clipPath id="dev-lens-right">
            <rect x="202" y="196" width="38" height="28" rx="9" />
          </clipPath>
        </defs>

        {/* Backdrop */}
        <circle cx="200" cy="215" r="160" fill="url(#dev-halo)" />

        {/* Floating code tokens */}
        <g className="dev-tokens" aria-hidden="true">
          {tokens.map((t) => (
            <text key={t.text} x={t.x} y={t.y} className="dev-token" style={{ animationDelay: `${t.delay}s` }}>
              {t.text}
            </text>
          ))}
        </g>

        {/* Upper body (sits behind the laptop) */}
        <g className="dev-body">
          <path className="dev-shirt" d="M88 400 C92 340 128 310 170 300 L230 300 C272 310 308 340 312 400 Z" />
          <path className="dev-shirt-shade" d="M88 400 C92 352 112 326 140 312 C126 340 120 370 122 400 Z" />
          <path className="dev-shirt-shade" d="M312 400 C308 352 288 326 260 312 C274 340 280 370 278 400 Z" />
          {/* neck + collar */}
          <rect className="dev-skin-shade" x="182" y="258" width="36" height="48" rx="12" />
          <path className="dev-skin-shade" d="M180 300 L200 324 L220 300 Z" />
          <path className="dev-collar" d="M176 298 L200 326 L188 298 Z" />
          <path className="dev-collar" d="M224 298 L200 326 L212 298 Z" />

          {/* Head (gently nods) */}
          <g className="dev-head">
            <ellipse className="dev-skin" cx="142" cy="214" rx="10" ry="15" />
            <ellipse className="dev-skin" cx="258" cy="214" rx="10" ry="15" />
            <ellipse className="dev-skin" cx="200" cy="206" rx="58" ry="66" />

            {/* hair */}
            <path className="dev-hair" d="M140 206 C134 160 156 128 198 124 C234 120 264 142 262 182 C262 194 259 204 257 212 C252 188 238 172 214 168 C190 165 166 172 152 186 C146 193 142 199 140 206 Z" />
            <path className="dev-hair" d="M148 166 C158 128 208 108 246 132 C226 126 198 128 180 144 C170 152 160 158 148 166 Z" />
            {/* highlight strands give the quiff some volume */}
            <path className="dev-hair-shine" d="M164 150 C182 132 214 126 238 136" />
            <path className="dev-hair-shine" d="M172 160 C188 148 208 144 226 148" />
            <path className="dev-hair" d="M140 204 L145 232 L152 234 L150 204 Z" />
            <path className="dev-hair" d="M260 204 L255 232 L248 234 L250 204 Z" />

            {/* beard + mustache + mouth */}
            <path className="dev-hair" d="M144 214 C146 262 176 287 200 288 C224 287 254 262 256 214 C250 238 238 250 222 253 C214 247 186 247 178 253 C162 250 150 238 144 214 Z" />
            <path className="dev-hair" d="M178 251 Q200 239 222 251 Q211 256 200 251 Q189 256 178 251 Z" />
            <path className="dev-mouth" d="M188 260 Q200 266 212 260" />

            {/* eyebrows, eyes (blink), nose */}
            <path className="dev-brow" d="M166 190 Q179 183 193 189" />
            <path className="dev-brow" d="M207 189 Q221 183 234 190" />
            <g className="dev-eyes">
              <ellipse className="dev-eye" cx="180" cy="209" rx="4.5" ry="5" />
              <ellipse className="dev-eye" cx="220" cy="209" rx="4.5" ry="5" />
            </g>
            <path className="dev-nose" d="M200 212 Q196 228 192 234 Q200 238 208 234" />

            {/* glasses with scrolling code reflections */}
            <rect className="dev-lens" x="160" y="196" width="38" height="28" rx="9" />
            <rect className="dev-lens" x="202" y="196" width="38" height="28" rx="9" />
            {(['left', 'right'] as const).map((side) => (
              <g key={side} clipPath={`url(#dev-lens-${side})`}>
                <g className="dev-reflection">
                  {[...reflection, ...reflection].map((w, i) => (
                    <rect key={i} x={(side === 'left' ? 164 : 206) + (i % 3) * 3} y={198 + i * 5} width={w} height="1.6" rx="0.8" className="dev-code-line" />
                  ))}
                </g>
              </g>
            ))}
            <path className="dev-frame" d="M160 206 L146 203 M240 206 L254 203 M198 207 Q200 203 202 207" />
            <rect className="dev-frame" x="160" y="196" width="38" height="28" rx="9" />
            <rect className="dev-frame" x="202" y="196" width="38" height="28" rx="9" />

            {/* screen light on the face */}
            <ellipse className="dev-face-glow" cx="200" cy="262" rx="70" ry="46" fill="url(#dev-screen-glow)" />
          </g>
        </g>

        {/* Desk */}
        <rect className="dev-desk" x="0" y="404" width="400" height="96" />
        <rect className="dev-desk-edge" x="0" y="404" width="400" height="2" />

        {/* Plant */}
        <g className="dev-plant">
          <g className="dev-leaves">
            <ellipse cx="50" cy="352" rx="7" ry="20" transform="rotate(-28 50 352)" />
            <ellipse cx="66" cy="346" rx="7" ry="22" transform="rotate(6 66 346)" />
            <ellipse cx="80" cy="356" rx="7" ry="18" transform="rotate(34 80 356)" />
          </g>
          <path className="dev-pot" d="M44 372 L88 372 L83 404 L49 404 Z" />
        </g>

        {/* Laptop (lid faces the developer; we see its back) */}
        <g className="dev-laptop">
          <rect className="dev-lid" x="112" y="300" width="176" height="102" rx="9" />
          <rect className="dev-lid-shine" x="118" y="306" width="164" height="3" rx="1.5" />
          {/* gradient glow instead of a blur filter (filters are costly to redraw every frame) */}
          <ellipse className="dev-logo-glow" cx="200" cy="351" rx="34" ry="22" />
          <text className="dev-logo" x="200" y="358">
            &lt;/&gt;
          </text>
          <path className="dev-base" d="M92 400 L308 400 L320 412 L80 412 Z" />
        </g>

        {/* Arms + typing hands */}
        <path className="dev-arm" d="M96 362 C92 384 102 400 124 406 L150 406 C134 394 126 376 124 354 Z" />
        <path className="dev-arm" d="M304 362 C308 384 298 400 276 406 L250 406 C266 394 274 376 276 354 Z" />
        <ellipse className="dev-skin dev-hand dev-hand--l" cx="142" cy="403" rx="17" ry="9" />
        <ellipse className="dev-skin dev-hand dev-hand--r" cx="258" cy="403" rx="17" ry="9" />

        {/* Coffee */}
        <g className="dev-coffee">
          <path className="dev-steam" d="M332 344 C326 332 338 324 332 310" />
          <path className="dev-steam dev-steam--2" d="M342 346 C336 330 348 322 342 304" />
          <path className="dev-steam dev-steam--3" d="M352 344 C346 332 358 324 352 312" />
          <path className="dev-mug-handle" d="M358 366 C372 366 372 386 358 386" />
          <rect className="dev-mug" x="324" y="356" width="36" height="48" rx="7" />
          <rect className="dev-mug-band" x="324" y="372" width="36" height="6" />
        </g>
      </svg>
    </motion.div>
  )
}
