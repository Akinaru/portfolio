import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import img_ilc from '../../assets/projects/ilc.jpeg';
import img_lightzino from '../../assets/projects/lightzino.jpeg';
import img_fifa from '../../assets/projects/fifa.jpeg';
import img_unknown from '../../assets/projects/unknown.jpeg';
import { useNavigate } from 'react-router-dom';

type Direction = 1 | -1 | 0;

const ChevronLeft = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  type: string;
}

const slideVariants: Variants = {
  enter: (direction: Direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1,
  })
};

interface ProjectBadgeProps {
  type: string;
  className?: string;
}

const ProjectBadge: React.FC<ProjectBadgeProps> = ({ type, className = '' }) => {
  const colors: Record<string, string> = {
    Personnel: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    Scolaire: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    Stage: 'bg-green-500/20 text-green-300 border-green-500/50'
  };

  const defaultColor = 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  const colorClasses = colors[type] || defaultColor;

  return (
    <div 
      className={`
        inline-flex 
        items-center 
        px-3 
        py-1 
        rounded-full 
        border 
        text-sm 
        font-medium
        ml-4
        ${colorClasses}
        ${className}
      `}
    >
      {type}
    </div>
  );
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);
  const [isFading, setIsFading] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "Lightzino",
      subtitle: "Design et Développement",
      description: "Casino en cryptomonnaie en ligne.",
      img: img_lightzino,
      type: "Personnel"
    },
    {
      id: 2,
      title: "ILC",
      subtitle: "Design et Développement",
      description: "Création d'une application web de géstion des déplacements internationnaux.",
      img: img_ilc,
      type: "Stage"
    },
    {
      id: 3,
      title: "Fifa",
      subtitle: "Design et Développement",
      description: "Boutique non officle d'articles de football.",
      img: img_fifa,
      type: "Scolaire"
    },
    {
      id: 4,
      title: "Bientôt ...",
      subtitle: "?",
      description: "Mystère...",
      img: img_unknown,
      type: "Inconnu"
    }
  ];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFadeToBlack = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate(`/project/${projects[currentIndex].id}`);
    }, 1000);
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative bg-black text-white py-48">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Mes Projets
          </motion.h2>
          
          <motion.p 
            className="text-neutral-400 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Découvrez mes projets
          </motion.p>
        
          <motion.div 
            className="relative w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={projects[currentIndex].img}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-0 left-0 w-full p-12 z-20 flex justify-between items-end">
                <div className="max-w-2xl">
                  <h3 className="text-4xl font-bold mb-3 text-white/95 flex items-center justify-start">
                    {projects[currentIndex].title} 
                    <ProjectBadge type={projects[currentIndex].type} />
                  </h3>
                  <p className="text-xl text-white/90 mb-4">{projects[currentIndex].subtitle}</p>
                  <p className="text-lg text-white/80">{projects[currentIndex].description}</p>
                </div>
                
                <motion.button
                  className="px-8 py-4 rounded-full bg-white text-black font-medium text-lg self-end"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFadeToBlack}
                >
                  En savoir plus
                </motion.button>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 my-16">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  currentIndex === 0 
                    ? 'text-neutral-500' 
                    : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                <ChevronLeft />
                <span>Précédent</span>
              </button>

              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <div
                    key={i}
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

              <button
                onClick={handleNext}
                disabled={currentIndex === projects.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  currentIndex === projects.length - 1 
                    ? 'text-neutral-500' 
                    : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                <span>Suivant</span>
                <ChevronRight />
              </button>
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
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;