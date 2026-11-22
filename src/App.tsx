import { MotionConfig } from 'motion/react'
import { BackgroundGrid } from './components/layout/BackgroundGrid'
import { Navbar } from './components/layout/Navbar'
import { SectionHeading } from './components/ui/SectionHeading'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'

/** Sections still to be built in later phases. */
const placeholders = [
  { id: 'expertise', index: '03', label: 'Technical Expertise', title: 'Expertise — Phase 4' },
  { id: 'experience', index: '04', label: 'Professional Experience', title: 'Experience — Phase 4' },
  { id: 'projects', index: '05', label: 'Featured Projects', title: 'Projects — Phase 5' },
  { id: 'achievements', index: '06', label: 'Achievements', title: 'Achievements — Phase 5' },
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
