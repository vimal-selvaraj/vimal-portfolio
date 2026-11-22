import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 }

const LINK_DIST = 150
const POINTER_DIST = 210
const LINK_LEVELS = 5

/**
 * Decorative "system" field behind the hero: drifting nodes that link to their
 * neighbours and reach toward the pointer, with a soft spotlight under the cursor.
 * Runs only while the hero is on screen and the tab is visible; reduced motion
 * gets a single still frame.
 */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    let running = false
    let onScreen = true
    const pointer = { x: -9999, y: -9999, active: false }
    const links: number[][] = Array.from({ length: LINK_LEVELS }, () => [])

    // Canvas can't read CSS variables, so pull the theme colours (RGB triples) and
    // refresh them whenever the light/dark theme changes.
    const colors = { accent: '', violet: '', fg: '' }
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors.accent = cs.getPropertyValue('--accent-rgb').trim()
      colors.violet = cs.getPropertyValue('--violet-rgb').trim()
      colors.fg = cs.getPropertyValue('--fg-rgb').trim()
    }
    readColors()

    const seed = () => {
      const count = Math.min(70, Math.round((width * height) / 17000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        hue: Math.random() < 0.7 ? 0 : 1,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      if (!running) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Spotlight under the pointer
      if (pointer.active) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 320)
        g.addColorStop(0, `rgba(${colors.accent}, 0.09)`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height)
      }

      // Links are grouped into a few brightness levels and stroked once per level,
      // instead of one stroke() call per line (hundreds per frame).
      for (const level of links) level.length = 0
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const level = Math.min(LINK_LEVELS - 1, Math.floor((1 - d / LINK_DIST) * LINK_LEVELS))
            links[level].push(a.x, a.y, b.x, b.y)
          }
        }
        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          if (d < POINTER_DIST) {
            ctx.strokeStyle = `rgba(${a.hue ? colors.violet : colors.accent}, ${(1 - d / POINTER_DIST) * 0.45})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
      }

      ctx.lineWidth = 1
      links.forEach((segs, level) => {
        if (!segs.length) return
        ctx.strokeStyle = `rgba(${colors.fg},${((level + 0.5) / LINK_LEVELS) * 0.09})`
        ctx.beginPath()
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1])
          ctx.lineTo(segs[k + 2], segs[k + 3])
        }
        ctx.stroke()
      })

      for (const n of nodes) {
        const near = pointer.active && Math.hypot(n.x - pointer.x, n.y - pointer.y) < POINTER_DIST
        ctx.fillStyle = `rgba(${n.hue ? colors.violet : colors.accent}, ${near ? 0.95 : 0.45})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      // Hold the current frame while the page scrolls (see SmoothScroll's `is-scrolling`).
      if (document.documentElement.classList.contains('is-scrolling')) {
        raf = requestAnimationFrame(step)
        return
      }
      for (const n of nodes) {
        // Gentle pull toward the pointer, then drift
        if (pointer.active) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < POINTER_DIST && d > 1) {
            n.vx += (dx / d) * 0.012
            n.vy += (dy / d) * 0.012
          }
        }
        n.vx *= 0.985
        n.vy *= 0.985
        // Keep a minimum drift so the field never freezes
        if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.04
        if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.04
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (running || reduce || !onScreen || document.hidden) return
      running = true
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (!running) draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    resize()
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return <canvas ref={canvasRef} className="hero__field" aria-hidden="true" />
}
