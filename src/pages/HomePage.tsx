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

  const scrollToSection = (sectionId: string) => {
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
    { id: 'experience', label: t('nav.experience') }
  ];

  return (
    <motion.nav 
      className="fixed left-0 right-0 mx-auto top-6 w-fit z-50 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-2 py-1"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-1">
        {navItems.map(({ id, label }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
              activeSection === id ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeSection === id && (
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                layoutId="activeSection"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
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