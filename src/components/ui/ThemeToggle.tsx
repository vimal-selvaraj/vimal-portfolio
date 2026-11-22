import { useSyncExternalStore, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { getTheme, setTheme, subscribeTheme } from '../../lib/theme'
import './ThemeToggle.css'

/** Sun/moon button that switches between the light and dark themes. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark' as const)
  const next = theme === 'dark' ? 'light' : 'dark'

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    setTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }

  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={onClick} aria-label={`Switch to ${next} theme`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="theme-toggle__icon"
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
