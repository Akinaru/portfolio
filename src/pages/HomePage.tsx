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

const scrollbarStyles = `
  .modern-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }
  .modern-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .modern-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .modern-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    transition: background-color 0.3s;
  }
  .modern-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const HomePage = ({
  sections,
  sectionNames,
  activeSection,
  hoveredDot,
  setHoveredDot,
}: HomePageProps) => {
  return (
    <>
    <style>{scrollbarStyles}</style>

      <div className="relative modern-scrollbar h-screen overflow-y-auto">
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