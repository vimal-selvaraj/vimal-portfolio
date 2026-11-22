import { MotionConfig } from 'motion/react'
import { BackgroundGrid } from './components/layout/BackgroundGrid'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { IntroProvider } from './components/layout/Preloader'
import { ChapterIndicator } from './components/layout/ChapterIndicator'
import { Cursor } from './components/cursor/Cursor'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { Skills } from './sections/Skills/Skills'
import { Experience } from './sections/Experience/Experience'
import { Projects } from './sections/Projects/Projects'
import { Impact } from './sections/Impact/Impact'
import { Learning } from './sections/Learning/Learning'
import { Contact } from './sections/Contact/Contact'

function App() {
  return (
    // reducedMotion="user" makes every Motion animation honour prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      {/* SmoothScroll must mount before the intro so the intro can pause scrolling. */}
      <IntroProvider>
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <BackgroundGrid />
        <Navbar />
        <ChapterIndicator />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Impact />
          <Learning />
          <Contact />
        </main>
        <Footer />
        <Cursor />
      </IntroProvider>
    </MotionConfig>
  )
}

export default App
