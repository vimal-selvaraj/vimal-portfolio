import type Lenis from 'lenis'

let instance: Lenis | null = null

/** Registered by <SmoothScroll />; null when smooth scrolling is off (e.g. reduced motion). */
export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis() {
  return instance
}

/** Pause / resume page scrolling — works with or without Lenis. */
export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop()
    else instance.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
