import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Footer from './components/Footer'
import Loading from './components/loading'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoSrc = `${import.meta.env.BASE_URL}bg.mp4`

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Ensure muted + inline for autoplay policies
    v.muted = true
    v.defaultMuted = true
    const tryPlay = () => v.play().catch(() => {})
    // Try immediately and after a tick
    tryPlay()
    const t = setTimeout(tryPlay, 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0b0f14' }}>
        <video
          ref={videoRef}
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black/60 z-10 pointer-events-none" />
        <div className="relative z-20">
          <ScrollToTop />
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            
          </main>

        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
