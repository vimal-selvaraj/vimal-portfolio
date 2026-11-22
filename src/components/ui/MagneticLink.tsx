import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import './Button.css'

type MagneticLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  download?: string
  external?: boolean
  strength?: number
  className?: string
}

/**
 * Link styled as a button that drifts toward the cursor.
 * The effect is mouse-only and disabled for prefers-reduced-motion.
 */
export function MagneticLink({
  href,
  children,
  variant = 'primary',
  download,
  external,
  strength = 0.3,
  className = '',
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 16, mass: 0.5 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.2)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`btn btn--${variant} ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
    >
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label">{children}</span>
    </motion.a>
  )
}
