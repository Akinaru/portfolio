import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import HomePage from './pages/HomePage'
import InfoProjectPage from './pages/InfoProjectPage '
import './App.css'

const sections = ['home', 'about', 'projects', 'contact'] as const;
type Section = typeof sections[number];

const sectionNames = {
  home: 'Home',
  about: 'About',
  projects: 'Projects',
  contact: 'Contact'
} as const;

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [hoveredDot, setHoveredDot] = useState<Section | null>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.5;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            setActiveSection(section);
          }
        }
      });
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              sections={sections}
              sectionNames={sectionNames}
              activeSection={activeSection}
              hoveredDot={hoveredDot}
              setHoveredDot={setHoveredDot}
              scaleX={scaleX}
            />
          } 
        />
        <Route 
          path="/project/:id"
          element={<InfoProjectPage />} 
        />
      </Routes>
    </Router>
  )
}

export default App