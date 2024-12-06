import HomeSection from '../Components/Sections/HomeSection';
import AboutSection from '../Components/Sections/AboutSection';
import ProjectsSection from '../Components/Sections/ProjectSection';
import ExperienceSection from '../Components/Sections/ExperienceSection';
import { SparklesCore } from "../libs/sparkles";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CompetenceSection from '../Components/Sections/CompetenceSection';


const NavBar = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'competences'];
      const current = sections.find(section => {
        const rect = document.getElementById(section)?.getBoundingClientRect();
        return rect ? rect.top >= -100 && rect.top <= 150 : false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'competences', label: t('nav.competence') },
  ];

  return (
    <motion.nav 
      className="fixed left-0 right-0 w-fit mx-auto top-6 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:block relative mx-auto bg-black/60 backdrop-blur-xl rounded-full overflow-hidden shadow-2xl px-4 py-2 border border-white/10">
        <div className="h-full flex justify-center items-center whitespace-nowrap">
          {navItems.map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-4 py-1 text-sm font-medium rounded-full transition-all ${
                activeSection === id 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === id && (
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full"
                  layoutId="activeSection"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30 
                  }}
                  style={{
                    boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.2)'
                  }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative mx-auto bg-black/60 backdrop-blur-xl rounded-full overflow-hidden shadow-2xl px-4 py-2 border border-white/10 text-white"
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{navItems.find(item => item.id === activeSection)?.label}</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <path d="m6 9 6 6 6-6"/>
            </motion.svg>
          </div>
        </motion.button>

        <motion.div
          initial={false}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20,
            scale: isMobileMenuOpen ? 1 : 0.95,
            transformOrigin: "top"
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
          style={{
            pointerEvents: isMobileMenuOpen ? "auto" : "none"
          }}
          className="absolute left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-48 mx-auto"
        >
          {navItems.map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`w-full px-4 py-2 text-left text-sm font-medium transition-all ${
                activeSection === id 
                  ? 'text-white bg-white/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};



const HomePage = () => {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Vérifier si on vient de la page projet et qu'il y a un hash #projects
    const isFromProjects = location.hash === '#projects' && document.referrer.includes('/projects/');
    setShouldAnimate(isFromProjects);

    // Gestion du scroll vers la section si hash présent, indépendamment de l'origine
    const hash = location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        document.documentElement.style.scrollBehavior = 'auto';
        const elementPosition = element.offsetTop;
        window.scrollTo({
          top: elementPosition,
          behavior: 'instant'
        });
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 0);
      }
    }
  }, [location]);

  return (
    <>
      {/* Overlay noir qui disparait */}
      {shouldAnimate && (
        <div 
          className="fixed inset-0 bg-black z-[60] transition-opacity duration-500 pointer-events-none animate-fadeOut"
        />
      )}

      <div className="relative">
        <NavBar/>
        {/* Animated Background */}
        <div className="fixed inset-0 w-full h-full bg-black">
          <div className="w-full h-full absolute inset-0 opacity-50">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
            <HomeSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <CompetenceSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;