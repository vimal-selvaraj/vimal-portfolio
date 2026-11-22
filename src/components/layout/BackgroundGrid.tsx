import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import './BackgroundGrid.css'

/** Fixed, decorative backdrop: technical grid, soft aurora and film grain. */
export function BackgroundGrid() {
  // Scroll-linked parallax is not covered by MotionConfig, so switch it off explicitly.
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '40%'])

  return (
    <div className="bg" aria-hidden="true">
      <motion.div className="bg__grid" style={{ y: gridY }} />
      {/* Parallax lives on the wrapper so it never fights the CSS drift animation on the glows. */}
      <motion.div className="bg__glows" style={{ y: glowY }}>
        <div className="bg__glow bg__glow--cyan" />
        <div className="bg__glow bg__glow--violet" />
      </motion.div>
      <div className="bg__vignette" />
      <div className="bg__grain" />
    </div>
  )
}
