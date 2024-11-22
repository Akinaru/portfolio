import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './App.css'
import logo from './assets/logo.webp'

const sections = ['home', 'about', 'projects', 'contact'] as const;
type Section = typeof sections[number];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
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
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
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

      {/* Sections */}
      <section id="home" className="h-screen flex items-center justify-center bg-[#121212]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <motion.img
            src={logo}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <h1 className="text-4xl font-bold mb-4">Maxime Gallotta</h1>
          <p className="text-xl text-neutral-400">Développeur Full-Stack</p>
        </motion.div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center bg-neutral-900 p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h2 className="text-3xl font-bold mb-8">À propos</h2>
          <p className="text-neutral-300 leading-relaxed mb-8">
            Passionné par le développement web depuis plus de 5 ans, je crée des applications
            modernes et performantes en utilisant les dernières technologies.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {/* Skills and tools sections... */}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="min-h-screen bg-[#121212] p-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto pt-24"
        >
          <h2 className="text-3xl font-bold mb-12 text-white">Mes Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-800 rounded-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-4">Projet E-commerce</h3>
              <p className="text-neutral-400">Description du projet...</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-800 rounded-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-4">Dashboard Analytics</h3>
              <p className="text-neutral-400">Description du projet...</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center bg-neutral-900 p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full text-white"
        >
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm">Nom</label>
              <input
                type="text"
                className="w-full bg-neutral-800 rounded p-3"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                className="w-full bg-neutral-800 rounded p-3"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Message</label>
              <textarea
                className="w-full bg-neutral-800 rounded p-3 min-h-32"
              />
            </div>
            <button className="w-full bg-white text-black font-medium py-3 rounded">
              Envoyer
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}

export default App