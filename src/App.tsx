import { MotionConfig } from 'motion/react'
import { BackgroundGrid } from './components/layout/BackgroundGrid'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Skills } from './sections/Skills/Skills'
import { Experience } from './sections/Experience/Experience'
import { Projects } from './sections/Projects/Projects'
import { Achievements } from './sections/Achievements/Achievements'
import { Learning } from './sections/Learning/Learning'
import { Contact } from './sections/Contact/Contact'

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
        <Learning />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
