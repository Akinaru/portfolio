import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../../projects';

type Direction = 1 | -1 | 0;

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const slideVariants: Variants = {
  enter: (direction: Direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  })
};

const imageVariants: Variants = {
  enter: () => ({
    scale: 1.2,
    opacity: 0,
  }),
  center: {
    scale: 1,
    opacity: 1,
  },
  exit: () => ({
    scale: 0.9,
    opacity: 0,
  })
};

interface ProjectBadgeProps {
  type: string;
  className?: string;
}

const ProjectBadge: React.FC<ProjectBadgeProps> = ({ type, className = '' }) => {
  const colors: Record<string, string> = {
    Personnel: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    Personal: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    Scolaire: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    Academic: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    Stage: 'bg-green-500/20 text-green-300 border-green-500/50',
    Internship: 'bg-green-500/20 text-green-300 border-green-500/50'
  };

  const defaultColor = 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  const colorClasses = colors[type] || defaultColor;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ml-4 ${colorClasses} ${className}`}>
      {type}
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);
  const [isFading, setIsFading] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const currentProject = projectsData[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projectsData.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFadeToBlack = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate(`/${lang}/project/${currentProject.id}`);
    }, 700);
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            {t('projects.title')}
          </motion.h2>
          
          <motion.p 
            className="text-neutral-400 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('projects.description')}
          </motion.p>
        
          <motion.div 
            className="relative w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.div
                    className="absolute inset-0"
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img 
                      src={currentProject.img}
                      alt={t(`projects.${currentProject.translationKey}.title`)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-0 left-0 w-full p-12 z-20 flex justify-between items-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-2xl"
                  >
                    <h3 className="text-4xl font-bold mb-3 text-white/95 flex items-center justify-start">
                      {t(`projects.${currentProject.translationKey}.title`)}
                      <ProjectBadge type={t(`projects.${currentProject.translationKey}.type`)} />
                    </h3>
                    <p className="text-xl text-white/90 mb-4">
                      {t(`projects.${currentProject.translationKey}.subtitle`)}
                    </p>
                    <p className="text-lg text-white/80">
                      {t(`projects.${currentProject.translationKey}.description`)}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                <motion.button
                  className="px-8 py-4 rounded-full bg-white text-black text-lg self-end hover:bg-white/10 hover:text-white transition-colors font-semibold"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFadeToBlack}
                >
                  {t('projects.learnMore')}
                </motion.button>
              </div>
            </div>
  
            <div className="flex justify-center items-center gap-4 my-16">
              <motion.button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                whileTap={currentIndex !== 0 ? { scale: 0.95 } : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  currentIndex === 0 ? 'text-neutral-500' : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                <ChevronLeft />
                <span>{t('projects.previous')}</span>
              </motion.button>
  
              <div className="flex gap-2">
                {projectsData.map((_, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.75 }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
                    }`}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                  />
                ))}
              </div>
  
              <motion.button
                onClick={handleNext}
                disabled={currentIndex === projectsData.length - 1}
                whileTap={currentIndex !== projectsData.length - 1 ? { scale: 0.95 } : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  currentIndex === projectsData.length - 1 ? 'text-neutral-500' : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                <span>{t('projects.next')}</span>
                <ChevronRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
  
      <AnimatePresence>
        {isFading && (
          <motion.div 
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;