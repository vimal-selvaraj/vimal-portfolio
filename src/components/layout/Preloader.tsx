import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, motion } from 'motion/react'
import { profile } from '../../data/portfolio'
import { IntroContext, markIntroSeen, shouldPlayIntro } from '../../hooks/useIntro'
import { setScrollLocked } from '../../lib/scroll'
import './Preloader.css'

const EASE = [0.76, 0, 0.24, 1] as const
const COUNT_DURATION = 1.25

/**
 * Short intro shown once per session: a 0→100 counter and the name, then a curtain
 * that lifts to reveal the hero. Click or press any key to skip. The rest of the page
 * is rendered underneath the whole time, so content is never blocked for crawlers or
 * assistive tech.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(shouldPlayIntro)
  // The hero starts its entrance as the curtain begins to lift.
  const [done, setDone] = useState(!playing)
  const finish = useCallback(() => {
    markIntroSeen()
    setDone(true)
    setPlaying(false)
  }, [])

  return (
    <IntroContext.Provider value={done}>
      {children}
      <AnimatePresence onExitComplete={() => setScrollLocked(false)}>
        {playing && (
          <Preloader onFinish={finish} />
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  )
}

function Preloader({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0)
  const finished = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollLocked(true)

    const finish = () => {
      if (finished.current) return
      finished.current = true
      onFinish()
    }
    const controls = animate(0, 100, {
      duration: COUNT_DURATION,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(finish, 250),
    })
    window.addEventListener('keydown', finish)
    return () => {
      controls.stop()
      window.removeEventListener('keydown', finish)
    }
  }, [onFinish])

  return (
    <motion.div
      className="intro"
      aria-hidden="true"
      onClick={() => {
        if (finished.current) return
        finished.current = true
        onFinish()
      }}
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div className="intro__inner">
        <p className="intro__name">
          {profile.name.split(' ').map((word, w, words) => {
            // Running letter index across words keeps one continuous stagger.
            const offset = words.slice(0, w).join('').length
            return (
              <span key={word} className="intro__word">
                {word.split('').map((ch, i) => (
                  <span key={i} className="intro__char-mask">
                    <motion.span
                      className="intro__char"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.1 + (offset + i) * 0.035, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            )
          })}
        </p>
        <motion.p
          className="intro__role mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {profile.title} · Portfolio
        </motion.p>
      </div>

      <div className="intro__foot">
        <span className="intro__count">{String(count).padStart(3, '0')}</span>
        <span className="intro__bar">
          <span className="intro__bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
        </span>
        <span className="intro__skip mono">Click to skip</span>
      </div>
    </motion.div>
  )
}
