import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in the middle band of the viewport.
 * Returns the id of that section, or '' when none (e.g. on the hero).
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key.split('|')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          else if (entry.target.id === sectionIds[0] && entry.boundingClientRect.top > 0) setActive('')
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}
