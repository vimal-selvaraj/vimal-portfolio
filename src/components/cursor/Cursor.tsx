import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import './Cursor.css'

type Mode = 'default' | 'link' | 'label'

const INTERACTIVE = 'a, button, [role="tab"], summary, label, [data-cursor]'

/** Only for precise pointers (mouse/trackpad); touch devices keep their native behaviour. */
function canUseCustomCursor() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/**
 * Two-part cursor: a dot that tracks the pointer exactly and a ring that follows on a
 * spring for a smooth, trailing feel. Hovering links grows the ring; elements with
 * `data-cursor="View"` (any text) turn it into a labelled disc.
 */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled] = useState(canUseCustomCursor)
  const [mode, setMode] = useState<Mode>('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 170, damping: 20, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 170, damping: 20, mass: 0.55 })

  const active = enabled && !reduce

  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE)
      const text = target?.getAttribute('data-cursor')
      if (text) {
        setMode('label')
        setLabel(text)
      } else {
        setMode(target ? 'link' : 'default')
      }
    }
    const onLeaveWindow = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [active, x, y])

  if (!active) return null

  return (
    <div className={`cursor ${visible ? 'is-visible' : ''}`} aria-hidden="true">
      <motion.div className="cursor__dot" style={{ x, y }} data-mode={mode} />
      <motion.div className="cursor__ring-pos" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="cursor__ring"
          data-mode={mode}
          animate={{
            width: mode === 'label' ? 72 : mode === 'link' ? 56 : 34,
            height: mode === 'label' ? 72 : mode === 'link' ? 56 : 34,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {mode === 'label' && (
              <motion.span
                key={label}
                className="cursor__label mono"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
