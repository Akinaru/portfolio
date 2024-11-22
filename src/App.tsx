import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import './App.css'
import ProjectsSection from './Components/Sections/ProjectSection';
import ContactSection from './Components/Sections/ContactSection';
import HomeSection from './Components/Sections/HomeSection';
import AboutSection from './Components/Sections/AboutSection';

const sections = ['home', 'about', 'projects', 'contact'] as const;
type Section = typeof sections[number];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const { scrollYProgress } = useScroll({
    smooth: 16
  })
  const scaleX = useSpring(scrollYProgress)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const windowHeight = window.innerHeight
      const currentSection = Math.floor(currentScrollPos / windowHeight)
      setActiveSection(sections[currentSection])
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="relative">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-4 right-4 z-40">
        <ul className="flex flex-col gap-4">
          {sections.map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`block w-3 h-3 rounded-full ${
                  activeSection === section ? 'bg-white' : 'bg-neutral-600'
                } transition-colors`}
              />
            </li>
          ))}
        </ul>
      </nav>

      <HomeSection/>
      <AboutSection/>
      <ProjectsSection/>
      <ContactSection/>
    </div>
  )
}

export default App