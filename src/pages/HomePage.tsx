import { motion } from 'framer-motion'
import HomeSection from '../Components/Sections/HomeSection'
import AboutSection from '../Components/Sections/AboutSection'
import ProjectsSection from '../Components/Sections/ProjectSection'
import ContactSection from '../Components/Sections/ContactSection'
import { MotionValue } from 'framer-motion'

type Section = 'home' | 'about' | 'projects' | 'contact'

interface HomePageProps {
  sections: readonly Section[]
  sectionNames: {
    readonly [K in Section]: string
  }
  activeSection: Section
  hoveredDot: Section | null
  setHoveredDot: (section: Section | null) => void
}


const HomePage = ({
  sections,
  sectionNames,
  activeSection,
  hoveredDot,
  setHoveredDot,
}: HomePageProps) => {
  return (
    <>

      <div className="relative h-screen">
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

        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>

  )
}

export default HomePage