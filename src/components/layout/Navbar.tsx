import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navItems, profile } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ThemeToggle } from '../ui/ThemeToggle'
import './Navbar.css'

/*
 * Also observe sections that have no menu entry (Learning), so the highlight clears
 * while they're on screen instead of sticking to the previous item.
 */
const sectionIds = [...navItems.map((n) => n.id), 'learning']

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  // Glass background once scrolled; slide away while scrolling down, return on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 480 && y > prev)
  })

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !open ? '-110%' : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav__inner container">
          <a href="#top" className="nav__brand" aria-label={`${profile.name} — back to top`}>
            <span className="nav__mark">{profile.initials}</span>
            <span className="nav__name">
              {profile.name}
              <span className="nav__role mono">{profile.title}</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul role="list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                    aria-current={active === item.id ? 'location' : undefined}
                  >
                    {active === item.id && (
                      <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="nav__link-text">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <a className="nav__cta" href={profile.resume} download={profile.resumeFileName}>
              Resume <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="nav__toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mmenu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="mmenu__inner container" aria-label="Mobile">
              <ul role="list">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a href={`#${item.id}`} className="mmenu__link" onClick={() => setOpen(false)}>
                      <span className="mono mmenu__index">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mmenu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.resume} download={profile.resumeFileName}>
                  Download Resume <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
