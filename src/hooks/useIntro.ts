import { createContext, useContext } from 'react'

/** True once the intro preloader has finished (or was never shown). */
export const IntroContext = createContext(true)

export function useIntroDone() {
  return useContext(IntroContext)
}

const KEY = 'vs-intro-seen'

/** The intro plays once per browser session, and never for reduced-motion users. */
export function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // Storage can be unavailable (private mode); the intro simply plays again next time.
  }
}
