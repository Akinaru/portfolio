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
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience'];
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
      className="fixed left-0 right-0 mx-auto top-6 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div 
        className="relative mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.2)'
        }}
        animate={{
          width: isExpanded ? "fit-content" : "80px",
          height: isExpanded ? "auto" : "40px",
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <motion.div 
          className="flex gap-1 px-2 py-1"
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ 
            duration: isExpanded ? 0.2 : 0.1,
            delay: isExpanded ? 0.15 : 0 
          }}
        >
          {navItems.map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeSection === id 
                  ? 'text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === id && (
                <motion.div
                  className="absolute inset-0 bg-white/15 rounded-full"
                  layoutId="activeSection"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30 
                  }}
                  style={{
                    boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.25)'
                  }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
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
          <div className="w-full h-full absolute inset-0">
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