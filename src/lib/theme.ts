export type Theme = 'light' | 'dark'

const KEY = 'vs-theme'
const META_COLOR: Record<Theme, string> = { dark: '#07080a', light: '#f5f6f8' }

/** The theme currently applied to <html> (set before first paint by the script in index.html). */
export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme])
}

/**
 * Switch theme and remember the choice. When the browser supports View Transitions
 * (and motion is allowed) the new theme expands as a circle from `origin`.
 */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // Not persisted (private mode) — still applied for this visit.
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce || !origin) {
    apply(theme)
    return
  }

  const transition = document.startViewTransition(() => apply(theme))
  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y))
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
    .catch(() => {})
}

/** Subscribe to theme changes (for useSyncExternalStore). */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // Follow the OS setting live until the visitor makes an explicit choice.
  const mql = window.matchMedia('(prefers-color-scheme: light)')
  const onSystem = (e: MediaQueryListEvent) => {
    if (!storedTheme()) apply(e.matches ? 'light' : 'dark')
  }
  mql.addEventListener('change', onSystem)

  return () => {
    observer.disconnect()
    mql.removeEventListener('change', onSystem)
  }
}
