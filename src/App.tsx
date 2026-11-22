import { MotionConfig } from 'motion/react'
import { BackgroundGrid } from './components/layout/BackgroundGrid'
import { Navbar } from './components/layout/Navbar'
import { SectionHeading } from './components/ui/SectionHeading'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Skills } from './sections/Skills/Skills'
import { Experience } from './sections/Experience/Experience'
import { Projects } from './sections/Projects/Projects'
import { Achievements } from './sections/Achievements/Achievements'

/** Sections still to be built in later phases. */
const placeholders = [
  { id: 'contact', index: '09', label: 'Contact', title: 'Contact — Phase 6' },
]

function App() {
  return (
    // reducedMotion="user" makes every Motion animation honour prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <BackgroundGrid />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        {placeholders.map((p) => (
          <section key={p.id} id={p.id} className="section" aria-labelledby={`${p.id}-title`}>
            <div className="container">
              <SectionHeading id={`${p.id}-title`} index={p.index} label={p.label} title={p.title} />
            </div>
          </section>
        ))}
      </main>
    </MotionConfig>
  )
}

export default App
