import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import './Tilt.css'

type TiltProps = {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
  /** Show a soft light glare that follows the pointer. */
  glare?: boolean
}

/**
 * 3D tilt toward the pointer with a moving light glare.
 * Mouse/pen only — touch and reduced-motion users get a static card.
 */
export function Tilt({ children, className = '', max = 7, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const spring = { stiffness: 200, damping: 20, mass: 0.6 }
  const rotateX = useSpring(rx, spring)
  const rotateY = useSpring(ry, spring)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.13), transparent 55%)`

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {glare && !reduce && <motion.span className="tilt__glare" style={{ background: glareBg }} aria-hidden="true" />}
    </motion.div>
  )
}
