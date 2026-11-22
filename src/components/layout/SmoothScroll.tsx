import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from '../../lib/scroll'

/**
 * Inertial smooth scrolling for wheel/trackpad. Touch keeps native scrolling, and
 * reduced-motion users get the browser's default. Motion's useScroll keeps working
 * because Lenis still drives the real window scroll position.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      // In-page links (#about, #contact…) glide too. Lenis already honours the
      // html scroll-padding-top (navbar height), so no extra offset is needed.
      anchors: true,
    })
    setLenis(lenis)
    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [reduce])

  // While the page is actively scrolling, <html> gets `is-scrolling`. Decorative
  // animations pause on it so every frame goes to the scroll itself.
  useEffect(() => {
    const root = document.documentElement
    let timer = 0
    const onScroll = () => {
      if (!timer) root.classList.add('is-scrolling')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        root.classList.remove('is-scrolling')
        timer = 0
      }, 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
      root.classList.remove('is-scrolling')
    }
  }, [])

  return null
}
