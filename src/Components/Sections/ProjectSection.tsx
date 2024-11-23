import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import background from '../../assets/background.png';

type Direction = 1 | -1 | 0;

const slideVariants: Variants = {
  enter: (direction: Direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    zIndex: 1
  },
  exit: (direction: Direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  })
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);

  const projects = [
    {
      title: "MacBook Pro",
      subtitle: "Design & Development",
      description: "If you can dream it, Mac can do it.",
    },
    {
      title: "MacBook Air",
      subtitle: "UX Research",
      description: "Incredibly thin. Seriously powerful.",
    },
    {
      title: "iMac",
      subtitle: "Development",
      description: "The new iMac. Works like a dream.",
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

  return (
    <section className="relative min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mes Projets
        </motion.h2>
        
        <motion.p 
          className="text-neutral-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Découvrez mes projets
        </motion.p>
      
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="relative h-[600px] overflow-hidden rounded-3xl">
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
                  opacity: { duration: 0.2 }
                }}
              >
                <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
                  <img 
                    src={background}
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-3xl font-bold mb-2">{projects[currentIndex].title}</h3>
                    <p className="text-lg text-neutral-300 mb-4">{projects[currentIndex].subtitle}</p>
                    <p className="text-neutral-400 mb-6">{projects[currentIndex].description}</p>
                    <motion.button
                      className="px-6 py-3 rounded-full bg-white text-black font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      En savoir plus
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons - Now below the slider */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                currentIndex === 0 
                  ? 'text-neutral-500 cursor-not-allowed' 
                  : 'text-white hover:bg-white/10'
              } transition-colors`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
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
                  ? 'text-neutral-500 cursor-not-allowed' 
                  : 'text-white hover:bg-white/10'
              } transition-colors`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;