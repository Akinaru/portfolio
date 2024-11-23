import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import HomeSection from './Components/Sections/HomeSection';
import AboutSection from './Components/Sections/AboutSection';
import ProjectsSection from './Components/Sections/ProjectSection';
import ContactSection from './Components/Sections/ContactSection';
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
            <li key={section} className="relative">
              <div className="relative flex items-center w-24 justify-end">
                <motion.span
                  className={`absolute right-6 whitespace-nowrap text-sm font-bold select-none ${
                    activeSection === section ? 'text-white' : 'text-neutral-600'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: hoveredDot === section ? 1 : 0,
                    x: hoveredDot === section ? 0 : 20 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {sectionNames[section]}
                </motion.span>
                
                <motion.a
                  href={`#${section}`}
                  className={`relative block w-3 h-3 rounded-full ${
                    activeSection === section ? 'bg-white' : 'bg-neutral-600'
                  } transition-colors hover:cursor-pointer`}
                  onMouseEnter={() => setHoveredDot(section)}
                  onMouseLeave={() => setHoveredDot(null)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              </div>
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